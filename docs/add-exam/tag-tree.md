# Tag tree - 標簽樹
`ran v0.5` 引入了標籤系統。

你可以在 `src/exam-db/tag-tree.json` 找到標籤樹。

## 如何獲得一個標籤
這是標籤樹的一部分：
```json
{
	"la": {
		...
	},
	"dm": {
		"en": "Discrete mathematics", "zhtw": "離散數學",
		"children": {
			"c": {
				"en": "Combinatorics", "zhtw": "組合數學",
				"children": {
					"pc": { "en": "Permutation & Combination", "zhtw": "排列組合" },
					"r": { "en": "Recursion", "zhtw": "遞迴" },
					"rr": { "en": "Recurrence relation", "zhtw": "遞迴關係式" },
					"gf": { "en": "Generating function", "zhtw": "生成函數" },
					...
				}
			},
			...
			"nt": { "en": "Number theory", "zhtw": "數論" },
			"ba": { "en": "Basic arithmetic", "zhtw": "基本算術" },
			"as": { "en": "Algebraic structures", "zhtw": "代數結構" },
			"fl": { "en": "Formal logic", "zhtw": "形式邏輯" },
			"fsm": { "en": "Finite-state machine", "zhtw": "有限狀態機" }
		}
	},
	...
}
```

- 如果想要加入標籤 "離散數學"，<br>那就將字串 `"dm"` 添加到 problem config 的 `"tag": [ ... ]` 裡。
- 如果想要加入標籤 "代數結構"，添加字串 `"dm-as"`。
- 如果想要加入標籤 "遞迴關係式"，添加字串 `"dm-c-rr"`。
