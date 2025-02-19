<template>
	<div class="ts-app-layout is-fullscreen is-vertical">
		<navbar></navbar>
		<div class="cell is-secondary is-fluid is-scrollable">
			<div class="ts-container has-vertically-spaced is-narrow">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
</script>

<style scoped>

</style>
