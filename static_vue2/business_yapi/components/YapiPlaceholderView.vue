<template>
	<div class="YapiPlaceholderView flex vertical">
		<div class="err-msg flex vertical center middle" style="margin: auto">
			<xIcon
				:icon="icon"
				class="YapiPlaceholderView-icon"
				style="color: var(--el-color-warning)" />
			<!-- <p class="title">{{ title }}</p> -->
			<p class="desc">{{ desc }}</p>
			<p class="opration">{{ opration }}</p>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		/* GroupSectionProjectList */
		props: ["view"],
		computed: {
			viewInfo() {
				const VIEW_MAP = {
					GroupSectionProjectList: {
						icon: "_frown-o",
						title: "项目列表",
						desc: "项目列表为空,请先添加项目",
						opration: ""
					},
					GroupSectionMemberList: {
						icon: "_frown-o",
						title: "成员列表",
						desc: "项目列表为空,请先添加项目",
						opration: ""
					},
					GroupSectionLogWindowDiff: {
						icon: "_frown-o",
						title: "diff",
						desc: "暂无变化",
						opration: ""
					}
				};
				return VIEW_MAP[this.view] || {};
			},
			icon() {
				return this.viewInfo.icon;
			},
			title() {
				return this.viewInfo.title;
			},
			desc() {
				return this.viewInfo.desc;
			},
			opration() {
				return this.viewInfo.opration;
			}
		},
		methods: {}
	});
}
</script>
<style lang="less">
.YapiPlaceholderView {
	.YapiPlaceholderView-icon {
		width: 64px;
		height: 64px;
	}
}
</style>
