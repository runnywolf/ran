<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			(5%) Let
			<vl exp="A \in M_{n \times n}" />,
			which of the following statements are true?
		</div>
		<ul class="upper-alpha-list">
			<li>
				The nullspace of
				<vl exp="A" />
				is the same as the nullspace of
				<vl exp="A^T A" />.
			</li>
			<li>
				If
				<vl exp="A" />
				is orthogonal,
				<vl exp="A + \frac{1}{2} I" />
				is invertible.
			</li>
			<li>
				If
				<vl exp="A" />
				has fewer than n distinct eigenvalues, then
				<vl exp="A" />
				is not diagonalizable.
			</li>
			<li>
				If
				<vl exp="A = A^T" />,
				then its eigenvalues are real and eigenvectors are orthogonal.
			</li>
			<li>
				If
				<vl exp="A" />
				is positive definite, we can always find a nonsingular
				<vl exp="U" />
				such that
				<vl exp="A = U^2" />.
			</li>
		</ul>
	</div>
</template>
