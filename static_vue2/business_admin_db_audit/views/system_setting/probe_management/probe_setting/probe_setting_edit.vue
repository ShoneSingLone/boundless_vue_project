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
					<xItem :configs="form.ipv4" />
					<xItem :configs="form.ipv6" />
					<xItem :configs="form.port" />
					<xItem :configs="form.active" />
				</xForm>
			</div>
			<div class="edit-title mt">其他</div>
			<div class="form-wrapper">
				<xForm col="1">
					<xItem :configs="form.remarks" />
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
					ipv4: { value: "", label: "Pv4地址" },
					ipv6: { value: "", label: "Pv6地址" },
					port: { value: "", label: "端口" },
					active: { value: false, label: "启用/关闭", itemType: "xItemSwitch" },
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
					async onClick() {}
				};
			}
		},
		methods: {
			goBack() {
				this.$router.push({ path: "/system_setting/probe_management/probe_setting" });
			}
		}
	});
}
</script>
