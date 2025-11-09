---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# VueKatex - 渲染 katex 語法
用於顯示 LaTex 語法。

語法請參照：[KaTex - Support Functions](https://katex.org/docs/supported.html)

> [!TIP]
> 組件 `VueKatex` 為全域組件，不須 `import` 即可直接使用。

## 範例
```html
<vk>
	只要把 html 元素放在這裡面，<br>
	就會遞迴所有節點，自動渲染 text node 內 $a$ 和 $$test$$ 內的 KaTex 語法。
</vk>
```

## 巨集
語法：`@<ins>{...}`，會將 `...` 根據設定替換成別的字串。

如果想要新增巨集，可以修改 `src/libs/vue-katex.js` 內的 `const katexMacros`。<br>
`key` 為 `<ins>`，`value` 為 `exp => ...`。

### 指令
| 替換前語法 | 替換後語法 (KaTex 標準語法) |
| - | - |
| `@m{ ... }` | `\begin{matrix} ... \end{matrix}` |
| `@pm{ ... }` | `\begin{pmatrix} ... \end{pmatrix}` |
| `@bm{ ... }` | `\begin{bmatrix} ... \end{bmatrix}` |
| `@vm{ ... }` | `\begin{vmatrix} ... \end{vmatrix}` |
| `@(){ ... }` | `\left( ... \right)` |
| `@f{<n>;<d>}` | `\frac{<n>}{<d>}` |
| `@tf{<n>;<d>}` | `\tfrac{<n>}{<d>}` |
| `@df{<n>;<d>}` | `\dfrac{<n>}{<d>}` |
| `@cf{<n>;<d>}` | `\cfrac{<n>}{<d>}` |

### 矩陣特殊語法
- 指令 `m` `pm` `bm` `vm` 會強制把 `...` 內的 `,` 轉為 `&`，`;` 轉為換行符 `\\`。
- 因為 KaTex 語法的 `bmatrix` 的兩側的間距太大，所以指令 `bm` 會在語法兩側加上 `\!` 降低間距。
- 指令 `bm` 內的 `...` 如果出現 `frac` (分數)，會自動加上 `\def\arraystretch{1.35}`，使每一列的分數不會擠在一起。

因此你可以用 `@bm{ @f{1;2} , 6 ; @f{1;2} , 5 }` 代替以下複雜語法：
```latex
\def\arraystretch{1.35}
\!\begin{bmatrix}
\frac{1}{2} & 6 \\
\frac{1}{2} & 5
\end{bmatrix}\!
\def\arraystretch{1}
```
