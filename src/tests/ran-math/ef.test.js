import { beforeEach, afterEach, vi, test, expect, describe } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { F, _EF } from "ran-math";

const testData = {
	"EF.isEF": {
		testName: "EF.isEF($input) = $output",
		testFunc: _EF.isEF,
		tests: [ // 測資
			{ input: 0, output: false },
			{ input: new _EF(3), output: true },
			{ input: new _EF(3, -6), output: true },
			{ input: new _EF(3, -6, 2), output: true },
			{ input: true, output: false },
			{ input: {}, output: false },
		],
	},
	"EF.unitI": {
		testName: "EF.unitI().toStr() = $output",
		testFunc: (input) => _EF.unitI().toStr(),
		tests: [ // 測資
			{ output: "0 + 1 √ -1" },
		],
	},
	"constructor & .toStr": {
		testName: "new EF($input.0, $input.1, $input.2).toStr() = $output",
		testFunc: (input) => new _EF(...input).toStr(),
		tests: [ // 測資
			{ input: [], output: "0 + 0 √ 0" }, // zero param test *7
			{ input: [ 3 ], output: "3 + 0 √ 0" },
			{ input: [ 0, F(3, 4) ], output: "0 + 0 √ 0" },
			{ input: [ F(-2, 3), 5 ], output: "-2/3 + 0 √ 0" },
			{ input: [ 0, 0, F(1, 2) ], output: "0 + 0 √ 0" },
			{ input: [ F(4, 3), 0, 4 ], output: "4/3 + 0 √ 0" },
			{ input: [ 0, F(1, 3), -360 ], output: "0 + 2 √ -10" }, // zero param test *7
			{ input: [ -1, 3, F(4, 9) ], output: "1 + 0 √ 0" },
			{ input: [ -1, 3, F(-4, 9) ], output: "-1 + 2 √ -1" },
			{ input: [ -1, 3, F(2, 5) ], output: "-1 + 3/5 √ 10" },
			{ input: [ -1, 3, 0.4 ], output: "0.8974 + 0 √ 0" },
			{ input: [ -1, 3, -0.4 ], output: "-1 + 1.8974 √ -1" },
			{
				input: [ "-1", 3, F(2, 5) ],
				output: "0 + 3/5 √ 10",
				error: '[RanMath][EF.constructor] Param "nf_a" must be a Frac or int.'
			},
			{
				input: [ -1, "3", F(2, 5) ],
				output: "-1 + 0 √ 0",
				error: '[RanMath][EF.constructor] Param "nf_b" must be a Frac or int.'
			},
			{
				input: [ -1, 3, {} ],
				output: "-1 + 0 √ 0",
				error: '[RanMath][EF.constructor] Param "nf_s" must be a Frac or int.'
			},
		],
	},
};

for (const [key, testInfo] of Object.entries(testData)) describe(key, () => {
	test.each(testInfo.tests)(testInfo.testName + " ; error = $error", ({ input, output, error }) => {
		expect(testInfo.testFunc(input)).toStrictEqual(output);
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	});
});
// ---------- test area ----------
