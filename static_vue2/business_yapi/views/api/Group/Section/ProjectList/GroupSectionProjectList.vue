<template>
	<div class="GroupSectionProjectList" v-if="isShow">
		<div class="GroupSectionProjectList-header flex middle mt">
			<div>
				<span>共</span>
				<span> {{ APP.projectList.length }} </span>
				<span>个项目</span>
			</div>
			<xGap f />
			<div>
				<xBtn :configs="btn_addProject" />
			</div>
		</div>
		<div>
			<GroupSectionProjectListPrivate />
			<GroupSectionProjectListNormal />
			<YapiPlaceholderView v-if="!APP.projectList.length" view="GroupSectionProjectList" />
		</div>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		inject: ["APP", "GroupSection"],
		components: {
			GroupSectionProjectListPrivate: () => _.$importVue("@/views/Api/Group/Section/ProjectList/Private/GroupSectionProjectListPrivate.vue"),
			GroupSectionProjectListNormal: () => _.$importVue("@/views/Api/Group/Section/ProjectList/Normal/GroupSectionProjectListNormal.vue")
		},
		data() {
			return {};
		},
		mounted() {},
		computed: {
			isShow() {
				return this.$route.query.GroupViewTabName === Vue._var.TAB_KEY_PROJECT_LIST;
			},
			btn_addProject() {
				const vm = this;
				return {
					label: i18n("添加项目"),
					preset: "blue",
					onClick: vm.showAddProjectDialog,
					disabled() {
						if (vm.GroupSection.canAddProject) {
							return "";
						} else {
							return h("div", [h("div", [i18n(`您没有权限添加项目`)]), h("div", [i18n(`请联系该分组组长或管理员`)])]);
						}
					}
				};
			}
		}
	});
}
</script>

<style lang="less">
.GroupSectionProjectList {
	.GroupSectionProjectList-header {
		background: #eee;
		height: 64px;
		line-height: 40px;
		border-radius: var(--border-radius);
		text-align: right;
		padding: 0 10px;
		font-weight: bold;
		margin-bottom: 15px;
		display: flex;
		align-items: center;
		color: var(--color-title);
		font-weight: 500;
	}
}
</style>
