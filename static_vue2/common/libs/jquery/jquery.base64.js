//
(function ($) {
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
		a256 = "",
		r64 = [256],
		r256 = [256],
		i = 0;
	var UTF8 = {
		encode: function (strUni) {
			var strUtf = strUni
				.replace(/[\u0080-\u07ff]/g, function (c) {
					var cc = c.charCodeAt(0);
					return String.fromCharCode(192 | (cc >> 6), 128 | (cc & 63));
				})
				.replace(/[\u0800-\uffff]/g, function (c) {
					var cc = c.charCodeAt(0);
					return String.fromCharCode(
						224 | (cc >> 12),
						128 | ((cc >> 6) & 63),
						128 | (cc & 63)
					);
				});
			return strUtf;
		},
		decode: function (strUtf) {
			var strUni = strUtf
				.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function (c) {
					var cc =
						((c.charCodeAt(0) & 15) << 12) |
						((c.charCodeAt(1) & 63) << 6) |
						(c.charCodeAt(2) & 63);
					return String.fromCharCode(cc);
				})
				.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (c) {
					var cc = ((c.charCodeAt(0) & 31) << 6) | (c.charCodeAt(1) & 63);
					return String.fromCharCode(cc);
				});
			return strUni;
		}
	};
	while (i < 256) {
		var c = String.fromCharCode(i);
		a256 += c;
		r256[i] = i;
		r64[i] = b64.indexOf(c);
		++i;
	}
	function code(s, discard, alpha, beta, w1, w2) {
		s = String(s);
		var buffer = 0,
			i = 0,
			length = s.length,
			result = "",
			bitsInBuffer = 0;
		while (i < length) {
			var c = s.charCodeAt(i);
			c = c < 256 ? alpha[c] : -1;
			buffer = (buffer << w1) + c;
			bitsInBuffer += w1;
			while (bitsInBuffer >= w2) {
				bitsInBuffer -= w2;
				var tmp = buffer >> bitsInBuffer;
				result += beta.charAt(tmp);
				buffer ^= tmp << bitsInBuffer;
			}
			++i;
		}
		if (!discard && bitsInBuffer > 0) {
			result += beta.charAt(buffer << (w2 - bitsInBuffer));
		}
		return result;
	}
	var Plugin = ($.base64 = function (dir, input, encode) {
		return input ? Plugin[dir](input, encode) : dir ? null : this;
	});
	Plugin.btoa = Plugin.encode = function (plain, utf8encode) {
		plain =
			Plugin.raw === false || Plugin.utf8encode || utf8encode ? UTF8.encode(plain) : plain;
		plain = code(plain, false, r256, b64, 8, 6);
		return plain + "====".slice(plain.length % 4 || 4);
	};
	Plugin.atob = Plugin.decode = function (coded, utf8decode) {
		coded = String(coded).split("=");
		var i = coded.length;
		do {
			--i;
			coded[i] = code(coded[i], true, r64, a256, 6, 8);
		} while (i > 0);
		coded = coded.join("");
		return Plugin.raw === false || Plugin.utf8decode || utf8decode ? UTF8.decode(coded) : coded;
	};
	Plugin.urlSafeEncode = function (plain, utf8encode, prefix, postfix) {
		if (!prefix) {
			prefix = "%";
		}
		if (!postfix) {
			postfix = "%";
		}
		plain = prefix + plain + postfix;
		plain = Plugin.encode(plain, utf8encode);
		return plain.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	};
	Plugin.urlSafeDecode = function (coded, utf8decode, prefix, postfix) {
		if (!prefix) {
			prefix = "%";
		}
		if (!postfix) {
			postfix = "%";
		}
		var lL = prefix.length,
			rL = postfix.length;
		coded = coded.replace(/-/g, "+").replace(/_/g, "/");
		coded + "====".slice(coded.length % 4 || 4);
		var plain = Plugin.decode(coded, utf8decode);
		return plain.substring(lL, plain.length - rL);
	};
})(jQuery);
