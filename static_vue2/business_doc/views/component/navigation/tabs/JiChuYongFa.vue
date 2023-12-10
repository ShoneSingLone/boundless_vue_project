<template>
	<div>
		<Md :md="md" />
		<xTabs v-model="activeName" @tabClick="handleClick">
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
				md: "基础的、简洁的标签页。\nTabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。",
				activeName: "second"
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	});
}
</script>
<style lang="less"></style>
