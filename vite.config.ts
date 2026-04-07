import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/ran/", // ran 的路徑
	plugins: [vue()],
	resolve: {
		alias: { // import js 的路徑別名
			"@": "/src", // @ 代表 /src
			"@lib": "/src/libs",
			"ran-math": "/src/libs/ran-math.js", // 可以直接 import { ... } from "ran-math"
			"toast": "/src/libs/toast.js"
		}
	},
	test: {
		include: [ // 測試檔案範圍
			"src/tests/ran-math-v3/sv.test.ts", // ran math v3
		],
		environment: "node",
		coverage: { // 測試: npx vitest run --coverage
			provider: "v8", // 使用 v8 覆蓋率引擎
			all: false, // 不顯示未執行的檔案
			reporter: ["text", "html"], // 終端 + 產生 coverage/index.html
		},
	},
})
