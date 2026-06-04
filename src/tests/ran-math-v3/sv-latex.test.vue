<template>
	<div class="ts-wrap is-vertical is-center-aligned is-compact">
		<template v-for="option in optionTests">
			<code>options: {{ option }}</code>
			<div class="ts-box is-collapsed" style="margin-bottom: 30px;">
				<table class="ts-table is-collapsed is-celled ran-no-break">
					<thead>
						<tr>
							<th>SqrtValue</th>
							<th>LaTex</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="sv in svTests">
							<td><code>{{ sv.toStr() }}</code></td>
							<td class="hover-latex">
								<vl :exp="sv.toLatex(option)" />
								<code style="color: blue">{{ sv.toLatex(option) }}</code>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { F, SqrtValue, SV } from "@lib/ran-math-v3";

const optionTests: { complexForm?: "expand"|"group", fracMode?: "none"|"frac" }[] = [
	{ complexForm: "expand", fracMode: "none" },
	{ complexForm: "expand", fracMode: "frac" },
	{ complexForm: "group", fracMode: "none" },
	{ complexForm: "group", fracMode: "frac" },
];
const svTests: SqrtValue[] = [
	SV(),
	SV([1, 1]),
	SV([-1, 1]),
	SV([1, 2]),
	SV([-1, 2]),
	SV([3, 1], [1, 2]),
	SV([-3, 1], [2, 3], [-1, 5]),
	SV([1, 8], [1, 18]), // 化簡並合併為 5√2
	SV([F(1, 2), 1]),
	SV([F(-3, 4), 2]),
	SV([F(1, 2), 1], [F(1, 3), 2]),
	SV([F(-2, 3), 1], [F(5, 6), 3], [F(-7, 10), 5]),
	SV([1, -1]),
	SV([-1, -1]),
	SV([2, -2]),
	SV([1, 1], [1, -1]),
	SV([2, 1], [-3, -1]),
	SV([2, 1], [1, 2], [3, -1], [1, -3]),
	SV([F(1, 2), 1], [F(-2, 5), -1], [F(7, 6), -3]),
	SV([1, -1], [-2, -2], [3, -5]),
	SV([F(-1, 2), 1], [F(2, 3), 2], [F(-3, 4), -6]),
	SV([1, -2]),
	SV([-1, -2]),
	SV([1, -2], [-1, -3]),
	SV([1, F(1, 2)]),
	SV([1, F(-1, 2)]),
	SV([F(1, 6), 1], [F(-1, 3), 2], [F(5, 2), -1]),
	SV([1, 2], [1, -1], [-1, -3]),
];
</script>

<style scoped>
.hover-latex:not(:hover) > :nth-child(2) {
	display: none;
}
.hover-latex:hover > :not(:nth-child(2)) {
	display: none;
}
</style>
