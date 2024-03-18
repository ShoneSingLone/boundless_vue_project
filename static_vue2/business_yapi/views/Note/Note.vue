<template>
	<section id="ViewNote">
		<NoteAside />
		<NoteSection />
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			NoteAside: () => _.$importVue("@/views/Note/NoteAside.vue"),
			NoteSection: () => _.$importVue("@/views/Note/NoteSection.vue")
		},
		async mounted() {
			document.title = "Y-API-文档";
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
				if (!_.$isInput(vm.$route.query.wiki)) {
					return;
				}
				const res = await _api.yapi.wikiDetail({ _id: vm.$route.query.wiki });
				if (!res.errcode) {
					vm.currentWiki = res.data;
					callback && callback();
				}
			}, 300);

			return {
				treeData: [],
				currentWiki: {},
				belongType: "all"
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
				let payload = { belong_type: "all" };
				const { data } = await _api.yapi.wikiMenu(payload);
				const { list, orderArray } = data;
				this.treeData = this.buildTree(list, orderArray);
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
			cptBelongType() {
				const { private: self, group, project } = this.$route.query;
				if (self) return "private";
				if (group) return "group";
				if (project) return "project";
				return "all";
			},
			cptBelongId() {
				if (this.cptBelongType !== "all") {
					return this.$route.query[this.cptBelongType];
				}
				return 0;
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
}
</style>
