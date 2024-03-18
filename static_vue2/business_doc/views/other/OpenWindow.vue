<template>
	<div>
		<div class="mt">
			<xBtn @click="openDialog" preset="blue">OpenDialog</xBtn>
		</div>
		<div class="mt">
			<xBtn @click="openModal" preset="blue">openModal</xBtn>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		methods: {
			async openDialog() {
				const WindowImageModify = await _.$importVue("@/views/other/WindowModify.vue", { parent: this });
				_.$openWindow_deprecated(i18n("OpenWindow"), WindowImageModify);
			},
			async openModal() {
				_.$openModal({
					title: i18n("OpenWindow"),
					url: "@/views/other/WindowModify.vue",
					payload: {}
				});
			}
		}
	};
}
</script>

<style lang="less"></style>
