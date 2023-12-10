<template>
	<div>
		<Md :md="md" />
		<el-row class="block-col-2">
			<el-col :span="12">
				<span class="demonstration">hover 激活</span>
				<xDropdown>
					<span class="xDropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
					<xDropdownMenu slot="dropdown">
						<xDropdownItem icon="el-icon-plus">黄金糕</xDropdownItem>
						<xDropdownItem icon="el-icon-circle-plus">狮子头</xDropdownItem>
						<xDropdownItem icon="el-icon-circle-plus-outline">螺蛳粉</xDropdownItem>
						<xDropdownItem icon="el-icon-check">双皮奶</xDropdownItem>
						<xDropdownItem icon="el-icon-circle-check">蚵仔煎</xDropdownItem>
					</xDropdownMenu>
				</xDropdown>
			</el-col>
			<el-col :span="12">
				<span class="demonstration">click 激活</span>
				<xDropdown trigger="click">
					<span class="xDropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
					<xDropdownMenu slot="dropdown">
						<xDropdownItem icon="el-icon-plus">黄金糕</xDropdownItem>
						<xDropdownItem icon="el-icon-circle-plus">狮子头</xDropdownItem>
						<xDropdownItem icon="el-icon-circle-plus-outline">螺蛳粉</xDropdownItem>
						<xDropdownItem icon="el-icon-check">双皮奶</xDropdownItem>
						<xDropdownItem icon="el-icon-circle-check">蚵仔煎</xDropdownItem>
					</xDropdownMenu>
				</xDropdown>
			</el-col>
		</el-row>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "可以配置 click 激活或者 hover 激活。\n\n在`trigger`属性设置为`click`即可。"
			};
		}
	});
}
</script>
<style lang="less"></style>
