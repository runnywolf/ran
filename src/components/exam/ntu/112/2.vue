<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			(10%) Which solves
			<vue-latex expression="a_n = -a_{n-1} + 6a_{n-2}"></vue-latex>
			for
			<vue-latex expression="a_n"></vue-latex>
			in terms of
			<vue-latex expression="a_0 = A"></vue-latex>
			and
			<vue-latex expression="a_1 = B"></vue-latex>
			:
		</div>
		<div class="column ts-wrap is-compact">
			<span>
				(A)
				<vue-latex expression="\frac{1}{5} [ (-3)^n(2A-B) + 2^n(3A+B) ]"></vue-latex>
			</span>
			<span>
				(B)
				<vue-latex expression="\frac{1}{5} [ (-3)^n(2A-B) + 2^n(3A-B) ]"></vue-latex>
			</span>
			<span>
				(C)
				<vue-latex expression="\frac{1}{5} [ (-2)^n(3A-B) + 3^n(2A+B) ]"></vue-latex>
			</span>
			<span>
				(D)
				<vue-latex expression="\frac{1}{5} [ (-2)^n(3A+B) + 3^n(2A+B) ]"></vue-latex>
			</span>
			<span>
				(E)
				<vue-latex expression="\frac{1}{5} [ (-2)^n(3A-B) + 3^n(2A-B) ]"></vue-latex>
			</span>
		</div>
	</div>
</template>

<script setup>
import { VueLatex } from "vatex";
</script>
