import katex from "katex"; // KaTex
import "katex/dist/katex.min.css"; // KaTex css
import "@/styles/vue-katex.css";

const matrixMacro = (mode, exp) => { // 矩陣專用巨集, 注意: 會強制把 "," 轉為 "&", ";" -> "\\"
	exp = exp.replaceAll(",", "&").replaceAll(";", "\\\\");
	exp = `\\begin{${mode}matrix}${exp}\\end{${mode}matrix}`; // 矩陣語法
	if (mode === "b") exp = `\\!${exp}\\!`; // 因為 bmatrix 的左右間距太寬了, 減少一點
	if (exp.includes("frac")) exp = `\\def\\arraystretch{1.35}${exp}\\def\\arraystretch{1}`; // 如果矩陣元素包含分數, 則增加列距
	return exp;
};

const katexMacros = { // @<ins>{...} -> fn(...)
	"m": exp => matrixMacro("", exp),
	"pm": exp => matrixMacro("p", exp), // "@?m{ a, b; c, d }" -> "\begin{?matrix} a & b \\ c & d \end{?matrix}"
	"bm": exp => matrixMacro("b", exp),
	"vm": exp => matrixMacro("v", exp),
	"()": exp => `\\left(${exp}\\right)`, // 括號會隨著內容大小變化的語法: "@(){ ... }" -> "\left( ... \right)"
	"f": exp => { const [n, d] = exp.split(";"); return `\\frac{${n}}{${d}}`; }, // "@f{<n>;<d>}" -> "\frac{<n>}{<d>}"
};

const MATRIX_EXTRA_V_MARGIN_EM = 0.3; // 為矩陣語法額外添加垂直間距, 上下各添加所以是 0.3*2 em

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

function replaceMacro(exp) { // 將 ran 的自訂語法替換掉: @<ins>{...} -> fn(...)
	const firstAtSignIndex = exp.indexOf("@"); // 找出字串中第一個 @
	if (firstAtSignIndex === -1) return exp; // 沒有出現 @ 代表沒有要替換的巨集
	
	let resultExp = exp.slice(0, firstAtSignIndex); // @ 左側的語法與自訂語法無關, 不需要處理, 直接放到替換結果
	
	const atSignRightExp = exp.slice(firstAtSignIndex + 1); // @ 右側的語法, 形式為 "<ins>{<in>}<out>"
	const [ins, innerBraces, outerBraces] = splitByBraces(atSignRightExp); // 將 "<ins>{<in>}<out>" 切分成 [ins, in, out]
	if (ins in katexMacros) resultExp += katexMacros[ins](replaceMacro(innerBraces)); // 替換掉 inner 的巨集, 然後將結果插入到巨集之中
	return resultExp + replaceMacro(outerBraces); // outer 也需要替換巨集, 因為可能會出現下一個 @
}

function addExtraMarginToKatexNode(node) { // 為矩陣語法額外添加的垂直間距, 僅修改 katex node 的行高, 不回傳 node
	const strutNodesInKatexNode = Array.from(node.querySelectorAll(".strut"));
	const katexNodeLineHeightEm = Math.max(...strutNodesInKatexNode.map(el => parseFloat(el.style.height)));
	const lineHeightEm = katexNodeLineHeightEm * 1.21 + MATRIX_EXTRA_V_MARGIN_EM * 2; // 估出來剛好 1.21 倍, 我也不知道為啥
	node.style.lineHeight = `${lineHeightEm}em`;
}

export function renderKatex(node, exp, isCenter) { // 在 node 之下渲染 katex 語法
	exp = replaceMacro(exp); // 替換掉 @<ins>{...} 語法
	katex.render(exp, node, { displayMode: isCenter, throwOnError: false }); // 渲染 katex 元素
	if (!isCenter && exp.includes("matrix")) addExtraMarginToKatexNode(node); // 增加 span katex 的矩陣語法的垂直 margin
}

function makeKatexNode(exp, isCenter) { // 生成一個內有 katex html 的 node
	const node = document.createElement(isCenter ? "div" : "span"); // 置中語法必須用 div 將 katex html 包起來
	node.className = "ran-vk";
	renderKatex(node, exp, isCenter); // 在 node 之下渲染 katex 語法
	return node;
}

function splitStrToNodeAndStr(str, sep, strToNodeFn) { // 將字串 str 根據分隔符 sep 交替切分成 toNode(.) 和 str
	const substrs = str.split(sep); // 根據分隔符 sep 將 str 切分成多個子字串
	
	if (substrs.length % 2 === 0) { // 檢測到不成對的 $...$ or $$...$$
		console.warn(`Unmatched ${sep}...${sep} pair, automatically closes with a trailing "${sep}".`);
	}
	const nodeOrStrArr = [];
	substrs.forEach((substr, i) => {
		if (substr.trim() !== "") nodeOrStrArr.push(i % 2 === 1 ? strToNodeFn(substr) : substr); // odd index 代表子字串在 $...$ 內, 轉 katex node
	});
	return nodeOrStrArr;
}

function splitStrToKatexNodeAndStr(str) { // 將字串 str 根據分隔符 $$...$$ 切分, 再將剩餘子字串依照 $...$ 切分, 最後將字串轉 text node
	const sepList = [["$$", str => makeKatexNode(str, true)], ["$", str => makeKatexNode(str, false)]];
	
	let nodeOrStrArr = [str];
	for (const [sep, strToNodeFn] of sepList) {
		nodeOrStrArr = nodeOrStrArr.flatMap(nodeOrStr => {
			if (typeof nodeOrStr === "string") return splitStrToNodeAndStr(nodeOrStr, sep, strToNodeFn); // 如果是 str, 嘗試切分
			return [nodeOrStr]; // 如果是 katex node, 不處理
		});
	}
	return nodeOrStrArr;
}

export function walkAndRenderKatex(node) { // 對節點遞迴遍歷, 將 text node 內的 $$...$$ and $...$ 區段渲染為 katex node
	if (!(node && node.replaceChildren)) return; // node 必須可以操作子元素
	
	const nodeOrStrArr = []; // 使用 nodeOrStrArr 可以一次插入多個 node, 只會觸發一次 repaint
	for (const childNode of node.childNodes) {
		if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() !== "") { // 對非空 text node 切分並渲染
			nodeOrStrArr.push(...splitStrToKatexNodeAndStr(childNode.nodeValue));
		} else {
			walkAndRenderKatex(childNode);
			nodeOrStrArr.push(childNode); // 若不是 text node, 往 child node 搜尋
		}
	}
	node.replaceChildren(...nodeOrStrArr); // 取代舊的 node
}
