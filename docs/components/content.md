---
outline: [2, 3] # 顯示 h2, h3
---

# Content - 內容區塊
![](./img/content-type.png)

> [!TIP]
> 組件 `Content` 為全域組件，不須 `import` 即可直接使用。

## 範例
```html
<Content colorStyle="red">
	紅色系的外框和底色，適合用在錯誤訊息。
</Content>

<Content borderColor="#f3f" bgColor="#fdf">
	自訂邊框和背景的顏色 ฅ^⦁⩊⦁^ฅ ੭
</Content>

<Content colorStyle="green" collapsed>
	綠色系的外框和底色，寬度會隨著內容大小改變。
</Content>

<Content>
	預設為灰色系的外框和底色。
</Content>
```

## 組件參數
| `props.` | Type | Default | Description |
| :- | :- | :- | :- |
| `borderColor` | `String` | `#aaa` | 邊框顏色，記得要加 `#` |
| `bgColor` | `String` | `#eee` | 背景顏色，記得要加 `#` |
| `colorStyle` | `String` | `null` | 顏色風格，若傳入的風格存在<br>會覆蓋掉 `borderColor` 和 `bgColor` |
| `collapsed` | `Boolean` | `false` | 若為 `true`，<br>內容區塊的 `div` 的大小會隨著內部元素改變 |

### `colorStyle`
目前有四種顏色風格 `red`、`green`、`blue`、`gray` 對應至上圖。

### `collapsed`
請參考上圖，上圖只有綠色區塊是 `true`，其他都為 `false`。
