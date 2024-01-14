<template>
	<div>
		<xMd :md="md" />
		<xDropdown @command="handleCommand">
			<span class="xDropdown-link"> 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
			<xDropdownMenu slot="dropdown">
				<xDropdownItem command="a">黄金糕</xDropdownItem>
				<xDropdownItem command="b">狮子头</xDropdownItem>
				<xDropdownItem command="c">螺蛳粉</xDropdownItem>
				<xDropdownItem command="d" disabled>双皮奶</xDropdownItem>
				<xDropdownItem command="e" divided>蚵仔煎</xDropdownItem>
			</xDropdownMenu>
		</xDropdown>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		methods: {
			handleCommand(command) {
				this.$message("click on item " + command);
			}
		},
		data() {
			return {
				md: "指令事件\n\n点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作"
			};
		}
	});
}
</script>
<style lang="less"></style>
