<template>
	<vk>
		<div class="ts-divider is-section"></div>
		<details class="ts-accordion">
			<summary>先將這個遞迴轉為封閉形式：$\boxed{ a_n = -(-7)^n - 4 }_{\text{ (C)}}$</summary>
			<Recur :recurCoef="[-6, 7]" :initConst="[-5, 3]"></Recur>
		</details>
		<div class="ts-divider is-section"></div>
		<span>繼續推導生成函數的部分分式分解，其中</span>
		$\sum\limits_{n=0}^{\infty} (kz)^n = @cf{1; 1-kz}$：<br>
		$$
		\begin{split}
		g(z) &= \sum\limits_{n=0}^{\infty} a_n z^n \\
		&= \sum\limits_{n=0}^{\infty} \Big( {-(-7)^n} - 4 \Big) z^n \\
		&= -\sum\limits_{n=0}^{\infty} (-7z)^n - 4 \sum\limits_{n=0}^{\infty} z^n \\
		&= \boxed{ -@f{1; 1+7z} - 4 \cdot @f{1; 1-z} }_{\text{ (B)}} \\
		&= @f{-5-27z; 1+6z-7z^2}
		\end{split}
		$$
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
</script>
