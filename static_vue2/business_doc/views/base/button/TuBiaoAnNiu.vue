<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xBtn preset="primary" icon="el-icon-edit"></xBtn>
		<xBtn preset="primary" icon="el-icon-share"></xBtn>
		<xBtn preset="primary" icon="el-icon-delete"></xBtn>
		<xBtn preset="primary" icon="el-icon-search">搜索</xBtn>
		<xBtn preset="primary">上传<i class="el-icon-upload el-icon--right"></i></xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。\n\n设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。"
			};
		}
	});
}
</script>
<style lang="less"></style>
