<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			<span class="problem-score">(10%)</span>
			_______ The number of positive integer solutions of
			<vl exp="x_1 + x_2 + \cdots + x_n = r" /> equals
		</div>
		<div class="column ts-wrap">
			<span>(A) <vl exp="\binom{r-1}{n-1}" /></span>
			<span>(B) <vl exp="\binom{n+r-1}{n-1}" /></span>
			<span>(C) <vl exp="\binom{r}{n}" /></span>
			<span>(D) <vl exp="r^n" /></span>
			<span>(E) <vl exp="(rn)!" /></span>
		</div>
	</div>
</template>
