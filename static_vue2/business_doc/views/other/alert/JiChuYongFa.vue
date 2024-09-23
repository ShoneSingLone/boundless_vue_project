<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xAlert title="成功提示的文案" type="success" />
		<xAlert title="消息提示的文案" type="info" />
		<xAlert title="警告提示的文案" type="warning" />
		<xAlert title="错误提示的文案" type="error" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `页面中的非浮层元素，不会自动消失。\r\rAlert 组件提供四种主题，由\`type\`属性指定，默认值为\`info\``
			};
		}
	});
}
</script>
