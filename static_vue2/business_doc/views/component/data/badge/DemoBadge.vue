<template>
	<DocContentOfDemo class="icon-demo">
		<DemoAndCode title="基础用法" path="@/views/component/data/badge/JiChuYongFa.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: `### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| value        | 显示值           | xRender可用的类型  |          —            |    —    |
| max          | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型    | number  |         —              |     —    |
| is-dot       | 小圆点           | boolean         |         —             |  false |
| offset       | badge 的偏移量           | [ String , String ]         |         —             |  ['-12px','-12px']   |
| type         | 类型             | string          | primary / success / warning / danger / info |    —    |`
			};
		}
	};
}
</script>

<style lang="less"></style>
