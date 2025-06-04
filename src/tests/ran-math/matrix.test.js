import { test, expect, describe } from "vitest";

// ---------- test area ----------
import { Matrix, EF, F } from "ran-math";

const ef = (nf_a, nf_b, nf_s) => new EF(nf_a, nf_b, nf_s);

const testData = {
	"Matrix.isMatrix": {
		testName: (input, output) => `Matrix.isMatrix(${input}) = ${output}`,
		testFunc: input => Matrix.isMatrix(input),
		tests: [
			{ input: new Matrix(1, 1, (i, j) => i + j), output: true },
			{ input: [[1, 2], [3, 4]], output: false },
		]
	},
	"Matrix.createI": {
		testName: (input, output) => `Matrix.createI(${input}) = ${output}`,
		testFunc: input => Matrix.createI(input),
		tests: [
			{ input: 1, output: new Matrix(1, 1, (i, j) => i === j ? 1 : 0) },
			{ input: 3, output: new Matrix(3, 3, (i, j) => i === j ? 1 : 0) },
			{ input: 0, error: '[RanMath][Matrix.createI] Row number (Param "n") must be a positive integer.' },
		]
	},
	"constructor": {
		testName: (input, output) => `new Matrix(${input}) = test-arr`,
		testFunc: input => new Matrix(...input).arr,
		tests: [
			{ input: [2, 1, () => 3], output: [[ef(3)], [ef(3)]] },
			{
				input: [3, 3, (i, j) => i + j],
				output: [
					[ef(0), ef(1), ef(2)],
					[ef(1), ef(2), ef(3)],
					[ef(2), ef(3), ef(4)],
				]
			},
			{
				input: [-2, 1, () => 3],
				error: '[RanMath][Matrix.constructor] Row number (Param "n") must be a positive integer.'
			},
			{
				input: [2, -1, () => 3],
				error: '[RanMath][Matrix.constructor] Column number (Param "m") must be a positive integer.'
			},
			{
				input: [2, 1, 3],
				error: '[RanMath][Matrix.constructor] Element generator (Param "initFunc") must be a function.'
			},
			{
				input: [2, 1, () => "3"],
				error: '[RanMath][Matrix.constructor] Return value of initFunc must be a number | Frac | EF .'
			},
		]
	},
	".copy": {
		testName: (input, output) => `test-matrix.copy() = test-output`,
		testFunc: input => input.copy(),
		tests: [
			{ input: new Matrix(3, 3, (i, j) => i + j), output: new Matrix(3, 3, (i, j) => i + j) },
		]
	},
	".toStr": {
		testName: (input, output) => `test-matrix.toStr() = test-output`,
		testFunc: input => input.toStr(),
		tests: [
			{
				input: new Matrix(3, 3, (i, j) => new EF(F(i-j, i+2), F(i-j+1, j+2), F((i+j+1)*j, 7))),
				output: "| 0   | -1/2           | -1 + -1/28 √ 42 |\n"+
								"| 1/3 | 1/21 √ 21      | -1/3            |\n"+
								"| 1/2 | 1/4 + 4/21 √ 7 | 1/28 √ 70       |\n"
			},
		]
	},
	".swapRow": {
		testName: (input, output) => `test-matrix.swapRow()`,
		testFunc: input => { input.m.swapRow(input.i, input.j); return input.m.arr; },
		tests: [
			{
				input: {
					m: new Matrix(3, 3, (i, j) => i + j),
					i: 0, j: 2
				},
				output: [
					[ef(2), ef(3), ef(4)],
					[ef(1), ef(2), ef(3)],
					[ef(0), ef(1), ef(2)],
				]
			},
			{
				input: {
					m: new Matrix(3, 3, (i, j) => i + j),
					i: 1, j: 1
				},
				output: [
					[ef(0), ef(1), ef(2)],
					[ef(1), ef(2), ef(3)],
					[ef(2), ef(3), ef(4)],
				]
			},
			{
				input: { m: Matrix.createI(3), i: -1, j: 1 },
				error: "[RanMath][Matrix.swapRow] Row index out of range or not a integer."
			},
			{
				input: { m: Matrix.createI(3), i: 1, j: 3 },
				error: "[RanMath][Matrix.swapRow] Row index out of range or not a integer."
			},
		]
	},
	".scaleRow": {
		testName: (input, output) => `test-matrix.scaleRow()`,
		testFunc: input => { input.m.scaleRow(input.i, input.s); return input.m.arr; },
		tests: [
			{
				input: {
					m: new Matrix(3, 3, (i, j) => i + j),
					i: 1, s: -1.6
				},
				output: [
					[ef(0), ef(1), ef(2)],
					[ef(-1.6), ef(-1.6*2), ef(-1.6*3)],
					[ef(2), ef(3), ef(4)],
				]
			},
			{
				input: {
					m: new Matrix(3, 3, (i, j) => i + j),
					i: 2, s: ef(F(1, 2), F(3, 4), -1)
				},
				output: [
					[ef(0), ef(1), ef(2)],
					[ef(1), ef(2), ef(3)],
					[ef(1, F(3, 2), -1), ef(F(3, 2), F(9, 4), -1), ef(2, 3, -1)],
				]
			},
			{
				input: { m: Matrix.createI(3), i: -1, s: 1 },
				error: "[RanMath][Matrix.scaleRow] Row index out of range or not a integer."
			},
			{
				input: { m: Matrix.createI(3), i: 0, s: "3" },
				error: "[RanMath][Matrix.scaleRow] Scalar must be a number | Frac | EF ."
			},
		]
	},
	".addRow": {
		testName: (input, output) => `test-matrix.addRow()`,
		testFunc: input => { input.m.addRow(input.i, input.j, input.s); return input.m.arr; },
		tests: [
			{
				input: {
					m: new Matrix(3, 3, (i, j) => i + j),
					i: 1, j: 2, s: -1.6
				},
				output: [
					[ef(0), ef(1), ef(2)],
					[ef(1), ef(2), ef(3)],
					[ef(0.3999999999999999), ef(-0.20000000000000018), ef(-0.8000000000000007)],
				]
			},
			{
				input: {
					m: new Matrix(3, 3, (i, j) => i + j),
					i: 2, j: 0, s: ef(F(1, 2), F(3, 4), -1)
				},
				output: [
					[ef(1, F(3, 2), -1), ef(F(5, 2), F(9, 4), -1), ef(4, 3, -1)],
					[ef(1), ef(2), ef(3)],
					[ef(2), ef(3), ef(4)],
				]
			},
			{
				input: { m: Matrix.createI(3), i: -1, j: 2, s: 1 },
				error: "[RanMath][Matrix.addRow] Row index out of range or not a integer."
			},
			{
				input: { m: Matrix.createI(3), i: 1, j: 3, s: 1 },
				error: "[RanMath][Matrix.addRow] Row index out of range or not a integer."
			},
			{
				input: { m: Matrix.createI(3), i: 0, j: 1, s: "3" },
				error: "[RanMath][Matrix.addRow] Scalar must be a number | Frac | EF ."
			},
		]
	},
	".add": {
		testName: (input, output) => `matrix.add(matrix) = matrix`,
		testFunc: input => input.a.add(input.b),
		tests: [
			{
				input: {
					a: new Matrix(3, 3, (i, j) => i + j),
					b: new Matrix(3, 3, (i, j) => i * 4)
				},
				output: new Matrix(3, 3, (i, j) => i * 5 + j)
			},
			{
				input: {
					a: new Matrix(3, 3, (i, j) => i + j),
					b: [[1, 2, 3], [1, 1, 1], [6, 0, 2]]
				},
				error: '[RanMath][Matrix.add] Param "matrix" must be a Matrix.'
			},
			{
				input: {
					a: new Matrix(3, 3, (i, j) => i + j),
					b: new Matrix(3, 4, (i, j) => i + j),
				},
				error: '[RanMath][Matrix.add] Cannot add matrices: dimensions do not match.'
			},
		]
	},
	".mul": {
		testName: (input, output) => `test-matrix.mul() = test-output`,
		testFunc: input => input.a.mul(input.b),
		tests: [
			{
				input: {
					a: (() => {
						const arr = [
							[ef(5), ef(-2), ef(3)],
							[ef(1), ef(2), ef(-7)],
							[ef(0), ef(-6), ef(2)],
							[ef(1), ef(-2), ef(5)],
						]
						return new Matrix(4, 3, (i, j) => arr[i][j]);
					})(),
					b: (() => {
						const arr = [
							[ef(3), ef(4), ef(5)],
							[ef(2), ef(0), ef(6)],
							[ef(9), ef(8), ef(7)]
						]
						return new Matrix(3, 3, (i, j) => arr[i][j])
					})(),
				},
				output: (() => {
					const arr = [
						[ef(38), ef(44), ef(34)],
						[ef(-56), ef(-52), ef(-32)],
						[ef(6), ef(16), ef(-22)],
						[ef(44), ef(44), ef(28)]
					]
					return new Matrix(4, 3, (i, j) => arr[i][j])
				})(),
			},
			{
				input: {
					a: new Matrix(3, 3, (i, j) => i + j),
					b: new Matrix(3, 3, (i, j) => i + j),
				},
				output: new Matrix(3, 3, (i, j) => 5+3*(i+j+i*j))
			},
			{
				input: {
					a: new Matrix(3, 3, (i, j) => i + j),
					b: "???",
				},
				error: '[RanMath][Matrix.mul] Param "matrix" must be a Matrix.'
			},
			{
				input: {
					a: new Matrix(3, 3, (i, j) => i + j),
					b: new Matrix(4, 3, (i, j) => i + j),
				},
				error: '[RanMath][Matrix.mul] Only n*m and m*p matrices can be multiplied.'
			},
		]
	},
	".muls": {
		testName: (input, output) => `matrix.muls(matrix) = matrix`,
		testFunc: input => input.a.muls(input.s),
		tests: [
			{
				input: { a: new Matrix(3, 3, (i, j) => i + j), s: -1.6},
				output: new Matrix(3, 3, (i, j) => (i + j) * -1.6)
			},
			{
				input: { a: new Matrix(3, 3, (i, j) => i + j), s: F(89, 64)},
				output: new Matrix(3, 3, (i, j) => F(i + j).mul(F(89, 64)))
			},
			{
				input: { a: new Matrix(3, 3, (i, j) => ef(4-i, F(i*(j+2)+3, j+4))), s: ef(89, 64, F(2, 3))},
				output: new Matrix(3, 3, (i, j) => ef(4-i, F(i*(j+2)+3, j+4)).mul(ef(89, 64, F(2, 3))))
			},
			{
				input: { a: new Matrix(3, 3, (i, j) => i + j), s: "198964" },
				error: '[RanMath][Matrix.muls] Scalar must be a number | Frac | EF .'
			},
		]
	},
	".trans": {
		testName: (input, output) => `matrix.trans(matrix) = matrix`,
		testFunc: input => input.trans(),
		tests: [
			{
				input: new Matrix(3, 3, (i, j) => i + j),
				output: new Matrix(3, 3, (i, j) => i + j),
			},
			{
				input: new Matrix(3, 5, (i, j) => i + 6*j),
				output: new Matrix(5, 3, (i, j) => 6*i + j),
			},
		]
	},
};

for (const [key, testInfo] of Object.entries(testData)) describe(key, () => {
	for (const t of testInfo.tests) test(
		testInfo.testName(t.input, t.output) + (t.error ? `\n\t> error text: ${t.error}` : ""),
		() => {
			if (t.error) expect(() => testInfo.testFunc(t.input)).toThrowError(t.error); // 如果會報錯, 檢查錯誤訊息
			else expect(testInfo.testFunc(t.input)).toStrictEqual(t.output); // 檢查是否有錯誤
		}
	);
});
// ---------- test area ----------
