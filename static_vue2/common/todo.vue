<style lang="less"></style>
<template>
	<div style="color: red">{{ THIS_FILE_URL }}</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return { THIS_FILE_URL: "need to impl" };
		}
	});
}
</script>
