<template>
	<div class="ts-text is-big" style="margin-top: -4px; margin-bottom: 8px;">程式碼</div>
	<div class="ts-box is-collapsed">
		<table class="ts-table is-collapsed stat-table">
			<thead>
				<tr>
					<th>範圍</th><th>檔案數 (Files)</th><th>行數 (Lines)</th><th>檔案大小 (Bytes)</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in displayList">
					<td>{{ item.rangeName }}</td>
					<td v-for="valueName in ['number', 'line', 'sizeByte']">
						<span>{{ item.cs.sum[valueName].toLocaleString() }}</span>
						<div class="stacked-bar">
							<div v-for="[fileTypeName, value, ratio] in item.cs.getFileTypePercent(valueName)"
								:class="`bg-color-${fileTypeName}`"
								:style="{ '--t': ratio }"
								:data-tooltip="`${fileTypeName} - ${value.toLocaleString()} ( ${ratio.toFixed(2)}% )`"
							></div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import codeStatData from "@/stat/code-stat.json"; // 統計資料

class CodeStat { // 統計資料
	static getEmptyFileTypeStat() {
		return { number: 0, line: 0, sizeByte: 0 };
	}
	
	static fileTypeStatAdd(a, b) { // 將 b 的資料加到 a
		for (const key of ["number", "line", "sizeByte"]) a[key] += b[key];
	}
	
	constructor(dict = null) {
		this.data = {};
		this.sum = CodeStat.getEmptyFileTypeStat();
		if (dict) this.add({ data: dict });
	}
	
	add(cs) { // 與另一個 CodeStat 合併
		for (const [fileType, fileTypeStat] of Object.entries(cs.data)) {
			if (!(fileType in this.data)) { // 沒有某個檔案類型的統計資料, 新建一個
				this.data[fileType] = CodeStat.getEmptyFileTypeStat();
			}
			CodeStat.fileTypeStatAdd(this.data[fileType], fileTypeStat);
			CodeStat.fileTypeStatAdd(this.sum, fileTypeStat);
		}
	}
	
	getFileTypePercent(valueName) { // 回傳排序過的檔案統計數字
		let ratios = [];
		for (const [fileType, fileTypeStat] of Object.entries(this.data)) {
			ratios.push([
				fileType, // 副檔名
				fileTypeStat[valueName], // 數字
				fileTypeStat[valueName] / this.sum[valueName] * 100 // 數字佔的比例 (%)
			]);
		}
		return ratios.sort((a, b) => b[1] - a[1]); // 降序排列
	}
}

const dict_cs_srcItems = {}; // 每一個 src 下的資料夾/檔案的統計資料
for (const [rangeName, rangeStat] of Object.entries(codeStatData)) {
	dict_cs_srcItems[rangeName] = new CodeStat(rangeStat);
}

const cs_app = new CodeStat(); // app 的統計資料
for (const rangeName of [ "components", "libs", "router", "styles", "views", "App.vue", "main.js" ]) {
	cs_app.add(dict_cs_srcItems[rangeName]);
}

const displayList = [ // 要顯示的統計資料
	{ rangeName: "App", cs: cs_app },
	{ rangeName: "歷屆試題", cs: dict_cs_srcItems["exam-db"] },
	{ rangeName: "測試", cs: dict_cs_srcItems["tests"] },
	{ rangeName: "Docs", cs: dict_cs_srcItems["docs"] },
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
.bg-color-md {
	background-color: #444 !important;
}
.bg-color-webp, .bg-color-png {
	background-color: #c4c !important;
}
</style>
