<template>
	<xDatePicker v-model="mixin_value" type="datetime" v-bind="$attrs" />
</template>

<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return (() => {
		return {
			mixins: [mixins],
			props: ["value", "configs", "options"],
			computed: {
				privateValue: {
					get() {
						return this.value;
					},
					set(val) {
						this.$emit("change", val);
					}
				}
			}
		};
	})();
}
</script>

<style lang="less"></style>
