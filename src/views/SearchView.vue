<template>
	<div class="ts-box ts-content is-padded">
		
		<!-- 搜尋框 + 建議列表 -->
		<div style="margin-bottom: 22px;">
			<SearchBox @input-changed="(inputText, tags) => console.log(inputText, tags)"></SearchBox>
		</div>
		
		<!-- 搜尋結果 (很多題目) -->
		<div class="ts-wrap is-vertical is-center-aligned is-compact">
			<div class="ts-box" style="width: 790px;">
				<div class="ts-content">
					<div class="ts-header is-heavy">好吃的千層蛋糕！</div>
					<p>在 5 月之前於線上網路門市訂購，現在還特別加贈限量環保袋。</p>
				</div>
			</div>
			<div class="ts-box" style="width: 790px;">
				<div class="ts-content">
					<div class="ts-header is-heavy">好吃的千層蛋糕！</div>
					<p>在 5 月之前於線上網路門市訂購，現在還特別加贈限量環保袋。</p>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script setup>
import SearchBox from "./search-comp/SearchBox.vue"; // 搜尋框

</script>
