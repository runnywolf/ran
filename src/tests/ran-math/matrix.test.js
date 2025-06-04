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
