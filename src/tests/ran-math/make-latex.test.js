import { test, expect, describe } from "vitest";

// ---------- test area ----------
import { MakeLatex, F, EF } from "ran-math";

const testData = {
	"MakeLatex.delim": {
		testName: (input, output) => `MakeLatex.delim("${input}") = "${output}"`,
		testFunc: input => MakeLatex.delim(input),
		tests: [ // 測資
			{ input: "a + b", output: "\\left(a + b\\right)" },
			{ input: "", output: "\\left(\\right)" },
			{ input: 44, error: '[RanMath][MakeLatex.delim] Param "str" must be a string.' },
		]
	},
	"MakeLatex.term": {
		testName: (input, output) => `MakeLatex.term(...) = "${output}"`,
		testFunc: input => MakeLatex.term(...input),
		tests: [ // 測資 (已通過 make-latex-term.test.vue 的 ui 測試, 僅滿足分支要求, 因此不做過多複雜的測試)
			{ input: [new EF(2), new EF(F(3, 4)), "n"], output: "2{\\left(\\frac{3}{4}\\right)}^{n}" },
			{ input: [new EF(2, 1, 2), new EF(2, 1, 2), 0], output: "\\left(2+\\sqrt{2}\\right)" },
			{ input: [0, -2, 1], output: "0" },
			{ input: [0, 0, 1], output: "0" },
			{ input: ["-1", 2, -2], output: "-{2}^{-2}" },
			{ input: ["a", "12", "2"], output: "a\\cdot{12}^{2}" },
		]
	},
	"MakeLatex.equationSystem": {
		testName: (input, output) => `MakeLatex.equationSystem(...) = "..."`,
		testFunc: input => MakeLatex.equationSystem(
			input.row, input.col,
			(i, j) => input.coefArr[i][j],
			input.varFunc,
			i => input.equalArr[i],
			input.equalMode
		),
		tests: [ // 測資 (已通過 make-latex-equation.test.vue 的 ui 測試, 僅滿足分支要求, 因此不做過多複雜的測試)
			{
				input: {
					row: 3, col: 3,
					coefArr: [[0, 1, 0], [-2, 0, 3], [0, 0, 0]],
					varFunc: (i, j) => `x^{${j}}`,
					equalArr: [2, -2, null],
					equalMode: "right"
				},
				output: "\\left\\{\\begin{alignat*}{4}&&~&x^{1}&~&&&=2\\\\-2&x^{0}&~&&~+3&x^{2}&&=-2\\\\&&~&&~&0&&={?}\\end{alignat*}\\right."
			},
			{
				input: {
					row: 3, col: 3,
					coefArr: [[0, 3, 1], [444, 0, 12], [0, 0, 0]],
					varFunc: (i, j) => `a_{${i}${j}}`,
					equalArr: [2, null, 1004],
					equalMode: "left"
				},
				output: "\\left\\{\\begin{alignat*}{4}2&=~&&&~3&a_{01}&~+&a_{02}\\\\{?}&=~&444&a_{10}&~&&~+12&a_{12}\\\\1004&=~&0\\end{alignat*}\\right."
			},
			{
				input: {
					row: 3, col: 3,
					coefArr: [[16, -3, 1], [-444, 118, 12], [1, 2, null]],
					varFunc: (i, j) => (i === 0 && j === 0) ? null : `a_{${i}${j}}`,
					equalArr: [2, -2, 1004],
					equalMode: null
				},
				output: "\\left\\{\\begin{alignat*}{4}16&?&~-3&a_{01}&~+&a_{02}&\\\\-444&a_{10}&~+118&a_{11}&~+12&a_{12}&\\\\&a_{20}&~+2&a_{21}&~+?&a_{22}&\\end{alignat*}\\right."
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
