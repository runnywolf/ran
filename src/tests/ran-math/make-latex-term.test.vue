<template>
	<div class="ts-wrap is-vertical is-compact">
		<div>
			測試 <code style="margin: 0 4px;">RanMath - MakeLatex.term</code>
			生成 <vl exp="\pm c b^p" /> 形式的 <vl exp="\KaTeX" /> 語法。<br>
			滑鼠懸停顯示的藍色 <vl exp="\KaTeX" /> 字串為輸入的參數。
		</div>
		<div v-for="coef in coefTests" class="ts-box is-collapsed">
			<table class="ts-table is-collapsed is-celled is-definition">
				<thead>
					<tr>
						<th><vl exp="b" /> ╲ <vl exp="^p" /></th>
						<th v-for="pow in powTests"><vl :exp="toLatex(pow)" /></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="base in baseTests">
						<td><vl :exp="toLatex(base)" /></td>
						<td v-for="pow in powTests" class="hover-latex">
							<vl :exp="ML.term(coef, base, pow)" /><br>
							<vl style="color: blue" :exp="`${toLatex(coef)}(${toLatex(base)})^{${toLatex(pow)}}`" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { F, Frac, MakeLatex as ML } from "ran-math";

const coefTests = ["c", -2, -1, 0, 1, 2, F(-2, 3), "c^n"];
const baseTests = ["b", -2, -1, 0, 1, 2, 10, F(-1, 2)];
const powTests = ["p", -2, -1, 0, 1, 2, F(3, 2)];

const toLatex = (value) => {
	if (Frac.isFrac(value)) return value.toLatex();
	return String(value);
};
</script>

<style scoped>
.ts-table > tbody > tr > td { /* 表格元素置中 */
	text-align: center;
}
.ts-table > thead > tr > th { /* 表格元素置中 */
	text-align: center;
}
.hover-latex:not(:hover) > :nth-child(3) {
	display: none;
}
.hover-latex:hover > :not(:nth-child(3)) {
	display: none;
}
</style>
