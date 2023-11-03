<template>
	<el-select
		v-model="mixin_value"
		v-bind="$attrs"
		v-on="mixin_listeners"
		filterable>
		<el-option
			v-for="item in selectOptions"
			:key="item.value || item.label"
			:value="item.value"
			:label="item.label">
		</el-option>
	</el-select>
</template>

<script>
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		mixins: [mixins],
		props: ["value", "options", "configs"],
		computed: {
			selectOptions() {
				return this.options || this?.configs?.options || [];
			}
		},
		mounted() {}
	};
}
</script>

<style lang="less"></style>
