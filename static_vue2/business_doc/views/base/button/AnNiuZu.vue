<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xBtnGroup>
			<xBtn preset="primary" icon="el-icon-arrow-left">上一页</xBtn>
			<xBtn preset="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></xBtn>
		</xBtnGroup>
		<xBtnGroup>
			<xBtn preset="primary" icon="el-icon-edit"></xBtn>
			<xBtn preset="primary" icon="el-icon-share"></xBtn>
			<xBtn preset="primary" icon="el-icon-delete"></xBtn>
		</xBtnGroup>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "以按钮组的方式出现，常用于多项类似操作。\n\n使用`<xBtnGroup>`标签来嵌套你的按钮。"
			};
		}
	});
}
</script>
<style lang="less"></style>
