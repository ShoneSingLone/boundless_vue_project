<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	const _$TRIGGER_EVENT_NAME = "USER_WS_MESSAGE";

	PRIVATE_GLOBAL._$TRIGGER_EVENT_NAME = _$TRIGGER_EVENT_NAME;

	_.each(
		{
			TuiEditor: "@/components/TuiEditor/TuiEditor.vue",
			YapiApiRequestBodyPreviewer: "@/components/YapiApiRequestBodyPreviewer.vue",
			xItemMonaco: "@/components/xItemMonaco.vue",
			yapiItemReqBodyParams: "@/components/yapiItemReqBodyParams.vue",
			YapiItemProxyEnv: "@/components/YapiItemProxyEnv.vue",
			YapiItemAvatar: "@/components/YapiItemAvatar.vue",
			YapiItemUac: "@/components/YapiItemUac.vue",
			YapiItemKeyValTable: "@/components/YapiItemKeyValTable.vue",
			YapiItemPathParams: "@/components/YapiItemPathParams.vue",
			YapiProjectCard: "@/components/YapiProjectCard.vue",
			YapiPlaceholderView: "@/components/YapiPlaceholderView.vue"
		},
		(componentURL, name) => Vue.component(name, () => _.$importVue(componentURL))
	);

	const [, [VueRouter, routes]] = await Promise.all([
		Promise.all([
			_.$importVue("/common/ui-x/useXui.vue", {
				size: "small",
				I18N_LANGUAGE: window.I18N_LANGUAGE,
				x_table_vir_empty_component_icon: "_no_data"
			}),
			_.$importVue("/common/ui-element/useElementUI.NoJS.vue", {
				size: "small",
				I18N_LANGUAGE: window.I18N_LANGUAGE
			})
		]),
		_.$importVue([
			"/common/libs/VueRouter.vue",
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
			"@/utils/opts.vue",
			/* 项目独有样式 */
			"@/yapi.defaul.style.vue"
		])
	]);

	/* app entry  */
	const router = new VueRouter({ routes });
	const LOADING_STATUS = 0;
	const GUEST_STATUS = 1;
	const MEMBER_STATUS = 2;
	/*  */
	_.$yapiRouter = router;

	// router.beforeEach(function (to, from) {});

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
			this.initMobileModel();
			this.refreshUserInfo();
		},
		data() {
			const vm = this;

			vm.refreshUserInfo = _.$asyncDebounce(vm, async function refreshUserInfo() {
				try {
					if (!vm.user.isLogin) {
						const res = await _api.yapi.userStatus();
						const { data: userInfo } = res;
						await vm._setUser(userInfo);
					}

					if (vm.user.isLogin) {
						const res = await _api.yapi.userSearch({});
						const { data: all_user } = res;
						vm.all_user = all_user;
						/* TODO: 跳转到首页 或者note应用*/
						if (vm.$route.path === "/note") {
							return;
						}
						await vm.ifUrlNoGroupIdGetAndAddIdToUrl();
						if (vm.cptProjectId) {
							await vm.updateGroupProjectList();
						}
						if (vm.$route.path === "/login") {
							vm.$router.push("/api/group");
						}
					}
					return true;
				} catch (error) {
					/* 未登录，跳转登录界面 */
					vm.$router.push("/login");
				} finally {
					$("body").removeClass("x-loading");
				}
			});

			return {
				isMobile: /Mobile/gi.test(window.navigator.userAgent),
				useMobileView: true,
				BASE_URL: window.__BASE_URL || window.location.origin,
				expandedKeys: {
					group: []
				},
				all_user: [],
				menu: {},
				globalSize: "",
				isFooterFold: false,
				urlHash: window.location.hash,
				user: {
					add_time: "",
					email: "",
					role: "",
					study: false,
					type: "",
					up_time: "",
					username: "",
					_id: "",
					isLogin: false,
					isLDAP: false,
					username: null,
					uid: null,
					loginState: LOADING_STATUS,
					breadcrumb: [],
					studyTip: 0,
					imageUrl: ""
				},
				news: {
					newsData: {
						list: [],
						total: 0
					},
					curpage: 1
				},
				/* group */
				groupList: [],
				groupMemberList: [],
				groupProjectList: []
			};
		},
		methods: {
			routerUpsertQuery(query) {
				this.$router.push({
					path: this.$route.path,
					query: {
						...this.$route.query,
						...query
					}
				});
			},
			initMobileModel() {
				if (this.isMobile) {
					$("body").addClass("app-mobile");
				}
			},
			/* ************************methods************************ */
			_toggleFooterFold() {
				this.isFooterFold = !this.isFooterFold;
			},
			async _setUser(userInfo) {
				const vm = this;
				const isLogin = !!userInfo._id;
				this.user = {
					...userInfo,
					isLogin,
					isLDAP: !!userInfo.ladp,
					role: userInfo ? userInfo.role : null,
					loginState: isLogin ? MEMBER_STATUS : GUEST_STATUS,
					username: userInfo ? userInfo.username : null,
					uid: userInfo ? isLogin : null,
					type: userInfo ? userInfo.type : null,
					study: userInfo ? userInfo.study : false
				};
				if (!isLogin) {
					return;
				}
				this.user._id && vm.initWebsocket(this.user._id);

				// await vm.initSSE();
			},
			async initWebsocket(uid) {
				uid = await new Promise(async resolve => {
					const wsOptions = {
						TRIGGER_EVENT_NAME: _$TRIGGER_EVENT_NAME,
						onConnection: ({ id }) => resolve(id),
						namespace: `/ws_yapi?uid=${uid}`
					};
					this.WS = await _.$importVue("/common/libs/socket.io.vue", wsOptions);
				});
				$(window).on(_$TRIGGER_EVENT_NAME, (event, { type, payload }) => {
					this.$emit(type, payload);
				});
			},
			initSSE() {
				return new Promise(resolve => {
					const SseEventSource = new EventSource(
						`${window._AJAX_URL_PREFIX || ""}/api/sse`
					);
					SseEventSource.onmessage = function (e) {
						try {
							const message = JSON.parse(e.data);
							const { type, payload } = message;
							const HANDLER_MAP = {
								chat_one() {
									vm.$emit("chat_one", payload);
								}
							};
							const handler = HANDLER_MAP[type];
							if (handler) {
								handler();
							}
						} catch (error) {
							console.error(error);
						} finally {
						}
					};
					SseEventSource.onerror = function (e) {
						console.log("SseEventSource error: ", e.data);
					};
					SseEventSource.onopen = function (e) {
						console.log("SseEventSource open:", e);
						resolve(SseEventSource);
					};
				});
			},
			/**
			 * 如果group是对象，直接赋值，
			 * 如果是Id(可能不是数字),则需要request
			 * @param groupId
			 * @returns {Promise<void>}
			 */
			async ifUrlNoGroupIdGetAndAddIdToUrl() {
				/* APP里面如果已经有了group_id, 就不用再去获取了 */
				if (this.cptCurrentGroup) {
					return;
				}
				if (!_.$isArrayFill(this.groupList)) {
					this.updateGroupList();
				}
				const ensureGroupId = () => {
					if (!this.cptGroupId) {
						const firstGroup = _.first(this.groupList);

						if (firstGroup) {
							this.routerUpsertQuery({ groupId: firstGroup._id });
						}
					}
				};
			},
			async logoutActions() {
				try {
					const { data } = await _api.yapi.userLogout();
					if (data === "ok") {
						_.$lStorage.x_token = "";
						await this._setUser({
							isLogin: false,
							loginState: GUEST_STATUS,
							username: null,
							uid: null,
							role: "",
							type: ""
						});
						this.$router.push("/login");
						_.$msg(i18n("退出成功! "));
					}
				} catch (error) {
					_.$msgError(error);
				}
			},
			async updateGroupList() {
				let { data: groupList } = await _api.yapi.groupMine();
				this.groupList = groupList;
			},
			async updateGroupProjectList() {
				const {
					data: { list: groupProjectList }
				} = await _api.yapi.getProjectByGroupId(this.cptGroupId);
				this.groupProjectList = groupProjectList;
			},
			async updateGroupMemberList() {
				const { data: groupMemberList } = await _api.yapi.groupGetMemberListBy(
					this.cptGroupId
				);
				this.groupMemberList = groupMemberList;
			}
		},
		computed: {
			cptGroupId: {
				get() {
					const { path, query } = this.$route;
					const { groupId } = query || {};

					if (_.isEmpty(this.groupList)) {
						this.updateGroupList();
					}
					return groupId || undefined;
				}
			},
			cptCurrentGroup() {
				if (this.cptGroupId && this.groupList.length) {
					return _.find(this.groupList, { _id: Number(this.cptGroupId) });
				}
				return false;
			},
			cptProjectId() {
				return this.$route.query.projectId;
			},
			cptProject() {
				if (this.cptProjectId && this.groupProjectList?.length) {
					const projectItem = _.find(this.groupProjectList, {
						_id: Number(this.cptProjectId)
					});
					return projectItem;
				}
				return false;
			},
			cptInterfaceId() {
				return this.$route.query.interfaceId;
			}
		},
		watch: {
			"$route.path": {
				immediate: true,
				async handler() {
					const res = await this.refreshUserInfo();
					console.log("🚀 ~ this.refreshUserInfo ~ res:", res);
				}
			}
		}
	});

	return rootApp;
}
</script>

<style lang="less">
:root {
	// --xItem-wrapper-width: 240px;
}

.flash-when {
	transition:
		opacity,
		transform 0.3s ease-in-out;

	&.loading {
		opacity: 0.3;
		transform: scale(0.99);
	}
}

html.x-yapi-app {
	color-scheme: light;
	--el-color-white: #ffffff;
	--el-color-black: #000000;
	// --el-color-primary: #00695e;
	// --el-color-primary-hover: #80b4af;
	// --el-color-primary-active: #00695e;
	// --el-color-primary-light-3: #4d968e;
	// --el-color-primary-light-5: #80b4af;
	// --el-color-primary-light-7: #b3d2cf;
	// --el-color-primary-light-8: #cce1df;
	// --el-color-primary-light-9: #e6f0ef;
	// --el-color-primary-dark-2: #00544b;
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
	--dialog-bg-color: var(--el-button-hover-bg-color);
	--active-color: var(--el-color-primary);
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
