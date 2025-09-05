<template>
	<div class="ts-text is-big is-bold" style="margin-top: -6px; margin-bottom: 8px;">
		程式碼
		<span
			class="ts-icon is-circle-exclamation-icon is-start-spaced"
			data-tooltip="以下所有的統計資料都並非動態，而是依賴開發環境的手動更新，可以參考 src/stat/make-stat.py。"
		></span>
	</div>
	<div class="ts-box is-collapsed">
		<table class="ts-table is-collapsed stat-table">
			<thead>
				<tr>
					<th>範圍</th><th>檔案數 (Files)</th><th>行數 (Lines)</th><th>檔案大小 (Bytes)</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="rowStat in rowStats">
					<td>{{ rowStat.name }}</td>
					<td v-for="valueName in ['number', 'line', 'sizeByte']">
						<span>{{ rowStat.statSum[valueName].toLocaleString() }}</span>
						<div class="stacked-bar">
							<div v-for="[fileTypeName, value, percent] in rowStat.getFileTypePercent(valueName)"
								:class="`bg-color-${fileTypeName}`"
								:style="{ '--t': percent }"
								:data-tooltip="`${fileTypeName} - ${value.toLocaleString()} ( ${percent.toFixed(2)}% )`"
							></div><!-- 驚喜! 三層 v-for 嵌套! -->
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import codeStatData from "@/stat/code-stat.json"; // 統計資料

class RowStat { // 每一列的統計資料
	constructor(name, stat) {
		this.name = name; // 範圍名稱
		this.stat = stat; // 統計資料
		this.statSum = Object.values(this.stat).reduce((acc, fileTypeStat) => { // 所有檔案類型的加總
			acc.number += fileTypeStat.number;
			acc.line += fileTypeStat.line;
			acc.sizeByte += fileTypeStat.sizeByte;
			return acc;
		}, { number: 0, line: 0, sizeByte: 0 });
	}
	
	getFileTypePercent(valueName) { // 回傳排序過的檔案統計數字
		let ratios = [];
		for (const [fileType, fileTypeStat] of Object.entries(this.stat)) {
			ratios.push([
				fileType, // 副檔名
				fileTypeStat[valueName], // 數字
				fileTypeStat[valueName] / this.statSum[valueName] * 100 // 數字佔的比例 (%)
			]);
		}
		return ratios.sort((a, b) => b[1] - a[1]); // 降序排列
	}
}

const rowStats = [ // 要顯示的統計資料
	new RowStat("App", codeStatData.app),
	new RowStat("歷屆試題", codeStatData.exam),
	new RowStat("測試", codeStatData.test),
	new RowStat("Docs", codeStatData.docs),
	new RowStat("小工具", codeStatData.tool),
];
</script>

<style scoped>
.stat-table > tbody > tr > td:not(:first-child), th:not(:first-child) {
	width: 150px;
	text-align: right;
	vertical-align: middle;
}
.stat-table > tbody > tr > td:not(:first-child):not(:hover) > div.stacked-bar { /* 一般情況比例條會隱藏 */
	display: none;
}
.stat-table > tbody > tr > td:not(:first-child):hover > span { /* hover 時, 隱藏總數, 並顯示比例條 */
	display: none;
}
.stacked-bar { /* 比例條 */
	height: 24px;
	border-radius: 4px; overflow: hidden; /* 圓角, 並裁切子元素 */
	display: flex;
}
.stacked-bar > div { /* 比例條的色塊 */
	background-color: #aaa; /* 預設顏色 */
	width: calc(var(--t) * 1%);
}
.stacked-bar > div:first-child { /* 最左側的色塊的左上/左下的圓角 */
	border-bottom-left-radius: 4px;
	border-top-left-radius: 4px;
}
.stacked-bar > div:last-child { /* 最右側的色塊的右上/右下的圓角 */
	border-bottom-right-radius: 4px;
	border-top-right-radius: 4px;
}
.stacked-bar:hover > div:not(:hover) { /* 當某一個色塊被 hover 時, 使其他色塊變不透明 */
	opacity: 0.2;
	transition: opacity 0.2s ease-in-out;
}
.bg-color-html {
	background-color: #e34c26 !important;
}
.bg-color-vue {
	background-color: #42b883 !important;
}
.bg-color-js {
	background-color: #f7df1e !important;
}
.bg-color-json {
	background-color: #0bb !important;
}
.bg-color-css {
	background-color: #264de4 !important;
}
.bg-color-py {
	background-color: #3776ab !important;
}
.bg-color-md {
	background-color: #444 !important;
}
.bg-color-webp, .bg-color-png {
	background-color: #c4c !important;
}
</style>
