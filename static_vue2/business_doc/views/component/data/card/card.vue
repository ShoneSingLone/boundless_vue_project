<template>
	<div class="icon-demo">
		<DemoAndCode title="基础用法" path="@/views/component/data/card/JiChuYongFa.vue" unfold />
		<DemoAndCode title="简单卡片" path="@/views/component/data/card/JianDanKaPian.vue" />
		<DemoAndCode title="带图片" path="@/views/component/data/card/DaiTuPian.vue" />
		<DemoAndCode title="卡片阴影" path="@/views/component/data/card/KaPianYinYing.vue" />
		<Md :md="mdDoc" />
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				mdDoc: `### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 \`slot#header\` 传入 DOM | string| — | — |
| body-style | 设置 body 的样式| object| — | { padding: '20px' } |
| shadow | 设置阴影显示时机 | string | always / hover / never | always |`
			};
		}
	};
}
</script>

<style lang="less"></style>
