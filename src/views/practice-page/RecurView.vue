<template>
	<div class="ts-text is-big is-bold">計算齊次 / 非齊次遞迴的一般式 ( 閉合形式 )</div>
	<div class="ts-list is-unordered" style="margin-top: 4px;">
		<div class="item">
			按下 [ 隨機生成 ] 的按鈕可以生成特定情況的遞迴式，用於練習。
		</div>
		<div class="item">
			下方的係數輸入框可以輸入整數，以及形式為 <code>a/b</code> 或 <code>x.xx</code> 的有理數。
		</div>
		<div class="item">
			輸入框 n^ 只能輸入 0 ~ 3 的整數。
		</div>
		<div class="item">
			輸入框最大字元數限制為 8；若輸入的字串不合法，會顯示紅色。
		</div>
	</div>
	<div class="ts-divider is-section"></div>
	<RecurInput @submit="handleRecurInputSubmit"></RecurInput>
	<div class="ts-divider is-section"></div>
	<Recur :recurCoef="recurParams[0]" :nonHomogFunc="recurParams[1]" :initConst="recurParams[2]"></Recur>
</template>

<script setup>
import { ref } from "vue";
import RecurInput from "./recur-comp/RecurInput.vue"; // 遞迴生成器的參數設定
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答生成器

const recurParams = ref([[], [], []]);

const handleRecurInputSubmit = (recurCoef, nonHomogFunc, initConst) => {
	recurParams.value = [recurCoef, nonHomogFunc, initConst];
};
</script>
