<template>
	<details class="ts-accordion">
		<summary style="margin-bottom: 0;">
			<span>({{ option }})</span>
			<span v-if="answer === false" class="ts-icon is-xmark-icon is-big false-option"></span>
			<span v-else-if="answer === true" class="ts-icon is-check-icon is-big true-option"></span>
		</summary>
		<slot></slot>
	</details>
</template>

<script setup> // 用於快速製作: 多選題中單個選項的折疊內容
const props = defineProps({
	option: { type: String, default: "?" }, // 選項字串 (在括號內)
	answer: { type: Boolean, default: undefined }, // 選項的是非答案
});
</script>

<style scoped>
.false-option { /* 錯誤選項的顏色(紅) */
	margin-top: 3px;
	margin-left: 2px;
	color: #f00;
}
.true-option { /* 正確選項的顏色(綠) */
	font-size: 21px;
	margin-left: 5px;
	margin-top: 3px;
	color: #0e0;
}
</style>
