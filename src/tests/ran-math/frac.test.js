import { beforeEach, afterEach, vi, test, expect, describe } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { Frac, F } from "ran-math";

const testArr_isFrac = [ // 測資
	{ value: 0, output: false },
	{ value: F(3), output: true },
	{ value: F(3, -6), output: true },
	{ value: true, output: false },
	{ value: {}, output: false },
];
describe("Frac.isFrac", () => {
	test.each(testArr_isFrac)(
		"Frac.isFrac($value) = $output",
		({ value, output, error }) => {
			expect(Frac.isFrac(value)).toBe(output)
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_fromStr = [ // 測資
	{ str: "4", output: [4, 1] },
	{ str: " -7", output: [-7, 1] },
	{ str: "6/-9", output: [-2, 3] },
	{ str: " -12 /   7 ", output: [-12, 7] },
	{ str: 4, output: [0, 1] }, // str 不是字串
	{ str: "", output: [0, 1] }, // 空字串
	{ str: "2.5/1", output: [0, 1] }, // 子字串不是整數
	{ str: "2/1/3", output: [0, 1] }, // 子字串過多
	{ str: "2/0", output: [0, 1], error: '[RanMath][Frac.constructor] The denominator cannot be 0.' }, // 分母為 0
];
describe("Frac.fromStr", () => {
	test.each(testArr_fromStr)(
		"Frac.fromStr($str) = $output.0/$output.1",
		({ str, output, error }) => {
			const frac = Frac.fromStr(str);
			expect([frac.n, frac.d]).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_sum = [ // 測資
	{ arr: [], output: [0, 1] },
	{ arr: [F(9, 8), F(1), F(1, 3)], output: [59, 24] },
	{ arr: [F(9, 8), 2.5, "7", F(1), F(1, 3)], output: [59, 24] },
	{ arr: [5, F(1, 2), 3, F(-2, 3)] , output: [47, 6] },
	{ arr: [3, F(5, 2), -2, F(-3, 4), 1, F(1, 6), 0], output: [47, 12] },
	{ arr: [F(1, 2), F(2, 3), F(3, 5), F(4, 7), F(5, 11)], output: [6451, 2310] },
	{ arr: [F(1, 2), F(2, 3), F(3, 5)], output: [53, 30] },
	{ arr: F(2, 5), output: [0, 1], error: '[RanMath][Frac.sum] Param "arr" must be an Array.' },
	{ arr: { key: F(2, 5) }, output: [0, 1], error: '[RanMath][Frac.sum] Param "arr" must be an Array.' },
];
describe("Frac.sum", () => {
	test.each(testArr_sum)(
		"Frac.sum($arr) = $output.0/$output.1",
		({ arr, output, error }) => {
			const frac = Frac.sum(arr);
			expect([frac.n, frac.d]).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_constructor = [ // 測資
	{ n: undefined, d: undefined, output: [0, 1] },
	{ n: 3, d: undefined, output: [3, 1] },
	{ n: 6, d: -9, output: [-2, 3] },
	{ n: NaN, d: 7, output: [0, 1], error: '[RanMath][Frac.constructor] Param "n" & "d" must be a integer.' },
	{ n: -2, d: "3", output: [0, 1], error: '[RanMath][Frac.constructor] Param "n" & "d" must be a integer.' },
	{ n: 5, d: 0, output: [0, 1], error: '[RanMath][Frac.constructor] The denominator cannot be 0.' },
];
describe("constructor", () => {
	test.each(testArr_constructor)(
		"new Frac($n, $d) = $output.0/$output.1",
		({ n, d, output, error }) => {
			const frac = new Frac(n, d);
			expect([frac.n, frac.d]).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_copy = [ // 測資
	{ frac: F(2), output: [2, 1] },
	{ frac: F(2, 3), output: [2, 3] },
	{ frac: F(6, -9), output: [-2, 3] },
];
describe(".copy", () => {
	test.each(testArr_copy)(
		"($frac.n/$frac.d).copy() = $output.0/$output.1",
		({ frac, output, error }) => {
			const frac_ = frac.copy();
			expect([frac_.n, frac_.d]).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_isZero = [ // 測資
	{ frac: F(0), output: true },
	{ frac: F(2, 3), output: false },
	{ frac: F(0, -7), output: true },
];
describe(".isZero", () => {
	test.each(testArr_isZero)(
		"($frac.n/$frac.d).isZero() = $output",
		({ frac, output, error }) => {
			expect(frac.isZero()).toBe(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_isInt = [ // 測資
	{ frac: F(0), output: true },
	{ frac: F(2, 3), output: false },
	{ frac: F(0, -7), output: true },
	{ frac: F(-15, 5), output: true },
	{ frac: F(4), output: true },
	{ frac: F(6, -9), output: false },
];
describe(".isInt", () => {
	test.each(testArr_isInt)(
		"($frac.n/$frac.d).isZero() = $output",
		({ frac, output, error }) => {
			expect(frac.isInt()).toBe(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_toStr = [ // 測資
	{ frac: F(2), output: "2" },
	{ frac: F(-9, 3), output: "-3" },
	{ frac: F(2, 3), output: "2/3" },
	{ frac: F(-1, 3), output: "-1/3" },
	{ frac: F(0, 1), output: "0" },
];
describe(".toStr", () => {
	test.each(testArr_toStr)(
		"($frac.n/$frac.d).toStr() = $output",
		({ frac, output, error }) => {
			expect(frac.toStr()).toBe(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_toLatex = [ // 測資
	{ frac: F(2), output: "2" },
	{ frac: F(-9, 3), output: "-3" },
	{ frac: F(2, 3), output: "\\frac{2}{3}" },
	{ frac: F(-1, 3), output: "\\frac{-1}{3}" },
	{ frac: F(0, 1), output: "0" },
];
describe(".toLatex", () => {
	test.each(testArr_toLatex)(
		"($frac.n/$frac.d).toLatex() = $output",
		({ frac, output, error }) => {
			expect(frac.toLatex()).toBe(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_toFloat = [ // 測資
	{ frac: F(2), output: 2 },
	{ frac: F(-9, 3), output: -3 },
	{ frac: F(2, 3), output: 2/3 },
	{ frac: F(3, 5), output: 0.6 },
	{ frac: F(0, 1), output: 0 },
];
describe(".toFloat", () => {
	test.each(testArr_toFloat)(
		"($frac.n/$frac.d).toFloat() = $output",
		({ frac, output, error }) => {
			expect(frac.toFloat()).toBe(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_add = [ // 測資
	{ frac: F(-3, 4), nf: F(-5, 8), output: F(-11, 8) },
	{ frac: F(7, 4), nf: F(3, 5), output: F(47, 20) },
	{ frac: F(0, 3), nf: F(-2, 3), output: F(-2, 3) },
	{ frac: F(2, 7), nf: F(-3, 5), output: F(-11, 35) },
	{ frac: F(346, 7835), nf: F(-11307, 5127), output: F(-28938801, 13390015) },
	{ frac: F(3, 7), nf: -3, output: F(-18, 7) },
	{ frac: F(-5, 3), nf: 5, output: F(10, 3) },
	{ frac: F(-5, 37), nf: 17, output: F(624, 37) },
	{ frac: F(10), nf: -10, output: F(0, 1) },
	{ frac: F(-500), nf: 500, output: F(0, 1) },
	{ frac: F(6, 7), nf: 3.5, output: F(6, 7), error: '[RanMath][Frac.add] Param "nf" must be a Frac or int.' },
	{ frac: F(8), nf: "8", output: F(8), error: '[RanMath][Frac.add] Param "nf" must be a Frac or int.' },
];
describe(".add", () => {
	test.each(testArr_add)(
		"($frac.n/$frac.d) + ($nf) = $output.n/$output.d",
		({ frac, nf, output, error }) => {
			expect(frac.add(nf)).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_sub = [ // 測資
	{ frac: F(-3, 4), nf: F(-5, 8), output: F(-1, 8) },
	{ frac: F(7, 4), nf: F(3, 5), output: F(23, 20) },
	{ frac: F(0, 3), nf: F(-2, 3), output: F(2, 3) },
	{ frac: F(2, 7), nf: F(-3, 5), output: F(31, 35) },
	{ frac: F(1346, 7835), nf: F(-11307, 5127), output: F(31830429, 13390015) },
	{ frac: F(3, 7), nf: -3, output: F(24, 7) },
	{ frac: F(-5, 3), nf: 5, output: F(-20, 3) },
	{ frac: F(-5, 37), nf: 17, output: F(-634, 37) },
	{ frac: F(10), nf: 0, output: F(10, 1) },
	{ frac: F(-500), nf: -500, output: F(0, 1) },
	{ frac: F(6, 7), nf: 3.5, output: F(6, 7), error: '[RanMath][Frac.sub] Param "nf" must be a Frac or int.' },
	{ frac: F(8), nf: "8", output: F(8), error: '[RanMath][Frac.sub] Param "nf" must be a Frac or int.' },
];
describe(".sub", () => {
	test.each(testArr_sub)(
		"($frac.n/$frac.d) - ($nf) = $output.n/$output.d",
		({ frac, nf, output, error }) => {
			expect(frac.sub(nf)).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_mul = [ // 測資
	{ frac: F(-3, 4), nf: F(-5, 8), output: F(15, 32) },
	{ frac: F(7, 4), nf: F(3, 5), output: F(21, 20) },
	{ frac: F(0, 3), nf: F(-2, 3), output: F(0, 1) },
	{ frac: F(12, 5), nf: F(10, 9), output: F(8, 3) },
	{ frac: F(1346, 7835), nf: F(-11307, 5127), output: F(-5073074, 13390015) },
	{ frac: F(3, 7), nf: -3, output: F(-9, 7) },
	{ frac: F(7, 10), nf: 4, output: F(14, 5) },
	{ frac: F(-5, 12), nf: 9, output: F(-15, 4) },
	{ frac: F(-500), nf: -500, output: F(250000, 1) },
	{ frac: F(2, 3), nf: 0, output: F(0, 1) },
	{ frac: F(6, 7), nf: 3.5, output: F(6, 7), error: '[RanMath][Frac.mul] Param "nf" must be a Frac or int.' },
	{ frac: F(8), nf: "8", output: F(8), error: '[RanMath][Frac.mul] Param "nf" must be a Frac or int.' },
];
describe(".mul", () => {
	test.each(testArr_mul)(
		"($frac.n/$frac.d) * ($nf) = $output.n/$output.d",
		({ frac, nf, output, error }) => {
			expect(frac.mul(nf)).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_div = [ // 測資
	{ frac: F(-3, 4), nf: F(-5, 8), output: F(6, 5) },
	{ frac: F(7, 4), nf: F(3, 5), output: F(35, 12) },
	{ frac: F(0, 3), nf: F(-2, 3), output: F(0, 1) },
	{ frac: F(12, 5), nf: F(10, 9), output: F(54, 25) },
	{ frac: F(1346, 7835), nf: F(-11307, 5127), output: F(-2300314, 29530115) },
	{ frac: F(3, 7), nf: -3, output: F(-1, 7) },
	{ frac: F(7, 10), nf: 4, output: F(7, 40) },
	{ frac: F(-3, 5), nf: 9, output: F(-1, 15) },
	{ frac: F(-500), nf: -500, output: F(1, 1) },
	{ frac: F(2, 3), nf: 0, output: F(2, 3), error: '[RanMath][Frac.div] Div 0 error.' },
	{ frac: F(6, 7), nf: 3.5, output: F(6, 7), error: '[RanMath][Frac.div] Param "nf" must be a Frac or int.' },
	{ frac: F(8), nf: "8", output: F(8), error: '[RanMath][Frac.div] Param "nf" must be a Frac or int.' },
];
describe(".div", () => {
	test.each(testArr_div)(
		"($frac.n/$frac.d) / ($nf) = $output.n/$output.d",
		({ frac, nf, output, error }) => {
			expect(frac.div(nf)).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_pow = [ // 測資
	{ frac: F(2, 3), i: 0, output: F(1) },
	{ frac: F(0), i: 0, output: F(1) },
	{ frac: F(0), i: 10000, output: F(0) },
	{ frac: F(-7, 3), i: -1, output: F(-3, 7) },
	{ frac: F(12, 5), i: 1, output: F(12, 5) },
	{ frac: F(3), i: 7, output: F(2187) },
	{ frac: F(-6, 5), i: -4, output: F(625, 1296) },
	{ frac: F(-6, 5), i: 2, output: F(36, 25) },
	{ frac: F(6, 7), i: 3.5, output: F(6, 7), error: '[RanMath][Frac.pow] Power must be an int.' },
	{ frac: F(-3, 5), i: F(2), output: F(-3, 5), error: '[RanMath][Frac.pow] Power must be an int.' },
	{ frac: F(8), i: "8", output: F(8), error: '[RanMath][Frac.pow] Power must be an int.' },
];
describe(".pow", () => {
	test.each(testArr_pow)(
		"($frac.n/$frac.d) ^ ($i) = $output.n/$output.d",
		({ frac, i, output, error }) => {
			expect(frac.pow(i)).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_equal = [ // 測資
	{ frac: F(8, 6), nf: F(20, 15), output: true },
	{ frac: F(7, 4), nf: F(7, 5), output: false },
	{ frac: F(7, -3), nf: F(-14, 6), output: true },
	{ frac: F(6, 3), nf: 2, output: true },
	{ frac: F(7, 10), nf: 7, output: false },
	{ frac: F(-3, 5), nf: -3, output: false },
	{ frac: F(6, 7), nf: 3.5, output: false, error: '[RanMath][Frac.equal] Param "nf" must be a Frac or int.' },
	{ frac: F(8), nf: "8", output: false, error: '[RanMath][Frac.equal] Param "nf" must be a Frac or int.' },
];
describe(".equal", () => {
	test.each(testArr_equal)(
		"($frac.n/$frac.d) == ($nf) = $output",
		({ frac, nf, output, error }) => {
			expect(frac.equal(nf)).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});

const testArr_lt = [ // 測資
	{ frac: F(8, 6), nf: F(20, 15), output: false },
	{ frac: F(7, 4), nf: F(7, 5), output: false },
	{ frac: F(-16, 7), nf: F(-3, 5), output: true },
	{ frac: F(6, 3), nf: 2, output: false },
	{ frac: F(7, 10), nf: 7, output: true },
	{ frac: F(-1, 555), nf: 0, output: true },
	{ frac: F(6, 7), nf: 3.5, output: false, error: '[RanMath][Frac.lt] Param "nf" must be a Frac or int.' },
	{ frac: F(8), nf: "8", output: false, error: '[RanMath][Frac.lt] Param "nf" must be a Frac or int.' },
];
describe(".lt", () => {
	test.each(testArr_lt)(
		"($frac.n/$frac.d) < ($nf) = $output",
		({ frac, nf, output, error }) => {
			expect(frac.lt(nf)).toStrictEqual(output);
			
			if (error) expect(spy).toHaveBeenCalledWith(error);
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});
// ---------- test area ----------
