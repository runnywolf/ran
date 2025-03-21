<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			<span class="problem-score">(10%)</span>
			Which ones of the following sets are linearly independent?
			Points will be counted only if all the answers are correct.
		</div>
		<ul class="upper-alpha-list">
			<li>
				<vl exp="\{ -x^2 + 3x + 6 , x^3 + 2 , x^3 - 3x^2 + 5 \}" />
				in
				<vl exp="P_3(R)" />
			</li>
			<li>
				<vl exp="
					\left\{
					\!\begin{pmatrix} 0 & -1 \\ 1 & 1 \end{pmatrix}\!,
					\!\begin{pmatrix} -1 & 2 \\ 0 & 0 \end{pmatrix}\!,
					\!\begin{pmatrix} 2 & 1 \\ 0 & 0 \end{pmatrix}\!,
					\!\begin{pmatrix} 1 & 0 \\ 1 & 0 \end{pmatrix}\!
					\right\}
				" />
				in
				<vl exp="M_{2 \times 2}(R)" />
			</li>
			<li>
				<vl exp="
					\left\{
					\!\begin{pmatrix} 1 & 1 \\ 0 & 0 \\ 0 & 0 \end{pmatrix}\!,
					\!\begin{pmatrix} 0 & 0 \\ 1 & 1 \\ 0 & 0 \end{pmatrix}\!,
					\!\begin{pmatrix} 0 & 0 \\ 0 & 0 \\ 1 & 1 \end{pmatrix}\!,
					\!\begin{pmatrix} 1 & 0 \\ 1 & 0 \\ 1 & 0 \end{pmatrix}\!,
					\!\begin{pmatrix} 0 & 1 \\ 0 & 1 \\ 0 & 1 \end{pmatrix}\!
					\right\}
				" />
				in
				<vl exp="M_{3 \times 2}(R)" />
			</li>
			<li>
				<vl exp="
					\left\{
					\!\begin{pmatrix} 2 \\ 1 \\ 2 \\ -1 \end{pmatrix}\!,
					\!\begin{pmatrix} 1 \\ 0 \\ 1 \\ 0 \end{pmatrix}\!,
					\!\begin{pmatrix} 3 \\ 1 \\ 3 \\ -1 \end{pmatrix}\!,
					\!\begin{pmatrix} 1 \\ 1 \\ 1 \\ -1 \end{pmatrix}\!
					\right\}
				" />
				in
				<vl exp="R^4" />
			</li>
			<li>
				<vl exp="
					\left\{
					\!\begin{pmatrix} 1 \\ -1 \\ 3 \end{pmatrix}\!,
					\!\begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}\!,
					\!\begin{pmatrix} 1 \\ -2 \\ 1 \end{pmatrix}\!
					\right\}
				" />
				in
				<vl exp="R^3" />
			</li>
		</ul>
	</div>
</template>
