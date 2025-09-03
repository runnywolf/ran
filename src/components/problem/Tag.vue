<template>
	<div class="ts-chip is-circular is-start-icon tag" :data-tooltip="tagNameEn" @click="whenTagClicked">
		<span class="ts-icon is-hashtag-icon is-small"></span>
		<span>{{ tagNameZhtw }}</span>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getTagTreeSearchPath } from "@/exam-db/examLoader.js"; // 用於將 tag 縮寫映射到英文/中文全名

const props = defineProps({
	tag: { type: String, default: "" }, // tag 英文縮寫
	clickToSearch: { type: Boolean, default: false }, // 是否要啟用: 點擊後跳轉至搜尋頁面
}); // 題目的標籤

function getEnTooltip(tagNodeArr) { // 繪製 tag 的英文目錄
	let enTooltip = "";
	tagNodeArr.forEach((tagNode, i) => {
		if (i > 0) enTooltip += `\n${"　".repeat(i-1)}└ `; // 縮排階層結構
		enTooltip += tagNode.en;
	});
	return enTooltip;
}

const router = useRouter(); // 路由器
const isTagExist = ref(false); // tag 是否在 tag tree 裡
const tagNameEn = ref("?"); // 標籤顯示的英文 (因為太長, 所以以 tooltip 顯示)
const tagNameZhtw = ref("?"); // 標籤顯示的中文

watch(() => props.tag, tag => {
	const tagNodeArr = getTagTreeSearchPath(tag); // tag 在 tag tree 的路徑
	
	isTagExist.value = tagNodeArr.length > 0; // tag 是否存在
	tagNameEn.value = isTagExist.value ? getEnTooltip(tagNodeArr) : "Unknown"; // 英文會顯示目錄階層結構 (tooltip)
	tagNameZhtw.value = isTagExist.value ? tagNodeArr.at(-1).zhtw : "未知"; // 中文名只顯示最底層目錄名
}, { immediate: true });

function whenTagClicked() { // 左側 tag 被點擊
	if (props.clickToSearch && isTagExist.value) router.push(`/search/${props.tag}`); // 如果 tag 存在, 跳轉至搜尋頁面, 並自動選取這個 tag
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
