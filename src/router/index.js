import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
	{ path: "/", name: "Home", component: () => import("@/views/HomeView.vue") },
	{ path: "/notes", name: "Notes", component: () => import("@/views/NotesView.vue") },
	{ path: "/exam", name: "ExamMenu", component: () => import("@/views/exam-page/ExamMenuView.vue") },
	{ path: "/exam/:id", name: "Exam", component: () => import("@/views/exam-page/ExamView.vue") },
	{ path: "/exam/:id/:prob", name: "Problem", component: () => import("@/views/exam-page/ProblemView.vue") },
	{ path: "/search", name: "Search", component: () => import("@/views/SearchView.vue") },
	{
		path: "/practice",
		name: "Practice",
		component: () => import("@/views/PracticeView.vue"),
		redirect: "/practice/recurrence",
		children: [
			{ path: "recurrence", name: "PracticeRecur", component: () => import("@/views/practice-page/RecurView.vue") },
			{ path: "gram-schmidt", name: "PracticeGs", component: () => import("@/views/practice-page/GsView.vue") },
			{ path: "inconsistent", name: "PracticeInconsis", component: () => import("@/views/practice-page/InconsisView.vue") },
			{ path: "lu", name: "PracticeLu", component: () => import("@/views/practice-page/LuView.vue") },
			{ path: "qr", name: "PracticeQr", component: () => import("@/views/practice-page/QrView.vue") },
			{ path: "svd", name: "PracticeSvd", component: () => import("@/views/practice-page/SvdView.vue") },
			{ path: "diagonal", name: "PracticeDiag", component: () => import("@/views/practice-page/DiagView.vue") },
			{ path: ":pathMatch(.*)", redirect: "/practice" },
		]
	},
	{ path: "/other", name: "Other", component: () => import("@/views/OtherView.vue") },
	{ path: "/test", name: "Test", component: () => import("@/tests/TestView.vue") /* , redirect: "/" */ }, // 測試用
	{ path: "/:pathMatch(.*)", redirect: "/" },
];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
