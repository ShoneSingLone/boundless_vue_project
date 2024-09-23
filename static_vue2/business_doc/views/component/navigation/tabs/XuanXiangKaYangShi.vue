<template>
	<div>
		<xMd :md="md" />
		<xTabs v-model="activeName" type="card" @tab-click="handleClick">
			<xTabPane label="用户管理" name="first">用户管理</xTabPane>
			<xTabPane label="配置管理" name="second">配置管理</xTabPane>
			<xTabPane label="角色管理" name="third">角色管理</xTabPane>
			<xTabPane label="定时任务补偿" name="fourth">定时任务补偿</xTabPane>
		</xTabs>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。",
				activeName: "first"
			};
		},
		methods: {
			handleClick({ tab, event }) {
				console.log(tab, event);
			}
		}
	});
}
</script>
<style lang="less"></style>
