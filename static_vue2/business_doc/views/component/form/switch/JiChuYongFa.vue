<template>
	<div>
		<xMd :md="md" />
		<xSwitch v-model="value" active-color="#13ce66" inactive-color="#ff4949" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "绑定`v-model`到一个`Boolean`类型的变量。可以使用`active-color`属性与`inactive-color`属性来设置开关的背景色。",
				value: true
			};
		}
	});
}
</script>
<style lang="less"></style>
