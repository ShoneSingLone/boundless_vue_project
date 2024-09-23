<template>
	<div>
		<xMd :md="md" />
		<xSteps :active="active" finish-status="success">
			<xStep title="步骤 1" />
			<xStep title="步骤 2" />
			<xStep title="步骤 3" />
		</xSteps>
		<xBtn style="margin-top: 12px" @click="next">下一步</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "简单的步骤条。\n\n设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始。需要定宽的步骤条时，设置`space`属性即可，它接受`Number`，单位为`px`，如果不设置，则为自适应。设置`finish-status`属性可以改变已经完成的步骤的状态。",
				active: 0
			};
		},
		methods: {
			next() {
				if (this.active++ > 2) this.active = 0;
			}
		}
	});
}
</script>
<style lang="less"></style>
