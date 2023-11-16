<script>
export default async function compositionAPI() {
	return {
		useDialogProps() {
			return ["$closeWindow", "$layerMax", "$layerMin", "$layerRestore"];
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
