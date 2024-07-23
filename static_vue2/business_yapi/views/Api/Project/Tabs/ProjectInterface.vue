<style lang="less">
#ViewProjectInterface {
	width: 1px;
	position: relative;

	.ViewProjectInterfaceResizeWrapper {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
}
</style>
<template>
	<section class="flex1" v-if="isShow" id="ViewProjectInterface">
		<div class="ViewProjectInterfaceResizeWrapper flex">
			<ProjectInterfaceAside />
			<ProjectInterfaceSection />
		</div>
	</section>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "inject_project"],
		components: {
			ProjectInterfaceAside: () =>
				_.$importVue("@/views/Api/Project/Aside/ProjectInterfaceAside.vue"),
			ProjectInterfaceSection: () =>
				_.$importVue("@/views/Api/Project/Section/ProjectInterfaceSection.vue")
		},
		provide() {
			return {
				inject_interface: this
			};
		},
		data() {
			return {};
		},
		computed: {
			isShow() {
				return this.inject_project.cptTabName === "接口";
			}
		},
		methods: {
			async openGroupUpsertDialog(groupInfo) {
				const upsert = await _.$importVue("@/views/Api/Group/Group.Upsert.vue", {
					parent: this,
					groupInfo
				});
				_.$openWindow_deprecated(
					!!groupInfo ? i18n("修改分组信息") : i18n("添加分组"),
					upsert
				);
			}
		}
	});
}
</script>
