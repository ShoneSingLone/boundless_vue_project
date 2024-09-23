<template>
	<div>
		<xMd :md="md" />
		<div style="height: 300px">
			<xSteps direction="vertical" :active="1">
				<xStep title="步骤 1" />
				<xStep title="步骤 2" />
				<xStep title="步骤 3" description="这是一段很长很长很长的描述性文字" />
			</xSteps>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "竖直方向的步骤条。\n\n只需要在`xSteps`元素中设置`direction`属性为`vertical`即可。"
			};
		}
	});
}
</script>
<style lang="less"></style>
