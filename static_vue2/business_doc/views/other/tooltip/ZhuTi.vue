<template>
	<div class="tooltip-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xTooltip content="Top center" placement="top">
			<xBtn>Dark</xBtn>
		</xTooltip>
		<xTooltip content="Bottom center" placement="bottom" effect="light">
			<xBtn>Light</xBtn>
		</xTooltip>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"Tooltip 组件提供了两个不同的主题：`dark`和`light`。\n\n" +
					"通过设置`effect`属性来改变主题，默认为`dark`。"
			};
		}
	});
}
</script>
<style lang="less"></style>
