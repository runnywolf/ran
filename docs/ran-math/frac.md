---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# Frac - 分數
用來處理有理數 $\mathbb{Q}$ 的運算。

$$\frac{n}{d}$$

$n$ 與 $d$ 滿足以下條件：
- $n \in \mathbb{Z}$
- $d \in {\mathbb{Z}}^+$
- $\gcd(n, d) = 1$
- $\frac{n}{d}$ 為某個有理數的唯一形式

| Property | Type | Description |
| :- | :- | :- |
| [`.n`](#n) | `number` ( `int` ) | 分子 $n$ |
| [`.d`](#d) | `number` ( `int` ) | 分母 $d$ |

| Function | Description |
| :- | :- |
| [`Frac.isFrac`](#frac-isfrac) | 檢查輸入值是否為 `Frac` 的實例，與 `... instanceof Frac` 等價 |
| [`Frac.fromStr`](#frac-fromstr) | 將字串轉為分數型態 |
| [`Frac.sum`](#) |  |
| [`new Frac`](#new-frac) | 建構子 |

## `.n`
分子 ( Numerator )。

```js
<Frac>.n: number
```

範例：
```js
const frac = new Frac(6, -9); // 6/-9 = -2/3
frac.n // -2
```

> [!CAUTION]
> 屬性 `n` 為唯讀 ( read only )，修改 `n` 並不會讓 `Frac` 實例執行標準化。

## `.d`
分母 ( Denominator )。

```js
<Frac>.d: number
```

範例：
```js
const frac = new Frac(6, -9); // 6/-9 = -2/3
frac.d // 3
```

> [!CAUTION]
> 屬性 `d` 為唯讀 ( read only )，修改 `d` 並不會讓 `Frac` 實例執行標準化。

## `Frac.isFrac`
檢查參數 `value` 是否為 `Frac` 的實例，與 `value instanceof Frac` 等價。

```js
Frac.isFrac(value: any): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `value` | `any` | 要檢查的值 |

範例：
```js
const frac = new Frac(6, -9);
Frac.isFrac(frac) // true
Frac.isFrac(2/3)  // false
```

## `Frac.fromStr`
將字串轉為分數型態。<br>
若字串不是分數，回傳 `Frac { n: 0, d: 1 }`。

```js
Frac.fromStr(str: string): Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `str` | `string` | 分數字串 |

範例：
```js
Frac.fromStr("-7")        // Frac { n: -7, d: 1 }
Frac.fromStr("6/-9")      // Frac { n: -2, d: 3 }
Frac.fromStr(" -12 / 7 ") // Frac { n: -12, d: 7 }
```

## `new Frac`
類別 `Frac` 的建構子。

```js
new Frac(n: number = 0, d: number = 1): Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `n` | `number` ( `int` ) | 分子 $n$ |
| `d` | `number` ( `int` ) | 分母 $d$，不可以傳入 `0` |

範例：
```js
new Frac();      // Frac { n: 0, d: 1 }  ; 建議還是用 new Frac(0) 宣告分數 0
new Frac(17);    // Frac { n: 17, d: 1 }
new Frac(6, -9); // Frac { n: -2, d: 3 } ; 6/-9 = -2/3
```
