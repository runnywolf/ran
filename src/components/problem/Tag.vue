<template>
	<div
		class="ts-chip is-circular is-start-icon tag"
		:data-tooltip="tagMap[tag]?.en ?? '?'"
		@click="whenTagClicked"
	>
		<span class="ts-icon is-hashtag-icon is-small"></span>
		<span>{{ tagMap[tag]?.zhtw ?? "未知" }}</span>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";
import tagMap from "@/exam-db/tag-map.json"; // 用於將 tag 縮寫映射到英文/中文全名

const props = defineProps({
	tag: String, // tag 英文縮寫
	clickToSearch: { type: Boolean, default: false }, // 是否要啟用: 點擊後跳轉至搜尋頁面
}); // 題目的標籤

const router = useRouter(); // 路由器

function whenTagClicked() { // 左側 tag 被點擊
	if (props.clickToSearch && props.tag in tagMap) { // 如果 tag 存在才跳轉
		router.push(`/search/${props.tag}`); // 跳轉至搜尋頁面, 並自動選取這個 tag
		document.querySelectorAll(".ts-tooltip").forEach(el => el.remove()); // 若 tooltip 正在顯示, 跳轉後會留在頁面上, 所以需要刪除
	}
}
</script>

<style scoped>
.tag {
	user-select: none; /* 禁止選取 */
}
.tag > span.ts-icon {
	margin-right: -4px; /* 減少 icon 與文字間的距離 */
}
</style>
