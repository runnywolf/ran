<template>
	<RecurInput @input="recurInputChange"></RecurInput>
	<div class="ts-divider is-section"></div>
	<Recur :recurCoef="[]"></Recur>
</template>

<script setup>
import RecurInput from "./recur-comp/RecurInput.vue"; // 遞迴輸入與隨機產生器
import Recur from "./recur-comp/Recur.vue"; // 遞迴解答生成器



const recurInputChange = (recurData) => {
	console.log(recurData); // test
};
</script>
