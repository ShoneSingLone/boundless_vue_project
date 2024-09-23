<template>
	<div>
		<xMd :md="md" class="mb" />
		<xCascader :options="DemoCascader.options" :show-all-levels="false"></xCascader>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["DemoCascader"],
		data() {
			return {};
		},
		computed: {
			md() {
				return `可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。

属性\`show-all-levels\`定义了是否显示完整的路径，将其赋值为\`false\`则仅显示最后一级`;
			}
		}
	});
}
</script>
<style lang="less"></style>
