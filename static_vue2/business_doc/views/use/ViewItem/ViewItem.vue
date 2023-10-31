<template>
	<div class="page-view">
		<xPageContent>
			asdfsf
			<router-view />
			asdfsf
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	return {
		NEED_HMR: localStorage.isDev
	};
}
</script>

<style lang="less"></style>
