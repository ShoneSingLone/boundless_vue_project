((e, t) => {
	"object" == typeof exports && "undefined" != typeof module
		? t(exports)
		: "function" == typeof define && define.amd
			? define(["exports"], t)
			: t(((e = "undefined" != typeof globalThis ? globalThis : e || self).jsyaml = {}));
})(this, function (e) {
	function p(e) {
		return null == e;
	}
	var g = {
		isNothing: p,
		isObject: function (e) {
			return "object" == typeof e && null !== e;
		},
		toArray: function (e) {
			return Array.isArray(e) ? e : p(e) ? [] : [e];
		},
		repeat: function (e, t) {
			for (var n = "", i = 0; i < t; i += 1) n += e;
			return n;
		},
		isNegativeZero: function (e) {
			return 0 === e && Number.NEGATIVE_INFINITY === 1 / e;
		},
		extend: function (e, t) {
			var n, i, r, o;
			if (t) for (n = 0, i = (o = Object.keys(t)).length; n < i; n += 1) e[(r = o[n])] = t[r];
			return e;
		}
	};
	function h(e, t) {
		var n = "",
			i = e.reason || "(unknown reason)";
		return e.mark
			? (e.mark.name && (n += 'in "' + e.mark.name + '" '),
				(n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")"),
				!t && e.mark.snippet && (n += "\n\n" + e.mark.snippet),
				i + " " + n)
			: i;
	}
	function t(e, t) {
		Error.call(this),
			(this.name = "YAMLException"),
			(this.reason = e),
			(this.mark = t),
			(this.message = h(this, !1)),
			Error.captureStackTrace
				? Error.captureStackTrace(this, this.constructor)
				: (this.stack = new Error().stack || "");
	}
	((t.prototype = Object.create(Error.prototype)).constructor = t).prototype.toString = function (
		e
	) {
		return this.name + ": " + h(this, e);
	};
	var R = t;
	function f(e, t, n, i, r) {
		var o = "",
			a = "",
			r = Math.floor(r / 2) - 1;
		return (
			r < i - t && (t = i - r + (o = " ... ").length),
			r < n - i && (n = i + r - (a = " ...").length),
			{ str: o + e.slice(t, n).replace(/\t/g, "→") + a, pos: i - t + o.length }
		);
	}
	function d(e, t) {
		return g.repeat(" ", t - e.length) + e;
	}
	var _ = function (e, t) {
			if (((t = Object.create(t || null)), !e.buffer)) return null;
			t.maxLength || (t.maxLength = 79),
				"number" != typeof t.indent && (t.indent = 1),
				"number" != typeof t.linesBefore && (t.linesBefore = 3),
				"number" != typeof t.linesAfter && (t.linesAfter = 2);
			for (var n, i = /\r?\n|\r|\0/g, r = [0], o = [], a = -1; (n = i.exec(e.buffer)); )
				o.push(n.index),
					r.push(n.index + n[0].length),
					e.position <= n.index && a < 0 && (a = r.length - 2);
			a < 0 && (a = r.length - 1);
			for (
				var l,
					s = "",
					c = Math.min(e.line + t.linesAfter, o.length).toString().length,
					u = t.maxLength - (t.indent + c + 3),
					p = 1;
				p <= t.linesBefore && !(a - p < 0);
				p++
			)
				(l = f(e.buffer, r[a - p], o[a - p], e.position - (r[a] - r[a - p]), u)),
					(s =
						g.repeat(" ", t.indent) +
						d((e.line - p + 1).toString(), c) +
						" | " +
						l.str +
						"\n" +
						s);
			for (
				l = f(e.buffer, r[a], o[a], e.position, u),
					s =
						(s +=
							g.repeat(" ", t.indent) +
							d((e.line + 1).toString(), c) +
							" | " +
							l.str +
							"\n") +
						(g.repeat("-", t.indent + c + 3 + l.pos) + "^\n"),
					p = 1;
				p <= t.linesAfter && !(o.length <= a + p);
				p++
			)
				(l = f(e.buffer, r[a + p], o[a + p], e.position - (r[a] - r[a + p]), u)),
					(s +=
						g.repeat(" ", t.indent) +
						d((e.line + p + 1).toString(), c) +
						" | " +
						l.str +
						"\n");
			return s.replace(/\n$/, "");
		},
		D = [
			"kind",
			"multi",
			"resolve",
			"construct",
			"instanceOf",
			"predicate",
			"represent",
			"representName",
			"defaultStyle",
			"styleAliases"
		],
		U = ["scalar", "sequence", "mapping"];
	var i = function (t, e) {
		var n, i;
		if (
			((e = e || {}),
			Object.keys(e).forEach(function (e) {
				if (-1 === D.indexOf(e))
					throw new R(
						'Unknown option "' + e + '" is met in definition of "' + t + '" YAML type.'
					);
			}),
			(this.options = e),
			(this.tag = t),
			(this.kind = e.kind || null),
			(this.resolve =
				e.resolve ||
				function () {
					return !0;
				}),
			(this.construct =
				e.construct ||
				function (e) {
					return e;
				}),
			(this.instanceOf = e.instanceOf || null),
			(this.predicate = e.predicate || null),
			(this.represent = e.represent || null),
			(this.representName = e.representName || null),
			(this.defaultStyle = e.defaultStyle || null),
			(this.multi = e.multi || !1),
			(this.styleAliases =
				((n = e.styleAliases || null),
				(i = {}),
				null !== n &&
					Object.keys(n).forEach(function (t) {
						n[t].forEach(function (e) {
							i[String(e)] = t;
						});
					}),
				i)),
			-1 === U.indexOf(this.kind))
		)
			throw new R('Unknown kind "' + this.kind + '" is specified for "' + t + '" YAML type.');
	};
	function q(e, t) {
		var r = [];
		return (
			e[t].forEach(function (n) {
				var i = r.length;
				r.forEach(function (e, t) {
					e.tag === n.tag && e.kind === n.kind && e.multi === n.multi && (i = t);
				}),
					(r[i] = n);
			}),
			r
		);
	}
	function r(e) {
		return this.extend(e);
	}
	r.prototype.extend = function (e) {
		var t = [],
			n = [];
		if (e instanceof i) n.push(e);
		else if (Array.isArray(e)) n = n.concat(e);
		else {
			if (!e || (!Array.isArray(e.implicit) && !Array.isArray(e.explicit)))
				throw new R(
					"Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })"
				);
			e.implicit && (t = t.concat(e.implicit)), e.explicit && (n = n.concat(e.explicit));
		}
		t.forEach(function (e) {
			if (!(e instanceof i))
				throw new R(
					"Specified list of YAML types (or a single Type object) contains a non-Type object."
				);
			if (e.loadKind && "scalar" !== e.loadKind)
				throw new R(
					"There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported."
				);
			if (e.multi)
				throw new R(
					"There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit."
				);
		}),
			n.forEach(function (e) {
				if (!(e instanceof i))
					throw new R(
						"Specified list of YAML types (or a single Type object) contains a non-Type object."
					);
			});
		e = Object.create(r.prototype);
		return (
			(e.implicit = (this.implicit || []).concat(t)),
			(e.explicit = (this.explicit || []).concat(n)),
			(e.compiledImplicit = q(e, "implicit")),
			(e.compiledExplicit = q(e, "explicit")),
			(e.compiledTypeMap = (function () {
				var e,
					t,
					n = {
						scalar: {},
						sequence: {},
						mapping: {},
						fallback: {},
						multi: { scalar: [], sequence: [], mapping: [], fallback: [] }
					};
				function i(e) {
					e.multi
						? (n.multi[e.kind].push(e), n.multi.fallback.push(e))
						: (n[e.kind][e.tag] = n.fallback[e.tag] = e);
				}
				for (e = 0, t = arguments.length; e < t; e += 1) arguments[e].forEach(i);
				return n;
			})(e.compiledImplicit, e.compiledExplicit)),
			e
		);
	};
	var Y = r,
		P = new i("tag:yaml.org,2002:str", {
			kind: "scalar",
			construct: function (e) {
				return null !== e ? e : "";
			}
		}),
		W = new i("tag:yaml.org,2002:seq", {
			kind: "sequence",
			construct: function (e) {
				return null !== e ? e : [];
			}
		}),
		n = new i("tag:yaml.org,2002:map", {
			kind: "mapping",
			construct: function (e) {
				return null !== e ? e : {};
			}
		}),
		H = new Y({ explicit: [P, W, n] });
	var o = new i("tag:yaml.org,2002:null", {
		kind: "scalar",
		resolve: function (e) {
			var t;
			return (
				null === e ||
				(1 === (t = e.length) && "~" === e) ||
				(4 === t && ("null" === e || "Null" === e || "NULL" === e))
			);
		},
		construct: function () {
			return null;
		},
		predicate: function (e) {
			return null === e;
		},
		represent: {
			canonical: function () {
				return "~";
			},
			lowercase: function () {
				return "null";
			},
			uppercase: function () {
				return "NULL";
			},
			camelcase: function () {
				return "Null";
			},
			empty: function () {
				return "";
			}
		},
		defaultStyle: "lowercase"
	});
	var $ = new i("tag:yaml.org,2002:bool", {
		kind: "scalar",
		resolve: function (e) {
			var t;
			return (
				null !== e &&
				((4 === (t = e.length) && ("true" === e || "True" === e || "TRUE" === e)) ||
					(5 === t && ("false" === e || "False" === e || "FALSE" === e)))
			);
		},
		construct: function (e) {
			return "true" === e || "True" === e || "TRUE" === e;
		},
		predicate: function (e) {
			return "[object Boolean]" === Object.prototype.toString.call(e);
		},
		represent: {
			lowercase: function (e) {
				return e ? "true" : "false";
			},
			uppercase: function (e) {
				return e ? "TRUE" : "FALSE";
			},
			camelcase: function (e) {
				return e ? "True" : "False";
			}
		},
		defaultStyle: "lowercase"
	});
	var G = new i("tag:yaml.org,2002:int", {
			kind: "scalar",
			resolve: function (e) {
				if (null === e) return !1;
				var t,
					n,
					i,
					r,
					o = e.length,
					a = 0,
					l = !1;
				if (!o) return !1;
				if ("0" === (t = "-" !== (t = e[a]) && "+" !== t ? t : e[++a])) {
					if (a + 1 === o) return !0;
					if ("b" === (t = e[++a])) {
						for (a++; a < o; a++)
							if ("_" !== (t = e[a])) {
								if ("0" !== t && "1" !== t) return !1;
								l = !0;
							}
						return l && "_" !== t;
					}
					if ("x" === t) {
						for (a++; a < o; a++)
							if ("_" !== (t = e[a])) {
								if (
									!(
										(48 <= (i = e.charCodeAt(a)) && i <= 57) ||
										(65 <= i && i <= 70) ||
										(97 <= i && i <= 102)
									)
								)
									return !1;
								l = !0;
							}
						return l && "_" !== t;
					}
					if ("o" === t) {
						for (a++; a < o; a++)
							if ("_" !== (t = e[a])) {
								if (!(48 <= (n = e.charCodeAt(a)) && n <= 55)) return !1;
								l = !0;
							}
						return l && "_" !== t;
					}
				}
				if ("_" === t) return !1;
				for (; a < o; a++)
					if ("_" !== (t = e[a])) {
						if (!(48 <= (r = e.charCodeAt(a)) && r <= 57)) return !1;
						l = !0;
					}
				return !(!l || "_" === t);
			},
			construct: function (e) {
				var t,
					n = 1;
				if (
					(("-" !== (t = (e = -1 !== e.indexOf("_") ? e.replace(/_/g, "") : e)[0]) &&
						"+" !== t) ||
						("-" === t && (n = -1), (t = (e = e.slice(1))[0])),
					"0" === e)
				)
					return 0;
				if ("0" === t) {
					if ("b" === e[1]) return n * parseInt(e.slice(2), 2);
					if ("x" === e[1]) return n * parseInt(e.slice(2), 16);
					if ("o" === e[1]) return n * parseInt(e.slice(2), 8);
				}
				return n * parseInt(e, 10);
			},
			predicate: function (e) {
				return (
					"[object Number]" === Object.prototype.toString.call(e) &&
					e % 1 == 0 &&
					!g.isNegativeZero(e)
				);
			},
			represent: {
				binary: function (e) {
					return 0 <= e ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
				},
				octal: function (e) {
					return 0 <= e ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
				},
				decimal: function (e) {
					return e.toString(10);
				},
				hexadecimal: function (e) {
					return 0 <= e
						? "0x" + e.toString(16).toUpperCase()
						: "-0x" + e.toString(16).toUpperCase().slice(1);
				}
			},
			defaultStyle: "decimal",
			styleAliases: {
				binary: [2, "bin"],
				octal: [8, "oct"],
				decimal: [10, "dec"],
				hexadecimal: [16, "hex"]
			}
		}),
		V = new RegExp(
			"^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
		);
	var Z = /^[-+]?[0-9]+e/;
	var a = new i("tag:yaml.org,2002:float", {
			kind: "scalar",
			resolve: function (e) {
				return null !== e && !(!V.test(e) || "_" === e[e.length - 1]);
			},
			construct: function (e) {
				var t = "-" === (e = e.replace(/_/g, "").toLowerCase())[0] ? -1 : 1;
				return ".inf" === (e = 0 <= "+-".indexOf(e[0]) ? e.slice(1) : e)
					? 1 == t
						? Number.POSITIVE_INFINITY
						: Number.NEGATIVE_INFINITY
					: ".nan" === e
						? NaN
						: t * parseFloat(e, 10);
			},
			predicate: function (e) {
				return (
					"[object Number]" === Object.prototype.toString.call(e) &&
					(e % 1 != 0 || g.isNegativeZero(e))
				);
			},
			represent: function (e, t) {
				if (isNaN(e))
					switch (t) {
						case "lowercase":
							return ".nan";
						case "uppercase":
							return ".NAN";
						case "camelcase":
							return ".NaN";
					}
				else if (Number.POSITIVE_INFINITY === e)
					switch (t) {
						case "lowercase":
							return ".inf";
						case "uppercase":
							return ".INF";
						case "camelcase":
							return ".Inf";
					}
				else if (Number.NEGATIVE_INFINITY === e)
					switch (t) {
						case "lowercase":
							return "-.inf";
						case "uppercase":
							return "-.INF";
						case "camelcase":
							return "-.Inf";
					}
				else if (g.isNegativeZero(e)) return "-0.0";
				return (t = e.toString(10)), Z.test(t) ? t.replace("e", ".e") : t;
			},
			defaultStyle: "lowercase"
		}),
		J = H.extend({ implicit: [o, $, G, a] }),
		Q = J,
		z = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),
		X = new RegExp(
			"^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
		);
	var ee = new i("tag:yaml.org,2002:timestamp", {
		kind: "scalar",
		resolve: function (e) {
			return null !== e && (null !== z.exec(e) || null !== X.exec(e));
		},
		construct: function (e) {
			var t,
				n,
				i,
				r,
				o,
				a = 0,
				l = null,
				s = z.exec(e);
			if (null === (s = null === s ? X.exec(e) : s)) throw new Error("Date resolve error");
			if (((e = +s[1]), (t = +s[2] - 1), (n = +s[3]), !s[4]))
				return new Date(Date.UTC(e, t, n));
			if (((i = +s[4]), (r = +s[5]), (o = +s[6]), s[7])) {
				for (a = s[7].slice(0, 3); a.length < 3; ) a += "0";
				a = +a;
			}
			return (
				s[9] && ((l = 6e4 * (60 * +s[10] + +(s[11] || 0))), "-" === s[9]) && (l = -l),
				(s = new Date(Date.UTC(e, t, n, i, r, o, a))),
				l && s.setTime(s.getTime() - l),
				s
			);
		},
		instanceOf: Date,
		represent: function (e) {
			return e.toISOString();
		}
	});
	var te = new i("tag:yaml.org,2002:merge", {
			kind: "scalar",
			resolve: function (e) {
				return "<<" === e || null === e;
			}
		}),
		ne = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
	var l = new i("tag:yaml.org,2002:binary", {
			kind: "scalar",
			resolve: function (e) {
				if (null === e) return !1;
				for (var t, n = 0, i = e.length, r = ne, o = 0; o < i; o++)
					if (!(64 < (t = r.indexOf(e.charAt(o))))) {
						if (t < 0) return !1;
						n += 6;
					}
				return n % 8 == 0;
			},
			construct: function (e) {
				for (
					var t = e.replace(/[\r\n=]/g, ""), n = t.length, i = ne, r = 0, o = [], a = 0;
					a < n;
					a++
				)
					a % 4 == 0 &&
						a &&
						(o.push((r >> 16) & 255), o.push((r >> 8) & 255), o.push(255 & r)),
						(r = (r << 6) | i.indexOf(t.charAt(a)));
				return (
					0 == (e = (n % 4) * 6)
						? (o.push((r >> 16) & 255), o.push((r >> 8) & 255), o.push(255 & r))
						: 18 == e
							? (o.push((r >> 10) & 255), o.push((r >> 2) & 255))
							: 12 == e && o.push((r >> 4) & 255),
					new Uint8Array(o)
				);
			},
			predicate: function (e) {
				return "[object Uint8Array]" === Object.prototype.toString.call(e);
			},
			represent: function (e) {
				for (var t, n = "", i = 0, r = e.length, o = ne, a = 0; a < r; a++)
					a % 3 == 0 &&
						a &&
						(n =
							(n = n + o[(i >> 18) & 63] + o[(i >> 12) & 63]) +
							o[(i >> 6) & 63] +
							o[63 & i]),
						(i = (i << 8) + e[a]);
				return (
					0 == (t = r % 3)
						? (n =
								(n = n + o[(i >> 18) & 63] + o[(i >> 12) & 63]) +
								o[(i >> 6) & 63] +
								o[63 & i])
						: 2 == t
							? (n =
									(n = n + o[(i >> 10) & 63] + o[(i >> 4) & 63]) +
									o[(i << 2) & 63] +
									o[64])
							: 1 == t &&
								(n = (n = n + o[(i >> 2) & 63] + o[(i << 4) & 63]) + o[64] + o[64]),
					n
				);
			}
		}),
		ie = Object.prototype.hasOwnProperty,
		re = Object.prototype.toString;
	var oe = new i("tag:yaml.org,2002:omap", {
			kind: "sequence",
			resolve: function (e) {
				if (null !== e)
					for (var t, n, i, r = [], o = e, a = 0, l = o.length; a < l; a += 1) {
						if (((t = o[a]), (i = !1), "[object Object]" !== re.call(t))) return !1;
						for (n in t)
							if (ie.call(t, n)) {
								if (i) return !1;
								i = !0;
							}
						if (!i) return !1;
						if (-1 !== r.indexOf(n)) return !1;
						r.push(n);
					}
				return !0;
			},
			construct: function (e) {
				return null !== e ? e : [];
			}
		}),
		ae = Object.prototype.toString;
	var le = new i("tag:yaml.org,2002:pairs", {
			kind: "sequence",
			resolve: function (e) {
				if (null !== e)
					for (
						var t, n, i = e, r = new Array(i.length), o = 0, a = i.length;
						o < a;
						o += 1
					) {
						if (((t = i[o]), "[object Object]" !== ae.call(t))) return !1;
						if (1 !== (n = Object.keys(t)).length) return !1;
						r[o] = [n[0], t[n[0]]];
					}
				return !0;
			},
			construct: function (e) {
				if (null === e) return [];
				for (var t, n, i = e, r = new Array(i.length), o = 0, a = i.length; o < a; o += 1)
					(t = i[o]), (n = Object.keys(t)), (r[o] = [n[0], t[n[0]]]);
				return r;
			}
		}),
		se = Object.prototype.hasOwnProperty;
	var ce = new i("tag:yaml.org,2002:set", {
			kind: "mapping",
			resolve: function (e) {
				if (null !== e) {
					var t,
						n = e;
					for (t in n) if (se.call(n, t) && null !== n[t]) return !1;
				}
				return !0;
			},
			construct: function (e) {
				return null !== e ? e : {};
			}
		}),
		ue = Q.extend({ implicit: [ee, te], explicit: [l, oe, le, ce] }),
		m = Object.prototype.hasOwnProperty,
		b = 1,
		pe = 2,
		fe = 3,
		A = 4,
		de = 1,
		he = 2,
		ge = 3,
		me =
			/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,
		ye = /[\x85\u2028\u2029]/,
		be = /[,\[\]\{\}]/,
		Ae = /^(?:!|!!|![a-z\-]+!)$/i,
		ve = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
	function ke(e) {
		return Object.prototype.toString.call(e);
	}
	function y(e) {
		return 10 === e || 13 === e;
	}
	function v(e) {
		return 9 === e || 32 === e;
	}
	function k(e) {
		return 9 === e || 32 === e || 10 === e || 13 === e;
	}
	function w(e) {
		return 44 === e || 91 === e || 93 === e || 123 === e || 125 === e;
	}
	function we(e) {
		return 48 === e
			? "\0"
			: 97 === e
				? ""
				: 98 === e
					? "\b"
					: 116 === e || 9 === e
						? "\t"
						: 110 === e
							? "\n"
							: 118 === e
								? "\v"
								: 102 === e
									? "\f"
									: 114 === e
										? "\r"
										: 101 === e
											? ""
											: 32 === e
												? " "
												: 34 === e
													? '"'
													: 47 === e
														? "/"
														: 92 === e
															? "\\"
															: 78 === e
																? ""
																: 95 === e
																	? " "
																	: 76 === e
																		? "\u2028"
																		: 80 === e
																			? "\u2029"
																			: "";
	}
	for (var Ce = new Array(256), xe = new Array(256), s = 0; s < 256; s++)
		(Ce[s] = we(s) ? 1 : 0), (xe[s] = we(s));
	function Ie(e, t) {
		(this.input = e),
			(this.filename = t.filename || null),
			(this.schema = t.schema || ue),
			(this.onWarning = t.onWarning || null),
			(this.legacy = t.legacy || !1),
			(this.json = t.json || !1),
			(this.listener = t.listener || null),
			(this.implicitTypes = this.schema.compiledImplicit),
			(this.typeMap = this.schema.compiledTypeMap),
			(this.length = e.length),
			(this.position = 0),
			(this.line = 0),
			(this.lineStart = 0),
			(this.lineIndent = 0),
			(this.firstTabInLine = -1),
			(this.documents = []);
	}
	function Se(e, t) {
		e = {
			name: e.filename,
			buffer: e.input.slice(0, -1),
			position: e.position,
			line: e.line,
			column: e.position - e.lineStart
		};
		return (e.snippet = _(e)), new R(t, e);
	}
	function C(e, t) {
		throw Se(e, t);
	}
	function u(e, t) {
		e.onWarning && e.onWarning.call(null, Se(e, t));
	}
	var Oe = {
		YAML: function (e, t, n) {
			var i, r;
			null !== e.version && C(e, "duplication of %YAML directive"),
				1 !== n.length && C(e, "YAML directive accepts exactly one argument"),
				null === (r = /^([0-9]+)\.([0-9]+)$/.exec(n[0])) &&
					C(e, "ill-formed argument of the YAML directive"),
				(i = parseInt(r[1], 10)),
				(r = parseInt(r[2], 10)),
				1 !== i && C(e, "unacceptable YAML version of the document"),
				(e.version = n[0]),
				(e.checkLineBreaks = r < 2),
				1 !== r && 2 !== r && u(e, "unsupported YAML version of the document");
		},
		TAG: function (t, e, n) {
			var i;
			2 !== n.length && C(t, "TAG directive accepts exactly two arguments"),
				(i = n[1]),
				Ae.test((n = n[0])) ||
					C(t, "ill-formed tag handle (first argument) of the TAG directive"),
				m.call(t.tagMap, n) &&
					C(t, 'there is a previously declared suffix for "' + n + '" tag handle'),
				ve.test(i) || C(t, "ill-formed tag prefix (second argument) of the TAG directive");
			try {
				i = decodeURIComponent(i);
			} catch (e) {
				C(t, "tag prefix is malformed: " + i);
			}
			t.tagMap[n] = i;
		}
	};
	function x(e, t, n, i) {
		var r, o, a, l;
		if (t < n) {
			if (((l = e.input.slice(t, n)), i))
				for (r = 0, o = l.length; r < o; r += 1)
					9 === (a = l.charCodeAt(r)) ||
						(32 <= a && a <= 1114111) ||
						C(e, "expected valid JSON character");
			else me.test(l) && C(e, "the stream contains non-printable characters");
			e.result += l;
		}
	}
	function je(e, t, n, i) {
		var r, o, a, l;
		for (
			g.isObject(n) ||
				C(e, "cannot merge mappings; the provided source object is unacceptable"),
				a = 0,
				l = (r = Object.keys(n)).length;
			a < l;
			a += 1
		)
			(o = r[a]), m.call(t, o) || ((t[o] = n[o]), (i[o] = !0));
	}
	function I(e, t, n, i, r, o, a, l, s) {
		var c, u;
		if (Array.isArray(r))
			for (c = 0, u = (r = Array.prototype.slice.call(r)).length; c < u; c += 1)
				Array.isArray(r[c]) && C(e, "nested arrays are not supported inside keys"),
					"object" == typeof r &&
						"[object Object]" === ke(r[c]) &&
						(r[c] = "[object Object]");
		if (
			("object" == typeof r && "[object Object]" === ke(r) && (r = "[object Object]"),
			(r = String(r)),
			null === t && (t = {}),
			"tag:yaml.org,2002:merge" === i)
		)
			if (Array.isArray(o)) for (c = 0, u = o.length; c < u; c += 1) je(e, t, o[c], n);
			else je(e, t, o, n);
		else
			e.json ||
				m.call(n, r) ||
				!m.call(t, r) ||
				((e.line = a || e.line),
				(e.lineStart = l || e.lineStart),
				(e.position = s || e.position),
				C(e, "duplicated mapping key")),
				"__proto__" === r
					? Object.defineProperty(t, r, {
							configurable: !0,
							enumerable: !0,
							writable: !0,
							value: o
						})
					: (t[r] = o),
				delete n[r];
		return t;
	}
	function Te(e) {
		var t = e.input.charCodeAt(e.position);
		10 === t
			? e.position++
			: 13 === t
				? (e.position++, 10 === e.input.charCodeAt(e.position) && e.position++)
				: C(e, "a line break is expected"),
			(e.line += 1),
			(e.lineStart = e.position),
			(e.firstTabInLine = -1);
	}
	function S(e, t, n) {
		for (var i = 0, r = e.input.charCodeAt(e.position); 0 !== r; ) {
			for (; v(r); )
				9 === r && -1 === e.firstTabInLine && (e.firstTabInLine = e.position),
					(r = e.input.charCodeAt(++e.position));
			if (t && 35 === r)
				for (; 10 !== (r = e.input.charCodeAt(++e.position)) && 13 !== r && 0 !== r; );
			if (!y(r)) break;
			for (Te(e), r = e.input.charCodeAt(e.position), i++, e.lineIndent = 0; 32 === r; )
				e.lineIndent++, (r = e.input.charCodeAt(++e.position));
		}
		return -1 !== n && 0 !== i && e.lineIndent < n && u(e, "deficient indentation"), i;
	}
	function O(e) {
		var t = e.position,
			n = e.input.charCodeAt(t);
		return !(
			(45 !== n && 46 !== n) ||
			n !== e.input.charCodeAt(t + 1) ||
			n !== e.input.charCodeAt(t + 2) ||
			(0 !== (n = e.input.charCodeAt((t += 3))) && !k(n))
		);
	}
	function Ne(e, t) {
		1 === t ? (e.result += " ") : 1 < t && (e.result += g.repeat("\n", t - 1));
	}
	function Fe(e, t) {
		var n,
			i,
			r,
			o,
			a,
			l,
			s,
			c = e.input.charCodeAt(e.position);
		if (34 === c) {
			for (
				e.kind = "scalar", e.result = "", e.position++, n = i = e.position;
				0 !== (c = e.input.charCodeAt(e.position));

			) {
				if (34 === c) return x(e, n, e.position, !0), e.position++, 1;
				if (92 === c) {
					if ((x(e, n, e.position, !0), y((c = e.input.charCodeAt(++e.position)))))
						S(e, !1, t);
					else if (c < 256 && Ce[c]) (e.result += xe[c]), e.position++;
					else if (0 < (a = 120 === (s = c) ? 2 : 117 === s ? 4 : 85 === s ? 8 : 0)) {
						for (r = a, o = 0; 0 < r; r--)
							(c = e.input.charCodeAt(++e.position)),
								0 <=
								(a =
									48 <= (l = c) && l <= 57
										? l - 48
										: 97 <= (l = 32 | l) && l <= 102
											? l - 97 + 10
											: -1)
									? (o = (o << 4) + a)
									: C(e, "expected hexadecimal character");
						(e.result +=
							(s = o) <= 65535
								? String.fromCharCode(s)
								: String.fromCharCode(
										55296 + ((s - 65536) >> 10),
										56320 + ((s - 65536) & 1023)
									)),
							e.position++;
					} else C(e, "unknown escape sequence");
					n = i = e.position;
				} else
					y(c)
						? (x(e, n, i, !0), Ne(e, S(e, !1, t)), (n = i = e.position))
						: e.position === e.lineStart && O(e)
							? C(e, "unexpected end of the document within a double quoted scalar")
							: (e.position++, (i = e.position));
			}
			C(e, "unexpected end of the stream within a double quoted scalar");
		}
	}
	function Ee(e, t) {
		var n,
			i,
			r = e.tag,
			o = e.anchor,
			a = [],
			l = !1;
		if (-1 !== e.firstTabInLine) return !1;
		for (
			null !== e.anchor && (e.anchorMap[e.anchor] = a), i = e.input.charCodeAt(e.position);
			0 !== i &&
			(-1 !== e.firstTabInLine &&
				((e.position = e.firstTabInLine),
				C(e, "tab characters must not be used in indentation")),
			45 === i) &&
			k(e.input.charCodeAt(e.position + 1));

		)
			if (((l = !0), e.position++, S(e, !0, -1) && e.lineIndent <= t))
				a.push(null), (i = e.input.charCodeAt(e.position));
			else if (
				((n = e.line),
				j(e, t, fe, !1, !0),
				a.push(e.result),
				S(e, !0, -1),
				(i = e.input.charCodeAt(e.position)),
				(e.line === n || e.lineIndent > t) && 0 !== i)
			)
				C(e, "bad indentation of a sequence entry");
			else if (e.lineIndent < t) break;
		return !!l && ((e.tag = r), (e.anchor = o), (e.kind = "sequence"), (e.result = a), !0);
	}
	function j(e, t, n, i, r) {
		var o,
			a,
			l,
			s,
			c,
			u,
			p,
			f = 1,
			d = !1,
			h = !1;
		if (
			(null !== e.listener && e.listener("open", e),
			(e.tag = null),
			(e.anchor = null),
			(e.kind = null),
			(e.result = null),
			(o = a = l = A === n || fe === n),
			i &&
				S(e, !0, -1) &&
				((d = !0),
				e.lineIndent > t
					? (f = 1)
					: e.lineIndent === t
						? (f = 0)
						: e.lineIndent < t && (f = -1)),
			1 === f)
		)
			for (
				;
				(t => {
					var e,
						n,
						i,
						r = !1,
						o = !1,
						a = t.input.charCodeAt(t.position);
					if (33 === a) {
						if (
							(null !== t.tag && C(t, "duplication of a tag property"),
							60 === (a = t.input.charCodeAt(++t.position))
								? ((r = !0), (a = t.input.charCodeAt(++t.position)))
								: 33 === a
									? ((o = !0), (n = "!!"), (a = t.input.charCodeAt(++t.position)))
									: (n = "!"),
							(e = t.position),
							r)
						) {
							for (; 0 !== (a = t.input.charCodeAt(++t.position)) && 62 !== a; );
							t.position < t.length
								? ((i = t.input.slice(e, t.position)),
									(a = t.input.charCodeAt(++t.position)))
								: C(t, "unexpected end of the stream within a verbatim tag");
						} else {
							for (; 0 !== a && !k(a); )
								33 === a &&
									(o
										? C(t, "tag suffix cannot contain exclamation marks")
										: ((n = t.input.slice(e - 1, t.position + 1)),
											Ae.test(n) ||
												C(
													t,
													"named tag handle cannot contain such characters"
												),
											(o = !0),
											(e = t.position + 1))),
									(a = t.input.charCodeAt(++t.position));
							(i = t.input.slice(e, t.position)),
								be.test(i) &&
									C(t, "tag suffix cannot contain flow indicator characters");
						}
						i && !ve.test(i) && C(t, "tag name cannot contain such characters: " + i);
						try {
							i = decodeURIComponent(i);
						} catch (e) {
							C(t, "tag name is malformed: " + i);
						}
						return (
							r
								? (t.tag = i)
								: m.call(t.tagMap, n)
									? (t.tag = t.tagMap[n] + i)
									: "!" === n
										? (t.tag = "!" + i)
										: "!!" === n
											? (t.tag = "tag:yaml.org,2002:" + i)
											: C(t, 'undeclared tag handle "' + n + '"'),
							1
						);
					}
				})(e) ||
				(e => {
					var t,
						n = e.input.charCodeAt(e.position);
					if (38 === n) {
						for (
							null !== e.anchor && C(e, "duplication of an anchor property"),
								n = e.input.charCodeAt(++e.position),
								t = e.position;
							0 !== n && !k(n) && !w(n);

						)
							n = e.input.charCodeAt(++e.position);
						return (
							e.position === t &&
								C(e, "name of an anchor node must contain at least one character"),
							(e.anchor = e.input.slice(t, e.position)),
							1
						);
					}
				})(e);

			)
				S(e, !0, -1)
					? ((d = !0),
						(l = o),
						e.lineIndent > t
							? (f = 1)
							: e.lineIndent === t
								? (f = 0)
								: e.lineIndent < t && (f = -1))
					: (l = !1);
		if (
			((l = l && (d || r)),
			(1 !== f && A !== n) ||
				((i = b === n || pe === n ? t : t + 1),
				(r = e.position - e.lineStart),
				1 === f
					? (l &&
							(Ee(e, r) ||
								((e, t, n) => {
									var i,
										r,
										o,
										a,
										l,
										s,
										c,
										u = e.tag,
										p = e.anchor,
										f = {},
										d = Object.create(null),
										h = null,
										g = null,
										m = null,
										y = !1,
										b = !1;
									if (-1 === e.firstTabInLine) {
										for (
											null !== e.anchor && (e.anchorMap[e.anchor] = f),
												c = e.input.charCodeAt(e.position);
											0 !== c;

										) {
											if (
												(y ||
													-1 === e.firstTabInLine ||
													((e.position = e.firstTabInLine),
													C(
														e,
														"tab characters must not be used in indentation"
													)),
												(i = e.input.charCodeAt(e.position + 1)),
												(o = e.line),
												(63 !== c && 58 !== c) || !k(i))
											) {
												if (
													((a = e.line),
													(l = e.lineStart),
													(s = e.position),
													!j(e, n, pe, !1, !0))
												)
													break;
												if (e.line === o) {
													for (c = e.input.charCodeAt(e.position); v(c); )
														c = e.input.charCodeAt(++e.position);
													if (58 === c)
														k((c = e.input.charCodeAt(++e.position))) ||
															C(
																e,
																"a whitespace character is expected after the key-value separator within a block mapping"
															),
															y &&
																(I(e, f, d, h, g, null, a, l, s),
																(h = g = m = null)),
															(r = y = !(b = !0)),
															(h = e.tag),
															(g = e.result);
													else {
														if (!b)
															return (e.tag = u), (e.anchor = p), 1;
														C(
															e,
															"can not read an implicit mapping pair; a colon is missed"
														);
													}
												} else {
													if (!b) return (e.tag = u), (e.anchor = p), 1;
													C(
														e,
														"can not read a block mapping entry; a multiline key may not be an implicit key"
													);
												}
											} else
												63 === c
													? (y &&
															(I(e, f, d, h, g, null, a, l, s),
															(h = g = m = null)),
														(r = y = b = !0))
													: y
														? (r = !(y = !1))
														: C(
																e,
																"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"
															),
													(e.position += 1),
													(c = i);
											if (
												((e.line === o || e.lineIndent > t) &&
													(y &&
														((a = e.line),
														(l = e.lineStart),
														(s = e.position)),
													j(e, t, A, !0, r) &&
														(y ? (g = e.result) : (m = e.result)),
													y ||
														(I(e, f, d, h, g, m, a, l, s),
														(h = g = m = null)),
													S(e, !0, -1),
													(c = e.input.charCodeAt(e.position))),
												(e.line === o || e.lineIndent > t) && 0 !== c)
											)
												C(e, "bad indentation of a mapping entry");
											else if (e.lineIndent < t) break;
										}
										return (
											y && I(e, f, d, h, g, null, a, l, s),
											b &&
												((e.tag = u),
												(e.anchor = p),
												(e.kind = "mapping"),
												(e.result = f)),
											b
										);
									}
								})(e, r, i))) ||
						((e, t) => {
							var n,
								i,
								r,
								o,
								a,
								l,
								s,
								c,
								u,
								p,
								f,
								d = !0,
								h = e.tag,
								g = e.anchor,
								m = Object.create(null),
								y = e.input.charCodeAt(e.position);
							if (91 === y) (c = !(a = 93)), (o = []);
							else {
								if (123 !== y) return;
								(a = 125), (c = !0), (o = {});
							}
							for (
								null !== e.anchor && (e.anchorMap[e.anchor] = o),
									y = e.input.charCodeAt(++e.position);
								0 !== y;

							) {
								if ((S(e, !0, t), (y = e.input.charCodeAt(e.position)) === a))
									return (
										e.position++,
										(e.tag = h),
										(e.anchor = g),
										(e.kind = c ? "mapping" : "sequence"),
										(e.result = o),
										1
									);
								d
									? 44 === y && C(e, "expected the node content, but found ','")
									: C(e, "missed comma between flow collection entries"),
									(f = null),
									(l = s = !1),
									63 === y &&
										k(e.input.charCodeAt(e.position + 1)) &&
										((l = s = !0), e.position++, S(e, !0, t)),
									(n = e.line),
									(i = e.lineStart),
									(r = e.position),
									j(e, t, b, !1, !0),
									(p = e.tag),
									(u = e.result),
									S(e, !0, t),
									(y = e.input.charCodeAt(e.position)),
									(!s && e.line !== n) ||
										58 !== y ||
										((l = !0),
										(y = e.input.charCodeAt(++e.position)),
										S(e, !0, t),
										j(e, t, b, !1, !0),
										(f = e.result)),
									c
										? I(e, o, m, p, u, f, n, i, r)
										: l
											? o.push(I(e, null, m, p, u, f, n, i, r))
											: o.push(u),
									S(e, !0, t),
									44 === (y = e.input.charCodeAt(e.position))
										? ((d = !0), (y = e.input.charCodeAt(++e.position)))
										: (d = !1);
							}
							C(e, "unexpected end of the stream within a flow collection");
						})(e, i)
						? (h = !0)
						: ((a &&
								((e, t) => {
									var n,
										i,
										r,
										o = de,
										a = !1,
										l = !1,
										s = t,
										c = 0,
										u = !1,
										p = e.input.charCodeAt(e.position);
									if (124 === p) i = !1;
									else {
										if (62 !== p) return;
										i = !0;
									}
									for (e.kind = "scalar", e.result = ""; 0 !== p; )
										if (
											43 === (p = e.input.charCodeAt(++e.position)) ||
											45 === p
										)
											de === o
												? (o = 43 === p ? ge : he)
												: C(e, "repeat of a chomping mode identifier");
										else {
											if (
												!(0 <= (r = 48 <= (r = p) && r <= 57 ? r - 48 : -1))
											)
												break;
											0 == r
												? C(
														e,
														"bad explicit indentation width of a block scalar; it cannot be less than one"
													)
												: l
													? C(
															e,
															"repeat of an indentation width identifier"
														)
													: ((s = t + r - 1), (l = !0));
										}
									if (v(p)) {
										for (; v((p = e.input.charCodeAt(++e.position))); );
										if (35 === p)
											for (
												;
												!y((p = e.input.charCodeAt(++e.position))) &&
												0 !== p;

											);
									}
									for (; 0 !== p; ) {
										for (
											Te(e),
												e.lineIndent = 0,
												p = e.input.charCodeAt(e.position);
											(!l || e.lineIndent < s) && 32 === p;

										)
											e.lineIndent++, (p = e.input.charCodeAt(++e.position));
										if ((!l && e.lineIndent > s && (s = e.lineIndent), y(p)))
											c++;
										else {
											if (e.lineIndent < s) {
												o === ge
													? (e.result += g.repeat("\n", a ? 1 + c : c))
													: o === de && a && (e.result += "\n");
												break;
											}
											for (
												i
													? v(p)
														? ((u = !0),
															(e.result += g.repeat(
																"\n",
																a ? 1 + c : c
															)))
														: u
															? ((u = !1),
																(e.result += g.repeat("\n", c + 1)))
															: 0 === c
																? a && (e.result += " ")
																: (e.result += g.repeat("\n", c))
													: (e.result += g.repeat("\n", a ? 1 + c : c)),
													l = a = !0,
													c = 0,
													n = e.position;
												!y(p) && 0 !== p;

											)
												p = e.input.charCodeAt(++e.position);
											x(e, n, e.position, !1);
										}
									}
									return 1;
								})(e, i)) ||
							((e, t) => {
								var n,
									i,
									r = e.input.charCodeAt(e.position);
								if (39 === r) {
									for (
										e.kind = "scalar",
											e.result = "",
											e.position++,
											n = i = e.position;
										0 !== (r = e.input.charCodeAt(e.position));

									)
										if (39 === r) {
											if (
												(x(e, n, e.position, !0),
												39 !== (r = e.input.charCodeAt(++e.position)))
											)
												return 1;
											(n = e.position), e.position++, (i = e.position);
										} else
											y(r)
												? (x(e, n, i, !0),
													Ne(e, S(e, !1, t)),
													(n = i = e.position))
												: e.position === e.lineStart && O(e)
													? C(
															e,
															"unexpected end of the document within a single quoted scalar"
														)
													: (e.position++, (i = e.position));
									C(
										e,
										"unexpected end of the stream within a single quoted scalar"
									);
								}
							})(e, i) ||
							Fe(e, i)
								? (h = !0)
								: (e => {
											var t,
												n = e.input.charCodeAt(e.position);
											if (42 === n) {
												for (
													n = e.input.charCodeAt(++e.position),
														t = e.position;
													0 !== n && !k(n) && !w(n);

												)
													n = e.input.charCodeAt(++e.position);
												return (
													e.position === t &&
														C(
															e,
															"name of an alias node must contain at least one character"
														),
													(t = e.input.slice(t, e.position)),
													m.call(e.anchorMap, t) ||
														C(e, 'unidentified alias "' + t + '"'),
													(e.result = e.anchorMap[t]),
													S(e, !0, -1),
													1
												);
											}
									  })(e)
									? ((h = !0),
										(null === e.tag && null === e.anchor) ||
											C(e, "alias node should not have any properties"))
									: ((e, t, n) => {
											var i,
												r,
												o,
												a,
												l,
												s,
												c,
												u = e.kind,
												p = e.result,
												f = e.input.charCodeAt(e.position);
											if (
												!k(f) &&
												!w(f) &&
												35 !== f &&
												38 !== f &&
												42 !== f &&
												33 !== f &&
												124 !== f &&
												62 !== f &&
												39 !== f &&
												34 !== f &&
												37 !== f &&
												64 !== f &&
												96 !== f &&
												((63 !== f && 45 !== f) ||
													!(
														k(
															(i = e.input.charCodeAt(e.position + 1))
														) ||
														(n && w(i))
													))
											) {
												for (
													e.kind = "scalar",
														e.result = "",
														r = o = e.position,
														a = !1;
													0 !== f;

												) {
													if (58 === f) {
														if (
															k(
																(i = e.input.charCodeAt(
																	e.position + 1
																))
															) ||
															(n && w(i))
														)
															break;
													} else if (35 === f) {
														if (k(e.input.charCodeAt(e.position - 1)))
															break;
													} else {
														if (
															(e.position === e.lineStart && O(e)) ||
															(n && w(f))
														)
															break;
														if (y(f)) {
															if (
																((l = e.line),
																(s = e.lineStart),
																(c = e.lineIndent),
																S(e, !1, -1),
																t <= e.lineIndent)
															) {
																(a = !0),
																	(f = e.input.charCodeAt(
																		e.position
																	));
																continue;
															}
															(e.position = o),
																(e.line = l),
																(e.lineStart = s),
																(e.lineIndent = c);
															break;
														}
													}
													a &&
														(x(e, r, o, !1),
														Ne(e, e.line - l),
														(r = o = e.position),
														(a = !1)),
														v(f) || (o = e.position + 1),
														(f = e.input.charCodeAt(++e.position));
												}
												if ((x(e, r, o, !1), e.result)) return 1;
												(e.kind = u), (e.result = p);
											}
										})(e, i, b === n) &&
										((h = !0), null === e.tag) &&
										(e.tag = "?"),
							null !== e.anchor && (e.anchorMap[e.anchor] = e.result))
					: 0 === f && (h = l && Ee(e, r))),
			null === e.tag)
		)
			null !== e.anchor && (e.anchorMap[e.anchor] = e.result);
		else if ("?" === e.tag) {
			for (
				null !== e.result &&
					"scalar" !== e.kind &&
					C(
						e,
						'unacceptable node kind for !<?> tag; it should be "scalar", not "' +
							e.kind +
							'"'
					),
					s = 0,
					c = e.implicitTypes.length;
				s < c;
				s += 1
			)
				if ((p = e.implicitTypes[s]).resolve(e.result)) {
					(e.result = p.construct(e.result)),
						(e.tag = p.tag),
						null !== e.anchor && (e.anchorMap[e.anchor] = e.result);
					break;
				}
		} else if ("!" !== e.tag) {
			if (m.call(e.typeMap[e.kind || "fallback"], e.tag))
				p = e.typeMap[e.kind || "fallback"][e.tag];
			else
				for (
					p = null, s = 0, c = (u = e.typeMap.multi[e.kind || "fallback"]).length;
					s < c;
					s += 1
				)
					if (e.tag.slice(0, u[s].tag.length) === u[s].tag) {
						p = u[s];
						break;
					}
			p || C(e, "unknown tag !<" + e.tag + ">"),
				null !== e.result &&
					p.kind !== e.kind &&
					C(
						e,
						"unacceptable node kind for !<" +
							e.tag +
							'> tag; it should be "' +
							p.kind +
							'", not "' +
							e.kind +
							'"'
					),
				p.resolve(e.result, e.tag)
					? ((e.result = p.construct(e.result, e.tag)),
						null !== e.anchor && (e.anchorMap[e.anchor] = e.result))
					: C(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
		}
		return (
			null !== e.listener && e.listener("close", e), null !== e.tag || null !== e.anchor || h
		);
	}
	function Me(e, t) {
		t = t || {};
		var n = new Ie(
				(e =
					0 !== (e = String(e)).length &&
					(10 !== e.charCodeAt(e.length - 1) &&
						13 !== e.charCodeAt(e.length - 1) &&
						(e += "\n"),
					65279 === e.charCodeAt(0))
						? e.slice(1)
						: e),
				t
			),
			t = e.indexOf("\0");
		for (
			-1 !== t && ((n.position = t), C(n, "null byte is not allowed in input")),
				n.input += "\0";
			32 === n.input.charCodeAt(n.position);

		)
			(n.lineIndent += 1), (n.position += 1);
		for (; n.position < n.length - 1; ) {
			a = c = o = r = i = s = l = void 0;
			var i,
				r,
				o,
				a,
				l = n,
				s = l.position,
				c = !1;
			for (
				l.version = null,
					l.checkLineBreaks = l.legacy,
					l.tagMap = Object.create(null),
					l.anchorMap = Object.create(null);
				0 !== (a = l.input.charCodeAt(l.position)) &&
				(S(l, !0, -1),
				(a = l.input.charCodeAt(l.position)),
				!(0 < l.lineIndent || 37 !== a));

			) {
				for (
					c = !0, a = l.input.charCodeAt(++l.position), i = l.position;
					0 !== a && !k(a);

				)
					a = l.input.charCodeAt(++l.position);
				for (
					o = [],
						(r = l.input.slice(i, l.position)).length < 1 &&
							C(l, "directive name must not be less than one character in length");
					0 !== a;

				) {
					for (; v(a); ) a = l.input.charCodeAt(++l.position);
					if (35 === a) {
						for (; 0 !== (a = l.input.charCodeAt(++l.position)) && !y(a); );
						break;
					}
					if (y(a)) break;
					for (i = l.position; 0 !== a && !k(a); ) a = l.input.charCodeAt(++l.position);
					o.push(l.input.slice(i, l.position));
				}
				0 !== a && Te(l),
					m.call(Oe, r) ? Oe[r](l, r, o) : u(l, 'unknown document directive "' + r + '"');
			}
			S(l, !0, -1),
				0 === l.lineIndent &&
				45 === l.input.charCodeAt(l.position) &&
				45 === l.input.charCodeAt(l.position + 1) &&
				45 === l.input.charCodeAt(l.position + 2)
					? ((l.position += 3), S(l, !0, -1))
					: c && C(l, "directives end mark is expected"),
				j(l, l.lineIndent - 1, A, !1, !0),
				S(l, !0, -1),
				l.checkLineBreaks &&
					ye.test(l.input.slice(s, l.position)) &&
					u(l, "non-ASCII line breaks are interpreted as content"),
				l.documents.push(l.result),
				l.position === l.lineStart && O(l)
					? 46 === l.input.charCodeAt(l.position) && ((l.position += 3), S(l, !0, -1))
					: l.position < l.length - 1 &&
						C(l, "end of the stream or a document separator is expected");
		}
		return n.documents;
	}
	var c = {
			loadAll: function (e, t, n) {
				null !== t && "object" == typeof t && void 0 === n && ((n = t), (t = null));
				var i = Me(e, n);
				if ("function" != typeof t) return i;
				for (var r = 0, o = i.length; r < o; r += 1) t(i[r]);
			},
			load: function (e, t) {
				if (0 !== (e = Me(e, t)).length) {
					if (1 === e.length) return e[0];
					throw new R("expected a single document in the stream, but found more");
				}
			}
		},
		Le = Object.prototype.toString,
		_e = Object.prototype.hasOwnProperty,
		De = 65279,
		Ue = 9,
		B = 10,
		qe = 13,
		Ye = 32,
		Re = 33,
		Be = 34,
		Ke = 35,
		Pe = 37,
		We = 38,
		He = 39,
		$e = 42,
		Ge = 44,
		Ve = 45,
		T = 58,
		Ze = 61,
		Je = 62,
		Qe = 63,
		ze = 64,
		Xe = 91,
		et = 93,
		tt = 96,
		nt = 123,
		it = 124,
		rt = 125,
		ot = {
			0: "\\0",
			7: "\\a",
			8: "\\b",
			9: "\\t",
			10: "\\n",
			11: "\\v",
			12: "\\f",
			13: "\\r",
			27: "\\e",
			34: '\\"',
			92: "\\\\",
			133: "\\N",
			160: "\\_",
			8232: "\\L",
			8233: "\\P"
		},
		at = [
			"y",
			"Y",
			"yes",
			"Yes",
			"YES",
			"on",
			"On",
			"ON",
			"n",
			"N",
			"no",
			"No",
			"NO",
			"off",
			"Off",
			"OFF"
		],
		lt = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
	var st = 1,
		N = 2;
	function ct(e) {
		(this.schema = e.schema || ue),
			(this.indent = Math.max(1, e.indent || 2)),
			(this.noArrayIndent = e.noArrayIndent || !1),
			(this.skipInvalid = e.skipInvalid || !1),
			(this.flowLevel = g.isNothing(e.flowLevel) ? -1 : e.flowLevel),
			(this.styleMap = ((e, t) => {
				var n, i, r, o, a, l, s;
				if (null === t) return {};
				for (n = {}, r = 0, o = (i = Object.keys(t)).length; r < o; r += 1)
					(a = i[r]),
						(l = String(t[a])),
						"!!" === a.slice(0, 2) && (a = "tag:yaml.org,2002:" + a.slice(2)),
						(s = e.compiledTypeMap.fallback[a]) &&
							_e.call(s.styleAliases, l) &&
							(l = s.styleAliases[l]),
						(n[a] = l);
				return n;
			})(this.schema, e.styles || null)),
			(this.sortKeys = e.sortKeys || !1),
			(this.lineWidth = e.lineWidth || 80),
			(this.noRefs = e.noRefs || !1),
			(this.noCompatMode = e.noCompatMode || !1),
			(this.condenseFlow = e.condenseFlow || !1),
			(this.quotingType = '"' === e.quotingType ? N : st),
			(this.forceQuotes = e.forceQuotes || !1),
			(this.replacer = "function" == typeof e.replacer ? e.replacer : null),
			(this.implicitTypes = this.schema.compiledImplicit),
			(this.explicitTypes = this.schema.compiledExplicit),
			(this.tag = null),
			(this.result = ""),
			(this.duplicates = []),
			(this.usedDuplicates = null);
	}
	function ut(e, t) {
		for (var n, i, r = g.repeat(" ", t), o = 0, a = "", l = e.length; o < l; )
			(o =
				-1 === (n = e.indexOf("\n", o))
					? ((i = e.slice(o)), l)
					: ((i = e.slice(o, n + 1)), n + 1)),
				i.length && "\n" !== i && (a += r),
				(a += i);
		return a;
	}
	function pt(e, t) {
		return "\n" + g.repeat(" ", e.indent * t);
	}
	function F(e) {
		return e === Ye || e === Ue;
	}
	function E(e) {
		return (
			(32 <= e && e <= 126) ||
			(161 <= e && e <= 55295 && 8232 !== e && 8233 !== e) ||
			(57344 <= e && e <= 65533 && e !== De) ||
			(65536 <= e && e <= 1114111)
		);
	}
	function ft(e) {
		return E(e) && e !== De && e !== qe && e !== B;
	}
	function dt(e, t, n) {
		var i = ft(e),
			r = i && !F(e);
		return (
			((n ? i : i && e !== Ge && e !== Xe && e !== et && e !== nt && e !== rt) &&
				e !== Ke &&
				!(t === T && !r)) ||
			(ft(t) && !F(t) && e === Ke) ||
			(t === T && r)
		);
	}
	function M(e, t) {
		var n = e.charCodeAt(t);
		return 55296 <= n &&
			n <= 56319 &&
			t + 1 < e.length &&
			56320 <= (e = e.charCodeAt(t + 1)) &&
			e <= 57343
			? 1024 * (n - 55296) + e - 56320 + 65536
			: n;
	}
	function ht(e) {
		return /^\n* /.test(e);
	}
	var gt = 1,
		mt = 2,
		yt = 3,
		bt = 4,
		L = 5;
	function At(e, t, n, i, r, o, a, l) {
		var s,
			c,
			u = 0,
			p = null,
			f = !1,
			d = !1,
			h = -1 !== i,
			g = -1,
			m =
				E((c = M(e, 0))) &&
				c !== De &&
				!F(c) &&
				c !== Ve &&
				c !== Qe &&
				c !== T &&
				c !== Ge &&
				c !== Xe &&
				c !== et &&
				c !== nt &&
				c !== rt &&
				c !== Ke &&
				c !== We &&
				c !== $e &&
				c !== Re &&
				c !== it &&
				c !== Ze &&
				c !== Je &&
				c !== He &&
				c !== Be &&
				c !== Pe &&
				c !== ze &&
				c !== tt &&
				!F((c = M(e, e.length - 1))) &&
				c !== T;
		if (t || a)
			for (s = 0; s < e.length; 65536 <= u ? (s += 2) : s++) {
				if (!E((u = M(e, s)))) return L;
				(m = m && dt(u, p, l)), (p = u);
			}
		else {
			for (s = 0; s < e.length; 65536 <= u ? (s += 2) : s++) {
				if ((u = M(e, s)) === B)
					(f = !0), h && ((d = d || (i < s - g - 1 && " " !== e[g + 1])), (g = s));
				else if (!E(u)) return L;
				(m = m && dt(u, p, l)), (p = u);
			}
			d = d || (h && i < s - g - 1 && " " !== e[g + 1]);
		}
		return f || d
			? 9 < n && ht(e)
				? L
				: a
					? o === N
						? L
						: mt
					: d
						? bt
						: yt
			: !m || a || r(e)
				? o === N
					? L
					: mt
				: gt;
	}
	function vt(o, i, r, a, l) {
		o.dump = (() => {
			if (0 === i.length) return o.quotingType === N ? '""' : "''";
			if (!o.noCompatMode && (-1 !== at.indexOf(i) || lt.test(i)))
				return o.quotingType === N ? '"' + i + '"' : "'" + i + "'";
			var e = o.indent * Math.max(1, r),
				t = -1 === o.lineWidth ? -1 : Math.max(Math.min(o.lineWidth, 40), o.lineWidth - e),
				n = a || (-1 < o.flowLevel && r >= o.flowLevel);
			switch (
				At(
					i,
					n,
					o.indent,
					t,
					function (e) {
						for (var t = o, n = e, i = 0, r = t.implicitTypes.length; i < r; i += 1)
							if (t.implicitTypes[i].resolve(n)) return 1;
						return;
					},
					o.quotingType,
					o.forceQuotes && !a,
					l
				)
			) {
				case gt:
					return i;
				case mt:
					return "'" + i.replace(/'/g, "''") + "'";
				case yt:
					return "|" + kt(i, o.indent) + wt(ut(i, e));
				case bt:
					return (
						">" +
						kt(i, o.indent) +
						wt(
							ut(
								((t, n) => {
									for (
										var e,
											i = /(\n+)([^\n]*)/g,
											r = (() => {
												var e = -1 !== (e = t.indexOf("\n")) ? e : t.length;
												return (i.lastIndex = e), Ct(t.slice(0, e), n);
											})(),
											o = "\n" === t[0] || " " === t[0];
										(l = i.exec(t));

									) {
										var a = l[1],
											l = l[2];
										(e = " " === l[0]),
											(r += a + (o || e || "" === l ? "" : "\n") + Ct(l, n)),
											(o = e);
									}
									return r;
								})(i, t),
								e
							)
						)
					);
				case L:
					return (
						'"' +
						(e => {
							for (
								var t, n = "", i = 0, r = 0;
								r < e.length;
								65536 <= i ? (r += 2) : r++
							)
								(i = M(e, r)),
									!(t = ot[i]) && E(i)
										? ((n += e[r]), 65536 <= i && (n += e[r + 1]))
										: (n +=
												t ||
												(e => {
													var t,
														n,
														i = e.toString(16).toUpperCase();
													if (e <= 255) (t = "x"), (n = 2);
													else if (e <= 65535) (t = "u"), (n = 4);
													else {
														if (!(e <= 4294967295))
															throw new R(
																"code point within a string may not be greater than 0xFFFFFFFF"
															);
														(t = "U"), (n = 8);
													}
													return (
														"\\" + t + g.repeat("0", n - i.length) + i
													);
												})(i));
							return n;
						})(i) +
						'"'
					);
				default:
					throw new R("impossible error: invalid scalar style");
			}
		})();
	}
	function kt(e, t) {
		var t = ht(e) ? String(t) : "",
			n = "\n" === e[e.length - 1];
		return t + (n && ("\n" === e[e.length - 2] || "\n" === e) ? "+" : n ? "" : "-") + "\n";
	}
	function wt(e) {
		return "\n" === e[e.length - 1] ? e.slice(0, -1) : e;
	}
	function Ct(e, t) {
		if ("" === e || " " === e[0]) return e;
		for (var n, i, r = / [^ ]/g, o = 0, a = 0, l = ""; (i = r.exec(e)); )
			t < (i = i.index) - o && ((l += "\n" + e.slice(o, (n = o < a ? a : i))), (o = n + 1)),
				(a = i);
		return (
			(l += "\n"),
			e.length - o > t && o < a
				? (l += e.slice(o, a) + "\n" + e.slice(a + 1))
				: (l += e.slice(o)),
			l.slice(1)
		);
	}
	function xt(e, t, n, i) {
		for (var r, o = "", a = e.tag, l = 0, s = n.length; l < s; l += 1)
			(r = n[l]),
				e.replacer && (r = e.replacer.call(n, String(l), r)),
				(K(e, t + 1, r, !0, !0, !1, !0) ||
					(void 0 === r && K(e, t + 1, null, !0, !0, !1, !0))) &&
					((i && "" === o) || (o += pt(e, t)),
					e.dump && B === e.dump.charCodeAt(0) ? (o += "-") : (o += "- "),
					(o += e.dump));
		(e.tag = a), (e.dump = o || "[]");
	}
	function It(e, t, n) {
		for (
			var i, r, o, a = n ? e.explicitTypes : e.implicitTypes, l = 0, s = a.length;
			l < s;
			l += 1
		)
			if (
				((r = a[l]).instanceOf || r.predicate) &&
				(!r.instanceOf || ("object" == typeof t && t instanceof r.instanceOf)) &&
				(!r.predicate || r.predicate(t))
			) {
				if (
					(n
						? r.multi && r.representName
							? (e.tag = r.representName(t))
							: (e.tag = r.tag)
						: (e.tag = "?"),
					r.represent)
				) {
					if (
						((o = e.styleMap[r.tag] || r.defaultStyle),
						"[object Function]" === Le.call(r.represent))
					)
						i = r.represent(t, o);
					else {
						if (!_e.call(r.represent, o))
							throw new R(
								"!<" + r.tag + '> tag resolver accepts not "' + o + '" style'
							);
						i = r.represent[o](t, o);
					}
					e.dump = i;
				}
				return 1;
			}
	}
	function K(e, t, n, i, r, o, a) {
		(e.tag = null), (e.dump = n), It(e, n, !1) || It(e, n, !0);
		var l,
			s,
			c = Le.call(e.dump),
			D = i,
			u =
				((i = i && (e.flowLevel < 0 || e.flowLevel > t)),
				"[object Object]" === c || "[object Array]" === c);
		if (
			(u && (s = -1 !== (l = e.duplicates.indexOf(n))),
			((null !== e.tag && "?" !== e.tag) || s || (2 !== e.indent && 0 < t)) && (r = !1),
			s && e.usedDuplicates[l])
		)
			e.dump = "*ref_" + l;
		else {
			if (
				(u && s && !e.usedDuplicates[l] && (e.usedDuplicates[l] = !0),
				"[object Object]" === c)
			)
				if (i && 0 !== Object.keys(e.dump).length) {
					var p,
						f,
						d,
						h,
						g,
						m = e,
						y = t,
						b = e.dump,
						U = r,
						A = "",
						n = m.tag,
						v = Object.keys(b);
					if (!0 === m.sortKeys) v.sort();
					else if ("function" == typeof m.sortKeys) v.sort(m.sortKeys);
					else if (m.sortKeys) throw new R("sortKeys must be a boolean or a function");
					for (p = 0, f = v.length; p < f; p += 1)
						(g = ""),
							(U && "" === A) || (g += pt(m, y)),
							(d = b[(h = v[p])]),
							m.replacer && (d = m.replacer.call(b, h, d)),
							K(m, y + 1, h, !0, !0, !0) &&
								((h =
									(null !== m.tag && "?" !== m.tag) ||
									(m.dump && 1024 < m.dump.length)) &&
									(m.dump && B === m.dump.charCodeAt(0)
										? (g += "?")
										: (g += "? ")),
								(g += m.dump),
								h && (g += pt(m, y)),
								K(m, y + 1, d, !0, h)) &&
								(m.dump && B === m.dump.charCodeAt(0) ? (g += ":") : (g += ": "),
								(A += g += m.dump));
					(m.tag = n), (m.dump = A || "{}"), s && (e.dump = "&ref_" + l + e.dump);
				} else {
					for (
						var k,
							w,
							C,
							x = e,
							I = t,
							S = e.dump,
							O = "",
							u = x.tag,
							j = Object.keys(S),
							T = 0,
							q = j.length;
						T < q;
						T += 1
					)
						(C = "") !== O && (C += ", "),
							x.condenseFlow && (C += '"'),
							(w = S[(k = j[T])]),
							x.replacer && (w = x.replacer.call(S, k, w)),
							K(x, I, k, !1, !1) &&
								(1024 < x.dump.length && (C += "? "),
								(C +=
									x.dump +
									(x.condenseFlow ? '"' : "") +
									":" +
									(x.condenseFlow ? "" : " ")),
								K(x, I, w, !1, !1)) &&
								(O += C += x.dump);
					(x.tag = u),
						(x.dump = "{" + O + "}"),
						s && (e.dump = "&ref_" + l + " " + e.dump);
				}
			else if ("[object Array]" === c)
				if (i && 0 !== e.dump.length)
					e.noArrayIndent && !a && 0 < t ? xt(e, t - 1, e.dump, r) : xt(e, t, e.dump, r),
						s && (e.dump = "&ref_" + l + e.dump);
				else {
					for (
						var N, F = e, E = t, M = e.dump, L = "", n = F.tag, _ = 0, Y = M.length;
						_ < Y;
						_ += 1
					)
						(N = M[_]),
							F.replacer && (N = F.replacer.call(M, String(_), N)),
							(K(F, E, N, !1, !1) || (void 0 === N && K(F, E, null, !1, !1))) &&
								("" !== L && (L += "," + (F.condenseFlow ? "" : " ")),
								(L += F.dump));
					(F.tag = n),
						(F.dump = "[" + L + "]"),
						s && (e.dump = "&ref_" + l + " " + e.dump);
				}
			else {
				if ("[object String]" !== c) {
					if ("[object Undefined]" === c) return;
					if (e.skipInvalid) return;
					throw new R("unacceptable kind of an object to dump " + c);
				}
				"?" !== e.tag && vt(e, e.dump, t, o, D);
			}
			null !== e.tag &&
				"?" !== e.tag &&
				((u = encodeURI("!" === e.tag[0] ? e.tag.slice(1) : e.tag).replace(/!/g, "%21")),
				(u =
					"!" === e.tag[0]
						? "!" + u
						: "tag:yaml.org,2002:" === u.slice(0, 18)
							? "!!" + u.slice(18)
							: "!<" + u + ">"),
				(e.dump = u + " " + e.dump));
		}
		return 1;
	}
	function St(e, t) {
		var n,
			i,
			r = [],
			o = [];
		for (
			!(function e(t, n, i) {
				var r, o, a;
				if (null !== t && "object" == typeof t)
					if (-1 !== (o = n.indexOf(t))) -1 === i.indexOf(o) && i.push(o);
					else if ((n.push(t), Array.isArray(t)))
						for (o = 0, a = t.length; o < a; o += 1) e(t[o], n, i);
					else
						for (r = Object.keys(t), o = 0, a = r.length; o < a; o += 1)
							e(t[r[o]], n, i);
			})(e, r, o),
				n = 0,
				i = o.length;
			n < i;
			n += 1
		)
			t.duplicates.push(r[o[n]]);
		t.usedDuplicates = new Array(i);
	}
	function Ot(e, t) {
		return function () {
			throw new Error(
				"Function yaml." +
					e +
					" is removed in js-yaml 4. Use yaml." +
					t +
					" instead, which is now safe by default."
			);
		};
	}
	var jt = i,
		Tt = ue,
		Nt = c.load,
		c = c.loadAll,
		Ft = {
			dump: function (e, t) {
				return (
					(t = new ct((t = t || {}))).noRefs || St(e, t),
					t.replacer && (e = t.replacer.call({ "": e }, "", e)),
					K(t, 0, e, !0, !0) ? t.dump + "\n" : ""
				);
			}
		}.dump,
		Et = R,
		l = {
			binary: l,
			float: a,
			map: n,
			null: o,
			pairs: le,
			set: ce,
			timestamp: ee,
			bool: $,
			int: G,
			merge: te,
			omap: oe,
			seq: W,
			str: P
		},
		a = Ot("safeLoad", "load"),
		n = Ot("safeLoadAll", "loadAll"),
		o = Ot("safeDump", "dump"),
		le = {
			Type: jt,
			Schema: Y,
			FAILSAFE_SCHEMA: H,
			JSON_SCHEMA: J,
			CORE_SCHEMA: Q,
			DEFAULT_SCHEMA: Tt,
			load: Nt,
			loadAll: c,
			dump: Ft,
			YAMLException: Et,
			types: l,
			safeLoad: a,
			safeLoadAll: n,
			safeDump: o
		};
	(e.CORE_SCHEMA = Q),
		(e.DEFAULT_SCHEMA = Tt),
		(e.FAILSAFE_SCHEMA = H),
		(e.JSON_SCHEMA = J),
		(e.Schema = Y),
		(e.Type = jt),
		(e.YAMLException = Et),
		(e.default = le),
		(e.dump = Ft),
		(e.load = Nt),
		(e.loadAll = c),
		(e.safeDump = o),
		(e.safeLoad = a),
		(e.safeLoadAll = n),
		(e.types = l),
		Object.defineProperty(e, "__esModule", { value: !0 });
});
