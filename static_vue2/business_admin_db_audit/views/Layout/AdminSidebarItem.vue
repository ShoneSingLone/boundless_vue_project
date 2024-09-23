<style lang="less">
.sidebar-container {
	.el-menu--collapse.el-menu {
		.AdminSidebarItem {
			&.is-active {
				border-radius: 0;
			}

			svg {
				margin-left: -4px;
				margin-right: 32px;
			}
		}
	}
}

.AdminSidebarItem {
	.el-submenu__title,
	.el-menu-item,
	svg {
		color: var(--el-color-primary);
	}
	&.is-active {
		// --xMenu-color-is-active: #fff;
		svg {
			color: #fff;
		}
		background-color: var(--el-color-primary);
		border-radius: 6px;
		width: 295px;
		margin: 0 auto;

		.el-menu-item {
			&.is-active {
				color: #fff;
				svg {
					color: #fff;
				}

				&:focus {
					color: #fff;
					svg {
						color: #fff;
					}
					background-color: var(--el-color-primary);
					border-radius: 6px;
					outline: 0;
				}
			}

			&:hover {
				color: var(--el-color-primary);
				svg {
					color: var(--el-color-primary);
				}
				background-color: #ecf5ff;
				border-radius: 6px;
				outline: 0;
			}
		}
	}
}
</style>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		provide() {
			return {
				rootAdminSidebarItem: this
			};
		},
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
				onlyOneChild: {},
				isActive: false
			};
		},
		computed: {
			cptClass() {
				return ["AdminSidebarItem", { "is-active": this.isActive }];
			},
			cptIsCollapse() {
				return this.APP.sidebar.isCollapse;
			},
			cptIsShowAsLink() {
				return !_.$isInput(this.item.children);
			}
		},
		methods: {
			vIcon(item) {
				const iconName = item.icon;
				if (!iconName) {
					return null;
				}
				return h("xIcon", {
					class: "mr8",
					style: "width:24px;height:24px;",
					attrs: {
						useCurrentColor: true
					},
					icon: item.icon
				});
			},
			vMenuTitle(item) {
				return item.label;
			},
			genSubmenu() {
				const { item, vMenuTitle, vIcon } = this;
				return h("xSubMenu", {
					ref: "subMenu",
					attrs: {
						index: item.href,
						teleported: ""
					},
					$vSlots: {
						title: () => {
							return [vIcon(item), vMenuTitle(item)];
						},
						default: () =>
							_.map(item.children, (child, index) => {
								return h("AdminSidebarItem", {
									level: this.level + 1,
									key: child.href + index,
									staticClass: "nest-menu",
									attrs: {
										"is-nest": true,
										item: child
									}
								});
							})
					}
				});
			},
			genAdminAppLink() {
				const {
					item,
					resolvePath,
					resolveScopedSlots,
					isNest,
					vMenuTitle,
					vIcon,
					level,
					cptIsCollapse
				} = this;
				const vm = this;
				return h(
					"AdminAppLink",
					{
						to: resolvePath(item.href)
					},
					[
						h(
							"xMenuItem",
							{
								class: {
									"submenu-title-noDropdown": !isNest
								},
								item,
								scopedSlots: resolveScopedSlots(
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
								),
								onActivechange({ isActive, index }) {
									vm.isActive = isActive;
								}
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
			resolvePath(routePath) {
				return routePath;
			}
		},
		render(h) {
			const { level, cptClass } = this;
			return h("div", {
				class: cptClass,
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
