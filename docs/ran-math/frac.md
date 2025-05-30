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
| [`.toStr`](#tostr) | 轉字串 |
| [`.toLatex`](#tolatex) | 轉 LaTex 語法 |
| [`.toFloat`](#tofloat) | 轉為浮點數 |
| [`.add`](#add) | 加法 |
| [`.sub`](#sub) | 減法 |
| [`.mul`](#mul) | 乘法 |
| [`.div`](#div) | 除法 |
| [`.pow`](#pow) | 次方 |
| [`.equal`](#equal) | 等於 |
| [`.lt`](#lt) | 小於 |

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
Frac.sum(...arr: Array<number|Frac|Array>): Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `...arr` | `Array<number\|Frac\|Array>` | 要求和的數列，只有 `Frac` 和 `int number` 會被加總，<br>其他的元素會被視為 0。 |

範例：
```js
Frac.sum([ F(1, 2), F(2, 3), F(3, 5) ])        // 53/30
Frac.sum(F(1, 2), F(2, 3), F(3, 5))            // 53/30 (不一定要傳入 Array)
Frac.sum(F(1, 2), [ [ F(2, 3), 1 ], F(3, 5) ]) // 83/30 (巢狀加總)
Frac.sum(5, F(1, 2))                           // 11/2 (可以傳入 int number)
Frac.sum([ 5, F(1, 2), "7", 2.5 ])             // 11/2 ; error
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

## `.toStr`
將分數轉為字串。

```js
Frac.prototype.toStr(): string
```

範例：
```js
F(2).toStr()     // "2"
F(-9, 3).toStr() // "-3"
F(2, 3).toStr()  // "2/3"
F(-7, 3).toStr() // "-7/3"
```

## `.toLatex`
將分數轉為 LaTex 語法。

```js
Frac.prototype.toLatex(): string
```

範例：
```js
F(2).toLatex()     // "2"
F(-9, 3).toLatex() // "-3"
F(2, 3).toLatex()  // "\frac{2}{3}"
F(-7, 3).toLatex() // "\frac{-7}{3}"
```

## `.toFloat`
將分數轉為浮點數。

```js
Frac.prototype.toFloat(): number
```

範例：
```js
F(2).toFloat()     // 2
F(-9, 3).toFloat() // -3
F(2, 3).toFloat()  // 0.6666666666666666
F(3, 5).toFloat()  // 0.6
```

## `.add`
加上另一個 `Frac` 或 `int number`，回傳新實例。

```js
Frac.prototype.add(nf: number | Frac): Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 加數 |

範例：
```js
F(1, 3).add(F(1, 2)) // 5/6
F(7, 4).add(F(3, 5)) // 47/20
F(-3, 2).add(2)      // 1/2
F(-3, 2).add(2.5)    // error, return -3/2
```

## `.sub`
減去另一個 `Frac` 或 `int number`，回傳新實例。

```js
Frac.prototype.sub(nf: number | Frac): Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 減數 |

範例：
```js
F(1, 3).sub(F(1, 2)) // -1/6
F(7, 4).sub(F(3, 5)) // 23/20
F(-3, 2).sub(2)      // -7/2
F(-3, 2).sub(2.5)    // error, return -3/2
```

## `.mul`
乘上另一個 `Frac` 或 `int number`，回傳新實例。

```js
Frac.prototype.mul(nf: number | Frac): Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 乘數 |

範例：
```js
F(1, 3).mul(F(1, 2)) // 1/6
F(7, 4).mul(F(3, 5)) // 21/20
F(-3, 2).mul(2)      // -3/1
F(-3, 2).mul(2.5)    // error, return -3/2
```

## `.div`
除以另一個 `Frac` 或 `int number`，回傳新實例。

```js
Frac.prototype.div(nf: number | Frac): Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 除數 |

範例：
```js
F(1, 3).div(F(1, 2)) // 2/3
F(7, 4).div(F(3, 5)) // 35/12
F(-3, 2).div(2)      // -3/4
F(-3, 2).div(2.5)    // error, return -3/2
F(-3, 2).div(F(0))   // error, return -3/2
```

## `.pow`
次方運算，回傳新實例。

> [!WARNING]
> - `this` 不可以是 0，$0^{-n}$ 沒有定義。
> - 分數次方的結果若不是有理數，會回傳 `number`。
> - ${(\frac{-8}{27})}^{1/3}$，會回傳 `NaN`，因為 `**` 運算子無法處理 `-8 ** (1/3)`。

```js
Frac.prototype.pow(nf: Frac): Frac | number
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `Frac` | 次方 |

範例：
```js
F(2, 3).pow(0)          // 1/1
F(0).pow(0)             // 1/1
F(0).pow(1)             // 0/1
F(-6, 5).pow(-2)        // 25/36
F(36, 25).pow(F(1, 2))  // 6/5
F(36, 25).pow(F(-1, 2)) // 5/6
F(2).pow(F(1, 2))       // 1.4142135623730951
F(-8).pow(F(1, 3))      // NaN -> 目前沒實作
```

## `.equal`
是否等於另一個 `Frac` 或 `int number`。

```js
Frac.prototype.equal(nf: number | Frac): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 要比較的另一個數 |

範例：
```js
F(1, 3).equal(F(1, 2)) // false
F(7, 4).equal(F(7, 4)) // true
F(4, 2).equal(2)       // true
F(5, 2).equal(2.5)     // error, return false
```

## `.lt`
是否小於另一個 `Frac` 或 `int number`。

```js
Frac.prototype.lt(nf: number | Frac): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 要比較的另一個數 |

範例：
```js
F(1, 3).lt(F(1, 2)) // true
F(7, 4).lt(F(7, 4)) // false
F(3, 2).lt(2)       // true
F(5, 2).lt(3.5)     // error, return false
```
