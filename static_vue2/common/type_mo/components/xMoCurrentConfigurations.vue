<template>
	<xBlock :header="i18n('current_allocation')" class="xMoCurrentConfigurations">
		<xForm
			col="1"
			style="width: var(--xMoCurrentConfigurations-width); --xItem-label-width: 80px">
			<xItemDesc :item="itemConfigs" v-for="(itemConfigs, prop) in items" :key="prop" />
			<!-- {{ items }} -->
		</xForm>
	</xBlock>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: ["items"]
	});
}
</script>
<style lang="less">
.xMoCurrentConfigurations {
	max-height: 100%;
	overflow: hidden;
	&.xBlock {
		display: flex;
		flex-flow: column nowrap;
		.el-card__header + .el-card__body {
			flex: 1;
			overflow: auto;
			overflow-x: hidden;
		}
	}
	.xForm .xFormItem {
		margin: 0;
	}
}
</style>
