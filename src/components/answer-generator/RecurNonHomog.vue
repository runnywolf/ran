<template>
	遞迴的非齊次部分為<br>
	<vl c :exp="recurNonHomogLatex" />
	合併相同的指數項：<br>
	<vl c :exp="`F(n) = \\sum\\limits_{i} f_i(n) {b_i}^n = ${recur.mlCombinedExp()}`" />
	猜測特解的形式為：<br>
	<vl c :exp="recur.mlParticularForm()" />
	其中多項式 <vl exp="g_i(n)" /> 的次數應與 <vl exp="f_i(n)" /> 相同。<br>
	<br>
	檢查齊次解 <vl exp="a_n^{(h)}" /> 和特解 <vl exp="a_n^{(p)}" />
	之中是否存在相同的指數部分 <vl exp="{b_i}^n" />：<br>
	<div v-if="Object.keys(recur.homogRootConflictNum).length > 0">
		由於 <vl :exp="recur.mlExistHomogExp()" /> 已出現在 <vl exp="a_n^{(h)}" /> 之中，<br>
		若特解 <vl exp="a_n^{(p)}" /> 也包含同樣項次 <vl :exp="recur.mlExistParticularExp()" />
		會導致與齊次解重疊，<br>
		為了保證特解與齊次解的線性獨立性，需要將
		<div class="ts-list is-unordered">
			<div v-for="latex in recur.mlChangeExpList()" class="item">
				<vl :exp="latex[0]" /> 改為 <vl :exp="latex[1]" />
			</div>
		</div>
	</div>
	<div v-else>
		不存在相同的指數部分。
	</div>
	<div style="height: 12px;"></div>
	因此特解的形式為：<br>
	<vl c :exp="recur.mlNewParticularForm()" />
	將 <vl exp="a_n^{(p)}" /> 代入原遞迴關係： ( 將 <vl exp="a_n" /> 替換為 <vl exp="a_n^{(p)}" /> 即可，不要將形式代入 )<br>
	<vl c :exp="recur.mlParticularIntoRecur()" />
	移項後得到： ( 式 1 )<br>
	<vl c :exp="recur.mlParticularIntoRecurTrans()" />
	其中<br>
	<vl c :exp="recur.mlParticularIntoRecurWhere()" />
	接下來需要對每個指數項 <vl exp="{b_i}^n" /> 對應的多項式，分別求未知係數 <vl exp="p_j" />。<br>
	<div class="ts-box" style="margin: 12px 0;">
		<table class="ts-table">
			<tbody>
				<tr v-for="(combinedExp, s_frac_b) in recur.combinedExpFunc">
					<td style="font-size: 15px;">
						<RecurNonHomogExp
							:recurCoef="recurCoef"
							:frac_b="Frac.fromStr(s_frac_b)"
							:polyCoef="combinedExp"
							:extraNPow="recur.homogRootConflictNum[s_frac_b] ?? 0"
							:startPj="recur.varPjIndex[s_frac_b][0]"
							:_mlExpTerm="(i, e) => recur._mlExpTerm(s_frac_b, i, e)"
							@PjAnswer="(PjAnswer) => PjBuffer[s_frac_b] = PjAnswer"
						></RecurNonHomogExp>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	將 <vl exp="p_j" /> 代回 <vl exp="a_n^{(p)}" />，得到特解為<br>
	<vl c :exp="particularLatex" />
</template>

<script setup>
import { computed, ref, toRaw, watch } from "vue";
import { Frac, _SolveCubic, _mlTerm, SCL } from "@/libs/RanMath.js";
import { removePrefix } from "@/libs/StringTool.js";
import RecurNonHomogExp from "./RecurNonHomogExp.vue"; // 計算聯立方程式並顯示未知係數 p_j 的組件

const props = defineProps({
	recurCoef: { type: Array, default: [] }, // 齊次部分的係數, length 代表遞迴階數
	nonHomoFunc: { type: Object, default: {} }, // 非齊次的 c n^k b^n 項會表示為 { "k,b.n/b.d": c , ... }
	cubic: { type: Object, default: {} }, // 特徵方程式的解
	recurNonHomogLatex: { type: String, default: "?" }, // 生成 遞迴的非齊次部分 "F(n) = c n^k b^n + ..." (latex)
});

const emit = defineEmits([
	"particular" // 特解的未知係數 p_j 的計算結果
]);

class SolveNonHomog { // 計算遞迴的非齊次部分的解, 並顯示運算過程
	constructor(recurCoef, nonHomoFunc, cubic) {
		this.recurCoef = recurCoef;
		this.nonHomoFunc = nonHomoFunc;
		this.cubic = cubic;
		
		this.recurLevel = this.recurCoef.length; // 遞迴階數
		
		this._initCombineExp(); // 合併相同的指數項
		this._initNumberTheUnknownPj(); // 對特解的未知係數編號
		this._initConflictRoot(); // 檢查 a_n^{(p)} 和 a_n^{(h)} 是否有重複的 b^n
	}
	
	_initCombineExp() { // 合併相同的指數項
		let expFunc = {};
		for (const [key, frac_c] of Object.entries(this.nonHomoFunc)) { // 合併相同的指數項
			const [s_k, s_frac_b] = key.split(","); // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 { "k,b.n/b.d": c , ... }
			const k = Number(s_k); // n^k 的 k (0~3)
			
			if (!(s_frac_b in expFunc)) expFunc[s_frac_b] = []; // 新增指數項
			while (expFunc[s_frac_b].length - 1 < k) expFunc[s_frac_b].push(new Frac(0)); // 補足多項式 f_i(n) 的次數
			expFunc[s_frac_b][k] = frac_c; // 設定係數
		}
		this.combinedExpFunc = expFunc; // 同類指數項: { "b.n/b.d": [ f0, f1, f2 ], ... } 代表 (f0 + f1n + f2n^2) b^n + ...
	}
	
	_initNumberTheUnknownPj() { // 對特解的未知係數編號
		let varPjIndex = {};
		let pj = 1; // 未知係數 p_j 的 i, 是個計數器, 用於生成 p_1, p_2, ...
		for (const [s_frac_b, combinedExp] of Object.entries(this.combinedExpFunc)) {
			varPjIndex[s_frac_b] = combinedExp.map(() => pj++);
		}
		this.varPjIndex = varPjIndex; // 特解當中的 p_j 的編號 i, 結構與 combinedExpFunc 相同
		this.pjNum = pj-1; // 未知係數的數量
	}
	
	_initConflictRoot() { // 檢查 a_n^{(p)} 和 a_n^{(h)} 是否有重複的 b^n
		const cs = this.cubic;
		const type = cs.solutionType(); // 三次函數的解形式
		let rationalRoots = []; // 齊次解的有理數特徵值
		if (type === _SolveCubic.TYPE_3FRAC) rationalRoots = [ cs.frac_r1, cs.frac_r2, cs.frac_r3 ];
		else if (type === _SolveCubic.TYPE_FRAC_QUAD) rationalRoots = [ cs.frac_r1 ]; // 非齊次的 b 必為有理數, 所以只需要檢查這兩種狀態即可
		let homogRootConflictNum = {};
		for (const frac_r of rationalRoots) if (!frac_r.isZero()) { // 檢查齊次解的所有非零 b
			const key = `${frac_r.n}/${frac_r.d}`;
			if (key in this.combinedExpFunc) { // 如果齊次解的 b^n 也存在於特解, 記錄一下齊次解的 b 的重根數
				homogRootConflictNum[key] = (homogRootConflictNum[key] ?? 0) + 1;
			}
		}
		this.homogRootConflictNum = homogRootConflictNum; // 齊次解的某個特徵值 b 的重根數, 且 b^n 存在於特解內. 決定非齊次指數項需要乘 n^? 保持線性獨立
	}
	
	_mlExpTerm(s_frac_b, isUnknownCoef, extraNPow = 0) { // 生成 "(p1 + p2n + ...) b^n" (latex). extraNPow 為額外乘上去的 n^p
		const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b (Frac)
		const s_latex = this.combinedExpFunc[s_frac_b].map((frac_c, i) => { // "+ p1 + p2n + ..." (latex)
			if (isUnknownCoef) frac_c = `p_{${this.varPjIndex[s_frac_b][i]}}`; // isUnknownCoef 開啟會把係數替換成未知數 p_j
			return _mlTerm(frac_c, "n", i + extraNPow, true, true);
		}).join("");
		return _mlTerm(`(${removePrefix(s_latex, "+")})`, frac_b, "n", false);
	}
	
	mlCombinedExp() { // 合併相同的指數項: "F(n) = Σ_i f_i(n) b_i^n = (f0 + f1n + f2n^2 + ...) b^n + ..." (latex)
		return Object.keys(this.combinedExpFunc).map(
			s_frac_b => this._mlExpTerm(s_frac_b, false)
		).join(" + ");
	}
	
	mlParticularForm() { // 猜測特解的形式為: "a_n^{(p)} = Σ_i g_i(n) b_i^n = (p1 + p2n + ...) b^n + ..." (latex)
		let s_latex = Object.keys(this.combinedExpFunc).map(
			s_frac_b => this._mlExpTerm(s_frac_b, true)
		).join(" + ");
		return `a_n^{(p)} = \\sum\\limits_{i} g_i(n) {b_i}^n = ${s_latex}`;
	}
	
	mlExistHomogExp() { // 由於 ... 已出現在 a_n^{(h)} 之中 (latex)
		let expLatexs = [];
		for (const [s_frac_b, conflictNum] of Object.entries(this.homogRootConflictNum)) {
			const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b (Frac)
			for (let i = 0; i < conflictNum; i++) {
				expLatexs.push(_mlTerm(_mlTerm(1, "n", i, false), frac_b, "n", false));
			}
		}
		return expLatexs.join(" ~,~ ");
	}
	
	mlExistParticularExp() { // ，若特解與 a_n^{(p)} 也包含同樣項次 ... 會導致與齊次解重疊 (latex)
		return Object.keys(this.homogRootConflictNum).map(s_frac_b => {
			const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b (Frac)
			return _mlTerm(`p_{${this.varPjIndex[s_frac_b][0]}}`, frac_b, "n", false);
		}).join(" ~,~ ");
	}
	
	mlChangeExpList() { // 為了保證特解與齊次解的線性獨立性，需要將 "(p1 + p2n) b^n" 設為 "(p1n^2 + p2n^3) b^n". (齊次解有二重根 b)
		return Object.entries(this.homogRootConflictNum).map(([s_frac_b, conflictNum]) => { // 衝突的 b^n
			return [
				this._mlExpTerm(s_frac_b, true), // "沒乘 n^p 的 g(n)" (latex)
				this._mlExpTerm(s_frac_b, true, conflictNum) // "有乘 n^p 的 g(n)" (latex)
			];
		});
	}
	
	mlNewParticularForm() { // 因此特解的形式為: "a_n^{(p)} = (p1 + p2n + ...) b^n + ..." (latex)
		let s_latex = Object.keys(this.combinedExpFunc).map(s_frac_b => {
			const extraNPow = this.homogRootConflictNum[s_frac_b] ?? 0; // 為保持特解的線性獨立性, 額外乘上去的 n^p
			return this._mlExpTerm(s_frac_b, true, extraNPow);
		}).join(" + ");
		return `a_n^{(p)} = ${s_latex}`;
	}
	
	mlParticularIntoRecur() { // 將 a_n^(p) 代入原遞迴關係: ... (latex)
		let s_latex = this.recurCoef.map(
			(frac_coef, i) => _mlTerm(frac_coef, `a_{n-${i+1}}^{(p)}`, 1, true, true)
		).join("");
		
		s_latex = `a_n^{(p)} = ${removePrefix(s_latex, "+")} + F(n)`; // 在開頭加上 "a_n^{(p)} =", 此時 latex 字串為: "a_n^{(p)} = 齊次部分 + F(n)"
		s_latex = `${s_latex} ${SCL} n \\ge ${this.recurLevel}`; // 加上遞迴限制 ", n >= ?" , ? 應等於遞迴階數
		return `\\begin{gather*} ${s_latex} \\end{gather*}`; // 使 latex 置中的語法
	}
	
	mlParticularIntoRecurTrans() { // 移項後得到: ... (latex)
		let s_latex = this.recurCoef.map(
			(frac_coef, i) => _mlTerm(frac_coef.mul(-1), `a_{n-${i+1}}^{(p)}`, 1, true, true)
		).join("");
		
		s_latex = `a_n^{(p)} ${s_latex} = F(n)`;
		s_latex = `${s_latex} ${SCL} n \\ge ${this.recurLevel}`; // 加上遞迴限制 ", n >= ?" , ? 應等於遞迴階數
		return `\\begin{gather} ${s_latex} \\end{gather}`; // 使 latex 置中的語法 (gather不加*號代表需要顯示編號)
	}
	
	mlParticularIntoRecurWhere() { // 其中: ... (latex)
		let s_latex = `${this.mlNewParticularForm()} \\\\ F(n) = ${this.mlCombinedExp()}`;
		return `\\begin{cases} ${s_latex} \\end{cases}`;
	}
	
	mlParticular(PjAnswer) { // 將 p_j 代回 a_n^(p), 得到特解為 "..." (latex)
		let s_latex = Object.entries(PjAnswer).map(([s_frac_b, expPjAnswer]) => {
			const frac_b = Frac.fromStr(s_frac_b); // frac_b
			const extraNPow = this.homogRootConflictNum[s_frac_b] ?? 0; // 為保持特解的線性獨立性, 額外乘上去的 n^p
			return expPjAnswer.map((frac_Pj, i) => {
				let s_term = _mlTerm(frac_Pj, "n", i+extraNPow); // c n^k 部分的 latex 字串
				if (!frac_b.equal(new Frac(1))) { // 若 b^n 部分不為 1^n , 擴展為 c n^k b^n
					s_term = _mlTerm(removePrefix(s_term, "+"), frac_b, "n");
				}
				return s_term;
			}).filter(s_term => s_term !== "+0").join(" "); // 只顯示 c n^k 不為 0 的項
		}).join(" ");
		return `a_n^{(p)} = ${removePrefix(s_latex, "+")}`;
	}
	
	getParticular(PjAnswer) { // 生成特解的形式, 用於 emit 至 Recur.vue
		let particular = {};
		for (const [s_frac_b, expPjAnswer] of Object.entries(PjAnswer)) {
			const extraNPow = this.homogRootConflictNum[s_frac_b] ?? 0; // 為保持特解的線性獨立性, 額外乘上去的 n^p
			particular[s_frac_b] = [...Array(extraNPow).fill(new Frac(0)), ...expPjAnswer]; // 將多項式乘上 extraNPow
		}
		return particular;
	}
}

const recur = ref(null); // 遞迴非齊次部分的計算結果
const PjBuffer = ref({}); // p_j 緩存. 接收多個 RecurNonHomogExp.vue 回傳的未知係數 p_j

watch( // 遞迴式更新時, 重新計算非齊次部分
	() => [props.recurCoef, props.nonHomoFunc, props.cubic], ([newRC, newNHF, newC]) => {
		recur.value = new SolveNonHomog(newRC, newNHF, newC);
		PjBuffer.value = {}; // 清空來自多個子組件計算完成的 p_j
	},
	{ immediate: true, deep: true }
);

const particularLatex = computed(() => { // 特解的計算結果 (latex)
	if (Object.keys(PjBuffer.value).length === 0) return "?";
	emit("particular", recur.value.getParticular(toRaw(PjBuffer.value))); // 上傳特解的形式至 Recur.vue
	return recur.value.mlParticular(toRaw(PjBuffer.value));
});
</script>
