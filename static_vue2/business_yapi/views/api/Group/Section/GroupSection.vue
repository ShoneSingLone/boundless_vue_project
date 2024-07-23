<template>
	<section id="GroupSection" class="x-page-view">
		<xPageContent>
			<xBlock class="mb group-desc-wrapper">
				<xCollapse>
					<xCollapseItem>
						<template #title>
							<span class="group-name">
								{{ cptGroupName }}
							</span>
						</template>
						<xMd :md="cptGroupDesc" />
					</xCollapseItem>
				</xCollapse>
				<xBtn :configs="btnEditGroup" class="edit-group-desc ml" />
			</xBlock>
			<xRender :render="renderSwitchBtnGroup" />
			<GroupSectionProjectList />
			<GroupSectionMemberList />
			<GroupSectionLog />
			<GroupSectionWiki />
		</xPageContent>
	</section>
</template>
<script lang="ts">
export default async function () {
	const TAB_KEY_PROJECT_LIST = Vue._yapi_var.TAB_KEY_PROJECT_LIST;
	const TAB_KEY_MEMBER_LIST = Vue._yapi_var.TAB_KEY_MEMBER_LIST;
	const TAB_KEY_GROUP_LOG = Vue._yapi_var.TAB_KEY_GROUP_LOG;
	const TAB_KEY_GROUP_WIKI = Vue._yapi_var.TAB_KEY_GROUP_WIKI;
	const ADMIN = Vue._yapi_var.ADMIN;
	const OWNER = Vue._yapi_var.OWNER;

	return defineComponent({
		inject: ["APP", "Group"],
		components: {
			GroupSectionProjectList: () =>
				_.$importVue("@/views/Api/Group/Section/ProjectList/GroupSectionProjectList.vue"),
			GroupSectionMemberList: () =>
				_.$importVue("@/views/Api/Group/Section/MemberList/GroupSectionMemberList.vue"),
			GroupSectionLog: () =>
				_.$importVue("@/views/Api/Group/Section/Log/GroupSectionLog.vue"),
			GroupSectionWiki: () =>
				_.$importVue("@/views/Api/Group/Section/Wiki/GroupSectionWiki.vue")
		},
		provide() {
			const GroupSection = this;
			return {
				GroupSection
			};
		},
		data() {
			return {
				btnArray: [
					TAB_KEY_PROJECT_LIST,
					TAB_KEY_MEMBER_LIST,
					TAB_KEY_GROUP_LOG,
					TAB_KEY_GROUP_WIKI
				]
			};
		},
		computed: {
			cptViewList() {
				if (this.APP.cptCurrentGroup.privateSpace) {
					return [TAB_KEY_PROJECT_LIST, TAB_KEY_GROUP_LOG, TAB_KEY_GROUP_WIKI];
				}
				return [
					TAB_KEY_PROJECT_LIST,
					TAB_KEY_MEMBER_LIST,
					TAB_KEY_GROUP_LOG,
					TAB_KEY_GROUP_WIKI
				];
			},
			cptGroupDesc() {
				return `${this.APP.cptCurrentGroup?.group_desc || "分组简介"}`;
			},
			cptGroupName() {
				return `${this.APP.cptCurrentGroup?.group_name || "--"}`;
			},
			btnEditGroup() {
				const vm = this;
				return {
					// label: i18n("编辑分组"),
					icon: "el-icon-edit",
					shape: "circle",
					onClick: vm.openGroupUpsertDialog
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
				if (this.cptViewList.includes(GroupViewTabName)) {
					return GroupViewTabName;
				} else {
					/* 不存在或者不存在当前角色列表，就默认第一个 */
					this.APP.routerUpsertQuery({ GroupViewTabName: TAB_KEY_PROJECT_LIST });
					return TAB_KEY_PROJECT_LIST;
				}
			}
		},
		methods: {
			openGroupUpsertDialog() {
				this.Group.openGroupUpsertDialog(this.APP.cptCurrentGroup);
			},
			genProjectCard(projectArray, isShow = false) {
				const vm = this;
				return h("div", { class: "flex like-float" }, [
					_.map(projectArray, (projectData, index) => {
						return h("YapiProjectCard", {
							onChange() {
								vm.APP.updateGroupProjectList();
							},
							isShow,
							index,
							projectData
						});
					})
				]);
			},
			renderSwitchBtnGroup() {
				const vm = this;
				return h(
					"xBtnGroup",
					_.map(vm.cptViewList, tabName => {
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
#GroupSection {
	flex: 1;
	.group-desc-wrapper {
		position: relative;
		.el-collapse,
		.el-collapse-item__header {
			border-top: unset;
			border-bottom: unset;
			.group-name {
				font-size: 16px;
				font-weight: 600;
			}
		}
		.el-collapse-item__wrap {
			max-height: 300px;
			border-bottom: unset;
			overflow: auto;
			.el-collapse-item__content {
				padding-bottom: unset;
			}
		}
		.edit-group-desc {
			display: none;
			position: absolute;
			transition: 0.3s ease-in-out;
		}

		&:hover {
			.edit-group-desc {
				top: -12px;
				left: -28px;
				display: block;
				z-index: 1;
			}
		}
	}
}
</style>
