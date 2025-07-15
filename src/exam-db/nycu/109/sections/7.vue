<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b', 'c', 'd', 'e' ]" useUlToListOptions>
			<template #problem>
				Let $E_1,~ E_2,$ and $E_3$ be 3x3 elementary matrices of type I (interchanging two rows of $I$),
				II (multiplying a row of $I$ by a nonzero constant),
				and III (adding a multiple of one row to another row), respectively.
				Also let $A$ be a 3x3 matrix with $\det(A) = 6$.
				Assume, additionally, that $E_2$ was formed from identity matrix by multiplying its second row by 3.
				Find the value of each of the following:
			</template>
			<template #a>
				<span class="problem-score">[1 point]&nbsp;</span> $\det(E_1 A)$
			</template>
			<template #b>
				<span class="problem-score">[1 point]&nbsp;</span> $\det(E_2 A)$
			</template>
			<template #c>
				<span class="problem-score">[1 point]&nbsp;</span> $\det(A E_3)$
			</template>
			<template #d>
				<span class="problem-score">[1 point]&nbsp;</span> $\det({E_1}^2)$
			</template>
			<template #e>
				<span class="problem-score">[1 point]&nbsp;</span> $\det(E_3 E_2 E_1)$
			</template>
		</MakeProblem>
	</vk>
</template>
