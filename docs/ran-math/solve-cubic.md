---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# SolveCubic - 解三次方程式
計算實係數三次方程式的根：
$$ax^3 + bx^2 + cx + d = 0$$

## Import
```js
import { SolveCubic } from "ran-math";
```

## Properties & Methods
建構子：[`SolveCubic constructor`](#solvequad-constructor)

| Property | Type | Description |
| :- | :- | :- |
| [`.roots`](#root) | `[EF, EF, EF]` | 方程式 $ax^3 + bx^2 + cx + d = 0$ 的三個根 |
| [`.rootType`](#roottype) | `number` | 根的形式 |

| Method | Description |
| :- | :- |
| [`.toStr`](#tostr) | 將三個根轉為 debug 字串 |

## `SolveCubic constructor`
建構子，傳入係數會直接計算方程式的根。

如果係數都是有理數 ( `int number | Frac` )，輸出的根 ( `EF` ) 會使用 $\mathbb{Q}(\sqrt{s})$ 模式。<br>
若係數存在 `float number`，輸出的根會使用 $\mathbb{C}$ 模式。

如果三次方程式不存在有理根，也會輸出 $\mathbb{C}$ 模式的 `EF`。

```js
new SolveCubic(
	nf_a: number | Frac,
	nf_b: number | Frac,
	nf_c: number | Frac,
	nf_d: number | Frac
): SolveCubic
```

| Param | Type | Description |
| :- | :- | :- |
| `nf_a` | `number \| Frac` | $a$ |
| `nf_b` | `number \| Frac` | $b$ |
| `nf_c` | `number \| Frac` | $c$ |
| `nf_d` | `number \| Frac` | $d$ |

$$ax^3 + bx^2 + cx + d = 0$$

範例：
```js
new SolveCubic(1, 0, -7, 6)                       // 解為 -3, 1, 2                    ; 解型態為 TYPE_3_FRAC
new SolveCubic(5, F(-173, 24), F(-1, 3), F(7, 8)) // 解為 -1/3, 3/8, 7/5              ; 解型態為 TYPE_3_FRAC
new SolveCubic(1, 4, -6, -5)                      // 解為 -5, -1/2 ± 1/2 √ 5          ; 解型態為 TYPE_1_FRAC_REAL_SQRT
new SolveCubic(1, -2, -9, -4)                     // 解為 -1.7857 , -0.5202 , 4.3059  ; 解型態為 TYPE_3_REAL
new SolveCubic(3.14, 2.718, 1, 1.618)             // 解為 -1.0374 , 0.0859 ± 0.6995 i ; 解型態為 TYPE_1_REAL_2_COMPLEX
```

## `.roots`
方程式 $ax^3 + bx^2 + cx + d = 0$ 的三個根。

```js
SolveCubic#roots: [EF, EF, EF]
```

範例：
```js
const cubic = new SolveCubic(1, 0, -7, 6); // 解為 -3, 1, 2 ; 解型態為 TYPE_3_FRAC
cubic.roots // [new EF(-3), new EF(1), new EF(2)]
```

> [!CAUTION]
> 屬性 `roots` 為唯讀 ( read only )，我不知道你出於什麼原因想修改它。

## `.rootType`
方程式 $ax^3 + bx^2 + cx + d = 0$ 的三個根的形式。

```js
SolveCubic#rootType: number
```

| `.rootType` 的值 | `.roots` 的<br> `EF` 模式 | 根的形式 |
| :- | :- | :- |
| `SolveCubic.TYPE_3_FRAC = 0` | `Q mode` | 三個根都是有理數 |
| `SolveCubic.TYPE_1_FRAC_REAL_SQRT = 1` | `Q mode` | 三個根為 $\frac{n_0}{d_0} , \frac{n_1}{d_1} \pm \frac{n_2}{d_2} \sqrt{s} ~,~ s \gt 0$ |
| `SolveCubic.TYPE_1_FRAC_COMPLEX_SQRT = 2` | `Q mode` | 三個根為 $\frac{n_0}{d_0} , \frac{n_1}{d_1} \pm \frac{n_2}{d_2} \sqrt{s} ~,~ s \lt 0$ |
| `SolveCubic.TYPE_3_REAL = 3` | `C mode` | 三個根都是實數 |
| `SolveCubic.TYPE_1_REAL_2_COMPLEX = 4` | `C mode` | 1 實根 + 2 共軛複根 |

範例：
```js
const cubic = new SolveCubic(1, 0, -7, 6); // 解為 -3, 1, 2 ; 解型態為 TYPE_3_FRAC
cubic.rootType // SolveCubic.TYPE_3_FRAC
```

> [!CAUTION]
> 屬性 `rootType` 為唯讀 ( read only )，我不知道你出於什麼原因想修改它。

## `.toStr`
將三個根轉為 debug 字串。

```js
SolveCubic.prototype.toStr(): string
```

範例：
```js
new SolveCubic(1, 0, -7, 6).toStr() // "-3 , 1 , 2"
```
