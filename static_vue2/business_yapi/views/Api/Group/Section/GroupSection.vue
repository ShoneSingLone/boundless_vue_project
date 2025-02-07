<template>
	<section id="GroupSection" class="x-page-view">
		<xPageContent>
			<xAutoResizer :onResize="setSize">
				<div class="flex">
					<GroupSectionProjectList :style="cptListStyle" />
					<div :style="cptDetailStyle" class="GroupInfoPanel flex vertical">
						<xBlock class="group-desc-wrapper" :bodyClass="{ 'flex middle': true }">
							<xRender :render="renderSwitchBtnGroup" />
							<xGap f />
							<xIcon icon="close" @click="closeGroupDetail" class="pointer" />
						</xBlock>
						<GroupSectionMemberList />
						<GroupSectionLog />
						<GroupSectionWiki />
					</div>
				</div>
			</xAutoResizer>
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
		setup() {
			const size = ref({ width: 0, height: 0 });
			this.setSize = ({ width, height }) => {
				this.size = {
					width,
					height
				};
			};

			const cptIsShowGroupInfo = computed(() => {
				return _.$isInput(this.$route.query.groupId);
			});

			const cptListStyle = computed(() => {
				const {
					size: { width, height },
					cptIsShowGroupInfo
				} = this;

				const style = {
					width: width + "px",
					height: height + "px",
					zIndex: 1,
					transition: `all 0.3s ease-in`
				};
				if (cptIsShowGroupInfo) {
					style.filter = `blur(6px)`;
					// style.transform = `translate(-50px, -50px)`;
				}

				return style;
			});

			const cptDetailStyle = computed(() => {
				const {
					size: { width, height },
					cptIsShowGroupInfo
				} = this;

				const style = {
					transition: `all 0.3s ease-in`,
					zIndex: 2,
					position: "absolute",
					transform: `translate(120%, 0)`,
					width: `${width}px`,
					height: `${height}px`,
					background: `var(--page-body-bg, var(--el-color-white))`,
					padding: `var(--ui-one)`,
					"box-shadow": `var(--el-box-shadow)`
				};

				if (cptIsShowGroupInfo) {
					return _.merge(style, {
						transform: `translate(0, 0)`
					});
				}

				return style;
			});

			this.selectGroup = async groupId => {
				if (!groupId) {
					return;
				}
				this.$router.push({ path: "/api/group", query: { groupId } });
			};

			return {
				size,
				cptListStyle,
				cptDetailStyle,
				cptIsShowGroupInfo
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
					return [TAB_KEY_GROUP_LOG, TAB_KEY_GROUP_WIKI];
				}
				return [TAB_KEY_MEMBER_LIST, TAB_KEY_GROUP_LOG, TAB_KEY_GROUP_WIKI];
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
					icon: "el-icon-edit",
					shape: "circle",
					onClick() {
						vm.Group.openGroupUpsertDialog(vm.APP.cptCurrentGroup);
					}
				};
			},
			cptGroupViewTabName() {
				const { GroupViewTabName } = this.$route.query;
				if (this.cptViewList.includes(GroupViewTabName)) {
					return GroupViewTabName;
				} else {
					/* 不存在或者不存在当前角色列表，就默认第一个 */
					this.APP.routerUpsertQuery({ GroupViewTabName: TAB_KEY_MEMBER_LIST });
					return TAB_KEY_MEMBER_LIST;
				}
			}
		},
		methods: {
			closeGroupDetail() {
				this.$router.push({
					path: this.$route.path,
					query: _.omit(this.$route.query, ["groupId"])
				});
			},
			genProjectCard(projectArray, isShow = false) {
				const vm = this;
				return hDiv({ class: "flex like-float" }, [
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
						return hxBtn({
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
