<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			<span class="problem-score">(10%)</span>
			Assume that A, B, and C are <vl exp="n \times n" /> matrices.
		</div>
		<ul class="upper-alpha-list">
			<li>
				<vl exp="\text{trace}((A+B)C) = \text{trace}(AC) + \text{trace}(BC)" style="margin-left: -3px;" />
			</li>
			<li>
				<vl exp="\text{trace}(AB) = \text{trace}(A)\text{trace}(B)" style="margin-left: -3px;" />
			</li>
			<li>
				<vl exp="\text{trace}(AB) = \text{trace}(BA)" style="margin-left: -3px;" />
			</li>
			<li>
				Given a
				<vl exp="2 \times 2" />
				matrix,
				<vl exp="\left[ \begin{array}{cc} a & b+c \\ b-c & -a \end{array} \right]" />
				with trace zero has real eigenvalues if
				<vl exp="a^2 + b^2 \ge c^2" />.
			</li>
			<li>
				Suppose a
				<vl exp="2 \times 2" />
				matrix other than the identity matrix satisfies
				<vl exp="A^3 = I" />.
				Then we have
				<vl exp="\text{trace}(A) = 1" />.
			</li>
		</ul>
	</div>
</template>
