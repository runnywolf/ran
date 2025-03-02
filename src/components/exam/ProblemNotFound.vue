<template>
	<Content :borderColor="'#f33'" :bgColor="'#fdd'">
		找不到這一題的設定檔 ٩(ŏ﹏ŏ、)۶ ，請檢查 console。
	</Content>
</template>

<script setup> // 若題目 vue 檔的路徑不存在, 會將題目替換成這個組件
import Content from "@/components/Content.vue"; // testing
</script>
