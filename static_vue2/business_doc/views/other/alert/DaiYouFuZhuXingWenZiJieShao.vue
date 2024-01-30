<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xAlert title="带辅助性文字介绍" type="success" description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……"> </xAlert>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "包含标题和内容，解释更详细的警告。\r\r除了必填的`title`属性外，你可以设置`description`属性来帮助你更好地介绍，我们称之为辅助性文字。辅助性文字只能存放单行文本，会自动换行显示。"
			};
		}
	});
}
</script>
