<template>
	<div class="demo-input">
		<xMd :md="mdTips" />
		<DemoAndCode title="基础用法" path="@/views/component/form/checkbox/JiChuYongFa.vue" unfold />
	</div>
</template>

<script>
export default async function () {
	return {
		data() {
			return {
				mdTips: "通过鼠标或键盘输入字符\n>Input 为受控组件，它**总会显示 Vue 绑定值**。\n\n 通常情况下，应当处理 `input` 事件，并更新组件的绑定值（或使用`v-model`）。否则，输入框内显示的值将不会改变。\n 不支持 `v-model` 修饰符。"
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
