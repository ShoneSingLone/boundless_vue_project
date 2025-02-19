<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	_.each(
		{
			/* 本项目独有的pagination */
			RefreshTitle: "@/components/RefreshTitle.vue",
			AdminPrivatePagination: "@/components/AdminPrivatePagination.vue",
			NavbarBreadcrumb: "@/components/NavbarBreadcrumb.vue",
			AdminDeptCascader: "/common/type_admin/components/AdminDeptCascader.vue",
			AdminMenuCascader: "/common/type_admin/components/AdminMenuCascader.vue",
			AdminMenuPermissionTree: "/common/type_admin/components/AdminMenuPermissionTree.vue",
			AdminIconSelector:
				"/common/type_admin/components/AdminIconSelector/AdminIconSelector.vue",
			xItemDaterange: "@/components/AdminItems/xItemDaterange.vue",
      xItemDatetimerange: "@/components/AdminItems/xItemDatetimerange.vue",
		},
		(componentURL, name) => Vue.component(name, () => _.$importVue(componentURL))
	);

	await Promise.all([
		_.$importVue("/common/ui-x/useXui.vue", {
			size: "small",
			I18N_LANGUAGE,
			x_table_vir_empty_component: "@/components/TableEmptyRender.vue",
			x_switch_width: 32,
			x_page_title_back_icon: "_icon_back",
			x_modal_close_icon: "_icon_close",
			x_item_is_show_item_colon: true,
			x_pagination_pagination_component: "AdminPrivatePagination",
			x_pagination_position: "center"
		}),
		_.$importVue("/common/ui-element/useElementUI.NoJS.vue")
	]);

	const [{ router }] = await _.$importVue([
		"@/router/routes.vue",
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
	]);

	(() => {
		_rules.deptCode = () => {
			return {
				name: "deptCode",
				async validator({ val }) {
					let reg = /^\w+$/;
					if (reg.test(val)) {
						return "";
					}
					return "只能含字母、数字或下划线";
				},
				trigger: ["change", "input", "blur"]
			};
		};
		_rules.maxLength = () => {
			return {
				name: "maxLength",
				async validator({ val }) {
					// 不能超过30个字符
					if (val.length > 30) {
						return "不能超过30个字符";
					}
					return "";
				},
				trigger: ["change", "input", "blur"]
			};
		};
		_rules.roleCode = () => {
			return {
				name: "roleCode",
				async validator({ val }) {
					// 必须是数字、字母及下划线任意一种及以上组合
					let reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/;
					if (reg.test(val)) {
						return "";
					}
					return "必须是数字、字母及下划线任意一种及以上组合";
				},
				trigger: ["change", "input", "blur"]
			};
		};
		_rules.cronCheck = () => {
			return {
				name: "cronCheck",
				async validator({ val }) {
					// cron正则表达式
					const cronRegex =
						/^([0-5]?\d|\*) ([0-5]?\d|\*) ([0-2]?\d|\*) ([1-9]|1[0-2]|JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC|\*) ([1-2]?\d|\*) ([0-5]?\d|\*) (\d|\*)?$/;
					if (cronRegex.test(val)) {
						return "";
					}
					return "请输入正确的cron表达式";
				},
				trigger: ["change", "input", "blur"]
			};
		};
		_rules.isValidCIDR = () => {
			return {
				name: "isValidCIDR",
				async validator({ val }) {
					const regex =
						/^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}\/(\d|[1-2]\d|3[0-2])$/;
					if (regex.test(val)) {
						return "";
					}
					return "请输入正确的IP地址";
				},
				trigger: ["change", "input", "blur"]
			};
		};
	})();
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
			this.refreshStatus();
			$("body").removeClass("x-loading");
		},
		setup() {},
		data() {
			return {
				list: [],
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
				roleMenusList: [],
				rolePermsList: [],
				settings: {
					/**
					 * 网页标题
					 */
					title: i18n("数据库审计管理系统"),
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
			async refreshStatus() {
				function getMenuCode(menuList = [], parentMenuCode = "") {
					let arr = [];
					menuList.forEach(item => {
						let _code = parentMenuCode
							? `${parentMenuCode}:${item.menuCode}`
							: item.menuCode;
						arr.push(_code);
						if (item.children && item.children.length > 0) {
							arr = arr.concat(getMenuCode(item.children, item.menuCode));
						}
					});
					return arr;
				}

				function getMenuPermsList(menuList = [], parentMenuCode = "") {
					let arr = [];
					menuList.forEach(item => {
						let _code = parentMenuCode
							? `${parentMenuCode}:${item.menuCode}`
							: item.menuCode;
						arr.push({ _code, perms: item.perms });
						if (item.children && item.children.length > 0) {
							arr = arr.concat(getMenuPermsList(item.children, item.menuCode));
						}
					});
					return arr;
				}

				_.$loading(true);
				try {
					if (!_.$lStorage["token"]) {
						_.$lStorage["token"] = "";
						this.$router.push("/login");
					} else if (this.$route.path === "/login") {
						this.$router.push("/");
					}
					// 获取用户信息，里面也返回的menu菜单信息，但是需要使用下面的接口获取
					let { data } = await _api.admin_db_audit.xdsLoginInfo();
					const user = data.user;
					const menus = data.menus;

					this.roleMenusList = getMenuCode(menus);
					this.rolePermsList = getMenuPermsList(menus);
					console.log(this.roleMenusList);
					if (_.$isArrayFill(data.roles)) {
						// 验证返回的roles是否是一个非空数组
						user.roles = data.roles;
						user.permissions = data.permissions;
					} else {
						user.roles = ["ROLE_DEFAULT"];
					}
					// user.id = user.userId;
					user.account = user.name;
					user.menus = menus;
					this._setUser(user);
					if (window.sessionStorage.getItem(`wss-${user.id}`)) {
						this.list = JSON.parse(window.sessionStorage.getItem("wss")) ?? [];
					}
					const vm = this;

					await _.$sleep(500);
					// const url = `${window.wssUrl}${user.id}`;
					// socket.onmessage = function (event) {
					// 	if (event.data) {
					// 		if (event.data.includes("风险等级")) {
					// 			const obj = JSON.parse(event?.data ?? "{}");
					// 			vm.list.push(obj);
					// 			window.sessionStorage.setItem(
					// 				`wss-${user.id}`,
					// 				JSON.stringify(vm.list)
					// 			);
					// 		}
					// 	}
					// 	console.log("Received message:", event);
					// };
					// // 当连接关闭时触发
					// socket.onclose = () => {
					// 	console.log("Connection closed");
					// };
					var lockReconnect = false;
					var ws = null;
					var wsUrl = `${window.wssUrl}${user.id}`;
					createWebSocket(wsUrl);

					function createWebSocket(url) {
						try {
							if ("WebSocket" in window) {
								ws = new WebSocket(url);
							}
							initEventHandle();
						} catch (e) {
							reconnect(url);
							console.log(e);
						}
					}

					function initEventHandle() {
						ws.onclose = function (ev) {
							reconnect(wsUrl);
							console.log(
								"socket 断开: " + ev.code + " " + ev.reason + " " + ev.wasClean
							);
							console.log("socket 断开: " + ev);
						};
						ws.onerror = function (ev) {
							reconnect(wsUrl);
							console.log("llws连接错误!");
						};
						ws.onopen = function () {
							heartCheck.reset().start();
							console.log("llws连接成功!" + new Date().toLocaleString());
						};
						ws.onmessage = function (message) {
							heartCheck.reset().start(); //拿到任何消息都说明当前连接是正常的
							console.log("llws收到消息啦:" + message.data);
							if (message.data) {
								if (message.data.includes("风险等级")) {
									const obj = JSON.parse(message?.data ?? "{}");
									vm.list.push(obj);
									window.sessionStorage.setItem(
										`wss-${user.id}`,
										JSON.stringify(vm.list)
									);
								}
							}
						};
					}

					// 当窗口关闭时，主动去关闭websocket连接
					window.onbeforeunload = function () {
						ws.close();
					};

					function reconnect(url) {
						if (lockReconnect) return;
						lockReconnect = true;
						setTimeout(function () {
							//没连接上会一直重连，设置延迟避免请求过多
							createWebSocket(url);
							lockReconnect = false;
						}, 2000);
					}

					var heartCheck = {
						timeout: 3000,
						timeoutObj: null,
						serverTimeoutObj: null,
						reset: function () {
							clearTimeout(this.timeoutObj);
							clearTimeout(this.serverTimeoutObj);
							return this;
						},
						start: function () {
							var self = this;
							this.timeoutObj = setTimeout(function () {
								ws.send("ping");
								console.log("ping!");
								self.serverTimeoutObj = setTimeout(function () {
									//如果超过一定时间还没重置，说明后端主动断开了
									ws.close();
								}, self.timeout);
							}, this.timeout);
						}
					};
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			async logout() {
				try {
					_.$lStorage["token"] = "";
					// this.$router.push("/login");
					// return;
					const res = await _api.admin_db_audit.xdsLogout();
					if (res.code === 0) {
						_.$lStorage["token"] = "";
						this.list = [];
						window.sessionStorage.removeItem(`wss-${this.user.id}`);
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
					// this.handleAuth();
					return;
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
@charset "UTF-8";
html.x-admin {
	color-scheme: light;
	--el-color-white: #ffffff;
	--el-color-black: #000000;
	--el-color-primary: #00695e;
	--el-color-primary-hover: #80b4af;
	--el-color-primary-active: #00695e;
	--el-color-primary-light-3: #4d968e;
	--el-color-primary-light-5: #80b4af;
	--el-color-primary-light-7: #b3d2cf;
	--el-color-primary-light-8: #cce1df;
	--el-color-primary-light-9: #e6f0ef;
	--el-color-primary-dark-2: #00544b;
	--el-color-success: #67c23a;
	--el-color-success-light-3: #95d475;
	--el-color-success-light-5: #b3e19d;
	--el-color-success-light-7: #d1edc4;
	--el-color-success-light-8: #e1f3d8;
	--el-color-success-light-9: #f0f9eb;
	--el-color-success-dark-2: #529b2e;
	--el-color-warning: #e6a23c;
	--el-color-warning-light-3: #eebe77;
	--el-color-warning-light-5: #f3d19e;
	--el-color-warning-light-7: #f8e3c5;
	--el-color-warning-light-8: #faecd8;
	--el-color-warning-light-9: #fdf6ec;
	--el-color-warning-dark-2: #b88230;
	--el-color-danger: #f66f6a;
	--el-color-danger-light-3: #f99a97;
	--el-color-danger-light-5: #fbb7b5;
	--el-color-danger-light-7: #fcd4d2;
	--el-color-danger-light-8: #fde2e1;
	--el-color-danger-light-9: #fef1f0;
	--el-color-danger-dark-2: #c55955;
	--el-color-error: #f56c6c;
	--el-color-error-light-3: #f89898;
	--el-color-error-light-5: #fab6b6;
	--el-color-error-light-7: #fcd3d3;
	--el-color-error-light-8: #fde2e2;
	--el-color-error-light-9: #fef0f0;
	--el-color-error-dark-2: #c45656;
	--el-color-info: #909399;
	--el-color-info-light-3: #b1b3b8;
	--el-color-info-light-5: #c8c9cc;
	--el-color-info-light-7: #dedfe0;
	--el-color-info-light-8: #e9e9eb;
	--el-color-info-light-9: #f4f4f5;
	--el-color-info-dark-2: #73767a;
	--el-bg-color: #ffffff;
	--el-bg-color-page: #f2f3f5;
	--el-bg-color-overlay: #ffffff;
	--el-text-color-primary: #303133;
	--el-text-color-regular: #606266;
	--el-text-color-secondary: #909399;
	--el-text-color-placeholder: #a8abb2;
	--el-text-color-disabled: #c0c4cc;
	--el-border-color: #dcdfe6;
	--el-border-color-light: #e4e7ed;
	--el-border-color-lighter: #ebeef5;
	--el-border-color-extra-light: #f2f6fc;
	--el-border-color-dark: #d4d7de;
	--el-border-color-darker: #cdd0d6;
	--el-fill-color: #f0f2f5;
	--el-fill-color-light: #f5f7fa;
	--el-fill-color-lighter: #f3f8f6;
	--el-fill-color-extra-light: #fafcff;
	--el-fill-color-dark: #ebedf0;
	--el-fill-color-darker: #e6e8eb;
	--el-fill-color-blank: #ffffff;
	--el-box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
	--el-box-shadow-light: 0px 0px 12px rgba(0, 0, 0, 0.12);
	--el-box-shadow-lighter: 0px 0px 6px rgba(0, 0, 0, 0.12);
	--el-box-shadow-dark: 0px 16px 48px 16px rgba(0, 0, 0, 0.08), 0px 12px 32px rgba(0, 0, 0, 0.12),
		0px 8px 16px -8px rgba(0, 0, 0, 0.16);
	--el-disabled-bg-color: var(--el-fill-color-light);
	--el-disabled-text-color: var(--el-text-color-placeholder);
	--el-disabled-border-color: var(--el-border-color-light);
	--el-overlay-color: rgba(0, 0, 0, 0.8);
	--el-overlay-color-light: rgba(0, 0, 0, 0.7);
	--el-overlay-color-lighter: rgba(0, 0, 0, 0.5);
	--el-mask-color: rgba(255, 255, 255, 0.9);
	--el-mask-color-extra-light: rgba(255, 255, 255, 0.3);
	--el-border-width: 1px;
	--el-border-style: solid;
	--el-border-color-hover: var(--el-text-color-disabled);
	--el-border: var(--el-border-width) var(--el-border-style) var(--el-border-color);
	--el-svg-monochrome-grey: var(--el-border-color);

	--base-box-showdow: 7px 0px 80px 0px rgba(0, 0, 0, 0.05);
	--base-nav-height: 70px;
	--xPageTitle-padding: 0;
	--dialog-bg-color: #e7f7f8;
	--active-color: #5bcfad;
	--active-color-bg: #e8f2f1;
	--unactive-color: #6c787d;
	--unactive-color-bg: #d8d8d8;
	--xItem-wrapper-width: 400px;
	--bg-color: #f5f8f7;
	--body-bg-color: #f4f9fd;

	.x-app-body {
		.el-table-v2 {
			--el-table-border-color: var(--el-border-color-lighter);
			--el-table-border: 1px solid var(--el-table-border-color);
			--el-table-text-color: var(--el-text-color-regular);
			--el-table-header-text-color: var(--el-text-color-primary);
			--el-table-row-hover-bg-color: var(--el-fill-color-light);
			--el-table-current-row-bg-color: var(--el-color-primary-light-9);
			--el-table-header-bg-color: #fff;
			--el-table-fixed-box-shadow: var(--el-box-shadow-light);
			--el-table-bg-color: var(--el-fill-color-blank);
			--el-table-tr-bg-color: var(--el-fill-color-blank);
			--el-table-expanded-cell-bg-color: var(--el-fill-color-blank);
			--el-table-fixed-left-column: inset 10px 0 10px -10px rgba(0, 0, 0, 0.15);
			--el-table-fixed-right-column: inset -10px 0 10px -10px rgba(0, 0, 0, 0.15);
		}

		.xDataGrid {
			box-shadow: var(--el-box-shadow);
			border-radius: 8px;
			overflow: hidden;
		}
		.el-table-v2__left {
			box-shadow: unset;
		}

		.el-button {
			&.el-button--small,
			&.el-button--small.is-round {
				padding: 7px 14px;
			}

			&.el-button--primary {
				--el-button-hover-text-color: white;
			}
		}
		.uploader-box-wrapper {
			width: 300px;
			border: 1px dashed gray;
			padding: 16px;
			background: var(--body-bg-color);
		}

		/* .el-switch__core */
		.xSwitch.el-switch {
			.xSwitch__core-wrapper {
				.el-switch__core {
					border-color: var(--unactive-color-bg);
					background-color: var(--unactive-color-bg);
					height: 10px;
				}
				.xSwitch__core-bar {
					background-color: var(--unactive-color);
					box-shadow: var(--el-box-shadow);
				}
			}

			&.is-checked {
				.xSwitch__core-wrapper {
					.el-switch__core {
						border-color: var(--active-color-bg);
						background-color: var(--active-color-bg);
					}
					.xSwitch__core-bar {
						background-color: var(--active-color);
					}
				}
			}
		}
		/* el-page-header__title */

		.el-page-header__left::after {
			display: none;
		}

		.xDataGrid-in-card {
			&.xDataGrid {
				box-shadow: none;
			}
		}

		.chart-card-header {
			font-size: 18px;
			font-weight: 700;
			color: #464646;
		}

		.edit-title {
			background-color: var(--bg-color);
			text-align: center;
			font-size: 18px;
			font-weight: 600;
			padding: var(--ui-one);
		}

		.form-wrapper {
			display: flex;
			justify-content: center;
			> .xForm[data-col="1"] {
				width: 500px;
			}
			> .xForm[data-col="2"] {
				width: 800px;
			}
		}

		.el-dialog__wrapper > .el-dialog {
			--xModel-dialog-border-radius: 8px;
			> .el-dialog__header {
				background-color: var(--dialog-bg-color);
			}
		}

		.el-dialog__wrapper::before {
			background-color: rgba(0, 0, 0, 0.5);
		}

		.el-dialog__close.xIcon._icon_close {
			color: red;
		}

		span.xModel-title_prefixe {
			display: inline-block;
			width: 12px;
			height: 22px;
			background-color: var(--el-color-primary);
			position: absolute;
			left: 0px;
		}

		.xDataGrid {
			[even-number="0"] {
				background-color: #f8f8f8;
			}
		}

		.x-page-view {
			&.page-is-chart {
				.xPageContent {
					padding-left: 0;
					padding-right: 0;
					.width50percent {
						width: 50%;
						flex: 1;
					}
					.page-body {
						padding-top: 0;
						background-color: transparent;
					}
				}
			}
			.page-body {
				border-radius: 8px;
			}
		}
		.card-as-condition-panel {
			margin: -16px -16px 0;
			--xItem-wrapper-width: 220px;
			--xItem-label-width: 68px;
		}
	}
}
</style>
