<script lang="ts">
export default async function () {
	const VueRouter = await _.$importVue("/common/libs/VueRouter.vue");
	const LayoutComponent = await _.$importVue("@/views/Layout/Layout.vue");
	const LayoutComponentUser = await _.$importVue("@/views/Layout/LayoutUser.vue");

	const ComponentRouterView = {
		render(h) {
			return h("router-view");
		}
	};

	const ROUTE_NOT_FOUD = {
		path: "/:pathMatch(.*)*",
		component: () => _.$importVue("@/views/error/404.vue"),
		hidden: true
	};

	const routes = [
		_.$newRoute("/login", "@/views/Login/Login.vue"),
		// _.$newRoute("/login", "@/views/monitoring/monitoring.vue"),

		_.$newRoute("/", LayoutComponent, {
			redirect: "/home",
			children: [
				_.$newRoute("/home", "@/views/Home/Home.vue"),
				_.$newRoute("/system_manage/menu", "@/views/Menu/ViewMenu.vue"),
				_.$newRoute("/system_setting", ComponentRouterView, {
					children: [
						_.$newRoute("/system_setting/probe_management", ComponentRouterView, {
							children: [
								_.$newRoute(
									"/system_setting/probe_management/probe_setting",
									"@/views/system_setting/probe_management/probe_setting/probe_setting.vue"
								),
								_.$newRoute(
									"/system_setting/probe_management/probe_setting/edit",
									"@/views/system_setting/probe_management/probe_setting/probe_setting_edit.vue"
								),
								_.$newRoute(
									"/system_setting/probe_management/probe_management",
									"@/views/Home.vue"
								),
								_.$newRoute("/system_setting/probe_monitoring", "@/views/Home.vue")
							]
						}),
						_.$newRoute("/system_setting/probe_monitoring", "@/views/Home.vue")
					]
				}),
				_.$newRoute("/system_manager", ComponentRouterView, {
					children: [
						_.$newRoute("/system_manager/system_audit", ComponentRouterView, {
							children: [
								_.$newRoute(
									"/system_manager/system_audit/log_retrieval",
									"@/views/system_manager/system_audit/log_retrieval/log_retrieval.vue"
								),
								_.$newRoute(
									"/system_manager/system_audit/log_retrieval/view",
									"@/views/system_manager/system_audit/log_retrieval/log_retrieval_view.vue"
								),
								_.$newRoute(
									"/system_manager/system_audit/user_behavior_trajectory_analysis",
									"@/views/Home.vue"
								),
								_.$newRoute(
									"/system_manager/system_audit/offline_traffic_analysis",
									"@/views/Home.vue"
								)
							]
						}),
						_.$newRoute("/system_setting/system_self_monitoring", "@/views/Home.vue")
					]
				}),
				_.$newRoute("/db_manager", ComponentRouterView, {
					children: [
						_.$newRoute("/system_setting/probe_management", "@/views/Home.vue"),
						_.$newRoute("/system_setting/probe_monitoring", "@/views/Home.vue")
					]
				}),
				_.$newRoute("/security_adjust", ComponentRouterView, {
					children: [
						_.$newRoute(
							"/security_adjust/database_management",
							"@/views/security_adjust/database_management/database_management.vue"
						),
						_.$newRoute(
							"/security_adjust/probe_management",
							"@/views/security_adjust/probe_management/probe_management.vue"
						),
						_.$newRoute(
							"/security_adjust/rule_configuration",
							"@/views/security_adjust/rule_configuration/rule_configuration.vue"
						),
						_.$newRoute(
							"/security_adjust/rule_configuration_view",
							"@/views/security_adjust/rule_configuration/rule_configuration_view.vue"
						),
						_.$newRoute(
							"/security_adjust/security_settings",
							"@/views/security_adjust/security_settings/security_settings.vue"
						),
						_.$newRoute(
							"/security_adjust/policy_management",
							"@/views/security_adjust/policy_management/policy_management.vue"
						),
						_.$newRoute(
							"/security_adjust/policy_management/view",
							"@/views/security_adjust/policy_management/policy_management_view.vue"
						),
						_.$newRoute(
							"/security_adjust/policy_management/white_list",
							"@/views/security_adjust/policy_management/policy_management_white_list.vue"
						),

						_.$newRoute(
							"/security_adjust/log_retrieval",
							"@/views/security_adjust/log_retrieval/log_retrieval.vue"
						),
						_.$newRoute(
							"/security_adjust/user_behavior_trajectory",
							"@/views/security_adjust/user_behavior_trajectory/user_behavior_trajectory.vue"
						),
						_.$newRoute(
							"/security_adjust/backup_management",
							"@/views/security_adjust/backup_management/backup_management.vue"
						),
						_.$newRoute(
							"/security_adjust/alarm_management",
							"@/views/security_adjust/alarm_management/alarm_management.vue"
						),
						_.$newRoute(
							"/security_adjust/offline_traffic_analysis",
							"@/views/security_adjust/offline_traffic_analysis/offline_traffic_analysis.vue"
						),
						_.$newRoute(
							"/security_adjust/sensitive_field_management",
							"@/views/security_adjust/sensitive_field_management/sensitive_field_management.vue"
						)
					]
				}),
				/* 用户管理 */
				_.$newRoute("/system_manage/user", "@/views/user/user.vue"),
				_.$newRoute("/system_manage/user/add", "@/views/user/user_edit.vue"),
				_.$newRoute("/system_manage/user/edit", "@/views/user/user_edit.vue"),
				/* 角色管理 */
				_.$newRoute("/asd/role", "@/views/role/role.vue"),
				_.$newRoute("/asd/role/add", "@/views/role/role_edit.vue"),
				_.$newRoute("/asd/role/edit", "@/views/role/role_edit.vue"),
				/* 部门管理 */
				_.$newRoute("/system_manage/dept", "@/views/dept/dept.vue"),
				_.$newRoute("/system_manage/dept/add", "@/views/dept/dept_edit.vue"),
				_.$newRoute("/system_manage/dept/edit", "@/views/dept/dept_edit.vue"),
				/* 系统自监控 */
				_.$newRoute("/monitoring", "@/views/monitoring/monitoring.vue")
			]
		}),
		//   个人管理
		_.$newRoute("/my", LayoutComponentUser, {
			redirect: "/my/profile",
			children: [
				_.$newRoute("/my/profile", "@/views/my/my.vue"),
				_.$newRoute("/my/edit", "@/views/my/my_edit.vue")
			]
		}),
		ROUTE_NOT_FOUD
	];

	const router = new VueRouter({ routes });

	_.$AppRouter = router;

	return {
		router,
		routes
	};
}
</script>
