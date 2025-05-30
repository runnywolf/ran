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
	"Hop.add": {
		testName: "Hop.add($input.0, $input.1) = $output",
		testFunc: ([ nf1, nf2 ]) => Hop.add(nf1, nf2),
		tests: [
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(-11, 8) },
			{ input: [ F(2, 7), F(-3, 5) ], output: F(-11, 35) },
			{ input: [ F(3, 7), -3 ], output: F(-18, 7) },
			{ input: [ 17, F(-5, 37) ], output: F(624, 37) },
			{ input: [ 9.0, -10.0 ], output: F(-1, 1) },
			{ input: [ 0.4, F(3, 5) ], output: 1 },
			{ input: [ 10, -0.7 ], output: 9.3 },
			{ input: [ F(3, 7), 2.6 ], output: 3.0285714285714285 },
			{ input: [ F(3, 7), "2" ], output: NaN },
		]
	},
	"Hop.sub": {
		testName: "Hop.sub($input.0, $input.1) = $output",
		testFunc: ([ nf1, nf2 ]) => Hop.sub(nf1, nf2),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(-1, 8) },
			{ input: [ F(2, 7), F(-3, 5) ], output: F(31, 35) },
			{ input: [ F(3, 7), -3 ], output: F(24, 7) },
			{ input: [ 17, F(-5, 37) ], output: F(634, 37) },
			{ input: [ 10, 0 ], output: F(10, 1) },
			{ input: [ F(-500), -500 ], output: F(0, 1) },
			{ input: [ F(6, 7), 3.5 ], output: -2.642857142857143 },
			{ input: [ F(8), "8" ], output: NaN },
		]
	},
	"Hop.mul": {
		testName: "Hop.mul($input.0, $input.1) = $output",
		testFunc: ([ nf1, nf2 ]) => Hop.mul(nf1, nf2),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(15, 32) },
			{ input: [ F(7, 4), F(3, 5) ], output: F(21, 20) },
			{ input: [ F(3, 7), -3 ], output: F(-9, 7) },
			{ input: [ 4, F(7, 10) ], output: F(14, 5) },
			{ input: [ F(-5, 12), 9 ], output: F(-15, 4) },
			{ input: [ -500, -500 ], output: F(250000, 1) },
			{ input: [ F(6, 7), 3.5 ], output: 3 },
			{ input: [ 2.5, F(2, 5) ], output: 1 },
			{ input: [ "8", F(8) ], output: NaN },
		]
	},
	"Hop.div": {
		testName: "Hop.div($input.0, $input.1) = $output",
		testFunc: ([ nf1, nf2 ]) => Hop.div(nf1, nf2),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(6, 5) },
			{ input: [ F(7, 4), F(3, 5) ], output: F(35, 12) },
			{ input: [ F(3, 7), -3 ], output: F(-1, 7) },
			{ input: [ 4, F(7, 10) ], output: F(40, 7) },
			{ input: [ F(-500), -500 ], output: F(1, 1) },
			{ input: [ F(6, 7), 3.5 ], output: 0.2448979591836734693 },
			{ input: [ 2.5, F(5, 2) ], output: 1 },
			{ input: [ "8", F(8) ], output: NaN },
			{ input: [ 8, F(0) ], output: NaN, error: "[RanMath][Hop.div] Div 0 error." },
		]
	},
	"Hop.pow": {
		testName: "Hop.pow($input.0, $input.1) = $output",
		testFunc: ([ nf1, nf2 ]) => Hop.pow(nf1, nf2),
		tests: [ // 測資
			{ input: [ F(2, 3), 0 ], output: F(1) }, // f^0 = 1
			{ input: [ F(0), F(0) ], output: F(1) }, // 0^0 = 1
			{ input: [ 0, F(10000) ], output: F(0) }, // 0^i = 0
			{ input: [ F(0), F(-2) ], output: F(0), error: "[RanMath][Frac.pow] 0^-n is undefined." }, // 0^-i = 0 (error)
			{ input: [ F(-7, 3), -1 ], output: F(-3, 7) }, // f^-1 = 1/f
			{ input: [ F(12, 5), F(1) ], output: F(12, 5) }, // f^1 = f
			{ input: [ F(4, 25), F(1, 2) ], output: F(2, 5) }, // f^f = f
			{ input: [ 2, F(1, 2) ], output: 1.4142135623730951 },
			{ input: [ F(216, 125), F(-2, 3) ], output: F(25, 36) }, // f^-f = f
			{ input: [ F(-8, 1), F(1, 3) ], output: NaN }, // -f^f = NaN
			{ input: [ F(2, 3), 1.6 ], output: 0.52270178778874381003 },
			{ input: [ 1.6, F(2, 3) ], output: 1.36798075734135759148 },
			{ input: [ F(-7, 3), "3" ], output: NaN },
		]
	},
	"Hop.equal": {
		testName: "Hop.equal($input.0, $input.1) = $output",
		testFunc: ([ nf1, nf2 ]) => Hop.equal(nf1, nf2),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: false },
			{ input: [ F(-7, 4), F(7, -4) ], output: true },
			{ input: [ F(4), 4 ], output: true },
			{ input: [ 0.0, F(0) ], output: true },
			{ input: [ 1.0, 1 ], output: true },
			{ input: [ 0.1+0.2, 0.3 ], output: false },
			{ input: [ "7", F(7) ], output: false },
		]
	},
	"Hop.lt": {
		testName: "Hop.lt($input.0, $input.1) = $output",
		testFunc: ([ nf1, nf2 ]) => Hop.lt(nf1, nf2),
		tests: [ // 測資
			{ input: [ F(8, 6), F(20, 15) ], output: false },
			{ input: [ F(-16, 7), F(-3, 5) ], output: true },
			{ input: [ F(6, 3), 2 ], output: false },
			{ input: [ 7, F(7, 10) ], output: false },
			{ input: [ 7.2, 9 ], output: true },
			{ input: [ "-7", F(7) ], output: false },
		]
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
