<script lang="ts">
export default async function () {
	return {
		setup() {
			const state = reactive({
				input4: ""
			});
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

			return function (h) {
				return h(
					"div",
					{
						staticClass: "x-page-view view-icon"
					},
					[
						h("xInput", {
							placeholder: "请输入内容",
							value: state.input4,
							on: {
								input: value => {
									state.input4 = value;
								}
							},
							$vSlots: {
								prefix() {
									return h("xIcon", { icon: "icon_table_filter" });
								}
							}
						}),
						h("xDev", {
							$vSlots: {
								default() {
									return "default";
								},
								first() {
									return "first";
								},
								params(props) {
									return [
										"params:" + props.title,
										"params:" + props.title,
										"params:" + props.title,
										"params:" + props.title
									];
								}
							}
						})
					]
				);
			};
		}
	};
}
</script>

<style lang="less"></style>
