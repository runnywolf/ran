<template>
	<vk>
		<div class="ts-divider is-section"></div>
		<details class="ts-accordion">
			<summary>
				解決上一題的遞迴：
			</summary>
			<Recur :recurCoef="[6, 12]" :initConst="[8, 60]"></Recur>
		</details>
		因為詳解產生器會自動將分數有理化，因此我將分數上下同乘 $\sqrt{21}$，比較接近答案的形式：
		$$
		\begin{split}
		P_n &= @(){4 + @f{6\sqrt{21}; 7}}(3 + \sqrt{21})^n + @(){4 - @f{6\sqrt{21}; 7}}(3 - \sqrt{21})^n \\
		&= \boxed{ @(){4 + @f{18; \sqrt{21}}}(3 + \sqrt{21})^n + @(){4 - @f{18; \sqrt{21}}}(3 - \sqrt{21})^n }_{\text{ (E)}}
		\end{split}
		$$
		<div class="ts-divider is-section"></div>
		<span>繼續推導生成函數的部分分式分解，其中 </span>
		$\sum\limits_{n=0}^{\infty} (kz)^n = @cf{1; 1-kz}$：<br>
		$$
		\begin{split}
		g(z) &= \sum\limits_{n=0}^{\infty} P_n z^n \\
		&= \sum\limits_{n=0}^{\infty}
		@(){ @(){ 4 + @f{18; \sqrt{21}} }(3 + \sqrt{21})^n + @(){ 4 - @f{18; \sqrt{21}} }(3 - \sqrt{21})^n } z^n \\
		&= @(){ 4 + @f{18; \sqrt{21}} } \sum\limits_{n=0}^{\infty} @(){ (3 + \sqrt{21}) z }^n +
		@(){ 4 - @f{18; \sqrt{21}} } \sum\limits_{n=0}^{\infty} @(){ (3 - \sqrt{21}) z }^n \\
		&= \boxed{
		@f{ 4 + 18 / \sqrt{21} ; 1 - (3 + \sqrt{21}) z } + @f{ 4 - 18 / \sqrt{21} ; 1 - (3 - \sqrt{21}) z }
		}_{\text{ (D)}} \\
		&= @f{8+12z; 1-6z-12z^2}
		\end{split}
		$$
		$$ \implies g(z)(1-6z-12z^2) = 8+12z $$
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
</script>
