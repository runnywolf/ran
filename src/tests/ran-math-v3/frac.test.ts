import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { ParamNorm, Frac, F } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"Frac.is": {
		testName: (x: any) => `Frac.is(${str(x)})`,
		testFunc: (x: any) => Frac.is(x),
		tests: [ // 測資
			{ input: [ 0 ], output: false },
			{ input: [ F(3) ], output: true },
			{ input: [ F(3, -6) ], output: true },
			{ input: [ true ], output: false },
			{ input: [ {} ], output: false },
		],
	},
	"Frac.fromStr": {
		testName: (s: string) => `Frac.fromStr(${str(s)})`,
		testFunc: (s: string) => Frac.fromStr(s),
		tests: [ // 測資
			{ input: [ "1.24" ], output: F(31, 25) },
			{ input: [ "01.24" ], output: F(31, 25) },
			{ input: [ "0001.24" ], output: F(31, 25) },
			{ input: [ "0100.02400" ], output: F(12503, 125) },
			{ input: [ "0.24" ], output: F(6, 25) },
			{ input: [ "1.00" ], output: F(1) },
			{ input: [ "0.00240" ], output: F(3, 1250) },
			{ input: [ "20.0" ], output: F(20) },
			{ input: [ "-1.24" ], output: F(-31, 25) },
			{ input: [ "-01.24" ], output: F(-31, 25) },
			{ input: [ "-0001.24" ], output: F(-31, 25) },
			{ input: [ "-0100.02400" ], output: F(-12503, 125) },
			{ input: [ "-0.24" ], output: F(-6, 25) },
			{ input: [ "-1.00" ], output: F(-1) },
			{ input: [ "-0.00240" ], output: F(-3, 1250) },
			{ input: [ "-20.0" ], output: F(-20) },
			{ input: [ "-0.0" ], output: F(0) },
			{ input: [ "000.000" ], output: F(0) },
			{ input: [ "- 10. 2  4 " ], output: F(-256, 25) },
			{ input: [ ".8964" ], error: Frac.InvalidStringError },
			{ input: [ "-87." ], error: Frac.InvalidStringError },
			{ input: [ "." ], error: Frac.InvalidStringError },
			{ input: [ "a.b" ], error: Frac.InvalidStringError },
			{ input: [ "0x40.2" ], error: Frac.InvalidStringError },
			{ input: [ "11.45.14" ], error: Frac.InvalidStringError },
			
			{ input: [ "6/-9" ], output: F(-2, 3) },
			{ input: [ " -1 2 /   7 " ], output: F(-12, 7) },
			{ input: [ "00012/0003" ], output: F(4) },
			{ input: [ "-00012/0003" ], output: F(-4) },
			{ input: [ "-0/-5" ], output: F(0) },
			{ input: [ "000/0001" ], output: F(0) },
			{ input: [ "2.5/1" ], error: Frac.InvalidStringError }, // 子字串不是整數
			{ input: [ "2/1a" ], error: Frac.InvalidStringError }, // 子字串不是整數
			{ input: [ "2/1/3" ], error: Frac.InvalidStringError }, // 子字串過多
			{ input: [ "2/0" ], error: Frac.InvalidStringError }, // 分母為 0
			
			{ input: [ " 6  " ], output: F(6) },
			{ input: [ "- 4" ], output: F(-4) },
			{ input: [ "-0" ], output: F(0) },
			{ input: [ "1/-0" ], error: Frac.InvalidStringError },
			{ input: [ "+1" ], error: Frac.InvalidStringError },
			{ input: [ "1e10" ], error: Frac.InvalidStringError },
			{ input: [ "abc" ], error: Frac.InvalidStringError },
			{ input: [ "" ], error: Frac.InvalidStringError },
		],
	},
	"constructor": {
		testName: (n?: number|bigint, d?: number|bigint) => `new Frac(${str(n)}, ${str(d)})`,
		testFunc: (n?: number|bigint, d?: number|bigint) => new Frac(n, d),
		tests: [ // 測資
			{ input: [], output: F(0, 1) }, // 特性 new Frac() = 0/1
			{ input: [ 3 ], output: F(3, 1) }, // 特性 new Frac(3) = 3/1
			{ input: [ 6, -9 ], output: F(-2, 3) },
			{ input: [ 0n, -7n ], output: F(0, 1) },
			{ input: [ -8n, -12n ], output: F(2, 3) },
			{ input: [ 9007199254740991, 1 ], output: F(9007199254740991n, 1n) },
			{ input: [ -0.1, 7 ], error: ParamNorm.NonIntError },
			{ input: [ -2, 1e100 ], error: ParamNorm.UnsafeIntError },
			{ input: [ 5, 0 ], error: Frac.ZeroDenominatorError }, // 分母為 0
		]
	},
	".isZero": {
		testName: (frac: Frac) => `(${str(frac)}).isZero()`,
		testFunc: (frac: Frac) => frac.isZero(),
		tests: [ // 測資
			{ input: [ F(0) ], output: true },
			{ input: [ F(2, 3) ], output: false },
			{ input: [ F(0, -7) ], output: true },
		]
	},
	".isInt": {
		testName: (frac: Frac) => `(${str(frac)}).isInt()`,
		testFunc: (frac: Frac) => frac.isInt(),
		tests: [ // 測資
			{ input: [ F(0) ], output: true },
			{ input: [ F(2, 3) ], output: false },
			{ input: [ F(0, -7) ], output: true },
			{ input: [ F(-15, 5) ], output: true },
			{ input: [ F(4) ], output: true },
			{ input: [ F(6, -9) ], output: false },
		]
	},
	".toFloat": {
		testName: (frac: Frac) => `(${str(frac)}).toFloat()`,
		testFunc: (frac: Frac) => frac.toFloat(),
		tests: [ // 測資
			{ input: [ F(2) ], output: 2 },
			{ input: [ F(-9, 3) ], output: -3 },
			{ input: [ F(2, 3) ], output: 2/3 },
			{ input: [ F(3, 5) ], output: 0.6 },
			{ input: [ F(0, 1) ], output: 0 },
		]
	},
	".toStr": {
		testName: (frac: Frac) => `(${str(frac)}).toStr()`,
		testFunc: (frac: Frac) => frac.toStr(),
		tests: [ // 測資
			{ input: [ F(2) ], output: "2" },
			{ input: [ F(-9, 3) ], output: "-3" },
			{ input: [ F(2, 3) ], output: "2/3" },
			{ input: [ F(-1, 3) ], output: "-1/3" },
			{ input: [ F(0, 1) ], output: "0" },
		]
	},
	".toLatex": {
		testName: (frac: Frac) => `(${str(frac)}).toLatex()`,
		testFunc: (frac: Frac) => frac.toLatex(),
		tests: [ // 測資
			{ input: [ F(2) ], output: "2" },
			{ input: [ F(-9, 3) ], output: "-3" },
			{ input: [ F(2, 3) ], output: "\\frac{2}{3}" },
			{ input: [ F(-1, 3) ], output: "\\frac{-1}{3}" },
			{ input: [ F(0, 1) ], output: "0" },
		]
	},
	".copy": {
		testName: (frac: Frac) => "Object (Frac) copy test",
		testFunc: (frac: any) => { // 這裡不指定型別 Frac, 因為要修改 .n 測試是否複製
			let fracCopy = frac.copy();
			fracCopy.n = 0n; // 如果成功複製, 那麼 fracCopy = 0/1, frac = -2/3, 你可以去把 Frac.copy 的回傳值改成 this 試試看
			fracCopy.d = 1n;
			return frac;
		},
		tests: [
			{ input: [ F(-2, 3) ], output: F(-2, 3) },
		]
	},
	".neg": {
		testName: (frac: Frac) => `(${str(frac)}).neg()`,
		testFunc: (frac: Frac) => frac.neg(),
		tests: [
			{ input: [ F(-3, 4) ], output: F(3, 4) },
			{ input: [ F(0) ], output: F(0) },
			{ input: [ F(5, 9) ], output: F(-5, 9) },
		]
	},
	".add": {
		testName: (frac: Frac, x: number|bigint|Frac) => `${str(frac)} + ${str(x)}`,
		testFunc: (frac: Frac, x: number|bigint|Frac) => frac.add(x),
		tests: [
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(-11, 8) }, // Frac + Frac
			{ input: [ F(7, 4), F(3, 5) ], output: F(47, 20) },
			{ input: [ F(0, 3), F(-2, 3) ], output: F(-2, 3) },
			{ input: [ F(2, 7), F(-3, 5) ], output: F(-11, 35) },
			{ input: [ F(346, 7835), F(-11307, 5127) ], output: F(-28938801, 13390015) },
			{ input: [ F(-5, 3), 5n ], output: F(10, 3) }, // Frac + bigint
			{ input: [ F(1, 2), -1n ], output: F(-1, 2) },
			{ input: [ F(-500), 500n ], output: F(0, 1) },
			{ input: [ F(3, 7), -3 ], output: F(-18, 7) }, // Frac + int number
			{ input: [ F(-5, 3), 5 ], output: F(10, 3) },
			{ input: [ F(-5, 37), 17 ], output: F(624, 37) },
			{ input: [ F(10), -10 ], output: F(0, 1) },
			{ input: [ F(6, 7), 3.5 ], error: ParamNorm.NonIntError }, // Frac + float error
			{ input: [ F(6, 7), 1e100 ], error: ParamNorm.UnsafeIntError }, // Frac + unsafe int number
		]
	},
	".sub": {
		testName: (frac: Frac, x: number|bigint|Frac) => `${str(frac)} - ${str(x)}`,
		testFunc: (frac: Frac, x: number|bigint|Frac) => frac.sub(x),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(-1, 8) }, // Frac - Frac
			{ input: [ F(7, 4), F(3, 5) ], output: F(23, 20) },
			{ input: [ F(0, 3), F(-2, 3) ], output: F(2, 3) },
			{ input: [ F(2, 7), F(-3, 5) ], output: F(31, 35) },
			{ input: [ F(1346, 7835), F(-11307, 5127) ], output: F(31830429, 13390015) },
			{ input: [ F(3, 7), -3n ], output: F(24, 7) }, // Frac - bigint
			{ input: [ F(1, 2), 1n ], output: F(-1, 2) },
			{ input: [ F(-5, 3), 5n ], output: F(-20, 3) },
			{ input: [ F(-5, 37), 17 ], output: F(-634, 37) }, // Frac - int number
			{ input: [ F(10), 0 ], output: F(10, 1) },
			{ input: [ F(-500), -500 ], output: F(0, 1) },
			{ input: [ F(6, 7), 3.5 ], error: ParamNorm.NonIntError }, // Frac - float error
			{ input: [ F(6, 7), 1e100 ], error: ParamNorm.UnsafeIntError }, // Frac - unsafe int number
		]
	},
	".mul": {
		testName: (frac: Frac, x: number|bigint|Frac) => `${str(frac)} * ${str(x)}`,
		testFunc: (frac: Frac, x: number|bigint|Frac) => frac.mul(x),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(15, 32) }, // Frac * Frac
			{ input: [ F(7, 4), F(3, 5) ], output: F(21, 20) },
			{ input: [ F(0, 3), F(-2, 3) ], output: F(0, 1) },
			{ input: [ F(12, 5), F(10, 9) ], output: F(8, 3) },
			{ input: [ F(1346, 7835), F(-11307, 5127) ], output: F(-5073074, 13390015) },
			{ input: [ F(3, 7), -3n ], output: F(-9, 7) }, // Frac * bigint
			{ input: [ F(1, 2), -2n ], output: F(-1) },
			{ input: [ F(7, 10), 4n ], output: F(14, 5) },
			{ input: [ F(-5, 12), 9 ], output: F(-15, 4) }, // Frac * int number
			{ input: [ F(-500), -500 ], output: F(250000, 1) },
			{ input: [ F(2, 3), 0 ], output: F(0, 1) },
			{ input: [ F(6, 7), 3.5 ], error: ParamNorm.NonIntError }, // Frac - float error
			{ input: [ F(6, 7), 1e100 ], error: ParamNorm.UnsafeIntError }, // Frac - unsafe int number
		]
	},
	".div": {
		testName: (frac: Frac, x: number|bigint|Frac) => `${str(frac)} / ${str(x)}`,
		testFunc: (frac: Frac, x: number|bigint|Frac) => frac.div(x),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(6, 5) }, // Frac / Frac
			{ input: [ F(7, 4), F(3, 5) ], output: F(35, 12) },
			{ input: [ F(0, 3), F(-2, 3) ], output: F(0, 1) },
			{ input: [ F(12, 5), F(10, 9) ], output: F(54, 25) },
			{ input: [ F(1346, 7835), F(-11307, 5127) ], output: F(-2300314, 29530115) },
			{ input: [ F(3, 7), -3n ], output: F(-1, 7) }, // Frac / bigint
			{ input: [ F(1, 2), -2n ], output: F(-1, 4) },
			{ input: [ F(7, 10), 4n ], output: F(7, 40) },
			{ input: [ F(-3, 5), 9 ], output: F(-1, 15) }, // Frac / int number
			{ input: [ F(-500), -500 ], output: F(1, 1) },
			{ input: [ F(6, 7), 3.5 ], error: ParamNorm.NonIntError }, // Frac / float error
			{ input: [ F(6, 7), 1e100 ], error: ParamNorm.UnsafeIntError }, // Frac / unsafe int number
			{ input: [ F(6, 7), F(0) ], error: Frac.DivideZeroError }, // Frac / 0
			{ input: [ F(6, 7), 0n ], error: Frac.DivideZeroError },
			{ input: [ F(6, 7), 0 ], error: Frac.DivideZeroError },
		]
	},
	".pow": {
		testName: (frac: Frac, x: number|bigint|Frac) => `${str(frac)} ^ ${str(x)}`,
		testFunc: (frac: Frac, x: number|bigint) => frac.pow(x),
		tests: [ // 測資
			{ input: [ F(2, 3), 0 ], output: F(1) }, // f^0 = 1
			{ input: [ F(0), 0 ], output: F(1) }, // 0^0 = 1
			{ input: [ F(0), 100 ], output: F(0) }, // 0^x = 0
			{ input: [ F(0), -1 ], error: Frac.DivideZeroError }, // 0^-n error
			{ input: [ F(-7, 3), -1 ], output: F(-3, 7) }, // f^-1 = 1/f
			{ input: [ F(12, 5), 1 ], output: F(12, 5) }, // f^1 = f
			{ input: [ F(3), 7 ], output: F(2187) }, // i^i
			{ input: [ F(-6, 5), -4 ], output: F(625, 1296) }, // f^-i
			{ input: [ F(-6, 5), 3 ], output: F(-216, 125) }, // f^i
			{ input: [ F(-2, 3), 2 ], output: F(4, 9) },
			{ input: [ F(-2, 3), -3 ], output: F(-27, 8) },
			{ input: [ F(1), -999n ], output: F(1) },
			{ input: [ F(6, 7), 3.5 ], error: ParamNorm.NonIntError }, // Frac ^ float error
			{ input: [ F(6, 7), 1e100 ], error: ParamNorm.UnsafeIntError }, // Frac ^ unsafe int number
		]
	},
	".equal": {
		testName: (frac: Frac, x: number|bigint|Frac) => `${str(frac)} == ${str(x)}`,
		testFunc: (frac: Frac, x: number|bigint|Frac) => frac.equal(x),
		tests: [ // 測資
			{ input: [ F(8, 6), F(20, 15) ], output: true },
			{ input: [ F(7, 4), F(7, 5) ], output: false },
			{ input: [ F(7, -3), F(-14, 6) ], output: true },
			{ input: [ F(6, 3), 2n ], output: true },
			{ input: [ F(7, 10), 7 ], output: false },
			{ input: [ F(6, -3), -2n ], output: true },
			{ input: [ F(-3, 5), -3 ], output: false },
			{ input: [ F(0, -3), 0n ], output: true },
			{ input: [ F(-4, 2), -2 ], output: true },
			{ input: [ F(6, 7), 3.5 ], error: ParamNorm.NonIntError }, // Frac == float error
			{ input: [ F(6, 7), 1e100 ], error: ParamNorm.UnsafeIntError }, // Frac == unsafe int number
		]
	},
	".lt": {
		testName: (frac: Frac, x: number|bigint|Frac) => `${str(frac)} < ${str(x)}`,
		testFunc: (frac: Frac, x: number|bigint|Frac) => frac.lt(x),
		tests: [ // 測資
			{ input: [ F(8, 6), F(20, 15) ], output: false },
			{ input: [ F(7, 4), F(7, 5) ], output: false },
			{ input: [ F(-16, 7), F(-3, 5) ], output: true },
			{ input: [ F(6, 3), 2n ], output: false },
			{ input: [ F(7, 10), 7n ], output: true },
			{ input: [ F(6, 3), 2 ], output: false },
			{ input: [ F(-1, 555), 0 ], output: true },
			{ input: [ F(0), 0n ], output: false },
			{ input: [ F(-1, 2), 0 ], output: true },
			{ input: [ F(1, 2), 0 ], output: false },
			{ input: [ F(6, 7), 3.5 ], error: ParamNorm.NonIntError }, // Frac < float error
			{ input: [ F(6, 7), 1e100 ], error: ParamNorm.UnsafeIntError }, // Frac < unsafe int number
		]
	}
};
// ---------- 以下不要修改 ----------

for (const [groupName, testData] of Object.entries(testDatas)) describe(groupName, () => { // 對每個 func 做測試
	for (const t of testData.tests) test( // 測一組測資
		testData.testName(...t.input) + " = " + ("output" in t ? str(t.output) : `(Err)${t.error.name}`), // 輸出 output, 報錯就輸出 error name
		() => {
			if ("output" in t) expect(testData.testFunc(...t.input)).toStrictEqual(t.output); // 檢查 output
			if ("error" in t) expect(() => testData.testFunc(...t.input)).toThrow(t.error); // 報錯就檢查 error instance
		}
	);
});
