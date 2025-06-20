<template>
	<Content v-if="errorMessage" colorStyle="red" collapsed>
		<code>{{ errorMessage }}</code>
	</Content>
	<div v-else>
		遞迴關係式和初始條件為<br>
		<vl c :exp="recur.mlRecur()" />
		
		<span class="ts-text is-large is-bold">Step1：求齊次解的形式</span><br>
		遞迴的齊次部分為 <vl :exp="`a_n = ${recur.mlRecurHomog()}`" /><br>
		<vl exp="\Rightarrow" /> 特徵多項式為 <vl :exp="recur.mlCharacterPolynomial()" /><br>
		<vl :exp="`\\Rightarrow ~ t = ${recur.mlEigenvalues()}`" />
		<span v-if="recur.showNoRationalRoot()" style="color: #eb0; margin-left: 10px;">
			<span class="ts-icon is-circle-exclamation-icon"></span>&nbsp;不存在有理數形式的根
		</span>
		<div style="height: 12px;"></div>
		<span v-if="recur.getMultiRoot()">
			有{{ recur.getMultiRootNumber() === 2 ? "二" : "三" }}重根
			<vl :exp="recur.getMultiRoot().toLatex()" />，需要設
			<vl :exp="recur.mlMultiRootHomog()" /> 保證線性獨立。
		</span>
		<span v-else>
			無重根，
		</span>
		<br>
		因此將齊次解設為<br>
		<vl c :exp="`a_n^{(h)} = ${recur.mlHomogForm(true)}`" />
		
		<span class="ts-text is-large is-bold">Step2：求特解</span>
		<div v-if="recur.haveNonHomog()">
			遞迴的非齊次部分為
			<vl c :exp="`F(n) = ${recur.mlRecurNonHomog()}`" />
			合併相同的指數項：
			<vl c :exp="`F(n) = \\sum\\limits_{i} f_i(n) {b_i}^n = ${recur.nonHomog.mlCombinedExpFunc()}`" />
			猜測特解的形式為：
			<vl c :exp="recur.nonHomog.mlParticularForm()" />
			其中多項式 <vl exp="g_i(n)" /> 的次數應與 <vl exp="f_i(n)" /> 相同。<br>
			<br>
			檢查齊次解 <vl exp="a_n^{(h)}" /> 和特解 <vl exp="a_n^{(p)}" />
			之中是否存在相同的指數部分 <vl exp="{b_i}^n" />：<br>
		</div>
		<div v-else>
			遞迴式沒有非齊次部分，跳過這一步驟。
			<div style="height: 12px;"></div>
		</div>
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
