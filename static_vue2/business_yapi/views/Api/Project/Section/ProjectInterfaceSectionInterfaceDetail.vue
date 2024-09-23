<template>
	<div class="x-page-view flex1" id="ProjectInterfaceSectionInterfaceDetail">
		<xTabs v-model="cptProjectInterfaceTab" :slotHeaderOpr="renderCloseIcon">
			<xTabPane label="预览" name="1"> </xTabPane>
			<xTabPane label="编辑" name="2"> </xTabPane>
		</xTabs>
		<ProjectInterfaceSectionInterfaceDetailPreview v-if="cptProjectInterfaceTab === '1'" />
		<ProjectInterfaceSectionInterfaceDetailEditor
			v-if="cptProjectInterfaceTab === '2' && detailInfo"
			:detailInfo="detailInfo" />
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
				)
		},
		setup() {
			const cptProjectInterfaceTab = useTabName({
				vm: this,
				propName: "project_interface_tab",
				defaultName: "1"
			});
			return {
				cptProjectInterfaceTab
			};
		},
		data() {
			return {
				detailInfo: false
			};
		},
		computed: {
			isShow() {
				return this.inject_project.cptTabName === "设置";
			}
		},
		methods: {
			renderCloseIcon() {
				const vm = this;
				return hDiv(
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
					}),
					{
						class: "flex middle height100 width100 end"
					}
				);
			},
			async updateInterface() {
				_.$loading(true);
				$(".flash-when").addClass("loading");
				try {
					let { data: detailInfo } = await _api.yapi.interface_get_by_id({
						id: this.APP.cptInterfaceId
					});
					this.detailInfo = detailInfo;
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
				handler(id) {
					if (id) {
						this.updateInterface();
					}
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
