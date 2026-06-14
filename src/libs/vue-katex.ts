import katex from "katex"; // KaTex
import { replaceMacro } from "./katex-macro";

import "katex/dist/katex.min.css"; // KaTex css
import "@/styles/vue-katex.css";

const MATRIX_EXTRA_V_MARGIN_EM = 0.3; // 為矩陣語法額外添加垂直間距, 上下各添加所以是 0.3*2 em

function addExtraMarginToKatexNode(node: HTMLElement): void { // 為矩陣語法額外添加的垂直間距, 僅修改 katex node 的行高, 不回傳 node
	const strutNodesInKatexNode = Array.from(node.querySelectorAll<HTMLElement>(".strut"));
	const katexNodeLineHeightEm = Math.max(...strutNodesInKatexNode.map(el => parseFloat(el.style.height)));
	const lineHeightEm = katexNodeLineHeightEm * 1.21 + MATRIX_EXTRA_V_MARGIN_EM * 2; // 估出來剛好 1.21 倍, 我也不知道為啥
	node.style.lineHeight = `${lineHeightEm}em`;
}

export function renderKatex(node: HTMLElement, exp: string, isCenter: boolean): void { // 在 node 之下渲染 katex 語法
	exp = replaceMacro(exp); // 替換掉 @<ins>{...} 語法
	katex.render(exp, node, { displayMode: isCenter, throwOnError: false }); // 渲染 katex 元素
	if (!isCenter && exp.includes("matrix")) addExtraMarginToKatexNode(node); // 增加 span katex 的矩陣語法的垂直 margin
	else node.style.lineHeight = ""; // [v0.6.2-dev.1 fix] 在題目頁面, 點擊右側選單的切換題目安紐, 上一題的 line height 不會被更新的 bug
}

function makeKatexNode(exp: string, isCenter: boolean): HTMLElement { // 生成一個內有 katex html 的 node
	const node = document.createElement(isCenter ? "div" : "span"); // 置中語法必須用 div 將 katex html 包起來
	node.className = "ran-vk";
	renderKatex(node, exp, isCenter); // 在 node 之下渲染 katex 語法
	return node;
}

function splitStrToNodeAndStr(str: string, sep: string, strToNodeFn: (str: string) => Node): (Node|string)[] { // 將字串 str 根據分隔符 sep 交替切分成 toNode(.) 和 str
	const substrs = str.split(sep); // 根據分隔符 sep 將 str 切分成多個子字串
	
	if (substrs.length % 2 === 0) { // 檢測到不成對的 $...$ or $$...$$
		console.warn(`Unmatched ${sep}...${sep} pair, automatically closes with a trailing "${sep}".`);
	}
	const nodeOrStrArr: (Node|string)[] = [];
	substrs.forEach((substr, i) => {
		if (substr.trim() !== "") nodeOrStrArr.push(i % 2 === 1 ? strToNodeFn(substr) : substr); // odd index 代表子字串在 $...$ 內, 轉 katex node
	});
	return nodeOrStrArr;
}

function splitStrToKatexNodeAndStr(str: string): (Node|string)[] { // 將字串 str 根據分隔符 $$...$$ 切分, 再將剩餘子字串依照 $...$ 切分, 最後將字串轉 text node
	const sepList: Array<[string, (str: string) => Node]> = [
		["$$", str => makeKatexNode(str, true)],
		["$", str => makeKatexNode(str, false)]
	];
	
	let nodeOrStrArr: (Node|string)[] = [str];
	for (const [sep, strToNodeFn] of sepList) {
		nodeOrStrArr = nodeOrStrArr.flatMap(nodeOrStr => {
			if (typeof nodeOrStr === "string") return splitStrToNodeAndStr(nodeOrStr, sep, strToNodeFn); // 如果是 str, 嘗試切分
			return [nodeOrStr]; // 如果是 katex node, 不處理
		});
	}
	return nodeOrStrArr;
}

export function walkAndRenderKatex(node: Node|null): void { // 對節點遞迴遍歷, 將 text node 內的 $$...$$ and $...$ 區段渲染為 katex node
	if (!(node instanceof Element)) return; // node 必須可以操作子元素
	
	const nodeOrStrArr: (Node|string)[] = []; // 使用 nodeOrStrArr 可以一次插入多個 node, 只會觸發一次 repaint
	for (const childNode of node.childNodes) {
		if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue?.trim() !== "") { // 對非空 text node 切分並渲染
			nodeOrStrArr.push(...splitStrToKatexNodeAndStr(childNode.nodeValue ?? ""));
		} else {
			walkAndRenderKatex(childNode);
			nodeOrStrArr.push(childNode); // 若不是 text node, 往 child node 搜尋
		}
	}
	node.replaceChildren(...nodeOrStrArr); // 取代舊的 node
}
