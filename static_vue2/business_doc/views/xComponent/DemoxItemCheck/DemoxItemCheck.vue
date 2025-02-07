<template>
	<DocContentOfDemo class="DemoAffix">
		<xMd :md="md" />
		<DemoAndCode
			title="基础用法"
			path="@/views/xComponent/DemoxItemCheck/DemoxItemCheck/JiChuYongFa.vue"
			unfold />
		<DemoAndCode
			title="xItemCheckUse:blockCheck"
			path="@/views/xComponent/DemoxItemCheck/DemoxItemCheck/XItemCheckUseBlockCheck.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: "# xItemCheck \r\r多选组件，类似checkbox，但是可以扩展展示效果。",
				apiString: `## xItemCheck

\`\`\`css

/* 隐藏原生的checkbox */
input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    border: 1px solid #000;
}

/* 使用伪元素添加自定义勾选样式 */
input[type="checkbox"]:checked::after {
	/* Unicode编码表示对勾符号 */
    content: '\\2713';
    display: block;
    text-align: center;
    line-height: 20px;
    font-size: 16px;
    color: green;
}
\`\`\``
			};
		}
	};
}
</script>

<style lang="less"></style>
