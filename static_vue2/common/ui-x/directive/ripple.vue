<script>
export default async function () {
	const DEFAULT_PLUGIN_OPTIONS = {
		directive: "ripple",
		color: "currentColor",
		initialOpacity: 0.2,
		finalOpacity: 0.1,
		duration: 400,
		easing: "ease-out",
		delay: 75,
		disabled: false
	};
	const createContainer = ({ borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius }) => {
		const rippleContainer = document.createElement("div");
		rippleContainer.style.top = "0";
		rippleContainer.style.left = "0";
		rippleContainer.style.width = "100%";
		rippleContainer.style.height = "100%";
		rippleContainer.style.position = "absolute";
		rippleContainer.style.borderRadius = `${borderTopLeftRadius} ${borderTopRightRadius} ${borderBottomRightRadius} ${borderBottomLeftRadius}`;
		rippleContainer.style.overflow = "hidden";
		rippleContainer.style.pointerEvents = "none";
		rippleContainer.style.webkitMaskImage = "-webkit-radial-gradient(white, black)";
		return rippleContainer;
	};
	const createrippleElement = (x, y, size, options) => {
		const rippleElement = document.createElement("div");
		rippleElement.style.position = "absolute";
		rippleElement.style.width = `${size}px`;
		rippleElement.style.height = `${size}px`;
		rippleElement.style.top = `${y}px`;
		rippleElement.style.left = `${x}px`;
		rippleElement.style.background = options.color;
		rippleElement.style.borderRadius = "50%";
		rippleElement.style.opacity = `${options.initialOpacity}`;
		rippleElement.style.transform = `translate(-50%,-50%) scale(0)`;
		rippleElement.style.transition = `transform ${options.duration / 1e3}s ${options.easing}, opacity ${options.duration / 1e3}s ${options.easing}`;
		return rippleElement;
	};
	function magnitude(x1, y1, x2, y2) {
		const deltaX = x1 - x2;
		const deltaY = y1 - y2;
		return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
	}
	function getDistanceToFurthestCorner(x, y, { width, height }) {
		const topLeft = magnitude(x, y, 0, 0);
		const topRight = magnitude(x, y, width, 0);
		const bottomLeft = magnitude(x, y, 0, height);
		const bottomRight = magnitude(x, y, width, height);
		return Math.max(topLeft, topRight, bottomLeft, bottomRight);
	}
	const getRelativePointer = ({ x, y }, { top, left }) => ({
		x: x - left,
		y: y - top
	});
	const RIPPLE_COUNT = "vRippleCountInternal";
	function setRippleCount(el, count) {
		el.dataset[RIPPLE_COUNT] = count.toString();
	}
	function getRippleCount(el) {
		return parseInt(el.dataset[RIPPLE_COUNT] ?? "0", 10);
	}
	function incrementRippleCount(el) {
		const count = getRippleCount(el);
		setRippleCount(el, count + 1);
	}
	function decrementRippleCount(el) {
		const count = getRippleCount(el);
		setRippleCount(el, count - 1);
	}
	function deleteRippleCount(el) {
		delete el.dataset[RIPPLE_COUNT];
	}
	const MULTIPLE_NUMBER = 2.05;
	const ripple = (event, el, options) => {
		const rect = el.getBoundingClientRect();
		const computedStyles = window.getComputedStyle(el);
		const { x, y } = getRelativePointer(event, rect);
		const size = MULTIPLE_NUMBER * getDistanceToFurthestCorner(x, y, rect);
		const rippleContainer = createContainer(computedStyles);
		const rippleEl = createrippleElement(x, y, size, options);
		let originalPositionValue = "";
		let shouldDissolveripple = false;
		let token = null;
		function dissolveripple() {
			rippleEl.style.transition = "opacity 150ms linear";
			rippleEl.style.opacity = "0";
			setTimeout(() => {
				rippleContainer.remove();
				decrementRippleCount(el);
				if (getRippleCount(el) === 0) {
					deleteRippleCount(el);
					el.style.position = originalPositionValue;
				}
			}, 150);
		}
		function releaseripple(e) {
			if (typeof e !== "undefined") {
				document.removeEventListener("pointerup", releaseripple);
				document.removeEventListener("pointercancel", releaseripple);
			}
			if (shouldDissolveripple) {
				dissolveripple();
			} else {
				shouldDissolveripple = true;
			}
		}
		function cancelripple() {
			clearTimeout(token);
			rippleContainer.remove();
			document.removeEventListener("pointerup", releaseripple);
			document.removeEventListener("pointercancel", releaseripple);
			document.removeEventListener("pointercancel", cancelripple);
		}
		incrementRippleCount(el);
		if (computedStyles.position === "static") {
			if (el.style.position) {
				originalPositionValue = el.style.position;
			}
			el.style.position = "relative";
		}
		rippleContainer.appendChild(rippleEl);
		el.appendChild(rippleContainer);
		document.addEventListener("pointerup", releaseripple);
		document.addEventListener("pointercancel", releaseripple);
		token = setTimeout(() => {
			document.removeEventListener("pointercancel", cancelripple);
			requestAnimationFrame(() => {
				rippleEl.style.transform = `translate(-50%,-50%) scale(1)`;
				rippleEl.style.opacity = `${options.finalOpacity}`;
				setTimeout(() => releaseripple(), options.duration);
			});
		}, options.delay);
		document.addEventListener("pointercancel", cancelripple);
	};
	const optionMap = /* @__PURE__ */ new WeakMap();
	const globalOptions = { ...DEFAULT_PLUGIN_OPTIONS };
	var rippleDirective = {
		inserted(el, binding) {
			optionMap.set(el, binding.value ?? {});
			el.addEventListener("pointerdown", event => {
				const options = optionMap.get(el);
				if (binding.value && binding.value.disabled) {
					return;
				}
				if (options === false) {
					return;
				}
				ripple(event, el, {
					...globalOptions,
					...options
				});
			});
		},
		update(el, binding) {
			optionMap.set(el, binding.value ?? {});
		}
	};
	return rippleDirective;
}
</script>

<style></style>
