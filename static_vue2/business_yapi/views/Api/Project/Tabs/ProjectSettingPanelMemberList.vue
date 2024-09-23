<template>
	<div class="flex1 vertical mt" style="height: 1px; position: relative" v-if="isShow">
		<div style="overflow: hidden; position: absolute; width: 100%; height: 100%">
			<xTableVir :columns="columns" :data="cptProjectMembers" v-if="isShow" />
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
							return h("span", [`成员 ${vm.cptProjectMembers.length} 人`]);
						},
						cellRenderer: ({ rowData }) => {
							return h("div", { staticClass: "flex middle", key: rowData.uid }, [
								h("xItem", {
									staticClass: "mr4 ml4",
									configs: {
										value: rowData.uid || "",
										itemType: "YapiItemAvatar",
										disabled: true
									}
								}),
								h(
									"span",
									{
										staticClass: "pointer",
										async onClick() {
											const Component = await _.$importVue(
												"@/views/User/UserProfile.Dialog.vue",
												{
													parent: vm,
													userId: rowData.uid,
													canModifyAvatar:
														rowData.uid === vm.APP.user._id,
													onOk() {
														vm.APP.updateGroupProjectList();
													}
												}
											);
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
									h("xItem", {
										configs: vm.item_role,
										value: rowData.role,
										payload: { rowIndex, rowData },
										class: "mr8"
									}),
									h("xBtn", {
										configs: {
											icon: "el-icon-delete",
											preset: "danger",
											onClick() {
												vm.removeMember(rowData);
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

								return h("div", { staticClass: "flex middle width100" }, [
									ROLE_MAP[rowData.role]
								]);
							}
						}
					}
				]
			};
		},
		methods: {
			async addMember() {
				const vm = this;
				_.$openModal({
					title: i18n("添加成员"),
					url: "@/views/Api/Group/Section/MemberList/GroupSectionMemberList.AddMember.vue",
					parent: vm,
					async onOk({ member_uids, role, dialogVm }) {
						const { data } = await _api.yapi.project_add_member({
							id: vm.APP.cptProject?._id,
							member_uids,
							role
						});
						const { add_members, exist_members } = data;
						const addLength = add_members.length;
						const existLength = exist_members.length;
						_.$msg(`新增 ${addLength} 人， ${existLength} 人已存在`);
						vm.APP.updateGroupProjectList();
						dialogVm.closeModal();
					}
				});
			},
			async removeMember(row) {
				const vm = this;
				const { data } = await _api.yapi.project_del_member({
					id: vm.APP.cptProject._id,
					member_uid: row.uid
				});
				_.$msg(`移除成功`);
				vm.APP.updateGroupProjectList();
			},

			async changeMemberRole({ role, uid, index }) {
				const groupId = this.APP.cptCurrentGroup._id;
				_.$loading(true);
				try {
					if (role) {
						await _api.yapi.project_change_member_role({
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
				return Vue._common_utils.appendToken(
					`${window._URL_PREFIX_4_DEV || ""}/api/user/avatar?uid=${id}`
				);
			}
		},
		computed: {
			cptProjectMembers() {
				return this.APP.cptProject?.members || [];
			},
			isShow() {
				return true;
			},
			cptAuth() {
				if (this.APP.user?.role === Vue._yapi_var.ADMIN) {
					return true;
				}
				return _.some(this.APP?.cptProject?.members, member => {
					return member.uid === this.APP?.user?._id;
				});
			}
		},
		watch: {
			"APP.cptGroupId": {
				immediate: true,
				async handler(groupId) {
					if (groupId) {
						try {
							this.APP.updateGroupProjectList();
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
