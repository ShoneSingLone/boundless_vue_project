<script lang="ts">
export default async function () {
	if (!Vue._yapi_use_hooks) {
		Vue._yapi_use_hooks = {
			useXmove(options = {}) {
				const stateStyle = reactive(
					_.merge(
						{
							width: "300px",
							position: "relative"
						},
						options
					)
				);

				const onMoving = _.throttle(function ({ clickEvent, movingEvent, clickInfo }) {
					const { left: leftStart } = clickInfo;
					let left = 16 + leftStart + movingEvent.clientX - clickEvent.clientX;
					if (left < 100) {
						left = 100;
					}
					stateStyle.width = `${left}px`;
					console.log("🚀 ~ onMoving ~ stateStyle.width :", stateStyle.width);
				}, 100);

				const resizeOptions = {
					onMoving
				};

				return {
					stateStyle,
					resizeOptions
				};
			}
		};
	}
	return Vue._yapi_use_hooks;
}
</script>
