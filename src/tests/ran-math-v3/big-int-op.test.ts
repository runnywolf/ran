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
			{ input: [ 1048576n ], output: new Map<bigint, number>([[2n, 20]]) },
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
	"BigIntOp.getSquareFactor": {
		testName: (x: bigint) => `getSquareFactor(${str(x)})`,
		testFunc: (x: bigint) => BigIntOp.getSquareFactor(x),
		tests: [
			{ input: [ 0n ], output: [ 1n, 0n ] },      // 0 的最大平方因數定義為 1
			{ input: [ 1n ], output: [ 1n, 1n ] },      // 1 = 1^2
			{ input: [ 4n ], output: [ 2n, 1n ] },      // 4 = 2^2
			{ input: [ 18n ], output: [ 3n, 2n ] },     // 18 = 9*2, 9 = 3^2
			{ input: [ -72n ], output: [ 6n, -2n ] },    // |-72| = 36*2, 36 = 6^2
			{ input: [ 97n ], output: [ 1n, 97n ] },     // 97 為質數，無平方因數
			{ input: [ 225n ], output: [ 15n, 1n ] },   // 225 = 15^2
			{ input: [ 1024n ], output: [ 32n, 1n ] },  // 1024 = 32^2
			{ input: [ -50n ], output: [ 5n, -2n ] },    // |-50| = 25*2, 25 = 5^2
			{ input: [ 123456n ], output: [ 8n, 1929n ] }, // 123456 = 64*1929, 36 = 6^2
		]
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
