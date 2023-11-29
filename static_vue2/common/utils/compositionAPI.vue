<script>
export default async function compositionAPI() {
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

	return {
		useDialogProps() {
			return ["$closeWindow", "$layerMax", "$layerMin", "$layerRestore"];
		},
		addResizeListener,
		removeResizeListener,
		useResize(element, fn) {
			onMounted(() => {
				addResizeListener(element, fn);
			});
			onBeforeUnmount(() => {
				removeResizeListener(element, fn);
			});
		},
		useElementSize({ refName, vm }) {
			let contentRect = reactive({
				bottom: 0,
				height: 0,
				left: 0,
				right: 0,
				top: 0,
				width: 0,
				x: 0,
				y: 0
			});
			function setContentRect(contentRect, values) {
				["bottom", "height", "left", "right", "top", "width", "x", "y"].forEach(prop => {
					const value = values[prop];
					_.$val(contentRect, prop, value);
				});
			}
			onMounted(() => {
				const eleRect = vm.$refs[refName].getBoundingClientRect();
				setTimeout(() => $(vm.$el).removeClass("opacity0"), 512);
				setContentRect(contentRect, eleRect);
				vm.$resizeObserver = new ResizeObserver(entries => {
					const entry = _.first(entries);
					setContentRect(contentRect, entry.contentRect);
				});
				vm.$resizeObserver.observe(vm.$refs[refName]);
			});
			onBeforeUnmount(() => {
				vm.$resizeObserver.disconnect();
				vm.$resizeObserver = null;
			});
			/* 让vm保持对此引用 */
			return contentRect;
		}
	};
}
</script>
