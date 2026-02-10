<template>
	<Recur :recurCoef="[0, -1]" :initConst="[1, 5]"></Recur>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答產生器
</script>
