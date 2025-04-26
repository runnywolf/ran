export function removePrefix(str, prefix) { // 移除字串開頭
	if (str.startsWith(prefix)) return str.slice(prefix.length);
	return str;
}

export function removePostfix(str, postfix) { // 移除字串尾部
	if (str.endsWith(postfix)) return str.slice(0, -postfix.length);
	return str;
}
