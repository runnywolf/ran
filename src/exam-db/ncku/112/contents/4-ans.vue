<template>
	<Recur :recurCoef="[5, -6]" :nonHomogFunc="[[2, 0, 1]]" :initConst="[3, 7]"></Recur>
</template>

<script setup>
import Recur from "@/components/answer-generator/Recur.vue";
</script>
