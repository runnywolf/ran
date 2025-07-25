<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['(5 points)', '(5 points)']">
		<template #problem>
			Determine if the quadratic function
			$$f(x, y, z) = -x^2 - 5y^2 - 4z^2 - 2xy - 2yz - 2x - 4z - 5$$
			has a maximum $f_{max}$ at $(x, y, z) = (x^*, y^*, z^*)$. If so, find:
		</template>
		<template #a>$f_{max}$</template>
		<template #b>$(x^*, y^*, z^*)$</template>
	</MakeProblem>
</template>
