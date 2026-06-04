<template>
	<SvLatexTest></SvLatexTest>
</template>

<script setup lang="ts">
import MlTermLatexTest from "./ran-math-v3/ml-term.test.vue"; // MakeLatex.term 的 ui 測試
import SvLatexTest from "./ran-math-v3/sv-latex.test.vue"; // MakeLatex.term 的 ui 測試

import { Frac, BigIntOp, F, SV, SqrtValue, Complex, CP } from '@/libs/ran-math-v3';

try {
	
} catch (err) {
	if (err instanceof Error) console.error(err.message);
}
</script>

<style scoped>

</style>
