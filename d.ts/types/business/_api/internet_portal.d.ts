export type t_internet_portal = {
rest_me(args?:any):Promise<any>
/**
				 *  banner全量查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=1&interfaceType=interface&interfaceId=37630/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37630&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
homepageBannerList(args?:any):Promise<any>
homepageSolutionList(args?:any):Promise<any>
/**
				 *  页脚查询
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=1&interfaceType=interface&interfaceId=37631/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37631&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
homepageFooterList(args?:any):Promise<any>
/**
				 *  获取所有菜单-树形结构
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=1&interfaceType=interface&interfaceId=37636/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37636&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
menuTree(args?:any):Promise<any>
menu_detail(args?:any):Promise<any>
/**
				 *  注册用户
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37716/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37716&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
userRegister(args?:any):Promise<any>
/**
				 *  用户注册的环境信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37708/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37708&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
userEnvironment(args?:any):Promise<any>
/**
				 *  /file/upload
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37661/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37661&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
fileUpload(args?:any):Promise<any>
/**
				 *  查询审核状态
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37707/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37707&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
auditStatus(args?:any):Promise<any>
/**
				 *  详情
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37670/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37670&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
portalPageDetail(args?:any):Promise<any>
/**
				 *  修改注册信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=1&interfaceType=interface&interfaceId=37709/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37709&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
auditModifyId(args?:any):Promise<any>
/**
				 *  门户页面详情
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37721/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37721&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
menuDetailMenuPage(args?:any):Promise<any>
/**
				 *  列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37671/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37671&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
portalPageList(args?:any):Promise<any>
/**
				 *  法律条文类型列表
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37667/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37667&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
legalTypeTree(args?:any):Promise<any>
/**
				 *  详情
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37632/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37632&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
legalDetail(args?:any):Promise<any>
/**
				 *  法律条文内容详情
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37725/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37725&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
legalContentDetail(args?:any):Promise<any>
/**
				 *  个人中心
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=1&interfaceType=interface&interfaceId=37723/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37723&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
userPersonalCenter(args?:any):Promise<any>
/**
				 *  修改认证
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37738/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37738&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
userModify(args?:any):Promise<any>
/**
				 *  /user/{id}
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=1&interfaceType=interface&interfaceId=37739/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37739&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
modifyUserInfoById(args?:any):Promise<any>
/**
				 *  用户名校验
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37722/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37722&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
userUsernameVerification(args?:any):Promise<any>
/**
				 *  list
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37736/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37736&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
userAreaCodeList(args?:any):Promise<any>
/**
				 *  获取首页信息
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37746/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37746&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
menuDetailMenuPageType(args?:any):Promise<any>
/**
				 *  注册时候的验证码
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37761/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37761&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
captchaGetOne(args?:any):Promise<any>
/**
				 *  用户注册日志记录
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=1&interfaceType=interface&interfaceId=37762/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37762&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
processApi10HistoryProcInstId(args?:any):Promise<any>
/**
				 *  /homepage/messagest/{pageSize}/{curPage}
				 *  http://10.143.133.216:3001/yapi#/api/project?projectId=366&groupId=370&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=37763/#/api/project?projectId=366&groupId=370&interfaceType=interface&interfaceId=37763&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
homepageMessagestPageSizeCurPage(args?:any):Promise<any>
};