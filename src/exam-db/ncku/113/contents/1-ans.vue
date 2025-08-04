<template>
	<Recur :recurCoef="[4, -3]" :nonHomogFunc="[[-200, 0, 1]]" :initConst="[3000, 3300]"></Recur>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
</script>
