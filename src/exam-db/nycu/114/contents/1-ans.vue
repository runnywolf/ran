<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b', 'c' ]">
			<template #a>
				「 第 2 列包含連成一線的四個紅棋 」至少包含 R(2, 1~4), R(2, 2~5), R(2, 3~6), R(2, 4~7) 這四種情況之一，<br>
				邏輯表達式為：
				$$
				\bigwedge\limits_{j=1}^{4} R(2, j) \lor \bigwedge\limits_{j=2}^{5} R(2, j) \lor
				\bigwedge\limits_{j=3}^{6} R(2, j) \lor \bigwedge\limits_{j=4}^{7} R(2, j)
				= \boxed{ \bigvee\limits_{i=1}^{4} ~ \bigwedge\limits_{j=i}^{i+3} R(2, j) }
				$$
			</template>
			<template #b>
				「 行 $i$ 包含至少一個黃棋 」的表達式為：
				$$\bigvee\limits_{j=1}^{6} Y(j, i)$$
				「 所有的行都包含至少一個黃棋 」的表達式為：
				$$\boxed{ \bigwedge\limits_{i=1}^{7} ~ \bigvee\limits_{j=1}^{6} Y(j, i) }$$
			</template>
			<template #c>
				$$\lnot B(i, j) \to \Big( R(i, j) \land \lnot Y(i, j) \Big) \lor \Big( \lnot R(i, j) \land Y(i, j) \Big)$$
			</template>
		</MultiOption>
	</vk>
</template>
