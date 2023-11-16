<template>
	<div class="page-view view-icon">
		<xPageContent>
			<div>
				<xBtn @click="openDialog" preset="blue">OpenDialog</xBtn>
			</div>
		</xPageContent>
	</div>
</template>

<script>
export default async function () {
	return {
		inject: ["APP"],
		methods: {
			async openDialog() {
				const WindowImageModify = await _.$importVue("@/views/use/ViewOpenWindow/WindowModify.vue", { parent: this });
				_.$openWindow(i18n("modifyImageInfo"), WindowImageModify);
			}
		}
	};
}
</script>

<style lang="less"></style>
