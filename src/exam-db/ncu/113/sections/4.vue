<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let the matrix $A = (a_{ij})$ represent the composite transformations “a yaw of $45^\circ$,
			followed by a pitch of $-90^\circ$ and then a roll of $-45^\circ$”.
			What is $\text{Round}\{ |\sum a_{ij}| \} \% 5$?
			<br>($\%$ is the modulo operation. $\text{Round}\{ z \}$ rounds $z$ to the nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
