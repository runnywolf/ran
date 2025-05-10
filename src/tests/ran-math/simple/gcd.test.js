import { beforeEach, afterEach, vi, test, expect } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { gcd } from "RanMath";

const testArr = [ // 測資
	{ a: 0, b: 0, output: 0 },
	{ a: 0, b: 45, output: 45 },
	{ a: 1, b: 1, output: 1 },
	{ a: 1, b: -1, output: 1 },
	{ a: -60, b: 36, output: 12 },
	{ a: -81, b: -27, output: 27 },
	{ a: 123456, b: 789012, output: 12 },
	{ a: 982451, b: 578851, output: 1 },
	{ a: 1.5, b: -6, output: NaN, error: '[RanMath][gcd] Param "a" & "b" must be a integer.' },
	{ a: 1, b: NaN, output: NaN, error: '[RanMath][gcd] Param "a" & "b" must be a integer.' },
	{ a: 166, b: [], output: NaN, error: '[RanMath][gcd] Param "a" & "b" must be a integer.' },
];

test.each(testArr)(
	"gcd($a, $b) = $output",
	({ a, b, output, error }) => {
		expect(gcd(a, b)).toBe(output)
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
