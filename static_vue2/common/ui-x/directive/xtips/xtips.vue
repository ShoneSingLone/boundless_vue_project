<script lang="ts">
export default async function () {
	let PopoverComponent;

	const TIPS_OPTIONS_MAP = new Map();
	/* 可能是Vue实例，也可能是原始dom */
	const REFRENCE_MAP = new Map();
	const POPOVER_MAP = new Map();

	const X_TIPS_REF = "x-tips-ref";

	const SELECTOR_REFERENCE = "data-xtips-reference";
	const SELECTOR_POPOVER = "data-xtips-popover";
	const CLASS_NAME_REFERENCE = "xtips-reference";

	/* 目标元素 */
	const EVENT_UI_TARGET = "X_TARGET";
	/* 开发的时候不想关闭，可以把时间值调高 */
	// const TIMEOUT_DELAY = 200 * 10000;
	const TIMEOUT_DELAY = 200;

	function setOptions(refId, options) {
		const oldOptions = TIPS_OPTIONS_MAP.get(refId);
		if (_.isString(options)) {
			/* 简写 */
			TIPS_OPTIONS_MAP.set(refId, {
				content: options,
				placement: "top",
				trigger: "hover"
			});
		} else if (_.isPlainObject(options)) {
			if (hasOwn(options, "_btnInnerTips")) {
				/* 只有btn disabled是true的时候才会显示 */
				if (options._btnInnerTips) {
					TIPS_OPTIONS_MAP.set(refId, _.merge(oldOptions, options));
				}
			} else {
				TIPS_OPTIONS_MAP.set(refId, _.merge(oldOptions, options));
			}
		}
	}
	/* placement offset arrowOffset */
	function usePops(ele) {
		const $ele = $(ele);
		const refId = $ele.attr(SELECTOR_REFERENCE);
		const options = TIPS_OPTIONS_MAP.get(refId) || {};
		const trigger = options.trigger || "hover";
		const vmRefrence = REFRENCE_MAP.get(refId);
		const vmPopover = POPOVER_MAP.get(refId);
		let $popover = $(`[${SELECTOR_POPOVER}=${refId}]`);

		const isShow = !!options.content;
		return {
			isShow,
			trigger,
			$ele,
			refId,
			$popover,
			vmRefrence,
			vmPopover
		};
	}

	async function ensurePopover({ ele }) {
		let { trigger, $ele, refId, $popover, vmRefrence, vmPopover } = usePops(ele);

		if (!$popover.length) {
			const $popover = $("<div/>", {
				[SELECTOR_POPOVER]: refId
			});

			_.$single.shadowTemplate.append($popover);
			PopoverComponent =
				PopoverComponent ||
				(await _.$importVue("/common/ui-x/directive/xtips/xtipsDefaultPopover.vue"));
			let _PopoverComponent = { ...PopoverComponent };
			_PopoverComponent.parent = vmRefrence;

			vmPopover = new Vue(_PopoverComponent);
			POPOVER_MAP.set(refId, vmPopover);

			/* popover使用onPopoverChange */
			vmPopover.refId = refId;
			vmPopover.options = TIPS_OPTIONS_MAP.get(refId);
			vmPopover.options.$reference = $ele;

			vmRefrence.onPopoverChange = vmRefrence.onPopoverChange || {};
			vmRefrence.onPopoverChange[refId] = val => {
				if (!val) {
					if (["click", "rightClick"].includes(trigger)) {
						vmRefrence.popoverClearTimer = setTimeout(() => {
							vmPopover.$destroy();
							$popover.remove();
							vmRefrence.popoverClearTimer = null;
						}, 32);
					} else {
						vmPopover.$destroy();
						$popover.remove();
					}
				}
			};

			vmPopover.$mount(`[${SELECTOR_POPOVER}=${refId}]`);
			vmPopover.options.visible = (function () {
				if ("manual" === trigger) {
					return vmPopover.options.visible;
				}
				return true;
			})();

			$(vmPopover.$el).attr({
				[SELECTOR_POPOVER]: refId
			});
		}

		return $popover;
	}

	function handleClick(event) {
		const { trigger, isShow } = usePops(this);
		if (!isShow) return;
		if (["click", "rightClick"].includes(trigger)) {
			event.preventDefault();
			event.stopPropagation();
			ensurePopover({ ele: this });
		}
	}

	function handleEnterReference(event) {
		const { trigger, isShow } = usePops(this);
		if (!isShow) return;
		if ("hover" === trigger) {
			ensurePopover({ ele: this });
		}
	}

	function handleFocusinReference(event) {
		const { trigger, isShow } = usePops(this);
		if (!isShow) return;
		if ("focus" === trigger) {
			ensurePopover({ ele: this });
		}
	}

	function clear(el) {
		const { refId, vmPopover, $popover } = usePops(el);
		vmPopover && vmPopover.$destroy();
		$popover.remove();
		TIPS_OPTIONS_MAP.delete(refId);
		REFRENCE_MAP.delete(refId);
		POPOVER_MAP.delete(refId);
	}

	_.$single.doc
		/* click处理 */
		.on(`click.${EVENT_UI_TARGET}` /* 左键单击 */, `[${SELECTOR_REFERENCE}]`, handleClick)
		.on(
			`contextmenu.${EVENT_UI_TARGET}` /* 右键单击 */,
			`[${SELECTOR_REFERENCE}][data-trigger=rightClick]`,
			handleClick
		)
		/* hover处理 */
		.on(`mouseenter.${EVENT_UI_TARGET}`, `[${SELECTOR_REFERENCE}]`, handleEnterReference)
		/* focus处理 */
		.on(`mousedown.${EVENT_UI_TARGET}`, `[${SELECTOR_REFERENCE}]`, handleFocusinReference);
	//.on(`mouseup.${EVENT_UI_TARGET}`, `[${SELECTOR_REFERENCE}]`, handleFocusoutReference);

	return Vue.directive("xtips", {
		name: "xtips",
		/* @ts-ignore */
		inserted(ele, binding, vnode) {
			const configs = binding.value;
			/* v-xtips绑定在dom元素上 */
			let vm = vnode.componentInstance || vnode.context;
			if (_.isFunction(binding.value.onUpdated) && vm) {
				binding.value.onUpdated(vm);
			}

			const refId = _.$genId(X_TIPS_REF);
			setOptions(refId, configs);
			REFRENCE_MAP.set(refId, vm);
			$(ele)
				.addClass(CLASS_NAME_REFERENCE)
				.attr({ [SELECTOR_REFERENCE]: refId })
				.data("oldValue", { ...configs });
		},
		componentUpdated(ele, binding) {
			const { refId, $popover, vmPopover, $ele } = usePops(ele);
			const oldValue = $ele.data("oldValue");
			$ele.data("oldValue", { ...binding.value });
			if (hasOwn(binding.value, "_btnInnerTips")) {
				return;
			} else {
				if (_.$eqObj(binding.value, _.omit(oldValue, ["$reference"]))) {
					return;
				}
				if (_.$eqObj(binding.value, oldValue)) {
					return;
				}
			}
			setOptions(refId, binding.value);

			if ("manual" === binding.value?.trigger) {
				if ($popover.length) {
					vmPopover && vmPopover.$destroy();
					$popover.remove();
				}
				ensurePopover({ ele });
			}
		},
		unbind(ele) {
			clear(ele);
		}
	});
}
</script>

<style></style>
