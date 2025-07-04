---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# MultiTerm
將多個 [MakeLatex.term](./make-latex#makelatex-term) 產生的 LaTex 語法以加總的方式組合在一起，會忽略零項。

## Import
```js
import { MultiTerm } from "ran-math";
```

## Methods
建構子：[`MultiTerm constructor`](#makelatex-constructor)

| Method | Description |
| :- | :- |
| [`.push`](#push) | 將一個 LaTex 字串連接至式子的尾端 |
| [`.pushTerm`](#pushterm) | 等同於 `.push(MakeLatex.term(...))` |
| [`.toLatex`](#tolatex) | 輸出建構好的 LaTex 字串 |

## `MultiTerm constructor`
類別 `MultiTerm` 的建構子。

```js
new MultiTerm(): MultiTerm
```

## `.push`
將一個 LaTex 字串連接至式子的尾端，會忽略零項，支援 `Method Chaining`。

```js
MultiTerm.prototype.push(s_latex: string): MultiTerm
```

| Param | Type | Description |
| :- | :- | :- |
| `s_latex` | `string` | LaTex 式子 |

範例：
```js
new MultiTerm().push("5").push("x").push("0").push("-x^2").toLatex() // "5+x-x^2"
```
$$5+x-x^2$$

## `.pushTerm`
等同於 `.push(MakeLatex.term(...))`，支援 `Method Chaining`。

```js
MultiTerm.prototype.pushTerm(coef: any, base: any, pow: any): MultiTerm
```

參數與 [MakeLatex.term](./make-latex#makelatex-term) 相同。

## `.toLatex`
輸出建構好的 LaTex 字串。

```js
MultiTerm.prototype.toLatex(): string
```

範例：
```js
new MultiTerm().push("5").push("x").push("0").push("-x^2").toLatex() // "5+x-x^2"
```
$$5+x-x^2$$
