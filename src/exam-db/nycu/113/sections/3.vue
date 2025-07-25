<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #a>
				<span class="problem-score">(5 points)</span>
				The Goldbach's conjecture says, “every even integer greater than 2 is a sum of two prime numbers.”
				Please translate Goldbach's conjecture into a logical formula using
				$\forall,~ \exists,$ and ($\!\land\!$), or ($\!\lor\!$), not ($\!\lnot\!$),
				implies ($\!\to\!$) and if‑and‑only‑if ($\!\leftrightarrow\!$),
				and the four basic integer arithmetic operators ($\! +, -, *, / \!$).
				Note that $/$ is integer division, for example, $5/2 = 2$.
			</template>
			<template #b>
				<span class="problem-score">(5 points)</span>
				A bit string is a string of 0 and 1 digits.
				For instance, 0011101110 is a bit string of length 10.
				How many bit strings of length 10 contain either five consecutive 1's or five consecutive 0's?
			</template>
		</MakeProblem>
	</vk>
</template>
