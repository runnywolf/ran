<template>
	令 $b_k = a_{2^k}$，則遞迴關係式可以表示為一個線性遞迴：
	$$b_k = 3b_{k-1} + 1 ~,~ b_0 = 1$$
	<div class="ts-divider is-section"></div>
	<details class="ts-accordion">
		<summary>接著把這個遞迴化簡成一般式，得到 $~ b_k = \frac{-1}{2} + \frac{3}{2}\cdot3^k$。</summary>
		<Recur :recurCoef="[3]" :nonHomogFunc="[[1, 0, 1]]" :initConst="[1]"></Recur>
	</details>
	<div class="ts-divider is-section"></div>
	當 $k = \log_2{n}$ 時，$b_{~\log_2{n}} = a_n$，因此
	$$
	\begin{split}
	\log_2{a_n} &= \log_2{ b_{~\log_2{n}} } \\
	&= \log_2 \left( \frac{-1}{2} + \frac{3}{2} \cdot 3^{\log_2{n}} \right) \\
	&\approx \log_2 \left( \frac{3}{2} \cdot 3^{\log_2{n}} \right) \\
	&= \log_2 { \frac{3}{2} } + \log_2 { 3^{\log_2{n}} } \\
	&= \log_2{3} \cdot \log_2{n} + ( \log_2{3} - 1 ) \\
	&\approx \boxed{\log_2{3}} \times \log_2{n}
	\end{split}
	$$
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
</script>
