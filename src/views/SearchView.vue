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
			<SearchResults v-else :problemDatas="searchResultProblemDatas" :maxDisplayNumber="maxResultProblemNumber">
			</SearchResults>
			
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
import { getAllProblemConfigs } from "@lib/exam-db"; // 讀取題本資訊
import SearchBox from "./search-comp/SearchBox.vue"; // 搜尋框
import SearchResults from "./search-comp/SearchResults.vue"; // 顯示搜尋結果的組件

const DEBOUNCE_TIME_MS = 500;
const RESULT_LIMITS = 5; // 搜尋結果每次最多顯示幾題

function isSubtag(tag, subtag) { // subtag 是否是 tag 的子標籤
	const splited_tag = tag.split("-");
	const splited_subtag = subtag.split("-");
	return splited_subtag.every((a, i) => a === splited_tag[i]); // subtag 每一階層都必須跟 tag 的相同, 才算子標籤
}

function someSearchTagIsSubtag(searchTags, tag) { // 存在一個篩選標籤是 tag 的子標籤
	return searchTags.some(searchTag => isSubtag(tag, searchTag));
}

function getSearchResult(problemConfigTuples, searchText, searchTags) { // 獲得搜尋結果
	if (!problemConfigTuples) return []; // exam-db 未載入完成, return []
	if (!searchText && searchTags.length === 0) return []; // 沒有搜尋條件, return []
	
	const searchResult = []; // 搜尋結果
	for (const tuple of problemConfigTuples) { // 篩選題目
		const problemTags = tuple.problemConfig.tags ?? []; // 題目的 tag
		if (problemTags.some(tag => someSearchTagIsSubtag(searchTags, tag))) searchResult.push(tuple);
	}
	return searchResult;
}

function whenSearchChanged(searchText, searchTags) { // 當搜尋內容改變時
	isSearching.value = true; // 顯示 "搜尋中"
	searchResultProblemDatas.value = []; // 清空搜尋結果, 防止 "顯示更多" 按鈕顯示
	
	clearTimeout(debounceTimerId); // 清除防抖 timer id (取消前一次尚未觸發搜尋的 timer)
	debounceTimerId = setTimeout(() => {
		searchResultProblemDatas.value = getSearchResult(problemConfigTuples, searchText, searchTags); // 搜尋符合的題目
		maxResultProblemNumber.value = RESULT_LIMITS; // 重置顯示的題目數
		isSearching.value = false; // 搜尋完成
	}, DEBOUNCE_TIME_MS);
}

async function getProblemConfigs() {
	isGettingDb.value = true; // 顯示 "正在讀取題目資訊"
	problemConfigTuples = await getAllProblemConfigs(); // 載入所有題本的 config
	isGettingDb.value = false; // 讀取完成
}

let debounceTimerId = null; // 防抖
let problemConfigTuples = []; // 所有題目的 config. { uni, year, no, problemConfig, problemText }
const isGettingDb = ref(false); // 是否正在讀取 exam db
const isSearching = ref(false); // 是否正在搜尋
const searchResultProblemDatas = ref([]); // 搜尋結果
const maxResultProblemNumber = ref(RESULT_LIMITS); // 搜尋結果顯示的題目數
getProblemConfigs();
</script>
