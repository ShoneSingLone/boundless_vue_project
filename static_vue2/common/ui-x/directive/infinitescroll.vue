<style lang="less"></style>
<script lang="ts">
export default async function () {
	const SCOPE = "xInfiniteScroll";
	const CHECK_INTERVAL = 50;

	const { getScrollOptions, getScrollContainer, getOffsetTopDistance } = _xUtils;

	const destroyObserver = el => {
		const { observer } = el[SCOPE];

		if (observer) {
			observer.disconnect();
			delete el[SCOPE].observer;
		}
	};

	const handleScroll = (el, handleScrollChange) => {
		const { container, containerEl, observer, lastScrollTop } = el[SCOPE];
		const { disabled, distance, up } = getScrollOptions(el);
		const { clientHeight, scrollHeight, scrollTop } = containerEl;
		const awaitScroll = async ({ needTriggerScrollTop } = { needTriggerScrollTop: false }) => {
			await handleScrollChange.call(el, { delta });
			/* TODO: 是否需要保持之前的scrollTop？*/
			/* if (needTriggerScrollTop) {
				const { scrollHeight: newScrollHeight } = containerEl;
				el[SCOPE].triggerSrollTop(newScrollHeight - scrollHeight);
			} */
		};
		const delta = scrollTop - lastScrollTop;

		el[SCOPE].lastScrollTop = scrollTop;

		// trigger only if full check has done and not disabled and scroll down
		if (observer || disabled) {
			return;
		} else if (up && delta < 0 && scrollTop === 0) {
			/* 滚动到顶部，直接触发  */
			return awaitScroll({ needTriggerScrollTop: true });
		} else {
			/* 向下滚动 */
			let shouldTrigger = false;

			if (container === el) {
				shouldTrigger = scrollHeight - (clientHeight + scrollTop) <= distance;
			} else {
				// get the scrollHeight since el might be visible overflow
				const { clientTop, scrollHeight: height } = el;
				const offsetTop = getOffsetTopDistance(el, containerEl);
				shouldTrigger =
					scrollTop + clientHeight >= offsetTop + clientTop + height - distance;
			}

			if (shouldTrigger) {
				return awaitScroll();
			}
		}
	};

	function checkFull(el, cb) {
		const { containerEl, instance } = el[SCOPE];
		const { disabled } = getScrollOptions(el, instance);

		if (disabled || containerEl.clientHeight === 0) return;

		if (containerEl.scrollHeight <= containerEl.clientHeight) {
			cb.call(instance);
		} else {
			destroyObserver(el);
		}
	}

	return Vue.directive("InfiniteScroll", {
		async inserted(el, binding) {
			const { value: cb } = binding;

			if (!_.isFunction(cb)) {
				console.log(SCOPE, "'v-infinite-scroll' binding value must be a function");
			}

			// ensure parentNode mounted
			await nextTick();

			const { delay, immediate } = getScrollOptions(el);
			const container = getScrollContainer(el, true);
			const containerEl = container === window ? document.documentElement : container;
			const onScroll = _.throttle(handleScroll.bind(null, el, cb), delay);

			if (!container) return;

			el[SCOPE] = {
				triggerSrollTop: _.debounce(scrollTop => {
					containerEl.scrollTop = scrollTop;
				}, 100),
				container,
				containerEl,
				delay,
				cb,
				onScroll,
				lastScrollTop: containerEl.scrollTop
			};

			if (immediate) {
				const observer = new MutationObserver(
					_.throttle(checkFull.bind(null, el, cb), CHECK_INTERVAL)
				);
				el[SCOPE].observer = observer;
				observer.observe(el, { childList: true, subtree: true });
				checkFull(el, cb);
			}

			container.addEventListener("scroll", onScroll);
		},
		async update(el) {
			if (!el[SCOPE]) {
				await nextTick();
			} else {
				const { containerEl, cb, observer } = el[SCOPE];
				if (containerEl.clientHeight && observer) {
					checkFull(el, cb);
				}
			}
		},
		unbind(el) {
			const { container, onScroll } = el[SCOPE];
			container?.removeEventListener("scroll", onScroll);
			destroyObserver(el);
		}
	});
}
</script>
