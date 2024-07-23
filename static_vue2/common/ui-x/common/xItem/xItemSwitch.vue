<template>
	<div class="flex">
		<xSwitch v-model="mixin_value" v-bind="$attrs" v-on="mixin_listeners"> </xSwitch>
		<xGap f />
	</div>
</template>

<script lang="ts">
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
