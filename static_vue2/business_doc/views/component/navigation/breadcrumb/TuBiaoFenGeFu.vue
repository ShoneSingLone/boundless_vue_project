<template>
	<div>
		<xMd :md="md" />
		<xBreadcrumb separator-class="el-icon-arrow-right">
			<xBreadcrumbItem :to="{ path: '/' }">首页</xBreadcrumbItem>
			<xBreadcrumbItem>活动管理</xBreadcrumbItem>
			<xBreadcrumbItem>活动列表</xBreadcrumbItem>
			<xBreadcrumbItem>活动详情</xBreadcrumbItem>
		</xBreadcrumb>
		<xMd :md="useVnode" />
		<xBreadcrumb :items="items" :separator="cptSeparator" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "通过设置 `separator-class` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 设置失效",
				useVnode: ">**不使用**`xBreadcrumbItem`，`separator`类型可以是vNode"
			};
		},
		computed: {
			cptSeparator() {
				return h("xIcon", { icon: "_icon_breadcrumb" });
			},
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
