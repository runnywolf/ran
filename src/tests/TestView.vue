<template>
	<div class="ts-box ts-content">
		<TermTest></TermTest>
	</div>
</template>

<script setup lang="ts">
import TermTest from "./ran-math-v3/make-latex-term.test.vue"; // MakeLatex.term 的 ui 測試

import { Frac, BigIntOp, F, SV, SqrtValue, Complex, CP } from '@/libs/ran-math-v3';

try {
	
} catch (err) {
	if (err instanceof Error) console.error(err.message);
}
</script>

<style scoped>

</style>
