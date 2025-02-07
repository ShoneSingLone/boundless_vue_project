<template>
	<xBlock
		class="flex1 mt"
		style="height: 1px; position: relative"
		:bodyClass="{ height100: true, flex: 1 }"
		v-if="isShow">
		<!-- 成员列表 -->
		<xTableVir :columns="columns" :data="APP.groupMemberList" v-if="isShow" />
	</xBlock>
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
							return hSpan([`成员 ${vm.APP.groupMemberList.length} 人`]);
						},
						cellRenderer: ({ rowData }) => {
							return hDiv({ staticClass: "flex middle", key: rowData.uid }, [
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
										style: "width: 150px;",
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
														vm.APP.updateGroupMemberList();
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
						width: 256,
						headerCellRenderer() {
							return hDiv({ class: "flex end width100" }, [
								hxBtn({
									vIf: vm.cptAuth,
									configs: {
										label: "添加成员",
										preset: "blue",
										icon: "el-icon-plus",
										onClick: vm.addMember
									}
								})
							]);
						},
						cellRenderer({ rowData, rowIndex }) {
							if (vm.cptAuth) {
								return hDiv({ staticClass: "flex middle width100" }, [
									h("xItem", {
										configs: vm.item_role,
										value: rowData.role,
										payload: { rowIndex, rowData },
										class: "mr8"
									}),
									hxBtn({
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

								return hDiv({ staticClass: "flex middle width100" }, [
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
						const { data } = await _api.yapi.groupAddMember({
							id: vm.APP.cptCurrentGroup._id,
							member_uids,
							role
						});
						const { add_members, exist_members } = data;
						const addLength = add_members.length;
						const existLength = exist_members.length;
						_.$msg(`新增 ${addLength} 人， ${existLength} 人已存在`);
						vm.APP.updateGroupMemberList();
						dialogVm.closeModal();
					}
				});
			},
			async removeMember(row) {
				const vm = this;
				const { data } = await _api.yapi.group_del_member({
					id: vm.APP.cptCurrentGroup._id,
					member_uid: row.uid
				});
				_.$msg(`移除成功`);
				vm.APP.updateGroupMemberList();
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
			}
		},
		computed: {
			cptAvatarUrl(id) {
				return Vue._common_utils.appendToken(
					`${window._AJAX_URL_PREFIX || ""}/api/user/avatar?uid=${id}`
				);
			},
			isShow() {
				return this.$route.query.GroupViewTabName === Vue._yapi_var.TAB_KEY_MEMBER_LIST;
			},
			cptAuth() {
				return [Vue._yapi_var.OWNER, Vue._yapi_var.ADMIN].includes(
					this.APP.cptCurrentGroup?.role
				);
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
