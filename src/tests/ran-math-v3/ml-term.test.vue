<template>
	<div class="ts-wrap is-vertical is-center-aligned is-compact">
		<div>
			測試 <code style="margin: 0 4px;">MakeLatex.term</code>
			是否能生成 <vl exp="c b^p" /> 形式的 <vl exp="\KaTeX" /> 語法。<br>
			滑鼠懸停顯示的藍色 <vl exp="\KaTeX" /> 字串為輸入的參數。
		</div>
		<div v-for="coef in coefTests" class="ts-box is-collapsed">
			<table class="ts-table is-collapsed is-celled is-definition">
				<thead>
					<tr>
						<th><span class="ran-no-break"><vl exp="b" /> ╲ <vl exp="^p" /></span></th>
						<th v-for="pow in powTests"><vl :exp="anyToLatex(pow)" /></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="base in baseTests">
						<td><vl :exp="anyToLatex(base)" /></td>
						<td v-for="pow in powTests" class="hover-latex">
							<vl :exp="ml.term(coef, base, pow)" /><br>
							<vl style="color: blue" :exp="`${anyToLatex(coef)}(${anyToLatex(base)})^{${anyToLatex(pow)}}`" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { F, MakeLatex as ml } from "@lib/ran-math-v3";

const coefTests = ["c", -2, -1, 0, 1, 2, F(-2, 3), "a+b"];
const baseTests = ["b", -2, -1, 0, 1, 2, 10, F(-1, 2), "a+b"];
const powTests = ["p", -2, -1, 0, 1, 2, F(3, 2)];

function anyToLatex(x: any): string { // 嘗試回傳 x.toLatex(), 如果失敗則回傳 String(x)
	return String(typeof x?.toLatex === "function" ? x.toLatex() : x);
}
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
