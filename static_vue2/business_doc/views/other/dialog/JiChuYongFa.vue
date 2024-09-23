<template>
	<div>
		<div class="mb">
			<xBtn @click="openModal" preset="blue">openModal</xBtn>
		</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		inject: ["APP"],
		methods: {
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
