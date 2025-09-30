const matrixMacro = (mode, exp) => { // 矩陣專用巨集, 注意: 會強制把 "," 轉為 "&", ";" -> "\\"
	exp = exp.replaceAll(",", "&").replaceAll(";", "\\\\");
	exp = `\\begin{${mode}matrix}${exp}\\end{${mode}matrix}`; // 矩陣語法
	if (mode === "b") exp = `\\!${exp}\\!`; // 因為 bmatrix 的左右間距太寬了, 減少一點
	if (exp.includes("frac")) exp = `\\def\\arraystretch{1.35}${exp}\\def\\arraystretch{1}`; // 如果矩陣元素包含分數, 則增加列距
	return exp;
};
const fracMacro = (mode, exp) => { // 分數專用巨集, 注意: 會根據第一個 ";" 切分出分子和分母
	const [n, d] = exp.split(";");
	return `\\${mode}frac{${n}}{${d}}`;
};

const katexMacros = { // @<ins>{...} -> ...
	"m": exp => matrixMacro("", exp), // "@?m{ a, b; c, d }" -> "\begin{?matrix} a & b \\ c & d \end{?matrix}"
	"pm": exp => matrixMacro("p", exp),
	"bm": exp => matrixMacro("b", exp),
	"vm": exp => matrixMacro("v", exp),
	"f": exp => fracMacro("", exp), // "@?f{<n>;<d>}" -> "\?frac{<n>}{<d>}"
	"tf": exp => fracMacro("t", exp),
	"df": exp => fracMacro("d", exp),
	"cf": exp => fracMacro("c", exp),
	"()": exp => `\\left(${exp}\\right)`, // 括號會隨著內容大小變化的語法: "@(){ ... }" -> "\left( ... \right)"
};

function throwIdiotError() {
	throw new Error('[vue-katex][replaceMacro] You idiot, use "@...{...}".'); // @... 後必須接 {...}
}

function splitByBraces(str) { // 將 "<a>{<b>}<c>" 轉為 ["<a>", "<b>", "<c>"]
	const leftBraceIndex = str.indexOf("{"); // 找出字串中第一個 {
	
	let depth = 0; // 巢狀 {} 的深度, 為了取出 {...} 內的 ...
	for (let i = leftBraceIndex; i < str.length; i++) {
		if (str[i] === "{") depth++;
		if (str[i] === "}") {
			depth--;
			if (depth === 0) return [
				str.slice(0, leftBraceIndex), // a
				str.slice(leftBraceIndex + 1, i), // b
				str.slice(i+1) // c
			];
		}
	}
	throwIdiotError();
}

export function replaceMacro(exp) { // 將 ran 的自訂巨集替換成 katex 標準語法: @<ins>{...} -> ...
	const firstAtSignIndex = exp.indexOf("@"); // 找出字串中第一個 @
	if (firstAtSignIndex === -1) return exp; // 沒有出現 @ 代表沒有要替換的巨集
	
	let resultExp = exp.slice(0, firstAtSignIndex); // @ 左側的語法與自訂語法無關, 不需要處理, 直接放到替換結果
	
	const atSignRightExp = exp.slice(firstAtSignIndex + 1); // @ 右側的語法, 形式為 "<ins>{<in>}<out>"
	const [ins, innerBraces, outerBraces] = splitByBraces(atSignRightExp); // 將 "<ins>{<in>}<out>" 切分成 [ins, in, out]
	
	if (ins in katexMacros) resultExp += katexMacros[ins](replaceMacro(innerBraces)); // 替換掉 inner 的巨集, 然後將 ins+inner 轉為 katex 標準語法
	else console.warn(`[ran-katex-macro] Unknown macro ins "@${ins}{...}".`);
	
	return resultExp + replaceMacro(outerBraces); // outer 也需要替換巨集, 因為可能會出現下一個 @
}
