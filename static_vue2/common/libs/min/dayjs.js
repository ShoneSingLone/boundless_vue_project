((t, n) => {
	"object" == typeof exports && "undefined" != typeof module
		? (module.exports = n())
		: "function" == typeof define && define.amd
			? define(n)
			: (t.dayjs = n());
})(this, function () {
	function i(t, n, e) {
		var i = String(t);
		return !i || i.length >= n ? t : "" + Array(n + 1 - i.length).join(e) + t;
	}
	function r(t) {
		return t instanceof p;
	}
	function s(t, n, e) {
		var i;
		return t
			? ("string" == typeof t
					? (D[t] && (i = t), n && ((D[t] = n), (i = t)))
					: ((n = t.name), (D[n] = t), (i = n)),
				e || (c = i),
				i)
			: c;
	}
	function u(t, n, e) {
		return r(t)
			? t.clone()
			: (((e = n ? ("string" == typeof n ? { format: n, pl: e } : n) : {}).date = t),
				new p(e));
	}
	var o = "millisecond",
		f = "second",
		d = "minute",
		$ = "hour",
		l = "day",
		m = "week",
		y = "month",
		a = "quarter",
		M = "year",
		h = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
		g = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
		t = {
			s: i,
			z: function (t) {
				var t = -t.utcOffset(),
					n = Math.abs(t),
					e = Math.floor(n / 60),
					n = n % 60;
				return (t <= 0 ? "+" : "-") + i(e, 2, "0") + ":" + i(n, 2, "0");
			},
			m: function (t, n) {
				var e = 12 * (n.year() - t.year()) + (n.month() - t.month()),
					i = t.clone().add(e, y),
					r = n - i < 0,
					t = t.clone().add(e + (r ? -1 : 1), y);
				return Number(-(e + (n - i) / (r ? i - t : t - i)) || 0);
			},
			a: function (t) {
				return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
			},
			p: function (t) {
				return (
					{ M: y, y: M, w: m, d: l, D: "date", h: $, m: d, s: f, ms: o, Q: a }[t] ||
					String(t || "")
						.toLowerCase()
						.replace(/s$/, "")
				);
			},
			u: function (t) {
				return void 0 === t;
			}
		},
		n = {
			name: "en",
			weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
			months: "January_February_March_April_May_June_July_August_September_October_November_December".split(
				"_"
			)
		},
		c = "en",
		D = {},
		S = ((D[c] = n), t),
		p =
			((S.l = s),
			(S.i = r),
			(S.w = function (t, n) {
				return u(t, { locale: n.$L, utc: n.$u, $offset: n.$offset });
			}),
			((n = e.prototype).parse = function (i) {
				(this.$d = (() => {
					var t = i.date,
						n = i.utc;
					if (null === t) return new Date(NaN);
					if (S.u(t)) return new Date();
					if (!(t instanceof Date || "string" != typeof t || /Z$/i.test(t))) {
						var e = t.match(h);
						if (e)
							return n
								? new Date(
										Date.UTC(
											e[1],
											e[2] - 1,
											e[3] || 1,
											e[4] || 0,
											e[5] || 0,
											e[6] || 0,
											e[7] || 0
										)
									)
								: new Date(
										e[1],
										e[2] - 1,
										e[3] || 1,
										e[4] || 0,
										e[5] || 0,
										e[6] || 0,
										e[7] || 0
									);
					}
					return new Date(t);
				})()),
					this.init();
			}),
			(n.init = function () {
				var t = this.$d;
				(this.$y = t.getFullYear()),
					(this.$M = t.getMonth()),
					(this.$D = t.getDate()),
					(this.$W = t.getDay()),
					(this.$H = t.getHours()),
					(this.$m = t.getMinutes()),
					(this.$s = t.getSeconds()),
					(this.$ms = t.getMilliseconds());
			}),
			(n.$utils = function () {
				return S;
			}),
			(n.isValid = function () {
				return !("Invalid Date" === this.$d.toString());
			}),
			(n.isSame = function (t, n) {
				t = u(t);
				return this.startOf(n) <= t && t <= this.endOf(n);
			}),
			(n.isAfter = function (t, n) {
				return u(t) < this.startOf(n);
			}),
			(n.isBefore = function (t, n) {
				return this.endOf(n) < u(t);
			}),
			(n.$g = function (t, n, e) {
				return S.u(t) ? this[n] : this.set(e, t);
			}),
			(n.year = function (t) {
				return this.$g(t, "$y", M);
			}),
			(n.month = function (t) {
				return this.$g(t, "$M", y);
			}),
			(n.day = function (t) {
				return this.$g(t, "$W", l);
			}),
			(n.date = function (t) {
				return this.$g(t, "$D", "date");
			}),
			(n.hour = function (t) {
				return this.$g(t, "$H", $);
			}),
			(n.minute = function (t) {
				return this.$g(t, "$m", d);
			}),
			(n.second = function (t) {
				return this.$g(t, "$s", f);
			}),
			(n.millisecond = function (t) {
				return this.$g(t, "$ms", o);
			}),
			(n.unix = function () {
				return Math.floor(this.valueOf() / 1e3);
			}),
			(n.valueOf = function () {
				return this.$d.getTime();
			}),
			(n.startOf = function (t, n) {
				function e(t, n) {
					return (
						(n = S.w(r.$u ? Date.UTC(r.$y, n, t) : new Date(r.$y, n, t), r)),
						s ? n : n.endOf(l)
					);
				}
				function i(t, n) {
					return S.w(
						r
							.toDate()
							[t].apply(r.toDate(), (s ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(n)),
						r
					);
				}
				var r = this,
					s = !!S.u(n) || n,
					n = S.p(t),
					u = this.$W,
					o = this.$M,
					a = this.$D,
					h = "set" + (this.$u ? "UTC" : "");
				switch (n) {
					case M:
						return s ? e(1, 0) : e(31, 11);
					case y:
						return s ? e(1, o) : e(0, o + 1);
					case m:
						var c = this.$locale().weekStart || 0,
							c = (u < c ? u + 7 : u) - c;
						return e(s ? a - c : a + (6 - c), o);
					case l:
					case "date":
						return i(h + "Hours", 0);
					case $:
						return i(h + "Minutes", 1);
					case d:
						return i(h + "Seconds", 2);
					case f:
						return i(h + "Milliseconds", 3);
					default:
						return this.clone();
				}
			}),
			(n.endOf = function (t) {
				return this.startOf(t, !1);
			}),
			(n.$set = function (t, n) {
				var t = S.p(t),
					e = "set" + (this.$u ? "UTC" : ""),
					e =
						(((i = {})[l] = e + "Date"),
						(i.date = e + "Date"),
						(i[y] = e + "Month"),
						(i[M] = e + "FullYear"),
						(i[$] = e + "Hours"),
						(i[d] = e + "Minutes"),
						(i[f] = e + "Seconds"),
						(i[o] = e + "Milliseconds"),
						i[t]),
					i = t === l ? this.$D + (n - this.$W) : n;
				return (
					t === y || t === M
						? ((n = this.clone().set("date", 1)).$d[e](i),
							n.init(),
							(this.$d = n.set("date", Math.min(this.$D, n.daysInMonth())).toDate()))
						: e && this.$d[e](i),
					this.init(),
					this
				);
			}),
			(n.set = function (t, n) {
				return this.clone().$set(t, n);
			}),
			(n.get = function (t) {
				return this[S.p(t)]();
			}),
			(n.add = function (e, t) {
				function n(t) {
					var n = u(i);
					return S.w(n.date(n.date() + Math.round(t * e)), i);
				}
				var i = this,
					t = ((e = Number(e)), S.p(t));
				return t === y
					? this.set(y, this.$M + e)
					: t === M
						? this.set(M, this.$y + e)
						: t === l
							? n(1)
							: t === m
								? n(7)
								: ((t = { minute: 6e4, hour: 36e5, second: 1e3 }[t] || 1),
									(t = this.$d.getTime() + e * t),
									S.w(t, this));
			}),
			(n.subtract = function (t, n) {
				return this.add(-1 * t, n);
			}),
			(n.format = function (t) {
				var r,
					e,
					n,
					i,
					s,
					u,
					o,
					a,
					h,
					c,
					f,
					d = this;
				return this.isValid()
					? ((r = t || "YYYY-MM-DDTHH:mm:ssZ"),
						(e = S.z(this)),
						(t = this.$locale()),
						(n = this.$H),
						(i = this.$m),
						(s = this.$M),
						(u = t.weekdays),
						(o = t.months),
						(a = function (t, n, e, i) {
							return (t && (t[n] || t(d, r))) || e[n].substr(0, i);
						}),
						(h = function (t) {
							return S.s(n % 12 || 12, t, "0");
						}),
						(c =
							t.meridiem ||
							function (t, n, e) {
								t = t < 12 ? "AM" : "PM";
								return e ? t.toLowerCase() : t;
							}),
						(f = {
							YY: String(this.$y).slice(-2),
							YYYY: this.$y,
							M: s + 1,
							MM: S.s(s + 1, 2, "0"),
							MMM: a(t.monthsShort, s, o, 3),
							MMMM: o[s] || o(this, r),
							D: this.$D,
							DD: S.s(this.$D, 2, "0"),
							d: String(this.$W),
							dd: a(t.weekdaysMin, this.$W, u, 2),
							ddd: a(t.weekdaysShort, this.$W, u, 3),
							dddd: u[this.$W],
							H: String(n),
							HH: S.s(n, 2, "0"),
							h: h(1),
							hh: h(2),
							a: c(n, i, !0),
							A: c(n, i, !1),
							m: String(i),
							mm: S.s(i, 2, "0"),
							s: String(this.$s),
							ss: S.s(this.$s, 2, "0"),
							SSS: S.s(this.$ms, 3, "0"),
							Z: e
						}),
						r.replace(g, function (t, n) {
							return n || f[t] || e.replace(":", "");
						}))
					: "Invalid Date";
			}),
			(n.utcOffset = function () {
				return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
			}),
			(n.diff = function (t, n, e) {
				var n = S.p(n),
					t = u(t),
					i = 6e4 * (t.utcOffset() - this.utcOffset()),
					r = this - t,
					t = S.m(this, t),
					s = {};
				return (
					(s[M] = t / 12),
					(s[y] = t),
					(s[a] = t / 3),
					(s[m] = (r - i) / 6048e5),
					(s[l] = (r - i) / 864e5),
					(s[$] = r / 36e5),
					(s[d] = r / 6e4),
					(s[f] = r / 1e3),
					(t = s[n] || r),
					e ? t : S.a(t)
				);
			}),
			(n.daysInMonth = function () {
				return this.endOf(y).$D;
			}),
			(n.$locale = function () {
				return D[this.$L];
			}),
			(n.locale = function (t, n) {
				var e;
				return t ? ((e = this.clone()), (t = s(t, n, !0)) && (e.$L = t), e) : this.$L;
			}),
			(n.clone = function () {
				return S.w(this.$d, this);
			}),
			(n.toDate = function () {
				return new Date(this.valueOf());
			}),
			(n.toJSON = function () {
				return this.isValid() ? this.toISOString() : null;
			}),
			(n.toISOString = function () {
				return this.$d.toISOString();
			}),
			(n.toString = function () {
				return this.$d.toUTCString();
			}),
			e);
	function e(t) {
		(this.$L = this.$L || s(t.locale, null, !0)), this.parse(t);
	}
	return (
		(u.prototype = p.prototype),
		(u.extend = function (t, n) {
			return t(n, p, u), u;
		}),
		(u.locale = s),
		(u.isDayjs = r),
		(u.unix = function (t) {
			return u(1e3 * t);
		}),
		(u.en = D[c]),
		(u.Ls = D),
		u
	);
});
