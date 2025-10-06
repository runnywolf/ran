<template>
	<Recur :recurCoef="[2]" :nonHomogFunc="[[1, 1, 1]]" :initConst="[4]"></Recur>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue"; // 遞迴解答產生器
</script>
