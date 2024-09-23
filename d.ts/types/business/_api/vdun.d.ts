export type t_vdun = {
/**
			 *  license时间验证
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=35494&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35494&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10LicenseValidate(args?:any):Promise<any>
/**
			 *  获取License信息
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=35495&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35495&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10LicenseDetail(args?:any):Promise<any>
/**
			 *  分页
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=35490&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35490&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10NodeListPageNoPageSize(args?:any):Promise<any>
/**
			 *  列表
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&interfaceId=35505&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35505&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10BusinessSystemList(args?:any):Promise<any>
/**
			 *  分页
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35504&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35504&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10BusinessSystemListPageNoPageSize(args?:any):Promise<any>
/**
			 *  规格列表-租户侧
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35532&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35532&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10FlavorSupport(args?:any):Promise<any>
/**
			 *  获取BPC服务节点列表信息
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35533&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35533&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10RegisterInfoList(args?:any):Promise<any>
/**
			 *  参数验证
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35488&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35488&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10OrderValidate(args?:any):Promise<any>
/**
			 *  BPC服务实例列表分页
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35530&project_interface_tab=1&project_setting_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35530&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10InstanceList(args?:any):Promise<any>
/**
			 *  BPC服务实例详情
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35528&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35528&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10InstanceId(args?:any):Promise<any>
/**
			 *  续期
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35529&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35529&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10InstanceRenew(args?:any):Promise<any>
/**
			 *  新增
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35503&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35503&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10BusinessSystemSave(args?:any):Promise<any>
/**
			 *  删除
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35507&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35507&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10BusinessSystemDelete(args?:any):Promise<any>
/**
			 *  列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35491&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35491&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10NodeList(args?:any):Promise<any>
restVdunV10Sso(args?:any):Promise<any>
/**
			 *  列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35536&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35536&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10EcsList(args?:any):Promise<any>
/**
			 *  新增(批量)
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35489&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35489&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10NodeSave(args?:any):Promise<any>
restVdunV10NodeTest(args?:any):Promise<any>
/**
			 *  删除
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35493&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35493&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10NodeDelete(args?:any):Promise<any>
/**
			 *  编辑
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35492&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35492&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10NodeEdit(args?:any):Promise<any>
/**
			 *  详情
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35537&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35537&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10BusinessSystemDetailId(args?:any):Promise<any>
/**
			 *  编辑
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35506&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35506&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10BusinessSystemEdit(args?:any):Promise<any>
/**
			 *  移除节点
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&interfaceType=interface&interfaceId=35540&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35540&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10BusinessSystemRemoveNode(args?:any):Promise<any>
/**
			 *  BPC服务实例名字修改
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35539&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35539&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10InstanceModifyName(args?:any):Promise<any>
/**
			 *  添加节点
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&project_setting_tab=7&interfaceType=interface&interfaceId=35541&project_interface_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35541&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10BusinessSystemAddNode(args?:any):Promise<any>
/**
			 *  查询项目列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36475&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36475&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10ProjectList(args?:any):Promise<any>
/**
			 *  BPC HUB列表分页
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36478&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36478&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10HubList(args?:any):Promise<any>
/**
			 *  修改node HUB信息
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36487&project_interface_tab=1&project_setting_tab=7/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36487&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10NodeHubModify(args?:any):Promise<any>
/**
			 *  获取BPC HUB server详情
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36480&project_interface_tab=1/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36480&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10HubDetailId(args?:any):Promise<any>
/**
			 *  查询AZ列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=36485&interfaceType=interface&project_interface_tab=1&project_setting_tab=1/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36485&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10AzList(args?:any):Promise<any>
/**
			 *  查询规格列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36483&project_interface_tab=1/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36483&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10FlavorList(args?:any):Promise<any>
/**
			 *  查询镜像列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36477&project_interface_tab=1&wiki=420/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36477&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10ImageList(args?:any):Promise<any>
/**
			 *  查询VPC列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36472&project_interface_tab=1&wiki=420/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36472&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10VpcList(args?:any):Promise<any>
/**
			 *  查询VPC列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36473&project_interface_tab=1&wiki=420/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36473&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10SubnetList(args?:any):Promise<any>
/**
			 *  查询安全组列表
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36474&project_interface_tab=1&wiki=420/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36474&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10SgList(args?:any):Promise<any>
/**
			 *  创建BPC HUB server
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36482&project_interface_tab=1&wiki=420/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36482&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10HubCreate(args?:any):Promise<any>
/**
			 *  查询云硬盘类型
			 *  https://yapi.ghca.dev/#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36484&project_interface_tab=1&wiki=420/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36484&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10EvsTypeList(args?:any):Promise<any>
/**
			 *  删除BPC HUB server
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36481&project_interface_tab=1/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36481&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10HubDeleteId(args?:any):Promise<any>
/**
			 *  获取node配置信息，type=hub HUB模式配置，type=directConnection 非HUB模式
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=355&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36486&project_interface_tab=1/#/api/project?projectId=355&groupId=432&interfaceType=interface&interfaceId=36486&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10NodeIdConfig(args?:any):Promise<any>
/**
			 *  查询云主机列表，必须传入queryProjectId,queryRegionId
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=355&groupId=155&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=36488&project_interface_tab=1/#/api/project?projectId=355&groupId=155&interfaceType=interface&interfaceId=36488&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restVdunV10EcsListV1(args?:any):Promise<any>
};