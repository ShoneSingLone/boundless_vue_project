export type t_hdr_y = {
manageOpening(args?:any):Promise<any>
manageGetUser(args?:any):Promise<any>
restHdrYManageServiceStatus(args?:any):Promise<any>
/**
			 *  获取系统管理员信息
			 *  http://10.143.133.216:3001/yapi#/api/project?projectId=352&groupId=449&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceId=35825&interfaceType=interface&project_interface_tab=1/#/api/project?projectId=352&groupId=449&interfaceType=interface&interfaceId=35825&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
			 */
restHdrYManageGetSysAdminUser(args?:any):Promise<any>
};