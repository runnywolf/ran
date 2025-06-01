<template>
	<Recur :recurCoef="[F(-1), F(12)]" :initConst="[F(3), F(2)]"></Recur>
</template>

<script setup>
import { F } from "ran-math";
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答產生器
</script>
