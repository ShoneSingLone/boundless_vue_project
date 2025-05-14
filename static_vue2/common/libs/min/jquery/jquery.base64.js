(r => {
	for (
		var n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
			t = "",
			o = [256],
			u = [256],
			e = 0,
			c = function (r) {
				return r
					.replace(/[\u0080-\u07ff]/g, function (r) {
						r = r.charCodeAt(0);
						return String.fromCharCode(192 | (r >> 6), 128 | (63 & r));
					})
					.replace(/[\u0800-\uffff]/g, function (r) {
						r = r.charCodeAt(0);
						return String.fromCharCode(
							224 | (r >> 12),
							128 | ((r >> 6) & 63),
							128 | (63 & r)
						);
					});
			},
			a = function (r) {
				return r
					.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (r) {
						r =
							((15 & r.charCodeAt(0)) << 12) |
							((63 & r.charCodeAt(1)) << 6) |
							(63 & r.charCodeAt(2));
						return String.fromCharCode(r);
					})
					.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (r) {
						r = ((31 & r.charCodeAt(0)) << 6) | (63 & r.charCodeAt(1));
						return String.fromCharCode(r);
					});
			};
		e < 256;

	) {
		var f = String.fromCharCode(e);
		(t += f), (o[(u[e] = e)] = n.indexOf(f)), ++e;
	}
	function d(r, e, n, t, o, u) {
		for (var c = 0, a = 0, f = (r = String(r)).length, d = "", i = 0; a < f; ) {
			var g = r.charCodeAt(a),
				c = (c << o) + (g < 256 ? n[g] : -1);
			for (i += o; u <= i; ) {
				var h = c >> (i -= u);
				(d += t.charAt(h)), (c ^= h << i);
			}
			++a;
		}
		return !e && 0 < i && (d += t.charAt(c << (u - i))), d;
	}
	var i = (r.base64 = function (r, e, n) {
		return e ? i[r](e, n) : r ? null : this;
	});
	(i.btoa = i.encode =
		function (r, e) {
			return (
				(r = d((r = !1 === i.raw || i.utf8encode || e ? c(r) : r), !1, u, n, 8, 6)) +
				"====".slice(r.length % 4 || 4)
			);
		}),
		(i.atob = i.decode =
			function (r, e) {
				r = String(r).split("=");
				for (var n = r.length; (r[--n] = d(r[n], !0, o, t, 6, 8)), 0 < n; );
				return (r = r.join("")), !1 === i.raw || i.utf8decode || e ? a(r) : r;
			}),
		(i.urlSafeEncode = function (r, e, n, t) {
			return (r = i.encode((r = (n = n || "%") + r + (t = t || "%")), e))
				.replace(/\+/g, "-")
				.replace(/\//g, "_")
				.replace(/=/g, "");
		}),
		(i.urlSafeDecode = function (r, e, n, t) {
			(n = (n = n || "%").length),
				(t = (t = t || "%").length),
				(r = r.replace(/-/g, "+").replace(/_/g, "/")),
				"====".slice(r.length % 4 || 4),
				(r = i.decode(r, e));
			return r.substring(n, r.length - t);
		});
})(jQuery);
