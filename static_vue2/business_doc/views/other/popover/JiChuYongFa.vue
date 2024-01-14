<template>
	<div class="popover-JiChuYongFa">
		<xMd :md="mdTitle" />
		<xMd :md="md1" />

		<div v-xtips="'如果是字符串，默认为`content`'" class="el-button el-button--default el-button--small">DIV hover</div>
		<div v-xtips="{ content: '' }" class="el-button el-button--default el-button--small">DIV hover 如果content是假值，不会有tips</div>

		<xMd :md="'#### 普通dom\n\n'" />

		<div v-xtips="{ title: '标题', content: 'hover 激活', width: 200, trigger: 'hover', placement: 'top' }" class="el-button el-button--default el-button--small">DIV hover</div>
		<div v-xtips="manual" @click="toggle" class="el-button el-button--default el-button--small">DIV 手动 {{ visible_label }}</div>

		{{ manual }}
		<xMd :md="'#### 组件\n\n'" />

		<xBtn v-xtips="{ title: '标题', content: 'hover 激活', width: 200, trigger: 'hover', placement: 'top' }">hover 激活</xBtn>
		<xBtn v-xtips="{ title: '标题', content: 'click 激活', width: 200, trigger: 'click', placement: 'left' }">click 激活</xBtn>
		<xBtn v-xtips="{ title: '标题', content: 'focus 激活', width: 200, trigger: 'focus', placement: 'right' }">focus 激活</xBtn>
		{{ visible_label }}<xBtn v-xtips="manual" @click="toggle">手动激活 {{ visible_label }}</xBtn>

		<xMd :md="'#### 声明式用法'" />

		<elPopover placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
			<xBtn slot="reference">hover 激活</xBtn>
		</elPopover>
		<elPopover placement="bottom" title="标题" width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
			<xBtn slot="reference">click 激活</xBtn>
		</elPopover>
		<elPopover ref="popover" placement="right" title="标题" width="200" trigger="focus" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"> </elPopover>
		<xBtn v-popover:popover>focus 激活</xBtn>
		<elPopover placement="bottom" title="标题" width="200" trigger="manual" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。" v-model="visible">
			<xBtn slot="reference" @click="visible = !visible">手动激活</xBtn>
		</elPopover>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		beforeUnmount() {
			clearInterval(this.timer);
		},
		computed: {
			visible_label() {
				return this.manual.visible ? "是" : "否";
			}
		},
		methods: {
			toggle() {
				const placement = "top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end".split("/");
				this.manual.visible = !this.manual.visible;
				if (this.manual.visible) {
					this.manual.placement = placement[this.count++ % placement.length];
					this.manual.title = this.manual.placement;
				}
			}
		},
		data() {
			return {
				count: 0,
				visible: false,
				mdTitle:
					'`trigger`属性用于设置何时触发 Popover，支持四种触发方式：`hover`，`click`，`focus` 和 `manual`。对于触发 Popover 的元素，有两种写法：使用 `slot="reference"` 的具名插槽，或使用自定义指令`v-popover`指向 Popover 的索引`ref`',
				manual: {
					title: "标题",
					content: "这是一段内容,这是一段内容,这是一段内容,这是一段内容。",
					width: 200,
					trigger: "manual",
					placement: "top",
					visible: false
				},
				md1: "### 推荐使用v-xtips\n\n>如果是字符串默认为`content`\n\n>如果是对象，但`content`是假值，则不会有tips"
			};
		}
	});
}
</script>
<style lang="less">
.popover-JiChuYongFa {
	.div-demo {
		width: 300px;
		border: 1px solid blue;
		text-align: center;
		border-radius: 40x;
		padding: var(--ui-one);
	}
}
</style>
