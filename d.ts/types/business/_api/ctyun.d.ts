export type t_ctyun = {
EvsController(args?:any):Promise<any>
VpcController(args?:any):Promise<any>
EvsSnapshot(args?:any):Promise<any>
Bandwidth(args?:any):Promise<any>
Eip(args?:any):Promise<any>
/* 重命名EIP */
restCtyunV1_0EipRename(args?:any):Promise<any>
/**
			 *  删除云主机快照策略
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33556&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10EcsSnapshotPolicyDelete(args?:any):Promise<any>
/**
			 *  linux云主机解绑密钥对
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33500&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10KeyPairDetachInstance(args?:any):Promise<any>
/**
			 *  linux云主机绑定密钥对
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33503&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10KeyPairAttachInstance(args?:any):Promise<any>
/**
			 *  批量绑定安全组
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33864&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10SgGroupBindBatch(args?:any):Promise<any>
/**
			 *  获取VNC远程登录地址
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33472&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10VncGetVncUrl(args?:any):Promise<any>
/**
			 *  重置云服务器密码
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33559&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10EcsReset(args?:any):Promise<any>
/**
			 *  重装多台云主机
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33561&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10EcsRebuild(args?:any):Promise<any>
/**
			 *  解绑网卡
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33663&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10NicDetach(args?:any):Promise<any>
/**
			 *  绑定网卡
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33664&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10NicAttach(args?:any):Promise<any>
/**
			 *  修改实例名称
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33564&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10EcsModify(args?:any):Promise<any>
/**
			 * 提交订单之前参数验证
			 * @param data
			 */
resetOrderParametersValidate(args?:any):Promise<any>
resetLicenseValidate(args?:any):Promise<any>
/* *********************** */
restCtyunV10EvsEvsIds(args?:any):Promise<any>
/**
			 *  关机
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33541&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10EcsStop(args?:any):Promise<any>
/**
			 *  重启
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33562&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10EcsReboot(args?:any):Promise<any>
/**
			 *  开机
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33542&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10EcsStart(args?:any):Promise<any>
/**
			 *  修改云主机快照策略
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33548&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10EcsSnapshotPolicyUpdate(args?:any):Promise<any>
/**
			 *  创建云主机快照策略
			 *  https://yapi.ghca.dev/#/api/project?projectId=333&groupId=432&interfaceType=interface&interfaceId=33557&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restCtyunV10EcsSnapshotPolicyCreate(args?:any):Promise<any>
restCtyunV1_0EcsSnapshotPolicyList(args?:any):Promise<any>
/**
			 * 通过snapshotId获取快照详情
			 * @param data
			 */
restCtyunV1_0EcsSnapshotDetail(args?:any):Promise<any>
restCtyunV1_0EcsSnapshotPage(args?:any):Promise<any>
restCtyunV1_0EcsId(args?:any):Promise<any>
restCtyunV1_0NicList(args?:any):Promise<any>
restCtyunV1_0VpcSubnet(args?:any):Promise<any>
restCtyunV1_0ImagePage(args?:any):Promise<any>
adminCtyunV1_0FlavorInfoList(args?:any):Promise<any>
/**
			 *  云主机列表分页
			 *  http://10.143.133.216:3001/project/326/interface/api/33023
			 */
restCtyunV10EcsPage(args?:any):Promise<any>
restCtyunV1_0EcsList(args?:any):Promise<any>
restCtyunV1_0SgGroupModify(args?:any):Promise<any>
/**
			 *  修改安全组出/入规则
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=31546&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/31546
			 */
restCtyunV1_0SgGroupRuleModify(args?:any):Promise<any>
/**
			 *  删除安全组出/入规则
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=31540&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/31540
			 */
restCtyunV10SgGroupRuleDelete(args?:any):Promise<any>
/**
			 *  创建安全组出/入规则
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=31534&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/31534
			 */
restCtyunV10SgGroupRuleCreate(args?:any):Promise<any>
/**
			 *  获取安全组详情
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=31522&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/31522
			 */
restCtyunV10SgGroupDetail(args?:any):Promise<any>
/**
			 *  获取安全组列表 from db
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=31691&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/31691
			 */
restCtyunV10SgGroupListDb(args?:any):Promise<any>
/**
			 *  获取安全组列表
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&category_id=all&interface_id=31528&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/31528
			 */
restCtyunV10SgGroupList(args?:any):Promise<any>
/**
			 * 安全组移除云服务器
			 * @param data
			 */
restCtyunV10SgGroupUnBind(args?:any):Promise<any>
/**
			 * 安全组添加云服务器
			 * @param data
			 */
restCtyunV10SgGroupBind(args?:any):Promise<any>
/**
			 *  删除云服务器组
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_detail_type=PREVIEW&interface_id=30807&category_id=5724
			 *  http://10.143.133.216:3001/project/319/interface/api/30807
			 */
restCtyunV10EcsGroupDelete(args?:any):Promise<any>
/**
			 *  获取云服务器组列表
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_detail_type=PREVIEW&interface_id=30813&category_id=5724
			 *  http://10.143.133.216:3001/project/319/interface/api/30813
			 */
restCtyunV10EcsGroupList(args?:any):Promise<any>
/**
			 * 获取云服务器组中的云主机
			 * @param data
			 */
restCtyunV10EcsGroupInstanceList(args?:any):Promise<any>
/**
			 * 云主机组中删除单台云主机
			 * @param data
			 */
restCtyunV10EcsGroupUnbindInstance(args?:any):Promise<any>
/**
			 * 云主机组中添加云主机
			 * @param data
			 */
restCtyunV10EcsGroupBindInstance(args?:any):Promise<any>
/**
			 *  创建云主机组组
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=30801&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/30801
			 */
restCtyunV10EcsGroupCreate(args?:any):Promise<any>
/**
			 *  获取密钥对
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=5730&interface_type=interface&interface_id=31065&interface_detail_type=PREVIEW&project_setting_tab=%E8%AF%B7%E6%B1%82%E4%BB%A3%E7%A0%81%E6%A8%A1%E6%9D%BF
			 *  http://10.143.133.216:3001/project/319/interface/api/31065
			 */
restCtyunV10KeyPairList(args?:any):Promise<any>
/**
			 *  获取所属项目映射列表
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&interface_id=31498&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/31498
			 */
restCtyunV10ProjectsEnterprise(args?:any):Promise<any>
/**
			 *  创建密钥对
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=31041&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/31041
			 */
restCtyunV10KeyPairCreate(args?:any):Promise<any>
/**
			 *  导入密钥对公钥（密钥对的类型必须是SSH或x509）
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=31059&interface_detail_type=PREVIEW
			 *  http://10.143.133.216:3001/project/319/interface/api/31059
			 */
restCtyunV10KeyPairImport(args?:any):Promise<any>
/**
			 *  删除密钥对
			 *  http://10.143.133.216:3001/wiki/#/project?project_id=319&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=5730&interface_type=interface&interface_detail_type=PREVIEW&interface_id=31047
			 *  http://10.143.133.216:3001/project/319/interface/api/31047
			 */
restCtyunV10KeyPairDelete(args?:any):Promise<any>
};