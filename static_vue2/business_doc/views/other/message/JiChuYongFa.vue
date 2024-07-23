<template>
	<div class="message-JiChuYongFa">
		<xMd :md="md" />
		<xBtn :plain="true" @click="open">打开消息提示</xBtn>
		<xMd :md="md2" />
		<xBtn :plain="true" @click="openVn">VNode</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `从顶部出现，3 秒后自动消失。
                
- message 在配置上与 Notification 非常类似，所以部分 options 在此不做详尽解释，文末有 options 列表，可以结合 Notification 的文档理解它们。
`,
				md2: `- message 可以作为函数，返回一个字符串或一个 VNode ，它会被显示为正文内容。`
			};
		},
		methods: {
			open() {
				_.$msg("这是一条消息提示");
			},
			openVn() {
				_.$msg({
					//message 可以作为函数，返回一个字符串或一个 VNode ，它会被显示为正文内容。
					message: () =>
						h("p", null, [
							h("span", null, "内容可以是 "),
							h("i", { style: "color: teal" }, "返回VNode的函数")
						])
				});
			}
		}
	});
}
</script>
<style lang="less"></style>
