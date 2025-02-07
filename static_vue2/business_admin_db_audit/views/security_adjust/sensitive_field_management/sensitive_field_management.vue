<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent>
			<h3>敏感性字段标准格式文件下载</h3>
			<div style="width: 10%">
				<xBtn preset="primary" @click="handleDown">下载</xBtn>
			</div>
			<h3>敏感性字段标准格式文件上传</h3>
			<div style="width: 10%">
				<xBtn preset="primary" @click="handleUpLoad">选择文件</xBtn>
			</div>
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	return {
		name: "sensitive_field_management",
		data() {
			return {
				key: ""
			};
		},
		methods: {
			async handleDown() {
				await _.$confirm({
					title: "提示",
					content: `是否确认下载敏感性字段标准格式文件？`
				});
				await _api.admin_db_audit.xdsSensitivityDownload();
			},
			async handleUpLoad() {
				const [file] = await _.$openFileSelector();
				if (!file) {
					return;
				}
				var formData = new FormData();
				formData.append("file", file);
				await _.$confirm({
					title: "提示",
					content: `是否确认上传敏感性字段标准格式文件？`
				});
				const { code, msg } = await _api.admin_db_audit.xdsSensitivityUpload(formData);
				if (code === 0) {
					await _.$message.success(msg);
				} else {
					await _.$message.error(msg);
				}
			}
		}
	};
}
</script>

<style scoped lang="scss"></style>
