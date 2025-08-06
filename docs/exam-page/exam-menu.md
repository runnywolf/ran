---
outline: [2, 3] # 顯示 h2, h3
---

# ExamMenu - 題本清單
用來展示收錄的所有題本。

App 頁面網址：[#/exam](https://runnywolf.github.io/ran/#/exam)<br>
Vue File：`src/views/exam-page/ExamMenuView.vue`

## 功能
- 縱軸為年份降序排列、橫軸為學校的表格。<br>
	表格元素包含學校和年份，可以很快速的找到想要的題本，<br>
	點擊後進到 [Exam - 題本閱讀器](./exam)。
- 滑鼠移動到學校縮寫上時，會顯示學校全名。

## main config
檔案：`src/exam-db/config.json`

用於紀錄每個學校的資訊，`ExamMenu` 會讀取這份 `json`。

結構：
```json
{
	"uniList": [ "ntu", "nycu", "ncku", "[學校英文縮寫]" ],
	"uniConfigs": {
		"ntu": {
			"name": "國立臺灣大學",
			"shortName": "台大",
			"yearList": [ "114", "113", "112", "111", "110" ]
		},
		"nycu": {
			"name": "國立陽明交通大學",
			"shortName": "交大",
			"yearList": [ "114", "113", "112", "111", "110" ]
		},
		"ncku": {
			"name": "國立成功大學",
			"shortName": "成大",
			"yearList": [ "114", "113", "112", "111", "110" ]
		},
		"[學校英文縮寫]": {
			"name": "[學校中文全名]",
			"shortName": "[學校中文縮寫]",
			"yearList": [ ... ]
		}
	}
}
```

### `uniList`
型態為 `Array<string>`，會決定橫軸學校的排列順序。

### `uni config`
指的是 `uniConfig.[學校英文縮寫]` 的值，結構如下。
```json
{
	"name": "國立成功大學",
	"shortName": "成大",
	"yearList": [ "114", "113", "112", "111", "110" ]
}
```
| `Key` | `Type` | `Description` |
| :- | :- | :- |
| `name` | `string` | 學校中文全名 |
| `shortName` | `string` | 學校中文縮寫 |
| `yearList` | `Array<string>` | 這個學校哪些年有題本，必須為降序排列 |
