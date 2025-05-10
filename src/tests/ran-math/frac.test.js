import { beforeEach, afterEach, vi, test, expect, describe } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { Frac } from "RanMath";

const testArr_isFrac = [ // 測資
	{ value: 0, output: false },
	{ value: new Frac(3), output: true },
	{ value: new Frac(3, -6), output: true },
	{ value: true, output: false },
	{ value: {}, output: false },
];
describe("Frac.isFrac", () => {
	test.each(testArr_isFrac)(
		"$value is Frac instance? $output",
		({ value, output, error }) => {
			expect(Frac.isFrac(value)).toBe(output)
			
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
// ---------- test area ----------
