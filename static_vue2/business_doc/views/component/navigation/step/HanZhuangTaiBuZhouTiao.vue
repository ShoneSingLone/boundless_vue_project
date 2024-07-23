<template>
	<div>
		<xMd :md="md" />
		<xSteps :space="200" :active="1" finish-status="success">
			<xStep title="已完成" />
			<xStep title="进行中" />
			<xStep title="步骤 3" />
		</xSteps>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "每一步骤显示出该步骤的状态。\n\ndemo 也可以使用`title`具名分发，可以用`slot`的方式来取代属性的设置，在本文档最后的列表中有所有的 slot name 可供参考。",
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
