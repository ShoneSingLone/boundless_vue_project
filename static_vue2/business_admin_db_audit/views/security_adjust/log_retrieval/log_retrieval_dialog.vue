<template>
	<xDialog style="width: 60vw">
		<xForm col="2" ref="form">
			<xItem v-for="(value, key) of form" :label="value.label" :key="key">
				{{ value.value }}
			</xItem>
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

<script>
export default async function ({ row, warringStatus, parent }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return {
		name: "alarm_management_dialog",
		props: useDialogProps(),
		data() {
			return {
				form: {},
				list: [
					{ prop: "accessTime", label: "访问时间" },
					{ prop: "clientId", label: "客户端IP" },
					{ prop: "clientMac", label: "客户端MAC" },
					{ prop: "interfaceUrl", label: "URL" },
					{ prop: "serverId", label: "服务端IP" },
					{ prop: "serverMac", label: "服务端MAC" },
					{ prop: "serverHostName", label: "服务端主机名" },
					{ prop: "serverUserName", label: "服务端操作系统用户名" },
					{ prop: "serverPort", label: "服务端端口号" },
					{ prop: "databaseUserName", label: "数据库用户名" },
					{ prop: "databaseIp", label: "数据库IP" },
					{ prop: "databasePort", label: "数据库端口" },
					{ prop: "databaseMac", label: "数据库MAC" },
					{ prop: "databaseInstance", label: "数据库实例" },
					{ prop: "tableName", label: "表名" },
					{ prop: "column", label: "列名" },
					{ prop: "operationType", label: "操作类型" },
					{ prop: "sqlContent", label: "SQL内容" },
					{ prop: "sqlResult", label: "SQL结果内容" },
					{ prop: "executionTime", label: "执行时间" },
					{ prop: "responseStatus", label: "响应状态" },
					{ prop: "affectRows", label: "影响行数" },
					{ prop: "queryReturnRows", label: "查询返回行" },
					{ prop: "matchStrategy", label: "匹配策略" },
					{ prop: "matchNumber", label: "匹配策略数" },
					{ prop: "rule", label: "敏感字段规则" },
					{ prop: "category", label: "敏感字段类型" },
					{ prop: "level", label: "敏感字段级别" },
					{ prop: "riskLevel", label: "风险等级" },
					{ prop: "viewName", label: "视图名称" },
					{ prop: "triggerName", label: "触发器名称" },
					{ prop: "indexName", label: "索引名称" },
					{ prop: "sequenceName", label: "序列名称" },
					{ prop: "storedProcedureName", label: "存储过程名称" },
					{ prop: "fileName", label: "文件名称" }
				]
			};
		},
		computed: {
			btnOk() {
				const vm = this;
				return {
					label: i18n("确定"),
					preset: "blue",
					async onClick() {
						vm.closeModal();
					}
				};
			}
		},
		mounted() {
			const mapDict = this.list.reduce((map, item) => {
				map[item.prop] = item.label;
				return map;
			}, {});
			if (row && Object.keys(row)) {
				this.form = defItems(
					Object.keys(row).reduce((config, key) => {
						config[`${key}`] = { label: mapDict[`${key}`], value: row[key] };
						return config;
					}, {})
				);
			}
		}
	};
}
</script>

<style scoped lang="less">
.mess {
	font-weight: 400;
	font-size: 14px;
	color: #333333;
}
</style>
