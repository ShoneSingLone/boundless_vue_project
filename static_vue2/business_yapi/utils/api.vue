<script>
export default async function () {
	if (!Vue._api) {
		(function () {
			Vue._api = {
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
				let response = {};
				try {
					_.$loading(true);
					response = await request();
				} catch (error) {
					_.$msgError(error);
				} finally {
					_.$loading();
					return response;
				}
			}
		})();
	}

	return Vue._api;
}
</script>
