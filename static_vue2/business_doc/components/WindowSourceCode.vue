<template>
	<xDialog style="--xDialog-wrapper-width: 70vw">
		<p @click="copy" ref="refCode" class="pointer">{{ componentPath }}</p>
		<xMd :md="md" />
		<template #footer>
			<xBtn @click="closeModal">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script lang="ts">
export default async function ({ code, componentPath }) {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");

	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
		methods: {
			async copy() {
				try {
					/* https://www.cnblogs.com/hellxz/p/15192573.html */
					await _.$copyToClipboard($(this.$refs.refCode).text());
					_.$msg.success("复制成功");
				} catch (error) {
					console.error(error);
					_.$msg.error("复制失败");
				}
			}
		},
		data() {
			return {
				componentPath,
				code,
				md: `
\`\`\`html
 ${code.templateSourceCode}
\`\`\`

<br/>

\`\`\`javascript
${code.scritpSourceCode}
\`\`\`

<br/>

\`\`\`less
${code.styleSourceCode}
\`\`\`
`
			};
		}
	});
}
</script>
