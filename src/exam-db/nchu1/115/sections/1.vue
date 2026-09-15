<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Consider the number of nonnegative integer solutions to $x_1+x_2+x_3+x_4=12$,
			subject to the following constraints:
			<div class="ts-list is-unordered" style="padding: 6px 0;">
				<div class="item">$x_1$ is even;</div>
				<div class="item">$2 \leq x_2 \leq 4$;</div>
				<div class="item">$x_3$ is a multiple of 3;</div>
				<div class="item">$0 \leq x_4 \leq 3$.</div>
			</div>
			How many solutions satisfy these conditions?
		</template>
		<template #A>18</template>
		<template #B>20</template>
		<template #C>24</template>
		<template #D>30</template>
		<template #E>36</template>
	</MakeProblem>
</template>
