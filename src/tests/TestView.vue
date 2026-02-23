<template>
	<div class="ts-box ts-content">

	</div>
</template>

<script setup lang="ts">
// import EFtest from "./ran-math/ef-latex.test.vue"; // EF.toLatex 的 ui 測試
// import TermTest from "./ran-math/make-latex-term.test.vue"; // MakeLatex.term 的 ui 測試
// import EquationTest from "./ran-math/make-latex-equation.test.vue"; // MakeLatex.equationSystem 的 ui 測試

import { Frac } from '@/libs/ran-math-v3';

try {
	new Frac(1, 2).add(3.5)
} catch (err) {
	if (err instanceof Error) console.error(err.message);
}
</script>

<style scoped>

</style>
