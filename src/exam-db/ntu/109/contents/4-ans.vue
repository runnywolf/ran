<template>
	<Recur :recurCoef="[3]" :nonHomogFunc="[[1, 1, 1]]" :initConst="[1]"></Recur>
</template>

<script setup>
import Recur from '@/components/answer-generator/Recur.vue';
</script>
