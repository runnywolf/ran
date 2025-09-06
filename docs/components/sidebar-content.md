---
outline: [2, 3] # 顯示 h2, h3
---

# SidebarContent - 側邊欄佈局
帶有一個側邊欄和右側主要內容的佈局。

## 範例
```vue
<template>
	<SidebarContent>
		<template #sidebar>
			側邊欄的內容
		</template>
		<template #content>
			右側的主要內容
		</template>
	</SidebarContent>
</template>

<script setup>
import SidebarContent from "@/components/layout/SidebarContent.vue";
</script>
```
