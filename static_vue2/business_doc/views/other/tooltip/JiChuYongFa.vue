<template>
	<div class="tooltip-JiChuYongFa">
		<xMd :md="mdTitle" />
		<div class="box">
			<div class="top">
				<xTooltip
					class="item"
					effect="dark"
					content="Top Left 提示文字"
					placement="top-start">
					<xBtn>上左</xBtn>
				</xTooltip>
				<xTooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
					<xBtn>上边</xBtn>
				</xTooltip>
				<xTooltip
					class="item"
					effect="dark"
					content="Top Right 提示文字"
					placement="top-end">
					<xBtn>上右</xBtn>
				</xTooltip>
			</div>
			<div class="left">
				<xTooltip
					class="item"
					effect="dark"
					content="Left Top 提示文字"
					placement="left-start">
					<xBtn>左上</xBtn>
				</xTooltip>
				<xTooltip
					class="item"
					effect="dark"
					content="Left Center 提示文字"
					placement="left">
					<xBtn>左边</xBtn>
				</xTooltip>
				<xTooltip
					class="item"
					effect="dark"
					content="Left Bottom 提示文字"
					placement="left-end">
					<xBtn>左下</xBtn>
				</xTooltip>
			</div>

			<div class="right">
				<xTooltip
					class="item"
					effect="dark"
					content="Right Top 提示文字"
					placement="right-start">
					<xBtn>右上</xBtn>
				</xTooltip>
				<xTooltip
					class="item"
					effect="dark"
					content="Right Center 提示文字"
					placement="right">
					<xBtn>右边</xBtn>
				</xTooltip>
				<xTooltip
					class="item"
					effect="dark"
					content="Right Bottom 提示文字"
					placement="right-end">
					<xBtn>右下</xBtn>
				</xTooltip>
			</div>
			<div class="bottom">
				<xTooltip
					class="item"
					effect="dark"
					content="Bottom Left 提示文字"
					placement="bottom-start">
					<xBtn>下左</xBtn>
				</xTooltip>
				<xTooltip
					class="item"
					effect="dark"
					content="Bottom Center 提示文字"
					placement="bottom">
					<xBtn>下边</xBtn>
				</xTooltip>
				<xTooltip
					class="item"
					effect="dark"
					content="Bottom Right 提示文字"
					placement="bottom-end">
					<xBtn>下右</xBtn>
				</xTooltip>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"常用于展示鼠标 hover 时的提示信息。\n\n在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。\n\n" +
					' 使用`content`属性来决定`hover`时的提示信息。由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。如`placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。'
			};
		}
	});
}
</script>
<style lang="less"></style>
