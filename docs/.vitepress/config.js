import { defineConfig } from "vitepress";
import markdownItKatex from "markdown-it-katex";

export default defineConfig({ // https://vitepress.dev/reference/site-config
	title: "Ran Docs",
	description: "-",
	markdown: {
		config: (md) => { md.use(markdownItKatex); }
	},
	themeConfig: { // https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "首頁", link: "/" },
			{ text: "docs", link: "/practice-page/recur" }
		],
		sidebar: [
			{
				text: "Exam Page (歷屆試題頁面)",
				items: [
					{ text: "如何新增題本", link: "/exam-page/create-exam" },
				]
			},
			{
				text: "Practice Page (模擬室頁面)",
				items: [
					{ text: "Recur.vue", link: "/practice-page/recur" },
					{ text: "RecurNonHomog.vue", link: "/practice-page/recur-non-homog" },
					{ text: "RecurNonHomogExp.vue", link: "/practice-page/recur-non-homog-exp" },
				]
			}
		],
		socialLinks: [
			{ icon: "github", link: "https://github.com/runnywolf/ran" } // github link
		]
	},
})
