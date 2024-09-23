<script lang="ts">
export default async function () {
	return {
		useGetMediaHander(vm) {
			onMounted(() => {
				if (!vm.handleError || !vm.handleSuccess) {
					throw new Error("miss required methods");
				}
				vm.$on("getUserMedia.success", vm.handleSuccess);
				vm.$on("getUserMedia.error", vm.handleError);
			});
		}
	};
}
</script>
