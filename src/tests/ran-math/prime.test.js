import { beforeEach, afterEach, vi, test, expect } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { Prime } from "ran-math";

const testArr_getNth = [ // 測資
	{ n: -5, output: NaN },
	{ n: 0, output: 2 },
	{ n: 4, output: 11 },
	{ n: 828, output: 6361 },
	{ n: 11678, output: 124339 },
	{ n: NaN, output: NaN, error: '[RanMath][Prime.getNth] Param "n" must be a integer.' }, // 會報錯的測資
	{ n: [], output: NaN, error: '[RanMath][Prime.getNth] Param "n" must be a integer.' }, // 會報錯的測資
];
test.each(testArr_getNth)(
	"[Prime.getNth] No.$n prime number is $output",
	({ n, output, error }) => {
		expect(Prime.getNth(n)).toBe(output)
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);

const testArr_isPrime = [ // 測資
	{ n: -335, output: false },
	{ n: 1, output: false },
	{ n: 2, output: true },
	{ n: 67939, output: true },
	{ n: 100000, output: false },
	{ n: NaN, output: false, error: '[RanMath][Prime.isPrime] Param "n" must be a integer.' }, // 會報錯的測資
	{ n: [], output: false, error: '[RanMath][Prime.isPrime] Param "n" must be a integer.' }, // 會報錯的測資
];
test.each(testArr_isPrime)(
	"[Prime.isPrime] No.$n prime number is $output",
	({ n, output, error }) => {
		expect(Prime.isPrime(n)).toBe(output)
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
