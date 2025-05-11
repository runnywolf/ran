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

## Import
```js
import { Frac } from "ran-math";
import { F } from "ran-math"; // new Frac 的工廠函數
```

## Properties & Methods
建構子：[`Frac constructor`](#frac-constructor)

| Property | Type | Description |
| :- | :- | :- |
| [`.n`](#n) | `number` ( `int` ) | 分子 $n$ |
| [`.d`](#d) | `number` ( `int` ) | 分母 $d$ |

| Method | Description |
| :- | :- |
| [`Frac.isFrac`](#frac-isfrac) | 檢查輸入值是否為 `Frac` 的實例 |
| [`Frac.fromStr`](#frac-fromstr) | 將字串轉為分數型態 |
| [`Frac.sum`](#frac-sum) | 求數列的總和 |
| [`.copy`](#copy) | 回傳一個相同值的新實例 |
| [`.isZero`](#iszero) | 是否等於 0 |
| [`.isInt`](#isint) | 是否為整數 |

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
若字串不是分數，回傳 `0/1`。

```js
Frac.fromStr(str: string): Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `str` | `string` | 分數字串 |

範例：
```js
Frac.fromStr("-7")        // -7/1
Frac.fromStr("6/-9")      // -2/3
Frac.fromStr(" -12 / 7 ") // -12/7
```

## `Frac.sum`
求數列的總和。

```js
Frac.sum(arr: Array<any>): Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `arr` | `Array<any>` | 要求和的數列，只有 `Frac` 和 `int number` 會被加總，<br>其他的元素會被視為 0。 |

範例：
```js
Frac.sum([ F(1, 2), F(2, 3), F(3, 5) ]) // 53/30
Frac.sum([ 5, F(1, 2) ])                // 11/2
Frac.sum([ 5, F(1, 2), "7", 2.5 ])      // 11/2
```

## `Frac constructor`
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
new Frac();      // 0/1  ; 建議還是用 new Frac(0) 宣告分數 0
new Frac(17);    // 17/1
new Frac(6, -9); // -2/3
```

工廠函數：
```js
import { F } from "ran-math"

F();      // 0/1
F(17);    // 17/1
F(6, -9); // -2/3
```

## `.n`
分子 ( Numerator )。

```js
Frac.prototype.n: number
```

範例：
```js
const frac = F(6, -9); // 6/-9 = -2/3
frac.n // -2
```

> [!CAUTION]
> 屬性 `n` 為唯讀 ( read only )，修改 `n` 並不會讓 `Frac` 實例執行標準化。

## `.d`
分母 ( Denominator )。

```js
Frac.prototype.d: number
```

範例：
```js
const frac = F(6, -9); // 6/-9 = -2/3
frac.d // 3
```

> [!CAUTION]
> 屬性 `d` 為唯讀 ( read only )，修改 `d` 並不會讓 `Frac` 實例執行標準化。

## `.copy`
回傳一個相同值的新實例。

```js
Frac.prototype.copy(): Frac
```

範例：
```js
const frac = F(6, -9); // 6/-9 = -2/3
frac.copy()            // -2/3
```

## `.isZero`
分數是否等於 0。

```js
Frac.prototype.isZero(): boolean
```

範例：
```js
F(6, -9).isZero() // false
F(0, 5).isZero()  // true
F(15, 5).isZero() // false
```

## `.isInt`
是否為整數。

```js
Frac.prototype.isInt(): boolean
```

範例：
```js
F(6, -9).isInt() // false
F(0, 5).isInt()  // true
F(15, 5).isInt() // true
```
