<template>
	<MakeProblem scoreText="(30%)" listEndLabel="b" :listItemScoreTexts="['(15%)', '(15%)']">
		<template #a>
			Given $A = \!\begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 0 \\ -1 & 0 & 1 \\ 0 & 0 & 1 \end{bmatrix}\!$.
			Find the Gram‑Schmidt $QR$ decomposition of $A$, then use that decomposition to solve the least squares problem
			$$Ax = \!\begin{bmatrix} 1 \\ 2 \\ 3 \\ 4 \end{bmatrix} .$$
		</template>
		<template #b>
			Given $A = \!\begin{bmatrix} 10 & 5 \\ -11 & 2 \\ -2 & 14 \end{bmatrix}\!$. Find the pseudoinverse of $A$.
		</template>
	</MakeProblem>
</template>
