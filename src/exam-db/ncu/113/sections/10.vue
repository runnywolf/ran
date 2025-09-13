<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			We are required to find the parabola $C + Dt + Et^2$ that comes closest to the values $v = (0,2,2,5)$
			at the times $t = (0,1,3,4)$. What is $F = \text{Round}\{ | C+D+E | \times 256 \} \% 5$?
			<br>($|\cdot|$ is the absolute value. $\%$ is the modulo operation.
			$\text{Round}\{ z \}$ rounds $z$ to the nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
