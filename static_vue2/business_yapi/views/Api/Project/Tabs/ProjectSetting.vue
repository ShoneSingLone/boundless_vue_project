<template>
	<div class="x-page-view flex1" v-if="isShow" id="ProjectSetting">
		<xPageContent>
			<xTabs v-model="cptProjectSettingTab">
				<xTabPane label="项目配置" name="1"></xTabPane>
				<xTabPane label="环境配置" name="2"> </xTabPane>
				<xTabPane label="请求配置" name="3"> </xTabPane>
				<xTabPane label="token配置" name="4"> </xTabPane>
				<xTabPane label="全局mock脚本" name="5"> </xTabPane>
				<xTabPane label="Swagger自动同步" name="6"> </xTabPane>
				<xTabPane label="数据导入导出" name="7"> </xTabPane>
			</xTabs>
			<div>
				<ProjectSettingPanelCommon v-if="cptProjectSettingTab === '1'" />
				<ProjectSettingPanelReqFrontendCode v-if="cptProjectSettingTab === '3'" />
				<ProjectSettingPanelDataImportExport v-if="cptProjectSettingTab === '7'" />
			</div>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	const { useTabName } = await _.$importVue("/common/utils/hooks.vue");

	return {
		name: "ProjectSettingVue",
		inject: ["APP", "inject_project"],
		components: {
			ProjectSettingPanelCommon: () =>
				_.$importVue("@/views/Api/Project/Tabs/ProjectSettingPanelCommon.vue"),
			ProjectSettingPanelReqFrontendCode: () =>
				_.$importVue("@/views/Api/Project/Tabs/ProjectSettingPanelReqFrontendCode.vue"),
			ProjectSettingPanelDataImportExport: () =>
				_.$importVue("@/views/Api/Project/Tabs/ProjectSettingPanelDataImportExport.vue")
		},
		setup() {
			const cptProjectSettingTab = useTabName({
				vm: this,
				propName: "project_setting_tab",
				defaultName: "1"
			});
			return {
				cptProjectSettingTab
			};
		},
		data() {
			return {};
		},
		computed: {
			isShow() {
				return this.inject_project.cptTabName === "设置";
			}
		},
		methods: {}
	};
}
</script>

<style scoped lang="scss"></style>
