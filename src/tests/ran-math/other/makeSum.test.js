import { beforeEach, afterEach, vi, test, expect } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { makeSum, isNum, F } from "ran-math";

const testArr = [ // 測資
	{
		text: "set definition param error", // isInSet 不是 func
		input: [ [2, -4, 7.2], null, 0, (a, b) => a + b, "testFunc" ],
		output: 0,
		error: '[RanMath][testFunc] Param "isInSet" (set definition) is not a function.'
	},
	{
		text: "zero element param error", // 零元素不滿足 isInSet
		input: [ [2, -4, 7.2], isNum, F(0), (a, b) => a + b, "testFunc" ],
		output: F(0),
		error: '[RanMath][testFunc] Zero element is not in set.'
	},
	{
		text: "add operator param error", // addOp 不是 func
		input: [ [2, -4, 7.2], isNum, 0, 7, "testFunc" ],
		output: 0,
		error: '[RanMath][testFunc] Param "addOp" (add operator) is not a function'
	},
	{
		text: "add operator param error", // function 名稱不是 string. 因為 funcName 只用於報錯, 不影響計算
		input: [ [2, -4, 7.2], isNum, 0, (a, b) => a + b, null ],
		output: 5.2,
	},
	{
		text: "add operator closure error",
		input: [ [2], isNum, 0, (a, b) => F(a + b), "testFunc" ], // addOp 沒有封閉性
		output: 0,
		error: '[RanMath][testFunc] (Sum + 2) is not in set, check the addOp return value.'
	},
];

test.each(testArr)(
	"$text",
	({ input, output, error }) => {
		expect(makeSum(...input)).toStrictEqual(output);
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
