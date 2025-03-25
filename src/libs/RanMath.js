export function gcd(a, b) {
	[a, b] = [Math.abs(a), Math.abs(b)];
	while (b != 0) [a, b] = [b, a % b];
	return a;
}

export function isPerfectSquare(n) { // 是不是完全平方數
	if (n < 0) return false;
	const sqrt_int = Math.floor(Math.sqrt(n));
	return sqrt_int ** 2 == n;
}

export class Frac { // 分數
	static fromStr(str) { // 將字串轉為分數
		const arrayFrac = str.split("/");
		for (const i of arrayFrac) if (!isInt(i)) return new Frac(0); // 若某個部份不是整數, 回傳 0
		
		if (arrayFrac.length == 1) { // 輸入整數
			return new Frac(Number(arrayFrac[0]));
		}
		if (arrayFrac.length == 2) { // 輸入分數
			return new Frac(Number(arrayFrac[0]), Number(arrayFrac[1]));
		}
		
		return new Frac(0); // 若輸入非整數或分數, 回傳 0
	}
	
	constructor(n, d = 1) {
		this.n = n; // 分子, n ∈ Z
		this.d = d; // 分母, d ∈ Z+
		this.std(); // 標準化
	}
	
	toStr() { // 轉為 debug 字串
		return `${this.n}/${this.d}`;
	}
	toLatex() { // 轉為 latex 字串
		if (this.isInt()) return `${this.n}`;
		return `\\frac{${this.n}}{${this.d}}`;
	}
	
	isInt() { // 是否是整數
		return this.d == 1
	}
	
	std() { // 標準化
		if (this.d == 0) { // 分母為 0, 報錯, 歸零
			console.error("Detect fraction ?/0");
			this.n = 0;
			this.d = 1;
		}
		
		if (this.d < 0) { // 若分母為負數, 同乘 -1
			this.n *= -1;
			this.d *= -1;
		}
		
		const nd_gcd = gcd(this.n, this.d);
		if (nd_gcd != 1) { // 約分. 會把 0/? 變成 0/1
			this.n /= nd_gcd;
			this.d /= nd_gcd;
		}
	}
	
	add(frac) { // 分數 + 分數
		return new Frac(this.n * frac.d + this.d * frac.n, this.d * frac.d);
	}
	addi(i) { // 分數 + 整數
		return this.add(new Frac(i));
	}
	
	sub(frac) { // 分數 - 分數
		return new Frac(this.n * frac.d - this.d * frac.n, this.d * frac.d);
	}
	subi(i) { // 分數 - 整數
		return this.sub(new Frac(i));
	}
	
	mul(frac) { // 乘法
		return new Frac(this.n * frac.n, this.d * frac.d);
	}
	muli(i) { // 分數 * 整數
		return this.mul(new Frac(i));
	}
	
	div(frac) { // 除法
		return new Frac(this.n * frac.d, this.d * frac.n);
	}
	
	sqrt() { // 開根號. 若出現複數或根號無法約分, 回傳 null
		if (!isPerfectSquare(this.n) || !isPerfectSquare(this.d)) return null;
		return new Frac(Math.sqrt(this.n), Math.sqrt(this.d));
	}
	
	equal(frac) { // 比較兩個分數是否相同
		return this.n == frac.n && this.d == frac.d;
	}
}

export class ConjugateRoot { // 共軛根
	static fromPoly(frac_a, frac_b, frac_c) { // 由二次式計算共軛根
		const frac_axis = frac_b.muli(-1).div(frac_a.muli(2))
		const frac_sqrt = frac_axis.mul(frac_axis).sub(frac_c.div(frac_a))
		return new ConjugateRoot(
			frac_axis.n * frac_sqrt.d,
			frac_axis.d,
			frac_sqrt.n * frac_sqrt.d,
			frac_axis.d * frac_sqrt.d
		);
	}
	
	std() { // 標準化
		
	}
	
	constructor(n, m, s, d) { // (n ± m√s) / d
		this.n = n;
		this.m = m;
		this.s = s;
		this.d = d;
		this.std();
	}
}

export function makeLatexTerm(coef, s_base, pow, drawCdot = false) { // 根據係數, 底數名稱, 次方數生成 latex 語法
	const frac_coef = (typeof coef === "number" ? new Frac(coef) : coef);
	
	if (frac_coef.n == 0) return ""; // 係數為 0, 那這一項就不存在
	
	let s_coefLatex = ""; // 係數部分的 latex 字串
	if (frac_coef.isInt()) { // 若係數為整數, 將參數 (分數型態) 轉為整數的 latex
		if (frac_coef.n == 1) s_coefLatex = "";
		else if (frac_coef.n == -1) s_coefLatex = "-";
		else s_coefLatex = `${frac_coef.n}`; // 如果整數不為 1 或 -1, 顯示係數
		
		if (Math.abs(frac_coef.n) == 1 && pow == 0) s_coefLatex += "1";
		
		if (frac_coef.n > 0) s_coefLatex = "+" + s_coefLatex; // 若參數為正整數, 需要在前面補 "+"
		
		if (drawCdot && Math.abs(frac_coef.n) > 1 && pow != 0) s_coefLatex += "\\cdot"; // 是否要繪製乘法
	} else { // 若係數為分數
		s_coefLatex = `+${frac_coef.toLatex()}`;
	}
	
	let s_varLatex = ""; // 變數部分的 latex
	if (pow != 0){
		s_varLatex += s_base; // 次方不為 0, 顯示底數
		if (pow != 1) s_varLatex = `{${s_varLatex}}^{${pow}}`; // 次方不為 0 or 1, 顯示指數
	}
	
	return s_coefLatex + s_varLatex;
}

export const isInt = (str) => /^-?\d+$/.test(str); // 某個字串是否為整數
