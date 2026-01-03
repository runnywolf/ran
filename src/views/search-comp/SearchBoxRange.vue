<template>
	<div class="ts-wrap is-compact is-middle-aligned">
		
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
					<div class="item">第二行可以篩選特定學校和年份範圍。</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { dbConfig, getUniShortName } from "@lib/exam-db";

function isYearValid(year: string): boolean { // 年份字串是否合法, 只能非負整數
	const yearNum = Number(year);
	if (!Number.isInteger(yearNum)) return false;
	return yearNum >= 0;
}

function getYearNum(year: string): number { // 檢查年份字串是否合法, 若不合法則回傳 0
	return isYearValid(year) ? Number(year) : 0;
}

const emit = defineEmits([ "scope-changed" ]); // 上傳學校和年份範圍

const uniSelected = ref<string|null>(null); // 題目篩選: 學校
const year1Input = ref(""); // 題目篩選: 起始年份
const year2Input = ref(""); // 題目篩選: 結束年份, year1 不一定 <= year2, 只是為了表達一段年份範圍

watch([uniSelected, year1Input, year2Input], ([uni, year1, year2]) => {
	let yearRange = [getYearNum(year1), getYearNum(year2)]; // 轉數字, 並處理非法年份
	if (yearRange[0] > yearRange[1]) yearRange.reverse(); // 保持 [min, max]
	if (yearRange[0] === 0 && yearRange[1] === 0) yearRange[1] = 1000; // 如果範圍是 [0, 0], 視為全集合, 將範圍設成 [0, 1000年]
	emit("scope-changed", { uni, yearRange });
}, { immediate: true }); // 頁面載入時, 上傳一次 { uni, year1, year2 }
</script>

<style scoped>
.ts-wrap { /* tocas ui 多層 ts-wrap 的嵌套 bug, 父元素垂直子元素也會變成垂直的 */
  display: grid !important;
  grid-auto-flow: column;
}
.year-range-input { /* 年份範圍的輸入框 */
	width: 64px;
}
.year-range-input.invalid > input { /* 如果輸入框的年份不合法 */
	color: #f00;
}
.help-button { /* help button 與左側輸入框的額外間隔 */
	margin-left: 4px;
}
</style>
