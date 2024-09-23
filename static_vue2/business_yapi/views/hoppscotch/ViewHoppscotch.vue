<style lang="less"></style>
<template>
	<div>
		<div
			v-if="isLoadingInitialRoute"
			class="flex flex-col items-center justify-center min-h-screen">
			<HoppSmartSpinner />
		</div>
		<ErrorPage v-if="errorInfo !== null" :error="errorInfo" />
		<RouterView v-else />
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		components: {
			HoppSmartSpinner: () =>
				_.$importVue("@/views/hoppscotch/components/HoppSmartSpinner.vue")
		},
		data() {
			return {
				isLoadingInitialRoute: false,
				errorInfo: null
			};
		}
	});
}
</script>
