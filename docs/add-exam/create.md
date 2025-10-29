# 建立題本
介紹一下我怎麼新增題本。

## 1. 解析題本

### 1-1. 取得原生題本
這些學校有公開考古題：
[台大](https://exam.lib.ntu.edu.tw/graduate/term/82)、[成大](https://exam.lib.ncku.edu.tw/master_subject.php?department_code=EC24)、[中央](https://rapid.lib.ncu.edu.tw/cexamn/EC02.html)。

這邊有更多考古：
[Google Drive (mayjaylee1928)](https://drive.google.com/drive/folders/1rda24AzJL3mCCaDyidWtxCjtSGd7n_89)

### 1-2. 解析文字
直接將 `.pdf` 丟給 LLM，如果無法解析的話，傳圖片也可以。

提示詞：
```
1. 將題本內容 (黑色細線框內的題目) 轉成純文字, 不需要解析圖片
2. 可能有中英夾雜, 不要自行翻譯
3. latex 語法請用 \(...\) 包裹行內 latex 語法
4. 置中語法請用 \[...\] 包裹
5. 把所有題目的文字整理合併後放在 code 區塊內
6. 不需要附上詳解
7. 每一題的文字區塊請用 \n\n 分隔
```

### 1-3. 解析圖片
大多數的圖片我都用 ps 自己 p 的，少部分叫 gpt 生成再自己修。

## 2. 建立題本檔案架構

### 2-1. 複製文字
將 [1-2. 解析文字](#_1-2-解析文字) 輸出的結果複製到 `src/exam-db-tool/raw-exam-text.txt`，請確保每一題之間都空一行。

就像這樣
```
離散數學　1～5 題，每題 5 分，共 25 分；單選題。

1. Which one of the following statements is unlikely a proposition?  
A. 貨賣得出去，人進得來，高雄發大財。  
B. 冷水加熱就變溫泉了。  
C. 垃圾不分藍綠。  
D. 如果我當選，明年元旦起市民免費參觀花博。  
E. 我們不接受一國兩制。

2. Which of the following statements about Fibonacci numbers is incorrect?  
A. The first two numbers of Fibonacci numbers are commonly defined as 0 and 1, but it could be defined differently.  
B. We can find a lower bound of Fibonacci numbers that grows linearly.  
C. We can find a lower bound of Fibonacci numbers that grows exponentially.  
D. We can find an upper bound of Fibonacci numbers that grows linearly.  
E. We can find an upper bound of Fibonacci numbers that grows exponentially.

3. Which is the answer of \(3^{302} \mod 11\)?  
A. 1　B. 3　C. 6　D. 9　E. None of the above.

...
```

有些區塊 (例如第一個區塊) 不是題目部分，例如題組說明或配分，也要分開。

### 2-2. 自動生成題本檔案
執行 `src/exam-db-tool/make-exam-v2.py`。

學校英文縮寫自己 google，或是去 `src/exam-db/config.json` 看看有沒有已經存在的學校。

題本年份請輸入民國年。

#### 數個區塊名稱
剛才的 `src/exam-db-tool/raw-exam-text.txt` 有很多被空白行分隔的區塊，

- 如果某個區塊是題目，那這個區塊的名稱 **\[必須\]** 輸入題號，<br>
題號 **\[必須\]** 為 `[A-Za-z0-9]` 和 `-` 符號組成。
- 如果某個區塊不是題目，那這個區塊的名稱 **\[必須\]** 以 `-` 開頭。<br>
我自己是題組說明取 `-group-1`，想不到要取什麼就 `-before-5` 這種也可以。

將這些區塊名稱照順序一一對應至 `raw-exam-text.txt` 的區塊，然後用空白分隔輸入到終端。<br>
就像這樣：
```
學校英文縮寫: ncu
題本年份: 108
數個區塊名稱 (用空白鍵分隔): -before-1 1 2 3
```

#### 加入多選題結構
這一步驟如果不會弄就不要亂輸，直接按 `enter` 跳過並不影響題本生成。

這一步只是輔助生成多選題的 `vue` 檔架構。

| 如果 | 就輸入 |
| :-: | :-: |
| 第 1 題是 A~E 的多選題 | `E1` |
| 第 2-a 題有 a~c 的子題目 | `c2-a` |
| 第 12 題有 1~5 的選項 | `112` |
| 所有題目都是 a~e 的多選題 | `e*` |

指令效果會由左到右覆蓋效果。

記得每個小指令都要用空白分隔，就像這樣：
```
學校英文縮寫: ncu
題本年份: 108
數個區塊名稱 (用空白鍵分隔): -before-1 1 2 3
有哪些題號需要幫忙加入多選題結構 (用空白鍵分隔): e* E2 E3
```

#### 最後
再繼續按 `enter` 會跳出
```
沒有回滾機制，按任意鍵開始建立題本資料夾。
```

繼續按 `enter`，如果出現
```
[ERROR] Number of section base names != Raw exam text split number
```
訊息，代表你的 "數個區塊名稱" 輸入的區塊名稱數跟你的 `raw-exam-text.txt` 區塊數目不一致，請檢察。

如果沒有任何 echo，代表題本檔案架構已建立完成。

## 3. 題本設定檔 (exam config)
如果你在上一步驟成功建立了，那應該會看到這個檔案架構，這裡以中央 108 做說明：
```
src/exam-db/ncu/108
├ contents
│ ├ 1-ans.vue
│ └ ...
├ sections
│ ├ 1.vue
│ └ ...
└ config.json
```

題本設定檔 `config.json`：
```json
{
	"subjectCode": "科目代號",
	"subjectName": "科目全名",
	"subjectShortName": "科目縮寫",
	"department": "系所名稱",
	"externalLink": "題本來源連結",
	"externalLinkTip": "題本來源連結的提示",
	"timeMinutes": 100,
	"isAnswerComplete": false,
	"sectionFileBaseNames": [
		"-before-1", "1", "2", "3", "4", "5", "-before-6", "6", "7", "8", "9", "10",
		"-before-11", "11", "12", "-before-13", "13", "14", "15", "-before-16", "16", "17", "18", "19", "20"
	],
	"problemConfigs": {
		"1": {
			"answerLatex": "",
			"tags": [ "?" ],
			"contentConfigs": [
				{ "type": "answer", "fileBaseName": "1-ans" }
			]
		},
		...
	}
}
```

| `key` | `type` | 說明 |
| :- | :- | :- |
| `subjectCode` | `string` | **\[非必填\]** 科目代號，同年每一份考卷的編號都不一樣 |
| `subjectName` | `string` | 題本的科目的完整名稱 |
| `subjectShortName` | `string` | 題本的科目縮寫 ( 建議 7 全型字內 ) |
| `department` | `string` | 這份題本是考哪一個科系 |
| `externalLink` | `string` | **\[非必填\]** 題本的來源連結 |
| `externalLinkTip` | `string` | **\[非必填\]** 題本的來源連結的說明 ( 游標 hover 時會顯示 ) |
| `timeMinutes` | `number` | 題本的作答時間 ( 分鐘 )，除了師大 90 min 以外，<br>其他好像都是 100 min。 |
| `isAnswerComplete` | `bool` | 如果這份題本的所有詳解是完整的，改成 `true` |
| `sectionFileBaseNames` | `array<string>` | 多個區塊名稱 |

### 3-1. 題目設定 (problem config)
`problemConfigs` 裡的 key (區塊名稱) 對應的值就是題目的設定，<br>
`-` 開頭的區塊名稱不會有 problem config，因為它們不是題目。

用來顯示題目或說明區塊的檔案都放在 `src/exam-db/<uni>/<year>/sections/<區塊名稱>.vue`。

題目設定：
```json
{
	"answerLatex": "",
	"tags": [ "?" ],
	"contentConfigs": [
		{ "type": "answer", "fileBaseName": "1-ans" },
		...
	]
},
```

| `key` | `type` | 說明 |
| :- | :- | :- |
| `hideProblemNo` | `bool` | 這個值不會由 `make-exam.py` 產生。<br>如果不想顯示題號，<br>可以添加 `"hideProblemNo": true`。 |
| `answerLatex` | `string \| array<string>` | 題目的答案，若為 `array<string>`<br>會變成由上而下多行顯示。 |
| `tags` | `array<string>` | 題目的多個標籤，請查看[標籤樹](./tag-tree.md) |
| `contentConfigs` | `array<dict>` | 參照 [3-2. 內容設定](#_3-2-內容設定-content-config) |

> [!TIP]
> 如果題目是選擇題，答案的 LaTex 語法用 `\\text{ABC}` 這個形式。

### 3-2. 內容設定 (content config)
內容設定的 vue 檔主要是用來顯示每一題的多個解答或說明文字用的。

下面提到的檔名，對應的檔案都必須放在 `src/exam-db/<uni>/<year>/contents` 資料夾下。

假設第二題的區塊編號為 `2`，那第二題的詳解的檔名 **\[建議\]** 命名為 `2-ans.vue`。

#### 詳解類型的內容區塊
生成一個藍色的摺疊式詳解。

添加 `{ "type": "answer", "id": "<檔名>", "suffix": "<後綴>" }` 至 `contentConfigs`。

`suffix` 不是必填，效果如下：( 沒有 `suffix` 就只會顯示「詳解」兩字 )
<img src="./img/answer-content.png" width="40%">

#### 預設類型的內容區塊
生成一個灰色的內容區塊。

添加 `{ "type": "default", "id": "<檔名>" }` 至 `contentConfigs`。

<img src="./img/default-content.png" width="60%">

## 4. 資料庫設定檔 (db config)
雖然題本檔案已經建構完成了，但需要將題本註冊到 `src/exam-db/config.json`。

開啟 `src/exam-db/config.json`，這個 `config` 用於設定學校的基本資訊和題本年份。

### 4-1：設定學校
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

### 4-2：設定年份
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

以上設定完，可以看到剛才建立的題本出現在題本選單。

## 5. 撰寫題本
你會發現此時排版是亂掉的，因為 `make-exam-v2.py` 沒有 LLM 那麼聰明，目前排版需要手動進行。

以下組件可以幫助排版：
- [MakeProblem - 題目模板](/components/make-problem)，**\[建議\]** 所有題目都用這個組件排版。
- [MultiOption - 多選題](/components/multi-option)
- [VueKatex - 渲染 katex 語法](/components/vue-katex)

本 app 使用的 UI 庫 [Tocas UI](https://tocas-ui.com/5.0/zh-tw/getting-started.html)，可以多加利用。

### 5-1. 數學公式
本 app 使用 KaTex，因為渲染速度比較快。

語法請參照：[KaTex - Support Functions](https://katex.org/docs/supported.html)

1. 調整矩陣列距：`\def\arraystretch{1.35}`
2. katex 增加高度：`\rule{0em}{2em}`

### 5-2. 注意事項
1. 與題目內容無關的配分，**\[必須\]** 以 `<span class="problem-score"> ... </span>` 包裹，因為需要控制配分的顯示。
2. 盡量避免 `<br>`，因為可能要做響應式
3. 記得加句點，開頭大寫。
4. 如果原題本的題目有錯，記得在題目 vue 檔最後加上 `<!-- [fix problem error] ... -->`
5. 如果單字有用 `-` 符號連接，**\[建議\]** 使用 Non-Breaking Hyphen 防止單字被換行切斷：`‑‑‑‑‑‑‑‑‑‑‑‑‑`
6. **\[建議\]** 使用英文 `‘單引號’` 和 `“雙引號”`。
