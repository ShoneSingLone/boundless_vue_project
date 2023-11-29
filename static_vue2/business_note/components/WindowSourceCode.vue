<template>
	<xDialog>
		<p>{{ componentPath }}</p>
		<Md :md="md" />
		<template #footer>
			<xBtn @click="$closeWindow">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script>
export default async function ({ code, componentPath }) {
	const { useDialogProps } = await _.$importVue("/common/utils/compositionAPI.vue");

	return defineComponent({
		inject: ["APP"],
		props: useDialogProps(),
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
