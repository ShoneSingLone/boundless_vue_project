<style lang="less"></style>
<script lang="ts">
export default async function () {
	const [BasicDatePicker, PanelTime, PanelTimeRange] = await _.$importVue([
		"/common/ui-x/components/form/xDatePicker/basic/BasicDatePicker.vue",
		"/common/ui-x/components/form/xDatePicker/panel/PanelTime.vue",
		"/common/ui-x/components/form/xDatePicker/panel/PanelTimeRange.vue"
	]);

	return defineComponent({
		mixins: [BasicDatePicker],
		name: "ElTimePicker",
		props: {
			isRange: Boolean,
			arrowControl: Boolean
		},
		data() {
			return {
				type: ""
			};
		},

		watch: {
			isRange(isRange) {
				if (this.picker) {
					this.unmountPicker();
					this.type = isRange ? "timerange" : "time";
					this.panel = isRange ? PanelTimeRange : PanelTime;
					this.mountPicker();
				} else {
					this.type = isRange ? "timerange" : "time";
					this.panel = isRange ? PanelTimeRange : PanelTime;
				}
			}
		},

		created() {
			this.type = this.isRange ? "timerange" : "time";
			this.panel = this.isRange ? PanelTimeRange : PanelTime;
		}
	});
}
</script>
