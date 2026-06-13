import { createRouter, createWebHashHistory, type RouteLocationNormalizedLoaded, type RouteRecordRaw } from "vue-router";
import { getUniShortName, decodeExamId } from "@lib/exam-db";

const routes: RouteRecordRaw[] = [ // page table
	{ path: "/", component: () => import("@/views/HomeView.vue") },
	{ path: "/notes", component: () => import("@/views/NotesView.vue") },
	{ path: "/exam", component: () => import("@/views/ExamMenuView.vue") },
	{ path: "/exam/:id", component: () => import("@/views/ExamView.vue") }, // 題本編號 :id 的格式範例: "ntu-110"
	{ path: "/exam/:id/:prob", component: () => import("@/views/ProblemView.vue") }, // 題號 :prob
	{ path: "/search", component: () => import("@/views/SearchView.vue") },
	{ path: "/search/:tag", component: () => import("@/views/SearchView.vue") }, // 若使用此路徑, 會自動新增一個 tag 在搜尋欄下方
	{
		path: "/practice", component: () => import("@/views/PracticeView.vue"),
		redirect: "/practice/recur",
		children: [
			{ path: "recur", component: () => import("@/views/practice-page/RecurView.vue") },
			{ path: "gs", component: () => import("@/views/practice-page/GsView.vue") },
			{ path: "ic", component: () => import("@/views/practice-page/IcView.vue") },
			{ path: "lu", component: () => import("@/views/practice-page/LuView.vue") },
			{ path: "qr", component: () => import("@/views/practice-page/QrView.vue") },
			{ path: "svd", component: () => import("@/views/practice-page/SvdView.vue") },
			{ path: "diag", component: () => import("@/views/practice-page/DiagView.vue") },
			{ path: ":pathMatch(.*)", redirect: "/practice" },
		]
	},
	{
		path: "/other", component: () => import("@/views/OtherView.vue"),
		redirect: "/other/saved",
		children: [
			{ path: "saved", component: () => import("@/views/other-page/SavedView.vue") },
			{ path: "stat", component: () => import("@/views/other-page/StatView.vue") },
			{ path: ":pathMatch(.*)", redirect: "/other" },
		]
	},
	{ path: "/test", component: () => import("@/tests/TestView.vue") }, // 測試用
	{ path: "/:pathMatch(.*)", redirect: "/" },
];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from) => { // 跳轉頁面前
	removeTooltip(); // 若 tooltip 正在顯示, 跳轉後會留在頁面上, 需要刪除
	return true;
});

router.afterEach((to, from) => { // 跳轉頁面後
	removeTooltip(); // 雖然 remove 一次就夠, 但我測試一下能不能修復首頁的 ran neta tooltip 的 bug
	
	const suffix = getRouteSuffix(to); // 網頁標題的後綴
	document.title = suffix ? `Ran - ${suffix}` : "Ran"; // 如果後綴存在就顯示 "Ran - ...", 否則只顯示 "Ran"
});

function removeTooltip(): void { // 刪除頁面上所有 tocas tooltip
	document.querySelectorAll(".ts-tooltip").forEach(el => el.remove());
}

function getRouteSuffix(to: RouteLocationNormalizedLoaded): string { // 依據目前 route 產生網頁標題的後綴
	const page = to.path.split("/")[1]; // 第一層頁面路由
	
	if (page === "notes") return "筆記";
	else if (page === "exam") {
		try {
			const { id: examId, prob: no } = to.params;
			const { uni, year } = decodeExamId(examId as string);
			return `${getUniShortName(uni)} ${year}` + (no ? ` 第 ${no} 題` : "");
		} catch {
			return "歷屆試題";
		}
	}
	else if (page === "search") return "搜尋題目";
	else if (page === "practice") return "模擬室";
	else if (to.path === "/other/saved") return "收藏";
	else if (to.path === "/other/stat") return "統計";
	
	return "";
}

export default router;
