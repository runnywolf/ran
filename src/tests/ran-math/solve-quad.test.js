import { test, expect, describe } from "vitest";

// ---------- test area ----------
import { isInt, F, Frac, EF, SolveQuad, SCL } from "ran-math";

const toStr = (value) => {
	if (value instanceof EF) return `${Hop.toStr(value.nf_a)} + ${Hop.toStr(value.nf_b)} √ ${value.s}`;
	if (value instanceof Frac) return `${value.n}/${value.d}`;
	if (typeof value === "string") return `"${value}"`;
	if (isInt(value)) return `${value}`;
	if (typeof value === "number") return value.toFixed(4);
	return value;
};

const testData = {
	"SolveQuad": {
		testName: (input, output) => `new SolveQuad(${input.map(v => toStr(v)).join(", ")})`,
		testFunc: input => {
			const quad = new SolveQuad(...input);
			return [quad.rootType, ...quad.roots];
		},
		tests: [ // 測資
			{ input: [1, -1, -6], output: [SolveQuad.TYPE_2_FRAC, new EF(3), new EF(-2)] }, // TYPE_2_FRAC * 5
			{ input: [5, F(-22, 3), F(8, 3)], output: [SolveQuad.TYPE_2_FRAC, new EF(F(4, 5)), new EF(F(2, 3))] },
			{ input: [1, F(41319, 20987), F(-12006, 20987)], output: [SolveQuad.TYPE_2_FRAC, new EF(F(174, 677)), new EF(F(-69, 31))] },
			{ input: [1, -1, 0], output: [SolveQuad.TYPE_2_FRAC, new EF(1), new EF(0)] },
			{ input: [-123, 0, 0], output: [SolveQuad.TYPE_2_FRAC, new EF(0), new EF(0)] },
			
			{ input: [4, 16, 5], output: [SolveQuad.TYPE_REAL_SQRT, new EF(-2, F(1, 2), 11), new EF(-2, F(-1, 2), 11)] },
			{
				input: [F(77, 32), F(-56, 13), F(34, 71)],
				output: [SolveQuad.TYPE_REAL_SQRT, new EF(F(128, 143), F(8, 71071), 47527613), new EF(F(128, 143), F(-8, 71071), 47527613)]
			},
			{
				input: [4, 2, 5],
				output: [SolveQuad.TYPE_COMPLEX_SQRT, new EF(F(-1, 4), F(1, 4), -19), new EF(F(-1, 4), F(-1, 4), -19)]
			},
			{
				input: [4, 16, 5.2],
				output: [SolveQuad.TYPE_2_REAL, new EF(-0.35683232748450155), new EF(-3.6431676725154984)]
			},
			{
				input: [4, 2, 5.2],
				output: [SolveQuad.TYPE_2_COMPLEX, new EF(-0.25, 1.1124297730643495, -1), new EF(-0.25, -1.1124297730643495, -1)]
			},
			
			{ input: ["1", 2, 3], error: '[RanMath][SolveQuad.constructor] Param "nf_a" must be a number or Frac.' }, // error * 4
			{ input: [1, "2", 3], error: '[RanMath][SolveQuad.constructor] Param "nf_b" must be a number or Frac.' },
			{ input: [1, 2, "3"], error: '[RanMath][SolveQuad.constructor] Param "nf_c" must be a number or Frac.' },
			{ input: [0, 2, 3], error: '[RanMath][SolveQuad.constructor] 0x^2 + bx + c is not a quadratic equation.' },
		],
	},
	".toStr": {
		testName: (input, output) => `new SolveQuad(${input.map(v => toStr(v)).join(", ")}).toStr() = ${toStr(output)}`,
		testFunc: input => new SolveQuad(...input).toStr(),
		tests: [ // 測資
			{ input: [1, -1, -6], output: "3 , -2" }, // TYPE_2_FRAC * 5
			{ input: [5, F(-22, 3), F(8, 3)], output: "4/5 , 2/3" },
			{ input: [1, F(41319, 20987), F(-12006, 20987)], output: "174/677 , -69/31" },
			{ input: [1, -1, 0], output: "1 , 0" },
			{ input: [-123, 0, 0], output: "0 , 0" },
			
			{ input: [1, 0, -2], output: "1 √ 2 , -1 √ 2" },
			{ input: [1, 0, 2], output: "1 √ 2 i , -1 √ 2 i" },
			{ input: [1, 0, 9], output: "3 i , -3 i" },
			{ input: [4, 16, 5], output: "-2 + 1/2 √ 11 , -2 + -1/2 √ 11" },
			{ input: [F(77, 32), F(-56, 13), F(34, 71)], output: "128/143 + 8/71071 √ 47527613 , 128/143 + -8/71071 √ 47527613" },
			{ input: [4, 2, 5], output: "-1/4 + 1/4 √ 19 i , -1/4 + -1/4 √ 19 i" },
			{ input: [4, 16, 5.2], output: "-0.3568 , -3.6432" },
			{ input: [4, 2, 5.2], output: "-0.2500 + 1.1124 i , -0.2500 + -1.1124 i" },
		],
	},
	".toLatex": {
		testName: (input, output) => `new SolveQuad(${input.map(v => toStr(v)).join(", ")}).toLatex() = ${toStr(output)}`,
		testFunc: input => new SolveQuad(...input).toLatex(),
		tests: [ // 測資
			{ input: [1, -1, -6], output: `3${SCL}-2` }, // TYPE_2_FRAC * 5
			{ input: [5, F(-22, 3), F(8, 3)], output: `\\frac{4}{5}${SCL}\\frac{2}{3}` },
			{ input: [1, F(41319, 20987), F(-12006, 20987)], output: `\\frac{174}{677}${SCL}\\frac{-69}{31}` },
			{ input: [1, -1, 0], output: `1${SCL}0` },
			{ input: [-123, 0, 0], output: `0${SCL}0` },
		],
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
