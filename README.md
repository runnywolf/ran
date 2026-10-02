# 🦊 Ran
![](https://img.shields.io/badge/Ran-v0.6.4-55f?style=flat)
![](https://img.shields.io/badge/RanMath.js-v2.0.3-55f?style=flat)
[![](https://img.shields.io/badge/Vue.js-345?style=flat&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![](https://img.shields.io/npm/v/tocas.svg?label=TocasUI)](https://github.com/teacat/tocas)
[![](https://img.shields.io/npm/v/katex.svg?label=KaTex)](https://github.com/KaTeX/KaTeX)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一款用於準備資工所數學的網頁 App。

開始使用 → [Ran](https://runnywolf.github.io/ran/#/)  
說明文件 (舊版, 待更新) → [Ran Docs](https://runnywolf.github.io/ran/docs/intro/exam-page)

> [!WARNING]
> 目前 safari 會有題號顯示異常的問題，因為瀏覽器不支援修改 `::marker`，我也沒辦法。  
> 建議 safari 使用者安裝 chromium/firefox 以獲得最佳體驗。( bug 一堆不想修 )

> [!NOTE]
> 因為懶得弄 RWD，為獲得最佳體驗，請使用電腦版網頁或行動版網頁的 "電腦版模式"。

## ✨ 功能
### 歷屆試題頁面
- 查詢特定學校和年份的資工所數學題本。
- 提供題本的來源連結和詳細資訊。
- 測驗模式下會隱藏解答，並且提供計時功能。
- 修正錯誤並重新排版，閱讀更舒適。
- 每一題都盡量提供詳細的解答。

### 搜尋頁面
- 搜尋題目的文字片段
- 篩選特定標籤的題目
- 篩選特定學校和年份的題目

### 模擬室頁面 ( 詳解生成器 )
- 齊次 / 非齊次遞迴
- (目前 `ran-math-v3.ts` 已完成, `v0.7` 會製作更多生成器)

### 更多功能
- 收藏題目
- 題目的統計資訊

## 📄 已收錄題本
- 台大 115\~105 (114\~109 有詳解)
- 交大 115\~105 (114, 113 有詳解)
- 成大 115\~105 (114, 113 有詳解)
- 中央 115\~105 (無詳解)
- 中山 115\~105 (無詳解)
- 中興甲組 115\~111 (無詳解)

## 🤖 離線使用與 LLM 輔助
這個網頁是靜態的，因此你可以 `clone` 到你的電腦，建構完成後作為離線版使用。

目前我撰寫了約 1xx 題的詳解，但我覺得增加新題目比起提高詳解題數還要重要，畢竟現在 LLM 解題已經非常厲害了。  
推薦可以 clone 然後搭配 LLM 直接讀取題目檔並給出解答，或者是直接截圖。  
但需要請 LLM 閱讀 `libs/katex-macro.ts`，這是 Ran 自訂的 katex 語法。

## ❤️ 感謝
- [Vue3](https://vuejs.org/)+[Vite](https://vite.dev/) - 前端框架
- [Vue Router](https://router.vuejs.org/) - 路由管理
- [VitePress](https://vitepress.dev/) - docs
- [Vitest](https://vitest.dev/) - 測試
- [KaTex](https://katex.org/) - 渲染數學公式
- [Tocas UI](https://tocas-ui.com/5.0/zh-tw/index.html) - 好用又好看的 CSS 框架
