<script>
export default async function () {
	return {
		bind(el, binding, vnode) {
			let interval = null;
			let startTime;
			const maxIntervals = _.$isMac() ? 100 : 200;
			const handler = () => vnode.context[binding.expression].apply();
			const clear = () => {
				if (Date.now() - startTime < maxIntervals) {
					handler();
				}
				clearInterval(interval);
				interval = null;
			};

			$(el).on("mousedown", e => {
				if (e.button !== 0) return;
				startTime = Date.now();
				$(document).one("mouseup", clear);
				clearInterval(interval);
				interval = setInterval(handler, maxIntervals);
			});
		}
	};
}
</script>

<style></style>
