<template>
	<div class="el-select-dropdown el-popper" :class="[{ 'is-multiple': $parent.multiple }, popperClass]" :style="{ minWidth: minWidth }">
		<slot></slot>
	</div>
</template>
<script lang="ts">
export default async function () {
	const Popper = await _.$importVue("/common/libs/VuePopper/VuePopper.vue");
	return defineComponent({
		name: "xSelectDropdown",
		componentName: "xSelectDropdown",
		mixins: [Popper],
		props: {
			placement: {
				default: "bottom-start"
			},
			boundariesPadding: {
				default: 0
			},
			popperOptions: {
				default() {
					return {
						gpuAcceleration: false
					};
				}
			},
			visibleArrow: {
				default: true
			},
			appendToBody: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				minWidth: ""
			};
		},
		computed: {
			popperClass() {
				return this.$parent.popperClass;
			}
		},
		watch: {
			"$parent.inputWidth"() {
				this.minWidth = this.$parent.$el.getBoundingClientRect().width + "px";
			}
		},
		mounted() {
			this.referenceElm = this.$parent.$refs.reference.$el;
			this.$parent.popperElm = this.popperElm = this.$el;
			this.$on("updatePopper", () => {
				if (this.$parent.visible) this.updatePopper();
			});
			this.$on("destroyPopper", this.destroyPopper);
		}
	});
}
</script>
<style lang="less"></style>
