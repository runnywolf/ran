import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: () => import("@/views/HomeView.vue") },
	{ path: "/notes", name: "Notes", component: () => import("@/views/NotesView.vue") },
	{ path: "/exam", name: "Exam", component: () => import("@/views/ExamView.vue") },
	{ path: "/search", name: "Search", component: () => import("@/views/SearchView.vue") },
	{ path: "/practice", name: "Practice", component: () => import("@/views/PracticeView.vue") },
	{ path: "/credit", name: "Credit", component: () => import("@/views/CreditView.vue") },
	{ path: "/:pathMatch(.*)", name: "NotFound", redirect: "/", hidden: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
