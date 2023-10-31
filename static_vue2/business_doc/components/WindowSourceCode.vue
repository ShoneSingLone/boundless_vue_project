<template>
	<xDialog>
		<p>{{ componentPath }}</p>
		<MarkdownIt :md="md" />
		<template #footer>
			<xBtn @click="$closeWindow">{{ i18n("取消") }}</xBtn>
		</template>
	</xDialog>
</template>

<script>
export default async function ({ code, componentPath }) {
	return {
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
	};
}
</script>
