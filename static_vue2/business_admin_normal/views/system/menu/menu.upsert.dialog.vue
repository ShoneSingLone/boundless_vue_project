<template>
	<xDialog style="width: 800px; min-height: 500px">
		<xCard>
			<xForm ref="form">
				<xItem :configs="form.parentId" span="full" />
				<xItem :configs="form.menuType" span="1" />
				<xItem :configs="form.icon" span="1" />
				<xItem :configs="form.menuName" span="1" />
				<xItem :configs="form.orderNum" span="1" />
				<xItem :configs="form.isFrame" span="1" />
				<xItem :configs="form.path" span="1" />
				<xItem :configs="form.component" span="1" />
				<xItem :configs="form.perms" span="1" />
				<xItem :configs="form.query" span="full" />
				<xItem :configs="form.isCache" span="1" />
				<xItem :configs="form.visible" span="1" />
				<xItem :configs="form.status" span="1" />
			</xForm>
		</xCard>
		<template #footer>
			<xBtn :configs="btnOk" />
			<xBtn @click="closeModal">{{ i18n("Cancel") }}</xBtn>
		</template>
	</xDialog>
</template>
<script lang="ts">
export default async function ({ row, onClick, isAppend }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	const { sys_show_hide, sys_normal_disable } = await _adminTools.newDicts({
		sys_show_hide: null,
		sys_normal_disable: null
	});

	row = row || {};
	const isUpdate = !!row.menuId;
	/* 在父节点下追加新节点 */
	isAppend = !!isAppend;

	return defineComponent({
		props: useDialogProps(),
		mounted() {
			this.fillbackFormData();
		},
		data() {
			const vm = this;
			return {
				isUpdate,
				form: defItems({
					parentId: {
						value: 0,
						label: i18n("上级菜单"),
						itemType: "AdminMenuCascader",
						rules: [_rules.required()]
					},
					menuType: {
						value: "M",
						label: i18n("菜单类型"),
						itemType: "xItemSelect",
						options: [
							{ label: i18n("目录"), value: "M" },
							{ label: i18n("菜单"), value: "C" },
							{ label: i18n("按钮"), value: "F" }
						],
						rules: [_rules.required()]
					},
					icon: {
						value: "",
						isHide() {
							return vm.cptIsFunctionType;
						},
						label: i18n("菜单图标"),
						itemType: "AdminIconSelector",
						rules: [_rules.required()]
					},
					menuName: {
						value: "",
						label: i18n("菜单名称"),
						rules: [_rules.required()]
					},
					orderNum: {
						value: "",
						label: i18n("显示排序"),
						isNumber: true,
						min: 0,
						rules: [_rules.required()]
					},
					isFrame: {
						value: "1",
						label: i18n("是否外链"),
						itemType: "xItemRadioGroup",
						isButton: true,
						tips: "选择是外链则路由地址需要以`http(s)://`开头",
						options: [
							{ label: i18n("yes_answer"), value: "0" },
							{ label: i18n("no_answer"), value: "1" }
						],
						rules: [_rules.required()]
					},
					isCache: {
						value: "1",
						label: i18n("是否缓存"),
						itemType: "xItemRadioGroup",
						isButton: true,
						tips: "选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致",
						isHide() {
							return vm.cptNotMenuType;
						},
						options: [
							{ label: i18n("缓存"), value: "0" },
							{ label: i18n("不缓存"), value: "1" }
						],
						rules: [_rules.required()]
					},
					visible: {
						value: "1",
						label: i18n("显示状态"),
						itemType: "xItemRadioGroup",
						isButton: true,
						tips: "选择隐藏则路由将不会出现在侧边栏，但仍然可以访问",
						isHide() {
							return vm.cptIsFunctionType;
						},
						options: sys_show_hide,
						rules: [_rules.required()]
					},
					status: {
						value: "1",
						label: i18n("菜单状态"),
						itemType: "xItemRadioGroup",
						isButton: true,
						tips: "选择停用则路由将不会出现在侧边栏，也不能被访问",
						isHide() {
							return vm.cptIsFunctionType;
						},
						options: sys_normal_disable,
						rules: [_rules.required()]
					},
					path: {
						value: "",
						label: i18n("路由地址"),
						tips: "访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头",
						isHide() {
							return vm.cptIsFunctionType;
						},
						rules: [_rules.required()]
					},
					component: {
						value: "",
						label: i18n("组件路径"),
						tips: "访问的组件路径，如：`system/user/index`，默认在`views`目录下",
						placeholder: "请输入组件路径",
						isHide() {
							return vm.cptNotMenuType;
						}
					},
					perms: {
						value: "",
						label: i18n("权限字符"),
						tips: "控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)",
						isHide() {
							return vm.form.menuType.value === "M";
						}
					},
					query: {
						value: "",
						label: i18n("路由参数"),
						tips: '访问路由的默认传递参数，如：`{"id": 1, "name": "ry"}`',
						isHide() {
							return vm.cptNotMenuType;
						}
					}
				})
			};
		},
		computed: {
			cptIsFunctionType() {
				return this.form.menuType.value === "F";
			},
			cptNotMenuType() {
				return this.form.menuType.value !== "C";
			},
			cptMenuId() {
				return row?.menuId;
			},
			btnOk() {
				const vm = this;
				return {
					label: i18n("OK"),
					preset: "blue",
					async onClick() {
						vm.onClickOk();
					}
				};
			}
		},
		methods: {
			async fillbackFormData() {
				if (isUpdate) {
					const { data } = await _adminTools.api_menu_by_menuId(row.menuId);
					row = data;
					if (isAppend) {
						if (row.menuId) {
							row.parentId = row.menuId;
							delete row.menuId;
						}
					}
					_.$setFormValues(this.form, row);
				}
			},
			async onClickOk() {
				const [error] = await _.$validateForm(this.$el);
				if (error) {
					return;
				}

				const formData = _.$pickFormValues(this.form);
				try {
					if (isUpdate && !isAppend) {
						await _adminTools.api_menu_modify({
							...row,
							...formData
						});
					} else {
						await _adminTools.api_menu_new(formData);
					}
					onClick();
					_.$msg(isUpdate ? "修改成功" : "新增成功");
					this.closeModal();
				} catch (error) {
					_.$msgError(error?.msg || error);
				}
			}
		}
	});
}
</script>
