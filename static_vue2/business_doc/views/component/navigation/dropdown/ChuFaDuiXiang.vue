<template>
	<div>
		<xMd :md="md" />
		<div class="flex middle">
			<xDropdown>
				<xBtn preset="primary">
					<div class="flex middle">
						<span class="mr4">更多菜单</span>
						<xIcon icon="arrow-down" />
					</div>
				</xBtn>
				<xDropdownMenu slot="dropdown">
					<xDropdownItem>黄金糕</xDropdownItem>
					<xDropdownItem>狮子头</xDropdownItem>
					<xDropdownItem>螺蛳粉</xDropdownItem>
					<xDropdownItem>双皮奶</xDropdownItem>
					<xDropdownItem>蚵仔煎</xDropdownItem>
				</xDropdownMenu>
			</xDropdown>
			<xGap l />
			<xDropdown split-button preset="primary" @click="handleClick">
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
	</div>
</template>
<script lang="ts">
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
