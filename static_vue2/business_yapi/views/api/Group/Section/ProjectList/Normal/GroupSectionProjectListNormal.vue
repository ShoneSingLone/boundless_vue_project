<template>
	<div class="GroupSectionProjectListNormal" v-if="isShow">
		<!-- 我的项目 -->
		<xRender :render="renderNoFollowPanel" />
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		inject: ["APP", "GroupSection"],
		components: {},
		data() {
			return {};
		},
		methods: {
			renderNoFollowPanel() {
				if (_.$isArrayFill(this.APP.projectList)) {
					return h(
						"xBlock",
						{
							header: "我的项目",
							attrs: {
								"card-header-border-left": true
							}
						},
						[this.GroupSection.genProjectCard(this.APP.projectList, this.GroupSection.canAddProject)]
					);
				}
				return null;
			}
		},
		computed: {
			isShow() {
				return this.APP.cptCurrentGroup?.type !== Vue._var.PRIVATE;
			}
		}
	});
}
</script>

<style lang="less">
.GroupSectionProjectListNormal {
}
</style>
