<template>
	<xBtn @click="openDialog" preset="blue">OpenDialog</xBtn>
</template>

<script>
export default async function () {
	return {
		inject: ["APP"],
		methods: {
			async openDialog() {
				const WindowImageModify = await _.$importVue("@/views/other/WindowModify.vue", { parent: this });
				_.$openWindow(i18n("modifyImageInfo"), WindowImageModify);
			}
		}
	};
}
</script>

<style lang="less"></style>
