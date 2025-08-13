<template>
	<div class="ts-chip is-circular is-start-icon tag" :data-tooltip="tagName.en" @click="whenTagClicked">
		<span class="ts-icon is-hashtag-icon is-small"></span>
		<span>{{ tagName.zhtw }}</span>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import tagMap from "@/exam-db/tag-map.json"; // 用於將 tag 縮寫映射到英文/中文全名

const props = defineProps({
	tag: { type: String, default: "" }, // tag 英文縮寫
	clickToSearch: { type: Boolean, default: false }, // 是否要啟用: 點擊後跳轉至搜尋頁面
}); // 題目的標籤

const router = useRouter(); // 路由器
const tagName = computed(() => { // 標籤顯示的中/英文
	const tagNodeArr = searchTagNode(props.tag.split("-")); // 根據 "-" 切分 tag, 在 tag-map 內搜尋 tag 目錄
	tagNodeArr.shift(); // [0] 是 root tag node, 沒有資訊
	if (tagNodeArr.length === 0) return { en: "Unknown", zhtw: "未知" }; // tag 不存在於 tag-map 目錄內
	
	let tagEnTooltip = tagNodeArr[0].en;
	for (let i = 1; i < tagNodeArr.length; i++) tagEnTooltip += `\n${"-".repeat(i)} ${tagNodeArr[i].en}`; // 英文 tag 名的目錄結構
	return { en: tagEnTooltip, zhtw: tagNodeArr.at(-1).zhtw }; // 中文名只顯示最底層目錄名
});

function searchTagNode(segments, tagNode = { children: tagMap }) { // 消耗 segments, 回傳遍歷 tag-tree 得到的 node arr 路徑
	if (segments[0] in (tagNode.children ?? {})) {
		const childNode = tagNode.children[segments.shift()];
		return [tagNode, ...searchTagNode(segments, childNode)];
	}
	return [tagNode];
}

function whenTagClicked() { // 左側 tag 被點擊
	document.querySelectorAll(".ts-tooltip").forEach(el => el.remove()); // 若 tooltip 正在顯示, 跳轉後會留在頁面上, 所以需要刪除 (這是一個機制)
	if (props.clickToSearch && props.tag in tagMap) router.push(`/search/${props.tag}`); // 如果 tag 存在, 跳轉至搜尋頁面, 並自動選取這個 tag
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
