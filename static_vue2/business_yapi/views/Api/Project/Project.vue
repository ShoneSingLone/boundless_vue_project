<template>
	<div id="ViewProject">
		<ProjectTabs />
		<ProjectDoc />
		<ProjectInterface />
		<ProjectSetting />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			ProjectTabs: () => _.$importVue("@/views/Api/Project/Tabs/ProjectTabs.vue"),
			ProjectDoc: () => _.$importVue("@/views/Api/Project/Tabs/ProjectDoc.vue"),
			ProjectInterface: () => _.$importVue("@/views/Api/Project/Tabs/ProjectInterface.vue"),
			ProjectSetting: () => _.$importVue("@/views/Api/Project/Tabs/ProjectSetting.vue")
		},
		provide() {
			return {
				inject_project: this
			};
		},
		mounted() {
			/* 获取接口信息 */
			this.getInterfaceList();
		},
		data() {
			return {
				allCategory: [],
				allInterface: [],
				allTags: []
			};
		},
		computed: {
			cptAsideTreeData() {
				return [
					{
						_id: Vue._yapi_var.ALL,
						title: i18n("全部接口"),
						menuType: Vue._yapi_var.ALL,
						list: []
					},
					...this.allCategory
				];
			},
			cptTabName: {
				get() {
					if (!this.$route.query?.projectTabName) {
						this.cptTabName = "接口";
					}
					return this.$route.query.projectTabName;
				},
				set(projectTabName) {
					if (projectTabName) {
						this.$router.push({
							path: this.$route.path,
							query: {
								...this.$route.query,
								projectTabName: projectTabName
							}
						});
					}
				}
			}
		},
		methods: {
			async getInterfaceList() {
				const vm = this;
				const { data } = await _api.yapi.apiInterfaceListMenu(this.APP.cptProjectId);
				if (data) {
					const allCategory = data.map(category => {
						const children = _.map(category.list, i => {
							return {
								...i,
								menuType: "interface",
								categoryName: category.title,
								categoryId: i.catid
							};
						});
						return {
							...category,
							children,
							isCategory: true,
							categoryName: category.title,
							categoryId: category._id,
							menuType: "category",
							title: category.name,
							/* 下拉选项 */
							value: category._id,
							label: category.name
						};
					});

					vm.allCategory = allCategory;
					vm.allInterface = _.reduce(
						allCategory,
						(dataSource, i) => {
							if (_.$isArrayFill(i.list)) {
								dataSource = dataSource.concat(i.list);
							}
							return dataSource;
						},
						[]
					);
					const needMergeColumnProp = "catid";
					const groupedRowObj = _.groupBy(vm.allInterface, needMergeColumnProp);
					vm.allInterface = xTableVirNewGroupSortedRows({
						groupedRowObj,
						mergeProp: needMergeColumnProp
					});
					const _allTags = _.reduce(
						vm.allInterface,
						(allTags, i) => {
							return allTags.concat(i.tag);
						},
						[]
					);
					vm.allTags = _.uniqBy(_allTags);
					return vm.allCategory;
				}
			}
		}
	});
}
</script>
<style lang="less">
#ViewProject {
	height: 100%;
	display: flex;
	flex-flow: row nowrap;
}
</style>
