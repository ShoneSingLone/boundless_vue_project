<template>
	<xSlider
		class="xItemSlider"
		v-model="mixin_value"
		v-bind="$attrs"
		:show-input-controls="showInputControls"
		:format-tooltip="formatTooltip"
		v-on="mixin_listeners"
		:marks="marks"
		:min="min"
		:max="max"
		:show-input="showInput">
	</xSlider>
</template>
<script lang="ts">
export default async function () {
	const { mixins } = await _.$importVue("/common/ui-x/common/ItemMixins.vue");
	return {
		name: "xItemSlider",
		mixins: [mixins],
		props: ["value", "configs"],
		computed: {
			showInput() {
				return _.$val(this, "configs.showInput") ?? false;
			},
			disabled() {
				return _.$val(this, "configs.disabled") ?? false;
			},
			min() {
				return _.$val(this, "configs.min") ?? 0;
			},
			max() {
				return _.$val(this, "configs.max") ?? 100;
			},
			marks() {
				return _.$val(this, "configs.marks") ?? null;
			},
			showInputControls() {
				return _.$val(this, "configs.showInputControls") ?? true;
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
<style lang="less">
.xItem_controller {
	> .xItemSlider {
		width: var(--xItem-slider-width, 100%);
	}
}
.xItemSlider {
	margin: 0 48px;
	.el-slider__runway.show-input {
		margin-bottom: 32px;
	}
}
</style>
