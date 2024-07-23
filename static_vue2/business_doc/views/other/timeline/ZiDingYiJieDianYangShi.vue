<template>
	<div class="popover-JiChuYongFa">
		<xMd :md="mdTitle" />
		<div class="block mt">
			<xTimeline>
				<xTimelineItem
					v-for="(activity, index) in activities"
					:key="index"
					:icon="activity.icon"
					:type="activity.type"
					:color="activity.color"
					:size="activity.size"
					:timestamp="activity.timestamp">
					{{ activity.content }}
				</xTimelineItem>
			</xTimeline>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				mdTitle: "可根据实际场景⾃定义节点尺⼨、颜⾊，或直接使⽤图标。",
				activities: [
					{
						content: "支持使用图标",
						timestamp: "2018-04-12 20:46",
						size: "large",
						type: "primary",
						icon: "el-icon-more"
					},
					{
						content: "支持自定义颜色",
						timestamp: "2018-04-03 20:46",
						color: "#0bbd87"
					},
					{
						content: "支持自定义尺寸",
						timestamp: "2018-04-03 20:46",
						size: "large"
					},
					{
						content: "默认样式的节点",
						timestamp: "2018-04-03 20:46"
					}
				]
			};
		}
	});
}
</script>
<style lang="less"></style>
