import { defineConfig } from "vitepress";
import markdownItKatex from "markdown-it-katex"; // katex 語法支援

export default defineConfig({ // https://vitepress.dev/reference/site-config
	base: "/ran/docs/", // 說明文件的路徑位於 /ran/docs/
	cleanUrls: true, // 跳轉到某個頁面時, 不要在網址尾端加上 .html (有點醜)
	title: "Ran Docs", // 網頁分頁籤的標題
	description: "-",
	markdown: { // LaTex 語法支援
		config: (md) => { md.use(markdownItKatex); }
	},
	themeConfig: { // docs 的樣式, 範例 -> https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "首頁", link: "/" },
			{ text: "介紹", link: "/intro/exam-page" },
			{ text: "模擬室頁面", link: "/practice-page/recur-view" },
			{ text: "組件", link: "/components/content" },
			{ text: "函式庫", link: "/libs/toast" },
			{ text: "RanMath", link: "/ran-math/intro" },
		],
		sidebar: [
			{
				text: "Introduce - 介紹",
				collapsed: true,
				items: [
					{ text: "歷屆試題頁面", link: "/intro/exam-page" },
					{ text: "搜尋頁面", link: "/intro/search-page" },
					{ text: "模擬室頁面", link: "/intro/practice-page" },
					{ text: "其他頁面", link: "/intro/other-page" },
					{ text: "架構", link: "/intro/arch" },
				]
			},
			
			{
				text: "Components - 輕型組件",
				collapsed: true,
				items: [
					{ text: "Content - 內容區塊", link: "/components/content" },
					{ text: "RanLink - 超連結", link: "/components/ran-link" },
					{ text: "MakeProblem - 題目模板", link: "/components/make-problem" },
					{ text: "MultiOption - 多選題", link: "/components/multi-option" },
					{ text: "vl - 數學公式", link: "/components/vl" },
					{ text: "VueKatex - 語法渲染", link: "/components/vue-katex" },
				]
			},
			{
				text: "Answer Comp - 詳解產生器",
				collapsed: true,
				items: [
					{ text: "遞迴", link: "/practice-page/recur-view" },
					{ text: "RecurNonHomog", link: "/practice-page/recur-non-homog" },
					{ text: "RecurNonHomogExp", link: "/practice-page/recur-non-homog-exp" },
				]
			},
			{
				text: "Libraries - 函式庫",
				collapsed: true,
				items: [
					{ text: "Toast - 彈出式訊息", link: "/libs/toast" },
				]
			},
			{
				text: "RanMath.js",
				collapsed: true,
				items: [
					{ text: "介紹", link: "/ran-math/intro" },
					{ text: "簡單數學運算", link: "/ran-math/simple-method" },
					{ text: "Prime - 質數", link: "/ran-math/prime" },
					{ text: "Frac - 分數", link: "/ran-math/frac" },
					{ text: "Hop - 混合運算", link: "/ran-math/hop" },
					{ text: "EF - 擴張體", link: "/ran-math/ef" },
					{ text: "Matrix - 矩陣", link: "/ran-math/matrix" },
					{ text: "SolveQuad - 解二次方程式", link: "/ran-math/solve-quad" },
					{ text: "SolveCubic - 解三次方程式", link: "/ran-math/solve-cubic" },
					{ text: "字串處理", link: "/ran-math/string-util" },
					{ text: "MakeLatex - 生成 LaTex 語法", link: "/ran-math/make-latex" },
					{ text: "MultiTerm", link: "/ran-math/multi-term" },
				]
			},
			{
				text: "RanMath.js 實作細節",
				collapsed: true,
				items: [
					{ text: "SolveCubic", link: "/ran-math-details/solve-cubic" },
				]
			},
		],
		socialLinks: [
			{ icon: "github", link: "https://github.com/runnywolf/ran" } // github link
		]
	},
})
