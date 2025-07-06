<template>
	<MakeProblem :extraProblemSlotNames="['sub-problem']">
		<template #problem>
			Let <vl exp="V = P_3(x)" /> be a subspace of <vl exp="P(x)" />
			with the inner product <vl exp="\langle f, g \rangle = \int_{-1}^{1} f(x) g(x) dx" />.
		</template>
		<template #sub-problem>
			<ol class="ran-order-list is-upper-alpha">
				<li>
					<span class="problem-score">(10%)</span>
					Find the matrix <vl exp="A" /> with respect to the basis <vl exp="\{ 1, x, x^2, x^3 \}" />
					in <vl exp="V" /> such that <vl exp="\langle f, g \rangle = [f]^T A [g]" />.
				</li>
				<li>
					<span class="problem-score">(10%)</span>
					Find the Fourier coefficient of <vl exp="x^5" /> along <vl exp="x^3 - \frac{3}{5} x" />.
				</li>
			</ol>
		</template>
	</MakeProblem>
</template>
