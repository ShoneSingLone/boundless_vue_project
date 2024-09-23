<style lang="less"></style>
<template>
	<xDialog style="width: 60vw">
		<div class="edit-title">新增菜单</div>
		<div class="form-wrapper">
			<xForm col="1">
				<xItem :configs="form.menuName" />
				<xItem :configs="form.menuType" />
				<xItem :configs="form.menuCode" />
				<xItem :configs="form.path" />
				<xItem :configs="form.pid" />
				<xItem :configs="form.菜单图标" />
			</xForm>
		</div>
		<div class="edit-title mt">操作</div>
		<div class="flex middle width100 mt">
			<xGap f />
			<xBtn :configs="btnAppend" />
			<xBtn :configs="btnGen" />
		</div>
		<xForm col="1">
			<MenuActionItem
				v-for="(item, index) in actionList"
				:item="item"
				:index="index"
				:key="item._hash"
				@update:item="item => updateItem({ index, item })"
				@remove="remove({ index })" />
		</xForm>
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
export default async function ({ row, menuArrTree }) {
	const newItem = () => ({ _hash: _.$genId() });
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		props: useDialogProps(),
		components: { MenuActionItem: () => _.$importVue("@/views/Menu/MenuActionItem.vue") },
		data(vm) {
			return {
				actionList: [],
				form: defItems({
					menuName: {
						label: "菜单名称",
						value: "",
						rules: [_rules.required()]
					},
					menuType: {
						label: "菜单类型",
						value: "",
						itemType: "xItemSelect",
						minWidth: 100,
						options: _opts.admin_db_audit.menuType,
						rules: [_rules.required()]
					},
					menuCode: { label: "菜单编号", value: "12345" },
					path: {
						label: "页面路径",
						value: "",
						rules: [_rules.required()]
					},
					pid: {
						label: "父级菜单",
						value: "",
						// itemType: "xItemCascader",
						itemType: "xItemSelect",
						minWidth: 100,
						options: [],
						rules: [_rules.required()]
					},
					菜单图标: {
						label: "菜单图标",
						value: ["系统管理", "审计管理"],
						isGroup: true,
						rules: [_rules.required()],
						itemType: "AdminIconSelector",
						minWidth: 100
					}
				})
			};
		},
		computed: {
			cptTitle() {
				return `当前操作：修改 [${row.menuName}] 菜单`;
			},
			menuArrTree() {
				return _.cloneDeep(menuArrTree);
			},
			cptCurrentNodeId() {
				return row?.id;
			},
			btnOk() {
				const vm = this;
				return {
					label: "保存",
					preset: "primary",
					async onClick() {
						vm.handleSubmit();
					}
				};
			},
			btnAppend() {
				const vm = this;
				return {
					label: "添加一行",
					icon: "_add",
					preset: "primary",
					async onClick() {
						vm.actionList.push(newItem());
					}
				};
			},
			btnGen() {
				const vm = this;
				return {
					label: "生成默认操作",
					icon: "_gen",
					async onClick() {
						const _actionList = [
							{ name: "查询", code: "query", disabled: true },
							{ name: "添加", code: "add", disabled: true },
							{ name: "删除", code: "delete", disabled: true },
							{ name: "编辑", code: "edit", disabled: true }
						];
						vm.actionList.push(..._actionList);
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: "关闭",
					async onClick() {
						vm.goBack();
					}
				};
			}
		},
		mounted() {
			if (row && Object.keys(row).length > 0) {
				// this.form.menuName.value=row.menuName;
				// this.form.menuCode.value=row.menuCode;
				// this.form.menuType.value=row.menuType;
				// this.form.path.value=row.path;
				// this.form.pid.value=row.pid;
			}
			if (menuArrTree && menuArrTree.length > 0) {
				let arr = [];
				function handleSetPid(list = []) {
					list.forEach(item => {
						if (item.children && item.children.length > 0) {
							handleSetPid(item.children);
						} else if (item.children && item.children.length === 0) {
							delete item.children;
						}
						arr.push({
							label: item.menuName,
							value: item.id
						});
					});
				}
				handleSetPid(menuArrTree);
				// function handleSetLabelValue(list = []) {
				// 		list.forEach(item => {
				//       if(item.children && item.children.length>0){
				//         handleSetLabelValue(item.children);
				//       }else if (item.children && item.children.length === 0){
				//         delete item.children;
				//       }
				// 			item.label = item.menuName;
				// 			item.value = item.menuCode;
				// 		});
				// };
				// handleSetLabelValue(val);
				this.form.pid.options = arr;
			}
		},
		methods: {
			async handleSubmit() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}
				let obj = _.$pickFormValues(this.form);
				const a = this.actionList.map(item => ({ ...item, code: item.id }));

				const { code, msg } = await _api.admin_db_audit.xdsMenuAdd({
					...obj,
					perms: this.actionList.map(item => ({ ...item, code: item.id }))
				});
				if (code === 0) {
					_.$msg(msg);
				} else {
					_.$msgError(msg);
				}
			},
			updateItem({ index, item }) {
				this.actionList.splice(index, 1, item);
			},
			remove({ index, item }) {
				// const actionList = _.cloneDeep(this.actionList);
				// _.remove(actionList, x => x._hash === item._hash);
				// this.actionList = actionList;
				this.actionList.splice(index, 1);
			},
			goBack() {
				this.$router.push({ path: "/role" });
			}
		}
	});
}
</script>
