<script>
export default async function () {
	await Promise.all([
		_.$importVue("/common/ui-element/useElementUI.vue", {
			size: "small",
			I18N_LANGUAGE: window.I18N_LANGUAGE
		}),
		_.$importVue("/common/ui-x/useXui.vue")
	]);

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

	return new Vue({
		el: "#app",
		router,
		provide() {
			const stateApp = this;
			return {
				stateApp
			};
		},
		mounted() {
			this.checkMobile();
			this.checkUserIsLogin();
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
					canRegister: true,
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
				groupList: [],
				projectList: [],
				currProject: {
					currPage: "",
					userInfo: "",
					tableLoading: "",
					requestCode: ""
				}
			};
		},
		render(h) {
			return h(App);
		},
		methods: {
			async checkUserIsLogin() {
				try {
					const { data: user } = await Vue._api.getUserStatus();
					this._setUser(user);
					/* TODO: 跳转到首页 或者note应用*/
					this.$router.push({ path: "/api/group" });
				} catch (error) {
					/* 未登录，跳转登录界面 */
					this.$router.push("/login");
				} finally {
					setTimeout(() => {
						$("body").removeClass("x-loading");
					}, 1000);
				}
			},
			checkMobile() {
				if (this.isMobile) {
					$("body").addClass("app-mobile");
				}
			},
			/* ************************methods************************ */
			_toggleFooterFold() {
				this.isFooterFold = !this.isFooterFold;
			},
			_setMenu(menu) {
				/* notice！！_.merge 空数组不会替换*/
				this.menu = Object.assign({}, this.menu, menu);
			},
			_setUser(user) {
				this.user = _.merge({}, this.user, user);
			},
			_setNews(news) {
				this.news = Object.assign({}, this.news, news);
			},
			_setBreadcrumb(breadcrumb) {
				this._setUser({ breadcrumb });
			},
			async _refreshUserInfo(userInfo = false) {
				try {
					if (!userInfo) {
						const res = await Vue._api.UserGetUserStatus();
						const { data } = res;
						userInfo = data;
					} else {
						throw new Error("refreshUserInfo error");
					}

					this._setUser({
						...userInfo,
						isLogin: !!userInfo._id,
						isLDAP: userInfo.ladp,
						canRegister: userInfo.canRegister,
						role: userInfo ? userInfo.role : null,
						loginState: !!userInfo._id ? MEMBER_STATUS : GUEST_STATUS,
						userName: userInfo ? userInfo.username : null,
						uid: userInfo ? userInfo._id : null,
						type: userInfo ? userInfo.type : null,
						study: userInfo ? userInfo.study : false
					});
				} catch (error) {
					_.$msgError(error);
				}
			},
			async _checkLoginState() {
				if (this.user.role && this.user.isLogin) {
					return true;
				}
				await this._refreshUserInfo();
				return this.user.isLogin;
			},
			async getUserAllGroup() {
				try {
					const { data: groupList } = await Vue._api.groupMine();
					this.groupList = groupList;
				} catch (error) {
					_.$msgError(error);
				}
			},
			/**
			 * 如果group是对象，直接赋值，
			 * 如果是Id(可能不是数字),则需要request
			 * @param group_id
			 * @returns {Promise<void>}
			 */
			async _setcptCurrentGroup(group_id) {
				try {
					if (!_.$isInput(group_id)) {
						this.cptCurrentGroup = {};
					}
					if (this.cptCurrentGroup._id === group_id) {
						return;
					}
					const { data: cptCurrentGroup } = await Vue._api.groupGetMyGroupBy(group_id);
					this.cptCurrentGroup = cptCurrentGroup;
					await this._fetchProjectList(cptCurrentGroup._id);
				} catch (error) {
					_.$msgError(error);
				}
			},
			async _setCurrProject(project_id, options = {}) {
				try {
					let isEnforce = options.isEnforce || false;

					if (!_.$isInput(project_id)) {
						this.currProject = {};
					}
					if (!isEnforce && this.currProject._id === project_id) {
						return;
					}
					let { data } = await Vue._api.ProjectGetProjectById(Number(project_id));
					this.currProject = data;
				} catch (error) {
					_.$msgError(error);
				}
			},
			async _fetchNewsData({ id, type, page = 1, size = 10, selectValue = "" }) {
				try {
					const { data } = await Vue._api.NewsGetLogList({
						typeid: id,
						type,
						page,
						limit: size,
						selectValue
					});
					this._setNews({
						curpage: 1,
						newsData: {
							total: data.total,
							list: _.sortBy(data.list, (a, b) => {
								if (a && b) {
									return b.add_time - a.add_time;
								}
								return false;
							})
						}
					});
				} catch (error) {
					_.$msgError(error);
				}
			},
			async _changeStudyTip() {
				this.user.studyTip++;
			},
			async _finishStudy() {
				this._setUser({
					study: true,
					studyTip: 0
				});
			},
			async _logoutActions() {
				try {
					const { data } = await Vue._api.UserLogoutActions();
					if (data === "ok") {
						lStorage["x_token"] = "";
						this._setUser({
							isLogin: false,
							loginState: GUEST_STATUS,
							userName: null,
							uid: null,
							role: "",
							type: ""
						});
						cptRouter.value.go("/login");
						_.notification.success(i18n("退出成功! "));
					}
				} catch (error) {
					_.$msgError(error);
				}
			},
			async _fetchInterfaceListMenu() {},
			async _fetchProjectList(groupId) {
				try {
					if (!groupId) return;
					groupId = Number(groupId);
					const res = await Vue._api.ProjectList(groupId);
					const { data } = res || {};
					this.projectList = data.list;
					// xU("this.projectList", this.projectList);
				} catch (error) {
					_.$msgError(error);
				}
			},
			_getProject() {},
			async _changeMenuItem() {},
			async _loginActions() {},
			async _loginLdapActions() {},
			async _fetchGroupMemberList(groupId) {
				const { data: member } = await Vue._api.GroupGetMemberListBy(groupId);
				this.cptCurrentGroup.member = member;
				return member;
			},
			async _addMember(data) {
				return API.group.addMember(data);
			},
			async _delMember(data) {
				return API.group.delMember(data);
			},
			async _changeMemberRole(data) {
				return API.group.changeMemberRole(data);
			},
			async _fetchMoreNews() {},
			async _fetchInterfaceList() {},
			async _addProject() {},
			async _delProject() {},
			async _changeUpdateModal() {},
			_checkProjectName() {},
			_loginTypeAction() {},
			_returnRequestCode() {
				try {
					if (!this.currProject.requestCode) {
						return () => "请在【项目设置-请求代码模板】设置模板";
					}
					return new Function("params", `return (${this.currProject.requestCode})(params)`);
				} catch (error) {
					return () => null;
				}
			}
		},
		computed: {
			cptCurrentGroup() {
				/* {
					_id: "",
					role: "",
					group_name: "",
					group_desc: "",
					custom_field1: {
						name: "",
						enable: false
					}
				} */
				if (this.$route.query.groupId && this.groupList.length) {
					return _.find(this.groupList, { _id: Number(this.$route.query.groupId) });
				}
				return false;
			}
		},
		watch: {
			groupList: {
				immediate: true,
				handler(groupList) {
					if (groupList.length) {
						this.$router.push({
							path: this.$route.path,
							query: {
								...this.$route.query,
								groupId: _.first(groupList)._id
							}
						});
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
</style>
