<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" class="mb" />
		<xAdvancedSearch mountTo="#xAdvancedSearchStamp" v-model="isCollapse">
			<xCard> 通过ID选择器，可以挂载到任意元素 </xCard>
		</xAdvancedSearch>
		<div class="xAdvancedSearch-target" id="xAdvancedSearchStamp"></div>
		<xDivider />
		<xMd :md="'没有mountTo 默认使用xDrawer'" class="mb" />
		<xAdvancedSearch v-model="isCollapse2"> 没有mountTo 默认使用xDrawer </xAdvancedSearch>
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return {
				md: "- 通过ID选择器，可以挂载到任意元素 ",
				isCollapse: true,
				isCollapse2: true
			};
		}
	});
}
</script>
