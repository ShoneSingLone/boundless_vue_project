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
					<xItem :configs="form.部门名称" />
					<xItem :configs="form.部门ID" />
					<xItem :configs="form.父部门" />
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
					部门名称: { label: "部门名称", value: "", rules: [_rules.required()] },
					部门ID: { label: "部门ID", value: "", rules: [_rules.required()] },
					父部门: { label: "父部门", value: "", rules: [_rules.required()] },
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
				this.$router.push({ path: "/dept" });
			}
		}
	});
}
</script>
