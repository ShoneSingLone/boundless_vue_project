<script lang="ts">
export default async function () {
	if (!window._api.adminNormal) {
		(function () {
			_.$ajax.requestInjector = function (config) {
				config.url = `${config.url}`;
				// 是否需要设置 token
				const isToken = _.isBoolean(config.headers?.isToken)
					? config.headers?.isToken
					: true;
				// 是否需要防止数据重复提交
				const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
				if (_.$lStorage.x_token && isToken) {
					config.headers["Authorization"] = "Bearer " + _.$lStorage.x_token; // 让每个请求携带自定义token 请根据实际情况自行修改
				}
				/* TODO:md5请求数据大小超出允许的5M限制，无法进行防重复提交验证。 */
				return config;
			};

			_.$ajax.responseInjector = function (response) {
				if (response.code === 401) {
					_.$lStorage["x_token"] = "";
					_.$AppRouter.push("/login");
				}
				return response;
			};

			window._api.adminNormal = {
				login(data) {
					return _.$ajax.post("/login", {
						data
					});
				},
				logout(data) {
					return _.$ajax.post("/logout", {
						data
					});
				},
				getUserInfo() {
					return _.$ajax.get("/getInfo");
				},
				getRouters() {
					return _.$ajax.get("/getRouters");
				},
				captchaImage(data) {
					return _.$ajax.get("/captchaImage", {
						data
					});
				},
				/*  */
				listUser(data) {
					return _.$ajax.get("/system/user/list", {
						data
					});
				}
			};
		})();
	}

	return window._api.adminNormal;
}
</script>
