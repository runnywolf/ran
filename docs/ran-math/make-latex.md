---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# MakeLatex - 生成 LaTex 語法
用於處理一些 LaTex 字串，語法請參照 [KaTex](https://katex.org/docs/supported.html)。

## Import
```js
import { MakeLatex } from "ran-math";
```

## Methods
| Method | Description |
| :- | :- |
| [`MakeLatex.delim`](#makelatex-delim) | 加上一對根據內容大小調整的小括號<br>語法：`\left( ... \right)` |
| [`MakeLatex.term`](#makelatex-term) | 生成 $c b^n$ 形式的 LaTex 語法，會自動省略某些部分 |
| [`MakeLatex.equationSystem`](#makelatex-equationsystem) | 生成聯立方程組的 LaTex 語法 |

## `MakeLatex.delim`
加上一對根據內容大小調整的小括號，適合用在括號內高度較高的 LaTex 語法，例如分數：<br>
左 `( \frac{-1}{2} )`，右 `\left( \frac{-1}{2} \right)`。
$$( \frac{-1}{2} ) \to \left( \frac{-1}{2} \right)$$

```js
MakeLatex.delim(str: string): string
```

| Param | Type | Description |
| :- | :- | :- |
| `str` | `string` | 語法 `\left( ... \right)` 內的 LaTex 字串 |

範例：
```js
MakeLatex.delim("\\frac{-1}{2}") // "\left(\frac{-1}{2}\right)"
```

## `MakeLatex.term`
生成 $c b^n$ 形式的 LaTex 語法，會自動省略某些部分。

```js
MakeLatex.term(coef: any, base: any, pow: any): string
```

| Param | Type | Description |
| :- | :- | :- |
| `coef` | `any` | 係數 $c$ 的 LaTex 語法，支援 `number`、`Frac`、`EF`、<br>另一個 `LaTex string`，若非這些型態會強制轉為 `string`。 |
| `base` | `any` | 底數 $b$ 的 LaTex 語法，支援 `number`、`Frac`、`EF`、<br>另一個 `LaTex string`，若非這些型態會強制轉為 `string`。 |
| `pow` | `any` | 指數 $p$ 的 LaTex 語法，支援 `number`、`Frac`、<br>另一個 `LaTex string`，若非這些型態會強制轉為 `string`。 |

範例：
| Example | Return | LaTex |
| :- | :- | :- |
| `MakeLatex.term(1, F(-1, 2), "n")` | `"{\left(\frac{-1}{2}\right)}^{n}"` | ${\left(\frac{-1}{2}\right)}^{n}$ |
| `MakeLatex.term(-3, 2, F(1, 2))` | `"-3\cdot{2}^{1/2}"` | $-3\cdot{2}^{1/2}$ |
| `MakeLatex.term("c", -1, "1")` | `"c\left(-1\right)"` | $c\left(-1\right)$ |
| `MakeLatex.term(1, "b", 0)` | `"1"` | $1$ |
| `MakeLatex.term("-1", "x", F(2))` | `"-{x}^{2}"` | $-{x}^{2}$ |

## `MakeLatex.equationSystem`
生成聯立方程組的 LaTex 語法，其中的未知數部分會自動對齊。

```js
MakeLatex.equationSystem(
	row: number,
	col: number,
	coefFunc: (i, j) => any,
	varFunc: (i, j) => any,
	equalFunc: (i) => any,
	equalMode: string = "right"
): string
```

| Param | Type | Description |
| :- | :- | :- |
| `row` | `number` ( `int >= 1` ) | 列數 |
| `col` | `number` ( `int >= 1` ) | 行數 |
| `coefFunc` | `(i, j) => any` | `i` 列 `j` 行的係數 |
| `varFunc` | `(i, j) => any` | `i` 列 `j` 行的未知數 |
| `equalFunc` | `(i) => any` | 第 `i` 列等於什麼東西 |
| `equalMode` | `"right" \| "left" \| null` | 等於會顯示在右邊還是左邊，若為 `null` 會不顯示 $= ...$ |
