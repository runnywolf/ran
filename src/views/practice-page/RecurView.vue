<template>
	<RecurInput @input="recurInputChange"></RecurInput>
</template>

<script setup>
import RecurInput from "./recur-comp/RecurInput.vue"; // 遞迴輸入與隨機產生器

const recurInputChange = (recurData) => {
	console.log(recurData); // test
};
</script>

<style scoped>
</style>
