export type t_yapi = {
system_dicts(args?:any):Promise<any>
i18nTranslate(args?:any):Promise<any>
i18nUpsertOne(args?:any):Promise<any>
i18nGetList(args?:any):Promise<any>
wikiResetMenuOrder(args?:any):Promise<any>
wiki_upsert_one(args?:any):Promise<any>
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
resourceLs(args?:any):Promise<any>
resourceCloudDiskCheckChunks(args?:any):Promise<any>
resourceCloudDiskRename(args?:any):Promise<any>
resourceCloudDiskDir(args?:any):Promise<any>
resourceCloudDiskMoveDir(args?:any):Promise<any>
resourceCloudDiskGetDirs(args?:any):Promise<any>
resourceCloudDiskFileList(args?:any):Promise<any>
audioDetail(args?:any):Promise<any>
resourceCloudDiskShardUpload(args?:any):Promise<any>
apiInterfaceListMenu(args?:any):Promise<any>
interface_get_by_id(args?:any):Promise<any>
interface_del_by_ids(args?:any):Promise<any>
interface_up(args?:any):Promise<any>
interface_upsert(args?:any):Promise<any>
interface_add(args?:any):Promise<any>
interface_add_cat(args?:any):Promise<any>
interfaceUpCat(args?:any):Promise<any>
interface_usecase_upsert(args?:any):Promise<any>
interface_copy_to_project(args?:any):Promise<any>
interface_usecase_get_all(args?:any):Promise<any>
/* log */
getLogList(args?:any):Promise<any>
log_update(args?:any):Promise<any>
/* project */
project_page(args?:any):Promise<any>
getProjectByGroupId(args?:any):Promise<any>
getProjectById(args?:any):Promise<any>
copyProject(args?:any):Promise<any>
project_update(args?:any):Promise<any>
project_add(args?:any):Promise<any>
project_del(args?:any):Promise<any>
project_add_member(args?:any):Promise<any>
project_del_member(args?:any):Promise<any>
project_change_member_role(args?:any):Promise<any>
projectAddFollow(args?:any):Promise<any>
projectDelFollow(args?:any):Promise<any>
group_del_member(args?:any):Promise<any>
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
/**
				 *  根据id删除一个用户
				 *  https://yapi.ghca.dev/#/api/project?projectId=354&groupId=448&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=35661/#/api/project?projectId=354&groupId=448&interfaceType=interface&interfaceId=35661&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
userDel(args?:any):Promise<any>
userSearch(args?:any):Promise<any>
/**
				 *  修改用户密码
				 *  https://yapi.ghca.dev/#/api/project?projectId=354&groupId=448&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37400/#/api/project?projectId=354&groupId=448&interfaceType=interface&interfaceId=37400&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
userChangePassword(args?:any):Promise<any>
/**
				 * 获取用户状态
				 */
userStatus(args?:any):Promise<any>
userLogin(args?:any):Promise<any>
userLogout(args?:any):Promise<any>
postNewVarifyCode(args?:any):Promise<any>
userReg(args?:any):Promise<any>
/**
				 *  用户角色,只有管理员有权限修改
				 *  https://yapi.ghca.dev/#/api/project?projectId=354&groupId=448&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37401/#/api/project?projectId=354&groupId=448&interfaceType=interface&interfaceId=37401&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
userUpdate(args?:any):Promise<any>
};