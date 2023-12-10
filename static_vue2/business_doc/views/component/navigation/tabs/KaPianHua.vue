<template>
	<div>
		<Md :md="md" />
		<xTabs v-model="activeName" type="border-card">
			<xTabPane label="用户管理" name="first">用户管理</xTabPane>
			<xTabPane label="配置管理" name="second">配置管理</xTabPane>
			<xTabPane label="角色管理" name="third">角色管理</xTabPane>
			<xTabPane label="定时任务补偿" name="fourth">定时任务补偿</xTabPane>
		</xTabs>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "将`type`设置为`border-card`",
				activeName: "second"
			};
		}
	});
}
</script>
<style lang="less"></style>
