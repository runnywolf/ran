import { expect, test, describe } from "vitest";

// ---------- test area ----------
import { getRandomInt } from "ran-math";

const testNumber = 10;
for (let i = 0; i < testNumber; i++) test(`Random number is in [-5, 5]`, () => {
	const res = getRandomInt(-5, 5);
	expect(res).toBeGreaterThanOrEqual(-5);
	expect(res).toBeLessThanOrEqual(5);
});
for (let i = 0; i < testNumber; i++) test(`Random number is in [-5, 5]`, () => {
	const res = getRandomInt(5, -5);
	expect(res).toBeGreaterThanOrEqual(-5);
	expect(res).toBeLessThanOrEqual(5);
});

const testData = {
	"getRandomInt": {
		testName: (input, output) => `getRandomInt(${input.min}, ${input.max}) = ${output}`,
		testFunc: input => getRandomInt(input.min, input.max),
		tests: [
			{ input: { min: 6, max: NaN }, error: '[RanMath][getRandomInt] Param "max" must be a integer.' },
			{ input: { min: Infinity, max: -2 }, error: '[RanMath][getRandomInt] Param "min" must be a integer.' },
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
