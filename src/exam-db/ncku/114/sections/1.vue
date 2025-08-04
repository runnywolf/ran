<template>
	<MakeProblem :extraSlotNames="['img', 'sub-problem']">
		<template #problem>
			Let $M$ be a Finite State Machine shown below:
		</template>
		<template #img>
			<div class="ts-wrap is-vertical is-center-aligned" style="margin: 4px 0">
				<img src="./img/1.webp" style="height: 260px"><!-- by gpt-4o -->
			</div>
		</template>
		<template #sub-problem>
			<ol class="ran-order-list is-upper-roman">
				<li>
					<span class="problem-score">(10%)</span>
					How many distinct input string $x$ are there such that $\|x\|=8$ and $v(s_0, x)=s_0$?
					Please choose one answer:<br>
					(a) 72 &nbsp;(b) 73 &nbsp;(c) 74 &nbsp;(d) 75
				</li>
				<li>
					<span class="problem-score">(10%)</span>
					How many distinct input string $x$ are there such that $\|x\|=12$ and $v(s_0, x)=s_0$?
					Please choose one answer:<br>
					(a) 991 &nbsp;(b) 992 &nbsp;(c) 993 &nbsp;(d) 994
				</li>
			</ol>
		</template>
	</MakeProblem>
</template>
