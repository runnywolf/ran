import { beforeEach, afterEach, vi, test, expect, describe } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { Frac, F } from "ran-math";

const testData = {
	"Frac.isFrac": {
		testName: "Frac.isFrac($input) = $output",
		testFunc: Frac.isFrac,
		tests: [ // 測資
			{ input: 0, output: false },
			{ input: F(3), output: true },
			{ input: F(3, -6), output: true },
			{ input: true, output: false },
			{ input: {}, output: false },
		],
	},
	"Frac.fromStr": {
		testName: "Frac.fromStr($input) = $output.n/$output.d",
		testFunc: Frac.fromStr,
		tests: [ // 測資
			{ input: "4", output: F(4, 1) },
			{ input: " -7", output: F(-7, 1) },
			{ input: "6/-9", output: F(-2, 3) },
			{ input: " -12 /   7 ", output: F(-12, 7) },
			{ input: 4, output: F(0, 1) }, // 4 不是字串
			{ input: "", output: F(0, 1) }, // 空字串
			{ input: "2.5/1", output: F(0, 1) }, // 子字串不是整數
			{ input: "2/1/3", output: F(0, 1) }, // 子字串過多
			{ input: "2/0", output: F(0, 1), error: '[RanMath][Frac.constructor] The denominator cannot be 0.' }, // 分母為 0
		],
	},
	"Frac.sum": {
		testName: "Frac.sum($input) = $output.n/$output.d",
		testFunc: Frac.sum,
		tests: [ // 測資
			{ input: [], output: F(0, 1) },
			{ input: [F(9, 8), F(1), F(1, 3)], output: F(59, 24) },
			{ input: [F(9, 8), 2.5, "7", F(1), F(1, 3)], output: F(59, 24) },
			{ input: [5, F(1, 2), 3, F(-2, 3)] , output: F(47, 6) },
			{ input: [3, F(5, 2), -2, F(-3, 4), 1, F(1, 6), 0], output: F(47, 12) },
			{ input: [F(1, 2), F(2, 3), F(3, 5), F(4, 7), F(5, 11)], output: F(6451, 2310) },
			{ input: [F(1, 2), F(2, 3), F(3, 5)], output: F(53, 30) },
			{ input: F(2, 5), output: F(0, 1), error: '[RanMath][Frac.sum] Param "arr" must be an Array.' },
			{ input: { key: F(2, 5) }, output: F(0, 1), error: '[RanMath][Frac.sum] Param "arr" must be an Array.' },
		],
	},
	"constructor": {
		testName: "new Frac($input.n, $input.d) = $output.n/$output.d",
		testFunc: (input) => new Frac(input.n, input.d),
		tests: [ // 測資
			{ input:{ n: undefined, d: undefined }, output: F(0, 1) },
			{ input:{ n: 3, d: undefined }, output: F(3, 1) },
			{ input:{ n: 6, d: -9 }, output: F(-2, 3) },
			{ input:{ n: NaN, d: 7 }, output: F(0, 1), error: '[RanMath][Frac.constructor] Param "n" & "d" must be a integer.' },
			{ input:{ n: -2, d: "3" }, output: F(0, 1), error: '[RanMath][Frac.constructor] Param "n" & "d" must be a integer.' },
			{ input:{ n: 5, d: 0 }, output: F(0, 1), error: '[RanMath][Frac.constructor] The denominator cannot be 0.' },
		]
	},
	".copy": {
		testName: "($input.n/$input.d).copy() = $output.n/$output.d",
		testFunc: input => input.copy(),
		tests: [ // 測資
			{ input: F(2), output: F(2, 1) },
			{ input: F(2, 3), output: F(2, 3) },
			{ input: F(6, -9), output: F(-2, 3) },
		]
	},
	".isZero": {
		testName: "($input.n/$input.d).isZero() = $output",
		testFunc: input => input.isZero(),
		tests: [ // 測資
			{ input: F(0), output: true },
			{ input: F(2, 3), output: false },
			{ input: F(0, -7), output: true },
		]
	},
	".isInt": {
		testName: "($input.n/$input.d).isInt() = $output",
		testFunc: input => input.isInt(),
		tests: [ // 測資
			{ input: F(0), output: true },
			{ input: F(2, 3), output: false },
			{ input: F(0, -7), output: true },
			{ input: F(-15, 5), output: true },
			{ input: F(4), output: true },
			{ input: F(6, -9), output: false },
		]
	},
	".toStr": {
		testName: "($input.n/$input.d).toStr() = $output",
		testFunc: input => input.toStr(),
		tests: [ // 測資
			{ input: F(2), output: "2" },
			{ input: F(-9, 3), output: "-3" },
			{ input: F(2, 3), output: "2/3" },
			{ input: F(-1, 3), output: "-1/3" },
			{ input: F(0, 1), output: "0" },
		]
	},
	".toLatex": {
		testName: "($input.n/$input.d).toLatex() = $output",
		testFunc: input => input.toLatex(),
		tests: [ // 測資
			{ input: F(2), output: "2" },
			{ input: F(-9, 3), output: "-3" },
			{ input: F(2, 3), output: "\\frac{2}{3}" },
			{ input: F(-1, 3), output: "\\frac{-1}{3}" },
			{ input: F(0, 1), output: "0" },
		]
	},
	".toFloat": {
		testName: "($input.n/$input.d).toFloat() = $output",
		testFunc: input => input.toFloat(),
		tests: [ // 測資
			{ input: F(2), output: 2 },
			{ input: F(-9, 3), output: -3 },
			{ input: F(2, 3), output: 2/3 },
			{ input: F(3, 5), output: 0.6 },
			{ input: F(0, 1), output: 0 },
		]
	},
	".add": {
		testName: "($input.0.n/$input.0.d) + ($input.1) = $output.n/$output.d",
		testFunc: input => input[0].add(input[1]),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(-11, 8) },
			{ input: [ F(7, 4), F(3, 5) ], output: F(47, 20) },
			{ input: [ F(0, 3), F(-2, 3) ], output: F(-2, 3) },
			{ input: [ F(2, 7), F(-3, 5) ], output: F(-11, 35) },
			{ input: [ F(346, 7835), F(-11307, 5127) ], output: F(-28938801, 13390015) },
			{ input: [ F(3, 7), -3 ], output: F(-18, 7) },
			{ input: [ F(-5, 3), 5 ], output: F(10, 3) },
			{ input: [ F(-5, 37), 17 ], output: F(624, 37) },
			{ input: [ F(10), -10 ], output: F(0, 1) },
			{ input: [ F(-500), 500 ], output: F(0, 1) },
			{ input: [ F(6, 7), 3.5 ], output: F(6, 7), error: '[RanMath][Frac.add] Param "nf" must be a Frac or int.' },
			{ input: [ F(8), "8" ], output: F(8), error: '[RanMath][Frac.add] Param "nf" must be a Frac or int.' },
		]
	},
	".sub": {
		testName: "($input.0.n/$input.0.d) - ($input.1) = $output.n/$output.d",
		testFunc: input => input[0].sub(input[1]),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(-1, 8) },
			{ input: [ F(7, 4), F(3, 5) ], output: F(23, 20) },
			{ input: [ F(0, 3), F(-2, 3) ], output: F(2, 3) },
			{ input: [ F(2, 7), F(-3, 5) ], output: F(31, 35) },
			{ input: [ F(1346, 7835), F(-11307, 5127) ], output: F(31830429, 13390015) },
			{ input: [ F(3, 7), -3 ], output: F(24, 7) },
			{ input: [ F(-5, 3), 5 ], output: F(-20, 3) },
			{ input: [ F(-5, 37), 17 ], output: F(-634, 37) },
			{ input: [ F(10), 0 ], output: F(10, 1) },
			{ input: [ F(-500), -500 ], output: F(0, 1) },
			{ input: [ F(6, 7), 3.5 ], output: F(6, 7), error: '[RanMath][Frac.sub] Param "nf" must be a Frac or int.' },
			{ input: [ F(8), "8" ], output: F(8), error: '[RanMath][Frac.sub] Param "nf" must be a Frac or int.' },
		]
	},
	".mul": {
		testName: "($input.0.n/$input.0.d) * ($input.1) = $output.n/$output.d",
		testFunc: input => input[0].mul(input[1]),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(15, 32) },
			{ input: [ F(7, 4), F(3, 5) ], output: F(21, 20) },
			{ input: [ F(0, 3), F(-2, 3) ], output: F(0, 1) },
			{ input: [ F(12, 5), F(10, 9) ], output: F(8, 3) },
			{ input: [ F(1346, 7835), F(-11307, 5127) ], output: F(-5073074, 13390015) },
			{ input: [ F(3, 7), -3 ], output: F(-9, 7) },
			{ input: [ F(7, 10), 4 ], output: F(14, 5) },
			{ input: [ F(-5, 12), 9 ], output: F(-15, 4) },
			{ input: [ F(-500), -500 ], output: F(250000, 1) },
			{ input: [ F(2, 3), 0 ], output: F(0, 1) },
			{ input: [ F(6, 7), 3.5 ], output: F(6, 7), error: '[RanMath][Frac.mul] Param "nf" must be a Frac or int.' },
			{ input: [ F(8), "8" ], output: F(8), error: '[RanMath][Frac.mul] Param "nf" must be a Frac or int.' },
		]
	},
	".div": {
		testName: "($input.0.n/$input.0.d) / ($input.1) = $output.n/$output.d",
		testFunc: input => input[0].div(input[1]),
		tests: [ // 測資
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(6, 5) },
			{ input: [ F(7, 4), F(3, 5) ], output: F(35, 12) },
			{ input: [ F(0, 3), F(-2, 3) ], output: F(0, 1) },
			{ input: [ F(12, 5), F(10, 9) ], output: F(54, 25) },
			{ input: [ F(1346, 7835), F(-11307, 5127) ], output: F(-2300314, 29530115) },
			{ input: [ F(3, 7), -3 ], output: F(-1, 7) },
			{ input: [ F(7, 10), 4 ], output: F(7, 40) },
			{ input: [ F(-3, 5), 9 ], output: F(-1, 15) },
			{ input: [ F(-500), -500 ], output: F(1, 1) },
			{ input: [ F(2, 3), 0 ], output: F(2, 3), error: '[RanMath][Frac.div] Div 0 error.' },
			{ input: [ F(6, 7), 3.5 ], output: F(6, 7), error: '[RanMath][Frac.div] Param "nf" must be a Frac or int.' },
			{ input: [ F(8), "8" ], output: F(8), error: '[RanMath][Frac.div] Param "nf" must be a Frac or int.' },
		]
	},
	".pow": {
		testName: "($input.0.n/$input.0.d) ^ ($input.1) = $output",
		testFunc: input => input[0].pow(input[1]),
		tests: [ // 測資
			{ input: [ F(2, 3), 0 ], output: F(1) }, // f^0 = 1
			{ input: [ F(0), 0 ], output: F(1) }, // 0^0 = 1
			{ input: [ F(0), 10000 ], output: F(0) }, // 0^i = 0
			{ input: [ F(0), -2 ], output: F(0), error: "[RanMath][Frac.pow] 0^-n is undefined." }, // 0^-i = 0 (error)
			{ input: [ F(-7, 3), -1 ], output: F(-3, 7) }, // f^-1 = 1/f
			{ input: [ F(12, 5), 1 ], output: F(12, 5) }, // f^1 = f
			{ input: [ F(3), 7 ], output: F(2187) }, // i^i
			{ input: [ F(-6, 5), -4 ], output: F(625, 1296) }, // f^-i
			{ input: [ F(-6, 5), 3 ], output: F(-216, 125) }, // f^i
			
			{ input: [ F(2, 3), F(0) ], output: F(1) }, // f^0 = 1
			{ input: [ F(0), F(0) ], output: F(1) }, // 0^0 = 1
			{ input: [ F(0), F(10000) ], output: F(0) }, // 0^i = 0
			{ input: [ F(0), F(-2) ], output: F(0), error: "[RanMath][Frac.pow] 0^-n is undefined." }, // 0^-i = 0 (error)
			{ input: [ F(-7, 3), F(-1) ], output: F(-3, 7) }, // f^-1 = 1/f
			{ input: [ F(12, 5), F(1) ], output: F(12, 5) }, // f^1 = f
			{ input: [ F(4, 25), F(1, 2) ], output: F(2, 5) }, // f^f = f
			{ input: [ F(232630513987207, 762939453125), F(11, 17) ], output: F(1977326743, 48828125) }, // f^f = f
			{ input: [ F(232630513987208, 762939453125), F(11, 17) ], output: 40.49565169664012 }, // f^f = f
			{ input: [ F(2), F(1, 2) ], output: 1.4142135623730951 },
			{ input: [ F(216, 125), F(-2, 3) ], output: F(25, 36) }, // f^-f = f
			{ input: [ F(-8, 1), F(1, 3) ], output: NaN }, // -f^f = NaN
			
			{ input: [ F(6, 7), 3.5 ], output: F(6, 7), error: '[RanMath][Frac.pow] Param "nf" must be a Frac or int.' },
			{ input: [ F(8), "8" ], output: F(8), error: '[RanMath][Frac.pow] Param "nf" must be a Frac or int.' },
		]
	},
	".equal": {
		testName: "($input.0.n/$input.0.d) == ($input.1) = $output",
		testFunc: input => input[0].equal(input[1]),
		tests: [ // 測資
			{ input: [ F(8, 6), F(20, 15) ], output: true },
			{ input: [ F(7, 4), F(7, 5) ], output: false },
			{ input: [ F(7, -3), F(-14, 6) ], output: true },
			{ input: [ F(6, 3), 2 ], output: true },
			{ input: [ F(7, 10), 7 ], output: false },
			{ input: [ F(-3, 5), -3 ], output: false },
			{ input: [ F(6, 7), 3.5 ], output: false, error: '[RanMath][Frac.equal] Param "nf" must be a Frac or int.' },
			{ input: [ F(8), "8" ], output: false, error: '[RanMath][Frac.equal] Param "nf" must be a Frac or int.' },
		]
	},
	".lt": {
		testName: "($input.0.n/$input.0.d) < ($input.1) = $output",
		testFunc: input => input[0].lt(input[1]),
		tests: [ // 測資
			{ input: [ F(8, 6), F(20, 15) ], output: false },
			{ input: [ F(7, 4), F(7, 5) ], output: false },
			{ input: [ F(-16, 7), F(-3, 5) ], output: true },
			{ input: [ F(6, 3), 2 ], output: false },
			{ input: [ F(7, 10), 7 ], output: true },
			{ input: [ F(-1, 555), 0 ], output: true },
			{ input: [ F(6, 7), 3.5 ], output: false, error: '[RanMath][Frac.lt] Param "nf" must be a Frac or int.' },
			{ input: [ F(8), "8" ], output: false, error: '[RanMath][Frac.lt] Param "nf" must be a Frac or int.' },
		]
	}
};

for (const [key, testInfo] of Object.entries(testData)) describe(key, () => {
	test.each(testInfo.tests)(testInfo.testName + " ; error: $error", ({ input, output, error }) => {
		expect(testInfo.testFunc(input)).toStrictEqual(output);
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	});
});
// ---------- test area ----------
