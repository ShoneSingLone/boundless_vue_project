<template>
	<DocContentOfDemo class="step-demo">
		<xMd
			:md="'## Steps 步骤条\n\n引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。'" />
		<DemoAndCode
			title="基础用法"
			path="@/views/component/navigation/step/JiChuYongFa.vue"
			unfold />
		<DemoAndCode
			title="含状态步骤条"
			path="@/views/component/navigation/step/HanZhuangTaiBuZhouTiao.vue"
			unfold />
		<DemoAndCode
			title="有描述的步骤条"
			path="@/views/component/navigation/step/you_miao_shu_de_bu_zhou_tiao.vue"
			unfold />
		<DemoAndCode
			title="标题和描述都将居中"
			path="@/views/component/navigation/step/biao_ti_he_miao_shu_du_jiang_ju_zhong.vue"
			unfold />
		<DemoAndCode
			title="带图标的步骤条"
			path="@/views/component/navigation/step/dai_tu_biao_de_bu_zhou_tiao.vue"
			unfold />
		<DemoAndCode
			title="竖直方向的步骤条"
			path="@/views/component/navigation/step/shu_zhi_fang_xiang_de_bu_zhou_tiao.vue"
			unfold />
		<DemoAndCode
			title="简洁风格的步骤条"
			path="@/views/component/navigation/step/jian_jie_feng_ge_de_bu_zhou_tiao.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: `### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |------------------------------ | ------ |
| title     | 标题           | string    |  —                            | 返回   |
| content   | 内容           | string    |  —                            | —      |


### Events
| 事件名称   | 说明           | 回调参数   |
|---------- |-------------- |---------- |
| back      | 点击左侧区域触发 | —        |

### Slots
| 事件名称    | 说明         |
|---------- |------------- |
| title     | 标题内容      |
| content   | 内容         |
`
			};
		}
	};
}
</script>

<style lang="less">
.step-demo {
}
</style>
