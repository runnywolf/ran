import { test, expect, describe } from "vitest";

// ---------- test area ----------
import { SolveRecur } from "@/components/answer-generator/Recur";

const testData = {
	"MultiTerm.push": {
		testName: (input, output) => `MultiTerm.push`,
		testFunc: input => true,
		tests: [ // 測資
			{
				input: {
					recurCoef: [],
					nonHomogFunc: [],
					initConst: [],
					n: 10, // 用遞迴式和一般式分別計算 a_n 的值, 驗證演算法的正確性
					error: 0 // 如果一般式存在無理數項, 導致 a_n 是浮點數, 若小於這個誤差比例, 會算通過
				},
				output: true
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
