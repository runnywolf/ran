// 這是一個簡易的測試程式模板, 專用於 RanMath. (避免忘記語法)

import { beforeEach, afterEach, vi, test, expect } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { /* method or class */ } from "ran-math";

const testArr = [ // 測資
	{ a: 0, b: 0, output: 0 }, // 不會報錯的測資
	{ a: NaN, b: NaN, output: NaN, error: '[RanMath][<methodName>] <errMessage>' }, // 會報錯的測資
];

test.each(testArr)(
	"<function>($a, $b) = $output",
	({ a, b, output, error }) => {
		expect(/* <function>(a, b) */).toBe(output)
		// expect(/* <function>(a, b) */).toStrictEqual(output) // if output is Object -> deep check
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
