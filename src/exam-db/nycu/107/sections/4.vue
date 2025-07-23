<template>
	<vk>
		<MakeProblem scoreText="(10 points)">
			<template #problem>
				Let $n$ be a natural number. Let $b = n \bmod 10$ and $a = (n-b)/10$,
				where $a$ and $b$ are nonnegative integers.
				Please find (negative or positive) integers $x$ and $y$ ($-9 \leq x \leq 9$ and $-9 \leq y \leq 9$)
				so that the following claim is true:
				<div class="ts-content ts-text is-center-aligned">
					“$n$ is a multiple of 17 if and only if $xa + yb$ is a multiple of 17.”
				</div>
				You need to explain or prove your answer.
			</template>
		</MakeProblem>
	</vk>
</template>
