import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { ParamNorm, Complex, CP, F, SV } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"Complex.isComplex": {
		testName: (x: any) => `Complex.isComplex(${str(x)})`,
		testFunc: (x: any) => Complex.isComplex(x),
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
		],
	},
	".isZero": {
		testName: (z: Complex, eps?: number) => `(${str(z)}).isZero(${str(eps)})`,
		testFunc: (z: Complex, eps?: number) => z.isZero(eps),
		tests: [
			{ input: [ CP(0, 0) ], output: true },
			{ input: [ CP(1e-14, -2e-14) ], output: true },
			{ input: [ CP(1e-8, 0) ], output: false },
			{ input: [ CP(1e-4, 0), 1e-3 ], output: true },
		],
	},
	".toStr": {
		testName: (z: Complex, digits?: number) => `(${str(z)}).toStr(${str(digits)})`,
		testFunc: (z: Complex, digits?: number) => z.toStr(digits),
		tests: [
			{ input: [ CP(0, 0) ], output: "0 + 0 i" },
			{ input: [ CP(1.23456, -9.87654), 3 ], output: "1.235 + -9.877 i" },
			{ input: [ CP(2, 3) ], output: "2 + 3 i" },
		],
	},
	".copy": {
		testName: (z: Complex) => "Object (Complex) copy test",
		testFunc: (z: any) => {
			let c = z.copy();
			c.real = 777;
			c.imag = -888;
			return z;
		},
		tests: [
			{ input: [ CP(2, -3) ], output: CP(2, -3) },
		],
	},
	".neg": {
		testName: (z: Complex) => `(${str(z)}).neg()`,
		testFunc: (z: Complex) => z.neg(),
		tests: [
			{ input: [ CP(2, -3) ], output: CP(-2, 3) },
			{ input: [ CP(0) ], output: CP(0) },
		],
	},
	".add": {
		testName: (z: Complex, x: any) => `(${str(z)}) + (${str(x)})`,
		testFunc: (z: Complex, x: any) => z.add(x),
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
		testName: (z: Complex, x: any) => `(${str(z)}) - (${str(x)})`,
		testFunc: (z: Complex, x: any) => z.sub(x),
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
		testName: (z: Complex, x: any) => `(${str(z)}) * (${str(x)})`,
		testFunc: (z: Complex, x: any) => z.mul(x),
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
		testName: (z: Complex, x: any, cmp: Complex) => `(${str(z)}) / (${str(x)}) == ${str(cmp)}`,
		testFunc: (z: Complex, x: any, cmp: Complex) => z.div(x).equal(cmp), // 因為會有精度問題, 所以用 cmp
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
		testName: (z: Complex, x: number|bigint|ReturnType<typeof F>) => `(${str(z)}) ^ (${str(x)})`,
		testFunc: (z: Complex, x: number|bigint|ReturnType<typeof F>) => z.pow(x),
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
			{ input: [ CP(1, 2), Infinity ], error: Complex.InfPowError },
			{ input: [ CP(1, 2), NaN ], error: ParamNorm.NanError },
		],
	},
	".equal": {
		testName: (z: Complex, x: any, eps?: number) => `(${str(z)}).equal(${str(x)}, ${str(eps)})`,
		testFunc: (z: Complex, x: any, eps?: number) => z.equal(x, eps),
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
		testData.testName(...t.input) + " = " + ("output" in t ? str(t.output) : `(Err)${t.error.name}`), // 輸出 output, 報錯就輸出 error name
		() => {
			if ("output" in t) expect(testData.testFunc(...t.input)).toStrictEqual(t.output); // 檢查 output
			if ("error" in t) expect(() => testData.testFunc(...t.input)).toThrow(t.error); // 報錯就檢查 error instance
		}
	);
});
