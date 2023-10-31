<template>
	<div class="page-view">
		<xPageContent>
			<router-view />
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
