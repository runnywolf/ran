<template>
	<Recur :recurCoef="[2, 1, -2]" :initConst="[1, 0, 7]"></Recur>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答產生器
</script>
