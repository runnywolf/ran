<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			(10%) Assume that A, B, and C are
			<vue-latex expression="n \times n"></vue-latex>
			matrices.
		</div>
		<ul class="upper-alpha-list">
			<li>
				<vue-latex expression="\text{trace}((A+B)C) = \text{trace}(AC) + \text{trace}(BC)" style="margin-left: -3px;"></vue-latex>
			</li>
			<li>
				<vue-latex expression="\text{trace}(AB) = \text{trace}(A)\text{trace}(B)" style="margin-left: -3px;"></vue-latex>
			</li>
			<li>
				<vue-latex expression="\text{trace}(AB) = \text{trace}(BA)" style="margin-left: -3px;"></vue-latex>
			</li>
			<li>
				Given a
				<vue-latex expression="2 \times 2"></vue-latex>
				matrix,
				<vue-latex expression="\left[ \begin{array}{cc} a & b+c \\ b-c & -a \end{array} \right]"></vue-latex>
				with trace zero has real eigenvalues<br> if
				<vue-latex expression="a^2 + b^2 \ge c^2"></vue-latex>.
			</li>
			<li>
				Suppose a
				<vue-latex expression="2 \times 2"></vue-latex>
				matrix other than the identity matrix satisfies
				<vue-latex expression="A^3 = I"></vue-latex>.<br>
				Then we have
				<vue-latex expression="\text{trace}(A) = 1"></vue-latex>.
			</li>
		</ul>
	</div>
</template>
