((t, e) => {
	"object" == typeof exports && "undefined" != typeof module
		? e(exports, require("./empty"))
		: "function" == typeof define && define.amd
			? define(["exports", "./empty"], e)
			: e((t.jsondiffpatch = {}), t.chalk);
})(this, function (t, e) {
	e = e && e.hasOwnProperty("default") ? e.default : e;
	function i(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
	}
	var f =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (t) {
						return typeof t;
					}
				: function (t) {
						return t &&
							"function" == typeof Symbol &&
							t.constructor === Symbol &&
							t !== Symbol.prototype
							? "symbol"
							: typeof t;
					},
		n = function (t, e, n) {
			return e && S(t.prototype, e), n && S(t, n), t;
		};
	function S(t, e) {
		for (var n = 0; n < e.length; n++) {
			var i = e[n];
			(i.enumerable = i.enumerable || !1),
				(i.configurable = !0),
				"value" in i && (i.writable = !0),
				Object.defineProperty(t, i.key, i);
		}
	}
	function r(t, e, n) {
		null === t && (t = Function.prototype);
		var i = Object.getOwnPropertyDescriptor(t, e);
		return void 0 !== i
			? "value" in i
				? i.value
				: void 0 !== (i = i.get)
					? i.call(n)
					: void 0
			: null !== (i = Object.getPrototypeOf(t))
				? r(i, e, n)
				: void 0;
	}
	function o(t, e) {
		if ("function" != typeof e && null !== e)
			throw new TypeError(
				"Super expression must either be null or a function, not " + typeof e
			);
		(t.prototype = Object.create(e && e.prototype, {
			constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 }
		})),
			e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : (t.__proto__ = e));
	}
	function a(t, e) {
		if (t) return !e || ("object" != typeof e && "function" != typeof e) ? t : e;
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}
	var B = function (t, e) {
			if (Array.isArray(t)) return t;
			if (Symbol.iterator in Object(t)) {
				var n = e,
					i = [],
					r = !0,
					e = !1,
					o = void 0;
				try {
					for (
						var a, s = t[Symbol.iterator]();
						!(r = (a = s.next()).done) && (i.push(a.value), !n || i.length !== n);
						r = !0
					);
				} catch (t) {
					(e = !0), (o = t);
				} finally {
					try {
						!r && s.return && s.return();
					} finally {
						if (e) throw o;
					}
				}
				return i;
			}
			throw new TypeError("Invalid attempt to destructure non-iterable instance");
		},
		s = function (t) {
			if (Array.isArray(t)) {
				for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
				return n;
			}
			return Array.from(t);
		},
		F =
			(n(l, [
				{
					key: "options",
					value: function (t) {
						return t && (this.selfOptions = t), this.selfOptions;
					}
				},
				{
					key: "pipe",
					value: function (t, e) {
						if ("string" == typeof t) {
							if (void 0 === e) return this.pipes[t];
							this.pipes[t] = e;
						}
						if (t && t.name) {
							if ((e = t).processor === this) return e;
							this.pipes[e.name] = e;
						}
						return (e.processor = this), e;
					}
				},
				{
					key: "process",
					value: function (t, e) {
						for (
							var n,
								i,
								r = t,
								o = ((r.options = this.options()), e || t.pipe || "default");
							o;

						)
							void 0 !== r.nextAfterChildren &&
								((r.next = r.nextAfterChildren), (r.nextAfterChildren = null)),
								(o = "string" == typeof o ? this.pipe(o) : o).process(r),
								(n = o),
								(o = null),
								(i = r) &&
									r.next &&
									((r = r.next), (o = i.nextPipe || r.pipe || n));
						return r.hasResult ? r.result : void 0;
					}
				}
			]),
			l);
	function l(t) {
		i(this, l), (this.selfOptions = t || {}), (this.pipes = {});
	}
	n(u, [
		{
			key: "process",
			value: function (t) {
				if (!this.processor)
					throw new Error("add this pipe to a processor before using it");
				for (var e = this.debug, n = this.filters.length, i = t, r = 0; r < n; r++) {
					var o = this.filters[r];
					if (
						(e && this.log("filter: " + o.filterName),
						o(i),
						"object" === (void 0 === i ? "undefined" : f(i)) && i.exiting)
					) {
						i.exiting = !1;
						break;
					}
				}
				!i.next && this.resultCheck && this.resultCheck(i);
			}
		},
		{
			key: "log",
			value: function (t) {
				console.log("[jsondiffpatch] " + this.name + " pipe, " + t);
			}
		},
		{
			key: "append",
			value: function () {
				var t;
				return (t = this.filters).push.apply(t, arguments), this;
			}
		},
		{
			key: "prepend",
			value: function () {
				var t;
				return (t = this.filters).unshift.apply(t, arguments), this;
			}
		},
		{
			key: "indexOf",
			value: function (t) {
				if (!t) throw new Error("a filter name is required");
				for (var e = 0; e < this.filters.length; e++)
					if (this.filters[e].filterName === t) return e;
				throw new Error("filter not found: " + t);
			}
		},
		{
			key: "list",
			value: function () {
				return this.filters.map(function (t) {
					return t.filterName;
				});
			}
		},
		{
			key: "after",
			value: function (t) {
				var t = this.indexOf(t),
					e = Array.prototype.slice.call(arguments, 1);
				if (e.length)
					return e.unshift(t + 1, 0), Array.prototype.splice.apply(this.filters, e), this;
				throw new Error("a filter is required");
			}
		},
		{
			key: "before",
			value: function (t) {
				var t = this.indexOf(t),
					e = Array.prototype.slice.call(arguments, 1);
				if (e.length)
					return e.unshift(t, 0), Array.prototype.splice.apply(this.filters, e), this;
				throw new Error("a filter is required");
			}
		},
		{
			key: "replace",
			value: function (t) {
				var t = this.indexOf(t),
					e = Array.prototype.slice.call(arguments, 1);
				if (e.length)
					return e.unshift(t, 1), Array.prototype.splice.apply(this.filters, e), this;
				throw new Error("a filter is required");
			}
		},
		{
			key: "remove",
			value: function (t) {
				t = this.indexOf(t);
				return this.filters.splice(t, 1), this;
			}
		},
		{
			key: "clear",
			value: function () {
				return (this.filters.length = 0), this;
			}
		},
		{
			key: "shouldHaveResult",
			value: function (t) {
				var e;
				if (!1 === t) this.resultCheck = null;
				else if (!this.resultCheck)
					return (
						((e = this).resultCheck = function (t) {
							if (!t.hasResult)
								throw (
									(console.log(t),
									((t = new Error(e.name + " failed")).noResult = !0),
									t)
								);
						}),
						this
					);
			}
		}
	]);
	var h = u;
	function u(t) {
		i(this, u), (this.name = t), (this.filters = []);
	}
	n(d, [
		{
			key: "setResult",
			value: function (t) {
				return (this.result = t), (this.hasResult = !0), this;
			}
		},
		{
			key: "exit",
			value: function () {
				return (this.exiting = !0), this;
			}
		},
		{
			key: "switchTo",
			value: function (t, e) {
				return (
					"string" == typeof t || t instanceof h
						? (this.nextPipe = t)
						: ((this.next = t), e && (this.nextPipe = e)),
					this
				);
			}
		},
		{
			key: "push",
			value: function (t, e) {
				return (
					(t.parent = this),
					void 0 !== e && (t.childName = e),
					(t.root = this.root || this),
					(t.options = t.options || this.options),
					this.children
						? ((this.children[this.children.length - 1].next = t),
							this.children.push(t))
						: ((this.children = [t]),
							(this.nextAfterChildren = this.next || null),
							(this.next = t)),
					(t.next = this)
				);
			}
		}
	]);
	var c = d;
	function d() {
		i(this, d);
	}
	var L =
		"function" == typeof Array.isArray
			? Array.isArray
			: function (t) {
					return t instanceof Array;
				};
	function p(t) {
		if ("object" !== (void 0 === t ? "undefined" : f(t))) return t;
		if (null === t) return null;
		if (L(t)) return t.map(p);
		if (t instanceof Date) return new Date(t.getTime());
		if (t instanceof RegExp)
			return (e = /^\/(.*)\/([gimyu]*)$/.exec((e = t).toString())), new RegExp(e[1], e[2]);
		var e,
			n,
			i = {};
		for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (i[n] = p(t[n]));
		return i;
	}
	o(g, c),
		n(g, [
			{
				key: "setResult",
				value: function (t) {
					var e;
					return (
						this.options.cloneDiffValues &&
							"object" === (void 0 === t ? "undefined" : f(t)) &&
							((e =
								"function" == typeof this.options.cloneDiffValues
									? this.options.cloneDiffValues
									: p),
							"object" === f(t[0]) && (t[0] = e(t[0])),
							"object" === f(t[1])) &&
							(t[1] = e(t[1])),
						c.prototype.setResult.apply(this, arguments)
					);
				}
			}
		]);
	var k = g;
	function g(t, e) {
		i(this, g);
		var n = a(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this));
		return (n.left = t), (n.right = e), (n.pipe = "diff"), n;
	}
	o(y, c);
	var v = y;
	function y(t, e) {
		i(this, y);
		var n = a(this, (y.__proto__ || Object.getPrototypeOf(y)).call(this));
		return (n.left = t), (n.delta = e), (n.pipe = "patch"), n;
	}
	o(_, c);
	var m = _;
	function _(t) {
		i(this, _);
		var e = a(this, (_.__proto__ || Object.getPrototypeOf(_)).call(this));
		return (e.delta = t), (e.pipe = "reverse"), e;
	}
	function V(t) {
		if (t.left === t.right) t.setResult(void 0).exit();
		else if (void 0 === t.left) {
			if ("function" == typeof t.right) throw new Error("functions are not supported");
			t.setResult([t.right]).exit();
		} else if (void 0 === t.right) t.setResult([t.left, 0, 0]).exit();
		else {
			if ("function" == typeof t.left || "function" == typeof t.right)
				throw new Error("functions are not supported");
			(t.leftType = null === t.left ? "null" : f(t.left)),
				(t.rightType = null === t.right ? "null" : f(t.right)),
				t.leftType !== t.rightType ||
				"boolean" === t.leftType ||
				"number" === t.leftType ||
				("object" === t.leftType && (t.leftIsArray = b(t.left)),
				"object" === t.rightType && (t.rightIsArray = b(t.right)),
				t.leftIsArray !== t.rightIsArray)
					? t.setResult([t.left, t.right]).exit()
					: t.left instanceof RegExp &&
						(t.right instanceof RegExp
							? t.setResult([t.left.toString(), t.right.toString()])
							: t.setResult([t.left, t.right])
						).exit();
		}
	}
	function q(t) {
		if (void 0 === t.delta) t.setResult(t.left).exit();
		else if (((t.nested = !b(t.delta)), !t.nested))
			if (1 === t.delta.length) t.setResult(t.delta[0]).exit();
			else if (2 === t.delta.length) {
				if (t.left instanceof RegExp) {
					var e = /^\/(.*)\/([gimyu]+)$/.exec(t.delta[1]);
					if (e) return void t.setResult(new RegExp(e[1], e[2])).exit();
				}
				t.setResult(t.delta[1]).exit();
			} else 3 === t.delta.length && 0 === t.delta[2] && t.setResult(void 0).exit();
	}
	function U(t) {
		void 0 === t.delta
			? t.setResult(t.delta).exit()
			: ((t.nested = !b(t.delta)),
				t.nested ||
					(1 === t.delta.length
						? t.setResult([t.delta[0], 0, 0]).exit()
						: 2 === t.delta.length
							? t.setResult([t.delta[1], t.delta[0]]).exit()
							: 3 === t.delta.length &&
								0 === t.delta[2] &&
								t.setResult([t.delta[0]]).exit()));
	}
	var b =
		"function" == typeof Array.isArray
			? Array.isArray
			: function (t) {
					return t instanceof Array;
				};
	function H(t) {
		if (t && t.children) {
			for (var e, n = t.children.length, i = t.result, r = 0; r < n; r++)
				void 0 !== (e = t.children[r]).result && ((i = i || {})[e.childName] = e.result);
			i && t.leftIsArray && (i._t = "a"), t.setResult(i).exit();
		}
	}
	function z(t) {
		if (!t.leftIsArray && "object" === t.leftType) {
			var e = void 0,
				n = void 0,
				i = t.options.propertyFilter;
			for (e in t.left)
				!Object.prototype.hasOwnProperty.call(t.left, e) ||
					(i && !i(e, t)) ||
					((n = new k(t.left[e], t.right[e])), t.push(n, e));
			for (e in t.right)
				!Object.prototype.hasOwnProperty.call(t.right, e) ||
					(i && !i(e, t)) ||
					(void 0 === t.left[e] && ((n = new k(void 0, t.right[e])), t.push(n, e)));
			(t.children && 0 !== t.children.length ? t : t.setResult(void 0)).exit();
		}
	}
	(U.filterName = q.filterName = V.filterName = "trivial"), (H.filterName = "collectChildren");
	function $(t) {
		if (t.nested && !t.delta._t) {
			var e,
				n = void 0;
			for (n in t.delta) (e = new v(t.left[n], t.delta[n])), t.push(e, n);
			t.exit();
		}
	}
	function Q(t) {
		if (t && t.children && !t.delta._t) {
			for (var e, n = t.children.length, i = 0; i < n; i++)
				(e = t.children[i]),
					Object.prototype.hasOwnProperty.call(t.left, e.childName) && void 0 === e.result
						? delete t.left[e.childName]
						: t.left[e.childName] !== e.result && (t.left[e.childName] = e.result);
			t.setResult(t.left).exit();
		}
	}
	function J(t) {
		if (t.nested && !t.delta._t) {
			var e,
				n = void 0;
			for (n in t.delta) (e = new m(t.delta[n])), t.push(e, n);
			t.exit();
		}
	}
	($.filterName = z.filterName = "objects"), (Q.filterName = "collectChildren");
	function K(t) {
		if (t && t.children && !t.delta._t) {
			for (var e, n = t.children.length, i = {}, r = 0; r < n; r++)
				i[(e = t.children[r]).childName] !== e.result && (i[e.childName] = e.result);
			t.setResult(i).exit();
		}
	}
	(J.filterName = "objects"), (K.filterName = "collectChildren");
	function Z(t, e, n, i) {
		return t[n] === e[i];
	}
	var W = function (t, e, n, i) {
			(i = i || {}),
				(n = ((t, e, n, i) => {
					for (
						var r,
							o = e.length,
							a = n.length,
							s = { sequence: [], indices1: [], indices2: [] };
						0 !== o && 0 !== a;

					)
						t.match(e, n, o - 1, a - 1, i)
							? (s.sequence.unshift(e[o - 1]),
								s.indices1.unshift(o - 1),
								s.indices2.unshift(a - 1),
								--o,
								--a)
							: ((r = t[o][a - 1]), t[o - 1][a] < r ? --a : --o);
					return s;
				})(
					((t, e, n, i) => {
						for (
							var r = t.length,
								o = e.length,
								a = void 0,
								s = void 0,
								f = [r + 1],
								a = 0;
							a < r + 1;
							a++
						)
							for (f[a] = [o + 1], s = 0; s < o + 1; s++) f[a][s] = 0;
						for (f.match = n, a = 1; a < r + 1; a++)
							for (s = 1; s < o + 1; s++)
								n(t, e, a - 1, s - 1, i)
									? (f[a][s] = f[a - 1][s - 1] + 1)
									: (f[a][s] = Math.max(f[a - 1][s], f[a][s - 1]));
						return f;
					})(t, e, n || Z, i),
					t,
					e,
					i
				));
			return (
				"string" == typeof t && "string" == typeof e && (n.sequence = n.sequence.join("")),
				n
			);
		},
		j = 3,
		X =
			"function" == typeof Array.isArray
				? Array.isArray
				: function (t) {
						return t instanceof Array;
					},
		G =
			"function" == typeof Array.prototype.indexOf
				? function (t, e) {
						return t.indexOf(e);
					}
				: function (t, e) {
						for (var n = t.length, i = 0; i < n; i++) if (t[i] === e) return i;
						return -1;
					};
	function A(t, e, n, i, r) {
		var o,
			a,
			s,
			t = t[n],
			e = e[i];
		return (
			t === e ||
			("object" === (void 0 === t ? "undefined" : f(t)) &&
				"object" === (void 0 === e ? "undefined" : f(e)) &&
				((o = r.objectHash)
					? ((s = a = void 0),
						"number" == typeof n
							? ((r.hashCache1 = r.hashCache1 || []),
								void 0 === (a = r.hashCache1[n]) && (r.hashCache1[n] = a = o(t, n)))
							: (a = o(t)),
						void 0 !== a &&
							("number" == typeof i
								? ((r.hashCache2 = r.hashCache2 || []),
									void 0 === (s = r.hashCache2[i]) &&
										(r.hashCache2[i] = s = o(e, i)))
								: (s = o(e)),
							void 0 !== s) &&
							a === s)
					: r.matchByPosition && n === i))
		);
	}
	function Y(t) {
		if (t.leftIsArray) {
			var e = {
					objectHash: t.options && t.options.objectHash,
					matchByPosition: t.options && t.options.matchByPosition
				},
				n = 0,
				i = 0,
				r = void 0,
				o = void 0,
				a = void 0,
				s = t.left,
				f = t.right,
				l = s.length,
				h = f.length,
				u = void 0;
			for (
				0 < l &&
				0 < h &&
				!e.objectHash &&
				"boolean" != typeof e.matchByPosition &&
				(e.matchByPosition = !((t, e, n, i) => {
					for (var r = 0; r < n; r++)
						for (var o = t[r], a = 0; a < i; a++) {
							var s = e[a];
							if (r !== a && o === s) return 1;
						}
				})(s, f, l, h));
				n < l && n < h && A(s, f, n, n, e);

			)
				(r = n), (u = new k(t.left[r], t.right[r])), t.push(u, r), n++;
			for (; i + n < l && i + n < h && A(s, f, l - 1 - i, h - 1 - i, e); )
				(u = new k(t.left[(o = l - 1 - i)], t.right[(a = h - 1 - i)])), t.push(u, a), i++;
			var c = void 0;
			if (n + i === l)
				if (l === h) t.setResult(void 0).exit();
				else {
					for (c = c || { _t: "a" }, r = n; r < h - i; r++) c[r] = [f[r]];
					t.setResult(c).exit();
				}
			else {
				if (n + i === h)
					for (c = c || { _t: "a" }, r = n; r < l - i; r++) c["_" + r] = [s[r], 0, 0];
				else {
					delete e.hashCache1, delete e.hashCache2;
					for (
						var d = s.slice(n, l - i),
							p = f.slice(n, h - i),
							g = W(d, p, A, e),
							v = [],
							c = c || { _t: "a" },
							r = n;
						r < l - i;
						r++
					)
						G(g.indices1, r - n) < 0 && ((c["_" + r] = [s[r], 0, 0]), v.push(r));
					var y = !0,
						m =
							(t.options &&
								t.options.arrays &&
								!1 === t.options.arrays.detectMove &&
								(y = !1),
							!1),
						_ =
							(t.options &&
								t.options.arrays &&
								t.options.arrays.includeValueOnMove &&
								(m = !0),
							v.length);
					for (r = n; r < h - i; r++) {
						var b = G(g.indices2, r - n);
						if (b < 0) {
							var x = !1;
							if (y && 0 < _)
								for (var w = 0; w < _; w++)
									if (A(d, p, (o = v[w]) - n, r - n, e)) {
										c["_" + o].splice(1, 2, r, j),
											m || (c["_" + o][0] = ""),
											(a = r),
											(u = new k(t.left[o], t.right[a])),
											t.push(u, a),
											v.splice(w, 1),
											(x = !0);
										break;
									}
							x || (c[r] = [f[r]]);
						} else
							(o = g.indices1[b] + n),
								(a = g.indices2[b] + n),
								(u = new k(t.left[o], t.right[a])),
								t.push(u, a);
					}
				}
				t.setResult(c).exit();
			}
		}
	}
	function tt(t) {
		if (t.nested && "a" === t.delta._t) {
			var e = void 0,
				n = t.delta,
				i = t.left,
				r = [],
				o = [],
				a = [];
			for (e in n)
				if ("_t" !== e)
					if ("_" === e[0]) {
						if (0 !== n[e][2] && n[e][2] !== j)
							throw new Error(
								"only removal or move can be applied at original array indices, invalid diff type: " +
									n[e][2]
							);
						r.push(parseInt(e.slice(1), 10));
					} else
						1 === n[e].length
							? o.push({ index: parseInt(e, 10), value: n[e][0] })
							: a.push({ index: parseInt(e, 10), delta: n[e] });
			for (e = (r = r.sort(it)).length - 1; 0 <= e; e--) {
				var s = n["_" + (f = r[e])],
					f = i.splice(f, 1)[0];
				s[2] === j && o.push({ index: s[1], value: f });
			}
			for (var l = (o = o.sort(rt("index"))).length, e = 0; e < l; e++) {
				var h = o[e];
				i.splice(h.index, 0, h.value);
			}
			var u = a.length;
			if (0 < u)
				for (e = 0; e < u; e++) {
					var c = a[e],
						d = new v(t.left[c.index], c.delta);
					t.push(d, c.index);
				}
			(t.children ? t : t.setResult(t.left)).exit();
		}
	}
	function et(t) {
		if (t && t.children && "a" === t.delta._t) {
			for (var e, n = t.children.length, i = 0; i < n; i++)
				(e = t.children[i]), (t.left[e.childName] = e.result);
			t.setResult(t.left).exit();
		}
	}
	function nt(t) {
		if (t.nested) {
			if ("a" === t.delta._t) {
				var e,
					n = void 0;
				for (n in t.delta) "_t" !== n && ((e = new m(t.delta[n])), t.push(e, n));
				t.exit();
			}
		} else
			t.delta[2] === j &&
				((t.newName = "_" + t.delta[1]),
				t.setResult([t.delta[0], parseInt(t.childName.substr(1), 10), j]).exit());
	}
	var it = function (t, e) {
			return t - e;
		},
		rt = function (n) {
			return function (t, e) {
				return t[n] - e[n];
			};
		};
	(tt.filterName = Y.filterName = "arrays"),
		(et.filterName = "arraysCollectChildren"),
		(nt.filterName = "arrays");
	function ot(t) {
		if (t && t.children && "a" === t.delta._t) {
			for (var e = t.children.length, n = { _t: "a" }, i = 0; i < e; i++) {
				var r,
					o = (r = t.children[i]).newName;
				n[
					(o =
						void 0 === o
							? ((t, e, n) => {
									if ("string" == typeof e && "_" === e[0])
										return parseInt(e.substr(1), 10);
									if (X(n) && 0 === n[2]) return "_" + e;
									var i,
										r = +e;
									for (i in t) {
										var o = t[i];
										if (X(o))
											if (o[2] === j) {
												var a = parseInt(i.substr(1), 10),
													s = o[1];
												if (s === +e) return a;
												a <= r && r < s ? r++ : r <= a && s < r && r--;
											} else
												0 === o[2]
													? parseInt(i.substr(1), 10) <= r && r++
													: 1 === o.length && i <= r && r--;
									}
									return r;
								})(t.delta, r.childName, r.result)
							: o)
				] !== r.result && (n[o] = r.result);
			}
			t.setResult(n).exit();
		}
	}
	ot.filterName = "arraysCollectChildren";
	function at(t) {
		t.left instanceof Date
			? (!(t.right instanceof Date) || t.left.getTime() !== t.right.getTime()
					? t.setResult([t.left, t.right])
					: t.setResult(void 0),
				t.exit())
			: t.right instanceof Date && t.setResult([t.left, t.right]).exit();
	}
	at.filterName = "dates";
	function st(t) {
		if (!ct) {
			var r = void 0;
			if ("undefined" != typeof diff_match_patch)
				r = new (
					"function" == typeof diff_match_patch
						? diff_match_patch
						: diff_match_patch.diff_match_patch
				)();
			else if (ut)
				try {
					r = ut && new ut();
				} catch (t) {
					r = null;
				}
			if (!r) {
				if (t)
					throw (
						(((t = new Error(
							"text diff_match_patch library not found"
						)).diff_match_patch_not_found = !0),
						t)
					);
				return null;
			}
			ct = {
				diff: function (t, e) {
					return r.patch_toText(r.patch_make(t, e));
				},
				patch: function (t, e) {
					for (var n = r.patch_apply(r.patch_fromText(e), t), i = 0; i < n[1].length; i++)
						n[1][i] || (new Error("text patch failed").textPatchFailed = !0);
					return n[0];
				}
			};
		}
		return ct;
	}
	function ft(t) {
		var e;
		"string" === t.leftType &&
			((e = (t.options && t.options.textDiff && t.options.textDiff.minLength) || 60),
			(!(t.left.length < e || t.right.length < e) && (e = st())
				? ((e = e.diff), t.setResult([e(t.left, t.right), 0, 2]))
				: t.setResult([t.left, t.right])
			).exit());
	}
	function lt(t) {
		var e;
		t.nested ||
			(2 === t.delta[2] && ((e = st(!0).patch), t.setResult(e(t.left, t.delta[0])).exit()));
	}
	function ht(t) {
		t.nested ||
			(2 === t.delta[2] &&
				t
					.setResult([
						(t => {
							for (
								var e,
									n = void 0,
									i = void 0,
									r = void 0,
									o = /^@@ +-(\d+),(\d+) +\+(\d+),(\d+) +@@$/,
									n = 0,
									a = (i = t.split("\n")).length;
								n < a;
								n++
							) {
								var s = (r = i[n]).slice(0, 1);
								"@" === s
									? ((e = o.exec(r)),
										(i[n] =
											"@@ -" +
											e[3] +
											"," +
											e[4] +
											" +" +
											e[1] +
											"," +
											e[2] +
											" @@"))
									: "+" === s
										? ((i[n] = "-" + i[n].slice(1)),
											"+" === i[n - 1].slice(0, 1) &&
												((e = i[n]), (i[n] = i[n - 1]), (i[n - 1] = e)))
										: "-" === s && (i[n] = "+" + i[n].slice(1));
							}
							return i.join("\n");
						})(t.delta[0]),
						0,
						2
					])
					.exit());
	}
	(function (t) {
		function g() {
			(this.Diff_Timeout = 1),
				(this.Diff_EditCost = 4),
				(this.Match_Threshold = 0.5),
				(this.Match_Distance = 1e3),
				(this.Patch_DeleteThreshold = 0.5),
				(this.Patch_Margin = 4),
				(this.Match_MaxBits = 32);
		}
		(g.prototype.diff_main = function (t, e, n, i) {
			var r,
				o,
				a,
				i = (i =
					void 0 === i
						? this.Diff_Timeout <= 0
							? Number.MAX_VALUE
							: new Date().getTime() + 1e3 * this.Diff_Timeout
						: i);
			if (null == t || null == e) throw new Error("Null input. (diff_main)");
			return t == e
				? t
					? [[0, t]]
					: []
				: ((n = n = void 0 === n || n),
					(a = this.diff_commonPrefix(t, e)),
					(r = t.substring(0, a)),
					(t = t.substring(a)),
					(e = e.substring(a)),
					(a = this.diff_commonSuffix(t, e)),
					(o = t.substring(t.length - a)),
					(t = t.substring(0, t.length - a)),
					(e = e.substring(0, e.length - a)),
					(a = this.diff_compute_(t, e, n, i)),
					r && a.unshift([0, r]),
					o && a.push([0, o]),
					this.diff_cleanupMerge(a),
					a);
		}),
			(g.prototype.diff_compute_ = function (t, e, n, i) {
				var r, o, a, s, f;
				return t
					? e
						? -1 !=
							(a = (s = t.length > e.length ? t : e).indexOf(
								(r = e.length < t.length ? e : t)
							))
							? ((s = [
									[1, s.substring(0, a)],
									[0, r],
									[1, s.substring(a + r.length)]
								]),
								t.length > e.length && (s[0][0] = s[2][0] = -1),
								s)
							: 1 == r.length
								? [
										[-1, t],
										[1, e]
									]
								: (a = this.diff_halfMatch_(t, e))
									? ((s = a[0]),
										(r = a[1]),
										(f = a[2]),
										(o = a[3]),
										(a = a[4]),
										(s = this.diff_main(s, f, n, i)),
										(f = this.diff_main(r, o, n, i)),
										s.concat([[0, a]], f))
									: n && 100 < t.length && 100 < e.length
										? this.diff_lineMode_(t, e, i)
										: this.diff_bisect_(t, e, i)
						: [[-1, t]]
					: [[1, e]];
			}),
			(g.prototype.diff_lineMode_ = function (t, e, n) {
				t = (h = this.diff_linesToChars_(t, e)).chars1;
				for (
					var i = h.lineArray,
						r = this.diff_main(t, (e = h.chars2), !1, n),
						o =
							(this.diff_charsToLines_(r, i),
							this.diff_cleanupSemantic(r),
							r.push([0, ""]),
							0),
						a = 0,
						s = 0,
						f = "",
						l = "";
					o < r.length;

				) {
					switch (r[o][0]) {
						case 1:
							s++, (l += r[o][1]);
							break;
						case -1:
							a++, (f += r[o][1]);
							break;
						case 0:
							if (1 <= a && 1 <= s) {
								r.splice(o - a - s, a + s);
								for (
									var h,
										o = o - a - s,
										u = (h = this.diff_main(f, l, !1, n)).length - 1;
									0 <= u;
									u--
								)
									r.splice(o, 0, h[u]);
								o += h.length;
							}
							(a = s = 0), (l = f = "");
					}
					o++;
				}
				return r.pop(), r;
			}),
			(g.prototype.diff_bisect_ = function (t, e, n) {
				for (
					var i = t.length,
						r = e.length,
						o = Math.ceil((i + r) / 2),
						a = o,
						s = 2 * o,
						f = new Array(s),
						l = new Array(s),
						h = 0;
					h < s;
					h++
				)
					(f[h] = -1), (l[h] = -1);
				f[a + 1] = 0;
				for (
					var u = i - r, c = u % 2 != (l[a + 1] = 0), d = 0, p = 0, g = 0, v = 0, y = 0;
					y < o && !(new Date().getTime() > n);
					y++
				) {
					for (var m = -y + d; m <= y - p; m += 2) {
						for (
							var _ = a + m,
								b =
									(A =
										m == -y || (m != y && f[_ - 1] < f[_ + 1])
											? f[_ + 1]
											: f[_ - 1] + 1) - m;
							A < i && b < r && t.charAt(A) == e.charAt(b);

						)
							A++, b++;
						if (i < (f[_] = A)) p += 2;
						else if (r < b) d += 2;
						else if (c) {
							var x = a + u - m;
							if (0 <= x && x < s && -1 != l[x])
								if ((k = i - l[x]) <= A)
									return this.diff_bisectSplit_(t, e, A, b, n);
						}
					}
					for (var w = -y + g; w <= y - v; w += 2) {
						for (
							var k,
								x = a + w,
								j =
									(k =
										w == -y || (w != y && l[x - 1] < l[x + 1])
											? l[x + 1]
											: l[x - 1] + 1) - w;
							k < i && j < r && t.charAt(i - k - 1) == e.charAt(r - j - 1);

						)
							k++, j++;
						if (i < (l[x] = k)) v += 2;
						else if (r < j) g += 2;
						else if (!c)
							if (0 <= (_ = a + u - w) && _ < s && -1 != f[_]) {
								var A,
									b = a + (A = f[_]) - _;
								if ((k = i - k) <= A) return this.diff_bisectSplit_(t, e, A, b, n);
							}
					}
				}
				return [
					[-1, t],
					[1, e]
				];
			}),
			(g.prototype.diff_bisectSplit_ = function (t, e, n, i, r) {
				var o = t.substring(0, n),
					a = e.substring(0, i),
					t = t.substring(n),
					n = e.substring(i),
					e = this.diff_main(o, a, !1, r),
					i = this.diff_main(t, n, !1, r);
				return e.concat(i);
			}),
			(g.prototype.diff_linesToChars_ = function (t, e) {
				var a = [],
					s = {};
				function n(t) {
					for (var e = "", n = 0, i = -1, r = a.length; i < t.length - 1; ) {
						-1 == (i = t.indexOf("\n", n)) && (i = t.length - 1);
						var o = t.substring(n, i + 1),
							n = i + 1;
						(s.hasOwnProperty ? s.hasOwnProperty(o) : void 0 !== s[o])
							? (e += String.fromCharCode(s[o]))
							: ((e += String.fromCharCode(r)), (s[o] = r), (a[r++] = o));
					}
					return e;
				}
				return (a[0] = ""), { chars1: n(t), chars2: n(e), lineArray: a };
			}),
			(g.prototype.diff_charsToLines_ = function (t, e) {
				for (var n = 0; n < t.length; n++) {
					for (var i = t[n][1], r = [], o = 0; o < i.length; o++)
						r[o] = e[i.charCodeAt(o)];
					t[n][1] = r.join("");
				}
			}),
			(g.prototype.diff_commonPrefix = function (t, e) {
				if (!t || !e || t.charAt(0) != e.charAt(0)) return 0;
				for (var n = 0, i = Math.min(t.length, e.length), r = i, o = 0; n < r; )
					t.substring(o, r) == e.substring(o, r) ? (o = n = r) : (i = r),
						(r = Math.floor((i - n) / 2 + n));
				return r;
			}),
			(g.prototype.diff_commonSuffix = function (t, e) {
				if (!t || !e || t.charAt(t.length - 1) != e.charAt(e.length - 1)) return 0;
				for (var n = 0, i = Math.min(t.length, e.length), r = i, o = 0; n < r; )
					t.substring(t.length - r, t.length - o) ==
					e.substring(e.length - r, e.length - o)
						? (o = n = r)
						: (i = r),
						(r = Math.floor((i - n) / 2 + n));
				return r;
			}),
			(g.prototype.diff_commonOverlap_ = function (t, e) {
				var n = t.length,
					i = e.length;
				if (0 == n || 0 == i) return 0;
				i < n ? (t = t.substring(n - i)) : n < i && (e = e.substring(0, n));
				var r = Math.min(n, i);
				if (t == e) return r;
				for (var o = 0, a = 1; ; ) {
					var s = t.substring(r - a),
						s = e.indexOf(s);
					if (-1 == s) return o;
					(a += s), (0 != s && t.substring(r - a) != e.substring(0, a)) || ((o = a), a++);
				}
			}),
			(g.prototype.diff_halfMatch_ = function (t, e) {
				var c, n, i, r, o, a, s, f;
				return !(this.Diff_Timeout <= 0) &&
					((r = t.length > e.length ? t : e),
					(i = e.length < t.length ? e : t),
					!(r.length < 4 || 2 * i.length < r.length)) &&
					((c = this),
					(n = l(r, i, Math.ceil(r.length / 4))),
					(i = l(r, i, Math.ceil(r.length / 2))),
					n || i)
					? ((r = !i || (n && n[4].length > i[4].length) ? n : i),
						t.length > e.length
							? ((o = r[0]), (a = r[1]), (s = r[2]), (f = r[3]))
							: ((s = r[0]), (f = r[1]), (o = r[2]), (a = r[3])),
						[o, a, s, f, r[4]])
					: null;
				function l(t, e, n) {
					for (
						var i,
							r,
							o,
							a,
							s = t.substring(n, n + Math.floor(t.length / 4)),
							f = -1,
							l = "";
						-1 != (f = e.indexOf(s, f + 1));

					) {
						var h = c.diff_commonPrefix(t.substring(n), e.substring(f)),
							u = c.diff_commonSuffix(t.substring(0, n), e.substring(0, f));
						l.length < u + h &&
							((l = e.substring(f - u, f) + e.substring(f, f + h)),
							(i = t.substring(0, n - u)),
							(r = t.substring(n + h)),
							(o = e.substring(0, f - u)),
							(a = e.substring(f + h)));
					}
					return 2 * l.length >= t.length ? [i, r, o, a, l] : null;
				}
			}),
			(g.prototype.diff_cleanupSemantic = function (t) {
				for (
					var e,
						n,
						i,
						r,
						o = !1,
						a = [],
						s = 0,
						f = null,
						l = 0,
						h = 0,
						u = 0,
						c = 0,
						d = 0;
					l < t.length;

				)
					0 == t[l][0]
						? ((h = c), (u = d), (d = c = 0), (f = t[(a[s++] = l)][1]))
						: (1 == t[l][0] ? (c += t[l][1].length) : (d += t[l][1].length),
							f &&
								f.length <= Math.max(h, u) &&
								f.length <= Math.max(c, d) &&
								(t.splice(a[s - 1], 0, [-1, f]),
								(t[a[s - 1] + 1][0] = 1),
								s--,
								(l = 0 < --s ? a[s - 1] : -1),
								(d = c = u = h = 0),
								(o = !(f = null)))),
						l++;
				for (
					o && this.diff_cleanupMerge(t), this.diff_cleanupSemanticLossless(t), l = 1;
					l < t.length;

				)
					-1 == t[l - 1][0] &&
						1 == t[l][0] &&
						((e = t[l - 1][1]),
						(n = t[l][1]),
						(i = this.diff_commonOverlap_(e, n)),
						(r = this.diff_commonOverlap_(n, e)) <= i
							? (i >= e.length / 2 || i >= n.length / 2) &&
								(t.splice(l, 0, [0, n.substring(0, i)]),
								(t[l - 1][1] = e.substring(0, e.length - i)),
								(t[l + 1][1] = n.substring(i)),
								l++)
							: (r >= e.length / 2 || r >= n.length / 2) &&
								(t.splice(l, 0, [0, e.substring(0, r)]),
								(t[l - 1][0] = 1),
								(t[l - 1][1] = n.substring(0, n.length - r)),
								(t[l + 1][0] = -1),
								(t[l + 1][1] = e.substring(r)),
								l++),
						l++),
						l++;
			}),
			(g.prototype.diff_cleanupSemanticLossless = function (t) {
				function e(t, e) {
					var n, i, r, o, a, s;
					return t && e
						? ((a = t.charAt(t.length - 1)),
							(s = e.charAt(0)),
							(n = a.match(g.nonAlphaNumericRegex_)),
							(i = s.match(g.nonAlphaNumericRegex_)),
							(r = n && a.match(g.whitespaceRegex_)),
							(o = i && s.match(g.whitespaceRegex_)),
							(a = r && a.match(g.linebreakRegex_)),
							(s = o && s.match(g.linebreakRegex_)),
							(t = a && t.match(g.blanklineEndRegex_)),
							(e = s && e.match(g.blanklineStartRegex_)),
							t || e
								? 5
								: a || s
									? 4
									: n && !r && o
										? 3
										: r || o
											? 2
											: n || i
												? 1
												: 0)
						: 6;
				}
				for (var n = 1; n < t.length - 1; ) {
					if (0 == t[n - 1][0] && 0 == t[n + 1][0]) {
						for (
							var i,
								r = t[n - 1][1],
								o = t[n][1],
								a = t[n + 1][1],
								s = this.diff_commonSuffix(r, o),
								f =
									(s &&
										((i = o.substring(o.length - s)),
										(r = r.substring(0, r.length - s)),
										(o = i + o.substring(0, o.length - s)),
										(a = i + a)),
									r),
								l = o,
								h = a,
								u = e(r, o) + e(o, a);
							o.charAt(0) === a.charAt(0);

						) {
							(r += o.charAt(0)),
								(o = o.substring(1) + a.charAt(0)),
								(a = a.substring(1));
							var c = e(r, o) + e(o, a);
							u <= c && ((u = c), (f = r), (l = o), (h = a));
						}
						t[n - 1][1] != f &&
							(f ? (t[n - 1][1] = f) : (t.splice(n - 1, 1), n--),
							(t[n][1] = l),
							h ? (t[n + 1][1] = h) : (t.splice(n + 1, 1), n--));
					}
					n++;
				}
			}),
			(g.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/),
			(g.whitespaceRegex_ = /\s/),
			(g.linebreakRegex_ = /[\r\n]/),
			(g.blanklineEndRegex_ = /\n\r?\n$/),
			(g.blanklineStartRegex_ = /^\r?\n\r?\n/),
			(g.prototype.diff_cleanupEfficiency = function (t) {
				for (
					var e = !1, n = [], i = 0, r = null, o = 0, a = !1, s = !1, f = !1, l = !1;
					o < t.length;

				)
					0 == t[o][0]
						? ((r =
								t[o][1].length < this.Diff_EditCost && (f || l)
									? ((a = f), (s = l), t[(n[i++] = o)][1])
									: ((i = 0), null)),
							(f = l = !1))
						: (-1 == t[o][0] ? (l = !0) : (f = !0),
							r &&
								((a && s && f && l) ||
									(r.length < this.Diff_EditCost / 2 && a + s + f + l == 3)) &&
								(t.splice(n[i - 1], 0, [-1, r]),
								(t[n[i - 1] + 1][0] = 1),
								i--,
								a && s
									? ((f = l = !0), (i = 0))
									: ((o = 0 < --i ? n[i - 1] : -1), (f = l = !1)),
								(e = !(r = null)))),
						o++;
				e && this.diff_cleanupMerge(t);
			}),
			(g.prototype.diff_cleanupMerge = function (t) {
				t.push([0, ""]);
				for (var e, n = 0, i = 0, r = 0, o = "", a = ""; n < t.length; )
					switch (t[n][0]) {
						case 1:
							r++, (a += t[n][1]), n++;
							break;
						case -1:
							i++, (o += t[n][1]), n++;
							break;
						case 0:
							1 < i + r
								? (0 !== i &&
										0 !== r &&
										(0 !== (e = this.diff_commonPrefix(a, o)) &&
											(0 < n - i - r && 0 == t[n - i - r - 1][0]
												? (t[n - i - r - 1][1] += a.substring(0, e))
												: (t.splice(0, 0, [0, a.substring(0, e)]), n++),
											(a = a.substring(e)),
											(o = o.substring(e))),
										0 !== (e = this.diff_commonSuffix(a, o))) &&
										((t[n][1] = a.substring(a.length - e) + t[n][1]),
										(a = a.substring(0, a.length - e)),
										(o = o.substring(0, o.length - e))),
									0 === i
										? t.splice(n - r, i + r, [1, a])
										: 0 === r
											? t.splice(n - i, i + r, [-1, o])
											: t.splice(n - i - r, i + r, [-1, o], [1, a]),
									(n = n - i - r + (i ? 1 : 0) + (r ? 1 : 0) + 1))
								: 0 !== n && 0 == t[n - 1][0]
									? ((t[n - 1][1] += t[n][1]), t.splice(n, 1))
									: n++,
								(i = r = 0),
								(a = o = "");
					}
				"" === t[t.length - 1][1] && t.pop();
				for (var s = !1, n = 1; n < t.length - 1; )
					0 == t[n - 1][0] &&
						0 == t[n + 1][0] &&
						(t[n][1].substring(t[n][1].length - t[n - 1][1].length) == t[n - 1][1]
							? ((t[n][1] =
									t[n - 1][1] +
									t[n][1].substring(0, t[n][1].length - t[n - 1][1].length)),
								(t[n + 1][1] = t[n - 1][1] + t[n + 1][1]),
								t.splice(n - 1, 1),
								(s = !0))
							: t[n][1].substring(0, t[n + 1][1].length) == t[n + 1][1] &&
								((t[n - 1][1] += t[n + 1][1]),
								(t[n][1] = t[n][1].substring(t[n + 1][1].length) + t[n + 1][1]),
								t.splice(n + 1, 1),
								(s = !0))),
						n++;
				s && this.diff_cleanupMerge(t);
			}),
			(g.prototype.diff_xIndex = function (t, e) {
				for (
					var n = 0, i = 0, r = 0, o = 0, a = 0;
					a < t.length &&
					(1 !== t[a][0] && (n += t[a][1].length),
					-1 !== t[a][0] && (i += t[a][1].length),
					!(e < n));
					a++
				)
					(r = n), (o = i);
				return t.length != a && -1 === t[a][0] ? o : o + (e - r);
			}),
			(g.prototype.diff_prettyHtml = function (t) {
				for (
					var e = [], n = /&/g, i = /</g, r = />/g, o = /\n/g, a = 0;
					a < t.length;
					a++
				) {
					var s = t[a][0],
						f = t[a][1]
							.replace(n, "&amp;")
							.replace(i, "&lt;")
							.replace(r, "&gt;")
							.replace(o, "&para;<br>");
					switch (s) {
						case 1:
							e[a] = '<ins style="background:#e6ffe6;">' + f + "</ins>";
							break;
						case -1:
							e[a] = '<del style="background:#ffe6e6;">' + f + "</del>";
							break;
						case 0:
							e[a] = "<span>" + f + "</span>";
					}
				}
				return e.join("");
			}),
			(g.prototype.diff_text1 = function (t) {
				for (var e = [], n = 0; n < t.length; n++) 1 !== t[n][0] && (e[n] = t[n][1]);
				return e.join("");
			}),
			(g.prototype.diff_text2 = function (t) {
				for (var e = [], n = 0; n < t.length; n++) -1 !== t[n][0] && (e[n] = t[n][1]);
				return e.join("");
			}),
			(g.prototype.diff_levenshtein = function (t) {
				for (var e = 0, n = 0, i = 0, r = 0; r < t.length; r++) {
					var o = t[r][0],
						a = t[r][1];
					switch (o) {
						case 1:
							n += a.length;
							break;
						case -1:
							i += a.length;
							break;
						case 0:
							(e += Math.max(n, i)), (i = n = 0);
					}
				}
				return (e += Math.max(n, i));
			}),
			(g.prototype.diff_toDelta = function (t) {
				for (var e = [], n = 0; n < t.length; n++)
					switch (t[n][0]) {
						case 1:
							e[n] = "+" + encodeURI(t[n][1]);
							break;
						case -1:
							e[n] = "-" + t[n][1].length;
							break;
						case 0:
							e[n] = "=" + t[n][1].length;
					}
				return e.join("\t").replace(/%20/g, " ");
			}),
			(g.prototype.diff_fromDelta = function (t, e) {
				for (var n = [], i = 0, r = 0, o = e.split(/\t/g), a = 0; a < o.length; a++) {
					var s = o[a].substring(1);
					switch (o[a].charAt(0)) {
						case "+":
							try {
								n[i++] = [1, decodeURI(s)];
							} catch (t) {
								throw new Error("Illegal escape in diff_fromDelta: " + s);
							}
							break;
						case "-":
						case "=":
							var f = parseInt(s, 10);
							if (isNaN(f) || f < 0)
								throw new Error("Invalid number in diff_fromDelta: " + s);
							f = t.substring(r, (r += f));
							"=" == o[a].charAt(0) ? (n[i++] = [0, f]) : (n[i++] = [-1, f]);
							break;
						default:
							if (o[a])
								throw new Error(
									"Invalid diff operation in diff_fromDelta: " + o[a]
								);
					}
				}
				if (r != t.length)
					throw new Error(
						"Delta length (" +
							r +
							") does not equal source text length (" +
							t.length +
							")."
					);
				return n;
			}),
			(g.prototype.match_main = function (t, e, n) {
				if (null == t || null == e || null == n)
					throw new Error("Null input. (match_main)");
				return (
					(n = Math.max(0, Math.min(n, t.length))),
					t == e
						? 0
						: t.length
							? t.substring(n, n + e.length) == e
								? n
								: this.match_bitap_(t, e, n)
							: -1
				);
			}),
			(g.prototype.match_bitap_ = function (t, n, i) {
				if (n.length > this.Match_MaxBits)
					throw new Error("Pattern too long for this browser.");
				var e = this.match_alphabet_(n),
					r = this;
				function o(t, e) {
					(t /= n.length), (e = Math.abs(i - e));
					return r.Match_Distance ? t + e / r.Match_Distance : e ? 1 : t;
				}
				for (
					var a,
						s,
						f,
						l = this.Match_Threshold,
						h =
							(-1 != (u = t.indexOf(n, i)) &&
								((l = Math.min(o(0, u), l)),
								-1 != (u = t.lastIndexOf(n, i + n.length))) &&
								(l = Math.min(o(0, u), l)),
							1 << (n.length - 1)),
						u = -1,
						c = n.length + t.length,
						d = 0;
					d < n.length;
					d++
				) {
					for (a = 0, s = c; a < s; )
						o(d, i + s) <= l ? (a = s) : (c = s), (s = Math.floor((c - a) / 2 + a));
					var c = s,
						p = Math.max(1, i - s + 1),
						g = Math.min(i + s, t.length) + n.length,
						v = Array(g + 2);
					v[g + 1] = (1 << d) - 1;
					for (var y = g; p <= y; y--) {
						var m = e[t.charAt(y - 1)];
						if (
							((v[y] =
								0 === d
									? ((v[y + 1] << 1) | 1) & m
									: (((v[y + 1] << 1) | 1) & m) |
										((f[y + 1] | f[y]) << 1) |
										1 |
										f[y + 1]),
							v[y] & h)
						) {
							m = o(d, y - 1);
							if (m <= l) {
								if (((l = m), !(i < (u = y - 1)))) break;
								p = Math.max(1, 2 * i - u);
							}
						}
					}
					if (o(d + 1, i) > l) break;
					f = v;
				}
				return u;
			}),
			(g.prototype.match_alphabet_ = function (t) {
				for (var e = {}, n = 0; n < t.length; n++) e[t.charAt(n)] = 0;
				for (n = 0; n < t.length; n++) e[t.charAt(n)] |= 1 << (t.length - n - 1);
				return e;
			}),
			(g.prototype.patch_addContext_ = function (t, e) {
				if (0 != e.length) {
					for (
						var n = e.substring(t.start2, t.start2 + t.length1), i = 0;
						e.indexOf(n) != e.lastIndexOf(n) &&
						n.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin;

					)
						(i += this.Patch_Margin),
							(n = e.substring(t.start2 - i, t.start2 + t.length1 + i));
					i += this.Patch_Margin;
					var r = e.substring(t.start2 - i, t.start2),
						o =
							(r && t.diffs.unshift([0, r]),
							e.substring(t.start2 + t.length1, t.start2 + t.length1 + i));
					o && t.diffs.push([0, o]),
						(t.start1 -= r.length),
						(t.start2 -= r.length),
						(t.length1 += r.length + o.length),
						(t.length2 += r.length + o.length);
				}
			}),
			(g.prototype.patch_make = function (t, e, n) {
				var i, r;
				if ("string" == typeof t && "string" == typeof e && void 0 === n)
					2 < (r = this.diff_main((i = t), e, !0)).length &&
						(this.diff_cleanupSemantic(r), this.diff_cleanupEfficiency(r));
				else if (t && "object" == typeof t && void 0 === e && void 0 === n)
					i = this.diff_text1((r = t));
				else if ("string" == typeof t && e && "object" == typeof e && void 0 === n)
					(i = t), (r = e);
				else {
					if ("string" != typeof t || "string" != typeof e || !n || "object" != typeof n)
						throw new Error("Unknown call format to patch_make.");
					(i = t), (r = n);
				}
				if (0 === r.length) return [];
				for (
					var o = [], a = new g.patch_obj(), s = 0, f = 0, l = 0, h = i, u = i, c = 0;
					c < r.length;
					c++
				) {
					var d = r[c][0],
						p = r[c][1];
					switch ((s || 0 === d || ((a.start1 = f), (a.start2 = l)), d)) {
						case 1:
							(a.diffs[s++] = r[c]),
								(a.length2 += p.length),
								(u = u.substring(0, l) + p + u.substring(l));
							break;
						case -1:
							(a.length1 += p.length),
								(a.diffs[s++] = r[c]),
								(u = u.substring(0, l) + u.substring(l + p.length));
							break;
						case 0:
							p.length <= 2 * this.Patch_Margin && s && r.length != c + 1
								? ((a.diffs[s++] = r[c]),
									(a.length1 += p.length),
									(a.length2 += p.length))
								: p.length >= 2 * this.Patch_Margin &&
									s &&
									(this.patch_addContext_(a, h),
									o.push(a),
									(a = new g.patch_obj()),
									(s = 0),
									(h = u),
									(f = l));
					}
					1 !== d && (f += p.length), -1 !== d && (l += p.length);
				}
				return s && (this.patch_addContext_(a, h), o.push(a)), o;
			}),
			(g.prototype.patch_deepCopy = function (t) {
				for (var e = [], n = 0; n < t.length; n++) {
					var i = t[n],
						r = new g.patch_obj();
					r.diffs = [];
					for (var o = 0; o < i.diffs.length; o++) r.diffs[o] = i.diffs[o].slice();
					(r.start1 = i.start1),
						(r.start2 = i.start2),
						(r.length1 = i.length1),
						(r.length2 = i.length2),
						(e[n] = r);
				}
				return e;
			}),
			(g.prototype.patch_apply = function (t, e) {
				if (0 == t.length) return [e, []];
				t = this.patch_deepCopy(t);
				for (
					var n = this.patch_addPadding(t),
						i = ((e = n + e + n), this.patch_splitMax(t), 0),
						r = [],
						o = 0;
					o < t.length;
					o++
				) {
					var a,
						s = t[o].start2 + i,
						f = this.diff_text1(t[o].diffs),
						l = -1;
					if (
						(f.length > this.Match_MaxBits
							? -1 !=
									(a = this.match_main(
										e,
										f.substring(0, this.Match_MaxBits),
										s
									)) &&
								(-1 ==
									(l = this.match_main(
										e,
										f.substring(f.length - this.Match_MaxBits),
										s + f.length - this.Match_MaxBits
									)) ||
									l <= a) &&
								(a = -1)
							: (a = this.match_main(e, f, s)),
						-1 == a)
					)
						(r[o] = !1), (i -= t[o].length2 - t[o].length1);
					else if (
						((r[o] = !0),
						(i = a - s),
						f ==
							(s =
								-1 == l
									? e.substring(a, a + f.length)
									: e.substring(a, l + this.Match_MaxBits)))
					)
						e =
							e.substring(0, a) +
							this.diff_text2(t[o].diffs) +
							e.substring(a + f.length);
					else {
						var h = this.diff_main(f, s, !1);
						if (
							f.length > this.Match_MaxBits &&
							this.diff_levenshtein(h) / f.length > this.Patch_DeleteThreshold
						)
							r[o] = !1;
						else {
							this.diff_cleanupSemanticLossless(h);
							for (var u, c = 0, d = 0; d < t[o].diffs.length; d++) {
								var p = t[o].diffs[d];
								0 !== p[0] && (u = this.diff_xIndex(h, c)),
									1 === p[0]
										? (e = e.substring(0, a + u) + p[1] + e.substring(a + u))
										: -1 === p[0] &&
											(e =
												e.substring(0, a + u) +
												e.substring(
													a + this.diff_xIndex(h, c + p[1].length)
												)),
									-1 !== p[0] && (c += p[1].length);
							}
						}
					}
				}
				return [(e = e.substring(n.length, e.length - n.length)), r];
			}),
			(g.prototype.patch_addPadding = function (t) {
				for (var e = this.Patch_Margin, n = "", i = 1; i <= e; i++)
					n += String.fromCharCode(i);
				for (i = 0; i < t.length; i++) (t[i].start1 += e), (t[i].start2 += e);
				var r,
					o = t[0],
					a = o.diffs;
				return (
					0 == a.length || 0 != a[0][0]
						? (a.unshift([0, n]),
							(o.start1 -= e),
							(o.start2 -= e),
							(o.length1 += e),
							(o.length2 += e))
						: e > a[0][1].length &&
							((r = e - a[0][1].length),
							(a[0][1] = n.substring(a[0][1].length) + a[0][1]),
							(o.start1 -= r),
							(o.start2 -= r),
							(o.length1 += r),
							(o.length2 += r)),
					0 == (a = (o = t[t.length - 1]).diffs).length || 0 != a[a.length - 1][0]
						? (a.push([0, n]), (o.length1 += e), (o.length2 += e))
						: e > a[a.length - 1][1].length &&
							((r = e - a[a.length - 1][1].length),
							(a[a.length - 1][1] += n.substring(0, r)),
							(o.length1 += r),
							(o.length2 += r)),
					n
				);
			}),
			(g.prototype.patch_splitMax = function (t) {
				for (var e = this.Match_MaxBits, n = 0; n < t.length; n++)
					if (!(t[n].length1 <= e))
						for (
							var i = t[n], r = (t.splice(n--, 1), i.start1), o = i.start2, a = "";
							0 !== i.diffs.length;

						) {
							var s = new g.patch_obj(),
								f = !0;
							for (
								s.start1 = r - a.length,
									s.start2 = o - a.length,
									"" !== a &&
										((s.length1 = s.length2 = a.length), s.diffs.push([0, a]));
								0 !== i.diffs.length && s.length1 < e - this.Patch_Margin;

							) {
								var l = i.diffs[0][0],
									h = i.diffs[0][1];
								1 === l
									? ((s.length2 += h.length),
										(o += h.length),
										s.diffs.push(i.diffs.shift()),
										(f = !1))
									: -1 === l &&
										  1 == s.diffs.length &&
										  0 == s.diffs[0][0] &&
										  h.length > 2 * e
										? ((s.length1 += h.length),
											(r += h.length),
											(f = !1),
											s.diffs.push([l, h]),
											i.diffs.shift())
										: ((h = h.substring(0, e - s.length1 - this.Patch_Margin)),
											(s.length1 += h.length),
											(r += h.length),
											0 === l
												? ((s.length2 += h.length), (o += h.length))
												: (f = !1),
											s.diffs.push([l, h]),
											h == i.diffs[0][1]
												? i.diffs.shift()
												: (i.diffs[0][1] = i.diffs[0][1].substring(
														h.length
													)));
							}
							var a = (a = this.diff_text2(s.diffs)).substring(
									a.length - this.Patch_Margin
								),
								u = this.diff_text1(i.diffs).substring(0, this.Patch_Margin);
							"" !== u &&
								((s.length1 += u.length),
								(s.length2 += u.length),
								0 !== s.diffs.length && 0 === s.diffs[s.diffs.length - 1][0]
									? (s.diffs[s.diffs.length - 1][1] += u)
									: s.diffs.push([0, u])),
								f || t.splice(++n, 0, s);
						}
			}),
			(g.prototype.patch_toText = function (t) {
				for (var e = [], n = 0; n < t.length; n++) e[n] = t[n];
				return e.join("");
			}),
			(g.prototype.patch_fromText = function (t) {
				var e = [];
				if (t)
					for (
						var n = t.split("\n"), i = 0, r = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
						i < n.length;

					) {
						var o = n[i].match(r);
						if (!o) throw new Error("Invalid patch string: " + n[i]);
						var a = new g.patch_obj();
						for (
							e.push(a),
								a.start1 = parseInt(o[1], 10),
								"" === o[2]
									? (a.start1--, (a.length1 = 1))
									: "0" == o[2]
										? (a.length1 = 0)
										: (a.start1--, (a.length1 = parseInt(o[2], 10))),
								a.start2 = parseInt(o[3], 10),
								"" === o[4]
									? (a.start2--, (a.length2 = 1))
									: "0" == o[4]
										? (a.length2 = 0)
										: (a.start2--, (a.length2 = parseInt(o[4], 10))),
								i++;
							i < n.length;

						) {
							var s = n[i].charAt(0);
							try {
								var f = decodeURI(n[i].substring(1));
							} catch (t) {
								throw new Error("Illegal escape in patch_fromText: " + f);
							}
							if ("-" == s) a.diffs.push([-1, f]);
							else if ("+" == s) a.diffs.push([1, f]);
							else if (" " == s) a.diffs.push([0, f]);
							else {
								if ("@" == s) break;
								if ("" !== s)
									throw new Error('Invalid patch mode "' + s + '" in: ' + f);
							}
							i++;
						}
					}
				return e;
			}),
			((g.patch_obj = function () {
				(this.diffs = []),
					(this.start1 = null),
					(this.start2 = null),
					(this.length1 = 0),
					(this.length2 = 0);
			}).prototype.toString = function () {
				for (
					var t,
						e =
							0 === this.length1
								? this.start1 + ",0"
								: 1 == this.length1
									? this.start1 + 1
									: this.start1 + 1 + "," + this.length1,
						n =
							0 === this.length2
								? this.start2 + ",0"
								: 1 == this.length2
									? this.start2 + 1
									: this.start2 + 1 + "," + this.length2,
						i = ["@@ -" + e + " +" + n + " @@\n"],
						r = 0;
					r < this.diffs.length;
					r++
				) {
					switch (this.diffs[r][0]) {
						case 1:
							t = "+";
							break;
						case -1:
							t = "-";
							break;
						case 0:
							t = " ";
					}
					i[r + 1] = t + encodeURI(this.diffs[r][1]) + "\n";
				}
				return i.join("").replace(/%20/g, " ");
			}),
			(t.exports = g),
			(t.exports.diff_match_patch = g),
			(t.exports.DIFF_DELETE = -1),
			(t.exports.DIFF_INSERT = 1),
			(t.exports.DIFF_EQUAL = 0);
	})((w = { exports: {} }));
	var ut = w.exports,
		ct = null,
		x =
			((ht.filterName = lt.filterName = ft.filterName = "texts"),
			n(dt, [
				{
					key: "options",
					value: function () {
						var t;
						return (t = this.processor).options.apply(t, arguments);
					}
				},
				{
					key: "diff",
					value: function (t, e) {
						return this.processor.process(new k(t, e));
					}
				},
				{
					key: "patch",
					value: function (t, e) {
						return this.processor.process(new v(t, e));
					}
				},
				{
					key: "reverse",
					value: function (t) {
						return this.processor.process(new m(t));
					}
				},
				{
					key: "unpatch",
					value: function (t, e) {
						return this.patch(t, this.reverse(e));
					}
				},
				{ key: "clone", value: p }
			]),
			dt);
	function dt(t) {
		i(this, dt),
			(this.processor = new F(t)),
			this.processor.pipe(new h("diff").append(H, V, at, ft, z, Y).shouldHaveResult()),
			this.processor.pipe(new h("patch").append(Q, et, q, lt, $, tt).shouldHaveResult()),
			this.processor.pipe(new h("reverse").append(K, ot, U, ht, J, nt).shouldHaveResult());
	}
	function pt(t) {
		return "_t" === t
			? -1
			: "_" === t.substr(0, 1)
				? parseInt(t.slice(1), 10)
				: parseInt(t, 10) + 0.1;
	}
	function gt(t, e) {
		return pt(t) - pt(e);
	}
	var vt =
			"function" == typeof Array.isArray
				? Array.isArray
				: function (t) {
						return t instanceof Array;
					},
		yt =
			"function" == typeof Object.keys
				? function (t) {
						return Object.keys(t);
					}
				: function (t) {
						var e,
							n = [];
						for (e in t) Object.prototype.hasOwnProperty.call(t, e) && n.push(e);
						return n;
					},
		w =
			(n(mt, [
				{
					key: "format",
					value: function (t, e) {
						var n = {};
						return this.prepareContext(n), this.recurse(n, t, e), this.finalize(n);
					}
				},
				{
					key: "prepareContext",
					value: function (t) {
						(t.buffer = []),
							(t.out = function () {
								var t;
								(t = this.buffer).push.apply(t, arguments);
							});
					}
				},
				{
					key: "typeFormattterNotFound",
					value: function (t, e) {
						throw new Error("cannot format delta type: " + e);
					}
				},
				{
					key: "typeFormattterErrorFormatter",
					value: function (t, e) {
						return e.toString();
					}
				},
				{
					key: "finalize",
					value: function (t) {
						t = t.buffer;
						if (vt(t)) return t.join("");
					}
				},
				{
					key: "recurse",
					value: function (e, n, i, r, o, a, t) {
						i = n && a ? a.value : i;
						if (void 0 !== n || void 0 !== r) {
							var s = this.getDeltaType(n, a),
								f = "node" === s ? ("a" === n._t ? "array" : "object") : "";
							void 0 !== r
								? this.nodeBegin(e, r, o, s, f, t)
								: this.rootBegin(e, s, f);
							try {
								(this["format_" + s] || this.typeFormattterNotFound(e, s)).call(
									this,
									e,
									n,
									i,
									r,
									o,
									a
								);
							} catch (t) {
								this.typeFormattterErrorFormatter(e, t, n, i, r, o, a),
									"undefined" != typeof console &&
										console.error &&
										console.error(t.stack);
							}
							void 0 !== r ? this.nodeEnd(e, r, o, s, f, t) : this.rootEnd(e, s, f);
						}
					}
				},
				{
					key: "formatDeltaChildren",
					value: function (r, o, a) {
						var s = this;
						this.forEachDeltaKey(o, a, function (t, e, n, i) {
							s.recurse(r, o[t], a ? a[e] : void 0, t, e, n, i);
						});
					}
				},
				{
					key: "forEachDeltaKey",
					value: function (t, e, n) {
						var i,
							r = yt(t),
							o = "a" === t._t,
							a = {},
							s = void 0;
						if (void 0 !== e)
							for (s in e)
								!Object.prototype.hasOwnProperty.call(e, s) ||
									void 0 !== t[s] ||
									(o && void 0 !== t["_" + s]) ||
									r.push(s);
						for (s in t)
							Object.prototype.hasOwnProperty.call(t, s) &&
								((i = t[s]), vt(i)) &&
								3 === i[2] &&
								!(a[i[1].toString()] = {
									key: s,
									value: e && e[parseInt(s.substr(1))]
								}) !== this.includeMoveDestinations &&
								void 0 === e &&
								void 0 === t[i[1]] &&
								r.push(i[1].toString());
						o ? r.sort(gt) : r.sort();
						for (var f = 0, l = r.length; f < l; f++) {
							var h,
								u = r[f];
							(o && "_t" === u) ||
								((h =
									!o || "number" == typeof u
										? u
										: parseInt(
												"_" === (h = u).substr(0, 1) ? h.slice(1) : h,
												10
											)),
								n(u, h, a[h], f === l - 1));
						}
					}
				},
				{
					key: "getDeltaType",
					value: function (t, e) {
						if (void 0 === t) return void 0 !== e ? "movedestination" : "unchanged";
						if (vt(t)) {
							if (1 === t.length) return "added";
							if (2 === t.length) return "modified";
							if (3 === t.length && 0 === t[2]) return "deleted";
							if (3 === t.length && 2 === t[2]) return "textdiff";
							if (3 === t.length && 3 === t[2]) return "moved";
						} else if ("object" === (void 0 === t ? "undefined" : f(t))) return "node";
						return "unknown";
					}
				},
				{
					key: "parseTextDiff",
					value: function (t) {
						for (var e = [], n = t.split("\n@@ "), i = 0, r = n.length; i < r; i++) {
							for (
								var o = n[i],
									a = { pieces: [] },
									s = /^(?:@@ )?[-+]?(\d+),(\d+)/.exec(o).slice(1),
									f =
										((a.location = { line: s[0], chr: s[1] }),
										o.split("\n").slice(1)),
									l = 0,
									h = f.length;
								l < h;
								l++
							) {
								var u,
									c = f[l];
								c.length &&
									((u = { type: "context" }),
									"+" === c.substr(0, 1)
										? (u.type = "added")
										: "-" === c.substr(0, 1) && (u.type = "deleted"),
									(u.text = c.slice(1)),
									a.pieces.push(u));
							}
							e.push(a);
						}
						return e;
					}
				}
			]),
			mt);
	function mt() {
		i(this, mt);
	}
	var _t = Object.freeze({ default: w }),
		bt =
			(o(O, w),
			n(O, [
				{
					key: "typeFormattterErrorFormatter",
					value: function (t, e) {
						t.out('<pre class="jsondiffpatch-error">' + e + "</pre>");
					}
				},
				{
					key: "formatValue",
					value: function (t, e) {
						t.out("<pre>" + xt(JSON.stringify(e, null, 2)) + "</pre>");
					}
				},
				{
					key: "formatTextDiffString",
					value: function (t, e) {
						var n = this.parseTextDiff(e);
						t.out('<ul class="jsondiffpatch-textdiff">');
						for (var i = 0, r = n.length; i < r; i++) {
							for (
								var o = n[i],
									a =
										(t.out(
											'<li><div class="jsondiffpatch-textdiff-location"><span class="jsondiffpatch-textdiff-line-number">' +
												o.location.line +
												'</span><span class="jsondiffpatch-textdiff-char">' +
												o.location.chr +
												'</span></div><div class="jsondiffpatch-textdiff-line">'
										),
										o.pieces),
									s = 0,
									f = a.length;
								s < f;
								s++
							) {
								var l = a[s];
								t.out(
									'<span class="jsondiffpatch-textdiff-' +
										l.type +
										'">' +
										xt(decodeURI(l.text)) +
										"</span>"
								);
							}
							t.out("</div></li>");
						}
						t.out("</ul>");
					}
				},
				{
					key: "rootBegin",
					value: function (t, e, n) {
						t.out(
							'<div class="jsondiffpatch-delta ' +
								("jsondiffpatch-" +
									e +
									(n ? " jsondiffpatch-child-node-type-" + n : "")) +
								'">'
						);
					}
				},
				{
					key: "rootEnd",
					value: function (t) {
						t.out(
							"</div>" +
								(t.hasArrows
									? '<script type="text/javascript">setTimeout(' +
										kt.toString() +
										",10);<\/script>"
									: "")
						);
					}
				},
				{
					key: "nodeBegin",
					value: function (t, e, n, i, r) {
						t.out(
							'<li class="' +
								("jsondiffpatch-" +
									i +
									(r ? " jsondiffpatch-child-node-type-" + r : "")) +
								'" data-key="' +
								n +
								'"><div class="jsondiffpatch-property-name">' +
								n +
								"</div>"
						);
					}
				},
				{
					key: "nodeEnd",
					value: function (t) {
						t.out("</li>");
					}
				},
				{
					key: "format_unchanged",
					value: function (t, e, n) {
						void 0 !== n &&
							(t.out('<div class="jsondiffpatch-value">'),
							this.formatValue(t, n),
							t.out("</div>"));
					}
				},
				{
					key: "format_movedestination",
					value: function (t, e, n) {
						void 0 !== n &&
							(t.out('<div class="jsondiffpatch-value">'),
							this.formatValue(t, n),
							t.out("</div>"));
					}
				},
				{
					key: "format_node",
					value: function (t, e, n) {
						var i = "a" === e._t ? "array" : "object";
						t.out('<ul class="jsondiffpatch-node jsondiffpatch-node-type-' + i + '">'),
							this.formatDeltaChildren(t, e, n),
							t.out("</ul>");
					}
				},
				{
					key: "format_added",
					value: function (t, e) {
						t.out('<div class="jsondiffpatch-value">'),
							this.formatValue(t, e[0]),
							t.out("</div>");
					}
				},
				{
					key: "format_modified",
					value: function (t, e) {
						t.out('<div class="jsondiffpatch-value jsondiffpatch-left-value">'),
							this.formatValue(t, e[0]),
							t.out(
								'</div><div class="jsondiffpatch-value jsondiffpatch-right-value">'
							),
							this.formatValue(t, e[1]),
							t.out("</div>");
					}
				},
				{
					key: "format_deleted",
					value: function (t, e) {
						t.out('<div class="jsondiffpatch-value">'),
							this.formatValue(t, e[0]),
							t.out("</div>");
					}
				},
				{
					key: "format_moved",
					value: function (t, e) {
						t.out('<div class="jsondiffpatch-value">'),
							this.formatValue(t, e[0]),
							t.out(
								'</div><div class="jsondiffpatch-moved-destination">' +
									e[1] +
									"</div>"
							),
							t.out(
								'<div class="jsondiffpatch-arrow" style="position: relative; left: -34px;">\n          <svg width="30" height="60" style="position: absolute; display: none;">\n          <defs>\n              <marker id="markerArrow" markerWidth="8" markerHeight="8"\n                 refx="2" refy="4"\n                     orient="auto" markerUnits="userSpaceOnUse">\n                  <path d="M1,1 L1,7 L7,4 L1,1" style="fill: #339;" />\n              </marker>\n          </defs>\n          <path d="M30,0 Q-10,25 26,50"\n            style="stroke: #88f; stroke-width: 2px; fill: none; stroke-opacity: 0.5; marker-end: url(#markerArrow);"\n          ></path>\n          </svg>\n      </div>'
							),
							(t.hasArrows = !0);
					}
				},
				{
					key: "format_textdiff",
					value: function (t, e) {
						t.out('<div class="jsondiffpatch-value">'),
							this.formatTextDiffString(t, e[0]),
							t.out("</div>");
					}
				}
			]),
			O);
	function O() {
		return (
			i(this, O), a(this, (O.__proto__ || Object.getPrototypeOf(O)).apply(this, arguments))
		);
	}
	function xt(t) {
		for (
			var e = t,
				n = [
					[/&/g, "&amp;"],
					[/</g, "&lt;"],
					[/>/g, "&gt;"],
					[/'/g, "&apos;"],
					[/"/g, "&quot;"]
				],
				i = 0;
			i < n.length;
			i++
		)
			e = e.replace(n[i][0], n[i][1]);
		return e;
	}
	function wt(t, e, n) {
		var i,
			r = e || document.body,
			o = {
				showing: (e = "jsondiffpatch-unchanged-") + "showing",
				hiding: e + "hiding",
				visible: e + "visible",
				hidden: e + "hidden"
			},
			a = r.classList;
		a &&
			(n
				? (!1 === t
						? (a.remove(o.showing),
							a.add(o.visible),
							setTimeout(function () {
								a.add(o.hiding);
							}, 10))
						: (a.remove(o.hiding), a.add(o.showing), a.remove(o.hidden)),
					(i = setInterval(function () {
						kt(r);
					}, 100)),
					setTimeout(function () {
						a.remove(o.showing),
							a.remove(o.hiding),
							!1 === t
								? (a.add(o.hidden), a.remove(o.visible))
								: (a.add(o.visible), a.remove(o.hidden)),
							setTimeout(function () {
								a.remove(o.visible), clearInterval(i);
							}, n + 400);
					}, n))
				: (a.remove(o.showing),
					a.remove(o.hiding),
					a.remove(o.visible),
					a.remove(o.hidden),
					!1 === t && a.add(o.hidden)));
	}
	var kt = function (t) {
			for (
				var t = t || document,
					e = ".jsondiffpatch-arrow",
					n = function (t) {
						for (
							var e = t.parentNode,
								n = t.style,
								t = t.children[0],
								i = t.children[1],
								r =
									((t.style.display = "none"),
									(o = e.querySelector(".jsondiffpatch-moved-destination"))
										.textContent || o.innerText),
								o = e.parentNode,
								a = void 0,
								s = function (t) {
									t.getAttribute("data-key") === r && (a = t);
								},
								f = o.children,
								l = 0,
								h = f.length;
							l < h;
							l++
						)
							s(f[l], l);
						if (a)
							try {
								var u = a.offsetTop - e.offsetTop,
									c =
										(t.setAttribute("height", Math.abs(u) + 6),
										(n.top = (0 < u ? 0 : u) - 8 + "px"),
										0 < u
											? "M30,0 Q-10," + Math.round(u / 2) + " 26," + (u - 4)
											: "M30," +
												-u +
												" Q-10," +
												Math.round(-u / 2) +
												" 26,4");
								i.setAttribute("d", c), (t.style.display = "");
							} catch (t) {}
					},
					i = t.querySelectorAll(e),
					r = 0,
					o = i.length;
				r < o;
				r++
			)
				n(i[r]);
		},
		jt = void 0;
	var At = Object.freeze({
			showUnchanged: wt,
			hideUnchanged: function (t, e) {
				return wt(!1, t, e);
			},
			default: bt,
			format: function (t, e) {
				return (jt = jt || new bt()).format(t, e);
			}
		}),
		M =
			(o(C, w),
			n(C, [
				{
					key: "prepareContext",
					value: function (n) {
						r(
							C.prototype.__proto__ || Object.getPrototypeOf(C.prototype),
							"prepareContext",
							this
						).call(this, n),
							(n.indent = function (t) {
								(this.indentLevel =
									(this.indentLevel || 0) + (void 0 === t ? 1 : t)),
									(this.indentPad = new Array(this.indentLevel + 1).join(
										"&nbsp;&nbsp;"
									));
							}),
							(n.row = function (t, e) {
								n.out(
									'<tr><td style="white-space: nowrap;"><pre class="jsondiffpatch-annotated-indent" style="display: inline-block">'
								),
									n.out(n.indentPad),
									n.out('</pre><pre style="display: inline-block">'),
									n.out(t),
									n.out('</pre></td><td class="jsondiffpatch-delta-note"><div>'),
									n.out(e),
									n.out("</div></td></tr>");
							});
					}
				},
				{
					key: "typeFormattterErrorFormatter",
					value: function (t, e) {
						t.row("", '<pre class="jsondiffpatch-error">' + e + "</pre>");
					}
				},
				{
					key: "formatTextDiffString",
					value: function (t, e) {
						var n = this.parseTextDiff(e);
						t.out('<ul class="jsondiffpatch-textdiff">');
						for (var i = 0, r = n.length; i < r; i++) {
							for (
								var o = n[i],
									a =
										(t.out(
											'<li><div class="jsondiffpatch-textdiff-location"><span class="jsondiffpatch-textdiff-line-number">' +
												o.location.line +
												'</span><span class="jsondiffpatch-textdiff-char">' +
												o.location.chr +
												'</span></div><div class="jsondiffpatch-textdiff-line">'
										),
										o.pieces),
									s = 0,
									f = a.length;
								s < f;
								s++
							) {
								var l = a[s];
								t.out(
									'<span class="jsondiffpatch-textdiff-' +
										l.type +
										'">' +
										l.text +
										"</span>"
								);
							}
							t.out("</div></li>");
						}
						t.out("</ul>");
					}
				},
				{
					key: "rootBegin",
					value: function (t, e, n) {
						t.out('<table class="jsondiffpatch-annotated-delta">'),
							"node" === e && (t.row("{"), t.indent()),
							"array" === n &&
								t.row(
									'"_t": "a",',
									"Array delta (member names indicate array indices)"
								);
					}
				},
				{
					key: "rootEnd",
					value: function (t, e) {
						"node" === e && (t.indent(-1), t.row("}")), t.out("</table>");
					}
				},
				{
					key: "nodeBegin",
					value: function (t, e, n, i, r) {
						t.row("&quot;" + e + "&quot;: {"),
							"node" === i && t.indent(),
							"array" === r &&
								t.row(
									'"_t": "a",',
									"Array delta (member names indicate array indices)"
								);
					}
				},
				{
					key: "nodeEnd",
					value: function (t, e, n, i, r, o) {
						"node" === i && t.indent(-1), t.row("}" + (o ? "" : ","));
					}
				},
				{ key: "format_unchanged", value: function () {} },
				{ key: "format_movedestination", value: function () {} },
				{
					key: "format_node",
					value: function (t, e, n) {
						this.formatDeltaChildren(t, e, n);
					}
				}
			]),
			C);
	function C() {
		i(this, C);
		var t = a(this, (C.__proto__ || Object.getPrototypeOf(C)).call(this));
		return (t.includeMoveDestinations = !1), t;
	}
	function R(t) {
		return '<pre style="display:inline-block">&quot;' + t + "&quot;</pre>";
	}
	function E(t, e) {
		var n = this.getDeltaType(e),
			i = (i = Ot[n]) && i.apply(i, Array.prototype.slice.call(arguments, 1)),
			e = JSON.stringify(e, null, 2);
		"textdiff" === n && (e = e.split("\\n").join('\\n"+\n   "')),
			t.indent(),
			t.row(e, i),
			t.indent(-1);
	}
	var Ot = {
			added: function (t, e, n, i) {
				var r = " <pre>([newValue])</pre>";
				return void 0 === i
					? "new value" + r
					: "number" == typeof i
						? "insert at index " + i + r
						: "add property " + R(i) + r;
			},
			modified: function (t, e, n, i) {
				var r = " <pre>([previousValue, newValue])</pre>";
				return void 0 === i
					? "modify value" + r
					: "number" == typeof i
						? "modify at index " + i + r
						: "modify property " + R(i) + r;
			},
			deleted: function (t, e, n, i) {
				var r = " <pre>([previousValue, 0, 0])</pre>";
				return void 0 === i
					? "delete value" + r
					: "number" == typeof i
						? "remove index " + i + r
						: "delete property " + R(i) + r;
			},
			moved: function (t, e, n, i) {
				return (
					'move from <span title="(position to remove at original state)">index ' +
					i +
					'</span> to <span title="(position to insert at final state)">index ' +
					t[1] +
					"</span>"
				);
			},
			textdiff: function (t, e, n, i) {
				return (
					"text diff" +
					(void 0 === i
						? ""
						: "number" == typeof i
							? " at index " + i
							: " at property " + R(i)) +
					', format is <a href="https://code.google.com/p/google-diff-match-patch/wiki/Unidiff">a variation of Unidiff</a>'
				);
			}
		},
		Mt =
			((M.prototype.format_added = E),
			(M.prototype.format_modified = E),
			(M.prototype.format_deleted = E),
			(M.prototype.format_moved = E),
			(M.prototype.format_textdiff = E),
			void 0);
	var Ct = Object.freeze({
			default: M,
			format: function (t, e) {
				return (Mt = Mt || new M()).format(t, e);
			}
		}),
		Rt = "add",
		Et = "remove",
		Pt = "replace",
		Dt = "move",
		Tt =
			(o(P, w),
			n(P, [
				{
					key: "prepareContext",
					value: function (t) {
						r(
							P.prototype.__proto__ || Object.getPrototypeOf(P.prototype),
							"prepareContext",
							this
						).call(this, t),
							(t.result = []),
							(t.path = []),
							(t.pushCurrentOp = function (t) {
								var e = t.op,
									t = t.value,
									e = { op: e, path: this.currentPath() };
								void 0 !== t && (e.value = t), this.result.push(e);
							}),
							(t.pushMoveOp = function (t) {
								var e = this.currentPath();
								this.result.push({ op: Dt, from: e, path: this.toPath(t) });
							}),
							(t.currentPath = function () {
								return "/" + this.path.join("/");
							}),
							(t.toPath = function (t) {
								var e = this.path.slice();
								return (e[e.length - 1] = t), "/" + e.join("/");
							});
					}
				},
				{
					key: "typeFormattterErrorFormatter",
					value: function (t, e) {
						t.out("[ERROR] " + e);
					}
				},
				{ key: "rootBegin", value: function () {} },
				{ key: "rootEnd", value: function () {} },
				{
					key: "nodeBegin",
					value: function (t, e, n) {
						t.path.push(n);
					}
				},
				{
					key: "nodeEnd",
					value: function (t) {
						t.path.pop();
					}
				},
				{ key: "format_unchanged", value: function () {} },
				{ key: "format_movedestination", value: function () {} },
				{
					key: "format_node",
					value: function (t, e, n) {
						this.formatDeltaChildren(t, e, n);
					}
				},
				{
					key: "format_added",
					value: function (t, e) {
						t.pushCurrentOp({ op: Rt, value: e[0] });
					}
				},
				{
					key: "format_modified",
					value: function (t, e) {
						t.pushCurrentOp({ op: Pt, value: e[1] });
					}
				},
				{
					key: "format_deleted",
					value: function (t) {
						t.pushCurrentOp({ op: Et });
					}
				},
				{
					key: "format_moved",
					value: function (t, e) {
						e = e[1];
						t.pushMoveOp(e);
					}
				},
				{
					key: "format_textdiff",
					value: function () {
						throw new Error("Not implemented");
					}
				},
				{
					key: "format",
					value: function (t, e) {
						var n = {};
						return this.prepareContext(n), this.recurse(n, t, e), n.result;
					}
				}
			]),
			P);
	function P() {
		i(this, P);
		var t = a(this, (P.__proto__ || Object.getPrototypeOf(P)).call(this));
		return (t.includeMoveDestinations = !0), t;
	}
	function Nt(t, e) {
		return (
			(Ut = Ut || new Tt()),
			(t = Ut.format(t, e)),
			(t = Lt(t, [Vt, qt])),
			(t = B(t, 3)),
			(e = t[0]),
			(n = t[2]),
			(t = Ft(t[1])),
			[].concat(s(t), s(e), s(n))
		);
		var n;
	}
	var It = function (t) {
			return t[t.length - 1];
		},
		St = function (t, e) {
			return t.sort(e), t;
		},
		Bt = function (t, e) {
			(t = parseInt(t, 10)), (e = parseInt(e, 10));
			return isNaN(t) || isNaN(e) ? 0 : e - t;
		},
		Ft = function (t) {
			return St(t, function (t, e) {
				(t = t.path.split("/")), (e = e.path.split("/"));
				return t.length !== e.length ? t.length - e.length : Bt(It(t), It(e));
			});
		},
		Lt = function (t, n) {
			var e = Array(n.length + 1)
				.fill()
				.map(function () {
					return [];
				});
			return t
				.map(function (e) {
					var t = n
						.map(function (t) {
							return t(e);
						})
						.indexOf(!0);
					return t < 0 && (t = n.length), { item: e, position: t };
				})
				.reduce(function (t, e) {
					return t[e.position].push(e.item), t;
				}, e);
		},
		Vt = function (t) {
			return "move" === t.op;
		},
		qt = function (t) {
			return "remove" === t.op;
		},
		Ut = void 0,
		Ht = Object.freeze({
			default: Tt,
			partitionOps: Lt,
			format: Nt,
			log: function (t, e) {
				console.log(Nt(t, e));
			}
		});
	function D(t) {
		return (
			(e && e[t]) ||
			function () {
				for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
				return e;
			}
		);
	}
	var T = {
			added: D("green"),
			deleted: D("red"),
			movedestination: D("gray"),
			moved: D("yellow"),
			unchanged: D("gray"),
			error: D("white.bgRed"),
			textDiffLine: D("gray")
		},
		zt =
			(o(N, w),
			n(N, [
				{
					key: "prepareContext",
					value: function (t) {
						r(
							N.prototype.__proto__ || Object.getPrototypeOf(N.prototype),
							"prepareContext",
							this
						).call(this, t),
							(t.indent = function (t) {
								(this.indentLevel =
									(this.indentLevel || 0) + (void 0 === t ? 1 : t)),
									(this.indentPad = new Array(this.indentLevel + 1).join("  ")),
									this.outLine();
							}),
							(t.outLine = function () {
								this.buffer.push("\n" + (this.indentPad || ""));
							}),
							(t.out = function () {
								for (var t = arguments.length, e = Array(t), n = 0; n < t; n++)
									e[n] = arguments[n];
								for (var i = 0, r = e.length; i < r; i++) {
									var o = e[i].split("\n").join("\n" + (this.indentPad || ""));
									this.color && this.color[0] && (o = this.color[0](o)),
										this.buffer.push(o);
								}
							}),
							(t.pushColor = function (t) {
								(this.color = this.color || []), this.color.unshift(t);
							}),
							(t.popColor = function () {
								(this.color = this.color || []), this.color.shift();
							});
					}
				},
				{
					key: "typeFormattterErrorFormatter",
					value: function (t, e) {
						t.pushColor(T.error), t.out("[ERROR]" + e), t.popColor();
					}
				},
				{
					key: "formatValue",
					value: function (t, e) {
						t.out(JSON.stringify(e, null, 2));
					}
				},
				{
					key: "formatTextDiffString",
					value: function (t, e) {
						var n = this.parseTextDiff(e);
						t.indent();
						for (var i = 0, r = n.length; i < r; i++) {
							for (
								var o = n[i],
									a =
										(t.pushColor(T.textDiffLine),
										t.out(o.location.line + "," + o.location.chr + " "),
										t.popColor(),
										o.pieces),
									s = 0,
									f = a.length;
								s < f;
								s++
							) {
								var l = a[s];
								t.pushColor(T[l.type]), t.out(l.text), t.popColor();
							}
							i < r - 1 && t.outLine();
						}
						t.indent(-1);
					}
				},
				{
					key: "rootBegin",
					value: function (t, e, n) {
						t.pushColor(T[e]),
							"node" === e && (t.out("array" === n ? "[" : "{"), t.indent());
					}
				},
				{
					key: "rootEnd",
					value: function (t, e, n) {
						"node" === e && (t.indent(-1), t.out("array" === n ? "]" : "}")),
							t.popColor();
					}
				},
				{
					key: "nodeBegin",
					value: function (t, e, n, i, r) {
						t.pushColor(T[i]),
							t.out(n + ": "),
							"node" === i && (t.out("array" === r ? "[" : "{"), t.indent());
					}
				},
				{
					key: "nodeEnd",
					value: function (t, e, n, i, r, o) {
						"node" === i &&
							(t.indent(-1), t.out("array" === r ? "]" : "}" + (o ? "" : ","))),
							o || t.outLine(),
							t.popColor();
					}
				},
				{
					key: "format_unchanged",
					value: function (t, e, n) {
						void 0 !== n && this.formatValue(t, n);
					}
				},
				{
					key: "format_movedestination",
					value: function (t, e, n) {
						void 0 !== n && this.formatValue(t, n);
					}
				},
				{
					key: "format_node",
					value: function (t, e, n) {
						this.formatDeltaChildren(t, e, n);
					}
				},
				{
					key: "format_added",
					value: function (t, e) {
						this.formatValue(t, e[0]);
					}
				},
				{
					key: "format_modified",
					value: function (t, e) {
						t.pushColor(T.deleted),
							this.formatValue(t, e[0]),
							t.popColor(),
							t.out(" => "),
							t.pushColor(T.added),
							this.formatValue(t, e[1]),
							t.popColor();
					}
				},
				{
					key: "format_deleted",
					value: function (t, e) {
						this.formatValue(t, e[0]);
					}
				},
				{
					key: "format_moved",
					value: function (t, e) {
						t.out("==> " + e[1]);
					}
				},
				{
					key: "format_textdiff",
					value: function (t, e) {
						this.formatTextDiffString(t, e[0]);
					}
				}
			]),
			N);
	function N() {
		i(this, N);
		var t = a(this, (N.__proto__ || Object.getPrototypeOf(N)).call(this));
		return (t.includeMoveDestinations = !1), t;
	}
	function $t(t, e) {
		return (Qt = Qt || new zt()).format(t, e);
	}
	var Qt = void 0;
	(w = Object.freeze({
		default: zt,
		format: $t,
		log: function (t, e) {
			console.log($t(t, e));
		}
	})),
		(n = Object.freeze({ base: _t, html: At, annotated: Ct, jsonpatch: Ht, console: w }));
	var I = void 0;
	(t.DiffPatcher = x),
		(t.formatters = n),
		(t.console = w),
		(t.create = function (t) {
			return new x(t);
		}),
		(t.dateReviver = function (t, e) {
			var n;
			return "string" == typeof e &&
				(n =
					/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?(Z|([+-])(\d{2}):(\d{2}))$/.exec(
						e
					))
				? new Date(Date.UTC(+n[1], +n[2] - 1, +n[3], +n[4], +n[5], +n[6], +(n[7] || 0)))
				: e;
		}),
		(t.diff = function () {
			return (I = I || new x()).diff.apply(I, arguments);
		}),
		(t.patch = function () {
			return (I = I || new x()).patch.apply(I, arguments);
		}),
		(t.unpatch = function () {
			return (I = I || new x()).unpatch.apply(I, arguments);
		}),
		(t.reverse = function () {
			return (I = I || new x()).reverse.apply(I, arguments);
		}),
		(t.clone = function () {
			return (I = I || new x()).clone.apply(I, arguments);
		}),
		Object.defineProperty(t, "__esModule", { value: !0 });
});
