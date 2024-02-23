export type t_anxin = {
	/**
	 * 获取可用的名称
	 * @param {any} { data }
	 * @returns
	 */
	postElbCanUseName(args?: any): Promise<any>;
	postNsHaselb(args?: any): Promise<any>;
	/**
	 *  可用IP列表
	 *  http://localhost:3001/dist/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&interface_id=29097&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/29097
	 */
	postMoElbIpList(args?: any): Promise<any>;
	postMoElbIpListExist(args?: any): Promise<any>;
	/**
	 *  查询namespace下Service列表
	 *  https://yapi.ghca.dev/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=28964&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/28964
	 */
	postApiV10CceNamespaceService(args?: any): Promise<any>;
	/**
	 *  工作负载列表查询
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=28970&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/28970
	 */
	postApiV10CceNamespaceWorkloads(args?: any): Promise<any>;
	/**
	 *  查询namespace下已绑定子网
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=28967&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/28967
	 */
	postApiV10CceNamespaceSubnets(args?: any): Promise<any>;
	/**
	 *  Namespace列表查询
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&interface_id=28907&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/28907
	 */
	postApiV10CceNamespaces(args?: any): Promise<any>;
	/**
	 *  子网列表
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&wiki_id=361&interface_id=29079&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/29079
	 */
	postApiV10EcsSubnetListVpcId(args?: any): Promise<any>;
	/**
	 *  VPC-IP配额查询
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&interface_id=28439&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/28439
	 */
	getApiV10VdcVpcQuota(args?: any): Promise<any>;
	/**
	 * 获取流程施工结果
	 * @param processId
	 * @returns {Promise<*|undefined>}
	 */
	getHandleResult(args?: any): Promise<any>;
	/**
	 *  获取流程详细信息
	 *  http://10.143.133.216:3001/project/300/interface/api/28460
	 */
	getAxUmCasProcessProcessId(args?: any): Promise<any>;
	/**
	 * 获取流程iframe嵌入卡片
	 * @returns {Promise<*|undefined>}
	 */
	getAxUmCasProcessCard(args?: any): Promise<any>;
	/**
	 *  获取流程申请类型列表
	 *  http://10.143.133.216:3001/project/300/interface/api/28457
	 */
	axUmCasProcessTypes(args?: any): Promise<any>;
	/**
	 *   流程模板列表数据，查询流程数据的时候根据流程模板过滤
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=29055
	 *  http://10.143.133.216:3001/project/300/interface/api/29055
	 */
	getAxUmCasProcessTemplateList(args?: any): Promise<any>;
	/**
	 *  logout
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&wiki_id=361&interface_id=28472&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/28472
	 */
	getAxUmLogout(args?: any): Promise<any>;
	/**
	 *  根据申请类型创建流程,返回流程实例ID
	 *  http://10.143.133.216:3001/project/300/interface/api/28525
	 */
	axUmCasProcess(args?: any): Promise<any>;
	/**
	 *  提交流程，保存表单数据
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&interface_id=28463
	 *  http://10.143.133.216:3001/project/300/interface/api/28463
	 */
	postAxUmCasProcessProcessId(args?: any): Promise<any>;
	/**
	 *  提交流程，修改表单数据
	 *  http://10.143.133.216:3001/project/300/interface/api/28463
	 */
	axPutUmCasProcessProcessId(args?: any): Promise<any>;
	/**
	 *  获取流程列表，请根据请求参数mydoc字断查询
	 *  http://10.143.133.216:3001/project/300/interface/api/28522
	 */
	axUmCasProcessList(args?: any): Promise<any>;
	/**
	 *  业务系统列表查询
	 *  http://10.143.133.216:3001/project/300/interface/api/28518
	 */
	axAppBusinessList(args?: any): Promise<any>;
	/**
	 *  根据流程ID获取保存的表单数据
	 *  http://10.143.133.216:3001/project/300/interface/api/28469
	 */
	axUmCasProcessProcessIdFormData(args?: any): Promise<any>;
	/**
	 *  获取当前用户/申请用户信息
	 *  http://10.143.133.216:3001/project/300/interface/api/28454
	 */
	axUmCasProcessCurrentUser(args?: any): Promise<any>;
	/**
	 *  获取流程是否可编辑
	 *  http://10.143.133.216:3001/project/300/interface/api/28922
	 */
	axUmCasProcessProcessIdEditable(args?: any): Promise<any>;
	/**
	 *  vdc下的配额列表
	 *  http://10.143.133.216:3001/project/300/interface/api/28484
	 */
	moVdcQuotas(args?: any): Promise<any>;
	/**
	 *  vdc下的配额列表 (私有云VDC配额申请)
	 *  http://10.143.133.216:3001/project/300/interface/api/28484
	 */
	moVdcQuotasForModify(args?: any): Promise<any>;
	/**
	 *  容器CCE配额申请
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&wiki_id=361&category_id=all&interface_id=28415&interface_detail_type=PREVIEW&project_setting_tab=%E8%AF%B7%E6%B1%82%E4%BB%A3%E7%A0%81%E6%A8%A1%E6%9D%BF
	 *  http://10.143.133.216:3001/project/300/interface/api/28415
	 */
	postApiV10CceNamespaceQuotaModify(args?: any): Promise<any>;
	/**
	 *  vpc列表
	 *  http://10.143.133.216:3001/project/300/interface/api/28490
	 */
	moVdcVpcList(args?: any): Promise<any>;
	/**
	 *  vdc列表
	 *  http://10.143.133.216:3001/project/300/interface/api/28481
	 */
	moVdcList(args?: any): Promise<any>;
	/**
	 *  集群下拉
	 *  http://10.143.133.216:3001/project/300/interface/api/28481
	 */
	getK8sOptions(args?: any): Promise<any>;
	/**
	 *  查询集群VPC下未绑定的子网
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=28910
	 *  http://10.143.133.216:3001/project/300/interface/api/28910
	 */
	postApiV10CceUnbindSubnet(args?: any): Promise<any>;
	/**
	 *  vdc下的区域列表（vdcId必填）
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&interface_id=28487
	 *  http://10.143.133.216:3001/project/300/interface/api/28487
	 */
	postMoVdcRegionList(args?: any): Promise<any>;
	/**
	 *  查询业务系统
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&interface_type=interface&interface_id=28976
	 *  http://10.143.133.216:3001/project/300/interface/api/28976
	 */
	getAxCmdbBusiness(args?: any): Promise<any>;
	/**
	 *  判断当前用户是否能处理该流程
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&project_setting_tab=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE&interface_id=29367&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/29367
	 */
	getAxUmCasProcessProcessIdCanHandle(args?: any): Promise<any>;
	/**
	 *  查询命名空间
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&project_setting_tab=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE&interface_id=29367&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/29367
	 */
	getNameSpaceData(args?: any): Promise<any>;
	/**
	 *  查询资源类型数据
	 *  http://10.143.133.216:3001/wiki/#/project?project_id=300&group_id=432&project_tab=%E6%8E%A5%E5%8F%A3&category_id=all&interface_type=interface&project_setting_tab=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE&interface_id=29367&interface_detail_type=PREVIEW
	 *  http://10.143.133.216:3001/project/300/interface/api/29367
	 */
	getResourceTableData(args?: any): Promise<any>;
};
