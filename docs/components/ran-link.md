---
outline: [2, 3] # 顯示 h2, h3
---

# RanLink - 超連結
Ran 自訂的超連結，快速又簡潔的跳轉至 Ran 內部或外部連結。

> [!TIP]
> 組件 `RanLink` 為全域組件，不須 `import` 即可直接使用。

## 範例
```html
<!-- 同 to="#/" -->
<RanLink>
	預設的超連結，會跳轉至 Ran 的首頁
</RanLink>
<br>

<!-- to 開頭帶有 "#" 會視為內部連結 -->
<RanLink to="#/exam/ntu-114/1">
	https://runnywolf.github.io/ran/#/exam/ntu-114/1
</RanLink>
<br>

<!-- to 開頭沒有 "#" 會視為外部連結，會強制開啟新分頁 -->
<RanLink to="https://www.youtube.com/watch?v=kmkMfFljd-0">
	外部連結
</RanLink>
<br>

<!-- tooltip -->
<RanLink to="#/exam/ntu-114/1" tooltip="台大 114 第 1 題">
	當滑鼠移動到超連結上時會顯示提示訊息
</RanLink>
<br>

<!-- newTab -->
<RanLink to="#/exam/ntu-114/1" newTab>
	另開新分頁
</RanLink>
<br>
```

## 組件參數
| `props.` | Type | Default | Description |
| :- | :- | :- | :- |
| `to` | `string` | `#/` | 要跳轉的網址，預設為 Ran 的首頁 |
| `tooltip` | `string` | `null` | 工具提示<br>當滑鼠移動到超連結上時會顯示提示訊息 |
| `newTab` | `Boolean` | `false` | 是否另開新分頁 ( 外部連結會強制另開新分頁 ) |
