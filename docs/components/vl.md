---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# vl - 數學公式
用於顯示 LaTex 語法。

`vl` 為 [VaTex](https://github.com/Shimada666/VaTex) 在 Ran 內的封裝。<br>
語法請參照：[KaTex - Support Functions](https://katex.org/docs/supported.html)

> [!TIP]
> 組件 `vl` 為全域組件，不須 `import` 即可直接使用。

## 範例
```html
根據 <vl exp="\det(AB) = \det(A) \det(B)"> 這個定理。
```
根據 $\det(AB) = \det(A) \det(B)$ 這個定理。

<br>

置中：
```html
<vl c exp="\langle f, g \rangle = \int_{-1}^{1} f(x) g(x) dx">
```
$$\langle f, g \rangle = \int_{-1}^{1} f(x) g(x) dx$$

## 組件參數
| `props.` | Type | Default | Description |
| :- | :- | :- | :- |
| `exp` | `string` | `?` | LaTex 數學式 |
| `c` | `Boolean` | `false` | 將數學式置中 |
