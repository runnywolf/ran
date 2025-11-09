<template>
	<MakeProblem listEndLabel="e" useSpanList>
		<template #problem>
			Find a singular value decomposition $A = U \Sigma V^T$ with $U$ and $V$ being both orthogonal matrices,
			where $A = @bm{ 3, 2, 2; 2, 3, -2 }$. Which values are <span class="ran-bold">not</span> in $U$ or $V$ matrices?
		</template>
		<template #a>$@cf{1; \sqrt{2}}$</template>
		<template #b>$@cf{1; \sqrt{3}}$</template>
		<template #c>$@cf{1; 2}$</template>
		<template #d>$@cf{1; 3}$</template>
		<template #e>$@cf{1; 3\sqrt{2}}$</template>
	</MakeProblem>
</template>
