import { test, expect, describe } from "vitest";

// ---------- test area ----------
import { isInt, F, Frac, EF, SolveCubic } from "ran-math";

const toStr = (value) => {
	if (value instanceof EF) return `${Hop.toStr(value.nf_a)} + ${Hop.toStr(value.nf_b)} √ ${value.s}`;
	if (value instanceof Frac) return `${value.n}/${value.d}`;
	if (typeof value === "string") return `"${value}"`;
	if (isInt(value)) return `${value}`;
	if (typeof value === "number") return value.toFixed(4);
	return value;
};
const ef = (nf_a, nf_b, nf_s) => new EF(nf_a, nf_b, nf_s);

const testData = {
	"SolveCubic": {
		testName: (input, output) => `new SolveCubic(${input.map(v => toStr(v)).join(", ")})`,
		testFunc: input => {
			const cubic = new SolveCubic(...input);
			return [cubic.rootType, ...cubic.roots];
		},
		tests: [ // 測資
			{
				input: [1, 0, 0, 0],
				output: [SolveCubic.TYPE_3_FRAC, ef(0), ef(0), ef(0)]
			},
			{
				input: [1, F(-7, 3), 0, 0],
				output: [SolveCubic.TYPE_3_FRAC, ef(0), ef(0), ef(F(7, 3))]
			},
			{
				input: [1, 2, 1, 0],
				output: [SolveCubic.TYPE_3_FRAC, ef(-1), ef(-1), ef(0)]
			},
			{
				input: [1, 9, 27, 27],
				output: [SolveCubic.TYPE_3_FRAC, ef(-3), ef(-3), ef(-3)]
			},
			{
				input: [5, F(-173, 24), F(-1, 3), F(7, 8)],
				output: [SolveCubic.TYPE_3_FRAC, ef(F(-1, 3)), ef(F(3, 8)), ef(F(7, 5))]
			},
			{
				input: [1, -1, -9, 0],
				output: [SolveCubic.TYPE_1_FRAC_REAL_SQRT, ef(0), ef(F(1, 2), F(1, 2), 37), ef(F(1, 2), F(-1, 2), 37)]
			},
			{
				input: [1, 4, -6, -5],
				output: [SolveCubic.TYPE_1_FRAC_REAL_SQRT, ef(-5), ef(F(1, 2), F(1, 2), 5), ef(F(1, 2), F(-1, 2), 5)]
			},
			{
				input: [1, -5, 8, -6],
				output: [SolveCubic.TYPE_1_FRAC_COMPLEX_SQRT, ef(3), ef(1, 1, -1), ef(1, -1, -1)]
			},
			{
				input: [1, 0, 0, 1],
				output: [SolveCubic.TYPE_1_FRAC_COMPLEX_SQRT, ef(-1), ef(F(1, 2), F(1, 2), -3), ef(F(1, 2), F(-1, 2), -3)]
			},
			{
				input: [1, -2, -9, -4], // 受限於 FP64 精度, 實際為: -0.5202305181354282 , -1.7856670111980018
				output: [SolveCubic.TYPE_3_REAL, ef(-1.7856670111980018), ef(-0.5202305181354285), ef(4.3058975293334302)]
			},
			{
				input: [1, 3.14, 0, F(0)],
				output: [ SolveCubic.TYPE_3_REAL, ef(-3.14), ef(0), ef(0)]
			},
			{
				input: [1, 7, -9, 4],
				output: [
					SolveCubic.TYPE_1_REAL_2_COMPLEX,
					ef(-8.162621435563782), // 受限於 FP64 精度, 實際為: -8.162621435563784
					ef(0.581310717781891, 0.39002115426059464, -1), // 0.581310717781892 ± 0.3900211542606119 i
					ef(0.581310717781891, -0.39002115426059464, -1)
				]
			},
			{
				input: [3.14, 2.718, 1, 1.618],
				output: [
					SolveCubic.TYPE_1_REAL_2_COMPLEX,
					ef(-1.0374108475081037),
					ef(0.08590287598335122, 0.6995178226692661, -1), // 受限於 FP64 精度, 實際為: 0.581310717781892 ± 0.699517822669266 i
					ef(0.08590287598335122, -0.6995178226692661, -1)
				]
			},
			{
				input: [F(-1, 3), F(-7, 3), 3, F(-4, 3)],
				output: [
					SolveCubic.TYPE_1_REAL_2_COMPLEX,
					ef(-8.162621435563782), // 受限於 FP64 精度, 實際為: -8.162621435563784
					ef(0.5813107177818906, -0.39002115426058614, -1), // 0.581310717781892 ± 0.3900211542606119 i
					ef(0.5813107177818906, 0.39002115426058614, -1)
				]
			},
			{ input: ["1", 2, 3, 4], error: '[RanMath][SolveCubic.constructor] Param "nf_a" must be a number or Frac.' },
			{ input: [1, "2", 3, 4], error: '[RanMath][SolveCubic.constructor] Param "nf_b" must be a number or Frac.' },
			{ input: [1, 2, "3", 4], error: '[RanMath][SolveCubic.constructor] Param "nf_c" must be a number or Frac.' },
			{ input: [1, 2, 3, "4"], error: '[RanMath][SolveCubic.constructor] Param "nf_d" must be a number or Frac.' },
			{ input: [0, 2, 3, 4], error: '[RanMath][SolveCubic.constructor] 0x^3 + bx^2 + cx + d is not a cubic equation.' },
		],
	},
	".toStr": {
		testName: (input, output) => `new SolveCubic(${input.map(v => toStr(v)).join(", ")}).toStr()`,
		testFunc: input => new SolveCubic(...input).toStr(),
		tests: [ // 測資
			{
				input: [5, F(-173, 24), F(-1, 3), F(7, 8)],
				output: "-1/3 , 3/8 , 7/5"
			},
		]
	}
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
