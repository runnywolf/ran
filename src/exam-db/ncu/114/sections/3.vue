<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Assume $p(x) = x^{10} - x^5 + 1$ and $A = \!\begin{bmatrix} -2 & -6 \\ 1 & 3 \end{bmatrix}\!$.
			Let $p(A) = \!\begin{bmatrix} a & b \\ c & d \end{bmatrix}\!$.
			What is $\lfloor ~\! | a + b + c + d | ~\! \rfloor \% 5$?
			<br>($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
