<style lang="less"></style>
<template>
	<xSwitch v-model="APP.darkMode" />
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"]
	});
}
</script>
