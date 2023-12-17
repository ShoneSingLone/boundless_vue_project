<template>
	<div class="GroupSectionProjectListPrivate" v-if="isShow">
		<!-- 我的项目 -->
		<xRender :render="renderNoFollowPanel" />
		<xRender :render="renderFollowPanel" />
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
				const isUnfollow = project => !project.follow;
				let unfollowArray = _.sortBy(_.filter(this.APP.projectList, isUnfollow), ["up_time"]);

				if (_.$isArrayFill(unfollowArray)) {
					return h(
						"xBlock",
						{
							header: "我的项目",
							attrs: {
								"card-header-border-left": true
							}
						},
						[this.GroupSection.genProjectCard(unfollowArray, this.GroupSection.canAddProject)]
					);
				}
				return null;
			},
			renderFollowPanel() {
				const isFollow = project => !!project.follow;
				let followProject = _.sortBy(_.filter(this.APP.projectList, isFollow), ["up_time"]);
				if (_.$isArrayFill(followProject)) {
					return h(
						"xBlock",
						{
							header: "我的关注",
							attrs: {
								"card-header-border-left": true
							}
						},
						[this.GroupSection.genProjectCard(followProject)]
					);
				} else {
					return null;
				}
			}
		},
		computed: {
			isShow() {
				return this.APP.cptCurrentGroup?.type === Vue._var.PRIVATE;
			}
		}
	});
}
</script>

<style lang="less">
</style>
