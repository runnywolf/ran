---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# 遞迴
計算齊次 / 非齊次遞迴的一般式 ( 閉合形式 )，並生成詳解。

對應至 `src/views/practice-page/RecurView.vue`。

## 隨機生成遞迴
按下 [隨機生成] 按鈕會按照當前輸入框模板，隨機生成一個遞迴。

### 生成複數特徵根
複數特徵根 $\lambda = \alpha + \beta i$ 需要化簡成 cos/sin 形式，而封閉形式中的 $\theta = \tan^{-1}(\beta / \alpha)$，因此我希望生成的 $\lambda$ 可以使 $\theta$ 化簡成 $k \pi ~,~ k \in \mathbb{Q}$ 的形式。

| $\lambda$ | $\alpha$ | $\beta$ | $t \beta / t \alpha$ | $\tan^{-1}(\beta / \alpha) = \theta$ |
| :-: | :-: | :-: | :-: | :-: |
| $t(-i)$ | $0$ | $-1$ | $-\infty$ | $\frac{-1}{2} \pi$ |
| $t(1-\sqrt{3}i)$ | $1$ | $-\sqrt{3}$ | $-\sqrt{3}$ | $\frac{-1}{3} \pi$ |
| $t(1-i)$ | $1$ | $-1$ | $-1$ | $\frac{-1}{4} \pi$ |
| $t(3-\sqrt{3}i)$ | $3$ | $-\sqrt{3}$ | $-\frac{\sqrt{3}}{3}$ | $\frac{-1}{6} \pi$ |
| $t(3+\sqrt{3}i)$ | $3$ | $\sqrt{3}$ | $\frac{\sqrt{3}}{3}$ | $\frac{1}{6} \pi$ |
| $t(1+i)$ | $1$ | $1$ | $1$ | $\frac{1}{4} \pi$ |
| $t(1+\sqrt{3}i)$ | $1$ | $\sqrt{3}$ | $\sqrt{3}$ | $\frac{1}{3} \pi$ |
| $t(i)$ | $0$ | $1$ | $\infty$ | $\frac{1}{2} \pi$ |
