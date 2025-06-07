---
outline: [2, 3] # 顯示 h2, h3
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css # katex 語法支援
---

# Matrix - 矩陣
矩陣運算，矩陣的元素的型態為 [EF - 擴張體](./ef)。
$$A \in { \mathbb{Q}(\sqrt{s})^{ n \times m } } ~,~ s \in \mathbb{Z}$$
就把 `float` $\mathbb{C}$ 當作 $\mathbb{Q}(\sqrt{-1})$ 吧 ...，反正基底 $\sqrt{s}$ 要一樣就是了。

## Import
```js
import { Matrix } from "ran-math";
```

## Properties & Methods
建構子：[`Matrix constructor`](#matrix-constructor)

| Property | Type | Description |
| :- | :- | :- |
| [`.n`](#n-m-arr) | `number` ( `int` ) | 矩陣的列數 |
| [`.m`](#n-m-arr) | `number` ( `int` ) | 矩陣的行數 |
| [`.arr`](#n-m-arr) | `Array<Array<EF>>` | 矩陣 |

| Method | Description |
| :- | :- |
| [`Matrix.isMatrix`](#) | 檢查輸入值是否為 `Matrix` 的實例 |
| [`Matrix.createI`](#) | 生成單位矩陣 $I$ |
| [`.copy`](#) | 回傳一個相同值的新實例 |
| [`.toStr`](#) | 轉字串 |
| [`.swapRow`](#) | 矩陣列運算：交換 $i, j$ 兩列 ( 不回傳新矩陣 ) |
| [`.scaleRow`](#) | 矩陣列運算：列 $i$ 乘純量 $s$ (不回傳新矩陣) |
| [`.addRow`](#) | 矩陣列運算：列 $i$ 乘純量 $s$ 加到列 $j$ (不回傳新矩陣) |
| [`.trans`](#) | 轉置 |
| [`.inverse`](#) | 反矩陣 |
| [`.add`](#) | 矩陣加法 |
| [`.mul`](#) | 矩陣乘法 |
| [`.muls`](#) | 純量乘矩陣 |

## `Matrix.isMatrix`
檢查參數 `value` 是否為 `Matrix` 的實例，與 `value instanceof Matrix` 等價。

```js
Matrix.isMatrix(value: any): boolean
```

| Param | Type | Description |
| :- | :- | :- |
| `value` | `any` | 要檢查的值 |

範例：
```js
Matrix.isEF(new Matrix(3, 3, (i, j) => i + j)) // true
Matrix.isEF([[1, 2], [3, 4]])                  // false
```

## `Matrix.createI`
生成 $n$ 階單位矩陣 $I_n$。

```js
Matrix.createI(n: number): Matrix
```

| Param | Type | Description |
| :- | :- | :- |
| `n` | `number` ( `int` ) | $n$ 必須為正整數 |

範例：
```js
Matrix.createI(3) // 生成 3*3 的單位矩陣
// | 1 | 0 | 0 |
// | 0 | 1 | 0 |
// | 0 | 0 | 1 |
```

## `Matrix constructor`
類別 `Matrix` 的建構子。
$$A \in { \mathbb{Q}(\sqrt{s})^{ n \times m } } ~,~ s \in \mathbb{Z}$$

```js
new Matrix(
	n: number,
	m: number,
	initFunc: (i: number, j: number) => number | Frac | EF
): Matrix
```

| Param | Type | Description |
| :- | :- | :- |
| `n` | `number` ( `int` ) | 矩陣的列數 |
| `m` | `number` ( `int` ) | 矩陣的行數 |
| `initFunc` | `(i: number, j: number) => number \| Frac \| EF` | 回傳矩陣元素 $A_{ij}$ |

範例：
```js
// 生成 3*3 零矩陣
let matrix_zero = new Matrix(3, 3, () => 0);
```
```js
// 生成 R^3 向量 [ 2, -3/4, 2+√2 ]^T
const testVec = [2, F(-3, 4), new EF(2, 1, 2)]
let matrix_vec3 = new Matrix(3, 1, i => testVec[i]);
```
```js
// Array<Array> 轉 Matrix
const testArr = [
	[1, 2, 3],
	[4, 5, 6]
];
let matrix_test = new Matrix(2, 3, (i, j) => testArr[i][j]);
```

## `.n` `.m` `.arr`
```js
Matrix.prototype.n: number             // 矩陣的列數
Matrix.prototype.m: number             // 矩陣的行數
Matrix.prototype.arr: Array<Array<EF>> // 矩陣, 元素為 EF 型態
```

> [!CAUTION]
> 屬性 `n` `m` `arr` 為唯讀 ( read only )。

## `.copy`
回傳一個相同值的新實例。

```js
Matrix.prototype.copy(): Matrix
```

範例：
```js
new Matrix(3, 3, (i, j) => i + j).copy()
// | 0 | 1 | 2 |
// | 1 | 2 | 3 |
// | 2 | 3 | 4 |
```

## `.toStr`
轉 debug 字串。

```js
Matrix.prototype.toStr(): string
```

範例：
```js
const matrix = new Matrix(3, 3,
	(i, j) => new EF(F(i-j, i+2), F(i-j+1, j+2), F((i+j+1)*j, 7))
);
console.log(matrix.toStr());
// | 0   | -1/2           | -1 + -1/28 √ 42 |
// | 1/3 | 1/21 √ 21      | -1/3            |
// | 1/2 | 1/4 + 4/21 √ 7 | 1/28 √ 70       |
```

## `.swapRow`
矩陣列運算：交換 $i, j$ 兩列 ( 不回傳新矩陣 )。

```js
Matrix.prototype.swapRow(i: number, j: number): void
```

| Param | Type | Description |
| :- | :- | :- |
| `i` | `number` ( `int` ) | 列 $i$ |
| `j` | `number` ( `int` ) | 列 $j$ |

範例：
```js
new Matrix(3, 3, (i, j) => i + j).swapRow(0, 1)
// | 0 | 1 | 2 |    | 1 | 2 | 3 | <- Swapped
// | 1 | 2 | 3 | -> | 0 | 1 | 2 | <- Swapped
// | 2 | 3 | 4 |    | 2 | 3 | 4 |
```

## `.scaleRow`
矩陣列運算：列 $i$ 乘純量 $s$ (不回傳新矩陣)。

```js
Matrix.prototype.scaleRow(i: number, s: number|Frac|EF): void
```

| Param | Type | Description |
| :- | :- | :- |
| `i` | `number` ( `int` ) | 列 $i$ |
| `s` | `number \| Frac \| EF` | 純量 $s$ |

範例：
```js
new Matrix(3, 3, (i, j) => i + j).scaleRow(2, F(-1, 2))
// | 0 | 1 | 2 |    | 0  | 1    | 2  |
// | 1 | 2 | 3 | -> | 1  | 2    | 3  |
// | 2 | 3 | 4 |    | -1 | -3/2 | -2 | <- After *(-1/2)
```

## `.addRow`
矩陣列運算：列 $i$ 乘純量 $s$ 加到列 $j$ (不回傳新矩陣)。

```js
Matrix.prototype.addRow(i: number, j: number, s: number|Frac|EF): void
```

| Param | Type | Description |
| :- | :- | :- |
| `i` | `number` ( `int` ) | 列 $i$ |
| `j` | `number` ( `int` ) | 列 $j$ |
| `s` | `number \| Frac \| EF` | 純量 $s$ |

範例：
```js
new Matrix(3, 3, (i, j) => i + j).addRow(2, 0, F(-1, 2))
// | 0 | 1 | 2 |    | -1 | -1/2 | 0 | <- Added
// | 1 | 2 | 3 | -> | 1  | 2    | 3 |
// | 2 | 3 | 4 |    | 2  | 3    | 4 |
```

## `.trans`
將矩陣轉置。
$$A^T$$

```js
Matrix.prototype.trans(): Matrix
```

範例：
```js
const testArr = [
	[5, 3, -7],
	[1, 0, 6],
	[2, 2, 3]
];
new Matrix(3, 3, (i, j) => testArr[i][j]).trans()
// | 5  | 1 | 2 |
// | 3  | 0 | 2 |
// | -7 | 6 | 3 |
```

## `.inverse`
反矩陣，利用 [Gauss-Jordan Elimination](https://en.wikipedia.org/wiki/Gaussian_elimination#Finding_the_inverse_of_a_matrix)。
$$A^{-1} \quad;\quad \det(A) \neq 0 $$

```js
Matrix.prototype.inverse(): Matrix
```

範例：
```js
const testArr = [
	[5, -2, 3],
	[1, 2, -7],
	[0, -6, 2]
];
new Matrix(3, 3, (i, j) => testArr[i][j]).inverse()
// | 19/102 | 7/102  | -2/51   |
// | 1/102  | -5/102 | -19/102 |
// | 1/34   | -5/34  | -1/17   |
```

## `.add`
矩陣加法。
$$A + B \quad;\quad A, B \in { \mathbb{Q}(\sqrt{s})^{ n \times m } } ~,~ s \in \mathbb{Z}$$

```js
Matrix.prototype.add(matrix: Matrix): Matrix
```

| Param | Type | Description |
| :- | :- | :- |
| `matrix` | `Matrix` | 矩陣 $B$ |

範例：
```js
const matrix = new Matrix(3, 3, (i, j) => i + j);
matrix.add(matrix)
// | 0 | 2 | 4 |
// | 2 | 4 | 6 |
// | 4 | 6 | 8 |
```

## `.mul`
矩陣乘法。
$$
AB \quad;\quad
A \in { \mathbb{Q}(\sqrt{s})^{ n \times m } } ~,~
B \in { \mathbb{Q}(\sqrt{s})^{ m \times l } } ~,~
s \in \mathbb{Z}
$$

```js
Matrix.prototype.mul(matrix: Matrix): Matrix
```

| Param | Type | Description |
| :- | :- | :- |
| `matrix` | `Matrix` | 矩陣 $B$ |

範例：
```js
const matrix = new Matrix(3, 3, (i, j) => i + j);
matrix.mul(matrix)
// 懶得 copy, 你執行這段 code 就知道了
```

## `.muls`
純量乘矩陣。
$$
sA \quad;\quad
s \in { \mathbb{Q}(\sqrt{s}) } ~,~
A \in { \mathbb{Q}(\sqrt{s})^{ n \times m } } ~,~
s \in \mathbb{Z}
$$

```js
Matrix.prototype.muls(s: number|Frac|EF): Matrix
```

| Param | Type | Description |
| :- | :- | :- |
| `s` | `number \| Frac \| EF` | 純量 $s$ |

範例：
```js
const matrix = new Matrix(3, 3, (i, j) => i + j);
matrix.muls(2)
// | 0 | 2 | 4 |
// | 2 | 4 | 6 |
// | 4 | 6 | 8 |
```
