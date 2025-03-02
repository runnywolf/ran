<template>
	<component :is="problemAsyncComp"></component><!-- 題目 -->
	<template v-if="no[0] != '-'">
		<Content :borderColor="'#7af'" :bgColor="'#def'">
			<details class="ts-accordion">
				<summary>解答</summary>
				answer
			</details>
		</Content>
	</template>
</template>

<script setup>
import { defineAsyncComponent } from "vue";
import ProblemNotFoundComp from "@/components/exam/ProblemNotFound.vue"; // 題目載入失敗時, 顯示的錯誤訊息組件
import Content from "@/components/Content.vue"

const props = defineProps({
  uni: String, // 學校英文縮寫
	year: String, // 題本年份
	no: String, // 題號
  problemData: Object, // 題本資料
});

const problemAsyncComp = defineAsyncComponent( // 異步載入編號為 id 的題目組件
	() => import(`../exam/${props.uni}/${props.year}/problem/${props.no}.vue`).catch(() => { // 載入題目組件
		console.error(
			`Problem comp ${props.no}.vue is not in @/components/exam/${props.uni}/${props.year}/problem/\
			Check problem/config.json > section`
		);
		return ProblemNotFoundComp; // 題目組件載入失敗時, 顯示錯誤訊息組件
	})
);
</script>
