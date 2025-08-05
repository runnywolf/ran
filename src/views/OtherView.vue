<template>
	<BodyLayout>
		
		<!-- 左側的練習項目 -->
		<template #sidebar>
			<div class="ts-content is-compact ts-menu is-dense is-separated is-start-icon">
				<router-link v-for="optionInfo in sidebarOptionList"
					class="item"
					:class="{ 'is-active': route.path === optionInfo.toPath }"
					:to="optionInfo.toPath"
					data-position="right"
				>
					<span :class="`ts-icon is-${optionInfo.iconName}-icon`"></span>
					<span>{{ optionInfo.label }}</span>
				</router-link>
			</div>
		</template>
		
		<!-- 右側的模擬室區域 -->
		<template #content>
			<div class="ts-content">
				<router-view></router-view>
			</div>
		</template>
		
	</BodyLayout>
</template>

<script setup>
import { useRoute } from "vue-router";
import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容

const route = useRoute(); // 路由

const sidebarOptionList = [
	{ iconName: "chart-simple", label: "統計", toPath: "/other/stat" },
];
</script>

<style scoped>
.ts-menu > a {
	padding: 0 9px;
	gap: 9px;
}
.ts-menu > a:not(.is-active):hover { /* 沒有被選取的項目被 hover 時, 將背景變灰 */
	background-color: #eee;
}
</style>
