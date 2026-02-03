<template>
	<MakeProblem scoreText="[10%]">
		<template #problem>
			What is the value of <span class="ran-code-font">sum</span>
			after the following program segment is executed.
			<span class="ran-no-break">
				(Here <span class="ran-code-font">i, j, k, increment,</span>
				and <span class="ran-code-font">sum</span> are integer variables.)
			</span>
			<div class="ts-wrap is-center-aligned" style="margin-top: 20px;">
				<span class="ran-code-font">
					increment = 0<br>
					sum = 0<br>
					for i = 1 to 12 do<br>
					　　for j = 1 to i do<br>
					　　　　for k = 1 to j do<br>
					　　　　begin<br>
					　　　　　　increment = increment + 1<br>
					　　　　　　sum = sum + increment<br>
					　　　　end
				</span>
			</div>
		</template>
	</MakeProblem>
</template>

<style scoped>
.ran-code-font { /* 內文 code 的額外水平間距 */
	margin: 0 4px;
}
</style>
