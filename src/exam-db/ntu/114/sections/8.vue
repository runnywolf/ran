<template>
	<vk>
		<MakeProblem :extraProblemSlotNames="['sub-problem']">
			<template #problem>
				Let $V = P_3(x)$ be a subspace of $P(x)$
				with the inner product $\langle f, g \rangle = \int_{-1}^{1} f(x) g(x) dx$.
			</template>
			<template #sub-problem>
				<ol class="ran-order-list is-upper-alpha">
					<li>
						<span class="problem-score">(10%)</span>
						Find the matrix $A$ with respect to the basis $\{ 1, x, x^2, x^3 \}$
						in $V$ such that $\langle f, g \rangle = [f]^T A [g]$.
					</li>
					<li>
						<span class="problem-score">(10%)</span>
						Find the Fourier coefficient of $x^5$ along $x^3 - \frac{3}{5} x$.
					</li>
				</ol>
			</template>
		</MakeProblem>
	</vk>
</template>
