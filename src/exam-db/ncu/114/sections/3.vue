<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Assume $p(x) = x^{10} - x^5 + 1$ and $A = @bm{ -2, -6; 1, 3 }$.
			Let $p(A) = @bm{ a, b; c, d }$. What is $\lfloor ~\! | a + b + c + d | ~\! \rfloor \% 5$?
			<br>($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
