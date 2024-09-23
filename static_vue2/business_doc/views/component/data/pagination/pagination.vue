<template>
	<DocContentOfDemo class="pagination-demo">
		<xMd :md="md" />
		<DemoAndCode
			title="configs用法"
			path="@/views/component/data/pagination/ConfigsChuYongFa.vue"
			unfold />
		<DemoAndCode
			title="基础用法"
			path="@/views/component/data/pagination/JiChuYongFa.vue"
			unfold />
		<DemoAndCode
			title="设置最大页码按钮数"
			path="@/views/component/data/pagination/SheZhiZuiDaYeMaAnNiuShu.vue"
			unfold />
		<DemoAndCode
			title="带有背景色的分页"
			path="@/views/component/data/pagination/DaiYouBeiJingSeDeFenYe.vue"
			unfold />
		<DemoAndCode
			title="小型分页"
			path="@/views/component/data/pagination/XiaoXingFenYe.vue"
			unfold />
		<DemoAndCode
			title="附加功能"
			path="@/views/component/data/pagination/FuJiaGongNeng.vue"
			unfold />
		<DemoAndCode
			title="当只有一页时隐藏分页"
			path="@/views/component/data/pagination/DangZhiYouYiYeShiYinCangFenYe.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: `## Pagination 分页
当数据量过多时，使用分页分解数据。`,
				apiString: `### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| small | 是否使用小型分页样式 | boolean | — | false |
| background | 是否为分页按钮添加背景色 | boolean | — | false |
| page-size | 每页显示条目个数，支持 .sync 修饰符 | number | — | 10 |
| total | 总条目数 | number | — | — |
| page-count | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性 | Number | — | — |
| pager-count | 页码按钮的数量，当总页数超过该值时会折叠 | number | 大于等于 5 且小于等于 21 的奇数 | 7 |
| current-page | 当前页数，支持 .sync 修饰符 | number | — | 1 |
| layout | 组件布局，子组件名用逗号分隔| String | \`sizes\`, \`prev\`, \`pager\`, \`next\`, \`jumper\`, \`->\`, \`total\`, \`slot\` | 'prev, pager, next, jumper, ->, total'  |
| page-sizes | 每页显示个数选择器的选项设置 | number[] | — |  [10, 20, 30, 40, 50, 100] |
| popper-class | 每页显示个数选择器的下拉框类名 | string | — | — |
| prev-text | 替代图标显示的上一页文字 | string | — | — |
| next-text | 替代图标显示的下一页文字 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| hide-on-single-page | 只有一页时是否隐藏 | boolean | — | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| size-change | pageSize 改变时会触发 | 每页条数 |
| current-change | currentPage 改变时会触发 | 当前页 |
| prev-click | 用户点击上一页按钮改变当前页后触发 | 当前页 |
| next-click | 用户点击下一页按钮改变当前页后触发 | 当前页 |

### Slot
| name | 说明 |
|------|--------|
| — | 自定义内容，需要在 \`layout\` 中列出 \`slot\` |
`
			};
		}
	};
}
</script>

<style lang="less">
.pagination-demo {
	.demo-pagination {
		.block {
			padding: 30px 0;
			text-align: center;
			border-right: solid 1px #eff2f6;
			display: inline-block;
			width: 20%;
			box-sizing: border-box;
			vertical-align: top;
			&:last-child {
				border-right: none;
			}
		}

		.demonstration {
			display: block;
			color: #8492a6;
			font-size: 14px;
			margin-bottom: 20px;
		}
	}

	.demo-pagination__placeholder,
	.demo-pagination__error {
		@extend .demo-pagination;

		.block {
			width: 49%;
		}

		.xImg {
			width: 300px;
			height: 200px;
		}

		.pagination-slot {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			background: #f5f7fa;
			color: #909399;
			font-size: 14px;
		}
	}

	.demo-pagination__placeholder {
		.dot {
			animation: dot 2s infinite steps(3, start);
			overflow: hidden;
		}
	}
}
</style>
