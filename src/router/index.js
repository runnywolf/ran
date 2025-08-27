import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{ path: "/", component: () => import("@/views/HomeView.vue") },
	{ path: "/notes", component: () => import("@/views/NotesView.vue") },
	{ path: "/exam", component: () => import("@/views/exam-page/ExamMenuView.vue") },
	{ path: "/exam/:id", component: () => import("@/views/exam-page/ExamView.vue") }, // 題本編號 :id 的格式範例: "ntu-110"
	{ path: "/exam/:id/:prob", component: () => import("@/views/exam-page/ProblemView.vue") }, // 題號 :prob
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
		redirect: "/other/stat",
		children: [
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

router.beforeEach((to, from, next) => { // 當路由切換前
	document.querySelectorAll(".ts-tooltip").forEach(el => el.remove()); // 若 tooltip 正在顯示, 跳轉後會留在頁面上, 需要刪除
  next(); // 繼續跳轉到其他頁面
})

export default router;
