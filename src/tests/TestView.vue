<template>
	<MlEquationTest></MlEquationTest>
</template>

<script setup lang="ts">
import SvTest from "./ran-math-v3/sqrt-value-latex.test.vue"; // SqrtValue.toLatex 的 ui 測試
import MlTermTest from "./ran-math-v3/ml-term.test.vue"; // MakeLatex.term 的 ui 測試
import MlEquationTest from "./ran-math-v3/ml-equation.test.vue"; // MakeLatex.equationSystem 的 ui 測試

import { Frac, BigIntOp, F, SV, SqrtValue, Complex, CP } from '@/libs/ran-math-v3';

try {
	
} catch (err) {
	if (err instanceof Error) console.error(err.message);
}
</script>

<style scoped>

</style>
