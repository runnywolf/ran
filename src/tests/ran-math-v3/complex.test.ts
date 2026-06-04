import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { ParamNorm, Complex, CP, F, SV } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"Complex.is": {
		testName: (x: any) => `Complex.is(${str(x)})`,
		testFunc: (x: any) => Complex.is(x),
		tests: [
			{ input: [ CP() ], output: true },
			{ input: [ CP(1, -2) ], output: true },
			{ input: [ 0 ], output: false },
			{ input: [ F(3, 2) ], output: false },
			{ input: [ SV([1, 2]) ], output: false },
			{ input: [ {} ], output: false },
		],
	},
	"constructor": {
		testName: (real?: number, imag?: number) => `new Complex(${str(real)}, ${str(imag)})`,
		testFunc: (real?: number, imag?: number) => new Complex(real, imag),
		tests: [
			{ input: [], output: CP(0, 0) },
			{ input: [ 3 ], output: CP(3, 0) },
			{ input: [ -1.5, 2.25 ], output: CP(-1.5, 2.25) },
			{ input: [ 1e-15, -1e-15 ], output: CP(0, 0) },
			{ input: [ NaN ], error: ParamNorm.NanError },
			{ input: [ Infinity ], error: ParamNorm.InfError },
			{ input: [ 1, NaN ], error: ParamNorm.NanError },
			{ input: [ 1, -Infinity ], error: ParamNorm.InfError },
		],
	},
	".isZero": {
		testName: (cp: Complex, eps?: number) => `(${str(cp)}).isZero(${str(eps)})`,
		testFunc: (cp: Complex, eps?: number) => cp.isZero(eps),
		tests: [
			{ input: [ CP(0, 0) ], output: true },
			{ input: [ CP(1e-14, -2e-14) ], output: true },
			{ input: [ CP(1e-8, 0) ], output: false },
			{ input: [ CP(1e-4, 0), 1e-3 ], output: true },
		],
	},
	".toStr": {
		testName: (cp: Complex, digits?: number) => `(${str(cp)}).toStr(${str(digits)})`,
		testFunc: (cp: Complex, digits?: number) => cp.toStr(digits),
		tests: [
			{ input: [ CP(0, 0) ], output: "0 + 0 i" },
			{ input: [ CP(1.23456, -9.87654), 3 ], output: "1.235 + -9.877 i" },
			{ input: [ CP(2, 3) ], output: "2 + 3 i" },
		],
	},
	".toLatex": {
		testName: (cp: Complex, digits?: number) => `(${str(cp)}).toLatex(${str(digits)})`,
		testFunc: (cp: Complex, digits?: number) => cp.toLatex(digits),
		tests: [
			{ input: [ CP(0, 0) ], output: "0" },
			{ input: [ CP(2, 0) ], output: "2" },
			{ input: [ CP(-2, 0) ], output: "-2" },
			{ input: [ CP(0, 1) ], output: "i" },
			{ input: [ CP(0, -1) ], output: "-i" },
			{ input: [ CP(0, 3) ], output: "3i" },
			{ input: [ CP(0, -3) ], output: "-3i" },
			{ input: [ CP(2, 3) ], output: "2+3i" },
			{ input: [ CP(2, -3) ], output: "2-3i" },
			{ input: [ CP(-2, 3) ], output: "-2+3i" },
			{ input: [ CP(-2, -3) ], output: "-2-3i" },
			{ input: [ CP(1.23456, -9.87654), 3 ], output: "1.235-9.877i" },
			{ input: [ CP(1.23456, 9.87654), 0 ], output: "1+10i" },
			{ input: [ CP(1.2, -3.4), 8 ], output: "1.2-3.4i" },
		],
	},
	".conj": {
		testName: (cp: Complex) => `(${str(cp)}).conj()`,
		testFunc: (cp: Complex) => cp.conj(),
		tests: [
			{ input: [ CP(7) ], output: CP(7) },
			{ input: [ CP(2, -3) ], output: CP(2, 3) },
			{ input: [ CP(0) ], output: CP(0) },
		],
	},
	".copy": {
		testName: (cp: Complex) => "Object (Complex) copy test",
		testFunc: (cp: any) => {
			let c = cp.copy();
			c.real = 777;
			c.imag = -888;
			return cp;
		},
		tests: [
			{ input: [ CP(2, -3) ], output: CP(2, -3) },
		],
	},
	".neg": {
		testName: (cp: Complex) => `-(${str(cp)})`,
		testFunc: (cp: Complex) => cp.neg(),
		tests: [
			{ input: [ CP(2, -3) ], output: CP(-2, 3) },
			{ input: [ CP(0) ], output: CP(0) },
		],
	},
	".add": {
		testName: (cp: Complex, x: any) => `(${str(cp)}) + (${str(x)})`,
		testFunc: (cp: Complex, x: any) => cp.add(x),
		tests: [
			{ input: [ CP(1, 2), CP(3, -5) ], output: CP(4, -3) },
			{ input: [ CP(1, 2), 3 ], output: CP(4, 2) },
			{ input: [ CP(1, 2), 2n ], output: CP(3, 2) },
			{ input: [ CP(1, 2), F(1, 2) ], output: CP(1.5, 2) },
			{ input: [ CP(1, 2), SV([3, 1], [2, -1]) ], output: CP(4, 4) },
			{ input: [ CP(1, 2), NaN ], error: ParamNorm.NanError },
		],
	},
	".sub": {
		testName: (cp: Complex, x: any) => `(${str(cp)}) - (${str(x)})`,
		testFunc: (cp: Complex, x: any) => cp.sub(x),
		tests: [
			{ input: [ CP(1, 2), CP(3, -5) ], output: CP(-2, 7) },
			{ input: [ CP(1, 2), 3 ], output: CP(-2, 2) },
			{ input: [ CP(1, 2), 2n ], output: CP(-1, 2) },
			{ input: [ CP(1, 2), F(1, 2) ], output: CP(0.5, 2) },
			{ input: [ CP(1, 2), SV([3, 1], [2, -1]) ], output: CP(-2, 0) },
			{ input: [ CP(1, 2), NaN ], error: ParamNorm.NanError },
		],
	},
	".mul": {
		testName: (cp: Complex, x: any) => `(${str(cp)}) * (${str(x)})`,
		testFunc: (cp: Complex, x: any) => cp.mul(x),
		tests: [
			{ input: [ CP(1, 2), CP(3, -5) ], output: CP(13, 1) },
			{ input: [ CP(1, 2), 3 ], output: CP(3, 6) },
			{ input: [ CP(1, 2), 2n ], output: CP(2, 4) },
			{ input: [ CP(1, 2), F(1, 2) ], output: CP(0.5, 1) },
			{ input: [ CP(1, 0), SV([3, 1], [2, -1]) ], output: CP(3, 2) },
			{ input: [ CP(1, 2), NaN ], error: ParamNorm.NanError },
		],
	},
	".div": {
		testName: (cp: Complex, x: any, cmp: Complex) => `(${str(cp)}) / (${str(x)}) == ${str(cmp)}`,
		testFunc: (cp: Complex, x: any, cmp: Complex) => cp.div(x).equal(cmp), // 因為會有精度問題, 所以用 cmp
		tests: [
			{ input: [ CP(1, 2), CP(3, 4), CP(11 / 25, 2 / 25) ], output: true },
			{ input: [ CP(1, 2), 2, CP(0.5, 1) ], output: true },
			{ input: [ CP(1, 2), F(1, 2), CP(2, 4) ], output: true },
			{ input: [ CP(1, 2), SV([2, 1]), CP(0.5, 1) ], output: true },
			{ input: [ CP(1, 2), CP(0, 0), CP() ], error: Complex.DivideZeroError },
			{ input: [ CP(1, 2), 0, CP() ], error: Complex.DivideZeroError },
			{ input: [ CP(1, 2), NaN, CP() ], error: ParamNorm.NanError },
		],
	},
	".pow": {
		testName: (cp: Complex, x: number|bigint|ReturnType<typeof F>) => `(${str(cp)}) ^ (${str(x)})`,
		testFunc: (cp: Complex, x: number|bigint|ReturnType<typeof F>) => cp.pow(x),
		tests: [
			{ input: [ CP(0, 0), 0 ], output: CP(1, 0) },
			{ input: [ CP(0, 0), 5 ], output: CP(0, 0) },
			{ input: [ CP(0, 0), -1 ], error: Complex.DivideZeroError },
			{ input: [ CP(2, 0), 3 ], output: CP(8, 0) },
			{ input: [ CP(0, 1), 2 ], output: CP(-1, 0) },
			{ input: [ CP(1, 1), 0 ], output: CP(1, 0) },
			{ input: [ CP(2, 0), F(1, 2) ], output: CP(Math.sqrt(2), 0) },
			{ input: [ CP(1, 1), 0.5 ], output: CP(1.0986841134678098, 0.45508986056222733) },
			{ input: [ CP(1, -1), F(3, 2) ], output: CP(0.6435942529055828, -1.5537739740300374) },
			{ input: [ CP(1, 2), NaN ], error: ParamNorm.NanError },
		],
	},
	".equal": {
		testName: (cp: Complex, x: any, eps?: number) => `eps = ${str(eps)}, (${str(cp)}) == (${str(x)})`,
		testFunc: (cp: Complex, x: any, eps?: number) => cp.equal(x, eps),
		tests: [
			{ input: [ CP(1, 2), CP(1, 2) ], output: true },
			{ input: [ CP(1, 2), CP(1 + 1e-14, 2 - 1e-14) ], output: true },
			{ input: [ CP(1, 2), CP(1 + 1e-4, 2), 1e-3 ], output: true },
			{ input: [ CP(1, 2), CP(1 + 1e-4, 2), 1e-5 ], output: false },
			{ input: [ CP(2, 0), 2n ], output: true },
			{ input: [ CP(2, 0), F(2, 1) ], output: true },
			{ input: [ CP(3, 2), SV([3, 1], [2, -1]) ], output: true },
			{ input: [ CP(1, 2), NaN ], error: ParamNorm.NanError },
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
