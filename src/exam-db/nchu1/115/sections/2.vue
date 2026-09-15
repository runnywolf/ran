<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			A binary string of length 10 must satisfy at least one of the following conditions:
			<div class="ts-list is-unordered" style="padding: 6px 0;">
				<div class="item">It contains at least four 1’s, or</div>
				<div class="item">It ends with 01.</div>
			</div>
			How many such binary strings exist?
		</template>
		<template #A>466</template>
		<template #B>629</template>
		<template #C>848</template>
		<template #D>885</template>
		<template #E>1104</template>
	</MakeProblem>
</template>
