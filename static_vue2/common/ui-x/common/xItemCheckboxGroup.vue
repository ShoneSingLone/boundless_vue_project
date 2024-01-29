<template>
	<el-checkbox-group v-model="mixin_value" v-bind="$attrs" v-on="mixin_listeners">
		<template v-if="isButton">
			<el-checkbox-button v-for="option in selectOptions" :label="option.label" :key="option.value">
				{{ option.label }}
			</el-checkbox-button>
		</template>
		<template v-else>
			<el-checkbox v-for="option in selectOptions" :label="option.value" :key="option.label">
				{{ option.label }}
			</el-checkbox>
		</template>
	</el-checkbox-group>
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return (() => {
		return {
			mixins: [mixins],
			props: ["value", "configs", "options"],
			computed: {
				selectOptions() {
					return this.options || this.configs?.options || [];
				},
				isButton() {
					return this.configs?.button || false;
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
