<template>
	<div>
		<Md :md="md" />
		<xTabs type="border-card">
			<xTabPane>
				<template #label>
					<span><i class="el-icon-date"></i> 我的行程</span>
				</template>
				我的行程
			</xTabPane>
			<xTabPane label="消息中心">消息中心</xTabPane>
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
				md: "可以通过具名 `slot` 来实现自定义标签页的内容"
			};
		}
	});
}
</script>
<style lang="less"></style>
