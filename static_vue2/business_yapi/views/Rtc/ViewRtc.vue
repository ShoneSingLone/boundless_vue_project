<style lang="less">
#ViewRtc {
	background-color: var(--el-color-white);
	padding: var(--ui-one);
	overflow: auto;
	* {
		// outline: 1px solid yellowgreen;
	}

	video {
		max-height: 500px;
		width: 500px;
		margin: auto;
		border: 1px solid var(--el-border-color-lighter);
		background-color: #fff;
		color: var(--el-text-color-primary);
		transition: 0.3s;
	}
}
</style>
<template>
	<div class="height100 flex vertical" id="ViewRtc">
		<div class="flex midd x-padding">
			<xTag>{{ username }}</xTag>
			<xGap l />
			<template v-for="(item, index) in items">
				<a :href="item[1]" :key="item[0]"> {{ item[0] }} </a>
				<xGap l />
			</template>
		</div>
		<RouterView />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		computed: {
			username() {
				return this.APP.user.username || this.APP.user.username;
			},
			items() {
				return [
					["基本API", _.$aHashLink("/rtc/demo", {})],
					["PeerConnectionHref", _.$aHashLink("/rtc/peer_connection", {})],
					["PeerConnectionCanvas", _.$aHashLink("/rtc/peer_connection_canvas", {})],
					["DataChannel", _.$aHashLink("/rtc/data_channel", {})],
					["DataChannelFile", _.$aHashLink("/rtc/data_channel_file", {})]
				];
			}
		}
	});
}
</script>
