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
				 */
				async xdsVerifyCode(params = {}) {
					const blob = await _.$ajax.downloadOctetStream({
						url: "/xds/verifyCode",
						resolveResult: blob => blob
					});
					return URL.createObjectURL(blob);
				},
				/**
				 *  当前用户登录信息
				 */
				async xdsLoginInfo(data) {
					return _.$ajax.get("/xds/login/info", {
						data
					});
				},
				/**
				 *  用户登录
				 */
				async xdsLogin(data) {
					return _.$ajax.post("/xds/login", {
						data
					});
				},
				/**
				 *  探针分页查询
				 */
				async xdsAgentPage(data = {}) {
					return _.$ajax.get(`/xds/agent/page`, { data });
				},
				/**
				 *  新增探针
				 */
				async xdsAgentAdd(data = {}) {
					return _.$ajax.post(`/xds/agent/add`, { data });
				},
				/**
				 *  修改探针
				 */
				async xdsAgentEdit(data = {}) {
					return _.$ajax.post(`/xds/agent/edit`, { data });
				},
				/**
				 *  删除探针
				 */
				async xdsAgentDeleteId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.get(`/xds/agent/delete/${id}`, { data });
				},
				/**
				 *  新增策略
				 */
				async xdsStrategyAdd(data = {}) {
					return _.$ajax.post(`/xds/strategyType/add`, { data });
				},
				async xdsStrategyAuthStrategy(data = {}) {
					return _.$ajax.get(`/xds/strategyType/authStrategy`, { data });
				},
				/**
				 *  删除策略
				 */
				async xdsStrategyDeleteId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.get(`/xds/strategyType/delete/${id}`, { data });
				},
				/**
				 *  修改策略
				 */
				async xdsStrategyEdit(data = {}) {
					return _.$ajax.post(`/xds/strategyType/edit`, { data });
				},
				/**
				 *  策略列表分页查询
				 */
				async xdsStrategyPage(data = {}) {
					return _.$ajax.get(`/xds/strategyType/page`, { data });
				},
				/**
				 *  策略包含规则列表查询
				 */
				async xdsStrategyPageId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.get(`/xds/strategyType/page/${id}`);
				},
				/**
				 *  白名单分页查询
				 */
				async xdsWhitelistPage(data = {}) {
					return _.$ajax.get(`/xds/whitelist/page`, { data });
				},
				/**
				 *  删除白名单规则
				 */
				async xdsWhitelistId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.delete(`/xds/whitelist/${id}`, { data });
				},
				/**
				 *  修改白名单规则
				 */
				async xdsWhitelistEdit(data = {}) {
					return _.$ajax.post(`/xds/whitelist/edit`, { data });
				},
				/**
				 *  新增白名单规则
				 */
				async xdsWhitelistAdd(data = {}) {
					return _.$ajax.post(`/xds/whitelist/add`, { data });
				},
				/**
				 *  规则列表分页查询
				 */
				async xdsRulePage(data = {}) {
					return _.$ajax.get(`/xds/strategy/page`, { data });
				},
				async xdsStrategyPageId(data = {}) {
					const { id } = data;
					return _.$ajax.get(`/xds/strategyType/page/${id}`, { data });
				},
				/**
				 *  修改规则
				 */
				async xdsRuleEdit(data = {}) {
					return _.$ajax.post(`/xds/strategy/edit`, { data });
				},
				/**
				 *  删除规则
				 */
				async xdsRuleDeleteId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.get(`/xds/strategy/delete/${id}`, { data });
				},
				async xdsCancelId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.get(`/xds/cancel/${id}`, { data });
				},
				/**
				 *  新增规则
				 */
				async xdsRuleAdd(data = {}) {
					return _.$ajax.post(`/xds/strategy/add`, { data });
				},
				/**
				 *  查询全部审计日志
				 */
				async xdsAuditLog(data = {}) {
					return _.$ajax.get(`/xds/auditLog`, { data });
				},
				async xdsAuditLogSend2end(data = {}) {
					return _.$ajax.post(`/xds/auditLog/send2end`, { data });
				},
				/**
				 *  查询结果导出
				 */
				async xdsAuditLogExcel(data = {}) {
					const blob = await _.$ajax.downloadOctetStream({
						url: "/xds/auditLog/excel",
						handleResult: () => {},
						fileType:
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					});
					return URL.createObjectURL(blob);
				},
				/**
				 *  首页的热库、热表、热IP、热操作命令
				 */
				async xdsAuditLogFrontpage(data = {}) {
					return _.$ajax.get(`/xds/auditLog/frontpage`, { data });
				},
				/**
				 *  热表信息
				 */
				async xdsAuditLogHottable(data = {}) {
					return _.$ajax.get(`/xds/auditLog/hottable`, { data });
				},
				/**
				 *  模糊分页查询
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
				 */
				async xdsAuditLogUserBehavior(data = {}) {
					return _.$ajax.get(`/xds/auditLog/userBehavior`, { data });
				},
				/**
				 *  根据ip查询单条日志
				 */
				async xdsAuditLogId(data = {}) {
					return _.$ajax.get(`/xds/auditLog/{id}`, { data });
				},
				/**
				 *  警告列表分页查询
				 */
				async xdsWarningPage(data = {}) {
					return _.$ajax.get(`/xds/warning/page`, { data });
				},
				/**
				 *  获取数据库类型列表
				 */
				async xdsOptionsDatabaseType(data = {}) {
					return _.$ajax.get(`/xds/options/databaseType`, { data });
				},
				async xdsOptionsJoint(data = {}) {
					return _.$ajax.get(`/xds/options/joint`, { data });
				},
				async xdsOptionsFeature(data = {}) {
					return _.$ajax.get(`/xds/options/feature`, { data });
				},
				/**
				 *  获取性别选项列表
				 */
				async xdsOptionsGender(data = {}) {
					return _.$ajax.get(`/xds/options/gender`, { data });
				},
				/**
				 *  获取规则配置谓词表
				 */
				async xdsOptionsPredicate(data = {}) {
					return _.$ajax.get(`/xds/options/predicate`, { data });
				},
				/**
				 *  获取规则表、策略表、白名单状态列表
				 */
				async xdsOptionsRuleStatus(data = {}) {
					return _.$ajax.get(`/xds/options/ruleStatus`, { data });
				},
				/**
				 *  获取用户表状态、权限表状态列表
				 */
				async xdsOptionsUserStatus(data = {}) {
					return _.$ajax.get(`/xds/options/userStatus`, { data });
				},
				/**
				 *  获取告警表状态列表
				 */
				async xdsOptionsWarningStatus(data = {}) {
					return _.$ajax.get(`/xds/options/warningStatus`, { data });
				},
				/**
				 *  删除角色
				 */
				async xdsRoleId(id) {
          debugger;
					return _.$ajax.delete(`/xds/role/${id}`);
				},
				/**
				 *  部门列表查询
				 */
				async xdsDepartmentPage(data = {}) {
					return _.$ajax.get(`/xds/department/page`, { data });
				},
				/**
				 *  删除部门
				 */
				async xdsDepartmentIdDel(data = {}) {
					const { id = "" } = data;
					return _.$ajax.delete(`/xds/department/${id}`, { data });
				},
				/**
				 *  修改部门
				 */
				async xdsDepartmentIdUpdate(data = {}) {
					const { id = "" } = data;
					return _.$ajax.post(`/xds/department/${id}`, { data });
				},
				/**
				 *  新增部门
				 */
				async xdsDepartment(data = {}) {
					return _.$ajax.post(`/xds/department`, { data });
				},
				/**
				 *  CPU信息获取
				 */
				async xdsSelfMonitorCpu(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/cpu`, { data });
				},
				/**
				 *  磁盘信息获取
				 */
				async xdsSelfMonitorDisk(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/disk`, { data });
				},
				/**
				 *  磁盘使用率
				 */
				async xdsSelfMonitorDiskUsage(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/diskUsage`, { data });
				},
				/**
				 *  内存信息获取
				 */
				async xdsSelfMonitorMemory(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/memory`, { data });
				},
				/**
				 *  系统角色列表分页查询
				 */
				async xdsRolePage(data = {}) {
					return _.$ajax.get(`/xds/role/page`, { data });
				},
				/**
				 *  新增角色
				 */
				async xdsRoleAdd(data = {}) {
					return _.$ajax.post(`/xds/role/add`, { data });
				},
				/**
				 *  修改角色
				 */
				async xdsRoleEdit(data = {}) {
					return _.$ajax.post(`/xds/role/edit`, { data });
				},
				/**
				 *  查找角色关联菜单权限列表
				 */
				async xdsRoleRoleIdMenus(data = {}) {
					const { id: roleId } = data;
					return _.$ajax.get(`/xds/role/${roleId}/menus`, { data });
				},
				/**
				 *  查找角色关联菜单权限列表
				 */
				async xdsRoleAuth(data = []) {
					return _.$ajax.post(`/xds/role/auth`, { data });
				},
				/**
				 *  用户列表分页查询
				 */
				async xdsUserPage(data = {}) {
					return _.$ajax.get(`/xds/user/page`, { data });
				},
				/**
				 *  新增用户
				 */
				async xdsUserAdd(data = {}) {
					return _.$ajax.post(`/xds/user/add`, { data });
				},
				/**
				 *  修改密码
				 */
				async xdsUserChangePwd(data = {}) {
					return _.$ajax.get(`/xds/user/changePwd`, { data });
				},
				/**
				 *  修改个人信息（昵称、电话、性别）
				 */
				async xdsUserEditPersonal(data = {}) {
					return _.$ajax.post(`/xds/user/editPersonal`, { data });
				},
				/**
				 *  修改用户信息
				 */
				async xdsUserEdit(data = {}) {
					return _.$ajax.post(`/xds/user/edit`, { data });
				},
				/**
				 *  删除用户
				 */
				async xdsUserId(id) {
          console.log('id',id)
					return _.$ajax.delete(`/xds/user/${id}`);
				},
				/**
				 *  系统角色列表查询
				 */
				async xdsRoleAll(data = {}) {
					return _.$ajax.get(`/xds/role/all`, { data });
				},
				/**
				 *  系统菜单列表分页查询
				 */
				async xdsMenuPage(data = {}) {
					return _.$ajax.get(`/xds/menu/page`, { data });
				},
				/**
				 *  新增菜单
				 */
				async xdsMenuAdd(data = {}) {
					return _.$ajax.post(`/xds/menu/add`, { data });
				},
				/**
				 *  系统菜单列表
				 */
				async xdsMenuPidPid(data = {}) {
					const { pid = "" } = data;
					return _.$ajax.get(`/xds/menu/pid/${pid}`, { data });
				},
				/**
				 *  修改菜单
				 */
				async xdsMenuId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.post(`/xds/menu/${id}`, { data });
				},
				/**
				 *  删除菜单
				 */
				async xdsMenuDelId(data = {}) {
					const { id = "" } = data;
					return _.$ajax.delete(`/xds/menu/${id}`, { data });
				},
				/**
				 *  首页：近七天告警分布
				 */
				async xdsWarningWarningDistributed(data = {}) {
					return _.$ajax.get(`/xds/warning/distributionMap`, { data });
				},
				/**
				 *  处理警告
				 */
				async xdsWarningEdit(data = {}) {
					return _.$ajax.post(`/xds/warning/edit`, { data });
				},
				/**
				 *  删除警告
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
				 */
				async xdsLogout(data = {}) {
					return _.$ajax.post(`/xds/logout`, { data });
				},
				/**
				 *  获取风险等级状态表
				 */
				async xdsOptionsRisk(data = {}) {
					return _.$ajax.get(`/xds/options/risk`, { data });
				},
				/**
				 *  修改用户信息
				 */
				async xdsUserEdit(data = {}) {
					return _.$ajax.post(`/xds/user/edit`, { data });
				},
				async xdsUserResetPwd(data = {}) {
					return _.$ajax.get(`/xds/user/resetPwd/${data.id}`);
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
				 */
				async xdsDatabaseAssetsPage(data = {}) {
					return _.$ajax.get(`/xds/databaseAssets/page`, { data });
				},
				async xdsDatabaseAssetsConfig(data = {}) {
					return _.$ajax.get(`/xds/databaseAssets/config`, { data });
				},
				/**
				 *  根据数据库新增探针
				 */
				async xdsDatabaseAssetsAdd(data = {}) {
					return _.$ajax.post(`/xds/databaseAssets/add`, { data });
				},
				/**
				 *  报警配置查询
				 */
				async xdsWarningWarningConfigPage(data = {}) {
					return _.$ajax.post(`/xds/warning/warningConfig/page`, { data });
				},
				/**
				 *  报警方式配置
				 */
				async xdsWarningWarningConfig(data = {}) {
					return _.$ajax.post(`/xds/warning/warningConfig`, { data });
				},
				/**
				 *  报警详细信息查询
				 */
				async xdsWarningDetail(data = {}) {
					return _.$ajax.get(`/xds/warning/detail`, { data });
				},
				/**
				 *  警告SFTP查询
				 */
				async xdsWarningSftpFind(data = {}) {
					return _.$ajax.post(`/xds/warning/sftp/find`, { data });
				},
				/**
				 *  设置警告SFTP
				 */
				async xdsWarningSftpSet(data = {}) {
					return _.$ajax.post(`/xds/warning/sftp/set`, { data });
				},
				/**
				 *  连接测试
				 */
				async xdsWarningLinkTest(data = {}) {
					return _.$ajax.post(`/xds/warning/linkTest`, { data });
				},
				/**
				 *  立即备份
				 */
				async xdsBackupBackupNow(data = {}) {
					return _.$ajax.get(`/xds/backup/backupNow`, { data });
				},
				/**
				 *  备份文件上传
				 */
				async xdsBackupFileUpLoad(data = {}) {
					return _.$ajax.post(`/xds/backup/fileUpLoad`, { data });
				},
				/**
				 *  连接测试
				 */
				async xdsBackupLinkTest(data = {}) {
					return _.$ajax.post(`/xds/backup/linkTest`, { data });
				},
				/**
				 *  备份SFTP查询
				 */
				async xdsBackupSftpFind(data = {}) {
					return _.$ajax.get(`/xds/backup/sftp/find`, { data });
				},
				/**
				 *  设置备份SFTP
				 */
				async xdsBackupSftpSet(data = {}) {
					return _.$ajax.post(`/xds/backup/sftp/set`, { data });
				},
				/**
				 *  备份时间周期修改
				 */
				async xdsBackupTimeEdit(data = {}) {
					return _.$ajax.get(`/xds/backup/timeEdit`, { data });
				},
				/**
				 *  立即还原
				 */
				async xdsBackupRecover(data = {}) {
					return _.$ajax.get(`/xds/backup/recover`, { data });
				},
				/**
				 *  修改备份设置
				 */
				async xdsBackupEdit(data = {}) {
					return _.$ajax.post(`/xds/backup/edit`, { data });
				},
				/**
				 *  磁盘IO速率
				 */
				async xdsSelfMonitorDiskIo(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/diskIO`, { data });
				},
				/**
				 *  网络吞吐率
				 */
				async xdsSelfMonitorNetwork(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/network`, { data });
				},
				/**
				 *  进程列表
				 */
				async xdsSelfMonitorProcess(data = {}) {
					return _.$ajax.get(`/xds/selfMonitor/process`, { data });
				},
				/**
				 *  首页：告警比例图
				 */
				async xdsWarningPieChart(data = {}) {
					return _.$ajax.get(`/xds/warning/pieChart`, { data });
				},
				/**
				 *  当前配置查询
				 */
				xdsTrafficFindConfig(data = {}) {
					return _.$ajax.get(`/xds/traffic/findConfig`, {
						data
					});
				},
				/**
				 *  普通端口列表，用于添加绑定端口和指定普通端口名下拉列表选择
				 */
				xdsTrafficLivePortList(data = {}) {
					return _.$ajax.get(`/xds/traffic/livePortList`, {
						data
					});
				},
				/**
				 *  DPDK端口列表，用于DPDK端口下拉列表选择
				 */
				xdsTrafficDpdkList(data = {}) {
					return _.$ajax.get(`/xds/traffic/dpdkList`, {
						data
					});
				},
				/**
				 *  文件列表获取
				 */
				xdsTrafficFileList(data = {}) {
					return _.$ajax.get(`/xds/traffic/fileList`, {
						data
					});
				},
				/**
				 *  添加端口
				 */
				xdsTrafficAddPort(data = {}) {
					return _.$ajax.post(`/xds/traffic/addPort`, {
						data
					});
				},
				/**
				 *  离线文件上传
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
				 */
				xdsTrafficSaveConfig(data = {}) {
					return _.$ajax.post(`/xds/traffic/saveConfig`, {
						data
					});
				},
				/**
				 *  cron时间周期修改(8.18更新版本)
				 */
				async xdsBackupCronEdit(data = {}) {
					return _.$ajax.post(`/xds/backup/cronEdit`, { data });
				},
				/**
				 *  cron时间设置查询
				 */
				async xdsBackupConfigFind(data = {}) {
					return _.$ajax.get(`/xds/backup/configFind`, { data });
				},
				async xdsSensitivityDownload(data = {}) {
					const blob = await _.$ajax.downloadOctetStream({
						method: "get",
						url: "/xds/sensitivity/download",
						handleResult: () => {},
						fileType:
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					});
					return URL.createObjectURL(blob);
				},
				async xdsSensitivityUpload(formData = {}) {
					return _.$ajax.upload({
						method: "post",
						url: "/xds/sensitivity/upload",
						formData,
						callback(eventName, event) {
							if (eventName === "onprogress") {
								console.log("onprogress", event);
							}
						}
					});
				},
				async xdsAgentCancel(data = {}) {
					const { id } = data;
					return _.$ajax.get(`/xds/agent/cancel/${id}`, { data });
				},
				/**
				 *  流提取开关
				 */
				async xdsTrafficFlowSwitch(data = {}) {
					const { enabled } = data;
					return _.$ajax.post(`/xds/traffic/flowSwitch?enabled=${enabled}`, { data });
				},
				async xdsTrafficGetFlowStatus() {
					return _.$ajax.get(`/xds/traffic/flowStatus`);
				},
				async xdsWarningEmailFind(data = {}) {
					return _.$ajax.get(`/xds/warning/email/find`, { data });
				},
				async xdsWarningEmailDelete(data = {}) {
					const { id } = data;
					return _.$ajax.delete(`/xds/warning/email/${id}`, { data });
				},
				async xdsWarningEmailAdd(data = {}) {
					return _.$ajax.post(`/xds/warning/email/add`, { data });
				},
				/**
				 *  生成报表
				 */
				async xdsAuditLogReport() {
					const blob = await _.$ajax.downloadOctetStream({
						method: "get",
						url: "/xds/auditLog/report",
						handleResult: () => {},
						fileType:
							"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					});
					return URL.createObjectURL(blob);
				}
			};
		})();
	}

	return window._api.admin_db_audit;
}
</script>
