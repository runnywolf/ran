<template>
	<div>
		<template v-for="(optionName, i) in optionNames">
			
			<!-- 摺疊的選項詳解 -->
			<details class="ts-accordion">
				<summary style="margin-bottom: 0;">
					
					<!-- (A), (B), (C) ... -->
					<span>({{ optionName }})</span>
					
					<!-- 選項的答案 icon (true or false) -->
					<span v-if="optionAnswers[i] === false"
						class="ts-icon is-xmark-icon is-big false-option"
					></span>
					<span v-else-if="optionAnswers[i] === true"
						class="ts-icon is-check-icon is-big true-option"
					></span>
					
				</summary>
				
				<!-- 被摺疊起來的選項詳解 -->
				<slot :name="optionName"></slot>
				
			</details>
			
			<!-- 選項間的分隔線 -->
			<div v-if="i !== optionNames.length - 1" class="ts-divider divider-margin"></div>
			
		</template>
	</div>
</template>

<script setup>
const props = defineProps({
	optionNames: { type: Array, default: [] }, // 多選題每個選項的編號 (在括號內)
	optionAnswers: { type: Array, default: [] }, // 每個選項的答案 (true or false), 若不為 bool 會隱藏 icon
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
.divider-margin { /* 分隔線的間距 */
	margin: 6px 0;
}
</style>
