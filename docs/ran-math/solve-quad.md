---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# SolveQuad - 解二次方程式
計算實係數二次方程式的根：
$$ax^2 + bx + c = 0$$

## Import
```js
import { SolveQuad } from "ran-math";
```

## Properties & Methods
建構子：[`SolveQuad constructor`](#solvequad-constructor)

| Property | Type | Description |
| :- | :- | :- |
| [`.roots`](#root) | `[EF, EF]` | 方程式 $ax^2 + bx + c = 0$ 的兩個根 |
| [`.rootType`](#roottype) | `number` | 根的形式 |

| Method | Description |
| :- | :- |
| [`.toStr`](#tostr) | 將兩個根轉為 debug 字串 |
| [`.toLatex`](#tolatex) | 將兩個根轉為 LaTex 語法，會用逗號分隔 |

## `SolveQuad constructor`
建構子，傳入係數會直接計算方程式的根。

如果係數都是有理數 ( `int number | Frac` )，輸出的根 ( `EF` ) 會使用 $\mathbb{Q}(\sqrt{s})$ 模式。<br>
若係數存在 `float number`，輸出的根會使用 $\mathbb{C}$ 模式。

```js
new SolveQuad(nf_a: number|Frac, nf_b: number|Frac, nf_c: number|Frac): SolveQuad
```

| Param | Type | Description |
| :- | :- | :- |
| `nf_a` | `number \| Frac` | $a$ |
| `nf_b` | `number \| Frac` | $b$ |
| `nf_c` | `number \| Frac` | $c$ |

$$ax^2 + bx + c = 0$$

範例：
```js
new SolveQuad(1, -1, -6)             // 解為 3, -2              ; 解型態為 TYPE_2_FRAC
new SolveQuad(5, F(-22, 3), F(8, 3)) // 解為 4/5, 2/3           ; 解型態為 TYPE_2_FRAC
new SolveQuad(4, 16, 5)              // 解為 -2 ± 1/2 √ 11      ; 解型態為 TYPE_REAL_SQRT
new SolveQuad(4, F(16), 5.2)         // 解為 -0.3568 , -3.6432  ; 解型態為 TYPE_2_REAL
new SolveQuad(4, 2, 5.2)             // 解為 -0.2500 ± 1.1124 i ; 解型態為 TYPE_2_COMPLEX
```

## `.roots`
方程式 $ax^2 + bx + c = 0$ 的兩個根。

```js
SolveQuad#roots: [EF, EF]
```

範例：
```js
const quad = new SolveQuad(1, -1, -6); // 解為 3, -2 ; 解型態為 TYPE_2_FRAC
quad.roots // [new EF(3), new EF(-2)]
```

> [!CAUTION]
> 屬性 `roots` 為唯讀 ( read only )，我不知道你出於什麼原因想修改它。

## `.rootType`
方程式 $ax^2 + bx + c = 0$ 的兩個根的形式。

```js
SolveQuad#rootType: number
```

| `.rootType` 的值 | 根的形式 |
| :- | :- |
| `SolveQuad.TYPE_2_FRAC = 0` | 兩個根都是有理數 |
| `SolveQuad.TYPE_REAL_SQRT = 1` | 兩個根為 $\frac{n_1}{d_1} \pm \frac{n_2}{d_2} \sqrt{s} ~,~ s \gt 0$ |
| `SolveQuad.TYPE_COMPLEX_SQRT = 2` | 兩個根為 $\frac{n_1}{d_1} \pm \frac{n_2}{d_2} \sqrt{s} ~,~ s \lt 0$ |
| `SolveQuad.TYPE_2_REAL = 3` | 兩個根都是實數 ( `float` ) |
| `SolveQuad.TYPE_2_COMPLEX = 4` | 兩個根都是複數 ( `float` ) |

範例：
```js
const quad = new SolveQuad(1, -1, -6); // 解為 3, -2 ; 解型態為 TYPE_2_FRAC
quad.rootType // SolveQuad.TYPE_2_FRAC
```

> [!CAUTION]
> 屬性 `rootType` 為唯讀 ( read only )，我不知道你出於什麼原因想修改它。

## `.toStr`
將兩個根轉為 debug 字串。

```js
SolveQuad.prototype.toStr(): string
```

範例：
```js
new SolveQuad(1, -1, -6).toStr()             // "3, -2"
new SolveQuad(5, F(-22, 3), F(8, 3)).toStr() // "4/5 , 2/3"
new SolveQuad(1, 0, 2).toStr()               // "1 √ 2 i , -1 √ 2 i"
new SolveQuad(4, F(16), 5.2).toStr()         // "-0.3568 , -3.6432"
new SolveQuad(4, 2, 5.2).toStr()             // "-0.2500 + 1.1124 i , -0.2500 + -1.1124 i"
```

## `.toLatex`
將兩個根轉為 LaTex 語法，會用逗號分隔。

```js
SolveQuad.prototype.toLatex(): string
```

範例：
```js
new SolveQuad(4, 2, 5).toLatex()
// "\frac{-1}{4}+\frac{\sqrt{19}}{4}i~,\enspace\frac{-1}{4}+\frac{-\sqrt{19}}{4}i"
```

$$\frac{-1}{4}+\frac{\sqrt{19}}{4}i~,\enspace\frac{-1}{4}+\frac{-\sqrt{19}}{4}i$$
