import { test, expect, describe } from "vitest";
import { TestData, str } from "../test-tool";

// ---------- 以上不要修改 ----------
import { F, Frac } from "@lib/ran-math-v3";

const testDatas: Record<string, TestData> = {
	"Frac.isFrac": {
		testName: (x: any) => `Frac.isFrac(${str(x)})`,
		testFunc: (x: any) => Frac.isFrac(x),
		tests: [ // 測資
			{ input: [ 0 ], output: false },
			{ input: [ F(3) ], output: true },
			{ input: [ F(3, -6) ], output: true },
			{ input: [ true ], output: false },
			{ input: [ {} ], output: false },
		],
	},
	"constructor": {
		testName: (n?: number|bigint, d?: number|bigint) => `new Frac(${str(n)}, ${str(d)})`,
		testFunc: (n?: number|bigint, d?: number|bigint) => new Frac(n, d),
		tests: [ // 測資
			{ input: [], output: F(0, 1) }, // 特性 new Frac() = 0/1
			{ input: [ 3 ], output: F(3, 1) }, // 特性 new Frac(3) = 3/1
			{ input: [ 6, -9 ], output: F(-2, 3) },
			{ input: [ -0.1, 7 ], error: Frac.NonIntError },
			{ input: [ -2, 1e100 ], error: Frac.UnsafeIntError },
			{ input: [ 5, 0 ], error: Frac.ZeroDenominatorError }, // 分母為 0
		]
	},
	".copy": {
		testName: (frac: Frac) => "Object (Frac) copy test",
		testFunc: (frac: any) => { // 這裡不指定型別 Frac, 因為要修改 .n 測試是否複製
			let fracCopy = frac.copy();
			fracCopy.n = 0n; // 如果成功複製, 那麼 fracCopy = 0/1, frac = -2/3, 你可以去把 Frac.copy 的回傳值改成 this 試試看
			fracCopy.d = 1n;
			return frac;
		},
		tests: [
			{ input: [ F(-2, 3) ], output: F(-2, 3) },
		]
	},
	".add": {
		testName: (a: Frac, b: number|bigint|Frac) => `${str(a)} + ${str(b)}`,
		testFunc: (a: Frac, b: number|bigint|Frac) => a.add(b),
		tests: [
			{ input: [ F(-3, 4), F(-5, 8) ], output: F(-11, 8) }, // Frac + Frac
			{ input: [ F(7, 4), F(3, 5) ], output: F(47, 20) },
			{ input: [ F(0, 3), F(-2, 3) ], output: F(-2, 3) },
			{ input: [ F(2, 7), F(-3, 5) ], output: F(-11, 35) },
			{ input: [ F(346, 7835), F(-11307, 5127) ], output: F(-28938801, 13390015) },
			{ input: [ F(-5, 3), 5n ], output: F(10, 3) }, // Frac + bigint
			{ input: [ F(-500), 500n ], output: F(0, 1) },
			{ input: [ F(3, 7), -3 ], output: F(-18, 7) }, // Frac + int number
			{ input: [ F(-5, 3), 5 ], output: F(10, 3) },
			{ input: [ F(-5, 37), 17 ], output: F(624, 37) },
			{ input: [ F(10), -10 ], output: F(0, 1) },
			{ input: [ F(6, 7), 3.5 ], error: Frac.NonIntError }, // Frac + float error
			{ input: [ F(6, 7), 1e100 ], error: Frac.UnsafeIntError }, // Frac + unsafe int number
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
