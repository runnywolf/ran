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
			<RecurNonHomog :nonHomog="recur.nonHomog"></RecurNonHomog>
		</div>
		<div v-else>
			遞迴式沒有非齊次部分，跳過這一步驟。
			<div style="height: 12px;"></div>
		</div>
		
		<span class="ts-text is-large is-bold">Step3：求通解</span><br>
		遞迴的通解 <vl :exp="'a_n = a_n^{(h)}' + (recur.haveNonHomog() ? ' + a_n^{(p)}' : '')" />，因此<br>
		<vl c :exp="recur.mlGeneralForm()" />
		將齊次解移項至左側：<br>
		<vl c :exp="recur.mlGeneralFormTrans()" />
		求未知係數 <vl :exp="recur.mlSomeHi()" /> 需要將 <vl :exp="recur.mlNRange()" />
		代入上式，產生 {{ recur.order }} 個式子的線性方程組，並解聯立：<br>
		<vl c :exp="recur.mlHiLinearEquations()" />
		解聯立後得到：<br>
		<vl c :exp="recur.mlHiAnswer()" />
		<br>
		檢查通解 <vl exp="a_n" /> 是否含有虛數 <vl exp="i" />：
		<div v-if="recur.answerExistComplex()">
			通解包含 <vl exp="i" />，但是 <vl exp="a_n" />
			為實數數列，因此需要將複數項轉化為實數表示。<br>
			<div style="height: 12px;"></div>
			將複數部分轉換為極座標形式，並應用歐拉公式：<br>
			<vl c :exp="recur.mlPolarCoordinate()" />
			因此<br>
			<vl c :exp="recur.mlClosedFormIm()" />
			其中
			<vl c :exp="recur.mlClosedFormImWhere()" />
		</div>
		<div v-else>
			通解不含 <vl exp="i" />，將 <vl :exp="recur.mlSomeHi()" /> 直接代回 <vl exp="a_n" />：<br>
			<vl c :exp="recur.mlClosedForm()" />
		</div>
		整理後的一般項為：<br>
		<vl c :exp="recur.mlClosedFormFix()" />
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { SolveRecur } from "./Recur";
import RecurNonHomog from "./RecurNonHomog.vue";

const props = defineProps({
	recurCoef: { type: Array, default: [] }, // 齊次部分的係數, length 代表遞迴階數
	nonHomogFunc: { type: Array, default: [] }, // 非齊次的 nf_c n^k (nf_b)^n 項會表示為 [ [nf_c, k, nf_b], ... ]
	initConst: { type: Array, default: [] }, // 遞迴的初始條件, 必須與 recurCoef 的大小相同
});

const recur = ref(); // 遞迴的計算結果
const errorMessage = ref(null); // 錯誤訊息

watch(() => [props.recurCoef, props.nonHomogFunc, props.initConst], ([newRC, newNHF, newIC]) => { // 遞迴參數改變時, 計算遞迴
	try {
		errorMessage.value = null; // 目前沒錯誤, 錯誤訊息預設為 null
		recur.value = new SolveRecur(newRC, newNHF, newIC); // 計算遞迴
	} catch (error) {
		if (error.message === "[Recur][SolveRecur.initRecur] Only support 1 ~ 3 order recurrence relation.") { // 輸入 0 階遞迴導致的錯誤
			errorMessage.value = "必須輸入 1 ~ 3 階遞迴";
		} else {
			errorMessage.value = error.message; // 若遞迴的計算過程出錯, 捕捉錯誤訊息, 並顯示
			console.error(error); // 將詳細的錯誤訊息顯示在 console 上
		}
	}
}, { immediate: true, deep: true });
</script>
