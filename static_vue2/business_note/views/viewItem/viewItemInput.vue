<template>
	<h1>{{ title }}</h1>
</template>
<script lang="ts">
export default async function () {
	return {
		data() {
			return { title: "Sample" };
		}
	};
}
</script>
<style lang="less"></style>
