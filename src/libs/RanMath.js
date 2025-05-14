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

export class Frac { // 分數 (fraction)
	static isFrac(value) { // 是否是分數
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
	
	static sum(arr) { // 加總
		if (!Array.isArray(arr)) { // 如果 arr 不是 Array, 回傳 0
			throwErr("Frac.sum", 'Param "arr" must be an Array.');
			return F(0);
		}
		
		let frac_sum = F(0);
		for (const nf of arr) if (Frac.isFrac(nf) || isInt(nf)) { // 如果元素不是 Frac 或 int, 會自動忽略, 不會報錯
			frac_sum = frac_sum.add(nf);
		}
		return frac_sum;
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
		
		this.n = n; // 分子
		this.d = d; // 分母
		
		// 標準化
		if (this.d < 0) { // 若分母為負數, 將 n 和 d 同乘 -1, 保證 d ∈ Z
			this.n *= -1;
			this.d *= -1;
		}
		
		const ndGcd = gcd(this.n, this.d);
		this.n /= ndGcd; // 約分. (會把 0/? 變成 0/1)
		this.d /= ndGcd; // 因為 n, d 不可能同時為 0, 所以 gcd(n, d) 不可能為 0
		
		if (this.n === 0) this.n = 0; // 去除 -0
		// 標準化
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
			
			if (errReturn === undefined) return this; // 如果 errReturn 沒有傳值, 回傳 this (不執行這個運算)
			return errReturn; // 回傳自訂的 errReturn (equal 或 lt 會回傳 false)
		}
		
		return op(this, nf); // 執行運算
	}
	
	static ADD_OP = (f1, f2) => F(f1.n * f2.d + f1.d * f2.n, f1.d * f2.d);
	add(nf) { // 加法
		return this._makeOp(nf, "add", Frac.ADD_OP);
	}
	
	static SUB_OP = (f1, f2) => F(f1.n * f2.d - f1.d * f2.n, f1.d * f2.d);
	sub(nf) { // 減法
		return this._makeOp(nf, "sub", Frac.SUB_OP);
	}
	
	static MUL_OP = (f1, f2) => F(f1.n * f2.n, f1.d * f2.d);
	mul(nf) { // 乘法
		return this._makeOp(nf, "mul", Frac.MUL_OP);
	}
	
	static DIV_OP = (f1, f2) => {
		if (f2.isZero()) { // f1/f2 發生除零錯誤, 回傳 null
			throwErr("Frac.div", "Div 0 error.");
			return f1; // 回傳 this (不執行這個運算)
		}
		return F(f1.n * f2.d, f1.d * f2.n);
	};
	div(nf) { // 除法
		return this._makeOp(nf, "div", Frac.DIV_OP);
	}
	
	pow(i) { // 整數次方
		if (!isInt(i)) { // 次方數必須是整數
			throwErr("Frac.pow", "Power must be an int.");
			return this.copy();
		}
		if (i >= 0) return F(this.n ** i, this.d ** i);
		else return F(this.d ** -i, this.n ** -i); // 負數次方 -> 交換分子分母
	}
	
	static EQUAL_OP = (f1, f2) => f1.n === f2.n && f1.d === f2.d;
	equal(nf) { // 比較兩個分數是否相同
		return this._makeOp(nf, "equal", Frac.EQUAL_OP, false);
	}
	
	static LT_OP = (f1, f2) => f1.n * f2.d < f1.d * f2.n;
	lt(nf) { // 小於: this < nf
		return this._makeOp(nf, "lt", Frac.LT_OP, false);
	}
}

export class Hop { // Frac 和 number (int, float) 混合運算 (Hybrid OPeration)
	static uop(nf, fracOp, floatOp, errReturn = NaN) { // 定義 Frac 和 number 的混合算子 (Unary OPerator)
		if (isInt(nf)) nf = new Frac(nf); // int -> Frac, 這樣只需處理 Frac, float, other
		if (Frac.isFrac(nf)) return fracOp(nf); // Frac 用分數運算
		if (isNum(nf)) return floatOp(nf); // 目前只剩 float, other ; 所以 number 必為 float
		return errReturn; // other (未定義)
	}
	
	static bop(nf1, nf2, fracOp, floatOp, errReturn = NaN) { // 定義 Frac 和 number 的混合算子 (Binary OPerator)
		if (isInt(nf1)) nf1 = new Frac(nf1); // int -> Frac, 這樣只需處理 Frac, float, other
		if (isInt(nf2)) nf2 = new Frac(nf2);
		if (Frac.isFrac(nf1) && Frac.isFrac(nf2)) return fracOp(nf1, nf2); // 必須兩個數都為 Frac 才可以進行分數運算
		
		if (Frac.isFrac(nf1)) nf1 = nf1.toFloat(); // 如果其中一個數為 number, 降級為 number 運算, 目前只剩 float, other
		if (Frac.isFrac(nf2)) nf2 = nf2.toFloat();
		if (isNum(nf1) && isNum(nf2)) return floatOp(nf1, nf2);
		return errReturn; // other (未定義)
	}
	
	static FALSE_OP = () => false; // 浮點數必不為 Z, Z+, Z-, Q
	static Z_FRAC_OP = frac => frac.isInt();
	static isInt(nf) { // 是否為整數 (Z). 如果 nf 不是 Frac/number 會回傳 false
		return Hop.uop(nf, Hop.Z_FRAC_OP, Hop.FALSE_OP, false);
	}
	
	static ZP_FRAC_OP = frac => frac.isInt() && F(0).lt(frac); // int & (0 < n)
	static isPosInt(nf) { // 是否為正整數 1, 2, ... (Z+). 如果 nf 不是 Frac/number 會回傳 false
		return Hop.uop(nf, Hop.ZP_FRAC_OP, Hop.FALSE_OP, false);
	}
	
	static ZN_FRAC_OP = frac => frac.isInt() && frac.lt(0) // int & (n < 0)
	static isNegInt(nf) { // 是否為負整數 1, 2, ... (Z-). 如果 nf 不是 Frac/number 會回傳 false
		return Hop.uop(nf, Hop.ZN_FRAC_OP, Hop.FALSE_OP, false);
	}
	
	static Q_FRAC_OP = frac => true; // int number 會自動轉為 Frac, 而 Frac 必為有理數. (不考慮浮點有理數)
	static isRational(nf) { // 是否為有理數 (Q). 如果 nf 不是 Frac/number 會回傳 false
		return Hop.uop(nf, Hop.Q_FRAC_OP, Hop.FALSE_OP, false);
	}
	
	static STR_FRAC_OP = frac => frac.toStr();
	static STR_FLOAT_OP = p => (n => n.toFixed(p));
	static toStr(nf, p = 4) { // 轉 debug 字串. 如果 nf 不是 Frac/number 會回傳 "?"
		return Hop.uop(nf, Hop.STR_FRAC_OP, Hop.STR_FLOAT_OP(p), "?");
	}
	
	static LATEX_FRAC_OP = frac => frac.toLatex();
	static toLatex(nf, p = 4) { // 轉 latex 語法. 如果 nf 不是 Frac/number 會回傳 "?"
		return Hop.uop(nf, Hop.LATEX_FRAC_OP, Hop.STR_FLOAT_OP(p), "?");
	}
	
	static add(fn1, fn2) { // 加法
		return Hop.bop(fn1, fn2, (frac1, frac2) => frac1.add(frac2), (n1, n2) => n1 + n2);
	}
	
	static sub(fn1, fn2) { // 加法
		return Hop.bop(fn1, fn2, (frac1, frac2) => frac1.sub(frac2), (n1, n2) => n1 - n2);
	}
	
	static mul(fn1, fn2) { // 乘法
		return Hop.bop(fn1, fn2, (frac1, frac2) => frac1.mul(frac2), (n1, n2) => n1 * n2);
	}
	
	static div(fn1, fn2) { // 除法
		return Hop.bop(fn1, fn2, (frac1, frac2) => frac1.div(frac2), (n1, n2) => n1 / n2);
	}
	
	static pow(fn1, fn2) { // 次方: fn1 ** fn2
		if (Frac.isFrac(fn2)) fn2 = fn2.toFloat(); // 次方轉 int or float
		if (Frac.isFrac(fn1) && isInt(fn2)) return fn1.pow(fn2); // 整數次方
		return fn1 ** fn2; // 浮點次方
	}
	
	static equal(fn1, fn2) { // 等於. 如果 fn1, fn2 其中一個不是數字會回傳 false
		return Hop.bop(fn1, fn2, (frac1, frac2) => frac1.equal(frac2), (n1, n2) => n1 === n2, false);
	}
	
	static lt(fn1, fn2) { // 小於. 如果 fn1, fn2 其中一個不是數字會回傳 false
		return Hop.bop(fn1, fn2, (frac1, frac2) => frac1.lt(frac2), (n1, n2) => n1 < n2, false);
	}
}

export class EF { // 擴張體運算 (a + b√s)
	static isEF(ef) {
		return ef instanceof EF;
	}
	
	constructor(fn_a = 0, fn_b = 0, fn_s = 0) {
		if (!Frac.isFrac(fn_a) && !isNum(fn_a)) { // 參數必須為 Frac 或 number
			throwErr("EF.constructor", "fn_a is not Frac or number.");
			fn_a = new Frac(0);
		}
		if (!Frac.isFrac(fn_b) && !isNum(fn_b)) {
			throwErr("EF.constructor", "fn_b is not Frac or number.");
			fn_b = new Frac(0);
		}
		if (!Frac.isFrac(fn_s) && !isNum(fn_s)) {
			throwErr("EF.constructor", "fn_s is not Frac or number.");
			fn_s = new Frac(0);
		}
		
		this.a = fn_a; // 經過 std 後, a b 為 Frac / float
		this.b = fn_b;
		this.s = fn_s; // 經過 std 後, s 必為 Frac
		this.std();
	}
	
	std() { // 標準化, 待優化
		if (isInt(this.a)) this.a = new Frac(this.a);
		if (isInt(this.b)) this.b = new Frac(this.b);
		if (isInt(this.s)) this.s = new Frac(this.s); // 執行此步後 a, b, s 只剩 Frac 和 number (float)
		
		if (Frac.isFrac(this.a) && Frac.isFrac(this.b) && Frac.isFrac(this.s)) { // 化簡根號
			this.b = Hop.div(this.b, this.s.d); // a + b√(n/d) -> a + (b/d)√(nd)
			this.s = Hop.mul(this.s.n, this.s.d);
			
			const k = getSquareFactor(this.s); // 將 √s 內的 s 提出 k^2
			this.s = Hop.div(this.s, k*k); // s 除 k^2
			this.b = Hop.mul(this.b, k); // b 乘 k
		} else { // 其中一個參數為 float, a + b√s = a + b*√|s| √(s/|s|)
			if (Frac.isFrac(this.a)) this.a = this.a.toFloat();
			if (Frac.isFrac(this.b)) this.b = this.b.toFloat();
			if (Frac.isFrac(this.s)) this.s = this.s.toFloat();
			
			this.b *= Math.sqrt(Math.abs(this.s));
			this.s = new Frac(this.s > 0 ? 1 : -1);
		} // 經過此步後, s 必為 Frac
		
		if (Hop.equal(this.s, 1)) { // a + b√1 = (a+b) + 0√1
			this.a = Hop.add(this.a, this.b);
			this.b = new Frac(0);
		}
		
		if (Hop.equal(this.b, 0)) this.s = new Frac(0); // a + 0√s = a + 0√0
		if (Hop.equal(this.s, 0)) this.b = new Frac(0); // a + b√0 = a + 0√0
	}
	
	toStr() { // 轉 debug 字串
		return `${Hop.toStr(this.a)} + ${Hop.toStr(this.b)} √ ${Hop.toStr(this.s)}`;
	}
	
	toLatex() { // 轉 latex 語法, 待優化, 因為我直接 copy quad 內的東西 :)
		if (this.s.isZero()) return Hop.toLatex(this.a); // a + 0√0 -> a
		if (new Frac(0).lt(this.s)) { // s > 0, a b 必為 Frac, 化成 (n + m√s) / d 形式
			let [n, m, d] = [this.a.n * this.b.d, this.b.n * this.a.d, this.a.d * this.b.d];
			const nmd_gcd = gcd(gcd(n, m), d);
			[n, m, d] = [n / nmd_gcd, m / nmd_gcd, d / nmd_gcd];
			
			let s_latex = mlTerm(m, `\\sqrt{${this.s.n}}`, 1); // m√s
			if (n !== 0) s_latex = `${n} ${s_latex}`; // 若 n 不為 0 -> n ± m√s
			if (d != 1) s_latex = `\\frac{${removePrefix(s_latex, "+")}}{${d}}`; // 若 d 不為 1, 顯示分數 -> (n ± m√s) / d
			return removePrefix(s_latex, "+");
		}
		// s < 0
		if (!Frac.isFrac(this.a)) { // 浮點複數
			let s_latex = mlTerm(`${this.b.toFixed(4)}`, "i", 1);
			if (this.a !== 0) s_latex = `${this.a.toFixed(4)} ${s_latex}`;
			return removePrefix(s_latex, "+");
		}
		
		let s_latex = `${this.b.n}`;
		if (this.s.n != -1) s_latex = mlTerm(s_latex, `\\sqrt{${-this.s.n}}`, 1, false); // 若 s 不為 -1, 顯示根號
		if (this.b.d != 1) s_latex = `\\frac{${s_latex}}{${this.b.d}}`; // 若 d 不為 1, 顯示分數 (分母不能有 +)
		s_latex = mlTerm(s_latex, "i", 1); // ± im i
		if (!this.a.isZero()) s_latex = `${this.a.toLatex()} ${s_latex}`; // 若實部不為 0, 變成 re ± im i
		return removePrefix(s_latex, "+"); // re ± im i
	}
	
	_makeOp(ef, opName, op, err = true) { // 批量製作算子, 因為重複的部分太多了
		if (Frac.isFrac(ef) || isNum(ef)) ef = new EF(ef); // 將 Frac 和 number 轉為 EF
		
		if (!EF.isEF(ef)) { // 如果參數不是 EF / Frac / number, 回傳 null
			if (err) throwErr(`EF.${opName}`, "Param ef is not a EF / Frac / number.");
			return null;
		}
		if (!Hop.equal(this.s, ef.s) && !Hop.equal(this.s, 0) && !Hop.equal(ef.s, 0)) { // 如果兩個 fleid 的 √s 不一致, 無法運算 (忽略 s 為 0 的情況)
			if (err) throwErr(`EF.${opName}`, "Bases of extension fields differ.");
			return null;
		}
		
		const newS = Hop.equal(this.s, 0) ? ef.s : this.s; // 若兩個 √s 其一不為 0, 運算結果的 √s 必須不為 0
		
		return op(this, ef, newS);
	}
	
	conj() { // 共軛: (a + b√s) -> (a + (-b)√s)
		return new EF(this.a, Hop.sub(0, this.b), this.s);
	}
	
	norm() { // 範數平方: (a + b√s) -> (a^2 - b^2 s)
		return Hop.sub(Hop.mul(this.a, this.a), Hop.mul(Hop.mul(this.b, this.b), this.s));
	}
	
	add(ef) { // 加法: (A + B√s) + (a + b√s)
		return this._makeOp(ef, "add", (ef1, ef2, newS) => {
			return new EF(Hop.add(ef1.a, ef2.a), Hop.add(ef1.b, ef2.b), newS); // (A + B√s) + (a + b√s) = (A+a) + (B+b)√s
		});
	}
	
	sub(ef) { // 減法: (A + B√s) - (a + b√s)
		return this._makeOp(ef, "sub", (ef1, ef2, newS) => {
			return new EF(Hop.sub(ef1.a, ef2.a), Hop.sub(ef1.b, ef2.b), newS); // (A + B√s) - (a + b√s) = (A-a) + (B-b)√s
		});
	}
	
	mul(ef) { // 乘法: (A + B√s) * (a + b√s)
		return this._makeOp(ef, "mul", (ef1, ef2, newS) => {
			return new EF( // (A + B√s) * (a + b√s) = (Aa+Bbs) + (Ab+Ba)√s
				Hop.add(Hop.mul(ef1.a, ef2.a), Hop.mul(Hop.mul(ef1.b, ef2.b), newS)),
				Hop.add(Hop.mul(ef1.a, ef2.b), Hop.mul(ef1.b, ef2.a)),
				newS
			);
		});
	}
	
	div(ef) { // 除法: (A + B√s) / (a + b√s)
		return this._makeOp(ef, "div", (ef1, ef2) => {
			const norm = ef2.norm();
			if (Hop.equal(norm, 0)) { // 除零錯誤, 回傳 null
				throwErr("EF.div", "Div 0 error.");
				return null;
			}
			
			let ef_div = ef1.mul(ef2.conj()); // (A + B√s) / (a + b√s) = (A + B√s)*(a - b√s) / norm
			ef_div.a = Hop.div(ef_div.a, norm);
			ef_div.b = Hop.div(ef_div.b, norm);
			return ef_div;
		});
	}
	
	pow(i) { // 整數次方: (a + b√s)^i
		if (!isInt(i)) {
			throwErr("EF.pow", "Power must be an int.");
			return null;
		}
		if (i == 0) return new EF(1);
		if (i > 0) return this.pow(i-1).mul(this); // 很糟的實作方法, 不過已滿足需求
		return this.pow(i+1).div(this);
	}
	
	equal(ef) { // 相等
		const b = this._makeOp(ef, "equal", (ef1, ef2) => {
			return Hop.equal(ef1.a, ef2.a) && Hop.equal(ef1.b, ef2.b);
		}, false);
		if (b === null) return false; // ef 型態錯誤或 √s 不一致會判定為 false
		return b;
	}
}

export class BEF { // binary extension field
	// k(a1 + √s1)(a2 + √s2)...
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
