<template>
	<div class="ts-box ts-content">

	</div>
</template>

<script setup lang="ts">
// import EFtest from "./ran-math/ef-latex.test.vue"; // EF.toLatex 的 ui 測試
// import TermTest from "./ran-math/make-latex-term.test.vue"; // MakeLatex.term 的 ui 測試
// import EquationTest from "./ran-math/make-latex-equation.test.vue"; // MakeLatex.equationSystem 的 ui 測試

import { Frac, BigIntOp, F, SV } from '@/libs/ran-math-v3';

try {
	let a = [1, -5, -1, 4, 2, -3]
	console.log(a.sort((x, y) => {
		if (x < 0 === y < 0) return x < 0 ? y-x : x-y;
		return x < 0 ? 1 : -1;
	}))
} catch (err) {
	if (err instanceof Error) console.error(err.message);
}
</script>

<style scoped>

</style>
