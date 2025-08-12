<template>
	<div class="ts-box ts-content is-padded">
		<div class="ts-wrap is-vertical is-center-aligned" style="--gap: 22px">
			
			<!-- 搜尋框 + 建議列表 -->
			<SearchBox @input-changed="whenSearchChanged"></SearchBox>
			
			<!-- 搜尋結果 (很多題目) -->
			<div v-if="isGettingDb" class="ts-text is-center-aligned">
				正在處理題目資訊<span class="ts-icon is-spinning is-spinner-icon is-start-spaced"></span>
			</div>
			<div v-else-if="isSearching" class="ts-text is-center-aligned">
				搜尋中<span class="ts-icon is-spinning is-spinner-icon is-start-spaced"></span>
			</div>
			<div v-else-if="searchResultProblemDatas.length === 0" class="ts-text is-center-aligned">
				<div>沒有找到符合條件的題目 (´-ω-｀)</div>
				<button class="ts-text is-underlined" popovertarget="search-page-notice">
					搜尋頁面注意事項
				</button>
				<div class="ts-popover" id="search-page-notice" popover>
					<div class="ts-content is-dense">
						點擊搜尋框下方的標籤，可以刪除。<br>
						目前只支援 tag 搜尋。
					</div>
				</div>
			</div>
			<div v-else class="ts-wrap is-vertical is-center-aligned is-compact">
				<template v-for="({ uni, year, no, config }, i) in searchResultProblemDatas" :key="`${uni}-${year}-${no}`">
					<div v-if="i < maxResultProblemNumber" class="ts-box ts-content" style="width: 790px;">
						<div class="problem-name">
							<span>{{ dbConfig.uniConfigs[uni].shortName }} {{ year }} 第 {{ no }} 題</span>
						</div>
						<Problem :uni="uni" :year="year" :no="no" :problemConfig="config" showLink hideProblemScore>
						</Problem>
					</div>
				</template>
			</div>
			
			<!-- 顯示更多的按鈕 -->
			<button v-if="searchResultProblemDatas.length > maxResultProblemNumber"
				class="ts-button is-secondary"
				@click="maxResultProblemNumber += RESULT_LIMITS"
			>顯示更多</button>
			
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import SearchBox from "./search-comp/SearchBox.vue"; // 搜尋框
import Problem from "@/components/problem/Problem.vue"; // 題目組件
import dbConfig from "@/exam-db/config.json"; // db config

const DEBOUNCE_TIME_MS = 500;
const RESULT_LIMITS = 5; // 搜尋結果每次最多顯示幾題

async function getProblemDatas() { // 所有題目的 config
	isGettingDb.value = true; // 顯示 "正在讀取題目資訊"
	
	const examIds = []; // 所有題本的 { uni, year }
	for (const [uni, { yearList }] of Object.entries(dbConfig.uniConfigs)) {
		for (const year of yearList) examIds.push([uni, year]);
	}
	
	const examIdAndConfigs = await Promise.all(examIds.map(async ([uni, year]) => { // 載入所有題本的 config. { uni, year, config }
		return import(`../exam-db/${uni}/${year}/config.json`)
			.then(module => ({ uni, year, examConfig: module.default }));
	}));
	
	const datas = []; // 所有題目的 config. { uni, year, no, config }
	for (const { uni, year, examConfig } of examIdAndConfigs) {
		for (const [no, problemConfig] of Object.entries(examConfig.problemConfigs)) {
			datas.push({ uni, year, no, config: problemConfig });
		}
	}
	problemDatas = datas;
	
	isGettingDb.value = false; // 讀取完成
}

function getSearchResult(problemDatas, searchText, searchTags) { // 獲得搜尋結果
	if (!problemDatas) return []; // exam-db 未載入完成, return []
	if (!searchText && searchTags.length === 0) return []; // 沒有搜尋條件, return []
	
	const searchResult = []; // 搜尋結果
	for (const problemData of problemDatas) { // 篩選題目
		const problemTags = problemData.config.tags ?? []; // 題目的 tag
		if (problemTags.some(tag => searchTags.includes(tag))) searchResult.push(problemData);
	}
	return searchResult;
}

let debounceTimerId = null; // 防抖
let problemDatas = []; // 所有題目的 config. { uni, year, no, config }
const isGettingDb = ref(false); // 是否正在讀取 exam db
const isSearching = ref(false); // 是否正在搜尋
const searchResultProblemDatas = ref([]); // 搜尋結果
const maxResultProblemNumber = ref(RESULT_LIMITS); // 搜尋結果顯示的題目數
getProblemDatas();

function whenSearchChanged(searchText, searchTags) { // 當搜尋內容改變時
	isSearching.value = true; // 顯示 "搜尋中"
	searchResultProblemDatas.value = []; // 清空搜尋結果, 防止 "顯示更多" 按鈕顯示
	
	clearTimeout(debounceTimerId); // 清除防抖 timer id (取消前一次尚未觸發搜尋的 timer)
	debounceTimerId = setTimeout(() => {
		searchResultProblemDatas.value = getSearchResult(problemDatas, searchText, searchTags); // 搜尋符合的題目
		maxResultProblemNumber.value = RESULT_LIMITS; // 重置顯示的題目數
		isSearching.value = false; // 搜尋完成
	}, DEBOUNCE_TIME_MS);
}
</script>

<style scoped>
.problem-name { /* 某學校某年第幾題的樣式 */
	margin-bottom: 10px;
}
.problem-name > span {
	display: inline-block;
	padding: 0 6px;
	background-color: #bdf;
	border-radius: 4px;
}
</style>
