<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			<span class="problem-score">(10%)</span>
			Given
			<vl exp="\def\arraystretch{1.35} A = \!\begin{bmatrix} \frac{3}{5} & \frac{2}{5} \\ \frac{2}{5} & \frac{3}{5} \end{bmatrix}\!" />
			and
			<vl exp="\def\arraystretch{1.1} x = \!\begin{bmatrix} 2 \\ 0 \end{bmatrix}\!" />.
			If
			<vl exp="\def\arraystretch{1.1} \lim\limits_{n \to \infty} A^n x = \!\begin{bmatrix} a \\ b \end{bmatrix}\!" />,
			what is
			<vl exp="2a + b" />?
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
