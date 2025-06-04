import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
	base: "/ran/", // ran 的路徑
	plugins: [vue()],
	resolve: {
		alias: { // 路徑別名
			"@": "/src", // @ 代表 /src
			"ran-math": "/src/libs/RanMath.js" // 可以直接 import "RanMath"
		}
	},
	test: { // 測試: npx vitest run --coverage
		// include: [ "src/tests/**/*.test.js" ], // 執行這些測試文件 (*.test.js)
		include: [ "src/tests/ran-math/matrix.test.js" ], // 執行這些測試文件 (*.test.js)
		coverage: { // 使用 v8 做覆蓋率測試
			all: false, // 不顯示未執行的檔案
			reporter: [ "text", "html" ], // result web: start coverage/index.html
		},
	},
})
