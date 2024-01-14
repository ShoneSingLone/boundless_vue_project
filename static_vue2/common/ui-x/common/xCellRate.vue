<template>
	<div class="xCellRate flex center vertical middle">
		<div :style="rateStyle" class="progress-bar flex middle center">
			<span>{{ label }}</span>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {};
		},
		computed: {
			rate() {
				if (_.isFunction(this.configs?.col?.componentOptions?.rate)) {
					return this.configs?.col?.componentOptions?.rate({
						xCellRate: this,
						configs: this.configs,
						col: this.configs.col,
						index: this.configs.index,
						prop: this.configs.prop,
						row: this.configs.row
					});
				}
				return 0;
			},
			rateStyle() {
				return {
					"background-image": `linear-gradient(to right, var(--el-color-success-light-3) ${this.label}, white ${this.label} ,white)`
				};
			},
			label() {
				if (this.privateRate > 0) {
					return (this.privateRate * 100).toFixed(2) + "%";
				} else {
					return "--";
				}
			},
			privateRate() {
				if (this.rate) {
					return this.rate;
				}
				if (this.row?.rate) {
					return this.row?.rate;
				}
				return 0;
			}
		}
	};
}
</script>

<style lang="less">
.xCellRate {
	width: 94%;
	height: var(--ui-height);

	.progress-bar {
		width: 94%;
		color: black;
		height: 16px;
		border: var(--el-color-success-dark-2) 1px solid;
		border-radius: var(--border-radius--mini);
		// border: var(--ui-success-line) 1px solid;
		margin: auto;
		overflow: hidden;
		text-align: center;
		box-shadow: var(--ui-shadow-length-base, 0 2px 6px 0) var(--ui-light-shadow, rgba(37, 43, 58, 0.12));
	}
}
</style>
