<template>
	<div>
		<xMd :md="md" />
		<xDropdown :hide-on-click="false">
			<span class="xDropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
			<xDropdownMenu slot="dropdown">
				<xDropdownItem>黄金糕</xDropdownItem>
				<xDropdownItem>狮子头</xDropdownItem>
				<xDropdownItem>螺蛳粉</xDropdownItem>
				<xDropdownItem disabled>双皮奶</xDropdownItem>
				<xDropdownItem divided>蚵仔煎</xDropdownItem>
			</xDropdownMenu>
		</xDropdown>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "可以`hide-on-click`属性来配置。\n\n下拉菜单默认在点击菜单项后会被隐藏，将`hide-on-click`属性默认为`false`可以关闭此功能。"
			};
		}
	});
}
</script>
<style lang="less"></style>
