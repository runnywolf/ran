---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# Hop - 混合運算
將型態為 `number` 或 `Frac` 的參數自動轉型，並完成運算。

## Import
```js
import { Hop } from "ran-math";
```

## Methods
| Method | Description |
| :- | :- |
| [`Hop.uop`](#hop-uop) | 自訂義一元運算子 |
| [`Hop.bop`](#hop-bop) | 自訂義二元運算子 |
| [`Hop.isInt`](#hop-isint) | 是否為整數 |
| [`Hop.isPosInt`](#hop-isposint) | 是否為正整數 |
| [`Hop.isNegInt`](#hop-isnegint) | 是否為負整數 |
| [`Hop.isRational`](#hop-isrational) | 是否為有理數 |
| [`Hop.toStr`](#hop-tostr) | 轉字串 |
| [`Hop.toLatex`](#hop-tolatex) | 轉 LaTex 語法 |
| [`Hop.add`](#hop-add) | 加法 |
| [`Hop.sub`](#hop-sub) | 減法 |
| [`Hop.mul`](#hop-mul) | 乘法 |
| [`Hop.div`](#hop-div) | 除法 |
| [`Hop.pow`](#hop-pow) | 次方 |
| [`Hop.equal`](#hop-equal) | 等於 |
| [`Hop.lt`](#hop-lt) | 小於 |

## `Hop.uop`
自訂義一元運算子 ( unary operator )。

若運算元不為 `Frac` 或 `number`，回傳 `errReturn` ( 預設為 `NaN` )。

```js
Hop.uop(
	nf: number | Frac,
	fracOp: (frac: Frac) => any,
	floatOp: (n: number) => any,
	errReturn: any = NaN
): any
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 第一個運算元 |
| `fracOp` | `(frac: Frac) => any` | 分數運算子 |
| `floatOp` | `(n: number) => any` | 浮點數運算子 |
| `errReturn` | `any` | 若運算元不為 `Frac` 或 `number`，<br>回傳此值 ( 預設為 `NaN` ) |

範例：
```js
const ISZERO_FRAC_OP = frac => frac.isZero();
const ISZERO_FLOAT_OP = n => n === 0;
const is0 = (nf) => Hop.uop(nf, ISZERO_FRAC_OP, ISZERO_FLOAT_OP, false);
```

### 回傳值
1. 如果 `nf` 是 `Frac` 或 `int`，轉型為 `Frac`，回傳 `fracOp(nf)`。
2. 如果 `nf` 是 `float`，回傳 `floatOp(nf)`。
3. 如果 `nf` 不滿足 (1)(2)，回傳 `errReturn`。

| `nf` | `Frac` | `int` | `float` | `other` |
| :-: | :-: | :-: | :-: | :-: |
|  | `fracOp(nf)` | `fracOp(nf)` | `floatOp(nf)` | `errReturn` |

## `Hop.bop`
自訂義二元運算子 ( binary operator )。

若運算元不為 `Frac` 或 `number`，回傳 `errReturn` ( 預設為 `NaN` )。

```js
Hop.bop(
	nf1: number | Frac,
	nf2: number | Frac,
	fracOp: (frac: Frac) => any,
	floatOp: (n: number) => any,
	errReturn: any = NaN
): any
```

| Param | Type | Description |
| :- | :- | :- |
| `nf1` | `number \| Frac` | 第一個運算元 |
| `nf2` | `number \| Frac` | 第二個運算元 |
| `fracOp` | `(frac: Frac) => any` | 分數運算子 |
| `floatOp` | `(n: number) => any` | 浮點數運算子 |
| `errReturn` | `any` | 若運算元不為 `Frac` 或 `number`，<br>回傳此值 ( 預設為 `NaN` ) |

範例：
```js
const ADD_FRAC_OP = (frac1, frac2) => frac1.add(frac2);
const ADD_FLOAT_OP = (n1, n2) => n1 + n2;
const add = (nf1, nf2) => Hop.bop(nf1, nf2, ADD_FRAC_OP, ADD_FLOAT_OP);
```

### 回傳值
1. 如果 `nf1` `nf2` 都是 `Frac` 或 `int`，轉型為 `Frac`，回傳 `fracOp(nf1, nf2)`。
2. 如果 `nf1` `nf2` 不滿足 (1)，但都是 `Frac` 或 `number`，<br>轉型為 `float`，回傳 `floatOp(nf1, nf2)`。
3. 如果 `nf1` `nf2` 不滿足 (1)(2)，回傳 `errReturn`。

| `nf1` \ `nf2` | `Frac` | `int` | `float` | `other` |
| :-: | :-: | :-: | :-: | :-: |
| `Frac` | `fracOp(*, *)` | `fracOp(*, *)` | `floatOp(*, *)` | `errReturn` |
| `int` | `fracOp(*, *)` | `fracOp(*, *)` | `floatOp(*, *)` | `errReturn` |
| `float` | `floatOp(*, *)` | `floatOp(*, *)` | `floatOp(*, *)` | `errReturn` |
| `other` | `errReturn` | `errReturn` | `errReturn` | `errReturn` |

## `Hop.isInt`
是否為整數。

若 `nf` 不為 `Frac` 或 `number`，回傳 `false`。

```js
Hop.isInt(nf: number | Frac): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 要檢查的值 |

範例：
```js
Hop.isInt(F(1, 2)) // false
Hop.isInt(F(3))    // true
Hop.isInt(F(-5))   // true
Hop.isInt(4)       // true
Hop.isInt(3.5)     // false
Hop.isInt("2")     // false
```

## `Hop.isPosInt`
是否為正整數。

若 `nf` 不為 `Frac` 或 `number`，回傳 `false`。

```js
Hop.isPosInt(nf: number | Frac): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 要檢查的值 |

範例：
```js
Hop.isPosInt(F(1, 2)) // false
Hop.isPosInt(F(3))    // true
Hop.isPosInt(F(-5))   // false
Hop.isPosInt(4)       // true
Hop.isPosInt(3.5)     // false
Hop.isPosInt("2")     // false
```

## `Hop.isNegInt`
是否為負整數。

若 `nf` 不為 `Frac` 或 `number`，回傳 `false`。

```js
Hop.isNegInt(nf: number | Frac): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 要檢查的值 |

範例：
```js
Hop.isNegInt(F(1, 2)) // false
Hop.isNegInt(F(0))    // false
Hop.isNegInt(F(-5))   // true
Hop.isNegInt(-4)      // true
Hop.isNegInt(-3.5)    // false
Hop.isNegInt("-2")    // false
```

## `Hop.isRational`
是否為有理數。

若 `nf` 不為 `Frac` 或 `number`，回傳 `false`。

```js
Hop.isRational(nf: number | Frac): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 要檢查的值 |

範例：
```js
Hop.isRational(F(1, 2)) // true
Hop.isRational(F(0))    // true
Hop.isRational(F(-5))   // true
Hop.isRational(-4)      // true
Hop.isRational(-3.5)    // false
Hop.isRational("-2")    // false
```

## `Hop.toStr`
轉字串。

若 `nf` 不為 `Frac` 或 `number`，回傳 `"?"`。

```js
Hop.toStr(nf: number | Frac, p: number = 4): string
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 要轉字串的數 |
| `p` | `number` ( `int` ) | 如果字串是浮點數，四捨五入至小數點後 `p` 位 |

範例：
```js
Hop.toStr(F(-3, 7))    // "-3/7"
Hop.toStr(F(-5))       // "-5"
Hop.toStr(-4)          // "-4"
Hop.toStr(-3.57707)    // "-3.5771"
Hop.toStr(-3.57707, 2) // "-3.58"
Hop.toStr("45")        // "?"
```

## `Hop.toLatex`
轉 LaTex 語法。

若 `nf` 不為 `Frac` 或 `number`，回傳 `"?"`。

```js
Hop.toLatex(nf: number | Frac, p: number = 4): string
```

| Param | Type | Description |
| :- | :- | :- |
| `nf` | `number \| Frac` | 要轉 LaTex 語法的數 |
| `p` | `number` ( `int` ) | 如果字串是浮點數，四捨五入至小數點後 `p` 位 |

範例：
```js
Hop.toLatex(F(-3, 7))    // "\frac{-3}{7}"
Hop.toLatex(F(-5))       // "-5"
Hop.toLatex(-4)          // "-4"
Hop.toLatex(-3.57707)    // "-3.5771"
Hop.toLatex(-3.57707, 2) // "-3.58"
Hop.toLatex("45")        // "?"
```

## `Hop.add`
加法運算。

若 `nf1` `nf2` 不為 `Frac` 或 `number`，回傳 `NaN`。

```js
Hop.add(nf1: number | Frac, nf2: number | Frac): number | Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `nf1` | `number \| Frac` | 被加數 |
| `nf2` | `number \| Frac` | 加數 |

範例：
```js
Hop.add(F(-3, 4), F(-5, 8)) // -11/8
Hop.add(17, F(-5, 37))      // 624/37
Hop.add(-9, 10.0)           // 1/1
Hop.add(0.4, F(3, 5))       // 1
Hop.add(F(3, 7), 2.6)       // 3.0285714285714285
Hop.add(F(3, 7), "3")       // NaN
```

## `Hop.sub`
減法運算。

若 `nf1` `nf2` 不為 `Frac` 或 `number`，回傳 `NaN`。

```js
Hop.sub(nf1: number | Frac, nf2: number | Frac): number | Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `nf1` | `number \| Frac` | 被減數 |
| `nf2` | `number \| Frac` | 減數 |

範例：
```js
Hop.sub(F(-3, 4), F(-5, 8)) // -1/8
Hop.sub(17, F(-5, 37))      // 634/37
Hop.sub(-9, 10.0)           // -19/1
Hop.sub(0.4, F(3, 5))       // -0.2
Hop.sub(F(6, 7), 3.5)       // -2.642857142857143
Hop.sub(F(3, 7), "3")       // NaN
```

## `Hop.mul`
乘法運算。

若 `nf1` `nf2` 不為 `Frac` 或 `number`，回傳 `NaN`。

```js
Hop.mul(nf1: number | Frac, nf2: number | Frac): number | Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `nf1` | `number \| Frac` | 被乘數 |
| `nf2` | `number \| Frac` | 乘數 |

範例：
```js
Hop.mul(F(-3, 4), F(-5, 8)) // 15/32
Hop.mul(4, F(7, 10))        // 14/5
Hop.mul(-9, 10.0)           // -90/1
Hop.mul(2.5, F(2, 5))       // 1
Hop.mul(F(6, 7), 3.5)       // 3
Hop.mul(F(3, 7), "3")       // NaN
```

## `Hop.div`
除法運算。

若 `nf1` `nf2` 不為 `Frac` 或 `number`，回傳 `NaN`。

```js
Hop.div(nf1: number | Frac, nf2: number | Frac): number | Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `nf1` | `number \| Frac` | 被除數 |
| `nf2` | `number \| Frac` | 除數 |

範例：
```js
Hop.div(F(-3, 4), F(-5, 8)) // 6/5
Hop.div(F(3, 7), -3)        // -1/7
Hop.div(-9, 10.0)           // -9/10
Hop.div(2.5, F(5, 2))       // 1
Hop.div(F(6, 7), 3.5)       // 0.2448979591836734693
Hop.div(F(3, 7), "3")       // NaN
```

## `Hop.pow`
次方運算。

若 `nf1` `nf2` 不為 `Frac` 或 `number`，回傳 `NaN`。

```js
Hop.pow(nf1: number | Frac, nf2: number | Frac): number | Frac
```

| Param | Type | Description |
| :- | :- | :- |
| `nf1` | `number \| Frac` | 被除數 |
| `nf2` | `number \| Frac` | 除數 |

範例：
```js
Hop.pow(8, F(1, 3))            // 2/1
Hop.pow(2, 3)                  // 8/1
Hop.pow(F(-6, 5), -2)          // 25/36
Hop.pow(F(216, 125), F(-2, 3)) // 25/36
Hop.pow(1.6, F(2, 3))          // 1.3679807573413576
Hop.div(F(3, 7), "3")          // NaN
```

## `Hop.equal`
相等運算。

若 `nf1` `nf2` 不為 `Frac` 或 `number`，回傳 `false`。

```js
Hop.equal(nf1: number | Frac, nf2: number | Frac): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `nf1` | `number \| Frac` | 第 1 個數 |
| `nf2` | `number \| Frac` | 第 2 個數 |

範例：
```js
Hop.equal(F(-3, 4), F(-5, 8)) // false
Hop.equal(F(-3, 4), F(-3, 4)) // true
Hop.equal(4, F(4))            // true
Hop.equal(0.1+0.2, 0.3)       // false
Hop.equal(3, "3")             // false
```

## `Hop.lt`
相等運算。

若 `nf1` `nf2` 不為 `Frac` 或 `number`，回傳 `false`。

```js
Hop.lt(nf1: number | Frac, nf2: number | Frac): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `nf1` | `number \| Frac` | 第 1 個數 |
| `nf2` | `number \| Frac` | 第 2 個數 |

範例：
```js
Hop.lt(F(-3, 4), F(-5, 8)) // true
Hop.lt(F(-3, 4), F(-3, 4)) // false
Hop.lt(4, F(4))            // false
Hop.lt(0.3, 0.1+0.2)       // true
Hop.lt(3, "3")             // false
```
