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
| [`Frac.isFrac`](#frac-isfrac) | 檢查輸入值是否為 `Frac` 的實例，與 `frac instanceof Frac` 等價 |
| [`Frac.fromStr`](#) | <function 描述> |
| [`Frac.sum`](#) | <function 描述> |
| [`new Frac`](#) | <function 描述> |
| [`._std`](#) | <function 描述> |

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
Frac.isFrac(2)    // false
```
