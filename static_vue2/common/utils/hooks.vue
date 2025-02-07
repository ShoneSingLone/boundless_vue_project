<script lang="ts">
export default async function hooks() {
	const { addResizeListener, removeResizeListener } =
		await _.$importVue("/common/utils/utils.vue");

	if (!Vue._hooks) {
		Vue._hooks = {
			Transition: class Transition {
				beforeEnter(el) {
					$(el).addClass("collapse-transition");
					if (!el.dataset) el.dataset = {};

					el.dataset.oldPaddingTop = el.style.paddingTop;
					el.dataset.oldPaddingBottom = el.style.paddingBottom;

					el.style.height = "0";
					el.style.paddingTop = 0;
					el.style.paddingBottom = 0;
				}

				enter(el) {
					el.dataset.oldOverflow = el.style.overflow;
					if (el.scrollHeight !== 0) {
						el.style.height = el.scrollHeight + "px";
						el.style.paddingTop = el.dataset.oldPaddingTop;
						el.style.paddingBottom = el.dataset.oldPaddingBottom;
					} else {
						el.style.height = "";
						el.style.paddingTop = el.dataset.oldPaddingTop;
						el.style.paddingBottom = el.dataset.oldPaddingBottom;
					}

					el.style.overflow = "hidden";
				}

				afterEnter(el) {
					// for safari: remove class then reset height is necessary
					$(el).removeClass("collapse-transition");
					el.style.height = "";
					el.style.overflow = el.dataset.oldOverflow;
				}

				beforeLeave(el) {
					if (!el.dataset) el.dataset = {};
					el.dataset.oldPaddingTop = el.style.paddingTop;
					el.dataset.oldPaddingBottom = el.style.paddingBottom;
					el.dataset.oldOverflow = el.style.overflow;

					el.style.height = el.scrollHeight + "px";
					el.style.overflow = "hidden";
				}

				leave(el) {
					if (el.scrollHeight !== 0) {
						// for safari: add class after set height, or it will jump to zero height suddenly, weired
						$(el).addClass("collapse-transition");
						el.style.height = 0;
						el.style.paddingTop = 0;
						el.style.paddingBottom = 0;
					}
				}

				afterLeave(el) {
					$(el).removeClass("collapse-transition");
					el.style.height = "";
					el.style.overflow = el.dataset.oldOverflow;
					el.style.paddingTop = el.dataset.oldPaddingTop;
					el.style.paddingBottom = el.dataset.oldPaddingBottom;
				}
			},
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
			useDialogProps(otherProps = []) {
				return ["closeModal", "$layerMax", "$layerMin", "$layerRestore"].concat(otherProps);
			},
			useMigrating({ vm }) {
				onMounted(() => {
					if (!vm.$vnode) return;
					const { props = {}, events = {} } = vm.getMigratingConfig();
					const { data, componentOptions } = vm.$vnode;
					const definedProps = data.attrs || {};
					const definedEvents = componentOptions.listeners || {};

					for (let propName in definedProps) {
						propName = _.kebabCase(propName); // compatible with camel case
						if (props[propName]) {
							console.warn(
								`[Element Migrating][${vm.$options.name}][Attribute]: ${props[propName]}`
							);
						}
					}

					for (let eventName in definedEvents) {
						eventName = _.kebabCase(eventName); // compatible with camel case
						if (events[eventName]) {
							console.warn(
								`[Element Migrating][${vm.$options.name}][Event]: ${events[eventName]}`
							);
						}
					}
				});
				return {
					getMigratingConfig() {
						return {
							props: {},
							events: {}
						};
					}
				};
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
					["bottom", "height", "left", "right", "top", "width", "x", "y"].forEach(
						prop => {
							const value = values[prop];
							_.$val(contentRect, prop, value);
						}
					);
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
			},
			/* 动态修改css样式 */
			useDynamicStyle({ vm }) {
				const id = vm._uid;
				const styleId = `dynamicstyleid${id}`;
				let $style;
				onBeforeMount(() => {
					$style = _.$$id(styleId);
					if (!$style) {
						$style = document.createElement("style");

						$style.id = styleId;
						const body = _.$$tags("body")[0];
						body.appendChild($style);
					}
				});
				onBeforeUnmount(() => {
					try {
						if ($style) {
							$style.parentNode.removeChild($style);
						}
					} catch (error) {
						$style = null;
					}
				});

				return {
					styleId,
					setStyle: _.debounce(async cssLessString => {
						try {
							await _.$ensure(() => $style);
							const css = await _.$preprocessCssByless(cssLessString);
							_.$appendStyle(styleId, css);
						} catch (error) {
							console.error(error);
						}
					}, 64)
				};
			},
			/*
			 * @description onUnmounted 的时候会移除组件引入的样式
			 *
			 * */
			useStyleOnlyComponent(styleUrlArray) {
				let styleIds = [];
				const STYLE_LOAD_DONE = ref(false);
				onMounted(async () => {
					styleIds = await Promise.all(styleUrlArray);
					STYLE_LOAD_DONE.value = true;
				});
				onUnmounted(() => _.each(styleIds, styleId => $(`#${styleId}`).remove()));
				return { STYLE_LOAD_DONE };
			}
		};
	}
	return Vue._hooks;
}
</script>
