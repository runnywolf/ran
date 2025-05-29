<template>
	<div class="ts-box is-collapsed">
		<table class="ts-table is-collapsed is-celled">
			<thead>
				<tr>
					<th>EF</th>
					<th>LaTex</th>
					<th>LaTex Code</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="ef in efTests">
					<td><code>{{ ef.toStr() }}</code></td>
					<td><vl :exp="ef.toLatex()" /></td>
					<td><code>"{{ ef.toLatex() }}"</code></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { F, EF } from "ran-math";

const efTests = [
	new EF(0, 17, 2), // s > 0 ; a = 0
	new EF(0, 2, 2),
	new EF(0, 1, 2),
	new EF(0, -1, 2),
	new EF(0, -2, 2),
	new EF(0, -12, 2),
	
	new EF(12, 17, 2), // s > 0 ; a != 0
	new EF(-1, 2, 2),
	new EF(-3, 1, 2),
	new EF(7, -1, 2),
	new EF(-1, -2, 2),
	new EF(-13, -12, 2),
	
	new EF(F(4, 7), F(5, 6), 2), // s > 0 ; d > 1
	new EF(2, F(-5, 6), 2),
	new EF(F(-4, 7), 2, 2),
	new EF(F(-4, 7), F(-5, 6), 2),
	new EF(1, F(-1, 3), 2),
	new EF(1, F(1, 3), 2),
	new EF(0, F(-1, 3), 2), // a = 0
	new EF(0, F(1, 3), 2),
	
	new EF(F(-1, 3)), // s = 0
	new EF(F(1, 3)),
	new EF(0),
	new EF(-7),
	new EF(3.14),
	new EF(-3.1415926),
	
	new EF(0, -7.62, -1), // s < 0, a is float
	new EF(5.56, -7.62, -1),
	new EF(0, 7.62, -1),
	new EF(-5.56, 7.62, -1),
	
	new EF(0, 17, -1), // s < 0 ; a = 0
	new EF(0, 2, -1),
	new EF(0, 1, -1),
	new EF(0, -1, -1),
	new EF(0, -2, -1),
	new EF(0, -12, -1),
	
	new EF(12, 17, -2), // s < 0 ; a != 0
	new EF(-1, 2, -2),
	new EF(-3, 1, -2),
	new EF(7, -1, -2),
	new EF(-1, -2, -2),
	new EF(-13, -12, -2),
	
	new EF(F(4, 7), F(5, 6), -1), // s > 0 ; d > 1
	new EF(2, F(-5, 6), -2),
	new EF(F(-4, 7), 2, -2),
	new EF(F(-4, 7), F(-5, 6), -1),
	new EF(1, F(-1, 3), -1),
	new EF(1, F(1, 3), -2),
	new EF(0, F(-1, 3), -2), // a = 0
	new EF(0, F(1, 3), -1),
];
</script>
