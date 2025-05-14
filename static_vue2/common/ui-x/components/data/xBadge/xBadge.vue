<template>
	<span class="position relative xBadge" :style="cptOffset">
		<div :class="{ 'xBadge-sup': true, 'is-dot': isDot }">
			<xRender :render="content" />
		</div>
	</span>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: {
			value: {
				type: [String, Number, Object, Function],
				default: 0
			},
			max: {
				type: [Number],
				default: 0
			},
			isDot: {
				type: [Boolean]
			},
			offset: {
				type: [Array]
			}
		},
		data() {
			console.log(this.$attrs, this.$props);
			return {};
		},
		computed: {
			content() {
				if (this.isDot) return "";

				const value = this.value;
				const max = this.max;

				if (typeof value === "number" && typeof max === "number" && max) {
					return max < value ? `${max}+` : value;
				}

				return value;
			},
			cptOffset() {
				if (this.offset) {
					return {
						"--xBadge-top": this.offset[0],
						"--xBadge-left": this.offset[1]
					};
				} else {
					return {};
				}
			}
		}
	});
}
</script>
<style lang="less">
.xBadge {
	overflow: visible;
	display: inline-block;

	.xBadge-sup {
		display: inline-block;
		position: absolute;
		white-space: nowrap;
		padding: 0 6px;
		line-height: 20px;
		border-radius: 10px;
		color: var(--el-color-white, #fff);
		z-index: 1;
		background-color: var(--el-color-danger);
		text-align: center;
		top: var(--xBadge-top, -12px);
		left: var(--xBadge-left, -12px);
		&.is-dot {
			padding: 0;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			top: -6px;
			left: -6px;
		}
	}
	&.primary {
		.xBadge-sup {
			background-color: var(--el-color-primary);
		}
	}
	&.success {
		.xBadge-sup {
			background-color: var(--el-color-success);
		}
	}
	&.warning {
		.xBadge-sup {
			background-color: var(--el-color-warning);
		}
	}
	&.info {
		.xBadge-sup {
			background-color: var(--el-color-info);
		}
	}
}
</style>
