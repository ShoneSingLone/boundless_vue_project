<template>
	<xDialog :style="labelStyle">
		<xCard>
			<div>
				<xItem :configs="form.img" id="UserProfileAvatar" />
				<div class="flex center mt8" style="width: 120px">用户ID：{{ form.uid.value }}</div>
			</div>
			<xDivider>基本信息</xDivider>
			<xForm col="1">
				<xItem :configs="form.username" span="full" />
				<xItem :configs="form.email" span="full" />
				<xItem :configs="form.role" />
				<xItem :configs="form.type" span="full" />
				<xItem :configs="form.add_time" span="full" />
				<xItem :configs="form.up_time" span="full" />
			</xForm>
		</xCard>
		<xGap t />
		<div class="width100 x-padding">
			<xDivider>密码管理</xDivider>
			<xForm col="1" ref="modify_pwd">
				<xItem :configs="formPwd.old_password" />
				<xItem :configs="formPwd.password" />
				<div class="flex end width100">
					<xBtn :configs="cptBtnModifyPwd" />
				</div>
			</xForm>
		</div>
		<template #footer>
			<xBtn :configs="cptBtnDelete" />
			<xGap f />
			<xBtn :configs="cptBtnOk" />
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ onOk, userId, canModifyAvatar }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return {
		inject: ["APP"],
		props: useDialogProps(),
		mounted() {
			this.init();
		},
		data(vm) {
			return {
				form: defItems({
					img: {
						value: "",
						itemType: "YapiItemAvatar",
						disabled: !canModifyAvatar
					},
					uid: {
						value: "",
						label: i18n("用户ID"),
						readonly: true
					},
					email: {
						value: "",
						label: i18n("邮箱地址"),
						rules: [_rules.required()],
						readonly: true
					},
					username: {
						value: "",
						label: i18n("用户名"),
						rules: [_rules.required()],
						readonly() {
							if (vm.cptCurrentIsRootAdmin) {
								return false;
							}
							if (canModifyAvatar) {
								return false;
							}
							return true;
						}
					},
					role: {
						value: "",
						label: i18n("角色"),
						readonly: true,
						itemType: "xItemSelect",
						options: _opts.yapi.role
					},
					type: {
						value: "",
						label: i18n("登陆方式"),
						readonly: true
					},
					add_time: {
						value: "",
						label: i18n("创建时间"),
						readonly: true
					},
					up_time: {
						value: "",
						label: i18n("更新时间"),
						readonly: true
					}
				}),
				formPwd: defItems({
					old_password: {
						value: "",
						label: i18n("旧密码"),
						isPwd: true,
						rules: [_rules.required(i18n("请输入密码"))],
						isHide() {
							if (vm.cptCurrentIsRootAdmin && canModifyAvatar) {
								/* 管理员可修改自己的密码需要提供旧密码 */
								return false;
							} else {
								/* 非管理员修改密码需要提供旧密码 */
								if (canModifyAvatar) {
									return false;
								}
							}

							return true;
						}
					},
					password: {
						value: "",
						label: i18n("新密码"),
						isPwd: true,
						rules: [_rules.required(i18n("请输入密码"))],
						isHide() {
							if (vm.cptCurrentIsRootAdmin) {
								/* 管理员可以修改密码 */
								return false;
							}
							if (canModifyAvatar) {
								/* 自己可以修改密码 */
								return false;
							}
							return true;
						}
					}
				})
			};
		},
		computed: {
			cptBtnModifyPwd() {
				const vm = this;
				return {
					label: "重置",
					async onClick() {
						_.$loading(true);
						try {
							const [error] = await _.$validateForm(vm.$refs.modify_pwd);
							if (error) {
								return;
							}
							await _api.yapi.userChangePassword({
								uid: userId,
								password: vm.formPwd.password.value,
								old_password: vm.formPwd.old_password.value
							});
							_.$msg("重置密码成功");
						} catch (error) {
							_.$msgError(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			},
			cptCurrentIsRootAdmin() {
				return this.APP.user.role === "admin";
			},
			labelStyle() {
				return {
					"--xItem-label-width": "144px"
				};
			},
			cptFormData() {
				return _.$pickFormValues(this.form);
			},
			cptBtnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						_.$loading(true);
						try {
							await _api.yapi.userUpdate({
								uid: userId,
								username: vm.form.username.value
							});
							_.$msg("修改成功");
							vm.closeModal();
							onOk && onOk();
						} catch (error) {
							_.$msgError(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			},
			cptBtnDelete() {
				const vm = this;
				return {
					isHide: !vm.cptCurrentIsRootAdmin,
					label: i18n("删除"),
					preset: "danger",
					async onClick() {
						try {
							await _.$confirm_important("是否删除当前用户？");
							_.$loading(true);
							const res = await _api.yapi.userDel(userId);
							vm.closeModal();
							onOk && onOk();
						} catch (error) {
							_.$msgError(error);
							console.error(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			}
		},
		methods: {
			async init() {
				this.fillFormData();
			},
			async fillFormData() {
				const { data: userInfo } = await _api.yapi.userById(userId);
				_.$fillBackData({
					form: this.form,
					data: {
						...userInfo,
						uid: userInfo.uid,
						img: userInfo.uid,
						add_time: _.$dateFormat(userInfo.add_time),
						up_time: _.$dateFormat(userInfo.up_time)
					},
					order: [
						"img",
						"uid",
						"username",
						"email",
						"role",
						"type",
						"add_time",
						"up_time"
					]
				});
			}
		}
	};
}
</script>

<style lang="less">
#UserProfileAvatar {
	--xitem-avatar-width: 120px;
	--xitem-avatar-height: 120px;
	width: 120px;
	height: 120px;
	border-radius: 50%;
}
</style>
