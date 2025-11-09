<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Let $A = @bm{ -\sqrt{3}/2, 1/2; 0, 0 },~ B = @bm{ \sqrt{2}, -\sqrt{2}; \sqrt{2}, \sqrt{2} }$, and
			$C = @bm{ 3, 0; 0, -3 }$. Which of the following are true?
		</template>
		<template #a>
			Matrix $A$ is the standard matrix for the composition of linear operators stated below:
			a counterclockwise rotation of $60^\circ$, followed by an orthogonal projection on the x‑axis.
		</template>
		<template #b>
			Matrix $B$ is the stand matrix for the composition of linear operators stated below:
			a dilation with factor $k = 2$, followed by a counterclockwise rotation of $45^\circ$.
		</template>
		<template #c>
			Matrix $C$ is the standard matrix for the linear operator defined below:
			a reflection about the x‑axis, followed by a contraction with factor $k = 1/3$.
		</template>
		<template #d>
			Matrix $C$ is the standard matrix for the linear operator defined below:
			a reflection about the x‑axis, followed by a dilation with factor $k = 3$.
		</template>
		<template #e>None of the above.</template>
	</MakeProblem>
</template>
