<style lang="less"></style>
<template>
	<xForm>
		<div>formSearch.queryName.value : {{ formSearch.queryName.value }}</div>
		<xItem :configs="formSearch.queryName" style="--xItem-wrapper-width: 450px" />
	</xForm>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data(vm) {
			return {
				formSearch: defItems({
					queryName: {
						label: "名称/ID",
						itemType: "xItemSwitch",
						value: 0.1,
						activeValue: 0.1,
						inactiveValue: 0
					}
				})
			};
		}
	});
}
</script>
