import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { ParamNorm, F, SqrtValue, SV, CP } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"SqrtValue.is": {
		testName: (x: any) => `SqrtValue.is(${str(x)})`,
		testFunc: (x: any) => SqrtValue.is(x),
		tests: [
			{ input: [ SV() ], output: true },
			{ input: [ SV([1, -1]) ], output: true },
			{ input: [ new SqrtValue([[1, 2]]) ], output: true },
			{ input: [ 0n ], output: false },
			{ input: [ F(3) ], output: false },
			{ input: [ true ], output: false },
			{ input: [ {} ], output: false },
		],
	},
	"SqrtValue.fromStr": {
		testName: (s: string) => `SqrtValue.fromStr(${str(s)})`,
		testFunc: (s: string) => SqrtValue.fromStr(s),
		tests: [
			{ input: [ "2/3s9/4 + 3.5s12" ], output: SV([1, 1], [7, 3]) },
			{ input: [ "2s-2 + -2s-2" ], output: SV() },
			{ input: [ " 2 s 8 + 1 / 2 s 2 " ], output: SV([F(9, 2), 2]) },
			{ input: [ "s12" ], output: SV([2, 3]) },
			{ input: [ "-2s0" ], output: SV() },
			{ input: [ "-2s-8" ], output: SV([-4, -2]) },
			{ input: [ "5" ], output: SV([5, 1]) },
			{ input: [ "1s2s3" ], error: SqrtValue.InvalidStringError },
			{ input: [ "1s2/" ], error: SqrtValue.InvalidStringError },
			{ input: [ "" ], error: SqrtValue.InvalidStringError },
		],
	},
	"constructor": {
		testName: (rawTerms: any[]) => `new SqrtValue(${str(rawTerms)})`,
		testFunc: (rawTerms: any[]) => new SqrtValue(rawTerms),
		tests: [
			{ input: [ [] ], output: SV() },
			{ input: [ [[0, 0]] ], output: SV() },
			{ input: [ [[1, 0]] ], output: SV() },
			{ input: [ [[F(-1, 2), 3], [F(1, 2), 3]] ], output: SV() },
			{ input: [ [[1, 8]] ], output: SV([2, 2]) },
			{ input: [ [[1, -8]] ], output: SV([2, -2]) },
			{ input: [ [[1, 2], [3, 8], [-7, 2]] ], output: SV() },
			{ input: [ [[1, F(9, 4)]] ], output: SV([F(3, 2), 1]) },
			{ input: [ [[0.5, 2]] ], error: ParamNorm.NonIntError },
			{ input: [ [[1, 1e100]] ], error: ParamNorm.UnsafeIntError },
		],
	},
	".isZero": {
		testName: (sv: SqrtValue) => `(${str(sv)}).isZero()`,
		testFunc: (sv: SqrtValue) => sv.isZero(),
		tests: [
			{ input: [ SV() ], output: true },
			{ input: [ SV([0, 2]) ], output: true },
			{ input: [ SV([1, 2], [-1, 2]) ], output: true },
			{ input: [ SV([1, 2]) ], output: false },
		],
	},
	".toStr": {
		testName: (sv: SqrtValue) => `(${str(sv)}).toStr()`,
		testFunc: (sv: SqrtValue) => sv.toStr(),
		tests: [
			{ input: [ SV() ], output: "0" },
			{ input: [ SV([2, 1]) ], output: "2 √1" },
			{ input: [ SV([1, 2], [3, 1]) ], output: "3 √1 + 1 √2" },
			{ input: [ SV([1, -2], [-1, 3]) ], output: "-1 √3 + 1 √-2" },
		],
	},
	".toLatex": {
		testName: (sv: SqrtValue, options?: Record<string, unknown>) => `(${str(sv)}).toLatex(${str(options)})`,
		testFunc: (sv: SqrtValue, options?: Record<string, unknown>) => sv.toLatex(options),
		tests: [
			{ input: [ SV(), { complexForm: "expand", fracMode: "none" } ], output: "0" },
			{ input: [ SV([1, 1]), { complexForm: "group", fracMode: "frac" } ], output: "1" },
			{ input: [ SV([-1, 1]), { complexForm: "expand", fracMode: "frac" } ], output: "-1" },
			{ input: [ SV([1, 2]), { complexForm: "group", fracMode: "none" } ], output: "\\sqrt{2}" },
			{ input: [ SV([-1, 2]), { complexForm: "expand", fracMode: "none" } ], output: "-\\sqrt{2}" },
			{ input: [ SV([3, 1], [1, 2]), { complexForm: "group", fracMode: "frac" } ], output: "3+\\sqrt{2}" },
			{ input: [ SV([-3, 1], [2, 3], [-1, 5]), { complexForm: "expand", fracMode: "frac" } ], output: "-3+2\\sqrt{3}-\\sqrt{5}" },
			{ input: [ SV([1, 8], [1, 18]), { complexForm: "group", fracMode: "none" } ], output: "5\\sqrt{2}" },
			{ input: [ SV([F(1, 2), 1]), { complexForm: "expand", fracMode: "none" } ], output: "\\frac{1}{2}" },
			{ input: [ SV([F(-3, 4), 2]), { complexForm: "group", fracMode: "frac" } ], output: "\\frac{-3\\sqrt{2}}{4}" },
			{ input: [ SV([F(1, 2), 1], [F(1, 3), 2]), { complexForm: "expand", fracMode: "frac" } ], output: "\\frac{3+2\\sqrt{2}}{6}" },
			{ input: [ SV([F(-2, 3), 1], [F(5, 6), 3], [F(-7, 10), 5]), { complexForm: "group", fracMode: "none" } ], output: "\\frac{-2}{3}+\\frac{5}{6}\\sqrt{3}+\\frac{-7}{10}\\sqrt{5}" },
			{ input: [ SV([1, -1]), { complexForm: "expand", fracMode: "none" } ], output: "i" },
			{ input: [ SV([-1, -1]), { complexForm: "group", fracMode: "frac" } ], output: "-i" },
			{ input: [ SV([2, -2]), { complexForm: "expand", fracMode: "frac" } ], output: "2\\sqrt{2}i" },
			{ input: [ SV([1, 1], [1, -1]), { complexForm: "group", fracMode: "none" } ], output: "1+i" },
			{ input: [ SV([2, 1], [-3, -1]), { complexForm: "expand", fracMode: "none" } ], output: "2-3i" },
			{ input: [ SV([2, 1], [1, 2], [3, -1], [1, -3]), { complexForm: "group", fracMode: "frac" } ], output: "\\left(2+\\sqrt{2}\\right)+\\left(3+\\sqrt{3}\\right)i" },
			{ input: [ SV([F(1, 2), 1], [F(-2, 5), -1], [F(7, 6), -3]), { complexForm: "expand", fracMode: "frac" } ], output: "\\frac{15-12i+35\\sqrt{3}i}{30}" },
			{ input: [ SV([1, -1], [-2, -2], [3, -5]), { complexForm: "group", fracMode: "none" } ], output: "\\left(1-2\\sqrt{2}+3\\sqrt{5}\\right)i" },
			{ input: [ SV([F(-1, 2), 1], [F(2, 3), 2], [F(-3, 4), -6]), { complexForm: "expand", fracMode: "none" } ], output: "\\frac{-1}{2}+\\frac{2}{3}\\sqrt{2}+\\frac{-3}{4}\\sqrt{6}i" },
			{ input: [ SV([1, -2]), { complexForm: "group", fracMode: "frac" } ], output: "\\sqrt{2}i" },
			{ input: [ SV([-1, -2]), { complexForm: "expand", fracMode: "frac" } ], output: "-\\sqrt{2}i" },
			{ input: [ SV([1, -2], [-1, -3]), { complexForm: "group", fracMode: "none" } ], output: "\\left(\\sqrt{2}-\\sqrt{3}\\right)i" },
			{ input: [ SV([1, F(1, 2)]), { complexForm: "expand", fracMode: "none" } ], output: "\\frac{1}{2}\\sqrt{2}" },
			{ input: [ SV([1, F(-1, 2)]), { complexForm: "group", fracMode: "frac" } ], output: "\\frac{\\sqrt{2}i}{2}" },
			{ input: [ SV([F(1, 6), 1], [F(-1, 3), 2], [F(5, 2), -1]), { complexForm: "expand", fracMode: "frac" } ], output: "\\frac{1-2\\sqrt{2}+15i}{6}" },
			{ input: [ SV([1, 2], [1, -1], [-1, -3]), { complexForm: "group", fracMode: "none" } ], output: "\\sqrt{2}+\\left(1-\\sqrt{3}\\right)i" },
		],
	},
	".toComplex": {
		testName: (sv: SqrtValue) => `(${str(sv)}).toComplex()`,
		testFunc: (sv: SqrtValue) => sv.toComplex(),
		tests: [
			{ input: [ SV() ], output: CP(0, 0) },
			{ input: [ SV([2, 1], [3, 4]) ], output: CP(8, 0) },
			{ input: [ SV([1, -1]) ], output: CP(0, 1) },
			{ input: [ SV([2, -4], [-3, -9]) ], output: CP(0, -5) },
			{ input: [ SV([1, 1], [1, 2], [3, -8]) ], output: CP(1 + Math.sqrt(2), 6 * Math.sqrt(2)) },
			{ input: [ SV([1, -2], [-1, -8]) ], output: CP(0, -Math.sqrt(2)) },
		],
	},
	".real": {
		testName: (sv: SqrtValue) => `(${str(sv)}).real()`,
		testFunc: (sv: SqrtValue) => sv.real(),
		tests: [
			{ input: [ SV([2, 1], [3, -2], [5, 6], [7, -3]) ], output: SV([2, 1], [5, 6]) },
			{ input: [ SV([5, -3]) ], output: SV() },
		],
	},
	".imag": {
		testName: (sv: SqrtValue) => `(${str(sv)}).imag()`,
		testFunc: (sv: SqrtValue) => sv.imag(),
		tests: [
			{ input: [ SV([2, 1], [3, -2], [5, 6], [7, -3]) ], output: SV([3, 2], [7, 3]) },
			{ input: [ SV([3, 2], [7, 1]) ], output: SV() },
		],
	},
	".conj": {
		testName: (sv: SqrtValue, basis?: bigint) => `(${str(sv)}).conj(${str(basis)})`,
		testFunc: (sv: SqrtValue, basis?: bigint) => sv.conj(basis),
		tests: [
			{ input: [ SV() ], output: SV() },
			{ input: [ SV([7, 1]), -1n ], output: SV([7, 1]) },
			{ input: [ SV([3, -1]) ], output: SV([-3, -1]) },
			{ input: [ SV([2, 1], [3, -2], [5, 6], [-7, -3]) ], output: SV([2, 1], [-3, -2], [5, 6], [7, -3]) },
			{ input: [ SV([1, 2], [2, 3], [3, 6], [4, -2], [5, -3]), 2n ], output: SV([-1, 2], [2, 3], [-3, 6], [-4, -2], [5, -3]) },
			{ input: [ SV([1, 2], [2, 3], [3, 6], [4, -2], [5, -3]), 3n ], output: SV([1, 2], [-2, 3], [-3, 6], [4, -2], [-5, -3]) },
			{ input: [ SV([1, 2], [2, -3]), 5n ], output: SV([1, 2], [2, -3]) },
			{ input: [ SV([1, 18], [1, -50]), 2n ], output: SV([-3, 2], [-5, -2]) },
			{ input: [ SV([1, -6], [2, 6]), -1n ], output: SV([-1, -6], [2, 6]) },
			{ input: [ SV([1, -30], [2, 30], [-3, -42]), 7n ], output: SV([1, -30], [2, 30], [3, -42]) },
		],
	},
	".copy": {
		testName: (sv: SqrtValue) => `Object (SqrtValue) copy test`,
		testFunc: (sv: any) => { // 這裡不指定型別, 因為要修改 .terms 測試是否複製
			let sv_copy = sv.copy();
			sv_copy.terms.set(2n, F(-1)); // 你可以去把 SqrtValue.copy 的回傳值改成 this 試試看, 會錯
			return sv;
		},
		tests: [
			{ input: [ SV([2, 1], [3, 2], [5, -3]) ], output: SV([2, 1], [3, 2], [5, -3]) },
		],
	},
	".neg": {
		testName: (sv: SqrtValue) => `-(${str(sv)})`,
		testFunc: (sv: SqrtValue) => sv.neg(),
		tests: [
			{ input: [ SV([2, 1], [3, 2], [5, -3]) ], output: SV([-2, 1], [-3, 2], [-5, -3]) },
			{ input: [ SV() ], output: SV() },
		],
	},
	".add": {
		testName: (sv: SqrtValue, x: any) => `(${str(sv)}) + (${str(x)})`,
		testFunc: (sv: SqrtValue, x: any) => sv.add(x),
		tests: [
			{ input: [ SV([1, 2]), SV([3, 8]) ], output: SV([7, 2]) },
			{ input: [ SV([-1, -7]), SV([1, -7]) ], output: SV() },
			{ input: [ SV([1, 2]), F(1, 2) ], output: SV([F(1, 2), 1], [1, 2]) },
			{ input: [ SV([1, 2]), 2n ], output: SV([2, 1], [1, 2]) },
			{ input: [ SV([F(7, 2), 1]), -3 ], output: SV([F(1, 2), 1]) },
			{ input: [ SV([1, 2]), SV([1, 3]) ], output: SV([1, 2], [1, 3]) },
			{ input: [ SV([1, 2]), 3.5 ], error: ParamNorm.NonIntError },
			{ input: [ SV([1, 2]), 1e100 ], error: ParamNorm.UnsafeIntError },
		],
	},
	".sub": {
		testName: (sv: SqrtValue, x: any) => `(${str(sv)}) - (${str(x)})`,
		testFunc: (sv: SqrtValue, x: any) => sv.sub(x),
		tests: [
			{ input: [ SV([1, 2]), SV([3, 8]) ], output: SV([-5, 2]) },
			{ input: [ SV([2, -1]), SV([2, -1]) ], output: SV() },
			{ input: [ SV([1, 2]), F(1, 2) ], output: SV([F(-1, 2), 1], [1, 2]) },
			{ input: [ SV([1, 2]), 2n ], output: SV([-2, 1], [1, 2]) },
			{ input: [ SV([F(7, 2), 1]), 3 ], output: SV([F(1, 2), 1]) },
			{ input: [ SV([1, 2]), 3.5 ], error: ParamNorm.NonIntError },
			{ input: [ SV([1, 2]), 1e100 ], error: ParamNorm.UnsafeIntError },
		],
	},
	".mul": {
		testName: (sv: SqrtValue, x: any) => `(${str(sv)}) * (${str(x)})`,
		testFunc: (sv: SqrtValue, x: any) => sv.mul(x),
		tests: [
			{ input: [ SV([1, 2]), SV([3, 8]) ], output: SV([12, 1]) },
			{ input: [ SV([1, 2]), SV([1, -2]) ], output: SV([2, -1]) },
			{ input: [ SV([1, -1]), SV([1, -1]) ], output: SV([-1, 1]) },
			{ input: [ SV([1, -1]), SV() ], output: SV() },
			{ input: [ SV(), SV([1, -1]) ], output: SV() },
			{ input: [ SV(), SV() ], output: SV() },
			{ input: [ SV([1, 2]), F(1, 2) ], output: SV([F(1, 2), 2]) },
			{ input: [ SV([1, 2]), 2n ], output: SV([2, 2]) },
			{ input: [ SV([7, -1]), -2 ], output: SV([-14, -1]) },
			{ input: [ SV([1, 2]), 3.5 ], error: ParamNorm.NonIntError },
			{ input: [ SV([1, 2]), 1e100 ], error: ParamNorm.UnsafeIntError },
		],
	},
	".div": {
		testName: (sv: SqrtValue, x: any) => `(${str(sv)}) / (${str(x)})`,
		testFunc: (sv: SqrtValue, x: any) => sv.div(x),
		tests: [
			{ input: [ SV([1, 1], [1, 2]), SV([1, 1], [-1, 2]) ], output: SV([-3, 1], [-2, 2]) },
			{ input: [ SV([1, 2]), SV([1, 2]) ], output: SV([1, 1]) },
			{
				input: [ SV([1, 1]), SV([2, -2], [1, 1], [4, 2], [-2, 6], [1, -3]) ],
				output: SV([473, 1], [1264, -1], [66, 2], [-1394, -2], [272, 3], [663, -3], [-210, 6], [-734, -6]).div(7108)
			},
			{ input: [ SV([1, -2]), F(1, 2) ], output: SV([2, -2]) },
			{ input: [ SV([1, -2]), 2n ], output: SV([F(1, 2), -2]) },
			{ input: [ SV([1, -2]), 2 ], output: SV([F(1, 2), -2]) },
			{ input: [ SV([1, 2]), SV() ], error: SqrtValue.DivideZeroError },
			{ input: [ SV([1, 2]), 0n ], error: SqrtValue.DivideZeroError },
			{ input: [ SV([1, 2]), 3.5 ], error: ParamNorm.NonIntError },
			{ input: [ SV([1, 2]), 1e100 ], error: ParamNorm.UnsafeIntError },
		],
	},
	".pow": {
		testName: (sv: SqrtValue, x: number|bigint) => `(${str(sv)}) ^ (${str(x)})`,
		testFunc: (sv: SqrtValue, x: number|bigint) => sv.pow(x),
		tests: [
			{ input: [ SV([-2, 3], [1, -2]), 12n ], output: SV([3068160, -6], [-460736, 1]) },
			{ input: [ SV([1, 2]), -1 ], output: SV([F(1, 2), 2]) },
			{ input: [ SV([1, 2]), 0 ], output: SV([1, 1]) },
			{ input: [ SV([1, 2]), 1 ], output: SV([1, 2]) },
			{ input: [ SV([1, 2]), 2 ], output: SV([2, 1]) },
			{ input: [ SV([3, 2]), -1 ], output: SV([F(1, 6), 2]) },
			{ input: [ SV([1, 1], [1, 2]), -1 ], output: SV([-1, 1], [1, 2]) },
			{ input: [ SV([2, 1]), -3 ], output: SV([F(1, 8), 1]) },
			{ input: [ SV(), 87 ], output: SV() },
			{ input: [ SV(), 0n ], output: SV([1, 1]) },
			{ input: [ SV(), -1 ], error: SqrtValue.DivideZeroError },
			{ input: [ SV([1, 2]), 3.5 ], error: ParamNorm.NonIntError },
			{ input: [ SV([1, 2]), 1e100 ], error: ParamNorm.UnsafeIntError },
		],
	},
	".equal": {
		testName: (sv: SqrtValue, x: any) => `(${str(sv)}) == (${str(x)})`,
		testFunc: (sv: SqrtValue, x: any) => sv.equal(x),
		tests: [
			{ input: [ SV([1, 8]), SV([2, 2]) ], output: true },
			{ input: [ SV([1, 2]), SV([1, 2], [-1, 3]) ], output: false },
			{ input: [ SV([1, 2]), F(1, 2) ], output: false },
			{ input: [ SV([2, 1]), 2n ], output: true },
			{ input: [ SV([1, 2]), 1 ], output: false },
			{ input: [ SV([1, 2]), 3.5 ], error: ParamNorm.NonIntError },
			{ input: [ SV([1, 2]), 1e100 ], error: ParamNorm.UnsafeIntError },
		],
	},
};
// ---------- 以下不要修改 ----------

for (const [groupName, testData] of Object.entries(testDatas)) describe(groupName, () => { // 對每個 func 做測試
	for (const t of testData.tests) test( // 測一組測資
		testData.testName(...t.input) + " = " + ("output" in t ? str(t.output) : `[Error]${t.error.name}`), // 輸出 output, 報錯就輸出 error name
		() => {
			if ("output" in t) { // 檢查 output
				const actual = testData.testFunc(...t.input);
				if (actual instanceof SqrtValue && t.output instanceof SqrtValue) expect(actual.equal(t.output)).toBe(true);
				else expect(actual).toStrictEqual(t.output);
			}
			if ("error" in t) expect(() => testData.testFunc(...t.input)).toThrow(t.error); // 報錯就檢查 error instance
		}
	);
});
