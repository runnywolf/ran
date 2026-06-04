import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { BigIntOp } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"BigIntOp.abs": {
		testName: (x: bigint) => `BigIntOp.abs(${str(x)})`,
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
		testName: (x: bigint, y: bigint) => `BigIntOp.gcd(${str(x)}, ${str(y)})`,
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
	"BigIntOp.lcm": {
		testName: (x: bigint, y: bigint) => `BigIntOp.lcm(${str(x)}, ${str(y)})`,
		testFunc: (x: bigint, y: bigint) => BigIntOp.lcm(x, y),
		tests: [ // 測資
			{ input: [ 0n, 0n ], output: 0n },
			{ input: [ 0n, 45n ], output: 0n },
			{ input: [ 1n, 1n ], output: 1n },
			{ input: [ 1n, -1n ], output: 1n },
			{ input: [ -60n, 36n ], output: 180n },
			{ input: [ 36n, -60n ], output: 180n },
			{ input: [ -81n, -27n ], output: 81n },
			{ input: [ 123456n, 789012n ], output: 8117355456n },
			{ input: [ 2829389910723n, 1782309478212n ], output: 560316495048778599296364n },
			{
				input: [ 766807745399305214797211508569n, 949041956498605429076062676137n ],
				output: 727732722952041127005814555561585817495718940207973047317953n
			},
		],
	},
	"BigIntOp.factorize": {
		testName: (x: bigint) => `BigIntOp.factorize(${str(x)})`,
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
	"BigIntOp.getFactors": {
		testName: (x: bigint) => `BigIntOp.getFactors(${str(x)})`,
		testFunc: (x: bigint) => BigIntOp.getFactors(x),
		tests: [ // 測資
			{ input: [ 0n ], output: [] },
			{ input: [ 1n ], output: [1n] },
			{ input: [ 2n ], output: [1n, 2n] },
			{ input: [ 7n ], output: [1n, 7n] },
			{ input: [ 927497n ], output: [1n, 927497n] },
			{ input: [ 4n ], output: [1n, 2n, 4n] },
			{ input: [ 6n ], output: [1n, 2n, 3n, 6n] },
			{ input: [ -12n ], output: [1n, 2n, 3n, 4n, 6n, 12n] },
			{ input: [ 24n ], output: [1n, 2n, 3n, 4n, 6n, 8n, 12n, 24n] },
			{ input: [ 36n ], output: [1n, 2n, 3n, 4n, 6n, 9n, 12n, 18n, 36n] },
			{
				input: [ 908424n ],
				output: [
					1n, 2n, 3n, 4n, 6n, 8n, 9n, 11n, 12n, 18n, 22n, 24n, 31n, 33n, 36n, 37n, 44n, 62n,
					66n, 72n, 74n, 88n, 93n, 99n, 111n, 124n, 132n, 148n, 186n, 198n, 222n, 248n, 264n,
					279n, 296n, 333n, 341n, 372n, 396n, 407n, 444n, 558n, 666n, 682n, 744n, 792n, 814n,
					888n, 1023n, 1116n, 1147n, 1221n, 1332n, 1364n, 1628n, 2046n, 2232n, 2294n, 2442n,
					2664n, 2728n, 3069n, 3256n, 3441n, 3663n, 4092n, 4588n, 4884n, 6138n, 6882n, 7326n,
					8184n, 9176n, 9768n, 10323n, 12276n, 12617n, 13764n, 14652n, 20646n, 24552n, 25234n,
					27528n, 29304n, 37851n, 41292n, 50468n, 75702n, 82584n, 100936n, 113553n, 151404n,
					227106n, 302808n, 454212n, 908424n
				]
			},
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
