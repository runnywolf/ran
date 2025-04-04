<template>
	<RecurInput @input="(d) => { recurData = d; }"></RecurInput>
	<div class="ts-divider is-section"></div>
	<Recur
		:recurCoef="recurData.recurCoef"
		:nonHomoFunc="recurData.nonHomoFunc"
		:initConst="recurData.initConst"
	></Recur>
</template>

<script setup>
import { ref } from "vue";
import RecurInput from "./recur-comp/RecurInput.vue"; // 遞迴輸入與隨機產生器
import Recur from "./recur-comp/Recur.vue"; // 遞迴解答生成器

const recurData = ref({}); // 遞迴資訊
</script>
