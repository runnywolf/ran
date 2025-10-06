<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			An arm wrestler is the champion for a period of 75 hours.
			(Here, by an hour, we mean a period starting from an exact hour, such as 1 p.m., until the next hour.)
			The arm wrestler had at least one match an hour, but no more than 125 total matches.
			There is a period of consecutive hours during which
		</template>
		<template #A>The arm wrestler had exactly 2 matches.</template>
		<template #B>The arm wrestler had exactly 23 matches.</template>
		<template #C>The arm wrestler had exactly 24 matches.</template>
		<template #D>The arm wrestler had exactly 25 matches.</template>
		<template #E>All the above statements are incorrect.</template>
	</MakeProblem>
</template>
