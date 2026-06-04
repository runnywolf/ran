import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { ParamNorm, F, SV, CP, SC, Scalar, SqrtValue, Complex } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"Scalar.is": {
		testName: (x: any) => `Scalar.is(${str(x)})`,
		testFunc: (x: any) => Scalar.is(x),
		tests: [
			{ input: [ SC(0) ], output: true },
			{ input: [ new Scalar(SV([1, 2])) ], output: true },
			{ input: [ 0 ], output: false },
			{ input: [ F(1, 2) ], output: false },
			{ input: [ SV([1, 2]) ], output: false },
			{ input: [ CP(1, 2) ], output: false },
			{ input: [ {} ], output: false },
		],
	},
	"constructor": {
		testName: (x?: any, cloneInput?: boolean) => `new Scalar(${str(x)}, ${str(cloneInput)})`,
		testFunc: (x?: any, cloneInput?: boolean) => new Scalar(x, cloneInput),
		tests: [
			{ input: [], output: SC(0n) },
			{ input: [ 3n ], output: SC(3n) },
			{ input: [ F(3, 2) ], output: SC(SV([F(3, 2), 1]), false) },
			{ input: [ SV([1, 8]) ], output: SC(SV([2, 2]), false) },
			{ input: [ 3.5 ], output: SC(CP(3.5), false) },
			{ input: [ NaN ], error: ParamNorm.NanError },
		],
	},
	"constructor cloneInput=true": {
		testName: (x: SqrtValue | Complex) => `new Scalar(${str(x)}) should clone input`,
		testFunc: (x: any) => {
			const sc = new Scalar(x);
			if (x instanceof SqrtValue) x.terms.set(2n, F(99));
			else x.real = 99;
			return sc.equal(x);
		},
		tests: [
			{ input: [ SV([1, 2]) ], output: false },
			{ input: [ CP(1, 2) ], output: false },
		],
	},
	"constructor cloneInput=false": {
		testName: (x: SqrtValue | Complex) => `new Scalar(${str(x)}, false) should reuse input`,
		testFunc: (x: any) => {
			const sc = new Scalar(x, false);
			if (x instanceof SqrtValue) x.terms.set(2n, F(99));
			else x.real = 99;
			return sc.equal(x);
		},
		tests: [
			{ input: [ SV([1, 2]) ], output: true },
			{ input: [ CP(1, 2) ], output: true },
		],
	},
	".isZero": {
		testName: (sc: Scalar) => `(${str(sc)}).isZero()`,
		testFunc: (sc: Scalar) => sc.isZero(),
		tests: [
			{ input: [ SC(0n) ], output: true },
			{ input: [ SC(SV([1, 2])) ], output: false },
			{ input: [ SC(CP(0, 0)) ], output: true },
		],
	},
	".toLatex": {
		testName: (sc: Scalar) => `(${str(sc)}).toLatex()`,
		testFunc: (sc: Scalar) => sc.toLatex(),
		tests: [
			{ input: [ SC(SV([F(1, 2), 1], [F(1, 3), 2])) ], output: "\\frac{3+2\\sqrt{2}}{6}" },
			{ input: [ SC(CP(2, -3)) ], output: "2-3i" },
		],
	},
	".conj": {
		testName: (sc: Scalar) => `(${str(sc)}).conj()`,
		testFunc: (sc: Scalar) => sc.conj(),
		tests: [
			{ input: [ SC(SV([2, 1], [3, -2], [5, 6])) ], output: SC(SV([2, 1], [-3, -2], [5, 6]), false) },
			{ input: [ SC(CP(2, -3)) ], output: SC(CP(2, 3), false) },
		],
	},
	".real": {
		testName: (sc: Scalar) => `(${str(sc)}).real()`,
		testFunc: (sc: Scalar) => sc.real(),
		tests: [
			{ input: [ SC(SV([2, 1], [3, -2], [5, 6])) ], output: SC(SV([2, 1], [5, 6]), false) },
			{ input: [ SC(CP(2, 3)) ], output: SC(2) },
		],
	},
	".imag": {
		testName: (sc: Scalar) => `(${str(sc)}).imag()`,
		testFunc: (sc: Scalar) => sc.imag(),
		tests: [
			{ input: [ SC(SV([2, 1], [3, -2], [5, 6])) ], output: SC(SV([3, 2]), false) },
			{ input: [ SC(CP(2, 3)) ], output: SC(3) },
		],
	},
	".copy": {
		testName: (sc: Scalar) => `Object (Scalar) copy test`,
		testFunc: (sc: any) => {
			const sc_copy = sc.copy();
			if (sc_copy.value instanceof SqrtValue) sc_copy.value.terms.set(2n, F(99));
			else sc_copy.value.real = 99;
			return sc;
		},
		tests: [
			{ input: [ SC(SV([1, 2])) ], output: SC(SV([1, 2]), false) },
			{ input: [ SC(CP(1, 2)) ], output: SC(CP(1, 2), false) },
		],
	},
	".neg": {
		testName: (sc: Scalar) => `-(${str(sc)})`,
		testFunc: (sc: Scalar) => sc.neg(),
		tests: [
			{ input: [ SC(SV([2, 1], [3, -2])) ], output: SC(SV([-2, 1], [-3, -2]), false) },
			{ input: [ SC(CP(1, -2)) ], output: SC(CP(-1, 2), false) },
		],
	},
	".add": {
		testName: (sc: Scalar, x: any) => `(${str(sc)}) + (${str(x)})`,
		testFunc: (sc: Scalar, x: any) => sc.add(x),
		tests: [
			{ input: [ SC(SV([1, 2])), SV([3, 8]) ], output: SC(SV([7, 2]), false) },
			{ input: [ SC(SV([1, 2])), F(1, 2) ], output: SC(SV([F(1, 2), 1], [1, 2]), false) },
			{ input: [ SC(SV([1, 2])), CP(1, 2) ], output: SC(CP(1 + Math.sqrt(2), 2), false) },
			{ input: [ SC(CP(1, 2)), SV([3, 1], [2, -1]) ], output: SC(CP(4, 4), false) },
			{ input: [ SC(CP(1, 2)), NaN ], error: ParamNorm.NanError },
		],
	},
	".sub": {
		testName: (sc: Scalar, x: any) => `(${str(sc)}) - (${str(x)})`,
		testFunc: (sc: Scalar, x: any) => sc.sub(x),
		tests: [
			{ input: [ SC(SV([1, 2])), SV([3, 8]) ], output: SC(SV([-5, 2]), false) },
			{ input: [ SC(SV([1, 2])), F(1, 2) ], output: SC(SV([F(-1, 2), 1], [1, 2]), false) },
			{ input: [ SC(SV([1, 2])), CP(1, 2) ], output: SC(CP(Math.sqrt(2) - 1, -2), false) },
			{ input: [ SC(CP(1, 2)), SV([3, 1], [2, -1]) ], output: SC(CP(-2, 0), false) },
			{ input: [ SC(CP(1, 2)), NaN ], error: ParamNorm.NanError },
		],
	},
	".mul": {
		testName: (sc: Scalar, x: any) => `(${str(sc)}) * (${str(x)})`,
		testFunc: (sc: Scalar, x: any) => sc.mul(x),
		tests: [
			{ input: [ SC(SV([1, 2])), SV([3, 8]) ], output: SC(SV([12, 1]), false) },
			{ input: [ SC(SV([1, 2])), F(1, 2) ], output: SC(SV([F(1, 2), 2]), false) },
			{ input: [ SC(SV([1, 2])), CP(1, 2) ], output: SC(CP(Math.sqrt(2), 2 * Math.sqrt(2)), false) },
			{ input: [ SC(CP(1, 2)), SV([3, 1], [2, -1]) ], output: SC(CP(-1, 8), false) },
			{ input: [ SC(CP(1, 2)), NaN ], error: ParamNorm.NanError },
		],
	},
	".div": {
		testName: (sc: Scalar, x: any, cmp: Scalar) => `(${str(sc)}) / (${str(x)}) == (${str(cmp)})`,
		testFunc: (sc: Scalar, x: any, cmp: Scalar) => sc.div(x).equal(cmp),
		tests: [
			{ input: [ SC(SV([1, 2])), SV([1, 2]), SC(1) ], output: true },
			{ input: [ SC(SV([1, -2])), F(1, 2), SC(SV([2, -2]), false) ], output: true },
			{ input: [ SC(SV([1, 2])), CP(1, 1), SC(CP(Math.sqrt(2) / 2, -Math.sqrt(2) / 2), false) ], output: true },
			{ input: [ SC(CP(1, 2)), SV([2, 1]), SC(CP(0.5, 1), false) ], output: true },
			{ input: [ SC(CP(1, 2)), 0, SC(0) ], error: Scalar.DivideZeroError },
			{ input: [ SC(CP(1, 2)), NaN, SC(0) ], error: ParamNorm.NanError },
		],
	},
	".pow": {
		testName: (sc: Scalar, x: number | bigint) => `(${str(sc)}) ^ (${str(x)})`,
		testFunc: (sc: Scalar, x: number | bigint) => sc.pow(x),
		tests: [
			{ input: [ SC(SV([1, 2])), 2 ], output: SC(SV([2, 1]), false) },
			{ input: [ SC(SV([1, 2])), -1 ], output: SC(SV([F(1, 2), 2]), false) },
			{ input: [ SC(CP(0, 1)), 2 ], output: SC(CP(-1, 0), false) },
			{ input: [ SC(CP(1, 1)), 0 ], output: SC(CP(1, 0), false) },
			{ input: [ SC(0), -1 ], error: Scalar.DivideZeroError },
			{ input: [ SC(1), 3.5 ], error: ParamNorm.NonIntError },
		],
	},
	".equal": {
		testName: (sc: Scalar, x: any) => `(${str(sc)}) == (${str(x)})`,
		testFunc: (sc: Scalar, x: any) => sc.equal(x),
		tests: [
			{ input: [ SC(SV([1, 8])), SV([2, 2]) ], output: true },
			{ input: [ SC(SV([1, 2])), CP(Math.sqrt(2), 0) ], output: true },
			{ input: [ SC(CP(3, 2)), SV([3, 1], [2, -1]) ], output: true },
			{ input: [ SC(CP(1, 2)), SV([1, 2]) ], output: false },
			{ input: [ SC(SV([1, 2])), 3.5 ], output: false },
			{ input: [ SC(SV([1, 2])), NaN ], error: ParamNorm.NanError },
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
				if (actual instanceof Scalar && t.output instanceof Scalar) expect(actual.equal(t.output)).toBe(true);
				else expect(actual).toStrictEqual(t.output);
			}
			if ("error" in t) expect(() => testData.testFunc(...t.input)).toThrow(t.error); // 報錯就檢查 error instance
		}
	);
});
