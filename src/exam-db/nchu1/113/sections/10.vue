<template>
	<MakeProblem scoreText="(5%)">
		<template #problem>
			What is the Big‑O time complexity of the following pseudo code?
<CodeBlock topMargin><pre>
j = 0;
k = 0;
sum = 0;
for (i = 1; i &lt; n; i++)
	i = j * k;
	for (j = i; j &lt; n; j++)
		for (k = j; k &lt; n; k++)
			sum++;
</pre></CodeBlock>
		</template>
	</MakeProblem>
</template>
