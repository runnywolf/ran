<template>
	<div class="ts-app-navbar navbar" :style="{ '--scale': navbarScale }">
		<router-link v-for="{ iconName, label, toPath } in navbarOptionList"
			class="item" :class="{ 'is-active': route.path.split('/')[1] === toPath }"
			:to="`/${toPath}`"
		>
			<div :class="`ts-icon is-${iconName}-icon`"></div>
			<div v-if="navbarScale > 0.8" class="label">{{ label }}</div><!-- 視窗寬度太小, 會隱藏選項的文字 -->
		</router-link>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const navbarOptionList = [ // 導覽列的每個選項的資訊: { iconName: 選項的圖示 id (font-awesome), label: 選項的文字 }
	{ iconName: "house", label: "首頁", toPath: "" },
	{ iconName: "book", label: "筆記", toPath: "notes" },
	{ iconName: "file", label: "歷屆試題", toPath: "exam" },
	{ iconName: "magnifying-glass", label: "搜尋題目", toPath: "search" },
	{ iconName: "pen", label: "模擬室", toPath: "practice" },
	{ iconName: "ellipsis", label: "更多", toPath: "other" },
];

const route = useRoute(); // 路由
const navbarScale = ref(1); // 導覽列縮放比例

function whenWindowResize() { // 當視窗大小改變, 計算導覽列縮放比例
	const baseWidth = 86 * navbarOptionList.length + 6; // 原始設計寬度: (80px + margin 3*2px) * 6 + 邊界緩衝 6px
	navbarScale.value = Math.min(window.innerWidth / baseWidth, 1); // 如果視窗寬度小於 navbar 的選項總長度, 會將 navbar 縮小
}

onMounted(() => {
  window.addEventListener("resize", whenWindowResize);
  whenWindowResize(); // dom 建構完成, 需要根據視窗寬度計算一次樣式
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", whenWindowResize);
});
</script>

<style scoped>
.navbar { /* 導航列樣式 */
	background-color: #7af;
	display: flex; justify-content: center; /* 置中項目 */
}
.navbar > a { /* 項目按鈕 */
	width: calc(80px * var(--scale));
	height: calc(60px * var(--scale));
	margin: calc(4px * var(--scale)) calc(3px * var(--scale));
	border-radius: 4px;
	font-size: calc(15px * var(--scale));
	color: #fff !important;
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
.navbar > a:hover { /* 如果滑鼠懸停在項目按鈕上, 稍微變白 */
	background-color: #fff2;
}
.navbar > a.is-active { /* 如果項目按鈕被選中, 變更白 */
	background-color: #fff4;
}
</style>
