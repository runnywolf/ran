import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { F, SolveCubic } from "@lib/ran-math-v3";

const unsafeScale = Number.MAX_SAFE_INTEGER + 1;

const testDatas: Record<string, TestData> = {
	"constructor": {
		testName: (a: any, b: any, c: any, d: any) => `new SolveCubic(${str(a)}, ${str(b)}, ${str(c)}, ${str(d)}).toStr()`,
		testFunc: (a: any, b: any, c: any, d: any) => new SolveCubic(a, b, c, d).toStr(),
		tests: [ // 測根的形式、排序、降級與錯誤
			{ input: [ 1, -6, 11, -6 ], output: "1 √1 , 2 √1 , 3 √1" },
			{ input: [ 1, 6, 11, 6 ], output: "-3 √1 , -2 √1 , -1 √1" },
			{ input: [ 1, 0, -1, 0 ], output: "-1 √1 , 0 , 1 √1" },
			{ input: [ 2, -3, -8, 12 ], output: "-2 √1 , 3/2 √1 , 2 √1" },
			{ input: [ 1, -3, 3, -1 ], output: "1 √1 , 1 √1 , 1 √1" },
			{ input: [ 1, 1, -8, -12 ], output: "-2 √1 , -2 √1 , 3 √1" },
			{ input: [ 24, -10, -13, 6 ], output: "-3/4 √1 , 1/2 √1 , 2/3 √1" },
			{ input: [ 1, 0, 0, 1 ], output: "-1 √1 , 1/2 √1 + -1/2 √-3 , 1/2 √1 + 1/2 √-3" },
			{ input: [ 1, 0, 0, 0 ], output: "0 , 0 , 0" },
			{ input: [ 1, 0, -3, 2 ], output: "-2 √1 , 1 √1 , 1 √1" },
			{ input: [ 1, 0, -3, -2 ], output: "-1 √1 , -1 √1 , 2 √1" },
			{ input: [ -1, 6, -11, 6 ], output: "1 √1 , 2 √1 , 3 √1" },
			{ input: [ 1, -2, 1, 0 ], output: "0 , 1 √1 , 1 √1" },
			{ input: [ 1n, -6n, 11n, -6n ], output: "1 √1 , 2 √1 , 3 √1" },
			{ input: [ F(1, 2), F(-3, 2), F(11, 8), F(-3, 8) ], output: "1/2 √1 , 1 √1 , 3/2 √1" },
			{ input: [ F(1, 3), F(-2), F(11, 3), F(-2) ], output: "1 √1 , 2 √1 , 3 √1" },
			{ input: [ 1, 0, 0, -2 ], output: "1.2599 + 0 i , -0.63 + -1.0911 i , -0.63 + 1.0911 i" },
			{ input: [ 1, 0, 1, 1 ], output: "-0.6823 + 0 i , 0.3412 + -1.1615 i , 0.3412 + 1.1615 i" },
			{ input: [ 3, 17, -18, 71 ], output: "-7.0054 + 0 i , 0.6694 + -1.7118 i , 0.6694 + 1.7118 i" },
			{ input: [ 1.5, -9, 16.5, -9 ], output: "1 + 0 i , 2 + 0 i , 3 + 0 i" },
			{ input: [ 0.5, 0, -2, 0 ], output: "-2 + 0 i , 0 , 2 + 0 i" },
			{ input: [ unsafeScale, -6*unsafeScale, 11*unsafeScale, -6*unsafeScale ], output: "0 + 0 i , 0 + 0 i , 1 + 0 i" },
			{ input: [ 0, 1, -1, 1 ], error: SolveCubic.NonCubicEquationError },
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
