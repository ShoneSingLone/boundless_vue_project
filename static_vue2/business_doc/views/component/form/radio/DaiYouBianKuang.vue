<template>
	<xForm>
		<xMd :md="md" class="mb" />
		<div>
			<div>radio1:{{ radio1 }}</div>
			<div>radio2:{{ radio2 }}</div>
			<div>radio3:{{ radio3 }}</div>
			<div>radio4:{{ radio4 }}</div>
		</div>
		<div>
			<xRadio v-model="radio1" label="1" border>备选项1</xRadio>
			<xRadio v-model="radio1" label="2" border>备选项2</xRadio>
		</div>
		<div style="margin-top: 20px">
			<xRadio v-model="radio2" label="1" border size="medium">备选项1</xRadio>
			<xRadio v-model="radio2" label="2" border size="medium">备选项2</xRadio>
		</div>
		<div style="margin-top: 20px">
			<xRadioGroup v-model="radio3" size="small">
				<xRadio label="1" border>备选项1</xRadio>
				<xRadio label="2" border disabled>备选项2</xRadio>
			</xRadioGroup>
		</div>
		<div style="margin-top: 20px">
			<xRadioGroup v-model="radio4" size="mini" disabled>
				<xRadio label="1" border>备选项1</xRadio>
				<xRadio label="2" border>备选项2</xRadio>
			</xRadioGroup>
		</div>
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				radio1: "1",
				radio2: "1",
				radio3: "1",
				radio4: "1"
			};
		},
		computed: {
			md() {
				return `带有边框
				
设置\`border\`属性可以渲染为带有边框的单选框。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
