<template>
	<div class="right-top-box ts-wrap is-compact is-vertical is-center-aligned">
		<img src="./img/5.webp" style="height: 160px;">
		<vk>Figure 1. The Hasse diagram of $R$</vk>
	</div>
	<MakeProblem listEndLabel="E">
		<template #problem>
			A poset with the relation $R$ is represented by the Hasse diagram in Figure 1. We can conclude that:
		</template>
		<template #A>$R$ is a total order.</template>
		<template #B>$R$ is not transitive.</template>
		<template #C>$R$ is reflexive.</template>
		<template #D>The least upper bound of $\{a, c\}$ is $d$.</template>
		<template #E>$R$ is a lattice.</template>
	</MakeProblem>
</template>

<style scoped>
.right-top-box {
	float: right;
	margin-right: 20px;
}
</style>
