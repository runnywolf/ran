<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			$A = \!\begin{bmatrix} 5 & 2 & 2 \\ 3 & 6 & 3 \\ 6 & 6 & 9 \end{bmatrix}\!$,
			$B = A^3 - 20A^2 + 92A - 120 I_3$. What is $|\det(B)| \% 5$?
			<br>($\%$ is the modulo operation. $|\cdot|$ is the absolute value.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
