---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# 字串處理
簡單的字串處理。

這裡的函數是被 `export function` 直接匯出的。

## Functions
| Function | Description |
| :- | :- |
| [`removePrefix`](#removeprefix) | 移除字串開頭的子字串 |
| [`removeSuffix`](#removesuffix) | 移除字串結尾的子字串 |

## `removePrefix`
若 `str` 的前綴剛好是 `prefix`，把前綴部分移除後回傳新字串。

```js
import { removePrefix } from "ran-math";
removePrefix(str: string, prefix: string): string
```

| Param | Type | Description |
| :- | :- | :- |
| `str` | `string` | 字串 |
| `prefix` | `string` | 想要移除的前綴 |

範例：
```js
removePrefix("abcde", "abc")   // "de"
removePrefix("abcde", "abd")   // "abcde"
removePrefix("abcde", "abcde") // ""
removePrefix("abcde", "")      // "abcde"
```

## `removeSuffix`
若 `str` 的後綴剛好是 `suffix`，把後綴部分移除後回傳新字串。

```js
import { removeSuffix } from "ran-math";
removeSuffix(str: string, suffix: string): string
```

| Param | Type | Description |
| :- | :- | :- |
| `str` | `string` | 字串 |
| `suffix` | `string` | 想要移除的後綴 |

範例：
```js
removeSuffix("abcde", "cde")   // "ab"
removeSuffix("abcde", "bde")   // "abcde"
removeSuffix("abcde", "abcde") // ""
removeSuffix("abcde", "")      // "abcde"
```
