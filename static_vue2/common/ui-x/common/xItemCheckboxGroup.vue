<template>
	<el-checkbox-group
		v-model="mixin_value"
		v-bind="$attrs"
		v-on="mixin_listeners">
		<el-checkbox-button
			v-for="option in options"
			:label="option.label"
			:key="option.value">
			{{ option.label }}
		</el-checkbox-button>
	</el-checkbox-group>
</template>

<script>
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return (() => {
		return {
			mixins: [mixins],
			props: ["value", "configs"],
			computed: {
				options() {
					return this.configs?.options || [];
				}
			},
			data() {
				return {};
			}
		};
	})();
}
</script>

<style lang="less"></style>
