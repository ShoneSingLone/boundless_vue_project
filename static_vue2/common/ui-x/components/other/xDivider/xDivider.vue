<style lang="less"></style>
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
