<style lang="less">
.NavbarBreadcrumb.app-breadcrumb.el-breadcrumb {
	display: inline-block;
	font-size: 14px;
	line-height: 50px;
	margin-left: 8px;

	.no-redirect {
		color: #97a8be;
		cursor: text;
	}
}
</style>
<script lang="ts">
export default async function () {
	return defineComponent({
		mounted() {
			this.getBreadcrumb();
		},
		data() {
			return { levelList: [] };
		},
		methods: {
			getBreadcrumb() {
				// only show routes with meta.title
				let matched = _.filter(this.$route.matched, item => item.meta?.title);
				const first = matched[0];
				// 判断是否为首页
				if (!this.isDashboard(first)) {
					matched = [{ path: "/index", meta: { title: "首页" } }].concat(matched);
				}
				const levelList = _.filter(
					matched,
					item => item.meta?.title && item.meta?.breadcrumb !== false
				);
				this.levelList = _.unionBy(levelList, item => item?.meta?.title);
			},
			isDashboard(route) {
				const name = route && route.name;
				if (!name) {
					return false;
				}
				return name.trim() === "Index";
			},
			handleLink(item) {
				const { redirect, path } = item;
				if (redirect) {
					this.$router.push(redirect);
					return;
				}
				this.$router.push(path);
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

			return h(
				"xBreadcrumb",
				{ staticClass: "NavbarBreadcrumb app-breadcrumb", separator: "/" },
				_.map(levelList, (item, index) => {
					let content = h(
						"a",
						{
							key: item.path,
							onClick($event) {
								$event.preventDefault();
								return handleLink(item);
							}
						},
						[item.meta.title]
					);

					if (item.redirect === "noRedirect" || index == levelList.length - 1) {
						content = h("span", { key: item.path, staticClass: "no-redirect" }, [
							item.meta.title
						]);
					}

					return h("xBreadcrumbItem", { key: index }, [content]);
				})
			);
		}
	});
}
</script>
