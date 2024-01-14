<script lang="ts">
export default async function () {
	if (!window._api.yapi) {
		(function () {
			_.$ajax.requestInjector = function (req) {
				req.url = Vue._yapi_utils.appendToken(req.url);
				return req;
			};
			_.$ajax.responseInjector = function (res) {
				if (res.errcode !== 0) {
					_.$msgError(res.message);
				}
				return res;
			};

			window._api.yapi = {
				/* log */
				getLogList({ typeid, type, page, limit }) {
					return handleRequest(async () => {
						return _.$ajax.get("/api/log/list", {
							data: { typeid: Number(typeid), type, page, limit }
						});
					});
				},
				postLogListByUpdate(group_id) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/log/list_by_update", {
							data: { group_id }
						});
					});
				},
				/* project */
				apiInterfaceListMenu(project_id) {
					return handleRequest(async () => {
						return _.$ajax.get("/api/interface/list_menu", {
							data: { project_id }
						});
					});
				},
				getProjectByGroupId(group_id) {
					return handleRequest(async () => {
						return _.$ajax.get("/api/project/list", {
							data: { group_id }
						});
					});
				},
				getProjectById(id) {
					return handleRequest(async () => {
						return _.$ajax.get("/api/project/get", {
							data: { id }
						});
					});
				},
				copyProject(data) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/project/copy", {
							data
						});
					});
				},
				addProject(formData) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/project/add", {
							data: formData
						});
					});
				},
				projectAddFollow(data) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/follow/add", {
							data
						});
					});
				},
				projectDelFollow(projectid) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/follow/del", {
							data: { projectid }
						});
					});
				},
				groupDelMember(data) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/group/del_member", {
							data
						});
					});
				},
				groupDeleteGroup(data) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/group/del", {
							data
						});
					});
				},
				groupAddMember(data) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/group/add_member", {
							data
						});
					});
				},
				groupChangeMemberRole(data) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/group/change_member_role", {
							data
						});
					});
				},
				groupAddGroup(data) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/group/add", {
							data
						});
					});
				},
				groupUpdateGroup(data) {
					return handleRequest(async () => {
						return _.$ajax.post("/api/group/up", {
							data
						});
					});
				},
				groupMine() {
					return handleRequest(async () => {
						return _.$ajax.get("/api/group/mine");
					});
				},
				groupGetMyGroupBy(groupId) {
					let id;
					try {
						id = Number(groupId);
					} catch (error) {
						return;
					}
					return handleRequest(async () => {
						return _.$ajax.get("/api/group/get", {
							data: {
								id
							}
						});
					});
				},
				groupGetMemberListBy(groupId) {
					return handleRequest(async () => {
						return _.$ajax.get("/api/group/get_member_list", {
							data: {
								id: Number(groupId)
							}
						});
					});
				},
				/* user */
				async uploadAvatar(data) {
					return handleRequest(async () => {
						return _.$ajax.post(`/api/user/upload_avatar`, {
							data
						});
					});
				},
				async getUserById(id) {
					return handleRequest(async () => {
						return _.$ajax.get(`/api/user/find`, {
							data: {
								id: Number(id)
							}
						});
					});
				},
				async getUserSearch(data) {
					return handleRequest(async () => {
						return _.$ajax.get(`/api/user/search`, { data });
					});
				},
				/**
				 * 获取用户状态
				 */
				async getUserStatus() {
					return handleRequest(async () => {
						return _.$ajax.get(`/api/user/status`);
					});
				},
				async postUserLogin(data) {
					return handleRequest(async () => {
						return _.$ajax.post(`/api/user/login`, {
							data
						});
					});
				},
				async postUserLogout() {
					return handleRequest(async () => {
						return _.$ajax.post(`/api/user/logout`);
					});
				},
				async postNewVarifyCode(email) {
					return handleRequest(async () => {
						return _.$ajax.post(`/api/user/NewVarifyCode`, {
							data: {
								email
							}
						});
					});
				},
				async postUserReg(data) {
					return handleRequest(async () => {
						return _.$ajax.post(`/api/user/reg`, {
							data
						});
					});
				}
			};

			async function handleRequest(request) {
				let response = { error: true };
				try {
					_.$loading(true);
					response = await request();
					if (response.errcode == 40011) {
						/* 登录过期 */
						_.$msgError("登录过期，请重新登录");
						_.$yapiRouter.push("/login");
					}
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading();
					return response;
				}
			}
		})();
	}

	return window._api.yapi;
}
</script>
