<template>
	<div>
		<xMd :md="md" />

		<xSteps :active="1" simple>
			<xStep title="步骤 1" icon="edit" />
			<xStep title="步骤 2" icon="upload" />
			<xStep title="步骤 3" icon="picture" />
		</xSteps>

		<xSteps :active="1" finish-status="success" simple style="margin-top: 20px">
			<xStep title="步骤 1" />
			<xStep title="步骤 2" />
			<xStep title="步骤 3" />
		</xSteps>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置 `simple` 可应用简洁风格，该条件下 `align-center` / `description` / `direction` / `space` 都将失效。"
			};
		}
	});
}
</script>
<style lang="less"></style>
