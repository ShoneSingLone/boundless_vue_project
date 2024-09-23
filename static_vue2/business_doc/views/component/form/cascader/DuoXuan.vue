<template>
	<div>
		<xMd :md="md" class="mb" />
		<div class="block">
			<span class="demonstration">默认显示所有Tag</span>
			<xCascader :options="DemoCascader.options" :props="props" clearable></xCascader>
		</div>
		<div class="block mt">
			<span class="demonstration">折叠展示Tag</span>
			<xCascader
				:options="DemoCascader.options"
				:props="props"
				collapse-tags
				clearable></xCascader>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["DemoCascader"],
		data() {
			return {
				props: { multiple: true }
			};
		},
		computed: {
			md() {
				return `
可通过 \`props.multiple = true\` 来开启多选模式

在开启多选模式后，默认情况下会展示所有已选中的选项的Tag，你可以使用\`collapse-tags\`来折叠Tag
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
