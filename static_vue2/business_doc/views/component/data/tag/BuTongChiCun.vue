<template>
	<div class="margin16 BuTongChiCun">
		<xMd
			:md="'Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。\n 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。'" />
		<xTag closable>默认标签</xTag>
		<xTag size="medium" closable>中等标签</xTag>
		<xTag size="small" closable>小型标签</xTag>
		<xTag size="mini" closable>超小标签</xTag>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({});
}
</script>
