<style lang="less">
.GroupAside {
	background-color: white;
}
</style>

<template>
	<aside class="GroupAside x-sider_wrapper" :style="stateStyle">
		<div class="x-sider_wrapper_tree flex vertical">
			<div class="group-operate flex start middle mb10 left-tree box-shadow">
				<xItem :configs="configsSearch" class="flex1" />
				<xGap l="10" />
				<div class="pointer" @click="() => Group.openGroupUpsertDialog()" v-xtips="{ content: '添加分组', placement: 'right', style: '--min-width:unset;' }">
					<!-- 添加分组 -->
					<xIcon icon="_add" class="icon-opreation_click" />
				</div>
			</div>
			<div class="flex1" style="height: 1px; overflow: auto" ref="refTreeScroll">
				<elTree :data="groupListForShow" node-key="href" default-expand-all :expand-on-click-node="false">
					<xRender :render="nodeRender" :payload="payload" slot-scope="payload" />
				</elTree>
			</div>
		</div>
		<div class="resize_bar" icon="scroll" v-xmove="resizeOptions" />
	</aside>
</template>
<script lang="ts">
export default async function () {
	const { useXmove } = await _.$importVue("@/utils/hooks.vue");
	/* 分组信息 */
	return defineComponent({
		inject: ["APP", "Group"],
		mounted() {
			this.scrollToLocation();
		},
		setup(props) {
			const { stateStyle, resizeOptions } = useXmove(props);
			return {
				stateStyle,
				resizeOptions,
				fnUpsertGroupInfo: () => console.log("fnUpsertGroupInfo")
			};
		},
		data() {
			const vm = this;
			return {
				configsSearch: defItem({
					isSearch: false,
					value: "",
					placeholder: "搜索分组",
					onEmitValue() {
						vm.searchGroup();
					},
					clearable: true
				}),
				groupListForShow: []
			};
		},
		methods: {
			searchGroup: _.debounce(function () {
				const vm = this;
				const { groupList } = vm.APP;
				const keywords = vm.configsSearch.value;
				let groupListForShow;

				const a = {
					label: "11"
				};
				if (keywords === "") {
					const { true: notInGroup, undefined: inGroup } = _.groupBy(groupList, "notInGroup");
					const { owner, member } = _.groupBy(inGroup, "role");
					let { true: privateSpace, undefined: otherOwner } = _.groupBy(owner, "privateSpace");

					groupListForShow = [
						{
							...(privateSpace?.[0] || {}),
							icon: "_icon_group_personal"
						},
						{
							group_name: "分组成员",
							icon: "_icon_group_include",
							children: [
								{
									group_name: "所有者",
									icon: "_icon_group_include_owner",
									children: _.map(otherOwner, i => ({
										...i,
										icon: "_icon_group_include_owner"
									}))
								},
								{
									group_name: "开发者",
									icon: "_icon_group_include_member",
									children: _.map(member, i => ({
										...i,
										icon: "_icon_group_include_member"
									}))
								}
							]
						},
						{
							group_name: "非分组成员",
							icon: "_icon_group_exclude",
							children: _.map(notInGroup, i => ({
								...i,
								icon: "_icon_group_exclude"
							}))
						}
					];
				} else {
					groupListForShow = _.filter(groupList, group => new RegExp(keywords, "i").test(group.group_name)).map(i => ({
						...i,
						icon: "_icon_group_exclude"
					}));
				}
				vm.groupListForShow = groupListForShow;
			}, 300),
			async scrollToLocation() {
				await _.$ensure(() => this.$refs.refTreeScroll);
				setTimeout(() => {
					try {
						this.$el.querySelector(".is-current").scrollIntoView({ behavior: "smooth", block: "center" });
					} catch (error) {}
				}, 1000);
			},
			/* 菜单 */
			nodeRender({ node, data }) {
				const { _id } = this.APP.cptCurrentGroup || {};
				return h(
					"div",
					{
						class: {
							asideTreeItem: true,
							"is-current": _.$isSame(_id, data._id)
						},
						onClick: () => this.selectGroup(data._id)
					},
					[
						h("xIcon", { icon: data.icon }),
						h("div", { staticClass: "node-name" }, [data.group_name]),
						h("xIcon", {
							icon: "currentLocation",
							staticClass: "node-icon-current",
							attrs: { color: "var(--ui-primary)" }
						})
					]
				);
			},
			async selectGroup(groupId) {
				if (!groupId) {
					return;
				}
				this.$router.push({ path: "/api/group", query: { groupId } });
			}
		},
		watch: {
			"APP.groupList"() {
				this.searchGroup();
			}
		}
	});
}
</script>
