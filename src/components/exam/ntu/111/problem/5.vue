<template>
	<MakeProblem scoreText="(10%)" :optionSlotNames="['A', 'B', 'C', 'D', 'E']">
		<template #problem>
			<vl exp="\, R" /> is a non-symmetric relation on <vl exp="A" />
			if there exist <vl exp="x, y \in A" /> such that <vl exp="(x, y) \in R" />
			but <vl exp="(y, x) \notin R" />. If <vl exp="|A| = m" />,
			how many non-symmetric relations on <vl exp="A" /> are there?
		</template>
		<template #A><vl exp="2^{(m^2-m)/2}" /></template>
		<template #B><vl exp="2^{m^2} - 2^{(m^2+m)/2}" /></template>
		<template #C><vl exp="3^{(m^2-m)/2}" /></template>
		<template #D><vl exp="2^{(m^2+m)/2}" /></template>
		<template #E><vl exp="2^{m^2-m}" /></template>
	</MakeProblem>
</template>
