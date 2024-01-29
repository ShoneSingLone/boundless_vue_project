<template>
	<DocContentOfDemo class="icon-demo">
		<DemoAndCode title="基础用法" path="@/views/component/data/descriptions/JiChuYongFa.vue" unfold />
		<xMd :md="mdDoc" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdDoc: `### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header | 设置 header，也可以通过 \`slot#header\` 传入 DOM | string| — | — |
| body-class | 设置 body 的class| object| — | { "el-card__body": true } |
| body-style | 设置 body 的style| object| — | { padding: '20px' } |
| shadow | 设置阴影显示时机 | string | always / hover / never | always |`
			};
		}
	};
}
</script>

<style lang="less"></style>
