<template>
	<div>
		<xMd :md="md" />
		<xInputNumber v-model="num1"></xInputNumber>
		<xInputNumber size="medium" v-model="num2"></xInputNumber>
		<xInputNumber size="small" v-model="num3"></xInputNumber>
		<xInputNumber size="mini" v-model="num4"></xInputNumber>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "额外提供了 `medium`、`small`、`mini` 三种尺寸的数字输入框",
				num1: 1,
				num2: 1,
				num3: 1,
				num4: 1
			};
		}
	});
}
</script>
<style lang="less"></style>
