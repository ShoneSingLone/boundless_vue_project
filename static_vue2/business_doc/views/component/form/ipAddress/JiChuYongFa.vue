<style lang="less"></style>
<template>
	<div class="flex vertical">
		<div>ipAddress:</div>
		<div>{{ ipAddress }}</div>
		<xIpAddress v-model="ipAddress" />
		<xGap t />
		<xIpAddress v-model="ipAddress" disabled="true" />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return { ipAddress: "" };
		}
	});
}
</script>
