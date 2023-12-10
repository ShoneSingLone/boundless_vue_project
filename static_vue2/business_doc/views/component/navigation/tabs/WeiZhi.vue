<template>
	<div>
		<Md :md="md" />
		<el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
			<el-radio-button label="top">top</el-radio-button>
			<el-radio-button label="right">right</el-radio-button>
			<el-radio-button label="bottom">bottom</el-radio-button>
			<el-radio-button label="left">left</el-radio-button>
		</el-radio-group>

		<xTabs :tab-position="tabPosition" style="height: 200px">
			<xTabPane label="用户管理">用户管理</xTabPane>
			<xTabPane label="配置管理">配置管理</xTabPane>
			<xTabPane label="角色管理">角色管理</xTabPane>
			<xTabPane label="定时任务补偿">定时任务补偿</xTabPane>
		</xTabs>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: '可以通过 `tab-position` 设置标签的位置\n标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`',
				tabPosition: "left"
			};
		}
	});
}
</script>
<style lang="less"></style>
