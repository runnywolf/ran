import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
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

const removeTooltip = () => document.querySelectorAll(".ts-tooltip").forEach(el => el.remove()); // 若 tooltip 正在顯示, 跳轉後會留在頁面上, 需要刪除

router.beforeEach((to, from) => {
	removeTooltip();
	return true;
});

router.afterEach((to, from) => {
	removeTooltip(); // 雖然 remove 一次就夠, 但我測試一下能不能修復首頁的 ran neta tooltip 的 bug
});

export default router;
