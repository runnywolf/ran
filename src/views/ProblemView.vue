<template>
	<SidebarContent>
		
		<!-- 左側的資訊板 -->
		<template #sidebar>
			
			<!-- 題本的連結 -->
			<div class="ts-content is-dense">
				<span class="ts-icon is-reply-icon is-end-spaced"></span>
				<RanLink :to="`#/exam/${uni}-${year}`" @click="clickExamLink">
					{{ ` ${getUniShortName(uni)} ${year ?? ""}` }}
				</RanLink>
			</div>
			<div class="ts-divider"></div>
			
			<!-- 上一題和下一題的連結 -->
			<div class="ts-content is-dense">
				<div class="ts-grid is-center-aligned is-compact" style="row-gap: 0">
					
					<!-- 上一題的連結 -->
					<RanLink v-if="prevNo" :to="`#/exam/${uni}-${year}/${prevNo}`">
						<span>{{ prevNo }}</span>
						<span class="ts-icon is-arrow-left-icon is-start-spaced" style="color: black"></span>
					</RanLink>
					
					<!-- 目前題目的題號 -->
					<span>{{ no }}</span>
					
					<!-- 下一題的連結 -->
					<RanLink v-if="nextNo" :to="`#/exam/${uni}-${year}/${nextNo}`">
						<span class="ts-icon is-arrow-right-icon is-end-spaced" style="color: black"></span>
						<span>{{ nextNo }}</span>
					</RanLink>
					
				</div>
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
		
	</SidebarContent>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { showToast, ToastType } from "toast";
import { getUniShortName, decodeExamId, getProblemConfig, getPrevAndNextNo } from "@lib/exam-db"; // 讀取題本資料
import { ProblemConfigMissingError } from "@lib/exam-db"; // error
import SidebarContent from "@/components/layout/SidebarContent.vue"; // 用於建構 body 的 sidebar 與內容
import Tag from "@/components/problem/Tag.vue"; // tag 組件
import Problem from "@/components/problem/Problem.vue"; // 用於顯示題目與解答的組件

const route = useRoute(); // 目前的路由資訊
const router = useRouter(); // 路由器
const uni = ref(null); // 題本的學校英文縮寫
const year = ref(null); // 題本的民國年份
const no = ref(null); // 題目編號
const problemConfig = ref({}); // 題目設定
const prevNo = ref(null); // 上一題的題號
const nextNo = ref(null); // 下一題的題號

watch(() => [route.params.id, route.params.prob], async ([newExamId, newNo]) => { // 當路由改變時, 嘗試解碼題本 id
	try {
		const [_uni, _year] = decodeExamId(newExamId); // 將題本 id "<uni>-<year>" 轉為 [<uni>, <year>]
		const _problemConfig = await getProblemConfig(_uni, _year, newNo); // 讀取題本設定檔
		[prevNo.value, nextNo.value] = await getPrevAndNextNo(_uni, _year, newNo); // 取得上一題 & 下一題的題號
		[uni.value, year.value, no.value, problemConfig.value] = [_uni, _year, newNo, _problemConfig]; // 在 config 讀取成功前, 不能修改這些值, 防止 Problem.vue 報錯
	} catch (err) {
		if (err instanceof ProblemConfigMissingError) { // 如果題號不存在
			showToast(`題本 ${err.uni}-${err.year} 的第 ${err.no} 題不存在`, ToastType.ERROR);
		}
		console.error(err.message); // 在 console 報錯
		router.push(`/exam/${newExamId}`); // 轉址回題本頁面, 由 ExamView.vue 處理 exam config 的報錯
	}
}, { immediate: true }); // 組件載入時, 做一次

const clickExamLink = () => { // 當左側資訊版的題本連結被點擊
	sessionStorage.setItem("scroll-target-no-in-exam-view", no.value); // 儲存要滾動到的題號
};
</script>
