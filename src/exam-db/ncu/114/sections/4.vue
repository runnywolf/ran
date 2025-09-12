<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let <vl exp="A = \!\begin{bmatrix} 2 & 1 - i \\ 1 + i & 1 \end{bmatrix}\!" />
			and the unitary matrix that diagonalizes $A$ be
			<vl style="line-height: 60px;" exp="
			U = \frac{1}{\sqrt{3}} \!\begin{bmatrix} a + ib & c + id \\ e + if & g + ih \end{bmatrix}\!
			" />,
			what is $\lfloor ~\! | a + c + e + g | ~\! \rfloor \% 5$?
			<span class="ran-no-break">
				($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
			</span>
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
