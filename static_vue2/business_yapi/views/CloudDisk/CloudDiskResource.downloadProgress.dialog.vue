<template>
	<div class="flex middle vertical">
		<div class="mb4 width100 flex start">{{ cptTitle }}</div>
		<xProgress :percentage="percentage" style="width: 100%" />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { useDialogProps } = await _.$importVue("/common/utils/hooks.vue");
	return defineComponent({
		props: useDialogProps(["item", "url", "payload"]),
		async mounted() {
			const vm = this;
			try {
				await _.$ajax.downloadOctetStream({
					url: `/api/resource/get`,
					payload: vm.payload,
					method: "get",
					resolveResult(result, state, xhr) {
						let blob = new Blob([result], { type: result.type });
						let link = document.createElement("a");
						link.download = vm.item.name;
						link.style.display = "none";
						link.href = URL.createObjectURL(blob);
						document.body.appendChild(link);
						link.click();
						URL.revokeObjectURL(link.href);
						document.body.removeChild(link);
					},
					onProgress({ loaded, total }) {
						vm.percentage = Math.ceil((loaded / total) * 100);
						vm.total = total;
					}
				});
			} catch (error) {
				console.log("🚀 ~ download ~ error:", error);
			}
		},
		data() {
			return {
				percentage: 0,
				total: 0
			};
		},
		computed: {
			cptTitle({ item }) {
				return `${item.name} - ${_.$bytesToSize(this.total)}`;
			}
		},
		watch: {
			percentage(percentage) {
				if (percentage >= 100) {
					const instance = injectVm(this, "xNotification");
					instance.close();
				}
			}
		}
	});
}
</script>
<style lang="less">
.DownloadByOctetStreamProgressDialog {
	.el-notification__group {
		width: 100%;
	}
}
</style>
