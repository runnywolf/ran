<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			(5%) Let
			<vue-latex expression="A \in M_{n \times n}"></vue-latex>,
			which of the following statements are true?
		</div>
		<ul class="upper-alpha-list">
			<li>
				The nullspace of
				<vue-latex expression="A"></vue-latex>
				is the same as the nullspace of
				<vue-latex expression="A^T A"></vue-latex>.
			</li>
			<li>
				If
				<vue-latex expression="A"></vue-latex>
				is orthogonal,
				<vue-latex expression="A + \frac{1}{2} I"></vue-latex>
				is invertible.
			</li>
			<li>
				If
				<vue-latex expression="A"></vue-latex>
				has fewer than n distinct eigenvalues, then
				<vue-latex expression="A"></vue-latex>
				is not diagonalizable.
			</li>
			<li>
				If
				<vue-latex expression="A = A^T"></vue-latex>,
				then its eigenvalues are real and eigenvectors are orthogonal.
			</li>
			<li>
				If
				<vue-latex expression="A"></vue-latex>
				is positive definite, we can always find a nonsingular
				<vue-latex expression="U"></vue-latex>
				such that
				<vue-latex expression="A = U^2"></vue-latex>.
			</li>
		</ul>
	</div>
</template>
