<template>
	<vk>
		如果每次只訂 1 人座 (2 種選擇) 或 2 人座 (3 種選擇)，那麼遞迴關係式可以表示為：
		$$ a_n = 2a_{n-1} + 3a_{n-2} $$
		初始條件為：
		<div class="ts-list is-unordered">
			<div class="item">$a_0 = 1 ~~$ (0 個人不訂位也是一種訂法)</div>
			<div class="item">$a_1 = 2$</div>
			<div class="item">$a_2 = 2 \cdot 2 + 3 = 7$</div>
		</div>
		<br>
		<Recur :recurCoef="[2, 3]" :initConst="[1, 2]"></Recur>
		Ans: (e)
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
</script>
