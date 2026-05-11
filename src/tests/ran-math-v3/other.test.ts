import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { RanMathError, __test__ } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"Prime.isPrime": {
		testName: (n: bigint) => `Prime.isPrime(${str(n)})`,
		testFunc: (n: bigint) => __test__.Prime.isPrime(n),
		tests: [ // 測資
			{ input: [ -5n ], output: false },
			{ input: [ 0n ], output: false },
			{ input: [ 1n ], output: false },
			{ input: [ 2n ], output: true },
			{ input: [ 14303n ], output: true },
		],
	},
	"Prime.getNth": {
		testName: (n: number) => `Prime.getNth(${str(n)})`,
		testFunc: (n: number) => __test__.Prime.getNth(n),
		tests: [ // 測資
			{ input: [ -1 ], error: RanMathError },
			{ input: [ 0 ], output: 2n },
			{ input: [ 1 ], output: 3n },
			{ input: [ 1677 ], output: 14303n },
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
