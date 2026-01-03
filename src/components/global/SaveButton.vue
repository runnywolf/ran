<template>
	<div class="icon-wrapper" @click="isSaved = !isSaved">
		<span class="ts-icon is-star-icon is-large" :class="{ 'is-saved': isSaved, 'is-regular': !isSaved }"></span>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { ProblemSaver } from "@lib/exam-db";

const props = defineProps({
	uni: { type: String, default: null }, // 題本的學校英文縮寫
	year: { type: String, default: null }, // 題本的民國年份
	no: { type: String, default: null }, // 題號
});

const isSaved = ref(ProblemSaver.getState(props.uni, props.year, props.no)); // 這一題是否被收藏

watch(isSaved, newState => { // 當收藏按鈕的狀態被切換時
	ProblemSaver.setState(props.uni, props.year, props.no, newState);
});
</script>

<style scoped>
.icon-wrapper { /* 垂直位置修正 & 縮短與右側藍色題號方塊的距離 */
	margin: -2.5px -4px -2.5px 0;
}
.is-saved { /* 已收藏狀態的實心按鈕會變成黃色 */
	color: #fa0;
}
</style>
