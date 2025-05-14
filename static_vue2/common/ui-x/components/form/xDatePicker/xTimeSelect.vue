<script lang="ts">
export default async function () {
	const [BasicDatePicker, PanelTimeSelect] = await _.$importVue([
		"/common/ui-x/components/form/xDatePicker/basic/BasicDatePicker.vue",
		"/common/ui-x/components/form/xDatePicker/panel/PanelTimeSelect.vue"
	]);
	return defineComponent({
		mixins: [BasicDatePicker],
		name: "ElTimeSelect",
		componentName: "ElTimeSelect",
		props: {
			type: {
				type: String,
				default: "time-select"
			}
		},
		beforeCreate() {
			this.panel = PanelTimeSelect;
		}
	});
}
</script>
