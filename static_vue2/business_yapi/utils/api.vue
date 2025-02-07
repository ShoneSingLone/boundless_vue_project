<script lang="ts">
export default async function () {
	if (!window._api.yapi) {
		(function () {
			_.$ajax.requestInjector = function (req) {
				req.url = Vue._common_utils.appendToken(req.url);
				return req;
			};
			_.$ajax.responseInjector = function (response) {
				if (response?.errcode == 40011) {
					/* 登录过期 */
					_.$msgError("登录过期，请重新登录");
					_.$yapiRouter.push("/login");
				} else if (response?.errcode === 10001) {
					_.$msg.error("登录已失效，请重新登录");
					_.$router.push("/login");
				}

				if (response?.errcode !== 0) {
				}

				return response;
			};

			window._api.yapi = {
				async system_dicts(typeObject = {}) {
					const typeArray = Object.keys(typeObject);
					const _this = window._api.yapi;
					_this.typesCache = _this.typesCache || {};
					const needRequest = [];
					_.each(typeArray, type => {
						if (!_this.typesCache[type]) {
							needRequest.push(type);
						}
					});
					const { data } = await _.$ajax.post("/api/system/dicts", {
						data: { types: needRequest }
					});
					_this.typesCache = _.merge(_this.typesCache, data);
					return _this.typesCache;
				},

				i18nTranslate(data) {
					return _.$ajax.post("/api/i18n/translate", {
						data
					});
				},
				i18nUpsertOne(data) {
					return _.$ajax.post("/api/i18n/upsert_one", {
						data
					});
				},
				i18nGetList(data) {
					return _.$ajax.post("/api/i18n/get_list", {
						data
					});
				},
				wikiResetMenuOrder(data) {
					return _.$ajax.post("/api/wiki/reset_menu_order", {
						data
					});
				},
				wiki_upsert_one(data) {
					return _.$ajax.post("/api/wiki/upsertOne", {
						data
					});
				},
				saveImgByBase64(data) {
					return _.$ajax.post("/api/resource/base64img", {
						data
					});
				},
				wikiDetail(data) {
					return _.$ajax.get("/api/wiki/detail", {
						data
					});
				},
				/**
				 *  wiki左侧的菜单
				 *  http://192.168.0.107:3002/static/business_yapi/yapi.html#/api/project?projectId=319&groupId=431&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=591&project_interface_tab=1&project_setting_tab=3/#/api/project?projectId=319&groupId=431&interfaceType=interface&interfaceId=591&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				wikiMenu(data) {
					return _.$ajax.get("/api/wiki/menu", {
						data
					});
				},
				/**
				 *  文档 list
				 *  http://192.168.0.107:3002/static/business_yapi/yapi.html#/api/project?projectId=319&groupId=431&projectTabName=%E6%8E%A5%E5%8F%A3&interfaceType=interface&interfaceId=589&project_interface_tab=1&project_setting_tab=3/#/api/project?projectId=319&groupId=431&interfaceType=interface&interfaceId=589&project_interface_tab=1&project_setting_tab=3&projectTabName=接口
				 */
				wikiList(data) {
					return _.$ajax.post("/api/wiki/list", {
						data
					});
				},
				getSwaggerDataByUrl(data) {
					return _.$ajax.post("/api/project/swagger_url", {
						data
					});
				},
				resourceLs(data) {
					return _.$ajax.post("/api/resource/ls", {
						data
					});
				},
				resourceCloudDiskCheckChunks(data) {
					return _.$ajax.post("/api/resource/cloud_disk_check_chunks", {
						data
					});
				},
				resourceCloudDiskRename(data) {
					return _.$ajax.put("/api/resource/cloud_disk_rename", {
						data
					});
				},
				resourceCloudDiskDir(data) {
					return _.$ajax.post("/api/resource/cloud_disk_dir", {
						data
					});
				},
				resourceCloudDiskMoveDir(data) {
					return _.$ajax.post("/api/resource/cloud_disk_move_dir", {
						data
					});
				},
				resourceCloudDiskGetDirs(data) {
					return _.$ajax.get("/api/resource/cloud_disk_get_dirs", {
						data
					});
				},
				resourceCloudDiskFileList(data) {
					return _.$ajax.get("/api/resource/cloud_disk_file_list", {
						data
					});
				},
				audioDetail(data) {
					return _.$ajax.get("/api/audio/detail", {
						data
					});
				},
				resourceCloudDiskShardUpload({ formData, callback }) {
					return _.$ajax.upload({
						url: "/api/resource/cloud_disk_shard_upload",
						formData,
						callback
					});
				},
				apiInterfaceListMenu(project_id) {
					return _.$ajax.get("/api/interface/list_menu", {
						data: { project_id }
					});
				},
				interface_get_by_id(data) {
					return _.$ajax.get("/api/interface/get", {
						data
					});
				},
				interface_del_by_ids(ids) {
					return _.$ajax.post("/api/interface/del", {
						data: {
							ids
						}
					});
				},
				interface_up(data) {
					return _.$ajax.post("/api/interface/up", {
						data
					});
				},
				interface_upsert(data) {
					return _.$ajax.post("/api/interface/upsert", {
						data
					});
				},
				interface_add(data) {
					return _.$ajax.post("/api/interface/add", {
						data
					});
				},
				interface_add_cat(data) {
					return _.$ajax.post("/api/interface/add_cat", {
						data
					});
				},
				interfaceUpCat(data) {
					return _.$ajax.post("/api/interface/up_cat", {
						data
					});
				},
				interface_usecase_upsert(data) {
					return _.$ajax.post("/api/usecase/upsert", {
						data
					});
				},
				interface_copy_to_project(data) {
					return _.$ajax.post("/api/interface/copy_to_project", {
						data
					});
				},
				interface_usecase_get_all(interfaceId) {
					return _.$ajax.get("/api/usecase/get_all", {
						data: {
							id: interfaceId
						}
					});
				},
				/* log */
				getLogList({ typeid, type, page, limit }) {
					return _.$ajax.get("/api/log/list", {
						data: { typeid: Number(typeid), type, page, limit }
					});
				},
				log_update(data) {
					return _.$ajax.post("/api/log/list_by_update", {
						data
					});
				},
				/* project */
				project_page({ group_id, page, size, name }) {
					return _.$ajax.get("/api/project/page", {
						data: { group_id, page, size, name: name || "" }
					});
				},
				getProjectByGroupId(group_id) {
					return _.$ajax.get("/api/project/list", {
						data: { group_id }
					});
				},
				getProjectById(id) {
					return _.$ajax.get("/api/project/get", {
						data: { id }
					});
				},
				copyProject(data) {
					return _.$ajax.post("/api/project/copy", {
						data
					});
				},
				project_update(data) {
					return _.$ajax.post("/api/project/up", {
						data
					});
				},
				project_add(formData) {
					return _.$ajax.post("/api/project/add", {
						data: formData
					});
				},
				project_del(data) {
					return _.$ajax.post("/api/project/del", {
						data
					});
				},
				project_add_member(data) {
					return _.$ajax.post("/api/project/add_member", {
						data
					});
				},
				project_del_member(data) {
					return _.$ajax.post("/api/project/del_member", {
						data
					});
				},
				project_change_member_role(data) {
					return _.$ajax.post("/api/project/change_member_role", {
						data
					});
				},
				projectAddFollow(data) {
					return _.$ajax.post("/api/follow/add", {
						data
					});
				},
				projectDelFollow(projectid) {
					return _.$ajax.post("/api/follow/del", {
						data: { projectid }
					});
				},
				group_del_member(data) {
					return _.$ajax.post("/api/group/del_member", {
						data
					});
				},
				groupDeleteGroup(data) {
					return _.$ajax.post("/api/group/del", {
						data
					});
				},
				groupAddMember(data) {
					return _.$ajax.post("/api/group/add_member", {
						data
					});
				},
				groupChangeMemberRole(data) {
					return _.$ajax.post("/api/group/change_member_role", {
						data
					});
				},
				groupAddGroup(data) {
					return _.$ajax.post("/api/group/add", {
						data
					});
				},
				groupUpdateGroup(data) {
					return _.$ajax.post("/api/group/up", {
						data
					});
				},
				groupMine() {
					return _.$ajax.get("/api/group/mine");
				},
				groupGetMyGroupBy(groupId) {
					let id;
					try {
						id = Number(groupId);
					} catch (error) {
						return;
					}

					return _.$ajax.get("/api/group/get", {
						data: {
							id
						}
					});
				},
				groupGetMemberListBy(groupId) {
					return _.$ajax.get("/api/group/get_member_list", {
						data: {
							id: Number(groupId)
						}
					});
				},
				/* user */
				async uploadAvatar(data) {
					return _.$ajax.post(`/api/user/upload_avatar`, {
						data
					});
				},
				async userById(id) {
					return _.$ajax.get(`/api/user/find`, {
						data: {
							id: Number(id)
						}
					});
				},
				/**
				 *  根据id删除一个用户
				 *  https://yapi.ghca.dev/#/api/project?projectId=354&groupId=448&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&interfaceType=interface&interfaceId=35661/#/api/project?projectId=354&groupId=448&interfaceType=interface&interfaceId=35661&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
				async userDel(data) {
					return _.$ajax.post(`/user/del`, { data });
				},
				async userSearch(data) {
					return _.$ajax.get(`/api/user/search`, { data });
				},
				/**
				 *  修改用户密码
				 *  https://yapi.ghca.dev/#/api/project?projectId=354&groupId=448&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37400/#/api/project?projectId=354&groupId=448&interfaceType=interface&interfaceId=37400&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
				async userChangePassword(data) {
					return _.$ajax.post(`/api/user/change_password`, { data });
				},
				/**
				 * 获取用户状态
				 */
				async userStatus() {
					return _.$ajax.get(`/api/user/status`);
				},
				async userLogin(data) {
					return _.$ajax.post(`/api/user/login`, {
						data
					});
				},
				async userLogout() {
					return _.$ajax.post(`/api/user/logout`);
				},
				async postNewVarifyCode(email) {
					return _.$ajax.post(`/api/user/new_varify_code`, {
						data: {
							email
						}
					});
				},
				async userReg(data) {
					return _.$ajax.post(`/api/user/reg`, {
						data
					});
				},
				/**
				 *  用户角色,只有管理员有权限修改
				 *  https://yapi.ghca.dev/#/api/project?projectId=354&groupId=448&projectTabName=%E6%8E%A5%E5%8F%A3&project_interface_tab=preview&project_setting_tab=7&interfaceType=interface&interfaceId=37401/#/api/project?projectId=354&groupId=448&interfaceType=interface&interfaceId=37401&project_interface_tab=preview&project_setting_tab=3&projectTabName=接口
				 */
				async userUpdate(data) {
					return _.$ajax.post(`/api/user/update`, { data });
				}
			};
		})();
	}

	return window._api.yapi;
}
</script>
