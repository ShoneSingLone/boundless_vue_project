<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xAlert title="成功提示的文案" type="success" show-icon />
		<xAlert title="消息提示的文案" type="info" show-icon />
		<xAlert title="警告提示的文案" type="warning" show-icon />
		<xAlert title="错误提示的文案" type="error" show-icon />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "表示某种状态时提升可读性。\r\r通过设置`show-icon`属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。"
			};
		}
	});
}
</script>
