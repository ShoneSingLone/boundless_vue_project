<template>
	<DocContentOfDemo class="ViewRipple">
		<xMd :md="'# Infinite Scroll 无限滚动\n滚动至底部时，加载更多数据'" />

		<DemoAndCode
			title="基础用法"
			path="@/views/directive/directive/infinite_scroll/JiChuYongFa.vue"
			unfold />
		<DemoAndCode
			title="Scroll Up"
			path="@/views/directive/directive/infinite_scroll/scroll_up.vue"
			unfold />
		<DemoAndCode
			title="禁用加载"
			path="@/views/directive/directive/infinite_scroll/jin_yong_jia_zai.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: `
## Directives

| Name | Description | Type | Default |
| ---- | ----------- | ---- | ------- |
| v-infinite-scroll | Load more data while reach bottom of the page | ^[Function] | — |
| infinite-scroll-disabled | is disabled | ^[boolean] | false |
| infinite-scroll-delay | throttle delay (ms) | ^[number] | 200 |
| infinite-scroll-distance | trigger distance (px) | ^[number] | 0 |
| infinite-scroll-immediate | Whether to execute the loading method immediately, in case the content cannot be filled up in the initial state. | ^[boolean] | true |
| infinite-scroll-up | 开去启向上滑动的监听 | ^[boolean] | false |`
			};
		}
	};
}
</script>
