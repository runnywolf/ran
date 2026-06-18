<template>
	<MakeProblem scoreText="[10%]">
		<template #problem>
			Verify that
			$$ [(r \leftrightarrow p) \land (p \leftrightarrow q) \land (q \leftrightarrow r)]
			~~\Longleftrightarrow~~ [(r \to p) \land (p \to q) \land (q \to r)] , $$
			for primitive statements $p$, $q$, and $r$.
		</template>
	</MakeProblem>
</template>
