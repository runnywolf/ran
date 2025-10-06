<template>
	<vk>
		<div class="ts-divider is-section"></div>
		<details class="ts-accordion">
			<summary>先將這個遞迴轉為封閉形式：$\boxed{ a_n = @f{1;2}@(){ @f{3;2} }^n + 2^n }_{\text{ (d)}}$</summary>
			<Recur :recurCoef="[F(7, 2), -3]" :initConst="[F(3, 2), F(11, 4)]"></Recur>
		</details>
		特徵多項式為
		$$ 2t^2 - 7t + 6 = 0 $$
		<div class="ts-divider is-section"></div>
		<span>繼續推導生成函數的部分分式分解，其中 </span>
		$\sum\limits_{n=0}^{\infty} (kz)^n = @cf{1; 1-kz}$：<br>
		$$
		\begin{split}
		G(z) &= \sum\limits_{n=0}^{\infty} a_n z^n \\
		&= \sum\limits_{n=0}^{\infty} @(){ @f{1;2}@(){ @f{3;2} }^n + 2^n } z^n \\
		&= @f{1;2} \sum\limits_{n=0}^{\infty} \Big( (3/2) z \Big)^n + \sum\limits_{n=0}^{\infty} (2z)^n \\
		&= @f{1;2} \cdot @f{1; 1-(3/2)z} + @f{1; 1-2z} \\
		&= \boxed{ @f{3-5z; 2-7z+6z^2} }_{\text{ (c)}}
		\end{split}
		$$
		$$ \implies (2-7z+6z^2) G(z) = 3-5z $$
		(B) 錯誤
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
import { F } from "ran-math";
</script>
