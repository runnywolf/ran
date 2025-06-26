import { test, expect, describe } from "vitest";

// ---------- test area ----------
import { MultiTerm } from "ran-math";

const testData = {
	"MultiTerm.push": {
		testName: (input, output) => `MultiTerm.push`,
		testFunc: input => input(),
		tests: [ // 測資
			{ input: () => new MultiTerm().push("").toLatex(), output: "0" },
			{ input: () => new MultiTerm().push("a").push("0").toLatex(), output: "a" },
			{ input: () => new MultiTerm().push("-1").push("b").toLatex(), output: "-1+b" },
			{ input: () => new MultiTerm().push("0").push("0").toLatex(), output: "0" },
			{
				input: () => new MultiTerm().push(0),
				error: '[RanMath][MultiTerm.push] Param "s_latex" must be a string'
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
