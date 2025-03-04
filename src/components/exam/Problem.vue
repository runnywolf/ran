<template>
	<div class="ts-wrap is-vertical">
		<component :is="problemAsyncComp"></component><!-- 題目 -->
		<div v-if="problemData && no[0] != '-'" class="ts-wrap is-compact is-vertical"><!-- 題號開頭若為 '-', 會被視為是說明區塊, 沒有解答 -->
			<template v-for="(contentData, i) in problemData.content">
				<Content v-if="contentData.type === 'answer'" :borderColor="'#7af'" :bgColor="'#def'">
					<details class="ts-accordion">
						<summary>解答 {{ contentData.suffix }}</summary>
						<component :is="contentAsyncComps[i]"></component><!-- 題目 -->
					</details>
				</Content>
			</template>
		</div>
	</div>
</template>

<script setup>
import { defineEmits, shallowRef, onMounted, defineAsyncComponent } from "vue";
import ProblemNotFoundComp from "@/components/exam/ProblemNotFound.vue"; // 題目載入失敗時, 顯示的錯誤訊息組件
import Content from "@/components/Content.vue"

const props = defineProps({
  uni: String, // 學校英文縮寫
	year: String, // 題本年份
	no: String, // 題號
  problemData: Object, // 題本資料
});

const emit = defineEmits([
	"loadingCompleted" // 元件載入完成的 event
]);

const problemAsyncComp = shallowRef(null);
const contentAsyncComps = shallowRef([]);

onMounted(async () => { // 在組件 Problem 生成時, 載入題目和解答的組件. (題號變化時, 此組件應該不會更新...?)
	problemAsyncComp.value = defineAsyncComponent(() => // 載入題目的組件
		import(`../exam/${props.uni}/${props.year}/problem/${props.no}.vue`)
			.catch(ProblemNotFound) // 題目組件載入失敗時, 顯示錯誤訊息組件
			.then(loadingCompleted) // 題目載入完成時, 要做的事
	);
	
	if (props.no[0] == '-') return; // 題號開頭若為 '-', 會被視為是說明區塊, 沒有解答
	if (!props.problemData) { // ?
		console.error(
			`Problem data is not exist. (problem ${props.no})\n`+
			`-> Set the `+
			`@/components/exam/${props.uni}/${props.year}/config.json > problem.${props.no}: {...}`
		);
		return;
	}
	if (!props.problemData.content || props.problemData.content.length === 0) { // ?
		console.warn(
			`Problem content is undefined or empty. (problem ${props.no})\n`+
			`-> Add { "type": ?, "id": ? } in `+
			`@/components/exam/${props.uni}/${props.year}/config.json > problem.${props.no}.content: [...]`
		);
		return;
	}
	contentAsyncComps.value = await Promise.all( // 載入解答的組件 (解答有可能是其他文字區塊)
		props.problemData.content.map(loadContentComp)
	);
});

const ProblemNotFound = () => { // 題目組件載入失敗時, 顯示錯誤訊息組件
	console.error( // 在 console 報錯
		`Problem comp is not exist. (problem ${props.no})\n`+
		`-> Check if @/components/exam/${props.uni}/${props.year}/problem/${props.no}.vue exist?\n`+
		`-> If ${props.no}.vue exist, check the "${props.no}" is in `+
		`@/components/exam/${props.uni}/${props.year}/config.json > section: [...]`
	);
	return ProblemNotFoundComp; // 回傳錯誤訊息組件
};

const loadingCompleted = (module) => { // 題目載入完成時, 要做的事
	emit("loadingCompleted"); // 元件載入完成的 event
	return module;
};

const loadContentComp = (contentData) => defineAsyncComponent( // 載入解答的組件
	() => import(`../exam/${props.uni}/${props.year}/content/${contentData.id}.vue`) // 載入題目組件
		.catch(() => ProblemNotFoundComp) // 解答組件載入失敗時, 顯示錯誤訊息組件
	// [待辦: 找不到解答組件]
);
</script>
