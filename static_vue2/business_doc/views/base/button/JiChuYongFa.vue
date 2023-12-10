<template>
	<div class="card-JiChuYongFa">
		<Md :md="mdTitle" />
		<el-row>
			<xBtn @click="testLoading">Click me!</xBtn>
			<xBtn preset="primary" @mouseenter="testLoading">主要按钮</xBtn>
			<xBtn preset="success">成功按钮</xBtn>
			<xBtn preset="info">信息按钮</xBtn>
			<xBtn preset="warning">警告按钮</xBtn>
			<xBtn preset="danger">危险按钮</xBtn>
		</el-row>

		<el-row>
			<xBtn plain>朴素按钮</xBtn>
			<xBtn preset="primary" plain>主要按钮</xBtn>
			<xBtn preset="success" plain>成功按钮</xBtn>
			<xBtn preset="info" plain>信息按钮</xBtn>
			<xBtn preset="warning" plain>警告按钮</xBtn>
			<xBtn preset="danger" plain>危险按钮</xBtn>
		</el-row>

		<el-row>
			<xBtn round>圆角按钮</xBtn>
			<xBtn preset="primary" round>主要按钮</xBtn>
			<xBtn preset="success" round>成功按钮</xBtn>
			<xBtn preset="info" round>信息按钮</xBtn>
			<xBtn preset="warning" round>警告按钮</xBtn>
			<xBtn preset="danger" round>危险按钮</xBtn>
		</el-row>

		<el-row>
			<xBtn icon="el-icon-search" circle></xBtn>
			<xBtn preset="primary" icon="el-icon-edit" circle></xBtn>
			<xBtn preset="success" icon="el-icon-check" circle></xBtn>
			<xBtn preset="info" icon="el-icon-message" circle></xBtn>
			<xBtn preset="warning" icon="el-icon-star-off" circle></xBtn>
			<xBtn preset="danger" icon="el-icon-delete" circle></xBtn>
		</el-row>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		methods: {
			async testLoading() {
				_.$msgSuccess("点击成功");
				await _.$sleep(1000 * 3);
				_.$msgSuccess("等待结束");
			}
		},
		data() {
			return {
				mdTitle: "基础的按钮用法。\n\n使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。"
			};
		}
	});
}
</script>
<style lang="less"></style>
