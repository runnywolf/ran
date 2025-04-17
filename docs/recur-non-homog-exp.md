---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# RecurNonHomogExp.vue
> [!WARNING]
> 這個組件是 [RecurNonHomog.vue](./recur-non-homog.md) 拆分出的子組件，你不應該單獨使用它。

用於計算非齊次遞迴的特解當中的未知係數 $p_j$，並且顯示計算過程。

## 描述
遞迴的非齊次部分：
$$
F(n) = \sum\limits_i f_i(n) {b_i}^n = (c_1 + c_2 n + c_3 n^2 + \cdots) {b_i}^n + \cdots
$$

以下是已經假設完成的特解形式：
$$
a_n^{(p)} = \sum\limits_i g_i(n) n^{k_i} {b_i}^n = (p_1 + p_2 n + p_3 n^2 + \cdots) n^{k_i} {b_i}^n + \cdots
$$

其中
- $f_i(n)$ 與 $g_i(n)$ 皆為多項式，且次數相同。
- $b_i \in \mathbb{Q} ~,~ b_i \neq 0$，非齊次部分的已知底數。
- $c_i \in \mathbb{Q}$ ，為非齊次部分的已知係數。
- 當齊次與非齊次部分都存在相同的指數部分 ${b_i}^n$ 時，需要額外乘上 $n^{k_i}$ 保證線性獨立。
- $p_j$ 為要計算的未知係數。

根據係數比較法可知：<br>
不同 ${b_i}^n$ 對應的多項式 $g_i(n)$ 彼此獨立，因此可以分別計算未知係數 $p_j$。( 分治法 )

因此本組件只計算某個 ${b_i}^n$ 的部分，將 $F(n)$ 和 $a_n^{(p)}$ 視為：
$$
F(n) = f(n) b^n = (c_0 + c_1 n + c_2 n^2 + \cdots) b^n
$$
$$
a_n^{(p)} = g(n) n^k b^n = (p_{s} + p_{s+1} n + p_{s+2} n^2 + \cdots) n^k b^n
$$

## 組件參數
| `props.` | Type | Description |
| -------- | ---- | ---- |
| `recurCoef` | `Array<Frac>` | 齊次部分的係數，`.length` 代表遞迴階數 |
| `frac_b` | `Frac` | 指數項 $b^n$ 的 $b$ |
| `polyCoef` | `Array<Frac>` | 多項式 $f(n)$ 的係數 $c_i$ |
| `extraNPow` | `number` ( `int` ) | 為保持特解的線性獨立性，額外乘上去的 $n^k$ |
| `startPj` | `number` ( `int` ) | 未知係數 $p_s$ 的編號 $s$ |
| `_mlExpTerm` | `Function:`<br>`(boolean, number) => string` | 來自 `RecurNonHomog.vue` 的閉包<br>注意： `s_frac_b` 已被傳入<br>只需給予 `isUnknownCoef`、`extraNPow` |

### `recurCoef`
同 [RecurNonHomg - recurCoef](./recur-non-homog#recurcoef)。

### `frac_b`
指數項 $b^n$ 的 $b$，範例請參照 `polyCoef`。

### `polyCoef`
多項式 $f(n)$ 的係數 $c_i$。<br>

> Example
> ```js
> frac_b = new Frac(-3);
> polyCoef = [ new Frac(4), new Frac(0), new Frac(-7, 2) ];
> ```
> 代表
> $$
> F(n) = (-4 + \frac{-7}{2} n^2) (-3)^n
> $$

### `extraNPow`
當齊次與非齊次部分都存在相同的指數部分 ${b_i}^n$ 時，需要額外乘上 $n^k$ 保證線性獨立。

- 若 $a_n^{(h)}$ 存在 ${b_i}^n$ 項，需要額外乘上 $n^1$，變成 $p_s n + p_{s+1} n^2 + \cdots$。
- 若 $a_n^{(h)}$ 存在 ${b_i}^n$、$n {b_i}^n$ 項，需要額外乘上 $n^2$，變成 $p_s n^2 + p_{s+1} n^3 + \cdots$。

以此類推

範例請參照 `startPj`。

### `startPj`
因為每個 ${b_i}^n$ 的部分是分開計算的，需要對未知係數 $p_j$ 編號，方便後續解答的合併。

> Example
> ```js
> frac_b = new Frac(-3);
> polyCoef = [ new Frac(4), new Frac(0), new Frac(-7, 2) ];
> extraNPow = 2;
> startPj = 3;
> ```
> 由於 $f_i(n)$ 與 $g_i(n)$ 的次數相同，因此
> $$
> a_n^{(p)} = (p_3 + p_4 n + p_5 n^2) n^2 (-3)^n
> $$

### `_mlExpTerm`
來自 [RecurNonHomog - _mlExpTerm (link 待補)]() 的閉包。

注意： `s_frac_b` 已在 `RecurNonHomog.vue` 內被傳入<br>
只需給予 `isUnknownCoef`、`extraNPow`。

## emit
| `emit` | Type | Description |
| -------- | ---- | ---- |
| `PjAnswer` | `Array<Frac>` | 非齊次部分 ${b_i}^n$ 對應的多個未知係數 $p_j$ 的計算結果 |

### `PjAnswer`
當未知係數 $p_j$ 計算完成時，上傳結果至 [`RecurNonHomog.vue`](./recur-non-homog.md)。

Example
```js
expData.startPj = 3;
PjAnswer = [ new Frac(-2, 7), new Frac(6), new Frac(3, 4) ];
```
表示：
$$
p_3 = \frac{-2}{7} ~~,~~ p_4 = 6 ~~,~~ p_5 = \frac{3}{4}
$$

## `SolveNonHomogExp` 的變數
建構子參數 `recurCoef`、`frac_b`、`polyCoef`、`extraNPow`、`startPj` 同 [組件參數](#組件參數)。

| `this.` | Type | Description |
| :-- | :-- | :-- |
| `recurLevel` | `number` ( `int` ) | 遞迴階數 |
| `PjNum` | `number` ( `int` ) | 未知係數 $p_j$ 的數量 |
| `PjLinearEquation` | `Array<Array<Frac>>` | $a_n^{(p)}$ 以 $p_j$ 表示的線性關係 |
| `nonHomogFn` | `Array<Frac>` | 將常數代入非齊次部分 $F(n)$ 得到的值 |
| `matrix_solvePj` | `Matrix` | 用於解 $p_j$ 的聯立方程式方陣 |
| `PjAnswer` | `Array<Frac>` | 算出的特解係數 $p_j$ |

### `recurLevel`
遞迴階數，與 `recurCoef.length` 的值相同。

### `PjNum`
未知係數 $p_j$ 的數量。

等於多項式 $g(n)$ 的次數，<br>
又因為 $f(n)$ 與 $g(n)$ 的次數相同，且 $f(n)$ 的次數與 [`polyCoef.length`](#polycoef) 相同，<br>
因此 `PjNum == polyCoef.length`。

### `PjLinearEquation`
$a_n^{(p)}$ 代入自然數 $n$ 之後，以未知數 $p_j$ 表示的線性關係。

會在 `SolveNonHomogExp._initPjLinearEquation()` 內計算。

展開特解的形式：( $k$ 為 [`extraNPow`](#extranpow) )
$$
a_n^{(p)} = (p_{s} + p_{s+1} n + p_{s+2} n^2 + \cdots) n^k b^n
$$
$$
= (n^k b^n) p_s + (n^{k+1} b^n) p_{s+1} + (n^{k+2} b^n) p_{s+2} + \cdots
$$

`coef` 回傳 $a_n^{(p)}$ 內未知數 $p_{s+i}$ 的係數：
$$\text{coef}(n, i) = n^{k+i} b^n$$

### `nonHomogFn`
將常數代入非齊次部分 $F(n)$ 得到的值。

會在 `SolveNonHomogExp._initNonHomogFn()` 內計算。

### `matrix_solvePj`
用於解 $p_j$ 的聯立方程式方陣。

會在 `SolveNonHomogExp._initPjEquationSystem()` 內計算。

### `PjAnswer`
算出的特解係數 $p_j$。

會在 `SolveNonHomogExp._initSolvePj()` 內計算。

## `SolveNonHomogExp` 的方法
`ml` 是 `makeLatex` 的縮寫。

| Method | Return | Description |
| -------- | ------ | ---- |
| `_initPjLinearEquation` | `void` | 計算 `PjLinearEquation` |
| `_initNonHomogFn` | `void` | 計算 `nonHomogFn` |
| `_initPjEquationSystem` | `void` | 計算 `matrix_solvePj` |
| `_initSolvePj` | `void` | 計算 `PjAnswer` |
| `mlExp` | `string` | 回傳 " $b^n$ " ( LaTeX ) |
| `mlSomePj` | `string` | 回傳未知係數 $p_j$ 的範圍<br>( LaTeX ) |
| `mlNRange` | `string` | 回傳需要代入的 $n$ 值範圍<br>( LaTeX ) |
| `mlParticularLinearEquation` | `string` | 回傳 $F(n)$ 以 $a_n^{(p)}$ 表示的線性關係<br>( LaTeX ) |
| `mlPjLinearEquation` | `string` | 回傳 $a_n^{(p)}$ 以 $p_j$ 表示的線性關係<br>( LaTeX ) |
| `mlSolvePjEquationSystem` | `string` | 回傳 $p_j$ 的聯立方程組<br>( LaTeX ) |
| `mlPjAnswer` | `string` | 回傳 $p_j$ 的答案 ( LaTeX ) |

### 組件顯示的解題過程
計算 $a_n^{(p)}$ 之中，指數項 `expData.mlExp()` 對應的 `expData.PjNum` 個未知係數 `expData.mlSomePj()`，
需要將 `expData.mlNRange()` 代入式 ( 1 )，<br>產生 `expData.PjNum` 個式子的線性方程組，並解聯立：<br>
<div style="text-align: center;"><code>expData.mlParticularLinearEquation()</code></div>

其中 $F(n) =$ `_mlExpTerm(false, 0)`，<br>
$a_n^{(p)} =$ `_mlExpTerm(true, extraNPow)`，代入常數後得到：<br>
<div style="text-align: center;"><code>expData.mlPjLinearEquation()</code></div>

展開後得到：<br>
<div style="text-align: center;"><code>expData.mlSolvePjEquationSystem()</code></div>

使用高斯消去法解 $p_j$ 的聯立方程式，得到：<br>
<div style="text-align: center;"><code>expData.mlPjAnswer()</code></div>

## ref 變數
| `ref` | Type | Description |
| :-- | :-- | :-- |
| `expData` | [`SolveNonHomogExp`](#solvenonhomogexp-的變數) | 未知係數 $p_j$ 的計算結果 |

### `expData`
未知係數 $p_j$ 的計算結果，計算所需的變數和方法都封裝在內。

當組件參數 `recurCoef`、`frac_b`、`polyCoef`、`extraNPow`、`startPj` 改變時會更新此值。

## 解題過程
以下示範如何解
$$
a_n^{(p)} + 5a_{n-1}^{(p)} + 6a_{n-2}^{(p)} = F(n) ~,~ n \ge 2
$$
$$
F(n) = (-2 -n + 2n^2) 1^n
$$
$$
a_n^{(p)} = (p_1 + p_2 n + p_3 n^2) n^0 1^n
$$
的未知係數 $p_j$

### Step1 生成線性關係
因為未知係數 $p_j$ 有 3 個，需要生成 3 個式子才能解 $p_j$ 的聯立，<br>
因為 $n \ge 2$，所以將 2 ~ 4 代入遞迴式產生 3 個式子的線性方程組，並解聯立：
$$
\begin{bmatrix}
	a_2^{(p)} + 5a_1^{(p)} + 6a_0^{(p)} \\
	a_3^{(p)} + 5a_2^{(p)} + 6a_1^{(p)} \\
	a_4^{(p)} + 5a_3^{(p)} + 6a_2^{(p)}
\end{bmatrix}
=
\begin{bmatrix}
	F(2) \\ F(3) \\ F(4)
\end{bmatrix}
$$

其中
$$
\begin{bmatrix}
	a_0^{(p)} \\ a_1^{(p)} \\ a_2^{(p)} \\ a_3^{(p)} \\ a_4^{(p)}
\end{bmatrix}
=
\begin{bmatrix}
	p_1 \\
	p_1 +p_2 +p_3 \\
	p_1 +2p_2 +4p_3 \\
	p_1 +3p_2 +9p_3 \\
	p_1 +4p_2 +16p_3
\end{bmatrix}
$$

### Step2 展開聯立方程式
$$
\begin{bmatrix}
	F(2) \\ F(3) \\ F(4)
\end{bmatrix}
=
\begin{bmatrix}
	a_2^{(p)} + 5a_1^{(p)} + 6a_0^{(p)} \\
	a_3^{(p)} + 5a_2^{(p)} + 6a_1^{(p)} \\
	a_4^{(p)} + 5a_3^{(p)} + 6a_2^{(p)}
\end{bmatrix}
=
\begin{bmatrix}
	6 & 5 & 1 & 0 & 0 \\
	0 & 6 & 5 & 1 & 0 \\
	0 & 0 & 6 & 5 & 1
\end{bmatrix}
\begin{bmatrix}
	a_0^{(p)} \\ a_1^{(p)} \\ a_2^{(p)} \\ a_3^{(p)} \\ a_4^{(p)}
\end{bmatrix}
$$

而
$$
\begin{bmatrix}
	a_0^{(p)} \\ a_1^{(p)} \\ a_2^{(p)} \\ a_3^{(p)} \\ a_4^{(p)}
\end{bmatrix}
=
\begin{bmatrix}
	p_1 \\
	p_1 +p_2 +p_3 \\
	p_1 +2p_2 +4p_3 \\
	p_1 +3p_2 +9p_3 \\
	p_1 +4p_2 +16p_3
\end{bmatrix}
=
\begin{bmatrix}
	1 & 0 & 0 \\
	1 & 1 & 1 \\
	1 & 2 & 4 \\
	1 & 3 & 9 \\
	1 & 4 & 16
\end{bmatrix}
\begin{bmatrix}
	p_1 \\ p_2 \\ p_3
\end{bmatrix}
$$

因此 $p_j$ 的聯立方程式為：
$$
\begin{bmatrix}
	F(2) \\ F(3) \\ F(4)
\end{bmatrix}
=
\begin{bmatrix}
	6 & 5 & 1 & 0 & 0 \\
	0 & 6 & 5 & 1 & 0 \\
	0 & 0 & 6 & 5 & 1
\end{bmatrix}
\begin{bmatrix}
	1 & 0 & 0 \\
	1 & 1 & 1 \\
	1 & 2 & 4 \\
	1 & 3 & 9 \\
	1 & 4 & 16
\end{bmatrix}
\begin{bmatrix}
	p_1 \\ p_2 \\ p_3
\end{bmatrix}
= AB
\begin{bmatrix}
	p_1 \\ p_2 \\ p_3
\end{bmatrix}
$$

展開後得到：
$$
AB
\begin{bmatrix}
	p_1 \\ p_2 \\ p_3
\end{bmatrix}
=
\begin{bmatrix}
	12 & 7 & 9 \\
	12 & 19 & 35 \\
	12 & 31 & 85
\end{bmatrix}
\begin{bmatrix}
	p_1 \\ p_2 \\ p_3
\end{bmatrix}
=
\begin{bmatrix}
	4 \\ 13 \\ 26
\end{bmatrix}
= F
$$

- 矩陣 $A$ 會被保存在 `SolveNonHomogExp._initPjEquationSystem()` 內的 `matrix_PLE`
- 矩陣 $B$ 會被保存在 [`this.PjLinearEquation`](#pjlinearequation)
- 矩陣 $AB$ 會被保存在 [`this.matrix_solvePj`](#matrix-solvepj)
- 矩陣 $F$ 會被保存在 [`this.nonHomogFn`](#nonhomogfn)

### Step3 解聯立方程式
由於 $AB$ 一定可逆，( 如果不可逆的話，比較係數法根本不成立 )<br>
因此
$$
\begin{bmatrix}
	p_1 \\ p_2 \\ p_3
\end{bmatrix}
= (AB)^{-1} F = P
$$

這一步會在 `SolveNonHomogExp._initSolvePj()` 內運算：<br>
1. 套上一層 `Array` 變成 `[this.nonHomogFn]`，因為 `Matrix` 建構子要求輸入一個二維陣列。
2. 傳入 `Matrix`，此時矩陣為 $\begin{bmatrix} 4 & 13 & 26 \end{bmatrix}$。
3. 轉置後變為矩陣 $F$。
4. 求 $(AB)^{-1} F$。
5. 因為要轉為 `Array`，所以要將 $P$ 轉置。
6. `.A` 回傳一個二維矩陣，但 $P$ 是個向量，因此 `.A[0]` 即可取出 [`this.PjAnswer`](#pjanswer)。
