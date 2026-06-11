import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { LatexSum } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	".add": {
		testName: (...terms: string[]) => `new LatexSum()${terms.map(term => `.add(${str(term)})`).join("")}.toLatex()`,
		testFunc: (...terms: string[]) => {
			const ls = new LatexSum();
			for (const term of terms) ls.add(term);
			return ls.toLatex();
		},
		tests: [
			{ input: [ "" ], output: "0" },
			{ input: [ "0" ], output: "0" },
			{ input: [ "+0" ], output: "0" },
			{ input: [ "-0" ], output: "0" },
			{ input: [ "{0}" ], output: "{0}" },
			{ input: [ "x" ], output: "x" },
			{ input: [ "+x" ], output: "x" },
			{ input: [ "-x" ], output: "-x" },
			{ input: [ "x", "y", "z" ], output: "x+y+z" },
			{ input: [ "x", "-y", "+z" ], output: "x-y+z" },
			{ input: [ "0", "x", "", "-y", "+0", "z" ], output: "x-y+z" },
			{ input: [ "\\frac{1}{2}", "-\\sqrt{2}", "3i" ], output: "\\frac{1}{2}-\\sqrt{2}+3i" },
		],
	},
};
// ---------- 以下不要修改 ----------

for (const [groupName, testData] of Object.entries(testDatas)) describe(groupName, () => { // 對每個 func 做測試
	for (const t of testData.tests) test( // 測一組測資
		testData.testName(...t.input) + " = " + ("output" in t ? str(t.output) : `[Error]${t.error.name}`), // 輸出 output, 報錯就輸出 error name
		() => {
			if ("output" in t) expect(testData.testFunc(...t.input)).toStrictEqual(t.output); // 檢查 output
			if ("error" in t) expect(() => testData.testFunc(...t.input)).toThrow(t.error); // 報錯就檢查 error instance
		}
	);
});
