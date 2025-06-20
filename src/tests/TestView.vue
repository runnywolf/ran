<template>
	<div class="ts-box ts-content">
		<Recur
			:recurCoef="[1, 1, -1]"
			:nonHomoFunc="[[F(1, 2), 2, F(-2, 3)], [5, 0, 2], [-2, 1, 1]]"
			:initConst="[1, 2]"
		></Recur>
	</div>
</template>

<script setup>
import { SolveQuad, EF, F, gcd } from "ran-math";

// import EFtest from "./ran-math/ef-latex.test.vue"; // EF.toLatex 的 ui 測試
// import TermTest from "./ran-math/make-latex-term.test.vue"; // MakeLatex.term 的 ui 測試
import Recur from "./recur-test/Recur.vue"
</script>
