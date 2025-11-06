<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			The following is the pseudo‑code for LU Decomposition.
			<div class="ts-wrap is-center-aligned" style="margin: 20px 0;">
				<span>
					$\text{for } i = 1, 2, 3, \cdots\!, a$<br>
					$\qquad L_{i1} = A_{i1}$<br>
					<br>
					$\text{for } j = b, \cdots\!, n$<br>
					$\qquad U_{1j} = A_{1j} / L_{11}$<br>
					<br>
					$\text{for } j = 2,~ 3,~ \cdots\!,~ n-1 ~ \{$<br>
					$\qquad \text{for } i = j,~ j+1,~ \cdots\!,~ n$<br>
					$\qquad\qquad L_{i1} = A_{ij} - \sum\limits_{k=1}^{c} L_{ik} U_{kj}$<br>
					<br>
					$\qquad \text{for } k = j,~ j+1,~ \cdots\!,~ n$<br>
					$\qquad\qquad U_{jk} = (A_{jk} - \sum\limits_{i=1}^{d} L_{ji} U_{ik}) / L_{jj}$<br>
					$\}$<br>
					$L_{nn} = A_{nn} - \sum\limits_{k=1}^{n-1} L_{nk} X$
				</span>
			</div>
			Which of the follow statements are correct?
		</template>
		<template #A>$a = n-1$</template>
		<template #B>$b = 1$</template>
		<template #C>$c = j-1$</template>
		<template #D>$d = j-1$</template>
		<template #E>$X = U_{kn}$</template>
	</MakeProblem>
</template>
