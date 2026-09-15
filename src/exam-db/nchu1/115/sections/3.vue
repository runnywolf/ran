<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Let $S$ be a set with 8 distinct elements, and let $e$ be a fixed element of $S$.
			We consider all subsets of $S$. How many subsets of $S$ satisfy at least one of the following two conditions?
			<div class="ts-list is-unordered" style="padding-top: 6px;">
				<div class="item">The subset has an odd number of elements;</div>
				<div class="item">The subset contains the element $e$.</div>
			</div>
		</template>
		<template #A>64</template>
		<template #B>128</template>
		<template #C>192</template>
		<template #D>224</template>
		<template #E>256</template>
	</MakeProblem>
</template>
