---
outline: [2, 3] # 顯示 h2, h3
---

# MakeProblem - 題目模板
用於生成題目 vue 檔，維持樣式的一致性。

不一定要用這個組件編寫題目。

> [!TIP]
> 組件 `MakeProblem` 為全域組件，不須 `import` 即可直接使用。

> [!NOTE]
> 本組件會自動生成 `span.problem-score` 包裹配分，<br>
> 符合 [新增題本 Step 4-3](../exam-page/create-exam#step-4-3-編寫題目) 的規範。

## 範例 1
```html
<MakeProblem
	scoreText="(5%)"
	:extraSlotNames="[ 'prob-2', 'prob-3' ]"
	listEndLabel="E"
	useSpanList
>
	<template #problem>
		題目.........<br>換行................
	</template>
	<template #prob-2>
		第 2 個區塊，與預設題目區塊有一點間距。
	</template>
	<template #prob-3>
		第 3 個區塊。
	</template>
	<template #A>0</template>
	<template #B>1</template>
	<template #C>2</template>
	<template #D>3</template>
	<template #E>4</template>
</MakeProblem>
```
<img src="./img/make-problem-example.png" width="50%">

## 範例 2
```html
<MakeProblem scoreText="(5%)" listEndLabel="C">
	<template #problem>
		題目.........<br>換行................
	</template>
	<template #A>0<br>換行<br>換行</template>
	<template #B>1<br>換行<br>換行</template>
	<template #C>2</template>
</MakeProblem>
```
<img src="./img/make-problem-example-2.png" width="20%">

## 組件參數
| `props.` | Type | Default | Description |
| :- | :- | :- | :- |
| `scoreText` | `String` | `null` | 配分字串 |
| `extraSlotNames` | `Array` | `[]` | 額外的題目區塊名<br>( 會顯示在預設題目區塊下，選項之上 ) |
| `listEndLabel` | `String` | `null` | 有序列表的最後一個編號，<br>主要用於子題或多選題的選項。<br>接受 `int number`、`[a-z]`、`[A-Z]` 這三種編號的列表。 |
| `listItemScoreTexts` | `Array` | `[]` | 列表的配分字串 ( 不適用於 span list ) | 
| `useSpanList` | `Boolean` | `false` | 如果為 `false`，使用 ul 來排版有序清單<br>如果為 `true`，使用 grid 排版<br>( 例如某些選項長度很短的選擇題 ) |
