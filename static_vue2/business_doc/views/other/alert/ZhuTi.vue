<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xAlert title="成功提示的文案" type="success" effect="dark" />
		<xAlert title="消息提示的文案" type="info" effect="dark" />
		<xAlert title="警告提示的文案" type="warning" effect="dark" />
		<xAlert title="错误提示的文案" type="error" effect="dark" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "Alert 组件提供了两个不同的主题：`light`和`dark`。\r\r通过设置`effect`属性来改变主题，默认为`light`。"
			};
		}
	});
}
</script>
