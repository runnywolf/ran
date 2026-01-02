<template>
	<div class="ts-wrap is-vertical is-center-aligned is-compact">
		
		<!-- 搜尋框, "建議列表" 是此元素的彈出內容 -->
		<div style="width: 500px" class="ts-input is-start-icon" popovertarget="search-page-tag-suggestions">
			<span class="ts-icon is-magnifying-glass-icon"></span>
			<input type="text" placeholder="搜尋" v-model="searchText">
		</div>
		
		<!-- 建議列表 -->
		<div style="width: 500px; padding: 8px;" class="ts-popover" id="search-page-tag-suggestions" popover>
			
			<!-- 如果有搜尋到符合的 tag, 顯示多個建議 tag -->
			<div v-if="sortedTagLcsDataArr.length > 0" class="ts-wrap is-vertical is-compact">
				<div v-for="{ tag, lcsSubstrs } in sortedTagLcsDataArr"
					class="ts-wrap is-compact tag-suggestion"
					@click="whenDropDownTagClicked(tag)"
				>
					<Tag :tag="tag"></Tag>
					<div class="ts-text">
						<span v-for="{ substr, isMatch } in lcsSubstrs" :class="{ 'tag-suggestion-match-text': isMatch }">
							{{ substr }}
						</span><!-- 將 lcs 部份的字串塗橘色 -->
					</div>
				</div>
			</div>
			
			<!-- 如果沒有搜尋到符合的 tag, 顯示這段訊息 -->
			<div v-else class="ts-text is-center-aligned">
				沒有符合的 tag 捏<br>
				(´･ω･`) <span class="ts-icon is-question-icon is-large is-spinning"></span>
			</div>
			
		</div>
		
		<!-- ??? & help button -->
		<div class="ts-wrap is-middle-aligned">
			
			<!-- help button & help 彈出內容 -->
			<button class="ts-icon is-circle-question-icon is-large" popovertarget="search-page-help"></button>
			<div class="ts-popover" id="search-page-help" popover>
				<div class="ts-content is-dense" style="width: 400px;">
					<div class="ts-list is-unordered">
						<div class="item">可以在搜尋框搜尋想要的題目標籤，點擊搜尋結果即可將該標籤加入搜尋條件。</div>
						<div class="item">點擊搜尋框下方已加入的標籤，可將其從搜尋條件中移除。</div>
						<div class="item">如果只想用搜尋框內容查找題目段落，請點擊建議列表以外的區域，建議列表將自動關閉。</div>
						<div class="item">搜尋框會無視大小寫，直接比對題目段落中的連續子字串，也支援搜尋 LaTeX 語法。</div>
						<div class="item">標籤篩選規則：所有搜尋標籤必須為該題目任一標籤的子標籤。</div>
					</div>
				</div>
			</div>
			
		</div>
		
		<!-- 搜尋框下方的已選取 tags -->
		<div v-if="selectedTags.length > 0" class="ts-wrap is-compact">
			<Tag v-for="(tag, i) in selectedTags" :tag="tag" @click="selectedTags.splice(i, 1)"></Tag>
		</div>
		
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { sum } from "ran-math";
import { TagTree } from "@lib/exam-db"; // 讀取題本資訊
import { splitTargetByLcs } from "@lib/lcs";
import { showToast, ToastType } from "@lib/toast"; // 彈出訊息
import Tag from "@/components/problem/Tag.vue"; // tag 組件

const DROPDOWN_MAX_TAG_NUMBER = 10; // 搜尋框下面的搜尋建議的最大 tag 數
const SELECTED_TAG_MAX_NUMBER = 5; // 選定的 tag 的最大個數
const SEARCH_TEXT_MAX_LENGTH = 100; // 若搜尋字串長於此值, 會捨棄之後的部分, 但不會修改 input ui text

function fixSearchText(text) { // 處理過長的 search text
	if (text.length > SEARCH_TEXT_MAX_LENGTH) return text.slice(0, SEARCH_TEXT_MAX_LENGTH);
	return text;
}

function getLcsRss(lcsSubstrs) { // 將多個 lcs 子字串, 取 root sum square (有利於較長的匹配子字串)
	const squareArr = lcsSubstrs.filter(({ isMatch }) => isMatch)
		.map(({ substr }) => substr.length ** 2); // 若 ^2 獎勵太多, 考慮降低
	return Math.sqrt(sum(squareArr)); // root sum square
}

function getDropDownSuggestionDatas(searchText) { // 根據搜尋字串, 生成建議列表的顯示資料 (依據 LCS-RSS 降序排列)
	let lcsDataArr = [];
	for (let { tag, en, zhtw } of tagDatas) { // 遍歷所有 tag 的中/英文
		en = en.replaceAll("\n", " "); // 去除英文標籤的 \n
		
		const enTagLcsSubstrs = splitTargetByLcs(en, searchText); // 尋找 lcs 的子字串
		const zhtwTagLcsSubstrs = splitTargetByLcs(zhtw, searchText);
		
		const enTagRss = getLcsRss(enTagLcsSubstrs); // rss
		const zhtwTagRss = getLcsRss(zhtwTagLcsSubstrs);
		
		const lcsData = enTagRss >= zhtwTagRss ? // 同個 tag 會取中/英文 rss 最長者
			{ tag, lcsRss: enTagRss, lcsSubstrs: enTagLcsSubstrs } :
			{ tag, lcsRss: zhtwTagRss, lcsSubstrs: zhtwTagLcsSubstrs }; // tag 與 lcs 資訊
		
		if (lcsData.lcsRss === 0) continue; // 忽略 lcs 長度為零的 tag
		lcsDataArr.push(lcsData);
	}
	lcsDataArr = lcsDataArr.sort((a, b) => b.lcsRss - a.lcsRss); // 採用 lcs-rss 降序排列
	return lcsDataArr.slice(0, DROPDOWN_MAX_TAG_NUMBER); // 只保留 rss 較高的前幾項
}

const emit = defineEmits([ "input-changed" ]); // 當搜尋框或 tag 改變, emit text 和 tag arr

const tagDatas = TagTree.getFlattenedNodes(); // 將 tag-tree.json 扁平化為 arr: { tag, en, zhtw }
const searchText = ref(""); // 搜尋框的字串
const sortedTagLcsDataArr = ref([]); // 搜尋框的 tag 建議列表
const selectedTags = ref([]); // 被選定的數個 tag (在搜尋框下方)

const route = useRoute(); // 路由
watch(() => route.params.tag, newTag => { // 當路由 (#/search/<tag>) 改變時
	const isRouteTagVaild = tagDatas.some(({ tag }) => tag === newTag);
	selectedTags.value = isRouteTagVaild ? [newTag] : [];
}, { immediate: true }); // 若路由為 #/search, 清空選定的 tag; 若路由為 #/search/<tag> 且 tag 存在, 添加一個 tag.

watch(searchText, newSearchText => { // 當搜尋框的字串改變時
	newSearchText = fixSearchText(newSearchText); // 處理過長的 search text
	const dropdownElement = document.querySelector("#search-page-tag-suggestions"); // 建議列表的元素
	
	if (newSearchText) { // 輸入框非空, 顯示建議列表
		sortedTagLcsDataArr.value = getDropDownSuggestionDatas(newSearchText); // 根據搜尋字串, 生成建議列表的顯示資料
		dropdownElement.showPopover() // 顯示建議列表
	} else { // 輸入框為空, 隱藏建議列表
		dropdownElement.hidePopover() // 隱藏建議列表
	}
});

function whenDropDownTagClicked(tag) { // 當建議列表的 tag 被點擊
	searchText.value = ""; // 清空搜尋框
	if (selectedTags.value.length >= SELECTED_TAG_MAX_NUMBER) { // 超出標籤最大選取限制
		showToast("你選太多標籤了拉 (☉д⊙)", ToastType.WARNING);
		return;
	}
	if (!selectedTags.value.includes(tag)) selectedTags.value.push(tag); // 如果某個 tag 沒有被選取, 選取它
};

watch([searchText, selectedTags], ([text, tags]) => { // 當搜尋框或 tag 改變, emit text 和 tag arr
	text = fixSearchText(text); // 處理過長的 search text
	emit("input-changed", text, tags);
}, { immediate: true, deep: true }); // 第一次載入 emit 和刪除 tag 分別需要 immediate 和 deep 來觸發
</script>

<style scoped>
.tag-suggestion { /* 禁止選取搜尋結果 */
	user-select: none;
}
.tag-suggestion:hover { /* 滑鼠游標放到搜尋結果上時, 整行的背景會變得跟 tag 組件背景一樣的顏色 */
	background-color: #eee;
	border-radius: 15px;
}
.tag-suggestion-match-text { /* 搜尋匹配部份會有底色 */
	background-color: #fc0;
}
</style>
