<script lang="ts">
export default async function () {
	await _.$ensure(() => window.SRC_ROOT_PATH !== undefined);
	return (function () {
		var NProgress = {};
		NProgress.version = "0.2.0";

		var Settings = (NProgress.settings = {
			minimum: 0.08,
			easing: "ease",
			positionUsing: "",
			speed: 200,
			trickle: true,
			trickleRate: 0.02,
			trickleSpeed: 800,
			showSpinner: true,
			barSelector: '[role="bar"]',
			spinnerSelector: '[role="spinner"]',
			parent: "body",
			template:
				'<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
		});

		/**
		 * Updates configuration.
		 *
		 *     NProgress.configure({
		 *       minimum: 0.1
		 *     });
		 */
		NProgress.configure = function (options) {
			var key, value;
			for (key in options) {
				value = options[key];
				if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
			}

			return this;
		};

		/**
		 * Last number.
		 */

		NProgress.status = null;

		/**
		 * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
		 *
		 *     NProgress.set(0.4);
		 *     NProgress.set(1.0);
		 */

		NProgress.set = function (n) {
			var started = NProgress.isStarted();

			n = clamp(n, Settings.minimum, 1);
			NProgress.status = n === 1 ? null : n;

			var progress = NProgress.render(!started),
				bar = progress.querySelector(Settings.barSelector),
				speed = Settings.speed,
				ease = Settings.easing;

			progress.offsetWidth; /* Repaint */

			queue(function (next) {
				// Set positionUsing if it hasn't already been set
				if (Settings.positionUsing === "")
					Settings.positionUsing = NProgress.getPositioningCSS();

				// Add transition
				css(bar, barPositionCSS(n, speed, ease));

				if (n === 1) {
					// Fade out
					css(progress, {
						transition: "none",
						opacity: 1
					});
					progress.offsetWidth; /* Repaint */

					setTimeout(function () {
						css(progress, {
							transition: "all " + speed + "ms linear",
							opacity: 0
						});
						setTimeout(function () {
							NProgress.remove();
							next();
						}, speed);
					}, speed);
				} else {
					setTimeout(next, speed);
				}
			});

			return this;
		};

		NProgress.isStarted = function () {
			return typeof NProgress.status === "number";
		};

		/**
		 * Shows the progress bar.
		 * This is the same as setting the status to 0%, except that it doesn't go backwards.
		 *
		 *     NProgress.start();
		 *
		 */
		NProgress.start = function () {
			if (!NProgress.status) NProgress.set(0);

			var work = function () {
				setTimeout(function () {
					if (!NProgress.status) return;
					NProgress.trickle();
					work();
				}, Settings.trickleSpeed);
			};

			if (Settings.trickle) work();

			return this;
		};

		/**
		 * Hides the progress bar.
		 * This is the *sort of* the same as setting the status to 100%, with the
		 * difference being `done()` makes some placebo effect of some realistic motion.
		 *
		 *     NProgress.done();
		 *
		 * If `true` is passed, it will show the progress bar even if its hidden.
		 *
		 *     NProgress.done(true);
		 */

		NProgress.done = function (force) {
			if (!force && !NProgress.status) return this;

			return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
		};

		/**
		 * Increments by a random amount.
		 */

		NProgress.inc = function (amount) {
			var n = NProgress.status;

			if (!n) {
				return NProgress.start();
			} else {
				if (typeof amount !== "number") {
					amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
				}

				n = clamp(n + amount, 0, 0.994);
				return NProgress.set(n);
			}
		};

		NProgress.trickle = function () {
			return NProgress.inc(Math.random() * Settings.trickleRate);
		};

		/**
		 * Waits for all supplied jQuery promises and
		 * increases the progress as the promises resolve.
		 *
		 * @param $promise jQUery Promise
		 */
		(function () {
			var initial = 0,
				current = 0;

			NProgress.promise = function ($promise) {
				if (!$promise || $promise.state() === "resolved") {
					return this;
				}

				if (current === 0) {
					NProgress.start();
				}

				initial++;
				current++;

				$promise.always(function () {
					current--;
					if (current === 0) {
						initial = 0;
						NProgress.done();
					} else {
						NProgress.set((initial - current) / initial);
					}
				});

				return this;
			};
		})();

		/**
		 * (Internal) renders the progress bar markup based on the `template`
		 * setting.
		 */

		NProgress.render = function (fromStart) {
			if (NProgress.isRendered()) return document.getElementById("nprogress");

			addClass(document.documentElement, "nprogress-busy");

			var progress = document.createElement("div");
			progress.id = "nprogress";
			progress.innerHTML = Settings.template;

			var bar = progress.querySelector(Settings.barSelector),
				perc = fromStart ? "-100" : toBarPerc(NProgress.status || 0),
				parent = document.querySelector(Settings.parent),
				spinner;

			css(bar, {
				transition: "all 0 linear",
				transform: "translate3d(" + perc + "%,0,0)"
			});

			if (!Settings.showSpinner) {
				spinner = progress.querySelector(Settings.spinnerSelector);
				spinner && removeElement(spinner);
			}

			if (parent != document.body) {
				addClass(parent, "nprogress-custom-parent");
			}

			parent.appendChild(progress);
			return progress;
		};

		/**
		 * Removes the element. Opposite of render().
		 */

		NProgress.remove = function () {
			removeClass(document.documentElement, "nprogress-busy");
			removeClass(document.querySelector(Settings.parent), "nprogress-custom-parent");
			var progress = document.getElementById("nprogress");
			progress && removeElement(progress);
		};

		/**
		 * Checks if the progress bar is rendered.
		 */

		NProgress.isRendered = function () {
			return !!document.getElementById("nprogress");
		};

		/**
		 * Determine which positioning CSS rule to use.
		 */

		NProgress.getPositioningCSS = function () {
			// Sniff on document.body.style
			var bodyStyle = document.body.style;

			// Sniff prefixes
			var vendorPrefix =
				"WebkitTransform" in bodyStyle
					? "Webkit"
					: "MozTransform" in bodyStyle
						? "Moz"
						: "msTransform" in bodyStyle
							? "ms"
							: "OTransform" in bodyStyle
								? "O"
								: "";

			if (vendorPrefix + "Perspective" in bodyStyle) {
				// Modern browsers with 3D support, e.g. Webkit, IE10
				return "translate3d";
			} else if (vendorPrefix + "Transform" in bodyStyle) {
				// Browsers without 3D support, e.g. IE9
				return "translate";
			} else {
				// Browsers without translate() support, e.g. IE7-8
				return "margin";
			}
		};

		/**
		 * Helpers
		 */

		function clamp(n, min, max) {
			if (n < min) return min;
			if (n > max) return max;
			return n;
		}

		/**
		 * (Internal) converts a percentage (`0..1`) to a bar translateX
		 * percentage (`-100%..0%`).
		 */

		function toBarPerc(n) {
			return (-1 + n) * 100;
		}

		/**
		 * (Internal) returns the correct CSS for changing the bar's
		 * position given an n percentage, and speed and ease from Settings
		 */

		function barPositionCSS(n, speed, ease) {
			var barCSS;

			if (Settings.positionUsing === "translate3d") {
				barCSS = {
					transform: "translate3d(" + toBarPerc(n) + "%,0,0)"
				};
			} else if (Settings.positionUsing === "translate") {
				barCSS = { transform: "translate(" + toBarPerc(n) + "%,0)" };
			} else {
				barCSS = { "margin-left": toBarPerc(n) + "%" };
			}

			barCSS.transition = "all " + speed + "ms " + ease;

			return barCSS;
		}

		/**
		 * (Internal) Queues a function to be executed.
		 */

		var queue = (function () {
			var pending = [];

			function next() {
				var fn = pending.shift();
				if (fn) {
					fn(next);
				}
			}

			return function (fn) {
				pending.push(fn);
				if (pending.length == 1) next();
			};
		})();

		/**
		 * (Internal) Applies css properties to an element, similar to the jQuery
		 * css method.
		 *
		 * While this helper does assist with vendor prefixed property names, it
		 * does not perform any manipulation of values prior to setting styles.
		 */

		var css = (function () {
			var cssPrefixes = ["Webkit", "O", "Moz", "ms"],
				cssProps = {};

			function camelCase(string) {
				return string
					.replace(/^-ms-/, "ms-")
					.replace(/-([\da-z])/gi, function (match, letter) {
						return letter.toUpperCase();
					});
			}

			function getVendorProp(name) {
				var style = document.body.style;
				if (name in style) return name;

				var i = cssPrefixes.length,
					capName = name.charAt(0).toUpperCase() + name.slice(1),
					vendorName;
				while (i--) {
					vendorName = cssPrefixes[i] + capName;
					if (vendorName in style) return vendorName;
				}

				return name;
			}

			function getStyleProp(name) {
				name = camelCase(name);
				return cssProps[name] || (cssProps[name] = getVendorProp(name));
			}

			function applyCss(element, prop, value) {
				prop = getStyleProp(prop);
				element.style[prop] = value;
			}

			return function (element, properties) {
				var args = arguments,
					prop,
					value;

				if (args.length == 2) {
					for (prop in properties) {
						value = properties[prop];
						if (value !== undefined && properties.hasOwnProperty(prop))
							applyCss(element, prop, value);
					}
				} else {
					applyCss(element, args[1], args[2]);
				}
			};
		})();

		function addClass(element, name) {
			$(element).addClass(name);
		}

		function removeClass(element, name) {
			$(element).removeClass(name);
		}

		function removeElement(element) {
			$(element).remove();
		}

		return NProgress;
	})();
}
</script>
<style lang="less">
/* Make clicks pass-through */
#nprogress {
	pointer-events: none;
}

#nprogress .bar {
	background: var(--el-color-primary);

	position: fixed;
	z-index: 1031;
	top: 0;
	left: 0;

	width: 100%;
	height: 2px;
}

/* Fancy blur effect */
#nprogress .peg {
	display: block;
	position: absolute;
	right: 0px;
	width: 100px;
	height: 100%;
	box-shadow:
		0 0 10px var(--el-color-primary),
		0 0 5px var(--el-color-primary);
	opacity: 1;

	-webkit-transform: rotate(3deg) translate(0px, -4px);
	-ms-transform: rotate(3deg) translate(0px, -4px);
	transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
#nprogress .spinner {
	display: block;
	position: fixed;
	z-index: 1031;
	top: 15px;
	right: 15px;
}

#nprogress .spinner-icon {
	width: 18px;
	height: 18px;
	box-sizing: border-box;

	border: solid 2px transparent;
	border-top-color: var(--el-color-primary);
	border-left-color: var(--el-color-primary);
	border-radius: 50%;

	-webkit-animation: nprogress-spinner 400ms linear infinite;
	animation: nprogress-spinner 400ms linear infinite;
}

.nprogress-custom-parent {
	overflow: hidden;
	position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
	position: absolute;
}

@-webkit-keyframes nprogress-spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}

	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes nprogress-spinner {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
