window.axios = (() => {
	function U(t, e) {
		var r,
			n = Object.keys(t);
		return (
			Object.getOwnPropertySymbols &&
				((r = Object.getOwnPropertySymbols(t)),
				e &&
					(r = r.filter(function (e) {
						return Object.getOwnPropertyDescriptor(t, e).enumerable;
					})),
				n.push.apply(n, r)),
			n
		);
	}
	function D(n) {
		for (var e = 1; e < arguments.length; e++) {
			var o = null != arguments[e] ? arguments[e] : {};
			e % 2
				? U(Object(o), !0).forEach(function (e) {
						var t, r;
						(t = n),
							(r = o[(e = e)]),
							e in t
								? Object.defineProperty(t, e, {
										value: r,
										enumerable: !0,
										configurable: !0,
										writable: !0
									})
								: (t[e] = r);
					})
				: Object.getOwnPropertyDescriptors
					? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o))
					: U(Object(o)).forEach(function (e) {
							Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e));
						});
		}
		return n;
	}
	function S() {
		S = function () {
			return a;
		};
		var a = {},
			e = Object.prototype,
			u = e.hasOwnProperty,
			t = "function" == typeof Symbol ? Symbol : {},
			n = t.iterator || "@@iterator",
			r = t.asyncIterator || "@@asyncIterator",
			o = t.toStringTag || "@@toStringTag";
		function i(e, t, r) {
			return (
				Object.defineProperty(e, t, {
					value: r,
					enumerable: !0,
					configurable: !0,
					writable: !0
				}),
				e[t]
			);
		}
		try {
			i({}, "");
		} catch (e) {
			i = function (e, t, r) {
				return (e[t] = r);
			};
		}
		function s(e, t, r, n) {
			var o,
				i,
				a,
				s,
				t = t && t.prototype instanceof f ? t : f,
				t = Object.create(t.prototype),
				n = new w(n || []);
			return (
				(t._invoke =
					((o = e),
					(i = r),
					(a = n),
					(s = "suspendedStart"),
					function (e, t) {
						if ("executing" === s) throw new Error("Generator is already running");
						if ("completed" === s) {
							if ("throw" === e) throw t;
							return O();
						}
						for (a.method = e, a.arg = t; ; ) {
							var r = a.delegate;
							if (r) {
								r = (function e(t, r) {
									var n = t.iterator[r.method];
									if (void 0 === n) {
										if (((r.delegate = null), "throw" === r.method)) {
											if (
												t.iterator.return &&
												((r.method = "return"),
												(r.arg = void 0),
												e(t, r),
												"throw" === r.method)
											)
												return l;
											(r.method = "throw"),
												(r.arg = new TypeError(
													"The iterator does not provide a 'throw' method"
												));
										}
										return l;
									}
									n = c(n, t.iterator, r.arg);
									if ("throw" === n.type)
										return (
											(r.method = "throw"),
											(r.arg = n.arg),
											(r.delegate = null),
											l
										);
									n = n.arg;
									return n
										? n.done
											? ((r[t.resultName] = n.value),
												(r.next = t.nextLoc),
												"return" !== r.method &&
													((r.method = "next"), (r.arg = void 0)),
												(r.delegate = null),
												l)
											: n
										: ((r.method = "throw"),
											(r.arg = new TypeError(
												"iterator result is not an object"
											)),
											(r.delegate = null),
											l);
								})(r, a);
								if (r) {
									if (r === l) continue;
									return r;
								}
							}
							if ("next" === a.method) a.sent = a._sent = a.arg;
							else if ("throw" === a.method) {
								if ("suspendedStart" === s) throw ((s = "completed"), a.arg);
								a.dispatchException(a.arg);
							} else "return" === a.method && a.abrupt("return", a.arg);
							s = "executing";
							r = c(o, i, a);
							if ("normal" === r.type) {
								if (((s = a.done ? "completed" : "suspendedYield"), r.arg === l))
									continue;
								return { value: r.arg, done: a.done };
							}
							"throw" === r.type &&
								((s = "completed"), (a.method = "throw"), (a.arg = r.arg));
						}
					})),
				t
			);
		}
		function c(e, t, r) {
			try {
				return { type: "normal", arg: e.call(t, r) };
			} catch (e) {
				return { type: "throw", arg: e };
			}
		}
		a.wrap = s;
		var l = {};
		function f() {}
		function h() {}
		function d() {}
		var t = {},
			p =
				(i(t, n, function () {
					return this;
				}),
				Object.getPrototypeOf),
			p = p && p(p(E([]))),
			y =
				(p && p !== e && u.call(p, n) && (t = p),
				(d.prototype = f.prototype = Object.create(t)));
		function m(e) {
			["next", "throw", "return"].forEach(function (t) {
				i(e, t, function (e) {
					return this._invoke(t, e);
				});
			});
		}
		function v(a, s) {
			var t;
			this._invoke = function (r, n) {
				function e() {
					return new s(function (e, t) {
						!(function t(e, r, n, o) {
							var i,
								e = c(a[e], a, r);
							if ("throw" !== e.type)
								return (r = (i = e.arg).value) &&
									"object" == typeof r &&
									u.call(r, "__await")
									? s.resolve(r.__await).then(
											function (e) {
												t("next", e, n, o);
											},
											function (e) {
												t("throw", e, n, o);
											}
										)
									: s.resolve(r).then(
											function (e) {
												(i.value = e), n(i);
											},
											function (e) {
												return t("throw", e, n, o);
											}
										);
							o(e.arg);
						})(r, n, e, t);
					});
				}
				return (t = t ? t.then(e, e) : e());
			};
		}
		function g(e) {
			var t = { tryLoc: e[0] };
			1 in e && (t.catchLoc = e[1]),
				2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
				this.tryEntries.push(t);
		}
		function b(e) {
			var t = e.completion || {};
			(t.type = "normal"), delete t.arg, (e.completion = t);
		}
		function w(e) {
			(this.tryEntries = [{ tryLoc: "root" }]), e.forEach(g, this), this.reset(!0);
		}
		function E(t) {
			if (t) {
				var r,
					e = t[n];
				if (e) return e.call(t);
				if ("function" == typeof t.next) return t;
				if (!isNaN(t.length))
					return (
						(r = -1),
						((e = function e() {
							for (; ++r < t.length; )
								if (u.call(t, r)) return (e.value = t[r]), (e.done = !1), e;
							return (e.value = void 0), (e.done = !0), e;
						}).next = e)
					);
			}
			return { next: O };
		}
		function O() {
			return { value: void 0, done: !0 };
		}
		return (
			i(y, "constructor", (h.prototype = d)),
			i(d, "constructor", h),
			(h.displayName = i(d, o, "GeneratorFunction")),
			(a.isGeneratorFunction = function (e) {
				e = "function" == typeof e && e.constructor;
				return !!e && (e === h || "GeneratorFunction" === (e.displayName || e.name));
			}),
			(a.mark = function (e) {
				return (
					Object.setPrototypeOf
						? Object.setPrototypeOf(e, d)
						: ((e.__proto__ = d), i(e, o, "GeneratorFunction")),
					(e.prototype = Object.create(y)),
					e
				);
			}),
			(a.awrap = function (e) {
				return { __await: e };
			}),
			m(v.prototype),
			i(v.prototype, r, function () {
				return this;
			}),
			(a.AsyncIterator = v),
			(a.async = function (e, t, r, n, o) {
				void 0 === o && (o = Promise);
				var i = new v(s(e, t, r, n), o);
				return a.isGeneratorFunction(t)
					? i
					: i.next().then(function (e) {
							return e.done ? e.value : i.next();
						});
			}),
			m(y),
			i(y, o, "Generator"),
			i(y, n, function () {
				return this;
			}),
			i(y, "toString", function () {
				return "[object Generator]";
			}),
			(a.keys = function (r) {
				var e,
					n = [];
				for (e in r) n.push(e);
				return (
					n.reverse(),
					function e() {
						for (; n.length; ) {
							var t = n.pop();
							if (t in r) return (e.value = t), (e.done = !1), e;
						}
						return (e.done = !0), e;
					}
				);
			}),
			(a.values = E),
			(w.prototype = {
				constructor: w,
				reset: function (e) {
					if (
						((this.prev = 0),
						(this.next = 0),
						(this.sent = this._sent = void 0),
						(this.done = !1),
						(this.delegate = null),
						(this.method = "next"),
						(this.arg = void 0),
						this.tryEntries.forEach(b),
						!e)
					)
						for (var t in this)
							"t" === t.charAt(0) &&
								u.call(this, t) &&
								!isNaN(+t.slice(1)) &&
								(this[t] = void 0);
				},
				stop: function () {
					this.done = !0;
					var e = this.tryEntries[0].completion;
					if ("throw" === e.type) throw e.arg;
					return this.rval;
				},
				dispatchException: function (r) {
					if (this.done) throw r;
					var n = this;
					function e(e, t) {
						return (
							(i.type = "throw"),
							(i.arg = r),
							(n.next = e),
							t && ((n.method = "next"), (n.arg = void 0)),
							!!t
						);
					}
					for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
						var o = this.tryEntries[t],
							i = o.completion;
						if ("root" === o.tryLoc) return e("end");
						if (o.tryLoc <= this.prev) {
							var a = u.call(o, "catchLoc"),
								s = u.call(o, "finallyLoc");
							if (a && s) {
								if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
								if (this.prev < o.finallyLoc) return e(o.finallyLoc);
							} else if (a) {
								if (this.prev < o.catchLoc) return e(o.catchLoc, !0);
							} else {
								if (!s) throw new Error("try statement without catch or finally");
								if (this.prev < o.finallyLoc) return e(o.finallyLoc);
							}
						}
					}
				},
				abrupt: function (e, t) {
					for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
						var n = this.tryEntries[r];
						if (
							n.tryLoc <= this.prev &&
							u.call(n, "finallyLoc") &&
							this.prev < n.finallyLoc
						) {
							var o = n;
							break;
						}
					}
					var i = (o =
						o &&
						("break" === e || "continue" === e) &&
						o.tryLoc <= t &&
						t <= o.finallyLoc
							? null
							: o)
						? o.completion
						: {};
					return (
						(i.type = e),
						(i.arg = t),
						o
							? ((this.method = "next"), (this.next = o.finallyLoc), l)
							: this.complete(i)
					);
				},
				complete: function (e, t) {
					if ("throw" === e.type) throw e.arg;
					return (
						"break" === e.type || "continue" === e.type
							? (this.next = e.arg)
							: "return" === e.type
								? ((this.rval = this.arg = e.arg),
									(this.method = "return"),
									(this.next = "end"))
								: "normal" === e.type && t && (this.next = t),
						l
					);
				},
				finish: function (e) {
					for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
						var r = this.tryEntries[t];
						if (r.finallyLoc === e)
							return this.complete(r.completion, r.afterLoc), b(r), l;
					}
				},
				catch: function (e) {
					for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
						var r,
							n,
							o = this.tryEntries[t];
						if (o.tryLoc === e)
							return "throw" === (r = o.completion).type && ((n = r.arg), b(o)), n;
					}
					throw new Error("illegal catch attempt");
				},
				delegateYield: function (e, t, r) {
					return (
						(this.delegate = { iterator: E(e), resultName: t, nextLoc: r }),
						"next" === this.method && (this.arg = void 0),
						l
					);
				}
			}),
			a
		);
	}
	function h(e) {
		return (h =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (e) {
						return typeof e;
					}
				: function (e) {
						return e &&
							"function" == typeof Symbol &&
							e.constructor === Symbol &&
							e !== Symbol.prototype
							? "symbol"
							: typeof e;
					})(e);
	}
	function B(e, t, r, n, o, i, a) {
		try {
			var s = e[i](a),
				u = s.value;
		} catch (e) {
			return void r(e);
		}
		s.done ? t(u) : Promise.resolve(u).then(n, o);
	}
	function i(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
	}
	function I(e, t) {
		for (var r = 0; r < t.length; r++) {
			var n = t[r];
			(n.enumerable = n.enumerable || !1),
				(n.configurable = !0),
				"value" in n && (n.writable = !0),
				Object.defineProperty(e, n.key, n);
		}
	}
	function n(e, t, r) {
		t && I(e.prototype, t),
			r && I(e, r),
			Object.defineProperty(e, "prototype", { writable: !1 });
	}
	function c(e, t) {
		return (
			z(e) ||
			((e, t) => {
				var r =
					null == e
						? null
						: ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
				if (null != r) {
					var n,
						o,
						i = [],
						a = !0,
						s = !1;
					try {
						for (
							r = r.call(e);
							!(a = (n = r.next()).done) && (i.push(n.value), !t || i.length !== t);
							a = !0
						);
					} catch (e) {
						(s = !0), (o = e);
					} finally {
						try {
							a || null == r.return || r.return();
						} finally {
							if (s) throw o;
						}
					}
					return i;
				}
			})(e, t) ||
			d(e, t) ||
			H()
		);
	}
	function q(e) {
		return (
			(e => {
				if (Array.isArray(e)) return o(e);
			})(e) ||
			M(e) ||
			d(e) ||
			(() => {
				throw new TypeError(
					"Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
				);
			})()
		);
	}
	function z(e) {
		if (Array.isArray(e)) return e;
	}
	function M(e) {
		if (("undefined" != typeof Symbol && null != e[Symbol.iterator]) || null != e["@@iterator"])
			return Array.from(e);
	}
	function d(e, t) {
		var r;
		if (e)
			return "string" == typeof e
				? o(e, t)
				: "Map" ===
							(r =
								"Object" === (r = Object.prototype.toString.call(e).slice(8, -1)) &&
								e.constructor
									? e.constructor.name
									: r) || "Set" === r
					? Array.from(e)
					: "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
						? o(e, t)
						: void 0;
	}
	function o(e, t) {
		(null == t || t > e.length) && (t = e.length);
		for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
		return n;
	}
	function H() {
		throw new TypeError(
			"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
		);
	}
	function J(e, t) {
		return function () {
			return e.apply(t, arguments);
		};
	}
	function e(t) {
		return (
			(t = t.toLowerCase()),
			function (e) {
				return r(e) === t;
			}
		);
	}
	function t(t) {
		return function (e) {
			return h(e) === t;
		};
	}
	var G = Object.prototype.toString,
		u = Object.getPrototypeOf,
		r = (t =>
			function (e) {
				e = G.call(e);
				return t[e] || (t[e] = e.slice(8, -1).toLowerCase());
			})(Object.create(null)),
		l = Array.isArray,
		a = t("undefined");
	var W = e("ArrayBuffer");
	function s(e) {
		return null !== e && "object" === h(e);
	}
	function f(e) {
		var t;
		return (
			"object" === r(e) &&
			!(
				(null !== (t = u(e)) &&
					t !== Object.prototype &&
					null !== Object.getPrototypeOf(t)) ||
				Symbol.toStringTag in e ||
				Symbol.iterator in e
			)
		);
	}
	var K = t("string"),
		p = t("function"),
		V = t("number"),
		X = e("Date"),
		$ = e("File"),
		y = e("Blob"),
		Q = e("FileList"),
		Y = e("URLSearchParams");
	function m(e, t) {
		var r,
			n = (2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}).allOwnKeys,
			n = void 0 !== n && n;
		if (null != e)
			if (("object" !== h(e) && (e = [e]), l(e)))
				for (s = 0, r = e.length; s < r; s++) t.call(null, e[s], s, e);
			else
				for (
					var o,
						i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
						a = i.length,
						s = 0;
					s < a;
					s++
				)
					(o = i[s]), t.call(null, e[o], o, e);
	}
	function Z(e, t) {
		t = t.toLowerCase();
		for (var r, n = Object.keys(e), o = n.length; 0 < o--; )
			if (t === (r = n[o]).toLowerCase()) return r;
		return null;
	}
	function ee(e) {
		return !a(e) && e !== te;
	}
	var te =
		"undefined" != typeof globalThis
			? globalThis
			: "undefined" != typeof self
				? self
				: "undefined" != typeof window
					? window
					: global;
	function re(n, o) {
		var e = Object.getOwnPropertyDescriptors(n),
			i = {};
		m(e, function (e, t) {
			var r;
			!1 !== (r = o(e, t, n)) && (i[t] = r || e);
		}),
			Object.defineProperties(n, i);
	}
	var v = (t =>
			function (e) {
				return t && e instanceof t;
			})("undefined" != typeof Uint8Array && u(Uint8Array)),
		ne = e("HTMLFormElement"),
		oe = (() => {
			var r = Object.prototype.hasOwnProperty;
			return function (e, t) {
				return r.call(e, t);
			};
		})(),
		ie = e("RegExp"),
		g = "abcdefghijklmnopqrstuvwxyz",
		b = "0123456789",
		ae = { DIGIT: b, ALPHA: g, ALPHA_DIGIT: g + g.toUpperCase() + b };
	var g = e("AsyncFunction"),
		w = {
			isArray: l,
			isArrayBuffer: W,
			isBuffer: function (e) {
				return (
					null !== e &&
					!a(e) &&
					null !== e.constructor &&
					!a(e.constructor) &&
					p(e.constructor.isBuffer) &&
					e.constructor.isBuffer(e)
				);
			},
			isFormData: function (e) {
				var t;
				return (
					e &&
					(("function" == typeof FormData && e instanceof FormData) ||
						(p(e.append) &&
							("formdata" === (t = r(e)) ||
								("object" === t &&
									p(e.toString) &&
									"[object FormData]" === e.toString()))))
				);
			},
			isArrayBufferView: function (e) {
				return (e =
					"undefined" != typeof ArrayBuffer && ArrayBuffer.isView
						? ArrayBuffer.isView(e)
						: e && e.buffer && W(e.buffer));
			},
			isString: K,
			isNumber: V,
			isBoolean: function (e) {
				return !0 === e || !1 === e;
			},
			isObject: s,
			isPlainObject: f,
			isUndefined: a,
			isDate: X,
			isFile: $,
			isBlob: y,
			isRegExp: ie,
			isFunction: p,
			isStream: function (e) {
				return s(e) && p(e.pipe);
			},
			isURLSearchParams: Y,
			isTypedArray: v,
			isFileList: Q,
			forEach: m,
			merge: function r() {
				for (
					var n = ((ee(this) && this) || {}).caseless,
						o = {},
						e = function (e, t) {
							(t = (n && Z(o, t)) || t),
								f(o[t]) && f(e)
									? (o[t] = r(o[t], e))
									: f(e)
										? (o[t] = r({}, e))
										: l(e)
											? (o[t] = e.slice())
											: (o[t] = e);
						},
						t = 0,
						i = arguments.length;
					t < i;
					t++
				)
					arguments[t] && m(arguments[t], e);
				return o;
			},
			extend: function (r, e, n) {
				return (
					m(
						e,
						function (e, t) {
							n && p(e) ? (r[t] = J(e, n)) : (r[t] = e);
						},
						{
							allOwnKeys: (3 < arguments.length && void 0 !== arguments[3]
								? arguments[3]
								: {}
							).allOwnKeys
						}
					),
					r
				);
			},
			trim: function (e) {
				return e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
			},
			stripBOM: function (e) {
				return (e = 65279 === e.charCodeAt(0) ? e.slice(1) : e);
			},
			inherits: function (e, t, r, n) {
				(e.prototype = Object.create(t.prototype, n)),
					(e.prototype.constructor = e),
					Object.defineProperty(e, "super", { value: t.prototype }),
					r && Object.assign(e.prototype, r);
			},
			toFlatObject: function (e, t, r, n) {
				var o,
					i,
					a,
					s = {};
				if (((t = t || {}), null != e))
					do {
						for (i = (o = Object.getOwnPropertyNames(e)).length; 0 < i--; )
							(a = o[i]), (n && !n(a, e, t)) || s[a] || ((t[a] = e[a]), (s[a] = !0));
					} while ((e = !1 !== r && u(e)) && (!r || r(e, t)) && e !== Object.prototype);
				return t;
			},
			kindOf: r,
			kindOfTest: e,
			endsWith: function (e, t, r) {
				(e = String(e)), (void 0 === r || r > e.length) && (r = e.length), (r -= t.length);
				e = e.indexOf(t, r);
				return -1 !== e && e === r;
			},
			toArray: function (e) {
				if (!e) return null;
				if (l(e)) return e;
				var t = e.length;
				if (!V(t)) return null;
				for (var r = new Array(t); 0 < t--; ) r[t] = e[t];
				return r;
			},
			forEachEntry: function (e, t) {
				for (var r = (e && e[Symbol.iterator]).call(e); (n = r.next()) && !n.done; ) {
					var n = n.value;
					t.call(e, n[0], n[1]);
				}
			},
			matchAll: function (e, t) {
				for (var r, n = []; null !== (r = e.exec(t)); ) n.push(r);
				return n;
			},
			isHTMLForm: ne,
			hasOwnProperty: oe,
			hasOwnProp: oe,
			reduceDescriptors: re,
			freezeMethods: function (n) {
				re(n, function (e, t) {
					if (p(n) && -1 !== ["arguments", "caller", "callee"].indexOf(t)) return !1;
					var r = n[t];
					p(r) &&
						((e.enumerable = !1),
						"writable" in e
							? (e.writable = !1)
							: e.set ||
								(e.set = function () {
									throw Error("Can not rewrite read-only method '" + t + "'");
								}));
				});
			},
			toObjectSet: function (e, t) {
				function r(e) {
					e.forEach(function (e) {
						n[e] = !0;
					});
				}
				var n = {};
				return l(e) ? r(e) : r(String(e).split(t)), n;
			},
			toCamelCase: function (e) {
				return e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, r) {
					return t.toUpperCase() + r;
				});
			},
			noop: function () {},
			toFiniteNumber: function (e, t) {
				return (e = +e), Number.isFinite(e) ? e : t;
			},
			findKey: Z,
			global: te,
			isContextDefined: ee,
			ALPHABET: ae,
			generateString: function () {
				for (
					var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 16,
						t =
							1 < arguments.length && void 0 !== arguments[1]
								? arguments[1]
								: ae.ALPHA_DIGIT,
						r = "",
						n = t.length;
					e--;

				)
					r += t[(Math.random() * n) | 0];
				return r;
			},
			isSpecCompliantForm: function (e) {
				return !!(
					e &&
					p(e.append) &&
					"FormData" === e[Symbol.toStringTag] &&
					e[Symbol.iterator]
				);
			},
			toJSONObject: function (e) {
				var t = new Array(10);
				return (function r(e, n) {
					if (s(e)) {
						if (0 <= t.indexOf(e)) return;
						var o;
						if (!("toJSON" in e))
							return (
								(t[n] = e),
								(o = l(e) ? [] : {}),
								m(e, function (e, t) {
									e = r(e, n + 1);
									a(e) || (o[t] = e);
								}),
								(t[n] = void 0),
								o
							);
					}
					return e;
				})(e, 0);
			},
			isAsyncFn: g,
			isThenable: function (e) {
				return e && (s(e) || p(e)) && p(e.then) && p(e.catch);
			}
		};
	function E(e, t, r, n, o) {
		Error.call(this),
			Error.captureStackTrace
				? Error.captureStackTrace(this, this.constructor)
				: (this.stack = new Error().stack),
			(this.message = e),
			(this.name = "AxiosError"),
			t && (this.code = t),
			r && (this.config = r),
			n && (this.request = n),
			o && (this.response = o);
	}
	w.inherits(E, Error, {
		toJSON: function () {
			return {
				message: this.message,
				name: this.name,
				description: this.description,
				number: this.number,
				fileName: this.fileName,
				lineNumber: this.lineNumber,
				columnNumber: this.columnNumber,
				stack: this.stack,
				config: w.toJSONObject(this.config),
				code: this.code,
				status: this.response && this.response.status ? this.response.status : null
			};
		}
	});
	var se = E.prototype,
		ue = {};
	[
		"ERR_BAD_OPTION_VALUE",
		"ERR_BAD_OPTION",
		"ECONNABORTED",
		"ETIMEDOUT",
		"ERR_NETWORK",
		"ERR_FR_TOO_MANY_REDIRECTS",
		"ERR_DEPRECATED",
		"ERR_BAD_RESPONSE",
		"ERR_BAD_REQUEST",
		"ERR_CANCELED",
		"ERR_NOT_SUPPORT",
		"ERR_INVALID_URL"
	].forEach(function (e) {
		ue[e] = { value: e };
	}),
		Object.defineProperties(E, ue),
		Object.defineProperty(se, "isAxiosError", { value: !0 }),
		(E.from = function (e, t, r, n, o, i) {
			var a = Object.create(se);
			return (
				w.toFlatObject(
					e,
					a,
					function (e) {
						return e !== Error.prototype;
					},
					function (e) {
						return "isAxiosError" !== e;
					}
				),
				E.call(a, e.message, t, r, n, o),
				(a.cause = e),
				(a.name = e.name),
				i && Object.assign(a, i),
				a
			);
		});
	function O(e) {
		return w.isPlainObject(e) || w.isArray(e);
	}
	function ce(e) {
		return w.endsWith(e, "[]") ? e.slice(0, -2) : e;
	}
	function le(e, t, r) {
		return e
			? e
					.concat(t)
					.map(function (e, t) {
						return (e = ce(e)), !r && t ? "[" + e + "]" : e;
					})
					.join(r ? "." : "")
			: t;
	}
	var fe = w.toFlatObject(w, {}, null, function (e) {
		return /^is[A-Z]/.test(e);
	});
	function R(e, i, t) {
		if (!w.isObject(e)) throw new TypeError("target must be an object");
		i = i || new FormData();
		var a = (t = w.toFlatObject(
				t,
				{ metaTokens: !0, dots: !1, indexes: !1 },
				!1,
				function (e, t) {
					return !w.isUndefined(t[e]);
				}
			)).metaTokens,
			o = t.visitor || n,
			s = t.dots,
			u = t.indexes,
			r = (t.Blob || ("undefined" != typeof Blob && Blob)) && w.isSpecCompliantForm(i);
		if (!w.isFunction(o)) throw new TypeError("visitor must be a function");
		function c(e) {
			if (null === e) return "";
			if (w.isDate(e)) return e.toISOString();
			if (!r && w.isBlob(e)) throw new E("Blob is not supported. Use a Buffer instead.");
			return w.isArrayBuffer(e) || w.isTypedArray(e)
				? r && "function" == typeof Blob
					? new Blob([e])
					: Buffer.from(e)
				: e;
		}
		function n(e, r, t) {
			var n,
				o = e;
			if (e && !t && "object" === h(e))
				if (w.endsWith(r, "{}")) (r = a ? r : r.slice(0, -2)), (e = JSON.stringify(e));
				else if (
					(w.isArray(e) && ((n = e), w.isArray(n)) && !n.some(O)) ||
					((w.isFileList(e) || w.endsWith(r, "[]")) && (o = w.toArray(e)))
				)
					return (
						(r = ce(r)),
						o.forEach(function (e, t) {
							w.isUndefined(e) ||
								null === e ||
								i.append(
									!0 === u ? le([r], t, s) : null === u ? r : r + "[]",
									c(e)
								);
						}),
						!1
					);
			return !!O(e) || (i.append(le(t, r, s), c(e)), !1);
		}
		var l = [],
			f = Object.assign(fe, { defaultVisitor: n, convertValue: c, isVisitable: O });
		if (w.isObject(e))
			return (
				(function r(e, n) {
					if (!w.isUndefined(e)) {
						if (-1 !== l.indexOf(e))
							throw Error("Circular reference detected in " + n.join("."));
						l.push(e),
							w.forEach(e, function (e, t) {
								!0 ===
									(!(w.isUndefined(e) || null === e) &&
										o.call(i, e, w.isString(t) ? t.trim() : t, n, f)) &&
									r(e, n ? n.concat(t) : [t]);
							}),
							l.pop();
					}
				})(e),
				i
			);
		throw new TypeError("data must be an object");
	}
	function he(e) {
		var t = {
			"!": "%21",
			"'": "%27",
			"(": "%28",
			")": "%29",
			"~": "%7E",
			"%20": "+",
			"%00": "\0"
		};
		return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
			return t[e];
		});
	}
	function A(e, t) {
		(this._pairs = []), e && R(e, this, t);
	}
	b = A.prototype;
	function de(e) {
		return encodeURIComponent(e)
			.replace(/%3A/gi, ":")
			.replace(/%24/g, "$")
			.replace(/%2C/gi, ",")
			.replace(/%20/g, "+")
			.replace(/%5B/gi, "[")
			.replace(/%5D/gi, "]");
	}
	function pe(e, t, r) {
		var n, o;
		return (
			t &&
				((n = (r && r.encode) || de),
				(o = (o = r && r.serialize)
					? o(t, r)
					: w.isURLSearchParams(t)
						? t.toString()
						: new A(t, r).toString(n))) &&
				(-1 !== (t = e.indexOf("#")) && (e = e.slice(0, t)),
				(e += (-1 === e.indexOf("?") ? "?" : "&") + o)),
			e
		);
	}
	(b.append = function (e, t) {
		this._pairs.push([e, t]);
	}),
		(b.toString = function (t) {
			var r = t
				? function (e) {
						return t.call(this, e, he);
					}
				: he;
			return this._pairs
				.map(function (e) {
					return r(e[0]) + "=" + r(e[1]);
				}, "")
				.join("&");
		});
	var ye = (() => {
			function e() {
				i(this, e), (this.handlers = []);
			}
			return (
				n(e, [
					{
						key: "use",
						value: function (e, t, r) {
							return (
								this.handlers.push({
									fulfilled: e,
									rejected: t,
									synchronous: !!r && r.synchronous,
									runWhen: r ? r.runWhen : null
								}),
								this.handlers.length - 1
							);
						}
					},
					{
						key: "eject",
						value: function (e) {
							this.handlers[e] && (this.handlers[e] = null);
						}
					},
					{
						key: "clear",
						value: function () {
							this.handlers && (this.handlers = []);
						}
					},
					{
						key: "forEach",
						value: function (t) {
							w.forEach(this.handlers, function (e) {
								null !== e && t(e);
							});
						}
					}
				]),
				e
			);
		})(),
		me = { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
		K = {
			isBrowser: !0,
			classes: {
				URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : A,
				FormData: "undefined" != typeof FormData ? FormData : null,
				Blob: "undefined" != typeof Blob ? Blob : null
			},
			protocols: ["http", "https", "file", "blob", "url", "data"]
		},
		ve = "undefined" != typeof window && "undefined" != typeof document,
		X = (e => ve && ["ReactNative", "NativeScript", "NS"].indexOf(e) < 0)(
			"undefined" != typeof navigator && navigator.product
		),
		$ =
			"undefined" != typeof WorkerGlobalScope &&
			self instanceof WorkerGlobalScope &&
			"function" == typeof self.importScripts,
		j = D(
			D(
				{},
				Object.freeze({
					__proto__: null,
					hasBrowserEnv: ve,
					hasStandardBrowserWebWorkerEnv: $,
					hasStandardBrowserEnv: X
				})
			),
			K
		);
	function ge(e) {
		function s(e, t, r, n) {
			var o, i, a;
			return (
				"__proto__" === (a = e[n++]) ||
				((o = Number.isFinite(+a)),
				(i = n >= e.length),
				(a = !a && w.isArray(r) ? r.length : a),
				i
					? w.hasOwnProp(r, a)
						? (r[a] = [r[a], t])
						: (r[a] = t)
					: ((r[a] && w.isObject(r[a])) || (r[a] = []),
						s(e, t, r[a], n) &&
							w.isArray(r[a]) &&
							(r[a] = (e => {
								for (
									var t, r = {}, n = Object.keys(e), o = n.length, i = 0;
									i < o;
									i++
								)
									r[(t = n[i])] = e[t];
								return r;
							})(r[a]))),
				!o)
			);
		}
		var r;
		return w.isFormData(e) && w.isFunction(e.entries)
			? ((r = {}),
				w.forEachEntry(e, function (e, t) {
					s(
						w.matchAll(/\w+|\[(\w*)]/g, e).map(function (e) {
							return "[]" === e[0] ? "" : e[1] || e[0];
						}),
						t,
						r,
						0
					);
				}),
				r)
			: null;
	}
	var x = {
			transitional: me,
			adapter: ["xhr", "http"],
			transformRequest: [
				function (e, t) {
					var r,
						n,
						o = t.getContentType() || "",
						i = -1 < o.indexOf("application/json"),
						a = w.isObject(e);
					if ((a && w.isHTMLForm(e) && (e = new FormData(e)), w.isFormData(e)))
						return i ? JSON.stringify(ge(e)) : e;
					if (
						!(
							w.isArrayBuffer(e) ||
							w.isBuffer(e) ||
							w.isStream(e) ||
							w.isFile(e) ||
							w.isBlob(e)
						)
					) {
						if (w.isArrayBufferView(e)) return e.buffer;
						if (w.isURLSearchParams(e))
							return (
								t.setContentType(
									"application/x-www-form-urlencoded;charset=utf-8",
									!1
								),
								e.toString()
							);
						if (a) {
							if (-1 < o.indexOf("application/x-www-form-urlencoded"))
								return (
									(r = e),
									(n = this.formSerializer),
									R(
										r,
										new j.classes.URLSearchParams(),
										Object.assign(
											{
												visitor: function (e, t, r, n) {
													return j.isNode && w.isBuffer(e)
														? (this.append(t, e.toString("base64")), !1)
														: n.defaultVisitor.apply(this, arguments);
												}
											},
											n
										)
									).toString()
								);
							if ((r = w.isFileList(e)) || -1 < o.indexOf("multipart/form-data"))
								return R(
									r ? { "files[]": e } : e,
									(n = this.env && this.env.FormData) && new n(),
									this.formSerializer
								);
						}
						if (a || i) {
							t.setContentType("application/json", !1);
							(o = e), (a = void 0), (i = void 0);
							if (w.isString(o))
								try {
									return (a || JSON.parse)(o), w.trim(o);
								} catch (e) {
									if ("SyntaxError" !== e.name) throw e;
								}
							return (i || JSON.stringify)(o);
						}
					}
					return e;
				}
			],
			transformResponse: [
				function (e) {
					var t = this.transitional || x.transitional,
						r = t && t.forcedJSONParsing,
						n = "json" === this.responseType;
					if (e && w.isString(e) && ((r && !this.responseType) || n)) {
						r = !(t && t.silentJSONParsing) && n;
						try {
							return JSON.parse(e);
						} catch (e) {
							if (r) {
								if ("SyntaxError" === e.name)
									throw E.from(e, E.ERR_BAD_RESPONSE, this, null, this.response);
								throw e;
							}
						}
					}
					return e;
				}
			],
			timeout: 0,
			xsrfCookieName: "XSRF-TOKEN",
			xsrfHeaderName: "X-XSRF-TOKEN",
			maxContentLength: -1,
			maxBodyLength: -1,
			env: { FormData: j.classes.FormData, Blob: j.classes.Blob },
			validateStatus: function (e) {
				return 200 <= e && e < 300;
			},
			headers: {
				common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 }
			}
		},
		be =
			(w.forEach(["delete", "get", "head", "post", "put", "patch"], function (e) {
				x.headers[e] = {};
			}),
			x),
		we = w.toObjectSet([
			"age",
			"authorization",
			"content-length",
			"content-type",
			"etag",
			"expires",
			"from",
			"host",
			"if-modified-since",
			"if-unmodified-since",
			"last-modified",
			"location",
			"max-forwards",
			"proxy-authorization",
			"referer",
			"retry-after",
			"user-agent"
		]),
		Ee = Symbol("internals");
	function T(e) {
		return e && String(e).trim().toLowerCase();
	}
	function P(e) {
		return !1 === e || null == e ? e : w.isArray(e) ? e.map(P) : String(e);
	}
	function Oe(e, t, r, n, o) {
		return w.isFunction(n)
			? n.call(this, t, r)
			: w.isString((t = o ? r : t)) &&
					(w.isString(n) ? -1 !== t.indexOf(n) : w.isRegExp(n) && n.test(t));
	}
	var y = (() => {
			function t(e) {
				i(this, t), e && this.set(e);
			}
			return (
				n(
					t,
					[
						{
							key: "set",
							value: function (e, t, r) {
								var o = this;
								function n(e, t, r) {
									var n = T(t);
									if (!n)
										throw new Error("header name must be a non-empty string");
									n = w.findKey(o, n);
									(n &&
										void 0 !== o[n] &&
										!0 !== r &&
										(void 0 !== r || !1 === o[n])) ||
										(o[n || t] = P(e));
								}
								function i(e, r) {
									w.forEach(e, function (e, t) {
										return n(e, t, r);
									});
								}
								var a, s, u, c;
								return (
									w.isPlainObject(e) || e instanceof this.constructor
										? i(e, t)
										: w.isString(e) &&
											  (e = e.trim()) &&
											  ((c = e),
											  !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(c.trim()))
											? i(
													((u = {}),
													(c = e) &&
														c.split("\n").forEach(function (e) {
															(s = e.indexOf(":")),
																(a = e
																	.substring(0, s)
																	.trim()
																	.toLowerCase()),
																(s = e.substring(s + 1).trim()),
																!a ||
																	(u[a] && we[a]) ||
																	("set-cookie" === a
																		? u[a]
																			? u[a].push(s)
																			: (u[a] = [s])
																		: (u[a] = u[a]
																				? u[a] + ", " + s
																				: s));
														}),
													u),
													t
												)
											: null != e && n(t, e, r),
									this
								);
							}
						},
						{
							key: "get",
							value: function (e, t) {
								if ((e = T(e))) {
									e = w.findKey(this, e);
									if (e) {
										var r = this[e];
										if (!t) return r;
										if (!0 === t) {
											for (
												var n,
													o = r,
													i = Object.create(null),
													a = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
												(n = a.exec(o));

											)
												i[n[1]] = n[2];
											return i;
										}
										if (w.isFunction(t)) return t.call(this, r, e);
										if (w.isRegExp(t)) return t.exec(r);
										throw new TypeError(
											"parser must be boolean|regexp|function"
										);
									}
								}
							}
						},
						{
							key: "has",
							value: function (e, t) {
								return (
									!!(e = T(e)) &&
									!(
										!(e = w.findKey(this, e)) ||
										void 0 === this[e] ||
										(t && !Oe(0, this[e], e, t))
									)
								);
							}
						},
						{
							key: "delete",
							value: function (e, t) {
								var r = this,
									n = !1;
								function o(e) {
									(e = T(e)) &&
										(e = w.findKey(r, e)) &&
										(!t || Oe(0, r[e], e, t)) &&
										(delete r[e], (n = !0));
								}
								return w.isArray(e) ? e.forEach(o) : o(e), n;
							}
						},
						{
							key: "clear",
							value: function (e) {
								for (var t = Object.keys(this), r = t.length, n = !1; r--; ) {
									var o = t[r];
									(e && !Oe(0, this[o], o, e, !0)) || (delete this[o], (n = !0));
								}
								return n;
							}
						},
						{
							key: "normalize",
							value: function (n) {
								var o = this,
									i = {};
								return (
									w.forEach(this, function (e, t) {
										var r = w.findKey(i, t);
										r
											? ((o[r] = P(e)), delete o[t])
											: ((r = n
													? t
															.trim()
															.toLowerCase()
															.replace(
																/([a-z\d])(\w*)/g,
																function (e, t, r) {
																	return t.toUpperCase() + r;
																}
															)
													: String(t).trim()) !== t && delete o[t],
												(o[r] = P(e)),
												(i[r] = !0));
									}),
									this
								);
							}
						},
						{
							key: "concat",
							value: function () {
								for (
									var e, t = arguments.length, r = new Array(t), n = 0;
									n < t;
									n++
								)
									r[n] = arguments[n];
								return (e = this.constructor).concat.apply(e, [this].concat(r));
							}
						},
						{
							key: "toJSON",
							value: function (r) {
								var n = Object.create(null);
								return (
									w.forEach(this, function (e, t) {
										null != e &&
											!1 !== e &&
											(n[t] = r && w.isArray(e) ? e.join(", ") : e);
									}),
									n
								);
							}
						},
						{
							key: Symbol.iterator,
							value: function () {
								return Object.entries(this.toJSON())[Symbol.iterator]();
							}
						},
						{
							key: "toString",
							value: function () {
								return Object.entries(this.toJSON())
									.map(function (e) {
										e = c(e, 2);
										return e[0] + ": " + e[1];
									})
									.join("\n");
							}
						},
						{
							key: Symbol.toStringTag,
							get: function () {
								return "AxiosHeaders";
							}
						}
					],
					[
						{
							key: "from",
							value: function (e) {
								return e instanceof this ? e : new this(e);
							}
						},
						{
							key: "concat",
							value: function (e) {
								for (
									var t = new this(e),
										r = arguments.length,
										n = new Array(1 < r ? r - 1 : 0),
										o = 1;
									o < r;
									o++
								)
									n[o - 1] = arguments[o];
								return (
									n.forEach(function (e) {
										return t.set(e);
									}),
									t
								);
							}
						},
						{
							key: "accessor",
							value: function (e) {
								var i = (this[Ee] = this[Ee] = { accessors: {} }).accessors,
									a = this.prototype;
								function t(e) {
									var t,
										o,
										r,
										n = T(e);
									i[n] ||
										((t = a),
										(o = e),
										(r = w.toCamelCase(" " + o)),
										["get", "set", "has"].forEach(function (n) {
											Object.defineProperty(t, n + r, {
												value: function (e, t, r) {
													return this[n].call(this, o, e, t, r);
												},
												configurable: !0
											});
										}),
										(i[n] = !0));
								}
								return w.isArray(e) ? e.forEach(t) : t(e), this;
							}
						}
					]
				),
				t
			);
		})(),
		N =
			(y.accessor([
				"Content-Type",
				"Content-Length",
				"Accept",
				"Accept-Encoding",
				"User-Agent",
				"Authorization"
			]),
			w.reduceDescriptors(y.prototype, function (e, t) {
				var r = e.value,
					n = t[0].toUpperCase() + t.slice(1);
				return {
					get: function () {
						return r;
					},
					set: function (e) {
						this[n] = e;
					}
				};
			}),
			w.freezeMethods(y),
			y);
	function Se(e, t) {
		var r = this || be,
			n = t || r,
			o = N.from(n.headers),
			i = n.data;
		return (
			w.forEach(e, function (e) {
				i = e.call(r, i, o.normalize(), t ? t.status : void 0);
			}),
			o.normalize(),
			i
		);
	}
	function Re(e) {
		return !(!e || !e.__CANCEL__);
	}
	function k(e, t, r) {
		E.call(this, null == e ? "canceled" : e, E.ERR_CANCELED, t, r),
			(this.name = "CanceledError");
	}
	w.inherits(k, E, { __CANCEL__: !0 });
	var Ae = j.hasStandardBrowserEnv
		? {
				write: function (e, t, r, n, o, i) {
					e = [e + "=" + encodeURIComponent(t)];
					w.isNumber(r) && e.push("expires=" + new Date(r).toGMTString()),
						w.isString(n) && e.push("path=" + n),
						w.isString(o) && e.push("domain=" + o),
						!0 === i && e.push("secure"),
						(document.cookie = e.join("; "));
				},
				read: function (e) {
					e = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
					return e ? decodeURIComponent(e[3]) : null;
				},
				remove: function (e) {
					this.write(e, "", Date.now() - 864e5);
				}
			}
		: {
				write: function () {},
				read: function () {
					return null;
				},
				remove: function () {}
			};
	function je(e, t) {
		var r;
		return e && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)
			? ((e = e), (r = t) ? e.replace(/\/?\/$/, "") + "/" + r.replace(/^\/+/, "") : e)
			: t;
	}
	var xe = j.hasStandardBrowserEnv
		? (() => {
				var t,
					r = /(msie|trident)/i.test(navigator.userAgent),
					n = document.createElement("a");
				function o(e) {
					return (
						r && (n.setAttribute("href", e), (e = n.href)),
						n.setAttribute("href", e),
						{
							href: n.href,
							protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
							host: n.host,
							search: n.search ? n.search.replace(/^\?/, "") : "",
							hash: n.hash ? n.hash.replace(/^#/, "") : "",
							hostname: n.hostname,
							port: n.port,
							pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname
						}
					);
				}
				return (
					(t = o(window.location.href)),
					function (e) {
						e = w.isString(e) ? o(e) : e;
						return e.protocol === t.protocol && e.host === t.host;
					}
				);
			})()
		: function () {
				return !0;
			};
	function Te(i, a) {
		var s,
			u,
			c,
			l,
			f,
			h,
			d,
			p = 0,
			y =
				((u = 250),
				(s = (s = 50) || 10),
				(l = new Array(s)),
				(f = new Array(s)),
				(u = void (d = h = 0) !== u ? u : 1e3),
				function (e) {
					for (
						var t = Date.now(),
							r = f[d],
							n = ((c = c || t), (l[h] = e), (f[h] = t), d),
							o = 0;
						n !== h;

					)
						(o += l[n++]), (n %= s);
					return (
						(h = (h + 1) % s) === d && (d = (d + 1) % s),
						!(t - c < u) && (e = r && t - r) ? Math.round((1e3 * o) / e) : void 0
					);
				});
		return function (e) {
			var t = e.loaded,
				r = e.lengthComputable ? e.total : void 0,
				n = t - p,
				o = y(n),
				n = {
					loaded: (p = t),
					total: r,
					progress: r ? t / r : void 0,
					bytes: n,
					rate: o || void 0,
					estimated: o && r && t <= r ? (r - t) / o : void 0,
					event: e
				};
			(n[a ? "download" : "upload"] = !0), i(n);
		};
	}
	function Pe(e) {
		return "- ".concat(e);
	}
	var Ne = {
			http: null,
			xhr:
				"undefined" != typeof XMLHttpRequest &&
				function (h) {
					return new Promise(function (o, i) {
						var e,
							t = h.data,
							r = N.from(h.headers).normalize(),
							a = h.responseType,
							n = h.withXSRFToken;
						function s() {
							h.cancelToken && h.cancelToken.unsubscribe(e),
								h.signal && h.signal.removeEventListener("abort", e);
						}
						w.isFormData(t) &&
							(j.hasStandardBrowserEnv || j.hasStandardBrowserWebWorkerEnv
								? r.setContentType(!1)
								: !1 !== (f = r.getContentType()) &&
									((f = f
										? f
												.split(";")
												.map(function (e) {
													return e.trim();
												})
												.filter(Boolean)
										: []),
									(c = (f = z((f = f)) || M(f) || d(f) || H())[0]),
									(f = f.slice(1)),
									r.setContentType(
										[c || "multipart/form-data"].concat(q(f)).join("; ")
									)));
						var u = new XMLHttpRequest(),
							c =
								(h.auth &&
									((c = h.auth.username || ""),
									(f = h.auth.password
										? unescape(encodeURIComponent(h.auth.password))
										: ""),
									r.set("Authorization", "Basic " + btoa(c + ":" + f))),
								je(h.baseURL, h.url));
						function l() {
							var e, t, r, n;
							u &&
								((r = N.from(
									"getAllResponseHeaders" in u && u.getAllResponseHeaders()
								)),
								(r = {
									data:
										a && "text" !== a && "json" !== a
											? u.response
											: u.responseText,
									status: u.status,
									statusText: u.statusText,
									headers: r,
									config: h,
									request: u
								}),
								(e = function (e) {
									o(e), s();
								}),
								(t = function (e) {
									i(e), s();
								}),
								(n = (r = r).config.validateStatus),
								r.status && n && !n(r.status)
									? t(
											new E(
												"Request failed with status code " + r.status,
												[E.ERR_BAD_REQUEST, E.ERR_BAD_RESPONSE][
													Math.floor(r.status / 100) - 4
												],
												r.config,
												r.request,
												r
											)
										)
									: e(r),
								(u = null));
						}
						u.open(h.method.toUpperCase(), pe(c, h.params, h.paramsSerializer), !0),
							(u.timeout = h.timeout),
							"onloadend" in u
								? (u.onloadend = l)
								: (u.onreadystatechange = function () {
										u &&
											4 === u.readyState &&
											(0 !== u.status ||
												(u.responseURL &&
													0 === u.responseURL.indexOf("file:"))) &&
											setTimeout(l);
									}),
							(u.onabort = function () {
								u &&
									(i(new E("Request aborted", E.ECONNABORTED, h, u)), (u = null));
							}),
							(u.onerror = function () {
								i(new E("Network Error", E.ERR_NETWORK, h, u)), (u = null);
							}),
							(u.ontimeout = function () {
								var e = h.timeout
									? "timeout of " + h.timeout + "ms exceeded"
									: "timeout exceeded";
								h.timeoutErrorMessage && (e = h.timeoutErrorMessage),
									i(
										new E(
											e,
											(h.transitional || me).clarifyTimeoutError
												? E.ETIMEDOUT
												: E.ECONNABORTED,
											h,
											u
										)
									),
									(u = null);
							}),
							j.hasStandardBrowserEnv &&
								((n = n && w.isFunction(n) ? n(h) : n) || (!1 !== n && xe(c))) &&
								(f =
									h.xsrfHeaderName &&
									h.xsrfCookieName &&
									Ae.read(h.xsrfCookieName)) &&
								r.set(h.xsrfHeaderName, f),
							void 0 === t && r.setContentType(null),
							"setRequestHeader" in u &&
								w.forEach(r.toJSON(), function (e, t) {
									u.setRequestHeader(t, e);
								}),
							w.isUndefined(h.withCredentials) ||
								(u.withCredentials = !!h.withCredentials),
							a && "json" !== a && (u.responseType = h.responseType),
							"function" == typeof h.onDownloadProgress &&
								u.addEventListener("progress", Te(h.onDownloadProgress, !0)),
							"function" == typeof h.onUploadProgress &&
								u.upload &&
								u.upload.addEventListener("progress", Te(h.onUploadProgress)),
							(h.cancelToken || h.signal) &&
								((e = function (e) {
									u &&
										(i(!e || e.type ? new k(null, h, u) : e),
										u.abort(),
										(u = null));
								}),
								h.cancelToken && h.cancelToken.subscribe(e),
								h.signal) &&
								(h.signal.aborted ? e() : h.signal.addEventListener("abort", e));
						var f = ((n = /^([-+\w]{1,25})(:?\/\/|:)/.exec((n = c))) && n[1]) || "";
						f && -1 === j.protocols.indexOf(f)
							? i(new E("Unsupported protocol " + f + ":", E.ERR_BAD_REQUEST, h))
							: u.send(t || null);
					});
				}
		},
		ke =
			(w.forEach(Ne, function (e, t) {
				if (e) {
					try {
						Object.defineProperty(e, "name", { value: t });
					} catch (e) {}
					Object.defineProperty(e, "adapterName", { value: t });
				}
			}),
			function (e) {
				for (var t, r, n = (e = w.isArray(e) ? e : [e]).length, o = {}, i = 0; i < n; i++) {
					var a,
						s = void 0,
						u = (a = e[i]);
					if (
						((t = a),
						!w.isFunction(t) &&
							null !== t &&
							!1 !== t &&
							void 0 === (u = Ne[(s = String(a)).toLowerCase()]))
					)
						throw new E("Unknown adapter '".concat(s, "'"));
					if (u) break;
					o[s || "#" + i] = u;
				}
				if (u) return u;
				throw (
					((r = Object.entries(o).map(function (e) {
						var e = c(e, 2),
							t = e[0],
							e = e[1];
						return (
							"adapter ".concat(t, " ") +
							(!1 === e
								? "is not supported by the environment"
								: "is not available in the build")
						);
					})),
					new E(
						"There is no suitable adapter to dispatch the request " +
							(n
								? 1 < r.length
									? "since :\n" + r.map(Pe).join("\n")
									: " " + Pe(r[0])
								: "as no adapter specified"),
						"ERR_NOT_SUPPORT"
					))
				);
			});
	function _e(e) {
		if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
			throw new k(null, e);
	}
	function Le(t) {
		return (
			_e(t),
			(t.headers = N.from(t.headers)),
			(t.data = Se.call(t, t.transformRequest)),
			-1 !== ["post", "put", "patch"].indexOf(t.method) &&
				t.headers.setContentType("application/x-www-form-urlencoded", !1),
			ke(t.adapter || be.adapter)(t).then(
				function (e) {
					return (
						_e(t),
						(e.data = Se.call(t, t.transformResponse, e)),
						(e.headers = N.from(e.headers)),
						e
					);
				},
				function (e) {
					return (
						Re(e) ||
							(_e(t),
							e &&
								e.response &&
								((e.response.data = Se.call(t, t.transformResponse, e.response)),
								(e.response.headers = N.from(e.response.headers)))),
						Promise.reject(e)
					);
				}
			)
		);
	}
	function Ce(e) {
		return e instanceof N ? e.toJSON() : e;
	}
	function _(n, o) {
		o = o || {};
		var i = {};
		function a(e, t, r) {
			return w.isPlainObject(e) && w.isPlainObject(t)
				? w.merge.call({ caseless: r }, e, t)
				: w.isPlainObject(t)
					? w.merge({}, t)
					: w.isArray(t)
						? t.slice()
						: t;
		}
		function s(e, t, r) {
			return w.isUndefined(t) ? (w.isUndefined(e) ? void 0 : a(void 0, e, r)) : a(e, t, r);
		}
		function e(e, t) {
			if (!w.isUndefined(t)) return a(void 0, t);
		}
		function t(e, t) {
			return w.isUndefined(t) ? (w.isUndefined(e) ? void 0 : a(void 0, e)) : a(void 0, t);
		}
		function u(e, t, r) {
			return r in o ? a(e, t) : r in n ? a(void 0, e) : void 0;
		}
		var c = {
			url: e,
			method: e,
			data: e,
			baseURL: t,
			transformRequest: t,
			transformResponse: t,
			paramsSerializer: t,
			timeout: t,
			timeoutMessage: t,
			withCredentials: t,
			withXSRFToken: t,
			adapter: t,
			responseType: t,
			xsrfCookieName: t,
			xsrfHeaderName: t,
			onUploadProgress: t,
			onDownloadProgress: t,
			decompress: t,
			maxContentLength: t,
			maxBodyLength: t,
			beforeRedirect: t,
			transport: t,
			httpAgent: t,
			httpsAgent: t,
			cancelToken: t,
			socketPath: t,
			responseEncoding: t,
			validateStatus: u,
			headers: function (e, t) {
				return s(Ce(e), Ce(t), !0);
			}
		};
		return (
			w.forEach(Object.keys(Object.assign({}, n, o)), function (e) {
				var t = c[e] || s,
					r = t(n[e], o[e], e);
				(w.isUndefined(r) && t !== u) || (i[e] = r);
			}),
			i
		);
	}
	var Fe = {},
		Ue =
			(["object", "boolean", "number", "function", "string", "symbol"].forEach(
				function (t, r) {
					Fe[t] = function (e) {
						return h(e) === t || "a" + (r < 1 ? "n " : " ") + t;
					};
				}
			),
			{});
	Fe.transitional = function (n, o, r) {
		function i(e, t) {
			return "[Axios v1.6.7] Transitional option '" + e + "'" + t + (r ? ". " + r : "");
		}
		return function (e, t, r) {
			if (!1 === n)
				throw new E(i(t, " has been removed" + (o ? " in " + o : "")), E.ERR_DEPRECATED);
			return (
				o &&
					!Ue[t] &&
					((Ue[t] = !0),
					console.warn(
						i(
							t,
							" has been deprecated since v" +
								o +
								" and will be removed in the near future"
						)
					)),
				!n || n(e, t, r)
			);
		};
	};
	var De = {
			assertOptions: function (e, t, r) {
				if ("object" !== h(e))
					throw new E("options must be an object", E.ERR_BAD_OPTION_VALUE);
				for (var n = Object.keys(e), o = n.length; 0 < o--; ) {
					var i = n[o],
						a = t[i];
					if (a) {
						var s = e[i],
							a = void 0 === s || a(s, i, e);
						if (!0 !== a)
							throw new E("option " + i + " must be " + a, E.ERR_BAD_OPTION_VALUE);
					} else if (!0 !== r) throw new E("Unknown option " + i, E.ERR_BAD_OPTION);
				}
			},
			validators: Fe
		},
		L = De.validators,
		C = (() => {
			function t(e) {
				i(this, t),
					(this.defaults = e),
					(this.interceptors = { request: new ye(), response: new ye() });
			}
			var s, r;
			return (
				n(t, [
					{
						key: "request",
						value:
							((s = S().mark(function e(t, r) {
								var n, o;
								return S().wrap(
									function (e) {
										for (;;)
											switch ((e.prev = e.next)) {
												case 0:
													return (
														(e.prev = 0),
														(e.next = 3),
														this._request(t, r)
													);
												case 3:
													return e.abrupt("return", e.sent);
												case 6:
													throw (
														((e.prev = 6),
														(e.t0 = e.catch(0)),
														e.t0 instanceof Error &&
															(Error.captureStackTrace
																? Error.captureStackTrace((n = {}))
																: (n = new Error()),
															(o = n.stack
																? n.stack.replace(/^.+\n/, "")
																: ""),
															e.t0.stack
																? o &&
																	!String(e.t0.stack).endsWith(
																		o.replace(/^.+\n.+\n/, "")
																	) &&
																	(e.t0.stack += "\n" + o)
																: (e.t0.stack = o)),
														e.t0)
													);
												case 10:
												case "end":
													return e.stop();
											}
									},
									e,
									this,
									[[0, 6]]
								);
							})),
							(r = function () {
								var e = this,
									a = arguments;
								return new Promise(function (t, r) {
									var n = s.apply(e, a);
									function o(e) {
										B(n, t, r, o, i, "next", e);
									}
									function i(e) {
										B(n, t, r, o, i, "throw", e);
									}
									o(void 0);
								});
							}),
							function (e, t) {
								return r.apply(this, arguments);
							})
					},
					{
						key: "_request",
						value: function (e, t) {
							"string" == typeof e ? ((t = t || {}).url = e) : (t = e || {});
							var r,
								e = (t = _(this.defaults, t)),
								n = e.transitional,
								o = e.paramsSerializer,
								i = e.headers,
								e =
									(void 0 !== n &&
										De.assertOptions(
											n,
											{
												silentJSONParsing: L.transitional(L.boolean),
												forcedJSONParsing: L.transitional(L.boolean),
												clarifyTimeoutError: L.transitional(L.boolean)
											},
											!1
										),
									null != o &&
										(w.isFunction(o)
											? (t.paramsSerializer = { serialize: o })
											: De.assertOptions(
													o,
													{ encode: L.function, serialize: L.function },
													!0
												)),
									(t.method = (
										t.method ||
										this.defaults.method ||
										"get"
									).toLowerCase()),
									i && w.merge(i.common, i[t.method])),
								a =
									(i &&
										w.forEach(
											[
												"delete",
												"get",
												"head",
												"post",
												"put",
												"patch",
												"common"
											],
											function (e) {
												delete i[e];
											}
										),
									(t.headers = N.concat(e, i)),
									[]),
								s = !0,
								u =
									(this.interceptors.request.forEach(function (e) {
										("function" == typeof e.runWhen && !1 === e.runWhen(t)) ||
											((s = s && e.synchronous),
											a.unshift(e.fulfilled, e.rejected));
									}),
									[]),
								c =
									(this.interceptors.response.forEach(function (e) {
										u.push(e.fulfilled, e.rejected);
									}),
									0);
							if (s) {
								for (var l = a.length, f = t, c = 0; c < l; ) {
									var h = a[c++],
										d = a[c++];
									try {
										f = h(f);
									} catch (e) {
										d.call(this, e);
										break;
									}
								}
								try {
									r = Le.call(this, f);
								} catch (e) {
									return Promise.reject(e);
								}
								for (c = 0, l = u.length; c < l; ) r = r.then(u[c++], u[c++]);
							} else {
								var p = [Le.bind(this), void 0];
								for (
									p.unshift.apply(p, a),
										p.push.apply(p, u),
										l = p.length,
										r = Promise.resolve(t);
									c < l;

								)
									r = r.then(p[c++], p[c++]);
							}
							return r;
						}
					},
					{
						key: "getUri",
						value: function (e) {
							return pe(
								je((e = _(this.defaults, e)).baseURL, e.url),
								e.params,
								e.paramsSerializer
							);
						}
					}
				]),
				t
			);
		})(),
		F =
			(w.forEach(["delete", "get", "head", "options"], function (r) {
				C.prototype[r] = function (e, t) {
					return this.request(_(t || {}, { method: r, url: e, data: (t || {}).data }));
				};
			}),
			w.forEach(["post", "put", "patch"], function (o) {
				function e(n) {
					return function (e, t, r) {
						return this.request(
							_(r || {}, {
								method: o,
								headers: n ? { "Content-Type": "multipart/form-data" } : {},
								url: e,
								data: t
							})
						);
					};
				}
				(C.prototype[o] = e()), (C.prototype[o + "Form"] = e(!0));
			}),
			C),
		ie = (() => {
			function r(e) {
				if ((i(this, r), "function" != typeof e))
					throw new TypeError("executor must be a function.");
				this.promise = new Promise(function (e) {
					n = e;
				});
				var n,
					o = this;
				this.promise.then(function (e) {
					if (o._listeners) {
						for (var t = o._listeners.length; 0 < t--; ) o._listeners[t](e);
						o._listeners = null;
					}
				}),
					(this.promise.then = function (e) {
						var t,
							e = new Promise(function (e) {
								o.subscribe(e), (t = e);
							}).then(e);
						return (
							(e.cancel = function () {
								o.unsubscribe(t);
							}),
							e
						);
					}),
					e(function (e, t, r) {
						o.reason || ((o.reason = new k(e, t, r)), n(o.reason));
					});
			}
			return (
				n(
					r,
					[
						{
							key: "throwIfRequested",
							value: function () {
								if (this.reason) throw this.reason;
							}
						},
						{
							key: "subscribe",
							value: function (e) {
								this.reason
									? e(this.reason)
									: this._listeners
										? this._listeners.push(e)
										: (this._listeners = [e]);
							}
						},
						{
							key: "unsubscribe",
							value: function (e) {
								this._listeners &&
									-1 !== (e = this._listeners.indexOf(e)) &&
									this._listeners.splice(e, 1);
							}
						}
					],
					[
						{
							key: "source",
							value: function () {
								var t;
								return {
									token: new r(function (e) {
										t = e;
									}),
									cancel: t
								};
							}
						}
					]
				),
				r
			);
		})();
	var Be = {
			Continue: 100,
			SwitchingProtocols: 101,
			Processing: 102,
			EarlyHints: 103,
			Ok: 200,
			Created: 201,
			Accepted: 202,
			NonAuthoritativeInformation: 203,
			NoContent: 204,
			ResetContent: 205,
			PartialContent: 206,
			MultiStatus: 207,
			AlreadyReported: 208,
			ImUsed: 226,
			MultipleChoices: 300,
			MovedPermanently: 301,
			Found: 302,
			SeeOther: 303,
			NotModified: 304,
			UseProxy: 305,
			Unused: 306,
			TemporaryRedirect: 307,
			PermanentRedirect: 308,
			BadRequest: 400,
			Unauthorized: 401,
			PaymentRequired: 402,
			Forbidden: 403,
			NotFound: 404,
			MethodNotAllowed: 405,
			NotAcceptable: 406,
			ProxyAuthenticationRequired: 407,
			RequestTimeout: 408,
			Conflict: 409,
			Gone: 410,
			LengthRequired: 411,
			PreconditionFailed: 412,
			PayloadTooLarge: 413,
			UriTooLong: 414,
			UnsupportedMediaType: 415,
			RangeNotSatisfiable: 416,
			ExpectationFailed: 417,
			ImATeapot: 418,
			MisdirectedRequest: 421,
			UnprocessableEntity: 422,
			Locked: 423,
			FailedDependency: 424,
			TooEarly: 425,
			UpgradeRequired: 426,
			PreconditionRequired: 428,
			TooManyRequests: 429,
			RequestHeaderFieldsTooLarge: 431,
			UnavailableForLegalReasons: 451,
			InternalServerError: 500,
			NotImplemented: 501,
			BadGateway: 502,
			ServiceUnavailable: 503,
			GatewayTimeout: 504,
			HttpVersionNotSupported: 505,
			VariantAlsoNegotiates: 506,
			InsufficientStorage: 507,
			LoopDetected: 508,
			NotExtended: 510,
			NetworkAuthenticationRequired: 511
		},
		Y =
			(Object.entries(Be).forEach(function (e) {
				var e = c(e, 2),
					t = e[0];
				Be[e[1]] = t;
			}),
			Be);
	v = (function t(r) {
		var e = new F(r),
			n = J(F.prototype.request, e);
		return (
			w.extend(n, F.prototype, e, { allOwnKeys: !0 }),
			w.extend(n, e, null, { allOwnKeys: !0 }),
			(n.create = function (e) {
				return t(_(r, e));
			}),
			n
		);
	})(be);
	return (
		(v.Axios = F),
		(v.CanceledError = k),
		(v.CancelToken = ie),
		(v.isCancel = Re),
		(v.VERSION = "1.6.7"),
		(v.toFormData = R),
		(v.AxiosError = E),
		(v.Cancel = v.CanceledError),
		(v.all = function (e) {
			return Promise.all(e);
		}),
		(v.spread = function (t) {
			return function (e) {
				return t.apply(null, e);
			};
		}),
		(v.isAxiosError = function (e) {
			return w.isObject(e) && !0 === e.isAxiosError;
		}),
		(v.mergeConfig = _),
		(v.AxiosHeaders = N),
		(v.formToJSON = function (e) {
			return ge(w.isHTMLForm(e) ? new FormData(e) : e);
		}),
		(v.getAdapter = ke),
		(v.HttpStatusCode = Y),
		(v.default = v)
	);
})();
