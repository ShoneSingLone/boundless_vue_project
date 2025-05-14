<script lang="ts">
export default async function ({ rootApp }) {
	const ALL_PERMISSION = "*:*:*";

	function isAuthMatch(permission) {
		const permissions = (rootApp && rootApp.user && rootApp.user.permissions) || [];
		return _.some(permissions, userPermission => {
			return ALL_PERMISSION === userPermission || userPermission === permission;
		});
	}

	function authRole(role) {
		const super_admin = "admin";
		const roles = rootApp.user.roles;
		if (role && role.length > 0) {
			return _.some(roles, v => {
				return super_admin === v || v === role;
			});
		} else {
			return false;
		}
	}

	const auth = {
		// 验证用户是否具备某权限
		hasPermi(permission) {
			return isAuthMatch(permission);
		},
		// 验证用户是否含有指定权限，只需包含其中一个
		hasPermiOr(permissions) {
			return _.some(permissions, item => {
				return isAuthMatch(item);
			});
		},
		// 验证用户是否含有指定权限，必须全部拥有
		hasPermiAnd(permissions) {
			return _.every(permissions, item => {
				return isAuthMatch(item);
			});
		},
		// 验证用户是否具备某角色
		hasRole(role) {
			return authRole(role);
		},
		// 验证用户是否含有指定角色，只需包含其中一个
		hasRoleOr(roles) {
			return _.some(roles, item => {
				return authRole(item);
			});
		},
		// 验证用户是否含有指定角色，必须全部拥有
		hasRoleAnd(roles) {
			return _.every(roles, item => {
				return authRole(item);
			});
		}
	};

	Vue.prototype.$auth = auth;

	Vue.directive("hasAnyRole", {
		inserted(el, binding, vnode) {
			const { value } = binding;
			const super_admin = "admin";
			const roles = rootApp.user.roles;

			if (value && value instanceof Array && value.length > 0) {
				const roleFlag = value;

				const hasRole = roles.some(role => {
					return super_admin === role || roleFlag.includes(role);
				});

				if (!hasRole) {
					el.parentNode && el.parentNode.removeChild(el);
				}
			} else {
				throw new Error(`请设置角色权限标签值"`);
			}
		}
	});
	Vue.directive("hasAnyToken", {
		inserted(el, binding, vnode) {
			const { value: accessTokenArray } = binding;
			if (_.$isArrayFill(accessTokenArray)) {
				const hasAnyPermission = auth.hasPermiOr(accessTokenArray);

				if (!hasAnyPermission) {
					el.parentNode && el.parentNode.removeChild(el);
				}
			} else {
				throw new Error(`请设置操作权限标签值`);
			}
		}
	});

	return auth;
}
</script>
