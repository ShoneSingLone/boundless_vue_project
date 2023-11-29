<script>
export default async function () {
	await Promise.all([
		_.$importVue("/common/ui-x/useXui.vue"),
		_.$importVue("/common/ui-element/useElementUI.vue", {
			size: "small",
			I18N_LANGUAGE: window.I18N_LANGUAGE
		})
	]);

	/* app entry  */
	const [VueRouter, routes, App] = await _.$importVue([
		"/common/libs/VueRouter.vue",
		"@/router/routes.vue",
		"@/layout/AppLayoutLevel.vue",
		/*常量*/
		"@/utils/var.vue"
		/*接口*/
		// "@/utils/api.vue",
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
			window.APP = this;
			$("body").removeClass("x-loading");
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
					loginWrapActiveKey: "1",
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
				currGroup: {
					_id: "",
					role: "",
					group_name: "",
					group_desc: "",
					custom_field1: {
						name: "",
						enable: false
					}
				},
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
			/* ************************methods************************ */
			_toggleFooterFold() {
				stateApp.isFooterFold = !stateApp.isFooterFold;
			},
			_setMenu(menu) {
				/* notice！！_.merge 空数组不会替换*/
				stateApp.menu = Object.assign({}, stateApp.menu, menu);
			},
			_setUser(user) {
				stateApp.user = xU.merge({}, stateApp.user, user);
			},
			_setNews(news) {
				stateApp.news = Object.assign({}, stateApp.news, news);
			},
			_setBreadcrumb(breadcrumb) {
				stateApp._setUser({ breadcrumb });
			},
			async _refreshUserInfo(userInfo = false) {
				try {
					if (!userInfo) {
						const res = await API.user.getUserStatus();
						const { data } = res;
						userInfo = data;
					} else {
						throw new Error("refreshUserInfo error");
					}

					stateApp._setUser({
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
					xU(error);
				}
			},
			async _checkLoginState() {
				if (stateApp.user.role && stateApp.user.isLogin) {
					return true;
				}
				await stateApp._refreshUserInfo();
				return stateApp.user.isLogin;
			},
			async _fetchGroupList() {
				try {
					const { data: groupList } = await API.group.mine();
					stateApp.groupList = groupList;
				} catch (error) {}
			},
			/**
			 * 如果group是对象，直接赋值，
			 * 如果是Id(可能不是数字),则需要request
			 * @param group_id
			 * @returns {Promise<void>}
			 */
			async _setCurrGroup(group_id) {
				try {
					if (!xU.isInput(group_id)) {
						stateApp.currGroup = {};
					}

					if (stateApp.currGroup._id === group_id) {
						return;
					}
					const { data: currGroup } = await API.group.getMyGroupBy(group_id);
					stateApp.currGroup = currGroup;
					await stateApp._fetchProjectList(currGroup._id);
				} catch (error) {
					xU(error);
				}
			},
			async _setCurrProject(project_id, options = {}) {
				try {
					let isEnforce = options.isEnforce || false;

					if (!xU.isInput(project_id)) {
						stateApp.currProject = {};
					}
					if (!isEnforce && stateApp.currProject._id === project_id) {
						return;
					}
					let { data } = await API.project.getProjectById(Number(project_id));
					stateApp.currProject = data;
				} catch (error) {
					xU(error);
				}
			},
			async _fetchNewsData({ id, type, page = 1, size = 10, selectValue = "" }) {
				try {
					const { data } = await API.news.getLogList({
						typeid: id,
						type,
						page,
						limit: size,
						selectValue
					});
					stateApp._setNews({
						curpage: 1,
						newsData: {
							total: data.total,
							list: xU.sortBy(data.list, (a, b) => {
								if (a && b) {
									return b.add_time - a.add_time;
								}
								return false;
							})
						}
					});
				} catch (error) {
					xU(error);
				}
			},
			async _changeStudyTip() {
				stateApp.user.studyTip++;
			},
			async _finishStudy() {
				stateApp._setUser({
					study: true,
					studyTip: 0
				});
			},
			async _logoutActions() {
				try {
					const { data } = await API.user.logoutActions();
					if (data === "ok") {
						lStorage["x_token"] = "";
						stateApp._setUser({
							isLogin: false,
							loginState: GUEST_STATUS,
							userName: null,
							uid: null,
							role: "",
							type: ""
						});
						cptRouter.value.go("/login");
						xU.notification.success(i18n("退出成功! "));
					}
				} catch (error) {
					xU(error);
				}
			},
			async _fetchInterfaceListMenu() {},
			async _fetchProjectList(groupId) {
				try {
					if (!groupId) return;
					groupId = Number(groupId);
					const res = await API.project.list(groupId);
					const { data } = res || {};
					stateApp.projectList = data.list;
					// xU("stateApp.projectList", stateApp.projectList);
				} catch (error) {
					xU(error);
				}
			},
			_getProject() {},
			async _changeMenuItem() {},
			async _loginActions() {},
			async _loginLdapActions() {},
			async _fetchGroupMemberList(groupId) {
				const { data: member } = await API.group.getMemberListBy(groupId);
				stateApp.currGroup.member = member;
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
					if (!stateApp.currProject.requestCode) {
						return () => "请在【项目设置-请求代码模板】设置模板";
					}
					return new Function("params", `return (${stateApp.currProject.requestCode})(params)`);
				} catch (error) {
					return () => null;
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
