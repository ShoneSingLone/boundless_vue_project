<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<el-row>
			<xBtn>默认按钮</xBtn>
			<xBtn size="medium">中等按钮</xBtn>
			<xBtn size="small">小型按钮</xBtn>
			<xBtn size="mini">超小按钮</xBtn>
		</el-row>
		<el-row>
			<xBtn :ripple="false" round>默认按钮</xBtn>
			<xBtn :ripple="false" size="medium" round>中等按钮</xBtn>
			<xBtn :ripple="false" size="small" round>小型按钮</xBtn>
			<xBtn :ripple="false" size="mini" round>超小按钮</xBtn>
		</el-row>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。\n\n额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。\n\n>round禁止使用`ripple`"
			};
		}
	});
}
</script>
<style lang="less"></style>
