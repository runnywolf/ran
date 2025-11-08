<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			The quick multiplication algorithm using the idea of divide‑and‑conquer can compute
			the product $c \cdot d$ of two $2n\!$‑digit base‑$\!b$ numbers in time complexity
		</template>
		<template #a>$\Theta(n)$.</template>
		<template #b>$\Theta(n^{\log_2 3})$.</template>
		<template #c>$\Theta(n^{\log_3 2})$.</template>
		<template #d>$\Theta(n \log_2 n)$.</template>
		<template #e>$\Theta(n^2)$.</template>
	</MakeProblem>
</template>
