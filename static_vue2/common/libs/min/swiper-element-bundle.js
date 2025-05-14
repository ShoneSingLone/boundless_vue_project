(() => {
	function r(e) {
		return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
	}
	function i(t, a) {
		void 0 === t && (t = {}),
			void 0 === a && (a = {}),
			Object.keys(a).forEach(e => {
				void 0 === t[e]
					? (t[e] = a[e])
					: r(a[e]) && r(t[e]) && 0 < Object.keys(a[e]).length && i(t[e], a[e]);
			});
	}
	let t = {
		body: {},
		addEventListener() {},
		removeEventListener() {},
		activeElement: { blur() {}, nodeName: "" },
		querySelector() {
			return null;
		},
		querySelectorAll() {
			return [];
		},
		getElementById() {
			return null;
		},
		createEvent() {
			return { initEvent() {} };
		},
		createElement() {
			return {
				children: [],
				childNodes: [],
				style: {},
				setAttribute() {},
				getElementsByTagName() {
					return [];
				}
			};
		},
		createElementNS() {
			return {};
		},
		importNode() {
			return null;
		},
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		}
	};
	function k() {
		var e = "undefined" != typeof document ? document : {};
		return i(e, t), e;
	}
	let a = {
		document: t,
		navigator: { userAgent: "" },
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		},
		history: { replaceState() {}, pushState() {}, go() {}, back() {} },
		CustomEvent: function () {
			return this;
		},
		addEventListener() {},
		removeEventListener() {},
		getComputedStyle() {
			return {
				getPropertyValue() {
					return "";
				}
			};
		},
		Image() {},
		Date() {},
		screen: {},
		setTimeout() {},
		clearTimeout() {},
		matchMedia() {
			return {};
		},
		requestAnimationFrame(e) {
			return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0);
		},
		cancelAnimationFrame(e) {
			"undefined" != typeof setTimeout && clearTimeout(e);
		}
	};
	function G() {
		var e = "undefined" != typeof window ? window : {};
		return i(e, a), e;
	}
	function T(e) {
		return (e = void 0 === e ? "" : e)
			.trim()
			.split(" ")
			.filter(e => !!e.trim());
	}
	function M(e, t) {
		return void 0 === t && (t = 0), setTimeout(e, t);
	}
	function f() {
		return Date.now();
	}
	function B(e, t) {
		void 0 === t && (t = "x");
		var a = G();
		let i, s, r;
		e = (e => {
			var t = G();
			let a;
			return (a =
				(a =
					!(a = t.getComputedStyle ? t.getComputedStyle(e, null) : a) && e.currentStyle
						? e.currentStyle
						: a) || e.style);
		})(e);
		return (
			a.WebKitCSSMatrix
				? (6 < (s = e.transform || e.webkitTransform).split(",").length &&
						(s = s
							.split(", ")
							.map(e => e.replace(",", "."))
							.join(", ")),
					(r = new a.WebKitCSSMatrix("none" === s ? "" : s)))
				: ((r =
						e.MozTransform ||
						e.OTransform ||
						e.MsTransform ||
						e.msTransform ||
						e.transform ||
						e
							.getPropertyValue("transform")
							.replace("translate(", "matrix(1, 0, 0, 1,")),
					(i = r.toString().split(","))),
			"x" === t &&
				(s = a.WebKitCSSMatrix
					? r.m41
					: 16 === i.length
						? parseFloat(i[12])
						: parseFloat(i[4])),
			(s =
				"y" === t
					? a.WebKitCSSMatrix
						? r.m42
						: 16 === i.length
							? parseFloat(i[13])
							: parseFloat(i[5])
					: s) || 0
		);
	}
	function o(e) {
		return (
			"object" == typeof e &&
			null !== e &&
			e.constructor &&
			"Object" === Object.prototype.toString.call(e).slice(8, -1)
		);
	}
	function u(e) {
		var t,
			a = Object(arguments.length <= 0 ? void 0 : e);
		let i = ["__proto__", "constructor", "prototype"];
		for (let e = 1; e < arguments.length; e += 1) {
			var s = e < 0 || arguments.length <= e ? void 0 : arguments[e];
			if (
				null != s &&
				((t = s),
				!("undefined" != typeof window && void 0 !== window.HTMLElement
					? t instanceof HTMLElement
					: t && (1 === t.nodeType || 11 === t.nodeType)))
			) {
				var r = Object.keys(Object(s)).filter(e => i.indexOf(e) < 0);
				for (let e = 0, t = r.length; e < t; e += 1) {
					var l = r[e],
						n = Object.getOwnPropertyDescriptor(s, l);
					void 0 !== n &&
						n.enumerable &&
						(o(a[l]) && o(s[l])
							? s[l].__swiper__
								? (a[l] = s[l])
								: u(a[l], s[l])
							: o(a[l]) || !o(s[l]) || ((a[l] = {}), s[l].__swiper__)
								? (a[l] = s[l])
								: u(a[l], s[l]));
				}
			}
		}
		return a;
	}
	function $(e, t, a) {
		e.style.setProperty(t, a);
	}
	function S(e) {
		let { swiper: a, targetPosition: i, side: s } = e,
			r = G(),
			l = -a.translate,
			n = null,
			o,
			d = a.params.speed,
			p =
				((a.wrapperEl.style.scrollSnapType = "none"),
				r.cancelAnimationFrame(a.cssModeFrameID),
				i > l ? "next" : "prev"),
			c = (e, t) => ("next" === p && t <= e) || ("prev" === p && e <= t),
			u = () => {
				(o = new Date().getTime()), null === n && (n = o);
				var e = Math.max(Math.min((o - n) / d, 1), 0),
					e = 0.5 - Math.cos(e * Math.PI) / 2;
				let t = l + e * (i - l);
				c(t, i) && (t = i),
					a.wrapperEl.scrollTo({ [s]: t }),
					c(t, i)
						? ((a.wrapperEl.style.overflow = "hidden"),
							(a.wrapperEl.style.scrollSnapType = ""),
							setTimeout(() => {
								(a.wrapperEl.style.overflow = ""), a.wrapperEl.scrollTo({ [s]: t });
							}),
							r.cancelAnimationFrame(a.cssModeFrameID))
						: (a.cssModeFrameID = r.requestAnimationFrame(u));
			};
		u();
	}
	function s(e) {
		return (
			e.querySelector(".swiper-slide-transform") ||
			(e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) ||
			e
		);
	}
	function R(e, t) {
		void 0 === t && (t = "");
		var a = [...e.children];
		return (
			e instanceof HTMLSlotElement && a.push(...e.assignedElements()),
			t ? a.filter(e => e.matches(t)) : a
		);
	}
	function b(e, t) {
		let a = t.contains(e);
		var i;
		return (
			!a &&
				t instanceof HTMLSlotElement &&
				((i = [...t.assignedElements()]),
				(a =
					(a = i.includes(e)) ||
					((e, t) => {
						for (var a = [t]; 0 < a.length; ) {
							var i = a.shift();
							if (e === i) return !0;
							a.push(
								...i.children,
								...(_.$val(i, "shadowRoot.children") || []),
								...(i.assignedElements?.() || [])
							);
						}
					})(e, t))),
			a
		);
	}
	function z(e) {
		try {
			console.warn(e);
		} catch (e) {}
	}
	function A(e, t) {
		void 0 === t && (t = []);
		e = document.createElement(e);
		return e.classList.add(...(Array.isArray(t) ? t : T(t))), e;
	}
	function H(e) {
		var t = G(),
			a = k(),
			i = e.getBoundingClientRect(),
			a = a.body,
			s = e.clientTop || a.clientTop || 0,
			a = e.clientLeft || a.clientLeft || 0,
			r = e === t ? t.scrollY : e.scrollTop,
			t = e === t ? t.scrollX : e.scrollLeft;
		return { top: i.top + r - s, left: i.left + t - a };
	}
	function X(e, t) {
		return G().getComputedStyle(e, null).getPropertyValue(t);
	}
	function C(e) {
		let t = e,
			a;
		if (t) {
			for (a = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (a += 1);
			return a;
		}
	}
	function N(e, t) {
		var a = [];
		let i = e.parentElement;
		for (; i; ) (t && !i.matches(t)) || a.push(i), (i = i.parentElement);
		return a;
	}
	function g(a, i) {
		i &&
			a.addEventListener("transitionend", function e(t) {
				t.target === a && (i.call(a, t), a.removeEventListener("transitionend", e));
			});
	}
	function Y(e, t, a) {
		var i = G();
		return a
			? e["width" === t ? "offsetWidth" : "offsetHeight"] +
					parseFloat(
						i
							.getComputedStyle(e, null)
							.getPropertyValue("width" === t ? "margin-right" : "margin-top")
					) +
					parseFloat(
						i
							.getComputedStyle(e, null)
							.getPropertyValue("width" === t ? "margin-left" : "margin-bottom")
					)
			: e.offsetWidth;
	}
	function P(e) {
		return (Array.isArray(e) ? e : [e]).filter(e => !!e);
	}
	function y(t) {
		return e =>
			0 < Math.abs(e) && t.browser && t.browser.need3dFix && Math.abs(e) % 90 == 0
				? e + 0.001
				: e;
	}
	let D;
	function q() {
		var e, t;
		return (D =
			D ||
			((e = G()),
			{
				smoothScroll:
					(t = k()).documentElement &&
					t.documentElement.style &&
					"scrollBehavior" in t.documentElement.style,
				touch: !!("ontouchstart" in e || (e.DocumentTouch && t instanceof e.DocumentTouch))
			}));
	}
	let F;
	function V(e) {
		return (
			void 0 === e && (e = {}),
			(F =
				F ||
				(e => {
					var e = (void 0 === e ? {} : e).userAgent,
						t = q(),
						a = (r = G()).navigator.platform,
						e = e || r.navigator.userAgent,
						i = { ios: !1, android: !1 },
						s = r.screen.width,
						r = r.screen.height,
						l = e.match(/(Android);?[\s\/]+([\d.]+)?/);
					let n = e.match(/(iPad).*OS\s([\d_]+)/);
					var o = e.match(/(iPod)(.*OS\s([\d_]+))?/),
						d = !n && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
						p = "Win32" === a,
						a = "MacIntel" === a;
					return (
						!n &&
							a &&
							t.touch &&
							0 <=
								[
									"1024x1366",
									"1366x1024",
									"834x1194",
									"1194x834",
									"834x1112",
									"1112x834",
									"768x1024",
									"1024x768",
									"820x1180",
									"1180x820",
									"810x1080",
									"1080x810"
								].indexOf(s + "x" + r) &&
							(n = (n = e.match(/(Version)\/([\d.]+)/)) || [0, 1, "13_0_0"]),
						l && !p && ((i.os = "android"), (i.android = !0)),
						(n || d || o) && ((i.os = "ios"), (i.ios = !0)),
						i
					);
				})(e))
		);
	}
	let e;
	function j() {
		return (e =
			e ||
			(() => {
				let t = G();
				var e = V();
				let a = !1;
				function i() {
					var e = t.navigator.userAgent.toLowerCase();
					return (
						0 <= e.indexOf("safari") &&
						e.indexOf("chrome") < 0 &&
						e.indexOf("android") < 0
					);
				}
				i() &&
					(s = String(t.navigator.userAgent)).includes("Version/") &&
					(([s, r] = s
						.split("Version/")[1]
						.split(" ")[0]
						.split(".")
						.map(e => Number(e))),
					(a = s < 16 || (16 === s && r < 2)));
				var s = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent),
					r = i(),
					e = r || (s && e.ios);
				return { isSafari: a || r, needPerspectiveFix: a, need3dFix: e, isWebView: s };
			})());
	}
	let W = (e, t, a) => {
			t && !e.classList.contains(a)
				? e.classList.add(a)
				: !t && e.classList.contains(a) && e.classList.remove(a);
		},
		c = (e, t, a) => {
			t && !e.classList.contains(a)
				? e.classList.add(a)
				: !t && e.classList.contains(a) && e.classList.remove(a);
		},
		l = (a, e) => {
			if (a && !a.destroyed && a.params) {
				let t = e.closest(a.isElement ? "swiper-slide" : "." + a.params.slideClass);
				if (t) {
					let e = t.querySelector("." + a.params.lazyPreloaderClass);
					!e &&
						a.isElement &&
						(t.shadowRoot
							? (e = t.shadowRoot.querySelector("." + a.params.lazyPreloaderClass))
							: requestAnimationFrame(() => {
									t.shadowRoot &&
										(e = t.shadowRoot.querySelector(
											"." + a.params.lazyPreloaderClass
										)) &&
										e.remove();
								})),
						e && e.remove();
				}
			}
		},
		d = (e, t) => {
			e.slides[t] &&
				(e = e.slides[t].querySelector('[loading="lazy"]')) &&
				e.removeAttribute("loading");
		},
		m = r => {
			if (r && !r.destroyed && r.params) {
				var t = r.params.lazyPreloadPrevNext,
					a = r.slides.length;
				if (a && t && !(t < 0)) {
					t = Math.min(t, a);
					let s =
						"auto" === r.params.slidesPerView
							? r.slidesPerViewDynamic()
							: Math.ceil(r.params.slidesPerView);
					var l = r.activeIndex;
					if (r.params.grid && 1 < r.params.grid.rows) {
						let a = l,
							i = [a - t];
						i.push(...Array.from({ length: t }).map((e, t) => a + s + t)),
							void r.slides.forEach((e, t) => {
								i.includes(e.column) && d(r, t);
							});
					} else {
						var i = l + s - 1;
						if (r.params.rewind || r.params.loop)
							for (let e = l - t; e <= i + t; e += 1) {
								var n = ((e % a) + a) % a;
								(n < l || i < n) && d(r, n);
							}
						else
							for (let e = Math.max(l - t, 0); e <= Math.min(i + t, a - 1); e += 1)
								e !== l && (e > i || e < l) && d(r, e);
					}
				}
			}
		};
	function U(e) {
		var { swiper: e, runCallbacks: t, direction: a, step: i } = e,
			{ activeIndex: s, previousIndex: r } = e;
		let l = a;
		(l = l || (r < s ? "next" : s < r ? "prev" : "reset")),
			e.emit("transition" + i),
			t &&
				s !== r &&
				("reset" === l
					? e.emit("slideResetTransition" + i)
					: (e.emit("slideChangeTransition" + i),
						"next" === l
							? e.emit("slideNextTransition" + i)
							: e.emit("slidePrevTransition" + i)));
	}
	function K(i, e) {
		return (function e(t) {
			var a;
			return t &&
				t !== k() &&
				t !== G() &&
				((a = (t = t.assignedSlot || t).closest(i)) || t.getRootNode)
				? a || e(t.getRootNode().host)
				: null;
		})((e = void 0 === e ? this : e));
	}
	function Z(e, t, a) {
		var i = G(),
			e = e.params,
			s = e.edgeSwipeDetection,
			e = e.edgeSwipeThreshold;
		return (
			!s || !(a <= e || a >= i.innerWidth - e) || ("prevent" === s && (t.preventDefault(), 1))
		);
	}
	function Q() {
		let e = this;
		var t,
			a,
			i,
			s,
			{ params: r, el: l } = e;
		(l && 0 === l.offsetWidth) ||
			(r.breakpoints && e.setBreakpoint(),
			({ allowSlideNext: l, allowSlidePrev: t, snapGrid: a } = e),
			(i = e.virtual && e.params.virtual.enabled),
			(e.allowSlideNext = !0),
			(e.allowSlidePrev = !0),
			e.updateSize(),
			e.updateSlides(),
			e.updateSlidesClasses(),
			(s = i && r.loop),
			!("auto" === r.slidesPerView || 1 < r.slidesPerView) ||
			!e.isEnd ||
			e.isBeginning ||
			e.params.centeredSlides ||
			s
				? e.params.loop && !i
					? e.slideToLoop(e.realIndex, 0, !1, !0)
					: e.slideTo(e.activeIndex, 0, !1, !0)
				: e.slideTo(e.slides.length - 1, 0, !1, !0),
			e.autoplay &&
				e.autoplay.running &&
				e.autoplay.paused &&
				(clearTimeout(e.autoplay.resizeTimeout),
				(e.autoplay.resizeTimeout = setTimeout(() => {
					e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
				}, 500))),
			(e.allowSlidePrev = t),
			(e.allowSlideNext = l),
			e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow());
	}
	let J = (e, t) => {
			var a = k(),
				{ params: i, el: s, wrapperEl: r, device: l } = e,
				n = !!i.nested,
				o = "on" === t ? "addEventListener" : "removeEventListener";
			s &&
				"string" != typeof s &&
				(a[o]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: n }),
				s[o]("touchstart", e.onTouchStart, { passive: !1 }),
				s[o]("pointerdown", e.onTouchStart, { passive: !1 }),
				a[o]("touchmove", e.onTouchMove, { passive: !1, capture: n }),
				a[o]("pointermove", e.onTouchMove, { passive: !1, capture: n }),
				a[o]("touchend", e.onTouchEnd, { passive: !0 }),
				a[o]("pointerup", e.onTouchEnd, { passive: !0 }),
				a[o]("pointercancel", e.onTouchEnd, { passive: !0 }),
				a[o]("touchcancel", e.onTouchEnd, { passive: !0 }),
				a[o]("pointerout", e.onTouchEnd, { passive: !0 }),
				a[o]("pointerleave", e.onTouchEnd, { passive: !0 }),
				a[o]("contextmenu", e.onTouchEnd, { passive: !0 }),
				(i.preventClicks || i.preventClicksPropagation) && s[o]("click", e.onClick, !0),
				i.cssMode && r[o]("scroll", e.onScroll),
				i.updateOnWindowResize
					? e[t](
							l.ios || l.android
								? "resize orientationchange observerUpdate"
								: "resize observerUpdate",
							Q,
							!0
						)
					: e[t]("observerUpdate", Q, !0),
				s[o]("load", e.onLoad, { capture: !0 }));
		},
		ee = {
			attachEvents: function () {
				var e = this,
					t = e.params;
				(e.onTouchStart = function (a) {
					var i = this,
						s = k();
					let r = a;
					if (
						(r.originalEvent && (r = r.originalEvent),
						(a = i.touchEventsData),
						"pointerdown" === r.type)
					) {
						if (null !== a.pointerId && a.pointerId !== r.pointerId) return;
						a.pointerId = r.pointerId;
					} else
						"touchstart" === r.type &&
							1 === r.targetTouches.length &&
							(a.touchId = r.targetTouches[0].identifier);
					if ("touchstart" === r.type) Z(i, r, r.targetTouches[0].pageX);
					else {
						var { params: l, touches: n, enabled: o } = i;
						if (
							o &&
							(l.simulateTouch || "mouse" !== r.pointerType) &&
							(!i.animating || !l.preventInteractionOnTransition)
						) {
							!i.animating && l.cssMode && l.loop && i.loopFix();
							let t = r.target;
							if (
								("wrapper" !== l.touchEventsTarget || b(t, i.wrapperEl)) &&
								!(
									("which" in r && 3 === r.which) ||
									("button" in r && 0 < r.button) ||
									(a.isTouched && a.isMoved)
								)
							) {
								var o = !!l.noSwipingClass && "" !== l.noSwipingClass,
									d = r.composedPath ? r.composedPath() : r.path,
									o =
										(o && r.target && r.target.shadowRoot && d && (t = d[0]),
										l.noSwipingSelector || "." + l.noSwipingClass),
									d = !(!r.target || !r.target.shadowRoot);
								if (l.noSwiping && (d ? K(o, t) : t.closest(o))) i.allowClick = !0;
								else if (!l.swipeHandler || t.closest(l.swipeHandler)) {
									(n.currentX = r.pageX), (n.currentY = r.pageY);
									(d = n.currentX), (o = n.currentY);
									if (Z(i, r, d)) {
										Object.assign(a, {
											isTouched: !0,
											isMoved: !1,
											allowTouchCallbacks: !0,
											isScrolling: void 0,
											startMoving: void 0
										}),
											(n.startX = d),
											(n.startY = o),
											(a.touchStartTime = f()),
											(i.allowClick = !0),
											i.updateSize(),
											(i.swipeDirection = void 0),
											0 < l.threshold && (a.allowThresholdMove = !1);
										let e = !0;
										t.matches(a.focusableElements) &&
											((e = !1), "SELECT" === t.nodeName) &&
											(a.isTouched = !1),
											s.activeElement &&
												s.activeElement.matches(a.focusableElements) &&
												s.activeElement !== t &&
												("mouse" === r.pointerType ||
													("mouse" !== r.pointerType &&
														!t.matches(a.focusableElements))) &&
												s.activeElement.blur();
										d = e && i.allowTouchMove && l.touchStartPreventDefault;
										(!l.touchStartForcePreventDefault && !d) ||
											t.isContentEditable ||
											r.preventDefault(),
											l.freeMode &&
												l.freeMode.enabled &&
												i.freeMode &&
												i.animating &&
												!l.cssMode &&
												i.freeMode.onTouchStart(),
											i.emit("touchStart", r);
									}
								}
							}
						}
					}
				}.bind(e)),
					(e.onTouchMove = function (t) {
						var s = k(),
							r = this;
						let l = r.touchEventsData;
						var { params: n, touches: o, rtlTranslate: d, enabled: p } = r;
						if (p && (n.simulateTouch || "mouse" !== t.pointerType)) {
							let i = t;
							if (
								"pointermove" === (i = i.originalEvent ? i.originalEvent : i).type
							) {
								if (null !== l.touchId) return;
								if (i.pointerId !== l.pointerId) return;
							}
							let e;
							if ("touchmove" === i.type) {
								if (
									!(e = [...i.changedTouches].find(
										e => e.identifier === l.touchId
									)) ||
									e.identifier !== l.touchId
								)
									return;
							} else e = i;
							if (l.isTouched) {
								(p = e.pageX), (t = e.pageY);
								if (i.preventedByNestedSwiper) (o.startX = p), (o.startY = t);
								else if (r.allowTouchMove) {
									if (n.touchReleaseOnEdges && !n.loop)
										if (r.isVertical()) {
											if (
												(t < o.startY && r.translate <= r.maxTranslate()) ||
												(t > o.startY && r.translate >= r.minTranslate())
											)
												return (l.isTouched = !1), void (l.isMoved = !1);
										} else if (
											(p < o.startX && r.translate <= r.maxTranslate()) ||
											(p > o.startX && r.translate >= r.minTranslate())
										)
											return;
									if (
										(s.activeElement &&
											s.activeElement.matches(l.focusableElements) &&
											s.activeElement !== i.target &&
											"mouse" !== i.pointerType &&
											s.activeElement.blur(),
										s.activeElement &&
											i.target === s.activeElement &&
											i.target.matches(l.focusableElements))
									)
										(l.isMoved = !0), (r.allowClick = !1);
									else {
										l.allowTouchCallbacks && r.emit("touchMove", i),
											(o.previousX = o.currentX),
											(o.previousY = o.currentY),
											(o.currentX = p),
											(o.currentY = t);
										var s = o.currentX - o.startX,
											c = o.currentY - o.startY;
										if (
											!(
												r.params.threshold &&
												Math.sqrt(s ** 2 + c ** 2) < r.params.threshold
											)
										)
											if (
												(void 0 === l.isScrolling &&
													((r.isHorizontal() &&
														o.currentY === o.startY) ||
													(r.isVertical() && o.currentX === o.startX)
														? (l.isScrolling = !1)
														: 25 <= s * s + c * c &&
															((u =
																(180 *
																	Math.atan2(
																		Math.abs(c),
																		Math.abs(s)
																	)) /
																Math.PI),
															(l.isScrolling = r.isHorizontal()
																? u > n.touchAngle
																: 90 - u > n.touchAngle))),
												l.isScrolling && r.emit("touchMoveOpposite", i),
												void 0 !== l.startMoving ||
													(o.currentX === o.startX &&
														o.currentY === o.startY) ||
													(l.startMoving = !0),
												l.isScrolling ||
													("touchmove" === i.type &&
														l.preventTouchMoveFromPointerMove))
											)
												l.isTouched = !1;
											else if (l.startMoving) {
												(r.allowClick = !1),
													!n.cssMode &&
														i.cancelable &&
														i.preventDefault(),
													n.touchMoveStopPropagation &&
														!n.nested &&
														i.stopPropagation();
												let a = r.isHorizontal() ? s : c,
													e = r.isHorizontal()
														? o.currentX - o.previousX
														: o.currentY - o.previousY;
												n.oneWayMovement &&
													((a = Math.abs(a) * (d ? 1 : -1)),
													(e = Math.abs(e) * (d ? 1 : -1))),
													(o.diff = a),
													(a *= n.touchRatio),
													d && ((a = -a), (e = -e));
												var u = r.touchesDirection,
													s =
														((r.swipeDirection =
															0 < a ? "prev" : "next"),
														(r.touchesDirection =
															0 < e ? "prev" : "next"),
														r.params.loop && !n.cssMode),
													c =
														("next" === r.touchesDirection &&
															r.allowSlideNext) ||
														("prev" === r.touchesDirection &&
															r.allowSlidePrev);
												if (
													(l.isMoved ||
														(s &&
															c &&
															r.loopFix({
																direction: r.swipeDirection
															}),
														(l.startTranslate = r.getTranslate()),
														r.setTransition(0),
														r.animating &&
															((d = new window.CustomEvent(
																"transitionend",
																{
																	bubbles: !0,
																	cancelable: !0,
																	detail: {
																		bySwiperTouchMove: !0
																	}
																}
															)),
															r.wrapperEl.dispatchEvent(d)),
														(l.allowMomentumBounce = !1),
														!n.grabCursor ||
															(!0 !== r.allowSlideNext &&
																!0 !== r.allowSlidePrev) ||
															r.setGrabCursor(!0),
														r.emit("sliderFirstMove", i)),
													new Date().getTime(),
													l.isMoved &&
														l.allowThresholdMove &&
														u !== r.touchesDirection &&
														s &&
														c &&
														1 <= Math.abs(a))
												)
													Object.assign(o, {
														startX: p,
														startY: t,
														currentX: p,
														currentY: t,
														startTranslate: l.currentTranslate
													}),
														(l.loopSwapReset = !0),
														(l.startTranslate = l.currentTranslate);
												else {
													r.emit("sliderMove", i),
														(l.isMoved = !0),
														(l.currentTranslate = a + l.startTranslate);
													let e = !0,
														t = n.resistanceRatio;
													if (
														(n.touchReleaseOnEdges && (t = 0),
														0 < a
															? (s &&
																	c &&
																	l.allowThresholdMove &&
																	l.currentTranslate >
																		(n.centeredSlides
																			? r.minTranslate() -
																				r.slidesSizesGrid[
																					r.activeIndex +
																						1
																				] -
																				("auto" !==
																					n.slidesPerView &&
																				2 <=
																					r.slides
																						.length -
																						n.slidesPerView
																					? r
																							.slidesSizesGrid[
																							r.activeIndex +
																								1
																						] +
																						r.params
																							.spaceBetween
																					: 0) -
																				r.params
																					.spaceBetween
																			: r.minTranslate()) &&
																	r.loopFix({
																		direction: "prev",
																		setTranslate: !0,
																		activeSlideIndex: 0
																	}),
																l.currentTranslate >
																	r.minTranslate() &&
																	((e = !1), n.resistance) &&
																	(l.currentTranslate =
																		r.minTranslate() -
																		1 +
																		(-r.minTranslate() +
																			l.startTranslate +
																			a) **
																			t))
															: a < 0 &&
																(s &&
																	c &&
																	l.allowThresholdMove &&
																	l.currentTranslate <
																		(n.centeredSlides
																			? r.maxTranslate() +
																				r.slidesSizesGrid[
																					r
																						.slidesSizesGrid
																						.length - 1
																				] +
																				r.params
																					.spaceBetween +
																				("auto" !==
																					n.slidesPerView &&
																				2 <=
																					r.slides
																						.length -
																						n.slidesPerView
																					? r
																							.slidesSizesGrid[
																							r
																								.slidesSizesGrid
																								.length -
																								1
																						] +
																						r.params
																							.spaceBetween
																					: 0)
																			: r.maxTranslate()) &&
																	r.loopFix({
																		direction: "next",
																		setTranslate: !0,
																		activeSlideIndex:
																			r.slides.length -
																			("auto" ===
																			n.slidesPerView
																				? r.slidesPerViewDynamic()
																				: Math.ceil(
																						parseFloat(
																							n.slidesPerView,
																							10
																						)
																					))
																	}),
																l.currentTranslate <
																	r.maxTranslate()) &&
																((e = !1), n.resistance) &&
																(l.currentTranslate =
																	r.maxTranslate() +
																	1 -
																	(r.maxTranslate() -
																		l.startTranslate -
																		a) **
																		t),
														e && (i.preventedByNestedSwiper = !0),
														!r.allowSlideNext &&
															"next" === r.swipeDirection &&
															l.currentTranslate < l.startTranslate &&
															(l.currentTranslate = l.startTranslate),
														!r.allowSlidePrev &&
															"prev" === r.swipeDirection &&
															l.currentTranslate > l.startTranslate &&
															(l.currentTranslate = l.startTranslate),
														r.allowSlidePrev ||
															r.allowSlideNext ||
															(l.currentTranslate = l.startTranslate),
														0 < n.threshold)
													) {
														if (
															!(
																Math.abs(a) > n.threshold ||
																l.allowThresholdMove
															)
														)
															return void (l.currentTranslate =
																l.startTranslate);
														if (!l.allowThresholdMove)
															return (
																(l.allowThresholdMove = !0),
																(o.startX = o.currentX),
																(o.startY = o.currentY),
																(l.currentTranslate =
																	l.startTranslate),
																void (o.diff = r.isHorizontal()
																	? o.currentX - o.startX
																	: o.currentY - o.startY)
															);
													}
													n.followFinger &&
														!n.cssMode &&
														(((n.freeMode &&
															n.freeMode.enabled &&
															r.freeMode) ||
															n.watchSlidesProgress) &&
															(r.updateActiveIndex(),
															r.updateSlidesClasses()),
														n.freeMode &&
															n.freeMode.enabled &&
															r.freeMode &&
															r.freeMode.onTouchMove(),
														r.updateProgress(l.currentTranslate),
														r.setTranslate(l.currentTranslate));
												}
											}
									}
								} else
									i.target.matches(l.focusableElements) || (r.allowClick = !1),
										l.isTouched &&
											(Object.assign(o, {
												startX: p,
												startY: t,
												currentX: p,
												currentY: t
											}),
											(l.touchStartTime = f()));
							} else l.startMoving && l.isScrolling && r.emit("touchMoveOpposite", i);
						}
					}.bind(e)),
					(e.onTouchEnd = function (e) {
						let l = this,
							t = l.touchEventsData,
							n = e,
							a;
						if (
							"touchend" === (n = n.originalEvent ? n.originalEvent : n).type ||
							"touchcancel" === n.type
						) {
							if (
								!(a = [...n.changedTouches].find(
									e => e.identifier === t.touchId
								)) ||
								a.identifier !== t.touchId
							)
								return;
						} else {
							if (null !== t.touchId) return;
							if (n.pointerId !== t.pointerId) return;
							a = n;
						}
						if (
							![
								"pointercancel",
								"pointerout",
								"pointerleave",
								"contextmenu"
							].includes(n.type) ||
							(["pointercancel", "contextmenu"].includes(n.type) &&
								(l.browser.isSafari || l.browser.isWebView))
						) {
							(t.pointerId = null), (t.touchId = null);
							var {
								params: o,
								touches: e,
								rtlTranslate: i,
								slidesGrid: d,
								enabled: s
							} = l;
							if (s && (o.simulateTouch || "mouse" !== n.pointerType))
								if (
									(t.allowTouchCallbacks && l.emit("touchEnd", n),
									(t.allowTouchCallbacks = !1),
									t.isTouched)
								) {
									o.grabCursor &&
										t.isMoved &&
										t.isTouched &&
										(!0 === l.allowSlideNext || !0 === l.allowSlidePrev) &&
										l.setGrabCursor(!1);
									var s = f(),
										p = s - t.touchStartTime;
									if (
										(l.allowClick &&
											((u = n.path || (n.composedPath && n.composedPath())),
											l.updateClickedSlide((u && u[0]) || n.target, u),
											l.emit("tap click", n),
											p < 300) &&
											s - t.lastClickTime < 300 &&
											l.emit("doubleTap doubleClick", n),
										(t.lastClickTime = f()),
										M(() => {
											l.destroyed || (l.allowClick = !0);
										}),
										t.isTouched &&
											t.isMoved &&
											l.swipeDirection &&
											(0 !== e.diff || t.loopSwapReset) &&
											(t.currentTranslate !== t.startTranslate ||
												t.loopSwapReset))
									) {
										(t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
										let r;
										if (
											((r = o.followFinger
												? i
													? l.translate
													: -l.translate
												: -t.currentTranslate),
											!o.cssMode)
										)
											if (o.freeMode && o.freeMode.enabled)
												l.freeMode.onTouchEnd({ currentPos: r });
											else {
												var c = r >= -l.maxTranslate() && !l.params.loop;
												let a = 0,
													i = l.slidesSizesGrid[0];
												for (
													let t = 0;
													t < d.length;
													t +=
														t < o.slidesPerGroupSkip
															? 1
															: o.slidesPerGroup
												) {
													let e =
														t < o.slidesPerGroupSkip - 1
															? 1
															: o.slidesPerGroup;
													void 0 !== d[t + e]
														? (c || (r >= d[t] && r < d[t + e])) &&
															((a = t), (i = d[t + e] - d[t]))
														: (c || r >= d[t]) &&
															((a = t),
															(i =
																d[d.length - 1] - d[d.length - 2]));
												}
												let e = null,
													t = null;
												o.rewind &&
													(l.isBeginning
														? (t =
																o.virtual &&
																o.virtual.enabled &&
																l.virtual
																	? l.virtual.slides.length - 1
																	: l.slides.length - 1)
														: l.isEnd && (e = 0));
												var u = (r - d[a]) / i;
												let s =
													a < o.slidesPerGroupSkip - 1
														? 1
														: o.slidesPerGroup;
												p > o.longSwipesMs
													? o.longSwipes
														? ("next" === l.swipeDirection &&
																(u >= o.longSwipesRatio
																	? l.slideTo(
																			o.rewind && l.isEnd
																				? e
																				: a + s
																		)
																	: l.slideTo(a)),
															"prev" === l.swipeDirection &&
																(u > 1 - o.longSwipesRatio
																	? l.slideTo(a + s)
																	: null !== t &&
																		  u < 0 &&
																		  Math.abs(u) >
																				o.longSwipesRatio
																		? l.slideTo(t)
																		: l.slideTo(a)))
														: l.slideTo(l.activeIndex)
													: o.shortSwipes
														? l.navigation &&
															(n.target === l.navigation.nextEl ||
																n.target === l.navigation.prevEl)
															? n.target === l.navigation.nextEl
																? l.slideTo(a + s)
																: l.slideTo(a)
															: ("next" === l.swipeDirection &&
																	l.slideTo(
																		null !== e ? e : a + s
																	),
																"prev" === l.swipeDirection &&
																	l.slideTo(null !== t ? t : a))
														: l.slideTo(l.activeIndex);
											}
									} else
										(t.isTouched = !1), (t.isMoved = !1), (t.startMoving = !1);
								} else
									t.isMoved && o.grabCursor && l.setGrabCursor(!1),
										(t.isMoved = !1),
										(t.startMoving = !1);
						}
					}.bind(e)),
					(e.onDocumentTouchStart = function () {
						this.documentTouchHandlerProceeded ||
							((this.documentTouchHandlerProceeded = !0),
							this.params.touchReleaseOnEdges &&
								(this.el.style.touchAction = "auto"));
					}.bind(e)),
					t.cssMode &&
						(e.onScroll = function () {
							var t = this,
								{ wrapperEl: a, rtlTranslate: i, enabled: s } = t;
							if (s) {
								(t.previousTranslate = t.translate),
									t.isHorizontal()
										? (t.translate = -a.scrollLeft)
										: (t.translate = -a.scrollTop),
									0 === t.translate && (t.translate = 0),
									t.updateActiveIndex(),
									t.updateSlidesClasses();
								let e;
								s = t.maxTranslate() - t.minTranslate();
								(e = 0 == s ? 0 : (t.translate - t.minTranslate()) / s) !==
									t.progress && t.updateProgress(i ? -t.translate : t.translate),
									t.emit("setTranslate", t.translate, !1);
							}
						}.bind(e)),
					(e.onClick = function (e) {
						var t = this;
						t.enabled &&
							!t.allowClick &&
							(t.params.preventClicks && e.preventDefault(),
							t.params.preventClicksPropagation) &&
							t.animating &&
							(e.stopPropagation(), e.stopImmediatePropagation());
					}.bind(e)),
					(e.onLoad = function (e) {
						var t = this;
						l(t, e.target),
							t.params.cssMode ||
								("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
								t.update();
					}.bind(e)),
					J(e, "on");
			},
			detachEvents: function () {
				J(this, "off");
			}
		},
		te = (e, t) => e.grid && t.grid && 1 < t.grid.rows;
	var p = {
		init: !0,
		direction: "horizontal",
		oneWayMovement: !1,
		swiperElementNodeName: "SWIPER-CONTAINER",
		touchEventsTarget: "wrapper",
		initialSlide: 0,
		speed: 300,
		cssMode: !1,
		updateOnWindowResize: !0,
		resizeObserver: !0,
		nested: !1,
		createElements: !1,
		eventsPrefix: "swiper",
		enabled: !0,
		focusableElements: "input, select, option, textarea, button, video, label",
		width: null,
		height: null,
		preventInteractionOnTransition: !1,
		userAgent: null,
		url: null,
		edgeSwipeDetection: !1,
		edgeSwipeThreshold: 20,
		autoHeight: !1,
		setWrapperSize: !1,
		virtualTranslate: !1,
		effect: "slide",
		breakpoints: void 0,
		breakpointsBase: "window",
		spaceBetween: 0,
		slidesPerView: 1,
		slidesPerGroup: 1,
		slidesPerGroupSkip: 0,
		slidesPerGroupAuto: !1,
		centeredSlides: !1,
		centeredSlidesBounds: !1,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: 0,
		normalizeSlideIndex: !0,
		centerInsufficientSlides: !1,
		watchOverflow: !0,
		roundLengths: !1,
		touchRatio: 1,
		touchAngle: 45,
		simulateTouch: !0,
		shortSwipes: !0,
		longSwipes: !0,
		longSwipesRatio: 0.5,
		longSwipesMs: 300,
		followFinger: !0,
		allowTouchMove: !0,
		threshold: 5,
		touchMoveStopPropagation: !1,
		touchStartPreventDefault: !0,
		touchStartForcePreventDefault: !1,
		touchReleaseOnEdges: !1,
		uniqueNavElements: !0,
		resistance: !0,
		resistanceRatio: 0.85,
		watchSlidesProgress: !1,
		grabCursor: !1,
		preventClicks: !0,
		preventClicksPropagation: !0,
		slideToClickedSlide: !1,
		loop: !1,
		loopAddBlankSlides: !0,
		loopAdditionalSlides: 0,
		loopPreventsSliding: !0,
		rewind: !1,
		allowSlidePrev: !0,
		allowSlideNext: !0,
		swipeHandler: null,
		noSwiping: !0,
		noSwipingClass: "swiper-no-swiping",
		noSwipingSelector: null,
		passiveListeners: !0,
		maxBackfaceHiddenSlides: 10,
		containerModifierClass: "swiper-",
		slideClass: "swiper-slide",
		slideBlankClass: "swiper-slide-blank",
		slideActiveClass: "swiper-slide-active",
		slideVisibleClass: "swiper-slide-visible",
		slideFullyVisibleClass: "swiper-slide-fully-visible",
		slideNextClass: "swiper-slide-next",
		slidePrevClass: "swiper-slide-prev",
		wrapperClass: "swiper-wrapper",
		lazyPreloaderClass: "swiper-lazy-preloader",
		lazyPreloadPrevNext: 0,
		runCallbacksOnInit: !0,
		_emitClasses: !1
	};
	let ae = {
			eventsEmitter: {
				on(e, a, i) {
					let s = this;
					if (s.eventsListeners && !s.destroyed && "function" == typeof a) {
						let t = i ? "unshift" : "push";
						e.split(" ").forEach(e => {
							s.eventsListeners[e] || (s.eventsListeners[e] = []),
								s.eventsListeners[e][t](a);
						});
					}
					return s;
				},
				once(i, s, e) {
					let r = this;
					return !r.eventsListeners || r.destroyed || "function" != typeof s
						? r
						: ((l.__emitterProxy = s), r.on(i, l, e));
					function l() {
						r.off(i, l), l.__emitterProxy && delete l.__emitterProxy;
						for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
							t[a] = arguments[a];
						s.apply(r, t);
					}
				},
				onAny(e, t) {
					var a = this;
					return (
						a.eventsListeners &&
							!a.destroyed &&
							"function" == typeof e &&
							((t = t ? "unshift" : "push"), a.eventsAnyListeners.indexOf(e) < 0) &&
							a.eventsAnyListeners[t](e),
						a
					);
				},
				offAny(e) {
					var t = this;
					return (
						t.eventsListeners &&
							!t.destroyed &&
							t.eventsAnyListeners &&
							0 <= (e = t.eventsAnyListeners.indexOf(e)) &&
							t.eventsAnyListeners.splice(e, 1),
						t
					);
				},
				off(e, i) {
					let s = this;
					return (
						s.eventsListeners &&
							!s.destroyed &&
							s.eventsListeners &&
							e.split(" ").forEach(a => {
								void 0 === i
									? (s.eventsListeners[a] = [])
									: s.eventsListeners[a] &&
										s.eventsListeners[a].forEach((e, t) => {
											(e === i ||
												(e.__emitterProxy && e.__emitterProxy === i)) &&
												s.eventsListeners[a].splice(t, 1);
										});
							}),
						s
					);
				},
				emit() {
					let s = this;
					if (s.eventsListeners && !s.destroyed && s.eventsListeners) {
						let e, a, i;
						for (var t = arguments.length, r = new Array(t), l = 0; l < t; l++)
							r[l] = arguments[l];
						(i =
							"string" == typeof r[0] || Array.isArray(r[0])
								? ((e = r[0]), (a = r.slice(1, r.length)), s)
								: ((e = r[0].events), (a = r[0].data), r[0].context || s)),
							a.unshift(i),
							(Array.isArray(e) ? e : e.split(" ")).forEach(t => {
								s.eventsAnyListeners &&
									s.eventsAnyListeners.length &&
									s.eventsAnyListeners.forEach(e => {
										e.apply(i, [t, ...a]);
									}),
									s.eventsListeners &&
										s.eventsListeners[t] &&
										s.eventsListeners[t].forEach(e => {
											e.apply(i, a);
										});
							});
					}
					return s;
				}
			},
			update: {
				updateSize: function () {
					var e = this;
					let t, a;
					var i = e.el;
					(t = null != e.params.width ? e.params.width : i.clientWidth),
						(a = null != e.params.height ? e.params.height : i.clientHeight),
						(0 === t && e.isHorizontal()) ||
							(0 === a && e.isVertical()) ||
							((t =
								t -
								parseInt(X(i, "padding-left") || 0, 10) -
								parseInt(X(i, "padding-right") || 0, 10)),
							(a =
								a -
								parseInt(X(i, "padding-top") || 0, 10) -
								parseInt(X(i, "padding-bottom") || 0, 10)),
							Number.isNaN(t) && (t = 0),
							Number.isNaN(a) && (a = 0),
							Object.assign(e, {
								width: t,
								height: a,
								size: e.isHorizontal() ? t : a
							}));
				},
				updateSlides: function () {
					let i = this;
					function s(e, t) {
						return parseFloat(e.getPropertyValue(i.getDirectionLabel(t)) || 0);
					}
					let r = i.params,
						{ wrapperEl: e, slidesEl: t, size: l, rtlTranslate: n, wrongRTL: o } = i;
					var d = i.virtual && r.virtual.enabled,
						p = (d ? i.virtual : i).slides.length;
					let c = R(t, `.${i.params.slideClass}, swiper-slide`);
					var u = (d ? i.virtual.slides : c).length;
					let m = [],
						h = [];
					var v = [];
					let g = r.slidesOffsetBefore,
						f =
							("function" == typeof g && (g = r.slidesOffsetBefore.call(i)),
							r.slidesOffsetAfter);
					"function" == typeof f && (f = r.slidesOffsetAfter.call(i));
					var w = i.snapGrid.length,
						b = i.slidesGrid.length;
					let y = r.spaceBetween,
						x = -g,
						E = 0,
						S = 0;
					if (void 0 !== l) {
						"string" == typeof y && 0 <= y.indexOf("%")
							? (y = (parseFloat(y.replace("%", "")) / 100) * l)
							: "string" == typeof y && (y = parseFloat(y)),
							(i.virtualSize = -y),
							c.forEach(e => {
								n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
									(e.style.marginBottom = ""),
									(e.style.marginTop = "");
							}),
							r.centeredSlides &&
								r.cssMode &&
								($(e, "--swiper-centered-offset-before", ""),
								$(e, "--swiper-centered-offset-after", ""));
						var T = r.grid && 1 < r.grid.rows && i.grid;
						T ? i.grid.initSlides(c) : i.grid && i.grid.unsetSlides();
						let a;
						var M,
							C,
							P,
							L,
							z,
							k,
							A,
							I,
							O,
							B =
								"auto" === r.slidesPerView &&
								r.breakpoints &&
								0 <
									Object.keys(r.breakpoints).filter(
										e => void 0 !== r.breakpoints[e].slidesPerView
									).length;
						for (let t = 0; t < u; t += 1) {
							a = 0;
							let e;
							c[t] && (e = c[t]),
								T && i.grid.updateSlide(t, e, c),
								(c[t] && "none" === X(e, "display")) ||
									("auto" === r.slidesPerView
										? (B && (c[t].style[i.getDirectionLabel("width")] = ""),
											(I = getComputedStyle(e)),
											(M = e.style.transform),
											(C = e.style.webkitTransform),
											M && (e.style.transform = "none"),
											C && (e.style.webkitTransform = "none"),
											(a = r.roundLengths
												? i.isHorizontal()
													? Y(e, "width", !0)
													: Y(e, "height", !0)
												: ((P = s(I, "width")),
													(L = s(I, "padding-left")),
													(z = s(I, "padding-right")),
													(k = s(I, "margin-left")),
													(A = s(I, "margin-right")),
													(I = I.getPropertyValue("box-sizing")) &&
													"border-box" === I
														? P + k + A
														: (({ clientWidth: I, offsetWidth: O } = e),
															P + L + z + k + A + (O - I)))),
											M && (e.style.transform = M),
											C && (e.style.webkitTransform = C),
											r.roundLengths && (a = Math.floor(a)))
										: ((a = (l - (r.slidesPerView - 1) * y) / r.slidesPerView),
											r.roundLengths && (a = Math.floor(a)),
											c[t] &&
												(c[t].style[i.getDirectionLabel("width")] =
													a + "px")),
									c[t] && (c[t].swiperSlideSize = a),
									v.push(a),
									r.centeredSlides
										? ((x = x + a / 2 + E / 2 + y),
											0 === E && 0 !== t && (x = x - l / 2 - y),
											0 === t && (x = x - l / 2 - y),
											Math.abs(x) < 0.001 && (x = 0),
											r.roundLengths && (x = Math.floor(x)),
											S % r.slidesPerGroup == 0 && m.push(x),
											h.push(x))
										: (r.roundLengths && (x = Math.floor(x)),
											(S - Math.min(i.params.slidesPerGroupSkip, S)) %
												i.params.slidesPerGroup ==
												0 && m.push(x),
											h.push(x),
											(x = x + a + y)),
									(i.virtualSize += a + y),
									(E = a),
									(S += 1));
						}
						if (
							((i.virtualSize = Math.max(i.virtualSize, l) + f),
							n &&
								o &&
								("slide" === r.effect || "coverflow" === r.effect) &&
								(e.style.width = i.virtualSize + y + "px"),
							r.setWrapperSize &&
								(e.style[i.getDirectionLabel("width")] = i.virtualSize + y + "px"),
							T && i.grid.updateWrapperSize(a, m),
							!r.centeredSlides)
						) {
							var D = [];
							for (let t = 0; t < m.length; t += 1) {
								let e = m[t];
								r.roundLengths && (e = Math.floor(e)),
									m[t] <= i.virtualSize - l && D.push(e);
							}
							(m = D),
								1 < Math.floor(i.virtualSize - l) - Math.floor(m[m.length - 1]) &&
									m.push(i.virtualSize - l);
						}
						if (d && r.loop) {
							var _ = v[0] + y;
							if (1 < r.slidesPerGroup) {
								var H = Math.ceil(
										(i.virtual.slidesBefore + i.virtual.slidesAfter) /
											r.slidesPerGroup
									),
									N = _ * r.slidesPerGroup;
								for (let e = 0; e < H; e += 1) m.push(m[m.length - 1] + N);
							}
							for (
								let e = 0;
								e < i.virtual.slidesBefore + i.virtual.slidesAfter;
								e += 1
							)
								1 === r.slidesPerGroup && m.push(m[m.length - 1] + _),
									h.push(h[h.length - 1] + _),
									(i.virtualSize += _);
						}
						if ((0 === m.length && (m = [0]), 0 !== y)) {
							let t =
								i.isHorizontal() && n
									? "marginLeft"
									: i.getDirectionLabel("marginRight");
							c.filter(
								(e, t) => !(r.cssMode && !r.loop) || t !== c.length - 1
							).forEach(e => {
								e.style[t] = y + "px";
							});
						}
						if (r.centeredSlides && r.centeredSlidesBounds) {
							let t = 0,
								a =
									(v.forEach(e => {
										t += e + (y || 0);
									}),
									(t -= y) > l ? t - l : 0);
							m = m.map(e => (e <= 0 ? -g : e > a ? a + f : e));
						}
						if (r.centerInsufficientSlides) {
							let t = 0;
							v.forEach(e => {
								t += e + (y || 0);
							}),
								(t -= y);
							var G = (r.slidesOffsetBefore || 0) + (r.slidesOffsetAfter || 0);
							if (t + G < l) {
								let a = (l - t - G) / 2;
								m.forEach((e, t) => {
									m[t] = e - a;
								}),
									h.forEach((e, t) => {
										h[t] = e + a;
									});
							}
						}
						if (
							(Object.assign(i, {
								slides: c,
								snapGrid: m,
								slidesGrid: h,
								slidesSizesGrid: v
							}),
							r.centeredSlides && r.cssMode && !r.centeredSlidesBounds)
						) {
							$(e, "--swiper-centered-offset-before", -m[0] + "px"),
								$(
									e,
									"--swiper-centered-offset-after",
									i.size / 2 - v[v.length - 1] / 2 + "px"
								);
							let t = -i.snapGrid[0],
								a = -i.slidesGrid[0];
							(i.snapGrid = i.snapGrid.map(e => e + t)),
								(i.slidesGrid = i.slidesGrid.map(e => e + a));
						}
						u !== p && i.emit("slidesLengthChange"),
							m.length !== w &&
								(i.params.watchOverflow && i.checkOverflow(),
								i.emit("snapGridLengthChange")),
							h.length !== b && i.emit("slidesGridLengthChange"),
							r.watchSlidesProgress && i.updateSlidesOffset(),
							i.emit("slidesUpdated"),
							d ||
								r.cssMode ||
								("slide" !== r.effect && "fade" !== r.effect) ||
								((G = r.containerModifierClass + "backface-hidden"),
								(p = i.el.classList.contains(G)),
								u <= r.maxBackfaceHiddenSlides
									? p || i.el.classList.add(G)
									: p && i.el.classList.remove(G));
					}
				},
				updateAutoHeight: function (e) {
					let t = this,
						a = [],
						i = t.virtual && t.params.virtual.enabled,
						s = 0,
						r;
					"number" == typeof e
						? t.setTransition(e)
						: !0 === e && t.setTransition(t.params.speed);
					var l,
						n = e => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
					if ("auto" !== t.params.slidesPerView && 1 < t.params.slidesPerView)
						if (t.params.centeredSlides)
							(t.visibleSlides || []).forEach(e => {
								a.push(e);
							});
						else
							for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
								var o = t.activeIndex + r;
								if (o > t.slides.length && !i) break;
								a.push(n(o));
							}
					else a.push(n(t.activeIndex));
					for (r = 0; r < a.length; r += 1)
						void 0 !== a[r] && ((l = a[r].offsetHeight), (s = l > s ? l : s));
					(!s && 0 !== s) || (t.wrapperEl.style.height = s + "px");
				},
				updateSlidesOffset: function () {
					var t = this,
						a = t.slides,
						i = t.isElement
							? t.isHorizontal()
								? t.wrapperEl.offsetLeft
								: t.wrapperEl.offsetTop
							: 0;
					for (let e = 0; e < a.length; e += 1)
						a[e].swiperSlideOffset =
							(t.isHorizontal() ? a[e].offsetLeft : a[e].offsetTop) -
							i -
							t.cssOverflowAdjustment();
				},
				updateSlidesProgress: function (e) {
					void 0 === e && (e = (this && this.translate) || 0);
					var s = this,
						r = s.params,
						{ slides: l, rtlTranslate: n, snapGrid: o } = s;
					if (0 !== l.length) {
						void 0 === l[0].swiperSlideOffset && s.updateSlidesOffset();
						let a = n ? e : -e,
							i =
								((s.visibleSlidesIndexes = []),
								(s.visibleSlides = []),
								r.spaceBetween);
						"string" == typeof i && 0 <= i.indexOf("%")
							? (i = (parseFloat(i.replace("%", "")) / 100) * s.size)
							: "string" == typeof i && (i = parseFloat(i));
						for (let t = 0; t < l.length; t += 1) {
							var d = l[t];
							let e = d.swiperSlideOffset;
							r.cssMode && r.centeredSlides && (e -= l[0].swiperSlideOffset);
							var p =
									(a + (r.centeredSlides ? s.minTranslate() : 0) - e) /
									(d.swiperSlideSize + i),
								c =
									(a - o[0] + (r.centeredSlides ? s.minTranslate() : 0) - e) /
									(d.swiperSlideSize + i),
								u = -(a - e),
								m = u + s.slidesSizesGrid[t],
								h = 0 <= u && u <= s.size - s.slidesSizesGrid[t],
								u =
									(0 <= u && u < s.size - 1) ||
									(1 < m && m <= s.size) ||
									(u <= 0 && m >= s.size);
							u && (s.visibleSlides.push(d), s.visibleSlidesIndexes.push(t)),
								W(d, u, r.slideVisibleClass),
								W(d, h, r.slideFullyVisibleClass),
								(d.progress = n ? -p : p),
								(d.originalProgress = n ? -c : c);
						}
					}
				},
				updateProgress: function (e) {
					var t = this,
						a =
							(void 0 === e &&
								((a = t.rtlTranslate ? -1 : 1),
								(e = (t && t.translate && t.translate * a) || 0)),
							t.params),
						i = t.maxTranslate() - t.minTranslate();
					let { progress: s, isBeginning: r, isEnd: l, progressLoop: n } = t;
					var o,
						d,
						p,
						c = r,
						u = l;
					0 == i
						? ((s = 0), (r = !0), (l = !0))
						: ((s = (e - t.minTranslate()) / i),
							(i = Math.abs(e - t.minTranslate()) < 1),
							(o = Math.abs(e - t.maxTranslate()) < 1),
							(r = i || s <= 0),
							(l = o || 1 <= s),
							i && (s = 0),
							o && (s = 1)),
						a.loop &&
							((i = t.getSlideIndexByData(0)),
							(o = t.getSlideIndexByData(t.slides.length - 1)),
							(i = t.slidesGrid[i]),
							(o = t.slidesGrid[o]),
							(d = t.slidesGrid[t.slidesGrid.length - 1]),
							(p = Math.abs(e)),
							1 < (n = i <= p ? (p - i) / d : (p + d - o) / d)) &&
							--n,
						Object.assign(t, {
							progress: s,
							progressLoop: n,
							isBeginning: r,
							isEnd: l
						}),
						(a.watchSlidesProgress || (a.centeredSlides && a.autoHeight)) &&
							t.updateSlidesProgress(e),
						r && !c && t.emit("reachBeginning toEdge"),
						l && !u && t.emit("reachEnd toEdge"),
						((c && !r) || (u && !l)) && t.emit("fromEdge"),
						t.emit("progress", s);
				},
				updateSlidesClasses: function () {
					var t = this;
					let { slides: e, params: a, slidesEl: i, activeIndex: s } = t;
					var r = t.virtual && a.virtual.enabled,
						l = t.grid && a.grid && 1 < a.grid.rows,
						n = e => R(i, `.${a.slideClass}${e}, swiper-slide` + e)[0];
					let o, d, p;
					if (r)
						if (a.loop) {
							let e = s - t.virtual.slidesBefore;
							(e = e < 0 ? t.virtual.slides.length + e : e) >=
								t.virtual.slides.length && (e -= t.virtual.slides.length),
								(o = n(`[data-swiper-slide-index="${e}"]`));
						} else o = n(`[data-swiper-slide-index="${s}"]`);
					else
						l
							? ((o = e.find(e => e.column === s)),
								(p = e.find(e => e.column === s + 1)),
								(d = e.find(e => e.column === s - 1)))
							: (o = e[s]);
					o &&
						!l &&
						((p = ((e, t) => {
							for (var a = []; e.nextElementSibling; ) {
								var i = e.nextElementSibling;
								(!t || i.matches(t)) && a.push(i), (e = i);
							}
							return a;
						})(o, `.${a.slideClass}, swiper-slide`)[0]),
						a.loop && !p && (p = e[0]),
						(d = ((e, t) => {
							for (var a = []; e.previousElementSibling; ) {
								var i = e.previousElementSibling;
								(!t || i.matches(t)) && a.push(i), (e = i);
							}
							return a;
						})(o, `.${a.slideClass}, swiper-slide`)[0]),
						a.loop) &&
						0 === !d &&
						(d = e[e.length - 1]),
						e.forEach(e => {
							c(e, e === o, a.slideActiveClass),
								c(e, e === p, a.slideNextClass),
								c(e, e === d, a.slidePrevClass);
						}),
						t.emitSlidesClasses();
				},
				updateActiveIndex: function (e) {
					let a = this;
					var i = a.rtlTranslate ? a.translate : -a.translate,
						{ snapGrid: s, params: r, activeIndex: l, realIndex: n, snapIndex: o } = a;
					let d = e,
						p;
					if (
						((e = e => {
							let t = e - a.virtual.slidesBefore;
							return (
								(t = t < 0 ? a.virtual.slides.length + t : t) >=
									a.virtual.slides.length && (t -= a.virtual.slides.length),
								t
							);
						}),
						void 0 === d &&
							(d = (e => {
								var { slidesGrid: t, params: a } = e,
									i = e.rtlTranslate ? e.translate : -e.translate;
								let s;
								for (let e = 0; e < t.length; e += 1)
									void 0 !== t[e + 1]
										? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
											? (s = e)
											: i >= t[e] && i < t[e + 1] && (s = e + 1)
										: i >= t[e] && (s = e);
								return (s =
									a.normalizeSlideIndex && (s < 0 || void 0 === s) ? 0 : s);
							})(a)),
						(p =
							0 <= s.indexOf(i)
								? s.indexOf(i)
								: (i = Math.min(r.slidesPerGroupSkip, d)) +
									Math.floor((d - i) / r.slidesPerGroup)) >= s.length &&
							(p = s.length - 1),
						d !== l || a.params.loop)
					)
						if (d === l && a.params.loop && a.virtual && a.params.virtual.enabled)
							a.realIndex = e(d);
						else {
							i = a.grid && r.grid && 1 < r.grid.rows;
							let t;
							if (a.virtual && r.virtual.enabled && r.loop) t = e(d);
							else if (i) {
								s = a.slides.find(e => e.column === d);
								let e = parseInt(s.getAttribute("data-swiper-slide-index"), 10);
								Number.isNaN(e) && (e = Math.max(a.slides.indexOf(s), 0)),
									(t = Math.floor(e / r.grid.rows));
							} else
								t =
									a.slides[d] &&
									((e = a.slides[d].getAttribute("data-swiper-slide-index")), e)
										? parseInt(e, 10)
										: d;
							Object.assign(a, {
								previousSnapIndex: o,
								snapIndex: p,
								previousRealIndex: n,
								realIndex: t,
								previousIndex: l,
								activeIndex: d
							}),
								a.initialized && m(a),
								a.emit("activeIndexChange"),
								a.emit("snapIndexChange"),
								(a.initialized || a.params.runCallbacksOnInit) &&
									(n !== t && a.emit("realIndexChange"), a.emit("slideChange"));
						}
					else p !== o && ((a.snapIndex = p), a.emit("snapIndexChange"));
				},
				updateClickedSlide: function (e, t) {
					var a = this;
					let i = a.params,
						s = e.closest(`.${i.slideClass}, swiper-slide`),
						r =
							(!s &&
								a.isElement &&
								t &&
								1 < t.length &&
								t.includes(e) &&
								[...t.slice(t.indexOf(e) + 1, t.length)].forEach(e => {
									!s &&
										e.matches &&
										e.matches(`.${i.slideClass}, swiper-slide`) &&
										(s = e);
								}),
							!1),
						l;
					if (s)
						for (let e = 0; e < a.slides.length; e += 1)
							if (a.slides[e] === s) {
								(r = !0), (l = e);
								break;
							}
					s && r
						? ((a.clickedSlide = s),
							a.virtual && a.params.virtual.enabled
								? (a.clickedIndex = parseInt(
										s.getAttribute("data-swiper-slide-index"),
										10
									))
								: (a.clickedIndex = l),
							i.slideToClickedSlide &&
								void 0 !== a.clickedIndex &&
								a.clickedIndex !== a.activeIndex &&
								a.slideToClickedSlide())
						: ((a.clickedSlide = void 0), (a.clickedIndex = void 0));
				}
			},
			translate: {
				getTranslate: function (e) {
					void 0 === e && (e = this.isHorizontal() ? "x" : "y");
					var { params: t, rtlTranslate: a, translate: i, wrapperEl: s } = this;
					if (t.virtualTranslate) return a ? -i : i;
					if (t.cssMode) return i;
					let r = B(s, e);
					return (r += this.cssOverflowAdjustment()), (r = a ? -r : r) || 0;
				},
				setTranslate: function (e, t) {
					var a = this,
						{ rtlTranslate: i, params: s, wrapperEl: r, progress: l } = a;
					let n = 0,
						o = 0;
					a.isHorizontal() ? (n = i ? -e : e) : (o = e),
						s.roundLengths && ((n = Math.floor(n)), (o = Math.floor(o))),
						(a.previousTranslate = a.translate),
						(a.translate = a.isHorizontal() ? n : o),
						s.cssMode
							? (r[a.isHorizontal() ? "scrollLeft" : "scrollTop"] = a.isHorizontal()
									? -n
									: -o)
							: s.virtualTranslate ||
								(a.isHorizontal()
									? (n -= a.cssOverflowAdjustment())
									: (o -= a.cssOverflowAdjustment()),
								(r.style.transform = `translate3d(${n}px, ${o}px, 0px)`));
					let d;
					(i = a.maxTranslate() - a.minTranslate()),
						(d = 0 == i ? 0 : (e - a.minTranslate()) / i) !== l && a.updateProgress(e),
						a.emit("setTranslate", a.translate, t);
				},
				minTranslate: function () {
					return -this.snapGrid[0];
				},
				maxTranslate: function () {
					return -this.snapGrid[this.snapGrid.length - 1];
				},
				translateTo: function (e, t, a, i, s) {
					void 0 === e && (e = 0),
						void 0 === t && (t = this.params.speed),
						void 0 === a && (a = !0),
						void 0 === i && (i = !0);
					let r = this;
					var { params: l, wrapperEl: n } = r;
					if (r.animating && l.preventInteractionOnTransition) return !1;
					var o = r.minTranslate(),
						d = r.maxTranslate();
					let p;
					if (
						((p = i && o < e ? o : i && e < d ? d : e), r.updateProgress(p), l.cssMode)
					) {
						o = r.isHorizontal();
						if (0 === t) n[o ? "scrollLeft" : "scrollTop"] = -p;
						else {
							if (!r.support.smoothScroll)
								return (
									S({ swiper: r, targetPosition: -p, side: o ? "left" : "top" }),
									!0
								);
							n.scrollTo({ [o ? "left" : "top"]: -p, behavior: "smooth" });
						}
					} else
						0 === t
							? (r.setTransition(0),
								r.setTranslate(p),
								a &&
									(r.emit("beforeTransitionStart", t, s),
									r.emit("transitionEnd")))
							: (r.setTransition(t),
								r.setTranslate(p),
								a &&
									(r.emit("beforeTransitionStart", t, s),
									r.emit("transitionStart")),
								r.animating ||
									((r.animating = !0),
									r.onTranslateToWrapperTransitionEnd ||
										(r.onTranslateToWrapperTransitionEnd = function (e) {
											r &&
												!r.destroyed &&
												e.target === this &&
												(r.wrapperEl.removeEventListener(
													"transitionend",
													r.onTranslateToWrapperTransitionEnd
												),
												(r.onTranslateToWrapperTransitionEnd = null),
												delete r.onTranslateToWrapperTransitionEnd,
												(r.animating = !1),
												a) &&
												r.emit("transitionEnd");
										}),
									r.wrapperEl.addEventListener(
										"transitionend",
										r.onTranslateToWrapperTransitionEnd
									)));
					return !0;
				}
			},
			transition: {
				setTransition: function (e, t) {
					this.params.cssMode ||
						((this.wrapperEl.style.transitionDuration = e + "ms"),
						(this.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
						this.emit("setTransition", e, t);
				},
				transitionStart: function (e, t) {
					void 0 === e && (e = !0);
					var a = this.params;
					a.cssMode ||
						(a.autoHeight && this.updateAutoHeight(),
						U({ swiper: this, runCallbacks: e, direction: t, step: "Start" }));
				},
				transitionEnd: function (e, t) {
					void 0 === e && (e = !0);
					var a = this.params;
					(this.animating = !1),
						a.cssMode ||
							(this.setTransition(0),
							U({ swiper: this, runCallbacks: e, direction: t, step: "End" }));
				}
			},
			slide: {
				slideTo: function (a, i, t, e, s) {
					void 0 === t && (t = !0),
						"string" == typeof (a = void 0 === a ? 0 : a) && (a = parseInt(a, 10));
					let r = this,
						l = a,
						{
							params: n,
							snapGrid: o,
							slidesGrid: d,
							previousIndex: p,
							activeIndex: c,
							rtlTranslate: u,
							wrapperEl: m,
							enabled: h
						} = (l < 0 && (l = 0), r);
					if (
						(!h && !e && !s) ||
						r.destroyed ||
						(r.animating && n.preventInteractionOnTransition)
					)
						return !1;
					void 0 === i && (i = r.params.speed);
					let v =
						(a = Math.min(r.params.slidesPerGroupSkip, l)) +
						Math.floor((l - a) / r.params.slidesPerGroup);
					var g = -o[(v = v >= o.length ? o.length - 1 : v)];
					if (n.normalizeSlideIndex)
						for (let e = 0; e < d.length; e += 1) {
							var f = -Math.floor(100 * g),
								w = Math.floor(100 * d[e]),
								b = Math.floor(100 * d[e + 1]);
							void 0 !== d[e + 1]
								? w <= f && f < b - (b - w) / 2
									? (l = e)
									: w <= f && f < b && (l = e + 1)
								: w <= f && (l = e);
						}
					if (r.initialized && l !== c) {
						if (
							!r.allowSlideNext &&
							(u
								? g > r.translate && g > r.minTranslate()
								: g < r.translate && g < r.minTranslate())
						)
							return !1;
						if (
							!r.allowSlidePrev &&
							g > r.translate &&
							g > r.maxTranslate() &&
							(c || 0) !== l
						)
							return !1;
					}
					l !== (p || 0) && t && r.emit("beforeSlideChangeStart"), r.updateProgress(g);
					let y;
					if (
						((y = l > c ? "next" : l < c ? "prev" : "reset"),
						!((a = r.virtual && r.params.virtual.enabled) && s) &&
							((u && -g === r.translate) || (!u && g === r.translate)))
					)
						return (
							r.updateActiveIndex(l),
							n.autoHeight && r.updateAutoHeight(),
							r.updateSlidesClasses(),
							"slide" !== n.effect && r.setTranslate(g),
							"reset" !== y && (r.transitionStart(t, y), r.transitionEnd(t, y)),
							!1
						);
					if (n.cssMode) {
						let e = r.isHorizontal(),
							t = u ? g : -g;
						if (0 === i)
							a &&
								((r.wrapperEl.style.scrollSnapType = "none"),
								(r._immediateVirtual = !0)),
								a && !r._cssModeVirtualInitialSet && 0 < r.params.initialSlide
									? ((r._cssModeVirtualInitialSet = !0),
										requestAnimationFrame(() => {
											m[e ? "scrollLeft" : "scrollTop"] = t;
										}))
									: (m[e ? "scrollLeft" : "scrollTop"] = t),
								a &&
									requestAnimationFrame(() => {
										(r.wrapperEl.style.scrollSnapType = ""),
											(r._immediateVirtual = !1);
									});
						else {
							if (!r.support.smoothScroll)
								return (
									S({ swiper: r, targetPosition: t, side: e ? "left" : "top" }),
									!0
								);
							m.scrollTo({ [e ? "left" : "top"]: t, behavior: "smooth" });
						}
					} else
						r.setTransition(i),
							r.setTranslate(g),
							r.updateActiveIndex(l),
							r.updateSlidesClasses(),
							r.emit("beforeTransitionStart", i, e),
							r.transitionStart(t, y),
							0 === i
								? r.transitionEnd(t, y)
								: r.animating ||
									((r.animating = !0),
									r.onSlideToWrapperTransitionEnd ||
										(r.onSlideToWrapperTransitionEnd = function (e) {
											r &&
												!r.destroyed &&
												e.target === this &&
												(r.wrapperEl.removeEventListener(
													"transitionend",
													r.onSlideToWrapperTransitionEnd
												),
												(r.onSlideToWrapperTransitionEnd = null),
												delete r.onSlideToWrapperTransitionEnd,
												r.transitionEnd(t, y));
										}),
									r.wrapperEl.addEventListener(
										"transitionend",
										r.onSlideToWrapperTransitionEnd
									));
					return !0;
				},
				slideToLoop: function (s, e, t, r) {
					void 0 === t && (t = !0),
						"string" == typeof (s = void 0 === s ? 0 : s) && (s = parseInt(s, 10));
					let l = this;
					if (!l.destroyed) {
						void 0 === e && (e = l.params.speed);
						var n = l.grid && l.params.grid && 1 < l.params.grid.rows;
						let i = s;
						if (l.params.loop)
							if (l.virtual && l.params.virtual.enabled) i += l.virtual.slidesBefore;
							else {
								let e;
								if (n) {
									let t = i * l.params.grid.rows;
									e = l.slides.find(
										e => +e.getAttribute("data-swiper-slide-index") == t
									).column;
								} else e = l.getSlideIndexByData(i);
								var s = n
										? Math.ceil(l.slides.length / l.params.grid.rows)
										: l.slides.length,
									o = l.params.centeredSlides;
								let t = l.params.slidesPerView,
									a =
										("auto" === t
											? (t = l.slidesPerViewDynamic())
											: ((t = Math.ceil(
													parseFloat(l.params.slidesPerView, 10)
												)),
												o && t % 2 == 0 && (t += 1)),
										s - e < t);
								if (
									(o && (a = a || e < Math.ceil(t / 2)),
									(a =
										r && o && "auto" !== l.params.slidesPerView && !n
											? !1
											: a) &&
										((o = o
											? e < l.activeIndex
												? "prev"
												: "next"
											: e - l.activeIndex - 1 < l.params.slidesPerView
												? "next"
												: "prev"),
										l.loopFix({
											direction: o,
											slideTo: !0,
											activeSlideIndex: "next" == o ? e + 1 : e - s + 1,
											slideRealIndex: "next" == o ? l.realIndex : void 0
										})),
									n)
								) {
									let t = i * l.params.grid.rows;
									i = l.slides.find(
										e => +e.getAttribute("data-swiper-slide-index") == t
									).column;
								} else i = l.getSlideIndexByData(i);
							}
						return (
							requestAnimationFrame(() => {
								l.slideTo(i, e, t, r);
							}),
							l
						);
					}
				},
				slideNext: function (e, t, a) {
					void 0 === t && (t = !0);
					let i = this;
					var { enabled: s, params: r, animating: l } = i;
					if (!s || i.destroyed) return i;
					void 0 === e && (e = i.params.speed);
					let n = r.slidesPerGroup,
						o =
							("auto" === r.slidesPerView &&
								1 === r.slidesPerGroup &&
								r.slidesPerGroupAuto &&
								(n = Math.max(i.slidesPerViewDynamic("current", !0), 1)),
							i.activeIndex < r.slidesPerGroupSkip ? 1 : n);
					if (((s = i.virtual && r.virtual.enabled), r.loop)) {
						if (l && !s && r.loopPreventsSliding) return !1;
						if (
							(i.loopFix({ direction: "next" }),
							(i._clientLeft = i.wrapperEl.clientLeft),
							i.activeIndex === i.slides.length - 1 && r.cssMode)
						)
							return (
								requestAnimationFrame(() => {
									i.slideTo(i.activeIndex + o, e, t, a);
								}),
								!0
							);
					}
					return r.rewind && i.isEnd
						? i.slideTo(0, e, t, a)
						: i.slideTo(i.activeIndex + o, e, t, a);
				},
				slidePrev: function (e, t, a) {
					void 0 === t && (t = !0);
					let i = this;
					var {
						params: s,
						snapGrid: r,
						slidesGrid: l,
						rtlTranslate: n,
						enabled: o,
						animating: d
					} = i;
					if (!o || i.destroyed) return i;
					if (
						(void 0 === e && (e = i.params.speed),
						(o = i.virtual && s.virtual.enabled),
						s.loop)
					) {
						if (d && !o && s.loopPreventsSliding) return !1;
						i.loopFix({ direction: "prev" }), (i._clientLeft = i.wrapperEl.clientLeft);
					}
					function p(e) {
						return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
					}
					let c = p(n ? i.translate : -i.translate),
						u = ((d = r.map(e => p(e))), r[d.indexOf(c) - 1]);
					if (void 0 === u && s.cssMode) {
						let a;
						r.forEach((e, t) => {
							c >= e && (a = t);
						}),
							void 0 !== a && (u = r[0 < a ? a - 1 : a]);
					}
					let m = 0;
					return (
						void 0 !== u &&
							((m = l.indexOf(u)) < 0 && (m = i.activeIndex - 1),
							"auto" === s.slidesPerView) &&
							1 === s.slidesPerGroup &&
							s.slidesPerGroupAuto &&
							((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
							(m = Math.max(m, 0))),
						s.rewind && i.isBeginning
							? ((o =
									i.params.virtual && i.params.virtual.enabled && i.virtual
										? i.virtual.slides.length - 1
										: i.slides.length - 1),
								i.slideTo(o, e, t, a))
							: s.loop && 0 === i.activeIndex && s.cssMode
								? (requestAnimationFrame(() => {
										i.slideTo(m, e, t, a);
									}),
									!0)
								: i.slideTo(m, e, t, a)
					);
				},
				slideReset: function (e, t, a) {
					if ((void 0 === t && (t = !0), !this.destroyed))
						return (
							void 0 === e && (e = this.params.speed),
							this.slideTo(this.activeIndex, e, t, a)
						);
				},
				slideToClosest: function (t, a, i, s) {
					void 0 === a && (a = !0), void 0 === s && (s = 0.5);
					var r = this;
					if (!r.destroyed) {
						void 0 === t && (t = r.params.speed);
						let e = r.activeIndex;
						var l,
							n = Math.min(r.params.slidesPerGroupSkip, e),
							n = n + Math.floor((e - n) / r.params.slidesPerGroup),
							o = r.rtlTranslate ? r.translate : -r.translate;
						return (
							o >= r.snapGrid[n]
								? ((l = r.snapGrid[n]),
									(r.snapGrid[n + 1] - l) * s < o - l &&
										(e += r.params.slidesPerGroup))
								: o - (l = r.snapGrid[n - 1]) <= (r.snapGrid[n] - l) * s &&
									(e -= r.params.slidesPerGroup),
							(e = Math.max(e, 0)),
							(e = Math.min(e, r.slidesGrid.length - 1)),
							r.slideTo(e, t, a, i)
						);
					}
				},
				slideToClickedSlide: function () {
					let t = this;
					if (!t.destroyed) {
						var a,
							{ params: i, slidesEl: s } = t,
							r =
								"auto" === i.slidesPerView
									? t.slidesPerViewDynamic()
									: i.slidesPerView;
						let e = t.clickedIndex;
						var l = t.isElement ? "swiper-slide" : "." + i.slideClass;
						i.loop
							? t.animating ||
								((a = parseInt(
									t.clickedSlide.getAttribute("data-swiper-slide-index"),
									10
								)),
								i.centeredSlides
									? e < t.loopedSlides - r / 2 ||
										e > t.slides.length - t.loopedSlides + r / 2
										? (t.loopFix(),
											(e = t.getSlideIndex(
												R(s, l + `[data-swiper-slide-index="${a}"]`)[0]
											)),
											M(() => {
												t.slideTo(e);
											}))
										: t.slideTo(e)
									: e > t.slides.length - r
										? (t.loopFix(),
											(e = t.getSlideIndex(
												R(s, l + `[data-swiper-slide-index="${a}"]`)[0]
											)),
											M(() => {
												t.slideTo(e);
											}))
										: t.slideTo(e))
							: t.slideTo(e);
					}
				}
			},
			loop: {
				loopCreate: function (e) {
					let i = this,
						{ params: s, slidesEl: t } = i;
					var a, r, l, n, o;
					!s.loop ||
						(i.virtual && i.params.virtual.enabled) ||
						((a = () => {
							R(t, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
								e.setAttribute("data-swiper-slide-index", t);
							});
						}),
						(n = i.grid && s.grid && 1 < s.grid.rows),
						(r = s.slidesPerGroup * (n ? s.grid.rows : 1)),
						(l = i.slides.length % r != 0),
						(n = n && i.slides.length % s.grid.rows != 0),
						(o = t => {
							for (let e = 0; e < t; e += 1) {
								var a = i.isElement
									? A("swiper-slide", [s.slideBlankClass])
									: A("div", [s.slideClass, s.slideBlankClass]);
								i.slidesEl.append(a);
							}
						}),
						l
							? s.loopAddBlankSlides
								? (o(r - (i.slides.length % r)), i.recalcSlides(), i.updateSlides())
								: z(
										"Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
									)
							: n &&
								(s.loopAddBlankSlides
									? (o(s.grid.rows - (i.slides.length % s.grid.rows)),
										i.recalcSlides(),
										i.updateSlides())
									: z(
											"Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
										)),
						a(),
						i.loopFix({
							slideRealIndex: e,
							direction: s.centeredSlides ? void 0 : "next"
						}));
				},
				loopFix: function (c) {
					let {
							slideRealIndex: u,
							slideTo: m = !0,
							direction: h,
							setTranslate: v,
							activeSlideIndex: g,
							byController: f,
							byMousewheel: w
						} = void 0 === c ? {} : c,
						b = this;
					if (b.params.loop) {
						b.emit("beforeLoopFix");
						let {
							slides: l,
							allowSlidePrev: n,
							allowSlideNext: o,
							slidesEl: d,
							params: p
						} = b;
						c = p.centeredSlides;
						if (
							((b.allowSlidePrev = !0),
							(b.allowSlideNext = !0),
							b.virtual && p.virtual.enabled)
						)
							m &&
								(p.centeredSlides || 0 !== b.snapIndex
									? p.centeredSlides && b.snapIndex < p.slidesPerView
										? b.slideTo(
												b.virtual.slides.length + b.snapIndex,
												0,
												!1,
												!0
											)
										: b.snapIndex === b.snapGrid.length - 1 &&
											b.slideTo(b.virtual.slidesBefore, 0, !1, !0)
									: b.slideTo(b.virtual.slides.length, 0, !1, !0)),
								(b.allowSlidePrev = n),
								(b.allowSlideNext = o);
						else {
							let e = p.slidesPerView;
							"auto" === e
								? (e = b.slidesPerViewDynamic())
								: ((e = Math.ceil(parseFloat(p.slidesPerView, 10))),
									c && e % 2 == 0 && (e += 1));
							var y = p.slidesPerGroupAuto ? e : p.slidesPerGroup;
							let t = y;
							t % y != 0 && (t += y - (t % y)),
								(t += p.loopAdditionalSlides),
								(b.loopedSlides = t);
							var x = b.grid && p.grid && 1 < p.grid.rows,
								E =
									(l.length < e + t
										? z(
												"Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
											)
										: x &&
											"row" === p.grid.fill &&
											z(
												"Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
											),
									[]);
							let i = [],
								a = b.activeIndex;
							void 0 === g
								? (g = b.getSlideIndex(
										l.find(e => e.classList.contains(p.slideActiveClass))
									))
								: (a = g);
							var S = "next" === h || !h,
								T = "prev" === h || !h;
							let s = 0,
								r = 0;
							var M = x ? Math.ceil(l.length / p.grid.rows) : l.length,
								C = (x ? l[g].column : g) + (c && void 0 === v ? -e / 2 + 0.5 : 0);
							if (C < t) {
								s = Math.max(t - C, y);
								for (let e = 0; e < t - C; e += 1) {
									var P = e - Math.floor(e / M) * M;
									if (x) {
										var L = M - P - 1;
										for (let e = l.length - 1; 0 <= e; --e)
											l[e].column === L && E.push(e);
									} else E.push(M - P - 1);
								}
							} else if (C + e > M - t) {
								r = Math.max(C - (M - 2 * t), y);
								for (let e = 0; e < r; e += 1) {
									let a = e - Math.floor(e / M) * M;
									x
										? l.forEach((e, t) => {
												e.column === a && i.push(t);
											})
										: i.push(a);
								}
							}
							if (
								((b.__preventObserver__ = !0),
								requestAnimationFrame(() => {
									b.__preventObserver__ = !1;
								}),
								T &&
									E.forEach(e => {
										(l[e].swiperLoopMoveDOM = !0),
											d.prepend(l[e]),
											(l[e].swiperLoopMoveDOM = !1);
									}),
								S &&
									i.forEach(e => {
										(l[e].swiperLoopMoveDOM = !0),
											d.append(l[e]),
											(l[e].swiperLoopMoveDOM = !1);
									}),
								b.recalcSlides(),
								"auto" === p.slidesPerView
									? b.updateSlides()
									: x &&
										((0 < E.length && T) || (0 < i.length && S)) &&
										b.slides.forEach((e, t) => {
											b.grid.updateSlide(t, e, b.slides);
										}),
								p.watchSlidesProgress && b.updateSlidesOffset(),
								m &&
									(0 < E.length && T
										? void 0 === u
											? ((c = b.slidesGrid[a]),
												(y = b.slidesGrid[a + s] - c),
												w
													? b.setTranslate(b.translate - y)
													: (b.slideTo(a + Math.ceil(s), 0, !1, !0),
														v &&
															((b.touchEventsData.startTranslate =
																b.touchEventsData.startTranslate -
																y),
															(b.touchEventsData.currentTranslate =
																b.touchEventsData.currentTranslate -
																y))))
											: v &&
												((T = x ? E.length / p.grid.rows : E.length),
												b.slideTo(b.activeIndex + T, 0, !1, !0),
												(b.touchEventsData.currentTranslate = b.translate))
										: 0 < i.length &&
											S &&
											(void 0 === u
												? ((c = b.slidesGrid[a]),
													(y = b.slidesGrid[a - r] - c),
													w
														? b.setTranslate(b.translate - y)
														: (b.slideTo(a - r, 0, !1, !0),
															v &&
																((b.touchEventsData.startTranslate =
																	b.touchEventsData
																		.startTranslate - y),
																(b.touchEventsData.currentTranslate =
																	b.touchEventsData
																		.currentTranslate - y))))
												: ((T = x ? i.length / p.grid.rows : i.length),
													b.slideTo(b.activeIndex - T, 0, !1, !0)))),
								(b.allowSlidePrev = n),
								(b.allowSlideNext = o),
								b.controller && b.controller.control && !f)
							) {
								let t = {
									slideRealIndex: u,
									direction: h,
									setTranslate: v,
									activeSlideIndex: g,
									byController: !0
								};
								Array.isArray(b.controller.control)
									? b.controller.control.forEach(e => {
											!e.destroyed &&
												e.params.loop &&
												e.loopFix({
													...t,
													slideTo:
														e.params.slidesPerView ===
															p.slidesPerView && m
												});
										})
									: b.controller.control instanceof b.constructor &&
										b.controller.control.params.loop &&
										b.controller.control.loopFix({
											...t,
											slideTo:
												b.controller.control.params.slidesPerView ===
													p.slidesPerView && m
										});
							}
						}
						b.emit("loopFix");
					}
				},
				loopDestroy: function () {
					var e = this;
					let { params: t, slidesEl: i } = e;
					if (!(!t.loop || (e.virtual && e.params.virtual.enabled))) {
						e.recalcSlides();
						let a = [];
						e.slides.forEach(e => {
							var t =
								void 0 === e.swiperSlideIndex
									? +e.getAttribute("data-swiper-slide-index")
									: e.swiperSlideIndex;
							a[t] = e;
						}),
							e.slides.forEach(e => {
								e.removeAttribute("data-swiper-slide-index");
							}),
							a.forEach(e => {
								i.append(e);
							}),
							e.recalcSlides(),
							e.slideTo(e.realIndex, 0);
					}
				}
			},
			grabCursor: {
				setGrabCursor: function (e) {
					let t = this;
					var a;
					!t.params.simulateTouch ||
						(t.params.watchOverflow && t.isLocked) ||
						t.params.cssMode ||
						((a = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl),
						t.isElement && (t.__preventObserver__ = !0),
						(a.style.cursor = "move"),
						(a.style.cursor = e ? "grabbing" : "grab"),
						t.isElement &&
							requestAnimationFrame(() => {
								t.__preventObserver__ = !1;
							}));
				},
				unsetGrabCursor: function () {
					let e = this;
					(e.params.watchOverflow && e.isLocked) ||
						e.params.cssMode ||
						(e.isElement && (e.__preventObserver__ = !0),
						(e[
							"container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
						].style.cursor = ""),
						e.isElement &&
							requestAnimationFrame(() => {
								e.__preventObserver__ = !1;
							}));
				}
			},
			events: ee,
			breakpoints: {
				setBreakpoint: function () {
					let s = this,
						{ realIndex: e, initialized: t, params: r, el: a } = s;
					if ((o = r.breakpoints) && 0 !== Object.keys(o).length) {
						var l = k(),
							n =
								"window" !== r.breakpointsBase && r.breakpointsBase
									? "container"
									: r.breakpointsBase,
							l =
								["window", "container"].includes(r.breakpointsBase) ||
								!r.breakpointsBase
									? s.el
									: l.querySelector(r.breakpointsBase),
							n = s.getBreakpoint(o, n, l);
						if (n && s.currentBreakpoint !== n) {
							let i = (n in o ? o[n] : void 0) || s.originalParams;
							var l = te(s, r),
								o = te(s, i),
								d = s.params.grabCursor,
								p = i.grabCursor,
								c = r.enabled,
								l =
									(l && !o
										? (a.classList.remove(
												r.containerModifierClass + "grid",
												r.containerModifierClass + "grid-column"
											),
											s.emitContainerClasses())
										: !l &&
											o &&
											(a.classList.add(r.containerModifierClass + "grid"),
											((i.grid.fill && "column" === i.grid.fill) ||
												(!i.grid.fill && "column" === r.grid.fill)) &&
												a.classList.add(
													r.containerModifierClass + "grid-column"
												),
											s.emitContainerClasses()),
									d && !p ? s.unsetGrabCursor() : !d && p && s.setGrabCursor(),
									["navigation", "pagination", "scrollbar"].forEach(e => {
										var t, a;
										void 0 !== i[e] &&
											((t = r[e] && r[e].enabled),
											(a = i[e] && i[e].enabled),
											t && !a && s[e].disable(),
											!t) &&
											a &&
											s[e].enable();
									}),
									i.direction && i.direction !== r.direction),
								o = r.loop && (i.slidesPerView !== r.slidesPerView || l),
								d = r.loop,
								p =
									(l && t && s.changeDirection(),
									u(s.params, i),
									s.params.enabled),
								l = s.params.loop;
							Object.assign(s, {
								allowTouchMove: s.params.allowTouchMove,
								allowSlideNext: s.params.allowSlideNext,
								allowSlidePrev: s.params.allowSlidePrev
							}),
								c && !p ? s.disable() : !c && p && s.enable(),
								(s.currentBreakpoint = n),
								s.emit("_beforeBreakpoint", i),
								t &&
									(o
										? (s.loopDestroy(), s.loopCreate(e), s.updateSlides())
										: !d && l
											? (s.loopCreate(e), s.updateSlides())
											: d && !l && s.loopDestroy()),
								s.emit("breakpoint", i);
						}
					}
				},
				getBreakpoint: function (e, i, s) {
					if ((void 0 === i && (i = "window"), e && ("container" !== i || s))) {
						let t = !1;
						var r = G();
						let a = "window" === i ? r.innerHeight : s.clientHeight;
						var l = Object.keys(e).map(e => {
							var t;
							return "string" == typeof e && 0 === e.indexOf("@")
								? ((t = parseFloat(e.substr(1))), { value: a * t, point: e })
								: { value: e, point: e };
						});
						l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
						for (let e = 0; e < l.length; e += 1) {
							var { point: n, value: o } = l[e];
							"window" === i
								? r.matchMedia(`(min-width: ${o}px)`).matches && (t = n)
								: o <= s.clientWidth && (t = n);
						}
						return t || "max";
					}
				}
			},
			checkOverflow: {
				checkOverflow: function () {
					var e,
						t = this,
						{ isLocked: a, params: i } = t,
						s = i.slidesOffsetBefore;
					s
						? ((e = t.slides.length - 1),
							(e = t.slidesGrid[e] + t.slidesSizesGrid[e] + 2 * s),
							(t.isLocked = t.size > e))
						: (t.isLocked = 1 === t.snapGrid.length),
						!0 === i.allowSlideNext && (t.allowSlideNext = !t.isLocked),
						!0 === i.allowSlidePrev && (t.allowSlidePrev = !t.isLocked),
						a && a !== t.isLocked && (t.isEnd = !1),
						a !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
				}
			},
			classes: {
				addClasses: function () {
					var { classNames: e, params: t, rtl: a, el: i, device: s } = this,
						a = ((e, a) => {
							let i = [];
							return (
								e.forEach(t => {
									"object" == typeof t
										? Object.keys(t).forEach(e => {
												t[e] && i.push(a + e);
											})
										: "string" == typeof t && i.push(a + t);
								}),
								i
							);
						})(
							[
								"initialized",
								t.direction,
								{ "free-mode": this.params.freeMode && t.freeMode.enabled },
								{ autoheight: t.autoHeight },
								{ rtl: a },
								{ grid: t.grid && 1 < t.grid.rows },
								{
									"grid-column":
										t.grid && 1 < t.grid.rows && "column" === t.grid.fill
								},
								{ android: s.android },
								{ ios: s.ios },
								{ "css-mode": t.cssMode },
								{ centered: t.cssMode && t.centeredSlides },
								{ "watch-progress": t.watchSlidesProgress }
							],
							t.containerModifierClass
						);
					e.push(...a), i.classList.add(...e), this.emitContainerClasses();
				},
				removeClasses: function () {
					var { el: e, classNames: t } = this;
					e &&
						"string" != typeof e &&
						(e.classList.remove(...t), this.emitContainerClasses());
				}
			}
		},
		ie = {};
	class h {
		constructor() {
			let e, a;
			for (var t = arguments.length, i = new Array(t), s = 0; s < t; s++) i[s] = arguments[s];
			1 === i.length &&
			i[0].constructor &&
			"Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
				? (a = i[0])
				: ([e, a] = i),
				(a = u({}, (a = a || {}))),
				e && !a.el && (a.el = e);
			var r = k();
			if (a.el && "string" == typeof a.el && 1 < r.querySelectorAll(a.el).length) {
				let t = [];
				return (
					r.querySelectorAll(a.el).forEach(e => {
						e = u({}, a, { el: e });
						t.push(new h(e));
					}),
					t
				);
			}
			let l = this,
				n =
					((l.__swiper__ = !0),
					(l.support = q()),
					(l.device = V({ userAgent: a.userAgent })),
					(l.browser = j()),
					(l.eventsListeners = {}),
					(l.eventsAnyListeners = []),
					(l.modules = [...l.__modules__]),
					a.modules && Array.isArray(a.modules) && l.modules.push(...a.modules),
					{});
			l.modules.forEach(e => {
				var i, s;
				e({
					params: a,
					swiper: l,
					extendParams:
						((i = a),
						(s = n),
						function (e) {
							void 0 === e && (e = {});
							var t = Object.keys(e)[0],
								a = e[t];
							"object" == typeof a &&
								null !== a &&
								(!0 === i[t] && (i[t] = { enabled: !0 }),
								"navigation" === t &&
									i[t] &&
									i[t].enabled &&
									!i[t].prevEl &&
									!i[t].nextEl &&
									(i[t].auto = !0),
								0 <= ["pagination", "scrollbar"].indexOf(t) &&
									i[t] &&
									i[t].enabled &&
									!i[t].el &&
									(i[t].auto = !0),
								t in i && "enabled" in a) &&
								("object" != typeof i[t] ||
									"enabled" in i[t] ||
									(i[t].enabled = !0),
								i[t] || (i[t] = { enabled: !1 })),
								u(s, e);
						}),
					on: l.on.bind(l),
					once: l.once.bind(l),
					off: l.off.bind(l),
					emit: l.emit.bind(l)
				});
			});
			r = u({}, p, n);
			return (
				(l.params = u({}, r, ie, a)),
				(l.originalParams = u({}, l.params)),
				(l.passedParams = u({}, a)),
				l.params &&
					l.params.on &&
					Object.keys(l.params.on).forEach(e => {
						l.on(e, l.params.on[e]);
					}),
				l.params && l.params.onAny && l.onAny(l.params.onAny),
				Object.assign(l, {
					enabled: l.params.enabled,
					el: e,
					classNames: [],
					slides: [],
					slidesGrid: [],
					snapGrid: [],
					slidesSizesGrid: [],
					isHorizontal() {
						return "horizontal" === l.params.direction;
					},
					isVertical() {
						return "vertical" === l.params.direction;
					},
					activeIndex: 0,
					realIndex: 0,
					isBeginning: !0,
					isEnd: !1,
					translate: 0,
					previousTranslate: 0,
					progress: 0,
					velocity: 0,
					animating: !1,
					cssOverflowAdjustment() {
						return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
					},
					allowSlideNext: l.params.allowSlideNext,
					allowSlidePrev: l.params.allowSlidePrev,
					touchEventsData: {
						isTouched: void 0,
						isMoved: void 0,
						allowTouchCallbacks: void 0,
						touchStartTime: void 0,
						isScrolling: void 0,
						currentTranslate: void 0,
						startTranslate: void 0,
						allowThresholdMove: void 0,
						focusableElements: l.params.focusableElements,
						lastClickTime: 0,
						clickTimeout: void 0,
						velocities: [],
						allowMomentumBounce: void 0,
						startMoving: void 0,
						pointerId: null,
						touchId: null
					},
					allowClick: !0,
					allowTouchMove: l.params.allowTouchMove,
					touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
					imagesToLoad: [],
					imagesLoaded: 0
				}),
				l.emit("_swiper"),
				l.params.init && l.init(),
				l
			);
		}
		getDirectionLabel(e) {
			return this.isHorizontal()
				? e
				: {
						width: "height",
						"margin-top": "margin-left",
						"margin-bottom ": "margin-right",
						"margin-left": "margin-top",
						"margin-right": "margin-bottom",
						"padding-left": "padding-top",
						"padding-right": "padding-bottom",
						marginRight: "marginBottom"
					}[e];
		}
		getSlideIndex(e) {
			var { slidesEl: t, params: a } = this,
				t = C(R(t, `.${a.slideClass}, swiper-slide`)[0]);
			return C(e) - t;
		}
		getSlideIndexByData(t) {
			return this.getSlideIndex(
				this.slides.find(e => +e.getAttribute("data-swiper-slide-index") === t)
			);
		}
		recalcSlides() {
			var { slidesEl: e, params: t } = this;
			this.slides = R(e, `.${t.slideClass}, swiper-slide`);
		}
		enable() {
			var e = this;
			e.enabled ||
				((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
		}
		disable() {
			var e = this;
			e.enabled &&
				((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
		}
		setProgress(e, t) {
			var a = this,
				i = ((e = Math.min(Math.max(e, 0), 1)), a.minTranslate()),
				s = a.maxTranslate();
			a.translateTo((s - i) * e + i, void 0 === t ? 0 : t),
				a.updateActiveIndex(),
				a.updateSlidesClasses();
		}
		emitContainerClasses() {
			let t = this;
			var e;
			t.params._emitClasses &&
				t.el &&
				((e = t.el.className
					.split(" ")
					.filter(
						e =>
							0 === e.indexOf("swiper") ||
							0 === e.indexOf(t.params.containerModifierClass)
					)),
				t.emit("_containerClasses", e.join(" ")));
		}
		getSlideClasses(e) {
			let t = this;
			return t.destroyed
				? ""
				: e.className
						.split(" ")
						.filter(
							e =>
								0 === e.indexOf("swiper-slide") ||
								0 === e.indexOf(t.params.slideClass)
						)
						.join(" ");
		}
		emitSlidesClasses() {
			let i = this;
			if (i.params._emitClasses && i.el) {
				let a = [];
				i.slides.forEach(e => {
					var t = i.getSlideClasses(e);
					a.push({ slideEl: e, classNames: t }), i.emit("_slideClass", e, t);
				}),
					i.emit("_slideClasses", a);
			}
		}
		slidesPerViewDynamic(e, t) {
			void 0 === e && (e = "current"), void 0 === t && (t = !1);
			var {
				params: a,
				slides: i,
				slidesGrid: s,
				slidesSizesGrid: r,
				size: l,
				activeIndex: n
			} = this;
			let o = 1;
			if ("number" == typeof a.slidesPerView) return a.slidesPerView;
			if (a.centeredSlides) {
				let t = i[n] ? Math.ceil(i[n].swiperSlideSize) : 0,
					a;
				for (let e = n + 1; e < i.length; e += 1)
					i[e] &&
						!a &&
						((t += Math.ceil(i[e].swiperSlideSize)), (o += 1), t > l) &&
						(a = !0);
				for (let e = n - 1; 0 <= e; --e)
					i[e] && !a && ((t += i[e].swiperSlideSize), (o += 1), t > l) && (a = !0);
			} else if ("current" === e)
				for (let e = n + 1; e < i.length; e += 1)
					(t ? s[e] + r[e] - s[n] < l : s[e] - s[n] < l) && (o += 1);
			else for (let e = n - 1; 0 <= e; --e) s[n] - s[e] < l && (o += 1);
			return o;
		}
		update() {
			let t = this;
			if (t && !t.destroyed) {
				var a,
					{ snapGrid: i, params: s } = t;
				s.breakpoints && t.setBreakpoint(),
					[...t.el.querySelectorAll('[loading="lazy"]')].forEach(e => {
						e.complete && l(t, e);
					}),
					t.updateSize(),
					t.updateSlides(),
					t.updateProgress(),
					t.updateSlidesClasses();
				let e;
				function r() {
					var e = t.rtlTranslate ? -1 * t.translate : t.translate,
						e = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
					t.setTranslate(e), t.updateActiveIndex(), t.updateSlidesClasses();
				}
				s.freeMode && s.freeMode.enabled && !s.cssMode
					? (r(), s.autoHeight && t.updateAutoHeight())
					: (e =
							("auto" === s.slidesPerView || 1 < s.slidesPerView) &&
							t.isEnd &&
							!s.centeredSlides
								? ((a = (t.virtual && s.virtual.enabled ? t.virtual : t).slides),
									t.slideTo(a.length - 1, 0, !1, !0))
								: t.slideTo(t.activeIndex, 0, !1, !0)) || r(),
					s.watchOverflow && i !== t.snapGrid && t.checkOverflow(),
					t.emit("update");
			}
		}
		changeDirection(t, e) {
			void 0 === e && (e = !0);
			var a = this,
				i = a.params.direction;
			return (
				(t = t || ("horizontal" === i ? "vertical" : "horizontal")) === i ||
					("horizontal" !== t && "vertical" !== t) ||
					(a.el.classList.remove("" + a.params.containerModifierClass + i),
					a.el.classList.add("" + a.params.containerModifierClass + t),
					a.emitContainerClasses(),
					(a.params.direction = t),
					a.slides.forEach(e => {
						"vertical" === t ? (e.style.width = "") : (e.style.height = "");
					}),
					a.emit("changeDirection"),
					e && a.update()),
				a
			);
		}
		changeLanguageDirection(e) {
			var t = this;
			(t.rtl && "rtl" === e) ||
				(!t.rtl && "ltr" === e) ||
				((t.rtl = "rtl" === e),
				(t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
				t.rtl
					? (t.el.classList.add(t.params.containerModifierClass + "rtl"),
						(t.el.dir = "rtl"))
					: (t.el.classList.remove(t.params.containerModifierClass + "rtl"),
						(t.el.dir = "ltr")),
				t.update());
		}
		mount(i) {
			let s = this;
			if (!s.mounted) {
				let e = i || s.params.el;
				if (!(e = "string" == typeof e ? document.querySelector(e) : e)) return !1;
				(e.swiper = s),
					e.parentNode &&
						e.parentNode.host &&
						e.parentNode.host.nodeName ===
							s.params.swiperElementNodeName.toUpperCase() &&
						(s.isElement = !0);
				let t = () => "." + (s.params.wrapperClass || "").trim().split(" ").join(".");
				let a =
					e && e.shadowRoot && e.shadowRoot.querySelector
						? e.shadowRoot.querySelector(t())
						: R(e, t())[0];
				!a &&
					s.params.createElements &&
					((a = A("div", s.params.wrapperClass)),
					e.append(a),
					R(e, "." + s.params.slideClass).forEach(e => {
						a.append(e);
					})),
					Object.assign(s, {
						el: e,
						wrapperEl: a,
						slidesEl:
							s.isElement && !e.parentNode.host.slideSlots ? e.parentNode.host : a,
						hostEl: s.isElement ? e.parentNode.host : e,
						mounted: !0,
						rtl: "rtl" === e.dir.toLowerCase() || "rtl" === X(e, "direction"),
						rtlTranslate:
							"horizontal" === s.params.direction &&
							("rtl" === e.dir.toLowerCase() || "rtl" === X(e, "direction")),
						wrongRTL: "-webkit-box" === X(a, "display")
					});
			}
			return !0;
		}
		init(e) {
			let t = this;
			return (
				t.initialized ||
					(!1 !== t.mount(e) &&
						(t.emit("beforeInit"),
						t.params.breakpoints && t.setBreakpoint(),
						t.addClasses(),
						t.updateSize(),
						t.updateSlides(),
						t.params.watchOverflow && t.checkOverflow(),
						t.params.grabCursor && t.enabled && t.setGrabCursor(),
						t.params.loop && t.virtual && t.params.virtual.enabled
							? t.slideTo(
									t.params.initialSlide + t.virtual.slidesBefore,
									0,
									t.params.runCallbacksOnInit,
									!1,
									!0
								)
							: t.slideTo(
									t.params.initialSlide,
									0,
									t.params.runCallbacksOnInit,
									!1,
									!0
								),
						t.params.loop && t.loopCreate(),
						t.attachEvents(),
						(e = [...t.el.querySelectorAll('[loading="lazy"]')]),
						t.isElement && e.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
						e.forEach(e => {
							e.complete
								? l(t, e)
								: e.addEventListener("load", e => {
										l(t, e.target);
									});
						}),
						m(t),
						(t.initialized = !0),
						m(t),
						t.emit("init"),
						t.emit("afterInit"))),
				t
			);
		}
		destroy(e, a) {
			void 0 === e && (e = !0), void 0 === a && (a = !0);
			let i = this,
				{ params: t, el: s, wrapperEl: r, slides: l } = i;
			if (void 0 !== i.params && !i.destroyed) {
				if (
					(i.emit("beforeDestroy"),
					(i.initialized = !1),
					i.detachEvents(),
					t.loop && i.loopDestroy(),
					a &&
						(i.removeClasses(),
						s && "string" != typeof s && s.removeAttribute("style"),
						r && r.removeAttribute("style"),
						l) &&
						l.length &&
						l.forEach(e => {
							e.classList.remove(
								t.slideVisibleClass,
								t.slideFullyVisibleClass,
								t.slideActiveClass,
								t.slideNextClass,
								t.slidePrevClass
							),
								e.removeAttribute("style"),
								e.removeAttribute("data-swiper-slide-index");
						}),
					i.emit("destroy"),
					Object.keys(i.eventsListeners).forEach(e => {
						i.off(e);
					}),
					!1 !== e)
				) {
					i.el && "string" != typeof i.el && (i.el.swiper = null);
					{
						a = i;
						let t = a;
						Object.keys(t).forEach(e => {
							try {
								t[e] = null;
							} catch (e) {}
							try {
								delete t[e];
							} catch (e) {}
						});
					}
				}
				i.destroyed = !0;
			}
			return null;
		}
		static extendDefaults(e) {
			u(ie, e);
		}
		static get extendedDefaults() {
			return ie;
		}
		static get defaults() {
			return p;
		}
		static installModule(e) {
			h.prototype.__modules__ || (h.prototype.__modules__ = []);
			var t = h.prototype.__modules__;
			"function" == typeof e && t.indexOf(e) < 0 && t.push(e);
		}
		static use(e) {
			return Array.isArray(e) ? e.forEach(e => h.installModule(e)) : h.installModule(e), h;
		}
	}
	function se(a, i, s, r) {
		return (
			a.params.createElements &&
				Object.keys(r).forEach(t => {
					if (!s[t] && !0 === s.auto) {
						let e = R(a.el, "." + r[t])[0];
						e || (((e = A("div", r[t])).className = r[t]), a.el.append(e)),
							(s[t] = e),
							(i[t] = e);
					}
				}),
			s
		);
	}
	function L(e) {
		return (
			"." +
			(e = void 0 === e ? "" : e)
				.trim()
				.replace(/([\.:!+\/])/g, "\\$1")
				.replace(/ /g, ".")
		);
	}
	function n(e) {
		let {
			effect: a,
			swiper: i,
			on: t,
			setTranslate: s,
			setTransition: r,
			overwriteParams: l,
			perspective: n,
			recreateShadows: o,
			getEffectParams: d
		} = e;
		t("beforeInit", () => {
			var e;
			i.params.effect === a &&
				(i.classNames.push("" + i.params.containerModifierClass + a),
				n && n() && i.classNames.push(i.params.containerModifierClass + "3d"),
				(e = l ? l() : {}),
				Object.assign(i.params, e),
				Object.assign(i.originalParams, e));
		}),
			t("setTranslate", () => {
				i.params.effect === a && s();
			}),
			t("setTransition", (e, t) => {
				i.params.effect === a && r(t);
			}),
			t("transitionEnd", () => {
				i.params.effect === a &&
					o &&
					d &&
					d().slideShadows &&
					(i.slides.forEach(e => {
						e.querySelectorAll(
							".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
						).forEach(e => e.remove());
					}),
					o());
			});
		let p;
		t("virtualUpdate", () => {
			i.params.effect === a &&
				(i.slides.length || (p = !0),
				requestAnimationFrame(() => {
					p && i.slides && i.slides.length && (s(), (p = !1));
				}));
		});
	}
	function x(e, t) {
		var a = s(t);
		return (
			a !== t &&
				((a.style.backfaceVisibility = "hidden"),
				(a.style["-webkit-backface-visibility"] = "hidden")),
			a
		);
	}
	function v(e) {
		let { swiper: a, duration: t, transformElements: i, allSlides: s } = e,
			r = a.activeIndex;
		if (a.params.virtualTranslate && 0 !== t) {
			let t = !1,
				e;
			(e = s
				? i
				: i.filter(e => {
						var t,
							e = e.classList.contains("swiper-slide-transform")
								? (t = e).parentElement ||
									a.slides.find(
										e => e.shadowRoot && e.shadowRoot === t.parentNode
									)
								: e;
						return a.getSlideIndex(e) === r;
					})).forEach(e => {
				g(e, () => {
					var e;
					t ||
						(a &&
							!a.destroyed &&
							((t = !0),
							(a.animating = !1),
							(e = new window.CustomEvent("transitionend", {
								bubbles: !0,
								cancelable: !0
							})),
							a.wrapperEl.dispatchEvent(e)));
				});
			});
		}
	}
	function E(e, t, a) {
		(a = "swiper-slide-shadow" + (a ? "-" + a : "") + (e ? " swiper-slide-shadow-" + e : "")),
			(e = s(t));
		let i = e.querySelector("." + a.split(" ").join("."));
		return i || ((i = A("div", a.split(" "))), e.append(i)), i;
	}
	Object.keys(ae).forEach(t => {
		Object.keys(ae[t]).forEach(e => {
			h.prototype[e] = ae[t][e];
		});
	}),
		h.use([
			function (e) {
				let { swiper: r, on: t, emit: a } = e,
					i = G(),
					s = null,
					l = null,
					n = () => {
						r && !r.destroyed && r.initialized && (a("beforeResize"), a("resize"));
					},
					o = () => {
						r && !r.destroyed && r.initialized && a("orientationchange");
					};
				t("init", () => {
					r.params.resizeObserver && void 0 !== i.ResizeObserver
						? r &&
							!r.destroyed &&
							r.initialized &&
							(s = new ResizeObserver(a => {
								l = i.requestAnimationFrame(() => {
									var { width: e, height: t } = r;
									let i = e,
										s = t;
									a.forEach(e => {
										var { contentBoxSize: e, contentRect: t, target: a } = e;
										(a && a !== r.el) ||
											((i = t ? t.width : (e[0] || e).inlineSize),
											(s = t ? t.height : (e[0] || e).blockSize));
									}),
										(i === e && s === t) || n();
								});
							})).observe(r.el)
						: (i.addEventListener("resize", n),
							i.addEventListener("orientationchange", o));
				}),
					t("destroy", () => {
						l && i.cancelAnimationFrame(l),
							s && s.unobserve && r.el && (s.unobserve(r.el), (s = null)),
							i.removeEventListener("resize", n),
							i.removeEventListener("orientationchange", o);
					});
			},
			function (e) {
				function a(e, t) {
					void 0 === t && (t = {});
					var a = new (n.MutationObserver || n.WebkitMutationObserver)(e => {
						var t;
						i.__preventObserver__ ||
							(1 === e.length
								? r("observerUpdate", e[0])
								: ((t = function () {
										r("observerUpdate", e[0]);
									}),
									n.requestAnimationFrame
										? n.requestAnimationFrame(t)
										: n.setTimeout(t, 0)));
					});
					a.observe(e, {
						attributes: void 0 === t.attributes || t.attributes,
						childList: i.isElement || (void 0 === t.childList || t).childList,
						characterData: void 0 === t.characterData || t.characterData
					}),
						l.push(a);
				}
				let { swiper: i, extendParams: t, on: s, emit: r } = e,
					l = [],
					n = G();
				t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
					s("init", () => {
						if (i.params.observer) {
							if (i.params.observeParents) {
								var t = N(i.hostEl);
								for (let e = 0; e < t.length; e += 1) a(t[e]);
							}
							a(i.hostEl, { childList: i.params.observeSlideChildren }),
								a(i.wrapperEl, { attributes: !1 });
						}
					}),
					s("destroy", () => {
						l.forEach(e => {
							e.disconnect();
						}),
							l.splice(0, l.length);
					});
			}
		]),
		h.use([
			function (e) {
				let { swiper: C, extendParams: t, on: a, emit: P } = e;
				t({
					virtual: {
						enabled: !1,
						slides: [],
						cache: !0,
						renderSlide: null,
						renderExternal: null,
						renderExternalUpdate: !0,
						addSlidesBefore: 0,
						addSlidesAfter: 0
					}
				});
				let i,
					s =
						((e = k()),
						(C.virtual = {
							cache: {},
							from: void 0,
							to: void 0,
							slides: [],
							offset: 0,
							slidesGrid: []
						}),
						e.createElement("div"));
				function L(e, t) {
					var a = C.params.virtual;
					if (a.cache && C.virtual.cache[t]) return C.virtual.cache[t];
					let i;
					return (
						a.renderSlide
							? "string" == typeof (i = a.renderSlide.call(C, e, t)) &&
								((s.innerHTML = i), (i = s.children[0]))
							: (i = C.isElement ? A("swiper-slide") : A("div", C.params.slideClass)),
						i.setAttribute("data-swiper-slide-index", t),
						a.renderSlide || (i.innerHTML = e),
						a.cache && (C.virtual.cache[t] = i),
						i
					);
				}
				function l(c, u) {
					var {
						slidesPerView: m,
						slidesPerGroup: h,
						centeredSlides: v,
						loop: g,
						initialSlide: f
					} = C.params;
					if (!(u && !g && 0 < f)) {
						var { addSlidesBefore: u, addSlidesAfter: f } = C.params.virtual;
						let { from: t, to: a, slides: i, slidesGrid: e, offset: s } = C.virtual;
						C.params.cssMode || C.updateActiveIndex();
						var w = C.activeIndex || 0;
						let r;
						r = C.rtlTranslate ? "right" : C.isHorizontal() ? "left" : "top";
						let l,
							n,
							o =
								w -
								(n = v
									? ((l = Math.floor(m / 2) + h + f), Math.floor(m / 2) + h + u)
									: ((l = m + (h - 1) + f), (g ? m : h) + u)),
							d = w + l,
							p =
								(g || ((o = Math.max(o, 0)), (d = Math.min(d, i.length - 1))),
								(C.slidesGrid[o] || 0) - (C.slidesGrid[0] || 0));
						if (
							(g && w >= n
								? ((o -= n), v || (p += C.slidesGrid[0]))
								: g && w < n && ((o = -n), v) && (p += C.slidesGrid[0]),
							Object.assign(C.virtual, {
								from: o,
								to: d,
								offset: p,
								slidesGrid: C.slidesGrid,
								slidesBefore: n,
								slidesAfter: l
							}),
							t !== o || a !== d || c)
						)
							if (C.params.virtual.renderExternal)
								C.params.virtual.renderExternal.call(C, {
									offset: p,
									from: o,
									to: d,
									slides: (() => {
										var t = [];
										for (let e = o; e <= d; e += 1) t.push(i[e]);
										return t;
									})()
								}),
									C.params.virtual.renderExternalUpdate
										? M()
										: P("virtualUpdate");
							else {
								var b = [],
									y = [],
									x = e => {
										let t = e;
										return (
											e < 0
												? (t = i.length + e)
												: t >= i.length && (t -= i.length),
											t
										);
									};
								if (c)
									C.slides
										.filter(e =>
											e.matches(`.${C.params.slideClass}, swiper-slide`)
										)
										.forEach(e => {
											e.remove();
										});
								else
									for (let e = t; e <= a; e += 1)
										if (e < o || e > d) {
											let t = x(e);
											C.slides
												.filter(e =>
													e.matches(
														`.${C.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`
													)
												)
												.forEach(e => {
													e.remove();
												});
										}
								var E,
									f = g ? -i.length : 0,
									S = g ? 2 * i.length : i.length;
								for (let e = f; e < S; e += 1)
									e >= o &&
										e <= d &&
										((E = x(e)),
										void 0 === a || c
											? y.push(E)
											: (e > a && y.push(E), e < t && b.push(E)));
								if (
									(y.forEach(e => {
										C.slidesEl.append(L(i[e], e));
									}),
									g)
								)
									for (let e = b.length - 1; 0 <= e; --e) {
										var T = b[e];
										C.slidesEl.prepend(L(i[T], T));
									}
								else
									b.sort((e, t) => t - e),
										b.forEach(e => {
											C.slidesEl.prepend(L(i[e], e));
										});
								R(C.slidesEl, ".swiper-slide, swiper-slide").forEach(e => {
									e.style[r] = p - Math.abs(C.cssOverflowAdjustment()) + "px";
								}),
									M();
							}
						else
							C.slidesGrid !== e &&
								p !== s &&
								C.slides.forEach(e => {
									e.style[r] = p - Math.abs(C.cssOverflowAdjustment()) + "px";
								}),
								C.updateProgress(),
								P("virtualUpdate");
						function M() {
							C.updateSlides(),
								C.updateProgress(),
								C.updateSlidesClasses(),
								P("virtualUpdate");
						}
					}
				}
				a("beforeInit", () => {
					if (C.params.virtual.enabled) {
						let e;
						var t;
						void 0 === C.passedParams.virtual.slides &&
							(t = [...C.slidesEl.children].filter(e =>
								e.matches(`.${C.params.slideClass}, swiper-slide`)
							)) &&
							t.length &&
							((C.virtual.slides = [...t]),
							(e = !0),
							t.forEach((e, t) => {
								e.setAttribute("data-swiper-slide-index", t),
									(C.virtual.cache[t] = e).remove();
							})),
							e || (C.virtual.slides = C.params.virtual.slides),
							C.classNames.push(C.params.containerModifierClass + "virtual"),
							(C.params.watchSlidesProgress = !0),
							l(!(C.originalParams.watchSlidesProgress = !0), !0);
					}
				}),
					a("setTranslate", () => {
						C.params.virtual.enabled &&
							(C.params.cssMode && !C._immediateVirtual
								? (clearTimeout(i),
									(i = setTimeout(() => {
										l();
									}, 100)))
								: l());
					}),
					a("init update resize", () => {
						C.params.virtual.enabled &&
							C.params.cssMode &&
							$(C.wrapperEl, "--swiper-virtual-size", C.virtualSize + "px");
					}),
					Object.assign(C.virtual, {
						appendSlide: function (t) {
							if ("object" == typeof t && "length" in t)
								for (let e = 0; e < t.length; e += 1)
									t[e] && C.virtual.slides.push(t[e]);
							else C.virtual.slides.push(t);
							l(!0);
						},
						prependSlide: function (t) {
							var e = C.activeIndex;
							let a = e + 1,
								r = 1;
							if (Array.isArray(t)) {
								for (let e = 0; e < t.length; e += 1)
									t[e] && C.virtual.slides.unshift(t[e]);
								(a = e + t.length), (r = t.length);
							} else C.virtual.slides.unshift(t);
							if (C.params.virtual.cache) {
								let i = C.virtual.cache,
									s = {};
								Object.keys(i).forEach(e => {
									var t = i[e],
										a = t.getAttribute("data-swiper-slide-index");
									a &&
										t.setAttribute(
											"data-swiper-slide-index",
											parseInt(a, 10) + r
										),
										(s[parseInt(e, 10) + r] = t);
								}),
									(C.virtual.cache = s);
							}
							l(!0), C.slideTo(a, 0);
						},
						removeSlide: function (a) {
							if (null != a) {
								let t = C.activeIndex;
								if (Array.isArray(a))
									for (let e = a.length - 1; 0 <= e; --e)
										C.params.virtual.cache &&
											(delete C.virtual.cache[a[e]],
											Object.keys(C.virtual.cache).forEach(e => {
												a < e &&
													((C.virtual.cache[e - 1] = C.virtual.cache[e]),
													C.virtual.cache[e - 1].setAttribute(
														"data-swiper-slide-index",
														e - 1
													),
													delete C.virtual.cache[e]);
											})),
											C.virtual.slides.splice(a[e], 1),
											a[e] < t && --t,
											(t = Math.max(t, 0));
								else
									C.params.virtual.cache &&
										(delete C.virtual.cache[a],
										Object.keys(C.virtual.cache).forEach(e => {
											a < e &&
												((C.virtual.cache[e - 1] = C.virtual.cache[e]),
												C.virtual.cache[e - 1].setAttribute(
													"data-swiper-slide-index",
													e - 1
												),
												delete C.virtual.cache[e]);
										})),
										C.virtual.slides.splice(a, 1),
										a < t && --t,
										(t = Math.max(t, 0));
								l(!0), C.slideTo(t, 0);
							}
						},
						removeAllSlides: function () {
							(C.virtual.slides = []),
								C.params.virtual.cache && (C.virtual.cache = {}),
								l(!0),
								C.slideTo(0, 0);
						},
						update: l
					});
			},
			function (e) {
				let { swiper: f, extendParams: t, on: a, emit: w } = e,
					b = k(),
					y = G();
				function i(t) {
					if (f.enabled) {
						var a = f.rtlTranslate;
						let e = t;
						var t = (e = e.originalEvent ? e.originalEvent : e).keyCode || e.charCode,
							i = f.params.keyboard.pageUpDown,
							s = i && 33 === t,
							i = i && 34 === t,
							r = 37 === t,
							l = 39 === t,
							n = 38 === t,
							o = 40 === t;
						if (
							!f.allowSlideNext &&
							((f.isHorizontal() && l) || (f.isVertical() && o) || i)
						)
							return !1;
						if (
							!f.allowSlidePrev &&
							((f.isHorizontal() && r) || (f.isVertical() && n) || s)
						)
							return !1;
						if (
							!(
								e.shiftKey ||
								e.altKey ||
								e.ctrlKey ||
								e.metaKey ||
								(b.activeElement &&
									b.activeElement.nodeName &&
									("input" === b.activeElement.nodeName.toLowerCase() ||
										"textarea" === b.activeElement.nodeName.toLowerCase()))
							)
						) {
							if (f.params.keyboard.onlyInViewport && (s || i || r || l || n || o)) {
								let t = !1;
								if (
									0 < N(f.el, `.${f.params.slideClass}, swiper-slide`).length &&
									0 === N(f.el, "." + f.params.slideActiveClass).length
								)
									return;
								var d = f.el,
									p = d.clientWidth,
									c = d.clientHeight,
									u = y.innerWidth,
									m = y.innerHeight,
									h = H(d),
									v =
										(a && (h.left -= d.scrollLeft),
										[
											[h.left, h.top],
											[h.left + p, h.top],
											[h.left, h.top + c],
											[h.left + p, h.top + c]
										]);
								for (let e = 0; e < v.length; e += 1) {
									var g = v[e];
									0 <= g[0] &&
										g[0] <= u &&
										0 <= g[1] &&
										g[1] <= m &&
										((0 === g[0] && 0 === g[1]) || (t = !0));
								}
								if (!t) return;
							}
							f.isHorizontal()
								? ((s || i || r || l) &&
										(e.preventDefault
											? e.preventDefault()
											: (e.returnValue = !1)),
									(((i || l) && !a) || ((s || r) && a)) && f.slideNext(),
									(((s || r) && !a) || ((i || l) && a)) && f.slidePrev())
								: ((s || i || n || o) &&
										(e.preventDefault
											? e.preventDefault()
											: (e.returnValue = !1)),
									(i || o) && f.slideNext(),
									(s || n) && f.slidePrev()),
								w("keyPress", t);
						}
					}
				}
				function s() {
					f.keyboard.enabled ||
						(b.addEventListener("keydown", i), (f.keyboard.enabled = !0));
				}
				function r() {
					f.keyboard.enabled &&
						(b.removeEventListener("keydown", i), (f.keyboard.enabled = !1));
				}
				(f.keyboard = { enabled: !1 }),
					t({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
					a("init", () => {
						f.params.keyboard.enabled && s();
					}),
					a("destroy", () => {
						f.keyboard.enabled && r();
					}),
					Object.assign(f.keyboard, { enable: s, disable: r });
			},
			function (e) {
				let { swiper: d, extendParams: t, on: a, emit: p } = e,
					i = G();
				t({
					mousewheel: {
						enabled: !1,
						releaseOnEdges: !1,
						invert: !1,
						forceToAxis: !1,
						sensitivity: 1,
						eventsTarget: "container",
						thresholdDelta: null,
						thresholdTime: null,
						noMousewheelClass: "swiper-no-mousewheel"
					}
				}),
					(d.mousewheel = { enabled: !1 });
				let c,
					s = f(),
					u,
					m = [];
				function r() {
					d.enabled && (d.mouseEntered = !0);
				}
				function l() {
					d.enabled && (d.mouseEntered = !1);
				}
				function h(e) {
					(d.params.mousewheel.thresholdDelta &&
						e.delta < d.params.mousewheel.thresholdDelta) ||
						(d.params.mousewheel.thresholdTime &&
							f() - s < d.params.mousewheel.thresholdTime) ||
						(6 <= e.delta && f() - s < 60) ||
						(e.direction < 0
							? (d.isEnd && !d.params.loop) ||
								d.animating ||
								(d.slideNext(), p("scroll", e.raw))
							: (d.isBeginning && !d.params.loop) ||
								d.animating ||
								(d.slidePrev(), p("scroll", e.raw)),
						(s = new i.Date().getTime()));
				}
				function n(i) {
					let s = i;
					if (
						d.enabled &&
						!i.target.closest("." + d.params.mousewheel.noMousewheelClass)
					) {
						var r = d.params.mousewheel;
						d.params.cssMode && s.preventDefault();
						let e = d.el;
						var l =
							(e =
								"container" !== d.params.mousewheel.eventsTarget
									? document.querySelector(d.params.mousewheel.eventsTarget)
									: e) && e.contains(s.target);
						if (!d.mouseEntered && !l && !r.releaseOnEdges) return !0;
						s.originalEvent && (s = s.originalEvent);
						let a = 0;
						var l = d.rtlTranslate ? -1 : 1,
							n = (e => {
								let t = 0,
									a = 0,
									i = 0,
									s = 0;
								return (
									"detail" in e && (a = e.detail),
									"wheelDelta" in e && (a = -e.wheelDelta / 120),
									"wheelDeltaY" in e && (a = -e.wheelDeltaY / 120),
									"wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
									"axis" in e &&
										e.axis === e.HORIZONTAL_AXIS &&
										((t = a), (a = 0)),
									(i = 10 * t),
									(s = 10 * a),
									"deltaY" in e && (s = e.deltaY),
									"deltaX" in e && (i = e.deltaX),
									e.shiftKey && !i && ((i = s), (s = 0)),
									(i || s) &&
										e.deltaMode &&
										(1 === e.deltaMode
											? ((i *= 40), (s *= 40))
											: ((i *= 800), (s *= 800))),
									i && !t && (t = i < 1 ? -1 : 1),
									s && !a && (a = s < 1 ? -1 : 1),
									{ spinX: t, spinY: a, pixelX: i, pixelY: s }
								);
							})(s);
						if (r.forceToAxis)
							if (d.isHorizontal()) {
								if (!(Math.abs(n.pixelX) > Math.abs(n.pixelY))) return !0;
								a = -n.pixelX * l;
							} else {
								if (!(Math.abs(n.pixelY) > Math.abs(n.pixelX))) return !0;
								a = -n.pixelY;
							}
						else
							a = Math.abs(n.pixelX) > Math.abs(n.pixelY) ? -n.pixelX * l : -n.pixelY;
						if (0 === a) return !0;
						r.invert && (a = -a);
						let t = d.getTranslate() + a * r.sensitivity;
						if (
							((t = t >= d.minTranslate() ? d.minTranslate() : t) <=
								d.maxTranslate() && (t = d.maxTranslate()),
							(!!d.params.loop ||
								!(t === d.minTranslate() || t === d.maxTranslate())) &&
								d.params.nested &&
								s.stopPropagation(),
							d.params.freeMode && d.params.freeMode.enabled)
						) {
							let t = { time: f(), delta: Math.abs(a), direction: Math.sign(a) };
							l =
								u &&
								t.time < u.time + 500 &&
								t.delta <= u.delta &&
								t.direction === u.direction;
							if (!l) {
								u = void 0;
								let e = d.getTranslate() + a * r.sensitivity;
								var n = d.isBeginning,
									o = d.isEnd;
								if (
									((e = e >= d.minTranslate() ? d.minTranslate() : e) <=
										d.maxTranslate() && (e = d.maxTranslate()),
									d.setTransition(0),
									d.setTranslate(e),
									d.updateProgress(),
									d.updateActiveIndex(),
									d.updateSlidesClasses(),
									((!n && d.isBeginning) || (!o && d.isEnd)) &&
										d.updateSlidesClasses(),
									d.params.loop &&
										d.loopFix({
											direction: t.direction < 0 ? "next" : "prev",
											byMousewheel: !0
										}),
									d.params.freeMode.sticky)
								) {
									clearTimeout(c), (c = void 0), 15 <= m.length && m.shift();
									(n = m.length ? m[m.length - 1] : void 0), (o = m[0]);
									if (
										(m.push(t),
										n && (t.delta > n.delta || t.direction !== n.direction))
									)
										m.splice(0);
									else if (
										15 <= m.length &&
										t.time - o.time < 500 &&
										1 <= o.delta - t.delta &&
										t.delta <= 6
									) {
										let e = 0 < a ? 0.8 : 0.2;
										(u = t),
											m.splice(0),
											(c = M(() => {
												!d.destroyed &&
													d.params &&
													d.slideToClosest(d.params.speed, !0, void 0, e);
											}, 0));
									}
									c =
										c ||
										M(() => {
											!d.destroyed &&
												d.params &&
												((u = t),
												m.splice(0),
												d.slideToClosest(d.params.speed, !0, void 0, 0.5));
										}, 500);
								}
								if (
									(l || p("scroll", s),
									d.params.autoplay &&
										d.params.autoplayDisableOnInteraction &&
										d.autoplay.stop(),
									r.releaseOnEdges &&
										(e === d.minTranslate() || e === d.maxTranslate()))
								)
									return !0;
							}
						} else {
							(n = {
								time: f(),
								delta: Math.abs(a),
								direction: Math.sign(a),
								raw: i
							}),
								(o =
									(2 <= m.length && m.shift(),
									m.length ? m[m.length - 1] : void 0));
							if (
								(m.push(n),
								(!o ||
									n.direction !== o.direction ||
									n.delta > o.delta ||
									n.time > o.time + 150) &&
									h(n),
								(e => {
									var t = d.params.mousewheel;
									if (e.direction < 0) {
										if (d.isEnd && !d.params.loop && t.releaseOnEdges) return 1;
									} else if (d.isBeginning && !d.params.loop && t.releaseOnEdges)
										return 1;
								})(n))
							)
								return !0;
						}
						return s.preventDefault ? s.preventDefault() : (s.returnValue = !1), !1;
					}
				}
				function o(e) {
					let t = d.el;
					(t =
						"container" !== d.params.mousewheel.eventsTarget
							? document.querySelector(d.params.mousewheel.eventsTarget)
							: t)[e]("mouseenter", r),
						t[e]("mouseleave", l),
						t[e]("wheel", n);
				}
				function v() {
					if (d.params.cssMode) d.wrapperEl.removeEventListener("wheel", n);
					else {
						if (d.mousewheel.enabled) return !1;
						o("addEventListener"), (d.mousewheel.enabled = !0);
					}
					return !0;
				}
				function g() {
					if (d.params.cssMode) d.wrapperEl.addEventListener(event, n);
					else {
						if (!d.mousewheel.enabled) return !1;
						o("removeEventListener"), (d.mousewheel.enabled = !1);
					}
					return !0;
				}
				a("init", () => {
					!d.params.mousewheel.enabled && d.params.cssMode && g(),
						d.params.mousewheel.enabled && v();
				}),
					a("destroy", () => {
						d.params.cssMode && v(), d.mousewheel.enabled && g();
					}),
					Object.assign(d.mousewheel, { enable: v, disable: g });
			},
			function (e) {
				let { swiper: l, extendParams: t, on: a, emit: n } = e;
				function s(e) {
					let t;
					return !(
						e &&
						"string" == typeof e &&
						l.isElement &&
						(t = l.el.querySelector(e) || l.hostEl.querySelector(e))
					) &&
						(e &&
							("string" == typeof e && (t = [...document.querySelectorAll(e)]),
							l.params.uniqueNavElements &&
							"string" == typeof e &&
							t &&
							1 < t.length &&
							1 === l.el.querySelectorAll(e).length
								? (t = l.el.querySelector(e))
								: t && 1 === t.length && (t = t[0])),
						e) &&
						!t
						? e
						: t;
				}
				function i(e, t) {
					let a = l.params.navigation;
					(e = P(e)).forEach(e => {
						e &&
							(e.classList[t ? "add" : "remove"](...a.disabledClass.split(" ")),
							"BUTTON" === e.tagName && (e.disabled = t),
							l.params.watchOverflow) &&
							l.enabled &&
							e.classList[l.isLocked ? "add" : "remove"](a.lockClass);
					});
				}
				function r() {
					var { nextEl: e, prevEl: t } = l.navigation;
					l.params.loop
						? (i(t, !1), i(e, !1))
						: (i(t, l.isBeginning && !l.params.rewind),
							i(e, l.isEnd && !l.params.rewind));
				}
				function o(e) {
					e.preventDefault(),
						(l.isBeginning && !l.params.loop && !l.params.rewind) ||
							(l.slidePrev(), n("navigationPrev"));
				}
				function d(e) {
					e.preventDefault(),
						(l.isEnd && !l.params.loop && !l.params.rewind) ||
							(l.slideNext(), n("navigationNext"));
				}
				function p() {
					let a = l.params.navigation;
					if (
						((l.params.navigation = se(
							l,
							l.originalParams.navigation,
							l.params.navigation,
							{ nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
						)),
						a.nextEl || a.prevEl)
					) {
						var e = s(a.nextEl),
							i = s(a.prevEl);
						Object.assign(l.navigation, { nextEl: e, prevEl: i }),
							(e = P(e)),
							(i = P(i));
						let t = (e, t) => {
							e && e.addEventListener("click", "next" === t ? d : o),
								!l.enabled && e && e.classList.add(...a.lockClass.split(" "));
						};
						e.forEach(e => t(e, "next")), i.forEach(e => t(e, "prev"));
					}
				}
				function c() {
					var { nextEl: e, prevEl: t } = l.navigation,
						e = P(e),
						t = P(t);
					let a = (e, t) => {
						e.removeEventListener("click", "next" === t ? d : o),
							e.classList.remove(...l.params.navigation.disabledClass.split(" "));
					};
					e.forEach(e => a(e, "next")), t.forEach(e => a(e, "prev"));
				}
				t({
					navigation: {
						nextEl: null,
						prevEl: null,
						hideOnClick: !1,
						disabledClass: "swiper-button-disabled",
						hiddenClass: "swiper-button-hidden",
						lockClass: "swiper-button-lock",
						navigationDisabledClass: "swiper-navigation-disabled"
					}
				}),
					(l.navigation = { nextEl: null, prevEl: null }),
					a("init", () => {
						(!1 === l.params.navigation.enabled ? u : (p(), r))();
					}),
					a("toEdge fromEdge lock unlock", () => {
						r();
					}),
					a("destroy", () => {
						c();
					}),
					a("enable disable", () => {
						var { nextEl: e, prevEl: t } = l.navigation,
							e = P(e),
							t = P(t);
						l.enabled
							? r()
							: [...e, ...t]
									.filter(e => !!e)
									.forEach(e => e.classList.add(l.params.navigation.lockClass));
					}),
					a("click", (e, t) => {
						let { nextEl: a, prevEl: i } = l.navigation;
						(a = P(a)), (i = P(i));
						var s = t.target;
						let r = i.includes(s) || a.includes(s);
						if (
							(l.isElement &&
								!r &&
								(t = t.path || (t.composedPath && t.composedPath())) &&
								(r = t.find(e => a.includes(e) || i.includes(e))),
							l.params.navigation.hideOnClick &&
								!r &&
								(!(
									l.pagination &&
									l.params.pagination &&
									l.params.pagination.clickable
								) ||
									(l.pagination.el !== s && !l.pagination.el.contains(s))))
						) {
							let e;
							a.length
								? (e = a[0].classList.contains(l.params.navigation.hiddenClass))
								: i.length &&
									(e = i[0].classList.contains(l.params.navigation.hiddenClass)),
								!0 === e ? n("navigationShow") : n("navigationHide"),
								[...a, ...i]
									.filter(e => !!e)
									.forEach(e =>
										e.classList.toggle(l.params.navigation.hiddenClass)
									);
						}
					});
				let u = () => {
					l.el.classList.add(...l.params.navigation.navigationDisabledClass.split(" ")),
						c();
				};
				Object.assign(l.navigation, {
					enable: () => {
						l.el.classList.remove(
							...l.params.navigation.navigationDisabledClass.split(" ")
						),
							p(),
							r();
					},
					disable: u,
					update: r,
					init: p,
					destroy: c
				});
			},
			function (e) {
				let { swiper: u, extendParams: t, on: a, emit: m } = e;
				(e = "swiper-pagination"),
					t({
						pagination: {
							el: null,
							bulletElement: "span",
							clickable: !1,
							hideOnClick: !1,
							renderBullet: null,
							renderProgressbar: null,
							renderFraction: null,
							renderCustom: null,
							progressbarOpposite: !1,
							type: "bullets",
							dynamicBullets: !1,
							dynamicMainBullets: 1,
							formatFractionCurrent: e => e,
							formatFractionTotal: e => e,
							bulletClass: e + "-bullet",
							bulletActiveClass: e + "-bullet-active",
							modifierClass: e + "-",
							currentClass: e + "-current",
							totalClass: e + "-total",
							hiddenClass: e + "-hidden",
							progressbarFillClass: e + "-progressbar-fill",
							progressbarOppositeClass: e + "-progressbar-opposite",
							clickableClass: e + "-clickable",
							lockClass: e + "-lock",
							horizontalClass: e + "-horizontal",
							verticalClass: e + "-vertical",
							paginationDisabledClass: e + "-disabled"
						}
					}),
					(u.pagination = { el: null, bullets: [] });
				let h,
					v = 0;
				function r() {
					return (
						!u.params.pagination.el ||
						!u.pagination.el ||
						(Array.isArray(u.pagination.el) && 0 === u.pagination.el.length)
					);
				}
				function g(e, t) {
					var a = u.params.pagination.bulletActiveClass;
					(e = e && e[`${"prev" === t ? "previous" : "next"}ElementSibling`]) &&
						(e.classList.add(a + "-" + t),
						(e = e[`${"prev" === t ? "previous" : "next"}ElementSibling`])) &&
						e.classList.add(a + `-${t}-` + t);
				}
				function i(e) {
					var t,
						a,
						i = e.target.closest(L(u.params.pagination.bulletClass));
					i &&
						(e.preventDefault(),
						(e = C(i) * u.params.slidesPerGroup),
						u.params.loop
							? u.realIndex !== e &&
								((i = u.realIndex),
								(t = e),
								(a = u.slides.length),
								"next" ===
								(a =
									(t %= a) === (i %= a) + 1
										? "next"
										: t === i - 1
											? "previous"
											: void 0)
									? u.slideNext()
									: "previous" === a
										? u.slidePrev()
										: u.slideToLoop(e))
							: u.slideTo(e));
				}
				function s() {
					var s = u.rtl;
					let n = u.params.pagination;
					if (!r()) {
						var o = P((o = u.pagination.el));
						let r, t;
						var d = (u.virtual && u.params.virtual.enabled ? u.virtual : u).slides
							.length;
						let l = u.params.loop
							? Math.ceil(d / u.params.slidesPerGroup)
							: u.snapGrid.length;
						if (
							(u.params.loop
								? ((t = u.previousRealIndex || 0),
									(r =
										1 < u.params.slidesPerGroup
											? Math.floor(u.realIndex / u.params.slidesPerGroup)
											: u.realIndex))
								: void 0 !== u.snapIndex
									? ((r = u.snapIndex), (t = u.previousSnapIndex))
									: ((t = u.previousIndex || 0), (r = u.activeIndex || 0)),
							"bullets" === n.type &&
								u.pagination.bullets &&
								0 < u.pagination.bullets.length)
						) {
							var p = u.pagination.bullets;
							let a, i, e;
							if (
								(n.dynamicBullets &&
									((h = Y(p[0], u.isHorizontal() ? "width" : "height", !0)),
									o.forEach(e => {
										e.style[u.isHorizontal() ? "width" : "height"] =
											h * (n.dynamicMainBullets + 4) + "px";
									}),
									1 < n.dynamicMainBullets &&
										void 0 !== t &&
										((v += r - (t || 0)) > n.dynamicMainBullets - 1
											? (v = n.dynamicMainBullets - 1)
											: v < 0 && (v = 0)),
									(a = Math.max(r - v, 0)),
									(i = a + (Math.min(p.length, n.dynamicMainBullets) - 1)),
									(e = (i + a) / 2)),
								p.forEach(e => {
									var t = [
										...[
											"",
											"-next",
											"-next-next",
											"-prev",
											"-prev-prev",
											"-main"
										].map(e => "" + n.bulletActiveClass + e)
									]
										.map(e =>
											"string" == typeof e && e.includes(" ")
												? e.split(" ")
												: e
										)
										.flat();
									e.classList.remove(...t);
								}),
								1 < o.length)
							)
								p.forEach(e => {
									var t = C(e);
									t === r
										? e.classList.add(...n.bulletActiveClass.split(" "))
										: u.isElement && e.setAttribute("part", "bullet"),
										n.dynamicBullets &&
											(t >= a &&
												t <= i &&
												e.classList.add(
													...(n.bulletActiveClass + "-main").split(" ")
												),
											t === a && g(e, "prev"),
											t === i) &&
											g(e, "next");
								});
							else {
								d = p[r];
								if (
									(d && d.classList.add(...n.bulletActiveClass.split(" ")),
									u.isElement &&
										p.forEach((e, t) => {
											e.setAttribute(
												"part",
												t === r ? "bullet-active" : "bullet"
											);
										}),
									n.dynamicBullets)
								) {
									var d = p[a],
										c = p[i];
									for (let e = a; e <= i; e += 1)
										p[e] &&
											p[e].classList.add(
												...(n.bulletActiveClass + "-main").split(" ")
											);
									g(d, "prev"), g(c, "next");
								}
							}
							if (n.dynamicBullets) {
								d = Math.min(p.length, n.dynamicMainBullets + 4);
								let t = (h * d - h) / 2 - e * h,
									a = s ? "right" : "left";
								p.forEach(e => {
									e.style[u.isHorizontal() ? a : "top"] = t + "px";
								});
							}
						}
						o.forEach((i, e) => {
							if (
								("fraction" === n.type &&
									(i.querySelectorAll(L(n.currentClass)).forEach(e => {
										e.textContent = n.formatFractionCurrent(r + 1);
									}),
									i.querySelectorAll(L(n.totalClass)).forEach(e => {
										e.textContent = n.formatFractionTotal(l);
									})),
								"progressbar" === n.type)
							) {
								let e;
								e = n.progressbarOpposite
									? u.isHorizontal()
										? "vertical"
										: "horizontal"
									: u.isHorizontal()
										? "horizontal"
										: "vertical";
								var s = (r + 1) / l;
								let t = 1,
									a = 1;
								"horizontal" === e ? (t = s) : (a = s),
									i.querySelectorAll(L(n.progressbarFillClass)).forEach(e => {
										(e.style.transform = `translate3d(0,0,0) scaleX(${t}) scaleY(${a})`),
											(e.style.transitionDuration = u.params.speed + "ms");
									});
							}
							"custom" === n.type && n.renderCustom
								? ((i.innerHTML = n.renderCustom(u, r + 1, l)),
									0 === e && m("paginationRender", i))
								: (0 === e && m("paginationRender", i), m("paginationUpdate", i)),
								u.params.watchOverflow &&
									u.enabled &&
									i.classList[u.isLocked ? "add" : "remove"](n.lockClass);
						});
					}
				}
				function l() {
					let i = u.params.pagination;
					if (!r()) {
						var e =
								u.virtual && u.params.virtual.enabled
									? u.virtual.slides.length
									: u.grid && 1 < u.params.grid.rows
										? u.slides.length / Math.ceil(u.params.grid.rows)
										: u.slides.length,
							t = P((t = u.pagination.el));
						let a = "";
						if ("bullets" === i.type) {
							let t = u.params.loop
								? Math.ceil(e / u.params.slidesPerGroup)
								: u.snapGrid.length;
							u.params.freeMode && u.params.freeMode.enabled && t > e && (t = e);
							for (let e = 0; e < t; e += 1)
								i.renderBullet
									? (a += i.renderBullet.call(u, e, i.bulletClass))
									: (a += `<${i.bulletElement} ${u.isElement ? 'part="bullet"' : ""} class="${i.bulletClass}"></${i.bulletElement}>`);
						}
						"fraction" === i.type &&
							(a = i.renderFraction
								? i.renderFraction.call(u, i.currentClass, i.totalClass)
								: `<span class="${i.currentClass}"></span>` +
									" / " +
									`<span class="${i.totalClass}"></span>`),
							"progressbar" === i.type &&
								(a = i.renderProgressbar
									? i.renderProgressbar.call(u, i.progressbarFillClass)
									: `<span class="${i.progressbarFillClass}"></span>`),
							(u.pagination.bullets = []),
							t.forEach(e => {
								"custom" !== i.type && (e.innerHTML = a || ""),
									"bullets" === i.type &&
										u.pagination.bullets.push(
											...e.querySelectorAll(L(i.bulletClass))
										);
							}),
							"custom" !== i.type && m("paginationRender", t[0]);
					}
				}
				function n() {
					u.params.pagination = se(u, u.originalParams.pagination, u.params.pagination, {
						el: "swiper-pagination"
					});
					let t = u.params.pagination;
					if (t.el) {
						let e;
						(e =
							(e =
								(e =
									"string" == typeof t.el && u.isElement
										? u.el.querySelector(t.el)
										: e) || "string" != typeof t.el
									? e
									: [...document.querySelectorAll(t.el)]) || t.el) &&
							0 !== e.length &&
							(u.params.uniqueNavElements &&
								"string" == typeof t.el &&
								Array.isArray(e) &&
								1 < e.length &&
								1 < (e = [...u.el.querySelectorAll(t.el)]).length &&
								(e = e.find(e => N(e, ".swiper")[0] === u.el)),
							Array.isArray(e) && 1 === e.length && (e = e[0]),
							Object.assign(u.pagination, { el: e }),
							(e = P(e)).forEach(e => {
								"bullets" === t.type &&
									t.clickable &&
									e.classList.add(...(t.clickableClass || "").split(" ")),
									e.classList.add(t.modifierClass + t.type),
									e.classList.add(
										u.isHorizontal() ? t.horizontalClass : t.verticalClass
									),
									"bullets" === t.type &&
										t.dynamicBullets &&
										(e.classList.add(
											"" + t.modifierClass + t.type + "-dynamic"
										),
										(v = 0),
										t.dynamicMainBullets < 1) &&
										(t.dynamicMainBullets = 1),
									"progressbar" === t.type &&
										t.progressbarOpposite &&
										e.classList.add(t.progressbarOppositeClass),
									t.clickable && e.addEventListener("click", i),
									u.enabled || e.classList.add(t.lockClass);
							}));
					}
				}
				function o() {
					let t = u.params.pagination;
					var e;
					r() ||
						((e = u.pagination.el) &&
							(e = P(e)).forEach(e => {
								e.classList.remove(t.hiddenClass),
									e.classList.remove(t.modifierClass + t.type),
									e.classList.remove(
										u.isHorizontal() ? t.horizontalClass : t.verticalClass
									),
									t.clickable &&
										(e.classList.remove(...(t.clickableClass || "").split(" ")),
										e.removeEventListener("click", i));
							}),
						u.pagination.bullets &&
							u.pagination.bullets.forEach(e =>
								e.classList.remove(...t.bulletActiveClass.split(" "))
							));
				}
				a("changeDirection", () => {
					if (u.pagination && u.pagination.el) {
						let t = u.params.pagination;
						var e = u.pagination.el;
						(e = P(e)).forEach(e => {
							e.classList.remove(t.horizontalClass, t.verticalClass),
								e.classList.add(
									u.isHorizontal() ? t.horizontalClass : t.verticalClass
								);
						});
					}
				}),
					a("init", () => {
						(!1 === u.params.pagination.enabled ? d : (n(), l(), s))();
					}),
					a("activeIndexChange", () => {
						void 0 === u.snapIndex && s();
					}),
					a("snapIndexChange", () => {
						s();
					}),
					a("snapGridLengthChange", () => {
						l(), s();
					}),
					a("destroy", () => {
						o();
					}),
					a("enable disable", () => {
						var e = u.pagination.el;
						e &&
							(e = P(e)).forEach(e =>
								e.classList[u.enabled ? "remove" : "add"](
									u.params.pagination.lockClass
								)
							);
					}),
					a("lock unlock", () => {
						s();
					}),
					a("click", (e, t) => {
						var t = t.target,
							a = P(u.pagination.el);
						u.params.pagination.el &&
							u.params.pagination.hideOnClick &&
							a &&
							0 < a.length &&
							!t.classList.contains(u.params.pagination.bulletClass) &&
							((u.navigation &&
								((u.navigation.nextEl && t === u.navigation.nextEl) ||
									(u.navigation.prevEl && t === u.navigation.prevEl))) ||
								(!0 === a[0].classList.contains(u.params.pagination.hiddenClass)
									? m("paginationShow")
									: m("paginationHide"),
								a.forEach(e =>
									e.classList.toggle(u.params.pagination.hiddenClass)
								)));
					});
				let d = () => {
					u.el.classList.add(u.params.pagination.paginationDisabledClass);
					var e = u.pagination.el;
					e &&
						(e = P(e)).forEach(e =>
							e.classList.add(u.params.pagination.paginationDisabledClass)
						),
						o();
				};
				Object.assign(u.pagination, {
					enable: () => {
						u.el.classList.remove(u.params.pagination.paginationDisabledClass);
						var e = u.pagination.el;
						e &&
							(e = P(e)).forEach(e =>
								e.classList.remove(u.params.pagination.paginationDisabledClass)
							),
							n(),
							l(),
							s();
					},
					disable: d,
					render: l,
					update: s,
					init: n,
					destroy: o
				});
			},
			function (e) {
				let { swiper: n, extendParams: t, on: a, emit: r } = e,
					l = k(),
					o = !1,
					d = null,
					p = null,
					c,
					u,
					m,
					i;
				function s() {
					if (n.params.scrollbar.el && n.scrollbar.el) {
						var { scrollbar: s, rtlTranslate: r } = n;
						let { dragEl: e, el: t } = s;
						var s = n.params.scrollbar,
							l = n.params.loop ? n.progressLoop : n.progress;
						let a = u,
							i = (m - u) * l;
						r
							? 0 < (i = -i)
								? ((a = u - i), (i = 0))
								: -i + u > m && (a = m + i)
							: i < 0
								? ((a = u + i), (i = 0))
								: i + u > m && (a = m - i),
							n.isHorizontal()
								? ((e.style.transform = `translate3d(${i}px, 0, 0)`),
									(e.style.width = a + "px"))
								: ((e.style.transform = `translate3d(0px, ${i}px, 0)`),
									(e.style.height = a + "px")),
							s.hide &&
								(clearTimeout(d),
								(t.style.opacity = 1),
								(d = setTimeout(() => {
									(t.style.opacity = 0), (t.style.transitionDuration = "400ms");
								}, 1e3)));
					}
				}
				function h() {
					var e, t, a;
					n.params.scrollbar.el &&
						n.scrollbar.el &&
						((e = n.scrollbar),
						({ dragEl: t, el: a } = e),
						(t.style.width = ""),
						(t.style.height = ""),
						(m = n.isHorizontal() ? a.offsetWidth : a.offsetHeight),
						(i =
							n.size /
							(n.virtualSize +
								n.params.slidesOffsetBefore -
								(n.params.centeredSlides ? n.snapGrid[0] : 0))),
						(u =
							"auto" === n.params.scrollbar.dragSize
								? m * i
								: parseInt(n.params.scrollbar.dragSize, 10)),
						n.isHorizontal() ? (t.style.width = u + "px") : (t.style.height = u + "px"),
						1 <= i ? (a.style.display = "none") : (a.style.display = ""),
						n.params.scrollbar.hide && (a.style.opacity = 0),
						n.params.watchOverflow) &&
						n.enabled &&
						e.el.classList[n.isLocked ? "add" : "remove"](n.params.scrollbar.lockClass);
				}
				function v(e) {
					return n.isHorizontal() ? e.clientX : e.clientY;
				}
				function g(e) {
					var { scrollbar: t, rtlTranslate: a } = n,
						t = t.el;
					let i;
					(i =
						(v(e) -
							H(t)[n.isHorizontal() ? "left" : "top"] -
							(null !== c ? c : u / 2)) /
						(m - u)),
						(i = Math.max(Math.min(i, 1), 0)),
						a && (i = 1 - i);
					e = n.minTranslate() + (n.maxTranslate() - n.minTranslate()) * i;
					n.updateProgress(e),
						n.setTranslate(e),
						n.updateActiveIndex(),
						n.updateSlidesClasses();
				}
				function f(e) {
					var t = n.params.scrollbar,
						{ scrollbar: a, wrapperEl: i } = n,
						{ el: a, dragEl: s } = a;
					(o = !0),
						(c =
							e.target === s
								? v(e) -
									e.target.getBoundingClientRect()[
										n.isHorizontal() ? "left" : "top"
									]
								: null),
						e.preventDefault(),
						e.stopPropagation(),
						(i.style.transitionDuration = "100ms"),
						(s.style.transitionDuration = "100ms"),
						g(e),
						clearTimeout(p),
						(a.style.transitionDuration = "0ms"),
						t.hide && (a.style.opacity = 1),
						n.params.cssMode && (n.wrapperEl.style["scroll-snap-type"] = "none"),
						r("scrollbarDragStart", e);
				}
				function w(e) {
					var { scrollbar: t, wrapperEl: a } = n,
						{ el: t, dragEl: i } = t;
					o &&
						(e.preventDefault && e.cancelable
							? e.preventDefault()
							: (e.returnValue = !1),
						g(e),
						(a.style.transitionDuration = "0ms"),
						(t.style.transitionDuration = "0ms"),
						(i.style.transitionDuration = "0ms"),
						r("scrollbarDragMove", e));
				}
				function b(e) {
					var t = n.params.scrollbar,
						{ scrollbar: a, wrapperEl: i } = n;
					let s = a.el;
					o &&
						((o = !1),
						n.params.cssMode &&
							((n.wrapperEl.style["scroll-snap-type"] = ""),
							(i.style.transitionDuration = "")),
						t.hide &&
							(clearTimeout(p),
							(p = M(() => {
								(s.style.opacity = 0), (s.style.transitionDuration = "400ms");
							}, 1e3))),
						r("scrollbarDragEnd", e),
						t.snapOnRelease) &&
						n.slideToClosest();
				}
				function y(e) {
					var t,
						{ scrollbar: a, params: i } = n,
						a = a.el;
					a &&
						((t = !!i.passiveListeners && { passive: !1, capture: !1 }),
						(i = !!i.passiveListeners && { passive: !0, capture: !1 }),
						(a = a)) &&
						(a[(a = "on" === e ? "addEventListener" : "removeEventListener")](
							"pointerdown",
							f,
							t
						),
						l[a]("pointermove", w, t),
						l[a]("pointerup", b, i));
				}
				function x() {
					var { scrollbar: a, el: i } = n,
						s =
							((n.params.scrollbar = se(
								n,
								n.originalParams.scrollbar,
								n.params.scrollbar,
								{ el: "swiper-scrollbar" }
							)),
							n.params.scrollbar);
					if (s.el) {
						let e;
						if (
							(e =
								"string" == typeof s.el && n.isElement
									? n.el.querySelector(s.el)
									: e) ||
							"string" != typeof s.el
						)
							e = e || s.el;
						else if (!(e = l.querySelectorAll(s.el)).length) return;
						(e =
							0 <
							(e =
								n.params.uniqueNavElements &&
								"string" == typeof s.el &&
								1 < e.length &&
								1 === i.querySelectorAll(s.el).length
									? i.querySelector(s.el)
									: e).length
								? e[0]
								: e).classList.add(
							n.isHorizontal() ? s.horizontalClass : s.verticalClass
						);
						let t;
						!e ||
							(t = e.querySelector(L(n.params.scrollbar.dragClass))) ||
							((t = A("div", n.params.scrollbar.dragClass)), e.append(t)),
							Object.assign(a, { el: e, dragEl: t }),
							s.draggable && n.params.scrollbar.el && n.scrollbar.el && y("on"),
							e &&
								e.classList[n.enabled ? "remove" : "add"](
									...T(n.params.scrollbar.lockClass)
								);
					}
				}
				function E() {
					var e = n.params.scrollbar,
						t = n.scrollbar.el;
					t &&
						t.classList.remove(
							...T(n.isHorizontal() ? e.horizontalClass : e.verticalClass)
						),
						n.params.scrollbar.el && n.scrollbar.el && y("off");
				}
				t({
					scrollbar: {
						el: null,
						dragSize: "auto",
						hide: !1,
						draggable: !1,
						snapOnRelease: !0,
						lockClass: "swiper-scrollbar-lock",
						dragClass: "swiper-scrollbar-drag",
						scrollbarDisabledClass: "swiper-scrollbar-disabled",
						horizontalClass: "swiper-scrollbar-horizontal",
						verticalClass: "swiper-scrollbar-vertical"
					}
				}),
					(n.scrollbar = { el: null, dragEl: null }),
					a("changeDirection", () => {
						if (n.scrollbar && n.scrollbar.el) {
							let t = n.params.scrollbar;
							var e = n.scrollbar.el;
							(e = P(e)).forEach(e => {
								e.classList.remove(t.horizontalClass, t.verticalClass),
									e.classList.add(
										n.isHorizontal() ? t.horizontalClass : t.verticalClass
									);
							});
						}
					}),
					a("init", () => {
						(!1 === n.params.scrollbar.enabled ? S : (x(), h(), s))();
					}),
					a("update resize observerUpdate lock unlock changeDirection", () => {
						h();
					}),
					a("setTranslate", () => {
						s();
					}),
					a("setTransition", (e, t) => {
						(t = t),
							n.params.scrollbar.el &&
								n.scrollbar.el &&
								(n.scrollbar.dragEl.style.transitionDuration = t + "ms");
					}),
					a("enable disable", () => {
						var e = n.scrollbar.el;
						e &&
							e.classList[n.enabled ? "remove" : "add"](
								...T(n.params.scrollbar.lockClass)
							);
					}),
					a("destroy", () => {
						E();
					});
				let S = () => {
					n.el.classList.add(...T(n.params.scrollbar.scrollbarDisabledClass)),
						n.scrollbar.el &&
							n.scrollbar.el.classList.add(
								...T(n.params.scrollbar.scrollbarDisabledClass)
							),
						E();
				};
				Object.assign(n.scrollbar, {
					enable: () => {
						n.el.classList.remove(...T(n.params.scrollbar.scrollbarDisabledClass)),
							n.scrollbar.el &&
								n.scrollbar.el.classList.remove(
									...T(n.params.scrollbar.scrollbarDisabledClass)
								),
							x(),
							h(),
							s();
					},
					disable: S,
					updateSize: h,
					setTranslate: s,
					init: x,
					destroy: E
				});
			},
			function (e) {
				let { swiper: p, extendParams: t, on: a } = e,
					r =
						(t({ parallax: { enabled: !1 } }),
						"[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]"),
					l = (e, t) => {
						var a = p.rtl,
							a = a ? -1 : 1,
							i = e.getAttribute("data-swiper-parallax") || "0";
						let s = e.getAttribute("data-swiper-parallax-x"),
							r = e.getAttribute("data-swiper-parallax-y");
						var l = e.getAttribute("data-swiper-parallax-scale"),
							n = e.getAttribute("data-swiper-parallax-opacity"),
							o = e.getAttribute("data-swiper-parallax-rotate");
						s || r
							? ((s = s || "0"), (r = r || "0"))
							: p.isHorizontal()
								? ((s = i), (r = "0"))
								: ((r = i), (s = "0")),
							(s =
								0 <= s.indexOf("%")
									? parseInt(s, 10) * t * a + "%"
									: s * t * a + "px"),
							(r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t + "%" : r * t + "px"),
							null != n &&
								((i = n - (n - 1) * (1 - Math.abs(t))), (e.style.opacity = i));
						let d = `translate3d(${s}, ${r}, 0px)`;
						null != l && ((a = l - (l - 1) * (1 - Math.abs(t))), (d += ` scale(${a})`)),
							o && null != o && (d += ` rotate(${o * t * -1}deg)`),
							(e.style.transform = d);
					},
					i = () => {
						let { el: e, slides: t, progress: i, snapGrid: s } = p;
						var a = R(e, r);
						p.isElement && a.push(...R(p.hostEl, r)),
							a.forEach(e => {
								l(e, i);
							}),
							t.forEach((e, t) => {
								let a = e.progress;
								1 < p.params.slidesPerGroup &&
									"auto" !== p.params.slidesPerView &&
									(a += Math.ceil(t / 2) - i * (s.length - 1)),
									(a = Math.min(Math.max(a, -1), 1)),
									e
										.querySelectorAll(r + ", [data-swiper-parallax-rotate]")
										.forEach(e => {
											l(e, a);
										});
							});
					};
				a("beforeInit", () => {
					p.params.parallax.enabled &&
						((p.params.watchSlidesProgress = !0),
						(p.originalParams.watchSlidesProgress = !0));
				}),
					a("init", () => {
						p.params.parallax.enabled && i();
					}),
					a("setTranslate", () => {
						p.params.parallax.enabled && i();
					}),
					a("setTransition", (e, t) => {
						var a, i;
						p.params.parallax.enabled &&
							(({ el: t, hostEl: i } =
								(void 0 === (a = t) && (a = p.params.speed), p)),
							(t = [...t.querySelectorAll(r)]),
							p.isElement && t.push(...i.querySelectorAll(r)),
							t.forEach(e => {
								let t =
									parseInt(e.getAttribute("data-swiper-parallax-duration"), 10) ||
									a;
								0 === a && (t = 0), (e.style.transitionDuration = t + "ms");
							}));
					});
			},
			function (e) {
				let { swiper: u, extendParams: t, on: a, emit: i } = e,
					m = G(),
					h =
						(t({
							zoom: {
								enabled: !1,
								limitToOriginalSize: !1,
								maxRatio: 3,
								minRatio: 1,
								panOnMouseMove: !1,
								toggle: !0,
								containerClass: "swiper-zoom-container",
								zoomedSlideClass: "swiper-slide-zoomed"
							}
						}),
						(u.zoom = { enabled: !1 }),
						1),
					r = !1,
					o = !1,
					d = { x: 0, y: 0 },
					p = -3,
					s,
					l,
					n = [],
					v = {
						originX: 0,
						originY: 0,
						slideEl: void 0,
						slideWidth: void 0,
						slideHeight: void 0,
						imageEl: void 0,
						imageWrapEl: void 0,
						maxRatio: 3
					},
					g = {
						isTouched: void 0,
						isMoved: void 0,
						currentX: void 0,
						currentY: void 0,
						minX: void 0,
						minY: void 0,
						maxX: void 0,
						maxY: void 0,
						width: void 0,
						height: void 0,
						startX: void 0,
						startY: void 0,
						touchesStart: {},
						touchesCurrent: {}
					},
					c = {
						x: void 0,
						y: void 0,
						prevPositionX: void 0,
						prevPositionY: void 0,
						prevTime: void 0
					},
					f = 1;
				function w() {
					var e, t, a, i;
					return n.length < 2
						? 1
						: ((e = n[0].pageX),
							(t = n[0].pageY),
							(a = n[1].pageX),
							(i = n[1].pageY),
							Math.sqrt((a - e) ** 2 + (i - t) ** 2));
				}
				function b() {
					var e = u.params.zoom,
						t = v.imageWrapEl.getAttribute("data-swiper-zoom") || e.maxRatio;
					return e.limitToOriginalSize && v.imageEl && v.imageEl.naturalWidth
						? ((e = v.imageEl.naturalWidth / v.imageEl.offsetWidth), Math.min(e, t))
						: t;
				}
				function y(t) {
					var e = u.isElement ? "swiper-slide" : "." + u.params.slideClass;
					return (
						t.target.matches(e) || 0 < u.slides.filter(e => e.contains(t.target)).length
					);
				}
				function x(t) {
					var e = "." + u.params.zoom.containerClass;
					return (
						t.target.matches(e) ||
						0 <
							[...u.hostEl.querySelectorAll(e)].filter(e => e.contains(t.target))
								.length
					);
				}
				function E(t) {
					if (("mouse" === t.pointerType && n.splice(0, n.length), y(t))) {
						var a = u.params.zoom;
						if (((s = !1), (l = !1), n.push(t), !(n.length < 2))) {
							if (((s = !0), (v.scaleStart = w()), !v.slideEl)) {
								(v.slideEl = t.target.closest(
									`.${u.params.slideClass}, swiper-slide`
								)),
									v.slideEl || (v.slideEl = u.slides[u.activeIndex]);
								let e = v.slideEl.querySelector("." + a.containerClass);
								if (
									((e =
										e &&
										e.querySelectorAll(
											"picture, img, svg, canvas, .swiper-zoom-target"
										)[0]),
									(v.imageEl = e)
										? (v.imageWrapEl = N(v.imageEl, "." + a.containerClass)[0])
										: (v.imageWrapEl = void 0),
									!v.imageWrapEl)
								)
									return void (v.imageEl = void 0);
								v.maxRatio = b();
							}
							v.imageEl &&
								(([a, t] =
									n.length < 2
										? { x: null, y: null }
										: ((t = v.imageEl.getBoundingClientRect()),
											[
												(n[0].pageX +
													(n[1].pageX - n[0].pageX) / 2 -
													t.x -
													m.scrollX) /
													h,
												(n[0].pageY +
													(n[1].pageY - n[0].pageY) / 2 -
													t.y -
													m.scrollY) /
													h
											])),
								(v.originX = a),
								(v.originY = t),
								(v.imageEl.style.transitionDuration = "0ms")),
								(r = !0);
						}
					}
				}
				function S(t) {
					var e, a, i;
					y(t) &&
						((e = u.params.zoom),
						(a = u.zoom),
						0 <= (i = n.findIndex(e => e.pointerId === t.pointerId)) && (n[i] = t),
						n.length < 2 ||
							((l = !0),
							(v.scaleMove = w()),
							v.imageEl &&
								((a.scale = (v.scaleMove / v.scaleStart) * h),
								a.scale > v.maxRatio &&
									(a.scale = v.maxRatio - 1 + (a.scale - v.maxRatio + 1) ** 0.5),
								a.scale < e.minRatio &&
									(a.scale = e.minRatio + 1 - (e.minRatio - a.scale + 1) ** 0.5),
								(v.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`))));
				}
				function T(t) {
					var e, a, i;
					!y(t) ||
						("mouse" === t.pointerType && "pointerout" === t.type) ||
						((e = u.params.zoom),
						(a = u.zoom),
						0 <= (i = n.findIndex(e => e.pointerId === t.pointerId)) && n.splice(i, 1),
						s &&
							l &&
							((s = !1), (l = !1), v.imageEl) &&
							((a.scale = Math.max(Math.min(a.scale, v.maxRatio), e.minRatio)),
							(v.imageEl.style.transitionDuration = u.params.speed + "ms"),
							(v.imageEl.style.transform = `translate3d(0,0,0) scale(${a.scale})`),
							(h = a.scale),
							(r = !1),
							1 < a.scale && v.slideEl
								? v.slideEl.classList.add("" + e.zoomedSlideClass)
								: a.scale <= 1 &&
									v.slideEl &&
									v.slideEl.classList.remove("" + e.zoomedSlideClass),
							1 === a.scale) &&
							((v.originX = 0), (v.originY = 0), (v.slideEl = void 0)));
				}
				Object.defineProperty(u.zoom, "scale", {
					get() {
						return f;
					},
					set(e) {
						var t, a;
						f !== e && ((t = v.imageEl), (a = v.slideEl), i("zoomChange", e, t, a)),
							(f = e);
					}
				});
				let M;
				function C() {
					u.touchEventsData.preventTouchMoveFromPointerMove = !1;
				}
				function P(e) {
					var t = "mouse" === e.pointerType && u.params.zoom.panOnMouseMove;
					if (y(e) && x(e)) {
						var a = u.zoom;
						if (v.imageEl)
							if (g.isTouched && v.slideEl)
								if (t) z(e);
								else {
									g.isMoved ||
										((g.width = v.imageEl.offsetWidth || v.imageEl.clientWidth),
										(g.height =
											v.imageEl.offsetHeight || v.imageEl.clientHeight),
										(g.startX = B(v.imageWrapEl, "x") || 0),
										(g.startY = B(v.imageWrapEl, "y") || 0),
										(v.slideWidth = v.slideEl.offsetWidth),
										(v.slideHeight = v.slideEl.offsetHeight),
										(v.imageWrapEl.style.transitionDuration = "0ms"));
									var i = g.width * a.scale,
										s = g.height * a.scale,
										i =
											((g.minX = Math.min(v.slideWidth / 2 - i / 2, 0)),
											(g.maxX = -g.minX),
											(g.minY = Math.min(v.slideHeight / 2 - s / 2, 0)),
											(g.maxY = -g.minY),
											(g.touchesCurrent.x = (0 < n.length ? n[0] : e).pageX),
											(g.touchesCurrent.y = (0 < n.length ? n[0] : e).pageY),
											Math.max(
												Math.abs(g.touchesCurrent.x - g.touchesStart.x),
												Math.abs(g.touchesCurrent.y - g.touchesStart.y)
											));
									if ((5 < i && (u.allowClick = !1), !g.isMoved && !r)) {
										if (
											u.isHorizontal() &&
											((Math.floor(g.minX) === Math.floor(g.startX) &&
												g.touchesCurrent.x < g.touchesStart.x) ||
												(Math.floor(g.maxX) === Math.floor(g.startX) &&
													g.touchesCurrent.x > g.touchesStart.x))
										)
											return (g.isTouched = !1), void C();
										if (
											!u.isHorizontal() &&
											((Math.floor(g.minY) === Math.floor(g.startY) &&
												g.touchesCurrent.y < g.touchesStart.y) ||
												(Math.floor(g.maxY) === Math.floor(g.startY) &&
													g.touchesCurrent.y > g.touchesStart.y))
										)
											return (g.isTouched = !1), void C();
									}
									e.cancelable && e.preventDefault(),
										e.stopPropagation(),
										clearTimeout(M),
										(u.touchEventsData.preventTouchMoveFromPointerMove = !0),
										(M = setTimeout(() => {
											u.destroyed || C();
										})),
										(g.isMoved = !0);
									var s = (a.scale - h) / (v.maxRatio - u.params.zoom.minRatio),
										{ originX: i, originY: a } = v;
									(g.currentX =
										g.touchesCurrent.x -
										g.touchesStart.x +
										g.startX +
										s * (g.width - 2 * i)),
										(g.currentY =
											g.touchesCurrent.y -
											g.touchesStart.y +
											g.startY +
											s * (g.height - 2 * a)),
										g.currentX < g.minX &&
											(g.currentX =
												g.minX + 1 - (g.minX - g.currentX + 1) ** 0.8),
										g.currentX > g.maxX &&
											(g.currentX =
												g.maxX - 1 + (g.currentX - g.maxX + 1) ** 0.8),
										g.currentY < g.minY &&
											(g.currentY =
												g.minY + 1 - (g.minY - g.currentY + 1) ** 0.8),
										g.currentY > g.maxY &&
											(g.currentY =
												g.maxY - 1 + (g.currentY - g.maxY + 1) ** 0.8),
										c.prevPositionX || (c.prevPositionX = g.touchesCurrent.x),
										c.prevPositionY || (c.prevPositionY = g.touchesCurrent.y),
										c.prevTime || (c.prevTime = Date.now()),
										(c.x =
											(g.touchesCurrent.x - c.prevPositionX) /
											(Date.now() - c.prevTime) /
											2),
										(c.y =
											(g.touchesCurrent.y - c.prevPositionY) /
											(Date.now() - c.prevTime) /
											2),
										Math.abs(g.touchesCurrent.x - c.prevPositionX) < 2 &&
											(c.x = 0),
										Math.abs(g.touchesCurrent.y - c.prevPositionY) < 2 &&
											(c.y = 0),
										(c.prevPositionX = g.touchesCurrent.x),
										(c.prevPositionY = g.touchesCurrent.y),
										(c.prevTime = Date.now()),
										(v.imageWrapEl.style.transform = `translate3d(${g.currentX}px, ${g.currentY}px,0)`);
								}
							else t && z(e);
					}
				}
				function L() {
					var e = u.zoom;
					v.slideEl &&
						u.activeIndex !== u.slides.indexOf(v.slideEl) &&
						(v.imageEl && (v.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
						v.imageWrapEl && (v.imageWrapEl.style.transform = "translate3d(0,0,0)"),
						v.slideEl.classList.remove("" + u.params.zoom.zoomedSlideClass),
						(e.scale = 1),
						(h = 1),
						(v.slideEl = void 0),
						(v.imageEl = void 0),
						(v.imageWrapEl = void 0),
						(v.originX = 0),
						(v.originY = 0));
				}
				function z(e) {
					var t, a, i, s, r, l, n;
					h <= 1 ||
						!v.imageWrapEl ||
						(y(e) &&
							x(e) &&
							((t = m.getComputedStyle(v.imageWrapEl).transform),
							(t = new m.DOMMatrix(t)),
							o
								? ((l = (e.clientX - d.x) * p),
									(a = (e.clientY - d.y) * p),
									(n = g.width * h),
									(r = g.height * h),
									(i = v.slideWidth),
									(s = v.slideHeight),
									(n = -(i = Math.min(i / 2 - n / 2, 0))),
									(r = -(s = Math.min(s / 2 - r / 2, 0))),
									(l = Math.max(Math.min(g.startX + l, n), i)),
									(n = Math.max(Math.min(g.startY + a, r), s)),
									(v.imageWrapEl.style.transitionDuration = "0ms"),
									(v.imageWrapEl.style.transform = `translate3d(${l}px, ${n}px, 0)`),
									(d.x = e.clientX),
									(d.y = e.clientY),
									(g.startX = l),
									(g.startY = n))
								: ((o = !0),
									(d.x = e.clientX),
									(d.y = e.clientY),
									(g.startX = t.e),
									(g.startY = t.f),
									(g.width = v.imageEl.offsetWidth || v.imageEl.clientWidth),
									(g.height = v.imageEl.offsetHeight || v.imageEl.clientHeight),
									(v.slideWidth = v.slideEl.offsetWidth),
									(v.slideHeight = v.slideEl.offsetHeight))));
				}
				function k(s) {
					var r,
						l,
						n,
						o,
						d = u.zoom,
						p = u.params.zoom;
					if (!v.slideEl) {
						s &&
							s.target &&
							(v.slideEl = s.target.closest(`.${u.params.slideClass}, swiper-slide`)),
							v.slideEl ||
								(u.params.virtual && u.params.virtual.enabled && u.virtual
									? (v.slideEl = R(
											u.slidesEl,
											"." + u.params.slideActiveClass
										)[0])
									: (v.slideEl = u.slides[u.activeIndex]));
						let e = v.slideEl.querySelector("." + p.containerClass);
						(e =
							e &&
							e.querySelectorAll(
								"picture, img, svg, canvas, .swiper-zoom-target"
							)[0]),
							(v.imageEl = e)
								? (v.imageWrapEl = N(v.imageEl, "." + p.containerClass)[0])
								: (v.imageWrapEl = void 0);
					}
					if (v.imageEl && v.imageWrapEl) {
						u.params.cssMode &&
							((u.wrapperEl.style.overflow = "hidden"),
							(u.wrapperEl.style.touchAction = "none")),
							v.slideEl.classList.add("" + p.zoomedSlideClass);
						let e, t;
						let a, i;
						t =
							void 0 === g.touchesStart.x && s
								? ((e = s.pageX), s.pageY)
								: ((e = g.touchesStart.x), g.touchesStart.y);
						var p = "number" == typeof s ? s : null,
							c =
								(1 === h &&
									p &&
									((e = void 0),
									(t = void 0),
									(g.touchesStart.x = void 0),
									(g.touchesStart.y = void 0)),
								b());
						(d.scale = p || c),
							(h = p || c),
							!s || (1 === h && p)
								? ((a = 0), (i = 0))
								: ((c = v.slideEl.offsetWidth),
									(s = v.slideEl.offsetHeight),
									(r = H(v.slideEl).left + m.scrollX),
									(l = H(v.slideEl).top + m.scrollY),
									(r = r + c / 2 - e),
									(l = l + s / 2 - t),
									(n = v.imageEl.offsetWidth || v.imageEl.clientWidth),
									(o = v.imageEl.offsetHeight || v.imageEl.clientHeight),
									(n = n * d.scale),
									(o = o * d.scale),
									(n = -(c = Math.min(c / 2 - n / 2, 0))),
									(o = -(s = Math.min(s / 2 - o / 2, 0))),
									(a = r * d.scale),
									(i = l * d.scale),
									(a = a < c ? c : a) > n && (a = n),
									(i = i < s ? s : i) > o && (i = o)),
							p && 1 === d.scale && ((v.originX = 0), (v.originY = 0)),
							(v.imageWrapEl.style.transitionDuration = "300ms"),
							(v.imageWrapEl.style.transform = `translate3d(${a}px, ${i}px,0)`),
							(v.imageEl.style.transitionDuration = "300ms"),
							(v.imageEl.style.transform = `translate3d(0,0,0) scale(${d.scale})`);
					}
				}
				function A() {
					var e = u.zoom,
						t = u.params.zoom;
					if (!v.slideEl) {
						u.params.virtual && u.params.virtual.enabled && u.virtual
							? (v.slideEl = R(u.slidesEl, "." + u.params.slideActiveClass)[0])
							: (v.slideEl = u.slides[u.activeIndex]);
						let e = v.slideEl.querySelector("." + t.containerClass);
						(e =
							e &&
							e.querySelectorAll(
								"picture, img, svg, canvas, .swiper-zoom-target"
							)[0]),
							(v.imageEl = e)
								? (v.imageWrapEl = N(v.imageEl, "." + t.containerClass)[0])
								: (v.imageWrapEl = void 0);
					}
					v.imageEl &&
						v.imageWrapEl &&
						(u.params.cssMode &&
							((u.wrapperEl.style.overflow = ""),
							(u.wrapperEl.style.touchAction = "")),
						(e.scale = 1),
						(h = 1),
						(g.touchesStart.x = void 0),
						(g.touchesStart.y = void 0),
						(v.imageWrapEl.style.transitionDuration = "300ms"),
						(v.imageWrapEl.style.transform = "translate3d(0,0,0)"),
						(v.imageEl.style.transitionDuration = "300ms"),
						(v.imageEl.style.transform = "translate3d(0,0,0) scale(1)"),
						v.slideEl.classList.remove("" + t.zoomedSlideClass),
						(v.slideEl = void 0),
						(v.originX = 0),
						(v.originY = 0),
						u.params.zoom.panOnMouseMove) &&
						((d = { x: 0, y: 0 }), o) &&
						((o = !1), (g.startX = 0), (g.startY = 0));
				}
				function I(e) {
					var t = u.zoom;
					t.scale && 1 !== t.scale ? A() : k(e);
				}
				function O() {
					return {
						passiveListener: !!u.params.passiveListeners && {
							passive: !0,
							capture: !1
						},
						activeListenerWithCapture: !u.params.passiveListeners || {
							passive: !1,
							capture: !0
						}
					};
				}
				function D() {
					var a = u.zoom;
					if (!a.enabled) {
						a.enabled = !0;
						let { passiveListener: t, activeListenerWithCapture: e } = O();
						u.wrapperEl.addEventListener("pointerdown", E, t),
							u.wrapperEl.addEventListener("pointermove", S, e),
							["pointerup", "pointercancel", "pointerout"].forEach(e => {
								u.wrapperEl.addEventListener(e, T, t);
							}),
							u.wrapperEl.addEventListener("pointermove", P, e);
					}
				}
				function _() {
					var a = u.zoom;
					if (a.enabled) {
						a.enabled = !1;
						let { passiveListener: t, activeListenerWithCapture: e } = O();
						u.wrapperEl.removeEventListener("pointerdown", E, t),
							u.wrapperEl.removeEventListener("pointermove", S, e),
							["pointerup", "pointercancel", "pointerout"].forEach(e => {
								u.wrapperEl.removeEventListener(e, T, t);
							}),
							u.wrapperEl.removeEventListener("pointermove", P, e);
					}
				}
				a("init", () => {
					u.params.zoom.enabled && D();
				}),
					a("destroy", () => {
						_();
					}),
					a("touchStart", (e, t) => {
						var a;
						u.zoom.enabled &&
							((t = t), (a = u.device), v.imageEl) &&
							!g.isTouched &&
							(a.android && t.cancelable && t.preventDefault(),
							(g.isTouched = !0),
							(a = 0 < n.length ? n[0] : t),
							(g.touchesStart.x = a.pageX),
							(g.touchesStart.y = a.pageY));
					}),
					a("touchEnd", (e, t) => {
						if (u.zoom.enabled) {
							var a = u.zoom;
							if (((n.length = 0), v.imageEl))
								if (g.isTouched && g.isMoved) {
									(g.isTouched = !1), (g.isMoved = !1);
									let e = 300,
										t = 300;
									var i = c.x * e,
										i = g.currentX + i,
										s = c.y * t,
										s = g.currentY + s,
										r =
											(0 !== c.x && (e = Math.abs((i - g.currentX) / c.x)),
											0 !== c.y && (t = Math.abs((s - g.currentY) / c.y)),
											Math.max(e, t)),
										i = ((g.currentX = i), (g.currentY = s), g.width * a.scale),
										s = g.height * a.scale;
									(g.minX = Math.min(v.slideWidth / 2 - i / 2, 0)),
										(g.maxX = -g.minX),
										(g.minY = Math.min(v.slideHeight / 2 - s / 2, 0)),
										(g.maxY = -g.minY),
										(g.currentX = Math.max(
											Math.min(g.currentX, g.maxX),
											g.minX
										)),
										(g.currentY = Math.max(
											Math.min(g.currentY, g.maxY),
											g.minY
										)),
										(v.imageWrapEl.style.transitionDuration = r + "ms"),
										(v.imageWrapEl.style.transform = `translate3d(${g.currentX}px, ${g.currentY}px,0)`);
								} else (g.isTouched = !1), (g.isMoved = !1);
						}
					}),
					a("doubleTap", (e, t) => {
						!u.animating &&
							u.params.zoom.enabled &&
							u.zoom.enabled &&
							u.params.zoom.toggle &&
							I(t);
					}),
					a("transitionEnd", () => {
						u.zoom.enabled && u.params.zoom.enabled && L();
					}),
					a("slideChange", () => {
						u.zoom.enabled && u.params.zoom.enabled && u.params.cssMode && L();
					}),
					Object.assign(u.zoom, { enable: D, disable: _, in: k, out: A, toggle: I });
			},
			function (e) {
				let { swiper: n, extendParams: t, on: a } = e;
				function o(e, t) {
					let a = (() => {
						let a, i, s;
						return (e, t) => {
							for (i = -1, a = e.length; 1 < a - i; )
								e[(s = (a + i) >> 1)] <= t ? (i = s) : (a = s);
							return a;
						};
					})();
					(this.x = e), (this.y = t), (this.lastIndex = e.length - 1);
					let i, s;
					return (
						(this.interpolate = function (e) {
							return e
								? ((s = a(this.x, e)),
									(i = s - 1),
									((e - this.x[i]) * (this.y[s] - this.y[i])) /
										(this.x[s] - this.x[i]) +
										this.y[i])
								: 0;
						}),
						this
					);
				}
				function i() {
					n.controller.control &&
						n.controller.spline &&
						((n.controller.spline = void 0), delete n.controller.spline);
				}
				t({ controller: { control: void 0, inverse: !1, by: "slide" } }),
					(n.controller = { control: void 0 }),
					a("beforeInit", () => {
						"undefined" != typeof window &&
						("string" == typeof n.params.controller.control ||
							n.params.controller.control instanceof HTMLElement)
							? ("string" == typeof n.params.controller.control
									? [...document.querySelectorAll(n.params.controller.control)]
									: [n.params.controller.control]
								).forEach(i => {
									if (
										(n.controller.control || (n.controller.control = []),
										i && i.swiper)
									)
										n.controller.control.push(i.swiper);
									else if (i) {
										let t = n.params.eventsPrefix + "init",
											a = e => {
												n.controller.control.push(e.detail[0]),
													n.update(),
													i.removeEventListener(t, a);
											};
										i.addEventListener(t, a);
									}
								})
							: (n.controller.control = n.params.controller.control);
					}),
					a("update", () => {
						i();
					}),
					a("resize", () => {
						i();
					}),
					a("observerUpdate", () => {
						i();
					}),
					a("setTranslate", (e, t, a) => {
						n.controller.control &&
							!n.controller.control.destroyed &&
							n.controller.setTranslate(t, a);
					}),
					a("setTransition", (e, t, a) => {
						n.controller.control &&
							!n.controller.control.destroyed &&
							n.controller.setTransition(t, a);
					}),
					Object.assign(n.controller, {
						setTranslate: function (e, t) {
							var a = n.controller.control;
							let i, s;
							var r = n.constructor;
							function l(e) {
								var t, a;
								e.destroyed ||
									((t = n.rtlTranslate ? -n.translate : n.translate),
									"slide" === n.params.controller.by &&
										((a = e),
										(n.controller.spline = n.params.loop
											? new o(n.slidesGrid, a.slidesGrid)
											: new o(n.snapGrid, a.snapGrid)),
										(s = -n.controller.spline.interpolate(-t))),
									(s && "container" !== n.params.controller.by) ||
										((i =
											(e.maxTranslate() - e.minTranslate()) /
											(n.maxTranslate() - n.minTranslate())),
										(!Number.isNaN(i) && Number.isFinite(i)) || (i = 1),
										(s = (t - n.minTranslate()) * i + e.minTranslate())),
									n.params.controller.inverse && (s = e.maxTranslate() - s),
									e.updateProgress(s),
									e.setTranslate(s, n),
									e.updateActiveIndex(),
									e.updateSlidesClasses());
							}
							if (Array.isArray(a))
								for (let e = 0; e < a.length; e += 1)
									a[e] !== t && a[e] instanceof r && l(a[e]);
							else a instanceof r && t !== a && l(a);
						},
						setTransition: function (t, e) {
							var a = n.constructor;
							let i = n.controller.control,
								s;
							function r(e) {
								e.destroyed ||
									(e.setTransition(t, n),
									0 !== t &&
										(e.transitionStart(),
										e.params.autoHeight &&
											M(() => {
												e.updateAutoHeight();
											}),
										g(e.wrapperEl, () => {
											i && e.transitionEnd();
										})));
							}
							if (Array.isArray(i))
								for (s = 0; s < i.length; s += 1)
									i[s] !== e && i[s] instanceof a && r(i[s]);
							else i instanceof a && e !== i && r(i);
						}
					});
			},
			function (e) {
				let { swiper: n, extendParams: t, on: a } = e,
					o =
						(t({
							a11y: {
								enabled: !0,
								notificationClass: "swiper-notification",
								prevSlideMessage: "Previous slide",
								nextSlideMessage: "Next slide",
								firstSlideMessage: "This is the first slide",
								lastSlideMessage: "This is the last slide",
								paginationBulletMessage: "Go to slide {{index}}",
								slideLabelMessage: "{{index}} / {{slidesLength}}",
								containerMessage: null,
								containerRoleDescriptionMessage: null,
								containerRole: null,
								itemRoleDescriptionMessage: null,
								slideRole: "group",
								id: null,
								scrollOnFocus: !0
							}
						}),
						(n.a11y = { clicked: !1 }),
						null),
					s,
					r,
					l = new Date().getTime();
				function i(e) {
					var t = o;
					0 !== t.length && ((t.innerHTML = ""), (t.innerHTML = e));
				}
				function d(e) {
					(e = P(e)).forEach(e => {
						e.setAttribute("tabIndex", "0");
					});
				}
				function p(e) {
					(e = P(e)).forEach(e => {
						e.setAttribute("tabIndex", "-1");
					});
				}
				function c(e, t) {
					(e = P(e)).forEach(e => {
						e.setAttribute("role", t);
					});
				}
				function u(e, t) {
					(e = P(e)).forEach(e => {
						e.setAttribute("aria-roledescription", t);
					});
				}
				function m(e, t) {
					(e = P(e)).forEach(e => {
						e.setAttribute("aria-label", t);
					});
				}
				function h(e) {
					(e = P(e)).forEach(e => {
						e.setAttribute("aria-disabled", !0);
					});
				}
				function v(e) {
					(e = P(e)).forEach(e => {
						e.setAttribute("aria-disabled", !1);
					});
				}
				function g(e) {
					var t, a;
					(13 !== e.keyCode && 32 !== e.keyCode) ||
						((t = n.params.a11y),
						(a = e.target),
						n.pagination &&
							n.pagination.el &&
							(a === n.pagination.el || n.pagination.el.contains(e.target)) &&
							!e.target.matches(L(n.params.pagination.bulletClass))) ||
						(n.navigation &&
							n.navigation.prevEl &&
							n.navigation.nextEl &&
							((e = P(n.navigation.prevEl)),
							P(n.navigation.nextEl).includes(a) &&
								((n.isEnd && !n.params.loop) || n.slideNext(),
								n.isEnd ? i(t.lastSlideMessage) : i(t.nextSlideMessage)),
							e.includes(a)) &&
							((n.isBeginning && !n.params.loop) || n.slidePrev(),
							n.isBeginning ? i(t.firstSlideMessage) : i(t.prevSlideMessage)),
						n.pagination && a.matches(L(n.params.pagination.bulletClass)) && a.click());
				}
				function f() {
					return n.pagination && n.pagination.bullets && n.pagination.bullets.length;
				}
				function w() {
					return f() && n.params.pagination.clickable;
				}
				let b = (e, t, a) => {
						var i;
						d(e),
							"BUTTON" !== e.tagName &&
								(c(e, "button"), e.addEventListener("keydown", g)),
							m(e, a),
							(i = t),
							P(e).forEach(e => {
								e.setAttribute("aria-controls", i);
							});
					},
					y = e => {
						r && r !== e.target && !r.contains(e.target) && (s = !0),
							(n.a11y.clicked = !0);
					},
					x = () => {
						(s = !1),
							requestAnimationFrame(() => {
								requestAnimationFrame(() => {
									n.destroyed || (n.a11y.clicked = !1);
								});
							});
					},
					E = e => {
						l = new Date().getTime();
					},
					S = t => {
						if (
							!n.a11y.clicked &&
							n.params.a11y.scrollOnFocus &&
							!(new Date().getTime() - l < 100)
						) {
							let e = t.target.closest(`.${n.params.slideClass}, swiper-slide`);
							var a, i;
							e &&
								n.slides.includes(e) &&
								((r = e),
								(a = n.slides.indexOf(e) === n.activeIndex),
								(i =
									n.params.watchSlidesProgress &&
									n.visibleSlides &&
									n.visibleSlides.includes(e)),
								a ||
									i ||
									(t.sourceCapabilities &&
										t.sourceCapabilities.firesTouchEvents) ||
									(n.isHorizontal()
										? (n.el.scrollLeft = 0)
										: (n.el.scrollTop = 0),
									requestAnimationFrame(() => {
										s ||
											(n.params.loop
												? n.slideToLoop(
														parseInt(
															e.getAttribute(
																"data-swiper-slide-index"
															)
														),
														0
													)
												: n.slideTo(n.slides.indexOf(e), 0),
											(s = !1));
									})));
						}
					},
					T = () => {
						let a = n.params.a11y,
							i =
								(a.itemRoleDescriptionMessage &&
									u(n.slides, a.itemRoleDescriptionMessage),
								a.slideRole && c(n.slides, a.slideRole),
								n.slides.length);
						a.slideLabelMessage &&
							n.slides.forEach((e, t) => {
								t = n.params.loop
									? parseInt(e.getAttribute("data-swiper-slide-index"), 10)
									: t;
								m(
									e,
									a.slideLabelMessage
										.replace(/\{\{index\}\}/, t + 1)
										.replace(/\{\{slidesLength\}\}/, i)
								);
							});
					},
					M = () => {
						let t = n.params.a11y;
						n.el.append(o);
						var e = n.el,
							e =
								(t.containerRoleDescriptionMessage &&
									u(e, t.containerRoleDescriptionMessage),
								t.containerMessage && m(e, t.containerMessage),
								t.containerRole && c(e, t.containerRole),
								n.wrapperEl);
						let a =
							t.id ||
							e.getAttribute("id") ||
							"swiper-wrapper-" +
								"x"
									.repeat((r = void 0 === (r = 16) ? 16 : r))
									.replace(/x/g, () =>
										Math.round(16 * Math.random()).toString(16)
									);
						var i,
							s,
							r = n.params.autoplay && n.params.autoplay.enabled ? "off" : "polite",
							{ nextEl: e, prevEl: l } =
								((i = a),
								P(e).forEach(e => {
									e.setAttribute("id", i);
								}),
								(s = r),
								P(e).forEach(e => {
									e.setAttribute("aria-live", s);
								}),
								T(),
								n.navigation || {}),
							e = P(e),
							l = P(l);
						e && e.forEach(e => b(e, a, t.nextSlideMessage)),
							l && l.forEach(e => b(e, a, t.prevSlideMessage)),
							w() &&
								P(n.pagination.el).forEach(e => {
									e.addEventListener("keydown", g);
								}),
							k().addEventListener("visibilitychange", E),
							n.el.addEventListener("focus", S, !0),
							n.el.addEventListener("focus", S, !0),
							n.el.addEventListener("pointerdown", y, !0),
							n.el.addEventListener("pointerup", x, !0);
					};
				a("beforeInit", () => {
					(o = A("span", n.params.a11y.notificationClass)).setAttribute(
						"aria-live",
						"assertive"
					),
						o.setAttribute("aria-atomic", "true");
				}),
					a("afterInit", () => {
						n.params.a11y.enabled && M();
					}),
					a("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
						n.params.a11y.enabled && T();
					}),
					a("fromEdge toEdge afterInit lock unlock", () => {
						var e, t;
						n.params.a11y.enabled &&
							!n.params.loop &&
							!n.params.rewind &&
							n.navigation &&
							(({ nextEl: e, prevEl: t } = n.navigation),
							t && (n.isBeginning ? (h(t), p) : (v(t), d))(t),
							e) &&
							(n.isEnd ? (h(e), p) : (v(e), d))(e);
					}),
					a("paginationUpdate", () => {
						if (n.params.a11y.enabled) {
							let t = n.params.a11y;
							f() &&
								n.pagination.bullets.forEach(e => {
									n.params.pagination.clickable &&
										(d(e),
										n.params.pagination.renderBullet ||
											(c(e, "button"),
											m(
												e,
												t.paginationBulletMessage.replace(
													/\{\{index\}\}/,
													C(e) + 1
												)
											))),
										e.matches(L(n.params.pagination.bulletActiveClass))
											? e.setAttribute("aria-current", "true")
											: e.removeAttribute("aria-current");
								});
						}
					}),
					a("destroy", () => {
						var e, t;
						n.params.a11y.enabled &&
							(o && o.remove(),
							({ nextEl: e, prevEl: t } = n.navigation || {}),
							(e = P(e)),
							(t = P(t)),
							e && e.forEach(e => e.removeEventListener("keydown", g)),
							t && t.forEach(e => e.removeEventListener("keydown", g)),
							w() &&
								P(n.pagination.el).forEach(e => {
									e.removeEventListener("keydown", g);
								}),
							k().removeEventListener("visibilitychange", E),
							n.el) &&
							"string" != typeof n.el &&
							(n.el.removeEventListener("focus", S, !0),
							n.el.removeEventListener("pointerdown", y, !0),
							n.el.removeEventListener("pointerup", x, !0));
					});
			},
			function (e) {
				let { swiper: l, extendParams: t, on: a } = e,
					r =
						(t({
							history: {
								enabled: !1,
								root: "",
								replaceState: !1,
								key: "slides",
								keepQuery: !1
							}
						}),
						!1),
					i = {},
					n = e =>
						e
							.toString()
							.replace(/\s+/g, "-")
							.replace(/[^\w-]+/g, "")
							.replace(/--+/g, "-")
							.replace(/^-+/, "")
							.replace(/-+$/, ""),
					s = e => {
						var t = G();
						let a;
						(e = (a = e ? new URL(e) : t.location).pathname
							.slice(1)
							.split("/")
							.filter(e => "" !== e)),
							(t = e.length);
						return { key: e[t - 2], value: e[t - 1] };
					},
					o = (a, i) => {
						var s = G();
						if (r && l.params.history.enabled) {
							let e;
							e = l.params.url ? new URL(l.params.url) : s.location;
							i =
								l.virtual && l.params.virtual.enabled
									? l.slidesEl.querySelector(`[data-swiper-slide-index="${i}"]`)
									: l.slides[i];
							let t = n(i.getAttribute("data-history"));
							if (0 < l.params.history.root.length) {
								let e = l.params.history.root;
								"/" === e[e.length - 1] && (e = e.slice(0, e.length - 1)),
									(t = e + "/" + (a ? a + "/" : "") + t);
							} else e.pathname.includes(a) || (t = (a ? a + "/" : "") + t);
							l.params.history.keepQuery && (t += e.search);
							i = s.history.state;
							(i && i.value === t) ||
								(l.params.history.replaceState
									? s.history.replaceState({ value: t }, null, t)
									: s.history.pushState({ value: t }, null, t));
						}
					},
					d = (a, i, s) => {
						if (i)
							for (let e = 0, t = l.slides.length; e < t; e += 1) {
								var r = l.slides[e];
								n(r.getAttribute("data-history")) === i &&
									((r = l.getSlideIndex(r)), l.slideTo(r, a, s));
							}
						else l.slideTo(0, a, s);
					},
					p = () => {
						(i = s(l.params.url)), d(l.params.speed, i.value, !1);
					};
				a("init", () => {
					var e;
					l.params.history.enabled &&
						((e = G()), l.params.history) &&
						(e.history && e.history.pushState
							? ((r = !0),
								((i = s(l.params.url)).key || i.value) &&
									d(0, i.value, l.params.runCallbacksOnInit),
								l.params.history.replaceState || e.addEventListener("popstate", p))
							: ((l.params.history.enabled = !1),
								(l.params.hashNavigation.enabled = !0)));
				}),
					a("destroy", () => {
						var e;
						l.params.history.enabled &&
							((e = G()),
							l.params.history.replaceState || e.removeEventListener("popstate", p));
					}),
					a("transitionEnd _freeModeNoMomentumRelease", () => {
						r && o(l.params.history.key, l.activeIndex);
					}),
					a("slideChange", () => {
						r && l.params.cssMode && o(l.params.history.key, l.activeIndex);
					});
			},
			function (e) {
				let { swiper: i, extendParams: t, emit: a, on: s } = e,
					r = !1,
					l = k(),
					n = G(),
					o =
						(t({
							hashNavigation: {
								enabled: !1,
								replaceState: !1,
								watchState: !1,
								getSlideIndex(e, t) {
									var a;
									return i.virtual && i.params.virtual.enabled
										? (a = i.slides.find(
												e => e.getAttribute("data-hash") === t
											))
											? parseInt(
													a.getAttribute("data-swiper-slide-index"),
													10
												)
											: 0
										: i.getSlideIndex(
												R(
													i.slidesEl,
													`.${i.params.slideClass}[data-hash="${t}"], swiper-slide[data-hash="${t}"]`
												)[0]
											);
								}
							}
						}),
						() => {
							a("hashChange");
							var e = l.location.hash.replace("#", ""),
								t =
									i.virtual && i.params.virtual.enabled
										? i.slidesEl.querySelector(
												`[data-swiper-slide-index="${i.activeIndex}"]`
											)
										: i.slides[i.activeIndex];
							e === (t ? t.getAttribute("data-hash") : "") ||
								void 0 === (t = i.params.hashNavigation.getSlideIndex(i, e)) ||
								Number.isNaN(t) ||
								i.slideTo(t);
						}),
					d = () => {
						var e;
						r &&
							i.params.hashNavigation.enabled &&
							((e = (e =
								i.virtual && i.params.virtual.enabled
									? i.slidesEl.querySelector(
											`[data-swiper-slide-index="${i.activeIndex}"]`
										)
									: i.slides[i.activeIndex])
								? e.getAttribute("data-hash") || e.getAttribute("data-history")
								: ""),
							i.params.hashNavigation.replaceState &&
							n.history &&
							n.history.replaceState
								? n.history.replaceState(null, null, "#" + e || "")
								: (l.location.hash = e || ""),
							a("hashSet"));
					};
				s("init", () => {
					var e;
					!i.params.hashNavigation.enabled ||
						!i.params.hashNavigation.enabled ||
						(i.params.history && i.params.history.enabled) ||
						((r = !0),
						(e = l.location.hash.replace("#", "")) &&
							((e = i.params.hashNavigation.getSlideIndex(i, e)),
							i.slideTo(e || 0, 0, i.params.runCallbacksOnInit, !0)),
						i.params.hashNavigation.watchState && n.addEventListener("hashchange", o));
				}),
					s("destroy", () => {
						i.params.hashNavigation.enabled &&
							i.params.hashNavigation.watchState &&
							n.removeEventListener("hashchange", o);
					}),
					s("transitionEnd _freeModeNoMomentumRelease", () => {
						r && d();
					}),
					s("slideChange", () => {
						r && i.params.cssMode && d();
					});
			},
			function (e) {
				let { swiper: r, extendParams: t, on: a, emit: l, params: i } = e;
				(r.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
					t({
						autoplay: {
							enabled: !1,
							delay: 3e3,
							waitForTransition: !0,
							disableOnInteraction: !1,
							stopOnLastSlide: !1,
							reverseDirection: !1,
							pauseOnMouseEnter: !1
						}
					});
				let n,
					o,
					d = i && i.autoplay ? i.autoplay.delay : 3e3,
					p = i && i.autoplay ? i.autoplay.delay : 3e3,
					c,
					u = new Date().getTime(),
					s,
					m,
					h,
					v,
					g,
					f,
					w;
				function b(e) {
					!r ||
						r.destroyed ||
						!r.wrapperEl ||
						e.target !== r.wrapperEl ||
						(r.wrapperEl.removeEventListener("transitionend", b), w) ||
						(e.detail && e.detail.bySwiperTouchMove) ||
						C();
				}
				let y = () => {
						var e;
						!r.destroyed &&
							r.autoplay.running &&
							(r.autoplay.paused ? (s = !0) : s && ((p = c), (s = !1)),
							(e = r.autoplay.paused ? c : u + p - new Date().getTime()),
							(r.autoplay.timeLeft = e),
							l("autoplayTimeLeft", e, e / d),
							(o = requestAnimationFrame(() => {
								y();
							})));
					},
					x = () => {
						let e;
						if (
							(e =
								r.virtual && r.params.virtual.enabled
									? r.slides.find(e =>
											e.classList.contains("swiper-slide-active")
										)
									: r.slides[r.activeIndex])
						)
							return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
					},
					E = i => {
						if (!r.destroyed && r.autoplay.running) {
							cancelAnimationFrame(o), y();
							let e = void 0 === i ? r.params.autoplay.delay : i;
							(d = r.params.autoplay.delay), (p = r.params.autoplay.delay);
							var s = x();
							!Number.isNaN(s) &&
								0 < s &&
								void 0 === i &&
								((e = s), (d = s), (p = s)),
								(c = e);
							let t = r.params.speed,
								a = () => {
									r &&
										!r.destroyed &&
										(r.params.autoplay.reverseDirection
											? !r.isBeginning || r.params.loop || r.params.rewind
												? (r.slidePrev(t, !0, !0), l("autoplay"))
												: r.params.autoplay.stopOnLastSlide ||
													(r.slideTo(r.slides.length - 1, t, !0, !0),
													l("autoplay"))
											: !r.isEnd || r.params.loop || r.params.rewind
												? (r.slideNext(t, !0, !0), l("autoplay"))
												: r.params.autoplay.stopOnLastSlide ||
													(r.slideTo(0, t, !0, !0), l("autoplay")),
										r.params.cssMode) &&
										((u = new Date().getTime()),
										requestAnimationFrame(() => {
											E();
										}));
								};
							return (
								0 < e
									? (clearTimeout(n),
										(n = setTimeout(() => {
											a();
										}, e)))
									: requestAnimationFrame(() => {
											a();
										}),
								e
							);
						}
					},
					S = () => {
						(u = new Date().getTime()),
							(r.autoplay.running = !0),
							E(),
							l("autoplayStart");
					},
					T = () => {
						(r.autoplay.running = !1),
							clearTimeout(n),
							cancelAnimationFrame(o),
							l("autoplayStop");
					},
					M = (e, t) => {
						!r.destroyed &&
							r.autoplay.running &&
							(clearTimeout(n),
							e || (f = !0),
							(e = () => {
								l("autoplayPause"),
									r.params.autoplay.waitForTransition
										? r.wrapperEl.addEventListener("transitionend", b)
										: C();
							}),
							(r.autoplay.paused = !0),
							t
								? (g && (c = r.params.autoplay.delay), (g = !1), e())
								: ((t = c || r.params.autoplay.delay),
									(c = t - (new Date().getTime() - u)),
									(r.isEnd && c < 0 && !r.params.loop) ||
										(c < 0 && (c = 0), e())));
					},
					C = () => {
						(r.isEnd && c < 0 && !r.params.loop) ||
							r.destroyed ||
							!r.autoplay.running ||
							((u = new Date().getTime()),
							f ? ((f = !1), E(c)) : E(),
							(r.autoplay.paused = !1),
							l("autoplayResume"));
					},
					P = () => {
						var e;
						!r.destroyed &&
							r.autoplay.running &&
							("hidden" === (e = k()).visibilityState && ((f = !0), M(!0)),
							"visible" === e.visibilityState) &&
							C();
					},
					L = e => {
						"mouse" !== e.pointerType ||
							((f = !0), (w = !0), r.animating) ||
							r.autoplay.paused ||
							M(!0);
					},
					z = e => {
						"mouse" === e.pointerType && ((w = !1), r.autoplay.paused) && C();
					};
				a("init", () => {
					r.params.autoplay.enabled &&
						(r.params.autoplay.pauseOnMouseEnter &&
							(r.el.addEventListener("pointerenter", L),
							r.el.addEventListener("pointerleave", z)),
						k().addEventListener("visibilitychange", P),
						S());
				}),
					a("destroy", () => {
						r.el &&
							"string" != typeof r.el &&
							(r.el.removeEventListener("pointerenter", L),
							r.el.removeEventListener("pointerleave", z)),
							k().removeEventListener("visibilitychange", P),
							r.autoplay.running && T();
					}),
					a("_freeModeStaticRelease", () => {
						(h || f) && C();
					}),
					a("_freeModeNoMomentumRelease", () => {
						r.params.autoplay.disableOnInteraction ? T() : M(!0, !0);
					}),
					a("beforeTransitionStart", (e, t, a) => {
						!r.destroyed &&
							r.autoplay.running &&
							(a || !r.params.autoplay.disableOnInteraction ? M(!0, !0) : T());
					}),
					a("sliderFirstMove", () => {
						!r.destroyed &&
							r.autoplay.running &&
							(r.params.autoplay.disableOnInteraction
								? T()
								: ((m = !0),
									(h = !1),
									(f = !1),
									(v = setTimeout(() => {
										(f = !0), (h = !0), M(!0);
									}, 200))));
					}),
					a("touchEnd", () => {
						!r.destroyed &&
							r.autoplay.running &&
							m &&
							(clearTimeout(v),
							clearTimeout(n),
							(m =
								((h =
									(r.params.autoplay.disableOnInteraction ||
										(h && r.params.cssMode && C()),
									!1)),
								!1)));
					}),
					a("slideChange", () => {
						!r.destroyed && r.autoplay.running && (g = !0);
					}),
					Object.assign(r.autoplay, { start: S, stop: T, pause: M, resume: C });
			},
			function (e) {
				let { swiper: p, extendParams: t, on: a } = e,
					i =
						(t({
							thumbs: {
								swiper: null,
								multipleActiveThumbs: !0,
								autoScrollOffset: 0,
								slideThumbActiveClass: "swiper-slide-thumb-active",
								thumbsContainerClass: "swiper-thumbs"
							}
						}),
						!1),
					s = !1;
				function r() {
					var t = p.thumbs.swiper;
					if (t && !t.destroyed) {
						var a = t.clickedIndex,
							e = t.clickedSlide;
						if (
							!(
								(e &&
									e.classList.contains(p.params.thumbs.slideThumbActiveClass)) ||
								null == a
							)
						) {
							let e;
							(e = t.params.loop
								? parseInt(
										t.clickedSlide.getAttribute("data-swiper-slide-index"),
										10
									)
								: a),
								p.params.loop ? p.slideToLoop(e) : p.slideTo(e);
						}
					}
				}
				function l() {
					var e = p.params.thumbs;
					if (i) return !1;
					i = !0;
					var t = p.constructor;
					return (
						e.swiper instanceof t
							? ((p.thumbs.swiper = e.swiper),
								Object.assign(p.thumbs.swiper.originalParams, {
									watchSlidesProgress: !0,
									slideToClickedSlide: !1
								}),
								Object.assign(p.thumbs.swiper.params, {
									watchSlidesProgress: !0,
									slideToClickedSlide: !1
								}),
								p.thumbs.swiper.update())
							: o(e.swiper) &&
								((e = Object.assign({}, e.swiper)),
								Object.assign(e, {
									watchSlidesProgress: !0,
									slideToClickedSlide: !1
								}),
								(p.thumbs.swiper = new t(e)),
								(s = !0)),
						p.thumbs.swiper.el.classList.add(p.params.thumbs.thumbsContainerClass),
						p.thumbs.swiper.on("tap", r),
						!0
					);
				}
				function n(i) {
					var s = p.thumbs.swiper;
					if (s && !s.destroyed) {
						var r =
							"auto" === s.params.slidesPerView
								? s.slidesPerViewDynamic()
								: s.params.slidesPerView;
						let t = 1,
							a = p.params.thumbs.slideThumbActiveClass;
						if (
							(1 < p.params.slidesPerView &&
								!p.params.centeredSlides &&
								(t = p.params.slidesPerView),
							p.params.thumbs.multipleActiveThumbs || (t = 1),
							(t = Math.floor(t)),
							s.slides.forEach(e => e.classList.remove(a)),
							s.params.loop || (s.params.virtual && s.params.virtual.enabled))
						)
							for (let e = 0; e < t; e += 1)
								R(
									s.slidesEl,
									`[data-swiper-slide-index="${p.realIndex + e}"]`
								).forEach(e => {
									e.classList.add(a);
								});
						else
							for (let e = 0; e < t; e += 1)
								s.slides[p.realIndex + e] &&
									s.slides[p.realIndex + e].classList.add(a);
						var l = p.params.thumbs.autoScrollOffset,
							n = l && !s.params.loop;
						if (p.realIndex !== s.realIndex || n) {
							var o,
								d = s.activeIndex;
							let e, t;
							(t = s.params.loop
								? ((o = s.slides.find(
										e =>
											e.getAttribute("data-swiper-slide-index") ===
											"" + p.realIndex
									)),
									(e = s.slides.indexOf(o)),
									p.activeIndex > p.previousIndex ? "next" : "prev")
								: (e = p.realIndex) > p.previousIndex
									? "next"
									: "prev"),
								n && (e += "next" === t ? l : -1 * l),
								s.visibleSlidesIndexes &&
									s.visibleSlidesIndexes.indexOf(e) < 0 &&
									(s.params.centeredSlides
										? (e =
												e > d
													? e - Math.floor(r / 2) + 1
													: e + Math.floor(r / 2) - 1)
										: e > d && s.params.slidesPerGroup,
									s.slideTo(e, i ? 0 : void 0));
						}
					}
				}
				(p.thumbs = { swiper: null }),
					a("beforeInit", () => {
						let s = p.params.thumbs;
						if (s && s.swiper)
							if ("string" == typeof s.swiper || s.swiper instanceof HTMLElement) {
								let e = k(),
									t = () => {
										let i =
											"string" == typeof s.swiper
												? e.querySelector(s.swiper)
												: s.swiper;
										if (i && i.swiper) (s.swiper = i.swiper), l(), n(!0);
										else if (i) {
											let t = p.params.eventsPrefix + "init",
												a = e => {
													(s.swiper = e.detail[0]),
														i.removeEventListener(t, a),
														l(),
														n(!0),
														s.swiper.update(),
														p.update();
												};
											i.addEventListener(t, a);
										}
										return i;
									},
									a = () => {
										p.destroyed || t() || requestAnimationFrame(a);
									};
								requestAnimationFrame(a);
							} else l(), n(!0);
					}),
					a("slideChange update resize observerUpdate", () => {
						n();
					}),
					a("setTransition", (e, t) => {
						var a = p.thumbs.swiper;
						a && !a.destroyed && a.setTransition(t);
					}),
					a("beforeDestroy", () => {
						var e = p.thumbs.swiper;
						e && !e.destroyed && s && e.destroy();
					}),
					Object.assign(p.thumbs, { init: l, update: n });
			},
			function (e) {
				let { swiper: m, extendParams: t, emit: h, once: v } = e;
				t({
					freeMode: {
						enabled: !1,
						momentum: !0,
						momentumRatio: 1,
						momentumBounce: !0,
						momentumBounceRatio: 1,
						momentumVelocityRatio: 1,
						sticky: !1,
						minimumVelocity: 0.02
					}
				}),
					Object.assign(m, {
						freeMode: {
							onTouchStart: function () {
								var e;
								m.params.cssMode ||
									((e = m.getTranslate()),
									m.setTranslate(e),
									m.setTransition(0),
									(m.touchEventsData.velocities.length = 0),
									m.freeMode.onTouchEnd({
										currentPos: m.rtl ? m.translate : -m.translate
									}));
							},
							onTouchMove: function () {
								var e, t;
								m.params.cssMode ||
									(({ touchEventsData: e, touches: t } = m),
									0 === e.velocities.length &&
										e.velocities.push({
											position: t[m.isHorizontal() ? "startX" : "startY"],
											time: e.touchStartTime
										}),
									e.velocities.push({
										position: t[m.isHorizontal() ? "currentX" : "currentY"],
										time: f()
									}));
							},
							onTouchEnd: function (p) {
								if (((p = p.currentPos), !m.params.cssMode)) {
									let {
										params: r,
										wrapperEl: l,
										rtlTranslate: n,
										snapGrid: o,
										touchEventsData: d
									} = m;
									var e = f() - d.touchStartTime;
									if (p < -m.minTranslate()) m.slideTo(m.activeIndex);
									else if (p > -m.maxTranslate())
										m.slides.length < o.length
											? m.slideTo(o.length - 1)
											: m.slideTo(m.slides.length - 1);
									else {
										if (r.freeMode.momentum) {
											(!(1 < d.velocities.length) ||
												((p = d.velocities.pop()),
												(u = d.velocities.pop()),
												(c = p.position - u.position),
												(u = p.time - u.time),
												(m.velocity = c / u),
												(m.velocity /= 2),
												Math.abs(m.velocity) < r.freeMode.minimumVelocity &&
													(m.velocity = 0),
												150 < u) ||
												300 < f() - p.time) &&
												(m.velocity = 0),
												(m.velocity *= r.freeMode.momentumVelocityRatio),
												(d.velocities.length = 0);
											let e = 1e3 * r.freeMode.momentumRatio;
											var c = m.velocity * e;
											let a = m.translate + c,
												t = (n && (a = -a), !1),
												i;
											var u =
												20 *
												Math.abs(m.velocity) *
												r.freeMode.momentumBounceRatio;
											let s;
											if (a < m.maxTranslate())
												r.freeMode.momentumBounce
													? (a + m.maxTranslate() < -u &&
															(a = m.maxTranslate() - u),
														(i = m.maxTranslate()),
														(t = !0),
														(d.allowMomentumBounce = !0))
													: (a = m.maxTranslate()),
													r.loop && r.centeredSlides && (s = !0);
											else if (a > m.minTranslate())
												r.freeMode.momentumBounce
													? (a - m.minTranslate() > u &&
															(a = m.minTranslate() + u),
														(i = m.minTranslate()),
														(t = !0),
														(d.allowMomentumBounce = !0))
													: (a = m.minTranslate()),
													r.loop && r.centeredSlides && (s = !0);
											else if (r.freeMode.sticky) {
												let t;
												for (let e = 0; e < o.length; e += 1)
													if (o[e] > -a) {
														t = e;
														break;
													}
												a = -(a =
													Math.abs(o[t] - a) < Math.abs(o[t - 1] - a) ||
													"next" === m.swipeDirection
														? o[t]
														: o[t - 1]);
											}
											if (
												(s &&
													v("transitionEnd", () => {
														m.loopFix();
													}),
												0 !== m.velocity)
											)
												(e = n
													? Math.abs((-a - m.translate) / m.velocity)
													: Math.abs((a - m.translate) / m.velocity)),
													r.freeMode.sticky &&
														((p = Math.abs((n ? -a : a) - m.translate)),
														(c = m.slidesSizesGrid[m.activeIndex]),
														(e =
															p < c
																? r.speed
																: p < 2 * c
																	? 1.5 * r.speed
																	: 2.5 * r.speed));
											else if (r.freeMode.sticky)
												return void m.slideToClosest();
											r.freeMode.momentumBounce && t
												? (m.updateProgress(i),
													m.setTransition(e),
													m.setTranslate(a),
													m.transitionStart(!0, m.swipeDirection),
													(m.animating = !0),
													g(l, () => {
														m &&
															!m.destroyed &&
															d.allowMomentumBounce &&
															(h("momentumBounce"),
															m.setTransition(r.speed),
															setTimeout(() => {
																m.setTranslate(i),
																	g(l, () => {
																		m &&
																			!m.destroyed &&
																			m.transitionEnd();
																	});
															}, 0));
													}))
												: m.velocity
													? (h("_freeModeNoMomentumRelease"),
														m.updateProgress(a),
														m.setTransition(e),
														m.setTranslate(a),
														m.transitionStart(!0, m.swipeDirection),
														m.animating ||
															((m.animating = !0),
															g(l, () => {
																m &&
																	!m.destroyed &&
																	m.transitionEnd();
															})))
													: m.updateProgress(a),
												m.updateActiveIndex(),
												m.updateSlidesClasses();
										} else {
											if (r.freeMode.sticky) return void m.slideToClosest();
											r.freeMode && h("_freeModeNoMomentumRelease");
										}
										(!r.freeMode.momentum || e >= r.longSwipesMs) &&
											(h("_freeModeStaticRelease"),
											m.updateProgress(),
											m.updateActiveIndex(),
											m.updateSlidesClasses());
									}
								}
							}
						}
					});
			},
			function (e) {
				let { swiper: c, extendParams: t, on: a } = e;
				t({ grid: { rows: 1, fill: "column" } });
				let u,
					m,
					h,
					i,
					v = () => {
						let e = c.params.spaceBetween;
						return (
							"string" == typeof e && 0 <= e.indexOf("%")
								? (e = (parseFloat(e.replace("%", "")) / 100) * c.size)
								: "string" == typeof e && (e = parseFloat(e)),
							e
						);
					};
				a("init", () => {
					i = c.params.grid && 1 < c.params.grid.rows;
				}),
					a("update", () => {
						var { params: e, el: t } = c,
							a = e.grid && 1 < e.grid.rows;
						i && !a
							? (t.classList.remove(
									e.containerModifierClass + "grid",
									e.containerModifierClass + "grid-column"
								),
								(h = 1),
								c.emitContainerClasses())
							: !i &&
								a &&
								(t.classList.add(e.containerModifierClass + "grid"),
								"column" === e.grid.fill &&
									t.classList.add(e.containerModifierClass + "grid-column"),
								c.emitContainerClasses()),
							(i = a);
					}),
					(c.grid = {
						initSlides: e => {
							var t = c.params.slidesPerView,
								{ rows: a, fill: i } = c.params.grid,
								e = (c.virtual && c.params.virtual.enabled ? c.virtual.slides : e)
									.length;
							(h = Math.floor(e / a)),
								(u = Math.floor(e / a) === e / a ? e : Math.ceil(e / a) * a),
								"auto" !== t && "row" === i && (u = Math.max(u, t * a)),
								(m = u / a);
						},
						unsetSlides: () => {
							c.slides &&
								c.slides.forEach(e => {
									e.swiperSlideGridSet &&
										((e.style.height = ""),
										(e.style[c.getDirectionLabel("margin-top")] = ""));
								});
						},
						updateSlide: (e, t, a) => {
							var i,
								s,
								r = c.params.slidesPerGroup,
								l = v(),
								{ rows: n, fill: o } = c.params.grid,
								a = (c.virtual && c.params.virtual.enabled ? c.virtual.slides : a)
									.length;
							let d, p;
							"row" === o && 1 < r
								? ((s = e - n * r * (i = Math.floor(e / (r * n)))),
									(a = 0 === i ? r : Math.min(Math.ceil((a - i * n * r) / n), r)),
									(p = Math.floor(s / a)),
									(s = (d = s - p * a + i * r) + (p * u) / n),
									(t.style.order = s))
								: "column" === o
									? ((d = Math.floor(e / n)),
										(p = e - d * n),
										(d > h || (d === h && p === n - 1)) &&
											(p += 1) >= n &&
											((p = 0), (d += 1)))
									: ((p = Math.floor(e / m)), (d = e - p * m)),
								(t.row = p),
								(t.column = d),
								(t.style.height = `calc((100% - ${(n - 1) * l}px) / ${n})`),
								(t.style[c.getDirectionLabel("margin-top")] =
									0 !== p ? l && l + "px" : ""),
								(t.swiperSlideGridSet = !0);
						},
						updateWrapperSize: (e, a) => {
							var { centeredSlides: t, roundLengths: i } = c.params,
								s = v(),
								r = c.params.grid.rows;
							if (
								((c.virtualSize = (e + s) * u),
								(c.virtualSize = Math.ceil(c.virtualSize / r) - s),
								c.params.cssMode ||
									(c.wrapperEl.style[c.getDirectionLabel("width")] =
										c.virtualSize + s + "px"),
								t)
							) {
								var l = [];
								for (let t = 0; t < a.length; t += 1) {
									let e = a[t];
									i && (e = Math.floor(e)),
										a[t] < c.virtualSize + a[0] && l.push(e);
								}
								a.splice(0, a.length), a.push(...l);
							}
						}
					});
			},
			function (e) {
				(e = e.swiper),
					Object.assign(e, {
						appendSlide: function (t) {
							var e = this;
							let { params: a, slidesEl: i } = e;
							a.loop && e.loopDestroy();
							var s = e => {
								var t;
								"string" == typeof e
									? (((t = document.createElement("div")).innerHTML = e),
										i.append(t.children[0]),
										(t.innerHTML = ""))
									: i.append(e);
							};
							if ("object" == typeof t && "length" in t)
								for (let e = 0; e < t.length; e += 1) t[e] && s(t[e]);
							else s(t);
							e.recalcSlides(),
								a.loop && e.loopCreate(),
								(a.observer && !e.isElement) || e.update();
						}.bind(e),
						prependSlide: function (t) {
							var e = this;
							let { params: a, activeIndex: i, slidesEl: s } = e,
								r = (a.loop && e.loopDestroy(), i + 1);
							var l = e => {
								var t;
								"string" == typeof e
									? (((t = document.createElement("div")).innerHTML = e),
										s.prepend(t.children[0]),
										(t.innerHTML = ""))
									: s.prepend(e);
							};
							if ("object" == typeof t && "length" in t) {
								for (let e = 0; e < t.length; e += 1) t[e] && l(t[e]);
								r = i + t.length;
							} else l(t);
							e.recalcSlides(),
								a.loop && e.loopCreate(),
								(a.observer && !e.isElement) || e.update(),
								e.slideTo(r, 0, !1);
						}.bind(e),
						addSlide: function (t, a) {
							var i = this,
								{ params: s, activeIndex: r, slidesEl: l } = i;
							let n = r;
							if (
								(s.loop &&
									((n -= i.loopedSlides), i.loopDestroy(), i.recalcSlides()),
								(r = i.slides.length),
								t <= 0)
							)
								i.prependSlide(a);
							else if (r <= t) i.appendSlide(a);
							else {
								let e = n > t ? n + 1 : n;
								var o = [];
								for (let e = r - 1; e >= t; --e) {
									var d = i.slides[e];
									d.remove(), o.unshift(d);
								}
								if ("object" == typeof a && "length" in a) {
									for (let e = 0; e < a.length; e += 1) a[e] && l.append(a[e]);
									e = n > t ? n + a.length : n;
								} else l.append(a);
								for (let e = 0; e < o.length; e += 1) l.append(o[e]);
								i.recalcSlides(),
									s.loop && i.loopCreate(),
									(s.observer && !i.isElement) || i.update(),
									s.loop
										? i.slideTo(e + i.loopedSlides, 0, !1)
										: i.slideTo(e, 0, !1);
							}
						}.bind(e),
						removeSlide: function (t) {
							var a = this,
								{ params: e, activeIndex: i } = a;
							let s = i,
								r = (e.loop && ((s -= a.loopedSlides), a.loopDestroy()), s),
								l;
							if ("object" == typeof t && "length" in t)
								for (let e = 0; e < t.length; e += 1)
									(l = t[e]), a.slides[l] && a.slides[l].remove(), l < r && --r;
							else (l = t), a.slides[l] && a.slides[l].remove(), l < r && --r;
							(r = Math.max(r, 0)),
								a.recalcSlides(),
								e.loop && a.loopCreate(),
								(e.observer && !a.isElement) || a.update(),
								e.loop ? a.slideTo(r + a.loopedSlides, 0, !1) : a.slideTo(r, 0, !1);
						}.bind(e),
						removeAllSlides: function () {
							var t = [];
							for (let e = 0; e < this.slides.length; e += 1) t.push(e);
							this.removeSlide(t);
						}.bind(e)
					});
			},
			function (e) {
				let { swiper: r, extendParams: t, on: a } = e;
				t({ fadeEffect: { crossFade: !1 } }),
					n({
						effect: "fade",
						swiper: r,
						on: a,
						setTranslate: () => {
							var e = r.slides;
							r.params.fadeEffect;
							for (let a = 0; a < e.length; a += 1) {
								var i = r.slides[a];
								let e = -i.swiperSlideOffset,
									t = (r.params.virtualTranslate || (e -= r.translate), 0);
								r.isHorizontal() || ((t = e), (e = 0));
								var s = r.params.fadeEffect.crossFade
										? Math.max(1 - Math.abs(i.progress), 0)
										: 1 + Math.min(Math.max(i.progress, -1), 0),
									i = x(0, i);
								(i.style.opacity = s),
									(i.style.transform = `translate3d(${e}px, ${t}px, 0px)`);
							}
						},
						setTransition: t => {
							var e = r.slides.map(e => s(e));
							e.forEach(e => {
								e.style.transitionDuration = t + "ms";
							}),
								v({ swiper: r, duration: t, transformElements: e, allSlides: !0 });
						},
						overwriteParams: () => ({
							slidesPerView: 1,
							slidesPerGroup: 1,
							watchSlidesProgress: !0,
							spaceBetween: 0,
							virtualTranslate: !r.params.cssMode
						})
					});
			},
			function (e) {
				let { swiper: w, extendParams: t, on: a } = e,
					b =
						(t({
							cubeEffect: {
								slideShadows: !0,
								shadow: !0,
								shadowOffset: 20,
								shadowScale: 0.94
							}
						}),
						(e, t, a) => {
							let i = a
									? e.querySelector(".swiper-slide-shadow-left")
									: e.querySelector(".swiper-slide-shadow-top"),
								s = a
									? e.querySelector(".swiper-slide-shadow-right")
									: e.querySelector(".swiper-slide-shadow-bottom");
							i ||
								((i = A(
									"div",
									(
										"swiper-slide-shadow-cube swiper-slide-shadow-" +
										(a ? "left" : "top")
									).split(" ")
								)),
								e.append(i)),
								s ||
									((s = A(
										"div",
										(
											"swiper-slide-shadow-cube swiper-slide-shadow-" +
											(a ? "right" : "bottom")
										).split(" ")
									)),
									e.append(s)),
								i && (i.style.opacity = Math.max(-t, 0)),
								s && (s.style.opacity = Math.max(t, 0));
						});
				n({
					effect: "cube",
					swiper: w,
					on: a,
					setTranslate: () => {
						var e,
							{
								el: t,
								wrapperEl: a,
								slides: n,
								width: i,
								height: s,
								rtlTranslate: o,
								size: d,
								browser: r
							} = w,
							p = y(w),
							c = w.params.cubeEffect,
							u = w.isHorizontal(),
							m = w.virtual && w.params.virtual.enabled;
						let h = 0,
							l;
						c.shadow &&
							(u
								? ((l = w.wrapperEl.querySelector(".swiper-cube-shadow")) ||
										((l = A("div", "swiper-cube-shadow")),
										w.wrapperEl.append(l)),
									(l.style.height = i + "px"))
								: (l = t.querySelector(".swiper-cube-shadow")) ||
									((l = A("div", "swiper-cube-shadow")), t.append(l)));
						for (let l = 0; l < n.length; l += 1) {
							var v = n[l];
							let e = l,
								t =
									90 *
									(e = m
										? parseInt(v.getAttribute("data-swiper-slide-index"), 10)
										: e),
								a = Math.floor(t / 360);
							o && ((t = -t), (a = Math.floor(-t / 360)));
							var g = Math.max(Math.min(v.progress, 1), -1);
							let i = 0,
								s = 0,
								r = 0;
							e % 4 == 0
								? ((i = 4 * -a * d), (r = 0))
								: (e - 1) % 4 == 0
									? ((i = 0), (r = 4 * -a * d))
									: (e - 2) % 4 == 0
										? ((i = d + 4 * a * d), (r = d))
										: (e - 3) % 4 == 0 && ((i = -d), (r = 3 * d + 4 * d * a)),
								o && (i = -i),
								u || ((s = i), (i = 0));
							var f = `rotateX(${p(u ? 0 : -t)}deg) rotateY(${p(u ? t : 0)}deg) translate3d(${i}px, ${s}px, ${r}px)`;
							g <= 1 &&
								-1 < g &&
								((h = 90 * e + 90 * g), o) &&
								(h = 90 * -e - 90 * g),
								(v.style.transform = f),
								c.slideShadows && b(v, g, u);
						}
						(a.style.transformOrigin = `50% 50% -${d / 2}px`),
							(a.style["-webkit-transform-origin"] = `50% 50% -${d / 2}px`),
							c.shadow &&
								(u
									? (l.style.transform = `translate3d(0px, ${i / 2 + c.shadowOffset}px, ${-i / 2}px) rotateX(89.99deg) rotateZ(0deg) scale(${c.shadowScale})`)
									: ((t = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90)),
										(i =
											1.5 -
											(Math.sin((2 * t * Math.PI) / 360) / 2 +
												Math.cos((2 * t * Math.PI) / 360) / 2)),
										(t = c.shadowScale),
										(i = c.shadowScale / i),
										(e = c.shadowOffset),
										(l.style.transform = `scale3d(${t}, 1, ${i}) translate3d(0px, ${s / 2 + e}px, ${-s / 2 / i}px) rotateX(-89.99deg)`)));
						t = (r.isSafari || r.isWebView) && r.needPerspectiveFix ? -d / 2 : 0;
						(a.style.transform = `translate3d(0px,0,${t}px) rotateX(${p(w.isHorizontal() ? 0 : h)}deg) rotateY(${p(w.isHorizontal() ? -h : 0)}deg)`),
							a.style.setProperty("--swiper-cube-translate-z", t + "px");
					},
					setTransition: t => {
						var { el: e, slides: a } = w;
						a.forEach(e => {
							(e.style.transitionDuration = t + "ms"),
								e
									.querySelectorAll(
										".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
									)
									.forEach(e => {
										e.style.transitionDuration = t + "ms";
									});
						}),
							w.params.cubeEffect.shadow &&
								!w.isHorizontal() &&
								(a = e.querySelector(".swiper-cube-shadow")) &&
								(a.style.transitionDuration = t + "ms");
					},
					recreateShadows: () => {
						let a = w.isHorizontal();
						w.slides.forEach(e => {
							var t = Math.max(Math.min(e.progress, 1), -1);
							b(e, t, a);
						});
					},
					getEffectParams: () => w.params.cubeEffect,
					perspective: () => !0,
					overwriteParams: () => ({
						slidesPerView: 1,
						slidesPerGroup: 1,
						watchSlidesProgress: !0,
						resistanceRatio: 0,
						spaceBetween: 0,
						centeredSlides: !1,
						virtualTranslate: !0
					})
				});
			},
			function (e) {
				let { swiper: u, extendParams: t, on: a } = e,
					m =
						(t({ flipEffect: { slideShadows: !0, limitRotation: !0 } }),
						(e, t) => {
							let a = u.isHorizontal()
									? e.querySelector(".swiper-slide-shadow-left")
									: e.querySelector(".swiper-slide-shadow-top"),
								i = u.isHorizontal()
									? e.querySelector(".swiper-slide-shadow-right")
									: e.querySelector(".swiper-slide-shadow-bottom");
							(a = a || E("flip", e, u.isHorizontal() ? "left" : "top")),
								(i = i || E("flip", e, u.isHorizontal() ? "right" : "bottom")),
								a && (a.style.opacity = Math.max(-t, 0)),
								i && (i.style.opacity = Math.max(t, 0));
						});
				n({
					effect: "flip",
					swiper: u,
					on: a,
					setTranslate: () => {
						var { slides: l, rtlTranslate: n } = u,
							o = u.params.flipEffect,
							d = y(u);
						for (let r = 0; r < l.length; r += 1) {
							var p = l[r];
							let e = p.progress;
							u.params.flipEffect.limitRotation &&
								(e = Math.max(Math.min(p.progress, 1), -1));
							var c = p.swiperSlideOffset;
							let t = -180 * e,
								a = 0,
								i = u.params.cssMode ? -c - u.translate : -c,
								s = 0;
							u.isHorizontal()
								? n && (t = -t)
								: ((s = i), (i = 0), (a = -t), (t = 0)),
								(p.style.zIndex = -Math.abs(Math.round(e)) + l.length),
								o.slideShadows && m(p, e);
							c = `translate3d(${i}px, ${s}px, 0px) rotateX(${d(a)}deg) rotateY(${d(t)}deg)`;
							x(0, p).style.transform = c;
						}
					},
					setTransition: t => {
						var e = u.slides.map(e => s(e));
						e.forEach(e => {
							(e.style.transitionDuration = t + "ms"),
								e
									.querySelectorAll(
										".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
									)
									.forEach(e => {
										e.style.transitionDuration = t + "ms";
									});
						}),
							v({ swiper: u, duration: t, transformElements: e });
					},
					recreateShadows: () => {
						u.params.flipEffect,
							u.slides.forEach(e => {
								let t = e.progress;
								u.params.flipEffect.limitRotation &&
									(t = Math.max(Math.min(e.progress, 1), -1)),
									m(e, t);
							});
					},
					getEffectParams: () => u.params.flipEffect,
					perspective: () => !0,
					overwriteParams: () => ({
						slidesPerView: 1,
						slidesPerGroup: 1,
						watchSlidesProgress: !0,
						spaceBetween: 0,
						virtualTranslate: !u.params.cssMode
					})
				});
			},
			function (e) {
				let { swiper: i, extendParams: t, on: a } = e;
				t({
					coverflowEffect: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						scale: 1,
						modifier: 1,
						slideShadows: !0
					}
				}),
					n({
						effect: "coverflow",
						swiper: i,
						on: a,
						setTranslate: () => {
							var { width: e, height: t, slides: o, slidesSizesGrid: d } = i,
								p = i.params.coverflowEffect,
								c = i.isHorizontal(),
								a = i.translate,
								u = c ? e / 2 - a : t / 2 - a,
								m = c ? p.rotate : -p.rotate,
								h = p.depth,
								v = y(i);
							for (let n = 0, e = o.length; n < e; n += 1) {
								var g = o[n],
									f = d[n],
									w = (u - g.swiperSlideOffset - f / 2) / f,
									w =
										"function" == typeof p.modifier
											? p.modifier(w)
											: w * p.modifier;
								let e = c ? m * w : 0,
									t = c ? 0 : m * w,
									a = -h * Math.abs(w),
									i = p.stretch,
									s =
										("string" == typeof i &&
											-1 !== i.indexOf("%") &&
											(i = (parseFloat(p.stretch) / 100) * f),
										c ? 0 : i * w),
									r = c ? i * w : 0,
									l = 1 - (1 - p.scale) * Math.abs(w);
								Math.abs(r) < 0.001 && (r = 0),
									Math.abs(s) < 0.001 && (s = 0),
									Math.abs(a) < 0.001 && (a = 0),
									Math.abs(e) < 0.001 && (e = 0),
									Math.abs(t) < 0.001 && (t = 0),
									Math.abs(l) < 0.001 && (l = 0);
								f = `translate3d(${r}px,${s}px,${a}px)  rotateX(${v(t)}deg) rotateY(${v(e)}deg) scale(${l})`;
								if (
									((x(0, g).style.transform = f),
									(g.style.zIndex = 1 - Math.abs(Math.round(w))),
									p.slideShadows)
								) {
									let e = c
											? g.querySelector(".swiper-slide-shadow-left")
											: g.querySelector(".swiper-slide-shadow-top"),
										t = c
											? g.querySelector(".swiper-slide-shadow-right")
											: g.querySelector(".swiper-slide-shadow-bottom");
									(e = e || E("coverflow", g, c ? "left" : "top")),
										(t = t || E("coverflow", g, c ? "right" : "bottom")),
										e && (e.style.opacity = 0 < w ? w : 0),
										t && (t.style.opacity = 0 < -w ? -w : 0);
								}
							}
						},
						setTransition: t => {
							i.slides
								.map(e => s(e))
								.forEach(e => {
									(e.style.transitionDuration = t + "ms"),
										e
											.querySelectorAll(
												".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
											)
											.forEach(e => {
												e.style.transitionDuration = t + "ms";
											});
								});
						},
						perspective: () => !0,
						overwriteParams: () => ({ watchSlidesProgress: !0 })
					});
			},
			function (e) {
				let { swiper: f, extendParams: t, on: a } = e;
				t({
					creativeEffect: {
						limitProgress: 1,
						shadowPerProgress: !1,
						progressMultiplier: 1,
						perspective: !0,
						prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
						next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 }
					}
				}),
					n({
						effect: "creative",
						swiper: f,
						on: a,
						setTranslate: () => {
							var { slides: n, wrapperEl: e, slidesSizesGrid: t } = f,
								o = f.params.creativeEffect;
							let d = o.progressMultiplier;
							var p = f.params.centeredSlides,
								c = y(f);
							p &&
								((t = t[0] / 2 - f.params.slidesOffsetBefore || 0),
								(e.style.transform = `translateX(calc(50% - ${t}px))`));
							for (let l = 0; l < n.length; l += 1) {
								var u = n[l],
									m = u.progress;
								let i = Math.min(
										Math.max(u.progress, -o.limitProgress),
										o.limitProgress
									),
									e = i;
								p ||
									(e = Math.min(
										Math.max(u.originalProgress, -o.limitProgress),
										o.limitProgress
									));
								var h = u.swiperSlideOffset;
								let a = [f.params.cssMode ? -h - f.translate : -h, 0, 0],
									s = [0, 0, 0],
									t = !1,
									r =
										(f.isHorizontal() || ((a[1] = a[0]), (a[0] = 0)),
										{
											translate: [0, 0, 0],
											rotate: [0, 0, 0],
											scale: 1,
											opacity: 1
										});
								i < 0
									? ((r = o.next), (t = !0))
									: 0 < i && ((r = o.prev), (t = !0)),
									a.forEach((e, t) => {
										a[t] =
											`calc(${e}px + (${((e = r.translate[t]), "string" == typeof e ? e : e + "px")} * ${Math.abs(i * d)}))`;
									}),
									s.forEach((e, t) => {
										var a = r.rotate[t] * Math.abs(i * d);
										s[t] = a;
									}),
									(u.style.zIndex = -Math.abs(Math.round(m)) + n.length);
								var h = a.join(", "),
									m = `rotateX(${c(s[0])}deg) rotateY(${c(s[1])}deg) rotateZ(${c(s[2])}deg)`,
									v =
										e < 0
											? `scale(${1 + (1 - r.scale) * e * d})`
											: `scale(${1 - (1 - r.scale) * e * d})`,
									g =
										e < 0
											? 1 + (1 - r.opacity) * e * d
											: 1 - (1 - r.opacity) * e * d,
									h = `translate3d(${h}) ${m} ` + v;
								if ((t && r.shadow) || !t) {
									let e = u.querySelector(".swiper-slide-shadow");
									(e = !e && r.shadow ? E("creative", u) : e) &&
										((m = o.shadowPerProgress ? i * (1 / o.limitProgress) : i),
										(e.style.opacity = Math.min(Math.max(Math.abs(m), 0), 1)));
								}
								v = x(0, u);
								(v.style.transform = h),
									(v.style.opacity = g),
									r.origin && (v.style.transformOrigin = r.origin);
							}
						},
						setTransition: t => {
							var e = f.slides.map(e => s(e));
							e.forEach(e => {
								(e.style.transitionDuration = t + "ms"),
									e.querySelectorAll(".swiper-slide-shadow").forEach(e => {
										e.style.transitionDuration = t + "ms";
									});
							}),
								v({ swiper: f, duration: t, transformElements: e, allSlides: !0 });
						},
						perspective: () => f.params.creativeEffect.perspective,
						overwriteParams: () => ({
							watchSlidesProgress: !0,
							virtualTranslate: !f.params.cssMode
						})
					});
			},
			function (e) {
				let { swiper: y, extendParams: t, on: a } = e;
				t({
					cardsEffect: {
						slideShadows: !0,
						rotate: !0,
						perSlideRotate: 2,
						perSlideOffset: 8
					}
				}),
					n({
						effect: "cards",
						swiper: y,
						on: a,
						setTranslate: () => {
							var { slides: n, activeIndex: o, rtlTranslate: d } = y,
								p = y.params.cardsEffect,
								{ startTranslate: c, isTouched: u } = y.touchEventsData,
								m = d ? -y.translate : y.translate;
							for (let l = 0; l < n.length; l += 1) {
								var h = n[l],
									v = h.progress,
									g = Math.min(Math.max(v, -4), 4);
								let e = h.swiperSlideOffset,
									t =
										(y.params.centeredSlides &&
											!y.params.cssMode &&
											(y.wrapperEl.style.transform = `translateX(${y.minTranslate()}px)`),
										y.params.centeredSlides &&
											y.params.cssMode &&
											(e -= n[0].swiperSlideOffset),
										y.params.cssMode ? -e - y.translate : -e),
									a = 0;
								var f = -100 * Math.abs(g);
								let i = 1,
									s = -p.perSlideRotate * g,
									r = p.perSlideOffset - 0.75 * Math.abs(g);
								var w =
										y.virtual && y.params.virtual.enabled
											? y.virtual.from + l
											: l,
									b =
										(w === o || w === o - 1) &&
										0 < g &&
										g < 1 &&
										(u || y.params.cssMode) &&
										m < c,
									w =
										(w === o || w === o + 1) &&
										g < 0 &&
										-1 < g &&
										(u || y.params.cssMode) &&
										c < m,
									b =
										((b || w) &&
											((b = (1 - Math.abs((Math.abs(g) - 0.5) / 0.5)) ** 0.5),
											(s += -28 * g * b),
											(i += -0.5 * b),
											(r += 96 * b),
											(a = -25 * b * Math.abs(g) + "%")),
										g < 0
											? (t = `calc(${t}px ${d ? "-" : "+"} (${r * Math.abs(g)}%))`)
											: 0 < g
												? (t = `calc(${t}px ${d ? "-" : "+"} (-${r * Math.abs(g)}%))`)
												: (t += "px"),
										y.isHorizontal() || ((w = a), (a = t), (t = w)),
										g < 0 ? "" + (1 + (1 - i) * g) : "" + (1 - (1 - i) * g)),
									w = `
          translate3d(${t}, ${a}, ${f}px)
          rotateZ(${p.rotate ? (d ? -s : s) : 0}deg)
          scale(${b})
        `;
								if (p.slideShadows) {
									let e = h.querySelector(".swiper-slide-shadow");
									(e = e || E("cards", h)) &&
										(e.style.opacity = Math.min(
											Math.max((Math.abs(g) - 0.5) / 0.5, 0),
											1
										));
								}
								(h.style.zIndex = -Math.abs(Math.round(v)) + n.length),
									(x(0, h).style.transform = w);
							}
						},
						setTransition: t => {
							var e = y.slides.map(e => s(e));
							e.forEach(e => {
								(e.style.transitionDuration = t + "ms"),
									e.querySelectorAll(".swiper-slide-shadow").forEach(e => {
										e.style.transitionDuration = t + "ms";
									});
							}),
								v({ swiper: y, duration: t, transformElements: e });
						},
						perspective: () => !0,
						overwriteParams: () => ({
							watchSlidesProgress: !0,
							virtualTranslate: !y.params.cssMode
						})
					});
			}
		]);
	let w = [
		"eventsPrefix",
		"injectStyles",
		"injectStylesUrls",
		"modules",
		"init",
		"_direction",
		"oneWayMovement",
		"swiperElementNodeName",
		"touchEventsTarget",
		"initialSlide",
		"_speed",
		"cssMode",
		"updateOnWindowResize",
		"resizeObserver",
		"nested",
		"focusableElements",
		"_enabled",
		"_width",
		"_height",
		"preventInteractionOnTransition",
		"userAgent",
		"url",
		"_edgeSwipeDetection",
		"_edgeSwipeThreshold",
		"_freeMode",
		"_autoHeight",
		"setWrapperSize",
		"virtualTranslate",
		"_effect",
		"breakpoints",
		"breakpointsBase",
		"_spaceBetween",
		"_slidesPerView",
		"maxBackfaceHiddenSlides",
		"_grid",
		"_slidesPerGroup",
		"_slidesPerGroupSkip",
		"_slidesPerGroupAuto",
		"_centeredSlides",
		"_centeredSlidesBounds",
		"_slidesOffsetBefore",
		"_slidesOffsetAfter",
		"normalizeSlideIndex",
		"_centerInsufficientSlides",
		"_watchOverflow",
		"roundLengths",
		"touchRatio",
		"touchAngle",
		"simulateTouch",
		"_shortSwipes",
		"_longSwipes",
		"longSwipesRatio",
		"longSwipesMs",
		"_followFinger",
		"allowTouchMove",
		"_threshold",
		"touchMoveStopPropagation",
		"touchStartPreventDefault",
		"touchStartForcePreventDefault",
		"touchReleaseOnEdges",
		"uniqueNavElements",
		"_resistance",
		"_resistanceRatio",
		"_watchSlidesProgress",
		"_grabCursor",
		"preventClicks",
		"preventClicksPropagation",
		"_slideToClickedSlide",
		"_loop",
		"loopAdditionalSlides",
		"loopAddBlankSlides",
		"loopPreventsSliding",
		"_rewind",
		"_allowSlidePrev",
		"_allowSlideNext",
		"_swipeHandler",
		"_noSwiping",
		"noSwipingClass",
		"noSwipingSelector",
		"passiveListeners",
		"containerModifierClass",
		"slideClass",
		"slideActiveClass",
		"slideVisibleClass",
		"slideFullyVisibleClass",
		"slideNextClass",
		"slidePrevClass",
		"slideBlankClass",
		"wrapperClass",
		"lazyPreloaderClass",
		"lazyPreloadPrevNext",
		"runCallbacksOnInit",
		"observer",
		"observeParents",
		"observeSlideChildren",
		"a11y",
		"_autoplay",
		"_controller",
		"coverflowEffect",
		"cubeEffect",
		"fadeEffect",
		"flipEffect",
		"creativeEffect",
		"cardsEffect",
		"hashNavigation",
		"history",
		"keyboard",
		"mousewheel",
		"_navigation",
		"_pagination",
		"parallax",
		"_scrollbar",
		"_thumbs",
		"virtual",
		"zoom",
		"control"
	];
	function I(e) {
		return (
			"object" == typeof e &&
			null !== e &&
			e.constructor &&
			"Object" === Object.prototype.toString.call(e).slice(8, -1) &&
			!e.__swiper__
		);
	}
	function re(t, a) {
		let i = ["__proto__", "constructor", "prototype"];
		Object.keys(a)
			.filter(e => i.indexOf(e) < 0)
			.forEach(e => {
				void 0 === t[e] ||
				!(I(a[e]) && I(t[e]) && 0 < Object.keys(a[e]).length) ||
				a[e].__swiper__
					? (t[e] = a[e])
					: re(t[e], a[e]);
			});
	}
	function O(e) {
		return (e = void 0 === e ? "" : e).replace(/-[a-z]/g, e =>
			e.toUpperCase().replace("-", "")
		);
	}
	let le = a => {
			if (parseFloat(a) === Number(a)) return Number(a);
			if ("true" === a) return !0;
			if ("" === a) return !0;
			if ("false" === a) return !1;
			if ("null" === a) return null;
			if ("undefined" !== a) {
				if ("string" == typeof a && a.includes("{") && a.includes("}") && a.includes('"')) {
					let t;
					try {
						t = JSON.parse(a);
					} catch (e) {
						t = a;
					}
					return t;
				}
				return a;
			}
		},
		ne = [
			"a11y",
			"autoplay",
			"controller",
			"cards-effect",
			"coverflow-effect",
			"creative-effect",
			"cube-effect",
			"fade-effect",
			"flip-effect",
			"free-mode",
			"grid",
			"hash-navigation",
			"history",
			"keyboard",
			"mousewheel",
			"navigation",
			"pagination",
			"parallax",
			"scrollbar",
			"thumbs",
			"virtual",
			"zoom"
		];
	function oe(t, e, a) {
		var i = {};
		let s = {};
		re(i, p);
		var r = [...w, "on"];
		let l = r.map(e => e.replace(/_/, ""));
		r.forEach(e => {
			(e = e.replace("_", "")), void 0 !== t[e] && (s[e] = t[e]);
		});
		r = [...t.attributes];
		return (
			"string" == typeof e && void 0 !== a && r.push({ name: e, value: I(a) ? { ...a } : a }),
			r.forEach(t => {
				var e,
					a = ne.find(e => t.name.startsWith(e + "-"));
				a
					? ((e = O(a)),
						(a = O(t.name.split(a + "-")[1])),
						void 0 === s[e] && (s[e] = {}),
						!0 === s[e] && (s[e] = { enabled: !0 }),
						(s[e][a] = le(t.value)))
					: ((e = O(t.name)),
						l.includes(e) &&
							((a = le(t.value)),
							s[e] && ne.includes(t.name) && !I(a)
								? (s[e].constructor !== Object && (s[e] = {}), (s[e].enabled = !!a))
								: (s[e] = a)));
			}),
			re(i, s),
			i.navigation
				? (i.navigation = {
						prevEl: ".swiper-button-prev",
						nextEl: ".swiper-button-next",
						...(!0 !== i.navigation ? i.navigation : {})
					})
				: !1 === i.navigation && delete i.navigation,
			i.scrollbar
				? (i.scrollbar = {
						el: ".swiper-scrollbar",
						...(!0 !== i.scrollbar ? i.scrollbar : {})
					})
				: !1 === i.scrollbar && delete i.scrollbar,
			i.pagination
				? (i.pagination = {
						el: ".swiper-pagination",
						...(!0 !== i.pagination ? i.pagination : {})
					})
				: !1 === i.pagination && delete i.pagination,
			{ params: i, passedParams: s }
		);
	}
	var de =
		"undefined" == typeof window || "undefined" == typeof HTMLElement ? class {} : HTMLElement;
	let pe = `<svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>
      `,
		ce = (e, t) => {
			var a;
			"undefined" != typeof CSSStyleSheet && e.adoptedStyleSheets
				? ((a = new CSSStyleSheet()).replaceSync(t), (e.adoptedStyleSheets = [a]))
				: (((a = document.createElement("style")).rel = "stylesheet"),
					(a.textContent = t),
					e.appendChild(a));
		};
	class ue extends de {
		constructor() {
			super(), this.attachShadow({ mode: "open" });
		}
		static get nextButtonSvg() {
			return pe;
		}
		static get prevButtonSvg() {
			return pe.replace(
				"/></svg>",
				' transform-origin="center" transform="rotate(180)"/></svg>'
			);
		}
		cssStyles() {
			return [
				":host{--swiper-theme-color:#007aff}:host{position:relative;display:block;margin-left:auto;margin-right:auto;z-index:1}.swiper{width:100%;height:100%;margin-left:auto;margin-right:auto;position:relative;overflow:hidden;list-style:none;padding:0;z-index:1;display:block}.swiper-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:flex;transition-property:transform;transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial);box-sizing:content-box}.swiper-android ::slotted(swiper-slide),.swiper-ios ::slotted(swiper-slide),.swiper-wrapper{transform:translate3d(0px,0,0)}.swiper-horizontal{touch-action:pan-y}.swiper-vertical{touch-action:pan-x}::slotted(swiper-slide){flex-shrink:0;width:100%;height:100%;position:relative;transition-property:transform;display:block}::slotted(.swiper-slide-invisible-blank){visibility:hidden}.swiper-autoheight,.swiper-autoheight ::slotted(swiper-slide){height:auto}.swiper-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-backface-hidden ::slotted(swiper-slide){transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden}.swiper-3d.swiper-css-mode .swiper-wrapper{perspective:1200px}.swiper-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-3d{perspective:1200px}.swiper-3d .swiper-cube-shadow,.swiper-3d ::slotted(swiper-slide){transform-style:preserve-3d}.swiper-css-mode>.swiper-wrapper{overflow:auto;scrollbar-width:none;-ms-overflow-style:none}.swiper-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-css-mode ::slotted(swiper-slide){scroll-snap-align:start start}.swiper-css-mode.swiper-horizontal>.swiper-wrapper{scroll-snap-type:x mandatory}.swiper-css-mode.swiper-vertical>.swiper-wrapper{scroll-snap-type:y mandatory}.swiper-css-mode.swiper-free-mode>.swiper-wrapper{scroll-snap-type:none}.swiper-css-mode.swiper-free-mode ::slotted(swiper-slide){scroll-snap-align:none}.swiper-css-mode.swiper-centered>.swiper-wrapper::before{content:'';flex-shrink:0;order:9999}.swiper-css-mode.swiper-centered ::slotted(swiper-slide){scroll-snap-align:center center;scroll-snap-stop:always}.swiper-css-mode.swiper-centered.swiper-horizontal ::slotted(swiper-slide):first-child{margin-inline-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-horizontal>.swiper-wrapper::before{height:100%;min-height:1px;width:var(--swiper-centered-offset-after)}.swiper-css-mode.swiper-centered.swiper-vertical ::slotted(swiper-slide):first-child{margin-block-start:var(--swiper-centered-offset-before)}.swiper-css-mode.swiper-centered.swiper-vertical>.swiper-wrapper::before{width:100%;min-width:1px;height:var(--swiper-centered-offset-after)}.swiper-virtual ::slotted(swiper-slide){-webkit-backface-visibility:hidden;transform:translateZ(0)}.swiper-virtual.swiper-css-mode .swiper-wrapper::after{content:'';position:absolute;left:0;top:0;pointer-events:none}.swiper-virtual.swiper-css-mode.swiper-horizontal .swiper-wrapper::after{height:1px;width:var(--swiper-virtual-size)}.swiper-virtual.swiper-css-mode.swiper-vertical .swiper-wrapper::after{width:1px;height:var(--swiper-virtual-size)}:host{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{position:absolute;top:var(--swiper-navigation-top-offset,50%);width:calc(var(--swiper-navigation-size)/ 44 * 27);height:var(--swiper-navigation-size);margin-top:calc(0px - (var(--swiper-navigation-size)/ 2));z-index:10;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--swiper-navigation-color,var(--swiper-theme-color))}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-next.swiper-button-hidden,.swiper-button-prev.swiper-button-hidden{opacity:0;cursor:auto;pointer-events:none}.swiper-navigation-disabled .swiper-button-next,.swiper-navigation-disabled .swiper-button-prev{display:none!important}.swiper-button-next svg,.swiper-button-prev svg{width:100%;height:100%;object-fit:contain;transform-origin:center}.swiper-rtl .swiper-button-next svg,.swiper-rtl .swiper-button-prev svg{transform:rotate(180deg)}.swiper-button-prev,.swiper-rtl .swiper-button-next{left:var(--swiper-navigation-sides-offset,10px);right:auto}.swiper-button-next,.swiper-rtl .swiper-button-prev{right:var(--swiper-navigation-sides-offset,10px);left:auto}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;transition:.3s opacity;transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-pagination-disabled>.swiper-pagination,.swiper-pagination.swiper-pagination-disabled{display:none!important}.swiper-horizontal>.swiper-pagination-bullets,.swiper-pagination-bullets.swiper-pagination-horizontal,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:var(--swiper-pagination-bottom,8px);top:var(--swiper-pagination-top,auto);left:0;width:100%}.swiper-pagination-bullets-dynamic{overflow:hidden;font-size:0}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transform:scale(.33);position:relative}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{width:var(--swiper-pagination-bullet-width,var(--swiper-pagination-bullet-size,8px));height:var(--swiper-pagination-bullet-height,var(--swiper-pagination-bullet-size,8px));display:inline-block;border-radius:var(--swiper-pagination-bullet-border-radius,50%);background:var(--swiper-pagination-bullet-inactive-color,#000);opacity:var(--swiper-pagination-bullet-inactive-opacity, .2)}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{opacity:var(--swiper-pagination-bullet-opacity, 1);background:var(--swiper-pagination-color,var(--swiper-theme-color))}.swiper-pagination-vertical.swiper-pagination-bullets,.swiper-vertical>.swiper-pagination-bullets{right:var(--swiper-pagination-right,8px);left:var(--swiper-pagination-left,auto);top:50%;transform:translate3d(0px,-50%,0)}.swiper-pagination-vertical.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:var(--swiper-pagination-bullet-vertical-gap,6px) 0;display:block}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-pagination-vertical.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:.2s transform,.2s top}.swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 var(--swiper-pagination-bullet-horizontal-gap,4px)}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translateX(-50%);white-space:nowrap}.swiper-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet,.swiper-pagination-horizontal.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s left}.swiper-horizontal.swiper-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:.2s transform,.2s right}.swiper-pagination-fraction{color:var(--swiper-pagination-fraction-color,inherit)}.swiper-pagination-progressbar{background:var(--swiper-pagination-progressbar-bg-color,rgba(0,0,0,.25));position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));position:absolute;left:0;top:0;width:100%;height:100%;transform:scale(0);transform-origin:left top}.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-horizontal>.swiper-pagination-progressbar,.swiper-pagination-progressbar.swiper-pagination-horizontal,.swiper-pagination-progressbar.swiper-pagination-vertical.swiper-pagination-progressbar-opposite,.swiper-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{width:100%;height:var(--swiper-pagination-progressbar-size,4px);left:0;top:0}.swiper-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-horizontal.swiper-pagination-progressbar-opposite,.swiper-pagination-progressbar.swiper-pagination-vertical,.swiper-vertical>.swiper-pagination-progressbar{width:var(--swiper-pagination-progressbar-size,4px);height:100%;left:0;top:0}.swiper-pagination-lock{display:none}.swiper-scrollbar{border-radius:var(--swiper-scrollbar-border-radius,10px);position:relative;touch-action:none;background:var(--swiper-scrollbar-bg-color,rgba(0,0,0,.1))}.swiper-scrollbar-disabled>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-disabled{display:none!important}.swiper-horizontal>.swiper-scrollbar,.swiper-scrollbar.swiper-scrollbar-horizontal{position:absolute;left:var(--swiper-scrollbar-sides-offset,1%);bottom:var(--swiper-scrollbar-bottom,4px);top:var(--swiper-scrollbar-top,auto);z-index:50;height:var(--swiper-scrollbar-size,4px);width:calc(100% - 2 * var(--swiper-scrollbar-sides-offset,1%))}.swiper-scrollbar.swiper-scrollbar-vertical,.swiper-vertical>.swiper-scrollbar{position:absolute;left:var(--swiper-scrollbar-left,auto);right:var(--swiper-scrollbar-right,4px);top:var(--swiper-scrollbar-sides-offset,1%);z-index:50;width:var(--swiper-scrollbar-size,4px);height:calc(100% - 2 * var(--swiper-scrollbar-sides-offset,1%))}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:var(--swiper-scrollbar-drag-bg-color,rgba(0,0,0,.5));border-radius:var(--swiper-scrollbar-border-radius,10px);left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}::slotted(.swiper-slide-zoomed){cursor:move;touch-action:none}.swiper .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-free-mode>.swiper-wrapper{transition-timing-function:ease-out;margin:0 auto}.swiper-grid>.swiper-wrapper{flex-wrap:wrap}.swiper-grid-column>.swiper-wrapper{flex-wrap:wrap;flex-direction:column}.swiper-fade.swiper-free-mode ::slotted(swiper-slide){transition-timing-function:ease-out}.swiper-fade ::slotted(swiper-slide){pointer-events:none;transition-property:opacity}.swiper-fade ::slotted(swiper-slide) ::slotted(swiper-slide){pointer-events:none}.swiper-fade ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-fade ::slotted(.swiper-slide-active) ::slotted(.swiper-slide-active){pointer-events:auto}.swiper.swiper-cube{overflow:visible}.swiper-cube ::slotted(swiper-slide){pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1;visibility:hidden;transform-origin:0 0;width:100%;height:100%}.swiper-cube ::slotted(swiper-slide) ::slotted(swiper-slide){pointer-events:none}.swiper-cube.swiper-rtl ::slotted(swiper-slide){transform-origin:100% 0}.swiper-cube ::slotted(.swiper-slide-active),.swiper-cube ::slotted(.swiper-slide-active) ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-cube ::slotted(.swiper-slide-active),.swiper-cube ::slotted(.swiper-slide-next),.swiper-cube ::slotted(.swiper-slide-prev){pointer-events:auto;visibility:visible}.swiper-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0px;width:100%;height:100%;opacity:.6;z-index:0}.swiper-cube .swiper-cube-shadow:before{content:'';background:#000;position:absolute;left:0;top:0;bottom:0;right:0;filter:blur(50px)}.swiper-cube ::slotted(.swiper-slide-next)+::slotted(swiper-slide){pointer-events:auto;visibility:visible}.swiper.swiper-flip{overflow:visible}.swiper-flip ::slotted(swiper-slide){pointer-events:none;-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-flip ::slotted(swiper-slide) ::slotted(swiper-slide){pointer-events:none}.swiper-flip ::slotted(.swiper-slide-active),.swiper-flip ::slotted(.swiper-slide-active) ::slotted(.swiper-slide-active){pointer-events:auto}.swiper-creative ::slotted(swiper-slide){-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden;transition-property:transform,opacity,height}.swiper.swiper-cards{overflow:visible}.swiper-cards ::slotted(swiper-slide){transform-origin:center bottom;-webkit-backface-visibility:hidden;backface-visibility:hidden;overflow:hidden}",
				...(this.injectStyles && Array.isArray(this.injectStyles) ? this.injectStyles : [])
			].join("\n");
		}
		cssLinks() {
			return this.injectStylesUrls || [];
		}
		calcSlideSlots() {
			var t = this.slideSlots || 0,
				e = [...this.querySelectorAll("[slot^=slide-]")].map(e =>
					parseInt(e.getAttribute("slot").split("slide-")[1], 10)
				);
			if (((this.slideSlots = e.length ? Math.max(...e) + 1 : 0), this.rendered))
				if (this.slideSlots > t)
					for (let e = t; e < this.slideSlots; e += 1) {
						var a = document.createElement("swiper-slide"),
							i =
								(a.setAttribute("part", "slide slide-" + (e + 1)),
								document.createElement("slot"));
						i.setAttribute("name", "slide-" + (e + 1)),
							a.appendChild(i),
							this.shadowRoot.querySelector(".swiper-wrapper").appendChild(a);
					}
				else if (this.slideSlots < t) {
					var s = this.swiper.slides;
					for (let e = s.length - 1; 0 <= e; --e) e > this.slideSlots && s[e].remove();
				}
		}
		render() {
			if (!this.rendered) {
				this.calcSlideSlots();
				let e = this.cssStyles();
				(e = 0 < this.slideSlots ? e.replace(/::slotted\(([a-z-0-9.]*)\)/g, "$1") : e)
					.length && ce(this.shadowRoot, e),
					this.cssLinks().forEach(e => {
						var t;
						this.shadowRoot.querySelector(`link[href="${e}"]`) ||
							(((t = document.createElement("link")).rel = "stylesheet"),
							(t.href = e),
							this.shadowRoot.appendChild(t));
					});
				var t,
					a = document.createElement("div");
				a.classList.add("swiper"),
					(a.part = "container"),
					(a.innerHTML = `
        <slot name="container-start"></slot>
        <div class="swiper-wrapper" part="wrapper">
          <slot></slot>
          ${Array.from({ length: this.slideSlots })
				.map(
					(e, t) => `
          <swiper-slide part="slide slide-${t}">
            <slot name="slide-${t}"></slot>
          </swiper-slide>
          `
				)
				.join("")}
        </div>
        <slot name="container-end"></slot>
        ${
			((t = this.passedParams),
			(t = void 0 === t ? {} : t).navigation &&
			void 0 === t.navigation.nextEl &&
			void 0 === t.navigation.prevEl
				? `
          <div part="button-prev" class="swiper-button-prev">${this.constructor.prevButtonSvg}</div>
          <div part="button-next" class="swiper-button-next">${this.constructor.nextButtonSvg}</div>
        `
				: "")
		}
        ${
			((t = this.passedParams),
			(t = void 0 === t ? {} : t).pagination && void 0 === t.pagination.el
				? `
          <div part="pagination" class="swiper-pagination"></div>
        `
				: "")
		}
        ${
			((t = this.passedParams),
			(t = void 0 === t ? {} : t).scrollbar && void 0 === t.scrollbar.el
				? `
          <div part="scrollbar" class="swiper-scrollbar"></div>
        `
				: "")
		}
      `),
					this.shadowRoot.appendChild(a),
					(this.rendered = !0);
			}
		}
		initialize() {
			var l = this;
			if (!this.initialized) {
				this.initialized = !0;
				let { params: r, passedParams: e } = oe(this);
				(this.swiperParams = r),
					(this.passedParams = e),
					delete this.swiperParams.init,
					this.render(),
					(this.swiper = new h(this.shadowRoot.querySelector(".swiper"), {
						...(r.virtual ? {} : { observer: !0 }),
						...r,
						touchEventsTarget: "container",
						onAny: function (e) {
							"observerUpdate" === e && l.calcSlideSlots();
							for (
								var t = r.eventsPrefix
										? "" + r.eventsPrefix + e.toLowerCase()
										: e.toLowerCase(),
									a = arguments.length,
									i = new Array(1 < a ? a - 1 : 0),
									s = 1;
								s < a;
								s++
							)
								i[s - 1] = arguments[s];
							t = new CustomEvent(t, {
								detail: i,
								bubbles: "hashChange" !== e,
								cancelable: !0
							});
							l.dispatchEvent(t);
						}
					}));
			}
		}
		connectedCallback() {
			(this.initialized &&
				this.nested &&
				this.closest("swiper-slide") &&
				this.closest("swiper-slide").swiperLoopMoveDOM) ||
				(!1 !== this.init && "false" !== this.getAttribute("init") && this.initialize());
		}
		disconnectedCallback() {
			(this.nested &&
				this.closest("swiper-slide") &&
				this.closest("swiper-slide").swiperLoopMoveDOM) ||
				(this.swiper && this.swiper.destroy && this.swiper.destroy(),
				(this.initialized = !1));
		}
		updateSwiperOnPropChange(S, e) {
			var { params: T, passedParams: M } = oe(this, S, e);
			if (
				((this.passedParams = M),
				(this.swiperParams = T),
				!this.swiper || this.swiper.params[S] !== e)
			) {
				T = {
					swiper: this.swiper,
					passedParams: this.passedParams,
					changedParams: [O(S)],
					...("navigation" === S && M[S]
						? { prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }
						: {}),
					...("pagination" === S && M[S] ? { paginationEl: ".swiper-pagination" } : {}),
					...("scrollbar" === S && M[S] ? { scrollbarEl: ".swiper-scrollbar" } : {})
				};
				let {
						swiper: t,
						slides: e,
						passedParams: a,
						changedParams: i,
						nextEl: s,
						prevEl: r,
						scrollbarEl: l,
						paginationEl: n
					} = T,
					{
						params: o,
						pagination: d,
						navigation: p,
						scrollbar: c,
						virtual: u,
						thumbs: m
					} = ((T = i.filter(
						e => "children" !== e && "direction" !== e && "wrapperClass" !== e
					)),
					t),
					h,
					v,
					g,
					f,
					w,
					b,
					y,
					x,
					E =
						(i.includes("thumbs") &&
							a.thumbs &&
							a.thumbs.swiper &&
							!a.thumbs.swiper.destroyed &&
							o.thumbs &&
							(!o.thumbs.swiper || o.thumbs.swiper.destroyed) &&
							(h = !0),
						i.includes("controller") &&
							a.controller &&
							a.controller.control &&
							o.controller &&
							!o.controller.control &&
							(v = !0),
						i.includes("pagination") &&
							a.pagination &&
							(a.pagination.el || n) &&
							(o.pagination || !1 === o.pagination) &&
							d &&
							!d.el &&
							(g = !0),
						i.includes("scrollbar") &&
							a.scrollbar &&
							(a.scrollbar.el || l) &&
							(o.scrollbar || !1 === o.scrollbar) &&
							c &&
							!c.el &&
							(f = !0),
						i.includes("navigation") &&
							a.navigation &&
							(a.navigation.prevEl || r) &&
							(a.navigation.nextEl || s) &&
							(o.navigation || !1 === o.navigation) &&
							p &&
							!p.prevEl &&
							!p.nextEl &&
							(w = !0),
						e => {
							t[e] &&
								(t[e].destroy(),
								"navigation" === e
									? (t.isElement && (t[e].prevEl.remove(), t[e].nextEl.remove()),
										(o[e].prevEl = void 0),
										(o[e].nextEl = void 0),
										(t[e].prevEl = void 0),
										(t[e].nextEl = void 0))
									: (t.isElement && t[e].el.remove(),
										(o[e].el = void 0),
										(t[e].el = void 0)));
						});
				i.includes("loop") &&
					t.isElement &&
					(o.loop && !a.loop ? (b = !0) : !o.loop && a.loop ? (y = !0) : (x = !0)),
					T.forEach(e => {
						var t;
						I(o[e]) && I(a[e])
							? (Object.assign(o[e], a[e]),
								("navigation" === e || "pagination" === e || "scrollbar" === e) &&
									"enabled" in a[e] &&
									!a[e].enabled &&
									E(e))
							: (!0 !== (t = a[e]) && !1 !== t) ||
								  ("navigation" !== e && "pagination" !== e && "scrollbar" !== e)
								? (o[e] = a[e])
								: !1 === t && E(e);
					}),
					T.includes("controller") &&
						!v &&
						t.controller &&
						t.controller.control &&
						o.controller &&
						o.controller.control &&
						(t.controller.control = o.controller.control),
					i.includes("children") && e && u && o.virtual.enabled
						? ((u.slides = e), u.update(!0))
						: i.includes("virtual") &&
							u &&
							o.virtual.enabled &&
							(e && (u.slides = e), u.update(!0)),
					i.includes("children") && e && o.loop && (x = !0),
					h && m.init() && m.update(!0),
					v && (t.controller.control = o.controller.control),
					g &&
						(!t.isElement ||
							(n && "string" != typeof n) ||
							((n = document.createElement("div")).classList.add("swiper-pagination"),
							n.part.add("pagination"),
							t.el.appendChild(n)),
						n && (o.pagination.el = n),
						d.init(),
						d.render(),
						d.update()),
					f &&
						(!t.isElement ||
							(l && "string" != typeof l) ||
							((l = document.createElement("div")).classList.add("swiper-scrollbar"),
							l.part.add("scrollbar"),
							t.el.appendChild(l)),
						l && (o.scrollbar.el = l),
						c.init(),
						c.updateSize(),
						c.setTranslate()),
					w &&
						(t.isElement &&
							((s && "string" != typeof s) ||
								((s = document.createElement("div")).classList.add(
									"swiper-button-next"
								),
								(s.innerHTML = t.hostEl.constructor.nextButtonSvg),
								s.part.add("button-next"),
								t.el.appendChild(s)),
							(r && "string" != typeof r) ||
								((r = document.createElement("div")).classList.add(
									"swiper-button-prev"
								),
								(r.innerHTML = t.hostEl.constructor.prevButtonSvg),
								r.part.add("button-prev"),
								t.el.appendChild(r))),
						s && (o.navigation.nextEl = s),
						r && (o.navigation.prevEl = r),
						p.init(),
						p.update()),
					i.includes("allowSlideNext") && (t.allowSlideNext = a.allowSlideNext),
					i.includes("allowSlidePrev") && (t.allowSlidePrev = a.allowSlidePrev),
					i.includes("direction") && t.changeDirection(a.direction, !1),
					(b || x) && t.loopDestroy(),
					(y || x) && t.loopCreate(),
					t.update();
			}
		}
		attributeChangedCallback(e, t, a) {
			this.initialized &&
				this.updateSwiperOnPropChange(e, (a = "true" === t && null === a ? !1 : a));
		}
		static get observedAttributes() {
			return w
				.filter(e => e.includes("_"))
				.map(e =>
					e
						.replace(/[A-Z]/g, e => "-" + e)
						.replace("_", "")
						.toLowerCase()
				);
		}
	}
	w.forEach(t => {
		"init" !== t &&
			((t = t.replace("_", "")),
			Object.defineProperty(ue.prototype, t, {
				configurable: !0,
				get() {
					return (this.passedParams || {})[t];
				},
				set(e) {
					this.passedParams || (this.passedParams = {}),
						(this.passedParams[t] = e),
						this.initialized && this.updateSwiperOnPropChange(t, e);
				}
			}));
	});
	class me extends de {
		constructor() {
			super(), this.attachShadow({ mode: "open" });
		}
		render() {
			var e =
				this.lazy ||
				"" === this.getAttribute("lazy") ||
				"true" === this.getAttribute("lazy");
			ce(
				this.shadowRoot,
				"::slotted(.swiper-slide-shadow),::slotted(.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-top){position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}::slotted(.swiper-slide-shadow){background:rgba(0,0,0,.15)}::slotted(.swiper-slide-shadow-left){background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}::slotted(.swiper-slide-shadow-right){background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}::slotted(.swiper-slide-shadow-top){background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}::slotted(.swiper-slide-shadow-bottom){background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-lazy-preloader{animation:swiper-preloader-spin 1s infinite linear;width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;transform-origin:50%;box-sizing:border-box;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top-color:transparent}@keyframes swiper-preloader-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-cube.swiper-slide-shadow-top){z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-bottom),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-left),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-right),::slotted(.swiper-slide-shadow-flip.swiper-slide-shadow-top){z-index:0;-webkit-backface-visibility:hidden;backface-visibility:hidden}::slotted(.swiper-zoom-container){width:100%;height:100%;display:flex;justify-content:center;align-items:center;text-align:center}::slotted(.swiper-zoom-container)>canvas,::slotted(.swiper-zoom-container)>img,::slotted(.swiper-zoom-container)>svg{max-width:100%;max-height:100%;object-fit:contain}"
			),
				this.shadowRoot.appendChild(document.createElement("slot")),
				e &&
					((e = document.createElement("div")).classList.add("swiper-lazy-preloader"),
					e.part.add("preloader"),
					this.shadowRoot.appendChild(e));
		}
		initialize() {
			this.render();
		}
		connectedCallback() {
			this.initialize();
		}
	}
	"undefined" != typeof window &&
		(window.SwiperElementRegisterParams = e => {
			w.push(...e);
		}),
		"undefined" == typeof window ||
			(window.customElements.get("swiper-container") ||
				window.customElements.define("swiper-container", ue),
			window.customElements.get("swiper-slide")) ||
			window.customElements.define("swiper-slide", me);
})();
