<script lang="ts">
export default async function () {
	const user = {
		icon: "_icon_menu_user",
		menuCode: "accounts",
		href: "/user",
		label: i18n("用户管理"),
		children: [
			{
				label: i18n("添加"),
				DO_NOT_SHOW_IN_MENU: true,
				href: "/user/add"
			},
			{
				label: i18n("编辑"),
				DO_NOT_SHOW_IN_MENU: true,
				href: "/user/edit"
			}
		]
	};
	const security = {
		icon: "_aqgl",
		iconDefault: "_aqgl",
		iconActive: "_agql-active",
		href: "/asd",
		menuCode: "security",
		DO_NOT_TO: true,
		label: i18n("安全管理"),
		children: [
			{
				href: "/asd/role",
				menuCode: "security:role",
				label: i18n("角色管理")
			}
		]
	};
	const role = {
		icon: "_icon_menu_role",
		href: "/role",
		menuCode: "role",
		label: i18n("角色管理"),
		children: [
			{
				label: i18n("添加"),
				DO_NOT_SHOW_IN_MENU: true,
				href: "/role/add"
			},
			{
				label: i18n("编辑"),
				DO_NOT_SHOW_IN_MENU: true,
				href: "/role/edit"
			}
		]
	};
	const dept = {
		icon: "_icon_menu_dept",
		menuCode: "department",
		href: "/dept",
		label: i18n("部门管理"),
		children: [
			{
				label: i18n("添加"),
				DO_NOT_SHOW_IN_MENU: true,
				href: "/dept/add"
			},
			{
				label: i18n("编辑"),
				DO_NOT_SHOW_IN_MENU: true,
				href: "/dept/edit"
			}
		]
	};

	// const system_setting = {
	// 	icon: "_system_setting",
	// 	href: "/system_setting",
	// 	DO_NOT_TO: true,
	// 	label: i18n("系统设置"),
	// 	children: []
	// };
	const system_monitoring = {
		icon: "_xtzjk",
		iconDefault: "_xtzjk",
		iconActive: "_xtzjk-active",
		href: "/monitoring",
		menuCode: "selfMonitor",
		DO_NOT_TO: false,
		label: i18n("系统自监控"),
		children: []
	};

	const security_adjust = {
		icon: "_sjgl",
		iconDefault: "_sjgl",
		iconActive: "_sjgl-active",
		href: "/security_adjust",
		menuCode: "audit",
		DO_NOT_TO: true,
		label: i18n("审计管理"),
		children: [
			{
				label: i18n("数据库管理"),
				href: "/security_adjust/database_management",
				menuCode: "agent"
			},
			{
				label: i18n("探针管理"),
				href: "/security_adjust/probe_management",
				menuCode: "agent"
			},
			{
				label: i18n("策略管理"),
				href: "/security_adjust/policy_management",
				menuCode: "audit:strategy",
				children: [
					{
						label: i18n("查看"),
						DO_NOT_SHOW_IN_MENU: true,
						href: "/security_adjust/policy_management/view"
					},
					{
						label: i18n("白名单"),
						DO_NOT_SHOW_IN_MENU: true,
						href: "/security_adjust/policy_management/white_list"
					},
					{
						label: i18n("编辑"),
						DO_NOT_SHOW_IN_MENU: true,
						href: "/role/edit"
					}
				]
			},
			{
				label: i18n("日志检索"),
				href: "/security_adjust/log_retrieval",
				menuCode: "audit:auditLog"
			},
			{
				label: i18n("敏感字段管理"),
				href: "/security_adjust/sensitive_field_management",
				menuCode: "audit:auditLog"
			},
			{
				label: i18n("用户行为轨迹"),
				href: "/security_adjust/user_behavior_trajectory",
				menuCode: "audit:userBehavior"
			},
			{ label: i18n("备份管理"), href: "/security_adjust/backup_management" },
			{
				label: i18n("报警管理"),
				href: "/security_adjust/alarm_management",
				menuCode: "audit:warning"
			},
			{
				label: i18n("流量提取配置"),
				href: "/security_adjust/offline_traffic_analysis",
				menuCode: "audit:offlineTraffic"
			}
		]
	};

	const system_manager = {
		icon: "_xtgl",
		iconDefault: "_xtgl",
		iconActive: "_xtgl-active",
		label: i18n("系统管理"),
		href: "/system_manage",
		menuCode: "system_manage",
		DO_NOT_TO: true,
		children: [
			{
				label: i18n("菜单管理"),
				href: "/system_manage/menu",
				menuCode: "system_manage:menu"
			},
			{
				menuCode: "system_manage:accounts",
				href: "/system_manage/user",
				label: i18n("用户管理")
			},
			{
				menuCode: "system_manage:department",
				href: "/system_manage/dept",
				label: i18n("部门管理")
			}
		]
	};

	const home = {
		icon: "_home",
		iconDefault: "_home",
		iconActive: "_home-active",
		label: i18n("首页"),
		href: "/home",
		menuCode: "frontPage"
	};
	const menu = {
		icon: "_menu",
		label: i18n("菜单管理"),
		href: "/menu",
		menuCode: "menu"
	};

	return [
		home,
		security_adjust,
		security,
		system_monitoring,
		// user,
		// dept,
		// role,

		// menu,

		// system_setting,
		system_manager
	];
}
</script>
