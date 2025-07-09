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

<script setup>
import Navbar from "./components/app-comp/Navbar.vue";
import Toast from "./components/app-comp/Toast.vue";
</script>

<style scoped>
.ts-container {
	min-width: 1000px;
	--width: 1000px; /* body 內的寬度 */
}
</style>
