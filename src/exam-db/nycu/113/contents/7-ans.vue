<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b' ]">
			<template #a>
				<InverseMatrix :n="4" :arr="[[0, -3, 3, 9], [2, 3, -1, 1], [1, 3, -2, 2], [4, 10, -5, 1]]"></InverseMatrix>
			</template>
			<template #b>
				題 (a) 進行高斯消去法時，左側矩陣正好形成上三角矩陣。<br>
				若在右側連接一個單位矩陣：
				$$
				[~ U \mid L' \mid P' ~] = \! \left[
				\def\arraystretch{1.4} \begin{array}{cccc|cccc|cccc}
				2 & 3 & -1 & 1 & 0 & 1 & 0 & 0 & 1 & 0 & 0 & 0 \\
				0 & -3 & 3 & 9 & 1 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\
				0 & 0 & 1 & 11 & \frac{4}{3} & -2 & 0 & 1 & 0 & 0 & 1 & 0 \\
				0 & 0 & 0 & 6 & \frac{1}{2} & \frac{-1}{2} & 1 & 0 & 0 & 0 & 0 & 1
				\end{array}
				\right]
				$$
				對矩陣 $L'$ 和 $P'$ 執行題 (a) 操作過的列交換，也就是分別交換列 1, 2 和列 3, 4：
				$$
				[~ U \mid L \mid P ~] = \! \left[
				\def\arraystretch{1.4} \begin{array}{cccc|cccc|cccc}
				2 & 3 & -1 & 1 & 1 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\
				0 & -3 & 3 & 9 & 0 & 1 & 0 & 0 & 1 & 0 & 0 & 0 \\
				0 & 0 & 1 & 11 & \frac{1}{2} & \frac{-1}{2} & 1 & 0 & 0 & 0 & 0 & 1 \\
				0 & 0 & 0 & 6 & \frac{4}{3} & -2 & 0 & 1 & 0 & 0 & 1 & 0
				\end{array}
				\right]
				$$
				即可得到 PLU 分解。
			</template>
		</MultiOption>
	</vk>
</template>

<script setup>
import InverseMatrix from "@/components/answer-generator/InverseMatrix.vue";
</script>
