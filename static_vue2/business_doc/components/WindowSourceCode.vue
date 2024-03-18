<template>
	<xDialog>
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
					_.$msgSuccess("复制成功");
				} catch (error) {
					console.error(error);
					_.$msgError("复制失败");
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

\`\`\`javascript
${code.scritpSourceCode}
\`\`\`

\`\`\`less
${code.styleSourceCode}
\`\`\`
`
			};
		}
	});
}
</script>
