<template>
	<BodyLayout>
		
		<!-- 左側的資訊板 -->
		<template #sidebar>
			
			<!-- 題本的連結 -->
			<div class="ts-content is-dense">
				<span class="ts-icon is-reply-icon is-end-spaced"></span>
				<router-link
					class="hyperlink"
					:to="{ path: `/exam/${uni}-${year}`}"
					@click="() => { globalVar.examScrollProbNo = no; }"
				>
					<span>&nbsp;{{ config.uni[uni] ? config.uni[uni].shortName : "" }}</span>
					<span>&nbsp;{{ year ?? "" }}</span>
				</router-link>
			</div>
			
		</template>
		
		<!-- 右側的題目區域 -->
		<template #content>
			<div class="ts-content">
				<Problem v-if="examConfig.problem"
					:uni="uni" :year="year" :no="no"
					:problemConfig="examConfig.problem[no]"
					contentType="content"
				></Problem>
			</div>
		</template>
		
	</BodyLayout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { globalStore } from "@/store/global"; // pinia 全域變數
import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容
import Problem from "@/components/problem/Problem.vue"; // 用於顯示題目與解答的組件
import config from "@/components/exam/config.json"; // 保存所有題本資訊的設定檔

const globalVar = globalStore(); // 全域變數

const route = useRoute(); // 目前的路由資訊
const router = useRouter(); // 路由器

const uni = ref(undefined); // 學校
const year = ref(undefined); // 年份
const no = ref(undefined); // 題號
const examConfig = ref({}); // 題本設定檔

watch(() => route.params.id, async (newExamId) => { // 當路由的題本 id 改變時, 嘗試解碼題本 id
	var idParam = newExamId.split("-"); // 若路由為 exam/ntu-112, 則 id = "ntu-112", 以 "-" 字符拆分 id
	if (idParam.length != 2) { // 如果題本 id 的參數個數不為 2, 視為無效 id, 轉址回題本清單
		handleWrongExamIdFormat(newExamId);
		return;
	}
	const [_uni, _year] = idParam; // 題本 id 的第一個參數為 uni, 第二個參數為 year
	
	const configFile = await import(`../../components/exam/${_uni}/${_year}/config.json`) // 讀取題本設定檔
		.catch(() => handleExamMissing(_uni, _year)); // 若題本設定檔不存在或路徑錯誤, 報錯, 並轉址回題本清單
	if (!configFile) return;
	
	uni.value = _uni;
	year.value = _year;
	examConfig.value = configFile.default; // json -> Object
}, { immediate: true }); // 組件載入時, 做一次

function handleWrongExamIdFormat(wrongExamId) { // 如果題本 id 的參數個數不為 2, 視為無效 id
	console.error(
		`Wrong id format. (exam id: ${wrongExamId})\n`
	);
	router.push("/exam"); // 轉址回題本清單
}

const handleExamMissing = (_uni, _year) => { // 若題本設定檔不存在或路徑錯誤
	console.error(
		`Exam config is not exist. (exam ${_uni}-${_year})\n`+
		`-> Check if @/components/exam/${_uni}/${_year}/config.json exist?\n`
	);
	router.push("/exam"); // 轉址回題本清單
};

watch(() => route.params.prob, (newProblemNo) => { // 當路由的題目編號改變時
	no.value = newProblemNo;
}, { immediate: true }); // 組件載入時, 做一次
</script>
