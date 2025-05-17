import { beforeEach, afterEach, vi, test, expect } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { getSquareFactor } from "ran-math";

const testArr = [ // 測資
	{ n: 0, output: 1 },      // 0 的最大平方因數定義為 1
	{ n: 1, output: 1 },      // 1 = 1^2
	{ n: 4, output: 2 },      // 4 = 2^2
	{ n: 18, output: 3 },     // 18 = 9*2, 9 = 3^2
	{ n: -72, output: 6 },    // |-72| = 36*2, 36 = 6^2
	{ n: 97, output: 1 },     // 97 為質數，無平方因數
	{ n: 225, output: 15 },   // 225 = 15^2
	{ n: 1024, output: 32 },  // 1024 = 32^2
	{ n: -50, output: 5 },    // |-50| = 25*2, 25 = 5^2
	{ n: 123456, output: 8 }, // 123456 = 64*1929, 36 = 6^2
	{ n: NaN, output: NaN, error: '[RanMath][getSquareFactor] Param "n" must be a integer.' },
	{ n: {}, output: NaN, error: '[RanMath][getSquareFactor] Param "n" must be a integer.' },
];

test.each(testArr)(
	"The largest square factor of $n is $output^2",
	({ n, output, error }) => {
		expect(getSquareFactor(n)).toBe(output)
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
