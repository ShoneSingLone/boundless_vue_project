<template>
	<xDialog>
		<xCard>
			<template #header>
				<xItem
					:configs="form.all"
					class="xItem-pos left"
					style="--xItem-label-width: 80px" />
			</template>
			<div style="height: 300px; margin-left: 73px; position: relative">
				<xTree
					ref="tree"
					:data="allRoleAuthTree"
					:props="props"
					show-checkbox
					:checkedKeys.sync="checkedKeys"
					:expandedKeys.sync="expandedKeys" />
			</div>
		</xCard>
		<template #footer>
			<div class="flex center width100">
				<xBtn :configs="btnOk" />
				<xGap w="32" />
				<xBtn @click="closeModal">{{ i18n("关闭") }}</xBtn>
			</div>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row: role }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(),
		setup() {
			return {
				OLD_PERMISSION: [],
				PERMISSION_MAP: {}
			};
		},
		data(vm) {
			return {
				allRoleAuthTree: [],
				form: defItems({
					all: {
						label: "权限菜单",
						value: false,
						itemType: "xItemCheck",
						options: ["全选"],
						rules: [_rules.required()],
						onEmitValue({ val: isSelectAll }) {
							/* 如果是修改，可以先获取旧数据，再setCheckedKeys */
							if (isSelectAll) {
								const checkedKeys = new Set();
								_.$traverse(vm.allRoleAuthTree, node => {
									checkedKeys.add(node.id);
								});
								vm.checkedKeys = Array.from(checkedKeys);
							} else {
								vm.checkedKeys = [];
							}
						}
					}
				}),
				props: {
					value: "id",
					label: "menuName",
					children: "children"
				},
				checkedKeys: [],
				expandedKeys: [],
				data: []
			};
		},
		computed: {
			cptParams() {
				/* 全量 */
				return _.reduce(
					this.checkedKeys,
					(authArray, uniId) => {
						const item = this.PERMISSION_MAP[uniId];
						if (item) {
							authArray.push({
								roleId: role.id,
								auth: item.per_id
								// id: item.per_id
							});
						}
						return authArray;
					},
					[]
				);
			},
			cptParams_onlyChanged() {
				const params = [];
				const set = (id, auth) =>
					params.push({
						roleId: role.id,
						auth,
						id
					});

				/* 现在有，以前没有=>add */
				_.each(this.checkedKeys, uniId => {
					const item = this.PERMISSION_MAP[uniId];
					if (item) {
						if (!_.includes(this.OLD_PERMISSION, uniId)) {
							set(item.per_id, 1);
						}
					}
				});
				/* 以前有，现在没有=>delete */
				_.each(this.OLD_PERMISSION, uniId => {
					const item = this.PERMISSION_MAP[uniId];
					if (item) {
						if (!_.includes(this.checkedKeys, uniId)) {
							set(item.per_id, 0);
						}
					}
				});

				return params;
			},
			isUpdate() {
				return !!role;
			},
			btnOk() {
				const vm = this;
				return {
					label: "保存",
					preset: "primary",
					async onClick() {
						_.$loading(true);
						try {
							/*  */
							const res = await _api.admin_db_audit.xdsRoleAuth(vm.cptParams);
							_.$msg.success(res.msg);
							vm.closeModal();
						} catch (error) {
							console.error(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			}
		},
		async mounted() {
			await this.getRoleRoleIdMenus();
		},
		methods: {
			async getRoleRoleIdMenus() {
				_.$loading(true);
				try {
					const [{ allTreeData }, { expandedKeys, checkedKeys }] = await Promise.all([
						this.getAllRoleAuthMenuTree(),
						this.getCurrentRoleAuth()
					]);
					this.allRoleAuthTree = allTreeData;
					this.checkedKeys = checkedKeys;
					this.expandedKeys = expandedKeys;
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			/* 从管理员获取全量 */
			async getAllRoleAuthMenuTree() {
				_.$loading(true);
				let allTreeData = [];
				try {
					const { data } = await _api.admin_db_audit.xdsRoleRoleIdMenus({
						id: 1
					});

					_.$traverse(data, node => {
						if (!node.children?.length) {
							node.children = _.map(node.perms, permission => {
								const { id, name, code } = permission;
								const uniId = `${node.id}-${id}`;
								this.PERMISSION_MAP[uniId] = {
									...permission,
									pid: node.id,
									id: uniId,
									menuName: name,
									per_code: code,
									per_id: id
								};
								return this.PERMISSION_MAP[uniId];
							});
						}
					});
					allTreeData = data;
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
					return { allTreeData };
				}
			},
			/* 获取当前角色的权限 */
			async getCurrentRoleAuth() {
				_.$loading(true);
				const checkedKeys = [];
				const expandedKeys = [];
				try {
					const { data } = await _api.admin_db_audit.xdsRoleRoleIdMenus(role);

					_.$traverse(data, node => {
						if (!node.children?.length) {
							if (node.perms?.length) {
								expandedKeys.push(node.id);
								node.children = _.each(node.perms, permission => {
									const { id } = permission;
									const uniId = `${node.id}-${id}`;
									checkedKeys.push(uniId);
								});
							}
						}
					});
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
					this.OLD_PERMISSION = [...checkedKeys];
					return {
						expandedKeys,
						checkedKeys
					};
				}
			}
		}
	});
}
</script>
