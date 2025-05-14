window.SparkMD5 = (h => {
	var n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
	function o(t, r) {
		var e = t[0],
			n = t[1],
			h = t[2],
			f = t[3],
			n =
				((((n +=
					((((h =
						((((h +=
							((((f =
								((((f +=
									((((e =
										((((e += (((n & h) | (~n & f)) + r[0] - 680876936) | 0) <<
											7) |
											(e >>> 25)) +
											n) |
										0) &
										n) |
										(~e & h)) +
										r[1] -
										389564586) |
									0) <<
									12) |
									(f >>> 20)) +
									e) |
								0) &
								e) |
								(~f & n)) +
								r[2] +
								606105819) |
							0) <<
							17) |
							(h >>> 15)) +
							f) |
						0) &
						f) |
						(~h & e)) +
						r[3] -
						1044525330) |
					0) <<
					22) |
					(n >>> 10)) +
					h) |
				0;
		(n =
			((((n +=
				((((h =
					((((h +=
						((((f =
							((((f +=
								((((e =
									((((e += (((n & h) | (~n & f)) + r[4] - 176418897) | 0) << 7) |
										(e >>> 25)) +
										n) |
									0) &
									n) |
									(~e & h)) +
									r[5] +
									1200080426) |
								0) <<
								12) |
								(f >>> 20)) +
								e) |
							0) &
							e) |
							(~f & n)) +
							r[6] -
							1473231341) |
						0) <<
						17) |
						(h >>> 15)) +
						f) |
					0) &
					f) |
					(~h & e)) +
					r[7] -
					45705983) |
				0) <<
				22) |
				(n >>> 10)) +
				h) |
			0),
			(n =
				((((n +=
					((((h =
						((((h +=
							((((f =
								((((f +=
									((((e =
										((((e += (((n & h) | (~n & f)) + r[8] + 1770035416) | 0) <<
											7) |
											(e >>> 25)) +
											n) |
										0) &
										n) |
										(~e & h)) +
										r[9] -
										1958414417) |
									0) <<
									12) |
									(f >>> 20)) +
									e) |
								0) &
								e) |
								(~f & n)) +
								r[10] -
								42063) |
							0) <<
							17) |
							(h >>> 15)) +
							f) |
						0) &
						f) |
						(~h & e)) +
						r[11] -
						1990404162) |
					0) <<
					22) |
					(n >>> 10)) +
					h) |
				0),
			(n =
				((((n +=
					((((h =
						((((h +=
							((((f =
								((((f +=
									((((e =
										((((e += (((n & h) | (~n & f)) + r[12] + 1804603682) | 0) <<
											7) |
											(e >>> 25)) +
											n) |
										0) &
										n) |
										(~e & h)) +
										r[13] -
										40341101) |
									0) <<
									12) |
									(f >>> 20)) +
									e) |
								0) &
								e) |
								(~f & n)) +
								r[14] -
								1502002290) |
							0) <<
							17) |
							(h >>> 15)) +
							f) |
						0) &
						f) |
						(~h & e)) +
						r[15] +
						1236535329) |
					0) <<
					22) |
					(n >>> 10)) +
					h) |
				0),
			(n =
				((((n +=
					((((h =
						((((h +=
							((((f =
								((((f +=
									((((e =
										((((e += (((n & f) | (h & ~f)) + r[1] - 165796510) | 0) <<
											5) |
											(e >>> 27)) +
											n) |
										0) &
										h) |
										(n & ~h)) +
										r[6] -
										1069501632) |
									0) <<
									9) |
									(f >>> 23)) +
									e) |
								0) &
								n) |
								(e & ~n)) +
								r[11] +
								643717713) |
							0) <<
							14) |
							(h >>> 18)) +
							f) |
						0) &
						e) |
						(f & ~e)) +
						r[0] -
						373897302) |
					0) <<
					20) |
					(n >>> 12)) +
					h) |
				0),
			(n =
				((((n +=
					((((h =
						((((h +=
							((((f =
								((((f +=
									((((e =
										((((e += (((n & f) | (h & ~f)) + r[5] - 701558691) | 0) <<
											5) |
											(e >>> 27)) +
											n) |
										0) &
										h) |
										(n & ~h)) +
										r[10] +
										38016083) |
									0) <<
									9) |
									(f >>> 23)) +
									e) |
								0) &
								n) |
								(e & ~n)) +
								r[15] -
								660478335) |
							0) <<
							14) |
							(h >>> 18)) +
							f) |
						0) &
						e) |
						(f & ~e)) +
						r[4] -
						405537848) |
					0) <<
					20) |
					(n >>> 12)) +
					h) |
				0),
			(n =
				((((n +=
					((((h =
						((((h +=
							((((f =
								((((f +=
									((((e =
										((((e += (((n & f) | (h & ~f)) + r[9] + 568446438) | 0) <<
											5) |
											(e >>> 27)) +
											n) |
										0) &
										h) |
										(n & ~h)) +
										r[14] -
										1019803690) |
									0) <<
									9) |
									(f >>> 23)) +
									e) |
								0) &
								n) |
								(e & ~n)) +
								r[3] -
								187363961) |
							0) <<
							14) |
							(h >>> 18)) +
							f) |
						0) &
						e) |
						(f & ~e)) +
						r[8] +
						1163531501) |
					0) <<
					20) |
					(n >>> 12)) +
					h) |
				0),
			(n =
				((((n +=
					((((h =
						((((h +=
							((((f =
								((((f +=
									((((e =
										((((e += (((n & f) | (h & ~f)) + r[13] - 1444681467) | 0) <<
											5) |
											(e >>> 27)) +
											n) |
										0) &
										h) |
										(n & ~h)) +
										r[2] -
										51403784) |
									0) <<
									9) |
									(f >>> 23)) +
									e) |
								0) &
								n) |
								(e & ~n)) +
								r[7] +
								1735328473) |
							0) <<
							14) |
							(h >>> 18)) +
							f) |
						0) &
						e) |
						(f & ~e)) +
						r[12] -
						1926607734) |
					0) <<
					20) |
					(n >>> 12)) +
					h) |
				0),
			(n =
				((((n +=
					(((h =
						((((h +=
							(((f =
								((((f +=
									(((e =
										((((e += ((n ^ h ^ f) + r[5] - 378558) | 0) << 4) |
											(e >>> 28)) +
											n) |
										0) ^
										n ^
										h) +
										r[8] -
										2022574463) |
									0) <<
									11) |
									(f >>> 21)) +
									e) |
								0) ^
								e ^
								n) +
								r[11] +
								1839030562) |
							0) <<
							16) |
							(h >>> 16)) +
							f) |
						0) ^
						f ^
						e) +
						r[14] -
						35309556) |
					0) <<
					23) |
					(n >>> 9)) +
					h) |
				0),
			(n =
				((((n +=
					(((h =
						((((h +=
							(((f =
								((((f +=
									(((e =
										((((e += ((n ^ h ^ f) + r[1] - 1530992060) | 0) << 4) |
											(e >>> 28)) +
											n) |
										0) ^
										n ^
										h) +
										r[4] +
										1272893353) |
									0) <<
									11) |
									(f >>> 21)) +
									e) |
								0) ^
								e ^
								n) +
								r[7] -
								155497632) |
							0) <<
							16) |
							(h >>> 16)) +
							f) |
						0) ^
						f ^
						e) +
						r[10] -
						1094730640) |
					0) <<
					23) |
					(n >>> 9)) +
					h) |
				0),
			(n =
				((((n +=
					(((h =
						((((h +=
							(((f =
								((((f +=
									(((e =
										((((e += ((n ^ h ^ f) + r[13] + 681279174) | 0) << 4) |
											(e >>> 28)) +
											n) |
										0) ^
										n ^
										h) +
										r[0] -
										358537222) |
									0) <<
									11) |
									(f >>> 21)) +
									e) |
								0) ^
								e ^
								n) +
								r[3] -
								722521979) |
							0) <<
							16) |
							(h >>> 16)) +
							f) |
						0) ^
						f ^
						e) +
						r[6] +
						76029189) |
					0) <<
					23) |
					(n >>> 9)) +
					h) |
				0),
			(n =
				((((n +=
					(((h =
						((((h +=
							(((f =
								((((f +=
									(((e =
										((((e += ((n ^ h ^ f) + r[9] - 640364487) | 0) << 4) |
											(e >>> 28)) +
											n) |
										0) ^
										n ^
										h) +
										r[12] -
										421815835) |
									0) <<
									11) |
									(f >>> 21)) +
									e) |
								0) ^
								e ^
								n) +
								r[15] +
								530742520) |
							0) <<
							16) |
							(h >>> 16)) +
							f) |
						0) ^
						f ^
						e) +
						r[2] -
						995338651) |
					0) <<
					23) |
					(n >>> 9)) +
					h) |
				0),
			(n =
				((((n +=
					(((f =
						((((f +=
							((n ^
								((e =
									((((e += ((h ^ (n | ~f)) + r[0] - 198630844) | 0) << 6) |
										(e >>> 26)) +
										n) |
									0) |
									~h)) +
								r[7] +
								1126891415) |
							0) <<
							10) |
							(f >>> 22)) +
							e) |
						0) ^
						((h =
							((((h += ((e ^ (f | ~n)) + r[14] - 1416354905) | 0) << 15) |
								(h >>> 17)) +
								f) |
							0) |
							~e)) +
						r[5] -
						57434055) |
					0) <<
					21) |
					(n >>> 11)) +
					h) |
				0),
			(n =
				((((n +=
					(((f =
						((((f +=
							((n ^
								((e =
									((((e += ((h ^ (n | ~f)) + r[12] + 1700485571) | 0) << 6) |
										(e >>> 26)) +
										n) |
									0) |
									~h)) +
								r[3] -
								1894986606) |
							0) <<
							10) |
							(f >>> 22)) +
							e) |
						0) ^
						((h =
							((((h += ((e ^ (f | ~n)) + r[10] - 1051523) | 0) << 15) | (h >>> 17)) +
								f) |
							0) |
							~e)) +
						r[1] -
						2054922799) |
					0) <<
					21) |
					(n >>> 11)) +
					h) |
				0),
			(n =
				((((n +=
					(((f =
						((((f +=
							((n ^
								((e =
									((((e += ((h ^ (n | ~f)) + r[8] + 1873313359) | 0) << 6) |
										(e >>> 26)) +
										n) |
									0) |
									~h)) +
								r[15] -
								30611744) |
							0) <<
							10) |
							(f >>> 22)) +
							e) |
						0) ^
						((h =
							((((h += ((e ^ (f | ~n)) + r[6] - 1560198380) | 0) << 15) |
								(h >>> 17)) +
								f) |
							0) |
							~e)) +
						r[13] +
						1309151649) |
					0) <<
					21) |
					(n >>> 11)) +
					h) |
				0),
			(n =
				((((n +=
					(((f =
						((((f +=
							((n ^
								((e =
									((((e += ((h ^ (n | ~f)) + r[4] - 145523070) | 0) << 6) |
										(e >>> 26)) +
										n) |
									0) |
									~h)) +
								r[11] -
								1120210379) |
							0) <<
							10) |
							(f >>> 22)) +
							e) |
						0) ^
						((h =
							((((h += ((e ^ (f | ~n)) + r[2] + 718787259) | 0) << 15) | (h >>> 17)) +
								f) |
							0) |
							~e)) +
						r[9] -
						343485551) |
					0) <<
					21) |
					(n >>> 11)) +
					h) |
				0),
			(t[0] = (e + t[0]) | 0),
			(t[1] = (n + t[1]) | 0),
			(t[2] = (h + t[2]) | 0),
			(t[3] = (f + t[3]) | 0);
	}
	function a(t) {
		for (var r = [], e = 0; e < 64; e += 4)
			r[e >> 2] =
				t.charCodeAt(e) +
				(t.charCodeAt(e + 1) << 8) +
				(t.charCodeAt(e + 2) << 16) +
				(t.charCodeAt(e + 3) << 24);
		return r;
	}
	function u(t) {
		for (var r = [], e = 0; e < 64; e += 4)
			r[e >> 2] = t[e] + (t[e + 1] << 8) + (t[e + 2] << 16) + (t[e + 3] << 24);
		return r;
	}
	function e(t) {
		for (
			var r,
				e,
				n,
				h,
				f = t.length,
				i = [1732584193, -271733879, -1732584194, 271733878],
				s = 64;
			s <= f;
			s += 64
		)
			o(i, a(t.substring(s - 64, s)));
		for (
			r = (t = t.substring(s - 64)).length,
				e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				s = 0;
			s < r;
			s += 1
		)
			e[s >> 2] |= t.charCodeAt(s) << (s % 4 << 3);
		if (((e[s >> 2] |= 128 << (s % 4 << 3)), 55 < s))
			for (o(i, e), s = 0; s < 16; s += 1) e[s] = 0;
		return (
			(h = (h = 8 * f).toString(16).match(/(.*?)(.{0,8})$/)),
			(n = parseInt(h[2], 16)),
			(h = parseInt(h[1], 16) || 0),
			(e[14] = n),
			(e[15] = h),
			o(i, e),
			i
		);
	}
	function i(t) {
		for (var r = 0; r < t.length; r += 1)
			t[r] = (t => {
				for (var r = "", e = 0; e < 4; e += 1)
					r += n[(t >> (8 * e + 4)) & 15] + n[(t >> (8 * e)) & 15];
				return r;
			})(t[r]);
		return t.join("");
	}
	{
		function f(t, r) {
			return (t = 0 | t || 0) < 0 ? Math.max(t + r, 0) : Math.min(t, r);
		}
		i(e("hello")),
			"undefined" == typeof ArrayBuffer ||
				ArrayBuffer.prototype.slice ||
				(ArrayBuffer.prototype.slice = function (t, r) {
					var e = this.byteLength,
						t = f(t, e),
						n = e;
					return (n = r !== h ? f(r, e) : n) < t
						? new ArrayBuffer(0)
						: ((r = n - t),
							(e = new ArrayBuffer(r)),
							(n = new Uint8Array(e)),
							(t = new Uint8Array(this, t, r)),
							n.set(t),
							e);
				});
	}
	function s(t) {
		return (t = /[\u0080-\uFFFF]/.test(t) ? unescape(encodeURIComponent(t)) : t);
	}
	function p(t) {
		for (var r = [], e = t.length, n = 0; n < e - 1; n += 2)
			r.push(parseInt(t.substr(n, 2), 16));
		return String.fromCharCode.apply(String, r);
	}
	function y() {
		this.reset();
	}
	return (
		(y.prototype.append = function (t) {
			return this.appendBinary(s(t)), this;
		}),
		(y.prototype.appendBinary = function (t) {
			(this._buff += t), (this._length += t.length);
			for (var r = this._buff.length, e = 64; e <= r; e += 64)
				o(this._hash, a(this._buff.substring(e - 64, e)));
			return (this._buff = this._buff.substring(e - 64)), this;
		}),
		(y.prototype.end = function (t) {
			for (
				var r,
					e = this._buff,
					n = e.length,
					h = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					f = 0;
				f < n;
				f += 1
			)
				h[f >> 2] |= e.charCodeAt(f) << (f % 4 << 3);
			return this._finish(h, n), (r = i(this._hash)), t && (r = p(r)), this.reset(), r;
		}),
		(y.prototype.reset = function () {
			return (
				(this._buff = ""),
				(this._length = 0),
				(this._hash = [1732584193, -271733879, -1732584194, 271733878]),
				this
			);
		}),
		(y.prototype.getState = function () {
			return { buff: this._buff, length: this._length, hash: this._hash.slice() };
		}),
		(y.prototype.setState = function (t) {
			return (this._buff = t.buff), (this._length = t.length), (this._hash = t.hash), this;
		}),
		(y.prototype.destroy = function () {
			delete this._hash, delete this._buff, delete this._length;
		}),
		(y.prototype._finish = function (t, r) {
			var e,
				n = r;
			if (((t[n >> 2] |= 128 << (n % 4 << 3)), 55 < n))
				for (o(this._hash, t), n = 0; n < 16; n += 1) t[n] = 0;
			(r = (r = 8 * this._length).toString(16).match(/(.*?)(.{0,8})$/)),
				(e = parseInt(r[2], 16)),
				(r = parseInt(r[1], 16) || 0),
				(t[14] = e),
				(t[15] = r),
				o(this._hash, t);
		}),
		(y.hash = function (t, r) {
			return y.hashBinary(s(t), r);
		}),
		(y.hashBinary = function (t, r) {
			t = i(e(t));
			return r ? p(t) : t;
		}),
		((y.ArrayBuffer = function () {
			this.reset();
		}).prototype.append = function (t) {
			(e = this._buff.buffer),
				(n = t),
				(h = !0),
				(f = new Uint8Array(e.byteLength + n.byteLength)).set(new Uint8Array(e)),
				f.set(new Uint8Array(n), e.byteLength);
			var r,
				e,
				n,
				h,
				f,
				i = h ? f : f.buffer,
				s = i.length;
			for (this._length += t.byteLength, r = 64; r <= s; r += 64)
				o(this._hash, u(i.subarray(r - 64, r)));
			return (
				(this._buff =
					r - 64 < s ? new Uint8Array(i.buffer.slice(r - 64)) : new Uint8Array(0)),
				this
			);
		}),
		(y.ArrayBuffer.prototype.end = function (t) {
			for (
				var r,
					e = this._buff,
					n = e.length,
					h = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					f = 0;
				f < n;
				f += 1
			)
				h[f >> 2] |= e[f] << (f % 4 << 3);
			return this._finish(h, n), (r = i(this._hash)), t && (r = p(r)), this.reset(), r;
		}),
		(y.ArrayBuffer.prototype.reset = function () {
			return (
				(this._buff = new Uint8Array(0)),
				(this._length = 0),
				(this._hash = [1732584193, -271733879, -1732584194, 271733878]),
				this
			);
		}),
		(y.ArrayBuffer.prototype.getState = function () {
			var t,
				r = y.prototype.getState.call(this);
			return (r.buff = ((t = r.buff), String.fromCharCode.apply(null, new Uint8Array(t)))), r;
		}),
		(y.ArrayBuffer.prototype.setState = function (t) {
			return (
				(t.buff = ((t, r) => {
					for (
						var e = t.length, n = new ArrayBuffer(e), h = new Uint8Array(n), f = 0;
						f < e;
						f += 1
					)
						h[f] = t.charCodeAt(f);
					return r ? h : n;
				})(t.buff, !0)),
				y.prototype.setState.call(this, t)
			);
		}),
		(y.ArrayBuffer.prototype.destroy = y.prototype.destroy),
		(y.ArrayBuffer.prototype._finish = y.prototype._finish),
		(y.ArrayBuffer.hash = function (t, r) {
			t = i(
				(t => {
					for (
						var r,
							e,
							n,
							h,
							f = t.length,
							i = [1732584193, -271733879, -1732584194, 271733878],
							s = 64;
						s <= f;
						s += 64
					)
						o(i, u(t.subarray(s - 64, s)));
					for (
						r = (t = s - 64 < f ? t.subarray(s - 64) : new Uint8Array(0)).length,
							e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
							s = 0;
						s < r;
						s += 1
					)
						e[s >> 2] |= t[s] << (s % 4 << 3);
					if (((e[s >> 2] |= 128 << (s % 4 << 3)), 55 < s))
						for (o(i, e), s = 0; s < 16; s += 1) e[s] = 0;
					return (
						(h = (h = 8 * f).toString(16).match(/(.*?)(.{0,8})$/)),
						(n = parseInt(h[2], 16)),
						(h = parseInt(h[1], 16) || 0),
						(e[14] = n),
						(e[15] = h),
						o(i, e),
						i
					);
				})(new Uint8Array(t))
			);
			return r ? p(t) : t;
		}),
		y
	);
})();
