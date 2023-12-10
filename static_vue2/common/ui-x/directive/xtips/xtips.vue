<script>
export default async function () {
	const TIPS_OPTIONS = new Map();
	/* 可能是Vue实例，也可能是原始dom */
	const VM_REFRENCE = new Map();
	window.VM_REFRENCE = VM_REFRENCE;
	const VM_POPOVER = new Map();

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
		let _options = {
			trigger: "hover"
		};

		if (_.isString(options)) {
			_options.content = options;
		} else {
			_options = _.merge(_options, options);
		}
		TIPS_OPTIONS.set(refId, _options);
	}
	/* placement offset arrowOffset */
	function usePops(ele) {
		const $ele = $(ele);
		const refId = $ele.attr(SELECTOR_REFERENCE);
		const options = TIPS_OPTIONS.get(refId) || {};
		const trigger = options.trigger || "hover";
		const vmRefrence = VM_REFRENCE.get(refId);
		const vmPopover = VM_POPOVER.get(refId);
		let $popover = $(`[${SELECTOR_POPOVER}=${refId}]`);

		return {
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
			const PopoverComponent = await _.$importVue("/common/ui-x/directive/xtips/xtipsDefaultPopover.vue");
			PopoverComponent.parent = vmRefrence;

			vmPopover = new Vue(PopoverComponent);
			VM_POPOVER.set(refId, vmPopover);

			/* popover使用onPopoverChange */
			vmPopover.refId = refId;
			vmPopover.options = TIPS_OPTIONS.get(refId);
			vmPopover.options.$reference = $ele;

			vmRefrence.onPopoverChange = vmRefrence.onPopoverChange || {};
			vmRefrence.onPopoverChange[refId] = val => {
				if (!val) {
					if (["click", "rightClick"].includes(trigger)) {
						vmRefrence.popoverClearTimer = setTimeout(() => {
							vmPopover.$destroy();
							$popover.remove();
							vmRefrence.popoverClearTimer = null;
						}, 100);
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
		const { trigger } = usePops(this);
		if (["click", "rightClick"].includes(trigger)) {
			event.preventDefault();
			event.stopPropagation();
			ensurePopover({ ele: this });
		}
	}

	function handleEnterReference(event) {
		const { trigger } = usePops(this);
		if ("hover" === trigger) {
			ensurePopover({ ele: this });
		}
	}

	function handleFocusinReference(event) {
		const { trigger } = usePops(this);
		if ("focus" === trigger) {
			ensurePopover({ ele: this });
		}
	}

	function clear(el) {
		const { refId, vmPopover, $popover } = usePops(el);
		vmPopover && vmPopover.$destroy();
		$popover.remove();
		TIPS_OPTIONS.delete(refId);
		VM_REFRENCE.delete(refId);
		VM_POPOVER.delete(refId);
	}

	_.$single.doc
		/* click处理 */
		.on(`click.${EVENT_UI_TARGET}` /* 左键单击 */, `[${SELECTOR_REFERENCE}]`, handleClick)
		.on(`contextmenu.${EVENT_UI_TARGET}` /* 右键单击 */, `[${SELECTOR_REFERENCE}][data-trigger=rightClick]`, handleClick)
		/* hover处理 */
		.on(`mouseenter.${EVENT_UI_TARGET}`, `[${SELECTOR_REFERENCE}]`, handleEnterReference)
		/* focus处理 */
		.on(`mousedown.${EVENT_UI_TARGET}`, `[${SELECTOR_REFERENCE}]`, handleFocusinReference);
	//.on(`mouseup.${EVENT_UI_TARGET}`, `[${SELECTOR_REFERENCE}]`, handleFocusoutReference);

	return {
		name: "xtips",
		/* @ts-ignore */
		inserted(ele, binding, vnode) {
			/* v-xtips绑定在dom元素上 */
			const vm = vnode.componentInstance || vnode.context;
			const refId = _.$genId(X_TIPS_REF);
			setOptions(refId, binding.value);
			VM_REFRENCE.set(refId, vm);

			$(ele)
				.addClass(CLASS_NAME_REFERENCE)
				.attr({ [SELECTOR_REFERENCE]: refId });
		},
		componentUpdated(ele, binding) {
			const { refId, $popover, vmPopover } = usePops(ele);
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
	};
}
</script>

<style></style>
