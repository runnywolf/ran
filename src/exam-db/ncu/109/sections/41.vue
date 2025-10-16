<template>
	<MakeProblem listEndLabel="E" useSpanList>
		<template #problem>
			Four friends have been identified as suspects for an unauthorized access into a computer system.
			They have made statements to the investigating authorities. <span class="ran-app-font">小英</span>
			said “<span class="ran-app-font">神掌</span> did it.” <span class="ran-app-font">韓總</span>
			said “I did not do it.” <span class="ran-app-font">神掌</span> said “<span class="ran-app-font">柯 P</span> did it.”
			<span class="ran-app-font">柯 P</span> said “<span class="ran-app-font">神掌</span> lied when he said that I did it.”
			If the authorities also know that exactly one is lying, who did it?
		</template>
		<template #A><span class="ran-app-font">小英</span></template>
		<template #B><span class="ran-app-font">韓總</span></template>
		<template #C><span class="ran-app-font">神掌</span></template>
		<template #D><span class="ran-app-font">柯 P</span></template>
		<template #E><span class="ran-app-font">郭董</span></template>
	</MakeProblem>
</template>
