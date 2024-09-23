<template>
	<div>
		<xMd :md="md" />
		<xSteps :active="2" align-center>
			<xStep title="步骤1" description="这是一段很长很长很长的描述性文字" />
			<xStep title="步骤2" description="这是一段很长很长很长的描述性文字" />
			<xStep title="步骤3" description="这是一段很长很长很长的描述性文字" />
			<xStep title="步骤4" description="这是一段很长很长很长的描述性文字" />
		</xSteps>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "标题和描述都将居中。"
			};
		}
	});
}
</script>
<style lang="less"></style>
