<script lang="ts">
export default async function () {
	const nodeList = [];
	const EVENT_CLICK_OUTSIDE_CONTEXT = "@@clickoutsideContext";

	let startClick;
	let seed = 0;

	$(document)
		.on("mousedown", e => (startClick = e))
		.on("mouseup", e => {
			nodeList.forEach(node => {
				try {
					_.$callFn(node, `${EVENT_CLICK_OUTSIDE_CONTEXT}.documentHandler`)(
						e,
						startClick
					);
				} catch (error) {
					console.log("error:", error);
				}
			});
		});

	function createDocumentHandler(el, binding, vnode) {
		return function (mouseup = {}, mousedown = {}) {
			if (
				!vnode ||
				!vnode.context ||
				!mouseup.target ||
				!mousedown.target ||
				el.contains(mouseup.target) ||
				el.contains(mousedown.target) ||
				el === mouseup.target ||
				(vnode.context.popperElm &&
					(vnode.context.popperElm.contains(mouseup.target) ||
						vnode.context.popperElm.contains(mousedown.target)))
			)
				return;

			if (
				binding.expression &&
				el[EVENT_CLICK_OUTSIDE_CONTEXT].methodName &&
				vnode.context[el[EVENT_CLICK_OUTSIDE_CONTEXT].methodName]
			) {
				vnode.context[el[EVENT_CLICK_OUTSIDE_CONTEXT].methodName]({ mouseup, mousedown });
			} else {
				el[EVENT_CLICK_OUTSIDE_CONTEXT].bindingFn &&
					el[EVENT_CLICK_OUTSIDE_CONTEXT].bindingFn({ mouseup, mousedown });
			}
		};
	}

	/**
	 * v-clickoutside
	 * @desc 点击元素外面才会触发的事件
	 * @example
	 * ```vue
	 * <div v-clickoutside="handleClose">
	 * ```
	 */

	return Vue.directive("clickoutside", {
		bind(el, binding, vnode) {
			nodeList.push(el);
			const id = seed++;
			el[EVENT_CLICK_OUTSIDE_CONTEXT] = {
				id,
				documentHandler: createDocumentHandler(el, binding, vnode),
				methodName: binding.expression,
				bindingFn: binding.value
			};
		},

		update(el, binding, vnode) {
			el[EVENT_CLICK_OUTSIDE_CONTEXT].documentHandler = createDocumentHandler(
				el,
				binding,
				vnode
			);
			el[EVENT_CLICK_OUTSIDE_CONTEXT].methodName = binding.expression;
			el[EVENT_CLICK_OUTSIDE_CONTEXT].bindingFn = binding.value;
		},

		unbind(el) {
			let len = nodeList.length;

			for (let i = 0; i < len; i++) {
				if (
					nodeList[i][EVENT_CLICK_OUTSIDE_CONTEXT].id ===
					el[EVENT_CLICK_OUTSIDE_CONTEXT].id
				) {
					nodeList.splice(i, 1);
					break;
				}
			}
			delete el[EVENT_CLICK_OUTSIDE_CONTEXT];
		}
	});
}
</script>
