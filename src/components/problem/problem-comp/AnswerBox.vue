<template>
	<Content colorStyle="green" collapsed>
		<div class="ts-wrap is-compact is-middle-aligned" style="line-height: 0;">
			<div style="margin-top: -2px;">Ans:</div>
			<div v-if="Array.isArray(answerLatex)" class="ts-wrap is-vertical" style="--gap: 2px"><!-- 垂直排列的多個答案 -->
				<vl v-for="e in answerLatex" :exp="e" />
			</div>
			<vl v-else :exp="answerLatex" /><!-- 單個答案 -->
		</div>
	</Content>
</template>

<script setup>
const props = defineProps([ 'answerLatex' ]); // 解答的 latex 語法 (string), 若為多個解答則為 Array<string>
</script>
