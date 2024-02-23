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
<template>
	<xBlock :header="i18n('当前配置')" class="xMoCurrentConfigurations">
		<xForm col="1" style="width: var(--xMoCurrentConfigurations-width); --xdesc-item-width: 80px">
			<xDescItem :item="itemConfigs" v-for="(itemConfigs, prop) in items" :key="prop" />
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
