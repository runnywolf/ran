<template>
	<MakeProblem scoreText="(8%)">
		<template #problem>
			Consider the following linear equations system.
			$$\begin{cases}x-y+3z=1\\-x+2y-3z=4\\3x-3y+k^2z=k\end{cases}$$
			Write the linear equations system in the form of $Ax=b$. Apply the Gaussian elimination algorithm to
			transform the augmented matrix $[A|b]$ into the row echelon form (or the row reduced echelon form).
			Then find the value of $k$ when there is a unique solution. ($x$ has a unique solution.)
		</template>
	</MakeProblem>
</template>
