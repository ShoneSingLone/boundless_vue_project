<template>
	<div>
		<xMd :md="md" />
		<xInputNumber v-model="num" :step="2" step-strictly></xInputNumber>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "`step-strictly`属性接受一个`Boolean`。如果这个属性被设置为`true`，则只能输入步数的倍数。",
				num: 2
			};
		}
	});
}
</script>
<style lang="less"></style>
