<template>
	<DocContentOfDemo class="demo-input">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="基础用法"
			path="@/views/component/form/ipAddress/JiChuYongFa.vue"
			unfold />
		<xIpAddress v-model="ipAddress" />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdTips: "asdfasdf",
				apiString: `### Ip Address

`
			};
		}
	};
}
</script>

<style lang="less">
.demo-input {
	.el-input,
	.el-textarea {
		width: 500px;
	}
}
</style>
