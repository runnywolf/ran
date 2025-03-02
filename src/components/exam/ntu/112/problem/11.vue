<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			(10%) Let
			<vue-latex expression="T"></vue-latex>
			be a self-adjoint operator on a finite-dimensional inner product space
			<vue-latex expression="V"></vue-latex>
			with distinct eigenvalues
			<vue-latex expression="\lambda_1, \lambda_2, \,\cdots , \lambda_k"></vue-latex>.
			Let
			<vue-latex expression="E_i"></vue-latex>
			be the eigenspace of
			<vue-latex expression="T"></vue-latex>
			corresponding to
			<vue-latex expression="\lambda_i"></vue-latex>,
			and let
			<vue-latex expression="T_i"></vue-latex>
			be the orthogonal projection of
			<vue-latex expression="V"></vue-latex>
			on
			<vue-latex expression="E_i"></vue-latex>,
			<vue-latex expression="1 \leq i \leq k"></vue-latex>.
		</div>
		<ul class="upper-alpha-list">
			<li>
				<vue-latex expression="\sum_{i=1}^{k} \lambda_i T_i = T"></vue-latex>
			</li>
			<li>
				<vue-latex expression="V = E_1 \oplus E_2 \oplus \cdots \oplus E_k"></vue-latex>
			</li>
			<li>
				Given any polynomial
				<vue-latex expression="g"></vue-latex>,
				<vue-latex expression="g(T) = g(\lambda_1) T_1 + g(\lambda_2) T_2 + \cdots + g(\lambda_k) T_k"></vue-latex>.
			</li>
			<li>
				<vue-latex expression="\lambda_1, \lambda_2, \,\cdots , \lambda_k"></vue-latex>
				are all real numbers.
			</li>
			<li>
				If
				<vue-latex expression="T(x) = Ax"></vue-latex>,
				where
				<vue-latex expression="x \in \mathbb{C}^n"></vue-latex>,
				then
				<vue-latex expression="A"></vue-latex>
				is diagonalizable.
			</li>
		</ul>
	</div>
</template>
