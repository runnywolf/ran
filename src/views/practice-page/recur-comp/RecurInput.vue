<template>
	<div class="ts-wrap is-vertical is-compact">
		
		<!-- 隨機生成按鈕, 調整遞迴式各區塊的按鈕 -->
		<div class="ts-wrap is-compact is-middle-aligned">
			
			<!-- 隨機生成按鈕 -->
			<button class="ts-button is-icon is-outlined">
				<span class="ts-icon is-dice-icon"></span>
			</button>
			
			<!-- 調整遞迴式各區塊的按鈕 -->
			<div v-for="regionInfo in regionList"
				class="ts-wrap is-middle-aligned group-box"
				style="--gap: 2px;"
				:style="{ '--bg': regionInfo.bgColor }"
			>
				<!-- 減少的按鈕 -->
				<button
					class="ts-button is-circular is-icon is-ghost add-sub-button"
					@click="regionInfo.add(-1)"
					:disabled="regionInfo.isMin()"
				>
					<span class="ts-icon is-minus-icon"></span>
				</button>
				
				<!-- 區塊名稱 -->
				<span>{{ regionInfo.name }}</span>
				
				<!-- 增加的按鈕 -->
				<button
					class="ts-button is-small is-circular is-icon is-ghost add-sub-button"
					@click="regionInfo.add(1)"
					:disabled="regionInfo.isMax()"
				>
					<span class="ts-icon is-plus-icon"></span>
				</button>
			</div>
			
		</div>
		
		<!-- 遞迴式 (有很多輸入框) -->
		<div class="ts-wrap is-middle-aligned" style="--gap: 0;">
			<vl exp="a_n = " />
			<div class="group-box" style="--bg: #fcc;">
				<span class="number-input" contenteditable="true">0</span>
				<vl exp="a_{n-1} ~ +" />
				<span class="number-input" contenteditable="true">0</span>
				<vl exp="a_{n-2} ~ +" />
				<span class="number-input" contenteditable="true">0</span>
				<vl exp="a_{n-3}" />
			</div>
			<vl exp="+" />
			<div class="group-box" style="--bg: #bfb;">
				<span class="number-input" contenteditable="true">0</span>
				<vl exp="+" />
				<span class="number-input" contenteditable="true">0</span>
				<vl exp="n ~ +" />
				<span class="number-input" contenteditable="true">0</span>
				<vl exp="n^2 ~ +" />
				<span class="number-input" contenteditable="true">0</span>
				<vl exp="n^3" />
			</div>
			<vl exp="+" />
			<div class="group-box" style="--bg: #ccf;">
				<span class="number-input" contenteditable="true">0</span>
				<vl exp="\cdot" />
				<span class="number-input" contenteditable="true">0</span>
				<vl exp="^n" />
			</div>
		</div>
		
		<div>
			{{ recurNum }}, {{ polyDegree }}, {{ expFuncNum }}
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const regionList = [ // 用於生成三個區塊: 遞迴階數, 多項式次數, 指數項數
	{
		name: "遞迴階數", // 區塊名稱
		bgColor: "#fcc", // 區塊的背景顏色
		add: (n) => { recurNum.value += n; }, // 將區塊對應的變數 +1 或 -1
		isMin: () => recurNum.value <= 1, // 區塊對應的變數是否到下限
		isMax: () => recurNum.value >= 3, // 區塊對應的變數是否到上限
	},
	{
		name: "多項式次數",
		bgColor: "#bfb",
		add: (n) => { polyDegree.value += n; },
		isMin: () => polyDegree.value <= -1,
		isMax: () => polyDegree.value >= 2,
	},
	{
		name: "指數項數",
		bgColor: "#ccf",
		add: (n) => { expFuncNum.value += n; },
		isMin: () => expFuncNum.value <= 0,
		isMax: () => expFuncNum.value >= 2,
	},
];

const recurNum = ref(2); // 遞迴階數, 範圍: 1 ~ 3
const polyDegree = ref(1); // 多項式次數, 範圍: -1 ~ 2
const expFuncNum = ref(0); // 指數項數, 範圍: 0 ~ 2
</script>

<style scoped>
.add-sub-button { /* + - 按鈕的樣式 */
	width: 28px; height: 28px; /* 比 tocas small 小一點 */
}
.add-sub-button:hover { /* + - 按鈕 hover 時, 會稍微變亮 */
	background-color: #fff6;
}
.group-box { /* 淺色背景的分組區域 */
	border-radius: 4px;
	padding: 4px;
	background-color: var(--bg);
	display: flex;
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
.number-input { /* 參數的輸入框 */
	border: none; border-radius: 4px;
	outline: none; /* 選取時不出現黑框 */
	padding: 0 4px;
	min-width: 20px;
	background-color: #fff;
	text-align: center;
	line-height: 1.8;
	white-space: nowrap; /* 禁止換行 */
}
</style>
