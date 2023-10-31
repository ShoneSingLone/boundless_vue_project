<template>
	<el-switch v-model="mixin_value" v-bind="$attrs" v-on="mixin_listeners">
	</el-switch>
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
		}
	};
}
</script>

<style lang="less"></style>
