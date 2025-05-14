<template>
	<div class="xAdvancedSearch flex middle">
		<slot name="collapse" class="xAdvancedSearch-collapse-wrapper" v-if="cptIsCollapse" />
		<xBtn @click="toggleCollapse">
			<span class="xAdvancedSearch-label mr4" v-if="cptLabel">{{ cptLabel }}</span>
			<xIcon icon="advanced_search" :class="cptIconClass" />
		</xBtn>
		<xDrawer title="我是标题" :visible.sync="cptDrawer" :with-header="false" v-if="useDrawer">
			<div class="x-padding">
				<slot class="xAdvancedSearch-more-search-wrapper" />
			</div>
		</xDrawer>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		props: {
			mountProps: {
				type: Object,
				default: () => ({})
			},
			label: {
				type: [String, Boolean],
				default: i18n("advanced_search")
			},
			collapse: {
				type: Boolean,
				default: true
			},
			mountTo: {
				type: [String, Boolean],
				default: false
			}
		},
		model: {
			prop: "collapse",
			event: "change"
		},
		data() {
			return {
				useMount: false,
				useDrawer: false
			};
		},
		setup() {
			let drawerVM;
			const vm = this;
			onMounted(async () => {
				if (vm.mountTo) {
					await _.$ensure(() => $(vm.mountTo).length);
					drawerVM = new Vue({
						parent: vm,
						el: vm.mountTo,
						mounted() {
							$(vm.mountTo).hide();
						},
						render() {
							const props = _.merge(
								{ id: String(vm.mountTo).replace("#", "") },
								vm.mountProps
							);
							return hDiv(props, vm.$slots.default);
						}
					});

					vm.$watch(
						() => vm.collapse,
						collapse => {
							const $eleMounteTo = $(vm.mountTo);
							$eleMounteTo[collapse ? "hide" : "show"]("fast");
						}
					);
				} else {
					vm.useDrawer = true;
				}
			});

			onUpdated(() => {
				if (drawerVM) {
					drawerVM.$forceUpdate();
				}
			});

			onUnmounted(() => {
				if (drawerVM) {
					try {
						drawerVM.$destroy();
						drawerVM.$el.remove();
					} catch (error) {
						console.error(error);
					}
				}
			});
		},
		computed: {
			cptIsCollapse: {
				get() {
					return this.collapse;
				},
				set(val) {
					this.$emit("change", val);
				}
			},
			cptDrawer: {
				get() {
					return !this.cptIsCollapse;
				},
				set(val) {
					this.cptIsCollapse = !val;
				}
			},
			cptLabel() {
				if (_.isBoolean(this.label)) {
					return this.label;
				}
				return this.label || i18n("advanced_search");
			},
			cptIconClass() {
				return {
					"xAdvancedSearch-icon": true,
					collapse: this.cptIsCollapse
				};
			}
		},
		methods: {
			toggleCollapse() {
				this.cptIsCollapse = !this.cptIsCollapse;
			}
		}
	});
}
</script>
<style lang="less">
.xAdvancedSearch {
	.xAdvancedSearch-label {
	}
	.xAdvancedSearch-icon {
		width: 12px;
		height: 12px;
		&.collapse {
			transform: rotate(180deg);
		}
	}
	.xAdvancedSearch-more-search-wrapper {
	}
}
</style>
