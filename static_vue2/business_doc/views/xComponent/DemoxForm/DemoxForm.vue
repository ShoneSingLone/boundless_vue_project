<template>
	<DocContentOfDemo class="DemoAffix">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/xComponent/DemoxForm/JiChuYongFa.vue" unfold />
		<DemoAndCode title="位置" path="@/views/xComponent/DemoxForm/WeiZhi.vue" unfold />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: `# xForm
- xForm 负责布局 
- xItem 负责 label msg error tips；
- 其余是具体的控件`
			};
		}
	};
}
</script>

<style lang="less"></style>
./DemoxForm.vue
