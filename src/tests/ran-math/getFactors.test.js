import { expect, test } from "vitest";
import { getFactors } from "RanMath";

const testArr = [
	{ text: "Factors of 0", input: 0, output: [] },
	{ text: "Factors of 1", input: 1, output: [1] },
	{ text: "Factors of 6", input: 6, output: [1, 2, 3, 6] },
	{ text: "Factors of 24", input: 24, output: [1, 2, 3, 4, 6, 8, 12, 24] },
	{ text: "Factors of 2 (prime)", input: 2, output: [1, 2] },
	{ text: "Factors of 7 (prime)", input: 7, output: [1, 7] },
	{ text: "Factors of 927497 (big prime)", input: 927497, output: [1, 927497] },
	{ text: "Factors of 4 (square)", input: 4, output: [1, 2, 4] },
	{ text: "Factors of 36 (square)", input: 36, output: [1, 2, 3, 4, 6, 9, 12, 18, 36] },
	{ text: "Factors of -12", input: -12, output: [1, 2, 3, 4, 6, 12] },
	{
		text: "Factors of 908424",
		input: 908424,
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
];

for (const t of testArr) {
	test(t.text, () => expect(getFactors(t.input)).toStrictEqual(t.output));
}
