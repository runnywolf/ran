<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			<span class="problem-score">(5%)</span>
			_______ If <vl exp="A" /> is similar to <vl exp="B" />,
			how many of the following statements are true?
		</div>
		<div class="column ts-list is-unordered" style="--gap: 0.2rem">
			<div class="item">
				<vl exp="A^{-1}" /> is similar to <vl exp="B^{-1}" />.
			</div>
			<div class="item">
				<vl exp="A" /> and <vl exp="B" /> have the same eigenvalues.
			</div>
			<div class="item">
				<vl exp="A" /> and <vl exp="B" /> represent the same transformation with respect to different bases.
			</div>
			<div class="item">
				The nullity of <vl exp="A" /> is the same as the nullity of <vl exp="B" />.
			</div>
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
