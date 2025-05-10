import { expect, test } from "vitest";
import { getRandomInt } from "RanMath";

const testNumber = 10;
for (let i = 0; i < testNumber; i++) {
	test(`Random number is in [-5, 5]`, () => {
		const res = getRandomInt(-5, 5);
		expect(res).toBeGreaterThanOrEqual(-5);
		expect(res).toBeLessThanOrEqual(5);
	});
}

test(`Random number is in [-5, 5]`, () => {
	const res = getRandomInt(-5, 5);
	expect(res).toBeGreaterThanOrEqual(-5);
	expect(res).toBeLessThanOrEqual(5);
});

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
import { getRandomInt } from "RanMath";

for (let i = 0; i < testNumber; i++) test(`Random number is in [-5, 5]`, () => {
	const res = getRandomInt(-5, 5);
	expect(res).toBeGreaterThanOrEqual(-5);
	expect(res).toBeLessThanOrEqual(5);
});

const testArr = [ // 測資
	{ max: NaN, min: 6, output: NaN, error: '[RanMath][getRandomInt] Param "min" & "max" must be a integer.' },
	{ max: -2, min: Infinity, output: NaN, error: '[RanMath][getRandomInt] Param "min" & "max" must be a integer.' },
];

test.each(testArr)(
	"getRandomInt($n) = $output",
	({ min, max, output, error }) => {
		expect(getRandomInt(min, max)).toBe(output)
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
