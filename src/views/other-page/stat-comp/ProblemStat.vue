<template>
	
	<div class="ts-text is-big is-bold" style="margin-top: -6px; margin-bottom: 6px;">
		題目統計
		<button class="ts-icon is-circle-exclamation-icon is-start-spaced" popovertarget="other-page-prob-stat">
		</button>
		<div class="ts-popover" id="other-page-prob-stat" popover>
			<div class="ts-content is-dense ts-text is-medium" style="font-weight: initial;">
				<div class="ts-list is-unordered">
					<div class="item">點擊標籤可以跳至搜尋頁面。</div>
					<div class="item">點擊標籤右側的圖示可以展開子標籤。</div>
					<div class="item">由於一題可能有多個標籤，所以將占比加總是沒有意義的。</div>
					<div class="item">這份資料無法預測未來考題，如造成損失請自行負責。</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="ts-text" style="margin-bottom: 8px;">
		已收錄 {{ stat.examNumber }} 題本，其中 {{ stat.answerCompleteExamNumber }}
		份有完整詳解 ({{ (stat.answerCompleteExamNumber / stat.examNumber * 100).toFixed(2) }}%)。<br>
		總共收錄 {{ stat.problemNumber }} 題，其中 {{ stat.problemHasAnswerNumber }}
		題有答案 ({{ (stat.problemHasAnswerNumber / stat.problemNumber * 100).toFixed(2) }}%)。
	</div>
	
	<div class="ts-box is-collapsed">
		<table class="ts-table is-collapsed stat-table">
			<thead>
				<tr>
					<th>標籤</th><th>題目數</th><th>占比</th><th>學校出題數</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(tagStat, i) in tagStats" v-show="tagStat.show">
					<td>
						<Tag :tag="tagStat.tag" clickToSearch :style="{ 'margin-left': `${tagStat.indentWidth}px` }"></Tag>
						<span v-if="tagStat.isIconEnabled()" :class="tagStat.getIconCssClass()" @click="whenIconClicked(i)"></span>
					</td>
					<td>{{ tagStat.count }}</td>
					<td>{{ tagStat.percent.toFixed(2) }}%</td>
					<td>{{ tagStat.uniCountStr }}</td>
				</tr>
			</tbody>
		</table>
	</div>
	
</template>

<script setup>
import { ref } from "vue";
import { getUniShortName } from "@lib/exam-db"; // 讀取題本資料
import { sum } from "ran-math";
import stat from "@/stat/problem-stat.json"; // 統計資料
import Tag from "@/components/problem/Tag.vue"; // tag 組件

class TagStat { // 每一個 tag 的統計資料 (包含 icon 狀態)
	static getUniCountStr(uniCountsDict) {
		return Object.entries(uniCountsDict) // { <uni>: <uniCount>, ... } 轉 [ [<uni>, <uniCount>], ... ]
			.filter(([uni, uniCount]) => uniCount > 0) // 只顯示題數 > 0 的學校
			.sort((a, b) => b[1]-a[1]) // 根據題數降序排列
			.map(([uni, uniCount]) => `${getUniShortName(uni)}${uniCount}`) // 轉成字串: "<學校><題數>"
			.join("　") // 以全形空白連接多個字串
	}
	
	constructor(tag, uniCountsDict) {
		this.tag = tag; // 標籤
		this.tagLevel = tag.split("-").length - 1; // tag 在 tag tree 內的 level (恰等於 "-" 字符數量)
		this.show = this.tagLevel === 0; // 初始化時, 只有 level 為 0 的 tag row 會顯示
		this.indentWidth = 20 * this.tagLevel; // 縮排寬度 (px), 取決於 tag level
		this.iconStateRef = ref(null); // false 收起, true 展開, null 不顯示 icon
		this.count = sum(Object.values(uniCountsDict)); // 所有題目之中, 包含此標籤的題目個數
		this.percent = this.count / stat.problemNumber * 100; // 所有題目之中, 包含此標籤的題目比例
		this.uniCountStr = TagStat.getUniCountStr(uniCountsDict); // 每個學校有幾題包含這個 tag
	}
	
	haveChildren(tagStat_preorderSuccessor) { // 這個 tag 是否有 child tag
		if (!tagStat_preorderSuccessor) return false; // 若後繼節點不存在, 代表沒有 child
		return this.tagLevel + 1 === tagStat_preorderSuccessor.tagLevel;
	} // 前序遍歷扁平化得到的 tag node arr 之中, 若節點有 child, 則後繼節點的 level 必定 +1
	
	getIconState() { // 獲取按鈕的狀態 (null 隱藏 / false 收起 / true 展開)
		return this.iconStateRef.value;
	}
	
	setIconState(state) { // 設定按鈕的狀態 (false 收起 / true 展開)
		this.iconStateRef.value = state; // 若按鈕啟用中, 切換按鈕的狀態 (收起/展開)
	}
	
	switchIcon() { // 切換按鈕的狀態 (收起/展開)
		if (this.isIconEnabled()) this.setIconState(!this.getIconState()); // 若按鈕啟用中, 切換按鈕的狀態 (收起/展開)
	}
	
	enableIcon() { // 啟用 icon
		this.setIconState(false); // 啟用後, icon 為收起狀態
	}
	
	isIconEnabled() { // 是否要顯示 icon
		return this.getIconState() !== null; // null -> 不顯示 icon ; false/true -> 收起/展開 icon
	}
	
	getIconCssClass() { // 回傳 icon 的 css class 樣式
		const iconStyle = this.iconStateRef.value ? "down" : "right"; // true 展開, false 收起
		return `ts-icon is-start-spaced is-chevron-${iconStyle}-icon`;
	}
}

const tagStats = Object.entries(stat.tagsNumber).map( // 所有 tag 的統計資料和 icon 狀態
	([tag, uniCountsDict]) => new TagStat(tag, uniCountsDict)
);
tagStats.forEach((tagStat, i) => { // 檢查每個 tag 是否有 child tag, 決定是否要顯示 icon
	if (tagStat.haveChildren(tagStats[i+1])) tagStat.enableIcon(); // 若標籤有子標籤, 顯示下拉 icon
});

function whenIconClicked(i) { // 當 icon 被點擊
	tagStats[i].switchIcon(); // 切換按鈕的狀態 (收起/展開)
	
	const showChildren = tagStats[i].getIconState(); // 若 icon 展開, 代表要顯示 children, 反之隱藏
	for (let j = i+1; j < tagStats.length; j++) {
		if (tagStats[j].tagLevel <= tagStats[i].tagLevel) break; // 遇到 <= 自己 level 的 tag, 表示這不是子孫 node
		
		tagStats[j].show = showChildren && (tagStats[j].tagLevel === tagStats[i].tagLevel + 1); // 只有 "展開的子節點" 會顯示, 其餘一定隱藏
		if (tagStats[j].isIconEnabled()) tagStats[j].setIconState(false); // 無論如何, 一定會將子孫節點的 icon 設為收起狀態
	}
}
</script>

<style scoped>
.stat-table > tbody > tr > :nth-child(2), :nth-child(3) { /* "題目數" 和 "占比" 的值因為是數字, 所以靠右排列 */
	text-align: right;
}
.stat-table tr > :nth-child(1) { /* 減少 "標籤" 與 "題目數" 的間距 */
	padding-right: 0;
}
.stat-table tr > :nth-child(2) { /* 減少 "標籤" 與 "題目數" 的間距 */
	padding-left: 0;
}
</style>
