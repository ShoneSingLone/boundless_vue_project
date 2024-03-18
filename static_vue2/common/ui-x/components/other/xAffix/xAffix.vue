<style lang="less">
.el-affix--fixed {
	position: fixed;
}
</style>
<template>
	<div ref="root" :class="ns.b()" :style="rootStyle">
		<div :class="{ [ns.m('fixed')]: fixed }" :style="affixStyle" ref="refContent">
			<slot />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const COMPONENT_NAME = "xAffix";
	const { buildProps, useResizeObserver, useNamespace, useWindowSize, useElementBounding, addUnit, throwError, getScrollContainer, useEventListener } = _useXui;
	return defineComponent({
		props: buildProps({
			zIndex: {
				type: [Number, String],
				default: 1
			},
			target: {
				type: String,
				default: ""
			},
			offset: {
				type: Number,
				default: 0
			},
			position: {
				type: String,
				values: ["top", "bottom"],
				default: "top"
			}
		}),
		setup(props, { expose, emit }) {
			const vm = this;
			const ns = useNamespace("affix");
			const target = shallowRef();
			const root = shallowRef();
			const contentRect = reactive({
				width: 0,
				height: 0
			});

			const updateContent = () => {
				try {
					const { children } = this.$refs.refContent;
					const rect = _.reduce(
						children,
						(target, childDom) => {
							target.width += childDom.offsetWidth;
							target.height += childDom.offsetHeight;
							return target;
						},
						{
							width: 0,
							height: 0
						}
					);
					contentRect.width = rect.width;
					contentRect.height = rect.height;
				} catch (error) {}
			};

			const scrollContainer = shallowRef();
			const { height: windowHeight, width: windowWidth } = useWindowSize();
			const { height: rootHeight, width: rootWidth, top: rootTop, bottom: rootBottom, update: updateRoot } = _useXui.useElementBounding(root, { windowScroll: false });

			const targetRect = useElementBounding(target);
			const fixed = ref(false);
			const scrollTop = ref(0);
			const transform = ref(0);
			const rootStyle = computed(() => {
				/* window resize 时触发 */
				windowWidth.value;
				windowHeight.value;
				contentRect.height;
				contentRect.width;
				if (fixed.value) {
					let height = contentRect.height < rootHeight.value ? contentRect.height : rootHeight.value;
					let width = contentRect.width > rootWidth.value ? contentRect.width : rootWidth.value;
					return {
						height: `${height}px`,
						width: `${width}px`
					};
				} else {
					return {
						height: "",
						width: ""
					};
				}
			});
			const affixStyle = computed(() => {
				if (!fixed.value) return {};
				const offset = props.offset ? addUnit(props.offset) : 0;
				return {
					// height: `${rootHeight.value}px`,
					// width: `${rootWidth.value}px`,
					top: props.position === "top" ? offset : "",
					bottom: props.position === "bottom" ? offset : "",
					transform: transform.value ? `translateY(${transform.value}px)` : "",
					zIndex: props.zIndex
				};
			});
			const update = () => {
				vm.$emit("update");
				if (!scrollContainer.value) return;
				scrollTop.value = scrollContainer.value instanceof Window ? document.documentElement.scrollTop : scrollContainer.value.scrollTop || 0;
				if (props.position === "top") {
					if (props.target) {
						const difference = targetRect.bottom.value - props.offset - rootHeight.value;
						fixed.value = props.offset > rootTop.value && targetRect.bottom.value > 0;
						transform.value = difference < 0 ? difference : 0;
					} else {
						fixed.value = props.offset > rootTop.value;
					}
				} else if (props.target) {
					const difference = windowHeight.value - targetRect.top.value - props.offset - rootHeight.value;
					fixed.value = windowHeight.value - props.offset < rootBottom.value && windowHeight.value > targetRect.top.value;
					transform.value = difference < 0 ? -difference : 0;
				} else {
					fixed.value = windowHeight.value - props.offset < rootBottom.value;
				}
			};
			const handleScroll = () => {
				updateRoot();
				updateContent();
				emit("scroll", {
					scrollTop: scrollTop.value,
					fixed: fixed.value
				});
			};
			watch(fixed, val => emit("change", val));
			onMounted(() => {
				var _a2;
				if (props.target) {
					target.value = (_a2 = document.querySelector(props.target)) != null ? _a2 : void 0;
					if (!target.value) throwError(COMPONENT_NAME, `Target is not existed: ${props.target}`);
				} else {
					target.value = document.documentElement;
				}
				scrollContainer.value = getScrollContainer(root.value, true);
				updateRoot();
				updateContent();
			});
			useEventListener(scrollContainer, "scroll", handleScroll);
			watchEffect(update);
			expose({ update, updateRoot });
			return {
				update,
				updateRoot,
				ns,
				root,
				rootStyle,
				fixed,
				affixStyle
			};
		}
	});
}
</script>
