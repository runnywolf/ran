---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# SolveCubic 實作細節
本頁為 [SolveCubic - 解三次方程式](../ran-math/solve-cubic) 的實作細節。

$$ax^3 + bx^2 + cx + d$$

## 分析
解三次方程式是一個複雜的問題，雖然有公式解，但很醜。

而 $P_3$ 必有一個實數根，如果用勘根找到這個實根，那就可以將 $P_3$ 化簡為 $P_2$。<br>
$P_2$ 只需要用 $\frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ 解，非常簡單。

## 尋找有理根
將
$$x = \pm \frac{ \{ \text{all} ~ d ~ \text{factors} \} }{ \{ \text{all} ~ a ~ \text{factors} \} }$$
全部代進 $ax^3 + bx^2 + cx + d$，若 $= 0$ 表示找到有理根。

如果沒有任何有理數符合，那麼這個 $P_3$ 不存在有理根。

## 尋找實數根
如果沒找到有理根，需要求得一個近似實根 ( `float` )。

以下會使用二分搜尋來求近似的實根，時間複雜度為 $\log x$。

**Step 1**：<br>
如果 $a < 0$ 同乘 $-1$ 使 $a > 0$。
- 如果 $f(0) > 0$，代表某個根一定 $< 0$。
- 如果 $f(0) = 0$，代表某個根一定 $= 0$。
- 如果 $f(0) < 0$，代表某個根一定 $> 0$。

**Step 2**：<br>
- 如果 $f(0) > 0$，檢查 $f(-2^0)$ 的值是否 $< 0$，如果沒有就繼續檢查 $f(-2^1), f(-2^2), \cdots$，
直到找到一個異號區間 $x \in [-2^{n+1}, -2^n]$，對這個範圍的 $x$ 用二分搜尋逼近 $f(x) = 0$。
- 如果 $f(0) < 0$，檢查 $f(2^0)$ 的值是否 $> 0$，如果沒有就繼續檢查 $f(2^1), f(2^2), \cdots$，
直到找到一個異號區間 $x \in [2^n, 2^{n+1}]$，對這個範圍的 $x$ 用二分搜尋逼近 $f(x) = 0$。

## 簡化問題
現在成功的得到了 $P_3$ 的一個實根 $r$，因此 $(x-r)$ 必整除 $f(n)$：
$$f(x) = (x-r) g(x) = 0 ~~,~~ g(x) \in P_2(\mathbb{R})$$

令 $g(x) = a'x^2 + b'x + c'$，因此
$$f(x) = (x-r)(a'x^2 + b'x + c') = a'x^3 + (b'-ra')x^2 + (c'-rb')x - rc' = 0$$
$$= ax^3 + bx^2 + cx + d$$

可知
$$a' = a \quad;\quad b' = ra' + b \quad;\quad c' = rb' + c$$

用 [SolveQuad](../ran-math/solve-quad) 解 $a'x^2 + b'x + c' = 0$，再將計算結果與 $r$
合併，即可得到 $P_3$ 的三個根。

## 排序
`SolveCubic` 和 `SolveQuad` 會把輸出的 `2/3 Frac` 或 `2/3 float` 做升序排列。
