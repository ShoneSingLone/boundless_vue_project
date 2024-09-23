<script lang="ts">
export default async function () {
	const FOLDER = "folder";
	const ARTICLE = "article";
	const GET = "GET";
	const HEAD = "HEAD";
	const OPTIONS = "OPTIONS";
	const POST = "POST";
	const PUT = "PUT";
	const DELETE = "DELETE";
	const PATCH = "PATCH";
	const QUERY = "query";
	const BODY = "body";

	const HTTP_METHOD = {
		[GET]: { type: "", color: "green", default_tab: QUERY },
		[HEAD]: { type: "warning", color: "purple", default_tab: QUERY },
		[OPTIONS]: { type: "info", color: "default", default_tab: QUERY },
		[POST]: {
			type: "success",
			color: "pink",
			request_body: true,
			default_tab: BODY
		},
		[PUT]: { type: "", color: "orange", request_body: true, default_tab: BODY },
		[DELETE]: {
			type: "danger",
			color: "red",
			request_body: true,
			default_tab: BODY
		},
		[PATCH]: { type: "", color: "blue", request_body: true, default_tab: BODY }
	};

	if (!window._opts?.admin_db_audit) {
		/*枚举选项*/
		window._opts.admin_db_audit = {
			status: [{ label: "运行中", value: "running" }],
			yesOrNo: [
				{ label: "是", value: true },
				{ label: "否", value: false }
			],
			sex: [
				{ label: "男", value: "1" },
				{ label: "女", value: "2" }
			],
			accountStatus: [
				{ label: "正常", value: "0" },
				{ label: "停用", value: "1" }
			],
			strategyStatus: [
				//策略
				{ label: "等待", value: "0" },
				{ label: "正常", value: "1" },
				{ label: "非正常", value: "2" }
			],
			warningStatus: [
				{ label: "未审核", value: "0" },
				{ label: "已审核", value: "1" }
			],
			probeStatus: [
				{ label: "等待回复", value: 0 },
				{ label: "正常运行 ", value: 1 },
				{ label: "异常状态", value: 2 }
			],
			warringLevel: [
				{ label: "低风险", value: 1 },
				{ label: "中风险", value: 2 },
				{ label: "高风险", value: 3 }
			],
			warringMethods: [
				{ label: "SFTP", value: "isSftp" },
				{ label: "SYSLOG", value: "isSyslog" },
				{ label: "EMAIL", value: "isEmail" }
				// { label: "SNMP", value: "SNMP" }
			],
			menuType: [
				{ label: "目录", value: "M" },
				{ label: "菜单", value: "C" },
				{ label: "按钮", value: "F" }
			]
		};
	}
	return window._opts.admin_db_audit;
}
</script>
