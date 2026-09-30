<template>
	<MakeProblem scoreText="(5%)" listEndLabel="d">
		<template #problem>Given the following recurrence relation, please pick the correct statements.</template>
		<template #a>$T(n)=3T(n/4)+\Theta(n^2),~ T\in\Theta(n^2)$.</template>
		<template #b>$T(n)=5T(n/2)+\Theta(n^2),~ T\in\Theta(n^2)$.</template>
		<template #c>$T(n)=2T(n/4)+\Theta(n),~ T\in\Theta(n)$.</template>
		<template #d>$T(n)=2T(n/4)+\Theta(n^2\log n),~ T\in\Theta(n^2\log n)$.</template>
	</MakeProblem>
</template>
