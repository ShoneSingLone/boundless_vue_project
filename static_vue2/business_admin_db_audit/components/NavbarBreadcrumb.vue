<style lang="less">
.NavbarBreadcrumb.app-breadcrumb.el-breadcrumb {
	display: flex;
	font-size: 14px;
	line-height: 50px;
	margin-left: 8px;

	.no-redirect {
		cursor: text;
		&.level-0 {
			color: var(--el-text-color-primary);
			font-weight: 700;
		}
		&.level-last {
			color: #2878ff;
		}
	}
	.NavbarBreadcrumb-icon {
		width: 24px;
		height: 24px;
	}
}
</style>
<script lang="ts">
export default async function () {
	const MenuArray = await _.$importVue("@/router/MenuArray.vue");
	return defineComponent({
		mounted() {
			this.getBreadcrumb();
		},
		data() {
			return { levelList: [] };
		},
		methods: {
			traverse() {},
			getBreadcrumb() {
				// only show routes with meta.title
				let matched = (() => {
					const routeArray = String(this.$route.path).split("/");

					let currentPath = "";
					return _.reduce(
						routeArray,
						(_matched, path, index) => {
							if (path) {
								currentPath += `/${path}`;
								_matched[currentPath] = {};
							}

							return _matched;
						},
						{}
					);
				})();
				_.$traverse(MenuArray, node => {
					if (node.href) {
						if (matched[node.href]) {
							matched[node.href] = node;
						}
					}
				});
				matched = _.map(matched, node => node);
				matched.sort((before, after) => {
					return String(before.href).split("/").length <
						String(after.href).split("/").length
						? -1
						: 1;
				});
				this.levelList = matched;
			},
			handleLink(item) {
				const { redirect, path } = item;
				if (redirect) {
					this.$router.push(redirect);
					return;
				}
				this.$router.push({ path });
			}
		},
		watch: {
			"$route.path"(path) {
				// if you go to the redirect page, do not update the breadcrumbs
				if (path.startsWith("/redirect/")) {
					return;
				}
				this.getBreadcrumb();
			}
		},
		render(h) {
			const { _l, levelList, handleLink } = this;
			const xBreadcrumb = h(
				"xBreadcrumb",
				{
					staticClass: "NavbarBreadcrumb app-breadcrumb breadcrumb-container",
					separator: "|"
				},
				_.map(levelList, (item, index) => {
					let childrenArray = [
						h(
							"a",
							{
								key: item.href,
								onClick($event) {
									$event.preventDefault();
									return handleLink(item);
								}
							},
							[item.label]
						)
					];

					const isLast = index == levelList.length - 1;
					if (_.$isArrayFill(item.children) || isLast) {
						childrenArray = [
							h(
								"span",
								{
									key: item.href,
									class: [`no-redirect level-${index}`, { "level-last": isLast }]
								},
								[item.label]
							)
						];

						if (item.icon) {
							/* 添加ICON */
							childrenArray.unshift(
								h("xIcon", { icon: item.icon, class: "mr8 NavbarBreadcrumb-icon" })
							);
							childrenArray = [hDiv({ class: "flex middle" }, childrenArray)];
						}
					}

					return h("xBreadcrumbItem", { key: index }, childrenArray);
				})
			);
			return h(
				"div",
				{
					staticClass: "flex width100"
				},
				[xBreadcrumb, h("xGap", { attrs: { f: "" } })]
			);
		}
	});
}
</script>
