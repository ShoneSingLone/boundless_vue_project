<script>
export default async function () {
	if (!Vue._yapi_api) {
		(function () {
			_.$ajax.requestInjector = function (options) {
				const _url = new URL(String(options.url).replace("#", ""), location.origin);
				_.each(_.$lStorage.x_token, (v, k) => {
					_url.searchParams.set(k, v);
				});
				const { href } = _url;
				options.url = href;
				return options;
			};

			Vue._yapi_api = {
				/* project */
				getProjectByGroupId(group_id) {
					return handleRequest(async () => {
						return _.$ajax.get("/api/project/list", {
							data: { group_id }
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
				async getUserSearch(data) {
					return handleRequest(async () => {
						return _.$ajax.get(`/api/user/search`, { data });
					});
				},
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

	return Vue._yapi_api;
}
</script>
