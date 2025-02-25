<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			(10%) Given
			<vue-latex expression="\def\arraystretch{1.35} A = \begin{bmatrix} \frac{3}{5} & \frac{2}{5} \\ \frac{2}{5} & \frac{3}{5} \end{bmatrix}"></vue-latex>
			and
			<vue-latex expression="x = \begin{bmatrix} 2 \\ 0 \end{bmatrix}"></vue-latex>.
			If
			<vue-latex expression="\lim\limits_{n \to \infty} A^n x = \begin{bmatrix} a \\ b \end{bmatrix}"></vue-latex>,
			what is
			<vue-latex expression="2a + b"></vue-latex>?
		</div>
		<div class="column ts-wrap">
			<span>(A) 0</span>
			<span>(B) 1</span>
			<span>(C) 2</span>
			<span>(D) 3</span>
			<span>(E) 4</span>
		</div>
	</div>
</template>

<script setup>
import { VueLatex } from "vatex";
</script>
