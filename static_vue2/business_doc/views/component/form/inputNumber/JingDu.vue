<template>
	<div>
		<xMd :md="md" />
		<xInputNumber v-model="num" :precision="2" :step="0.1" :max="10"></xInputNumber>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置 `precision` 属性可以控制数值精度，接收一个 `Number`。",
				num: 2
			};
		}
	});
}
</script>
<style lang="less"></style>
