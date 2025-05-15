---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# Prime - 質數
計算和驗證質數。

> [!WARNING]
> 目前沒有任何地方依賴 `Prime`。<br>
> `Prime` 使用試除法計算質數，以後如果用的到再優化。

## Import
```js
import { Prime } from "ran-math";
```

## Methods
| Method | Description |
| :- | :- |
| [`Prime.getNth`](#prime-getnth) | 取得第 n 個質數 ( 第 0 個質數為 2 ) |
| [`Prime.isPrime`](#prime-isprime) | 檢查 n 是不是質數 |

## `Prime.getNth`
取得第 n 個質數，第 0 個質數為 2。

```js
Prime.getNth(n: number): number
```

| Param | Type | Description |
| :- | :- | :- |
| `n` | `number` ( `int` ) | 第 n 個質數 |

範例：
```js
Prime.getNth(-5)    // NaN
Prime.getNth(0)     // 2
Prime.getNth(4)     // 11
Prime.getNth(11678) // 124339
```

## `Prime.isPrime`
檢查 n 是不是質數。

```js
Prime.isPrime(n: number): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `n` | `number` ( `int` ) | n |

範例：
```js
Prime.isPrime(-335)  // false
Prime.isPrime(1)     // false
Prime.isPrime(2)     // true
Prime.isPrime(67939) // true
```
