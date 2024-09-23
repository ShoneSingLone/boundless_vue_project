<template>
	<div>
		<xMd :md="md" />
		<xSteps :active="1">
			<xStep title="步骤 1" description="这是一段很长很长很长的描述性文字" />
			<xStep title="步骤 2" description="这是一段很长很长很长的描述性文字" />
			<xStep title="步骤 3" description="这段就没那么长了" />
		</xSteps>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "每个步骤有其对应的步骤状态描述。"
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
