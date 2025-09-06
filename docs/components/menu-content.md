---
outline: [2, 3] # 顯示 h2, h3
---

# MenuContent - 左側清單佈局
將[側邊欄佈局](./sidebar-content)的側邊欄改成可以切換路由的清單。

## 範例
```vue
<template>
	<MenuContent :optionConfigArr="arr">
		右側的主要內容
	</MenuContent>
</template>

<script setup>
import MenuContent from "@/components/layout/MenuContent.vue";

const arr = [
	{ iconName: "圖示名稱", label: "選項名稱", to: "跳轉網址", tooltip: "tooltip" },
];
</script>
```

- 圖示名稱可以參考 [Tocas UI](https://tocas-ui.com/5.0/zh-tw/icon.html) 的 class name，記得去除頭尾的 `is-...-icon`。
- 跳轉網址同 `router-link` 的 `:to` 參數。
