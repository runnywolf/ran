<template>
	<div class="icon-wrapper" @click="isSaved = !isSaved">
		<span class="ts-icon is-star-icon is-large" :class="isSaved ? 'is-saved' : 'is-regular'"></span>
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

const isSaved = ref<boolean>(false); // 這一題是否被收藏, null 代表 uni-year-no 尚未輸入的狀態

watch(() => [props.uni, props.year, props.no], ([uni, year, no]) => { // 當參數 uni|year|no 改變時, 更新星號狀態
	isSaved.value = ProblemSaver.getState(uni, year, no);
}, { immediate: true });

watch(isSaved, newState => { // 當收藏按鈕的狀態被切換時
	ProblemSaver.setState(props.uni, props.year, props.no, newState); // 保存收藏狀態至 local session
});
</script>

<style scoped>
.icon-wrapper { /* 垂直位置修正 & 縮短與右側藍色題號方塊的距離 */
	margin: -2.5px 0;
}
.is-saved { /* 已收藏狀態的實心按鈕會變成黃色 */
	color: #fa0;
}
</style>
