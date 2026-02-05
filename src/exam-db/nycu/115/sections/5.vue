<template>
	<MakeProblem scoreText="(12 points)" listEndLabel="b" :listItemScoreTexts="['(4 points)', '(8 points)']">
		<template #problem>Let $A$ be an $m \times n$ matrix and $x$ be an $n \times 1$ vector.</template>
		<template #a>Given $\|x\| = 1$, what is the least square solution for $Ax = 0$?</template>
		<template #b>
			Please prove your answer.
			<div class="problem-score" style="margin-top: 8px;">
				(Please leave it blank if you don’t know the correct answer, or you will get
				<span class="ran-bold ran-no-break">at most minus 5 points</span>
				(until questions 3, 4, and 5 are 0 points) for the wrong answer.
				<span class="ran-app-font ran-no-break">不會寫請留白，答錯最多倒扣 5 分，扣至 3, 4, 5 題 0 分為止。</span>
			</div>
		</template>
	</MakeProblem>
</template>
