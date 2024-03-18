<template>
	<div class="flex1 vertical mt" style="height: 1px; position: relative" v-if="isShow">
		<div style="overflow: hidden; position: absolute; width: 100%; height: 100%">
			<xTableVir :columns="columns" :data="APP.groupMemberList" v-if="isShow" />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		data() {
			const vm = this;
			return {
				item_role: defItem({
					itemType: "xItemSelect",
					options: [
						{ label: "组长", value: Vue._yapi_var.OWNER },
						{ label: "开发者", value: Vue._yapi_var.DEV },
						{ label: "访客", value: Vue._yapi_var.GUEST }
					],
					onEmitValue({ val: role, xItem }) {
						const { rowIndex, rowData } = xItem.payload;
						if (rowData.role === role) {
							return;
						}
						vm.changeMemberRole({ role, uid: rowData.uid, index: rowIndex });
					}
				}),
				columns: [
					{
						prop: `a`,
						label: `b`,
						headerCellRenderer() {
							return h("span", [`成员 ${vm.APP.groupMemberList.length} 人`]);
						},
						cellRenderer: ({ rowData }) => {
							return h("div", { staticClass: "flex middle", key: rowData.uid }, [
								h("xItem", {
									staticClass: "mr4 ml4",
									configs: {
										value: rowData.uid,
										itemType: "YapiItemAvatar",
										disabled: true
									}
								}),
								h(
									"span",
									{
										staticClass: "pointer",
										async onClick() {
											const Component = await _.$importVue("@/views/User/UserProfile.Dialog.vue", {
												parent: vm,
												userId: rowData.uid,
												canModifyAvatar: rowData.uid === vm.APP.user._id,
												onOk() {
													vm.APP.updateGroupMemberList();
												}
											});
											_.$openWindow_deprecated(i18n("个人中心"), Component);
										}
									},
									[rowData.username]
								)
							]);
						}
					},
					{
						prop: `b`,
						label: `b`,
						width: 200,
						headerCellRenderer() {
							return h("xBtn", {
								vIf: vm.cptAuth,
								configs: {
									label: "添加成员",
									preset: "blue",
									icon: "el-icon-plus",
									onClick: vm.addMember
								}
							});
						},
						cellRenderer({ rowData, rowIndex }) {
							if (vm.cptAuth) {
								return h("div", { staticClass: "flex middle width100" }, [
									h("xItem", { configs: vm.item_role, value: rowData.role, payload: { rowIndex, rowData }, class: "mr8" }),
									h("xBtn", {
										configs: {
											icon: "el-icon-delete",
											preset: "danger",
											onClick() {
												vm.editMember(rowData);
											}
										}
									})
								]);
							} else {
								const ROLE_MAP = {
									owner: i18n("组长"),
									dev: i18n("开发者"),
									guest: i18n("访客")
								};
								// 非管理员可以看到权限 但无法修改

								return h("div", { staticClass: "flex middle width100" }, [ROLE_MAP[rowData.role]]);
							}
						}
					}
				]
			};
		},
		methods: {
			async addMember() {
				const vm = this;
				const addMember = await _.$importVue("@/views/Api/Group/Section/MemberList/GroupSectionMemberList.AddMember.vue", {
					parent: this,
					onOk() {
						vm.APP.updateGroupMemberList();
					}
				});
				_.$openWindow_deprecated(i18n("添加成员"), addMember);
			},
			async changeMemberRole({ role, uid, index }) {
				const groupId = this.APP.cptCurrentGroup._id;
				_.$loading(true);
				try {
					if (role) {
						await _api.yapi.groupChangeMemberRole({
							id: groupId,
							member_uid: uid,
							role
						});
						this.APP.groupMemberList[index].role = role;
					}
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading(false);
				}
			},
			cptAvatarUrl(id) {
				return Vue._yapi_utils.appendToken(`${window._URL_PREFIX_4_DEV || ""}/api/user/avatar?uid=${id}`);
			}
		},
		computed: {
			isShow() {
				return this.$route.query.GroupViewTabName === Vue._yapi_var.TAB_KEY_MEMBER_LIST;
			},
			cptAuth() {
				return [Vue._yapi_var.OWNER, Vue._yapi_var.ADMIN].includes(this.APP.cptCurrentGroup?.role);
			}
		},
		watch: {
			"APP.cptGroupId": {
				immediate: true,
				async handler(groupId) {
					if (groupId) {
						try {
							this.APP.updateGroupMemberList();
						} catch (error) {
							_.$msgError(error);
						}
					}
				}
			}
		}
	});
}
</script>
<style lang="less"></style>
