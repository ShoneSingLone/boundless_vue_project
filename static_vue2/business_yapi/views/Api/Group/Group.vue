<template>
	<section id="ViewGroup" v-xloading="!APP.cptGroupId">
		<aside class="white-border flex vertical box-shadow">
			<GroupAside />
		</aside>
		<xGap l="16" />
		<GroupSection />
	</section>
</template>
<script>
export default async function () {
	return defineComponent({
		inject: ["APP"],
		components: {
			GroupAside: () => _.$importVue("@/views/Api/Group/Aside/GroupAside.vue"),
			GroupSection: () => _.$importVue("@/views/Api/Group/Section/GroupSection.vue")
		},
		mounted() {
			this.APP.ifUrlNoGroupIdGetAndAddIdToUrl();
		},
		provide() {
			const Group = this;
			return {
				Group
			};
		},
		data() {
			return {
				groupId: "asdfsf"
			};
		},
		methods: {
			async upsertGroup(groupInfo) {
				const upsert = await _.$importVue("@/views/Api/Group/Group.Upsert.vue", {
					parent: this,
					groupInfo
				});
				_.$openWindow(!!groupInfo ? i18n("修改分组信息") : i18n("添加分组"), upsert);
			}
		}
	});
}
</script>

<style lang="less">
#ViewGroup {
	height: 100%;
	display: flex;
	flex-flow: row nowrap;
	padding: var(--ui-one);

	#Group-layout-content-tabs {
		display: flex;
		flex-flow: column nowrap;

		> div.el-tabs-nav {
			display: flex;

			> .el-tabs-extra-content {
			}
		}

		.el-tabs__content {
			height: 100%;

			.el-tab-pane {
				height: 100%;
			}
		}
	}
}
</style>
