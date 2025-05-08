import { defineConfig } from "vitepress";
import markdownItKatex from "markdown-it-katex"; // katex 語法支援

export default defineConfig({ // https://vitepress.dev/reference/site-config
	base: "/ran/docs/", // 文檔路徑位於 /ran/docs/
	cleanUrls: true, // 跳轉到某個頁面時, 不要在網址尾端加上 .html (有點醜)
	
	title: "Ran Docs", // 網頁分頁籤的標題
	description: "-",
	markdown: { // LaTex 語法支援
		config: (md) => { md.use(markdownItKatex); }
	},
	themeConfig: { // docs 的樣式, 範例 -> https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "首頁", link: "/" },
			{ text: "歷屆試題", link: "/exam-page/create-exam" },
			{ text: "模擬室頁面", link: "/practice-page/recur-non-homog" },
			{ text: "組件", link: "/components/content" },
		],
		sidebar: [
			{
				text: "Exam Page - 歷屆試題頁面",
				items: [
					{ text: "如何新增題本", link: "/exam-page/create-exam" },
				]
			},
			{
				text: "Practice Page - 模擬室頁面",
				items: [
					{ text: "RecurNonHomog", link: "/practice-page/recur-non-homog" },
					{ text: "RecurNonHomogExp", link: "/practice-page/recur-non-homog-exp" },
				]
			},
			{
				text: "Components - 組件",
				items: [
					{ text: "Content - 內容區塊", link: "/components/content" },
					{ text: "RanLink - 超連結", link: "/components/ran-link" },
					{ text: "MultiOption - 多選題", link: "/components/multi-option" },
					{ text: "vl - 數學公式", link: "/components/vl" },
				]
			},
			{
				text: "RanMath.js",
				items: [
					{ text: "介紹", link: "/ran-math/intro" },
					{ text: "簡單數學運算", link: "/ran-math/simple-method" },
				]
			},
		],
		socialLinks: [
			{ icon: "github", link: "https://github.com/runnywolf/ran" } // github link
		]
	},
})
