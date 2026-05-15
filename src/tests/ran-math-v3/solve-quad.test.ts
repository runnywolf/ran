import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { F, SolveQuad } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"constructor": {
		testName: (a: any, b: any, c: any) => `new SolveQuad(${str(a)}, ${str(b)}, ${str(c)}).toStr()`,
		testFunc: (a: any, b: any, c: any) => new SolveQuad(a, b, c).toStr(),
		tests: [ // 測資
			{ input: [ 1, -5, 6 ], output: "2 √1 , 3 √1" },
			{ input: [ 1, 0, -2 ], output: "-1 √2 , 1 √2" },
			{ input: [ 1, 0, 1 ], output: "-1 √-1 , 1 √-1" },
			{ input: [ 2, 4, 2 ], output: "-1 √1 , -1 √1" },
			{ input: [ 1n, 0n, -4n ], output: "-2 √1 , 2 √1" },
			{ input: [ F(1, 2), F(-3, 2), F(1) ], output: "1 √1 , 2 √1" },
			{ input: [ F(2), -7n, F(3) ], output: "1/2 √1 , 3 √1" },
			{ input: [ 221, 24, -77 ], output: "-11/17 √1 , 7/13 √1" }, // (13x - 7)(17x + 11)
			{ input: [ 276, -113, -95 ], output: "-5/12 √1 , 19/23 √1" }, // (12x + 5)(23x - 19)
			{ input: [ 1517, -198, -899 ], output: "-29/41 √1 , 31/37 √1" }, // (37x - 31)(41x + 29)
			{ input: [ 1.5, -4.5, 3 ], output: "1 + 0 i , 2 + 0 i" },
			{ input: [ 1.5, 0, 1.5 ], output: "0 + -1 i , 0 + 1 i" },
			{ input: [ 0.5, 0n, F(-2) ], output: "-2 + 0 i , 2 + 0 i" },
			{ input: [ 0, 1, -1 ], error: SolveQuad.NonQuadEquationError },
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
