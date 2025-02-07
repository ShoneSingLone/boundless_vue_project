export type t_admin_db_audit = {
/**
				 *  获取验证码
				 */
xdsVerifyCode(args?:any):Promise<any>
/**
				 *  当前用户登录信息
				 */
xdsLoginInfo(args?:any):Promise<any>
/**
				 *  用户登录
				 */
xdsLogin(args?:any):Promise<any>
/**
				 *  探针分页查询
				 */
xdsAgentPage(args?:any):Promise<any>
/**
				 *  新增探针
				 */
xdsAgentAdd(args?:any):Promise<any>
/**
				 *  修改探针
				 */
xdsAgentEdit(args?:any):Promise<any>
/**
				 *  删除探针
				 */
xdsAgentDeleteId(args?:any):Promise<any>
/**
				 *  新增策略
				 */
xdsStrategyAdd(args?:any):Promise<any>
xdsStrategyAuthStrategy(args?:any):Promise<any>
/**
				 *  删除策略
				 */
xdsStrategyDeleteId(args?:any):Promise<any>
/**
				 *  修改策略
				 */
xdsStrategyEdit(args?:any):Promise<any>
/**
				 *  策略列表分页查询
				 */
xdsStrategyPage(args?:any):Promise<any>
/**
				 *  策略包含规则列表查询
				 */
xdsStrategyPageId(args?:any):Promise<any>
/**
				 *  白名单分页查询
				 */
xdsWhitelistPage(args?:any):Promise<any>
/**
				 *  删除白名单规则
				 */
xdsWhitelistId(args?:any):Promise<any>
/**
				 *  修改白名单规则
				 */
xdsWhitelistEdit(args?:any):Promise<any>
/**
				 *  新增白名单规则
				 */
xdsWhitelistAdd(args?:any):Promise<any>
/**
				 *  规则列表分页查询
				 */
xdsRulePage(args?:any):Promise<any>
xdsStrategyPageId(args?:any):Promise<any>
/**
				 *  修改规则
				 */
xdsRuleEdit(args?:any):Promise<any>
/**
				 *  删除规则
				 */
xdsRuleDeleteId(args?:any):Promise<any>
xdsCancelId(args?:any):Promise<any>
/**
				 *  新增规则
				 */
xdsRuleAdd(args?:any):Promise<any>
/**
				 *  查询全部审计日志
				 */
xdsAuditLog(args?:any):Promise<any>
xdsAuditLogSend2end(args?:any):Promise<any>
/**
				 *  查询结果导出
				 */
xdsAuditLogExcel(args?:any):Promise<any>
/**
				 *  首页的热库、热表、热IP、热操作命令
				 */
xdsAuditLogFrontpage(args?:any):Promise<any>
/**
				 *  热表信息
				 */
xdsAuditLogHottable(args?:any):Promise<any>
/**
				 *  模糊分页查询
				 */
xdsAuditLogPage(args?:any):Promise<any>
/**
				 *  查询用户行为轨迹
				 */
xdsAuditLogUserBehavior(args?:any):Promise<any>
/**
				 *  根据ip查询单条日志
				 */
xdsAuditLogId(args?:any):Promise<any>
/**
				 *  警告列表分页查询
				 */
xdsWarningPage(args?:any):Promise<any>
/**
				 *  获取数据库类型列表
				 */
xdsOptionsDatabaseType(args?:any):Promise<any>
xdsOptionsJoint(args?:any):Promise<any>
xdsOptionsFeature(args?:any):Promise<any>
/**
				 *  获取性别选项列表
				 */
xdsOptionsGender(args?:any):Promise<any>
/**
				 *  获取规则配置谓词表
				 */
xdsOptionsPredicate(args?:any):Promise<any>
/**
				 *  获取规则表、策略表、白名单状态列表
				 */
xdsOptionsRuleStatus(args?:any):Promise<any>
/**
				 *  获取用户表状态、权限表状态列表
				 */
xdsOptionsUserStatus(args?:any):Promise<any>
/**
				 *  获取告警表状态列表
				 */
xdsOptionsWarningStatus(args?:any):Promise<any>
/**
				 *  删除角色
				 */
xdsRoleId(args?:any):Promise<any>
/**
				 *  部门列表查询
				 */
xdsDepartmentPage(args?:any):Promise<any>
/**
				 *  删除部门
				 */
xdsDepartmentIdDel(args?:any):Promise<any>
/**
				 *  修改部门
				 */
xdsDepartmentIdUpdate(args?:any):Promise<any>
/**
				 *  新增部门
				 */
xdsDepartment(args?:any):Promise<any>
/**
				 *  CPU信息获取
				 */
xdsSelfMonitorCpu(args?:any):Promise<any>
/**
				 *  磁盘信息获取
				 */
xdsSelfMonitorDisk(args?:any):Promise<any>
/**
				 *  磁盘使用率
				 */
xdsSelfMonitorDiskUsage(args?:any):Promise<any>
/**
				 *  内存信息获取
				 */
xdsSelfMonitorMemory(args?:any):Promise<any>
/**
				 *  系统角色列表分页查询
				 */
xdsRolePage(args?:any):Promise<any>
/**
				 *  新增角色
				 */
xdsRoleAdd(args?:any):Promise<any>
/**
				 *  修改角色
				 */
xdsRoleEdit(args?:any):Promise<any>
/**
				 *  查找角色关联菜单权限列表
				 */
xdsRoleRoleIdMenus(args?:any):Promise<any>
/**
				 *  查找角色关联菜单权限列表
				 */
xdsRoleAuth(args?:any):Promise<any>
/**
				 *  用户列表分页查询
				 */
xdsUserPage(args?:any):Promise<any>
/**
				 *  新增用户
				 */
xdsUserAdd(args?:any):Promise<any>
/**
				 *  修改密码
				 */
xdsUserChangePwd(args?:any):Promise<any>
/**
				 *  修改个人信息（昵称、电话、性别）
				 */
xdsUserEditPersonal(args?:any):Promise<any>
/**
				 *  修改用户信息
				 */
xdsUserEdit(args?:any):Promise<any>
/**
				 *  删除用户
				 */
xdsUserId(args?:any):Promise<any>
/**
				 *  系统角色列表查询
				 */
xdsRoleAll(args?:any):Promise<any>
/**
				 *  系统菜单列表分页查询
				 */
xdsMenuPage(args?:any):Promise<any>
/**
				 *  新增菜单
				 */
xdsMenuAdd(args?:any):Promise<any>
/**
				 *  系统菜单列表
				 */
xdsMenuPidPid(args?:any):Promise<any>
/**
				 *  修改菜单
				 */
xdsMenuId(args?:any):Promise<any>
/**
				 *  删除菜单
				 */
xdsMenuDelId(args?:any):Promise<any>
/**
				 *  首页：近七天告警分布
				 */
xdsWarningWarningDistributed(args?:any):Promise<any>
/**
				 *  处理警告
				 */
xdsWarningEdit(args?:any):Promise<any>
/**
				 *  删除警告
				 */
xdsWarningId(args?:any):Promise<any>
login(args?:any):Promise<any>
/**
				 *  用户登出
				 */
xdsLogout(args?:any):Promise<any>
/**
				 *  获取风险等级状态表
				 */
xdsOptionsRisk(args?:any):Promise<any>
/**
				 *  修改用户信息
				 */
xdsUserEdit(args?:any):Promise<any>
xdsUserResetPwd(args?:any):Promise<any>
getUserInfo(args?:any):Promise<any>
getRouters(args?:any):Promise<any>
captchaImage(args?:any):Promise<any>
listUser(args?:any):Promise<any>
/**
				 *  数据库资源查询
				 */
xdsDatabaseAssetsPage(args?:any):Promise<any>
xdsDatabaseAssetsConfig(args?:any):Promise<any>
/**
				 *  根据数据库新增探针
				 */
xdsDatabaseAssetsAdd(args?:any):Promise<any>
/**
				 *  报警配置查询
				 */
xdsWarningWarningConfigPage(args?:any):Promise<any>
/**
				 *  报警方式配置
				 */
xdsWarningWarningConfig(args?:any):Promise<any>
/**
				 *  报警详细信息查询
				 */
xdsWarningDetail(args?:any):Promise<any>
/**
				 *  警告SFTP查询
				 */
xdsWarningSftpFind(args?:any):Promise<any>
/**
				 *  设置警告SFTP
				 */
xdsWarningSftpSet(args?:any):Promise<any>
/**
				 *  连接测试
				 */
xdsWarningLinkTest(args?:any):Promise<any>
/**
				 *  立即备份
				 */
xdsBackupBackupNow(args?:any):Promise<any>
/**
				 *  备份文件上传
				 */
xdsBackupFileUpLoad(args?:any):Promise<any>
/**
				 *  连接测试
				 */
xdsBackupLinkTest(args?:any):Promise<any>
/**
				 *  备份SFTP查询
				 */
xdsBackupSftpFind(args?:any):Promise<any>
/**
				 *  设置备份SFTP
				 */
xdsBackupSftpSet(args?:any):Promise<any>
/**
				 *  备份时间周期修改
				 */
xdsBackupTimeEdit(args?:any):Promise<any>
/**
				 *  立即还原
				 */
xdsBackupRecover(args?:any):Promise<any>
/**
				 *  修改备份设置
				 */
xdsBackupEdit(args?:any):Promise<any>
/**
				 *  磁盘IO速率
				 */
xdsSelfMonitorDiskIo(args?:any):Promise<any>
/**
				 *  网络吞吐率
				 */
xdsSelfMonitorNetwork(args?:any):Promise<any>
/**
				 *  进程列表
				 */
xdsSelfMonitorProcess(args?:any):Promise<any>
/**
				 *  首页：告警比例图
				 */
xdsWarningPieChart(args?:any):Promise<any>
/**
				 *  当前配置查询
				 */
xdsTrafficFindConfig(args?:any):Promise<any>
/**
				 *  普通端口列表，用于添加绑定端口和指定普通端口名下拉列表选择
				 */
xdsTrafficLivePortList(args?:any):Promise<any>
/**
				 *  DPDK端口列表，用于DPDK端口下拉列表选择
				 */
xdsTrafficDpdkList(args?:any):Promise<any>
/**
				 *  文件列表获取
				 */
xdsTrafficFileList(args?:any):Promise<any>
/**
				 *  添加端口
				 */
xdsTrafficAddPort(args?:any):Promise<any>
/**
				 *  离线文件上传
				 */
xdsTrafficFileupload(args?:any):Promise<any>
/**
				 *  保存配置
				 */
xdsTrafficSaveConfig(args?:any):Promise<any>
/**
				 *  cron时间周期修改(8.18更新版本)
				 */
xdsBackupCronEdit(args?:any):Promise<any>
/**
				 *  cron时间设置查询
				 */
xdsBackupConfigFind(args?:any):Promise<any>
xdsSensitivityDownload(args?:any):Promise<any>
xdsSensitivityUpload(args?:any):Promise<any>
xdsAgentCancel(args?:any):Promise<any>
/**
				 *  流提取开关
				 */
xdsTrafficFlowSwitch(args?:any):Promise<any>
xdsTrafficGetFlowStatus(args?:any):Promise<any>
xdsWarningEmailFind(args?:any):Promise<any>
xdsWarningEmailDelete(args?:any):Promise<any>
xdsWarningEmailAdd(args?:any):Promise<any>
/**
				 *  生成报表
				 */
xdsAuditLogReport(args?:any):Promise<any>
};