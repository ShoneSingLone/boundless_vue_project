<script lang="ts">
export default async function hooks() {
	const { addResizeListener, removeResizeListener } = await _.$importVue("/common/utils/utils.vue");

	if (!Vue._hooks) {
		Vue._hooks = {
			useTabName({ vm, propName, defaultName }) {
				if (!vm.$route) {
					throw new Error("$route is undefined");
				}
				return computed({
					get() {
						const { path, query } = vm.$route;
						if (query[propName]) {
							return query[propName];
						} else {
							vm.$router.push({
								path,
								query: {
									...query,
									[propName]: defaultName
								}
							});
						}
						return defaultName;
					},
					set(tab_anme) {
						const { path, query } = vm.$route;
						vm.$router.push({
							path,
							query: {
								...query,
								[propName]: tab_anme
							}
						});
					}
				});
			},
			useDialogProps() {
				return ["$closeWindow", "$layerMax", "$layerMin", "$layerRestore"];
			},
			useFocus(vm, refName) {
				return {
					focus() {
						vm.$refs[refName].focus();
					}
				};
			},
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
	return Vue._hooks;
}
</script>
