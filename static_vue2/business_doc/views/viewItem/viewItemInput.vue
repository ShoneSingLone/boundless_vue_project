<template>
	<h1>{{ title }}</h1>
</template>
<script>
export default async function () {
	return {
		NEED_HMR: localStorage.isDev,
		data() {
			return { title: "Sample" };
		}
	};
}
</script>
<style lang="less"></style>
