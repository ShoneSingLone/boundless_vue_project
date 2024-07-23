<template>
	<div class="popover-JiChuYongFa">
		<xMd :md="mdTitle" />
		<div class="block">
			<xTimeline>
				<xTimelineItem timestamp="2018/4/12" placement="top">
					<xCard>
						<h4>更新 Github 模板</h4>
						<p>王小虎 提交于 2018/4/12 20:46</p>
					</xCard>
				</xTimelineItem>
				<xTimelineItem timestamp="2018/4/3" placement="top">
					<xCard>
						<h4>更新 Github 模板</h4>
						<p>王小虎 提交于 2018/4/3 20:46</p>
					</xCard>
				</xTimelineItem>
				<xTimelineItem timestamp="2018/4/2" placement="top">
					<xCard>
						<h4>更新 Github 模板</h4>
						<p>王小虎 提交于 2018/4/2 20:46</p>
					</xCard>
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
				mdTitle: "当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。"
			};
		}
	});
}
</script>
<style lang="less"></style>
