<template>
	<aside class="GroupAside x-sider_wrapper" :style="stateStyle">
		<div class="x-sider_wrapper_tree flex vertical">
			<div class="group-operate flex start middle mb10 left-tree box-shadow">
				<xItem :configs="configsSearch" class="flex1" />
				<xGap l="10" />
				<div class="pointer" @click="upsertGroup" v-xtips="{ content: '添加分组', placement: 'right', style: '--min-width:unset;' }">
					<xIcon icon="_add" class="icon-opreation_click" />
				</div>
			</div>
			<xScrollbar class="flex1">
				<elTree :data="groupListForShow" node-key="href" default-expand-all :expand-on-click-node="false">
					<xRender :render="nodeRender" :payload="payload" slot-scope="payload" />
				</elTree>
			</xScrollbar>
		</div>
		<div class="resize_bar" icon="scroll" v-xmove="resizeOptions" />
	</aside>
</template>
<script>
export default async function () {
	const { useXmove } = await _.$importVue("@/utils/hooks.vue");

	/* 分组信息 */
	return defineComponent({
		inject: ["APP", "Group"],
		setup(props) {
			const vm = this;
			vm.searchGroup = _.debounce(function () {
				const { groupList } = vm.APP;
				const keywords = vm.configsSearch.value;
				let groupListForShow;

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
					groupListForShow = _.filter(groupList, group => new RegExp(keywords, "i").test(group.group_name));
				}
				vm.groupListForShow = groupListForShow;
			}, 300);

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
					onEmitValue: vm.searchGroup,
					clearable: true
				}),
				groupListForShow: []
			};
		},
		methods: {
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
						h("span", { staticClass: "node-name" }, [data.group_name]),
						h("xGap", { attrs: { f: "" } }),
						h("xIcon", { icon: "_add", staticClass: "node-icon-add" }),
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
				this.$router.push({ path: this.$route.path, query: { ...this.$route.query, groupId } });
			},
			upsertGroup() {
				this.Group.upsertGroup();
			}
		},
		watch: {
			"APP.cptCurrentGroup": {
				immediate: true,
				handler(group) {
					if (group?._id) {
					}
				}
			}
		}
	});
}
</script>

<style lang="less">
.asideTreeItem {
	display: flex;
	flex: 1;
	padding: var(--ui-one);
	align-items: center;
	&:hover {
		.node-icon-add {
			display: inline-block;
		}
	}
	&.is-current {
		.node-icon-current {
			display: inline-block;
		}
	}
	.node-icon-current,
	.node-icon-add {
		display: none;
	}
}

.GroupAside {
}
</style>
