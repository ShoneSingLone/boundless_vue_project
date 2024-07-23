<template>
	<DocContentOfDemo class="demo-input">
		<xMd :md="mdTips" />
		<DemoAndCode
			title="日期和时间点"
			path="@/views/component/form/DateTimePicker/RiQiHeShiJianDian.vue"
			unfold />
		<DemoAndCode
			title="日期和时间范围"
			path="@/views/component/form/DateTimePicker/RiQiHeShiJianFanWei.vue"
			unfold />
		<DemoAndCode
			title="默认的起始与结束时刻"
			path="@/views/component/form/DateTimePicker/MoRenDeQiShiYuJieShuShiKe.vue"
			unfold />
		<xMd :md="apiString" data-role="api" />
	</DocContentOfDemo>
</template>

<script lang="ts">
export default async function () {
	return {
		data() {
			return {
				mdTips: `### DateTimePicker 日期时间选择器
在同一个选择器里选择日期和时间
> DateTimePicker 由 DatePicker 和 TimePicker 派生，\`Picker Options\` 或者其他选项可以参照 DatePicker 和 TimePicker。

- basic是基本的选择方法，单选和range选择；
- type对应 Panel是各种展示形式，
- 可以通过扩展type得到不同的形式
                `,
				apiString: `### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value / v-model | 绑定值 | date(DateTimePicker) / array(DateTimeRangePicker) | — | — |
| readonly | 完全只读 | boolean | — | false |
| disabled | 禁用 | boolean | — | false |
| editable | 文本框可输入 | boolean | — | true |
| clearable | 是否显示清除按钮 | boolean | — | true |
| size          | 输入框尺寸     | string          | large, small, mini  | — |
| placeholder | 非范围选择时的占位内容 | string | — | — |
| start-placeholder | 范围选择时开始日期的占位内容 | string | — | — |
| end-placeholder | 范围选择时结束日期的占位内容 | string | — | — |
| time-arrow-control | 是否使用箭头进行时间选择 | boolean | — | false |
| type | 显示类型 | string | year/month/date/week/ datetime/datetimerange/daterange | date |
| format | 显示在输入框中的格式 | string | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi) | yyyy-MM-dd HH:mm:ss |
| align | 对齐方式 | string | left, center, right | left |
| popper-class | DateTimePicker 下拉框的类名 | string | — | — |
| picker-options | 当前时间日期选择器特有的选项参考下表 | object |  — | {} |
| range-separator | 选择范围时的分隔符 | string | - | '-' |
| default-value | 可选，选择器打开时默认显示的时间 | Date | 可被\`new Date()\`解析 | — |
| default-time | 选中日期后的默认具体时刻 | 非范围选择时：string / 范围选择时：string[] | 非范围选择时：形如\`12:00:00\`的字符串；范围选择时：数组，长度为 2，每项值为字符串，形如\`12:00:00\`，第一项指定开始日期的时刻，第二项指定结束日期的时刻。不指定会使用时刻 \`00:00:00\` | — |
| value-format | 可选，绑定值的格式。不指定则绑定值为 Date 对象 | string | 见[日期格式](#/zh-CN/component/date-picker#ri-qi-ge-shi) | — |
| name | 原生属性 | string | — | — |
| unlink-panels | 在范围选择器里取消两个日期面板之间的联动 | boolean | — | false |
| prefix-icon | 自定义头部图标的类名 | string | — | el-icon-date |
| clear-icon | 自定义清空图标的类名 | string | — | el-icon-circle-close |

### Picker Options
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| shortcuts | 设置快捷选项，需要传入 { text, onClick } 对象用法参考 demo 或下表 | Object[] | — | — |
| disabledDate | 设置禁用状态，参数为当前日期，要求返回 Boolean | Function | — | — |
| cellClassName | 设置日期的 className | Function(Date) | — | — |
| firstDayOfWeek | 周起始日 | Number | 1 到 7 | 7 |

### Shortcuts
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| text | 标题文本 | string | — | — |
| onClick | 选中后的回调函数，参数是 vm，可通过触发 'pick' 事件设置选择器的值。例如 vm.$emit('pick', new Date()) | function | — | — |

### Events
| Event Name | Description | Parameters |
|---------|--------|---------|
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 \`value-format\` 控制 |
| blur | 当 input 失去焦点时触发 | 组件实例 |
| focus | 当 input 获得焦点时触发 | 组件实例 |

### Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| focus | 使 input 获取焦点 | — |

### Slots
| Name    | 说明         |
|---------|-------------|
| range-separator  | 自定义分隔符 |

`
			};
		}
	};
}
</script>

<style lang="less">
.demo-input {
	.el-input,
	.el-textarea {
		width: 500px;
	}
}
</style>
