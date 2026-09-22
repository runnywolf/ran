<template>
	<MakeProblem listEndLabel="D" useSpanList>
		<template #problem>
			Please find $@bm{x;y}$ such that the vector $v=@bm{1,0;0,1;2,0;0,2}@bm{x;y}$ is as close as
			possible to $u=@bm{1;1;3;3}$.
		</template>
		<template #A>$@bm{@f{7;5};@f{7;3}}$</template>
		<template #B>$@bm{@f{5;2};@f{3;5}}$</template>
		<template #C>$@bm{@f{7;5};@f{7;5}}$</template>
		<template #D>$@bm{@f{-2;5};@f{3;5}}$</template>
	</MakeProblem>
</template>
