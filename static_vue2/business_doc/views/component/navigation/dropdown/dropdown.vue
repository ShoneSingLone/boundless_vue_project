<template>
	<DocContentOfDemo class="dropdown-demo">
		<xMd :md="'将动作或菜单折叠到下拉菜单中。'" />
		<DemoAndCode title="基础用法" path="@/views/component/navigation/dropdown/JiChuYongFa.vue" unfold />
		<DemoAndCode title="触发对象" path="@/views/component/navigation/dropdown/ChuFaDuiXiang.vue" unfold />
		<DemoAndCode title="触发方式" path="@/views/component/navigation/dropdown/ChuFaFangShi.vue" unfold />
		<DemoAndCode title="菜单隐藏方式" path="@/views/component/navigation/dropdown/CaiDanYinCangFangShi.vue" unfold />
		<DemoAndCode title="指令事件" path="@/views/component/navigation/dropdown/ZhiLingShiJian.vue" unfold />
		<DemoAndCode title="不同尺寸" path="@/views/component/navigation/dropdown/BuTongChiCun.vue" unfold />
		<xMd :md="apiString" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				apiString: `### Dropdown Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| preset          | 菜单按钮类型，同 Button 组件(只在\`split-button\`为 true 的情况下有效)   | string  |          —             |    —     |
| size          | 菜单尺寸，在\`split-button\`为 true 的情况下也对触发按钮生效  | string | medium / small / mini | — |
| split-button  | 下拉触发元素呈现为按钮组    | boolean  |    —  |  false |
| placement    | 菜单弹出位置     | string | top/top-start/top-end/bottom/bottom-start/bottom-end  | bottom-end |
| trigger       | 触发下拉的行为     | string          | hover, click  | hover |
| hide-on-click | 是否在点击菜单项后隐藏菜单     | boolean          | — | true |
| show-timeout  | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）| number          | — | 250 |
| hide-timeout  | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）| number          | — | 150 |
| tabindex      | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |
| disabled      | 是否禁用        | boolean         | —                      | false |

### Dropdown Slots

| Name | 说明 |
|------|--------|
| — | 触发下拉列表显示的元素。 注意： 必须是一个元素或者或者组件  |
| dropdown | 下拉列表，通常是 \`<xDropdownMenu>\` 组件     |

### Dropdown Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| click  | \`split-button\` 为 true 时，点击左侧按钮的回调 | — |
| command  | 点击菜单项触发的事件回调 | dropdown-item 的指令 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |

### Dropdown Menu Item Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| command       | 指令     | string/number/object          | — | — |
| disabled      | 禁用     | boolean          | — | false |
| divided       | 显示分割线     | boolean          | — | false |
| icon          | 图标类名 | string   |  —  |  —  |`
			};
		}
	};
}
</script>

<style lang="less">
.dropdown-demo {
	.xDropdown-link {
		cursor: pointer;
		color: #409eff;
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}

	.xDropdown-link {
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
	.xDropdown-link {
		cursor: pointer;
		color: #409eff;
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}
}
</style>
