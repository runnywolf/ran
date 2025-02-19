<template>
	<div class="cell is-secondary is-fluid is-scrollable">
		<div class="ts-container has-vertically-spaced is-narrow">
			<div class="ts-grid">
				<div class="column">
					<div style="position: sticky; top: 16px;">
						<div class="ts-grid is-compact menu">
							<div class="ts-menu is-dense is-small is-collapsed is-separated">
								<a class="item" :href="getUrl('ntu', 100)">台大</a>
								<a class="item" :href="getUrl('ntu', 101)">清大</a>
								<a class="item">交大</a>
								<a class="item">台科大</a>
							</div>
							<div class="ts-menu is-dense is-small is-collapsed is-separated">
								<a class="item">102</a>
								<a class="item">101</a>
								<a class="item">100</a>
								<a class="item is-active">99</a>
								<a class="item">98</a>
							</div>
						</div>
					</div>
				</div>
				<div class="column is-fluid">
					<div class="ts-box">
						<div class="ts-content">
							problem 1 - test
							<div class="ts-divider is-section"></div>
							problem 2
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // 路由

/**
 * 
 * @param {string} universityName 學校名稱縮寫
 * @param {string} year 年份
 * @returns {string} 
 */
const getUrl = computed(() => (universityName, year) => {
	const url = new URL(window.location); // 獲取當前頁面的 URL
	const params = new URLSearchParams(url.search); // 獲取當前 URL 的查詢參數
	
	params.set("u", universityName); // 更新參數
	params.set("y", year);
	
	url.search = params.toString(); // 修改 URL 並跳轉 (保持 hash 部分)
	return url.toString(); // 更新 URL，但不重新加載頁面
});
</script>

<style scoped>
.menu > div > a {
	display: flex; justify-content: center; /* 水平置中 */
	white-space: nowrap; user-select: none; /* 禁止換行, 禁止被選取 */
}
</style>
