<template>
	<RecurInput @input="recurInputChange"></RecurInput>
	<div class="ts-divider is-section"></div>
	<!-- solution -->
</template>

<script setup>
import RecurInput from "./recur-comp/RecurInput.vue"; // 遞迴輸入與隨機產生器

const recurInputChange = (recurData) => {
	console.log(recurData); // test
};
</script>
