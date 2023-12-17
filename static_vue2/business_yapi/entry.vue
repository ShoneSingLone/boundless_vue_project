<script>
export default async function () {
	await Promise.all([
		_.$importVue("/common/ui-element/useElementUI.vue", {
			size: "small",
			I18N_LANGUAGE: window.I18N_LANGUAGE
		})
	]);

	await _.$importVue("/common/ui-x/useXui.vue");

	/*anxin应用用到的组件*/
	_.each(
		{
			YapiItemUac: "@/components/YapiItemUac.vue",
			YapiProjectCard: "@/components/YapiProjectCard.vue",
			YapiPlaceholderView: "@/components/YapiPlaceholderView.vue"
		},
		(componentURL, name) => Vue.component(name, () => _.$importVue(componentURL))
	);

	/* app entry  */
	const [VueRouter, routes, App] = await _.$importVue([
		"/common/libs/VueRouter.vue",
		"@/router/routes.vue",
		"@/layout/AppLayoutLevel.vue",
		/*常量*/
		"@/utils/var.vue",
		/*接口*/
		"@/utils/api.vue",
		/*校验规则*/
		"/common/utils/rules.vue"
		/*枚举选项*/
		// "@/utils/opts.vue",
		/*工具函数*/
		// "@/utils/helper.vue",
		/*复用组件*/
		// "@/utils/reuse.vue"
		/*通用下拉项*/
	]);

	const router = new VueRouter({ routes });
	const LOADING_STATUS = 0;
	const GUEST_STATUS = 1;
	const MEMBER_STATUS = 2;
	/*  */
	_.$yapiRouter = router;
	return new Vue({
		el: "#app",
		router,
		provide() {
			const APP = this;
			return {
				APP
			};
		},
		mounted() {
			this.initMobileModel();
			this.refreshUserInfo();
		},
		data() {
			return {
				isMobile: /Mobile/gi.test(window.navigator.userAgent),
				useMobileView: true,
				BASE_URL: window.__BASE_URL || window.location.origin,
				expandedKeys: {
					group: []
				},
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
					userName: null,
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
				projectList: []
			};
		},
		render(h) {
			return h(App);
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
			async refreshUserInfo() {
				try {
					const { data: userInfo } = await Vue._yapi_api.getUserStatus();
					if (userInfo?._id) {
						this._setUser(userInfo);
						/* TODO: 跳转到首页 或者note应用*/
						if (!this.cptGroupId) {
							this.$router.push({ path: "/api/group" });
						}
					}
				} catch (error) {
					/* 未登录，跳转登录界面 */
					this.$router.push("/login");
				} finally {
					setTimeout(() => {
						$("body").removeClass("x-loading");
					}, 1000);
				}
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
			_setUser(userInfo) {
				const isLogin = !!userInfo._id;
				this.user = {
					...userInfo,
					isLogin,
					isLDAP: !!userInfo.ladp,
					role: userInfo ? userInfo.role : null,
					loginState: isLogin ? MEMBER_STATUS : GUEST_STATUS,
					userName: userInfo ? userInfo.username : null,
					uid: userInfo ? isLogin : null,
					type: userInfo ? userInfo.type : null,
					study: userInfo ? userInfo.study : false
				};
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

				if (!this.cptGroupId) {
					const firstGroup = _.first(this.groupList);

					if (firstGroup) {
						this.routerUpsertQuery({ groupId: firstGroup._id });
					}
				}
			},
			async updateGroupList() {
				let { data: groupList } = await Vue._yapi_api.groupMine();
				this.groupList = groupList;
			},
			async logoutActions() {
				try {
					const { data } = await Vue._yapi_api.postUserLogout();
					if (data === "ok") {
						_.$lStorage.x_token = "";
						this._setUser({
							isLogin: false,
							loginState: GUEST_STATUS,
							userName: null,
							uid: null,
							role: "",
							type: ""
						});
						this.$router.push("/login");
						_.$msgSuccess(i18n("退出成功! "));
					}
				} catch (error) {
					_.$msgError(error);
				}
			}
		},
		computed: {
			cptAvatarUrl() {
				return `${window._URL_PREFIX}/api/user/avatar?uid=${this.user._id}`;
			},
			cptGroupId() {
				return this.$route.query.groupId;
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
				if (this.cptProjectId && this.projectList.length) {
					return _.find(this.projectList, { _id: Number(this.cptProjectId) });
				}
				return false;
			}
		},
		watch: {
			groupList: {
				immediate: true,
				handler(groupList) {
					if (groupList.length) {
						if (!this.cptGroupId) {
							this.routerUpsertQuery({ groupId: _.first(groupList)._id });
						}
					}
				}
			},
			cptGroupId: {
				immediate: true,
				async handler(groupId) {
					if (groupId) {
						try {
							const {
								data: { list: projectList }
							} = await Vue._yapi_api.getProjectByGroupId(groupId);
							this.projectList = projectList;
						} catch (error) {
							console.error(error);
						}
					}
				}
			}
		}
	});
}
</script>
<style lang="less">
:root {
	--color-white: white;
}

.x-sider_wrapper {
	height: 100%;
	width: 300px;
	overflow: hidden;
	flex-flow: column nowrap;
	display: flex;

	.resize_bar {
		&:hover {
			cursor: ew-resize;
		}
		position: absolute;
		top: 40px;
		bottom: 0;
		right: 0;
		width: var(--app-padding);
	}
}
.x-sider_wrapper_tree {
	height: 100px;
	flex: 1;
	padding: var(--app-padding);

	.el-tree-node__content {
		&:hover {
			background-color: var(--el-color-primary-light-9);
		}
	}

	[role="treeitem"] {
	}

	.el-tree-treenode {
		width: 100%;
		font-size: 14px;

		span {
			transition: 0.3s all ease-in-out;
		}

		span[title] {
			flex: 1;
		}

		.el-tree-node-content-wrapper {
			padding: 0;

			[data-interface-all-menu] {
				transform: translateX(-32px);
			}
		}
	}
}
</style>
