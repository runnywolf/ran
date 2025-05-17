---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# 簡單數學運算
這裡的函數是被 `export function` 直接匯出的。

## Functions
| Function | Description |
| :- | :- |
| [`isNum`](#isint) | 檢查 $n$ 是否為數字，與 `typeof n === "number"` 等價 |
| [`isInt`](#isint) | 檢查 $n$ 是否為整數，與 `Number.isInteger(n)` 等價 |
| [`gcd`](#gcd) | 回傳兩數的最大公因數 ( Greatest Common Divisor ) |
| [`lcm`](#lcm) | 回傳兩數的最小公倍數 ( Least Common Multiple ) |
| [`getFactors`](#getfactors) | 回傳 $n$ 的所有正因數 ( 升序排列 ) |
| [`getSquareFactor`](#getsquarefactor) | 若 $k^2$ 為 $n$ 的最大平方因數，回傳 $k$ |
| [`getRandomInt`](#getrandomint) | 回傳範圍 `[min, max]` 內的隨機整數 |
| [`sum`](#sum) | 總和 |

## `isNum`
檢查參數 `n` 是否為數字，與 `typeof n === "number"` 等價。

```js
isNum(n: any): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `n` | `any` | 要檢查的值 |

範例：
```js
isNum(123)           // true
isNum(-456.78)       // true
isNum(NaN)           // true
isNum("123")         // false
isNum(new Number(5)) // false
```

## `isInt`
檢查參數 `n` 是否為整數，與 `Number.isInteger(n)` 等價。

```js
isInt(n: any): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `n` | `any` | 要檢查的值 |

範例：
```js
isInt(123)           // true
isInt(123.0)         // true
isInt(-456.78)       // false
isInt(NaN)           // false
isInt("123")         // false
isInt(new Number(5)) // false
```

## `gcd`
回傳兩數的最大公因數 ( Greatest Common Divisor )：
$$\gcd(a, b)$$

```js
gcd(a: number, b: number): number
```

| Param | Type | Description |
| :- | :- | :- |
| `a` | `number` ( `int` ) | $a$ |
| `b` | `number` ( `int` ) | $b$ |

若 `a` 或 `b` 為負數，會自動取絕對值。

範例：
```js
gcd(0, 0)    // 0
gcd(0, 1)    // 1
gcd(-60, 36) // 12
```

## `lcm`
回傳兩數的最小公倍數 ( Least Common Multiple )：
$$\text{lcm}(a, b)$$

```js
lcm(a: number, b: number): number
```

| Param | Type | Description |
| :- | :- | :- |
| `a` | `number` ( `int` ) | $a$ |
| `b` | `number` ( `int` ) | $b$ |

若 `a` 或 `b` 為負數，會自動取絕對值。

範例：
```js
lcm(0, 0)           // 0
lcm(0, 5)           // 0
lcm(-21, 6)         // 42
lcm(123456, 789012) // 8117355456
```

## `getFactors`
回傳 $n$ 的所有正因數 ( 升序排列 )。

```js
getFactors(n: number): Array<number>
```

| Param | Type | Description |
| :- | :- | :- |
| `n` | `number` ( `int` ) | $n$ |

若 `n` 為負數，會自動取絕對值。

範例：
```js
getFactors(0)  // []
getFactors(1)  // [1]
getFactors(3)  // [1, 3]
getFactors(-6) // [1, 2, 3, 6]
```

## `getSquareFactor`
若 $k^2$ 為 $n$ 的最大平方因數，回傳 $k$。<br>
可以用於化簡根號： $\sqrt{n} = \sqrt{k^2 s} = k \sqrt{s}$

定義 $1$ 為 $0$ 的最大平方因數。

```js
getSquareFactor(n: number): number
```

| Param | Type | Description |
| :- | :- | :- |
| `n` | `number` ( `int` ) | $n$ |

若 `n` 為負數，會自動取絕對值。<br>

範例：
```js
getSquareFactor(0)      // 1 (定義)
getSquareFactor(1)      // 1 -> √1 = 1√1
getSquareFactor(90)     // 3 -> √90 = 3√10
getSquareFactor(-97)    // 1 -> √-97 = 1√-97
getSquareFactor(123456) // 8 -> √123456 = 8√1929
```


## `getRandomInt`
回傳範圍 `[min, max]` 內的隨機整數。

```js
getRandomInt(min: number, max: number): number
```

| Param | Type | Description |
| :- | :- | :- |
| `min` | `number` ( `int` ) | 隨機整數的最小值 |
| `max` | `number` ( `int` ) | 隨機整數的最大值 |

範例：
```js
getRandomInt(-5, 5) // 隨機生成 -5 到 5 的隨機整數
```

## `sum`
將輸入的所有參數加總。<br>
若參數出現巢狀 `Array`，會將內部所有 `number` 加總。

如果有元素不為 `number`，會跳過並報錯。

```js
sum(...arr: Array<number|Array>): number
```

| Param | Type | Description |
| :- | :- | :- |
| `...arr` | `Array<number\|Array>` | 要求和的數列，只有 `number` 會被加總，<br>其他的元素會被視為 0。 |

範例：
```js
import { sum } from "ran-math";

sum()                      // 0
sum(2, -4, 7.2)            // 5.2
sum([2, -4, 7.2])          // 5.2
sum([2, 3.2], [[-4], 7.2]) // 8.4
```
