import { test, expect, describe } from "vitest";

// ---------- test area ----------
import { isNum, isInt, gcd, lcm, getFactors, getSquareFactor, getRandomInt, sum } from "ran-math";

const testData = {
	"isNum": {
		testName: (input, output) => `isNum(${input}) = ${output}`,
		testFunc: input => isNum(input),
		tests: [
			{ input: 123, output: true },            // 整數
			{ input: -456.78, output: true },        // 負浮點數
			{ input: 0, output: true },              // 零
			{ input: NaN, output: true },            // NaN 是 typeof "number"
			{ input: Infinity, output: true },       // Infinity 也是 number
			{ input: "123", output: false },         // 字串數字
			{ input: "hello", output: false },       // 字串
			{ input: null, output: false },          // null
			{ input: undefined, output: false },     // undefined
			{ input: true, output: false },          // 布林
			{ input: {}, output: false },            // 物件
			{ input: [], output: false },            // 陣列
			{ input: () => 1, output: false },       // 函式
			{ input: new Number(5), output: false }, // 包裝型 Number (物件)
		]
	},
	"isInt": {
		testName: (input, output) => `isInt(${input}) = ${output}`,
		testFunc: input => isInt(input),
		tests: [
			{ input: 123, output: true },            // 正整數
			{ input: 123.0, output: true },          // int
			{ input: -456, output: true },           // 負整數
			{ input: 0, output: true },              // 零
			{ input: 123.456, output: false },       // 浮點數
			{ input: -987.654, output: false },      // 負浮點數
			{ input: NaN, output: false },           // NaN
			{ input: Infinity, output: false },      // Infinity
			{ input: "123", output: false },         // 字串數字
			{ input: "hello", output: false },       // 字串
			{ input: null, output: false },          // null
			{ input: undefined, output: false },     // undefined
			{ input: true, output: false },          // 布林
			{ input: {}, output: false },            // 物件
			{ input: [], output: false },            // 陣列
			{ input: () => 1, output: false },       // 函式
			{ input: new Number(5), output: false }, // 包裝型 Number
		]
	},
	"gcd": {
		testName: (input, output) => `gcd(${input.a}, ${input.b}) = ${output}`,
		testFunc: input => gcd(input.a, input.b),
		tests: [
			{ input: { a: 0, b: 0 }, output: 0 },
			{ input: { a: 0, b: 45 }, output: 45 },
			{ input: { a: 1, b: 1 }, output: 1 },
			{ input: { a: 1, b: -1 }, output: 1 },
			{ input: { a: -60, b: 36 }, output: 12 },
			{ input: { a: -81, b: -27 }, output: 27 },
			{ input: { a: 123456, b: 789012 }, output: 12 },
			{ input: { a: 982451, b: 578851 }, output: 1 },
			{ input: { a: 1.5, b: -6 }, error: '[RanMath][gcd] Param "a" & "b" must be a integer.' },
			{ input: { a: 1, b: NaN }, error: '[RanMath][gcd] Param "a" & "b" must be a integer.' },
			{ input: { a: 166, b: [] }, error: '[RanMath][gcd] Param "a" & "b" must be a integer.' },
		]
	},
	"lcm": {
		testName: (input, output) => `lcm(${input.a}, ${input.b}) = ${output}`,
		testFunc: input => lcm(input.a, input.b),
		tests: [
			{ input: { a: 0, b: 0 }, output: 0 },
			{ input: { a: 0, b: 5 }, output: 0 },
			{ input: { a: 4, b: 6 }, output: 12 },
			{ input: { a: -4, b: 6 }, output: 12 },
			{ input: { a: 21, b: 6 }, output: 42 },
			{ input: { a: 123456, b: 789012 }, output: 8117355456 },
			{ input: { a: 1.5, b: -6 }, error: '[RanMath][lcm] Param "a" & "b" must be a integer.' },
			{ input: { a: 1, b: NaN }, error: '[RanMath][lcm] Param "a" & "b" must be a integer.' },
			{ input: { a: 166, b: [] }, error: '[RanMath][lcm] Param "a" & "b" must be a integer.' },
		]
	},
	"getFactors": {
		testName: (input, output) => `getFactors(${input}) = [${output}]`,
		testFunc: input => getFactors(input),
		tests: [
			{ input: 0, output: [] },
			{ input: 1, output: [1] },
			{ input: 6, output: [1, 2, 3, 6] },
			{ input: 24, output: [1, 2, 3, 4, 6, 8, 12, 24] },
			{ input: 2, output: [1, 2] },
			{ input: 7, output: [1, 7] },
			{ input: 927497, output: [1, 927497] },
			{ input: 4, output: [1, 2, 4] },
			{ input: 36, output: [1, 2, 3, 4, 6, 9, 12, 18, 36] },
			{ input: -12, output: [1, 2, 3, 4, 6, 12] },
			{
				input: 908424,
				output: [
					1, 2, 3, 4, 6, 8, 9, 11, 12, 18, 22, 24, 31, 33, 36, 37, 44, 62, 66, 72, 74, 88,
					93, 99, 111, 124, 132, 148, 186, 198, 222, 248, 264, 279, 296, 333, 341, 372, 396,
					407, 444, 558, 666, 682, 744, 792, 814, 888, 1023, 1116, 1147, 1221, 1332, 1364,
					1628, 2046, 2232, 2294, 2442, 2664, 2728, 3069, 3256, 3441, 3663, 4092, 4588, 4884,
					6138, 6882, 7326, 8184, 9176, 9768, 10323, 12276, 12617, 13764, 14652, 20646, 24552,
					25234, 27528, 29304, 37851, 41292, 50468, 75702, 82584, 100936, 113553, 151404,
					227106, 302808, 454212, 908424
				]
			},
			{ input: NaN, error: '[RanMath][getFactors] Param "n" must be a integer.' },
			{ input: {}, error: '[RanMath][getFactors] Param "n" must be a integer.' },
		]
	},
	"getSquareFactor": {
		testName: (input, output) => `getSquareFactor(${input}) = ${output}`,
		testFunc: input => getSquareFactor(input),
		tests: [
			{ input: 0, output: 1 },      // 0 的最大平方因數定義為 1
			{ input: 1, output: 1 },      // 1 = 1^2
			{ input: 4, output: 2 },      // 4 = 2^2
			{ input: 18, output: 3 },     // 18 = 9*2, 9 = 3^2
			{ input: -72, output: 6 },    // |-72| = 36*2, 36 = 6^2
			{ input: 97, output: 1 },     // 97 為質數，無平方因數
			{ input: 225, output: 15 },   // 225 = 15^2
			{ input: 1024, output: 32 },  // 1024 = 32^2
			{ input: -50, output: 5 },    // |-50| = 25*2, 25 = 5^2
			{ input: 123456, output: 8 }, // 123456 = 64*1929, 36 = 6^2
			{ input: NaN, error: '[RanMath][getSquareFactor] Param "n" must be a integer.' },
			{ input: {}, error: '[RanMath][getSquareFactor] Param "n" must be a integer.' },
		]
	},
	"sum": {
		testName: (input, output) => `sum(${input}) = ${output}`,
		testFunc: input => sum(...input),
		tests: [
			{ input: [], output: 0 },
			{ input: [ 2, -4, 7.2 ], output: 5.2 },
			{ input: [ [2, -4, 7.2] ], output: 5.2 },
			{ input: [ [2, [-4, 7.2]] ], output: 5.2 },
			{ input: [ [2, 3.2], [-4, 7.2] ], output: 8.4 },
			{
				input: [ 1, 2, {} ],
				error: '[RanMath][sum] Array element ([object Object]) is not in set.'
			},
			{
				input: [ [2, ["-4", 7.2]] ],
				error: '[RanMath][sum] Array element (-4) is not in set.'
			},
			{
				input: [ [], 2, [, [{}, 7.2]] ],
				error: '[RanMath][sum] Array element ([object Object]) is not in set.'
			},
		]
	},
};

for (const [key, testInfo] of Object.entries(testData)) describe(key, () => {
	for (const t of testInfo.tests) test(
		testInfo.testName(t.input, t.output) + (t.error ? `\n\t> error text: ${t.error}` : ""),
		() => {
			if (t.error) expect(() => testInfo.testFunc(t.input)).toThrowError(t.error); // 如果會報錯, 檢查錯誤訊息
			else expect(testInfo.testFunc(t.input)).toStrictEqual(t.output); // 檢查是否有錯誤
		}
	);
});
// ---------- test area ----------
