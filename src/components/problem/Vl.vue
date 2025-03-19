<template>
	<VueLatex :expression="exp" :displayMode="c" />
</template>

<script setup> // 壓縮 vatex 標籤字符數的組件
import { VueLatex } from "vatex";

const props = defineProps({
	exp: String, // latex 表達式
	c: { type: Boolean, default: false } // 是否置中
});
</script>
