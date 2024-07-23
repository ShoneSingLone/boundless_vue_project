<template>
	<div>
		<xMd :md="md" class="mb" />
		<xCascader :options="DemoCascader.options" clearable></xCascader>
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
				return `通过 \`clearable\` 设置输入框可清空`;
			}
		}
	});
}
</script>
<style lang="less"></style>
