<template>
	<div>
		<xBtn @click="openDialog" preset="blue">OpenDialog</xBtn>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		methods: {
			async openDialog() {
				const WindowImageModify = await _.$importVue("@/views/other/WindowModify.vue", { parent: this });
				_.$openWindow(i18n("OpenWindow"), WindowImageModify);
			}
		}
	};
}
</script>

<style lang="less"></style>
