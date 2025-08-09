<template>
	<div class="ts-box">
		
		<!-- 搜尋框 + 建議列表 -->
		<div class="ts-content is-padded">
			<SearchBox @input-changed="(inputText, tags) => console.log(inputText, tags)"></SearchBox>
		</div>
		
	</div>
</template>

<script setup>
import SearchBox from "./search-comp/SearchBox.vue"; // 搜尋框

</script>
