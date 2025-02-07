<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageHeader @back="goBack" style="margin: 15px 20px 0" />
		<xPageContent>
			<div class="edit-title">基本信息</div>
			<div class="form-wrapper">
				<xForm col="1">
					<xItem :configs="form.nickName" />
					<xItem :configs="form.sex" />
					<xItem :configs="form.phone" />
				</xForm>
			</div>
			<div class="form-wrapper mt">
				<xBtn :configs="btnOk" />
				<xGap w="40" />
				<xBtn :configs="btnCancel" />
			</div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		mounted() {},
		data(vm) {
			return {
				form: defItems({
					nickName: { label: "昵称", value: "", rules: [] },
					sex: {
						label: "性别",
						value: "1",
						itemType: "xItemRadioGroup",
						minWidth: 80,
						options: _opts.admin_db_audit.sex
					},
					phone: { label: "手机号", value: "", rules: [_rules.mobilePhone()] }
				})
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: "保存",
					preset: "primary",
					async onClick() {
						try {
							_.$loading(true);
							const params = _.merge(vm.APP.user, _.$pickFormValues(vm.form));
							const { code, msg } =
								await _api.admin_db_audit.xdsUserEditPersonal(params);
							if (code === 0) {
								_.$msg(msg);
								vm.goBack();
							} else {
								_.$msgError(msg);
							}
						} catch (error) {
							console.error(error);
						} finally {
							_.$loading(false);
						}
					}
				};
			},
			btnCancel() {
				const vm = this;
				return {
					label: "取消",
					async onClick() {
						vm.goBack();
					}
				};
			}
		},
		watch: {
			"APP.user": {
				immediate: true,
				handler(user) {
					_.$setFormValues(
						this.form,
						_.merge(user, {
							nickName: user.userName,
							sex: String(user.sex)
						})
					);
				}
			}
		},
		methods: {
			goBack() {
				this.$router.back();
			}
		}
	});
}
</script>
