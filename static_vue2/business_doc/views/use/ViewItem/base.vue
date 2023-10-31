<template>
	<div>
		<p>
			<code>{{ formData }}</code>
		</p>
		<xItem :configs="form.xItemSelect" />
		<xItem :configs="form.xItemInput" />
		<xItem :configs="form.xItemInputNumber" />
	</div>
</template>

<script>
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
				},
				xItemInputNumber: {
					value: null,
					isNumber: true
				}
			});

			const formData = computed(() => _.$pickValueFromConfigs(form));

			return {
				form,
				formData
			};
		}
	};
}
</script>

<style lang="less"></style>
