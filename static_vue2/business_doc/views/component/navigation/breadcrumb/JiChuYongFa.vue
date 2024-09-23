<template>
	<div>
		<xMd :md="md" />
		<xBreadcrumb separator="/">
			<xBreadcrumbItem :to="{ path: '/' }">首页</xBreadcrumbItem>
			<xBreadcrumbItem><a href="/">活动管理</a></xBreadcrumbItem>
			<xBreadcrumbItem>活动列表</xBreadcrumbItem>
			<xBreadcrumbItem>活动详情</xBreadcrumbItem>
		</xBreadcrumb>
		<xMd :md="'>使用items属性'" />
		<xBreadcrumb :items="items" />
		<xGap f />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "在`xBreadcrumb`中使用`xBreadcrumbItem`标签表示从首页开始的每一级。Element 提供了一个`separator`属性，在`xBreadcrumb`标签中设置它来决定分隔符，它只能是字符串，默认为斜杠`/`",
				count: 0
			};
		},
		computed: {
			items() {
				return [
					{
						label: "首页",
						href: _.$aHashLink("/")
					},
					{
						label: "活动管理",
						href: _.$aHashLink("/activity")
					},
					{
						label: "活动列表",
						href: _.$aHashLink("/activity/list")
					},
					{
						label: "活动列表",
						href: _.$aHashLink("/activity/list/detail")
					}
				];
			}
		}
	});
}
</script>
<style lang="less"></style>
