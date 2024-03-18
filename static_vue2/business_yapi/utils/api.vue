<script lang="ts">
export default async function () {
	if (!window._api.yapi) {
		(function () {
			_.$ajax.requestInjector = function (req) {
				req.url = Vue._yapi_utils.appendToken(req.url);
				return req;
			};
			_.$ajax.responseInjector = function (response) {
				if (response.errcode == 40011) {
					/* 登录过期 */
					_.$msgError("登录过期，请重新登录");
					_.$yapiRouter.push("/login");
				} else if (response.errcode === 10001) {
					_.$message.error("登录已失效，请重新登录");
					_.$router.push("/login");
				}

				if (response.errcode !== 0) {
				}

				return response;
			};

			window._api.yapi = {
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
				wikiUpsertOne(data) {
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
					return _.$ajax.get("/api/wiki/list", {
						data
					});
				},
				getSwaggerDataByUrl(data) {
					return _.$ajax.post("/api/project/swagger_url", {
						data
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
				interfaceAddCat(data) {
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
				groupDelMember(data) {
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
				async userSearch(data) {
					return _.$ajax.get(`/api/user/search`, { data });
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
					return _.$ajax.post(`/api/user/NewVarifyCode`, {
						data: {
							email
						}
					});
				},
				async userReg(data) {
					return _.$ajax.post(`/api/user/reg`, {
						data
					});
				}
			};
		})();
	}

	return window._api.yapi;
}
</script>
