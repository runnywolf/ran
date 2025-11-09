<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			A restaurant provides different ways to accept reservation of ordered seats.
			For any individual <span class="ran-no-break">(1 person)</span>, he/she can make reservation
			by email or through the web page. For any party of 2 persons, they can use phone, email, or web page to reserve.
			How many different ways for this restaurant to make reservation of $n$ ordered seats?
		</template>
		<template #a>$@f{5;12} 3^n + @f{3;4} (-1)^{n+1}$</template>
		<template #b>$@f{1;12} (-3)^n + @f{9;4}$</template>
		<template #c>$3^n + (-1)^n$</template>
		<template #d>$@f{3;2} 2^n + (-1)^n$</template>
		<template #e>$@f{3;4} 3^n + @f{1;4} (-1)^n$</template>
	</MakeProblem>
</template>
