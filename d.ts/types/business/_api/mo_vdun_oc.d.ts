export type t_mo_vdun_oc = {
register_info_eps(args?:any):Promise<any>
register_info_list(args?:any):Promise<any>
register_info_delete(args?:any):Promise<any>
register_info_get_license(args?:any):Promise<any>
register_info_update(args?:any):Promise<any>
register_info_add(args?:any):Promise<any>
upload_license(args?:any):Promise<any>
download_license(args?:any):Promise<any>
get_license_detail(args?:any):Promise<any>
register_info_detail_by_id(args?:any):Promise<any>
/**
			 *  规格列表-管理侧
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35524&project_interface_tab=1&project_setting_tab=3/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35524&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
adminVdunV10FlavorList(args?:any):Promise<any>
/**
			 *  规格详情-管理侧
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35525&project_interface_tab=1&project_setting_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35525&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
adminVdunV10FlavorDetailId(args?:any):Promise<any>
/**
			 *  规格添加-管理侧
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35527&project_interface_tab=1&project_setting_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35527&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
adminVdunV10FlavorAdd(args?:any):Promise<any>
/**
			 *  规格修改-管理侧
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35523&project_interface_tab=1&project_setting_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35523&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
adminVdunV10FlavorUpdateId(args?:any):Promise<any>
/**
			 *  规格删除-管理侧
			 *  https://yapi.ghca.dev/#/api/project?projectId=351&groupId=432&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=35526&project_interface_tab=1&project_setting_tab=1/#/api/project?projectId=351&groupId=432&interfaceType=interface&interfaceId=35526&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
adminVdunV10FlavorDeleteId(args?:any):Promise<any>
};