<template>
	<xCheckboxGroup v-model="mixin_value" v-bind="$attrs" v-on="mixin_listeners">
		<template v-if="isButton">
			<xCheckboxButton v-for="option in selectOptions" :label="option.label" :key="option.value">
				{{ option.label }}
			</xCheckboxButton>
		</template>
		<template v-else>
			<xCheckbox v-for="option in selectOptions" :label="option.value" :key="option.label">
				{{ option.label }}
			</xCheckbox>
		</template>
	</xCheckboxGroup>
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
					return this.configs?.isButton || false;
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
