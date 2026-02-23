import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { BigIntOp } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"BigIntOp.abs": {
		testName: (x: bigint) => `abs(${str(x)})`,
		testFunc: (x: bigint) => BigIntOp.abs(x),
		tests: [ // 測資
			{ input: [ 2n ], output: 2n },
			{ input: [ -16n ], output: 16n },
			{ input: [ 0n ], output: 0n },
		],
	},
	"BigIntOp.gcd": {
		testName: (x: bigint, y: bigint) => `gcd(${str(x)}, ${str(y)})`,
		testFunc: (x: bigint, y: bigint) => BigIntOp.gcd(x, y),
		tests: [ // 測資
			{ input: [ 0n, 0n ], output: 0n },
			{ input: [ 0n, 45n ], output: 45n },
			{ input: [ 1n, 1n ], output: 1n },
			{ input: [ 1n, -1n ], output: 1n },
			{ input: [ -60n, 36n ], output: 12n },
			{ input: [ -81n, -27n ], output: 27n },
			{ input: [ 123456n, 789012n ], output: 12n },
			{ input: [ 982451n, 578851n ], output: 1n },
		],
	},
};
// ---------- 以下不要修改 ----------

for (const [groupName, testData] of Object.entries(testDatas)) describe(groupName, () => { // 對每個 func 做測試
	for (const t of testData.tests) test( // 測一組測資
		testData.testName(...t.input) + " = " + ("output" in t ? str(t.output) : `(Err)${t.error.name}`), // 輸出 output, 報錯就輸出 error name
		() => {
			if ("output" in t) expect(testData.testFunc(...t.input)).toStrictEqual(t.output); // 檢查 output
			if ("error" in t) expect(() => testData.testFunc(...t.input)).toThrow(t.error); // 報錯就檢查 error instance
		}
	);
});
