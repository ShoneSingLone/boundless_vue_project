<template>
	<div class="x-page-view view-icon">
		<xPageContent>
			<div>
				<xBtn @click="openDialog" preset="blue">OpenDialog</xBtn>
			</div>
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		methods: {
			async openDialog() {
				const WindowImageModify = await _.$importVue(
					"@/views/use/ViewOpenWindow/WindowModify.vue",
					{ parent: this }
				);
				_.$openWindow_deprecated(i18n("modifyImageInfo"), WindowImageModify);
			}
		}
	};
}
</script>

<style lang="less"></style>
