<template>
	<div>
		<p>
			<code>{{ formData }}</code>
		</p>
		tinyIpAddress todo...
		<!-- <tinyIpAddress></tinyIpAddress> -->
		<xItem :configs="form.xItemSelect" @focus="handleFocus" />
		<xItem :configs="form.xItemInput" />
		<xItem :configs="form.xItemInputNumber" />
		<xItem :configs="form.xItemInputNumber" />
	</div>
</template>

<script>
export default async function () {
	return defineComponent({
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
					],
					on: {
						blur(...args) {
							console.log("🚀 ~ file: base.vue:28 ~ blur ~ args:", args);
						}
					}
				},
				xItemInput: {
					value: "",
					label: "xItemInput",
					on: {
						focus(...args) {
							console.log("🚀 ~ file: base.vue:37 ~ focus ~ args:", args);
						}
					}
				},
				xItemInputNumber: {
					value: null,
					isNumber: true
				}
			});

			const formData = computed(() => JSON.stringify(_.$pickValueFromConfigs(form), null, 2));

			function handleFocus(...args) {
				console.log("🚀 ~ file: base.vue:50 ~ handleFocus ~ args:", args);
			}

			return {
				form,
				formData,
				handleFocus
			};
		}
	});
}
</script>

<style lang="less"></style>
