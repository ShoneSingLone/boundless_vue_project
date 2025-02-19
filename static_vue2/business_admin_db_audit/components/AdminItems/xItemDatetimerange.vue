<template>
	<xDatePicker
		v-model="mixin_value"
		type="datetimerange"
		v-bind="mixin_attrs"
		start-placeholder="开始日期"
		end-placeholder="截止日期"
		placeholder="选择日期"
		value-format="timestamp" />
</template>

<script lang="ts">
export default async function () {
	const { mixins: ItemMixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	/* 时间组件因为各个项目要求多样，不建议统一放公用组件库。*/
	/* 建议：各个项目在entry自行加入 */
	/* 本文件仅做示例，功能不全*/
	return defineComponent({
		mixins: [ItemMixins]
	});
}
</script>

<style lang="less"></style>
