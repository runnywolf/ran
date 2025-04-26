<!--
	BodyLayout 用於建構 body 的 sidebar 與內容
	
	用法:
	import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容
	
	<BodyLayout>
		<template #sidebar>
			<span>sidebar</span>
		</template>
		<template #content>
			<span>右側內容</span>
		</template>
	</BodyLayout>
-->

<template>
	<div class="ts-grid">
		
		<!-- 左側 側邊欄 -->
		<div class="column">
			<div class="ts-box is-vertical is-compact sidebar">
				<slot name="sidebar"></slot>
			</div>
		</div>
		
		<!-- 右側內容 -->
		<div class="column is-fluid">
			<div class="ts-box">
				<slot name="content"></slot>
			</div>
		</div>
		
	</div>
</template>

<style scoped>
.sidebar { /* 側邊欄的統一樣式 */
	position: sticky; top: 15px; /* 即使題目區往下移動, 這個 box 也會在原地 */
	width: 160px; /* 側邊欄的寬度 */
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
</style>
