<template>
	<div class="ts-box ts-content is-padded">
		<div class="ts-wrap is-vertical is-center-aligned" style="--gap: 22px">
			
			<!-- 搜尋框 + 建議列表 -->
			<SearchBox @input-changed="whenSearchChanged"></SearchBox>
			
			<!-- 搜尋結果 (很多題目) -->
			<div v-if="isGettingDb" class="ts-text is-center-aligned">
				正在蒐集題目資訊<span class="ts-icon is-spinning is-spinner-icon is-start-spaced"></span>
			</div>
			<div v-else-if="isSearching" class="ts-text is-center-aligned">
				搜尋中<span class="ts-icon is-spinning is-spinner-icon is-start-spaced"></span>
			</div>
			<div v-else-if="searchResultProblemDatas.length === 0" class="ts-text is-center-aligned">
				沒有找到符合條件的題目 (´-ω-｀)
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
import { ref, onMounted } from "vue";
import { getSearchData } from "@lib/exam-db"; // 讀取題本資訊
import SearchBox from "./search-comp/SearchBox.vue"; // 搜尋框
import SearchResults from "./search-comp/SearchResults.vue"; // 顯示搜尋結果的組件

const DEBOUNCE_TIME_MS = 500; // 搜尋欄和 tag 改變時, 要經過一段時間後才會開始搜尋 (防止打字時高頻觸發搜尋)
const RESULT_LIMITS = 5; // 按下 "顯示更多" 的按鈕後, 會將顯示的題目數增加此值
const SEARCH_TEXT_MAX_LENGTH = 100; // 搜尋字串的最大長度 (不會修改 input text)

function isSubtag(tag, subtag) { // subtag 是否是 tag 的子標籤
	const splitedTag = tag.split("-");
	const splitedSubtag = subtag.split("-");
	return splitedSubtag.every((s, i) => s === splitedTag[i]); // subtag 每一階層都必須跟 tag 的相同, 才算子標籤
}

function isSubtagOfAnyProblemTags(tag, problemTags) { // tag 是 problemTags 內的某個 tag 的子標籤
	return problemTags.some(probTag => isSubtag(probTag, tag));
}

function getSearchResult(searchData, searchText, searchTags) { // 獲得搜尋結果
	if (!searchData) return []; // exam-db 未載入完成, return []
	if (!searchText && searchTags.length === 0) return []; // 沒有任何搜尋字串或篩選 tag, return []
	
	if (searchText.length > SEARCH_TEXT_MAX_LENGTH) searchText = searchText.slice(0, SEARCH_TEXT_MAX_LENGTH);
	
	const searchResult = []; // 搜尋結果
	for (const problemSearchData of searchData) { // 篩選題目
		const problemTags = problemSearchData.problemConfig.tags ?? []; // 題目的 tag
		if (!searchTags.every(tag => isSubtagOfAnyProblemTags(tag, problemTags))) continue; // 條件 1, 所有的搜尋標籤都必須是某個題目標籤的子標籤
		if (!problemSearchData.problemText.includes(searchText.toLowerCase())) continue; // 條件 2, 搜尋字串必須是題目文本的子字串 (無視大小寫)
		searchResult.push(problemSearchData);
	}
	return searchResult;
}

function whenSearchChanged(searchText, searchTags) { // 當搜尋內容改變時
	isSearching.value = true; // 顯示 "搜尋中"
	searchResultProblemDatas.value = []; // 清空搜尋結果, 防止 "顯示更多" 按鈕顯示
	
	clearTimeout(debounceTimerId); // 清除防抖 timer id (取消前一次尚未觸發搜尋的 timer)
	debounceTimerId = setTimeout(() => {
		searchResultProblemDatas.value = getSearchResult(searchData, searchText, searchTags); // 搜尋符合的題目
		maxResultProblemNumber.value = RESULT_LIMITS; // 重置顯示的題目數
		isSearching.value = false; // 搜尋完成
	}, DEBOUNCE_TIME_MS);
}

let debounceTimerId = null; // 防抖
let searchData = []; // 所有題目的 config. { uni, year, no, problemConfig, problemText }
const isGettingDb = ref(false); // 是否正在讀取 exam db
const isSearching = ref(false); // 是否正在搜尋
const searchResultProblemDatas = ref([]); // 搜尋結果
const maxResultProblemNumber = ref(RESULT_LIMITS); // 搜尋結果顯示的題目數

onMounted(async () => { // 載入頁面時
	isGettingDb.value = true; // 顯示 "正在讀取題目資訊"
	searchData = await getSearchData(); // 因為 search-data.json 很大, 所以採用動態載入
	isGettingDb.value = false; // 讀取完成
});
</script>
