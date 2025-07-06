<template>
	<MakeProblem scoreText="(10 points)">
		<template #problem>
			There are _____ satisfying assignments to
			<vl c exp="
				(\neg w \land x \land \neg y \land \neg z) \lor
				(\neg w \land \neg x \land y) \lor (\neg w \land \neg x \land z).
			" />
		</template>
	</MakeProblem>
</template>
