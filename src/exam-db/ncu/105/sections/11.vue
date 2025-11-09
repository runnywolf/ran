<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Define sum $u+v = (u_1+v_1,~ u_2+v_2,~ \cdots\!,~ u_n+v_n)$ and
			scalar multiple $ku = (ku_1,~ ku_2,~ \cdots\!,~ ku_n)$,
			where vectors $u = (u_1, u_2, \cdots\!, u_n),~ v = (v_1, v_2, \cdots\!, v_n)$, and $k$ is a scalar.
			Which of the following are subspaces of $\mathbb{R}^3$?
		</template>
		<template #a>All vectors of the form $(a, 0, 0)$.</template>
		<template #b>All vectors of the form $(a, b, c)$ where $b = a+c$.</template>
		<template #c>All vectors of the form $(a, b, c)$ where $b = ac$.</template>
		<template #d>All vectors of the form $(a, 2a, 3a)$.</template>
		<template #e>All vectors of the form $(a, 1, 3)$.</template>
	</MakeProblem>
</template>
