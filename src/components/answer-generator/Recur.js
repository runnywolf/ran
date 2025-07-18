import { isNum, F, Frac, Hop, EF, Matrix, SolveQuad, SolveCubic } from "ran-math";
import { MakeLatex as ml, MultiTerm } from "ran-math";

export class SolveRecur { // 計算遞迴式的一般項, 並生成計算過程
	static checkParam(recurCoef, nonHomogFunc, initConst) { // 檢查參數型態
		if (!Array.isArray(recurCoef) || recurCoef.some(coef => !Hop.isRational(coef))) { // 齊次部分的係數必須都是 Frac | int number
			throwErr("SolveRecur.constructor", 'Param "recurCoef" must be an Array<int|Frac> .');
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
		recurCoef = recurCoef.map(nf_coef => F(0).add(nf_coef)); // 利用 frac.add 將 int number 轉為 Frac, 保證 recurCoef 為 Array<Frac>
		while (recurCoef.at(-1)?.equal(0)) recurCoef.pop(); // 降階: a_n = r1 a_{n-1} + 0 a_{n-2} 應該等於 a_n = r1 a_{n-1}
		if (!(1 <= recurCoef.length && recurCoef.length <= 3)) { // 只能計算 1 ~ 3 階遞迴
			throwErr("SolveRecur.initRecur", "Only support 1 ~ 3 order recurrence relation.");
		}
		const order = recurCoef.length; // 遞迴階數
		
		nonHomogFunc = nonHomogFunc.map(([nf_c, k, nf_b]) => [F(0).add(nf_c), k, F(0).add(nf_b)]); // 保證 nonHomogFunc 為 Array<[Frac, int, Frac]>
		for (let i = nonHomogFunc.length - 1; i >= 0; i--) { // 合併相同 n^k b^n 的項, 因為會涉及到刪除, 所以必須從後面開始檢查
			const [frac_c, k, frac_b] = nonHomogFunc[i];
			for (let j = 0; j <= i-1; j++) {
				const [_c, _k, _frac_b] = nonHomogFunc[j];
				if (k === _k && frac_b.equal(_frac_b)) { // 相同 n^k b^n 的項
					nonHomogFunc[j][0] = nonHomogFunc[j][0].add(frac_c); // 將第 i 項合併至第 j 項
					nonHomogFunc.pop(i); // 刪除第 i 項
					break;
				}
			}
		}
		nonHomogFunc = nonHomogFunc.filter(([frac_c, k, frac_b]) => !frac_c.isZero() && !frac_b.isZero()); // 刪除 0 n^k b^n 和 c n^k 0^n 的項
		
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
	
	static initHiLinearEquations(order, eigenvalue, extraPow) { // 生成 h_i 的線性方程組 (方陣)
		return new Matrix(order, order, (n, i) => eigenvalue[i].pow(n).mul(n ** extraPow[i])); // 齊次解代入 n 後, h_i 的係數 (n^p λ^n)
	}
	
	static initAnSubAnp(initConst, nonHomog) { // 將 n 代入 a_n - a_n^(p), 用於解未知係數 h_i 的聯立
		if (nonHomog === undefined) return initConst; // 如果遞迴不存在非齊次部分, 回傳 a_n 就好
		return initConst.map((frac_an, n) => frac_an.sub(nonHomog.getAnp(n))); // a_n - a_n^(p)
	}
	
	static solveHi(order, matrix_hiLE, anSubAnp) { // 解聯立求 h_i
		const matrix_anSubAnp = new Matrix(order, 1, n => anSubAnp[n]);
		let hiAnswer = matrix_hiLE.inverse().mul(matrix_anSubAnp).arr.map(row => row[0]);
		if (order === 3) hiAnswer[0] = new EF(hiAnswer[0].nf_a); // 因為 h_1 一定是實數, 消除 float EF 的誤差
		return hiAnswer;
	}
	
	constructor(recurCoef, nonHomogFunc, initConst) {
		SolveRecur.checkParam(recurCoef, nonHomogFunc, initConst); // 檢查參數型態
		[recurCoef, nonHomogFunc, initConst] = SolveRecur.initRecur(recurCoef, nonHomogFunc, initConst); // 整理遞迴式的參數
		this.recurCoef = recurCoef; // Array<Frac> ; 齊次部分的係數, length 代表遞迴階數
		this.nonHomogFunc = nonHomogFunc; // Array<[Frac, int, Frac]> ; 非齊次的 frac_c n^k (frac_b)^n 項會表示為 [ [frac_c, k, frac_b], ... ]
		this.initConst = initConst; // Array<Frac> ; 遞迴的初始條件, 長度與 recurCoef 的大小相同
		this.order = this.recurCoef.length; // 1|2|3 ; 遞迴階數
		this.eigenvalue = SolveRecur.initEigenvalue(this.recurCoef, this.order); // Array<EF> ; 齊次遞迴的特徵值
		this.extraPow = SolveRecur.initExtraPow(this.order, this.eigenvalue); // Array<0|1|2> ; 如果特徵值重根, 需要多乘 n^p 保證線性獨立
		if (this.haveNonHomog()) this.nonHomog = new SolveNonHomog(this); // 解決遞迴的非齊次部分, 得到特解, 並生成計算過程
		this.matrix_hiLE = SolveRecur.initHiLinearEquations(this.order, this.eigenvalue, this.extraPow); // Matrix ; h_i 的線性方程組 (方陣)
		this.anSubAnp = SolveRecur.initAnSubAnp(this.initConst, this.nonHomog); // Array<Frac> ; a_n - a_n^(p)
		this.hiAnswer = SolveRecur.solveHi(this.order, this.matrix_hiLE, this.anSubAnp); // Array<EF> ; 未知係數 h_i 的解
	}
	
	mlRecurHomog() { // 遞迴的齊次部分 "r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}"
		const mt = new MultiTerm();
		this.recurCoef.forEach((frac_coef, i) => mt.pushTerm(frac_coef, `a_{n-${i+1}}`, 1));
		return mt.toLatex();
	}
	
	mlRecurNonHomog() { // 遞迴的非齊次部分 "c n^k b^n + ..."
		const mt = new MultiTerm();
		this.nonHomogFunc.forEach(([frac_c, k, frac_b]) => { // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 [ [frac_c, k, frac_b], ... ]
			mt.pushTerm(ml.term(frac_c, "n", k), frac_b, "n");
		});
		return mt.toLatex();
	}
	
	mlRecur() { // 生成遞迴關係式的 latex 字串
		const mt = new MultiTerm().push(this.mlRecurHomog()).push(this.mlRecurNonHomog()); // "齊次部分 + 非齊次部分" (latex)
		let s_latex = `a_n = ${mt.toLatex()} ~,~~ n \\ge ${this.order} \\\\ `; // "a_n = 齊次部分 + 非齊次部分 , n >= ?" ; ? 應等於遞迴階數
		s_latex += this.initConst.map((frac_c, i) => `a_${i}=${frac_c.toLatex()}`).join("~,~~"); // 遞迴初始條件: "a_0 = ? , a_1 = ? , a_2 = ?" (latex)
		return `\\begin{gather*} ${s_latex} \\end{gather*}`; // 使 latex 置中的語法
	}
	
	mlCharacterPolynomial() { // 特徵方程式 "t^o = r1 t^{o-1} + r2 t^{o-2} + r3 t^{o-3}" (latex)
		const o = this.order; // 遞迴階數
		const mt = new MultiTerm();
		this.recurCoef.forEach((frac_coef, i) => mt.pushTerm(frac_coef, "t", o-1-i)); // "r1 t^{o-1} + r2 t^{o-2} + r3 t^{o-3}"
		return `${ml.term("", "t", o)} = ${mt.toLatex()}`; // 在開頭加上 "t^o = "
	}
	
	mlEigenvalues() { // 特徵值 "t = ? , ? , ?" (latex)
		return this.eigenvalue.map(ef => ef.toLatex()).join("~,~~");
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
			const base = (show1n && ef.equal(1)) ? "{1}" : ef;
			mt.pushTerm(ml.term(coef[i], "n", this.extraPow[i]), base, "n"); // 只顯示重根的齊次部分
		});
		return mt.toLatex();
	}
	
	haveNonHomog() { // 遞迴是否有非齊次部分
		return this.nonHomogFunc.length > 0;
	}
	
	mlGeneralForm() { // 遞迴的通解 a_n = a_n^(h) + a_n^(p) , 因此 "..." (latex)
		return `a_n = ${this.mlHomogForm(false)}` + (this.haveNonHomog() ? " + a_n^{(p)}" : ""); // 如果遞迴有非齊次部分, 要加上特解 "a_n^{(p)}"
	}
	
	mlGeneralFormTrans() { // 將齊次解移項至左側： "..." (latex)
		return `${this.mlHomogForm(false)} = a_n` + (this.haveNonHomog() ? " - a_n^{(p)}" : ""); // 如果遞迴有非齊次部分, 要加上特解 "a_n^{(p)}"
	}
	
	mlSomeHi() { // 求未知係數 "h1 , h2 , h3" (latex)
		return Array.from({ length: this.order }, (_, i) => `h_{${i+1}}`).join("~,~"); // 遞迴階數等於齊次解未知係數的個數
	}
	
	mlNRange() { // 需要將 "n = 0, 1, 2" 代入上式，產生 ... (latex)
		return "n = " + Array.from({ length: this.order }, (_, i) => `${i}`).join(",");
	}
	
	mlHiLinearEquations() { // ... 產生 ? 個式子的的線性方程組，並解聯立： "..." (latex)
		const coefFunc = (n, i) => this.matrix_hiLE.arr[n][i];
		const varFunc = (n, i) => `h_${i+1}`;
		const equalLatex = (n) => {
			let s_latex = `a_{${n}}`; // 顯示 "= a_n"
			if (this.haveNonHomog()) s_latex += ` - a_{${n}}^{(p)}`; // 若遞迴存在非齊次部分, 會多一個 "- a_n^(p)"
			return `${s_latex} = ${this.anSubAnp[n].toLatex()}`; // 加上常數 a_n - a_n^(p)
		};
		return ml.equationSystem(this.order, this.order, coefFunc, varFunc, equalLatex, "right");
	}
	
	mlHiAnswer() { // 解聯立後得到： "..." (latex)
		return this.hiAnswer.map((ef_hi, i) => `h_{${i+1}} = ${ef_hi.toLatex()}`).join("~,~~");
	}
	
	answerExistComplex() { // h_i 是否有複數
		return this.eigenvalue.some(ef_hi => ef_hi.s < 0);
	}
	
	mlPolarCoordinate() {
		let s_latex = "&= h_1 {(\\alpha + \\beta i)}^n + h_2 {(\\alpha - \\beta i)}^n \\\\" +
		"&= h_1 {(r e^{i \\theta})}^n + h_2 {(r e^{-i \\theta})}^n \\quad,\\quad " +
		"r = \\sqrt{\\alpha^2 + \\beta^2} \\quad,\\quad \\theta = \\text{atan2}(\\beta , \\alpha) \\\\" +
		"&= h_1 r^n e^{i n \\theta} + h_2 r^n e^{-i n \\theta} \\\\" +
		"&= h_1 r^n (\\cos n \\theta + i \\sin n \\theta) + h_2 r^n (\\cos n \\theta - i \\sin n \\theta) \\\\"+
		"&= (h_1 + h_2) \\cos(n \\theta) r^n + (h_1 - h_2) i \\sin(n \\theta) r^n";
		if (this.order === 3) s_latex = s_latex.replaceAll("h_2", "h_3").replaceAll("h_1", "h_2");
		return `\\begin{split} ${s_latex} \\end{split}`;
	}
	
	mlClosedFormIm() { // 先將複數部分轉為極座標，再使用歐拉公式： ... 因此 "..." (latex)
		const mt = new MultiTerm();
		if (this.order === 3) mt.pushTerm(this.hiAnswer[0], this.eigenvalue[0], "n"); // 如果出現複數, 那第一個特徵值不可能重根, 所以 latex 為: h_1 b_1^n
		const ef_complex = (this.order === 2) ? this.hiAnswer[0] : this.hiAnswer[1]; // a + bi
		mt.pushTerm(ef_complex.mul(2).real().toLatex(), "\\cos(n \\theta) r^n", 1); // h2 = (a + bi) ; h3 = (a - bi) ===> h2 + h3 = 2a ; (h2 - h3)i = -2b
		mt.pushTerm(ef_complex.mul(-2).imag().toLatex(), "\\sin(n \\theta) r^n", 1); // 先將 EF 轉 latex, 防止 ml.term 為 EF
		if (this.haveNonHomog()) mt.push("a_n^{(p)}");
		return `a_n = ${mt.toLatex()}`;
	}
	
	_atan2(ef) { // 對非實數 (ef.s < 0) 求極座標角度 (rad), 有可能回傳 Frac 或 float
		const atan2FracOp = (frac_a, frac_b) => { // Q mode EF, (a + b√s)
			const [ef_alpha, ef_beta] = [ef.real(), ef.imag()]; // α + β i
			
			let frac_atan2; // 如果 atan2 的結果是分數 pi 形式, 此值會是 Frac, 否則為 undefined
			if (ef_alpha.equal(0)) frac_atan2 = F(1, 2); // atan2(±inf) = ±1/2
			else {
				const ef_slope = ef_beta.div(ef_alpha); // 斜率: β / α
				ef_slope.nf_a.n = Math.abs(ef_slope.nf_a.n);
				ef_slope.nf_b.n = Math.abs(ef_slope.nf_b.n); // 將斜率轉正
				
				if (ef_slope.equal(new EF(0, F(1, 3), 3))) frac_atan2 = F(1, 6); // atan2(√3 / 3) = 1/6 pi
				else if (ef_slope.equal(1)) frac_atan2 = F(1, 4); // atan2(1) = 1/4 pi
				else if (ef_slope.equal(new EF(0, 1, 3))) frac_atan2 = F(1, 3); // atan2(√3) = 1/3 pi
			}
			
			if (frac_atan2 === undefined) return atanFloatOp(frac_a.toFloat(), frac_b.toFloat()); // 無法化簡為有理數 pi 的情形
			
			if (frac_a.lt(0)) frac_atan2 = F(1).sub(frac_atan2); // 虛軸鏡像
			if (frac_b.lt(0)) frac_atan2 = F(0).sub(frac_atan2); // 實軸鏡像
			return frac_atan2;
		};
		const atanFloatOp = (num_a, num_b) => { // C mode EF, (a + b√s)
			const [alpha, beta] = [num_a, num_b * Math.sqrt(-ef.s)]; // α + β i
			return Math.atan2(beta, alpha);
		};
		return Hop._makeOp([ef.nf_a, ef.nf_b], atan2FracOp, atanFloatOp);
	}
	
	mlClosedFormImWhere() { // 其中 "三角函數形式的 r 和 \theta" (latex)
		const ef_base = (this.order === 2) ? this.eigenvalue[0] : this.eigenvalue[1]; // base = a + bi
		const [ef_alpha, ef_beta] = [ef_base.real(), ef_base.imag()]; // a + b i
		const ef_norm = new EF(0, 1, ef_base.normSquare()); // 0 + 1√(a^2 + b^2) = √(a^2 + b^2)
		const nf_atan2 = this._atan2(ef_base); // atan2(b, a)
		
		let s_rLatex = `${ml.delim(ef_alpha.toLatex())}^2 + ${ml.delim(ef_beta.toLatex())}^2`; // "alpha^2 + beta^2" (latex)
		s_rLatex = `r = \\sqrt{${s_rLatex}} = ${ef_norm.toLatex()}`; // "r = √( alpha^2 + beta^2 ) = 範數" (latex)
		
		let s_thetaLatex = `\\theta = \\text{atan2}(${ef_beta.toLatex()} , ${ef_alpha.toLatex()})`; // "theta = atan2(beta , alpha)" (latex)
		s_thetaLatex += Frac.isFrac(nf_atan2) ? " = " : " \\approx "; // 浮點數 pi 需要加 "大約等於" 的符號
		s_thetaLatex += `${Hop.toLatex(nf_atan2)} \\pi`;
		
		return `\\begin{gather*} ${s_rLatex} \\\\ ${s_thetaLatex} \\end{gather*}`;
	}
	
	mlClosedForm() { // 通解不含 i, 將 h_1, h_2, ... 直接代回 a_n: "..." (latex)
		const mt = new MultiTerm().push(this.mlHomogForm(false, this.hiAnswer));
		if (this.haveNonHomog()) mt.push("a_n^{(p)}");
		return `a_n = ${mt.toLatex()}`;
	}
	
	mlClosedFormFix() { // 整理後的一般項為：
		const mt_notQ = new MultiTerm();
		let expPolyFunc = {}; // 因為要與齊次解的有理數 b^n 合併, 需要複製一份特解
		if (this.haveNonHomog()) { // 如果有非齊次部分才需要複製
			for (const [s_frac_b, expPoly] of Object.entries(this.nonHomog.particular)) {
				expPolyFunc[s_frac_b] = expPoly.map(frac_pj => frac_pj.copy()); // deep copy
			}
		}
		this.eigenvalue.forEach((ef, i) => { // 將齊次解的有理數 b^n 與特解合併
			if (Hop.equal(ef.nf_b, 0) && Frac.isFrac(ef.nf_a)) { // 有理數 b^n
				const s_frac_b = `${ef.nf_a.n}/${ef.nf_a.d}`;
				if (!(s_frac_b in expPolyFunc)) expPolyFunc[s_frac_b] = [];
				const p = this.extraPow[i];
				while (p > expPolyFunc[s_frac_b].length - 1) expPolyFunc[s_frac_b].push(F(0));
				expPolyFunc[s_frac_b][p] = this.hiAnswer[i].nf_a;
			} else if (ef.s >= 0) { // 複數 b^n 需要使用 cos/sin 形式取代, 不可以顯示
				mt_notQ.pushTerm(this.hiAnswer[i], ef, "n"); // 如果出現無理數, 那特徵值不可能重根, 所以 latex 為: h_1 b_1^n
			}
		});
		
		const mt = new MultiTerm();
		Object.entries(expPolyFunc).forEach(([s_frac_b, expPoly]) => { // 生成有理數 b^n 部分的 latex
			const frac_b = Frac.fromStr(s_frac_b);
			const arr_term = expPoly.map((frac, i) => ml.term(frac, "n", i)).filter(s_term => s_term != "0");
			if (arr_term.length === 1) mt.pushTerm(arr_term[0], frac_b, "n"); // c? n^? b^n
			if (arr_term.length >= 2) {
				const mt_poly = new MultiTerm();
				arr_term.forEach(s_term => mt_poly.push(s_term)); // c0 + c1 n + ...
				if (frac_b.equal(1)) mt.pushTerm(mt_poly.toLatex(), frac_b, "n"); // (c0 + c1 n + ...) 1^n -> c0 + c1 n + ...
				else mt.pushTerm(ml.delim(mt_poly.toLatex()), frac_b, "n"); // (c0 + c1 n + ...) b^n
			}
		});
		
		mt.push(mt_notQ.toLatex()); // 無理數 b^n, 顯示在有理數部分之後
		
		if (this.answerExistComplex()) { // 如果有複數 b^n, 顯示在最右側, 並使用 cos/sin 形式取代複數 b^n
			const ef_complex = (this.order === 2) ? this.hiAnswer[0] : this.hiAnswer[1]; // a + bi
			mt.pushTerm(ef_complex.mul(2).real().toLatex(), "\\cos(n \\theta) r^n", 1); // h2 = (a + bi) ; h3 = (a - bi) ===> h2 + h3 = 2a ; (h2 - h3)i = -2b
			mt.pushTerm(ef_complex.mul(-2).imag().toLatex(), "\\sin(n \\theta) r^n", 1); // 先將 EF 轉 latex, 防止 ml.term 為 EF
		}
		
		return `a_n = ${mt.toLatex()}`;
	}
	
	getAnFromRecursive(n) { // 用遞迴式計算 a_n (必為 Frac)
		let a = this.initConst.map(frac_c => frac_c.copy());
		for (let i = 0; i < n; i++) {
			const fn = this.haveNonHomog() ? this.nonHomog.getFn(i + this.order) : F(0); // 將 n 代入非齊次部分
			const newAn = Frac.sum(this.recurCoef.map((frac, i) => frac.mul(a[this.order-1-i]))).add(fn); // 計算下一項 a_n
			if (this.order === 1) a = [newAn];
			if (this.order === 2) a = [a[1], newAn];
			if (this.order === 3) a = [a[1], a[2], newAn];
		}
		return a[0];
	}
	
	getAnFromClosedForm(n) { // 用一般式計算 a_n (可能會出現無理數, 回傳 float 或 Frac)
		const ef_anh = EF.sum(this.hiAnswer.map( // 齊次解 a_n^(h) 代入 n 得到的值, 必為有理數
			(ef_hi, i) => ef_hi.mul(n ** this.extraPow[i]).mul(this.eigenvalue[i].pow(n))
		));
		return Hop.add(ef_anh.nf_a, this.haveNonHomog() ? this.nonHomog.getAnp(n) : F(0));
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
		for (const [s_frac_b, expPoly] of Object.entries(combinedExpFunc)) {
			pjIndex[s_frac_b] = expPoly.map(() => pj++); // pjIndex 與 combinedExpFunc 的結構相同
		}
		return [pjIndex, pj-1];
	}
	
	static initExpExtraPow(eigenvalue, combinedExpFunc) { // 檢查 a_n^(p) 和 a_n^(h) 是否有重複的 b^n, 如果有, 需要多乘 n^k 保證線性獨立
		let expExtraPow = {};
		Object.keys(combinedExpFunc).forEach(s_frac_b => { // 檢查 combinedExpFunc 裡的 b^n 有沒有跟齊次解重複
			const extraPow = eigenvalue.filter(ef => ef.equal(Frac.fromStr(s_frac_b))).length; // 每個重複的 b^n, 需要多乘一個 n
			if (extraPow >= 1) expExtraPow[s_frac_b] = extraPow;
		});
		return expExtraPow;
	}
	
	static initAllNonHomogExp(recurCoef, nonHomog) { // 對每個指數項 b^n 對應的多項式, 求未知係數 p_j
		let dict_nonHomogExp = {};
		for (const [s_frac_b, expPoly] of Object.entries(nonHomog.combinedExpFunc)) { // 對指數項 b^n 對應的多項式, 求未知係數 p_j
			dict_nonHomogExp[s_frac_b] = new SolveNonHomogExp(
				nonHomog, // 因為需要使用 .mlExpTerm
				recurCoef, // 齊次部分的係數
				s_frac_b, // b^n 的 b ( "b.n/b.d" )
				expPoly, // b^n 對應的多項式
				nonHomog.expExtraPow[s_frac_b] ?? 0, // 多乘的 n^k 保證線性獨立
				nonHomog.pjIndex[s_frac_b][0] // 指數項 b^n 的多個未知係數的開始編號
			);
		}
		return dict_nonHomogExp;
	}
	
	static initParticular(dict_nonHomogExp) { // 將每個 b^n 對應的 SolveNonHomogExp 分別計算的特解係數 p_j 合併起來, 形成特解
		let particular = {};
		for (const [s_frac_b, nonHomogExp] of Object.entries(dict_nonHomogExp)) {
			particular[s_frac_b] = [...Array(nonHomogExp.extraPow).fill(F(0)), ...nonHomogExp.pjAnswer]; // 將多項式乘上額外的 n^p
		}
		return particular;
	}
	
	static mlExponential(s_frac_b) { // 生成 "b^n" 的 latex 語法, 會特別保留 1^n 而不會省略成 1
		const frac_b = Frac.fromStr(s_frac_b);
		return ml.term(1, frac_b.equal(1) ? "{1}" : frac_b, "n");
	}
	
	constructor(recur) {
		this.recurCoef = recur.recurCoef; // Array<Frac> ; 齊次部分的係數
		this.combinedExpFunc = SolveNonHomog.initExpFunc(recur.nonHomogFunc); // 同類指數項 { "b.n/b.d": [ f0, f1, f2 ], ... } 代表 (f0 + f1n + f2n^2) b^n + ...
		const [pjIndex, pjNum] = SolveNonHomog.initPjIndex(this.combinedExpFunc);
		this.pjIndex = pjIndex; // { "b.n/b.d": Array<int>, ... } ; 未知係數的編號, 與 combinedExpFunc 的結構相同
		this.pjNum = pjNum; // int>=1 ; 未知係數的數量
		this.expExtraPow = SolveNonHomog.initExpExtraPow(recur.eigenvalue, this.combinedExpFunc); // { "b.n/b.d": k, ... } ; 齊次解的某個特徵值 b 的重根數, 且 b^n 存在於特解內. 決定非齊次指數項需要乘 n^k 保證線性獨立
		this.dict_nonHomogExp = SolveNonHomog.initAllNonHomogExp(recur.recurCoef, this); // { "b.n/b.d": SolveNonHomogExp, ... }
		this.particular = SolveNonHomog.initParticular(this.dict_nonHomogExp); // { "b.n/b.d": [ f0, f1, f2 ], ... } 代表特解 (f0 + f1n + f2n^2) b^n + ...
	}
	
	mlExpTerm(s_frac_b, isUnknownCoef, extraPow = 0) { // 生成 "(p1 + p2n + ...) b^n" (latex). extraPow 為額外乘上去的 n^p
		const mt = new MultiTerm(); // "p1 + p2n + ..." (latex)
		this.combinedExpFunc[s_frac_b].forEach((coef, i) => {
			if (isUnknownCoef) coef = `p_{${this.pjIndex[s_frac_b][i]}}`; // isUnknownCoef 開啟會把係數替換成未知數 p_j
			mt.pushTerm(coef, "n", i + extraPow);
		});
		return `(${mt.toLatex()})${SolveNonHomog.mlExponential(s_frac_b)}`; // "(p1 + p2n + ...) b^n" (latex)
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
	
	existSameBase() { // a_n^(p) 和 a_n^(h) 是否存在相同的指數部分 b^n
		return Object.keys(this.expExtraPow).length > 0;
	}
	
	mlSameBaseInHomog() { // 由於 "..." 已出現在 a_n^(h) 之中 (latex)
		let arr_baseLatex = [];
		for (const [s_frac_b, extraPow] of Object.entries(this.expExtraPow)) {
			for (let i = 0; i < extraPow; i++) {
				arr_baseLatex.push(ml.term(ml.term(1, "n", i), SolveNonHomog.mlExponential(s_frac_b), 1));
			}
		}
		return arr_baseLatex.join("~,~");
	}
	
	mlSameBaseInParticular() { // ，若特解與 a_n^(p) 也包含同樣項次 "..." 會導致與齊次解重疊 (latex)
		return Object.keys(this.expExtraPow).map(s_frac_b => {
			return ml.term(`p_{${this.pjIndex[s_frac_b][0]}}`, SolveNonHomog.mlExponential(s_frac_b), 1);
		}).join("~,~");
	}
	
	mlChangeList() { // 為了保證特解與齊次解的線性獨立性，需要將 "(p1 + p2n) b^n" 設為 "(p1n^2 + p2n^3) b^n". (齊次解有二重根 b 的情況)
		return Object.entries(this.expExtraPow).map(([s_frac_b, extraPow]) => {
			return [this.mlExpTerm(s_frac_b, true), this.mlExpTerm(s_frac_b, true, extraPow)];
		});
	}
	
	mlNewParticularForm() { // 因此特解的形式為: "a_n^(p) = (p1 + p2n + ...) b^n + ..." (已乘額外的 n^p)
		const mt = new MultiTerm();
		Object.keys(this.combinedExpFunc).forEach(s_frac_b => {
			const extraPow = this.expExtraPow[s_frac_b] ?? 0; // 為保持特解的線性獨立性, 額外乘上去的 n^p
			mt.push(this.mlExpTerm(s_frac_b, true, extraPow));
		});
		return `a_n^{(p)} = ${mt.toLatex()}`;
	}
	
	mlParticularIntoRecur() { // 將 a_n^(p) 代入原遞迴關係: "a_n^(p) = r1 a_{n-1}^(p) + ... + F(n), n >= ?" (latex)
		const mt = new MultiTerm();
		this.recurCoef.forEach((frac_coef, i) => mt.pushTerm(frac_coef, `a_{n-${i+1}}^{(p)}`, 1)); // "r1 a_{n-1}^(p) + ..." (latex)
		mt.push("F(n)"); // "r1 a_{n-1}^(p) + ... + F(n)" (latex)
		return `a_n^{(p)} = ${mt.toLatex()} ~,~~ n \\ge ${this.recurCoef.length}`; // 加上遞迴限制 ", n >= ?" , ? 應等於遞迴階數
	}
	
	mlParticularIntoRecurTrans() { // 移項後得到: "a_n^(p) - r1 a_{n-1}^(p) - ... = F(n), n >= ?" (latex)
		const mt = new MultiTerm().push("a_n^{(p)}"); // "a_n^(p)" (latex)
		this.recurCoef.forEach((frac_coef, i) => mt.pushTerm(frac_coef.mul(-1), `a_{n-${i+1}}^{(p)}`, 1)); // "a_n^(p) - r1 a_{n-1}^(p) - ..." (latex)
		return `${mt.toLatex()} = F(n) ~,~~ n \\ge ${this.recurCoef.length}`; // 加上遞迴限制 ", n >= ?" , ? 應等於遞迴階數
	}
	
	mlParticularIntoRecurWhere() { // 其中 ... (latex)
		let s_latex = `${this.mlNewParticularForm()} \\\\ F(n) = ${this.mlCombinedExpFunc()}`;
		return `\\begin{cases} ${s_latex} \\end{cases}`;
	}
	
	mlParticular() { // 將 p_j 代回 a_n^(p), 得到特解為 "..." (latex)
		const mt = new MultiTerm();
		for (const [s_frac_b, expPoly] of Object.entries(this.particular)) {
			const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b
			expPoly.forEach((frac_pj, k) => {
				mt.pushTerm(ml.term(frac_pj, "n", k), frac_b, "n");
			});
		}
		return `a_n^{(p)} = ${mt.toLatex()}`;
	}
	
	getFn(n) { // 將 n 帶入非齊次部分 F(n), 回傳有理數
		return Frac.sum(
			Object.entries(this.combinedExpFunc).map(([s_frac_b, expPoly]) => { // 將所有 (...) b^n 項加起來, 會變成 a_n^(p)
				const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b
				return Frac.sum(expPoly.map((frac_pj, k) => frac_pj.mul(n**k))).mul(frac_b.pow(n)); // (p1 + p2 n + p3 n^2 + ...) b^n
			})
		);
	}
	
	getAnp(n) { // 將 n 代入特解 a_n^(p), 回傳有理數
		return Frac.sum(
			Object.entries(this.particular).map(([s_frac_b, expPoly]) => { // 將所有 (...) b^n 項加起來, 會變成 a_n^(p)
				const frac_b = Frac.fromStr(s_frac_b); // b^n 的 b
				return Frac.sum(expPoly.map((frac_pj, k) => frac_pj.mul(n**k))).mul(frac_b.pow(n)); // (p1 + p2 n + p3 n^2 + ...) b^n
			})
		);
	}
}

export class SolveNonHomogExp { // 計算特解當中某個指數部分對應的未知係數, 並生成計算過程
	static initPjLinearEquationsFromAnp(order, frac_b, pjNum, extraPow) { // 將自然數 n 代入 a_n^(p), 得到 p_j 的線性組合
		return new Matrix(pjNum + order, pjNum, (n, i) => F(n ** (i + extraPow)).mul(frac_b.pow(n)));
	}
	
	static initPjLinearEquations(recurCoef, order, pjNum, matrix_pjLEfromAnp) { // 生成 p_j 的線性方程組 (方陣)
		const matrix_anpLE = new Matrix(pjNum, pjNum + order, (i, j) => {
			for (const [k, frac_coef] of recurCoef.entries()) if (j - i === order - 1 - k) return frac_coef.mul(-1);
			if (i + order === j) return 1;
			return 0;
		});
		return matrix_anpLE.mul(matrix_pjLEfromAnp);
	}
	
	static initFn(order, frac_b, expPoly, pjNum) { // 將常數代入非齊次部分 F(n)
		const f = (n) => Frac.sum(expPoly.map((frac_c, i) => frac_c.mul(n**i))).mul(frac_b.pow(n)); // 非齊次部分 F(n) 代入 n 的結果: (c0 + c1 n + c2 n^2 + ...) b^n
		return new Matrix(pjNum, 1, i => f(i + order));
	}
	
	static solvePj(matrix_pjLE, matrix_fn) { // 解聯立求 p_j
		return matrix_pjLE.inverse().mul(matrix_fn).arr.map(row => row[0].nf_a);
	}
	
	constructor(nonHomog, recurCoef, s_frac_b, expPoly, extraPow, startPj) {
		this.nonHomog = nonHomog; // SolveNonHomog ; 因為要用 .mlExpTerm
		this.recurCoef = recurCoef; // Array<Frac> ; 齊次部分的係數
		this.order = recurCoef.length; // 1|2|3 ; 遞迴階數
		this.s_frac_b = s_frac_b; // Frac ; b^n 的 b
		this.pjNum = expPoly.length; // int>=1 ; 未知係數的數量, 一定跟多項式次數相同
		this.extraPow = extraPow; // int>=0 ; 多乘的 n^k 保證線性獨立
		this.startPj = startPj; // int>=1 ; 指數項 b^n 的多個未知係數的開始編號
		this.matrix_pjLEfromAnp = SolveNonHomogExp.initPjLinearEquationsFromAnp( // Matrix ; a_n^(p) 以 p_j 表示的線性關係
			this.order, Frac.fromStr(s_frac_b), this.pjNum, extraPow
		);
		this.matrix_pjLE = SolveNonHomogExp.initPjLinearEquations( // Matrix ; p_j 的線性方程組 (方陣)
			recurCoef, this.order, this.pjNum, this.matrix_pjLEfromAnp
		);
		this.matrix_fn = SolveNonHomogExp.initFn( // Matrix ; 將常數代入非齊次部分 F(n) 得到的值
			this.order, Frac.fromStr(s_frac_b), expPoly, this.pjNum
		);
		this.pjAnswer = SolveNonHomogExp.solvePj(this.matrix_pjLE, this.matrix_fn); // Array<Frac> ; 未知係數 p_j 的解
	}
	
	mlExp() { // 計算 a_n^(p) 之中, 指數項 "{b_i}^n" ... (latex)
		return SolveNonHomog.mlExponential(this.s_frac_b);
	}
	
	mlUnknownPj() { // 對應的 ? 個未知係數 "p_j, ... , p_{j+l-1}" (latex)
		const startPj = this.startPj;
		if (this.pjNum === 1) return `p_{${startPj}}`;
		if (this.pjNum === 2) return `p_{${startPj}} ~,~ p_{${startPj + 1}}`;
		if (this.pjNum >= 3) return `p_{${startPj}} ~,~ \\cdots ,~ p_{${startPj + this.pjNum - 1}}`;
	}
	
	mlNRange() { // 需要將 "n = ? ~ ?" 代入式 (1), 產生... (latex)
		let s_latex = `n = ${this.order}`;
		if (this.pjNum >= 2) s_latex += `\\sim ${this.order + this.pjNum - 1}`;
		return s_latex;
	}
	
	mlParticularLinearEquations() { // 產生 ? 個式子的線性方程組，並解聯立："..." (latex)
		let s_latex = Array.from({ length: this.pjNum }, (_, a) => this.order + a).map(n => { // 將 n = ? ~ ? 代入式 (1)
			const mt = new MultiTerm().push(`a_{${n}}^{(p)}`);
			this.recurCoef.forEach((frac_coef, i) => {
				mt.pushTerm(frac_coef.mul(-1), `a_{${n-1-i}}^{(p)}`, 1);
			});
			return `${mt.toLatex()} = F(${n})`; // "a_n^{(p)} - h_1 a_{n-1}^{(p)} - h_2 a_{n-2}^{(p)} - h_3 a_{n-3}^{(p)} = F(n)" (latex)
		}).join("\\\\"); // 以換行符連接所有的式子
		return `\\begin{cases} ${s_latex} \\end{cases}`; // 加上聯立方程式的 latex 對齊規則
	}
	
	mlExpTermInNonHomog() { // 其中 "F(n) = ..." (latex)
		return `F(n) = ${this.nonHomog.mlExpTerm(this.s_frac_b, false)}`;
	}
	
	mlExpTermInParticular() { // ", a_n^(p) = (p1 n^k + ...) b^n"，代入常數後得到：
		return `a_n^{(p)} = ${this.nonHomog.mlExpTerm(this.s_frac_b, true, this.extraPow)}`;
	}
	
	mlPjLinearEquationsFromAnp() { // 代入常數後得到："..." (latex)
		return ml.equationSystem(
			this.order + this.pjNum,
			this.pjNum,
			(n, i) => this.matrix_pjLEfromAnp.arr[n][i].nf_a,
			(n, i) => `p_{${this.startPj + i}}`,
			n => `a_{${n}}^{(p)}`,
			"left"
		);
	}
	
	mlPjLinearEquations() { // 展開後得到："p_j 的線性聯立方程式" (latex)
		return ml.equationSystem(
			this.pjNum,
			this.pjNum,
			(i, j) => this.matrix_pjLE.arr[i][j].nf_a,
			(i, j) => `p_{${this.startPj + j}}`,
			i => this.matrix_fn.arr[i][0].nf_a.toLatex(),
			"right"
		);
	}
	
	mlPjAnswer() { // 使用高斯消去法解 p_j 的聯立方程式，得到: "p_j 的解" (latex)
		return this.pjAnswer.map(
			(frac_pj, i) => `p_{${this.startPj + i}} = ${frac_pj.toLatex()}`
		).join("~,~~");
	}
}

function throwErr(methodName, errMessage) {
	throw new Error(`[Recur][${methodName}] ${errMessage}`);
}
