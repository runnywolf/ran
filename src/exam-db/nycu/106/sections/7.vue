<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Let $A$ be a non‑symmetric $n$ by $n$ matrix.
				Determine and explain whether the following matrix $(B,~ C)$:
				<span class="fs">➀</span> must be symmetric,
				<span class="fs">➁</span> must be skew‑symmetric,
				or <span class="fs">➂</span> otherwise.
			</template>
			<template #a>
				<span class="problem-score">(2 points)&nbsp;</span> $B = A - A^T$
			</template>
			<template #b>
				<span class="problem-score">(2 points)&nbsp;</span> $C = (I + A)(I - A^T)$
			</template>
		</MakeProblem>
	</vk>
</template>

<style scoped>
.fs {
	font-size: 24px;
	vertical-align: -3px;
}
</style>
