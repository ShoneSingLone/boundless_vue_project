<template>
	<div>
		<xMd :md="md" />
		<xTooltip :content="'Switch value: ' + value" placement="top">
			<xSwitch
				v-model="value"
				active-color="#13ce66"
				inactive-color="#ff4949"
				active-value="100"
				inactive-value="0" />
		</xTooltip>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置`active-value`和`inactive-value`属性，接受`Boolean`, `String`或`Number`类型的值。",
				value: "100"
			};
		}
	});
}
</script>
<style lang="less"></style>
