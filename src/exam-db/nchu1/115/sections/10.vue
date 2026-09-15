<template>
	<MakeProblem listEndLabel="E">
		<template #problem>
			A binary classifier, the recognizer, is used to identify boys in a group of 15 people, consisting of
			9 boys and 6 girls. When the recognizer is tested, it outputs 10 predictions of “boy”, but only 7 of
			them are actually boys. All remaining people not predicted as “boy” are predicted as “girl”.
			Based on this information, which of the following statements are correct?
		</template>
		<template #A>The precision of the recognizer is $@f{7;10}$.</template>
		<template #B>The recall of the recognizer is $@f{7;9}$.</template>
		<template #C>The false negative rate is $@f{2;3}$.</template>
		<template #D>The specificity is $@f{1;2}$.</template>
		<template #E>The F1‑score of the recognizer is $@f{7;9}$.</template>
	</MakeProblem>
</template>
