<template>
	<MakeProblem scoreText="(10%)" :extraSlotNames="['statements']">
		<template #problem>
			How many of the following five statements are correct? ________
		</template>
		<template #statements>
			<div class="ts-list is-unordered" style="--gap: 6px">
				<div class="item">
					Let $A$ be an $n \times n$ rational matrix.
					If the rational $n\!$‑tuple vector space $\mathbb{Q}^n$ is the direct sum of the eigenspaces of $A$,
					then $A$ can be diagonalized.
				</div>
				<div class="item">
					If $A$ is an $n \times n$ complex matrix with $A^*A = AA^*$,
					then the eigenspaces of $A^*$ equal the eigenspaces of $A$.
				</div>
				<div class="item">
					If $A$ is an $n \times n$ real matrix with $A^t = A$,
					then the characteristic polynomial of $A$ can be written as a product of
					degree‑one polynomials with real coefficients.
				</div>
				<div class="item">
					If $A$ is an $n \times n$ complex matrix with $A^t = A$, then all eigenvalues of $A$ are real.
				</div>
				<div class="item">
					If $A$ and $B$ are unitarily equivalent $n \times n$ complex matrices,
					then the trace of $A^*A$ equals the trace of $B^*B$.
				</div>
			</div>
		</template>
	</MakeProblem>
</template>
