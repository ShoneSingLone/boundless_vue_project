<template>
	<div>
		<xMd :md="md" />
		<xSteps :active="1">
			<xStep title="步骤 1" icon="edit" />
			<xStep title="步骤 2" icon="upload" />
			<xStep title="步骤 3" icon="picture" />
		</xSteps>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "步骤条内可以启用各种自定义的图标。\n\n通过`icon`属性来设置图标，图标的类型可以参考 `xIcon` 组件的文档，除此以外，还能通过具名`slot`来使用自定义的图标。",
				active: 0
			};
		}
	});
}
</script>
<style lang="less"></style>
