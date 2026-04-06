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
			{ input: [ -878788787n ], output: 878788787n },
			{ input: [ -999999999999999999999999n ], output: 999999999999999999999999n },
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
			{ input: [ 36n, -60n ], output: 12n },
			{ input: [ -81n, -27n ], output: 27n },
			{ input: [ 123456n, 789012n ], output: 12n },
			{ input: [ 2829389910723n, 1782309478212n ], output: 9n },
			{ input: [ 766807745399305214797211508569n, 949041956498605429076062676137n ], output: 1n },
		],
	},
	"BigIntOp.factorize": {
		testName: (x: bigint) => `factorize(${str(x)})`,
		testFunc: (x: bigint) => BigIntOp.factorize(x),
		tests: [ // 測資
			{ input: [ -12n ], error: BigIntOp.FactorizeNonPositiveError },
			{ input: [ 0n ], error: BigIntOp.FactorizeNonPositiveError },
			{ input: [ 1n ], output: new Map<bigint, number>([]) },
			{ input: [ 2n ], output: new Map<bigint, number>([[2n, 1]]) },
			{ input: [ 2187n ], output: new Map<bigint, number>([[3n, 7]]) },
			{ input: [ 99991n ], output: new Map<bigint, number>([[99991n, 1]]) },
			{ input: [ 1048576n ], output: new Map<bigint, number>([[2n, 20]]) },
			{ input: [ 18662400n ], output: new Map<bigint, number>([[2n, 10], [3n, 6], [5n, 2]]) },
			{
				input: [ 7019274790928n ],
				output: new Map<bigint, number>([[2n, 4], [19n, 1], [79n, 1], [12109n, 1], [24137n, 1]])
			},
			{
				input: [ 104111095141n ],
				output: new Map<bigint, number>([[401321n, 1], [259421n, 1]])
			},
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
