<template>
	<Recur :recurCoef="[2, -1]" :nonHomogFunc="[[-8, 0, 1], [6, 1, 1]]" :initConst="[5, 10]"></Recur>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
</script>
