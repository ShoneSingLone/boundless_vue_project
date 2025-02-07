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
			this.get_interface_list();
		},
		data() {
			return {
				all_category: [],
				all_interface: [],
				all_tags: []
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
					...this.all_category
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
			async get_interface_list() {
				const vm = this;
				const { data } = await _api.yapi.apiInterfaceListMenu(this.APP.cptProjectId);
				if (data) {
					const all_category = data.map(category => {
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

					vm.all_category = all_category;
					vm.all_interface = _.reduce(
						all_category,
						(dataSource, i) => {
							if (_.$isArrayFill(i.list)) {
								dataSource = dataSource.concat(i.list);
							}
							return dataSource;
						},
						[]
					);
					const _all_tags = _.reduce(
						vm.all_interface,
						(all_tags, i) => {
							return all_tags.concat(i.tag);
						},
						[]
					);
					vm.all_tags = _.uniqBy(_all_tags);
					return vm.all_category;
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
