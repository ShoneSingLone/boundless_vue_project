<template>
	<div class="page-view">
		<xPageContent>
			<xTableDiv />
		</xPageContent>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				title: "MUST_MODIFY"
			};
		}
	});
}
</script>
<style lang="less">
.MUST_MODIFY {
	color: red;
}
</style>
