<template>
	<div class="ts-grid is-stacked is-compact">
		<div class="column">
			(10%) Given a linear transformation
			<vue-latex expression="T: P_2(R) \rightarrow P_2(R)"></vue-latex>
			defined by
			<vue-latex expression="T(f(x)) = f''(x) + 2f'(x) - f(x)" displayMode></vue-latex>
			where
			<vue-latex expression="P_2(R)"></vue-latex>
			represents the real-valued 2nd-order polynomials. Assume
			<vue-latex expression="M"></vue-latex>
			is the matrix representation of
			<vue-latex expression="T"></vue-latex>
			with respect to the ordered basis. Please find the determinant of<br>
			<vue-latex expression="(M^{-1} + 2I)"></vue-latex>,
			where
			<vue-latex expression="I"></vue-latex>
			is the identity matrix with the same dimension as
			<vue-latex expression="M"></vue-latex>.
		</div>
		<div class="column ts-wrap">
			<span>(A) 0</span>
			<span>(B) 1</span>
			<span>(C) 2</span>
			<span>(D) 3</span>
			<span>(E) 4</span>
		</div>
	</div>
</template>
