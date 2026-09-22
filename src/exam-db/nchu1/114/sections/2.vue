<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Determine which of the following functions is both one‑to‑one and onto.
			<div class="ts-list is-unordered" style="padding-top: 6px;">
				<div class="item">Let $\mathbb{Z}$ be the set of integers $(\cdots\!,-2,-1,0,1,2,3,\cdots)$.</div>
				<div class="item">Let $\mathbb{N}$ be the set of natural numbers $(0,1,2,3,\cdots)$.</div>
				<div class="item">Let $\mathbb{Z}^+$ be the set of positive integers $(1,2,3,\cdots)$.</div>
				<div class="item">Let $\mathbb{Q}$ be the set of rational numbers.</div>
				<div class="item">Let $\mathbb{R}$ be the set of real numbers.</div>
			</div>
		</template>
		<template #A>$f:\mathbb{N}\to\mathbb{N}$, where $f(n)=n+1$.</template>
		<template #B>$f:\mathbb{Z}\to\mathbb{Z}$, where $f(n)=n+1$.</template>
		<template #C>$f:\mathbb{Z}\times\mathbb{Z}^+\to\mathbb{Q}$, where $f(a,b)=a/b$.</template>
		<template #D>$f:\mathbb{Z}\times\mathbb{Z}^+\to\mathbb{R}$, where $f(a,b)=a/b$.</template>
		<template #E>None of the above.</template>
	</MakeProblem>
</template>
