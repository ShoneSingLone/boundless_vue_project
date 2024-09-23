export type t_admin_db_audit = {
/**
				 *  获取验证码
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36248&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36248&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsVerifyCode(args?:any):Promise<any>
/**
				 *  当前用户登录信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36083&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36083&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsLoginInfo(args?:any):Promise<any>
/**
				 *  用户登录
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36078&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36078&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsLogin(args?:any):Promise<any>
/**
				 *  探针分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=3&wiki=&interfaceType=interface&interfaceId=36008&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36008&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAgentPage(args?:any):Promise<any>
/**
				 *  新增探针
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&amp%3BgroupId=11&amp%3BprojectTabName=%E6%8E%A5%E5%8F%A3&projectTabName=%E6%8E%A5%E5%8F%A3&groupId=11&interfaceId=35988&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=35988&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAgentAdd(args?:any):Promise<any>
/**
				 *  修改探针
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=35998&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=35998&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAgentEdit(args?:any):Promise<any>
/**
				 *  删除探针
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=35993&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=35993&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAgentDeleteId(args?:any):Promise<any>
/**
				 *  新增策略
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36183&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36183&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsStrategyAdd(args?:any):Promise<any>
xdsStrategyAuthStrategy(args?:any):Promise<any>
/**
				 *  删除策略
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36188&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36188&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsStrategyDeleteId(args?:any):Promise<any>
/**
				 *  修改策略
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36193&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36193&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsStrategyEdit(args?:any):Promise<any>
/**
				 *  策略列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36198&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36198&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsStrategyPage(args?:any):Promise<any>
/**
				 *  策略包含规则列表查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36203&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36203&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsStrategyPageId(args?:any):Promise<any>
/**
				 *  白名单分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36288&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36288&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWhitelistPage(args?:any):Promise<any>
/**
				 *  删除白名单规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36293&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36293&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWhitelistId(args?:any):Promise<any>
/**
				 *  修改白名单规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36283&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36283&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWhitelistEdit(args?:any):Promise<any>
/**
				 *  新增白名单规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36278&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36278&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWhitelistAdd(args?:any):Promise<any>
/**
				 *  规则列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36163&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36163&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRulePage(args?:any):Promise<any>
/**
				 *  修改规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36158&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36158&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRuleEdit(args?:any):Promise<any>
/**
				 *  删除规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36153&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36153&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRuleDeleteId(args?:any):Promise<any>
/**
				 *  新增规则
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36148&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36148&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRuleAdd(args?:any):Promise<any>
/**
				 *  查询全部审计日志
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36013&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36013&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAuditLog(args?:any):Promise<any>
/**
				 *  查询结果导出
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36023&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36023&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAuditLogExcel(args?:any):Promise<any>
/**
				 *  首页的热库、热表、热IP、热操作命令
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36028&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36028&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAuditLogFrontpage(args?:any):Promise<any>
/**
				 *  热表信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36033&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36033&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAuditLogHottable(args?:any):Promise<any>
/**
				 *  模糊分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36038&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36038&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAuditLogPage(args?:any):Promise<any>
/**
				 *  查询用户行为轨迹
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36043&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36043&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAuditLogUserBehavior(args?:any):Promise<any>
/**
				 *  根据ip查询单条日志
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36048&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36048&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsAuditLogId(args?:any):Promise<any>
/**
				 *  警告列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36263&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36263&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningPage(args?:any):Promise<any>
/**
				 *  获取数据库类型列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36305&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36305&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsOptionsDatabaseType(args?:any):Promise<any>
/**
				 *  获取性别选项列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36310&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36310&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsOptionsGender(args?:any):Promise<any>
/**
				 *  获取规则配置谓词表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36315&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36315&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsOptionsPredicate(args?:any):Promise<any>
/**
				 *  获取规则表、策略表、白名单状态列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36320&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36320&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsOptionsRuleStatus(args?:any):Promise<any>
/**
				 *  获取用户表状态、权限表状态列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36325&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36325&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsOptionsUserStatus(args?:any):Promise<any>
/**
				 *  获取告警表状态列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36330&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36330&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsOptionsWarningStatus(args?:any):Promise<any>
/**
				 *  删除角色
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36138&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36138&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRoleId(args?:any):Promise<any>
/**
				 *  部门列表查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36063&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36063&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsDepartmentPage(args?:any):Promise<any>
/**
				 *  删除部门
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36073&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36073&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsDepartmentIdDel(args?:any):Promise<any>
/**
				 *  修改部门
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36068&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36068&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsDepartmentIdUpdate(args?:any):Promise<any>
/**
				 *  新增部门
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36058&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36058&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsDepartment(args?:any):Promise<any>
/**
				 *  CPU信息获取
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36168&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36168&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsSelfMonitorCpu(args?:any):Promise<any>
/**
				 *  磁盘信息获取
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36173&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36173&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsSelfMonitorDisk(args?:any):Promise<any>
/**
				 *  磁盘使用率
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36441&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36441&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsSelfMonitorDiskUsage(args?:any):Promise<any>
/**
				 *  内存信息获取
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36178&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36178&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsSelfMonitorMemory(args?:any):Promise<any>
/**
				 *  系统角色列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36133&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36133&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRolePage(args?:any):Promise<any>
/**
				 *  新增角色
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36113&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36113&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRoleAdd(args?:any):Promise<any>
/**
				 *  修改角色
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36128&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36128&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRoleEdit(args?:any):Promise<any>
/**
				 *  查找角色关联菜单权限列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36143&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36143&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRoleRoleIdMenus(args?:any):Promise<any>
/**
				 *  查找角色关联菜单权限列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36123&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36123&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRoleAuth(args?:any):Promise<any>
/**
				 *  用户列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36238&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36238&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsUserPage(args?:any):Promise<any>
/**
				 *  新增用户
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36223&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36223&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsUserAdd(args?:any):Promise<any>
/**
				 *  修改密码
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36228&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36228&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsUserChangePwd(args?:any):Promise<any>
/**
				 *  修改用户信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36233&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36233&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsUserEdit(args?:any):Promise<any>
/**
				 *  删除用户
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36243&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36243&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsUserId(args?:any):Promise<any>
/**
				 *  系统角色列表查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36118&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36118&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsRoleAll(args?:any):Promise<any>
/**
				 *  系统菜单列表分页查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36093&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36093&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsMenuPage(args?:any):Promise<any>
/**
				 *  新增菜单
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36088&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36088&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsMenuAdd(args?:any):Promise<any>
/**
				 *  系统菜单列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36098&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36098&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsMenuPidPid(args?:any):Promise<any>
/**
				 *  修改菜单
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36103&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36103&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsMenuId(args?:any):Promise<any>
/**
				 *  删除菜单
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36108&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36108&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsMenuDelId(args?:any):Promise<any>
/**
				 *  首页：近七天告警分布
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36268&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36268&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningWarningDistributed(args?:any):Promise<any>
/**
				 *  处理警告
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36258&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36258&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningEdit(args?:any):Promise<any>
/**
				 *  删除警告
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36273&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36273&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningId(args?:any):Promise<any>
login(args?:any):Promise<any>
/**
				 *  用户登出
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36365&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36365&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsLogout(args?:any):Promise<any>
/**
				 *  获取风险等级状态表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36375&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36375&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsOptionsRisk(args?:any):Promise<any>
/**
				 *  修改用户信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36233&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36233&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsUserEdit(args?:any):Promise<any>
/**
				 *  修改密码
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36228&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36228&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsUserChangePwd(args?:any):Promise<any>
getUserInfo(args?:any):Promise<any>
getRouters(args?:any):Promise<any>
captchaImage(args?:any):Promise<any>
listUser(args?:any):Promise<any>
/**
				 *  数据库资源查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36411&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36411&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsDatabaseAssetsPage(args?:any):Promise<any>
/**
				 *  根据数据库新增探针
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36412&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36412&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsDatabaseAssetsAdd(args?:any):Promise<any>
/**
				 *  报警配置查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36402&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36402&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningWarningConfigPage(args?:any):Promise<any>
/**
				 *  报警方式配置
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36403&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36403&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningWarningConfig(args?:any):Promise<any>
/**
				 *  报警详细信息查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36408&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36408&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningDetail(args?:any):Promise<any>
/**
				 *  警告SFTP查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36405&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36405&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningSftpFind(args?:any):Promise<any>
/**
				 *  设置警告SFTP
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36404&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36404&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningSftpSet(args?:any):Promise<any>
/**
				 *  连接测试
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36416&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36416&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningLinkTest(args?:any):Promise<any>
/**
				 *  立即备份
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36418&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36418&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsBackupBackupNow(args?:any):Promise<any>
/**
				 *  备份文件上传
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36417&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36417&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsBackupFileUpLoad(args?:any):Promise<any>
/**
				 *  连接测试
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36416&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36416&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsBackupLinkTest(args?:any):Promise<any>
/**
				 *  备份SFTP查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36415&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36415&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsBackupSftpFind(args?:any):Promise<any>
/**
				 *  设置备份SFTP
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36414&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36414&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsBackupSftpSet(args?:any):Promise<any>
/**
				 *  备份时间周期修改
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36413&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36413&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsBackupTimeEdit(args?:any):Promise<any>
/**
				 *  立即还原
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36360&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36360&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsBackupRecover(args?:any):Promise<any>
/**
				 *  修改备份设置
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36053&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36053&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsBackupEdit(args?:any):Promise<any>
/**
				 *  磁盘IO速率
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36410&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36410&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsSelfMonitorDiskIo(args?:any):Promise<any>
/**
				 *  网络吞吐率
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=1&wiki=&interfaceId=36409&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36409&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsSelfMonitorNetwork(args?:any):Promise<any>
/**
				 *  进程列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36440&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36440&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsSelfMonitorProcess(args?:any):Promise<any>
/**
				 *  首页：告警比例图
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36406&interfaceType=interface&project_interface_tab=1&project_setting_tab=7&wiki=/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36406&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsWarningPieChart(args?:any):Promise<any>
/**
				 *  当前配置查询
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&interfaceId=236&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=236&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsTrafficFindConfig(args?:any):Promise<any>
/**
				 *  普通端口列表，用于添加绑定端口和指定普通端口名下拉列表选择
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&interfaceId=235&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=235&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsTrafficLivePortList(args?:any):Promise<any>
/**
				 *  DPDK端口列表，用于DPDK端口下拉列表选择
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=239&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=239&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsTrafficDpdkList(args?:any):Promise<any>
/**
				 *  文件列表获取
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=238&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=238&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsTrafficFileList(args?:any):Promise<any>
/**
				 *  添加端口
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=240&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=240&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsTrafficAddPort(args?:any):Promise<any>
/**
				 *  离线文件上传
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=237&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=237&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsTrafficFileupload(args?:any):Promise<any>
/**
				 *  保存配置
				 *  http://192.168.68.194:3001/yapi#/api/project?projectId=4&groupId=4&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=234&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=4&groupId=4&interfaceType=interface&interfaceId=234&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
xdsTrafficSaveConfig(args?:any):Promise<any>
/**
         *  cron时间周期修改(8.18更新版本)
         *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&wiki=&interfaceId=36443&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36443&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
         */
xdsBackupCronEdit(args?:any):Promise<any>
/**
         *  cron时间设置查询
         *  http://10.143.133.216:3001/yapi#/api/project?projectId=14&groupId=11&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&wiki=&interfaceId=36444&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=14&groupId=11&interfaceType=interface&interfaceId=36444&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
         */
xdsBackupConfigFind(args?:any):Promise<any>
};