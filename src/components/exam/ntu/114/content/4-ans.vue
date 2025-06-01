<template>
	<Recur :recurCoef="[F(-3), F(10)]" :initConst="[F(3), F(2)]"></Recur>
</template>

<script setup>
import { F } from "ran-math";
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答產生器
</script>
