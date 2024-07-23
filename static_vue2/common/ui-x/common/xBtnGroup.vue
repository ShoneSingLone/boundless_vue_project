<template>
	<div class="xBtnGroupWrapper flex middle">
		<xBtn v-for="(btn, index) in configs" :configs="btn" :key="index" />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["configs", "row"],
		filters: {
			isDisabled(currentBtnConfigs, row) {
				let isDisabled = false;
				if (_.isFunction(currentBtnConfigs.disabled)) {
					isDisabled = currentBtnConfigs.disabled(row);
				} else if (_.isBoolean(currentBtnConfigs.disabled)) {
					isDisabled = currentBtnConfigs.disabled;
				}
				return isDisabled;
			},
			tag(btn) {
				return btn.component || "li";
			},
			styleBtn(configs) {
				const styleBase = {
					display: "inline-block",
					"text-align": "center"
				};
				if (_.isFunction(configs.style)) {
					return _.merge(
						styleBase,
						configs.style({ row: this.row, configs: this.configs })
					);
				}
				return _.merge(styleBase, configs.style);
			}
		},
		methods: {
			handleClick(currentBtnConfigs) {
				let isDisabled = false;
				if (_.isFunction(currentBtnConfigs.disabled)) {
					isDisabled = currentBtnConfigs.disabled(this.row);
				} else if (_.isBoolean(currentBtnConfigs.disabled)) {
					isDisabled = currentBtnConfigs.disabled;
				}

				if (isDisabled) {
					return;
				} else {
					currentBtnConfigs.onClick(this.configs.row);
				}
			}
		}
	};
}
</script>

<style lang="less">
.xBtnGroupWrapper {
	display: flex;
}
</style>
