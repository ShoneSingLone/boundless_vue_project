<template>
	<DocContentOfDemo class="layout-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础布局" path="@/views/component/base/layout/JiChuBuJu.vue" unfold />
		<DemoAndCode
			title="分栏间隔"
			path="@/views/component/base/layout/FenLanJianGe.vue"
			unfold />
		<DemoAndCode
			title="分栏偏移"
			path="@/views/component/base/layout/FenLanPianYi.vue"
			unfold />
		<DemoAndCode
			title="对齐方式"
			path="@/views/component/base/layout/DuiQiFangShi.vue"
			unfold />
		<DemoAndCode
			title="响应式布局"
			path="@/views/component/base/layout/XiangYingShiBuJu.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: `## Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。`,
				apiString: `### Row Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| gutter | 栅格间隔 | number | — | 0 |
| type | 布局模式，可选 flex，现代浏览器下有效 | string | — | — |
| justify | flex 布局下的水平排列方式 | string | start/end/center/space-around/space-between | start |
| align | flex 布局下的垂直排列方式 | string | top/middle/bottom | — |
| tag | 自定义元素标签 | string | * | div |

### Col Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| span | 栅格占据的列数 | number | — | 24 |
| offset | 栅格左侧的间隔格数 | number | — | 0 |
| push |  栅格向右移动格数 | number | — | 0 |
| pull |  栅格向左移动格数 | number | — | 0 |
| xs | \`<768px\` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| sm | \`≥768px\` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| md | \`≥992px\` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| lg | \`≥1200px\` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| xl | \`≥1920px\` 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | — | — |
| tag | 自定义元素标签 | string | * | div |`
			};
		}
	};
}
</script>

<style lang="less">
.layout-demo {
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
}
</style>
