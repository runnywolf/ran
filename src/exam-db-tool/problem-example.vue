<!-- Non-Breaking Hyphen -->
‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑‑

<!-- 英文引號 -->
 ‘單引號’ 和 “雙引號”

<!-- 控制配分顯示與否 -->
<span class="problem-score"></span>

<!-- tocas ui -->
https://tocas-ui.com/5.0/zh-tw/getting-started.html

<!-- katex supported functions -->
https://katex.org/docs/supported.html

<!-- 多選題或數個子題 -->
<template>
	<MakeProblem scoreText="" listEndLabel="c" :listItemScoreTexts="['', '', '']"> <!-- extraProblemSlotNames -->
		<template #problem></template>
		<template #a></template>
		<template #b></template>
		<template #c></template>
		<template #d></template>
		<template #e></template>
	</MakeProblem>
</template>

<!-- katex 調整矩陣列距 --> \def\arraystretch{1.35}
<!-- katex 增加高度 --> \rule{0em}{2em}
