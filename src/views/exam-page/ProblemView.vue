<template>
	<BodyLayout>
		
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
			<div class="ts-content is-dense ts-text is-center-aligned">
				
				<!-- 上一題的連結 -->
				<RanLink v-if="prevNo" :to="`#/exam/${uni}-${year}/${prevNo}`">
					<span>{{ prevNo }}</span>
					<span class="ts-icon is-arrow-left-icon is-spaced" style="color: #000;"></span>
				</RanLink>
				
				<span>{{ no }}</span>
				
				<!-- 下一題的連結 -->
				<RanLink v-if="nextNo" :to="`#/exam/${uni}-${year}/${nextNo}`">
					<span class="ts-icon is-arrow-right-icon is-spaced" style="color: #000;"></span>
					<span>{{ nextNo }}</span>
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
import { getUniShortName, decodeExamIdAndGetConfig } from "@/exam-db/examLoader.js"; // 讀取題本資料
import BodyLayout from "@/components/BodyLayout.vue"; // 用於建構 body 的 sidebar 與內容
import Tag from "@/components/problem/Tag.vue"; // tag 組件
import Problem from "@/components/problem/Problem.vue"; // 用於顯示題目與解答的組件

const route = useRoute(); // 目前的路由資訊
const router = useRouter(); // 路由器
const uni = ref(); // 題本的學校英文縮寫
const year = ref(); // 題本的民國年份
const no = ref(); // 題目編號
const problemConfig = ref({}); // 題目設定
const prevNo = ref(null); // 上一題的題號
const nextNo = ref(null); // 下一題的題號

function getPrevAndNextNo(examConfig, no) { // 取得目前題號的上一題號 & 下一題號
	const problemNoList = examConfig.sectionFileBaseNames.filter(no_ => no_[0] !== "-"); // 題本的題號 (有序)
	const noIndex = problemNoList.indexOf(no);
	if (noIndex === -1) return [null, null]; // 題號不存在
	
	return [problemNoList[noIndex-1], problemNoList[noIndex+1]];
}

watch(() => [route.params.id, route.params.prob], async ([newExamId, newNo]) => { // 當路由改變時, 嘗試解碼題本 id
	let examData = null;
	try {
		examData = await decodeExamIdAndGetConfig(newExamId); // 讀取題本設定檔內的 problem config
	} catch (err) {
		router.push(`/exam/${newExamId}`); // 轉址回題本頁面
		return;
	}
	uni.value = examData.uni;
	year.value = examData.year;
	no.value = newNo;
	const examConfig = examData.examConfig; // 題本設定檔
	
	if (!(no.value in examConfig.problemConfigs)) { // 題號不存在
		console.error(
			`[examLoader] Problem ${no.value} config is not exist. (exam "${uni.value}-${year.value}")\n`
		);
		showToast(`題本 ${uni.value}-${year.value} 的第 ${no.value} 題不存在`, ToastType.ERROR);
		router.push(`/exam/${newExamId}`); // 轉址回題本頁面
		return;
	}
	problemConfig.value = examConfig.problemConfigs[no.value]; // problem config
	
	[prevNo.value, nextNo.value] = getPrevAndNextNo(examConfig, no.value); // 取得目前題號的上一題號 & 下一題號
}, { immediate: true }); // 組件載入時, 做一次

const clickExamLink = () => { // 當左側資訊版的題本連結被點擊
	sessionStorage.setItem("scroll-target-no-in-exam-view", no.value); // 儲存要滾動到的題號
};
</script>
