<template>
	<div>
		<xMd :md="md" />
		<xDropdown>
			<span class="xDropdown-link">
				下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
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
				md: "移动到下拉菜单上，展开更多操作。\n通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单。"
			};
		}
	});
}
</script>
<style lang="less"></style>
