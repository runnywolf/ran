<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			Determine which of the following functions are <span class="ran-bold">onto</span>.
			<div class="ts-list is-unordered" style="padding-top: 6px;">
				<div class="item">Let $Z$ be the set of integers $(\cdots\!,-2,-1,0,1,2,3,\cdots)$.</div>
				<div class="item">Let $N$ be the set of natural numbers $(0,1,2,3,\cdots)$.</div>
				<div class="item">Let $Z^+$ be the set of positive integers $(1,2,3,\cdots)$.</div>
				<div class="item">Let $Q$ be the set of rational numbers.</div>
				<div class="item">Let $R$ be the set of real numbers.</div>
			</div>
		</template>
		<template #A>$f:Z \to Z$, where $f(n)=n+1$.</template>
		<template #B>$f:N \to N$, where $f(n)=n+1$.</template>
		<template #C>$f:Z \times Z^+ \to Q$, where $f(a,b)=a/b$.</template>
		<template #D>$f:Z \times Z^+ \to R$, where $f(a,b)=a/b$.</template>
		<template #E>$f:Q \to R$, where $f(x)=x$.</template>
	</MakeProblem>
</template>
