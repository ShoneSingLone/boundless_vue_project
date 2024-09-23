<template>
	<div>
		<xMd :md="md" />
		<xRadioGroup v-model="tabPosition" style="margin-bottom: 30px">
			<xRadioButton label="top">top</xRadioButton>
			<xRadioButton label="right">right</xRadioButton>
			<xRadioButton label="bottom">bottom</xRadioButton>
			<xRadioButton label="left">left</xRadioButton>
		</xRadioGroup>

		<xTabs :tab-position="tabPosition" style="height: 200px">
			<xTabPane label="用户管理">用户管理</xTabPane>
			<xTabPane label="配置管理">配置管理</xTabPane>
			<xTabPane label="角色管理">角色管理</xTabPane>
			<xTabPane label="定时任务补偿">定时任务补偿</xTabPane>
		</xTabs>
	</div>
</template>
<script lang="ts">
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
