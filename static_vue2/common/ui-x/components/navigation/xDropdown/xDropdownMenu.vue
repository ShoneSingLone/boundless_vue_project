<template>
	<transition name="el-zoom-in-top" @after-leave="doDestroy">
		<ul class="el-dropdown-menu el-popper" :class="cptMenuClass" v-show="showPopper">
			<slot></slot>
		</ul>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const Popper = await _.$importVue("/common/libs/VuePopper/VuePopper.vue");

	return defineComponent({
		name: "xDropdownMenu",
		componentName: "xDropdownMenu",
		mixins: [Popper],
		props: {
			visibleArrow: {
				type: Boolean,
				default: true
			},
			arrowOffset: {
				type: Number,
				default: 0
			}
		},
		computed: {
			cptMenuClass() {
				return [this.size && `el-dropdown-menu--${this.size}`];
			}
		},

		data() {
			return {
				size: this.dropdown.dropdownSize
			};
		},

		inject: ["dropdown"],

		created() {
			this.$on("updatePopper", () => {
				if (this.showPopper) this.updatePopper();
			});
			this.$on("visible", val => {
				this.showPopper = val;
			});
		},

		mounted() {
			this.dropdown.popperElm = this.popperElm = this.$el;
			this.referenceElm = this.dropdown.$el;
			// compatible with 2.6 new v-slot syntax
			// issue link https://github.com/ElemeFE/element/issues/14345
			this.dropdown.initDomOperation();
		},

		watch: {
			"dropdown.placement": {
				immediate: true,
				handler(val) {
					this.currentPlacement = val;
				}
			}
		}
	});
}
</script>
<style lang="less"></style>
