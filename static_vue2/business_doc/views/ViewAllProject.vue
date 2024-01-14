<template>
	<div class="page-view">
		<xPageTitle title="所有项目" tips="源码static_vue2文件夹下所有非common文件夹，及其子目录的html文件"><xItem :configs="search" /> </xPageTitle>
		<xPageContent>
			<xForm col="3">
				<xCard :header="projectName" v-for="(projectEntryPageNameArray, projectName) in displayProjectArray" :key="projectName" class="margin">
					<xTag class="mr" v-for="entryPage in projectEntryPageNameArray" :key="entryPage">
						<a :href="genALinkHref(projectName, entryPage)" target="_blank">{{ entryPage }}</a>
					</xTag>
				</xCard>
			</xForm>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return defineComponent({
		async mounted() {
			const { data: allProject } = await _api.doc.allProject();
			this.allProject = allProject;
			const tutorial = await _.$loadText("@/doc/reuseElementUI.md");
			this.md = tutorial;
		},
		data() {
			const vm = this;
			return {
				projectByFilter: {},
				allProject: {},
				md: "",
				search: {
					value: _.$lStorage.n2one_doc_search_project || "",
					clearable: true,
					placeholder: "过滤文件夹或html名称",
					onEmitValue({ val }) {
						_.$lStorage.n2one_doc_search_project = val;
						vm.filterProject(val);
					}
				}
			};
		},
		computed: {
			displayProjectArray() {
				if (Object.keys(this.projectByFilter).length) {
					return this.projectByFilter;
				}
				return this.allProject;
			}
		},
		methods: {
			filterProject: _.debounce(function (params) {
				const projectByFilter = {};
				if (params) {
					_.each(this.allProject, (pageArray, projectName) => {
						const nameIsOk = ~projectName.indexOf(params);
						const subIsOk = _.some(pageArray, pageName => {
							return ~pageName.indexOf(params);
						});
						if (nameIsOk || subIsOk) {
							projectByFilter[projectName] = pageArray;
						}
					});
				}
				this.projectByFilter = projectByFilter;
			}, 500),
			genALinkHref(projectName, entryPge) {
				return `/static/${projectName}/${entryPge}`;
			}
		}
	});
}
</script>

<style lang="less"></style>
