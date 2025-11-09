<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			Which of the following statement about a bijection function is incorrect?
		</template>
		<template #a>
			If $f: A \to B$ is injective, then the inverse function, $f^{-1}$,
			always exists and $f \circ f^{-1} = f^{-1} \circ f = I$.
		</template>
		<template #b>
			If $f$ is bijective, then $f$ is both injective and surjective.
		</template>
		<template #c>
			If a function is strictly increasing or strictly decreasing, it is a bijection.
		</template>
		<template #d>
			An identity function is bijective.
		</template>
		<template #e>
			No matter two sets $A$ and $B$ are finite, countably infinite, or uncountable,
			$A$ and $B$ are said to be of the same size if and only if there is a bijective function $f: A \to B$.
		</template>
	</MakeProblem>
</template>
