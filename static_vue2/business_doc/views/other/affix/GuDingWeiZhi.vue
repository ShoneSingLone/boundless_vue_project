<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xAffix position="bottom" :offset="20">
			<xBtn preset="warning">固定的位置 Offset bottom 20px</xBtn>
		</xAffix>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `Affix 组件提供 2 个固定的位置参数 \`top\` 和 \`bottom\`。

通过设置 position 属性来改变固定位置，默认值为 top 。`
			};
		}
	});
}
</script>
