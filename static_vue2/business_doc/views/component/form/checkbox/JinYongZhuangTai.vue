<template>
	<div>
		<xMd :md="md" class="mb" />
		<xCheckbox v-model="checked1" disabled>备选项1</xCheckbox>
		<xCheckbox v-model="checked2" disabled>备选项</xCheckbox>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `多选框不可用状态。\n\n设置\`disabled\`属性即可。`,
				checked1: false,
				checked2: true
			};
		}
	});
}
</script>
<style lang="less"></style>
