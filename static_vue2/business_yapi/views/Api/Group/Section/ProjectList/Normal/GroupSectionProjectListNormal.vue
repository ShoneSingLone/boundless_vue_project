<template>
	<div class="GroupSectionProjectListNormal" v-if="isShow">
		<!-- 我的项目 -->
		<xRender :render="renderNoFollowPanel" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP", "GroupSection"],
		components: {},
		data() {
			return {};
		},
		methods: {
			renderNoFollowPanel() {
				if (_.$isArrayFill(this.APP.groupProjectList)) {
					return h(
						"xBlock",
						{
							header: "我的项目",
							attrs: {
								"card-header-border-left": true
							}
						},
						[
							this.GroupSection.genProjectCard(
								this.APP.groupProjectList,
								this.GroupSection.canAddProject
							)
						]
					);
				}
				return null;
			}
		},
		computed: {
			isShow() {
				return this.APP.cptCurrentGroup?.type !== Vue._yapi_var.PRIVATE;
			}
		}
	});
}
</script>

<style lang="less">
.GroupSectionProjectListNormal {
}
</style>
