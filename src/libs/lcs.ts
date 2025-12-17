// Max Weight Common Subsequence, 最大加權共同子序列

function strEqual(strA: string, strB: string): boolean { // 忽略大小寫的字串比較
	return strA.toLowerCase() === strB.toLowerCase();
}

// 根據 "target 與 query 的 LCS" 將 target 切分成多個子字串, 若子字串為 LCS 會標記為 isMatch
export function splitTargetByLcs(target: string, query: string): Array<{ substr: string, isMatch: boolean }> {
	const [n, m] = [target.length, query.length];
	const dpArr: number[][] = Array.from({ length: n+1 }, () => Array(m+1).fill(0)); // init dp arr
	for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
		if (strEqual(target[i-1], query[j-1])) dpArr[i][j] = dpArr[i-1][j-1] + 1;
		else dpArr[i][j] = Math.max(dpArr[i-1][j], dpArr[i][j-1]);
	}
	
	let [i, j] = [n, m]; // 從 dpArr[n][m] 開始回溯, 紀錄 target 的 lcs 部分
	const isTargetCharMatch: Array<boolean> = Array.from({ length: n }, () => false); // target 的 index i 是否為 lcs 部分
	while (i > 0 && j > 0) { // 回溯至 dp arr 的邊界
		if (strEqual(target[i-1], query[j-1]) && dpArr[i-1][j] !== dpArr[i][j]) { // 優先挑選靠前的序列
			isTargetCharMatch[i-1] = true; i--; j--;
		} else {
			dpArr[i-1][j] >= dpArr[i][j-1] ? i-- : j--;
		}
	}
	
	const segments: Array<{ substr: string, isMatch: boolean }> = []; // 多個子字串
	isTargetCharMatch.forEach((isMatch, i) => {
		const l = segments.length;
		if (l > 0 && segments[l-1].isMatch === isMatch) segments[l-1].substr += target[i]; // 如果字元與 tail substr 都是 lcs, 連接
		else segments.push({ substr: target[i], isMatch }); // 否則新增一個 substr
	});
	
	return segments;
}
