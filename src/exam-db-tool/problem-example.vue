<!-- 控制配分顯示與否 -->
<span class="problem-score"></span>

<!-- 多選題或數個子題 -->
<template>
	<vk>
		<MakeProblem scoreText="" :optionSlotNames="[ 'a', 'b', 'c', 'd', 'e' ]" useUlToListOptions>
			<template #problem></template>
			<template #a></template>
			<template #b></template>
			<template #c></template>
			<template #d></template>
			<template #e></template>
		</MakeProblem>
	</vk>
</template>
