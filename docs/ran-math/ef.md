---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# EF - 擴張體
用來處理擴張體 $\mathbb{Q}(\sqrt{s})$ 的運算，可以向下兼容複數運算。

$$a + b \sqrt{s}$$

在 $\mathbb{Q}(\sqrt{s})$ 模式下，滿足：
- $a, b \in \mathbb{Q}$
- $s \in \mathbb{Z}$
- $\sqrt{s}$ 為最簡根號形式
<br><br>

在 $\mathbb{C}$ 模式下，滿足：
- $a, b \in \mathbb{R}$
- $s \in \{ 0, -1 \}$

## Import
```js
import { EF } from "ran-math";
```

## Properties & Methods
建構子：[`EF constructor`](#ef-constructor)

| Property | Type | Description |
| :- | :- | :- |
| [`.nf_a`](#nf-a-nf-b-s) | `number \| Frac` | $a$ |
| [`.nf_b`](#nf-a-nf-b-s) | `number \| Frac` | $b$ |
| [`.s`](#nf-a-nf-b-s) | `number` ( `int` ) | $s$ |

| Method | Description |
| :- | :- |
| [`EF.isEF`](#ef-isef) | 檢查輸入值是否為 `EF` 的實例 |
| [`.copy`](#copy) | 回傳一個相同值的新實例 |
| [`.toStr`](#tostr) | 轉字串 |
| [`.toLatex`](#tolatex) | 轉 LaTex 語法 |
| [`.real`](#real) | 取出實部 |
| [`.imag`](#imag) | 取出虛部 |
| [`.conjugate`](#conjugate) | 共軛 |
| [`.normSquare`](#normsquare) | 範數平方 |
| [`.add`](#add) | 加法 |
| [`.sub`](#sub) | 減法 |
| [`.mul`](#mul) | 乘法 |
| [`.div`](#div) | 除法 |
| [`.pow`](#pow) | 次方 |
| [`.equal`](#equal) | 等於 |

## `EF.isEF`
檢查參數 `value` 是否為 `EF` 的實例，與 `value instanceof EF` 等價。

```js
EF.isEF(value: any): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `value` | `any` | 要檢查的值 |

範例：
```js
EF.isEF(new EF(3, -6, 2)) // true
EF.isEF(new EF(0))        // true
EF.isEF(2)                // false
```

## `EF.sum`
求數列的總和。

如果有元素不為 `number \| Frac \| EF`，會報錯。

```js
EF.sum(...arr: Array<number|Frac|EF|Array>): EF
```

| Param | Type | Description |
| :- | :- | :- |
| `...arr` | `Array<number\|Frac\|EF\|Array>` | 要求和的數列，只有 `number \| Frac \| EF` 會被加總。 |

範例：
```js
EF.sum([ F(1, 2), F(2, 3), new EF(3, 5) ])   // 53/30 + 0 √ 0
EF.sum(F(1, 2), F(2, 3), F(3, 5))            // 53/30 + 0 √ 0 (不一定要傳入 Array)
EF.sum(F(1, 2), [ [ F(2, 3), 1 ], F(3, 5) ]) // 83/30 + 0 √ 0 (巢狀加總)
EF.sum([ 5, F(1, 2), "7", 2.5 ])             // error
```

## `EF constructor`
類別 `EF` 的建構子。

參數 `nf_a` `nf_b` `nf_s` 必須都是 `int number` 或 `Frac` ( 有理數 )，才會使用 $\mathbb{Q}(\sqrt{s})$ 模式。<br>
如果這 3 個參數存在至少一個 `float number`，會轉為 $\mathbb{C}$ 模式。

```js
new EF(nf_a: number|Frac, nf_b: number|Frac, nf_s: number|Frac): EF
```

| Param | Type | Description |
| :- | :- | :- |
| `nf_a` | `number \| Frac` | $a$ |
| `nf_b` | `number \| Frac` | $b$ |
| `nf_s` | `number \| Frac` | $s$ |

$$a + b \sqrt{s}$$

範例：
```js
new EF()                     // (0 + 0 √ 0) ; 建議還是用 new EF(0) 宣告 0
new EF(3)                    // (3 + 0 √ 0)
new EF(1, 2, 3)              // (1 + 2 √ 3)
new EF(F(4, 3), 0, 4)        // (4/3 + 0 √ 0)
new EF(F(-4, 7), 3, F(2, 5)) // (-4/7 + 3/5 √ 10) ; 有理化
new EF(-1, 3, F(4, 9))       // (1 + 0 √ 0) ; 自動進行標準化
new EF(0.4, F(3, 2), 2)      // (2.5213 + 0 √ 0) ; 參數含有 float, 使用 C 模式
new EF(-1, F(3, 2), -0.4)    // (-1 + 0.9487 √ -1)
```

## `.nf_a .nf_b .s`
$$a + b \sqrt{s}$$

```js
EF.prototype.nf_a: number | Frac
EF.prototype.nf_b: number | Frac
EF.prototype.s: number
```

範例：
```js
const ef = new EF(F(-4, 7), 3, F(2, 5)); // (-4/7 + 3/5 √ 10)
ef.nf_a // -4/7 (Frac)
ef.nf_b // 3/5 (Frac)
ef.s    // 10
```

> [!CAUTION]
> 屬性 `nf_a` `nf_b` `s` 為唯讀 ( read only )，修改它們並不會讓 `EF` 實例執行標準化。

## `.copy`
回傳一個相同值的新實例。

```js
EF.prototype.copy(): EF
```

範例：
```js
new EF(F(-4, 7), 3, F(2, 5)).copy() // (-4/7 + 3/5 √ 10)
```

## `.toStr`
將 $a + b \sqrt{s}$ 轉為字串。

```js
EF.prototype.toStr(): string
```

範例：
```js
new EF(1, 2, 3).toStr()              // "1 + 2 √ 3"
new EF(F(-4, 7), 3, F(2, 5)).toStr() // "-4/7 + 3/5 √ 10"
new EF(3.14, -1.618, -1).toStr()     // "3.1400 + -1.6180 √ -1"
```

## `.toLatex`
將 $a + b \sqrt{s}$ 轉為 LaTex 語法。

```js
EF.prototype.toLatex(): string
```

範例：
```js
new EF(-3, 1, 2).toLatex()               // "-3+\sqrt{2}"
new EF(F(4, 7), F(5, 6), 2).toLatex()    // "\frac{24+35\sqrt{2}}{42}"
new EF(5.56, -7.62, -1).toLatex()        // "5.5600-7.6200i"
new EF(0, 1, -1).toLatex()               // "i"
new EF(1, -2, -2).toLatex()              // "1-2\sqrt{2}i"
new EF(F(-4, 7), F(-5, 6), -1).toLatex() // "\frac{-4}{7}+\frac{-5}{6}i"
```

## `.real`
取出 $a + b \sqrt{s}$ 的實數部分。

```js
EF.prototype.real(): EF
```

範例：
```js
new EF(F(2, 3), F(-2, 5), 3).real()  // (2/3 + -2/5 √ 3)
new EF(F(2, 3), F(-2, 5), -1).real() // (2/3 + 0 √ 0)
new EF(0, F(-2, 5), -3).real()       // (0 + 0 √ 0)
new EF(2.718, 1.618, -1).real()      // (2.718 + 0 √ 0)
new EF(3.14).real()                  // (3.14 + 0 √ 0)
```

## `.imag`
取出 $a + b \sqrt{s}$ 的虛數部分。

```js
EF.prototype.imag(): EF
```

範例：
```js
new EF(F(2, 3), F(-2, 5), 3).imag()  // (0 + 0 √ 0)
new EF(F(2, 3), F(-2, 5), -1).imag() // (-2/5 + 0 √ 0)
new EF(0, F(-2, 5), -3).imag()       // (0 + -2/5 √ 3)
new EF(2.718, 1.618, -1).imag()      // (1.618 + 0 √ 0)
new EF(3.14).imag()                  // (0 + 0 √ 0)
```

## `.conjugate`
$a + b \sqrt{s}$ 在擴張體 $\mathbb{Q}(\sqrt{s})$ 之下的共軛。

所以 $1 + 2 \sqrt{3}$ 取共軛會變成 $1 - 2 \sqrt{3}$。

不影響 $\mathbb{C}$ 的複數共軛。

```js
EF.prototype.conjugate(): EF
```

範例：
```js
new EF(1, 2, 3).conjugate()         // (1 + -2 √ 3)
new EF(1, F(-2, 3), -7).conjugate() // (1 + 2/3 √ -7)
new EF(0, 1, -1).conjugate()        // (0 + -1 √ -1)
```

## `.normSquare`
回傳 $a + b \sqrt{s}$ 的範數平方。

定義為：
$$\| a + b \sqrt{s} \|^2 = a^2 - b^2 s$$

```js
EF.prototype.normSquare(): number | Frac
```

範例：
```js
new EF(F(1, 2), F(3, 4), 5).normSquare() // -41/16
new EF(2, F(-1, 3), -3).normSquare()     // 13/3
new EF(0, 0, 0).normSquare()             // 0/1
new EF(-2.4476, 1.8807, -1).normSquare() // 9.52777825
```

## `.add`
加上另一個 `EF | Frac | number`，回傳新實例。

```js
EF.prototype.add(nfe: number | Frac | EF): EF
```

| Param | Type | Description |
| :- | :- | :- |
| `nfe` | `number \| Frac \| EF` | 加數 |

範例：
```js
new EF(F(1, 2), F(3, 4), 5).add(new EF(-2, F(3, 4), 5)) // (-3/2 + 3/2 √ 5)
new EF(F(1, 2), F(3, 4), 5).add(new EF(-2, 1.79, 5))    // (4.1796 + 0 √ 0)
new EF(F(1, 2), F(3, 4), 5).add(F(-1, 2))               // (0 + 3/4 √ 5)
new EF(F(1, 2), F(3, 4), 5).add(7)                      // (15/2 + 3/4 √ 5)
new EF(F(1, 2), F(3, 4), 5).add(1.79)                   // (3.9670 + 0 √ 0)
```

> [!NOTE]
> 兩個 `EF` 實例的非零 `.s` 必須相同才能做運算。( 維持 $\mathbb{Q}(\sqrt{s})$ 的封閉性 )

## `.sub`
減去另一個 `EF | Frac | number`，回傳新實例。

```js
EF.prototype.sub(nfe: number | Frac | EF): EF
```

| Param | Type | Description |
| :- | :- | :- |
| `nfe` | `number \| Frac \| EF` | 減數 |

範例：
```js
new EF(F(1, 2), F(3, 4), 5).sub(new EF(-2, F(3, 4), 5)) // (5/2 + 0 √ 5)
new EF(F(1, 2), F(3, 4), 5).sub(new EF(-2, 1.79, 5))    // (0.1745 + 0 √ 0)
new EF(F(1, 2), F(3, 4), 5).sub(F(-1, 2))               // (1 + 3/4 √ 5)
new EF(F(1, 2), F(3, 4), 5).sub(7)                      // (-13/2 + 3/4 √ 5)
new EF(F(1, 2), F(3, 4), 5).sub(1.79)                   // (0.3871 + 0 √ 0)
```

> [!NOTE]
> 兩個 `EF` 實例的非零 `.s` 必須相同才能做運算。( 維持 $\mathbb{Q}(\sqrt{s})$ 的封閉性 )

## `.mul`
乘上另一個 `EF | Frac | number`，回傳新實例。

```js
EF.prototype.mul(nfe: number | Frac | EF): EF
```

| Param | Type | Description |
| :- | :- | :- |
| `nfe` | `number \| Frac \| EF` | 乘數 |

範例：
```js
new EF(F(1, 2), -1, 5).mul(new EF(-2, F(7, 3), 5)) // -38/3 + 19/6 √ 5
new EF(1.75).mul(new EF(-2, F(7, 3), 5))           // 5.6306 + 0 √ 0
new EF(-2, F(7, 3), 5).mul(F(1, 2))                // -1 + 7/6 √ 5
new EF(0, F(7, 3), 5).mul(-3)                      // 0 + -7 √ 5
new EF(0, F(7, 3), 5).mul(-3.772)                  // -19.6804 + 0 √ 0
```

> [!NOTE]
> 兩個 `EF` 實例的非零 `.s` 必須相同才能做運算。( 維持 $\mathbb{Q}(\sqrt{s})$ 的封閉性 )

## `.div`
除以另一個 `EF | Frac | number`，回傳新實例。

```js
EF.prototype.div(nfe: number | Frac | EF): EF
```

| Param | Type | Description |
| :- | :- | :- |
| `nfe` | `number \| Frac \| EF` | 除數 |

範例：
```js
new EF(F(1, 2), -1, 5).div(new EF(-2, F(7, 3), 5)) // -96/209 + -15/418 √ 5
new EF(1.75).div(new EF(-2, F(7, 3), 5))           // 0.5439 + 0 √ 0
new EF(-2, F(7, 3), 5).div(F(1, 2))                // -4 + 14/3 √ 5
new EF(-2, F(7, 3), 5).div(-3)                     // 2/3 + -7/9 √ 5
new EF(-2, F(7, 3), 5).div(-3.772)                 // -0.8530 + 0 √ 0
```

> [!NOTE]
> 兩個 `EF` 實例的非零 `.s` 必須相同才能做運算。( 維持 $\mathbb{Q}(\sqrt{s})$ 的封閉性 )

## `.pow`
整數次方運算，回傳新實例。

```js
EF.prototype.pow(i: number): EF
```

| Param | Type | Description |
| :- | :- | :- |
| `i` | `number` ( `int` ) | 整數次方 |

範例：
```js
new EF(F(2, 5), -3, -2).pow(2)       // -446/25 + -12/5 √ -2
new EF(F(1, 2), F(3, 4), 5).pow(1)   // 1/2 + 3/4 √ 5
new EF(F(1, 2), F(3, 4), 5).pow(0)   // 1 + 0 √ 0
new EF(F(1, 2), F(3, 4), -5).pow(-1) // 8/49 + -12/49 √ -5
```

## `.equal`
是否等於另一個 `EF | Frac | number`。

```js
EF.prototype.equal(nfe: any): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `nfe` | `any` | 要比較的另一個數 |

範例：
```js
new EF(F(1, 2), F(3, 4), 5).equal(new EF(F(1, 2), F(3, 4), 5)) // true
new EF(F(1, 2)).equal(F(1, 2))                                 // true
new EF(3).equal(3)                                             // true
new EF(3.77).equal(3.77)                                       // true
new EF(3).equal("3")                                           // false
```
