<template>
	<div class="card-JianDanKaPian">
		<Md :md="mdTitle" />
		<el-row :gutter="12">
			<el-col :span="8">
				<xCard shadow="always"> 总是显示 </xCard>
			</el-col>
			<el-col :span="8">
				<xCard shadow="hover"> 鼠标悬浮时显示 </xCard>
			</el-col>
			<el-col :span="8">
				<xCard shadow="never"> 从不显示 </xCard>
			</el-col>
		</el-row>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "可对阴影的显示进行配置。\n通过`shadow`属性设置卡片阴影出现的时机：`always`、`hover`或`never`。"
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
