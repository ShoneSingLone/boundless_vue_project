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
			<xRadioGroup v-model="radio1">
				<xRadioButton label="上海"></xRadioButton>
				<xRadioButton label="北京"></xRadioButton>
				<xRadioButton label="广州"></xRadioButton>
				<xRadioButton label="深圳"></xRadioButton>
			</xRadioGroup>
		</div>
		<div style="margin-top: 20px">
			<xRadioGroup v-model="radio2" size="medium">
				<xRadioButton label="上海"></xRadioButton>
				<xRadioButton label="北京"></xRadioButton>
				<xRadioButton label="广州"></xRadioButton>
				<xRadioButton label="深圳"></xRadioButton>
			</xRadioGroup>
		</div>
		<div style="margin-top: 20px">
			<xRadioGroup v-model="radio3" size="small">
				<xRadioButton label="上海"></xRadioButton>
				<xRadioButton label="北京" disabled></xRadioButton>
				<xRadioButton label="广州"></xRadioButton>
				<xRadioButton label="深圳"></xRadioButton>
			</xRadioGroup>
		</div>
		<div style="margin-top: 20px">
			<xRadioGroup v-model="radio4" disabled size="mini">
				<xRadioButton label="上海"></xRadioButton>
				<xRadioButton label="北京"></xRadioButton>
				<xRadioButton label="广州"></xRadioButton>
				<xRadioButton label="深圳"></xRadioButton>
			</xRadioGroup>
		</div>
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				radio1: "上海",
				radio2: "上海",
				radio3: "上海",
				radio4: "上海"
			};
		},
		computed: {
			md() {
				return `按钮样式的单选组合。
				
只需要把\`el-radio\`元素换成\`xRadioButton\`元素即可，此外，Element 还提供了\`size\`属性。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
