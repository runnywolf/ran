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
	就會自動渲染 text node 內 $a$ 和 $$test$$ 內的 KaTex 語法。
</vk>
```
