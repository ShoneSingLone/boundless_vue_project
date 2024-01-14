<template>
	<div class="card-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xBtnArray :configs="oprBtnArray" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "以数组的方式配置多个按钮，常用于列表顶端左侧的操作按钮。\n\n>不同于xBtnGrpup，本组件不支持按钮组的嵌套。",
				oprBtnArray: [
					{
						label: i18n("正常"),
						icon: "el-icon-edit",
						onClick() {
							vm.open();
						}
					},
					{
						label: i18n("禁止"),
						disabled: true,
						onClick() {
							vm.open();
						}
					},
					{
						label: i18n("预设"),
						isLoading: true,
						preset: "success",
						onClick() {
							vm.open();
						}
					}
				]
			};
		}
	});
}
</script>
<style lang="less"></style>
