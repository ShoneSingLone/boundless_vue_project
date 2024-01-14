<script lang="ts">
export default async function UTILS() {
	if (!Vue._utils) {
		/* istanbul ignore next */
		const resizeHandler = function (entries) {
			for (let entry of entries) {
				const listeners = entry.target.__resizeListeners__ || [];
				if (listeners.length) {
					listeners.forEach(fn => {
						fn();
					});
				}
			}
		};
		/* istanbul ignore next */
		const addResizeListener = function (element, fn) {
			if (!element.__resizeListeners__) {
				element.__resizeListeners__ = [];
				element.__ro__ = new ResizeObserver(_.debounce(resizeHandler, 32));
				element.__ro__.observe(element);
			}
			element.__resizeListeners__.push(fn);
		};

		/* istanbul ignore next */
		const removeResizeListener = function (element, fn) {
			if (!element || !element.__resizeListeners__) return;
			element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
			if (!element.__resizeListeners__.length) {
				element.__ro__.disconnect();
			}
		};

		Vue._utils = {
			addResizeListener,
			removeResizeListener
		};
	}
	return Vue._utils;
}
</script>
