<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			The following Hasse diagram represents a poset.
			<div class="ts-wrap is-center-aligned" style="margin: 12px 0;">
				<img src="./img/4.webp" style="height: 150px;">
			</div>
			Which of the following matrices best represents the relation of this poset?
		</template>
		<template #a>$ @bm{ 1, 0, 0, 0; 0, 1, 0, 0; 0, 0, 1, 0; 0, 0, 0, 1 } $</template>
		<template #b>$ @bm{ 1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1 } $</template>
		<template #c>$ @bm{ 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1; 0, 0, 0, 0 } $</template>
		<template #d>$ @bm{ 1, 1, 1, 1; 0, 1, 1, 0; 0, 0, 1, 0; 0, 0, 0, 1 } $</template>
		<template #e>$ @bm{ 1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 0; 0, 0, 0, 1 } $</template>
	</MakeProblem>
</template>
