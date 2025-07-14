<template>
	<div v-for="(test, i) in tests">
		<vl c :exp="ml.equationSystem(
			test.row, test.col,
			(i, j) => test.coefArr[i][j],
			test.varFunc,
			i => test.equalArr[i],
			test.equalMode
		)" />
		<span class="code">
			{{
				ml.equationSystem(
				test.row, test.col,
				(i, j) => test.coefArr[i][j],
				test.varFunc,
				i => test.equalArr[i],
				test.equalMode
				)
			}}
		</span>
		<div v-if="i !== tests.length - 1" class="ts-divider is-section"></div>
	</div>
	
</template>

<script setup>
import { MakeLatex as ml } from 'ran-math';

const tests = [
	{
		row: 3, col: 3,
		coefArr: [[0, 1, 0], [-2, 0, 3], [0, 0, 0]],
		varFunc: (i, j) => `x^{${j}}`,
		equalArr: [2, -2, null],
		equalMode: "right"
	},
	{
		row: 3, col: 3,
		coefArr: [[0, 3, 1], [444, 0, 12], [0, 0, 0]],
		varFunc: (i, j) => `a_{${i}${j}}`,
		equalArr: [2, -2, 1004],
		equalMode: "left"
	},
	{
		row: 3, col: 3,
		coefArr: [[16, -3, 1], [-444, 118, 12], [1, 2, null]],
		varFunc: (i, j) => (i === 0 && j === 0) ? null : `a_{${i}${j}}`,
		equalArr: [2, -2, 1004],
		equalMode: null
	},
];
</script>

<style>
.code {
	font-family: monospace;
	white-space: pre-line; /* 合并连续空格，保留换行符 */
	overflow-wrap: break-word; /* 更现代的属性，效果类似 word-wrap */
}
</style>
