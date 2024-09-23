<template>
	<div>
		<xMd :md="md" />
		<xDropdown split-button preset="primary">
			默认尺寸
			<xDropdownMenu slot="dropdown">
				<xDropdownItem>黄金糕</xDropdownItem>
				<xDropdownItem>狮子头</xDropdownItem>
				<xDropdownItem>螺蛳粉</xDropdownItem>
				<xDropdownItem>双皮奶</xDropdownItem>
				<xDropdownItem>蚵仔煎</xDropdownItem>
			</xDropdownMenu>
		</xDropdown>

		<xDropdown size="medium" split-button preset="primary">
			中等尺寸
			<xDropdownMenu slot="dropdown">
				<xDropdownItem>黄金糕</xDropdownItem>
				<xDropdownItem>狮子头</xDropdownItem>
				<xDropdownItem>螺蛳粉</xDropdownItem>
				<xDropdownItem>双皮奶</xDropdownItem>
				<xDropdownItem>蚵仔煎</xDropdownItem>
			</xDropdownMenu>
		</xDropdown>

		<xDropdown size="small" split-button preset="primary">
			小型尺寸
			<xDropdownMenu slot="dropdown">
				<xDropdownItem>黄金糕</xDropdownItem>
				<xDropdownItem>狮子头</xDropdownItem>
				<xDropdownItem>螺蛳粉</xDropdownItem>
				<xDropdownItem>双皮奶</xDropdownItem>
				<xDropdownItem>蚵仔煎</xDropdownItem>
			</xDropdownMenu>
		</xDropdown>

		<xDropdown size="mini" split-button preset="primary">
			超小尺寸
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
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "Dropdown 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。\n\n额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。"
			};
		}
	});
}
</script>
<style lang="less"></style>
