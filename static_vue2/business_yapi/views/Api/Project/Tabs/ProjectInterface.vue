<style lang="less">
#ViewProjectInterface {
	width: 1px;
	position: relative;

	.ViewProjectInterfaceResizeWrapper {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width:;
	}
}
</style>
<template>
	<section class="flex1" v-if="isShow" id="ViewProjectInterface">
		<div class="ViewProjectInterfaceResizeWrapper flex">
			<ProjectInterfaceAside />
			<ProjectInterfaceSection />
		</div>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project"],
		components: {
			ProjectInterfaceAside: () => _.$importVue("@/views/Api/Project/Aside/ProjectInterfaceAside.vue"),
			ProjectInterfaceSection: () => _.$importVue("@/views/Api/Project/Section/ProjectInterfaceSection.vue")
		},
		mounted() {
			/* 获取接口信息 */
			this.getInterfaceList();
		},
		provide() {
			return {
				inject_interface: this
			};
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
			isShow() {
				return this.inject_project.cptTabName === "接口";
			}
		},
		methods: {
			syncInterfaceAsideExpand: _.debounce(function () {
				if (this.$route.query.interfaceCategoryId) {
					this.expandedKeys = [Number(cptRouter.value.query.interfaceCategoryId)];
				} else {
					this.expandedKeys = [];
				}
			}),
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
					const _allTags = _.reduce(
						vm.allInterface,
						(allTags, i) => {
							return allTags.concat(i.tag);
						},
						[]
					);
					vm.allTags = _.uniqBy(_allTags);
					vm.syncInterfaceAsideExpand();
					return vm.allCategory;
				}
			},
			async openGroupUpsertDialog(groupInfo) {
				const upsert = await _.$importVue("@/views/Api/Group/Group.Upsert.vue", {
					parent: this,
					groupInfo
				});
				_.$openWindow(!!groupInfo ? i18n("修改分组信息") : i18n("添加分组"), upsert);
			}
		}
	});
}
</script>
