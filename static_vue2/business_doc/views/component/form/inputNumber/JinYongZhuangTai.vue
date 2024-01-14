<template>
	<div>
		<xMd :md="md" />
		<xInputNumber v-model="num" :disabled="true"></xInputNumber>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "`disabled`属性接受一个`Boolean`，设置为`true`即可禁用整个组件，如果你只需要控制数值在某一范围内，可以设置`min`属性和`max`属性，不设置`min`和`max`时，最小值为 0。",
				num: 1
			};
		}
	});
}
</script>
<style lang="less"></style>
