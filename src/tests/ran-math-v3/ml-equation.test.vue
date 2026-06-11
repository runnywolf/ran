<template>
	<div class="ts-wrap is-vertical is-center-aligned is-compact">
		<div v-for="(result, i) in results">
			<vl c :exp="result" />
			<span class="code">{{ result }}</span>
			<div v-if="i !== tests.length - 1" class="ts-divider is-section"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { MakeLatex as ml } from "@lib/ran-math-v3";

interface Test {
	row: number,
	col: number,
	coefArr: any[][],
	baseFn: (i: number, j: number) => any,
	equalArr: any[],
	equalMode: "none"|"left"|"right"
}
const tests: Test[] = [
	{
		row: 3, col: 3,
		coefArr: [[0, 1, 0], [-2, 0, 3], [0, 0, 0]],
		baseFn: (i, j) => `x^{${j}}`,
		equalArr: [2, -2, null],
		equalMode: "right"
	},
	{
		row: 3, col: 3,
		coefArr: [[0, 3, 1], [444, 0, 12], [0, 0, 0]],
		baseFn: (i, j) => `a_{${i}${j}}`,
		equalArr: [2, -2, 1004],
		equalMode: "left"
	},
	{
		row: 3, col: 3,
		coefArr: [[16, -3, 1], [-444, 118, 12], [1, 2, null]],
		baseFn: (i, j) => (i === 0 && j === 0) ? undefined : `a_{${i}${j}}`,
		equalArr: [2, -2, 1004],
		equalMode: "none"
	},
	{
		row: 1, col: 2,
		coefArr: [[1, 1]],
		baseFn: (i, j) => ["x", "y"][j],
		equalArr: [1],
		equalMode: "right"
	},
	{
		row: 2, col: 1,
		coefArr: [[1], [-1]],
		baseFn: (i, j) => `x_{${i}}`,
		equalArr: [3, -3],
		equalMode: "right"
	},
	{
		row: 1, col: 3,
		coefArr: [[2, -1, 0]],
		baseFn: (i, j) => ["x", "y", "z"][j],
		equalArr: [0],
		equalMode: "none"
	},
	{
		row: 3, col: 1,
		coefArr: [[1], [0], [2]],
		baseFn: (i, j) => "t",
		equalArr: [1, 0, -1],
		equalMode: "left"
	},
	{
		row: 2, col: 3,
		coefArr: [[1, 0, -2], [0, 3, 1]],
		baseFn: (i, j) => ["x", "y", "z"][j],
		equalArr: [5, -7],
		equalMode: "right"
	},
	{
		row: 3, col: 2,
		coefArr: [[1, 2], [-3, 0], [null, -1]],
		baseFn: (i, j) => `a_{${j}}`,
		equalArr: [4, null, -6],
		equalMode: "left"
	},
	{
		row: 2, col: 3,
		coefArr: [[-1, 2, null], [3, -4, 5]],
		baseFn: (i, j) => (i === 0 && j === 2) ? undefined : `u_{${i}${j}}`,
		equalArr: [null, 9],
		equalMode: "none"
	},
];

const results = tests.map(({ row, col, coefArr, baseFn, equalArr, equalMode }) => {
	return ml.equationSystem(row, col, (i, j) => coefArr[i][j], baseFn, i => equalArr[i], equalMode);
});
</script>

<style scoped>
.code {
	font-family: monospace;
	white-space: pre-line;
	overflow-wrap: break-word;
}
</style>
