<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xPageHeader @back="goBack" class="mb" />
			<div class="edit-title">基本信息</div>
			<div class="form-wrapper">
				<xForm col="1">
					<xItem :configs="form.账号" />
					<xItem :configs="form.角色名称" />
					<xItem :configs="form.部门" />
					<xItem :configs="form.电话" />
					<xItem label="账号有效时间"> 2023-2-1 </xItem>
					<xItem label="账号状态"> 正常 </xItem>
				</xForm>
			</div>
			<div class="edit-title mt">其他</div>
			<div class="form-wrapper pt">
				<xForm col="1">
					<xItem :configs="form.remarks" span="full" />
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
					电话: {
						label: "电话",
						itemType: "xItemInput",
						value: "",
						rules: [_rules.required(), _rules.mobilePhone()]
					},
					账号: {
						label: "账号",
						itemType: "xItemInput",
						value: "",
						rules: [_rules.required()]
					},
					账号有效时间: { label: "账号有效时间", value: "12345" },
					角色名称: {
						label: "角色",
						value: "",
						itemType: "xItemSelect",
						minWidth: 100,
						options: [
							{ label: "系统管理", value: "系统管理" },
							{ label: "审计管理", value: "审计管理" },
							{ label: "安全管理", value: "安全管理" }
						],
						rules: [_rules.required()]
					},
					部门: {
						label: "部门",
						value: "",
						itemType: "xItemSelect",
						minWidth: 100,
						options: [
							{ label: "系统管理", value: "系统管理" },
							{ label: "审计管理", value: "审计管理" },
							{ label: "安全管理", value: "安全管理" }
						],
						rules: [_rules.required()]
					},
					权限范围: {
						label: "权限范围",
						value: ["系统管理", "审计管理"],
						isGroup: true,
						rules: [_rules.required()],
						itemType: "xItemCheck",
						minWidth: 100,
						options: [
							{ label: "系统管理", value: "系统管理" },
							{ label: "审计管理", value: "审计管理" },
							{ label: "安全管理", value: "安全管理" }
						]
					},
					remarks: { value: "", label: "备注", type: "textarea" }
				})
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: "保存",
					preset: "primary",
					async onClick() {}
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
		methods: {
			goBack() {
				this.$router.push({ path: "/role" });
			}
		}
	});
}
</script>
