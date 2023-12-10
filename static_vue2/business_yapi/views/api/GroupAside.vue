<template>
	<h1 class="MUST_MODIFY">{{ title }}</h1>
</template>
<script>
export default async function () {
	return defineComponent({
		inject: ["stateApp"],

		setup() {
			return {
				fnShowUpsertGroupDialog: () => console.log("fnShowUpsertGroupDialog"),
				fnUpsertGroupInfo: () => console.log("fnUpsertGroupInfo")
			};
		},
		data() {
			const vm = this;
			vm.searchGroup = _.debounce(() => {
				const { groupList } = vm.stateApp;
				const keywords = vm.configsSearch.value;
				let groupListForShow;

				if (keywords === "") {
					const { true: notInGroup, undefined: inGroup } = _.groupBy(groupList, "notInGroup");
					const { owner, member } = _.groupBy(inGroup, "role");
					let { true: privateSpace, undefined: otherOwner } = _.groupBy(owner, "privateSpace");

					groupListForShow = [
						{
							...(privateSpace?.[0] || {}),
							icon: "icon_group_personal"
						},
						{
							group_name: "分组成员",
							icon: "icon_group_include",
							children: [
								{
									group_name: "所有者",
									icon: "icon_group_include_owner",
									children: _.map(otherOwner, i => ({
										...i,
										icon: "icon_group_include_owner"
									}))
								},
								{
									group_name: "开发者",
									icon: "icon_group_include_member",
									children: _.map(member, i => ({
										...i,
										icon: "icon_group_include_member"
									}))
								}
							]
						},
						{
							group_name: "非分组成员",
							icon: "icon_group_exclude",
							children: _.map(notInGroup, i => ({
								...i,
								icon: "icon_group_exclude"
							}))
						}
					];
				} else {
					groupListForShow = _.filter(groupList, group => new RegExp(keywords, "i").test(group.group_name));
				}

				vm.groupListForShow = groupListForShow;
			}, 300);

			return {
				elScrollbarHeight: 0,
				resizeAside: {
					onMoving({ clickEvent, movingEvent, clickInfo }) {
						const { left: leftStart } = clickInfo;
						let left = 16 + leftStart + movingEvent.clientX - clickEvent.clientX;
						if (left < 100) {
							left = 100;
						}
						vm.styleAside.width = `${left}px`;
					}
				},
				styleAside: {
					width: "300px",
					position: "relative"
				},
				/* ******** */
				configsSearch: defItem({
					isSearch: false,
					value: "",
					placeholder: "搜索分组",
					onAfterEmitItemValue: this.searchGroup,
					clearable: true
				}),
				groupListForShow: [],
				state: {
					addGroupModalVisible: false,
					newGroupName: "",
					newGroupDesc: "",
					cptCurrentGroupName: "",
					cptCurrentGroupDesc: "",
					groupList: [],
					owner_uids: []
				}
			};
		},

		methods: {
			vDomSearchInput() {
				return h("div", { class: "group-operate flex start middle mb10" }, [
					h(
						"xBtn",
						{
							directives: [
								{
									name: "xtips",
									value: {
										content: "添加分组"
									}
								}
							]
						},
						[123]
					),
					h("xItem", { configs: this.configsSearch, class: "flex1" }),
					h("xGap", { l: 10 }),
					h(
						"div",
						{
							directives: [
								{
									name: "xtips",
									value: {
										content: "添加分组"
									}
								}
							],
							class: "btn editSet pointer",
							onClick: this.fnShowUpsertGroupDialog
						},
						[h("xIcon", { icon: "_add", class: "icon-opreation_click" })]
					)
				]);
			},
			setElScrollbarHeight: _.debounce(function ({ height }) {
				/* mt mb 共计20 */
				this.elScrollbarHeight = height;
			}, 300),
			async selectGroup(groupId) {
				if (!groupId) {
					return;
				}
				this.$router.push({ path: "/api/group", query: { ...this.$route.query, groupId } });
			},
			getVDomIconEdit({ group }) {
				if (!group._id) {
					return null;
				}
				const vm = this;
				/*个人空间不可修改name*/
				/*当前用户在当前group的角色是owner*/
				const isGroupRoleAuth = group.role === OWNER;
				/*超级管理员*/
				const isUserRoleAuth = stateApp.user.role === ADMIN;

				if (isGroupRoleAuth || isUserRoleAuth) {
					return h("xIcon", {
						/* v-xtips */
						icon: "edit",
						class: "group-menu-icon editSet pointer",
						style: { width: "16px" },
						onClick: () => {
							vm.fnShowUpsertGroupDialog(group);
						}
					});
				}
			},
			getVDomIconDesc({ group }) {
				if (!!group.group_desc) {
					/*v-xtips={{ content: group.group_desc }} */
					return h("xIcon", {
						class: "x-sider-tree_menu_icon",
						icon: "insideTips"
					});
				} else {
					return null;
				}
			},
			getGroupMenuItemClass({ group }) {
				return {
					"x-sider-tree_menu": true,
					"x-sider-tree_menu_active": stateApp.cptCurrentGroup._id && _.isSame(stateApp.cptCurrentGroup._id, group._id)
				};
			},
			getGroupMenuItem({ group }) {
				return h("div", { class: this.getGroupMenuItemClass({ group }) }, [
					h("div", { class: "x-sider-tree_menu_title" }, [h("xIcon", { class: "x-sider-tree_menu_icon", icon: group.icon }), group.group_name]),
					h("div", { class: "x-sider-tree_menu_opration" }, [this.getVDomIconDesc({ group }), this.getVDomIconEdit({ group })])
				]);
			}
		},
		watch: {
			"stateApp.groupList"() {
				this.searchGroup();
			}
		},
		render() {
			const vm = this;
			return h("aside", { class: "x-sider_wrapper", style: vm.styleAside }, [h("div", { class: "x-sider_wrapper_tree" }, [this.vDomSearchInput()])]);

			return h("aside", { class: "x-sider_wrapper", style: vm.styleAside }, [
				h("div", { class: "x-sider_wrapper_tree" }, [
					this.vDomSearchInput,
					h("elScrollbar", { height: this.elScrollbarHeight }, [
						{
							default: () => {
								return h("elTree", {
									$v: {
										xloading: vm.groupListForShow.length === 0
									},
									data: vm.groupListForShow,
									nodeKey: "_id",
									expandOnClickNode: false,
									defaultExpandAll: true
								});
							}
						}
					]),
					h(
						"div",
						{
							class: "resize_bar",
							icon: "scroll",
							$v: {
								UiMove: this.resizeAside
							}
						},
						[
							{
								default: ({ data: group }) => vm.getGroupMenuItem({ group })
							}
						]
					)
				])
			]);
		}
	});
}
</script>
<style lang="less"></style>
