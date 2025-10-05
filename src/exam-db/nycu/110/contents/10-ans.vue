<template>
	<vk>
		<MultiOption :optionNames="[ 'a', 'b', 'c' ]">
			<template #a>
				
			</template>
			<template #b>
				<Recur :recurCoef="[-2, 2, 4]" :initConst="[7, -6, 20]"></Recur>
				最後求 $G_{100}$：
				$$
				\begin{split}
				G_{100} &= 3(-2)^{100} + 2(\sqrt{2})^{100} + 2(-\sqrt{2})^{100} \\
				&= 3 \cdot 2^{100} + 2 \cdot 2^{50} + 2 \cdot 2^{50} \\
				&= \boxed{ 3 \cdot 2^{100} + 4 \cdot 2^{50} }
				\end{split}
				$$
			</template>
			<template #c>
				
			</template>
		</MultiOption>
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答產生器
</script>
