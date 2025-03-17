import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: () => import("@/views/HomeView.vue") },
	{ path: "/notes", name: "Notes", component: () => import("@/views/NotesView.vue") },
	{ path: "/exam", name: "ExamMenu", component: () => import("@/views/exam-page/ExamMenuView.vue") },
	{ path: "/exam/:id", name: "Exam", component: () => import("@/views/exam-page/ExamView.vue") },
	{ path: "/exam/:id/:prob", name: "Problem", component: () => import("@/views/exam-page/ProblemView.vue") },
	{ path: "/search", name: "Search", component: () => import("@/views/SearchView.vue") },
	{ path: "/practice", name: "Practice", component: () => import("@/views/PracticeView.vue") },
	{ path: "/other", name: "Other", component: () => import("@/views/OtherView.vue") },
	{ path: "/:pathMatch(.*)", name: "NotFound", redirect: "/", hidden: true }
];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
