<template>
	<DocContentOfDemo class="dropdown-demo">
		<xMd :md="md" />
		<DemoAndCode title="configs用法" path="@/views/base/button/ConfigsYongFa.vue" unfold />
		<DemoAndCode title="按钮数组" path="@/views/base/button/AnNiuShuZu.vue" unfold />
		<DemoAndCode title="按钮组" path="@/views/base/button/AnNiuZu.vue" unfold />
		<DemoAndCode title="基础用法" path="@/views/base/button/JiChuYongFa.vue" unfold />
		<DemoAndCode title="文字按钮" path="@/views/base/button/WenZiAnNiu.vue" unfold />
		<DemoAndCode title="图标按钮" path="@/views/base/button/TuBiaoAnNiu.vue" unfold />
		<DemoAndCode title="加载中" path="@/views/base/button/JiaZaiZhong.vue" unfold />
		<DemoAndCode title="不同尺寸" path="@/views/base/button/BuTongChiCun.vue" unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				md: `常用的操作按钮。
默认使用ripple
>click会有loading效果，如果是异步函数，会在\`await\` 期间会一直loading

普通模式下loading是boolean类型，
configs使用isLoading可以是boolean或Function用于computed
`,
				apiString: `### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| ripple     | 水波纹   | boolean  |  -            |    true     |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| preset     | 预设颜色   | string    |  blue/ primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| type | 原生 type 属性 | string | button / submit / reset | button |
				`
			};
		}
	};
}
</script>

<style lang="less">
.dropdown-demo {
	.el-dropdown-link {
		cursor: pointer;
		color: #409eff;
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409eff;
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}
	.demonstration {
		display: block;
		color: #8492a6;
		font-size: 14px;
		margin-bottom: 20px;
	}
	.el-dropdown-link {
		cursor: pointer;
		color: #409eff;
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}
}
</style>
