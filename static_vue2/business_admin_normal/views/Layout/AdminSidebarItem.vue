<style lang="less"></style>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			AdminAppLink: () => _.$importVue("@/components/AdminAppLink.vue")
		},
		props: {
			// route object
			item: {
				type: Object,
				required: true
			},
			isNest: {
				type: Boolean,
				default: false
			},
			basePath: {
				type: String,
				default: ""
			},
			level: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				onlyOneChild: {}
			};
		},
		computed: {
			cptIsCollapse() {
				return this.APP.sidebar.isCollapse;
			},
			cptIsShowAsLink() {
				return (
					this.hasOneShowingChild(this.item.children, this.item) &&
					(!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) &&
					!this.item.alwaysShow
				);
			}
		},
		methods: {
			vIcon(item) {
				const iconName = this.onlyOneChild.meta?.icon || item.meta?.icon;
				if (!iconName) {
					return null;
				}
				return h("xIcon", {
					class: "mr8",
					attrs: {
						useCurrentColor: true
					},
					icon: this.getIconUrl(iconName)
				});
			},
			vMenuTitle(item) {
				if (this.level === 0 && this.cptIsCollapse) {
					return null;
				}

				const title = item.meta?.title || this.onlyOneChild.meta?.title;
				// if (title === "登录日志") { debugger; }

				if (!title) {
					return null;
				}

				const titleProps = {
					staticClass: "menu-title"
				};

				const titleTips = this.isNeedSetTitle(title);

				if (titleTips) {
					titleProps.title = titleTips;
				}

				return h("span", titleProps, [title]);
			},
			getIconUrl(url) {
				if (!url) {
					return "";
				}
				const icon = `_${url}`;
				return icon;
			},
			genSubmenu() {
				const { item, resolvePath, _u, _l, vMenuTitle, vIcon } = this;
				return h(
					"xSubMenu",
					{
						ref: "subMenu",
						attrs: {
							index: resolvePath(item.path),
							teleported: ""
						},
						scopedSlots: _u(
							[
								item.meta
									? {
											key: "title",
											fn: () => {
												return [vIcon(item), vMenuTitle(item)];
											},
											proxy: true
										}
									: null
							],
							null,
							true
						)
					},
					_l(item.children, (child, index) => {
						return h("AdminSidebarItem", {
							level: this.level + 1,
							key: child.path + index,
							staticClass: "nest-menu",
							attrs: {
								"is-nest": true,
								item: child,
								"base-path": resolvePath(child.path)
							}
						});
					})
				);
			},
			genAdminAppLink() {
				const {
					item,
					onlyOneChild,
					resolvePath,
					_u,
					isNest,
					vMenuTitle,
					vIcon,
					level,
					cptIsCollapse
				} = this;
				return h(
					"AdminAppLink",
					{
						vIf: onlyOneChild.meta,
						attrs: {
							to: resolvePath(onlyOneChild.path, onlyOneChild.query)
						}
					},
					[
						h(
							"xMenuItem",
							{
								class: {
									"submenu-title-noDropdown": !isNest
								},
								attrs: {
									index: resolvePath(onlyOneChild.path)
								},
								scopedSlots: _u(
									[
										{
											key: "title",
											fn: () => {
												if (cptIsCollapse && level === 0) {
													return null;
												} else {
													return [vMenuTitle(item)];
												}
											},
											proxy: true
										}
									],
									null,
									false,
									803820582
								)
							},
							[vIcon(item)]
						)
					]
				);
			},
			isNeedSetTitle(title) {
				if (title?.length > 5) {
					return title;
				} else {
					return "";
				}
			},
			resolvePath(routePath, routeQuery) {
				if (_.$isExternal(routePath)) {
					return routePath;
				}
				if (_.$isExternal(this.basePath)) {
					return this.basePath;
				}
				if (routeQuery) {
					let query = JSON.parse(routeQuery);
					return {
						path: _adminTools.getNormalPath(this.basePath + "/" + routePath),
						query: query
					};
				}
				return _adminTools.getNormalPath(this.basePath + "/" + routePath);
			},
			hasOneShowingChild(children = [], parent) {
				if (!children) {
					children = [];
				}
				const showingChildren = children.filter(item => {
					if (item.hidden) {
						return false;
					} else {
						// Temp set(will be used if only has one showing child)
						this.onlyOneChild = item;
						return true;
					}
				});

				// When there is only one child router, the child router is displayed by default
				if (showingChildren.length === 1) {
					return true;
				}

				// Show parent if there are no child router to display
				if (showingChildren.length === 0) {
					this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
					return true;
				}

				return false;
			}
		},
		render(h) {
			const { item, level } = this;
			return h("div", {
				vIf: !item.hidden,
				class: "AdminSidebarItem",
				attrs: {
					"data-level": level
				},
				children: (() => {
					if (this.cptIsShowAsLink) {
						return this.genAdminAppLink();
					} else {
						return this.genSubmenu();
					}
				})()
			});
		}
	});
}
</script>
