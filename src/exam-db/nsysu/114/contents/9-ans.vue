<template>
	<vk>
		因為詳解產生器只能顯示未知數 $a_n$，所以先把題目的遞迴視為
		$$ b_{n+2}^2 - 7b_{n+1}^2 + 12b_n^2 = 9n ,~~ n\ge 0 ,~~ b_0 = b_1 = 1 $$
		，令 $a_n = b_n^2$，則
		$$ a_n - 7a_{n-1} + 12a_{n-2} = 9(n-2) ,~~ n\ge 0 ,~~ a_0 = a_1 = 1 $$
		，那麼
	</vk>
	<Recur :recurCoef="[7, -12]" :nonHomogFunc="[[-18, 0, 1], [9, 1, 1]]" :initConst="[1, 1]"></Recur>
	<vk>
		因為 $a_n = b_n^2$，所以
		$$ b_n = \pm \sqrt{a_n} = \pm \sqrt{ @f{5;4} + @f{3;2}n + @f{3;4} \cdot 3^n - 4^n } $$
		，答案為
		$$ a_n = \pm \sqrt{ @f{5;4} + @f{3;2}n + @f{3;4} \cdot 3^n - 4^n } ,~~ n\ge 0 ,~~ a_0 = a_1 = 1 $$
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答產生器
</script>
