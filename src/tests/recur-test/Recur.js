import { isNum, F, Frac, Hop, EF, SolveQuad, SolveCubic } from "ran-math";
import { MakeLatex as ml, MultiTerm } from "ran-math";

export class SolveRecur { // 計算遞迴式的一般項, 並生成計算過程
	static checkParam(recurCoef, nonHomogFunc, initConst) { // 檢查參數型態
		if (!Array.isArray(recurCoef) || recurCoef.some(coef => !Hop.isRational(coef))) { // 齊次部分的係數必須都是 Frac | int number
			throwErr("SolveRecur.constructor", 'Param "recurCoef" must be an Array<int|Frac> .');
		}
		if (!(1 <= recurCoef.length && recurCoef.length <= 3)) { // 只能計算 1 ~ 3 階遞迴
			throwErr("SolveRecur.constructor", "Only support 1 ~ 3 order recurrence relation.");
		}
		if (!Array.isArray(nonHomogFunc) || nonHomogFunc.some(term => !Array.isArray(term))) {
			throwErr("SolveRecur.constructor", 'Param "nonHomogFunc" must be an Array<[ int|Frac, int>=0, int|Frac ]> .');
		}
		if (nonHomogFunc.some(term => !Hop.isRational(term[0]) || Hop.isNegInt(term[1]) || !Hop.isRational(term[2]))) {
			throwErr("SolveRecur.constructor", 'Param "nonHomogFunc" must be an Array<[ int|Frac, int>=0, int|Frac ]> .');
		}
		if (!Array.isArray(initConst) || initConst.some(c => !Hop.isRational(c))) { // 遞迴的初始條件必須都是 Frac | int number
			throwErr("SolveRecur.constructor", 'Param "initConst" must be an Array<int|Frac> .');
		}
	}
	
	static initRecur(recurCoef, nonHomogFunc, initConst) { // 整理遞迴式的參數, 以及將 int 轉型為 Frac
		const order = recurCoef.length; // 遞迴階數
		
		recurCoef = recurCoef.map(nf_coef => F(0).add(nf_coef)); // 利用 frac.add 將 int number 轉為 Frac, 保證 recurCoef 為 Array<Frac>
		
		nonHomogFunc = nonHomogFunc.map(([nf_c, k, nf_b]) => [F(0).add(nf_c), k, F(0).add(nf_b)]); // 保證 nonHomogFunc 為 Array<[Frac, int, Frac]>
		
		initConst = initConst.map(nf_coef => F(0).add(nf_coef)); // 保證 initConst 為 Array<Frac>
		initConst = initConst.slice(0, order); // 使 initConst 的長度與 recurCoef 一致, 不足的部分補 F(0)
		while (initConst.length < order) initConst.push(F(0));
		
		return [recurCoef, nonHomogFunc, initConst];
	}
	
	static initEigenvalue(recurCoef, order) { // 計算特徵值
		const negRecurCoef = recurCoef.map(frac_coef => frac_coef.mul(-1));
		if (order === 1) return [ new EF(recurCoef[0]) ]; // 解 t = r1
		if (order === 2) return new SolveQuad(1, ...negRecurCoef).roots; // 解 t^2 = r1 t + r2
		if (order === 3) return new SolveCubic(1, ...negRecurCoef).roots; // 解 t^3 = r1 t^2 + r2 t + r3
	}
	
	static initExtraPow(order, eigenvalue) { // 如果特徵值重根, 需要多乘 n^p 保證線性獨立
		const ev = eigenvalue; // 特徵值
		if (order === 1) return [0]; // 無重根
		if (order === 2) return ev[0].equal(ev[1]) ? [0, 1] : [0, 0]; // 二重根
		if (order === 3) {
			if (ev[0].equal(ev[1]) && ev[1].equal(ev[2])) return [0, 1, 2]; // 三重根
			if (ev[0].equal(ev[1])) return [0, 1, 0]; // 二重根
			if (ev[1].equal(ev[2])) return [0, 0, 1]; // 二重根. 不可能 ev0 等於 ev2, 因為有理根已排序 -> 三重根
			return [0, 0, 0]; // 無重根
		}
	}
	
	constructor(recurCoef, nonHomogFunc, initConst) {
		SolveRecur.checkParam(recurCoef, nonHomogFunc, initConst); // 檢查參數型態
		[this.recurCoef, this.nonHomogFunc, this.initConst] = SolveRecur.initRecur(recurCoef, nonHomogFunc, initConst); // 整理遞迴式的參數
		this.order = this.recurCoef.length; // 1|2|3 ; 遞迴階數
		this.eigenvalue = SolveRecur.initEigenvalue(this.recurCoef, this.order); // Array<EF> ; 齊次遞迴的特徵值
		this.extraPow = SolveRecur.initExtraPow(this.order, this.eigenvalue); // Array<0|1|2> ; 如果特徵值重根, 需要多乘 n^p 保證線性獨立
		if (this.haveNonHomog()) this.nonHomog = new SolveNonHomog(this); // 解決遞迴的非齊次部分, 得到特解, 並生成計算過程
	}
	
	mlRecurHomog() { // 遞迴的齊次部分 "r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}"
		const mt = new MultiTerm();
		this.recurCoef.forEach((frac_coef, i) => mt.pushTerm(frac_coef, `a_{n-${i+1}}`, 1));
		return mt.toLatex();
	}
	
	mlRecurNonHomog() { // 遞迴的非齊次部分 "c n^k b^n + ..."
		const mt = new MultiTerm();
		this.nonHomogFunc.forEach(([frac_c, k, frac_b]) => { // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 [ [frac_c, k, frac_b], ... ]
			let s_term = ml.term(frac_c, "n", k); // c n^k 部分的 latex 字串
			if (!frac_b.equal(1)) s_term = ml.term(s_term, frac_b, "n"); // 若 b^n 部分不為 1^n , 擴展為 c n^k b^n
			mt.push(s_term);
		});
		return mt.toLatex();
	}
	
	mlRecur() { // 生成遞迴關係式的 latex 字串
		const mt = new MultiTerm().push(this.mlRecurHomog()).push(this.mlRecurNonHomog()); // "齊次部分 + 非齊次部分" (latex)
		let s_latex = `a_n = ${mt.toLatex()} ${ml.sc} n \\ge ${this.order} \\\\ `; // "a_n = 齊次部分 + 非齊次部分 , n >= ?" ; ? 應等於遞迴階數
		s_latex += this.initConst.map((frac_c, i) => `a_${i}=${frac_c.toLatex()}`).join(ml.sc); // 遞迴初始條件: "a_0 = ? , a_1 = ? , a_2 = ?" (latex)
		return `\\begin{gather*} ${s_latex} \\end{gather*}`; // 使 latex 置中的語法
	}
	
	mlCharacterPolynomial() { // 特徵方程式 "t^o = r1 t^{o-1} + r2 t^{o-2} + r3 t^{o-3}" (latex)
		const o = this.order; // 遞迴階數
		const mt = new MultiTerm();
		this.recurCoef.forEach((frac_coef, i) => mt.pushTerm(frac_coef, "t", o-1-i)); // "r1 t^{o-1} + r2 t^{o-2} + r3 t^{o-3}"
		return `${ml.term("", "t", o)} = ${mt.toLatex()}`; // 在開頭加上 "t^o = "
	}
	
	mlEigenvalues() { // 特徵值 "t = ? , ? , ?" (latex)
		return this.eigenvalue.map(ef => ef.toLatex()).join(ml.sc);
	}
	
	showNoRationalRoot() { // 是否要顯示 "(!) 不存在有理數形式的根" 的警告訊息
		return this.eigenvalue.some(ef => isNum(ef.nf_a) || isNum(ef.nf_b)); // 無理數 ef 的 a, b 會是 float number (C mode)
	}
	
	getMultiRoot() { // 重根特徵值, 若無重根回傳 null
		for (const [i, pow] of this.extraPow.entries()) if (pow >= 1) return this.eigenvalue[i]; // 只要發現有多乘 n^p , 必為重根
		return null; // 無重根
	}
	
	getMultiRootNumber() { // 重根數
		return Math.max(...this.extraPow) + 1; // 如果最多乘 n^p , 為 p+1 重根
	}
	
	mlMultiRootHomog() { // 重根齊次形式 "h_1 b^n + h_2 n b^n + h_3 n^2 b^n" (latex)
		const ef_multiRoot = this.getMultiRoot(); // 重根一定是有理數
		const s_expLatex = ml.term(1, ef_multiRoot.equal(1) ? "{1}" : ef_multiRoot.nf_a, "n"); // b^n (latex) ; 因為 1^n 會被轉成 1, 所以只能這樣做
		const mt = new MultiTerm();
		this.eigenvalue.forEach((ef, i) => {
			if (ef.equal(ef_multiRoot)) mt.push(ml.term(`{h_${i+1}}`, "n", this.extraPow[i]) + s_expLatex); // 只顯示重根的齊次部分
		});
		return mt.toLatex();
	}
	
	mlHomogForm(show1n, coef = ["h_{1}", "h_{2}", "h_{3}"]) { // 因此將齊次解設為 "..." (latex), 係數預設為 h_i
		const mt = new MultiTerm();
		this.eigenvalue.forEach((ef, i) => {
			let s_base = ef.toLatex();
			if (show1n && ef.equal(1)) s_base = "{1}"; // 因為 1^n 會被轉成 1, 所以只能這樣做
			else if (!Hop.equal(ef.nf_b, 0)) s_base = ml.delim(s_base); // 如果 a + b√s 的 b 不為 0, 必須加上括號: h_i (a + b√s)^n
			
			const s_expLatex = ml.term(1, s_base, "n"); // b^n (latex) ; 
			mt.push(ml.term(coef[i], "n", this.extraPow[i]) + s_expLatex); // 只顯示重根的齊次部分
		});
		return mt.toLatex();
	}
	
	haveNonHomog() { // 遞迴是否有非齊次部分
		return this.nonHomogFunc.length > 0;
	}
}

export class SolveNonHomog { // 解決遞迴的非齊次部分, 得到特解, 並生成計算過程
	static initExpFunc(nonHomogFunc) { // 合併同類指數項
		let expFunc = {};
		nonHomogFunc.forEach(([frac_c, k, frac_b]) => { // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 [ [frac_c, k, frac_b], ... ]
			const s_frac_b = `${frac_b.n}/${frac_b.d}`; // 將 frac_b 轉為 str 作為同類指數項的 key
			if (!(s_frac_b in expFunc)) expFunc[s_frac_b] = []; // 新增指數項
			while (expFunc[s_frac_b].length - 1 < k) expFunc[s_frac_b].push(F(0)); // 補足多項式 f_i(n) 的次數
			expFunc[s_frac_b][k] = frac_c; // 設定多項式 f_i(n) 的係數
		});
		return expFunc;
	}
	
	static initPjIndex(combinedExpFunc) { // 對特解的未知係數編號
		let pjIndex = {};
		let pj = 1; // 未知係數 p_j 的編號 j 從 1 開始
		for (const [s_frac_b, combinedExp] of Object.entries(combinedExpFunc)) {
			pjIndex[s_frac_b] = combinedExp.map(() => pj++); // pjIndex 與 combinedExpFunc 的結構相同
		}
		return [pjIndex, pj-1];
	}
	
	static initExpExtraPow(eigenvalue, combinedExpFunc) { // 檢查 a_n^(p) 和 a_n^(h) 是否有重複的 b^n, 如果有, 需要多乘 n^k 保證線性獨立
		let expExtraPow = {};
		eigenvalue.forEach(ef => {
			if (!Hop.equal(ef.nf_b, 0) || isNum(ef.nf_a)) return; // 無理數特徵值不可能跟特解的有理數 b 相同
			const s_base = `${ef.nf_a.n}/${ef.nf_a.d}`; // 檢查 combinedExpFunc 裡的 b^n 有沒有跟齊次解重複
			if (s_base in combinedExpFunc) expExtraPow[s_base] = (expExtraPow[s_base] ?? 0) + 1; // 每個重複的 b^n, 需要多乘一個 n
		});
		return expExtraPow;
	}
	
	constructor(recur) {
		this.recurCoef = recur.recurCoef; // Array<Frac> ; 齊次部分的係數
		this.combinedExpFunc = SolveNonHomog.initExpFunc(recur.nonHomogFunc); // 同類指數項 { "b.n/b.d": [ f0, f1, f2 ], ... } 代表 (f0 + f1n + f2n^2) b^n + ...
		[this.pjIndex, this.pjNum] = SolveNonHomog.initPjIndex(this.combinedExpFunc); // 未知係數的編號, 與 combinedExpFunc 的結構相同 ; pjNum 為未知係數的數量
		this.expExtraPow = SolveNonHomog.initExpExtraPow(recur.eigenvalue, this.combinedExpFunc); // { "b.n/b.d": k, ... } ; 齊次解的某個特徵值 b 的重根數, 且 b^n 存在於特解內. 決定非齊次指數項需要乘 n^k 保證線性獨立
	}
	
	mlExpTerm(s_frac_b, isUnknownCoef, extraNPow = 0) { // 生成 "(p1 + p2n + ...) b^n" (latex). extraNPow 為額外乘上去的 n^p
		const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b (Frac)
		const mt = new MultiTerm(); // "p1 + p2n + ..." (latex)
		this.combinedExpFunc[s_frac_b].forEach((coef, i) => {
			if (isUnknownCoef) coef = `p_{${this.pjIndex[s_frac_b][i]}}`; // isUnknownCoef 開啟會把係數替換成未知數 p_j
			mt.pushTerm(coef, "n", i + extraNPow);
		});
		return ml.term(`(${mt.toLatex()})`, frac_b.equal(1) ? "{1}" : frac_b, "n"); // 防止 1^n 被吃掉
	}
	
	mlCombinedExpFunc() { // 合併相同的指數項: ... "(f0 + f1n + f2n^2 + ...) b^n + ..." (latex)
		const mt = new MultiTerm();
		Object.keys(this.combinedExpFunc).forEach(s_frac_b => mt.push(this.mlExpTerm(s_frac_b, false)));
		return mt.toLatex();
	}
	
	mlParticularForm() { // 猜測特解的形式為: "a_n^{(p)} = Σ_i g_i(n) b_i^n = (p1 + p2n + ...) b^n + ..." (latex)
		const mt = new MultiTerm();
		Object.keys(this.combinedExpFunc).forEach(s_frac_b => mt.push(this.mlExpTerm(s_frac_b, true)));
		return `a_n^{(p)} = \\sum\\limits_{i} g_i(n) {b_i}^n = ${mt.toLatex()}`;
	}
}

export class SolveNonHomogExp { // 計算特解當中某個指數部分對應的未知係數, 並生成計算過程
	
}

function throwErr(methodName, errMessage) {
	throw new Error(`[Recur][${methodName}] ${errMessage}`);
}
