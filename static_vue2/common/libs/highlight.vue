<script lang="ts">
export default async function () {
	if (!window.hljs) {
		/* Highlight.js 10.4.0 (4055826e) License: BSD-3-Clause Copyright (c) 2006-2020, Ivan Sagalaev */
		var hljs = (function () {
			"use strict";
			function e(t) {
				return (
					t instanceof Map
						? (t.clear =
								t.delete =
								t.set =
									() => {
										throw Error("map is read-only");
									})
						: t instanceof Set &&
							(t.add =
								t.clear =
								t.delete =
									() => {
										throw Error("set is read-only");
									}),
					Object.freeze(t),
					Object.getOwnPropertyNames(t).forEach(n => {
						var s = t[n];
						"object" != typeof s || Object.isFrozen(s) || e(s);
					}),
					t
				);
			}
			var t = e,
				n = e;
			t.default = n;
			class s {
				constructor(e) {
					void 0 === e.data && (e.data = {}), (this.data = e.data);
				}
				ignoreMatch() {
					this.ignore = !0;
				}
			}
			function r(e) {
				return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
			}
			function a(e, ...t) {
				const n = Object.create(null);
				for (const t in e) n[t] = e[t];
				return (
					t.forEach(e => {
						for (const t in e) n[t] = e[t];
					}),
					n
				);
			}
			function i(e) {
				return e.nodeName.toLowerCase();
			}
			var o = Object.freeze({
				__proto__: null,
				escapeHTML: r,
				inherit: a,
				nodeStream: e => {
					const t = [];
					return (
						(function e(n, s) {
							for (let r = n.firstChild; r; r = r.nextSibling)
								3 === r.nodeType
									? (s += r.nodeValue.length)
									: 1 === r.nodeType &&
										(t.push({
											event: "start",
											offset: s,
											node: r
										}),
										(s = e(r, s)),
										i(r).match(/br|hr|img|input/) ||
											t.push({
												event: "stop",
												offset: s,
												node: r
											}));
							return s;
						})(e, 0),
						t
					);
				},
				mergeStreams: (e, t, n) => {
					let s = 0,
						a = "";
					const o = [];
					function l() {
						return e.length && t.length ? (e[0].offset !== t[0].offset ? (e[0].offset < t[0].offset ? e : t) : "start" === t[0].event ? e : t) : e.length ? e : t;
					}
					function c(e) {
						a += "<" + i(e) + [].map.call(e.attributes, e => " " + e.nodeName + '="' + r(e.value) + '"').join("") + ">";
					}
					function u(e) {
						a += "</" + i(e) + ">";
					}
					function g(e) {
						("start" === e.event ? c : u)(e.node);
					}
					for (; e.length || t.length; ) {
						let t = l();
						if (((a += r(n.substring(s, t[0].offset))), (s = t[0].offset), t === e)) {
							o.reverse().forEach(u);
							do {
								g(t.splice(0, 1)[0]), (t = l());
							} while (t === e && t.length && t[0].offset === s);
							o.reverse().forEach(c);
						} else "start" === t[0].event ? o.push(t[0].node) : o.pop(), g(t.splice(0, 1)[0]);
					}
					return a + r(n.substr(s));
				}
			});
			const l = e => !!e.kind;
			class c {
				constructor(e, t) {
					(this.buffer = ""), (this.classPrefix = t.classPrefix), e.walk(this);
				}
				addText(e) {
					this.buffer += r(e);
				}
				openNode(e) {
					if (!l(e)) return;
					let t = e.kind;
					e.sublanguage || (t = `${this.classPrefix}${t}`), this.span(t);
				}
				closeNode(e) {
					l(e) && (this.buffer += "</span>");
				}
				value() {
					return this.buffer;
				}
				span(e) {
					this.buffer += `<span class="${e}">`;
				}
			}
			class u {
				constructor() {
					(this.rootNode = {
						children: []
					}),
						(this.stack = [this.rootNode]);
				}
				get top() {
					return this.stack[this.stack.length - 1];
				}
				get root() {
					return this.rootNode;
				}
				add(e) {
					this.top.children.push(e);
				}
				openNode(e) {
					const t = { kind: e, children: [] };
					this.add(t), this.stack.push(t);
				}
				closeNode() {
					if (this.stack.length > 1) return this.stack.pop();
				}
				closeAllNodes() {
					for (; this.closeNode(); );
				}
				toJSON() {
					return JSON.stringify(this.rootNode, null, 4);
				}
				walk(e) {
					return this.constructor._walk(e, this.rootNode);
				}
				static _walk(e, t) {
					return "string" == typeof t ? e.addText(t) : t.children && (e.openNode(t), t.children.forEach(t => this._walk(e, t)), e.closeNode(t)), e;
				}
				static _collapse(e) {
					"string" != typeof e &&
						e.children &&
						(e.children.every(e => "string" == typeof e)
							? (e.children = [e.children.join("")])
							: e.children.forEach(e => {
									u._collapse(e);
								}));
				}
			}
			class g extends u {
				constructor(e) {
					super(), (this.options = e);
				}
				addKeyword(e, t) {
					"" !== e && (this.openNode(t), this.addText(e), this.closeNode());
				}
				addText(e) {
					"" !== e && this.add(e);
				}
				addSublanguage(e, t) {
					const n = e.root;
					(n.kind = t), (n.sublanguage = !0), this.add(n);
				}
				toHTML() {
					return new c(this, this.options).value();
				}
				finalize() {
					return !0;
				}
			}
			function d(e) {
				return e ? ("string" == typeof e ? e : e.source) : null;
			}
			const h = "[a-zA-Z]\\w*",
				f = "[a-zA-Z_]\\w*",
				p = "\\b\\d+(\\.\\d+)?",
				m = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
				b = "\\b(0b[01]+)",
				x = {
					begin: "\\\\[\\s\\S]",
					relevance: 0
				},
				E = {
					className: "string",
					begin: "'",
					end: "'",
					illegal: "\\n",
					contains: [x]
				},
				v = {
					className: "string",
					begin: '"',
					end: '"',
					illegal: "\\n",
					contains: [x]
				},
				_ = {
					begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
				},
				w = (e, t, n = {}) => {
					const s = a(
						{
							className: "comment",
							begin: e,
							end: t,
							contains: []
						},
						n
					);
					return (
						s.contains.push(_),
						s.contains.push({
							className: "doctag",
							begin: "(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",
							relevance: 0
						}),
						s
					);
				},
				N = w("//", "$"),
				y = w("/\\*", "\\*/"),
				R = w("#", "$");
			var k = Object.freeze({
				__proto__: null,
				IDENT_RE: h,
				UNDERSCORE_IDENT_RE: f,
				NUMBER_RE: p,
				C_NUMBER_RE: m,
				BINARY_NUMBER_RE: b,
				RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
				SHEBANG: (e = {}) => {
					const t = /^#![ ]*\//;
					return (
						e.binary && (e.begin = ((...e) => e.map(e => d(e)).join(""))(t, /.*\b/, e.binary, /\b.*/)),
						a(
							{
								className: "meta",
								begin: t,
								end: /$/,
								relevance: 0,
								"on:begin": (e, t) => {
									0 !== e.index && t.ignoreMatch();
								}
							},
							e
						)
					);
				},
				BACKSLASH_ESCAPE: x,
				APOS_STRING_MODE: E,
				QUOTE_STRING_MODE: v,
				PHRASAL_WORDS_MODE: _,
				COMMENT: w,
				C_LINE_COMMENT_MODE: N,
				C_BLOCK_COMMENT_MODE: y,
				HASH_COMMENT_MODE: R,
				NUMBER_MODE: { className: "number", begin: p, relevance: 0 },
				C_NUMBER_MODE: { className: "number", begin: m, relevance: 0 },
				BINARY_NUMBER_MODE: {
					className: "number",
					begin: b,
					relevance: 0
				},
				CSS_NUMBER_MODE: {
					className: "number",
					begin: p + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
					relevance: 0
				},
				REGEXP_MODE: {
					begin: /(?=\/[^/\n]*\/)/,
					contains: [
						{
							className: "regexp",
							begin: /\//,
							end: /\/[gimuy]*/,
							illegal: /\n/,
							contains: [
								x,
								{
									begin: /\[/,
									end: /\]/,
									relevance: 0,
									contains: [x]
								}
							]
						}
					]
				},
				TITLE_MODE: { className: "title", begin: h, relevance: 0 },
				UNDERSCORE_TITLE_MODE: {
					className: "title",
					begin: f,
					relevance: 0
				},
				METHOD_GUARD: {
					begin: "\\.\\s*[a-zA-Z_]\\w*",
					relevance: 0
				},
				END_SAME_AS_BEGIN: e =>
					Object.assign(e, {
						"on:begin": (e, t) => {
							t.data._beginMatch = e[1];
						},
						"on:end": (e, t) => {
							t.data._beginMatch !== e[1] && t.ignoreMatch();
						}
					})
			});
			const M = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"];
			function O(e) {
				function t(t, n) {
					return RegExp(d(t), "m" + (e.case_insensitive ? "i" : "") + (n ? "g" : ""));
				}
				class n {
					constructor() {
						(this.matchIndexes = {}), (this.regexes = []), (this.matchAt = 1), (this.position = 0);
					}
					addRule(e, t) {
						(t.position = this.position++),
							(this.matchIndexes[this.matchAt] = t),
							this.regexes.push([t, e]),
							(this.matchAt += (e => RegExp(e.toString() + "|").exec("").length - 1)(e) + 1);
					}
					compile() {
						0 === this.regexes.length && (this.exec = () => null);
						const e = this.regexes.map(e => e[1]);
						(this.matcherRe = t(
							((e, t = "|") => {
								const n = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
								let s = 0,
									r = "";
								for (let a = 0; a < e.length; a++) {
									s += 1;
									const i = s;
									let o = d(e[a]);
									for (a > 0 && (r += t), r += "("; o.length > 0; ) {
										const e = n.exec(o);
										if (null == e) {
											r += o;
											break;
										}
										(r += o.substring(0, e.index)),
											(o = o.substring(e.index + e[0].length)),
											"\\" === e[0][0] && e[1] ? (r += "\\" + (Number(e[1]) + i)) : ((r += e[0]), "(" === e[0] && s++);
									}
									r += ")";
								}
								return r;
							})(e),
							!0
						)),
							(this.lastIndex = 0);
					}
					exec(e) {
						this.matcherRe.lastIndex = this.lastIndex;
						const t = this.matcherRe.exec(e);
						if (!t) return null;
						const n = t.findIndex((e, t) => t > 0 && void 0 !== e),
							s = this.matchIndexes[n];
						return t.splice(0, n), Object.assign(t, s);
					}
				}
				class s {
					constructor() {
						(this.rules = []), (this.multiRegexes = []), (this.count = 0), (this.lastIndex = 0), (this.regexIndex = 0);
					}
					getMatcher(e) {
						if (this.multiRegexes[e]) return this.multiRegexes[e];
						const t = new n();
						return this.rules.slice(e).forEach(([e, n]) => t.addRule(e, n)), t.compile(), (this.multiRegexes[e] = t), t;
					}
					resumingScanAtSamePosition() {
						return 0 !== this.regexIndex;
					}
					considerAll() {
						this.regexIndex = 0;
					}
					addRule(e, t) {
						this.rules.push([e, t]), "begin" === t.type && this.count++;
					}
					exec(e) {
						const t = this.getMatcher(this.regexIndex);
						t.lastIndex = this.lastIndex;
						let n = t.exec(e);
						if (this.resumingScanAtSamePosition())
							if (n && n.index === this.lastIndex);
							else {
								const t = this.getMatcher(0);
								(t.lastIndex = this.lastIndex + 1), (n = t.exec(e));
							}
						return n && ((this.regexIndex += n.position + 1), this.regexIndex === this.count && this.considerAll()), n;
					}
				}
				function r(e, t) {
					"." === e.input[e.index - 1] && t.ignoreMatch();
				}
				if (e.contains && e.contains.includes("self")) throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
				return (
					(e.classNameAliases = a(e.classNameAliases || {})),
					(function n(i, o) {
						const l = i;
						if (i.compiled) return l;
						(i.compiled = !0), (i.__beforeBegin = null), (i.keywords = i.keywords || i.beginKeywords);
						let c = null;
						if (
							("object" == typeof i.keywords && ((c = i.keywords.$pattern), delete i.keywords.$pattern),
							i.keywords &&
								(i.keywords = ((e, t) => {
									const n = {};
									return (
										"string" == typeof e
											? s("keyword", e)
											: Object.keys(e).forEach(t => {
													s(t, e[t]);
												}),
										n
									);
									function s(e, s) {
										t && (s = s.toLowerCase()),
											s.split(" ").forEach(t => {
												const s = t.split("|");
												n[s[0]] = [e, A(s[0], s[1])];
											});
									}
								})(i.keywords, e.case_insensitive)),
							i.lexemes && c)
						)
							throw Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
						return (
							(l.keywordPatternRe = t(i.lexemes || c || /\w+/, !0)),
							o &&
								(i.beginKeywords && ((i.begin = "\\b(" + i.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)"), (i.__beforeBegin = r)),
								i.begin || (i.begin = /\B|\b/),
								(l.beginRe = t(i.begin)),
								i.endSameAsBegin && (i.end = i.begin),
								i.end || i.endsWithParent || (i.end = /\B|\b/),
								i.end && (l.endRe = t(i.end)),
								(l.terminator_end = d(i.end) || ""),
								i.endsWithParent && o.terminator_end && (l.terminator_end += (i.end ? "|" : "") + o.terminator_end)),
							i.illegal && (l.illegalRe = t(i.illegal)),
							void 0 === i.relevance && (i.relevance = 1),
							i.contains || (i.contains = []),
							(i.contains = [].concat(
								...i.contains.map(e =>
									(e => (
										e.variants &&
											!e.cached_variants &&
											(e.cached_variants = e.variants.map(t =>
												a(
													e,
													{
														variants: null
													},
													t
												)
											)),
										e.cached_variants
											? e.cached_variants
											: L(e)
												? a(e, {
														starts: e.starts ? a(e.starts) : null
													})
												: Object.isFrozen(e)
													? a(e)
													: e
									))("self" === e ? i : e)
								)
							)),
							i.contains.forEach(e => {
								n(e, l);
							}),
							i.starts && n(i.starts, o),
							(l.matcher = (e => {
								const t = new s();
								return (
									e.contains.forEach(e =>
										t.addRule(e.begin, {
											rule: e,
											type: "begin"
										})
									),
									e.terminator_end &&
										t.addRule(e.terminator_end, {
											type: "end"
										}),
									e.illegal &&
										t.addRule(e.illegal, {
											type: "illegal"
										}),
									t
								);
							})(l)),
							l
						);
					})(e)
				);
			}
			function L(e) {
				return !!e && (e.endsWithParent || L(e.starts));
			}
			function A(e, t) {
				return t ? Number(t) : (e => M.includes(e.toLowerCase()))(e) ? 0 : 1;
			}
			function j(e) {
				const t = {
					props: ["language", "code", "autodetect"],
					data: () => ({ detectedLanguage: "", unknownLanguage: !1 }),
					computed: {
						className() {
							return this.unknownLanguage ? "" : "hljs " + this.detectedLanguage;
						},
						highlighted() {
							if (!this.autoDetect && !e.getLanguage(this.language))
								return console.warn(`The language "${this.language}" you specified could not be found.`), (this.unknownLanguage = !0), r(this.code);
							let t;
							return (
								this.autoDetect
									? ((t = e.highlightAuto(this.code)), (this.detectedLanguage = t.language))
									: ((t = e.highlight(this.language, this.code, this.ignoreIllegals)), (this.detectedLanguage = this.language)),
								t.value
							);
						},
						autoDetect() {
							return !(this.language && ((e = this.autodetect), !e && "" !== e));
							var e;
						},
						ignoreIllegals: () => !0
					},
					render(e) {
						return e("pre", {}, [
							e("code", {
								class: this.className,
								domProps: { innerHTML: this.highlighted }
							})
						]);
					}
				};
				return {
					Component: t,
					VuePlugin: {
						install(e) {
							e.component("highlightjs", t);
						}
					}
				};
			}
			const I = r,
				S = a,
				{ nodeStream: T, mergeStreams: B } = o,
				P = Symbol("nomatch");
			return (e => {
				const n = [],
					r = Object.create(null),
					a = Object.create(null),
					i = [];
				let o = !0;
				const l = /(^(<[^>]+>|\t|)+|\n)/gm,
					c = "Could not find the language '{}', did you forget to load/include a language module?",
					u = {
						disableAutodetect: !0,
						name: "Plain text",
						contains: []
					};
				let d = {
					noHighlightRe: /^(no-?highlight)$/i,
					languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
					classPrefix: "hljs-",
					tabReplace: null,
					useBR: !1,
					languages: null,
					__emitter: g
				};
				function h(e) {
					return d.noHighlightRe.test(e);
				}
				function f(e, t, n, s) {
					const r = { code: t, language: e };
					N("before:highlight", r);
					const a = r.result ? r.result : p(r.language, r.code, n, s);
					return (a.code = r.code), N("after:highlight", a), a;
				}
				function p(e, t, n, a) {
					const i = t;
					function l(e, t) {
						const n = _.case_insensitive ? t[0].toLowerCase() : t[0];
						return Object.prototype.hasOwnProperty.call(e.keywords, n) && e.keywords[n];
					}
					function u() {
						null != y.subLanguage
							? (() => {
									if ("" === M) return;
									let e = null;
									if ("string" == typeof y.subLanguage) {
										if (!r[y.subLanguage]) return void k.addText(M);
										(e = p(y.subLanguage, M, !0, R[y.subLanguage])), (R[y.subLanguage] = e.top);
									} else e = m(M, y.subLanguage.length ? y.subLanguage : null);
									y.relevance > 0 && (L += e.relevance), k.addSublanguage(e.emitter, e.language);
								})()
							: (() => {
									if (!y.keywords) return void k.addText(M);
									let e = 0;
									y.keywordPatternRe.lastIndex = 0;
									let t = y.keywordPatternRe.exec(M),
										n = "";
									for (; t; ) {
										n += M.substring(e, t.index);
										const s = l(y, t);
										if (s) {
											const [e, r] = s;
											k.addText(n), (n = ""), (L += r);
											const a = _.classNameAliases[e] || e;
											k.addKeyword(t[0], a);
										} else n += t[0];
										(e = y.keywordPatternRe.lastIndex), (t = y.keywordPatternRe.exec(M));
									}
									(n += M.substr(e)), k.addText(n);
								})(),
							(M = "");
					}
					function g(e) {
						return e.className && k.openNode(_.classNameAliases[e.className] || e.className), (y = Object.create(e, { parent: { value: y } })), y;
					}
					function h(e, t, n) {
						let r = ((e, t) => {
							const n = e && e.exec(t);
							return n && 0 === n.index;
						})(e.endRe, n);
						if (r) {
							if (e["on:end"]) {
								const n = new s(e);
								e["on:end"](t, n), n.ignore && (r = !1);
							}
							if (r) {
								for (; e.endsParent && e.parent; ) e = e.parent;
								return e;
							}
						}
						if (e.endsWithParent) return h(e.parent, t, n);
					}
					function f(e) {
						return 0 === y.matcher.regexIndex ? ((M += e[0]), 1) : ((S = !0), 0);
					}
					function b(e) {
						const t = e[0],
							n = i.substr(e.index),
							s = h(y, e, n);
						if (!s) return P;
						const r = y;
						r.skip ? (M += t) : (r.returnEnd || r.excludeEnd || (M += t), u(), r.excludeEnd && (M = t));
						do {
							y.className && k.closeNode(), y.skip || y.subLanguage || (L += y.relevance), (y = y.parent);
						} while (y !== s.parent);
						return s.starts && (s.endSameAsBegin && (s.starts.endRe = s.endRe), g(s.starts)), r.returnEnd ? 0 : t.length;
					}
					let x = {};
					function E(t, r) {
						const a = r && r[0];
						if (((M += t), null == a)) return u(), 0;
						if ("begin" === x.type && "end" === r.type && x.index === r.index && "" === a) {
							if (((M += i.slice(r.index, r.index + 1)), !o)) {
								const t = Error("0 width match regex");
								throw ((t.languageName = e), (t.badRule = x.rule), t);
							}
							return 1;
						}
						if (((x = r), "begin" === r.type))
							return (function (e) {
								const t = e[0],
									n = e.rule,
									r = new s(n),
									a = [n.__beforeBegin, n["on:begin"]];
								for (const n of a) if (n && (n(e, r), r.ignore)) return f(t);
								return (
									n && n.endSameAsBegin && (n.endRe = RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "m")),
									n.skip ? (M += t) : (n.excludeBegin && (M += t), u(), n.returnBegin || n.excludeBegin || (M = t)),
									g(n),
									n.returnBegin ? 0 : t.length
								);
							})(r);
						if ("illegal" === r.type && !n) {
							const e = Error('Illegal lexeme "' + a + '" for mode "' + (y.className || "<unnamed>") + '"');
							throw ((e.mode = y), e);
						}
						if ("end" === r.type) {
							const e = b(r);
							if (e !== P) return e;
						}
						if ("illegal" === r.type && "" === a) return 1;
						if (j > 1e5 && j > 3 * r.index) throw Error("potential infinite loop, way more iterations than matches");
						return (M += a), a.length;
					}
					const _ = v(e);
					if (!_) throw (console.error(c.replace("{}", e)), Error('Unknown language: "' + e + '"'));
					const w = O(_);
					let N = "",
						y = a || w;
					const R = {},
						k = new d.__emitter(d);
					(() => {
						const e = [];
						for (let t = y; t !== _; t = t.parent) t.className && e.unshift(t.className);
						e.forEach(e => k.openNode(e));
					})();
					let M = "",
						L = 0,
						A = 0,
						j = 0,
						S = !1;
					try {
						for (y.matcher.considerAll(); ; ) {
							j++, S ? (S = !1) : y.matcher.considerAll(), (y.matcher.lastIndex = A);
							const e = y.matcher.exec(i);
							if (!e) break;
							const t = E(i.substring(A, e.index), e);
							A = e.index + t;
						}
						return (
							E(i.substr(A)),
							k.closeAllNodes(),
							k.finalize(),
							(N = k.toHTML()),
							{
								relevance: L,
								value: N,
								language: e,
								illegal: !1,
								emitter: k,
								top: y
							}
						);
					} catch (t) {
						if (t.message && t.message.includes("Illegal"))
							return {
								illegal: !0,
								illegalBy: {
									msg: t.message,
									context: i.slice(A - 100, A + 100),
									mode: t.mode
								},
								sofar: N,
								relevance: 0,
								value: I(i),
								emitter: k
							};
						if (o)
							return {
								illegal: !1,
								relevance: 0,
								value: I(i),
								emitter: k,
								language: e,
								top: y,
								errorRaised: t
							};
						throw t;
					}
				}
				function m(e, t) {
					t = t || d.languages || Object.keys(r);
					const n = (e => {
							const t = {
								relevance: 0,
								emitter: new d.__emitter(d),
								value: I(e),
								illegal: !1,
								top: u
							};
							return t.emitter.addText(e), t;
						})(e),
						s = t
							.filter(v)
							.filter(w)
							.map(t => p(t, e, !1));
					s.unshift(n);
					const a = s.sort((e, t) => {
							if (e.relevance !== t.relevance) return t.relevance - e.relevance;
							if (e.language && t.language) {
								if (v(e.language).supersetOf === t.language) return 1;
								if (v(t.language).supersetOf === e.language) return -1;
							}
							return 0;
						}),
						[i, o] = a,
						l = i;
					return (l.second_best = o), l;
				}
				function b(e) {
					return d.tabReplace || d.useBR ? e.replace(l, e => ("\n" === e ? (d.useBR ? "<br>" : e) : d.tabReplace ? e.replace(/\t/g, d.tabReplace) : e)) : e;
				}
				function x(e) {
					let t = null;
					const n = (e => {
						let t = e.className + " ";
						t += e.parentNode ? e.parentNode.className : "";
						const n = d.languageDetectRe.exec(t);
						if (n) {
							const t = v(n[1]);
							return t || (console.warn(c.replace("{}", n[1])), console.warn("Falling back to no-highlight mode for this block.", e)), t ? n[1] : "no-highlight";
						}
						return t.split(/\s+/).find(e => h(e) || v(e));
					})(e);
					if (h(n)) return;
					N("before:highlightBlock", { block: e, language: n }),
						d.useBR ? ((t = document.createElement("div")), (t.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ /]*>/g, "\n"))) : (t = e);
					const s = t.textContent,
						r = n ? f(n, s, !0) : m(s),
						i = T(t);
					if (i.length) {
						const e = document.createElement("div");
						(e.innerHTML = r.value), (r.value = B(i, T(e), s));
					}
					(r.value = b(r.value)),
						N("after:highlightBlock", { block: e, result: r }),
						(e.innerHTML = r.value),
						(e.className = ((e, t, n) => {
							const s = t ? a[t] : n,
								r = [e.trim()];
							return e.match(/\bhljs\b/) || r.push("hljs"), e.includes(s) || r.push(s), r.join(" ").trim();
						})(e.className, n, r.language)),
						(e.result = {
							language: r.language,
							re: r.relevance,
							relavance: r.relevance
						}),
						r.second_best &&
							(e.second_best = {
								language: r.second_best.language,
								re: r.second_best.relevance,
								relavance: r.second_best.relevance
							});
				}
				const E = () => {
					if (E.called) return;
					E.called = !0;
					const e = document.querySelectorAll("pre code");
					n.forEach.call(e, x);
				};
				function v(e) {
					return (e = (e || "").toLowerCase()), r[e] || r[a[e]];
				}
				function _(e, { languageName: t }) {
					"string" == typeof e && (e = [e]),
						e.forEach(e => {
							a[e] = t;
						});
				}
				function w(e) {
					const t = v(e);
					return t && !t.disableAutodetect;
				}
				function N(e, t) {
					const n = e;
					i.forEach(e => {
						e[n] && e[n](t);
					});
				}
				Object.assign(e, {
					highlight: f,
					highlightAuto: m,
					fixMarkup: e => (
						console.warn("fixMarkup is deprecated and will be removed entirely in v11.0"), console.warn("Please see https://github.com/highlightjs/highlight.js/issues/2534"), b(e)
					),
					highlightBlock: x,
					configure: e => {
						e.useBR &&
							(console.warn("'useBR' option is deprecated and will be removed entirely in v11.0"), console.warn("Please see https://github.com/highlightjs/highlight.js/issues/2559")),
							(d = S(d, e));
					},
					initHighlighting: E,
					initHighlightingOnLoad: () => {
						window.addEventListener("DOMContentLoaded", E, !1);
					},
					registerLanguage: (t, n) => {
						let s = null;
						try {
							s = n(e);
						} catch (e) {
							if ((console.error("Language definition for '{}' could not be registered.".replace("{}", t)), !o)) throw e;
							console.error(e), (s = u);
						}
						s.name || (s.name = t), (r[t] = s), (s.rawDefinition = n.bind(null, e)), s.aliases && _(s.aliases, { languageName: t });
					},
					listLanguages: () => Object.keys(r),
					getLanguage: v,
					registerAliases: _,
					requireLanguage: e => {
						console.warn("requireLanguage is deprecated and will be removed entirely in the future."), console.warn("Please see https://github.com/highlightjs/highlight.js/pull/2844");
						const t = v(e);
						if (t) return t;
						throw Error("The '{}' language is required, but not loaded.".replace("{}", e));
					},
					autoDetection: w,
					inherit: S,
					addPlugin: e => {
						i.push(e);
					},
					vuePlugin: j(e).VuePlugin
				}),
					(e.debugMode = () => {
						o = !1;
					}),
					(e.safeMode = () => {
						o = !0;
					}),
					(e.versionString = "10.4.0");
				for (const e in k) "object" == typeof k[e] && t(k[e]);
				return Object.assign(e, k), e;
			})({});
		})();

		hljs.registerLanguage(
			"java",
			(() => {
				"use strict";
				return e => {
					var n =
							"false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",
						a = {
							className: "meta",
							begin: "@[\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*",
							contains: [{ begin: /\(/, end: /\)/, contains: ["self"] }]
						},
						s = "\\.([0-9](_*[0-9])*)",
						i = "[0-9a-fA-F](_*[0-9a-fA-F])*",
						r = {
							className: "number",
							variants: [
								{
									begin: `(\\b([0-9](_*[0-9])*)((${s})|\\.)?|(${s}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
								},
								{
									begin: `\\b([0-9](_*[0-9])*)((${s})[fFdD]?\\b|\\.([fFdD]\\b)?)`
								},
								{
									begin: `(${s})[fFdD]?\\b`
								},
								{ begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b" },
								{
									begin: `\\b0[xX]((${i})\\.?|(${i})?\\.(${i}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
								},
								{ begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
								{ begin: `\\b0[xX](${i})[lL]?\\b` },
								{
									begin: "\\b0(_*[0-7])*[lL]?\\b"
								},
								{ begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
							],
							relevance: 0
						};
					return {
						name: "Java",
						aliases: ["jsp"],
						keywords: n,
						illegal: /<\/|#/,
						contains: [
							e.COMMENT("/\\*\\*", "\\*/", {
								relevance: 0,
								contains: [
									{ begin: /\w+@/, relevance: 0 },
									{ className: "doctag", begin: "@[A-Za-z]+" }
								]
							}),
							{
								begin: /import java\.[a-z]+\./,
								keywords: "import",
								relevance: 2
							},
							e.C_LINE_COMMENT_MODE,
							e.C_BLOCK_COMMENT_MODE,
							e.APOS_STRING_MODE,
							e.QUOTE_STRING_MODE,
							{
								className: "class",
								beginKeywords: "class interface enum",
								end: /[{;=]/,
								excludeEnd: !0,
								keywords: "class interface enum",
								illegal: /[:"\[\]]/,
								contains: [
									{
										beginKeywords: "extends implements"
									},
									e.UNDERSCORE_TITLE_MODE
								]
							},
							{
								beginKeywords: "new throw return else",
								relevance: 0
							},
							{
								className: "class",
								begin: "record\\s+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
								returnBegin: !0,
								excludeEnd: !0,
								end: /[{;=]/,
								keywords: n,
								contains: [
									{ beginKeywords: "record" },
									{
										begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
										returnBegin: !0,
										relevance: 0,
										contains: [e.UNDERSCORE_TITLE_MODE]
									},
									{
										className: "params",
										begin: /\(/,
										end: /\)/,
										keywords: n,
										relevance: 0,
										contains: [e.C_BLOCK_COMMENT_MODE]
									},
									e.C_LINE_COMMENT_MODE,
									e.C_BLOCK_COMMENT_MODE
								]
							},
							{
								className: "function",
								begin:
									"([\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*(<[\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*(\\s*,\\s*[\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*)*>)?\\s+)+" +
									e.UNDERSCORE_IDENT_RE +
									"\\s*\\(",
								returnBegin: !0,
								end: /[{;=]/,
								excludeEnd: !0,
								keywords: n,
								contains: [
									{
										begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
										returnBegin: !0,
										relevance: 0,
										contains: [e.UNDERSCORE_TITLE_MODE]
									},
									{
										className: "params",
										begin: /\(/,
										end: /\)/,
										keywords: n,
										relevance: 0,
										contains: [a, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, r, e.C_BLOCK_COMMENT_MODE]
									},
									e.C_LINE_COMMENT_MODE,
									e.C_BLOCK_COMMENT_MODE
								]
							},
							r,
							a
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"http",
			(() => {
				"use strict";
				return e => {
					var n = "HTTP/[0-9\\.]+";
					return {
						name: "HTTP",
						aliases: ["https"],
						illegal: "\\S",
						contains: [
							{
								begin: "^" + n,
								end: "$",
								contains: [
									{
										className: "number",
										begin: "\\b\\d{3}\\b"
									}
								]
							},
							{
								begin: "^[A-Z]+ (.*?) " + n + "$",
								returnBegin: !0,
								end: "$",
								contains: [
									{
										className: "string",
										begin: " ",
										end: " ",
										excludeBegin: !0,
										excludeEnd: !0
									},
									{
										begin: n
									},
									{ className: "keyword", begin: "[A-Z]+" }
								]
							},
							{
								className: "attribute",
								begin: "^\\w",
								end: ": ",
								excludeEnd: !0,
								illegal: "\\n|\\s|=",
								starts: { end: "$", relevance: 0 }
							},
							{
								begin: "\\n\\n",
								starts: { subLanguage: [], endsWithParent: !0 }
							}
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"nginx",
			(() => {
				"use strict";
				return e => {
					const n = {
							className: "variable",
							variants: [
								{ begin: /\$\d+/ },
								{ begin: /\$\{/, end: /\}/ },
								{
									begin: /[$@]/ + e.UNDERSCORE_IDENT_RE
								}
							]
						},
						a = {
							endsWithParent: !0,
							keywords: {
								$pattern: "[a-z/_]+",
								literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
							},
							relevance: 0,
							illegal: "=>",
							contains: [
								e.HASH_COMMENT_MODE,
								{
									className: "string",
									contains: [e.BACKSLASH_ESCAPE, n],
									variants: [
										{ begin: /"/, end: /"/ },
										{ begin: /'/, end: /'/ }
									]
								},
								{
									begin: "([a-z]+):/",
									end: "\\s",
									endsWithParent: !0,
									excludeEnd: !0,
									contains: [n]
								},
								{
									className: "regexp",
									contains: [e.BACKSLASH_ESCAPE, n],
									variants: [
										{
											begin: "\\s\\^",
											end: "\\s|\\{|;",
											returnEnd: !0
										},
										{
											begin: "~\\*?\\s+",
											end: "\\s|\\{|;",
											returnEnd: !0
										},
										{
											begin: "\\*(\\.[a-z\\-]+)+"
										},
										{ begin: "([a-z\\-]+\\.)+\\*" }
									]
								},
								{
									className: "number",
									begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
								},
								{
									className: "number",
									begin: "\\b\\d+[kKmMgGdshdwy]*\\b",
									relevance: 0
								},
								n
							]
						};
					return {
						name: "Nginx config",
						aliases: ["nginxconf"],
						contains: [
							e.HASH_COMMENT_MODE,
							{
								begin: e.UNDERSCORE_IDENT_RE + "\\s+\\{",
								returnBegin: !0,
								end: /\{/,
								contains: [
									{
										className: "section",
										begin: e.UNDERSCORE_IDENT_RE
									}
								],
								relevance: 0
							},
							{
								begin: e.UNDERSCORE_IDENT_RE + "\\s",
								end: ";|\\{",
								returnBegin: !0,
								contains: [
									{
										className: "attribute",
										begin: e.UNDERSCORE_IDENT_RE,
										starts: a
									}
								],
								relevance: 0
							}
						],
						illegal: "[^\\s\\}]"
					};
				};
			})()
		);
		hljs.registerLanguage(
			"coffeescript",
			(() => {
				"use strict";
				const e = [
						"as",
						"in",
						"of",
						"if",
						"for",
						"while",
						"finally",
						"var",
						"new",
						"function",
						"do",
						"return",
						"void",
						"else",
						"break",
						"catch",
						"instanceof",
						"with",
						"throw",
						"case",
						"default",
						"try",
						"switch",
						"continue",
						"typeof",
						"delete",
						"let",
						"yield",
						"const",
						"class",
						"debugger",
						"async",
						"await",
						"static",
						"import",
						"from",
						"export",
						"extends"
					],
					n = ["true", "false", "null", "undefined", "NaN", "Infinity"],
					a = [].concat(
						[
							"setInterval",
							"setTimeout",
							"clearInterval",
							"clearTimeout",
							"require",
							"exports",
							"eval",
							"isFinite",
							"isNaN",
							"parseFloat",
							"parseInt",
							"decodeURI",
							"decodeURIComponent",
							"encodeURI",
							"encodeURIComponent",
							"escape",
							"unescape"
						],
						["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
						[
							"Intl",
							"DataView",
							"Number",
							"Math",
							"Date",
							"String",
							"RegExp",
							"Object",
							"Function",
							"Boolean",
							"Error",
							"Symbol",
							"Set",
							"Map",
							"WeakSet",
							"WeakMap",
							"Proxy",
							"Reflect",
							"JSON",
							"Promise",
							"Float64Array",
							"Int16Array",
							"Int32Array",
							"Int8Array",
							"Uint16Array",
							"Uint32Array",
							"Float32Array",
							"Array",
							"Uint8Array",
							"Uint8ClampedArray",
							"ArrayBuffer"
						],
						["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]
					);
				return r => {
					const t = {
						keyword: e
							.concat(["then", "unless", "until", "loop", "by", "when", "and", "or", "is", "isnt", "not"])
							.filter(((i = ["var", "const", "let", "function", "static"]), e => !i.includes(e)))
							.join(" "),
						literal: n.concat(["yes", "no", "on", "off"]).join(" "),
						built_in: a.concat(["npm", "print"]).join(" ")
					};
					var i;
					const s = "[A-Za-z$_][0-9A-Za-z$_]*",
						o = {
							className: "subst",
							begin: /#\{/,
							end: /\}/,
							keywords: t
						},
						c = [
							r.BINARY_NUMBER_MODE,
							r.inherit(r.C_NUMBER_MODE, {
								starts: {
									end: "(\\s*/)?",
									relevance: 0
								}
							}),
							{
								className: "string",
								variants: [
									{
										begin: /'''/,
										end: /'''/,
										contains: [r.BACKSLASH_ESCAPE]
									},
									{
										begin: /'/,
										end: /'/,
										contains: [r.BACKSLASH_ESCAPE]
									},
									{
										begin: /"""/,
										end: /"""/,
										contains: [r.BACKSLASH_ESCAPE, o]
									},
									{
										begin: /"/,
										end: /"/,
										contains: [r.BACKSLASH_ESCAPE, o]
									}
								]
							},
							{
								className: "regexp",
								variants: [
									{
										begin: "///",
										end: "///",
										contains: [o, r.HASH_COMMENT_MODE]
									},
									{
										begin: "//[gim]{0,3}(?=\\W)",
										relevance: 0
									},
									{
										begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/
									}
								]
							},
							{ begin: "@" + s },
							{
								subLanguage: "javascript",
								excludeBegin: !0,
								excludeEnd: !0,
								variants: [
									{
										begin: "```",
										end: "```"
									},
									{ begin: "`", end: "`" }
								]
							}
						];
					o.contains = c;
					const l = r.inherit(r.TITLE_MODE, { begin: s }),
						d = "(\\(.*\\))?\\s*\\B[-=]>",
						g = {
							className: "params",
							begin: "\\([^\\(]",
							returnBegin: !0,
							contains: [
								{
									begin: /\(/,
									end: /\)/,
									keywords: t,
									contains: ["self"].concat(c)
								}
							]
						};
					return {
						name: "CoffeeScript",
						aliases: ["coffee", "cson", "iced"],
						keywords: t,
						illegal: /\/\*/,
						contains: c.concat([
							r.COMMENT("###", "###"),
							r.HASH_COMMENT_MODE,
							{
								className: "function",
								begin: "^\\s*" + s + "\\s*=\\s*" + d,
								end: "[-=]>",
								returnBegin: !0,
								contains: [l, g]
							},
							{
								begin: /[:\(,=]\s*/,
								relevance: 0,
								contains: [
									{
										className: "function",
										begin: d,
										end: "[-=]>",
										returnBegin: !0,
										contains: [g]
									}
								]
							},
							{
								className: "class",
								beginKeywords: "class",
								end: "$",
								illegal: /[:="\[\]]/,
								contains: [
									{
										beginKeywords: "extends",
										endsWithParent: !0,
										illegal: /[:="\[\]]/,
										contains: [l]
									},
									l
								]
							},
							{
								begin: s + ":",
								end: ":",
								returnBegin: !0,
								returnEnd: !0,
								relevance: 0
							}
						])
					};
				};
			})()
		);
		hljs.registerLanguage(
			"cpp",
			(() => {
				"use strict";
				return e => {
					const t = (e => {
						function t(e) {
							return "(?:" + e + ")?";
						}
						var n = e.COMMENT("//", "$", {
								contains: [
									{
										begin: /\\\n/
									}
								]
							}),
							r = "[a-zA-Z_]\\w*::",
							a = "(decltype\\(auto\\)|" + t(r) + "[a-zA-Z_]\\w*" + t("<.*?>") + ")",
							i = {
								className: "keyword",
								begin: "\\b[a-z\\d_]*_t\\b"
							},
							s = {
								className: "string",
								variants: [
									{
										begin: '(u8?|U|L)?"',
										end: '"',
										illegal: "\\n",
										contains: [e.BACKSLASH_ESCAPE]
									},
									{
										begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
										end: "'",
										illegal: "."
									},
									e.END_SAME_AS_BEGIN({
										begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
										end: /\)([^()\\ ]{0,16})"/
									})
								]
							},
							c = {
								className: "number",
								variants: [
									{ begin: "\\b(0b[01']+)" },
									{
										begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
									},
									{
										begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
									}
								],
								relevance: 0
							},
							o = {
								className: "meta",
								begin: /#\s*[a-z]+\b/,
								end: /$/,
								keywords: {
									"meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
								},
								contains: [
									{ begin: /\\\n/, relevance: 0 },
									e.inherit(s, { className: "meta-string" }),
									{
										className: "meta-string",
										begin: /<.*?>/,
										end: /$/,
										illegal: "\\n"
									},
									n,
									e.C_BLOCK_COMMENT_MODE
								]
							},
							l = {
								className: "title",
								begin: t(r) + e.IDENT_RE,
								relevance: 0
							},
							d = t(r) + e.IDENT_RE + "\\s*\\(",
							u = {
								keyword:
									"int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
								built_in:
									"std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
								literal: "true false nullptr NULL"
							},
							m = [o, i, n, e.C_BLOCK_COMMENT_MODE, c, s],
							p = {
								variants: [
									{ begin: /=/, end: /;/ },
									{ begin: /\(/, end: /\)/ },
									{
										beginKeywords: "new throw return else",
										end: /;/
									}
								],
								keywords: u,
								contains: m.concat([
									{
										begin: /\(/,
										end: /\)/,
										keywords: u,
										contains: m.concat(["self"]),
										relevance: 0
									}
								]),
								relevance: 0
							},
							_ = {
								className: "function",
								begin: "(" + a + "[\\*&\\s]+)+" + d,
								returnBegin: !0,
								end: /[{;=]/,
								excludeEnd: !0,
								keywords: u,
								illegal: /[^\w\s\*&:<>]/,
								contains: [
									{
										begin: "decltype\\(auto\\)",
										keywords: u,
										relevance: 0
									},
									{
										begin: d,
										returnBegin: !0,
										contains: [l],
										relevance: 0
									},
									{
										className: "params",
										begin: /\(/,
										end: /\)/,
										keywords: u,
										relevance: 0,
										contains: [
											n,
											e.C_BLOCK_COMMENT_MODE,
											s,
											c,
											i,
											{
												begin: /\(/,
												end: /\)/,
												keywords: u,
												relevance: 0,
												contains: ["self", n, e.C_BLOCK_COMMENT_MODE, s, c, i]
											}
										]
									},
									i,
									n,
									e.C_BLOCK_COMMENT_MODE,
									o
								]
							};
						return {
							aliases: ["c", "cc", "h", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
							keywords: u,
							disableAutodetect: !0,
							illegal: "</",
							contains: [].concat(p, _, m, [
								o,
								{
									begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
									end: ">",
									keywords: u,
									contains: ["self", i]
								},
								{ begin: e.IDENT_RE + "::", keywords: u },
								{
									className: "class",
									beginKeywords: "enum class struct union",
									end: /[{;:<>=]/,
									contains: [{ beginKeywords: "final class struct" }, e.TITLE_MODE]
								}
							]),
							exports: {
								preprocessor: o,
								strings: s,
								keywords: u
							}
						};
					})(e);
					return (t.disableAutodetect = !1), (t.name = "C++"), (t.aliases = ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"]), t;
				};
			})()
		);
		hljs.registerLanguage(
			"objectivec",
			(() => {
				"use strict";
				return e => {
					const n = /[a-zA-Z@][a-zA-Z0-9_]*/,
						_ = {
							$pattern: n,
							keyword: "@interface @class @protocol @implementation"
						};
					return {
						name: "Objective-C",
						aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"],
						keywords: {
							$pattern: n,
							keyword:
								"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
							literal: "false true FALSE TRUE nil YES NO NULL",
							built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
						},
						illegal: "</",
						contains: [
							{
								className: "built_in",
								begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
							},
							e.C_LINE_COMMENT_MODE,
							e.C_BLOCK_COMMENT_MODE,
							e.C_NUMBER_MODE,
							e.QUOTE_STRING_MODE,
							e.APOS_STRING_MODE,
							{
								className: "string",
								variants: [
									{
										begin: '@"',
										end: '"',
										illegal: "\\n",
										contains: [e.BACKSLASH_ESCAPE]
									}
								]
							},
							{
								className: "meta",
								begin: /#\s*[a-z]+\b/,
								end: /$/,
								keywords: {
									"meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
								},
								contains: [
									{ begin: /\\\n/, relevance: 0 },
									e.inherit(e.QUOTE_STRING_MODE, {
										className: "meta-string"
									}),
									{
										className: "meta-string",
										begin: /<.*?>/,
										end: /$/,
										illegal: "\\n"
									},
									e.C_LINE_COMMENT_MODE,
									e.C_BLOCK_COMMENT_MODE
								]
							},
							{
								className: "class",
								begin: "(" + _.keyword.split(" ").join("|") + ")\\b",
								end: /(\{|$)/,
								excludeEnd: !0,
								keywords: _,
								contains: [e.UNDERSCORE_TITLE_MODE]
							},
							{
								begin: "\\." + e.UNDERSCORE_IDENT_RE,
								relevance: 0
							}
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"less",
			(() => {
				"use strict";
				return e => {
					var n = "([\\w-]+|@\\{[\\w-]+\\})",
						a = [],
						s = [],
						t = e => ({
							className: "string",
							begin: "~?" + e + ".*?" + e
						}),
						r = (e, n, a) => ({
							className: e,
							begin: n,
							relevance: a
						}),
						i = {
							begin: "\\(",
							end: "\\)",
							contains: s,
							relevance: 0
						};
					s.push(
						e.C_LINE_COMMENT_MODE,
						e.C_BLOCK_COMMENT_MODE,
						t("'"),
						t('"'),
						e.CSS_NUMBER_MODE,
						{
							begin: "(url|data-uri)\\(",
							starts: {
								className: "string",
								end: "[\\)\\n]",
								excludeEnd: !0
							}
						},
						r("number", "#[0-9A-Fa-f]+\\b"),
						i,
						r("variable", "@@?[\\w-]+", 10),
						r("variable", "@\\{[\\w-]+\\}"),
						r("built_in", "~?`[^`]*?`"),
						{
							className: "attribute",
							begin: "[\\w-]+\\s*:",
							end: ":",
							returnBegin: !0,
							excludeEnd: !0
						},
						{ className: "meta", begin: "!important" }
					);
					var c = s.concat({ begin: /\{/, end: /\}/, contains: a }),
						l = {
							beginKeywords: "when",
							endsWithParent: !0,
							contains: [
								{
									beginKeywords: "and not"
								}
							].concat(s)
						},
						g = {
							begin: n + "\\s*:",
							returnBegin: !0,
							end: "[;}]",
							relevance: 0,
							contains: [
								{
									className: "attribute",
									begin: n,
									end: ":",
									excludeEnd: !0,
									starts: {
										endsWithParent: !0,
										illegal: "[<=$]",
										relevance: 0,
										contains: s
									}
								}
							]
						},
						d = {
							className: "keyword",
							begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
							starts: {
								end: "[;{}]",
								returnEnd: !0,
								contains: s,
								relevance: 0
							}
						},
						o = {
							className: "variable",
							variants: [
								{ begin: "@[\\w-]+\\s*:", relevance: 15 },
								{
									begin: "@[\\w-]+"
								}
							],
							starts: { end: "[;}]", returnEnd: !0, contains: c }
						},
						b = {
							variants: [
								{
									begin: "[\\.#:&\\[>]",
									end: "[;{}]"
								},
								{ begin: n, end: /\{/ }
							],
							returnBegin: !0,
							returnEnd: !0,
							illegal: "[<='$\"]",
							relevance: 0,
							contains: [
								e.C_LINE_COMMENT_MODE,
								e.C_BLOCK_COMMENT_MODE,
								l,
								r("keyword", "all\\b"),
								r("variable", "@\\{[\\w-]+\\}"),
								r("selector-tag", n + "%?", 0),
								r("selector-id", "#" + n),
								r("selector-class", "\\." + n, 0),
								r("selector-tag", "&", 0),
								{
									className: "selector-attr",
									begin: "\\[",
									end: "\\]"
								},
								{
									className: "selector-pseudo",
									begin: /:(:)?[a-zA-Z0-9_\-+()"'.]+/
								},
								{ begin: "\\(", end: "\\)", contains: c },
								{
									begin: "!important"
								}
							]
						};
					return (
						a.push(e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, d, o, g, b),
						{
							name: "Less",
							case_insensitive: !0,
							illegal: "[=>'/<($\"]",
							contains: a
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"typescript",
			(() => {
				"use strict";
				const e = "[A-Za-z$_][0-9A-Za-z$_]*",
					n = [
						"as",
						"in",
						"of",
						"if",
						"for",
						"while",
						"finally",
						"var",
						"new",
						"function",
						"do",
						"return",
						"void",
						"else",
						"break",
						"catch",
						"instanceof",
						"with",
						"throw",
						"case",
						"default",
						"try",
						"switch",
						"continue",
						"typeof",
						"delete",
						"let",
						"yield",
						"const",
						"class",
						"debugger",
						"async",
						"await",
						"static",
						"import",
						"from",
						"export",
						"extends"
					],
					a = ["true", "false", "null", "undefined", "NaN", "Infinity"],
					s = [].concat(
						[
							"setInterval",
							"setTimeout",
							"clearInterval",
							"clearTimeout",
							"require",
							"exports",
							"eval",
							"isFinite",
							"isNaN",
							"parseFloat",
							"parseInt",
							"decodeURI",
							"decodeURIComponent",
							"encodeURI",
							"encodeURIComponent",
							"escape",
							"unescape"
						],
						["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
						[
							"Intl",
							"DataView",
							"Number",
							"Math",
							"Date",
							"String",
							"RegExp",
							"Object",
							"Function",
							"Boolean",
							"Error",
							"Symbol",
							"Set",
							"Map",
							"WeakSet",
							"WeakMap",
							"Proxy",
							"Reflect",
							"JSON",
							"Promise",
							"Float64Array",
							"Int16Array",
							"Int32Array",
							"Int8Array",
							"Uint16Array",
							"Uint32Array",
							"Float32Array",
							"Array",
							"Uint8Array",
							"Uint8ClampedArray",
							"ArrayBuffer"
						],
						["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]
					);
				function t(e) {
					return i("(?=", e, ")");
				}
				function i(...e) {
					return e
						.map(e => {
							return (n = e) ? ("string" == typeof n ? n : n.source) : null;
							var n;
						})
						.join("");
				}
				return r => {
					const c = {
							$pattern: e,
							keyword: n.concat(["type", "namespace", "typedef", "interface", "public", "private", "protected", "implements", "declare", "abstract", "readonly"]).join(" "),
							literal: a.join(" "),
							built_in: s.concat(["any", "void", "number", "boolean", "string", "object", "never", "enum"]).join(" ")
						},
						o = {
							className: "meta",
							begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
						},
						l = (e, n, a) => {
							const s = e.contains.findIndex(e => e.label === n);
							if (-1 === s) throw Error("can not find mode to replace");
							e.contains.splice(s, 1, a);
						},
						b = (r => {
							const c = e,
								o = {
									begin: /<[A-Za-z0-9\\._:-]+/,
									end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
									isTrulyOpeningTag: (e, n) => {
										const a = e[0].length + e.index,
											s = e.input[a];
										"<" !== s
											? ">" === s &&
												(((e, { after: n }) => {
													const a = "</" + e[0].slice(1);
													return -1 !== e.input.indexOf(a, n);
												})(e, { after: a }) ||
													n.ignoreMatch())
											: n.ignoreMatch();
									}
								},
								l = {
									$pattern: e,
									keyword: n.join(" "),
									literal: a.join(" "),
									built_in: s.join(" ")
								},
								b = "\\.([0-9](_?[0-9])*)",
								d = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",
								g = {
									className: "number",
									variants: [
										{
											begin: `(\\b(${d})((${b})|\\.)?|(${b}))[eE][+-]?([0-9](_?[0-9])*)\\b`
										},
										{
											begin: `\\b(${d})\\b((${b})\\b|\\.)?|(${b})\\b`
										},
										{
											begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
										},
										{
											begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
										},
										{
											begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
										},
										{
											begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
										},
										{
											begin: "\\b0[0-7]+n?\\b"
										}
									],
									relevance: 0
								},
								u = {
									className: "subst",
									begin: "\\$\\{",
									end: "\\}",
									keywords: l,
									contains: []
								},
								E = {
									begin: "html`",
									end: "",
									starts: {
										end: "`",
										returnEnd: !1,
										contains: [r.BACKSLASH_ESCAPE, u],
										subLanguage: "xml"
									}
								},
								m = {
									begin: "css`",
									end: "",
									starts: {
										end: "`",
										returnEnd: !1,
										contains: [r.BACKSLASH_ESCAPE, u],
										subLanguage: "css"
									}
								},
								_ = {
									className: "string",
									begin: "`",
									end: "`",
									contains: [r.BACKSLASH_ESCAPE, u]
								},
								y = {
									className: "comment",
									variants: [
										r.COMMENT("/\\*\\*", "\\*/", {
											relevance: 0,
											contains: [
												{
													className: "doctag",
													begin: "@[A-Za-z]+",
													contains: [
														{
															className: "type",
															begin: "\\{",
															end: "\\}",
															relevance: 0
														},
														{
															className: "variable",
															begin: c + "(?=\\s*(-)|$)",
															endsParent: !0,
															relevance: 0
														},
														{
															begin: /(?=[^\n])\s/,
															relevance: 0
														}
													]
												}
											]
										}),
										r.C_BLOCK_COMMENT_MODE,
										r.C_LINE_COMMENT_MODE
									]
								},
								p = [r.APOS_STRING_MODE, r.QUOTE_STRING_MODE, E, m, _, g, r.REGEXP_MODE];
							u.contains = p.concat({
								begin: /\{/,
								end: /\}/,
								keywords: l,
								contains: ["self"].concat(p)
							});
							const N = [].concat(y, u.contains),
								f = N.concat([
									{
										begin: /\(/,
										end: /\)/,
										keywords: l,
										contains: ["self"].concat(N)
									}
								]),
								A = {
									className: "params",
									begin: /\(/,
									end: /\)/,
									excludeBegin: !0,
									excludeEnd: !0,
									keywords: l,
									contains: f
								};
							return {
								name: "Javascript",
								aliases: ["js", "jsx", "mjs", "cjs"],
								keywords: l,
								exports: { PARAMS_CONTAINS: f },
								illegal: /#(?![$_A-z])/,
								contains: [
									r.SHEBANG({
										label: "shebang",
										binary: "node",
										relevance: 5
									}),
									{
										label: "use_strict",
										className: "meta",
										relevance: 10,
										begin: /^\s*['"]use (strict|asm)['"]/
									},
									r.APOS_STRING_MODE,
									r.QUOTE_STRING_MODE,
									E,
									m,
									_,
									y,
									g,
									{
										begin: i(/[{,\n]\s*/, t(i(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c + "\\s*:"))),
										relevance: 0,
										contains: [
											{
												className: "attr",
												begin: c + t("\\s*:"),
												relevance: 0
											}
										]
									},
									{
										begin: "(" + r.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
										keywords: "return throw case",
										contains: [
											y,
											r.REGEXP_MODE,
											{
												className: "function",
												begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)|" + r.UNDERSCORE_IDENT_RE + ")\\s*=>",
												returnBegin: !0,
												end: "\\s*=>",
												contains: [
													{
														className: "params",
														variants: [
															{
																begin: r.UNDERSCORE_IDENT_RE,
																relevance: 0
															},
															{
																className: null,
																begin: /\(\s*\)/,
																skip: !0
															},
															{
																begin: /\(/,
																end: /\)/,
																excludeBegin: !0,
																excludeEnd: !0,
																keywords: l,
																contains: f
															}
														]
													}
												]
											},
											{ begin: /,/, relevance: 0 },
											{
												className: "",
												begin: /\s/,
												end: /\s*/,
												skip: !0
											},
											{
												variants: [
													{ begin: "<>", end: "</>" },
													{
														begin: o.begin,
														"on:begin": o.isTrulyOpeningTag,
														end: o.end
													}
												],
												subLanguage: "xml",
												contains: [
													{
														begin: o.begin,
														end: o.end,
														skip: !0,
														contains: ["self"]
													}
												]
											}
										],
										relevance: 0
									},
									{
										className: "function",
										beginKeywords: "function",
										end: /[{;]/,
										excludeEnd: !0,
										keywords: l,
										contains: [
											"self",
											r.inherit(r.TITLE_MODE, {
												begin: c
											}),
											A
										],
										illegal: /%/
									},
									{
										beginKeywords: "while if switch catch for"
									},
									{
										className: "function",
										begin: r.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)\\s*\\{",
										returnBegin: !0,
										contains: [
											A,
											r.inherit(r.TITLE_MODE, {
												begin: c
											})
										]
									},
									{
										variants: [
											{
												begin: "\\." + c
											},
											{ begin: "\\$" + c }
										],
										relevance: 0
									},
									{
										className: "class",
										beginKeywords: "class",
										end: /[{;=]/,
										excludeEnd: !0,
										illegal: /[:"[\]]/,
										contains: [
											{
												beginKeywords: "extends"
											},
											r.UNDERSCORE_TITLE_MODE
										]
									},
									{
										begin: /\b(?=constructor)/,
										end: /[{;]/,
										excludeEnd: !0,
										contains: [
											r.inherit(r.TITLE_MODE, {
												begin: c
											}),
											"self",
											A
										]
									},
									{
										begin: "(get|set)\\s+(?=" + c + "\\()",
										end: /\{/,
										keywords: "get set",
										contains: [
											r.inherit(r.TITLE_MODE, {
												begin: c
											}),
											{ begin: /\(\)/ },
											A
										]
									},
									{ begin: /\$[(.]/ }
								]
							};
						})(r);
					return (
						Object.assign(b.keywords, c),
						b.exports.PARAMS_CONTAINS.push(o),
						(b.contains = b.contains.concat([
							o,
							{
								beginKeywords: "namespace",
								end: /\{/,
								excludeEnd: !0
							},
							{
								beginKeywords: "interface",
								end: /\{/,
								excludeEnd: !0,
								keywords: "interface extends"
							}
						])),
						l(b, "shebang", r.SHEBANG()),
						l(b, "use_strict", {
							className: "meta",
							relevance: 10,
							begin: /^\s*['"]use strict['"]/
						}),
						(b.contains.find(e => "function" === e.className).relevance = 0),
						Object.assign(b, {
							name: "TypeScript",
							aliases: ["ts"]
						}),
						b
					);
				};
			})()
		);
		hljs.registerLanguage(
			"ruby",
			(() => {
				"use strict";
				function e(...e) {
					return e
						.map(e => {
							return (n = e) ? ("string" == typeof n ? n : n.source) : null;
							var n;
						})
						.join("");
				}
				return n => {
					var a,
						i = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)",
						s = {
							keyword:
								"and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
							built_in: "proc lambda",
							literal: "true false nil"
						},
						r = { className: "doctag", begin: "@[A-Za-z]+" },
						b = { begin: "#<", end: ">" },
						t = [
							n.COMMENT("#", "$", { contains: [r] }),
							n.COMMENT("^=begin", "^=end", {
								contains: [r],
								relevance: 10
							}),
							n.COMMENT("^__END__", "\\n$")
						],
						c = {
							className: "subst",
							begin: /#\{/,
							end: /\}/,
							keywords: s
						},
						d = {
							className: "string",
							contains: [n.BACKSLASH_ESCAPE, c],
							variants: [
								{
									begin: /'/,
									end: /'/
								},
								{ begin: /"/, end: /"/ },
								{ begin: /`/, end: /`/ },
								{ begin: /%[qQwWx]?\(/, end: /\)/ },
								{ begin: /%[qQwWx]?\[/, end: /\]/ },
								{ begin: /%[qQwWx]?\{/, end: /\}/ },
								{
									begin: /%[qQwWx]?</,
									end: />/
								},
								{ begin: /%[qQwWx]?\//, end: /\// },
								{ begin: /%[qQwWx]?%/, end: /%/ },
								{ begin: /%[qQwWx]?-/, end: /-/ },
								{ begin: /%[qQwWx]?\|/, end: /\|/ },
								{
									begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
								},
								{
									begin: /<<[-~]?'?(\w+)(?:.|\n)*?\n\s*\1\b/,
									returnBegin: !0,
									contains: [
										{
											begin: /<<[-~]?'?/
										},
										n.END_SAME_AS_BEGIN({
											begin: /(\w+)/,
											end: /(\w+)/,
											contains: [n.BACKSLASH_ESCAPE, c]
										})
									]
								}
							]
						},
						g = "[0-9](_?[0-9])*",
						l = {
							className: "number",
							relevance: 0,
							variants: [
								{
									begin: `\\b([1-9](_?[0-9])*|0)(\\.(${g}))?([eE][+-]?(${g})|r)?i?\\b`
								},
								{
									begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
								},
								{ begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b" },
								{ begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b" },
								{
									begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
								},
								{
									begin: "\\b0(_?[0-7])+r?i?\\b"
								}
							]
						},
						o = {
							className: "params",
							begin: "\\(",
							end: "\\)",
							endsParent: !0,
							keywords: s
						},
						_ = [
							d,
							{
								className: "class",
								beginKeywords: "class module",
								end: "$|;",
								illegal: /=/,
								contains: [
									n.inherit(n.TITLE_MODE, {
										begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
									}),
									{
										begin: "<\\s*",
										contains: [
											{
												begin: "(" + n.IDENT_RE + "::)?" + n.IDENT_RE
											}
										]
									}
								].concat(t)
							},
							{
								className: "function",
								begin: e(/def\s*/, ((a = i + "\\s*(\\(|;|$)"), e("(?=", a, ")"))),
								keywords: "def",
								end: "$|;",
								contains: [n.inherit(n.TITLE_MODE, { begin: i }), o].concat(t)
							},
							{ begin: n.IDENT_RE + "::" },
							{
								className: "symbol",
								begin: n.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
								relevance: 0
							},
							{
								className: "symbol",
								begin: ":(?!\\s)",
								contains: [d, { begin: i }],
								relevance: 0
							},
							l,
							{
								className: "variable",
								begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
							},
							{
								className: "params",
								begin: /\|/,
								end: /\|/,
								relevance: 0,
								keywords: s
							},
							{
								begin: "(" + n.RE_STARTERS_RE + "|unless)\\s*",
								keywords: "unless",
								contains: [
									{
										className: "regexp",
										contains: [n.BACKSLASH_ESCAPE, c],
										illegal: /\n/,
										variants: [
											{
												begin: "/",
												end: "/[a-z]*"
											},
											{ begin: /%r\{/, end: /\}[a-z]*/ },
											{
												begin: "%r\\(",
												end: "\\)[a-z]*"
											},
											{ begin: "%r!", end: "![a-z]*" },
											{ begin: "%r\\[", end: "\\][a-z]*" }
										]
									}
								].concat(b, t),
								relevance: 0
							}
						].concat(b, t);
					(c.contains = _), (o.contains = _);
					var E = [
						{
							begin: /^\s*=>/,
							starts: { end: "$", contains: _ }
						},
						{
							className: "meta",
							begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>)(?=[ ])",
							starts: { end: "$", contains: _ }
						}
					];
					return (
						t.unshift(b),
						{
							name: "Ruby",
							aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
							keywords: s,
							illegal: /\/\*/,
							contains: [n.SHEBANG({ binary: "ruby" })].concat(E).concat(t).concat(_)
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"json",
			(() => {
				"use strict";
				return n => {
					const e = {
							literal: "true false null"
						},
						i = [n.C_LINE_COMMENT_MODE, n.C_BLOCK_COMMENT_MODE],
						a = [n.QUOTE_STRING_MODE, n.C_NUMBER_MODE],
						l = {
							end: ",",
							endsWithParent: !0,
							excludeEnd: !0,
							contains: a,
							keywords: e
						},
						t = {
							begin: /\{/,
							end: /\}/,
							contains: [
								{
									className: "attr",
									begin: /"/,
									end: /"/,
									contains: [n.BACKSLASH_ESCAPE],
									illegal: "\\n"
								},
								n.inherit(l, { begin: /:/ })
							].concat(i),
							illegal: "\\S"
						},
						s = {
							begin: "\\[",
							end: "\\]",
							contains: [n.inherit(l)],
							illegal: "\\S"
						};
					return (
						a.push(t, s),
						i.forEach(n => {
							a.push(n);
						}),
						{
							name: "JSON",
							contains: a,
							keywords: e,
							illegal: "\\S"
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"c",
			(() => {
				"use strict";
				return e => {
					const t = (e => {
						function t(e) {
							return "(?:" + e + ")?";
						}
						var n = e.COMMENT("//", "$", {
								contains: [
									{
										begin: /\\\n/
									}
								]
							}),
							r = "[a-zA-Z_]\\w*::",
							a = "(decltype\\(auto\\)|" + t(r) + "[a-zA-Z_]\\w*" + t("<.*?>") + ")",
							i = {
								className: "keyword",
								begin: "\\b[a-z\\d_]*_t\\b"
							},
							s = {
								className: "string",
								variants: [
									{
										begin: '(u8?|U|L)?"',
										end: '"',
										illegal: "\\n",
										contains: [e.BACKSLASH_ESCAPE]
									},
									{
										begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
										end: "'",
										illegal: "."
									},
									e.END_SAME_AS_BEGIN({
										begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
										end: /\)([^()\\ ]{0,16})"/
									})
								]
							},
							c = {
								className: "number",
								variants: [
									{ begin: "\\b(0b[01']+)" },
									{
										begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
									},
									{
										begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
									}
								],
								relevance: 0
							},
							o = {
								className: "meta",
								begin: /#\s*[a-z]+\b/,
								end: /$/,
								keywords: {
									"meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
								},
								contains: [
									{ begin: /\\\n/, relevance: 0 },
									e.inherit(s, { className: "meta-string" }),
									{
										className: "meta-string",
										begin: /<.*?>/,
										end: /$/,
										illegal: "\\n"
									},
									n,
									e.C_BLOCK_COMMENT_MODE
								]
							},
							l = {
								className: "title",
								begin: t(r) + e.IDENT_RE,
								relevance: 0
							},
							d = t(r) + e.IDENT_RE + "\\s*\\(",
							u = {
								keyword:
									"int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
								built_in:
									"std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
								literal: "true false nullptr NULL"
							},
							m = [o, i, n, e.C_BLOCK_COMMENT_MODE, c, s],
							p = {
								variants: [
									{ begin: /=/, end: /;/ },
									{ begin: /\(/, end: /\)/ },
									{
										beginKeywords: "new throw return else",
										end: /;/
									}
								],
								keywords: u,
								contains: m.concat([
									{
										begin: /\(/,
										end: /\)/,
										keywords: u,
										contains: m.concat(["self"]),
										relevance: 0
									}
								]),
								relevance: 0
							},
							_ = {
								className: "function",
								begin: "(" + a + "[\\*&\\s]+)+" + d,
								returnBegin: !0,
								end: /[{;=]/,
								excludeEnd: !0,
								keywords: u,
								illegal: /[^\w\s\*&:<>]/,
								contains: [
									{
										begin: "decltype\\(auto\\)",
										keywords: u,
										relevance: 0
									},
									{
										begin: d,
										returnBegin: !0,
										contains: [l],
										relevance: 0
									},
									{
										className: "params",
										begin: /\(/,
										end: /\)/,
										keywords: u,
										relevance: 0,
										contains: [
											n,
											e.C_BLOCK_COMMENT_MODE,
											s,
											c,
											i,
											{
												begin: /\(/,
												end: /\)/,
												keywords: u,
												relevance: 0,
												contains: ["self", n, e.C_BLOCK_COMMENT_MODE, s, c, i]
											}
										]
									},
									i,
									n,
									e.C_BLOCK_COMMENT_MODE,
									o
								]
							};
						return {
							aliases: ["c", "cc", "h", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
							keywords: u,
							disableAutodetect: !0,
							illegal: "</",
							contains: [].concat(p, _, m, [
								o,
								{
									begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
									end: ">",
									keywords: u,
									contains: ["self", i]
								},
								{ begin: e.IDENT_RE + "::", keywords: u },
								{
									className: "class",
									beginKeywords: "enum class struct union",
									end: /[{;:<>=]/,
									contains: [{ beginKeywords: "final class struct" }, e.TITLE_MODE]
								}
							]),
							exports: {
								preprocessor: o,
								strings: s,
								keywords: u
							}
						};
					})(e);
					return (t.name = "C"), (t.aliases = ["c", "h"]), t;
				};
			})()
		);
		hljs.registerLanguage(
			"makefile",
			(() => {
				"use strict";
				return e => {
					const i = {
							className: "variable",
							variants: [
								{
									begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)",
									contains: [e.BACKSLASH_ESCAPE]
								},
								{ begin: /\$[@%<?\^\+\*]/ }
							]
						},
						a = {
							className: "string",
							begin: /"/,
							end: /"/,
							contains: [e.BACKSLASH_ESCAPE, i]
						},
						n = {
							className: "variable",
							begin: /\$\([\w-]+\s/,
							end: /\)/,
							keywords: {
								built_in:
									"subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
							},
							contains: [i]
						},
						s = {
							begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
						},
						r = {
							className: "section",
							begin: /^[^\s]+:/,
							end: /$/,
							contains: [i]
						};
					return {
						name: "Makefile",
						aliases: ["mk", "mak"],
						keywords: {
							$pattern: /[\w-]+/,
							keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
						},
						contains: [
							e.HASH_COMMENT_MODE,
							i,
							a,
							n,
							s,
							{
								className: "meta",
								begin: /^\.PHONY:/,
								end: /$/,
								keywords: {
									$pattern: /[\.\w]+/,
									"meta-keyword": ".PHONY"
								}
							},
							r
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"xml",
			(() => {
				"use strict";
				function e(e) {
					return e ? ("string" == typeof e ? e : e.source) : null;
				}
				function n(e) {
					return a("(?=", e, ")");
				}
				function a(...n) {
					return n.map(n => e(n)).join("");
				}
				function s(...n) {
					return "(" + n.map(n => e(n)).join("|") + ")";
				}
				return e => {
					const t = a(/[A-Z_]/, a("(", /[A-Z0-9_.-]+:/, ")?"), /[A-Z0-9_.-]*/),
						i = {
							className: "symbol",
							begin: "&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;"
						},
						c = {
							begin: "\\s",
							contains: [
								{
									className: "meta-keyword",
									begin: "#?[a-z_][a-z1-9_-]+",
									illegal: "\\n"
								}
							]
						},
						r = e.inherit(c, { begin: "\\(", end: "\\)" }),
						l = e.inherit(e.APOS_STRING_MODE, {
							className: "meta-string"
						}),
						g = e.inherit(e.QUOTE_STRING_MODE, {
							className: "meta-string"
						}),
						m = {
							endsWithParent: !0,
							illegal: /</,
							relevance: 0,
							contains: [
								{
									className: "attr",
									begin: "[A-Za-z0-9\\._:-]+",
									relevance: 0
								},
								{
									begin: /=\s*/,
									relevance: 0,
									contains: [
										{
											className: "string",
											endsParent: !0,
											variants: [
												{
													begin: /"/,
													end: /"/,
													contains: [i]
												},
												{
													begin: /'/,
													end: /'/,
													contains: [i]
												},
												{
													begin: /[^\s"'=<>`]+/
												}
											]
										}
									]
								}
							]
						};
					return {
						name: "HTML, XML",
						aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
						case_insensitive: !0,
						contains: [
							{
								className: "meta",
								begin: "<![a-z]",
								end: ">",
								relevance: 10,
								contains: [
									c,
									g,
									l,
									r,
									{
										begin: "\\[",
										end: "\\]",
										contains: [
											{
												className: "meta",
												begin: "<![a-z]",
												end: ">",
												contains: [c, r, g, l]
											}
										]
									}
								]
							},
							e.COMMENT("\x3c!--", "--\x3e", { relevance: 10 }),
							{
								begin: "<!\\[CDATA\\[",
								end: "\\]\\]>",
								relevance: 10
							},
							i,
							{
								className: "meta",
								begin: /<\?xml/,
								end: /\?>/,
								relevance: 10
							},
							{
								className: "tag",
								begin: "<style(?=\\s|>)",
								end: ">",
								keywords: {
									name: "style"
								},
								contains: [m],
								starts: {
									end: "</style>",
									returnEnd: !0,
									subLanguage: ["css", "xml"]
								}
							},
							{
								className: "tag",
								begin: "<script(?=\\s|>)",
								end: ">",
								keywords: { name: "script" },
								contains: [m],
								starts: {
									end: /<\/script>/,
									returnEnd: !0,
									subLanguage: ["javascript", "handlebars", "xml"]
								}
							},
							{ className: "tag", begin: /<>|<\/>/ },
							{
								className: "tag",
								begin: a(/</, n(a(t, s(/\/>/, />/, /\s/)))),
								end: /\/?>/,
								contains: [
									{
										className: "name",
										begin: t,
										relevance: 0,
										starts: m
									}
								]
							},
							{
								className: "tag",
								begin: a(/<\//, n(a(t, />/))),
								contains: [
									{
										className: "name",
										begin: t,
										relevance: 0
									},
									{
										begin: />/,
										relevance: 0
									}
								]
							}
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"bash",
			(() => {
				"use strict";
				function e(...e) {
					return e
						.map(e => {
							return (s = e) ? ("string" == typeof s ? s : s.source) : null;
							var s;
						})
						.join("");
				}
				return s => {
					const n = {},
						t = {
							begin: /\$\{/,
							end: /\}/,
							contains: [
								"self",
								{
									begin: /:-/,
									contains: [n]
								}
							]
						};
					Object.assign(n, {
						className: "variable",
						variants: [
							{
								begin: e(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
							},
							t
						]
					});
					const a = {
							className: "subst",
							begin: /\$\(/,
							end: /\)/,
							contains: [s.BACKSLASH_ESCAPE]
						},
						i = {
							begin: /<<-?\s*(?=\w+)/,
							starts: {
								contains: [
									s.END_SAME_AS_BEGIN({
										begin: /(\w+)/,
										end: /(\w+)/,
										className: "string"
									})
								]
							}
						},
						c = {
							className: "string",
							begin: /"/,
							end: /"/,
							contains: [s.BACKSLASH_ESCAPE, n, a]
						};
					a.contains.push(c);
					const o = {
							begin: /\$\(\(/,
							end: /\)\)/,
							contains: [{ begin: /\d+#[0-9a-f]+/, className: "number" }, s.NUMBER_MODE, n]
						},
						r = s.SHEBANG({
							binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",
							relevance: 10
						}),
						l = {
							className: "function",
							begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
							returnBegin: !0,
							contains: [s.inherit(s.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
							relevance: 0
						};
					return {
						name: "Bash",
						aliases: ["sh", "zsh"],
						keywords: {
							$pattern: /\b[a-z._-]+\b/,
							keyword: "if then else elif fi for while in do done case esac function",
							literal: "true false",
							built_in:
								"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"
						},
						contains: [r, s.SHEBANG(), l, o, s.HASH_COMMENT_MODE, i, c, { className: "", begin: /\\"/ }, { className: "string", begin: /'/, end: /'/ }, n]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"swift",
			(() => {
				"use strict";
				return e => {
					var i = {
							$pattern: /[\w#]+/,
							keyword:
								"#available #colorLiteral #column #else #elseif #endif #file #fileLiteral #function #if #imageLiteral #line #selector #sourceLocation _ __COLUMN__ __FILE__ __FUNCTION__ __LINE__ Any as as! as? associatedtype associativity break case catch class continue convenience default defer deinit didSet do dynamic dynamicType else enum extension fallthrough false fileprivate final for func get guard if import in indirect infix init inout internal is lazy left let mutating nil none nonmutating open operator optional override postfix precedence prefix private protocol Protocol public repeat required rethrows return right self Self set some static struct subscript super switch throw throws true try try! try? Type typealias unowned var weak where while willSet",
							literal: "true false nil",
							built_in:
								"abs advance alignof alignofValue anyGenerator assert assertionFailure bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c compactMap contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal fatalError filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced isUniquelyReferencedNonObjC join lazy lexicographicalCompare map max maxElement min minElement numericCast overlaps partition posix precondition preconditionFailure print println quickSort readLine reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith stride strideof strideofValue swap toString transcode underestimateCount unsafeAddressOf unsafeBitCast unsafeDowncast unsafeUnwrap unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafeMutablePointer withUnsafeMutablePointers withUnsafePointer withUnsafePointers withVaList zip"
						},
						n = e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
						t = {
							className: "subst",
							begin: /\\\(/,
							end: "\\)",
							keywords: i,
							contains: []
						},
						a = {
							className: "string",
							contains: [e.BACKSLASH_ESCAPE, t],
							variants: [
								{ begin: /"""/, end: /"""/ },
								{ begin: /"/, end: /"/ }
							]
						},
						r = "([0-9a-fA-F]_*)+",
						s = {
							className: "number",
							relevance: 0,
							variants: [
								{
									begin: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
								},
								{
									begin: `\\b0x(${r})(\\.(${r}))?([pP][+-]?(([0-9]_*)+))?\\b`
								},
								{
									begin: /\b0o([0-7]_*)+\b/
								},
								{ begin: /\b0b([01]_*)+\b/ }
							]
						};
					return (
						(t.contains = [s]),
						{
							name: "Swift",
							keywords: i,
							contains: [
								a,
								e.C_LINE_COMMENT_MODE,
								n,
								{
									className: "type",
									begin: "\\b[A-Z][\\w\xc0-\u02b8']*[!?]"
								},
								{
									className: "type",
									begin: "\\b[A-Z][\\w\xc0-\u02b8']*",
									relevance: 0
								},
								s,
								{
									className: "function",
									beginKeywords: "func",
									end: /\{/,
									excludeEnd: !0,
									contains: [
										e.inherit(e.TITLE_MODE, {
											begin: /[A-Za-z$_][0-9A-Za-z$_]*/
										}),
										{ begin: /</, end: />/ },
										{
											className: "params",
											begin: /\(/,
											end: /\)/,
											endsParent: !0,
											keywords: i,
											contains: ["self", s, a, e.C_BLOCK_COMMENT_MODE, { begin: ":" }],
											illegal: /["']/
										}
									],
									illegal: /\[|%/
								},
								{
									className: "class",
									beginKeywords: "struct protocol class extension enum",
									keywords: i,
									end: "\\{",
									excludeEnd: !0,
									contains: [
										e.inherit(e.TITLE_MODE, {
											begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
										})
									]
								},
								{
									className: "meta",
									begin: "(@discardableResult|@warn_unused_result|@exported|@lazy|@noescape|@NSCopying|@NSManaged|@objc|@objcMembers|@convention|@required|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix|@autoclosure|@testable|@available|@nonobjc|@NSApplicationMain|@UIApplicationMain|@dynamicMemberLookup|@propertyWrapper|@main)\\b"
								},
								{
									beginKeywords: "import",
									end: /$/,
									contains: [e.C_LINE_COMMENT_MODE, n],
									relevance: 0
								}
							]
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"python",
			(() => {
				"use strict";
				return e => {
					const n = {
							keyword:
								"and as assert async await break class continue def del elif else except finally for  from global if import in is lambda nonlocal|10 not or pass raise return try while with yield",
							built_in:
								"__import__ abs all any ascii bin bool breakpoint bytearray bytes callable chr classmethod compile complex delattr dict dir divmod enumerate eval exec filter float format frozenset getattr globals hasattr hash help hex id input int isinstance issubclass iter len list locals map max memoryview min next object oct open ord pow print property range repr reversed round set setattr slice sorted staticmethod str sum super tuple type vars zip",
							literal: "__debug__ Ellipsis False None NotImplemented True"
						},
						a = {
							className: "meta",
							begin: /^(>>>|\.\.\.) /
						},
						s = {
							className: "subst",
							begin: /\{/,
							end: /\}/,
							keywords: n,
							illegal: /#/
						},
						i = { begin: /\{\{/, relevance: 0 },
						r = {
							className: "string",
							contains: [e.BACKSLASH_ESCAPE],
							variants: [
								{
									begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
									end: /'''/,
									contains: [e.BACKSLASH_ESCAPE, a],
									relevance: 10
								},
								{
									begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
									end: /"""/,
									contains: [e.BACKSLASH_ESCAPE, a],
									relevance: 10
								},
								{
									begin: /([fF][rR]|[rR][fF]|[fF])'''/,
									end: /'''/,
									contains: [e.BACKSLASH_ESCAPE, a, i, s]
								},
								{
									begin: /([fF][rR]|[rR][fF]|[fF])"""/,
									end: /"""/,
									contains: [e.BACKSLASH_ESCAPE, a, i, s]
								},
								{
									begin: /([uU]|[rR])'/,
									end: /'/,
									relevance: 10
								},
								{
									begin: /([uU]|[rR])"/,
									end: /"/,
									relevance: 10
								},
								{
									begin: /([bB]|[bB][rR]|[rR][bB])'/,
									end: /'/
								},
								{
									begin: /([bB]|[bB][rR]|[rR][bB])"/,
									end: /"/
								},
								{
									begin: /([fF][rR]|[rR][fF]|[fF])'/,
									end: /'/,
									contains: [e.BACKSLASH_ESCAPE, i, s]
								},
								{
									begin: /([fF][rR]|[rR][fF]|[fF])"/,
									end: /"/,
									contains: [e.BACKSLASH_ESCAPE, i, s]
								},
								e.APOS_STRING_MODE,
								e.QUOTE_STRING_MODE
							]
						},
						t = "[0-9](_?[0-9])*",
						l = `(\\b(${t}))?\\.(${t})|\\b(${t})\\.`,
						b = {
							className: "number",
							relevance: 0,
							variants: [
								{
									begin: `(\\b(${t})|(${l}))[eE][+-]?(${t})[jJ]?\\b`
								},
								{ begin: `(${l})[jJ]?` },
								{
									begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"
								},
								{
									begin: "\\b0[bB](_?[01])+[lL]?\\b"
								},
								{ begin: "\\b0[oO](_?[0-7])+[lL]?\\b" },
								{
									begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"
								},
								{ begin: `\\b(${t})[jJ]\\b` }
							]
						},
						o = {
							className: "params",
							variants: [
								{ begin: /\(\s*\)/, skip: !0, className: null },
								{
									begin: /\(/,
									end: /\)/,
									excludeBegin: !0,
									excludeEnd: !0,
									keywords: n,
									contains: ["self", a, b, r, e.HASH_COMMENT_MODE]
								}
							]
						};
					return (
						(s.contains = [r, b, a]),
						{
							name: "Python",
							aliases: ["py", "gyp", "ipython"],
							keywords: n,
							illegal: /(<\/|->|\?)|=>/,
							contains: [
								a,
								b,
								{ begin: /\bself\b/ },
								{ beginKeywords: "if", relevance: 0 },
								r,
								e.HASH_COMMENT_MODE,
								{
									variants: [
										{
											className: "function",
											beginKeywords: "def"
										},
										{
											className: "class",
											beginKeywords: "class"
										}
									],
									end: /:/,
									illegal: /[${=;\n,]/,
									contains: [
										e.UNDERSCORE_TITLE_MODE,
										o,
										{
											begin: /->/,
											endsWithParent: !0,
											keywords: "None"
										}
									]
								},
								{
									className: "meta",
									begin: /^[\t ]*@/,
									end: /(?=#)|$/,
									contains: [b, o, r]
								},
								{ begin: /\b(print|exec)\(/ }
							]
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"kotlin",
			(() => {
				"use strict";
				return e => {
					const n = {
							keyword:
								"abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
							built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
							literal: "true false null"
						},
						a = {
							className: "symbol",
							begin: e.UNDERSCORE_IDENT_RE + "@"
						},
						s = {
							className: "subst",
							begin: /\$\{/,
							end: /\}/,
							contains: [e.C_NUMBER_MODE]
						},
						i = {
							className: "variable",
							begin: "\\$" + e.UNDERSCORE_IDENT_RE
						},
						t = {
							className: "string",
							variants: [
								{
									begin: '"""',
									end: '"""(?=[^"])',
									contains: [i, s]
								},
								{
									begin: "'",
									end: "'",
									illegal: /\n/,
									contains: [e.BACKSLASH_ESCAPE]
								},
								{
									begin: '"',
									end: '"',
									illegal: /\n/,
									contains: [e.BACKSLASH_ESCAPE, i, s]
								}
							]
						};
					s.contains.push(t);
					const l = {
							className: "meta",
							begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
						},
						r = {
							className: "meta",
							begin: "@" + e.UNDERSCORE_IDENT_RE,
							contains: [
								{
									begin: /\(/,
									end: /\)/,
									contains: [
										e.inherit(t, {
											className: "meta-string"
										})
									]
								}
							]
						},
						c = e.COMMENT("/\\*", "\\*/", {
							contains: [e.C_BLOCK_COMMENT_MODE]
						}),
						o = {
							variants: [
								{
									className: "type",
									begin: e.UNDERSCORE_IDENT_RE
								},
								{ begin: /\(/, end: /\)/, contains: [] }
							]
						},
						d = o;
					return (
						(d.variants[1].contains = [o]),
						(o.variants[1].contains = [d]),
						{
							name: "Kotlin",
							aliases: ["kt"],
							keywords: n,
							contains: [
								e.COMMENT("/\\*\\*", "\\*/", {
									relevance: 0,
									contains: [
										{
											className: "doctag",
											begin: "@[A-Za-z]+"
										}
									]
								}),
								e.C_LINE_COMMENT_MODE,
								c,
								{
									className: "keyword",
									begin: /\b(break|continue|return|this)\b/,
									starts: {
										contains: [
											{
												className: "symbol",
												begin: /@\w+/
											}
										]
									}
								},
								a,
								l,
								r,
								{
									className: "function",
									beginKeywords: "fun",
									end: "[(]|$",
									returnBegin: !0,
									excludeEnd: !0,
									keywords: n,
									illegal: /fun\s+(<.*>)?[^\s\(]+(\s+[^\s\(]+)\s*=/,
									relevance: 5,
									contains: [
										{
											begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
											returnBegin: !0,
											relevance: 0,
											contains: [e.UNDERSCORE_TITLE_MODE]
										},
										{
											className: "type",
											begin: /</,
											end: />/,
											keywords: "reified",
											relevance: 0
										},
										{
											className: "params",
											begin: /\(/,
											end: /\)/,
											endsParent: !0,
											keywords: n,
											relevance: 0,
											contains: [
												{
													begin: /:/,
													end: /[=,\/]/,
													endsWithParent: !0,
													contains: [o, e.C_LINE_COMMENT_MODE, c],
													relevance: 0
												},
												e.C_LINE_COMMENT_MODE,
												c,
												l,
												r,
												t,
												e.C_NUMBER_MODE
											]
										},
										c
									]
								},
								{
									className: "class",
									beginKeywords: "class interface trait",
									end: /[:\{(]|$/,
									excludeEnd: !0,
									illegal: "extends implements",
									contains: [
										{
											beginKeywords: "public protected internal private constructor"
										},
										e.UNDERSCORE_TITLE_MODE,
										{
											className: "type",
											begin: /</,
											end: />/,
											excludeBegin: !0,
											excludeEnd: !0,
											relevance: 0
										},
										{
											className: "type",
											begin: /[,:]\s*/,
											end: /[<\(,]|$/,
											excludeBegin: !0,
											returnEnd: !0
										},
										l,
										r
									]
								},
								t,
								{
									className: "meta",
									begin: "^#!/usr/bin/env",
									end: "$",
									illegal: "\n"
								},
								{
									className: "number",
									begin: "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",
									relevance: 0
								}
							]
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"scss",
			(() => {
				"use strict";
				return e => {
					var t = "@[a-z-]+",
						i = {
							className: "variable",
							begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"
						},
						r = {
							className: "number",
							begin: "#[0-9A-Fa-f]+"
						};
					return (
						e.CSS_NUMBER_MODE,
						e.QUOTE_STRING_MODE,
						e.APOS_STRING_MODE,
						e.C_BLOCK_COMMENT_MODE,
						{
							name: "SCSS",
							case_insensitive: !0,
							illegal: "[=/|']",
							contains: [
								e.C_LINE_COMMENT_MODE,
								e.C_BLOCK_COMMENT_MODE,
								{
									className: "selector-id",
									begin: "#[A-Za-z0-9_-]+",
									relevance: 0
								},
								{
									className: "selector-class",
									begin: "\\.[A-Za-z0-9_-]+",
									relevance: 0
								},
								{
									className: "selector-attr",
									begin: "\\[",
									end: "\\]",
									illegal: "$"
								},
								{
									className: "selector-tag",
									begin: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
									relevance: 0
								},
								{
									className: "selector-pseudo",
									begin: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
								},
								{
									className: "selector-pseudo",
									begin: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
								},
								i,
								{
									className: "attribute",
									begin: "\\b(src|z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
									illegal: "[^\\s]"
								},
								{
									begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
								},
								{
									begin: ":",
									end: ";",
									contains: [
										i,
										r,
										e.CSS_NUMBER_MODE,
										e.QUOTE_STRING_MODE,
										e.APOS_STRING_MODE,
										{
											className: "meta",
											begin: "!important"
										}
									]
								},
								{
									begin: "@(page|font-face)",
									lexemes: t,
									keywords: "@page @font-face"
								},
								{
									begin: "@",
									end: "[{;]",
									returnBegin: !0,
									keywords: "and or not only",
									contains: [{ begin: t, className: "keyword" }, i, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, r, e.CSS_NUMBER_MODE]
								}
							]
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"yaml",
			(() => {
				"use strict";
				return e => {
					var n = "true false yes no null",
						a = "[\\w#;/?:@&=+$,.~*'()[\\]]+",
						s = {
							className: "string",
							relevance: 0,
							variants: [{ begin: /'/, end: /'/ }, { begin: /"/, end: /"/ }, { begin: /\S+/ }],
							contains: [
								e.BACKSLASH_ESCAPE,
								{
									className: "template-variable",
									variants: [
										{ begin: /\{\{/, end: /\}\}/ },
										{ begin: /%\{/, end: /\}/ }
									]
								}
							]
						},
						i = e.inherit(s, {
							variants: [{ begin: /'/, end: /'/ }, { begin: /"/, end: /"/ }, { begin: /[^\s,{}[\]]+/ }]
						}),
						l = {
							end: ",",
							endsWithParent: !0,
							excludeEnd: !0,
							contains: [],
							keywords: n,
							relevance: 0
						},
						t = {
							begin: /\{/,
							end: /\}/,
							contains: [l],
							illegal: "\\n",
							relevance: 0
						},
						g = {
							begin: "\\[",
							end: "\\]",
							contains: [l],
							illegal: "\\n",
							relevance: 0
						},
						b = [
							{
								className: "attr",
								variants: [
									{ begin: "\\w[\\w :\\/.-]*:(?=[ \t]|$)" },
									{
										begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)'
									},
									{ begin: "'\\w[\\w :\\/.-]*':(?=[ \t]|$)" }
								]
							},
							{
								className: "meta",
								begin: "^---\\s*$",
								relevance: 10
							},
							{
								className: "string",
								begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^\\n]+\\n(\\2[^\\n]+\\n?)*"
							},
							{
								begin: "<%[%=-]?",
								end: "[%-]?%>",
								subLanguage: "ruby",
								excludeBegin: !0,
								excludeEnd: !0,
								relevance: 0
							},
							{ className: "type", begin: "!\\w+!" + a },
							{ className: "type", begin: "!<" + a + ">" },
							{ className: "type", begin: "!" + a },
							{ className: "type", begin: "!!" + a },
							{
								className: "meta",
								begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
							},
							{
								className: "meta",
								begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
							},
							{
								className: "bullet",
								begin: "-(?=[ ]|$)",
								relevance: 0
							},
							e.HASH_COMMENT_MODE,
							{ beginKeywords: n, keywords: { literal: n } },
							{
								className: "number",
								begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
							},
							{
								className: "number",
								begin: e.C_NUMBER_RE + "\\b",
								relevance: 0
							},
							t,
							g,
							s
						],
						r = [...b];
					return (
						r.pop(),
						r.push(i),
						(l.contains = r),
						{
							name: "YAML",
							case_insensitive: !0,
							aliases: ["yml", "YAML"],
							contains: b
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"markdown",
			(() => {
				"use strict";
				function n(...n) {
					return n
						.map(n => {
							return (e = n) ? ("string" == typeof e ? e : e.source) : null;
							var e;
						})
						.join("");
				}
				return e => {
					const a = {
							begin: /<\/?[A-Za-z_]/,
							end: ">",
							subLanguage: "xml",
							relevance: 0
						},
						i = {
							variants: [
								{ begin: /\[.+?\]\[.*?\]/, relevance: 0 },
								{
									begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
									relevance: 2
								},
								{
									begin: n(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
									relevance: 2
								},
								{
									begin: /\[.+?\]\([./?&#].*?\)/,
									relevance: 1
								},
								{
									begin: /\[.+?\]\(.*?\)/,
									relevance: 0
								}
							],
							returnBegin: !0,
							contains: [
								{
									className: "string",
									relevance: 0,
									begin: "\\[",
									end: "\\]",
									excludeBegin: !0,
									returnEnd: !0
								},
								{
									className: "link",
									relevance: 0,
									begin: "\\]\\(",
									end: "\\)",
									excludeBegin: !0,
									excludeEnd: !0
								},
								{
									className: "symbol",
									relevance: 0,
									begin: "\\]\\[",
									end: "\\]",
									excludeBegin: !0,
									excludeEnd: !0
								}
							]
						},
						s = {
							className: "strong",
							contains: [],
							variants: [
								{ begin: /_{2}/, end: /_{2}/ },
								{ begin: /\*{2}/, end: /\*{2}/ }
							]
						},
						c = {
							className: "emphasis",
							contains: [],
							variants: [
								{ begin: /\*(?!\*)/, end: /\*/ },
								{
									begin: /_(?!_)/,
									end: /_/,
									relevance: 0
								}
							]
						};
					s.contains.push(c), c.contains.push(s);
					let t = [a, i];
					return (
						(s.contains = s.contains.concat(t)),
						(c.contains = c.contains.concat(t)),
						(t = t.concat(s, c)),
						{
							name: "Markdown",
							aliases: ["md", "mkdown", "mkd"],
							contains: [
								{
									className: "section",
									variants: [
										{
											begin: "^#{1,6}",
											end: "$",
											contains: t
										},
										{
											begin: "(?=^.+?\\n[=-]{2,}$)",
											contains: [
												{ begin: "^[=-]*$" },
												{
													begin: "^",
													end: "\\n",
													contains: t
												}
											]
										}
									]
								},
								a,
								{
									className: "bullet",
									begin: "^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
									end: "\\s+",
									excludeEnd: !0
								},
								s,
								c,
								{
									className: "quote",
									begin: "^>\\s+",
									contains: t,
									end: "$"
								},
								{
									className: "code",
									variants: [
										{ begin: "(`{3,})(.|\\n)*?\\1`*[ ]*" },
										{
											begin: "(~{3,})(.|\\n)*?\\1~*[ ]*"
										},
										{ begin: "```", end: "```+[ ]*$" },
										{ begin: "~~~", end: "~~~+[ ]*$" },
										{ begin: "`.+?`" },
										{
											begin: "(?=^( {4}|\\t))",
											contains: [
												{
													begin: "^( {4}|\\t)",
													end: "(\\n)$"
												}
											],
											relevance: 0
										}
									]
								},
								{ begin: "^[-\\*]{3,}", end: "$" },
								i,
								{
									begin: /^\[[^\n]+\]:/,
									returnBegin: !0,
									contains: [
										{
											className: "symbol",
											begin: /\[/,
											end: /\]/,
											excludeBegin: !0,
											excludeEnd: !0
										},
										{
											className: "link",
											begin: /:\s*/,
											end: /$/,
											excludeBegin: !0
										}
									]
								}
							]
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"lua",
			(() => {
				"use strict";
				return e => {
					const t = "\\[=*\\[",
						a = "\\]=*\\]",
						n = { begin: t, end: a, contains: ["self"] },
						o = [
							e.COMMENT("--(?!\\[=*\\[)", "$"),
							e.COMMENT("--\\[=*\\[", a, {
								contains: [n],
								relevance: 10
							})
						];
					return {
						name: "Lua",
						keywords: {
							$pattern: e.UNDERSCORE_IDENT_RE,
							literal: "true false nil",
							keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
							built_in:
								"_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
						},
						contains: o.concat([
							{
								className: "function",
								beginKeywords: "function",
								end: "\\)",
								contains: [
									e.inherit(e.TITLE_MODE, {
										begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
									}),
									{
										className: "params",
										begin: "\\(",
										endsWithParent: !0,
										contains: o
									}
								].concat(o)
							},
							e.C_NUMBER_MODE,
							e.APOS_STRING_MODE,
							e.QUOTE_STRING_MODE,
							{
								className: "string",
								begin: t,
								end: a,
								contains: [n],
								relevance: 5
							}
						])
					};
				};
			})()
		);
		hljs.registerLanguage(
			"go",
			(() => {
				"use strict";
				return e => {
					const n = {
						keyword:
							"break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
						literal: "true false iota nil",
						built_in: "append cap close complex copy imag len make new panic print println real recover delete"
					};
					return {
						name: "Go",
						aliases: ["golang"],
						keywords: n,
						illegal: "</",
						contains: [
							e.C_LINE_COMMENT_MODE,
							e.C_BLOCK_COMMENT_MODE,
							{
								className: "string",
								variants: [e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, { begin: "`", end: "`" }]
							},
							{
								className: "number",
								variants: [
									{
										begin: e.C_NUMBER_RE + "[i]",
										relevance: 1
									},
									e.C_NUMBER_MODE
								]
							},
							{ begin: /:=/ },
							{
								className: "function",
								beginKeywords: "func",
								end: "\\s*(\\{|$)",
								excludeEnd: !0,
								contains: [
									e.TITLE_MODE,
									{
										className: "params",
										begin: /\(/,
										end: /\)/,
										keywords: n,
										illegal: /["']/
									}
								]
							}
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"properties",
			(() => {
				"use strict";
				return e => {
					var n = "[ \\t\\f]*",
						a = n + "[:=]" + n,
						t = "(" + a + "|[ \\t\\f]+)",
						r = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+",
						s = "([^\\\\:= \\t\\f\\n]|\\\\.)+",
						i = {
							end: t,
							relevance: 0,
							starts: {
								className: "string",
								end: /$/,
								relevance: 0,
								contains: [
									{
										begin: "\\\\\\n"
									}
								]
							}
						};
					return {
						name: ".properties",
						case_insensitive: !0,
						illegal: /\S/,
						contains: [
							e.COMMENT("^\\s*[!#]", "$"),
							{
								returnBegin: !0,
								variants: [
									{ begin: r + a, relevance: 1 },
									{ begin: r + "[ \\t\\f]+", relevance: 0 }
								],
								contains: [
									{
										className: "attr",
										begin: r,
										endsParent: !0,
										relevance: 0
									}
								],
								starts: i
							},
							{
								begin: s + t,
								returnBegin: !0,
								relevance: 0,
								contains: [
									{
										className: "meta",
										begin: s,
										endsParent: !0,
										relevance: 0
									}
								],
								starts: i
							},
							{
								className: "attr",
								relevance: 0,
								begin: s + n + "$"
							}
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"diff",
			(() => {
				"use strict";
				return e => ({
					name: "Diff",
					aliases: ["patch"],
					contains: [
						{
							className: "meta",
							relevance: 10,
							variants: [
								{
									begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
								},
								{ begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/ },
								{
									begin: /^--- +\d+,\d+ +----$/
								}
							]
						},
						{
							className: "comment",
							variants: [
								{ begin: /Index: /, end: /$/ },
								{ begin: /^index/, end: /$/ },
								{ begin: /={3,}/, end: /$/ },
								{ begin: /^-{3}/, end: /$/ },
								{ begin: /^\*{3} /, end: /$/ },
								{ begin: /^\+{3}/, end: /$/ },
								{ begin: /^\*{15}$/ },
								{
									begin: /^diff --git/,
									end: /$/
								}
							]
						},
						{ className: "addition", begin: /^\+/, end: /$/ },
						{
							className: "deletion",
							begin: /^-/,
							end: /$/
						},
						{ className: "addition", begin: /^!/, end: /$/ }
					]
				});
			})()
		);
		hljs.registerLanguage(
			"javascript",
			(() => {
				"use strict";
				const e = "[A-Za-z$_][0-9A-Za-z$_]*",
					n = [
						"as",
						"in",
						"of",
						"if",
						"for",
						"while",
						"finally",
						"var",
						"new",
						"function",
						"do",
						"return",
						"void",
						"else",
						"break",
						"catch",
						"instanceof",
						"with",
						"throw",
						"case",
						"default",
						"try",
						"switch",
						"continue",
						"typeof",
						"delete",
						"let",
						"yield",
						"const",
						"class",
						"debugger",
						"async",
						"await",
						"static",
						"import",
						"from",
						"export",
						"extends"
					],
					a = ["true", "false", "null", "undefined", "NaN", "Infinity"],
					s = [].concat(
						[
							"setInterval",
							"setTimeout",
							"clearInterval",
							"clearTimeout",
							"require",
							"exports",
							"eval",
							"isFinite",
							"isNaN",
							"parseFloat",
							"parseInt",
							"decodeURI",
							"decodeURIComponent",
							"encodeURI",
							"encodeURIComponent",
							"escape",
							"unescape"
						],
						["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
						[
							"Intl",
							"DataView",
							"Number",
							"Math",
							"Date",
							"String",
							"RegExp",
							"Object",
							"Function",
							"Boolean",
							"Error",
							"Symbol",
							"Set",
							"Map",
							"WeakSet",
							"WeakMap",
							"Proxy",
							"Reflect",
							"JSON",
							"Promise",
							"Float64Array",
							"Int16Array",
							"Int32Array",
							"Int8Array",
							"Uint16Array",
							"Uint32Array",
							"Float32Array",
							"Array",
							"Uint8Array",
							"Uint8ClampedArray",
							"ArrayBuffer"
						],
						["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]
					);
				function r(e) {
					return i("(?=", e, ")");
				}
				function i(...e) {
					return e
						.map(e => {
							return (n = e) ? ("string" == typeof n ? n : n.source) : null;
							var n;
						})
						.join("");
				}
				return t => {
					const c = e,
						o = {
							begin: /<[A-Za-z0-9\\._:-]+/,
							end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
							isTrulyOpeningTag: (e, n) => {
								const a = e[0].length + e.index,
									s = e.input[a];
								"<" !== s
									? ">" === s &&
										(((e, { after: n }) => {
											const a = "</" + e[0].slice(1);
											return -1 !== e.input.indexOf(a, n);
										})(e, { after: a }) ||
											n.ignoreMatch())
									: n.ignoreMatch();
							}
						},
						l = {
							$pattern: e,
							keyword: n.join(" "),
							literal: a.join(" "),
							built_in: s.join(" ")
						},
						b = "\\.([0-9](_?[0-9])*)",
						g = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",
						d = {
							className: "number",
							variants: [
								{
									begin: `(\\b(${g})((${b})|\\.)?|(${b}))[eE][+-]?([0-9](_?[0-9])*)\\b`
								},
								{
									begin: `\\b(${g})\\b((${b})\\b|\\.)?|(${b})\\b`
								},
								{
									begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
								},
								{
									begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
								},
								{
									begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
								},
								{ begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
								{
									begin: "\\b0[0-7]+n?\\b"
								}
							],
							relevance: 0
						},
						E = {
							className: "subst",
							begin: "\\$\\{",
							end: "\\}",
							keywords: l,
							contains: []
						},
						u = {
							begin: "html`",
							end: "",
							starts: {
								end: "`",
								returnEnd: !1,
								contains: [t.BACKSLASH_ESCAPE, E],
								subLanguage: "xml"
							}
						},
						_ = {
							begin: "css`",
							end: "",
							starts: {
								end: "`",
								returnEnd: !1,
								contains: [t.BACKSLASH_ESCAPE, E],
								subLanguage: "css"
							}
						},
						m = {
							className: "string",
							begin: "`",
							end: "`",
							contains: [t.BACKSLASH_ESCAPE, E]
						},
						N = {
							className: "comment",
							variants: [
								t.COMMENT("/\\*\\*", "\\*/", {
									relevance: 0,
									contains: [
										{
											className: "doctag",
											begin: "@[A-Za-z]+",
											contains: [
												{
													className: "type",
													begin: "\\{",
													end: "\\}",
													relevance: 0
												},
												{
													className: "variable",
													begin: c + "(?=\\s*(-)|$)",
													endsParent: !0,
													relevance: 0
												},
												{
													begin: /(?=[^\n])\s/,
													relevance: 0
												}
											]
										}
									]
								}),
								t.C_BLOCK_COMMENT_MODE,
								t.C_LINE_COMMENT_MODE
							]
						},
						y = [t.APOS_STRING_MODE, t.QUOTE_STRING_MODE, u, _, m, d, t.REGEXP_MODE];
					E.contains = y.concat({
						begin: /\{/,
						end: /\}/,
						keywords: l,
						contains: ["self"].concat(y)
					});
					const f = [].concat(N, E.contains),
						A = f.concat([
							{
								begin: /\(/,
								end: /\)/,
								keywords: l,
								contains: ["self"].concat(f)
							}
						]),
						p = {
							className: "params",
							begin: /\(/,
							end: /\)/,
							excludeBegin: !0,
							excludeEnd: !0,
							keywords: l,
							contains: A
						};
					return {
						name: "Javascript",
						aliases: ["js", "jsx", "mjs", "cjs"],
						keywords: l,
						exports: { PARAMS_CONTAINS: A },
						illegal: /#(?![$_A-z])/,
						contains: [
							t.SHEBANG({
								label: "shebang",
								binary: "node",
								relevance: 5
							}),
							{
								label: "use_strict",
								className: "meta",
								relevance: 10,
								begin: /^\s*['"]use (strict|asm)['"]/
							},
							t.APOS_STRING_MODE,
							t.QUOTE_STRING_MODE,
							u,
							_,
							m,
							N,
							d,
							{
								begin: i(/[{,\n]\s*/, r(i(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c + "\\s*:"))),
								relevance: 0,
								contains: [
									{
										className: "attr",
										begin: c + r("\\s*:"),
										relevance: 0
									}
								]
							},
							{
								begin: "(" + t.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
								keywords: "return throw case",
								contains: [
									N,
									t.REGEXP_MODE,
									{
										className: "function",
										begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)|" + t.UNDERSCORE_IDENT_RE + ")\\s*=>",
										returnBegin: !0,
										end: "\\s*=>",
										contains: [
											{
												className: "params",
												variants: [
													{
														begin: t.UNDERSCORE_IDENT_RE,
														relevance: 0
													},
													{
														className: null,
														begin: /\(\s*\)/,
														skip: !0
													},
													{
														begin: /\(/,
														end: /\)/,
														excludeBegin: !0,
														excludeEnd: !0,
														keywords: l,
														contains: A
													}
												]
											}
										]
									},
									{ begin: /,/, relevance: 0 },
									{
										className: "",
										begin: /\s/,
										end: /\s*/,
										skip: !0
									},
									{
										variants: [
											{ begin: "<>", end: "</>" },
											{
												begin: o.begin,
												"on:begin": o.isTrulyOpeningTag,
												end: o.end
											}
										],
										subLanguage: "xml",
										contains: [
											{
												begin: o.begin,
												end: o.end,
												skip: !0,
												contains: ["self"]
											}
										]
									}
								],
								relevance: 0
							},
							{
								className: "function",
								beginKeywords: "function",
								end: /[{;]/,
								excludeEnd: !0,
								keywords: l,
								contains: ["self", t.inherit(t.TITLE_MODE, { begin: c }), p],
								illegal: /%/
							},
							{
								beginKeywords: "while if switch catch for"
							},
							{
								className: "function",
								begin: t.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\))*[^()]*\\))*[^()]*\\)\\s*\\{",
								returnBegin: !0,
								contains: [p, t.inherit(t.TITLE_MODE, { begin: c })]
							},
							{
								variants: [
									{
										begin: "\\." + c
									},
									{ begin: "\\$" + c }
								],
								relevance: 0
							},
							{
								className: "class",
								beginKeywords: "class",
								end: /[{;=]/,
								excludeEnd: !0,
								illegal: /[:"[\]]/,
								contains: [
									{
										beginKeywords: "extends"
									},
									t.UNDERSCORE_TITLE_MODE
								]
							},
							{
								begin: /\b(?=constructor)/,
								end: /[{;]/,
								excludeEnd: !0,
								contains: [t.inherit(t.TITLE_MODE, { begin: c }), "self", p]
							},
							{
								begin: "(get|set)\\s+(?=" + c + "\\()",
								end: /\{/,
								keywords: "get set",
								contains: [t.inherit(t.TITLE_MODE, { begin: c }), { begin: /\(\)/ }, p]
							},
							{ begin: /\$[(.]/ }
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"perl",
			(() => {
				"use strict";
				function e(...e) {
					return e
						.map(e => {
							return (n = e) ? ("string" == typeof n ? n : n.source) : null;
							var n;
						})
						.join("");
				}
				return n => {
					var t = {
							$pattern: /[\w.]+/,
							keyword:
								"getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qq fileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmget sub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedir ioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when"
						},
						s = {
							className: "subst",
							begin: "[$@]\\{",
							end: "\\}",
							keywords: t
						},
						r = { begin: /->\{/, end: /\}/ },
						i = {
							variants: [
								{ begin: /\$\d/ },
								{
									begin: e(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![A-Za-z])(?![@$%])")
								},
								{ begin: /[$%@][^\s\w{]/, relevance: 0 }
							]
						},
						a = [n.BACKSLASH_ESCAPE, s, i],
						o = [
							i,
							n.HASH_COMMENT_MODE,
							n.COMMENT(/^=\w/, /=cut/, {
								endsWithParent: !0
							}),
							r,
							{
								className: "string",
								contains: a,
								variants: [
									{
										begin: "q[qwxr]?\\s*\\(",
										end: "\\)",
										relevance: 5
									},
									{
										begin: "q[qwxr]?\\s*\\[",
										end: "\\]",
										relevance: 5
									},
									{
										begin: "q[qwxr]?\\s*\\{",
										end: "\\}",
										relevance: 5
									},
									{
										begin: "q[qwxr]?\\s*\\|",
										end: "\\|",
										relevance: 5
									},
									{
										begin: "q[qwxr]?\\s*<",
										end: ">",
										relevance: 5
									},
									{
										begin: "qw\\s+q",
										end: "q",
										relevance: 5
									},
									{
										begin: "'",
										end: "'",
										contains: [n.BACKSLASH_ESCAPE]
									},
									{ begin: '"', end: '"' },
									{
										begin: "`",
										end: "`",
										contains: [n.BACKSLASH_ESCAPE]
									},
									{
										begin: /\{\w+\}/,
										contains: [],
										relevance: 0
									},
									{
										begin: "-?\\w+\\s*=>",
										contains: [],
										relevance: 0
									}
								]
							},
							{
								className: "number",
								begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
								relevance: 0
							},
							{
								begin: "(\\/\\/|" + n.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
								keywords: "split return print reverse grep",
								relevance: 0,
								contains: [
									n.HASH_COMMENT_MODE,
									{
										className: "regexp",
										begin: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
										relevance: 10
									},
									{
										className: "regexp",
										begin: "(m|qr)?/",
										end: "/[a-z]*",
										contains: [n.BACKSLASH_ESCAPE],
										relevance: 0
									}
								]
							},
							{
								className: "function",
								beginKeywords: "sub",
								end: "(\\s*\\(.*?\\))?[;{]",
								excludeEnd: !0,
								relevance: 5,
								contains: [n.TITLE_MODE]
							},
							{
								begin: "-\\w\\b",
								relevance: 0
							},
							{
								begin: "^__DATA__$",
								end: "^__END__$",
								subLanguage: "mojolicious",
								contains: [
									{
										begin: "^@@.*",
										end: "$",
										className: "comment"
									}
								]
							}
						];
					return (
						(s.contains = o),
						(r.contains = o),
						{
							name: "Perl",
							aliases: ["pl", "pm"],
							keywords: t,
							contains: o
						}
					);
				};
			})()
		);
		hljs.registerLanguage(
			"plaintext",
			(() => {
				"use strict";
				return t => ({
					name: "Plain text",
					aliases: ["text", "txt"],
					disableAutodetect: !0
				});
			})()
		);
		hljs.registerLanguage(
			"ini",
			(() => {
				"use strict";
				function e(e) {
					return e ? ("string" == typeof e ? e : e.source) : null;
				}
				function n(...n) {
					return n.map(n => e(n)).join("");
				}
				return s => {
					const a = {
							className: "number",
							relevance: 0,
							variants: [{ begin: /([+-]+)?[\d]+_[\d_]+/ }, { begin: s.NUMBER_RE }]
						},
						i = s.COMMENT();
					i.variants = [
						{ begin: /;/, end: /$/ },
						{ begin: /#/, end: /$/ }
					];
					const t = {
							className: "variable",
							variants: [{ begin: /\$[\w\d"][\w\d_]*/ }, { begin: /\$\{(.*?)\}/ }]
						},
						r = {
							className: "literal",
							begin: /\bon|off|true|false|yes|no\b/
						},
						l = {
							className: "string",
							contains: [s.BACKSLASH_ESCAPE],
							variants: [
								{ begin: "'''", end: "'''", relevance: 10 },
								{ begin: '"""', end: '"""', relevance: 10 },
								{ begin: '"', end: '"' },
								{ begin: "'", end: "'" }
							]
						},
						c = {
							begin: /\[/,
							end: /\]/,
							contains: [i, r, t, l, a, "self"],
							relevance: 0
						},
						g = "(" + [/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/].map(n => e(n)).join("|") + ")";
					return {
						name: "TOML, also INI",
						aliases: ["toml"],
						case_insensitive: !0,
						illegal: /\S/,
						contains: [
							i,
							{ className: "section", begin: /\[+/, end: /\]+/ },
							{
								begin: n(g, "(\\s*\\.\\s*", g, ")*", n("(?=", /\s*=\s*[^#\s]/, ")")),
								className: "attr",
								starts: {
									end: /$/,
									contains: [i, c, r, t, l, a]
								}
							}
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"sql",
			(() => {
				"use strict";
				return e => {
					var t = e.COMMENT("--", "$");
					return {
						name: "SQL",
						case_insensitive: !0,
						illegal: /[<>{}*]/,
						contains: [
							{
								beginKeywords:
									"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with",
								end: /;/,
								endsWithParent: !0,
								keywords: {
									$pattern: /[\w\.]+/,
									keyword:
										"as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
									literal: "true false null unknown",
									built_in:
										"array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void"
								},
								contains: [
									{
										className: "string",
										begin: "'",
										end: "'",
										contains: [{ begin: "''" }]
									},
									{
										className: "string",
										begin: '"',
										end: '"',
										contains: [{ begin: '""' }]
									},
									{
										className: "string",
										begin: "`",
										end: "`"
									},
									e.C_NUMBER_MODE,
									e.C_BLOCK_COMMENT_MODE,
									t,
									e.HASH_COMMENT_MODE
								]
							},
							e.C_BLOCK_COMMENT_MODE,
							t,
							e.HASH_COMMENT_MODE
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"python-repl",
			(() => {
				"use strict";
				return s => ({
					aliases: ["pycon"],
					contains: [
						{
							className: "meta",
							starts: {
								end: / |$/,
								starts: { end: "$", subLanguage: "python" }
							},
							variants: [
								{ begin: /^>>>(?=[ ]|$)/ },
								{
									begin: /^\.\.\.(?=[ ]|$)/
								}
							]
						}
					]
				});
			})()
		);
		hljs.registerLanguage(
			"csharp",
			(() => {
				"use strict";
				return e => {
					var n = {
							keyword: [
								"abstract",
								"as",
								"base",
								"break",
								"case",
								"class",
								"const",
								"continue",
								"do",
								"else",
								"event",
								"explicit",
								"extern",
								"finally",
								"fixed",
								"for",
								"foreach",
								"goto",
								"if",
								"implicit",
								"in",
								"interface",
								"internal",
								"is",
								"lock",
								"namespace",
								"new",
								"operator",
								"out",
								"override",
								"params",
								"private",
								"protected",
								"public",
								"readonly",
								"record",
								"ref",
								"return",
								"sealed",
								"sizeof",
								"stackalloc",
								"static",
								"struct",
								"switch",
								"this",
								"throw",
								"try",
								"typeof",
								"unchecked",
								"unsafe",
								"using",
								"virtual",
								"void",
								"volatile",
								"while"
							]
								.concat([
									"add",
									"alias",
									"and",
									"ascending",
									"async",
									"await",
									"by",
									"descending",
									"equals",
									"from",
									"get",
									"global",
									"group",
									"init",
									"into",
									"join",
									"let",
									"nameof",
									"not",
									"notnull",
									"on",
									"or",
									"orderby",
									"partial",
									"remove",
									"select",
									"set",
									"unmanaged",
									"value|0",
									"var",
									"when",
									"where",
									"with",
									"yield"
								])
								.join(" "),
							built_in: "bool byte char decimal delegate double dynamic enum float int long nint nuint object sbyte short string ulong unit ushort",
							literal: "default false null true"
						},
						a = e.inherit(e.TITLE_MODE, {
							begin: "[a-zA-Z](\\.?\\w)*"
						}),
						i = {
							className: "number",
							variants: [
								{
									begin: "\\b(0b[01']+)"
								},
								{
									begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
								},
								{
									begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
								}
							],
							relevance: 0
						},
						s = {
							className: "string",
							begin: '@"',
							end: '"',
							contains: [{ begin: '""' }]
						},
						t = e.inherit(s, { illegal: /\n/ }),
						r = {
							className: "subst",
							begin: /\{/,
							end: /\}/,
							keywords: n
						},
						l = e.inherit(r, { illegal: /\n/ }),
						c = {
							className: "string",
							begin: /\$"/,
							end: '"',
							illegal: /\n/,
							contains: [{ begin: /\{\{/ }, { begin: /\}\}/ }, e.BACKSLASH_ESCAPE, l]
						},
						o = {
							className: "string",
							begin: /\$@"/,
							end: '"',
							contains: [
								{
									begin: /\{\{/
								},
								{ begin: /\}\}/ },
								{ begin: '""' },
								r
							]
						},
						d = e.inherit(o, {
							illegal: /\n/,
							contains: [{ begin: /\{\{/ }, { begin: /\}\}/ }, { begin: '""' }, l]
						});
					(r.contains = [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, i, e.C_BLOCK_COMMENT_MODE]),
						(l.contains = [
							d,
							c,
							t,
							e.APOS_STRING_MODE,
							e.QUOTE_STRING_MODE,
							i,
							e.inherit(e.C_BLOCK_COMMENT_MODE, {
								illegal: /\n/
							})
						]);
					var g = {
							variants: [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
						},
						E = {
							begin: "<",
							end: ">",
							contains: [{ beginKeywords: "in out" }, a]
						},
						_ = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?",
						b = {
							begin: "@" + e.IDENT_RE,
							relevance: 0
						};
					return {
						name: "C#",
						aliases: ["cs", "c#"],
						keywords: n,
						illegal: /::/,
						contains: [
							e.COMMENT("///", "$", {
								returnBegin: !0,
								contains: [
									{
										className: "doctag",
										variants: [
											{ begin: "///", relevance: 0 },
											{
												begin: "\x3c!--|--\x3e"
											},
											{ begin: "</?", end: ">" }
										]
									}
								]
							}),
							e.C_LINE_COMMENT_MODE,
							e.C_BLOCK_COMMENT_MODE,
							{
								className: "meta",
								begin: "#",
								end: "$",
								keywords: {
									"meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
								}
							},
							g,
							i,
							{
								beginKeywords: "class interface",
								relevance: 0,
								end: /[{;=]/,
								illegal: /[^\s:,]/,
								contains: [{ beginKeywords: "where class" }, a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
							},
							{
								beginKeywords: "namespace",
								relevance: 0,
								end: /[{;=]/,
								illegal: /[^\s:]/,
								contains: [a, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
							},
							{
								beginKeywords: "record",
								relevance: 0,
								end: /[{;=]/,
								illegal: /[^\s:]/,
								contains: [a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
							},
							{
								className: "meta",
								begin: "^\\s*\\[",
								excludeBegin: !0,
								end: "\\]",
								excludeEnd: !0,
								contains: [
									{
										className: "meta-string",
										begin: /"/,
										end: /"/
									}
								]
							},
							{
								beginKeywords: "new return throw await else",
								relevance: 0
							},
							{
								className: "function",
								begin: "(" + _ + "\\s+)+" + e.IDENT_RE + "\\s*(<.+>)?\\s*\\(",
								returnBegin: !0,
								end: /\s*[{;=]/,
								excludeEnd: !0,
								keywords: n,
								contains: [
									{
										beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
										relevance: 0
									},
									{
										begin: e.IDENT_RE + "\\s*(<.+>)?\\s*\\(",
										returnBegin: !0,
										contains: [e.TITLE_MODE, E],
										relevance: 0
									},
									{
										className: "params",
										begin: /\(/,
										end: /\)/,
										excludeBegin: !0,
										excludeEnd: !0,
										keywords: n,
										relevance: 0,
										contains: [g, i, e.C_BLOCK_COMMENT_MODE]
									},
									e.C_LINE_COMMENT_MODE,
									e.C_BLOCK_COMMENT_MODE
								]
							},
							b
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"php",
			(() => {
				"use strict";
				return e => {
					const r = {
							className: "variable",
							begin: "\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*(?![A-Za-z0-9])(?![$])"
						},
						t = {
							className: "meta",
							variants: [
								{ begin: /<\?php/, relevance: 10 },
								{ begin: /<\?[=]?/ },
								{
									begin: /\?>/
								}
							]
						},
						a = {
							className: "subst",
							variants: [{ begin: /\$\w+/ }, { begin: /\{\$/, end: /\}/ }]
						},
						n = e.inherit(e.APOS_STRING_MODE, { illegal: null }),
						i = e.inherit(e.QUOTE_STRING_MODE, {
							illegal: null,
							contains: e.QUOTE_STRING_MODE.contains.concat(a)
						}),
						o = e.END_SAME_AS_BEGIN({
							begin: /<<<[ \t]*(\w+)\n/,
							end: /[ \t]*(\w+)\b/,
							contains: e.QUOTE_STRING_MODE.contains.concat(a)
						}),
						l = {
							className: "string",
							contains: [e.BACKSLASH_ESCAPE, t],
							variants: [e.inherit(n, { begin: "b'", end: "'" }), e.inherit(i, { begin: 'b"', end: '"' }), i, n, o]
						},
						c = {
							variants: [e.BINARY_NUMBER_MODE, e.C_NUMBER_MODE]
						},
						s = {
							keyword:
								"__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 new object or private protected public real return string switch throw trait try unset use var void while xor yield",
							literal: "false null true",
							built_in:
								"Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Throwable Traversable WeakReference Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
						};
					return {
						aliases: ["php", "php3", "php4", "php5", "php6", "php7", "php8"],
						case_insensitive: !0,
						keywords: s,
						contains: [
							e.HASH_COMMENT_MODE,
							e.COMMENT("//", "$", { contains: [t] }),
							e.COMMENT("/\\*", "\\*/", {
								contains: [{ className: "doctag", begin: "@[A-Za-z]+" }]
							}),
							e.COMMENT("__halt_compiler.+?;", !1, {
								endsWithParent: !0,
								keywords: "__halt_compiler"
							}),
							t,
							{ className: "keyword", begin: /\$this\b/ },
							r,
							{
								begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
							},
							{
								className: "function",
								relevance: 0,
								beginKeywords: "fn function",
								end: /[;{]/,
								excludeEnd: !0,
								illegal: "[$%\\[]",
								contains: [
									e.UNDERSCORE_TITLE_MODE,
									{ begin: "=>" },
									{
										className: "params",
										begin: "\\(",
										end: "\\)",
										excludeBegin: !0,
										excludeEnd: !0,
										keywords: s,
										contains: ["self", r, e.C_BLOCK_COMMENT_MODE, l, c]
									}
								]
							},
							{
								className: "class",
								beginKeywords: "class interface",
								relevance: 0,
								end: /\{/,
								excludeEnd: !0,
								illegal: /[:($"]/,
								contains: [{ beginKeywords: "extends implements" }, e.UNDERSCORE_TITLE_MODE]
							},
							{
								beginKeywords: "namespace",
								relevance: 0,
								end: ";",
								illegal: /[.']/,
								contains: [e.UNDERSCORE_TITLE_MODE]
							},
							{
								beginKeywords: "use",
								relevance: 0,
								end: ";",
								contains: [e.UNDERSCORE_TITLE_MODE]
							},
							l,
							c
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"php-template",
			(() => {
				"use strict";
				return n => ({
					name: "PHP template",
					subLanguage: "xml",
					contains: [
						{
							begin: /<\?(php|=)?/,
							end: /\?>/,
							subLanguage: "php",
							contains: [
								{ begin: "/\\*", end: "\\*/", skip: !0 },
								{ begin: 'b"', end: '"', skip: !0 },
								{ begin: "b'", end: "'", skip: !0 },
								n.inherit(n.APOS_STRING_MODE, {
									illegal: null,
									className: null,
									contains: null,
									skip: !0
								}),
								n.inherit(n.QUOTE_STRING_MODE, {
									illegal: null,
									className: null,
									contains: null,
									skip: !0
								})
							]
						}
					]
				});
			})()
		);
		hljs.registerLanguage(
			"rust",
			(() => {
				"use strict";
				return e => {
					const n = "([ui](8|16|32|64|128|size)|f(32|64))?",
						t =
							"drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";
					return {
						name: "Rust",
						aliases: ["rs"],
						keywords: {
							$pattern: e.IDENT_RE + "!?",
							keyword:
								"abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield",
							literal: "true false Some None Ok Err",
							built_in: t
						},
						illegal: "</",
						contains: [
							e.C_LINE_COMMENT_MODE,
							e.COMMENT("/\\*", "\\*/", { contains: ["self"] }),
							e.inherit(e.QUOTE_STRING_MODE, {
								begin: /b?"/,
								illegal: null
							}),
							{
								className: "string",
								variants: [
									{ begin: /r(#*)"(.|\n)*?"\1(?!#)/ },
									{
										begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
									}
								]
							},
							{
								className: "symbol",
								begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
							},
							{
								className: "number",
								variants: [
									{
										begin: "\\b0b([01_]+)" + n
									},
									{ begin: "\\b0o([0-7_]+)" + n },
									{
										begin: "\\b0x([A-Fa-f0-9_]+)" + n
									},
									{
										begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + n
									}
								],
								relevance: 0
							},
							{
								className: "function",
								beginKeywords: "fn",
								end: "(\\(|<)",
								excludeEnd: !0,
								contains: [e.UNDERSCORE_TITLE_MODE]
							},
							{
								className: "meta",
								begin: "#!?\\[",
								end: "\\]",
								contains: [
									{
										className: "meta-string",
										begin: /"/,
										end: /"/
									}
								]
							},
							{
								className: "class",
								beginKeywords: "type",
								end: ";",
								contains: [
									e.inherit(e.UNDERSCORE_TITLE_MODE, {
										endsParent: !0
									})
								],
								illegal: "\\S"
							},
							{
								className: "class",
								beginKeywords: "trait enum struct union",
								end: /\{/,
								contains: [
									e.inherit(e.UNDERSCORE_TITLE_MODE, {
										endsParent: !0
									})
								],
								illegal: "[\\w\\d]"
							},
							{
								begin: e.IDENT_RE + "::",
								keywords: { built_in: t }
							},
							{ begin: "->" }
						]
					};
				};
			})()
		);
		hljs.registerLanguage(
			"shell",
			(() => {
				"use strict";
				return s => ({
					name: "Shell Session",
					aliases: ["console"],
					contains: [
						{
							className: "meta",
							begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
							starts: {
								end: /[^\\](?=\s*$)/,
								subLanguage: "bash"
							}
						}
					]
				});
			})()
		);
		hljs.registerLanguage(
			"apache",
			(() => {
				"use strict";
				return e => {
					const n = {
						className: "number",
						begin: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?"
					};
					return {
						name: "Apache config",
						aliases: ["apacheconf"],
						case_insensitive: !0,
						contains: [
							e.HASH_COMMENT_MODE,
							{
								className: "section",
								begin: "</?",
								end: ">",
								contains: [
									n,
									{ className: "number", begin: ":\\d{1,5}" },
									e.inherit(e.QUOTE_STRING_MODE, {
										relevance: 0
									})
								]
							},
							{
								className: "attribute",
								begin: /\w+/,
								relevance: 0,
								keywords: {
									nomarkup:
										"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
								},
								starts: {
									end: /$/,
									relevance: 0,
									keywords: {
										literal: "on off all deny allow"
									},
									contains: [
										{
											className: "meta",
											begin: "\\s\\[",
											end: "\\]$"
										},
										{
											className: "variable",
											begin: "[\\$%]\\{",
											end: "\\}",
											contains: [
												"self",
												{
													className: "number",
													begin: "[\\$%]\\d+"
												}
											]
										},
										n,
										{ className: "number", begin: "\\d+" },
										e.QUOTE_STRING_MODE
									]
								}
							}
						],
						illegal: /\S/
					};
				};
			})()
		);
		hljs.registerLanguage(
			"css",
			(() => {
				"use strict";
				return e => {
					var n = "[a-zA-Z-][a-zA-Z0-9_-]*",
						a = {
							begin: /([*]\s?)?(?:[A-Z_.\-\\]+|--[a-zA-Z0-9_-]+)\s*(\/\*\*\/)?:/,
							returnBegin: !0,
							end: ";",
							endsWithParent: !0,
							contains: [
								{
									className: "attribute",
									begin: /\S/,
									end: ":",
									excludeEnd: !0,
									starts: {
										endsWithParent: !0,
										excludeEnd: !0,
										contains: [
											{
												begin: /[\w-]+\(/,
												returnBegin: !0,
												contains: [
													{
														className: "built_in",
														begin: /[\w-]+/
													},
													{
														begin: /\(/,
														end: /\)/,
														contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.CSS_NUMBER_MODE]
													}
												]
											},
											e.CSS_NUMBER_MODE,
											e.QUOTE_STRING_MODE,
											e.APOS_STRING_MODE,
											e.C_BLOCK_COMMENT_MODE,
											{
												className: "number",
												begin: "#[0-9A-Fa-f]+"
											},
											{
												className: "meta",
												begin: "!important"
											}
										]
									}
								}
							]
						};
					return {
						name: "CSS",
						case_insensitive: !0,
						illegal: /[=|'\$]/,
						contains: [
							e.C_BLOCK_COMMENT_MODE,
							{
								className: "selector-id",
								begin: /#[A-Za-z0-9_-]+/
							},
							{ className: "selector-class", begin: "\\." + n },
							{
								className: "selector-attr",
								begin: /\[/,
								end: /\]/,
								illegal: "$",
								contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
							},
							{
								className: "selector-pseudo",
								begin: /:(:)?[a-zA-Z0-9_+()"'.-]+/
							},
							{
								begin: "@(page|font-face)",
								lexemes: "@[a-z-]+",
								keywords: "@page @font-face"
							},
							{
								begin: "@",
								end: "[{;]",
								illegal: /:/,
								returnBegin: !0,
								contains: [
									{
										className: "keyword",
										begin: /@-?\w[\w]*(-\w+)*/
									},
									{
										begin: /\s/,
										endsWithParent: !0,
										excludeEnd: !0,
										relevance: 0,
										keywords: "and or not only",
										contains: [
											{
												begin: /[a-z-]+:/,
												className: "attribute"
											},
											e.APOS_STRING_MODE,
											e.QUOTE_STRING_MODE,
											e.CSS_NUMBER_MODE
										]
									}
								]
							},
							{
								className: "selector-tag",
								begin: n,
								relevance: 0
							},
							{
								begin: /\{/,
								end: /\}/,
								illegal: /\S/,
								contains: [e.C_BLOCK_COMMENT_MODE, { begin: /;/ }, a]
							}
						]
					};
				};
			})()
		);

		window.hljs = hljs;
	}

	return window.hljs;
}
</script>

<style lang="less">
.markdown-wrapper {
	pre {
		margin: var(--ui-one);
		> code {
			max-width: 800px;
			padding: var(--ui-one);
			border-radius: var(--border-radius);
			box-shadow: var(--el-box-shadow);
		}
	}

	p {
		line-height: 32px;
		font-weight: 500;
		font-size: 14px;
		color: #5e6d82;
		margin: 0;
	}
	code {
		padding: 4px;
		background-color: #fdf6ec;
		border-color: #faecd8;
		color: #e6a23c;
		border-radius: var(--border-radius);
		box-shadow: var(--el-box-shadow);
	}

	blockquote {
		padding: 8px 16px;
		background-color: var(--ui-primary-light-8);
		border-radius: 4px;
		border-left: 5px solid var(--ui-primary);
		margin: 20px 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-left: var(--ui-one);
	}

	ul {
		> li {
			text-indent: 16px;
			margin-top: 4px;
			line-height: 24px;
			list-style: disc;
			list-style-position: inside;
		}
	}

	table {
		display: table;
		border-collapse: collapse;
		margin: var(--ui-one);
		overflow-x: auto;
		tr {
			border-top: 1px solid var(--ui-dividing-line, #f2f2f3);
		}

		th,
		td {
			border: 1px solid var(--ui-dividing-line, #f2f2f3);
			padding: 8px var(--ui-one);
		}
	}
}

.a11y-dark {
	/* a11y-dark theme */
	/* Based on the Tomorrow Night Eighties theme: https://github.com/isagalaev/highlight.js/blob/master/src/styles/tomorrow-night-eighties.css */
	/* @author: ericwbailey */

	/* Comment */
	.hljs-comment,
	.hljs-quote {
		color: #d4d0ab;
	}

	/* Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #ffa07a;
	}

	/* Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #f5ab35;
	}

	/* Yellow */
	.hljs-attribute {
		color: #ffd700;
	}

	/* Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #abe338;
	}

	/* Blue */
	.hljs-title,
	.hljs-section {
		color: #00e0e0;
	}

	/* Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #dcc6e0;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #2b2b2b;
		color: #f8f8f2;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	@media screen and (-ms-high-contrast: active) {
		.hljs-addition,
		.hljs-attribute,
		.hljs-built_in,
		.hljs-builtin-name,
		.hljs-bullet,
		.hljs-comment,
		.hljs-link,
		.hljs-literal,
		.hljs-meta,
		.hljs-number,
		.hljs-params,
		.hljs-string,
		.hljs-symbol,
		.hljs-type,
		.hljs-quote {
			color: highlight;
		}

		.hljs-keyword,
		.hljs-selector-tag {
			font-weight: bold;
		}
	}
}

.a11y-light {
	/* a11y-light theme */
	/* Based on the Tomorrow Night Eighties theme: https://github.com/isagalaev/highlight.js/blob/master/src/styles/tomorrow-night-eighties.css */
	/* @author: ericwbailey */

	/* Comment */
	.hljs-comment,
	.hljs-quote {
		color: #696969;
	}

	/* Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #d91e18;
	}

	/* Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #aa5d00;
	}

	/* Yellow */
	.hljs-attribute {
		color: #aa5d00;
	}

	/* Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #008000;
	}

	/* Blue */
	.hljs-title,
	.hljs-section {
		color: #007faa;
	}

	/* Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #7928a1;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #fefefe;
		color: #545454;
		padding: var(--ui-one);
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	@media screen and (-ms-high-contrast: active) {
		.hljs-addition,
		.hljs-attribute,
		.hljs-built_in,
		.hljs-builtin-name,
		.hljs-bullet,
		.hljs-comment,
		.hljs-link,
		.hljs-literal,
		.hljs-meta,
		.hljs-number,
		.hljs-params,
		.hljs-string,
		.hljs-symbol,
		.hljs-type,
		.hljs-quote {
			color: highlight;
		}

		.hljs-keyword,
		.hljs-selector-tag {
			font-weight: bold;
		}
	}
}

.agate {
	/*!
 * Agate by Taufik Nurrohman <https://github.com/taufik-nurrohman>
 * ---------------------------------------------------------------
 *
 * #ade5fc
 * #a2fca2
 * #c6b4f0
 * #d36363
 * #fcc28c
 * #fc9b9b
 * #ffa
 * #fff
 * #333
 * #62c8f3
 * #888
 *
 */

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #333;
		color: white;
	}

	.hljs-name,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-code,
	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-tag {
		color: #62c8f3;
	}

	.hljs-variable,
	.hljs-template-variable,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #ade5fc;
	}

	.hljs-string,
	.hljs-bullet {
		color: #a2fca2;
	}

	.hljs-type,
	.hljs-title,
	.hljs-section,
	.hljs-attribute,
	.hljs-quote,
	.hljs-built_in,
	.hljs-builtin-name {
		color: #ffa;
	}

	.hljs-number,
	.hljs-symbol,
	.hljs-bullet {
		color: #d36363;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal {
		color: #fcc28c;
	}

	.hljs-comment,
	.hljs-deletion,
	.hljs-code {
		color: #888;
	}

	.hljs-regexp,
	.hljs-link {
		color: #c6b4f0;
	}

	.hljs-meta {
		color: #fc9b9b;
	}

	.hljs-deletion {
		background-color: #fc9b9b;
		color: #333;
	}

	.hljs-addition {
		background-color: #a2fca2;
		color: #333;
	}

	.hljs a {
		color: inherit;
	}

	.hljs a:focus,
	.hljs a:hover {
		color: inherit;
		text-decoration: underline;
	}
}

.an-old-hope {
	/* 

An Old Hope – Star Wars Syntax (c) Gustavo Costa <gusbemacbe@gmail.com>
Original theme - Ocean Dark Theme – by https://github.com/gavsiu
Based on Jesse Leite's Atom syntax theme 'An Old Hope' – https://github.com/JesseLeite/an-old-hope-syntax-atom

*/

	/* Death Star Comment */
	.hljs-comment,
	.hljs-quote {
		color: #b6b18b;
	}

	/* Darth Vader */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #eb3c54;
	}

	/* Threepio */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #e7ce56;
	}

	/* Luke Skywalker */
	.hljs-attribute {
		color: #ee7c2b;
	}

	/* Obi Wan Kenobi */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #4fb4d7;
	}

	/* Yoda */
	.hljs-title,
	.hljs-section {
		color: #78bb65;
	}

	/* Mace Windu */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #b45ea4;
	}

	/* Millenium Falcon */
	.hljs {
		display: block;
		overflow-x: auto;
		background: #1c1d21;
		color: #c0c5ce;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.androidstudio {
	/*
Date: 24 Fev 2015
Author: Pedro Oliveira <kanytu@gmail . com>
*/

	.hljs {
		color: #a9b7c6;
		background: #282b2e;
		display: block;
		overflow-x: auto;
		padding: 0.5em;
	}

	.hljs-number,
	.hljs-literal,
	.hljs-symbol,
	.hljs-bullet {
		color: #6897bb;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-deletion {
		color: #cc7832;
	}

	.hljs-variable,
	.hljs-template-variable,
	.hljs-link {
		color: #629755;
	}

	.hljs-comment,
	.hljs-quote {
		color: #808080;
	}

	.hljs-meta {
		color: #bbb529;
	}

	.hljs-string,
	.hljs-attribute,
	.hljs-addition {
		color: #6a8759;
	}

	.hljs-section,
	.hljs-title,
	.hljs-type {
		color: #ffc66d;
	}

	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #e8bf6a;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.arduino-light {
	/*

Arduino® Light Theme - Stefania Mellai <s.mellai@arduino.cc>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #ffffff;
	}

	.hljs,
	.hljs-subst {
		color: #434f54;
	}

	.hljs-keyword,
	.hljs-attribute,
	.hljs-selector-tag,
	.hljs-doctag,
	.hljs-name {
		color: #00979d;
	}

	.hljs-built_in,
	.hljs-literal,
	.hljs-bullet,
	.hljs-code,
	.hljs-addition {
		color: #d35400;
	}

	.hljs-regexp,
	.hljs-symbol,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #00979d;
	}

	.hljs-type,
	.hljs-string,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-quote,
	.hljs-template-tag,
	.hljs-deletion {
		color: #005c5f;
	}

	.hljs-title,
	.hljs-section {
		color: #880000;
		font-weight: bold;
	}

	.hljs-comment {
		color: rgba(149, 165, 166, 0.8);
	}

	.hljs-meta-keyword {
		color: #728e00;
	}

	.hljs-meta {
		color: #434f54;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-function {
		color: #728e00;
	}

	.hljs-number {
		color: #8a7b52;
	}
}

.arta {
	/*
Date: 17.V.2011
Author: pumbur <pumbur@pumbur.net>
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #222;
	}

	.hljs,
	.hljs-subst {
		color: #aaa;
	}

	.hljs-section {
		color: #fff;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-meta {
		color: #444;
	}

	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-regexp {
		color: #ffcc33;
	}

	.hljs-number,
	.hljs-addition {
		color: #00cc66;
	}

	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-link {
		color: #32aaee;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #6644aa;
	}

	.hljs-title,
	.hljs-variable,
	.hljs-deletion,
	.hljs-template-tag {
		color: #bb1166;
	}

	.hljs-section,
	.hljs-doctag,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.ascetic {
	/*

Original style from softwaremaniacs.org (c) Ivan Sagalaev <Maniac@SoftwareManiacs.Org>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: white;
		color: black;
	}

	.hljs-string,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-section,
	.hljs-addition,
	.hljs-attribute,
	.hljs-link {
		color: #888;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-meta,
	.hljs-deletion {
		color: #ccc;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-section,
	.hljs-name,
	.hljs-type,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.atelier-cave-dark {
	/* Base16 Atelier Cave Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/cave) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Cave Comment */
	.hljs-comment,
	.hljs-quote {
		color: #7e7887;
	}

	/* Atelier-Cave Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-regexp,
	.hljs-link,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #be4678;
	}

	/* Atelier-Cave Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #aa573c;
	}

	/* Atelier-Cave Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #2a9292;
	}

	/* Atelier-Cave Blue */
	.hljs-title,
	.hljs-section {
		color: #576ddb;
	}

	/* Atelier-Cave Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #955ae7;
	}

	.hljs-deletion,
	.hljs-addition {
		color: #19171c;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #be4678;
	}

	.hljs-addition {
		background-color: #2a9292;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #19171c;
		color: #8b8792;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-cave-light {
	/* Base16 Atelier Cave Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/cave) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Cave Comment */
	.hljs-comment,
	.hljs-quote {
		color: #655f6d;
	}

	/* Atelier-Cave Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #be4678;
	}

	/* Atelier-Cave Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #aa573c;
	}

	/* Atelier-Cave Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #2a9292;
	}

	/* Atelier-Cave Blue */
	.hljs-title,
	.hljs-section {
		color: #576ddb;
	}

	/* Atelier-Cave Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #955ae7;
	}

	.hljs-deletion,
	.hljs-addition {
		color: #19171c;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #be4678;
	}

	.hljs-addition {
		background-color: #2a9292;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #efecf4;
		color: #585260;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-dune-dark {
	/* Base16 Atelier Dune Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Dune Comment */
	.hljs-comment,
	.hljs-quote {
		color: #999580;
	}

	/* Atelier-Dune Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #d73737;
	}

	/* Atelier-Dune Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #b65611;
	}

	/* Atelier-Dune Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #60ac39;
	}

	/* Atelier-Dune Blue */
	.hljs-title,
	.hljs-section {
		color: #6684e1;
	}

	/* Atelier-Dune Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #b854d4;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #20201d;
		color: #a6a28c;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-dune-light {
	/* Base16 Atelier Dune Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/dune) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Dune Comment */
	.hljs-comment,
	.hljs-quote {
		color: #7d7a68;
	}

	/* Atelier-Dune Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #d73737;
	}

	/* Atelier-Dune Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #b65611;
	}

	/* Atelier-Dune Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #60ac39;
	}

	/* Atelier-Dune Blue */
	.hljs-title,
	.hljs-section {
		color: #6684e1;
	}

	/* Atelier-Dune Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #b854d4;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #fefbec;
		color: #6e6b5e;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-estuary-dark {
	/* Base16 Atelier Estuary Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/estuary) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Estuary Comment */
	.hljs-comment,
	.hljs-quote {
		color: #878573;
	}

	/* Atelier-Estuary Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #ba6236;
	}

	/* Atelier-Estuary Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #ae7313;
	}

	/* Atelier-Estuary Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #7d9726;
	}

	/* Atelier-Estuary Blue */
	.hljs-title,
	.hljs-section {
		color: #36a166;
	}

	/* Atelier-Estuary Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #5f9182;
	}

	.hljs-deletion,
	.hljs-addition {
		color: #22221b;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #ba6236;
	}

	.hljs-addition {
		background-color: #7d9726;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #22221b;
		color: #929181;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-estuary-light {
	/* Base16 Atelier Estuary Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/estuary) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Estuary Comment */
	.hljs-comment,
	.hljs-quote {
		color: #6c6b5a;
	}

	/* Atelier-Estuary Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #ba6236;
	}

	/* Atelier-Estuary Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #ae7313;
	}

	/* Atelier-Estuary Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #7d9726;
	}

	/* Atelier-Estuary Blue */
	.hljs-title,
	.hljs-section {
		color: #36a166;
	}

	/* Atelier-Estuary Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #5f9182;
	}

	.hljs-deletion,
	.hljs-addition {
		color: #22221b;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #ba6236;
	}

	.hljs-addition {
		background-color: #7d9726;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #f4f3ec;
		color: #5f5e4e;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-forest-dark {
	/* Base16 Atelier Forest Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Forest Comment */
	.hljs-comment,
	.hljs-quote {
		color: #9c9491;
	}

	/* Atelier-Forest Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #f22c40;
	}

	/* Atelier-Forest Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #df5320;
	}

	/* Atelier-Forest Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #7b9726;
	}

	/* Atelier-Forest Blue */
	.hljs-title,
	.hljs-section {
		color: #407ee7;
	}

	/* Atelier-Forest Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #6666ea;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #1b1918;
		color: #a8a19f;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-forest-light {
	/* Base16 Atelier Forest Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/forest) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Forest Comment */
	.hljs-comment,
	.hljs-quote {
		color: #766e6b;
	}

	/* Atelier-Forest Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #f22c40;
	}

	/* Atelier-Forest Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #df5320;
	}

	/* Atelier-Forest Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #7b9726;
	}

	/* Atelier-Forest Blue */
	.hljs-title,
	.hljs-section {
		color: #407ee7;
	}

	/* Atelier-Forest Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #6666ea;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #f1efee;
		color: #68615e;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-heath-dark {
	/* Base16 Atelier Heath Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/heath) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Heath Comment */
	.hljs-comment,
	.hljs-quote {
		color: #9e8f9e;
	}

	/* Atelier-Heath Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #ca402b;
	}

	/* Atelier-Heath Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #a65926;
	}

	/* Atelier-Heath Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #918b3b;
	}

	/* Atelier-Heath Blue */
	.hljs-title,
	.hljs-section {
		color: #516aec;
	}

	/* Atelier-Heath Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #7b59c0;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #1b181b;
		color: #ab9bab;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-heath-light {
	/* Base16 Atelier Heath Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/heath) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Heath Comment */
	.hljs-comment,
	.hljs-quote {
		color: #776977;
	}

	/* Atelier-Heath Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #ca402b;
	}

	/* Atelier-Heath Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #a65926;
	}

	/* Atelier-Heath Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #918b3b;
	}

	/* Atelier-Heath Blue */
	.hljs-title,
	.hljs-section {
		color: #516aec;
	}

	/* Atelier-Heath Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #7b59c0;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #f7f3f7;
		color: #695d69;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-lakeside-dark {
	/* Base16 Atelier Lakeside Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Lakeside Comment */
	.hljs-comment,
	.hljs-quote {
		color: #7195a8;
	}

	/* Atelier-Lakeside Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #d22d72;
	}

	/* Atelier-Lakeside Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #935c25;
	}

	/* Atelier-Lakeside Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #568c3b;
	}

	/* Atelier-Lakeside Blue */
	.hljs-title,
	.hljs-section {
		color: #257fad;
	}

	/* Atelier-Lakeside Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #6b6bb8;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #161b1d;
		color: #7ea2b4;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-lakeside-light {
	/* Base16 Atelier Lakeside Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/lakeside) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Lakeside Comment */
	.hljs-comment,
	.hljs-quote {
		color: #5a7b8c;
	}

	/* Atelier-Lakeside Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #d22d72;
	}

	/* Atelier-Lakeside Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #935c25;
	}

	/* Atelier-Lakeside Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #568c3b;
	}

	/* Atelier-Lakeside Blue */
	.hljs-title,
	.hljs-section {
		color: #257fad;
	}

	/* Atelier-Lakeside Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #6b6bb8;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #ebf8ff;
		color: #516d7b;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-plateau-dark {
	/* Base16 Atelier Plateau Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/plateau) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Plateau Comment */
	.hljs-comment,
	.hljs-quote {
		color: #7e7777;
	}

	/* Atelier-Plateau Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #ca4949;
	}

	/* Atelier-Plateau Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #b45a3c;
	}

	/* Atelier-Plateau Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #4b8b8b;
	}

	/* Atelier-Plateau Blue */
	.hljs-title,
	.hljs-section {
		color: #7272ca;
	}

	/* Atelier-Plateau Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #8464c4;
	}

	.hljs-deletion,
	.hljs-addition {
		color: #1b1818;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #ca4949;
	}

	.hljs-addition {
		background-color: #4b8b8b;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #1b1818;
		color: #8a8585;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-plateau-light {
	/* Base16 Atelier Plateau Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/plateau) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Plateau Comment */
	.hljs-comment,
	.hljs-quote {
		color: #655d5d;
	}

	/* Atelier-Plateau Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #ca4949;
	}

	/* Atelier-Plateau Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #b45a3c;
	}

	/* Atelier-Plateau Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #4b8b8b;
	}

	/* Atelier-Plateau Blue */
	.hljs-title,
	.hljs-section {
		color: #7272ca;
	}

	/* Atelier-Plateau Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #8464c4;
	}

	.hljs-deletion,
	.hljs-addition {
		color: #1b1818;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #ca4949;
	}

	.hljs-addition {
		background-color: #4b8b8b;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #f4ecec;
		color: #585050;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-savanna-dark {
	/* Base16 Atelier Savanna Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/savanna) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Savanna Comment */
	.hljs-comment,
	.hljs-quote {
		color: #78877d;
	}

	/* Atelier-Savanna Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #b16139;
	}

	/* Atelier-Savanna Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #9f713c;
	}

	/* Atelier-Savanna Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #489963;
	}

	/* Atelier-Savanna Blue */
	.hljs-title,
	.hljs-section {
		color: #478c90;
	}

	/* Atelier-Savanna Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #55859b;
	}

	.hljs-deletion,
	.hljs-addition {
		color: #171c19;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #b16139;
	}

	.hljs-addition {
		background-color: #489963;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #171c19;
		color: #87928a;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-savanna-light {
	/* Base16 Atelier Savanna Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/savanna) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Savanna Comment */
	.hljs-comment,
	.hljs-quote {
		color: #5f6d64;
	}

	/* Atelier-Savanna Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #b16139;
	}

	/* Atelier-Savanna Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #9f713c;
	}

	/* Atelier-Savanna Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #489963;
	}

	/* Atelier-Savanna Blue */
	.hljs-title,
	.hljs-section {
		color: #478c90;
	}

	/* Atelier-Savanna Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #55859b;
	}

	.hljs-deletion,
	.hljs-addition {
		color: #171c19;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #b16139;
	}

	.hljs-addition {
		background-color: #489963;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #ecf4ee;
		color: #526057;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-seaside-dark {
	/* Base16 Atelier Seaside Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/seaside) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Seaside Comment */
	.hljs-comment,
	.hljs-quote {
		color: #809980;
	}

	/* Atelier-Seaside Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #e6193c;
	}

	/* Atelier-Seaside Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #87711d;
	}

	/* Atelier-Seaside Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #29a329;
	}

	/* Atelier-Seaside Blue */
	.hljs-title,
	.hljs-section {
		color: #3d62f5;
	}

	/* Atelier-Seaside Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #ad2bee;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #131513;
		color: #8ca68c;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-seaside-light {
	/* Base16 Atelier Seaside Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/seaside) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Seaside Comment */
	.hljs-comment,
	.hljs-quote {
		color: #687d68;
	}

	/* Atelier-Seaside Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #e6193c;
	}

	/* Atelier-Seaside Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #87711d;
	}

	/* Atelier-Seaside Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #29a329;
	}

	/* Atelier-Seaside Blue */
	.hljs-title,
	.hljs-section {
		color: #3d62f5;
	}

	/* Atelier-Seaside Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #ad2bee;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #f4fbf4;
		color: #5e6e5e;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-sulphurpool-dark {
	/* Base16 Atelier Sulphurpool Dark - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/sulphurpool) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Sulphurpool Comment */
	.hljs-comment,
	.hljs-quote {
		color: #898ea4;
	}

	/* Atelier-Sulphurpool Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #c94922;
	}

	/* Atelier-Sulphurpool Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #c76b29;
	}

	/* Atelier-Sulphurpool Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #ac9739;
	}

	/* Atelier-Sulphurpool Blue */
	.hljs-title,
	.hljs-section {
		color: #3d8fd1;
	}

	/* Atelier-Sulphurpool Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #6679cc;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #202746;
		color: #979db4;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atelier-sulphurpool-light {
	/* Base16 Atelier Sulphurpool Light - Theme */
	/* by Bram de Haan (http://atelierbram.github.io/syntax-highlighting/atelier-schemes/sulphurpool) */
	/* Original Base16 color scheme by Chris Kempson (https://github.com/chriskempson/base16) */

	/* Atelier-Sulphurpool Comment */
	.hljs-comment,
	.hljs-quote {
		color: #6b7394;
	}

	/* Atelier-Sulphurpool Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-regexp,
	.hljs-link,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #c94922;
	}

	/* Atelier-Sulphurpool Orange */
	.hljs-number,
	.hljs-meta,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #c76b29;
	}

	/* Atelier-Sulphurpool Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet {
		color: #ac9739;
	}

	/* Atelier-Sulphurpool Blue */
	.hljs-title,
	.hljs-section {
		color: #3d8fd1;
	}

	/* Atelier-Sulphurpool Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #6679cc;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #f5f7ff;
		color: #5e6687;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.atom-one-dark-reasonable {
	/*

Atom One Dark With support for ReasonML by Gidi Morris, based off work by Daniel Gamage

Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax

*/
	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #abb2bf;
		background: #282c34;
	}

	.hljs-keyword,
	.hljs-operator {
		color: #f92672;
	}

	.hljs-pattern-match {
		color: #f92672;
	}

	.hljs-pattern-match .hljs-constructor {
		color: #61aeee;
	}

	.hljs-function {
		color: #61aeee;
	}

	.hljs-function .hljs-params {
		color: #a6e22e;
	}

	.hljs-function .hljs-params .hljs-typing {
		color: #fd971f;
	}

	.hljs-module-access .hljs-module {
		color: #7e57c2;
	}

	.hljs-constructor {
		color: #e2b93d;
	}

	.hljs-constructor .hljs-string {
		color: #9ccc65;
	}

	.hljs-comment,
	.hljs-quote {
		color: #b18eb1;
		font-style: italic;
	}

	.hljs-doctag,
	.hljs-formula {
		color: #c678dd;
	}

	.hljs-section,
	.hljs-name,
	.hljs-selector-tag,
	.hljs-deletion,
	.hljs-subst {
		color: #e06c75;
	}

	.hljs-literal {
		color: #56b6c2;
	}

	.hljs-string,
	.hljs-regexp,
	.hljs-addition,
	.hljs-attribute,
	.hljs-meta-string {
		color: #98c379;
	}

	.hljs-built_in,
	.hljs-class .hljs-title {
		color: #e6c07b;
	}

	.hljs-attr,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-type,
	.hljs-selector-class,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-number {
		color: #d19a66;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-link,
	.hljs-meta,
	.hljs-selector-id,
	.hljs-title {
		color: #61aeee;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-link {
		text-decoration: underline;
	}
}

.atom-one-dark {
	/*

Atom One Dark by Daniel Gamage
Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax

base:    #282c34
mono-1:  #abb2bf
mono-2:  #818896
mono-3:  #5c6370
hue-1:   #56b6c2
hue-2:   #61aeee
hue-3:   #c678dd
hue-4:   #98c379
hue-5:   #e06c75
hue-5-2: #be5046
hue-6:   #d19a66
hue-6-2: #e6c07b

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #abb2bf;
		background: #282c34;
	}

	.hljs-comment,
	.hljs-quote {
		color: #5c6370;
		font-style: italic;
	}

	.hljs-doctag,
	.hljs-keyword,
	.hljs-formula {
		color: #c678dd;
	}

	.hljs-section,
	.hljs-name,
	.hljs-selector-tag,
	.hljs-deletion,
	.hljs-subst {
		color: #e06c75;
	}

	.hljs-literal {
		color: #56b6c2;
	}

	.hljs-string,
	.hljs-regexp,
	.hljs-addition,
	.hljs-attribute,
	.hljs-meta-string {
		color: #98c379;
	}

	.hljs-built_in,
	.hljs-class .hljs-title {
		color: #e6c07b;
	}

	.hljs-attr,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-type,
	.hljs-selector-class,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-number {
		color: #d19a66;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-link,
	.hljs-meta,
	.hljs-selector-id,
	.hljs-title {
		color: #61aeee;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-link {
		text-decoration: underline;
	}
}

.atom-one-light {
	/*

Atom One Light by Daniel Gamage
Original One Light Syntax theme from https://github.com/atom/one-light-syntax

base:    #fafafa
mono-1:  #383a42
mono-2:  #686b77
mono-3:  #a0a1a7
hue-1:   #0184bb
hue-2:   #4078f2
hue-3:   #a626a4
hue-4:   #50a14f
hue-5:   #e45649
hue-5-2: #c91243
hue-6:   #986801
hue-6-2: #c18401

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #383a42;
		background: #fafafa;
	}

	.hljs-comment,
	.hljs-quote {
		color: #a0a1a7;
		font-style: italic;
	}

	.hljs-doctag,
	.hljs-keyword,
	.hljs-formula {
		color: #a626a4;
	}

	.hljs-section,
	.hljs-name,
	.hljs-selector-tag,
	.hljs-deletion,
	.hljs-subst {
		color: #e45649;
	}

	.hljs-literal {
		color: #0184bb;
	}

	.hljs-string,
	.hljs-regexp,
	.hljs-addition,
	.hljs-attribute,
	.hljs-meta-string {
		color: #50a14f;
	}

	.hljs-built_in,
	.hljs-class .hljs-title {
		color: #c18401;
	}

	.hljs-attr,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-type,
	.hljs-selector-class,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-number {
		color: #986801;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-link,
	.hljs-meta,
	.hljs-selector-id,
	.hljs-title {
		color: #4078f2;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-link {
		text-decoration: underline;
	}
}

.brown-paper {
	/*

Brown Paper style from goldblog.com.ua (c) Zaripov Yura <yur4ik7@ukr.net>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #b7a68e url(/common/assets/highlightstyles/brown-papersq.png);
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal {
		color: #005599;
		font-weight: bold;
	}

	.hljs,
	.hljs-subst {
		color: #363c69;
	}

	.hljs-string,
	.hljs-title,
	.hljs-section,
	.hljs-type,
	.hljs-attribute,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-built_in,
	.hljs-addition,
	.hljs-variable,
	.hljs-template-tag,
	.hljs-template-variable,
	.hljs-link,
	.hljs-name {
		color: #2c009f;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-meta,
	.hljs-deletion {
		color: #802022;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-doctag,
	.hljs-title,
	.hljs-section,
	.hljs-type,
	.hljs-name,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.codepen-embed {
	/*
  codepen.io Embed Theme
  Author: Justin Perry <http://github.com/ourmaninamsterdam>
  Original theme - https://github.com/chriskempson/tomorrow-theme
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #222;
		color: #fff;
	}

	.hljs-comment,
	.hljs-quote {
		color: #777;
	}

	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-regexp,
	.hljs-meta,
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-params,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-link,
	.hljs-deletion {
		color: #ab875d;
	}

	.hljs-section,
	.hljs-title,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-type,
	.hljs-attribute {
		color: #9b869b;
	}

	.hljs-string,
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-addition {
		color: #8f9c6c;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.color-brewer {
	/*

Colorbrewer theme
Original: https://github.com/mbostock/colorbrewer-theme (c) Mike Bostock <mike@ocks.org>
Ported by Fabrício Tavares de Oliveira

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #fff;
	}

	.hljs,
	.hljs-subst {
		color: #000;
	}

	.hljs-string,
	.hljs-meta,
	.hljs-symbol,
	.hljs-template-tag,
	.hljs-template-variable,
	.hljs-addition {
		color: #756bb1;
	}

	.hljs-comment,
	.hljs-quote {
		color: #636363;
	}

	.hljs-number,
	.hljs-regexp,
	.hljs-literal,
	.hljs-bullet,
	.hljs-link {
		color: #31a354;
	}

	.hljs-deletion,
	.hljs-variable {
		color: #88f;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-title,
	.hljs-section,
	.hljs-built_in,
	.hljs-doctag,
	.hljs-type,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-strong {
		color: #3182bd;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-attribute {
		color: #e6550d;
	}
}

.darcula {
	/*

Darcula color scheme from the JetBrains family of IDEs

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #2b2b2b;
		color: #bababa;
	}

	.hljs-strong,
	.hljs-emphasis {
		color: #a8a8a2;
	}

	.hljs-bullet,
	.hljs-quote,
	.hljs-link,
	.hljs-number,
	.hljs-regexp,
	.hljs-literal {
		color: #6896ba;
	}

	.hljs-code,
	.hljs-selector-class {
		color: #a6e22e;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-section,
	.hljs-attribute,
	.hljs-name,
	.hljs-variable {
		color: #cb7832;
	}

	.hljs-params {
		color: #b9b9b9;
	}

	.hljs-string {
		color: #6a8759;
	}

	.hljs-subst,
	.hljs-type,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-symbol,
	.hljs-selector-id,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-template-tag,
	.hljs-template-variable,
	.hljs-addition {
		color: #e0c46c;
	}

	.hljs-comment,
	.hljs-deletion,
	.hljs-meta {
		color: #7f7f7f;
	}
}

.dark {
	/*

Dark style from softwaremaniacs.org (c) Ivan Sagalaev <Maniac@SoftwareManiacs.Org>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #444;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-section,
	.hljs-link {
		color: white;
	}

	.hljs,
	.hljs-subst {
		color: #ddd;
	}

	.hljs-string,
	.hljs-title,
	.hljs-name,
	.hljs-type,
	.hljs-attribute,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-built_in,
	.hljs-addition,
	.hljs-variable,
	.hljs-template-tag,
	.hljs-template-variable {
		color: #d88;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-deletion,
	.hljs-meta {
		color: #777;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-title,
	.hljs-section,
	.hljs-doctag,
	.hljs-type,
	.hljs-name,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.default {
	/*

Original highlight.js style (c) Ivan Sagalaev <maniac@softwaremaniacs.org>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #f0f0f0;
	}

	/* Base color: saturation 0; */

	.hljs,
	.hljs-subst {
		color: #444;
	}

	.hljs-comment {
		color: #888888;
	}

	.hljs-keyword,
	.hljs-attribute,
	.hljs-selector-tag,
	.hljs-meta-keyword,
	.hljs-doctag,
	.hljs-name {
		font-weight: bold;
	}

	/* User color: hue: 0 */

	.hljs-type,
	.hljs-string,
	.hljs-number,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-quote,
	.hljs-template-tag,
	.hljs-deletion {
		color: #880000;
	}

	.hljs-title,
	.hljs-section {
		color: #880000;
		font-weight: bold;
	}

	.hljs-regexp,
	.hljs-symbol,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #bc6060;
	}

	/* Language color: hue: 90; */

	.hljs-literal {
		color: #78a960;
	}

	.hljs-built_in,
	.hljs-bullet,
	.hljs-code,
	.hljs-addition {
		color: #397300;
	}

	/* Meta color: hue: 200 */

	.hljs-meta {
		color: #1f7199;
	}

	.hljs-meta-string {
		color: #4d99bf;
	}

	/* Misc effects */

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.docco {
	/*
Docco style used in http://jashkenas.github.com/docco/ converted by Simon Madine (@thingsinjars)
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #000;
		background: #f8f8ff;
	}

	.hljs-comment,
	.hljs-quote {
		color: #408080;
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-subst {
		color: #954121;
	}

	.hljs-number {
		color: #40a070;
	}

	.hljs-string,
	.hljs-doctag {
		color: #219161;
	}

	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-section,
	.hljs-type {
		color: #19469d;
	}

	.hljs-params {
		color: #00f;
	}

	.hljs-title {
		color: #458;
		font-weight: bold;
	}

	.hljs-tag,
	.hljs-name,
	.hljs-attribute {
		color: #000080;
		font-weight: normal;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #008080;
	}

	.hljs-regexp,
	.hljs-link {
		color: #b68;
	}

	.hljs-symbol,
	.hljs-bullet {
		color: #990073;
	}

	.hljs-built_in,
	.hljs-builtin-name {
		color: #0086b3;
	}

	.hljs-meta {
		color: #999;
		font-weight: bold;
	}

	.hljs-deletion {
		background: #fdd;
	}

	.hljs-addition {
		background: #dfd;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.dracula {
	/*

Dracula Theme v1.2.0

https://github.com/zenorocha/dracula-theme

Copyright 2015, All rights reserved

Code licensed under the MIT license
http://zenorocha.mit-license.org

@author Éverton Ribeiro <nuxlli@gmail.com>
@author Zeno Rocha <hi@zenorocha.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #282a36;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-section,
	.hljs-link {
		color: #8be9fd;
	}

	.hljs-function .hljs-keyword {
		color: #ff79c6;
	}

	.hljs,
	.hljs-subst {
		color: #f8f8f2;
	}

	.hljs-string,
	.hljs-title,
	.hljs-name,
	.hljs-type,
	.hljs-attribute,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition,
	.hljs-variable,
	.hljs-template-tag,
	.hljs-template-variable {
		color: #f1fa8c;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-deletion,
	.hljs-meta {
		color: #6272a4;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-title,
	.hljs-section,
	.hljs-doctag,
	.hljs-type,
	.hljs-name,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.far {
	/*

FAR Style (c) MajestiC <majestic2k@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #000080;
	}

	.hljs,
	.hljs-subst {
		color: #0ff;
	}

	.hljs-string,
	.hljs-attribute,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-template-tag,
	.hljs-template-variable,
	.hljs-addition {
		color: #ff0;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-section,
	.hljs-type,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-variable {
		color: #fff;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-doctag,
	.hljs-deletion {
		color: #888;
	}

	.hljs-number,
	.hljs-regexp,
	.hljs-literal,
	.hljs-link {
		color: #0f0;
	}

	.hljs-meta {
		color: #008080;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-title,
	.hljs-section,
	.hljs-name,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.foundation {
	/*
Description: Foundation 4 docs style for highlight.js
Author: Dan Allen <dan.j.allen@gmail.com>
Website: http://foundation.zurb.com/docs/
Version: 1.0
Date: 2013-04-02
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #eee;
		color: black;
	}

	.hljs-link,
	.hljs-emphasis,
	.hljs-attribute,
	.hljs-addition {
		color: #070;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong,
	.hljs-string,
	.hljs-deletion {
		color: #d14;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-quote,
	.hljs-comment {
		color: #998;
		font-style: italic;
	}

	.hljs-section,
	.hljs-title {
		color: #900;
	}

	.hljs-class .hljs-title,
	.hljs-type {
		color: #458;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #336699;
	}

	.hljs-bullet {
		color: #997700;
	}

	.hljs-meta {
		color: #3344bb;
	}

	.hljs-code,
	.hljs-number,
	.hljs-literal,
	.hljs-keyword,
	.hljs-selector-tag {
		color: #099;
	}

	.hljs-regexp {
		background-color: #fff0ff;
		color: #880088;
	}

	.hljs-symbol {
		color: #990073;
	}

	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #007700;
	}
}

.github-gist {
	/**
 * GitHub Gist Theme
 * Author : Anthony Attard - https://github.com/AnthonyAttard
 * Author : Louis Barranqueiro - https://github.com/LouisBarranqueiro
 */

	.hljs {
		display: block;
		background: white;
		padding: 0.5em;
		color: #333333;
		overflow-x: auto;
	}

	.hljs-comment,
	.hljs-meta {
		color: #969896;
	}

	.hljs-variable,
	.hljs-template-variable,
	.hljs-strong,
	.hljs-emphasis,
	.hljs-quote {
		color: #df5000;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-type {
		color: #d73a49;
	}

	.hljs-literal,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-attribute {
		color: #0086b3;
	}

	.hljs-section,
	.hljs-name {
		color: #63a35c;
	}

	.hljs-tag {
		color: #333333;
	}

	.hljs-title,
	.hljs-attr,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #6f42c1;
	}

	.hljs-addition {
		color: #55a532;
		background-color: #eaffea;
	}

	.hljs-deletion {
		color: #bd2c00;
		background-color: #ffecec;
	}

	.hljs-link {
		text-decoration: underline;
	}

	.hljs-number {
		color: #005cc5;
	}

	.hljs-string {
		color: #032f62;
	}
}

.github {
	/*

github.com style (c) Vasily Polovnyov <vast@whiteants.net>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #333;
		background: #f8f8f8;
	}

	.hljs-comment,
	.hljs-quote {
		color: #998;
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-subst {
		color: #333;
		font-weight: bold;
	}

	.hljs-number,
	.hljs-literal,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag .hljs-attr {
		color: #008080;
	}

	.hljs-string,
	.hljs-doctag {
		color: #d14;
	}

	.hljs-title,
	.hljs-section,
	.hljs-selector-id {
		color: #900;
		font-weight: bold;
	}

	.hljs-subst {
		font-weight: normal;
	}

	.hljs-type,
	.hljs-class .hljs-title {
		color: #458;
		font-weight: bold;
	}

	.hljs-tag,
	.hljs-name,
	.hljs-attribute {
		color: #000080;
		font-weight: normal;
	}

	.hljs-regexp,
	.hljs-link {
		color: #009926;
	}

	.hljs-symbol,
	.hljs-bullet {
		color: #990073;
	}

	.hljs-built_in,
	.hljs-builtin-name {
		color: #0086b3;
	}

	.hljs-meta {
		color: #999;
		font-weight: bold;
	}

	.hljs-deletion {
		background: #fdd;
	}

	.hljs-addition {
		background: #dfd;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.gml {
	/*

GML Theme - Meseta <meseta@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #222222;
		color: #c0c0c0;
	}

	.hljs-keyword {
		color: #ffb871;
		font-weight: bold;
	}

	.hljs-built_in {
		color: #ffb871;
	}

	.hljs-literal {
		color: #ff8080;
	}

	.hljs-symbol {
		color: #58e55a;
	}

	.hljs-comment {
		color: #5b995b;
	}

	.hljs-string {
		color: #ffff00;
	}

	.hljs-number {
		color: #ff8080;
	}

	.hljs-attribute,
	.hljs-selector-tag,
	.hljs-doctag,
	.hljs-name,
	.hljs-bullet,
	.hljs-code,
	.hljs-addition,
	.hljs-regexp,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-type,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-quote,
	.hljs-template-tag,
	.hljs-deletion,
	.hljs-title,
	.hljs-section,
	.hljs-function,
	.hljs-meta-keyword,
	.hljs-meta,
	.hljs-subst {
		color: #c0c0c0;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.googlecode {
	/*

Google Code style (c) Aahan Krish <geekpanth3r@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: white;
		color: black;
	}

	.hljs-comment,
	.hljs-quote {
		color: #800;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-section,
	.hljs-title,
	.hljs-name {
		color: #008;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #660;
	}

	.hljs-string,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-regexp {
		color: #080;
	}

	.hljs-literal,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-meta,
	.hljs-number,
	.hljs-link {
		color: #066;
	}

	.hljs-title,
	.hljs-doctag,
	.hljs-type,
	.hljs-attr,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-params {
		color: #606;
	}

	.hljs-attribute,
	.hljs-subst {
		color: #000;
	}

	.hljs-formula {
		background-color: #eee;
		font-style: italic;
	}

	.hljs-selector-id,
	.hljs-selector-class {
		color: #9b703f;
	}

	.hljs-addition {
		background-color: #baeeba;
	}

	.hljs-deletion {
		background-color: #ffc8bd;
	}

	.hljs-doctag,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.gradient-dark {
	/*

Gradient Dark (c) Samia Ali <samiaab1990@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: rgb(80, 31, 122);
		background: linear-gradient(166deg, rgba(80, 31, 122, 1) 0%, rgba(40, 32, 179, 1) 80%);
		color: #e7e4eb;
	}

	.hljs-subtr {
		color: #e7e4eb;
	}

	.hljs-doctag,
	.hljs-meta,
	.hljs-comment,
	.hljs-quote {
		color: #af8dd9;
	}

	.hljs-selector-tag,
	.hljs-selector-id,
	.hljs-template-tag,
	.hljs-regexp,
	.hljs-attr,
	.hljs-tag {
		color: #aefbff;
	}

	.hljs-params,
	.hljs-selector-class,
	.hljs-bullet {
		color: #f19fff;
	}

	.hljs-keyword,
	.hljs-section,
	.hljs-meta-keyword,
	.hljs-symbol,
	.hljs-type {
		color: #17fc95;
	}

	.hljs-addition,
	.hljs-number,
	.hljs-link {
		color: #c5fe00;
	}

	.hljs-string {
		color: #38c0ff;
	}

	.hljs-attribute,
	.hljs-addition {
		color: #e7ff9f;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #e447ff;
	}

	.hljs-builtin-name,
	.hljs-built_in,
	.hljs-formula,
	.hljs-name,
	.hljs-title,
	.hljs-class,
	.hljs-function {
		color: #ffc800;
	}

	.hljs-selector-pseudo,
	.hljs-deletion,
	.hljs-literal {
		color: #ff9e44;
	}

	.hljs-emphasis,
	.hljs-quote {
		font-style: italic;
	}

	.hljs-params,
	.hljs-selector-class,
	.hljs-strong,
	.hljs-selector-tag,
	.hljs-selector-id,
	.hljs-template-tag,
	.hljs-section,
	.hljs-keyword {
		font-weight: bold;
	}
}

.gradient-light {
	/*

Gradient Light (c) Samia Ali <samiaab1990@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: rgb(255, 253, 141);
		background: linear-gradient(142deg, rgba(255, 253, 141, 1) 0%, rgba(252, 183, 255, 1) 35%, rgba(144, 236, 255, 1) 100%);
		color: #250482;
	}

	.hljs-subtr {
		color: #01958b;
	}

	.hljs-doctag,
	.hljs-meta,
	.hljs-comment,
	.hljs-quote {
		color: #cb7200;
	}

	.hljs-selector-tag,
	.hljs-selector-id,
	.hljs-template-tag,
	.hljs-regexp,
	.hljs-attr,
	.hljs-tag {
		color: #07bd5f;
	}

	.hljs-params,
	.hljs-selector-class,
	.hljs-bullet {
		color: #43449f;
	}

	.hljs-keyword,
	.hljs-section,
	.hljs-meta-keyword,
	.hljs-symbol,
	.hljs-type {
		color: #7d2801;
	}

	.hljs-addition,
	.hljs-number,
	.hljs-link {
		color: #7f0096;
	}

	.hljs-string {
		color: #38c0ff;
	}

	.hljs-attribute,
	.hljs-addition {
		color: #296562;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #025c8f;
	}

	.hljs-builtin-name,
	.hljs-built_in,
	.hljs-formula,
	.hljs-name,
	.hljs-title,
	.hljs-class,
	.hljs-function {
		color: #529117;
	}

	.hljs-selector-pseudo,
	.hljs-deletion,
	.hljs-literal {
		color: #ad13ff;
	}

	.hljs-emphasis,
	.hljs-quote {
		font-style: italic;
	}

	.hljs-params,
	.hljs-selector-class,
	.hljs-strong,
	.hljs-selector-tag,
	.hljs-selector-id,
	.hljs-template-tag,
	.hljs-section,
	.hljs-keyword {
		font-weight: bold;
	}
}

.grayscale {
	/*

grayscale style (c) MY Sun <simonmysun@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #333;
		background: #fff;
	}

	.hljs-comment,
	.hljs-quote {
		color: #777;
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-subst {
		color: #333;
		font-weight: bold;
	}

	.hljs-number,
	.hljs-literal {
		color: #777;
	}

	.hljs-string,
	.hljs-doctag,
	.hljs-formula {
		color: #333;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAJ0lEQVQIW2O8e/fufwYGBgZBQUEQxcCIIfDu3Tuwivfv30NUoAsAALHpFMMLqZlPAAAAAElFTkSuQmCC) repeat;
	}

	.hljs-title,
	.hljs-section,
	.hljs-selector-id {
		color: #000;
		font-weight: bold;
	}

	.hljs-subst {
		font-weight: normal;
	}

	.hljs-class .hljs-title,
	.hljs-type,
	.hljs-name {
		color: #333;
		font-weight: bold;
	}

	.hljs-tag {
		color: #333;
	}

	.hljs-regexp {
		color: #333;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAPUlEQVQYV2NkQAN37979r6yszIgujiIAU4RNMVwhuiQ6H6wQl3XI4oy4FMHcCJPHcDS6J2A2EqUQpJhohQDexSef15DBCwAAAABJRU5ErkJggg==)
			repeat;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-link {
		color: #000;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAKElEQVQIW2NkQAO7d+/+z4gsBhJwdXVlhAvCBECKwIIwAbhKZBUwBQA6hBpm5efZsgAAAABJRU5ErkJggg==) repeat;
	}

	.hljs-built_in,
	.hljs-builtin-name {
		color: #000;
		text-decoration: underline;
	}

	.hljs-meta {
		color: #999;
		font-weight: bold;
	}

	.hljs-deletion {
		color: #fff;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAAE0lEQVQIW2MMDQ39zzhz5kwIAQAyxweWgUHd1AAAAABJRU5ErkJggg==) repeat;
	}

	.hljs-addition {
		color: #000;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAALUlEQVQYV2N89+7dfwYk8P79ewZBQUFkIQZGOiu6e/cuiptQHAPl0NtNxAQBAM97Oejj3Dg7AAAAAElFTkSuQmCC) repeat;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.gruvbox-dark {
	/*

Gruvbox style (dark) (c) Pavel Pertsev (original style at https://github.com/morhetz/gruvbox)

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #282828;
	}

	.hljs,
	.hljs-subst {
		color: #ebdbb2;
	}

	/* Gruvbox Red */
	.hljs-deletion,
	.hljs-formula,
	.hljs-keyword,
	.hljs-link,
	.hljs-selector-tag {
		color: #fb4934;
	}

	/* Gruvbox Blue */
	.hljs-built_in,
	.hljs-emphasis,
	.hljs-name,
	.hljs-quote,
	.hljs-strong,
	.hljs-title,
	.hljs-variable {
		color: #83a598;
	}

	/* Gruvbox Yellow */
	.hljs-attr,
	.hljs-params,
	.hljs-template-tag,
	.hljs-type {
		color: #fabd2f;
	}

	/* Gruvbox Purple */
	.hljs-builtin-name,
	.hljs-doctag,
	.hljs-literal,
	.hljs-number {
		color: #8f3f71;
	}

	/* Gruvbox Orange */
	.hljs-code,
	.hljs-meta,
	.hljs-regexp,
	.hljs-selector-id,
	.hljs-template-variable {
		color: #fe8019;
	}

	/* Gruvbox Green */
	.hljs-addition,
	.hljs-meta-string,
	.hljs-section,
	.hljs-selector-attr,
	.hljs-selector-class,
	.hljs-string,
	.hljs-symbol {
		color: #b8bb26;
	}

	/* Gruvbox Aqua */
	.hljs-attribute,
	.hljs-bullet,
	.hljs-class,
	.hljs-function,
	.hljs-function .hljs-keyword,
	.hljs-meta-keyword,
	.hljs-selector-pseudo,
	.hljs-tag {
		color: #8ec07c;
	}

	/* Gruvbox Gray */
	.hljs-comment {
		color: #928374;
	}

	/* Gruvbox Purple */
	.hljs-link_label,
	.hljs-literal,
	.hljs-number {
		color: #d3869b;
	}

	.hljs-comment,
	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-section,
	.hljs-strong,
	.hljs-tag {
		font-weight: bold;
	}
}

.gruvbox-light {
	/*

Gruvbox style (light) (c) Pavel Pertsev (original style at https://github.com/morhetz/gruvbox)

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #fbf1c7;
	}

	.hljs,
	.hljs-subst {
		color: #3c3836;
	}

	/* Gruvbox Red */
	.hljs-deletion,
	.hljs-formula,
	.hljs-keyword,
	.hljs-link,
	.hljs-selector-tag {
		color: #9d0006;
	}

	/* Gruvbox Blue */
	.hljs-built_in,
	.hljs-emphasis,
	.hljs-name,
	.hljs-quote,
	.hljs-strong,
	.hljs-title,
	.hljs-variable {
		color: #076678;
	}

	/* Gruvbox Yellow */
	.hljs-attr,
	.hljs-params,
	.hljs-template-tag,
	.hljs-type {
		color: #b57614;
	}

	/* Gruvbox Purple */
	.hljs-builtin-name,
	.hljs-doctag,
	.hljs-literal,
	.hljs-number {
		color: #8f3f71;
	}

	/* Gruvbox Orange */
	.hljs-code,
	.hljs-meta,
	.hljs-regexp,
	.hljs-selector-id,
	.hljs-template-variable {
		color: #af3a03;
	}

	/* Gruvbox Green */
	.hljs-addition,
	.hljs-meta-string,
	.hljs-section,
	.hljs-selector-attr,
	.hljs-selector-class,
	.hljs-string,
	.hljs-symbol {
		color: #79740e;
	}

	/* Gruvbox Aqua */
	.hljs-attribute,
	.hljs-bullet,
	.hljs-class,
	.hljs-function,
	.hljs-function .hljs-keyword,
	.hljs-meta-keyword,
	.hljs-selector-pseudo,
	.hljs-tag {
		color: #427b58;
	}

	/* Gruvbox Gray */
	.hljs-comment {
		color: #928374;
	}

	/* Gruvbox Purple */
	.hljs-link_label,
	.hljs-literal,
	.hljs-number {
		color: #8f3f71;
	}

	.hljs-comment,
	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-section,
	.hljs-strong,
	.hljs-tag {
		font-weight: bold;
	}
}

.hopscotch {
	/*
 * Hopscotch
 * by Jan T. Sott
 * https://github.com/idleberg/Hopscotch
 *
 * This work is licensed under the Creative Commons CC0 1.0 Universal License
 */

	/* Comment */
	.hljs-comment,
	.hljs-quote {
		color: #989498;
	}

	/* Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-link,
	.hljs-deletion {
		color: #dd464c;
	}

	/* Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params {
		color: #fd8b19;
	}

	/* Yellow */
	.hljs-class .hljs-title {
		color: #fdcc59;
	}

	/* Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #8fc13e;
	}

	/* Aqua */
	.hljs-meta {
		color: #149b93;
	}

	/* Blue */
	.hljs-function,
	.hljs-section,
	.hljs-title {
		color: #1290bf;
	}

	/* Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #c85e7c;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #322931;
		color: #b9b5b8;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.hybrid {
	/*

vim-hybrid theme by w0ng (https://github.com/w0ng/vim-hybrid)

*/

	/*background color*/
	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #1d1f21;
	}

	/*selection color*/
	.hljs::selection,
	.hljs span::selection {
		background: #373b41;
	}

	.hljs::-moz-selection,
	.hljs span::-moz-selection {
		background: #373b41;
	}

	/*foreground color*/
	.hljs {
		color: #c5c8c6;
	}

	/*color: fg_yellow*/
	.hljs-title,
	.hljs-name {
		color: #f0c674;
	}

	/*color: fg_comment*/
	.hljs-comment,
	.hljs-meta,
	.hljs-meta .hljs-keyword {
		color: #707880;
	}

	/*color: fg_red*/
	.hljs-number,
	.hljs-symbol,
	.hljs-literal,
	.hljs-deletion,
	.hljs-link {
		color: #cc6666;
	}

	/*color: fg_green*/
	.hljs-string,
	.hljs-doctag,
	.hljs-addition,
	.hljs-regexp,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #b5bd68;
	}

	/*color: fg_purple*/
	.hljs-attribute,
	.hljs-code,
	.hljs-selector-id {
		color: #b294bb;
	}

	/*color: fg_blue*/
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-bullet,
	.hljs-tag {
		color: #81a2be;
	}

	/*color: fg_aqua*/
	.hljs-subst,
	.hljs-variable,
	.hljs-template-tag,
	.hljs-template-variable {
		color: #8abeb7;
	}

	/*color: fg_orange*/
	.hljs-type,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-quote,
	.hljs-section,
	.hljs-selector-class {
		color: #de935f;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.idea {
	/*

Intellij Idea-like styling (c) Vasily Polovnyov <vast@whiteants.net>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #000;
		background: #fff;
	}

	.hljs-subst,
	.hljs-title {
		font-weight: normal;
		color: #000;
	}

	.hljs-comment,
	.hljs-quote {
		color: #808080;
		font-style: italic;
	}

	.hljs-meta {
		color: #808000;
	}

	.hljs-tag {
		background: #efefef;
	}

	.hljs-section,
	.hljs-name,
	.hljs-literal,
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-type,
	.hljs-selector-id,
	.hljs-selector-class {
		font-weight: bold;
		color: #000080;
	}

	.hljs-attribute,
	.hljs-number,
	.hljs-regexp,
	.hljs-link {
		font-weight: bold;
		color: #0000ff;
	}

	.hljs-number,
	.hljs-regexp,
	.hljs-link {
		font-weight: normal;
	}

	.hljs-string {
		color: #008000;
		font-weight: bold;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-formula {
		color: #000;
		background: #d0eded;
		font-style: italic;
	}

	.hljs-doctag {
		text-decoration: underline;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #660e7a;
	}

	.hljs-addition {
		background: #baeeba;
	}

	.hljs-deletion {
		background: #ffc8bd;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.ir-black {
	/*
  IR_Black style (c) Vasily Mikhailitchenko <vaskas@programica.ru>
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #000;
		color: #f8f8f8;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-meta {
		color: #7c7c7c;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-tag,
	.hljs-name {
		color: #96cbfe;
	}

	.hljs-attribute,
	.hljs-selector-id {
		color: #ffffb6;
	}

	.hljs-string,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-addition {
		color: #a8ff60;
	}

	.hljs-subst {
		color: #daefa3;
	}

	.hljs-regexp,
	.hljs-link {
		color: #e9c062;
	}

	.hljs-title,
	.hljs-section,
	.hljs-type,
	.hljs-doctag {
		color: #ffffb6;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-literal {
		color: #c6c5fe;
	}

	.hljs-number,
	.hljs-deletion {
		color: #ff73fd;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.isbl-editor-dark {
	/*

ISBL Editor style dark color scheme (c) Dmitriy Tarasov <dimatar@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #404040;
		color: #f0f0f0;
	}

	/* Base color: saturation 0; */

	.hljs,
	.hljs-subst {
		color: #f0f0f0;
	}

	.hljs-comment {
		color: #b5b5b5;
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-attribute,
	.hljs-selector-tag,
	.hljs-meta-keyword,
	.hljs-doctag,
	.hljs-name {
		color: #f0f0f0;
		font-weight: bold;
	}

	/* User color: hue: 0 */

	.hljs-string {
		color: #97bf0d;
	}

	.hljs-type,
	.hljs-number,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-quote,
	.hljs-template-tag,
	.hljs-deletion {
		color: #f0f0f0;
	}

	.hljs-title,
	.hljs-section {
		color: #df471e;
	}

	.hljs-title > .hljs-built_in {
		color: #81bce9;
		font-weight: normal;
	}

	.hljs-regexp,
	.hljs-symbol,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #e2c696;
	}

	/* Language color: hue: 90; */

	.hljs-built_in,
	.hljs-literal {
		color: #97bf0d;
		font-weight: bold;
	}

	.hljs-bullet,
	.hljs-code,
	.hljs-addition {
		color: #397300;
	}

	.hljs-class {
		color: #ce9d4d;
		font-weight: bold;
	}

	/* Meta color: hue: 200 */

	.hljs-meta {
		color: #1f7199;
	}

	.hljs-meta-string {
		color: #4d99bf;
	}

	/* Misc effects */

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.isbl-editor-light {
	/*

ISBL Editor style light color schemec (c) Dmitriy Tarasov <dimatar@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: white;
		color: black;
	}

	/* Base color: saturation 0; */

	.hljs-subst {
		color: black;
	}

	.hljs-comment {
		color: #555555;
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-attribute,
	.hljs-selector-tag,
	.hljs-meta-keyword,
	.hljs-doctag,
	.hljs-name {
		color: #000000;
		font-weight: bold;
	}

	/* User color: hue: 0 */

	.hljs-string {
		color: #000080;
	}

	.hljs-type,
	.hljs-number,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-quote,
	.hljs-template-tag,
	.hljs-deletion {
		color: #000000;
	}

	.hljs-title,
	.hljs-section {
		color: #fb2c00;
	}

	.hljs-title > .hljs-built_in {
		color: #008080;
		font-weight: normal;
	}

	.hljs-regexp,
	.hljs-symbol,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #5e1700;
	}

	/* Language color: hue: 90; */

	.hljs-built_in,
	.hljs-literal {
		color: #000080;
		font-weight: bold;
	}

	.hljs-bullet,
	.hljs-code,
	.hljs-addition {
		color: #397300;
	}

	.hljs-class {
		color: #6f1c00;
		font-weight: bold;
	}

	/* Meta color: hue: 200 */

	.hljs-meta {
		color: #1f7199;
	}

	.hljs-meta-string {
		color: #4d99bf;
	}

	/* Misc effects */

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.kimbie.dark {
	/*
    Name:     Kimbie (dark)
    Author:   Jan T. Sott
    License:  Creative Commons Attribution-ShareAlike 4.0 Unported License
    URL:      https://github.com/idleberg/Kimbie-highlight.js
*/

	/* Kimbie Comment */
	.hljs-comment,
	.hljs-quote {
		color: #d6baad;
	}

	/* Kimbie Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-meta {
		color: #dc3958;
	}

	/* Kimbie Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-deletion,
	.hljs-link {
		color: #f79a32;
	}

	/* Kimbie Yellow */
	.hljs-title,
	.hljs-section,
	.hljs-attribute {
		color: #f06431;
	}

	/* Kimbie Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #889b4a;
	}

	/* Kimbie Purple */
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-function {
		color: #98676a;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #221a0f;
		color: #d3af86;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.kimbie.light {
	/*
    Name:     Kimbie (light)
    Author:   Jan T. Sott
    License:  Creative Commons Attribution-ShareAlike 4.0 Unported License
    URL:      https://github.com/idleberg/Kimbie-highlight.js
*/

	/* Kimbie Comment */
	.hljs-comment,
	.hljs-quote {
		color: #a57a4c;
	}

	/* Kimbie Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-meta {
		color: #dc3958;
	}

	/* Kimbie Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-deletion,
	.hljs-link {
		color: #f79a32;
	}

	/* Kimbie Yellow */
	.hljs-title,
	.hljs-section,
	.hljs-attribute {
		color: #f06431;
	}

	/* Kimbie Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #889b4a;
	}

	/* Kimbie Purple */
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-function {
		color: #98676a;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #fbebd4;
		color: #84613d;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.lightfair {
	/*

Lightfair style (c) Tristian Kelly <tristian.kelly560@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #fff;
	}

	.hljs-name {
		color: #01a3a3;
	}

	.hljs-tag,
	.hljs-meta {
		color: #778899;
	}

	.hljs,
	.hljs-subst {
		color: #444;
	}

	.hljs-comment {
		color: #888888;
	}

	.hljs-keyword,
	.hljs-attribute,
	.hljs-selector-tag,
	.hljs-meta-keyword,
	.hljs-doctag,
	.hljs-name {
		font-weight: bold;
	}

	.hljs-type,
	.hljs-string,
	.hljs-number,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-quote,
	.hljs-template-tag,
	.hljs-deletion {
		color: #4286f4;
	}

	.hljs-title,
	.hljs-section {
		color: #4286f4;
		font-weight: bold;
	}

	.hljs-regexp,
	.hljs-symbol,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #bc6060;
	}

	.hljs-literal {
		color: #62bcbc;
	}

	.hljs-built_in,
	.hljs-bullet,
	.hljs-code,
	.hljs-addition {
		color: #25c6c6;
	}

	.hljs-meta-string {
		color: #4d99bf;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.lioshi {
	/* lioshi Theme */
	/* Original theme - https://github.com/lioshi/vscode-lioshi-theme */

	/* Comment */
	.hljs-comment {
		color: #8d8d8d;
	}

	/* quote */
	.hljs-quote {
		color: #b3c7d8;
	}

	/* Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #cc6666;
	}

	/* Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-subst .hljs-link {
		color: #de935f;
	}

	/* Yellow */
	.hljs-attribute {
		color: #f0c674;
	}

	/* Green */
	.hljs-string,
	.hljs-bullet,
	.hljs-params,
	.hljs-addition {
		color: #b5bd68;
	}

	/* Blue */
	.hljs-title,
	.hljs-meta,
	.hljs-section {
		color: #81a2be;
	}

	/* Purple */
	.hljs-selector-tag,
	.hljs-keyword,
	.hljs-function,
	.hljs-class {
		color: #be94bb;
	}

	/* Purple light */
	.hljs-symbol {
		color: #dbc4d9;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #303030;
		color: #c5c8c6;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.magula {
	/*
Description: Magula style for highligh.js
Author: Ruslan Keba <rukeba@gmail.com>
Website: http://rukeba.com/
Version: 1.0
Date: 2009-01-03
Music: Aphex Twin / Xtal
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background-color: #f4f4f4;
		color: black;
	}

	.hljs-subst {
		color: black;
	}

	.hljs-string,
	.hljs-title,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-attribute,
	.hljs-addition,
	.hljs-variable,
	.hljs-template-tag,
	.hljs-template-variable {
		color: #050;
	}

	.hljs-comment,
	.hljs-quote {
		color: #777;
	}

	.hljs-number,
	.hljs-regexp,
	.hljs-literal,
	.hljs-type,
	.hljs-link {
		color: #800;
	}

	.hljs-deletion,
	.hljs-meta {
		color: #00e;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-doctag,
	.hljs-title,
	.hljs-section,
	.hljs-built_in,
	.hljs-tag,
	.hljs-name {
		font-weight: bold;
		color: navy;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.mono-blue {
	/*
  Five-color theme from a single blue hue.
*/
	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #eaeef3;
		color: #00193a;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-title,
	.hljs-section,
	.hljs-doctag,
	.hljs-name,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-comment {
		color: #738191;
	}

	.hljs-string,
	.hljs-title,
	.hljs-section,
	.hljs-built_in,
	.hljs-literal,
	.hljs-type,
	.hljs-addition,
	.hljs-tag,
	.hljs-quote,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #0048ab;
	}

	.hljs-meta,
	.hljs-subst,
	.hljs-symbol,
	.hljs-regexp,
	.hljs-attribute,
	.hljs-deletion,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-bullet {
		color: #4c81c9;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.monokai-sublime {
	/*

Monokai Sublime style. Derived from Monokai by noformnocontent http://nn.mit-license.org/

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #23241f;
	}

	.hljs,
	.hljs-tag,
	.hljs-subst {
		color: #f8f8f2;
	}

	.hljs-strong,
	.hljs-emphasis {
		color: #a8a8a2;
	}

	.hljs-bullet,
	.hljs-quote,
	.hljs-number,
	.hljs-regexp,
	.hljs-literal,
	.hljs-link {
		color: #ae81ff;
	}

	.hljs-code,
	.hljs-title,
	.hljs-section,
	.hljs-selector-class {
		color: #a6e22e;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-name,
	.hljs-attr {
		color: #f92672;
	}

	.hljs-symbol,
	.hljs-attribute {
		color: #66d9ef;
	}

	.hljs-params,
	.hljs-class .hljs-title {
		color: #f8f8f2;
	}

	.hljs-string,
	.hljs-type,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-selector-id,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-addition,
	.hljs-variable,
	.hljs-template-variable {
		color: #e6db74;
	}

	.hljs-comment,
	.hljs-deletion,
	.hljs-meta {
		color: #75715e;
	}
}

.monokai {
	/*
Monokai style - ported by Luigi Maselli - http://grigio.org
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #272822;
		color: #ddd;
	}

	.hljs-tag,
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-strong,
	.hljs-name {
		color: #f92672;
	}

	.hljs-code {
		color: #66d9ef;
	}

	.hljs-class .hljs-title {
		color: white;
	}

	.hljs-attribute,
	.hljs-symbol,
	.hljs-regexp,
	.hljs-link {
		color: #bf79db;
	}

	.hljs-string,
	.hljs-bullet,
	.hljs-subst,
	.hljs-title,
	.hljs-section,
	.hljs-emphasis,
	.hljs-type,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-addition,
	.hljs-variable,
	.hljs-template-tag,
	.hljs-template-variable {
		color: #a6e22e;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-deletion,
	.hljs-meta {
		color: #75715e;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-doctag,
	.hljs-title,
	.hljs-section,
	.hljs-type,
	.hljs-selector-id {
		font-weight: bold;
	}
}

.night-owl {
	/*

Night Owl for highlight.js (c) Carl Baxter <carl@cbax.tech>

An adaptation of Sarah Drasner's Night Owl VS Code Theme 
https://github.com/sdras/night-owl-vscode-theme 

Copyright (c) 2018 Sarah Drasner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #011627;
		color: #d6deeb;
	}

	/* General Purpose */
	.hljs-keyword {
		color: #c792ea;
		font-style: italic;
	}

	.hljs-built_in {
		color: #addb67;
		font-style: italic;
	}

	.hljs-type {
		color: #82aaff;
	}

	.hljs-literal {
		color: #ff5874;
	}

	.hljs-number {
		color: #f78c6c;
	}

	.hljs-regexp {
		color: #5ca7e4;
	}

	.hljs-string {
		color: #ecc48d;
	}

	.hljs-subst {
		color: #d3423e;
	}

	.hljs-symbol {
		color: #82aaff;
	}

	.hljs-class {
		color: #ffcb8b;
	}

	.hljs-function {
		color: #82aaff;
	}

	.hljs-title {
		color: #dcdcaa;
		font-style: italic;
	}

	.hljs-params {
		color: #7fdbca;
	}

	/* Meta */
	.hljs-comment {
		color: #637777;
		font-style: italic;
	}

	.hljs-doctag {
		color: #7fdbca;
	}

	.hljs-meta {
		color: #82aaff;
	}

	.hljs-meta-keyword {
		color: #82aaff;
	}

	.hljs-meta-string {
		color: #ecc48d;
	}

	/* Tags, attributes, config */
	.hljs-section {
		color: #82b1ff;
	}

	.hljs-tag,
	.hljs-name,
	.hljs-builtin-name {
		color: #7fdbca;
	}

	.hljs-attr {
		color: #7fdbca;
	}

	.hljs-attribute {
		color: #80cbc4;
	}

	.hljs-variable {
		color: #addb67;
	}

	/* Markup */
	.hljs-bullet {
		color: #d9f5dd;
	}

	.hljs-code {
		color: #80cbc4;
	}

	.hljs-emphasis {
		color: #c792ea;
		font-style: italic;
	}

	.hljs-strong {
		color: #addb67;
		font-weight: bold;
	}

	.hljs-formula {
		color: #c792ea;
	}

	.hljs-link {
		color: #ff869a;
	}

	.hljs-quote {
		color: #697098;
		font-style: italic;
	}

	/* CSS */
	.hljs-selector-tag {
		color: #ff6363;
	}

	.hljs-selector-id {
		color: #fad430;
	}

	.hljs-selector-class {
		color: #addb67;
		font-style: italic;
	}

	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #c792ea;
		font-style: italic;
	}

	/* Templates */
	.hljs-template-tag {
		color: #c792ea;
	}

	.hljs-template-variable {
		color: #addb67;
	}

	/* diff */
	.hljs-addition {
		color: #addb67ff;
		font-style: italic;
	}

	.hljs-deletion {
		color: #ef535090;
		font-style: italic;
	}
}

.nnfx-dark {
	/**
 * nnfx dark - a theme inspired by Netscape Navigator/Firefox
 *
 * @version 1.0.0
 * @author (c) 2020 Jim Mason <jmason@ibinx.com>
 * @license https://creativecommons.org/licenses/by-sa/4.0  CC BY-SA 4.0
 */

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #333;
		color: #fff;
	}

	.xml .hljs-meta {
		font-weight: bold;
		font-style: italic;
		color: #69f;
	}

	.hljs-comment,
	.hljs-quote {
		font-style: italic;
		color: #9c6;
	}

	.hljs-name,
	.hljs-keyword {
		color: #a7a;
	}

	.hljs-name,
	.hljs-attr {
		font-weight: bold;
	}

	.hljs-string {
		font-weight: normal;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #588;
	}

	.hljs-code,
	.hljs-string,
	.hljs-meta-string,
	.hljs-number,
	.hljs-regexp,
	.hljs-link {
		color: #bce;
	}

	.hljs-title,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-built_in,
	.hljs-builtin-name {
		color: #d40;
	}

	.hljs-section,
	.hljs-meta {
		color: #a85;
	}

	.hljs-class .hljs-title,
	.hljs-type {
		color: #96c;
	}

	.hljs-function .hljs-title,
	.hljs-attr,
	.hljs-subst {
		color: #fff;
	}

	.hljs-formula {
		background-color: #eee;
		font-style: italic;
	}

	.hljs-addition {
		background-color: #797;
	}

	.hljs-deletion {
		background-color: #c99;
	}

	.hljs-selector-id,
	.hljs-selector-class {
		color: #964;
	}

	.hljs-doctag,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.nnfx {
	/**
 * nnfx - a theme inspired by Netscape Navigator/Firefox
 *
 * @version 1.0.0
 * @author (c) 2020 Jim Mason <jmason@ibinx.com>
 * @license https://creativecommons.org/licenses/by-sa/4.0  CC BY-SA 4.0
 */

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #fff;
		color: #000;
	}

	.xml .hljs-meta {
		font-weight: bold;
		font-style: italic;
		color: #48b;
	}

	.hljs-comment,
	.hljs-quote {
		font-style: italic;
		color: #070;
	}

	.hljs-name,
	.hljs-keyword {
		color: #808;
	}

	.hljs-name,
	.hljs-attr {
		font-weight: bold;
	}

	.hljs-string {
		font-weight: normal;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #477;
	}

	.hljs-code,
	.hljs-string,
	.hljs-meta-string,
	.hljs-number,
	.hljs-regexp,
	.hljs-link {
		color: #00f;
	}

	.hljs-title,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-built_in,
	.hljs-builtin-name {
		color: #f40;
	}

	.hljs-section,
	.hljs-meta {
		color: #642;
	}

	.hljs-class .hljs-title,
	.hljs-type {
		color: #639;
	}

	.hljs-function .hljs-title,
	.hljs-attr,
	.hljs-subst {
		color: #000;
	}

	.hljs-formula {
		background-color: #eee;
		font-style: italic;
	}

	.hljs-addition {
		background-color: #beb;
	}

	.hljs-deletion {
		background-color: #fbb;
	}

	.hljs-selector-id,
	.hljs-selector-class {
		color: #964;
	}

	.hljs-doctag,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.nord {
	/*
 * Copyright (c) 2017-present Arctic Ice Studio <development@arcticicestudio.com>
 * Copyright (c) 2017-present Sven Greb <development@svengreb.de>
 *
 * Project:    Nord highlight.js
 * Version:    0.1.0
 * Repository: https://github.com/arcticicestudio/nord-highlightjs
 * License:    MIT
 * References:
 *   https://github.com/arcticicestudio/nord
 */

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #2e3440;
	}

	.hljs,
	.hljs-subst {
		color: #d8dee9;
	}

	.hljs-selector-tag {
		color: #81a1c1;
	}

	.hljs-selector-id {
		color: #8fbcbb;
		font-weight: bold;
	}

	.hljs-selector-class {
		color: #8fbcbb;
	}

	.hljs-selector-attr {
		color: #8fbcbb;
	}

	.hljs-selector-pseudo {
		color: #88c0d0;
	}

	.hljs-addition {
		background-color: rgba(163, 190, 140, 0.5);
	}

	.hljs-deletion {
		background-color: rgba(191, 97, 106, 0.5);
	}

	.hljs-built_in,
	.hljs-type {
		color: #8fbcbb;
	}

	.hljs-class {
		color: #8fbcbb;
	}

	.hljs-function {
		color: #88c0d0;
	}

	.hljs-function > .hljs-title {
		color: #88c0d0;
	}

	.hljs-keyword,
	.hljs-literal,
	.hljs-symbol {
		color: #81a1c1;
	}

	.hljs-number {
		color: #b48ead;
	}

	.hljs-regexp {
		color: #ebcb8b;
	}

	.hljs-string {
		color: #a3be8c;
	}

	.hljs-title {
		color: #8fbcbb;
	}

	.hljs-params {
		color: #d8dee9;
	}

	.hljs-bullet {
		color: #81a1c1;
	}

	.hljs-code {
		color: #8fbcbb;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-formula {
		color: #8fbcbb;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-link:hover {
		text-decoration: underline;
	}

	.hljs-quote {
		color: #4c566a;
	}

	.hljs-comment {
		color: #4c566a;
	}

	.hljs-doctag {
		color: #8fbcbb;
	}

	.hljs-meta,
	.hljs-meta-keyword {
		color: #5e81ac;
	}

	.hljs-meta-string {
		color: #a3be8c;
	}

	.hljs-attr {
		color: #8fbcbb;
	}

	.hljs-attribute {
		color: #d8dee9;
	}

	.hljs-builtin-name {
		color: #81a1c1;
	}

	.hljs-name {
		color: #81a1c1;
	}

	.hljs-section {
		color: #88c0d0;
	}

	.hljs-tag {
		color: #81a1c1;
	}

	.hljs-variable {
		color: #d8dee9;
	}

	.hljs-template-variable {
		color: #d8dee9;
	}

	.hljs-template-tag {
		color: #5e81ac;
	}

	.abnf .hljs-attribute {
		color: #88c0d0;
	}

	.abnf .hljs-symbol {
		color: #ebcb8b;
	}

	.apache .hljs-attribute {
		color: #88c0d0;
	}

	.apache .hljs-section {
		color: #81a1c1;
	}

	.arduino .hljs-built_in {
		color: #88c0d0;
	}

	.aspectj .hljs-meta {
		color: #d08770;
	}

	.aspectj > .hljs-title {
		color: #88c0d0;
	}

	.bnf .hljs-attribute {
		color: #8fbcbb;
	}

	.clojure .hljs-name {
		color: #88c0d0;
	}

	.clojure .hljs-symbol {
		color: #ebcb8b;
	}

	.coq .hljs-built_in {
		color: #88c0d0;
	}

	.cpp .hljs-meta-string {
		color: #8fbcbb;
	}

	.css .hljs-built_in {
		color: #88c0d0;
	}

	.css .hljs-keyword {
		color: #d08770;
	}

	.diff .hljs-meta {
		color: #8fbcbb;
	}

	.ebnf .hljs-attribute {
		color: #8fbcbb;
	}

	.glsl .hljs-built_in {
		color: #88c0d0;
	}

	.groovy .hljs-meta:not(:first-child) {
		color: #d08770;
	}

	.haxe .hljs-meta {
		color: #d08770;
	}

	.java .hljs-meta {
		color: #d08770;
	}

	.ldif .hljs-attribute {
		color: #8fbcbb;
	}

	.lisp .hljs-name {
		color: #88c0d0;
	}

	.lua .hljs-built_in {
		color: #88c0d0;
	}

	.moonscript .hljs-built_in {
		color: #88c0d0;
	}

	.nginx .hljs-attribute {
		color: #88c0d0;
	}

	.nginx .hljs-section {
		color: #5e81ac;
	}

	.pf .hljs-built_in {
		color: #88c0d0;
	}

	.processing .hljs-built_in {
		color: #88c0d0;
	}

	.scss .hljs-keyword {
		color: #81a1c1;
	}

	.stylus .hljs-keyword {
		color: #81a1c1;
	}

	.swift .hljs-meta {
		color: #d08770;
	}

	.vim .hljs-built_in {
		color: #88c0d0;
		font-style: italic;
	}

	.yaml .hljs-meta {
		color: #d08770;
	}
}

.obsidian {
	/**
 * Obsidian style
 * ported by Alexander Marenin (http://github.com/ioncreature)
 */

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #282b2e;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-selector-id {
		color: #93c763;
	}

	.hljs-number {
		color: #ffcd22;
	}

	.hljs {
		color: #e0e2e4;
	}

	.hljs-attribute {
		color: #668bb0;
	}

	.hljs-code,
	.hljs-class .hljs-title,
	.hljs-section {
		color: white;
	}

	.hljs-regexp,
	.hljs-link {
		color: #d39745;
	}

	.hljs-meta {
		color: #557182;
	}

	.hljs-tag,
	.hljs-name,
	.hljs-bullet,
	.hljs-subst,
	.hljs-emphasis,
	.hljs-type,
	.hljs-built_in,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-addition,
	.hljs-variable,
	.hljs-template-tag,
	.hljs-template-variable {
		color: #8cbbad;
	}

	.hljs-string,
	.hljs-symbol {
		color: #ec7600;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-deletion {
		color: #818e96;
	}

	.hljs-selector-class {
		color: #a082bd;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-doctag,
	.hljs-title,
	.hljs-section,
	.hljs-type,
	.hljs-name,
	.hljs-strong {
		font-weight: bold;
	}
}

.ocean {
	/* Ocean Dark Theme */
	/* https://github.com/gavsiu */
	/* Original theme - https://github.com/chriskempson/base16 */

	/* Ocean Comment */
	.hljs-comment,
	.hljs-quote {
		color: #65737e;
	}

	/* Ocean Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #bf616a;
	}

	/* Ocean Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #d08770;
	}

	/* Ocean Yellow */
	.hljs-attribute {
		color: #ebcb8b;
	}

	/* Ocean Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #a3be8c;
	}

	/* Ocean Blue */
	.hljs-title,
	.hljs-section {
		color: #8fa1b3;
	}

	/* Ocean Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #b48ead;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #2b303b;
		color: #c0c5ce;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.paraiso-dark {
	/*
    Paraíso (dark)
    Created by Jan T. Sott (http://github.com/idleberg)
    Inspired by the art of Rubens LP (http://www.rubenslp.com.br)
*/

	/* Paraíso Comment */
	.hljs-comment,
	.hljs-quote {
		color: #8d8687;
	}

	/* Paraíso Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-link,
	.hljs-meta {
		color: #ef6155;
	}

	/* Paraíso Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-deletion {
		color: #f99b15;
	}

	/* Paraíso Yellow */
	.hljs-title,
	.hljs-section,
	.hljs-attribute {
		color: #fec418;
	}

	/* Paraíso Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #48b685;
	}

	/* Paraíso Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #815ba4;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #2f1e2e;
		color: #a39e9b;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.paraiso-light {
	/*
    Paraíso (light)
    Created by Jan T. Sott (http://github.com/idleberg)
    Inspired by the art of Rubens LP (http://www.rubenslp.com.br)
*/

	/* Paraíso Comment */
	.hljs-comment,
	.hljs-quote {
		color: #776e71;
	}

	/* Paraíso Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-link,
	.hljs-meta {
		color: #ef6155;
	}

	/* Paraíso Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-deletion {
		color: #f99b15;
	}

	/* Paraíso Yellow */
	.hljs-title,
	.hljs-section,
	.hljs-attribute {
		color: #fec418;
	}

	/* Paraíso Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #48b685;
	}

	/* Paraíso Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #815ba4;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #e7e9db;
		color: #4f424c;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.pojoaque {
	/*

Pojoaque Style by Jason Tate
http://web-cms-designs.com/ftopict-10-pojoaque-style-for-highlight-js-code-highlighter.html
Based on Solarized Style from http://ethanschoonover.com/solarized

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #dccf8f;
		background: url(/common/assets/highlightstyles/pojoaque.jpg) repeat scroll left top #181914;
	}

	.hljs-comment,
	.hljs-quote {
		color: #586e75;
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-addition {
		color: #b64926;
	}

	.hljs-number,
	.hljs-string,
	.hljs-doctag,
	.hljs-regexp {
		color: #468966;
	}

	.hljs-title,
	.hljs-section,
	.hljs-built_in,
	.hljs-name {
		color: #ffb03b;
	}

	.hljs-variable,
	.hljs-template-variable,
	.hljs-class .hljs-title,
	.hljs-type,
	.hljs-tag {
		color: #b58900;
	}

	.hljs-attribute {
		color: #b89859;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-link,
	.hljs-subst,
	.hljs-meta {
		color: #cb4b16;
	}

	.hljs-deletion {
		color: #dc322f;
	}

	.hljs-selector-id,
	.hljs-selector-class {
		color: #d3a60c;
	}

	.hljs-formula {
		background: #073642;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.purebasic {
	/*

PureBASIC native IDE style ( version 1.0 - April 2016 )

by Tristano Ajmone <tajmone@gmail.com>

Public Domain

NOTE_1:	PureBASIC code syntax highlighting only applies the following classes:
			.hljs-comment
			.hljs-function
			.hljs-keywords
			.hljs-string
			.hljs-symbol

		Other classes are added here for the benefit of styling other languages with the look and feel of PureBASIC native IDE style.
		If you need to customize a stylesheet for PureBASIC only, remove all non-relevant classes -- PureBASIC-related classes are followed by
		a "--- used for PureBASIC ... ---" comment on same line.

NOTE_2:	Color names provided in comments were derived using "Name that Color" online tool:
			http://chir.ag/projects/name-that-color
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #ffffdf;
		/* Half and Half (approx.) */
		/* --- Uncomment to add PureBASIC native IDE styled font!
	font-family: Consolas;
*/
	}

	.hljs,
	/* --- used for PureBASIC base color --- */
	.hljs-type,
	/* --- used for PureBASIC Procedures return type --- */
	.hljs-function,
	/* --- used for wrapping PureBASIC Procedures definitions --- */
	.hljs-name,
	.hljs-number,
	.hljs-attr,
	.hljs-params,
	.hljs-subst {
		color: #000000;
		/* Black */
	}

	.hljs-comment,
	/* --- used for PureBASIC Comments --- */
	.hljs-regexp,
	.hljs-section,
	.hljs-selector-pseudo,
	.hljs-addition {
		color: #00aaaa;
		/* Persian Green (approx.) */
	}

	.hljs-title,
	/* --- used for PureBASIC Procedures Names --- */
	.hljs-tag,
	.hljs-variable,
	.hljs-code {
		color: #006666;
		/* Blue Stone (approx.) */
	}

	.hljs-keyword,
	/* --- used for PureBASIC Keywords --- */
	.hljs-class,
	.hljs-meta-keyword,
	.hljs-selector-class,
	.hljs-built_in,
	.hljs-builtin-name {
		color: #006666;
		/* Blue Stone (approx.) */
		font-weight: bold;
	}

	.hljs-string,
	/* --- used for PureBASIC Strings --- */
	.hljs-selector-attr {
		color: #0080ff;
		/* Azure Radiance (approx.) */
	}

	.hljs-symbol,
	/* --- used for PureBASIC Constants --- */
	.hljs-link,
	.hljs-deletion,
	.hljs-attribute {
		color: #924b72;
		/* Cannon Pink (approx.) */
	}

	.hljs-meta,
	.hljs-literal,
	.hljs-selector-id {
		color: #924b72;
		/* Cannon Pink (approx.) */
		font-weight: bold;
	}

	.hljs-strong,
	.hljs-name {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.qtcreator_dark {
	/*

Qt Creator dark color scheme

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #000000;
	}

	.hljs,
	.hljs-subst,
	.hljs-tag,
	.hljs-title {
		color: #aaaaaa;
	}

	.hljs-strong,
	.hljs-emphasis {
		color: #a8a8a2;
	}

	.hljs-bullet,
	.hljs-quote,
	.hljs-number,
	.hljs-regexp,
	.hljs-literal {
		color: #ff55ff;
	}

	.hljs-code .hljs-selector-class {
		color: #aaaaff;
	}

	.hljs-emphasis,
	.hljs-stronge,
	.hljs-type {
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-function,
	.hljs-section,
	.hljs-symbol,
	.hljs-name {
		color: #ffff55;
	}

	.hljs-attribute {
		color: #ff5555;
	}

	.hljs-variable,
	.hljs-params,
	.hljs-class .hljs-title {
		color: #8888ff;
	}

	.hljs-string,
	.hljs-selector-id,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-type,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-template-tag,
	.hljs-template-variable,
	.hljs-addition,
	.hljs-link {
		color: #ff55ff;
	}

	.hljs-comment,
	.hljs-meta,
	.hljs-deletion {
		color: #55ffff;
	}
}

.qtcreator_light {
	/*

Qt Creator light color scheme

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #ffffff;
	}

	.hljs,
	.hljs-subst,
	.hljs-tag,
	.hljs-title {
		color: #000000;
	}

	.hljs-strong,
	.hljs-emphasis {
		color: #000000;
	}

	.hljs-bullet,
	.hljs-quote,
	.hljs-number,
	.hljs-regexp,
	.hljs-literal {
		color: #000080;
	}

	.hljs-code .hljs-selector-class {
		color: #800080;
	}

	.hljs-emphasis,
	.hljs-stronge,
	.hljs-type {
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-function,
	.hljs-section,
	.hljs-symbol,
	.hljs-name {
		color: #808000;
	}

	.hljs-attribute {
		color: #800000;
	}

	.hljs-variable,
	.hljs-params,
	.hljs-class .hljs-title {
		color: #0055af;
	}

	.hljs-string,
	.hljs-selector-id,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-type,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-template-tag,
	.hljs-template-variable,
	.hljs-addition,
	.hljs-link {
		color: #008000;
	}

	.hljs-comment,
	.hljs-meta,
	.hljs-deletion {
		color: #008000;
	}
}

.railscasts {
	/*

Railscasts-like style (c) Visoft, Inc. (Damien White)

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #232323;
		color: #e6e1dc;
	}

	.hljs-comment,
	.hljs-quote {
		color: #bc9458;
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag {
		color: #c26230;
	}

	.hljs-string,
	.hljs-number,
	.hljs-regexp,
	.hljs-variable,
	.hljs-template-variable {
		color: #a5c261;
	}

	.hljs-subst {
		color: #519f50;
	}

	.hljs-tag,
	.hljs-name {
		color: #e8bf6a;
	}

	.hljs-type {
		color: #da4939;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-attr,
	.hljs-link {
		color: #6d9cbe;
	}

	.hljs-params {
		color: #d0d0ff;
	}

	.hljs-attribute {
		color: #cda869;
	}

	.hljs-meta {
		color: #9b859d;
	}

	.hljs-title,
	.hljs-section {
		color: #ffc66d;
	}

	.hljs-addition {
		background-color: #144212;
		color: #e6e1dc;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #600;
		color: #e6e1dc;
		display: inline-block;
		width: 100%;
	}

	.hljs-selector-class {
		color: #9b703f;
	}

	.hljs-selector-id {
		color: #8b98ab;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-link {
		text-decoration: underline;
	}
}

.rainbow {
	/*

Style with support for rainbow parens

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #474949;
		color: #d1d9e1;
	}

	.hljs-comment,
	.hljs-quote {
		color: #969896;
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-type,
	.hljs-addition {
		color: #cc99cc;
	}

	.hljs-number,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #f99157;
	}

	.hljs-string,
	.hljs-doctag,
	.hljs-regexp {
		color: #8abeb7;
	}

	.hljs-title,
	.hljs-name,
	.hljs-section,
	.hljs-built_in {
		color: #b5bd68;
	}

	.hljs-variable,
	.hljs-template-variable,
	.hljs-selector-id,
	.hljs-class .hljs-title {
		color: #ffcc66;
	}

	.hljs-section,
	.hljs-name,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-subst,
	.hljs-meta,
	.hljs-link {
		color: #f99157;
	}

	.hljs-deletion {
		color: #dc322f;
	}

	.hljs-formula {
		background: #eee8d5;
	}

	.hljs-attr,
	.hljs-attribute {
		color: #81a2be;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.routeros {
	/*

 highlight.js style for Microtik RouterOS script

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #f0f0f0;
	}

	/* Base color: saturation 0; */

	.hljs,
	.hljs-subst {
		color: #444;
	}

	.hljs-comment {
		color: #888888;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-meta-keyword,
	.hljs-doctag,
	.hljs-name {
		font-weight: bold;
	}

	.hljs-attribute {
		color: #0e9a00;
	}

	.hljs-function {
		color: #99069a;
	}

	.hljs-builtin-name {
		color: #99069a;
	}

	/* User color: hue: 0 */

	.hljs-type,
	.hljs-string,
	.hljs-number,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-quote,
	.hljs-template-tag,
	.hljs-deletion {
		color: #880000;
	}

	.hljs-title,
	.hljs-section {
		color: #880000;
		font-weight: bold;
	}

	.hljs-regexp,
	.hljs-symbol,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #bc6060;
	}

	/* Language color: hue: 90; */

	.hljs-literal {
		color: #78a960;
	}

	.hljs-built_in,
	.hljs-bullet,
	.hljs-code,
	.hljs-addition {
		color: #0c9a9a;
	}

	/* Meta color: hue: 200 */

	.hljs-meta {
		color: #1f7199;
	}

	.hljs-meta-string {
		color: #4d99bf;
	}

	/* Misc effects */

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.school-book {
	/*

School Book style from goldblog.com.ua (c) Zaripov Yura <yur4ik7@ukr.net>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 15px 0.5em 0.5em 30px;
		font-size: 11px;
		line-height: 16px;
		background: #f6f6ae url(/common/assets/highlightstyles/school-book.png);
		border-top: solid 2px #d2e8b9;
		border-bottom: solid 1px #d2e8b9;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal {
		color: #005599;
		font-weight: bold;
	}

	.hljs,
	.hljs-subst {
		color: #3e5915;
	}

	.hljs-string,
	.hljs-title,
	.hljs-section,
	.hljs-type,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-attribute,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-addition,
	.hljs-variable,
	.hljs-template-tag,
	.hljs-template-variable,
	.hljs-link {
		color: #2c009f;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-deletion,
	.hljs-meta {
		color: #e60415;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-doctag,
	.hljs-title,
	.hljs-section,
	.hljs-type,
	.hljs-name,
	.hljs-selector-id,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.shades-of-purple {
	/**
 * Shades of Purple Theme — for Highlightjs.
 *
 * @author (c) Ahmad Awais <https://twitter.com/mrahmadawais/>
 * @link GitHub Repo → https://github.com/ahmadawais/Shades-of-Purple-HighlightJS
 * @version 1.5.0
 */

	.hljs {
		display: block;
		overflow-x: auto;
		/* Custom font is optional */
		/* font-family: 'Operator Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace';  */
		padding: 0.5em;
		background: #2d2b57;
		font-weight: normal;
	}

	.hljs-title {
		color: #fad000;
		font-weight: normal;
	}

	.hljs-name {
		color: #a1feff;
	}

	.hljs-tag {
		color: #ffffff;
	}

	.hljs-attr {
		color: #f8d000;
		font-style: italic;
	}

	.hljs-built_in,
	.hljs-selector-tag,
	.hljs-section {
		color: #fb9e00;
	}

	.hljs-keyword {
		color: #fb9e00;
	}

	.hljs,
	.hljs-subst {
		color: #e3dfff;
	}

	.hljs-string,
	.hljs-attribute,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition,
	.hljs-code,
	.hljs-regexp,
	.hljs-selector-class,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-template-tag,
	.hljs-quote,
	.hljs-deletion {
		color: #4cd213;
	}

	.hljs-meta,
	.hljs-meta-string {
		color: #fb9e00;
	}

	.hljs-comment {
		color: #ac65ff;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-name,
	.hljs-strong {
		font-weight: normal;
	}

	.hljs-literal,
	.hljs-number {
		color: #fa658d;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.solarized-dark {
	/*

Orginal Style from ethanschoonover.com/solarized (c) Jeremy Hull <sourdrums@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #002b36;
		color: #839496;
	}

	.hljs-comment,
	.hljs-quote {
		color: #586e75;
	}

	/* Solarized Green */
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-addition {
		color: #859900;
	}

	/* Solarized Cyan */
	.hljs-number,
	.hljs-string,
	.hljs-meta .hljs-meta-string,
	.hljs-literal,
	.hljs-doctag,
	.hljs-regexp {
		color: #2aa198;
	}

	/* Solarized Blue */
	.hljs-title,
	.hljs-section,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #268bd2;
	}

	/* Solarized Yellow */
	.hljs-attribute,
	.hljs-attr,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-class .hljs-title,
	.hljs-type {
		color: #b58900;
	}

	/* Solarized Orange */
	.hljs-symbol,
	.hljs-bullet,
	.hljs-subst,
	.hljs-meta,
	.hljs-meta .hljs-keyword,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-link {
		color: #cb4b16;
	}

	/* Solarized Red */
	.hljs-built_in,
	.hljs-deletion {
		color: #dc322f;
	}

	.hljs-formula {
		background: #073642;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.solarized-light {
	/*

Orginal Style from ethanschoonover.com/solarized (c) Jeremy Hull <sourdrums@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #fdf6e3;
		color: #657b83;
	}

	.hljs-comment,
	.hljs-quote {
		color: #93a1a1;
	}

	/* Solarized Green */
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-addition {
		color: #859900;
	}

	/* Solarized Cyan */
	.hljs-number,
	.hljs-string,
	.hljs-meta .hljs-meta-string,
	.hljs-literal,
	.hljs-doctag,
	.hljs-regexp {
		color: #2aa198;
	}

	/* Solarized Blue */
	.hljs-title,
	.hljs-section,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class {
		color: #268bd2;
	}

	/* Solarized Yellow */
	.hljs-attribute,
	.hljs-attr,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-class .hljs-title,
	.hljs-type {
		color: #b58900;
	}

	/* Solarized Orange */
	.hljs-symbol,
	.hljs-bullet,
	.hljs-subst,
	.hljs-meta,
	.hljs-meta .hljs-keyword,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-link {
		color: #cb4b16;
	}

	/* Solarized Red */
	.hljs-built_in,
	.hljs-deletion {
		color: #dc322f;
	}

	.hljs-formula {
		background: #eee8d5;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.srcery {
	/*
Description: Srcery dark color scheme for highlight.js
Author: Chen Bin <chen.bin@gmail.com>
Website: https://srcery-colors.github.io/
Date: 2020-04-06
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #1c1b19;
		color: #fce8c3;
	}

	.hljs-strong,
	.hljs-emphasis {
		color: #918175;
	}

	.hljs-bullet,
	.hljs-quote,
	.hljs-link,
	.hljs-number,
	.hljs-regexp,
	.hljs-literal {
		color: #ff5c8f;
	}

	.hljs-code,
	.hljs-selector-class {
		color: #68a8e4;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-section,
	.hljs-attribute,
	.hljs-variable {
		color: #ef2f27;
	}

	.hljs-name,
	.hljs-title {
		color: #fbb829;
	}

	.hljs-type,
	.hljs-params {
		color: #0aaeb3;
	}

	.hljs-string {
		color: #98bc37;
	}

	.hljs-subst,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-symbol,
	.hljs-selector-id,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-template-tag,
	.hljs-template-variable,
	.hljs-addition {
		color: #c07abe;
	}

	.hljs-comment,
	.hljs-deletion,
	.hljs-meta {
		color: #918175;
	}
}

.stackoverflow-dark {
	/*!
 * StackOverflow.com dark style
 *
 * @stackoverflow/stacks v0.56.0
 * https://github.com/StackExchange/Stacks
 */

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #ffffff;
		background: #1c1b1b;
	}

	.hljs-comment {
		color: #999999;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-meta-keyword,
	.hljs-doctag,
	.hljs-section,
	.hljs-selector-class,
	.hljs-meta,
	.hljs-selector-pseudo,
	.hljs-attr {
		color: #88aece;
	}

	.hljs-attribute {
		color: v#c59bc1;
	}

	.hljs-name,
	.hljs-type,
	.hljs-number,
	.hljs-selector-id,
	.hljs-quote,
	.hljs-template-tag,
	.hljs-built_in,
	.hljs-title,
	.hljs-literal {
		color: #f08d49;
	}

	.hljs-string,
	.hljs-regexp,
	.hljs-symbol,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-selector-attr,
	.hljs-meta-string {
		color: #b5bd68;
	}

	.hljs-bullet,
	.hljs-code {
		color: #cccccc;
	}

	.hljs-deletion {
		color: #de7176;
	}

	.hljs-addition {
		color: #76c490;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.stackoverflow-light {
	/*!
 * StackOverflow.com light style
 *
 * @stackoverflow/stacks v0.56.0
 * https://github.com/StackExchange/Stacks
 */

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		color: #2f3337;
		background: #f6f6f6;
	}

	.hljs-comment {
		color: #656e77;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-meta-keyword,
	.hljs-doctag,
	.hljs-section,
	.hljs-selector-class,
	.hljs-meta,
	.hljs-selector-pseudo,
	.hljs-attr {
		color: #015692;
	}

	.hljs-attribute {
		color: #803378;
	}

	.hljs-name,
	.hljs-type,
	.hljs-number,
	.hljs-selector-id,
	.hljs-quote,
	.hljs-template-tag,
	.hljs-built_in,
	.hljs-title,
	.hljs-literal {
		color: #b75501;
	}

	.hljs-string,
	.hljs-regexp,
	.hljs-symbol,
	.hljs-variable,
	.hljs-template-variable,
	.hljs-link,
	.hljs-selector-attr,
	.hljs-meta-string {
		color: #54790d;
	}

	.hljs-bullet,
	.hljs-code {
		color: #535a60;
	}

	.hljs-deletion {
		color: #c02d2e;
	}

	.hljs-addition {
		color: #2f6f44;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.sunburst {
	/*

Sunburst-like style (c) Vasily Polovnyov <vast@whiteants.net>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #000;
		color: #f8f8f8;
	}

	.hljs-comment,
	.hljs-quote {
		color: #aeaeae;
		font-style: italic;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-type {
		color: #e28964;
	}

	.hljs-string {
		color: #65b042;
	}

	.hljs-subst {
		color: #daefa3;
	}

	.hljs-regexp,
	.hljs-link {
		color: #e9c062;
	}

	.hljs-title,
	.hljs-section,
	.hljs-tag,
	.hljs-name {
		color: #89bdff;
	}

	.hljs-class .hljs-title,
	.hljs-doctag {
		text-decoration: underline;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-number {
		color: #3387cc;
	}

	.hljs-params,
	.hljs-variable,
	.hljs-template-variable {
		color: #3e87e3;
	}

	.hljs-attribute {
		color: #cda869;
	}

	.hljs-meta {
		color: #8996a8;
	}

	.hljs-formula {
		background-color: #0e2231;
		color: #f8f8f8;
		font-style: italic;
	}

	.hljs-addition {
		background-color: #253b22;
		color: #f8f8f8;
	}

	.hljs-deletion {
		background-color: #420e09;
		color: #f8f8f8;
	}

	.hljs-selector-class {
		color: #9b703f;
	}

	.hljs-selector-id {
		color: #8b98ab;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.tomorrow-night-blue {
	/* Tomorrow Night Blue Theme */
	/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */
	/* Original theme - https://github.com/chriskempson/tomorrow-theme */
	/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

	/* Tomorrow Comment */
	.hljs-comment,
	.hljs-quote {
		color: #7285b7;
	}

	/* Tomorrow Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #ff9da4;
	}

	/* Tomorrow Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #ffc58f;
	}

	/* Tomorrow Yellow */
	.hljs-attribute {
		color: #ffeead;
	}

	/* Tomorrow Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #d1f1a9;
	}

	/* Tomorrow Blue */
	.hljs-title,
	.hljs-section {
		color: #bbdaff;
	}

	/* Tomorrow Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #ebbbff;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #002451;
		color: white;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.tomorrow-night-bright {
	/* Tomorrow Night Bright Theme */
	/* Original theme - https://github.com/chriskempson/tomorrow-theme */
	/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

	/* Tomorrow Comment */
	.hljs-comment,
	.hljs-quote {
		color: #969896;
	}

	/* Tomorrow Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #d54e53;
	}

	/* Tomorrow Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #e78c45;
	}

	/* Tomorrow Yellow */
	.hljs-attribute {
		color: #e7c547;
	}

	/* Tomorrow Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #b9ca4a;
	}

	/* Tomorrow Blue */
	.hljs-title,
	.hljs-section {
		color: #7aa6da;
	}

	/* Tomorrow Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #c397d8;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: black;
		color: #eaeaea;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.tomorrow-night-eighties {
	/* Tomorrow Night Eighties Theme */
	/* Original theme - https://github.com/chriskempson/tomorrow-theme */
	/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

	/* Tomorrow Comment */
	.hljs-comment,
	.hljs-quote {
		color: #999999;
	}

	/* Tomorrow Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #f2777a;
	}

	/* Tomorrow Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #f99157;
	}

	/* Tomorrow Yellow */
	.hljs-attribute {
		color: #ffcc66;
	}

	/* Tomorrow Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #99cc99;
	}

	/* Tomorrow Blue */
	.hljs-title,
	.hljs-section {
		color: #6699cc;
	}

	/* Tomorrow Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #cc99cc;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #2d2d2d;
		color: #cccccc;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.tomorrow-night {
	/* Tomorrow Night Theme */
	/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */
	/* Original theme - https://github.com/chriskempson/tomorrow-theme */
	/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

	/* Tomorrow Comment */
	.hljs-comment,
	.hljs-quote {
		color: #969896;
	}

	/* Tomorrow Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #cc6666;
	}

	/* Tomorrow Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #de935f;
	}

	/* Tomorrow Yellow */
	.hljs-attribute {
		color: #f0c674;
	}

	/* Tomorrow Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #b5bd68;
	}

	/* Tomorrow Blue */
	.hljs-title,
	.hljs-section {
		color: #81a2be;
	}

	/* Tomorrow Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #b294bb;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: #1d1f21;
		color: #c5c8c6;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.tomorrow {
	/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */

	/* Tomorrow Comment */
	.hljs-comment,
	.hljs-quote {
		color: #8e908c;
	}

	/* Tomorrow Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #c82829;
	}

	/* Tomorrow Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #f5871f;
	}

	/* Tomorrow Yellow */
	.hljs-attribute {
		color: #eab700;
	}

	/* Tomorrow Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #718c00;
	}

	/* Tomorrow Blue */
	.hljs-title,
	.hljs-section {
		color: #4271ae;
	}

	/* Tomorrow Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #8959a8;
	}

	.hljs {
		display: block;
		overflow-x: auto;
		background: white;
		color: #4d4d4c;
		padding: 0.5em;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.vs {
	/*

Visual Studio-like style based on original C# coloring by Jason Diamond <jason@diamond.name>

*/
	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: white;
		color: black;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-variable {
		color: #008000;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-built_in,
	.hljs-name,
	.hljs-tag {
		color: #00f;
	}

	.hljs-string,
	.hljs-title,
	.hljs-section,
	.hljs-attribute,
	.hljs-literal,
	.hljs-template-tag,
	.hljs-template-variable,
	.hljs-type,
	.hljs-addition {
		color: #a31515;
	}

	.hljs-deletion,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-meta {
		color: #2b91af;
	}

	.hljs-doctag {
		color: #808080;
	}

	.hljs-attr {
		color: #f00;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-link {
		color: #00b0e8;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}

.vs2015 {
	/*
 * Visual Studio 2015 dark style
 * Author: Nicolas LLOBERA <nllobera@gmail.com>
 */

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #1e1e1e;
		color: #dcdcdc;
	}

	.hljs-keyword,
	.hljs-literal,
	.hljs-symbol,
	.hljs-name {
		color: #569cd6;
	}

	.hljs-link {
		color: #569cd6;
		text-decoration: underline;
	}

	.hljs-built_in,
	.hljs-type {
		color: #4ec9b0;
	}

	.hljs-number,
	.hljs-class {
		color: #b8d7a3;
	}

	.hljs-string,
	.hljs-meta-string {
		color: #d69d85;
	}

	.hljs-regexp,
	.hljs-template-tag {
		color: #9a5334;
	}

	.hljs-subst,
	.hljs-function,
	.hljs-title,
	.hljs-params,
	.hljs-formula {
		color: #dcdcdc;
	}

	.hljs-comment,
	.hljs-quote {
		color: #57a64a;
		font-style: italic;
	}

	.hljs-doctag {
		color: #608b4e;
	}

	.hljs-meta,
	.hljs-meta-keyword,
	.hljs-tag {
		color: #9b9b9b;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #bd63c5;
	}

	.hljs-attr,
	.hljs-attribute,
	.hljs-builtin-name {
		color: #9cdcfe;
	}

	.hljs-section {
		color: gold;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	/*.hljs-code {
  font-family:'Monospace';
}*/

	.hljs-bullet,
	.hljs-selector-tag,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-selector-attr,
	.hljs-selector-pseudo {
		color: #d7ba7d;
	}

	.hljs-addition {
		background-color: #144212;
		display: inline-block;
		width: 100%;
	}

	.hljs-deletion {
		background-color: #600;
		display: inline-block;
		width: 100%;
	}
}

.xcode {
	/*

XCode style (c) Angel Garcia <angelgarcia.mail@gmail.com>

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #fff;
		color: black;
	}

	/* Gray DOCTYPE selectors like WebKit */
	.xml .hljs-meta {
		color: #c0c0c0;
	}

	.hljs-comment,
	.hljs-quote {
		color: #007400;
	}

	.hljs-tag,
	.hljs-attribute,
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-name {
		color: #aa0d91;
	}

	.hljs-variable,
	.hljs-template-variable {
		color: #3f6e74;
	}

	.hljs-code,
	.hljs-string,
	.hljs-meta-string {
		color: #c41a16;
	}

	.hljs-regexp,
	.hljs-link {
		color: #0e0eff;
	}

	.hljs-title,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-number {
		color: #1c00cf;
	}

	.hljs-section,
	.hljs-meta {
		color: #643820;
	}

	.hljs-class .hljs-title,
	.hljs-type,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-params {
		color: #5c2699;
	}

	.hljs-attr {
		color: #836c28;
	}

	.hljs-subst {
		color: #000;
	}

	.hljs-formula {
		background-color: #eee;
		font-style: italic;
	}

	.hljs-addition {
		background-color: #baeeba;
	}

	.hljs-deletion {
		background-color: #ffc8bd;
	}

	.hljs-selector-id,
	.hljs-selector-class {
		color: #9b703f;
	}

	.hljs-doctag,
	.hljs-strong {
		font-weight: bold;
	}

	.hljs-emphasis {
		font-style: italic;
	}
}

.xt256 {
	/*
  xt256.css

  Contact: initbar [at] protonmail [dot] ch
         : github.com/initbar
*/

	.hljs {
		display: block;
		overflow-x: auto;
		color: #eaeaea;
		background: #000;
		padding: 0.5em;
	}

	.hljs-subst {
		color: #eaeaea;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	.hljs-builtin-name,
	.hljs-type {
		color: #eaeaea;
	}

	.hljs-params {
		color: #da0000;
	}

	.hljs-literal,
	.hljs-number,
	.hljs-name {
		color: #ff0000;
		font-weight: bolder;
	}

	.hljs-comment {
		color: #969896;
	}

	.hljs-selector-id,
	.hljs-quote {
		color: #00ffff;
	}

	.hljs-template-variable,
	.hljs-variable,
	.hljs-title {
		color: #00ffff;
		font-weight: bold;
	}

	.hljs-selector-class,
	.hljs-keyword,
	.hljs-symbol {
		color: #fff000;
	}

	.hljs-string,
	.hljs-bullet {
		color: #00ff00;
	}

	.hljs-tag,
	.hljs-section {
		color: #000fff;
	}

	.hljs-selector-tag {
		color: #000fff;
		font-weight: bold;
	}

	.hljs-attribute,
	.hljs-built_in,
	.hljs-regexp,
	.hljs-link {
		color: #ff00ff;
	}

	.hljs-meta {
		color: #fff;
		font-weight: bolder;
	}
}

.zenburn {
	/*

Zenburn style from voldmar.ru (c) Vladimir Epifanov <voldmar@voldmar.ru>
based on dark.css by Ivan Sagalaev

*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #3f3f3f;
		color: #dcdcdc;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-tag {
		color: #e3ceab;
	}

	.hljs-template-tag {
		color: #dcdcdc;
	}

	.hljs-number {
		color: #8cd0d3;
	}

	.hljs-variable,
	.hljs-template-variable,
	.hljs-attribute {
		color: #efdcbc;
	}

	.hljs-literal {
		color: #efefaf;
	}

	.hljs-subst {
		color: #8f8f8f;
	}

	.hljs-title,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-section,
	.hljs-type {
		color: #efef8f;
	}

	.hljs-symbol,
	.hljs-bullet,
	.hljs-link {
		color: #dca3a3;
	}

	.hljs-deletion,
	.hljs-string,
	.hljs-built_in,
	.hljs-builtin-name {
		color: #cc9393;
	}

	.hljs-addition,
	.hljs-comment,
	.hljs-quote,
	.hljs-meta {
		color: #7f9f7f;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}
}
</style>
