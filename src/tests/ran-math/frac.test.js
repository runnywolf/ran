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
// ---------- test area ----------
