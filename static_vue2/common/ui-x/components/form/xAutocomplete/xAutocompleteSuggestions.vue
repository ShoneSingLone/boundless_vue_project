<style lang="less"></style>
<template>
	<transition name="el-zoom-in-top" @after-leave="handleAfterLeave">
		<div
			v-show="showPopper"
			class="el-autocomplete-suggestion el-popper"
			:class="{ 'is-loading': !parent.hideLoading && parent.loading }"
			:style="{ width: dropdownWidth }"
			role="region">
			<xScrollbar
				tag="ul"
				wrap-class="el-autocomplete-suggestion__wrap"
				view-class="el-autocomplete-suggestion__list">
				<li v-if="!parent.hideLoading && parent.loading">
					<i class="el-icon-loading" />
				</li>
				<slot v-else />
			</xScrollbar>
		</div>
	</transition>
</template>
<script lang="ts">
export default async function () {
	const Popper = await _.$importVue("/common/libs/VuePopper/VuePopper.vue");

	return defineComponent({
		componentName: "xAutocompleteSuggestions",
		mixins: [Popper],
		data() {
			return {
				parent: this.$parent,
				dropdownWidth: ""
			};
		},

		props: {
			options: {
				default() {
					return {
						gpuAcceleration: false
					};
				}
			},
			id: String
		},

		methods: {
			handleAfterLeave() {
				this.doDestroy();
			},
			select(item) {
				this.dispatch("xAutocomplete", "item-click", item);
			},
			async initScrollList() {
				this.referenceList = await _.$ensure(() =>
					this.$el.querySelector(".el-autocomplete-suggestion__list")
				);
				this.referenceList.setAttribute("role", "listbox");
				this.referenceList.setAttribute("id", this.id);
			}
		},

		updated() {
			this.$nextTick(_ => {
				this.popperJS && this.updatePopper();
			});
		},

		mounted() {
			this.$parent.popperElm = this.popperElm = this.$el;
			const { input, textarea } = this.$parent.$refs.input.$refs;
			this.referenceElm = input || textarea;
			this.initScrollList();
		},

		created() {
			this.$on("visible", ([val, inputWidth]) => {
				this.dropdownWidth = inputWidth + "px";
				this.showPopper = val;
			});
		}
	});
}
</script>
