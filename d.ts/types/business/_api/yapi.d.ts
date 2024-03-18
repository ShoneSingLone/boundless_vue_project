export type t_yapi = {
i18nTranslate(args?:any):Promise<any>
i18nUpsertOne(args?:any):Promise<any>
i18nGetList(args?:any):Promise<any>
wikiUpsertOne(args?:any):Promise<any>
saveImgByBase64(args?:any):Promise<any>
wikiDetail(args?:any):Promise<any>
/**
				 *  wiki左侧的菜单
				 *  http://192.168.0.107:3002/static/business_yapi/yapi.html#/api/project?projectId=319&groupId=431&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=591&project_interface_tab=1&project_setting_tab=3/#/api/project?projectId=319&groupId=431&interfaceType=interface&interfaceId=591&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
wikiMenu(args?:any):Promise<any>
/**
				 *  文档 list
				 *  http://192.168.0.107:3002/static/business_yapi/yapi.html#/api/project?projectId=319&groupId=431&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=589&project_interface_tab=1&project_setting_tab=3/#/api/project?projectId=319&groupId=431&interfaceType=interface&interfaceId=589&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
wikiList(args?:any):Promise<any>
getSwaggerDataByUrl(args?:any):Promise<any>
apiInterfaceListMenu(args?:any):Promise<any>
interface_get_by_id(args?:any):Promise<any>
interface_up(args?:any):Promise<any>
interface_upsert(args?:any):Promise<any>
interface_add(args?:any):Promise<any>
interfaceAddCat(args?:any):Promise<any>
interfaceUpCat(args?:any):Promise<any>
interface_usecase_upsert(args?:any):Promise<any>
interface_usecase_get_all(args?:any):Promise<any>
/* log */
getLogList(args?:any):Promise<any>
log_update(args?:any):Promise<any>
/* project */
getProjectByGroupId(args?:any):Promise<any>
getProjectById(args?:any):Promise<any>
copyProject(args?:any):Promise<any>
project_update(args?:any):Promise<any>
project_add(args?:any):Promise<any>
project_del(args?:any):Promise<any>
projectAddFollow(args?:any):Promise<any>
projectDelFollow(args?:any):Promise<any>
groupDelMember(args?:any):Promise<any>
groupDeleteGroup(args?:any):Promise<any>
groupAddMember(args?:any):Promise<any>
groupChangeMemberRole(args?:any):Promise<any>
groupAddGroup(args?:any):Promise<any>
groupUpdateGroup(args?:any):Promise<any>
groupMine(args?:any):Promise<any>
groupGetMyGroupBy(args?:any):Promise<any>
groupGetMemberListBy(args?:any):Promise<any>
/* user */
uploadAvatar(args?:any):Promise<any>
userById(args?:any):Promise<any>
userSearch(args?:any):Promise<any>
/**
				 * 获取用户状态
				 */
userStatus(args?:any):Promise<any>
userLogin(args?:any):Promise<any>
userLogout(args?:any):Promise<any>
postNewVarifyCode(args?:any):Promise<any>
userReg(args?:any):Promise<any>
};