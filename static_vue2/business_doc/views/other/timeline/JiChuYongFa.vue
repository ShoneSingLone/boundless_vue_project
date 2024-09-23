<template>
	<div class="popover-JiChuYongFa">
		<xMd :md="mdTitle" />
		<div class="block">
			<div class="radio">
				排序：
				<xRadioGroup v-model="reverse">
					<xRadio :label="true">倒序</xRadio>
					<xRadio :label="false">正序</xRadio>
				</xRadioGroup>
			</div>
			<xGap t />
			<xTimeline :reverse="reverse">
				<xTimelineItem
					v-for="(activity, index) in activities"
					:key="index"
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
				mdTitle:
					"Timeline 可拆分成多个按照时间戳正序或倒序排列的 activity，时间戳是其区分于其他控件的重要特征，使⽤时注意与 Steps 步骤条等区分。",
				reverse: true,
				activities: [
					{
						content: "活动按期开始",
						timestamp: "2018-04-15"
					},
					{
						content: "通过审核",
						timestamp: "2018-04-13"
					},
					{
						content: "创建成功",
						timestamp: "2018-04-11"
					}
				]
			};
		}
	});
}
</script>
<style lang="less"></style>
