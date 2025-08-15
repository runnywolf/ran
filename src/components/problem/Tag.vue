<template>
	<div class="ts-chip is-circular is-start-icon tag" :data-tooltip="tagName.en" @click="whenTagClicked">
		<span class="ts-icon is-hashtag-icon is-small"></span>
		<span>{{ tagName.zhtw }}</span>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { getTagTreeSearchPath } from "@/exam-db/examLoader.js"; // 用於將 tag 縮寫映射到英文/中文全名

const props = defineProps({
	tag: { type: String, default: "" }, // tag 英文縮寫
	clickToSearch: { type: Boolean, default: false }, // 是否要啟用: 點擊後跳轉至搜尋頁面
}); // 題目的標籤

const router = useRouter(); // 路由器
const tagNodeArr = computed(() => getTagTreeSearchPath(props.tag)); // tag 在 tag tree 的路徑
const tagName = computed(() => { // 標籤顯示的中/英文
	const arr = tagNodeArr.value;
	if (arr.length === 0) return { en: "Unknown", zhtw: "未知" }; // tag 不存在於 tag tree 目錄內
	
	let tagEnTooltip = arr[0].en;
	for (let i = 1; i < arr.length; i++) tagEnTooltip += `\n${"-".repeat(i)} ${arr[i].en}`; // 英文 tag 名的目錄結構
	return { en: tagEnTooltip, zhtw: arr.at(-1).zhtw }; // 中文名只顯示最底層目錄名
});

function whenTagClicked() { // 左側 tag 被點擊
	document.querySelectorAll(".ts-tooltip").forEach(el => el.remove()); // 若 tooltip 正在顯示, 跳轉後會留在頁面上, 所以需要刪除 (這是一個機制)
	if (props.clickToSearch && tagNodeArr.value.length > 0) router.push(`/search/${props.tag}`); // 如果 tag 存在, 跳轉至搜尋頁面, 並自動選取這個 tag
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
