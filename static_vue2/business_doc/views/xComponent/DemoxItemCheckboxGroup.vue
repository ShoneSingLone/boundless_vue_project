<style lang="less"></style>
<template>
	<xForm>
		<xItem :configs="form.xItemCheckboxGroup" />
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				form: defItems({
					xItemCheckboxGroup: {
						value: "",
						label: "xItemCheckboxGroup",
						itemType: "xItemCheckboxGroup",
						minWidth: 90,
						options: [...new Array(20)].map((i, ii) => {
							return {
								label: ii,
								value: ii
							};
						})
					}
				})
			};
		}
	});
}
</script>
