<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			(10%) The generating function in partial fraction decomposition for the recurrence equation
			<vue-latex expression="a_n = a_{n-1} + 6a_{n-2}"></vue-latex>
			for
			<vue-latex expression="a_n"></vue-latex>
			in terms of
			<vue-latex expression="a_0 = A"></vue-latex>
			and
			<vue-latex expression="a_1 = B"></vue-latex>
			is:
		</div>
		<div class="column ts-grid is-compact">
			<span>
				(A)
				<vue-latex expression="\frac{1}{5} [ \frac{2A+B}{1-3x} + \frac{3A-B}{1+2x} ]"></vue-latex>
			</span>
			<span>
				(B)
				<vue-latex expression="\frac{1}{5} [ \frac{2A+B}{1-3x} + \frac{3A+B}{1+2x} ]"></vue-latex>
			</span>
			<span class="column is-5-wide"><!-- 使選項 D 強制換行 -->
				(C)
				<vue-latex expression="\frac{1}{5} [ \frac{2A-B}{1-3x} + \frac{3A-B}{1+2x} ]"></vue-latex>
			</span>
			<span>
				(D)
				<vue-latex expression="\frac{1}{5} [ \frac{3A-B}{1-2x} + \frac{2A-B}{1+3x} ]"></vue-latex>
			</span>
			<span>
				(E)
				<vue-latex expression="\frac{1}{5} [ \frac{3A+B}{1-2x} + \frac{2A-B}{1+3x} ]"></vue-latex>
			</span>
		</div>
	</div>
</template>
