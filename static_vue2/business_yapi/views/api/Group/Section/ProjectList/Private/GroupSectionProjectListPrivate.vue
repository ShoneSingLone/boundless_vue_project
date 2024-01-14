<template>
	<div class="GroupSectionProjectListPrivate" v-if="isShow">
		<!-- 我的项目 -->
		<xRender :render="renderFollowPanel" />
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
				const isUnfollow = project => !project.follow;
				let unfollowArray = _.sortBy(_.filter(this.APP.groupProjectList, isUnfollow), ["up_time"]);

				if (_.$isArrayFill(unfollowArray)) {
					return h(
						"xBlock",
						{
							header: "我的项目",
							attrs: {
								"card-header-border-left": true
							}
						},
						/* 项目Card */
						[this.GroupSection.genProjectCard(unfollowArray, this.GroupSection.canAddProject)]
					);
				}
				return null;
			},
			renderFollowPanel() {
				const isFollow = project => !!project.follow;
				let followProject = _.sortBy(_.filter(this.APP.groupProjectList, isFollow), ["up_time"]);
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
				return this.APP.cptCurrentGroup?.type === Vue._yapi_var.PRIVATE;
			}
		}
	});
}
</script>

<style lang="less"></style>
