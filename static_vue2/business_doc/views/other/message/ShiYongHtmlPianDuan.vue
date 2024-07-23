<template>
	<div class="message-JiChuYongFa">
		<xMd :md="md" />
		<xBtn :plain="true" @click="openHTML">使用 HTML 片段</xBtn>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: `
\`message\` 属性支持传入 HTML 片段

> \`message\` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。因此在 \`dangerouslyUseHTMLString\` 打开的情况下，请确保 \`message\` 的内容是可信的，**永远不要**将用户提交的内容赋值给 \`message\` 属性。
                
将\`dangerouslyUseHTMLString\`属性设置为 true，\`message\` 就会被当作 HTML 片段处理。

                `
			};
		},
		methods: {
			openHTML() {
				_.$msg({
					dangerouslyUseHTMLString: true,
					message: "<strong>这是 <i>HTML</i> 片段</strong>"
				});
			}
		}
	});
}
</script>
<style lang="less"></style>
