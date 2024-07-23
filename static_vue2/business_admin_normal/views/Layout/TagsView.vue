<style lang="less">
.tags-view-container {
	height: 34px;
	width: 100%;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow:
		0 1px 3px 0 rgba(0, 0, 0, 0.12),
		0 0 3px 0 rgba(0, 0, 0, 0.04);
	.tags-view-wrapper {
		.tags-view-item {
			display: inline-block;
			position: relative;
			cursor: pointer;
			height: 26px;
			line-height: 26px;
			border: 1px solid #d8dce5;
			color: #495060;
			background: #fff;
			padding: 0 8px;
			font-size: 12px;
			margin-left: 5px;
			&:first-of-type {
			}
			&:last-of-type {
			}
		}

		.active {
			> .tags-view-item {
				background-color: var(--el-color-primary);
				color: #fff;
				border-color: var(--el-color-primary);
				&::before {
					content: "";
					background: #fff;
					display: inline-block;
					width: 8px;
					height: 8px;
					border-radius: 50%;
					position: relative;
					margin-right: 2px;
				}
			}
		}
	}
	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
			&:hover {
				background: #eee;
			}
		}
	}
}
</style>
<template>
	<div id="tags-view-container" class="tags-view-container flex middle">
		<TagsViewScrollPane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
			<div
				v-for="tag in visitedViews"
				:class="{ active: isActive(tag), 'flex middle': true }"
				:key="tag.path">
				<RouterLink
					ref="tag"
					:to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
					tag="span"
					class="tags-view-item pointer"
					:style="activeStyle(tag)"
					@click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
					@contextmenu.prevent.native="openMenu(tag, $event)">
					{{ tag.title }}
					<span
						v-if="!isAffix(tag)"
						class="el-icon-close"
						@click.prevent.stop="closeSelectedTag(tag)" />
				</RouterLink>
			</div>
		</TagsViewScrollPane>
		<ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
			<li @click="refreshSelectedTag(selectedTag)">
				<i class="el-icon-refresh-right"></i> 刷新页面
			</li>
			<li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
				<i class="el-icon-close"></i> 关闭当前
			</li>
			<li @click="closeOthersTags"><i class="el-icon-circle-close"></i> 关闭其他</li>
			<li v-if="!isFirstView()" @click="closeLeftTags">
				<i class="el-icon-back"></i> 关闭左侧
			</li>
			<li v-if="!isLastView()" @click="closeRightTags">
				<i class="el-icon-right"></i> 关闭右侧
			</li>
			<li @click="closeAllTags(selectedTag)">
				<i class="el-icon-circle-close"></i> 全部关闭
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			TagsViewScrollPane: () => _.$importVue("@/components/TagsViewScrollPane.vue")
		},
		data() {
			return {
				visible: false,
				top: 0,
				left: 0,
				selectedTag: {},
				affixTags: []
			};
		},
		computed: {
			visitedViews() {
				return this.APP.tagsView.state.visitedViews;
			},
			routes() {
				return this.APP.permission.state.routes;
			},
			theme() {
				return this.APP.settings.theme;
			}
		},
		watch: {
			$route() {
				this.addTags();
				this.moveToCurrentTag();
			},
			visible(value) {
				if (value) {
					document.body.addEventListener("click", this.closeMenu);
				} else {
					document.body.removeEventListener("click", this.closeMenu);
				}
			}
		},
		mounted() {
			this.initTags();
			this.addTags();
		},
		methods: {
			isActive(route) {
				return route.path === this.$route.path;
			},
			activeStyle(tag) {
				if (!this.isActive(tag)) return {};
				return {
					"background-color": this.theme,
					"border-color": this.theme
				};
			},
			isAffix(tag) {
				return tag.meta && tag.meta.affix;
			},
			isFirstView() {
				try {
					return (
						this.selectedTag.fullPath === "/index" ||
						this.selectedTag.fullPath === this.visitedViews[1].fullPath
					);
				} catch (err) {
					return false;
				}
			},
			isLastView() {
				try {
					return (
						this.selectedTag.fullPath ===
						this.visitedViews[this.visitedViews.length - 1].fullPath
					);
				} catch (err) {
					return false;
				}
			},
			filterAffixTags(routes, basePath = "/") {
				let tags = [];
				routes.forEach(route => {
					if (route.meta && route.meta.affix) {
						const tagPath = [basePath, route.path].join("");

						tags.push({
							fullPath: tagPath,
							path: tagPath,
							name: route.name,
							meta: { ...route.meta }
						});
					}
					if (route.children) {
						const tempTags = this.filterAffixTags(route.children, route.path);
						if (tempTags.length >= 1) {
							tags = [...tags, ...tempTags];
						}
					}
				});
				return tags;
			},
			initTags() {
				const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
				for (const tag of affixTags) {
					// Must have tag name
					if (tag.name) {
						this.APP.tagsView.addVisitedView(tag);
					}
				}
			},
			addTags() {
				const { name } = this.$route;
				if (name) {
					this.APP.tagsView.addView(this.$route);
					if (this.$route.meta.link) {
						this.APP.tagsView.addIframeView(this.$route);
					}
				}
				return false;
			},
			moveToCurrentTag() {
				const tags = this.$refs.tag;
				this.$nextTick(() => {
					for (const tag of tags) {
						if (tag.to.path === this.$route.path) {
							this.$refs.scrollPane.moveToTarget(tag);
							// when query is different then update
							if (tag.to.fullPath !== this.$route.fullPath) {
								this.APP.tagsView.updateVisitedView(this.$route);
							}
							break;
						}
					}
				});
			},
			refreshSelectedTag(view) {
				this.APP.tagsView.refreshPage(view);
				if (this.$route.meta.link) {
					this.APP.tagsView.delIframeView(this.$route);
				}
			},
			closeSelectedTag(view) {
				this.APP.tagsView.closePage(view).then(({ visitedViews }) => {
					if (this.isActive(view)) {
						this.toLastView(visitedViews, view);
					}
				});
			},
			closeRightTags() {
				this.APP.tagsView.closeRightPage(this.selectedTag).then(visitedViews => {
					if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
						this.toLastView(visitedViews);
					}
				});
			},
			closeLeftTags() {
				this.APP.tagsView.closeLeftPage(this.selectedTag).then(visitedViews => {
					if (!visitedViews.find(i => i.fullPath === this.$route.fullPath)) {
						this.toLastView(visitedViews);
					}
				});
			},
			closeOthersTags() {
				this.$router.push(this.selectedTag.fullPath).catch(() => {});
				this.APP.tagsView.closeOtherPage(this.selectedTag).then(() => {
					this.moveToCurrentTag();
				});
			},
			closeAllTags(view) {
				this.APP.tagsView.closeAllPage().then(({ visitedViews }) => {
					if (this.affixTags.some(tag => tag.path === this.$route.path)) {
						return;
					}
					this.toLastView(visitedViews, view);
				});
			},
			toLastView(visitedViews, view) {
				const latestView = _.last(visitedViews);
				if (latestView) {
					this.$router.push(latestView.fullPath);
				} else {
					// now the default is to redirect to the home page if there is no tags-view,
					// you can adjust it according to your needs.
					if (view.name === "Dashboard") {
						// to reload home page
						this.$router.replace({ path: "/redirect" + view.fullPath });
					} else {
						this.$router.push("/");
					}
				}
			},
			openMenu(tag, e) {
				const menuMinWidth = 105;
				const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
				const offsetWidth = this.$el.offsetWidth; // container width
				const maxLeft = offsetWidth - menuMinWidth; // left boundary
				const left = e.clientX - offsetLeft + 15; // 15: margin right

				if (left > maxLeft) {
					this.left = maxLeft;
				} else {
					this.left = left;
				}

				this.top = e.clientY;
				this.visible = true;
				this.selectedTag = tag;
			},
			closeMenu() {
				this.visible = false;
			},
			handleScroll() {
				this.closeMenu();
			}
		}
	});
}
</script>
