<template>
	<div class="x-page-view flex1" id="ProjectInterfaceSectionInterfaceDetail">
		<xTabs v-model="cptProjectInterfaceTab" :slotHeaderOpr="renderCloseIcon">
			<xTabPane label="预览" name="preview"> </xTabPane>
			<xTabPane label="编辑" name="editor"> </xTabPane>
			<xTabPane label="测试" name="run_test"> </xTabPane>
		</xTabs>
		<!--
		dialog-fade
		msgbox-fade
		fade-in-linear
		el-fade-in-linear
		el-fade-in
		el-zoom-in-center
		el-zoom-in-top
		el-zoom-in-bottom
		el-zoom-in-left
		el-list
		viewer-fade
		el-drawer-fade
		-->
		<Transition name="el-zoom-in-left">
			<ProjectInterfaceSectionInterfaceDetailPreview
				v-if="cptProjectInterfaceTab === 'preview'"
				:interfaceInfo="interfaceInfo" />
			<ProjectInterfaceSectionInterfaceDetailEditor
				v-if="cptProjectInterfaceTab === 'editor' && interfaceInfo"
				:interfaceInfo="interfaceInfo" />
			<ProjectInterfaceSectionInterfaceDetailRunTest
				v-if="cptProjectInterfaceTab === 'run_test' && interfaceInfo"
				:interfaceInfo="interfaceInfo" />
		</Transition>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { useTabName } = await _.$importVue("/common/utils/hooks.vue");

	return {
		inject: ["APP", "inject_project"],
		provide() {
			return {
				inject_interface_section_interface_detail: this
			};
		},
		components: {
			ProjectInterfaceSectionInterfaceDetailPreview: () =>
				_.$importVue(
					"@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceDetailPreview.vue"
				),
			ProjectInterfaceSectionInterfaceDetailEditor: () =>
				_.$importVue(
					"@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceDetailEditor.vue"
				),
			ProjectInterfaceSectionInterfaceDetailRunTest: () =>
				_.$importVue(
					"@/views/Api/Project/Section/ProjectInterfaceSectionInterfaceDetailRunTest.vue"
				)
		},
		setup() {
			return {
				cptProjectInterfaceTab: useTabName({
					vm: this,
					propName: "project_interface_tab",
					defaultName: "preview"
				})
			};
		},
		data() {
			return {
				interfaceInfo: false
			};
		},
		computed: {},
		methods: {
			renderCloseIcon() {
				const vm = this;
				return hDiv(
					{
						class: "flex middle height100 width100 end flex1"
					},
					h("xIcon", {
						icon: "close",
						class: "pointer",
						onClick() {
							const { path, query } = vm.$route;
							vm.$router.push({
								path,
								query: {
									..._.omit(query, ["interfaceId", "interfaceType"])
								}
							});
						}
					})
				);
			},
			async updateInterface() {
				_.$loading(true);
				$(".flash-when").addClass("loading");
				try {
					const id = this.APP.cptInterfaceId;
					if (id) {
						let { data: interfaceInfo } = await _api.yapi.interface_get_by_id({ id });
						this.interfaceInfo = interfaceInfo;
					} else {
						this.interfaceInfo = false;
					}
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
					setTimeout(() => {
						$(".flash-when").removeClass("loading");
					}, 300);
				}
			}
		},
		watch: {
			"APP.cptInterfaceId": {
				immediate: true,
				handler() {
					this.updateInterface();
				}
			}
		}
	};
}
</script>

<style scoped lang="scss">
#ProjectInterfaceSectionInterfaceDetail {
	background: var(--page-body-bg, var(--el-color-white));
	padding: var(--ui-one);
	box-shadow: var(--el-box-shadow);
}
</style>
