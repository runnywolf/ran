import { beforeEach, afterEach, vi, test, expect } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { sum } from "ran-math";

const testArr = [ // 測資
	{ text: "sum()", input: [], output: 0 },
	{ text: "sum(2, -4, 7.2)", input: [ 2, -4, 7.2 ], output: 5.2 },
	{ text: "sum([2, -4, 7.2])", input: [ [2, -4, 7.2] ], output: 5.2 },
	{ text: "sum([2, [-4, 7.2]])", input: [ [2, [-4, 7.2]] ], output: 5.2 },
	{ text: "sum([2, 3.2], [-4, 7.2])", input: [ [2, 3.2], [-4, 7.2] ], output: 8.4 },
	{
		text: 'sum(1, 2, {})',
		input: [ 1, 2, {} ],
		output: 3,
		error: '[RanMath][sum] Array element ([object Object]) is not in set.'
	},
	{
		text: 'sum([2, ["-4", 7.2]])',
		input: [ [2, ["-4", 7.2]] ],
		output: 9.2,
		error: '[RanMath][sum] Array element (-4) is not in set.'
	},
	{
		text: 'sum([2, ["-4", 7.2]])',
		input: [ [], 2, [, [{}, 7.2]] ],
		output: 9.2,
		error: '[RanMath][sum] Array element ([object Object]) is not in set.'
	},
];

test.each(testArr)(
	"$text = $output",
	({ input, output, error }) => {
		expect(sum(...input)).toBe(output);
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
