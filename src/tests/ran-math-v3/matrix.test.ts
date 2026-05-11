import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { F, Frac, Matrix } from "@lib/ran-math-v3";

function M(arr: (number|bigint)[][]): Matrix<Frac> { // matrix 工廠
	return new Matrix(arr.length, arr[0].length, (i, j) => F(arr[i][j]));
}

const testDatas: Record<string, TestData> = {
	"Matrix.is": {
		testName: (x: any) => `Matrix.is(${str(x)})`,
		testFunc: (x: any) => Matrix.is(x),
		tests: [ // 測資
			{ input: [ M([[1]]) ], output: true },
			{ input: [ [[F(1)]] ], output: false },
			{ input: [ F(1) ], output: false },
		],
	},
	"Matrix.diag": {
		testName: (m: number, a: Frac, b: Frac) => `Matrix.diag(${m}, ${str(a)}, ${str(b)})`,
		testFunc: (m: number, a: Frac, b: Frac) => Matrix.diag(m, a, b),
		tests: [ // 測資
			{ input: [ 1, F(1), F(0) ], output: M([[1]]) },
			{ input: [ 2, F(0), F(1) ], output: M([[0, 1], [1, 0]]) },
			{ input: [ 3, F(1), F(0) ], output: M([[1, 0, 0], [0, 1, 0], [0, 0, 1]]) },
			{ input: [ 3, F(2), F(-1) ], output: M([[2, -1, -1], [-1, 2, -1], [-1, -1, 2]]) },
			{ input: [ 0, F(1), F(0) ], error: Matrix.NonPosIntDimensionError },
			{ input: [ -2, F(1), F(0) ], error: Matrix.NonPosIntDimensionError },
			{ input: [ 2.5, F(1), F(0) ], error: Matrix.NonPosIntDimensionError },
		],
	},
	"constructor": {
		testName: (m: number, n: number) => `new Matrix(${m}, ${n}, ...)`,
		testFunc: (m: number, n: number) => new Matrix(m, n, (i, j) => F(i + j)),
		tests: [ // 測資
			{ input: [ 2, 3 ], output: M([[0, 1, 2], [1, 2, 3]]) },
			{ input: [ 0, 3 ], error: Matrix.NonPosIntDimensionError },
			{ input: [ 2, 0 ], error: Matrix.NonPosIntDimensionError },
			{ input: [ 1.5, 3 ], error: Matrix.NonPosIntDimensionError },
		],
	},
	".toStr": {
		testName: (matrix: Matrix<Frac>) => `${str(matrix)}.toStr()`,
		testFunc: (matrix: Matrix<Frac>) => matrix.toStr(),
		tests: [ // 測資
			{ input: [ M([[1, -20], [300, 4]]) ], output: "|   1 | -20 |\n| 300 |   4 |" },
		],
	},
	".toLatex": {
		testName: (matrix: Matrix<Frac>, mode?: "m"|"pm"|"bm"|"vm") => `${str(matrix)}.toLatex(${str(mode)})`,
		testFunc: (matrix: Matrix<Frac>, mode?: "m"|"pm"|"bm"|"vm") => matrix.toLatex(mode),
		tests: [ // 測資
			{
				input: [ new Matrix(2, 2, (i, j) => F(i + 1, j + 1)) ],
				output: "\\def\\arraystretch{1.35}\\!\\begin{bmatrix}1&\\frac{1}{2}\\\\2&1\\end{bmatrix}\\!\\def\\arraystretch{1}"
			},
			{
				input: [ new Matrix(2, 2, (i, j) => F(i + 1, j + 1)), "pm" ],
				output: "\\def\\arraystretch{1.35}\\begin{pmatrix}1&\\frac{1}{2}\\\\2&1\\end{pmatrix}\\def\\arraystretch{1}"
			},
		],
	},
	".swapRow": {
		testName: (matrix: Matrix<Frac>, i: number, j: number) => `${str(matrix)}.swapRow(${i}, ${j})`,
		testFunc: (matrix: Matrix<Frac>, i: number, j: number) => {
			matrix.swapRow(i, j);
			return matrix;
		},
		tests: [ // 測資
			{ input: [ M([[1, 2], [3, 4], [5, 6]]), 0, 2 ], output: M([[5, 6], [3, 4], [1, 2]]) },
			{ input: [ M([[1, 2, 3]]), 0, 0 ], output: M([[1, 2, 3]]) },
			{ input: [ M([[1], [2], [3], [4]]), 1, 3 ], output: M([[1], [4], [3], [2]]) },
			{ input: [ M([[1, 2], [3, 4], [5, 6]]), -1, 2 ], error: Matrix.RowIndexError },
			{ input: [ M([[1, 2], [3, 4], [5, 6]]), 0, 3 ], error: Matrix.RowIndexError },
			{ input: [ M([[1, 2], [3, 4], [5, 6]]), 0.5, 1 ], error: Matrix.RowIndexError },
		],
	},
	".scaleRow": {
		testName: (matrix: Matrix<Frac>, i: number, x: Frac) => `${str(matrix)}.scaleRow(${i}, ${str(x)})`,
		testFunc: (matrix: Matrix<Frac>, i: number, x: Frac) => {
			matrix.scaleRow(i, x);
			return matrix;
		},
		tests: [ // 測資
			{ input: [ M([[1, 2], [3, 4]]), 1, F(-2) ], output: M([[1, 2], [-6, -8]]) },
			{ input: [ M([[1, 2, 3]]), 0, F(3) ], output: M([[3, 6, 9]]) },
			{ input: [ M([[1], [2], [3]]), 2, F(-1) ], output: M([[1], [2], [-3]]) },
			{ input: [ M([[1, 2], [3, 4]]), 2, F(1) ], error: Matrix.RowIndexError },
		],
	},
	".addRow": {
		testName: (matrix: Matrix<Frac>, i: number, j: number, x: Frac) => `${str(matrix)}.addRow(${i}, ${j}, ${str(x)})`,
		testFunc: (matrix: Matrix<Frac>, i: number, j: number, x: Frac) => {
			matrix.addRow(i, j, x);
			return matrix;
		},
		tests: [ // 測資
			{ input: [ M([[1, 2], [3, 4]]), 0, 1, F(2) ], output: M([[1, 2], [5, 8]]) },
			{ input: [ M([[1, 2, 3], [4, 5, 6]]), 1, 0, F(-1) ], output: M([[-3, -3, -3], [4, 5, 6]]) },
			{ input: [ M([[1], [2], [3]]), 0, 2, F(5) ], output: M([[1], [2], [8]]) },
			{ input: [ M([[1, 2], [3, 4]]), 2, 1, F(1) ], error: Matrix.RowIndexError },
			{ input: [ M([[1, 2], [3, 4]]), 0, 2, F(1) ], error: Matrix.RowIndexError },
		],
	},
	".trans": {
		testName: (matrix: Matrix<Frac>) => `${str(matrix)}.trans()`,
		testFunc: (matrix: Matrix<Frac>) => matrix.trans(),
		tests: [ // 測資
			{ input: [ M([[1, 2, 3], [4, 5, 6]]) ], output: M([[1, 4], [2, 5], [3, 6]]) },
			{ input: [ M([[1]]) ], output: M([[1]]) },
			{ input: [ M([[1, 2, 3]]) ], output: M([[1], [2], [3]]) },
			{ input: [ M([[1], [2], [3]]) ], output: M([[1, 2, 3]]) },
		],
	},
	".inverse": {
		testName: (matrix: Matrix<any>) => `${str(matrix)}.inverse()`,
		testFunc: (matrix: Matrix<any>) => matrix.inverse(F(0), F(1)),
		tests: [ // 測資
			{ input: [ M([[1]]) ], output: M([[1]]) },
			{ input: [ M([[1, 2], [3, 4]]) ], output: new Matrix(2, 2, (i, j) => [[F(-2), F(1)], [F(3, 2), F(-1, 2)]][i][j]) },
			{ input: [ M([[2]]) ], output: new Matrix(1, 1, () => F(1, 2)) },
			{ input: [ M([[2, 0], [0, 3]]) ], output: new Matrix(2, 2, (i, j) => [[F(1, 2), F(0)], [F(0), F(1, 3)]][i][j]) },
			{ input: [ M([[0, 1], [1, 0]]) ], output: M([[0, 1], [1, 0]]) },
			{ input: [ M([[1, 2, 3], [4, 5, 6]]) ], error: Matrix.InverseNonSquareMatrixError },
			{ input: [ M([[1, 2], [2, 4]]) ], error: Matrix.InverseSingularMatrixError },
		],
	},
	".copy": {
		testName: (matrix: Matrix<Frac>) => `Object (Matrix) copy test`,
		testFunc: (matrix: Matrix<Frac>) => {
			const copy = matrix.copy();
			matrix.scaleRow(0, F(0));
			return copy;
		},
		tests: [ // 測資
			{ input: [ M([[1, 2], [3, 4]]) ], output: M([[1, 2], [3, 4]]) },
			{ input: [ M([[1]]) ], output: M([[1]]) },
			{ input: [ M([[1, 2, 3]]) ], output: M([[1, 2, 3]]) },
			{ input: [ M([[1], [2], [3]]) ], output: M([[1], [2], [3]]) },
		],
	},
	".neg": {
		testName: (matrix: Matrix<Frac>) => `-(${str(matrix)})`,
		testFunc: (matrix: Matrix<Frac>) => matrix.neg(),
		tests: [ // 測資
			{ input: [ M([[1, -2], [3, 0]]) ], output: M([[-1, 2], [-3, 0]]) },
			{ input: [ M([[0]]) ], output: M([[0]]) },
			{ input: [ M([[1, 2, 3]]) ], output: M([[-1, -2, -3]]) },
			{ input: [ M([[-1], [2], [-3]]) ], output: M([[1], [-2], [3]]) },
		],
	},
	".add": {
		testName: (matrixA: Matrix<Frac>, matrixB: Matrix<Frac>) => `${str(matrixA)} + ${str(matrixB)}`,
		testFunc: (matrixA: Matrix<Frac>, matrixB: Matrix<Frac>) => matrixA.add(matrixB),
		tests: [ // 測資
			{ input: [ M([[1, 2], [3, 4]]), M([[5, 6], [7, 8]]) ], output: M([[6, 8], [10, 12]]) },
			{ input: [ M([[1]]), M([[2]]) ], output: M([[3]]) },
			{ input: [ M([[1, 2, 3]]), M([[4, 5, 6]]) ], output: M([[5, 7, 9]]) },
			{ input: [ M([[1], [2], [3]]), M([[-1], [-2], [-3]]) ], output: M([[0], [0], [0]]) },
			{ input: [ M([[1, 2]]), M([[1], [2]]) ], error: Matrix.AddDimensionMismatchError },
		],
	},
	".sub": {
		testName: (matrixA: Matrix<Frac>, matrixB: Matrix<Frac>) => `${str(matrixA)} - ${str(matrixB)}`,
		testFunc: (matrixA: Matrix<Frac>, matrixB: Matrix<Frac>) => matrixA.sub(matrixB),
		tests: [ // 測資
			{ input: [ M([[1, 2], [3, 4]]), M([[5, 6], [7, 8]]) ], output: M([[-4, -4], [-4, -4]]) },
			{ input: [ M([[1]]), M([[2]]) ], output: M([[-1]]) },
			{ input: [ M([[1, 2, 3]]), M([[4, 5, 6]]) ], output: M([[-3, -3, -3]]) },
			{ input: [ M([[1], [2], [3]]), M([[1], [1], [1]]) ], output: M([[0], [1], [2]]) },
			{ input: [ M([[1, 2]]), M([[1], [2]]) ], error: Matrix.AddDimensionMismatchError },
		],
	},
	".mul": {
		testName: (matrixA: Matrix<Frac>, matrixB: Matrix<Frac>) => `${str(matrixA)} @ ${str(matrixB)}`,
		testFunc: (matrixA: Matrix<Frac>, matrixB: Matrix<Frac>) => matrixA.mul(matrixB),
		tests: [ // 測資
			{
				input: [ M([[1, 2, 3], [4, 5, 6]]), M([[7, 8], [9, 10], [11, 12]]) ],
				output: M([[58, 64], [139, 154]])
			},
			{ input: [ M([[2]]), M([[3]]) ], output: M([[6]]) },
			{ input: [ M([[1, 2, 3]]), M([[4], [5], [6]]) ], output: M([[32]]) },
			{ input: [ M([[1], [2], [3]]), M([[4, 5]]) ], output: M([[4, 5], [8, 10], [12, 15]]) },
			{ input: [ M([[1, 2]]), M([[1, 2]]) ], error: Matrix.MulDimensionMismatchError },
		],
	},
	".muls": {
		testName: (matrix: Matrix<Frac>, x: Frac) => `${str(matrix)} * ${str(x)}`,
		testFunc: (matrix: Matrix<Frac>, x: Frac) => matrix.muls(x),
		tests: [ // 測資
			{
				input: [ M([[1, -2], [3, 4]]), F(1, 2) ],
				output: new Matrix(2, 2, (i, j) => [[F(1, 2), F(-1)], [F(3, 2), F(2)]][i][j])
			},
			{ input: [ M([[1]]), F(0) ], output: M([[0]]) },
			{ input: [ M([[1, 2, 3]]), F(-2) ], output: M([[-2, -4, -6]]) },
			{ input: [ M([[2], [4], [6]]), F(1, 2) ], output: M([[1], [2], [3]]) },
		],
	},
};
// ---------- 以下不要修改 ----------

for (const [groupName, testData] of Object.entries(testDatas)) describe(groupName, () => { // 對每個 func 做測試
	for (const t of testData.tests) test( // 測一組測資
		testData.testName(...t.input) + " = " + ("output" in t ? str(t.output) : `[Error]${t.error.name}`), // 輸出 output, 報錯就輸出 error name
		() => {
			if ("output" in t) expect(testData.testFunc(...t.input)).toStrictEqual(t.output); // 檢查 output
			if ("error" in t) expect(() => testData.testFunc(...t.input)).toThrow(t.error); // 報錯就檢查 error instance
		}
	);
});
