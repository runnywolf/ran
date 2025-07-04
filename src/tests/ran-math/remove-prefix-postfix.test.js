import { test, expect, describe } from "vitest";

// ---------- test area ----------
import { removePrefix, removeSuffix } from "ran-math";

const testData = {
	".removePrefix": {
		testName: (input, output) => `removePrefix("${input[0]}", "${input[1]}") = "${output}"`,
		testFunc: input => removePrefix(...input),
		tests: [ // 測資
			{ input: ["abcde", "abc"], output: "de" },
			{ input: ["abcde", "abce"], output: "abcde" },
			{ input: ["abcde", "abcde"], output: "" },
			{ input: [" abcde", "abc"], output: " abcde" },
			{ input: ["aaaaa", "aa"], output: "aaa" },
			{ input: ["", ""], output: "" },
			{ input: ["", "aaa"], output: "" },
			{ input: ["a", ""], output: "a" },
			{ input: [123, "12"], error: '[RanMath][removePrefix] Param "str" must be a string.' },
			{ input: ["123", 12], error: '[RanMath][removePrefix] Param "prefix" must be a string.' },
		]
	},
	".removeSuffix": {
		testName: (input, output) => `removeSuffix("${input[0]}", "${input[1]}") = "${output}"`,
		testFunc: input => removeSuffix(...input),
		tests: [ // 測資
			{ input: ["abcde", "cde"], output: "ab" },
			{ input: ["abcde", "bde"], output: "abcde" },
			{ input: ["abcde", "abcde"], output: "" },
			{ input: ["abcde ", "cde"], output: "abcde " },
			{ input: ["aaaaa", "aa"], output: "aaa" },
			{ input: ["", ""], output: "" },
			{ input: ["", "aaa"], output: "" },
			{ input: ["a", ""], output: "a" },
			{ input: [123, "12"], error: '[RanMath][removeSuffix] Param "str" must be a string.' },
			{ input: ["123", 12], error: '[RanMath][removeSuffix] Param "suffix" must be a string.' },
		]
	}
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
