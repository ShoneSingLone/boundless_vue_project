<template>
	<div>
		<xMd :md="md" class="mb" />
		<div class="block">
			<span class="demonstration mr">默认 click 触发子菜单</span>
			<xCascader
				v-model="DemoCascader.value"
				:options="DemoCascader.options"
				@change="DemoCascader.handleChange"></xCascader>
		</div>
		<div class="block mt">
			<span class="demonstration mr">hover 触发子菜单</span>
			<xCascader
				v-model="DemoCascader.value"
				:options="DemoCascader.options"
				:props="{ expandTrigger: 'hover' }"
				@change="DemoCascader.handleChange"></xCascader>
		</div>
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
				return `
只需为 Cascader 的\`options\`属性指定选项数组即可渲染出一个级联选择器。通过\`props.expandTrigger\`可以定义展开子级菜单的触发方式。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
