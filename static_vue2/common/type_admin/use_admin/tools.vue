<script lang="ts">
export default async function ({ rootApp }) {
	/* @ts-ignore */
	Vue._adminTools = {
		api_user_by_userId(userId) {
			return _.$ajax.get(`/system/user/${this.parseStrEmpty(userId)}`);
		},
		api_user_list(data) {
			return _.$ajax.get("/system/user/list", {
				data
			});
		},
		api_user_new(data) {
			return _.$ajax.post(`/system/user`, { data });
		},

		api_user_delete(userIds) {
			return _.$ajax.delete(`/system/user/${userIds}`);
		},
		api_user_modify(data) {
			return _.$ajax.put(`/system/user`, { data });
		},
		api_user_reset_password({ userId, password }) {
			return _.$ajax.put(`/system/user/resetPwd`, { data: { userId, password } });
		},
		api_user_change_status(data) {
			return _.$ajax.put(`/system/user/changeStatus`, { data });
		},
		api_user_auth_list(userId) {
			return _.$ajax.get(`/system/user/authRole/${userId}`);
		},
		api_user_auth_update({ userId, roleIds }) {
			return _.$ajax.put(`/system/user/authRole`, {
				data: {
					userId,
					roleIds
				}
			});
		},
		api_user_dept_tree(data) {
			return _.$ajax.get("/system/user/deptTree", {
				data
			});
		},
		/* 查询菜单下拉树结构 */
		api_menu_tree() {
			return _.$ajax.get("/system/menu/treeselect");
		},
		/* 根据角色ID查询菜单下拉树结构 */
		api_menu_tree_by_roleId(roleId) {
			return _.$ajax.get(`/system/menu/roleMenuTreeselect/${roleId}`);
		},
		/* **************** */
		api_role_by_roleId(roleId) {
			return _.$ajax.get(`/system/role/${this.parseStrEmpty(roleId)}`);
		},
		api_role_new(data) {
			return _.$ajax.post("/system/role", {
				data
			});
		},
		api_role_delete(roleIds) {
			return _.$ajax.delete(`/system/role/${roleIds}`);
		},
		/* 查询角色未授权用户列表 */
		api_role_auth_user_unallocated_list(data) {
			return _.$ajax.get(`/system/role/authUser/unallocatedList`, { data });
		},
		/* 授权给选择的用户 */
		api_role_auth_user_select_all(data) {
			return _.$ajax.put(`/system/role/authUser/selectAll`, { data });
		},
		/* 查询角色已授权用户列表 */
		api_role_auth_user_allocated_list(data) {
			return _.$ajax.get(`/system/role/authUser/allocatedList`, { data });
		},
		api_role_auth_user_cancel({ roleId, userId }) {
			return _.$ajax.put(`/system/role/authUser/cancel`, { data: { roleId, userId } });
		},
		api_role_auth_user_cancel_all(data) {
			return _.$ajax.put(`/system/role/authUser/cancelAll`, { data });
		},
		api_role_modify(data) {
			return _.$ajax.put(`/system/role`, { data });
		},

		api_role_list(data) {
			return _.$ajax.get("/system/role/list", {
				data
			});
		},
		api_role_change_status(data) {
			return _.$ajax.put(`/system/role/changeStatus`, { data });
		},
		/* menu */
		api_menu_by_menuId(menuId) {
			return _.$ajax.get(`/system/menu/${this.parseStrEmpty(menuId)}`);
		},
		api_menu_list(data) {
			return _.$ajax.get("/system/menu/list", {
				data
			});
		},
		api_menu_new(data) {
			return _.$ajax.post(`/system/menu`, { data });
		},

		api_menu_delete(menuIds) {
			return _.$ajax.delete(`/system/menu/${menuIds}`);
		},
		api_menu_modify(data) {
			return _.$ajax.put(`/system/menu`, { data });
		},
		/* menu */
		/* dept */
		api_dept_by_deptId(deptId) {
			return _.$ajax.get(`/system/dept/${this.parseStrEmpty(deptId)}`);
		},
		api_dept_list(data) {
			return _.$ajax.get("/system/dept/list", {
				data
			});
		},
		api_dept_new(data) {
			return _.$ajax.post(`/system/dept`, { data });
		},

		api_dept_delete(deptIds) {
			return _.$ajax.delete(`/system/dept/${deptIds}`);
		},
		api_dept_modify(data) {
			return _.$ajax.put(`/system/dept`, { data });
		},
		/* dept */
		/* post */
		api_post_by_postId(postId) {
			return _.$ajax.get(`/system/post/${this.parseStrEmpty(postId)}`);
		},
		api_post_list(data) {
			return _.$ajax.get("/system/post/list", {
				data
			});
		},
		api_post_new(data) {
			return _.$ajax.post(`/system/post`, { data });
		},

		api_post_delete(postIds) {
			return _.$ajax.delete(`/system/post/${postIds}`);
		},
		api_post_modify(data) {
			return _.$ajax.put(`/system/post`, { data });
		},
		/* post */
		/* dict_type */
		api_dict_type_by_dictId(dictId) {
			return _.$ajax.get(`/system/dict/type/${this.parseStrEmpty(dictId)}`);
		},
		api_dict_type_list(data) {
			return _.$ajax.get("/system/dict/type/list", {
				data
			});
		},
		api_dict_type_new(data) {
			return _.$ajax.post(`/system/dict/type`, { data });
		},

		api_dict_type_delete(dictIds) {
			return _.$ajax.delete(`/system/dict/type/${dictIds}`);
		},
		api_dict_type_modify(data) {
			return _.$ajax.put(`/system/dict/type`, { data });
		},
		api_dict_type_refresh_cache() {
			return _.$ajax.delete(`/system/dict/type/refreshCache`);
		},
		/* dict_type */
		/* dict_data */
		api_dict_data_by_dictCode(dictCode) {
			return _.$ajax.get(`/system/dict/data/${this.parseStrEmpty(dictCode)}`);
		},
		api_dict_data_list(data) {
			return _.$ajax.get("/system/dict/data/list", {
				data
			});
		},
		api_dict_data_new(data) {
			return _.$ajax.post(`/system/dict/data`, { data });
		},

		api_dict_data_delete(dictIds) {
			return _.$ajax.delete(`/system/dict/data/${dictIds}`);
		},
		api_dict_data_modify(data) {
			return _.$ajax.put(`/system/dict/data`, { data });
		},
		/* dict_data */
		/* config */
		api_config_by_configId(configId) {
			return _.$ajax.get(`/system/config/${this.parseStrEmpty(configId)}`);
		},
		api_config_list(data) {
			return _.$ajax.get("/system/config/list", {
				data
			});
		},
		api_config_new(data) {
			return _.$ajax.post(`/system/config`, { data });
		},

		api_config_delete(configIds) {
			return _.$ajax.delete(`/system/config/${configIds}`);
		},
		api_config_modify(data) {
			return _.$ajax.put(`/system/config`, { data });
		},
		api_config_refresh_cache() {
			return _.$ajax.delete(`/system/config/refreshCache`);
		},
		/* 根据参数键名查询参数值 */
		api_config_key(configKey) {
			return _.$ajax.get(`/system/config/configKey/${configKey}`);
		},
		/* config */
		/* job */
		api_job_by_jobId(jobId) {
			return _.$ajax.get(`/monitor/job/${this.parseStrEmpty(jobId)}`);
		},
		api_job_list(data) {
			return _.$ajax.get("/monitor/job/list", {
				data
			});
		},
		api_job_new(data) {
			return _.$ajax.post(`/monitor/job`, { data });
		},

		api_job_delete(jobIds) {
			return _.$ajax.delete(`/monitor/job/${jobIds}`);
		},
		api_job_modify(data) {
			return _.$ajax.put(`/monitor/job`, { data });
		},
		api_job_refresh_cache() {
			return _.$ajax.delete(`/monitor/job/refreshCache`);
		},
		api_job_change_status(data) {
			return _.$ajax.put(`/monitor/job/changeStatus`, { data });
		},
		api_job_run({ jobId, jobGroup }) {
			return _.$ajax.put(`/monitor/job/run`, { data: { jobId, jobGroup } });
		},
		api_job_log_list(data) {
			return _.$ajax.get(`/monitor/jobLog/list`, { data });
		},
		api_job_log_delete(logIds) {
			return _.$ajax.delete(`/monitor/jobLog/${logIds}`);
		},
		api_job_log_clean() {
			return _.$ajax.delete(`/monitor/jobLog/clean`);
		},
		/* 根据参数键名查询参数值 */
		api_job_key(jobKey) {
			return _.$ajax.get(`/monitor/job/jobKey/${jobKey}`);
		},
		/* job */
		/* notice */
		api_notice_by_noticeId(noticeId) {
			return _.$ajax.get(`/system/notice/${this.parseStrEmpty(noticeId)}`);
		},
		api_notice_list(data) {
			return _.$ajax.get("/system/notice/list", {
				data
			});
		},
		api_notice_new(data) {
			return _.$ajax.post(`/system/notice`, { data });
		},

		api_notice_delete(noticeIds) {
			return _.$ajax.delete(`/system/notice/${noticeIds}`);
		},
		api_notice_modify(data) {
			return _.$ajax.put(`/system/notice`, { data });
		},
		api_notice_refresh_cache() {
			return _.$ajax.delete(`/system/notice/refreshCache`);
		},
		/* operlog */
		api_operlog_list(data) {
			return _.$ajax.get("/monitor/operlog/list", {
				data
			});
		},
		api_operlog_delete(operlogIds) {
			return _.$ajax.delete(`/monitor/operlog/${operlogIds}`);
		},
		api_operlog_clean() {
			return _.$ajax.delete(`/monitor/operlog/clean`);
		},
		/* operlog */
		/* logininfor */
		api_logininfor_list(data) {
			return _.$ajax.get("/monitor/logininfor/list", {
				data
			});
		},
		api_logininfor_unlock(userName) {
			return _.$ajax.get(`/monitor/logininfor/unlock/${userName}`);
		},
		api_logininfor_delete(logininforIds) {
			return _.$ajax.delete(`/monitor/logininfor/${logininforIds}`);
		},
		api_logininfor_clean() {
			return _.$ajax.delete(`/monitor/logininfor/clean`);
		},
		/* operlog */
		/* 根据参数键名查询参数值 */
		api_notice_key(noticeKey) {
			return _.$ajax.get(`/system/notice/noticeKey/${noticeKey}`);
		},
		/* notice */
		/* ************************api************************************** */
		search_form_configs_text(options) {
			return _.merge(
				{
					label: "字符",
					resetValue() {
						this.value = "";
					},
					value: "",
					clearable: true,
					placeholder: i18n("input_char")
				},
				options
			);
		},
		search_form_configs_select(options) {
			return _.merge(
				{
					label: "状态",
					resetValue() {
						this.value = "";
					},
					value: "",
					clearable: true,
					itemType: "xItemSelect",
					options: [],
					placeholder: i18n("status_info")
				},
				options
			);
		},
		search_form_date_range(options) {
			return _.merge(
				{
					label: "时间范围",
					resetValue() {
						this.value = "";
					},
					value: [],
					placeholder: i18n("time_period"),
					itemType: "AdminXItemDaterange"
				},
				options
			);
		},
		async newDicts(dictTypeObjct) {
			const dictArray = await Promise.all(
				_.map(dictTypeObjct, async (value, dictType) => {
					const { data } = await _.$ajax.get(`/system/dict/data/type/${dictType}`);
					return {
						name: dictType,
						options: _.map(data, item => {
							return {
								...item,
								label: item.dictLabel,
								value: item.dictValue
							};
						})
					};
				})
			);
			return _.reduce(
				dictArray,
				(ditctObj, { name, options }) => {
					ditctObj[name] = options;
					return ditctObj;
				},
				{}
			);
		},
		/**
		 *  字符串格式化(%s) *
		 * @param {any} str
		 * @returns
		 */
		sprintf(str) {
			var args = arguments,
				flag = true,
				i = 1;
			str = str.replace(/%s/g, function () {
				var arg = args[i++];
				if (typeof arg === "undefined") {
					flag = false;
					return "";
				}
				return arg;
			});
			return flag ? str : "";
		},

		/**
		 *  转换字符串，undefined,null等转化"" *
		 * @param {any} str
		 * @returns
		 */
		parseStrEmpty(str) {
			if (!str || str == "undefined" || str == "null") {
				return "";
			}
			return str;
		},
		/**
		 * 数据合并 *
		 * @param {any} source
		 * @param {any} target
		 * @returns
		 */
		mergeRecursive(source, target) {
			for (var p in target) {
				try {
					if (target[p].constructor == Object) {
						source[p] = mergeRecursive(source[p], target[p]);
					} else {
						source[p] = target[p];
					}
				} catch (e) {
					source[p] = target[p];
				}
			}
			return source;
		},
		/**
		 * 参数处理
		 * @param {*} params  参数
		 */
		tansParams(params) {
			let result = "";
			for (const propName of Object.keys(params)) {
				const value = params[propName];
				var part = encodeURIComponent(propName) + "=";
				if (value !== null && value !== "" && typeof value !== "undefined") {
					if (typeof value === "object") {
						for (const key of Object.keys(value)) {
							if (
								value[key] !== null &&
								value[key] !== "" &&
								typeof value[key] !== "undefined"
							) {
								let params = propName + "[" + key + "]";
								var subPart = encodeURIComponent(params) + "=";
								result += subPart + encodeURIComponent(value[key]) + "&";
							}
						}
					} else {
						result += part + encodeURIComponent(value) + "&";
					}
				}
			}
			return result;
		},

		/**
		 * 返回项目路径 *
		 * @param {any} p
		 * @returns
		 */
		getNormalPath(p) {
			if (p.length === 0 || !p || p == "undefined") {
				return p;
			}
			let res = p.replace("//", "/");
			if (res[res.length - 1] === "/") {
				return res.slice(0, res.length - 1);
			}
			return res;
		},

		/**
		 * 验证是否为blob格式 *
		 * @param {any} data
		 * @returns
		 */
		blobValidate(data) {
			return data.type !== "application/json";
		},
		// 回显数据字典（字符串数组）
		selectDictLabels(datas, value, separator) {
			if (value === undefined || value.length === 0) {
				return "";
			}
			if (Array.isArray(value)) {
				value = value.join(",");
			}
			var actions = [];
			var currentSeparator = undefined === separator ? "," : separator;
			var temp = value.split(currentSeparator);
			Object.keys(value.split(currentSeparator)).some(val => {
				var match = false;
				Object.keys(datas).some(key => {
					if (datas[key].value == "" + temp[val]) {
						actions.push(datas[key].label + currentSeparator);
						match = true;
					}
				});
				if (!match) {
					actions.push(temp[val] + currentSeparator);
				}
			});
			return actions.join("").substring(0, actions.join("").length - 1);
		},
		// 回显数据字典
		selectDictLabel(datas, value) {
			if (value === undefined) {
				return "";
			}
			var actions = [];
			Object.keys(datas).some(key => {
				if (datas[key].value == "" + value) {
					actions.push(datas[key].label);
					return true;
				}
			});
			if (actions.length === 0) {
				actions.push(value);
			}
			return actions.join("");
		},
		// 添加日期范围
		addDateRange(params, dateRange, propName) {
			let search = params;
			search.params =
				typeof search.params === "object" &&
				search.params !== null &&
				!Array.isArray(search.params)
					? search.params
					: {};
			dateRange = Array.isArray(dateRange) ? dateRange : [];
			if (typeof propName === "undefined") {
				search.params["beginTime"] = dateRange[0];
				search.params["endTime"] = dateRange[1];
			} else {
				search.params["begin" + propName] = dateRange[0];
				search.params["end" + propName] = dateRange[1];
			}
			return search;
		},
		// 表单重置
		resetForm(refName) {
			if (this.$refs[refName]) {
				this.$refs[refName].resetFields();
			}
		},
		/**
		 * 日期格式化
		 * @param time
		 * @param pattern
		 */
		parseTime(time, pattern) {
			if (arguments.length === 0 || !time) {
				return null;
			}
			const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
			let date;
			if (typeof time === "object") {
				date = time;
			} else {
				if (typeof time === "string" && /^[0-9]+$/.test(time)) {
					time = parseInt(time);
				} else if (typeof time === "string") {
					time = time
						.replace(new RegExp(/-/gm), "/")
						.replace("T", " ")
						.replace(new RegExp(/\.[\d]{3}/gm), "");
				}
				if (typeof time === "number" && time.toString().length === 10) {
					time = time * 1000;
				}
				date = new Date(time);
			}
			const formatObj = {
				y: date.getFullYear(),
				m: date.getMonth() + 1,
				d: date.getDate(),
				h: date.getHours(),
				i: date.getMinutes(),
				s: date.getSeconds(),
				a: date.getDay()
			};
			const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
				let value = formatObj[key];
				// Note: getDay() returns 0 on Sunday
				if (key === "a") {
					return ["日", "一", "二", "三", "四", "五", "六"][value];
				}
				if (result.length > 0 && value < 10) {
					value = "0" + value;
				}
				return value || 0;
			});
			return time_str;
		}
	};
}
</script>
