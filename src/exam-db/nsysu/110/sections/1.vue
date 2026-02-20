<template>
	<MakeProblem listEndLabel="b" :listItemScoreTexts="['[10%]', '[10%]']">
		<template #problem>
			Consider the following program segment (written in pseudocode):
<CodeBlock topMargin bottomMargin><pre>
for i := 1 to 567 do
	for j := 1 to i do
		print i*j
</pre></CodeBlock>
		</template>
		<template #a>How many times is the print statement of the third line executed?</template>
		<template #b>Replace $i$ in the second line by $i^2$ and answer the question in part (a).</template>
	</MakeProblem>
</template>
