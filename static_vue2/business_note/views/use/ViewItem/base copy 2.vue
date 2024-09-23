<template>
	<div class="x-page-view">
		<xPageContent>
			<p>{{ formData }}</p>
			<xItem :configs="form.xItemSelect" />
			<xItem :configs="form.xItemInput" />
		</xPageContent>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		setup() {
			const form = reactive({
				xItemSelect: {
					value: "",
					label: "xItemSelect",
					itemType: "xItemSelect",
					options: [
						{ label: "foo", value: "foo" },
						{ label: "bar", value: "bar" },
						{ label: "fiz", value: "fiz" }
					]
				},
				xItemInput: {
					value: "",
					label: "xItemInput"
				}
			});

			const formData = computed(() => _.$pickFormValues(form));

			return {
				form,
				formData
			};
		}
	};
}
</script>

<style lang="less"></style>
