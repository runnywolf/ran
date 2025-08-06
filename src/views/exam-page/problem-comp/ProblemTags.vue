<template>
	<div v-if="tags.length > 0" class="ts-grid is-compact">
		<div v-for="tag in tags" class="ts-chip is-circular is-start-icon" :data-tooltip="tagMap[tag]?.en">
			<span class="ts-icon is-hashtag-icon is-small tag-icon"></span>
			<span>{{ tagMap[tag]?.zhtw ?? "未知" }}</span>
		</div>
	</div>
	<div v-else class="ts-content is-center-aligned is-fitted">無標籤</div>
</template>

<script setup>
import tagMap from "@/exam-db/tag-map.json"; // 用於將 tag 縮寫映射到英文/中文全名

const props = defineProps({
	tags: { type: Array, default: [] }, // 題目的標籤
});
</script>

<style scoped>
.tag-icon {
	margin-right: -4px;
}
</style>
