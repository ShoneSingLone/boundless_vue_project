<style lang="less"></style>
<template>
	<div>
		<xMd :md="md" />
		<xAlert title="不可关闭的 alert" type="success" :closable="false" />
		<xAlert title="自定义 close-text" type="info" close-text="知道了" />
		<xAlert title="设置了回调的 alert" type="warning" @close="hello" />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "自定义关闭按钮为文字或其他符号。\r\r在 Alert 组件中，你可以设置是否可关闭，关闭按钮的文本以及关闭时的回调函数。`closable`属性决定是否可关闭，接受`boolean`，默认为`true`。你可以设置`close-text`属性来代替右侧的关闭图标，注意：`close-text`必须为文本。设置`close`事件来设置关闭时的回调"
			};
		},
		methods: {
			hello() {
				alert("Hello World!");
			}
		}
	});
}
</script>
