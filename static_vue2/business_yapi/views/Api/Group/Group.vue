<template>
	<section id="ViewGroup" v-xloading="!APP.cptGroupId">
		<GroupAside />
		<GroupSection />
	</section>
</template>
<script lang="ts">
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
		methods: {
			async openGroupUpsertDialog(groupInfo) {
				const isModify = !!groupInfo;
				const upsert = await _.$importVue("@/views/Api/Group/Group.Upsert.vue", {
					parent: this,
					groupInfo
				});
				_.$openWindow_deprecated(
					isModify ? i18n("修改分组信息") : i18n("添加分组"),
					upsert
				);
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
}
</style>
