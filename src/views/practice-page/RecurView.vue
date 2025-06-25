<template>
	<RecurInput :recurLatex="recurLatex" @input="(d) => { recurData = d; }"></RecurInput>
	<div class="ts-divider is-section"></div>
	<Recur
		:recurCoef="recurData.recurCoef"
		:nonHomogFunc="nonHomoFuncFixed"
		:initConst="recurData.initConst"
	></Recur>
</template>

<script setup>
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
