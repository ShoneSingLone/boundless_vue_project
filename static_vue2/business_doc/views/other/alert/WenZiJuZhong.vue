<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xAlert title="成功提示的文案" type="success" center show-icon />
		<xAlert title="消息提示的文案" type="info" center show-icon />
		<xAlert title="警告提示的文案" type="warning" center show-icon />
		<xAlert title="错误提示的文案" type="error" center show-icon />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "使用 `center` 属性让文字水平居中。"
			};
		}
	});
}
</script>
