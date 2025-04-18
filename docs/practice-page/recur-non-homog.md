---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# RecurNonHomog.vue
> [!WARNING]
> 這個組件是 [Recur.vue](./recur) 拆分出的子組件，你不應該單獨使用它。

用於計算非齊次遞迴的特解，並且顯示計算過程。

## 描述
輸入遞迴的非齊次部分
$$
F(n) = c_1 n^{k_1} {b_1}^n + c_2 n^{k_2} {b_2}^n + \cdots
$$
$$
c_i ~,~ b_i \in \mathbb{Q} \quad;\quad k_i \in \{ 0, 1, 2, 3 \}
$$

輸出遞迴的特解
$$
a_n^{(p)} = p_1 n^{k_1} {b_1}^n + p_2 n^{k_2} {b_2}^n + \cdots
$$
$$
p_i ~,~ b_i \in \mathbb{Q} \quad;\quad k_i \in \mathbb{N}
$$

## 組件參數
| `props.` | Type | Description |
| :- | :- | :- |
| `recurCoef` | `Array<Frac>` | 齊次部分的係數 |
| `nonHomoFunc` | `{ key: Frac }` | 非齊次部分的常數 |
| `cubic` | `SolveCubic` | 來自 Recur.vue 的特徵方程式的解 |
| `recurNonHomogLatex` | `String` | link 待補 |

### `recurCoef`
同 [Recur - recurCoef](./recur#recurcoef)。

### `nonHomoFunc`
同 [Recur - nonHomoFunc](./recur#nonhomofunc)。

### `cubic`
link 待補。

### `recurNonHomogLatex`
link 待補。

## emit
| `emit` | Type | Description |
| -------- | ---- | ---- |
| `particular` | `{ key: Array<Frac> }` | 非齊次遞迴的特解 |

### `particular`
非齊次遞迴的特解，由 [`SolveNonHomog.getParticular`](#getparticular) 生成。

當未知係數 $p_j$ 全部計算完成時，上傳結果至 [`Recur.vue`](./recur)。

> Example
> ```js
> particular = [
> 	"1/1": [ new Frac(0), new Frac(-2), new Frac(6) ],
> 	"-2/3": [ new Frac(-2, 7) ],
> 	"-3/1": [ new Frac(0), new Frac(0), new Frac(1) ]
> ];
> ```
> 表示：
> $$
> a_n^{(p)} = -2n + 6n^2 + \frac{-2}{7} \left( \frac{-2}{3} \right)^n + n^2 (-3)^n
> $$

## `SolveNonHomog` 的變數
建構子參數 `recurCoef`、`nonHomoFunc`、`cubic` 同 [組件參數](#組件參數)。

| `this.` | Type | Description |
| :-- | :-- | :-- |
| `recurLevel` | `number` ( `int` ) | 遞迴階數 |
| `combinedExpFunc` | `{ key: Array<Frac> }` | 含有相同指數項 ${b_i}^n$ 的多項式之中的係數 |
| `varPjIndex` | `{ key: Array<number> }` | 特解的未知係數 $p_j$ 的編號 $j$ |
| `PjNum` | `number` ( `int` ) | 特解的未知係數 $p_j$ 的數量 |
| `homogRootConflictNum` | `{ key: number }` | 齊次解的某個特徵值 $b$ 的重根數<br>且 $b^n$ 在 $a_n^{(p)}$ 內 |

### `recurLevel`
遞迴階數，與 `recurCoef.length` 的值相同。

### `combinedExpFunc`
非齊次部分 [`nonHomoFunc`](#nonhomofunc) 的形式為 $\sum\limits_i c_i n^{k_i} {b_i}^n$ ，合併含有相同 ${b_i}^n$ 的項，<br>
轉為 `combinedExpFunc` 的 $\sum\limits_i f_i(n) {b_i}^n$ 形式。

會在 `SolveNonHomog._initCombineExp()` 內計算。

>	Example<br>
>	```js
>	nonHomoFunc = {
>		"0,-2/1": new Frac(3),
>		"1,-2/1": new Frac(3, 2),
>		"2,-2/5": new Frac(-6)
>	};
>	```
>	表示 $3 (-2)^n + \frac{3}{2} n (-2)^n -6 n^2 (\frac{-2}{5})^n$<br>
> $$
> \downarrow
> $$
>	轉為 $( 3 + \frac{3}{2} n )(-2)^n + ( -6 n^2 )(\frac{-2}{5})^n$
>	```js
>	combinedExpFunc = {
>		"-2/1": [ new Frac(3), new Frac(3, 2) ],
>		"-2/5": [ new Frac(0), new Frac(0), new Frac(-6) ]
>	};
>	```

### `varPjIndex`
特解當中的未知係數 $p_j$ 的編號 $j$。

因為特解 $a_n^{(p)}$ 之中假設的 $g_i(n)$ 的次數要跟非齊次部分 $F(n)$ 當中的 $f_i(n)$ 相同，<br> 
所以結構與 [`combinedExpFunc`](#combinedexpfunc) 相同。

會在 `SolveNonHomog._initNumberTheUnknownPj()` 內計算。

> Example
> ```js
> combinedExpFunc = {
> 	"1/1": [ new Frac(0), new Frac(2) ],
> 	"-2/1": [ new Frac(3), new Frac(3, 2) ],
> 	"-2/5": [ new Frac(0), new Frac(0), new Frac(-6) ]
> };
> ```
> 若非齊次部分為：
> $$
> F(n) = \sum\limits_i f_i(n) {b_i}^n = (2n)1^n + ( 3 + \frac{3}{2} n )(-2)^n + ( -6 n^2 )(\frac{-2}{5})^n
> $$
> 猜測特解的形式為：
> $$
> a_n^{(p)} = \sum\limits_i g_i(n) {b_i}^n = (p_1 + p_2 n)1^n + ( p_3 + p_4 n )(-2)^n + ( p_5 + p_6 n + p_7 n^2 )(\frac{-2}{5})^n
> $$
> ```js
> varPjIndex = {
> 	"1/1": [ 1, 2 ],
> 	"-2/1": [ 3, 4 ],
> 	"-2/5": [ 5, 6, 7 ]
> };
> ```

### `PjNum`
特解的未知係數 $p_j$ 的數量。

參考上個範例的 `varPjIndex`，可知 `PjNum = 7`。

會在 `SolveNonHomog._initNumberTheUnknownPj()` 內計算。

### `homogRootConflictNum`
當齊次與非齊次部分都存在相同的指數部分 ${b_i}^n$ 時，需要額外乘上 $n^k$ 保證線性獨立。

- 若 $a_n^{(h)}$ 存在 ${b_i}^n$ 項，需要額外乘上 $n^1$，變成 $(p_s n + p_{s+1} n^2 + \cdots) {b_i}^n$。
- 若 $a_n^{(h)}$ 存在 ${b_i}^n$、$n {b_i}^n$ 項，需要額外乘上 $n^2$，變成 $(p_s n^2 + p_{s+1} n^3 + \cdots) {b_i}^n$。

以此類推

會在 `SolveNonHomog._initConflictRoot()` 內計算。

Example<br>
若齊次部分為 $a_n^{(h)} = h_1 1^n + h_2 (-2)^n + h_3 n (-2)^n$、<br>
非齊次部分為 $a_n^{(p)} = (p_1 + p_2 n) 1^n + p_3 (-2)^n + p_4 3^n$

則
```js
homogRootConflictNum = { "1/1": 1, "-2/1": 2 };
```

## `SolveNonHomogExp` 的方法
`ml` 是 `makeLatex` 的縮寫。

| Method | Return | Description |
| :- | :- | :- |
| `_initCombineExp` | `void` | 計算 `combinedExpFunc` |
| `_initNumberTheUnknownPj` | `void` | 計算 `varPjIndex` 和 `PjNum` |
| `_initConflictRoot` | `void` | 計算 `homogRootConflictNum` |
| `_mlExpTerm` | `String` | 生成 " $(* + *n + *n^2 + \cdots) b^n$ "<br>( LaTeX ) |
| `mlCombinedExp` | `String` | 合併後的齊次部分 ( LaTeX ) |
| `mlParticularForm` | `String` | 假設的特解形式 ( LaTeX ) |
| `mlExistHomogExp` | `String` | 齊次部分之中的相同指數項 ${b_i}^n$<br>( LaTeX ) |
| `mlExistParticularExp` | `String` | 特解形式之中的相同指數項 ${b_i}^n$<br>( LaTeX ) |
| `mlChangeExpList` | `Array<[String, String]>` | 特解乘上 $n^k$ 的前後變化 ( LaTeX ) |
| `mlNewParticularForm` | `String` | 新的特解形式 ( LaTeX ) |
| `mlParticularIntoRecur` | `String` | $a_n^{(p)}$ 填入原遞迴關係 ( LaTeX ) |
| `mlParticularIntoRecurTrans` | `String` | `mlParticularIntoRecur`<br>移項後的結果 ( LaTeX ) |
| `mlParticularIntoRecurWhere` | `String` | 再顯示一次 `mlNewParticularForm`<br>與 `mlCombinedExp` ( LaTeX ) |
| `mlParticular` | `String` | 計算完成的特解 ( LaTeX ) |
| `getParticular` | `{ key: Array<Frac> }` | 生成特解的資訊，<br>用於 `emit` 至 `Recur.vue` |

### `_mlExpTerm`
`_mlExpTerm(s_frac_b, isUnknownCoef, extraNPow = 0) -> String`<br>
生成 " $(* + *n + *n^2 + \cdots) b^n$ " 形式的 latex 語法。

| Param | Type | Description |
| :- | :- | :- |
| `s_frac_b` | `String` | $b^n$ 的底數 $b$，會透過 `Frac.fromStr` 轉為 `Frac` |
| `isUnknownCoef` | `boolean` | `isUnknownCoef == true` 生成 " $(p_s + p_{s+1}n + \cdots) b^n$ " ( 特解 )<br>其中 $p_j$ 為未知係數<br>`isUnknownCoef == false` 生成 " $(c_s + c_{s+1}n + \cdots) b^n$ " ( 非齊次 )<br>其中 $c_j$ 為已知係數 |
| `extraNPow` | `number` | 將生成結果乘上 $n^k$<br>可以參考 [`homogRootConflictNum`](#homogrootconflictnum)

### `mlParticular`
計算完成的特解的 latex。

### `getParticular`
生成特解的資訊，用於 `emit` 至 `Recur.vue`。

回傳值的範例請參考 [`particular`](#particular)。

### 組件顯示的解題過程
遞迴的非齊次部分為
<div style="text-align: center;"><code>props.recurNonHomogLatex</code></div>

合併相同的指數項：
$$F(n) = \sum\limits_{i} f_i(n) {b_i}^n = \text{recur.mlCombinedExp()}$$

猜測特解的形式為：
<div style="text-align: center;"><code>recur.mlParticularForm()</code></div>

其中多項式 $g_i(n)$ 的次數應與 $f_i(n)$ 相同。<br>
<br>
檢查齊次解 $a_n^{(h)}$ 和特解 $a_n^{(p)}$ 之中是否存在相同的指數部分 ${b_i}^n$：
| 如果... | 顯示的 ui ( 解題過程 ) |
| :- | :- |
| 存在 | 由於 `recur.mlExistHomogExp()` 已出現在 $a_n^{(h)}$ 之中，<br>若特解 $a_n^{(p)}$ 也包含同樣項次 `recur.mlExistParticularExp()` 會導致與齊次解重疊，<br>為了保證特解與齊次解的線性獨立性，需要將<br>*- 以下遍歷 `recur.mlChangeExpList()` 產生的列表 -*<br> ... 改為 ...<br> ... 改為 ... |
| 不存在 | $\Rightarrow$ 不存在相同的指數部分。 |

因此特解的形式為：
<div style="text-align: center;"><code>recur.mlNewParticularForm()</code></div>

將 $a_n^{(p)}$ 代入原遞迴關係： ( 將 $a_n$ 替換為 $a_n^{(p)}$ 即可，不要將形式代入 )
<div style="text-align: center;"><code>recur.mlParticularIntoRecur()</code></div>

移項後得到： ( 式 1 )
<div style="text-align: center;"><code>recur.mlParticularIntoRecurTrans()</code></div>

其中
<div style="text-align: center;"><code>recur.mlParticularIntoRecurWhere()</code></div>

接下來需要對每個指數項 ${b_i}^n$ 對應的多項式，分別求未知係數 $p_j$。

...<br>
一些組件 `RecurNonHomogExp.vue`<br>
...<br>

將 $p_j$ 代回 $a_n^{(p)}$，得到特解為
<div style="text-align: center;"><code>particularLatex</code></div>

## ref 變數
| `ref` | Type | Description |
| :-- | :-- | :-- |
| `recur` | [`SolveNonHomog`](#solvenonhomog-的變數) | 特解的未知係數 $p_j$ 的計算過程 |
| `PjBuffer` | `{ key: Array<Frac> }` | 用於暫存多個 [`RecurNonHomogExp.vue`](./recur-non-homog-exp) 回傳的 $p_j$ |
| `particularLatex` | `String` | 計算完成的特解 ( LaTeX ) |

### `recur`
特解的未知係數 $p_j$ 的計算過程，計算所需的變數和方法都封裝在內。

當組件參數 `recurCoef`、`nonHomoFunc`、`cubic` 改變時會更新此值。

### `PjBuffer`
用於暫存多個 [`RecurNonHomogExp.vue`](./recur-non-homog-exp) 回傳的 $p_j$。

### `particularLatex`
計算完成的特解 ( LaTeX )，由 `SolveNonHomogExp.mlParticular` 生成。

## 解題過程
請自行至 app 內測試。
