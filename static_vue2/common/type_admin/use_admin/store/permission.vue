<script lang="ts">
export default async function () {
	return {
		useAppPermission({ DYNAMIC_ROUTES, CONSTANT_ROUTES, rootApp, ROUTE_NOT_FOUD }) {
			const state = reactive({
				/* 所有路由 */
				routes: [],
				/* 追加的路由 */
				routes_append: [],
				routes_default: [],
				routes_topbar: [],
				routes_sidebar: []
			});

			return {
				state,
				appendRoutes(routes) {
					state.routes = CONSTANT_ROUTES.concat(routes);
					state.routes_append = routes;
					rootApp.$router.addRoutes(routes);
				},
				setRoutes_sidebar(routes) {
					state.routes_sidebar = CONSTANT_ROUTES.concat(routes);
				},
				async generateRoutes() {
					const auth = await _.$importVue("/common/type_admin/use_admin/auth.vue", {
						rootApp
					});

					const { permission: storePermission } = rootApp;

					const filterDynamicRoutes = () => {
						return _.reduce(
							DYNAMIC_ROUTES,
							(_routes, route) => {
								if (route.permissions) {
									if (auth.hasPermiOr(route.permissions)) {
										_routes.push(route);
									}
								} else if (route.roles) {
									if (auth.hasRoleOr(route.roles)) {
										_routes.push(route);
									}
								}
								return _routes;
							},
							[]
						);
					};

					const flattenChildren = (routesArray, parentRoute = null) => {
						var flattenRoutes = _.reduce(
							routesArray,
							(_flattenRoutes, route) => {
								if (parentRoute) {
									route.path = parentRoute.path + "/" + route.path;
									if (_.$isArrayFill(route.children)) {
										_flattenRoutes = _flattenRoutes.concat(
											flattenChildren(route.children, route)
										);
									}
								} else if (_.$isArrayFill(route.children)) {
									if (route.component === "ParentView") {
										_.each(route.children, childRoute => {
											childRoute.path = route.path + "/" + childRoute.path;
											if (childRoute.children && childRoute.children.length) {
												_flattenRoutes = _flattenRoutes.concat(
													flattenChildren(childRoute.children, childRoute)
												);
											}
											_flattenRoutes.push(childRoute);
										});
									}
								}
								_flattenRoutes = _flattenRoutes.concat(route);
								return _flattenRoutes;
							},
							[]
						);
						return flattenRoutes;
					};

					// 遍历后台传来的路由字符串，转换为组件对象
					const filterRoutes = (asyncRoutes, parentRoute = null, type = false) => {
						/* 过滤为树结构 */
						return _.filter(asyncRoutes, route => {
							if (route.children) {
								route.children = flattenChildren(route.children);
							}

							if (route.component) {
								// Layout ParentView 组件特殊处理
								if (route.component === "Layout") {
									route.componentFlag = "Layout";
									route.component = () =>
										_.$importVue("@/views/Layout/Layout.vue");
								} else if (route.component === "ParentView") {
									route.componentFlag = "ParentView";
									route.component = () =>
										_.$importVue("@/views/Layout/ParentView.vue");
								} else if (route.component === "InnerLink") {
									route.componentFlag = "InnerLink";
									route.component = () =>
										_.$importVue("@/views/Layout/InnerLink.vue");
								} else {
									const ROUTE_COMPONENT = route.component;
									console.log("route.component", ROUTE_COMPONENT);
									if (_.isString(ROUTE_COMPONENT)) {
										route.component = () =>
											_.$importVue(`@/views/${ROUTE_COMPONENT}.vue`);
									} else if (_.isFunction(ROUTE_COMPONENT)) {
									} else {
										debugger;
									}
								}
							}
							if (_.$isArrayFill(route.children)) {
								route.children = filterRoutes(route.children, route);
							} else {
								delete route["children"];
								delete route["redirect"];
							}
							return true;
						});
					};

					_.$loading(true);
					try {
						// 向后端请求路由数据
						const res = await _api.adminNormal.getRouters();
						const routes_append = filterRoutes(res.data);
						const routes_dynamic = filterDynamicRoutes();
						storePermission.appendRoutes([
							...routes_append,
							...routes_dynamic,
							ROUTE_NOT_FOUD
						]);
						/* 菜单用 */
						storePermission.setRoutes_sidebar(state.routes);
					} catch (error) {
						console.error(error);
					} finally {
						_.$loading(false);
					}
				}
			};
		}
	};
}
</script>
