<style lang="less">
.el-divider {
	background-color: #dcdfe6;
	position: relative;
}

.el-divider--horizontal {
	display: block;
	height: 1px;
	width: 100%;
	margin: 24px 0;
}

.el-divider--vertical {
	display: inline-block;
	width: 1px;
	height: 1em;
	margin: 0 8px;
	vertical-align: middle;
	position: relative;
}

.el-divider__text {
	position: absolute;
	background-color: #fff;
	padding: 0 20px;
	color: var(--el-text-color-primary);
}

.el-divider__text.is-left {
	left: 20px;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}

.el-divider__text.is-center {
	left: 50%;
	-webkit-transform: translateX(-50%) translateY(-50%);
	transform: translateX(-50%) translateY(-50%);
}

.el-divider__text.is-right {
	right: 20px;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}
</style>
<template>
	<div v-bind="$attrs" v-on="$listeners" :class="cptWrapperClass">
		<div v-if="isShowSlot" :class="cptSlotsClass">
			<slot />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		name: "ElDivider",
		props: {
			direction: {
				type: String,
				default: "horizontal",
				validator(val) {
					return ["horizontal", "vertical"].indexOf(val) !== -1;
				}
			},
			contentPosition: {
				type: String,
				default: "center",
				validator(val) {
					return ["left", "center", "right"].indexOf(val) !== -1;
				}
			}
		},
		computed: {
			isShowSlot() {
				try {
					const isHorizon = this.direction !== "vertical";
					return isHorizon && this.$slots.default;
				} catch (e) {
					return false;
				}
			},
			cptWrapperClass() {
				return [this.staticClass, "el-divider", `el-divider--${this.direction}`];
			},
			cptSlotsClass() {
				return ["el-divider__text", `is-${this.contentPosition}`];
			}
		}
	});
}
</script>
