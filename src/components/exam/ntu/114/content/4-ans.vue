<template>
	<Recur :recurCoef="[new Frac(-3), new Frac(10)]" :initConst="[new Frac(3), new Frac(2)]">
	</Recur>
</template>

<script setup>
import { Frac } from "@/libs/RanMath.js";
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答產生器
</script>
