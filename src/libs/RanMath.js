import { removePrefix, removePostfix } from "./StringTool";

export function isNum(n) { // 是否為數字
	return typeof n === "number";
}

export function isInt(n) { // 是否為整數
	return Number.isInteger(n);
}

export function gcd(a, b) { // 最大公因數; gcd(0, 0) = 0
	if (!isInt(a) || !isInt(b)) { // 如果 a, b 不是整數, 回傳 NaN
		throwErr("gcd", 'Param "a" & "b" must be a integer.');
		return NaN;
	}
	
	[a, b] = [Math.abs(a), Math.abs(b)];
	while (b != 0) [a, b] = [b, a % b];
	return a;
}

export function lcm(a, b) { // 最小公倍數; lcm(0, 0) = 0
	if (!isInt(a) || !isInt(b)) { // 如果 a, b 不是整數, 回傳 NaN
		throwErr("lcm", 'Param "a" & "b" must be a integer.');
		return NaN;
	}
	
	if (a === 0 || b === 0) return 0;
	return Math.abs(a * b) / gcd(a, b);
}

export function getFactors(n) { // 回傳 n 的因數 array (升序排列)
	if (!isInt(n)) { // 如果 n 不是整數, 回傳 []
		throwErr("getFactors", 'Param "n" must be a integer.');
		return [];
	}
	
	n = Math.abs(n); // 將負數 n 轉正
	let factors1 = []; // n 的因數 ( <= √n )
	let factors2 = []; // n 的因數 ( > √n )
	for (let i = 1; i*i <= n; i++) if (n % i === 0) {
		factors1.push(i);
		if (i*i != n) factors2.unshift(n / i);
	}
	return [...factors1, ...factors2];
}

export function getSquareFactor(n) { // 若 k^2 為 n 的最大平方因數, 回傳 k
	if (!isInt(n)) { // 如果 n 不是整數, 回傳 NaN
		throwErr("getSquareFactor", 'Param "n" must be a integer.');
		return NaN;
	}
	
	n = Math.abs(n); // 將負數 n 轉正
	for (let i = Math.floor(Math.sqrt(n)); i >= 1; i--) {
		if (n % (i*i) === 0) return i;
	}
	return 1; // 若 n = 0, 回傳 1
}

export function getRandomInt(min, max) { // 隨機整數
	if (!isInt(min) || !isInt(max)) { // 如果 min 或 max 不是整數, 回傳 NaN
		throwErr("getRandomInt", 'Param "min" & "max" must be a integer.');
		return NaN;
	}
	
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sum(...arr) { // 將 type number 加總
	return _makeSum(arr, isNum, 0, (n1, n2) => n1 + n2, "sum");
}

export function _makeSum(arr, isInSet, zero, addOp, funcName) { // 自訂加總
	return arr.flat(Infinity).reduce((acc, element) => { // 扁平化至 1 層 array
		if (!isInSet(element)) { // 如果元素不在集合內, 忽略這個元素
			throwErr(funcName, `Array element (${element}) is not in set.`);
			return acc;
		}
		return addOp(acc, element); // 如果加法運算有封閉性, 累計這個元素
	}, zero);
}

export class Prime { // 質數 (prime number)
	static prime = [2];
	
	static getNth(n) { // 取得第 n 個質數
		if (!isInt(n)) { // 如果 n 不是整數, 回傳 NaN
			throwErr("Prime.getNth", 'Param "n" must be a integer.');
			return NaN;
		}
		
		if (n < 0) return NaN;
		if (n <= Prime.prime.length - 1) return Prime.prime[n]; // 質數快取
		
		const lastPrime = Prime.prime[Prime.prime.length - 1]; // 最後一個質數
		for (let i = lastPrime + 1; n > Prime.prime.length - 1; i++) {
			if (Prime.isPrime(i)) Prime.prime.push(i);
		}
		return Prime.prime[n];
	}
	
	static isPrime(n) { // 是否是質數
		if (!isInt(n)) { // 如果 n 不是整數, 回傳 false
			throwErr("Prime.isPrime", 'Param "n" must be a integer.');
			return false;
		}
		
		if (n <= 1) return false;
		for (let i = 0, p = 2; p*p <= n; p = Prime.getNth(++i)) if (n % p === 0) return false;
		return true;
	}
}

export class Frac { // 分數 (Fraction)
	static isFrac(value) { // 檢查 value 是否為 Frac 實例
		return value instanceof Frac;
	}
	
	static fromStr(str) { // 將字串轉為分數
		if (typeof str !== "string") return F(0); // 若 str 不是字串, 回傳 0
		
		const numArr = str.split("/").map(s => Number(s)); // 將 "/" 符號切分, 並將切割後的數個字串轉為數字
		if (numArr.some(n => !isInt(n))) return F(0); // 若字串某個部份不是整數, 回傳 0
		
		if (numArr.length === 1) return F(numArr[0]); // 輸入整數 (str 有 0 個 "/", 被切分成 1 個部份)
		if (numArr.length === 2) return F(numArr[0], numArr[1]); // 輸入分數 (str 有 1 個 "/", 被切分成 2 個部份)
		return F(0); // 若 str 不是整數或分數, 回傳 0
	}
	
	static sum(...arr) { // 加總
		const setDef = (nf) => Frac.isFrac(nf) || isInt(nf); // arr 內的元素只能是 Frac 或 int number (集合定義)
		const addOp = (frac, nf) => frac.add(nf); // 加法運算子
		return _makeSum(arr, setDef, F(0), addOp, "Frac.sum");
	}
	
	constructor(n = 0, d = 1) {
		if (!isInt(n) || !isInt(d)) { // 如果參數 n 或 d 不是整數, 會建構一個 F(0)
			throwErr("Frac.constructor", 'Param "n" & "d" must be a integer.');
			n = 0; d = 1;
		}
		if (d === 0) { // 分母為 0, 會建構一個 F(0)
			throwErr("Frac.constructor", "The denominator cannot be 0.");
			n = 0; d = 1;
		}
		
		// 標準化
		if (d < 0) [n, d] = [-n, -d]; // 若分母為負數, 將 n 和 d 同乘 -1, 保證 d ∈ Z+
		
		const ndGcd = gcd(n, d); // 因為 n, d 不可能同時為 0, 所以 gcd(n, d) 不可能為 0
		[n, d] = [n / ndGcd, d / ndGcd]; // 約分 (會把 0/? 變成 0/1)
		
		if (n === 0) n = 0; // 去除 -0
		// 標準化
		
		this.n = n; // 分子
		this.d = d; // 分母
	}
	
	copy() { // 複製
		return F(this.n, this.d);
	}
	
	isZero() { // 是否為 0
		return this.n === 0;
	}
	
	isInt() { // 是否是整數
		return this.d === 1;
	}
	
	toStr() { // 轉為字串
		if (this.isInt()) return `${this.n}`; // 整數形式
		return `${this.n}/${this.d}`; // 分數形式
	}
	
	toLatex() { // 轉為 latex 字串
		if (this.isInt()) return `${this.n}`; // 整數形式
		return `\\frac{${this.n}}{${this.d}}`; // 分數形式
	}
	
	toFloat() { // 轉為浮點數
		return this.n / this.d;
	}
	
	_makeOp(nf, opName, op, errReturn = undefined) { // 自訂運算子
		if (isInt(nf)) nf = F(nf); // 將 int 轉為 Frac
		
		if (!Frac.isFrac(nf)) { // 第二個運算元必須是 Frac / int
			throwErr(`Frac.${opName}`, 'Param "nf" must be a Frac or int.');
			return (errReturn === undefined) ? this : errReturn; // 如果 errReturn 沒有傳值, 回傳 this (不執行這個運算)
		}
		
		return op(this, nf); // 執行運算
	}
	
	static _ADD_OP = (f1, f2) => F(f1.n * f2.d + f1.d * f2.n, f1.d * f2.d);
	add(nf) { // 加法
		return this._makeOp(nf, "add", Frac._ADD_OP);
	}
	
	static _SUB_OP = (f1, f2) => F(f1.n * f2.d - f1.d * f2.n, f1.d * f2.d);
	sub(nf) { // 減法
		return this._makeOp(nf, "sub", Frac._SUB_OP);
	}
	
	static _MUL_OP = (f1, f2) => F(f1.n * f2.n, f1.d * f2.d);
	mul(nf) { // 乘法
		return this._makeOp(nf, "mul", Frac._MUL_OP);
	}
	
	static _DIV_OP = (f1, f2) => {
		if (f2.isZero()) { // f1/f2 發生除零錯誤
			throwErr("Frac.div", "Div 0 error.");
			return f1; // 回傳 this (不執行這個運算)
		}
		return F(f1.n * f2.d, f1.d * f2.n);
	};
	div(nf) { // 除法
		return this._makeOp(nf, "div", Frac._DIV_OP);
	}
	
	static _POW_OP = (f1, f2) => {
		const rootOfF1n = Math.round(f1.n ** (1 / f2.d)); // 先計算 (f1.n/f1.d) ^ (1/f2.d)
		const rootOfF1d = Math.round(f1.d ** (1 / f2.d));
		if (rootOfF1n ** f2.d !== f1.n || rootOfF1d ** f2.d !== f1.d) { // 驗證 f1 ^ (1/f2.d) 是否仍是有理數
			return f1.toFloat() ** f2.toFloat(); // 如果不是, 回傳浮點數結果
		}
		
		if (f2.n >= 0) return F(rootOfF1n ** f2.n, rootOfF1d ** f2.n); // 正數次方
		
		if (f1.isZero()) { // error: 0 ^ 負數
			throwErr("Frac.pow", "0^-n is undefined.");
			return f1; // 回傳 this (不執行這個運算)
		}
		return F(rootOfF1d ** -f2.n, rootOfF1n ** -f2.n); // 負數次方 -> 交換分子分母
	};
	pow(nf) { // 次方
		return this._makeOp(nf, "pow", Frac._POW_OP);
	}
	
	static _EQUAL_OP = (f1, f2) => f1.n === f2.n && f1.d === f2.d;
	equal(nf) { // 比較兩個分數是否相同
		return this._makeOp(nf, "equal", Frac._EQUAL_OP, false);
	}
	
	static _LT_OP = (f1, f2) => f1.n * f2.d < f1.d * f2.n;
	lt(nf) { // 小於: this < nf
		return this._makeOp(nf, "lt", Frac._LT_OP, false);
	}
}

export class Hop { // Frac 和 number (int, float) 混合運算 (Hybrid OPeration)
	static isNumOrFrac(value) {  // 檢查 value 是否為 number 或 Frac (Hop 的合法運算元)
		return isNum(value) || Frac.isFrac(value);
	}
	
	static _makeOp(arr_nf, fracOp, floatOp, errReturn = NaN) { // 定義 n 個運算元的 number|Frac 混合運算子
		arr_nf.forEach((nf, i, arr) => { if (isInt(nf)) arr[i] = F(nf); });
		if (arr_nf.every(nf => Frac.isFrac(nf))) return fracOp(...arr_nf);
		arr_nf.forEach((nf, i, arr) => { if (Frac.isFrac(nf)) arr[i] = nf.toFloat(); });
		if (arr_nf.every(nf => isNum(nf))) return floatOp(...arr_nf);
		return errReturn;
	}
	
	static _Z_FRAC_OP = frac => frac.isInt();
	static _FALSE_OP = () => false; // 浮點數必不為 Z, Z+, Z-, Q
	static isInt(nf) { // 是否為整數 (Z). 如果 nf 不是 Frac/number 會回傳 false
		return Hop._makeOp([nf], Hop._Z_FRAC_OP, Hop._FALSE_OP, false);
	}
	
	static _ZP_FRAC_OP = frac => frac.isInt() && F(0).lt(frac); // int & (0 < n)
	static isPosInt(nf) { // 是否為正整數 1, 2, ... (Z+). 如果 nf 不是 Frac/number 會回傳 false
		return Hop._makeOp([nf], Hop._ZP_FRAC_OP, Hop._FALSE_OP, false);
	}
	
	static _ZN_FRAC_OP = frac => frac.isInt() && frac.lt(0) // int & (n < 0)
	static isNegInt(nf) { // 是否為負整數 1, 2, ... (Z-). 如果 nf 不是 Frac/number 會回傳 false
		return Hop._makeOp([nf], Hop._ZN_FRAC_OP, Hop._FALSE_OP, false);
	}
	
	static _Q_FRAC_OP = frac => true; // int number 會自動轉為 Frac, 而 Frac 必為有理數. (不考慮浮點有理數)
	static isRational(nf) { // 是否為有理數 (Q). 如果 nf 不是 Frac/number 會回傳 false
		return Hop._makeOp([nf], Hop._Q_FRAC_OP, Hop._FALSE_OP, false);
	}
	
	static _STR_FRAC_OP = frac => frac.toStr();
	static _STR_FLOAT_OP = p => (n => n.toFixed(p));
	static toStr(nf, p = 4) { // 轉 debug 字串. 如果 nf 不是 Frac/number 會回傳 "?"
		return Hop._makeOp([nf], Hop._STR_FRAC_OP, Hop._STR_FLOAT_OP(p), "?");
	}
	
	static _LATEX_FRAC_OP = frac => frac.toLatex();
	static toLatex(nf, p = 4) { // 轉 latex 語法. 如果 nf 不是 Frac/number 會回傳 "?"
		return Hop._makeOp([nf], Hop._LATEX_FRAC_OP, Hop._STR_FLOAT_OP(p), "?");
	}
	
	static _ADD_FLOAT_OP = (n1, n2) => n1 + n2;
	static add(nf1, nf2) { // 加法
		return Hop._makeOp([nf1, nf2], Frac._ADD_OP, Hop._ADD_FLOAT_OP); // Frac._*_OP 已定義 7 個運算子, 不須重新宣告 (v0.3.3-dev.2)
	}
	
	static _SUB_FLOAT_OP = (n1, n2) => n1 - n2;
	static sub(nf1, nf2) { // 加法
		return Hop._makeOp([nf1, nf2], Frac._SUB_OP, Hop._SUB_FLOAT_OP);
	}
	
	static _MUL_FLOAT_OP = (n1, n2) => n1 * n2;
	static mul(nf1, nf2) { // 乘法
		return Hop._makeOp([nf1, nf2], Frac._MUL_OP, Hop._MUL_FLOAT_OP);
	}
	
	static _DIV_FLOAT_OP = (n1, n2) => n1 / n2;
	static div(nf1, nf2) { // 除法
		if (Hop.equal(nf2, 0)) {
			throwErr("Hop.div", "Div 0 error.");
			return NaN;
		}
		return Hop._makeOp([nf1, nf2], Frac._DIV_OP, Hop._DIV_FLOAT_OP);
	}
	
	static _POW_FLOAT_OP = (n1, n2) => n1 ** n2;
	static pow(nf1, nf2) { // 次方
		return Hop._makeOp([nf1, nf2], Frac._POW_OP, Hop._POW_FLOAT_OP);
	}
	
	static _EQUAL_FLOAT_OP = (n1, n2) => n1 === n2;
	static equal(nf1, nf2) { // 等於. 如果 nf1, nf2 其中一個不是數字會回傳 false
		return Hop._makeOp([nf1, nf2], Frac._EQUAL_OP, Hop._EQUAL_FLOAT_OP, false);
	}
	
	static _LT_FLOAT_OP = (n1, n2) => n1 < n2;
	static lt(nf1, nf2) { // 小於. 如果 nf1, nf2 其中一個不是數字會回傳 false
		return Hop._makeOp([nf1, nf2], Frac._LT_OP, Hop._LT_FLOAT_OP, false);
	}
}

export class EF { // Extension Field (a + b√s)
	static isEF(value) {
		return value instanceof EF;
	}
	
	constructor(nf_a = 0, nf_b = 0, nf_s = 0, _skipGetFactor = false) { // a + b√s
		if (!Hop.isNumOrFrac(nf_a)) { // 參數必須為 Frac 或 number
			throwErr("EF.constructor", 'Param "nf_a" must be a Frac or int.');
			nf_a = 0;
		}
		if (!Hop.isNumOrFrac(nf_b)) {
			throwErr("EF.constructor", 'Param "nf_b" must be a Frac or int.');
			nf_b = 0;
		}
		if (!Hop.isNumOrFrac(nf_s)) {
			throwErr("EF.constructor", 'Param "nf_s" must be a Frac or int.');
			nf_s = 0;
		}
		
		// 標準化
		[this.nf_a, this.nf_b, this.s] = Hop._makeOp(
			[nf_a, nf_b, nf_s],
			(frac_a, frac_b, frac_s) => { // 如果 a, b, s 都是 int 或 Frac, 使用整數模式
				let int_s; [frac_b, int_s] = [frac_b.div(frac_s.d), frac_s.n * frac_s.d]; // b√s = b√(n/d) = (b/d)*√(nd) , 使 √ 內為整數
				if (_skipGetFactor) return [frac_a, frac_b, int_s]; // 某些運算不需要化簡 √s (主要是 getSquareFactor 時間複雜度很糟)
				
				const k = getSquareFactor(int_s); // 將 b√s 內的 s 提出整數 k^2
				return [frac_a, frac_b.mul(k), int_s / (k * k)]; // b 乘 k, s 除 k^2
			}, // 如果 a, b, s 其中一個是 float, 使用浮點模式
			(num_a, num_b, num_s) => [num_a, num_b * Math.sqrt(Math.abs(num_s)), num_s > 0 ? 1 : -1] // b√s = (b√|s|)*√(±1)
		); // errReturn 可忽略, 因為參數必為 number|Frac
		
		if (this.s === 1) [this.nf_a, this.nf_b] = [Hop.add(this.nf_a, this.nf_b), F(0)]; // a + b√1 = (a+b) + 0√1
		
		if (Hop.equal(this.nf_b, 0)) this.s = 0; // a + 0√s = a + 0√0
		if (this.s === 0) this.nf_b = F(0); // a + b√0 = a + 0√0
		// 標準化
	}
	
	copy() { // 回傳一個相同值的 EF 實例
		return new EF(this.nf_a, this.nf_b, this.s, true);
	}
	
	toStr() { // 轉 debug 字串
		return `${Hop.toStr(this.nf_a)} + ${Hop.toStr(this.nf_b)} √ ${this.s}`;
	}
	
	toLatex() { // 轉 latex 語法
		if (this.s > 0) { // s > 0, a b 必為 Frac, 化成 (n + m√s) / d 形式
			let n = this.nf_a.n * this.nf_b.d;
			let m = this.nf_b.n * this.nf_a.d;
			let d = this.nf_a.d * this.nf_b.d;
			const nmd_gcd = gcd(gcd(n, m), d); // 約分
			[n, m, d] = [n / nmd_gcd, m / nmd_gcd, d / nmd_gcd];
			
			let s_latex = mlTerm(m, `\\sqrt{${this.s}}`, 1); // m√s
			if (n !== 0) s_latex = `${n}${s_latex}`; // 若 n 不為 0 -> n ± m√s
			if (d !== 1) s_latex = `\\frac{${removePrefix(s_latex, "+")}}{${d}}`; // 若 d 不為 1, 顯示分數 -> (n ± m√s) / d
			return removePrefix(s_latex, "+");
		}
		if (this.s === 0) return Hop.toLatex(this.nf_a); // a + 0√0 -> a (可能為 Frac 或 float)
		
		if (!Frac.isFrac(this.nf_a)) { // s < 0, 浮點複數
			let s_latex = mlTerm(`${this.nf_b.toFixed(4)}`, "i", 1); // 浮點複數, b 必不為 0
			if (this.nf_a !== 0) s_latex = `${this.nf_a.toFixed(4)}${s_latex}`;
			return removePrefix(s_latex, "+");
		}
		
		let s_latex = `${this.nf_b.n}`; // s < 0, 有理複數
		if (this.s !== -1) s_latex = mlTerm(s_latex, `\\sqrt{${-this.s}}`, 1, false); // 若 s 不為 -1, 顯示根號
		if (this.nf_b.d !== 1) s_latex = `\\frac{${s_latex}}{${this.nf_b.d}}`; // 若 d 不為 1, 顯示分數 (分母不能有 +)
		s_latex = mlTerm(s_latex, "i", 1); // ± im i
		if (!this.nf_a.isZero()) s_latex = `${this.nf_a.toLatex()}${s_latex}`; // 若實部不為 0, 變成 re ± im i
		return removePrefix(s_latex, "+"); // re ± im i
	}
	
	real() { // 取出實部
		if (this.s >= 0) return this.copy(); // 純實數
		return new EF(this.nf_a); // s < 0, 回傳實部
	}
	
	imag() { // 取出虛部: if s < 0, (a + b√s) -> (0 + b√-s)
		if (this.s >= 0) return new EF(0); // 純實數沒有虛部
		return new EF(0, this.nf_b, -this.s, true); // 將 s 乘 -1 即可取出虛部
	}
	
	conjugate() { // 共軛: (a + b√s) -> (a + (-b)√s)
		return new EF(this.nf_a, Hop.sub(0, this.nf_b), this.s, true); // b -> -b
	}
	
	normSquare() { // 範數的平方 (回傳 number|Frac): (a + b√s) -> (a^2 - b^2 s)
		return Hop.sub(Hop.mul(this.nf_a, this.nf_a), Hop.mul(Hop.mul(this.nf_b, this.nf_b), this.s));
	}
	
	_makeOp(nfe, opName, op) { // 自訂運算子
		if (isNum(nfe) || Frac.isFrac(nfe)) nfe = new EF(nfe); // 將 number 和 Frac 轉為 EF
		
		if (!EF.isEF(nfe)) { // 第二個運算元必須是 number / Frac / EF
			throwErr(`EF.${opName}`, 'Param "nfe" must be a number | Frac | EF .');
			return this; // 如果 errReturn 沒有傳值, 回傳 this (不執行這個運算)
		}
		if (this.s !== 0 && nfe.s !== 0 && this.s !== nfe.s) { // 如果兩個 fleid 的 √s 不一致, 無法運算 (忽略 s 為 0 的情況)
			throwErr(`EF.${opName}`, "Bases of extension fields differ.");
			return this; // 如果 errReturn 沒有傳值, 回傳 this (不執行這個運算)
		}
		
		const newS = (this.s === 0 ? nfe.s : this.s); // 若兩個 √s 其一不為 0, 運算結果的 √s 必須不為 0
		return op(this, nfe, newS);
	}
	
	static _ADD_OP = (ef1, ef2, newS) => new EF( // (A + B√s) + (a + b√s) = (A+a) + (B+b) √s
		Hop.add(ef1.nf_a, ef2.nf_a),
		Hop.add(ef1.nf_b, ef2.nf_b),
		newS, true
	);
	add(nfe) { // 加法: (A + B√s) + (a + b√s)
		return this._makeOp(nfe, "add", EF._ADD_OP);
	}
	
	static _SUB_OP = (ef1, ef2, newS) => new EF( // (A + B√s) - (a + b√s) = (A-a) + (B-b) √s
		Hop.sub(ef1.nf_a, ef2.nf_a),
		Hop.sub(ef1.nf_b, ef2.nf_b),
		newS, true
	);
	sub(nfe) { // 減法: (A + B√s) - (a + b√s)
		return this._makeOp(nfe, "sub", EF._SUB_OP);
	}
	
	static _MUL_OP = (ef1, ef2, newS) => new EF( // (A + B√s) * (a + b√s) = (Aa+Bbs) + (Ab+Ba) √s
		Hop.add(Hop.mul(ef1.nf_a, ef2.nf_a), Hop.mul(Hop.mul(ef1.nf_b, ef2.nf_b), newS)),
		Hop.add(Hop.mul(ef1.nf_a, ef2.nf_b), Hop.mul(ef1.nf_b, ef2.nf_a)),
		newS, true
	);
	mul(nfe) { // 乘法: (A + B√s) * (a + b√s)
		return this._makeOp(nfe, "mul", EF._MUL_OP);
	}
	
	static _DIV_OP = (ef1, ef2, newS) => { // (A + B√s) / (a + b√s) = (A + B√s)*(a - b√s) / (a^2 - b^2 s)
		const norm = ef2.normSquare(); // (a^2 - b^2 s)
		if (Hop.equal(norm, 0)) { // 除 0 錯誤
			throwErr("EF.div", "Div 0 error.");
			return ef1; // 回傳 this (不執行這個運算)
		}
		
		let ef_div = ef1.mul(ef2.conjugate()); // (A + B√s)*(a - b√s)
		return new EF(Hop.div(ef_div.nf_a, norm), Hop.div(ef_div.nf_b, norm), newS, true); // a, b 同除 norm^2
	};
	div(nfe) { // 除法: (A + B√s) / (a + b√s)
		return this._makeOp(nfe, "div", EF._DIV_OP);
	}
	
	pow(i) { // 整數次方: (a + b√s) ^ i
		if (!isInt(i)) { // error: 非整數次方
			throwErr("EF.pow", "Power must be an int number.");
			return this; // 回傳 this (不執行這個運算)
		}
		
		if (i >= 1) { // (a + b√s)^i = (a + b√s)^(i/2)^2 * (a + b√s)^(i%2)
			const ef_halfPow = this.pow(i >> 1);
			return ef_halfPow.mul(ef_halfPow).mul(i % 2 ? this : 1);
		}
		if (i === 0) return new EF(1); // (a + b√s)^0 = 1
		
		// i <= -1
		if (Hop.equal(this.normSquare(), 0)) { // error: 0 ^ 負數
			throwErr("EF.pow", "0^-i is undefined.");
			return this; // 回傳 this (不執行這個運算)
		}
		return new EF(1).div(this.pow(-i)); // (a + b√s)^(-i) = 1/[(a + b√s)^i]
	}
	
	equal(nfe) { // 等於
		if (isNum(nfe) || Frac.isFrac(nfe)) nfe = new EF(nfe); // 將 number 和 Frac 轉為 EF
		
		if (!EF.isEF(nfe)) return false; // 第二個運算元必須是 number / Frac / EF, 否則回傳 false
		if (!Hop.equal(this.nf_a, nfe.nf_a)) return false;
		if (!Hop.equal(this.nf_b, nfe.nf_b)) return false;
		if (this.s !== nfe.s) return false;
		return true;
	}
}

export class _Matrix { // 矩陣
	// 列運算
}

export class Matrix { // 矩陣
	static isMatrix(arr, err = false) { // 檢查 arr 是否是合法矩陣. 若 arr 不是矩陣, err 會決定要不要報錯
		if (!Array.isArray(arr)) { // 如果 A 不是 Array
			if (err) throwErr("Matrix.isMatrix", "Variable arr is not an Array.");
			return false;
		}
		
		for (const [i, rowI] of arr.entries()) { // 檢查矩陣內是否存在非 Frac 或 Number 的元素
			if (!Array.isArray(rowI)) { // 如果 row 不是 Array
				if (err) throwErr("Matrix.isMatrix", `Element arr[${i}] is not an Array.`);
				return false;
			}
			for (const [j, Aij] of rowI.entries()) {
				if (!Frac.isFrac(Aij) && !isNum(Aij)) {
					if (err) throwErr("Matrix.isMatrix", `Element arr[${i}][${j}] = ${Aij} is not a number.`);
					return false;
				}
			}
		}
		
		const rowsLength = arr.map(rowI => rowI.length); // 每個 row 的元素個數
		if (!rowsLength.every(rowL => rowL === rowsLength[0])) { // 若存在兩個 row 的元素個數不相同
			if (err) throwErr("Matrix.isMatrix", "The rows in the arr have inconsistent lengths.");
			return false;
		}
		if (rowsLength.length === 0 || rowsLength[0] === 0) { // arr 不可以是 ?*0 矩陣
			if (err) throwErr("Matrix.isMatrix", "arr is a ?*0 matrix.");
			return false;
		}
		return true;
	}
	
	static create(n, m, element = null) { // 生成一個元素全為 element 的 n*m 矩陣, 不傳入 element 會將元素設為 Frac(0)
		if (!(Number.isInteger(n) && n >= 1 && Number.isInteger(m) && m >= 1)) { // n, m 必須是正整數
			throwErr("Matrix.create", "Matrix size n & m must be a positive integer.")
			return new Matrix(null);
		}
		
		const arr = Array.from({ length: n }, () => Array.from({ length: m }, () => {
			if (Frac.isFrac(element)) return new Frac(element.n, element.d); // 如果元素是 Frac
			if (typeof element === "number") return element; // 如果元素是 Number
			return new Frac(0); // 元素的預設值為 Frac(0)
		}));
		return new Matrix(arr);
	}
	
	static createI(n) { // 生成單位矩陣
		if (!(Number.isInteger(n) && n >= 1)) { // n 必須是正整數
			throwErr("Matrix.create", "Matrix size n must be a positive integer.")
			return new Matrix(null);
		}
		
		const arr = Array.from(
			{ length: n },
			(_, i) => Array.from({ length: n }, (_, j) => new Frac(i == j ? 1 : 0))
		);
		return new Matrix(arr);
	}
	
	constructor(arr, copy = false) {
		this.A = arr;
		if (!Matrix.isMatrix(arr, true)) this.A = null; // null 代表非矩陣
		else if (copy) { // deep copy
			this.A = arr.map(row => row.map(Aij => Frac.isFrac(Aij) ? new Frac(Aij.n, Aij.d) : Aij));
		}
		
		this.n = this.A ? this.A.length : 0; // n*m 矩陣, 只有在非矩陣情況下為 0
		this.m = this.A ? this.A[0].length : 0;
	}
	
	toStr() { // 轉 debug 字串
		// todo
	}
	
	mul(M) { // 矩陣乘法
		if (!this.A || !Matrix.isMatrix(M?.A)) { // 自身或參數不為 Matrix 或 null Matrix
			throwErr("Matrix.mul", "Input or self is not a vaild Matrix.");
			return new Matrix(null);
		}
		if (this.m !== M.n) { // 只有 n*m 跟 m*p 矩陣才能相乘
			throwErr("Matrix.mul", "Only an n*m matrix can be multiplied by an m*p matrix.");
			return new Matrix(null);
		}
		
		let arr = Array.from({ length: this.n }, (_, i) => Array.from({ length: M.m }, (_, j) => {
			let fn_sum = new Frac(0);
			for (let k = 0; k < this.m; k++) fn_sum = Hop.add(fn_sum, Hop.mul(this.A[i][k], M.A[k][j]));
			return fn_sum;
		}));
		return new Matrix(arr);
	}
	
	trans() { // 轉置
		let matrix_trans = Matrix.create(this.m, this.n);
		for (let i = 0; i < this.n; i++) for (let j = 0; j < this.m; j++) {
			matrix_trans.A[j][i] = this.A[i][j];
		}
		return matrix_trans;
	}
	
	inverse() { // 反矩陣
		if (this.n !== this.m) { // 只有方陣才有反矩陣
			throwErr("Matrix.inverse", "Only square matrices have an inverse.");
			return new Matrix(null);
		}
		
		const n = this.n; // 矩陣邊長
		let m_simplify = new Matrix(this.A, true); // 執行簡化列運算的矩陣
		let m_inverse = Matrix.createI(n); // 建構反矩陣
		for (let i = 0; i < n; i++) { // 消去原矩陣的下三角部分
			let swapI = i;
			while (Hop.equal(m_simplify.A[swapI][i], 0)) {
				swapI++; // 若對角線元素為 0, 交換兩行使對角線元素不為 0
				if (swapI >= n) return new Matrix(null); // 矩陣為奇異矩陣, 不可逆
			}
			
			[m_simplify.A[i], m_simplify.A[swapI]] = [m_simplify.A[swapI], m_simplify.A[i]]; // 交換兩行使對角線元素不為 0
			[m_inverse.A[i], m_inverse.A[swapI]] = [m_inverse.A[swapI], m_inverse.A[i]];
			
			for (let j = i+1; j < n; j++) {
				const frac_f = Hop.div(m_simplify.A[j][i], m_simplify.A[i][i]); // 乘 frac_f 倍加到下面某一個 row, 消去
				for (let k = 0; k < n; k++) {
					m_simplify.A[j][k] = Hop.sub(m_simplify.A[j][k], Hop.mul(m_simplify.A[i][k], frac_f));
					m_inverse.A[j][k] = Hop.sub(m_inverse.A[j][k], Hop.mul(m_inverse.A[i][k], frac_f));
				}
			}
		}
		for (let i = n-1; i >= 0; i--) { // 消去原矩陣的上三角部分
			for (let j = i-1; j >= 0; j--) {
				const frac_f = Hop.div(m_simplify.A[j][i], m_simplify.A[i][i]); // 乘 frac_f 倍加到上面某一個 row, 消去
				for (let k = 0; k < n; k++) {
					m_inverse.A[j][k] = Hop.sub(m_inverse.A[j][k], Hop.mul(m_inverse.A[i][k], frac_f));
				}
			}
		}
		for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { // 同除對角線
			m_inverse.A[i][j] = Hop.div(m_inverse.A[i][j], m_simplify.A[i][i]);
		}
		return m_inverse;
	}
}

export class SolveQuad { // 解二次方程式
	static TYPE_SQRT = 0; // 解形式為: (n ± m√s) / d ; n,s為整數 ; m,d 為正整數
	static TYPE_FRAC = 1; // 解形式為: frac_r1 , frac_r2
	
	constructor(frac_a, frac_b, frac_c) { // 計算共軛根
		for (const [frac, i] of [[frac_a, "a"], [frac_b, "b"], [frac_c, "c"]]) {
			if (!Frac.isFrac(frac)) {
				throwErr("SolveQuad.constructor", `Parameter frac_${i} is not Frac.`);
				frac_a = new Frac(1); frac_b = new Frac(0); frac_c = new Frac(0);
				break;
			}
		}
		if (frac_a.isZero()) { // a 若為 0, 則這不是一個二次函數
			throwErr("SolveQuad.constructor", "0x^2 + bx + c is not a quadratic equation.");
			frac_a = new Frac(1); frac_b = new Frac(0); frac_c = new Frac(0);
		}
		
		const frac_axis = frac_b.mul(-1).div(frac_a.mul(2));
		const frac_sqrt = frac_axis.pow(2).sub(frac_c.div(frac_a));
		this.n = frac_axis.n * frac_sqrt.d;
		this.m = frac_axis.d;
		this.s = frac_sqrt.n * frac_sqrt.d;
		this.d = frac_axis.d * frac_sqrt.d; // 共軛根: (n ± m√s) / d
		
		this.std(); // 標準化
		
		if (this.s == 0 || this.s == 1) { // 如果存在有理數根
			this.frac_r1 = new Frac(this.n + this.m * this.s, this.d);
			this.frac_r2 = new Frac(this.n - this.m * this.s, this.d);
		}
	}
	
	std() { // 標準化
		const k = getSquareFactor(this.s); // 將 m√s 內的 s 提出 k^2
		this.s /= k*k; // s 除 k^2
		this.m *= k; // m 乘 k
		
		const nmd_gcd = gcd(this.n, gcd(this.m, this.d)); // 對 n, m, d 做約分
		this.n /= nmd_gcd;
		this.m /= nmd_gcd;
		this.d /= nmd_gcd;
	}
	
	toStr() { // 解的 debug 字串
		if (this.solutionType() == SolveQuad.TYPE_FRAC) {
			return `${this.frac_r1.toStr()} , ${this.frac_r2.toStr()}`;
		}
		return `(${this.n} ± ${this.m}√${this.s}) / ${this.d}`;
	}
	
	toLatex() { // 解的 latex 字串
		const type = this.solutionType();
		if (type === SolveQuad.TYPE_FRAC) {
			return `${this.frac_r1.toLatex()} ${SCL} ${this.frac_r2.toLatex()}`; // frac_r1 , frac_r2
		}
		if (type === SolveQuad.TYPE_SQRT) {
			if (this.s > 0) {
				let s_latex = "";
				if (this.m != 1) s_latex = `${this.m}`; // 若 m 不為 1, 顯示 m
				s_latex = `\\pm ${s_latex} \\sqrt{${this.s}}`; // 顯示根號和 ± -> ± m√s
				if (this.n != 0) s_latex = `${this.n} ${s_latex}`; // 若 n 不為 0 -> n ± m√s
				if (this.d != 1) s_latex = `\\frac{${s_latex}}{${this.d}}`; // 若 d 不為 1, 顯示分數 -> (n ± m√s) / d
				
				return s_latex; // (n ± m√s) / d
			}
			if (this.s < 0) {
				let frac_re = new Frac(this.n, this.d); // 實部 (frac)
				let frac_im = new Frac(this.m, this.d); // 虛部 (frac)
				
				let s_latex = "";
				if (frac_im.n != 1) s_latex = `${frac_im.n}`; // 若 m 不為 1, 顯示 m
				if (this.s != -1) s_latex = `${s_latex} \\sqrt{${-this.s}}`; // 若 s 不為 -1, 顯示根號
				if (frac_im.d != 1) s_latex = `\\frac{${s_latex}}{${frac_im.d}}`; // 若 d 不為 1, 顯示分數
				s_latex = `\\pm ${s_latex} i`; // ± im i
				if (!frac_re.isZero()) s_latex = `${frac_re.toLatex()} ${s_latex}`; // 若實部不為 0, 變成 re ± im i
				
				return s_latex; // re ± im i
			}
		}
		return "?"; // wtf
	}
	
	solutionType() { // 回傳解的形式
		if (this.frac_r1) return SolveQuad.TYPE_FRAC;
		return SolveQuad.TYPE_SQRT;
	}
}

export class SolveCubic { // 解三次方程式
	static TYPE_3FRAC = 0; // 解形式為: frac_r1 , frac_r2 , frac_r3
	static TYPE_FRAC_QUAD = 1; // 解形式為: frac_r1 , (n ± m√s) / d
	static TYPE_3REAL = 2; // 解形式為: r1 , r2 , r3
	static TYPE_REAL_IM = 3; // 解形式為: r1 , (cRe ± cIm i)
	
	static findRationalRoot(frac_a, frac_b, frac_c, frac_d) { // 是否存在有一根為有理數, 若找不到回傳 null
		if (frac_d.isZero()) return new Frac(0); // d 若為 0, 必存在一根為 0
		
		const coefLcm = lcm(lcm(frac_a.d, frac_b.d), lcm(frac_c.d, frac_d.d));
		const reduct = (frac) => frac.mul(coefLcm).n;
		const [a, b, c, d] = [reduct(frac_a), reduct(frac_b), reduct(frac_c), reduct(frac_d)]; // 將分數通分
		
		const aFactors = getFactors(a); // 尋找有理根
		const dFactors = getFactors(d);
		for (const af of aFactors) for (const df of dFactors) { // 遍歷所有可能的有理根
			const frac_r = new Frac(df, af); // 可能的有理根
			const frac_valueMain = frac_r.pow(2).mul(b).add(d); // 當 +- 根代入方程式時, b x^2 + d 這部分的值會相同
			const frac_valuePN = frac_r.pow(2).mul(a).add(c).mul(frac_r); // 當 +- 根代入方程式時, a x^3 + c x 這部分的值會異號
			if (frac_valueMain.add(frac_valuePN).isZero()) return frac_r; // 若正根為方程式的解, 直接回傳
			if (frac_valueMain.sub(frac_valuePN).isZero()) return frac_r.mul(-1); // 若負根為方程式的解, 直接回傳
		}
		return null; // 找不到有理根, 回傳 null
	}
	
	static findRealRoot(a, b, c, d, tor = 1e-6) { // 尋找三次函數的某個實根
		const f = (x) => a*x**3 + b*x*x + c*x + d;
		
		if (a < 0) [a, b, c, d] = [-a, -b, -c, -d]; // 使 a 為正數
		
		let [r1, r2] = [0, 0];
		if (f(0) == 0) return 0;
		else if (f(0) < 0) { // 若 f(0) < 0, 往 +x 的方向搜尋
			r2 = 1; // 搜尋範圍
			while (f(r2) < 0) [r1, r2] = [r2, r2*2]; // 指數擴大範圍
		} else if (f(0) > 0) { // 若 f(0) > 0, 往 -x 的方向搜尋
			r1 = -1;
			while (f(r1) > 0) [r1, r2] = [r1*2, r1];
		}
		
		while (Math.abs(r1-r2) > tor) {
			if (f((r1+r2)/2) > 0) r2 = (r1+r2)/2;
			else r1 = (r1+r2)/2;
		}
		return (r1+r2)/2;
	}
	
	constructor(frac_a, frac_b, frac_c, frac_d) { // 計算共軛根
		for (const [frac, i] of [[frac_a, "a"], [frac_b, "b"], [frac_c, "c"], [frac_d, "d"]]) { // 參數不為 Frac
			if (!Frac.isFrac(frac)) {
				throwErr("SolveCubic.constructor", `Parameter frac_${i} is not Frac.`);
				frac_a = new Frac(1); frac_b = new Frac(0); frac_c = new Frac(0); frac_d = new Frac(0);
				break;
			}
		}
		if (frac_a.isZero()) { // a 若為 0, 則這不是一個三次函數
			throwErr("SolveCubic.constructor", "0x^3 + bx^2 + cx + d is not a cubic equation.");
			frac_a = new Frac(1); frac_b = new Frac(0); frac_c = new Frac(0); frac_d = new Frac(0);
		}
		
		const frac_r = SolveCubic.findRationalRoot(frac_a, frac_b, frac_c, frac_d); // 其中一個有理數根
		if (frac_r) { // 若至少一根為有理數
			const A = frac_a;
			const B = A.mul(frac_r).add(frac_b);
			const C = B.mul(frac_r).add(frac_c);
			this.frac_r1 = frac_r;
			this.quad = new SolveQuad(A, B, C);
			
			if (this.quad.solutionType() == SolveQuad.TYPE_FRAC) { // 共軛根的根號可被去除的情況
				this.frac_r2 = this.quad.frac_r1; // k1
				this.frac_r3 = this.quad.frac_r2; // k2
			}
		} else { // 若沒有根為有理數
			const [a, b, c, d] = [frac_a.toFloat(), frac_b.toFloat(), frac_c.toFloat(), frac_d.toFloat()]; // 直接用浮點運算
			const r = SolveCubic.findRealRoot(a, b, c, d); // 其中一個實數根
			const alpha = (-r)/2 + (-b)/(2*a);
			const beta = r*r + (b*r + c)/a;
			const A = alpha;
			const B = alpha*alpha - beta; // k1, k2 = A ± √B
			const B_abs_sqrt = Math.sqrt(Math.abs(B));
			this.r1 = r;
			
			if (B >= 0) {
				this.r2 = A + B_abs_sqrt; // k1
				this.r3 = A - B_abs_sqrt; // k2
			} else {
				this.cRe = A;
				this.cIm = B_abs_sqrt; // k1, k2 = cRe ± cIm i
			}
		}
	}
	
	toStr() { // 解的 debug 字串
		const type = this.solutionType();
		if (type === SolveCubic.TYPE_3FRAC || type === SolveCubic.TYPE_FRAC_QUAD) {
			return `${this.frac_r1.toStr()} , ${this.quad.toStr()}`; // frac_r1 , quad
		}
		if (type === SolveCubic.TYPE_3REAL) {
			return `${this.r1.toFixed(4)} , ${this.r2.toFixed(4)} , ${this.r3.toFixed(4)}`; // r1 , r2 , r3
		}
		if (type === SolveCubic.TYPE_REAL_IM) {
			return `${this.r1.toFixed(4)} , ${this.cRe.toFixed(4)} ± ${this.cIm.toFixed(4)}i`; // r1 , cRe ± cIm i
		}
		return "?";
	}
	
	toLatex() { // 解的 latex 字串
		const type = this.solutionType();
		if (type === SolveCubic.TYPE_3FRAC || type === SolveCubic.TYPE_FRAC_QUAD) {
			return `${this.frac_r1.toLatex()} ${SCL} ${this.quad.toLatex()}`; // frac_r1 , quad
		}
		if (type === SolveCubic.TYPE_3REAL) {
			return `${this.r1.toFixed(4)} ${SCL} ${this.r2.toFixed(4)} ${SCL} ${this.r3.toFixed(4)}`; // r1 , r2 , r3
		}
		if (type === SolveCubic.TYPE_REAL_IM) {
			return `${this.r1.toFixed(4)} ${SCL} ${this.cRe.toFixed(4)} \\pm ${this.cIm.toFixed(4)} i`; // r1 , cRe ± cIm i
		}
		return "?";
	}
	
	solutionType() { // 回傳解的形式
		if (this.frac_r1) {
			if (this.frac_r2) return SolveCubic.TYPE_3FRAC;
			else return SolveCubic.TYPE_FRAC_QUAD;
		} else {
			if (this.r2) return SolveCubic.TYPE_3REAL;
			else return SolveCubic.TYPE_REAL_IM;
		}
	}
	
	getDoubleRoot() { // 回傳二重根, 若沒有則回傳 null
		if (this.solutionType() !== SolveCubic.TYPE_3FRAC) return null; // 只有 3 有理根情況, 才有可能重根
		if (this.frac_r1.equal(this.frac_r2)) return this.frac_r1; // r1 = r2
		if (this.frac_r2.equal(this.frac_r3)) return this.frac_r2; // r2 = r3
		if (this.frac_r3.equal(this.frac_r1)) return this.frac_r3; // r3 = r1
		return null;
	} // 注: quad.s 若為 0 或 1 會被約掉而變成 TYPE_3FRAC, 所以只有 3 有理根情況, 才有可能重根
	
	getTripleRoot() { // 回傳三重根, 若沒有則回傳 null
		if (this.solutionType() !== SolveCubic.TYPE_3FRAC) return null; // 只有 3 有理根情況, 才有可能重根
		if (this.frac_r1.equal(this.frac_r2) && this.frac_r2.equal(this.frac_r3)) return this.frac_r1; // r1 = r2 = r3
		return null;
	}
}

export function F(n = 0, d = 1) { return new Frac(n, d); } // Frac 工廠

// 字串處理
export const SCL = "~,\\enspace"; // separate comma latex

export function isStrInt(str) { // [棄用] 某個字串是否為整數
	return /^-?\d+$/.test(str);
}

export function mlTerm(coef, base, pow, firstPos = true, nonZero = false) { // [重構] 根據係數, 底數名稱, 次方數生成 c b^p 的 latex 字串
	if (nonZero) { // 若 nonZero 為 true, 且生成的 latex 字串的數值為 0, 會回傳空字串而不是 "+0"
		let s_latex = mlTerm(coef, base, pow);
		return s_latex === "+0" ? "" : s_latex;
	}
	
	// start: 根據不同型態的輸入, 統一轉為 String
	if (Frac.isFrac(coef)) coef = coef.toLatex();
	else coef = String(coef);
	
	if (Frac.isFrac(base)) {
		if (!base.isInt()) base = `\\left( ${base.toLatex()} \\right)`; // 分數為底數要加括號
		else base = base.toLatex();
	} else base = String(base);
	if (base[0] === "-") base = `\\left( ${base} \\right)`; // 底數有負號要加括號
	
	if (Frac.isFrac(pow)) pow = `${pow.n}/${pow.d}`;
	else pow = String(pow);
	// end: 根據不同型態的輸入, 統一轉為 String
	
	if (coef === "0" || base === "0") return (firstPos ? "+" : "") + "0";
	
	let s_coefLatex = ""; // 係數部分的 latex 字串
	if (coef === "-1") s_coefLatex = (pow === "0" ? "-1" : "-");
	else if (coef === "1") s_coefLatex = (pow === "0" ? "1" : "");
	else s_coefLatex = coef;
	
	if (s_coefLatex[0] !== "-") s_coefLatex = (firstPos ? "+" : "") + s_coefLatex; // 開頭無負號要補 +
	
	if (isStrInt(s_coefLatex[s_coefLatex.length-1]) && isStrInt(base[0])) {
		s_coefLatex += " \\cdot "; // 係數與底數連接處若都為數字, 需要加乘點分離
	}
	
	let s_varLatex = ""; // 變數部分的 latex
	if (pow !== "0") {
		s_varLatex += base; // 次方不為 0, 顯示底數
		if (pow !== "1") s_varLatex = `{${s_varLatex}}^{${pow}}`; // 次方不為 0 or 1, 顯示指數
	}
	
	return s_coefLatex + s_varLatex;
}

export function mlMultiTerm(latexArr) { // 用於組合多個 latex, 會偵測並以 "+" 連接多個 latex; 當整個式子為 0, 會回傳 0
	// 採用 +0 合併, 去頭0
}

export function mlEquationSystem(row, col, coefFunc, varFunc, equalFunc, equalMode = "right") { // 生成聯立方程式的 latex (會將未知數對齊)
	let s_latex = Array.from({ length: row }, (_, i) => {
		let s_equationLatex = Array.from({ length: col }, (_, j) => {
			const coef = coefFunc(i, j) ?? "?"; // 係數, 可以為 string, number, Frac
			const varLatex = varFunc(i, j) ?? "?"; // 未知數的 latex
			const s_termLatex = mlTerm(coef, `&${varLatex}&`, 1);
			return s_termLatex === "+0" ? "&&" : `~${s_termLatex}`; // 某一個常係數為 0, 為了要保持後續未知數的對齊, 回傳 "&&"
		}).join(" ");
		
		if (s_equationLatex.startsWith("~+")) s_equationLatex = s_equationLatex.replace("+", ""); // 去除開頭的 +
		if (s_equationLatex.split("&&").length - 1 === col) s_equationLatex = `~0 ${s_equationLatex}`; // 若某一個 row 沒有任何一項, 顯示 0
		
		if (equalMode === "left") s_equationLatex = `${equalFunc(i) ?? "?"} &=& ${s_equationLatex}`; // "=" 在左側 (加上 "&" 讓 "=" 符號對齊)
		else s_equationLatex = `${s_equationLatex} &= ${equalFunc(i) ?? "?"}`; // "=" 在右側
		
		return removePostfix(s_equationLatex, "&"); // 最後一個字符不能是 &, katex 會報錯
	}).join(" \\\\ "); // 以換行符連接所有的式子
	
	s_latex = `\\begin{alignat*}{${col+1}} ${s_latex} \\end{alignat*}`; // 聯立方程式的 latex 對齊規則 (將未知數和 "=" 對齊)
	return `\\left\\{ ${s_latex} \\right.`; // 加上聯立方程式左側的 "{" 符號
}
// 字串處理

// 錯誤訊息
function throwErr(methodName, errMessage) {
	console.error(`[RanMath][${methodName}] ${errMessage}`);
}
// 錯誤訊息
