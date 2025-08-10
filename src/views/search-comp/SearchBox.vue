<template>
	<div class="ts-wrap is-vertical is-center-aligned is-compact">
				
		<!-- 搜尋框 -->
		<div style="width: 500px" class="ts-input is-start-icon" popovertarget="dropdown-suggestions">
			<span class="ts-icon is-magnifying-glass-icon"></span>
			<input type="text" placeholder="搜尋" v-model="searchText">
		</div>
		
		<!-- 建議列表 -->
		<div style="width: 500px; padding: 8px;" class="ts-popover" id="dropdown-suggestions" popover>
			
			<!-- 建議列表 -->
			<div v-if="sortedTagLcsDataArr.length > 0" class="ts-wrap is-vertical is-compact">
				<div v-for="{ tag, lcsSubstrs } in sortedTagLcsDataArr"
					class="ts-wrap is-compact dropdown-suggestion"
					@click="whenDropDownTagClicked(tag)"
				>
					<Tag :tag="tag"></Tag>
					<div class="ts-text">
						<span v-for="{ substr, isLcs } in lcsSubstrs" :class="{ 'dropdown-lcs-text': isLcs }">
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
		
		<!-- 搜尋框下面的已選取 tags -->
		<div v-if="selectedTags.length > 0" class="ts-wrap is-compact">
			<Tag v-for="(tag, i) in selectedTags" :tag="tag" @click="selectedTags.splice(i, 1)"></Tag>
		</div>
		
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { sum } from "ran-math";
import tagMap from "@/exam-db/tag-map.json"; // tag 映射
import Tag from "@/components/problem/Tag.vue"; // tag 組件

const DROPDOWN_MAX_TAG_NUMBER = 10; // 搜尋框下面的搜尋建議的最大 tag 數

function strEqualIgnoreCase(str_a, str_b) { // 忽略大小寫的字串比較
	return str_a.toLowerCase() === str_b.toLowerCase();
}

function lcs(str_a, str_b) { // LCS
	const [n, m] = [str_a.length, str_b.length]; // 字串長度
	
	const dpArr = Array.from({ length: n+1 }, () => Array(m+1).fill(0));
	for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
		if (strEqualIgnoreCase(str_a[i-1], str_b[j-1])) dpArr[i][j] = dpArr[i-1][j-1] + 1;
		else dpArr[i][j] = Math.max(dpArr[i-1][j], dpArr[i][j-1]);
	}
	
	let [i, j] = [n, m];
	let lcsStr = "";
	while (i > 0 && j > 0) {
		if (strEqualIgnoreCase(str_a[i-1], str_b[j-1])) {
			lcsStr = str_a[i-1] + lcsStr; i--; j--;
		} else {
			dpArr[i-1][j] >= dpArr[i][j-1] ? i-- : j--;
		}
	}
	
	return lcsStr;
}

function getLcsSubstrs(str, lcsStr) { // 根據是不是 lcs 的部分, 將字串切分成子字串 (功能實作: 與搜尋字串相同的內容會有底色)
	if (lcsStr.length === 0) return [{ substr: str, isLcs: false }]; // 整段 str 都不是 lcs
	
	let lcsReadIndex = 0;
	const substrs = []; // lcs 子字串和非 lcs 子字串交替元素的 arr
	const pushChar = (char, isLcs) => { // 將一個字元加入到 substrs
		if (substrs.length > 0 && substrs.at(-1).isLcs === isLcs) substrs.at(-1).substr += char;
		else substrs.push({ substr: char, isLcs });
	};
	for (const char of str) {
		if (lcsReadIndex <= lcsStr.length-1 && strEqualIgnoreCase(char, lcsStr[lcsReadIndex])) { // 逐一比對 (忽略大小寫)
			pushChar(char, true);
			lcsReadIndex++;
		} else {
			pushChar(char, false);
		}
	}
	return substrs;
}

function getLcsRss(lcsSubstrs) { // 將多個 lcs 子字串, 取 root sum square (有利於較長的匹配子字串)
	const squareArr = lcsSubstrs.filter(({ isLcs }) => isLcs).map(({ substr }) => substr.length ** 2); // 若 ^2 獎勵太多, 考慮降低
	return Math.sqrt(sum(squareArr)); // root sum square
}

function getDropDownSuggestionDatas(searchText) { // 根據搜尋字串, 生成建議列表的顯示資料 (依據 LCS-RSS 降序排列)
	let lcsDataArr = [];
	for (let [tag, { en: enTag, zhtw: zhtwTag }] of Object.entries(tagMap)) { // 遍歷所有 tag 的中/英文
		enTag = enTag.replaceAll("\n", " "); // 去除英文標籤的 \n
		
		const enTagLcsSubstrs = getLcsSubstrs(enTag, lcs(enTag, searchText)); // 尋找 lcs 的子字串
		const zhtwTagLcsSubstrs = getLcsSubstrs(zhtwTag, lcs(zhtwTag, searchText));
		
		const enTagRss = getLcsRss(enTagLcsSubstrs); // rss
		const zhtwTagRss = getLcsRss(zhtwTagLcsSubstrs);
		
		const lcsData = enTagRss >= zhtwTagRss ? // 同個 tag 會取中/英文 rss 最長者
			{ tag, lcsRss: enTagRss, lcsSubstrs: enTagLcsSubstrs } :
			{ tag, lcsRss: zhtwTagRss, lcsSubstrs: zhtwTagLcsSubstrs }; // tag 與 lcs 資訊
		
		if (lcsData.lcsRss === 0) continue; // 忽略 lcs 長度為零的 tag
		lcsDataArr.push(lcsData);
	}
	lcsDataArr = lcsDataArr.sort((a, b) => b.lcsRss - a.lcsRss); // 採用 lcs-rss 降序排列
	while (lcsDataArr.length > DROPDOWN_MAX_TAG_NUMBER) lcsDataArr.pop(); // 只保留 rss 較高的前幾項
	return lcsDataArr;
}

const emit = defineEmits([ "input-changed" ]); // 當搜尋框或 tag 改變, emit text 和 tag arr

const searchText = ref(""); // 搜尋框的字串
const sortedTagLcsDataArr = ref([]); // 搜尋框的 tag 建議列表
const selectedTags = ref([]); // 被選定的數個 tag (在搜尋框下方)

watch(searchText, newSearchText => { // 當搜尋框的字串改變時
	if (newSearchText) { // 輸入框非空, 顯示建議列表
		sortedTagLcsDataArr.value = getDropDownSuggestionDatas(newSearchText); // 根據搜尋字串, 生成建議列表的顯示資料
		document.querySelector("#dropdown-suggestions").showPopover() // 顯示建議列表
	} else { // 輸入框為空, 隱藏建議列表
		document.querySelector("#dropdown-suggestions").hidePopover() // 隱藏下拉建議列表
	}
});

function whenDropDownTagClicked(tag) { // 當建議列表的 tag 被點擊
	if (!selectedTags.value.includes(tag)) selectedTags.value.push(tag); // 如果某個 tag 沒有被選取, 選取它
	searchText.value = ""; // 清空搜尋框
};

const route = useRoute(); // 路由
watch(() => route.params.tag, newTag => { // 當路由 (#/search/<tag>) 改變時
	selectedTags.value = (newTag in tagMap) ? [newTag] : [];
}, { immediate: true }); // 若路由為 #/search, 清空選定的 tag; 若路由為 #/search/<tag> 且 tag 存在, 添加一個 tag.

watch([searchText, selectedTags], ([text, tags]) => { // 當搜尋框或 tag 改變, emit text 和 tag arr
	emit("input-changed", text, tags);
}, { immediate: true, deep: true }); // 第一次載入 emit 和刪除 tag 分別需要 immediate 和 deep 來觸發
</script>

<style scoped>
.dropdown-suggestion {
	user-select: none; /* 禁止選取搜尋結果 */
}
.dropdown-suggestion:hover {
	background-color: #eee;
	border-radius: 15px;
}
.dropdown-lcs-text { /* lcs 部份會有底色 */
	background-color: #fc0;
}
</style>
