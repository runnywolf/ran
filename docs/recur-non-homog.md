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
| props | type | 說明 |
| :- | :- | :- |
| `recurCoef` | `Array<Frac>` | 齊次部分的係數 |
| `nonHomoFunc` | `{ key: Frac }` | 非齊次部分的常數 |
| `cubic` | `SolveCubic` | 來自 Recur.vue 的特徵方程式的解 |
| `mlRecurNonHomogPrefix` | `Function` | link 待補 |

### `recurCoef`
同 [Recur - recurCoef](./recur#recurcoef)。

### `nonHomoFunc`
同 [Recur - nonHomoFunc](./recur#nonhomofunc)。

### `cubic`
link 待補。

### `mlRecurNonHomogPrefix`
link 待補。

## ref 變數
| ref var | type | 說明 |
| :- | :- | :- |
| `recur` | `SolveRecurNonHomog` | 齊次部分的係數 |

### `recur`
遞迴非齊次部分的計算結果，計算所需的變數和方法都封裝在內。<br>
參考 [SolveRecurNonHomog 內的變數](#solverecurnonhomog-內的變數)

當組件參數 `recurCoef`、`nonHomoFunc`、`cubic` 改變時會更新此值。

## 函數

### `termLatexNot0`
link 待補。

## `SolveRecurNonHomog` 內的變數
| `this.*` | type | 說明 |
| :- | :- | :- |
| `recurCoef` | `Array<Frac>` | 齊次部分的係數 |
| `nonHomoFunc` | `{ key: Frac }` | 非齊次部分的常數 |
| `cubic` | `SolveCubic` | 來自 Recur.vue 的特徵方程式的解 |
| `recurLevel` | `number` | 遞迴階數 |
| `combinedExpFunc` | `{ key: Array<Frac> }` | 含有相同指數項的多項式係數 |
| `varPiIndex` | `{ key: Array<number> }` | $a_n^{(p)}$ 當中 $p_i n^{k_i} {b_i}^n$ 項的編號 $i$ |
| `maxPi` | `number` | 未知係數 $p_i$ 的數量 |
| `homogRootConflictNum` | `{ key: number }` | 齊次解的某個特徵值 $b$ 的重根數<br>且 $b^n$ 在 $a_n^{(p)}$ 內 |
| `PiLinearEquation` | `Array<Array<Frac>>` | $p_i$ 的常係數<br>用 $p_i$ 表示 $a_n^{(p)}$ 的線性關係 |
| `nonHomogFn` | `Array<Frac>` | 非齊次部分 $F(n)$ 代入常數的結果 |
| `matrix_solvePi` | `Matrix` | $p_i$ 的聯立方程式 |
| `PiAnswer` | `Array<Frac>` | 解 $p_i$ 的聯立方程式得到的答案 |

`recurCoef`、`nonHomoFunc`、`cubic` 同 [組件參數](#組件參數)。

### `recurLevel`
遞迴階數，與 `recurCoef.length` 的值相同。

### `combinedExpFunc`
`nonHomoFunc` 的形式為 $\sum\limits_i c_i n^{k_i} {b_i}^n$ ，合併含有相同 ${b_i}^n$ 的項，<br>
轉為 `combinedExpFunc` 的 $\sum\limits_i f_i(n) {b_i}^n$ 形式。

對應至 `recur._initCombineExp()`

>	Example<br>
>	```js
>	nonHomoFunc = {
>		"0,-2/1": new Frac(3),
>		"1,-2/1": new Frac(3, 2),
>		"2,-2/5": new Frac(-6)
>	};
>	```
>	表示 $3 (-2)^n + \frac{3}{2} n (-2)^n -6 n^2 (\frac{-2}{5})^n$<br>
> <br>
>	轉為 $( 3 + \frac{3}{2} n )(-2)^n + ( -6 n^2 )(\frac{-2}{5})^n$
>	```js
>	combinedExpFunc = {
>		"-2/1": [ new Frac(3), new Frac(3, 2) ],
>		"-2/5": [ new Frac(0), new Frac(0), new Frac(-6) ]
>	};
>	```

### `varPiIndex`

### `maxPi`

### `homogRootConflictNum`

### `PiLinearEquation`

### `nonHomogFn`

### `matrix_solvePi`

### `PiAnswer`

## 解題步驟
