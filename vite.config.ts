import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
	base: "/ran/", // ran 的路徑
	plugins: [vue()],
	resolve: {
		alias: { // import js 的路徑別名 (ts 的好像只要設 tsconfig.json)
			"@": "/src", // @ 代表 /src
			"ran-math": "/src/libs/ran-math.js", // 可以直接 import { ... } from "ran-math"
			"toast": "/src/libs/toast.js"
		}
	},
	test: { // 測試: npx vitest run --coverage
		include: [ "src/tests/**/*.test.js" ], // 執行這些測試文件 (*.test.js)
		coverage: { // 使用 v8 做覆蓋率測試
			all: false, // 不顯示未執行的檔案
			reporter: [ "text", "html" ], // result web: start coverage/index.html
		},
	},
})
