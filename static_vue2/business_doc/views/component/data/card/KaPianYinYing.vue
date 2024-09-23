<template>
	<div class="card-JianDanKaPian">
		<xMd :md="mdTitle" />
		<xRow :gutter="12">
			<xCol :span="8">
				<xCard shadow="always"> 总是显示 </xCard>
			</xCol>
			<xCol :span="8">
				<xCard shadow="hover"> 鼠标悬浮时显示 </xCard>
			</xCol>
			<xCol :span="8">
				<xCard shadow="never"> 从不显示 </xCard>
			</xCol>
		</xRow>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle:
					"可对阴影的显示进行配置。\n通过`shadow`属性设置卡片阴影出现的时机：`always`、`hover`或`never`。\n\n> tiny主题没有阴影"
			};
		}
	});
}
</script>
<style lang="less">
.card-JianDanKaPian {
	.text {
		font-size: 14px;
	}

	.item {
		padding: 18px 0;
	}

	.box-card {
		width: 480px;
	}
}
</style>
