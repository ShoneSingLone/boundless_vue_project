
export type t_adminTools = {
	/** userId
undefined*/
api_user_by_userId: any;
/** data
undefined*/
api_user_list: any;
/** data
undefined*/
api_user_new: any;
/** userIds
undefined*/
api_user_delete: any;
/** data
undefined*/
api_user_modify: any;
/** 
undefined*/
api_user_reset_password: any;
/** data
undefined*/
api_user_change_status: any;
/** userId
undefined*/
api_user_auth_list: any;
/** 
undefined*/
api_user_auth_update: any;
/** data
undefined*/
api_user_dept_tree: any;
/** 
 查询菜单下拉树结构 */
api_menu_tree: any;
/** roleId
 根据角色ID查询菜单下拉树结构 */
api_menu_tree_by_roleId: any;
/** roleId
 **************** */
api_role_by_roleId: any;
/** data
undefined*/
api_role_new: any;
/** roleIds
undefined*/
api_role_delete: any;
/** data
 查询角色未授权用户列表 */
api_role_auth_user_unallocated_list: any;
/** data
 授权给选择的用户 */
api_role_auth_user_select_all: any;
/** data
 查询角色已授权用户列表 */
api_role_auth_user_allocated_list: any;
/** 
undefined*/
api_role_auth_user_cancel: any;
/** data
undefined*/
api_role_auth_user_cancel_all: any;
/** data
undefined*/
api_role_modify: any;
/** data
undefined*/
api_role_list: any;
/** data
undefined*/
api_role_change_status: any;
/** menuId
 menu */
api_menu_by_menuId: any;
/** data
undefined*/
api_menu_list: any;
/** data
undefined*/
api_menu_new: any;
/** menuIds
undefined*/
api_menu_delete: any;
/** data
undefined*/
api_menu_modify: any;
/** deptId
 menu */
api_dept_by_deptId: any;
/** data
undefined*/
api_dept_list: any;
/** data
undefined*/
api_dept_new: any;
/** deptIds
undefined*/
api_dept_delete: any;
/** data
undefined*/
api_dept_modify: any;
/** postId
 dept */
api_post_by_postId: any;
/** data
undefined*/
api_post_list: any;
/** data
undefined*/
api_post_new: any;
/** postIds
undefined*/
api_post_delete: any;
/** data
undefined*/
api_post_modify: any;
/** dictId
 post */
api_dict_type_by_dictId: any;
/** data
undefined*/
api_dict_type_list: any;
/** data
undefined*/
api_dict_type_new: any;
/** dictIds
undefined*/
api_dict_type_delete: any;
/** data
undefined*/
api_dict_type_modify: any;
/** 
undefined*/
api_dict_type_refresh_cache: any;
/** dictCode
 dict_type */
api_dict_data_by_dictCode: any;
/** data
undefined*/
api_dict_data_list: any;
/** data
undefined*/
api_dict_data_new: any;
/** dictIds
undefined*/
api_dict_data_delete: any;
/** data
undefined*/
api_dict_data_modify: any;
/** configId
 dict_data */
api_config_by_configId: any;
/** data
undefined*/
api_config_list: any;
/** data
undefined*/
api_config_new: any;
/** configIds
undefined*/
api_config_delete: any;
/** data
undefined*/
api_config_modify: any;
/** 
undefined*/
api_config_refresh_cache: any;
/** configKey
 根据参数键名查询参数值 */
api_config_key: any;
/** noticeId
 config */
api_notice_by_noticeId: any;
/** data
undefined*/
api_notice_list: any;
/** data
undefined*/
api_notice_new: any;
/** noticeIds
undefined*/
api_notice_delete: any;
/** data
undefined*/
api_notice_modify: any;
/** 
undefined*/
api_notice_refresh_cache: any;
/** data
 operlog */
api_operlog_list: any;
/** operlogIds
undefined*/
api_operlog_delete: any;
/** 
undefined*/
api_operlog_clean: any;
/** data
 operlog */
api_logininfor_list: any;
/** userName
undefined*/
api_logininfor_unlock: any;
/** logininforIds
undefined*/
api_logininfor_delete: any;
/** 
undefined*/
api_logininfor_clean: any;
/** noticeKey
 operlog */
api_notice_key: any;
/** options
 notice */
search_form_configs_text: any;
/** options
undefined*/
search_form_configs_select: any;
/** options
undefined*/
search_form_date_range: any;
/** dictTypeObjct
undefined*/
newDicts: any;
/** str
*
		 *  字符串格式化(%s) *
		 * @param {any} str
		 * @returns
		 */
sprintf: any;
/** str
*
		 *  转换字符串，undefined,null等转化"" *
		 * @param {any} str
		 * @returns
		 */
parseStrEmpty: any;
/** source,target
*
		 * 数据合并 *
		 * @param {any} source
		 * @param {any} target
		 * @returns
		 */
mergeRecursive: any;
/** params
*
		 * 参数处理
		 * @param {*} params  参数
		 */
tansParams: any;
/** p
*
		 * 返回项目路径 *
		 * @param {any} p
		 * @returns
		 */
getNormalPath: any;
/** data
*
		 * 验证是否为blob格式 *
		 * @param {any} data
		 * @returns
		 */
blobValidate: any;
/** datas,value,separator
 回显数据字典（字符串数组）*/
selectDictLabels: any;
/** datas,value
 回显数据字典*/
selectDictLabel: any;
/** params,dateRange,propName
 添加日期范围*/
addDateRange: any;
/** refName
 表单重置*/
resetForm: any;
/** time,pattern
*
		 * 日期格式化
		 * @param time
		 * @param pattern
		 */
parseTime: any
};