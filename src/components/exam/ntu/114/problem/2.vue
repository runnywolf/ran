<template>
	<MakeProblem :score="5">
		<template #problem>
			There are _______ satisfying truth assignments to
			<vl c exp="(\neg w \land x \land \neg y) \vee (\neg w \land \neg x \land y \land \neg z)" />
		</template>
	</MakeProblem>
</template>
