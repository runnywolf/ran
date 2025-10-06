<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Let $A = @bm{ 2, 1-i; 1+i, 1 }$ and the unitary matrix that diagonalizes $A$ be
			$U = @f{1; \sqrt{3}} @bm{ a + ib, c + id; e + if, g + ih }$,
			what is the $\lfloor ~\! | a + c + e + g | ~\! \rfloor \% 5$?
			<br>($\%$ is the modulo operation. $\lfloor z \rfloor$ rounds $z$ to the smaller nearest integer.)
		</template>
		<template #a>0</template>
		<template #b>1</template>
		<template #c>2</template>
		<template #d>3</template>
		<template #e>4</template>
	</MakeProblem>
</template>
