<!-- Non-Breaking Hyphen -->
‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑

<!-- 英文引號 -->
 ‘單引號’ 和 “雙引號”

<!-- 控制配分顯示與否 -->
<span class="problem-score"></span>

<!-- 普通中文字 -->
<span style="font-size: 16px;">普通中文字</span>

<!-- tocas ui -->
https://tocas-ui.com/5.0/zh-tw/getting-started.html

<!-- katex supported functions -->
https://katex.org/docs/supported.html

<!-- katex 調整矩陣列距 --> \def\arraystretch{1.35}
<!-- katex 增加高度 --> \rule{0em}{2em}

<!-- [fix problem error] 題本錯誤修正, 需要加上這個 -->

<!-- 多選題或數個子題, extraSlotNames -->
<template>
	<MakeProblem scoreText="" listEndLabel="e" :listItemScoreTexts="['', '', '']">
		<template #problem></template>
		<template #a></template>
		<template #b></template>
		<template #c></template>
		<template #d></template>
		<template #e></template>
	</MakeProblem>
</template>

<template>
	<MakeProblem
		scoreText="本題的配分, 會自動加上 span.problem-score 用於控制配分顯示與否"
		:extraSlotNames="['extra-slot']"
		listEndLabel="多選題或多個子題, 如果編號是 (a), (b), (c); 那這個參數就輸入 c; 支援英文大小寫"
		:listItemScoreTexts="['選項 (a) 的配分', '', '']"
		useSpanList
		spanListTopLabel
	>
		<template #problem>題目</template>
		<template #extra-slot>題目之下, 額外的區塊; 想要多加幾個就在 extraSlotNames arr 新增 vue slot name</template>
		<template #a>第 (a) 個選項或子題的內容</template>
		<template #b>第 (b) 個選項或子題的內容</template>
		<template #c>第 (c) 個選項或子題的內容</template>
	</MakeProblem>
</template>
<!-- useSpanList 如果被添加, 答案不會用有序列表呈現, 而是一般的 span 區塊; 很適合用於這種情況: "(a) 0 (b) 1 (c) 2" -->
<!-- spanListTopLabel: span list 模式下, 將選項編號靠上對齊 (推薦用在圖片) -->
