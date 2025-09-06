<template>
	<SidebarContent>
		
		<!-- 可以切換第二層路徑的側邊欄選單 -->
		<template #sidebar>
			<div class="ts-content is-compact ts-menu is-dense is-separated is-start-icon">
				<router-link v-for="{ iconName, label, to, tooltip } in optionConfigArr"
					class="item"
					:class="{ 'is-active': route.path === to }"
					:to="to"
					:data-tooltip="tooltip"
					data-position="right"
				>
					<span :class="`ts-icon is-${iconName}-icon`"></span>
					<span>{{ label }}</span>
				</router-link>
			</div>
		</template>
		
		<!-- 右側內容 -->
		<template #content>
			<slot></slot>
		</template>
		
	</SidebarContent>
</template>

<script setup>
import { useRoute } from "vue-router";
import SidebarContent from "./SidebarContent.vue"; // 側邊欄+主要內容的佈局

const props = defineProps({
	optionConfigArr: { type: Array, default: [] }, // 每一個選項的資訊
});

const route = useRoute(); // 路由
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
