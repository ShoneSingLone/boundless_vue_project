<style lang="less"></style>
<template>
	<div>
		<xItem :configs="formSearch.queryName" style="--xItem-wrapper-width: 450px" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data(vm) {
			return {
				formSearch: defItems({
					queryName: {
						label: "名称/ID",
						msg: "",
						value: "",
						inputType: "select_input",
						selectValue: "id",
						selectOptions: [
							{ value: "name", label: "名称" },
							{ value: "id", label: "ID" }
						],
						resetValue: "",
						onSelectChange() {
							vm.formSearch.queryName.msg = `"🚀 ~ onSelectChange ~ selectValue:",${vm.formSearch.queryName.value},${vm.formSearch.queryName.selectValue}`;
						},
						onEnter() {
							vm.formSearch.queryName.msg = `"🚀 ~ onEnter ~ selectValue:",${vm.formSearch.queryName.value},${vm.formSearch.queryName.selectValue}`;
						},
						placeholder: i18n("业务系统名称")
					}
				})
			};
		}
	});
}
</script>
