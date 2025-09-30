<template>
	<vk>
		<div class="ts-divider is-section"></div>
		<details class="ts-accordion" open>
			<summary>先將這個遞迴轉為封閉形式：$\boxed{ a_n = @f{-1;3}(-4)^n + @f{-2;3} \cdot 5^n }_{\text{ (E)}}$</summary>
			<Recur :recurCoef="[1, 20]" :initConst="[-1, -2]"></Recur>
		</details>
		<div class="ts-divider is-section"></div>
		<span>繼續推導生成函數的部分分式分解，其中 </span>
		$\sum\limits_{n=0}^{\infty} (kz)^n = @cf{1; 1-kz}$：<br>
		$$
		\begin{split}
		G(z) &= \sum\limits_{n=0}^{\infty} a_n z^n \\
		&= \sum\limits_{n=0}^{\infty} \left( @f{-1;3}(-4)^n + @f{-2;3} \cdot 5^n \right) z^n \\
		&= @f{-1;3} \sum\limits_{n=0}^{\infty} (-4z)^n + @f{-2;3} \sum\limits_{n=0}^{\infty} (5z)^n \\
		&= \boxed{ @f{-1;3} \cdot @f{1; 1+4z} + @f{-2;3} \cdot @f{1; 1-5z} }_{\text{ (D)}} \\
		&= \boxed{ @f{-1-z; 1-z-20z^2} }_{\text{ (B)}}
		\end{split}
		$$
		※ 因為
		$$G(0) = a_0 + a_1 0^1 + a_2 0^2 + \cdots = a_0$$
		，所以直接將 $0$ 代入 $G(z)$ 也可以得知 (A) 錯誤、(B) 正確。
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
</script>
