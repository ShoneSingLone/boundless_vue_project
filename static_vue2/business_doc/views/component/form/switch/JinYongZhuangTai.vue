<template>
	<div>
		<xMd :md="md" />
		<xSwitch v-model="value1" disabled />
		<xSwitch v-model="value2" disabled />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。`active-value`和`inactive-value`属性，接受`Boolean`, `String`或`Number`类型的值。",
				value1: true,
				value2: false
			};
		}
	});
}
</script>
<style lang="less"></style>
