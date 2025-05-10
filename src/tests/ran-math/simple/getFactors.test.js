import { beforeEach, afterEach, vi, test, expect } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { getFactors } from "RanMath";

const testArr = [ // 測資
	{ n: 0, output: [] },
	{ n: 1, output: [1] },
	{ n: 6, output: [1, 2, 3, 6] },
	{ n: 24, output: [1, 2, 3, 4, 6, 8, 12, 24] },
	{ n: 2, output: [1, 2] },
	{ n: 7, output: [1, 7] },
	{ n: 927497, output: [1, 927497] },
	{ n: 4, output: [1, 2, 4] },
	{ n: 36, output: [1, 2, 3, 4, 6, 9, 12, 18, 36] },
	{ n: -12, output: [1, 2, 3, 4, 6, 12] },
	{
		n: 908424,
		output: [
			1, 2, 3, 4, 6, 8, 9, 11, 12, 18, 22, 24, 31, 33, 36, 37, 44, 62, 66, 72, 74, 88,
			93, 99, 111, 124, 132, 148, 186, 198, 222, 248, 264, 279, 296, 333, 341, 372, 396,
			407, 444, 558, 666, 682, 744, 792, 814, 888, 1023, 1116, 1147, 1221, 1332, 1364,
			1628, 2046, 2232, 2294, 2442, 2664, 2728, 3069, 3256, 3441, 3663, 4092, 4588, 4884,
			6138, 6882, 7326, 8184, 9176, 9768, 10323, 12276, 12617, 13764, 14652, 20646, 24552,
			25234, 27528, 29304, 37851, 41292, 50468, 75702, 82584, 100936, 113553, 151404,
			227106, 302808, 454212, 908424
		]
	},
	{ n: NaN, output: NaN, error: '[RanMath][getFactors] Param "n" must be a integer.' },
	{ n: {}, output: NaN, error: '[RanMath][getFactors] Param "n" must be a integer.' },
];

test.each(testArr)(
	'Factors of $n is $output',
	({ n, output, error }) => {
		expect(getFactors(n)).toStrictEqual(output)
		
		if (error) expect(spy).toHaveBeenCalledWith(error);
		else expect(spy).not.toHaveBeenCalled();
	}
);
// ---------- test area ----------
