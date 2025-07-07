<template>
	<BodyLayout>
		
		<!-- 左側的資訊板 -->
		<template #sidebar>
			
			<!-- 題本的連結 -->
			<div class="ts-content is-dense">
				<span class="ts-icon is-reply-icon is-end-spaced"></span>
				<RanLink :to="`#/exam/${uni}-${year}`" @click="">
					<span>&nbsp;{{ dbConfig.uniConfigs[uni]?.shortName ?? "" }}</span>
					<span>&nbsp;{{ year ?? "" }}</span>
				</RanLink>
			</div>
			
		</template>
		
		<!-- 右側的題目區域 -->
		<template #content>
			<div class="ts-content">
				<Problem :uni="uni" :year="year" :no="no" :problemConfig="problemConfig" :displayMode="2">
				</Problem>
			</div>
		</template>
		
	</BodyLayout>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import dbConfig from "@/exam-db/config.json"; // 保存所有題本資訊的設定檔
import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容
import Problem from "@/components/problem/Problem.vue"; // 用於顯示題目與解答的組件

// #region 路由解碼
const route = useRoute(); // 目前的路由資訊
const router = useRouter(); // 路由器
const uni = ref(); // 題本的學校英文縮寫
const year = ref(); // 題本的民國年份
const examConfig = ref({}); // 題本設定檔

watch(() => route.params.id, async (newExamId) => { // 當路由改變時, 嘗試解碼題本 id
	var idParams = newExamId.split("-"); // 若路由為 exam/ntu-112, 則 id = "ntu-112", 以 "-" 字符拆分 id
	if (idParams.length != 2) { // 如果題本 id 的形式不是 "xxx-xxx", 視為無效 id, 轉址回題本清單
		handleWrongExamIdFormat(newExamId);
		return; // 提前終止
	}
	const [_uni, _year] = idParams; // 題本 id 的第一個參數為 uni, 第二個參數為 year
	
	const examConfigFile = await import(`../../exam-db/${_uni}/${_year}/config.json`) // 讀取題本設定檔
		.catch(() => handleExamMissing(_uni, _year)) // 若題本設定檔不存在或路徑錯誤, 報錯, 並轉址回題本清單
	if (!examConfigFile) return; // 題本設定檔不存在, 提前終止
	
	uni.value = _uni; // 如果題本設定檔載入成功, 更新學校和年份和題本設定檔
	year.value = _year;
	examConfig.value = examConfigFile.default; // json -> Object
}, { immediate: true }); // 組件載入時, 做一次

function handleWrongExamIdFormat(wrongExamId) { // 如果題本 id 的形式不是 "xxx-xxx", 視為無效 id
	console.error(`Wrong exam id format "${wrongExamId}".\n`);
	router.push("/exam"); // 轉址回題本清單
}

function handleExamMissing(_uni, _year) { // 若題本設定檔不存在或路徑錯誤
	console.error(
		`Exam config is not exist. (exam "${_uni}-${_year}")\n`+
		`-> Check if src/exam-db/${_uni}/${_year}/config.json exist?\n`
	);
	router.push("/exam"); // 轉址回題本清單
};
// #endregion

const no = computed(() => route.params.prob); // 當路由的題目編號改變時
const problemConfig = computed(() => examConfig.value.problemConfigs?.[no.value]); // 題目設定
</script>
