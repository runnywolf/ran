<template>
	<BodyLayout>
		
		<!-- 左側的資訊板 -->
		<template #sidebar>
			
			<!-- 題本的連結 -->
			<div class="ts-content is-dense">
				<span class="ts-icon is-reply-icon is-end-spaced"></span>
				<RanLink :to="`#/exam/${uni}-${year}`" @click="clickExamLink">
					<span>&nbsp;{{ dbConfig.uniConfigs[uni]?.shortName ?? "" }}</span>
					<span>&nbsp;{{ year ?? "" }}</span>
				</RanLink>
			</div>
			<div class="ts-divider"></div>
			
			<!-- 標籤 -->
			<div class="ts-content is-compact">
				<div v-if="(problemConfig.tags ?? []).length > 0" class="ts-grid is-compact">
					<Tag v-for="tag in problemConfig.tags" :tag="tag" clickToSearch></Tag>
				</div>
				<div v-else class="ts-content is-center-aligned is-fitted">無標籤</div>
			</div>
			
		</template>
		
		<!-- 右側的題目區域 -->
		<template #content>
			<div class="ts-content">
				<Problem
					:uni="uni" :year="year" :no="no" :problemConfig="problemConfig"
					hideProblemScore showAnswer showContent
				></Problem>
			</div>
		</template>
		
	</BodyLayout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showToast, ToastType } from "toast";
import { decodeExamIdAndGetConfig } from "./getExamConfig.js"; // 讀取題本設定檔
import dbConfig from "@/exam-db/config.json"; // 保存所有題本資訊的設定檔
import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容
import Tag from "@/components/problem/Tag.vue"; // tag 組件
import Problem from "@/components/problem/Problem.vue"; // 用於顯示題目與解答的組件

const route = useRoute(); // 目前的路由資訊
const router = useRouter(); // 路由器
const uni = ref(); // 題本的學校英文縮寫
const year = ref(); // 題本的民國年份
const no = ref(); // 題目編號
const problemConfig = ref({}); // 題目設定

watch(() => [route.params.id, route.params.prob], async ([newExamId, newNo]) => { // 當路由改變時, 嘗試解碼題本 id
	const examData = await decodeExamIdAndGetConfig(newExamId, router); // 讀取題本設定檔
	uni.value = examData.uni; // 如果題本設定檔載入成功, 更新學校和年份和題本設定檔
	year.value = examData.year;
	no.value = newNo; // 題號
	
	const examConfig = examData.examConfig;
	if (!(newNo in examConfig.problemConfigs)) { // 題號不存在
		handleProblemMissing(uni.value, year.value, newNo);
		return; // 提前終止
	}
	
	problemConfig.value = examConfig.problemConfigs[newNo]; // 題目設定
}, { immediate: true }); // 組件載入時, 做一次

function handleProblemMissing(_uni, _year, _no) { // 題號不存在
	console.error(`Problem ${_no} is not exist. (exam "${_uni}-${_year}")`);
	showToast(`題本 ${_uni}-${_year} 的第 ${_no} 題不存在`, ToastType.ERROR);
	router.push(`/exam/${_uni}-${_year}`); // 轉址回題本
}

const clickExamLink = () => { // 當左側資訊版的題本連結被點擊
	sessionStorage.setItem("scroll-target-no-in-exam-view", no.value); // 儲存要滾動到的題號
};
</script>
