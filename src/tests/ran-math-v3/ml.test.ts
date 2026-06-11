import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { F, SV, MakeLatex as ml } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"MakeLatex.floatToStr": {
		testName: (x: number, maxDigits: number) => `MakeLatex.floatToStr(${str(x)}, ${str(maxDigits)})`,
		testFunc: (x: number, maxDigits: number) => ml.floatToStr(x, maxDigits),
		tests: [
			{ input: [ 0, 4 ], output: "0" },
			{ input: [ -0.0001, 3 ], output: "0" },
			{ input: [ 1.23, 4 ], output: "1.23" },
			{ input: [ 1.23456, 3 ], output: "1.235" },
			{ input: [ 1.5, 0 ], output: "2" },
			{ input: [ -1.5, 0 ], output: "-2" },
		],
	},
	"MakeLatex.removePrefix": {
		testName: (s: string, prefix: string) => `MakeLatex.removePrefix(${str(s)}, ${str(prefix)})`,
		testFunc: (s: string, prefix: string) => ml.removePrefix(s, prefix),
		tests: [
			{ input: [ "abcdef", "abc" ], output: "def" },
			{ input: [ "abcdef", "def" ], output: "abcdef" },
			{ input: [ "abc", "abc" ], output: "" },
			{ input: [ "abc", "" ], output: "abc" },
			{ input: [ "", "abc" ], output: "" },
			{ input: [ "", "" ], output: "" },
		],
	},
	"MakeLatex.removeSuffix": {
		testName: (s: string, suffix: string) => `MakeLatex.removeSuffix(${str(s)}, ${str(suffix)})`,
		testFunc: (s: string, suffix: string) => ml.removeSuffix(s, suffix),
		tests: [
			{ input: [ "abcdef", "def" ], output: "abc" },
			{ input: [ "abcdef", "abc" ], output: "abcdef" },
			{ input: [ "abc", "abc" ], output: "" },
			{ input: [ "abc", "" ], output: "abc" },
			{ input: [ "", "abc" ], output: "" },
			{ input: [ "", "" ], output: "" },
		],
	},
	"MakeLatex.delim": {
		testName: (s: string) => `MakeLatex.delim(${str(s)})`,
		testFunc: (s: string) => ml.delim(s),
		tests: [
			{ input: [ "x" ], output: "\\left(x\\right)" },
			{ input: [ "a+b" ], output: "\\left(a+b\\right)" },
			{ input: [ "\\frac{1}{2}" ], output: "\\left(\\frac{1}{2}\\right)" },
		],
	},
	"MakeLatex.term": {
		testName: (...input: any[]) => `MakeLatex.term(${input.map(x => str(x)).join(", ")})`,
		testFunc: (...input: any[]) => ml.term(...input),
		tests: [
			{ input: [ 1 ], output: "1" },
			{ input: [ 2 ], output: "2" },
			{ input: [ 0, "x" ], output: "0" },
			{ input: [ 1, "x" ], output: "x" },
			{ input: [ -1, "x" ], output: "-x" },
			{ input: [ 2, "x" ], output: "2x" },
			{ input: [ 2, 3 ], output: "2\\cdot3" },
			{ input: [ 2, "x", 2 ], output: "2{x}^{2}" },
			{ input: [ 1, "x", 0 ], output: "1" },
			{ input: [ 1, 0, 2 ], output: "0" },
			{ input: [ 3, "a+b" ], output: "3\\left(a+b\\right)" },
			{ input: [ "a+b", "x" ], output: "\\left(a+b\\right)x" },
			{ input: [ "-a+b", "x" ], output: "\\left(-a+b\\right)x" },
			{ input: [ F(2, 3), "x" ], output: "\\frac{2}{3}x" },
			{ input: [ 2, F(1, 2) ], output: "2\\left(\\frac{1}{2}\\right)" },
			{ input: [ 2, "x", F(3, 2) ], output: "2{x}^{3/2}" },
			{ input: [ SV([1, 2]), "x" ], output: "\\sqrt{2}x" },
			{ input: [ 2, "\\frac{1}{2}" ], output: "2\\left(\\frac{1}{2}\\right)" },
			{ input: [ 2, "-x", 2 ], output: "2{\\left(-x\\right)}^{2}" },
		],
	},
	"MakeLatex.equationSystem": {
		testName: (
			row: number, col: number, coefArr: any[][], baseArr: any[][], equalArr: any[], equalMode: "none"|"right"|"left"
		) => `MakeLatex.equationSystem(${str(row)}, ${str(col)}, ..., ${str(equalMode)})`,
		testFunc: (
			row: number, col: number, coefArr: any[][], baseArr: any[][], equalArr: any[], equalMode: "none"|"right"|"left"
		) => ml.equationSystem(row, col, (i, j) => coefArr[i][j], (i, j) => baseArr[i][j], i => equalArr[i], equalMode),
		tests: [
			{
				input: [ 2, 2, [[1, 2], [3, -1]], [["x", "y"], ["x", "y"]], [5, 6], "right" ],
				output: "\\left\\{\\begin{array}{rrrr}x&+2y&=&5\\\\3x&-y&=&6\\end{array}\\right."
			},
			{
				input: [ 1, 2, [[1, -1]], [["x", "y"]], [0], "none" ],
				output: "\\left\\{\\begin{array}{rr}x&-y\\end{array}\\right."
			},
			{
				input: [ 2, 1, [[1], [-1]], [["x_{0}"], ["x_{1}"]], [3, -3], "left" ],
				output: "\\left\\{\\begin{array}{rrr}3&=&x_{0}\\\\-3&=&-x_{1}\\end{array}\\right."
			},
			{
				input: [ 2, 3, [[1, 0, -2], [0, 3, 1]], [["x", "y", "z"], ["x", "y", "z"]], [5, -7], "right" ],
				output: "\\left\\{\\begin{array}{rrrrr}x&&-2z&=&5\\\\&3y&+z&=&-7\\end{array}\\right."
			},
			{
				input: [ 3, 2, [[1, 2], [-3, 0], [null, -1]], [["a_0", "a_1"], ["a_0", "a_1"], ["a_0", null]], [4, null, -6], "left" ],
				output: "\\left\\{\\begin{array}{rrrr}4&=&a_0&+2a_1\\\\?&=&-3a_0&\\\\-6&=&?a_0&-?\\end{array}\\right."
			},
			{ input: [ 0, 1, [[1]], [["x"]], [1], "right" ], error: ml.NonPosIntDimensionError },
			{ input: [ 1, 0, [[1]], [["x"]], [1], "right" ], error: ml.NonPosIntDimensionError },
			{ input: [ 1.5, 1, [[1]], [["x"]], [1], "right" ], error: ml.NonPosIntDimensionError },
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
