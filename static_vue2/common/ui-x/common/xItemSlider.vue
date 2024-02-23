<template>
	<el-slider
		v-model="mixin_value"
		v-bind="$attrs"
		:show-input-controls="showInputControls"
		:format-tooltip="formatTooltip"
		v-on="mixin_listeners"
		:marks="marks"
		:min="min"
		:max="max"
		:show-input="showInput">
	</el-slider>
</template>

<script>
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		name: "xItemSlider",
		mixins: [mixins],
		props: ["value", "configs"],
		computed: {
			showInput() {
				return this.configs?.showInput ?? false;
			},
			disabled() {
				return this.configs?.disabled ?? false;
			},
			min() {
				return this.configs?.min ?? 0;
			},
			max() {
				return this.configs?.max ?? 100;
			},
			marks() {
				return this.configs?.marks ?? null;
			},
			showInputControls() {
				return this.configs?.showInputControls ?? true;
			}
		},
		methods: {
			formatTooltip(value) {
				if (!_.isFunction(this.configs.formatTooltip)) {
					return null;
				}
				return this.configs.formatTooltip(value);
			}
		}
	};
}
</script>

<style scoped lang="scss"></style>
