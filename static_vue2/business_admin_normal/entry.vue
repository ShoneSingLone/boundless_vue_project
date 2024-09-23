<script lang="ts">
export default async function () {
	_.each(
		{
			AdminXItemDaterange: "/common/type_admin/components/AdminXItemDaterange.vue",
			AdminDeptCascader: "/common/type_admin/components/AdminDeptCascader.vue",
			AdminMenuCascader: "/common/type_admin/components/AdminMenuCascader.vue",
			AdminMenuPermissionTree: "/common/type_admin/components/AdminMenuPermissionTree.vue",
			AdminIconSelector:
				"/common/type_admin/components/AdminIconSelector/AdminIconSelector.vue"
		},
		(componentURL, name) => Vue.component(name, () => _.$importVue(componentURL))
	);

	const [
		,
		[
			{ router, CONSTANT_ROUTES, DYNAMIC_ROUTES, ROUTE_NOT_FOUD },
			{ useAdminTagsView },
			{ useAppPermission }
		]
	] = await Promise.all([
		Promise.all([
			_.$importVue("/common/ui-x/useXui.vue"),
			_.$importVue("/common/type_admin/use_admin/tools.vue"),
			_.$importVue("/common/ui-element/useElementUI.NoJS.vue", {
				// _.$importVue("/common/ui-element/useElementUI.vue", {
				size: "small",
				I18N_LANGUAGE: window.I18N_LANGUAGE
			})
		]),
		_.$importVue([
			"@/router/routes.vue",
			/* admin 相关 */
			"/common/type_admin/use_admin/store/tagsView.vue",
			"/common/type_admin/use_admin/store/permission.vue",
			/* admin 相关 */
			/*常量*/
			"@/utils/var.vue",
			/*接口*/
			"@/utils/api.vue",
			/*校验规则*/
			"/common/utils/rules.vue",
			/*枚举选项*/
			"@/utils/utils.vue",
			/*工具函数*/
			// "@/utils/helper.vue",
			/*复用组件*/
			// "@/utils/reuse.vue"
			/*通用下拉项*/
			"@/utils/opts.vue"
		])
	]);

	/*  */
	const WHITE_LIST = ["/login", "/register"];

	var rootApp = new Vue({
		el: "#app",
		router,
		components: {
			ViewApp: () => _.$importVue("@/layout/AppLayoutLevel.vue")
		},
		template: `<ViewApp/>`,
		provide() {
			return {
				APP: this
			};
		},
		mounted() {
			_.$setDocTitle(this.settings.title);
			$("body").removeClass("x-loading");
		},
		setup() {
			const permission = useAppPermission({
				rootApp: this,
				ROUTE_NOT_FOUD,
				CONSTANT_ROUTES,
				DYNAMIC_ROUTES
			});
			const tagsView = useAdminTagsView({
				rootApp: this
			});
			return { permission, tagsView };
		},
		data() {
			return {
				isMobile: /Mobile/gi.test(window.navigator.userAgent),
				sidebar: {
					isCollapse: !!(_.$lStorage["sidebarIsCollapse"] || false),
					withoutAnimation: false,
					hide: false
				},
				device: "desktop",
				size: _.$lStorage["size"] || "default",
				isShowRelogin: false,
				user: {},
				settings: {
					/**
					 * 网页标题
					 */
					title: i18n("后台管理控制台"),
					/**
					 * 侧边栏主题 深色主题theme-dark，浅色主题theme-light
					 */
					sideTheme: "theme-dark",
					/**
					 * 是否系统布局配置
					 */
					showSettings: true,

					/**
					 * 是否显示顶部导航
					 */
					topNav: false,

					/**
					 * 是否显示 tagsView
					 */
					tagsView: true,

					/**
					 * 是否固定头部
					 */
					fixedHeader: false,

					/**
					 * 是否显示logo
					 */
					sidebarLogo: true,

					/**
					 * 是否显示动态标题
					 */
					dynamicTitle: false,

					/**
					 * @type {string | array} 'production' | ['production', 'development']
					 * @description Need show err logs component.
					 * The default is only used in the production env
					 * If you want to also use it in dev, you can pass ['production', 'development']
					 */
					errorLog: "production"
				}
			};
		},
		methods: {
			handleUnauth() {
				// 没有token
				if (WHITE_LIST.indexOf(this.$route.path) !== -1) {
					// 在免登录白名单，直接进入
					return;
				} else {
					this.$router.push(`/login?redirect=${this.$route.fullPath}`); // 否则全部重定向到登录页
				}
			},
			handleAuth: _.debounce(async function () {
				if (this.$route.path === "/login") {
					this.$router.push({ path: "/" });
					return;
				}
				if (!this.user?.roles?.length) {
					try {
						this.isShowRelogin = true;
						// 判断当前用户是否已拉取完user_info信息
						await this.refreshUserInfo();
						await this.permission.generateRoutes({ rootApp: this });
						// hack方法 确保addRoutes已完成
						this.$router.push({ ...this.$route, replace: true });
					} catch (error) {
						this.logOut().then(() => {
							_.$msgError(error);
							this.$router.push({ path: "/" });
							return;
						});
					}
				}
			}, 500),
			routerUpsertQuery(query) {
				this.$router.push({
					path: this.$route.path,
					query: {
						...this.$route.query,
						...query
					}
				});
			},
			/* ************************methods************************ */
			_setUser(userInfo) {
				this.user = {
					...userInfo
				};
				this.isShowRelogin = false;
			},
			async refreshUserInfo() {
				_.$loading(true);
				try {
					let res = await _api.adminNormal.getUserInfo();
					// res = {
					// 	msg: "操作成功",
					// 	code: 200,
					// 	permissions: [
					// 		"system:post:list",
					// 		"system:user:remove",
					// 		"flowable:form:query",
					// 		"system:expression:edit",
					// 		"system:menu:query",
					// 		"system:menu:list",
					// 		"system:config:list",
					// 		"tool:gen:edit",
					// 		"system:listener:list",
					// 		"system:role:list",
					// 		"system:deployment:add",
					// 		"system:expression:remove",
					// 		"system:user:query",
					// 		"system:dept:list",
					// 		"system:config:query",
					// 		"tool:gen:query",
					// 		"system:listener:add",
					// 		"flowable:form:remove",
					// 		"system:listener:export",
					// 		"flowable:form:edit",
					// 		"system:dept:query",
					// 		"system:dict:list",
					// 		"tool:build:list",
					// 		"flowable:form:add",
					// 		"system:deployment:edit",
					// 		"system:expression:list",
					// 		"system:listener:edit",
					// 		"tool:swagger:list",
					// 		"system:expression:add",
					// 		"tool:gen:preview",
					// 		"system:user:list",
					// 		"system:listener:remove",
					// 		"system:notice:list",
					// 		"system:dict:query",
					// 		"system:notice:query",
					// 		"system:expression:query",
					// 		"tool:gen:import",
					// 		"system:expression:export",
					// 		"tool:gen:code",
					// 		"flowable:form:list",
					// 		"tool:gen:list",
					// 		"tool:gen:remove",
					// 		"system:deployment:remove",
					// 		"system:role:query",
					// 		"system:post:query",
					// 		"system:listener:query"
					// 	],
					// 	roles: ["common", "cdo"],
					// 	user: {
					// 		createBy: "admin",
					// 		createTime: "2022-12-11 16:51:52",
					// 		updateBy: null,
					// 		updateTime: null,
					// 		remark: "测试员",
					// 		params: {
					// 			"@type": "java.util.HashMap"
					// 		},
					// 		userId: 2,
					// 		deptId: 105,
					// 		userName: "tony",
					// 		nickName: "ton",
					// 		email: "test@test.com",
					// 		phonenumber: "18622222222",
					// 		sex: "1",
					// 		avatar: "/profile/avatar/2024/05/19/blob_20240519191329A033.png",
					// 		password: "$2a$10$pMWNcxdCZ79zxfmeCSVILOIYFVSWm7UP2C.kQBIJVhwqISojopkY.",
					// 		status: "0",
					// 		delFlag: "0",
					// 		loginIp: "182.200.209.247",
					// 		loginDate: "2024-06-01T21:03:34.000+08:00",
					// 		dept: {
					// 			createBy: null,
					// 			createTime: null,
					// 			updateBy: null,
					// 			updateTime: null,
					// 			remark: null,
					// 			params: {
					// 				"@type": "java.util.HashMap"
					// 			},
					// 			deptId: 105,
					// 			parentId: 101,
					// 			ancestors: "0,100,101",
					// 			deptName: "测试部门",
					// 			orderNum: 3,
					// 			leader: "若依",
					// 			phone: null,
					// 			email: null,
					// 			status: "0",
					// 			delFlag: null,
					// 			parentName: null,
					// 			children: []
					// 		},
					// 		roles: [
					// 			{
					// 				createBy: null,
					// 				createTime: null,
					// 				updateBy: null,
					// 				updateTime: null,
					// 				remark: null,
					// 				params: {
					// 					"@type": "java.util.HashMap"
					// 				},
					// 				roleId: 2,
					// 				roleName: "普通角色",
					// 				roleKey: "common",
					// 				roleSort: 2,
					// 				dataScope: "1",
					// 				menuCheckStrictly: false,
					// 				deptCheckStrictly: false,
					// 				status: "0",
					// 				delFlag: null,
					// 				flag: false,
					// 				menuIds: null,
					// 				deptIds: null,
					// 				permissions: [
					// 					"system:post:list",
					// 					"system:user:remove",
					// 					"flowable:form:query",
					// 					"system:expression:edit",
					// 					"system:menu:query",
					// 					"system:menu:list",
					// 					"system:config:list",
					// 					"tool:gen:edit",
					// 					"system:listener:list",
					// 					"system:role:list",
					// 					"system:deployment:add",
					// 					"system:expression:remove",
					// 					"system:user:query",
					// 					"system:dept:list",
					// 					"system:config:query",
					// 					"tool:gen:query",
					// 					"system:listener:add",
					// 					"flowable:form:remove",
					// 					"system:listener:export",
					// 					"flowable:form:edit",
					// 					"system:dept:query",
					// 					"system:dict:list",
					// 					"tool:build:list",
					// 					"flowable:form:add",
					// 					"system:deployment:edit",
					// 					"system:expression:list",
					// 					"system:listener:edit",
					// 					"tool:swagger:list",
					// 					"system:expression:add",
					// 					"tool:gen:preview",
					// 					"system:user:list",
					// 					"system:listener:remove",
					// 					"system:notice:list",
					// 					"system:dict:query",
					// 					"system:notice:query",
					// 					"system:expression:query",
					// 					"tool:gen:import",
					// 					"system:expression:export",
					// 					"tool:gen:code",
					// 					"flowable:form:list",
					// 					"tool:gen:list",
					// 					"tool:gen:remove",
					// 					"system:deployment:remove",
					// 					"system:role:query",
					// 					"system:post:query",
					// 					"system:listener:query"
					// 				],
					// 				admin: false
					// 			},
					// 			{
					// 				createBy: null,
					// 				createTime: null,
					// 				updateBy: null,
					// 				updateTime: null,
					// 				remark: null,
					// 				params: {
					// 					"@type": "java.util.HashMap"
					// 				},
					// 				roleId: 5,
					// 				roleName: "CDO",
					// 				roleKey: "cdo",
					// 				roleSort: 0,
					// 				dataScope: "2",
					// 				menuCheckStrictly: false,
					// 				deptCheckStrictly: false,
					// 				status: "0",
					// 				delFlag: null,
					// 				flag: false,
					// 				menuIds: null,
					// 				deptIds: null,
					// 				permissions: [],
					// 				admin: false
					// 			}
					// 		],
					// 		roleIds: null,
					// 		postIds: null,
					// 		roleId: null,
					// 		admin: false
					// 	}
					// };
					const user = res.user;
					const avatar = user.avatar;

					if (_.$isArrayFill(res.roles)) {
						// 验证返回的roles是否是一个非空数组
						user.roles = res.roles;
						user.permissions = res.permissions;
					} else {
						user.roles = ["ROLE_DEFAULT"];
					}
					user.id = user.userId;
					user.name = user.userName;
					user.avatar = avatar;
					this._setUser(user);
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			async logout() {
				try {
					const res = await _api.adminNormal.logout();
					if (res.code === 200) {
						_.$lStorage.x_token = "";
						this._setUser({});
						this.$router.push("/login");
						_.$msg(i18n("退出成功! "));
					}
				} catch (error) {
					_.$msgError(error);
				}
			},

			toggleSideBar(withoutAnimation) {
				if (this.sidebar.hide) {
					return false;
				}
				this.sidebar.isCollapse = !this.sidebar.isCollapse;
				this.sidebar.withoutAnimation = withoutAnimation;
				if (this.sidebar.isCollapse) {
					_.$lStorage.sidebarIsCollapse = "true";
				} else {
					_.$lStorage.sidebarIsCollapse = "";
				}
			},
			closeSideBar({ withoutAnimation }) {
				_.$lStorage.sidebarIsCollapse = 0;
				this.sidebar.isCollapse = false;
				this.sidebar.withoutAnimation = withoutAnimation;
			},
			toggleDevice(device) {
				this.isMobile = device === "mobile";
				this.device = device;
			},
			setSize(size) {
				this.size = size;
				_.$lStorage.size = size;
			},
			toggleSideBarHide(status) {
				this.sidebar.hide = status;
			}
		},
		computed: {},
		watch: {
			"$route.path": {
				immediate: true,
				handler() {
					_.$setDocTitle(this.$route?.meta?.title);
					/* has token*/
					if (_.$lStorage.x_token) {
						this.handleAuth();
					} else if (~WHITE_LIST.indexOf(this.$route.path)) {
						return;
					} else {
						this.handleUnauth();
					}
				}
			}
		}
	});

	if (localStorage.isDev) {
		window.rootApp = rootApp;
	}

	return rootApp;
}
</script>

<style lang="less">
:root {
	--color-white: white;
	--base-sidebar-width: 200px;
	// base color
	--blue: #324157;
	--light-blue: #3a71a8;
	--red: #c03639;
	--pink: #e65d6e;
	--green: #30b08f;
	--tiffany: #4ab7bd;
	--yellow: #fec171;
	--panGreen: #30b08f;

	// 默认菜单主题风格
	--base-menu-color: #bfcbd9;
	--base-menu-color-active: #f4f4f5;
	--base-menu-background: #304156;
	--base-logo-title-color: #ffffff;
	--base-menu-hover-bg-color: rgb(38, 52, 69);

	--base-menu-light-color: rgba(0, 0, 0, 0.7);
	--base-menu-light-background: #ffffff;
	--base-logo-light-title-color: #001529;

	--base-sub-menu-background: #1f2d3d;
	--base-sub-menu-hover: #001528;

	// 自定义暗色菜单风格
	--color-primary: #409eff;
	--color-success: #67c23a;
	--color-warning: #e6a23c;
	--color-danger: #f56c6c;
	--color-info: #909399;
	--base-sidebar-width: 200px;
}

.department-tree {
	position: relative;
	width: 300px;
}

.AdminTree {
	// width: 600px;
	height: 600px;
	.AdminTree-tree {
		position: relative;
	}
}
</style>
