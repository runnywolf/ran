---
outline: [2, 3] # 顯示 h2, h3
---

# 如何新增題本
目前只能透過 `git push` 上傳題本至 Ran，以下會詳細說明如何新增一個新題本。

## Step 1：設定學校與年份
開啟 `src/exam-db/config.json`，這個 `config` 用於設定學校的基本資訊和題本年份。

### Step 1-1：設定學校
如果新題本的學校英文縮寫不存在於 `uniList` 內，以下是新增方法：
```json
{
	"uniList": [ "ntu", "<學校英文縮寫>" ], // ← 插入
	"uniConfigs": {
		"ntu": {
			"name": "國立臺灣大學",
			"shortName": "台大",
			"yearList": [ "114", "113", "112" ]
		},
		// 新增 ↓
		"<學校英文縮寫>": {
			"name": "<學校中文全名>",
			"shortName": "<學校中文縮寫>",
			"yearList": []
		}
		// 新增 ↑
	}
}
```
| 資訊 | 說明 | 範例 |
| :- | :- | :- |
| 學校英文縮寫 | 學校的英文名稱縮寫 | `ntu`、`nycu` |
| 學校中文全名 | 學校全名 | 國立臺灣大學 |
| 學校中文縮寫 | 建議為 2 ~ 3 個字的全形中文 | 台大、台科大 |

#### 實際效果
其中 `uniList` 的排列順序會影響題本選單頁面內，表格橫軸的學校順序：
![](./img/uni-table.png)

中文縮寫被 hover 時，會顯示學校中文全名。

### Step 1-2：設定年份
將新題本的民國年份 ( `string` ) 插入至 `uniConfigs.<學校英文縮寫>.yearList` 內，<br>
每個學校的 `yearList` 內的年份必須呈降序排列。

假設要新增交大某一年的題本：
```json
{
	"uniList": [ "ntu", "nycu" ],
	"uniConfigs": {
		"ntu": {
			"name": "國立臺灣大學",
			"shortName": "台大",
			"yearList": [ "114", "113", "112" ]
		},
		"nycu": {
			"name": "國立陽明交通大學",
			"shortName": "交大",
			"yearList": [ "114", "<新題本的年份>" ] // ← 插入
		}
	}
}
```

## Step 2：建立題本資料夾
執行 `src/exam-db-tool/exam_creator.py`，輸入學校英文縮寫和新題本的年份。

接著輸入多個[區塊檔名](#區塊檔名) (不包含附檔名)，會自動建立整個題本資料夾和需要的檔案。

> [!CAUTION]
> 題本建構程式並沒有回滾機制，請做好版本控制，若輸入錯誤可以回檔。

### 區塊檔名
假設想要在新題本 `ntu-110` 新增第 1 ~ 3 題，那麼就輸入 `1 2 3`，記得要用空白鍵隔開。<br>
此程式會自動生成用於顯示題目的 Vue 組件檔，位於<br>
`src/exam-db/ntu/110/sections/1.vue`、同層的 `2.vue` 和 `3.vue`。<br>
還會生成題目的解答的 Vue 組件檔，位於<br>
`src/exam-db/ntu/110/contents/1-ans.vue`、同層的 `2-ans.vue` 和 `3-ans.vue`。<br>

題本可能會有一些不屬於題目的區塊，例如題本的作答說明或配分之類的，<br>
則區塊檔名的開頭必須加上 `"-"`，例如 `-notice`，<br>
此程式會自動生成用於顯示說明區塊的 Vue 組件檔，位於<br>
`src/exam-db/ntu/110/sections/-notice.vue`。<br>

### 設定題本資訊
```json
{
	"subjectCode": "科目代號",
	"subjectName": "科目全名",
	"subjectShortName": "科目縮寫",
	"externalLink": "題本來源連結",
	"externalLinkTip": "題本來源連結的提示",
	"timeMinutes": 100,
	"isAnswerComplete": true,
	...
}

```
| Key | Type | 說明 |
| :- | :- | :- |
| `subjectCode` | `string` | 科目代號 ( 每一個科目在當年度都有唯一編號 ) |
| `subjectName` | `string` | 題本的科目的完整名稱 |
| `subjectShortName` | `string` | 題本的科目縮寫 ( 建議 7 全型字內 ) |
| `externalLink` | `string` | 題本的來源連結 |
| `externalLinkTip` | `string` | 題本的來源連結的說明 ( 游標 hover 時會顯示 ) |
| `timeMinutes` | `number` ( `int` ) | 題本的作答時間 ( 分鐘 )，除了師大 90 min 以外，<br>其他好像都是 100 min。 |
| `isAnswerComplete` | `boolean` | 如果這份題本的所有詳解是完整的，改成 `true` |

## Step 3：添加額外題目
Step2 只會建立基本的題本架構。

### Step 3-1：在題本設定檔內新增題目
首先將檔名添加至題本設定檔內的 `section` 裡，<br>
假設要新增 `3.vue` 這一題：
```json
{
	...
	"sectionFileBaseNames": [ "-notice", "1", "2", "3" ], // ← 插入 "3"
	"problemConfigs": { ... }
}
```

其中 `sectionFileBaseNames` ( 區塊排列資訊 )，會決定題目的順序。<br>
上述的例子：由上至下依序顯示 `-notice.vue`、`1.vue`、`2.vue`、`3.vue`。

> [!IMPORTANT]
> 若檔名開頭包含 `-` 字符，會被視為題本的說明區塊。( 例如題本的作答說明或配分之類的 )<br>
> 而這一個「區塊」因為不是題目，所以不存在答案或詳解，<br>
> 因此接下來的 `problem config` 可以忽略，請直接跳至 [Step 3-2](#step-3-2-編寫題目)。<br>
> <br>
> <img src="./img/notice.png" width="80%">

接著在 `problem` 內新增題目 `3.vue` 的設定資訊：
```json
{
	...
	"sectionFileBaseNames": [ "-notice", "1", "2", "3" ],
	"problemConfigs": {
		...
		"2": {
			"answerLatex": "\\text{A}",
			"contentConfigs": [ ... ]
		},
		// 新增 ↓
		"3": {
			"answerLatex": "<這一題的解答 (LaTex 語法)>",
			"contentConfigs": []
		}
		// 新增 ↑
	}
}
```

> [!TIP]
> 如果題目是選擇題，答案的 LaTex 語法建議用 `\\text{ABC}` 這個形式。

### Step 3-2：編寫題目
因為是使用 Vue 撰寫題目，雖然比較靈活，但沒有 markdown 簡潔。

介紹幾個全域 Vue 組件：
| 組件 | 說明 |
| :- | :- |
| [`MakeProblem`](../components/make-problem) | 題目模板 |
| [`vl`](../components/vl) | 顯示 LaTex 語法 |
| [`MultiOption`](../components/multi-option) | 多選題的折疊選項 |
| [`Content`](../components/content) | 顏色背景的 UI 區塊 |
| [`RanLink`](../components/ran-link) | 超連結 |

Ran 使用的 UI 框架：[Tocas UI](https://tocas-ui.com/5.0/zh-tw/)

> [!IMPORTANT]
> 為了要控制配分的顯示與否，題目的配分必須要用 `span.problem-score` 包起來。<br>
> 例：`<span class="problem-score">(10%)</span>`

## Step 4：新增題目的詳解或說明
詳解的製作方法與 [Step 3-2](#step-3-2-編寫題目) 相同。

### Step 4-1：建立檔案
詳解的檔名沒有限制。

將詳解的 Vue 檔建立在題本資料夾內的子目錄 `content/` 內。<br>
假設要新增第三題的詳解 `3-ans.vue`：
```diff
  nycu/112/
  ├── contents/
  │   ├── 1-ans.vue
  │   ├── 2-ans.vue
+ │   └── 3-ans.vue
  ├── sections/
  └── config.json
```

### Step 4-2：在題本設定檔內新增詳解
需要在 `problemConfigs.<題目檔名>.contentConfigs` 內，插入內容區塊的設定：
```json
{
	...
	"sectionFileBaseNames": [ "-notice", "1", "2", "3" ],
	"problemConfigs": {
		...
		"2": {
			"answerLatex": "\\text{A}",
			"contentConfigs": [ ... ]
		},
		"3": {
			"answerLatex": "<這一題的解答 (LaTex 語法)>",
			"contentConfigs": [
				// 插入 ↓
				{ "type": "answer", "id": "3-ans", "suffix": "(選項逆推)" }, // 詳解類型的內容區塊
				// 插入 ↑
				{ "type": "default", "id": "3-note" } // 預設類型的內容區塊
			]
		}
	}
}
```

#### 詳解類型的內容區塊
生成一個藍色的摺疊式詳解。

添加 `{ "type": "answer", "id": "<檔名>", "suffix": "<後綴>" }` 至 `contentConfigs`。

`suffix` 不是必填，效果如下：( 沒有 `suffix` 就只會顯示「詳解」兩字 )
<img src="./img/answer-content.png" width="40%">

#### 預設類型的內容區塊
生成一個灰色的內容區塊。

添加 `{ "type": "default", "id": "<檔名>" }` 至 `contentConfigs`。

<img src="./img/default-content.png" width="60%">

## 存放圖片
如果題目的 Vue 檔需要存放內部圖片，<br>
建議在 `sections` 和 `contents` 內建立資料夾 `img`，然後將圖片放在裡面：( 這不是硬性規定 )
```diff
  nycu/112/
  ├── contents/
+ │   └── img/
  ├── sections/
+ │   └── img/
+ │       └── xxx.webp
  └── config.json
```
