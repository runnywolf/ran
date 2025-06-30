<template>
	<div class="ts-wrap is-compact is-middle-aligned">
		<!-- 隨機生成按鈕, 按下後會生成一個隨機遞迴 -->
		<button class="ts-button is-outlined" @click="clickSubmit">隨機生成</button>
		
		<!-- 數字範圍 selector -->
		<div class="ts-select is-solid">
			<select v-model="numberRange">
				<option value="3">數字 ± 3&nbsp;&nbsp;以內</option>
				<option value="6">數字 ± 6&nbsp;&nbsp;以內</option>
				<option value="10">數字 ± 10&nbsp;&nbsp;以內</option>
			</select>
		</div>
		
		<!-- 特徵根的類型 selector -->
		<div class="ts-select is-solid">
			<select v-model="rootType">
				<option value="int">整數</option>
				<option value="frac">分數</option>
				<option value="root">帶有根號</option>
				<option value="complex">複數</option>
			</select>
		</div>
		
		<span>的遞迴特徵根，以及整數的非齊次部分和初始條件。</span>
		
	</div>
</template>

<script setup> // 本組件的功能為: 調整遞迴生成器的參數
import { ref } from 'vue';

const emit = defineEmits([ "submit" ]); // 上傳隨機生成的模式

const numberRange = ref("3"); // 數字範圍 (隨機生成的值可以使用的數字的範圍)
const rootType = ref("int"); // 特徵根的類型

const clickSubmit = () => { // 按下隨機生成的按鈕
	emit("submit", Number(numberRange.value), rootType.value); // 上傳隨機模式至 RecurInput.vue
};
</script>
