---
outline: [2, 3] # 顯示 h2, h3
---

# Exam - 題本閱讀器
就是題本閱讀器。

App 頁面網址 ( 範例 )：[#/exam/ntu-114](https://runnywolf.github.io/ran/#/exam/ntu-114)<br>
Vue File：`src/views/exam-page/ExamView.vue`

## 功能
左側的資訊欄：
- 回到題本選單的連結
- 題本資訊，包含學校、年份、科目、來源連結
- 顯示更多資訊的按鈕，包含科目編號、系所
- [測驗模式](#測驗模式)
- 計時器 (僅在測驗模式啟用時)
- 下載題本 (未實作)

以及右側的 [ExamPaper - 考卷組件]()。

題本資訊的功能被分割成組件 `src/views/exam-page/exam-comp/ExamInfo.vue`，<br>
計時器被分割成 `src/views/exam-page/exam-comp/ExamTimer.vue`。

## 測驗模式

## exam config

