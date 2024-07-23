<style lang="less">
.ProjectInterfaceSectionInterfaceList {
}
</style>
<template>
	<div class="height100 flex vertical ProjectInterfaceSectionInterfaceList">
		<xTablebar
			style="--xItem-wrapper-width: 424px; --xItem-label-width: 100px"
			:configs="inject_project_interface_section.configsTable">
			<template #left>
				<xBtn :configs="oprBtnArray" />
			</template>
			<!-- 名称或者路径 -->
			<template #right>
				<xAdvancedSearch
					mountTo="#AdvancedSearch"
					:collapse="isAdvancedSearchCollapse"
					@change="handleAdvancedSearchCollapse">
					<xBlock class="mt">
						<xForm>
							<xItem :configs="inject_project_interface_section.form.path" />
							<xItem :configs="inject_project_interface_section.form.catid" />
							<xItem :configs="inject_project_interface_section.form.method" />
							<xItem :configs="inject_project_interface_section.form.tag" />
							<xItem :configs="inject_project_interface_section.form.isUseBackup" />
							<xItem :configs="inject_project_interface_section.form.witchEnv" />
							<div class="flex end width100" span="2">
								<xBtn :configs="btnRest" class="ml4" />
								<xBtn
									preset="primary"
									@click="
										inject_project_interface_section.configsTable.onQuery({
											page: 1
										})
									"
									>查询</xBtn
								>
							</div>
						</xForm>
					</xBlock>
					<template #collapse>
						<div class="flex middle mr8">
							<xItem :configs="inject_project_interface_section.form.path" />
							<xBtn
								preset="primary"
								@click="
									inject_project_interface_section.configsTable.onQuery({
										page: 1
									})
								"
								>查询</xBtn
							>
						</div>
					</template>
				</xAdvancedSearch>
			</template>
		</xTablebar>
		<div id="AdvancedSearch"></div>
		<div class="x-page-content-middle mt8 flex horizon">
			<xTableVir
				:columns="inject_project_interface_section.configsTable.columns"
				:data="inject_project_interface_section.configsTable.data.list" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project", "inject_project_interface_section"],
		data() {
			return {
				isAdvancedSearchCollapse: true
			};
		},
		computed: {
			oprBtnArray() {
				return {
					label: "切换代理",
					disabled: () => {
						return (
							this.inject_project_interface_section.configsTable.data.set.size === 0
						);
					},
					onClick: () => {
						return this.changeProxy();
					}
				};
			},
			btnRest() {
				return {
					label: "重置",
					onClick: () => {
						return this.inject_project_interface_section.resetFilter();
					}
				};
			}
		},
		methods: {
			handleAdvancedSearchCollapse(collapse) {
				this.isAdvancedSearchCollapse = collapse;
				if (collapse) {
					this.resetSearchForm();
				}
			},
			resetSearchForm() {
				_.$resetFormValues(this.inject_project_interface_section.form);
			},
			async changeProxy() {
				_.$openModal({
					title: i18n("切换代理"),
					url: "@/components/YapiChangeProxyDialog.vue",
					parent: this,
					selected: Array.from(
						this.inject_project_interface_section.configsTable.data.set
					)
				});
			}
		}
	});
}
</script>
