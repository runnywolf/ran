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
	</div>
	<div class="ts-divider is-section"></div>
	<RecurInputNew></RecurInputNew>
	<div class="ts-divider is-section"></div>
	
	
	<RecurInput :recurLatex="recurLatex" @input="(d) => { recurData = d; }"></RecurInput>
	<div class="ts-divider is-section"></div>
	<Recur
		:recurCoef="recurData.recurCoef"
		:nonHomogFunc="nonHomoFuncFixed"
		:initConst="recurData.initConst"
	></Recur>
</template>

<script setup>
import RecurInputNew from "./recur-comp/RecurInputNew.vue"; // 遞迴生成器的參數設定

// refactor line

import { computed, ref, watch } from "vue";
import RecurInput from "./recur-comp/RecurInput.vue"; // 遞迴輸入與隨機產生器
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答生成器
import { SolveRecur } from "@/components/answer-generator/Recur.js";
import { Frac } from "../../libs/RanMath";

const recurData = ref({}); // 遞迴資訊
const nonHomoFuncFixed = ref([]);
const recurLatex = ref("?");
watch(recurData, newRecurData => { // 臨時用, 改天改
	const nonHomoFunc = newRecurData.nonHomoFunc ?? {};
	nonHomoFuncFixed.value = Object.entries(nonHomoFunc).map(([key, frac_c]) => {
		const [s_k, s_frac_b] = key.split(",");
		return [frac_c, Number(s_k), Frac.fromStr(s_frac_b)]
	});
	if ((newRecurData.recurCoef ?? []).length === 0) return;
	const recur = new SolveRecur(newRecurData.recurCoef ?? [], nonHomoFuncFixed.value ?? [], newRecurData.initConst ?? []);
	recurLatex.value = recur.mlRecur();
}, { immediate: true, deep: true });
</script>
