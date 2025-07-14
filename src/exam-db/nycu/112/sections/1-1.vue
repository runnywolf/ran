<template>
	<vk>
		<MakeProblem :optionSlotNames="[ 'a', 'b' ]" useUlToListOptions>
			<template #problem>
				Determine if the quadratic function
				$$f(x, y, z) = -x^2 - 5y^2 - 4z^2 - 2xy - 2yz - 2x - 4z - 5$$
				has a maximum $f_{max}$ at $(x, y, z) = (x^*, y^*, z^*)$. If so, find:
			</template>
			<template #a>
				<span class="problem-score">(5 points)&nbsp;</span> $f_{max}$
			</template>
			<template #b>
				<span class="problem-score">(5 points)&nbsp;</span> $(x^*, y^*, z^*)$
			</template>
		</MakeProblem>
	</vk>
</template>
