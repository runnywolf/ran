<template>
	<div class="ts-chip is-circular is-start-icon" :data-tooltip="tagMap[tag]?.en">
		<span class="ts-icon is-hashtag-icon is-small tag-icon"></span>
		<span class="tag-name">{{ tagMap[tag]?.zhtw ?? "未知" }}</span>
	</div>
</template>

<script setup>
import tagMap from "@/exam-db/tag-map.json"; // 用於將 tag 縮寫映射到英文/中文全名

const props = defineProps({ tag: String }); // 題目的標籤
</script>

<style scoped>
.tag-icon {
	margin-right: -4px;
}
.tag-name {
	user-select: none; /* 禁止選取 */
}
</style>
