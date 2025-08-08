<template>
	<div v-if="tags.length > 0" class="ts-grid is-compact">
		<Tag v-for="tag in tags" :tag="tag"></Tag>
	</div>
	<div v-else class="ts-content is-center-aligned is-fitted">無標籤</div>
</template>

<script setup>
import Tag from "@/components/problem/Tag.vue";

const props = defineProps({
	tags: { type: Array, default: [] }, // 題目的標籤
});
</script>
