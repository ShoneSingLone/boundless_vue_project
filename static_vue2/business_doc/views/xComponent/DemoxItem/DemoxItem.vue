<template>
	<DocContentOfDemo>
		<DemoAndCode title="基础用法" path="@/views/xComponent/DemoxItem/JiChuYongFa.vue" unfold />
		<DemoAndCode
			title="作为Wrapper"
			path="@/views/xComponent/DemoxItem/ZuoWeiWrapper.vue"
			unfold />
		<DemoAndCode title="变量修改" path="@/views/xComponent/DemoxItem/BianLiangXiuGai.vue" />
		<DemoAndCode
			title="itemType的扩展方法"
			path="@/views/xComponent/DemoxItem/JiChuYongFa.vue" />
		<DemoAndCode title="NormalRender" path="@/views/xComponent/DemoxItem/JiChuYongFa.vue" />
		<DemoAndCode
			title="_xUtils.globalConfigs"
			path="@/views/xComponent/DemoxItem/JiChuYongFa.vue" />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: `### xItem Events

| Name     | Description                        | Type                                                                |
| -------- | ---------------------------------- | ------------------------------------------------------------------- |
| \`setup\` | setup 运行时 emit 当前实例. | \`({xItem}) => void\`                               |`
			};
		}
	};
}
</script>

<style lang="less"></style>
