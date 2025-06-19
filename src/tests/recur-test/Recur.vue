<template>
	<Content v-if="errorMessage" colorStyle="red" collapsed>
		<code>{{ errorMessage }}</code>
	</Content>
	<div v-else>
		遞迴關係式和初始條件為<br>
		<vl c :exp="recur.mlRecur()" />
		
		<span class="ts-text is-large is-bold">Step1：求齊次解的形式</span><br>
		遞迴的齊次部分為 <vl :exp="recur.mlRecurHomogEquation()" /><br>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { SolveRecur } from "./Recur";

const props = defineProps({
	recurCoef: { type: Array, default: [] }, // 齊次部分的係數, length 代表遞迴階數
	nonHomoFunc: { type: Array, default: [] }, // 非齊次的 nf_c n^k (nf_b)^n 項會表示為 [ [nf_c, k, nf_b], ... ]
	initConst: { type: Array, default: [] }, // 遞迴的初始條件, 必須與 recurCoef 的大小相同
});

const recur = ref(); // 遞迴的計算結果
const errorMessage = ref(null); // 錯誤訊息

watch(() => [props.recurCoef, props.nonHomoFunc, props.initConst], ([newRC, newNHF, newIC]) => { // 遞迴參數改變時, 計算遞迴
	try {
		errorMessage.value = null; // 目前沒錯誤, 錯誤訊息預設為 null
		recur.value = new SolveRecur(newRC, newNHF, newIC); // 計算遞迴
	} catch (error) {
		if (newRC.length === 0) { // 輸入 0 階遞迴導致的錯誤
			errorMessage.value = "必須輸入 1 ~ 3 階遞迴";
		} else {
			errorMessage.value = error.message; // 若遞迴的計算過程出錯, 捕捉錯誤訊息, 並顯示
			console.error(error.message); // 顯示在 console 上
		}
	}
}, { immediate: true, deep: true });
</script>
