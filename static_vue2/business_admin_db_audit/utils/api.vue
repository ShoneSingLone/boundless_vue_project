<script lang="ts">
export default async function () {
	if (!window._api.admin_db_audit) {
		(function () {
			_.$ajax.requestInjector = function (config) {
				config.url = `${config.url}`;
				if (_.$lStorage["token"]) {
					config.headers["Authorization"] = _.$lStorage["token"];
				}
				if (config?.data) {
					if (typeof config.data === "string") {
						if (config.data.includes("{")) {
							const data = JSON.parse(config?.data ?? "{}");
							Object.keys(data).forEach(key => {
								if (data[key] === "") {
									data[key] = null;
								}
							});
							config.data = JSON.stringify(data);
						}
					}
				}
				console.log("config", config);
				return config;
			};

			_.$ajax.responseInjector = function (response) {
				if (response.status === 401) {
					_.$lStorage["x_token"] = "";
					_.$AppRouter.push("/login");
				}
				console.log("response", response);
				return response;
			};

			window._api.admin_db_audit = {
				/**
				 *  获取验证码
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36248&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36248&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsVerifyCode(params = {}) {
					const blob = await _.$ajax.downloadOctetStream({
						url: "/xds/verifyCode",
						handleResult: () => null
					});
					return URL.createObjectURL(blob);
				},
				/**
				 *  当前用户登录信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36083&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36083&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsLoginInfo(data) {
					return _.$ajax.get("/xds/login/info", {
						data
					});
				},
				/**
				 *  用户登录
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36078&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36078&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsLogin(data) {
					return _.$ajax.post("/xds/login", {
						data
					});
				},
				/**
				 *  探针分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=3&wiki=&interfaceType=interface&interfaceId=36008&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36008&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAgentPage(data = {}) {
					return _.$ajax.post(`/xds/agent/page`, { data });
				},
				/**
				 *  新增探针
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&amp%3BgroupId=11&amp%3BprojectTabName=%E6%8E%A5%E5%8F%A3&projectTabName=%E6%8E%A5%E5%8F%A3&groupId=11&interfaceId=35988&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=35988&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAgentAdd(data = {}) {
					return _.$ajax.post(`/xds/agent/add`, { data });
				},
				/**
				 *  修改探针
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=35998&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=35998&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAgentEdit(data = {}) {
					return _.$ajax.post(`/xds/agent/edit`, { data });
				},
				/**
				 *  删除探针
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=35993&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=35993&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAgentDeleteId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.get(`/xds/agent/delete/${id}`, { data });
				},
				/**
				 *  新增策略
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36183&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36183&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsStrategyAdd(data = {}) {
					return _.$ajax.post(`/xds/strategy/add`, { data });
				},
				async xdsStrategyAuthStrategy(data = {}) {
					return _.$ajax.get(`/xds/strategy/authStrategy`, { data });
				},
				/**
				 *  删除策略
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36188&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36188&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsStrategyDeleteId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.get(`/xds/strategy/delete/${id}`, { data });
				},
				/**
				 *  修改策略
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36193&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36193&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsStrategyEdit(data = {}) {
					return _.$ajax.post(`/xds/strategy/edit`, { data });
				},
				/**
				 *  策略列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36198&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36198&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsStrategyPage(data = {}) {
					return _.$ajax.post(`/xds/strategy/page`, { data });
				},
				/**
				 *  策略包含规则列表查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36203&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36203&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsStrategyPageId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.get(`/xds/strategy/page/${id}`);
				},
				/**
				 *  白名单分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36288&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36288&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWhitelistPage(data = {}) {
					return _.$ajax.get(`/xds/whitelist/page`, { data });
				},
				/**
				 *  删除白名单规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36293&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36293&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWhitelistId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.delete(`/xds/whitelist/${id}`, { data });
				},
				/**
				 *  修改白名单规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36283&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36283&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWhitelistEdit(data = {}) {
					return _.$ajax.post(`/xds/whitelist/edit`, { data });
				},
				/**
				 *  新增白名单规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36278&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36278&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWhitelistAdd(data = {}) {
					return _.$ajax.post(`/xds/whitelist/add`, { data });
				},
				/**
				 *  规则列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36163&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36163&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRulePage(data = {}) {
					return _.$ajax.post(`/xds/rule/page`, { data });
				},
				/**
				 *  修改规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36158&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36158&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRuleEdit(data = {}) {
					return _.$ajax.post(`/xds/rule/edit`, { data });
				},
				/**
				 *  删除规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36153&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36153&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRuleDeleteId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.get(`/xds/rule/delete/${id}`, { data });
				},
				/**
				 *  新增规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36148&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36148&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRuleAdd(data = {}) {
					return _.$ajax.post(`/xds/rule/add`, { data });
				},
				/**
				 *  查询全部审计日志
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36013&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36013&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAuditLog(data = {}) {
					return _.$ajax.get(`/xds/auditLog`, { data });
				},
				/**
				 *  查询结果导出
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36023&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36023&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAuditLogExcel(data = {}) {
					const blob = await _.$ajax.downloadOctetStream({
						url: "/xds/auditLog/excel",
						handleResult: () => {}
					});
					return URL.createObjectURL(blob);
				},
				/**
				 *  首页的热库、热表、热IP、热操作命令
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36028&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36028&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAuditLogFrontpage(data = {}) {
					return _.$ajax.get(`/xds/auditLog/frontpage`, { data });
				},
				/**
				 *  热表信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36033&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36033&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAuditLogHottable(data = {}) {
					return _.$ajax.get(`/xds/auditLog/hottable`, { data });
				},
				/**
				 *  模糊分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36038&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36038&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAuditLogPage(data = {}) {
					const { pageNum = 1, pageSize = 10 } = data;
					return _.$ajax.post(
						`/xds/auditLog/page?pageNum=${pageNum}&pageSize=${pageSize}`,
						{ data }
					);
				},
				/**
				 *  查询用户行为轨迹
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36043&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36043&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAuditLogUserBehavior(data = {}) {
					return _.$ajax.get(`/xds/auditLog/userBehavior`, { data });
				},
				/**
				 *  根据ip查询单条日志
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36048&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36048&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsAuditLogId(data = {}) {
					return _.$ajax.get(`/xds/auditLog/{id}`, { data });
				},
				/**
				 *  警告列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36263&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36263&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningPage(data = {}) {
					return _.$ajax.get(`/xds/warning/page`, { data });
				},
				/**
				 *  获取数据库类型列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36305&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36305&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsOptionsDatabaseType(data = {}) {
					return _.$ajax.get(`/xds/options/databaseType`, { data });
				},
				/**
				 *  获取性别选项列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36310&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36310&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsOptionsGender(data = {}) {
					return _.$ajax.get(`/xds/options/gender`, { data });
				},
				/**
				 *  获取规则配置谓词表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36315&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36315&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsOptionsPredicate(data = {}) {
					return _.$ajax.get(`/xds/options/predicate`, { data });
				},
				/**
				 *  获取规则表、策略表、白名单状态列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36320&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36320&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsOptionsRuleStatus(data = {}) {
					return _.$ajax.get(`/xds/options/ruleStatus`, { data });
				},
				/**
				 *  获取用户表状态、权限表状态列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36325&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36325&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsOptionsUserStatus(data = {}) {
					return _.$ajax.get(`/xds/options/userStatus`, { data });
				},
				/**
				 *  获取告警表状态列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36330&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36330&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsOptionsWarningStatus(data = {}) {
					return _.$ajax.get(`/xds/options/warningStatus`, { data });
				},
				/**
				 *  删除角色
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36138&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36138&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRoleId(id) {
					return _.$ajax.delete(`/xds/role/${id}`);
				},
				/**
				 *  部门列表查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36063&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36063&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsDepartmentPage(data = {}) {
					return _.$ajax.get(`/xds/department/page`, { data });
				},
				/**
				 *  删除部门
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36073&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36073&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsDepartmentIdDel(data = {}) {
					const { id = "" } = data;
					return _.$ajax.delete(`/xds/department/${id}`, { data });
				},
				/**
				 *  修改部门
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36068&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36068&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsDepartmentIdUpdate(data = {}) {
					const { id = "" } = data;
					return _.$ajax.post(`/xds/department/${id}`, { data });
				},
				/**
				 *  新增部门
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36058&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36058&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsDepartment(data = {}) {
					return _.$ajax.post(`/xds/department`, { data });
				},
				/**
				 *  CPU信息获取
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36168&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36168&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsSelfMonitorCpu(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/cpu`, { data });
				},
				/**
				 *  磁盘信息获取
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36173&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36173&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsSelfMonitorDisk(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/disk`, { data });
				},
				/**
				 *  磁盘使用率
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36441&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36441&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsSelfMonitorDiskUsage(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/diskUsage`, { data });
				},
				/**
				 *  内存信息获取
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36178&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36178&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsSelfMonitorMemory(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/memory`, { data });
				},
				/**
				 *  系统角色列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36133&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36133&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRolePage(data = {}) {
					return _.$ajax.get(`/xds/role/page`, { data });
				},
				/**
				 *  新增角色
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36113&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36113&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRoleAdd(data = {}) {
					return _.$ajax.post(`/xds/role/add`, { data });
				},
				/**
				 *  修改角色
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36128&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36128&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRoleEdit(data = {}) {
					return _.$ajax.post(`/xds/role/edit`, { data });
				},
				/**
				 *  查找角色关联菜单权限列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36143&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36143&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRoleRoleIdMenus(data = {}) {
					const { id: roleId } = data;
					return _.$ajax.get(`/xds/role/${roleId}/menus`, { data });
				},
				/**
				 *  查找角色关联菜单权限列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36123&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36123&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRoleAuth(data = []) {
					return _.$ajax.post(`/xds/role/auth`, { data });
				},
				/**
				 *  用户列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36238&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36238&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsUserPage(data = {}) {
					return _.$ajax.post(`/xds/user/page`, { data });
				},
				/**
				 *  新增用户
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36223&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36223&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsUserAdd(data = {}) {
					return _.$ajax.post(`/xds/user/add`, { data });
				},
				/**
				 *  修改密码
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36228&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36228&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsUserChangePwd(data = {}) {
					return _.$ajax.get(`/xds/user/changePwd`, { data });
				},
				/**
				 *  修改用户信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36233&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36233&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsUserEdit(data = {}) {
					return _.$ajax.post(`/xds/user/edit`, { data });
				},
				/**
				 *  删除用户
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36243&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36243&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsUserId(data = {}) {
					return _.$ajax.delete(`/xds/user/{id}`, { data });
				},
				/**
				 *  系统角色列表查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36118&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36118&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsRoleAll(data = {}) {
					return _.$ajax.get(`/xds/role/all`, { data });
				},
				/**
				 *  系统菜单列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36093&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36093&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsMenuPage(data = {}) {
					return _.$ajax.get(`/xds/menu/page`, { data });
				},
				/**
				 *  新增菜单
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36088&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36088&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsMenuAdd(data = {}) {
					return _.$ajax.post(`/xds/menu/add`, { data });
				},
				/**
				 *  系统菜单列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36098&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36098&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsMenuPidPid(data = {}) {
					const { pid = "" } = data;
					return _.$ajax.get(`/xds/menu/pid/${pid}`, { data });
				},
				/**
				 *  修改菜单
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36103&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36103&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsMenuId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.post(`/xds/menu/${id}`, { data });
				},
				/**
				 *  删除菜单
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36108&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36108&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsMenuDelId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.delete(`/xds/menu/${id}`, { data });
				},
				/**
				 *  首页：近七天告警分布
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36268&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36268&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningWarningDistributed(data = {}) {
					return _.$ajax.get(`/xds/warning/distributionMap`, { data });
				},
				/**
				 *  处理警告
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36258&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36258&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningEdit(data = {}) {
					return _.$ajax.post(`/xds/warning/edit`, { data });
				},
				/**
				 *  删除警告
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36273&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36273&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.delete(`/xds/warning/${id}`, { data });
				},
				login(data) {
					return _.$ajax.post("/login", {
						data
					});
				},
				/**
				 *  用户登出
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36365&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36365&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsLogout(data = {}) {
					return _.$ajax.post(`/xds/logout`, { data });
				},
				/**
				 *  获取风险等级状态表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36375&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36375&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsOptionsRisk(data = {}) {
					return _.$ajax.get(`/xds/options/risk`, { data });
				},
				/**
				 *  修改用户信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36233&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36233&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsUserEdit(data = {}) {
					return _.$ajax.post(`/xds/user/edit`, { data });
				},
				/**
				 *  修改密码
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36228&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36228&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsUserChangePwd(data = {}) {
					return _.$ajax.get(`/xds/user/changePwd`, { data });
				},
				getUserInfo() {
					return _.$ajax.get("/getInfo");
				},
				getRouters() {
					return _.$ajax.get("/getRouters");
				},
				captchaImage(data) {
					return _.$ajax.get("/captchaImage", {
						data
					});
				},
				listUser(data) {
					return _.$ajax.get("/system/user/list", {
						data
					});
				},
				/**
				 *  数据库资源查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36411&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36411&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsDatabaseAssetsPage(data = {}) {
					return _.$ajax.get(`/xds/databaseAssets/page`, { data });
				},
				/**
				 *  根据数据库新增探针
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36412&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36412&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsDatabaseAssetsAdd(data = {}) {
					return _.$ajax.post(`/xds/databaseAssets/add`, { data });
				},
				/**
				 *  报警配置查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36402&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36402&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningWarningConfigPage(data = {}) {
					return _.$ajax.post(`/xds/warning/warningConfig/page`, { data });
				},
				/**
				 *  报警方式配置
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36403&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36403&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningWarningConfig(data = {}) {
					return _.$ajax.post(`/xds/warning/warningConfig`, { data });
				},
				/**
				 *  报警详细信息查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36408&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36408&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningDetail(data = {}) {
					return _.$ajax.get(`/xds/warning/detail`, { data });
				},
				/**
				 *  警告SFTP查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36405&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36405&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningSftpFind(data = {}) {
					return _.$ajax.post(`/xds/warning/sftp/find`, { data });
				},
				/**
				 *  设置警告SFTP
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36404&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36404&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningSftpSet(data = {}) {
					return _.$ajax.post(`/xds/warning/sftp/set`, { data });
				},
				/**
				 *  连接测试
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36416&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36416&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningLinkTest(data = {}) {
					return _.$ajax.post(`/xds/warning/linkTest`, { data });
				},
				/**
				 *  立即备份
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36418&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36418&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupBackupNow(data = {}) {
					return _.$ajax.get(`/xds/backup/backupNow`, { data });
				},
				/**
				 *  备份文件上传
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36417&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36417&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupFileUpLoad(data = {}) {
					return _.$ajax.post(`/xds/backup/fileUpLoad`, { data });
				},
				/**
				 *  连接测试
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36416&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36416&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupLinkTest(data = {}) {
					return _.$ajax.post(`/xds/backup/linkTest`, { data });
				},
				/**
				 *  备份SFTP查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36415&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36415&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupSftpFind(data = {}) {
					return _.$ajax.get(`/xds/backup/sftp/find`, { data });
				},
				/**
				 *  设置备份SFTP
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36414&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36414&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupSftpSet(data = {}) {
					return _.$ajax.post(`/xds/backup/sftp/set`, { data });
				},
				/**
				 *  备份时间周期修改
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36413&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36413&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupTimeEdit(data = {}) {
					return _.$ajax.get(`/xds/backup/timeEdit`, { data });
				},
				/**
				 *  立即还原
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36360&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36360&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupRecover(data = {}) {
					return _.$ajax.get(`/xds/backup/recover`, { data });
				},
				/**
				 *  修改备份设置
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36053&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36053&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupEdit(data = {}) {
					return _.$ajax.post(`/xds/backup/edit`, { data });
				},
				/**
				 *  磁盘IO速率
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36410&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36410&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsSelfMonitorDiskIo(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/diskIO`, { data });
				},
				/**
				 *  网络吞吐率
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36409&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36409&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsSelfMonitorNetwork(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/network`, { data });
				},
				/**
				 *  进程列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36440&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36440&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsSelfMonitorProcess(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/process`, { data });
				},
				/**
				 *  首页：告警比例图
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36406&interfaceType=interface&project_interface_tab=1&project_setting_tab=7&wiki=/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36406&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsWarningPieChart(data = {}) {
					return _.$ajax.get(`/xds/warning/pieChart`, { data });
				},
				/**
				 *  当前配置查询
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&interfaceId=236&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=236&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				xdsTrafficFindConfig(data = {}) {
					return _.$ajax.get(`/xds/traffic/findConfig`, {
						data
					});
				},
				/**
				 *  普通端口列表，用于添加绑定端口和指定普通端口名下拉列表选择
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&interfaceId=235&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=235&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				xdsTrafficLivePortList(data = {}) {
					return _.$ajax.get(`/xds/traffic/livePortList`, {
						data
					});
				},
				/**
				 *  DPDK端口列表，用于DPDK端口下拉列表选择
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=239&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=239&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				xdsTrafficDpdkList(data = {}) {
					return _.$ajax.get(`/xds/traffic/dpdkList`, {
						data
					});
				},
				/**
				 *  文件列表获取
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=238&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=238&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				xdsTrafficFileList(data = {}) {
					return _.$ajax.get(`/xds/traffic/fileList`, {
						data
					});
				},
				/**
				 *  添加端口
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=240&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=240&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				xdsTrafficAddPort(data = {}) {
					return _.$ajax.post(`/xds/traffic/addPort`, {
						data
					});
				},
				/**
				 *  离线文件上传
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=237&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=237&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				xdsTrafficFileupload(formData) {
					return _.$ajax.upload({
						method: "post",
						url: "/xds/traffic/fileupload",
						formData,
						callback(eventName, event) {
							if (eventName === "onprogress") {
								console.log("onprogress", event);
							}
						}
					});
				},
				/**
				 *  保存配置
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=234&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=234&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				xdsTrafficSaveConfig(data = {}) {
					return _.$ajax.post(`/xds/traffic/saveConfig`, {
						data
					});
				},
				/**
				 *  cron时间周期修改(8.18更新版本)
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&wiki=&interfaceId=36443&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36443&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupCronEdit(data = {}) {
					return _.$ajax.post(`/xds/backup/cronEdit`, { data });
				},
				/**
				 *  cron时间设置查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&wiki=&interfaceId=36444&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36444&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				async xdsBackupConfigFind(data = {}) {
					return _.$ajax.get(`/xds/backup/configFind`, { data });
				}
			};
		})();
	}

	return window._api.admin_db_audit;
}
</script>
