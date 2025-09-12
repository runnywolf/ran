<template>
	<MakeProblem listEndLabel="e">
		<template #problem>
			A computer system considers a string of decimal digits a valid codeword
			if it contains an even number of 0 digits.
			For instance, 1230407869 is valid, whereas 120987045608 is not valid.
			Let $a_n$ be the number of valid $n\!$‑digit codewords. what of the followings are true?
		</template>
		<template #a>$a_n = 9a_{n-1} + 10^{n-1}$</template>
		<template #b>$a_n = 8a_{n-1} + 10^{n-1}$</template>
		<template #c>$a_1 = 9$</template>
		<template #d>$a_n = 8^n + 10^{n-1}$</template>
		<template #e>$a_n = 8^n + 10^n$</template>
	</MakeProblem>
</template>
