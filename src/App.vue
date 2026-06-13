<template>
	<div class="ts-app-layout is-fullscreen is-vertical">
		<Navbar></Navbar>
		<div class="cell is-secondary is-fluid is-scrollable">
			<div class="ts-container has-vertically-spaced is-narrow">
				<router-view></router-view>
			</div>
		</div>
	</div>
	<Toast></Toast>
</template>

<script setup lang="ts">
import Navbar from "./components/app-comp/Navbar.vue"; // 頁面頂部的導覽列
import Toast from "./components/app-comp/Toast.vue"; // 彈出方塊的組件 (預設為隱藏)
</script>

<style scoped>
.ts-container {
	min-width: 1000px;
	--width: 1000px; /* body 內的寬度 */
}
</style>
