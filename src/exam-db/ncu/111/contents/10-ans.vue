<template>
	<vk>
		<div class="ts-divider is-section"></div>
		<details class="ts-accordion">
			<summary>先將這個遞迴轉為封閉形式：$\boxed{ a_n = -8 @(){ @f{1;2} }^n + 13 }_{\text{ (D)}}$</summary>
			<Recur :recurCoef="[F(3, 2), F(-1, 2)]" :initConst="[5, 9]"></Recur>
		</details>
		<div class="ts-divider is-section"></div>
		<span>繼續推導生成函數的部分分式分解，其中 </span>
		$\sum\limits_{n=0}^{\infty} (kz)^n = @cf{1; 1-kz}$：<br>
		$$
		\begin{split}
		f(z) &= \sum\limits_{n=0}^{\infty} a_n z^n \\
		&= \sum\limits_{n=0}^{\infty} @(){ -8 @(){ @f{1;2} }^n + 13 } z^n \\
		&= -8 \sum\limits_{n=0}^{\infty} (@f{1;2} z)^n + 13 \sum\limits_{n=0}^{\infty} (1z)^n \\
		&= -8 \cdot @f{1; 1-(1/2)z} + 13 \cdot @f{1; 1-z} \\
		&= \boxed{ @f{10+3z; 2-3z+z^2} }_{\text{ (A)}}
		\end{split}
		$$
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
import { F } from "ran-math";
</script>
