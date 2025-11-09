# 🦊 Ran
![](https://img.shields.io/badge/Ran-v0.5.3-55f?style=flat)
![](https://img.shields.io/badge/RanMath.js-v2.0.3-55f?style=flat)
[![](https://img.shields.io/badge/Vue.js-345?style=flat&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![](https://img.shields.io/npm/v/tocas.svg?label=TocasUI)](https://github.com/teacat/tocas)
[![](https://img.shields.io/npm/v/katex.svg?label=KaTex)](https://github.com/KaTeX/KaTeX)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一款用於準備資工所數學的網頁 App。

開始使用 → [Ran](https://runnywolf.github.io/ran/#/)<br>
說明文件 → [Ran Docs](https://runnywolf.github.io/ran/docs/intro/exam-page)<br>
數學函式庫 → [RanMath](https://github.com/runnywolf/ran/blob/main/src/libs/ran-math.js)

> [!WARNING]
> 目前 safari 會有題號顯示異常的問題，因為瀏覽器不支援修改 `::marker`，我也沒辦法。

> [!NOTE]
> 使用電腦版網頁以獲得最佳體驗。

這個網頁是靜態的，因此你可以 `git clone` 到 `local`，建構完成後作為離線版使用。

## ✨ 功能
### 歷屆試題頁面
- 查詢特定學校和年份的資工所數學題本。
- 每一題都盡量提供詳細的解答。
- 測驗模式下會隱藏解答，並且提供計時功能。
- 提供題本的來源連結和詳細資訊。

### 搜尋頁面
- 搜尋標籤，並以此標籤篩選特定題目。

### 模擬室頁面 ( 詳解生成器 )
- 齊次 / 非齊次遞迴

### 更多
- 題目的統計資訊

## 📄 已收錄題本
- 台大 114~105 (108\~ 無詳解)
- 交大 114~105 (112\~ 無詳解)
- 成大 114~105 (無詳解)
- 中央 114~105 (無詳解)

## ❤️ 感謝
- [Vue3](https://vuejs.org/)+[Vite](https://vite.dev/) - 前端框架
- [Vue Router](https://router.vuejs.org/) - 路由管理
- [VitePress](https://vitepress.dev/) - docs
- [Vitest](https://vitest.dev/) - 測試
- [KaTex](https://katex.org/) - 渲染數學公式
- [Tocas UI](https://tocas-ui.com/5.0/zh-tw/index.html) - 好用又好看的 CSS 框架
