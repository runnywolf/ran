import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
	base: "/cs-math",
  plugins: [vue()],
	resolve: {
    alias: {"@": "/src"}
  },
})
