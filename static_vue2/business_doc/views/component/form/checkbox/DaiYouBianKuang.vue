<template>
	<div>
		<xMd :md="md" class="mb" />
		<div>
			<xCheckbox v-model="checked1" label="备选项1" border />
			<xCheckbox v-model="checked2" label="备选项2" border />
		</div>
		<div style="margin-top: 20px">
			<xCheckbox v-model="checked3" label="备选项1" border size="medium" />
			<xCheckbox v-model="checked4" label="备选项2" border size="medium" />
		</div>
		<div style="margin-top: 20px">
			<xCheckboxGroup v-model="checkboxGroup1" size="small">
				<xCheckbox label="备选项1" border />
				<xCheckbox label="备选项2" border disabled />
			</xCheckboxGroup>
		</div>
		<div style="margin-top: 20px">
			<xCheckboxGroup v-model="checkboxGroup2" size="mini" disabled>
				<xCheckbox label="备选项1" border />
				<xCheckbox label="备选项2" border />
			</xCheckboxGroup>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置`border`属性可以渲染为带有边框的多选框。",
				checked1: true,
				checked2: false,
				checked3: false,
				checked4: true,
				checkboxGroup1: [],
				checkboxGroup2: []
			};
		}
	});
}
</script>
<style lang="less"></style>
