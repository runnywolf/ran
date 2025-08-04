<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[4 points]', '[4 points]']">
		<template #problem>
			Determine whether the directed graph shown has an Euler circuit starting from vertex $a$.
			Construct an Euler circuit if one exists. If no Euler circuit exists, determine whether
			the directed graph has an Euler path also starting from vertex $a$. Construct a Euler path if one exists.<br>
		</template>
		<template #a>
			<div class="ts-wrap is-vertical is-center-aligned" style="margin: 4px 0;">
				<img src="./img/3-a.webp">
			</div>
		</template>
		<template #b>
			<div class="ts-wrap is-vertical is-center-aligned" style="margin: 4px 0;">
				<img src="./img/3-b.webp">
			</div>
		</template>
	</MakeProblem>
</template>
