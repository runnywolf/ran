<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			<span class="problem-score">(10%)</span>
			Let
			<vl exp="T" />
			be a self-adjoint operator on a finite-dimensional inner product space
			<vl exp="V" />
			with distinct eigenvalues
			<vl exp="\lambda_1, \lambda_2, \,\cdots , \lambda_k" />.
			Let
			<vl exp="E_i" />
			be the eigenspace of
			<vl exp="T" />
			corresponding to
			<vl exp="\lambda_i" />,
			and let
			<vl exp="T_i" />
			be the orthogonal projection of
			<vl exp="V" />
			on
			<vl exp="E_i" />,
			<vl exp="1 \leq i \leq k" />.
		</div>
		<ul class="upper-alpha-list">
			<li>
				<vl exp="\sum_{i=1}^{k} \lambda_i T_i = T" />
			</li>
			<li>
				<vl exp="V = E_1 \oplus E_2 \oplus \cdots \oplus E_k" />
			</li>
			<li>
				Given any polynomial
				<vl exp="g" />,
				<vl exp="g(T) = g(\lambda_1) T_1 + g(\lambda_2) T_2 + \cdots + g(\lambda_k) T_k" />.
			</li>
			<li>
				<vl exp="\lambda_1, \lambda_2, \,\cdots , \lambda_k" />
				are all real numbers.
			</li>
			<li>
				If
				<vl exp="T(x) = Ax" />,
				where
				<vl exp="x \in \mathbb{C}^n" />,
				then
				<vl exp="A" />
				is diagonalizable.
			</li>
		</ul>
	</div>
</template>
