!function (e) {
	function n(n) {
		for (var t, o, i = n[0], a = n[1], c = 0, l = []; c < i.length; c++)
			o = i[c],
				Object.prototype.hasOwnProperty.call(r, o) && r[o] && l.push(r[o][0]),
				r[o] = 0;
		for (t in a)
			Object.prototype.hasOwnProperty.call(a, t) && (e[t] = a[t]);
		for (s && s(n); l.length;)
			l.shift()();
	}

	var t = {}
		, r = {
			0: 0
		};

	function o(n) {
		if (t[n])
			return t[n].exports;
		var r = t[n] = {
			i: n,
			l: !1,
			exports: {}
		};
		return e[n].call(r.exports, r, r.exports, o),
			r.l = !0,
			r.exports;
	}

	o.e = function () {
		return Promise.resolve();
	}
		,
		o.m = e,
		o.c = t,
		o.d = function (e, n, t) {
			o.o(e, n) || Object.defineProperty(e, n, {
				enumerable: !0,
				get: t
			});
		}
		,
		o.r = function (e) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
				value: "Module"
			}),
				Object.defineProperty(e, "__esModule", {
					value: !0
				});
		}
		,
		o.t = function (e, n) {
			if (1 & n && (e = o(e)),
				8 & n)
				return e;
			if (4 & n && "object" == typeof e && e && e.__esModule)
				return e;
			var t = Object.create(null);
			if (o.r(t),
				Object.defineProperty(t, "default", {
					enumerable: !0,
					value: e
				}),
				2 & n && "string" != typeof e)
				for (var r in e)
					o.d(t, r, function (n) {
						return e[n];
					}
						.bind(null, r));
			return t;
		}
		,
		o.n = function (e) {
			var n = e && e.__esModule ? function () {
				return e.default;
			}
				: function () {
					return e;
				}
				;
			return o.d(n, "a", n),
				n;
		}
		,
		o.o = function (e, n) {
			return Object.prototype.hasOwnProperty.call(e, n);
		}
		,
		o.p = "",
		o.oe = function (e) {
			throw console.error(e),
			e;
		}
		;
	var i = window.webpackJsonp = window.webpackJsonp || []
		, a = i.push.bind(i);
	i.push = n,
		i = i.slice();
	for (var c = 0; c < i.length; c++)
		n(i[c]);
	var s = a;
	o(o.s = 140);
}([function (e, n, t) {
	"use strict";
	e.exports = t(94);
}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return c;
		}
		));
		var r = t(13)
			, o = t.n(r)
			, i = t(2)
			, a = function (e) {
				var n = "function" == typeof Symbol && Symbol.iterator
					, t = n && e[n]
					, r = 0;
				if (t)
					return t.call(e);
				if (e && "number" == typeof e.length)
					return {
						next: function () {
							return e && r >= e.length && (e = void 0),
							{
								value: e && e[r++],
								done: !e
							};
						}
					};
				throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.");
			}
			, c = function () {
				function e() {
				}

				return e.i18nReplace = function (n, t) {
					return n.replace ? n.replace(this.i18nSubRegRex, (function (n, r) {
						return ["Number", "String", "Boolean"].includes(e.getTypeOfData(t[r])) ? t[r] : n;
					}
					)) : n;
				}
					,
					e.getTypeOfData = function (e) {
						var n = Object.prototype.toString.call(e);
						return n.substr(0, n.length - 1).split(" ")[1];
					}
					,
					e.delUrlParameter = function (e, n) {
						return e.replace(new RegExp("[?&]" + n + "=[^&#]*(#.*)?$"), "$1").replace(new RegExp("([?&])" + n + "=[^&]*&"), "$1");
					}
					,
					e.addOrReplaceUrlParameter = function (e, n, t) {
						if (!e || !n)
							return e;
						var r = e.split("#/")
							, o = "";
						return r.length > 1 && (o = "#/" + r[1]),
							r[0] = this.delUrlParameter(r[0], n),
							t && (-1 !== r[0].indexOf("?") ? r[0] = r[0] + "&" + n + "=" + t : r[0] = r[0] + "?" + n + "=" + t),
							r[0] + o;
					}
					,
					e.addOrReplaceParamsEndOfUrl = function (e, n, t) {
						if (!e || !n)
							return e;
						var r = e.split("#/")
							, o = ""
							, i = r[0];
						return r.length > 1 ? o = "#/" + r[1] : (o = r[0],
							i = ""),
							o = this.delUrlParameter(o, n),
							t && (o = -1 !== o.indexOf("?") ? o + "&" + n + "=" + t : o + "?" + n + "=" + t),
							i + o;
					}
					,
					e.getUrlParameter = function (e, n) {
						var t, r, o = window.location.href;
						return this.getParameterFromUri(o, e) || (n ? "agencyId" === e ? (null === (t = window.moCfUserCache) || void 0 === t ? void 0 : t.userId) || "" : "region" === e ? i.a.getCookie("projectName") || encodeURIComponent(null === (r = window.moCfUserCache) || void 0 === r ? void 0 : r.projectName) || "" : null : null);
					}
					,
					e.getParameterFromUri = function (e, n) {
						var t = "";
						if (t = e.indexOf("#") > e.indexOf("?") ? window.location.search.substring(1) : e.split("?")[1] || "")
							for (var r = t.split("&"), o = 0; o < r.length; o++) {
								var i = r[o].split("=");
								if (i[0] === n)
									return i[1];
							}
						return null;
					}
					,
					e.genHWSHref = function (e, n, t) {
						if (t || (t = {}),
							!e || "#" === e)
							return e;
						if (n)
							"locale" === n && (e = this.addOrReplaceUrlParameter(e, "locale", i.a.getCookie("locale")));
						else {
							e = this.addOrReplaceUrlParameter(e, "agencyId", this.getUrlParameter("agencyId", !0));
							var r = t.region || this.getUrlParameter("region", !0);
							r && "" !== r && "null" !== r && "undefined" !== r && (e = this.addOrReplaceUrlParameter(e, "region", r)),
								e = this.addOrReplaceUrlParameter(e, "locale", i.a.getCookie("locale"));
						}
						return e;
					}
					,
					e.isBlackRolesEffects = function (e, n) {
						if (!e || e.length <= 0)
							return !1;
						for (var t = function (t) {
							if ((n && n.findIndex((function (n) {
								return n === e[t];
							}
							))) >= 0)
								return {
									value: !0
								};
						}, r = 0; r < e.length; r++) {
							var i = t(r);
							if ("object" === o()(i))
								return i.value;
						}
						return !1;
					}
					,
					e.getMenuPermissionHref = function (e, n, t) {
						return t ? this.isServiceOperationMgr(e) ? n.mgr_link : n.link : null;
					}
					,
					e.getMenuHref = function (e, n, t) {
						var r, o;
						if (!e)
							return null;
						var i = n.hide
							, c = i && (null == e ? void 0 : e.filter((function (e) {
								return i.includes(e);
							}
							)));
						if (c && c.length > 0)
							return null;
						if (n.needLoginUser && !t)
							return null;
						var s = n.display;
						try {
							for (var l = a(s), u = l.next(); !u.done; u = l.next()) {
								var f = u.value;
								if (e.includes(f.role))
									return f.link;
							}
						} catch (e) {
							r = {
								error: e
							};
						} finally {
							try {
								u && !u.done && (o = l.return) && o.call(l);
							} finally {
								if (r)
									throw r.error;
							}
						}
						var d = s.filter((function (e) {
							return "*" === e.role;
						}
						));
						return d.length > 0 ? d[0].link : null;
					}
					,
					e.getClass = function (e) {
						return function (n) {
							return n.split(" ").filter((function (e) {
								return !!e;
							}
							)).map((function (n) {
								return "" + e[n];
							}
							)).join(" ");
						};
					}
					,
					e.gotoAgencyMgr = function () {
						window.location.href !== window.location.origin + "/motenantconsolehomewebsite/#/agencyManager" && (window.location.href = window.location.origin + "/motenantconsolehomewebsite/#/agencyManager");
					}
					,
					e.replaceUrlHostName = function (e, n) {
						if (!e || !n)
							return e;
						return e.replace(/^https:\/\/([a-zA-Z0-9.\-\[\]:]+)\//, n);
					}
					,
					e.getArray = function (e) {
						var n = [];
						if (!e || !this.isObject(e))
							return null;
						for (var t in e)
							n.push(e[t]);
						return n;
					}
					,
					e.isObject = function (e) {
						return "[object Object]" == Object.prototype.toString.call(e);
					}
					,
					e.isArray = function (e) {
						return "[object Array]" == Object.prototype.toString.call(e);
					}
					,
					e.getValue = function (e, n) {
						if (!n || !this.isArray(n))
							return null;
						for (var t = 0; t < n.length; t++)
							if (n[t].itemName === e)
								return n[t].itemValue;
						return null;
					}
					,
					e.isCrsBorrowService = function (e) {
						return e && e.includes("name={userName}");
					}
					,
					e.isOfflineService = function (e) {
						return e && e + "" === this.OFFLINE_SERVICE_CATALOG_ORDER;
					}
					,
					e.isMultiCloudScene = function (e) {
						return !!(e && e.length > 0) && e.map((function (e) {
							return e.deployType;
						}
						)).includes("slave");
					}
					,
					e.isSlaveRegion = function (e) {
						return !!e && "slave" === e.deployType;
					}
					,
					e.isServiceOperationMgr = function (e) {
						return !!e && (e.includes("op_gated_mo_bss_admin") || e.includes("mo_bss_adm") || e.includes("mo_tenant_adm"));
					}
					,
					e.replaceServiceUrlDomain = function (n, t, r) {
						var o = t.find((function (e) {
							return e.region_id === r;
						}
						));
						if (null == o ? void 0 : o.url) {
							var i = o.url.split("&service=")[1]
								, a = (i = decodeURIComponent(i)).split("/")[2];
							n = e.replaceUrlHostName(n, "https://" + a + "/");
						}
						return n;
					}
					,
					e.deepClone = function (e) {
						var n, t = this;
						if ("object" === o()(e)) {
							if (Array.isArray(e))
								n = [],
									e.forEach((function (e) {
										n.push(t.deepClone(e));
									}
									));
							else if (null === e)
								n = null;
							else if (e.constructor === RegExp)
								n = e;
							else
								for (var r in n = {},
									e)
									if (Object.prototype.hasOwnProperty.call(e, r)) {
										var i = e[r];
										n[r] = this.deepClone(i);
									}
						} else
							n = e;
						return n;
					}
					,
					e.i18nSubRegRex = /\{\s*([^\|\}]+?)\s*(?:\|([^\}]*))?\s*\}/g,
					e.OFFLINE_SERVICE_CATALOG_ORDER = "10001",
					e;
			}();
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return a;
		}
		));
		var r = t(13)
			, o = t.n(r)
			, i = {
				cache: [],
				setItem: function (e, n, t, r) {
					var o = e + "=" + n + ";path=/;domain=" + r;
					if (t > 0) {
						var i = new Date;
						i.setTime(i.getTime() + 1e3 * t),
							o = o + "; expires=" + i.toUTCString();
					}
					this.cache.push(e),
						document.cookie = o;
				},
				getItem: function (e) {
					for (var n = document.cookie.split("; "), t = null, r = 0; r < n.length;)
						if ((t = n[r++].split("="))[0] === e)
							return t[1];
					return "";
				},
				removeItem: function (e) {
					var n = new Date;
					n.setTime(n.getTime() - 1e4),
						document.cookie = e + "=v; expires=" + n.toUTCString();
				},
				clear: function () {
					for (var e = this.cache, n = 0; n < e.length;)
						this.removeItem(e[n++]);
				}
			}
			, a = function () {
				function e() {
				}

				return e.setCookie = function (n, t, r, i) {
					var a = e.cookieStorage;
					"object" === o()(t) && (t = JSON.stringify(t));
					var c = document.domain.replace(/.+?\./, "")
						, s = document.domain.split(".").slice(-2).join(".")
						, l = i || (["locale", "cfLatestRecordTimestamp"].includes(n) ? s : c);
					a.setItem(n, t, r, l);
				}
					,
					e.getCookie = function (n) {
						var t = e.cookieStorage.getItem(n);
						try {
							return JSON.parse(t);
						} catch (e) {
							return t;
						}
					}
					,
					e.delCookie = function (n) {
						e.cookieStorage.removeItem(n);
					}
					,
					e.flushCookie = function () {
						e.cookieStorage.clear();
					}
					,
					e.setParentCookie = function (e, n) {
						var t = e + "=" + encodeURIComponent(n)
							, r = new Date;
						r.setTime(r.getTime() + 2592e6);
						var o = window.location.hostname;
						t += ";path=/;domain=" + (/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(o) || -1 === o.indexOf(".") ? o : o.substr(o.indexOf("."))),
							document.cookie = t + ";secure";
					}
					,
					e.removeParentCookie = function (e) {
						var n, t = window.location.hostname;
						n = e + "=;path=/;domain=" + (/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(t) || -1 === t.indexOf(".") ? t : t.substr(t.indexOf(".")));
						var r = new Date;
						r.setTime(r.getTime() - 864e5),
							n += ";expires=" + r.toUTCString(),
							document.cookie = n;
					}
					,
					e.getLocalStorage = function (n) {
						if (window.localStorage) {
							var t = localStorage.getItem(n + "_expiresIn")
								, r = localStorage.getItem(n);
							return null == t ? e.JsonParse(r) : (Number(t) || 0) < Date.now() ? (e.delLocalStorage(n),
								null) : e.JsonParse(r);
						}
					}
					,
					e.JsonParse = function (e) {
						try {
							return JSON.parse(e);
						} catch (n) {
							return e;
						}
					}
					,
					e.endsWith = function (e, n) {
						return "string" == typeof e && "string" == typeof n && "" !== e && "" !== n && -1 !== e.indexOf(n, e.length - n.length);
					}
					,
					e.clearExpiredStorage = function () {
						Object.keys(localStorage).forEach((function (n) {
							if (e.endsWith(n, "_expiresIn")) {
								var t = localStorage.getItem(n);
								(!t || !Number(t) || Number(t) < Date.now()) && e.delLocalStorage(n.replace("_expiresIn", ""));
							}
						}
						));
					}
					,
					e.setLocalStorage = function (n, t, r) {
						if (localStorage) {
							var o;
							e.clearExpiredStorage(),
								o = null == r ? 86400 : Math.abs(r);
							var i = Date.now() + 1e3 * o;
							try {
								localStorage.setItem(n, JSON.stringify(t)),
									localStorage.setItem(n + "_expiresIn", i.toString());
							} catch (r) {
								if (r.name.toUpperCase().indexOf("QUOTA") >= 0) {
									var a = void 0
										, c = [];
									for (a in localStorage)
										0 === a.indexOf(n) && c.push(JSON.parse(localStorage[a]));
									return c.length ? (c.sort((function (e, n) {
										return e.stamp - n.stamp;
									}
									)),
										e.delLocalStorage(c[0].key),
										e.setLocalStorage(n, t, o)) : void 0;
								}
								return;
							}
							return !0;
						}
					}
					,
					e.delLocalStorage = function (e) {
						try {
							localStorage.removeItem(e),
								localStorage.removeItem(e + "_expiresIn");
						} catch (e) {
							return !1;
						}
						return !0;
					}
					,
					e.getSessionStorage = function (e) {
						if (window.sessionStorage)
							try {
								var n = sessionStorage.getItem(e);
								return JSON.parse(n);
							} catch (e) {
								return null;
							}
					}
					,
					e.setSessionStorage = function (e, n) {
						try {
							sessionStorage.setItem(e, JSON.stringify(n));
						} catch (e) {
							return !1;
						}
						return !0;
					}
					,
					e.delSessionStorage = function (e) {
						try {
							sessionStorage.removeItem(e);
						} catch (e) {
							return !1;
						}
						return !0;
					}
					,
					e.cookieStorage = i,
					e;
			}();
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return i;
		}
		));
		var r = function () {
			this.AppWebPath = "/console",
				this.extProjectsProjectsRoles = ["te_admin", "readonly", "vpc_netadm", "elbadm"],
				this.browserCodeMap = {
					zh: "zh-cn",
					en: "en-us",
					de: "de-de",
					fr: "fr-fr",
					es: "es-es",
					pt: "pt-br"
				};
		}
			, o = t(31)
			, i = function () {
				function e() {
				}

				return e.getExtProjectsProjectsRoles = function () {
					return this.globalConfig.extProjectsProjectsRoles;
				}
					,
					e.setSupportLanguage = function (e) {
						this.globalConfig.supportLanguage = e;
					}
					,
					e.getAppWebPath = function () {
						var e = window.AppWebPath || window.appWebPath || location.pathname;
						return e = e.replace(/^\//, "").replace(/\/$/, ""),
							window.location.origin + "/" + e;
					}
					,
					e.getLanguage = function (e) {
						return void 0 === e && (e = "locale"),
							Object(o.a)() || "";
					}
					,
					e.globalConfig = new r,
					e;
			}();
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return f;
		}
		));
		var r = t(69)
			, o = t.n(r)
			, i = t(1)
			, a = t(3)
			, c = t(2);

		function s(e, n) {
			var t;
			return (t = e.headers[n]) || (t = e.headers[n.toLowerCase()]),
				t || (t = e.headers[n.toUpperCase()]),
				t;
		}

		var l = o.a.create({
			timeout: 6e4
		});

		function u(e) {
			return "[object Object]" === Object.prototype.toString.call(e.url) ? i.a.i18nReplace(e.url.s, e.url.o) : e.url;
		}

		l.defaults.headers.post["Context-Type"] = "application/json",
			l.interceptors.request.use((function (e) {
				var n;
				return e.headers["X-Language"] = a.a.getLanguage(),
					e.headers["x-requested-with"] = "XMLHttpRequest",
					e.headers["x-request-from"] = "Framework",
					i.a.getUrlParameter("region") && (e.headers.ProjectName = i.a.getUrlParameter("region")),
					i.a.getUrlParameter("agencyId") && (e.headers.AgencyId = (null === (n = e.headers) || void 0 === n ? void 0 : n.AgencyId) || i.a.getUrlParameter("agencyId")),
					e;
			}
			), (function (e) {
				return Promise.resolve(e);
			}
			)),
			l.interceptors.response.use((function (e) {
				!function (e) {
					var n = c.a.getSessionStorage("cfExpiredFlag");
					!(200 === e.status && s(e, "HW-AJAX-REDIRECT") && !n) || (c.a.flushCookie(),
						window.location.reload());
				}(e);
				var n = e.status;
				return n >= 200 && n <= 300 || 304 === n ? Promise.resolve(e.data) : Promise.reject(e.data.message);
			}
			), (function (e) {
				return e.response && function (e) {
					if (403 === e.status && s(e, "HW-IAM-FORBIDDEN")) {
						var n = window.location.href
							, t = i.a.delUrlParameter(n, "agencyId");
						if (t = i.a.delUrlParameter(t, "region"),
							n !== (t = i.a.delUrlParameter(t, "regionId")) && !e.headers["NOT-REFRESH"])
							c.a.flushCookie(),
								c.a.removeParentCookie("selectedRegion"),
								c.a.removeParentCookie("serviceOperationMgrSelectedRegion"),
								c.a.removeParentCookie("projectId"),
								c.a.removeParentCookie("projectName"),
								c.a.removeParentCookie("projectAgencyId"),
								window.location.replace(t);
					}
				}(e.response),
					Promise.reject(e);
			}
			));
		var f = function () {
			function e() {
			}

			return e.get = function (e) {
				return new Promise((function (n, t) {
					l({
						method: "get",
						url: u(e),
						params: e.params,
						headers: e.headers
					}).then((function (e) {
						n(e);
					}
					)).catch((function (e) {
						t(e);
					}
					));
				}
				));
			}
				,
				e.post = function (e) {
					return new Promise((function (n, t) {
						l({
							method: "post",
							url: u(e),
							data: e.data,
							headers: e.headers
						}).then((function (e) {
							n(e);
						}
						)).catch((function (e) {
							t(e);
						}
						));
					}
					));
				}
				,
				e.delete = function (e) {
					return new Promise((function (n, t) {
						l({
							method: "delete",
							url: u(e),
							data: e.data,
							headers: e.headers
						}).then((function (e) {
							n(e);
						}
						)).catch((function (e) {
							t(e);
						}
						));
					}
					));
				}
				,
				e.put = function (e) {
					return new Promise((function (n, t) {
						l({
							method: "put",
							url: u(e),
							data: e.data,
							headers: e.headers
						}).then((function (e) {
							n(e);
						}
						)).catch((function (e) {
							t(e);
						}
						));
					}
					));
				}
				,
				e;
		}();
	}
	, function (e, n, t) {
		"use strict";
		var r, o = function () {
			return void 0 === r && (r = Boolean(window && document && document.all && !window.atob)),
				r;
		}, i = function () {
			var e = {};
			return function (n) {
				if (void 0 === e[n]) {
					var t = document.querySelector(n);
					if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement)
						try {
							t = t.contentDocument.head;
						} catch (e) {
							t = null;
						}
					e[n] = t;
				}
				return e[n];
			};
		}(), a = [];

		function c(e) {
			for (var n = -1, t = 0; t < a.length; t++)
				if (a[t].identifier === e) {
					n = t;
					break;
				}
			return n;
		}

		function s(e, n) {
			for (var t = {}, r = [], o = 0; o < e.length; o++) {
				var i = e[o]
					, s = n.base ? i[0] + n.base : i[0]
					, l = t[s] || 0
					, u = "".concat(s, " ").concat(l);
				t[s] = l + 1;
				var f = c(u)
					, d = {
						css: i[1],
						media: i[2],
						sourceMap: i[3]
					};
				-1 !== f ? (a[f].references++,
					a[f].updater(d)) : a.push({
						identifier: u,
						updater: g(d, n),
						references: 1
					}),
					r.push(u);
			}
			return r;
		}

		function l(e) {
			var n = document.createElement("style")
				, r = e.attributes || {};
			if (void 0 === r.nonce) {
				var o = t.nc;
				o && (r.nonce = o);
			}
			if (Object.keys(r).forEach((function (e) {
				n.setAttribute(e, r[e]);
			}
			)),
				"function" == typeof e.insert)
				e.insert(n);
			else {
				var a = i(e.insert || "head");
				if (!a)
					throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
				a.appendChild(n);
			}
			return n;
		}

		var u, f = (u = [],
			function (e, n) {
				return u[e] = n,
					u.filter(Boolean).join("\n");
			}
		);

		function d(e, n, t, r) {
			var o = t ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
			if (e.styleSheet)
				e.styleSheet.cssText = f(n, o);
			else {
				var i = document.createTextNode(o)
					, a = e.childNodes;
				a[n] && e.removeChild(a[n]),
					a.length ? e.insertBefore(i, a[n]) : e.appendChild(i);
			}
		}

		function m(e, n, t) {
			var r = t.css
				, o = t.media
				, i = t.sourceMap;
			if (o ? e.setAttribute("media", o) : e.removeAttribute("media"),
				i && btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")),
				e.styleSheet)
				e.styleSheet.cssText = r;
			else {
				for (; e.firstChild;)
					e.removeChild(e.firstChild);
				e.appendChild(document.createTextNode(r));
			}
		}

		var p = null
			, h = 0;

		function g(e, n) {
			var t, r, o;
			if (n.singleton) {
				var i = h++;
				t = p || (p = l(n)),
					r = d.bind(null, t, i, !1),
					o = d.bind(null, t, i, !0);
			} else
				t = l(n),
					r = m.bind(null, t, n),
					o = function () {
						!function (e) {
							if (null === e.parentNode)
								return !1;
							e.parentNode.removeChild(e);
						}(t);
					}
					;
			return r(e),
				function (n) {
					if (n) {
						if (n.css === e.css && n.media === e.media && n.sourceMap === e.sourceMap)
							return;
						r(e = n);
					} else
						o();
				};
		}

		e.exports = function (e, n) {
			(n = n || {}).singleton || "boolean" == typeof n.singleton || (n.singleton = o());
			var t = s(e = e || [], n);
			return function (e) {
				if (e = e || [],
					"[object Array]" === Object.prototype.toString.call(e)) {
					for (var r = 0; r < t.length; r++) {
						var o = c(t[r]);
						a[o].references--;
					}
					for (var i = s(e, n), l = 0; l < t.length; l++) {
						var u = c(t[l]);
						0 === a[u].references && (a[u].updater(),
							a.splice(u, 1));
					}
					t = i;
				}
			};
		};
	}
	, function (e, n, t) {
		"use strict";
		e.exports = function (e) {
			var n = [];
			return n.toString = function () {
				return this.map((function (n) {
					var t = function (e, n) {
						var t = e[1] || ""
							, r = e[3];
						if (!r)
							return t;
						if (n && "function" == typeof btoa) {
							var o = (a = r,
								c = btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
								s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),
								"/*# ".concat(s, " */"))
								, i = r.sources.map((function (e) {
									return "/*# sourceURL=".concat(r.sourceRoot || "").concat(e, " */");
								}
								));
							return [t].concat(i).concat([o]).join("\n");
						}
						var a, c, s;
						return [t].join("\n");
					}(n, e);
					return n[2] ? "@media ".concat(n[2], " {").concat(t, "}") : t;
				}
				)).join("");
			}
				,
				n.i = function (e, t, r) {
					"string" == typeof e && (e = [[null, e, ""]]);
					var o = {};
					if (r)
						for (var i = 0; i < this.length; i++) {
							var a = this[i][0];
							null != a && (o[a] = !0);
						}
					for (var c = 0; c < e.length; c++) {
						var s = [].concat(e[c]);
						r && o[s[0]] || (t && (s[2] ? s[2] = "".concat(t, " and ").concat(s[2]) : s[2] = t),
							n.push(s));
					}
				}
				,
				n;
		};
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return f;
		}
		)),
			t.d(n, "b", (function () {
				return z;
			}
			));
		var r = t(0)
			, o = t.n(r)
			, i = o.a.createContext(null);
		var a = function (e) {
			e();
		}
			, c = {
				notify: function () {
				}
			};

		function s() {
			var e = a
				, n = null
				, t = null;
			return {
				clear: function () {
					n = null,
						t = null;
				},
				notify: function () {
					e((function () {
						for (var e = n; e;)
							e.callback(),
								e = e.next;
					}
					));
				},
				get: function () {
					for (var e = [], t = n; t;)
						e.push(t),
							t = t.next;
					return e;
				},
				subscribe: function (e) {
					var r = !0
						, o = t = {
							callback: e,
							next: null,
							prev: t
						};
					return o.prev ? o.prev.next = o : n = o,
						function () {
							r && null !== n && (r = !1,
								o.next ? o.next.prev = o.prev : t = o.prev,
								o.prev ? o.prev.next = o.next : n = o.next);
						};
				}
			};
		}

		var l = function () {
			function e(e, n) {
				this.store = e,
					this.parentSub = n,
					this.unsubscribe = null,
					this.listeners = c,
					this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
			}

			var n = e.prototype;
			return n.addNestedSub = function (e) {
				return this.trySubscribe(),
					this.listeners.subscribe(e);
			}
				,
				n.notifyNestedSubs = function () {
					this.listeners.notify();
				}
				,
				n.handleChangeWrapper = function () {
					this.onStateChange && this.onStateChange();
				}
				,
				n.isSubscribed = function () {
					return Boolean(this.unsubscribe);
				}
				,
				n.trySubscribe = function () {
					this.unsubscribe || (this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.handleChangeWrapper) : this.store.subscribe(this.handleChangeWrapper),
						this.listeners = s());
				}
				,
				n.tryUnsubscribe = function () {
					this.unsubscribe && (this.unsubscribe(),
						this.unsubscribe = null,
						this.listeners.clear(),
						this.listeners = c);
				}
				,
				e;
		}()
			,
			u = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? r.useLayoutEffect : r.useEffect;
		var f = function (e) {
			var n = e.store
				, t = e.context
				, a = e.children
				, c = Object(r.useMemo)((function () {
					var e = new l(n);
					return e.onStateChange = e.notifyNestedSubs,
					{
						store: n,
						subscription: e
					};
				}
				), [n])
				, s = Object(r.useMemo)((function () {
					return n.getState();
				}
				), [n]);
			u((function () {
				var e = c.subscription;
				return e.trySubscribe(),
					s !== n.getState() && e.notifyNestedSubs(),
					function () {
						e.tryUnsubscribe(),
							e.onStateChange = null;
					};
			}
			), [c, s]);
			var f = t || i;
			return o.a.createElement(f.Provider, {
				value: c
			}, a);
		};

		function d() {
			return (d = Object.assign || function (e) {
				for (var n = 1; n < arguments.length; n++) {
					var t = arguments[n];
					for (var r in t)
						Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
				}
				return e;
			}
			).apply(this, arguments);
		}

		function m(e, n) {
			if (null == e)
				return {};
			var t, r, o = {}, i = Object.keys(e);
			for (r = 0; r < i.length; r++)
				t = i[r],
					n.indexOf(t) >= 0 || (o[t] = e[t]);
			return o;
		}

		var p = t(55)
			, h = t.n(p)
			, g = t(54)
			, v = []
			, b = [null, null];

		function w(e, n) {
			var t = e[1];
			return [n.payload, t + 1];
		}

		function y(e, n, t) {
			u((function () {
				return e.apply(void 0, n);
			}
			), t);
		}

		function x(e, n, t, r, o, i, a) {
			e.current = r,
				n.current = o,
				t.current = !1,
				i.current && (i.current = null,
					a());
		}

		function k(e, n, t, r, o, i, a, c, s, l) {
			if (e) {
				var u = !1
					, f = null
					, d = function () {
						if (!u) {
							var e, t, d = n.getState();
							try {
								e = r(d, o.current);
							} catch (e) {
								t = e,
									f = e;
							}
							t || (f = null),
								e === i.current ? a.current || s() : (i.current = e,
									c.current = e,
									a.current = !0,
									l({
										type: "STORE_UPDATED",
										payload: {
											error: t
										}
									}));
						}
					};
				t.onStateChange = d,
					t.trySubscribe(),
					d();
				return function () {
					if (u = !0,
						t.tryUnsubscribe(),
						t.onStateChange = null,
						f)
						throw f;
				};
			}
		}

		var S = function () {
			return [null, 0];
		};

		function E(e, n) {
			void 0 === n && (n = {});
			var t = n
				, a = t.getDisplayName
				, c = void 0 === a ? function (e) {
					return "ConnectAdvanced(" + e + ")";
				}
					: a
				, s = t.methodName
				, u = void 0 === s ? "connectAdvanced" : s
				, f = t.renderCountProp
				, p = void 0 === f ? void 0 : f
				, E = t.shouldHandleStateChanges
				, C = void 0 === E || E
				, A = t.storeKey
				, I = void 0 === A ? "store" : A
				, T = (t.withRef,
					t.forwardRef)
				, P = void 0 !== T && T
				, O = t.context
				, _ = void 0 === O ? i : O
				,
				j = m(t, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"])
				, N = _;
			return function (n) {
				var t = n.displayName || n.name || "Component"
					, i = c(t)
					, a = d({}, j, {
						getDisplayName: c,
						methodName: u,
						renderCountProp: p,
						shouldHandleStateChanges: C,
						storeKey: I,
						displayName: i,
						wrappedComponentName: t,
						WrappedComponent: n
					})
					, s = j.pure;
				var f = s ? r.useMemo : function (e) {
					return e();
				}
					;

				function E(t) {
					var i = Object(r.useMemo)((function () {
						var e = t.reactReduxForwardedRef
							, n = m(t, ["reactReduxForwardedRef"]);
						return [t.context, e, n];
					}
					), [t])
						, c = i[0]
						, s = i[1]
						, u = i[2]
						, p = Object(r.useMemo)((function () {
							return c && c.Consumer && Object(g.isContextConsumer)(o.a.createElement(c.Consumer, null)) ? c : N;
						}
						), [c, N])
						, h = Object(r.useContext)(p)
						, E = Boolean(t.store) && Boolean(t.store.getState) && Boolean(t.store.dispatch);
					Boolean(h) && Boolean(h.store);
					var A = E ? t.store : h.store
						, I = Object(r.useMemo)((function () {
							return function (n) {
								return e(n.dispatch, a);
							}(A);
						}
						), [A])
						, T = Object(r.useMemo)((function () {
							if (!C)
								return b;
							var e = new l(A, E ? null : h.subscription)
								, n = e.notifyNestedSubs.bind(e);
							return [e, n];
						}
						), [A, E, h])
						, P = T[0]
						, O = T[1]
						, _ = Object(r.useMemo)((function () {
							return E ? h : d({}, h, {
								subscription: P
							});
						}
						), [E, h, P])
						, j = Object(r.useReducer)(w, v, S)
						, R = j[0][0]
						, L = j[1];
					if (R && R.error)
						throw R.error;
					var F = Object(r.useRef)()
						, M = Object(r.useRef)(u)
						, U = Object(r.useRef)()
						, D = Object(r.useRef)(!1)
						, z = f((function () {
							return U.current && u === M.current ? U.current : I(A.getState(), u);
						}
						), [A, R, u]);
					y(x, [M, F, D, u, z, U, O]),
						y(k, [C, A, P, I, M, F, D, U, O, L], [A, P, I]);
					var B = Object(r.useMemo)((function () {
						return o.a.createElement(n, d({}, z, {
							ref: s
						}));
					}
					), [s, n, z]);
					return Object(r.useMemo)((function () {
						return C ? o.a.createElement(p.Provider, {
							value: _
						}, B) : B;
					}
					), [p, B, _]);
				}

				var A = s ? o.a.memo(E) : E;
				if (A.WrappedComponent = n,
					A.displayName = E.displayName = i,
					P) {
					var T = o.a.forwardRef((function (e, n) {
						return o.a.createElement(A, d({}, e, {
							reactReduxForwardedRef: n
						}));
					}
					));
					return T.displayName = i,
						T.WrappedComponent = n,
						h()(T, n);
				}
				return h()(A, n);
			};
		}

		function C(e, n) {
			return e === n ? 0 !== e || 0 !== n || 1 / e == 1 / n : e != e && n != n;
		}

		function A(e, n) {
			if (C(e, n))
				return !0;
			if ("object" != typeof e || null === e || "object" != typeof n || null === n)
				return !1;
			var t = Object.keys(e)
				, r = Object.keys(n);
			if (t.length !== r.length)
				return !1;
			for (var o = 0; o < t.length; o++)
				if (!Object.prototype.hasOwnProperty.call(n, t[o]) || !C(e[t[o]], n[t[o]]))
					return !1;
			return !0;
		}

		function I(e) {
			return function (n, t) {
				var r = e(n, t);

				function o() {
					return r;
				}

				return o.dependsOnOwnProps = !1,
					o;
			};
		}

		function T(e) {
			return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps ? Boolean(e.dependsOnOwnProps) : 1 !== e.length;
		}

		function P(e, n) {
			return function (n, t) {
				t.displayName;
				var r = function (e, n) {
					return r.dependsOnOwnProps ? r.mapToProps(e, n) : r.mapToProps(e);
				};
				return r.dependsOnOwnProps = !0,
					r.mapToProps = function (n, t) {
						r.mapToProps = e,
							r.dependsOnOwnProps = T(e);
						var o = r(n, t);
						return "function" == typeof o && (r.mapToProps = o,
							r.dependsOnOwnProps = T(o),
							o = r(n, t)),
							o;
					}
					,
					r;
			};
		}

		var O = [function (e) {
			return "function" == typeof e ? P(e) : void 0;
		}
			, function (e) {
				return e ? void 0 : I((function (e) {
					return {
						dispatch: e
					};
				}
				));
			}
			, function (e) {
				return e && "object" == typeof e ? I((function (n) {
					return function (e, n) {
						var t = {}
							, r = function (r) {
								var o = e[r];
								"function" == typeof o && (t[r] = function () {
									return n(o.apply(void 0, arguments));
								}
								);
							};
						for (var o in e)
							r(o);
						return t;
					}(e, n);
				}
				)) : void 0;
			}
		];
		var _ = [function (e) {
			return "function" == typeof e ? P(e) : void 0;
		}
			, function (e) {
				return e ? void 0 : I((function () {
					return {};
				}
				));
			}
		];

		function j(e, n, t) {
			return d({}, t, e, n);
		}

		var N = [function (e) {
			return "function" == typeof e ? function (e) {
				return function (n, t) {
					t.displayName;
					var r, o = t.pure, i = t.areMergedPropsEqual, a = !1;
					return function (n, t, c) {
						var s = e(n, t, c);
						return a ? o && i(s, r) || (r = s) : (a = !0,
							r = s),
							r;
					};
				};
			}(e) : void 0;
		}
			, function (e) {
				return e ? void 0 : function () {
					return j;
				};
			}
		];

		function R(e, n, t, r) {
			return function (o, i) {
				return t(e(o, i), n(r, i), i);
			};
		}

		function L(e, n, t, r, o) {
			var i, a, c, s, l, u = o.areStatesEqual, f = o.areOwnPropsEqual, d = o.areStatePropsEqual, m = !1;

			function p(o, m) {
				var p, h, g = !f(m, a), v = !u(o, i);
				return i = o,
					a = m,
					g && v ? (c = e(i, a),
						n.dependsOnOwnProps && (s = n(r, a)),
						l = t(c, s, a)) : g ? (e.dependsOnOwnProps && (c = e(i, a)),
							n.dependsOnOwnProps && (s = n(r, a)),
							l = t(c, s, a)) : v ? (p = e(i, a),
								h = !d(p, c),
								c = p,
								h && (l = t(c, s, a)),
								l) : l;
			}

			return function (o, u) {
				return m ? p(o, u) : (c = e(i = o, a = u),
					s = n(r, a),
					l = t(c, s, a),
					m = !0,
					l);
			};
		}

		function F(e, n) {
			var t = n.initMapStateToProps
				, r = n.initMapDispatchToProps
				, o = n.initMergeProps
				, i = m(n, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"])
				, a = t(e, i)
				, c = r(e, i)
				, s = o(e, i);
			return (i.pure ? L : R)(a, c, s, e, i);
		}

		function M(e, n, t) {
			for (var r = n.length - 1; r >= 0; r--) {
				var o = n[r](e);
				if (o)
					return o;
			}
			return function (n, r) {
				throw new Error("Invalid value of type " + typeof e + " for " + t + " argument when connecting component " + r.wrappedComponentName + ".");
			};
		}

		function U(e, n) {
			return e === n;
		}

		function D(e) {
			var n = void 0 === e ? {} : e
				, t = n.connectHOC
				, r = void 0 === t ? E : t
				, o = n.mapStateToPropsFactories
				, i = void 0 === o ? _ : o
				, a = n.mapDispatchToPropsFactories
				, c = void 0 === a ? O : a
				, s = n.mergePropsFactories
				, l = void 0 === s ? N : s
				, u = n.selectorFactory
				, f = void 0 === u ? F : u;
			return function (e, n, t, o) {
				void 0 === o && (o = {});
				var a = o
					, s = a.pure
					, u = void 0 === s || s
					, p = a.areStatesEqual
					, h = void 0 === p ? U : p
					, g = a.areOwnPropsEqual
					, v = void 0 === g ? A : g
					, b = a.areStatePropsEqual
					, w = void 0 === b ? A : b
					, y = a.areMergedPropsEqual
					, x = void 0 === y ? A : y
					,
					k = m(a, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"])
					, S = M(e, i, "mapStateToProps")
					, E = M(n, c, "mapDispatchToProps")
					, C = M(t, l, "mergeProps");
				return r(f, d({
					methodName: "connect",
					getDisplayName: function (e) {
						return "Connect(" + e + ")";
					},
					shouldHandleStateChanges: Boolean(e),
					initMapStateToProps: S,
					initMapDispatchToProps: E,
					initMergeProps: C,
					pure: u,
					areStatesEqual: h,
					areOwnPropsEqual: v,
					areStatePropsEqual: w,
					areMergedPropsEqual: x
				}, k));
			};
		}

		var z = D();
		var B, H = t(16);
		B = H.unstable_batchedUpdates,
			a = B;
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return h;
		}
		)),
			t.d(n, "b", (function () {
				return g;
			}
			)),
			t.d(n, "c", (function () {
				return v;
			}
			));
		var r = t(21)
			, o = function () {
				function e(e) {
					this.observer = e,
						this.closed = !1;
				}

				return e.prototype.next = function (e) {
					var n, t;
					this.closed || null === (t = (n = this.observer).next) || void 0 === t || t.call(n, e);
				}
					,
					e.prototype.error = function (e) {
						var n, t;
						this.closed || (this.closed = !0,
							null === (t = (n = this.observer).error) || void 0 === t || t.call(n, e));
					}
					,
					e.prototype.complete = function () {
						var e, n;
						this.closed || (this.closed = !0,
							null === (n = (e = this.observer).complete) || void 0 === n || n.call(e));
					}
					,
					e;
			}()
			, i = function () {
				function e(e, n) {
					this.observer = new o(e),
						n && (this.cleanup = n(this.observer));
				}

				return e.prototype.unsubscribe = function () {
					this.observer.closed || (this.observer.closed = !0,
						this.cleanup && this.cleanup());
				}
					,
					Object.defineProperty(e.prototype, "closed", {
						get: function () {
							return this.observer.closed;
						},
						enumerable: !1,
						configurable: !0
					}),
					e;
			}()
			, a = function () {
				function e(e) {
					this._subscribe = e;
				}

				return e.prototype.subscribe = function (e, n, t) {
					return new i("object" == typeof e ? e : {
						next: e,
						error: n,
						complete: t
					}, this._subscribe);
				}
					,
					e;
			}()
			, c = Promise.resolve();

		function s(e) {
			c.then(e);
		}

		var l, u = (l = function (e, n) {
			return (l = Object.setPrototypeOf || {
				__proto__: []
			} instanceof Array && function (e, n) {
				e.__proto__ = n;
			}
				|| function (e, n) {
					for (var t in n)
						Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
				}
			)(e, n);
		}
			,
			function (e, n) {
				if ("function" != typeof n && null !== n)
					throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");

				function t() {
					this.constructor = e;
				}

				l(e, n),
					e.prototype = null === n ? Object.create(n) : (t.prototype = n.prototype,
						new t);
			}
		), f = function (e) {
			function n() {
				var n = e.call(this, (function (e) {
					return n.checkStatus(),
						n.observers.add(e),
						function () {
							return n.observers.delete(e);
						};
				}
				)) || this;
				return n.closed = !1,
					n.observers = new Set,
					n;
			}

			return u(n, e),
				n.prototype.next = function (e) {
					this.checkStatus();
					var n = this.copyObservers();
					s((function () {
						return n.forEach((function (n) {
							return d((function () {
								return n.next(e);
							}
							));
						}
						));
					}
					));
				}
				,
				n.prototype.error = function (e) {
					this.checkStatus(),
						this.closed = !0;
					var n = this.copyObservers();
					this.observers.clear(),
						s((function () {
							return n.forEach((function (n) {
								return d((function () {
									return n.error(e);
								}
								));
							}
							));
						}
						));
				}
				,
				n.prototype.complete = function () {
					this.checkStatus(),
						this.closed = !0;
					var e = this.copyObservers();
					this.observers.clear(),
						s((function () {
							return e.forEach((function (e) {
								return d((function () {
									return e.complete();
								}
								));
							}
							));
						}
						));
				}
				,
				n.prototype.checkStatus = function () {
					if (this.closed)
						throw new Error("The subject has been closed.");
				}
				,
				n.prototype.copyObservers = function () {
					return Array.from(this.observers);
				}
				,
				n;
		}(a);

		function d(e) {
			try {
				e();
			} catch (e) {
			}
		}

		var m = function () {
			var e = function (n, t) {
				return (e = Object.setPrototypeOf || {
					__proto__: []
				} instanceof Array && function (e, n) {
					e.__proto__ = n;
				}
					|| function (e, n) {
						for (var t in n)
							Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
					}
				)(n, t);
			};
			return function (n, t) {
				if ("function" != typeof t && null !== t)
					throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");

				function r() {
					this.constructor = n;
				}

				e(n, t),
					n.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
						new r);
			};
		}()
			, p = function (e) {
				function n() {
					var n = e.call(this) || this;
					n.isInit = !1;
					var t = n._subscribe;
					return n._subscribe = function (e) {
						var r = t(e);
						if (n.isInit) {
							var o = n.value;
							s((function () {
								return e.next(o);
							}
							));
						}
						return r;
					}
						,
						n;
				}

				return m(n, e),
					n.prototype.next = function (n) {
						e.prototype.next.call(this, n),
							this.isInit = !0,
							this.value = n;
					}
					,
					n.prototype.error = function (n) {
						e.prototype.error.call(this, n),
							this.value = void 0;
					}
					,
					n.prototype.complete = function () {
						e.prototype.complete.call(this),
							this.value = void 0;
					}
					,
					n;
			}(f)
			, h = {
				locale: new r.a,
				user: new r.a,
				regions: new r.a,
				globalConfig: new r.a,
				samlDatas: new r.a,
				actions: new r.a,
				projectActions: new r.a
			}
			, g = {
				links: new p,
				endpoints: new p,
				collectedEndpoints: new p,
				safeArea: new p
			}
			, v = {
				isRegionDisplay: new p,
				isDisplayAllRegions: new p,
				isChangeRegionReload: new p,
				selectedRegionId: new p,
				currentService: new p,
				activeMenu: new p,
				isSidebarDisplay: new p,
				isMainMenuDisplay: new p,
				isLanguageSwitchDisplay: new p,
				isCheckMoLicense: new p
			};
		var b = t(45)
			, w = Object.keys(g).reduce((function (e, n) {
				var t;
				return e[n] = (t = g[n],
					new a((function (e) {
						var n = t.subscribe(e);
						return function () {
							return n.unsubscribe();
						};
					}
					))),
					e;
			}
			), {})
			, y = Object.freeze({
				version: "2.0",
				getLocale: function () {
					return h.locale.promise;
				},
				getUser: function () {
					return h.user.promise;
				},
				getRegions: function () {
					return h.regions.promise;
				},
				getGlobalConfig: function () {
					return h.globalConfig.promise;
				},
				getSamlDatas: function () {
					return h.samlDatas.promise;
				},
				getActions: function () {
					return h.actions.promise;
				},
				getProjectActions: function () {
					return h.projectActions.promise;
				},
				getRegionLinks: function (e) {
					return b.a.getRegionLinks(e);
				},
				getLinks$: function () {
					return w.links;
				},
				getEndpoints$: function () {
					return w.endpoints;
				},
				getCollectedEndpoints$: function () {
					return w.collectedEndpoints;
				},
				getSafeArea$: function () {
					return w.safeArea;
				},
				isRegionDisplay$: function () {
					return v.isRegionDisplay;
				},
				isDisplayAllRegions$: function () {
					return v.isDisplayAllRegions;
				},
				isChangeRegionReload$: function () {
					return v.isChangeRegionReload;
				},
				getSelectedRegionId$: function () {
					return v.selectedRegionId;
				},
				getCurrentService$: function () {
					return v.currentService;
				},
				activeMenu$: function () {
					return v.activeMenu;
				},
				isSidebarDisplay$: function () {
					return v.isSidebarDisplay;
				},
				isMainMenuDisplay$: function () {
					return v.isMainMenuDisplay;
				},
				isLanguageSwitchDisplay$: function () {
					return v.isLanguageSwitchDisplay;
				},
				isCheckMoLicense$: function () {
					return v.isCheckMoLicense;
				}
			});
		Object.defineProperty(window, "getMoCfContext", {
			value: function () {
				return y;
			},
			writable: !1
		});
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return r;
		}
		));
		var r = function () {
			function e() {
			}

			return e.htmlEncodeByRegExp = function (e) {
				return 0 === e.length ? "" : ("" + e).replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/ /g, " ").replace(/\'/g, "&#39").replace(/\"/g, "\"").replace(/\//g, "&#x2F;");
			}
				,
				e.htmlDecodeByRegExp = function (e) {
					return 0 === e.length ? "" : ("" + e).replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/ /g, " ").replace(/&#39/g, "'").replace(/"/g, "\"").replace(/&#x2F;/g, "/");
				}
				,
				e.encodeForHTMLAttribute = function (e) {
					for (var n = "", t = 0; t < e.length; t++) {
						var r = e[t]
							, o = e[t];
						!/[A-Za-z0-9]/.test(e[t]) && e.charCodeAt(t) < 256 && (o = "&#x" + r.charCodeAt(0).toString(16) + ";"),
							n += o;
					}
					return n;
				}
				,
				e.encodeForJavascript = function (e) {
					for (var n = "", t = 0; t < e.length; t++) {
						var r = e[t]
							, o = e[t];
						!/[A-Za-z0-9]/.test(e[t]) && e.charCodeAt(t) < 256 && (o = "\\x" + r.charCodeAt(0).toString(16)),
							n += o;
					}
					return n;
				}
				,
				e.encodeForURL = function (e) {
					return encodeURIComponent(e);
				}
				,
				e.encodeForCSS = function (e) {
					for (var n = "", t = 0; t < e.length; t++) {
						var r = e.charAt(t);
						if (r.match(/[a-zA-Z0-9]/))
							n += r;
						else {
							var o = e.charCodeAt(t).toString(16);
							n += "\\" + "000000".substr(o.length) + o;
						}
					}
					return n;
				}
				,
				e.xssEncode = function (e) {
					return null !== e && (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/<script>(.*?)<\/script>/i, "...")).replace(/src[\r\n]*=[\r\n]*\'(.*?)\'/i, "...")).replace(/src[\r\n]*=[\r\n]*\"(.*?)\"/i, "...")).replace(/<\/script>/i, "...")).replace(/<script(.*?)>/i, "...")).replace(/eval\((.*?)\)/i, "...")).replace(/expression\((.*?)\)/i, "...")).replace(/javascript:/i, "...")).replace(/vbscript:/i, "...")).replace(/onload(.*?)=/i, "...")).replace(/onclick(.*?)=/i, "...")).replace(/onerror(.*?)=/i, "...")),
						e;
				}
				,
				e;
		}();
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return o;
		}
		));
		var r = t(39);

		function o(e) {
			return void 0 === e && (e = !1),
				r.a.getUser(e);
		}
	}
	, function (e, n, t) {
		"use strict";

		function r(e) {
			return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
		}

		var o = "function" == typeof Symbol && Symbol.observable || "@@observable"
			, i = function () {
				return Math.random().toString(36).substring(7).split("").join(".");
			}
			, a = {
				INIT: "@@redux/INIT" + i(),
				REPLACE: "@@redux/REPLACE" + i(),
				PROBE_UNKNOWN_ACTION: function () {
					return "@@redux/PROBE_UNKNOWN_ACTION" + i();
				}
			};

		function c(e) {
			if ("object" != typeof e || null === e)
				return !1;
			for (var n = e; null !== Object.getPrototypeOf(n);)
				n = Object.getPrototypeOf(n);
			return Object.getPrototypeOf(e) === n;
		}

		var s, l = function () {
			return (l = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, u = {
			username: ""
		}, f = function (e, n) {
			void 0 === e && (e = u);
			var t = n.type
				, r = n.payload;
			switch (t) {
				case "UPDATE_USER_ALL":
					return l(l({}, e), r);
				default:
					return e;
			}
		}, d = function () {
			return (d = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, m = {
			links: {},
			tempLinks: []
		}, p = "links", h = function (e, n) {
			void 0 === e && (e = m);
			var t = n.type
				, r = n.payload;
			switch (t) {
				case "UPDATE_LINKS_ALL":
					return d(d({}, e), r);
				default:
					return e;
			}
		}, g = function () {
			return (g = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, v = {
			hasExpandServiceList: !1,
			isInDrag: !1
		}, b = "area", w = function (e, n) {
			void 0 === e && (e = v);
			var t = n.type
				, r = n.payload;
			switch (t) {
				case "UPDATE_AREA_ALL":
					return g(g({}, e), r);
				case "UPDATE_SERVICE_LIST_EXPAND":
					return g(g({}, e), {
						hasExpandServiceList: r.hasExpandServiceList
					});
				case "UPDATE_DRAG_MODE":
					return g(g({}, e), {
						isInDrag: r.isInDrag
					});
				default:
					return e;
			}
		}, y = function () {
			return (y = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, x = {
			serviceEndpointList: [],
			serviceEndpoints: [],
			endpointCollects: []
		}, k = "endpoint", S = function (e, n) {
			void 0 === e && (e = x);
			var t = n.type
				, r = n.payload;
			switch (t) {
				case "UPDATE_ENDPOINT_ALL":
					var o = r
						, i = o.endpoints
						, a = i.homeEndpoint
						, c = i.serviceEndpointList
						, s = i.serviceEndpoints
						, l = o.endpointCollects;
					return y(y({}, e), {
						homeEndpoint: a,
						serviceEndpointList: c,
						serviceEndpoints: s,
						endpointCollects: l
					});
				case "UPDATE_HOME_ENDPOINT":
					return y(y({}, e), {
						homeEndpoint: r.homeEndpoint
					});
				case "UPDATE_SERVICE_ENDPOINT_LIST":
					return y(y({}, e), {
						serviceEndpointList: r.serviceEndpointList
					});
				case "UPDATE_SERVICE_ENDPOINTS":
					return y(y({}, e), {
						serviceEndpoints: r.serviceEndpoints
					});
				case "UPDATE_COLLECTED_ENDPOINT":
					var u = r.endpointCollects.map((function (e) {
						var n = e.id
							, t = {
								endpointId: e.endpointId || n || "",
								shortName: e.shortName,
								endpoint: e.endpoint,
								name: e.name,
								serviceCss: e.serviceCss,
								serviceIcon: e.serviceIcon,
								visible: e.visible,
								collectType: e.collectType
							};
						return Object.prototype.hasOwnProperty.call(e, "defaultFavorite") && Object.assign(t, {
							defaultFavorite: e.defaultFavorite
						}),
							t;
					}
					));
					return y(y({}, e), {
						endpointCollects: u
					});
				default:
					return e;
			}
		}, E = function () {
			return (E = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, C = {
			selectRegionId: "",
			regionName: "",
			region: {},
			regions: [],
			supportRegions: []
		}, A = "region", I = function (e, n) {
			void 0 === e && (e = C);
			var t = n.type
				, r = n.payload;
			switch (t) {
				case "UPDATE_REGION_ALL":
					return E(E({}, e), r);
				case "UPDATE_SELECT_REGION":
					return E(E({}, e), {
						region: r.region
					});
				case "UPDATE_SELECT_REGION_ID":
					return E(E({}, e), {
						selectRegionId: r.selectRegionId
					});
				default:
					return e;
			}
		}, T = function () {
			return (T = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, P = {
			top: 50,
			right: 0,
			bottom: 0,
			left: 48
		}, O = "safearea", _ = function (e, n) {
			void 0 === e && (e = P);
			var t = n.type
				, r = n.payload;
			switch (t) {
				case "UPDATE_SAFEAREA":
					return T(T({}, e), r);
				default:
					return e;
			}
		}, j = function () {
			return (j = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, N = {
			licenseStatus: {}
		}, R = "license", L = function (e, n) {
			void 0 === e && (e = N);
			var t = n.type
				, r = n.payload;
			switch (t) {
				case "UPDATE_LICENSE_ALL":
					return j(j({}, e), r);
				default:
					return e;
			}
		}, F = function () {
			return (F = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, M = {
			currentRegion: "",
			currentProject: ""
		}, U = "cookieCache", D = function (e, n) {
			void 0 === e && (e = M);
			var t = n.type
				, r = n.payload;
			switch (t) {
				case "UPDATE_CURRENT_REGION":
					return F(F({}, e), {
						currentRegion: r.currentRegion
					});
				case "UPDATE_CURRENT_PROJECT":
					return F(F({}, e), {
						currentProject: r.currentProject
					});
				default:
					return e;
			}
		}, z = function () {
			return (z = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, B = {
			resourceManagerEndpoints: [],
			moScale: "",
			workScene: "",
			scenario: "",
			showVDCService: !1,
			gotoServiceConsole: !0,
			extProjectsProjectsRoles: [],
			showHuaweicloudConsole: !1,
			manageOneOnline: !1
		}, H = "globalConfig", W = function (e, n) {
			void 0 === e && (e = B);
			var t = n.type
				, r = n.payload;
			switch (t) {
				case "UPDATE_CURRENT_GLOBALCONFIG":
					return z(z({}, e), r);
				default:
					return e;
			}
		}, V = function e(n, t, i) {
			var s;
			if ("function" == typeof t && "function" == typeof i || "function" == typeof i && "function" == typeof arguments[3])
				throw new Error(r(0));
			if ("function" == typeof t && void 0 === i && (i = t,
				t = void 0),
				void 0 !== i) {
				if ("function" != typeof i)
					throw new Error(r(1));
				return i(e)(n, t);
			}
			if ("function" != typeof n)
				throw new Error(r(2));
			var l = n
				, u = t
				, f = []
				, d = f
				, m = !1;

			function p() {
				d === f && (d = f.slice());
			}

			function h() {
				if (m)
					throw new Error(r(3));
				return u;
			}

			function g(e) {
				if ("function" != typeof e)
					throw new Error(r(4));
				if (m)
					throw new Error(r(5));
				var n = !0;
				return p(),
					d.push(e),
					function () {
						if (n) {
							if (m)
								throw new Error(r(6));
							n = !1,
								p();
							var t = d.indexOf(e);
							d.splice(t, 1),
								f = null;
						}
					};
			}

			function v(e) {
				if (!c(e))
					throw new Error(r(7));
				if (void 0 === e.type)
					throw new Error(r(8));
				if (m)
					throw new Error(r(9));
				try {
					m = !0,
						u = l(u, e);
				} finally {
					m = !1;
				}
				for (var n = f = d, t = 0; t < n.length; t++) {
					(0,
						n[t])();
				}
				return e;
			}

			function b(e) {
				if ("function" != typeof e)
					throw new Error(r(10));
				l = e,
					v({
						type: a.REPLACE
					});
			}

			function w() {
				var e, n = g;
				return (e = {
					subscribe: function (e) {
						if ("object" != typeof e || null === e)
							throw new Error(r(11));

						function t() {
							e.next && e.next(h());
						}

						return t(),
						{
							unsubscribe: n(t)
						};
					}
				})[o] = function () {
					return this;
				}
					,
					e;
			}

			return v({
				type: a.INIT
			}),
				(s = {
					dispatch: v,
					subscribe: g,
					getState: h,
					replaceReducer: b
				})[o] = w,
				s;
		}(function (e) {
			for (var n = Object.keys(e), t = {}, o = 0; o < n.length; o++) {
				var i = n[o];
				0,
					"function" == typeof e[i] && (t[i] = e[i]);
			}
			var c, s = Object.keys(t);
			try {
				!function (e) {
					Object.keys(e).forEach((function (n) {
						var t = e[n];
						if (void 0 === t(void 0, {
							type: a.INIT
						}))
							throw new Error(r(12));
						if (void 0 === t(void 0, {
							type: a.PROBE_UNKNOWN_ACTION()
						}))
							throw new Error(r(13));
					}
					));
				}(t);
			} catch (e) {
				c = e;
			}
			return function (e, n) {
				if (void 0 === e && (e = {}),
					c)
					throw c;
				for (var o = !1, i = {}, a = 0; a < s.length; a++) {
					var l = s[a]
						, u = t[l]
						, f = e[l]
						, d = u(f, n);
					if (void 0 === d) {
						n && n.type;
						throw new Error(r(14));
					}
					i[l] = d,
						o = o || d !== f;
				}
				return (o = o || s.length !== Object.keys(e).length) ? i : e;
			};
		}(((s = {})["user"] = f,
			s[p] = h,
			s[b] = w,
			s[k] = S,
			s[A] = I,
			s[O] = _,
			s[R] = L,
			s[U] = D,
			s[H] = W,
			s)));
		n.a = V;
	}
	, function (e, n, t) {
		"use strict";
		var r = t(60)
			, o = Object.prototype.toString;

		function i(e) {
			return "[object Array]" === o.call(e);
		}

		function a(e) {
			return void 0 === e;
		}

		function c(e) {
			return null !== e && "object" == typeof e;
		}

		function s(e) {
			if ("[object Object]" !== o.call(e))
				return !1;
			var n = Object.getPrototypeOf(e);
			return null === n || n === Object.prototype;
		}

		function l(e) {
			return "[object Function]" === o.call(e);
		}

		function u(e, n) {
			if (null != e)
				if ("object" != typeof e && (e = [e]),
					i(e))
					for (var t = 0, r = e.length; t < r; t++)
						n.call(null, e[t], t, e);
				else
					for (var o in e)
						Object.prototype.hasOwnProperty.call(e, o) && n.call(null, e[o], o, e);
		}

		e.exports = {
			isArray: i,
			isArrayBuffer: function (e) {
				return "[object ArrayBuffer]" === o.call(e);
			},
			isBuffer: function (e) {
				return null !== e && !a(e) && null !== e.constructor && !a(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
			},
			isFormData: function (e) {
				return "undefined" != typeof FormData && e instanceof FormData;
			},
			isArrayBufferView: function (e) {
				return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
			},
			isString: function (e) {
				return "string" == typeof e;
			},
			isNumber: function (e) {
				return "number" == typeof e;
			},
			isObject: c,
			isPlainObject: s,
			isUndefined: a,
			isDate: function (e) {
				return "[object Date]" === o.call(e);
			},
			isFile: function (e) {
				return "[object File]" === o.call(e);
			},
			isBlob: function (e) {
				return "[object Blob]" === o.call(e);
			},
			isFunction: l,
			isStream: function (e) {
				return c(e) && l(e.pipe);
			},
			isURLSearchParams: function (e) {
				return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;
			},
			isStandardBrowserEnv: function () {
				return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && ("undefined" != typeof window && "undefined" != typeof document);
			},
			forEach: u,
			merge: function e() {
				var n = {};

				function t(t, r) {
					s(n[r]) && s(t) ? n[r] = e(n[r], t) : s(t) ? n[r] = e({}, t) : i(t) ? n[r] = t.slice() : n[r] = t;
				}

				for (var r = 0, o = arguments.length; r < o; r++)
					u(arguments[r], t);
				return n;
			},
			extend: function (e, n, t) {
				return u(n, (function (n, o) {
					e[o] = t && "function" == typeof n ? r(n, t) : n;
				}
				)),
					e;
			},
			trim: function (e) {
				return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
			},
			stripBOM: function (e) {
				return 65279 === e.charCodeAt(0) && (e = e.slice(1)),
					e;
			}
		};
	}
	, function (e, n) {
		function t(n) {
			return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? (e.exports = t = function (e) {
				return typeof e;
			}
				,
				e.exports.default = e.exports,
				e.exports.__esModule = !0) : (e.exports = t = function (e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
				}
					,
					e.exports.default = e.exports,
					e.exports.__esModule = !0),
				t(n);
		}

		e.exports = t,
			e.exports.default = e.exports,
			e.exports.__esModule = !0;
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(128);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(139);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";
		!function e() {
			if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) {
				0;
				try {
					__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
				} catch (e) {
					console.error(e);
				}
			}
		}(),
			e.exports = t(96);
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "c", (function () {
			return y;
		}
		)),
			t.d(n, "b", (function () {
				return x;
			}
			)),
			t.d(n, "a", (function () {
				return k;
			}
			));
		var r = function () {
			function e(e) {
				this.locale = e.locale,
					this.configSet = e.configSet,
					this.config = this.configSet[this.locale] || {};
			}

			return e.prototype.get = function (e) {
				return this.config[e.id] || e.defaultValue;
			}
				,
				e.prototype.select = function (e) {
					return "[object Object]" === Object.prototype.toString.call(e) ? e[this.locale] : e;
				}
				,
				e;
		}();
		var o, i = t(31), a = t(3), c = t(4), s = function () {
			function e() {
			}

			return e.getLoginConfig = function () {
				var e = {
					url: a.a.getAppWebPath() + "/rest/momaintenance/custom/login",
					timeout: 6e4
				};
				return c.a.get(e);
			}
				,
				e;
		}(), l = t(8), u = t(11), f = function () {
			return (f = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, d = function (e, n, t, r) {
			return new (t || (t = Promise))((function (o, i) {
				function a(e) {
					try {
						s(r.next(e));
					} catch (e) {
						i(e);
					}
				}

				function c(e) {
					try {
						s(r.throw(e));
					} catch (e) {
						i(e);
					}
				}

				function s(e) {
					var n;
					e.done ? o(e.value) : (n = e.value,
						n instanceof t ? n : new t((function (e) {
							e(n);
						}
						))).then(a, c);
				}

				s((r = r.apply(e, n || [])).next());
			}
			));
		}, m = function (e, n) {
			var t, r, o, i, a = {
				label: 0,
				sent: function () {
					if (1 & o[0])
						throw o[1];
					return o[1];
				},
				trys: [],
				ops: []
			};
			return i = {
				next: c(0),
				throw: c(1),
				return: c(2)
			},
				"function" == typeof Symbol && (i[Symbol.iterator] = function () {
					return this;
				}
				),
				i;

			function c(i) {
				return function (c) {
					return function (i) {
						if (t)
							throw new TypeError("Generator is already executing.");
						for (; a;)
							try {
								if (t = 1,
									r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
										0) : r.next) && !(o = o.call(r, i[1])).done)
									return o;
								switch (r = 0,
								o && (i = [2 & i[0], o.value]),
								i[0]) {
									case 0:
									case 1:
										o = i;
										break;
									case 4:
										return a.label++,
										{
											value: i[1],
											done: !1
										};
									case 5:
										a.label++,
											r = i[1],
											i = [0];
										continue;
									case 7:
										i = a.ops.pop(),
											a.trys.pop();
										continue;
									default:
										if (!(o = a.trys,
											(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
											a = 0;
											continue;
										}
										if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
											a.label = i[1];
											break;
										}
										if (6 === i[0] && a.label < o[1]) {
											a.label = o[1],
												o = i;
											break;
										}
										if (o && a.label < o[2]) {
											a.label = o[2],
												a.ops.push(i);
											break;
										}
										o[2] && a.ops.pop(),
											a.trys.pop();
										continue;
								}
								i = n.call(e, a);
							} catch (e) {
								i = [6, e],
									r = 0;
							} finally {
								t = o = 0;
							}
						if (5 & i[0])
							throw i[1];
						return {
							value: i[0] ? i[1] : void 0,
							done: !0
						};
					}([i, c]);
				};
			}
		}, p = function (e, n) {
			var t = "function" == typeof Symbol && e[Symbol.iterator];
			if (!t)
				return e;
			var r, o, i = t.call(e), a = [];
			try {
				for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
					a.push(r.value);
			} catch (e) {
				o = {
					error: e
				};
			} finally {
				try {
					r && !r.done && (t = i.return) && t.call(i);
				} finally {
					if (o)
						throw o.error;
				}
			}
			return a;
		};

		function h(e) {
			return c.a.get({
				url: e
			}).then((function (n) {
				e.substring(e.lastIndexOf("/") + 1);
				try {
					return n ? Promise.resolve(n) : Promise.reject();
				} catch (e) {
					return Promise.reject();
				}
			}
			));
		}

		function g(e) {
			return d(this, void 0, void 0, (function () {
				var n, t;
				return m(this, (function (r) {
					switch (r.label) {
						case 0:
							return [4, h(e.baseURI + "/globalConfig.json").catch((function () {
							}
							))];
						case 1:
							return (n = r.sent()).manageOneOnline && (t = n.manageOneOnline.toLowerCase(),
								n.manageOneOnline = "online" === t),
								l.a.globalConfig.resolve(n),
								u.a.dispatch({
									type: "UPDATE_CURRENT_GLOBALCONFIG",
									payload: n
								}),
								[2, n];
					}
				}
				));
			}
			));
		}

		function v(e) {
			return h(e.manageOneOnline ? e.baseURI + "/online_schema.json" : e.baseURI + "/schema.json").catch((function () {
				return {
					global: {},
					schemas: {}
				};
			}
			));
		}

		function b(e) {
			return h(e.baseURI + "/i18n/" + e.locale + ".json");
		}

		function w(e, n) {
			if (n)
				return f(f({}, n), {
					global: e
				});
		}

		function y(e) {
			return d(this, void 0, void 0, (function () {
				var n;
				return m(this, (function (i) {
					switch (i.label) {
						case 0:
							return [4, g(e)];
						case 1:
							return n = i.sent(),
								e.manageOneOnline = n.manageOneOnline,
								[2, (a = e,
									Promise.all([v(a), b(a), Promise.resolve().then(t.bind(null, 142))])).then((function (n) {
										var t, i, a, c, s = p(n, 3), l = s[0], u = s[1], f = s[2];
										return l.global.supportedLanguages = e.supportedLocales,
											o = {
												intl: (c = {
													locale: e.locale,
													configSet: u
												},
													new r(c)),
												isGotoConsole: l.global.gotoServiceConsolePage,
												schemas: {
													header: w(l.global, null === (t = null == l ? void 0 : l.schemas) || void 0 === t ? void 0 : t.header),
													sidebar: w(l.global, null === (i = null == l ? void 0 : l.schemas) || void 0 === i ? void 0 : i.sidebar),
													floatLayer: w(l.global, null === (a = null == l ? void 0 : l.schemas) || void 0 === a ? void 0 : a.floatLayer),
													plugins: l.plugins
												},
												moduleConfig: f
											};
									}
									))];
					}
					var a;
				}
				));
			}
			));
		}

		function x() {
			return o;
		}

		function k(e) {
			return d(this, void 0, void 0, (function () {
				var n, t, r, o;
				return m(this, (function (c) {
					switch (c.label) {
						case 0:
							n = [],
								t = [],
								c.label = 1;
						case 1:
							return c.trys.push([1, 3, , 4]),
								[4, s.getLoginConfig()];
						case 2:
							return r = c.sent(),
								[3, 4];
						case 3:
							return c.sent(),
								r = {},
								[3, 4];
						case 4:
							return "true" == r.languageZh && (n.push({
								locale: "zh-cn",
								displayName: "中文（简体）"
							}),
								t.push("zh-cn")),
								"true" == r.languageEn && (n.push({
									locale: "en-us",
									displayName: "English"
								}),
									t.push("en-us")),
								n && 0 !== n.length || (n.push({
									locale: "zh-cn",
									displayName: "中文（简体）"
								}, {
									locale: "en-us",
									displayName: "English"
								}),
									t.push("zh-cn", "en-us")),
								a.a.setSupportLanguage(t),
								o = Object(i.b)(n),
								l.a.locale.resolve(o),
								Object(i.c)(),
								[2, {
									locale: o,
									baseURI: e,
									supportedLocales: n
								}];
					}
				}
				));
			}
			));
		}
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "c", (function () {
			return m;
		}
		)),
			t.d(n, "b", (function () {
				return v;
			}
			)),
			t.d(n, "a", (function () {
				return b;
			}
			));
		var r, o, i = t(4), a = t(3), c = function (e, n, t, r) {
			return new (t || (t = Promise))((function (o, i) {
				function a(e) {
					try {
						s(r.next(e));
					} catch (e) {
						i(e);
					}
				}

				function c(e) {
					try {
						s(r.throw(e));
					} catch (e) {
						i(e);
					}
				}

				function s(e) {
					var n;
					e.done ? o(e.value) : (n = e.value,
						n instanceof t ? n : new t((function (e) {
							e(n);
						}
						))).then(a, c);
				}

				s((r = r.apply(e, n || [])).next());
			}
			));
		}, s = function (e, n) {
			var t, r, o, i, a = {
				label: 0,
				sent: function () {
					if (1 & o[0])
						throw o[1];
					return o[1];
				},
				trys: [],
				ops: []
			};
			return i = {
				next: c(0),
				throw: c(1),
				return: c(2)
			},
				"function" == typeof Symbol && (i[Symbol.iterator] = function () {
					return this;
				}
				),
				i;

			function c(i) {
				return function (c) {
					return function (i) {
						if (t)
							throw new TypeError("Generator is already executing.");
						for (; a;)
							try {
								if (t = 1,
									r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
										0) : r.next) && !(o = o.call(r, i[1])).done)
									return o;
								switch (r = 0,
								o && (i = [2 & i[0], o.value]),
								i[0]) {
									case 0:
									case 1:
										o = i;
										break;
									case 4:
										return a.label++,
										{
											value: i[1],
											done: !1
										};
									case 5:
										a.label++,
											r = i[1],
											i = [0];
										continue;
									case 7:
										i = a.ops.pop(),
											a.trys.pop();
										continue;
									default:
										if (!(o = a.trys,
											(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
											a = 0;
											continue;
										}
										if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
											a.label = i[1];
											break;
										}
										if (6 === i[0] && a.label < o[1]) {
											a.label = o[1],
												o = i;
											break;
										}
										if (o && a.label < o[2]) {
											a.label = o[2],
												a.ops.push(i);
											break;
										}
										o[2] && a.ops.pop(),
											a.trys.pop();
										continue;
								}
								i = n.call(e, a);
							} catch (e) {
								i = [6, e],
									r = 0;
							} finally {
								t = o = 0;
							}
						if (5 & i[0])
							throw i[1];
						return {
							value: i[0] ? i[1] : void 0,
							done: !0
						};
					}([i, c]);
				};
			}
		}, l = function () {
			function e() {
			}

			return e.getActionsRequest = function (e, n) {
				var t = {
					url: {
						s: a.a.getAppWebPath() + "/goku/rest/vdc/v3.0/PAP/user/{user_id}/actions",
						o: {
							user_id: e
						}
					},
					timeout: 6e4
				};
				return n && (t.params = {
					isProjectAction: !0
				}),
					i.a.get(t);
			}
				,
				e.getActions = function (e) {
					return c(this, void 0, void 0, (function () {
						return s(this, (function (n) {
							switch (n.label) {
								case 0:
									return this.actions ? [3, 2] : [4, this.initActions(e).catch((function () {
										return [];
									}
									))];
								case 1:
									n.sent(),
										n.label = 2;
								case 2:
									return [2, this.actions];
							}
						}
						));
					}
					));
				}
				,
				e.initActions = function (n) {
					return c(this, void 0, void 0, (function () {
						var t, r, o;
						return s(this, (function (i) {
							switch (i.label) {
								case 0:
									e.actionsPromise || (e.actionsPromise = e.getActionsRequest(n)),
										i.label = 1;
								case 1:
									return i.trys.push([1, 3, , 4]),
										[4, e.actionsPromise];
								case 2:
									return t = i.sent(),
										r = (null == t ? void 0 : t.actions) || [],
										o = [],
										r.length && (o = r.map((function (e) {
											var n = e.actionInfo;
											return {
												name: n.name,
												parent_id: n.parent_id,
												uri_patterns: n.uri_patterns,
												actionType: n.actionType
											};
										}
										))),
										e.actions = o,
										[3, 4];
								case 3:
									return i.sent(),
										e.actions = [],
										[3, 4];
								case 4:
									return [2];
							}
						}
						));
					}
					));
				}
				,
				e.getProjectActions = function (e) {
					return c(this, void 0, void 0, (function () {
						return s(this, (function (n) {
							switch (n.label) {
								case 0:
									return this.projectActions ? [3, 2] : [4, this.initProjectActions(e).catch((function () {
									}
									))];
								case 1:
									n.sent(),
										n.label = 2;
								case 2:
									return [2, this.projectActions];
							}
						}
						));
					}
					));
				}
				,
				e.initProjectActions = function (n) {
					return c(this, void 0, void 0, (function () {
						var t, r;
						return s(this, (function (o) {
							switch (o.label) {
								case 0:
									e.projectActionsPromise || (e.projectActionsPromise = e.getActionsRequest(n, !0)),
										o.label = 1;
								case 1:
									return o.trys.push([1, 3, , 4]),
										[4, e.projectActionsPromise];
								case 2:
									return t = o.sent(),
										r = null == t ? void 0 : t.projectActions,
										e.projectActions = r,
										[3, 4];
								case 3:
									return o.sent(),
										e.projectActions = {
											allowActions: [],
											denyActions: []
										},
										[3, 4];
								case 4:
									return [2];
							}
						}
						));
					}
					));
				}
				,
				e;
		}(), u = t(10), f = function (e, n, t, r) {
			return new (t || (t = Promise))((function (o, i) {
				function a(e) {
					try {
						s(r.next(e));
					} catch (e) {
						i(e);
					}
				}

				function c(e) {
					try {
						s(r.throw(e));
					} catch (e) {
						i(e);
					}
				}

				function s(e) {
					var n;
					e.done ? o(e.value) : (n = e.value,
						n instanceof t ? n : new t((function (e) {
							e(n);
						}
						))).then(a, c);
				}

				s((r = r.apply(e, n || [])).next());
			}
			));
		}, d = function (e, n) {
			var t, r, o, i, a = {
				label: 0,
				sent: function () {
					if (1 & o[0])
						throw o[1];
					return o[1];
				},
				trys: [],
				ops: []
			};
			return i = {
				next: c(0),
				throw: c(1),
				return: c(2)
			},
				"function" == typeof Symbol && (i[Symbol.iterator] = function () {
					return this;
				}
				),
				i;

			function c(i) {
				return function (c) {
					return function (i) {
						if (t)
							throw new TypeError("Generator is already executing.");
						for (; a;)
							try {
								if (t = 1,
									r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
										0) : r.next) && !(o = o.call(r, i[1])).done)
									return o;
								switch (r = 0,
								o && (i = [2 & i[0], o.value]),
								i[0]) {
									case 0:
									case 1:
										o = i;
										break;
									case 4:
										return a.label++,
										{
											value: i[1],
											done: !1
										};
									case 5:
										a.label++,
											r = i[1],
											i = [0];
										continue;
									case 7:
										i = a.ops.pop(),
											a.trys.pop();
										continue;
									default:
										if (!(o = a.trys,
											(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
											a = 0;
											continue;
										}
										if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
											a.label = i[1];
											break;
										}
										if (6 === i[0] && a.label < o[1]) {
											a.label = o[1],
												o = i;
											break;
										}
										if (o && a.label < o[2]) {
											a.label = o[2],
												a.ops.push(i);
											break;
										}
										o[2] && a.ops.pop(),
											a.trys.pop();
										continue;
								}
								i = n.call(e, a);
							} catch (e) {
								i = [6, e],
									r = 0;
							} finally {
								t = o = 0;
							}
						if (5 & i[0])
							throw i[1];
						return {
							value: i[0] ? i[1] : void 0,
							done: !0
						};
					}([i, c]);
				};
			}
		};

		function m(e) {
			return f(this, void 0, void 0, (function () {
				var n, t;
				return d(this, (function (r) {
					switch (r.label) {
						case 0:
							return [4, Object(u.a)()];
						case 1:
							return n = r.sent(),
								t = n.userId,
								n && n.assumedInfo && n.assumedInfo.loginUserAccount && (t = n.assumedInfo.loginUserAccount.id),
								[2, e ? h(t) : p(t)];
					}
				}
				));
			}
			));
		}

		function p(e) {
			return r || (r = l.getActions(e)),
				r;
		}

		function h(e) {
			return o || (o = l.getProjectActions(e)),
				o;
		}

		function g(e, n) {
			return n.map((function (e) {
				return e.name;
			}
			)).includes(e);
		}

		function v(e) {
			return f(this, void 0, void 0, (function () {
				var n;
				return d(this, (function (t) {
					switch (t.label) {
						case 0:
							if (!e)
								return [2, !1];
							t.label = 1;
						case 1:
							return t.trys.push([1, 3, , 4]),
								[4, m()];
						case 2:
							return n = t.sent(),
								[2, g(e, n)];
						case 3:
							return t.sent(),
								[2, !1];
						case 4:
							return [2];
					}
				}
				));
			}
			));
		}

		function b(e) {
			return f(this, void 0, void 0, (function () {
				var n;
				return d(this, (function (t) {
					switch (t.label) {
						case 0:
							if (!e || !e.length)
								return [2, []];
							t.label = 1;
						case 1:
							return t.trys.push([1, 3, , 4]),
								[4, m()];
						case 2:
							return n = t.sent(),
								[2, e.map((function (e) {
									return g(e, n);
								}
								))];
						case 3:
							return t.sent(),
								[2, []];
						case 4:
							return [2];
					}
				}
				));
			}
			));
		}
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(134);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return c;
		}
		)),
			t.d(n, "b", (function () {
				return s;
			}
			));
		var r = t(0)
			, o = t.n(r)
			, i = o.a.createContext(null)
			, a = i.Provider;
		i.Consumer;

		function c(e) {
			var n = e.children
				, t = e.intl;
			return o.a.createElement(a, {
				value: t
			}, n);
		}

		function s() {
			return Object(r.useContext)(i);
		}
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return r;
		}
		));
		var r = function () {
			function e() {
				var e = this;
				this.promise = new Promise((function (n, t) {
					e.resolve = n,
						e.reject = t;
				}
				));
			}

			return e.prototype.resolve = function (e) {
			}
				,
				e.prototype.reject = function (e) {
				}
				,
				e;
		}();
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(103);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(115);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(133);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";

		function r(e) {
			return {
				userId: e.userId,
				name: e.name,
				displayName: e.displayName,
				domainId: e.domainId,
				domainName: e.domainName,
				projectId: e.projectId,
				projectName: e.projectName,
				userRoles: e.userRoles,
				vdcId: e.vdcId,
				vdcLevel: e.vdcLevel,
				topVdcId: e.topVdcId,
				hasAssumeRoleFlag: e.hasAssumeRoleFlag,
				isLoginUserFlag: e.isLoginUserFlag,
				cftk: e.cftk,
				extProjects: e.extProjects,
				assumedInfo: e.assumedInfo,
				sm_tag: e.sm_tag
			};
		}

		function o(e) {
			if (e) {
				return {
					regions: e.regions,
					projectList: e.projectList,
					selectRegionId: e.selectRegionId || "ghca-test-region",
					regionName: e.regionName || "ghca-test-region",
					displayRegionName: e.displayRegionName || "ghca-test-region",
					ifIamProjectList: e.ifIamProjectList,
					iamProjectList: e.iamProjectList,
					isMultiCloudScene: e.isMultiCloudScene,
					hwsRegions: e.hwsRegions
				};
			}
		}

		function i(e) {
			var n = e.endpoints;
			return {
				homeEndpoint: e.homeEndpoint,
				rawEndpoints: n,
				serviceEndpoints: e.serviceEndpoints
			};
		}

		t.d(n, "c", (function () {
			return r;
		}
		)),
			t.d(n, "b", (function () {
				return o;
			}
			)),
			t.d(n, "a", (function () {
				return i;
			}
			));
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "d", (function () {
			return O;
		}
		)),
			t.d(n, "b", (function () {
				return N;
			}
			)),
			t.d(n, "c", (function () {
				return R;
			}
			)),
			t.d(n, "a", (function () {
				return L;
			}
			));
		var r, o, i = t(3), a = t(4), c = function () {
		}, s = function (e, n, t, r) {
			return new (t || (t = Promise))((function (o, i) {
				function a(e) {
					try {
						s(r.next(e));
					} catch (e) {
						i(e);
					}
				}

				function c(e) {
					try {
						s(r.throw(e));
					} catch (e) {
						i(e);
					}
				}

				function s(e) {
					var n;
					e.done ? o(e.value) : (n = e.value,
						n instanceof t ? n : new t((function (e) {
							e(n);
						}
						))).then(a, c);
				}

				s((r = r.apply(e, n || [])).next());
			}
			));
		}, l = function (e, n) {
			var t, r, o, i, a = {
				label: 0,
				sent: function () {
					if (1 & o[0])
						throw o[1];
					return o[1];
				},
				trys: [],
				ops: []
			};
			return i = {
				next: c(0),
				throw: c(1),
				return: c(2)
			},
				"function" == typeof Symbol && (i[Symbol.iterator] = function () {
					return this;
				}
				),
				i;

			function c(i) {
				return function (c) {
					return function (i) {
						if (t)
							throw new TypeError("Generator is already executing.");
						for (; a;)
							try {
								if (t = 1,
									r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
										0) : r.next) && !(o = o.call(r, i[1])).done)
									return o;
								switch (r = 0,
								o && (i = [2 & i[0], o.value]),
								i[0]) {
									case 0:
									case 1:
										o = i;
										break;
									case 4:
										return a.label++,
										{
											value: i[1],
											done: !1
										};
									case 5:
										a.label++,
											r = i[1],
											i = [0];
										continue;
									case 7:
										i = a.ops.pop(),
											a.trys.pop();
										continue;
									default:
										if (!(o = a.trys,
											(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
											a = 0;
											continue;
										}
										if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
											a.label = i[1];
											break;
										}
										if (6 === i[0] && a.label < o[1]) {
											a.label = o[1],
												o = i;
											break;
										}
										if (o && a.label < o[2]) {
											a.label = o[2],
												a.ops.push(i);
											break;
										}
										o[2] && a.ops.pop(),
											a.trys.pop();
										continue;
								}
								i = n.call(e, a);
							} catch (e) {
								i = [6, e],
									r = 0;
							} finally {
								t = o = 0;
							}
						if (5 & i[0])
							throw i[1];
						return {
							value: i[0] ? i[1] : void 0,
							done: !0
						};
					}([i, c]);
				};
			}
		}, u = function () {
			function e() {
			}

			return e.getRegionRequest = function (e) {
				var n = {
					url: i.a.getAppWebPath() + "/rest/silvan/rest/v1.0/regions",
					params: e.params,
					timeout: 6e4,
					headers: e.headers
				};

				return a.a.get(n);
			},
				e.changeRegionRequest = function (e) {
					var n = {
						url: i.a.getAppWebPath() + "/rest/changeRegion",
						params: {
							project: e.project,
							salt: Math.random()
						},
						timeout: 6e4,
						headers: {
							AgencyId: e.agencyId || ""
						}
					};
					return a.a.get(n);
				}
				,
				e.getCfRegion = function () {
					return s(this, void 0, void 0, (function () {
						return l(this, (function (e) {
							switch (e.label) {
								case 0:
									return this.cfRegion ? [3, 2] : (this.cfRegion = new c,
										[4, this.initCfRegion()]);
								case 1:
									e.sent(),
										e.label = 2;
								case 2:
									return [2, this.cfRegion];
							}
						}
						));
					}
					));
				}
				,
				e.initCfRegion = function () {
					return s(this, void 0, void 0, (function () {
						var e;
						return l(this, (function (n) {
							switch (n.label) {
								case 0:
									return this.cfRegionPromise ? [3, 2] : (this.cfRegionPromise = this.getRegionRequest({
										params: {
											version: "8.1.1"
										}
									}).catch((function () {
										return {
											regions: []
										};
									}
									)),
										[4, this.cfRegionPromise]);
								case 1:
									(e = n.sent()) && e.regions && (this.cfRegion.regions = e.regions),
										n.label = 2;
								case 2:
									return [2];
							}
						}
						));
					}
					));
				}
				,
				e;
		}(), f = t(33), d = t(10), m = t(2), p = t(11), h = t(1), g = t(32), v = t(8), b = t(25), w = t(21), y = t(9),
			x = function () {
				return (x = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			}, k = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}, S = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}, E = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}, C = function (e, n) {
				for (var t = 0, r = n.length, o = e.length; t < r; t++,
					o++)
					e[o] = n[t];
				return e;
			};

		function A(e, n) {
			if (!e || 0 == e.length || null === e[0] || "" === e[0])
				return !1;
			return !(e.indexOf(n) >= 0);
		}

		function I(e) {
			var n = C([], E(e));
			return n.forEach((function (e) {
				return x({}, e);
			}
			)),
				n;
		}

		function T(e) {
			var n, t, i;
			if (r && r.regions) {
				for (var a = null, c = 0; c < r.regions.length; c++) {
					if (a = r.regions[c].projects.find((function (n) {
						return n.id === e.projectId;
					}
					)))
						break;
				}
				if (a) {
					var s = r.projectList.find((function (n) {
						return n.id === e.projectId;
					}
					));
					r.projectVdcId = null == s ? void 0 : s.tenantId,
						r.selectRegionId = function (e) {
							if (e.projectName) {
								var n = m.a.getCookie("selectedRegion");
								h.a.getUrlParameter("regionId") && (n = h.a.getUrlParameter("regionId"),
									m.a.setParentCookie("selectedRegion", n));
								var t = r.regions.find((function (e) {
									return e.id === n;
								}
								));
								if (t && t.projects.some((function (n) {
									return n.name === e.projectName;
								}
								)))
									return n;
								var o = r.regions.find((function (n) {
									return n.projects.some((function (n) {
										return n.name === e.projectName;
									}
									));
								}
								));
								return m.a.setParentCookie("selectedRegion", null == o ? void 0 : o.id),
									null == o ? void 0 : o.id;
							}
						}(e),
						r.regionName = r.regions.find((function (e) {
							return e.id === r.selectRegionId;
						}
						)).name;
					var l = o.display_name || o.iam_project_name || o.name;
					l = l ? "(" + l + ")" : "",
						r.displayRegionName = r.regionName + l;
				} else if ((null === (n = r.regions) || void 0 === n ? void 0 : n.length) && (null === (t = r.regions[0].projects) || void 0 === t ? void 0 : t.length)) {
					s = r.regions[0].projects[0];
					m.a.setParentCookie("projectAgency", s.name),
						m.a.setParentCookie("changeAgency", "true"),
						m.a.setParentCookie("userAgency", e.userId),
						Object(d.a)(!0).then((function (e) {
							var n = h.a.genHWSHref(window.location.href, !1, {
								region: encodeURIComponent(null == e ? void 0 : e.projectName)
							});
							window.location.href = y.a.xssEncode(n);
						}
						));
				} else
					(null === (i = r.hwsRegions) || void 0 === i ? void 0 : i.length) && (r.selectRegionId = r.hwsRegions[0].id,
						r.regionName = r.hwsRegions[0].id,
						m.a.setParentCookie("selectedRegion", r.selectRegionId));
			}
		}

		function P(e, n, t) {
			var r = []
				, o = [];
			if (t && t.length > 0)
				for (var i = function (i) {
					var a = e.find((function (e) {
						return e.id === t[i].region_id;
					}
					));
					a ? a.cfType = "mix" : (o = n.filter((function (e) {
						return e.id === t[i].region_id;
					}
					))).forEach((function (e) {
						return e.cfType = "federation";
					}
					)),
						r = r.concat(o);
				}, a = 0; a < t.length; a++)
					i(a);
			return r;
		}

		function O() {
			return k(this, void 0, void 0, (function () {
				var e, n, t, i, a, c, s, l;
				return S(this, (function (p) {
					switch (p.label) {
						case 0:
							return r && r.regions ? [3, 3] : [4, Object(d.a)()];
						case 1:
							return e = p.sent(),
								n = Promise.resolve(u.getCfRegion().catch((function () {
									return [];
								}
								))),
								t = Promise.resolve(f.a.getCfProject()).catch((function () {
									return [];
								}
								)),
								i = Promise.resolve(f.a.getCfFederationLinks()).catch((function () {
									return [];
								}
								)),
								[4, Promise.all([n, t, i]).catch((function () {
									return [];
								}
								))];
						case 2:
							return a = E.apply(void 0, [p.sent(), 3]),
								c = a[0],
								s = a[1],
								l = a[2],
								e.userRoles && h.a.isServiceOperationMgr(e.userRoles) ? (g = c,
									b = m.a.getCookie("serviceOperationMgrSelectedRegion"),
									w = h.a.getUrlParameter("selectRegionId") ? h.a.getUrlParameter("selectRegionId") : b,
									y = g.regions,
									x = h.a.isMultiCloudScene(y),
									y.length > 0 && (r = {
										regions: y,
										isMultiCloudScene: x
									},
										(v = y.find((function (e) {
											return e.id === w;
										}
										))) ? (r.selectRegionId = v.id,
											r.regionName = v.name,
											r.displayRegionName = v.name) : (r.selectRegionId = y[0].id,
												r.regionName = y[0].name,
												r.displayRegionName = y[0].name),
										m.a.setParentCookie("serviceOperationMgrSelectedRegion", r.selectRegionId))) : e.ifIamUser ? function (e, n, t, i) {
											var a, c, s = {}, l = I(e.regions), u = e.regions || [],
												f = (null == n ? void 0 : n.tmpProjects) || [];
											if (f && u) {
												var d = /^(STD)_([^_]+)_(.+)$/
													, m = /^([^_]+)_(.+)$/;
												for (f.forEach((function (e, n) {
													if (e.name && d.test(e.name)) {
														var r = e.name.match(d);
														s[r[2]] = s[r[2]] || [],
															s[r[2]].push({
																id: e.id,
																name: e.name,
																userProjectNameFlag: !1,
																displayName: r[3],
																disable: A(t.supportRegions, e.name)
															});
													} else
														e.name && m.test(e.name) ? (c = e.name.match(m),
															s[c[1]] = s[c[1]] || [],
															s[c[1]].push({
																id: e.id,
																name: e.name,
																userProjectNameFlag: !0,
																displayName: c[2],
																disable: A(t.supportRegions, e.name)
															})) : e.name && (c = e.name,
																s[c] = s[c] || [],
																s[c].push({
																	id: e.id,
																	name: e.name,
																	userProjectNameFlag: !0,
																	displayName: e.name,
																	disable: A(t.supportRegions, e.name)
																}));
												}
												)),
													a = 0; a < u.length; a++)
													u[a].projects = s[u[a].id],
														u[a].disable = t.supportRegions && A(t.supportRegions, u[a].id);
												var p = [];
												u.forEach((function (e) {
													e.projects && e.projects.length > 0 && (e.regionName = e.name,
														p.push(e));
												}
												));
												var h = null == i ? void 0 : i.federationLinks
													, g = P(p, l, h);
												r = {
													originalRegions: l,
													regions: p,
													hwsRegions: g,
													projectList: f,
													federationLinks: h,
													ifIamProjectList: !0,
													iamProjectList: f,
													initialized: !0
												},
													o = f.find((function (e) {
														return e.id === t.projectId;
													}
													)),
													T(t);
											}
										}(c, s, e, l) : function (e, n, t, i) {
											var a, c = {}, s = I(e.regions), l = e.regions || [],
												u = (null == n ? void 0 : n.tmpProjects) || [];
											if (u && l) {
												for (u.forEach((function (e, n) {
													e.regions.forEach((function (n) {
														c[n.region_id] = c[n.region_id] || [],
															c[n.region_id].push({
																id: e.id,
																name: e.name,
																displayName: e.display_name || e.iam_project_name,
																disable: "disabled" === n.region_status,
																userProjectNameFlag: !1,
																tenantId: e.tenant_id
															});
													}
													));
												}
												)),
													a = 0; a < l.length; a++)
													l[a].projects = c[l[a].id],
														l[a].disable = t.supportRegions && A(t.supportRegions, l[a].id);
												var f = [];
												l.forEach((function (e) {
													e.projects && e.projects.length > 0 && f.push(e);
												}
												));
												var d = null == i ? void 0 : i.federationLinks
													, m = P(f, s, d)
													, p = h.a.isMultiCloudScene(s);
												r = {
													originalRegions: s,
													regions: f,
													hwsRegions: m,
													projectList: u,
													federationLinks: d,
													isMultiCloudScene: p,
													initialized: !0
												},
													o = u.find((function (e) {
														return e.id === t.projectId;
													}
													)),
													T(t);
											}
										}(c, s, e, l),
								[2, r];
						case 3:
							return [2, r];
					}
					var g, v, b, w, y, x;
				}
				));
			}
			));
		}

		function _(e, n, t) {
			var r = t.find((function (e) {
				return e.id === n;
			}
			));
			p.a.dispatch({
				type: "UPDATE_REGION_ALL",
				payload: {
					selectRegionId: n,
					displayRegionName: e ? r.name + "(" + e.displayName + ")" : r.name
				}
			});
		}

		function j(e, n, t) {
			Object(g.a)({
				noCache: !0,
				projectId: e,
				regionId: n,
				isGotoConsole: t
			}).then((function (e) {
				var n;
				n = !1,
					p.a.dispatch({
						type: "UPDATE_LOADING",
						payload: {
							loading: n
						}
					}),
					p.a.dispatch({
						type: "UPDATE_ENDPOINT_ALL",
						payload: e
					});
			}
			));
		}

		function N(e, n, t, r, o, i, a) {
			return void 0 === a && (a = !1),
				k(this, void 0, void 0, (function () {
					var r, c;
					return S(this, (function (s) {
						switch (s.label) {
							case 0:
								return m.a.setParentCookie("selectedRegion", t),
									m.a.setParentCookie("projectId", e.id),
									m.a.setParentCookie("projectName", e.name),
									r = null == n ? void 0 : n.userId,
									[4, u.changeRegionRequest({
										agencyId: r,
										project: e.name
									}).catch((function () {
										return [];
									}
									))];
							case 1:
								return s.sent(),
									c = h.a.delUrlParameter(location.href, "regionId"),
									c = h.a.addOrReplaceUrlParameter(c, "region", e.name),
									history.pushState(null, "", c),
									a && window.location.reload(),
									_(e, t, o),
									Object(d.a)(!0).then((function (e) {
										v.a.user = new w.a,
											v.a.user.resolve(Object(b.c)(e)),
											window.moCfUserCache = e,
											p.a.dispatch({
												type: "UPDATE_USER_ALL",
												payload: e
											}),
											window.getMoCfContext().getSelectedRegionId$().next(t);
									}
									)),
									j(e.name, t, i),
									[2];
						}
					}
					));
				}
				));
		}

		function R(e, n) {
			m.a.setParentCookie("serviceOperationMgrSelectedRegion", e),
				_(null, e, n),
				window.getMoCfContext().getSelectedRegionId$().next(e),
				j(null, e);
		}

		function L(e) {
			var n, t,
				r = null === (t = null === (n = null == e ? void 0 : e.assumedInfo) || void 0 === n ? void 0 : n.loginUserAccount) || void 0 === t ? void 0 : t.id;
			if (e.userRoles.includes("mo_agency"))
				h.a.gotoAgencyMgr();
			else {
				var o = e.assumedInfo.projects[0]
					, i = o.name;
				u.changeRegionRequest({
					agencyId: r,
					project: i
				}).then((function (n) {
					var t, r;
					if ("/motenantconsolehomewebsite/" !== window.location.pathname)
						m.a.setParentCookie("changeAgency", "true"),
							m.a.setParentCookie("projectAgency", o.name),
							m.a.setParentCookie("userAgency", null === (r = null === (t = null == e ? void 0 : e.assumedInfo) || void 0 === t ? void 0 : t.loginUserAccount) || void 0 === r ? void 0 : r.id),
							m.a.removeParentCookie("projectName"),
							m.a.removeParentCookie("projectId"),
							m.a.removeParentCookie("projectAgencyId"),
							window.location.href = window.location.origin + "/motenantconsolehomewebsite/#/agencyManager";
					else {
						m.a.removeParentCookie("projectName"),
							m.a.removeParentCookie("projectId"),
							m.a.removeParentCookie("projectAgencyId");
						var i = h.a.delUrlParameter(window.location.href, "agencyId");
						(i = h.a.delUrlParameter(i, "region")) === window.location.href ? window.location.reload() : window.location.href = y.a.xssEncode(i);
					}
				}
				));
			}
		}
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return m;
		}
		));
		var r = t(3)
			, o = t(4)
			, i = function () {
			}
			, a = t(1)
			, c = function () {
				return (c = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			}
			, s = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}
			, l = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}
			, u = function (e) {
				var n = "function" == typeof Symbol && Symbol.iterator
					, t = n && e[n]
					, r = 0;
				if (t)
					return t.call(e);
				if (e && "number" == typeof e.length)
					return {
						next: function () {
							return e && r >= e.length && (e = void 0),
							{
								value: e && e[r++],
								done: !e
							};
						}
					};
				throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.");
			}
			, f = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, d = function (e, n) {
				for (var t = 0, r = n.length, o = e.length; t < r; t++,
					o++)
					e[o] = n[t];
				return e;
			}
			, m = function () {
				function e() {
				}

				return e.getEndpointsRequest = function (e) {
					var n = {
						url: r.a.getAppWebPath() + "/rest/silvan/rest/v1.0/endpoints",
						params: {
							region: e
						},
						timeout: 6e4
					};
					return o.a.get(n);
				}
					,
					e.getProductRequest = function (e, n) {
						var t = {
							url: r.a.getAppWebPath() + "/rest/silvan/rest/v1.0/products",
							params: {
								region: e,
								projectId: n
							},
							timeout: 6e4
						};
						return o.a.get(t);
					}
					,
					e.getCustomCatalogRequest = function (e) {
						var n = {
							url: {
								s: r.a.getAppWebPath() + "/rest/silvan/rest/v1.0/custom-catalog"
							},
							timeout: 6e4,
							headers: null == e ? void 0 : e.headers
						};
						return o.a.get(n);
					}
					,
					e.getServiceTypeRequest = function (e) {
						var n = {
							url: {
								s: r.a.getAppWebPath() + "/rest/product/v3.0/products/service-type"
							},
							timeout: 6e4,
							headers: null == e ? void 0 : e.headers
						};
						return o.a.get(n);
					}
					,
					e.getFavoriteEndpointRequest = function (e) {
						var n = {
							url: {
								s: r.a.getAppWebPath() + "/rest/silvan/rest/v1.0/users/{user_id}/endpoints",
								o: {
									user_id: e.user_id
								}
							},
							timeout: 6e4,
							headers: e.headers
						};
						return o.a.get(n);
					}
					,
					e.addFavoriteEndpointRequest = function (e) {
						var n = {
							url: {
								s: r.a.getAppWebPath() + "/rest/silvan/rest/v1.0/users/{user_id}/endpoints/{id}",
								o: {
									user_id: e.user_id,
									id: e.id
								}
							},
							timeout: 6e4,
							headers: e.headers
						};
						return o.a.post(n);
					}
					,
					e.deleteFavoriteEndpointRequest = function (e) {
						var n = {
							url: {
								s: r.a.getAppWebPath() + "/rest/silvan/rest/v1.0/users/{user_id}/endpoints/{id}",
								o: {
									user_id: e.user_id,
									id: e.id
								}
							},
							timeout: 6e4,
							headers: e.headers
						};
						return o.a.delete(n);
					}
					,
					e.sortFavoriteEndpoint = function (e) {
						var n = {
							url: {
								s: r.a.getAppWebPath() + "/rest/silvan/rest/v1.0/users/{user_id}/endpoints/all",
								o: {
									user_id: e.user_id
								}
							},
							data: {
								endpointResources: e.endpointResources
							},
							timeout: 6e4,
							headers: e.headers
						};
						return o.a.put(n);
					}
					,
					e.getEndpoints = function (e, n, t, r, o, a) {
						return s(this, void 0, void 0, (function () {
							return l(this, (function (c) {
								switch (c.label) {
									case 0:
										return this.cfEndpoints && !r ? [3, 2] : (this.cfEndpoints = new i,
											[4, this.initAllEndpoints(e, n, t, r, o, a)]);
									case 1:
										c.sent(),
											c.label = 2;
									case 2:
										return [2, this.cfEndpoints];
								}
							}
							));
						}
						));
					}
					,
					e.getCustomCatalogAsync = function (e) {
						return s(this, void 0, void 0, (function () {
							return l(this, (function (n) {
								return e && a.a.isServiceOperationMgr(e) ? [2] : [2, this.getCustomCatalogRequest()];
							}
							));
						}
						));
					}
					,
					e.getServiceTypeAsync = function (e) {
						return s(this, void 0, void 0, (function () {
							return l(this, (function (n) {
								return e && a.a.isServiceOperationMgr(e) ? [2] : [2, this.getServiceTypeRequest()];
							}
							));
						}
						));
					}
					,
					e.initAllEndpoints = function (e, n, t, r, o, i) {
						return void 0 === r && (r = !1),
							s(this, void 0, void 0, (function () {
								var a, c, s, u, f;
								return l(this, (function (l) {
									switch (l.label) {
										case 0:
											return this.EndpointsPromise && !r || (a = this.getEndpointsRequest(e).catch((function () {
											}
											)),
												c = this.getProductRequest(e, n).catch((function () {
												}
												)),
												s = this.getCustomCatalogAsync(t.userRoles).catch((function () {
													return [];
												}
												)),
												u = this.getServiceTypeAsync(t.userRoles).catch((function () {
													return [];
												}
												)),
												this.EndpointsPromise = Promise.all([a, c, s, u])),
												[4, this.EndpointsPromise];
										case 1:
											return f = l.sent(),
												n || i ? this.initDealEndpoints(f, o) : this.initGlobalServiceNoRegion(f),
												[2];
									}
								}
								));
							}
							));
					}
					,
					e.initDealEndpoints = function (e, n) {
						this.dealAllEndpoints(e, n),
							this.beautifierEndpoints();
					}
					,
					e.dealAllEndpoints = function (e, n) {
						var t, r, o, i, c = this;
						if (e) {
							var s = (null === (o = e[0]) || void 0 === o ? void 0 : o.endpoints) || []
								, l = (null === (i = e[1]) || void 0 === i ? void 0 : i.products) || []
								, f = e[2] && e[2].CustomCatalogs || []
								, d = e[3] && e[3].serviceTypes || []
								, m = []
								, p = null
								, h = []
								, g = function (e) {
									if ("home" === e.id)
										return p = e,
											"continue";
									h = l.filter((function (n) {
										return n.serviceType === e.id;
									}
									));
									var t = null
										, r = v.isOnlyShowProduct(e)
										, o = !n || r;
									if (h.length > 0 && o)
										return h.forEach((function (n) {
											n.catalogOrder = parseInt(n.categoryOrder),
												n.catalog = n.categoryName,
												n.endpointType = "product",
												n.serviceOrder = e.serviceOrder,
												n.deployMode = e.deployMode,
												(e.id.startsWith("huaweicloud") || a.a.isCrsBorrowService(e.endpoint)) && (n.endpoint = e.endpoint),
												(t = c.getCustomCatalog(f, e.customCatalogId)) && (n.customCatalogName = t.name,
													n.customCatalogLevel = t.customLevel,
													n.customCatalogOrder = t.customOrder,
													n.parentCatalogId = t.parentCatalogId);
										}
										)),
											m = m.concat(h),
											"continue";
									r || d.includes(e.id) && !n || ((t = v.getCustomCatalog(f, e.customCatalogId)) && (e.customCatalogName = t.name,
										e.customCatalogLevel = t.customLevel,
										e.customCatalogOrder = t.customOrder,
										e.parentCatalogId = t.parentCatalogId),
										m.push(e));
								}
								, v = this;
							try {
								for (var b = u(s), w = b.next(); !w.done; w = b.next()) {
									g(w.value);
								}
							} catch (e) {
								t = {
									error: e
								};
							} finally {
								try {
									w && !w.done && (r = b.return) && r.call(b);
								} finally {
									if (t)
										throw t.error;
								}
							}
							this.cfEndpoints.homeEndpoint = p,
								this.cfEndpoints.endpoints = s,
								this.cfEndpoints.customCatalogs = f,
								this.cfEndpoints.serviceEndpointList = m.sort((function (e, n) {
									return e.catalogOrder - n.catalogOrder;
								}
								));
						}
					}
					,
					e.beautifierEndpoints = function () {
						var e, n;
						if (this.cfEndpoints.serviceEndpointList) {
							var t = this.groupServiceEndpointByParentCustomCatalog()
								, r = [];
							try {
								for (var o = u(t), i = o.next(); !i.done; i = o.next()) {
									var a = i.value
										, c = a.endpoints
										, s = {}
										, l = void 0
										, f = void 0;
									c = c.sort((function (e, n) {
										return e.customCatalogOrder - n.customCatalogOrder;
									}
									));
									for (var d = 0; d < c.length; d++)
										s[f = (l = c[d]) && l.customCatalogName && l.customCatalogName.trim() || ""] = s[f] || [],
											s[f].push(l);
									var m = []
										, p = void 0;
									for (p in s)
										({}).hasOwnProperty.call(s, p) && m.push({
											catalog: p,
											endpoints: s[p].sort((function (e, n) {
												return e.serviceOrder - n.serviceOrder;
											}
											))
										});
									m = m.sort((function (e, n) {
										return e.customCatalogOrder - n.customCatalogOrder;
									}
									));
									var h = this.getCustomCatalog(this.cfEndpoints.customCatalogs, a.parentCatalogId);
									r.push({
										catalog: h && h.name || "",
										catalogOrder: h && h.order || "",
										subCatalogs: m
									});
								}
							} catch (n) {
								e = {
									error: n
								};
							} finally {
								try {
									i && !i.done && (n = o.return) && n.call(o);
								} finally {
									if (e)
										throw e.error;
								}
							}
							this.cfEndpoints.ServiceListForBanner = this.copy(r),
								this.cfEndpoints.ServiceListForBanner.unshift({
									catalog: "",
									endpoints: this.copy(r)
								}),
								this.cfEndpoints.serviceEndpoints = r,
								this.cfEndpoints.serviceEndpointsFlag = !0,
								this.cfEndpoints.endpointInitFlag = !0;
						}
					}
					,
					e.copy = function (e) {
						var n = d([], f(e));
						return n.forEach((function (e) {
							return c({}, e);
						}
						)),
							n;
					}
					,
					e.initGlobalServiceNoRegion = function (e) {
						this.dealAllEndpointsOfNoRegion(e),
							this.beautifierEndpoints();
					}
					,
					e.dealAllEndpointsOfNoRegion = function (e) {
						var n, t, r, o;
						if (e) {
							var i = (null === (r = e[0]) || void 0 === r ? void 0 : r.endpoints) || []
								, a = (null === (o = e[1]) || void 0 === o ? void 0 : o.products) || []
								, c = null
								, s = []
								, l = []
								, f = function (e) {
									return "home" === e.id ? (c = e,
										"continue") : e.regionId ? "continue" : (s = a.filter((function (n) {
											return n.serviceType === e.id;
										}
										))).length > 0 ? (s.forEach((function (e) {
											e.catalogOrder = parseInt(e.categoryOrder),
												e.catalog = e.categoryName,
												e.endpointType = "product";
										}
										)),
											l = l.concat(s),
											"continue") : void l.push(e);
								};
							try {
								for (var d = u(i), m = d.next(); !m.done; m = d.next()) {
									f(m.value);
								}
							} catch (e) {
								n = {
									error: e
								};
							} finally {
								try {
									m && !m.done && (t = d.return) && t.call(d);
								} finally {
									if (n)
										throw n.error;
								}
							}
							this.cfEndpoints.homeEndpoint = c,
								this.cfEndpoints.serviceEndpointList = l.sort((function (e, n) {
									return e.catalogOrder - n.catalogOrder;
								}
								));
						}
					}
					,
					e.getCustomCatalog = function (e, n) {
						var t, r, o, i;
						if (!e || 0 === e.length)
							return null;
						try {
							for (var a = u(e), c = a.next(); !c.done; c = a.next()) {
								var s = c.value;
								if (s.catalogId === n)
									return s;
								try {
									for (var l = (o = void 0,
										u(s.subCatalogs)), f = l.next(); !f.done; f = l.next()) {
										var d = f.value;
										if (d.catalogId === n)
											return d;
									}
								} catch (e) {
									o = {
										error: e
									};
								} finally {
									try {
										f && !f.done && (i = l.return) && i.call(l);
									} finally {
										if (o)
											throw o.error;
									}
								}
							}
						} catch (e) {
							t = {
								error: e
							};
						} finally {
							try {
								c && !c.done && (r = a.return) && r.call(a);
							} finally {
								if (t)
									throw t.error;
							}
						}
						return null;
					}
					,
					e.groupServiceEndpointByParentCustomCatalog = function () {
						var e = this
							, n = this.cfEndpoints.serviceEndpointList
							, t = []
							, r = {};
						return n.forEach((function (n) {
							var o, i, a;
							r[n.parentCatalogId] ? t.forEach((function (e) {
								e.parentCatalogId === n.parentCatalogId && e.endpoints.push(n);
							}
							)) : (t.push({
								parentCatalogId: n.parentCatalogId,
								customOrder: null === (a = null === (i = null === (o = e.cfEndpoints) || void 0 === o ? void 0 : o.customCatalogs) || void 0 === i ? void 0 : i.find((function (e) {
									return e.catalogId === n.parentCatalogId;
								}
								))) || void 0 === a ? void 0 : a.customOrder,
								endpoints: [n]
							}),
								r[n.parentCatalogId] = n);
						}
						)),
							t.sort((function (e, n) {
								return e.customOrder - n.customOrder;
							}
							)),
							t;
					}
					,
					e.isOnlyShowProduct = function (e) {
						var n = e.id;
						return n && (n.startsWith("huaweicloud") || e.id.startsWith("service-")) || a.a.isCrsBorrowService(e.endpoint) || a.a.isOfflineService(e.catalogOrder);
					}
					,
					e;
			}();
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "b", (function () {
			return c;
		}
		)),
			t.d(n, "c", (function () {
				return s;
			}
			)),
			t.d(n, "a", (function () {
				return l;
			}
			));
		var r, o = function () {
			return (o = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}, i = {
			top: "#J_header>.modules-header-cf-header-container",
			right: null,
			bottom: null,
			left: "#J_sidebar>.js-cf-sidebar"
		};

		function a(e, n) {
			if (!e)
				return 0;
			var t = document.querySelector(e);
			return t ? n ? t.offsetHeight : t.offsetWidth : 0;
		}

		function c(e) {
			return function () {
				for (var e = [], n = 0; n < arguments.length; n++)
					e[n] = arguments[n];
				return window.addEventListener.apply(window, e);
			}("safeAreaChange", e);
		}

		function s(e) {
			var n = e.reduce((function (e, n) {
				return e[n] = a(i[n], function (e) {
					return ["top", "bottom"].includes(e);
				}(n)),
					e;
			}
			), {});
			r = r ? o(o({}, r), n) : n,
				function () {
					for (var e = [], n = 0; n < arguments.length; n++)
						e[n] = arguments[n];
					window.dispatchEvent.apply(window, e);
				}(new CustomEvent("safeAreaChange", {
					detail: r
				}));
		}

		function l() {
			return r || (r = {
				top: a(i.top, !0),
				right: a(i.right, !1),
				bottom: a(i.bottom, !0),
				left: a(i.left, !1)
			}),
				o({}, r);
		}
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(114);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(138);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return a;
		}
		)),
			t.d(n, "b", (function () {
				return c;
			}
			)),
			t.d(n, "c", (function () {
				return u;
			}
			));
		var r, o = t(2), i = t(1);

		function a() {
			return r;
		}

		function c(e) {
			if (r)
				return r;
			var n = e[0].locale
				, t = i.a.getUrlParameter("locale")
				, a = o.a.getCookie("locale")
				, c = (navigator.language || navigator.browserLanguage).toLowerCase();
			return t && s(e, t) ? n = s(e, t) : a && s(e, a) ? n = s(e, a) : c && s(e, c) && (n = s(e, c)),
				n !== a && o.a.setParentCookie("locale", n),
				r = n,
				n;
		}

		function s(e, n) {
			var t = ""
				, r = e.findIndex((function (e) {
					return l(e.locale) === l(n);
				}
				));
			return r > -1 && (t = e[r].locale),
				t;
		}

		function l(e) {
			return e.slice(0, 2).toLowerCase();
		}

		function u() {
			document.addEventListener("visibilitychange", (function (e) {
				if (!document.hidden) {
					var n = a();
					o.a.setParentCookie("locale", n);
				}
			}
			), !1);
		}
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return d;
		}
		));
		var r, o = t(27), i = t(10), a = t(8), c = t(25), s = function (e, n, t, r) {
			return new (t || (t = Promise))((function (o, i) {
				function a(e) {
					try {
						s(r.next(e));
					} catch (e) {
						i(e);
					}
				}

				function c(e) {
					try {
						s(r.throw(e));
					} catch (e) {
						i(e);
					}
				}

				function s(e) {
					var n;
					e.done ? o(e.value) : (n = e.value,
						n instanceof t ? n : new t((function (e) {
							e(n);
						}
						))).then(a, c);
				}

				s((r = r.apply(e, n || [])).next());
			}
			));
		}, l = function (e, n) {
			var t, r, o, i, a = {
				label: 0,
				sent: function () {
					if (1 & o[0])
						throw o[1];
					return o[1];
				},
				trys: [],
				ops: []
			};
			return i = {
				next: c(0),
				throw: c(1),
				return: c(2)
			},
				"function" == typeof Symbol && (i[Symbol.iterator] = function () {
					return this;
				}
				),
				i;

			function c(i) {
				return function (c) {
					return function (i) {
						if (t)
							throw new TypeError("Generator is already executing.");
						for (; a;)
							try {
								if (t = 1,
									r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
										0) : r.next) && !(o = o.call(r, i[1])).done)
									return o;
								switch (r = 0,
								o && (i = [2 & i[0], o.value]),
								i[0]) {
									case 0:
									case 1:
										o = i;
										break;
									case 4:
										return a.label++,
										{
											value: i[1],
											done: !1
										};
									case 5:
										a.label++,
											r = i[1],
											i = [0];
										continue;
									case 7:
										i = a.ops.pop(),
											a.trys.pop();
										continue;
									default:
										if (!(o = a.trys,
											(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
											a = 0;
											continue;
										}
										if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
											a.label = i[1];
											break;
										}
										if (6 === i[0] && a.label < o[1]) {
											a.label = o[1],
												o = i;
											break;
										}
										if (o && a.label < o[2]) {
											a.label = o[2],
												a.ops.push(i);
											break;
										}
										o[2] && a.ops.pop(),
											a.trys.pop();
										continue;
								}
								i = n.call(e, a);
							} catch (e) {
								i = [6, e],
									r = 0;
							} finally {
								t = o = 0;
							}
						if (5 & i[0])
							throw i[1];
						return {
							value: i[0] ? i[1] : void 0,
							done: !0
						};
					}([i, c]);
				};
			}
		}, u = {}, f = {
			noCache: !1,
			projectId: "",
			regionId: "",
			isGotoConsole: !1
		};

		function d(e) {
			return void 0 === e && (e = f),
				function (e) {
					void 0 === e && (e = f);
					return s(this, void 0, void 0, (function () {
						var n;
						return l(this, (function (t) {
							switch (t.label) {
								case 0:
									return r && !e.noCache ? [3, 2] : [4, Object(i.a)()];
								case 1:
									n = t.sent(),
										r = new Promise((function (t) {
											var r = o.a.getEndpoints(e.regionId, e.projectId || n.projectId, n, e.noCache, e.isGotoConsole, e.isOnlyHwsRegion)
												, i = "";
											i = n && n.assumedInfo && n.assumedInfo.loginUserAccount ? n.assumedInfo.loginUserAccount.id : n.userId;
											var s = o.a.getFavoriteEndpointRequest({
												user_id: i,
												headers: {
													region: e.regionId || ""
												}
											});
											Promise.all([r, s]).then((function (e) {
												var n, r = e[1] || {}, o = r && r.endpointCollects,
													i = null === (n = e[0]) || void 0 === n ? void 0 : n.serviceEndpointList;
												o = o.filter((function (e) {
													return null == i ? void 0 : i.find((function (n) {
														return n.id === e.endpointId;
													}
													));
												}
												)),
													Object.assign(u, {
														endpointCollects: o,
														endpoints: e[0]
													}),
													a.b.endpoints.next(Object(c.a)(u.endpoints)),
													a.b.collectedEndpoints.next(o),
													t(u);
											}
											));
										}
										)),
										t.label = 2;
								case 2:
									return [2, r];
							}
						}
						));
					}
					));
				}(e);
		}
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return f;
		}
		));
		var r = t(3)
			, o = t(4)
			, i = function () {
			}
			, a = function () {
			}
			, c = t(39)
			, s = t(1)
			, l = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}
			, u = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}
			, f = function () {
				function e() {
				}

				return e.getProjectRequest = function (e) {
					var n = {
						url: {
							s: r.a.getAppWebPath() + "/rest/vdc/v3.1/users/{user_id}/projects",
							o: {
								user_id: e.user_id
							}
						},
						params: e.params,
						timeout: 6e4,
						headers: e.headers
					};
					return o.a.get(n);
				}
					,
					e.getIamProjectRequest = function (e) {
						var n = {
							url: {
								s: r.a.getAppWebPath() + "/rest/iam/v3/users/{user_id}/projects",
								o: {
									user_id: e.user_id
								}
							},
							params: e.params,
							timeout: 6e4,
							headers: e.headers
						};
						return o.a.get(n);
					}
					,
					e.getFederationLinksRequest = function (e) {
						var n = {
							url: {
								s: r.a.getAppWebPath() + "/goku/rest/vdc-server/v3/users/{user_id}/federation-links",
								o: {
									user_id: e.user_id
								}
							},
							params: e.params,
							timeout: 6e4,
							headers: e.headers
						};
						return o.a.get(n);
					}
					,
					e.getCfProject = function () {
						return l(this, void 0, void 0, (function () {
							var e;
							return u(this, (function (n) {
								switch (n.label) {
									case 0:
										return this.cfProject ? [3, 3] : [4, c.a.getUser(!1)];
									case 1:
										return e = n.sent(),
											this.cfProject = new i,
											[4, this.initProject(e)];
									case 2:
										n.sent(),
											n.label = 3;
									case 3:
										return [2, this.cfProject];
								}
							}
							));
						}
						));
					}
					,
					e.initProject = function (e) {
						return l(this, void 0, void 0, (function () {
							var n, t;
							return u(this, (function (r) {
								switch (r.label) {
									case 0:
										return this.projectPromise || (n = "",
											n = e && e.assumedInfo && e.assumedInfo.loginUserAccount ? e.assumedInfo.loginUserAccount.id : e.userId,
											this.projectPromise = e.ifIamUser ? this.getIamProjectRequest({
												user_id: e.userId
											}) : this.getProjectRequest({
												user_id: n,
												params: {
													start: 0,
													limit: 0,
													rel_projects: !0
												}
											})),
											[4, this.projectPromise];
									case 1:
										return (t = r.sent()) && t.projects && (this.cfProject.tmpProjects = t.projects),
											[2];
								}
							}
							));
						}
						));
					}
					,
					e.getCfFederationLinks = function () {
						return l(this, void 0, void 0, (function () {
							var e;
							return u(this, (function (n) {
								switch (n.label) {
									case 0:
										return this.cfFederationLinks ? [3, 3] : [4, c.a.getUser(!1)];
									case 1:
										return e = n.sent(),
											this.cfFederationLinks = new a,
											e && e.userRoles && s.a.isServiceOperationMgr(e.userRoles) ? [2] : [4, this.initCfFederationLinks(e)];
									case 2:
										n.sent(),
											n.label = 3;
									case 3:
										return [2, this.cfFederationLinks];
								}
							}
							));
						}
						));
					}
					,
					e.initCfFederationLinks = function (e) {
						return l(this, void 0, void 0, (function () {
							var n, t;
							return u(this, (function (r) {
								switch (r.label) {
									case 0:
										return this.federationLinkPromise || (n = "",
											n = e && e.assumedInfo && e.assumedInfo.loginUserAccount ? e.assumedInfo.loginUserAccount.id : e.userId,
											this.federationLinkPromise = this.getFederationLinksRequest({
												user_id: n
											})),
											[4, this.federationLinkPromise];
									case 1:
										return t = r.sent(),
											this.cfFederationLinks.federationLinks = t.links || [],
											[2];
								}
							}
							));
						}
						));
					}
					,
					e.getHcsProjectRelations = function (e) {
						return l(this, void 0, void 0, (function () {
							var n, t;
							return u(this, (function (i) {
								switch (i.label) {
									case 0:
										return this.hcsProjectRelations[e] ? [3, 2] : (n = {
											url: r.a.getAppWebPath() + "/goku/rest/vdc-server/v3/federation-hcs/relations",
											params: {
												type: "project-name",
												local_id: e
											},
											timeout: 6e4
										},
											[4, o.a.get(n).catch((function () {
											}
											))]);
									case 1:
										t = i.sent(),
											this.hcsProjectRelations[e] = null == t ? void 0 : t.remote_id,
											i.label = 2;
									case 2:
										return [2, this.hcsProjectRelations[e]];
								}
							}
							));
						}
						));
					}
					,
					e.hcsProjectRelations = {},
					e;
			}();
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(132);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return p;
		}
		)),
			t.d(n, "b", (function () {
				return v;
			}
			));
		var r, o = t(4), i = t(3), a = function (e, n, t, r) {
			return new (t || (t = Promise))((function (o, i) {
				function a(e) {
					try {
						s(r.next(e));
					} catch (e) {
						i(e);
					}
				}

				function c(e) {
					try {
						s(r.throw(e));
					} catch (e) {
						i(e);
					}
				}

				function s(e) {
					var n;
					e.done ? o(e.value) : (n = e.value,
						n instanceof t ? n : new t((function (e) {
							e(n);
						}
						))).then(a, c);
				}

				s((r = r.apply(e, n || [])).next());
			}
			));
		}, c = function (e, n) {
			var t, r, o, i, a = {
				label: 0,
				sent: function () {
					if (1 & o[0])
						throw o[1];
					return o[1];
				},
				trys: [],
				ops: []
			};
			return i = {
				next: c(0),
				throw: c(1),
				return: c(2)
			},
				"function" == typeof Symbol && (i[Symbol.iterator] = function () {
					return this;
				}
				),
				i;

			function c(i) {
				return function (c) {
					return function (i) {
						if (t)
							throw new TypeError("Generator is already executing.");
						for (; a;)
							try {
								if (t = 1,
									r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
										0) : r.next) && !(o = o.call(r, i[1])).done)
									return o;
								switch (r = 0,
								o && (i = [2 & i[0], o.value]),
								i[0]) {
									case 0:
									case 1:
										o = i;
										break;
									case 4:
										return a.label++,
										{
											value: i[1],
											done: !1
										};
									case 5:
										a.label++,
											r = i[1],
											i = [0];
										continue;
									case 7:
										i = a.ops.pop(),
											a.trys.pop();
										continue;
									default:
										if (!(o = a.trys,
											(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
											a = 0;
											continue;
										}
										if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
											a.label = i[1];
											break;
										}
										if (6 === i[0] && a.label < o[1]) {
											a.label = o[1],
												o = i;
											break;
										}
										if (o && a.label < o[2]) {
											a.label = o[2],
												a.ops.push(i);
											break;
										}
										o[2] && a.ops.pop(),
											a.trys.pop();
										continue;
								}
								i = n.call(e, a);
							} catch (e) {
								i = [6, e],
									r = 0;
							} finally {
								t = o = 0;
							}
						if (5 & i[0])
							throw i[1];
						return {
							value: i[0] ? i[1] : void 0,
							done: !0
						};
					}([i, c]);
				};
			}
		}, s = function () {
			function e() {
			}

			return e.getDomainIdsRequest = function (e) {
				var n = {
					url: {
						s: i.a.getAppWebPath() + "/goku/rest/vdc-server/v3/plats/mappings/domains/{domainId}",
						o: {
							domainId: e
						}
					},
					timeout: 6e4
				};
				return o.a.get(n);
			}
				,
				e.getUserIdsRequest = function (e) {
					var n = {
						url: {
							s: i.a.getAppWebPath() + "/goku/rest/vdc-server/v3/plats/mappings/users/{userId}",
							o: {
								userId: e
							}
						},
						timeout: 6e4
					};
					return o.a.get(n);
				}
				,
				e.getSamlDatas = function (e, n, t) {
					return a(this, void 0, void 0, (function () {
						return c(this, (function (r) {
							switch (r.label) {
								case 0:
									return this.samlDatas ? [3, 2] : [4, this.initDomainIds(e, n, t).catch((function () {
										return [];
									}
									))];
								case 1:
									r.sent(),
										r.label = 2;
								case 2:
									return [2, this.samlDatas];
							}
						}
						));
					}
					));
				}
				,
				e.initDomainIds = function (n, t, r) {
					return a(this, void 0, void 0, (function () {
						var o, i, a, s;
						return c(this, (function (c) {
							switch (c.label) {
								case 0:
									e.samlDatas = [],
										e.domainIdsPromise || (e.domainIdsPromise = e.getDomainIdsRequest(t)),
										e.userIdsPromise || (e.userIdsPromise = e.getUserIdsRequest(n)),
										c.label = 1;
								case 1:
									return c.trys.push([1, 4, , 5]),
										[4, e.domainIdsPromise];
								case 2:
									return o = c.sent(),
										[4, e.userIdsPromise];
								case 3:
									return i = c.sent(),
										a = [],
										((null == o ? void 0 : o.mappings) || []).map((function (e) {
											var n = e.native_id
												, t = e.regions;
											n && t && t.length && t.map((function (e) {
												a.push({
													regionId: e.id,
													domainId: n
												});
											}
											));
										}
										)),
										s = (null == i ? void 0 : i.mappings) || [],
										a.forEach((function (e) {
											var n = s.find((function (n) {
												return n.regions.find((function (n) {
													return n.id === e.regionId;
												}
												));
											}
											))
												, t = r.find((function (n) {
													return n.id === e.regionId;
												}
												));
											e.authUrl = null == t ? void 0 : t.authUrl,
												e.userId = null == n ? void 0 : n.native_id;
										}
										)),
										e.samlDatas = a,
										[3, 5];
								case 4:
									return c.sent(),
										e.samlDatas = [],
										[3, 5];
								case 5:
									return [2];
							}
						}
						));
					}
					));
				}
				,
				e;
		}(), l = t(1), u = t(10), f = t(26), d = function (e, n, t, r) {
			return new (t || (t = Promise))((function (o, i) {
				function a(e) {
					try {
						s(r.next(e));
					} catch (e) {
						i(e);
					}
				}

				function c(e) {
					try {
						s(r.throw(e));
					} catch (e) {
						i(e);
					}
				}

				function s(e) {
					var n;
					e.done ? o(e.value) : (n = e.value,
						n instanceof t ? n : new t((function (e) {
							e(n);
						}
						))).then(a, c);
				}

				s((r = r.apply(e, n || [])).next());
			}
			));
		}, m = function (e, n) {
			var t, r, o, i, a = {
				label: 0,
				sent: function () {
					if (1 & o[0])
						throw o[1];
					return o[1];
				},
				trys: [],
				ops: []
			};
			return i = {
				next: c(0),
				throw: c(1),
				return: c(2)
			},
				"function" == typeof Symbol && (i[Symbol.iterator] = function () {
					return this;
				}
				),
				i;

			function c(i) {
				return function (c) {
					return function (i) {
						if (t)
							throw new TypeError("Generator is already executing.");
						for (; a;)
							try {
								if (t = 1,
									r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
										0) : r.next) && !(o = o.call(r, i[1])).done)
									return o;
								switch (r = 0,
								o && (i = [2 & i[0], o.value]),
								i[0]) {
									case 0:
									case 1:
										o = i;
										break;
									case 4:
										return a.label++,
										{
											value: i[1],
											done: !1
										};
									case 5:
										a.label++,
											r = i[1],
											i = [0];
										continue;
									case 7:
										i = a.ops.pop(),
											a.trys.pop();
										continue;
									default:
										if (!(o = a.trys,
											(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
											a = 0;
											continue;
										}
										if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
											a.label = i[1];
											break;
										}
										if (6 === i[0] && a.label < o[1]) {
											a.label = o[1],
												o = i;
											break;
										}
										if (o && a.label < o[2]) {
											a.label = o[2],
												a.ops.push(i);
											break;
										}
										o[2] && a.ops.pop(),
											a.trys.pop();
										continue;
								}
								i = n.call(e, a);
							} catch (e) {
								i = [6, e],
									r = 0;
							} finally {
								t = o = 0;
							}
						if (5 & i[0])
							throw i[1];
						return {
							value: i[0] ? i[1] : void 0,
							done: !0
						};
					}([i, c]);
				};
			}
		};

		function p(e) {
			var n, t, r, o, i;
			return d(this, void 0, void 0, (function () {
				var a, c, s;
				return m(this, (function (l) {
					switch (l.label) {
						case 0:
							return [4, Object(u.a)()];
						case 1:
							return a = l.sent(),
								c = a.userId,
								s = a.domainId,
								a.hasAssumeRoleFlag && (s = null === (r = null === (t = null === (n = a.assumedInfo) || void 0 === n ? void 0 : n.loginUserAccount) || void 0 === t ? void 0 : t.domain) || void 0 === r ? void 0 : r.id,
									c = null === (i = null === (o = a.assumedInfo) || void 0 === o ? void 0 : o.loginUserAccount) || void 0 === i ? void 0 : i.id),
								[2, h(c, s, e)];
					}
				}
				));
			}
			));
		}

		function h(e, n, t) {
			return r || (r = s.getSamlDatas(e, n, t)),
				r;
		}

		function g(e, n) {
			return d(this, void 0, void 0, (function () {
				return m(this, (function (t) {
					switch (t.label) {
						case 0:
							return [4, p(n)];
						case 1:
							return [2, t.sent().find((function (n) {
								return n.regionId === e;
							}
							))];
					}
				}
				));
			}
			));
		}

		function v(e, n, t) {
			var r, o;
			return d(this, void 0, void 0, (function () {
				var i, a, c, s, d, p, h, v;
				return m(this, (function (m) {
					switch (m.label) {
						case 0:
							if (!e || !n)
								return [2, ""];
							m.label = 1;
						case 1:
							return m.trys.push([1, 5, , 6]),
								[4, Object(u.a)()];
						case 2:
							return i = m.sent(),
								[4, Object(f.d)()];
						case 3:
							return a = m.sent().regions,
								c = i.name,
								i.hasAssumeRoleFlag && (c = null === (o = null === (r = i.assumedInfo) || void 0 === r ? void 0 : r.loginUserAccount) || void 0 === o ? void 0 : o.name),
								c = encodeURIComponent(c),
								[4, g(n, a)];
						case 4:
							return s = m.sent(),
								d = s.userId,
								p = s.domainId,
								h = s.authUrl,
								v = l.a.genHWSHref(e, !1, {
									region: encodeURIComponent(t) || ""
								}),
								v = l.a.addOrReplaceUrlParameter(v, "agencyId", d),
								v = encodeURIComponent(v),
								p && h ? [2, "https://" + h + "/authui/federation/websso?domain_id=" + p + "&idp=" + p + "&protocol=saml&name=" + c + "&service=" + v] : [2, ""];
						case 5:
							return m.sent(),
								[2, ""];
						case 6:
							return [2];
					}
				}
				));
			}
			));
		}
	}
	, function (e, n, t) {
		"use strict";

		function r(e, n) {
			void 0 === e && (e = "div"),
				void 0 === n && (n = document.body);
			var t = document.createElement(e);
			return n.appendChild(t),
				t;
		}

		function o(e) {
			e && e.parentNode && e.parentNode.removeChild(e);
		}

		t.d(n, "a", (function () {
			return r;
		}
		)),
			t.d(n, "b", (function () {
				return o;
			}
			));
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(117);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(135);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return u;
		}
		));
		var r = t(4)
			, o = function () {
			}
			, i = t(3)
			, a = t(2)
			, c = t(1)
			, s = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}
			, l = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}
			, u = function () {
				function e() {
				}

				return e.getLoginUserRequest = function () {
					var e, n, t = a.a.getCookie("changeAgency"), o = a.a.getCookie("projectAgency"),
						s = a.a.getCookie("userAgency");
					t = t && "-1" !== String(t) ? t : null,
						o = o && "-1" !== String(o) ? o : null,
						s = s && "-1" !== String(s) ? s : null;
					var l = {
						url: i.a.getAppWebPath() + "/rest/me",
						timeout: 6e4
					}
						, u = {};
					return o && (u.projectName = o,
						u.AgencyId = c.a.getUrlParameter("agencyId") || (null === (e = window.cf2_userinfo) || void 0 === e ? void 0 : e.id) || (null === (n = window.moCfUserCache) || void 0 === n ? void 0 : n.userId) || ""),
						t && (u["Token-Refresh"] = "true",
							u["X-Frame-Target-User"] = s),
						l.headers = u,
						r.a.get(l);
				}
					,
					e.getVDCUserRequest = function (e) {
						var n = {
							url: {
								s: i.a.getAppWebPath() + "/goku/rest/vdc-server/v3/users/{user_id}/basic-info",
								o: {
									user_id: e.user_id
								}
							},
							timeout: 6e4,
							headers: e.header
						};
						return r.a.get(n);
					}
					,
					e.getUser = function (e) {
						return void 0 === e && (e = !1),
							s(this, void 0, void 0, (function () {
								return l(this, (function (n) {
									switch (n.label) {
										case 0:
											return e && (this.cfUser = null),
												this.cfUser && !e ? [3, 3] : (this.userPromise && !e || (this.userPromise = this.getLoginUserRequest()),
													[4, this.getLoginUser(e)]);
										case 1:
											return n.sent(),
												[4, this.getVDCUser()];
										case 2:
											n.sent(),
												n.label = 3;
										case 3:
											return [2, this.cfUser];
									}
								}
								));
							}
							));
					}
					,
					e.getLoginUser = function (e) {
						return void 0 === e && (e = !1),
							s(this, void 0, void 0, (function () {
								var n = this;
								return l(this, (function (t) {
									return e && (this.cfUser = null),
										!this.cfUser || e ? (this.userPromise || (this.userPromise = this.getLoginUserRequest()),
											this.simplifiedUserPromise && !e || (this.simplifiedUserPromise = new Promise((function (e) {
												n.userPromise.then((function (t) {
													return n.cfUser || (n.initCfUserBaseInfo(t),
														n.initCfUserRoles(t)),
														e(n.cfUser);
												}
												));
											}
											))),
											[2, this.simplifiedUserPromise]) : [2];
								}
								));
							}
							));
					}
					,
					e.initCfUserBaseInfo = function (e) {
						if (e)
							if (this.cfUser || (this.cfUser = new o),
								a.a.getCookie("changeAgency") && (a.a.setParentCookie("changeAgency", "-1"),
									a.a.setParentCookie("projectAgency", "-1"),
									a.a.setParentCookie("userAgency", "-1")),
								this.cfUser.userId = e.userId,
								this.cfUser.name = e.name,
								this.cfUser.domainId = e.domainId,
								this.cfUser.domainName = e.domainName,
								this.cfUser.projectId = e.projectId,
								this.cfUser.projectName = e.region,
								this.cfUser.xDomainType = e.xDomainType,
								this.cfUser.region = e.region,
								this.cfUser.supportRegions = e.supportRegions,
								this.cfUser.extProjects = e.extProjects,
								this.cfUser.manageOneVersion = e.manageOneVersion,
								e.assumedBy && e.assumedBy.id && e.assumedBy.id !== e.id) {
								this.cfUser.isLoginUserFlag = !1,
									this.cfUser.hasAssumeRoleFlag = !0,
									this.cfUser.assumedInfo = {
										loginUserAccount: e.assumedBy,
										assumeRoles: []
									};
								var n = this.cfUser.name.indexOf("/");
								n > 0 && (this.cfUser.company = this.cfUser.name.substring(n + 1),
									this.cfUser.shortName = this.cfUser.name.substring(0, n));
							} else
								this.cfUser.isLoginUserFlag = !0,
									this.cfUser.hasAssumeRoleFlag = !1;
					}
					,
					e.queryResourceProjects = function (e) {
						return s(this, void 0, void 0, (function () {
							var n = this;
							return l(this, (function (t) {
								return [2, new Promise((function (t) {
									var r = {
										userId: e,
										params: {
											is_shared: !0,
											start: n.resourceStart,
											limit: 100
										}
									};
									n.getResourceProjects(r).then((function (o) {
										if (o && o.total > 0) {
											var i = o.projects || [];
											return n.resourceProjects = n.resourceProjects.concat(i),
												o.total > n.resourceProjects.length ? (n.resourceStart += r.params.limit,
													n.queryResourceProjects(e),
													t("")) : (n.setExtProjects(),
														t(""));
										}
										return n.cfUser.extProjects = {
											projects: [],
											roles: []
										},
											t("");
									}
									), (function (e) {
										return n.cfUser.extProjects = {
											projects: [],
											roles: []
										},
											t("");
									}
									));
								}
								))];
							}
							));
						}
						));
					}
					,
					e.getResourceProjects = function (e) {
						var n = {
							url: {
								s: i.a.getAppWebPath() + "/goku/rest/vdc-server/v3/users/{user_id}/projects",
								o: {
									user_id: e.userId
								}
							},
							params: e.params,
							timeout: 6e4
						};
						return r.a.get(n);
					}
					,
					e.setExtProjects = function () {
						var e = i.a.getExtProjectsProjectsRoles()
							, n = {
								roles: []
							};
						this.cfUser.userRoles.length > 0 && (n.roles = this.cfUser.userRoles.map((function (e) {
							return {
								name: e
							};
						}
						)));
						var t = this.rolesNumberConcat(e, n)
							, r = {
								projects: [{
									id: this.cfUser.projectId,
									name: this.cfUser.region,
									roles: t
								}],
								roles: e
							}
							, o = this;
						this.resourceProjects.length > 0 && this.resourceProjects.forEach((function (n) {
							var t = o.rolesNumberConcat(e, n);
							r.projects.push({
								id: n.id,
								name: n.name,
								roles: t
							});
						}
						));
						var a = {};
						r.projects && r.projects.length > 0 && (r.projects = r.projects && r.projects.filter((function (e) {
							return !a[e.id] && (a[e.id] = !0,
								!0);
						}
						))),
							this.cfUser.extProjects = r;
					}
					,
					e.rolesNumberConcat = function (e, n) {
						var t = "";
						return n.roles && n.roles.length > 0 ? e.map((function (e) {
							var r = n.roles.findIndex((function (n) {
								return n.name === e;
							}
							));
							t += r >= 0 ? "1" : "0";
						}
						)) : t = "0000",
							t;
					}
					,
					e.getVDCUser = function (e) {
						return void 0 === e && (e = !1),
							s(this, void 0, void 0, (function () {
								var n, t = this;
								return l(this, (function (r) {
									return e && (this.cfUser = null),
										this.cfUser ? (n = "",
											n = this.cfUser.hasAssumeRoleFlag ? this.cfUser.assumedInfo.loginUserAccount.id : this.cfUser.userId,
											this.vdcUserPromise && !e || (this.vdcUserPromise = new Promise((function (e) {
												t.getVDCUserRequest({
													user_id: n
												}).then((function (n) {
													return t.initVdcUserInfo(n),
														e(t.cfUser);
												}
												)).catch((function () {
													return t.cfUser.ifIamUser = !0,
														e(t.cfUser);
												}
												));
											}
											))),
											this.vdcProjectPromise && !e || (this.vdcProjectPromise = new Promise((function (e) {
												if (t.cfUser.extProjects)
													return e(!0);
												t.resourceStart = 0,
													t.resourceProjects = [],
													t.queryResourceProjects(n).then((function (n) {
														return e(n);
													}
													));
											}
											))),
											[2, Promise.all([this.vdcUserPromise, this.vdcProjectPromise])]) : [2];
								}
								));
							}
							));
					}
					,
					e.initVdcUserInfo = function (e) {
						var n, t, r, o, i;
						e && (this.cfUser.displayName = null === (n = null == e ? void 0 : e.user) || void 0 === n ? void 0 : n.display_name,
							this.cfUser.vdcId = null === (t = null == e ? void 0 : e.user) || void 0 === t ? void 0 : t.vdc_id,
							this.cfUser.topVdcId = null === (r = null == e ? void 0 : e.user) || void 0 === r ? void 0 : r.top_vdc_id,
							this.cfUser.vdcLevel = null === (o = null == e ? void 0 : e.user) || void 0 === o ? void 0 : o.level,
							this.cfUser.federationRegions = null == e ? void 0 : e.federation_regions,
							this.cfUser.sm_tag = null === (i = null == e ? void 0 : e.user) || void 0 === i ? void 0 : i.sm_tag,
							this.cfUser.hasAssumeRoleFlag && (this.cfUser.assumedInfo.projects = null == e ? void 0 : e.user.projects));
					}
					,
					e.initCfUserRoles = function (e) {
						if (e && (this.cfUser.userRoles = Array.isArray(e.roles) ? e.roles : [],
							this.cfUser.cftk = e.cftk,
							this.cfUser.userRoles.includes("mo_agency"))) {
							["#/userCenter/manager/userSetting", "#/agencyManager"].includes(window.location.hash) || c.a.gotoAgencyMgr();
						}
					}
					,
					e.resourceStart = 0,
					e.resourceProjects = [],
					e;
			}();
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(118);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(120);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(137);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";
		(function (n) {
			var r = t(12)
				, o = t(82)
				, i = t(62)
				, a = {
					"Content-Type": "application/x-www-form-urlencoded"
				};

			function c(e, n) {
				!r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = n);
			}

			var s, l = {
				transitional: {
					silentJSONParsing: !0,
					forcedJSONParsing: !0,
					clarifyTimeoutError: !1
				},
				adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== n && "[object process]" === Object.prototype.toString.call(n)) && (s = t(63)),
					s),
				transformRequest: [function (e, n) {
					return o(n, "Accept"),
						o(n, "Content-Type"),
						r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (c(n, "application/x-www-form-urlencoded;charset=utf-8"),
							e.toString()) : r.isObject(e) || n && "application/json" === n["Content-Type"] ? (c(n, "application/json"),
								function (e, n, t) {
									if (r.isString(e))
										try {
											return (n || JSON.parse)(e),
												r.trim(e);
										} catch (e) {
											if ("SyntaxError" !== e.name)
												throw e;
										}
									return (t || JSON.stringify)(e);
								}(e)) : e;
				}
				],
				transformResponse: [function (e) {
					var n = this.transitional || l.transitional
						, t = n && n.silentJSONParsing
						, o = n && n.forcedJSONParsing
						, a = !t && "json" === this.responseType;
					if (a || o && r.isString(e) && e.length)
						try {
							return JSON.parse(e);
						} catch (e) {
							if (a) {
								if ("SyntaxError" === e.name)
									throw i(e, this, "E_JSON_PARSE");
								throw e;
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
				validateStatus: function (e) {
					return e >= 200 && e < 300;
				},
				headers: {
					common: {
						Accept: "application/json, text/plain, */*"
					}
				}
			};
			r.forEach(["delete", "get", "head"], (function (e) {
				l.headers[e] = {};
			}
			)),
				r.forEach(["post", "put", "patch"], (function (e) {
					l.headers[e] = r.merge(a);
				}
				)),
				e.exports = l;
		}
		).call(this, t(81));
	}
	, function (e, n, t) {
		"use strict";

		function r(e) {
			this.message = e;
		}

		r.prototype.toString = function () {
			return "Cancel" + (this.message ? ": " + this.message : "");
		}
			,
			r.prototype.__CANCEL__ = !0,
			e.exports = r;
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return u;
		}
		));
		var r = t(4)
			, o = t(3)
			, i = function () {
				return (i = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			}
			, a = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}
			, c = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}
			, s = function (e, n) {
				var t = {};
				for (var r in e)
					Object.prototype.hasOwnProperty.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
				if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
					var o = 0;
					for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
						n.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (t[r[o]] = e[r[o]]);
				}
				return t;
			}
			, l = function () {
			}
			, u = function () {
				function e() {
				}

				return e.getLinksRequest = function (e) {
					var n = {};
					e.regionId ? n.region = e.regionId : n.mode = "all";
					var t = {
						url: o.a.getAppWebPath() + "/rest/silvan/rest/v1.0/links",
						params: n,
						timeout: 6e4
					};
					return r.a.get(t);
				}
					,
					e.getLinks = function (n) {
						return a(this, void 0, void 0, (function () {
							return c(this, (function (t) {
								switch (t.label) {
									case 0:
										return e.cfLinks && !n.noCache ? [3, 2] : [4, e.initAllLinks(n)];
									case 1:
										t.sent(),
											t.label = 2;
									case 2:
										return [2, e.cfLinks];
								}
							}
							));
						}
						));
					}
					,
					e.initAllLinks = function (n) {
						return a(this, void 0, void 0, (function () {
							var t, r, o, i;
							return c(this, (function (a) {
								switch (a.label) {
									case 0:
										return e.cfLinks = new l,
											e.linksPromise && !n.noCache || (e.linksPromise = e.getLinksRequest(n)),
											[4, e.linksPromise];
									case 1:
										t = a.sent();
										try {
											if (t && t.links) {
												for (r = {},
													o = "",
													i = 0; i < t.links.length; i++)
													o = t.links[i].key + "_" + t.links[i].type,
														r[o] = t.links[i].href;
												e.cfLinks.links = r,
													e.cfLinks.tempLinks = t.links;
											}
										} catch (n) {
											e.cfLinks.cfLinksInterfaceFailFlag = !0;
										}
										return [2];
								}
							}
							));
						}
						));
					}
					,
					e.getRegionLinks = function (n) {
						return a(this, void 0, void 0, (function () {
							var t, r, o;
							return c(this, (function (a) {
								switch (a.label) {
									case 0:
										return a.trys.push([0, 2, , 3]),
											t = {},
											n && (t.regionId = n),
											[4, e.getLinksRequest(t)];
									case 1:
										return r = a.sent(),
											o = [],
											(null == r ? void 0 : r.links) && r.links.forEach((function (e) {
												var n = e.key
													, t = e.type
													, r = s(e, ["key", "type"])
													, a = i({
														linkKey: n + "_" + t,
														key: n,
														type: t
													}, r);
												o.push(a);
											}
											)),
											[2, o];
									case 2:
										return a.sent(),
											[2, []];
									case 3:
										return [2];
								}
							}
							));
						}
						));
					}
					,
					e;
			}();
	}
	, function (e, n, t) {
		"use strict";
		t.d(n, "a", (function () {
			return i;
		}
		));
		var r, o = t(45);

		function i(e) {
			return function (e) {
				r && !e.noCache || (r = o.a.getLinks(e));
				return r;
			}(e);
		}
	}
	, function (e, n, t) {
		"use strict";
		var r = t(0)
			, o = t.n(r)
			, i = t(22)
			, a = t.n(i)
			, c = t(1)
			, s = t(36)
			, l = t(16)
			, u = t(17)
			, f = function () {
				return (f = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			}
			, d = function (e, n) {
				var t = {};
				for (var r in e)
					Object.prototype.hasOwnProperty.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
				if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
					var o = 0;
					for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
						n.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (t[r[o]] = e[r[o]]);
				}
				return t;
			}
			, m = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, p = []
			, h = c.a.getClass(a.a);

		function g(e, n) {
			var t = Object(s.a)("div");

			function r(e, n) {
				var r, i = Object(u.b)(), a = (r = n.children,
					function (e) {
						return o.a.createElement(r, f({}, e));
					}
				);
				Object(l.render)(o.a.createElement(v, f({
					intl: i.intl,
					type: e,
					visible: void 0
				}, n), n.children ? o.a.createElement(a, f({
					intl: i.intl
				}, n)) : ""), t);
			}

			function i() {
				Object(s.b)(t);
			}

			return "init" !== e && r(e, n),
				p.push(i),
			{
				destroy: i,
				update: function (e) {
					var n = e.type
						, o = d(e, ["type"]);
					Object(l.render)(null, t),
						r(n, o);
				}
			};
		}

		function v(e) {
			var n = e.intl
				, t = e.visible
				, i = e.type
				, c = e.title
				, s = e.content
				, l = e.closable
				, u = e.width
				, f = void 0 === u ? 400 : u
				, d = e.okBtnVisible
				, p = void 0 === d || d
				, g = e.okText
				, v = void 0 === g ? n.get({
					id: "console_term_loginSessionExpiredHasOk_label"
				}) : g
				, y = e.onOk
				, x = e.cancelBtnVisible
				, k = void 0 === x || x
				, S = e.cancelText
				, E = void 0 === S ? n.get({
					id: "console_term_loginSessionExpiredHasCancel_label"
				}) : S
				, C = e.onCancel
				, A = e.focused
				, I = e.okBtnId
				, T = e.cancelBtnId
				, P = e.children
				, O = m(Object(r.useState)(!0), 2)
				, _ = O[0]
				, j = O[1];
			if (!1 === t || !_)
				return null;
			return o.a.createElement("div", (() => ({
				className: h("cf-modal cf-fade cf-in")
			}))(), o.a.createElement("div", {
				className: a.a["cf-modal-shadow"]
			}), o.a.createElement("div", {
				className: h("cf-modal-dialog"),
				style: {
					width: f
				}
			}, o.a.createElement("div", {
				className: a.a["cf-modal-content"]
			}, o.a.createElement("div", {
				className: h("cf-modal-header")
			}, o.a.createElement("span", {
				"data-testid": "mo-cf-component-modal-close-btn",
				className: h("cf-icon-close " + (l ? "" : "cf-icon-close-hide")),
				onClick: function () {
					C && C(),
						void 0 === t && j((function (e) {
							return !e;
						}
						));
				}
			}), o.a.createElement(w, {
				type: i
			}), o.a.createElement("span", {
				className: a.a["cf-modal-title"]
			}, c)), o.a.createElement("div", {
				className: a.a["cf-modal-body"]
			}, o.a.createElement("div", {
				className: a.a["cf-msg-content-wrapper"]
			}, o.a.createElement("div", {
				className: a.a["cf-console-modal-content"]
			}, o.a.createElement("p", null, s), P))), o.a.createElement("div", {
				className: a.a["cf-modal-footer"]
			}, o.a.createElement(b, {
				visible: p,
				autoFocus: "ok" === A,
				buttonClass: h("cf-btn cf-btn-ok " + ("ok" === A ? "cf-btn-fouce" : "")),
				id: I,
				onClick: function (e) {
					y && y(e),
						void 0 === t && j((function (e) {
							return !e;
						}
						));
				},
				buttonText: v
			}), o.a.createElement(b, {
				visible: k,
				autoFocus: "cancel" === A,
				buttonClass: h("cf-btn cf-btn-cancel " + ("cancel" === A ? "cf-btn-fouce" : "")),
				id: T,
				onClick: function (e) {
					C && C(e),
						void 0 === t && j((function (e) {
							return !e;
						}
						));
				},
				buttonText: E
			})))));
		}

		function b(e) {
			var n = e.visible
				, t = e.autoFocus
				, r = e.buttonClass
				, i = e.id
				, a = e.onClick
				, c = e.buttonText;
			if (!n)
				return null;
			var s = {};
			return t && Object.assign(s, {
				autoFocus: t
			}),
				a && Object.assign(s, {
					onClick: a
				}),
				i && Object.assign(s, {
					id: i
				}),
				o.a.createElement("button", f({
					type: "button",
					className: r
				}, s), c);
		}

		function w(e) {
			var n = e.type;
			return o.a.createElement("span", {
				className: a.a["cf-msg-icon"] + " " + function (e) {
					return {
						error: "cf-icon-status-fail-big",
						warn: "cf-icon-status-exception-large-warn"
					}[e] || "cf-icon-status-" + e;
				}(n)
			});
		}

		v.info = function (e) {
			return g("info", e || {});
		}
			,
			v.warn = function (e) {
				return g("warn", e || {});
			}
			,
			v.error = function (e) {
				return g("error", e || {});
			}
			,
			v.success = function (e) {
				return g("success", e || {});
			}
			,
			v.destroyAll = function () {
				p.forEach((function (e) {
					return e();
				}
				));
			}
			,
			v.init = function () {
				return g("init", {});
			}
			,
			n.a = v;
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(109);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(111);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(116);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(119);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(131);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";
		e.exports = function (e, n) {
			return n || (n = {}),
				"string" != typeof (e = e && e.__esModule ? e.default : e) ? e : (/^['"].*['"]$/.test(e) && (e = e.slice(1, -1)),
					n.hash && (e += n.hash),
					/["'() \t\n]/.test(e) || n.needQuotes ? "\"".concat(e.replace(/"/g, "\\\"").replace(/\n/g, "\\n"), "\"") : e);
		};
	}
	, function (e, n, t) {
		"use strict";
		e.exports = t(95);
	}
	, function (e, n, t) {
		"use strict";
		var r = t(54)
			, o = {
				childContextTypes: !0,
				contextType: !0,
				contextTypes: !0,
				defaultProps: !0,
				displayName: !0,
				getDefaultProps: !0,
				getDerivedStateFromError: !0,
				getDerivedStateFromProps: !0,
				mixins: !0,
				propTypes: !0,
				type: !0
			}
			, i = {
				name: !0,
				length: !0,
				prototype: !0,
				caller: !0,
				callee: !0,
				arguments: !0,
				arity: !0
			}
			, a = {
				$$typeof: !0,
				compare: !0,
				defaultProps: !0,
				displayName: !0,
				propTypes: !0,
				type: !0
			}
			, c = {};

		function s(e) {
			return r.isMemo(e) ? a : c[e.$$typeof] || o;
		}

		c[r.ForwardRef] = {
			$$typeof: !0,
			render: !0,
			defaultProps: !0,
			displayName: !0,
			propTypes: !0
		},
			c[r.Memo] = a;
		var l = Object.defineProperty
			, u = Object.getOwnPropertyNames
			, f = Object.getOwnPropertySymbols
			, d = Object.getOwnPropertyDescriptor
			, m = Object.getPrototypeOf
			, p = Object.prototype;
		e.exports = function e(n, t, r) {
			if ("string" != typeof t) {
				if (p) {
					var o = m(t);
					o && o !== p && e(n, o, r);
				}
				var a = u(t);
				f && (a = a.concat(f(t)));
				for (var c = s(n), h = s(t), g = 0; g < a.length; ++g) {
					var v = a[g];
					if (!(i[v] || r && r[v] || h && h[v] || c && c[v])) {
						var b = d(t, v);
						try {
							l(n, v, b);
						} catch (e) {
						}
					}
				}
			}
			return n;
		};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(107);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(112);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(113);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(127);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";
		e.exports = function (e, n) {
			return function () {
				for (var t = new Array(arguments.length), r = 0; r < t.length; r++)
					t[r] = arguments[r];
				return e.apply(n, t);
			};
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12);

		function o(e) {
			return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
		}

		e.exports = function (e, n, t) {
			if (!n)
				return e;
			var i;
			if (t)
				i = t(n);
			else if (r.isURLSearchParams(n))
				i = n.toString();
			else {
				var a = [];
				r.forEach(n, (function (e, n) {
					null != e && (r.isArray(e) ? n += "[]" : e = [e],
						r.forEach(e, (function (e) {
							r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)),
								a.push(o(n) + "=" + o(e));
						}
						)));
				}
				)),
					i = a.join("&");
			}
			if (i) {
				var c = e.indexOf("#");
				-1 !== c && (e = e.slice(0, c)),
					e += (-1 === e.indexOf("?") ? "?" : "&") + i;
			}
			return e;
		};
	}
	, function (e, n, t) {
		"use strict";
		e.exports = function (e, n, t, r, o) {
			return e.config = n,
				t && (e.code = t),
				e.request = r,
				e.response = o,
				e.isAxiosError = !0,
				e.toJSON = function () {
					return {
						message: this.message,
						name: this.name,
						description: this.description,
						number: this.number,
						fileName: this.fileName,
						lineNumber: this.lineNumber,
						columnNumber: this.columnNumber,
						stack: this.stack,
						config: this.config,
						code: this.code,
						status: this.response && this.response.status ? this.response.status : null
					};
				}
				,
				e;
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12)
			, o = t(83)
			, i = t(84)
			, a = t(61)
			, c = t(85)
			, s = t(88)
			, l = t(89)
			, u = t(64)
			, f = t(43)
			, d = t(44);
		e.exports = function (e) {
			return new Promise((function (n, t) {
				var m, p = e.data, h = e.headers, g = e.responseType;

				function v() {
					e.cancelToken && e.cancelToken.unsubscribe(m),
						e.signal && e.signal.removeEventListener("abort", m);
				}

				r.isFormData(p) && delete h["Content-Type"];
				var b = new XMLHttpRequest;
				if (e.auth) {
					var w = e.auth.username || ""
						, y = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
					h.Authorization = "Basic " + btoa(w + ":" + y);
				}
				var x = c(e.baseURL, e.url);

				function k() {
					if (b) {
						var r = "getAllResponseHeaders" in b ? s(b.getAllResponseHeaders()) : null
							, i = {
								data: g && "text" !== g && "json" !== g ? b.response : b.responseText,
								status: b.status,
								statusText: b.statusText,
								headers: r,
								config: e,
								request: b
							};
						o((function (e) {
							n(e),
								v();
						}
						), (function (e) {
							t(e),
								v();
						}
						), i),
							b = null;
					}
				}

				if (b.open(e.method.toUpperCase(), a(x, e.params, e.paramsSerializer), !0),
					b.timeout = e.timeout,
					"onloadend" in b ? b.onloadend = k : b.onreadystatechange = function () {
						b && 4 === b.readyState && (0 !== b.status || b.responseURL && 0 === b.responseURL.indexOf("file:")) && setTimeout(k);
					}
					,
					b.onabort = function () {
						b && (t(u("Request aborted", e, "ECONNABORTED", b)),
							b = null);
					}
					,
					b.onerror = function () {
						t(u("Network Error", e, null, b)),
							b = null;
					}
					,
					b.ontimeout = function () {
						var n = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded"
							, r = e.transitional || f.transitional;
						e.timeoutErrorMessage && (n = e.timeoutErrorMessage),
							t(u(n, e, r.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", b)),
							b = null;
					}
					,
					r.isStandardBrowserEnv()) {
					var S = (e.withCredentials || l(x)) && e.xsrfCookieName ? i.read(e.xsrfCookieName) : void 0;
					S && (h[e.xsrfHeaderName] = S);
				}
				"setRequestHeader" in b && r.forEach(h, (function (e, n) {
					void 0 === p && "content-type" === n.toLowerCase() ? delete h[n] : b.setRequestHeader(n, e);
				}
				)),
					r.isUndefined(e.withCredentials) || (b.withCredentials = !!e.withCredentials),
					g && "json" !== g && (b.responseType = e.responseType),
					"function" == typeof e.onDownloadProgress && b.addEventListener("progress", e.onDownloadProgress),
					"function" == typeof e.onUploadProgress && b.upload && b.upload.addEventListener("progress", e.onUploadProgress),
					(e.cancelToken || e.signal) && (m = function (e) {
						b && (t(!e || e && e.type ? new d("canceled") : e),
							b.abort(),
							b = null);
					}
						,
						e.cancelToken && e.cancelToken.subscribe(m),
						e.signal && (e.signal.aborted ? m() : e.signal.addEventListener("abort", m))),
					p || (p = null),
					b.send(p);
			}
			));
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(62);
		e.exports = function (e, n, t, o, i) {
			var a = new Error(e);
			return r(a, n, t, o, i);
		};
	}
	, function (e, n, t) {
		"use strict";
		e.exports = function (e) {
			return !(!e || !e.__CANCEL__);
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12);
		e.exports = function (e, n) {
			n = n || {};
			var t = {};

			function o(e, n) {
				return r.isPlainObject(e) && r.isPlainObject(n) ? r.merge(e, n) : r.isPlainObject(n) ? r.merge({}, n) : r.isArray(n) ? n.slice() : n;
			}

			function i(t) {
				return r.isUndefined(n[t]) ? r.isUndefined(e[t]) ? void 0 : o(void 0, e[t]) : o(e[t], n[t]);
			}

			function a(e) {
				if (!r.isUndefined(n[e]))
					return o(void 0, n[e]);
			}

			function c(t) {
				return r.isUndefined(n[t]) ? r.isUndefined(e[t]) ? void 0 : o(void 0, e[t]) : o(void 0, n[t]);
			}

			function s(t) {
				return t in n ? o(e[t], n[t]) : t in e ? o(void 0, e[t]) : void 0;
			}

			var l = {
				url: a,
				method: a,
				data: a,
				baseURL: c,
				transformRequest: c,
				transformResponse: c,
				paramsSerializer: c,
				timeout: c,
				timeoutMessage: c,
				withCredentials: c,
				adapter: c,
				responseType: c,
				xsrfCookieName: c,
				xsrfHeaderName: c,
				onUploadProgress: c,
				onDownloadProgress: c,
				decompress: c,
				maxContentLength: c,
				maxBodyLength: c,
				transport: c,
				httpAgent: c,
				httpsAgent: c,
				cancelToken: c,
				socketPath: c,
				responseEncoding: c,
				validateStatus: s
			};
			return r.forEach(Object.keys(e).concat(Object.keys(n)), (function (e) {
				var n = l[e] || i
					, o = n(e);
				r.isUndefined(o) && n !== s || (t[e] = o);
			}
			)),
				t;
		};
	}
	, function (e, n) {
		e.exports = {
			version: "0.23.0"
		};
	}
	, function (e, n, t) {
		"use strict";
		/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
		var r = Object.getOwnPropertySymbols
			, o = Object.prototype.hasOwnProperty
			, i = Object.prototype.propertyIsEnumerable;

		function a(e) {
			if (null == e)
				throw new TypeError("Object.assign cannot be called with null or undefined");
			return Object(e);
		}

		e.exports = function () {
			try {
				if (!Object.assign)
					return !1;
				var e = new String("abc");
				if (e[5] = "de",
					"5" === Object.getOwnPropertyNames(e)[0])
					return !1;
				for (var n = {}, t = 0; t < 10; t++)
					n["_" + String.fromCharCode(t)] = t;
				if ("0123456789" !== Object.getOwnPropertyNames(n).map((function (e) {
					return n[e];
				}
				)).join(""))
					return !1;
				var r = {};
				return "abcdefghijklmnopqrst".split("").forEach((function (e) {
					r[e] = e;
				}
				)),
					"abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");
			} catch (e) {
				return !1;
			}
		}() ? Object.assign : function (e, n) {
			for (var t, c, s = a(e), l = 1; l < arguments.length; l++) {
				for (var u in t = Object(arguments[l]))
					o.call(t, u) && (s[u] = t[u]);
				if (r) {
					c = r(t);
					for (var f = 0; f < c.length; f++)
						i.call(t, c[f]) && (s[c[f]] = t[c[f]]);
				}
			}
			return s;
		};
	}
	, function (e, n, t) {
		e.exports = t(76);
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(104);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(106);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(108);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(110);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(130);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(136);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12)
			, o = t(60)
			, i = t(77)
			, a = t(66);
		var c = function e(n) {
			var t = new i(n)
				, c = o(i.prototype.request, t);
			return r.extend(c, i.prototype, t),
				r.extend(c, t),
				c.create = function (t) {
					return e(a(n, t));
				}
				,
				c;
		}(t(43));
		c.Axios = i,
			c.Cancel = t(44),
			c.CancelToken = t(91),
			c.isCancel = t(65),
			c.VERSION = t(67).version,
			c.all = function (e) {
				return Promise.all(e);
			}
			,
			c.spread = t(92),
			c.isAxiosError = t(93),
			e.exports = c,
			e.exports.default = c;
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12)
			, o = t(61)
			, i = t(78)
			, a = t(79)
			, c = t(66)
			, s = t(90)
			, l = s.validators;

		function u(e) {
			this.defaults = e,
				this.interceptors = {
					request: new i,
					response: new i
				};
		}

		u.prototype.request = function (e) {
			"string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {},
				(e = c(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
			var n = e.transitional;
			void 0 !== n && s.assertOptions(n, {
				silentJSONParsing: l.transitional(l.boolean),
				forcedJSONParsing: l.transitional(l.boolean),
				clarifyTimeoutError: l.transitional(l.boolean)
			}, !1);
			var t = []
				, r = !0;
			this.interceptors.request.forEach((function (n) {
				"function" == typeof n.runWhen && !1 === n.runWhen(e) || (r = r && n.synchronous,
					t.unshift(n.fulfilled, n.rejected));
			}
			));
			var o, i = [];
			if (this.interceptors.response.forEach((function (e) {
				i.push(e.fulfilled, e.rejected);
			}
			)),
				!r) {
				var u = [a, void 0];
				for (Array.prototype.unshift.apply(u, t),
					u = u.concat(i),
					o = Promise.resolve(e); u.length;)
					o = o.then(u.shift(), u.shift());
				return o;
			}
			for (var f = e; t.length;) {
				var d = t.shift()
					, m = t.shift();
				try {
					f = d(f);
				} catch (e) {
					m(e);
					break;
				}
			}
			try {
				o = a(f);
			} catch (e) {
				return Promise.reject(e);
			}
			for (; i.length;)
				o = o.then(i.shift(), i.shift());
			return o;
		}
			,
			u.prototype.getUri = function (e) {
				return e = c(this.defaults, e),
					o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");
			}
			,
			r.forEach(["delete", "get", "head", "options"], (function (e) {
				u.prototype[e] = function (n, t) {
					return this.request(c(t || {}, {
						method: e,
						url: n,
						data: (t || {}).data
					}));
				};
			}
			)),
			r.forEach(["post", "put", "patch"], (function (e) {
				u.prototype[e] = function (n, t, r) {
					return this.request(c(r || {}, {
						method: e,
						url: n,
						data: t
					}));
				};
			}
			)),
			e.exports = u;
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12);

		function o() {
			this.handlers = [];
		}

		o.prototype.use = function (e, n, t) {
			return this.handlers.push({
				fulfilled: e,
				rejected: n,
				synchronous: !!t && t.synchronous,
				runWhen: t ? t.runWhen : null
			}),
				this.handlers.length - 1;
		}
			,
			o.prototype.eject = function (e) {
				this.handlers[e] && (this.handlers[e] = null);
			}
			,
			o.prototype.forEach = function (e) {
				r.forEach(this.handlers, (function (n) {
					null !== n && e(n);
				}
				));
			}
			,
			e.exports = o;
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12)
			, o = t(80)
			, i = t(65)
			, a = t(43)
			, c = t(44);

		function s(e) {
			if (e.cancelToken && e.cancelToken.throwIfRequested(),
				e.signal && e.signal.aborted)
				throw new c("canceled");
		}

		e.exports = function (e) {
			return s(e),
				e.headers = e.headers || {},
				e.data = o.call(e, e.data, e.headers, e.transformRequest),
				e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers),
				r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (function (n) {
					delete e.headers[n];
				}
				)),
				(e.adapter || a.adapter)(e).then((function (n) {
					return s(e),
						n.data = o.call(e, n.data, n.headers, e.transformResponse),
						n;
				}
				), (function (n) {
					return i(n) || (s(e),
						n && n.response && (n.response.data = o.call(e, n.response.data, n.response.headers, e.transformResponse))),
						Promise.reject(n);
				}
				));
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12)
			, o = t(43);
		e.exports = function (e, n, t) {
			var i = this || o;
			return r.forEach(t, (function (t) {
				e = t.call(i, e, n);
			}
			)),
				e;
		};
	}
	, function (e, n) {
		var t, r, o = e.exports = {};

		function i() {
			throw new Error("setTimeout has not been defined");
		}

		function a() {
			throw new Error("clearTimeout has not been defined");
		}

		function c(e) {
			if (t === setTimeout)
				return setTimeout(e, 0);
			if ((t === i || !t) && setTimeout)
				return t = setTimeout,
					setTimeout(e, 0);
			try {
				return t(e, 0);
			} catch (n) {
				try {
					return t.call(null, e, 0);
				} catch (n) {
					return t.call(this, e, 0);
				}
			}
		}

		!function () {
			try {
				t = "function" == typeof setTimeout ? setTimeout : i;
			} catch (e) {
				t = i;
			}
			try {
				r = "function" == typeof clearTimeout ? clearTimeout : a;
			} catch (e) {
				r = a;
			}
		}();
		var s, l = [], u = !1, f = -1;

		function d() {
			u && s && (u = !1,
				s.length ? l = s.concat(l) : f = -1,
				l.length && m());
		}

		function m() {
			if (!u) {
				var e = c(d);
				u = !0;
				for (var n = l.length; n;) {
					for (s = l,
						l = []; ++f < n;)
						s && s[f].run();
					f = -1,
						n = l.length;
				}
				s = null,
					u = !1,
					function (e) {
						if (r === clearTimeout)
							return clearTimeout(e);
						if ((r === a || !r) && clearTimeout)
							return r = clearTimeout,
								clearTimeout(e);
						try {
							r(e);
						} catch (n) {
							try {
								return r.call(null, e);
							} catch (n) {
								return r.call(this, e);
							}
						}
					}(e);
			}
		}

		function p(e, n) {
			this.fun = e,
				this.array = n;
		}

		function h() {
		}

		o.nextTick = function (e) {
			var n = new Array(arguments.length - 1);
			if (arguments.length > 1)
				for (var t = 1; t < arguments.length; t++)
					n[t - 1] = arguments[t];
			l.push(new p(e, n)),
				1 !== l.length || u || c(m);
		}
			,
			p.prototype.run = function () {
				this.fun.apply(null, this.array);
			}
			,
			o.title = "browser",
			o.browser = !0,
			o.env = {},
			o.argv = [],
			o.version = "",
			o.versions = {},
			o.on = h,
			o.addListener = h,
			o.once = h,
			o.off = h,
			o.removeListener = h,
			o.removeAllListeners = h,
			o.emit = h,
			o.prependListener = h,
			o.prependOnceListener = h,
			o.listeners = function (e) {
				return [];
			}
			,
			o.binding = function (e) {
				throw new Error("process.binding is not supported");
			}
			,
			o.cwd = function () {
				return "/";
			}
			,
			o.chdir = function (e) {
				throw new Error("process.chdir is not supported");
			}
			,
			o.umask = function () {
				return 0;
			};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12);
		e.exports = function (e, n) {
			r.forEach(e, (function (t, r) {
				r !== n && r.toUpperCase() === n.toUpperCase() && (e[n] = t,
					delete e[r]);
			}
			));
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(64);
		e.exports = function (e, n, t) {
			var o = t.config.validateStatus;
			t.status && o && !o(t.status) ? n(r("Request failed with status code " + t.status, t.config, null, t.request, t)) : e(t);
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12);
		e.exports = r.isStandardBrowserEnv() ? {
			write: function (e, n, t, o, i, a) {
				var c = [];
				c.push(e + "=" + encodeURIComponent(n)),
					r.isNumber(t) && c.push("expires=" + new Date(t).toGMTString()),
					r.isString(o) && c.push("path=" + o),
					r.isString(i) && c.push("domain=" + i),
					!0 === a && c.push("secure"),
					document.cookie = c.join("; ");
			},
			read: function (e) {
				var n = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
				return n ? decodeURIComponent(n[3]) : null;
			},
			remove: function (e) {
				this.write(e, "", Date.now() - 864e5);
			}
		} : {
			write: function () {
			},
			read: function () {
				return null;
			},
			remove: function () {
			}
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(86)
			, o = t(87);
		e.exports = function (e, n) {
			return e && !r(n) ? o(e, n) : n;
		};
	}
	, function (e, n, t) {
		"use strict";
		e.exports = function (e) {
			return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
		};
	}
	, function (e, n, t) {
		"use strict";
		e.exports = function (e, n) {
			return n ? e.replace(/\/+$/, "") + "/" + n.replace(/^\/+/, "") : e;
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12)
			,
			o = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"];
		e.exports = function (e) {
			var n, t, i, a = {};
			return e ? (r.forEach(e.split("\n"), (function (e) {
				if (i = e.indexOf(":"),
					n = r.trim(e.substr(0, i)).toLowerCase(),
					t = r.trim(e.substr(i + 1)),
					n) {
					if (a[n] && o.indexOf(n) >= 0)
						return;
					a[n] = "set-cookie" === n ? (a[n] ? a[n] : []).concat([t]) : a[n] ? a[n] + ", " + t : t;
				}
			}
			)),
				a) : a;
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(12);
		e.exports = r.isStandardBrowserEnv() ? function () {
			var e, n = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a");

			function o(e) {
				var r = e;
				return n && (t.setAttribute("href", r),
					r = t.href),
					t.setAttribute("href", r),
				{
					href: t.href,
					protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
					host: t.host,
					search: t.search ? t.search.replace(/^\?/, "") : "",
					hash: t.hash ? t.hash.replace(/^#/, "") : "",
					hostname: t.hostname,
					port: t.port,
					pathname: "/" === t.pathname.charAt(0) ? t.pathname : "/" + t.pathname
				};
			}

			return e = o(window.location.href),
				function (n) {
					var t = r.isString(n) ? o(n) : n;
					return t.protocol === e.protocol && t.host === e.host;
				};
		}() : function () {
			return !0;
		};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(67).version
			, o = {};
		["object", "boolean", "number", "function", "string", "symbol"].forEach((function (e, n) {
			o[e] = function (t) {
				return typeof t === e || "a" + (n < 1 ? "n " : " ") + e;
			};
		}
		));
		var i = {};
		o.transitional = function (e, n, t) {
			function o(e, n) {
				return "[Axios v" + r + "] Transitional option '" + e + "'" + n + (t ? ". " + t : "");
			}

			return function (t, r, a) {
				if (!1 === e)
					throw new Error(o(r, " has been removed" + (n ? " in " + n : "")));
				return n && !i[r] && (i[r] = !0,
					console.warn(o(r, " has been deprecated since v" + n + " and will be removed in the near future"))),
					!e || e(t, r, a);
			};
		}
			,
			e.exports = {
				assertOptions: function (e, n, t) {
					if ("object" != typeof e)
						throw new TypeError("options must be an object");
					for (var r = Object.keys(e), o = r.length; o-- > 0;) {
						var i = r[o]
							, a = n[i];
						if (a) {
							var c = e[i]
								, s = void 0 === c || a(c, i, e);
							if (!0 !== s)
								throw new TypeError("option " + i + " must be " + s);
						} else if (!0 !== t)
							throw Error("Unknown option " + i);
					}
				},
				validators: o
			};
	}
	, function (e, n, t) {
		"use strict";
		var r = t(44);

		function o(e) {
			if ("function" != typeof e)
				throw new TypeError("executor must be a function.");
			var n;
			this.promise = new Promise((function (e) {
				n = e;
			}
			));
			var t = this;
			this.promise.then((function (e) {
				if (t._listeners) {
					var n, r = t._listeners.length;
					for (n = 0; n < r; n++)
						t._listeners[n](e);
					t._listeners = null;
				}
			}
			)),
				this.promise.then = function (e) {
					var n, r = new Promise((function (e) {
						t.subscribe(e),
							n = e;
					}
					)).then(e);
					return r.cancel = function () {
						t.unsubscribe(n);
					}
						,
						r;
				}
				,
				e((function (e) {
					t.reason || (t.reason = new r(e),
						n(t.reason));
				}
				));
		}

		o.prototype.throwIfRequested = function () {
			if (this.reason)
				throw this.reason;
		}
			,
			o.prototype.subscribe = function (e) {
				this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e];
			}
			,
			o.prototype.unsubscribe = function (e) {
				if (this._listeners) {
					var n = this._listeners.indexOf(e);
					-1 !== n && this._listeners.splice(n, 1);
				}
			}
			,
			o.source = function () {
				var e;
				return {
					token: new o((function (n) {
						e = n;
					}
					)),
					cancel: e
				};
			}
			,
			e.exports = o;
	}
	, function (e, n, t) {
		"use strict";
		e.exports = function (e) {
			return function (n) {
				return e.apply(null, n);
			};
		};
	}
	, function (e, n, t) {
		"use strict";
		e.exports = function (e) {
			return "object" == typeof e && !0 === e.isAxiosError;
		};
	}
	, function (e, n, t) {
		"use strict";
		/** @license React v16.14.0
		 * react.production.min.js
		 *
		 * Copyright (c) Facebook, Inc. and its affiliates.
		 *
		 * This source code is licensed under the MIT license found in the
		 * LICENSE file in the root directory of this source tree.
		 */
		var r = t(68)
			, o = "function" == typeof Symbol && Symbol.for
			, i = o ? Symbol.for("react.element") : 60103
			, a = o ? Symbol.for("react.portal") : 60106
			, c = o ? Symbol.for("react.fragment") : 60107
			, s = o ? Symbol.for("react.strict_mode") : 60108
			, l = o ? Symbol.for("react.profiler") : 60114
			, u = o ? Symbol.for("react.provider") : 60109
			, f = o ? Symbol.for("react.context") : 60110
			, d = o ? Symbol.for("react.forward_ref") : 60112
			, m = o ? Symbol.for("react.suspense") : 60113
			, p = o ? Symbol.for("react.memo") : 60115
			, h = o ? Symbol.for("react.lazy") : 60116
			, g = "function" == typeof Symbol && Symbol.iterator;

		function v(e) {
			for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++)
				n += "&args[]=" + encodeURIComponent(arguments[t]);
			return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
		}

		var b = {
			isMounted: function () {
				return !1;
			},
			enqueueForceUpdate: function () {
			},
			enqueueReplaceState: function () {
			},
			enqueueSetState: function () {
			}
		}
			, w = {};

		function y(e, n, t) {
			this.props = e,
				this.context = n,
				this.refs = w,
				this.updater = t || b;
		}

		function x() {
		}

		function k(e, n, t) {
			this.props = e,
				this.context = n,
				this.refs = w,
				this.updater = t || b;
		}

		y.prototype.isReactComponent = {},
			y.prototype.setState = function (e, n) {
				if ("object" != typeof e && "function" != typeof e && null != e)
					throw Error(v(85));
				this.updater.enqueueSetState(this, e, n, "setState");
			}
			,
			y.prototype.forceUpdate = function (e) {
				this.updater.enqueueForceUpdate(this, e, "forceUpdate");
			}
			,
			x.prototype = y.prototype;
		var S = k.prototype = new x;
		S.constructor = k,
			r(S, y.prototype),
			S.isPureReactComponent = !0;
		var E = {
			current: null
		}
			, C = Object.prototype.hasOwnProperty
			, A = {
				key: !0,
				ref: !0,
				__self: !0,
				__source: !0
			};

		function I(e, n, t) {
			var r, o = {}, a = null, c = null;
			if (null != n)
				for (r in void 0 !== n.ref && (c = n.ref),
					void 0 !== n.key && (a = "" + n.key),
					n)
					C.call(n, r) && !A.hasOwnProperty(r) && (o[r] = n[r]);
			var s = arguments.length - 2;
			if (1 === s)
				o.children = t;
			else if (1 < s) {
				for (var l = Array(s), u = 0; u < s; u++)
					l[u] = arguments[u + 2];
				o.children = l;
			}
			if (e && e.defaultProps)
				for (r in s = e.defaultProps)
					void 0 === o[r] && (o[r] = s[r]);
			return {
				$$typeof: i,
				type: e,
				key: a,
				ref: c,
				props: o,
				_owner: E.current
			};
		}

		function T(e) {
			return "object" == typeof e && null !== e && e.$$typeof === i;
		}

		var P = /\/+/g
			, O = [];

		function _(e, n, t, r) {
			if (O.length) {
				var o = O.pop();
				return o.result = e,
					o.keyPrefix = n,
					o.func = t,
					o.context = r,
					o.count = 0,
					o;
			}
			return {
				result: e,
				keyPrefix: n,
				func: t,
				context: r,
				count: 0
			};
		}

		function j(e) {
			e.result = null,
				e.keyPrefix = null,
				e.func = null,
				e.context = null,
				e.count = 0,
				10 > O.length && O.push(e);
		}

		function N(e, n, t) {
			return null == e ? 0 : function e(n, t, r, o) {
				var c = typeof n;
				"undefined" !== c && "boolean" !== c || (n = null);
				var s = !1;
				if (null === n)
					s = !0;
				else
					switch (c) {
						case "string":
						case "number":
							s = !0;
							break;
						case "object":
							switch (n.$$typeof) {
								case i:
								case a:
									s = !0;
							}
					}
				if (s)
					return r(o, n, "" === t ? "." + R(n, 0) : t),
						1;
				if (s = 0,
					t = "" === t ? "." : t + ":",
					Array.isArray(n))
					for (var l = 0; l < n.length; l++) {
						var u = t + R(c = n[l], l);
						s += e(c, u, r, o);
					}
				else if (null === n || "object" != typeof n ? u = null : u = "function" == typeof (u = g && n[g] || n["@@iterator"]) ? u : null,
					"function" == typeof u)
					for (n = u.call(n),
						l = 0; !(c = n.next()).done;)
						s += e(c = c.value, u = t + R(c, l++), r, o);
				else if ("object" === c)
					throw r = "" + n,
					Error(v(31, "[object Object]" === r ? "object with keys {" + Object.keys(n).join(", ") + "}" : r, ""));
				return s;
			}(e, "", n, t);
		}

		function R(e, n) {
			return "object" == typeof e && null !== e && null != e.key ? function (e) {
				var n = {
					"=": "=0",
					":": "=2"
				};
				return "$" + ("" + e).replace(/[=:]/g, (function (e) {
					return n[e];
				}
				));
			}(e.key) : n.toString(36);
		}

		function L(e, n) {
			e.func.call(e.context, n, e.count++);
		}

		function F(e, n, t) {
			var r = e.result
				, o = e.keyPrefix;
			e = e.func.call(e.context, n, e.count++),
				Array.isArray(e) ? M(e, r, t, (function (e) {
					return e;
				}
				)) : null != e && (T(e) && (e = function (e, n) {
					return {
						$$typeof: i,
						type: e.type,
						key: n,
						ref: e.ref,
						props: e.props,
						_owner: e._owner
					};
				}(e, o + (!e.key || n && n.key === e.key ? "" : ("" + e.key).replace(P, "$&/") + "/") + t)),
					r.push(e));
		}

		function M(e, n, t, r, o) {
			var i = "";
			null != t && (i = ("" + t).replace(P, "$&/") + "/"),
				N(e, F, n = _(n, i, r, o)),
				j(n);
		}

		var U = {
			current: null
		};

		function D() {
			var e = U.current;
			if (null === e)
				throw Error(v(321));
			return e;
		}

		var z = {
			ReactCurrentDispatcher: U,
			ReactCurrentBatchConfig: {
				suspense: null
			},
			ReactCurrentOwner: E,
			IsSomeRendererActing: {
				current: !1
			},
			assign: r
		};
		n.Children = {
			map: function (e, n, t) {
				if (null == e)
					return e;
				var r = [];
				return M(e, r, null, n, t),
					r;
			},
			forEach: function (e, n, t) {
				if (null == e)
					return e;
				N(e, L, n = _(null, null, n, t)),
					j(n);
			},
			count: function (e) {
				return N(e, (function () {
					return null;
				}
				), null);
			},
			toArray: function (e) {
				var n = [];
				return M(e, n, null, (function (e) {
					return e;
				}
				)),
					n;
			},
			only: function (e) {
				if (!T(e))
					throw Error(v(143));
				return e;
			}
		},
			n.Component = y,
			n.Fragment = c,
			n.Profiler = l,
			n.PureComponent = k,
			n.StrictMode = s,
			n.Suspense = m,
			n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = z,
			n.cloneElement = function (e, n, t) {
				if (null == e)
					throw Error(v(267, e));
				var o = r({}, e.props)
					, a = e.key
					, c = e.ref
					, s = e._owner;
				if (null != n) {
					if (void 0 !== n.ref && (c = n.ref,
						s = E.current),
						void 0 !== n.key && (a = "" + n.key),
						e.type && e.type.defaultProps)
						var l = e.type.defaultProps;
					for (u in n)
						C.call(n, u) && !A.hasOwnProperty(u) && (o[u] = void 0 === n[u] && void 0 !== l ? l[u] : n[u]);
				}
				var u = arguments.length - 2;
				if (1 === u)
					o.children = t;
				else if (1 < u) {
					l = Array(u);
					for (var f = 0; f < u; f++)
						l[f] = arguments[f + 2];
					o.children = l;
				}
				return {
					$$typeof: i,
					type: e.type,
					key: a,
					ref: c,
					props: o,
					_owner: s
				};
			}
			,
			n.createContext = function (e, n) {
				return void 0 === n && (n = null),
					(e = {
						$$typeof: f,
						_calculateChangedBits: n,
						_currentValue: e,
						_currentValue2: e,
						_threadCount: 0,
						Provider: null,
						Consumer: null
					}).Provider = {
						$$typeof: u,
						_context: e
					},
					e.Consumer = e;
			}
			,
			n.createElement = I,
			n.createFactory = function (e) {
				var n = I.bind(null, e);
				return n.type = e,
					n;
			}
			,
			n.createRef = function () {
				return {
					current: null
				};
			}
			,
			n.forwardRef = function (e) {
				return {
					$$typeof: d,
					render: e
				};
			}
			,
			n.isValidElement = T,
			n.lazy = function (e) {
				return {
					$$typeof: h,
					_ctor: e,
					_status: -1,
					_result: null
				};
			}
			,
			n.memo = function (e, n) {
				return {
					$$typeof: p,
					type: e,
					compare: void 0 === n ? null : n
				};
			}
			,
			n.useCallback = function (e, n) {
				return D().useCallback(e, n);
			}
			,
			n.useContext = function (e, n) {
				return D().useContext(e, n);
			}
			,
			n.useDebugValue = function () {
			}
			,
			n.useEffect = function (e, n) {
				return D().useEffect(e, n);
			}
			,
			n.useImperativeHandle = function (e, n, t) {
				return D().useImperativeHandle(e, n, t);
			}
			,
			n.useLayoutEffect = function (e, n) {
				return D().useLayoutEffect(e, n);
			}
			,
			n.useMemo = function (e, n) {
				return D().useMemo(e, n);
			}
			,
			n.useReducer = function (e, n, t) {
				return D().useReducer(e, n, t);
			}
			,
			n.useRef = function (e) {
				return D().useRef(e);
			}
			,
			n.useState = function (e) {
				return D().useState(e);
			}
			,
			n.version = "16.14.0";
	}
	, function (e, n, t) {
		"use strict";
		/** @license React v16.13.1
		 * react-is.production.min.js
		 *
		 * Copyright (c) Facebook, Inc. and its affiliates.
		 *
		 * This source code is licensed under the MIT license found in the
		 * LICENSE file in the root directory of this source tree.
		 */
		var r = "function" == typeof Symbol && Symbol.for
			, o = r ? Symbol.for("react.element") : 60103
			, i = r ? Symbol.for("react.portal") : 60106
			, a = r ? Symbol.for("react.fragment") : 60107
			, c = r ? Symbol.for("react.strict_mode") : 60108
			, s = r ? Symbol.for("react.profiler") : 60114
			, l = r ? Symbol.for("react.provider") : 60109
			, u = r ? Symbol.for("react.context") : 60110
			, f = r ? Symbol.for("react.async_mode") : 60111
			, d = r ? Symbol.for("react.concurrent_mode") : 60111
			, m = r ? Symbol.for("react.forward_ref") : 60112
			, p = r ? Symbol.for("react.suspense") : 60113
			, h = r ? Symbol.for("react.suspense_list") : 60120
			, g = r ? Symbol.for("react.memo") : 60115
			, v = r ? Symbol.for("react.lazy") : 60116
			, b = r ? Symbol.for("react.block") : 60121
			, w = r ? Symbol.for("react.fundamental") : 60117
			, y = r ? Symbol.for("react.responder") : 60118
			, x = r ? Symbol.for("react.scope") : 60119;

		function k(e) {
			if ("object" == typeof e && null !== e) {
				var n = e.$$typeof;
				switch (n) {
					case o:
						switch (e = e.type) {
							case f:
							case d:
							case a:
							case s:
							case c:
							case p:
								return e;
							default:
								switch (e = e && e.$$typeof) {
									case u:
									case m:
									case v:
									case g:
									case l:
										return e;
									default:
										return n;
								}
						}
					case i:
						return n;
				}
			}
		}

		function S(e) {
			return k(e) === d;
		}

		n.AsyncMode = f,
			n.ConcurrentMode = d,
			n.ContextConsumer = u,
			n.ContextProvider = l,
			n.Element = o,
			n.ForwardRef = m,
			n.Fragment = a,
			n.Lazy = v,
			n.Memo = g,
			n.Portal = i,
			n.Profiler = s,
			n.StrictMode = c,
			n.Suspense = p,
			n.isAsyncMode = function (e) {
				return S(e) || k(e) === f;
			}
			,
			n.isConcurrentMode = S,
			n.isContextConsumer = function (e) {
				return k(e) === u;
			}
			,
			n.isContextProvider = function (e) {
				return k(e) === l;
			}
			,
			n.isElement = function (e) {
				return "object" == typeof e && null !== e && e.$$typeof === o;
			}
			,
			n.isForwardRef = function (e) {
				return k(e) === m;
			}
			,
			n.isFragment = function (e) {
				return k(e) === a;
			}
			,
			n.isLazy = function (e) {
				return k(e) === v;
			}
			,
			n.isMemo = function (e) {
				return k(e) === g;
			}
			,
			n.isPortal = function (e) {
				return k(e) === i;
			}
			,
			n.isProfiler = function (e) {
				return k(e) === s;
			}
			,
			n.isStrictMode = function (e) {
				return k(e) === c;
			}
			,
			n.isSuspense = function (e) {
				return k(e) === p;
			}
			,
			n.isValidElementType = function (e) {
				return "string" == typeof e || "function" == typeof e || e === a || e === d || e === s || e === c || e === p || e === h || "object" == typeof e && null !== e && (e.$$typeof === v || e.$$typeof === g || e.$$typeof === l || e.$$typeof === u || e.$$typeof === m || e.$$typeof === w || e.$$typeof === y || e.$$typeof === x || e.$$typeof === b);
			}
			,
			n.typeOf = k;
	}
	, function (e, n, t) {
		"use strict";
		/** @license React v16.14.0
		 * react-dom.production.min.js
		 *
		 * Copyright (c) Facebook, Inc. and its affiliates.
		 *
		 * This source code is licensed under the MIT license found in the
		 * LICENSE file in the root directory of this source tree.
		 */
		var r = t(0)
			, o = t(68)
			, i = t(97);

		function a(e) {
			for (var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1; t < arguments.length; t++)
				n += "&args[]=" + encodeURIComponent(arguments[t]);
			return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
		}

		if (!r)
			throw Error(a(227));

		function c(e, n, t, r, o, i, a, c, s) {
			var l = Array.prototype.slice.call(arguments, 3);
			try {
				n.apply(t, l);
			} catch (e) {
				this.onError(e);
			}
		}

		var s = !1
			, l = null
			, u = !1
			, f = null
			, d = {
				onError: function (e) {
					s = !0,
						l = e;
				}
			};

		function m(e, n, t, r, o, i, a, u, f) {
			s = !1,
				l = null,
				c.apply(d, arguments);
		}

		var p = null
			, h = null
			, g = null;

		function v(e, n, t) {
			var r = e.type || "unknown-event";
			e.currentTarget = g(t),
				function (e, n, t, r, o, i, c, d, p) {
					if (m.apply(this, arguments),
						s) {
						if (!s)
							throw Error(a(198));
						var h = l;
						s = !1,
							l = null,
							u || (u = !0,
								f = h);
					}
				}(r, n, void 0, e),
				e.currentTarget = null;
		}

		var b = null
			, w = {};

		function y() {
			if (b)
				for (var e in w) {
					var n = w[e]
						, t = b.indexOf(e);
					if (!(-1 < t))
						throw Error(a(96, e));
					if (!k[t]) {
						if (!n.extractEvents)
							throw Error(a(97, e));
						for (var r in k[t] = n,
							t = n.eventTypes) {
							var o = void 0
								, i = t[r]
								, c = n
								, s = r;
							if (S.hasOwnProperty(s))
								throw Error(a(99, s));
							S[s] = i;
							var l = i.phasedRegistrationNames;
							if (l) {
								for (o in l)
									l.hasOwnProperty(o) && x(l[o], c, s);
								o = !0;
							} else
								i.registrationName ? (x(i.registrationName, c, s),
									o = !0) : o = !1;
							if (!o)
								throw Error(a(98, r, e));
						}
					}
				}
		}

		function x(e, n, t) {
			if (E[e])
				throw Error(a(100, e));
			E[e] = n,
				C[e] = n.eventTypes[t].dependencies;
		}

		var k = []
			, S = {}
			, E = {}
			, C = {};

		function A(e) {
			var n, t = !1;
			for (n in e)
				if (e.hasOwnProperty(n)) {
					var r = e[n];
					if (!w.hasOwnProperty(n) || w[n] !== r) {
						if (w[n])
							throw Error(a(102, n));
						w[n] = r,
							t = !0;
					}
				}
			t && y();
		}

		var I = !("undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement)
			, T = null
			, P = null
			, O = null;

		function _(e) {
			if (e = h(e)) {
				if ("function" != typeof T)
					throw Error(a(280));
				var n = e.stateNode;
				n && (n = p(n),
					T(e.stateNode, e.type, n));
			}
		}

		function j(e) {
			P ? O ? O.push(e) : O = [e] : P = e;
		}

		function N() {
			if (P) {
				var e = P
					, n = O;
				if (O = P = null,
					_(e),
					n)
					for (e = 0; e < n.length; e++)
						_(n[e]);
			}
		}

		function R(e, n) {
			return e(n);
		}

		function L(e, n, t, r, o) {
			return e(n, t, r, o);
		}

		function F() {
		}

		var M = R
			, U = !1
			, D = !1;

		function z() {
			null === P && null === O || (F(),
				N());
		}

		function B(e, n, t) {
			if (D)
				return e(n, t);
			D = !0;
			try {
				return M(e, n, t);
			} finally {
				D = !1,
					z();
			}
		}

		var H = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
			, W = Object.prototype.hasOwnProperty
			, V = {}
			, Q = {};

		function G(e, n, t, r, o, i) {
			this.acceptsBooleans = 2 === n || 3 === n || 4 === n,
				this.attributeName = r,
				this.attributeNamespace = o,
				this.mustUseProperty = t,
				this.propertyName = e,
				this.type = n,
				this.sanitizeURL = i;
		}

		var q = {};
		"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function (e) {
			q[e] = new G(e, 0, !1, e, null, !1);
		}
		)),
			[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach((function (e) {
				var n = e[0];
				q[n] = new G(n, 1, !1, e[1], null, !1);
			}
			)),
			["contentEditable", "draggable", "spellCheck", "value"].forEach((function (e) {
				q[e] = new G(e, 2, !1, e.toLowerCase(), null, !1);
			}
			)),
			["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach((function (e) {
				q[e] = new G(e, 2, !1, e, null, !1);
			}
			)),
			"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function (e) {
				q[e] = new G(e, 3, !1, e.toLowerCase(), null, !1);
			}
			)),
			["checked", "multiple", "muted", "selected"].forEach((function (e) {
				q[e] = new G(e, 3, !0, e, null, !1);
			}
			)),
			["capture", "download"].forEach((function (e) {
				q[e] = new G(e, 4, !1, e, null, !1);
			}
			)),
			["cols", "rows", "size", "span"].forEach((function (e) {
				q[e] = new G(e, 6, !1, e, null, !1);
			}
			)),
			["rowSpan", "start"].forEach((function (e) {
				q[e] = new G(e, 5, !1, e.toLowerCase(), null, !1);
			}
			));
		var K = /[\-:]([a-z])/g;

		function J(e) {
			return e[1].toUpperCase();
		}

		"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function (e) {
			var n = e.replace(K, J);
			q[n] = new G(n, 1, !1, e, null, !1);
		}
		)),
			"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function (e) {
				var n = e.replace(K, J);
				q[n] = new G(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
			}
			)),
			["xml:base", "xml:lang", "xml:space"].forEach((function (e) {
				var n = e.replace(K, J);
				q[n] = new G(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
			}
			)),
			["tabIndex", "crossOrigin"].forEach((function (e) {
				q[e] = new G(e, 1, !1, e.toLowerCase(), null, !1);
			}
			)),
			q.xlinkHref = new G("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0),
			["src", "href", "action", "formAction"].forEach((function (e) {
				q[e] = new G(e, 1, !1, e.toLowerCase(), null, !0);
			}
			));
		var Y = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

		function Z(e, n, t, r) {
			var o = q.hasOwnProperty(n) ? q[n] : null;
			(null !== o ? 0 === o.type : !r && (2 < n.length && ("o" === n[0] || "O" === n[0]) && ("n" === n[1] || "N" === n[1]))) || (function (e, n, t, r) {
				if (null == n || function (e, n, t, r) {
					if (null !== t && 0 === t.type)
						return !1;
					switch (typeof n) {
						case "function":
						case "symbol":
							return !0;
						case "boolean":
							return !r && (null !== t ? !t.acceptsBooleans : "data-" !== (e = e.toLowerCase().slice(0, 5)) && "aria-" !== e);
						default:
							return !1;
					}
				}(e, n, t, r))
					return !0;
				if (r)
					return !1;
				if (null !== t)
					switch (t.type) {
						case 3:
							return !n;
						case 4:
							return !1 === n;
						case 5:
							return isNaN(n);
						case 6:
							return isNaN(n) || 1 > n;
					}
				return !1;
			}(n, t, o, r) && (t = null),
				r || null === o ? function (e) {
					return !!W.call(Q, e) || !W.call(V, e) && (H.test(e) ? Q[e] = !0 : (V[e] = !0,
						!1));
				}(n) && (null === t ? e.removeAttribute(n) : e.setAttribute(n, "" + t)) : o.mustUseProperty ? e[o.propertyName] = null === t ? 3 !== o.type && "" : t : (n = o.attributeName,
					r = o.attributeNamespace,
					null === t ? e.removeAttribute(n) : (t = 3 === (o = o.type) || 4 === o && !0 === t ? "" : "" + t,
						r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
		}

		Y.hasOwnProperty("ReactCurrentDispatcher") || (Y.ReactCurrentDispatcher = {
			current: null
		}),
			Y.hasOwnProperty("ReactCurrentBatchConfig") || (Y.ReactCurrentBatchConfig = {
				suspense: null
			});
		var X = /^(.*)[\\\/]/
			, $ = "function" == typeof Symbol && Symbol.for
			, ee = $ ? Symbol.for("react.element") : 60103
			, ne = $ ? Symbol.for("react.portal") : 60106
			, te = $ ? Symbol.for("react.fragment") : 60107
			, re = $ ? Symbol.for("react.strict_mode") : 60108
			, oe = $ ? Symbol.for("react.profiler") : 60114
			, ie = $ ? Symbol.for("react.provider") : 60109
			, ae = $ ? Symbol.for("react.context") : 60110
			, ce = $ ? Symbol.for("react.concurrent_mode") : 60111
			, se = $ ? Symbol.for("react.forward_ref") : 60112
			, le = $ ? Symbol.for("react.suspense") : 60113
			, ue = $ ? Symbol.for("react.suspense_list") : 60120
			, fe = $ ? Symbol.for("react.memo") : 60115
			, de = $ ? Symbol.for("react.lazy") : 60116
			, me = $ ? Symbol.for("react.block") : 60121
			, pe = "function" == typeof Symbol && Symbol.iterator;

		function he(e) {
			return null === e || "object" != typeof e ? null : "function" == typeof (e = pe && e[pe] || e["@@iterator"]) ? e : null;
		}

		function ge(e) {
			if (null == e)
				return null;
			if ("function" == typeof e)
				return e.displayName || e.name || null;
			if ("string" == typeof e)
				return e;
			switch (e) {
				case te:
					return "Fragment";
				case ne:
					return "Portal";
				case oe:
					return "Profiler";
				case re:
					return "StrictMode";
				case le:
					return "Suspense";
				case ue:
					return "SuspenseList";
			}
			if ("object" == typeof e)
				switch (e.$$typeof) {
					case ae:
						return "Context.Consumer";
					case ie:
						return "Context.Provider";
					case se:
						var n = e.render;
						return n = n.displayName || n.name || "",
							e.displayName || ("" !== n ? "ForwardRef(" + n + ")" : "ForwardRef");
					case fe:
						return ge(e.type);
					case me:
						return ge(e.render);
					case de:
						if (e = 1 === e._status ? e._result : null)
							return ge(e);
				}
			return null;
		}

		function ve(e) {
			var n = "";
			do {
				e: switch (e.tag) {
					case 3:
					case 4:
					case 6:
					case 7:
					case 10:
					case 9:
						var t = "";
						break e;
					default:
						var r = e._debugOwner
							, o = e._debugSource
							, i = ge(e.type);
						t = null,
							r && (t = ge(r.type)),
							r = i,
							i = "",
							o ? i = " (at " + o.fileName.replace(X, "") + ":" + o.lineNumber + ")" : t && (i = " (created by " + t + ")"),
							t = "\n    in " + (r || "Unknown") + i;
				}
				n += t,
					e = e.return;
			} while (e);
			return n;
		}

		function be(e) {
			switch (typeof e) {
				case "boolean":
				case "number":
				case "object":
				case "string":
				case "undefined":
					return e;
				default:
					return "";
			}
		}

		function we(e) {
			var n = e.type;
			return (e = e.nodeName) && "input" === e.toLowerCase() && ("checkbox" === n || "radio" === n);
		}

		function ye(e) {
			e._valueTracker || (e._valueTracker = function (e) {
				var n = we(e) ? "checked" : "value"
					, t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n)
					, r = "" + e[n];
				if (!e.hasOwnProperty(n) && void 0 !== t && "function" == typeof t.get && "function" == typeof t.set) {
					var o = t.get
						, i = t.set;
					return Object.defineProperty(e, n, {
						configurable: !0,
						get: function () {
							return o.call(this);
						},
						set: function (e) {
							r = "" + e,
								i.call(this, e);
						}
					}),
						Object.defineProperty(e, n, {
							enumerable: t.enumerable
						}),
					{
						getValue: function () {
							return r;
						},
						setValue: function (e) {
							r = "" + e;
						},
						stopTracking: function () {
							e._valueTracker = null,
								delete e[n];
						}
					};
				}
			}(e));
		}

		function xe(e) {
			if (!e)
				return !1;
			var n = e._valueTracker;
			if (!n)
				return !0;
			var t = n.getValue()
				, r = "";
			return e && (r = we(e) ? e.checked ? "true" : "false" : e.value),
				(e = r) !== t && (n.setValue(e),
					!0);
		}

		function ke(e, n) {
			var t = n.checked;
			return o({}, n, {
				defaultChecked: void 0,
				defaultValue: void 0,
				value: void 0,
				checked: null != t ? t : e._wrapperState.initialChecked
			});
		}

		function Se(e, n) {
			var t = null == n.defaultValue ? "" : n.defaultValue
				, r = null != n.checked ? n.checked : n.defaultChecked;
			t = be(null != n.value ? n.value : t),
				e._wrapperState = {
					initialChecked: r,
					initialValue: t,
					controlled: "checkbox" === n.type || "radio" === n.type ? null != n.checked : null != n.value
				};
		}

		function Ee(e, n) {
			null != (n = n.checked) && Z(e, "checked", n, !1);
		}

		function Ce(e, n) {
			Ee(e, n);
			var t = be(n.value)
				, r = n.type;
			if (null != t)
				"number" === r ? (0 === t && "" === e.value || e.value != t) && (e.value = "" + t) : e.value !== "" + t && (e.value = "" + t);
			else if ("submit" === r || "reset" === r)
				return void e.removeAttribute("value");
			n.hasOwnProperty("value") ? Ie(e, n.type, t) : n.hasOwnProperty("defaultValue") && Ie(e, n.type, be(n.defaultValue)),
				null == n.checked && null != n.defaultChecked && (e.defaultChecked = !!n.defaultChecked);
		}

		function Ae(e, n, t) {
			if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
				var r = n.type;
				if (!("submit" !== r && "reset" !== r || void 0 !== n.value && null !== n.value))
					return;
				n = "" + e._wrapperState.initialValue,
					t || n === e.value || (e.value = n),
					e.defaultValue = n;
			}
			"" !== (t = e.name) && (e.name = ""),
				e.defaultChecked = !!e._wrapperState.initialChecked,
				"" !== t && (e.name = t);
		}

		function Ie(e, n, t) {
			"number" === n && e.ownerDocument.activeElement === e || (null == t ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + t && (e.defaultValue = "" + t));
		}

		function Te(e, n) {
			return e = o({
				children: void 0
			}, n),
				(n = function (e) {
					var n = "";
					return r.Children.forEach(e, (function (e) {
						null != e && (n += e);
					}
					)),
						n;
				}(n.children)) && (e.children = n),
				e;
		}

		function Pe(e, n, t, r) {
			if (e = e.options,
				n) {
				n = {};
				for (var o = 0; o < t.length; o++)
					n["$" + t[o]] = !0;
				for (t = 0; t < e.length; t++)
					o = n.hasOwnProperty("$" + e[t].value),
						e[t].selected !== o && (e[t].selected = o),
						o && r && (e[t].defaultSelected = !0);
			} else {
				for (t = "" + be(t),
					n = null,
					o = 0; o < e.length; o++) {
					if (e[o].value === t)
						return e[o].selected = !0,
							void (r && (e[o].defaultSelected = !0));
					null !== n || e[o].disabled || (n = e[o]);
				}
				null !== n && (n.selected = !0);
			}
		}

		function Oe(e, n) {
			if (null != n.dangerouslySetInnerHTML)
				throw Error(a(91));
			return o({}, n, {
				value: void 0,
				defaultValue: void 0,
				children: "" + e._wrapperState.initialValue
			});
		}

		function _e(e, n) {
			var t = n.value;
			if (null == t) {
				if (t = n.children,
					n = n.defaultValue,
					null != t) {
					if (null != n)
						throw Error(a(92));
					if (Array.isArray(t)) {
						if (!(1 >= t.length))
							throw Error(a(93));
						t = t[0];
					}
					n = t;
				}
				null == n && (n = ""),
					t = n;
			}
			e._wrapperState = {
				initialValue: be(t)
			};
		}

		function je(e, n) {
			var t = be(n.value)
				, r = be(n.defaultValue);
			null != t && ((t = "" + t) !== e.value && (e.value = t),
				null == n.defaultValue && e.defaultValue !== t && (e.defaultValue = t)),
				null != r && (e.defaultValue = "" + r);
		}

		function Ne(e) {
			var n = e.textContent;
			n === e._wrapperState.initialValue && "" !== n && null !== n && (e.value = n);
		}

		var Re = "http://www.w3.org/1999/xhtml"
			, Le = "http://www.w3.org/2000/svg";

		function Fe(e) {
			switch (e) {
				case "svg":
					return "http://www.w3.org/2000/svg";
				case "math":
					return "http://www.w3.org/1998/Math/MathML";
				default:
					return "http://www.w3.org/1999/xhtml";
			}
		}

		function Me(e, n) {
			return null == e || "http://www.w3.org/1999/xhtml" === e ? Fe(n) : "http://www.w3.org/2000/svg" === e && "foreignObject" === n ? "http://www.w3.org/1999/xhtml" : e;
		}

		var Ue, De = function (e) {
			return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction ? function (n, t, r, o) {
				MSApp.execUnsafeLocalFunction((function () {
					return e(n, t);
				}
				));
			}
				: e;
		}((function (e, n) {
			if (e.namespaceURI !== Le || "innerHTML" in e)
				e.innerHTML = n;
			else {
				for ((Ue = Ue || document.createElement("div")).innerHTML = "<svg>" + n.valueOf().toString() + "</svg>",
					n = Ue.firstChild; e.firstChild;)
					e.removeChild(e.firstChild);
				for (; n.firstChild;)
					e.appendChild(n.firstChild);
			}
		}
		));

		function ze(e, n) {
			if (n) {
				var t = e.firstChild;
				if (t && t === e.lastChild && 3 === t.nodeType)
					return void (t.nodeValue = n);
			}
			e.textContent = n;
		}

		function Be(e, n) {
			var t = {};
			return t[e.toLowerCase()] = n.toLowerCase(),
				t["Webkit" + e] = "webkit" + n,
				t["Moz" + e] = "moz" + n,
				t;
		}

		var He = {
			animationend: Be("Animation", "AnimationEnd"),
			animationiteration: Be("Animation", "AnimationIteration"),
			animationstart: Be("Animation", "AnimationStart"),
			transitionend: Be("Transition", "TransitionEnd")
		}
			, We = {}
			, Ve = {};

		function Qe(e) {
			if (We[e])
				return We[e];
			if (!He[e])
				return e;
			var n, t = He[e];
			for (n in t)
				if (t.hasOwnProperty(n) && n in Ve)
					return We[e] = t[n];
			return e;
		}

		I && (Ve = document.createElement("div").style,
			"AnimationEvent" in window || (delete He.animationend.animation,
				delete He.animationiteration.animation,
				delete He.animationstart.animation),
			"TransitionEvent" in window || delete He.transitionend.transition);
		var Ge = Qe("animationend")
			, qe = Qe("animationiteration")
			, Ke = Qe("animationstart")
			, Je = Qe("transitionend")
			,
			Ye = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
			, Ze = new ("function" == typeof WeakMap ? WeakMap : Map);

		function Xe(e) {
			var n = Ze.get(e);
			return void 0 === n && (n = new Map,
				Ze.set(e, n)),
				n;
		}

		function $e(e) {
			var n = e
				, t = e;
			if (e.alternate)
				for (; n.return;)
					n = n.return;
			else {
				e = n;
				do {
					0 != (1026 & (n = e).effectTag) && (t = n.return),
						e = n.return;
				} while (e);
			}
			return 3 === n.tag ? t : null;
		}

		function en(e) {
			if (13 === e.tag) {
				var n = e.memoizedState;
				if (null === n && (null !== (e = e.alternate) && (n = e.memoizedState)),
					null !== n)
					return n.dehydrated;
			}
			return null;
		}

		function nn(e) {
			if ($e(e) !== e)
				throw Error(a(188));
		}

		function tn(e) {
			if (!(e = function (e) {
				var n = e.alternate;
				if (!n) {
					if (null === (n = $e(e)))
						throw Error(a(188));
					return n !== e ? null : e;
				}
				for (var t = e, r = n; ;) {
					var o = t.return;
					if (null === o)
						break;
					var i = o.alternate;
					if (null === i) {
						if (null !== (r = o.return)) {
							t = r;
							continue;
						}
						break;
					}
					if (o.child === i.child) {
						for (i = o.child; i;) {
							if (i === t)
								return nn(o),
									e;
							if (i === r)
								return nn(o),
									n;
							i = i.sibling;
						}
						throw Error(a(188));
					}
					if (t.return !== r.return)
						t = o,
							r = i;
					else {
						for (var c = !1, s = o.child; s;) {
							if (s === t) {
								c = !0,
									t = o,
									r = i;
								break;
							}
							if (s === r) {
								c = !0,
									r = o,
									t = i;
								break;
							}
							s = s.sibling;
						}
						if (!c) {
							for (s = i.child; s;) {
								if (s === t) {
									c = !0,
										t = i,
										r = o;
									break;
								}
								if (s === r) {
									c = !0,
										r = i,
										t = o;
									break;
								}
								s = s.sibling;
							}
							if (!c)
								throw Error(a(189));
						}
					}
					if (t.alternate !== r)
						throw Error(a(190));
				}
				if (3 !== t.tag)
					throw Error(a(188));
				return t.stateNode.current === t ? e : n;
			}(e)))
				return null;
			for (var n = e; ;) {
				if (5 === n.tag || 6 === n.tag)
					return n;
				if (n.child)
					n.child.return = n,
						n = n.child;
				else {
					if (n === e)
						break;
					for (; !n.sibling;) {
						if (!n.return || n.return === e)
							return null;
						n = n.return;
					}
					n.sibling.return = n.return,
						n = n.sibling;
				}
			}
			return null;
		}

		function rn(e, n) {
			if (null == n)
				throw Error(a(30));
			return null == e ? n : Array.isArray(e) ? Array.isArray(n) ? (e.push.apply(e, n),
				e) : (e.push(n),
					e) : Array.isArray(n) ? [e].concat(n) : [e, n];
		}

		function on(e, n, t) {
			Array.isArray(e) ? e.forEach(n, t) : e && n.call(t, e);
		}

		var an = null;

		function cn(e) {
			if (e) {
				var n = e._dispatchListeners
					, t = e._dispatchInstances;
				if (Array.isArray(n))
					for (var r = 0; r < n.length && !e.isPropagationStopped(); r++)
						v(e, n[r], t[r]);
				else
					n && v(e, n, t);
				e._dispatchListeners = null,
					e._dispatchInstances = null,
					e.isPersistent() || e.constructor.release(e);
			}
		}

		function sn(e) {
			if (null !== e && (an = rn(an, e)),
				e = an,
				an = null,
				e) {
				if (on(e, cn),
					an)
					throw Error(a(95));
				if (u)
					throw e = f,
					u = !1,
					f = null,
					e;
			}
		}

		function ln(e) {
			return (e = e.target || e.srcElement || window).correspondingUseElement && (e = e.correspondingUseElement),
				3 === e.nodeType ? e.parentNode : e;
		}

		function un(e) {
			if (!I)
				return !1;
			var n = (e = "on" + e) in document;
			return n || ((n = document.createElement("div")).setAttribute(e, "return;"),
				n = "function" == typeof n[e]),
				n;
		}

		var fn = [];

		function dn(e) {
			e.topLevelType = null,
				e.nativeEvent = null,
				e.targetInst = null,
				e.ancestors.length = 0,
				10 > fn.length && fn.push(e);
		}

		function mn(e, n, t, r) {
			if (fn.length) {
				var o = fn.pop();
				return o.topLevelType = e,
					o.eventSystemFlags = r,
					o.nativeEvent = n,
					o.targetInst = t,
					o;
			}
			return {
				topLevelType: e,
				eventSystemFlags: r,
				nativeEvent: n,
				targetInst: t,
				ancestors: []
			};
		}

		function pn(e) {
			var n = e.targetInst
				, t = n;
			do {
				if (!t) {
					e.ancestors.push(t);
					break;
				}
				var r = t;
				if (3 === r.tag)
					r = r.stateNode.containerInfo;
				else {
					for (; r.return;)
						r = r.return;
					r = 3 !== r.tag ? null : r.stateNode.containerInfo;
				}
				if (!r)
					break;
				5 !== (n = t.tag) && 6 !== n || e.ancestors.push(t),
					t = It(r);
			} while (t);
			for (t = 0; t < e.ancestors.length; t++) {
				n = e.ancestors[t];
				var o = ln(e.nativeEvent);
				r = e.topLevelType;
				var i = e.nativeEvent
					, a = e.eventSystemFlags;
				0 === t && (a |= 64);
				for (var c = null, s = 0; s < k.length; s++) {
					var l = k[s];
					l && (l = l.extractEvents(r, n, i, o, a)) && (c = rn(c, l));
				}
				sn(c);
			}
		}

		function hn(e, n, t) {
			if (!t.has(e)) {
				switch (e) {
					case "scroll":
						Jn(n, "scroll", !0);
						break;
					case "focus":
					case "blur":
						Jn(n, "focus", !0),
							Jn(n, "blur", !0),
							t.set("blur", null),
							t.set("focus", null);
						break;
					case "cancel":
					case "close":
						un(e) && Jn(n, e, !0);
						break;
					case "invalid":
					case "submit":
					case "reset":
						break;
					default:
						-1 === Ye.indexOf(e) && Kn(e, n);
				}
				t.set(e, null);
			}
		}

		var gn, vn, bn, wn = !1, yn = [], xn = null, kn = null, Sn = null, En = new Map, Cn = new Map, An = [],
			In = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),
			Tn = "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");

		function Pn(e, n, t, r, o) {
			return {
				blockedOn: e,
				topLevelType: n,
				eventSystemFlags: 32 | t,
				nativeEvent: o,
				container: r
			};
		}

		function On(e, n) {
			switch (e) {
				case "focus":
				case "blur":
					xn = null;
					break;
				case "dragenter":
				case "dragleave":
					kn = null;
					break;
				case "mouseover":
				case "mouseout":
					Sn = null;
					break;
				case "pointerover":
				case "pointerout":
					En.delete(n.pointerId);
					break;
				case "gotpointercapture":
				case "lostpointercapture":
					Cn.delete(n.pointerId);
			}
		}

		function _n(e, n, t, r, o, i) {
			return null === e || e.nativeEvent !== i ? (e = Pn(n, t, r, o, i),
				null !== n && (null !== (n = Tt(n)) && vn(n)),
				e) : (e.eventSystemFlags |= r,
					e);
		}

		function jn(e) {
			var n = It(e.target);
			if (null !== n) {
				var t = $e(n);
				if (null !== t)
					if (13 === (n = t.tag)) {
						if (null !== (n = en(t)))
							return e.blockedOn = n,
								void i.unstable_runWithPriority(e.priority, (function () {
									bn(t);
								}
								));
					} else if (3 === n && t.stateNode.hydrate)
						return void (e.blockedOn = 3 === t.tag ? t.stateNode.containerInfo : null);
			}
			e.blockedOn = null;
		}

		function Nn(e) {
			if (null !== e.blockedOn)
				return !1;
			var n = $n(e.topLevelType, e.eventSystemFlags, e.container, e.nativeEvent);
			if (null !== n) {
				var t = Tt(n);
				return null !== t && vn(t),
					e.blockedOn = n,
					!1;
			}
			return !0;
		}

		function Rn(e, n, t) {
			Nn(e) && t.delete(n);
		}

		function Ln() {
			for (wn = !1; 0 < yn.length;) {
				var e = yn[0];
				if (null !== e.blockedOn) {
					null !== (e = Tt(e.blockedOn)) && gn(e);
					break;
				}
				var n = $n(e.topLevelType, e.eventSystemFlags, e.container, e.nativeEvent);
				null !== n ? e.blockedOn = n : yn.shift();
			}
			null !== xn && Nn(xn) && (xn = null),
				null !== kn && Nn(kn) && (kn = null),
				null !== Sn && Nn(Sn) && (Sn = null),
				En.forEach(Rn),
				Cn.forEach(Rn);
		}

		function Fn(e, n) {
			e.blockedOn === n && (e.blockedOn = null,
				wn || (wn = !0,
					i.unstable_scheduleCallback(i.unstable_NormalPriority, Ln)));
		}

		function Mn(e) {
			function n(n) {
				return Fn(n, e);
			}

			if (0 < yn.length) {
				Fn(yn[0], e);
				for (var t = 1; t < yn.length; t++) {
					var r = yn[t];
					r.blockedOn === e && (r.blockedOn = null);
				}
			}
			for (null !== xn && Fn(xn, e),
				null !== kn && Fn(kn, e),
				null !== Sn && Fn(Sn, e),
				En.forEach(n),
				Cn.forEach(n),
				t = 0; t < An.length; t++)
				(r = An[t]).blockedOn === e && (r.blockedOn = null);
			for (; 0 < An.length && null === (t = An[0]).blockedOn;)
				jn(t),
					null === t.blockedOn && An.shift();
		}

		var Un = {}
			, Dn = new Map
			, zn = new Map
			,
			Bn = ["abort", "abort", Ge, "animationEnd", qe, "animationIteration", Ke, "animationStart", "canplay", "canPlay", "canplaythrough", "canPlayThrough", "durationchange", "durationChange", "emptied", "emptied", "encrypted", "encrypted", "ended", "ended", "error", "error", "gotpointercapture", "gotPointerCapture", "load", "load", "loadeddata", "loadedData", "loadedmetadata", "loadedMetadata", "loadstart", "loadStart", "lostpointercapture", "lostPointerCapture", "playing", "playing", "progress", "progress", "seeking", "seeking", "stalled", "stalled", "suspend", "suspend", "timeupdate", "timeUpdate", Je, "transitionEnd", "waiting", "waiting"];

		function Hn(e, n) {
			for (var t = 0; t < e.length; t += 2) {
				var r = e[t]
					, o = e[t + 1]
					, i = "on" + (o[0].toUpperCase() + o.slice(1));
				i = {
					phasedRegistrationNames: {
						bubbled: i,
						captured: i + "Capture"
					},
					dependencies: [r],
					eventPriority: n
				},
					zn.set(r, n),
					Dn.set(r, i),
					Un[o] = i;
			}
		}

		Hn("blur blur cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focus focus input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0),
			Hn("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1),
			Hn(Bn, 2);
		for (var Wn = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), Vn = 0; Vn < Wn.length; Vn++)
			zn.set(Wn[Vn], 0);
		var Qn = i.unstable_UserBlockingPriority
			, Gn = i.unstable_runWithPriority
			, qn = !0;

		function Kn(e, n) {
			Jn(n, e, !1);
		}

		function Jn(e, n, t) {
			var r = zn.get(n);
			switch (void 0 === r ? 2 : r) {
				case 0:
					r = Yn.bind(null, n, 1, e);
					break;
				case 1:
					r = Zn.bind(null, n, 1, e);
					break;
				default:
					r = Xn.bind(null, n, 1, e);
			}
			t ? e.addEventListener(n, r, !0) : e.addEventListener(n, r, !1);
		}

		function Yn(e, n, t, r) {
			U || F();
			var o = Xn
				, i = U;
			U = !0;
			try {
				L(o, e, n, t, r);
			} finally {
				(U = i) || z();
			}
		}

		function Zn(e, n, t, r) {
			Gn(Qn, Xn.bind(null, e, n, t, r));
		}

		function Xn(e, n, t, r) {
			if (qn)
				if (0 < yn.length && -1 < In.indexOf(e))
					e = Pn(null, e, n, t, r),
						yn.push(e);
				else {
					var o = $n(e, n, t, r);
					if (null === o)
						On(e, r);
					else if (-1 < In.indexOf(e))
						e = Pn(o, e, n, t, r),
							yn.push(e);
					else if (!function (e, n, t, r, o) {
						switch (n) {
							case "focus":
								return xn = _n(xn, e, n, t, r, o),
									!0;
							case "dragenter":
								return kn = _n(kn, e, n, t, r, o),
									!0;
							case "mouseover":
								return Sn = _n(Sn, e, n, t, r, o),
									!0;
							case "pointerover":
								var i = o.pointerId;
								return En.set(i, _n(En.get(i) || null, e, n, t, r, o)),
									!0;
							case "gotpointercapture":
								return i = o.pointerId,
									Cn.set(i, _n(Cn.get(i) || null, e, n, t, r, o)),
									!0;
						}
						return !1;
					}(o, e, n, t, r)) {
						On(e, r),
							e = mn(e, r, null, n);
						try {
							B(pn, e);
						} finally {
							dn(e);
						}
					}
				}
		}

		function $n(e, n, t, r) {
			if (null !== (t = It(t = ln(r)))) {
				var o = $e(t);
				if (null === o)
					t = null;
				else {
					var i = o.tag;
					if (13 === i) {
						if (null !== (t = en(o)))
							return t;
						t = null;
					} else if (3 === i) {
						if (o.stateNode.hydrate)
							return 3 === o.tag ? o.stateNode.containerInfo : null;
						t = null;
					} else
						o !== t && (t = null);
				}
			}
			e = mn(e, r, t, n);
			try {
				B(pn, e);
			} finally {
				dn(e);
			}
			return null;
		}

		var et = {
			animationIterationCount: !0,
			borderImageOutset: !0,
			borderImageSlice: !0,
			borderImageWidth: !0,
			boxFlex: !0,
			boxFlexGroup: !0,
			boxOrdinalGroup: !0,
			columnCount: !0,
			columns: !0,
			flex: !0,
			flexGrow: !0,
			flexPositive: !0,
			flexShrink: !0,
			flexNegative: !0,
			flexOrder: !0,
			gridArea: !0,
			gridRow: !0,
			gridRowEnd: !0,
			gridRowSpan: !0,
			gridRowStart: !0,
			gridColumn: !0,
			gridColumnEnd: !0,
			gridColumnSpan: !0,
			gridColumnStart: !0,
			fontWeight: !0,
			lineClamp: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			tabSize: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0,
			fillOpacity: !0,
			floodOpacity: !0,
			stopOpacity: !0,
			strokeDasharray: !0,
			strokeDashoffset: !0,
			strokeMiterlimit: !0,
			strokeOpacity: !0,
			strokeWidth: !0
		}
			, nt = ["Webkit", "ms", "Moz", "O"];

		function tt(e, n, t) {
			return null == n || "boolean" == typeof n || "" === n ? "" : t || "number" != typeof n || 0 === n || et.hasOwnProperty(e) && et[e] ? ("" + n).trim() : n + "px";
		}

		function rt(e, n) {
			for (var t in e = e.style,
				n)
				if (n.hasOwnProperty(t)) {
					var r = 0 === t.indexOf("--")
						, o = tt(t, n[t], r);
					"float" === t && (t = "cssFloat"),
						r ? e.setProperty(t, o) : e[t] = o;
				}
		}

		Object.keys(et).forEach((function (e) {
			nt.forEach((function (n) {
				n = n + e.charAt(0).toUpperCase() + e.substring(1),
					et[n] = et[e];
			}
			));
		}
		));
		var ot = o({
			menuitem: !0
		}, {
			area: !0,
			base: !0,
			br: !0,
			col: !0,
			embed: !0,
			hr: !0,
			img: !0,
			input: !0,
			keygen: !0,
			link: !0,
			meta: !0,
			param: !0,
			source: !0,
			track: !0,
			wbr: !0
		});

		function it(e, n) {
			if (n) {
				if (ot[e] && (null != n.children || null != n.dangerouslySetInnerHTML))
					throw Error(a(137, e, ""));
				if (null != n.dangerouslySetInnerHTML) {
					if (null != n.children)
						throw Error(a(60));
					if ("object" != typeof n.dangerouslySetInnerHTML || !("__html" in n.dangerouslySetInnerHTML))
						throw Error(a(61));
				}
				if (null != n.style && "object" != typeof n.style)
					throw Error(a(62, ""));
			}
		}

		function at(e, n) {
			if (-1 === e.indexOf("-"))
				return "string" == typeof n.is;
			switch (e) {
				case "annotation-xml":
				case "color-profile":
				case "font-face":
				case "font-face-src":
				case "font-face-uri":
				case "font-face-format":
				case "font-face-name":
				case "missing-glyph":
					return !1;
				default:
					return !0;
			}
		}

		var ct = Re;

		function st(e, n) {
			var t = Xe(e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument);
			n = C[n];
			for (var r = 0; r < n.length; r++)
				hn(n[r], e, t);
		}

		function lt() {
		}

		function ut(e) {
			if (void 0 === (e = e || ("undefined" != typeof document ? document : void 0)))
				return null;
			try {
				return e.activeElement || e.body;
			} catch (n) {
				return e.body;
			}
		}

		function ft(e) {
			for (; e && e.firstChild;)
				e = e.firstChild;
			return e;
		}

		function dt(e, n) {
			var t, r = ft(e);
			for (e = 0; r;) {
				if (3 === r.nodeType) {
					if (t = e + r.textContent.length,
						e <= n && t >= n)
						return {
							node: r,
							offset: n - e
						};
					e = t;
				}
				e: {
					for (; r;) {
						if (r.nextSibling) {
							r = r.nextSibling;
							break e;
						}
						r = r.parentNode;
					}
					r = void 0;
				}
				r = ft(r);
			}
		}

		function mt() {
			for (var e = window, n = ut(); n instanceof e.HTMLIFrameElement;) {
				try {
					var t = "string" == typeof n.contentWindow.location.href;
				} catch (e) {
					t = !1;
				}
				if (!t)
					break;
				n = ut((e = n.contentWindow).document);
			}
			return n;
		}

		function pt(e) {
			var n = e && e.nodeName && e.nodeName.toLowerCase();
			return n && ("input" === n && ("text" === e.type || "search" === e.type || "tel" === e.type || "url" === e.type || "password" === e.type) || "textarea" === n || "true" === e.contentEditable);
		}

		var ht = null
			, gt = null;

		function vt(e, n) {
			switch (e) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					return !!n.autoFocus;
			}
			return !1;
		}

		function bt(e, n) {
			return "textarea" === e || "option" === e || "noscript" === e || "string" == typeof n.children || "number" == typeof n.children || "object" == typeof n.dangerouslySetInnerHTML && null !== n.dangerouslySetInnerHTML && null != n.dangerouslySetInnerHTML.__html;
		}

		var wt = "function" == typeof setTimeout ? setTimeout : void 0
			, yt = "function" == typeof clearTimeout ? clearTimeout : void 0;

		function xt(e) {
			for (; null != e; e = e.nextSibling) {
				var n = e.nodeType;
				if (1 === n || 3 === n)
					break;
			}
			return e;
		}

		function kt(e) {
			e = e.previousSibling;
			for (var n = 0; e;) {
				if (8 === e.nodeType) {
					var t = e.data;
					if ("$" === t || "$!" === t || "$?" === t) {
						if (0 === n)
							return e;
						n--;
					} else
						"/$" === t && n++;
				}
				e = e.previousSibling;
			}
			return null;
		}

		var St = Math.random().toString(36).slice(2)
			, Et = "__reactInternalInstance$" + St
			, Ct = "__reactEventHandlers$" + St
			, At = "__reactContainere$" + St;

		function It(e) {
			var n = e[Et];
			if (n)
				return n;
			for (var t = e.parentNode; t;) {
				if (n = t[At] || t[Et]) {
					if (t = n.alternate,
						null !== n.child || null !== t && null !== t.child)
						for (e = kt(e); null !== e;) {
							if (t = e[Et])
								return t;
							e = kt(e);
						}
					return n;
				}
				t = (e = t).parentNode;
			}
			return null;
		}

		function Tt(e) {
			return !(e = e[Et] || e[At]) || 5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag ? null : e;
		}

		function Pt(e) {
			if (5 === e.tag || 6 === e.tag)
				return e.stateNode;
			throw Error(a(33));
		}

		function Ot(e) {
			return e[Ct] || null;
		}

		function _t(e) {
			do {
				e = e.return;
			} while (e && 5 !== e.tag);
			return e || null;
		}

		function jt(e, n) {
			var t = e.stateNode;
			if (!t)
				return null;
			var r = p(t);
			if (!r)
				return null;
			t = r[n];
			e: switch (n) {
				case "onClick":
				case "onClickCapture":
				case "onDoubleClick":
				case "onDoubleClickCapture":
				case "onMouseDown":
				case "onMouseDownCapture":
				case "onMouseMove":
				case "onMouseMoveCapture":
				case "onMouseUp":
				case "onMouseUpCapture":
				case "onMouseEnter":
					(r = !r.disabled) || (r = !("button" === (e = e.type) || "input" === e || "select" === e || "textarea" === e)),
						e = !r;
					break e;
				default:
					e = !1;
			}
			if (e)
				return null;
			if (t && "function" != typeof t)
				throw Error(a(231, n, typeof t));
			return t;
		}

		function Nt(e, n, t) {
			(n = jt(e, t.dispatchConfig.phasedRegistrationNames[n])) && (t._dispatchListeners = rn(t._dispatchListeners, n),
				t._dispatchInstances = rn(t._dispatchInstances, e));
		}

		function Rt(e) {
			if (e && e.dispatchConfig.phasedRegistrationNames) {
				for (var n = e._targetInst, t = []; n;)
					t.push(n),
						n = _t(n);
				for (n = t.length; 0 < n--;)
					Nt(t[n], "captured", e);
				for (n = 0; n < t.length; n++)
					Nt(t[n], "bubbled", e);
			}
		}

		function Lt(e, n, t) {
			e && t && t.dispatchConfig.registrationName && (n = jt(e, t.dispatchConfig.registrationName)) && (t._dispatchListeners = rn(t._dispatchListeners, n),
				t._dispatchInstances = rn(t._dispatchInstances, e));
		}

		function Ft(e) {
			e && e.dispatchConfig.registrationName && Lt(e._targetInst, null, e);
		}

		function Mt(e) {
			on(e, Rt);
		}

		var Ut = null
			, Dt = null
			, zt = null;

		function Bt() {
			if (zt)
				return zt;
			var e, n, t = Dt, r = t.length, o = "value" in Ut ? Ut.value : Ut.textContent, i = o.length;
			for (e = 0; e < r && t[e] === o[e]; e++)
				;
			var a = r - e;
			for (n = 1; n <= a && t[r - n] === o[i - n]; n++)
				;
			return zt = o.slice(e, 1 < n ? 1 - n : void 0);
		}

		function Ht() {
			return !0;
		}

		function Wt() {
			return !1;
		}

		function Vt(e, n, t, r) {
			for (var o in this.dispatchConfig = e,
				this._targetInst = n,
				this.nativeEvent = t,
				e = this.constructor.Interface)
				e.hasOwnProperty(o) && ((n = e[o]) ? this[o] = n(t) : "target" === o ? this.target = r : this[o] = t[o]);
			return this.isDefaultPrevented = (null != t.defaultPrevented ? t.defaultPrevented : !1 === t.returnValue) ? Ht : Wt,
				this.isPropagationStopped = Wt,
				this;
		}

		function Qt(e, n, t, r) {
			if (this.eventPool.length) {
				var o = this.eventPool.pop();
				return this.call(o, e, n, t, r),
					o;
			}
			return new this(e, n, t, r);
		}

		function Gt(e) {
			if (!(e instanceof this))
				throw Error(a(279));
			e.destructor(),
				10 > this.eventPool.length && this.eventPool.push(e);
		}

		function qt(e) {
			e.eventPool = [],
				e.getPooled = Qt,
				e.release = Gt;
		}

		o(Vt.prototype, {
			preventDefault: function () {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : "unknown" != typeof e.returnValue && (e.returnValue = !1),
					this.isDefaultPrevented = Ht);
			},
			stopPropagation: function () {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
					this.isPropagationStopped = Ht);
			},
			persist: function () {
				this.isPersistent = Ht;
			},
			isPersistent: Wt,
			destructor: function () {
				var e, n = this.constructor.Interface;
				for (e in n)
					this[e] = null;
				this.nativeEvent = this._targetInst = this.dispatchConfig = null,
					this.isPropagationStopped = this.isDefaultPrevented = Wt,
					this._dispatchInstances = this._dispatchListeners = null;
			}
		}),
			Vt.Interface = {
				type: null,
				target: null,
				currentTarget: function () {
					return null;
				},
				eventPhase: null,
				bubbles: null,
				cancelable: null,
				timeStamp: function (e) {
					return e.timeStamp || Date.now();
				},
				defaultPrevented: null,
				isTrusted: null
			},
			Vt.extend = function (e) {
				function n() {
				}

				function t() {
					return r.apply(this, arguments);
				}

				var r = this;
				n.prototype = r.prototype;
				var i = new n;
				return o(i, t.prototype),
					t.prototype = i,
					t.prototype.constructor = t,
					t.Interface = o({}, r.Interface, e),
					t.extend = r.extend,
					qt(t),
					t;
			}
			,
			qt(Vt);
		var Kt = Vt.extend({
			data: null
		})
			, Jt = Vt.extend({
				data: null
			})
			, Yt = [9, 13, 27, 32]
			, Zt = I && "CompositionEvent" in window
			, Xt = null;
		I && "documentMode" in document && (Xt = document.documentMode);
		var $t = I && "TextEvent" in window && !Xt
			, er = I && (!Zt || Xt && 8 < Xt && 11 >= Xt)
			, nr = String.fromCharCode(32)
			, tr = {
				beforeInput: {
					phasedRegistrationNames: {
						bubbled: "onBeforeInput",
						captured: "onBeforeInputCapture"
					},
					dependencies: ["compositionend", "keypress", "textInput", "paste"]
				},
				compositionEnd: {
					phasedRegistrationNames: {
						bubbled: "onCompositionEnd",
						captured: "onCompositionEndCapture"
					},
					dependencies: "blur compositionend keydown keypress keyup mousedown".split(" ")
				},
				compositionStart: {
					phasedRegistrationNames: {
						bubbled: "onCompositionStart",
						captured: "onCompositionStartCapture"
					},
					dependencies: "blur compositionstart keydown keypress keyup mousedown".split(" ")
				},
				compositionUpdate: {
					phasedRegistrationNames: {
						bubbled: "onCompositionUpdate",
						captured: "onCompositionUpdateCapture"
					},
					dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(" ")
				}
			}
			, rr = !1;

		function or(e, n) {
			switch (e) {
				case "keyup":
					return -1 !== Yt.indexOf(n.keyCode);
				case "keydown":
					return 229 !== n.keyCode;
				case "keypress":
				case "mousedown":
				case "blur":
					return !0;
				default:
					return !1;
			}
		}

		function ir(e) {
			return "object" == typeof (e = e.detail) && "data" in e ? e.data : null;
		}

		var ar = !1;
		var cr = {
			eventTypes: tr,
			extractEvents: function (e, n, t, r) {
				var o;
				if (Zt)
					e: {
						switch (e) {
							case "compositionstart":
								var i = tr.compositionStart;
								break e;
							case "compositionend":
								i = tr.compositionEnd;
								break e;
							case "compositionupdate":
								i = tr.compositionUpdate;
								break e;
						}
						i = void 0;
					}
				else
					ar ? or(e, t) && (i = tr.compositionEnd) : "keydown" === e && 229 === t.keyCode && (i = tr.compositionStart);
				return i ? (er && "ko" !== t.locale && (ar || i !== tr.compositionStart ? i === tr.compositionEnd && ar && (o = Bt()) : (Dt = "value" in (Ut = r) ? Ut.value : Ut.textContent,
					ar = !0)),
					i = Kt.getPooled(i, n, t, r),
					o ? i.data = o : null !== (o = ir(t)) && (i.data = o),
					Mt(i),
					o = i) : o = null,
					(e = $t ? function (e, n) {
						switch (e) {
							case "compositionend":
								return ir(n);
							case "keypress":
								return 32 !== n.which ? null : (rr = !0,
									nr);
							case "textInput":
								return (e = n.data) === nr && rr ? null : e;
							default:
								return null;
						}
					}(e, t) : function (e, n) {
						if (ar)
							return "compositionend" === e || !Zt && or(e, n) ? (e = Bt(),
								zt = Dt = Ut = null,
								ar = !1,
								e) : null;
						switch (e) {
							case "paste":
								return null;
							case "keypress":
								if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
									if (n.char && 1 < n.char.length)
										return n.char;
									if (n.which)
										return String.fromCharCode(n.which);
								}
								return null;
							case "compositionend":
								return er && "ko" !== n.locale ? null : n.data;
							default:
								return null;
						}
					}(e, t)) ? ((n = Jt.getPooled(tr.beforeInput, n, t, r)).data = e,
						Mt(n)) : n = null,
					null === o ? n : null === n ? o : [o, n];
			}
		}
			, sr = {
				color: !0,
				date: !0,
				datetime: !0,
				"datetime-local": !0,
				email: !0,
				month: !0,
				number: !0,
				password: !0,
				range: !0,
				search: !0,
				tel: !0,
				text: !0,
				time: !0,
				url: !0,
				week: !0
			};

		function lr(e) {
			var n = e && e.nodeName && e.nodeName.toLowerCase();
			return "input" === n ? !!sr[e.type] : "textarea" === n;
		}

		var ur = {
			change: {
				phasedRegistrationNames: {
					bubbled: "onChange",
					captured: "onChangeCapture"
				},
				dependencies: "blur change click focus input keydown keyup selectionchange".split(" ")
			}
		};

		function fr(e, n, t) {
			return (e = Vt.getPooled(ur.change, e, n, t)).type = "change",
				j(t),
				Mt(e),
				e;
		}

		var dr = null
			, mr = null;

		function pr(e) {
			sn(e);
		}

		function hr(e) {
			if (xe(Pt(e)))
				return e;
		}

		function gr(e, n) {
			if ("change" === e)
				return n;
		}

		var vr = !1;

		function br() {
			dr && (dr.detachEvent("onpropertychange", wr),
				mr = dr = null);
		}

		function wr(e) {
			if ("value" === e.propertyName && hr(mr))
				if (e = fr(mr, e, ln(e)),
					U)
					sn(e);
				else {
					U = !0;
					try {
						R(pr, e);
					} finally {
						U = !1,
							z();
					}
				}
		}

		function yr(e, n, t) {
			"focus" === e ? (br(),
				mr = t,
				(dr = n).attachEvent("onpropertychange", wr)) : "blur" === e && br();
		}

		function xr(e) {
			if ("selectionchange" === e || "keyup" === e || "keydown" === e)
				return hr(mr);
		}

		function kr(e, n) {
			if ("click" === e)
				return hr(n);
		}

		function Sr(e, n) {
			if ("input" === e || "change" === e)
				return hr(n);
		}

		I && (vr = un("input") && (!document.documentMode || 9 < document.documentMode));
		var Er = {
			eventTypes: ur,
			_isInputEventSupported: vr,
			extractEvents: function (e, n, t, r) {
				var o = n ? Pt(n) : window
					, i = o.nodeName && o.nodeName.toLowerCase();
				if ("select" === i || "input" === i && "file" === o.type)
					var a = gr;
				else if (lr(o))
					if (vr)
						a = Sr;
					else {
						a = xr;
						var c = yr;
					}
				else
					(i = o.nodeName) && "input" === i.toLowerCase() && ("checkbox" === o.type || "radio" === o.type) && (a = kr);
				if (a && (a = a(e, n)))
					return fr(a, t, r);
				c && c(e, o, n),
					"blur" === e && (e = o._wrapperState) && e.controlled && "number" === o.type && Ie(o, "number", o.value);
			}
		}
			, Cr = Vt.extend({
				view: null,
				detail: null
			})
			, Ar = {
				Alt: "altKey",
				Control: "ctrlKey",
				Meta: "metaKey",
				Shift: "shiftKey"
			};

		function Ir(e) {
			var n = this.nativeEvent;
			return n.getModifierState ? n.getModifierState(e) : !!(e = Ar[e]) && !!n[e];
		}

		function Tr() {
			return Ir;
		}

		var Pr = 0
			, Or = 0
			, _r = !1
			, jr = !1
			, Nr = Cr.extend({
				screenX: null,
				screenY: null,
				clientX: null,
				clientY: null,
				pageX: null,
				pageY: null,
				ctrlKey: null,
				shiftKey: null,
				altKey: null,
				metaKey: null,
				getModifierState: Tr,
				button: null,
				buttons: null,
				relatedTarget: function (e) {
					return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement);
				},
				movementX: function (e) {
					if ("movementX" in e)
						return e.movementX;
					var n = Pr;
					return Pr = e.screenX,
						_r ? "mousemove" === e.type ? e.screenX - n : 0 : (_r = !0,
							0);
				},
				movementY: function (e) {
					if ("movementY" in e)
						return e.movementY;
					var n = Or;
					return Or = e.screenY,
						jr ? "mousemove" === e.type ? e.screenY - n : 0 : (jr = !0,
							0);
				}
			})
			, Rr = Nr.extend({
				pointerId: null,
				width: null,
				height: null,
				pressure: null,
				tangentialPressure: null,
				tiltX: null,
				tiltY: null,
				twist: null,
				pointerType: null,
				isPrimary: null
			})
			, Lr = {
				mouseEnter: {
					registrationName: "onMouseEnter",
					dependencies: ["mouseout", "mouseover"]
				},
				mouseLeave: {
					registrationName: "onMouseLeave",
					dependencies: ["mouseout", "mouseover"]
				},
				pointerEnter: {
					registrationName: "onPointerEnter",
					dependencies: ["pointerout", "pointerover"]
				},
				pointerLeave: {
					registrationName: "onPointerLeave",
					dependencies: ["pointerout", "pointerover"]
				}
			}
			, Fr = {
				eventTypes: Lr,
				extractEvents: function (e, n, t, r, o) {
					var i = "mouseover" === e || "pointerover" === e
						, a = "mouseout" === e || "pointerout" === e;
					if (i && 0 == (32 & o) && (t.relatedTarget || t.fromElement) || !a && !i)
						return null;
					(i = r.window === r ? r : (i = r.ownerDocument) ? i.defaultView || i.parentWindow : window,
						a) ? (a = n,
							null !== (n = (n = t.relatedTarget || t.toElement) ? It(n) : null) && (n !== $e(n) || 5 !== n.tag && 6 !== n.tag) && (n = null)) : a = null;
					if (a === n)
						return null;
					if ("mouseout" === e || "mouseover" === e)
						var c = Nr
							, s = Lr.mouseLeave
							, l = Lr.mouseEnter
							, u = "mouse";
					else
						"pointerout" !== e && "pointerover" !== e || (c = Rr,
							s = Lr.pointerLeave,
							l = Lr.pointerEnter,
							u = "pointer");
					if (e = null == a ? i : Pt(a),
						i = null == n ? i : Pt(n),
						(s = c.getPooled(s, a, t, r)).type = u + "leave",
						s.target = e,
						s.relatedTarget = i,
						(t = c.getPooled(l, n, t, r)).type = u + "enter",
						t.target = i,
						t.relatedTarget = e,
						u = n,
						(r = a) && u)
						e: {
							for (l = u,
								a = 0,
								e = c = r; e; e = _t(e))
								a++;
							for (e = 0,
								n = l; n; n = _t(n))
								e++;
							for (; 0 < a - e;)
								c = _t(c),
									a--;
							for (; 0 < e - a;)
								l = _t(l),
									e--;
							for (; a--;) {
								if (c === l || c === l.alternate)
									break e;
								c = _t(c),
									l = _t(l);
							}
							c = null;
						}
					else
						c = null;
					for (l = c,
						c = []; r && r !== l && (null === (a = r.alternate) || a !== l);)
						c.push(r),
							r = _t(r);
					for (r = []; u && u !== l && (null === (a = u.alternate) || a !== l);)
						r.push(u),
							u = _t(u);
					for (u = 0; u < c.length; u++)
						Lt(c[u], "bubbled", s);
					for (u = r.length; 0 < u--;)
						Lt(r[u], "captured", t);
					return 0 == (64 & o) ? [s] : [s, t];
				}
			};
		var Mr = "function" == typeof Object.is ? Object.is : function (e, n) {
			return e === n && (0 !== e || 1 / e == 1 / n) || e != e && n != n;
		}
			, Ur = Object.prototype.hasOwnProperty;

		function Dr(e, n) {
			if (Mr(e, n))
				return !0;
			if ("object" != typeof e || null === e || "object" != typeof n || null === n)
				return !1;
			var t = Object.keys(e)
				, r = Object.keys(n);
			if (t.length !== r.length)
				return !1;
			for (r = 0; r < t.length; r++)
				if (!Ur.call(n, t[r]) || !Mr(e[t[r]], n[t[r]]))
					return !1;
			return !0;
		}

		var zr = I && "documentMode" in document && 11 >= document.documentMode
			, Br = {
				select: {
					phasedRegistrationNames: {
						bubbled: "onSelect",
						captured: "onSelectCapture"
					},
					dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")
				}
			}
			, Hr = null
			, Wr = null
			, Vr = null
			, Qr = !1;

		function Gr(e, n) {
			var t = n.window === n ? n.document : 9 === n.nodeType ? n : n.ownerDocument;
			return Qr || null == Hr || Hr !== ut(t) ? null : ("selectionStart" in (t = Hr) && pt(t) ? t = {
				start: t.selectionStart,
				end: t.selectionEnd
			} : t = {
				anchorNode: (t = (t.ownerDocument && t.ownerDocument.defaultView || window).getSelection()).anchorNode,
				anchorOffset: t.anchorOffset,
				focusNode: t.focusNode,
				focusOffset: t.focusOffset
			},
				Vr && Dr(Vr, t) ? null : (Vr = t,
					(e = Vt.getPooled(Br.select, Wr, e, n)).type = "select",
					e.target = Hr,
					Mt(e),
					e));
		}

		var qr = {
			eventTypes: Br,
			extractEvents: function (e, n, t, r, o, i) {
				if (!(i = !(o = i || (r.window === r ? r.document : 9 === r.nodeType ? r : r.ownerDocument)))) {
					e: {
						o = Xe(o),
							i = C.onSelect;
						for (var a = 0; a < i.length; a++)
							if (!o.has(i[a])) {
								o = !1;
								break e;
							}
						o = !0;
					}
					i = !o;
				}
				if (i)
					return null;
				switch (o = n ? Pt(n) : window,
				e) {
					case "focus":
						(lr(o) || "true" === o.contentEditable) && (Hr = o,
							Wr = n,
							Vr = null);
						break;
					case "blur":
						Vr = Wr = Hr = null;
						break;
					case "mousedown":
						Qr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						return Qr = !1,
							Gr(t, r);
					case "selectionchange":
						if (zr)
							break;
					case "keydown":
					case "keyup":
						return Gr(t, r);
				}
				return null;
			}
		}
			, Kr = Vt.extend({
				animationName: null,
				elapsedTime: null,
				pseudoElement: null
			})
			, Jr = Vt.extend({
				clipboardData: function (e) {
					return "clipboardData" in e ? e.clipboardData : window.clipboardData;
				}
			})
			, Yr = Cr.extend({
				relatedTarget: null
			});

		function Zr(e) {
			var n = e.keyCode;
			return "charCode" in e ? 0 === (e = e.charCode) && 13 === n && (e = 13) : e = n,
				10 === e && (e = 13),
				32 <= e || 13 === e ? e : 0;
		}

		var Xr = {
			Esc: "Escape",
			Spacebar: " ",
			Left: "ArrowLeft",
			Up: "ArrowUp",
			Right: "ArrowRight",
			Down: "ArrowDown",
			Del: "Delete",
			Win: "OS",
			Menu: "ContextMenu",
			Apps: "ContextMenu",
			Scroll: "ScrollLock",
			MozPrintableKey: "Unidentified"
		}
			, $r = {
				8: "Backspace",
				9: "Tab",
				12: "Clear",
				13: "Enter",
				16: "Shift",
				17: "Control",
				18: "Alt",
				19: "Pause",
				20: "CapsLock",
				27: "Escape",
				32: " ",
				33: "PageUp",
				34: "PageDown",
				35: "End",
				36: "Home",
				37: "ArrowLeft",
				38: "ArrowUp",
				39: "ArrowRight",
				40: "ArrowDown",
				45: "Insert",
				46: "Delete",
				112: "F1",
				113: "F2",
				114: "F3",
				115: "F4",
				116: "F5",
				117: "F6",
				118: "F7",
				119: "F8",
				120: "F9",
				121: "F10",
				122: "F11",
				123: "F12",
				144: "NumLock",
				145: "ScrollLock",
				224: "Meta"
			}
			, eo = Cr.extend({
				key: function (e) {
					if (e.key) {
						var n = Xr[e.key] || e.key;
						if ("Unidentified" !== n)
							return n;
					}
					return "keypress" === e.type ? 13 === (e = Zr(e)) ? "Enter" : String.fromCharCode(e) : "keydown" === e.type || "keyup" === e.type ? $r[e.keyCode] || "Unidentified" : "";
				},
				location: null,
				ctrlKey: null,
				shiftKey: null,
				altKey: null,
				metaKey: null,
				repeat: null,
				locale: null,
				getModifierState: Tr,
				charCode: function (e) {
					return "keypress" === e.type ? Zr(e) : 0;
				},
				keyCode: function (e) {
					return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
				},
				which: function (e) {
					return "keypress" === e.type ? Zr(e) : "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
				}
			})
			, no = Nr.extend({
				dataTransfer: null
			})
			, to = Cr.extend({
				touches: null,
				targetTouches: null,
				changedTouches: null,
				altKey: null,
				metaKey: null,
				ctrlKey: null,
				shiftKey: null,
				getModifierState: Tr
			})
			, ro = Vt.extend({
				propertyName: null,
				elapsedTime: null,
				pseudoElement: null
			})
			, oo = Nr.extend({
				deltaX: function (e) {
					return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
				},
				deltaY: function (e) {
					return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
				},
				deltaZ: null,
				deltaMode: null
			})
			, io = {
				eventTypes: Un,
				extractEvents: function (e, n, t, r) {
					var o = Dn.get(e);
					if (!o)
						return null;
					switch (e) {
						case "keypress":
							if (0 === Zr(t))
								return null;
						case "keydown":
						case "keyup":
							e = eo;
							break;
						case "blur":
						case "focus":
							e = Yr;
							break;
						case "click":
							if (2 === t.button)
								return null;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							e = Nr;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							e = no;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							e = to;
							break;
						case Ge:
						case qe:
						case Ke:
							e = Kr;
							break;
						case Je:
							e = ro;
							break;
						case "scroll":
							e = Cr;
							break;
						case "wheel":
							e = oo;
							break;
						case "copy":
						case "cut":
						case "paste":
							e = Jr;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							e = Rr;
							break;
						default:
							e = Vt;
					}
					return Mt(n = e.getPooled(o, n, t, r)),
						n;
				}
			};
		if (b)
			throw Error(a(101));
		b = Array.prototype.slice.call("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" ")),
			y(),
			p = Ot,
			h = Tt,
			g = Pt,
			A({
				SimpleEventPlugin: io,
				EnterLeaveEventPlugin: Fr,
				ChangeEventPlugin: Er,
				SelectEventPlugin: qr,
				BeforeInputEventPlugin: cr
			});
		var ao = []
			, co = -1;

		function so(e) {
			0 > co || (e.current = ao[co],
				ao[co] = null,
				co--);
		}

		function lo(e, n) {
			co++,
				ao[co] = e.current,
				e.current = n;
		}

		var uo = {}
			, fo = {
				current: uo
			}
			, mo = {
				current: !1
			}
			, po = uo;

		function ho(e, n) {
			var t = e.type.contextTypes;
			if (!t)
				return uo;
			var r = e.stateNode;
			if (r && r.__reactInternalMemoizedUnmaskedChildContext === n)
				return r.__reactInternalMemoizedMaskedChildContext;
			var o, i = {};
			for (o in t)
				i[o] = n[o];
			return r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = n,
				e.__reactInternalMemoizedMaskedChildContext = i),
				i;
		}

		function go(e) {
			return null != (e = e.childContextTypes);
		}

		function vo() {
			so(mo),
				so(fo);
		}

		function bo(e, n, t) {
			if (fo.current !== uo)
				throw Error(a(168));
			lo(fo, n),
				lo(mo, t);
		}

		function wo(e, n, t) {
			var r = e.stateNode;
			if (e = n.childContextTypes,
				"function" != typeof r.getChildContext)
				return t;
			for (var i in r = r.getChildContext())
				if (!(i in e))
					throw Error(a(108, ge(n) || "Unknown", i));
			return o({}, t, {}, r);
		}

		function yo(e) {
			return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || uo,
				po = fo.current,
				lo(fo, e),
				lo(mo, mo.current),
				!0;
		}

		function xo(e, n, t) {
			var r = e.stateNode;
			if (!r)
				throw Error(a(169));
			t ? (e = wo(e, n, po),
				r.__reactInternalMemoizedMergedChildContext = e,
				so(mo),
				so(fo),
				lo(fo, e)) : so(mo),
				lo(mo, t);
		}

		var ko = i.unstable_runWithPriority
			, So = i.unstable_scheduleCallback
			, Eo = i.unstable_cancelCallback
			, Co = i.unstable_requestPaint
			, Ao = i.unstable_now
			, Io = i.unstable_getCurrentPriorityLevel
			, To = i.unstable_ImmediatePriority
			, Po = i.unstable_UserBlockingPriority
			, Oo = i.unstable_NormalPriority
			, _o = i.unstable_LowPriority
			, jo = i.unstable_IdlePriority
			, No = {}
			, Ro = i.unstable_shouldYield
			, Lo = void 0 !== Co ? Co : function () {
			}
			, Fo = null
			, Mo = null
			, Uo = !1
			, Do = Ao()
			, zo = 1e4 > Do ? Ao : function () {
				return Ao() - Do;
			}
			;

		function Bo() {
			switch (Io()) {
				case To:
					return 99;
				case Po:
					return 98;
				case Oo:
					return 97;
				case _o:
					return 96;
				case jo:
					return 95;
				default:
					throw Error(a(332));
			}
		}

		function Ho(e) {
			switch (e) {
				case 99:
					return To;
				case 98:
					return Po;
				case 97:
					return Oo;
				case 96:
					return _o;
				case 95:
					return jo;
				default:
					throw Error(a(332));
			}
		}

		function Wo(e, n) {
			return e = Ho(e),
				ko(e, n);
		}

		function Vo(e, n, t) {
			return e = Ho(e),
				So(e, n, t);
		}

		function Qo(e) {
			return null === Fo ? (Fo = [e],
				Mo = So(To, qo)) : Fo.push(e),
				No;
		}

		function Go() {
			if (null !== Mo) {
				var e = Mo;
				Mo = null,
					Eo(e);
			}
			qo();
		}

		function qo() {
			if (!Uo && null !== Fo) {
				Uo = !0;
				var e = 0;
				try {
					var n = Fo;
					Wo(99, (function () {
						for (; e < n.length; e++) {
							var t = n[e];
							do {
								t = t(!0);
							} while (null !== t);
						}
					}
					)),
						Fo = null;
				} catch (n) {
					throw null !== Fo && (Fo = Fo.slice(e + 1)),
					So(To, Go),
					n;
				} finally {
					Uo = !1;
				}
			}
		}

		function Ko(e, n, t) {
			return 1073741821 - (1 + ((1073741821 - e + n / 10) / (t /= 10) | 0)) * t;
		}

		function Jo(e, n) {
			if (e && e.defaultProps)
				for (var t in n = o({}, n),
					e = e.defaultProps)
					void 0 === n[t] && (n[t] = e[t]);
			return n;
		}

		var Yo = {
			current: null
		}
			, Zo = null
			, Xo = null
			, $o = null;

		function ei() {
			$o = Xo = Zo = null;
		}

		function ni(e) {
			var n = Yo.current;
			so(Yo),
				e.type._context._currentValue = n;
		}

		function ti(e, n) {
			for (; null !== e;) {
				var t = e.alternate;
				if (e.childExpirationTime < n)
					e.childExpirationTime = n,
						null !== t && t.childExpirationTime < n && (t.childExpirationTime = n);
				else {
					if (!(null !== t && t.childExpirationTime < n))
						break;
					t.childExpirationTime = n;
				}
				e = e.return;
			}
		}

		function ri(e, n) {
			Zo = e,
				$o = Xo = null,
				null !== (e = e.dependencies) && null !== e.firstContext && (e.expirationTime >= n && (Oa = !0),
					e.firstContext = null);
		}

		function oi(e, n) {
			if ($o !== e && !1 !== n && 0 !== n)
				if ("number" == typeof n && 1073741823 !== n || ($o = e,
					n = 1073741823),
					n = {
						context: e,
						observedBits: n,
						next: null
					},
					null === Xo) {
					if (null === Zo)
						throw Error(a(308));
					Xo = n,
						Zo.dependencies = {
							expirationTime: 0,
							firstContext: n,
							responders: null
						};
				} else
					Xo = Xo.next = n;
			return e._currentValue;
		}

		var ii = !1;

		function ai(e) {
			e.updateQueue = {
				baseState: e.memoizedState,
				baseQueue: null,
				shared: {
					pending: null
				},
				effects: null
			};
		}

		function ci(e, n) {
			e = e.updateQueue,
				n.updateQueue === e && (n.updateQueue = {
					baseState: e.baseState,
					baseQueue: e.baseQueue,
					shared: e.shared,
					effects: e.effects
				});
		}

		function si(e, n) {
			return (e = {
				expirationTime: e,
				suspenseConfig: n,
				tag: 0,
				payload: null,
				callback: null,
				next: null
			}).next = e;
		}

		function li(e, n) {
			if (null !== (e = e.updateQueue)) {
				var t = (e = e.shared).pending;
				null === t ? n.next = n : (n.next = t.next,
					t.next = n),
					e.pending = n;
			}
		}

		function ui(e, n) {
			var t = e.alternate;
			null !== t && ci(t, e),
				null === (t = (e = e.updateQueue).baseQueue) ? (e.baseQueue = n.next = n,
					n.next = n) : (n.next = t.next,
						t.next = n);
		}

		function fi(e, n, t, r) {
			var i = e.updateQueue;
			ii = !1;
			var a = i.baseQueue
				, c = i.shared.pending;
			if (null !== c) {
				if (null !== a) {
					var s = a.next;
					a.next = c.next,
						c.next = s;
				}
				a = c,
					i.shared.pending = null,
					null !== (s = e.alternate) && (null !== (s = s.updateQueue) && (s.baseQueue = c));
			}
			if (null !== a) {
				s = a.next;
				var l = i.baseState
					, u = 0
					, f = null
					, d = null
					, m = null;
				if (null !== s)
					for (var p = s; ;) {
						if ((c = p.expirationTime) < r) {
							var h = {
								expirationTime: p.expirationTime,
								suspenseConfig: p.suspenseConfig,
								tag: p.tag,
								payload: p.payload,
								callback: p.callback,
								next: null
							};
							null === m ? (d = m = h,
								f = l) : m = m.next = h,
								c > u && (u = c);
						} else {
							null !== m && (m = m.next = {
								expirationTime: 1073741823,
								suspenseConfig: p.suspenseConfig,
								tag: p.tag,
								payload: p.payload,
								callback: p.callback,
								next: null
							}),
								is(c, p.suspenseConfig);
							e: {
								var g = e
									, v = p;
								switch (c = n,
								h = t,
								v.tag) {
									case 1:
										if ("function" == typeof (g = v.payload)) {
											l = g.call(h, l, c);
											break e;
										}
										l = g;
										break e;
									case 3:
										g.effectTag = -4097 & g.effectTag | 64;
									case 0:
										if (null == (c = "function" == typeof (g = v.payload) ? g.call(h, l, c) : g))
											break e;
										l = o({}, l, c);
										break e;
									case 2:
										ii = !0;
								}
							}
							null !== p.callback && (e.effectTag |= 32,
								null === (c = i.effects) ? i.effects = [p] : c.push(p));
						}
						if (null === (p = p.next) || p === s) {
							if (null === (c = i.shared.pending))
								break;
							p = a.next = c.next,
								c.next = s,
								i.baseQueue = a = c,
								i.shared.pending = null;
						}
					}
				null === m ? f = l : m.next = d,
					i.baseState = f,
					i.baseQueue = m,
					as(u),
					e.expirationTime = u,
					e.memoizedState = l;
			}
		}

		function di(e, n, t) {
			if (e = n.effects,
				n.effects = null,
				null !== e)
				for (n = 0; n < e.length; n++) {
					var r = e[n]
						, o = r.callback;
					if (null !== o) {
						if (r.callback = null,
							r = o,
							o = t,
							"function" != typeof r)
							throw Error(a(191, r));
						r.call(o);
					}
				}
		}

		var mi = Y.ReactCurrentBatchConfig
			, pi = (new r.Component).refs;

		function hi(e, n, t, r) {
			t = null == (t = t(r, n = e.memoizedState)) ? n : o({}, n, t),
				e.memoizedState = t,
				0 === e.expirationTime && (e.updateQueue.baseState = t);
		}

		var gi = {
			isMounted: function (e) {
				return !!(e = e._reactInternalFiber) && $e(e) === e;
			},
			enqueueSetState: function (e, n, t) {
				e = e._reactInternalFiber;
				var r = Gc()
					, o = mi.suspense;
				(o = si(r = qc(r, e, o), o)).payload = n,
					null != t && (o.callback = t),
					li(e, o),
					Kc(e, r);
			},
			enqueueReplaceState: function (e, n, t) {
				e = e._reactInternalFiber;
				var r = Gc()
					, o = mi.suspense;
				(o = si(r = qc(r, e, o), o)).tag = 1,
					o.payload = n,
					null != t && (o.callback = t),
					li(e, o),
					Kc(e, r);
			},
			enqueueForceUpdate: function (e, n) {
				e = e._reactInternalFiber;
				var t = Gc()
					, r = mi.suspense;
				(r = si(t = qc(t, e, r), r)).tag = 2,
					null != n && (r.callback = n),
					li(e, r),
					Kc(e, t);
			}
		};

		function vi(e, n, t, r, o, i, a) {
			return "function" == typeof (e = e.stateNode).shouldComponentUpdate ? e.shouldComponentUpdate(r, i, a) : !n.prototype || !n.prototype.isPureReactComponent || (!Dr(t, r) || !Dr(o, i));
		}

		function bi(e, n, t) {
			var r = !1
				, o = uo
				, i = n.contextType;
			return "object" == typeof i && null !== i ? i = oi(i) : (o = go(n) ? po : fo.current,
				i = (r = null != (r = n.contextTypes)) ? ho(e, o) : uo),
				n = new n(t, i),
				e.memoizedState = null !== n.state && void 0 !== n.state ? n.state : null,
				n.updater = gi,
				e.stateNode = n,
				n._reactInternalFiber = e,
				r && ((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext = o,
					e.__reactInternalMemoizedMaskedChildContext = i),
				n;
		}

		function wi(e, n, t, r) {
			e = n.state,
				"function" == typeof n.componentWillReceiveProps && n.componentWillReceiveProps(t, r),
				"function" == typeof n.UNSAFE_componentWillReceiveProps && n.UNSAFE_componentWillReceiveProps(t, r),
				n.state !== e && gi.enqueueReplaceState(n, n.state, null);
		}

		function yi(e, n, t, r) {
			var o = e.stateNode;
			o.props = t,
				o.state = e.memoizedState,
				o.refs = pi,
				ai(e);
			var i = n.contextType;
			"object" == typeof i && null !== i ? o.context = oi(i) : (i = go(n) ? po : fo.current,
				o.context = ho(e, i)),
				fi(e, t, o, r),
				o.state = e.memoizedState,
				"function" == typeof (i = n.getDerivedStateFromProps) && (hi(e, n, i, t),
					o.state = e.memoizedState),
				"function" == typeof n.getDerivedStateFromProps || "function" == typeof o.getSnapshotBeforeUpdate || "function" != typeof o.UNSAFE_componentWillMount && "function" != typeof o.componentWillMount || (n = o.state,
					"function" == typeof o.componentWillMount && o.componentWillMount(),
					"function" == typeof o.UNSAFE_componentWillMount && o.UNSAFE_componentWillMount(),
					n !== o.state && gi.enqueueReplaceState(o, o.state, null),
					fi(e, t, o, r),
					o.state = e.memoizedState),
				"function" == typeof o.componentDidMount && (e.effectTag |= 4);
		}

		var xi = Array.isArray;

		function ki(e, n, t) {
			if (null !== (e = t.ref) && "function" != typeof e && "object" != typeof e) {
				if (t._owner) {
					if (t = t._owner) {
						if (1 !== t.tag)
							throw Error(a(309));
						var r = t.stateNode;
					}
					if (!r)
						throw Error(a(147, e));
					var o = "" + e;
					return null !== n && null !== n.ref && "function" == typeof n.ref && n.ref._stringRef === o ? n.ref : ((n = function (e) {
						var n = r.refs;
						n === pi && (n = r.refs = {}),
							null === e ? delete n[o] : n[o] = e;
					}
					)._stringRef = o,
						n);
				}
				if ("string" != typeof e)
					throw Error(a(284));
				if (!t._owner)
					throw Error(a(290, e));
			}
			return e;
		}

		function Si(e, n) {
			if ("textarea" !== e.type)
				throw Error(a(31, "[object Object]" === Object.prototype.toString.call(n) ? "object with keys {" + Object.keys(n).join(", ") + "}" : n, ""));
		}

		function Ei(e) {
			function n(n, t) {
				if (e) {
					var r = n.lastEffect;
					null !== r ? (r.nextEffect = t,
						n.lastEffect = t) : n.firstEffect = n.lastEffect = t,
						t.nextEffect = null,
						t.effectTag = 8;
				}
			}

			function t(t, r) {
				if (!e)
					return null;
				for (; null !== r;)
					n(t, r),
						r = r.sibling;
				return null;
			}

			function r(e, n) {
				for (e = new Map; null !== n;)
					null !== n.key ? e.set(n.key, n) : e.set(n.index, n),
						n = n.sibling;
				return e;
			}

			function o(e, n) {
				return (e = As(e, n)).index = 0,
					e.sibling = null,
					e;
			}

			function i(n, t, r) {
				return n.index = r,
					e ? null !== (r = n.alternate) ? (r = r.index) < t ? (n.effectTag = 2,
						t) : r : (n.effectTag = 2,
							t) : t;
			}

			function c(n) {
				return e && null === n.alternate && (n.effectTag = 2),
					n;
			}

			function s(e, n, t, r) {
				return null === n || 6 !== n.tag ? ((n = Ps(t, e.mode, r)).return = e,
					n) : ((n = o(n, t)).return = e,
						n);
			}

			function l(e, n, t, r) {
				return null !== n && n.elementType === t.type ? ((r = o(n, t.props)).ref = ki(e, n, t),
					r.return = e,
					r) : ((r = Is(t.type, t.key, t.props, null, e.mode, r)).ref = ki(e, n, t),
						r.return = e,
						r);
			}

			function u(e, n, t, r) {
				return null === n || 4 !== n.tag || n.stateNode.containerInfo !== t.containerInfo || n.stateNode.implementation !== t.implementation ? ((n = Os(t, e.mode, r)).return = e,
					n) : ((n = o(n, t.children || [])).return = e,
						n);
			}

			function f(e, n, t, r, i) {
				return null === n || 7 !== n.tag ? ((n = Ts(t, e.mode, r, i)).return = e,
					n) : ((n = o(n, t)).return = e,
						n);
			}

			function d(e, n, t) {
				if ("string" == typeof n || "number" == typeof n)
					return (n = Ps("" + n, e.mode, t)).return = e,
						n;
				if ("object" == typeof n && null !== n) {
					switch (n.$$typeof) {
						case ee:
							return (t = Is(n.type, n.key, n.props, null, e.mode, t)).ref = ki(e, null, n),
								t.return = e,
								t;
						case ne:
							return (n = Os(n, e.mode, t)).return = e,
								n;
					}
					if (xi(n) || he(n))
						return (n = Ts(n, e.mode, t, null)).return = e,
							n;
					Si(e, n);
				}
				return null;
			}

			function m(e, n, t, r) {
				var o = null !== n ? n.key : null;
				if ("string" == typeof t || "number" == typeof t)
					return null !== o ? null : s(e, n, "" + t, r);
				if ("object" == typeof t && null !== t) {
					switch (t.$$typeof) {
						case ee:
							return t.key === o ? t.type === te ? f(e, n, t.props.children, r, o) : l(e, n, t, r) : null;
						case ne:
							return t.key === o ? u(e, n, t, r) : null;
					}
					if (xi(t) || he(t))
						return null !== o ? null : f(e, n, t, r, null);
					Si(e, t);
				}
				return null;
			}

			function p(e, n, t, r, o) {
				if ("string" == typeof r || "number" == typeof r)
					return s(n, e = e.get(t) || null, "" + r, o);
				if ("object" == typeof r && null !== r) {
					switch (r.$$typeof) {
						case ee:
							return e = e.get(null === r.key ? t : r.key) || null,
								r.type === te ? f(n, e, r.props.children, o, r.key) : l(n, e, r, o);
						case ne:
							return u(n, e = e.get(null === r.key ? t : r.key) || null, r, o);
					}
					if (xi(r) || he(r))
						return f(n, e = e.get(t) || null, r, o, null);
					Si(n, r);
				}
				return null;
			}

			function h(o, a, c, s) {
				for (var l = null, u = null, f = a, h = a = 0, g = null; null !== f && h < c.length; h++) {
					f.index > h ? (g = f,
						f = null) : g = f.sibling;
					var v = m(o, f, c[h], s);
					if (null === v) {
						null === f && (f = g);
						break;
					}
					e && f && null === v.alternate && n(o, f),
						a = i(v, a, h),
						null === u ? l = v : u.sibling = v,
						u = v,
						f = g;
				}
				if (h === c.length)
					return t(o, f),
						l;
				if (null === f) {
					for (; h < c.length; h++)
						null !== (f = d(o, c[h], s)) && (a = i(f, a, h),
							null === u ? l = f : u.sibling = f,
							u = f);
					return l;
				}
				for (f = r(o, f); h < c.length; h++)
					null !== (g = p(f, o, h, c[h], s)) && (e && null !== g.alternate && f.delete(null === g.key ? h : g.key),
						a = i(g, a, h),
						null === u ? l = g : u.sibling = g,
						u = g);
				return e && f.forEach((function (e) {
					return n(o, e);
				}
				)),
					l;
			}

			function g(o, c, s, l) {
				var u = he(s);
				if ("function" != typeof u)
					throw Error(a(150));
				if (null == (s = u.call(s)))
					throw Error(a(151));
				for (var f = u = null, h = c, g = c = 0, v = null, b = s.next(); null !== h && !b.done; g++,
					b = s.next()) {
					h.index > g ? (v = h,
						h = null) : v = h.sibling;
					var w = m(o, h, b.value, l);
					if (null === w) {
						null === h && (h = v);
						break;
					}
					e && h && null === w.alternate && n(o, h),
						c = i(w, c, g),
						null === f ? u = w : f.sibling = w,
						f = w,
						h = v;
				}
				if (b.done)
					return t(o, h),
						u;
				if (null === h) {
					for (; !b.done; g++,
						b = s.next())
						null !== (b = d(o, b.value, l)) && (c = i(b, c, g),
							null === f ? u = b : f.sibling = b,
							f = b);
					return u;
				}
				for (h = r(o, h); !b.done; g++,
					b = s.next())
					null !== (b = p(h, o, g, b.value, l)) && (e && null !== b.alternate && h.delete(null === b.key ? g : b.key),
						c = i(b, c, g),
						null === f ? u = b : f.sibling = b,
						f = b);
				return e && h.forEach((function (e) {
					return n(o, e);
				}
				)),
					u;
			}

			return function (e, r, i, s) {
				var l = "object" == typeof i && null !== i && i.type === te && null === i.key;
				l && (i = i.props.children);
				var u = "object" == typeof i && null !== i;
				if (u)
					switch (i.$$typeof) {
						case ee:
							e: {
								for (u = i.key,
									l = r; null !== l;) {
									if (l.key === u) {
										switch (l.tag) {
											case 7:
												if (i.type === te) {
													t(e, l.sibling),
														(r = o(l, i.props.children)).return = e,
														e = r;
													break e;
												}
												break;
											default:
												if (l.elementType === i.type) {
													t(e, l.sibling),
														(r = o(l, i.props)).ref = ki(e, l, i),
														r.return = e,
														e = r;
													break e;
												}
										}
										t(e, l);
										break;
									}
									n(e, l),
										l = l.sibling;
								}
								i.type === te ? ((r = Ts(i.props.children, e.mode, s, i.key)).return = e,
									e = r) : ((s = Is(i.type, i.key, i.props, null, e.mode, s)).ref = ki(e, r, i),
										s.return = e,
										e = s);
							}
							return c(e);
						case ne:
							e: {
								for (l = i.key; null !== r;) {
									if (r.key === l) {
										if (4 === r.tag && r.stateNode.containerInfo === i.containerInfo && r.stateNode.implementation === i.implementation) {
											t(e, r.sibling),
												(r = o(r, i.children || [])).return = e,
												e = r;
											break e;
										}
										t(e, r);
										break;
									}
									n(e, r),
										r = r.sibling;
								}
								(r = Os(i, e.mode, s)).return = e,
									e = r;
							}
							return c(e);
					}
				if ("string" == typeof i || "number" == typeof i)
					return i = "" + i,
						null !== r && 6 === r.tag ? (t(e, r.sibling),
							(r = o(r, i)).return = e,
							e = r) : (t(e, r),
								(r = Ps(i, e.mode, s)).return = e,
								e = r),
						c(e);
				if (xi(i))
					return h(e, r, i, s);
				if (he(i))
					return g(e, r, i, s);
				if (u && Si(e, i),
					void 0 === i && !l)
					switch (e.tag) {
						case 1:
						case 0:
							throw e = e.type,
							Error(a(152, e.displayName || e.name || "Component"));
					}
				return t(e, r);
			};
		}

		var Ci = Ei(!0)
			, Ai = Ei(!1)
			, Ii = {}
			, Ti = {
				current: Ii
			}
			, Pi = {
				current: Ii
			}
			, Oi = {
				current: Ii
			};

		function _i(e) {
			if (e === Ii)
				throw Error(a(174));
			return e;
		}

		function ji(e, n) {
			switch (lo(Oi, n),
			lo(Pi, e),
			lo(Ti, Ii),
			e = n.nodeType) {
				case 9:
				case 11:
					n = (n = n.documentElement) ? n.namespaceURI : Me(null, "");
					break;
				default:
					n = Me(n = (e = 8 === e ? n.parentNode : n).namespaceURI || null, e = e.tagName);
			}
			so(Ti),
				lo(Ti, n);
		}

		function Ni() {
			so(Ti),
				so(Pi),
				so(Oi);
		}

		function Ri(e) {
			_i(Oi.current);
			var n = _i(Ti.current)
				, t = Me(n, e.type);
			n !== t && (lo(Pi, e),
				lo(Ti, t));
		}

		function Li(e) {
			Pi.current === e && (so(Ti),
				so(Pi));
		}

		var Fi = {
			current: 0
		};

		function Mi(e) {
			for (var n = e; null !== n;) {
				if (13 === n.tag) {
					var t = n.memoizedState;
					if (null !== t && (null === (t = t.dehydrated) || "$?" === t.data || "$!" === t.data))
						return n;
				} else if (19 === n.tag && void 0 !== n.memoizedProps.revealOrder) {
					if (0 != (64 & n.effectTag))
						return n;
				} else if (null !== n.child) {
					n.child.return = n,
						n = n.child;
					continue;
				}
				if (n === e)
					break;
				for (; null === n.sibling;) {
					if (null === n.return || n.return === e)
						return null;
					n = n.return;
				}
				n.sibling.return = n.return,
					n = n.sibling;
			}
			return null;
		}

		function Ui(e, n) {
			return {
				responder: e,
				props: n
			};
		}

		var Di = Y.ReactCurrentDispatcher
			, zi = Y.ReactCurrentBatchConfig
			, Bi = 0
			, Hi = null
			, Wi = null
			, Vi = null
			, Qi = !1;

		function Gi() {
			throw Error(a(321));
		}

		function qi(e, n) {
			if (null === n)
				return !1;
			for (var t = 0; t < n.length && t < e.length; t++)
				if (!Mr(e[t], n[t]))
					return !1;
			return !0;
		}

		function Ki(e, n, t, r, o, i) {
			if (Bi = i,
				Hi = n,
				n.memoizedState = null,
				n.updateQueue = null,
				n.expirationTime = 0,
				Di.current = null === e || null === e.memoizedState ? va : ba,
				e = t(r, o),
				n.expirationTime === Bi) {
				i = 0;
				do {
					if (n.expirationTime = 0,
						!(25 > i))
						throw Error(a(301));
					i += 1,
						Vi = Wi = null,
						n.updateQueue = null,
						Di.current = wa,
						e = t(r, o);
				} while (n.expirationTime === Bi);
			}
			if (Di.current = ga,
				n = null !== Wi && null !== Wi.next,
				Bi = 0,
				Vi = Wi = Hi = null,
				Qi = !1,
				n)
				throw Error(a(300));
			return e;
		}

		function Ji() {
			var e = {
				memoizedState: null,
				baseState: null,
				baseQueue: null,
				queue: null,
				next: null
			};
			return null === Vi ? Hi.memoizedState = Vi = e : Vi = Vi.next = e,
				Vi;
		}

		function Yi() {
			if (null === Wi) {
				var e = Hi.alternate;
				e = null !== e ? e.memoizedState : null;
			} else
				e = Wi.next;
			var n = null === Vi ? Hi.memoizedState : Vi.next;
			if (null !== n)
				Vi = n,
					Wi = e;
			else {
				if (null === e)
					throw Error(a(310));
				e = {
					memoizedState: (Wi = e).memoizedState,
					baseState: Wi.baseState,
					baseQueue: Wi.baseQueue,
					queue: Wi.queue,
					next: null
				},
					null === Vi ? Hi.memoizedState = Vi = e : Vi = Vi.next = e;
			}
			return Vi;
		}

		function Zi(e, n) {
			return "function" == typeof n ? n(e) : n;
		}

		function Xi(e) {
			var n = Yi()
				, t = n.queue;
			if (null === t)
				throw Error(a(311));
			t.lastRenderedReducer = e;
			var r = Wi
				, o = r.baseQueue
				, i = t.pending;
			if (null !== i) {
				if (null !== o) {
					var c = o.next;
					o.next = i.next,
						i.next = c;
				}
				r.baseQueue = o = i,
					t.pending = null;
			}
			if (null !== o) {
				o = o.next,
					r = r.baseState;
				var s = c = i = null
					, l = o;
				do {
					var u = l.expirationTime;
					if (u < Bi) {
						var f = {
							expirationTime: l.expirationTime,
							suspenseConfig: l.suspenseConfig,
							action: l.action,
							eagerReducer: l.eagerReducer,
							eagerState: l.eagerState,
							next: null
						};
						null === s ? (c = s = f,
							i = r) : s = s.next = f,
							u > Hi.expirationTime && (Hi.expirationTime = u,
								as(u));
					} else
						null !== s && (s = s.next = {
							expirationTime: 1073741823,
							suspenseConfig: l.suspenseConfig,
							action: l.action,
							eagerReducer: l.eagerReducer,
							eagerState: l.eagerState,
							next: null
						}),
							is(u, l.suspenseConfig),
							r = l.eagerReducer === e ? l.eagerState : e(r, l.action);
					l = l.next;
				} while (null !== l && l !== o);
				null === s ? i = r : s.next = c,
					Mr(r, n.memoizedState) || (Oa = !0),
					n.memoizedState = r,
					n.baseState = i,
					n.baseQueue = s,
					t.lastRenderedState = r;
			}
			return [n.memoizedState, t.dispatch];
		}

		function $i(e) {
			var n = Yi()
				, t = n.queue;
			if (null === t)
				throw Error(a(311));
			t.lastRenderedReducer = e;
			var r = t.dispatch
				, o = t.pending
				, i = n.memoizedState;
			if (null !== o) {
				t.pending = null;
				var c = o = o.next;
				do {
					i = e(i, c.action),
						c = c.next;
				} while (c !== o);
				Mr(i, n.memoizedState) || (Oa = !0),
					n.memoizedState = i,
					null === n.baseQueue && (n.baseState = i),
					t.lastRenderedState = i;
			}
			return [i, r];
		}

		function ea(e) {
			var n = Ji();
			return "function" == typeof e && (e = e()),
				n.memoizedState = n.baseState = e,
				e = (e = n.queue = {
					pending: null,
					dispatch: null,
					lastRenderedReducer: Zi,
					lastRenderedState: e
				}).dispatch = ha.bind(null, Hi, e),
				[n.memoizedState, e];
		}

		function na(e, n, t, r) {
			return e = {
				tag: e,
				create: n,
				destroy: t,
				deps: r,
				next: null
			},
				null === (n = Hi.updateQueue) ? (n = {
					lastEffect: null
				},
					Hi.updateQueue = n,
					n.lastEffect = e.next = e) : null === (t = n.lastEffect) ? n.lastEffect = e.next = e : (r = t.next,
						t.next = e,
						e.next = r,
						n.lastEffect = e),
				e;
		}

		function ta() {
			return Yi().memoizedState;
		}

		function ra(e, n, t, r) {
			var o = Ji();
			Hi.effectTag |= e,
				o.memoizedState = na(1 | n, t, void 0, void 0 === r ? null : r);
		}

		function oa(e, n, t, r) {
			var o = Yi();
			r = void 0 === r ? null : r;
			var i = void 0;
			if (null !== Wi) {
				var a = Wi.memoizedState;
				if (i = a.destroy,
					null !== r && qi(r, a.deps))
					return void na(n, t, i, r);
			}
			Hi.effectTag |= e,
				o.memoizedState = na(1 | n, t, i, r);
		}

		function ia(e, n) {
			return ra(516, 4, e, n);
		}

		function aa(e, n) {
			return oa(516, 4, e, n);
		}

		function ca(e, n) {
			return oa(4, 2, e, n);
		}

		function sa(e, n) {
			return "function" == typeof n ? (e = e(),
				n(e),
				function () {
					n(null);
				}
			) : null != n ? (e = e(),
				n.current = e,
				function () {
					n.current = null;
				}
			) : void 0;
		}

		function la(e, n, t) {
			return t = null != t ? t.concat([e]) : null,
				oa(4, 2, sa.bind(null, n, e), t);
		}

		function ua() {
		}

		function fa(e, n) {
			return Ji().memoizedState = [e, void 0 === n ? null : n],
				e;
		}

		function da(e, n) {
			var t = Yi();
			n = void 0 === n ? null : n;
			var r = t.memoizedState;
			return null !== r && null !== n && qi(n, r[1]) ? r[0] : (t.memoizedState = [e, n],
				e);
		}

		function ma(e, n) {
			var t = Yi();
			n = void 0 === n ? null : n;
			var r = t.memoizedState;
			return null !== r && null !== n && qi(n, r[1]) ? r[0] : (e = e(),
				t.memoizedState = [e, n],
				e);
		}

		function pa(e, n, t) {
			var r = Bo();
			Wo(98 > r ? 98 : r, (function () {
				e(!0);
			}
			)),
				Wo(97 < r ? 97 : r, (function () {
					var r = zi.suspense;
					zi.suspense = void 0 === n ? null : n;
					try {
						e(!1),
							t();
					} finally {
						zi.suspense = r;
					}
				}
				));
		}

		function ha(e, n, t) {
			var r = Gc()
				, o = mi.suspense;
			o = {
				expirationTime: r = qc(r, e, o),
				suspenseConfig: o,
				action: t,
				eagerReducer: null,
				eagerState: null,
				next: null
			};
			var i = n.pending;
			if (null === i ? o.next = o : (o.next = i.next,
				i.next = o),
				n.pending = o,
				i = e.alternate,
				e === Hi || null !== i && i === Hi)
				Qi = !0,
					o.expirationTime = Bi,
					Hi.expirationTime = Bi;
			else {
				if (0 === e.expirationTime && (null === i || 0 === i.expirationTime) && null !== (i = n.lastRenderedReducer))
					try {
						var a = n.lastRenderedState
							, c = i(a, t);
						if (o.eagerReducer = i,
							o.eagerState = c,
							Mr(c, a))
							return;
					} catch (e) {
					}
				Kc(e, r);
			}
		}

		var ga = {
			readContext: oi,
			useCallback: Gi,
			useContext: Gi,
			useEffect: Gi,
			useImperativeHandle: Gi,
			useLayoutEffect: Gi,
			useMemo: Gi,
			useReducer: Gi,
			useRef: Gi,
			useState: Gi,
			useDebugValue: Gi,
			useResponder: Gi,
			useDeferredValue: Gi,
			useTransition: Gi
		}
			, va = {
				readContext: oi,
				useCallback: fa,
				useContext: oi,
				useEffect: ia,
				useImperativeHandle: function (e, n, t) {
					return t = null != t ? t.concat([e]) : null,
						ra(4, 2, sa.bind(null, n, e), t);
				},
				useLayoutEffect: function (e, n) {
					return ra(4, 2, e, n);
				},
				useMemo: function (e, n) {
					var t = Ji();
					return n = void 0 === n ? null : n,
						e = e(),
						t.memoizedState = [e, n],
						e;
				},
				useReducer: function (e, n, t) {
					var r = Ji();
					return n = void 0 !== t ? t(n) : n,
						r.memoizedState = r.baseState = n,
						e = (e = r.queue = {
							pending: null,
							dispatch: null,
							lastRenderedReducer: e,
							lastRenderedState: n
						}).dispatch = ha.bind(null, Hi, e),
						[r.memoizedState, e];
				},
				useRef: function (e) {
					return e = {
						current: e
					},
						Ji().memoizedState = e;
				},
				useState: ea,
				useDebugValue: ua,
				useResponder: Ui,
				useDeferredValue: function (e, n) {
					var t = ea(e)
						, r = t[0]
						, o = t[1];
					return ia((function () {
						var t = zi.suspense;
						zi.suspense = void 0 === n ? null : n;
						try {
							o(e);
						} finally {
							zi.suspense = t;
						}
					}
					), [e, n]),
						r;
				},
				useTransition: function (e) {
					var n = ea(!1)
						, t = n[0];
					return n = n[1],
						[fa(pa.bind(null, n, e), [n, e]), t];
				}
			}
			, ba = {
				readContext: oi,
				useCallback: da,
				useContext: oi,
				useEffect: aa,
				useImperativeHandle: la,
				useLayoutEffect: ca,
				useMemo: ma,
				useReducer: Xi,
				useRef: ta,
				useState: function () {
					return Xi(Zi);
				},
				useDebugValue: ua,
				useResponder: Ui,
				useDeferredValue: function (e, n) {
					var t = Xi(Zi)
						, r = t[0]
						, o = t[1];
					return aa((function () {
						var t = zi.suspense;
						zi.suspense = void 0 === n ? null : n;
						try {
							o(e);
						} finally {
							zi.suspense = t;
						}
					}
					), [e, n]),
						r;
				},
				useTransition: function (e) {
					var n = Xi(Zi)
						, t = n[0];
					return n = n[1],
						[da(pa.bind(null, n, e), [n, e]), t];
				}
			}
			, wa = {
				readContext: oi,
				useCallback: da,
				useContext: oi,
				useEffect: aa,
				useImperativeHandle: la,
				useLayoutEffect: ca,
				useMemo: ma,
				useReducer: $i,
				useRef: ta,
				useState: function () {
					return $i(Zi);
				},
				useDebugValue: ua,
				useResponder: Ui,
				useDeferredValue: function (e, n) {
					var t = $i(Zi)
						, r = t[0]
						, o = t[1];
					return aa((function () {
						var t = zi.suspense;
						zi.suspense = void 0 === n ? null : n;
						try {
							o(e);
						} finally {
							zi.suspense = t;
						}
					}
					), [e, n]),
						r;
				},
				useTransition: function (e) {
					var n = $i(Zi)
						, t = n[0];
					return n = n[1],
						[da(pa.bind(null, n, e), [n, e]), t];
				}
			}
			, ya = null
			, xa = null
			, ka = !1;

		function Sa(e, n) {
			var t = Es(5, null, null, 0);
			t.elementType = "DELETED",
				t.type = "DELETED",
				t.stateNode = n,
				t.return = e,
				t.effectTag = 8,
				null !== e.lastEffect ? (e.lastEffect.nextEffect = t,
					e.lastEffect = t) : e.firstEffect = e.lastEffect = t;
		}

		function Ea(e, n) {
			switch (e.tag) {
				case 5:
					var t = e.type;
					return null !== (n = 1 !== n.nodeType || t.toLowerCase() !== n.nodeName.toLowerCase() ? null : n) && (e.stateNode = n,
						!0);
				case 6:
					return null !== (n = "" === e.pendingProps || 3 !== n.nodeType ? null : n) && (e.stateNode = n,
						!0);
				case 13:
				default:
					return !1;
			}
		}

		function Ca(e) {
			if (ka) {
				var n = xa;
				if (n) {
					var t = n;
					if (!Ea(e, n)) {
						if (!(n = xt(t.nextSibling)) || !Ea(e, n))
							return e.effectTag = -1025 & e.effectTag | 2,
								ka = !1,
								void (ya = e);
						Sa(ya, t);
					}
					ya = e,
						xa = xt(n.firstChild);
				} else
					e.effectTag = -1025 & e.effectTag | 2,
						ka = !1,
						ya = e;
			}
		}

		function Aa(e) {
			for (e = e.return; null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;)
				e = e.return;
			ya = e;
		}

		function Ia(e) {
			if (e !== ya)
				return !1;
			if (!ka)
				return Aa(e),
					ka = !0,
					!1;
			var n = e.type;
			if (5 !== e.tag || "head" !== n && "body" !== n && !bt(n, e.memoizedProps))
				for (n = xa; n;)
					Sa(e, n),
						n = xt(n.nextSibling);
			if (Aa(e),
				13 === e.tag) {
				if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
					throw Error(a(317));
				e: {
					for (e = e.nextSibling,
						n = 0; e;) {
						if (8 === e.nodeType) {
							var t = e.data;
							if ("/$" === t) {
								if (0 === n) {
									xa = xt(e.nextSibling);
									break e;
								}
								n--;
							} else
								"$" !== t && "$!" !== t && "$?" !== t || n++;
						}
						e = e.nextSibling;
					}
					xa = null;
				}
			} else
				xa = ya ? xt(e.stateNode.nextSibling) : null;
			return !0;
		}

		function Ta() {
			xa = ya = null,
				ka = !1;
		}

		var Pa = Y.ReactCurrentOwner
			, Oa = !1;

		function _a(e, n, t, r) {
			n.child = null === e ? Ai(n, null, t, r) : Ci(n, e.child, t, r);
		}

		function ja(e, n, t, r, o) {
			t = t.render;
			var i = n.ref;
			return ri(n, o),
				r = Ki(e, n, t, r, i, o),
				null === e || Oa ? (n.effectTag |= 1,
					_a(e, n, r, o),
					n.child) : (n.updateQueue = e.updateQueue,
						n.effectTag &= -517,
						e.expirationTime <= o && (e.expirationTime = 0),
						Ka(e, n, o));
		}

		function Na(e, n, t, r, o, i) {
			if (null === e) {
				var a = t.type;
				return "function" != typeof a || Cs(a) || void 0 !== a.defaultProps || null !== t.compare || void 0 !== t.defaultProps ? ((e = Is(t.type, null, r, null, n.mode, i)).ref = n.ref,
					e.return = n,
					n.child = e) : (n.tag = 15,
						n.type = a,
						Ra(e, n, a, r, o, i));
			}
			return a = e.child,
				o < i && (o = a.memoizedProps,
					(t = null !== (t = t.compare) ? t : Dr)(o, r) && e.ref === n.ref) ? Ka(e, n, i) : (n.effectTag |= 1,
						(e = As(a, r)).ref = n.ref,
						e.return = n,
						n.child = e);
		}

		function Ra(e, n, t, r, o, i) {
			return null !== e && Dr(e.memoizedProps, r) && e.ref === n.ref && (Oa = !1,
				o < i) ? (n.expirationTime = e.expirationTime,
					Ka(e, n, i)) : Fa(e, n, t, r, i);
		}

		function La(e, n) {
			var t = n.ref;
			(null === e && null !== t || null !== e && e.ref !== t) && (n.effectTag |= 128);
		}

		function Fa(e, n, t, r, o) {
			var i = go(t) ? po : fo.current;
			return i = ho(n, i),
				ri(n, o),
				t = Ki(e, n, t, r, i, o),
				null === e || Oa ? (n.effectTag |= 1,
					_a(e, n, t, o),
					n.child) : (n.updateQueue = e.updateQueue,
						n.effectTag &= -517,
						e.expirationTime <= o && (e.expirationTime = 0),
						Ka(e, n, o));
		}

		function Ma(e, n, t, r, o) {
			if (go(t)) {
				var i = !0;
				yo(n);
			} else
				i = !1;
			if (ri(n, o),
				null === n.stateNode)
				null !== e && (e.alternate = null,
					n.alternate = null,
					n.effectTag |= 2),
					bi(n, t, r),
					yi(n, t, r, o),
					r = !0;
			else if (null === e) {
				var a = n.stateNode
					, c = n.memoizedProps;
				a.props = c;
				var s = a.context
					, l = t.contextType;
				"object" == typeof l && null !== l ? l = oi(l) : l = ho(n, l = go(t) ? po : fo.current);
				var u = t.getDerivedStateFromProps
					, f = "function" == typeof u || "function" == typeof a.getSnapshotBeforeUpdate;
				f || "function" != typeof a.UNSAFE_componentWillReceiveProps && "function" != typeof a.componentWillReceiveProps || (c !== r || s !== l) && wi(n, a, r, l),
					ii = !1;
				var d = n.memoizedState;
				a.state = d,
					fi(n, r, a, o),
					s = n.memoizedState,
					c !== r || d !== s || mo.current || ii ? ("function" == typeof u && (hi(n, t, u, r),
						s = n.memoizedState),
						(c = ii || vi(n, t, c, r, d, s, l)) ? (f || "function" != typeof a.UNSAFE_componentWillMount && "function" != typeof a.componentWillMount || ("function" == typeof a.componentWillMount && a.componentWillMount(),
							"function" == typeof a.UNSAFE_componentWillMount && a.UNSAFE_componentWillMount()),
							"function" == typeof a.componentDidMount && (n.effectTag |= 4)) : ("function" == typeof a.componentDidMount && (n.effectTag |= 4),
								n.memoizedProps = r,
								n.memoizedState = s),
						a.props = r,
						a.state = s,
						a.context = l,
						r = c) : ("function" == typeof a.componentDidMount && (n.effectTag |= 4),
							r = !1);
			} else
				a = n.stateNode,
					ci(e, n),
					c = n.memoizedProps,
					a.props = n.type === n.elementType ? c : Jo(n.type, c),
					s = a.context,
					"object" == typeof (l = t.contextType) && null !== l ? l = oi(l) : l = ho(n, l = go(t) ? po : fo.current),
					(f = "function" == typeof (u = t.getDerivedStateFromProps) || "function" == typeof a.getSnapshotBeforeUpdate) || "function" != typeof a.UNSAFE_componentWillReceiveProps && "function" != typeof a.componentWillReceiveProps || (c !== r || s !== l) && wi(n, a, r, l),
					ii = !1,
					s = n.memoizedState,
					a.state = s,
					fi(n, r, a, o),
					d = n.memoizedState,
					c !== r || s !== d || mo.current || ii ? ("function" == typeof u && (hi(n, t, u, r),
						d = n.memoizedState),
						(u = ii || vi(n, t, c, r, s, d, l)) ? (f || "function" != typeof a.UNSAFE_componentWillUpdate && "function" != typeof a.componentWillUpdate || ("function" == typeof a.componentWillUpdate && a.componentWillUpdate(r, d, l),
							"function" == typeof a.UNSAFE_componentWillUpdate && a.UNSAFE_componentWillUpdate(r, d, l)),
							"function" == typeof a.componentDidUpdate && (n.effectTag |= 4),
							"function" == typeof a.getSnapshotBeforeUpdate && (n.effectTag |= 256)) : ("function" != typeof a.componentDidUpdate || c === e.memoizedProps && s === e.memoizedState || (n.effectTag |= 4),
								"function" != typeof a.getSnapshotBeforeUpdate || c === e.memoizedProps && s === e.memoizedState || (n.effectTag |= 256),
								n.memoizedProps = r,
								n.memoizedState = d),
						a.props = r,
						a.state = d,
						a.context = l,
						r = u) : ("function" != typeof a.componentDidUpdate || c === e.memoizedProps && s === e.memoizedState || (n.effectTag |= 4),
							"function" != typeof a.getSnapshotBeforeUpdate || c === e.memoizedProps && s === e.memoizedState || (n.effectTag |= 256),
							r = !1);
			return Ua(e, n, t, r, i, o);
		}

		function Ua(e, n, t, r, o, i) {
			La(e, n);
			var a = 0 != (64 & n.effectTag);
			if (!r && !a)
				return o && xo(n, t, !1),
					Ka(e, n, i);
			r = n.stateNode,
				Pa.current = n;
			var c = a && "function" != typeof t.getDerivedStateFromError ? null : r.render();
			return n.effectTag |= 1,
				null !== e && a ? (n.child = Ci(n, e.child, null, i),
					n.child = Ci(n, null, c, i)) : _a(e, n, c, i),
				n.memoizedState = r.state,
				o && xo(n, t, !0),
				n.child;
		}

		function Da(e) {
			var n = e.stateNode;
			n.pendingContext ? bo(0, n.pendingContext, n.pendingContext !== n.context) : n.context && bo(0, n.context, !1),
				ji(e, n.containerInfo);
		}

		var za, Ba, Ha, Wa = {
			dehydrated: null,
			retryTime: 0
		};

		function Va(e, n, t) {
			var r, o = n.mode, i = n.pendingProps, a = Fi.current, c = !1;
			if ((r = 0 != (64 & n.effectTag)) || (r = 0 != (2 & a) && (null === e || null !== e.memoizedState)),
				r ? (c = !0,
					n.effectTag &= -65) : null !== e && null === e.memoizedState || void 0 === i.fallback || !0 === i.unstable_avoidThisFallback || (a |= 1),
				lo(Fi, 1 & a),
				null === e) {
				if (void 0 !== i.fallback && Ca(n),
					c) {
					if (c = i.fallback,
						(i = Ts(null, o, 0, null)).return = n,
						0 == (2 & n.mode))
						for (e = null !== n.memoizedState ? n.child.child : n.child,
							i.child = e; null !== e;)
							e.return = i,
								e = e.sibling;
					return (t = Ts(c, o, t, null)).return = n,
						i.sibling = t,
						n.memoizedState = Wa,
						n.child = i,
						t;
				}
				return o = i.children,
					n.memoizedState = null,
					n.child = Ai(n, null, o, t);
			}
			if (null !== e.memoizedState) {
				if (o = (e = e.child).sibling,
					c) {
					if (i = i.fallback,
						(t = As(e, e.pendingProps)).return = n,
						0 == (2 & n.mode) && (c = null !== n.memoizedState ? n.child.child : n.child) !== e.child)
						for (t.child = c; null !== c;)
							c.return = t,
								c = c.sibling;
					return (o = As(o, i)).return = n,
						t.sibling = o,
						t.childExpirationTime = 0,
						n.memoizedState = Wa,
						n.child = t,
						o;
				}
				return t = Ci(n, e.child, i.children, t),
					n.memoizedState = null,
					n.child = t;
			}
			if (e = e.child,
				c) {
				if (c = i.fallback,
					(i = Ts(null, o, 0, null)).return = n,
					i.child = e,
					null !== e && (e.return = i),
					0 == (2 & n.mode))
					for (e = null !== n.memoizedState ? n.child.child : n.child,
						i.child = e; null !== e;)
						e.return = i,
							e = e.sibling;
				return (t = Ts(c, o, t, null)).return = n,
					i.sibling = t,
					t.effectTag |= 2,
					i.childExpirationTime = 0,
					n.memoizedState = Wa,
					n.child = i,
					t;
			}
			return n.memoizedState = null,
				n.child = Ci(n, e, i.children, t);
		}

		function Qa(e, n) {
			e.expirationTime < n && (e.expirationTime = n);
			var t = e.alternate;
			null !== t && t.expirationTime < n && (t.expirationTime = n),
				ti(e.return, n);
		}

		function Ga(e, n, t, r, o, i) {
			var a = e.memoizedState;
			null === a ? e.memoizedState = {
				isBackwards: n,
				rendering: null,
				renderingStartTime: 0,
				last: r,
				tail: t,
				tailExpiration: 0,
				tailMode: o,
				lastEffect: i
			} : (a.isBackwards = n,
				a.rendering = null,
				a.renderingStartTime = 0,
				a.last = r,
				a.tail = t,
				a.tailExpiration = 0,
				a.tailMode = o,
				a.lastEffect = i);
		}

		function qa(e, n, t) {
			var r = n.pendingProps
				, o = r.revealOrder
				, i = r.tail;
			if (_a(e, n, r.children, t),
				0 != (2 & (r = Fi.current)))
				r = 1 & r | 2,
					n.effectTag |= 64;
			else {
				if (null !== e && 0 != (64 & e.effectTag))
					e: for (e = n.child; null !== e;) {
						if (13 === e.tag)
							null !== e.memoizedState && Qa(e, t);
						else if (19 === e.tag)
							Qa(e, t);
						else if (null !== e.child) {
							e.child.return = e,
								e = e.child;
							continue;
						}
						if (e === n)
							break e;
						for (; null === e.sibling;) {
							if (null === e.return || e.return === n)
								break e;
							e = e.return;
						}
						e.sibling.return = e.return,
							e = e.sibling;
					}
				r &= 1;
			}
			if (lo(Fi, r),
				0 == (2 & n.mode))
				n.memoizedState = null;
			else
				switch (o) {
					case "forwards":
						for (t = n.child,
							o = null; null !== t;)
							null !== (e = t.alternate) && null === Mi(e) && (o = t),
								t = t.sibling;
						null === (t = o) ? (o = n.child,
							n.child = null) : (o = t.sibling,
								t.sibling = null),
							Ga(n, !1, o, t, i, n.lastEffect);
						break;
					case "backwards":
						for (t = null,
							o = n.child,
							n.child = null; null !== o;) {
							if (null !== (e = o.alternate) && null === Mi(e)) {
								n.child = o;
								break;
							}
							e = o.sibling,
								o.sibling = t,
								t = o,
								o = e;
						}
						Ga(n, !0, t, null, i, n.lastEffect);
						break;
					case "together":
						Ga(n, !1, null, null, void 0, n.lastEffect);
						break;
					default:
						n.memoizedState = null;
				}
			return n.child;
		}

		function Ka(e, n, t) {
			null !== e && (n.dependencies = e.dependencies);
			var r = n.expirationTime;
			if (0 !== r && as(r),
				n.childExpirationTime < t)
				return null;
			if (null !== e && n.child !== e.child)
				throw Error(a(153));
			if (null !== n.child) {
				for (t = As(e = n.child, e.pendingProps),
					n.child = t,
					t.return = n; null !== e.sibling;)
					e = e.sibling,
						(t = t.sibling = As(e, e.pendingProps)).return = n;
				t.sibling = null;
			}
			return n.child;
		}

		function Ja(e, n) {
			switch (e.tailMode) {
				case "hidden":
					n = e.tail;
					for (var t = null; null !== n;)
						null !== n.alternate && (t = n),
							n = n.sibling;
					null === t ? e.tail = null : t.sibling = null;
					break;
				case "collapsed":
					t = e.tail;
					for (var r = null; null !== t;)
						null !== t.alternate && (r = t),
							t = t.sibling;
					null === r ? n || null === e.tail ? e.tail = null : e.tail.sibling = null : r.sibling = null;
			}
		}

		function Ya(e, n, t) {
			var r = n.pendingProps;
			switch (n.tag) {
				case 2:
				case 16:
				case 15:
				case 0:
				case 11:
				case 7:
				case 8:
				case 12:
				case 9:
				case 14:
					return null;
				case 1:
					return go(n.type) && vo(),
						null;
				case 3:
					return Ni(),
						so(mo),
						so(fo),
						(t = n.stateNode).pendingContext && (t.context = t.pendingContext,
							t.pendingContext = null),
						null !== e && null !== e.child || !Ia(n) || (n.effectTag |= 4),
						null;
				case 5:
					Li(n),
						t = _i(Oi.current);
					var i = n.type;
					if (null !== e && null != n.stateNode)
						Ba(e, n, i, r, t),
							e.ref !== n.ref && (n.effectTag |= 128);
					else {
						if (!r) {
							if (null === n.stateNode)
								throw Error(a(166));
							return null;
						}
						if (e = _i(Ti.current),
							Ia(n)) {
							r = n.stateNode,
								i = n.type;
							var c = n.memoizedProps;
							switch (r[Et] = n,
							r[Ct] = c,
							i) {
								case "iframe":
								case "object":
								case "embed":
									Kn("load", r);
									break;
								case "video":
								case "audio":
									for (e = 0; e < Ye.length; e++)
										Kn(Ye[e], r);
									break;
								case "source":
									Kn("error", r);
									break;
								case "img":
								case "image":
								case "link":
									Kn("error", r),
										Kn("load", r);
									break;
								case "form":
									Kn("reset", r),
										Kn("submit", r);
									break;
								case "details":
									Kn("toggle", r);
									break;
								case "input":
									Se(r, c),
										Kn("invalid", r),
										st(t, "onChange");
									break;
								case "select":
									r._wrapperState = {
										wasMultiple: !!c.multiple
									},
										Kn("invalid", r),
										st(t, "onChange");
									break;
								case "textarea":
									_e(r, c),
										Kn("invalid", r),
										st(t, "onChange");
							}
							for (var s in it(i, c),
								e = null,
								c)
								if (c.hasOwnProperty(s)) {
									var l = c[s];
									"children" === s ? "string" == typeof l ? r.textContent !== l && (e = ["children", l]) : "number" == typeof l && r.textContent !== "" + l && (e = ["children", "" + l]) : E.hasOwnProperty(s) && null != l && st(t, s);
								}
							switch (i) {
								case "input":
									ye(r),
										Ae(r, c, !0);
									break;
								case "textarea":
									ye(r),
										Ne(r);
									break;
								case "select":
								case "option":
									break;
								default:
									"function" == typeof c.onClick && (r.onclick = lt);
							}
							t = e,
								n.updateQueue = t,
								null !== t && (n.effectTag |= 4);
						} else {
							switch (s = 9 === t.nodeType ? t : t.ownerDocument,
							e === ct && (e = Fe(i)),
							e === ct ? "script" === i ? ((e = s.createElement("div")).innerHTML = "<script><\/script>",
								e = e.removeChild(e.firstChild)) : "string" == typeof r.is ? e = s.createElement(i, {
									is: r.is
								}) : (e = s.createElement(i),
									"select" === i && (s = e,
										r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, i),
							e[Et] = n,
							e[Ct] = r,
							za(e, n),
							n.stateNode = e,
							s = at(i, r),
							i) {
								case "iframe":
								case "object":
								case "embed":
									Kn("load", e),
										l = r;
									break;
								case "video":
								case "audio":
									for (l = 0; l < Ye.length; l++)
										Kn(Ye[l], e);
									l = r;
									break;
								case "source":
									Kn("error", e),
										l = r;
									break;
								case "img":
								case "image":
								case "link":
									Kn("error", e),
										Kn("load", e),
										l = r;
									break;
								case "form":
									Kn("reset", e),
										Kn("submit", e),
										l = r;
									break;
								case "details":
									Kn("toggle", e),
										l = r;
									break;
								case "input":
									Se(e, r),
										l = ke(e, r),
										Kn("invalid", e),
										st(t, "onChange");
									break;
								case "option":
									l = Te(e, r);
									break;
								case "select":
									e._wrapperState = {
										wasMultiple: !!r.multiple
									},
										l = o({}, r, {
											value: void 0
										}),
										Kn("invalid", e),
										st(t, "onChange");
									break;
								case "textarea":
									_e(e, r),
										l = Oe(e, r),
										Kn("invalid", e),
										st(t, "onChange");
									break;
								default:
									l = r;
							}
							it(i, l);
							var u = l;
							for (c in u)
								if (u.hasOwnProperty(c)) {
									var f = u[c];
									"style" === c ? rt(e, f) : "dangerouslySetInnerHTML" === c ? null != (f = f ? f.__html : void 0) && De(e, f) : "children" === c ? "string" == typeof f ? ("textarea" !== i || "" !== f) && ze(e, f) : "number" == typeof f && ze(e, "" + f) : "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && "autoFocus" !== c && (E.hasOwnProperty(c) ? null != f && st(t, c) : null != f && Z(e, c, f, s));
								}
							switch (i) {
								case "input":
									ye(e),
										Ae(e, r, !1);
									break;
								case "textarea":
									ye(e),
										Ne(e);
									break;
								case "option":
									null != r.value && e.setAttribute("value", "" + be(r.value));
									break;
								case "select":
									e.multiple = !!r.multiple,
										null != (t = r.value) ? Pe(e, !!r.multiple, t, !1) : null != r.defaultValue && Pe(e, !!r.multiple, r.defaultValue, !0);
									break;
								default:
									"function" == typeof l.onClick && (e.onclick = lt);
							}
							vt(i, r) && (n.effectTag |= 4);
						}
						null !== n.ref && (n.effectTag |= 128);
					}
					return null;
				case 6:
					if (e && null != n.stateNode)
						Ha(0, n, e.memoizedProps, r);
					else {
						if ("string" != typeof r && null === n.stateNode)
							throw Error(a(166));
						t = _i(Oi.current),
							_i(Ti.current),
							Ia(n) ? (t = n.stateNode,
								r = n.memoizedProps,
								t[Et] = n,
								t.nodeValue !== r && (n.effectTag |= 4)) : ((t = (9 === t.nodeType ? t : t.ownerDocument).createTextNode(r))[Et] = n,
									n.stateNode = t);
					}
					return null;
				case 13:
					return so(Fi),
						r = n.memoizedState,
						0 != (64 & n.effectTag) ? (n.expirationTime = t,
							n) : (t = null !== r,
								r = !1,
								null === e ? void 0 !== n.memoizedProps.fallback && Ia(n) : (r = null !== (i = e.memoizedState),
									t || null === i || null !== (i = e.child.sibling) && (null !== (c = n.firstEffect) ? (n.firstEffect = i,
										i.nextEffect = c) : (n.firstEffect = n.lastEffect = i,
											i.nextEffect = null),
										i.effectTag = 8)),
								t && !r && 0 != (2 & n.mode) && (null === e && !0 !== n.memoizedProps.unstable_avoidThisFallback || 0 != (1 & Fi.current) ? Ic === yc && (Ic = xc) : (Ic !== yc && Ic !== xc || (Ic = kc),
									0 !== jc && null !== Ec && (Ns(Ec, Ac),
										Rs(Ec, jc)))),
								(t || r) && (n.effectTag |= 4),
								null);
				case 4:
					return Ni(),
						null;
				case 10:
					return ni(n),
						null;
				case 17:
					return go(n.type) && vo(),
						null;
				case 19:
					if (so(Fi),
						null === (r = n.memoizedState))
						return null;
					if (i = 0 != (64 & n.effectTag),
						null === (c = r.rendering)) {
						if (i)
							Ja(r, !1);
						else if (Ic !== yc || null !== e && 0 != (64 & e.effectTag))
							for (c = n.child; null !== c;) {
								if (null !== (e = Mi(c))) {
									for (n.effectTag |= 64,
										Ja(r, !1),
										null !== (i = e.updateQueue) && (n.updateQueue = i,
											n.effectTag |= 4),
										null === r.lastEffect && (n.firstEffect = null),
										n.lastEffect = r.lastEffect,
										r = n.child; null !== r;)
										c = t,
											(i = r).effectTag &= 2,
											i.nextEffect = null,
											i.firstEffect = null,
											i.lastEffect = null,
											null === (e = i.alternate) ? (i.childExpirationTime = 0,
												i.expirationTime = c,
												i.child = null,
												i.memoizedProps = null,
												i.memoizedState = null,
												i.updateQueue = null,
												i.dependencies = null) : (i.childExpirationTime = e.childExpirationTime,
													i.expirationTime = e.expirationTime,
													i.child = e.child,
													i.memoizedProps = e.memoizedProps,
													i.memoizedState = e.memoizedState,
													i.updateQueue = e.updateQueue,
													c = e.dependencies,
													i.dependencies = null === c ? null : {
														expirationTime: c.expirationTime,
														firstContext: c.firstContext,
														responders: c.responders
													}),
											r = r.sibling;
									return lo(Fi, 1 & Fi.current | 2),
										n.child;
								}
								c = c.sibling;
							}
					} else {
						if (!i)
							if (null !== (e = Mi(c))) {
								if (n.effectTag |= 64,
									i = !0,
									null !== (t = e.updateQueue) && (n.updateQueue = t,
										n.effectTag |= 4),
									Ja(r, !0),
									null === r.tail && "hidden" === r.tailMode && !c.alternate)
									return null !== (n = n.lastEffect = r.lastEffect) && (n.nextEffect = null),
										null;
							} else
								2 * zo() - r.renderingStartTime > r.tailExpiration && 1 < t && (n.effectTag |= 64,
									i = !0,
									Ja(r, !1),
									n.expirationTime = n.childExpirationTime = t - 1);
						r.isBackwards ? (c.sibling = n.child,
							n.child = c) : (null !== (t = r.last) ? t.sibling = c : n.child = c,
								r.last = c);
					}
					return null !== r.tail ? (0 === r.tailExpiration && (r.tailExpiration = zo() + 500),
						t = r.tail,
						r.rendering = t,
						r.tail = t.sibling,
						r.lastEffect = n.lastEffect,
						r.renderingStartTime = zo(),
						t.sibling = null,
						n = Fi.current,
						lo(Fi, i ? 1 & n | 2 : 1 & n),
						t) : null;
			}
			throw Error(a(156, n.tag));
		}

		function Za(e) {
			switch (e.tag) {
				case 1:
					go(e.type) && vo();
					var n = e.effectTag;
					return 4096 & n ? (e.effectTag = -4097 & n | 64,
						e) : null;
				case 3:
					if (Ni(),
						so(mo),
						so(fo),
						0 != (64 & (n = e.effectTag)))
						throw Error(a(285));
					return e.effectTag = -4097 & n | 64,
						e;
				case 5:
					return Li(e),
						null;
				case 13:
					return so(Fi),
						4096 & (n = e.effectTag) ? (e.effectTag = -4097 & n | 64,
							e) : null;
				case 19:
					return so(Fi),
						null;
				case 4:
					return Ni(),
						null;
				case 10:
					return ni(e),
						null;
				default:
					return null;
			}
		}

		function Xa(e, n) {
			return {
				value: e,
				source: n,
				stack: ve(n)
			};
		}

		za = function (e, n) {
			for (var t = n.child; null !== t;) {
				if (5 === t.tag || 6 === t.tag)
					e.appendChild(t.stateNode);
				else if (4 !== t.tag && null !== t.child) {
					t.child.return = t,
						t = t.child;
					continue;
				}
				if (t === n)
					break;
				for (; null === t.sibling;) {
					if (null === t.return || t.return === n)
						return;
					t = t.return;
				}
				t.sibling.return = t.return,
					t = t.sibling;
			}
		}
			,
			Ba = function (e, n, t, r, i) {
				var a = e.memoizedProps;
				if (a !== r) {
					var c, s, l = n.stateNode;
					switch (_i(Ti.current),
					e = null,
					t) {
						case "input":
							a = ke(l, a),
								r = ke(l, r),
								e = [];
							break;
						case "option":
							a = Te(l, a),
								r = Te(l, r),
								e = [];
							break;
						case "select":
							a = o({}, a, {
								value: void 0
							}),
								r = o({}, r, {
									value: void 0
								}),
								e = [];
							break;
						case "textarea":
							a = Oe(l, a),
								r = Oe(l, r),
								e = [];
							break;
						default:
							"function" != typeof a.onClick && "function" == typeof r.onClick && (l.onclick = lt);
					}
					for (c in it(t, r),
						t = null,
						a)
						if (!r.hasOwnProperty(c) && a.hasOwnProperty(c) && null != a[c])
							if ("style" === c)
								for (s in l = a[c])
									l.hasOwnProperty(s) && (t || (t = {}),
										t[s] = "");
							else
								"dangerouslySetInnerHTML" !== c && "children" !== c && "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && "autoFocus" !== c && (E.hasOwnProperty(c) ? e || (e = []) : (e = e || []).push(c, null));
					for (c in r) {
						var u = r[c];
						if (l = null != a ? a[c] : void 0,
							r.hasOwnProperty(c) && u !== l && (null != u || null != l))
							if ("style" === c)
								if (l) {
									for (s in l)
										!l.hasOwnProperty(s) || u && u.hasOwnProperty(s) || (t || (t = {}),
											t[s] = "");
									for (s in u)
										u.hasOwnProperty(s) && l[s] !== u[s] && (t || (t = {}),
											t[s] = u[s]);
								} else
									t || (e || (e = []),
										e.push(c, t)),
										t = u;
							else
								"dangerouslySetInnerHTML" === c ? (u = u ? u.__html : void 0,
									l = l ? l.__html : void 0,
									null != u && l !== u && (e = e || []).push(c, u)) : "children" === c ? l === u || "string" != typeof u && "number" != typeof u || (e = e || []).push(c, "" + u) : "suppressContentEditableWarning" !== c && "suppressHydrationWarning" !== c && (E.hasOwnProperty(c) ? (null != u && st(i, c),
										e || l === u || (e = [])) : (e = e || []).push(c, u));
					}
					t && (e = e || []).push("style", t),
						i = e,
						(n.updateQueue = i) && (n.effectTag |= 4);
				}
			}
			,
			Ha = function (e, n, t, r) {
				t !== r && (n.effectTag |= 4);
			}
			;
		var $a = "function" == typeof WeakSet ? WeakSet : Set;

		function ec(e, n) {
			var t = n.source
				, r = n.stack;
			null === r && null !== t && (r = ve(t)),
				null !== t && ge(t.type),
				n = n.value,
				null !== e && 1 === e.tag && ge(e.type);
			try {
				console.error(n);
			} catch (e) {
				setTimeout((function () {
					throw e;
				}
				));
			}
		}

		function nc(e) {
			var n = e.ref;
			if (null !== n)
				if ("function" == typeof n)
					try {
						n(null);
					} catch (n) {
						bs(e, n);
					}
				else
					n.current = null;
		}

		function tc(e, n) {
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
				case 22:
					return;
				case 1:
					if (256 & n.effectTag && null !== e) {
						var t = e.memoizedProps
							, r = e.memoizedState;
						n = (e = n.stateNode).getSnapshotBeforeUpdate(n.elementType === n.type ? t : Jo(n.type, t), r),
							e.__reactInternalSnapshotBeforeUpdate = n;
					}
					return;
				case 3:
				case 5:
				case 6:
				case 4:
				case 17:
					return;
			}
			throw Error(a(163));
		}

		function rc(e, n) {
			if (null !== (n = null !== (n = n.updateQueue) ? n.lastEffect : null)) {
				var t = n = n.next;
				do {
					if ((t.tag & e) === e) {
						var r = t.destroy;
						t.destroy = void 0,
							void 0 !== r && r();
					}
					t = t.next;
				} while (t !== n);
			}
		}

		function oc(e, n) {
			if (null !== (n = null !== (n = n.updateQueue) ? n.lastEffect : null)) {
				var t = n = n.next;
				do {
					if ((t.tag & e) === e) {
						var r = t.create;
						t.destroy = r();
					}
					t = t.next;
				} while (t !== n);
			}
		}

		function ic(e, n, t) {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
				case 22:
					return void oc(3, t);
				case 1:
					if (e = t.stateNode,
						4 & t.effectTag)
						if (null === n)
							e.componentDidMount();
						else {
							var r = t.elementType === t.type ? n.memoizedProps : Jo(t.type, n.memoizedProps);
							e.componentDidUpdate(r, n.memoizedState, e.__reactInternalSnapshotBeforeUpdate);
						}
					return void (null !== (n = t.updateQueue) && di(t, n, e));
				case 3:
					if (null !== (n = t.updateQueue)) {
						if (e = null,
							null !== t.child)
							switch (t.child.tag) {
								case 5:
									e = t.child.stateNode;
									break;
								case 1:
									e = t.child.stateNode;
							}
						di(t, n, e);
					}
					return;
				case 5:
					return e = t.stateNode,
						void (null === n && 4 & t.effectTag && vt(t.type, t.memoizedProps) && e.focus());
				case 6:
				case 4:
				case 12:
					return;
				case 13:
					return void (null === t.memoizedState && (t = t.alternate,
						null !== t && (t = t.memoizedState,
							null !== t && (t = t.dehydrated,
								null !== t && Mn(t)))));
				case 19:
				case 17:
				case 20:
				case 21:
					return;
			}
			throw Error(a(163));
		}

		function ac(e, n, t) {
			switch ("function" == typeof ks && ks(n),
			n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
				case 22:
					if (null !== (e = n.updateQueue) && null !== (e = e.lastEffect)) {
						var r = e.next;
						Wo(97 < t ? 97 : t, (function () {
							var e = r;
							do {
								var t = e.destroy;
								if (void 0 !== t) {
									var o = n;
									try {
										t();
									} catch (e) {
										bs(o, e);
									}
								}
								e = e.next;
							} while (e !== r);
						}
						));
					}
					break;
				case 1:
					nc(n),
						"function" == typeof (t = n.stateNode).componentWillUnmount && function (e, n) {
							try {
								n.props = e.memoizedProps,
									n.state = e.memoizedState,
									n.componentWillUnmount();
							} catch (n) {
								bs(e, n);
							}
						}(n, t);
					break;
				case 5:
					nc(n);
					break;
				case 4:
					uc(e, n, t);
			}
		}

		function cc(e) {
			var n = e.alternate;
			e.return = null,
				e.child = null,
				e.memoizedState = null,
				e.updateQueue = null,
				e.dependencies = null,
				e.alternate = null,
				e.firstEffect = null,
				e.lastEffect = null,
				e.pendingProps = null,
				e.memoizedProps = null,
				e.stateNode = null,
				null !== n && cc(n);
		}

		function sc(e) {
			return 5 === e.tag || 3 === e.tag || 4 === e.tag;
		}

		function lc(e) {
			e: {
				for (var n = e.return; null !== n;) {
					if (sc(n)) {
						var t = n;
						break e;
					}
					n = n.return;
				}
				throw Error(a(160));
			}
			switch (n = t.stateNode,
			t.tag) {
				case 5:
					var r = !1;
					break;
				case 3:
				case 4:
					n = n.containerInfo,
						r = !0;
					break;
				default:
					throw Error(a(161));
			}
			16 & t.effectTag && (ze(n, ""),
				t.effectTag &= -17);
			e: n: for (t = e; ;) {
				for (; null === t.sibling;) {
					if (null === t.return || sc(t.return)) {
						t = null;
						break e;
					}
					t = t.return;
				}
				for (t.sibling.return = t.return,
					t = t.sibling; 5 !== t.tag && 6 !== t.tag && 18 !== t.tag;) {
					if (2 & t.effectTag)
						continue n;
					if (null === t.child || 4 === t.tag)
						continue n;
					t.child.return = t,
						t = t.child;
				}
				if (!(2 & t.effectTag)) {
					t = t.stateNode;
					break e;
				}
			}
			r ? function e(n, t, r) {
				var o = n.tag
					, i = 5 === o || 6 === o;
				if (i)
					n = i ? n.stateNode : n.stateNode.instance,
						t ? 8 === r.nodeType ? r.parentNode.insertBefore(n, t) : r.insertBefore(n, t) : (8 === r.nodeType ? (t = r.parentNode).insertBefore(n, r) : (t = r).appendChild(n),
							null !== (r = r._reactRootContainer) && void 0 !== r || null !== t.onclick || (t.onclick = lt));
				else if (4 !== o && null !== (n = n.child))
					for (e(n, t, r),
						n = n.sibling; null !== n;)
						e(n, t, r),
							n = n.sibling;
			}(e, t, n) : function e(n, t, r) {
				var o = n.tag
					, i = 5 === o || 6 === o;
				if (i)
					n = i ? n.stateNode : n.stateNode.instance,
						t ? r.insertBefore(n, t) : r.appendChild(n);
				else if (4 !== o && null !== (n = n.child))
					for (e(n, t, r),
						n = n.sibling; null !== n;)
						e(n, t, r),
							n = n.sibling;
			}(e, t, n);
		}

		function uc(e, n, t) {
			for (var r, o, i = n, c = !1; ;) {
				if (!c) {
					c = i.return;
					e: for (; ;) {
						if (null === c)
							throw Error(a(160));
						switch (r = c.stateNode,
						c.tag) {
							case 5:
								o = !1;
								break e;
							case 3:
							case 4:
								r = r.containerInfo,
									o = !0;
								break e;
						}
						c = c.return;
					}
					c = !0;
				}
				if (5 === i.tag || 6 === i.tag) {
					e: for (var s = e, l = i, u = t, f = l; ;)
						if (ac(s, f, u),
							null !== f.child && 4 !== f.tag)
							f.child.return = f,
								f = f.child;
						else {
							if (f === l)
								break e;
							for (; null === f.sibling;) {
								if (null === f.return || f.return === l)
									break e;
								f = f.return;
							}
							f.sibling.return = f.return,
								f = f.sibling;
						}
					o ? (s = r,
						l = i.stateNode,
						8 === s.nodeType ? s.parentNode.removeChild(l) : s.removeChild(l)) : r.removeChild(i.stateNode);
				} else if (4 === i.tag) {
					if (null !== i.child) {
						r = i.stateNode.containerInfo,
							o = !0,
							i.child.return = i,
							i = i.child;
						continue;
					}
				} else if (ac(e, i, t),
					null !== i.child) {
					i.child.return = i,
						i = i.child;
					continue;
				}
				if (i === n)
					break;
				for (; null === i.sibling;) {
					if (null === i.return || i.return === n)
						return;
					4 === (i = i.return).tag && (c = !1);
				}
				i.sibling.return = i.return,
					i = i.sibling;
			}
		}

		function fc(e, n) {
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
				case 22:
					return void rc(3, n);
				case 1:
					return;
				case 5:
					var t = n.stateNode;
					if (null != t) {
						var r = n.memoizedProps
							, o = null !== e ? e.memoizedProps : r;
						e = n.type;
						var i = n.updateQueue;
						if (n.updateQueue = null,
							null !== i) {
							for (t[Ct] = r,
								"input" === e && "radio" === r.type && null != r.name && Ee(t, r),
								at(e, o),
								n = at(e, r),
								o = 0; o < i.length; o += 2) {
								var c = i[o]
									, s = i[o + 1];
								"style" === c ? rt(t, s) : "dangerouslySetInnerHTML" === c ? De(t, s) : "children" === c ? ze(t, s) : Z(t, c, s, n);
							}
							switch (e) {
								case "input":
									Ce(t, r);
									break;
								case "textarea":
									je(t, r);
									break;
								case "select":
									n = t._wrapperState.wasMultiple,
										t._wrapperState.wasMultiple = !!r.multiple,
										null != (e = r.value) ? Pe(t, !!r.multiple, e, !1) : n !== !!r.multiple && (null != r.defaultValue ? Pe(t, !!r.multiple, r.defaultValue, !0) : Pe(t, !!r.multiple, r.multiple ? [] : "", !1));
							}
						}
					}
					return;
				case 6:
					if (null === n.stateNode)
						throw Error(a(162));
					return void (n.stateNode.nodeValue = n.memoizedProps);
				case 3:
					return void ((n = n.stateNode).hydrate && (n.hydrate = !1,
						Mn(n.containerInfo)));
				case 12:
					return;
				case 13:
					if (t = n,
						null === n.memoizedState ? r = !1 : (r = !0,
							t = n.child,
							Rc = zo()),
						null !== t)
						e: for (e = t; ;) {
							if (5 === e.tag)
								i = e.stateNode,
									r ? "function" == typeof (i = i.style).setProperty ? i.setProperty("display", "none", "important") : i.display = "none" : (i = e.stateNode,
										o = null != (o = e.memoizedProps.style) && o.hasOwnProperty("display") ? o.display : null,
										i.style.display = tt("display", o));
							else if (6 === e.tag)
								e.stateNode.nodeValue = r ? "" : e.memoizedProps;
							else {
								if (13 === e.tag && null !== e.memoizedState && null === e.memoizedState.dehydrated) {
									(i = e.child.sibling).return = e,
										e = i;
									continue;
								}
								if (null !== e.child) {
									e.child.return = e,
										e = e.child;
									continue;
								}
							}
							if (e === t)
								break;
							for (; null === e.sibling;) {
								if (null === e.return || e.return === t)
									break e;
								e = e.return;
							}
							e.sibling.return = e.return,
								e = e.sibling;
						}
					return void dc(n);
				case 19:
					return void dc(n);
				case 17:
					return;
			}
			throw Error(a(163));
		}

		function dc(e) {
			var n = e.updateQueue;
			if (null !== n) {
				e.updateQueue = null;
				var t = e.stateNode;
				null === t && (t = e.stateNode = new $a),
					n.forEach((function (n) {
						var r = ys.bind(null, e, n);
						t.has(n) || (t.add(n),
							n.then(r, r));
					}
					));
			}
		}

		var mc = "function" == typeof WeakMap ? WeakMap : Map;

		function pc(e, n, t) {
			(t = si(t, null)).tag = 3,
				t.payload = {
					element: null
				};
			var r = n.value;
			return t.callback = function () {
				Fc || (Fc = !0,
					Mc = r),
					ec(e, n);
			}
				,
				t;
		}

		function hc(e, n, t) {
			(t = si(t, null)).tag = 3;
			var r = e.type.getDerivedStateFromError;
			if ("function" == typeof r) {
				var o = n.value;
				t.payload = function () {
					return ec(e, n),
						r(o);
				};
			}
			var i = e.stateNode;
			return null !== i && "function" == typeof i.componentDidCatch && (t.callback = function () {
				"function" != typeof r && (null === Uc ? Uc = new Set([this]) : Uc.add(this),
					ec(e, n));
				var t = n.stack;
				this.componentDidCatch(n.value, {
					componentStack: null !== t ? t : ""
				});
			}
			),
				t;
		}

		var gc, vc = Math.ceil, bc = Y.ReactCurrentDispatcher, wc = Y.ReactCurrentOwner, yc = 0, xc = 3, kc = 4, Sc = 0,
			Ec = null, Cc = null, Ac = 0, Ic = yc, Tc = null, Pc = 1073741823, Oc = 1073741823, _c = null, jc = 0,
			Nc = !1, Rc = 0, Lc = null, Fc = !1, Mc = null, Uc = null, Dc = !1, zc = null, Bc = 90, Hc = null, Wc = 0,
			Vc = null, Qc = 0;

		function Gc() {
			return 0 != (48 & Sc) ? 1073741821 - (zo() / 10 | 0) : 0 !== Qc ? Qc : Qc = 1073741821 - (zo() / 10 | 0);
		}

		function qc(e, n, t) {
			if (0 == (2 & (n = n.mode)))
				return 1073741823;
			var r = Bo();
			if (0 == (4 & n))
				return 99 === r ? 1073741823 : 1073741822;
			if (0 != (16 & Sc))
				return Ac;
			if (null !== t)
				e = Ko(e, 0 | t.timeoutMs || 5e3, 250);
			else
				switch (r) {
					case 99:
						e = 1073741823;
						break;
					case 98:
						e = Ko(e, 150, 100);
						break;
					case 97:
					case 96:
						e = Ko(e, 5e3, 250);
						break;
					case 95:
						e = 2;
						break;
					default:
						throw Error(a(326));
				}
			return null !== Ec && e === Ac && --e,
				e;
		}

		function Kc(e, n) {
			if (50 < Wc)
				throw Wc = 0,
				Vc = null,
				Error(a(185));
			if (null !== (e = Jc(e, n))) {
				var t = Bo();
				1073741823 === n ? 0 != (8 & Sc) && 0 == (48 & Sc) ? $c(e) : (Zc(e),
					0 === Sc && Go()) : Zc(e),
					0 == (4 & Sc) || 98 !== t && 99 !== t || (null === Hc ? Hc = new Map([[e, n]]) : (void 0 === (t = Hc.get(e)) || t > n) && Hc.set(e, n));
			}
		}

		function Jc(e, n) {
			e.expirationTime < n && (e.expirationTime = n);
			var t = e.alternate;
			null !== t && t.expirationTime < n && (t.expirationTime = n);
			var r = e.return
				, o = null;
			if (null === r && 3 === e.tag)
				o = e.stateNode;
			else
				for (; null !== r;) {
					if (t = r.alternate,
						r.childExpirationTime < n && (r.childExpirationTime = n),
						null !== t && t.childExpirationTime < n && (t.childExpirationTime = n),
						null === r.return && 3 === r.tag) {
						o = r.stateNode;
						break;
					}
					r = r.return;
				}
			return null !== o && (Ec === o && (as(n),
				Ic === kc && Ns(o, Ac)),
				Rs(o, n)),
				o;
		}

		function Yc(e) {
			var n = e.lastExpiredTime;
			if (0 !== n)
				return n;
			if (!js(e, n = e.firstPendingTime))
				return n;
			var t = e.lastPingedTime;
			return 2 >= (e = t > (e = e.nextKnownPendingLevel) ? t : e) && n !== e ? 0 : e;
		}

		function Zc(e) {
			if (0 !== e.lastExpiredTime)
				e.callbackExpirationTime = 1073741823,
					e.callbackPriority = 99,
					e.callbackNode = Qo($c.bind(null, e));
			else {
				var n = Yc(e)
					, t = e.callbackNode;
				if (0 === n)
					null !== t && (e.callbackNode = null,
						e.callbackExpirationTime = 0,
						e.callbackPriority = 90);
				else {
					var r = Gc();
					if (1073741823 === n ? r = 99 : 1 === n || 2 === n ? r = 95 : r = 0 >= (r = 10 * (1073741821 - n) - 10 * (1073741821 - r)) ? 99 : 250 >= r ? 98 : 5250 >= r ? 97 : 95,
						null !== t) {
						var o = e.callbackPriority;
						if (e.callbackExpirationTime === n && o >= r)
							return;
						t !== No && Eo(t);
					}
					e.callbackExpirationTime = n,
						e.callbackPriority = r,
						n = 1073741823 === n ? Qo($c.bind(null, e)) : Vo(r, Xc.bind(null, e), {
							timeout: 10 * (1073741821 - n) - zo()
						}),
						e.callbackNode = n;
				}
			}
		}

		function Xc(e, n) {
			if (Qc = 0,
				n)
				return Ls(e, n = Gc()),
					Zc(e),
					null;
			var t = Yc(e);
			if (0 !== t) {
				if (n = e.callbackNode,
					0 != (48 & Sc))
					throw Error(a(327));
				if (hs(),
					e === Ec && t === Ac || ts(e, t),
					null !== Cc) {
					var r = Sc;
					Sc |= 16;
					for (var o = os(); ;)
						try {
							ss();
							break;
						} catch (n) {
							rs(e, n);
						}
					if (ei(),
						Sc = r,
						bc.current = o,
						1 === Ic)
						throw n = Tc,
						ts(e, t),
						Ns(e, t),
						Zc(e),
						n;
					if (null === Cc)
						switch (o = e.finishedWork = e.current.alternate,
						e.finishedExpirationTime = t,
						r = Ic,
						Ec = null,
						r) {
							case yc:
							case 1:
								throw Error(a(345));
							case 2:
								Ls(e, 2 < t ? 2 : t);
								break;
							case xc:
								if (Ns(e, t),
									t === (r = e.lastSuspendedTime) && (e.nextKnownPendingLevel = fs(o)),
									1073741823 === Pc && 10 < (o = Rc + 500 - zo())) {
									if (Nc) {
										var i = e.lastPingedTime;
										if (0 === i || i >= t) {
											e.lastPingedTime = t,
												ts(e, t);
											break;
										}
									}
									if (0 !== (i = Yc(e)) && i !== t)
										break;
									if (0 !== r && r !== t) {
										e.lastPingedTime = r;
										break;
									}
									e.timeoutHandle = wt(ds.bind(null, e), o);
									break;
								}
								ds(e);
								break;
							case kc:
								if (Ns(e, t),
									t === (r = e.lastSuspendedTime) && (e.nextKnownPendingLevel = fs(o)),
									Nc && (0 === (o = e.lastPingedTime) || o >= t)) {
									e.lastPingedTime = t,
										ts(e, t);
									break;
								}
								if (0 !== (o = Yc(e)) && o !== t)
									break;
								if (0 !== r && r !== t) {
									e.lastPingedTime = r;
									break;
								}
								if (1073741823 !== Oc ? r = 10 * (1073741821 - Oc) - zo() : 1073741823 === Pc ? r = 0 : (r = 10 * (1073741821 - Pc) - 5e3,
									0 > (r = (o = zo()) - r) && (r = 0),
									(t = 10 * (1073741821 - t) - o) < (r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * vc(r / 1960)) - r) && (r = t)),
									10 < r) {
									e.timeoutHandle = wt(ds.bind(null, e), r);
									break;
								}
								ds(e);
								break;
							case 5:
								if (1073741823 !== Pc && null !== _c) {
									i = Pc;
									var c = _c;
									if (0 >= (r = 0 | c.busyMinDurationMs) ? r = 0 : (o = 0 | c.busyDelayMs,
										r = (i = zo() - (10 * (1073741821 - i) - (0 | c.timeoutMs || 5e3))) <= o ? 0 : o + r - i),
										10 < r) {
										Ns(e, t),
											e.timeoutHandle = wt(ds.bind(null, e), r);
										break;
									}
								}
								ds(e);
								break;
							default:
								throw Error(a(329));
						}
					if (Zc(e),
						e.callbackNode === n)
						return Xc.bind(null, e);
				}
			}
			return null;
		}

		function $c(e) {
			var n = e.lastExpiredTime;
			if (n = 0 !== n ? n : 1073741823,
				0 != (48 & Sc))
				throw Error(a(327));
			if (hs(),
				e === Ec && n === Ac || ts(e, n),
				null !== Cc) {
				var t = Sc;
				Sc |= 16;
				for (var r = os(); ;)
					try {
						cs();
						break;
					} catch (n) {
						rs(e, n);
					}
				if (ei(),
					Sc = t,
					bc.current = r,
					1 === Ic)
					throw t = Tc,
					ts(e, n),
					Ns(e, n),
					Zc(e),
					t;
				if (null !== Cc)
					throw Error(a(261));
				e.finishedWork = e.current.alternate,
					e.finishedExpirationTime = n,
					Ec = null,
					ds(e),
					Zc(e);
			}
			return null;
		}

		function es(e, n) {
			var t = Sc;
			Sc |= 1;
			try {
				return e(n);
			} finally {
				0 === (Sc = t) && Go();
			}
		}

		function ns(e, n) {
			var t = Sc;
			Sc &= -2,
				Sc |= 8;
			try {
				return e(n);
			} finally {
				0 === (Sc = t) && Go();
			}
		}

		function ts(e, n) {
			e.finishedWork = null,
				e.finishedExpirationTime = 0;
			var t = e.timeoutHandle;
			if (-1 !== t && (e.timeoutHandle = -1,
				yt(t)),
				null !== Cc)
				for (t = Cc.return; null !== t;) {
					var r = t;
					switch (r.tag) {
						case 1:
							null != (r = r.type.childContextTypes) && vo();
							break;
						case 3:
							Ni(),
								so(mo),
								so(fo);
							break;
						case 5:
							Li(r);
							break;
						case 4:
							Ni();
							break;
						case 13:
						case 19:
							so(Fi);
							break;
						case 10:
							ni(r);
					}
					t = t.return;
				}
			Ec = e,
				Cc = As(e.current, null),
				Ac = n,
				Ic = yc,
				Tc = null,
				Oc = Pc = 1073741823,
				_c = null,
				jc = 0,
				Nc = !1;
		}

		function rs(e, n) {
			for (; ;) {
				try {
					if (ei(),
						Di.current = ga,
						Qi)
						for (var t = Hi.memoizedState; null !== t;) {
							var r = t.queue;
							null !== r && (r.pending = null),
								t = t.next;
						}
					if (Bi = 0,
						Vi = Wi = Hi = null,
						Qi = !1,
						null === Cc || null === Cc.return)
						return Ic = 1,
							Tc = n,
							Cc = null;
					e: {
						var o = e
							, i = Cc.return
							, a = Cc
							, c = n;
						if (n = Ac,
							a.effectTag |= 2048,
							a.firstEffect = a.lastEffect = null,
							null !== c && "object" == typeof c && "function" == typeof c.then) {
							var s = c;
							if (0 == (2 & a.mode)) {
								var l = a.alternate;
								l ? (a.updateQueue = l.updateQueue,
									a.memoizedState = l.memoizedState,
									a.expirationTime = l.expirationTime) : (a.updateQueue = null,
										a.memoizedState = null);
							}
							var u = 0 != (1 & Fi.current)
								, f = i;
							do {
								var d;
								if (d = 13 === f.tag) {
									var m = f.memoizedState;
									if (null !== m)
										d = null !== m.dehydrated;
									else {
										var p = f.memoizedProps;
										d = void 0 !== p.fallback && (!0 !== p.unstable_avoidThisFallback || !u);
									}
								}
								if (d) {
									var h = f.updateQueue;
									if (null === h) {
										var g = new Set;
										g.add(s),
											f.updateQueue = g;
									} else
										h.add(s);
									if (0 == (2 & f.mode)) {
										if (f.effectTag |= 64,
											a.effectTag &= -2981,
											1 === a.tag)
											if (null === a.alternate)
												a.tag = 17;
											else {
												var v = si(1073741823, null);
												v.tag = 2,
													li(a, v);
											}
										a.expirationTime = 1073741823;
										break e;
									}
									c = void 0,
										a = n;
									var b = o.pingCache;
									if (null === b ? (b = o.pingCache = new mc,
										c = new Set,
										b.set(s, c)) : void 0 === (c = b.get(s)) && (c = new Set,
											b.set(s, c)),
										!c.has(a)) {
										c.add(a);
										var w = ws.bind(null, o, s, a);
										s.then(w, w);
									}
									f.effectTag |= 4096,
										f.expirationTime = n;
									break e;
								}
								f = f.return;
							} while (null !== f);
							c = Error((ge(a.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." + ve(a));
						}
						5 !== Ic && (Ic = 2),
							c = Xa(c, a),
							f = i;
						do {
							switch (f.tag) {
								case 3:
									s = c,
										f.effectTag |= 4096,
										f.expirationTime = n,
										ui(f, pc(f, s, n));
									break e;
								case 1:
									s = c;
									var y = f.type
										, x = f.stateNode;
									if (0 == (64 & f.effectTag) && ("function" == typeof y.getDerivedStateFromError || null !== x && "function" == typeof x.componentDidCatch && (null === Uc || !Uc.has(x)))) {
										f.effectTag |= 4096,
											f.expirationTime = n,
											ui(f, hc(f, s, n));
										break e;
									}
							}
							f = f.return;
						} while (null !== f);
					}
					Cc = us(Cc);
				} catch (e) {
					n = e;
					continue;
				}
				break;
			}
		}

		function os() {
			var e = bc.current;
			return bc.current = ga,
				null === e ? ga : e;
		}

		function is(e, n) {
			e < Pc && 2 < e && (Pc = e),
				null !== n && e < Oc && 2 < e && (Oc = e,
					_c = n);
		}

		function as(e) {
			e > jc && (jc = e);
		}

		function cs() {
			for (; null !== Cc;)
				Cc = ls(Cc);
		}

		function ss() {
			for (; null !== Cc && !Ro();)
				Cc = ls(Cc);
		}

		function ls(e) {
			var n = gc(e.alternate, e, Ac);
			return e.memoizedProps = e.pendingProps,
				null === n && (n = us(e)),
				wc.current = null,
				n;
		}

		function us(e) {
			Cc = e;
			do {
				var n = Cc.alternate;
				if (e = Cc.return,
					0 == (2048 & Cc.effectTag)) {
					if (n = Ya(n, Cc, Ac),
						1 === Ac || 1 !== Cc.childExpirationTime) {
						for (var t = 0, r = Cc.child; null !== r;) {
							var o = r.expirationTime
								, i = r.childExpirationTime;
							o > t && (t = o),
								i > t && (t = i),
								r = r.sibling;
						}
						Cc.childExpirationTime = t;
					}
					if (null !== n)
						return n;
					null !== e && 0 == (2048 & e.effectTag) && (null === e.firstEffect && (e.firstEffect = Cc.firstEffect),
						null !== Cc.lastEffect && (null !== e.lastEffect && (e.lastEffect.nextEffect = Cc.firstEffect),
							e.lastEffect = Cc.lastEffect),
						1 < Cc.effectTag && (null !== e.lastEffect ? e.lastEffect.nextEffect = Cc : e.firstEffect = Cc,
							e.lastEffect = Cc));
				} else {
					if (null !== (n = Za(Cc)))
						return n.effectTag &= 2047,
							n;
					null !== e && (e.firstEffect = e.lastEffect = null,
						e.effectTag |= 2048);
				}
				if (null !== (n = Cc.sibling))
					return n;
				Cc = e;
			} while (null !== Cc);
			return Ic === yc && (Ic = 5),
				null;
		}

		function fs(e) {
			var n = e.expirationTime;
			return n > (e = e.childExpirationTime) ? n : e;
		}

		function ds(e) {
			var n = Bo();
			return Wo(99, ms.bind(null, e, n)),
				null;
		}

		function ms(e, n) {
			do {
				hs();
			} while (null !== zc);
			if (0 != (48 & Sc))
				throw Error(a(327));
			var t = e.finishedWork
				, r = e.finishedExpirationTime;
			if (null === t)
				return null;
			if (e.finishedWork = null,
				e.finishedExpirationTime = 0,
				t === e.current)
				throw Error(a(177));
			e.callbackNode = null,
				e.callbackExpirationTime = 0,
				e.callbackPriority = 90,
				e.nextKnownPendingLevel = 0;
			var o = fs(t);
			if (e.firstPendingTime = o,
				r <= e.lastSuspendedTime ? e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0 : r <= e.firstSuspendedTime && (e.firstSuspendedTime = r - 1),
				r <= e.lastPingedTime && (e.lastPingedTime = 0),
				r <= e.lastExpiredTime && (e.lastExpiredTime = 0),
				e === Ec && (Cc = Ec = null,
					Ac = 0),
				1 < t.effectTag ? null !== t.lastEffect ? (t.lastEffect.nextEffect = t,
					o = t.firstEffect) : o = t : o = t.firstEffect,
				null !== o) {
				var i = Sc;
				Sc |= 32,
					wc.current = null,
					ht = qn;
				var c = mt();
				if (pt(c)) {
					if ("selectionStart" in c)
						var s = {
							start: c.selectionStart,
							end: c.selectionEnd
						};
					else
						e: {
							var l = (s = (s = c.ownerDocument) && s.defaultView || window).getSelection && s.getSelection();
							if (l && 0 !== l.rangeCount) {
								s = l.anchorNode;
								var u = l.anchorOffset
									, f = l.focusNode;
								l = l.focusOffset;
								try {
									s.nodeType,
										f.nodeType;
								} catch (e) {
									s = null;
									break e;
								}
								var d = 0
									, m = -1
									, p = -1
									, h = 0
									, g = 0
									, v = c
									, b = null;
								n: for (; ;) {
									for (var w; v !== s || 0 !== u && 3 !== v.nodeType || (m = d + u),
										v !== f || 0 !== l && 3 !== v.nodeType || (p = d + l),
										3 === v.nodeType && (d += v.nodeValue.length),
										null !== (w = v.firstChild);)
										b = v,
											v = w;
									for (; ;) {
										if (v === c)
											break n;
										if (b === s && ++h === u && (m = d),
											b === f && ++g === l && (p = d),
											null !== (w = v.nextSibling))
											break;
										b = (v = b).parentNode;
									}
									v = w;
								}
								s = -1 === m || -1 === p ? null : {
									start: m,
									end: p
								};
							} else
								s = null;
						}
					s = s || {
						start: 0,
						end: 0
					};
				} else
					s = null;
				gt = {
					activeElementDetached: null,
					focusedElem: c,
					selectionRange: s
				},
					qn = !1,
					Lc = o;
				do {
					try {
						ps();
					} catch (e) {
						if (null === Lc)
							throw Error(a(330));
						bs(Lc, e),
							Lc = Lc.nextEffect;
					}
				} while (null !== Lc);
				Lc = o;
				do {
					try {
						for (c = e,
							s = n; null !== Lc;) {
							var y = Lc.effectTag;
							if (16 & y && ze(Lc.stateNode, ""),
								128 & y) {
								var x = Lc.alternate;
								if (null !== x) {
									var k = x.ref;
									null !== k && ("function" == typeof k ? k(null) : k.current = null);
								}
							}
							switch (1038 & y) {
								case 2:
									lc(Lc),
										Lc.effectTag &= -3;
									break;
								case 6:
									lc(Lc),
										Lc.effectTag &= -3,
										fc(Lc.alternate, Lc);
									break;
								case 1024:
									Lc.effectTag &= -1025;
									break;
								case 1028:
									Lc.effectTag &= -1025,
										fc(Lc.alternate, Lc);
									break;
								case 4:
									fc(Lc.alternate, Lc);
									break;
								case 8:
									uc(c, u = Lc, s),
										cc(u);
							}
							Lc = Lc.nextEffect;
						}
					} catch (e) {
						if (null === Lc)
							throw Error(a(330));
						bs(Lc, e),
							Lc = Lc.nextEffect;
					}
				} while (null !== Lc);
				if (k = gt,
					x = mt(),
					y = k.focusedElem,
					s = k.selectionRange,
					x !== y && y && y.ownerDocument && function e(n, t) {
						return !(!n || !t) && (n === t || (!n || 3 !== n.nodeType) && (t && 3 === t.nodeType ? e(n, t.parentNode) : "contains" in n ? n.contains(t) : !!n.compareDocumentPosition && !!(16 & n.compareDocumentPosition(t))));
					}(y.ownerDocument.documentElement, y)) {
					null !== s && pt(y) && (x = s.start,
						void 0 === (k = s.end) && (k = x),
						"selectionStart" in y ? (y.selectionStart = x,
							y.selectionEnd = Math.min(k, y.value.length)) : (k = (x = y.ownerDocument || document) && x.defaultView || window).getSelection && (k = k.getSelection(),
								u = y.textContent.length,
								c = Math.min(s.start, u),
								s = void 0 === s.end ? c : Math.min(s.end, u),
								!k.extend && c > s && (u = s,
									s = c,
									c = u),
								u = dt(y, c),
								f = dt(y, s),
								u && f && (1 !== k.rangeCount || k.anchorNode !== u.node || k.anchorOffset !== u.offset || k.focusNode !== f.node || k.focusOffset !== f.offset) && ((x = x.createRange()).setStart(u.node, u.offset),
									k.removeAllRanges(),
									c > s ? (k.addRange(x),
										k.extend(f.node, f.offset)) : (x.setEnd(f.node, f.offset),
											k.addRange(x))))),
						x = [];
					for (k = y; k = k.parentNode;)
						1 === k.nodeType && x.push({
							element: k,
							left: k.scrollLeft,
							top: k.scrollTop
						});
					for ("function" == typeof y.focus && y.focus(),
						y = 0; y < x.length; y++)
						(k = x[y]).element.scrollLeft = k.left,
							k.element.scrollTop = k.top;
				}
				qn = !!ht,
					gt = ht = null,
					e.current = t,
					Lc = o;
				do {
					try {
						for (y = e; null !== Lc;) {
							var S = Lc.effectTag;
							if (36 & S && ic(y, Lc.alternate, Lc),
								128 & S) {
								x = void 0;
								var E = Lc.ref;
								if (null !== E) {
									var C = Lc.stateNode;
									switch (Lc.tag) {
										case 5:
											x = C;
											break;
										default:
											x = C;
									}
									"function" == typeof E ? E(x) : E.current = x;
								}
							}
							Lc = Lc.nextEffect;
						}
					} catch (e) {
						if (null === Lc)
							throw Error(a(330));
						bs(Lc, e),
							Lc = Lc.nextEffect;
					}
				} while (null !== Lc);
				Lc = null,
					Lo(),
					Sc = i;
			} else
				e.current = t;
			if (Dc)
				Dc = !1,
					zc = e,
					Bc = n;
			else
				for (Lc = o; null !== Lc;)
					n = Lc.nextEffect,
						Lc.nextEffect = null,
						Lc = n;
			if (0 === (n = e.firstPendingTime) && (Uc = null),
				1073741823 === n ? e === Vc ? Wc++ : (Wc = 0,
					Vc = e) : Wc = 0,
				"function" == typeof xs && xs(t.stateNode, r),
				Zc(e),
				Fc)
				throw Fc = !1,
				e = Mc,
				Mc = null,
				e;
			return 0 != (8 & Sc) || Go(),
				null;
		}

		function ps() {
			for (; null !== Lc;) {
				var e = Lc.effectTag;
				0 != (256 & e) && tc(Lc.alternate, Lc),
					0 == (512 & e) || Dc || (Dc = !0,
						Vo(97, (function () {
							return hs(),
								null;
						}
						))),
					Lc = Lc.nextEffect;
			}
		}

		function hs() {
			if (90 !== Bc) {
				var e = 97 < Bc ? 97 : Bc;
				return Bc = 90,
					Wo(e, gs);
			}
		}

		function gs() {
			if (null === zc)
				return !1;
			var e = zc;
			if (zc = null,
				0 != (48 & Sc))
				throw Error(a(331));
			var n = Sc;
			for (Sc |= 32,
				e = e.current.firstEffect; null !== e;) {
				try {
					var t = e;
					if (0 != (512 & t.effectTag))
						switch (t.tag) {
							case 0:
							case 11:
							case 15:
							case 22:
								rc(5, t),
									oc(5, t);
						}
				} catch (n) {
					if (null === e)
						throw Error(a(330));
					bs(e, n);
				}
				t = e.nextEffect,
					e.nextEffect = null,
					e = t;
			}
			return Sc = n,
				Go(),
				!0;
		}

		function vs(e, n, t) {
			li(e, n = pc(e, n = Xa(t, n), 1073741823)),
				null !== (e = Jc(e, 1073741823)) && Zc(e);
		}

		function bs(e, n) {
			if (3 === e.tag)
				vs(e, e, n);
			else
				for (var t = e.return; null !== t;) {
					if (3 === t.tag) {
						vs(t, e, n);
						break;
					}
					if (1 === t.tag) {
						var r = t.stateNode;
						if ("function" == typeof t.type.getDerivedStateFromError || "function" == typeof r.componentDidCatch && (null === Uc || !Uc.has(r))) {
							li(t, e = hc(t, e = Xa(n, e), 1073741823)),
								null !== (t = Jc(t, 1073741823)) && Zc(t);
							break;
						}
					}
					t = t.return;
				}
		}

		function ws(e, n, t) {
			var r = e.pingCache;
			null !== r && r.delete(n),
				Ec === e && Ac === t ? Ic === kc || Ic === xc && 1073741823 === Pc && zo() - Rc < 500 ? ts(e, Ac) : Nc = !0 : js(e, t) && (0 !== (n = e.lastPingedTime) && n < t || (e.lastPingedTime = t,
					Zc(e)));
		}

		function ys(e, n) {
			var t = e.stateNode;
			null !== t && t.delete(n),
				0 === (n = 0) && (n = qc(n = Gc(), e, null)),
				null !== (e = Jc(e, n)) && Zc(e);
		}

		gc = function (e, n, t) {
			var r = n.expirationTime;
			if (null !== e) {
				var o = n.pendingProps;
				if (e.memoizedProps !== o || mo.current)
					Oa = !0;
				else {
					if (r < t) {
						switch (Oa = !1,
						n.tag) {
							case 3:
								Da(n),
									Ta();
								break;
							case 5:
								if (Ri(n),
									4 & n.mode && 1 !== t && o.hidden)
									return n.expirationTime = n.childExpirationTime = 1,
										null;
								break;
							case 1:
								go(n.type) && yo(n);
								break;
							case 4:
								ji(n, n.stateNode.containerInfo);
								break;
							case 10:
								r = n.memoizedProps.value,
									o = n.type._context,
									lo(Yo, o._currentValue),
									o._currentValue = r;
								break;
							case 13:
								if (null !== n.memoizedState)
									return 0 !== (r = n.child.childExpirationTime) && r >= t ? Va(e, n, t) : (lo(Fi, 1 & Fi.current),
										null !== (n = Ka(e, n, t)) ? n.sibling : null);
								lo(Fi, 1 & Fi.current);
								break;
							case 19:
								if (r = n.childExpirationTime >= t,
									0 != (64 & e.effectTag)) {
									if (r)
										return qa(e, n, t);
									n.effectTag |= 64;
								}
								if (null !== (o = n.memoizedState) && (o.rendering = null,
									o.tail = null),
									lo(Fi, Fi.current),
									!r)
									return null;
						}
						return Ka(e, n, t);
					}
					Oa = !1;
				}
			} else
				Oa = !1;
			switch (n.expirationTime = 0,
			n.tag) {
				case 2:
					if (r = n.type,
						null !== e && (e.alternate = null,
							n.alternate = null,
							n.effectTag |= 2),
						e = n.pendingProps,
						o = ho(n, fo.current),
						ri(n, t),
						o = Ki(null, n, r, e, o, t),
						n.effectTag |= 1,
						"object" == typeof o && null !== o && "function" == typeof o.render && void 0 === o.$$typeof) {
						if (n.tag = 1,
							n.memoizedState = null,
							n.updateQueue = null,
							go(r)) {
							var i = !0;
							yo(n);
						} else
							i = !1;
						n.memoizedState = null !== o.state && void 0 !== o.state ? o.state : null,
							ai(n);
						var c = r.getDerivedStateFromProps;
						"function" == typeof c && hi(n, r, c, e),
							o.updater = gi,
							n.stateNode = o,
							o._reactInternalFiber = n,
							yi(n, r, e, t),
							n = Ua(null, n, r, !0, i, t);
					} else
						n.tag = 0,
							_a(null, n, o, t),
							n = n.child;
					return n;
				case 16:
					e: {
						if (o = n.elementType,
							null !== e && (e.alternate = null,
								n.alternate = null,
								n.effectTag |= 2),
							e = n.pendingProps,
							function (e) {
								if (-1 === e._status) {
									e._status = 0;
									var n = e._ctor;
									n = n(),
										e._result = n,
										n.then((function (n) {
											0 === e._status && (n = n.default,
												e._status = 1,
												e._result = n);
										}
										), (function (n) {
											0 === e._status && (e._status = 2,
												e._result = n);
										}
										));
								}
							}(o),
							1 !== o._status)
							throw o._result;
						switch (o = o._result,
						n.type = o,
						i = n.tag = function (e) {
							if ("function" == typeof e)
								return Cs(e) ? 1 : 0;
							if (null != e) {
								if ((e = e.$$typeof) === se)
									return 11;
								if (e === fe)
									return 14;
							}
							return 2;
						}(o),
						e = Jo(o, e),
						i) {
							case 0:
								n = Fa(null, n, o, e, t);
								break e;
							case 1:
								n = Ma(null, n, o, e, t);
								break e;
							case 11:
								n = ja(null, n, o, e, t);
								break e;
							case 14:
								n = Na(null, n, o, Jo(o.type, e), r, t);
								break e;
						}
						throw Error(a(306, o, ""));
					}
					return n;
				case 0:
					return r = n.type,
						o = n.pendingProps,
						Fa(e, n, r, o = n.elementType === r ? o : Jo(r, o), t);
				case 1:
					return r = n.type,
						o = n.pendingProps,
						Ma(e, n, r, o = n.elementType === r ? o : Jo(r, o), t);
				case 3:
					if (Da(n),
						r = n.updateQueue,
						null === e || null === r)
						throw Error(a(282));
					if (r = n.pendingProps,
						o = null !== (o = n.memoizedState) ? o.element : null,
						ci(e, n),
						fi(n, r, null, t),
						(r = n.memoizedState.element) === o)
						Ta(),
							n = Ka(e, n, t);
					else {
						if ((o = n.stateNode.hydrate) && (xa = xt(n.stateNode.containerInfo.firstChild),
							ya = n,
							o = ka = !0),
							o)
							for (t = Ai(n, null, r, t),
								n.child = t; t;)
								t.effectTag = -3 & t.effectTag | 1024,
									t = t.sibling;
						else
							_a(e, n, r, t),
								Ta();
						n = n.child;
					}
					return n;
				case 5:
					return Ri(n),
						null === e && Ca(n),
						r = n.type,
						o = n.pendingProps,
						i = null !== e ? e.memoizedProps : null,
						c = o.children,
						bt(r, o) ? c = null : null !== i && bt(r, i) && (n.effectTag |= 16),
						La(e, n),
						4 & n.mode && 1 !== t && o.hidden ? (n.expirationTime = n.childExpirationTime = 1,
							n = null) : (_a(e, n, c, t),
								n = n.child),
						n;
				case 6:
					return null === e && Ca(n),
						null;
				case 13:
					return Va(e, n, t);
				case 4:
					return ji(n, n.stateNode.containerInfo),
						r = n.pendingProps,
						null === e ? n.child = Ci(n, null, r, t) : _a(e, n, r, t),
						n.child;
				case 11:
					return r = n.type,
						o = n.pendingProps,
						ja(e, n, r, o = n.elementType === r ? o : Jo(r, o), t);
				case 7:
					return _a(e, n, n.pendingProps, t),
						n.child;
				case 8:
				case 12:
					return _a(e, n, n.pendingProps.children, t),
						n.child;
				case 10:
					e: {
						r = n.type._context,
							o = n.pendingProps,
							c = n.memoizedProps,
							i = o.value;
						var s = n.type._context;
						if (lo(Yo, s._currentValue),
							s._currentValue = i,
							null !== c)
							if (s = c.value,
								0 === (i = Mr(s, i) ? 0 : 0 | ("function" == typeof r._calculateChangedBits ? r._calculateChangedBits(s, i) : 1073741823))) {
								if (c.children === o.children && !mo.current) {
									n = Ka(e, n, t);
									break e;
								}
							} else
								for (null !== (s = n.child) && (s.return = n); null !== s;) {
									var l = s.dependencies;
									if (null !== l) {
										c = s.child;
										for (var u = l.firstContext; null !== u;) {
											if (u.context === r && 0 != (u.observedBits & i)) {
												1 === s.tag && ((u = si(t, null)).tag = 2,
													li(s, u)),
													s.expirationTime < t && (s.expirationTime = t),
													null !== (u = s.alternate) && u.expirationTime < t && (u.expirationTime = t),
													ti(s.return, t),
													l.expirationTime < t && (l.expirationTime = t);
												break;
											}
											u = u.next;
										}
									} else
										c = 10 === s.tag && s.type === n.type ? null : s.child;
									if (null !== c)
										c.return = s;
									else
										for (c = s; null !== c;) {
											if (c === n) {
												c = null;
												break;
											}
											if (null !== (s = c.sibling)) {
												s.return = c.return,
													c = s;
												break;
											}
											c = c.return;
										}
									s = c;
								}
						_a(e, n, o.children, t),
							n = n.child;
					}
					return n;
				case 9:
					return o = n.type,
						r = (i = n.pendingProps).children,
						ri(n, t),
						r = r(o = oi(o, i.unstable_observedBits)),
						n.effectTag |= 1,
						_a(e, n, r, t),
						n.child;
				case 14:
					return i = Jo(o = n.type, n.pendingProps),
						Na(e, n, o, i = Jo(o.type, i), r, t);
				case 15:
					return Ra(e, n, n.type, n.pendingProps, r, t);
				case 17:
					return r = n.type,
						o = n.pendingProps,
						o = n.elementType === r ? o : Jo(r, o),
						null !== e && (e.alternate = null,
							n.alternate = null,
							n.effectTag |= 2),
						n.tag = 1,
						go(r) ? (e = !0,
							yo(n)) : e = !1,
						ri(n, t),
						bi(n, r, o),
						yi(n, r, o, t),
						Ua(null, n, r, !0, e, t);
				case 19:
					return qa(e, n, t);
			}
			throw Error(a(156, n.tag));
		}
			;
		var xs = null
			, ks = null;

		function Ss(e, n, t, r) {
			this.tag = e,
				this.key = t,
				this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
				this.index = 0,
				this.ref = null,
				this.pendingProps = n,
				this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
				this.mode = r,
				this.effectTag = 0,
				this.lastEffect = this.firstEffect = this.nextEffect = null,
				this.childExpirationTime = this.expirationTime = 0,
				this.alternate = null;
		}

		function Es(e, n, t, r) {
			return new Ss(e, n, t, r);
		}

		function Cs(e) {
			return !(!(e = e.prototype) || !e.isReactComponent);
		}

		function As(e, n) {
			var t = e.alternate;
			return null === t ? ((t = Es(e.tag, n, e.key, e.mode)).elementType = e.elementType,
				t.type = e.type,
				t.stateNode = e.stateNode,
				t.alternate = e,
				e.alternate = t) : (t.pendingProps = n,
					t.effectTag = 0,
					t.nextEffect = null,
					t.firstEffect = null,
					t.lastEffect = null),
				t.childExpirationTime = e.childExpirationTime,
				t.expirationTime = e.expirationTime,
				t.child = e.child,
				t.memoizedProps = e.memoizedProps,
				t.memoizedState = e.memoizedState,
				t.updateQueue = e.updateQueue,
				n = e.dependencies,
				t.dependencies = null === n ? null : {
					expirationTime: n.expirationTime,
					firstContext: n.firstContext,
					responders: n.responders
				},
				t.sibling = e.sibling,
				t.index = e.index,
				t.ref = e.ref,
				t;
		}

		function Is(e, n, t, r, o, i) {
			var c = 2;
			if (r = e,
				"function" == typeof e)
				Cs(e) && (c = 1);
			else if ("string" == typeof e)
				c = 5;
			else
				e: switch (e) {
					case te:
						return Ts(t.children, o, i, n);
					case ce:
						c = 8,
							o |= 7;
						break;
					case re:
						c = 8,
							o |= 1;
						break;
					case oe:
						return (e = Es(12, t, n, 8 | o)).elementType = oe,
							e.type = oe,
							e.expirationTime = i,
							e;
					case le:
						return (e = Es(13, t, n, o)).type = le,
							e.elementType = le,
							e.expirationTime = i,
							e;
					case ue:
						return (e = Es(19, t, n, o)).elementType = ue,
							e.expirationTime = i,
							e;
					default:
						if ("object" == typeof e && null !== e)
							switch (e.$$typeof) {
								case ie:
									c = 10;
									break e;
								case ae:
									c = 9;
									break e;
								case se:
									c = 11;
									break e;
								case fe:
									c = 14;
									break e;
								case de:
									c = 16,
										r = null;
									break e;
								case me:
									c = 22;
									break e;
							}
						throw Error(a(130, null == e ? e : typeof e, ""));
				}
			return (n = Es(c, t, n, o)).elementType = e,
				n.type = r,
				n.expirationTime = i,
				n;
		}

		function Ts(e, n, t, r) {
			return (e = Es(7, e, r, n)).expirationTime = t,
				e;
		}

		function Ps(e, n, t) {
			return (e = Es(6, e, null, n)).expirationTime = t,
				e;
		}

		function Os(e, n, t) {
			return (n = Es(4, null !== e.children ? e.children : [], e.key, n)).expirationTime = t,
				n.stateNode = {
					containerInfo: e.containerInfo,
					pendingChildren: null,
					implementation: e.implementation
				},
				n;
		}

		function _s(e, n, t) {
			this.tag = n,
				this.current = null,
				this.containerInfo = e,
				this.pingCache = this.pendingChildren = null,
				this.finishedExpirationTime = 0,
				this.finishedWork = null,
				this.timeoutHandle = -1,
				this.pendingContext = this.context = null,
				this.hydrate = t,
				this.callbackNode = null,
				this.callbackPriority = 90,
				this.lastExpiredTime = this.lastPingedTime = this.nextKnownPendingLevel = this.lastSuspendedTime = this.firstSuspendedTime = this.firstPendingTime = 0;
		}

		function js(e, n) {
			var t = e.firstSuspendedTime;
			return e = e.lastSuspendedTime,
				0 !== t && t >= n && e <= n;
		}

		function Ns(e, n) {
			var t = e.firstSuspendedTime
				, r = e.lastSuspendedTime;
			t < n && (e.firstSuspendedTime = n),
				(r > n || 0 === t) && (e.lastSuspendedTime = n),
				n <= e.lastPingedTime && (e.lastPingedTime = 0),
				n <= e.lastExpiredTime && (e.lastExpiredTime = 0);
		}

		function Rs(e, n) {
			n > e.firstPendingTime && (e.firstPendingTime = n);
			var t = e.firstSuspendedTime;
			0 !== t && (n >= t ? e.firstSuspendedTime = e.lastSuspendedTime = e.nextKnownPendingLevel = 0 : n >= e.lastSuspendedTime && (e.lastSuspendedTime = n + 1),
				n > e.nextKnownPendingLevel && (e.nextKnownPendingLevel = n));
		}

		function Ls(e, n) {
			var t = e.lastExpiredTime;
			(0 === t || t > n) && (e.lastExpiredTime = n);
		}

		function Fs(e, n, t, r) {
			var o = n.current
				, i = Gc()
				, c = mi.suspense;
			i = qc(i, o, c);
			e: if (t) {
				n: {
					if ($e(t = t._reactInternalFiber) !== t || 1 !== t.tag)
						throw Error(a(170));
					var s = t;
					do {
						switch (s.tag) {
							case 3:
								s = s.stateNode.context;
								break n;
							case 1:
								if (go(s.type)) {
									s = s.stateNode.__reactInternalMemoizedMergedChildContext;
									break n;
								}
						}
						s = s.return;
					} while (null !== s);
					throw Error(a(171));
				}
				if (1 === t.tag) {
					var l = t.type;
					if (go(l)) {
						t = wo(t, l, s);
						break e;
					}
				}
				t = s;
			} else
				t = uo;
			return null === n.context ? n.context = t : n.pendingContext = t,
				(n = si(i, c)).payload = {
					element: e
				},
				null !== (r = void 0 === r ? null : r) && (n.callback = r),
				li(o, n),
				Kc(o, i),
				i;
		}

		function Ms(e) {
			if (!(e = e.current).child)
				return null;
			switch (e.child.tag) {
				case 5:
				default:
					return e.child.stateNode;
			}
		}

		function Us(e, n) {
			null !== (e = e.memoizedState) && null !== e.dehydrated && e.retryTime < n && (e.retryTime = n);
		}

		function Ds(e, n) {
			Us(e, n),
				(e = e.alternate) && Us(e, n);
		}

		function zs(e, n, t) {
			var r = new _s(e, n, t = null != t && !0 === t.hydrate)
				, o = Es(3, null, null, 2 === n ? 7 : 1 === n ? 3 : 0);
			r.current = o,
				o.stateNode = r,
				ai(o),
				e[At] = r.current,
				t && 0 !== n && function (e, n) {
					var t = Xe(n);
					In.forEach((function (e) {
						hn(e, n, t);
					}
					)),
						Tn.forEach((function (e) {
							hn(e, n, t);
						}
						));
				}(0, 9 === e.nodeType ? e : e.ownerDocument),
				this._internalRoot = r;
		}

		function Bs(e) {
			return !(!e || 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType && (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue));
		}

		function Hs(e, n, t, r, o) {
			var i = t._reactRootContainer;
			if (i) {
				var a = i._internalRoot;
				if ("function" == typeof o) {
					var c = o;
					o = function () {
						var e = Ms(a);
						c.call(e);
					};
				}
				Fs(n, a, e, o);
			} else {
				if (i = t._reactRootContainer = function (e, n) {
					if (n || (n = !(!(n = e ? 9 === e.nodeType ? e.documentElement : e.firstChild : null) || 1 !== n.nodeType || !n.hasAttribute("data-reactroot"))),
						!n)
						for (var t; t = e.lastChild;)
							e.removeChild(t);
					return new zs(e, 0, n ? {
						hydrate: !0
					} : void 0);
				}(t, r),
					a = i._internalRoot,
					"function" == typeof o) {
					var s = o;
					o = function () {
						var e = Ms(a);
						s.call(e);
					};
				}
				ns((function () {
					Fs(n, a, e, o);
				}
				));
			}
			return Ms(a);
		}

		function Ws(e, n, t) {
			var r = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
			return {
				$$typeof: ne,
				key: null == r ? null : "" + r,
				children: e,
				containerInfo: n,
				implementation: t
			};
		}

		function Vs(e, n) {
			var t = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
			if (!Bs(n))
				throw Error(a(200));
			return Ws(e, n, null, t);
		}

		zs.prototype.render = function (e) {
			Fs(e, this._internalRoot, null, null);
		}
			,
			zs.prototype.unmount = function () {
				var e = this._internalRoot
					, n = e.containerInfo;
				Fs(null, e, null, (function () {
					n[At] = null;
				}
				));
			}
			,
			gn = function (e) {
				if (13 === e.tag) {
					var n = Ko(Gc(), 150, 100);
					Kc(e, n),
						Ds(e, n);
				}
			}
			,
			vn = function (e) {
				13 === e.tag && (Kc(e, 3),
					Ds(e, 3));
			}
			,
			bn = function (e) {
				if (13 === e.tag) {
					var n = Gc();
					Kc(e, n = qc(n, e, null)),
						Ds(e, n);
				}
			}
			,
			T = function (e, n, t) {
				switch (n) {
					case "input":
						if (Ce(e, t),
							n = t.name,
							"radio" === t.type && null != n) {
							for (t = e; t.parentNode;)
								t = t.parentNode;
							for (t = t.querySelectorAll("input[name=" + JSON.stringify("" + n) + "][type=\"radio\"]"),
								n = 0; n < t.length; n++) {
								var r = t[n];
								if (r !== e && r.form === e.form) {
									var o = Ot(r);
									if (!o)
										throw Error(a(90));
									xe(r),
										Ce(r, o);
								}
							}
						}
						break;
					case "textarea":
						je(e, t);
						break;
					case "select":
						null != (n = t.value) && Pe(e, !!t.multiple, n, !1);
				}
			}
			,
			R = es,
			L = function (e, n, t, r, o) {
				var i = Sc;
				Sc |= 4;
				try {
					return Wo(98, e.bind(null, n, t, r, o));
				} finally {
					0 === (Sc = i) && Go();
				}
			}
			,
			F = function () {
				0 == (49 & Sc) && (function () {
					if (null !== Hc) {
						var e = Hc;
						Hc = null,
							e.forEach((function (e, n) {
								Ls(n, e),
									Zc(n);
							}
							)),
							Go();
					}
				}(),
					hs());
			}
			,
			M = function (e, n) {
				var t = Sc;
				Sc |= 2;
				try {
					return e(n);
				} finally {
					0 === (Sc = t) && Go();
				}
			}
			;
		var Qs, Gs, qs = {
			Events: [Tt, Pt, Ot, A, S, Mt, function (e) {
				on(e, Ft);
			}
				, j, N, Xn, sn, hs, {
					current: !1
				}]
		};
		Gs = (Qs = {
			findFiberByHostInstance: It,
			bundleType: 0,
			version: "16.14.0",
			rendererPackageName: "react-dom"
		}).findFiberByHostInstance,
			function (e) {
				if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)
					return !1;
				var n = __REACT_DEVTOOLS_GLOBAL_HOOK__;
				if (n.isDisabled || !n.supportsFiber)
					return !0;
				try {
					var t = n.inject(e);
					xs = function (e) {
						try {
							n.onCommitFiberRoot(t, e, void 0, 64 == (64 & e.current.effectTag));
						} catch (e) {
						}
					}
						,
						ks = function (e) {
							try {
								n.onCommitFiberUnmount(t, e);
							} catch (e) {
							}
						};
				} catch (e) {
				}
			}(o({}, Qs, {
				overrideHookState: null,
				overrideProps: null,
				setSuspenseHandler: null,
				scheduleUpdate: null,
				currentDispatcherRef: Y.ReactCurrentDispatcher,
				findHostInstanceByFiber: function (e) {
					return null === (e = tn(e)) ? null : e.stateNode;
				},
				findFiberByHostInstance: function (e) {
					return Gs ? Gs(e) : null;
				},
				findHostInstancesForRefresh: null,
				scheduleRefresh: null,
				scheduleRoot: null,
				setRefreshHandler: null,
				getCurrentFiber: null
			})),
			n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qs,
			n.createPortal = Vs,
			n.findDOMNode = function (e) {
				if (null == e)
					return null;
				if (1 === e.nodeType)
					return e;
				var n = e._reactInternalFiber;
				if (void 0 === n) {
					if ("function" == typeof e.render)
						throw Error(a(188));
					throw Error(a(268, Object.keys(e)));
				}
				return e = null === (e = tn(n)) ? null : e.stateNode;
			}
			,
			n.flushSync = function (e, n) {
				if (0 != (48 & Sc))
					throw Error(a(187));
				var t = Sc;
				Sc |= 1;
				try {
					return Wo(99, e.bind(null, n));
				} finally {
					Sc = t,
						Go();
				}
			}
			,
			n.hydrate = function (e, n, t) {
				if (!Bs(n))
					throw Error(a(200));
				return Hs(null, e, n, !0, t);
			}
			,
			n.render = function (e, n, t) {
				if (!Bs(n))
					throw Error(a(200));
				return Hs(null, e, n, !1, t);
			}
			,
			n.unmountComponentAtNode = function (e) {
				if (!Bs(e))
					throw Error(a(40));
				return !!e._reactRootContainer && (ns((function () {
					Hs(null, null, e, !1, (function () {
						e._reactRootContainer = null,
							e[At] = null;
					}
					));
				}
				)),
					!0);
			}
			,
			n.unstable_batchedUpdates = es,
			n.unstable_createPortal = function (e, n) {
				return Vs(e, n, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
			}
			,
			n.unstable_renderSubtreeIntoContainer = function (e, n, t, r) {
				if (!Bs(t))
					throw Error(a(200));
				if (null == e || void 0 === e._reactInternalFiber)
					throw Error(a(38));
				return Hs(e, n, t, !1, r);
			}
			,
			n.version = "16.14.0";
	}
	, function (e, n, t) {
		"use strict";
		e.exports = t(98);
	}
	, function (e, n, t) {
		"use strict";
		/** @license React v0.19.1
		 * scheduler.production.min.js
		 *
		 * Copyright (c) Facebook, Inc. and its affiliates.
		 *
		 * This source code is licensed under the MIT license found in the
		 * LICENSE file in the root directory of this source tree.
		 */
		var r, o, i, a, c;
		if ("undefined" == typeof window || "function" != typeof MessageChannel) {
			var s = null
				, l = null
				, u = function () {
					if (null !== s)
						try {
							var e = n.unstable_now();
							s(!0, e),
								s = null;
						} catch (e) {
							throw setTimeout(u, 0),
							e;
						}
				}
				, f = Date.now();
			n.unstable_now = function () {
				return Date.now() - f;
			}
				,
				r = function (e) {
					null !== s ? setTimeout(r, 0, e) : (s = e,
						setTimeout(u, 0));
				}
				,
				o = function (e, n) {
					l = setTimeout(e, n);
				}
				,
				i = function () {
					clearTimeout(l);
				}
				,
				a = function () {
					return !1;
				}
				,
				c = n.unstable_forceFrameRate = function () {
				};
		} else {
			var d = window.performance
				, m = window.Date
				, p = window.setTimeout
				, h = window.clearTimeout;
			if ("undefined" != typeof console) {
				var g = window.cancelAnimationFrame;
				"function" != typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),
					"function" != typeof g && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
			}
			if ("object" == typeof d && "function" == typeof d.now)
				n.unstable_now = function () {
					return d.now();
				}
					;
			else {
				var v = m.now();
				n.unstable_now = function () {
					return m.now() - v;
				};
			}
			var b = !1
				, w = null
				, y = -1
				, x = 5
				, k = 0;
			a = function () {
				return n.unstable_now() >= k;
			}
				,
				c = function () {
				}
				,
				n.unstable_forceFrameRate = function (e) {
					0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : x = 0 < e ? Math.floor(1e3 / e) : 5;
				}
				;
			var S = new MessageChannel
				, E = S.port2;
			S.port1.onmessage = function () {
				if (null !== w) {
					var e = n.unstable_now();
					k = e + x;
					try {
						w(!0, e) ? E.postMessage(null) : (b = !1,
							w = null);
					} catch (e) {
						throw E.postMessage(null),
						e;
					}
				} else
					b = !1;
			}
				,
				r = function (e) {
					w = e,
						b || (b = !0,
							E.postMessage(null));
				}
				,
				o = function (e, t) {
					y = p((function () {
						e(n.unstable_now());
					}
					), t);
				}
				,
				i = function () {
					h(y),
						y = -1;
				};
		}

		function C(e, n) {
			var t = e.length;
			e.push(n);
			e: for (; ;) {
				var r = t - 1 >>> 1
					, o = e[r];
				if (!(void 0 !== o && 0 < T(o, n)))
					break e;
				e[r] = n,
					e[t] = o,
					t = r;
			}
		}

		function A(e) {
			return void 0 === (e = e[0]) ? null : e;
		}

		function I(e) {
			var n = e[0];
			if (void 0 !== n) {
				var t = e.pop();
				if (t !== n) {
					e[0] = t;
					e: for (var r = 0, o = e.length; r < o;) {
						var i = 2 * (r + 1) - 1
							, a = e[i]
							, c = i + 1
							, s = e[c];
						if (void 0 !== a && 0 > T(a, t))
							void 0 !== s && 0 > T(s, a) ? (e[r] = s,
								e[c] = t,
								r = c) : (e[r] = a,
									e[i] = t,
									r = i);
						else {
							if (!(void 0 !== s && 0 > T(s, t)))
								break e;
							e[r] = s,
								e[c] = t,
								r = c;
						}
					}
				}
				return n;
			}
			return null;
		}

		function T(e, n) {
			var t = e.sortIndex - n.sortIndex;
			return 0 !== t ? t : e.id - n.id;
		}

		var P = []
			, O = []
			, _ = 1
			, j = null
			, N = 3
			, R = !1
			, L = !1
			, F = !1;

		function M(e) {
			for (var n = A(O); null !== n;) {
				if (null === n.callback)
					I(O);
				else {
					if (!(n.startTime <= e))
						break;
					I(O),
						n.sortIndex = n.expirationTime,
						C(P, n);
				}
				n = A(O);
			}
		}

		function U(e) {
			if (F = !1,
				M(e),
				!L)
				if (null !== A(P))
					L = !0,
						r(D);
				else {
					var n = A(O);
					null !== n && o(U, n.startTime - e);
				}
		}

		function D(e, t) {
			L = !1,
				F && (F = !1,
					i()),
				R = !0;
			var r = N;
			try {
				for (M(t),
					j = A(P); null !== j && (!(j.expirationTime > t) || e && !a());) {
					var c = j.callback;
					if (null !== c) {
						j.callback = null,
							N = j.priorityLevel;
						var s = c(j.expirationTime <= t);
						t = n.unstable_now(),
							"function" == typeof s ? j.callback = s : j === A(P) && I(P),
							M(t);
					} else
						I(P);
					j = A(P);
				}
				if (null !== j)
					var l = !0;
				else {
					var u = A(O);
					null !== u && o(U, u.startTime - t),
						l = !1;
				}
				return l;
			} finally {
				j = null,
					N = r,
					R = !1;
			}
		}

		function z(e) {
			switch (e) {
				case 1:
					return -1;
				case 2:
					return 250;
				case 5:
					return 1073741823;
				case 4:
					return 1e4;
				default:
					return 5e3;
			}
		}

		var B = c;
		n.unstable_IdlePriority = 5,
			n.unstable_ImmediatePriority = 1,
			n.unstable_LowPriority = 4,
			n.unstable_NormalPriority = 3,
			n.unstable_Profiling = null,
			n.unstable_UserBlockingPriority = 2,
			n.unstable_cancelCallback = function (e) {
				e.callback = null;
			}
			,
			n.unstable_continueExecution = function () {
				L || R || (L = !0,
					r(D));
			}
			,
			n.unstable_getCurrentPriorityLevel = function () {
				return N;
			}
			,
			n.unstable_getFirstCallbackNode = function () {
				return A(P);
			}
			,
			n.unstable_next = function (e) {
				switch (N) {
					case 1:
					case 2:
					case 3:
						var n = 3;
						break;
					default:
						n = N;
				}
				var t = N;
				N = n;
				try {
					return e();
				} finally {
					N = t;
				}
			}
			,
			n.unstable_pauseExecution = function () {
			}
			,
			n.unstable_requestPaint = B,
			n.unstable_runWithPriority = function (e, n) {
				switch (e) {
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						break;
					default:
						e = 3;
				}
				var t = N;
				N = e;
				try {
					return n();
				} finally {
					N = t;
				}
			}
			,
			n.unstable_scheduleCallback = function (e, t, a) {
				var c = n.unstable_now();
				if ("object" == typeof a && null !== a) {
					var s = a.delay;
					s = "number" == typeof s && 0 < s ? c + s : c,
						a = "number" == typeof a.timeout ? a.timeout : z(e);
				} else
					a = z(e),
						s = c;
				return e = {
					id: _++,
					callback: t,
					priorityLevel: e,
					startTime: s,
					expirationTime: a = s + a,
					sortIndex: -1
				},
					s > c ? (e.sortIndex = s,
						C(O, e),
						null === A(P) && e === A(O) && (F ? i() : F = !0,
							o(U, s - c))) : (e.sortIndex = a,
								C(P, e),
								L || R || (L = !0,
									r(D))),
					e;
			}
			,
			n.unstable_shouldYield = function () {
				var e = n.unstable_now();
				M(e);
				var t = A(P);
				return t !== j && null !== j && null !== t && null !== t.callback && t.startTime <= e && t.expirationTime < j.expirationTime || a();
			}
			,
			n.unstable_wrapCallback = function (e) {
				var n = N;
				return function () {
					var t = N;
					N = n;
					try {
						return e.apply(this, arguments);
					} finally {
						N = t;
					}
				};
			};
	}
	, function (e, n, t) {
		var r = t(5)
			, o = t(100);
		"string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.i, o, ""]]);
		var i = {
			insert: "head",
			singleton: !1
		};
		r(o, i);
		e.exports = o.locals || {};
	}
	, function (e, n, t) {
		var r = t(6)
			, o = t(53)
			, i = t(101)
			, a = t(102);
		n = r(!1);
		var c = o(i)
			, s = o(a);
		n.push([e.i, "@font-face {\n  font-family: 'icomoon';\n  src: url(" + c + ") format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n[class^='hwsicon-frame-service'],\n[class*=' hwsicon-frame-service'] {\n  line-height: 1;\n}\n[class*=' hwsicon-frame-image'],\n[class*=' hwsicon-frame-service'],\n[class^='hwsicon-frame-image'],\n[class^='hwsicon-frame-service'] {\n  font-family: icomoon;\n  font-style: normal;\n  font-weight: 400;\n  font-variant: normal;\n  text-transform: none;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.tp-icon {\n  font-family: 'tpcloudFont' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.hwsicon-frame-image-floatlayer-default:before {\n  content: '\\e6a4';\n}\n.hwsicon-frame-image-home:before {\n  content: '\\e62b';\n}\n.hwsicon-frame-image-service:before {\n  content: '\\e62c';\n}\n.hwsicon-frame-image-email:before {\n  content: '\\e62d';\n}\n.hwsicon-frame-image-distributor-enter:before {\n  content: '\\e6ab';\n}\n.hwsicon-frame-image-position:before {\n  content: '\\e6ac';\n}\n.hwsicon-frame-image-user-head:before {\n  content: '\\e62e';\n}\n.hwsicon-frame-image-userCenter:before {\n  content: '\\e62f';\n}\n.hwsicon-frame-image-order:before {\n  content: '\\e630';\n}\n.hwsicon-frame-image-application:before {\n  content: '\\e631';\n}\n.hwsicon-frame-image-iam:before {\n  content: '\\e632';\n}\n.hwsicon-frame-image-marketplace:before {\n  content: '\\e62c';\n}\n.hwsicon-frame-image-menu-authCenter:before {\n  content: '\\e632';\n}\n.hwsicon-frame-image-menu-marketplace:before {\n  content: '\\e62c';\n}\n.hwsicon-frame-image-menu-userCenter:before {\n  content: '\\e615';\n}\n.hwsicon-frame-image-dashboard:before {\n  content: '\\e614';\n}\n.hwsicon-frame-image-changeRole:before {\n  content: '\\e633';\n}\n.hwsicon-frame-image-logout:before {\n  content: '\\e634';\n}\n.hwsicon-frame-image-favorite-true:before {\n  content: '\\e63a';\n}\n.hwsicon-frame-image-favorite-false:before {\n  content: '\\e639';\n}\n.hwsicon-frame-image-caret:before {\n  content: '\\e63d';\n}\n.hwsicon-frame-image-regionlist:before {\n  content: '\\e693';\n}\n.hwsicon-frame-image-caret-up:before {\n  content: '\\e63c';\n}\n.hwsicon-frame-image-detail:before {\n  content: '\\e635';\n}\n.hwsicon-frame-image-home-order:before {\n  content: '\\e636';\n}\n.hwsicon-frame-image-businessOrder:before {\n  content: '\\e637';\n}\n.hwsicon-frame-image-active:before {\n  content: '\\e63b';\n}\n.hwsicon-frame-image-help:before {\n  content: '\\e640';\n}\n.hwsicon-frame-image-icpLicence:before {\n  content: '\\e63f';\n}\n.hwsicon-frame-image-robot:before {\n  content: '\\e645';\n}\n.hwsicon-frame-image-help-drop:before {\n  content: '\\e646';\n}\n.hwsicon-frame-image-quota:before {\n  content: '\\e64b';\n}\n.hwsicon-frame-image-shopping-cart:before {\n  content: '\\e64c';\n}\n.hwsicon-frame-image-footer-earth:before {\n  content: '\\e64d';\n}\n.hwsicon-frame-image-hotlinecenter:before {\n  content: '\\e66b';\n}\n.hwsicon-frame-image-pre-page:before {\n  content: '\\e668';\n}\n.hwsicon-frame-image-next-page:before {\n  content: '\\e669';\n}\n.hwsicon-frame-image-msg-delete:before {\n  content: '\\e66a';\n}\n.hwsicon-frame-image-buy:before {\n  content: '\\e638';\n}\n.hwsicon-frame-image-buy-other:before {\n  content: '\\e66c';\n}\n.hwsicon-frame-image-tip:before {\n  content: '\\e66d';\n}\n.hwsicon-frame-image-close:before {\n  content: '\\e66e';\n}\n.hwsicon-frame-image-quota-ocb:before {\n  content: '\\e677';\n}\n.hwsicon-frame-image-tick:before {\n  content: '\\e679';\n}\n.hwsicon-frame-image-feedback:before {\n  content: '\\e67a';\n}\n.hwsicon-frame-image-history:before {\n  content: '\\e67b';\n}\n.hwsicon-frame-image-marketplace_isv:before {\n  content: '\\e687';\n}\n.hwsicon-frame-image-marketplace_tenant:before {\n  content: '\\e688';\n}\n.hwsicon-frame-image-favorite-new:before {\n  content: '\\e68f';\n}\n.hwsicon-frame-image-home-new:before {\n  content: '\\e690';\n}\n.hwsicon-frame-image-list:before {\n  content: '\\e691';\n}\n.hwsicon-frame-image-action-up:before {\n  content: '\\e692';\n}\n.hwsicon-frame-image-action-down:before {\n  content: '\\e693';\n}\n.hwsicon-frame-image-user:before {\n  content: '\\e694';\n}\n.hwsicon-frame-image-message:before {\n  content: '\\e695';\n}\n.hwsicon-frame-image-message-tips:before {\n  content: '\\e6ae';\n}\n.hwsicon-frame-image-tag:before {\n  content: '\\e696';\n}\n.hwsicon-frame-image-help-new:before {\n  content: '\\e697';\n}\n.hwsicon-frame-image-time:before {\n  content: '\\e698';\n}\n.hwsicon-frame-image-setting:before {\n  content: '\\e699';\n}\n.hwsicon-frame-image-search:before {\n  content: '\\e69a';\n}\n.hwsicon-frame-image-advisory:before {\n  content: '\\e69d';\n}\n.hwsicon-frame-image-artificial-service:before {\n  content: '\\e69e';\n}\n.hwsicon-frame-image-cloud-action-cart:before {\n  content: '\\e69f';\n}\n.hwsicon-frame-image-quota-hec:before {\n  content: '\\e6a0';\n}\n.hwsicon-frame-image-intelligent-service:before {\n  content: '\\e6a1';\n}\n.hwsicon-frame-image-pre-sales-advice:before {\n  content: '\\e6a2';\n}\n.hwsicon-frame-image-sticky:before {\n  content: '\\e6a3';\n}\n.hwsicon-frame-image-help-center:before {\n  content: '\\e6a4';\n}\n.hwsicon-frame-image-face-book:before {\n  content: '\\e6a7';\n}\n.hwsicon-frame-image-footer-en-us:before {\n  content: '\\e6a8';\n}\n.hwsicon-frame-image-footer-zh-cn:before {\n  content: '\\e6a9';\n}\n.hwsicon-frame-image-distributor-setting:before {\n  content: '\\e6aa';\n}\n.hwsicon-frame-image-header-point:before {\n  content: '\\e6af';\n}\n.hwsicon-frame-image-ie-browser:before {\n  content: '\\e6b2';\n}\n.hwsicon-frame-image-chrome-browser:before {\n  content: '\\e6b0';\n}\n.hwsicon-frame-image-firefox-browser:before {\n  content: '\\e6b1';\n}\n.hwsicon-frame-service-collection:before {\n  content: '\\e930';\n}\n.hwsicon-frame-service-cancel-collection:before {\n  content: '\\e931';\n}\n.hwsicon-frame-service-help:before {\n  content: '\\e932';\n}\n.hwsicon-frame-service-close-window:before {\n  content: '\\e933';\n}\n.hwsicon-frame-service-location:before {\n  content: '\\e934';\n}\n.hwsicon-frame-service-list:before {\n  content: '\\e935';\n}\n.hwsicon-frame-service-setting:before {\n  content: '\\e936';\n}\n.hwsicon-frame-service-search:before {\n  content: '\\e937';\n}\n.hwsicon-frame-service-message:before {\n  content: '\\e939';\n}\n.hwsicon-frame-service-document:before {\n  content: '\\e93a';\n}\n.hwsicon-frame-service-move:before {\n  content: '\\e93b';\n}\n.hwsicon-frame-service-default:before {\n  content: '\\e901';\n}\n.common-icon-refresh:before {\n  content: '\\e644';\n  font-family: 'icomoon';\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.common-icon-help:before {\n  content: '\\e647';\n  font-family: 'icomoon';\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.cf-icon-status-exception-large-warn:before {\n  content: '\\e66d';\n  color: #ffd939;\n}\n/* cf-icon-status ucd3.0状态图标集合更新于2017-08-03 ***start***/\n@font-face {\n  font-family: 'cfStatusIcomoon';\n  src: url(" + s + ") format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n[class^='cf-icon-status'],\n[class*=' cf-icon-status'] {\n  font-family: 'cfStatusIcomoon';\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.cf-icon-status-avilable:before {\n  content: '\\e400';\n  color: #499df2;\n}\n.cf-icon-status-bind:before {\n  content: '\\e401';\n  color: #499df2;\n}\n.cf-icon-status-success:before {\n  content: '\\e402';\n  color: #3dcaa6;\n}\n.cf-icon-status-building:before {\n  content: '\\e403';\n  color: #3dcaa6;\n}\n.cf-icon-status-warn:before {\n  content: '\\e404';\n  color: #f83;\n  font-size: 16px;\n}\n.cf-icon-status-exception-large:before {\n  content: '\\e405';\n  color: #ffd939;\n}\n.cf-icon-status-fault:before {\n  content: '\\e406';\n  color: #ff4c4c;\n}\n.cf-icon-status-shutdown:before {\n  content: '\\e407';\n  color: #f83;\n}\n.cf-icon-status-specification-change:before {\n  content: '\\e408';\n  color: #499df2;\n}\n.cf-icon-status-error:before {\n  content: '\\e409';\n  color: #ff4c4c;\n}\n.cf-icon-status-error-big:before {\n  content: '\\e40a';\n  color: #ff4c4c;\n}\n.cf-icon-status-prompt:before {\n  content: '\\e40b';\n  color: #499df2;\n}\n.cf-icon-status-stop:before {\n  content: '\\e40c';\n  color: #999;\n}\n.cf-icon-status-unbind:before {\n  content: '\\e40d';\n  color: #499df2;\n}\n.cf-icon-status-unmount:before {\n  content: '\\e40e';\n  color: #499df2;\n}\n.cf-icon-status-star:before {\n  content: '\\e40f';\n  color: #999;\n}\n.cf-icon-status-dormancy:before {\n  content: '\\e410';\n  color: #999;\n}\n.cf-icon-status-mounted:before {\n  content: '\\e411';\n  color: #499df2;\n}\n.cf-icon-status-removed:before {\n  content: '\\e412';\n  color: #ff4c4c;\n}\n.cf-icon-status-exception:before {\n  content: '\\e413';\n  color: #ffd939;\n}\n.cf-icon-status-run:before {\n  content: '\\e414';\n  color: #3dcaa6;\n}\n.cf-icon-status-pause:before {\n  content: '\\e415';\n  color: #f83;\n}\n.cf-icon-status-normal:before {\n  content: '\\e416';\n  color: #3dcaa6;\n}\n.cf-icon-status-rebuild:before {\n  content: '\\e417';\n  color: #3dcaa6;\n}\n.cf-icon-status-reboot:before {\n  content: '\\e418';\n  color: #499df2;\n}\n.cf-icon-status-info:before {\n  content: '\\e40b';\n  color: #499df2;\n}\n.cf-icon-status-exception-large-warn:before {\n  content: '\\e66d';\n  color: #ffd939;\n  font-family: 'icomoon';\n}\n.cf-icon-status-fail-big:before {\n  content: '\\e40a';\n  color: #ff4c4c;\n}\n.hwsicon-frame-image-suggestion_feedback:before {\n  content: '\\e6a5';\n  font-size: 16px;\n}\n.hwsicon-frame-image-consult:before {\n  content: '\\e6a6';\n  font-size: 16px;\n}\n/* cf-icon-status ucd3.0状态图标集合更新于2017-12-25 ***end***/\n.hwsicon-frame-service-antiddos:before {\n  content: '\\e200';\n}\n.hwsicon-frame-service-bigdata:before {\n  content: '\\e201';\n}\n.hwsicon-frame-service-vpn:before {\n  content: '\\e202';\n}\n.hwsicon-frame-service-webscan:before {\n  content: '\\e203';\n}\n.hwsicon-frame-service-waf:before {\n  content: '\\e204';\n}\n/*hwsicon-frame-service-Security*/\n.hwsicon-frame-service-Security:before {\n  content: '\\e205';\n}\n.hwsicon-frame-service-si:before {\n  content: '\\e206';\n}\n.hwsicon-frame-service-codeci2:before {\n  content: '\\e207';\n}\n.hwsicon-frame-service-deployman:before {\n  content: '\\e208';\n}\n.hwsicon-frame-service-testman:before {\n  content: '\\e209';\n}\n/*hwsicon-hwsicon-frame-service-Storage*/\n.hwsicon-frame-service-storage:before {\n  content: '\\e20a';\n}\n.hwsicon-frame-service-codecheck:before {\n  content: '\\e20b';\n}\n.hwsicon-frame-service-elb:before {\n  content: '\\e20c';\n}\n.hwsicon-frame-service-eab:before {\n  content: '\\e20d';\n}\n.hwsicon-frame-service-ess:before {\n  content: '\\e20e';\n}\n.hwsicon-frame-service-sfs:before {\n  content: '\\e20f';\n}\n.hwsicon-frame-service-ecs:before {\n  content: '\\e210';\n}\n.hwsicon-frame-service-obs:before {\n  content: '\\e211';\n}\n.hwsicon-frame-service-molap:before {\n  content: '\\e212';\n}\n.hwsicon-frame-service-releaseman:before {\n  content: '\\e213';\n}\n.hwsicon-frame-service-dcs:before {\n  content: '\\e214';\n}\n.hwsicon-frame-service-dms:before {\n  content: '\\e215';\n}\n.hwsicon-frame-service-rds:before {\n  content: '\\e216';\n}\n.hwsicon-frame-service-hml:before {\n  content: '\\e217';\n}\n/*hwsicon-frame-service-Compute*/\n.hwsicon-frame-service-Compute:before {\n  content: '\\e218';\n}\n.hwsicon-frame-service-ims:before {\n  content: '\\e219';\n}\n.hwsicon-frame-service-cpl:before {\n  content: '\\e21a';\n}\n.hwsicon-frame-service-bms:before {\n  content: '\\e21b';\n}\n.hwsicon-frame-service-kms:before {\n  content: '\\e21c';\n}\n.hwsicon-frame-service-codehub:before {\n  content: '\\e21d';\n}\n.hwsicon-frame-service-maas:before {\n  content: '\\e21e';\n}\n/*渗透测试服务 pts*/\n.hwsicon-frame-service-pts:before {\n  content: '\\e21f';\n}\n.hwsicon-frame-service-tas:before {\n  content: '\\e220';\n}\n.hwsicon-frame-service-dis:before {\n  content: '\\e221';\n}\n.hwsicon-frame-service-des:before {\n  content: '\\e222';\n}\n.hwsicon-frame-service-datacraft:before {\n  content: '\\e223';\n}\n.hwsicon-frame-service-cms:before {\n  content: '\\e224';\n}\n.hwsicon-frame-service-iam:before {\n  content: '\\e225';\n}\n/*hwsicon-frame-service-Network*/\n.hwsicon-frame-service-Network:before {\n  content: '\\e226';\n}\n.hwsicon-frame-service-dds:before {\n  content: '\\e227';\n}\n.hwsicon-frame-service-projectman:before {\n  content: '\\e228';\n}\n.hwsicon-frame-service-smn:before {\n  content: '\\e229';\n}\n.hwsicon-frame-service-vpc:before {\n  content: '\\e22a';\n}\n.hwsicon-frame-service-ces:before {\n  content: '\\e22b';\n}\n.hwsicon-frame-service-dns:before {\n  content: '\\e22c';\n}\n.hwsicon-frame-service-ccs:before {\n  content: '\\e22d';\n}\n.hwsicon-frame-service-cce:before {\n  content: '\\e22e';\n}\n.hwsicon-frame-service-cloudtrace:before {\n  content: '\\e22f';\n}\n.hwsicon-frame-service-cvc:before {\n  content: '\\e230';\n}\n.hwsicon-frame-service-eae:before {\n  content: '\\e231';\n}\n.hwsicon-frame-service-dbs:before {\n  content: '\\e232';\n}\n.hwsicon-frame-service-vbs:before {\n  content: '\\e233';\n}\n.hwsicon-frame-service-directconnect:before {\n  content: '\\e234';\n}\n.hwsicon-frame-service-workspace:before {\n  content: '\\e235';\n}\n.hwsicon-frame-service-scs:before {\n  content: '\\e236';\n}\n/*主机Web应用防火墙*/\n.hwsicon-frame-service-hwaf:before {\n  content: '\\e237';\n}\n/*主机漏洞检测*/\n.hwsicon-frame-service-hva:before {\n  content: '\\e238';\n}\n.hwsicon-frame-service-hid:before {\n  content: '\\e239';\n}\n.hwsicon-frame-service-dec:before {\n  content: '\\e23a';\n}\n.hwsicon-frame-service-deh:before {\n  content: '\\e23b';\n}\n.hwsicon-frame-service-ddm:before {\n  content: '\\e23c';\n}\n.hwsicon-frame-service-qos:before {\n  content: '\\e23d';\n}\n.hwsicon-frame-service-taurus:before {\n  content: '\\e23e';\n}\n.hwsicon-frame-service-ais:before {\n  content: '\\e23f';\n}\n/*数据迁移_CDM*/\n.hwsicon-frame-service-cdm:before {\n  content: '\\e240';\n}\n/*物联网服务控制台-Service Provider Portal*/\n.hwsicon-frame-service-spp:before {\n  content: '\\e241';\n}\n.hwsicon-frame-service-csbs:before {\n  content: '\\e242';\n}\n.hwsicon-frame-service-devcloud:before {\n  content: '\\e243';\n}\n.hwsicon-frame-service-cloudformation:before {\n  content: '\\e244';\n}\n.hwsicon-frame-service-dcc:before {\n  content: '\\e245';\n}\n.hwsicon-frame-service-hbase:before {\n  content: '\\e246';\n}\n.hwsicon-frame-service-stream:before {\n  content: '\\e247';\n}\n.hwsicon-frame-service-das:before {\n  content: '\\e248';\n}\n.hwsicon-frame-service-crs:before {\n  content: '\\e249';\n}\n.hwsicon-frame-service-ars:before {\n  content: '\\e24a';\n}\n.hwsicon-frame-service-ssa:before {\n  content: '\\e24b';\n}\n.hwsicon-frame-service-pcop:before {\n  content: '\\e24c';\n}\n.hwsicon-frame-service-dem:before {\n  content: '\\e24d';\n}\n.hwsicon-frame-service-cvc:before {\n  content: '\\e24e';\n}\n.hwsicon-frame-service-gss:before {\n  content: '\\e24f';\n}\n.hwsicon-frame-service-cdn:before {\n  content: '\\e250';\n}\n.hwsicon-frame-service-dws:before {\n  content: '\\e251';\n}\n.hwsicon-frame-service-csdr:before {\n  content: '\\e252';\n}\n.hwsicon-frame-service-csha:before {\n  content: '\\e253';\n}\n.hwsicon-frame-service-tms:before {\n  content: '\\e254';\n}\n.hwsicon-frame-service-servicestage:before {\n  content: '\\e255';\n}\n.hwsicon-frame-service-MobileTest:before {\n  content: '\\e256';\n}\n.hwsicon-frame-service-iot:before {\n  content: '\\e257';\n}\n.hwsicon-frame-service-CloudIDE:before {\n  content: '\\e258';\n}\n.hwsicon-frame-service-rts:before {\n  content: '\\e259';\n}\n.hwsicon-frame-service-cloudadvisor:before {\n  content: '\\e25a';\n}\n.hwsicon-frame-service-logtank:before {\n  content: '\\e25b';\n}\n.hwsicon-frame-service-Cad:before {\n  content: '\\e25c';\n}\n.hwsicon-frame-service-imsms:before {\n  content: '\\e25d';\n}\n.hwsicon-frame-service-voicecall:before {\n  content: '\\e25e';\n}\n.hwsicon-frame-service-cs:before {\n  content: '\\e25f';\n}\n.hwsicon-frame-service-dbss:before {\n  content: '\\e260';\n}\n.hwsicon-frame-service-nids:before {\n  content: '\\e261';\n}\n.hwsicon-frame-service-uquery:before {\n  content: '\\e262';\n}\n.hwsicon-frame-service-mobilebuilder:before {\n  content: '\\e263';\n}\n.hwsicon-frame-service-datamodelbuilder:before {\n  content: '\\e264';\n}\n.hwsicon-frame-service-assetmarket:before {\n  content: '\\e265';\n}\n.hwsicon-frame-service-ruleengine:before {\n  content: '\\e266';\n}\n.hwsicon-frame-service-workflowengine:before {\n  content: '\\e267';\n}\n.hwsicon-frame-service-servicebuilder:before {\n  content: '\\e268';\n}\n.hwsicon-frame-service-largescreenbuilder:before {\n  content: '\\e269';\n}\n.hwsicon-frame-service-reportbuilder:before {\n  content: '\\e26a';\n}\n.hwsicon-frame-service-webbuilder:before {\n  content: '\\e26b';\n}\n.hwsicon-frame-service-cloudim:before {\n  content: '\\e26c';\n}\n.hwsicon-frame-service-functionstage:before {\n  content: '\\e26d';\n}\n.hwsicon-frame-service-hss:before {\n  content: '\\e26e';\n}\n.hwsicon-frame-service-sas:before {\n  content: '\\e26f';\n}\n.hwsicon-frame-service-dess:before {\n  content: '\\e270';\n}\n.hwsicon-frame-service-cloudtable:before {\n  content: '\\e271';\n}\n.hwsicon-frame-service-fgs:before {\n  content: '\\e272';\n}\n.hwsicon-frame-service-hwebscan:before {\n  content: '\\e273';\n}\n.hwsicon-frame-service-elasticsearch:before {\n  content: '\\e274';\n}\n.hwsicon-frame-service-dls:before {\n  content: '\\e275';\n}\n.hwsicon-frame-service-cse:before {\n  content: '\\e276';\n}\n.hwsicon-frame-service-drs:before {\n  content: '\\e277';\n}\n.hwsicon-frame-service-bill-icon:before {\n  content: '\\e278';\n}\n.hwsicon-frame-service-dss:before {\n  content: '\\e279';\n}\n.hwsicon-frame-service-apig:before {\n  content: '\\e27a';\n}\n.hwsicon-frame-service-apm:before {\n  content: '\\e27b';\n}\n.hwsicon-frame-service-swr:before {\n  content: '\\e27c';\n}\n.hwsicon-frame-service-msgsms:before {\n  content: '\\e27d';\n}\n.hwsicon-frame-service-plas:before {\n  content: '\\e27e';\n}\n.hwsicon-frame-service-privatenumber:before {\n  content: '\\e27f';\n}\n.hwsicon-frame-service-nat:before {\n  content: '\\e280';\n}\n.hwsicon-frame-service-mpc:before {\n  content: '\\e281';\n}\n.hwsicon-frame-service-CPTS:before {\n  content: '\\e282';\n}\n.hwsicon-frame-service-ges:before {\n  content: '\\e283';\n}\n.hwsicon-frame-service-aos:before {\n  content: '\\e284';\n}\n.hwsicon-frame-service-CCI:before {\n  content: '\\e285';\n}\n.hwsicon-frame-service-cce:before {\n  content: '\\e286';\n}\n.hwsicon-frame-service-vod:before {\n  content: '\\e287';\n}\n.hwsicon-frame-service-ccsms:before {\n  content: '\\e288';\n}\n.hwsicon-frame-service-EcsSecurity:before {\n  content: '\\e289';\n}\n.hwsicon-frame-service-eip:before {\n  content: '\\e28a';\n}\n.hwsicon-frame-service-aom:before {\n  content: '\\e28b';\n}\n.hwsicon-frame-service-ers:before {\n  content: '\\e28c';\n}\n.hwsicon-frame-service-res:before {\n  content: '\\e28d';\n}\n.hwsicon-frame-service-bcs:before {\n  content: '\\e28e';\n}\n.open .console-menu-userinfo .hwsicon-frame-image-caret:before {\n  content: '\\e63c';\n}\nhtml,\nbody {\n  height: 100%;\n}\nbody {\n  font-size: 12px;\n  font-family: 'Helvetica', 'Arial', 'PingFangSC-Regular', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'Microsoft JhengHei';\n  color: #252b3a;\n}\nblockquote,\nbody,\ncode,\ndiv,\nfieldset,\nform,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\ninput,\nlegend,\nol,\np,\npre,\ntextarea,\nul {\n  margin: 0;\n  padding: 0;\n}\nol,\nul {\n  list-style: none;\n}\n* {\n  box-sizing: border-box;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: 100%;\n  margin: 0;\n}\nhtml {\n  min-width: 1366px;\n}\nhtml,\nbody {\n  height: 100%;\n}\n.header {\n  font-size: 25px;\n}\n#J_container {\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n  padding-top: 50px;\n  padding-left: 48px;\n  background-color: #eef0f5;\n}\n", ""]),
			n.locals = {
				"tp-icon": "tp-icon",
				tpIcon: "tp-icon",
				"hwsicon-frame-image-floatlayer-default": "hwsicon-frame-image-floatlayer-default",
				hwsiconFrameImageFloatlayerDefault: "hwsicon-frame-image-floatlayer-default",
				"hwsicon-frame-image-home": "hwsicon-frame-image-home",
				hwsiconFrameImageHome: "hwsicon-frame-image-home",
				"hwsicon-frame-image-service": "hwsicon-frame-image-service",
				hwsiconFrameImageService: "hwsicon-frame-image-service",
				"hwsicon-frame-image-email": "hwsicon-frame-image-email",
				hwsiconFrameImageEmail: "hwsicon-frame-image-email",
				"hwsicon-frame-image-distributor-enter": "hwsicon-frame-image-distributor-enter",
				hwsiconFrameImageDistributorEnter: "hwsicon-frame-image-distributor-enter",
				"hwsicon-frame-image-position": "hwsicon-frame-image-position",
				hwsiconFrameImagePosition: "hwsicon-frame-image-position",
				"hwsicon-frame-image-user-head": "hwsicon-frame-image-user-head",
				hwsiconFrameImageUserHead: "hwsicon-frame-image-user-head",
				"hwsicon-frame-image-userCenter": "hwsicon-frame-image-userCenter",
				hwsiconFrameImageUserCenter: "hwsicon-frame-image-userCenter",
				"hwsicon-frame-image-order": "hwsicon-frame-image-order",
				hwsiconFrameImageOrder: "hwsicon-frame-image-order",
				"hwsicon-frame-image-application": "hwsicon-frame-image-application",
				hwsiconFrameImageApplication: "hwsicon-frame-image-application",
				"hwsicon-frame-image-iam": "hwsicon-frame-image-iam",
				hwsiconFrameImageIam: "hwsicon-frame-image-iam",
				"hwsicon-frame-image-marketplace": "hwsicon-frame-image-marketplace",
				hwsiconFrameImageMarketplace: "hwsicon-frame-image-marketplace",
				"hwsicon-frame-image-menu-authCenter": "hwsicon-frame-image-menu-authCenter",
				hwsiconFrameImageMenuAuthCenter: "hwsicon-frame-image-menu-authCenter",
				"hwsicon-frame-image-menu-marketplace": "hwsicon-frame-image-menu-marketplace",
				hwsiconFrameImageMenuMarketplace: "hwsicon-frame-image-menu-marketplace",
				"hwsicon-frame-image-menu-userCenter": "hwsicon-frame-image-menu-userCenter",
				hwsiconFrameImageMenuUserCenter: "hwsicon-frame-image-menu-userCenter",
				"hwsicon-frame-image-dashboard": "hwsicon-frame-image-dashboard",
				hwsiconFrameImageDashboard: "hwsicon-frame-image-dashboard",
				"hwsicon-frame-image-changeRole": "hwsicon-frame-image-changeRole",
				hwsiconFrameImageChangeRole: "hwsicon-frame-image-changeRole",
				"hwsicon-frame-image-logout": "hwsicon-frame-image-logout",
				hwsiconFrameImageLogout: "hwsicon-frame-image-logout",
				"hwsicon-frame-image-favorite-true": "hwsicon-frame-image-favorite-true",
				hwsiconFrameImageFavoriteTrue: "hwsicon-frame-image-favorite-true",
				"hwsicon-frame-image-favorite-false": "hwsicon-frame-image-favorite-false",
				hwsiconFrameImageFavoriteFalse: "hwsicon-frame-image-favorite-false",
				"hwsicon-frame-image-caret": "hwsicon-frame-image-caret",
				hwsiconFrameImageCaret: "hwsicon-frame-image-caret",
				"hwsicon-frame-image-regionlist": "hwsicon-frame-image-regionlist",
				hwsiconFrameImageRegionlist: "hwsicon-frame-image-regionlist",
				"hwsicon-frame-image-caret-up": "hwsicon-frame-image-caret-up",
				hwsiconFrameImageCaretUp: "hwsicon-frame-image-caret-up",
				"hwsicon-frame-image-detail": "hwsicon-frame-image-detail",
				hwsiconFrameImageDetail: "hwsicon-frame-image-detail",
				"hwsicon-frame-image-home-order": "hwsicon-frame-image-home-order",
				hwsiconFrameImageHomeOrder: "hwsicon-frame-image-home-order",
				"hwsicon-frame-image-businessOrder": "hwsicon-frame-image-businessOrder",
				hwsiconFrameImageBusinessOrder: "hwsicon-frame-image-businessOrder",
				"hwsicon-frame-image-active": "hwsicon-frame-image-active",
				hwsiconFrameImageActive: "hwsicon-frame-image-active",
				"hwsicon-frame-image-help": "hwsicon-frame-image-help",
				hwsiconFrameImageHelp: "hwsicon-frame-image-help",
				"hwsicon-frame-image-icpLicence": "hwsicon-frame-image-icpLicence",
				hwsiconFrameImageIcpLicence: "hwsicon-frame-image-icpLicence",
				"hwsicon-frame-image-robot": "hwsicon-frame-image-robot",
				hwsiconFrameImageRobot: "hwsicon-frame-image-robot",
				"hwsicon-frame-image-help-drop": "hwsicon-frame-image-help-drop",
				hwsiconFrameImageHelpDrop: "hwsicon-frame-image-help-drop",
				"hwsicon-frame-image-quota": "hwsicon-frame-image-quota",
				hwsiconFrameImageQuota: "hwsicon-frame-image-quota",
				"hwsicon-frame-image-shopping-cart": "hwsicon-frame-image-shopping-cart",
				hwsiconFrameImageShoppingCart: "hwsicon-frame-image-shopping-cart",
				"hwsicon-frame-image-footer-earth": "hwsicon-frame-image-footer-earth",
				hwsiconFrameImageFooterEarth: "hwsicon-frame-image-footer-earth",
				"hwsicon-frame-image-hotlinecenter": "hwsicon-frame-image-hotlinecenter",
				hwsiconFrameImageHotlinecenter: "hwsicon-frame-image-hotlinecenter",
				"hwsicon-frame-image-pre-page": "hwsicon-frame-image-pre-page",
				hwsiconFrameImagePrePage: "hwsicon-frame-image-pre-page",
				"hwsicon-frame-image-next-page": "hwsicon-frame-image-next-page",
				hwsiconFrameImageNextPage: "hwsicon-frame-image-next-page",
				"hwsicon-frame-image-msg-delete": "hwsicon-frame-image-msg-delete",
				hwsiconFrameImageMsgDelete: "hwsicon-frame-image-msg-delete",
				"hwsicon-frame-image-buy": "hwsicon-frame-image-buy",
				hwsiconFrameImageBuy: "hwsicon-frame-image-buy",
				"hwsicon-frame-image-buy-other": "hwsicon-frame-image-buy-other",
				hwsiconFrameImageBuyOther: "hwsicon-frame-image-buy-other",
				"hwsicon-frame-image-tip": "hwsicon-frame-image-tip",
				hwsiconFrameImageTip: "hwsicon-frame-image-tip",
				"hwsicon-frame-image-close": "hwsicon-frame-image-close",
				hwsiconFrameImageClose: "hwsicon-frame-image-close",
				"hwsicon-frame-image-quota-ocb": "hwsicon-frame-image-quota-ocb",
				hwsiconFrameImageQuotaOcb: "hwsicon-frame-image-quota-ocb",
				"hwsicon-frame-image-tick": "hwsicon-frame-image-tick",
				hwsiconFrameImageTick: "hwsicon-frame-image-tick",
				"hwsicon-frame-image-feedback": "hwsicon-frame-image-feedback",
				hwsiconFrameImageFeedback: "hwsicon-frame-image-feedback",
				"hwsicon-frame-image-history": "hwsicon-frame-image-history",
				hwsiconFrameImageHistory: "hwsicon-frame-image-history",
				"hwsicon-frame-image-marketplace_isv": "hwsicon-frame-image-marketplace_isv",
				hwsiconFrameImageMarketplaceIsv: "hwsicon-frame-image-marketplace_isv",
				"hwsicon-frame-image-marketplace_tenant": "hwsicon-frame-image-marketplace_tenant",
				hwsiconFrameImageMarketplaceTenant: "hwsicon-frame-image-marketplace_tenant",
				"hwsicon-frame-image-favorite-new": "hwsicon-frame-image-favorite-new",
				hwsiconFrameImageFavoriteNew: "hwsicon-frame-image-favorite-new",
				"hwsicon-frame-image-home-new": "hwsicon-frame-image-home-new",
				hwsiconFrameImageHomeNew: "hwsicon-frame-image-home-new",
				"hwsicon-frame-image-list": "hwsicon-frame-image-list",
				hwsiconFrameImageList: "hwsicon-frame-image-list",
				"hwsicon-frame-image-action-up": "hwsicon-frame-image-action-up",
				hwsiconFrameImageActionUp: "hwsicon-frame-image-action-up",
				"hwsicon-frame-image-action-down": "hwsicon-frame-image-action-down",
				hwsiconFrameImageActionDown: "hwsicon-frame-image-action-down",
				"hwsicon-frame-image-user": "hwsicon-frame-image-user",
				hwsiconFrameImageUser: "hwsicon-frame-image-user",
				"hwsicon-frame-image-message": "hwsicon-frame-image-message",
				hwsiconFrameImageMessage: "hwsicon-frame-image-message",
				"hwsicon-frame-image-message-tips": "hwsicon-frame-image-message-tips",
				hwsiconFrameImageMessageTips: "hwsicon-frame-image-message-tips",
				"hwsicon-frame-image-tag": "hwsicon-frame-image-tag",
				hwsiconFrameImageTag: "hwsicon-frame-image-tag",
				"hwsicon-frame-image-help-new": "hwsicon-frame-image-help-new",
				hwsiconFrameImageHelpNew: "hwsicon-frame-image-help-new",
				"hwsicon-frame-image-time": "hwsicon-frame-image-time",
				hwsiconFrameImageTime: "hwsicon-frame-image-time",
				"hwsicon-frame-image-setting": "hwsicon-frame-image-setting",
				hwsiconFrameImageSetting: "hwsicon-frame-image-setting",
				"hwsicon-frame-image-search": "hwsicon-frame-image-search",
				hwsiconFrameImageSearch: "hwsicon-frame-image-search",
				"hwsicon-frame-image-advisory": "hwsicon-frame-image-advisory",
				hwsiconFrameImageAdvisory: "hwsicon-frame-image-advisory",
				"hwsicon-frame-image-artificial-service": "hwsicon-frame-image-artificial-service",
				hwsiconFrameImageArtificialService: "hwsicon-frame-image-artificial-service",
				"hwsicon-frame-image-cloud-action-cart": "hwsicon-frame-image-cloud-action-cart",
				hwsiconFrameImageCloudActionCart: "hwsicon-frame-image-cloud-action-cart",
				"hwsicon-frame-image-quota-hec": "hwsicon-frame-image-quota-hec",
				hwsiconFrameImageQuotaHec: "hwsicon-frame-image-quota-hec",
				"hwsicon-frame-image-intelligent-service": "hwsicon-frame-image-intelligent-service",
				hwsiconFrameImageIntelligentService: "hwsicon-frame-image-intelligent-service",
				"hwsicon-frame-image-pre-sales-advice": "hwsicon-frame-image-pre-sales-advice",
				hwsiconFrameImagePreSalesAdvice: "hwsicon-frame-image-pre-sales-advice",
				"hwsicon-frame-image-sticky": "hwsicon-frame-image-sticky",
				hwsiconFrameImageSticky: "hwsicon-frame-image-sticky",
				"hwsicon-frame-image-help-center": "hwsicon-frame-image-help-center",
				hwsiconFrameImageHelpCenter: "hwsicon-frame-image-help-center",
				"hwsicon-frame-image-face-book": "hwsicon-frame-image-face-book",
				hwsiconFrameImageFaceBook: "hwsicon-frame-image-face-book",
				"hwsicon-frame-image-footer-en-us": "hwsicon-frame-image-footer-en-us",
				hwsiconFrameImageFooterEnUs: "hwsicon-frame-image-footer-en-us",
				"hwsicon-frame-image-footer-zh-cn": "hwsicon-frame-image-footer-zh-cn",
				hwsiconFrameImageFooterZhCn: "hwsicon-frame-image-footer-zh-cn",
				"hwsicon-frame-image-distributor-setting": "hwsicon-frame-image-distributor-setting",
				hwsiconFrameImageDistributorSetting: "hwsicon-frame-image-distributor-setting",
				"hwsicon-frame-image-header-point": "hwsicon-frame-image-header-point",
				hwsiconFrameImageHeaderPoint: "hwsicon-frame-image-header-point",
				"hwsicon-frame-image-ie-browser": "hwsicon-frame-image-ie-browser",
				hwsiconFrameImageIeBrowser: "hwsicon-frame-image-ie-browser",
				"hwsicon-frame-image-chrome-browser": "hwsicon-frame-image-chrome-browser",
				hwsiconFrameImageChromeBrowser: "hwsicon-frame-image-chrome-browser",
				"hwsicon-frame-image-firefox-browser": "hwsicon-frame-image-firefox-browser",
				hwsiconFrameImageFirefoxBrowser: "hwsicon-frame-image-firefox-browser",
				"hwsicon-frame-service-collection": "hwsicon-frame-service-collection",
				hwsiconFrameServiceCollection: "hwsicon-frame-service-collection",
				"hwsicon-frame-service-cancel-collection": "hwsicon-frame-service-cancel-collection",
				hwsiconFrameServiceCancelCollection: "hwsicon-frame-service-cancel-collection",
				"hwsicon-frame-service-help": "hwsicon-frame-service-help",
				hwsiconFrameServiceHelp: "hwsicon-frame-service-help",
				"hwsicon-frame-service-close-window": "hwsicon-frame-service-close-window",
				hwsiconFrameServiceCloseWindow: "hwsicon-frame-service-close-window",
				"hwsicon-frame-service-location": "hwsicon-frame-service-location",
				hwsiconFrameServiceLocation: "hwsicon-frame-service-location",
				"hwsicon-frame-service-list": "hwsicon-frame-service-list",
				hwsiconFrameServiceList: "hwsicon-frame-service-list",
				"hwsicon-frame-service-setting": "hwsicon-frame-service-setting",
				hwsiconFrameServiceSetting: "hwsicon-frame-service-setting",
				"hwsicon-frame-service-search": "hwsicon-frame-service-search",
				hwsiconFrameServiceSearch: "hwsicon-frame-service-search",
				"hwsicon-frame-service-message": "hwsicon-frame-service-message",
				hwsiconFrameServiceMessage: "hwsicon-frame-service-message",
				"hwsicon-frame-service-document": "hwsicon-frame-service-document",
				hwsiconFrameServiceDocument: "hwsicon-frame-service-document",
				"hwsicon-frame-service-move": "hwsicon-frame-service-move",
				hwsiconFrameServiceMove: "hwsicon-frame-service-move",
				"hwsicon-frame-service-default": "hwsicon-frame-service-default",
				hwsiconFrameServiceDefault: "hwsicon-frame-service-default",
				"common-icon-refresh": "common-icon-refresh",
				commonIconRefresh: "common-icon-refresh",
				"common-icon-help": "common-icon-help",
				commonIconHelp: "common-icon-help",
				"cf-icon-status-exception-large-warn": "cf-icon-status-exception-large-warn",
				cfIconStatusExceptionLargeWarn: "cf-icon-status-exception-large-warn",
				"cf-icon-status-avilable": "cf-icon-status-avilable",
				cfIconStatusAvilable: "cf-icon-status-avilable",
				"cf-icon-status-bind": "cf-icon-status-bind",
				cfIconStatusBind: "cf-icon-status-bind",
				"cf-icon-status-success": "cf-icon-status-success",
				cfIconStatusSuccess: "cf-icon-status-success",
				"cf-icon-status-building": "cf-icon-status-building",
				cfIconStatusBuilding: "cf-icon-status-building",
				"cf-icon-status-warn": "cf-icon-status-warn",
				cfIconStatusWarn: "cf-icon-status-warn",
				"cf-icon-status-exception-large": "cf-icon-status-exception-large",
				cfIconStatusExceptionLarge: "cf-icon-status-exception-large",
				"cf-icon-status-fault": "cf-icon-status-fault",
				cfIconStatusFault: "cf-icon-status-fault",
				"cf-icon-status-shutdown": "cf-icon-status-shutdown",
				cfIconStatusShutdown: "cf-icon-status-shutdown",
				"cf-icon-status-specification-change": "cf-icon-status-specification-change",
				cfIconStatusSpecificationChange: "cf-icon-status-specification-change",
				"cf-icon-status-error": "cf-icon-status-error",
				cfIconStatusError: "cf-icon-status-error",
				"cf-icon-status-error-big": "cf-icon-status-error-big",
				cfIconStatusErrorBig: "cf-icon-status-error-big",
				"cf-icon-status-prompt": "cf-icon-status-prompt",
				cfIconStatusPrompt: "cf-icon-status-prompt",
				"cf-icon-status-stop": "cf-icon-status-stop",
				cfIconStatusStop: "cf-icon-status-stop",
				"cf-icon-status-unbind": "cf-icon-status-unbind",
				cfIconStatusUnbind: "cf-icon-status-unbind",
				"cf-icon-status-unmount": "cf-icon-status-unmount",
				cfIconStatusUnmount: "cf-icon-status-unmount",
				"cf-icon-status-star": "cf-icon-status-star",
				cfIconStatusStar: "cf-icon-status-star",
				"cf-icon-status-dormancy": "cf-icon-status-dormancy",
				cfIconStatusDormancy: "cf-icon-status-dormancy",
				"cf-icon-status-mounted": "cf-icon-status-mounted",
				cfIconStatusMounted: "cf-icon-status-mounted",
				"cf-icon-status-removed": "cf-icon-status-removed",
				cfIconStatusRemoved: "cf-icon-status-removed",
				"cf-icon-status-exception": "cf-icon-status-exception",
				cfIconStatusException: "cf-icon-status-exception",
				"cf-icon-status-run": "cf-icon-status-run",
				cfIconStatusRun: "cf-icon-status-run",
				"cf-icon-status-pause": "cf-icon-status-pause",
				cfIconStatusPause: "cf-icon-status-pause",
				"cf-icon-status-normal": "cf-icon-status-normal",
				cfIconStatusNormal: "cf-icon-status-normal",
				"cf-icon-status-rebuild": "cf-icon-status-rebuild",
				cfIconStatusRebuild: "cf-icon-status-rebuild",
				"cf-icon-status-reboot": "cf-icon-status-reboot",
				cfIconStatusReboot: "cf-icon-status-reboot",
				"cf-icon-status-info": "cf-icon-status-info",
				cfIconStatusInfo: "cf-icon-status-info",
				"cf-icon-status-fail-big": "cf-icon-status-fail-big",
				cfIconStatusFailBig: "cf-icon-status-fail-big",
				"hwsicon-frame-image-suggestion_feedback": "hwsicon-frame-image-suggestion_feedback",
				hwsiconFrameImageSuggestionFeedback: "hwsicon-frame-image-suggestion_feedback",
				"hwsicon-frame-image-consult": "hwsicon-frame-image-consult",
				hwsiconFrameImageConsult: "hwsicon-frame-image-consult",
				"hwsicon-frame-service-antiddos": "hwsicon-frame-service-antiddos",
				hwsiconFrameServiceAntiddos: "hwsicon-frame-service-antiddos",
				"hwsicon-frame-service-bigdata": "hwsicon-frame-service-bigdata",
				hwsiconFrameServiceBigdata: "hwsicon-frame-service-bigdata",
				"hwsicon-frame-service-vpn": "hwsicon-frame-service-vpn",
				hwsiconFrameServiceVpn: "hwsicon-frame-service-vpn",
				"hwsicon-frame-service-webscan": "hwsicon-frame-service-webscan",
				hwsiconFrameServiceWebscan: "hwsicon-frame-service-webscan",
				"hwsicon-frame-service-waf": "hwsicon-frame-service-waf",
				hwsiconFrameServiceWaf: "hwsicon-frame-service-waf",
				"hwsicon-frame-service-Security": "hwsicon-frame-service-Security",
				hwsiconFrameServiceSecurity: "hwsicon-frame-service-Security",
				"hwsicon-frame-service-si": "hwsicon-frame-service-si",
				hwsiconFrameServiceSi: "hwsicon-frame-service-si",
				"hwsicon-frame-service-codeci2": "hwsicon-frame-service-codeci2",
				hwsiconFrameServiceCodeci2: "hwsicon-frame-service-codeci2",
				"hwsicon-frame-service-deployman": "hwsicon-frame-service-deployman",
				hwsiconFrameServiceDeployman: "hwsicon-frame-service-deployman",
				"hwsicon-frame-service-testman": "hwsicon-frame-service-testman",
				hwsiconFrameServiceTestman: "hwsicon-frame-service-testman",
				"hwsicon-frame-service-storage": "hwsicon-frame-service-storage",
				hwsiconFrameServiceStorage: "hwsicon-frame-service-storage",
				"hwsicon-frame-service-codecheck": "hwsicon-frame-service-codecheck",
				hwsiconFrameServiceCodecheck: "hwsicon-frame-service-codecheck",
				"hwsicon-frame-service-elb": "hwsicon-frame-service-elb",
				hwsiconFrameServiceElb: "hwsicon-frame-service-elb",
				"hwsicon-frame-service-eab": "hwsicon-frame-service-eab",
				hwsiconFrameServiceEab: "hwsicon-frame-service-eab",
				"hwsicon-frame-service-ess": "hwsicon-frame-service-ess",
				hwsiconFrameServiceEss: "hwsicon-frame-service-ess",
				"hwsicon-frame-service-sfs": "hwsicon-frame-service-sfs",
				hwsiconFrameServiceSfs: "hwsicon-frame-service-sfs",
				"hwsicon-frame-service-ecs": "hwsicon-frame-service-ecs",
				hwsiconFrameServiceEcs: "hwsicon-frame-service-ecs",
				"hwsicon-frame-service-obs": "hwsicon-frame-service-obs",
				hwsiconFrameServiceObs: "hwsicon-frame-service-obs",
				"hwsicon-frame-service-molap": "hwsicon-frame-service-molap",
				hwsiconFrameServiceMolap: "hwsicon-frame-service-molap",
				"hwsicon-frame-service-releaseman": "hwsicon-frame-service-releaseman",
				hwsiconFrameServiceReleaseman: "hwsicon-frame-service-releaseman",
				"hwsicon-frame-service-dcs": "hwsicon-frame-service-dcs",
				hwsiconFrameServiceDcs: "hwsicon-frame-service-dcs",
				"hwsicon-frame-service-dms": "hwsicon-frame-service-dms",
				hwsiconFrameServiceDms: "hwsicon-frame-service-dms",
				"hwsicon-frame-service-rds": "hwsicon-frame-service-rds",
				hwsiconFrameServiceRds: "hwsicon-frame-service-rds",
				"hwsicon-frame-service-hml": "hwsicon-frame-service-hml",
				hwsiconFrameServiceHml: "hwsicon-frame-service-hml",
				"hwsicon-frame-service-Compute": "hwsicon-frame-service-Compute",
				hwsiconFrameServiceCompute: "hwsicon-frame-service-Compute",
				"hwsicon-frame-service-ims": "hwsicon-frame-service-ims",
				hwsiconFrameServiceIms: "hwsicon-frame-service-ims",
				"hwsicon-frame-service-cpl": "hwsicon-frame-service-cpl",
				hwsiconFrameServiceCpl: "hwsicon-frame-service-cpl",
				"hwsicon-frame-service-bms": "hwsicon-frame-service-bms",
				hwsiconFrameServiceBms: "hwsicon-frame-service-bms",
				"hwsicon-frame-service-kms": "hwsicon-frame-service-kms",
				hwsiconFrameServiceKms: "hwsicon-frame-service-kms",
				"hwsicon-frame-service-codehub": "hwsicon-frame-service-codehub",
				hwsiconFrameServiceCodehub: "hwsicon-frame-service-codehub",
				"hwsicon-frame-service-maas": "hwsicon-frame-service-maas",
				hwsiconFrameServiceMaas: "hwsicon-frame-service-maas",
				"hwsicon-frame-service-pts": "hwsicon-frame-service-pts",
				hwsiconFrameServicePts: "hwsicon-frame-service-pts",
				"hwsicon-frame-service-tas": "hwsicon-frame-service-tas",
				hwsiconFrameServiceTas: "hwsicon-frame-service-tas",
				"hwsicon-frame-service-dis": "hwsicon-frame-service-dis",
				hwsiconFrameServiceDis: "hwsicon-frame-service-dis",
				"hwsicon-frame-service-des": "hwsicon-frame-service-des",
				hwsiconFrameServiceDes: "hwsicon-frame-service-des",
				"hwsicon-frame-service-datacraft": "hwsicon-frame-service-datacraft",
				hwsiconFrameServiceDatacraft: "hwsicon-frame-service-datacraft",
				"hwsicon-frame-service-cms": "hwsicon-frame-service-cms",
				hwsiconFrameServiceCms: "hwsicon-frame-service-cms",
				"hwsicon-frame-service-iam": "hwsicon-frame-service-iam",
				hwsiconFrameServiceIam: "hwsicon-frame-service-iam",
				"hwsicon-frame-service-Network": "hwsicon-frame-service-Network",
				hwsiconFrameServiceNetwork: "hwsicon-frame-service-Network",
				"hwsicon-frame-service-dds": "hwsicon-frame-service-dds",
				hwsiconFrameServiceDds: "hwsicon-frame-service-dds",
				"hwsicon-frame-service-projectman": "hwsicon-frame-service-projectman",
				hwsiconFrameServiceProjectman: "hwsicon-frame-service-projectman",
				"hwsicon-frame-service-smn": "hwsicon-frame-service-smn",
				hwsiconFrameServiceSmn: "hwsicon-frame-service-smn",
				"hwsicon-frame-service-vpc": "hwsicon-frame-service-vpc",
				hwsiconFrameServiceVpc: "hwsicon-frame-service-vpc",
				"hwsicon-frame-service-ces": "hwsicon-frame-service-ces",
				hwsiconFrameServiceCes: "hwsicon-frame-service-ces",
				"hwsicon-frame-service-dns": "hwsicon-frame-service-dns",
				hwsiconFrameServiceDns: "hwsicon-frame-service-dns",
				"hwsicon-frame-service-ccs": "hwsicon-frame-service-ccs",
				hwsiconFrameServiceCcs: "hwsicon-frame-service-ccs",
				"hwsicon-frame-service-cce": "hwsicon-frame-service-cce",
				hwsiconFrameServiceCce: "hwsicon-frame-service-cce",
				"hwsicon-frame-service-cloudtrace": "hwsicon-frame-service-cloudtrace",
				hwsiconFrameServiceCloudtrace: "hwsicon-frame-service-cloudtrace",
				"hwsicon-frame-service-cvc": "hwsicon-frame-service-cvc",
				hwsiconFrameServiceCvc: "hwsicon-frame-service-cvc",
				"hwsicon-frame-service-eae": "hwsicon-frame-service-eae",
				hwsiconFrameServiceEae: "hwsicon-frame-service-eae",
				"hwsicon-frame-service-dbs": "hwsicon-frame-service-dbs",
				hwsiconFrameServiceDbs: "hwsicon-frame-service-dbs",
				"hwsicon-frame-service-vbs": "hwsicon-frame-service-vbs",
				hwsiconFrameServiceVbs: "hwsicon-frame-service-vbs",
				"hwsicon-frame-service-directconnect": "hwsicon-frame-service-directconnect",
				hwsiconFrameServiceDirectconnect: "hwsicon-frame-service-directconnect",
				"hwsicon-frame-service-workspace": "hwsicon-frame-service-workspace",
				hwsiconFrameServiceWorkspace: "hwsicon-frame-service-workspace",
				"hwsicon-frame-service-scs": "hwsicon-frame-service-scs",
				hwsiconFrameServiceScs: "hwsicon-frame-service-scs",
				"hwsicon-frame-service-hwaf": "hwsicon-frame-service-hwaf",
				hwsiconFrameServiceHwaf: "hwsicon-frame-service-hwaf",
				"hwsicon-frame-service-hva": "hwsicon-frame-service-hva",
				hwsiconFrameServiceHva: "hwsicon-frame-service-hva",
				"hwsicon-frame-service-hid": "hwsicon-frame-service-hid",
				hwsiconFrameServiceHid: "hwsicon-frame-service-hid",
				"hwsicon-frame-service-dec": "hwsicon-frame-service-dec",
				hwsiconFrameServiceDec: "hwsicon-frame-service-dec",
				"hwsicon-frame-service-deh": "hwsicon-frame-service-deh",
				hwsiconFrameServiceDeh: "hwsicon-frame-service-deh",
				"hwsicon-frame-service-ddm": "hwsicon-frame-service-ddm",
				hwsiconFrameServiceDdm: "hwsicon-frame-service-ddm",
				"hwsicon-frame-service-qos": "hwsicon-frame-service-qos",
				hwsiconFrameServiceQos: "hwsicon-frame-service-qos",
				"hwsicon-frame-service-taurus": "hwsicon-frame-service-taurus",
				hwsiconFrameServiceTaurus: "hwsicon-frame-service-taurus",
				"hwsicon-frame-service-ais": "hwsicon-frame-service-ais",
				hwsiconFrameServiceAis: "hwsicon-frame-service-ais",
				"hwsicon-frame-service-cdm": "hwsicon-frame-service-cdm",
				hwsiconFrameServiceCdm: "hwsicon-frame-service-cdm",
				"hwsicon-frame-service-spp": "hwsicon-frame-service-spp",
				hwsiconFrameServiceSpp: "hwsicon-frame-service-spp",
				"hwsicon-frame-service-csbs": "hwsicon-frame-service-csbs",
				hwsiconFrameServiceCsbs: "hwsicon-frame-service-csbs",
				"hwsicon-frame-service-devcloud": "hwsicon-frame-service-devcloud",
				hwsiconFrameServiceDevcloud: "hwsicon-frame-service-devcloud",
				"hwsicon-frame-service-cloudformation": "hwsicon-frame-service-cloudformation",
				hwsiconFrameServiceCloudformation: "hwsicon-frame-service-cloudformation",
				"hwsicon-frame-service-dcc": "hwsicon-frame-service-dcc",
				hwsiconFrameServiceDcc: "hwsicon-frame-service-dcc",
				"hwsicon-frame-service-hbase": "hwsicon-frame-service-hbase",
				hwsiconFrameServiceHbase: "hwsicon-frame-service-hbase",
				"hwsicon-frame-service-stream": "hwsicon-frame-service-stream",
				hwsiconFrameServiceStream: "hwsicon-frame-service-stream",
				"hwsicon-frame-service-das": "hwsicon-frame-service-das",
				hwsiconFrameServiceDas: "hwsicon-frame-service-das",
				"hwsicon-frame-service-crs": "hwsicon-frame-service-crs",
				hwsiconFrameServiceCrs: "hwsicon-frame-service-crs",
				"hwsicon-frame-service-ars": "hwsicon-frame-service-ars",
				hwsiconFrameServiceArs: "hwsicon-frame-service-ars",
				"hwsicon-frame-service-ssa": "hwsicon-frame-service-ssa",
				hwsiconFrameServiceSsa: "hwsicon-frame-service-ssa",
				"hwsicon-frame-service-pcop": "hwsicon-frame-service-pcop",
				hwsiconFrameServicePcop: "hwsicon-frame-service-pcop",
				"hwsicon-frame-service-dem": "hwsicon-frame-service-dem",
				hwsiconFrameServiceDem: "hwsicon-frame-service-dem",
				"hwsicon-frame-service-gss": "hwsicon-frame-service-gss",
				hwsiconFrameServiceGss: "hwsicon-frame-service-gss",
				"hwsicon-frame-service-cdn": "hwsicon-frame-service-cdn",
				hwsiconFrameServiceCdn: "hwsicon-frame-service-cdn",
				"hwsicon-frame-service-dws": "hwsicon-frame-service-dws",
				hwsiconFrameServiceDws: "hwsicon-frame-service-dws",
				"hwsicon-frame-service-csdr": "hwsicon-frame-service-csdr",
				hwsiconFrameServiceCsdr: "hwsicon-frame-service-csdr",
				"hwsicon-frame-service-csha": "hwsicon-frame-service-csha",
				hwsiconFrameServiceCsha: "hwsicon-frame-service-csha",
				"hwsicon-frame-service-tms": "hwsicon-frame-service-tms",
				hwsiconFrameServiceTms: "hwsicon-frame-service-tms",
				"hwsicon-frame-service-servicestage": "hwsicon-frame-service-servicestage",
				hwsiconFrameServiceServicestage: "hwsicon-frame-service-servicestage",
				"hwsicon-frame-service-MobileTest": "hwsicon-frame-service-MobileTest",
				hwsiconFrameServiceMobileTest: "hwsicon-frame-service-MobileTest",
				"hwsicon-frame-service-iot": "hwsicon-frame-service-iot",
				hwsiconFrameServiceIot: "hwsicon-frame-service-iot",
				"hwsicon-frame-service-CloudIDE": "hwsicon-frame-service-CloudIDE",
				hwsiconFrameServiceCloudIde: "hwsicon-frame-service-CloudIDE",
				"hwsicon-frame-service-rts": "hwsicon-frame-service-rts",
				hwsiconFrameServiceRts: "hwsicon-frame-service-rts",
				"hwsicon-frame-service-cloudadvisor": "hwsicon-frame-service-cloudadvisor",
				hwsiconFrameServiceCloudadvisor: "hwsicon-frame-service-cloudadvisor",
				"hwsicon-frame-service-logtank": "hwsicon-frame-service-logtank",
				hwsiconFrameServiceLogtank: "hwsicon-frame-service-logtank",
				"hwsicon-frame-service-Cad": "hwsicon-frame-service-Cad",
				hwsiconFrameServiceCad: "hwsicon-frame-service-Cad",
				"hwsicon-frame-service-imsms": "hwsicon-frame-service-imsms",
				hwsiconFrameServiceImsms: "hwsicon-frame-service-imsms",
				"hwsicon-frame-service-voicecall": "hwsicon-frame-service-voicecall",
				hwsiconFrameServiceVoicecall: "hwsicon-frame-service-voicecall",
				"hwsicon-frame-service-cs": "hwsicon-frame-service-cs",
				hwsiconFrameServiceCs: "hwsicon-frame-service-cs",
				"hwsicon-frame-service-dbss": "hwsicon-frame-service-dbss",
				hwsiconFrameServiceDbss: "hwsicon-frame-service-dbss",
				"hwsicon-frame-service-nids": "hwsicon-frame-service-nids",
				hwsiconFrameServiceNids: "hwsicon-frame-service-nids",
				"hwsicon-frame-service-uquery": "hwsicon-frame-service-uquery",
				hwsiconFrameServiceUquery: "hwsicon-frame-service-uquery",
				"hwsicon-frame-service-mobilebuilder": "hwsicon-frame-service-mobilebuilder",
				hwsiconFrameServiceMobilebuilder: "hwsicon-frame-service-mobilebuilder",
				"hwsicon-frame-service-datamodelbuilder": "hwsicon-frame-service-datamodelbuilder",
				hwsiconFrameServiceDatamodelbuilder: "hwsicon-frame-service-datamodelbuilder",
				"hwsicon-frame-service-assetmarket": "hwsicon-frame-service-assetmarket",
				hwsiconFrameServiceAssetmarket: "hwsicon-frame-service-assetmarket",
				"hwsicon-frame-service-ruleengine": "hwsicon-frame-service-ruleengine",
				hwsiconFrameServiceRuleengine: "hwsicon-frame-service-ruleengine",
				"hwsicon-frame-service-workflowengine": "hwsicon-frame-service-workflowengine",
				hwsiconFrameServiceWorkflowengine: "hwsicon-frame-service-workflowengine",
				"hwsicon-frame-service-servicebuilder": "hwsicon-frame-service-servicebuilder",
				hwsiconFrameServiceServicebuilder: "hwsicon-frame-service-servicebuilder",
				"hwsicon-frame-service-largescreenbuilder": "hwsicon-frame-service-largescreenbuilder",
				hwsiconFrameServiceLargescreenbuilder: "hwsicon-frame-service-largescreenbuilder",
				"hwsicon-frame-service-reportbuilder": "hwsicon-frame-service-reportbuilder",
				hwsiconFrameServiceReportbuilder: "hwsicon-frame-service-reportbuilder",
				"hwsicon-frame-service-webbuilder": "hwsicon-frame-service-webbuilder",
				hwsiconFrameServiceWebbuilder: "hwsicon-frame-service-webbuilder",
				"hwsicon-frame-service-cloudim": "hwsicon-frame-service-cloudim",
				hwsiconFrameServiceCloudim: "hwsicon-frame-service-cloudim",
				"hwsicon-frame-service-functionstage": "hwsicon-frame-service-functionstage",
				hwsiconFrameServiceFunctionstage: "hwsicon-frame-service-functionstage",
				"hwsicon-frame-service-hss": "hwsicon-frame-service-hss",
				hwsiconFrameServiceHss: "hwsicon-frame-service-hss",
				"hwsicon-frame-service-sas": "hwsicon-frame-service-sas",
				hwsiconFrameServiceSas: "hwsicon-frame-service-sas",
				"hwsicon-frame-service-dess": "hwsicon-frame-service-dess",
				hwsiconFrameServiceDess: "hwsicon-frame-service-dess",
				"hwsicon-frame-service-cloudtable": "hwsicon-frame-service-cloudtable",
				hwsiconFrameServiceCloudtable: "hwsicon-frame-service-cloudtable",
				"hwsicon-frame-service-fgs": "hwsicon-frame-service-fgs",
				hwsiconFrameServiceFgs: "hwsicon-frame-service-fgs",
				"hwsicon-frame-service-hwebscan": "hwsicon-frame-service-hwebscan",
				hwsiconFrameServiceHwebscan: "hwsicon-frame-service-hwebscan",
				"hwsicon-frame-service-elasticsearch": "hwsicon-frame-service-elasticsearch",
				hwsiconFrameServiceElasticsearch: "hwsicon-frame-service-elasticsearch",
				"hwsicon-frame-service-dls": "hwsicon-frame-service-dls",
				hwsiconFrameServiceDls: "hwsicon-frame-service-dls",
				"hwsicon-frame-service-cse": "hwsicon-frame-service-cse",
				hwsiconFrameServiceCse: "hwsicon-frame-service-cse",
				"hwsicon-frame-service-drs": "hwsicon-frame-service-drs",
				hwsiconFrameServiceDrs: "hwsicon-frame-service-drs",
				"hwsicon-frame-service-bill-icon": "hwsicon-frame-service-bill-icon",
				hwsiconFrameServiceBillIcon: "hwsicon-frame-service-bill-icon",
				"hwsicon-frame-service-dss": "hwsicon-frame-service-dss",
				hwsiconFrameServiceDss: "hwsicon-frame-service-dss",
				"hwsicon-frame-service-apig": "hwsicon-frame-service-apig",
				hwsiconFrameServiceApig: "hwsicon-frame-service-apig",
				"hwsicon-frame-service-apm": "hwsicon-frame-service-apm",
				hwsiconFrameServiceApm: "hwsicon-frame-service-apm",
				"hwsicon-frame-service-swr": "hwsicon-frame-service-swr",
				hwsiconFrameServiceSwr: "hwsicon-frame-service-swr",
				"hwsicon-frame-service-msgsms": "hwsicon-frame-service-msgsms",
				hwsiconFrameServiceMsgsms: "hwsicon-frame-service-msgsms",
				"hwsicon-frame-service-plas": "hwsicon-frame-service-plas",
				hwsiconFrameServicePlas: "hwsicon-frame-service-plas",
				"hwsicon-frame-service-privatenumber": "hwsicon-frame-service-privatenumber",
				hwsiconFrameServicePrivatenumber: "hwsicon-frame-service-privatenumber",
				"hwsicon-frame-service-nat": "hwsicon-frame-service-nat",
				hwsiconFrameServiceNat: "hwsicon-frame-service-nat",
				"hwsicon-frame-service-mpc": "hwsicon-frame-service-mpc",
				hwsiconFrameServiceMpc: "hwsicon-frame-service-mpc",
				"hwsicon-frame-service-CPTS": "hwsicon-frame-service-CPTS",
				hwsiconFrameServiceCpts: "hwsicon-frame-service-CPTS",
				"hwsicon-frame-service-ges": "hwsicon-frame-service-ges",
				hwsiconFrameServiceGes: "hwsicon-frame-service-ges",
				"hwsicon-frame-service-aos": "hwsicon-frame-service-aos",
				hwsiconFrameServiceAos: "hwsicon-frame-service-aos",
				"hwsicon-frame-service-CCI": "hwsicon-frame-service-CCI",
				hwsiconFrameServiceCci: "hwsicon-frame-service-CCI",
				"hwsicon-frame-service-vod": "hwsicon-frame-service-vod",
				hwsiconFrameServiceVod: "hwsicon-frame-service-vod",
				"hwsicon-frame-service-ccsms": "hwsicon-frame-service-ccsms",
				hwsiconFrameServiceCcsms: "hwsicon-frame-service-ccsms",
				"hwsicon-frame-service-EcsSecurity": "hwsicon-frame-service-EcsSecurity",
				hwsiconFrameServiceEcsSecurity: "hwsicon-frame-service-EcsSecurity",
				"hwsicon-frame-service-eip": "hwsicon-frame-service-eip",
				hwsiconFrameServiceEip: "hwsicon-frame-service-eip",
				"hwsicon-frame-service-aom": "hwsicon-frame-service-aom",
				hwsiconFrameServiceAom: "hwsicon-frame-service-aom",
				"hwsicon-frame-service-ers": "hwsicon-frame-service-ers",
				hwsiconFrameServiceErs: "hwsicon-frame-service-ers",
				"hwsicon-frame-service-res": "hwsicon-frame-service-res",
				hwsiconFrameServiceRes: "hwsicon-frame-service-res",
				"hwsicon-frame-service-bcs": "hwsicon-frame-service-bcs",
				hwsiconFrameServiceBcs: "hwsicon-frame-service-bcs",
				open: "open",
				"console-menu-userinfo": "console-menu-userinfo",
				consoleMenuUserinfo: "console-menu-userinfo",
				header: "header",
				J_container: "J_container",
				jContainer: "J_container"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		"use strict";
		t.r(n),
			n.default = "/static/framework/2.0/fonts/frameIcomoon.woff";
	}
	, function (e, n, t) {
		"use strict";
		t.r(n),
			n.default = "/static/framework/2.0/fonts/cfStatusIcomoon.woff";
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, "/* console dialog */\n.components-modal-cf-fade {\n  opacity: 0;\n  -moz-transition: all 0.15s linear;\n  -webkit-transition: all 0.15s linear;\n  transition: all 0.15s linear;\n}\n.components-modal-cf-fade.components-modal-cf-in {\n  opacity: 1;\n}\n.components-modal-cf-modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 2000000;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n.components-modal-cf-modal.components-modal-cf-fade .components-modal-cf-modal-dialog {\n  -webkit-transform: translate(0, -25%);\n  -ms-transform: translate(0, -25%);\n  -o-transform: translate(0, -25%);\n  transform: translate(0, -25%);\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  -moz-transition: -moz-transform 0.3s ease-out;\n  -o-transition: -o-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n}\n.components-modal-cf-modal.components-modal-cf-in .components-modal-cf-modal-dialog {\n  -webkit-transform: translate(0, 0);\n  -ms-transform: translate(0, 0);\n  -o-transform: translate(0, 0);\n  transform: translate(0, 0);\n}\n.components-modal-cf-modal-shadow {\n  position: fixed;\n  left: 0;\n  top: 0;\n  z-index: -1;\n  width: 100%;\n  height: 100%;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  background-color: #333333;\n  opacity: 0.2;\n  filter: alpha(opacity=20);\n}\n.components-modal-cf-modal-dialog {\n  position: relative;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  width: auto;\n  margin: 10px;\n}\n.components-modal-cf-modal-content {\n  position: relative;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  -moz-border-radius: 2px;\n  -webkit-border-radius: 2px;\n  border-radius: 2px;\n  background-color: #fff;\n  -moz-box-shadow: 1px 7px 30px rgba(0, 0, 0, 0.2);\n  -webkit-box-shadow: 1px 7px 30px rgba(0, 0, 0, 0.2);\n  box-shadow: 1px 7px 30px rgba(0, 0, 0, 0.2);\n  background-clip: padding-box;\n  outline: 0;\n}\n.components-modal-cf-modal-header {\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  padding: 30px 20px 30px 0;\n  -moz-border-radius: 2px 2px 0 0;\n  -webkit-border-radius: 2px 2px 0 0;\n  border-radius: 2px 2px 0 0;\n  color: #333;\n  font-size: 24px;\n  line-height: 100%;\n}\n.components-modal-cf-icon-close {\n  position: relative;\n  display: inline-block;\n  overflow: hidden;\n  top: -12px;\n  right: 0;\n  float: right;\n  width: 16px;\n  height: 16px;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  color: #a9a9a9;\n  cursor: pointer;\n  font-size: 16px;\n  speak: none;\n  text-transform: none;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n}\n.components-modal-cf-icon-close:hover::before,\n.components-modal-cf-icon-close:hover::after {\n  background: #5e7ce0;\n}\n.components-modal-cf-icon-close::before,\n.components-modal-cf-icon-close::after {\n  content: '';\n  position: absolute;\n  height: 2px;\n  width: 100%;\n  top: 50%;\n  left: 0;\n  margin-top: -1px;\n  background: #999;\n}\n.components-modal-cf-icon-close::before {\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  -o-transform: rotate(45deg);\n  transform: rotate(45deg);\n}\n.components-modal-cf-icon-close::after {\n  -webkit-transform: rotate(-45deg);\n  -moz-transform: rotate(-45deg);\n  -ms-transform: rotate(-45deg);\n  -o-transform: rotate(-45deg);\n  transform: rotate(-45deg);\n}\n.components-modal-cf-icon-close-hide {\n  display: none !important;\n}\n.components-modal-cf-modal-body {\n  position: relative;\n  padding: 0 30px 30px 30px;\n  overflow: hidden;\n}\n.components-modal-cf-msg-content-wrapper {\n  font-size: 14px;\n  color: #333;\n  line-height: 26px;\n  word-wrap: break-word;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n}\n.components-modal-cf-msg-icon {\n  font-size: 45px;\n  height: 45px;\n}\n.components-modal-cf-msg-icon::before {\n  line-height: normal;\n}\n.components-modal-cf-border-inline {\n  border-left: 3px solid #3399ff;\n  padding-right: 27px;\n}\n.components-modal-cf-modal-footer {\n  padding: 15px 20px;\n  -moz-border-radius: 0 0 2px 2px;\n  -webkit-border-radius: 0 0 2px 2px;\n  border-radius: 0 0 2px 2px;\n  text-align: center;\n  border-top: 1px solid #eeeeee;\n  background: #f5f5f5;\n}\n.components-modal-cf-modal-footer button:nth-of-type(1) {\n  margin-right: 10px;\n}\n.components-modal-cf-modal-footer [cf-button]:focus {\n  background-color: #e41e2b;\n  border-color: #e41e2b;\n  color: #fff;\n}\n@media screen and (min-width: 768px) {\n  .components-modal-cf-modal-dialog {\n    width: 400px;\n    margin: 150px auto;\n  }\n}\n.components-modal-cf-btn,\n[cf-button] {\n  display: inline-block;\n  padding: 0 20px;\n  height: 32px;\n  line-height: 30px;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  cursor: pointer;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  -khtml-user-select: none;\n  user-select: none;\n  outline: none;\n  border: 1px solid transparent;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  font-size: 14px;\n  background: #fff;\n  border: 1px solid #e7e7e7;\n  -webkit-border-radius: 2px;\n  -moz-border-radius: 2px;\n  border-radius: 2px;\n}\n.components-modal-cf-btn:hover {\n  border-color: #cccccc;\n}\n.components-modal-cf-btn-ok {\n  border: 1px solid #e41e2b;\n  background: #e41e2b;\n  color: #ffffff;\n}\n.components-modal-cf-btn-ok:hover {\n  border: 1px solid #f53642;\n  background: #f53642;\n}\n.components-modal-cf-btn-fouce:focus {\n  background: #f53642;\n}\n.components-modal-cf-btn-ok-hide,\n.components-modal-cf-btn-cancel-hide {\n  display: none !important;\n}\n.components-modal-cf-btn[disabled],\n[cf-button][disabled] {\n  cursor: not-allowed;\n}\n.components-modal-cf-modal .components-modal-cf-msg-icon {\n  font-size: 24px;\n  height: 24px;\n  position: relative;\n  top: 3px;\n}\n.components-modal-cf-modal .components-modal-cf-modal-header {\n  padding: 32px 32px 12px 32px;\n}\n.components-modal-cf-modal .components-modal-cf-modal-title {\n  font-size: 18px;\n  color: #252b3a;\n  margin-left: 8px;\n}\n.components-modal-cf-modal .components-modal-cf-modal-content > * {\n  font-size: 18px;\n}\n.components-modal-cf-modal .components-modal-cf-console-modal-content {\n  float: none;\n  width: 100%;\n  margin-left: 0;\n}\n.components-modal-cf-modal .components-modal-cf-modal-footer {\n  padding: 28px 32px 32px 32px;\n  text-align: center;\n  border-top: none;\n  background: none;\n}\n.components-modal-cf-modal .components-modal-cf-modal-body {\n  padding: 0 32px;\n}\n.components-modal-cf-modal .components-modal-cf-msg-content-wrapper {\n  font-size: 14px;\n  color: #333;\n  line-height: 26px;\n  word-wrap: break-word;\n  position: relative;\n  display: inherit;\n  align-items: unset;\n  justify-content: unset;\n}\n.components-modal-cf-modal .components-modal-cf-btn,\n[cf-button] {\n  padding: 0 20px;\n  height: 28px;\n  line-height: 26px;\n  border: 1px solid transparent;\n  border-radius: 2px;\n  font-size: 12px;\n}\n.components-modal-cf-modal .components-modal-cf-btn-ok {\n  color: #fff;\n  background: #5e7ce0;\n  border-color: #5e7ce0;\n}\n.components-modal-cf-modal .components-modal-cf-btn-ok:not([disabled]):active,\n.components-modal-cf-modal .components-modal-cf-btn-ok:not([disabled]):focus,\n.components-modal-cf-modal .components-modal-cf-btn-ok:not([disabled]):hover,\n.components-modal-cf-modal .components-modal-cf-btn-ok:not([disabled]):focus {\n  box-shadow: 0 6px 6px -4px rgb(138 153 5.8%);\n  color: #fff;\n  background: #7693f5;\n  border-color: #7693f5;\n}\n.components-modal-cf-modal .components-modal-cf-btn-cancel {\n  color: #252b3a;\n  background: #fff;\n  border-color: #adb0b8;\n}\n.components-modal-cf-modal .components-modal-cf-btn-cancel:focus,\n.components-modal-cf-modal .components-modal-cf-btn-cancel:hover,\n.components-modal-cf-modal .components-modal-cf-btn-cancel:active {\n  color: #526ecc;\n  background: #fff;\n  border-color: #5e7ce0;\n}\n.components-modal-cf-icon-status-info:before {\n  color: #5e7ce0;\n}\n.components-modal-cf-icon-status-warn:before {\n  color: #fa9841;\n}\n.components-modal-cf-icon-status-fail:before {\n  color: #f66f6a;\n}\n.components-modal-cf-icon-status-exception-large-warn:before {\n  color: #fac20a;\n}\n", ""]),
			n.locals = {
				"cf-fade": "components-modal-cf-fade",
				cfFade: "components-modal-cf-fade",
				"cf-in": "components-modal-cf-in",
				cfIn: "components-modal-cf-in",
				"cf-modal": "components-modal-cf-modal",
				cfModal: "components-modal-cf-modal",
				"cf-modal-dialog": "components-modal-cf-modal-dialog",
				cfModalDialog: "components-modal-cf-modal-dialog",
				"cf-modal-shadow": "components-modal-cf-modal-shadow",
				cfModalShadow: "components-modal-cf-modal-shadow",
				"cf-modal-content": "components-modal-cf-modal-content",
				cfModalContent: "components-modal-cf-modal-content",
				"cf-modal-header": "components-modal-cf-modal-header",
				cfModalHeader: "components-modal-cf-modal-header",
				"cf-icon-close": "components-modal-cf-icon-close",
				cfIconClose: "components-modal-cf-icon-close",
				"cf-icon-close-hide": "components-modal-cf-icon-close-hide",
				cfIconCloseHide: "components-modal-cf-icon-close-hide",
				"cf-modal-body": "components-modal-cf-modal-body",
				cfModalBody: "components-modal-cf-modal-body",
				"cf-msg-content-wrapper": "components-modal-cf-msg-content-wrapper",
				cfMsgContentWrapper: "components-modal-cf-msg-content-wrapper",
				"cf-msg-icon": "components-modal-cf-msg-icon",
				cfMsgIcon: "components-modal-cf-msg-icon",
				"cf-border-inline": "components-modal-cf-border-inline",
				cfBorderInline: "components-modal-cf-border-inline",
				"cf-modal-footer": "components-modal-cf-modal-footer",
				cfModalFooter: "components-modal-cf-modal-footer",
				"cf-btn": "components-modal-cf-btn",
				cfBtn: "components-modal-cf-btn",
				"cf-btn-ok": "components-modal-cf-btn-ok",
				cfBtnOk: "components-modal-cf-btn-ok",
				"cf-btn-fouce": "components-modal-cf-btn-fouce",
				cfBtnFouce: "components-modal-cf-btn-fouce",
				"cf-btn-ok-hide": "components-modal-cf-btn-ok-hide",
				cfBtnOkHide: "components-modal-cf-btn-ok-hide",
				"cf-btn-cancel-hide": "components-modal-cf-btn-cancel-hide",
				cfBtnCancelHide: "components-modal-cf-btn-cancel-hide",
				"cf-modal-title": "components-modal-cf-modal-title",
				cfModalTitle: "components-modal-cf-modal-title",
				"cf-console-modal-content": "components-modal-cf-console-modal-content",
				cfConsoleModalContent: "components-modal-cf-console-modal-content",
				"cf-btn-cancel": "components-modal-cf-btn-cancel",
				cfBtnCancel: "components-modal-cf-btn-cancel",
				"cf-icon-status-info": "components-modal-cf-icon-status-info",
				cfIconStatusInfo: "components-modal-cf-icon-status-info",
				"cf-icon-status-warn": "components-modal-cf-icon-status-warn",
				cfIconStatusWarn: "components-modal-cf-icon-status-warn",
				"cf-icon-status-fail": "components-modal-cf-icon-status-fail",
				cfIconStatusFail: "components-modal-cf-icon-status-fail",
				"cf-icon-status-exception-large-warn": "components-modal-cf-icon-status-exception-large-warn",
				cfIconStatusExceptionLargeWarn: "components-modal-cf-icon-status-exception-large-warn"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-expired-tip-cf-count-down {\n  padding: 0 5px;\n  color: #de504e;\n}\n", ""]),
			n.locals = {
				"cf-count-down": "components-expired-tip-cf-count-down",
				cfCountDown: "components-expired-tip-cf-count-down"
			},
			e.exports = n;
	}
	, , function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-header-cf-header-container {\n  width: 100%;\n  font-weight: 400;\n  font-style: normal;\n  position: fixed;\n  min-width: 1366px;\n  z-index: 1002;\n  top: 0;\n  left: 0;\n  background-color: #ebe7e7;\n}\n.modules-header-cf-header-layout {\n  display: flex;\n  background-color: #282b33;\n  align-items: stretch;\n  justify-content: space-between;\n  height: 50px;\n  padding: 0px 10px;\n  color: #adb0b8;\n  fill: #adb0b8;\n}\n.modules-header-cf-header-layout-start {\n  display: flex;\n  background-color: inherit;\n  flex-direction: row;\n  align-items: stretch;\n  justify-content: flex-start;\n  margin: 0px;\n}\n.modules-header-cf-header-layout-middle {\n  display: flex;\n  background-color: inherit;\n  flex-direction: row;\n  align-items: stretch;\n  justify-content: center;\n  margin: 0px;\n}\n.modules-header-cf-header-layout-end {\n  display: flex;\n  background-color: inherit;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  margin: 0px;\n}\n", ""]),
			n.locals = {
				"cf-header-container": "modules-header-cf-header-container",
				cfHeaderContainer: "modules-header-cf-header-container",
				"cf-header-layout": "modules-header-cf-header-layout",
				cfHeaderLayout: "modules-header-cf-header-layout",
				"cf-header-layout-start": "modules-header-cf-header-layout-start",
				cfHeaderLayoutStart: "modules-header-cf-header-layout-start",
				"cf-header-layout-middle": "modules-header-cf-header-layout-middle",
				cfHeaderLayoutMiddle: "modules-header-cf-header-layout-middle",
				"cf-header-layout-end": "modules-header-cf-header-layout-end",
				cfHeaderLayoutEnd: "modules-header-cf-header-layout-end"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-header-license-reminder-header-remainder {\n  min-width: 1366px;\n  width: 100%;\n  text-align: center;\n  line-height: 36px;\n  font-size: 12px;\n  background-color: #FFF9F5;\n  color: #252b3a;\n}\n.modules-header-license-reminder-header-remainder span {\n  display: inline-block;\n  vertical-align: top;\n  color: #252b3a;\n}\n.modules-header-license-reminder-header-remainder .modules-header-license-reminder-reminder-icon {\n  color: #FF8833;\n  font-size: 18px;\n  padding-right: 10px;\n}\n", ""]),
			n.locals = {
				"header-remainder": "modules-header-license-reminder-header-remainder",
				headerRemainder: "modules-header-license-reminder-header-remainder",
				"reminder-icon": "modules-header-license-reminder-reminder-icon",
				reminderIcon: "modules-header-license-reminder-reminder-icon"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-main-menu-cf-header-menu {\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n}\n.modules-main-menu-cf-header-menu span {\n  padding: 10px;\n  font-size: 16px;\n  font-weight: 600;\n}\n", ""]),
			n.locals = {
				"cf-header-menu": "modules-main-menu-cf-header-menu",
				cfHeaderMenu: "modules-main-menu-cf-header-menu"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-menu-wrapper-cf-menu-wrapper {\n  display: flex;\n  align-items: stretch;\n  height: 100%;\n  cursor: pointer;\n  position: relative;\n  background-color: inherit;\n}\n.components-menu-wrapper-cf-menu-wrapper > .components-menu-wrapper-menu-text {\n  display: flex;\n  align-items: center;\n  color: inherit;\n  text-decoration: none;\n  padding: 0 15px;\n  line-height: 50px;\n}\n.components-menu-wrapper-cf-menu-wrapper:hover .components-menu-wrapper-menu-text {\n  background-color: #464c59;\n  color: #ffffff;\n}\n.components-menu-wrapper-cf-menu-wrapper .components-menu-wrapper-menu-drop-wrapper {\n  display: none;\n  background-color: inherit;\n}\n.components-menu-wrapper-cf-menu-wrapper:hover .components-menu-wrapper-menu-drop-wrapper {\n  display: block;\n}\n", ""]),
			n.locals = {
				"cf-menu-wrapper": "components-menu-wrapper-cf-menu-wrapper",
				cfMenuWrapper: "components-menu-wrapper-cf-menu-wrapper",
				"menu-text": "components-menu-wrapper-menu-text",
				menuText: "components-menu-wrapper-menu-text",
				"menu-drop-wrapper": "components-menu-wrapper-menu-drop-wrapper",
				menuDropWrapper: "components-menu-wrapper-menu-drop-wrapper"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-dropdown-menu-menu-drop-wrapper {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  background-color: #464c59;\n  padding: 10px 0 5px 0;\n  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);\n}\n.components-dropdown-menu-menu-drop-wrapper ul,\n.components-dropdown-menu-menu-drop-wrapper li {\n  background-color: inherit;\n}\n.components-dropdown-menu-menu-drop-wrapper li {\n  position: relative;\n}\n.components-dropdown-menu-menu-drop-wrapper::before,\n.components-dropdown-menu-menu-drop-wrapper ul::before,\n.components-dropdown-menu-menu-drop-wrapper li::before {\n  content: ' ';\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: inherit;\n}\n", ""]),
			n.locals = {
				"menu-drop-wrapper": "components-dropdown-menu-menu-drop-wrapper",
				menuDropWrapper: "components-dropdown-menu-menu-drop-wrapper"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-dropdown-menu-menu-item-menu-item {\n  position: relative;\n  white-space: nowrap;\n  min-width: 210px;\n}\n.components-dropdown-menu-menu-item-menu-item .components-dropdown-menu-menu-item-menu-item-text {\n  position: relative;\n  text-align: left;\n  padding: 0 20px;\n  line-height: 33px;\n  font-weight: 400;\n  color: inherit;\n  text-decoration: none;\n  display: flex;\n}\n.components-dropdown-menu-menu-item-menu-item .components-dropdown-menu-menu-item-menu-item-text:hover {\n  background-color: #5c6173;\n  color: #ffffff;\n}\n.components-dropdown-menu-menu-item-menu-item .components-dropdown-menu-menu-item-menu-item-text.components-dropdown-menu-menu-item-menu-item-text-forbid {\n  cursor: not-allowed;\n  color: #8a8e99;\n}\n.components-dropdown-menu-menu-item-menu-item-bottom-line {\n  margin: 5px 0;\n  border-bottom: 1px dashed #3c3f51;\n}\n", ""]),
			n.locals = {
				"menu-item": "components-dropdown-menu-menu-item-menu-item",
				menuItem: "components-dropdown-menu-menu-item-menu-item",
				"menu-item-text": "components-dropdown-menu-menu-item-menu-item-text",
				menuItemText: "components-dropdown-menu-menu-item-menu-item-text",
				"menu-item-text-forbid": "components-dropdown-menu-menu-item-menu-item-text-forbid",
				menuItemTextForbid: "components-dropdown-menu-menu-item-menu-item-text-forbid",
				"menu-item-bottom-line": "components-dropdown-menu-menu-item-menu-item-bottom-line",
				menuItemBottomLine: "components-dropdown-menu-menu-item-menu-item-bottom-line"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-logo-logo-container {\n  display: flex;\n  align-items: center;\n  margin-right: 0;\n  max-width: 300px;\n}\n.modules-logo-not-href {\n  cursor: default;\n}\n", ""]),
			n.locals = {
				"logo-container": "modules-logo-logo-container",
				logoContainer: "modules-logo-logo-container",
				"not-href": "modules-logo-not-href",
				notHref: "modules-logo-not-href"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-sep-line-cf-header-sep-line {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0 20px;\n}\n.modules-sep-line-cf-header-sep-line:after {\n  content: '';\n  width: 1px;\n  height: 14px;\n  background-color: #ffffff33;\n}\n.modules-sep-line-cf-sidebar-line {\n  height: 1px;\n  background-color: #dfe1e6;\n  width: auto;\n  margin-left: 6px;\n  margin-right: 6px;\n}\n", ""]),
			n.locals = {
				"cf-header-sep-line": "modules-sep-line-cf-header-sep-line",
				cfHeaderSepLine: "modules-sep-line-cf-header-sep-line",
				"cf-sidebar-line": "modules-sep-line-cf-sidebar-line",
				cfSidebarLine: "modules-sep-line-cf-sidebar-line"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-region-cf-header-region-container {\n  display: flex;\n  align-items: center;\n  height: 100%;\n  margin-left: 0;\n  position: relative;\n  background-color: inherit;\n  width: 190px;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region {\n  line-height: 24px;\n  cursor: pointer;\n  background-color: inherit;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region .modules-region-cf-header-region-menu {\n  color: inherit;\n  width: 190px;\n  background-color: #464c59;\n  height: 24px;\n  border-radius: 2px;\n  padding: 0 6px;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region .modules-region-cf-header-region-menu:hover {\n  color: #fff;\n  background-color: #464c59;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region .modules-region-cf-header-region-menu:hover .modules-region-cf-header-region-icon {\n  color: #fff;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region .modules-region-cf-header-region-icon {\n  float: left;\n  color: #adb0b8;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region .modules-region-cf-header-region-text {\n  display: inline-block;\n  width: calc(100% - 32px);\n  margin-left: 5px;\n  color: inherit;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region .modules-region-cf-header-region-toggle-icon {\n  float: right;\n  font-size: 14px;\n  color: inherit;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region.modules-region-cf-header-region-wrapper-show {\n  border-radius: 2px;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region.modules-region-cf-header-region-wrapper-show .modules-region-cf-header-region-menu {\n  color: #fff;\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region.modules-region-cf-header-region-wrapper-show .modules-region-cf-header-region-toggle-icon {\n  transform: rotate(180deg);\n}\n.modules-region-cf-header-region-container .modules-region-cf-header-region.modules-region-cf-header-region-wrapper-show .modules-region-cf-header-region-icon {\n  color: #fff;\n}\n", ""]),
			n.locals = {
				"cf-header-region-container": "modules-region-cf-header-region-container",
				cfHeaderRegionContainer: "modules-region-cf-header-region-container",
				"cf-header-region": "modules-region-cf-header-region",
				cfHeaderRegion: "modules-region-cf-header-region",
				"cf-header-region-menu": "modules-region-cf-header-region-menu",
				cfHeaderRegionMenu: "modules-region-cf-header-region-menu",
				"cf-header-region-icon": "modules-region-cf-header-region-icon",
				cfHeaderRegionIcon: "modules-region-cf-header-region-icon",
				"cf-header-region-text": "modules-region-cf-header-region-text",
				cfHeaderRegionText: "modules-region-cf-header-region-text",
				"cf-header-region-toggle-icon": "modules-region-cf-header-region-toggle-icon",
				cfHeaderRegionToggleIcon: "modules-region-cf-header-region-toggle-icon",
				"cf-header-region-wrapper-show": "modules-region-cf-header-region-wrapper-show",
				cfHeaderRegionWrapperShow: "modules-region-cf-header-region-wrapper-show"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-region-region-list-cf-header-region-wrapper {\n  position: absolute;\n  width: 190px;\n  top: 37px;\n  left: 0;\n  background-color: #464c59;\n  padding: 5px 0;\n  border-top: 1px solid transparent;\n  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);\n  overflow-y: auto;\n}\n.modules-region-region-list-cf-header-region-wrapper ul,\n.modules-region-region-list-cf-header-region-wrapper li {\n  background-color: #464c59;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-list .modules-region-region-list-cf-header-region-projects-wrapper {\n  position: fixed;\n  display: none;\n  width: 190px;\n  background-color: inherit;\n  padding: 5px 0;\n  border-top: 1px solid transparent;\n  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);\n  overflow-y: auto;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-list .modules-region-region-list-cf-header-region-projects-wrapper::-webkit-scrollbar-thumb {\n  border: none;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-list:hover .modules-region-region-list-cf-header-region-projects-wrapper {\n  display: block;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-list-selected > .modules-region-region-list-cf-header-region-item {\n  color: #fff;\n  font-weight: inherit;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-list-selected .modules-region-region-list-cf-header-region-item-icon {\n  display: block;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-list-selected .modules-region-region-list-cf-header-region-item-projects-icon {\n  border-left-color: #fff;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-list-disable,\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-list-disable a:hover {\n  color: #8a8e99;\n  cursor: not-allowed;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-item-icon {\n  position: absolute;\n  left: 5px;\n  display: none;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-item {\n  position: relative;\n  text-align: left;\n  padding: 0 20px 0 23px;\n  line-height: 33px;\n  display: block;\n  clear: both;\n  font-weight: 400;\n  white-space: nowrap;\n  width: 100%;\n  text-decoration: none;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: inherit;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-item:hover {\n  background-color: #5c6173;\n  text-decoration: none;\n  color: #ffffff;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-item:hover .modules-region-region-list-cf-header-region-item-projects-icon {\n  border-left-color: #ffffff;\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-header-region-item-projects-icon {\n  position: absolute;\n  right: 10px;\n  top: 13px;\n  display: inline-block;\n  border-bottom: 4px solid transparent;\n  border-left: 6px solid #adb0b8;\n  border-top: 4px solid transparent;\n  content: '';\n}\n.modules-region-region-list-cf-header-region-wrapper .modules-region-region-list-cf-nodata-list-item {\n  position: relative;\n  text-align: left;\n  padding: 0 20px 0 23px;\n  line-height: 33px;\n  display: block;\n  clear: both;\n  font-weight: 400;\n  white-space: nowrap;\n  width: 100%;\n  text-decoration: none;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: inherit;\n  cursor: not-allowed;\n}\n", ""]),
			n.locals = {
				"cf-header-region-wrapper": "modules-region-region-list-cf-header-region-wrapper",
				cfHeaderRegionWrapper: "modules-region-region-list-cf-header-region-wrapper",
				"cf-header-region-list": "modules-region-region-list-cf-header-region-list",
				cfHeaderRegionList: "modules-region-region-list-cf-header-region-list",
				"cf-header-region-projects-wrapper": "modules-region-region-list-cf-header-region-projects-wrapper",
				cfHeaderRegionProjectsWrapper: "modules-region-region-list-cf-header-region-projects-wrapper",
				"cf-header-region-list-selected": "modules-region-region-list-cf-header-region-list-selected",
				cfHeaderRegionListSelected: "modules-region-region-list-cf-header-region-list-selected",
				"cf-header-region-item": "modules-region-region-list-cf-header-region-item",
				cfHeaderRegionItem: "modules-region-region-list-cf-header-region-item",
				"cf-header-region-item-icon": "modules-region-region-list-cf-header-region-item-icon",
				cfHeaderRegionItemIcon: "modules-region-region-list-cf-header-region-item-icon",
				"cf-header-region-item-projects-icon": "modules-region-region-list-cf-header-region-item-projects-icon",
				cfHeaderRegionItemProjectsIcon: "modules-region-region-list-cf-header-region-item-projects-icon",
				"cf-header-region-list-disable": "modules-region-region-list-cf-header-region-list-disable",
				cfHeaderRegionListDisable: "modules-region-region-list-cf-header-region-list-disable",
				"cf-nodata-list-item": "modules-region-region-list-cf-nodata-list-item",
				cfNodataListItem: "modules-region-region-list-cf-nodata-list-item"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-region-region-list-project-list-projects-item {\n  position: relative;\n  text-align: left;\n  padding: 0 20px 0 23px;\n  line-height: 33px;\n  display: block;\n  clear: both;\n  font-weight: 400;\n  white-space: nowrap;\n  width: 100%;\n  text-decoration: none;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.modules-region-region-list-project-list-projects-item:hover {\n  background-color: #5c6173;\n  text-decoration: none;\n  cursor: pointer;\n}\n.modules-region-region-list-project-list-projects-item:not(.modules-region-region-list-project-list-projects-item-disable):hover {\n  color: #ffffff;\n}\n.modules-region-region-list-project-list-projects-item-selected {\n  color: #fff;\n  font-weight: inherit;\n}\n.modules-region-region-list-project-list-projects-item-disable,\n.modules-region-region-list-project-list-projects-item-disable:hover {\n  cursor: not-allowed;\n}\n", ""]),
			n.locals = {
				"projects-item": "modules-region-region-list-project-list-projects-item",
				projectsItem: "modules-region-region-list-project-list-projects-item",
				"projects-item-disable": "modules-region-region-list-project-list-projects-item-disable",
				projectsItemDisable: "modules-region-region-list-project-list-projects-item-disable",
				"projects-item-selected": "modules-region-region-list-project-list-projects-item-selected",
				projectsItemSelected: "modules-region-region-list-project-list-projects-item-selected"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-search-box-mo-cf-search-box-container {\n  display: flex;\n  -ms-box-sizing: border-box;\n  border-radius: 2px;\n  box-sizing: border-box;\n  cursor: pointer;\n  height: 28px;\n  line-height: normal;\n  position: relative;\n  text-align: left;\n  vertical-align: middle;\n  background-color: #f2f5fc;\n}\n.components-search-box-mo-cf-search-box-container input {\n  color: inherit;\n  background-color: #0000;\n  border: none !important;\n  border-radius: 3px;\n  box-shadow: none;\n  box-sizing: border-box;\n  float: left;\n  height: 100%;\n  outline: none;\n  overflow: hidden;\n  padding: 0 0 0 10px;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: calc(100% - 35px);\n}\n.components-search-box-mo-cf-search-box-container .components-search-box-mo-cf-search-box-empty {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0 3px 3px 0;\n  float: right;\n  font-size: 12px;\n  height: 100%;\n  text-align: center;\n  width: 20px;\n  color: #8a8e99;\n  position: relative;\n}\n.components-search-box-mo-cf-search-box-container .components-search-box-mo-cf-search-box-empty:hover {\n  color: #5e7ce0;\n}\n.components-search-box-mo-cf-search-box-container .components-search-box-mo-cf-search-box-empty::after {\n  content: '';\n  width: 1px;\n  position: absolute;\n  top: 6px;\n  bottom: 6px;\n  right: -3px;\n  background-color: #dfe1e6;\n}\n.components-search-box-mo-cf-search-box-container .components-search-box-mo-cf-search-box-icon {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0 3px 3px 0;\n  float: right;\n  font-size: 14px;\n  height: 100%;\n  text-align: center;\n  width: 34px;\n  fill: #8a8e99;\n}\n.components-search-box-mo-cf-search-box-container .components-search-box-mo-cf-search-box-icon:hover {\n  color: #5e7ce0;\n}\n.components-search-box-mo-cf-search-box-container.components-search-box-dark {\n  background-color: #181818;\n  color: #adb0b8;\n}\n.components-search-box-mo-cf-search-box-container.components-search-box-dark .components-search-box-mo-cf-search-box-empty::after {\n  background-color: #6e7173;\n}\n.components-search-box-mo-cf-search-box-container.components-search-box-small {\n  height: 24px;\n}\n.components-search-box-mo-cf-search-box-container.components-search-box-small .components-search-box-mo-cf-search-box-empty {\n  transform: scale(0.8);\n}\n.components-search-box-mo-cf-search-box-container.components-search-box-small .components-search-box-mo-cf-search-box-empty:hover {\n  color: #fff;\n}\n.components-search-box-mo-cf-search-box-container.components-search-box-small .components-search-box-mo-cf-search-box-empty::after {\n  top: 4px;\n  bottom: 4px;\n}\n.components-search-box-mo-cf-search-box-container.components-search-box-small input {\n  width: calc(100% - 25px);\n  padding: 0 0 0 8px;\n}\n.components-search-box-mo-cf-search-box-container.components-search-box-small .components-search-box-mo-cf-search-box-icon {\n  width: 25px;\n}\n.components-search-box-mo-cf-search-box-container.components-search-box-small .components-search-box-mo-cf-search-box-icon svg {\n  height: 14px;\n}\n", ""]),
			n.locals = {
				"mo-cf-search-box-container": "components-search-box-mo-cf-search-box-container",
				moCfSearchBoxContainer: "components-search-box-mo-cf-search-box-container",
				"mo-cf-search-box-empty": "components-search-box-mo-cf-search-box-empty",
				moCfSearchBoxEmpty: "components-search-box-mo-cf-search-box-empty",
				"mo-cf-search-box-icon": "components-search-box-mo-cf-search-box-icon",
				moCfSearchBoxIcon: "components-search-box-mo-cf-search-box-icon",
				dark: "components-search-box-dark",
				small: "components-search-box-small"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-user-center-user-info-user-info-container {\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n  text-align: left;\n  line-height: 33px;\n  font-weight: 400;\n  color: inherit;\n  text-decoration: none;\n  display: flex;\n  flex-direction: column;\n}\n.modules-user-center-user-info-user-info-container p {\n  line-height: 20px;\n  display: flex;\n}\n.modules-user-center-user-info-user-info-container .modules-user-center-user-info-bottom-line {\n  margin: 5px 0;\n  width: 100%;\n  border-bottom: 1px dashed #3c3f51;\n}\n.modules-user-center-user-info-user-name-label {\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 128px;\n}\n", ""]),
			n.locals = {
				"user-info-container": "modules-user-center-user-info-user-info-container",
				userInfoContainer: "modules-user-center-user-info-user-info-container",
				"bottom-line": "modules-user-center-user-info-bottom-line",
				bottomLine: "modules-user-center-user-info-bottom-line",
				"user-name-label": "modules-user-center-user-info-user-name-label",
				userNameLabel: "modules-user-center-user-info-user-name-label"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-user-center-mo-cf-user-label {\n  display: flex;\n  height: 28px;\n  line-height: 28px;\n}\n.modules-user-center-mo-cf-user-label .modules-user-center-mo-cf-user-logo {\n  line-height: normal;\n  padding: 6px;\n  border-radius: 50%;\n  background-color: #5ecc49;\n  margin-right: 2px;\n}\n.modules-user-center-mo-cf-count {\n  position: relative;\n  padding-left: 15px;\n}\n.modules-user-center-mo-cf-count::before {\n  content: '';\n  position: absolute;\n  width: 5px;\n  height: 5px;\n  background-color: #f66f6a;\n  border-radius: 50%;\n  left: 5px;\n  top: 7px;\n}\n", ""]),
			n.locals = {
				"mo-cf-user-label": "modules-user-center-mo-cf-user-label",
				moCfUserLabel: "modules-user-center-mo-cf-user-label",
				"mo-cf-user-logo": "modules-user-center-mo-cf-user-logo",
				moCfUserLogo: "modules-user-center-mo-cf-user-logo",
				"mo-cf-count": "modules-user-center-mo-cf-count",
				moCfCount: "modules-user-center-mo-cf-count"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		var r = t(6)
			, o = t(53)
			, i = t(121)
			, a = t(122)
			, c = t(123)
			, s = t(124)
			, l = t(125)
			, u = t(126);
		n = r(!1);
		var f = o(i)
			, d = o(a)
			, m = o(c)
			, p = o(s)
			, h = o(l)
			, g = o(u);
		n.push([e.i, ".modules-task-task-container {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  background-color: #fff;\n  padding: 10px;\n  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);\n  min-width: 470px;\n  max-width: 550px;\n}\n.modules-task-task-container table {\n  box-sizing: border-box;\n  border-width: 0;\n  border-collapse: separate;\n  table-layout: fixed;\n  border-spacing: 0;\n  empty-cells: show;\n  margin-bottom: 0;\n  width: 100%;\n}\n.modules-task-task-container table thead > tr > th {\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  position: relative;\n  cursor: default;\n  background-color: #f2f5fc;\n  outline: 0;\n  height: 28px;\n  line-height: calc(28px - 1px);\n  color: #575d6c;\n  font-weight: 600;\n  border-left: none;\n  padding-left: 10px;\n  padding-right: 10px;\n  text-align: left;\n  vertical-align: middle;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  border-bottom: 1px solid #dfe1e6;\n}\n.modules-task-task-container table thead > tr > th:after {\n  width: 1px;\n  background: #fff;\n  color: #0000;\n  height: 100%;\n  position: absolute;\n  right: 0;\n  top: 0;\n  content: '';\n}\n.modules-task-task-container table tbody > tr {\n  border-spacing: 0;\n  background-color: #fff;\n  transition: background-color 0.15s cubic-bezier(0.25, 0.1, 0.25, 1);\n}\n.modules-task-task-container table tbody > tr:hover {\n  background-color: #f2f5fc;\n  transition: background-color 0.2s var(--ti-timing-function-default);\n}\n.modules-task-task-container table tbody > tr td {\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  border-left: none;\n  border-top: none;\n  padding: 5px 10px;\n  cursor: auto;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: left;\n  vertical-align: middle;\n  line-height: 18px;\n  color: #252b3a;\n  border-bottom: 1px solid #dfe1e6;\n}\n.modules-task-task-container .modules-task-mo-cf-table-nodata td {\n  border-bottom: 1px solid #dfe1e6;\n  color: #575d6c;\n  font-size: 14px;\n  height: 25px;\n  line-height: 20px;\n  overflow: visible !important;\n  padding: 10px 0;\n  position: relative;\n  text-align: center;\n  vertical-align: top;\n}\n.modules-task-task-container .modules-task-task-icon {\n  width: 20px;\n  height: 17px;\n  display: inline-block;\n  content: '';\n  margin: 0 2px 0 -2px;\n  vertical-align: bottom;\n}\n.modules-task-task-container .modules-task-task-icon-finish:before {\n  width: 20px;\n  height: 17px;\n  display: inline-block;\n  content: '';\n  margin: 0 2px 0 -2px;\n  vertical-align: bottom;\n  background: url(" + f + ") no-repeat;\n}\n.modules-task-task-container .modules-task-task-icon-running:before {\n  width: 20px;\n  height: 17px;\n  display: inline-block;\n  content: '';\n  margin: 0 2px 0 -2px;\n  vertical-align: bottom;\n  background: url(" + d + ") no-repeat;\n}\n.modules-task-task-container .modules-task-task-icon-partialSuccess:before {\n  width: 20px;\n  height: 17px;\n  display: inline-block;\n  content: '';\n  margin: 0 2px 0 -2px;\n  vertical-align: bottom;\n  background: url(" + m + ") no-repeat;\n}\n.modules-task-task-container .modules-task-task-icon-fail:before {\n  width: 20px;\n  height: 17px;\n  display: inline-block;\n  content: '';\n  margin: 0 2px 0 -2px;\n  vertical-align: bottom;\n  background: url(" + p + ") no-repeat;\n}\n.modules-task-task-container .modules-task-task-icon-timeout:before {\n  width: 20px;\n  height: 17px;\n  display: inline-block;\n  content: '';\n  margin: 0 2px 0 -2px;\n  vertical-align: bottom;\n  background: url(" + h + ") no-repeat;\n}\n.modules-task-task-container .modules-task-task-icon-waiting:before {\n  width: 20px;\n  height: 17px;\n  display: inline-block;\n  content: '';\n  margin: 0 2px 0 -2px;\n  vertical-align: bottom;\n  background: url(" + g + ") no-repeat;\n}\n.modules-task-task-container a {\n  text-decoration: none;\n}\n.modules-task-task-container .modules-task-task-more {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 10px 0;\n  color: #526ecc;\n}\n.modules-task-task-container .modules-task-task-more:hover {\n  text-decoration: underline;\n  color: #344899;\n}\n", ""]),
			n.locals = {
				"task-container": "modules-task-task-container",
				taskContainer: "modules-task-task-container",
				"mo-cf-table-nodata": "modules-task-mo-cf-table-nodata",
				moCfTableNodata: "modules-task-mo-cf-table-nodata",
				"task-icon": "modules-task-task-icon",
				taskIcon: "modules-task-task-icon",
				"task-icon-finish": "modules-task-task-icon-finish",
				taskIconFinish: "modules-task-task-icon-finish",
				"task-icon-running": "modules-task-task-icon-running",
				taskIconRunning: "modules-task-task-icon-running",
				"task-icon-partialSuccess": "modules-task-task-icon-partialSuccess",
				taskIconPartialSuccess: "modules-task-task-icon-partialSuccess",
				"task-icon-fail": "modules-task-task-icon-fail",
				taskIconFail: "modules-task-task-icon-fail",
				"task-icon-timeout": "modules-task-task-icon-timeout",
				taskIconTimeout: "modules-task-task-icon-timeout",
				"task-icon-waiting": "modules-task-task-icon-waiting",
				taskIconWaiting: "modules-task-task-icon-waiting",
				"task-more": "modules-task-task-more",
				taskMore: "modules-task-task-more"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		"use strict";
		t.r(n),
			n.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzNEQ0NBNjt9Cjwvc3R5bGU+CjxnIGlkPSLlm77lsYJfMV8xXyI+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOCwwQzMuNiwwLDAsMy42LDAsOHMzLjYsOCw4LDhzOC0zLjYsOC04UzEyLjQsMCw4LDB6IE03LjEsMTEuOEwzLjIsNy45bDEuMS0xLjFsMi44LDIuOEwxMS43LDVsMS4xLDEuMQoJCUw3LjEsMTEuOHoiLz4KPC9nPgo8L3N2Zz4K";
	}
	, function (e, n, t) {
		"use strict";
		t.r(n),
			n.default = "data:image/gif;base64,R0lGODlhEAAQAPeUAK7q2rjs36Tn1er69tf07cLv45rk0czy6Nr17qLn1JDizH3dw2vYu7Hr27fs3nfbwT3MplDRr/r+/dj17dv2757l0ovgymTWuLXs3bTr3VjTs0bOqv3+/o7hy+v69v3//qbo1rrt3/z+/qDm09z279n17nHavvT8+rPr3NT061jTsqHm1FTSsNLz6sDu4kXOqsrx52jXutf17ULNqM7y6MHv4oHexXrcwu7695PjzfL8+eL38vj9/Jzl0qXn1rDq2+H38WLWt5XjzsTv5Pv+/er59fD7+PX8+vn9/Pb9+3vcw5vl0W7ZvVbTsuD38UTOqVLRr0vQrIXfx6fo16vp2Pf9+5Tjzsnx5qjo14LexrHq23Xbv83y6O7799728Mbw5Zfkz1zUtOz69mnYuuf59O3692rYu87y6X7dxM/y6cfw5XTav+T48+T48pHizHzdw+n59XDZvU3QreX484Pexr7u4U7Qrl7VtdX07G/ZvcTw5I/izMfw5mXWuGDVtlfTsvP8+dHz6kXOqU7RrkvQrarp2I3hy+j59eb48/f9/H/dxMHv44TfxvH7+PH7+V3UtZ3l0uP48qno2F/Vtv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowN2RhMzM1Zi1jNGQ3LTQ4NTMtYjkyYS1lODc1ZTk3Y2IzYmEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkNBNDVFRkU5REU5MTFFN0FFQzFEQ0FCNDcyNzREQzAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkNBNDVFRkQ5REU5MTFFN0FFQzFEQ0FCNDcyNzREQzAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkNzcxYjUzYS0yZjY5LTQxOWMtYWM5ZC1kM2FjNWFkMmJiY2EiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2NDM4OWRhYi1lNjUyLTExN2EtODdlMS1mYWQyM2U5MzdjNDgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFCgCUACwAAAAAEAAQAAAIgAApCRxIqYCCAgQTEuxgQYHAD0QS0lhBo+BBSkboKCFBEEQFHwm5PHiQgWALLC0SVlni5pDClzBjDiSAgYBMAAwAoGiAQWaMCwwIZLAZEycAmTCROInEQSGAMCAGFpkwwZHCIBE0DDyCgIIESgY2GBD4NOrLGRA2IBVo4MXYhAEBACH5BAUKAJQALAAAAAAQABAAAAiBACkJHEjpQIIDBBMSHFEhwUARCWVkkFHwICUdQjoAIeiggYOEKSxYcEGQQggKCXlIWuFBocuXMAcOQDAgZoAFAUpMQBDzxoMFM2vCvBkg5ksgfUwcUeiAyY+BQiBACKFwywUGA9M8sVOEkgANAgQ2fTpQAkRKLCJoMCpQgIqwCQMCACH5BAkKAJQALAAAAAAQABAAAAh7ACkJHEiJAAYCBBMSRNEAg8KBHhB4KJgB4YkpKxARpDCBQkIKFSrAIFiGRJmESBxo6fKwpUuXBjYYeFlAQYEZEDa87GBBgYEXM13WLPCyJZs1ipIorGEjxMARESLUUCjlwYKBKZpMEkMJAAMAApk6fRjjAoOiAr2CTRgQACH5BAkKAJQALAAAAAAQABAAAAiBACkJHEhpAIIBBBMSLDEBwUAOCSEJ6lHwIKUkATJ4ICgHAqGEOxo0SEHQBxQfCSV8qaFDocuXMAcK0CAg5oEEB1hE0BBzRIUEAlTUhHnzQMyXZBh1SKQQRo4hA6lcuMBHIRgLCgaWGGOiC6UACwIIdAp1oASIlG48WHBUIFixCQMCACH5BAUKAJQALAAAAAAQABAAAAh+ACkJHEjJwAYDBBMSnAFhg8KBU/6AKPgCoQQSCI4QvBPhUcJGEyYUIQggCICEHHY44fGwpUuXABicdEkAA4EYFxi8RNEAQ8yZLQlkIPCy5YAcS1gmbCGAxsAMDx6cUYilQoKBXpRkMUKpgIICApk6HUiEg8AOFhQUFegVbMKAACH5BAUKAJQALAAAAAAQABAAAAiBACkJHEhJgAYBBBMSZBFBg0AOEhJqMfOjoAqEcAY94ULQxIU8CR1AgCCEoIMtDhKeiBPEi8KXMGMODLAggMwBCAbceLBAZokJCGjajIlzgEyYOBIUQqKQggMZA11YsIBHYYgGGAbu6GBFB6UDCQ4IdAp1oIgPAkdUSHBUIFixCQMCACH5BAUKAJQALAAAAAAQABAAAAh7ACkJHEgJAAMABBMSjHGBgcKBId6EKHiQkgc/TQIRzPLARsI6ESKMIOhCiguFaEwAeciyZcsCCgq4NLDBQAcLClzOgLABpsyWBl4YcMnSSIMAEhTioOBhIIwKFUgoJDEBwUAyK0CcoEQAAwGBS5s+RNEAA1GBBDJ8TRgQACH5BAUKAJQALAAAAAAQABAAAAiAACkJHEgpwIIABBMSvPFggcAPCvXsGVLwICUcJsYQIGjFQo6EXy5coELwCpgrCZMYsjFHocuXMAceSHAgpgANAkZUSBCTRQQNM2vCFKBCQMyXgBapIaIQRJQeA1M0aNBGIRQIGwaKyRCgCqUBCAYIdAp1IIeBJSYgOCoQrNiEAQEAOw==";
	}
	, function (e, n, t) {
		"use strict";
		t.r(n),
			n.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGRDkzOTt9Cjwvc3R5bGU+CjxnIGlkPSLlm77lsYJfMV8xXyI+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOCwwQzMuNiwwLDAsMy42LDAsOHMzLjYsOCw4LDhzOC0zLjYsOC04UzEyLjQsMCw4LDB6IE03LjEsMTEuOEwzLjIsNy45bDEuMS0xLjFsMi44LDIuOEwxMS43LDVsMS4xLDEuMQoJCUw3LjEsMTEuOHoiLz4KPC9nPgo8L3N2Zz4K";
	}
	, function (e, n, t) {
		"use strict";
		t.r(n),
			n.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGNEM0Qzt9Cjwvc3R5bGU+CjxnIGlkPSLlm77lsYJfMV8xXyI+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNOCwwQzMuNiwwLDAsMy42LDAsOHMzLjYsOCw4LDhzOC0zLjYsOC04UzEyLjQsMCw4LDB6IE05LDEyLjZIN3YtMmgyVjEyLjZ6IE05LDkuMUg3bC0wLjEtNmgyLjJMOSw5LjF6Ii8+CjwvZz4KPC9zdmc+Cg==";
	}
	, function (e, n, t) {
		"use strict";
		t.r(n),
			n.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGODgzMzt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDBDMy42LDAsMCwzLjYsMCw4YzAsNC40LDMuNiw4LDgsOGM0LjQsMCw4LTMuNiw4LThDMTYsMy42LDEyLjQsMCw4LDB6IE05LDd2Mkg3SDRWN2gzVjNoMlY3eiIvPgo8L3N2Zz4K";
	}
	, function (e, n, t) {
		"use strict";
		t.r(n),
			n.default = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTYgMTYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE2IDE2OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGODgzMzt9Cjwvc3R5bGU+CjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik04LDBDMy42LDAsMCwzLjYsMCw4YzAsNC40LDMuNiw4LDgsOGM0LjQsMCw4LTMuNiw4LThDMTYsMy42LDEyLjQsMCw4LDB6IE05LDd2Mkg3SDRWN2gzVjNoMlY3eiIvPgo8L3N2Zz4K";
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-process-bar-progress {\n  width: 100%;\n  height: 18px;\n  margin: 5px;\n  color: #fff;\n  background-color: #f1f1f1;\n  font-size: 12px;\n}\n.components-process-bar-progress-bar {\n  counter-reset: percent 60;\n  display: inline-block;\n  line-height: 18px;\n  height: inherit;\n  text-align: right;\n  transition: width 2s;\n  animation: components-process-bar-progress 1s ease forwards;\n}\n.components-process-bar-progress-bar:before {\n  content: attr(data-percent) '%';\n}\n@keyframes components-process-bar-progress {\n  from {\n    width: 0;\n  }\n  to {\n    width: 100%;\n  }\n}\n", ""]),
			n.locals = {
				progress: "components-process-bar-progress",
				"progress-bar": "components-process-bar-progress-bar",
				progressBar: "components-process-bar-progress-bar"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		var r = t(6)
			, o = t(53)
			, i = t(129);
		n = r(!1);
		var a = o(i);
		n.push([e.i, ".modules-message-message-badge {\n  position: absolute;\n  padding: 0 5px;\n  min-width: 16px;\n  height: 16px;\n  line-height: 16px;\n  color: #f66f6a;\n  border-radius: 8px;\n  top: 8px;\n  left: 30px;\n  transform: scale(0.8);\n}\n.modules-message-new-notice-container {\n  position: absolute;\n  top: 100%;\n  right: 0;\n  background-color: #fff;\n  padding: 10px 0 5px 0;\n  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);\n  min-width: 400px;\n  max-width: 550px;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container {\n  border-radius: 2px;\n  padding: 0 10px;\n  height: auto;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-with-content {\n  flex: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  border-bottom: 1px solid #dfe1e6;\n  max-height: 500px;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-with-content .modules-message-notice-item {\n  display: block;\n  padding: 10px 0 10px 10px;\n  color: #666;\n  text-decoration: none;\n  width: 100%;\n  overflow: hidden;\n  line-height: 18px;\n  position: relative;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-with-content .modules-message-notice-item .modules-message-notice-title {\n  font-size: 14px;\n  color: #252b3a;\n  display: inline-block;\n  max-width: calc(100% - 125px);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-with-content .modules-message-notice-item .modules-message-notice-time {\n  padding-left: 3px;\n  vertical-align: middle;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-with-content .modules-message-notice-item:hover {\n  background-color: #f2f5fc;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-with-content .modules-message-notice-item:hover .modules-message-message-text {\n  color: #526ecc;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-empty {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 10px 0;\n  text-align: center;\n  font-size: 12px;\n  border-bottom: 1px solid #dfe1e6;\n  color: #252b3a;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-empty .modules-message-notice-empty-image {\n  width: 35px;\n  height: 33px;\n  background: url(" + a + ") no-repeat 0;\n  background-size: cover;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container a {\n  text-decoration: none;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-more {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 10px 0;\n  color: #526ecc;\n}\n.modules-message-new-notice-container .modules-message-notice-content-container .modules-message-notice-more:hover {\n  text-decoration: underline;\n  color: #344899;\n}\n", ""]),
			n.locals = {
				"message-badge": "modules-message-message-badge",
				messageBadge: "modules-message-message-badge",
				"new-notice-container": "modules-message-new-notice-container",
				newNoticeContainer: "modules-message-new-notice-container",
				"notice-content-container": "modules-message-notice-content-container",
				noticeContentContainer: "modules-message-notice-content-container",
				"notice-with-content": "modules-message-notice-with-content",
				noticeWithContent: "modules-message-notice-with-content",
				"notice-item": "modules-message-notice-item",
				noticeItem: "modules-message-notice-item",
				"notice-title": "modules-message-notice-title",
				noticeTitle: "modules-message-notice-title",
				"notice-time": "modules-message-notice-time",
				noticeTime: "modules-message-notice-time",
				"message-text": "modules-message-message-text",
				messageText: "modules-message-message-text",
				"notice-empty": "modules-message-notice-empty",
				noticeEmpty: "modules-message-notice-empty",
				"notice-empty-image": "modules-message-notice-empty-image",
				noticeEmptyImage: "modules-message-notice-empty-image",
				"notice-more": "modules-message-notice-more",
				noticeMore: "modules-message-notice-more"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		"use strict";
		t.r(n),
			n.default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAKbElEQVRoQ+1aa0yU2Rl+zwwzwAAy4GUXlMtWF13UipdkEa2MJGjWghFtNuo2q1BnRn+pv/rX/muTJrVpky6wK5h0WTddN1KpbpGr1VUUdkEbCRDiaBcQnRmwDrdhmNM8h/nI3Bi+gUGx65uQmY853znv897Ocy6MfmTCfmR46Q3g/3ePv/HwfHu49C+lOs74Ec64lojOG43GS/M9pnv/L83DZWVlWrvdXsaI7fMAyKlcFa46XVhYOPgygL8UwPCqkznLGGOpnPhzIjrjAneGEYvlnJuYghUYDIbW+QY974CLi4v/wIidcgFpnHBOHD1x4oQJzyUlJRncycsZYxvwzIid0Rv1v5lP0PMCmHOutdlsf1YoFAc1Go3SbrdTX19fd0pKyp+IqJEx5uHJkk9KzhKjkwIop4YJPlEoGSXU4EMOGGBHhkf+3d3dvbyzs5P2H9gvdD5ffl58JiQmUHJy8nBKSkp9ZGTk31wGMImwVzgvIcSJaJCcdNpwwlD+ygEDEBFlE1GGtzJ2u32st7f3pMViefu7lu/EzwcPHRSfVZeryGazTb2iN+jF91u3bpFWqzWnpqZWc85vXPnHlYKBgYHcSWfzS2q1ujCUBS0oD3POM374zw9XH7Q/eNtitlB4eDitW7eO0lankcViIXh048aN9OWFLwlhnLsrl1JTU6dAvnjxgkwmk/ht8+bNhOcLX1yY+n3x4sUiIjjn42azWWG1WJVNTU2P7SP2I/oT+oZQeFs2YHjWbrebKioqYsft41Njp69Np7Vr11JPTw+ZHpooc2smNdQ3CGPk5ecF1BHAOzo6qK+3jx49ekTx8fF04BcHpgyRkJBAiYmJFB0TTZpIze0VSSt+60qBWU9hwQA+S0Qnu7u7qbe3l6AMJCwsjKKiomhoaIiUSiUlJSXN2hGIEngZBqiqqprqJzo6mg4dPiQio7Ojk5a9taxj2bJlV4kIXkcRlG2AYAB/73Q6M6DUdKLVaunhw4fCGDExMbMGjhcBDoYFeHh4/fr1Ih2uVV8T/arVakpJTSGdTgewZxljsqYz2YB7e3o5rL5kyRLa/rPtfsFERESInFSpVXT06FGPNgCgUqmIMdlD+owB8B2dkymAAvhu2rsALLXDfF44k5Vljz4TYFj88ePHdPvWbW9FyOFw0MDAwFQKADjaz8UAKHgQRBIqfWpKKqa8AsZYQG4uCzB48O5duwcCeVij0dDNGzdF8cnOzhaVWxJ49/lzMEpfQQ2YiwGQ042NjSKN8vLzKhnz4upeQ84IWOLBOp0uFR0nJSeJKcVb4uLi6O6duyLPUJ395fD4+LjITXziLxQGQH8gNYiYQ4cPtYSHh28JFNYBAbvzYBAI8zMzMQUTVdldkJfI7WAlWAMAlLdIFR2VPCsri6r/WX3KcNzwx+l08QsYpJ44lUlsKio66neHDx/+Naae4eFhn74w5w7ZhoT3QB39KSbHGHIMEBsb69E/xrx//77oHvxAfA/Ax30Au8DWExEo5CNitE+v12tNJlP9k74nhAGXLPX0Jjx+4183/ObvyMiIMJJUpPCpUCjk4Bdh750CSB3kvT9pudOib2lt+b2Lj7eq1Kqd3rTUF/AnJfXESMeJn1er1afwAudc19LSUg9+vOa9NbRmzRqP8aDE53/9XCiH0HfPXxQr/N9dADhYA3DOhQG8o6e6ulrQ17S0tOeMMa3YaBizN2DJCQxGo9FjfvQFXFzCoZxWrU34sPDDJ/gOwA0NDfVdnV20bv06WrVq1ZT+yF+EEiq4xIjcwWFKcvcUFPcWyQBIjWCmKpCgry9+LY0rKvS5c+eWqtXqhuGh4XQiajUYDRs96o334CXFJZyTUOqxgiuO6Y/rrwFw1eWq+r6+Ptq+fbtHSEv5C0IAWghGFEjkGEDuVIV8dZv3T1dUVFjHRsc+dTgcKkkHg9Hg4VQfD5cWl0qAJ9/hVF5woOCrrs6uqv7+fuFh5LEkyF/MwbOVYAyAsdyZGpaccMLOnJ3U1trWbLVaxZS0ZcsWam5uFirNCBgeRsMd2TuarzdeRzgoFQrFQE5OTlxcfJzP/In8vdd2T1RnaUEhgUdVR7giTKcrNN6Gmq5S+5v6MOeDePQ/7eejI6MMKZWfny+4d2lJaXCAsUB3OBy2y3+/bDGbzSl4O35xPG3atEnkDMQ9f6WlnTuAZ8+eeeS6lKOzqdTIfWlcdArDfHvzW7EGhyDyMjMzpyJgVoAlbXt6eka/ufpNhNPpFEvADRs2UHJKsljzdnV1Eao3NgK2Zm2dAoi28DAqNL5PV6gkWil3qkI/WEVh1YS+oUP+3nxCpLnLnACjI5D/uro6slqsol8UKKya7jTdEXnkvbvhPjgAQ7mxsTHhmUCVOpABkO8oUu3t7aJ7bZyW9u7dK0B7y5wBo0MoCvJRfa2a7GN2UoYpacXyFWIs3U6dbIYlp1B5z9VPnz6luto6ETUwCiJq0+ZN05KYkACWrAiFkT/YnpFyOycnxyOs0EZuoQpkAERH+4N2kToQkIwdO3ZQeISvV0Ma0j4xQyS8XVtbK6gjFhUZGRmiqE1MTNDg4KAoIO5Lv2ANgFRBCEvV/oM9H4g9LjkSUg+7DwiufO/ePTE1QRYtWiSKV2RkpI9ecg0Arzbfbaa2tjbRR+LyRNq9azeFqfxzaH8GmDfA0mDwMoiAtNDHbiaqOfJ+ukrtzwCgi7U1taIf/J6bmyv2roKVeQcsKYS8vt54XTyCGaGYIQylSi0RC++pCs94F0QCRlq6dCnt+fke2YVwXqq0XCtj+rl65SpJxAObbVicu6903A1gNpup6XaT2I+GZG3LovT30kVdmK28NA9LCsJL2JivqakR/0JOb9u2jd75yTtTGNCmtbVVEBcYABw9Ly+PNFGz5+ZS5y8dsDTw6Ogo1VyrEeQEgj0xbPIhCurr6gnehbyf+b5Yac1lG9c9Gl4ZYCgBT2ILF8DhSVRbx7hD6CcI/958D5482zBeMIAlRVCtce6ErVxIenq6OIsCPw+1vFIPe4MBYYGXZ7PTKdcwwQDGAVX2Mf2xkOWTXCVD2S5owEW/KpqXUAslqEB9vQHsso6/XUsR0kVFRWL597pK0B4uLCqUvbxbiEZ5A3imkH7j4YUYtwF0Cj6kCwudYaoweadeC9AYQQP+6Jcf9Ws0mrcWIJYZVQJf/+zTz9DuvsFo+Kn7C/5OD8W9x5ycnJaVq1b6HvXPONyrb2C1WuniVxdxTFRpOG7wuK483fnw99hw+/jIx4NKpRLnxK+NwLsXvrjgGBoaCuPEC7wvoPvdUiguLi5nxI6o1ern+w/sN8fExKx8HRDb7faRyspKPjgwqPHnXWDwCxiHyuP2cVz/wSVSXP7sX7169VBsbOx/XUepOHDjruOUBI4FL59c94rlL66Fur6Tk8jJnZPPDB9oKMzHuZOTEw3Eq27/d50h43fRE3qU+hMDe/5/wjnhND8zJ9hstslDL6JGlVq1z9+l1JkuteDm+inXFYLXwcmPOPGzRqMR1yT9iqxdMtddZuSyz5VhhVMRkluuc7VmWERYq5xrxrIAz1WZhfT+/wANCPuIX55PZwAAAABJRU5ErkJggg==";
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-shopping-cart-shopping-cart-badge {\n  position: absolute;\n  padding: 0 5px;\n  min-width: 16px;\n  height: 16px;\n  line-height: 16px;\n  color: #f66f6a;\n  border-radius: 8px;\n  top: 8px;\n  left: 25px;\n  transform: scale(0.8);\n}\n", ""]),
			n.locals = {
				"shopping-cart-badge": "modules-shopping-cart-shopping-cart-badge",
				shoppingCartBadge: "modules-shopping-cart-shopping-cart-badge"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-sidebar-cf-sidebar {\n  position: fixed;\n  z-index: 1001;\n  top: 50px;\n  height: 100%;\n  background-color: #ffffff;\n  width: 240px;\n  border-right: 1px solid #dfe1e6;\n  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);\n}\n.modules-sidebar-cf-sidebar.modules-sidebar-cf-sidebar-mini {\n  width: 48px;\n  overflow: hidden;\n}\n.modules-sidebar-cf-sidebar .modules-sidebar-cf-sidebar-wrapper {\n  z-index: 95;\n  color: #252b3a;\n  height: 100%;\n  position: relative;\n}\n.modules-sidebar-cf-sidebar .modules-sidebar-cf-sidebar-wrapper .modules-sidebar-cf-sidebar-mask-wrapper {\n  position: absolute;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000;\n  opacity: 0.1;\n  z-index: -100;\n  margin-left: 46px;\n  visibility: hidden;\n  transition: all 0.3s cubic-bezier(0, 0, 0.2, 1);\n}\n.modules-sidebar-cf-sidebar .modules-sidebar-cf-sidebar-wrapper .modules-sidebar-cf-sidebar-mask-wrapper-show {\n  visibility: visible;\n}\n.modules-sidebar-cf-sidebar .modules-sidebar-cf-sidebar-wrapper .modules-sidebar-cf-sidebar-panel {\n  height: 100%;\n  position: relative;\n  background-color: #fff;\n}\n", ""]),
			n.locals = {
				"cf-sidebar": "modules-sidebar-cf-sidebar",
				cfSidebar: "modules-sidebar-cf-sidebar",
				"cf-sidebar-mini": "modules-sidebar-cf-sidebar-mini",
				cfSidebarMini: "modules-sidebar-cf-sidebar-mini",
				"cf-sidebar-wrapper": "modules-sidebar-cf-sidebar-wrapper",
				cfSidebarWrapper: "modules-sidebar-cf-sidebar-wrapper",
				"cf-sidebar-mask-wrapper": "modules-sidebar-cf-sidebar-mask-wrapper",
				cfSidebarMaskWrapper: "modules-sidebar-cf-sidebar-mask-wrapper",
				"cf-sidebar-mask-wrapper-show": "modules-sidebar-cf-sidebar-mask-wrapper-show",
				cfSidebarMaskWrapperShow: "modules-sidebar-cf-sidebar-mask-wrapper-show",
				"cf-sidebar-panel": "modules-sidebar-cf-sidebar-panel",
				cfSidebarPanel: "modules-sidebar-cf-sidebar-panel"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-service-list-service-wrapper .modules-service-list-left-wrapper {\n  height: 46px;\n  width: 240px;\n  position: relative;\n  cursor: pointer;\n}\n.modules-service-list-service-wrapper .modules-service-list-service-icon {\n  width: 46px;\n  height: 46px;\n  padding: 14px;\n  display: inline-block;\n  box-sizing: border-box;\n  font-size: 16px;\n  vertical-align: middle;\n}\n.modules-service-list-service-wrapper .modules-service-list-service-name {\n  display: inline-block;\n  height: 40px;\n  line-height: 40px;\n  width: 188px;\n  vertical-align: middle;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding-left: 3px;\n}\n.modules-service-list-service-wrapper .modules-service-list-service-more-icon {\n  height: 46px;\n  line-height: 46px;\n  position: absolute;\n  right: 5px;\n  font-size: 20px;\n  top: 1px;\n  fill: #575d6c;\n}\n.modules-service-list-service-wrapper:hover .modules-service-list-service-name {\n  color: #526ecc;\n}\n.modules-service-list-service-list {\n  background-color: #ffffff;\n  position: absolute;\n  top: 0px;\n  bottom: 0px;\n  padding: 0 17px 0 32px;\n  left: -1172px;\n  z-index: -50;\n  transition: all 0.4s cubic-bezier(0, 0, 0.2, 1);\n}\n", ""]),
			n.locals = {
				"service-wrapper": "modules-service-list-service-wrapper",
				serviceWrapper: "modules-service-list-service-wrapper",
				"left-wrapper": "modules-service-list-left-wrapper",
				leftWrapper: "modules-service-list-left-wrapper",
				"service-icon": "modules-service-list-service-icon",
				serviceIcon: "modules-service-list-service-icon",
				"service-name": "modules-service-list-service-name",
				serviceName: "modules-service-list-service-name",
				"service-more-icon": "modules-service-list-service-more-icon",
				serviceMoreIcon: "modules-service-list-service-more-icon",
				"service-list": "modules-service-list-service-list",
				serviceList: "modules-service-list-service-list"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-service-list-service-list-drawer-service-list-container {\n  margin-top: 18px;\n  overflow: auto;\n  position: relative;\n  height: calc(100% - 112px);\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-close {\n  position: absolute;\n  right: 10px;\n  cursor: pointer;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-select-panel {\n  display: flex;\n  margin-bottom: 10px;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-select-panel div span {\n  display: inline-block;\n  margin-right: 10px;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-search {\n  width: calc(100% - 30px);\n  height: 28px;\n  line-height: 28px;\n  position: relative;\n  top: 0;\n  border-bottom: 1px solid rgba(173, 176, 184, 0.2);\n  border-radius: 2px;\n  vertical-align: middle;\n  margin: 0;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-search:hover {\n  border-color: #8a8e99;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-search:focus-within {\n  border-color: #5e7ce0;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-search .modules-service-list-service-list-drawer-service-search-input {\n  height: 26px;\n  display: inline-block;\n  border: none;\n  position: absolute;\n  width: 80%;\n  color: #252b3a;\n  outline: none;\n  cursor: text;\n  background-color: #ffffff;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-search .modules-service-list-service-list-drawer-service-search-input-empty {\n  position: absolute;\n  right: 47px;\n  display: none;\n  cursor: pointer;\n  color: #8a8e99;\n  font-size: 10px;\n  line-height: 26px;\n  font-weight: 400;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-search .modules-service-list-service-list-drawer-service-search-input-empty:hover {\n  color: #5e7ce0;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-search .modules-service-list-service-list-drawer-service-search-input-empty::after {\n  content: '';\n  width: 1px;\n  position: absolute;\n  top: 6px;\n  bottom: 6px;\n  right: -10px;\n  background-color: #dfe1e6;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-search .modules-service-list-service-list-drawer-service-search-icon {\n  height: 24px;\n  line-height: 24px;\n  position: absolute;\n  right: 10px;\n  font-size: 16px;\n  color: #8a8e99;\n  display: inline-block;\n  cursor: default;\n}\n.modules-service-list-service-list-drawer-service-list-container .modules-service-list-service-list-drawer-service-huaweicloud-links {\n  font-size: 14px;\n  height: 26px;\n  line-height: 26px;\n  text-decoration: none;\n  color: #526ecc;\n}\n.modules-service-list-service-list-drawer-service-content {\n  width: 100%;\n  height: calc(100% - 110px);\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding-right: 15px;\n  position: relative;\n  top: 20px;\n}\n", ""]),
			n.locals = {
				"service-list-container": "modules-service-list-service-list-drawer-service-list-container",
				serviceListContainer: "modules-service-list-service-list-drawer-service-list-container",
				"service-close": "modules-service-list-service-list-drawer-service-close",
				serviceClose: "modules-service-list-service-list-drawer-service-close",
				"service-select-panel": "modules-service-list-service-list-drawer-service-select-panel",
				serviceSelectPanel: "modules-service-list-service-list-drawer-service-select-panel",
				"service-search": "modules-service-list-service-list-drawer-service-search",
				serviceSearch: "modules-service-list-service-list-drawer-service-search",
				"service-search-input": "modules-service-list-service-list-drawer-service-search-input",
				serviceSearchInput: "modules-service-list-service-list-drawer-service-search-input",
				"service-search-input-empty": "modules-service-list-service-list-drawer-service-search-input-empty",
				serviceSearchInputEmpty: "modules-service-list-service-list-drawer-service-search-input-empty",
				"service-search-icon": "modules-service-list-service-list-drawer-service-search-icon",
				serviceSearchIcon: "modules-service-list-service-list-drawer-service-search-icon",
				"service-huaweicloud-links": "modules-service-list-service-list-drawer-service-huaweicloud-links",
				serviceHuaweicloudLinks: "modules-service-list-service-list-drawer-service-huaweicloud-links",
				"service-content": "modules-service-list-service-list-drawer-service-content",
				serviceContent: "modules-service-list-service-list-drawer-service-content"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-service-list-service-list-drawer-service-content-service-section {\n  width: 253px;\n  position: absolute;\n}\n.modules-service-list-service-list-drawer-service-content-service-first-catalog {\n  position: absolute;\n}\n.modules-service-list-service-list-drawer-service-content-service-first-catalog .modules-service-list-service-list-drawer-service-content-service-first-catalog-title {\n  font-size: 14px;\n  font-weight: bold;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  border-left: 3px solid #3399ff;\n  padding-left: 8px;\n}\n.modules-service-list-service-list-drawer-service-content-service-nav-item-title {\n  font-size: 14px;\n  font-weight: bold;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.modules-service-list-service-list-drawer-service-content-all-service {\n  height: 100%;\n  width: 100%;\n}\n.modules-service-list-service-list-drawer-service-content-service-nav-item {\n  position: relative;\n  line-height: 30px;\n  height: 30px;\n  width: 100%;\n  cursor: pointer;\n  border-bottom: 1px solid transparent;\n}\n.modules-service-list-service-list-drawer-service-content-service-nav-item a {\n  color: #252b3a;\n  text-decoration: none !important;\n  display: inline-block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: 90%;\n}\n.modules-service-list-service-list-drawer-service-content-service-nav-item .modules-service-list-service-list-drawer-service-content-service-nav-item-icon {\n  position: absolute;\n  right: 0px;\n  top: 4px;\n  display: none;\n  height: 16px;\n  width: 16px;\n  fill: #526ecc;\n}\n.modules-service-list-service-list-drawer-service-content-service-nav-item .modules-service-list-service-list-drawer-service-content-service-nav-item-icon .modules-service-list-service-list-drawer-service-content-service-collection-svg {\n  position: absolute;\n  transition: bottom 0.3s;\n  bottom: -3px;\n}\n.modules-service-list-service-list-drawer-service-content-service-nav-item .modules-service-list-service-list-drawer-service-content-service-nav-item-icon .modules-service-list-service-list-drawer-service-content-service-collection-fill {\n  width: 4px;\n  height: 9px;\n  background-color: #526ecc;\n  position: absolute;\n  left: 6px;\n  bottom: 3px;\n  display: none;\n  transition: height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), bottom 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);\n}\n.modules-service-list-service-list-drawer-service-content-service-nav-item:hover {\n  border-color: #526ecc;\n}\n.modules-service-list-service-list-drawer-service-content-service-nav-item:hover a {\n  color: #526ecc;\n}\n.modules-service-list-service-list-drawer-service-content-service-nav-item:hover .modules-service-list-service-list-drawer-service-content-service-nav-item-icon {\n  display: block !important;\n  fill: #526ecc;\n}\n.cf-lang-style-zh-cn .modules-service-list-service-list-drawer-service-content-service-section {\n  width: 218px;\n}\n", ""]),
			n.locals = {
				"service-section": "modules-service-list-service-list-drawer-service-content-service-section",
				serviceSection: "modules-service-list-service-list-drawer-service-content-service-section",
				"service-first-catalog": "modules-service-list-service-list-drawer-service-content-service-first-catalog",
				serviceFirstCatalog: "modules-service-list-service-list-drawer-service-content-service-first-catalog",
				"service-first-catalog-title": "modules-service-list-service-list-drawer-service-content-service-first-catalog-title",
				serviceFirstCatalogTitle: "modules-service-list-service-list-drawer-service-content-service-first-catalog-title",
				"service-nav-item-title": "modules-service-list-service-list-drawer-service-content-service-nav-item-title",
				serviceNavItemTitle: "modules-service-list-service-list-drawer-service-content-service-nav-item-title",
				"all-service": "modules-service-list-service-list-drawer-service-content-all-service",
				allService: "modules-service-list-service-list-drawer-service-content-all-service",
				"service-nav-item": "modules-service-list-service-list-drawer-service-content-service-nav-item",
				serviceNavItem: "modules-service-list-service-list-drawer-service-content-service-nav-item",
				"service-nav-item-icon": "modules-service-list-service-list-drawer-service-content-service-nav-item-icon",
				serviceNavItemIcon: "modules-service-list-service-list-drawer-service-content-service-nav-item-icon",
				"service-collection-svg": "modules-service-list-service-list-drawer-service-content-service-collection-svg",
				serviceCollectionSvg: "modules-service-list-service-list-drawer-service-content-service-collection-svg",
				"service-collection-fill": "modules-service-list-service-list-drawer-service-content-service-collection-fill",
				serviceCollectionFill: "modules-service-list-service-list-drawer-service-content-service-collection-fill",
				"cf-lang-style-zh-cn": "cf-lang-style-zh-cn",
				cfLangStyleZhCn: "cf-lang-style-zh-cn"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-select-mo-cf-select {\n  display: inline-block;\n  border: 0.5px solid #adb0b8;\n  border-radius: 2px;\n}\n.components-select-mo-cf-select:focus {\n  border-color: #5e7ce0;\n}\n.components-select-mo-cf-select .components-select-mo-cf-select-wrapper-show .components-select-mo-cf-select-toggle-icon {\n  transform: rotate(180deg);\n}\n.components-select-mo-cf-select .components-select-mo-cf-select-dominator-container {\n  display: flex;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  margin-left: 0;\n  position: relative;\n  background-color: inherit;\n  line-height: 24px;\n  cursor: pointer;\n}\n.components-select-mo-cf-select .components-select-mo-cf-select-dominator-container span {\n  display: inline-block;\n}\n.components-select-mo-cf-select .components-select-mo-cf-select-dominator-container .components-select-mo-cf-select-dominator-text {\n  line-height: 24px;\n  background-color: inherit;\n  width: calc(100% - 26px);\n  padding: 0 10px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.components-select-mo-cf-select .components-select-mo-cf-select-dominator-container .components-select-mo-cf-select-toggle-icon {\n  float: right;\n  font-size: 14px;\n  color: inherit;\n  width: 26px;\n  text-align: center;\n}\n", ""]),
			n.locals = {
				"mo-cf-select": "components-select-mo-cf-select",
				moCfSelect: "components-select-mo-cf-select",
				"mo-cf-select-wrapper-show": "components-select-mo-cf-select-wrapper-show",
				moCfSelectWrapperShow: "components-select-mo-cf-select-wrapper-show",
				"mo-cf-select-toggle-icon": "components-select-mo-cf-select-toggle-icon",
				moCfSelectToggleIcon: "components-select-mo-cf-select-toggle-icon",
				"mo-cf-select-dominator-container": "components-select-mo-cf-select-dominator-container",
				moCfSelectDominatorContainer: "components-select-mo-cf-select-dominator-container",
				"mo-cf-select-dominator-text": "components-select-mo-cf-select-dominator-text",
				moCfSelectDominatorText: "components-select-mo-cf-select-dominator-text"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-drop-mo-cf-drop-container {\n  -ms-box-sizing: border-box;\n  background-color: #fff;\n  box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px 0;\n  box-sizing: border-box;\n  color: #252b3a;\n  display: none;\n  position: absolute;\n  z-index: 1060;\n  border-radius: 2px;\n  margin-top: 3px;\n}\n", ""]),
			n.locals = {
				"mo-cf-drop-container": "components-drop-mo-cf-drop-container",
				moCfDropContainer: "components-drop-mo-cf-drop-container"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-list-mo-cf-list-viewport {\n  box-sizing: border-box;\n  height: 100%;\n  max-height: 650px;\n  min-height: 38px;\n  overflow: auto;\n  padding: 4px 0;\n  width: 100%;\n  transform: translateY(0px);\n}\n.components-list-mo-cf-list-viewport .components-list-mo-cf-list-ul {\n  overflow-x: hidden;\n  overflow-y: auto;\n  width: 100%;\n}\n.components-list-mo-cf-list-viewport .components-list-mo-cf-list-option {\n  background-color: #fff;\n  color: inherit;\n  cursor: pointer;\n  line-height: 1.5;\n  list-style: none;\n  padding: 6px 0;\n  text-align: left;\n}\n.components-list-mo-cf-list-viewport .components-list-mo-cf-list-option:hover {\n  background-color: #f2f5fc;\n  color: #526ecc;\n}\n.components-list-mo-cf-list-viewport .components-list-mo-cf-list-option :first-child {\n  margin-top: 0;\n}\n.components-list-mo-cf-list-viewport .components-list-mo-cf-list-option div {\n  overflow: hidden;\n  padding: 0 10px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.components-list-mo-cf-list-viewport .components-list-mo-cf-list-option.components-list-active {\n  background-color: #5e7ce0;\n  color: #fff;\n}\n", ""]),
			n.locals = {
				"mo-cf-list-viewport": "components-list-mo-cf-list-viewport",
				moCfListViewport: "components-list-mo-cf-list-viewport",
				"mo-cf-list-ul": "components-list-mo-cf-list-ul",
				moCfListUl: "components-list-mo-cf-list-ul",
				"mo-cf-list-option": "components-list-mo-cf-list-option",
				moCfListOption: "components-list-mo-cf-list-option",
				active: "components-list-active"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".components-message-mo-cf-message-wrapper {\n  width: 400px;\n  height: auto;\n  display: block;\n  position: absolute;\n  z-index: 99;\n  right: 32px;\n  top: 60px;\n}\n.components-message-mo-cf-message-wrapper > div {\n  margin-bottom: 10px;\n}\n.components-message-mo-cf-message-status {\n  width: 400px;\n  word-wrap: break-word;\n  border-radius: 2px;\n  padding: 10px 15px;\n  line-height: 1.5;\n  font-size: 12px;\n  *zoom: 1;\n}\n.components-message-mo-cf-message-status:before,\n.components-message-mo-cf-message-status:after {\n  display: table;\n  content: \"\";\n}\n.components-message-mo-cf-message-status:after {\n  clear: both;\n}\n.components-message-mo-cf-message-status p {\n  width: 320px;\n  float: left;\n  color: #252b3a;\n  margin: 0;\n}\n.components-message-mo-cf-message-status .components-message-icon {\n  margin: 1px 8px 0 0;\n  float: left;\n  font-size: 16px;\n}\n.components-message-mo-cf-message-status .components-message-close {\n  float: right;\n  cursor: pointer;\n  font-size: 12px;\n  opacity: 1;\n}\n.components-message-mo-cf-message-status .components-message-mo-cf-message-p {\n  width: 320px;\n  float: left;\n  color: #252b3a;\n  margin: 0;\n}\n.components-message-mo-cf-message-status .components-message-mo-cf-message-icon {\n  margin: 1px 8px 0 0;\n  float: left;\n  font-size: 16px;\n}\n.components-message-mo-cf-message-status .components-message-mo-cf-message-close {\n  float: right;\n  cursor: pointer;\n  font-size: 12px;\n  opacity: 1;\n}\n.components-message-mo-cf-message {\n  border: 1px solid #50d4ab;\n  color: #50d4ab;\n  background: #edfff9;\n  box-shadow: 0 1px 3px 0 rgba(39, 176, 128, 0.25);\n}\n.components-message-mo-cf-message .components-message-mo-cf-message-close {\n  color: #50d4ab;\n}\n.components-message-mo-cf-message-success {\n  border: 1px solid #50d4ab;\n  color: #50d4ab;\n  background: #edfff9;\n  box-shadow: 0 1px 3px 0 rgba(39, 176, 128, 0.25);\n}\n.components-message-mo-cf-message-success .components-message-mo-cf-message-close {\n  color: #50d4ab;\n}\n.components-message-mo-cf-message-prompt {\n  border: 1px solid #5e7ce0;\n  color: #5e7ce0;\n  background: #f2f5fc;\n  box-shadow: 0 1px 3px 0 rgba(70, 94, 184, 0.25);\n}\n.components-message-mo-cf-message-prompt .components-message-mo-cf-message-close {\n  color: #5e7ce0;\n}\n.components-message-mo-cf-message-warn {\n  border: 1px solid #fa9841;\n  color: #fa9841;\n  background: #fff3e8;\n  box-shadow: 0 1px 3px 0 rgba(204, 100, 20, 0.25);\n}\n.components-message-mo-cf-message-warn .components-message-mo-cf-message-close {\n  color: #fa9841;\n}\n.components-message-mo-cf-message-error {\n  border: 1px solid #f66f6a;\n  color: #f66f6a;\n  background: #ffeeed;\n  box-shadow: 0 1px 3px 0 rgba(199, 54, 54, 0.25);\n}\n.components-message-mo-cf-message-error .components-message-mo-cf-message-close {\n  color: #f66f6a;\n}\n.components-message-mo-cf-message-default {\n  background: #fff;\n  border-color: #adb0b8;\n  color: #252b3a;\n  box-shadow: 0 1px 3px 0 0 5px 8px 0 rgba(70, 77, 110, 0.25);\n}\n.components-message-mo-cf-message-default .components-message-mo-cf-message-close {\n  color: #252b3a;\n}\n", ""]),
			n.locals = {
				"mo-cf-message-wrapper": "components-message-mo-cf-message-wrapper",
				moCfMessageWrapper: "components-message-mo-cf-message-wrapper",
				"mo-cf-message-status": "components-message-mo-cf-message-status",
				moCfMessageStatus: "components-message-mo-cf-message-status",
				icon: "components-message-icon",
				close: "components-message-close",
				"mo-cf-message-p": "components-message-mo-cf-message-p",
				moCfMessageP: "components-message-mo-cf-message-p",
				"mo-cf-message-icon": "components-message-mo-cf-message-icon",
				moCfMessageIcon: "components-message-mo-cf-message-icon",
				"mo-cf-message-close": "components-message-mo-cf-message-close",
				moCfMessageClose: "components-message-mo-cf-message-close",
				"mo-cf-message": "components-message-mo-cf-message",
				moCfMessage: "components-message-mo-cf-message",
				"mo-cf-message-success": "components-message-mo-cf-message-success",
				moCfMessageSuccess: "components-message-mo-cf-message-success",
				"mo-cf-message-prompt": "components-message-mo-cf-message-prompt",
				moCfMessagePrompt: "components-message-mo-cf-message-prompt",
				"mo-cf-message-warn": "components-message-mo-cf-message-warn",
				moCfMessageWarn: "components-message-mo-cf-message-warn",
				"mo-cf-message-error": "components-message-mo-cf-message-error",
				moCfMessageError: "components-message-mo-cf-message-error",
				"mo-cf-message-default": "components-message-mo-cf-message-default",
				moCfMessageDefault: "components-message-mo-cf-message-default"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		(n = t(6)(!1)).push([e.i, ".modules-collections-cf-sidebar-collection-service {\n  display: block;\n  overflow-x: hidden;\n  position: relative;\n  height: calc(100% - 84px);\n  overflow-y: auto;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n}\n.modules-collections-cf-sidebar-collection-service::-webkit-scrollbar {\n  display: none;\n}\n.modules-collections-cf-sidebar-service-row {\n  position: absolute;\n  height: 40px;\n  z-index: 100;\n  left: 0;\n  top: 0;\n  width: 240px;\n  cursor: pointer;\n  display: inline-block;\n  text-decoration: none;\n  color: #252b3a;\n}\n.modules-collections-cf-sidebar-service-row:last-child {\n  margin-bottom: 40px;\n}\n.modules-collections-cf-sidebar-service-row.modules-collections-cf-sidebar-service-row-drag {\n  background-color: #f2f5fc;\n  color: #526ecc;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-service-item {\n  display: inline-block;\n  height: 40px;\n  color: #252b3a;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-service-item .modules-collections-cf-sidebar-service-svg svg {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-service-item .modules-collections-cf-sidebar-service-icon {\n  padding: 10px 15px;\n  width: 46px;\n  height: 40px;\n  display: inline-block;\n  vertical-align: middle;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-service-item .modules-collections-cf-sidebar-service-icon i {\n  font-size: 20px;\n  vertical-align: middle;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-service-item .modules-collections-cf-sidebar-service-name {\n  display: inline-block;\n  height: 40px;\n  line-height: 40px;\n  width: 188px;\n  vertical-align: middle;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  padding-right: 10px;\n  padding-left: 3px;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-toolbar {\n  height: 40px;\n  line-height: 40px;\n  vertical-align: middle;\n  position: absolute;\n  right: 5px;\n  width: 40px;\n  top: 0;\n  display: none;\n  background-color: #f5f6f7;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-toolbar .modules-collections-cf-siderbar-collection-icon {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  background-size: 100%;\n  position: relative;\n  bottom: -1px;\n  fill: #8a8e99;\n  overflow: hidden;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-toolbar .modules-collections-cf-siderbar-collection-icon .modules-collections-cf-sidebar-collection-svg {\n  position: absolute;\n  transition: bottom 0.3s;\n  bottom: -3px;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-toolbar .modules-collections-cf-siderbar-collection-icon .modules-collections-cf-sidebar-collection-fill {\n  width: 4px;\n  height: 9px;\n  background-color: #8a8e99;\n  position: absolute;\n  left: 6px;\n  bottom: 3px;\n  transition: height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), bottom 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-toolbar .modules-collections-cf-siderbar-collection-icon:hover {\n  fill: #526ecc;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-toolbar .modules-collections-cf-siderbar-collection-icon:hover .modules-collections-cf-sidebar-collection-fill {\n  background-color: #526ecc;\n}\n.modules-collections-cf-sidebar-service-row .modules-collections-cf-sidebar-toolbar .modules-collections-cf-sidebar-drag {\n  cursor: move;\n  color: #8a8e99;\n  padding-left: 5px;\n  padding-right: 8px;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.modules-collections-cf-sidebar-service-row:hover {\n  background-color: #f5f6f7;\n}\n.modules-collections-cf-sidebar-service-row:hover .modules-collections-cf-sidebar-service-item {\n  color: #526ecc;\n}\n.modules-collections-cf-sidebar-service-row:hover .modules-collections-cf-sidebar-toolbar {\n  display: block;\n}\n", ""]),
			n.locals = {
				"cf-sidebar-collection-service": "modules-collections-cf-sidebar-collection-service",
				cfSidebarCollectionService: "modules-collections-cf-sidebar-collection-service",
				"cf-sidebar-service-row": "modules-collections-cf-sidebar-service-row",
				cfSidebarServiceRow: "modules-collections-cf-sidebar-service-row",
				"cf-sidebar-service-row-drag": "modules-collections-cf-sidebar-service-row-drag",
				cfSidebarServiceRowDrag: "modules-collections-cf-sidebar-service-row-drag",
				"cf-sidebar-service-item": "modules-collections-cf-sidebar-service-item",
				cfSidebarServiceItem: "modules-collections-cf-sidebar-service-item",
				"cf-sidebar-service-svg": "modules-collections-cf-sidebar-service-svg",
				cfSidebarServiceSvg: "modules-collections-cf-sidebar-service-svg",
				"cf-sidebar-service-icon": "modules-collections-cf-sidebar-service-icon",
				cfSidebarServiceIcon: "modules-collections-cf-sidebar-service-icon",
				"cf-sidebar-service-name": "modules-collections-cf-sidebar-service-name",
				cfSidebarServiceName: "modules-collections-cf-sidebar-service-name",
				"cf-sidebar-toolbar": "modules-collections-cf-sidebar-toolbar",
				cfSidebarToolbar: "modules-collections-cf-sidebar-toolbar",
				"cf-siderbar-collection-icon": "modules-collections-cf-siderbar-collection-icon",
				cfSiderbarCollectionIcon: "modules-collections-cf-siderbar-collection-icon",
				"cf-sidebar-collection-svg": "modules-collections-cf-sidebar-collection-svg",
				cfSidebarCollectionSvg: "modules-collections-cf-sidebar-collection-svg",
				"cf-sidebar-collection-fill": "modules-collections-cf-sidebar-collection-fill",
				cfSidebarCollectionFill: "modules-collections-cf-sidebar-collection-fill",
				"cf-sidebar-drag": "modules-collections-cf-sidebar-drag",
				cfSidebarDrag: "modules-collections-cf-sidebar-drag"
			},
			e.exports = n;
	}
	, function (e, n, t) {
		"use strict";
		t.r(n);
		var r = t(31)
			, o = t(10)
			, i = t(11)
			, a = t(26)
			, c = t(32)
			, s = t(46)
			, l = t(7)
			, u = t(20)
			, f = t(0)
			, d = t.n(f)
			, m = function () {
				return (m = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			};

		function p(e) {
			var n = e.schema
				, t = e.moduleConfig
				, r = e.dependencies
				, o = n.modules
				, i = n.layout
				, a = n.root
				, c = n.global;
			return d.a.createElement(d.a.Fragment, null, function e(n) {
				var a = i[n]
					, s = o[n];
				if (Object.keys(t).includes(s.type)) {
					var l, u = (l = t[s.type],
						function (e) {
							return d.a.createElement(l, m({}, e));
						}
					), f = a && a.map((function (n) {
						return e(n);
					}
					));
					return d.a.createElement(u, m({
						key: n
					}, s.meta, {
						deps: r,
						globalData: c
					}), f);
				}
			}(a));
		}

		var h,
			g = t(16),
			v = (t(99), t(8)),
			b = t(28),
			w = t(3),
			y = t(4),
			x = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}, k = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}, S = function () {
			}, E = function () {
				function e() {
				}

				return e.getLicenseStatusRequest = function () {
					var e = {
						url: w.a.getAppWebPath() + "/goku/silvan/rest/v2.0/license",
						timeout: 6e4,
						params: {}
					};
					return y.a.get(e);
				}
					,
					e.getLicense = function () {
						return x(this, void 0, void 0, (function () {
							return k(this, (function (e) {
								switch (e.label) {
									case 0:
										return this.cfLicense ? [3, 2] : [4, this.initLicense()];
									case 1:
										e.sent(),
											e.label = 2;
									case 2:
										return [2, this.cfLicense];
								}
							}
							));
						}
						));
					}
					,
					e.initLicense = function () {
						return x(this, void 0, void 0, (function () {
							var e;
							return k(this, (function (n) {
								switch (n.label) {
									case 0:
										return this.cfLicense = new S,
											this.licensePromise || (this.licensePromise = this.getLicenseStatusRequest()),
											[4, this.licensePromise];
									case 1:
										e = n.sent();
										try {
											e && (this.cfLicense.licenseStatus = e);
										} catch (e) {
											this.cfLicense.cfLicenseInterfaceFailFlag = !0;
										}
										return [2];
								}
							}
							));
						}
						));
					}
					,
					e;
			}();

		function C() {
			return function () {
				h || (h = E.getLicense());
				return h;
			}();
		}

		var A = t(25)
			, I = t(35)
			, T = t(18)
			, P = t(2)
			, O = function () {
				return (O = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			};

		function _(e) {
			var n, t;
			n = document.getElementsByTagName("html")[0],
				t = "cf-lang-style-" + Object(r.a)(),
				n.classList.add(t),
				function (e) {
					Object(o.a)().then((function (e) {
						var n = (new Date).getTime().toString();
						P.a.setParentCookie("cfRefreshFlag", n),
							P.a.setSessionStorage("cfSessionRefreshFlag", n),
							v.a.user.resolve(Object(A.c)(e)),
							window.moCfUserCache = e,
							i.a.dispatch({
								type: "UPDATE_USER_ALL",
								payload: e
							}),
							Object(T.c)().then((function (e) {
								v.a.actions.resolve(e);
							}
							)),
							Object(T.c)(!0).then((function (e) {
								v.a.projectActions.resolve(e);
							}
							));
					}
					)),
						Object(a.d)().then((function (n) {
							v.a.regions.resolve(Object(A.b)(n)),
								v.c.selectedRegionId.next(null == n ? void 0 : n.selectRegionId);
							i.a.dispatch({
								type: "UPDATE_REGION_ALL",
								payload: n
							});

							var t = e.isGotoConsole;
							if (Object(c.a)({
								noCache: !0,
								projectId: "",
								regionId: null == n ? void 0 : n.selectRegionId,
								isGotoConsole: t
							}).then((function (e) {
								i.a.dispatch({
									type: "UPDATE_ENDPOINT_ALL",
									payload: e
								});
							}
							)),
								Object(s.a)({
									regionId: null == n ? void 0 : n.selectRegionId
								}).then((function (e) {
									v.b.links.next(e),
										i.a.dispatch({
											type: "UPDATE_LINKS_ALL",
											payload: e
										});
								}
								)),
								null == n ? void 0 : n.isMultiCloudScene) {
								var r = null == n ? void 0 : n.regions;
								Object(I.a)(r).then((function (e) {
									v.a.samlDatas.resolve(e);
								}
								));
							}
						}
						)),
						Object(b.b)((function (e) {
							v.b.safeArea.next(e.detail),
								i.a.dispatch({
									type: "UPDATE_SAFEAREA",
									payload: e.detail
								});
						}
						)),
						C().then((function (e) {
							var n;
							i.a.dispatch({
								type: "UPDATE_LICENSE_ALL",
								payload: e
							}),
								null === (n = window.getMoCfContext()) || void 0 === n || n.isCheckMoLicense$().subscribe((function (n) {
									var t, r;
									if (n && !(null === (r = null === (t = null == e ? void 0 : e.licenseStatus) || void 0 === t ? void 0 : t.ManageOneStatus) || void 0 === r ? void 0 : r.isExistItems)) {
										var o = window.location.origin + "/motenantconsolehomewebsite/#/moLicenseExpired";
										window.location.href !== o && (window.location.href = o);
									}
								}
								));
						}
						));
				}(e),
				function (e) {
					var n = e.moduleConfig
						, t = n.headerModuleConfig
						, r = n.sidebarModuleConfig
						, o = {
							intl: e.intl
						}
						, a = function (n) {
							var t = n.children;
							return f.createElement(l.a, {
								store: i.a
							}, f.createElement(u.a, {
								intl: e.intl
							}, t));
						}
						, c = function (e) {
							return f.createElement(a, null, f.createElement(p, O({}, e)));
						};
					g.render(f.createElement(c, {
						schema: e.schemas.header,
						moduleConfig: t,
						dependencies: o
					}), document.getElementById("J_header")),
						g.render(f.createElement(c, {
							schema: e.schemas.sidebar,
							moduleConfig: r,
							dependencies: o
						}), document.getElementById("J_sidebar")),
						j(Object(b.a)()),
						Object(b.b)((function (e) {
							j(e.detail);
						}
						));
				}(e);
		}

		function j(e) {
			var n = document.getElementById("J_container");
			n && (n.style.paddingLeft = e.left + "px",
				n.style.paddingTop = e.top + "px");
		}

		var N = t(17)
			, R = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}
			, L = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			};
		var F, M = function () {
			function e() {
			}

			return e.getSessionRequest = function () {
				var e = {
					url: w.a.getAppWebPath() + "/rest/timerRequest/getSessionExpireTime",
					timeout: 6e4,
					params: {}
				};
				return y.a.get(e);
			}
				,
				e;
		}(), U = t(47), D = t(70), z = t.n(D), B = function (e, n) {
			var t = "function" == typeof Symbol && e[Symbol.iterator];
			if (!t)
				return e;
			var r, o, i = t.call(e), a = [];
			try {
				for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
					a.push(r.value);
			} catch (e) {
				o = {
					error: e
				};
			} finally {
				try {
					r && !r.done && (t = i.return) && t.call(i);
				} finally {
					if (o)
						throw o.error;
				}
			}
			return a;
		};

		function H(e) {
			return e < 10 ? "0" + e : e;
		}

		function W(e) {
			var n = Math.floor(e)
				, t = Math.floor(n / 60)
				, r = H(t)
				, o = H(n - 60 * t);
			return "00:" + (r > 0 ? r : "00") + ":" + (o > 0 ? o : "00");
		}

		var V, Q, G = function (e) {
			var n = e.intl
				, t = e.data
				, r = null == t ? void 0 : t.time
				, o = B(Object(f.useState)(W(r)), 2)
				, i = o[0]
				, a = o[1]
				, c = n.get({
					id: "console_term_expired_start_tip"
				})
				, s = n.get({
					id: "console_term_expired_end_tip"
				});

			function l() {
				F && clearInterval(F),
					a(null),
					P.a.setSessionStorage("cfExpiredFlag", "end");
			}

			return Object(f.useEffect)((function () {
				return r > 0 ? F = window.setInterval((function () {
					a(W(r -= 1)),
						r <= 0 && l();
				}
				), 1e3) : l(),
					function () {
						clearInterval(F);
					};
			}
			), [n]),
				d.a.createElement("div", null, d.a.createElement("p", null, i ? c : s, d.a.createElement("span", {
					className: z.a.cfCountDown
				}, i || "")));
		}, q = function () {
			function e() {
				this.remindTime = 300,
					this.extraTime = 60,
					this.modalOpen = !1;
				var e = Object(N.b)();
				this.consoleModal = U.a.init(),
					this.intl = e.intl;
			}

			return e.prototype.doTouch = function () {
				var e = this;
				this.clearCfExpiredFlag(),
					this.sessionTimeout = window.setInterval((function () {
						M.getSessionRequest().then((function (n) {
							var t = (null == n ? void 0 : n.expireTime) || 0
								, r = t - e.extraTime < 0 ? 0 : t - e.extraTime;
							r <= e.remindTime ? e.expireModalOpen(e.intl, r) : (e.modalOpen && (e.modalOpen = !1,
								e.consoleModal.destroy()),
								e.clearCfExpiredFlag());
						}
						));
					}
					), 3e4);
			}
				,
				e.prototype.expireModalOpen = function (e, n) {
					var t = this
						, r = {
							type: "info",
							title: e.get({
								id: "console_term_expired_info"
							}),
							closable: !1,
							okBtnVisible: !0,
							focused: "ok",
							okText: e.get({
								id: "console_term_expired_ok"
							}),
							onOk: function () {
								var e = P.a.getSessionStorage("cfExpiredFlag");
								t.clearCfExpiredFlag(),
									t.modalOpen = !1,
									"start" === e ? Object(o.a)(!0).then() : "end" === e && window.location.reload();
							},
							cancelBtnVisible: !1,
							data: {
								time: n
							},
							children: G
						};
					this.consoleModal.update(r),
						this.modalOpen = !0,
						P.a.setSessionStorage("cfExpiredFlag", "start");
				}
				,
				e.prototype.clearCfExpiredFlag = function () {
					P.a.getSessionStorage("cfExpiredFlag") && P.a.delSessionStorage("cfExpiredFlag");
				}
				,
				e;
		}(), K = function () {
			function e() {
			}

			return e.getUkeyVendors = function () {
				var e = {
					url: w.a.getAppWebPath() + "/goku/rest/vdc-server/v3/ukey-vendors",
					timeout: 6e4
				};
				return y.a.get(e);
			}
				,
				e.getVDCServerUserRequest = function (e) {
					var n = {
						url: {
							s: w.a.getAppWebPath() + "/goku/rest/vdc-server/v3/users/{user_id}",
							o: {
								user_id: e.user_id
							}
						},
						timeout: 6e4,
						headers: e.header
					};
					return y.a.get(n);
				}
				,
				e;
		}(), J = t(13), Y = t.n(J), Z = {
			3489660929: {
				adviceArgs: "Failed to connect to the certificate maker server. Try again later or check whether the certificate maker has been installed.",
				descArgs: "Failed to connect to the certificate maker server. Try again later or check whether the certificate maker has been installed.",
				detailArgs: "Failed to connect to the certificate maker server. Try again later or check whether the certificate maker has been installed.",
				reasonArgs: "Failed to connect to the certificate maker server. Try again later or check whether the certificate maker has been installed."
			},
			3489660930: {
				adviceArgs: "An error occurred on the certificate maker server. Try again later or contact the administrator.",
				descArgs: "An error occurred on the certificate maker server. Try again later or contact the administrator.",
				detailArgs: "An error occurred on the certificate maker server. Try again later or contact the administrator.",
				reasonArgs: "An error occurred on the certificate maker server. Try again later or contact the administrator."
			},
			3489660931: {
				adviceArgs: "The certificate maker server returns an invalid value. Try again later or contact the administrator.",
				descArgs: "The certificate maker server returns an invalid value. Try again later or contact the administrator.",
				detailArgs: "The certificate maker server returns an invalid value. Try again later or contact the administrator.",
				reasonArgs: "The certificate maker server returns an invalid value. Try again later or contact the administrator."
			},
			4026532098: {
				adviceArgs: "Failed to connect to the certificate maker server over Socket. Check the network.",
				descArgs: "Failed to connect to the certificate maker server over Socket. Check the network.",
				detailArgs: "Failed to connect to the certificate maker server over Socket. Check the network.",
				reasonArgs: "Failed to connect to the certificate maker server over Socket. Check the network."
			},
			4026532099: {
				adviceArgs: "An error occurred on the certificate maker server connected over Socket. Try again later.",
				descArgs: "An error occurred on the certificate maker server connected over Socket. Try again later.",
				detailArgs: "An error occurred on the certificate maker server connected over Socket. Try again later.",
				reasonArgs: "An error occurred on the certificate maker server connected over Socket. Try again later."
			},
			5: {
				adviceArgs: "Invalid request parameters.",
				descArgs: "Invalid request parameters.",
				detailArgs: "Invalid request parameters.",
				reasonArgs: "Invalid request parameters."
			},
			167772161: {
				adviceArgs: "Invalid certificate maker server. Try again later or contact the administrator.",
				descArgs: "Invalid certificate maker server. Try again later or contact the administrator.",
				detailArgs: "Invalid certificate maker server. Try again later or contact the administrator.",
				reasonArgs: "Invalid certificate maker server. Try again later or contact the administrator."
			},
			167772162: {
				adviceArgs: "Invalid certificate maker server. Try again later or contact the administrator.",
				descArgs: "Invalid certificate maker server. Try again later or contact the administrator.",
				detailArgs: "Invalid certificate maker server. Try again later or contact the administrator.",
				reasonArgs: "Invalid certificate maker server. Try again later or contact the administrator."
			},
			167772196: {
				adviceArgs: "Invalid PIN. Try again later.",
				descArgs: "Invalid PIN. Try again later.",
				detailArgs: "Invalid PIN. Try again later.",
				reasonArgs: "Invalid PIN. Try again later."
			},
			167772197: {
				adviceArgs: "PIN locked. Contact the administrator to unlock it.",
				descArgs: "PIN locked. Contact the administrator to unlock it.",
				detailArgs: "PIN locked. Contact the administrator to unlock it.",
				reasonArgs: "PIN locked. Contact the administrator to unlock it."
			},
			167772204: {
				adviceArgs: "The application already exists in the USB key. Contact the administrator.",
				descArgs: "The application already exists in the USB key. Contact the administrator.",
				detailArgs: "The application already exists in the USB key. Contact the administrator.",
				reasonArgs: "The application already exists in the USB key. Contact the administrator."
			},
			167772205: {
				adviceArgs: "Failed to operate the certificate maker. Verify the PIN first and try again.",
				descArgs: "Failed to operate the certificate maker. Verify the PIN first and try again.",
				detailArgs: "Failed to operate the certificate maker. Verify the PIN first and try again.",
				reasonArgs: "Failed to operate the certificate maker. Verify the PIN first and try again."
			},
			167772206: {
				adviceArgs: "No application is available in the USB key. Contact the administrator to create one and try again.",
				descArgs: "No application is available in the USB key. Contact the administrator to create one and try again.",
				detailArgs: "No application is available in the USB key. Contact the administrator to create one and try again.",
				reasonArgs: "No application is available in the USB key. Contact the administrator to create one and try again."
			},
			167772210: {
				adviceArgs: "The number of certificates in the USB key has reached the maximum allowed. Contact the administrator to replace the USB key.",
				descArgs: "The number of certificates in the USB key has reached the maximum allowed. Contact the administrator to replace the USB key.",
				detailArgs: "The number of certificates in the USB key has reached the maximum allowed. Contact the administrator to replace the USB key.",
				reasonArgs: "The number of certificates in the USB key has reached the maximum allowed. Contact the administrator to replace the USB key."
			},
			184549429: {
				adviceArgs: "The specified USB key container is not found.",
				descArgs: "The specified USB key container is not found.",
				detailArgs: "The specified USB key container is not found.",
				reasonArgs: "The specified USB key container is not found."
			},
			184549430: {
				adviceArgs: "The container already exists in the USB key. Try again later or contact the administrator.",
				descArgs: "The container already exists in the USB key. Try again later or contact the administrator.",
				detailArgs: "The container already exists in the USB key. Try again later or contact the administrator.",
				reasonArgs: "The container already exists in the USB key. Try again later or contact the administrator."
			},
			218103840: {
				adviceArgs: "The selected USB key is not identified. Check whether the connection of the USB key is normal.",
				descArgs: "The selected USB key is not identified. Check whether the connection of the USB key is normal.",
				detailArgs: "The selected USB key is not identified. Check whether the connection of the USB key is normal.",
				reasonArgs: "The selected USB key is not identified. Check whether the connection of the USB key is normal."
			},
			218103856: {
				adviceArgs: "Failed to open the USB key application. Try again later or contact the administrator.",
				descArgs: "Failed to open the USB key application. Try again later or contact the administrator.",
				detailArgs: "Failed to open the USB key application. Try again later or contact the administrator.",
				reasonArgs: "Failed to open the USB key application. Try again later or contact the administrator."
			},
			218103888: {
				adviceArgs: "Failed to open the USB key container. Try again later or contact the administrator.",
				descArgs: "Failed to open the USB key container. Try again later or contact the administrator.",
				detailArgs: "Failed to open the USB key container. Try again later or contact the administrator.",
				reasonArgs: "Failed to open the USB key container. Try again later or contact the administrator."
			},
			218103889: {
				adviceArgs: "The USB key does not have any key pair. Contact the administrator.",
				descArgs: "The USB key does not have any key pair. Contact the administrator.",
				detailArgs: "The USB key does not have any key pair. Contact the administrator.",
				reasonArgs: "The USB key does not have any key pair. Contact the administrator."
			},
			167772163: {
				adviceArgs: "The certificate maker does not support this operation. Contact the administrator.",
				descArgs: "The certificate maker does not support this operation. Contact the administrator.",
				detailArgs: "The certificate maker does not support this operation. Contact the administrator.",
				reasonArgs: "The certificate maker does not support this operation. Contact the administrator."
			},
			167772164: {
				adviceArgs: "The certificate maker failed to operate the file. Contact the administrator.",
				descArgs: "The certificate maker failed to operate the file. Contact the administrator.",
				detailArgs: "The certificate maker failed to operate the file. Contact the administrator.",
				reasonArgs: "The certificate maker failed to operate the file. Contact the administrator."
			},
			167772165: {
				adviceArgs: "Invalid handles on the certificate maker server. Contact the administrator.",
				descArgs: "Invalid handles on the certificate maker server. Contact the administrator.",
				detailArgs: "Invalid handles on the certificate maker server. Contact the administrator.",
				reasonArgs: "Invalid handles on the certificate maker server. Contact the administrator."
			},
			167772166: {
				adviceArgs: "Invalid parameter settings on the certificate maker server. Contact the administrator.",
				descArgs: "Invalid parameter settings on the certificate maker server. Contact the administrator.",
				detailArgs: "Invalid parameter settings on the certificate maker server. Contact the administrator.",
				reasonArgs: "Invalid parameter settings on the certificate maker server. Contact the administrator."
			},
			167772167: {
				adviceArgs: "The certificate maker failed to read the file. Contact the administrator.",
				descArgs: "The certificate maker failed to read the file. Contact the administrator.",
				detailArgs: "The certificate maker failed to read the file. Contact the administrator.",
				reasonArgs: "The certificate maker failed to read the file. Contact the administrator."
			},
			167772198: {
				adviceArgs: "Invalid PIN. Confirm and try again.",
				descArgs: "Invalid PIN. Confirm and try again.",
				detailArgs: "Invalid PIN. Confirm and try again.",
				reasonArgs: "Invalid PIN. Confirm and try again."
			},
			167772199: {
				adviceArgs: "Incorrect PIN length. Confirm and try again.",
				descArgs: "Incorrect PIN length. Confirm and try again.",
				detailArgs: "Incorrect PIN length. Confirm and try again.",
				reasonArgs: "Incorrect PIN length. Confirm and try again."
			}
		}, X = {
			3489660929: {
				adviceArgs: "连接制证工具服务器失败，请稍候重试或检查制证工具是否安装。",
				descArgs: "连接制证工具服务器失败，请稍候重试或检查制证工具是否安装。",
				detailArgs: "连接制证工具服务器失败，请稍候重试或检查制证工具是否安装。",
				reasonArgs: "连接制证工具服务器失败，请稍候重试或检查制证工具是否安装。"
			},
			3489660930: {
				adviceArgs: "制证工具服务器错误，请稍候重试或联系管理员。",
				descArgs: "制证工具服务器错误，请稍候重试或联系管理员。",
				detailArgs: "制证工具服务器错误，请稍候重试或联系管理员。",
				reasonArgs: "制证工具服务器错误，请稍候重试或联系管理员。"
			},
			3489660931: {
				adviceArgs: "制证工具服务器的返回值异常，请稍候重试或联系管理员。",
				descArgs: "制证工具服务器的返回值异常，请稍候重试或联系管理员。",
				detailArgs: "制证工具服务器的返回值异常，请稍候重试或联系管理员。",
				reasonArgs: "制证工具服务器的返回值异常，请稍候重试或联系管理员。"
			},
			4026532098: {
				adviceArgs: "与制证工具服务器的Socket连接建立失败，请检查网络。",
				descArgs: "与制证工具服务器的Socket连接建立失败，请检查网络。",
				detailArgs: "与制证工具服务器的Socket连接建立失败，请检查网络。",
				reasonArgs: "与制证工具服务器的Socket连接建立失败，请检查网络。"
			},
			4026532099: {
				adviceArgs: "制证工具的Socket服务端发生错误，请稍候重试或联系管理员。",
				descArgs: "制证工具的Socket服务端发生错误，请稍候重试或联系管理员。",
				detailArgs: "制证工具的Socket服务端发生错误，请稍候重试或联系管理员。",
				reasonArgs: "制证工具的Socket服务端发生错误，请稍候重试或联系管理员。"
			},
			5: {
				adviceArgs: "请求制证工具的参数错误，请确认后重新下发。",
				descArgs: "请求制证工具的参数错误，请确认后重新下发。",
				detailArgs: "请求制证工具的参数错误，请确认后重新下发。",
				reasonArgs: "请求制证工具的参数错误，请确认后重新下发。"
			},
			167772161: {
				adviceArgs: "制证工具服务器错误，请稍候重试或联系管理员。",
				descArgs: "制证工具服务器错误，请稍候重试或联系管理员。",
				detailArgs: "制证工具服务器错误，请稍候重试或联系管理员。",
				reasonArgs: "制证工具服务器错误，请稍候重试或联系管理员。"
			},
			167772162: {
				adviceArgs: "制证工具服务器错误，请稍候重试或联系管理员。",
				descArgs: "制证工具服务器错误，请稍候重试或联系管理员。",
				detailArgs: "制证工具服务器错误，请稍候重试或联系管理员。",
				reasonArgs: "制证工具服务器错误，请稍候重试或联系管理员。"
			},
			167772196: {
				adviceArgs: "PIN码错误，请确认后重试。",
				descArgs: "PIN码错误，请确认后重试。",
				detailArgs: "PIN码错误，请确认后重试。",
				reasonArgs: "PIN码错误，请确认后重试。"
			},
			167772197: {
				adviceArgs: "PIN码被锁定，请联系管理员。",
				descArgs: "PIN码被锁定，请联系管理员。",
				detailArgs: "PIN码被锁定，请联系管理员。",
				reasonArgs: "PIN码被锁定，请联系管理员。"
			},
			167772204: {
				adviceArgs: "USB Key内的应用已经存在，请联系管理员。",
				descArgs: "USB Key内的应用已经存在，请联系管理员。",
				detailArgs: "USB Key内的应用已经存在，请联系管理员。",
				reasonArgs: "USB Key内的应用已经存在，请联系管理员。"
			},
			167772205: {
				adviceArgs: "制证工具操作失败，请先验证PIN码后再试。",
				descArgs: "制证工具操作失败，请先验证PIN码后再试。",
				detailArgs: "制证工具操作失败，请先验证PIN码后再试。",
				reasonArgs: "制证工具操作失败，请先验证PIN码后再试。"
			},
			167772206: {
				adviceArgs: "USB Key内无应用，请联系管理员创建后再试。",
				descArgs: "USB Key内无应用，请联系管理员创建后再试。",
				detailArgs: "USB Key内无应用，请联系管理员创建后再试。",
				reasonArgs: "USB Key内无应用，请联系管理员创建后再试。"
			},
			167772210: {
				adviceArgs: "USB Key内证书数量达到上限，请联系管理员更换新的USB Key。",
				descArgs: "USB Key内证书数量达到上限，请联系管理员更换新的USB Key。",
				detailArgs: "USB Key内证书数量达到上限，请联系管理员更换新的USB Key。",
				reasonArgs: "USB Key内证书数量达到上限，请联系管理员更换新的USB Key。"
			},
			184549429: {
				adviceArgs: "指定的USB Key容器不存在，请确认后重新下发。",
				descArgs: "指定的USB Key容器不存在，请确认后重新下发。",
				detailArgs: "指定的USB Key容器不存在，请确认后重新下发。",
				reasonArgs: "指定的USB Key容器不存在，请确认后重新下发。"
			},
			184549430: {
				adviceArgs: "USB Key已存在同名容器，请稍候重试或联系管理员。",
				descArgs: "USB Key已存在同名容器，请稍候重试或联系管理员。",
				detailArgs: "USB Key已存在同名容器，请稍候重试或联系管理员。",
				reasonArgs: "USB Key已存在同名容器，请稍候重试或联系管理员。"
			},
			218103840: {
				adviceArgs: "未检测到选择的USB Key，请检查USB Key是否正常连接。",
				descArgs: "未检测到选择的USB Key，请检查USB Key是否正常连接。",
				detailArgs: "未检测到选择的USB Key，请检查USB Key是否正常连接。",
				reasonArgs: "未检测到选择的USB Key，请检查USB Key是否正常连接。"
			},
			218103856: {
				adviceArgs: "打开USB Key应用失败，请稍候重试或联系管理员。",
				descArgs: "打开USB Key应用失败，请稍候重试或联系管理员。",
				detailArgs: "打开USB Key应用失败，请稍候重试或联系管理员。",
				reasonArgs: "打开USB Key应用失败，请稍候重试或联系管理员。"
			},
			218103888: {
				adviceArgs: "打开USB Key容器失败，请稍候重试或联系管理员。",
				descArgs: "打开USB Key容器失败，请稍候重试或联系管理员。",
				detailArgs: "打开USB Key容器失败，请稍候重试或联系管理员。",
				reasonArgs: "打开USB Key容器失败，请稍候重试或联系管理员。"
			},
			218103889: {
				adviceArgs: "USB Key无密钥对，请联系管理员。",
				descArgs: "USB Key无密钥对，请联系管理员。",
				detailArgs: "USB Key无密钥对，请联系管理员。",
				reasonArgs: "USB Key无密钥对，请联系管理员。"
			},
			167772163: {
				adviceArgs: "制证工具不支持当前操作，请联系管理员。",
				descArgs: "制证工具不支持当前操作，请联系管理员。",
				detailArgs: "制证工具不支持当前操作，请联系管理员。",
				reasonArgs: "制证工具不支持当前操作，请联系管理员。"
			},
			167772164: {
				adviceArgs: "制证工具文件操作错误，请联系管理员。",
				descArgs: "制证工具文件操作错误，请联系管理员。",
				detailArgs: "制证工具文件操作错误，请联系管理员。",
				reasonArgs: "制证工具文件操作错误，请联系管理员。"
			},
			167772165: {
				adviceArgs: "无效的句柄，请联系管理员。",
				descArgs: "无效的句柄，请联系管理员。",
				detailArgs: "无效的句柄，请联系管理员。",
				reasonArgs: "无效的句柄，请联系管理员。"
			},
			167772166: {
				adviceArgs: "无效的参数，请联系管理员。",
				descArgs: "无效的参数，请联系管理员。",
				detailArgs: "无效的参数，请联系管理员。",
				reasonArgs: "无效的参数，请联系管理员。"
			},
			167772167: {
				adviceArgs: "制证工具读取文件错误，请联系管理员。",
				descArgs: "制证工具读取文件错误，请联系管理员。",
				detailArgs: "制证工具读取文件错误，请联系管理员。",
				reasonArgs: "制证工具读取文件错误，请联系管理员。"
			},
			167772198: {
				adviceArgs: "PIN码无效，请确认后重试。",
				descArgs: "PIN码无效，请确认后重试。",
				detailArgs: "PIN码无效，请确认后重试。",
				reasonArgs: "PIN码无效，请确认后重试。"
			},
			167772199: {
				adviceArgs: "PIN码长度错误，请确认后重试。",
				descArgs: "PIN码长度错误，请确认后重试。",
				detailArgs: "PIN码长度错误，请确认后重试。",
				reasonArgs: "PIN码长度错误，请确认后重试。"
			}
		}, $ = {
			GET_TYPE: "GET",
			POST_TYPE: "POST",
			REST_ROOT_URL: "https://127.0.0.1:",
			HTTPS_PORTS: [41943, 41944, 41945, 41946, 41947],
			HTTPS_SUCCESS_CODE: 200,
			CONNECT_REFUSED: 3489660929,
			REQ_FAILED: 3489660930,
			RES_INVALID: 3489660931,
			PIN_ERROR: 167772196,
			SOCKET_ROOT_URL: "wss://127.0.0.1:",
			SOCKET_SUCCESS_CODE: 0,
			SOCKET_OPEN_FAILED: 4026532098,
			SOCKET_SERVER_ERROR: 4026532099
		}, ee = !1;

		function ne(e, n, t) {
			return new Promise((function (r, o) {
				var i = new XMLHttpRequest;
				i.open(e, n),
					i.onload = function () {
						if (i.status === $.HTTPS_SUCCESS_CODE) {
							var e = i.response;
							if (oe(e)) {
								var n = JSON.parse(e);
								n.errorCode === $.HTTPS_SUCCESS_CODE ? "object" === Y()(n) ? r(JSON.parse(JSON.stringify(n))) : r(n) : o(te(n));
							} else
								o(te($.RES_INVALID));
						} else
							o(te($.REQ_FAILED));
					}
					,
					i.onerror = function () {
						o(te($.REQ_FAILED));
					}
					,
					t ? i.send(JSON.stringify(t)) : i.send();
			}
			));
		}

		function te(e) {
			var n, t = e.errorCode;
			if (t || (t = $.RES_INVALID),
				t === $.PIN_ERROR && -1 !== (n = function (e) {
					var n = -1;
					if (e.errorMsg && e.errorMsg.en_US && e.errorMsg.en_US.descArgs) {
						var t = e.errorMsg.en_US.descArgs.match(/retryCount=(\d+)/);
						t && (n = t[1]);
					}
					return n;
				}(e)))
				return {
					errorCode: t,
					errorMsg: re(n),
					value: ""
				};
			var r = {};
			return r.zh_CN = X[t],
				r.en_US = Z[t],
				r.zh_CN && r.en_US || (r = function (e) {
					var n = "制证工具操作失败，错误码为" + e + "，请联系管理员。"
						, t = {};
					t.descArgs = n,
						t.reasonArgs = n,
						t.detailArgs = n,
						t.adviceArgs = n;
					var r = "Operation on the certificate maker failed with the error code " + e + " reported. Contact the administrator."
						, o = {};
					return o.descArgs = r,
						o.reasonArgs = r,
						o.detailArgs = r,
						o.adviceArgs = r,
					{
						zh_CN: t,
						en_US: o
					};
				}(t)),
			{
				errorCode: t,
				errorMsg: r,
				value: ""
			};
		}

		function re(e) {
			var n = "PIN码错误，再输错" + e + "次该USB Key的应用将被锁定。"
				, t = {};
			t.descArgs = n,
				t.reasonArgs = n,
				t.detailArgs = n,
				t.adviceArgs = n;
			var r = "Invalid PIN. If you enter invalid PINs for " + e + " more times, the USB key application will be locked."
				, o = {};
			return o.descArgs = r,
				o.reasonArgs = r,
				o.detailArgs = r,
				o.adviceArgs = r,
			{
				zh_CN: t,
				en_US: o
			};
		}

		function oe(e) {
			var n = !1;
			if (e && "string" == typeof e)
				try {
					JSON.parse(e) && (n = !0);
				} catch (e) {
					n = !1;
				}
			return n;
		}

		function ie(e, n, t, r) {
			ce().then((function () {
				var o = $.SOCKET_ROOT_URL + Q + "/websocket";
				try {
					V = new WebSocket(o);
				} catch (n) {
					return void e(te($.SOCKET_OPEN_FAILED));
				}
				V.addEventListener("open", (function () {
					return function (e) {
						V && V.readyState === WebSocket.OPEN ? (ee = !0,
							e(ae("Socket connected."))) : e(te($.SOCKET_OPEN_FAILED));
					}(e);
				}
				)),
					V.addEventListener("message", (function (e) {
						return function (e, n) {
							oe(e.data) ? n(JSON.parse(e.data)) : n(e.data);
						}(e, n);
					}
					)),
					V.addEventListener("error", (function () {
						return function (e) {
							e(te($.SOCKET_SERVER_ERROR));
						}(t);
					}
					)),
					V.addEventListener("close", (function () {
						return function (e) {
							e(ae("Socket closed."));
						}(r);
					}
					));
			}
			)).catch((function () {
				e(te($.SOCKET_OPEN_FAILED));
			}
			));
		}

		function ae(e) {
			return {
				errorCode: $.SOCKET_SUCCESS_CODE,
				errorMsg: "",
				value: e
			};
		}

		function ce() {
			return new Promise((function (e, n) {
				(function () {
					if (Q)
						return Promise.resolve();
					for (var e = [], n = 0; n < $.HTTPS_PORTS.length; n++) {
						var t = $.HTTPS_PORTS[n]
							, r = $.REST_ROOT_URL + t + "/getVersion";
						!function (n) {
							e.push(ne($.GET_TYPE, r).then((function () {
								Q = n;
							}
							)));
						}(t);
					}
					return Promise.all(e).then((function () {
						return Q ? Promise.resolve() : Promise.reject();
					}
					)).catch((function () {
						return Q ? Promise.resolve() : Promise.reject();
					}
					));
				}
				)().then((function () {
					return e();
				}
				)).catch((function () {
					return n(te($.CONNECT_REFUSED));
				}
				));
			}
			));
		}

		var se, le, ue = function () {
			return ce().then((function () {
				return e = $.REST_ROOT_URL + Q + "/getCertList",
					n = [],
					ne($.GET_TYPE, $.REST_ROOT_URL + Q + "/getDeviceList").then((function (t) {
						if (t.value)
							return t.value.reduce((function (t, r) {
								return t.then((function () {
									var t = {
										vid: r.vid,
										pid: r.pid,
										deviceSN: r.sn
									};
									return ne($.POST_TYPE, e, t).then((function (e) {
										e.value && e.value.forEach((function (e) {
											e.vid = r.vid,
												e.pid = r.pid,
												e.deviceSN = r.sn,
												n.push(e);
										}
										));
									}
									)).catch((function () {
									}
									));
								}
								));
							}
							), Promise.resolve());
					}
					)).then((function () {
						return {
							errorCode: $.HTTPS_SUCCESS_CODE,
							errorMsg: "",
							value: n
						};
					}
					));
				var e, n;
			}
			));
		}, fe = function (e, n, t, r) {
			ee || ie(e, n, t, r);
		}, de = function () {
			return V.send(JSON.stringify({
				event: "wsSubKeyEvent"
			})),
				ae("The command for subscribing to the key event was sent.");
		}, me = t(9), pe = function (e, n, t, r) {
			return new (t || (t = Promise))((function (o, i) {
				function a(e) {
					try {
						s(r.next(e));
					} catch (e) {
						i(e);
					}
				}

				function c(e) {
					try {
						s(r.throw(e));
					} catch (e) {
						i(e);
					}
				}

				function s(e) {
					var n;
					e.done ? o(e.value) : (n = e.value,
						n instanceof t ? n : new t((function (e) {
							e(n);
						}
						))).then(a, c);
				}

				s((r = r.apply(e, n || [])).next());
			}
			));
		}, he = function (e, n) {
			var t, r, o, i, a = {
				label: 0,
				sent: function () {
					if (1 & o[0])
						throw o[1];
					return o[1];
				},
				trys: [],
				ops: []
			};
			return i = {
				next: c(0),
				throw: c(1),
				return: c(2)
			},
				"function" == typeof Symbol && (i[Symbol.iterator] = function () {
					return this;
				}
				),
				i;

			function c(i) {
				return function (c) {
					return function (i) {
						if (t)
							throw new TypeError("Generator is already executing.");
						for (; a;)
							try {
								if (t = 1,
									r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
										0) : r.next) && !(o = o.call(r, i[1])).done)
									return o;
								switch (r = 0,
								o && (i = [2 & i[0], o.value]),
								i[0]) {
									case 0:
									case 1:
										o = i;
										break;
									case 4:
										return a.label++,
										{
											value: i[1],
											done: !1
										};
									case 5:
										a.label++,
											r = i[1],
											i = [0];
										continue;
									case 7:
										i = a.ops.pop(),
											a.trys.pop();
										continue;
									default:
										if (!(o = a.trys,
											(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
											a = 0;
											continue;
										}
										if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
											a.label = i[1];
											break;
										}
										if (6 === i[0] && a.label < o[1]) {
											a.label = o[1],
												o = i;
											break;
										}
										if (o && a.label < o[2]) {
											a.label = o[2],
												a.ops.push(i);
											break;
										}
										o[2] && a.ops.pop(),
											a.trys.pop();
										continue;
								}
								i = n.call(e, a);
							} catch (e) {
								i = [6, e],
									r = 0;
							} finally {
								t = o = 0;
							}
						if (5 & i[0])
							throw i[1];
						return {
							value: i[0] ? i[1] : void 0,
							done: !0
						};
					}([i, c]);
				};
			}
		};

		function ge() {
			P.a.getCookie("ukey_sn") && (!function () {
				var e = this
					, n = ue()
					, t = we();
				Promise.all([n, t]).then((function (n) {
					return pe(e, void 0, void 0, (function () {
						var e, t, r, o, i, a, c;
						return he(this, (function (s) {
							return e = (null === (i = n[0]) || void 0 === i ? void 0 : i.value) && n[0].value.filter((function (e) {
								return "1" == e.keyUsage;
							}
							)),
								t = n[1],
								r = e.map((function (e) {
									return e.sn.toLowerCase();
								}
								)),
								(o = (o = null === (c = null === (a = null == t ? void 0 : t.user) || void 0 === a ? void 0 : a.certificate) || void 0 === c ? void 0 : c.signature_cert_sn) && o.toLowerCase()) && !r.includes(o) && ye(),
								[2];
						}
						));
					}
					));
				}
				));
			}(),
				fe(ve, be, (function () {
				}
				), (function () {
				}
				)));
		}

		function ve() {
			return pe(this, void 0, void 0, (function () {
				return he(this, (function (e) {
					return de(),
						[2];
				}
				));
			}
			));
		}

		function be(e) {
			var n, t, r = null === (n = null == e ? void 0 : e.value) || void 0 === n ? void 0 : n.devSN;
			"keyRemove" === (null === (t = e.value) || void 0 === t ? void 0 : t.event) && we().then((function (e) {
				var n, t,
					o = null === (t = null === (n = null == e ? void 0 : e.user) || void 0 === n ? void 0 : n.certificate) || void 0 === t ? void 0 : t.ukey_sn;
				o && r && o.toLowerCase() === r.toLowerCase() && ye();
			}
			));
		}

		function we() {
			var e = this;
			return Object(o.a)().then((function (n) {
				return pe(e, void 0, void 0, (function () {
					var e, t, r;
					return he(this, (function (o) {
						switch (o.label) {
							case 0:
								return e = n.userId,
									n.hasAssumeRoleFlag && (e = null === (r = null === (t = n.assumedInfo) || void 0 === t ? void 0 : t.loginUserAccount) || void 0 === r ? void 0 : r.id),
									[4, K.getVDCServerUserRequest({
										user_id: e
									}).catch((function () {
										return [];
									}
									))];
							case 1:
								return [2, o.sent()];
						}
					}
					));
				}
				));
			}
			));
		}

		function ye() {
			var e = w.a.getAppWebPath() + "/logout";
			P.a.flushCookie(),
				P.a.removeParentCookie("selectedRegion"),
				P.a.removeParentCookie("serviceOperationMgrSelectedRegion"),
				P.a.removeParentCookie("projectId"),
				P.a.removeParentCookie("projectName"),
				P.a.removeParentCookie("projectAgencyId"),
				P.a.getCookie("ukey_sn") && P.a.removeParentCookie("ukey_sn"),
				window.location.href = me.a.xssEncode(e);
		}

		function xe(e) {
			var n, t, r, o;
			(new q).doTouch(),
				n = w.a.getAppWebPath() + "/s/momaintenance/static/favicon.ico",
				(t = new Image).onload = function () {
					var e = document.querySelector("link[rel*='icon']") || document.createElement("link");
					e.type = "image/x-icon",
						e.rel = "shortcut icon",
						e.href = n,
						document.getElementsByTagName("head")[0].appendChild(e);
				}
				,
				t.src = n,
				ge(),
				r = document.head || document.getElementsByTagName("head")[0],
				(o = document.createElement("script")).setAttribute("src", "/static/framework/2.0/monitor.js"),
				r.appendChild(o);
		}

		(function (e) {
			return R(this, void 0, void 0, (function () {
				var n;
				return L(this, (function (t) {
					switch (t.label) {
						case 0:
							return [4, Object(N.a)(e)];
						case 1:
							return n = t.sent(),
								[2, Object(N.c)(n)];
					}
				}
				));
			}
			));
		}
		)((le = null === (se = document.currentScript) || void 0 === se ? void 0 : se.src).slice(0, le.lastIndexOf("/"))).then((function (e) {
			_(e),
				xe();
		}
		));
	}
	, , function (e, n, t) {
		"use strict";
		t.r(n),
			t.d(n, "headerModuleConfig", (function () {
				return bt;
			}
			)),
			t.d(n, "sidebarModuleConfig", (function () {
				return wt;
			}
			)),
			t.d(n, "floatLayerModuleConfig", (function () {
				return yt;
			}
			));
		var r = t(0)
			, o = t.n(r)
			, i = t(71)
			, a = t.n(i);

		function c(e) {
			var n = e.children
				, t = e.backgroundColor
				, o = void 0 === t ? "inherit" : t
				, i = e.flexDirection
				, a = e.alignItems
				, c = e.justifyContent
				, s = e.height
				, l = e.width
				, u = e.padding
				, f = e.margin
				, d = e.color
				, m = {
					display: "flex",
					backgroundColor: o,
					flexDirection: i,
					alignItems: a,
					justifyContent: c,
					height: s,
					width: l,
					padding: u,
					margin: f,
					color: d,
					fill: e.fill || d,
					borderBottom: e.borderBottom
				};
			return r.createElement("div", {
				"data-testid": "mo-cf-component-layout-view",
				className: e.className,
				style: m
			}, n);
		}

		var s = t(28)
			, l = t(56)
			, u = t.n(l)
			, f = t(7)
			, d = t(1)
			, m = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			};
		var p = Object(f.b)((function (e) {
			return {
				license: e.license,
				user: e.user
			};
		}
		))((function (e) {
			var n = e.license
				, t = e.user
				, i = e.deps.intl
				, a = m(Object(r.useState)(!1), 2)
				, c = a[0]
				, l = a[1]
				, f = m(Object(r.useState)(""), 2)
				, p = f[0]
				, h = f[1]
				, g = []
				, v = !(!t || !t.userRoles) && d.a.isServiceOperationMgr(t.userRoles)
				, b = {
					isExistExpiredItems: i.get({
						id: "console_term_cloud_license_expired_items"
					}),
					isExistCloseToExpiredItems: i.get({
						id: "console_term_cloud_license_close_to_expired_items"
					}),
					isExistExcessItems: i.get({
						id: "console_term_cloud_license_excess_items"
					}),
					isExistThresholdCrossingItems: i.get({
						id: "console_term_cloud_license_threshold_items"
					})
				};
			return Object(r.useEffect)((function () {
				var e, t;
				(t = null === (e = null == n ? void 0 : n.licenseStatus) || void 0 === e ? void 0 : e.CloudStatus) && Object.keys(t).forEach((function (e) {
					t[e] && g.push(b[e]);
				}
				)),
					g.length > 0 && (l(!0),
						h(d.a.i18nReplace(i.get({
							id: "console_term_cloud_license_expired_label"
						}), {
							0: g.join("/")
						}))),
					setTimeout((function () {
						Object(s.c)(["top"]);
					}
					), 20);
			}
			), [n, v]),
				c && v ? o.a.createElement("div", {
					id: "mo-cf-license-reminder",
					className: u.a.headerRemainder
				}, o.a.createElement("span", {
					className: u.a.reminderIcon + " hwsicon-frame-image-tip"
				}), o.a.createElement("span", null, p)) : null;
		}
		))
			, h = function () {
				return (h = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			}
			, g = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			};
		var v = t(72)
			, b = t.n(v)
			, w = t(48)
			, y = t.n(w);

		function x(e) {
			var n = e.id
				, t = e.title
				, r = e.href
				, i = e.label
				, a = e.children
				, c = e.style
				, s = e.itemStyle
				, l = e.onClick;
			return o.a.createElement("div", {
				"data-testid": "mo-cf-component-menu-wrapper",
				id: n,
				className: y.a.cfMenuWrapper,
				title: t,
				style: c
			}, o.a.createElement("a", {
				"data-testid": "mo-cf-component-menu-wrapper-a",
				rel: "noopener noreferrer",
				className: y.a.menuText,
				href: r,
				onClick: l,
				style: s
			}, i), o.a.createElement("div", {
				className: y.a.menuDropWrapper
			}, a));
		}

		var k = t(18)
			, S = t(9)
			, E = t(73)
			, C = t.n(E);

		function A(e) {
			var n = e.id
				, t = e.children;
			return r.createElement("ul", {
				"data-testid": "mo-cf-component-dropdown-menu",
				id: n,
				className: C.a.menuDropWrapper
			}, t);
		}

		var I = t(49)
			, T = t.n(I);

		function P(e) {
			var n = e.children
				, t = e.href
				, r = e.target
				, i = e.onClick
				, a = e.hasBottomLine
				, c = e.style;
			return o.a.createElement(o.a.Fragment, null, o.a.createElement("li", {
				className: T.a.menuItem
			}, o.a.createElement("a", {
				"data-testid": "mo-cf-component-menu-item-li",
				className: T.a.menuItemText,
				href: t || "!#",
				target: r,
				style: c,
				rel: "noopener noreferrer",
				onClick: i
			}, n)), a && o.a.createElement("li", {
				className: T.a["menu-item-bottom-line"]
			}));
		}

		var O = function () {
			return (O = Object.assign || function (e) {
				for (var n, t = 1, r = arguments.length; t < r; t++)
					for (var o in n = arguments[t])
						Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
				return e;
			}
			).apply(this, arguments);
		}
			, _ = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			};

		function j(e, n) {
			var t = n;
			try {
				return (e = JSON.parse(e))[t];
			} catch (n) {
				return e;
			}
		}

		var N = Object(f.b)((function (e) {
			return {
				user: e.user,
				links: e.links,
				globalConfig: e.globalConfig
			};
		}
		))((function (e) {
			var n = e.menus
				, t = e.user
				, o = e.links
				, i = e.deps
				, a = e.globalConfig
				, c = i.intl
				, s = _(Object(r.useState)(!1), 2)
				, l = s[0]
				, u = s[1]
				, f = _(Object(r.useState)(""), 2)
				, m = f[0]
				, p = f[1]
				, h = _(Object(r.useState)(!0), 2)
				, g = h[0]
				, v = h[1]
				, w = _(Object(r.useState)({}), 2)
				, y = w[0]
				, E = w[1]
				, C = _(Object(r.useState)([]), 2)
				, I = C[0]
				, T = C[1]
				, N = _(Object(r.useState)(null), 2)
				, R = N[0]
				, L = N[1];
			return window.getMoCfContext().activeMenu$().subscribe((function (e) {
				p(e);
			}
			)),
				window.getMoCfContext().isMainMenuDisplay$().subscribe((function (e) {
					v(e);
				}
				)),
				Object(r.useEffect)((function () {
					var e;
					(e = null == t ? void 0 : t.userRoles) && 0 !== e.length && u("zh-cn" === c.locale),
						function () {
							var e = []
								, t = {};
							n.forEach((function (n) {
								n.action_key && e.push(n.action_key);
							}
							)),
								Object(k.a)(e).then((function (n) {
									n && n.length && e.forEach((function (e, r) {
										t[e] = n[r];
									}
									)),
										E(t);
								}
								));
						}(),
						function () {
							var e = null == t ? void 0 : t.userRoles
								, n = (null == o ? void 0 : o.tempLinks) || [];
							if (e && 0 !== e.length && 0 !== n.length) {
								var r = e.includes("mo_bss_adm") ? "custom_menu_mgr" : "custom_menu_vdc"
									, i = n.reverse().find((function (e) {
										return e.key === r && "title" === e.type;
									}
									));
								if (i) {
									i.label = j(i.text, c.locale);
									var a = n.filter((function (e) {
										return e.key === r && "title" !== e.type;
									}
									));
									a.forEach((function (e) {
										e.label = j(e.text, c.locale);
									}
									)),
										a = a.sort((function (e, n) {
											return parseInt(e.type) - parseInt(n.type);
										}
										)),
										L(i),
										T(a);
								}
							}
						}();
				}
				), [t, o]),
				g ? r.createElement("div", {
					id: "mo-cf-modules-main-menu",
					className: b.a.cfHeaderMenu
				}, n.map((function (e) {
					var n = d.a.getMenuHref(t.userRoles, e, t.isLoginUserFlag);
					e.action_key && (n = d.a.getMenuPermissionHref(t.userRoles, e, y[e.action_key])),
						"market" === e.id && (n = l ? n : null),
						(null == a ? void 0 : a.manageOneOnline) && (n = d.a.getMenuHref(t.userRoles, e, t.isLoginUserFlag));
					var i = {
						fontSize: "14px"
					};
					return m === e.id && (i = O(O({}, i), {
						borderBottom: "3px solid #96adfa",
						borderTop: "3px solid #fff0",
						color: "#96adfa"
					})),
						n ? r.createElement(x, {
							key: e.id,
							id: e.id,
							label: c.get({
								id: e.label
							}),
							style: i,
							href: "#",
							onClick: function (e) {
								return function (e, n) {
									var r;
									e.preventDefault();
									var i = null === (r = null == o ? void 0 : o.links) || void 0 === r ? void 0 : r[n]
										, a = null == t ? void 0 : t.userRoles;
									a && d.a.isServiceOperationMgr(a) && (-1 !== i.search("motenantconsolehomewebsite") && (i = i.replace("motenantconsolehomewebsite", "moserviceaccesswebsite"),
										i = d.a.replaceUrlHostName(i, "https://" + window.location.host + "/")),
										-1 !== i.search("movdcwebsite") && (i = i.replace("movdcwebsite", "moserviceaccesswebsite"),
											i = d.a.replaceUrlHostName(i, "https://" + window.location.host + "/")),
										-1 !== i.search("moproductwebsite") && (i = i.replace("moproductwebsite", "moserviceaccesswebsite"),
											i = d.a.replaceUrlHostName(i, "https://" + window.location.host + "/")),
										-1 !== i.search("motaskcenterwebsite") && (i = i.replace("motaskcenterwebsite", "moserviceaccesswebsite"),
											i = d.a.replaceUrlHostName(i, "https://" + window.location.host + "/"))),
										(i = d.a.genHWSHref(i)) && (i === window.location.href ? window.location.reload() : window.location.href = S.a.xssEncode(i));
								}(e, n);
							}
						}) : null;
				}
				)), R ? r.createElement(x, {
					key: R.key,
					id: R.key,
					label: R.label,
					style: {
						fontSize: "14px"
					}
				}, r.createElement(A, null, I.map((function (e) {
					return r.createElement(P, {
						key: e.key,
						href: "#",
						style: {
							fontSize: "12px"
						},
						onClick: function (n) {
							return function (e, n) {
								e.preventDefault(),
									window.open(S.a.xssEncode(n), "_blank").opener = null;
							}(n, e.href);
						}
					}, e.label);
				}
				)))) : null) : null;
		}
		))
			, R = t(57)
			, L = t.n(R)
			, F = t(3);
		var M = Object(f.b)((function (e) {
			return {
				links: e.links,
				user: e.user
			};
		}
		))((function (e) {
			var n, t = e.links, o = e.user,
				i = d.a.isServiceOperationMgr(null == o ? void 0 : o.userRoles) ? null : null === (n = null == t ? void 0 : t.links) || void 0 === n ? void 0 : n.portal_common;
			return r.createElement("a", {
				id: "mo-cf-modules-logo",
				className: L.a.logoContainer + " " + (i ? null : L.a.notHref),
				target: "_blank",
				rel: "noopener noreferrer",
				href: i || "#!",
				onClick: function (e) {
					i || e.preventDefault();
				}
			}, r.createElement("img", {
				src: F.a.getAppWebPath() + "/s/momaintenance/static/tenant_ManageOne_logo.png",
				alt: ""
			}));
		}
		))
			, U = t(58)
			, D = t.n(U)
			, z = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, B = t(29)
			, H = t.n(B)
			, W = t(23)
			, V = t.n(W)
			, Q = t(50)
			, G = t.n(Q);

		function q(e) {
			var n = e.user
				, t = e.selectRegionId
				, r = e.regionDisabled
				, i = e.projectList
				, a = e.regionId
				, c = e.onProjectChange;
			if (!i || i.length <= 0)
				return null;
			return o.a.createElement(o.a.Fragment, null, i.map((function (e) {
				var i = function (e, n, t, r, o) {
					var i = e === n && o.projectId === r.id;
					return G.a["projects-item"] + " " + (r.disable || t ? G.a["projects-item-disable"] : "") + " " + (i ? G.a["projects-item-selected"] : "");
				}(t, a, r, e, n);
				return o.a.createElement("li", {
					className: i,
					key: e.id,
					title: e.displayName,
					onClick: function (n) {
						return function (e, n) {
							e.stopPropagation(),
								e.preventDefault(),
								r || c(a, n);
						}(n, e);
					}
				}, e.displayName);
			}
			)));
		}

		var K = t(26)
			, J = t(17)
			, Y = t(37)
			, Z = t.n(Y)
			, X = function () {
				return (X = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			};
		var $, ee = function (e) {
			var n = e.width
				, t = e.searchRef
				, r = e.searchContent
				, i = e.style
				, a = e.placeholder
				, c = e.theme
				, s = e.size
				, l = e.onChange
				, u = e.onClick
				, f = Object(J.b)().intl.get({
					id: "console_term_search_placeholder"
				});
			return o.a.createElement("div", {
				onClick: function (e) {
					return e.stopPropagation();
				},
				"data-testid": "mo-cf-component-search-box",
				tabIndex: 0,
				className: Z.a.moCfSearchBoxContainer + " " + Z.a[c] + " " + Z.a[s],
				style: X({
					width: n
				}, i)
			}, o.a.createElement("input", {
				onClick: function (e) {
					return e.stopPropagation();
				},
				"data-testid": "mo-cf-component-search-box-input",
				ref: t,
				placeholder: a || f,
				onChange: l
			}), o.a.createElement("div", {
				"data-testid": "mo-cf-component-search-box-click",
				className: Z.a.moCfSearchBoxEmpty + " hwsicon-frame-service-close-window",
				style: {
					display: r ? "flex" : "none"
				},
				onClick: u
			}), o.a.createElement("div", {
				className: Z.a.moCfSearchBoxIcon
			}, o.a.createElement("svg", {
				version: "1.1",
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "16",
				viewBox: "0 0 30 32"
			}, o.a.createElement("path", {
				d: "M30.034 29.394l-5.684-5.684c2.819-2.499 4.602-6.050 4.602-9.996 0-7.558-6.491-13.714-14.476-13.714s-14.476 6.156-14.476 13.714c0 7.558 6.491 13.714 14.476 13.714 2.682 0 5.196-0.716 7.36-1.92l6.050 6.050c0.29 0.29 0.67 0.442 1.067 0.442s0.777-0.152 1.082-0.442c0.594-0.594 0.594-1.57 0-2.164zM3.048 13.714c0-5.882 5.12-10.667 11.429-10.667s11.429 4.785 11.429 10.667c0 5.882-5.12 10.667-11.429 10.667s-11.429-4.785-11.429-10.667z"
			}))));
		}, ne = function (e, n) {
			var t = "function" == typeof Symbol && e[Symbol.iterator];
			if (!t)
				return e;
			var r, o, i = t.call(e), a = [];
			try {
				for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
					a.push(r.value);
			} catch (e) {
				o = {
					error: e
				};
			} finally {
				try {
					r && !r.done && (t = i.return) && t.call(i);
				} finally {
					if (o)
						throw o.error;
				}
			}
			return a;
		};

		function te(e) {
			var n = e.intl
				, t = e.user
				, i = e.regionList
				, a = e.projectList
				, c = e.selectRegionId
				, s = e.isServiceOperationMgr
				, l = e.regionsListComponentToggleFlag
				, u = e.onProjectChangeCallback
				, f = e.isGotoConsole
				, m = ne(Object(r.useState)("0px"), 2)
				, p = m[0]
				, h = m[1]
				, g = ne(Object(r.useState)("0px"), 2)
				, v = g[0]
				, b = g[1]
				, w = ne(Object(r.useState)("0px"), 2)
				, y = w[0]
				, x = w[1]
				, k = ne(Object(r.useState)(!1), 2)
				, S = k[0]
				, E = k[1]
				, C = ne(Object(r.useState)(""), 2)
				, A = C[0]
				, I = C[1]
				, T = ne(Object(r.useState)([]), 2)
				, P = T[0]
				, O = T[1]
				, _ = Object(r.useRef)(null)
				, j = Object(r.useRef)(null);
			window.getMoCfContext().isChangeRegionReload$().subscribe((function (e) {
				E(e);
			}
			));
			var N = function (e, n) {
				u && u(!1),
					function (e, n) {
						n && (n.disable || Object(K.b)(n, t, e, a, i, f, S).then((function (e) {
						}
						)));
					}(e, n);
			};
			return Object(r.useEffect)((function () {
				var e, n = j.current;
				null === (e = null == n ? void 0 : n.offsetParent) || void 0 === e || e.addEventListener("click", (function (e) {
					$ = n.offsetParent.offsetTop + n.offsetParent.offsetHeight - 12 + "px",
						x($);
				}
				)),
					function () {
						var e = d.a.deepClone(i);
						if (A) {
							var n = e.filter((function (e) {
								return e.projects.some((function (e) {
									var n, t;
									return (null === (n = e.name) || void 0 === n ? void 0 : n.includes(A)) || (null === (t = e.displayName) || void 0 === t ? void 0 : t.includes(A));
								}
								));
							}
							));
							n.forEach((function (e) {
								e.projects = e.projects.filter((function (e) {
									var n, t;
									return (null === (n = e.name) || void 0 === n ? void 0 : n.includes(A)) || (null === (t = e.displayName) || void 0 === t ? void 0 : t.includes(A));
								}
								));
							}
							)),
								O(n);
						} else
							O(e);
					}();
			}
			), [j, A, i]),
				o.a.createElement("div", null, o.a.createElement("ul", {
					className: V.a.cfHeaderRegionWrapper,
					style: {
						visibility: l ? "visible" : "hidden",
						maxHeight: "calc(100vh - " + y + ")"
					}
				}, o.a.createElement(ee, {
					"data-testid": "mo-cf-component-select-search-box",
					width: "",
					theme: "dark",
					size: "small",
					style: {
						margin: "0 10px"
					},
					searchContent: A,
					searchRef: _,
					placeholder: n.get({
						id: "console_term_search_region_placeholder"
					}),
					onClick: function (e) {
						return (n = e).preventDefault(),
							n.stopPropagation(),
							I(""),
							void (_ && _.current && (_.current.value = ""));
						var n;
					},
					onChange: function (e) {
						e.target.value !== A && I(e.target.value.substring(0, 64)),
							e.target.value.length > 64 && (null == _ ? void 0 : _.current) && (_.current.value = e.target.value.substring(0, 64));
					}
				}), P.map((function (e, n) {
					var r = function (e, n) {
						return V.a["cf-header-region-list"] + " " + (e.disable ? V.a["cf-header-region-list-disable"] : "") + " " + (function (e, n) {
							return n === e.id || n === e.name;
						}(e, n) ? V.a["cf-header-region-list-selected"] : "");
					}(e, c);
					return o.a.createElement("li", {
						id: "mo-cf-region-item-" + n,
						className: r,
						style: {
							cursor: s ? "pointer" : "text"
						},
						key: e.id,
						onMouseEnter: function (e) {
							return function (e) {
								var n = e.target.getBoundingClientRect()
									, t = n.top + "px"
									, r = n.left + n.width + "px";
								h(t),
									b(r);
							}(e);
						},
						onClick: function (n) {
							return t = e.id,
								void (s && Object(K.c)(t, i));
							var t;
						}
					}, o.a.createElement("a", {
						className: V.a.cfHeaderRegionItem,
						title: e.name
					}, o.a.createElement("span", {
						className: V.a.cfHeaderRegionItemIcon + " hwsicon-frame-image-position"
					}), o.a.createElement("span", null, e.name), e.projects && e.projects.length > 0 && o.a.createElement("i", {
						className: V.a.cfHeaderRegionItemProjectsIcon
					})), e.projects && e.projects.length > 0 && o.a.createElement("ul", {
						className: V.a["cf-header-region-projects-wrapper"],
						style: {
							top: p,
							left: v,
							maxHeight: "calc(100vh - " + p + ")"
						}
					}, o.a.createElement(q, {
						user: t,
						selectRegionId: c,
						regionId: e.id,
						regionDisabled: e.disable,
						projectList: e.projects,
						onProjectChange: N
					})));
				}
				)), P && P.length || !A ? "" : o.a.createElement("li", {
					className: "" + V.a["cf-nodata-list-item"]
				}, o.a.createElement("span", null, n.get({
					id: "console_term_no_data_available"
				})))));
		}

		var re = function (e, n) {
			var t = "function" == typeof Symbol && e[Symbol.iterator];
			if (!t)
				return e;
			var r, o, i = t.call(e), a = [];
			try {
				for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
					a.push(r.value);
			} catch (e) {
				o = {
					error: e
				};
			} finally {
				try {
					r && !r.done && (t = i.return) && t.call(i);
				} finally {
					if (o)
						throw o.error;
				}
			}
			return a;
		}
			, oe = function (e, n) {
				for (var t = 0, r = n.length, o = e.length; t < r; t++,
					o++)
					e[o] = n[t];
				return e;
			};
		var ie = Object(f.b)((function (e) {
			return {
				user: e.user,
				region: e.region
			};
		}
		))((function (e) {
			var n, t = e.user, o = e.region, i = e.deps, a = e.globalData, c = i.intl,
				s = re(Object(r.useState)(!1), 2), l = s[0], u = s[1], f = re(Object(r.useState)(!1), 2), m = f[0],
				p = f[1], h = Object(r.useRef)(null), g = re(Object(r.useState)(!1), 2), v = g[0], b = g[1],
				w = d.a.isServiceOperationMgr(null == t ? void 0 : t.userRoles), y = oe([], re(o.regions));
			return window.getMoCfContext().isRegionDisplay$().subscribe((function (e) {
				p(e);
			}
			)),
				window.getMoCfContext().isDisplayAllRegions$().subscribe((function (e) {
					b(e);
				}
				)),
				Object(r.useEffect)((function () {
					function e(e) {
						h.current && !h.current.contains(e.target) && u(!1);
					}

					return document.addEventListener("mousedown", e),
						function () {
							document.removeEventListener("mousedown", e);
						};
				}
				), [h]),
				r.createElement("div", {
					id: "mo-cf-modules-region",
					className: H.a.cfHeaderRegionContainer,
					ref: h
				}, r.createElement("div", {
					className: H.a.cfHeaderRegion + " " + (l ? H.a.cfHeaderRegionWrapperShow : ""),
					onClick: function () {
						return u(!l);
					},
					style: {
						display: !1 === m ? "none" : ""
					}
				}, r.createElement("div", {
					className: H.a.cfHeaderRegionMenu
				}, r.createElement("span", {
					className: H.a.cfHeaderRegionIcon + " hwsicon-frame-image-position"
				}), r.createElement("span", {
					className: H.a.cfHeaderRegionText,
					title: (() => {
						return o.displayRegionName;
					})()
				}, o.displayRegionName), r.createElement("span", {
					className: H.a["cf-header-region-toggle-icon"] + " hwsicon-frame-image-caret"
				})), r.createElement("div", {
					id: "mo_cf_region_dropdown"
				}, r.createElement(te, {
					intl: c,
					user: t,
					regionList: (n = oe([], re(o.regions)),
						d.a.isMultiCloudScene(y) && !v && (n = y.filter((function (e) {
							return "master" === e.deployType;
						}
						))),
						n),
					projectList: o.projectList,
					selectRegionId: o.selectRegionId,
					isServiceOperationMgr: w,
					regionsListComponentToggleFlag: l,
					onProjectChangeCallback: function (e) {
						return u(e);
					},
					isGotoConsole: a.gotoServiceConsolePage
				}))));
		}
		))
			, ae = t(2)
			, ce = t(8)
			, se = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			};
		var le = function (e) {
			var n = e.deps
				, t = e.globalData
				, o = n.intl
				, i = t.supportedLanguages
				, a = i.filter((function (e) {
					return e.locale === o.locale;
				}
				))
				, c = i.filter((function (e) {
					return e.locale !== o.locale;
				}
				))
				, s = se(Object(r.useState)(!0), 2)
				, l = s[0]
				, u = s[1]
				, f = a[0];
			return window.getMoCfContext().isLanguageSwitchDisplay$().subscribe((function (e) {
				u(e);
			}
			)),
				l ? r.createElement(x, {
					id: "mo-cf-language-switch",
					label: f && f.displayName
				}, r.createElement(A, null, c.filter((function (e) {
					return e.locale !== f.locale;
				}
				)).map((function (e) {
					return r.createElement(P, {
						key: e.locale,
						href: "javascript:void(0)",
						onClick: function () {
							return function (e) {
								ae.a.setParentCookie("locale", e.locale),
									ce.a.locale.resolve(e.locale);
								var n = d.a.addOrReplaceUrlParameter(window.location.href, "locale", e.locale);
								n = S.a.xssEncode(n),
									window.location.href = n;
							}(e);
						}
					}, e.displayName);
				}
				)))) : null;
		}
			, ue = t(40)
			, fe = t.n(ue)
			, de = t(20);

		function me(e) {
			var n = e.name
				, t = e.agencyName
				, r = Object(de.b)();
			return o.a.createElement("div", {
				className: fe.a.userInfoContainer
			}, o.a.createElement("svg", {
				version: "1.1",
				xmlns: "http://www.w3.org/2000/svg",
				width: "32",
				height: "32",
				viewBox: "0 0 34 32"
			}, o.a.createElement("path", {
				d: "M32.8 16c0-0.704-0.064-1.392-0.144-2.064-1.008-7.728-7.536-13.744-15.504-13.92-0.112 0-0.24-0.016-0.352-0.016 0 0 0 0 0 0s0 0 0 0c-8.816 0-16 7.184-16 16 0 0 0 0 0 0s0 0 0 0c0 0.112 0.016 0.24 0.016 0.352 0.16 7.456 5.44 13.664 12.48 15.248 0 0 0.016 0 0.016 0 0.384 0.080 0.784 0.144 1.168 0.208 0.208 0.032 0.4 0.064 0.608 0.096 0.288 0.032 0.592 0.032 0.896 0.048 0.24 0.016 0.464 0.048 0.704 0.048 0.016 0 0.032 0 0.048 0s0.032 0 0.064 0c0 0 0 0 0 0s0 0 0 0c0.144 0 0.288-0.016 0.448-0.016 8.608-0.24 15.552-7.312 15.552-15.984 0 0 0 0 0 0s0 0 0 0zM16.8 30.4c-4.528 0-8.576-2.112-11.216-5.376 0.288-0.576 0.624-1.12 1.024-1.472 1.504-1.248 6.048-3.344 6.048-3.344l2.816 5.632 0.496-1.36-0.816-1.664 1.616-1.664 1.616 1.664-0.704 1.776 0.4 1.36 2.928-5.536c0 0 4.528 2.080 6.048 3.344 0.4 0.288 0.72 0.72 0.992 1.184-2.624 3.328-6.688 5.456-11.248 5.456zM22.688 12.48c0 2.688-2.32 7.632-5.888 7.728-3.472 0-5.888-4.944-5.888-7.728 0-2.688 0-7.424 5.888-7.424s5.888 4.736 5.888 7.424z"
			})), o.a.createElement("p", null, o.a.createElement("span", null, r.get({
				id: "console_term_userName_label"
			}) + ": "), o.a.createElement("span", {
				className: fe.a.userNameLabel,
				title: t || n
			}, t || n)), t ? o.a.createElement("p", null, o.a.createElement("span", null, r.get({
				id: "console_term_VDCTenantName_label"
			}) + ": "), o.a.createElement("span", {
				className: fe.a.userNameLabel,
				title: n
			}, n)) : null, o.a.createElement("div", {
				className: fe.a["bottom-line"]
			}));
		}

		var pe = t(51)
			, he = t.n(pe)
			, ge = t(4)
			, ve = function () {
				function e() {
				}

				return e.getTaskRequest = function () {
					var e = {
						url: F.a.getAppWebPath() + "/rest/task/v3.0/timerRequest/tasks",
						timeout: 6e4,
						params: {
							condition: {
								start: 0,
								limit: 5,
								own_tasks_only: !0
							}
						}
					};
					return ge.a.get(e);
				}
					,
					e.getTodosCount = function () {
						var e = {
							url: F.a.getAppWebPath() + "/goku/rest/todo/v1.0/timerRequest/count",
							timeout: 6e4,
							params: {
								status: "handling"
							}
						};
						return ge.a.get(e);
					}
					,
					e;
			}()
			, be = function () {
				function e() {
					this.cfInterval = {
						interval: null,
						handleVisibleChange: null,
						delay: 3e4,
						setInterval: function (e) {
							function n(n, t) {
								return e.apply(this, arguments);
							}

							return n.toString = function () {
								return e.toString();
							}
								,
								n;
						}((function (e, n) {
							this.interval = setInterval((function () {
								return e();
							}
							), n || this.delay);
						}
						)),
						clear: function () {
							clearInterval(this.interval),
								this.interval = null,
								document.removeEventListener("visibilitychange", this.handleVisibleChange, !1);
						}
					};
				}

				return e.prototype.setCfInterval = function (e, n) {
					var t = this
						, r = function () {
							t.cfInterval.setInterval(e, n);
						};
					r();
					var o = function () {
						document.hidden ? (clearInterval(t.cfInterval.interval),
							t.cfInterval.interval = null) : (e(),
								!t.cfInterval.interval && r());
					};
					document.addEventListener("visibilitychange", o, !1),
						this.cfInterval.handleVisibleChange = o;
				}
					,
					e.prototype.clearCfInterval = function () {
						this.cfInterval.clear();
					}
					,
					e;
			}()
			, we = function () {
				function e() {
				}

				return e.setCfInterval = function (e, n) {
					var t = new be;
					return t.setCfInterval(e, n),
						t;
				}
					,
					e;
			}()
			, ye = function () {
				return (ye = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			}
			, xe = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, ke = null;
		var Se = Object(f.b)((function (e) {
			return {
				user: e.user,
				links: e.links,
				globalConfig: e.globalConfig
			};
		}
		))((function (e) {
			var n = e.user
				, t = e.links
				, i = e.menus
				, a = e.deps
				, c = e.globalConfig
				, s = a.intl
				, l = xe(Object(r.useState)(""), 2)
				, u = l[0]
				, f = l[1]
				, m = xe(Object(r.useState)(""), 2)
				, p = m[0]
				, h = m[1]
				, g = xe(Object(r.useState)(null), 2)
				, v = g[0]
				, b = g[1]
				, w = xe(Object(r.useState)({}), 2)
				, y = w[0]
				, E = w[1]
				, C = xe(Object(r.useState)(0), 2)
				, I = C[0]
				, T = C[1]
				, O = {
					display: "inline-block",
					"white-space": "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis"
				}
				, _ = ye(ye({}, O), {
					color: "#5ecc49",
					maxWidth: "150px"
				})
				, j = ye(ye({}, O), {
					maxWidth: "210px",
					height: "50px",
					lineHeight: "50px"
				});

			function N() {
				ve.getTodosCount().then((function (e) {
					var n = e.total > 999 ? "999+" : e.total;
					T(n || 0);
				}
				));
			}

			return Object(r.useEffect)((function () {
				var e, t;
				return (null == n ? void 0 : n.hasAssumeRoleFlag) ? (f(n.shortName),
					h(null === (t = null === (e = n.assumedInfo) || void 0 === e ? void 0 : e.loginUserAccount) || void 0 === t ? void 0 : t.name),
					b(function (e) {
						return o.a.createElement("div", {
							className: he.a.moCfUserLabel
						}, o.a.createElement("span", {
							className: he.a.moCfUserLogo
						}, o.a.createElement("svg", {
							version: "1.1",
							xmlns: "http://www.w3.org/2000/svg",
							width: "16",
							height: "16",
							fill: "#fff",
							viewBox: "0 0 32 32"
						}, o.a.createElement("path", {
							d: "M22.618 17.444c2.060-1.832 3.382-4.472 3.382-7.444 0-5.522-4.478-10-10-10s-10 4.478-10 10c0 2.972 1.322 5.614 3.382 7.446-5.53 2.516-9.382 8.078-9.382 14.554h4c0-6.618 5.382-12 12-12s12 5.382 12 12h4c0-6.476-3.852-12.038-9.382-14.556zM16 16c-3.308 0-6-2.692-6-6s2.692-6 6-6 6 2.692 6 6-2.692 6-6 6z"
						}))), o.a.createElement("span", {
							style: _,
							title: e
						}, e));
					}(n.shortName))) : f(n.name),
					function () {
						var e = []
							, n = {};
						i.map((function (n) {
							return n.action_key && e.push(n.action_key),
								n;
						}
						)),
							Object(k.a)(e).then((function (t) {
								t && t.length && e.map((function (e, r) {
									return n[e] = t[r],
										e;
								}
								)),
									E(n);
							}
							));
					}(),
					!ke && N(),
					ke = we.setCfInterval(N, 3e4),
					function () {
						null == ke || ke.clearCfInterval();
					};
			}
			), [n]),
				o.a.createElement(x, {
					id: "mo-cf-modules-user-center",
					itemStyle: (null == n ? void 0 : n.isLoginUserFlag) ? j : {},
					title: (null == n ? void 0 : n.isLoginUserFlag) ? n.name : "",
					label: (null == n ? void 0 : n.isLoginUserFlag) ? n.name : v
				}, o.a.createElement(A, null, o.a.createElement(me, {
					name: u,
					agencyName: p
				}), i.map((function (e, r) {
					var a, l = d.a.getMenuPermissionHref(n.userRoles, e, y[e.action_key]);
					return "resource_set" === e.id && "sec_adm" === n.sm_tag && (l = null),
						["my_todos", "my_apply", "personal_setting"].includes(e.id) && (l = d.a.getMenuPermissionHref(n.userRoles, e, !0),
							e.needLoginUser && !(null == n ? void 0 : n.isLoginUserFlag) && (l = null)),
						(null == c ? void 0 : c.manageOneOnline) && (l = d.a.getMenuHref(n.userRoles, e, n.isLoginUserFlag)),
						l = null === (a = null == t ? void 0 : t.links) || void 0 === a ? void 0 : a[l],
						(l = d.a.genHWSHref(l)) ? o.a.createElement(P, {
							key: e.id,
							href: l,
							hasBottomLine: r === i.length - 1
						}, s.get({
							id: e.label
						}), "my_todos" === e.id && I ? o.a.createElement("span", {
							className: he.a.moCfCount
						}, "(", I, ")") : "") : null;
				}
				)), (null == n ? void 0 : n.isLoginUserFlag) ? null : o.a.createElement(P, {
					key: "change-role",
					hasBottomLine: !0,
					href: "#",
					onClick: function (e) {
						return function (e, n) {
							e.preventDefault(),
								Object(K.a)(n);
						}(e, n);
					}
				}, s.get({
					id: "console_term_changeAgency_label"
				})), o.a.createElement(P, {
					onClick: function (e) {
						return function (e, n) {
							e.preventDefault();
							var t = F.a.getAppWebPath() + "/logout?cftk=" + n.cftk;
							ae.a.flushCookie(),
								ae.a.removeParentCookie("selectedRegion"),
								ae.a.removeParentCookie("serviceOperationMgrSelectedRegion"),
								ae.a.removeParentCookie("projectId"),
								ae.a.removeParentCookie("projectName"),
								ae.a.removeParentCookie("projectAgencyId"),
								ae.a.getCookie("ukey_sn") && ae.a.removeParentCookie("ukey_sn"),
								window.location.href = S.a.xssEncode(t);
						}(e, n);
					},
					href: "#"
				}, s.get({
					id: "console_term_logout_button"
				}))));
		}
		))
			, Ee = t(41)
			, Ce = t.n(Ee)
			, Ae = t(59)
			, Ie = t.n(Ae);

		function Te(e) {
			var n = e.percent
				, t = e.bgColor;
			return n < 0 || n > 100 ? null : o.a.createElement("div", {
				className: Ie.a.progress
			}, o.a.createElement("div", {
				"data-testid": "mo-cf-component-process-bar",
				className: Ie.a.progressBar,
				"data-percent": n,
				style: {
					width: n + "%",
					maxWidth: n + "%",
					backgroundColor: t
				}
			}));
		}

		var Pe = function (e, n) {
			var t = "function" == typeof Symbol && e[Symbol.iterator];
			if (!t)
				return e;
			var r, o, i = t.call(e), a = [];
			try {
				for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
					a.push(r.value);
			} catch (e) {
				o = {
					error: e
				};
			} finally {
				try {
					r && !r.done && (t = i.return) && t.call(i);
				} finally {
					if (o)
						throw o.error;
				}
			}
			return a;
		}
			, Oe = {
				running: "console_term_status_running_label",
				finish: "console_term_status_finish_label",
				waiting: "console_term_status_waiting_label",
				timeout: "console_term_status_timeout_label",
				partialSuccess: "console_term_status_partialSuccess_label",
				fail: "console_term_status_fail_label"
			}
			, _e = null;
		var je = Object(f.b)((function (e) {
			return {
				links: e.links,
				user: e.user
			};
		}
		))((function (e) {
			var n = e.links
				, t = e.user
				, i = e.deps.intl
				, a = i.locale
				, c = null == n ? void 0 : n.links
				,
				s = !t || !t.userRoles || d.a.isServiceOperationMgr(t.userRoles) ? null == c ? void 0 : c.management_task_center_user_center : null == c ? void 0 : c.task_center_user_center
				, l = Pe(Object(r.useState)({
					tasks: []
				}), 2)
				, u = l[0]
				, f = l[1]
				, m = function () {
					ve.getTaskRequest().then((function (e) {
						f(e);
					}
					));
				};
			return Object(r.useEffect)((function () {
				return m(),
					_e = we.setCfInterval(m, 3e4),
					function () {
						null == _e || _e.clearCfInterval();
					};
			}
			), []),
				o.a.createElement(x, {
					id: "mo-cf-modules-task",
					label: o.a.createElement(o.a.Fragment, null, o.a.createElement("svg", {
						version: "1.1",
						xmlns: "http://www.w3.org/2000/svg",
						width: "16",
						height: "16",
						viewBox: "0 0 30 32"
					}, o.a.createElement("path", {
						d: "M8.304 12.48c-0.64 0-1.28 0.48-1.28 1.28s0.48 1.28 1.28 1.28h12.8c0.64 0 1.28-0.48 1.28-1.28s-0.48-1.28-1.28-1.28h-12.8zM21.104 19.52h-12.8c-0.64 0-1.28 0.48-1.28 1.28s0.48 1.28 1.28 1.28h12.8c0.64 0 1.28-0.48 1.28-1.28s-0.64-1.28-1.28-1.28zM27.824 3.68h-6.56v-2.080c0-0.96-0.64-1.6-1.6-1.6s-1.6 0.64-1.6 1.6v2.080h-6.4v-2.080c0-0.96-0.64-1.6-1.6-1.6s-1.6 0.8-1.6 1.6v2.080h-6.4c-0.8 0-1.6 0.64-1.6 1.6v25.12c0 0.8 0.64 1.6 1.6 1.6h25.76c0.8 0 1.6-0.64 1.6-1.6v-25.12c-0.16-0.96-0.8-1.6-1.6-1.6zM26.064 28.8h-22.4v-21.92h4.8v1.44c0 0.96 0.64 1.6 1.6 1.6s1.6-0.64 1.6-1.6v-1.44h6.4v1.44c0 0.96 0.64 1.6 1.6 1.6s1.6-0.64 1.6-1.6v-1.44h4.8v21.92z"
					})))
				}, o.a.createElement("div", {
					className: Ce.a.taskContainer
				}, o.a.createElement("table", null, o.a.createElement("thead", null, o.a.createElement("tr", null, o.a.createElement("th", null, i.get({
					id: "console_term_taskName_label"
				})), o.a.createElement("th", null, i.get({
					id: "console_term_status_label"
				})), o.a.createElement("th", null, i.get({
					id: "console_term_progress_label"
				})))), o.a.createElement("tbody", null, (null == u ? void 0 : u.tasks) && (null == u ? void 0 : u.tasks.length) > 0 ? null == u ? void 0 : u.tasks.map((function (e) {
					var n = JSON.parse(e.task_name)[a]
						, t = i.get({
							id: Oe[e.task_status]
						});
					return o.a.createElement("tr", {
						key: e.task_id
					}, o.a.createElement("td", {
						title: n
					}, n), o.a.createElement("td", null, o.a.createElement("div", {
						className: Ce.a.taskIcon + "-" + e.task_status
					}, t)), o.a.createElement("td", null, o.a.createElement(Te, {
						percent: e.execute_percent,
						bgColor: "#2486ff"
					})));
				}
				)) : o.a.createElement("tr", {
					className: Ce.a.moCfTableNodata
				}, o.a.createElement("td", {
					colSpan: 3
				}, i.get({
					id: "console_term_emptyTaskList_label"
				}))))), o.a.createElement("a", {
					className: Ce.a.taskMore,
					href: d.a.genHWSHref(s)
				}, i.get({
					id: "console_term_more_label"
				}))));
		}
		))
			, Ne = t(14)
			, Re = t.n(Ne)
			, Le = function () {
				function e() {
				}

				return e.getMessageRequest = function () {
					var e = {
						url: F.a.getAppWebPath() + "/rest/momaintenance/v1/timerRequest/announcements",
						timeout: 6e4,
						params: {
							start: 0,
							limit: 10,
							server: "SC",
							order_field: "PUBLISH_TIME",
							order_method: "desc",
							isread: !1
						}
					};
					return ge.a.get(e);
				}
					,
					e;
			}();

		function Fe(e) {
			return e.replace(/UTC/gi, "").replace(/[^\d]*$/, "").replace(/([+-]\d{2}):(\d{2})$/, "$1$2").replace(/\.\d*(\s*[+-]\d{4})?$/, "$1").replace(/-/g, "/").replace(/t/i, " ");
		}

		function Me(e, n, t) {
			for (var r = "" + e; r.length < n;)
				r = t + r;
			return r;
		}

		var Ue = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

		function De(e, n, t, r, o, i, a, c) {
			return (e = e || "%Y/%0m/%0d %0H:%0M:%0S").replace(/%Y/g, n).replace(/%m/g, t).replace(/%_m/g, Me(t, 2, " ")).replace(/%0m/g, Me(t, 2, "0")).replace(/%d/g, r).replace(/%_d/g, Me(r, 2, " ")).replace(/%0d/g, Me(r, 2, "0")).replace(/%H/g, o).replace(/%_H/g, Me(o, 2, " ")).replace(/%0H/g, Me(o, 2, "0")).replace(/%M/g, i).replace(/%_M/g, Me(i, 2, " ")).replace(/%0M/g, Me(i, 2, "0")).replace(/%S/g, a).replace(/%_S/g, Me(a, 2, " ")).replace(/%0S/g, Me(a, 2, "0")).replace(/%z/g, c.replace(":", "")).replace(/%:z/g, c).replace(/%b/g, Ue[t - 1]);
		}

		function ze(e, n, t) {
			var r, o = e.getDate();
			switch (t + 1) {
				case 2:
					var i = 0 == ((r = n) % 100 == 0 ? r % 400 : r % 4) ? 29 : 28;
					o = Math.min(i, o);
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					o = Math.min(30, o);
			}
			var a = new Date(e.getTime());
			return a.setFullYear(n, t, o),
				a;
		}

		function Be(e, n) {
			var t = new Date(e.getTime());
			return t.setDate(e.getDate() + n),
				t;
		}

		var He = function () {
			function e() {
			}

			return e.parseDate = function (n) {
				return n ? (e.date = n,
					n) : "";
			}
				,
				e.parseTimestamp = function (n) {
					return n ? (e.date = new Date(n),
						e.date) : "";
				}
				,
				e.parseTimestampSecond = function (n) {
					return n ? (e.date = new Date(1e3 * n),
						e.date) : "";
				}
				,
				e.parseUtcString = function (n) {
					return n ? (e.date = new Date(Fe(n) + " +0000"),
						e.date) : "";
				}
				,
				e.parseLocaleString = function (n) {
					return n ? (e.date = new Date(Fe(n)),
						e.date) : "";
				}
				,
				e.formatLocaleString = function (e, n) {
					if (!e)
						return "";
					var t = e
						, r = t.getFullYear()
						, o = t.getMonth() + 1
						, i = t.getDate()
						, a = t.getHours()
						, c = t.getMinutes()
						, s = t.getSeconds()
						, l = t.getTimezoneOffset();
					return De(n, r, o, i, a, c, s, (l > 0 ? "-" : "+") + Me(Math.abs(l) / 60, 2, "0") + ":" + Me(Math.abs(l) % 60, 2, "0"));
				}
				,
				e.formatUtcString = function (e, n) {
					if (!e)
						return "";
					var t = e;
					return De(n, t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), "+00:00");
				}
				,
				e.getDate = function () {
					return e.date || new Date;
				}
				,
				e.getDateFromCurrent = function (e, n, t) {
					var r = void 0;
					return r = t || new Date,
						"d" === n ? Be(r, e) : "w" === n ? Be(r, 7 * e) : "m" === n ? function (e, n) {
							var t = e.getFullYear()
								, r = e.getMonth()
								, o = (r + n) % 12;
							return o < 0 && (o += 12),
								ze(e, t + Math.floor((r + n) / 12), o);
						}(r, e) : "y" === n ? function (e, n) {
							var t = e.getFullYear()
								, r = e.getMonth();
							return ze(e, t + n, r);
						}(r, e) : void 0;
				}
				,
				e;
		}()
			, We = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, Ve = null;
		var Qe = Object(f.b)((function (e) {
			return {
				links: e.links,
				user: e.user
			};
		}
		))((function (e) {
			var n = e.links
				, t = e.user
				, i = e.deps.intl
				, a = null == n ? void 0 : n.links
				,
				c = !t || !t.userRoles || d.a.isServiceOperationMgr(t.userRoles) ? a.manager_messageNotification_list_home : a.messageNotification_list_home
				, s = We(Object(r.useState)({
					total: 0,
					notifys: []
				}), 2)
				, l = s[0]
				, u = s[1]
				, f = function () {
					Le.getMessageRequest().then((function (e) {
						u(e);
					}
					));
				};
			return Object(r.useEffect)((function () {
				return f(),
					Ve = we.setCfInterval(f, 3e4),
					function () {
						null == Ve || Ve.clearCfInterval();
					};
			}
			), []),
				o.a.createElement(x, {
					id: "mo-cf-modules-message",
					label: o.a.createElement(o.a.Fragment, null, o.a.createElement("svg", {
						version: "1.1",
						xmlns: "http://www.w3.org/2000/svg",
						width: "20",
						height: "16",
						viewBox: "0 0 30 32"
					}, o.a.createElement("path", {
						d: "M10.738 15.413h-1.778c-0.978 0-1.778-0.8-1.778-1.778s0.8-1.778 1.778-1.778h1.778c0.978 0 1.778 0.8 1.778 1.778s-0.782 1.778-1.778 1.778zM18.151 15.413h-1.778c-0.978 0-1.778-0.8-1.778-1.778s0.8-1.778 1.778-1.778h1.778c0.978 0 1.778 0.8 1.778 1.778s-0.8 1.778-1.778 1.778zM25.564 15.413h-1.778c-0.978 0-1.778-0.8-1.778-1.778s0.8-1.778 1.778-1.778h1.778c0.978 0 1.778 0.8 1.778 1.778s-0.8 1.778-1.778 1.778zM22.204 31.698c-0.284 0-0.569-0.071-0.836-0.213-0.587-0.302-0.942-0.907-0.942-1.564v-2.667h-17.387c-0.978 0-1.778-0.8-1.778-1.778v-23.698c0-0.978 0.8-1.778 1.778-1.778h29.636c0.978 0 1.778 0.8 1.778 1.778v23.698c0 0.978-0.8 1.778-1.778 1.778h-3.769c-1.76 1.298-4.427 3.271-5.724 4.142-0.284 0.213-0.64 0.302-0.978 0.302zM4.818 23.698h17.387c0.978 0 1.778 0.8 1.778 1.778v0.996c1.262-0.924 2.542-1.884 3.271-2.418 0.302-0.231 0.676-0.356 1.067-0.356h2.578v-20.142h-26.080v20.142z"
					})), (null == l ? void 0 : l.total) > 0 ? o.a.createElement("strong", {
						className: Re.a.messageBadge
					}, (null == l ? void 0 : l.total) > 99 ? "99+" : null == l ? void 0 : l.total) : null)
				}, o.a.createElement("div", {
					className: Re.a.newNoticeContainer
				}, o.a.createElement("div", {
					className: Re.a.noticeContentContainer
				}, l.total > 0 ? o.a.createElement("div", {
					className: Re.a.noticeWithContent
				}, l.notifys.map((function (e) {
					var n = d.a.genHWSHref(c + "?noticeId=" + e.id);
					return o.a.createElement("a", {
						key: e.id,
						className: Re.a.noticeItem,
						href: n
					}, o.a.createElement("span", {
						className: Re.a.noticeTitle + " " + Re.a.messageText,
						title: e.title
					}, e.title), o.a.createElement("span", {
						className: Re.a.noticeTime
					}, He.formatLocaleString(He.parseTimestamp(parseInt(e.publish_time)))), o.a.createElement("div", {
						className: "" + Re.a.messageText
					}, e.content));
				}
				))) : o.a.createElement("div", {
					className: Re.a.noticeEmpty
				}, o.a.createElement("span", {
					className: Re.a.noticeEmptyImage
				}), o.a.createElement("span", null, i.get({
					id: "console_term_noMessage_tip"
				}))), o.a.createElement("a", {
					className: Re.a.noticeMore,
					href: d.a.genHWSHref(c)
				}, i.get({
					id: "console_term_more_label"
				})))));
		}
		))
			, Ge = t(47);
		var qe = Object(f.b)((function (e) {
			return {
				links: e.links,
				user: e.user
			};
		}
		))((function (e) {
			var n = e.links
				, t = e.user
				, r = e.deps.intl
				, i = null == n ? void 0 : n.links
				, a = (null == t ? void 0 : t.manageOneVersion) || "";
			return o.a.createElement(x, {
				id: "mo-cf-modules-help",
				label: o.a.createElement(o.a.Fragment, null, o.a.createElement("svg", {
					version: "1.1",
					xmlns: "http://www.w3.org/2000/svg",
					width: "20",
					height: "16",
					viewBox: "0 0 30 32"
				}, o.a.createElement("path", {
					d: "M16.204 32c-8.829 0-16-7.171-16-16s7.171-16 16-16 16 7.171 16 16-7.171 16-16 16zM16.204 2.909c-7.215 0-13.091 5.876-13.091 13.091s5.876 13.091 13.091 13.091c7.215 0 13.091-5.876 13.091-13.091s-5.862-13.091-13.091-13.091zM17.833 18.647v-1.687c0.116-0.175 0.407-0.451 0.611-0.582 0.669-0.291 3.738-1.76 3.738-4.567 0-2.865-2.4-5.207-5.353-5.207-3.738 0-5.484 3.113-5.484 5.207 0 0.8 0.655 1.455 1.455 1.455s1.455-0.655 1.455-1.455c0-0.029 0.145-2.298 2.575-2.298 1.353 0 2.444 1.033 2.444 2.298 0 0.8-1.382 1.644-2.007 1.905-0.044 0.015-0.087 0.044-0.131 0.058-0.713 0.378-2.182 1.615-2.182 3.011v1.847c0 0.8 0.655 1.455 1.455 1.455s1.425-0.64 1.425-1.44zM16.204 21.745c-1.207 0-2.182 0.975-2.182 2.182s0.975 2.182 2.182 2.182 2.182-0.975 2.182-2.182-0.975-2.182-2.182-2.182z"
				})))
			}, o.a.createElement(A, null, o.a.createElement(P, {
				key: "help-center",
				href: d.a.genHWSHref(i.help_center_common, "locale"),
				target: "_blank"
			}, r.get({
				id: "console_term_helpCenter_label"
			})), "zh-cn" === (null == r ? void 0 : r.locale) ? o.a.createElement(P, {
				key: "feedback",
				href: r.get({
					id: "feedback_url"
				}),
				target: "_blank"
			}, r.get({
				id: "console_term_feedback_label"
			})) : null, d.a.isServiceOperationMgr(null == t ? void 0 : t.userRoles) ? o.a.createElement(P, {
				key: "about",
				href: "javascript:void(0);",
				onClick: function (e) {
					var n = Ge.a.init();
					n.update({
						type: "info",
						title: r.get({
							id: "console_term_about_label"
						}),
						closable: !0,
						okBtnVisible: !0,
						focused: "ok",
						width: 600,
						okText: "OK",
						onOk: function () {
							n.destroy();
						},
						cancelBtnVisible: !1,
						content: o.a.createElement("div", null, a ? o.a.createElement("div", null, o.a.createElement("span", null, r.get({
							id: "console_term_version_label"
						}) + ": "), o.a.createElement("span", {
							style: {
								fontWeight: "bold"
							}
						}, a)) : "", o.a.createElement("div", null, o.a.createElement("span", null, r.get({
							id: "console_term_warning_value"
						}) + ": "), o.a.createElement("span", null, r.get({
							id: "console_term_declaration_label"
						}))))
					});
				}
			}, r.get({
				id: "console_term_about_label"
			})) : null));
		}
		))
			, Ke = function () {
				function e() {
				}

				return e.getShoppingCartRequest = function () {
					var e = {
						url: F.a.getAppWebPath() + "/rest/shoppingcart/v3.0/timerRequest/subscriptions",
						timeout: 6e4,
						params: {
							start: 0,
							limit: 10,
							sort_key: "add_time",
							sort_dir: "desc"
						}
					};
					return ge.a.get(e);
				}
					,
					e;
			}()
			, Je = t(74)
			, Ye = t.n(Je)
			, Ze = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, Xe = null;
		var $e = Object(f.b)((function (e) {
			return {
				links: e.links,
				user: e.user
			};
		}
		))((function (e) {
			var n = e.links
				, t = e.user
				, i = e.deps.intl
				, a = null == n ? void 0 : n.links
				, c = !t || !t.userRoles || d.a.isServiceOperationMgr(t.userRoles)
				, s = Ze(Object(r.useState)(0), 2)
				, l = s[0]
				, u = s[1]
				, f = Ze(Object(r.useState)(!1), 2)
				, m = f[0]
				, p = f[1]
				, h = function () {
					!c && m && Ke.getShoppingCartRequest().then((function (e) {
						u(e.total);
					}
					));
				};
			return Object(r.useEffect)((function () {
				return Object(k.b)("moscapp:personal-center-orders:console").then((function (e) {
					p(e);
				}
				)),
					m && (h(),
						Xe = we.setCfInterval(h, 6e4)),
					function () {
						null == Xe || Xe.clearCfInterval();
					};
			}
			), [m]),
				!c && m ? o.a.createElement(x, {
					id: "mo-cf-modules-shopping-cart",
					label: o.a.createElement(o.a.Fragment, null, o.a.createElement("svg", {
						version: "1.1",
						xmlns: "http://www.w3.org/2000/svg",
						width: "20",
						height: "16",
						fill: "rgb(173, 176, 184)",
						viewBox: "0 0 30 32"
					}, o.a.createElement("path", {
						d: "M25.984 25.328c-1.648 0-2.992 1.264-2.992 2.816s1.344 2.816 2.992 2.816 2.992-1.264 2.992-2.816-1.344-2.816-2.992-2.816zM9.2 25.328c-1.648 0-2.992 1.264-2.992 2.816s1.344 2.816 2.992 2.816 2.992-1.264 2.992-2.816-1.328-2.816-2.992-2.816zM25.792 22.525h-16.752c-1.12 0-2.096-0.8-2.336-1.888l-3.76-17.44h-2.944v-3.2h3.584c1.12 0 2.096 0.8 2.336 1.888l3.76 17.44h15.488l2.72-10.096h-17.184v-3.2h18.256c0.752 0 1.44 0.336 1.904 0.944 0.464 0.592 0.608 1.36 0.416 2.080l-3.168 11.712c-0.288 1.040-1.232 1.76-2.32 1.76v0z"
					})), l > 0 ? o.a.createElement("strong", {
						className: Ye.a.shoppingCartBadge
					}, l > 99 ? "99+" : l) : null),
					href: d.a.genHWSHref(a.shopping_cart_manage_list),
					title: i.get({
						id: "console_term_shoppingCart_label"
					})
				}) : null;
		}
		))
			, en = t(52)
			, nn = t.n(en)
			, tn = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			};

		function rn(e) {
			return e.split(" ").map((function (e) {
				return "" + nn.a[e];
			}
			)).join(" ");
		}

		function on(e) {
			return void 0 === e && (e = !0),
				rn(e ? "cf-sidebar cf-sidebar-mini" : "cf-sidebar");
		}

		var an = Object(f.b)((function (e) {
			return {
				user: e.user,
				area: e.area,
				safearea: e.safearea
			};
		}
		))((function (e) {
			var n = e.blackRoles
				, t = e.children
				, i = e.user
				, a = e.area
				, c = e.safearea
				, l = e.dispatch
				, u = a.hasExpandServiceList
				, f = a.isInDrag
				, m = tn(Object(r.useState)(!0), 2)
				, p = m[0]
				, h = m[1]
				, g = tn(Object(r.useState)(null), 2)
				, v = g[0]
				, b = g[1]
				, w = tn(Object(r.useState)(null), 2)
				, y = w[0]
				, x = w[1]
				, k = tn(Object(r.useState)(!0), 2)
				, S = k[0]
				, E = k[1];
			window.getMoCfContext().isSidebarDisplay$().subscribe((function (e) {
				E(e);
			}
			)),
				Object(r.useEffect)((function () {
					"" === u && setTimeout((function () {
						return h(!0);
					}
					), 100);
				}
				), [u]);
			var C, A = !1;
			return i && i.userRoles && (A = !d.a.isBlackRolesEffects(n, null == i ? void 0 : i.userRoles)),
				Object(r.useEffect)((function () {
					Object(s.c)(["left"]);
				}
				), [A, S]),
				A && S ? o.a.createElement("div", {
					id: "mo-cf-modules-side-bar",
					className: "js-cf-sidebar " + on(p),
					style: {
						top: c.top
					},
					onMouseEnter: function () {
						y && clearTimeout(y);
						var e = setTimeout((function () {
							return h(!1);
						}
						), 300);
						b(e);
					},
					onMouseLeave: function () {
						if (v && clearTimeout(v),
							!u && !f) {
							var e = setTimeout((function () {
								return h(!0);
							}
							), 100);
							x(e);
						}
					}
				}, o.a.createElement("div", {
					className: nn.a["cf-sidebar-wrapper"]
				}, o.a.createElement("div", {
					className: (C = u,
						void 0 === C && (C = !1),
						rn(C ? "cf-sidebar-mask-wrapper cf-sidebar-mask-wrapper-show" : "cf-sidebar-mask-wrapper")),
					onClick: function () {
						l({
							type: "UPDATE_SERVICE_LIST_EXPAND",
							payload: {
								hasExpandServiceList: ""
							}
						});
					}
				}), o.a.createElement("div", {
					id: "cf-sidebar-panel",
					className: nn.a["cf-sidebar-panel"]
				}, t))) : o.a.createElement("div", {
					className: "js-cf-sidebar",
					style: {
						display: "none"
					}
				});
		}
		))
			, cn = t(34)
			, sn = t.n(cn)
			, ln = t(24)
			, un = t.n(ln)
			, fn = t(19)
			, dn = t.n(fn);
		var mn = function (e, n) {
			var t = "function" == typeof Symbol && e[Symbol.iterator];
			if (!t)
				return e;
			var r, o, i = t.call(e), a = [];
			try {
				for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
					a.push(r.value);
			} catch (e) {
				o = {
					error: e
				};
			} finally {
				try {
					r && !r.done && (t = i.return) && t.call(i);
				} finally {
					if (o)
						throw o.error;
				}
			}
			return a;
		};

		function pn() {
			var e, n, t, o = mn(Object(r.useState)({
				width: window.innerWidth,
				height: window.innerHeight
			}), 2), i = o[0], a = o[1], c = (e = function () {
				a({
					width: window.innerWidth,
					height: window.innerHeight
				});
			}
				,
				n = 50,
				function () {
					for (var r = [], o = 0; o < arguments.length; o++)
						r[o] = arguments[o];
					t && clearTimeout(t),
						t = setTimeout((function () {
							t = null,
								e.apply(null, r);
						}
						), n);
				}
			);
			return Object(r.useEffect)((function () {
				return window.addEventListener("resize", c),
					function () {
						return window.removeEventListener("resize", c);
					};
			}
			), []),
				i;
		}

		var hn = t(27)
			, gn = t(35)
			, vn = t(33)
			, bn = t(10)
			, wn = t(25)
			, yn = t(11)
			, xn = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}
			, kn = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}
			, Sn = function () {
				function e() {
				}

				return e.getCftk = function (e) {
					return xn(this, void 0, void 0, (function () {
						var n, t, r;
						return kn(this, (function (o) {
							switch (o.label) {
								case 0:
									return n = ae.a.getCookie("cfRefreshFlag").toString(),
										t = ae.a.getSessionStorage("cfSessionRefreshFlag").toString(),
										n === t ? [3, 1] : (this.cftk = null == e ? void 0 : e.cftk,
											[3, 3]);
								case 1:
									return [4, Object(bn.a)(!0)];
								case 2:
									r = o.sent(),
										this.cftk = null == r ? void 0 : r.cftk,
										ae.a.setSessionStorage("cfSessionRefreshFlag", n),
										ce.a.user.resolve(Object(wn.c)(r)),
										yn.a.dispatch({
											type: "UPDATE_USER_ALL",
											payload: r
										}),
										o.label = 3;
								case 3:
									return [2, this.cftk];
							}
						}
						));
					}
					));
				}
					,
					e;
			}()
			, En = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}
			, Cn = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}
			, An = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, In = function (e, n) {
				for (var t = 0, r = n.length, o = e.length; t < r; t++,
					o++)
					e[o] = n[t];
				return e;
			};

		function Tn(e) {
			var n = e.id
				, t = e.shortName
				, r = e.endpoint
				, o = e.name
				, i = e.serviceCss
				, a = e.serviceIcon
				, c = e.visible
				, s = e.href;
			return {
				shortName: t,
				endpoint: r || s,
				name: o,
				endpointId: n || "",
				serviceCss: i || "",
				serviceIcon: a || "",
				visible: c,
				collectType: "product" === e.endpointType ? "product" : "endpoint"
			};
		}

		var Pn = function (e) {
			var n = e.dispatch
				, t = e.user
				, i = e.endpoint
				, a = e.links
				, c = e.search
				, s = e.currentProject
				, l = e.currentRegion
				, u = e.setFilterState
				, f = e.globalData
				, m = e.region
				, p = e.hcsoUrl
				, h = Object(de.b)()
				, g = pn()
				, v = i.serviceEndpoints
				, b = i.endpointCollects
				, w = (null == b ? void 0 : b.length) > 0 ? b.map((function (e) {
					return e.endpointId.toLowerCase();
				}
				)) : []
				, y = An(Object(r.useState)({}), 2)
				, x = y[0]
				, E = y[1]
				, C = An(Object(r.useState)([]), 2)
				, A = C[0]
				, I = C[1]
				, T = An(Object(r.useState)([]), 2)
				, P = T[0]
				, O = T[1]
				, _ = An(Object(r.useState)(!1), 2)
				, j = _[0]
				, N = _[1]
				, R = "HYBRID_CLOUD" === f.WorkScene
				, L = ["ces"];

			function F(e, n) {
				for (var t = [], r = [], o = 0; o < e.subCatalogs.length; o++) {
					var i = e.subCatalogs[o];
					t = [];
					for (var a = 0; a < i.endpoints.length; a++) {
						var c = i.endpoints[a];
						if (!1 !== c.visible && (("federation" !== l.cfType || c.id.startsWith("huaweicloud") || c.serviceType && c.serviceType.startsWith("huaweicloud")) && (!R || !L.includes(c.id) && !L.includes(c.serviceType)))) {
							var s = c.description ? c.description.toLowerCase() : ""
								, u = c.name ? c.name.toLowerCase() : ""
								, f = c.shortName ? c.shortName.toLowerCase() : ""
								, d = c.id ? c.id.toLowerCase() : ""
								, m = c.catalogCss ? c.catalogCss.toLowerCase() : ""
								, p = c.serviceCss ? c.serviceCss.toLowerCase() : ""
								, h = c.serviceType ? c.serviceType.toLowerCase() : "";
							d === n ? t.unshift(c) : -1 === s.indexOf(n) && -1 === u.indexOf(n) && -1 === f.indexOf(n) && -1 === d.indexOf(n) && -1 === m.indexOf(n) && -1 === p.indexOf(n) && -1 === h.indexOf(n) || t.push(c);
						}
					}
					t.length > 0 && r.push({
						catalog: i.catalog,
						catalogOrder: i.catalogOrder,
						endpoints: t
					});
				}
				return r;
			}

			function M(e, r) {
				var o, i;
				return En(this, void 0, void 0, (function () {
					var a, c, s, l;
					return Cn(this, (function (u) {
						switch (u.label) {
							case 0:
								return j ? [2] : (a = b.find((function (n) {
									return e.serviceType && e.serviceType.startsWith("service-") && n.endpointId === e.serviceType;
								}
								)),
									function (e) {
										n({
											type: "UPDATE_COLLECTED_ENDPOINT",
											payload: {
												endpointCollects: e
											}
										});
									}(r ? b.filter((function (n) {
										return a ? n.endpointId !== e.serviceType : n.endpointId !== e.id;
									}
									)) : In(In([], An(b)), [Tn(e)])),
									[4, Sn.getCftk(t)]);
							case 1:
								return c = u.sent(),
									s = {
										user_id: (null == t ? void 0 : t.isLoginUserFlag) ? t.userId : null === (i = null === (o = t.assumedInfo) || void 0 === o ? void 0 : o.loginUserAccount) || void 0 === i ? void 0 : i.id,
										id: a ? e.serviceType : e.id,
										region_id: e.regionId,
										headers: {
											cftk: c
										}
									},
									l = r ? hn.a.deleteFavoriteEndpointRequest(s) : hn.a.addFavoriteEndpointRequest(s),
									N(!0),
									l.finally((function () {
										N(!1);
									}
									)),
									[2];
						}
					}
					));
				}
				));
			}

			function U(e, r) {
				var o;
				return En(this, void 0, void 0, (function () {
					var i, c, u, f, p, h, g, v, b, w, y, x, k, E, C, A, I, T;
					return Cn(this, (function (P) {
						switch (P.label) {
							case 0:
								return e.preventDefault(),
									n({
										type: "UPDATE_SERVICE_LIST_EXPAND",
										payload: {
											hasExpandServiceList: ""
										}
									}),
									i = r.endpoint,
									c = r.href,
									u = r.id,
									f = r.serviceType,
									p = i || (null == a ? void 0 : a.links[c]),
									"custom_service_type" === f && "hcso_home_url" === u ? (y = p.split("&service=")[0],
										x = decodeURIComponent(p.split("&service=")[1]),
										x = d.a.genHWSHref(x, "locale"),
										p = y + "&service=" + encodeURIComponent(x),
										p = S.a.xssEncode(p),
										window.open(p, "_blank").opener = null,
										[2]) : u.startsWith("huaweicloud") || f && f.startsWith("huaweicloud") ? (h = null === (o = m.federationLinks) || void 0 === o ? void 0 : o.find((function (e) {
											return e.region_id === l.id;
										}
										)),
											g = null == h ? void 0 : h.url,
											v = d.a.getParameterFromUri(g, "domain_id"),
											b = d.a.getParameterFromUri(g, "idp"),
											p = d.a.i18nReplace(p, {
												domain_id: v
											}),
											p = d.a.i18nReplace(p, {
												idp: b
											}),
											y = p.split("&service=")[0],
											x = decodeURIComponent(p.split("&service=")[1]),
											x = d.a.genHWSHref(x, "locale"),
											p = y + "&service=" + encodeURIComponent(x),
											p = S.a.xssEncode(p),
											window.open(p, "_blank").opener = null,
											[2]) : d.a.isCrsBorrowService(p) ? (w = t.name,
												y = p.split("&service=")[0],
												x = p.split("&service=")[1],
												y = d.a.i18nReplace(y, {
													userName: encodeURIComponent(w)
												}),
												x = d.a.genHWSHref(x, "locale"),
												[4, vn.a.getHcsProjectRelations(s.id)]) : [3, 2];
							case 1:
								return (k = P.sent()) && (x = d.a.addOrReplaceUrlParameter(x, "region", encodeURIComponent(k))),
									(E = null == l ? void 0 : l.globalId) && (x = d.a.addOrReplaceUrlParameter(x, "regionId", encodeURIComponent(E))),
									p = y + "&service=" + encodeURIComponent(x),
									p = S.a.xssEncode(p),
									window.open(p, "_blank").opener = null,
									[2];
							case 2:
								return C = s.name,
									A = s.id,
									I = l.id,
									ae.a.setParentCookie("selectedRegion", I),
									ae.a.setParentCookie("projectName", C),
									ae.a.setParentCookie("projectId", A),
									d.a.isSlaveRegion(l) && I === r.regionId && "global" !== r.deployMode ? [4, Object(gn.b)(p, I, C).catch((function () {
										return "";
									}
									))] : [3, 4];
							case 3:
								return (T = P.sent()) && (T = S.a.xssEncode(T),
									window.open(T, "_blank").opener = null),
									[2];
							case 4:
								return p = p ? d.a.genHWSHref(p, !1, {
									region: C
								}) : p,
									p = S.a.xssEncode(p),
									i === window.location.href ? window.location.reload() : window.location.href = i ? p : d.a.addOrReplaceParamsEndOfUrl(p, "productId", u),
									[2];
						}
					}
					));
				}
				));
			}

			return Object(r.useEffect)((function () {
				Object(k.a)(["moscapp:tags:console", "moscapp:resource-recyclebin:console"]).then((function (e) {
					var n = An(e, 2)
						, t = n[0]
						, r = n[1];
					E({
						tag: t,
						recyclebin: r
					});
				}
				));
				var e = function (e, n) {
					var t = function (e) {
						if (!l)
							return [];
						var n = []
							, t = e.some((function (e) {
								return e.subCatalogs.some((function (e) {
									return e.endpoints.some((function (e) {
										return d.a.isCrsBorrowService(e.endpoint);
									}
									));
								}
								));
							}
							));
						if (e && e.length > 0)
							for (var r = 0; r < e.length; r++) {
								for (var o = [], i = [], a = e[r], c = 0; c < a.subCatalogs.length; c++) {
									o = [];
									for (var s = a.subCatalogs[c], u = 0; u < s.endpoints.length; u++) {
										var f = s.endpoints[u];
										!1 !== f.visible && (("federation" !== l.cfType || f.id.startsWith("huaweicloud") || f.serviceType && f.serviceType.startsWith("huaweicloud")) && ("federation" !== l.cfType && "mix" !== l.cfType && f.serviceType && f.serviceType.startsWith("huaweicloud") || t && !d.a.isCrsBorrowService(f.endpoint) || R && (L.includes(f.id) || L.includes(f.serviceType)) || f.id && Object.keys(x).includes(f.id) && !x[f.id] || o.push(f)));
									}
									o.length > 0 && i.push({
										catalog: s.catalog,
										catalogOrder: s.catalogOrder,
										endpoints: o
									});
								}
								i.length > 0 && n.push({
									catalog: e[r].catalog,
									catalogOrder: e[r].catalogOrder,
									subCatalogs: i
								});
							}
						return n;
					}(e);
					if (function (e) {
						if (p) {
							var n = {
								catalog: "{\"zh-cn\":\"HCSO\",\"en-us\":\"HCSO\"}",
								subCatalogs: [{
									catalog: "{\"zh-cn\":\"控制台\",\"en-us\":\"Console\"}",
									endpoints: [{
										name: h.get({
											id: "console_term_homePage_label"
										}),
										visible: !0,
										regionId: null == l ? void 0 : l.id,
										endpoint: p,
										id: "hcso_home_url",
										serviceType: "custom_service_type"
									}]
								}]
							};
							e.unshift(n);
						}
					}(t),
						!n)
						return t;
					var r = [];
					if (t && t.length > 0)
						for (var o = 0; o < t.length; o++) {
							if (-1 !== (t[o].catalog && JSON.parse(t[o].catalog)[h.locale] ? JSON.parse(t[o].catalog)[h.locale].toLowerCase() : "").indexOf(n.toLowerCase()))
								r.push(t[o]);
							else {
								var i = F(t[o], n.toLowerCase());
								i.length > 0 && r.push({
									catalog: t[o].catalog,
									catalogOrder: t[o].catalogOrder,
									subCatalogs: i
								});
							}
						}
					return r;
				}(v, c)
					, n = function (e, n, t) {
						var r, o, i = "zh-cn" !== n.locale && t.width < 1400 ? 3 : 4,
							a = "zh-cn" === n.locale ? 218 : 253, c = [], s = [], l = [], u = [], f = 0;
						return e.forEach((function (e, n) {
							var t;
							l = [],
								u = [],
								s = [],
								e.subCatalogs.forEach((function (e, n) {
									if (n < i)
										r = 30,
											o = (a + 32) * n,
											u.push(o),
											l.push(82 + 30 * e.endpoints.filter((function (e) {
												return !1 !== e.visible;
											}
											)).length);
									else {
										var t = (c = l).reduce((function (e, n, t) {
											return n < c[e] ? t : e;
										}
										), 0);
										r = l[t],
											o = u[t],
											l[t] += 52 + 30 * e.endpoints.filter((function (e) {
												return !1 !== e.visible;
											}
											)).length;
									}
									var c;
									s.push({
										top: r,
										left: o
									});
								}
								)),
								f += (t = l).sort((function (e, n) {
									return e - n;
								}
								))[t.length - 1],
								c.push({
									top: f,
									subStyleArr: s
								});
						}
						)),
							c;
					}(e, h, g);
				0 === e.length && "" !== c ? u(!0) : u(!1),
					I(e),
					O(n);
			}
			), [v, c, h.locale, g, p]),
				o.a.createElement("div", {
					className: dn.a.allService
				}, A.map((function (e, n) {
					var t = e.catalog
						, r = e.subCatalogs;
					return o.a.createElement("div", {
						className: dn.a.serviceFirstCatalog,
						key: "cf-catalog-" + n,
						style: {
							top: 0 === n ? 0 : P[n - 1].top
						}
					}, o.a.createElement("div", {
						className: dn.a.serviceFirstCatalogTitle
					}, t ? JSON.parse(t)[h.locale] : ""), r.map((function (e, t) {
						var r = e.catalog
							, i = e.endpoints;
						return o.a.createElement("div", {
							key: "cf-sub-catalog-" + t,
							className: dn.a.serviceSection,
							style: P[n].subStyleArr[t]
						}, o.a.createElement("div", {
							className: dn.a.serviceNavItemTitle
						}, r ? JSON.parse(r)[h.locale] : ""), o.a.createElement("ul", null, i.map((function (e) {
							var n = e.name
								, t = (e.endpoint,
									e.href,
									e.id)
								, r = e.visible
								, i = e.serviceType
								, a = w.includes(t.toLowerCase());
							return i && i.startsWith("service-") && (a = a || w.includes(i)),
								!1 !== r && o.a.createElement("li", {
									key: "cf-service-" + t,
									className: dn.a.serviceNavItem,
									id: "cf-service-" + t
								}, o.a.createElement("a", {
									className: dn.a.serviceNavItemLabel,
									title: n,
									href: "#",
									onClick: function (n) {
										return U(n, e);
									}
								}, n), "custom_service_type" !== i ? o.a.createElement("span", {
									className: dn.a.serviceNavItemIcon,
									title: a ? h.get({
										id: "console_term_unCollect_tip"
									}) : h.get({
										id: "console_term_collect_tip"
									}),
									style: {
										display: a && "local_config" !== e.serviceType ? "block" : "none"
									},
									onClick: function () {
										return M(e, a);
									}
								}, o.a.createElement("svg", {
									className: dn.a.serviceCollectionSvg,
									width: "16px",
									height: "16px",
									viewBox: "0 0 16 16",
									version: "1.1",
									xmlns: "http://www.w3.org/2000/svg"
								}, o.a.createElement("path", {
									d: "M8.70030306,10.4530766 L8.70030306,14.2646646 C8.70030306,14.6707791 8.39127677,15 8.01007353,15 C7.62887028,15 7.31984399,14.6707791 7.31984399,14.2646646 L7.31984399,10.4530766 L4,10.4530766 C3.72385763,10.4530766 3.5,10.229219 3.5,9.95307663 C3.5,9.82629382 3.54816289,9.70424514 3.63474243,9.61162838 L5.04949512,8.09822441 L5.65457508,2.6435197 L4.973482,1.62188008 C4.85094102,1.4380686 4.90061057,1.18972087 5.08442204,1.06717988 C5.15012905,1.02337521 5.22733213,1 5.30630212,1 L10.7137838,1 C10.9346977,1 11.1137838,1.1790861 11.1137838,1.4 C11.1137838,1.47896999 11.0904086,1.55617307 11.0466039,1.62188008 L10.3646225,2.64485215 L10.9564866,8.08314463 L12.3853361,9.61162838 C12.5739127,9.81335457 12.5632529,10.1297575 12.3615267,10.3183342 C12.26891,10.4049137 12.1468613,10.4530766 12.0200785,10.4530766 L8.70030306,10.4530766 Z M9.61517955,8.6983988 L8.92970784,2.4 L7.09017545,2.4 L6.3897029,8.71465445 L9.61517955,8.6983988 Z"
								})), o.a.createElement("span", {
									className: dn.a.serviceCollectionFill,
									style: {
										display: a ? "block" : "none"
									}
								})) : null);
						}
						))));
					}
					)));
				}
				)));
		}
			, On = t(38)
			, _n = t.n(On)
			, jn = t(75)
			, Nn = t.n(jn);
		var Rn = function (e) {
			var n = e.width
				, t = e.dropToggleFlag
				, r = e.children;
			return o.a.createElement("div", {
				"data-testid": "mo-cf-component-drop",
				className: Nn.a.moCfDropContainer,
				style: {
					width: n,
					display: t ? "block" : "none"
				}
			}, r);
		}
			, Ln = t(42)
			, Fn = t.n(Ln);
		var Mn = function (e) {
			var n = e.options
				, t = e.currentValue
				, r = e.onSelect;
			return o.a.createElement("div", {
				"data-testid": "mo-cf-component-list",
				className: Fn.a.moCfListViewport + " 'mo-cf-component-list'"
			}, o.a.createElement("ul", {
				className: Fn.a.moCfListUl
			}, n && n.length > 0 ? n.map((function (e) {
				return o.a.createElement("li", {
					"data-testid": "mo-cf-component-list-li-" + e.id,
					key: e.id,
					title: e.label,
					className: Fn.a.moCfListOption + " " + ((null == t ? void 0 : t.id) === e.id ? Fn.a.active : ""),
					onClick: function (n) {
						return r(e);
					}
				}, o.a.createElement("div", null, e.label));
			}
			)) : null));
		}
			, Un = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, Dn = function (e) {
				var n = "function" == typeof Symbol && Symbol.iterator
					, t = n && e[n]
					, r = 0;
				if (t)
					return t.call(e);
				if (e && "number" == typeof e.length)
					return {
						next: function () {
							return e && r >= e.length && (e = void 0),
							{
								value: e && e[r++],
								done: !e
							};
						}
					};
				throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.");
			};
		var zn = function (e) {
			var n = e.id
				, t = (e.labelKey,
					e.searchAble)
				, i = e.defaultValue
				, a = (e.disabled,
					e.noDataText,
					e.options)
				, c = (e.panelMaxHeight,
					e.panelWidth)
				, s = void 0 === c ? "120px" : c
				, l = e.onSelect
				, u = []
				, f = Un(Object(r.useState)(!1), 2)
				, d = f[0]
				, m = f[1]
				, p = Un(Object(r.useState)(null), 2)
				, h = p[0]
				, g = p[1]
				, v = Un(Object(r.useState)(""), 2)
				, b = v[0]
				, w = v[1]
				, y = Un(Object(r.useState)([]), 2)
				, x = y[0]
				, k = y[1]
				, S = Object(r.useRef)(null)
				, E = Object(r.useRef)(null);
			return Object(r.useEffect)((function () {
				g(i);
			}
			), [i]),
				Object(r.useEffect)((function () {
					k(a);
				}
				), [a]),
				Object(r.useEffect)((function () {
					function e(e) {
						E.current && !E.current.contains(e.target) && m(!1);
					}

					return document.addEventListener("mousedown", e),
						function () {
							document.removeEventListener("mousedown", e);
						};
				}
				), [E]),
				Object(r.useEffect)((function () {
					var e, n;
					if (b) {
						if (a && a.length > 0)
							try {
								for (var t = Dn(a), r = t.next(); !r.done; r = t.next()) {
									var o = r.value
										, i = o.id.toLowerCase()
										, c = o.label.toLowerCase();
									-1 === i.indexOf(b.toLowerCase()) && -1 === c.indexOf(b.toLowerCase()) || u.push(o);
								}
							} catch (n) {
								e = {
									error: n
								};
							} finally {
								try {
									r && !r.done && (n = t.return) && n.call(t);
								} finally {
									if (e)
										throw e.error;
								}
							}
						k(u);
					} else
						k(a);
				}
				), [b]),
				o.a.createElement("div", {
					id: n,
					tabIndex: 0,
					className: _n.a.moCfSelect,
					style: {
						width: s
					},
					ref: E
				}, o.a.createElement("div", {
					"data-testid": "mo-cf-component-select-wrapper",
					id: "mo-cf-component-select-wrapper",
					className: d ? _n.a.moCfSelectWrapperShow : "",
					style: {
						width: s
					}
				}, o.a.createElement("div", {
					"data-testid": "mo-cf-component-select-drop",
					id: "mo-cf-component-select-drop",
					className: _n.a.moCfSelectDominatorContainer,
					onClick: function () {
						return m(!d);
					}
				}, o.a.createElement("span", {
					className: _n.a.moCfSelectDominatorText,
					title: h ? null == h ? void 0 : h.label : null == i ? void 0 : i.label
				}, h ? null == h ? void 0 : h.label : null == i ? void 0 : i.label), o.a.createElement("span", {
					className: _n.a.moCfSelectToggleIcon + " hwsicon-frame-image-caret"
				})), o.a.createElement(Rn, {
					dropToggleFlag: d,
					width: s
				}, t && (null == a ? void 0 : a.length) > 10 ? o.a.createElement(ee, {
					"data-testid": "mo-cf-component-select-search-box",
					width: s,
					searchContent: b,
					searchRef: S,
					onClick: function () {
						w(""),
							S && S.current && (S.current.value = "");
					},
					onChange: function (e) {
						e.target.value !== b && w(e.target.value.substring(0, 50)),
							e.target.value.length > 50 && (null == S ? void 0 : S.current) && (S.current.value = e.target.value.substring(0, 50));
					}
				}) : null, o.a.createElement(Mn, {
					options: x,
					onSelect: function (e) {
						g(e),
							l(e),
							m(!1);
					},
					currentValue: h
				}))));
		}
			, Bn = t(32)
			, Hn = t(46)
			, Wn = t(30)
			, Vn = t.n(Wn)
			, Qn = t(36)
			, Gn = t(16)
			, qn = function () {
				return (qn = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			}
			, Kn = function (e, n) {
				var t = {};
				for (var r in e)
					Object.prototype.hasOwnProperty.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
				if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
					var o = 0;
					for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
						n.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (t[r[o]] = e[r[o]]);
				}
				return t;
			}
			, Jn = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, Yn = [];

		function Zn(e, n, t) {
			var r = Object(Qn.a)("div");

			function i(n, t) {
				var i = Object(J.b)();
				Object(Gn.render)(o.a.createElement(Xn, qn({
					id: e,
					intl: i.intl,
					visible: void 0,
					type: n
				}, t)), r);
			}

			function a() {
				Object(Qn.b)(r);
			}

			return "default" !== n && i(n, t),
				Yn.push(a),
			{
				destroy: a,
				update: function (e) {
					var n = e.type
						, t = Kn(e, ["type"]);
					Object(Gn.render)(null, r),
						i(n, t);
				}
			};
		}

		function Xn(e) {
			var n = e.id
				, t = e.type
				, i = e.message
				, a = e.top
				, c = (e.duration,
					e.visible)
				, s = e.wrapperClass
				, l = (e.noTypeIcon,
					e.noCloseIcon,
					Jn(Object(r.useState)(!0), 2))
				, u = l[0]
				, f = l[1];
			if (!1 === c || !u)
				return null;
			return o.a.createElement("div", {
				id: n
			}, o.a.createElement("div", {
				className: Vn.a.moCfMessageWrapper + " " + s,
				style: {
					top: a + 15
				}
			}, o.a.createElement("div", {
				className: Vn.a.moCfMessageStatus + " " + Vn.a.moCfMessage + "-" + t
			}, o.a.createElement("span", {
				className: "icon " + Vn.a.moCfMessageIcon + " cf-icon-status-" + t
			}), o.a.createElement("p", {
				className: Vn.a.moCfMessageP
			}, i), o.a.createElement("span", {
				className: Vn.a.close + " " + Vn.a.moCfMessageClose + " hwsicon-frame-image-close",
				onClick: function () {
					void 0 === c && f((function (e) {
						return !e;
					}
					));
				}
			}))));
		}

		Xn.success = function (e, n) {
			return Zn(e, "success", n || {});
		}
			,
			Xn.warn = function (e, n) {
				return Zn(e, "warn", n || {});
			}
			,
			Xn.error = function (e, n) {
				return Zn(e, "error", n || {});
			}
			,
			Xn.prompt = function (e, n) {
				return Zn(e, "prompt", n || {});
			}
			,
			Xn.destroyAll = function () {
				Yn.forEach((function (e) {
					return e();
				}
				));
			}
			,
			Xn.init = function (e) {
				return Zn(e, "default", {});
			}
			;
		var $n = Xn
			, et = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}
			, nt = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}
			, tt = function () {
				function e() {
				}

				return e.getHcsoHomeUrl = function (e) {
					return et(this, void 0, void 0, (function () {
						var n, t, r;
						return nt(this, (function (o) {
							switch (o.label) {
								case 0:
									return (n = this.regions.find((function (n) {
										return n.id === e;
									}
									))) ? [2, n.url] : [4, this.getHcsoHomeUrlRequest(e).catch((function () {
									}
									))];
								case 1:
									return t = o.sent(),
										r = (null == t ? void 0 : t.url) || null,
										this.regions.push({
											id: e,
											url: r
										}),
										[2, r];
							}
						}
						));
					}
					));
				}
					,
					e.getHcsoHomeUrlRequest = function (e) {
						var n = {
							url: F.a.getAppWebPath() + "/goku/silvan/rest/v2.0/hcso-links",
							timeout: 6e4,
							params: {
								region_id: e
							}
						};
						return ge.a.get(n);
					}
					,
					e.regions = [],
					e;
			}()
			, rt = function () {
				return (rt = Object.assign || function (e) {
					for (var n, t = 1, r = arguments.length; t < r; t++)
						for (var o in n = arguments[t])
							Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
					return e;
				}
				).apply(this, arguments);
			}
			, ot = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			};

		function it(e) {
			return e ? e.map((function (e) {
				return rt(rt({}, e), {
					label: e.displayName || e.name
				});
			}
			)) : null;
		}

		var at = function (e) {
			var n, t, i = e.hasExpandServiceList, a = e.user, c = e.region, s = e.endpoint, l = e.links, u = e.safearea,
				f = e.dispatch, d = e.globalData, m = e.globalConfig, p = Object(de.b)(),
				h = ot(Object(r.useState)(""), 2), g = h[0], v = h[1], b = ot(Object(r.useState)(!1), 2), w = (b[0],
					b[1]), y = Object(r.useRef)(null), x = ot(Object(r.useState)(null), 2), k = x[0], S = x[1],
				E = ot(Object(r.useState)(null), 2), C = E[0], A = E[1], I = ot(Object(r.useState)(null), 2), T = I[0],
				P = I[1], O = ot(Object(r.useState)(null), 2), _ = O[0], j = O[1], N = ot(Object(r.useState)(!1), 2),
				R = N[0], L = N[1], F = ot(Object(r.useState)(null), 2), M = F[0], U = F[1],
				D = d.gotoServiceConsolePage,
				z = (null === (n = null == c ? void 0 : c.federationLinks) || void 0 === n ? void 0 : n.length) && (null === (t = c.federationLinks[0]) || void 0 === t ? void 0 : t.url),
				B = null == m ? void 0 : m.showHuaweicloudConsole;

			function H() {
				v(""),
					y && y.current && (y.current.value = "");
			}

			function W(e) {
				U(null),
					tt.getHcsoHomeUrl(e).then((function (e) {
						U(e);
					}
					));
			}

			function V(e) {
				A(e),
					f({
						type: "UPDATE_CURRENT_REGION",
						payload: {
							currentRegion: e
						}
					});
				var n = it(e.projects);
				P(n),
					n && n.length > 0 && (e.projects.find((function (e) {
						return e.id === (null == _ ? void 0 : _.id);
					}
					)) || (j(n[0]),
						f({
							type: "UPDATE_CURRENT_PROJECT",
							payload: {
								currentProject: n[0]
							}
						}))),
					W(null == e ? void 0 : e.id),
					Object(Bn.a)({
						noCache: !0,
						projectId: (null == _ ? void 0 : _.id) || "",
						regionId: e.id,
						isGotoConsole: D,
						isOnlyHwsRegion: R
					}).then((function (e) {
						f({
							type: "UPDATE_ENDPOINT_ALL",
							payload: e
						});
					}
					)),
					Object(Hn.a)({
						regionId: e.id,
						noCache: !0
					}).then((function (e) {
						ce.b.links.next(e),
							f({
								type: "UPDATE_LINKS_ALL",
								payload: e
							});
					}
					));
			}

			return Object(r.useEffect)((function () {
				!i && g && H();
			}
			), [i, y]),
				Object(r.useEffect)((function () {
					var e, n, t;
					if (a && !a.projectId || c.initialized && 0 === (null === (e = null == c ? void 0 : c.originalRegions) || void 0 === e ? void 0 : e.length) || c.initialized && 0 === (null === (n = null == c ? void 0 : c.regions) || void 0 === n ? void 0 : n.length)) {
						var r = void 0;
						r = a.userRoles.includes("vdc_adm") ? o.a.createElement("span", null, p.get({
							id: "console_term_noProject_tip"
						}), o.a.createElement("a", {
							style: {
								cursor: "pointer",
								textDecoration: "none"
							},
							rel: "noopener noreferrer",
							target: "_blank",
							href: null == l ? void 0 : l.links.project_center_project
						}, p.get({
							id: "console_term_createProject_tip"
						}))) : p.get({
							id: "console_term_addProject_contactMgr_tip"
						}),
							t = function (e) {
								var n = $n.init("no-project-message");
								return n.update({
									type: "warn",
									message: e,
									top: u.top
								}),
									n;
							}(r),
							setTimeout((function () {
								t.destroy();
							}
							), 1e4);
					}
					return function () {
						t && t.destroy();
					};
				}
				), [c, l]),
				Object(r.useEffect)((function () {
					if (c && c.regions && c.regions.length > 0) {
						var e = ae.a.getCookie("selectedRegion").toString()
							, n = null
							, t = c.hwsRegions
							, r = c.regions;
						r = it(r = r.concat(t)),
							S(r),
							L(!1),
							e && (n = r.find((function (n) {
								return n.id === e;
							}
							))),
							n || (n = r[0]),
							A(n),
							f({
								type: "UPDATE_CURRENT_REGION",
								payload: {
									currentRegion: n
								}
							}),
							W(null == n ? void 0 : n.id);
						var o = ae.a.getCookie("projectId").toString()
							, i = n.projects
							, a = null;
						if (i && i.length > 0) {
							var s = it(i);
							a = o && s.find((function (e) {
								return e.id === o;
							}
							)) || s[0],
								j(a),
								f({
									type: "UPDATE_CURRENT_PROJECT",
									payload: {
										currentProject: a
									}
								}),
								P(s);
						}
					} else {
						var l = ae.a.getCookie("selectedRegion").toString()
							, u = (n = null,
								c.hwsRegions);
						u && u.length && (L(!0),
							u = it(u),
							S(u),
							l && (n = u.find((function (e) {
								return e.id === l;
							}
							))),
							n || (n = u[0]),
							V(n));
					}
				}
				), [c, R]),
				o.a.createElement("div", {
					className: un.a.serviceListContainer
				}, o.a.createElement("div", {
					className: un.a.serviceClose + " hwsicon-frame-service-close-window",
					onClick: function () {
						f({
							type: "UPDATE_SERVICE_LIST_EXPAND",
							payload: {
								hasExpandServiceList: ""
							}
						}),
							H();
					}
				}), o.a.createElement("div", {
					className: un.a.serviceSelectPanel
				}, o.a.createElement("div", {
					style: {
						marginRight: "20px"
					}
				}, o.a.createElement("span", null, p.get({
					id: "console_term_region_label"
				})), o.a.createElement(zn, {
					id: "mo-cf-service-region-select",
					defaultValue: C,
					options: k,
					panelWidth: "250px",
					searchAble: !0,
					onSelect: V
				})), o.a.createElement("div", {
					style: {
						display: T && T.length > 0 ? "block" : "none"
					}
				}, o.a.createElement("span", null, p.get({
					id: "console_term_project_label"
				})), o.a.createElement(zn, {
					id: "mo-cf-service-project-select",
					defaultValue: _,
					options: T,
					panelWidth: "250px",
					searchAble: !0,
					onSelect: function (e) {
						j(e),
							f({
								type: "UPDATE_CURRENT_PROJECT",
								payload: {
									currentProject: e
								}
							}),
							Object(Bn.a)({
								noCache: !0,
								projectId: e.id,
								regionId: C.id,
								isGotoConsole: D
							}).then((function (e) {
								f({
									type: "UPDATE_ENDPOINT_ALL",
									payload: e
								});
							}
							));
					}
				})), B && z && ["mix", "federation"].includes(null == C ? void 0 : C.cfType) ? o.a.createElement("a", {
					href: z,
					className: "" + un.a.serviceHuaweicloudLinks,
					target: "_blank"
				}, p.get({
					id: "console_term_goto_huaweicloud_console"
				})) : ""), o.a.createElement("div", {
					className: un.a.serviceSearch
				}, o.a.createElement("input", {
					className: un.a.serviceSearchInput,
					placeholder: p.get({
						id: "console_term_searchServiceKeyword_label"
					}),
					type: "text",
					id: "cf-service-input",
					ref: y,
					onChange: function (e) {
						e.target.value !== g && v(e.target.value.substring(0, 50)),
							e.target.value.length > 50 && (null == y ? void 0 : y.current) && (y.current.value = e.target.value.substring(0, 50));
					}
				}), o.a.createElement("span", {
					className: un.a.serviceSearchInputEmpty + " hwsicon-frame-service-close-window",
					style: {
						display: g ? "block" : "none"
					},
					onClick: H
				}), o.a.createElement("span", {
					className: un.a.serviceSearchIcon + " hwsicon-frame-service-search"
				})), o.a.createElement("div", {
					className: un.a.serviceContent
				}, o.a.createElement(Pn, {
					dispatch: f,
					user: a,
					endpoint: s,
					links: l,
					search: g,
					currentProject: _,
					currentRegion: C,
					setFilterState: function (e) {
						w(e);
					},
					globalData: d,
					region: c,
					hcsoUrl: M
				})));
		}
			, ct = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, st = null
			, lt = null;
		var ut = Object(f.b)((function (e) {
			return {
				area: e.area,
				user: e.user,
				region: e.region,
				endpoint: e.endpoint,
				links: e.links,
				safearea: e.safearea,
				globalConfig: e.globalConfig
			};
		}
		))((function (e) {
			var n = e.area
				, t = e.user
				, i = e.region
				, a = e.endpoint
				, c = e.links
				, s = e.safearea
				, l = e.dispatch
				, u = e.deps
				, f = e.globalData
				, d = e.globalConfig
				, m = u.intl
				, p = n.hasExpandServiceList
				, h = ct(Object(r.useState)(!0), 2)
				, g = h[0]
				, v = h[1];
			return o.a.createElement("div", {
				id: "mo-cf-modules-service-list",
				className: sn.a.serviceWrapper
			}, o.a.createElement("div", {
				className: sn.a.leftWrapper,
				onClick: function () {
					g && l({
						type: "UPDATE_SERVICE_LIST_EXPAND",
						payload: {
							hasExpandServiceList: !p
						}
					});
				},
				onMouseLeave: function () {
					clearTimeout(st),
						clearTimeout(lt);
				},
				onMouseEnter: function () {
					v(!1),
						st = setTimeout((function () {
							l({
								type: "UPDATE_SERVICE_LIST_EXPAND",
								payload: {
									hasExpandServiceList: !0
								}
							});
						}
						), 300),
						lt = setTimeout((function () {
							return v(!0);
						}
						), 700);
				}
			}, o.a.createElement("span", {
				className: sn.a.serviceIcon + " hwsicon-frame-service-list"
			}), o.a.createElement("span", {
				className: sn.a.serviceName
			}, m.get({
				id: "console_term_serviceList_label"
			})), o.a.createElement("span", {
				className: sn.a.serviceMoreIcon
			}, o.a.createElement("svg", {
				version: "1.1",
				xmlns: "http://www.w3.org/2000/svg",
				width: "20",
				height: "20",
				viewBox: "0 0 30 32"
			}, o.a.createElement("path", {
				d: "M18.149 12.956l-7.522 7.701 2.507 2.507 7.701-7.701-2.686-2.507zM13.135 7.941l-2.507 2.507 7.522 7.701 2.686-2.686-7.701-7.522z"
			})))), o.a.createElement("div", {
				className: sn.a.serviceList,
				style: {
					left: p ? "240px" : "-1172px",
					width: "zh-cn" === m.locale ? 1032 : 1172
				}
			}, o.a.createElement(at, {
				hasExpandServiceList: p,
				dispatch: l,
				region: i,
				endpoint: a,
				links: c,
				user: t,
				safearea: s,
				globalData: f,
				globalConfig: d
			})));
		}
		))
			, ft = t(15)
			, dt = t.n(ft)
			, mt = function (e, n, t, r) {
				return new (t || (t = Promise))((function (o, i) {
					function a(e) {
						try {
							s(r.next(e));
						} catch (e) {
							i(e);
						}
					}

					function c(e) {
						try {
							s(r.throw(e));
						} catch (e) {
							i(e);
						}
					}

					function s(e) {
						var n;
						e.done ? o(e.value) : (n = e.value,
							n instanceof t ? n : new t((function (e) {
								e(n);
							}
							))).then(a, c);
					}

					s((r = r.apply(e, n || [])).next());
				}
				));
			}
			, pt = function (e, n) {
				var t, r, o, i, a = {
					label: 0,
					sent: function () {
						if (1 & o[0])
							throw o[1];
						return o[1];
					},
					trys: [],
					ops: []
				};
				return i = {
					next: c(0),
					throw: c(1),
					return: c(2)
				},
					"function" == typeof Symbol && (i[Symbol.iterator] = function () {
						return this;
					}
					),
					i;

				function c(i) {
					return function (c) {
						return function (i) {
							if (t)
								throw new TypeError("Generator is already executing.");
							for (; a;)
								try {
									if (t = 1,
										r && (o = 2 & i[0] ? r.return : i[0] ? r.throw || ((o = r.return) && o.call(r),
											0) : r.next) && !(o = o.call(r, i[1])).done)
										return o;
									switch (r = 0,
									o && (i = [2 & i[0], o.value]),
									i[0]) {
										case 0:
										case 1:
											o = i;
											break;
										case 4:
											return a.label++,
											{
												value: i[1],
												done: !1
											};
										case 5:
											a.label++,
												r = i[1],
												i = [0];
											continue;
										case 7:
											i = a.ops.pop(),
												a.trys.pop();
											continue;
										default:
											if (!(o = a.trys,
												(o = o.length > 0 && o[o.length - 1]) || 6 !== i[0] && 2 !== i[0])) {
												a = 0;
												continue;
											}
											if (3 === i[0] && (!o || i[1] > o[0] && i[1] < o[3])) {
												a.label = i[1];
												break;
											}
											if (6 === i[0] && a.label < o[1]) {
												a.label = o[1],
													o = i;
												break;
											}
											if (o && a.label < o[2]) {
												a.label = o[2],
													a.ops.push(i);
												break;
											}
											o[2] && a.ops.pop(),
												a.trys.pop();
											continue;
									}
									i = n.call(e, a);
								} catch (e) {
									i = [6, e],
										r = 0;
								} finally {
									t = o = 0;
								}
							if (5 & i[0])
								throw i[1];
							return {
								value: i[0] ? i[1] : void 0,
								done: !0
							};
						}([i, c]);
					};
				}
			}
			, ht = function (e, n) {
				var t = "function" == typeof Symbol && e[Symbol.iterator];
				if (!t)
					return e;
				var r, o, i = t.call(e), a = [];
				try {
					for (; (void 0 === n || n-- > 0) && !(r = i.next()).done;)
						a.push(r.value);
				} catch (e) {
					o = {
						error: e
					};
				} finally {
					try {
						r && !r.done && (t = i.return) && t.call(i);
					} finally {
						if (o)
							throw o.error;
					}
				}
				return a;
			}
			, gt = function (e, n) {
				for (var t = 0, r = n.length, o = e.length; t < r; t++,
					o++)
					e[o] = n[t];
				return e;
			};
		var vt = Object(f.b)((function (e) {
			return {
				endpoint: e.endpoint,
				links: e.links,
				cookieCache: e.cookieCache,
				user: e.user,
				region: e.region
			};
		}
		))((function (e) {
			var n = e.endpoint
				, t = e.links
				, i = e.cookieCache
				, a = e.user
				, c = e.dispatch
				, s = (e.globalData,
					e.region)
				, l = Object(de.b)()
				, u = n.serviceEndpointList
				, f = n.endpointCollects
				, m = Object(r.useRef)(null)
				, p = ht(Object(r.useState)(0), 2)
				, h = p[0]
				, g = p[1]
				, v = ht(Object(r.useState)(-1), 2)
				, b = v[0]
				, w = v[1];

			function y(e) {
				c({
					type: "UPDATE_COLLECTED_ENDPOINT",
					payload: {
						endpointCollects: e
					}
				});
			}

			function x(e, n) {
				var t = this;
				if (w(n),
					c({
						type: "UPDATE_DRAG_MODE",
						payload: {
							isInDrag: !0
						}
					}),
					m && m.current) {
					var r = f.length
						, o = m.current.childNodes
						, i = o[n]
						, s = i.getBoundingClientRect().top
						, l = new Array(r).toString().split(",").map((function (e, n) {
							return n;
						}
						))
						, u = m.current.childNodes[0].getBoundingClientRect().top + 20
						, d = s + 20
						, p = n;
					document.onmousemove = function (e) {
						var n, t;
						i.style.transition = "transform 0.4s ease-out 0s, left 0.4s ease-out 0s, opacity 0.4s ease-out";
						var a = (e || window.event).pageY;
						i.style.transform = "translate(0px, " + (a - u) + "px)",
							a - d > 20 && p < r - 1 && (o[l[p = ((d += 40) - u) / 40]].style.transform = "translate(0px, " + 40 * (p - 1) + "px)",
								n = ht([l[p - 1], l[p]], 2),
								l[p] = n[0],
								l[p - 1] = n[1]),
							d - a > 20 && p > 0 && (o[l[p = ((d -= 40) - u) / 40]].style.transform = "translate(0px, " + 40 * (p + 1) + "px)",
								t = ht([l[p + 1], l[p]], 2),
								l[p] = t[0],
								l[p + 1] = t[1]);
					}
						,
						document.onmouseup = function (e) {
							return mt(t, void 0, void 0, (function () {
								var e, t, r, o, s;
								return pt(this, (function (l) {
									switch (l.label) {
										case 0:
											for (i.style.transition = "",
												e = m.current.childNodes,
												t = 0,
												r = e.length; t < r; t++)
												e[t].style.transform = "translate(0px, " + 40 * t + "px)";
											return y(o = function (e, n, t) {
												if (n > e.length - 1 || n < 0)
													return e;
												if (t > e.length - 1 || t < 0)
													return e;
												if (n === t)
													return e;
												var r = gt(gt([], ht(e.slice(0, n))), ht(e.slice(n + 1)))
													, o = e[n];
												return gt(gt(gt([], ht(r.slice(0, t))), [o]), ht(r.slice(t)));
											}(f, n, p)),
												w(-1),
												c({
													type: "UPDATE_DRAG_MODE",
													payload: {
														isInDrag: !1
													}
												}),
												document.onmousemove = document.onmouseup = null,
												[4, Sn.getCftk(a)];
										case 1:
											return s = l.sent(),
												hn.a.sortFavoriteEndpoint({
													user_id: a.userId,
													endpointResources: o.map((function (e) {
														return {
															endpointId: e.endpointId
														};
													}
													)),
													headers: {
														cftk: s
													}
												}).then((function () {
												}
												), (function () {
												}
												)),
												[2];
									}
								}
								));
							}
							));
						};
				}
			}

			function k(e, n) {
				var r, o;
				return mt(this, void 0, void 0, (function () {
					var l, f, m, p, h, g, v, b, w, y, x, k, E, C, A, I, T, P, O;
					return pt(this, (function (_) {
						switch (_.label) {
							case 0:
								return e.preventDefault(),
									c({
										type: "UPDATE_SERVICE_LIST_EXPAND",
										payload: {
											hasExpandServiceList: ""
										}
									}),
									l = n.endpoint,
									f = n.endpointId,
									m = n.collectType,
									p = u.filter((function (e) {
										return e.id === f;
									}
									)),
									h = p.length > 0 ? p[0] : null,
									g = "endpoint" === m ? l : null == t ? void 0 : t.links[l],
									h && (null == h ? void 0 : h.serviceType) && h.serviceType.startsWith("huaweicloud") && (g = h.endpoint),
									(null == h ? void 0 : h.endpoint) && d.a.isCrsBorrowService(h.endpoint) ? (v = a.name,
										g = h.endpoint,
										C = g.split("&service=")[0],
										A = g.split("&service=")[1],
										C = d.a.i18nReplace(C, {
											userName: encodeURIComponent(v)
										}),
										A = d.a.genHWSHref(A, "locale"),
										[4, vn.a.getHcsProjectRelations(i.currentProject.id)]) : [3, 2];
							case 1:
								return (b = _.sent()) && (A = d.a.addOrReplaceUrlParameter(A, "region", encodeURIComponent(b))),
									(w = null === (r = null == i ? void 0 : i.currentRegion) || void 0 === r ? void 0 : r.globalId) && (A = d.a.addOrReplaceUrlParameter(A, "regionId", encodeURIComponent(w))),
									g = C + "&service=" + encodeURIComponent(A),
									g = S.a.xssEncode(g),
									window.open(g, "_blank").opener = null,
									[2];
							case 2:
								return f.startsWith("huaweicloud") || (null == h ? void 0 : h.serviceType) && h.serviceType.startsWith("huaweicloud") ? (y = null === (o = s.federationLinks) || void 0 === o ? void 0 : o.find((function (e) {
									return e.region_id === i.currentRegion.id;
								}
								)),
									x = null == y ? void 0 : y.url,
									k = d.a.getParameterFromUri(x, "domain_id"),
									E = d.a.getParameterFromUri(x, "idp"),
									g = d.a.i18nReplace(g, {
										domain_id: k
									}),
									g = d.a.i18nReplace(g, {
										idp: E
									}),
									C = g.split("&service=")[0],
									A = decodeURIComponent(g.split("&service=")[1]),
									A = d.a.genHWSHref(A, "locale"),
									g = C + "&service=" + encodeURIComponent(A),
									g = S.a.xssEncode(g),
									window.open(g, "_blank").opener = null,
									[2]) : (I = i.currentProject.name,
										T = i.currentProject.id,
										P = i.currentRegion.id,
										ae.a.setParentCookie("selectedRegion", P),
										ae.a.setParentCookie("projectName", I),
										ae.a.setParentCookie("projectId", T),
										d.a.isSlaveRegion(i.currentRegion) && P === n.regionId && "global" !== (null == h ? void 0 : h.deployMode) ? [4, Object(gn.b)(g, P, I).catch((function () {
											return "";
										}
										))] : [3, 4]);
							case 3:
								return (O = _.sent()) && (O = S.a.xssEncode(O),
									window.open(O, "_blank").opener = null),
									[2];
							case 4:
								return g = g ? d.a.genHWSHref(g, !1, {
									region: I
								}) : g,
									g = S.a.xssEncode(g),
									l === window.location.href ? window.location.reload() : window.location.href = "endpoint" === m ? g : d.a.addOrReplaceParamsEndOfUrl(g, "productId", f),
									[2];
						}
					}
					));
				}
				));
			}

			return Object(r.useEffect)((function () {
				if ((null == m ? void 0 : m.current) && (null == f ? void 0 : f.length) > 0)
					for (var e = m.current.childNodes, n = 0, t = e.length; n < t; n++)
						e[n].style.transform = "translate(0px, " + 40 * n + "px)";
				g(f ? f.length : 0);
			}
			), [f, m]),
				o.a.createElement("div", {
					id: "mo-cf-modules-collections",
					className: dt.a.cfSidebarCollectionService,
					ref: m
				}, (null == f ? void 0 : f.length) > 0 && f.map((function (e, n) {
					var t, r = e.endpointId, i = e.name, c = o.a.createElement("i", {
						className: "hwsicon-frame-service-default " + (r ? "hwsicon-frame-service-" + r : "")
					});
					return o.a.createElement("li", {
						className: (t = n,
							b === t ? dt.a["cf-sidebar-service-row"] + " " + dt.a["cf-sidebar-service-row-drag"] : dt.a["cf-sidebar-service-row"]),
						style: {
							zIndex: b === n ? 101 : 100,
							display: n >= h ? "none" : "block"
						},
						id: "cf-collections-" + r,
						key: "cf-collections-" + r
					}, o.a.createElement("a", {
						href: "#",
						onClick: function (n) {
							return k(n, e);
						},
						className: dt.a.cfSidebarServiceItem
					}, o.a.createElement("span", {
						className: dt.a.cfSidebarServiceIcon
					}, c), o.a.createElement("span", {
						className: dt.a.cfSidebarServiceName
					}, i)), o.a.createElement("span", {
						className: dt.a["cf-sidebar-toolbar"]
					}, o.a.createElement("span", {
						className: dt.a["cf-siderbar-collection-icon"],
						title: l.get({
							id: "console_term_unCollect_tip"
						}),
						onClick: function () {
							return function (e) {
								var n, t;
								return mt(this, void 0, void 0, (function () {
									var r, o;
									return pt(this, (function (i) {
										switch (i.label) {
											case 0:
												return y(f.filter((function (n) {
													return n.endpointId !== e.endpointId;
												}
												))),
													[4, Sn.getCftk(a)];
											case 1:
												return r = i.sent(),
													o = {
														user_id: (null == a ? void 0 : a.isLoginUserFlag) ? a.userId : null === (t = null === (n = a.assumedInfo) || void 0 === n ? void 0 : n.loginUserAccount) || void 0 === t ? void 0 : t.id,
														id: e.endpointId,
														headers: {
															cftk: r
														}
													},
													hn.a.deleteFavoriteEndpointRequest(o).then((function (e) {
													}
													)),
													[2];
										}
									}
									));
								}
								));
							}(e);
						}
					}, o.a.createElement("svg", {
						className: dt.a["cf-sidebar-collection-svg"],
						width: "16px",
						height: "16px",
						viewBox: "0 0 16 16",
						version: "1.1",
						xmlns: "http://www.w3.org/2000/svg"
					}, o.a.createElement("path", {
						d: "M8.70030306,10.4530766 L8.70030306,14.2646646 C8.70030306,14.6707791 8.39127677,15 8.01007353,15 C7.62887028,15 7.31984399,14.6707791 7.31984399,14.2646646 L7.31984399,10.4530766 L4,10.4530766 C3.72385763,10.4530766 3.5,10.229219 3.5,9.95307663 C3.5,9.82629382 3.54816289,9.70424514 3.63474243,9.61162838 L5.04949512,8.09822441 L5.65457508,2.6435197 L4.973482,1.62188008 C4.85094102,1.4380686 4.90061057,1.18972087 5.08442204,1.06717988 C5.15012905,1.02337521 5.22733213,1 5.30630212,1 L10.7137838,1 C10.9346977,1 11.1137838,1.1790861 11.1137838,1.4 C11.1137838,1.47896999 11.0904086,1.55617307 11.0466039,1.62188008 L10.3646225,2.64485215 L10.9564866,8.08314463 L12.3853361,9.61162838 C12.5739127,9.81335457 12.5632529,10.1297575 12.3615267,10.3183342 C12.26891,10.4049137 12.1468613,10.4530766 12.0200785,10.4530766 L8.70030306,10.4530766 Z M9.61517955,8.6983988 L8.92970784,2.4 L7.09017545,2.4 L6.3897029,8.71465445 L9.61517955,8.6983988 Z"
					})), o.a.createElement("span", {
						className: dt.a["cf-sidebar-collection-fill"]
					})), o.a.createElement("span", {
						className: dt.a["cf-sidebar-drag"] + " hwsicon-frame-service-move",
						title: l.get({
							id: "console_term_emptyFavoriteList_dropSort"
						}),
						onMouseDown: function () {
							return x(0, n);
						}
					})));
				}
				)));
		}
		))
			, bt = {
				Header: function (e) {
					var n = g(Object(r.useState)(-window.pageXOffset), 2)
						, t = n[0]
						, o = n[1]
						, i = {
							left: t + "px"
						}
						, s = function (e, n, t) {
							var r = null;
							return function () {
								for (var o = [], i = 0; i < arguments.length; i++)
									o[i] = arguments[i];
								r || (r = setTimeout((function () {
									e.apply(t, o),
										r = null;
								}
								), n));
							};
						}((function () {
							o(-window.pageXOffset);
						}
						), 16);
					return window.addEventListener("scroll", (function (e) {
						return s();
					}
					)),
						r.createElement("div", {
							id: "mo-cf-modules-header",
							className: a.a.cfHeaderContainer,
							style: i
						}, r.createElement(p, h({}, e)), r.createElement(c, h({}, e)));
				},
				LayoutView: c,
				Logo: M,
				HeaderSepLine: function (e) {
					var n = e.type
						, t = z(Object(r.useState)(!1), 2)
						, o = t[0]
						, i = t[1];
					return window.getMoCfContext().isRegionDisplay$().subscribe((function (e) {
						i(e);
					}
					)),
						r.createElement("div", {
							"data-testid": "mo-cf-modules-sep-line",
							id: null == e ? void 0 : e.id,
							className: D.a.cfHeaderSepLine,
							style: {
								paddingLeft: (null == e ? void 0 : e.paddingLeft) + "px",
								paddingRight: (null == e ? void 0 : e.paddingRight) + "px",
								width: !1 === o && "header-left" === n ? "1px" : ""
							}
						});
				},
				Region: ie,
				MainMenu: N,
				LanguageSwitch: le,
				UserCenter: Se,
				Task: je,
				Message: Qe,
				Help: qe,
				ShoppingCart: $e
			}
			, wt = {
				Sidebar: an,
				ServiceList: ut,
				SidebarLine: function () {
					return r.createElement("div", {
						className: D.a.cfSidebarLine
					});
				},
				Collections: vt
			}
			, yt = {};
	}
]);
