<template>
	<vk>
		<div class="ts-divider is-section"></div>
		<details class="ts-accordion">
			<summary>先將這個遞迴轉為封閉形式：$\boxed{ a_n = (1+n)3^n }_{\text{ (E)}}$</summary>
			<Recur :recurCoef="[6, -9]" :initConst="[1, 6]"></Recur>
		</details>
		<div class="ts-divider is-section"></div>
		注意：
		$$ \sum\limits_{n=0}^{\infty} (kz)^n = @f{1; 1-kz} $$
		$$ @f{d;dz} @(){ \sum\limits_{n=0}^{\infty} (kz)^n } = @f{d;dz} @(){ @f{1; 1-kz} }
		~~\implies~~ k \sum\limits_{n=1}^{\infty} n(kz)^{n-1} = @f{k; (1-kz)^2} $$
		$$ \sum\limits_{n=0}^{\infty} n(kz)^n = \sum\limits_{n=1}^{\infty} n(kz)^n
		= kz \sum\limits_{n=1}^{\infty} n(kz)^{n-1} = @f{kz; (1-kz)^2} $$
		<br>
		繼續推導生成函數的部分分式分解：<br>
		$$
		\begin{split}
		g(z) &= \sum\limits_{n=0}^{\infty} a_n z^n \\
		&= \sum\limits_{n=0}^{\infty} (1+n)3^n z^n \\
		&= \sum\limits_{n=0}^{\infty} (3z)^n + \sum\limits_{n=0}^{\infty} n(3z)^n \\
		&= @f{1; 1-3z} + @f{3z; (1-3z)^2} \\
		&= \boxed{ @f{1; (1-3z)^2} }_{\text{ (A)}}
		\end{split}
		$$
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
</script>
