<template>
	<div style="--xItem-label-width: 200px" id="x-form-demo-position">
		<xMd :md="md" />
		<xForm>
			<xItem class="xItem-pos left" :configs="xItem_left" />
			<xItem :configs="xItem_right" />
		</xForm>
		<xMd :md="md2" />
		<xForm col="3">
			<xItem class="xItem-pos top" :configs="xItemTopLeft" />
			<xItem class="xItem-pos top center" :configs="xItemTopCenter" />
			<xItem class="xItem-pos top right" :configs="xItemTopRight" />
		</xForm>
		<xMd> ## 在父级元素上添加样式类可以作用于子元素 </xMd>
		<xMd> ### xItem-pos left 水平居左</xMd>
		<xForm class="xItem-pos left">
			<xItem :configs="xItemTopLeft" />
			<xItem :configs="xItemTopLeft" />
		</xForm>
		<xMd> ### xItem-pos top right 垂直居右</xMd>
		<xForm class="xItem-pos top right">
			<xItem :configs="xItemTopRight" />
			<xItem :configs="xItemTopRight" />
		</xForm>
		<xMd> ### xForm 上的col</xMd>
		<xForm col="3">
			<xItem :configs="xItemTopRight" span="full" />
			<xItem :configs="xItemTopRight" />
			<xItem :configs="xItemTopRight" />
			<xItem :configs="xItemTopRight" />
		</xForm>
		<xMd> ## 其他的可以自行扩展（添加足够的用例）</xMd>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			const xItemInput = position => ({
				value: "默认水平居右,垂直居左",
				label: `${position}`,
				tips: position,
				msg: new Array(50).fill(position).join("\n")
			});
			return {
				md: `
> 使用 预置class 改变label 位置

\`\`\`html
<xItem class="xItem-pos left" :configs="xItem_left" />
/* 默认居右 */
<xItem :configs="xItem_left" />
\`\`\``,
				md2: `
## Top-(left center right)

\`\`\`html
/* 默认居左 */
<xItem class="xItem-pos top" :configs="xItemTopLeft" />
<xItem class="xItem-pos top center" :configs="xItemTopCenter" />
<xItem class="xItem-pos top right" :configs="xItemTopRight" />
\`\`\``,
				xItem_left: xItemInput("left"),
				xItem_right: xItemInput("right"),
				xItemTopLeft: xItemInput("top-left"),
				xItemTopCenter: xItemInput("top center"),
				xItemTopRight: xItemInput("top right")
			};
		}
	});
}
</script>
<style lang="less">
#x-form-demo-position {
	.xForm {
		outline: 1px solid royalblue;
		.xFormItem {
			outline: 1px dashed darkcyan;
		}
	}
	.xItem-label-controller {
		outline: 1px dashed darkcyan;
		.xItem_label {
			outline: 1px dashed red;
		}
	}
}
</style>
