<template>
	<MakeProblem scoreText="(10%)" listEndLabel="b">
		<template #problem>
			Suppose $u = @bm{3,1,-1}$, and $W$ is the solution set of $x_1+2x_2-x_3=0$.
		</template>
		<template #a>
			Please find the orthogonal projection matrix $P_W$.
		</template>
		<template #b>
			Please obtain the unique vector $w$ in $W$ and $z$ in $W^\perp$ (orthogonal to $W$), such that $u=w+z$.
		</template>
	</MakeProblem>
</template>
