<template>
	<DocContentOfDemo>
		<DemoAndCode title="基础用法" path="@/views/xComponent/xItem/JiChuYongFa.vue" unfold />
		<DemoAndCode title="变量修改" path="@/views/xComponent/xItem/BianLiangXiuGai.vue" />
		<DemoAndCode title="itemType的扩展方法" path="@/views/xComponent/xItem/JiChuYongFa.vue" />
		<DemoAndCode title="NormalRender" path="@/views/xComponent/xItem/JiChuYongFa.vue" />
		<DemoAndCode title="_useXui.globalConfigs" path="@/views/xComponent/xItem/JiChuYongFa.vue" />
		<xMd :md="apiString" />
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
