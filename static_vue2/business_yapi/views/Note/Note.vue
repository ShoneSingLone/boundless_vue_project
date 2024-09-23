<template>
	<section id="ViewNote" :class="cptNoteClass">
		<AppHeader v-if="cptIsShowAppHeaderComponent" />
		<div v-if="APP.isMobile" class="flex1-overflow-auto flex vertical">
			<xAdvancedSearch
				mountTo="#MobileMenu"
				v-model="isCollapse"
				:label="false"
				:mountProps="cptMountProps"
				:style="cptToggleStyle">
				<xGap t />
				<NoteAside class="width100 flex1 height100" />
			</xAdvancedSearch>
			<div id="MobileMenu"></div>
			<NoteSection style="width: 100%; height: 1px" v-show="isCollapse" />
		</div>
		<div v-else class="flex1-overflow-auto flex">
			<NoteAside v-show="!isShowEditor" />
			<NoteSection />
		</div>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			AppHeader: () => _.$importVue("@/views/Api/Header/ApiHeader.vue"),
			NoteAside: () => _.$importVue("@/views/Note/NoteAside.vue"),
			NoteSection: () => _.$importVue("@/views/Note/NoteSection.vue")
		},
		async mounted() {
			(() => {
				const TITLE_MAP = {
					private: "个人可见",
					all: "所有人可见"
				};
				const title = TITLE_MAP[this.cptBelongType];
				title && (document.title = `文档-${title}`);
			})();

			await this.updateWikiMenuList();
			await this.updateCurrentWiki();
		},
		provide() {
			const inject_note = this;
			return {
				inject_note
			};
		},
		data() {
			const vm = this;
			vm.updateCurrentWiki = _.debounce(async function updateCurrentWiki(callback = false) {
				_.$loading(true);
				$(".flash-when").addClass("loading");
				try {
					if (!_.$isInput(vm.$route.query.wiki)) {
						return;
					}
					const res = await _api.yapi.wikiDetail({ _id: vm.$route.query.wiki });
					if (!res.errcode) {
						vm.currentWiki = res.data;
						callback && callback();
					}
				} catch (error) {
					console.error(error);
					_.$msgError(error);
				} finally {
					_.$loading(false);
					setTimeout(() => {
						$(".flash-when").removeClass("loading");
					}, 300);
				}
			}, 300);

			return {
				isCollapse: true,
				treeData: [],
				currentWiki: {},
				expandedKeys: [],
				isShowEditor: false
			};
		},
		methods: {
			setCurrentWiki(data) {
				this.$router.push({
					path: this.$route.path,
					query: {
						...this.$route.query,
						wiki: data._id
					}
				});
			},
			async updateWikiMenuList() {
				_.$loading(true);
				try {
					let payload = { belong_type: this.cptBelongType, belong_id: this.cptBelongId };
					const { data } = await _api.yapi.wikiMenu(payload);
					const { list, orderArray } = data;
					this.treeData = this.buildTree(list, orderArray);

					(() => {
						const wikiId = this.$route.query.wiki;

						if (wikiId) {
							const wiki = this.allWiki[wikiId];
							if (wiki) {
								this.APP.routerUpsertQuery({ wiki: wikiId });
								return;
							}
						}

						if (this.treeData[0]) {
							this.APP.routerUpsertQuery({ wiki: this.treeData[0]._id });
							return;
						}

						this.APP.routerUpsertQuery({ wiki: "" });
					})();
				} catch (error) {
					console.error(error);
				} finally {
					_.$loading(false);
				}
			},
			buildTree(dataArray, orderArray) {
				console.time("buildTree");
				/* findChildren */
				this.allWiki = _.reduce(
					dataArray,
					(target, i) => {
						target[i._id] = i;
						return target;
					},
					{}
				);

				_.each(this.allWiki, item => {
					if (!item) return;
					const parent = this.allWiki[item.p_id];
					if (parent) {
						if (!_.isArray(parent.children)) {
							parent.children = [];
						}
						parent.children.push(item);
					}
				});
				window.allWiki = this.allWiki;

				let tree = _.filter(this.allWiki, item => item.p_id === 0);
				if (_.$isArrayFill(orderArray)) {
					tree = this.sortTreeByOrder(tree, orderArray);
				}
				console.timeEnd("buildTree");
				return tree;
			},
			sortTreeByOrder(treeData, orderArray = []) {
				treeData = _.cloneDeep(treeData);

				treeData.sort((nowItem, nextItem) => {
					const nowIndex = orderArray.indexOf(nowItem._id);
					const nextIndex = orderArray.indexOf(nextItem._id);
					return nowIndex - nextIndex;
				});

				return _.map(treeData, item => {
					if (_.$isArrayFill(item.children)) {
						item.children = this.sortTreeByOrder(item.children, orderArray);
					}
					return item;
				});
			}
		},
		computed: {
			cptToggleStyle() {
				return {
					position: "absolute",
					zIndex: 1,
					margin: "8px"
				};
			},
			cptMountProps() {
				return {
					class: "flex1 flex vertical",
					style: {
						height: "1px"
					}
				};
			},
			cptNoteClass() {
				return { "is-show-header": this.cptIsShowAppHeaderComponent };
			},
			cptIsShowAppHeaderComponent() {
				return ["private", "all"].includes(this.cptBelongType);
			},
			cptBelongType() {
				const { privateId, projectId, groupId } = this.$route.query;
				/* 有优先级和权重，顺序不可变 */
				if (privateId) return "private";
				if (projectId) return "project";
				if (groupId) return "group";
				return "all";
			},
			cptBelongId() {
				const { privateId, projectId, groupId } = this.$route.query;
				const variable_map = {
					private: privateId,
					project: projectId,
					group: groupId,
					all: "BELONG_ALL"
				};
				return variable_map[this.cptBelongType];
			},
			cptCurrentWiki() {
				return {
					...this.currentWiki,
					md: this.currentWiki.markdown || ""
				};
			}
		},
		watch: {
			"$route.query.wiki"() {
				this.updateCurrentWiki();
			}
		}
	});
}
</script>

<style lang="less">
#ViewNote {
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	&.is-show-header {
		flex-flow: column nowrap;
	}
}
</style>
