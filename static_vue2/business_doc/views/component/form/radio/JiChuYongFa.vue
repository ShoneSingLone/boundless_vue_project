<template>
	<xForm>
		<xMd :md="md" class="mb" />
		<div>selectd:{{ radio }}</div>
		<xRadio v-model="radio" label="1">备选项</xRadio>
		<xRadio v-model="radio" label="2">备选项</xRadio>
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				radio: "1"
			};
		},
		computed: {
			md() {
				return `由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。
				
要使用 Radio 组件，只需要设置\`v-model\`绑定变量，选中意味着变量的值为相应 Radio \`label\`属性的值，\`label\`可以是\`String\`、\`Number\`或\`Boolean\`。
`;
			}
		}
	});
}
</script>
<style lang="less"></style>
