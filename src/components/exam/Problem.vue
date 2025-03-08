<template>
	<div class="ts-wrap is-vertical">
		<component :is="problemAsyncComp"></component><!-- 題目 -->
		<div v-if="problemConfig && no[0] != '-'" class="ts-wrap is-compact is-vertical content"><!-- 題號開頭若為 '-', 會被視為是說明區塊, 沒有內容區塊 -->
			<template v-for="(contentData, i) in problemConfig.content">
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
import ContentNotFoundComp from "@/components/exam/ContentNotFound.vue"; // 內容區塊載入失敗時, 顯示的錯誤訊息組件

const props = defineProps({
  uni: String, // 學校英文縮寫
	year: String, // 題本年份
	no: String, // 題號
  problemConfig: Object, // 題本資料
});

const emit = defineEmits([
	"loadingCompleted" // 元件載入完成的 event
]);

const problemAsyncComp = shallowRef(null);
const contentAsyncComps = shallowRef([]);

onMounted(async () => { // 在組件 Problem 生成時, 載入題目和內容區塊的組件. (題號變化時, 此組件應該不會更新...?)
	problemAsyncComp.value = defineAsyncComponent(() => // 載入題目的組件
		import(`../exam/${props.uni}/${props.year}/problem/${props.no}.vue`)
			.catch(handleProblemCompMissing) // 題目組件載入失敗時, 顯示錯誤訊息組件
			.then(loadingCompleted) // 題目載入完成時, 要做的事
	);
	
	if (props.no[0] == '-') return; // 題號開頭若為 '-', 會被視為是說明區塊, 沒有內容區塊
	if (!props.problemConfig) { // 如果題目設定檔不存在
		handleProblemConfigMissing();
		return;
	}
	if (!props.problemConfig.content || props.problemConfig.content.length === 0) {
		handleProblemContentEmpty(); // 題目設定檔定義的內容區塊組件不存在或留空
		return;
	}
	contentAsyncComps.value = await Promise.all( // 載入內容區塊的組件 (內容區塊有可能是其他文字區塊)
		props.problemConfig.content.map(async (contentData) => defineAsyncComponent(() => 
			import(`../exam/${props.uni}/${props.year}/content/${contentData.id}.vue`) // 載入題目組件
				.catch(error => handleContentMissing(contentData.id)) // 內容區塊組件載入失敗時, 顯示錯誤訊息組件
		))
	);
});

const loadingCompleted = (module) => { // 題目載入完成時, 要做的事
	emit("loadingCompleted"); // 元件載入完成的 event
	return module;
};

const handleProblemCompMissing = () => { // 題目組件載入失敗時, 顯示錯誤訊息組件
	console.error( // 在 console 報錯
		`Problem comp is not exist. (problem ${props.no})\n`+
		`-> Check if @/components/exam/${props.uni}/${props.year}/problem/${props.no}.vue exist?\n`+
		`-> If ${props.no}.vue exist, check the "${props.no}" is in `+
		`@/components/exam/${props.uni}/${props.year}/config.json > section: [...]`
	);
	return ProblemNotFoundComp; // 回傳錯誤訊息組件
};

const handleProblemConfigMissing = () => { // 題目設定檔不存在
	console.error(
		`Problem config is not exist. (problem ${props.no})\n`+
		`-> Set the `+
		`@/components/exam/${props.uni}/${props.year}/config.json > problem.${props.no}: {...}`
	);
};

const handleProblemContentEmpty = () => { // 題目設定檔定義的內容區塊組件不存在或留空
	console.warn(
		`Problem content is undefined or empty. (problem ${props.no})\n`+
		`-> Add { "type": ?, "id": ? } in `+
		`@/components/exam/${props.uni}/${props.year}/config.json > problem.${props.no}.content: [...]`
	);
};

const handleContentMissing = (contentId) => {
	console.error(
		`Content comp is not exist. (problem ${props.no}, content ${contentId})\n`+
		`-> Check if @/components/exam/${props.uni}/${props.year}/content/${contentId}.vue exist?\n`+
		`-> If ${contentId}.vue exist, check the elements in `+
		`@/components/exam/${props.uni}/${props.year}/config.json > problem.${props.no}.content: [...], `+
		`and one of element.id must be "${contentId}".`
	);
	return ContentNotFoundComp; // 內容區塊組件載入失敗時, 顯示錯誤訊息組件
};
</script>

<style scoped>
.content {
	line-height: 1.6em; /* 內容區塊區塊的行距 (倍) */
}
</style>
