<style lang="less"></style>
<template>
	<div class="x-page-view">
		<xPageTitle>
			<NavbarBreadcrumb />
		</xPageTitle>
		<xPageContent style="padding-top: 0">
			<xPageHeader @back="goBack" class="mb" />
			<div class="x-padding">
				<xInfoCard :configs="detailInfo" />
			</div>
			<div class="form-wrapper" style="width: 800px"></div>
		</xPageContent>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		mounted() {},
		data(vm) {
			return {};
		},
		computed: {
			detailInfo() {
				return {
					title: i18n("基本信息"),
					labelWidth: 200,
					items: {
						访问时间: { label: "访问时间", content: "2023-2-2" },
						客户端MAC: { label: "客户端MAC", content: "fff:0000" },
						服务端IP: { label: "服务端IP", content: "192.1.1.1" },
						服务端操作系统主机名: { label: "服务端操作系统主机名", content: "windows" },
						服务端端口号: { label: "服务端端口号", content: "1344" },
						数据库IP: { label: "数据库IP", content: "192.2.3.4" },
						数据库实例: { label: "数据库实例", content: "MySQL" },
						列: { label: "列", content: "name" },
						SQL内容: {
							label: "SQL内容.",
							content: "INSERT INTO user (name) VALUES ('John');"
						},
						"执行时间(毫秒)": { label: "执行时间(毫秒)", content: "100" },
						影响行数: { label: "影响行数", content: "1" },
						匹配的策略: { label: "匹配的策略", content: "1" },
						访问客户端IP: { label: "访问客户端IP", content: "192.1.1.1" },
						"接口(URL)": { label: "接口(URL)", content: "1324" },
						服务端MAC: { label: "服务端MAC", content: "fff:1111" },
						服务端操作系统用户名: { label: "服务端操作系统用户名", content: "小明" },
						数据库用户名: { label: "数据库用户名", content: "小红" },
						数据库MAC: { label: "数据库MAC", content: "fff: 6666" },
						表: { label: "表", content: "user" },
						操作类型: { label: "操作类型", content: "insert" },
						SQL结果内容: {
							label: "SQL结果内容",
							content: "INSERT INTO user (name) VALUES (John');"
						},
						响应状态: { label: "响应状态", content: "正常" },
						查询返回行: { label: "查询返回行", content: "2023-2-2" },
						风险等级: { label: "风险等级", content: "低" }
					},
					layout(contentRect) {
						return [
							["访问时间", "访问客户端IP"],
							["客户端MAC", "接口(URL)"],
							["服务端IP", "服务端MAC"],
							["服务端操作系统主机名", "服务端操作系统用户名"],
							["服务端端口号", "数据库用户名"],
							["数据库IP", "数据库MAC"],
							["数据库实例", "表"],
							["列", "操作类型"],
							["SQL内容", "SQL结果内容"],
							["执行时间(毫秒)", "响应状态"],
							["影响行数", "查询返回行"],
							["匹配的策略", "风险等级"]
						];
					}
				};
			}
		},
		methods: {
			goBack() {
				this.$router.push({ path: "/system_manager/system_audit/log_retrieval" });
			}
		}
	});
}
</script>
