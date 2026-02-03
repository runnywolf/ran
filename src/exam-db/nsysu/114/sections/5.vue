<template>
	<MakeProblem scoreText="[10%]">
		<template #problem>
			Construct a state diagram for a finite state machine with $I = O = \{0,1\}$
			that recognizes all strings in the language $\{0,0\}^* \{1,0\} \cup \{0,1\}^* \{0,0\}$.
		</template>
	</MakeProblem>
</template>
<!-- [fix problem error] "{00}" -> "{0,0}" -->
