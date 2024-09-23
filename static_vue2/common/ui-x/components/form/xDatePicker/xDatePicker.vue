<style lang="less"></style>
<script lang="ts">
export default async function () {
	const [BasicDatePicker, PanelDate, PanelDateRange, PanelMonthRange] = await _.$importVue([
		"/common/ui-x/components/form/xDatePicker/basic/BasicDatePicker.vue",
		"/common/ui-x/components/form/xDatePicker/panel/PanelDate.vue",
		"/common/ui-x/components/form/xDatePicker/panel/PanelDateRange.vue",
		"/common/ui-x/components/form/xDatePicker/panel/PanelMonthRange.vue"
	]);

	const getPanel = function (type) {
		if (["datetimerange", "daterange"].includes(type)) {
			return PanelDateRange;
		}

		if (["monthrange"].includes(type)) {
			return PanelMonthRange;
		}

		return PanelDate;
	};
	return defineComponent({
		mixins: [BasicDatePicker],
		name: "ElDatePicker",
		props: {
			type: {
				type: String,
				default: "date"
			},
			timeArrowControl: Boolean
		},

		watch: {
			type(type) {
				if (this.picker) {
					this.unmountPicker();
					this.panel = getPanel(type);
					this.mountPicker();
				} else {
					this.panel = getPanel(type);
				}
			}
		},

		created() {
			this.panel = getPanel(this.type);
		}
	});
}
</script>
