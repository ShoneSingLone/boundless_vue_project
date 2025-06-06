(r => {
	var t = "(0?\\d+|0x[a-f0-9]+)";
	let p = {
			fourOctet: new RegExp(`^${t}\\.${t}\\.${t}\\.${t}$`, "i"),
			threeOctet: new RegExp(`^${t}\\.${t}\\.${t}$`, "i"),
			twoOctet: new RegExp(`^${t}\\.${t}$`, "i"),
			longValue: new RegExp(`^${t}$`, "i")
		},
		e = new RegExp("^0[0-7]+$", "i"),
		n = new RegExp("^0x[a-f0-9]+$", "i");
	var i = "%[0-9a-z]{1,}",
		o = "(?:[0-9a-f]+::?)+";
	let a = {
		zoneIndex: new RegExp(i, "i"),
		native: new RegExp(`^(::)?(${o})?([0-9a-f]+)?(::)?(${i})?$`, "i"),
		deprecatedTransitional: new RegExp(`^(?:::)(${t}\\.${t}\\.${t}\\.${t}(${i})?)$`, "i"),
		transitional: new RegExp(
			`^((?:${o})|(?:::)(?:${o})?)${t}\\.${t}\\.${t}\\.${t}(${i})?$`,
			"i"
		)
	};
	function u(r, t) {
		if (r.indexOf("::") !== r.lastIndexOf("::")) return null;
		let e = 0,
			n = -1,
			i = (r.match(a.zoneIndex) || [])[0],
			o,
			s;
		for (
			i && ((i = i.substring(1)), (r = r.replace(/%.+$/, "")));
			0 <= (n = r.indexOf(":", n + 1));

		)
			e++;
		if (("::" === r.substr(0, 2) && e--, "::" === r.substr(-2, 2) && e--, e > t)) return null;
		for (s = t - e, o = ":"; s--; ) o += "0:";
		return (
			":" === (r = ":" === (r = r.replace("::", o))[0] ? r.slice(1) : r)[r.length - 1] &&
				(r = r.slice(0, -1)),
			{
				parts: (t = (() => {
					var t = r.split(":"),
						e = [];
					for (let r = 0; r < t.length; r++) e.push(parseInt(t[r], 16));
					return e;
				})()),
				zoneId: i
			}
		);
	}
	function s(r, t, e, n) {
		if (r.length !== t.length)
			throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
		let i = 0,
			o;
		for (; 0 < n; ) {
			if (((o = e - n) < 0 && (o = 0), r[i] >> o != t[i] >> o)) return !1;
			(n -= e), (i += 1);
		}
		return !0;
	}
	function h(r) {
		if (n.test(r)) return parseInt(r, 16);
		if ("0" !== r[0] || isNaN(parseInt(r[1], 10))) return parseInt(r, 10);
		if (e.test(r)) return parseInt(r, 8);
		throw new Error(`ipaddr: cannot parse ${r} as octal`);
	}
	let d = {};
	function f(r) {
		if (4 !== r.length) throw new Error("ipaddr: ipv4 octet count should be 4");
		let t, e;
		for (t = 0; t < r.length; t++)
			if (!(0 <= (e = r[t]) && e <= 255))
				throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
		this.octets = r;
	}
	function c(r, t) {
		let e, n;
		if (16 === r.length)
			for (this.parts = [], e = 0; e <= 14; e += 2) this.parts.push((r[e] << 8) | r[e + 1]);
		else {
			if (8 !== r.length) throw new Error("ipaddr: ipv6 part count should be 8 or 16");
			this.parts = r;
		}
		for (e = 0; e < this.parts.length; e++)
			if (!(0 <= (n = this.parts[e]) && n <= 65535))
				throw new Error("ipaddr: ipv6 part should fit in 16 bits");
		t && (this.zoneId = t);
	}
	(d.IPv4 =
		((f.prototype.SpecialRanges = {
			unspecified: [[new f([0, 0, 0, 0]), 8]],
			broadcast: [[new f([255, 255, 255, 255]), 32]],
			multicast: [[new f([224, 0, 0, 0]), 4]],
			linkLocal: [[new f([169, 254, 0, 0]), 16]],
			loopback: [[new f([127, 0, 0, 0]), 8]],
			carrierGradeNat: [[new f([100, 64, 0, 0]), 10]],
			private: [
				[new f([10, 0, 0, 0]), 8],
				[new f([172, 16, 0, 0]), 12],
				[new f([192, 168, 0, 0]), 16]
			],
			reserved: [
				[new f([192, 0, 0, 0]), 24],
				[new f([192, 0, 2, 0]), 24],
				[new f([192, 88, 99, 0]), 24],
				[new f([198, 18, 0, 0]), 15],
				[new f([198, 51, 100, 0]), 24],
				[new f([203, 0, 113, 0]), 24],
				[new f([240, 0, 0, 0]), 4]
			]
		}),
		(f.prototype.kind = function () {
			return "ipv4";
		}),
		(f.prototype.match = function (r, t) {
			var e;
			if ((void 0 === t && ((r = (e = r)[0]), (t = e[1])), "ipv4" !== r.kind()))
				throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
			return s(this.octets, r.octets, 8, t);
		}),
		(f.prototype.prefixLengthFromSubnetMask = function () {
			let r = 0,
				t = !1;
			var e = { 0: 8, 128: 7, 192: 6, 224: 5, 240: 4, 248: 3, 252: 2, 254: 1, 255: 0 };
			let n, i, o;
			for (n = 3; 0 <= n; --n) {
				if (!((i = this.octets[n]) in e)) return null;
				if (((o = e[i]), t && 0 !== o)) return null;
				8 !== o && (t = !0), (r += o);
			}
			return 32 - r;
		}),
		(f.prototype.range = function () {
			return d.subnetMatch(this, this.SpecialRanges);
		}),
		(f.prototype.toByteArray = function () {
			return this.octets.slice(0);
		}),
		(f.prototype.toIPv4MappedAddress = function () {
			return d.IPv6.parse("::ffff:" + this.toString());
		}),
		(f.prototype.toNormalizedString = function () {
			return this.toString();
		}),
		(f.prototype.toString = function () {
			return this.octets.join(".");
		}),
		f)),
		(d.IPv4.broadcastAddressFromCIDR = function (t) {
			try {
				var e = this.parseCIDR(t),
					n = e[0].toByteArray(),
					i = this.subnetMaskFromPrefixLength(e[1]).toByteArray(),
					o = [];
				let r = 0;
				for (; r < 4; ) o.push(parseInt(n[r], 10) | (255 ^ parseInt(i[r], 10))), r++;
				return new this(o);
			} catch (r) {
				throw new Error("ipaddr: the address does not have IPv4 CIDR format");
			}
		}),
		(d.IPv4.isIPv4 = function (r) {
			return null !== this.parser(r);
		}),
		(d.IPv4.isValid = function (r) {
			try {
				return new this(this.parser(r)), !0;
			} catch (r) {
				return !1;
			}
		}),
		(d.IPv4.isValidFourPartDecimal = function (r) {
			return !(!d.IPv4.isValid(r) || !r.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/));
		}),
		(d.IPv4.networkAddressFromCIDR = function (r) {
			let t, e, n, i, o;
			try {
				for (
					t = this.parseCIDR(r),
						n = t[0].toByteArray(),
						o = this.subnetMaskFromPrefixLength(t[1]).toByteArray(),
						i = [],
						e = 0;
					e < 4;

				)
					i.push(parseInt(n[e], 10) & parseInt(o[e], 10)), e++;
				return new this(i);
			} catch (r) {
				throw new Error("ipaddr: the address does not have IPv4 CIDR format");
			}
		}),
		(d.IPv4.parse = function (r) {
			r = this.parser(r);
			if (null === r) throw new Error("ipaddr: string is not formatted like an IPv4 Address");
			return new this(r);
		}),
		(d.IPv4.parseCIDR = function (r) {
			if ((r = r.match(/^(.+)\/(\d+)$/))) {
				var t = parseInt(r[2]);
				if (0 <= t && t <= 32)
					return (
						(r = [this.parse(r[1]), t]),
						Object.defineProperty(r, "toString", {
							value: function () {
								return this.join("/");
							}
						}),
						r
					);
			}
			throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
		}),
		(d.IPv4.parser = function (r) {
			let t, e, n;
			if ((t = r.match(p.fourOctet))) {
				var i = t.slice(1, 6),
					o = [];
				for (let r = 0; r < i.length; r++) (e = i[r]), o.push(h(e));
				return o;
			}
			if ((t = r.match(p.longValue))) {
				if (4294967295 < (n = h(t[1])) || n < 0)
					throw new Error("ipaddr: address outside defined range");
				return (() => {
					var r = [];
					let t;
					for (t = 0; t <= 24; t += 8) r.push((n >> t) & 255);
					return r;
				})().reverse();
			}
			if ((t = r.match(p.twoOctet))) {
				var s = t.slice(1, 4),
					a = [];
				if (16777215 < (n = h(s[1])) || n < 0)
					throw new Error("ipaddr: address outside defined range");
				return (
					a.push(h(s[0])),
					a.push((n >> 16) & 255),
					a.push((n >> 8) & 255),
					a.push(255 & n),
					a
				);
			}
			if ((t = r.match(p.threeOctet))) {
				(s = t.slice(1, 5)), (a = []);
				if (65535 < (n = h(s[2])) || n < 0)
					throw new Error("ipaddr: address outside defined range");
				return a.push(h(s[0])), a.push(h(s[1])), a.push((n >> 8) & 255), a.push(255 & n), a;
			}
			return null;
		}),
		(d.IPv4.subnetMaskFromPrefixLength = function (r) {
			if ((r = parseInt(r)) < 0 || 32 < r)
				throw new Error("ipaddr: invalid IPv4 prefix length");
			var t = [0, 0, 0, 0];
			let e = 0;
			for (var n = Math.floor(r / 8); e < n; ) (t[e] = 255), e++;
			return n < 4 && (t[n] = (Math.pow(2, r % 8) - 1) << (8 - (r % 8))), new this(t);
		}),
		(d.IPv6 =
			((c.prototype.SpecialRanges = {
				unspecified: [new c([0, 0, 0, 0, 0, 0, 0, 0]), 128],
				linkLocal: [new c([65152, 0, 0, 0, 0, 0, 0, 0]), 10],
				multicast: [new c([65280, 0, 0, 0, 0, 0, 0, 0]), 8],
				loopback: [new c([0, 0, 0, 0, 0, 0, 0, 1]), 128],
				uniqueLocal: [new c([64512, 0, 0, 0, 0, 0, 0, 0]), 7],
				ipv4Mapped: [new c([0, 0, 0, 0, 0, 65535, 0, 0]), 96],
				rfc6145: [new c([0, 0, 0, 0, 65535, 0, 0, 0]), 96],
				rfc6052: [new c([100, 65435, 0, 0, 0, 0, 0, 0]), 96],
				"6to4": [new c([8194, 0, 0, 0, 0, 0, 0, 0]), 16],
				teredo: [new c([8193, 0, 0, 0, 0, 0, 0, 0]), 32],
				reserved: [[new c([8193, 3512, 0, 0, 0, 0, 0, 0]), 32]],
				benchmarking: [new c([8193, 2, 0, 0, 0, 0, 0, 0]), 48],
				amt: [new c([8193, 3, 0, 0, 0, 0, 0, 0]), 32],
				as112v6: [new c([8193, 4, 274, 0, 0, 0, 0, 0]), 48],
				deprecated: [new c([8193, 16, 0, 0, 0, 0, 0, 0]), 28],
				orchid2: [new c([8193, 32, 0, 0, 0, 0, 0, 0]), 28]
			}),
			(c.prototype.isIPv4MappedAddress = function () {
				return "ipv4Mapped" === this.range();
			}),
			(c.prototype.kind = function () {
				return "ipv6";
			}),
			(c.prototype.match = function (r, t) {
				var e;
				if ((void 0 === t && ((r = (e = r)[0]), (t = e[1])), "ipv6" !== r.kind()))
					throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
				return s(this.parts, r.parts, 16, t);
			}),
			(c.prototype.prefixLengthFromSubnetMask = function () {
				let t = 0,
					e = !1;
				var n,
					i = {
						0: 16,
						32768: 15,
						49152: 14,
						57344: 13,
						61440: 12,
						63488: 11,
						64512: 10,
						65024: 9,
						65280: 8,
						65408: 7,
						65472: 6,
						65504: 5,
						65520: 4,
						65528: 3,
						65532: 2,
						65534: 1,
						65535: 0
					};
				for (let r = 7; 0 <= r; --r) {
					if (!((n = this.parts[r]) in i)) return null;
					if (((n = i[n]), e && 0 !== n)) return null;
					16 !== n && (e = !0), (t += n);
				}
				return 128 - t;
			}),
			(c.prototype.range = function () {
				return d.subnetMatch(this, this.SpecialRanges);
			}),
			(c.prototype.toByteArray = function () {
				var t,
					e = [],
					n = this.parts;
				for (let r = 0; r < n.length; r++) (t = n[r]), e.push(t >> 8), e.push(255 & t);
				return e;
			}),
			(c.prototype.toFixedLengthString = function () {
				let r = "";
				return (
					function () {
						var t = [];
						for (let r = 0; r < this.parts.length; r++)
							t.push(
								((r, t) => {
									for (; r.length < t; ) r = "0" + r;
									return r;
								})(this.parts[r].toString(16), 4)
							);
						return t;
					}
						.call(this)
						.join(":") + (r = this.zoneId ? "%" + this.zoneId : r)
				);
			}),
			(c.prototype.toIPv4Address = function () {
				var r, t;
				if (this.isIPv4MappedAddress())
					return (
						(r = (t = this.parts.slice(-2))[0]),
						(t = t[1]),
						new d.IPv4([r >> 8, 255 & r, t >> 8, 255 & t])
					);
				throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
			}),
			(c.prototype.toNormalizedString = function () {
				let r = "";
				return (
					function () {
						var t = [];
						for (let r = 0; r < this.parts.length; r++)
							t.push(this.parts[r].toString(16));
						return t;
					}
						.call(this)
						.join(":") + (r = this.zoneId ? "%" + this.zoneId : r)
				);
			}),
			(c.prototype.toRFC5952String = function () {
				var r,
					t = /((^|:)(0(:|$)){2,})/g,
					e = this.toNormalizedString();
				let n = 0,
					i = -1;
				for (; (r = t.exec(e)); ) r[0].length > i && ((n = r.index), (i = r[0].length));
				return i < 0 ? e : e.substring(0, n) + "::" + e.substring(n + i);
			}),
			(c.prototype.toString = function () {
				return this.toRFC5952String();
			}),
			c)),
		(d.IPv6.broadcastAddressFromCIDR = function (t) {
			try {
				var e = this.parseCIDR(t),
					n = e[0].toByteArray(),
					i = this.subnetMaskFromPrefixLength(e[1]).toByteArray(),
					o = [];
				let r = 0;
				for (; r < 16; ) o.push(parseInt(n[r], 10) | (255 ^ parseInt(i[r], 10))), r++;
				return new this(o);
			} catch (r) {
				throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${r})`);
			}
		}),
		(d.IPv6.isIPv6 = function (r) {
			return null !== this.parser(r);
		}),
		(d.IPv6.isValid = function (r) {
			if ("string" == typeof r && -1 === r.indexOf(":")) return !1;
			try {
				var t = this.parser(r);
				return new this(t.parts, t.zoneId), !0;
			} catch (r) {
				return !1;
			}
		}),
		(d.IPv6.networkAddressFromCIDR = function (r) {
			let t, e, n, i, o;
			try {
				for (
					t = this.parseCIDR(r),
						n = t[0].toByteArray(),
						o = this.subnetMaskFromPrefixLength(t[1]).toByteArray(),
						i = [],
						e = 0;
					e < 16;

				)
					i.push(parseInt(n[e], 10) & parseInt(o[e], 10)), e++;
				return new this(i);
			} catch (r) {
				throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${r})`);
			}
		}),
		(d.IPv6.parse = function (r) {
			r = this.parser(r);
			if (null === r.parts)
				throw new Error("ipaddr: string is not formatted like an IPv6 Address");
			return new this(r.parts, r.zoneId);
		}),
		(d.IPv6.parseCIDR = function (r) {
			var t;
			if ((r = r.match(/^(.+)\/(\d+)$/)) && 0 <= (t = parseInt(r[2])) && t <= 128)
				return (
					(r = [this.parse(r[1]), t]),
					Object.defineProperty(r, "toString", {
						value: function () {
							return this.join("/");
						}
					}),
					r
				);
			throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
		}),
		(d.IPv6.parser = function (r) {
			let t, e, n, i, o, s;
			if ((n = r.match(a.deprecatedTransitional))) return this.parser("::ffff:" + n[1]);
			if (a.native.test(r)) return u(r, 8);
			if (
				(n = r.match(a.transitional)) &&
				((s = n[6] || ""), (t = u(n[1].slice(0, -1) + s, 6)).parts)
			) {
				for (
					o = [parseInt(n[2]), parseInt(n[3]), parseInt(n[4]), parseInt(n[5])], e = 0;
					e < o.length;
					e++
				)
					if (!(0 <= (i = o[e]) && i <= 255)) return null;
				return (
					t.parts.push((o[0] << 8) | o[1]),
					t.parts.push((o[2] << 8) | o[3]),
					{ parts: t.parts, zoneId: t.zoneId }
				);
			}
			return null;
		}),
		(d.IPv6.subnetMaskFromPrefixLength = function (r) {
			if ((r = parseInt(r)) < 0 || 128 < r)
				throw new Error("ipaddr: invalid IPv6 prefix length");
			var t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			let e = 0;
			for (var n = Math.floor(r / 8); e < n; ) (t[e] = 255), e++;
			return n < 16 && (t[n] = (Math.pow(2, r % 8) - 1) << (8 - (r % 8))), new this(t);
		}),
		(d.fromByteArray = function (r) {
			var t = r.length;
			if (4 === t) return new d.IPv4(r);
			if (16 === t) return new d.IPv6(r);
			throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
		}),
		(d.isValid = function (r) {
			return d.IPv6.isValid(r) || d.IPv4.isValid(r);
		}),
		(d.parse = function (r) {
			if (d.IPv6.isValid(r)) return d.IPv6.parse(r);
			if (d.IPv4.isValid(r)) return d.IPv4.parse(r);
			throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
		}),
		(d.parseCIDR = function (t) {
			try {
				return d.IPv6.parseCIDR(t);
			} catch (r) {
				try {
					return d.IPv4.parseCIDR(t);
				} catch (r) {
					throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
				}
			}
		}),
		(d.process = function (r) {
			r = this.parse(r);
			return "ipv6" === r.kind() && r.isIPv4MappedAddress() ? r.toIPv4Address() : r;
		}),
		(d.subnetMatch = function (r, t, e) {
			let n, i, o, s;
			for (i in (null == e && (e = "unicast"), t))
				if (Object.prototype.hasOwnProperty.call(t, i))
					for (
						!(o = t[i])[0] || o[0] instanceof Array || (o = [o]), n = 0;
						n < o.length;
						n++
					)
						if (((s = o[n]), r.kind() === s[0].kind() && r.match.apply(r, s))) return i;
			return e;
		}),
		"undefined" != typeof module && module.exports ? (module.exports = d) : (r.ipaddr = d);
})(window);
