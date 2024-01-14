<style lang="less">
.el-affix--fixed {
	position: fixed;
}
</style>
<template>
	<div ref="root" :class="ns.b()" :style="rootStyle">
		<div :class="{ [ns.m('fixed')]: fixed }" :style="affixStyle">
			<slot />
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const COMPONENT_NAME = "xAffix";
	return defineComponent({
		props: _useXui.buildProps({
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
			const ns = _useXui.useNamespace("affix");
			const target = shallowRef();
			const root = shallowRef();
			const scrollContainer = shallowRef();
			const { height: windowHeight } = _useXui.useWindowSize();
			const { height: rootHeight, width: rootWidth, top: rootTop, bottom: rootBottom, update: updateRoot } = _useXui.useElementBounding(root, { windowScroll: false });
			const targetRect = _useXui.useElementBounding(target);
			const fixed = ref(false);
			const scrollTop = ref(0);
			const transform = ref(0);
			const rootStyle = computed(() => {
				return {
					height: fixed.value ? `${rootHeight.value}px` : "",
					width: fixed.value ? `${rootWidth.value}px` : ""
				};
			});
			const affixStyle = computed(() => {
				if (!fixed.value) return {};
				const offset = props.offset ? _useXui.addUnit(props.offset) : 0;
				return {
					height: `${rootHeight.value}px`,
					width: `${rootWidth.value}px`,
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
					if (!target.value) _useXui.throwError(COMPONENT_NAME, `Target is not existed: ${props.target}`);
				} else {
					target.value = document.documentElement;
				}
				scrollContainer.value = _useXui.getScrollContainer(root.value, true);
				updateRoot();
			});
			_useXui.useEventListener(scrollContainer, "scroll", handleScroll);
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
