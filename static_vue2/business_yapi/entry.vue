<script lang="ts">
export default async function () {
	await Promise.all([
		_.$importVue("/common/ui-x/useXui.vue"),
		_.$importVue("/common/ui-element/useElementUI.vue", {
			size: "small",
			I18N_LANGUAGE: window.I18N_LANGUAGE
		})
	]);

	await _.$importVue("@/yapi.defaul.style.vue");
	_.each(
		{
			YapiItemAvatar: "@/components/YapiItemAvatar.vue",
			YapiItemUac: "@/components/YapiItemUac.vue",
			YapiProjectCard: "@/components/YapiProjectCard.vue",
			YapiPlaceholderView: "@/components/YapiPlaceholderView.vue"
		},
		(componentURL, name) => Vue.component(name, () => _.$importVue(componentURL))
	);

	/* app entry  */
	const [VueRouter, routes] = await _.$importVue([
		"/common/libs/VueRouter.vue",
		"@/router/routes.vue",
		/*常量*/
		"@/utils/var.vue",
		/*接口*/
		"@/utils/api.vue",
		/*校验规则*/
		"/common/utils/rules.vue",
		/*枚举选项*/
		"@/utils/utils.vue"
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
			async refreshUserInfo() {
				try {
					const { data: userInfo } = await _api.yapi.getUserStatus();
					if (userInfo?._id) {
						this._setUser(userInfo);
						/* TODO: 跳转到首页 或者note应用*/
						await this.ifUrlNoGroupIdGetAndAddIdToUrl();
						if (this.cptProjectId) {
							await this.updateGroupProjectList();
						}
						if (this.$route.path === "/login") {
							this.$router.push("/api/group");
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
			async logoutActions() {
				try {
					const { data } = await _api.yapi.postUserLogout();
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
				const { data: groupMemberList } = await _api.yapi.groupGetMemberListBy(this.cptGroupId);
				this.groupMemberList = groupMemberList;
			}
		},
		computed: {
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
				if (this.cptProjectId && this.groupProjectList.length) {
					const projectItem = _.find(this.groupProjectList, { _id: Number(this.cptProjectId) });
					return projectItem;
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
			}
		}
	});
}
</script>
