import { beforeEach, afterEach, vi, test, expect, describe } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { Hop, F } from "ran-math";

const testData = {
	"Hop.isInt": {
		testName: "Hop.isInt($input) = $output",
		testFunc: Hop.isInt,
		tests: [ // 測資
			{ input: 2, output: true },
			{ input: F(-6, 2), output: true },
			{ input: 2.0, output: true },
			{ input: 3.5, output: false },
			{ input: F(-1, 2), output: false },
			{ input: "3", output: false },
			{ input: [], output: false },
		],
	},
	"Hop.isPosInt": {
		testName: "Hop.isPosInt($input) = $output",
		testFunc: Hop.isPosInt,
		tests: [ // 測資
			{ input: -2, output: false },
			{ input: F(-6, 2), output: false },
			{ input: 2.0, output: true },
			{ input: 0, output: false },
			{ input: 3.5, output: false },
			{ input: F(-1, 2), output: false },
			{ input: "3", output: false },
			{ input: [], output: false },
		],
	},
	"Hop.isNegInt": {
		testName: "Hop.isNegInt($input) = $output",
		testFunc: Hop.isNegInt,
		tests: [ // 測資
			{ input: -2, output: true },
			{ input: F(-6, 2), output: true },
			{ input: 2.0, output: false },
			{ input: 0, output: false },
			{ input: -3.5, output: false },
			{ input: F(-1, 2), output: false },
			{ input: "3", output: false },
			{ input: [], output: false },
		],
	},
	"Hop.isRational": {
		testName: "Hop.isRational($input) = $output",
		testFunc: Hop.isRational,
		tests: [ // 測資
			{ input: -2, output: true },
			{ input: F(-6, 2), output: true },
			{ input: 2.0, output: true },
			{ input: 0, output: true },
			{ input: -3.5, output: false },
			{ input: F(-1, 2), output: true },
			{ input: "3", output: false },
			{ input: [], output: false },
		],
	},
	"Hop.toStr": {
		testName: "Hop.toStr($input) = $output",
		testFunc: input => Hop.toStr(...input),
		tests: [ // 測資
			{ input: [ -2 ], output: "-2" },
			{ input: [ F(-17, 3) ], output: "-17/3" },
			{ input: [ F(3, 4) ], output: "3/4" },
			{ input: [ 2.0 ], output: "2" },
			{ input: [ 0 ], output: "0" },
			{ input: [ -3.5 ], output: "-3.5000" },
			{ input: [ -3.511678 ], output: "-3.5117" },
			{ input: [ 3.5776, 2 ], output: "3.58" },
			{ input: [ 37.5, 0 ], output: "38" },
			{ input: [ "3" ], output: "?" },
			{ input: [ [] ], output: "?" },
		],
	},
	"Hop.toLatex": {
		testName: "Hop.toLatex($input) = $output",
		testFunc: input => Hop.toLatex(...input),
		tests: [ // 測資
			{ input: [ -2 ], output: "-2" },
			{ input: [ F(-17, 3) ], output: "\\frac{-17}{3}" },
			{ input: [ F(3, 4) ], output: "\\frac{3}{4}" },
			{ input: [ 2.0 ], output: "2" },
			{ input: [ 0 ], output: "0" },
			{ input: [ -3.5 ], output: "-3.5000" },
			{ input: [ -3.511678 ], output: "-3.5117" },
			{ input: [ 3.5776, 2 ], output: "3.58" },
			{ input: [ 37.5, 0 ], output: "38" },
			{ input: [ "3" ], output: "?" },
			{ input: [ [] ], output: "?" },
		],
	},
};

for (const [key, testInfo] of Object.entries(testData)) describe(key, () => {
	test.each(testInfo.tests)(testInfo.testName, ({ input, output, error }) => {
		expect(testInfo.testFunc(input)).toStrictEqual(output);
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	});
});
// ---------- test area ----------
