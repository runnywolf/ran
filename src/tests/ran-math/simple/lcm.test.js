import { beforeEach, afterEach, vi, test, expect } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { lcm } from "ran-math";

const testArr = [ // 測資
	{ a: 0, b: 0, output: 0 },
	{ a: 0, b: 5, output: 0 },
	{ a: 4, b: 6, output: 12 },
	{ a: -4, b: 6, output: 12 },
	{ a: 21, b: 6, output: 42 },
	{ a: 123456, b: 789012, output: 8117355456 },
	{ a: 1.5, b: -6, output: NaN, error: '[RanMath][lcm] Param "a" & "b" must be a integer.' },
	{ a: 1, b: NaN, output: NaN, error: '[RanMath][lcm] Param "a" & "b" must be a integer.' },
	{ a: 166, b: [], output: NaN, error: '[RanMath][lcm] Param "a" & "b" must be a integer.' },
];

test.each(testArr)(
	"lcm($a, $b) = $output",
	({ a, b, output, error }) => {
		expect(lcm(a, b)).toBe(output)
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
