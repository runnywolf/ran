import katex from "katex"; // KaTex
import "katex/dist/katex.min.css"; // KaTex css
import "@/styles/vue-katex.css";

const matrixMacro = (mode, exp) => { // 矩陣專用巨集, 注意: 會強制把 "," 轉為 "&", ";" -> "\\"
	exp = exp.replaceAll(",", "&").replaceAll(";", "\\\\");
	return `\\begin{${mode}matrix}${exp}\\end{${mode}matrix}`;
};

const katexMacros = { // @<ins>{...} -> fn(...)
	"m": exp => matrixMacro("", exp),
	"pm": exp => matrixMacro("p", exp),
	"bm": exp => matrixMacro("b", exp),
	"vm": exp => matrixMacro("v", exp),
};

function throwIdiotError() {
	throw new Error('[vue-katex][replaceMacro] You idiot, use "@...{...}".'); // @... 後必須接 {...}
}

function splitByBraces(str) { // 將 "<a>{<b>}<c>" 轉為 ["<a>", "<b>", "<c>"]
	const leftBraceIndex = str.indexOf("{");
	
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
	const expArr = exp.split("@"); // 根據指令符 "@" 切分
	const resultExpArr = [ expArr.shift() ]; // 第一個子字串一定不是指令區域
	
	expArr.forEach(subExp => {
		if (!subExp.includes("{") || !subExp.includes("}")) throwIdiotError(); // @<ins> 後必須接 {...}
		
		const [ins, innerBraces, outerBraces] = splitByBraces(subExp); // @<ins>{<innerBraces>}<outerBraces>
		if (ins in katexMacros) resultExpArr.push(katexMacros[ins](innerBraces)); // replace macro
		resultExpArr.push(outerBraces); // 不在指令作用範圍內的 latex 表達式
	});
	return resultExpArr.join(""); // 合併 substr
}

function makeKatexNode(exp, isCenter) { // 生成一個內有 katex html 的 node
	const node = document.createElement(isCenter ? "div" : "span"); // 置中語法必須用 div 將 katex html 包起來
	node.className = "ran-vk";
	
	katex.render(replaceMacro(exp), node, { displayMode: isCenter, throwOnError: false }); // 渲染 katex 元素
	return node;
}

function splitStrToNodeAndStr(str, sep, strToNodeFn) { // 將字串 str 根據分隔符 sep 切分成多個 node (katex node / string)
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
