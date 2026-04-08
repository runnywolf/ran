<template>
	<div class="ts-box ts-content">
		<vl c :exp="SV().toLatex('sum')"></vl>
	</div>
</template>

<script setup lang="ts">
// import EFtest from "./ran-math/ef-latex.test.vue"; // EF.toLatex 的 ui 測試
// import TermTest from "./ran-math/make-latex-term.test.vue"; // MakeLatex.term 的 ui 測試
// import EquationTest from "./ran-math/make-latex-equation.test.vue"; // MakeLatex.equationSystem 的 ui 測試

import { Frac, BigIntOp, F, SV, SqrtValue } from '@/libs/ran-math-v3';

let sv = SqrtValue.fromStr("1 + 4s2 + -2s6 + 2s-2 + s-3");
const sv_inv = SV([1, 1]).div(sv);
console.log(`sv: ${sv.toStr()}`, sv);
console.log(`inv: ${sv_inv.toStr()}`);
console.log(`1 check: ${sv_inv.mul(sv).toStr()}`);
try {
	
} catch (err) {
	if (err instanceof Error) console.error(err.message);
}
</script>

<style scoped>

</style>
