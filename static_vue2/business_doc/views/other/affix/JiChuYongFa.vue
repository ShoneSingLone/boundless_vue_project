<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xAffix :offset="120">
			<xBtn preset="primary">基础用法 Offset top 120px</xBtn>
		</xAffix>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `固钉默认固定在页面顶部。
通过设置 \`offset\` 属性来改变吸顶距离，默认值为 0。`
			};
		}
	});
}
</script>
