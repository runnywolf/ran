import { beforeEach, afterEach, vi, test, expect } from "vitest";

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

test.each(testArr_isFrac)(
	"$value is Frac instance? $output",
	({ value, output, error }) => {
		expect(Frac.isFrac(value)).toBe(output)
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
