<template>
	<div class="ts-box ts-content">
		
	</div>
</template>

<script setup>
import { Matrix, EF, F } from "ran-math";
// import EFtest from "./ran-math/ef-latex.test.vue"; // EF.toLatex 的 ui 測試

console.log(new Matrix(3, 3, (i, j) => new EF(F(i-j, i+2), F(i-j+1, j+2), F((i+j+1)*j, 7))).toStr());
</script>
