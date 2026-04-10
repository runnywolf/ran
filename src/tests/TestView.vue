<template>
	<div class="ts-box ts-content">
		<vl c :exp="CP(2.5, 2.333333).toLatex()"></vl>
	</div>
</template>

<script setup lang="ts">
// import EFtest from "./ran-math/ef-latex.test.vue"; // EF.toLatex 的 ui 測試
// import TermTest from "./ran-math/make-latex-term.test.vue"; // MakeLatex.term 的 ui 測試
// import EquationTest from "./ran-math/make-latex-equation.test.vue"; // MakeLatex.equationSystem 的 ui 測試

import { Frac, BigIntOp, F, SV, SqrtValue, Complex, CP } from '@/libs/ran-math-v3';

try {
	
} catch (err) {
	if (err instanceof Error) console.error(err.message);
}
</script>

<style scoped>

</style>
