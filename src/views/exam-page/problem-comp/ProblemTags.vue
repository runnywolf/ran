<template>
	<div v-if="tags.length > 0" class="ts-grid is-compact">
		<div v-for="tag in tags" class="ts-chip is-circular is-start-icon">
			<span class="ts-icon is-hashtag-icon is-small tag-icon"></span>
			<span>{{ tagMap[tag] ?? "?" }}</span>
		</div>
	</div>
	<div v-else class="ts-content is-center-aligned is-fitted">無標籤</div>
</template>

<script setup>
const props = defineProps({
	tags: { type: Array, default: [] }, // 題目的標籤
});

const tagMap = { // 將 problem config 當中的多個英文 tag 轉換成中文
	"recurrence": "遞迴",
	"generating-func": "生成函數",
};
</script>

<style scoped>
.tag-icon {
	margin-right: -4px;
}
</style>
