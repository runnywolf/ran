import { test, expect, describe } from "vitest";

// ---------- test area ----------
import { Prime } from "ran-math";

const testData = {
	"Prime.getNth": {
		testName: (input, output) => `Prime.getNth(${input}) = ${output}`,
		testFunc: input => Prime.getNth(input),
		tests: [
			{ input: -5, output: NaN },
			{ input: 0, output: 2 },
			{ input: 4, output: 11 },
			{ input: 99, output: 541 },
			// { input: 828, output: 6361 },
			// { input: 11678, output: 124339 },
			{ input: NaN, error: '[RanMath][Prime.getNth] Param "n" must be a integer.' }, // 會報錯的測資
			{ input: [], error: '[RanMath][Prime.getNth] Param "n" must be a integer.' }, // 會報錯的測資
		]
	},
	"Prime.isPrime": {
		testName: (input, output) => `Prime.isPrime(${input}) = ${output}`,
		testFunc: input => Prime.isPrime(input),
		tests: [
			{ input: -335, output: false },
			{ input: 1, output: false },
			{ input: 2, output: true },
			{ input: 67939, output: true },
			// { input: 100000, output: false },
			{ input: NaN, error: '[RanMath][Prime.isPrime] Param "n" must be a integer.' }, // 會報錯的測資
			{ input: [], error: '[RanMath][Prime.isPrime] Param "n" must be a integer.' }, // 會報錯的測資
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
