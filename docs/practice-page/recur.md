---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# Recur
齊次 / 非齊次遞迴解答生成器

用於解以下形式的遞迴：( 最高支援三階遞迴 )
$$
a_n = r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3} + F(n)
$$
$$
a_0 = s_0 ~,\enspace a_1 = s_1 ~,\enspace a_2 = s_2
$$

其中非齊次部分：
$$
F(n) = c_1 n^{k_1} {b_1}^n + \cdots
$$

參數型態：
$$
r_i ~,~ s_i ~,~ c_i ~,~ b_i \in \mathbb{Q} \quad;\quad k_i \in \{ 0, 1, 2, 3 \}
$$

## 組件參數
| props | type | 說明 |
| :- | :- | :- |
| `recurCoef` | `Array<Frac>` | 齊次部分的係數 |
| `nonHomoFunc` | `{ key: Frac }` | 非齊次部分的常數 |
| `initConst` | `Array<Frac>` | 初始條件 |

### `recurCoef`
遞迴式齊次部分的係數。<br>
`recurCoef = [ r1, r2, r3 ]` 對應至 $r_1, r_2, r_3$。

- `recurCoef.length` 必須為 1 ~ 3，代表遞迴的階數，若為 0 會顯示錯誤訊息。
- `recurCoef[-1]` 不建議為 `Frac(0)`，會導致遞迴降階。

> example<br>
> `recurCoef = [ new Frac(-3, 2), new Frac(6) ]` 代表
> $$
> a_n = \frac{-3}{2} a_{n-1} + 6 a_{n-2}
> $$

### `nonHomoFunc`
遞迴式非齊次部分的常數。

`nonHomoFunc = { "<k>,<bn>/<bd>": c, ... }` 代表非齊次部分有一項為
$$
c n^k \left( \frac{b_n}{b_d} \right)^n
$$

| 參數 | 值 | 說明 |
| :- | :- | :- |
| `<k>` | `String` | 多項式部分 $n^k$ <br> 目前只允許 `0 ~ 3` |
| `<bn>` 和 `<bd>` | `String` | 指數部分 $(b_n / b_d)^n$ <br> 可以透過 `Frac.fromStr("<bn>/<bd>")` 轉為 `Frac` |
| `c` | `Frac` | 係數 $c$ |

> example<br>
> ```js
> nonHomoFunc = {
> 	"0,1/1": new Frac(2),
> 	"0,-2/1": new Frac(3),
> 	"2,1/2": new Frac(-1, 2)
> }
> ```
> 代表
> $$
> 2 + 3 (-2)^n + \frac{-1}{2} n^2 \left( \frac{1}{2} \right)^n
> $$

### `initConst`
遞迴式的初始條件<br>
`initConst = [ s1, s2, s3 ]` 對應至 $s_1, s_2, s_3$。

必須滿足 `initConst.length == recurCoef.length`

> example<br>
> `initConst = [ new Frac(-3, 2), new Frac(6) ]` 代表
> $$
> a_0 = \frac{-3}{2} ~,\enspace a_1 = 6
> $$

## 遞迴變數 ( `class SolveRecur` )
組件參數 `recurCoef` 更新時，會更新 `recur = new SolveRecur(...)`

| variable | type | 說明 |
| :- | :- | :- |
| `recurCoef` | `Array<Frac>` | 同 `props.recurCoef` |
| `cubic` | `SolveCubic` | 特徵方程式的解 |
| `multiRootNum` | `Number` (`1, 2, 3`) | `cubic` 的最大重根數 |
| `frac_multiRoot` | `Frac \| null` |  `cubic` 的重根 |

| method | return | 說明 |
| :- | :- | :- |
| `makeCharLatex` | `String` | 特徵值 ( latex ) |
| `showNoRationalRoot` | `Boolean` | 特徵方程式的解 |
| `makeMultiRootHomogLatex` | `String` | `cubic` 的最大重根數 |
| `makeHomogFormLatex` | `String` |  `cubic` 的重根 |

### `cubic`
特徵方程式的解會保存在 `cubic`。<br>

特徵方程式移項、乘 $t$ 後得到三次函數 $t^3 - r_1 t^2 - r_2 t - r_3 = 0$，<br>
這樣 1 ~ 3 階遞迴對應的函數都可以使用 `SolveCubic` 求特徵值。<br>
乘 $t$ 產生的 $0$ 特徵值將在後續步驟被忽略，並不影響齊次解形式。

### `multiRootNum`
特徵方程式的最大重根數。

使用 `cubic.getDoubleRoot()` 和 `cubic.getTripleRoot()` 取得二、三重根，<br>
若不存在會得到 `null`。

由於 `getTripleRoot()` 在數學定義上會與 `getDoubleRoot()` 同時存在，<br>
所以必須先檢查三重根是否存在，再檢查二重根。

### `frac_multiRoot`
特徵方程式的重根，若不存在重根則為 `null`。

由於特徵方程式最高次數為 3，所以三重根與二重根值相同，<br>
因此 `frac_multiRoot` 必等於 `cubic.getDoubleRoot()`。

### 生成遞迴通解的形式
根據 `cubic` 的多種解形式和其他因素，以下列出齊次解的所有形式：
| `solutionType()` | 額外條件 | 齊次解形式 ( 只有 $h_i$ 為未知係數 ) | 通解運算形式 |
| :- | :- | :- | :- |
| `TYPE_3FRAC` | `multiRootNum == 1` | $h_1 {r_1}^p + h_2 {r_2}^p + h_3 {r_3}^p$ | `TYPE_NORMAL`<br>`Frac` 型態 |
| `TYPE_3FRAC` | `multiRootNum == 2` | $h_1 {r_1}^p + h_2 n {r_2}^p + h_3 {r_3}^p$ | `TYPE_NORMAL`<br>`Frac` 型態 |
| `TYPE_3FRAC` | `multiRootNum == 3` | $h_1 {r_1}^p + h_2 n {r_2}^p + h_3 n^2 {r_3}^p$ | `TYPE_NORMAL`<br>`Frac` 型態 |
| `TYPE_FRAC_QUAD` | `cubic.quad.s` $= 0, 1$ | 會自動轉為 `TYPE_3FRAC` | - |
| `TYPE_FRAC_QUAD` | `cubic.quad.s` $\gt 0$ | $h_1 \left( \frac{ n + m \sqrt{s} }{d} \right)^p + h_2 \left( \frac{ n - m \sqrt{s} }{d} \right)^p + h_3 {r_3}^p$ | `TYPE_SQRT`<br>`Frac` 型態 |
| `TYPE_FRAC_QUAD` | `cubic.quad.s` $\lt 0$ | $h_1 \cos(p \theta) r^p + h_2 \sin(p \theta) r^p + h_3 {r_3}^p$ <br> $r = \frac{ \sqrt{n^2 - m^2 s} }{d} ~~,~~ \theta = \tan^{-1}(\frac{ m \sqrt{-s} }{n})$ | `TYPE_SQRT`<br>`Frac` 型態 |
| `TYPE_3REAL` | - | $h_1 {r_1}^p + h_2 {r_2}^p + h_3 {r_3}^p$ | `TYPE_NORMAL`<br>`float` 型態 |
| `TYPE_REAL_IM` | - | $h_1 \cos(p \theta) r^p + h_2 \sin(p \theta) r^p + h_3 {r_3}^p$ <br> $r = \sqrt{ { c_{re} }^2 + { c_{im} }^2 } ~~,~~ \theta = \tan^{-1}(\frac{ c_{im} }{ c_{re} })$ | `TYPE_SQRT`<br>`float` 型態 |

## 解題步驟
解題步驟的實作細節。

### 顯示遞迴關係式
使用 `RanMath` 的 `makeRecurLatex` 製作。

### step1 - 齊次部分
顯示 " $a_n = r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}$ "

對應至 `makeRecurHomogLatex()`

1. 利用 `mlTerm(frac_r, "a_{n-${i+1}}", 1)` 生成出 " $+~ r_i a_{n-i}$ "
2. 將每一項的 latex 字串拼接起來，此時為 " $+ r_1 a_{n-1} + r_2 a_{n-2}$ "。<br>
   若 `mlTerm` 回傳 `+0` 代表該項為 0，不顯示。
3. 若拼接完成的字串為 `""`，代表所有齊次遞迴係數都為 0，顯示 " $0$ "。
4. 開頭要加上 " $a_n =$ "，所以如果 latex 字串開頭為 + 要去除。

### step1 - 特徵方程式
顯示 " $t^l = r_1 t^{l-1} + r_2 t^{l-2} + r_3 t^{l-3}$ "，$l$ 為遞迴階數。

1. 利用 `mlTerm(frac_r, "t", l-i-1)` 生成出 " $r_i t^{l-i}$ "。

2, 3, 4 步與 [step1 - 齊次部分](#step1-齊次部分) 類似。

### step1 - 特徵值
顯示特徵方程式的解。

對應至 `recur.makeCharLatex()`

| 當遞迴階數 ==<br>(`recurCoef.length`) | `makeCharLatex()` 回傳 | 說明 |
| :- | :- | :- |
| 未傳入遞迴 | `?` | - |
| `1` | `recurCoef[0].toLatex()` | 特徵多項式 $t = r_1$ 的特徵值為 $r_1$ |
| `2` | `cubic.quad.toLatex()` | 因為 `cubic.frac_r1` 必為 `0`<br>直接回傳二次函數的解 ( latex ) |
| `3` | `cubic.toLatex()` | 三次函數的解 ( latex ) |

### step1 - 不存在有理數特徵值的提醒
如果特徵方程式不存在有理根，顯示 "(!) 不存在有理根" 的訊息在特徵值右側。

對應至 `recur.showNoRationalRoot()`

`cubic.frac_r1 === undefined` 與<br>`type !== SolveCubic.TYPE_3FRAC && type !== SolveCubic.TYPE_FRAC_QUAD` 等價。

`cubic.solutionType()` 若不為 `SolveCubic.TYPE_3FRAC` 或 `SolveCubic.TYPE_FRAC_QUAD`，<br>
則三次函數不存在有理數根，後續計算都採浮點運算。

顯示的浮點數值都到小數點後四位。

### step1 - 重根提示
如果特徵方程式有重根特徵值，顯示 " 有 n 重根 ?，需要設 ... 保證線性獨立 "。

對應至 `recur.makeMultiRootHomogLatex()`

| if `multiRootNum` == | `makeMultiRootHomogLatex()` 回傳 |
| :- | :- |
| 1 | " $?$ " |
| 2 | " $h_1 b^n + h_2 n b^n$ " |
| 3 | " $h_1 b^n + h_2 n b^n + h_3 n^2 b^n$ " |

$b^n$ 由 `mlTerm(1, dRoot, "n", false)` 生成。

### step1 - 齊次解的形式
顯示齊次解 $a_n^{(h)} = h_1 {b_1}^n + h_2 {b_2}^n + h_3 {b_3}^n$

對應至 `recur.makeHomogFormLatex()`

使用 `makeExpLatex("h_i ", frac_r)` 來製作 " $h_i r^n$ " ( latex )

| if `solutionType()` == | if `multiRootNum` == | `makeHomogFormLatex()` 回傳 |
| :- | :- | :- |
| `TYPE_3FRAC` | `3` | `multiRootHomogLatex` |
| `TYPE_3FRAC` | `2` | `multiRootHomogLatex` + " $h_3 r^n$ " ( 剩餘根 ) |
| `TYPE_3FRAC` | `1` | " $h_1 {r_1}^n + h_2 {r_2}^n + h_3 {r_3}^n$ " |
| `TYPE_FRAC_QUAD` | 無重根 | `cubic.quad.toLatex()` 回傳的解一定包含 " $\pm$ "<br>將 $\pm$ 替換為 $+$ 和 $-$ 來製作兩個根的 latex，<br>加上剩餘一根 `cubic.frac_r1` 後回傳 |
| `TYPE_3REAL` | 無重根 | " $h_1 {r_1}^n + h_2 {r_2}^n + h_3 {r_3}^n$ " |
| `TYPE_REAL_IM` | 無重根 | " $h_1 (c_{re} + c_{im} i)^n + h_2 (c_{re} - c_{im} i)^n + h_3 {r_3}^n$ " |

### step2 - 非齊次部分

### step2 - 特解的形式

### step2 - 保持特解線性獨立

### step3 - 通解的形式

### step3 - 解聯立方程式

### 遞迴的一般式
