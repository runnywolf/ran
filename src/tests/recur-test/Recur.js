import { F, Hop } from "ran-math";
import { MakeLatex as ml, MultiTerm } from "ran-math";

export class SolveRecur { // 計算遞迴式的一般項, 並生成計算過程
	constructor(recurCoef, nonHomoFunc, initConst) {
		this._checkParam(recurCoef, nonHomoFunc, initConst); // 檢查參數型態
		[this.recurCoef, this.nonHomoFunc, this.initConst] = this._initRecur(recurCoef, nonHomoFunc, initConst); // 整理遞迴式的參數
		this.order = this.recurCoef.length; // 遞迴階數
	}
	
	_checkParam(recurCoef, nonHomoFunc, initConst) { // 檢查參數型態
		if (!Array.isArray(recurCoef) || recurCoef.some(coef => !Hop.isRational(coef))) { // 齊次部分的係數必須都是 Frac | int number
			throwErr("SolveRecur.constructor", 'Param "recurCoef" must be an Array<int|Frac> .');
		}
		if (!(1 <= recurCoef.length && recurCoef.length <= 3)) { // 只能計算 1 ~ 3 階遞迴
			throwErr("SolveRecur.constructor", "Only support 1 ~ 3 order recurrence relation.");
		}
		if (!Array.isArray(nonHomoFunc) || nonHomoFunc.some(term => !Array.isArray(term))) {
			throwErr("SolveRecur.constructor", 'Param "nonHomoFunc" must be an Array<[ int|Frac, int>=0, int|Frac ]> .');
		}
		if (nonHomoFunc.some(term => !Hop.isRational(term[0]) || Hop.isNegInt(term[1]) || !Hop.isRational(term[2]))) {
			throwErr("SolveRecur.constructor", 'Param "nonHomoFunc" must be an Array<[ int|Frac, int>=0, int|Frac ]> .');
		}
		if (!Array.isArray(initConst) || initConst.some(c => !Hop.isRational(c))) { // 遞迴的初始條件必須都是 Frac | int number
			throwErr("SolveRecur.constructor", 'Param "initConst" must be an Array<int|Frac> .');
		}
	}
	
	_initRecur(recurCoef, nonHomoFunc, initConst) { // 整理遞迴式的參數, 以及將 int 轉型為 Frac
		const order = recurCoef.length; // 遞迴階數
		
		recurCoef = recurCoef.map(nf_coef => F(0).add(nf_coef)); // 利用 frac.add 將 int number 轉為 Frac, 保證 recurCoef 為 Array<Frac>
		
		nonHomoFunc = nonHomoFunc.map(([nf_c, k, nf_b]) => [F(0).add(nf_c), k, F(0).add(nf_b)]); // 保證 initConst 為 Array<[Frac, int, Frac]>
		
		initConst = initConst.map(nf_coef => F(0).add(nf_coef)); // 保證 initConst 為 Array<Frac>
		initConst = initConst.slice(0, order); // 使 initConst 的長度與 recurCoef 一致, 不足的部分補 F(0)
		while (initConst.length < order) initConst.push(F(0));
		
		return [recurCoef, nonHomoFunc, initConst];
	}
	
	_mlRecurHomog() { // 生成 遞迴的齊次部分 "r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}"
		const mt = new MultiTerm();
		this.recurCoef.forEach((frac_coef, i) => mt.pushTerm(frac_coef, `a_{n-${i+1}}`, 1));
		return mt.toLatex();
	}
	
	_mlRecurNonHomog() { // 生成 遞迴的非齊次部分 "c n^k b^n + ..."
		const mt = new MultiTerm();
		this.nonHomoFunc.forEach(([frac_c, k, frac_b]) => { // 非齊次的 frac_c n^k (frac_b)^n 項會表示為 [ [frac_c, k, frac_b], ... ]
			let s_term = ml.term(frac_c, "n", k); // c n^k 部分的 latex 字串
			if (!frac_b.equal(1)) s_term = ml.term(s_term, frac_b, "n"); // 若 b^n 部分不為 1^n , 擴展為 c n^k b^n
			mt.push(s_term);
		});
		return mt.toLatex();
	}
	
	mlRecur() { // 生成遞迴關係式的 latex 字串
		const mt = new MultiTerm().push(this._mlRecurHomog()).push(this._mlRecurNonHomog()); // "齊次部分 + 非齊次部分" (latex)
		let s_latex = `a_n = ${mt.toLatex()} ${ml.sc} n \\ge ${this.order} \\\\ `; // "a_n = 齊次部分 + 非齊次部分 , n >= ?" ; ? 應等於遞迴階數
		s_latex += this.initConst.map((frac_c, i) => `a_${i}=${frac_c.toLatex()}`).join(ml.sc); // 遞迴初始條件: "a_0 = ? , a_1 = ? , a_2 = ?" (latex)
		return `\\begin{gather*} ${s_latex} \\end{gather*}`; // 使 latex 置中的語法
	}
	
	mlRecurHomogEquation() { // 生成 "a_n = r_1 a_{n-1} + r_2 a_{n-2} + r_3 a_{n-3}"
		return `a_n = ${this._mlRecurHomog()}`;
	}
}

export class SolveNonHomog { // 計算遞迴式的特解, 並生成計算過程
	
}

export class SolveNonHomogExp { // 計算特解當中某個指數部分對應的未知係數, 並生成計算過程
	
}

function throwErr(methodName, errMessage) {
	throw new Error(`[Recur][${methodName}] ${errMessage}`);
}
