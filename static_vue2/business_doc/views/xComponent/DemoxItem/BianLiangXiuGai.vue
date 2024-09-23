<template>
	<div>
		<xMd :md="md" />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		data() {
			return {
				md: `	
- \`--xItem-wrapper-width: 200px;\`
- \`--xItem-label-width: 120px;\`
- \`--xItem-label-position: flex-end;\`
- \`--xItem-error-bg: var(--el-bg-color);\`
`
			};
		}
	});
}
</script>
<style lang="less"></style>
