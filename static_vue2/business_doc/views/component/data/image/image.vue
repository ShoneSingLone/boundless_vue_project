<template>
	<DocContentOfDemo class="image-demo">
		<xMd :md="md" />
		<DemoAndCode title="基础用法" path="@/views/component/data/image/JiChuYongFa.vue" unfold />
		<DemoAndCode title="大图预览" path="@/views/component/data/image/DaTuYuLan.vue" unfold />
		<DemoAndCode title="加载失败" path="@/views/component/data/image/JiaZaiShiBai.vue" unfold />
		<DemoAndCode title="占位内容" path="@/views/component/data/image/ZhanWeiNeiRong.vue" unfold />
		<DemoAndCode title="懒加载" path="@/views/component/data/image/LanJiaZai.vue" unfold />
		<xMd :md="apiString" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: `## Image 图片
图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等`,
				apiString: `### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| src | 图片源，同原生 | string | — | - |
| fit | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string | fill / contain / cover / none / scale-down | - |
| alt | 原生 alt | string | - | - |
| referrer-policy | 原生 referrerPolicy | string | - | - |
| lazy | 是否开启懒加载 | boolean | — | false |
| scroll-container | 开启懒加载后，监听 scroll 事件的容器 | string / HTMLElement | — | 最近一个 overflow 值为 auto 或 scroll 的父元素 |
| preview-src-list | 开启图片预览功能 | Array | — | - |
| initial-index | 图片预览初始图片index | Number | — | - |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |

### Slots
| 名称    | 说明         |
|---------|-------------|
| placeholder | 图片未加载的占位内容 |
| error | 加载失败的内容 |`
			};
		}
	};
}
</script>

<style lang="less">
.image-demo {
	.demo-image {
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

	.demo-image__placeholder,
	.demo-image__error {
		@extend .demo-image;

		.block {
			width: 49%;
		}

		.xImg {
			width: 300px;
			height: 200px;
		}

		.image-slot {
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

	.demo-image__placeholder {
		.dot {
			animation: dot 2s infinite steps(3, start);
			overflow: hidden;
		}
	}
}
</style>
