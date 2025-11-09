<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			The following is the pseudo‑code for Gauss‑Jordan method.
			<div class="ts-wrap is-center-aligned" style="margin: 20px 0;">
				<span>
					$\text{for } k = 1 \text{ to } n ~ \{$<br>
					$\qquad \text{for } j = k+1 \text{ to } n+1$<br>
					$\qquad\qquad a_{kj} = a_{kj} / X$<br>
					<br>
					$\qquad\text{for } i = 1 \text{ to } n ;~$ <span class="ran-bold">i is not equal to k</span><br>
					$\qquad\qquad \text{for } j = k+1 \text{ to } n+1$<br>
					$\qquad\qquad\qquad a_{ij} = a_{ij} - a_{ik} a_{kj}$<br>
					$\}$
				</span>
			</div>
			Which of the following statements are correct?
		</template>
		<template #A>The solution is stored in $a(i,~ n),~ i = 1 \text{ to } n$</template>
		<template #B>The solution is stored in $a(n+1,~ i),~ i = 1 \text{ to } n$</template>
		<template #C>$X$ is $a_{nn}$</template>
		<template #D>$X$ is $a_{kk}$</template>
		<template #E>The solution is stored in $a(i,~ n+1),~ i = 1 \text{ to } n$</template>
	</MakeProblem>
</template>
