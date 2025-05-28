import { beforeEach, afterEach, vi, test, expect, describe } from "vitest";

let spy; // console.error 監聽
beforeEach(() => {
	spy = vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
	spy.mockRestore();
});

// ---------- test area ----------
import { F, EF, Hop, Frac, isInt } from "ran-math";

const toStr = (value) => {
	if (value instanceof EF) return `${Hop.toStr(value.nf_a)} + ${Hop.toStr(value.nf_b)} √ ${value.s}`;
	if (value instanceof Frac) return `${value.n}/${value.d}`;
	if (typeof value === "string") return `"${value}"`;
	if (isInt(value)) return `${value}`;
	if (typeof value === "number") return value.toFixed(4);
	return value;
};

const testData = {
	"EF.isEF": {
		testName: (input, output) => `EF.isEF(${toStr(input)}) = ${toStr(output)}`,
		testFunc: (input) => EF.isEF(input),
		tests: [ // 測資
			{ input: 0, output: false },
			{ input: new EF(3), output: true },
			{ input: new EF(3, -6), output: true },
			{ input: new EF(3, -6, 2), output: true },
			{ input: true, output: false },
			{ input: {}, output: false },
		],
	},
	"EF.unitI": {
		testName: (input, output) => `EF.unitI() = (${toStr(output)})`,
		testFunc: (input) => EF.unitI(),
		tests: [ // 測資
			{ output: new EF(0, 1, -1) },
		],
	},
	"constructor & .toStr": {
		testName: (input, output) => `new EF(${input.map(p => toStr(p)).join(", ")}).toStr() = ${toStr(output)}`,
		testFunc: (input) => new EF(...input).toStr(),
		tests: [ // 測資
			{ input: [], output: "0 + 0 √ 0" }, // zero param test (7)
			{ input: [ 3 ], output: "3 + 0 √ 0" },
			{ input: [ 0, F(3, 4) ], output: "0 + 0 √ 0" },
			{ input: [ F(-2, 3), 5 ], output: "-2/3 + 0 √ 0" },
			{ input: [ 0, 0, F(1, 2) ], output: "0 + 0 √ 0" },
			{ input: [ F(4, 3), 0, 4 ], output: "4/3 + 0 √ 0" },
			{ input: [ 0, F(1, 3), -360 ], output: "0 + 2 √ -10" },
			
			{ input: [ -1, 3, F(4, 9) ], output: "1 + 0 √ 0" },
			{ input: [ -1, 3, F(-4, 9) ], output: "-1 + 2 √ -1" },
			{ input: [ -1, 3, F(2, 5) ], output: "-1 + 3/5 √ 10" },
			
			{ input: [ 0.4, F(3, 2), 2 ], output: "2.5213 + 0 √ 0" }, // float + Frac test (6)
			{ input: [ 0.4, F(3, 2), -2 ], output: "0.4000 + 2.1213 √ -1" },
			{ input: [ -1, 0.4, 2 ], output: "-0.4343 + 0 √ 0" },
			{ input: [ -1, 0.4, -2 ], output: "-1 + 0.5657 √ -1" },
			{ input: [ -1, F(3, 2), 0.4 ], output: "-0.0513 + 0 √ 0" },
			{ input: [ -1, F(3, 2), -0.4 ], output: "-1 + 0.9487 √ -1" },
			
			{ // param error test (3)
				input: [ "-1", 3, F(2, 5) ],
				output: "0 + 3/5 √ 10",
				error: '[RanMath][EF.constructor] Param "nf_a" must be a Frac or int.'
			},
			{
				input: [ -1, "3", F(2, 5) ],
				output: "-1 + 0 √ 0",
				error: '[RanMath][EF.constructor] Param "nf_b" must be a Frac or int.'
			},
			{
				input: [ -1, 3, {} ],
				output: "-1 + 0 √ 0",
				error: '[RanMath][EF.constructor] Param "nf_s" must be a Frac or int.'
			},
		],
	},
	".copy": {
		testName: (input, output) => `(${toStr(input)}).copy() = (${toStr(output)})`,
		testFunc: (input) => input.copy(),
		tests: [ // 測資
			{ input: new EF(1, 2, 3), output: new EF(1, 2, 3) },
		],
	},
	".conj": {
		testName: (input, output) => `(${toStr(input)}).conj() = (${toStr(output)})`,
		testFunc: (input) => input.conj(),
		tests: [ // 測資
			{ input: new EF(1, 2, 3), output: new EF(1, -2, 3) },
			{ input: new EF(1, F(-2, 3), -7), output: new EF(1, F(2, 3), -7) },
			{ input: new EF(0, 1, -1), output: new EF(0, -1, -1) },
		],
	},
	".normSquare": {
		testName: (input, output) => `(${toStr(input)}).normSquare() = ${toStr(output)}`,
		testFunc: (input) => input.normSquare(),
		tests: [ // 測資
			{ input: new EF(F(1, 2), F(3, 4), 5), output: F(-41, 16) },
			{ input: new EF(2, F(-1, 3), -3), output: F(13, 3) },
			{ input: new EF(-1, F(1, 2), 7), output: F(-3, 4) },
			{ input: new EF(F(3, 5), F(-2, 5), 11), output: F(-7, 5) },
			{ input: new EF(F(5, 4), F(1, 7), -2), output: F(1257, 784) },
			{ input: new EF(F(-2, 3), 0, 0), output: F(4, 9) },
			{ input: new EF(0, 0, 0), output: F(0) },
			{ input: new EF(-2.4476, 1.8807, -1), output: 9.52777825 },
		],
	},
	".add": {
		testName: (input, output) => `(${toStr(input[0])}).add(${toStr(input[1])}) = (${toStr(output)})`,
		testFunc: (input) => input[0].add(input[1]),
		tests: [ // 測資
			{ input: [new EF(F(1, 2), F(3, 4), 5), new EF(-2, F(3, 4), 5)], output: new EF(F(-3, 2), F(3, 2), 5) }, // EF + EF
			{ input: [new EF(F(1, 2), 0, 0), new EF(-2, F(3, 4), 5)], output: new EF(F(-3, 2), F(3, 4), 5) }, // EF + EF
			{ input: [new EF(F(1, 2), F(3, 4), 5), new EF(-2, 1.79, 5)], output: new EF(4.1796126628494665, 0, 0) }, // EF + EF(float)
			{ input: [new EF(F(1, 2), F(3, 4), 5), F(-1, 2)], output: new EF(0, F(3, 4), 5) }, // EF + Frac
			{ input: [new EF(F(1, 2), F(3, 4), 5), 7], output: new EF(F(15, 2), F(3, 4), 5) }, // EF + int
			{ input: [new EF(F(1, 2), F(3, 4), 5), 1.79], output: new EF(3.96705098312484227, 0, 0) }, // EF + float
			{
				input: [new EF(F(1, 2), F(3, 4), 5), "2"],
				output: new EF(F(1, 2), F(3, 4), 5),
				error: '[RanMath][EF.add] Param "nfe" must be a number | Frac | EF .'
			}, // EF + string
			{
				input: [new EF(F(1, 2), F(3, 4), 5), new EF(F(1, 2), F(3, 4), 7)],
				output: new EF(F(1, 2), F(3, 4), 5),
				error: '[RanMath][EF.add] Bases of extension fields differ.'
			}, // base differ error
		],
	},
};

for (const [key, testInfo] of Object.entries(testData)) describe(key, () => {
	for (const t of testInfo.tests) test(
		testInfo.testName(t.input, t.output) + (t.error ? `\n\t> error text: ${t.error}` : ""),
		() => {
			expect(testInfo.testFunc(t.input)).toStrictEqual(t.output); // 檢查是否有錯誤
			
			if (t.error) expect(spy).toHaveBeenCalledWith(t.error); // 如果會報錯, 檢查錯誤訊息
			else expect(spy).not.toHaveBeenCalled();
		}
	);
});
// ---------- test area ----------
