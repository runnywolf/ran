<template>
	<div class="ran-vk" ref="nodeRendered">
		<slot></slot>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import katex from "katex"; // Tex lib
import "katex/dist/katex.min.css"; // KaTex css

const nodeRendered = ref(null);

onMounted(() => walkAndrenderInlineKatex(nodeRendered.value));

function walkAndrenderInlineKatex(node) { // 對節點遞迴遍歷, 將 text node 內的 $...$ 區段渲染為 katex 語法
	if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== "") renderInlineKatex(node); // 對非空 text node 渲染
	const arr = node.childNodes;
	for (let i = arr.length-1; i >= 0; i--) walkAndrenderInlineKatex(arr[i]); // 遞迴 (因為插入多餘節點會讓 index 跑掉, 需要倒著遍歷)
}

function renderInlineKatex(textNode) { // 將 text node 內的 $...$ 區段渲染為 katex 語法
	const fragment = document.createDocumentFragment(); // text node 切分成的多個 text/span/div node
	
	const arr_strSplited2d = textNode.nodeValue.split("$$"); // 先對置中語法 $$...$$ 做解碼
	if (arr_strSplited2d.length % 2 === 0) { // 檢測到不成對的 $$...$$
		console.error('Unmatched $$...$$ pair, automatically closes with a trailing "$$".');
	}
	arr_strSplited2d.forEach((str_2d, i) => {
		if (str_2d.trim() === "") return; // 子字串沒有文字內容, 不渲染元素
		
		if (i % 2 === 1) fragment.appendChild(makeKatexNode(str_2d, true)); // odd index 的子字串為 $$...$$ 內的部分
		else { // even index 的子字串為 $$...$$ 外的部分, 需要對 $...$ 做解碼
			const arr_strSplited1d = str_2d.split("$"); // 對置中語法 $...$ 做解碼
			if (arr_strSplited1d.length % 2 === 0) { // 檢測到不成對的 $...$
				console.error('Unmatched $...$ pair, automatically closes with a trailing "$".');
			}
			arr_strSplited1d.forEach((str_1d, j) => {
				if (str_1d.trim() === "") return; // 子字串沒有文字內容, 不渲染元素
				
				if (j % 2 === 1) fragment.appendChild(makeKatexNode(str_1d, false)); // odd index 的子字串為 $...$ 內的部分
				else fragment.appendChild(document.createTextNode(str_1d)); // even index 的子字串為 $...$ 外的部分, 為普通字串
			});
		}
	});
	
	textNode.parentNode.replaceChild(fragment, textNode); // 將舊的 text node 替換成切割後的 nodes
}

function makeKatexNode(exp, isCenter) { // 生成一個內有 katex html 的 node
	const node = document.createElement(isCenter ? "div" : "span"); // 置中語法必須用 div 將 katex html 包起來
	node.className = "ran-vk-node";
	
	katex.render(exp, node, { displayMode: isCenter, throwOnError: false }); // 渲染 katex 元素
	return node;
}
</script>

<style>
.ran-vk .ran-vk-node {
	font-size: 16px;
}
.ran-vk span.ran-vk-node {
	white-space: nowrap; /* 禁止換行 */
	margin: 0 3px; /* 讓 latex 標籤與內文的間距再大一點 */
}
.ran-vk div.ran-vk-node { /* 當 $$...$$ 內的 latex 語法超出父 div 的寬度時, 出現滾動條 */
	overflow-x: auto;
}
</style>
