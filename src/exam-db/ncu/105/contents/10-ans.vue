<template>
	<vk>
		<div class="ts-divider is-section"></div>
		<details class="ts-accordion">
			<summary>先將這個遞迴轉為封閉形式：$\boxed{ a_n = 2^n }_{\text{ (d)}}$</summary>
			<Recur :recurCoef="[2, -1]" :nonHomogFunc="[[F(1, 4), 0, 2]]" :initConst="[1, 2]"></Recur>
		</details>
		<div class="ts-divider is-section"></div>
		<span>繼續推導生成函數的部分分式分解，其中</span>
		$\sum\limits_{n=0}^{\infty} (kz)^n = @cf{1; 1-kz}$：<br>
		$$ g(z) = \sum\limits_{n=0}^{\infty} a_n z^n = \sum\limits_{n=0}^{\infty} 2^n z^n
		= \sum\limits_{n=0}^{\infty} (2z)^n = \boxed{ @f{1; 1-2z} }_{\text{ (a)}} $$
	</vk>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
import { F } from "ran-math";
</script>
