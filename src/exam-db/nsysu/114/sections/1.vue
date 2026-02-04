<template>
	<MakeProblem scoreText="[10%]">
		<template #problem>
			What is the value of <span class="ran-code-font">sum</span>
			after the following program segment is executed.
			<span class="ran-no-break">
				(Here <span class="ran-code-font">i, j, k, increment,</span>
				and <span class="ran-code-font">sum</span> are integer variables.)
			</span>
<CodeBlock topMargin><pre>
increment = 0
sum = 0
for i = 1 to 12 do
    for j = 1 to i do
        for k = 1 to j do
        begin
            increment = increment + 1
            sum = sum + increment
        end
</pre></CodeBlock>
		</template>
	</MakeProblem>
</template>

<style scoped>
.ran-code-font { /* 內文 code 的額外水平間距 */
	margin: 0 4px;
}
</style>
