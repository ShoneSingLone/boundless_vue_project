<script lang="ts">
export default async function () {
	const xMoveClassName = "data-xmove";
	const { xLayerTools } = await _.$importVue("/common/libs/layer/xLayer.vue");

	_.$single.body.on(`mousedown.${xMoveClassName}`, `.${xMoveClassName}`, function (event) {
		const $ele = $(this);
		_.$single.mask.show();
		const clickInfo = _.$getLeftTopFromAbsolute($ele);
		clickInfo.w = $ele.width();
		clickInfo.h = $ele.height();
		/* @ts-ignore */
		const { top, left } = _.$getLeftTopFromTranslate($ele);

		clickInfo.translateX = left;
		clickInfo.translateY = top;

		const id = $ele.attr(xMoveClassName);
		const value = MOVE_ITEM_BINDING[id];

		if (value?.onStart) {
			value.onStart({
				$ele,
				clickInfo,
				clickEvent: event
			});
		}
		if (value?.onMoving) {
			xLayerTools.onMoving = movingEvent => {
				value.onMoving({
					$ele,
					clickInfo,
					clickEvent: event,
					movingEvent
				});
			};
		}
	});

	const MOVE_ITEM_BINDING = {};

	Vue.directive("xmove", {
		inserted(el, binding) {
			if (binding.value) {
				if (binding.value.onMoving) {
					const $ele = $(el);
					const id = _.$genId("xmove");
					MOVE_ITEM_BINDING[id] = binding.value;
					$ele.addClass(xMoveClassName);
					$ele.attr(xMoveClassName, id);
				}
			}
		},
		unbind(el) {
			const $ele = $(el);
			const id = $ele.attr(xMoveClassName);
			delete MOVE_ITEM_BINDING[id];
		}
	});
}
</script>
<style lang="less"></style>
