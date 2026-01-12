<template>
	<div class="ts-wrap is-compact is-middle-aligned">
		
		<!-- 收藏狀態篩選 -->
		<div class="save-icon-wrapper" @click="saveType = (saveType + 1) % 3">
			<span class="ts-icon is-star-icon is-large" :class="getSaveIconClass(saveType)"></span>
		</div>
		
		<!-- 學校篩選 -->
		<div class="ts-select is-solid">
			<select v-model="uniSelected">
				<option :value="null">全部學校</option>
				<option v-for="uni in dbConfig.uniList" :value="uni">{{ getUniShortName(uni) }}</option>
			</select>
		</div>
		
		<!-- 年份範圍篩選 -->
		<div class="ts-input year-range-input" :class="{ 'invalid': !isYearValid(year1Input) }">
			<input type="text" placeholder="from" v-model="year1Input">
		</div>
		<div>~</div>
		<div class="ts-input year-range-input" :class="{ 'invalid': !isYearValid(year2Input) }">
			<input type="text" placeholder="to" v-model="year2Input">
		</div>
		
		<!-- help button & help 彈出內容 -->
		<button class="ts-icon is-circle-question-icon is-large help-button" popovertarget="search-page-help"></button>
		<div class="ts-popover" id="search-page-help" popover>
			<div class="ts-content is-dense" style="width: 500px;">
				<div class="ts-list is-unordered">
					<div class="item">可以在搜尋框搜尋想要的題目標籤，支援中英文，點擊搜尋結果即可將該標籤加入搜尋條件。</div>
					<div class="item">點擊搜尋框下方已加入的標籤，可將其從搜尋條件中移除。</div>
					<div class="item">如果只想用搜尋框內容查找題目段落，請點擊建議列表以外的區域，建議列表將自動關閉。</div>
					<div class="item">搜尋框會無視大小寫，直接比對題目段落中的連續子字串，也支援搜尋 LaTeX 語法。</div>
					<div class="item">標籤篩選規則：所有搜尋標籤必須為該題目任一標籤的子標籤。</div>
					<div class="item">第二行可以篩選收藏狀態、特定學校和年份範圍。</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { dbConfig, getUniShortName } from "@lib/exam-db";

function getSaveIconClass(type: number): string { // 將 "收藏篩選狀態" 轉換為對應的 icon 樣式 class
	if (type === 0) return "is-regular save-icon-all"; // 全部: 灰色+空心
	if (type === 1) return "is-regular"; // 僅未收藏: tocas黑色+空心
	return "save-icon-saved"; // 僅已收藏: 橘色+實心
}

function isYearValid(year: string): boolean { // 檢查年份字串是否合法, 必須為非負整數 (不允許小數或負數)
	const yearNum = Number(year);
	if (!Number.isInteger(yearNum)) return false;
	return yearNum >= 0;
}

function getYearNum(year: string): number { // 將年份字串轉為數字, 若格式不合法, 則回傳 0 作為預設值
	return isYearValid(year) ? Number(year) : 0;
}

const emit = defineEmits([ "changed" ]); // 當搜尋範圍 (收藏類型/學校/年份) 變動時, 向父層回傳目前的篩選條件

const saveType = ref<number>(0); // 收藏狀態篩選: 0全部, 1僅未收藏, 2僅已收藏
const uniSelected = ref<string|null>(null); // 學校篩選: 學校, 若為 null 則為全部學校
const year1Input = ref<string>(""); // 年份範圍篩選: 起始年份
const year2Input = ref<string>(""); // 年份範圍篩選: 結束年份, year1 不一定 <= year2, 只是為了表達一段年份範圍

watch([saveType, uniSelected, year1Input, year2Input], ([type, uni, year1, year2]) => {
	let yearRange = [getYearNum(year1), getYearNum(year2)]; // 將年份輸入轉為數字, 並自動處理不合法輸入
	if (yearRange[0] > yearRange[1]) yearRange.reverse(); // 確保年份區間為 [min, max]
	if (yearRange[0] === 0 && yearRange[1] === 0) yearRange[1] = 1000; // 如果範圍是 [0, 0], 視為全集合, 將範圍設成 [0, 1000年]
	emit("changed", { saveType: type, uni, yearStart: yearRange[0], yearEnd: yearRange[1] });
}, { immediate: true }); // 頁面載入時, 將目前的搜尋範圍回傳給父層
</script>

<style scoped>
.save-icon-wrapper { /* 收藏狀態的 icon 與學校選單的額外間距 */
	margin-right: 4px;
}
.save-icon-all { /* 包含已收藏未收藏的篩選按鈕顏色 */
	color: #ccc;
}
.save-icon-saved { /* 已收藏的篩選按鈕顏色 */
	color: #fa0;
}
.year-range-input { /* 年份範圍的輸入框 */
	width: 64px;
}
.year-range-input.invalid > input { /* 如果輸入框的年份不合法, 字會變成紅色的 */
	color: #f00;
}
.help-button { /* help button 與左側輸入框的額外間距 */
	margin-left: 4px;
}
</style>
