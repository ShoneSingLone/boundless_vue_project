<template>
	<xForm>
		<xMd :md="md" class="mb" />
		<div>selectd:{{ radio }}</div>
		<xRadio disabled v-model="radio" label="禁用">备选项</xRadio>
		<xRadio disabled v-model="radio" label="选中且禁用">备选项</xRadio>
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				radio: "选中且禁用"
			};
		},
		computed: {
			md() {
				return `单选框不可用的状态。
                
只要在\`el-radio\`元素中设置\`disabled\`属性即可，它接受一个\`Boolean\`，\`true\`为禁用。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
