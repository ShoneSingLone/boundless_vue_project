<template>
	<div>
		<xMd :md="md" />
		<xDropdown>
			<xBtn preset="primary"> 更多菜单<i class="el-icon-arrow-down el-icon--right"></i> </xBtn>
			<xDropdownMenu slot="dropdown">
				<xDropdownItem>黄金糕</xDropdownItem>
				<xDropdownItem>狮子头</xDropdownItem>
				<xDropdownItem>螺蛳粉</xDropdownItem>
				<xDropdownItem>双皮奶</xDropdownItem>
				<xDropdownItem>蚵仔煎</xDropdownItem>
			</xDropdownMenu>
		</xDropdown>
		<xDropdown split-button preset="blue" @click="handleClick">
			更多菜单
			<xDropdownMenu slot="dropdown">
				<xDropdownItem>黄金糕</xDropdownItem>
				<xDropdownItem>狮子头</xDropdownItem>
				<xDropdownItem>螺蛳粉</xDropdownItem>
				<xDropdownItem>双皮奶</xDropdownItem>
				<xDropdownItem>蚵仔煎</xDropdownItem>
			</xDropdownMenu>
		</xDropdown>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		methods: {
			handleClick() {
				_.$msgSuccess("button click");
			}
		},
		data() {
			return {
				md: "可使用按钮触发下拉菜单。\n\n设置`split-button`属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为`true`即可。"
			};
		}
	});
}
</script>
<style lang="less"></style>
