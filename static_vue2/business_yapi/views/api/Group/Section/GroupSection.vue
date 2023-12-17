<template>
	<section class="box-shadow flex1 white-border padding flex vertical">
		<div class="flex vertical">
			<xBlock class="mb group-desc-wrapper">
				<xMd :md="cptGroupDesc" />
				<xBtn :configs="btnEditGroup" class="edit-group-desc" />
			</xBlock>
			<xRender :render="renderSwitchBtnGroup" />
		</div>
		<GroupSectionProjectList />
		<div>{this.vDomTabMember}</div>
		<div>{this.vDomTabGroupLog}</div>
		<div>{this.vDomTabGroupWiki}</div>
	</section>
</template>
<script>
export default async function () {
	const TAB_KEY_PROJECT_LIST = Vue._var.TAB_KEY_PROJECT_LIST;
	const TAB_KEY_MEMBER_LIST = Vue._var.TAB_KEY_MEMBER_LIST;
	const TAB_KEY_GROUP_LOG = Vue._var.TAB_KEY_GROUP_LOG;
	const TAB_KEY_GROUP_WIKI = Vue._var.TAB_KEY_GROUP_WIKI;
	const ADMIN = Vue._var.ADMIN;
	const OWNER = Vue._var.OWNER;

	return defineComponent({
		inject: ["APP", "Group"],
		components: {
			GroupSectionProjectList: () => _.$importVue("@/views/Api/Group/Section/ProjectList/GroupSectionProjectList.vue")
		},
		provide() {
			const GroupSection = this;
			return {
				GroupSection
			};
		},
		data() {
			return {
				btnArray: [TAB_KEY_PROJECT_LIST, TAB_KEY_MEMBER_LIST, TAB_KEY_GROUP_LOG, TAB_KEY_GROUP_WIKI]
			};
		},
		computed: {
			cptGroupDesc() {
				return `${this.APP.cptCurrentGroup.group_desc || "分组简介"}`;
			},
			btnEditGroup() {
				const vm = this;
				return {
					// label: i18n("编辑分组"),
					icon: "el-icon-edit",
					circle: true,
					onClick: vm.upsertGroup
				};
			},
			canAddProject() {
				const isGroupRoleAuth = [ADMIN, OWNER].includes(this.APP?.cptCurrentGroup?.role);
				const _isShow = isGroupRoleAuth || [ADMIN, OWNER].includes(this.APP.user.role);
				if (!_isShow) {
					console.log("canAddProject", this.APP.user.role);
				}
				return _isShow;
			},
			cptGroupViewTabName() {
				const { GroupViewTabName } = this.$route.query;
				if (!GroupViewTabName) {
					this.APP.routerUpsertQuery({ GroupViewTabName: TAB_KEY_PROJECT_LIST });
					return TAB_KEY_PROJECT_LIST;
				}
				return GroupViewTabName;
			}
		},
		methods: {
			upsertGroup() {
				this.Group.upsertGroup(this.APP.cptCurrentGroup);
			},
			genProjectCard(projectItems, isShow = false) {
				return h("div", { class: "flex like-float" }, [
					_.map(projectItems, (item, index) => {
						return h("YapiProjectCard", {
							isShow,
							index,
							projectData: item,
							callbackResult: this.updateProjectList
						});
					})
				]);
			},
			renderSwitchBtnGroup() {
				const vm = this;
				return h(
					"xBtnGroup",
					_.map([TAB_KEY_PROJECT_LIST, TAB_KEY_MEMBER_LIST, TAB_KEY_GROUP_LOG, TAB_KEY_GROUP_WIKI], tabName => {
						return h("xBtn", {
							configs: {
								label: tabName,
								preset: vm.cptGroupViewTabName === tabName ? "blue" : "",
								onClick() {
									vm.APP.routerUpsertQuery({ GroupViewTabName: tabName });
								}
							}
						});
					})
				);
			}
		}
	});
}
</script>
<style lang="less">
.group-desc-wrapper {
	position: relative;
	max-height: 300px;
	overflow: auto;
	.edit-group-desc {
		display: none;
	}
	&:hover {
		.edit-group-desc {
			position: absolute;
			display: block;
			left: 0;
			top: 0;
		}
	}
}
</style>
