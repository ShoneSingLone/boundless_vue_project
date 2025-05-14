(function () {
	"use strict";
	var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
	var lib$3 = {};
	var sourceMap = {};
	var genMapping_umd = { exports: {} };
	var setArray_umd = { exports: {} };
	(function (module2, exports3) {
		(function (global2, factory) {
			factory(exports3);
		})(commonjsGlobal, function (exports4) {
			class SetArray {
				constructor() {
					this._indexes = { __proto__: null };
					this.array = [];
				}
			}

			function cast(set) {
				return set;
			}

			function get(setarr, key) {
				return cast(setarr)._indexes[key];
			}

			function put(setarr, key) {
				const index = get(setarr, key);
				if (index !== void 0)
					return index;
				const { array, _indexes: indexes } = cast(setarr);
				const length = array.push(key);
				return indexes[key] = length - 1;
			}

			function pop(setarr) {
				const { array, _indexes: indexes } = cast(setarr);
				if (array.length === 0)
					return;
				const last = array.pop();
				indexes[last] = void 0;
			}

			function remove(setarr, key) {
				const index = get(setarr, key);
				if (index === void 0)
					return;
				const { array, _indexes: indexes } = cast(setarr);
				for (let i = index + 1; i < array.length; i++) {
					const k = array[i];
					array[i - 1] = k;
					indexes[k]--;
				}
				indexes[key] = void 0;
				array.pop();
			}

			exports4.SetArray = SetArray;
			exports4.get = get;
			exports4.pop = pop;
			exports4.put = put;
			exports4.remove = remove;
			Object.defineProperty(exports4, "__esModule", { value: true });
		});
	})(setArray_umd, setArray_umd.exports);
	var sourcemapCodec_umd = { exports: {} };
	(function (module2, exports3) {
		(function (global2, factory) {
			factory(exports3);
		})(commonjsGlobal, function (exports4) {
			const comma = ",".charCodeAt(0);
			const semicolon = ";".charCodeAt(0);
			const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
			const intToChar = new Uint8Array(64);
			const charToInt = new Uint8Array(128);
			for (let i = 0; i < chars.length; i++) {
				const c = chars.charCodeAt(i);
				intToChar[i] = c;
				charToInt[c] = i;
			}

			function decodeInteger(reader, relative) {
				let value = 0;
				let shift = 0;
				let integer = 0;
				do {
					const c = reader.next();
					integer = charToInt[c];
					value |= (integer & 31) << shift;
					shift += 5;
				} while (integer & 32);
				const shouldNegate = value & 1;
				value >>>= 1;
				if (shouldNegate) {
					value = -2147483648 | -value;
				}
				return relative + value;
			}

			function encodeInteger(builder, num, relative) {
				let delta = num - relative;
				delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
				do {
					let clamped = delta & 31;
					delta >>>= 5;
					if (delta > 0)
						clamped |= 32;
					builder.write(intToChar[clamped]);
				} while (delta > 0);
				return num;
			}

			function hasMoreVlq(reader, max) {
				if (reader.pos >= max)
					return false;
				return reader.peek() !== comma;
			}

			const bufLength = 1024 * 16;
			const td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
				decode(buf) {
					const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
					return out.toString();
				}
			} : {
				decode(buf) {
					let out = "";
					for (let i = 0; i < buf.length; i++) {
						out += String.fromCharCode(buf[i]);
					}
					return out;
				}
			};

			class StringWriter {
				constructor() {
					this.pos = 0;
					this.out = "";
					this.buffer = new Uint8Array(bufLength);
				}

				write(v) {
					const { buffer: buffer2 } = this;
					buffer2[this.pos++] = v;
					if (this.pos === bufLength) {
						this.out += td.decode(buffer2);
						this.pos = 0;
					}
				}

				flush() {
					const { buffer: buffer2, out, pos } = this;
					return pos > 0 ? out + td.decode(buffer2.subarray(0, pos)) : out;
				}
			}

			class StringReader {
				constructor(buffer2) {
					this.pos = 0;
					this.buffer = buffer2;
				}

				next() {
					return this.buffer.charCodeAt(this.pos++);
				}

				peek() {
					return this.buffer.charCodeAt(this.pos);
				}

				indexOf(char) {
					const { buffer: buffer2, pos } = this;
					const idx = buffer2.indexOf(char, pos);
					return idx === -1 ? buffer2.length : idx;
				}
			}

			const EMPTY = [];

			function decodeOriginalScopes(input) {
				const { length } = input;
				const reader = new StringReader(input);
				const scopes = [];
				const stack = [];
				let line = 0;
				for (; reader.pos < length; reader.pos++) {
					line = decodeInteger(reader, line);
					const column = decodeInteger(reader, 0);
					if (!hasMoreVlq(reader, length)) {
						const last = stack.pop();
						last[2] = line;
						last[3] = column;
						continue;
					}
					const kind = decodeInteger(reader, 0);
					const fields = decodeInteger(reader, 0);
					const hasName = fields & 1;
					const scope = hasName ? [line, column, 0, 0, kind, decodeInteger(reader, 0)] : [line, column, 0, 0, kind];
					let vars = EMPTY;
					if (hasMoreVlq(reader, length)) {
						vars = [];
						do {
							const varsIndex = decodeInteger(reader, 0);
							vars.push(varsIndex);
						} while (hasMoreVlq(reader, length));
					}
					scope.vars = vars;
					scopes.push(scope);
					stack.push(scope);
				}
				return scopes;
			}

			function encodeOriginalScopes(scopes) {
				const writer = new StringWriter();
				for (let i = 0; i < scopes.length;) {
					i = _encodeOriginalScopes(scopes, i, writer, [0]);
				}
				return writer.flush();
			}

			function _encodeOriginalScopes(scopes, index, writer, state) {
				const scope = scopes[index];
				const { 0: startLine, 1: startColumn, 2: endLine, 3: endColumn, 4: kind, vars } = scope;
				if (index > 0)
					writer.write(comma);
				state[0] = encodeInteger(writer, startLine, state[0]);
				encodeInteger(writer, startColumn, 0);
				encodeInteger(writer, kind, 0);
				const fields = scope.length === 6 ? 1 : 0;
				encodeInteger(writer, fields, 0);
				if (scope.length === 6)
					encodeInteger(writer, scope[5], 0);
				for (const v of vars) {
					encodeInteger(writer, v, 0);
				}
				for (index++; index < scopes.length;) {
					const next = scopes[index];
					const { 0: l, 1: c } = next;
					if (l > endLine || l === endLine && c >= endColumn) {
						break;
					}
					index = _encodeOriginalScopes(scopes, index, writer, state);
				}
				writer.write(comma);
				state[0] = encodeInteger(writer, endLine, state[0]);
				encodeInteger(writer, endColumn, 0);
				return index;
			}

			function decodeGeneratedRanges(input) {
				const { length } = input;
				const reader = new StringReader(input);
				const ranges = [];
				const stack = [];
				let genLine = 0;
				let definitionSourcesIndex = 0;
				let definitionScopeIndex = 0;
				let callsiteSourcesIndex = 0;
				let callsiteLine = 0;
				let callsiteColumn = 0;
				let bindingLine = 0;
				let bindingColumn = 0;
				do {
					const semi = reader.indexOf(";");
					let genColumn = 0;
					for (; reader.pos < semi; reader.pos++) {
						genColumn = decodeInteger(reader, genColumn);
						if (!hasMoreVlq(reader, semi)) {
							const last = stack.pop();
							last[2] = genLine;
							last[3] = genColumn;
							continue;
						}
						const fields = decodeInteger(reader, 0);
						const hasDefinition = fields & 1;
						const hasCallsite = fields & 2;
						const hasScope = fields & 4;
						let callsite = null;
						let bindings = EMPTY;
						let range;
						if (hasDefinition) {
							const defSourcesIndex = decodeInteger(reader, definitionSourcesIndex);
							definitionScopeIndex = decodeInteger(reader, definitionSourcesIndex === defSourcesIndex ? definitionScopeIndex : 0);
							definitionSourcesIndex = defSourcesIndex;
							range = [genLine, genColumn, 0, 0, defSourcesIndex, definitionScopeIndex];
						} else {
							range = [genLine, genColumn, 0, 0];
						}
						range.isScope = !!hasScope;
						if (hasCallsite) {
							const prevCsi = callsiteSourcesIndex;
							const prevLine = callsiteLine;
							callsiteSourcesIndex = decodeInteger(reader, callsiteSourcesIndex);
							const sameSource = prevCsi === callsiteSourcesIndex;
							callsiteLine = decodeInteger(reader, sameSource ? callsiteLine : 0);
							callsiteColumn = decodeInteger(reader, sameSource && prevLine === callsiteLine ? callsiteColumn : 0);
							callsite = [callsiteSourcesIndex, callsiteLine, callsiteColumn];
						}
						range.callsite = callsite;
						if (hasMoreVlq(reader, semi)) {
							bindings = [];
							do {
								bindingLine = genLine;
								bindingColumn = genColumn;
								const expressionsCount = decodeInteger(reader, 0);
								let expressionRanges;
								if (expressionsCount < -1) {
									expressionRanges = [[decodeInteger(reader, 0)]];
									for (let i = -1; i > expressionsCount; i--) {
										const prevBl = bindingLine;
										bindingLine = decodeInteger(reader, bindingLine);
										bindingColumn = decodeInteger(reader, bindingLine === prevBl ? bindingColumn : 0);
										const expression = decodeInteger(reader, 0);
										expressionRanges.push([expression, bindingLine, bindingColumn]);
									}
								} else {
									expressionRanges = [[expressionsCount]];
								}
								bindings.push(expressionRanges);
							} while (hasMoreVlq(reader, semi));
						}
						range.bindings = bindings;
						ranges.push(range);
						stack.push(range);
					}
					genLine++;
					reader.pos = semi + 1;
				} while (reader.pos < length);
				return ranges;
			}

			function encodeGeneratedRanges(ranges) {
				if (ranges.length === 0)
					return "";
				const writer = new StringWriter();
				for (let i = 0; i < ranges.length;) {
					i = _encodeGeneratedRanges(ranges, i, writer, [0, 0, 0, 0, 0, 0, 0]);
				}
				return writer.flush();
			}

			function _encodeGeneratedRanges(ranges, index, writer, state) {
				const range = ranges[index];
				const {
					0: startLine,
					1: startColumn,
					2: endLine,
					3: endColumn,
					isScope: isScope2,
					callsite,
					bindings
				} = range;
				if (state[0] < startLine) {
					catchupLine(writer, state[0], startLine);
					state[0] = startLine;
					state[1] = 0;
				} else if (index > 0) {
					writer.write(comma);
				}
				state[1] = encodeInteger(writer, range[1], state[1]);
				const fields = (range.length === 6 ? 1 : 0) | (callsite ? 2 : 0) | (isScope2 ? 4 : 0);
				encodeInteger(writer, fields, 0);
				if (range.length === 6) {
					const { 4: sourcesIndex, 5: scopesIndex } = range;
					if (sourcesIndex !== state[2]) {
						state[3] = 0;
					}
					state[2] = encodeInteger(writer, sourcesIndex, state[2]);
					state[3] = encodeInteger(writer, scopesIndex, state[3]);
				}
				if (callsite) {
					const { 0: sourcesIndex, 1: callLine, 2: callColumn } = range.callsite;
					if (sourcesIndex !== state[4]) {
						state[5] = 0;
						state[6] = 0;
					} else if (callLine !== state[5]) {
						state[6] = 0;
					}
					state[4] = encodeInteger(writer, sourcesIndex, state[4]);
					state[5] = encodeInteger(writer, callLine, state[5]);
					state[6] = encodeInteger(writer, callColumn, state[6]);
				}
				if (bindings) {
					for (const binding of bindings) {
						if (binding.length > 1)
							encodeInteger(writer, -binding.length, 0);
						const expression = binding[0][0];
						encodeInteger(writer, expression, 0);
						let bindingStartLine = startLine;
						let bindingStartColumn = startColumn;
						for (let i = 1; i < binding.length; i++) {
							const expRange = binding[i];
							bindingStartLine = encodeInteger(writer, expRange[1], bindingStartLine);
							bindingStartColumn = encodeInteger(writer, expRange[2], bindingStartColumn);
							encodeInteger(writer, expRange[0], 0);
						}
					}
				}
				for (index++; index < ranges.length;) {
					const next = ranges[index];
					const { 0: l, 1: c } = next;
					if (l > endLine || l === endLine && c >= endColumn) {
						break;
					}
					index = _encodeGeneratedRanges(ranges, index, writer, state);
				}
				if (state[0] < endLine) {
					catchupLine(writer, state[0], endLine);
					state[0] = endLine;
					state[1] = 0;
				} else {
					writer.write(comma);
				}
				state[1] = encodeInteger(writer, endColumn, state[1]);
				return index;
			}

			function catchupLine(writer, lastLine, line) {
				do {
					writer.write(semicolon);
				} while (++lastLine < line);
			}

			function decode(mappings) {
				const { length } = mappings;
				const reader = new StringReader(mappings);
				const decoded = [];
				let genColumn = 0;
				let sourcesIndex = 0;
				let sourceLine = 0;
				let sourceColumn = 0;
				let namesIndex = 0;
				do {
					const semi = reader.indexOf(";");
					const line = [];
					let sorted = true;
					let lastCol = 0;
					genColumn = 0;
					while (reader.pos < semi) {
						let seg;
						genColumn = decodeInteger(reader, genColumn);
						if (genColumn < lastCol)
							sorted = false;
						lastCol = genColumn;
						if (hasMoreVlq(reader, semi)) {
							sourcesIndex = decodeInteger(reader, sourcesIndex);
							sourceLine = decodeInteger(reader, sourceLine);
							sourceColumn = decodeInteger(reader, sourceColumn);
							if (hasMoreVlq(reader, semi)) {
								namesIndex = decodeInteger(reader, namesIndex);
								seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex];
							} else {
								seg = [genColumn, sourcesIndex, sourceLine, sourceColumn];
							}
						} else {
							seg = [genColumn];
						}
						line.push(seg);
						reader.pos++;
					}
					if (!sorted)
						sort(line);
					decoded.push(line);
					reader.pos = semi + 1;
				} while (reader.pos <= length);
				return decoded;
			}

			function sort(line) {
				line.sort(sortComparator);
			}

			function sortComparator(a, b) {
				return a[0] - b[0];
			}

			function encode(decoded) {
				const writer = new StringWriter();
				let sourcesIndex = 0;
				let sourceLine = 0;
				let sourceColumn = 0;
				let namesIndex = 0;
				for (let i = 0; i < decoded.length; i++) {
					const line = decoded[i];
					if (i > 0)
						writer.write(semicolon);
					if (line.length === 0)
						continue;
					let genColumn = 0;
					for (let j = 0; j < line.length; j++) {
						const segment = line[j];
						if (j > 0)
							writer.write(comma);
						genColumn = encodeInteger(writer, segment[0], genColumn);
						if (segment.length === 1)
							continue;
						sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
						sourceLine = encodeInteger(writer, segment[2], sourceLine);
						sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
						if (segment.length === 4)
							continue;
						namesIndex = encodeInteger(writer, segment[4], namesIndex);
					}
				}
				return writer.flush();
			}

			exports4.decode = decode;
			exports4.decodeGeneratedRanges = decodeGeneratedRanges;
			exports4.decodeOriginalScopes = decodeOriginalScopes;
			exports4.encode = encode;
			exports4.encodeGeneratedRanges = encodeGeneratedRanges;
			exports4.encodeOriginalScopes = encodeOriginalScopes;
			Object.defineProperty(exports4, "__esModule", { value: true });
		});
	})(sourcemapCodec_umd, sourcemapCodec_umd.exports);
	var traceMapping_umd = { exports: {} };
	var resolveUri_umd = { exports: {} };
	(function (module2, exports3) {
		(function (global2, factory) {
			module2.exports = factory();
		})(commonjsGlobal, function () {
			const schemeRegex = /^[\w+.-]+:\/\//;
			const urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;
			const fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;

			function isAbsoluteUrl(input) {
				return schemeRegex.test(input);
			}

			function isSchemeRelativeUrl(input) {
				return input.startsWith("//");
			}

			function isAbsolutePath(input) {
				return input.startsWith("/");
			}

			function isFileUrl(input) {
				return input.startsWith("file:");
			}

			function isRelative(input) {
				return /^[.?#]/.test(input);
			}

			function parseAbsoluteUrl(input) {
				const match = urlRegex.exec(input);
				return makeUrl(match[1], match[2] || "", match[3], match[4] || "", match[5] || "/", match[6] || "", match[7] || "");
			}

			function parseFileUrl(input) {
				const match = fileRegex.exec(input);
				const path = match[2];
				return makeUrl("file:", "", match[1] || "", "", isAbsolutePath(path) ? path : "/" + path, match[3] || "", match[4] || "");
			}

			function makeUrl(scheme, user, host, port, path, query, hash) {
				return {
					scheme,
					user,
					host,
					port,
					path,
					query,
					hash,
					type: 7
				};
			}

			function parseUrl(input) {
				if (isSchemeRelativeUrl(input)) {
					const url2 = parseAbsoluteUrl("http:" + input);
					url2.scheme = "";
					url2.type = 6;
					return url2;
				}
				if (isAbsolutePath(input)) {
					const url2 = parseAbsoluteUrl("http://foo.com" + input);
					url2.scheme = "";
					url2.host = "";
					url2.type = 5;
					return url2;
				}
				if (isFileUrl(input))
					return parseFileUrl(input);
				if (isAbsoluteUrl(input))
					return parseAbsoluteUrl(input);
				const url = parseAbsoluteUrl("http://foo.com/" + input);
				url.scheme = "";
				url.host = "";
				url.type = input ? input.startsWith("?") ? 3 : input.startsWith("#") ? 2 : 4 : 1;
				return url;
			}

			function stripPathFilename(path) {
				if (path.endsWith("/.."))
					return path;
				const index = path.lastIndexOf("/");
				return path.slice(0, index + 1);
			}

			function mergePaths(url, base2) {
				normalizePath(base2, base2.type);
				if (url.path === "/") {
					url.path = base2.path;
				} else {
					url.path = stripPathFilename(base2.path) + url.path;
				}
			}

			function normalizePath(url, type) {
				const rel = type <= 4;
				const pieces = url.path.split("/");
				let pointer = 1;
				let positive = 0;
				let addTrailingSlash = false;
				for (let i = 1; i < pieces.length; i++) {
					const piece = pieces[i];
					if (!piece) {
						addTrailingSlash = true;
						continue;
					}
					addTrailingSlash = false;
					if (piece === ".")
						continue;
					if (piece === "..") {
						if (positive) {
							addTrailingSlash = true;
							positive--;
							pointer--;
						} else if (rel) {
							pieces[pointer++] = piece;
						}
						continue;
					}
					pieces[pointer++] = piece;
					positive++;
				}
				let path = "";
				for (let i = 1; i < pointer; i++) {
					path += "/" + pieces[i];
				}
				if (!path || addTrailingSlash && !path.endsWith("/..")) {
					path += "/";
				}
				url.path = path;
			}

			function resolve(input, base2) {
				if (!input && !base2)
					return "";
				const url = parseUrl(input);
				let inputType = url.type;
				if (base2 && inputType !== 7) {
					const baseUrl = parseUrl(base2);
					const baseType = baseUrl.type;
					switch (inputType) {
						case 1:
							url.hash = baseUrl.hash;
						case 2:
							url.query = baseUrl.query;
						case 3:
						case 4:
							mergePaths(url, baseUrl);
						case 5:
							url.user = baseUrl.user;
							url.host = baseUrl.host;
							url.port = baseUrl.port;
						case 6:
							url.scheme = baseUrl.scheme;
					}
					if (baseType > inputType)
						inputType = baseType;
				}
				normalizePath(url, inputType);
				const queryHash = url.query + url.hash;
				switch (inputType) {
					case 2:
					case 3:
						return queryHash;
					case 4: {
						const path = url.path.slice(1);
						if (!path)
							return queryHash || ".";
						if (isRelative(base2 || input) && !isRelative(path)) {
							return "./" + path + queryHash;
						}
						return path + queryHash;
					}
					case 5:
						return url.path + queryHash;
					default:
						return url.scheme + "//" + url.user + url.host + url.port + url.path + queryHash;
				}
			}

			return resolve;
		});
	})(resolveUri_umd);
	(function (module2, exports3) {
		(function (global2, factory) {
			factory(exports3, sourcemapCodec_umd.exports, resolveUri_umd.exports);
		})(commonjsGlobal, function (exports4, sourcemapCodec, resolveUri) {
			function resolve(input, base2) {
				if (base2 && !base2.endsWith("/"))
					base2 += "/";
				return resolveUri(input, base2);
			}

			function stripFilename(path) {
				if (!path)
					return "";
				const index = path.lastIndexOf("/");
				return path.slice(0, index + 1);
			}

			const COLUMN = 0;
			const SOURCES_INDEX = 1;
			const SOURCE_LINE = 2;
			const SOURCE_COLUMN = 3;
			const NAMES_INDEX = 4;
			const REV_GENERATED_LINE = 1;
			const REV_GENERATED_COLUMN = 2;

			function maybeSort(mappings, owned) {
				const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
				if (unsortedIndex === mappings.length)
					return mappings;
				if (!owned)
					mappings = mappings.slice();
				for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
					mappings[i] = sortSegments(mappings[i], owned);
				}
				return mappings;
			}

			function nextUnsortedSegmentLine(mappings, start) {
				for (let i = start; i < mappings.length; i++) {
					if (!isSorted(mappings[i]))
						return i;
				}
				return mappings.length;
			}

			function isSorted(line) {
				for (let j = 1; j < line.length; j++) {
					if (line[j][COLUMN] < line[j - 1][COLUMN]) {
						return false;
					}
				}
				return true;
			}

			function sortSegments(line, owned) {
				if (!owned)
					line = line.slice();
				return line.sort(sortComparator);
			}

			function sortComparator(a, b) {
				return a[COLUMN] - b[COLUMN];
			}

			let found = false;

			function binarySearch(haystack, needle, low, high) {
				while (low <= high) {
					const mid = low + (high - low >> 1);
					const cmp = haystack[mid][COLUMN] - needle;
					if (cmp === 0) {
						found = true;
						return mid;
					}
					if (cmp < 0) {
						low = mid + 1;
					} else {
						high = mid - 1;
					}
				}
				found = false;
				return low - 1;
			}

			function upperBound(haystack, needle, index) {
				for (let i = index + 1; i < haystack.length; index = i++) {
					if (haystack[i][COLUMN] !== needle)
						break;
				}
				return index;
			}

			function lowerBound(haystack, needle, index) {
				for (let i = index - 1; i >= 0; index = i--) {
					if (haystack[i][COLUMN] !== needle)
						break;
				}
				return index;
			}

			function memoizedState() {
				return {
					lastKey: -1,
					lastNeedle: -1,
					lastIndex: -1
				};
			}

			function memoizedBinarySearch(haystack, needle, state, key) {
				const { lastKey, lastNeedle, lastIndex } = state;
				let low = 0;
				let high = haystack.length - 1;
				if (key === lastKey) {
					if (needle === lastNeedle) {
						found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle;
						return lastIndex;
					}
					if (needle >= lastNeedle) {
						low = lastIndex === -1 ? 0 : lastIndex;
					} else {
						high = lastIndex;
					}
				}
				state.lastKey = key;
				state.lastNeedle = needle;
				return state.lastIndex = binarySearch(haystack, needle, low, high);
			}

			function buildBySources(decoded, memos) {
				const sources = memos.map(buildNullArray);
				for (let i = 0; i < decoded.length; i++) {
					const line = decoded[i];
					for (let j = 0; j < line.length; j++) {
						const seg = line[j];
						if (seg.length === 1)
							continue;
						const sourceIndex2 = seg[SOURCES_INDEX];
						const sourceLine = seg[SOURCE_LINE];
						const sourceColumn = seg[SOURCE_COLUMN];
						const originalSource = sources[sourceIndex2];
						const originalLine = originalSource[sourceLine] || (originalSource[sourceLine] = []);
						const memo = memos[sourceIndex2];
						let index = upperBound(originalLine, sourceColumn, memoizedBinarySearch(originalLine, sourceColumn, memo, sourceLine));
						memo.lastIndex = ++index;
						insert(originalLine, index, [sourceColumn, i, seg[COLUMN]]);
					}
				}
				return sources;
			}

			function insert(array, index, value) {
				for (let i = array.length; i > index; i--) {
					array[i] = array[i - 1];
				}
				array[index] = value;
			}

			function buildNullArray() {
				return { __proto__: null };
			}

			const AnyMap = function (map, mapUrl) {
				const parsed = parse(map);
				if (!("sections" in parsed)) {
					return new TraceMap(parsed, mapUrl);
				}
				const mappings = [];
				const sources = [];
				const sourcesContent = [];
				const names = [];
				const ignoreList = [];
				recurse(parsed, mapUrl, mappings, sources, sourcesContent, names, ignoreList, 0, 0, Infinity, Infinity);
				const joined = {
					version: 3,
					file: parsed.file,
					names,
					sources,
					sourcesContent,
					mappings,
					ignoreList
				};
				return presortedDecodedMap(joined);
			};

			function parse(map) {
				return typeof map === "string" ? JSON.parse(map) : map;
			}

			function recurse(input, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset, columnOffset, stopLine, stopColumn) {
				const { sections } = input;
				for (let i = 0; i < sections.length; i++) {
					const { map, offset } = sections[i];
					let sl = stopLine;
					let sc = stopColumn;
					if (i + 1 < sections.length) {
						const nextOffset = sections[i + 1].offset;
						sl = Math.min(stopLine, lineOffset + nextOffset.line);
						if (sl === stopLine) {
							sc = Math.min(stopColumn, columnOffset + nextOffset.column);
						} else if (sl < stopLine) {
							sc = columnOffset + nextOffset.column;
						}
					}
					addSection(map, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset + offset.line, columnOffset + offset.column, sl, sc);
				}
			}

			function addSection(input, mapUrl, mappings, sources, sourcesContent, names, ignoreList, lineOffset, columnOffset, stopLine, stopColumn) {
				const parsed = parse(input);
				if ("sections" in parsed)
					return recurse(...arguments);
				const map = new TraceMap(parsed, mapUrl);
				const sourcesOffset = sources.length;
				const namesOffset = names.length;
				const decoded = decodedMappings(map);
				const { resolvedSources, sourcesContent: contents, ignoreList: ignores } = map;
				append(sources, resolvedSources);
				append(names, map.names);
				if (contents)
					append(sourcesContent, contents);
				else
					for (let i = 0; i < resolvedSources.length; i++)
						sourcesContent.push(null);
				if (ignores)
					for (let i = 0; i < ignores.length; i++)
						ignoreList.push(ignores[i] + sourcesOffset);
				for (let i = 0; i < decoded.length; i++) {
					const lineI = lineOffset + i;
					if (lineI > stopLine)
						return;
					const out = getLine(mappings, lineI);
					const cOffset = i === 0 ? columnOffset : 0;
					const line = decoded[i];
					for (let j = 0; j < line.length; j++) {
						const seg = line[j];
						const column = cOffset + seg[COLUMN];
						if (lineI === stopLine && column >= stopColumn)
							return;
						if (seg.length === 1) {
							out.push([column]);
							continue;
						}
						const sourcesIndex = sourcesOffset + seg[SOURCES_INDEX];
						const sourceLine = seg[SOURCE_LINE];
						const sourceColumn = seg[SOURCE_COLUMN];
						out.push(seg.length === 4 ? [column, sourcesIndex, sourceLine, sourceColumn] : [column, sourcesIndex, sourceLine, sourceColumn, namesOffset + seg[NAMES_INDEX]]);
					}
				}
			}

			function append(arr, other) {
				for (let i = 0; i < other.length; i++)
					arr.push(other[i]);
			}

			function getLine(arr, index) {
				for (let i = arr.length; i <= index; i++)
					arr[i] = [];
				return arr[index];
			}

			const LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
			const COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
			const LEAST_UPPER_BOUND = -1;
			const GREATEST_LOWER_BOUND = 1;

			class TraceMap {
				constructor(map, mapUrl) {
					const isString2 = typeof map === "string";
					if (!isString2 && map._decodedMemo)
						return map;
					const parsed = isString2 ? JSON.parse(map) : map;
					const { version, file: file2, names, sourceRoot, sources, sourcesContent } = parsed;
					this.version = version;
					this.file = file2;
					this.names = names || [];
					this.sourceRoot = sourceRoot;
					this.sources = sources;
					this.sourcesContent = sourcesContent;
					this.ignoreList = parsed.ignoreList || parsed.x_google_ignoreList || void 0;
					const from = resolve(sourceRoot || "", stripFilename(mapUrl));
					this.resolvedSources = sources.map((s) => resolve(s || "", from));
					const { mappings } = parsed;
					if (typeof mappings === "string") {
						this._encoded = mappings;
						this._decoded = void 0;
					} else {
						this._encoded = void 0;
						this._decoded = maybeSort(mappings, isString2);
					}
					this._decodedMemo = memoizedState();
					this._bySources = void 0;
					this._bySourceMemos = void 0;
				}
			}

			function cast(map) {
				return map;
			}

			function encodedMappings(map) {
				var _a;
				var _b;
				return (_a = (_b = cast(map))._encoded) !== null && _a !== void 0 ? _a : _b._encoded = sourcemapCodec.encode(cast(map)._decoded);
			}

			function decodedMappings(map) {
				var _a;
				return (_a = cast(map))._decoded || (_a._decoded = sourcemapCodec.decode(cast(map)._encoded));
			}

			function traceSegment(map, line, column) {
				const decoded = decodedMappings(map);
				if (line >= decoded.length)
					return null;
				const segments = decoded[line];
				const index = traceSegmentInternal(segments, cast(map)._decodedMemo, line, column, GREATEST_LOWER_BOUND);
				return index === -1 ? null : segments[index];
			}

			function originalPositionFor(map, needle) {
				let { line, column, bias } = needle;
				line--;
				if (line < 0)
					throw new Error(LINE_GTR_ZERO);
				if (column < 0)
					throw new Error(COL_GTR_EQ_ZERO);
				const decoded = decodedMappings(map);
				if (line >= decoded.length)
					return OMapping(null, null, null, null);
				const segments = decoded[line];
				const index = traceSegmentInternal(segments, cast(map)._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
				if (index === -1)
					return OMapping(null, null, null, null);
				const segment = segments[index];
				if (segment.length === 1)
					return OMapping(null, null, null, null);
				const { names, resolvedSources } = map;
				return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], segment.length === 5 ? names[segment[NAMES_INDEX]] : null);
			}

			function generatedPositionFor(map, needle) {
				const { source, line, column, bias } = needle;
				return generatedPosition(map, source, line, column, bias || GREATEST_LOWER_BOUND, false);
			}

			function allGeneratedPositionsFor(map, needle) {
				const { source, line, column, bias } = needle;
				return generatedPosition(map, source, line, column, bias || LEAST_UPPER_BOUND, true);
			}

			function eachMapping(map, cb) {
				const decoded = decodedMappings(map);
				const { names, resolvedSources } = map;
				for (let i = 0; i < decoded.length; i++) {
					const line = decoded[i];
					for (let j = 0; j < line.length; j++) {
						const seg = line[j];
						const generatedLine = i + 1;
						const generatedColumn = seg[0];
						let source = null;
						let originalLine = null;
						let originalColumn = null;
						let name = null;
						if (seg.length !== 1) {
							source = resolvedSources[seg[1]];
							originalLine = seg[2] + 1;
							originalColumn = seg[3];
						}
						if (seg.length === 5)
							name = names[seg[4]];
						cb({
							generatedLine,
							generatedColumn,
							source,
							originalLine,
							originalColumn,
							name
						});
					}
				}
			}

			function sourceIndex(map, source) {
				const { sources, resolvedSources } = map;
				let index = sources.indexOf(source);
				if (index === -1)
					index = resolvedSources.indexOf(source);
				return index;
			}

			function sourceContentFor(map, source) {
				const { sourcesContent } = map;
				if (sourcesContent == null)
					return null;
				const index = sourceIndex(map, source);
				return index === -1 ? null : sourcesContent[index];
			}

			function isIgnored(map, source) {
				const { ignoreList } = map;
				if (ignoreList == null)
					return false;
				const index = sourceIndex(map, source);
				return index === -1 ? false : ignoreList.includes(index);
			}

			function presortedDecodedMap(map, mapUrl) {
				const tracer = new TraceMap(clone2(map, []), mapUrl);
				cast(tracer)._decoded = map.mappings;
				return tracer;
			}

			function decodedMap(map) {
				return clone2(map, decodedMappings(map));
			}

			function encodedMap(map) {
				return clone2(map, encodedMappings(map));
			}

			function clone2(map, mappings) {
				return {
					version: map.version,
					file: map.file,
					names: map.names,
					sourceRoot: map.sourceRoot,
					sources: map.sources,
					sourcesContent: map.sourcesContent,
					mappings,
					ignoreList: map.ignoreList || map.x_google_ignoreList
				};
			}

			function OMapping(source, line, column, name) {
				return { source, line, column, name };
			}

			function GMapping(line, column) {
				return { line, column };
			}

			function traceSegmentInternal(segments, memo, line, column, bias) {
				let index = memoizedBinarySearch(segments, column, memo, line);
				if (found) {
					index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index);
				} else if (bias === LEAST_UPPER_BOUND)
					index++;
				if (index === -1 || index === segments.length)
					return -1;
				return index;
			}

			function sliceGeneratedPositions(segments, memo, line, column, bias) {
				let min = traceSegmentInternal(segments, memo, line, column, GREATEST_LOWER_BOUND);
				if (!found && bias === LEAST_UPPER_BOUND)
					min++;
				if (min === -1 || min === segments.length)
					return [];
				const matchedColumn = found ? column : segments[min][COLUMN];
				if (!found)
					min = lowerBound(segments, matchedColumn, min);
				const max = upperBound(segments, matchedColumn, min);
				const result = [];
				for (; min <= max; min++) {
					const segment = segments[min];
					result.push(GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]));
				}
				return result;
			}

			function generatedPosition(map, source, line, column, bias, all) {
				var _a;
				line--;
				if (line < 0)
					throw new Error(LINE_GTR_ZERO);
				if (column < 0)
					throw new Error(COL_GTR_EQ_ZERO);
				const { sources, resolvedSources } = map;
				let sourceIndex2 = sources.indexOf(source);
				if (sourceIndex2 === -1)
					sourceIndex2 = resolvedSources.indexOf(source);
				if (sourceIndex2 === -1)
					return all ? [] : GMapping(null, null);
				const generated2 = (_a = cast(map))._bySources || (_a._bySources = buildBySources(decodedMappings(map), cast(map)._bySourceMemos = sources.map(memoizedState)));
				const segments = generated2[sourceIndex2][line];
				if (segments == null)
					return all ? [] : GMapping(null, null);
				const memo = cast(map)._bySourceMemos[sourceIndex2];
				if (all)
					return sliceGeneratedPositions(segments, memo, line, column, bias);
				const index = traceSegmentInternal(segments, memo, line, column, bias);
				if (index === -1)
					return GMapping(null, null);
				const segment = segments[index];
				return GMapping(segment[REV_GENERATED_LINE] + 1, segment[REV_GENERATED_COLUMN]);
			}

			exports4.AnyMap = AnyMap;
			exports4.GREATEST_LOWER_BOUND = GREATEST_LOWER_BOUND;
			exports4.LEAST_UPPER_BOUND = LEAST_UPPER_BOUND;
			exports4.TraceMap = TraceMap;
			exports4.allGeneratedPositionsFor = allGeneratedPositionsFor;
			exports4.decodedMap = decodedMap;
			exports4.decodedMappings = decodedMappings;
			exports4.eachMapping = eachMapping;
			exports4.encodedMap = encodedMap;
			exports4.encodedMappings = encodedMappings;
			exports4.generatedPositionFor = generatedPositionFor;
			exports4.isIgnored = isIgnored;
			exports4.originalPositionFor = originalPositionFor;
			exports4.presortedDecodedMap = presortedDecodedMap;
			exports4.sourceContentFor = sourceContentFor;
			exports4.traceSegment = traceSegment;
		});
	})(traceMapping_umd, traceMapping_umd.exports);
	(function (module2, exports3) {
		(function (global2, factory) {
			factory(exports3, setArray_umd.exports, sourcemapCodec_umd.exports, traceMapping_umd.exports);
		})(commonjsGlobal, function (exports4, setArray, sourcemapCodec, traceMapping) {
			const COLUMN = 0;
			const SOURCES_INDEX = 1;
			const SOURCE_LINE = 2;
			const SOURCE_COLUMN = 3;
			const NAMES_INDEX = 4;
			const NO_NAME = -1;

			class GenMapping {
				constructor({ file: file2, sourceRoot } = {}) {
					this._names = new setArray.SetArray();
					this._sources = new setArray.SetArray();
					this._sourcesContent = [];
					this._mappings = [];
					this.file = file2;
					this.sourceRoot = sourceRoot;
					this._ignoreList = new setArray.SetArray();
				}
			}

			function cast(map) {
				return map;
			}

			function addSegment(map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) {
				return addSegmentInternal(false, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content);
			}

			function addMapping(map, mapping) {
				return addMappingInternal(false, map, mapping);
			}

			const maybeAddSegment = (map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) => {
				return addSegmentInternal(true, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content);
			};
			const maybeAddMapping = (map, mapping) => {
				return addMappingInternal(true, map, mapping);
			};

			function setSourceContent(map, source, content) {
				const { _sources: sources, _sourcesContent: sourcesContent } = cast(map);
				const index = setArray.put(sources, source);
				sourcesContent[index] = content;
			}

			function setIgnore(map, source, ignore = true) {
				const { _sources: sources, _sourcesContent: sourcesContent, _ignoreList: ignoreList } = cast(map);
				const index = setArray.put(sources, source);
				if (index === sourcesContent.length)
					sourcesContent[index] = null;
				if (ignore)
					setArray.put(ignoreList, index);
				else
					setArray.remove(ignoreList, index);
			}

			function toDecodedMap(map) {
				const {
					_mappings: mappings,
					_sources: sources,
					_sourcesContent: sourcesContent,
					_names: names,
					_ignoreList: ignoreList
				} = cast(map);
				removeEmptyFinalLines(mappings);
				return {
					version: 3,
					file: map.file || void 0,
					names: names.array,
					sourceRoot: map.sourceRoot || void 0,
					sources: sources.array,
					sourcesContent,
					mappings,
					ignoreList: ignoreList.array
				};
			}

			function toEncodedMap(map) {
				const decoded = toDecodedMap(map);
				return Object.assign(Object.assign({}, decoded), { mappings: sourcemapCodec.encode(decoded.mappings) });
			}

			function fromMap(input) {
				const map = new traceMapping.TraceMap(input);
				const gen = new GenMapping({ file: map.file, sourceRoot: map.sourceRoot });
				putAll(cast(gen)._names, map.names);
				putAll(cast(gen)._sources, map.sources);
				cast(gen)._sourcesContent = map.sourcesContent || map.sources.map(() => null);
				cast(gen)._mappings = traceMapping.decodedMappings(map);
				if (map.ignoreList)
					putAll(cast(gen)._ignoreList, map.ignoreList);
				return gen;
			}

			function allMappings(map) {
				const out = [];
				const { _mappings: mappings, _sources: sources, _names: names } = cast(map);
				for (let i = 0; i < mappings.length; i++) {
					const line = mappings[i];
					for (let j = 0; j < line.length; j++) {
						const seg = line[j];
						const generated2 = { line: i + 1, column: seg[COLUMN] };
						let source = void 0;
						let original = void 0;
						let name = void 0;
						if (seg.length !== 1) {
							source = sources.array[seg[SOURCES_INDEX]];
							original = { line: seg[SOURCE_LINE] + 1, column: seg[SOURCE_COLUMN] };
							if (seg.length === 5)
								name = names.array[seg[NAMES_INDEX]];
						}
						out.push({ generated: generated2, source, original, name });
					}
				}
				return out;
			}

			function addSegmentInternal(skipable, map, genLine, genColumn, source, sourceLine, sourceColumn, name, content) {
				const {
					_mappings: mappings,
					_sources: sources,
					_sourcesContent: sourcesContent,
					_names: names
				} = cast(map);
				const line = getLine(mappings, genLine);
				const index = getColumnIndex(line, genColumn);
				if (!source) {
					if (skipable && skipSourceless(line, index))
						return;
					return insert(line, index, [genColumn]);
				}
				const sourcesIndex = setArray.put(sources, source);
				const namesIndex = name ? setArray.put(names, name) : NO_NAME;
				if (sourcesIndex === sourcesContent.length)
					sourcesContent[sourcesIndex] = content !== null && content !== void 0 ? content : null;
				if (skipable && skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex)) {
					return;
				}
				return insert(line, index, name ? [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex] : [genColumn, sourcesIndex, sourceLine, sourceColumn]);
			}

			function getLine(mappings, index) {
				for (let i = mappings.length; i <= index; i++) {
					mappings[i] = [];
				}
				return mappings[index];
			}

			function getColumnIndex(line, genColumn) {
				let index = line.length;
				for (let i = index - 1; i >= 0; index = i--) {
					const current = line[i];
					if (genColumn >= current[COLUMN])
						break;
				}
				return index;
			}

			function insert(array, index, value) {
				for (let i = array.length; i > index; i--) {
					array[i] = array[i - 1];
				}
				array[index] = value;
			}

			function removeEmptyFinalLines(mappings) {
				const { length } = mappings;
				let len = length;
				for (let i = len - 1; i >= 0; len = i, i--) {
					if (mappings[i].length > 0)
						break;
				}
				if (len < length)
					mappings.length = len;
			}

			function putAll(setarr, array) {
				for (let i = 0; i < array.length; i++)
					setArray.put(setarr, array[i]);
			}

			function skipSourceless(line, index) {
				if (index === 0)
					return true;
				const prev = line[index - 1];
				return prev.length === 1;
			}

			function skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex) {
				if (index === 0)
					return false;
				const prev = line[index - 1];
				if (prev.length === 1)
					return false;
				return sourcesIndex === prev[SOURCES_INDEX] && sourceLine === prev[SOURCE_LINE] && sourceColumn === prev[SOURCE_COLUMN] && namesIndex === (prev.length === 5 ? prev[NAMES_INDEX] : NO_NAME);
			}

			function addMappingInternal(skipable, map, mapping) {
				const { generated: generated2, source, original, name, content } = mapping;
				if (!source) {
					return addSegmentInternal(skipable, map, generated2.line - 1, generated2.column, null, null, null, null, null);
				}
				return addSegmentInternal(skipable, map, generated2.line - 1, generated2.column, source, original.line - 1, original.column, name, content);
			}

			exports4.GenMapping = GenMapping;
			exports4.addMapping = addMapping;
			exports4.addSegment = addSegment;
			exports4.allMappings = allMappings;
			exports4.fromMap = fromMap;
			exports4.maybeAddMapping = maybeAddMapping;
			exports4.maybeAddSegment = maybeAddSegment;
			exports4.setIgnore = setIgnore;
			exports4.setSourceContent = setSourceContent;
			exports4.toDecodedMap = toDecodedMap;
			exports4.toEncodedMap = toEncodedMap;
			Object.defineProperty(exports4, "__esModule", { value: true });
		});
	})(genMapping_umd, genMapping_umd.exports);
	Object.defineProperty(sourceMap, "__esModule", {
		value: true
	});
	sourceMap.default = void 0;
	var _genMapping = genMapping_umd.exports;
	var _traceMapping = traceMapping_umd.exports;

	class SourceMap {
		constructor(opts, code) {
			var _opts$sourceFileName;
			this._map = void 0;
			this._rawMappings = void 0;
			this._sourceFileName = void 0;
			this._lastGenLine = 0;
			this._lastSourceLine = 0;
			this._lastSourceColumn = 0;
			this._inputMap = void 0;
			const map = this._map = new _genMapping.GenMapping({
				sourceRoot: opts.sourceRoot
			});
			this._sourceFileName = (_opts$sourceFileName = opts.sourceFileName) == null ? void 0 : _opts$sourceFileName.replace(/\\/g, "/");
			this._rawMappings = void 0;
			if (opts.inputSourceMap) {
				this._inputMap = new _traceMapping.TraceMap(opts.inputSourceMap);
				const resolvedSources = this._inputMap.resolvedSources;
				if (resolvedSources.length) {
					for (let i = 0; i < resolvedSources.length; i++) {
						var _this$_inputMap$sourc;
						(0, _genMapping.setSourceContent)(map, resolvedSources[i], (_this$_inputMap$sourc = this._inputMap.sourcesContent) == null ? void 0 : _this$_inputMap$sourc[i]);
					}
				}
			}
			if (typeof code === "string" && !opts.inputSourceMap) {
				(0, _genMapping.setSourceContent)(map, this._sourceFileName, code);
			} else if (typeof code === "object") {
				for (const sourceFileName of Object.keys(code)) {
					(0, _genMapping.setSourceContent)(map, sourceFileName.replace(/\\/g, "/"), code[sourceFileName]);
				}
			}
		}

		get() {
			return (0, _genMapping.toEncodedMap)(this._map);
		}

		getDecoded() {
			return (0, _genMapping.toDecodedMap)(this._map);
		}

		getRawMappings() {
			return this._rawMappings || (this._rawMappings = (0, _genMapping.allMappings)(this._map));
		}

		mark(generated2, line, column, identifierName, identifierNamePos, filename) {
			var _originalMapping;
			this._rawMappings = void 0;
			let originalMapping;
			if (line != null) {
				if (this._inputMap) {
					originalMapping = (0, _traceMapping.originalPositionFor)(this._inputMap, {
						line,
						column
					});
					if (!originalMapping.name && identifierNamePos) {
						const originalIdentifierMapping = (0, _traceMapping.originalPositionFor)(this._inputMap, identifierNamePos);
						if (originalIdentifierMapping.name) {
							identifierName = originalIdentifierMapping.name;
						}
					}
				} else {
					originalMapping = {
						source: (filename == null ? void 0 : filename.replace(/\\/g, "/")) || this._sourceFileName,
						line,
						column
					};
				}
			}
			(0, _genMapping.maybeAddMapping)(this._map, {
				name: identifierName,
				generated: generated2,
				source: (_originalMapping = originalMapping) == null ? void 0 : _originalMapping.source,
				original: originalMapping
			});
		}
	}

	sourceMap.default = SourceMap;
	var printer = {};
	var buffer = {};
	Object.defineProperty(buffer, "__esModule", {
		value: true
	});
	buffer.default = void 0;

	class Buffer$1 {
		constructor(map, indentChar) {
			this._map = null;
			this._buf = "";
			this._str = "";
			this._appendCount = 0;
			this._last = 0;
			this._queue = [];
			this._queueCursor = 0;
			this._canMarkIdName = true;
			this._indentChar = "";
			this._fastIndentations = [];
			this._position = {
				line: 1,
				column: 0
			};
			this._sourcePosition = {
				identifierName: void 0,
				identifierNamePos: void 0,
				line: void 0,
				column: void 0,
				filename: void 0
			};
			this._map = map;
			this._indentChar = indentChar;
			for (let i = 0; i < 64; i++) {
				this._fastIndentations.push(indentChar.repeat(i));
			}
			this._allocQueue();
		}

		_allocQueue() {
			const queue = this._queue;
			for (let i = 0; i < 16; i++) {
				queue.push({
					char: 0,
					repeat: 1,
					line: void 0,
					column: void 0,
					identifierName: void 0,
					identifierNamePos: void 0,
					filename: ""
				});
			}
		}

		_pushQueue(char, repeat, line, column, filename) {
			const cursor = this._queueCursor;
			if (cursor === this._queue.length) {
				this._allocQueue();
			}
			const item = this._queue[cursor];
			item.char = char;
			item.repeat = repeat;
			item.line = line;
			item.column = column;
			item.filename = filename;
			this._queueCursor++;
		}

		_popQueue() {
			if (this._queueCursor === 0) {
				throw new Error("Cannot pop from empty queue");
			}
			return this._queue[--this._queueCursor];
		}

		get() {
			this._flush();
			const map = this._map;
			const result = {
				code: (this._buf + this._str).trimRight(),
				decodedMap: map == null ? void 0 : map.getDecoded(),
				get __mergedMap() {
					return this.map;
				},
				get map() {
					const resultMap = map ? map.get() : null;
					result.map = resultMap;
					return resultMap;
				},
				set map(value) {
					Object.defineProperty(result, "map", {
						value,
						writable: true
					});
				},
				get rawMappings() {
					const mappings = map == null ? void 0 : map.getRawMappings();
					result.rawMappings = mappings;
					return mappings;
				},
				set rawMappings(value) {
					Object.defineProperty(result, "rawMappings", {
						value,
						writable: true
					});
				}
			};
			return result;
		}

		append(str, maybeNewline) {
			this._flush();
			this._append(str, this._sourcePosition, maybeNewline);
		}

		appendChar(char) {
			this._flush();
			this._appendChar(char, 1, this._sourcePosition);
		}

		queue(char) {
			if (char === 10) {
				while (this._queueCursor !== 0) {
					const char2 = this._queue[this._queueCursor - 1].char;
					if (char2 !== 32 && char2 !== 9) {
						break;
					}
					this._queueCursor--;
				}
			}
			const sourcePosition = this._sourcePosition;
			this._pushQueue(char, 1, sourcePosition.line, sourcePosition.column, sourcePosition.filename);
		}

		queueIndentation(repeat) {
			if (repeat === 0)
				return;
			this._pushQueue(-1, repeat, void 0, void 0, void 0);
		}

		_flush() {
			const queueCursor = this._queueCursor;
			const queue = this._queue;
			for (let i = 0; i < queueCursor; i++) {
				const item = queue[i];
				this._appendChar(item.char, item.repeat, item);
			}
			this._queueCursor = 0;
		}

		_appendChar(char, repeat, sourcePos) {
			this._last = char;
			if (char === -1) {
				const fastIndentation = this._fastIndentations[repeat];
				if (fastIndentation !== void 0) {
					this._str += fastIndentation;
				} else {
					this._str += repeat > 1 ? this._indentChar.repeat(repeat) : this._indentChar;
				}
			} else {
				this._str += repeat > 1 ? String.fromCharCode(char).repeat(repeat) : String.fromCharCode(char);
			}
			if (char !== 10) {
				this._mark(sourcePos.line, sourcePos.column, sourcePos.identifierName, sourcePos.identifierNamePos, sourcePos.filename);
				this._position.column += repeat;
			} else {
				this._position.line++;
				this._position.column = 0;
			}
			if (this._canMarkIdName) {
				sourcePos.identifierName = void 0;
				sourcePos.identifierNamePos = void 0;
			}
		}

		_append(str, sourcePos, maybeNewline) {
			const len = str.length;
			const position = this._position;
			this._last = str.charCodeAt(len - 1);
			if (++this._appendCount > 4096) {
				+this._str;
				this._buf += this._str;
				this._str = str;
				this._appendCount = 0;
			} else {
				this._str += str;
			}
			if (!maybeNewline && !this._map) {
				position.column += len;
				return;
			}
			const {
				column,
				identifierName,
				identifierNamePos,
				filename
			} = sourcePos;
			let line = sourcePos.line;
			if ((identifierName != null || identifierNamePos != null) && this._canMarkIdName) {
				sourcePos.identifierName = void 0;
				sourcePos.identifierNamePos = void 0;
			}
			let i = str.indexOf("\n");
			let last = 0;
			if (i !== 0) {
				this._mark(line, column, identifierName, identifierNamePos, filename);
			}
			while (i !== -1) {
				position.line++;
				position.column = 0;
				last = i + 1;
				if (last < len && line !== void 0) {
					this._mark(++line, 0, null, null, filename);
				}
				i = str.indexOf("\n", last);
			}
			position.column += len - last;
		}

		_mark(line, column, identifierName, identifierNamePos, filename) {
			var _this$_map;
			(_this$_map = this._map) == null || _this$_map.mark(this._position, line, column, identifierName, identifierNamePos, filename);
		}

		removeTrailingNewline() {
			const queueCursor = this._queueCursor;
			if (queueCursor !== 0 && this._queue[queueCursor - 1].char === 10) {
				this._queueCursor--;
			}
		}

		removeLastSemicolon() {
			const queueCursor = this._queueCursor;
			if (queueCursor !== 0 && this._queue[queueCursor - 1].char === 59) {
				this._queueCursor--;
			}
		}

		getLastChar() {
			const queueCursor = this._queueCursor;
			return queueCursor !== 0 ? this._queue[queueCursor - 1].char : this._last;
		}

		getNewlineCount() {
			const queueCursor = this._queueCursor;
			let count = 0;
			if (queueCursor === 0)
				return this._last === 10 ? 1 : 0;
			for (let i = queueCursor - 1; i >= 0; i--) {
				if (this._queue[i].char !== 10) {
					break;
				}
				count++;
			}
			return count === queueCursor && this._last === 10 ? count + 1 : count;
		}

		endsWithCharAndNewline() {
			const queue = this._queue;
			const queueCursor = this._queueCursor;
			if (queueCursor !== 0) {
				const lastCp = queue[queueCursor - 1].char;
				if (lastCp !== 10)
					return;
				if (queueCursor > 1) {
					return queue[queueCursor - 2].char;
				} else {
					return this._last;
				}
			}
		}

		hasContent() {
			return this._queueCursor !== 0 || !!this._last;
		}

		exactSource(loc, cb) {
			if (!this._map) {
				cb();
				return;
			}
			this.source("start", loc);
			const identifierName = loc.identifierName;
			const sourcePos = this._sourcePosition;
			if (identifierName) {
				this._canMarkIdName = false;
				sourcePos.identifierName = identifierName;
			}
			cb();
			if (identifierName) {
				this._canMarkIdName = true;
				sourcePos.identifierName = void 0;
				sourcePos.identifierNamePos = void 0;
			}
			this.source("end", loc);
		}

		source(prop, loc) {
			if (!this._map)
				return;
			this._normalizePosition(prop, loc, 0);
		}

		sourceWithOffset(prop, loc, columnOffset) {
			if (!this._map)
				return;
			this._normalizePosition(prop, loc, columnOffset);
		}

		_normalizePosition(prop, loc, columnOffset) {
			const pos = loc[prop];
			const target = this._sourcePosition;
			if (pos) {
				target.line = pos.line;
				target.column = Math.max(pos.column + columnOffset, 0);
				target.filename = loc.filename;
			}
		}

		getCurrentColumn() {
			const queue = this._queue;
			const queueCursor = this._queueCursor;
			let lastIndex = -1;
			let len = 0;
			for (let i = 0; i < queueCursor; i++) {
				const item = queue[i];
				if (item.char === 10) {
					lastIndex = len;
				}
				len += item.repeat;
			}
			return lastIndex === -1 ? this._position.column + len : len - 1 - lastIndex;
		}

		getCurrentLine() {
			let count = 0;
			const queue = this._queue;
			for (let i = 0; i < this._queueCursor; i++) {
				if (queue[i].char === 10) {
					count++;
				}
			}
			return this._position.line + count;
		}
	}

	buffer.default = Buffer$1;
	var node = {};
	var whitespace$1 = {};
	var lib$2 = {};
	var isReactComponent$1 = {};
	var buildMatchMemberExpression$1 = {};
	var matchesPattern$1 = {};
	var generated$3 = {};
	var shallowEqual$1 = {};
	Object.defineProperty(shallowEqual$1, "__esModule", {
		value: true
	});
	shallowEqual$1.default = shallowEqual;

	function shallowEqual(actual, expected) {
		const keys2 = Object.keys(expected);
		for (const key of keys2) {
			if (actual[key] !== expected[key]) {
				return false;
			}
		}
		return true;
	}

	var deprecationWarning$1 = {};
	Object.defineProperty(deprecationWarning$1, "__esModule", {
		value: true
	});
	deprecationWarning$1.default = deprecationWarning;
	const warnings = /* @__PURE__ */ new Set();

	function deprecationWarning(oldName, newName, prefix = "") {
		if (warnings.has(oldName))
			return;
		warnings.add(oldName);
		const {
			internal,
			trace
		} = captureShortStackTrace(1, 2);
		if (internal) {
			return;
		}
		console.warn(`${prefix}\`${oldName}\` has been deprecated, please migrate to \`${newName}\`
${trace}`);
	}

	function captureShortStackTrace(skip, length) {
		const {
			stackTraceLimit,
			prepareStackTrace
		} = Error;
		let stackTrace;
		Error.stackTraceLimit = 1 + skip + length;
		Error.prepareStackTrace = function (err, stack) {
			stackTrace = stack;
		};
		new Error().stack;
		Error.stackTraceLimit = stackTraceLimit;
		Error.prepareStackTrace = prepareStackTrace;
		if (!stackTrace)
			return {
				internal: false,
				trace: ""
			};
		const shortStackTrace = stackTrace.slice(1 + skip, 1 + skip + length);
		return {
			internal: /[\\/]@babel[\\/]/.test(shortStackTrace[1].getFileName()),
			trace: shortStackTrace.map((frame) => `    at ${frame}`).join("\n")
		};
	}

	Object.defineProperty(generated$3, "__esModule", {
		value: true
	});
	generated$3.isAccessor = isAccessor;
	generated$3.isAnyTypeAnnotation = isAnyTypeAnnotation;
	generated$3.isArgumentPlaceholder = isArgumentPlaceholder;
	generated$3.isArrayExpression = isArrayExpression$1;
	generated$3.isArrayPattern = isArrayPattern;
	generated$3.isArrayTypeAnnotation = isArrayTypeAnnotation$1;
	generated$3.isArrowFunctionExpression = isArrowFunctionExpression;
	generated$3.isAssignmentExpression = isAssignmentExpression$1;
	generated$3.isAssignmentPattern = isAssignmentPattern$1;
	generated$3.isAwaitExpression = isAwaitExpression;
	generated$3.isBigIntLiteral = isBigIntLiteral;
	generated$3.isBinary = isBinary$1;
	generated$3.isBinaryExpression = isBinaryExpression$1;
	generated$3.isBindExpression = isBindExpression;
	generated$3.isBlock = isBlock;
	generated$3.isBlockParent = isBlockParent;
	generated$3.isBlockStatement = isBlockStatement$1;
	generated$3.isBooleanLiteral = isBooleanLiteral;
	generated$3.isBooleanLiteralTypeAnnotation = isBooleanLiteralTypeAnnotation;
	generated$3.isBooleanTypeAnnotation = isBooleanTypeAnnotation;
	generated$3.isBreakStatement = isBreakStatement;
	generated$3.isCallExpression = isCallExpression$4;
	generated$3.isCatchClause = isCatchClause;
	generated$3.isClass = isClass;
	generated$3.isClassAccessorProperty = isClassAccessorProperty;
	generated$3.isClassBody = isClassBody$1;
	generated$3.isClassDeclaration = isClassDeclaration$1;
	generated$3.isClassExpression = isClassExpression;
	generated$3.isClassImplements = isClassImplements;
	generated$3.isClassMethod = isClassMethod;
	generated$3.isClassPrivateMethod = isClassPrivateMethod;
	generated$3.isClassPrivateProperty = isClassPrivateProperty;
	generated$3.isClassProperty = isClassProperty;
	generated$3.isCompletionStatement = isCompletionStatement;
	generated$3.isConditional = isConditional;
	generated$3.isConditionalExpression = isConditionalExpression;
	generated$3.isContinueStatement = isContinueStatement;
	generated$3.isDebuggerStatement = isDebuggerStatement;
	generated$3.isDecimalLiteral = isDecimalLiteral;
	generated$3.isDeclaration = isDeclaration;
	generated$3.isDeclareClass = isDeclareClass;
	generated$3.isDeclareExportAllDeclaration = isDeclareExportAllDeclaration;
	generated$3.isDeclareExportDeclaration = isDeclareExportDeclaration;
	generated$3.isDeclareFunction = isDeclareFunction;
	generated$3.isDeclareInterface = isDeclareInterface;
	generated$3.isDeclareModule = isDeclareModule;
	generated$3.isDeclareModuleExports = isDeclareModuleExports;
	generated$3.isDeclareOpaqueType = isDeclareOpaqueType;
	generated$3.isDeclareTypeAlias = isDeclareTypeAlias;
	generated$3.isDeclareVariable = isDeclareVariable;
	generated$3.isDeclaredPredicate = isDeclaredPredicate;
	generated$3.isDecorator = isDecorator$1;
	generated$3.isDirective = isDirective;
	generated$3.isDirectiveLiteral = isDirectiveLiteral;
	generated$3.isDoExpression = isDoExpression;
	generated$3.isDoWhileStatement = isDoWhileStatement;
	generated$3.isEmptyStatement = isEmptyStatement;
	generated$3.isEmptyTypeAnnotation = isEmptyTypeAnnotation;
	generated$3.isEnumBody = isEnumBody;
	generated$3.isEnumBooleanBody = isEnumBooleanBody;
	generated$3.isEnumBooleanMember = isEnumBooleanMember;
	generated$3.isEnumDeclaration = isEnumDeclaration;
	generated$3.isEnumDefaultedMember = isEnumDefaultedMember;
	generated$3.isEnumMember = isEnumMember;
	generated$3.isEnumNumberBody = isEnumNumberBody;
	generated$3.isEnumNumberMember = isEnumNumberMember;
	generated$3.isEnumStringBody = isEnumStringBody;
	generated$3.isEnumStringMember = isEnumStringMember;
	generated$3.isEnumSymbolBody = isEnumSymbolBody;
	generated$3.isExistsTypeAnnotation = isExistsTypeAnnotation;
	generated$3.isExportAllDeclaration = isExportAllDeclaration;
	generated$3.isExportDeclaration = isExportDeclaration;
	generated$3.isExportDefaultDeclaration = isExportDefaultDeclaration$1;
	generated$3.isExportDefaultSpecifier = isExportDefaultSpecifier$1;
	generated$3.isExportNamedDeclaration = isExportNamedDeclaration$1;
	generated$3.isExportNamespaceSpecifier = isExportNamespaceSpecifier$1;
	generated$3.isExportSpecifier = isExportSpecifier;
	generated$3.isExpression = isExpression$1;
	generated$3.isExpressionStatement = isExpressionStatement$1;
	generated$3.isExpressionWrapper = isExpressionWrapper;
	generated$3.isFile = isFile;
	generated$3.isFlow = isFlow;
	generated$3.isFlowBaseAnnotation = isFlowBaseAnnotation;
	generated$3.isFlowDeclaration = isFlowDeclaration;
	generated$3.isFlowPredicate = isFlowPredicate;
	generated$3.isFlowType = isFlowType;
	generated$3.isFor = isFor$1;
	generated$3.isForInStatement = isForInStatement;
	generated$3.isForOfStatement = isForOfStatement$1;
	generated$3.isForStatement = isForStatement$1;
	generated$3.isForXStatement = isForXStatement;
	generated$3.isFunction = isFunction$3;
	generated$3.isFunctionDeclaration = isFunctionDeclaration;
	generated$3.isFunctionExpression = isFunctionExpression;
	generated$3.isFunctionParent = isFunctionParent;
	generated$3.isFunctionTypeAnnotation = isFunctionTypeAnnotation;
	generated$3.isFunctionTypeParam = isFunctionTypeParam;
	generated$3.isGenericTypeAnnotation = isGenericTypeAnnotation;
	generated$3.isIdentifier = isIdentifier$3;
	generated$3.isIfStatement = isIfStatement$1;
	generated$3.isImmutable = isImmutable$2;
	generated$3.isImport = isImport;
	generated$3.isImportAttribute = isImportAttribute;
	generated$3.isImportDeclaration = isImportDeclaration;
	generated$3.isImportDefaultSpecifier = isImportDefaultSpecifier$1;
	generated$3.isImportExpression = isImportExpression;
	generated$3.isImportNamespaceSpecifier = isImportNamespaceSpecifier$1;
	generated$3.isImportOrExportDeclaration = isImportOrExportDeclaration;
	generated$3.isImportSpecifier = isImportSpecifier;
	generated$3.isIndexedAccessType = isIndexedAccessType$1;
	generated$3.isInferredPredicate = isInferredPredicate;
	generated$3.isInterfaceDeclaration = isInterfaceDeclaration;
	generated$3.isInterfaceExtends = isInterfaceExtends;
	generated$3.isInterfaceTypeAnnotation = isInterfaceTypeAnnotation;
	generated$3.isInterpreterDirective = isInterpreterDirective;
	generated$3.isIntersectionTypeAnnotation = isIntersectionTypeAnnotation;
	generated$3.isJSX = isJSX;
	generated$3.isJSXAttribute = isJSXAttribute;
	generated$3.isJSXClosingElement = isJSXClosingElement;
	generated$3.isJSXClosingFragment = isJSXClosingFragment;
	generated$3.isJSXElement = isJSXElement;
	generated$3.isJSXEmptyExpression = isJSXEmptyExpression;
	generated$3.isJSXExpressionContainer = isJSXExpressionContainer;
	generated$3.isJSXFragment = isJSXFragment;
	generated$3.isJSXIdentifier = isJSXIdentifier;
	generated$3.isJSXMemberExpression = isJSXMemberExpression;
	generated$3.isJSXNamespacedName = isJSXNamespacedName;
	generated$3.isJSXOpeningElement = isJSXOpeningElement;
	generated$3.isJSXOpeningFragment = isJSXOpeningFragment;
	generated$3.isJSXSpreadAttribute = isJSXSpreadAttribute;
	generated$3.isJSXSpreadChild = isJSXSpreadChild;
	generated$3.isJSXText = isJSXText;
	generated$3.isLVal = isLVal;
	generated$3.isLabeledStatement = isLabeledStatement;
	generated$3.isLiteral = isLiteral$2;
	generated$3.isLogicalExpression = isLogicalExpression;
	generated$3.isLoop = isLoop;
	generated$3.isMemberExpression = isMemberExpression$4;
	generated$3.isMetaProperty = isMetaProperty;
	generated$3.isMethod = isMethod;
	generated$3.isMiscellaneous = isMiscellaneous;
	generated$3.isMixedTypeAnnotation = isMixedTypeAnnotation;
	generated$3.isModuleDeclaration = isModuleDeclaration;
	generated$3.isModuleExpression = isModuleExpression;
	generated$3.isModuleSpecifier = isModuleSpecifier;
	generated$3.isNewExpression = isNewExpression$2;
	generated$3.isNoop = isNoop;
	generated$3.isNullLiteral = isNullLiteral;
	generated$3.isNullLiteralTypeAnnotation = isNullLiteralTypeAnnotation;
	generated$3.isNullableTypeAnnotation = isNullableTypeAnnotation;
	generated$3.isNumberLiteral = isNumberLiteral;
	generated$3.isNumberLiteralTypeAnnotation = isNumberLiteralTypeAnnotation;
	generated$3.isNumberTypeAnnotation = isNumberTypeAnnotation;
	generated$3.isNumericLiteral = isNumericLiteral;
	generated$3.isObjectExpression = isObjectExpression$1;
	generated$3.isObjectMember = isObjectMember;
	generated$3.isObjectMethod = isObjectMethod;
	generated$3.isObjectPattern = isObjectPattern$1;
	generated$3.isObjectProperty = isObjectProperty;
	generated$3.isObjectTypeAnnotation = isObjectTypeAnnotation;
	generated$3.isObjectTypeCallProperty = isObjectTypeCallProperty;
	generated$3.isObjectTypeIndexer = isObjectTypeIndexer;
	generated$3.isObjectTypeInternalSlot = isObjectTypeInternalSlot;
	generated$3.isObjectTypeProperty = isObjectTypeProperty;
	generated$3.isObjectTypeSpreadProperty = isObjectTypeSpreadProperty;
	generated$3.isOpaqueType = isOpaqueType;
	generated$3.isOptionalCallExpression = isOptionalCallExpression$1;
	generated$3.isOptionalIndexedAccessType = isOptionalIndexedAccessType;
	generated$3.isOptionalMemberExpression = isOptionalMemberExpression$2;
	generated$3.isParenthesizedExpression = isParenthesizedExpression$1;
	generated$3.isPattern = isPattern$1;
	generated$3.isPatternLike = isPatternLike;
	generated$3.isPipelineBareFunction = isPipelineBareFunction;
	generated$3.isPipelinePrimaryTopicReference = isPipelinePrimaryTopicReference;
	generated$3.isPipelineTopicExpression = isPipelineTopicExpression;
	generated$3.isPlaceholder = isPlaceholder;
	generated$3.isPrivate = isPrivate;
	generated$3.isPrivateName = isPrivateName;
	generated$3.isProgram = isProgram;
	generated$3.isProperty = isProperty;
	generated$3.isPureish = isPureish;
	generated$3.isQualifiedTypeIdentifier = isQualifiedTypeIdentifier;
	generated$3.isRecordExpression = isRecordExpression;
	generated$3.isRegExpLiteral = isRegExpLiteral;
	generated$3.isRegexLiteral = isRegexLiteral;
	generated$3.isRestElement = isRestElement;
	generated$3.isRestProperty = isRestProperty;
	generated$3.isReturnStatement = isReturnStatement;
	generated$3.isScopable = isScopable;
	generated$3.isSequenceExpression = isSequenceExpression;
	generated$3.isSpreadElement = isSpreadElement;
	generated$3.isSpreadProperty = isSpreadProperty;
	generated$3.isStandardized = isStandardized;
	generated$3.isStatement = isStatement$4;
	generated$3.isStaticBlock = isStaticBlock;
	generated$3.isStringLiteral = isStringLiteral$1;
	generated$3.isStringLiteralTypeAnnotation = isStringLiteralTypeAnnotation;
	generated$3.isStringTypeAnnotation = isStringTypeAnnotation;
	generated$3.isSuper = isSuper;
	generated$3.isSwitchCase = isSwitchCase;
	generated$3.isSwitchStatement = isSwitchStatement;
	generated$3.isSymbolTypeAnnotation = isSymbolTypeAnnotation;
	generated$3.isTSAnyKeyword = isTSAnyKeyword;
	generated$3.isTSArrayType = isTSArrayType;
	generated$3.isTSAsExpression = isTSAsExpression;
	generated$3.isTSBaseType = isTSBaseType;
	generated$3.isTSBigIntKeyword = isTSBigIntKeyword;
	generated$3.isTSBooleanKeyword = isTSBooleanKeyword;
	generated$3.isTSCallSignatureDeclaration = isTSCallSignatureDeclaration;
	generated$3.isTSConditionalType = isTSConditionalType;
	generated$3.isTSConstructSignatureDeclaration = isTSConstructSignatureDeclaration;
	generated$3.isTSConstructorType = isTSConstructorType;
	generated$3.isTSDeclareFunction = isTSDeclareFunction;
	generated$3.isTSDeclareMethod = isTSDeclareMethod;
	generated$3.isTSEntityName = isTSEntityName;
	generated$3.isTSEnumBody = isTSEnumBody;
	generated$3.isTSEnumDeclaration = isTSEnumDeclaration;
	generated$3.isTSEnumMember = isTSEnumMember$1;
	generated$3.isTSExportAssignment = isTSExportAssignment;
	generated$3.isTSExpressionWithTypeArguments = isTSExpressionWithTypeArguments;
	generated$3.isTSExternalModuleReference = isTSExternalModuleReference;
	generated$3.isTSFunctionType = isTSFunctionType;
	generated$3.isTSImportEqualsDeclaration = isTSImportEqualsDeclaration;
	generated$3.isTSImportType = isTSImportType;
	generated$3.isTSIndexSignature = isTSIndexSignature;
	generated$3.isTSIndexedAccessType = isTSIndexedAccessType;
	generated$3.isTSInferType = isTSInferType;
	generated$3.isTSInstantiationExpression = isTSInstantiationExpression;
	generated$3.isTSInterfaceBody = isTSInterfaceBody$1;
	generated$3.isTSInterfaceDeclaration = isTSInterfaceDeclaration;
	generated$3.isTSIntersectionType = isTSIntersectionType;
	generated$3.isTSIntrinsicKeyword = isTSIntrinsicKeyword;
	generated$3.isTSLiteralType = isTSLiteralType;
	generated$3.isTSMappedType = isTSMappedType;
	generated$3.isTSMethodSignature = isTSMethodSignature;
	generated$3.isTSModuleBlock = isTSModuleBlock;
	generated$3.isTSModuleDeclaration = isTSModuleDeclaration;
	generated$3.isTSNamedTupleMember = isTSNamedTupleMember;
	generated$3.isTSNamespaceExportDeclaration = isTSNamespaceExportDeclaration;
	generated$3.isTSNeverKeyword = isTSNeverKeyword;
	generated$3.isTSNonNullExpression = isTSNonNullExpression;
	generated$3.isTSNullKeyword = isTSNullKeyword;
	generated$3.isTSNumberKeyword = isTSNumberKeyword;
	generated$3.isTSObjectKeyword = isTSObjectKeyword;
	generated$3.isTSOptionalType = isTSOptionalType;
	generated$3.isTSParameterProperty = isTSParameterProperty;
	generated$3.isTSParenthesizedType = isTSParenthesizedType;
	generated$3.isTSPropertySignature = isTSPropertySignature;
	generated$3.isTSQualifiedName = isTSQualifiedName;
	generated$3.isTSRestType = isTSRestType;
	generated$3.isTSSatisfiesExpression = isTSSatisfiesExpression;
	generated$3.isTSStringKeyword = isTSStringKeyword;
	generated$3.isTSSymbolKeyword = isTSSymbolKeyword;
	generated$3.isTSTemplateLiteralType = isTSTemplateLiteralType;
	generated$3.isTSThisType = isTSThisType;
	generated$3.isTSTupleType = isTSTupleType;
	generated$3.isTSType = isTSType;
	generated$3.isTSTypeAliasDeclaration = isTSTypeAliasDeclaration;
	generated$3.isTSTypeAnnotation = isTSTypeAnnotation;
	generated$3.isTSTypeAssertion = isTSTypeAssertion;
	generated$3.isTSTypeElement = isTSTypeElement;
	generated$3.isTSTypeLiteral = isTSTypeLiteral;
	generated$3.isTSTypeOperator = isTSTypeOperator;
	generated$3.isTSTypeParameter = isTSTypeParameter;
	generated$3.isTSTypeParameterDeclaration = isTSTypeParameterDeclaration;
	generated$3.isTSTypeParameterInstantiation = isTSTypeParameterInstantiation;
	generated$3.isTSTypePredicate = isTSTypePredicate;
	generated$3.isTSTypeQuery = isTSTypeQuery;
	generated$3.isTSTypeReference = isTSTypeReference;
	generated$3.isTSUndefinedKeyword = isTSUndefinedKeyword;
	generated$3.isTSUnionType = isTSUnionType;
	generated$3.isTSUnknownKeyword = isTSUnknownKeyword;
	generated$3.isTSVoidKeyword = isTSVoidKeyword;
	generated$3.isTaggedTemplateExpression = isTaggedTemplateExpression;
	generated$3.isTemplateElement = isTemplateElement;
	generated$3.isTemplateLiteral = isTemplateLiteral;
	generated$3.isTerminatorless = isTerminatorless;
	generated$3.isThisExpression = isThisExpression;
	generated$3.isThisTypeAnnotation = isThisTypeAnnotation;
	generated$3.isThrowStatement = isThrowStatement;
	generated$3.isTopicReference = isTopicReference;
	generated$3.isTryStatement = isTryStatement;
	generated$3.isTupleExpression = isTupleExpression;
	generated$3.isTupleTypeAnnotation = isTupleTypeAnnotation;
	generated$3.isTypeAlias = isTypeAlias;
	generated$3.isTypeAnnotation = isTypeAnnotation;
	generated$3.isTypeCastExpression = isTypeCastExpression;
	generated$3.isTypeParameter = isTypeParameter;
	generated$3.isTypeParameterDeclaration = isTypeParameterDeclaration;
	generated$3.isTypeParameterInstantiation = isTypeParameterInstantiation;
	generated$3.isTypeScript = isTypeScript;
	generated$3.isTypeofTypeAnnotation = isTypeofTypeAnnotation;
	generated$3.isUnaryExpression = isUnaryExpression;
	generated$3.isUnaryLike = isUnaryLike;
	generated$3.isUnionTypeAnnotation = isUnionTypeAnnotation;
	generated$3.isUpdateExpression = isUpdateExpression;
	generated$3.isUserWhitespacable = isUserWhitespacable;
	generated$3.isV8IntrinsicIdentifier = isV8IntrinsicIdentifier;
	generated$3.isVariableDeclaration = isVariableDeclaration;
	generated$3.isVariableDeclarator = isVariableDeclarator;
	generated$3.isVariance = isVariance;
	generated$3.isVoidTypeAnnotation = isVoidTypeAnnotation;
	generated$3.isWhile = isWhile;
	generated$3.isWhileStatement = isWhileStatement;
	generated$3.isWithStatement = isWithStatement;
	generated$3.isYieldExpression = isYieldExpression$1;
	var _shallowEqual$1 = shallowEqual$1;
	var _deprecationWarning$2 = deprecationWarning$1;

	function isArrayExpression$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ArrayExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isAssignmentExpression$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "AssignmentExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBinaryExpression$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "BinaryExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isInterpreterDirective(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "InterpreterDirective")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDirective(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "Directive")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDirectiveLiteral(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DirectiveLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBlockStatement$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "BlockStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBreakStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "BreakStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isCallExpression$4(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "CallExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isCatchClause(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "CatchClause")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isConditionalExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ConditionalExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isContinueStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ContinueStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDebuggerStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DebuggerStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDoWhileStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DoWhileStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEmptyStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EmptyStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExpressionStatement$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ExpressionStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFile(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "File")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isForInStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ForInStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isForStatement$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ForStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFunctionDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "FunctionDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFunctionExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "FunctionExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isIdentifier$3(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "Identifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isIfStatement$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "IfStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isLabeledStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "LabeledStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isStringLiteral$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "StringLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isNumericLiteral(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "NumericLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isNullLiteral(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "NullLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBooleanLiteral(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "BooleanLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isRegExpLiteral(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "RegExpLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isLogicalExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "LogicalExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isMemberExpression$4(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "MemberExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isNewExpression$2(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "NewExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isProgram(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "Program")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectExpression$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectMethod(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectMethod")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectProperty(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isRestElement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "RestElement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isReturnStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ReturnStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isSequenceExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "SequenceExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isParenthesizedExpression$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ParenthesizedExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isSwitchCase(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "SwitchCase")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isSwitchStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "SwitchStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isThisExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ThisExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isThrowStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ThrowStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTryStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TryStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isUnaryExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "UnaryExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isUpdateExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "UpdateExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isVariableDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "VariableDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isVariableDeclarator(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "VariableDeclarator")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isWhileStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "WhileStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isWithStatement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "WithStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isAssignmentPattern$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "AssignmentPattern")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isArrayPattern(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ArrayPattern")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isArrowFunctionExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ArrowFunctionExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClassBody$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ClassBody")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClassExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ClassExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClassDeclaration$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ClassDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExportAllDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ExportAllDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExportDefaultDeclaration$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ExportDefaultDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExportNamedDeclaration$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ExportNamedDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExportSpecifier(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ExportSpecifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isForOfStatement$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ForOfStatement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isImportDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ImportDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isImportDefaultSpecifier$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ImportDefaultSpecifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isImportNamespaceSpecifier$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ImportNamespaceSpecifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isImportSpecifier(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ImportSpecifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isImportExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ImportExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isMetaProperty(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "MetaProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClassMethod(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ClassMethod")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectPattern$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectPattern")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isSpreadElement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "SpreadElement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isSuper(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "Super")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTaggedTemplateExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TaggedTemplateExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTemplateElement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TemplateElement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTemplateLiteral(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TemplateLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isYieldExpression$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "YieldExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isAwaitExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "AwaitExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isImport(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "Import")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBigIntLiteral(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "BigIntLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExportNamespaceSpecifier$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ExportNamespaceSpecifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isOptionalMemberExpression$2(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "OptionalMemberExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isOptionalCallExpression$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "OptionalCallExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClassProperty(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ClassProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClassAccessorProperty(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ClassAccessorProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClassPrivateProperty(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ClassPrivateProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClassPrivateMethod(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ClassPrivateMethod")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isPrivateName(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "PrivateName")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isStaticBlock(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "StaticBlock")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isAnyTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "AnyTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isArrayTypeAnnotation$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ArrayTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBooleanTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "BooleanTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBooleanLiteralTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "BooleanLiteralTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isNullLiteralTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "NullLiteralTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClassImplements(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ClassImplements")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareClass(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareClass")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareFunction(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareFunction")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareInterface(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareInterface")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareModule(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareModule")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareModuleExports(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareModuleExports")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareTypeAlias(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareTypeAlias")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareOpaqueType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareOpaqueType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareVariable(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareVariable")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareExportDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareExportDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclareExportAllDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclareExportAllDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclaredPredicate(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DeclaredPredicate")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExistsTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ExistsTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFunctionTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "FunctionTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFunctionTypeParam(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "FunctionTypeParam")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isGenericTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "GenericTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isInferredPredicate(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "InferredPredicate")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isInterfaceExtends(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "InterfaceExtends")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isInterfaceDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "InterfaceDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isInterfaceTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "InterfaceTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isIntersectionTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "IntersectionTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isMixedTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "MixedTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEmptyTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EmptyTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isNullableTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "NullableTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isNumberLiteralTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "NumberLiteralTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isNumberTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "NumberTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectTypeInternalSlot(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectTypeInternalSlot")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectTypeCallProperty(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectTypeCallProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectTypeIndexer(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectTypeIndexer")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectTypeProperty(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectTypeProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectTypeSpreadProperty(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ObjectTypeSpreadProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isOpaqueType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "OpaqueType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isQualifiedTypeIdentifier(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "QualifiedTypeIdentifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isStringLiteralTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "StringLiteralTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isStringTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "StringTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isSymbolTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "SymbolTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isThisTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ThisTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTupleTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TupleTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTypeofTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TypeofTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTypeAlias(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TypeAlias")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTypeCastExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TypeCastExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTypeParameter(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TypeParameter")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTypeParameterDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TypeParameterDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTypeParameterInstantiation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TypeParameterInstantiation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isUnionTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "UnionTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isVariance(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "Variance")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isVoidTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "VoidTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EnumDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumBooleanBody(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EnumBooleanBody")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumNumberBody(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EnumNumberBody")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumStringBody(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EnumStringBody")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumSymbolBody(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EnumSymbolBody")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumBooleanMember(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EnumBooleanMember")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumNumberMember(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EnumNumberMember")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumStringMember(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EnumStringMember")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumDefaultedMember(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "EnumDefaultedMember")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isIndexedAccessType$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "IndexedAccessType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isOptionalIndexedAccessType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "OptionalIndexedAccessType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXAttribute(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXAttribute")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXClosingElement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXClosingElement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXElement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXElement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXEmptyExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXEmptyExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXExpressionContainer(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXExpressionContainer")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXSpreadChild(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXSpreadChild")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXIdentifier(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXIdentifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXMemberExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXMemberExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXNamespacedName(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXNamespacedName")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXOpeningElement(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXOpeningElement")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXSpreadAttribute(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXSpreadAttribute")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXText(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXText")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXFragment(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXFragment")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXOpeningFragment(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXOpeningFragment")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSXClosingFragment(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "JSXClosingFragment")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isNoop(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "Noop")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isPlaceholder(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "Placeholder")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isV8IntrinsicIdentifier(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "V8IntrinsicIdentifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isArgumentPlaceholder(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ArgumentPlaceholder")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBindExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "BindExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isImportAttribute(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ImportAttribute")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDecorator$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "Decorator")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDoExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DoExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExportDefaultSpecifier$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ExportDefaultSpecifier")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isRecordExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "RecordExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTupleExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TupleExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDecimalLiteral(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "DecimalLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isModuleExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "ModuleExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTopicReference(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TopicReference")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isPipelineTopicExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "PipelineTopicExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isPipelineBareFunction(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "PipelineBareFunction")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isPipelinePrimaryTopicReference(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "PipelinePrimaryTopicReference")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSParameterProperty(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSParameterProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSDeclareFunction(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSDeclareFunction")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSDeclareMethod(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSDeclareMethod")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSQualifiedName(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSQualifiedName")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSCallSignatureDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSCallSignatureDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSConstructSignatureDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSConstructSignatureDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSPropertySignature(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSPropertySignature")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSMethodSignature(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSMethodSignature")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSIndexSignature(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSIndexSignature")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSAnyKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSAnyKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSBooleanKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSBooleanKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSBigIntKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSBigIntKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSIntrinsicKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSIntrinsicKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSNeverKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSNeverKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSNullKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSNullKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSNumberKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSNumberKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSObjectKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSObjectKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSStringKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSStringKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSSymbolKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSSymbolKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSUndefinedKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSUndefinedKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSUnknownKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSUnknownKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSVoidKeyword(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSVoidKeyword")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSThisType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSThisType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSFunctionType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSFunctionType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSConstructorType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSConstructorType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeReference(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeReference")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypePredicate(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypePredicate")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeQuery(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeQuery")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeLiteral(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSArrayType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSArrayType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTupleType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTupleType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSOptionalType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSOptionalType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSRestType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSRestType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSNamedTupleMember(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSNamedTupleMember")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSUnionType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSUnionType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSIntersectionType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSIntersectionType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSConditionalType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSConditionalType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSInferType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSInferType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSParenthesizedType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSParenthesizedType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeOperator(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeOperator")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSIndexedAccessType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSIndexedAccessType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSMappedType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSMappedType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTemplateLiteralType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTemplateLiteralType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSLiteralType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSLiteralType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSExpressionWithTypeArguments(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSExpressionWithTypeArguments")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSInterfaceDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSInterfaceDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSInterfaceBody$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSInterfaceBody")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeAliasDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeAliasDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSInstantiationExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSInstantiationExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSAsExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSAsExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSSatisfiesExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSSatisfiesExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeAssertion(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeAssertion")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSEnumBody(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSEnumBody")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSEnumDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSEnumDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSEnumMember$1(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSEnumMember")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSModuleDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSModuleDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSModuleBlock(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSModuleBlock")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSImportType(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSImportType")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSImportEqualsDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSImportEqualsDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSExternalModuleReference(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSExternalModuleReference")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSNonNullExpression(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSNonNullExpression")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSExportAssignment(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSExportAssignment")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSNamespaceExportDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSNamespaceExportDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeAnnotation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeAnnotation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeParameterInstantiation(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeParameterInstantiation")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeParameterDeclaration(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeParameterDeclaration")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeParameter(node2, opts) {
		if (!node2)
			return false;
		if (node2.type !== "TSTypeParameter")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isStandardized(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ArrayExpression":
			case "AssignmentExpression":
			case "BinaryExpression":
			case "InterpreterDirective":
			case "Directive":
			case "DirectiveLiteral":
			case "BlockStatement":
			case "BreakStatement":
			case "CallExpression":
			case "CatchClause":
			case "ConditionalExpression":
			case "ContinueStatement":
			case "DebuggerStatement":
			case "DoWhileStatement":
			case "EmptyStatement":
			case "ExpressionStatement":
			case "File":
			case "ForInStatement":
			case "ForStatement":
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "Identifier":
			case "IfStatement":
			case "LabeledStatement":
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "RegExpLiteral":
			case "LogicalExpression":
			case "MemberExpression":
			case "NewExpression":
			case "Program":
			case "ObjectExpression":
			case "ObjectMethod":
			case "ObjectProperty":
			case "RestElement":
			case "ReturnStatement":
			case "SequenceExpression":
			case "ParenthesizedExpression":
			case "SwitchCase":
			case "SwitchStatement":
			case "ThisExpression":
			case "ThrowStatement":
			case "TryStatement":
			case "UnaryExpression":
			case "UpdateExpression":
			case "VariableDeclaration":
			case "VariableDeclarator":
			case "WhileStatement":
			case "WithStatement":
			case "AssignmentPattern":
			case "ArrayPattern":
			case "ArrowFunctionExpression":
			case "ClassBody":
			case "ClassExpression":
			case "ClassDeclaration":
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
			case "ExportSpecifier":
			case "ForOfStatement":
			case "ImportDeclaration":
			case "ImportDefaultSpecifier":
			case "ImportNamespaceSpecifier":
			case "ImportSpecifier":
			case "ImportExpression":
			case "MetaProperty":
			case "ClassMethod":
			case "ObjectPattern":
			case "SpreadElement":
			case "Super":
			case "TaggedTemplateExpression":
			case "TemplateElement":
			case "TemplateLiteral":
			case "YieldExpression":
			case "AwaitExpression":
			case "Import":
			case "BigIntLiteral":
			case "ExportNamespaceSpecifier":
			case "OptionalMemberExpression":
			case "OptionalCallExpression":
			case "ClassProperty":
			case "ClassAccessorProperty":
			case "ClassPrivateProperty":
			case "ClassPrivateMethod":
			case "PrivateName":
			case "StaticBlock":
				break;
			case "Placeholder":
				switch (node2.expectedNode) {
					case "Identifier":
					case "StringLiteral":
					case "BlockStatement":
					case "ClassBody":
						break;
					default:
						return false;
				}
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExpression$1(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ArrayExpression":
			case "AssignmentExpression":
			case "BinaryExpression":
			case "CallExpression":
			case "ConditionalExpression":
			case "FunctionExpression":
			case "Identifier":
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "RegExpLiteral":
			case "LogicalExpression":
			case "MemberExpression":
			case "NewExpression":
			case "ObjectExpression":
			case "SequenceExpression":
			case "ParenthesizedExpression":
			case "ThisExpression":
			case "UnaryExpression":
			case "UpdateExpression":
			case "ArrowFunctionExpression":
			case "ClassExpression":
			case "ImportExpression":
			case "MetaProperty":
			case "Super":
			case "TaggedTemplateExpression":
			case "TemplateLiteral":
			case "YieldExpression":
			case "AwaitExpression":
			case "Import":
			case "BigIntLiteral":
			case "OptionalMemberExpression":
			case "OptionalCallExpression":
			case "TypeCastExpression":
			case "JSXElement":
			case "JSXFragment":
			case "BindExpression":
			case "DoExpression":
			case "RecordExpression":
			case "TupleExpression":
			case "DecimalLiteral":
			case "ModuleExpression":
			case "TopicReference":
			case "PipelineTopicExpression":
			case "PipelineBareFunction":
			case "PipelinePrimaryTopicReference":
			case "TSInstantiationExpression":
			case "TSAsExpression":
			case "TSSatisfiesExpression":
			case "TSTypeAssertion":
			case "TSNonNullExpression":
				break;
			case "Placeholder":
				switch (node2.expectedNode) {
					case "Expression":
					case "Identifier":
					case "StringLiteral":
						break;
					default:
						return false;
				}
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBinary$1(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "BinaryExpression":
			case "LogicalExpression":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isScopable(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "BlockStatement":
			case "CatchClause":
			case "DoWhileStatement":
			case "ForInStatement":
			case "ForStatement":
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "Program":
			case "ObjectMethod":
			case "SwitchStatement":
			case "WhileStatement":
			case "ArrowFunctionExpression":
			case "ClassExpression":
			case "ClassDeclaration":
			case "ForOfStatement":
			case "ClassMethod":
			case "ClassPrivateMethod":
			case "StaticBlock":
			case "TSModuleBlock":
				break;
			case "Placeholder":
				if (node2.expectedNode === "BlockStatement")
					break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBlockParent(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "BlockStatement":
			case "CatchClause":
			case "DoWhileStatement":
			case "ForInStatement":
			case "ForStatement":
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "Program":
			case "ObjectMethod":
			case "SwitchStatement":
			case "WhileStatement":
			case "ArrowFunctionExpression":
			case "ForOfStatement":
			case "ClassMethod":
			case "ClassPrivateMethod":
			case "StaticBlock":
			case "TSModuleBlock":
				break;
			case "Placeholder":
				if (node2.expectedNode === "BlockStatement")
					break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isBlock(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "BlockStatement":
			case "Program":
			case "TSModuleBlock":
				break;
			case "Placeholder":
				if (node2.expectedNode === "BlockStatement")
					break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isStatement$4(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "BlockStatement":
			case "BreakStatement":
			case "ContinueStatement":
			case "DebuggerStatement":
			case "DoWhileStatement":
			case "EmptyStatement":
			case "ExpressionStatement":
			case "ForInStatement":
			case "ForStatement":
			case "FunctionDeclaration":
			case "IfStatement":
			case "LabeledStatement":
			case "ReturnStatement":
			case "SwitchStatement":
			case "ThrowStatement":
			case "TryStatement":
			case "VariableDeclaration":
			case "WhileStatement":
			case "WithStatement":
			case "ClassDeclaration":
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
			case "ForOfStatement":
			case "ImportDeclaration":
			case "DeclareClass":
			case "DeclareFunction":
			case "DeclareInterface":
			case "DeclareModule":
			case "DeclareModuleExports":
			case "DeclareTypeAlias":
			case "DeclareOpaqueType":
			case "DeclareVariable":
			case "DeclareExportDeclaration":
			case "DeclareExportAllDeclaration":
			case "InterfaceDeclaration":
			case "OpaqueType":
			case "TypeAlias":
			case "EnumDeclaration":
			case "TSDeclareFunction":
			case "TSInterfaceDeclaration":
			case "TSTypeAliasDeclaration":
			case "TSEnumDeclaration":
			case "TSModuleDeclaration":
			case "TSImportEqualsDeclaration":
			case "TSExportAssignment":
			case "TSNamespaceExportDeclaration":
				break;
			case "Placeholder":
				switch (node2.expectedNode) {
					case "Statement":
					case "Declaration":
					case "BlockStatement":
						break;
					default:
						return false;
				}
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTerminatorless(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "BreakStatement":
			case "ContinueStatement":
			case "ReturnStatement":
			case "ThrowStatement":
			case "YieldExpression":
			case "AwaitExpression":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isCompletionStatement(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "BreakStatement":
			case "ContinueStatement":
			case "ReturnStatement":
			case "ThrowStatement":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isConditional(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ConditionalExpression":
			case "IfStatement":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isLoop(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "DoWhileStatement":
			case "ForInStatement":
			case "ForStatement":
			case "WhileStatement":
			case "ForOfStatement":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isWhile(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "DoWhileStatement":
			case "WhileStatement":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExpressionWrapper(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ExpressionStatement":
			case "ParenthesizedExpression":
			case "TypeCastExpression":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFor$1(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ForInStatement":
			case "ForStatement":
			case "ForOfStatement":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isForXStatement(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ForInStatement":
			case "ForOfStatement":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFunction$3(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "ObjectMethod":
			case "ArrowFunctionExpression":
			case "ClassMethod":
			case "ClassPrivateMethod":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFunctionParent(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "ObjectMethod":
			case "ArrowFunctionExpression":
			case "ClassMethod":
			case "ClassPrivateMethod":
			case "StaticBlock":
			case "TSModuleBlock":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isPureish(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "FunctionDeclaration":
			case "FunctionExpression":
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "RegExpLiteral":
			case "ArrowFunctionExpression":
			case "BigIntLiteral":
			case "DecimalLiteral":
				break;
			case "Placeholder":
				if (node2.expectedNode === "StringLiteral")
					break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isDeclaration(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "FunctionDeclaration":
			case "VariableDeclaration":
			case "ClassDeclaration":
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
			case "ImportDeclaration":
			case "DeclareClass":
			case "DeclareFunction":
			case "DeclareInterface":
			case "DeclareModule":
			case "DeclareModuleExports":
			case "DeclareTypeAlias":
			case "DeclareOpaqueType":
			case "DeclareVariable":
			case "DeclareExportDeclaration":
			case "DeclareExportAllDeclaration":
			case "InterfaceDeclaration":
			case "OpaqueType":
			case "TypeAlias":
			case "EnumDeclaration":
			case "TSDeclareFunction":
			case "TSInterfaceDeclaration":
			case "TSTypeAliasDeclaration":
			case "TSEnumDeclaration":
			case "TSModuleDeclaration":
			case "TSImportEqualsDeclaration":
				break;
			case "Placeholder":
				if (node2.expectedNode === "Declaration")
					break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isPatternLike(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "Identifier":
			case "RestElement":
			case "AssignmentPattern":
			case "ArrayPattern":
			case "ObjectPattern":
			case "TSAsExpression":
			case "TSSatisfiesExpression":
			case "TSTypeAssertion":
			case "TSNonNullExpression":
				break;
			case "Placeholder":
				switch (node2.expectedNode) {
					case "Pattern":
					case "Identifier":
						break;
					default:
						return false;
				}
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isLVal(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "Identifier":
			case "MemberExpression":
			case "RestElement":
			case "AssignmentPattern":
			case "ArrayPattern":
			case "ObjectPattern":
			case "TSParameterProperty":
			case "TSAsExpression":
			case "TSSatisfiesExpression":
			case "TSTypeAssertion":
			case "TSNonNullExpression":
				break;
			case "Placeholder":
				switch (node2.expectedNode) {
					case "Pattern":
					case "Identifier":
						break;
					default:
						return false;
				}
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSEntityName(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "Identifier":
			case "TSQualifiedName":
				break;
			case "Placeholder":
				if (node2.expectedNode === "Identifier")
					break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isLiteral$2(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "RegExpLiteral":
			case "TemplateLiteral":
			case "BigIntLiteral":
			case "DecimalLiteral":
				break;
			case "Placeholder":
				if (node2.expectedNode === "StringLiteral")
					break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isImmutable$2(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "StringLiteral":
			case "NumericLiteral":
			case "NullLiteral":
			case "BooleanLiteral":
			case "BigIntLiteral":
			case "JSXAttribute":
			case "JSXClosingElement":
			case "JSXElement":
			case "JSXExpressionContainer":
			case "JSXSpreadChild":
			case "JSXOpeningElement":
			case "JSXText":
			case "JSXFragment":
			case "JSXOpeningFragment":
			case "JSXClosingFragment":
			case "DecimalLiteral":
				break;
			case "Placeholder":
				if (node2.expectedNode === "StringLiteral")
					break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isUserWhitespacable(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ObjectMethod":
			case "ObjectProperty":
			case "ObjectTypeInternalSlot":
			case "ObjectTypeCallProperty":
			case "ObjectTypeIndexer":
			case "ObjectTypeProperty":
			case "ObjectTypeSpreadProperty":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isMethod(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ObjectMethod":
			case "ClassMethod":
			case "ClassPrivateMethod":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isObjectMember(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ObjectMethod":
			case "ObjectProperty":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isProperty(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ObjectProperty":
			case "ClassProperty":
			case "ClassAccessorProperty":
			case "ClassPrivateProperty":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isUnaryLike(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "UnaryExpression":
			case "SpreadElement":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isPattern$1(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "AssignmentPattern":
			case "ArrayPattern":
			case "ObjectPattern":
				break;
			case "Placeholder":
				if (node2.expectedNode === "Pattern")
					break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isClass(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ClassExpression":
			case "ClassDeclaration":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isImportOrExportDeclaration(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
			case "ImportDeclaration":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isExportDeclaration(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ExportAllDeclaration":
			case "ExportDefaultDeclaration":
			case "ExportNamedDeclaration":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isModuleSpecifier(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ExportSpecifier":
			case "ImportDefaultSpecifier":
			case "ImportNamespaceSpecifier":
			case "ImportSpecifier":
			case "ExportNamespaceSpecifier":
			case "ExportDefaultSpecifier":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isAccessor(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ClassAccessorProperty":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isPrivate(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "ClassPrivateProperty":
			case "ClassPrivateMethod":
			case "PrivateName":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFlow(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "AnyTypeAnnotation":
			case "ArrayTypeAnnotation":
			case "BooleanTypeAnnotation":
			case "BooleanLiteralTypeAnnotation":
			case "NullLiteralTypeAnnotation":
			case "ClassImplements":
			case "DeclareClass":
			case "DeclareFunction":
			case "DeclareInterface":
			case "DeclareModule":
			case "DeclareModuleExports":
			case "DeclareTypeAlias":
			case "DeclareOpaqueType":
			case "DeclareVariable":
			case "DeclareExportDeclaration":
			case "DeclareExportAllDeclaration":
			case "DeclaredPredicate":
			case "ExistsTypeAnnotation":
			case "FunctionTypeAnnotation":
			case "FunctionTypeParam":
			case "GenericTypeAnnotation":
			case "InferredPredicate":
			case "InterfaceExtends":
			case "InterfaceDeclaration":
			case "InterfaceTypeAnnotation":
			case "IntersectionTypeAnnotation":
			case "MixedTypeAnnotation":
			case "EmptyTypeAnnotation":
			case "NullableTypeAnnotation":
			case "NumberLiteralTypeAnnotation":
			case "NumberTypeAnnotation":
			case "ObjectTypeAnnotation":
			case "ObjectTypeInternalSlot":
			case "ObjectTypeCallProperty":
			case "ObjectTypeIndexer":
			case "ObjectTypeProperty":
			case "ObjectTypeSpreadProperty":
			case "OpaqueType":
			case "QualifiedTypeIdentifier":
			case "StringLiteralTypeAnnotation":
			case "StringTypeAnnotation":
			case "SymbolTypeAnnotation":
			case "ThisTypeAnnotation":
			case "TupleTypeAnnotation":
			case "TypeofTypeAnnotation":
			case "TypeAlias":
			case "TypeAnnotation":
			case "TypeCastExpression":
			case "TypeParameter":
			case "TypeParameterDeclaration":
			case "TypeParameterInstantiation":
			case "UnionTypeAnnotation":
			case "Variance":
			case "VoidTypeAnnotation":
			case "EnumDeclaration":
			case "EnumBooleanBody":
			case "EnumNumberBody":
			case "EnumStringBody":
			case "EnumSymbolBody":
			case "EnumBooleanMember":
			case "EnumNumberMember":
			case "EnumStringMember":
			case "EnumDefaultedMember":
			case "IndexedAccessType":
			case "OptionalIndexedAccessType":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFlowType(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "AnyTypeAnnotation":
			case "ArrayTypeAnnotation":
			case "BooleanTypeAnnotation":
			case "BooleanLiteralTypeAnnotation":
			case "NullLiteralTypeAnnotation":
			case "ExistsTypeAnnotation":
			case "FunctionTypeAnnotation":
			case "GenericTypeAnnotation":
			case "InterfaceTypeAnnotation":
			case "IntersectionTypeAnnotation":
			case "MixedTypeAnnotation":
			case "EmptyTypeAnnotation":
			case "NullableTypeAnnotation":
			case "NumberLiteralTypeAnnotation":
			case "NumberTypeAnnotation":
			case "ObjectTypeAnnotation":
			case "StringLiteralTypeAnnotation":
			case "StringTypeAnnotation":
			case "SymbolTypeAnnotation":
			case "ThisTypeAnnotation":
			case "TupleTypeAnnotation":
			case "TypeofTypeAnnotation":
			case "UnionTypeAnnotation":
			case "VoidTypeAnnotation":
			case "IndexedAccessType":
			case "OptionalIndexedAccessType":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFlowBaseAnnotation(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "AnyTypeAnnotation":
			case "BooleanTypeAnnotation":
			case "NullLiteralTypeAnnotation":
			case "MixedTypeAnnotation":
			case "EmptyTypeAnnotation":
			case "NumberTypeAnnotation":
			case "StringTypeAnnotation":
			case "SymbolTypeAnnotation":
			case "ThisTypeAnnotation":
			case "VoidTypeAnnotation":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFlowDeclaration(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "DeclareClass":
			case "DeclareFunction":
			case "DeclareInterface":
			case "DeclareModule":
			case "DeclareModuleExports":
			case "DeclareTypeAlias":
			case "DeclareOpaqueType":
			case "DeclareVariable":
			case "DeclareExportDeclaration":
			case "DeclareExportAllDeclaration":
			case "InterfaceDeclaration":
			case "OpaqueType":
			case "TypeAlias":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isFlowPredicate(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "DeclaredPredicate":
			case "InferredPredicate":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumBody(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "EnumBooleanBody":
			case "EnumNumberBody":
			case "EnumStringBody":
			case "EnumSymbolBody":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isEnumMember(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "EnumBooleanMember":
			case "EnumNumberMember":
			case "EnumStringMember":
			case "EnumDefaultedMember":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isJSX(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "JSXAttribute":
			case "JSXClosingElement":
			case "JSXElement":
			case "JSXEmptyExpression":
			case "JSXExpressionContainer":
			case "JSXSpreadChild":
			case "JSXIdentifier":
			case "JSXMemberExpression":
			case "JSXNamespacedName":
			case "JSXOpeningElement":
			case "JSXSpreadAttribute":
			case "JSXText":
			case "JSXFragment":
			case "JSXOpeningFragment":
			case "JSXClosingFragment":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isMiscellaneous(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "Noop":
			case "Placeholder":
			case "V8IntrinsicIdentifier":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTypeScript(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "TSParameterProperty":
			case "TSDeclareFunction":
			case "TSDeclareMethod":
			case "TSQualifiedName":
			case "TSCallSignatureDeclaration":
			case "TSConstructSignatureDeclaration":
			case "TSPropertySignature":
			case "TSMethodSignature":
			case "TSIndexSignature":
			case "TSAnyKeyword":
			case "TSBooleanKeyword":
			case "TSBigIntKeyword":
			case "TSIntrinsicKeyword":
			case "TSNeverKeyword":
			case "TSNullKeyword":
			case "TSNumberKeyword":
			case "TSObjectKeyword":
			case "TSStringKeyword":
			case "TSSymbolKeyword":
			case "TSUndefinedKeyword":
			case "TSUnknownKeyword":
			case "TSVoidKeyword":
			case "TSThisType":
			case "TSFunctionType":
			case "TSConstructorType":
			case "TSTypeReference":
			case "TSTypePredicate":
			case "TSTypeQuery":
			case "TSTypeLiteral":
			case "TSArrayType":
			case "TSTupleType":
			case "TSOptionalType":
			case "TSRestType":
			case "TSNamedTupleMember":
			case "TSUnionType":
			case "TSIntersectionType":
			case "TSConditionalType":
			case "TSInferType":
			case "TSParenthesizedType":
			case "TSTypeOperator":
			case "TSIndexedAccessType":
			case "TSMappedType":
			case "TSTemplateLiteralType":
			case "TSLiteralType":
			case "TSExpressionWithTypeArguments":
			case "TSInterfaceDeclaration":
			case "TSInterfaceBody":
			case "TSTypeAliasDeclaration":
			case "TSInstantiationExpression":
			case "TSAsExpression":
			case "TSSatisfiesExpression":
			case "TSTypeAssertion":
			case "TSEnumBody":
			case "TSEnumDeclaration":
			case "TSEnumMember":
			case "TSModuleDeclaration":
			case "TSModuleBlock":
			case "TSImportType":
			case "TSImportEqualsDeclaration":
			case "TSExternalModuleReference":
			case "TSNonNullExpression":
			case "TSExportAssignment":
			case "TSNamespaceExportDeclaration":
			case "TSTypeAnnotation":
			case "TSTypeParameterInstantiation":
			case "TSTypeParameterDeclaration":
			case "TSTypeParameter":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSTypeElement(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "TSCallSignatureDeclaration":
			case "TSConstructSignatureDeclaration":
			case "TSPropertySignature":
			case "TSMethodSignature":
			case "TSIndexSignature":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSType(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "TSAnyKeyword":
			case "TSBooleanKeyword":
			case "TSBigIntKeyword":
			case "TSIntrinsicKeyword":
			case "TSNeverKeyword":
			case "TSNullKeyword":
			case "TSNumberKeyword":
			case "TSObjectKeyword":
			case "TSStringKeyword":
			case "TSSymbolKeyword":
			case "TSUndefinedKeyword":
			case "TSUnknownKeyword":
			case "TSVoidKeyword":
			case "TSThisType":
			case "TSFunctionType":
			case "TSConstructorType":
			case "TSTypeReference":
			case "TSTypePredicate":
			case "TSTypeQuery":
			case "TSTypeLiteral":
			case "TSArrayType":
			case "TSTupleType":
			case "TSOptionalType":
			case "TSRestType":
			case "TSUnionType":
			case "TSIntersectionType":
			case "TSConditionalType":
			case "TSInferType":
			case "TSParenthesizedType":
			case "TSTypeOperator":
			case "TSIndexedAccessType":
			case "TSMappedType":
			case "TSTemplateLiteralType":
			case "TSLiteralType":
			case "TSExpressionWithTypeArguments":
			case "TSImportType":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isTSBaseType(node2, opts) {
		if (!node2)
			return false;
		switch (node2.type) {
			case "TSAnyKeyword":
			case "TSBooleanKeyword":
			case "TSBigIntKeyword":
			case "TSIntrinsicKeyword":
			case "TSNeverKeyword":
			case "TSNullKeyword":
			case "TSNumberKeyword":
			case "TSObjectKeyword":
			case "TSStringKeyword":
			case "TSSymbolKeyword":
			case "TSUndefinedKeyword":
			case "TSUnknownKeyword":
			case "TSVoidKeyword":
			case "TSThisType":
			case "TSTemplateLiteralType":
			case "TSLiteralType":
				break;
			default:
				return false;
		}
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isNumberLiteral(node2, opts) {
		(0, _deprecationWarning$2.default)("isNumberLiteral", "isNumericLiteral");
		if (!node2)
			return false;
		if (node2.type !== "NumberLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isRegexLiteral(node2, opts) {
		(0, _deprecationWarning$2.default)("isRegexLiteral", "isRegExpLiteral");
		if (!node2)
			return false;
		if (node2.type !== "RegexLiteral")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isRestProperty(node2, opts) {
		(0, _deprecationWarning$2.default)("isRestProperty", "isRestElement");
		if (!node2)
			return false;
		if (node2.type !== "RestProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isSpreadProperty(node2, opts) {
		(0, _deprecationWarning$2.default)("isSpreadProperty", "isSpreadElement");
		if (!node2)
			return false;
		if (node2.type !== "SpreadProperty")
			return false;
		return opts == null || (0, _shallowEqual$1.default)(node2, opts);
	}

	function isModuleDeclaration(node2, opts) {
		(0, _deprecationWarning$2.default)("isModuleDeclaration", "isImportOrExportDeclaration");
		return isImportOrExportDeclaration(node2, opts);
	}

	Object.defineProperty(matchesPattern$1, "__esModule", {
		value: true
	});
	matchesPattern$1.default = matchesPattern;
	var _index$I = generated$3;

	function matchesPattern(member, match, allowPartial) {
		if (!(0, _index$I.isMemberExpression)(member))
			return false;
		const parts = Array.isArray(match) ? match : match.split(".");
		const nodes2 = [];
		let node2;
		for (node2 = member; (0, _index$I.isMemberExpression)(node2); node2 = node2.object) {
			nodes2.push(node2.property);
		}
		nodes2.push(node2);
		if (nodes2.length < parts.length)
			return false;
		if (!allowPartial && nodes2.length > parts.length)
			return false;
		for (let i = 0, j = nodes2.length - 1; i < parts.length; i++, j--) {
			const node3 = nodes2[j];
			let value;
			if ((0, _index$I.isIdentifier)(node3)) {
				value = node3.name;
			} else if ((0, _index$I.isStringLiteral)(node3)) {
				value = node3.value;
			} else if ((0, _index$I.isThisExpression)(node3)) {
				value = "this";
			} else {
				return false;
			}
			if (parts[i] !== value)
				return false;
		}
		return true;
	}

	Object.defineProperty(buildMatchMemberExpression$1, "__esModule", {
		value: true
	});
	buildMatchMemberExpression$1.default = buildMatchMemberExpression;
	var _matchesPattern = matchesPattern$1;

	function buildMatchMemberExpression(match, allowPartial) {
		const parts = match.split(".");
		return (member) => (0, _matchesPattern.default)(member, parts, allowPartial);
	}

	Object.defineProperty(isReactComponent$1, "__esModule", {
		value: true
	});
	isReactComponent$1.default = void 0;
	var _buildMatchMemberExpression = buildMatchMemberExpression$1;
	const isReactComponent = (0, _buildMatchMemberExpression.default)("React.Component");
	isReactComponent$1.default = isReactComponent;
	var isCompatTag$1 = {};
	Object.defineProperty(isCompatTag$1, "__esModule", {
		value: true
	});
	isCompatTag$1.default = isCompatTag;

	function isCompatTag(tagName) {
		return !!tagName && /^[a-z]/.test(tagName);
	}

	var buildChildren$1 = {};
	var cleanJSXElementLiteralChild$1 = {};
	var generated$2 = {};
	var lowercase = {};
	var validate$3 = {};
	var definitions = {};
	var core = {};
	var is$1 = {};
	var isType$2 = {};
	Object.defineProperty(isType$2, "__esModule", {
		value: true
	});
	isType$2.default = isType$1;
	var _index$H = definitions;

	function isType$1(nodeType, targetType) {
		if (nodeType === targetType)
			return true;
		if (nodeType == null)
			return false;
		if (_index$H.ALIAS_KEYS[targetType])
			return false;
		const aliases = _index$H.FLIPPED_ALIAS_KEYS[targetType];
		if (aliases) {
			if (aliases[0] === nodeType)
				return true;
			for (const alias of aliases) {
				if (nodeType === alias)
					return true;
			}
		}
		return false;
	}

	var isPlaceholderType$1 = {};
	Object.defineProperty(isPlaceholderType$1, "__esModule", {
		value: true
	});
	isPlaceholderType$1.default = isPlaceholderType;
	var _index$G = definitions;

	function isPlaceholderType(placeholderType, targetType) {
		if (placeholderType === targetType)
			return true;
		const aliases = _index$G.PLACEHOLDERS_ALIAS[placeholderType];
		if (aliases) {
			for (const alias of aliases) {
				if (targetType === alias)
					return true;
			}
		}
		return false;
	}

	Object.defineProperty(is$1, "__esModule", {
		value: true
	});
	is$1.default = is;
	var _shallowEqual = shallowEqual$1;
	var _isType$1 = isType$2;
	var _isPlaceholderType = isPlaceholderType$1;
	var _index$F = definitions;

	function is(type, node2, opts) {
		if (!node2)
			return false;
		const matches = (0, _isType$1.default)(node2.type, type);
		if (!matches) {
			if (!opts && node2.type === "Placeholder" && type in _index$F.FLIPPED_ALIAS_KEYS) {
				return (0, _isPlaceholderType.default)(node2.expectedNode, type);
			}
			return false;
		}
		if (opts === void 0) {
			return true;
		} else {
			return (0, _shallowEqual.default)(node2, opts);
		}
	}

	var isValidIdentifier$1 = {};
	var lib$1 = {};
	var identifier$1 = {};
	Object.defineProperty(identifier$1, "__esModule", {
		value: true
	});
	identifier$1.isIdentifierChar = isIdentifierChar;
	identifier$1.isIdentifierName = isIdentifierName;
	identifier$1.isIdentifierStart = isIdentifierStart;
	let nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
	let nonASCIIidentifierChars = "\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0897-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65";
	const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
	const nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
	nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
	const astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191];
	const astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];

	function isInAstralSet(code, set) {
		let pos = 65536;
		for (let i = 0, length = set.length; i < length; i += 2) {
			pos += set[i];
			if (pos > code)
				return false;
			pos += set[i + 1];
			if (pos >= code)
				return true;
		}
		return false;
	}

	function isIdentifierStart(code) {
		if (code < 65)
			return code === 36;
		if (code <= 90)
			return true;
		if (code < 97)
			return code === 95;
		if (code <= 122)
			return true;
		if (code <= 65535) {
			return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
		}
		return isInAstralSet(code, astralIdentifierStartCodes);
	}

	function isIdentifierChar(code) {
		if (code < 48)
			return code === 36;
		if (code < 58)
			return true;
		if (code < 65)
			return false;
		if (code <= 90)
			return true;
		if (code < 97)
			return code === 95;
		if (code <= 122)
			return true;
		if (code <= 65535) {
			return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
		}
		return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
	}

	function isIdentifierName(name) {
		let isFirst = true;
		for (let i = 0; i < name.length; i++) {
			let cp = name.charCodeAt(i);
			if ((cp & 64512) === 55296 && i + 1 < name.length) {
				const trail = name.charCodeAt(++i);
				if ((trail & 64512) === 56320) {
					cp = 65536 + ((cp & 1023) << 10) + (trail & 1023);
				}
			}
			if (isFirst) {
				isFirst = false;
				if (!isIdentifierStart(cp)) {
					return false;
				}
			} else if (!isIdentifierChar(cp)) {
				return false;
			}
		}
		return !isFirst;
	}

	var keyword = {};
	Object.defineProperty(keyword, "__esModule", {
		value: true
	});
	keyword.isKeyword = isKeyword;
	keyword.isReservedWord = isReservedWord;
	keyword.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
	keyword.isStrictBindReservedWord = isStrictBindReservedWord;
	keyword.isStrictReservedWord = isStrictReservedWord;
	const reservedWords = {
		keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
		strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
		strictBind: ["eval", "arguments"]
	};
	const keywords = new Set(reservedWords.keyword);
	const reservedWordsStrictSet = new Set(reservedWords.strict);
	const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);

	function isReservedWord(word, inModule) {
		return inModule && word === "await" || word === "enum";
	}

	function isStrictReservedWord(word, inModule) {
		return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
	}

	function isStrictBindOnlyReservedWord(word) {
		return reservedWordsStrictBindSet.has(word);
	}

	function isStrictBindReservedWord(word, inModule) {
		return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
	}

	function isKeyword(word) {
		return keywords.has(word);
	}

	(function (exports3) {
		Object.defineProperty(exports3, "__esModule", {
			value: true
		});
		Object.defineProperty(exports3, "isIdentifierChar", {
			enumerable: true,
			get: function () {
				return _identifier.isIdentifierChar;
			}
		});
		Object.defineProperty(exports3, "isIdentifierName", {
			enumerable: true,
			get: function () {
				return _identifier.isIdentifierName;
			}
		});
		Object.defineProperty(exports3, "isIdentifierStart", {
			enumerable: true,
			get: function () {
				return _identifier.isIdentifierStart;
			}
		});
		Object.defineProperty(exports3, "isKeyword", {
			enumerable: true,
			get: function () {
				return _keyword.isKeyword;
			}
		});
		Object.defineProperty(exports3, "isReservedWord", {
			enumerable: true,
			get: function () {
				return _keyword.isReservedWord;
			}
		});
		Object.defineProperty(exports3, "isStrictBindOnlyReservedWord", {
			enumerable: true,
			get: function () {
				return _keyword.isStrictBindOnlyReservedWord;
			}
		});
		Object.defineProperty(exports3, "isStrictBindReservedWord", {
			enumerable: true,
			get: function () {
				return _keyword.isStrictBindReservedWord;
			}
		});
		Object.defineProperty(exports3, "isStrictReservedWord", {
			enumerable: true,
			get: function () {
				return _keyword.isStrictReservedWord;
			}
		});
		var _identifier = identifier$1;
		var _keyword = keyword;
	})(lib$1);
	Object.defineProperty(isValidIdentifier$1, "__esModule", {
		value: true
	});
	isValidIdentifier$1.default = isValidIdentifier;
	var _helperValidatorIdentifier$2 = lib$1;

	function isValidIdentifier(name, reserved = true) {
		if (typeof name !== "string")
			return false;
		if (reserved) {
			if ((0, _helperValidatorIdentifier$2.isKeyword)(name) || (0, _helperValidatorIdentifier$2.isStrictReservedWord)(name, true)) {
				return false;
			}
		}
		return (0, _helperValidatorIdentifier$2.isIdentifierName)(name);
	}

	var lib = {};
	Object.defineProperty(lib, "__esModule", {
		value: true
	});
	lib.readCodePoint = readCodePoint;
	lib.readInt = readInt;
	lib.readStringContents = readStringContents;
	var _isDigit = function isDigit(code) {
		return code >= 48 && code <= 57;
	};
	const forbiddenNumericSeparatorSiblings = {
		decBinOct: /* @__PURE__ */ new Set([46, 66, 69, 79, 95, 98, 101, 111]),
		hex: /* @__PURE__ */ new Set([46, 88, 95, 120])
	};
	const isAllowedNumericSeparatorSibling = {
		bin: (ch) => ch === 48 || ch === 49,
		oct: (ch) => ch >= 48 && ch <= 55,
		dec: (ch) => ch >= 48 && ch <= 57,
		hex: (ch) => ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102
	};

	function readStringContents(type, input, pos, lineStart, curLine, errors) {
		const initialPos = pos;
		const initialLineStart = lineStart;
		const initialCurLine = curLine;
		let out = "";
		let firstInvalidLoc = null;
		let chunkStart = pos;
		const {
			length
		} = input;
		for (; ;) {
			if (pos >= length) {
				errors.unterminated(initialPos, initialLineStart, initialCurLine);
				out += input.slice(chunkStart, pos);
				break;
			}
			const ch = input.charCodeAt(pos);
			if (isStringEnd(type, ch, input, pos)) {
				out += input.slice(chunkStart, pos);
				break;
			}
			if (ch === 92) {
				out += input.slice(chunkStart, pos);
				const res = readEscapedChar(input, pos, lineStart, curLine, type === "template", errors);
				if (res.ch === null && !firstInvalidLoc) {
					firstInvalidLoc = {
						pos,
						lineStart,
						curLine
					};
				} else {
					out += res.ch;
				}
				({
					pos,
					lineStart,
					curLine
				} = res);
				chunkStart = pos;
			} else if (ch === 8232 || ch === 8233) {
				++pos;
				++curLine;
				lineStart = pos;
			} else if (ch === 10 || ch === 13) {
				if (type === "template") {
					out += input.slice(chunkStart, pos) + "\n";
					++pos;
					if (ch === 13 && input.charCodeAt(pos) === 10) {
						++pos;
					}
					++curLine;
					chunkStart = lineStart = pos;
				} else {
					errors.unterminated(initialPos, initialLineStart, initialCurLine);
				}
			} else {
				++pos;
			}
		}
		return {
			pos,
			str: out,
			firstInvalidLoc,
			lineStart,
			curLine,
			containsInvalid: !!firstInvalidLoc
		};
	}

	function isStringEnd(type, ch, input, pos) {
		if (type === "template") {
			return ch === 96 || ch === 36 && input.charCodeAt(pos + 1) === 123;
		}
		return ch === (type === "double" ? 34 : 39);
	}

	function readEscapedChar(input, pos, lineStart, curLine, inTemplate, errors) {
		const throwOnInvalid = !inTemplate;
		pos++;
		const res = (ch2) => ({
			pos,
			ch: ch2,
			lineStart,
			curLine
		});
		const ch = input.charCodeAt(pos++);
		switch (ch) {
			case 110:
				return res("\n");
			case 114:
				return res("\r");
			case 120: {
				let code;
				({
					code,
					pos
				} = readHexChar(input, pos, lineStart, curLine, 2, false, throwOnInvalid, errors));
				return res(code === null ? null : String.fromCharCode(code));
			}
			case 117: {
				let code;
				({
					code,
					pos
				} = readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors));
				return res(code === null ? null : String.fromCodePoint(code));
			}
			case 116:
				return res("	");
			case 98:
				return res("\b");
			case 118:
				return res("\v");
			case 102:
				return res("\f");
			case 13:
				if (input.charCodeAt(pos) === 10) {
					++pos;
				}
			case 10:
				lineStart = pos;
				++curLine;
			case 8232:
			case 8233:
				return res("");
			case 56:
			case 57:
				if (inTemplate) {
					return res(null);
				} else {
					errors.strictNumericEscape(pos - 1, lineStart, curLine);
				}
			default:
				if (ch >= 48 && ch <= 55) {
					const startPos = pos - 1;
					const match = /^[0-7]+/.exec(input.slice(startPos, pos + 2));
					let octalStr = match[0];
					let octal = parseInt(octalStr, 8);
					if (octal > 255) {
						octalStr = octalStr.slice(0, -1);
						octal = parseInt(octalStr, 8);
					}
					pos += octalStr.length - 1;
					const next = input.charCodeAt(pos);
					if (octalStr !== "0" || next === 56 || next === 57) {
						if (inTemplate) {
							return res(null);
						} else {
							errors.strictNumericEscape(startPos, lineStart, curLine);
						}
					}
					return res(String.fromCharCode(octal));
				}
				return res(String.fromCharCode(ch));
		}
	}

	function readHexChar(input, pos, lineStart, curLine, len, forceLen, throwOnInvalid, errors) {
		const initialPos = pos;
		let n2;
		({
			n: n2,
			pos
		} = readInt(input, pos, lineStart, curLine, 16, len, forceLen, false, errors, !throwOnInvalid));
		if (n2 === null) {
			if (throwOnInvalid) {
				errors.invalidEscapeSequence(initialPos, lineStart, curLine);
			} else {
				pos = initialPos - 1;
			}
		}
		return {
			code: n2,
			pos
		};
	}

	function readInt(input, pos, lineStart, curLine, radix, len, forceLen, allowNumSeparator, errors, bailOnError) {
		const start = pos;
		const forbiddenSiblings = radix === 16 ? forbiddenNumericSeparatorSiblings.hex : forbiddenNumericSeparatorSiblings.decBinOct;
		const isAllowedSibling = radix === 16 ? isAllowedNumericSeparatorSibling.hex : radix === 10 ? isAllowedNumericSeparatorSibling.dec : radix === 8 ? isAllowedNumericSeparatorSibling.oct : isAllowedNumericSeparatorSibling.bin;
		let invalid = false;
		let total = 0;
		for (let i = 0, e = len == null ? Infinity : len; i < e; ++i) {
			const code = input.charCodeAt(pos);
			let val;
			if (code === 95 && allowNumSeparator !== "bail") {
				const prev = input.charCodeAt(pos - 1);
				const next = input.charCodeAt(pos + 1);
				if (!allowNumSeparator) {
					if (bailOnError)
						return {
							n: null,
							pos
						};
					errors.numericSeparatorInEscapeSequence(pos, lineStart, curLine);
				} else if (Number.isNaN(next) || !isAllowedSibling(next) || forbiddenSiblings.has(prev) || forbiddenSiblings.has(next)) {
					if (bailOnError)
						return {
							n: null,
							pos
						};
					errors.unexpectedNumericSeparator(pos, lineStart, curLine);
				}
				++pos;
				continue;
			}
			if (code >= 97) {
				val = code - 97 + 10;
			} else if (code >= 65) {
				val = code - 65 + 10;
			} else if (_isDigit(code)) {
				val = code - 48;
			} else {
				val = Infinity;
			}
			if (val >= radix) {
				if (val <= 9 && bailOnError) {
					return {
						n: null,
						pos
					};
				} else if (val <= 9 && errors.invalidDigit(pos, lineStart, curLine, radix)) {
					val = 0;
				} else if (forceLen) {
					val = 0;
					invalid = true;
				} else {
					break;
				}
			}
			++pos;
			total = total * radix + val;
		}
		if (pos === start || len != null && pos - start !== len || invalid) {
			return {
				n: null,
				pos
			};
		}
		return {
			n: total,
			pos
		};
	}

	function readCodePoint(input, pos, lineStart, curLine, throwOnInvalid, errors) {
		const ch = input.charCodeAt(pos);
		let code;
		if (ch === 123) {
			++pos;
			({
				code,
				pos
			} = readHexChar(input, pos, lineStart, curLine, input.indexOf("}", pos) - pos, true, throwOnInvalid, errors));
			++pos;
			if (code !== null && code > 1114111) {
				if (throwOnInvalid) {
					errors.invalidCodePoint(pos, lineStart, curLine);
				} else {
					return {
						code: null,
						pos
					};
				}
			}
		} else {
			({
				code,
				pos
			} = readHexChar(input, pos, lineStart, curLine, 4, false, throwOnInvalid, errors));
		}
		return {
			code,
			pos
		};
	}

	var constants = {};
	Object.defineProperty(constants, "__esModule", {
		value: true
	});
	constants.UPDATE_OPERATORS = constants.UNARY_OPERATORS = constants.STRING_UNARY_OPERATORS = constants.STATEMENT_OR_BLOCK_KEYS = constants.NUMBER_UNARY_OPERATORS = constants.NUMBER_BINARY_OPERATORS = constants.NOT_LOCAL_BINDING = constants.LOGICAL_OPERATORS = constants.INHERIT_KEYS = constants.FOR_INIT_KEYS = constants.FLATTENABLE_KEYS = constants.EQUALITY_BINARY_OPERATORS = constants.COMPARISON_BINARY_OPERATORS = constants.COMMENT_KEYS = constants.BOOLEAN_UNARY_OPERATORS = constants.BOOLEAN_NUMBER_BINARY_OPERATORS = constants.BOOLEAN_BINARY_OPERATORS = constants.BLOCK_SCOPED_SYMBOL = constants.BINARY_OPERATORS = constants.ASSIGNMENT_OPERATORS = void 0;
	constants.STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
	constants.FLATTENABLE_KEYS = ["body", "expressions"];
	constants.FOR_INIT_KEYS = ["left", "init"];
	constants.COMMENT_KEYS = ["leadingComments", "trailingComments", "innerComments"];
	const LOGICAL_OPERATORS = constants.LOGICAL_OPERATORS = ["||", "&&", "??"];
	constants.UPDATE_OPERATORS = ["++", "--"];
	const BOOLEAN_NUMBER_BINARY_OPERATORS = constants.BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="];
	const EQUALITY_BINARY_OPERATORS = constants.EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="];
	const COMPARISON_BINARY_OPERATORS = constants.COMPARISON_BINARY_OPERATORS = [...EQUALITY_BINARY_OPERATORS, "in", "instanceof"];
	const BOOLEAN_BINARY_OPERATORS = constants.BOOLEAN_BINARY_OPERATORS = [...COMPARISON_BINARY_OPERATORS, ...BOOLEAN_NUMBER_BINARY_OPERATORS];
	const NUMBER_BINARY_OPERATORS = constants.NUMBER_BINARY_OPERATORS = ["-", "/", "%", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];
	constants.BINARY_OPERATORS = ["+", ...NUMBER_BINARY_OPERATORS, ...BOOLEAN_BINARY_OPERATORS, "|>"];
	constants.ASSIGNMENT_OPERATORS = ["=", "+=", ...NUMBER_BINARY_OPERATORS.map((op) => op + "="), ...LOGICAL_OPERATORS.map((op) => op + "=")];
	const BOOLEAN_UNARY_OPERATORS = constants.BOOLEAN_UNARY_OPERATORS = ["delete", "!"];
	const NUMBER_UNARY_OPERATORS = constants.NUMBER_UNARY_OPERATORS = ["+", "-", "~"];
	const STRING_UNARY_OPERATORS = constants.STRING_UNARY_OPERATORS = ["typeof"];
	constants.UNARY_OPERATORS = ["void", "throw", ...BOOLEAN_UNARY_OPERATORS, ...NUMBER_UNARY_OPERATORS, ...STRING_UNARY_OPERATORS];
	constants.INHERIT_KEYS = {
		optional: ["typeAnnotation", "typeParameters", "returnType"],
		force: ["start", "loc", "end"]
	};
	constants.BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped");
	constants.NOT_LOCAL_BINDING = Symbol.for("should not be considered a local binding");
	var utils$1 = {};
	Object.defineProperty(utils$1, "__esModule", {
		value: true
	});
	utils$1.VISITOR_KEYS = utils$1.NODE_PARENT_VALIDATIONS = utils$1.NODE_FIELDS = utils$1.FLIPPED_ALIAS_KEYS = utils$1.DEPRECATED_KEYS = utils$1.BUILDER_KEYS = utils$1.ALIAS_KEYS = void 0;
	utils$1.arrayOf = arrayOf;
	utils$1.arrayOfType = arrayOfType;
	utils$1.assertEach = assertEach;
	utils$1.assertNodeOrValueType = assertNodeOrValueType;
	utils$1.assertNodeType = assertNodeType;
	utils$1.assertOneOf = assertOneOf;
	utils$1.assertOptionalChainStart = assertOptionalChainStart;
	utils$1.assertShape = assertShape;
	utils$1.assertValueType = assertValueType;
	utils$1.chain = chain;
	utils$1.default = defineType$5;
	utils$1.defineAliasedType = defineAliasedType;
	utils$1.validate = validate$2;
	utils$1.validateArrayOfType = validateArrayOfType;
	utils$1.validateOptional = validateOptional;
	utils$1.validateOptionalType = validateOptionalType;
	utils$1.validateType = validateType;
	var _is$3 = is$1;
	var _validate$1 = validate$3;
	const VISITOR_KEYS$2 = utils$1.VISITOR_KEYS = {};
	const ALIAS_KEYS = utils$1.ALIAS_KEYS = {};
	const FLIPPED_ALIAS_KEYS$2 = utils$1.FLIPPED_ALIAS_KEYS = {};
	const NODE_FIELDS$1 = utils$1.NODE_FIELDS = {};
	const BUILDER_KEYS = utils$1.BUILDER_KEYS = {};
	const DEPRECATED_KEYS = utils$1.DEPRECATED_KEYS = {};
	const NODE_PARENT_VALIDATIONS = utils$1.NODE_PARENT_VALIDATIONS = {};

	function getType(val) {
		if (Array.isArray(val)) {
			return "array";
		} else if (val === null) {
			return "null";
		} else {
			return typeof val;
		}
	}

	function validate$2(validate2) {
		return {
			validate: validate2
		};
	}

	function validateType(...typeNames) {
		return validate$2(assertNodeType(...typeNames));
	}

	function validateOptional(validate2) {
		return {
			validate: validate2,
			optional: true
		};
	}

	function validateOptionalType(...typeNames) {
		return {
			validate: assertNodeType(...typeNames),
			optional: true
		};
	}

	function arrayOf(elementType) {
		return chain(assertValueType("array"), assertEach(elementType));
	}

	function arrayOfType(...typeNames) {
		return arrayOf(assertNodeType(...typeNames));
	}

	function validateArrayOfType(...typeNames) {
		return validate$2(arrayOfType(...typeNames));
	}

	function assertEach(callback) {
		const childValidator = {}.BABEL_TYPES_8_BREAKING ? _validate$1.validateChild : () => {
		};

		function validator(node2, key, val) {
			if (!Array.isArray(val))
				return;
			for (let i = 0; i < val.length; i++) {
				const subkey = `${key}[${i}]`;
				const v = val[i];
				callback(node2, subkey, v);
				childValidator(node2, subkey, v);
			}
		}

		validator.each = callback;
		return validator;
	}

	function assertOneOf(...values) {
		function validate2(node2, key, val) {
			if (!values.includes(val)) {
				throw new TypeError(`Property ${key} expected value to be one of ${JSON.stringify(values)} but got ${JSON.stringify(val)}`);
			}
		}

		validate2.oneOf = values;
		return validate2;
	}

	function assertNodeType(...types2) {
		function validate2(node2, key, val) {
			for (const type of types2) {
				if ((0, _is$3.default)(type, val)) {
					(0, _validate$1.validateChild)(node2, key, val);
					return;
				}
			}
			throw new TypeError(`Property ${key} of ${node2.type} expected node to be of a type ${JSON.stringify(types2)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
		}

		validate2.oneOfNodeTypes = types2;
		return validate2;
	}

	function assertNodeOrValueType(...types2) {
		function validate2(node2, key, val) {
			for (const type of types2) {
				if (getType(val) === type || (0, _is$3.default)(type, val)) {
					(0, _validate$1.validateChild)(node2, key, val);
					return;
				}
			}
			throw new TypeError(`Property ${key} of ${node2.type} expected node to be of a type ${JSON.stringify(types2)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
		}

		validate2.oneOfNodeOrValueTypes = types2;
		return validate2;
	}

	function assertValueType(type) {
		function validate2(node2, key, val) {
			const valid = getType(val) === type;
			if (!valid) {
				throw new TypeError(`Property ${key} expected type of ${type} but got ${getType(val)}`);
			}
		}

		validate2.type = type;
		return validate2;
	}

	function assertShape(shape) {
		function validate2(node2, key, val) {
			const errors = [];
			for (const property of Object.keys(shape)) {
				try {
					(0, _validate$1.validateField)(node2, property, val[property], shape[property]);
				} catch (error) {
					if (error instanceof TypeError) {
						errors.push(error.message);
						continue;
					}
					throw error;
				}
			}
			if (errors.length) {
				throw new TypeError(`Property ${key} of ${node2.type} expected to have the following:
${errors.join("\n")}`);
			}
		}

		validate2.shapeOf = shape;
		return validate2;
	}

	function assertOptionalChainStart() {
		function validate2(node2) {
			var _current;
			let current = node2;
			while (node2) {
				const {
					type
				} = current;
				if (type === "OptionalCallExpression") {
					if (current.optional)
						return;
					current = current.callee;
					continue;
				}
				if (type === "OptionalMemberExpression") {
					if (current.optional)
						return;
					current = current.object;
					continue;
				}
				break;
			}
			throw new TypeError(`Non-optional ${node2.type} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ${(_current = current) == null ? void 0 : _current.type}`);
		}

		return validate2;
	}

	function chain(...fns) {
		function validate2(...args) {
			for (const fn of fns) {
				fn(...args);
			}
		}

		validate2.chainOf = fns;
		if (fns.length >= 2 && "type" in fns[0] && fns[0].type === "array" && !("each" in fns[1])) {
			throw new Error(`An assertValueType("array") validator can only be followed by an assertEach(...) validator.`);
		}
		return validate2;
	}

	const validTypeOpts = /* @__PURE__ */ new Set(["aliases", "builder", "deprecatedAlias", "fields", "inherits", "visitor", "validate"]);
	const validFieldKeys = /* @__PURE__ */ new Set(["default", "optional", "deprecated", "validate"]);
	const store = {};

	function defineAliasedType(...aliases) {
		return (type, opts = {}) => {
			let defined = opts.aliases;
			if (!defined) {
				var _store$opts$inherits$;
				if (opts.inherits)
					defined = (_store$opts$inherits$ = store[opts.inherits].aliases) == null ? void 0 : _store$opts$inherits$.slice();
				defined != null ? defined : defined = [];
				opts.aliases = defined;
			}
			const additional = aliases.filter((a) => !defined.includes(a));
			defined.unshift(...additional);
			defineType$5(type, opts);
		};
	}

	function defineType$5(type, opts = {}) {
		const inherits2 = opts.inherits && store[opts.inherits] || {};
		let fields = opts.fields;
		if (!fields) {
			fields = {};
			if (inherits2.fields) {
				const keys2 = Object.getOwnPropertyNames(inherits2.fields);
				for (const key of keys2) {
					const field = inherits2.fields[key];
					const def = field.default;
					if (Array.isArray(def) ? def.length > 0 : def && typeof def === "object") {
						throw new Error("field defaults can only be primitives or empty arrays currently");
					}
					fields[key] = {
						default: Array.isArray(def) ? [] : def,
						optional: field.optional,
						deprecated: field.deprecated,
						validate: field.validate
					};
				}
			}
		}
		const visitor = opts.visitor || inherits2.visitor || [];
		const aliases = opts.aliases || inherits2.aliases || [];
		const builder = opts.builder || inherits2.builder || opts.visitor || [];
		for (const k of Object.keys(opts)) {
			if (!validTypeOpts.has(k)) {
				throw new Error(`Unknown type option "${k}" on ${type}`);
			}
		}
		if (opts.deprecatedAlias) {
			DEPRECATED_KEYS[opts.deprecatedAlias] = type;
		}
		for (const key of visitor.concat(builder)) {
			fields[key] = fields[key] || {};
		}
		for (const key of Object.keys(fields)) {
			const field = fields[key];
			if (field.default !== void 0 && !builder.includes(key)) {
				field.optional = true;
			}
			if (field.default === void 0) {
				field.default = null;
			} else if (!field.validate && field.default != null) {
				field.validate = assertValueType(getType(field.default));
			}
			for (const k of Object.keys(field)) {
				if (!validFieldKeys.has(k)) {
					throw new Error(`Unknown field key "${k}" on ${type}.${key}`);
				}
			}
		}
		VISITOR_KEYS$2[type] = opts.visitor = visitor;
		BUILDER_KEYS[type] = opts.builder = builder;
		NODE_FIELDS$1[type] = opts.fields = fields;
		ALIAS_KEYS[type] = opts.aliases = aliases;
		aliases.forEach((alias) => {
			FLIPPED_ALIAS_KEYS$2[alias] = FLIPPED_ALIAS_KEYS$2[alias] || [];
			FLIPPED_ALIAS_KEYS$2[alias].push(type);
		});
		if (opts.validate) {
			NODE_PARENT_VALIDATIONS[type] = opts.validate;
		}
		store[type] = opts;
	}

	Object.defineProperty(core, "__esModule", {
		value: true
	});
	core.patternLikeCommon = core.importAttributes = core.functionTypeAnnotationCommon = core.functionDeclarationCommon = core.functionCommon = core.classMethodOrPropertyCommon = core.classMethodOrDeclareMethodCommon = void 0;
	var _is$2 = is$1;
	var _isValidIdentifier$3 = isValidIdentifier$1;
	var _helperValidatorIdentifier$1 = lib$1;
	var _helperStringParser = lib;
	var _index$E = constants;
	var _utils$6 = utils$1;
	const defineType$4 = (0, _utils$6.defineAliasedType)("Standardized");
	defineType$4("ArrayExpression", {
		fields: {
			elements: {
				validate: (0, _utils$6.arrayOf)((0, _utils$6.assertNodeOrValueType)("null", "Expression", "SpreadElement")),
				default: !{}.BABEL_TYPES_8_BREAKING ? [] : void 0
			}
		},
		visitor: ["elements"],
		aliases: ["Expression"]
	});
	defineType$4("AssignmentExpression", {
		fields: {
			operator: {
				validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertValueType)("string") : Object.assign(function () {
					const identifier2 = (0, _utils$6.assertOneOf)(..._index$E.ASSIGNMENT_OPERATORS);
					const pattern = (0, _utils$6.assertOneOf)("=");
					return function (node2, key, val) {
						const validator = (0, _is$2.default)("Pattern", node2.left) ? pattern : identifier2;
						validator(node2, key, val);
					};
				}(), {
					type: "string"
				})
			},
			left: {
				validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertNodeType)("LVal", "OptionalMemberExpression") : (0, _utils$6.assertNodeType)("Identifier", "MemberExpression", "OptionalMemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
			},
			right: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		},
		builder: ["operator", "left", "right"],
		visitor: ["left", "right"],
		aliases: ["Expression"]
	});
	defineType$4("BinaryExpression", {
		builder: ["operator", "left", "right"],
		fields: {
			operator: {
				validate: (0, _utils$6.assertOneOf)(..._index$E.BINARY_OPERATORS)
			},
			left: {
				validate: function () {
					const expression = (0, _utils$6.assertNodeType)("Expression");
					const inOp = (0, _utils$6.assertNodeType)("Expression", "PrivateName");
					const validator = Object.assign(function (node2, key, val) {
						const validator2 = node2.operator === "in" ? inOp : expression;
						validator2(node2, key, val);
					}, {
						oneOfNodeTypes: ["Expression", "PrivateName"]
					});
					return validator;
				}()
			},
			right: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		},
		visitor: ["left", "right"],
		aliases: ["Binary", "Expression"]
	});
	defineType$4("InterpreterDirective", {
		builder: ["value"],
		fields: {
			value: {
				validate: (0, _utils$6.assertValueType)("string")
			}
		}
	});
	defineType$4("Directive", {
		visitor: ["value"],
		fields: {
			value: {
				validate: (0, _utils$6.assertNodeType)("DirectiveLiteral")
			}
		}
	});
	defineType$4("DirectiveLiteral", {
		builder: ["value"],
		fields: {
			value: {
				validate: (0, _utils$6.assertValueType)("string")
			}
		}
	});
	defineType$4("BlockStatement", {
		builder: ["body", "directives"],
		visitor: ["directives", "body"],
		fields: {
			directives: {
				validate: (0, _utils$6.arrayOfType)("Directive"),
				default: []
			},
			body: (0, _utils$6.validateArrayOfType)("Statement")
		},
		aliases: ["Scopable", "BlockParent", "Block", "Statement"]
	});
	defineType$4("BreakStatement", {
		visitor: ["label"],
		fields: {
			label: {
				validate: (0, _utils$6.assertNodeType)("Identifier"),
				optional: true
			}
		},
		aliases: ["Statement", "Terminatorless", "CompletionStatement"]
	});
	defineType$4("CallExpression", {
		visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
		builder: ["callee", "arguments"],
		aliases: ["Expression"],
		fields: Object.assign({
			callee: {
				validate: (0, _utils$6.assertNodeType)("Expression", "Super", "V8IntrinsicIdentifier")
			},
			arguments: (0, _utils$6.validateArrayOfType)("Expression", "SpreadElement", "ArgumentPlaceholder"),
			typeArguments: {
				validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation"),
				optional: true
			}
		}, {
			optional: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			typeParameters: {
				validate: (0, _utils$6.assertNodeType)("TSTypeParameterInstantiation"),
				optional: true
			}
		}, {}.BABEL_TYPES_8_BREAKING ? {} : {
			optional: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			}
		})
	});
	defineType$4("CatchClause", {
		visitor: ["param", "body"],
		fields: {
			param: {
				validate: (0, _utils$6.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"),
				optional: true
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("BlockStatement")
			}
		},
		aliases: ["Scopable", "BlockParent"]
	});
	defineType$4("ConditionalExpression", {
		visitor: ["test", "consequent", "alternate"],
		fields: {
			test: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			consequent: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			alternate: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		},
		aliases: ["Expression", "Conditional"]
	});
	defineType$4("ContinueStatement", {
		visitor: ["label"],
		fields: {
			label: {
				validate: (0, _utils$6.assertNodeType)("Identifier"),
				optional: true
			}
		},
		aliases: ["Statement", "Terminatorless", "CompletionStatement"]
	});
	defineType$4("DebuggerStatement", {
		aliases: ["Statement"]
	});
	defineType$4("DoWhileStatement", {
		builder: ["test", "body"],
		visitor: ["body", "test"],
		fields: {
			test: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("Statement")
			}
		},
		aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
	});
	defineType$4("EmptyStatement", {
		aliases: ["Statement"]
	});
	defineType$4("ExpressionStatement", {
		visitor: ["expression"],
		fields: {
			expression: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		},
		aliases: ["Statement", "ExpressionWrapper"]
	});
	defineType$4("File", {
		builder: ["program", "comments", "tokens"],
		visitor: ["program"],
		fields: {
			program: {
				validate: (0, _utils$6.assertNodeType)("Program")
			},
			comments: {
				validate: !{}.BABEL_TYPES_8_BREAKING ? Object.assign(() => {
				}, {
					each: {
						oneOfNodeTypes: ["CommentBlock", "CommentLine"]
					}
				}) : (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("CommentBlock", "CommentLine")),
				optional: true
			},
			tokens: {
				validate: (0, _utils$6.assertEach)(Object.assign(() => {
				}, {
					type: "any"
				})),
				optional: true
			}
		}
	});
	defineType$4("ForInStatement", {
		visitor: ["left", "right", "body"],
		aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
		fields: {
			left: {
				validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertNodeType)("VariableDeclaration", "LVal") : (0, _utils$6.assertNodeType)("VariableDeclaration", "Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
			},
			right: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("Statement")
			}
		}
	});
	defineType$4("ForStatement", {
		visitor: ["init", "test", "update", "body"],
		aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
		fields: {
			init: {
				validate: (0, _utils$6.assertNodeType)("VariableDeclaration", "Expression"),
				optional: true
			},
			test: {
				validate: (0, _utils$6.assertNodeType)("Expression"),
				optional: true
			},
			update: {
				validate: (0, _utils$6.assertNodeType)("Expression"),
				optional: true
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("Statement")
			}
		}
	});
	const functionCommon = () => ({
		params: (0, _utils$6.validateArrayOfType)("Identifier", "Pattern", "RestElement"),
		generator: {
			default: false
		},
		async: {
			default: false
		}
	});
	core.functionCommon = functionCommon;
	const functionTypeAnnotationCommon = () => ({
		returnType: {
			validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
			optional: true
		},
		typeParameters: {
			validate: (0, _utils$6.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
			optional: true
		}
	});
	core.functionTypeAnnotationCommon = functionTypeAnnotationCommon;
	const functionDeclarationCommon = () => Object.assign({}, functionCommon(), {
		declare: {
			validate: (0, _utils$6.assertValueType)("boolean"),
			optional: true
		},
		id: {
			validate: (0, _utils$6.assertNodeType)("Identifier"),
			optional: true
		}
	});
	core.functionDeclarationCommon = functionDeclarationCommon;
	defineType$4("FunctionDeclaration", {
		builder: ["id", "params", "body", "generator", "async"],
		visitor: ["id", "typeParameters", "params", "predicate", "returnType", "body"],
		fields: Object.assign({}, functionDeclarationCommon(), functionTypeAnnotationCommon(), {
			body: {
				validate: (0, _utils$6.assertNodeType)("BlockStatement")
			},
			predicate: {
				validate: (0, _utils$6.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
				optional: true
			}
		}),
		aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pureish", "Declaration"],
		validate: !{}.BABEL_TYPES_8_BREAKING ? void 0 : function () {
			const identifier2 = (0, _utils$6.assertNodeType)("Identifier");
			return function (parent, key, node2) {
				if (!(0, _is$2.default)("ExportDefaultDeclaration", parent)) {
					identifier2(node2, "id", node2.id);
				}
			};
		}()
	});
	defineType$4("FunctionExpression", {
		inherits: "FunctionDeclaration",
		aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
		fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
			id: {
				validate: (0, _utils$6.assertNodeType)("Identifier"),
				optional: true
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("BlockStatement")
			},
			predicate: {
				validate: (0, _utils$6.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
				optional: true
			}
		})
	});
	const patternLikeCommon = () => ({
		typeAnnotation: {
			validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
			optional: true
		},
		optional: {
			validate: (0, _utils$6.assertValueType)("boolean"),
			optional: true
		},
		decorators: {
			validate: (0, _utils$6.arrayOfType)("Decorator"),
			optional: true
		}
	});
	core.patternLikeCommon = patternLikeCommon;
	defineType$4("Identifier", {
		builder: ["name"],
		visitor: ["typeAnnotation", "decorators"],
		aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],
		fields: Object.assign({}, patternLikeCommon(), {
			name: {
				validate: {}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.chain)((0, _utils$6.assertValueType)("string"), Object.assign(function (node2, key, val) {
					if (!(0, _isValidIdentifier$3.default)(val, false)) {
						throw new TypeError(`"${val}" is not a valid identifier name`);
					}
				}, {
					type: "string"
				})) : (0, _utils$6.assertValueType)("string")
			}
		}),
		validate: {}.BABEL_TYPES_8_BREAKING ? function (parent, key, node2) {
			const match = /\.(\w+)$/.exec(key);
			if (!match)
				return;
			const [, parentKey] = match;
			const nonComp = {
				computed: false
			};
			if (parentKey === "property") {
				if ((0, _is$2.default)("MemberExpression", parent, nonComp))
					return;
				if ((0, _is$2.default)("OptionalMemberExpression", parent, nonComp))
					return;
			} else if (parentKey === "key") {
				if ((0, _is$2.default)("Property", parent, nonComp))
					return;
				if ((0, _is$2.default)("Method", parent, nonComp))
					return;
			} else if (parentKey === "exported") {
				if ((0, _is$2.default)("ExportSpecifier", parent))
					return;
			} else if (parentKey === "imported") {
				if ((0, _is$2.default)("ImportSpecifier", parent, {
					imported: node2
				}))
					return;
			} else if (parentKey === "meta") {
				if ((0, _is$2.default)("MetaProperty", parent, {
					meta: node2
				}))
					return;
			}
			if (((0, _helperValidatorIdentifier$1.isKeyword)(node2.name) || (0, _helperValidatorIdentifier$1.isReservedWord)(node2.name, false)) && node2.name !== "this") {
				throw new TypeError(`"${node2.name}" is not a valid identifier`);
			}
		} : void 0
	});
	defineType$4("IfStatement", {
		visitor: ["test", "consequent", "alternate"],
		aliases: ["Statement", "Conditional"],
		fields: {
			test: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			consequent: {
				validate: (0, _utils$6.assertNodeType)("Statement")
			},
			alternate: {
				optional: true,
				validate: (0, _utils$6.assertNodeType)("Statement")
			}
		}
	});
	defineType$4("LabeledStatement", {
		visitor: ["label", "body"],
		aliases: ["Statement"],
		fields: {
			label: {
				validate: (0, _utils$6.assertNodeType)("Identifier")
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("Statement")
			}
		}
	});
	defineType$4("StringLiteral", {
		builder: ["value"],
		fields: {
			value: {
				validate: (0, _utils$6.assertValueType)("string")
			}
		},
		aliases: ["Expression", "Pureish", "Literal", "Immutable"]
	});
	defineType$4("NumericLiteral", {
		builder: ["value"],
		deprecatedAlias: "NumberLiteral",
		fields: {
			value: {
				validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("number"), Object.assign(function (node2, key, val) {
				}, {
					type: "number"
				}))
			}
		},
		aliases: ["Expression", "Pureish", "Literal", "Immutable"]
	});
	defineType$4("NullLiteral", {
		aliases: ["Expression", "Pureish", "Literal", "Immutable"]
	});
	defineType$4("BooleanLiteral", {
		builder: ["value"],
		fields: {
			value: {
				validate: (0, _utils$6.assertValueType)("boolean")
			}
		},
		aliases: ["Expression", "Pureish", "Literal", "Immutable"]
	});
	defineType$4("RegExpLiteral", {
		builder: ["pattern", "flags"],
		deprecatedAlias: "RegexLiteral",
		aliases: ["Expression", "Pureish", "Literal"],
		fields: {
			pattern: {
				validate: (0, _utils$6.assertValueType)("string")
			},
			flags: {
				validate: {}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.chain)((0, _utils$6.assertValueType)("string"), Object.assign(function (node2, key, val) {
					const invalid = /[^gimsuy]/.exec(val);
					if (invalid) {
						throw new TypeError(`"${invalid[0]}" is not a valid RegExp flag`);
					}
				}, {
					type: "string"
				})) : (0, _utils$6.assertValueType)("string"),
				default: ""
			}
		}
	});
	defineType$4("LogicalExpression", {
		builder: ["operator", "left", "right"],
		visitor: ["left", "right"],
		aliases: ["Binary", "Expression"],
		fields: {
			operator: {
				validate: (0, _utils$6.assertOneOf)(..._index$E.LOGICAL_OPERATORS)
			},
			left: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			right: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		}
	});
	defineType$4("MemberExpression", {
		builder: ["object", "property", "computed", ...!{}.BABEL_TYPES_8_BREAKING ? ["optional"] : []],
		visitor: ["object", "property"],
		aliases: ["Expression", "LVal"],
		fields: Object.assign({
			object: {
				validate: (0, _utils$6.assertNodeType)("Expression", "Super")
			},
			property: {
				validate: function () {
					const normal = (0, _utils$6.assertNodeType)("Identifier", "PrivateName");
					const computed = (0, _utils$6.assertNodeType)("Expression");
					const validator = function (node2, key, val) {
						const validator2 = node2.computed ? computed : normal;
						validator2(node2, key, val);
					};
					validator.oneOfNodeTypes = ["Expression", "Identifier", "PrivateName"];
					return validator;
				}()
			},
			computed: {
				default: false
			}
		}, !{}.BABEL_TYPES_8_BREAKING ? {
			optional: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			}
		} : {})
	});
	defineType$4("NewExpression", {
		inherits: "CallExpression"
	});
	defineType$4("Program", {
		visitor: ["directives", "body"],
		builder: ["body", "directives", "sourceType", "interpreter"],
		fields: {
			sourceType: {
				validate: (0, _utils$6.assertOneOf)("script", "module"),
				default: "script"
			},
			interpreter: {
				validate: (0, _utils$6.assertNodeType)("InterpreterDirective"),
				default: null,
				optional: true
			},
			directives: {
				validate: (0, _utils$6.arrayOfType)("Directive"),
				default: []
			},
			body: (0, _utils$6.validateArrayOfType)("Statement")
		},
		aliases: ["Scopable", "BlockParent", "Block"]
	});
	defineType$4("ObjectExpression", {
		visitor: ["properties"],
		aliases: ["Expression"],
		fields: {
			properties: (0, _utils$6.validateArrayOfType)("ObjectMethod", "ObjectProperty", "SpreadElement")
		}
	});
	defineType$4("ObjectMethod", {
		builder: ["kind", "key", "params", "body", "computed", "generator", "async"],
		visitor: ["decorators", "key", "typeParameters", "params", "returnType", "body"],
		fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
			kind: Object.assign({
				validate: (0, _utils$6.assertOneOf)("method", "get", "set")
			}, !{}.BABEL_TYPES_8_BREAKING ? {
				default: "method"
			} : {}),
			computed: {
				default: false
			},
			key: {
				validate: function () {
					const normal = (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral");
					const computed = (0, _utils$6.assertNodeType)("Expression");
					const validator = function (node2, key, val) {
						const validator2 = node2.computed ? computed : normal;
						validator2(node2, key, val);
					};
					validator.oneOfNodeTypes = ["Expression", "Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral"];
					return validator;
				}()
			},
			decorators: {
				validate: (0, _utils$6.arrayOfType)("Decorator"),
				optional: true
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("BlockStatement")
			}
		}),
		aliases: ["UserWhitespacable", "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "ObjectMember"]
	});
	defineType$4("ObjectProperty", {
		builder: ["key", "value", "computed", "shorthand", ...!{}.BABEL_TYPES_8_BREAKING ? ["decorators"] : []],
		fields: {
			computed: {
				default: false
			},
			key: {
				validate: function () {
					const normal = (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "PrivateName");
					const computed = (0, _utils$6.assertNodeType)("Expression");
					const validator = Object.assign(function (node2, key, val) {
						const validator2 = node2.computed ? computed : normal;
						validator2(node2, key, val);
					}, {
						oneOfNodeTypes: ["Expression", "Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "PrivateName"]
					});
					return validator;
				}()
			},
			value: {
				validate: (0, _utils$6.assertNodeType)("Expression", "PatternLike")
			},
			shorthand: {
				validate: {}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.chain)((0, _utils$6.assertValueType)("boolean"), Object.assign(function (node2, key, shorthand) {
					if (!shorthand)
						return;
					if (node2.computed) {
						throw new TypeError("Property shorthand of ObjectProperty cannot be true if computed is true");
					}
					if (!(0, _is$2.default)("Identifier", node2.key)) {
						throw new TypeError("Property shorthand of ObjectProperty cannot be true if key is not an Identifier");
					}
				}, {
					type: "boolean"
				})) : (0, _utils$6.assertValueType)("boolean"),
				default: false
			},
			decorators: {
				validate: (0, _utils$6.arrayOfType)("Decorator"),
				optional: true
			}
		},
		visitor: ["key", "value", "decorators"],
		aliases: ["UserWhitespacable", "Property", "ObjectMember"],
		validate: !{}.BABEL_TYPES_8_BREAKING ? void 0 : function () {
			const pattern = (0, _utils$6.assertNodeType)("Identifier", "Pattern", "TSAsExpression", "TSSatisfiesExpression", "TSNonNullExpression", "TSTypeAssertion");
			const expression = (0, _utils$6.assertNodeType)("Expression");
			return function (parent, key, node2) {
				const validator = (0, _is$2.default)("ObjectPattern", parent) ? pattern : expression;
				validator(node2, "value", node2.value);
			};
		}()
	});
	defineType$4("RestElement", {
		visitor: ["argument", "typeAnnotation"],
		builder: ["argument"],
		aliases: ["LVal", "PatternLike"],
		deprecatedAlias: "RestProperty",
		fields: Object.assign({}, patternLikeCommon(), {
			argument: {
				validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertNodeType)("LVal") : (0, _utils$6.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern", "MemberExpression", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
			}
		}),
		validate: {}.BABEL_TYPES_8_BREAKING ? function (parent, key) {
			const match = /(\w+)\[(\d+)\]/.exec(key);
			if (!match)
				throw new Error("Internal Babel error: malformed key.");
			const [, listKey, index] = match;
			if (parent[listKey].length > +index + 1) {
				throw new TypeError(`RestElement must be last element of ${listKey}`);
			}
		} : void 0
	});
	defineType$4("ReturnStatement", {
		visitor: ["argument"],
		aliases: ["Statement", "Terminatorless", "CompletionStatement"],
		fields: {
			argument: {
				validate: (0, _utils$6.assertNodeType)("Expression"),
				optional: true
			}
		}
	});
	defineType$4("SequenceExpression", {
		visitor: ["expressions"],
		fields: {
			expressions: (0, _utils$6.validateArrayOfType)("Expression")
		},
		aliases: ["Expression"]
	});
	defineType$4("ParenthesizedExpression", {
		visitor: ["expression"],
		aliases: ["Expression", "ExpressionWrapper"],
		fields: {
			expression: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		}
	});
	defineType$4("SwitchCase", {
		visitor: ["test", "consequent"],
		fields: {
			test: {
				validate: (0, _utils$6.assertNodeType)("Expression"),
				optional: true
			},
			consequent: (0, _utils$6.validateArrayOfType)("Statement")
		}
	});
	defineType$4("SwitchStatement", {
		visitor: ["discriminant", "cases"],
		aliases: ["Statement", "BlockParent", "Scopable"],
		fields: {
			discriminant: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			cases: (0, _utils$6.validateArrayOfType)("SwitchCase")
		}
	});
	defineType$4("ThisExpression", {
		aliases: ["Expression"]
	});
	defineType$4("ThrowStatement", {
		visitor: ["argument"],
		aliases: ["Statement", "Terminatorless", "CompletionStatement"],
		fields: {
			argument: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		}
	});
	defineType$4("TryStatement", {
		visitor: ["block", "handler", "finalizer"],
		aliases: ["Statement"],
		fields: {
			block: {
				validate: {}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.chain)((0, _utils$6.assertNodeType)("BlockStatement"), Object.assign(function (node2) {
					if (!node2.handler && !node2.finalizer) {
						throw new TypeError("TryStatement expects either a handler or finalizer, or both");
					}
				}, {
					oneOfNodeTypes: ["BlockStatement"]
				})) : (0, _utils$6.assertNodeType)("BlockStatement")
			},
			handler: {
				optional: true,
				validate: (0, _utils$6.assertNodeType)("CatchClause")
			},
			finalizer: {
				optional: true,
				validate: (0, _utils$6.assertNodeType)("BlockStatement")
			}
		}
	});
	defineType$4("UnaryExpression", {
		builder: ["operator", "argument", "prefix"],
		fields: {
			prefix: {
				default: true
			},
			argument: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			operator: {
				validate: (0, _utils$6.assertOneOf)(..._index$E.UNARY_OPERATORS)
			}
		},
		visitor: ["argument"],
		aliases: ["UnaryLike", "Expression"]
	});
	defineType$4("UpdateExpression", {
		builder: ["operator", "argument", "prefix"],
		fields: {
			prefix: {
				default: false
			},
			argument: {
				validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertNodeType)("Expression") : (0, _utils$6.assertNodeType)("Identifier", "MemberExpression")
			},
			operator: {
				validate: (0, _utils$6.assertOneOf)(..._index$E.UPDATE_OPERATORS)
			}
		},
		visitor: ["argument"],
		aliases: ["Expression"]
	});
	defineType$4("VariableDeclaration", {
		builder: ["kind", "declarations"],
		visitor: ["declarations"],
		aliases: ["Statement", "Declaration"],
		fields: {
			declare: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			kind: {
				validate: (0, _utils$6.assertOneOf)("var", "let", "const", "using", "await using")
			},
			declarations: (0, _utils$6.validateArrayOfType)("VariableDeclarator")
		},
		validate: {}.BABEL_TYPES_8_BREAKING ? (() => {
			const withoutInit = (0, _utils$6.assertNodeType)("Identifier");
			return function (parent, key, node2) {
				if ((0, _is$2.default)("ForXStatement", parent, {
					left: node2
				})) {
					if (node2.declarations.length !== 1) {
						throw new TypeError(`Exactly one VariableDeclarator is required in the VariableDeclaration of a ${parent.type}`);
					}
				} else {
					node2.declarations.forEach((decl) => {
						if (!decl.init)
							withoutInit(decl, "id", decl.id);
					});
				}
			};
		})() : void 0
	});
	defineType$4("VariableDeclarator", {
		visitor: ["id", "init"],
		fields: {
			id: {
				validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertNodeType)("LVal") : (0, _utils$6.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern")
			},
			definite: {
				optional: true,
				validate: (0, _utils$6.assertValueType)("boolean")
			},
			init: {
				optional: true,
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		}
	});
	defineType$4("WhileStatement", {
		visitor: ["test", "body"],
		aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
		fields: {
			test: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("Statement")
			}
		}
	});
	defineType$4("WithStatement", {
		visitor: ["object", "body"],
		aliases: ["Statement"],
		fields: {
			object: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("Statement")
			}
		}
	});
	defineType$4("AssignmentPattern", {
		visitor: ["left", "right", "decorators"],
		builder: ["left", "right"],
		aliases: ["Pattern", "PatternLike", "LVal"],
		fields: Object.assign({}, patternLikeCommon(), {
			left: {
				validate: (0, _utils$6.assertNodeType)("Identifier", "ObjectPattern", "ArrayPattern", "MemberExpression", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression")
			},
			right: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			decorators: {
				validate: (0, _utils$6.arrayOfType)("Decorator"),
				optional: true
			}
		})
	});
	defineType$4("ArrayPattern", {
		visitor: ["elements", "typeAnnotation"],
		builder: ["elements"],
		aliases: ["Pattern", "PatternLike", "LVal"],
		fields: Object.assign({}, patternLikeCommon(), {
			elements: {
				validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeOrValueType)("null", "PatternLike", "LVal")))
			}
		})
	});
	defineType$4("ArrowFunctionExpression", {
		builder: ["params", "body", "async"],
		visitor: ["typeParameters", "params", "predicate", "returnType", "body"],
		aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
		fields: Object.assign({}, functionCommon(), functionTypeAnnotationCommon(), {
			expression: {
				validate: (0, _utils$6.assertValueType)("boolean")
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("BlockStatement", "Expression")
			},
			predicate: {
				validate: (0, _utils$6.assertNodeType)("DeclaredPredicate", "InferredPredicate"),
				optional: true
			}
		})
	});
	defineType$4("ClassBody", {
		visitor: ["body"],
		fields: {
			body: (0, _utils$6.validateArrayOfType)("ClassMethod", "ClassPrivateMethod", "ClassProperty", "ClassPrivateProperty", "ClassAccessorProperty", "TSDeclareMethod", "TSIndexSignature", "StaticBlock")
		}
	});
	defineType$4("ClassExpression", {
		builder: ["id", "superClass", "body", "decorators"],
		visitor: ["decorators", "id", "typeParameters", "superClass", "superTypeParameters", "mixins", "implements", "body"],
		aliases: ["Scopable", "Class", "Expression"],
		fields: {
			id: {
				validate: (0, _utils$6.assertNodeType)("Identifier"),
				optional: true
			},
			typeParameters: {
				validate: (0, _utils$6.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
				optional: true
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("ClassBody")
			},
			superClass: {
				optional: true,
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			["superTypeParameters"]: {
				validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
				optional: true
			},
			implements: {
				validate: (0, _utils$6.arrayOfType)("TSExpressionWithTypeArguments", "ClassImplements"),
				optional: true
			},
			decorators: {
				validate: (0, _utils$6.arrayOfType)("Decorator"),
				optional: true
			},
			mixins: {
				validate: (0, _utils$6.assertNodeType)("InterfaceExtends"),
				optional: true
			}
		}
	});
	defineType$4("ClassDeclaration", {
		inherits: "ClassExpression",
		aliases: ["Scopable", "Class", "Statement", "Declaration"],
		fields: {
			id: {
				validate: (0, _utils$6.assertNodeType)("Identifier"),
				optional: true
			},
			typeParameters: {
				validate: (0, _utils$6.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
				optional: true
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("ClassBody")
			},
			superClass: {
				optional: true,
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			["superTypeParameters"]: {
				validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
				optional: true
			},
			implements: {
				validate: (0, _utils$6.arrayOfType)("TSExpressionWithTypeArguments", "ClassImplements"),
				optional: true
			},
			decorators: {
				validate: (0, _utils$6.arrayOfType)("Decorator"),
				optional: true
			},
			mixins: {
				validate: (0, _utils$6.assertNodeType)("InterfaceExtends"),
				optional: true
			},
			declare: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			abstract: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			}
		},
		validate: !{}.BABEL_TYPES_8_BREAKING ? void 0 : function () {
			const identifier2 = (0, _utils$6.assertNodeType)("Identifier");
			return function (parent, key, node2) {
				if (!(0, _is$2.default)("ExportDefaultDeclaration", parent)) {
					identifier2(node2, "id", node2.id);
				}
			};
		}()
	});
	const importAttributes = core.importAttributes = {
		attributes: {
			optional: true,
			validate: (0, _utils$6.arrayOfType)("ImportAttribute")
		},
		assertions: {
			deprecated: true,
			optional: true,
			validate: (0, _utils$6.arrayOfType)("ImportAttribute")
		}
	};
	defineType$4("ExportAllDeclaration", {
		builder: ["source"],
		visitor: ["source", "attributes", "assertions"],
		aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
		fields: Object.assign({
			source: {
				validate: (0, _utils$6.assertNodeType)("StringLiteral")
			},
			exportKind: (0, _utils$6.validateOptional)((0, _utils$6.assertOneOf)("type", "value"))
		}, importAttributes)
	});
	defineType$4("ExportDefaultDeclaration", {
		visitor: ["declaration"],
		aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
		fields: {
			declaration: (0, _utils$6.validateType)("TSDeclareFunction", "FunctionDeclaration", "ClassDeclaration", "Expression"),
			exportKind: (0, _utils$6.validateOptional)((0, _utils$6.assertOneOf)("value"))
		}
	});
	defineType$4("ExportNamedDeclaration", {
		builder: ["declaration", "specifiers", "source"],
		visitor: ["declaration", "specifiers", "source", "attributes", "assertions"],
		aliases: ["Statement", "Declaration", "ImportOrExportDeclaration", "ExportDeclaration"],
		fields: Object.assign({
			declaration: {
				optional: true,
				validate: {}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.chain)((0, _utils$6.assertNodeType)("Declaration"), Object.assign(function (node2, key, val) {
					if (val && node2.specifiers.length) {
						throw new TypeError("Only declaration or specifiers is allowed on ExportNamedDeclaration");
					}
					if (val && node2.source) {
						throw new TypeError("Cannot export a declaration from a source");
					}
				}, {
					oneOfNodeTypes: ["Declaration"]
				})) : (0, _utils$6.assertNodeType)("Declaration")
			}
		}, importAttributes, {
			specifiers: {
				default: [],
				validate: (0, _utils$6.arrayOf)(function () {
					const sourced = (0, _utils$6.assertNodeType)("ExportSpecifier", "ExportDefaultSpecifier", "ExportNamespaceSpecifier");
					const sourceless = (0, _utils$6.assertNodeType)("ExportSpecifier");
					if (!{}.BABEL_TYPES_8_BREAKING)
						return sourced;
					return Object.assign(function (node2, key, val) {
						const validator = node2.source ? sourced : sourceless;
						validator(node2, key, val);
					}, {
						oneOfNodeTypes: ["ExportSpecifier", "ExportDefaultSpecifier", "ExportNamespaceSpecifier"]
					});
				}())
			},
			source: {
				validate: (0, _utils$6.assertNodeType)("StringLiteral"),
				optional: true
			},
			exportKind: (0, _utils$6.validateOptional)((0, _utils$6.assertOneOf)("type", "value"))
		})
	});
	defineType$4("ExportSpecifier", {
		visitor: ["local", "exported"],
		aliases: ["ModuleSpecifier"],
		fields: {
			local: {
				validate: (0, _utils$6.assertNodeType)("Identifier")
			},
			exported: {
				validate: (0, _utils$6.assertNodeType)("Identifier", "StringLiteral")
			},
			exportKind: {
				validate: (0, _utils$6.assertOneOf)("type", "value"),
				optional: true
			}
		}
	});
	defineType$4("ForOfStatement", {
		visitor: ["left", "right", "body"],
		builder: ["left", "right", "body", "await"],
		aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
		fields: {
			left: {
				validate: function () {
					if (!{}.BABEL_TYPES_8_BREAKING) {
						return (0, _utils$6.assertNodeType)("VariableDeclaration", "LVal");
					}
					const declaration = (0, _utils$6.assertNodeType)("VariableDeclaration");
					const lval = (0, _utils$6.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression");
					return Object.assign(function (node2, key, val) {
						if ((0, _is$2.default)("VariableDeclaration", val)) {
							declaration(node2, key, val);
						} else {
							lval(node2, key, val);
						}
					}, {
						oneOfNodeTypes: ["VariableDeclaration", "Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern", "TSAsExpression", "TSSatisfiesExpression", "TSTypeAssertion", "TSNonNullExpression"]
					});
				}()
			},
			right: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("Statement")
			},
			await: {
				default: false
			}
		}
	});
	defineType$4("ImportDeclaration", {
		builder: ["specifiers", "source"],
		visitor: ["specifiers", "source", "attributes", "assertions"],
		aliases: ["Statement", "Declaration", "ImportOrExportDeclaration"],
		fields: Object.assign({}, importAttributes, {
			module: {
				optional: true,
				validate: (0, _utils$6.assertValueType)("boolean")
			},
			phase: {
				default: null,
				validate: (0, _utils$6.assertOneOf)("source", "defer")
			},
			specifiers: (0, _utils$6.validateArrayOfType)("ImportSpecifier", "ImportDefaultSpecifier", "ImportNamespaceSpecifier"),
			source: {
				validate: (0, _utils$6.assertNodeType)("StringLiteral")
			},
			importKind: {
				validate: (0, _utils$6.assertOneOf)("type", "typeof", "value"),
				optional: true
			}
		})
	});
	defineType$4("ImportDefaultSpecifier", {
		visitor: ["local"],
		aliases: ["ModuleSpecifier"],
		fields: {
			local: {
				validate: (0, _utils$6.assertNodeType)("Identifier")
			}
		}
	});
	defineType$4("ImportNamespaceSpecifier", {
		visitor: ["local"],
		aliases: ["ModuleSpecifier"],
		fields: {
			local: {
				validate: (0, _utils$6.assertNodeType)("Identifier")
			}
		}
	});
	defineType$4("ImportSpecifier", {
		visitor: ["imported", "local"],
		builder: ["local", "imported"],
		aliases: ["ModuleSpecifier"],
		fields: {
			local: {
				validate: (0, _utils$6.assertNodeType)("Identifier")
			},
			imported: {
				validate: (0, _utils$6.assertNodeType)("Identifier", "StringLiteral")
			},
			importKind: {
				validate: (0, _utils$6.assertOneOf)("type", "typeof", "value"),
				optional: true
			}
		}
	});
	defineType$4("ImportExpression", {
		visitor: ["source", "options"],
		aliases: ["Expression"],
		fields: {
			phase: {
				default: null,
				validate: (0, _utils$6.assertOneOf)("source", "defer")
			},
			source: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			options: {
				validate: (0, _utils$6.assertNodeType)("Expression"),
				optional: true
			}
		}
	});
	defineType$4("MetaProperty", {
		visitor: ["meta", "property"],
		aliases: ["Expression"],
		fields: {
			meta: {
				validate: {}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.chain)((0, _utils$6.assertNodeType)("Identifier"), Object.assign(function (node2, key, val) {
					let property;
					switch (val.name) {
						case "function":
							property = "sent";
							break;
						case "new":
							property = "target";
							break;
						case "import":
							property = "meta";
							break;
					}
					if (!(0, _is$2.default)("Identifier", node2.property, {
						name: property
					})) {
						throw new TypeError("Unrecognised MetaProperty");
					}
				}, {
					oneOfNodeTypes: ["Identifier"]
				})) : (0, _utils$6.assertNodeType)("Identifier")
			},
			property: {
				validate: (0, _utils$6.assertNodeType)("Identifier")
			}
		}
	});
	const classMethodOrPropertyCommon = () => ({
		abstract: {
			validate: (0, _utils$6.assertValueType)("boolean"),
			optional: true
		},
		accessibility: {
			validate: (0, _utils$6.assertOneOf)("public", "private", "protected"),
			optional: true
		},
		static: {
			default: false
		},
		override: {
			default: false
		},
		computed: {
			default: false
		},
		optional: {
			validate: (0, _utils$6.assertValueType)("boolean"),
			optional: true
		},
		key: {
			validate: (0, _utils$6.chain)(function () {
				const normal = (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral");
				const computed = (0, _utils$6.assertNodeType)("Expression");
				return function (node2, key, val) {
					const validator = node2.computed ? computed : normal;
					validator(node2, key, val);
				};
			}(), (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "Expression"))
		}
	});
	core.classMethodOrPropertyCommon = classMethodOrPropertyCommon;
	const classMethodOrDeclareMethodCommon = () => Object.assign({}, functionCommon(), classMethodOrPropertyCommon(), {
		params: (0, _utils$6.validateArrayOfType)("Identifier", "Pattern", "RestElement", "TSParameterProperty"),
		kind: {
			validate: (0, _utils$6.assertOneOf)("get", "set", "method", "constructor"),
			default: "method"
		},
		access: {
			validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("string"), (0, _utils$6.assertOneOf)("public", "private", "protected")),
			optional: true
		},
		decorators: {
			validate: (0, _utils$6.arrayOfType)("Decorator"),
			optional: true
		}
	});
	core.classMethodOrDeclareMethodCommon = classMethodOrDeclareMethodCommon;
	defineType$4("ClassMethod", {
		aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
		builder: ["kind", "key", "params", "body", "computed", "static", "generator", "async"],
		visitor: ["decorators", "key", "typeParameters", "params", "returnType", "body"],
		fields: Object.assign({}, classMethodOrDeclareMethodCommon(), functionTypeAnnotationCommon(), {
			body: {
				validate: (0, _utils$6.assertNodeType)("BlockStatement")
			}
		})
	});
	defineType$4("ObjectPattern", {
		visitor: ["properties", "typeAnnotation", "decorators"],
		builder: ["properties"],
		aliases: ["Pattern", "PatternLike", "LVal"],
		fields: Object.assign({}, patternLikeCommon(), {
			properties: (0, _utils$6.validateArrayOfType)("RestElement", "ObjectProperty")
		})
	});
	defineType$4("SpreadElement", {
		visitor: ["argument"],
		aliases: ["UnaryLike"],
		deprecatedAlias: "SpreadProperty",
		fields: {
			argument: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		}
	});
	defineType$4("Super", {
		aliases: ["Expression"]
	});
	defineType$4("TaggedTemplateExpression", {
		visitor: ["tag", "typeParameters", "quasi"],
		builder: ["tag", "quasi"],
		aliases: ["Expression"],
		fields: {
			tag: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			quasi: {
				validate: (0, _utils$6.assertNodeType)("TemplateLiteral")
			},
			["typeParameters"]: {
				validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
				optional: true
			}
		}
	});
	defineType$4("TemplateElement", {
		builder: ["value", "tail"],
		fields: {
			value: {
				validate: (0, _utils$6.chain)((0, _utils$6.assertShape)({
					raw: {
						validate: (0, _utils$6.assertValueType)("string")
					},
					cooked: {
						validate: (0, _utils$6.assertValueType)("string"),
						optional: true
					}
				}), function templateElementCookedValidator(node2) {
					const raw = node2.value.raw;
					let unterminatedCalled = false;
					const error = () => {
						throw new Error("Internal @babel/types error.");
					};
					const {
						str,
						firstInvalidLoc
					} = (0, _helperStringParser.readStringContents)("template", raw, 0, 0, 0, {
						unterminated() {
							unterminatedCalled = true;
						},
						strictNumericEscape: error,
						invalidEscapeSequence: error,
						numericSeparatorInEscapeSequence: error,
						unexpectedNumericSeparator: error,
						invalidDigit: error,
						invalidCodePoint: error
					});
					if (!unterminatedCalled)
						throw new Error("Invalid raw");
					node2.value.cooked = firstInvalidLoc ? null : str;
				})
			},
			tail: {
				default: false
			}
		}
	});
	defineType$4("TemplateLiteral", {
		visitor: ["quasis", "expressions"],
		aliases: ["Expression", "Literal"],
		fields: {
			quasis: (0, _utils$6.validateArrayOfType)("TemplateElement"),
			expressions: {
				validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Expression", "TSType")), function (node2, key, val) {
					if (node2.quasis.length !== val.length + 1) {
						throw new TypeError(`Number of ${node2.type} quasis should be exactly one more than the number of expressions.
Expected ${val.length + 1} quasis but got ${node2.quasis.length}`);
					}
				})
			}
		}
	});
	defineType$4("YieldExpression", {
		builder: ["argument", "delegate"],
		visitor: ["argument"],
		aliases: ["Expression", "Terminatorless"],
		fields: {
			delegate: {
				validate: {}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.chain)((0, _utils$6.assertValueType)("boolean"), Object.assign(function (node2, key, val) {
					if (val && !node2.argument) {
						throw new TypeError("Property delegate of YieldExpression cannot be true if there is no argument");
					}
				}, {
					type: "boolean"
				})) : (0, _utils$6.assertValueType)("boolean"),
				default: false
			},
			argument: {
				optional: true,
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		}
	});
	defineType$4("AwaitExpression", {
		builder: ["argument"],
		visitor: ["argument"],
		aliases: ["Expression", "Terminatorless"],
		fields: {
			argument: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			}
		}
	});
	defineType$4("Import", {
		aliases: ["Expression"]
	});
	defineType$4("BigIntLiteral", {
		builder: ["value"],
		fields: {
			value: {
				validate: (0, _utils$6.assertValueType)("string")
			}
		},
		aliases: ["Expression", "Pureish", "Literal", "Immutable"]
	});
	defineType$4("ExportNamespaceSpecifier", {
		visitor: ["exported"],
		aliases: ["ModuleSpecifier"],
		fields: {
			exported: {
				validate: (0, _utils$6.assertNodeType)("Identifier")
			}
		}
	});
	defineType$4("OptionalMemberExpression", {
		builder: ["object", "property", "computed", "optional"],
		visitor: ["object", "property"],
		aliases: ["Expression"],
		fields: {
			object: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			property: {
				validate: function () {
					const normal = (0, _utils$6.assertNodeType)("Identifier");
					const computed = (0, _utils$6.assertNodeType)("Expression");
					const validator = Object.assign(function (node2, key, val) {
						const validator2 = node2.computed ? computed : normal;
						validator2(node2, key, val);
					}, {
						oneOfNodeTypes: ["Expression", "Identifier"]
					});
					return validator;
				}()
			},
			computed: {
				default: false
			},
			optional: {
				validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertValueType)("boolean") : (0, _utils$6.chain)((0, _utils$6.assertValueType)("boolean"), (0, _utils$6.assertOptionalChainStart)())
			}
		}
	});
	defineType$4("OptionalCallExpression", {
		visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
		builder: ["callee", "arguments", "optional"],
		aliases: ["Expression"],
		fields: Object.assign({
			callee: {
				validate: (0, _utils$6.assertNodeType)("Expression")
			},
			arguments: (0, _utils$6.validateArrayOfType)("Expression", "SpreadElement", "ArgumentPlaceholder"),
			optional: {
				validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertValueType)("boolean") : (0, _utils$6.chain)((0, _utils$6.assertValueType)("boolean"), (0, _utils$6.assertOptionalChainStart)())
			},
			typeArguments: {
				validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation"),
				optional: true
			}
		}, {
			typeParameters: {
				validate: (0, _utils$6.assertNodeType)("TSTypeParameterInstantiation"),
				optional: true
			}
		})
	});
	defineType$4("ClassProperty", {
		visitor: ["decorators", "variance", "key", "typeAnnotation", "value"],
		builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
		aliases: ["Property"],
		fields: Object.assign({}, classMethodOrPropertyCommon(), {
			value: {
				validate: (0, _utils$6.assertNodeType)("Expression"),
				optional: true
			},
			definite: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			typeAnnotation: {
				validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
				optional: true
			},
			decorators: {
				validate: (0, _utils$6.arrayOfType)("Decorator"),
				optional: true
			},
			readonly: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			declare: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			variance: {
				validate: (0, _utils$6.assertNodeType)("Variance"),
				optional: true
			}
		})
	});
	defineType$4("ClassAccessorProperty", {
		visitor: ["decorators", "key", "typeAnnotation", "value"],
		builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
		aliases: ["Property", "Accessor"],
		fields: Object.assign({}, classMethodOrPropertyCommon(), {
			key: {
				validate: (0, _utils$6.chain)(function () {
					const normal = (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "PrivateName");
					const computed = (0, _utils$6.assertNodeType)("Expression");
					return function (node2, key, val) {
						const validator = node2.computed ? computed : normal;
						validator(node2, key, val);
					};
				}(), (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "BigIntLiteral", "Expression", "PrivateName"))
			},
			value: {
				validate: (0, _utils$6.assertNodeType)("Expression"),
				optional: true
			},
			definite: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			typeAnnotation: {
				validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
				optional: true
			},
			decorators: {
				validate: (0, _utils$6.arrayOfType)("Decorator"),
				optional: true
			},
			readonly: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			declare: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			variance: {
				validate: (0, _utils$6.assertNodeType)("Variance"),
				optional: true
			}
		})
	});
	defineType$4("ClassPrivateProperty", {
		visitor: ["decorators", "variance", "key", "typeAnnotation", "value"],
		builder: ["key", "value", "decorators", "static"],
		aliases: ["Property", "Private"],
		fields: {
			key: {
				validate: (0, _utils$6.assertNodeType)("PrivateName")
			},
			value: {
				validate: (0, _utils$6.assertNodeType)("Expression"),
				optional: true
			},
			typeAnnotation: {
				validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
				optional: true
			},
			decorators: {
				validate: (0, _utils$6.arrayOfType)("Decorator"),
				optional: true
			},
			static: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				default: false
			},
			readonly: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			optional: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			definite: {
				validate: (0, _utils$6.assertValueType)("boolean"),
				optional: true
			},
			variance: {
				validate: (0, _utils$6.assertNodeType)("Variance"),
				optional: true
			}
		}
	});
	defineType$4("ClassPrivateMethod", {
		builder: ["kind", "key", "params", "body", "static"],
		visitor: ["decorators", "key", "typeParameters", "params", "returnType", "body"],
		aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method", "Private"],
		fields: Object.assign({}, classMethodOrDeclareMethodCommon(), functionTypeAnnotationCommon(), {
			kind: {
				validate: (0, _utils$6.assertOneOf)("get", "set", "method"),
				default: "method"
			},
			key: {
				validate: (0, _utils$6.assertNodeType)("PrivateName")
			},
			body: {
				validate: (0, _utils$6.assertNodeType)("BlockStatement")
			}
		})
	});
	defineType$4("PrivateName", {
		visitor: ["id"],
		aliases: ["Private"],
		fields: {
			id: {
				validate: (0, _utils$6.assertNodeType)("Identifier")
			}
		}
	});
	defineType$4("StaticBlock", {
		visitor: ["body"],
		fields: {
			body: (0, _utils$6.validateArrayOfType)("Statement")
		},
		aliases: ["Scopable", "BlockParent", "FunctionParent"]
	});
	var _core$2 = core;
	var _utils$5 = utils$1;
	const defineType$3 = (0, _utils$5.defineAliasedType)("Flow");
	const defineInterfaceishType = (name) => {
		const isDeclareClass2 = name === "DeclareClass";
		defineType$3(name, {
			builder: ["id", "typeParameters", "extends", "body"],
			visitor: ["id", "typeParameters", "extends", ...isDeclareClass2 ? ["mixins", "implements"] : [], "body"],
			aliases: ["FlowDeclaration", "Statement", "Declaration"],
			fields: Object.assign({
				id: (0, _utils$5.validateType)("Identifier"),
				typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
				extends: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("InterfaceExtends"))
			}, isDeclareClass2 ? {
				mixins: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("InterfaceExtends")),
				implements: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("ClassImplements"))
			} : {}, {
				body: (0, _utils$5.validateType)("ObjectTypeAnnotation")
			})
		});
	};
	defineType$3("AnyTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("ArrayTypeAnnotation", {
		visitor: ["elementType"],
		aliases: ["FlowType"],
		fields: {
			elementType: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("BooleanTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("BooleanLiteralTypeAnnotation", {
		builder: ["value"],
		aliases: ["FlowType"],
		fields: {
			value: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("NullLiteralTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("ClassImplements", {
		visitor: ["id", "typeParameters"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterInstantiation")
		}
	});
	defineInterfaceishType("DeclareClass");
	defineType$3("DeclareFunction", {
		builder: ["id"],
		visitor: ["id", "predicate"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			predicate: (0, _utils$5.validateOptionalType)("DeclaredPredicate")
		}
	});
	defineInterfaceishType("DeclareInterface");
	defineType$3("DeclareModule", {
		builder: ["id", "body", "kind"],
		visitor: ["id", "body"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier", "StringLiteral"),
			body: (0, _utils$5.validateType)("BlockStatement"),
			kind: (0, _utils$5.validateOptional)((0, _utils$5.assertOneOf)("CommonJS", "ES"))
		}
	});
	defineType$3("DeclareModuleExports", {
		visitor: ["typeAnnotation"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			typeAnnotation: (0, _utils$5.validateType)("TypeAnnotation")
		}
	});
	defineType$3("DeclareTypeAlias", {
		visitor: ["id", "typeParameters", "right"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
			right: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("DeclareOpaqueType", {
		visitor: ["id", "typeParameters", "supertype"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
			supertype: (0, _utils$5.validateOptionalType)("FlowType"),
			impltype: (0, _utils$5.validateOptionalType)("FlowType")
		}
	});
	defineType$3("DeclareVariable", {
		visitor: ["id"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier")
		}
	});
	defineType$3("DeclareExportDeclaration", {
		visitor: ["declaration", "specifiers", "source", "attributes"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: Object.assign({
			declaration: (0, _utils$5.validateOptionalType)("Flow"),
			specifiers: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("ExportSpecifier", "ExportNamespaceSpecifier")),
			source: (0, _utils$5.validateOptionalType)("StringLiteral"),
			default: (0, _utils$5.validateOptional)((0, _utils$5.assertValueType)("boolean"))
		}, _core$2.importAttributes)
	});
	defineType$3("DeclareExportAllDeclaration", {
		visitor: ["source", "attributes"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: Object.assign({
			source: (0, _utils$5.validateType)("StringLiteral"),
			exportKind: (0, _utils$5.validateOptional)((0, _utils$5.assertOneOf)("type", "value"))
		}, _core$2.importAttributes)
	});
	defineType$3("DeclaredPredicate", {
		visitor: ["value"],
		aliases: ["FlowPredicate"],
		fields: {
			value: (0, _utils$5.validateType)("Flow")
		}
	});
	defineType$3("ExistsTypeAnnotation", {
		aliases: ["FlowType"]
	});
	defineType$3("FunctionTypeAnnotation", {
		builder: ["typeParameters", "params", "rest", "returnType"],
		visitor: ["typeParameters", "this", "params", "rest", "returnType"],
		aliases: ["FlowType"],
		fields: {
			typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
			params: (0, _utils$5.validateArrayOfType)("FunctionTypeParam"),
			rest: (0, _utils$5.validateOptionalType)("FunctionTypeParam"),
			this: (0, _utils$5.validateOptionalType)("FunctionTypeParam"),
			returnType: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("FunctionTypeParam", {
		visitor: ["name", "typeAnnotation"],
		fields: {
			name: (0, _utils$5.validateOptionalType)("Identifier"),
			typeAnnotation: (0, _utils$5.validateType)("FlowType"),
			optional: (0, _utils$5.validateOptional)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("GenericTypeAnnotation", {
		visitor: ["id", "typeParameters"],
		aliases: ["FlowType"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier", "QualifiedTypeIdentifier"),
			typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterInstantiation")
		}
	});
	defineType$3("InferredPredicate", {
		aliases: ["FlowPredicate"]
	});
	defineType$3("InterfaceExtends", {
		visitor: ["id", "typeParameters"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier", "QualifiedTypeIdentifier"),
			typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterInstantiation")
		}
	});
	defineInterfaceishType("InterfaceDeclaration");
	defineType$3("InterfaceTypeAnnotation", {
		visitor: ["extends", "body"],
		aliases: ["FlowType"],
		fields: {
			extends: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("InterfaceExtends")),
			body: (0, _utils$5.validateType)("ObjectTypeAnnotation")
		}
	});
	defineType$3("IntersectionTypeAnnotation", {
		visitor: ["types"],
		aliases: ["FlowType"],
		fields: {
			types: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("FlowType"))
		}
	});
	defineType$3("MixedTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("EmptyTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("NullableTypeAnnotation", {
		visitor: ["typeAnnotation"],
		aliases: ["FlowType"],
		fields: {
			typeAnnotation: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("NumberLiteralTypeAnnotation", {
		builder: ["value"],
		aliases: ["FlowType"],
		fields: {
			value: (0, _utils$5.validate)((0, _utils$5.assertValueType)("number"))
		}
	});
	defineType$3("NumberTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("ObjectTypeAnnotation", {
		visitor: ["properties", "indexers", "callProperties", "internalSlots"],
		aliases: ["FlowType"],
		builder: ["properties", "indexers", "callProperties", "internalSlots", "exact"],
		fields: {
			properties: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("ObjectTypeProperty", "ObjectTypeSpreadProperty")),
			indexers: {
				validate: (0, _utils$5.arrayOfType)("ObjectTypeIndexer"),
				optional: true,
				default: []
			},
			callProperties: {
				validate: (0, _utils$5.arrayOfType)("ObjectTypeCallProperty"),
				optional: true,
				default: []
			},
			internalSlots: {
				validate: (0, _utils$5.arrayOfType)("ObjectTypeInternalSlot"),
				optional: true,
				default: []
			},
			exact: {
				validate: (0, _utils$5.assertValueType)("boolean"),
				default: false
			},
			inexact: (0, _utils$5.validateOptional)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("ObjectTypeInternalSlot", {
		visitor: ["id", "value"],
		builder: ["id", "value", "optional", "static", "method"],
		aliases: ["UserWhitespacable"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			value: (0, _utils$5.validateType)("FlowType"),
			optional: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
			static: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
			method: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("ObjectTypeCallProperty", {
		visitor: ["value"],
		aliases: ["UserWhitespacable"],
		fields: {
			value: (0, _utils$5.validateType)("FlowType"),
			static: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("ObjectTypeIndexer", {
		visitor: ["variance", "id", "key", "value"],
		builder: ["id", "key", "value", "variance"],
		aliases: ["UserWhitespacable"],
		fields: {
			id: (0, _utils$5.validateOptionalType)("Identifier"),
			key: (0, _utils$5.validateType)("FlowType"),
			value: (0, _utils$5.validateType)("FlowType"),
			static: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
			variance: (0, _utils$5.validateOptionalType)("Variance")
		}
	});
	defineType$3("ObjectTypeProperty", {
		visitor: ["key", "value", "variance"],
		aliases: ["UserWhitespacable"],
		fields: {
			key: (0, _utils$5.validateType)("Identifier", "StringLiteral"),
			value: (0, _utils$5.validateType)("FlowType"),
			kind: (0, _utils$5.validate)((0, _utils$5.assertOneOf)("init", "get", "set")),
			static: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
			proto: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
			optional: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
			variance: (0, _utils$5.validateOptionalType)("Variance"),
			method: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("ObjectTypeSpreadProperty", {
		visitor: ["argument"],
		aliases: ["UserWhitespacable"],
		fields: {
			argument: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("OpaqueType", {
		visitor: ["id", "typeParameters", "supertype", "impltype"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
			supertype: (0, _utils$5.validateOptionalType)("FlowType"),
			impltype: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("QualifiedTypeIdentifier", {
		visitor: ["qualification", "id"],
		builder: ["id", "qualification"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			qualification: (0, _utils$5.validateType)("Identifier", "QualifiedTypeIdentifier")
		}
	});
	defineType$3("StringLiteralTypeAnnotation", {
		builder: ["value"],
		aliases: ["FlowType"],
		fields: {
			value: (0, _utils$5.validate)((0, _utils$5.assertValueType)("string"))
		}
	});
	defineType$3("StringTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("SymbolTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("ThisTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("TupleTypeAnnotation", {
		visitor: ["types"],
		aliases: ["FlowType"],
		fields: {
			types: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("FlowType"))
		}
	});
	defineType$3("TypeofTypeAnnotation", {
		visitor: ["argument"],
		aliases: ["FlowType"],
		fields: {
			argument: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("TypeAlias", {
		visitor: ["id", "typeParameters", "right"],
		aliases: ["FlowDeclaration", "Statement", "Declaration"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
			right: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("TypeAnnotation", {
		visitor: ["typeAnnotation"],
		fields: {
			typeAnnotation: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("TypeCastExpression", {
		visitor: ["expression", "typeAnnotation"],
		aliases: ["ExpressionWrapper", "Expression"],
		fields: {
			expression: (0, _utils$5.validateType)("Expression"),
			typeAnnotation: (0, _utils$5.validateType)("TypeAnnotation")
		}
	});
	defineType$3("TypeParameter", {
		visitor: ["bound", "default", "variance"],
		fields: {
			name: (0, _utils$5.validate)((0, _utils$5.assertValueType)("string")),
			bound: (0, _utils$5.validateOptionalType)("TypeAnnotation"),
			default: (0, _utils$5.validateOptionalType)("FlowType"),
			variance: (0, _utils$5.validateOptionalType)("Variance")
		}
	});
	defineType$3("TypeParameterDeclaration", {
		visitor: ["params"],
		fields: {
			params: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("TypeParameter"))
		}
	});
	defineType$3("TypeParameterInstantiation", {
		visitor: ["params"],
		fields: {
			params: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("FlowType"))
		}
	});
	defineType$3("UnionTypeAnnotation", {
		visitor: ["types"],
		aliases: ["FlowType"],
		fields: {
			types: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("FlowType"))
		}
	});
	defineType$3("Variance", {
		builder: ["kind"],
		fields: {
			kind: (0, _utils$5.validate)((0, _utils$5.assertOneOf)("minus", "plus"))
		}
	});
	defineType$3("VoidTypeAnnotation", {
		aliases: ["FlowType", "FlowBaseAnnotation"]
	});
	defineType$3("EnumDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "body"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			body: (0, _utils$5.validateType)("EnumBooleanBody", "EnumNumberBody", "EnumStringBody", "EnumSymbolBody")
		}
	});
	defineType$3("EnumBooleanBody", {
		aliases: ["EnumBody"],
		visitor: ["members"],
		fields: {
			explicitType: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
			members: (0, _utils$5.validateArrayOfType)("EnumBooleanMember"),
			hasUnknownMembers: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("EnumNumberBody", {
		aliases: ["EnumBody"],
		visitor: ["members"],
		fields: {
			explicitType: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
			members: (0, _utils$5.validateArrayOfType)("EnumNumberMember"),
			hasUnknownMembers: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("EnumStringBody", {
		aliases: ["EnumBody"],
		visitor: ["members"],
		fields: {
			explicitType: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
			members: (0, _utils$5.validateArrayOfType)("EnumStringMember", "EnumDefaultedMember"),
			hasUnknownMembers: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("EnumSymbolBody", {
		aliases: ["EnumBody"],
		visitor: ["members"],
		fields: {
			members: (0, _utils$5.validateArrayOfType)("EnumDefaultedMember"),
			hasUnknownMembers: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	defineType$3("EnumBooleanMember", {
		aliases: ["EnumMember"],
		builder: ["id"],
		visitor: ["id", "init"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			init: (0, _utils$5.validateType)("BooleanLiteral")
		}
	});
	defineType$3("EnumNumberMember", {
		aliases: ["EnumMember"],
		visitor: ["id", "init"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			init: (0, _utils$5.validateType)("NumericLiteral")
		}
	});
	defineType$3("EnumStringMember", {
		aliases: ["EnumMember"],
		visitor: ["id", "init"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier"),
			init: (0, _utils$5.validateType)("StringLiteral")
		}
	});
	defineType$3("EnumDefaultedMember", {
		aliases: ["EnumMember"],
		visitor: ["id"],
		fields: {
			id: (0, _utils$5.validateType)("Identifier")
		}
	});
	defineType$3("IndexedAccessType", {
		visitor: ["objectType", "indexType"],
		aliases: ["FlowType"],
		fields: {
			objectType: (0, _utils$5.validateType)("FlowType"),
			indexType: (0, _utils$5.validateType)("FlowType")
		}
	});
	defineType$3("OptionalIndexedAccessType", {
		visitor: ["objectType", "indexType"],
		aliases: ["FlowType"],
		fields: {
			objectType: (0, _utils$5.validateType)("FlowType"),
			indexType: (0, _utils$5.validateType)("FlowType"),
			optional: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
		}
	});
	var _utils$4 = utils$1;
	const defineType$2 = (0, _utils$4.defineAliasedType)("JSX");
	defineType$2("JSXAttribute", {
		visitor: ["name", "value"],
		aliases: ["Immutable"],
		fields: {
			name: {
				validate: (0, _utils$4.assertNodeType)("JSXIdentifier", "JSXNamespacedName")
			},
			value: {
				optional: true,
				validate: (0, _utils$4.assertNodeType)("JSXElement", "JSXFragment", "StringLiteral", "JSXExpressionContainer")
			}
		}
	});
	defineType$2("JSXClosingElement", {
		visitor: ["name"],
		aliases: ["Immutable"],
		fields: {
			name: {
				validate: (0, _utils$4.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
			}
		}
	});
	defineType$2("JSXElement", {
		builder: ["openingElement", "closingElement", "children", "selfClosing"],
		visitor: ["openingElement", "children", "closingElement"],
		aliases: ["Immutable", "Expression"],
		fields: Object.assign({
			openingElement: {
				validate: (0, _utils$4.assertNodeType)("JSXOpeningElement")
			},
			closingElement: {
				optional: true,
				validate: (0, _utils$4.assertNodeType)("JSXClosingElement")
			},
			children: (0, _utils$4.validateArrayOfType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")
		}, {
			selfClosing: {
				validate: (0, _utils$4.assertValueType)("boolean"),
				optional: true
			}
		})
	});
	defineType$2("JSXEmptyExpression", {});
	defineType$2("JSXExpressionContainer", {
		visitor: ["expression"],
		aliases: ["Immutable"],
		fields: {
			expression: {
				validate: (0, _utils$4.assertNodeType)("Expression", "JSXEmptyExpression")
			}
		}
	});
	defineType$2("JSXSpreadChild", {
		visitor: ["expression"],
		aliases: ["Immutable"],
		fields: {
			expression: {
				validate: (0, _utils$4.assertNodeType)("Expression")
			}
		}
	});
	defineType$2("JSXIdentifier", {
		builder: ["name"],
		fields: {
			name: {
				validate: (0, _utils$4.assertValueType)("string")
			}
		}
	});
	defineType$2("JSXMemberExpression", {
		visitor: ["object", "property"],
		fields: {
			object: {
				validate: (0, _utils$4.assertNodeType)("JSXMemberExpression", "JSXIdentifier")
			},
			property: {
				validate: (0, _utils$4.assertNodeType)("JSXIdentifier")
			}
		}
	});
	defineType$2("JSXNamespacedName", {
		visitor: ["namespace", "name"],
		fields: {
			namespace: {
				validate: (0, _utils$4.assertNodeType)("JSXIdentifier")
			},
			name: {
				validate: (0, _utils$4.assertNodeType)("JSXIdentifier")
			}
		}
	});
	defineType$2("JSXOpeningElement", {
		builder: ["name", "attributes", "selfClosing"],
		visitor: ["name", "typeParameters", "typeArguments", "attributes"],
		aliases: ["Immutable"],
		fields: Object.assign({
			name: {
				validate: (0, _utils$4.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
			},
			selfClosing: {
				default: false
			},
			attributes: (0, _utils$4.validateArrayOfType)("JSXAttribute", "JSXSpreadAttribute"),
			typeArguments: {
				validate: (0, _utils$4.assertNodeType)("TypeParameterInstantiation"),
				optional: true
			}
		}, {
			typeParameters: {
				validate: (0, _utils$4.assertNodeType)("TSTypeParameterInstantiation"),
				optional: true
			}
		})
	});
	defineType$2("JSXSpreadAttribute", {
		visitor: ["argument"],
		fields: {
			argument: {
				validate: (0, _utils$4.assertNodeType)("Expression")
			}
		}
	});
	defineType$2("JSXText", {
		aliases: ["Immutable"],
		builder: ["value"],
		fields: {
			value: {
				validate: (0, _utils$4.assertValueType)("string")
			}
		}
	});
	defineType$2("JSXFragment", {
		builder: ["openingFragment", "closingFragment", "children"],
		visitor: ["openingFragment", "children", "closingFragment"],
		aliases: ["Immutable", "Expression"],
		fields: {
			openingFragment: {
				validate: (0, _utils$4.assertNodeType)("JSXOpeningFragment")
			},
			closingFragment: {
				validate: (0, _utils$4.assertNodeType)("JSXClosingFragment")
			},
			children: (0, _utils$4.validateArrayOfType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")
		}
	});
	defineType$2("JSXOpeningFragment", {
		aliases: ["Immutable"]
	});
	defineType$2("JSXClosingFragment", {
		aliases: ["Immutable"]
	});
	var placeholders = {};
	Object.defineProperty(placeholders, "__esModule", {
		value: true
	});
	placeholders.PLACEHOLDERS_FLIPPED_ALIAS = placeholders.PLACEHOLDERS_ALIAS = placeholders.PLACEHOLDERS = void 0;
	var _utils$3 = utils$1;
	const PLACEHOLDERS = placeholders.PLACEHOLDERS = ["Identifier", "StringLiteral", "Expression", "Statement", "Declaration", "BlockStatement", "ClassBody", "Pattern"];
	const PLACEHOLDERS_ALIAS = placeholders.PLACEHOLDERS_ALIAS = {
		Declaration: ["Statement"],
		Pattern: ["PatternLike", "LVal"]
	};
	for (const type of PLACEHOLDERS) {
		const alias = _utils$3.ALIAS_KEYS[type];
		if (alias != null && alias.length)
			PLACEHOLDERS_ALIAS[type] = alias;
	}
	const PLACEHOLDERS_FLIPPED_ALIAS = placeholders.PLACEHOLDERS_FLIPPED_ALIAS = {};
	Object.keys(PLACEHOLDERS_ALIAS).forEach((type) => {
		PLACEHOLDERS_ALIAS[type].forEach((alias) => {
			if (!hasOwnProperty.call(PLACEHOLDERS_FLIPPED_ALIAS, alias)) {
				PLACEHOLDERS_FLIPPED_ALIAS[alias] = [];
			}
			PLACEHOLDERS_FLIPPED_ALIAS[alias].push(type);
		});
	});
	var _utils$2 = utils$1;
	var _placeholders = placeholders;
	var _core$1 = core;
	const defineType$1 = (0, _utils$2.defineAliasedType)("Miscellaneous");
	{
		defineType$1("Noop", {
			visitor: []
		});
	}
	defineType$1("Placeholder", {
		visitor: [],
		builder: ["expectedNode", "name"],
		fields: Object.assign({
			name: {
				validate: (0, _utils$2.assertNodeType)("Identifier")
			},
			expectedNode: {
				validate: (0, _utils$2.assertOneOf)(..._placeholders.PLACEHOLDERS)
			}
		}, (0, _core$1.patternLikeCommon)())
	});
	defineType$1("V8IntrinsicIdentifier", {
		builder: ["name"],
		fields: {
			name: {
				validate: (0, _utils$2.assertValueType)("string")
			}
		}
	});
	var _utils$1 = utils$1;
	(0, _utils$1.default)("ArgumentPlaceholder", {});
	(0, _utils$1.default)("BindExpression", {
		visitor: ["object", "callee"],
		aliases: ["Expression"],
		fields: !{}.BABEL_TYPES_8_BREAKING ? {
			object: {
				validate: Object.assign(() => {
				}, {
					oneOfNodeTypes: ["Expression"]
				})
			},
			callee: {
				validate: Object.assign(() => {
				}, {
					oneOfNodeTypes: ["Expression"]
				})
			}
		} : {
			object: {
				validate: (0, _utils$1.assertNodeType)("Expression")
			},
			callee: {
				validate: (0, _utils$1.assertNodeType)("Expression")
			}
		}
	});
	(0, _utils$1.default)("ImportAttribute", {
		visitor: ["key", "value"],
		fields: {
			key: {
				validate: (0, _utils$1.assertNodeType)("Identifier", "StringLiteral")
			},
			value: {
				validate: (0, _utils$1.assertNodeType)("StringLiteral")
			}
		}
	});
	(0, _utils$1.default)("Decorator", {
		visitor: ["expression"],
		fields: {
			expression: {
				validate: (0, _utils$1.assertNodeType)("Expression")
			}
		}
	});
	(0, _utils$1.default)("DoExpression", {
		visitor: ["body"],
		builder: ["body", "async"],
		aliases: ["Expression"],
		fields: {
			body: {
				validate: (0, _utils$1.assertNodeType)("BlockStatement")
			},
			async: {
				validate: (0, _utils$1.assertValueType)("boolean"),
				default: false
			}
		}
	});
	(0, _utils$1.default)("ExportDefaultSpecifier", {
		visitor: ["exported"],
		aliases: ["ModuleSpecifier"],
		fields: {
			exported: {
				validate: (0, _utils$1.assertNodeType)("Identifier")
			}
		}
	});
	(0, _utils$1.default)("RecordExpression", {
		visitor: ["properties"],
		aliases: ["Expression"],
		fields: {
			properties: (0, _utils$1.validateArrayOfType)("ObjectProperty", "SpreadElement")
		}
	});
	(0, _utils$1.default)("TupleExpression", {
		fields: {
			elements: {
				validate: (0, _utils$1.arrayOfType)("Expression", "SpreadElement"),
				default: []
			}
		},
		visitor: ["elements"],
		aliases: ["Expression"]
	});
	{
		(0, _utils$1.default)("DecimalLiteral", {
			builder: ["value"],
			fields: {
				value: {
					validate: (0, _utils$1.assertValueType)("string")
				}
			},
			aliases: ["Expression", "Pureish", "Literal", "Immutable"]
		});
	}
	(0, _utils$1.default)("ModuleExpression", {
		visitor: ["body"],
		fields: {
			body: {
				validate: (0, _utils$1.assertNodeType)("Program")
			}
		},
		aliases: ["Expression"]
	});
	(0, _utils$1.default)("TopicReference", {
		aliases: ["Expression"]
	});
	(0, _utils$1.default)("PipelineTopicExpression", {
		builder: ["expression"],
		visitor: ["expression"],
		fields: {
			expression: {
				validate: (0, _utils$1.assertNodeType)("Expression")
			}
		},
		aliases: ["Expression"]
	});
	(0, _utils$1.default)("PipelineBareFunction", {
		builder: ["callee"],
		visitor: ["callee"],
		fields: {
			callee: {
				validate: (0, _utils$1.assertNodeType)("Expression")
			}
		},
		aliases: ["Expression"]
	});
	(0, _utils$1.default)("PipelinePrimaryTopicReference", {
		aliases: ["Expression"]
	});
	var _utils = utils$1;
	var _core = core;
	var _is$1 = is$1;
	const defineType = (0, _utils.defineAliasedType)("TypeScript");
	const bool = (0, _utils.assertValueType)("boolean");
	const tSFunctionTypeAnnotationCommon = () => ({
		returnType: {
			validate: (0, _utils.assertNodeType)("TSTypeAnnotation", "Noop"),
			optional: true
		},
		typeParameters: {
			validate: (0, _utils.assertNodeType)("TSTypeParameterDeclaration", "Noop"),
			optional: true
		}
	});
	defineType("TSParameterProperty", {
		aliases: ["LVal"],
		visitor: ["parameter"],
		fields: {
			accessibility: {
				validate: (0, _utils.assertOneOf)("public", "private", "protected"),
				optional: true
			},
			readonly: {
				validate: (0, _utils.assertValueType)("boolean"),
				optional: true
			},
			parameter: {
				validate: (0, _utils.assertNodeType)("Identifier", "AssignmentPattern")
			},
			override: {
				validate: (0, _utils.assertValueType)("boolean"),
				optional: true
			},
			decorators: {
				validate: (0, _utils.arrayOfType)("Decorator"),
				optional: true
			}
		}
	});
	defineType("TSDeclareFunction", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "typeParameters", "params", "returnType"],
		fields: Object.assign({}, (0, _core.functionDeclarationCommon)(), tSFunctionTypeAnnotationCommon())
	});
	defineType("TSDeclareMethod", {
		visitor: ["decorators", "key", "typeParameters", "params", "returnType"],
		fields: Object.assign({}, (0, _core.classMethodOrDeclareMethodCommon)(), tSFunctionTypeAnnotationCommon())
	});
	defineType("TSQualifiedName", {
		aliases: ["TSEntityName"],
		visitor: ["left", "right"],
		fields: {
			left: (0, _utils.validateType)("TSEntityName"),
			right: (0, _utils.validateType)("Identifier")
		}
	});
	const signatureDeclarationCommon = () => ({
		typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
		["parameters"]: (0, _utils.validateArrayOfType)("ArrayPattern", "Identifier", "ObjectPattern", "RestElement"),
		["typeAnnotation"]: (0, _utils.validateOptionalType)("TSTypeAnnotation")
	});
	const callConstructSignatureDeclaration = {
		aliases: ["TSTypeElement"],
		visitor: ["typeParameters", "parameters", "typeAnnotation"],
		fields: signatureDeclarationCommon()
	};
	defineType("TSCallSignatureDeclaration", callConstructSignatureDeclaration);
	defineType("TSConstructSignatureDeclaration", callConstructSignatureDeclaration);
	const namedTypeElementCommon = () => ({
		key: (0, _utils.validateType)("Expression"),
		computed: {
			default: false
		},
		optional: (0, _utils.validateOptional)(bool)
	});
	defineType("TSPropertySignature", {
		aliases: ["TSTypeElement"],
		visitor: ["key", "typeAnnotation"],
		fields: Object.assign({}, namedTypeElementCommon(), {
			readonly: (0, _utils.validateOptional)(bool),
			typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
			kind: {
				optional: true,
				validate: (0, _utils.assertOneOf)("get", "set")
			}
		})
	});
	defineType("TSMethodSignature", {
		aliases: ["TSTypeElement"],
		visitor: ["key", "typeParameters", "parameters", "typeAnnotation"],
		fields: Object.assign({}, signatureDeclarationCommon(), namedTypeElementCommon(), {
			kind: {
				validate: (0, _utils.assertOneOf)("method", "get", "set")
			}
		})
	});
	defineType("TSIndexSignature", {
		aliases: ["TSTypeElement"],
		visitor: ["parameters", "typeAnnotation"],
		fields: {
			readonly: (0, _utils.validateOptional)(bool),
			static: (0, _utils.validateOptional)(bool),
			parameters: (0, _utils.validateArrayOfType)("Identifier"),
			typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation")
		}
	});
	const tsKeywordTypes = ["TSAnyKeyword", "TSBooleanKeyword", "TSBigIntKeyword", "TSIntrinsicKeyword", "TSNeverKeyword", "TSNullKeyword", "TSNumberKeyword", "TSObjectKeyword", "TSStringKeyword", "TSSymbolKeyword", "TSUndefinedKeyword", "TSUnknownKeyword", "TSVoidKeyword"];
	for (const type of tsKeywordTypes) {
		defineType(type, {
			aliases: ["TSType", "TSBaseType"],
			visitor: [],
			fields: {}
		});
	}
	defineType("TSThisType", {
		aliases: ["TSType", "TSBaseType"],
		visitor: [],
		fields: {}
	});
	const fnOrCtrBase = {
		aliases: ["TSType"],
		visitor: ["typeParameters", "parameters", "typeAnnotation"]
	};
	defineType("TSFunctionType", Object.assign({}, fnOrCtrBase, {
		fields: signatureDeclarationCommon()
	}));
	defineType("TSConstructorType", Object.assign({}, fnOrCtrBase, {
		fields: Object.assign({}, signatureDeclarationCommon(), {
			abstract: (0, _utils.validateOptional)(bool)
		})
	}));
	defineType("TSTypeReference", {
		aliases: ["TSType"],
		visitor: ["typeName", "typeParameters"],
		fields: {
			typeName: (0, _utils.validateType)("TSEntityName"),
			["typeParameters"]: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
		}
	});
	defineType("TSTypePredicate", {
		aliases: ["TSType"],
		visitor: ["parameterName", "typeAnnotation"],
		builder: ["parameterName", "typeAnnotation", "asserts"],
		fields: {
			parameterName: (0, _utils.validateType)("Identifier", "TSThisType"),
			typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
			asserts: (0, _utils.validateOptional)(bool)
		}
	});
	defineType("TSTypeQuery", {
		aliases: ["TSType"],
		visitor: ["exprName", "typeParameters"],
		fields: {
			exprName: (0, _utils.validateType)("TSEntityName", "TSImportType"),
			["typeParameters"]: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
		}
	});
	defineType("TSTypeLiteral", {
		aliases: ["TSType"],
		visitor: ["members"],
		fields: {
			members: (0, _utils.validateArrayOfType)("TSTypeElement")
		}
	});
	defineType("TSArrayType", {
		aliases: ["TSType"],
		visitor: ["elementType"],
		fields: {
			elementType: (0, _utils.validateType)("TSType")
		}
	});
	defineType("TSTupleType", {
		aliases: ["TSType"],
		visitor: ["elementTypes"],
		fields: {
			elementTypes: (0, _utils.validateArrayOfType)("TSType", "TSNamedTupleMember")
		}
	});
	defineType("TSOptionalType", {
		aliases: ["TSType"],
		visitor: ["typeAnnotation"],
		fields: {
			typeAnnotation: (0, _utils.validateType)("TSType")
		}
	});
	defineType("TSRestType", {
		aliases: ["TSType"],
		visitor: ["typeAnnotation"],
		fields: {
			typeAnnotation: (0, _utils.validateType)("TSType")
		}
	});
	defineType("TSNamedTupleMember", {
		visitor: ["label", "elementType"],
		builder: ["label", "elementType", "optional"],
		fields: {
			label: (0, _utils.validateType)("Identifier"),
			optional: {
				validate: bool,
				default: false
			},
			elementType: (0, _utils.validateType)("TSType")
		}
	});
	const unionOrIntersection = {
		aliases: ["TSType"],
		visitor: ["types"],
		fields: {
			types: (0, _utils.validateArrayOfType)("TSType")
		}
	};
	defineType("TSUnionType", unionOrIntersection);
	defineType("TSIntersectionType", unionOrIntersection);
	defineType("TSConditionalType", {
		aliases: ["TSType"],
		visitor: ["checkType", "extendsType", "trueType", "falseType"],
		fields: {
			checkType: (0, _utils.validateType)("TSType"),
			extendsType: (0, _utils.validateType)("TSType"),
			trueType: (0, _utils.validateType)("TSType"),
			falseType: (0, _utils.validateType)("TSType")
		}
	});
	defineType("TSInferType", {
		aliases: ["TSType"],
		visitor: ["typeParameter"],
		fields: {
			typeParameter: (0, _utils.validateType)("TSTypeParameter")
		}
	});
	defineType("TSParenthesizedType", {
		aliases: ["TSType"],
		visitor: ["typeAnnotation"],
		fields: {
			typeAnnotation: (0, _utils.validateType)("TSType")
		}
	});
	defineType("TSTypeOperator", {
		aliases: ["TSType"],
		visitor: ["typeAnnotation"],
		fields: {
			operator: (0, _utils.validate)((0, _utils.assertValueType)("string")),
			typeAnnotation: (0, _utils.validateType)("TSType")
		}
	});
	defineType("TSIndexedAccessType", {
		aliases: ["TSType"],
		visitor: ["objectType", "indexType"],
		fields: {
			objectType: (0, _utils.validateType)("TSType"),
			indexType: (0, _utils.validateType)("TSType")
		}
	});
	defineType("TSMappedType", {
		aliases: ["TSType"],
		visitor: ["typeParameter", "nameType", "typeAnnotation"],
		builder: ["typeParameter", "typeAnnotation", "nameType"],
		fields: Object.assign({}, {
			typeParameter: (0, _utils.validateType)("TSTypeParameter")
		}, {
			readonly: (0, _utils.validateOptional)((0, _utils.assertOneOf)(true, false, "+", "-")),
			optional: (0, _utils.validateOptional)((0, _utils.assertOneOf)(true, false, "+", "-")),
			typeAnnotation: (0, _utils.validateOptionalType)("TSType"),
			nameType: (0, _utils.validateOptionalType)("TSType")
		})
	});
	defineType("TSTemplateLiteralType", {
		aliases: ["TSType", "TSBaseType"],
		visitor: ["quasis", "types"],
		fields: {
			quasis: (0, _utils.validateArrayOfType)("TemplateElement"),
			types: {
				validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSType")), function (node2, key, val) {
					if (node2.quasis.length !== val.length + 1) {
						throw new TypeError(`Number of ${node2.type} quasis should be exactly one more than the number of types.
Expected ${val.length + 1} quasis but got ${node2.quasis.length}`);
					}
				})
			}
		}
	});
	defineType("TSLiteralType", {
		aliases: ["TSType", "TSBaseType"],
		visitor: ["literal"],
		fields: {
			literal: {
				validate: function () {
					const unaryExpression2 = (0, _utils.assertNodeType)("NumericLiteral", "BigIntLiteral");
					const unaryOperator = (0, _utils.assertOneOf)("-");
					const literal = (0, _utils.assertNodeType)("NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "TemplateLiteral");

					function validator(parent, key, node2) {
						if ((0, _is$1.default)("UnaryExpression", node2)) {
							unaryOperator(node2, "operator", node2.operator);
							unaryExpression2(node2, "argument", node2.argument);
						} else {
							literal(parent, key, node2);
						}
					}

					validator.oneOfNodeTypes = ["NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "TemplateLiteral", "UnaryExpression"];
					return validator;
				}()
			}
		}
	});
	{
		defineType("TSExpressionWithTypeArguments", {
			aliases: ["TSType"],
			visitor: ["expression", "typeParameters"],
			fields: {
				expression: (0, _utils.validateType)("TSEntityName"),
				typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
			}
		});
	}
	defineType("TSInterfaceDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "typeParameters", "extends", "body"],
		fields: {
			declare: (0, _utils.validateOptional)(bool),
			id: (0, _utils.validateType)("Identifier"),
			typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
			extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("TSExpressionWithTypeArguments")),
			body: (0, _utils.validateType)("TSInterfaceBody")
		}
	});
	defineType("TSInterfaceBody", {
		visitor: ["body"],
		fields: {
			body: (0, _utils.validateArrayOfType)("TSTypeElement")
		}
	});
	defineType("TSTypeAliasDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "typeParameters", "typeAnnotation"],
		fields: {
			declare: (0, _utils.validateOptional)(bool),
			id: (0, _utils.validateType)("Identifier"),
			typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
			typeAnnotation: (0, _utils.validateType)("TSType")
		}
	});
	defineType("TSInstantiationExpression", {
		aliases: ["Expression"],
		visitor: ["expression", "typeParameters"],
		fields: {
			expression: (0, _utils.validateType)("Expression"),
			["typeParameters"]: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
		}
	});
	const TSTypeExpression$1 = {
		aliases: ["Expression", "LVal", "PatternLike"],
		visitor: ["expression", "typeAnnotation"],
		fields: {
			expression: (0, _utils.validateType)("Expression"),
			typeAnnotation: (0, _utils.validateType)("TSType")
		}
	};
	defineType("TSAsExpression", TSTypeExpression$1);
	defineType("TSSatisfiesExpression", TSTypeExpression$1);
	defineType("TSTypeAssertion", {
		aliases: ["Expression", "LVal", "PatternLike"],
		visitor: ["typeAnnotation", "expression"],
		fields: {
			typeAnnotation: (0, _utils.validateType)("TSType"),
			expression: (0, _utils.validateType)("Expression")
		}
	});
	defineType("TSEnumBody", {
		visitor: ["members"],
		fields: {
			members: (0, _utils.validateArrayOfType)("TSEnumMember")
		}
	});
	{
		defineType("TSEnumDeclaration", {
			aliases: ["Statement", "Declaration"],
			visitor: ["id", "members"],
			fields: {
				declare: (0, _utils.validateOptional)(bool),
				const: (0, _utils.validateOptional)(bool),
				id: (0, _utils.validateType)("Identifier"),
				members: (0, _utils.validateArrayOfType)("TSEnumMember"),
				initializer: (0, _utils.validateOptionalType)("Expression"),
				body: (0, _utils.validateOptionalType)("TSEnumBody")
			}
		});
	}
	defineType("TSEnumMember", {
		visitor: ["id", "initializer"],
		fields: {
			id: (0, _utils.validateType)("Identifier", "StringLiteral"),
			initializer: (0, _utils.validateOptionalType)("Expression")
		}
	});
	defineType("TSModuleDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "body"],
		fields: Object.assign({
			kind: {
				validate: (0, _utils.assertOneOf)("global", "module", "namespace")
			},
			declare: (0, _utils.validateOptional)(bool)
		}, {
			global: (0, _utils.validateOptional)(bool)
		}, {
			id: (0, _utils.validateType)("Identifier", "StringLiteral"),
			body: (0, _utils.validateType)("TSModuleBlock", "TSModuleDeclaration")
		})
	});
	defineType("TSModuleBlock", {
		aliases: ["Scopable", "Block", "BlockParent", "FunctionParent"],
		visitor: ["body"],
		fields: {
			body: (0, _utils.validateArrayOfType)("Statement")
		}
	});
	defineType("TSImportType", {
		aliases: ["TSType"],
		builder: ["argument", "qualifier", "typeParameters"],
		visitor: ["argument", "options", "qualifier", "typeParameters"],
		fields: {
			argument: (0, _utils.validateType)("StringLiteral"),
			qualifier: (0, _utils.validateOptionalType)("TSEntityName"),
			["typeParameters"]: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation"),
			options: {
				validate: (0, _utils.assertNodeType)("Expression"),
				optional: true
			}
		}
	});
	defineType("TSImportEqualsDeclaration", {
		aliases: ["Statement", "Declaration"],
		visitor: ["id", "moduleReference"],
		fields: Object.assign({}, {
			isExport: (0, _utils.validate)(bool)
		}, {
			id: (0, _utils.validateType)("Identifier"),
			moduleReference: (0, _utils.validateType)("TSEntityName", "TSExternalModuleReference"),
			importKind: {
				validate: (0, _utils.assertOneOf)("type", "value"),
				optional: true
			}
		})
	});
	defineType("TSExternalModuleReference", {
		visitor: ["expression"],
		fields: {
			expression: (0, _utils.validateType)("StringLiteral")
		}
	});
	defineType("TSNonNullExpression", {
		aliases: ["Expression", "LVal", "PatternLike"],
		visitor: ["expression"],
		fields: {
			expression: (0, _utils.validateType)("Expression")
		}
	});
	defineType("TSExportAssignment", {
		aliases: ["Statement"],
		visitor: ["expression"],
		fields: {
			expression: (0, _utils.validateType)("Expression")
		}
	});
	defineType("TSNamespaceExportDeclaration", {
		aliases: ["Statement"],
		visitor: ["id"],
		fields: {
			id: (0, _utils.validateType)("Identifier")
		}
	});
	defineType("TSTypeAnnotation", {
		visitor: ["typeAnnotation"],
		fields: {
			typeAnnotation: {
				validate: (0, _utils.assertNodeType)("TSType")
			}
		}
	});
	defineType("TSTypeParameterInstantiation", {
		visitor: ["params"],
		fields: {
			params: (0, _utils.validateArrayOfType)("TSType")
		}
	});
	defineType("TSTypeParameterDeclaration", {
		visitor: ["params"],
		fields: {
			params: (0, _utils.validateArrayOfType)("TSTypeParameter")
		}
	});
	defineType("TSTypeParameter", {
		builder: ["constraint", "default", "name"],
		visitor: ["constraint", "default"],
		fields: {
			name: {
				validate: (0, _utils.assertValueType)("string")
			},
			in: {
				validate: (0, _utils.assertValueType)("boolean"),
				optional: true
			},
			out: {
				validate: (0, _utils.assertValueType)("boolean"),
				optional: true
			},
			const: {
				validate: (0, _utils.assertValueType)("boolean"),
				optional: true
			},
			constraint: {
				validate: (0, _utils.assertNodeType)("TSType"),
				optional: true
			},
			default: {
				validate: (0, _utils.assertNodeType)("TSType"),
				optional: true
			}
		}
	});
	var deprecatedAliases = {};
	Object.defineProperty(deprecatedAliases, "__esModule", {
		value: true
	});
	deprecatedAliases.DEPRECATED_ALIASES = void 0;
	deprecatedAliases.DEPRECATED_ALIASES = {
		ModuleDeclaration: "ImportOrExportDeclaration"
	};
	(function (exports3) {
		Object.defineProperty(exports3, "__esModule", {
			value: true
		});
		Object.defineProperty(exports3, "ALIAS_KEYS", {
			enumerable: true,
			get: function () {
				return _utils2.ALIAS_KEYS;
			}
		});
		Object.defineProperty(exports3, "BUILDER_KEYS", {
			enumerable: true,
			get: function () {
				return _utils2.BUILDER_KEYS;
			}
		});
		Object.defineProperty(exports3, "DEPRECATED_ALIASES", {
			enumerable: true,
			get: function () {
				return _deprecatedAliases.DEPRECATED_ALIASES;
			}
		});
		Object.defineProperty(exports3, "DEPRECATED_KEYS", {
			enumerable: true,
			get: function () {
				return _utils2.DEPRECATED_KEYS;
			}
		});
		Object.defineProperty(exports3, "FLIPPED_ALIAS_KEYS", {
			enumerable: true,
			get: function () {
				return _utils2.FLIPPED_ALIAS_KEYS;
			}
		});
		Object.defineProperty(exports3, "NODE_FIELDS", {
			enumerable: true,
			get: function () {
				return _utils2.NODE_FIELDS;
			}
		});
		Object.defineProperty(exports3, "NODE_PARENT_VALIDATIONS", {
			enumerable: true,
			get: function () {
				return _utils2.NODE_PARENT_VALIDATIONS;
			}
		});
		Object.defineProperty(exports3, "PLACEHOLDERS", {
			enumerable: true,
			get: function () {
				return _placeholders2.PLACEHOLDERS;
			}
		});
		Object.defineProperty(exports3, "PLACEHOLDERS_ALIAS", {
			enumerable: true,
			get: function () {
				return _placeholders2.PLACEHOLDERS_ALIAS;
			}
		});
		Object.defineProperty(exports3, "PLACEHOLDERS_FLIPPED_ALIAS", {
			enumerable: true,
			get: function () {
				return _placeholders2.PLACEHOLDERS_FLIPPED_ALIAS;
			}
		});
		exports3.TYPES = void 0;
		Object.defineProperty(exports3, "VISITOR_KEYS", {
			enumerable: true,
			get: function () {
				return _utils2.VISITOR_KEYS;
			}
		});
		var _utils2 = utils$1;
		var _placeholders2 = placeholders;
		var _deprecatedAliases = deprecatedAliases;
		Object.keys(_deprecatedAliases.DEPRECATED_ALIASES).forEach((deprecatedAlias) => {
			_utils2.FLIPPED_ALIAS_KEYS[deprecatedAlias] = _utils2.FLIPPED_ALIAS_KEYS[_deprecatedAliases.DEPRECATED_ALIASES[deprecatedAlias]];
		});
		exports3.TYPES = [].concat(Object.keys(_utils2.VISITOR_KEYS), Object.keys(_utils2.FLIPPED_ALIAS_KEYS), Object.keys(_utils2.DEPRECATED_KEYS));
	})(definitions);
	Object.defineProperty(validate$3, "__esModule", {
		value: true
	});
	validate$3.default = validate$1;
	validate$3.validateChild = validateChild;
	validate$3.validateField = validateField;
	validate$3.validateInternal = validateInternal;
	var _index$D = definitions;

	function validate$1(node2, key, val) {
		if (!node2)
			return;
		const fields = _index$D.NODE_FIELDS[node2.type];
		if (!fields)
			return;
		const field = fields[key];
		validateField(node2, key, val, field);
		validateChild(node2, key, val);
	}

	function validateInternal(field, node2, key, val, maybeNode) {
		if (!(field != null && field.validate))
			return;
		if (field.optional && val == null)
			return;
		field.validate(node2, key, val);
		if (maybeNode) {
			var _NODE_PARENT_VALIDATI;
			const type = val.type;
			if (type == null)
				return;
			(_NODE_PARENT_VALIDATI = _index$D.NODE_PARENT_VALIDATIONS[type]) == null || _NODE_PARENT_VALIDATI.call(_index$D.NODE_PARENT_VALIDATIONS, node2, key, val);
		}
	}

	function validateField(node2, key, val, field) {
		if (!(field != null && field.validate))
			return;
		if (field.optional && val == null)
			return;
		field.validate(node2, key, val);
	}

	function validateChild(node2, key, val) {
		var _NODE_PARENT_VALIDATI2;
		const type = val == null ? void 0 : val.type;
		if (type == null)
			return;
		(_NODE_PARENT_VALIDATI2 = _index$D.NODE_PARENT_VALIDATIONS[type]) == null || _NODE_PARENT_VALIDATI2.call(_index$D.NODE_PARENT_VALIDATIONS, node2, key, val);
	}

	Object.defineProperty(lowercase, "__esModule", {
		value: true
	});
	lowercase.anyTypeAnnotation = anyTypeAnnotation;
	lowercase.argumentPlaceholder = argumentPlaceholder;
	lowercase.arrayExpression = arrayExpression;
	lowercase.arrayPattern = arrayPattern;
	lowercase.arrayTypeAnnotation = arrayTypeAnnotation;
	lowercase.arrowFunctionExpression = arrowFunctionExpression;
	lowercase.assignmentExpression = assignmentExpression;
	lowercase.assignmentPattern = assignmentPattern;
	lowercase.awaitExpression = awaitExpression;
	lowercase.bigIntLiteral = bigIntLiteral;
	lowercase.binaryExpression = binaryExpression;
	lowercase.bindExpression = bindExpression;
	lowercase.blockStatement = blockStatement;
	lowercase.booleanLiteral = booleanLiteral;
	lowercase.booleanLiteralTypeAnnotation = booleanLiteralTypeAnnotation;
	lowercase.booleanTypeAnnotation = booleanTypeAnnotation;
	lowercase.breakStatement = breakStatement;
	lowercase.callExpression = callExpression;
	lowercase.catchClause = catchClause;
	lowercase.classAccessorProperty = classAccessorProperty;
	lowercase.classBody = classBody;
	lowercase.classDeclaration = classDeclaration;
	lowercase.classExpression = classExpression;
	lowercase.classImplements = classImplements;
	lowercase.classMethod = classMethod;
	lowercase.classPrivateMethod = classPrivateMethod;
	lowercase.classPrivateProperty = classPrivateProperty;
	lowercase.classProperty = classProperty;
	lowercase.conditionalExpression = conditionalExpression;
	lowercase.continueStatement = continueStatement;
	lowercase.debuggerStatement = debuggerStatement;
	lowercase.decimalLiteral = decimalLiteral;
	lowercase.declareClass = declareClass;
	lowercase.declareExportAllDeclaration = declareExportAllDeclaration;
	lowercase.declareExportDeclaration = declareExportDeclaration;
	lowercase.declareFunction = declareFunction;
	lowercase.declareInterface = declareInterface;
	lowercase.declareModule = declareModule;
	lowercase.declareModuleExports = declareModuleExports;
	lowercase.declareOpaqueType = declareOpaqueType;
	lowercase.declareTypeAlias = declareTypeAlias;
	lowercase.declareVariable = declareVariable;
	lowercase.declaredPredicate = declaredPredicate;
	lowercase.decorator = decorator;
	lowercase.directive = directive;
	lowercase.directiveLiteral = directiveLiteral;
	lowercase.doExpression = doExpression;
	lowercase.doWhileStatement = doWhileStatement;
	lowercase.emptyStatement = emptyStatement;
	lowercase.emptyTypeAnnotation = emptyTypeAnnotation;
	lowercase.enumBooleanBody = enumBooleanBody;
	lowercase.enumBooleanMember = enumBooleanMember;
	lowercase.enumDeclaration = enumDeclaration;
	lowercase.enumDefaultedMember = enumDefaultedMember;
	lowercase.enumNumberBody = enumNumberBody;
	lowercase.enumNumberMember = enumNumberMember;
	lowercase.enumStringBody = enumStringBody;
	lowercase.enumStringMember = enumStringMember;
	lowercase.enumSymbolBody = enumSymbolBody;
	lowercase.existsTypeAnnotation = existsTypeAnnotation;
	lowercase.exportAllDeclaration = exportAllDeclaration;
	lowercase.exportDefaultDeclaration = exportDefaultDeclaration;
	lowercase.exportDefaultSpecifier = exportDefaultSpecifier;
	lowercase.exportNamedDeclaration = exportNamedDeclaration;
	lowercase.exportNamespaceSpecifier = exportNamespaceSpecifier;
	lowercase.exportSpecifier = exportSpecifier;
	lowercase.expressionStatement = expressionStatement;
	lowercase.file = file;
	lowercase.forInStatement = forInStatement;
	lowercase.forOfStatement = forOfStatement;
	lowercase.forStatement = forStatement;
	lowercase.functionDeclaration = functionDeclaration;
	lowercase.functionExpression = functionExpression;
	lowercase.functionTypeAnnotation = functionTypeAnnotation;
	lowercase.functionTypeParam = functionTypeParam;
	lowercase.genericTypeAnnotation = genericTypeAnnotation;
	lowercase.identifier = identifier;
	lowercase.ifStatement = ifStatement;
	lowercase.import = _import;
	lowercase.importAttribute = importAttribute;
	lowercase.importDeclaration = importDeclaration;
	lowercase.importDefaultSpecifier = importDefaultSpecifier;
	lowercase.importExpression = importExpression;
	lowercase.importNamespaceSpecifier = importNamespaceSpecifier;
	lowercase.importSpecifier = importSpecifier;
	lowercase.indexedAccessType = indexedAccessType;
	lowercase.inferredPredicate = inferredPredicate;
	lowercase.interfaceDeclaration = interfaceDeclaration;
	lowercase.interfaceExtends = interfaceExtends;
	lowercase.interfaceTypeAnnotation = interfaceTypeAnnotation;
	lowercase.interpreterDirective = interpreterDirective;
	lowercase.intersectionTypeAnnotation = intersectionTypeAnnotation;
	lowercase.jSXAttribute = lowercase.jsxAttribute = jsxAttribute;
	lowercase.jSXClosingElement = lowercase.jsxClosingElement = jsxClosingElement;
	lowercase.jSXClosingFragment = lowercase.jsxClosingFragment = jsxClosingFragment;
	lowercase.jSXElement = lowercase.jsxElement = jsxElement;
	lowercase.jSXEmptyExpression = lowercase.jsxEmptyExpression = jsxEmptyExpression;
	lowercase.jSXExpressionContainer = lowercase.jsxExpressionContainer = jsxExpressionContainer;
	lowercase.jSXFragment = lowercase.jsxFragment = jsxFragment;
	lowercase.jSXIdentifier = lowercase.jsxIdentifier = jsxIdentifier;
	lowercase.jSXMemberExpression = lowercase.jsxMemberExpression = jsxMemberExpression;
	lowercase.jSXNamespacedName = lowercase.jsxNamespacedName = jsxNamespacedName;
	lowercase.jSXOpeningElement = lowercase.jsxOpeningElement = jsxOpeningElement;
	lowercase.jSXOpeningFragment = lowercase.jsxOpeningFragment = jsxOpeningFragment;
	lowercase.jSXSpreadAttribute = lowercase.jsxSpreadAttribute = jsxSpreadAttribute;
	lowercase.jSXSpreadChild = lowercase.jsxSpreadChild = jsxSpreadChild;
	lowercase.jSXText = lowercase.jsxText = jsxText;
	lowercase.labeledStatement = labeledStatement;
	lowercase.logicalExpression = logicalExpression;
	lowercase.memberExpression = memberExpression;
	lowercase.metaProperty = metaProperty;
	lowercase.mixedTypeAnnotation = mixedTypeAnnotation;
	lowercase.moduleExpression = moduleExpression;
	lowercase.newExpression = newExpression;
	lowercase.noop = noop;
	lowercase.nullLiteral = nullLiteral;
	lowercase.nullLiteralTypeAnnotation = nullLiteralTypeAnnotation;
	lowercase.nullableTypeAnnotation = nullableTypeAnnotation;
	lowercase.numberLiteral = NumberLiteral;
	lowercase.numberLiteralTypeAnnotation = numberLiteralTypeAnnotation;
	lowercase.numberTypeAnnotation = numberTypeAnnotation;
	lowercase.numericLiteral = numericLiteral;
	lowercase.objectExpression = objectExpression;
	lowercase.objectMethod = objectMethod;
	lowercase.objectPattern = objectPattern;
	lowercase.objectProperty = objectProperty;
	lowercase.objectTypeAnnotation = objectTypeAnnotation;
	lowercase.objectTypeCallProperty = objectTypeCallProperty;
	lowercase.objectTypeIndexer = objectTypeIndexer;
	lowercase.objectTypeInternalSlot = objectTypeInternalSlot;
	lowercase.objectTypeProperty = objectTypeProperty;
	lowercase.objectTypeSpreadProperty = objectTypeSpreadProperty;
	lowercase.opaqueType = opaqueType;
	lowercase.optionalCallExpression = optionalCallExpression;
	lowercase.optionalIndexedAccessType = optionalIndexedAccessType;
	lowercase.optionalMemberExpression = optionalMemberExpression;
	lowercase.parenthesizedExpression = parenthesizedExpression;
	lowercase.pipelineBareFunction = pipelineBareFunction;
	lowercase.pipelinePrimaryTopicReference = pipelinePrimaryTopicReference;
	lowercase.pipelineTopicExpression = pipelineTopicExpression;
	lowercase.placeholder = placeholder;
	lowercase.privateName = privateName;
	lowercase.program = program;
	lowercase.qualifiedTypeIdentifier = qualifiedTypeIdentifier;
	lowercase.recordExpression = recordExpression;
	lowercase.regExpLiteral = regExpLiteral;
	lowercase.regexLiteral = RegexLiteral;
	lowercase.restElement = restElement;
	lowercase.restProperty = RestProperty;
	lowercase.returnStatement = returnStatement;
	lowercase.sequenceExpression = sequenceExpression;
	lowercase.spreadElement = spreadElement;
	lowercase.spreadProperty = SpreadProperty;
	lowercase.staticBlock = staticBlock;
	lowercase.stringLiteral = stringLiteral;
	lowercase.stringLiteralTypeAnnotation = stringLiteralTypeAnnotation;
	lowercase.stringTypeAnnotation = stringTypeAnnotation;
	lowercase.super = _super;
	lowercase.switchCase = switchCase;
	lowercase.switchStatement = switchStatement;
	lowercase.symbolTypeAnnotation = symbolTypeAnnotation;
	lowercase.taggedTemplateExpression = taggedTemplateExpression;
	lowercase.templateElement = templateElement;
	lowercase.templateLiteral = templateLiteral;
	lowercase.thisExpression = thisExpression;
	lowercase.thisTypeAnnotation = thisTypeAnnotation;
	lowercase.throwStatement = throwStatement;
	lowercase.topicReference = topicReference;
	lowercase.tryStatement = tryStatement;
	lowercase.tSAnyKeyword = lowercase.tsAnyKeyword = tsAnyKeyword;
	lowercase.tSArrayType = lowercase.tsArrayType = tsArrayType;
	lowercase.tSAsExpression = lowercase.tsAsExpression = tsAsExpression;
	lowercase.tSBigIntKeyword = lowercase.tsBigIntKeyword = tsBigIntKeyword;
	lowercase.tSBooleanKeyword = lowercase.tsBooleanKeyword = tsBooleanKeyword;
	lowercase.tSCallSignatureDeclaration = lowercase.tsCallSignatureDeclaration = tsCallSignatureDeclaration;
	lowercase.tSConditionalType = lowercase.tsConditionalType = tsConditionalType;
	lowercase.tSConstructSignatureDeclaration = lowercase.tsConstructSignatureDeclaration = tsConstructSignatureDeclaration;
	lowercase.tSConstructorType = lowercase.tsConstructorType = tsConstructorType;
	lowercase.tSDeclareFunction = lowercase.tsDeclareFunction = tsDeclareFunction;
	lowercase.tSDeclareMethod = lowercase.tsDeclareMethod = tsDeclareMethod;
	lowercase.tSEnumBody = lowercase.tsEnumBody = tsEnumBody;
	lowercase.tSEnumDeclaration = lowercase.tsEnumDeclaration = tsEnumDeclaration;
	lowercase.tSEnumMember = lowercase.tsEnumMember = tsEnumMember;
	lowercase.tSExportAssignment = lowercase.tsExportAssignment = tsExportAssignment;
	lowercase.tSExpressionWithTypeArguments = lowercase.tsExpressionWithTypeArguments = tsExpressionWithTypeArguments;
	lowercase.tSExternalModuleReference = lowercase.tsExternalModuleReference = tsExternalModuleReference;
	lowercase.tSFunctionType = lowercase.tsFunctionType = tsFunctionType;
	lowercase.tSImportEqualsDeclaration = lowercase.tsImportEqualsDeclaration = tsImportEqualsDeclaration;
	lowercase.tSImportType = lowercase.tsImportType = tsImportType;
	lowercase.tSIndexSignature = lowercase.tsIndexSignature = tsIndexSignature;
	lowercase.tSIndexedAccessType = lowercase.tsIndexedAccessType = tsIndexedAccessType;
	lowercase.tSInferType = lowercase.tsInferType = tsInferType;
	lowercase.tSInstantiationExpression = lowercase.tsInstantiationExpression = tsInstantiationExpression;
	lowercase.tSInterfaceBody = lowercase.tsInterfaceBody = tsInterfaceBody;
	lowercase.tSInterfaceDeclaration = lowercase.tsInterfaceDeclaration = tsInterfaceDeclaration;
	lowercase.tSIntersectionType = lowercase.tsIntersectionType = tsIntersectionType;
	lowercase.tSIntrinsicKeyword = lowercase.tsIntrinsicKeyword = tsIntrinsicKeyword;
	lowercase.tSLiteralType = lowercase.tsLiteralType = tsLiteralType;
	lowercase.tSMappedType = lowercase.tsMappedType = tsMappedType;
	lowercase.tSMethodSignature = lowercase.tsMethodSignature = tsMethodSignature;
	lowercase.tSModuleBlock = lowercase.tsModuleBlock = tsModuleBlock;
	lowercase.tSModuleDeclaration = lowercase.tsModuleDeclaration = tsModuleDeclaration;
	lowercase.tSNamedTupleMember = lowercase.tsNamedTupleMember = tsNamedTupleMember;
	lowercase.tSNamespaceExportDeclaration = lowercase.tsNamespaceExportDeclaration = tsNamespaceExportDeclaration;
	lowercase.tSNeverKeyword = lowercase.tsNeverKeyword = tsNeverKeyword;
	lowercase.tSNonNullExpression = lowercase.tsNonNullExpression = tsNonNullExpression;
	lowercase.tSNullKeyword = lowercase.tsNullKeyword = tsNullKeyword;
	lowercase.tSNumberKeyword = lowercase.tsNumberKeyword = tsNumberKeyword;
	lowercase.tSObjectKeyword = lowercase.tsObjectKeyword = tsObjectKeyword;
	lowercase.tSOptionalType = lowercase.tsOptionalType = tsOptionalType;
	lowercase.tSParameterProperty = lowercase.tsParameterProperty = tsParameterProperty;
	lowercase.tSParenthesizedType = lowercase.tsParenthesizedType = tsParenthesizedType;
	lowercase.tSPropertySignature = lowercase.tsPropertySignature = tsPropertySignature;
	lowercase.tSQualifiedName = lowercase.tsQualifiedName = tsQualifiedName;
	lowercase.tSRestType = lowercase.tsRestType = tsRestType;
	lowercase.tSSatisfiesExpression = lowercase.tsSatisfiesExpression = tsSatisfiesExpression;
	lowercase.tSStringKeyword = lowercase.tsStringKeyword = tsStringKeyword;
	lowercase.tSSymbolKeyword = lowercase.tsSymbolKeyword = tsSymbolKeyword;
	lowercase.tSTemplateLiteralType = lowercase.tsTemplateLiteralType = tsTemplateLiteralType;
	lowercase.tSThisType = lowercase.tsThisType = tsThisType;
	lowercase.tSTupleType = lowercase.tsTupleType = tsTupleType;
	lowercase.tSTypeAliasDeclaration = lowercase.tsTypeAliasDeclaration = tsTypeAliasDeclaration;
	lowercase.tSTypeAnnotation = lowercase.tsTypeAnnotation = tsTypeAnnotation;
	lowercase.tSTypeAssertion = lowercase.tsTypeAssertion = tsTypeAssertion;
	lowercase.tSTypeLiteral = lowercase.tsTypeLiteral = tsTypeLiteral;
	lowercase.tSTypeOperator = lowercase.tsTypeOperator = tsTypeOperator;
	lowercase.tSTypeParameter = lowercase.tsTypeParameter = tsTypeParameter;
	lowercase.tSTypeParameterDeclaration = lowercase.tsTypeParameterDeclaration = tsTypeParameterDeclaration;
	lowercase.tSTypeParameterInstantiation = lowercase.tsTypeParameterInstantiation = tsTypeParameterInstantiation;
	lowercase.tSTypePredicate = lowercase.tsTypePredicate = tsTypePredicate;
	lowercase.tSTypeQuery = lowercase.tsTypeQuery = tsTypeQuery;
	lowercase.tSTypeReference = lowercase.tsTypeReference = tsTypeReference;
	lowercase.tSUndefinedKeyword = lowercase.tsUndefinedKeyword = tsUndefinedKeyword;
	lowercase.tSUnionType = lowercase.tsUnionType = tsUnionType;
	lowercase.tSUnknownKeyword = lowercase.tsUnknownKeyword = tsUnknownKeyword;
	lowercase.tSVoidKeyword = lowercase.tsVoidKeyword = tsVoidKeyword;
	lowercase.tupleExpression = tupleExpression;
	lowercase.tupleTypeAnnotation = tupleTypeAnnotation;
	lowercase.typeAlias = typeAlias;
	lowercase.typeAnnotation = typeAnnotation;
	lowercase.typeCastExpression = typeCastExpression;
	lowercase.typeParameter = typeParameter;
	lowercase.typeParameterDeclaration = typeParameterDeclaration;
	lowercase.typeParameterInstantiation = typeParameterInstantiation;
	lowercase.typeofTypeAnnotation = typeofTypeAnnotation;
	lowercase.unaryExpression = unaryExpression;
	lowercase.unionTypeAnnotation = unionTypeAnnotation;
	lowercase.updateExpression = updateExpression;
	lowercase.v8IntrinsicIdentifier = v8IntrinsicIdentifier;
	lowercase.variableDeclaration = variableDeclaration;
	lowercase.variableDeclarator = variableDeclarator;
	lowercase.variance = variance;
	lowercase.voidTypeAnnotation = voidTypeAnnotation;
	lowercase.whileStatement = whileStatement;
	lowercase.withStatement = withStatement;
	lowercase.yieldExpression = yieldExpression;
	var _validate = validate$3;
	var _deprecationWarning$1 = deprecationWarning$1;
	var utils = utils$1;
	const {
		validateInternal: validate
	} = _validate;
	const {
		NODE_FIELDS
	} = utils;

	function arrayExpression(elements = []) {
		const node2 = {
			type: "ArrayExpression",
			elements
		};
		const defs = NODE_FIELDS.ArrayExpression;
		validate(defs.elements, node2, "elements", elements, 1);
		return node2;
	}

	function assignmentExpression(operator, left, right) {
		const node2 = {
			type: "AssignmentExpression",
			operator,
			left,
			right
		};
		const defs = NODE_FIELDS.AssignmentExpression;
		validate(defs.operator, node2, "operator", operator);
		validate(defs.left, node2, "left", left, 1);
		validate(defs.right, node2, "right", right, 1);
		return node2;
	}

	function binaryExpression(operator, left, right) {
		const node2 = {
			type: "BinaryExpression",
			operator,
			left,
			right
		};
		const defs = NODE_FIELDS.BinaryExpression;
		validate(defs.operator, node2, "operator", operator);
		validate(defs.left, node2, "left", left, 1);
		validate(defs.right, node2, "right", right, 1);
		return node2;
	}

	function interpreterDirective(value) {
		const node2 = {
			type: "InterpreterDirective",
			value
		};
		const defs = NODE_FIELDS.InterpreterDirective;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function directive(value) {
		const node2 = {
			type: "Directive",
			value
		};
		const defs = NODE_FIELDS.Directive;
		validate(defs.value, node2, "value", value, 1);
		return node2;
	}

	function directiveLiteral(value) {
		const node2 = {
			type: "DirectiveLiteral",
			value
		};
		const defs = NODE_FIELDS.DirectiveLiteral;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function blockStatement(body, directives = []) {
		const node2 = {
			type: "BlockStatement",
			body,
			directives
		};
		const defs = NODE_FIELDS.BlockStatement;
		validate(defs.body, node2, "body", body, 1);
		validate(defs.directives, node2, "directives", directives, 1);
		return node2;
	}

	function breakStatement(label = null) {
		const node2 = {
			type: "BreakStatement",
			label
		};
		const defs = NODE_FIELDS.BreakStatement;
		validate(defs.label, node2, "label", label, 1);
		return node2;
	}

	function callExpression(callee, _arguments) {
		const node2 = {
			type: "CallExpression",
			callee,
			arguments: _arguments
		};
		const defs = NODE_FIELDS.CallExpression;
		validate(defs.callee, node2, "callee", callee, 1);
		validate(defs.arguments, node2, "arguments", _arguments, 1);
		return node2;
	}

	function catchClause(param = null, body) {
		const node2 = {
			type: "CatchClause",
			param,
			body
		};
		const defs = NODE_FIELDS.CatchClause;
		validate(defs.param, node2, "param", param, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function conditionalExpression(test, consequent, alternate) {
		const node2 = {
			type: "ConditionalExpression",
			test,
			consequent,
			alternate
		};
		const defs = NODE_FIELDS.ConditionalExpression;
		validate(defs.test, node2, "test", test, 1);
		validate(defs.consequent, node2, "consequent", consequent, 1);
		validate(defs.alternate, node2, "alternate", alternate, 1);
		return node2;
	}

	function continueStatement(label = null) {
		const node2 = {
			type: "ContinueStatement",
			label
		};
		const defs = NODE_FIELDS.ContinueStatement;
		validate(defs.label, node2, "label", label, 1);
		return node2;
	}

	function debuggerStatement() {
		return {
			type: "DebuggerStatement"
		};
	}

	function doWhileStatement(test, body) {
		const node2 = {
			type: "DoWhileStatement",
			test,
			body
		};
		const defs = NODE_FIELDS.DoWhileStatement;
		validate(defs.test, node2, "test", test, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function emptyStatement() {
		return {
			type: "EmptyStatement"
		};
	}

	function expressionStatement(expression) {
		const node2 = {
			type: "ExpressionStatement",
			expression
		};
		const defs = NODE_FIELDS.ExpressionStatement;
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function file(program2, comments = null, tokens = null) {
		const node2 = {
			type: "File",
			program: program2,
			comments,
			tokens
		};
		const defs = NODE_FIELDS.File;
		validate(defs.program, node2, "program", program2, 1);
		validate(defs.comments, node2, "comments", comments, 1);
		validate(defs.tokens, node2, "tokens", tokens);
		return node2;
	}

	function forInStatement(left, right, body) {
		const node2 = {
			type: "ForInStatement",
			left,
			right,
			body
		};
		const defs = NODE_FIELDS.ForInStatement;
		validate(defs.left, node2, "left", left, 1);
		validate(defs.right, node2, "right", right, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function forStatement(init = null, test = null, update = null, body) {
		const node2 = {
			type: "ForStatement",
			init,
			test,
			update,
			body
		};
		const defs = NODE_FIELDS.ForStatement;
		validate(defs.init, node2, "init", init, 1);
		validate(defs.test, node2, "test", test, 1);
		validate(defs.update, node2, "update", update, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function functionDeclaration(id = null, params, body, generator = false, async = false) {
		const node2 = {
			type: "FunctionDeclaration",
			id,
			params,
			body,
			generator,
			async
		};
		const defs = NODE_FIELDS.FunctionDeclaration;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.params, node2, "params", params, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.generator, node2, "generator", generator);
		validate(defs.async, node2, "async", async);
		return node2;
	}

	function functionExpression(id = null, params, body, generator = false, async = false) {
		const node2 = {
			type: "FunctionExpression",
			id,
			params,
			body,
			generator,
			async
		};
		const defs = NODE_FIELDS.FunctionExpression;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.params, node2, "params", params, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.generator, node2, "generator", generator);
		validate(defs.async, node2, "async", async);
		return node2;
	}

	function identifier(name) {
		const node2 = {
			type: "Identifier",
			name
		};
		const defs = NODE_FIELDS.Identifier;
		validate(defs.name, node2, "name", name);
		return node2;
	}

	function ifStatement(test, consequent, alternate = null) {
		const node2 = {
			type: "IfStatement",
			test,
			consequent,
			alternate
		};
		const defs = NODE_FIELDS.IfStatement;
		validate(defs.test, node2, "test", test, 1);
		validate(defs.consequent, node2, "consequent", consequent, 1);
		validate(defs.alternate, node2, "alternate", alternate, 1);
		return node2;
	}

	function labeledStatement(label, body) {
		const node2 = {
			type: "LabeledStatement",
			label,
			body
		};
		const defs = NODE_FIELDS.LabeledStatement;
		validate(defs.label, node2, "label", label, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function stringLiteral(value) {
		const node2 = {
			type: "StringLiteral",
			value
		};
		const defs = NODE_FIELDS.StringLiteral;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function numericLiteral(value) {
		const node2 = {
			type: "NumericLiteral",
			value
		};
		const defs = NODE_FIELDS.NumericLiteral;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function nullLiteral() {
		return {
			type: "NullLiteral"
		};
	}

	function booleanLiteral(value) {
		const node2 = {
			type: "BooleanLiteral",
			value
		};
		const defs = NODE_FIELDS.BooleanLiteral;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function regExpLiteral(pattern, flags = "") {
		const node2 = {
			type: "RegExpLiteral",
			pattern,
			flags
		};
		const defs = NODE_FIELDS.RegExpLiteral;
		validate(defs.pattern, node2, "pattern", pattern);
		validate(defs.flags, node2, "flags", flags);
		return node2;
	}

	function logicalExpression(operator, left, right) {
		const node2 = {
			type: "LogicalExpression",
			operator,
			left,
			right
		};
		const defs = NODE_FIELDS.LogicalExpression;
		validate(defs.operator, node2, "operator", operator);
		validate(defs.left, node2, "left", left, 1);
		validate(defs.right, node2, "right", right, 1);
		return node2;
	}

	function memberExpression(object2, property, computed = false, optional = null) {
		const node2 = {
			type: "MemberExpression",
			object: object2,
			property,
			computed,
			optional
		};
		const defs = NODE_FIELDS.MemberExpression;
		validate(defs.object, node2, "object", object2, 1);
		validate(defs.property, node2, "property", property, 1);
		validate(defs.computed, node2, "computed", computed);
		validate(defs.optional, node2, "optional", optional);
		return node2;
	}

	function newExpression(callee, _arguments) {
		const node2 = {
			type: "NewExpression",
			callee,
			arguments: _arguments
		};
		const defs = NODE_FIELDS.NewExpression;
		validate(defs.callee, node2, "callee", callee, 1);
		validate(defs.arguments, node2, "arguments", _arguments, 1);
		return node2;
	}

	function program(body, directives = [], sourceType = "script", interpreter = null) {
		const node2 = {
			type: "Program",
			body,
			directives,
			sourceType,
			interpreter
		};
		const defs = NODE_FIELDS.Program;
		validate(defs.body, node2, "body", body, 1);
		validate(defs.directives, node2, "directives", directives, 1);
		validate(defs.sourceType, node2, "sourceType", sourceType);
		validate(defs.interpreter, node2, "interpreter", interpreter, 1);
		return node2;
	}

	function objectExpression(properties) {
		const node2 = {
			type: "ObjectExpression",
			properties
		};
		const defs = NODE_FIELDS.ObjectExpression;
		validate(defs.properties, node2, "properties", properties, 1);
		return node2;
	}

	function objectMethod(kind = "method", key, params, body, computed = false, generator = false, async = false) {
		const node2 = {
			type: "ObjectMethod",
			kind,
			key,
			params,
			body,
			computed,
			generator,
			async
		};
		const defs = NODE_FIELDS.ObjectMethod;
		validate(defs.kind, node2, "kind", kind);
		validate(defs.key, node2, "key", key, 1);
		validate(defs.params, node2, "params", params, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.computed, node2, "computed", computed);
		validate(defs.generator, node2, "generator", generator);
		validate(defs.async, node2, "async", async);
		return node2;
	}

	function objectProperty(key, value, computed = false, shorthand = false, decorators = null) {
		const node2 = {
			type: "ObjectProperty",
			key,
			value,
			computed,
			shorthand,
			decorators
		};
		const defs = NODE_FIELDS.ObjectProperty;
		validate(defs.key, node2, "key", key, 1);
		validate(defs.value, node2, "value", value, 1);
		validate(defs.computed, node2, "computed", computed);
		validate(defs.shorthand, node2, "shorthand", shorthand);
		validate(defs.decorators, node2, "decorators", decorators, 1);
		return node2;
	}

	function restElement(argument) {
		const node2 = {
			type: "RestElement",
			argument
		};
		const defs = NODE_FIELDS.RestElement;
		validate(defs.argument, node2, "argument", argument, 1);
		return node2;
	}

	function returnStatement(argument = null) {
		const node2 = {
			type: "ReturnStatement",
			argument
		};
		const defs = NODE_FIELDS.ReturnStatement;
		validate(defs.argument, node2, "argument", argument, 1);
		return node2;
	}

	function sequenceExpression(expressions2) {
		const node2 = {
			type: "SequenceExpression",
			expressions: expressions2
		};
		const defs = NODE_FIELDS.SequenceExpression;
		validate(defs.expressions, node2, "expressions", expressions2, 1);
		return node2;
	}

	function parenthesizedExpression(expression) {
		const node2 = {
			type: "ParenthesizedExpression",
			expression
		};
		const defs = NODE_FIELDS.ParenthesizedExpression;
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function switchCase(test = null, consequent) {
		const node2 = {
			type: "SwitchCase",
			test,
			consequent
		};
		const defs = NODE_FIELDS.SwitchCase;
		validate(defs.test, node2, "test", test, 1);
		validate(defs.consequent, node2, "consequent", consequent, 1);
		return node2;
	}

	function switchStatement(discriminant, cases) {
		const node2 = {
			type: "SwitchStatement",
			discriminant,
			cases
		};
		const defs = NODE_FIELDS.SwitchStatement;
		validate(defs.discriminant, node2, "discriminant", discriminant, 1);
		validate(defs.cases, node2, "cases", cases, 1);
		return node2;
	}

	function thisExpression() {
		return {
			type: "ThisExpression"
		};
	}

	function throwStatement(argument) {
		const node2 = {
			type: "ThrowStatement",
			argument
		};
		const defs = NODE_FIELDS.ThrowStatement;
		validate(defs.argument, node2, "argument", argument, 1);
		return node2;
	}

	function tryStatement(block, handler = null, finalizer = null) {
		const node2 = {
			type: "TryStatement",
			block,
			handler,
			finalizer
		};
		const defs = NODE_FIELDS.TryStatement;
		validate(defs.block, node2, "block", block, 1);
		validate(defs.handler, node2, "handler", handler, 1);
		validate(defs.finalizer, node2, "finalizer", finalizer, 1);
		return node2;
	}

	function unaryExpression(operator, argument, prefix = true) {
		const node2 = {
			type: "UnaryExpression",
			operator,
			argument,
			prefix
		};
		const defs = NODE_FIELDS.UnaryExpression;
		validate(defs.operator, node2, "operator", operator);
		validate(defs.argument, node2, "argument", argument, 1);
		validate(defs.prefix, node2, "prefix", prefix);
		return node2;
	}

	function updateExpression(operator, argument, prefix = false) {
		const node2 = {
			type: "UpdateExpression",
			operator,
			argument,
			prefix
		};
		const defs = NODE_FIELDS.UpdateExpression;
		validate(defs.operator, node2, "operator", operator);
		validate(defs.argument, node2, "argument", argument, 1);
		validate(defs.prefix, node2, "prefix", prefix);
		return node2;
	}

	function variableDeclaration(kind, declarations) {
		const node2 = {
			type: "VariableDeclaration",
			kind,
			declarations
		};
		const defs = NODE_FIELDS.VariableDeclaration;
		validate(defs.kind, node2, "kind", kind);
		validate(defs.declarations, node2, "declarations", declarations, 1);
		return node2;
	}

	function variableDeclarator(id, init = null) {
		const node2 = {
			type: "VariableDeclarator",
			id,
			init
		};
		const defs = NODE_FIELDS.VariableDeclarator;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.init, node2, "init", init, 1);
		return node2;
	}

	function whileStatement(test, body) {
		const node2 = {
			type: "WhileStatement",
			test,
			body
		};
		const defs = NODE_FIELDS.WhileStatement;
		validate(defs.test, node2, "test", test, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function withStatement(object2, body) {
		const node2 = {
			type: "WithStatement",
			object: object2,
			body
		};
		const defs = NODE_FIELDS.WithStatement;
		validate(defs.object, node2, "object", object2, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function assignmentPattern(left, right) {
		const node2 = {
			type: "AssignmentPattern",
			left,
			right
		};
		const defs = NODE_FIELDS.AssignmentPattern;
		validate(defs.left, node2, "left", left, 1);
		validate(defs.right, node2, "right", right, 1);
		return node2;
	}

	function arrayPattern(elements) {
		const node2 = {
			type: "ArrayPattern",
			elements
		};
		const defs = NODE_FIELDS.ArrayPattern;
		validate(defs.elements, node2, "elements", elements, 1);
		return node2;
	}

	function arrowFunctionExpression(params, body, async = false) {
		const node2 = {
			type: "ArrowFunctionExpression",
			params,
			body,
			async,
			expression: null
		};
		const defs = NODE_FIELDS.ArrowFunctionExpression;
		validate(defs.params, node2, "params", params, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.async, node2, "async", async);
		return node2;
	}

	function classBody(body) {
		const node2 = {
			type: "ClassBody",
			body
		};
		const defs = NODE_FIELDS.ClassBody;
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function classExpression(id = null, superClass = null, body, decorators = null) {
		const node2 = {
			type: "ClassExpression",
			id,
			superClass,
			body,
			decorators
		};
		const defs = NODE_FIELDS.ClassExpression;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.superClass, node2, "superClass", superClass, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.decorators, node2, "decorators", decorators, 1);
		return node2;
	}

	function classDeclaration(id = null, superClass = null, body, decorators = null) {
		const node2 = {
			type: "ClassDeclaration",
			id,
			superClass,
			body,
			decorators
		};
		const defs = NODE_FIELDS.ClassDeclaration;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.superClass, node2, "superClass", superClass, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.decorators, node2, "decorators", decorators, 1);
		return node2;
	}

	function exportAllDeclaration(source) {
		const node2 = {
			type: "ExportAllDeclaration",
			source
		};
		const defs = NODE_FIELDS.ExportAllDeclaration;
		validate(defs.source, node2, "source", source, 1);
		return node2;
	}

	function exportDefaultDeclaration(declaration) {
		const node2 = {
			type: "ExportDefaultDeclaration",
			declaration
		};
		const defs = NODE_FIELDS.ExportDefaultDeclaration;
		validate(defs.declaration, node2, "declaration", declaration, 1);
		return node2;
	}

	function exportNamedDeclaration(declaration = null, specifiers = [], source = null) {
		const node2 = {
			type: "ExportNamedDeclaration",
			declaration,
			specifiers,
			source
		};
		const defs = NODE_FIELDS.ExportNamedDeclaration;
		validate(defs.declaration, node2, "declaration", declaration, 1);
		validate(defs.specifiers, node2, "specifiers", specifiers, 1);
		validate(defs.source, node2, "source", source, 1);
		return node2;
	}

	function exportSpecifier(local, exported) {
		const node2 = {
			type: "ExportSpecifier",
			local,
			exported
		};
		const defs = NODE_FIELDS.ExportSpecifier;
		validate(defs.local, node2, "local", local, 1);
		validate(defs.exported, node2, "exported", exported, 1);
		return node2;
	}

	function forOfStatement(left, right, body, _await = false) {
		const node2 = {
			type: "ForOfStatement",
			left,
			right,
			body,
			await: _await
		};
		const defs = NODE_FIELDS.ForOfStatement;
		validate(defs.left, node2, "left", left, 1);
		validate(defs.right, node2, "right", right, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.await, node2, "await", _await);
		return node2;
	}

	function importDeclaration(specifiers, source) {
		const node2 = {
			type: "ImportDeclaration",
			specifiers,
			source
		};
		const defs = NODE_FIELDS.ImportDeclaration;
		validate(defs.specifiers, node2, "specifiers", specifiers, 1);
		validate(defs.source, node2, "source", source, 1);
		return node2;
	}

	function importDefaultSpecifier(local) {
		const node2 = {
			type: "ImportDefaultSpecifier",
			local
		};
		const defs = NODE_FIELDS.ImportDefaultSpecifier;
		validate(defs.local, node2, "local", local, 1);
		return node2;
	}

	function importNamespaceSpecifier(local) {
		const node2 = {
			type: "ImportNamespaceSpecifier",
			local
		};
		const defs = NODE_FIELDS.ImportNamespaceSpecifier;
		validate(defs.local, node2, "local", local, 1);
		return node2;
	}

	function importSpecifier(local, imported) {
		const node2 = {
			type: "ImportSpecifier",
			local,
			imported
		};
		const defs = NODE_FIELDS.ImportSpecifier;
		validate(defs.local, node2, "local", local, 1);
		validate(defs.imported, node2, "imported", imported, 1);
		return node2;
	}

	function importExpression(source, options = null) {
		const node2 = {
			type: "ImportExpression",
			source,
			options
		};
		const defs = NODE_FIELDS.ImportExpression;
		validate(defs.source, node2, "source", source, 1);
		validate(defs.options, node2, "options", options, 1);
		return node2;
	}

	function metaProperty(meta, property) {
		const node2 = {
			type: "MetaProperty",
			meta,
			property
		};
		const defs = NODE_FIELDS.MetaProperty;
		validate(defs.meta, node2, "meta", meta, 1);
		validate(defs.property, node2, "property", property, 1);
		return node2;
	}

	function classMethod(kind = "method", key, params, body, computed = false, _static = false, generator = false, async = false) {
		const node2 = {
			type: "ClassMethod",
			kind,
			key,
			params,
			body,
			computed,
			static: _static,
			generator,
			async
		};
		const defs = NODE_FIELDS.ClassMethod;
		validate(defs.kind, node2, "kind", kind);
		validate(defs.key, node2, "key", key, 1);
		validate(defs.params, node2, "params", params, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.computed, node2, "computed", computed);
		validate(defs.static, node2, "static", _static);
		validate(defs.generator, node2, "generator", generator);
		validate(defs.async, node2, "async", async);
		return node2;
	}

	function objectPattern(properties) {
		const node2 = {
			type: "ObjectPattern",
			properties
		};
		const defs = NODE_FIELDS.ObjectPattern;
		validate(defs.properties, node2, "properties", properties, 1);
		return node2;
	}

	function spreadElement(argument) {
		const node2 = {
			type: "SpreadElement",
			argument
		};
		const defs = NODE_FIELDS.SpreadElement;
		validate(defs.argument, node2, "argument", argument, 1);
		return node2;
	}

	function _super() {
		return {
			type: "Super"
		};
	}

	function taggedTemplateExpression(tag, quasi) {
		const node2 = {
			type: "TaggedTemplateExpression",
			tag,
			quasi
		};
		const defs = NODE_FIELDS.TaggedTemplateExpression;
		validate(defs.tag, node2, "tag", tag, 1);
		validate(defs.quasi, node2, "quasi", quasi, 1);
		return node2;
	}

	function templateElement(value, tail = false) {
		const node2 = {
			type: "TemplateElement",
			value,
			tail
		};
		const defs = NODE_FIELDS.TemplateElement;
		validate(defs.value, node2, "value", value);
		validate(defs.tail, node2, "tail", tail);
		return node2;
	}

	function templateLiteral(quasis, expressions2) {
		const node2 = {
			type: "TemplateLiteral",
			quasis,
			expressions: expressions2
		};
		const defs = NODE_FIELDS.TemplateLiteral;
		validate(defs.quasis, node2, "quasis", quasis, 1);
		validate(defs.expressions, node2, "expressions", expressions2, 1);
		return node2;
	}

	function yieldExpression(argument = null, delegate = false) {
		const node2 = {
			type: "YieldExpression",
			argument,
			delegate
		};
		const defs = NODE_FIELDS.YieldExpression;
		validate(defs.argument, node2, "argument", argument, 1);
		validate(defs.delegate, node2, "delegate", delegate);
		return node2;
	}

	function awaitExpression(argument) {
		const node2 = {
			type: "AwaitExpression",
			argument
		};
		const defs = NODE_FIELDS.AwaitExpression;
		validate(defs.argument, node2, "argument", argument, 1);
		return node2;
	}

	function _import() {
		return {
			type: "Import"
		};
	}

	function bigIntLiteral(value) {
		const node2 = {
			type: "BigIntLiteral",
			value
		};
		const defs = NODE_FIELDS.BigIntLiteral;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function exportNamespaceSpecifier(exported) {
		const node2 = {
			type: "ExportNamespaceSpecifier",
			exported
		};
		const defs = NODE_FIELDS.ExportNamespaceSpecifier;
		validate(defs.exported, node2, "exported", exported, 1);
		return node2;
	}

	function optionalMemberExpression(object2, property, computed = false, optional) {
		const node2 = {
			type: "OptionalMemberExpression",
			object: object2,
			property,
			computed,
			optional
		};
		const defs = NODE_FIELDS.OptionalMemberExpression;
		validate(defs.object, node2, "object", object2, 1);
		validate(defs.property, node2, "property", property, 1);
		validate(defs.computed, node2, "computed", computed);
		validate(defs.optional, node2, "optional", optional);
		return node2;
	}

	function optionalCallExpression(callee, _arguments, optional) {
		const node2 = {
			type: "OptionalCallExpression",
			callee,
			arguments: _arguments,
			optional
		};
		const defs = NODE_FIELDS.OptionalCallExpression;
		validate(defs.callee, node2, "callee", callee, 1);
		validate(defs.arguments, node2, "arguments", _arguments, 1);
		validate(defs.optional, node2, "optional", optional);
		return node2;
	}

	function classProperty(key, value = null, typeAnnotation2 = null, decorators = null, computed = false, _static = false) {
		const node2 = {
			type: "ClassProperty",
			key,
			value,
			typeAnnotation: typeAnnotation2,
			decorators,
			computed,
			static: _static
		};
		const defs = NODE_FIELDS.ClassProperty;
		validate(defs.key, node2, "key", key, 1);
		validate(defs.value, node2, "value", value, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		validate(defs.decorators, node2, "decorators", decorators, 1);
		validate(defs.computed, node2, "computed", computed);
		validate(defs.static, node2, "static", _static);
		return node2;
	}

	function classAccessorProperty(key, value = null, typeAnnotation2 = null, decorators = null, computed = false, _static = false) {
		const node2 = {
			type: "ClassAccessorProperty",
			key,
			value,
			typeAnnotation: typeAnnotation2,
			decorators,
			computed,
			static: _static
		};
		const defs = NODE_FIELDS.ClassAccessorProperty;
		validate(defs.key, node2, "key", key, 1);
		validate(defs.value, node2, "value", value, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		validate(defs.decorators, node2, "decorators", decorators, 1);
		validate(defs.computed, node2, "computed", computed);
		validate(defs.static, node2, "static", _static);
		return node2;
	}

	function classPrivateProperty(key, value = null, decorators = null, _static = false) {
		const node2 = {
			type: "ClassPrivateProperty",
			key,
			value,
			decorators,
			static: _static
		};
		const defs = NODE_FIELDS.ClassPrivateProperty;
		validate(defs.key, node2, "key", key, 1);
		validate(defs.value, node2, "value", value, 1);
		validate(defs.decorators, node2, "decorators", decorators, 1);
		validate(defs.static, node2, "static", _static);
		return node2;
	}

	function classPrivateMethod(kind = "method", key, params, body, _static = false) {
		const node2 = {
			type: "ClassPrivateMethod",
			kind,
			key,
			params,
			body,
			static: _static
		};
		const defs = NODE_FIELDS.ClassPrivateMethod;
		validate(defs.kind, node2, "kind", kind);
		validate(defs.key, node2, "key", key, 1);
		validate(defs.params, node2, "params", params, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.static, node2, "static", _static);
		return node2;
	}

	function privateName(id) {
		const node2 = {
			type: "PrivateName",
			id
		};
		const defs = NODE_FIELDS.PrivateName;
		validate(defs.id, node2, "id", id, 1);
		return node2;
	}

	function staticBlock(body) {
		const node2 = {
			type: "StaticBlock",
			body
		};
		const defs = NODE_FIELDS.StaticBlock;
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function anyTypeAnnotation() {
		return {
			type: "AnyTypeAnnotation"
		};
	}

	function arrayTypeAnnotation(elementType) {
		const node2 = {
			type: "ArrayTypeAnnotation",
			elementType
		};
		const defs = NODE_FIELDS.ArrayTypeAnnotation;
		validate(defs.elementType, node2, "elementType", elementType, 1);
		return node2;
	}

	function booleanTypeAnnotation() {
		return {
			type: "BooleanTypeAnnotation"
		};
	}

	function booleanLiteralTypeAnnotation(value) {
		const node2 = {
			type: "BooleanLiteralTypeAnnotation",
			value
		};
		const defs = NODE_FIELDS.BooleanLiteralTypeAnnotation;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function nullLiteralTypeAnnotation() {
		return {
			type: "NullLiteralTypeAnnotation"
		};
	}

	function classImplements(id, typeParameters = null) {
		const node2 = {
			type: "ClassImplements",
			id,
			typeParameters
		};
		const defs = NODE_FIELDS.ClassImplements;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		return node2;
	}

	function declareClass(id, typeParameters = null, _extends = null, body) {
		const node2 = {
			type: "DeclareClass",
			id,
			typeParameters,
			extends: _extends,
			body
		};
		const defs = NODE_FIELDS.DeclareClass;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.extends, node2, "extends", _extends, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function declareFunction(id) {
		const node2 = {
			type: "DeclareFunction",
			id
		};
		const defs = NODE_FIELDS.DeclareFunction;
		validate(defs.id, node2, "id", id, 1);
		return node2;
	}

	function declareInterface(id, typeParameters = null, _extends = null, body) {
		const node2 = {
			type: "DeclareInterface",
			id,
			typeParameters,
			extends: _extends,
			body
		};
		const defs = NODE_FIELDS.DeclareInterface;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.extends, node2, "extends", _extends, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function declareModule(id, body, kind = null) {
		const node2 = {
			type: "DeclareModule",
			id,
			body,
			kind
		};
		const defs = NODE_FIELDS.DeclareModule;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.body, node2, "body", body, 1);
		validate(defs.kind, node2, "kind", kind);
		return node2;
	}

	function declareModuleExports(typeAnnotation2) {
		const node2 = {
			type: "DeclareModuleExports",
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.DeclareModuleExports;
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function declareTypeAlias(id, typeParameters = null, right) {
		const node2 = {
			type: "DeclareTypeAlias",
			id,
			typeParameters,
			right
		};
		const defs = NODE_FIELDS.DeclareTypeAlias;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.right, node2, "right", right, 1);
		return node2;
	}

	function declareOpaqueType(id, typeParameters = null, supertype = null) {
		const node2 = {
			type: "DeclareOpaqueType",
			id,
			typeParameters,
			supertype
		};
		const defs = NODE_FIELDS.DeclareOpaqueType;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.supertype, node2, "supertype", supertype, 1);
		return node2;
	}

	function declareVariable(id) {
		const node2 = {
			type: "DeclareVariable",
			id
		};
		const defs = NODE_FIELDS.DeclareVariable;
		validate(defs.id, node2, "id", id, 1);
		return node2;
	}

	function declareExportDeclaration(declaration = null, specifiers = null, source = null, attributes = null) {
		const node2 = {
			type: "DeclareExportDeclaration",
			declaration,
			specifiers,
			source,
			attributes
		};
		const defs = NODE_FIELDS.DeclareExportDeclaration;
		validate(defs.declaration, node2, "declaration", declaration, 1);
		validate(defs.specifiers, node2, "specifiers", specifiers, 1);
		validate(defs.source, node2, "source", source, 1);
		validate(defs.attributes, node2, "attributes", attributes, 1);
		return node2;
	}

	function declareExportAllDeclaration(source, attributes = null) {
		const node2 = {
			type: "DeclareExportAllDeclaration",
			source,
			attributes
		};
		const defs = NODE_FIELDS.DeclareExportAllDeclaration;
		validate(defs.source, node2, "source", source, 1);
		validate(defs.attributes, node2, "attributes", attributes, 1);
		return node2;
	}

	function declaredPredicate(value) {
		const node2 = {
			type: "DeclaredPredicate",
			value
		};
		const defs = NODE_FIELDS.DeclaredPredicate;
		validate(defs.value, node2, "value", value, 1);
		return node2;
	}

	function existsTypeAnnotation() {
		return {
			type: "ExistsTypeAnnotation"
		};
	}

	function functionTypeAnnotation(typeParameters = null, params, rest = null, returnType) {
		const node2 = {
			type: "FunctionTypeAnnotation",
			typeParameters,
			params,
			rest,
			returnType
		};
		const defs = NODE_FIELDS.FunctionTypeAnnotation;
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.params, node2, "params", params, 1);
		validate(defs.rest, node2, "rest", rest, 1);
		validate(defs.returnType, node2, "returnType", returnType, 1);
		return node2;
	}

	function functionTypeParam(name = null, typeAnnotation2) {
		const node2 = {
			type: "FunctionTypeParam",
			name,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.FunctionTypeParam;
		validate(defs.name, node2, "name", name, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function genericTypeAnnotation(id, typeParameters = null) {
		const node2 = {
			type: "GenericTypeAnnotation",
			id,
			typeParameters
		};
		const defs = NODE_FIELDS.GenericTypeAnnotation;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		return node2;
	}

	function inferredPredicate() {
		return {
			type: "InferredPredicate"
		};
	}

	function interfaceExtends(id, typeParameters = null) {
		const node2 = {
			type: "InterfaceExtends",
			id,
			typeParameters
		};
		const defs = NODE_FIELDS.InterfaceExtends;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		return node2;
	}

	function interfaceDeclaration(id, typeParameters = null, _extends = null, body) {
		const node2 = {
			type: "InterfaceDeclaration",
			id,
			typeParameters,
			extends: _extends,
			body
		};
		const defs = NODE_FIELDS.InterfaceDeclaration;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.extends, node2, "extends", _extends, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function interfaceTypeAnnotation(_extends = null, body) {
		const node2 = {
			type: "InterfaceTypeAnnotation",
			extends: _extends,
			body
		};
		const defs = NODE_FIELDS.InterfaceTypeAnnotation;
		validate(defs.extends, node2, "extends", _extends, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function intersectionTypeAnnotation(types2) {
		const node2 = {
			type: "IntersectionTypeAnnotation",
			types: types2
		};
		const defs = NODE_FIELDS.IntersectionTypeAnnotation;
		validate(defs.types, node2, "types", types2, 1);
		return node2;
	}

	function mixedTypeAnnotation() {
		return {
			type: "MixedTypeAnnotation"
		};
	}

	function emptyTypeAnnotation() {
		return {
			type: "EmptyTypeAnnotation"
		};
	}

	function nullableTypeAnnotation(typeAnnotation2) {
		const node2 = {
			type: "NullableTypeAnnotation",
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.NullableTypeAnnotation;
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function numberLiteralTypeAnnotation(value) {
		const node2 = {
			type: "NumberLiteralTypeAnnotation",
			value
		};
		const defs = NODE_FIELDS.NumberLiteralTypeAnnotation;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function numberTypeAnnotation() {
		return {
			type: "NumberTypeAnnotation"
		};
	}

	function objectTypeAnnotation(properties, indexers = [], callProperties = [], internalSlots = [], exact = false) {
		const node2 = {
			type: "ObjectTypeAnnotation",
			properties,
			indexers,
			callProperties,
			internalSlots,
			exact
		};
		const defs = NODE_FIELDS.ObjectTypeAnnotation;
		validate(defs.properties, node2, "properties", properties, 1);
		validate(defs.indexers, node2, "indexers", indexers, 1);
		validate(defs.callProperties, node2, "callProperties", callProperties, 1);
		validate(defs.internalSlots, node2, "internalSlots", internalSlots, 1);
		validate(defs.exact, node2, "exact", exact);
		return node2;
	}

	function objectTypeInternalSlot(id, value, optional, _static, method) {
		const node2 = {
			type: "ObjectTypeInternalSlot",
			id,
			value,
			optional,
			static: _static,
			method
		};
		const defs = NODE_FIELDS.ObjectTypeInternalSlot;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.value, node2, "value", value, 1);
		validate(defs.optional, node2, "optional", optional);
		validate(defs.static, node2, "static", _static);
		validate(defs.method, node2, "method", method);
		return node2;
	}

	function objectTypeCallProperty(value) {
		const node2 = {
			type: "ObjectTypeCallProperty",
			value,
			static: null
		};
		const defs = NODE_FIELDS.ObjectTypeCallProperty;
		validate(defs.value, node2, "value", value, 1);
		return node2;
	}

	function objectTypeIndexer(id = null, key, value, variance2 = null) {
		const node2 = {
			type: "ObjectTypeIndexer",
			id,
			key,
			value,
			variance: variance2,
			static: null
		};
		const defs = NODE_FIELDS.ObjectTypeIndexer;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.key, node2, "key", key, 1);
		validate(defs.value, node2, "value", value, 1);
		validate(defs.variance, node2, "variance", variance2, 1);
		return node2;
	}

	function objectTypeProperty(key, value, variance2 = null) {
		const node2 = {
			type: "ObjectTypeProperty",
			key,
			value,
			variance: variance2,
			kind: null,
			method: null,
			optional: null,
			proto: null,
			static: null
		};
		const defs = NODE_FIELDS.ObjectTypeProperty;
		validate(defs.key, node2, "key", key, 1);
		validate(defs.value, node2, "value", value, 1);
		validate(defs.variance, node2, "variance", variance2, 1);
		return node2;
	}

	function objectTypeSpreadProperty(argument) {
		const node2 = {
			type: "ObjectTypeSpreadProperty",
			argument
		};
		const defs = NODE_FIELDS.ObjectTypeSpreadProperty;
		validate(defs.argument, node2, "argument", argument, 1);
		return node2;
	}

	function opaqueType(id, typeParameters = null, supertype = null, impltype) {
		const node2 = {
			type: "OpaqueType",
			id,
			typeParameters,
			supertype,
			impltype
		};
		const defs = NODE_FIELDS.OpaqueType;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.supertype, node2, "supertype", supertype, 1);
		validate(defs.impltype, node2, "impltype", impltype, 1);
		return node2;
	}

	function qualifiedTypeIdentifier(id, qualification) {
		const node2 = {
			type: "QualifiedTypeIdentifier",
			id,
			qualification
		};
		const defs = NODE_FIELDS.QualifiedTypeIdentifier;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.qualification, node2, "qualification", qualification, 1);
		return node2;
	}

	function stringLiteralTypeAnnotation(value) {
		const node2 = {
			type: "StringLiteralTypeAnnotation",
			value
		};
		const defs = NODE_FIELDS.StringLiteralTypeAnnotation;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function stringTypeAnnotation() {
		return {
			type: "StringTypeAnnotation"
		};
	}

	function symbolTypeAnnotation() {
		return {
			type: "SymbolTypeAnnotation"
		};
	}

	function thisTypeAnnotation() {
		return {
			type: "ThisTypeAnnotation"
		};
	}

	function tupleTypeAnnotation(types2) {
		const node2 = {
			type: "TupleTypeAnnotation",
			types: types2
		};
		const defs = NODE_FIELDS.TupleTypeAnnotation;
		validate(defs.types, node2, "types", types2, 1);
		return node2;
	}

	function typeofTypeAnnotation(argument) {
		const node2 = {
			type: "TypeofTypeAnnotation",
			argument
		};
		const defs = NODE_FIELDS.TypeofTypeAnnotation;
		validate(defs.argument, node2, "argument", argument, 1);
		return node2;
	}

	function typeAlias(id, typeParameters = null, right) {
		const node2 = {
			type: "TypeAlias",
			id,
			typeParameters,
			right
		};
		const defs = NODE_FIELDS.TypeAlias;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.right, node2, "right", right, 1);
		return node2;
	}

	function typeAnnotation(typeAnnotation2) {
		const node2 = {
			type: "TypeAnnotation",
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TypeAnnotation;
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function typeCastExpression(expression, typeAnnotation2) {
		const node2 = {
			type: "TypeCastExpression",
			expression,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TypeCastExpression;
		validate(defs.expression, node2, "expression", expression, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function typeParameter(bound = null, _default2 = null, variance2 = null) {
		const node2 = {
			type: "TypeParameter",
			bound,
			default: _default2,
			variance: variance2,
			name: null
		};
		const defs = NODE_FIELDS.TypeParameter;
		validate(defs.bound, node2, "bound", bound, 1);
		validate(defs.default, node2, "default", _default2, 1);
		validate(defs.variance, node2, "variance", variance2, 1);
		return node2;
	}

	function typeParameterDeclaration(params) {
		const node2 = {
			type: "TypeParameterDeclaration",
			params
		};
		const defs = NODE_FIELDS.TypeParameterDeclaration;
		validate(defs.params, node2, "params", params, 1);
		return node2;
	}

	function typeParameterInstantiation(params) {
		const node2 = {
			type: "TypeParameterInstantiation",
			params
		};
		const defs = NODE_FIELDS.TypeParameterInstantiation;
		validate(defs.params, node2, "params", params, 1);
		return node2;
	}

	function unionTypeAnnotation(types2) {
		const node2 = {
			type: "UnionTypeAnnotation",
			types: types2
		};
		const defs = NODE_FIELDS.UnionTypeAnnotation;
		validate(defs.types, node2, "types", types2, 1);
		return node2;
	}

	function variance(kind) {
		const node2 = {
			type: "Variance",
			kind
		};
		const defs = NODE_FIELDS.Variance;
		validate(defs.kind, node2, "kind", kind);
		return node2;
	}

	function voidTypeAnnotation() {
		return {
			type: "VoidTypeAnnotation"
		};
	}

	function enumDeclaration(id, body) {
		const node2 = {
			type: "EnumDeclaration",
			id,
			body
		};
		const defs = NODE_FIELDS.EnumDeclaration;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function enumBooleanBody(members) {
		const node2 = {
			type: "EnumBooleanBody",
			members,
			explicitType: null,
			hasUnknownMembers: null
		};
		const defs = NODE_FIELDS.EnumBooleanBody;
		validate(defs.members, node2, "members", members, 1);
		return node2;
	}

	function enumNumberBody(members) {
		const node2 = {
			type: "EnumNumberBody",
			members,
			explicitType: null,
			hasUnknownMembers: null
		};
		const defs = NODE_FIELDS.EnumNumberBody;
		validate(defs.members, node2, "members", members, 1);
		return node2;
	}

	function enumStringBody(members) {
		const node2 = {
			type: "EnumStringBody",
			members,
			explicitType: null,
			hasUnknownMembers: null
		};
		const defs = NODE_FIELDS.EnumStringBody;
		validate(defs.members, node2, "members", members, 1);
		return node2;
	}

	function enumSymbolBody(members) {
		const node2 = {
			type: "EnumSymbolBody",
			members,
			hasUnknownMembers: null
		};
		const defs = NODE_FIELDS.EnumSymbolBody;
		validate(defs.members, node2, "members", members, 1);
		return node2;
	}

	function enumBooleanMember(id) {
		const node2 = {
			type: "EnumBooleanMember",
			id,
			init: null
		};
		const defs = NODE_FIELDS.EnumBooleanMember;
		validate(defs.id, node2, "id", id, 1);
		return node2;
	}

	function enumNumberMember(id, init) {
		const node2 = {
			type: "EnumNumberMember",
			id,
			init
		};
		const defs = NODE_FIELDS.EnumNumberMember;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.init, node2, "init", init, 1);
		return node2;
	}

	function enumStringMember(id, init) {
		const node2 = {
			type: "EnumStringMember",
			id,
			init
		};
		const defs = NODE_FIELDS.EnumStringMember;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.init, node2, "init", init, 1);
		return node2;
	}

	function enumDefaultedMember(id) {
		const node2 = {
			type: "EnumDefaultedMember",
			id
		};
		const defs = NODE_FIELDS.EnumDefaultedMember;
		validate(defs.id, node2, "id", id, 1);
		return node2;
	}

	function indexedAccessType(objectType, indexType) {
		const node2 = {
			type: "IndexedAccessType",
			objectType,
			indexType
		};
		const defs = NODE_FIELDS.IndexedAccessType;
		validate(defs.objectType, node2, "objectType", objectType, 1);
		validate(defs.indexType, node2, "indexType", indexType, 1);
		return node2;
	}

	function optionalIndexedAccessType(objectType, indexType) {
		const node2 = {
			type: "OptionalIndexedAccessType",
			objectType,
			indexType,
			optional: null
		};
		const defs = NODE_FIELDS.OptionalIndexedAccessType;
		validate(defs.objectType, node2, "objectType", objectType, 1);
		validate(defs.indexType, node2, "indexType", indexType, 1);
		return node2;
	}

	function jsxAttribute(name, value = null) {
		const node2 = {
			type: "JSXAttribute",
			name,
			value
		};
		const defs = NODE_FIELDS.JSXAttribute;
		validate(defs.name, node2, "name", name, 1);
		validate(defs.value, node2, "value", value, 1);
		return node2;
	}

	function jsxClosingElement(name) {
		const node2 = {
			type: "JSXClosingElement",
			name
		};
		const defs = NODE_FIELDS.JSXClosingElement;
		validate(defs.name, node2, "name", name, 1);
		return node2;
	}

	function jsxElement(openingElement, closingElement = null, children, selfClosing = null) {
		const node2 = {
			type: "JSXElement",
			openingElement,
			closingElement,
			children,
			selfClosing
		};
		const defs = NODE_FIELDS.JSXElement;
		validate(defs.openingElement, node2, "openingElement", openingElement, 1);
		validate(defs.closingElement, node2, "closingElement", closingElement, 1);
		validate(defs.children, node2, "children", children, 1);
		validate(defs.selfClosing, node2, "selfClosing", selfClosing);
		return node2;
	}

	function jsxEmptyExpression() {
		return {
			type: "JSXEmptyExpression"
		};
	}

	function jsxExpressionContainer(expression) {
		const node2 = {
			type: "JSXExpressionContainer",
			expression
		};
		const defs = NODE_FIELDS.JSXExpressionContainer;
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function jsxSpreadChild(expression) {
		const node2 = {
			type: "JSXSpreadChild",
			expression
		};
		const defs = NODE_FIELDS.JSXSpreadChild;
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function jsxIdentifier(name) {
		const node2 = {
			type: "JSXIdentifier",
			name
		};
		const defs = NODE_FIELDS.JSXIdentifier;
		validate(defs.name, node2, "name", name);
		return node2;
	}

	function jsxMemberExpression(object2, property) {
		const node2 = {
			type: "JSXMemberExpression",
			object: object2,
			property
		};
		const defs = NODE_FIELDS.JSXMemberExpression;
		validate(defs.object, node2, "object", object2, 1);
		validate(defs.property, node2, "property", property, 1);
		return node2;
	}

	function jsxNamespacedName(namespace, name) {
		const node2 = {
			type: "JSXNamespacedName",
			namespace,
			name
		};
		const defs = NODE_FIELDS.JSXNamespacedName;
		validate(defs.namespace, node2, "namespace", namespace, 1);
		validate(defs.name, node2, "name", name, 1);
		return node2;
	}

	function jsxOpeningElement(name, attributes, selfClosing = false) {
		const node2 = {
			type: "JSXOpeningElement",
			name,
			attributes,
			selfClosing
		};
		const defs = NODE_FIELDS.JSXOpeningElement;
		validate(defs.name, node2, "name", name, 1);
		validate(defs.attributes, node2, "attributes", attributes, 1);
		validate(defs.selfClosing, node2, "selfClosing", selfClosing);
		return node2;
	}

	function jsxSpreadAttribute(argument) {
		const node2 = {
			type: "JSXSpreadAttribute",
			argument
		};
		const defs = NODE_FIELDS.JSXSpreadAttribute;
		validate(defs.argument, node2, "argument", argument, 1);
		return node2;
	}

	function jsxText(value) {
		const node2 = {
			type: "JSXText",
			value
		};
		const defs = NODE_FIELDS.JSXText;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function jsxFragment(openingFragment, closingFragment, children) {
		const node2 = {
			type: "JSXFragment",
			openingFragment,
			closingFragment,
			children
		};
		const defs = NODE_FIELDS.JSXFragment;
		validate(defs.openingFragment, node2, "openingFragment", openingFragment, 1);
		validate(defs.closingFragment, node2, "closingFragment", closingFragment, 1);
		validate(defs.children, node2, "children", children, 1);
		return node2;
	}

	function jsxOpeningFragment() {
		return {
			type: "JSXOpeningFragment"
		};
	}

	function jsxClosingFragment() {
		return {
			type: "JSXClosingFragment"
		};
	}

	function noop() {
		return {
			type: "Noop"
		};
	}

	function placeholder(expectedNode, name) {
		const node2 = {
			type: "Placeholder",
			expectedNode,
			name
		};
		const defs = NODE_FIELDS.Placeholder;
		validate(defs.expectedNode, node2, "expectedNode", expectedNode);
		validate(defs.name, node2, "name", name, 1);
		return node2;
	}

	function v8IntrinsicIdentifier(name) {
		const node2 = {
			type: "V8IntrinsicIdentifier",
			name
		};
		const defs = NODE_FIELDS.V8IntrinsicIdentifier;
		validate(defs.name, node2, "name", name);
		return node2;
	}

	function argumentPlaceholder() {
		return {
			type: "ArgumentPlaceholder"
		};
	}

	function bindExpression(object2, callee) {
		const node2 = {
			type: "BindExpression",
			object: object2,
			callee
		};
		const defs = NODE_FIELDS.BindExpression;
		validate(defs.object, node2, "object", object2, 1);
		validate(defs.callee, node2, "callee", callee, 1);
		return node2;
	}

	function importAttribute(key, value) {
		const node2 = {
			type: "ImportAttribute",
			key,
			value
		};
		const defs = NODE_FIELDS.ImportAttribute;
		validate(defs.key, node2, "key", key, 1);
		validate(defs.value, node2, "value", value, 1);
		return node2;
	}

	function decorator(expression) {
		const node2 = {
			type: "Decorator",
			expression
		};
		const defs = NODE_FIELDS.Decorator;
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function doExpression(body, async = false) {
		const node2 = {
			type: "DoExpression",
			body,
			async
		};
		const defs = NODE_FIELDS.DoExpression;
		validate(defs.body, node2, "body", body, 1);
		validate(defs.async, node2, "async", async);
		return node2;
	}

	function exportDefaultSpecifier(exported) {
		const node2 = {
			type: "ExportDefaultSpecifier",
			exported
		};
		const defs = NODE_FIELDS.ExportDefaultSpecifier;
		validate(defs.exported, node2, "exported", exported, 1);
		return node2;
	}

	function recordExpression(properties) {
		const node2 = {
			type: "RecordExpression",
			properties
		};
		const defs = NODE_FIELDS.RecordExpression;
		validate(defs.properties, node2, "properties", properties, 1);
		return node2;
	}

	function tupleExpression(elements = []) {
		const node2 = {
			type: "TupleExpression",
			elements
		};
		const defs = NODE_FIELDS.TupleExpression;
		validate(defs.elements, node2, "elements", elements, 1);
		return node2;
	}

	function decimalLiteral(value) {
		const node2 = {
			type: "DecimalLiteral",
			value
		};
		const defs = NODE_FIELDS.DecimalLiteral;
		validate(defs.value, node2, "value", value);
		return node2;
	}

	function moduleExpression(body) {
		const node2 = {
			type: "ModuleExpression",
			body
		};
		const defs = NODE_FIELDS.ModuleExpression;
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function topicReference() {
		return {
			type: "TopicReference"
		};
	}

	function pipelineTopicExpression(expression) {
		const node2 = {
			type: "PipelineTopicExpression",
			expression
		};
		const defs = NODE_FIELDS.PipelineTopicExpression;
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function pipelineBareFunction(callee) {
		const node2 = {
			type: "PipelineBareFunction",
			callee
		};
		const defs = NODE_FIELDS.PipelineBareFunction;
		validate(defs.callee, node2, "callee", callee, 1);
		return node2;
	}

	function pipelinePrimaryTopicReference() {
		return {
			type: "PipelinePrimaryTopicReference"
		};
	}

	function tsParameterProperty(parameter) {
		const node2 = {
			type: "TSParameterProperty",
			parameter
		};
		const defs = NODE_FIELDS.TSParameterProperty;
		validate(defs.parameter, node2, "parameter", parameter, 1);
		return node2;
	}

	function tsDeclareFunction(id = null, typeParameters = null, params, returnType = null) {
		const node2 = {
			type: "TSDeclareFunction",
			id,
			typeParameters,
			params,
			returnType
		};
		const defs = NODE_FIELDS.TSDeclareFunction;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.params, node2, "params", params, 1);
		validate(defs.returnType, node2, "returnType", returnType, 1);
		return node2;
	}

	function tsDeclareMethod(decorators = null, key, typeParameters = null, params, returnType = null) {
		const node2 = {
			type: "TSDeclareMethod",
			decorators,
			key,
			typeParameters,
			params,
			returnType
		};
		const defs = NODE_FIELDS.TSDeclareMethod;
		validate(defs.decorators, node2, "decorators", decorators, 1);
		validate(defs.key, node2, "key", key, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.params, node2, "params", params, 1);
		validate(defs.returnType, node2, "returnType", returnType, 1);
		return node2;
	}

	function tsQualifiedName(left, right) {
		const node2 = {
			type: "TSQualifiedName",
			left,
			right
		};
		const defs = NODE_FIELDS.TSQualifiedName;
		validate(defs.left, node2, "left", left, 1);
		validate(defs.right, node2, "right", right, 1);
		return node2;
	}

	function tsCallSignatureDeclaration(typeParameters = null, parameters, typeAnnotation2 = null) {
		const node2 = {
			type: "TSCallSignatureDeclaration",
			typeParameters,
			parameters,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSCallSignatureDeclaration;
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.parameters, node2, "parameters", parameters, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsConstructSignatureDeclaration(typeParameters = null, parameters, typeAnnotation2 = null) {
		const node2 = {
			type: "TSConstructSignatureDeclaration",
			typeParameters,
			parameters,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSConstructSignatureDeclaration;
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.parameters, node2, "parameters", parameters, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsPropertySignature(key, typeAnnotation2 = null) {
		const node2 = {
			type: "TSPropertySignature",
			key,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSPropertySignature;
		validate(defs.key, node2, "key", key, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsMethodSignature(key, typeParameters = null, parameters, typeAnnotation2 = null) {
		const node2 = {
			type: "TSMethodSignature",
			key,
			typeParameters,
			parameters,
			typeAnnotation: typeAnnotation2,
			kind: null
		};
		const defs = NODE_FIELDS.TSMethodSignature;
		validate(defs.key, node2, "key", key, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.parameters, node2, "parameters", parameters, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsIndexSignature(parameters, typeAnnotation2 = null) {
		const node2 = {
			type: "TSIndexSignature",
			parameters,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSIndexSignature;
		validate(defs.parameters, node2, "parameters", parameters, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsAnyKeyword() {
		return {
			type: "TSAnyKeyword"
		};
	}

	function tsBooleanKeyword() {
		return {
			type: "TSBooleanKeyword"
		};
	}

	function tsBigIntKeyword() {
		return {
			type: "TSBigIntKeyword"
		};
	}

	function tsIntrinsicKeyword() {
		return {
			type: "TSIntrinsicKeyword"
		};
	}

	function tsNeverKeyword() {
		return {
			type: "TSNeverKeyword"
		};
	}

	function tsNullKeyword() {
		return {
			type: "TSNullKeyword"
		};
	}

	function tsNumberKeyword() {
		return {
			type: "TSNumberKeyword"
		};
	}

	function tsObjectKeyword() {
		return {
			type: "TSObjectKeyword"
		};
	}

	function tsStringKeyword() {
		return {
			type: "TSStringKeyword"
		};
	}

	function tsSymbolKeyword() {
		return {
			type: "TSSymbolKeyword"
		};
	}

	function tsUndefinedKeyword() {
		return {
			type: "TSUndefinedKeyword"
		};
	}

	function tsUnknownKeyword() {
		return {
			type: "TSUnknownKeyword"
		};
	}

	function tsVoidKeyword() {
		return {
			type: "TSVoidKeyword"
		};
	}

	function tsThisType() {
		return {
			type: "TSThisType"
		};
	}

	function tsFunctionType(typeParameters = null, parameters, typeAnnotation2 = null) {
		const node2 = {
			type: "TSFunctionType",
			typeParameters,
			parameters,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSFunctionType;
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.parameters, node2, "parameters", parameters, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsConstructorType(typeParameters = null, parameters, typeAnnotation2 = null) {
		const node2 = {
			type: "TSConstructorType",
			typeParameters,
			parameters,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSConstructorType;
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.parameters, node2, "parameters", parameters, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsTypeReference(typeName, typeParameters = null) {
		const node2 = {
			type: "TSTypeReference",
			typeName,
			typeParameters
		};
		const defs = NODE_FIELDS.TSTypeReference;
		validate(defs.typeName, node2, "typeName", typeName, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		return node2;
	}

	function tsTypePredicate(parameterName, typeAnnotation2 = null, asserts = null) {
		const node2 = {
			type: "TSTypePredicate",
			parameterName,
			typeAnnotation: typeAnnotation2,
			asserts
		};
		const defs = NODE_FIELDS.TSTypePredicate;
		validate(defs.parameterName, node2, "parameterName", parameterName, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		validate(defs.asserts, node2, "asserts", asserts);
		return node2;
	}

	function tsTypeQuery(exprName, typeParameters = null) {
		const node2 = {
			type: "TSTypeQuery",
			exprName,
			typeParameters
		};
		const defs = NODE_FIELDS.TSTypeQuery;
		validate(defs.exprName, node2, "exprName", exprName, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		return node2;
	}

	function tsTypeLiteral(members) {
		const node2 = {
			type: "TSTypeLiteral",
			members
		};
		const defs = NODE_FIELDS.TSTypeLiteral;
		validate(defs.members, node2, "members", members, 1);
		return node2;
	}

	function tsArrayType(elementType) {
		const node2 = {
			type: "TSArrayType",
			elementType
		};
		const defs = NODE_FIELDS.TSArrayType;
		validate(defs.elementType, node2, "elementType", elementType, 1);
		return node2;
	}

	function tsTupleType(elementTypes) {
		const node2 = {
			type: "TSTupleType",
			elementTypes
		};
		const defs = NODE_FIELDS.TSTupleType;
		validate(defs.elementTypes, node2, "elementTypes", elementTypes, 1);
		return node2;
	}

	function tsOptionalType(typeAnnotation2) {
		const node2 = {
			type: "TSOptionalType",
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSOptionalType;
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsRestType(typeAnnotation2) {
		const node2 = {
			type: "TSRestType",
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSRestType;
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsNamedTupleMember(label, elementType, optional = false) {
		const node2 = {
			type: "TSNamedTupleMember",
			label,
			elementType,
			optional
		};
		const defs = NODE_FIELDS.TSNamedTupleMember;
		validate(defs.label, node2, "label", label, 1);
		validate(defs.elementType, node2, "elementType", elementType, 1);
		validate(defs.optional, node2, "optional", optional);
		return node2;
	}

	function tsUnionType(types2) {
		const node2 = {
			type: "TSUnionType",
			types: types2
		};
		const defs = NODE_FIELDS.TSUnionType;
		validate(defs.types, node2, "types", types2, 1);
		return node2;
	}

	function tsIntersectionType(types2) {
		const node2 = {
			type: "TSIntersectionType",
			types: types2
		};
		const defs = NODE_FIELDS.TSIntersectionType;
		validate(defs.types, node2, "types", types2, 1);
		return node2;
	}

	function tsConditionalType(checkType, extendsType, trueType, falseType) {
		const node2 = {
			type: "TSConditionalType",
			checkType,
			extendsType,
			trueType,
			falseType
		};
		const defs = NODE_FIELDS.TSConditionalType;
		validate(defs.checkType, node2, "checkType", checkType, 1);
		validate(defs.extendsType, node2, "extendsType", extendsType, 1);
		validate(defs.trueType, node2, "trueType", trueType, 1);
		validate(defs.falseType, node2, "falseType", falseType, 1);
		return node2;
	}

	function tsInferType(typeParameter2) {
		const node2 = {
			type: "TSInferType",
			typeParameter: typeParameter2
		};
		const defs = NODE_FIELDS.TSInferType;
		validate(defs.typeParameter, node2, "typeParameter", typeParameter2, 1);
		return node2;
	}

	function tsParenthesizedType(typeAnnotation2) {
		const node2 = {
			type: "TSParenthesizedType",
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSParenthesizedType;
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsTypeOperator(typeAnnotation2) {
		const node2 = {
			type: "TSTypeOperator",
			typeAnnotation: typeAnnotation2,
			operator: null
		};
		const defs = NODE_FIELDS.TSTypeOperator;
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsIndexedAccessType(objectType, indexType) {
		const node2 = {
			type: "TSIndexedAccessType",
			objectType,
			indexType
		};
		const defs = NODE_FIELDS.TSIndexedAccessType;
		validate(defs.objectType, node2, "objectType", objectType, 1);
		validate(defs.indexType, node2, "indexType", indexType, 1);
		return node2;
	}

	function tsMappedType(typeParameter2, typeAnnotation2 = null, nameType = null) {
		const node2 = {
			type: "TSMappedType",
			typeParameter: typeParameter2,
			typeAnnotation: typeAnnotation2,
			nameType
		};
		const defs = NODE_FIELDS.TSMappedType;
		validate(defs.typeParameter, node2, "typeParameter", typeParameter2, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		validate(defs.nameType, node2, "nameType", nameType, 1);
		return node2;
	}

	function tsTemplateLiteralType(quasis, types2) {
		const node2 = {
			type: "TSTemplateLiteralType",
			quasis,
			types: types2
		};
		const defs = NODE_FIELDS.TSTemplateLiteralType;
		validate(defs.quasis, node2, "quasis", quasis, 1);
		validate(defs.types, node2, "types", types2, 1);
		return node2;
	}

	function tsLiteralType(literal) {
		const node2 = {
			type: "TSLiteralType",
			literal
		};
		const defs = NODE_FIELDS.TSLiteralType;
		validate(defs.literal, node2, "literal", literal, 1);
		return node2;
	}

	function tsExpressionWithTypeArguments(expression, typeParameters = null) {
		const node2 = {
			type: "TSExpressionWithTypeArguments",
			expression,
			typeParameters
		};
		const defs = NODE_FIELDS.TSExpressionWithTypeArguments;
		validate(defs.expression, node2, "expression", expression, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		return node2;
	}

	function tsInterfaceDeclaration(id, typeParameters = null, _extends = null, body) {
		const node2 = {
			type: "TSInterfaceDeclaration",
			id,
			typeParameters,
			extends: _extends,
			body
		};
		const defs = NODE_FIELDS.TSInterfaceDeclaration;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.extends, node2, "extends", _extends, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function tsInterfaceBody(body) {
		const node2 = {
			type: "TSInterfaceBody",
			body
		};
		const defs = NODE_FIELDS.TSInterfaceBody;
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function tsTypeAliasDeclaration(id, typeParameters = null, typeAnnotation2) {
		const node2 = {
			type: "TSTypeAliasDeclaration",
			id,
			typeParameters,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSTypeAliasDeclaration;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsInstantiationExpression(expression, typeParameters = null) {
		const node2 = {
			type: "TSInstantiationExpression",
			expression,
			typeParameters
		};
		const defs = NODE_FIELDS.TSInstantiationExpression;
		validate(defs.expression, node2, "expression", expression, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		return node2;
	}

	function tsAsExpression(expression, typeAnnotation2) {
		const node2 = {
			type: "TSAsExpression",
			expression,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSAsExpression;
		validate(defs.expression, node2, "expression", expression, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsSatisfiesExpression(expression, typeAnnotation2) {
		const node2 = {
			type: "TSSatisfiesExpression",
			expression,
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSSatisfiesExpression;
		validate(defs.expression, node2, "expression", expression, 1);
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsTypeAssertion(typeAnnotation2, expression) {
		const node2 = {
			type: "TSTypeAssertion",
			typeAnnotation: typeAnnotation2,
			expression
		};
		const defs = NODE_FIELDS.TSTypeAssertion;
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function tsEnumBody(members) {
		const node2 = {
			type: "TSEnumBody",
			members
		};
		const defs = NODE_FIELDS.TSEnumBody;
		validate(defs.members, node2, "members", members, 1);
		return node2;
	}

	function tsEnumDeclaration(id, members) {
		const node2 = {
			type: "TSEnumDeclaration",
			id,
			members
		};
		const defs = NODE_FIELDS.TSEnumDeclaration;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.members, node2, "members", members, 1);
		return node2;
	}

	function tsEnumMember(id, initializer = null) {
		const node2 = {
			type: "TSEnumMember",
			id,
			initializer
		};
		const defs = NODE_FIELDS.TSEnumMember;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.initializer, node2, "initializer", initializer, 1);
		return node2;
	}

	function tsModuleDeclaration(id, body) {
		const node2 = {
			type: "TSModuleDeclaration",
			id,
			body,
			kind: null
		};
		const defs = NODE_FIELDS.TSModuleDeclaration;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function tsModuleBlock(body) {
		const node2 = {
			type: "TSModuleBlock",
			body
		};
		const defs = NODE_FIELDS.TSModuleBlock;
		validate(defs.body, node2, "body", body, 1);
		return node2;
	}

	function tsImportType(argument, qualifier = null, typeParameters = null) {
		const node2 = {
			type: "TSImportType",
			argument,
			qualifier,
			typeParameters
		};
		const defs = NODE_FIELDS.TSImportType;
		validate(defs.argument, node2, "argument", argument, 1);
		validate(defs.qualifier, node2, "qualifier", qualifier, 1);
		validate(defs.typeParameters, node2, "typeParameters", typeParameters, 1);
		return node2;
	}

	function tsImportEqualsDeclaration(id, moduleReference) {
		const node2 = {
			type: "TSImportEqualsDeclaration",
			id,
			moduleReference,
			isExport: null
		};
		const defs = NODE_FIELDS.TSImportEqualsDeclaration;
		validate(defs.id, node2, "id", id, 1);
		validate(defs.moduleReference, node2, "moduleReference", moduleReference, 1);
		return node2;
	}

	function tsExternalModuleReference(expression) {
		const node2 = {
			type: "TSExternalModuleReference",
			expression
		};
		const defs = NODE_FIELDS.TSExternalModuleReference;
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function tsNonNullExpression(expression) {
		const node2 = {
			type: "TSNonNullExpression",
			expression
		};
		const defs = NODE_FIELDS.TSNonNullExpression;
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function tsExportAssignment(expression) {
		const node2 = {
			type: "TSExportAssignment",
			expression
		};
		const defs = NODE_FIELDS.TSExportAssignment;
		validate(defs.expression, node2, "expression", expression, 1);
		return node2;
	}

	function tsNamespaceExportDeclaration(id) {
		const node2 = {
			type: "TSNamespaceExportDeclaration",
			id
		};
		const defs = NODE_FIELDS.TSNamespaceExportDeclaration;
		validate(defs.id, node2, "id", id, 1);
		return node2;
	}

	function tsTypeAnnotation(typeAnnotation2) {
		const node2 = {
			type: "TSTypeAnnotation",
			typeAnnotation: typeAnnotation2
		};
		const defs = NODE_FIELDS.TSTypeAnnotation;
		validate(defs.typeAnnotation, node2, "typeAnnotation", typeAnnotation2, 1);
		return node2;
	}

	function tsTypeParameterInstantiation(params) {
		const node2 = {
			type: "TSTypeParameterInstantiation",
			params
		};
		const defs = NODE_FIELDS.TSTypeParameterInstantiation;
		validate(defs.params, node2, "params", params, 1);
		return node2;
	}

	function tsTypeParameterDeclaration(params) {
		const node2 = {
			type: "TSTypeParameterDeclaration",
			params
		};
		const defs = NODE_FIELDS.TSTypeParameterDeclaration;
		validate(defs.params, node2, "params", params, 1);
		return node2;
	}

	function tsTypeParameter(constraint = null, _default2 = null, name) {
		const node2 = {
			type: "TSTypeParameter",
			constraint,
			default: _default2,
			name
		};
		const defs = NODE_FIELDS.TSTypeParameter;
		validate(defs.constraint, node2, "constraint", constraint, 1);
		validate(defs.default, node2, "default", _default2, 1);
		validate(defs.name, node2, "name", name);
		return node2;
	}

	function NumberLiteral(value) {
		(0, _deprecationWarning$1.default)("NumberLiteral", "NumericLiteral", "The node type ");
		return numericLiteral(value);
	}

	function RegexLiteral(pattern, flags = "") {
		(0, _deprecationWarning$1.default)("RegexLiteral", "RegExpLiteral", "The node type ");
		return regExpLiteral(pattern, flags);
	}

	function RestProperty(argument) {
		(0, _deprecationWarning$1.default)("RestProperty", "RestElement", "The node type ");
		return restElement(argument);
	}

	function SpreadProperty(argument) {
		(0, _deprecationWarning$1.default)("SpreadProperty", "SpreadElement", "The node type ");
		return spreadElement(argument);
	}

	var uppercase = {};
	(function (exports3) {
		Object.defineProperty(exports3, "__esModule", {
			value: true
		});
		Object.defineProperty(exports3, "AnyTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.anyTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "ArgumentPlaceholder", {
			enumerable: true,
			get: function () {
				return _lowercase.argumentPlaceholder;
			}
		});
		Object.defineProperty(exports3, "ArrayExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.arrayExpression;
			}
		});
		Object.defineProperty(exports3, "ArrayPattern", {
			enumerable: true,
			get: function () {
				return _lowercase.arrayPattern;
			}
		});
		Object.defineProperty(exports3, "ArrayTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.arrayTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "ArrowFunctionExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.arrowFunctionExpression;
			}
		});
		Object.defineProperty(exports3, "AssignmentExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.assignmentExpression;
			}
		});
		Object.defineProperty(exports3, "AssignmentPattern", {
			enumerable: true,
			get: function () {
				return _lowercase.assignmentPattern;
			}
		});
		Object.defineProperty(exports3, "AwaitExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.awaitExpression;
			}
		});
		Object.defineProperty(exports3, "BigIntLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.bigIntLiteral;
			}
		});
		Object.defineProperty(exports3, "BinaryExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.binaryExpression;
			}
		});
		Object.defineProperty(exports3, "BindExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.bindExpression;
			}
		});
		Object.defineProperty(exports3, "BlockStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.blockStatement;
			}
		});
		Object.defineProperty(exports3, "BooleanLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.booleanLiteral;
			}
		});
		Object.defineProperty(exports3, "BooleanLiteralTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.booleanLiteralTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "BooleanTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.booleanTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "BreakStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.breakStatement;
			}
		});
		Object.defineProperty(exports3, "CallExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.callExpression;
			}
		});
		Object.defineProperty(exports3, "CatchClause", {
			enumerable: true,
			get: function () {
				return _lowercase.catchClause;
			}
		});
		Object.defineProperty(exports3, "ClassAccessorProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.classAccessorProperty;
			}
		});
		Object.defineProperty(exports3, "ClassBody", {
			enumerable: true,
			get: function () {
				return _lowercase.classBody;
			}
		});
		Object.defineProperty(exports3, "ClassDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.classDeclaration;
			}
		});
		Object.defineProperty(exports3, "ClassExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.classExpression;
			}
		});
		Object.defineProperty(exports3, "ClassImplements", {
			enumerable: true,
			get: function () {
				return _lowercase.classImplements;
			}
		});
		Object.defineProperty(exports3, "ClassMethod", {
			enumerable: true,
			get: function () {
				return _lowercase.classMethod;
			}
		});
		Object.defineProperty(exports3, "ClassPrivateMethod", {
			enumerable: true,
			get: function () {
				return _lowercase.classPrivateMethod;
			}
		});
		Object.defineProperty(exports3, "ClassPrivateProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.classPrivateProperty;
			}
		});
		Object.defineProperty(exports3, "ClassProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.classProperty;
			}
		});
		Object.defineProperty(exports3, "ConditionalExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.conditionalExpression;
			}
		});
		Object.defineProperty(exports3, "ContinueStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.continueStatement;
			}
		});
		Object.defineProperty(exports3, "DebuggerStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.debuggerStatement;
			}
		});
		Object.defineProperty(exports3, "DecimalLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.decimalLiteral;
			}
		});
		Object.defineProperty(exports3, "DeclareClass", {
			enumerable: true,
			get: function () {
				return _lowercase.declareClass;
			}
		});
		Object.defineProperty(exports3, "DeclareExportAllDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.declareExportAllDeclaration;
			}
		});
		Object.defineProperty(exports3, "DeclareExportDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.declareExportDeclaration;
			}
		});
		Object.defineProperty(exports3, "DeclareFunction", {
			enumerable: true,
			get: function () {
				return _lowercase.declareFunction;
			}
		});
		Object.defineProperty(exports3, "DeclareInterface", {
			enumerable: true,
			get: function () {
				return _lowercase.declareInterface;
			}
		});
		Object.defineProperty(exports3, "DeclareModule", {
			enumerable: true,
			get: function () {
				return _lowercase.declareModule;
			}
		});
		Object.defineProperty(exports3, "DeclareModuleExports", {
			enumerable: true,
			get: function () {
				return _lowercase.declareModuleExports;
			}
		});
		Object.defineProperty(exports3, "DeclareOpaqueType", {
			enumerable: true,
			get: function () {
				return _lowercase.declareOpaqueType;
			}
		});
		Object.defineProperty(exports3, "DeclareTypeAlias", {
			enumerable: true,
			get: function () {
				return _lowercase.declareTypeAlias;
			}
		});
		Object.defineProperty(exports3, "DeclareVariable", {
			enumerable: true,
			get: function () {
				return _lowercase.declareVariable;
			}
		});
		Object.defineProperty(exports3, "DeclaredPredicate", {
			enumerable: true,
			get: function () {
				return _lowercase.declaredPredicate;
			}
		});
		Object.defineProperty(exports3, "Decorator", {
			enumerable: true,
			get: function () {
				return _lowercase.decorator;
			}
		});
		Object.defineProperty(exports3, "Directive", {
			enumerable: true,
			get: function () {
				return _lowercase.directive;
			}
		});
		Object.defineProperty(exports3, "DirectiveLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.directiveLiteral;
			}
		});
		Object.defineProperty(exports3, "DoExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.doExpression;
			}
		});
		Object.defineProperty(exports3, "DoWhileStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.doWhileStatement;
			}
		});
		Object.defineProperty(exports3, "EmptyStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.emptyStatement;
			}
		});
		Object.defineProperty(exports3, "EmptyTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.emptyTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "EnumBooleanBody", {
			enumerable: true,
			get: function () {
				return _lowercase.enumBooleanBody;
			}
		});
		Object.defineProperty(exports3, "EnumBooleanMember", {
			enumerable: true,
			get: function () {
				return _lowercase.enumBooleanMember;
			}
		});
		Object.defineProperty(exports3, "EnumDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.enumDeclaration;
			}
		});
		Object.defineProperty(exports3, "EnumDefaultedMember", {
			enumerable: true,
			get: function () {
				return _lowercase.enumDefaultedMember;
			}
		});
		Object.defineProperty(exports3, "EnumNumberBody", {
			enumerable: true,
			get: function () {
				return _lowercase.enumNumberBody;
			}
		});
		Object.defineProperty(exports3, "EnumNumberMember", {
			enumerable: true,
			get: function () {
				return _lowercase.enumNumberMember;
			}
		});
		Object.defineProperty(exports3, "EnumStringBody", {
			enumerable: true,
			get: function () {
				return _lowercase.enumStringBody;
			}
		});
		Object.defineProperty(exports3, "EnumStringMember", {
			enumerable: true,
			get: function () {
				return _lowercase.enumStringMember;
			}
		});
		Object.defineProperty(exports3, "EnumSymbolBody", {
			enumerable: true,
			get: function () {
				return _lowercase.enumSymbolBody;
			}
		});
		Object.defineProperty(exports3, "ExistsTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.existsTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "ExportAllDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.exportAllDeclaration;
			}
		});
		Object.defineProperty(exports3, "ExportDefaultDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.exportDefaultDeclaration;
			}
		});
		Object.defineProperty(exports3, "ExportDefaultSpecifier", {
			enumerable: true,
			get: function () {
				return _lowercase.exportDefaultSpecifier;
			}
		});
		Object.defineProperty(exports3, "ExportNamedDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.exportNamedDeclaration;
			}
		});
		Object.defineProperty(exports3, "ExportNamespaceSpecifier", {
			enumerable: true,
			get: function () {
				return _lowercase.exportNamespaceSpecifier;
			}
		});
		Object.defineProperty(exports3, "ExportSpecifier", {
			enumerable: true,
			get: function () {
				return _lowercase.exportSpecifier;
			}
		});
		Object.defineProperty(exports3, "ExpressionStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.expressionStatement;
			}
		});
		Object.defineProperty(exports3, "File", {
			enumerable: true,
			get: function () {
				return _lowercase.file;
			}
		});
		Object.defineProperty(exports3, "ForInStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.forInStatement;
			}
		});
		Object.defineProperty(exports3, "ForOfStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.forOfStatement;
			}
		});
		Object.defineProperty(exports3, "ForStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.forStatement;
			}
		});
		Object.defineProperty(exports3, "FunctionDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.functionDeclaration;
			}
		});
		Object.defineProperty(exports3, "FunctionExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.functionExpression;
			}
		});
		Object.defineProperty(exports3, "FunctionTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.functionTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "FunctionTypeParam", {
			enumerable: true,
			get: function () {
				return _lowercase.functionTypeParam;
			}
		});
		Object.defineProperty(exports3, "GenericTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.genericTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "Identifier", {
			enumerable: true,
			get: function () {
				return _lowercase.identifier;
			}
		});
		Object.defineProperty(exports3, "IfStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.ifStatement;
			}
		});
		Object.defineProperty(exports3, "Import", {
			enumerable: true,
			get: function () {
				return _lowercase.import;
			}
		});
		Object.defineProperty(exports3, "ImportAttribute", {
			enumerable: true,
			get: function () {
				return _lowercase.importAttribute;
			}
		});
		Object.defineProperty(exports3, "ImportDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.importDeclaration;
			}
		});
		Object.defineProperty(exports3, "ImportDefaultSpecifier", {
			enumerable: true,
			get: function () {
				return _lowercase.importDefaultSpecifier;
			}
		});
		Object.defineProperty(exports3, "ImportExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.importExpression;
			}
		});
		Object.defineProperty(exports3, "ImportNamespaceSpecifier", {
			enumerable: true,
			get: function () {
				return _lowercase.importNamespaceSpecifier;
			}
		});
		Object.defineProperty(exports3, "ImportSpecifier", {
			enumerable: true,
			get: function () {
				return _lowercase.importSpecifier;
			}
		});
		Object.defineProperty(exports3, "IndexedAccessType", {
			enumerable: true,
			get: function () {
				return _lowercase.indexedAccessType;
			}
		});
		Object.defineProperty(exports3, "InferredPredicate", {
			enumerable: true,
			get: function () {
				return _lowercase.inferredPredicate;
			}
		});
		Object.defineProperty(exports3, "InterfaceDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.interfaceDeclaration;
			}
		});
		Object.defineProperty(exports3, "InterfaceExtends", {
			enumerable: true,
			get: function () {
				return _lowercase.interfaceExtends;
			}
		});
		Object.defineProperty(exports3, "InterfaceTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.interfaceTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "InterpreterDirective", {
			enumerable: true,
			get: function () {
				return _lowercase.interpreterDirective;
			}
		});
		Object.defineProperty(exports3, "IntersectionTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.intersectionTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "JSXAttribute", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxAttribute;
			}
		});
		Object.defineProperty(exports3, "JSXClosingElement", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxClosingElement;
			}
		});
		Object.defineProperty(exports3, "JSXClosingFragment", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxClosingFragment;
			}
		});
		Object.defineProperty(exports3, "JSXElement", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxElement;
			}
		});
		Object.defineProperty(exports3, "JSXEmptyExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxEmptyExpression;
			}
		});
		Object.defineProperty(exports3, "JSXExpressionContainer", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxExpressionContainer;
			}
		});
		Object.defineProperty(exports3, "JSXFragment", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxFragment;
			}
		});
		Object.defineProperty(exports3, "JSXIdentifier", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxIdentifier;
			}
		});
		Object.defineProperty(exports3, "JSXMemberExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxMemberExpression;
			}
		});
		Object.defineProperty(exports3, "JSXNamespacedName", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxNamespacedName;
			}
		});
		Object.defineProperty(exports3, "JSXOpeningElement", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxOpeningElement;
			}
		});
		Object.defineProperty(exports3, "JSXOpeningFragment", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxOpeningFragment;
			}
		});
		Object.defineProperty(exports3, "JSXSpreadAttribute", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxSpreadAttribute;
			}
		});
		Object.defineProperty(exports3, "JSXSpreadChild", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxSpreadChild;
			}
		});
		Object.defineProperty(exports3, "JSXText", {
			enumerable: true,
			get: function () {
				return _lowercase.jsxText;
			}
		});
		Object.defineProperty(exports3, "LabeledStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.labeledStatement;
			}
		});
		Object.defineProperty(exports3, "LogicalExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.logicalExpression;
			}
		});
		Object.defineProperty(exports3, "MemberExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.memberExpression;
			}
		});
		Object.defineProperty(exports3, "MetaProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.metaProperty;
			}
		});
		Object.defineProperty(exports3, "MixedTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.mixedTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "ModuleExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.moduleExpression;
			}
		});
		Object.defineProperty(exports3, "NewExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.newExpression;
			}
		});
		Object.defineProperty(exports3, "Noop", {
			enumerable: true,
			get: function () {
				return _lowercase.noop;
			}
		});
		Object.defineProperty(exports3, "NullLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.nullLiteral;
			}
		});
		Object.defineProperty(exports3, "NullLiteralTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.nullLiteralTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "NullableTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.nullableTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "NumberLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.numberLiteral;
			}
		});
		Object.defineProperty(exports3, "NumberLiteralTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.numberLiteralTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "NumberTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.numberTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "NumericLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.numericLiteral;
			}
		});
		Object.defineProperty(exports3, "ObjectExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.objectExpression;
			}
		});
		Object.defineProperty(exports3, "ObjectMethod", {
			enumerable: true,
			get: function () {
				return _lowercase.objectMethod;
			}
		});
		Object.defineProperty(exports3, "ObjectPattern", {
			enumerable: true,
			get: function () {
				return _lowercase.objectPattern;
			}
		});
		Object.defineProperty(exports3, "ObjectProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.objectProperty;
			}
		});
		Object.defineProperty(exports3, "ObjectTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.objectTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "ObjectTypeCallProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.objectTypeCallProperty;
			}
		});
		Object.defineProperty(exports3, "ObjectTypeIndexer", {
			enumerable: true,
			get: function () {
				return _lowercase.objectTypeIndexer;
			}
		});
		Object.defineProperty(exports3, "ObjectTypeInternalSlot", {
			enumerable: true,
			get: function () {
				return _lowercase.objectTypeInternalSlot;
			}
		});
		Object.defineProperty(exports3, "ObjectTypeProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.objectTypeProperty;
			}
		});
		Object.defineProperty(exports3, "ObjectTypeSpreadProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.objectTypeSpreadProperty;
			}
		});
		Object.defineProperty(exports3, "OpaqueType", {
			enumerable: true,
			get: function () {
				return _lowercase.opaqueType;
			}
		});
		Object.defineProperty(exports3, "OptionalCallExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.optionalCallExpression;
			}
		});
		Object.defineProperty(exports3, "OptionalIndexedAccessType", {
			enumerable: true,
			get: function () {
				return _lowercase.optionalIndexedAccessType;
			}
		});
		Object.defineProperty(exports3, "OptionalMemberExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.optionalMemberExpression;
			}
		});
		Object.defineProperty(exports3, "ParenthesizedExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.parenthesizedExpression;
			}
		});
		Object.defineProperty(exports3, "PipelineBareFunction", {
			enumerable: true,
			get: function () {
				return _lowercase.pipelineBareFunction;
			}
		});
		Object.defineProperty(exports3, "PipelinePrimaryTopicReference", {
			enumerable: true,
			get: function () {
				return _lowercase.pipelinePrimaryTopicReference;
			}
		});
		Object.defineProperty(exports3, "PipelineTopicExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.pipelineTopicExpression;
			}
		});
		Object.defineProperty(exports3, "Placeholder", {
			enumerable: true,
			get: function () {
				return _lowercase.placeholder;
			}
		});
		Object.defineProperty(exports3, "PrivateName", {
			enumerable: true,
			get: function () {
				return _lowercase.privateName;
			}
		});
		Object.defineProperty(exports3, "Program", {
			enumerable: true,
			get: function () {
				return _lowercase.program;
			}
		});
		Object.defineProperty(exports3, "QualifiedTypeIdentifier", {
			enumerable: true,
			get: function () {
				return _lowercase.qualifiedTypeIdentifier;
			}
		});
		Object.defineProperty(exports3, "RecordExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.recordExpression;
			}
		});
		Object.defineProperty(exports3, "RegExpLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.regExpLiteral;
			}
		});
		Object.defineProperty(exports3, "RegexLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.regexLiteral;
			}
		});
		Object.defineProperty(exports3, "RestElement", {
			enumerable: true,
			get: function () {
				return _lowercase.restElement;
			}
		});
		Object.defineProperty(exports3, "RestProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.restProperty;
			}
		});
		Object.defineProperty(exports3, "ReturnStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.returnStatement;
			}
		});
		Object.defineProperty(exports3, "SequenceExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.sequenceExpression;
			}
		});
		Object.defineProperty(exports3, "SpreadElement", {
			enumerable: true,
			get: function () {
				return _lowercase.spreadElement;
			}
		});
		Object.defineProperty(exports3, "SpreadProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.spreadProperty;
			}
		});
		Object.defineProperty(exports3, "StaticBlock", {
			enumerable: true,
			get: function () {
				return _lowercase.staticBlock;
			}
		});
		Object.defineProperty(exports3, "StringLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.stringLiteral;
			}
		});
		Object.defineProperty(exports3, "StringLiteralTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.stringLiteralTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "StringTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.stringTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "Super", {
			enumerable: true,
			get: function () {
				return _lowercase.super;
			}
		});
		Object.defineProperty(exports3, "SwitchCase", {
			enumerable: true,
			get: function () {
				return _lowercase.switchCase;
			}
		});
		Object.defineProperty(exports3, "SwitchStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.switchStatement;
			}
		});
		Object.defineProperty(exports3, "SymbolTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.symbolTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "TSAnyKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsAnyKeyword;
			}
		});
		Object.defineProperty(exports3, "TSArrayType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsArrayType;
			}
		});
		Object.defineProperty(exports3, "TSAsExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.tsAsExpression;
			}
		});
		Object.defineProperty(exports3, "TSBigIntKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsBigIntKeyword;
			}
		});
		Object.defineProperty(exports3, "TSBooleanKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsBooleanKeyword;
			}
		});
		Object.defineProperty(exports3, "TSCallSignatureDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.tsCallSignatureDeclaration;
			}
		});
		Object.defineProperty(exports3, "TSConditionalType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsConditionalType;
			}
		});
		Object.defineProperty(exports3, "TSConstructSignatureDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.tsConstructSignatureDeclaration;
			}
		});
		Object.defineProperty(exports3, "TSConstructorType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsConstructorType;
			}
		});
		Object.defineProperty(exports3, "TSDeclareFunction", {
			enumerable: true,
			get: function () {
				return _lowercase.tsDeclareFunction;
			}
		});
		Object.defineProperty(exports3, "TSDeclareMethod", {
			enumerable: true,
			get: function () {
				return _lowercase.tsDeclareMethod;
			}
		});
		Object.defineProperty(exports3, "TSEnumBody", {
			enumerable: true,
			get: function () {
				return _lowercase.tsEnumBody;
			}
		});
		Object.defineProperty(exports3, "TSEnumDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.tsEnumDeclaration;
			}
		});
		Object.defineProperty(exports3, "TSEnumMember", {
			enumerable: true,
			get: function () {
				return _lowercase.tsEnumMember;
			}
		});
		Object.defineProperty(exports3, "TSExportAssignment", {
			enumerable: true,
			get: function () {
				return _lowercase.tsExportAssignment;
			}
		});
		Object.defineProperty(exports3, "TSExpressionWithTypeArguments", {
			enumerable: true,
			get: function () {
				return _lowercase.tsExpressionWithTypeArguments;
			}
		});
		Object.defineProperty(exports3, "TSExternalModuleReference", {
			enumerable: true,
			get: function () {
				return _lowercase.tsExternalModuleReference;
			}
		});
		Object.defineProperty(exports3, "TSFunctionType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsFunctionType;
			}
		});
		Object.defineProperty(exports3, "TSImportEqualsDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.tsImportEqualsDeclaration;
			}
		});
		Object.defineProperty(exports3, "TSImportType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsImportType;
			}
		});
		Object.defineProperty(exports3, "TSIndexSignature", {
			enumerable: true,
			get: function () {
				return _lowercase.tsIndexSignature;
			}
		});
		Object.defineProperty(exports3, "TSIndexedAccessType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsIndexedAccessType;
			}
		});
		Object.defineProperty(exports3, "TSInferType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsInferType;
			}
		});
		Object.defineProperty(exports3, "TSInstantiationExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.tsInstantiationExpression;
			}
		});
		Object.defineProperty(exports3, "TSInterfaceBody", {
			enumerable: true,
			get: function () {
				return _lowercase.tsInterfaceBody;
			}
		});
		Object.defineProperty(exports3, "TSInterfaceDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.tsInterfaceDeclaration;
			}
		});
		Object.defineProperty(exports3, "TSIntersectionType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsIntersectionType;
			}
		});
		Object.defineProperty(exports3, "TSIntrinsicKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsIntrinsicKeyword;
			}
		});
		Object.defineProperty(exports3, "TSLiteralType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsLiteralType;
			}
		});
		Object.defineProperty(exports3, "TSMappedType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsMappedType;
			}
		});
		Object.defineProperty(exports3, "TSMethodSignature", {
			enumerable: true,
			get: function () {
				return _lowercase.tsMethodSignature;
			}
		});
		Object.defineProperty(exports3, "TSModuleBlock", {
			enumerable: true,
			get: function () {
				return _lowercase.tsModuleBlock;
			}
		});
		Object.defineProperty(exports3, "TSModuleDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.tsModuleDeclaration;
			}
		});
		Object.defineProperty(exports3, "TSNamedTupleMember", {
			enumerable: true,
			get: function () {
				return _lowercase.tsNamedTupleMember;
			}
		});
		Object.defineProperty(exports3, "TSNamespaceExportDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.tsNamespaceExportDeclaration;
			}
		});
		Object.defineProperty(exports3, "TSNeverKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsNeverKeyword;
			}
		});
		Object.defineProperty(exports3, "TSNonNullExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.tsNonNullExpression;
			}
		});
		Object.defineProperty(exports3, "TSNullKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsNullKeyword;
			}
		});
		Object.defineProperty(exports3, "TSNumberKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsNumberKeyword;
			}
		});
		Object.defineProperty(exports3, "TSObjectKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsObjectKeyword;
			}
		});
		Object.defineProperty(exports3, "TSOptionalType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsOptionalType;
			}
		});
		Object.defineProperty(exports3, "TSParameterProperty", {
			enumerable: true,
			get: function () {
				return _lowercase.tsParameterProperty;
			}
		});
		Object.defineProperty(exports3, "TSParenthesizedType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsParenthesizedType;
			}
		});
		Object.defineProperty(exports3, "TSPropertySignature", {
			enumerable: true,
			get: function () {
				return _lowercase.tsPropertySignature;
			}
		});
		Object.defineProperty(exports3, "TSQualifiedName", {
			enumerable: true,
			get: function () {
				return _lowercase.tsQualifiedName;
			}
		});
		Object.defineProperty(exports3, "TSRestType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsRestType;
			}
		});
		Object.defineProperty(exports3, "TSSatisfiesExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.tsSatisfiesExpression;
			}
		});
		Object.defineProperty(exports3, "TSStringKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsStringKeyword;
			}
		});
		Object.defineProperty(exports3, "TSSymbolKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsSymbolKeyword;
			}
		});
		Object.defineProperty(exports3, "TSTemplateLiteralType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTemplateLiteralType;
			}
		});
		Object.defineProperty(exports3, "TSThisType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsThisType;
			}
		});
		Object.defineProperty(exports3, "TSTupleType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTupleType;
			}
		});
		Object.defineProperty(exports3, "TSTypeAliasDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeAliasDeclaration;
			}
		});
		Object.defineProperty(exports3, "TSTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "TSTypeAssertion", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeAssertion;
			}
		});
		Object.defineProperty(exports3, "TSTypeLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeLiteral;
			}
		});
		Object.defineProperty(exports3, "TSTypeOperator", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeOperator;
			}
		});
		Object.defineProperty(exports3, "TSTypeParameter", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeParameter;
			}
		});
		Object.defineProperty(exports3, "TSTypeParameterDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeParameterDeclaration;
			}
		});
		Object.defineProperty(exports3, "TSTypeParameterInstantiation", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeParameterInstantiation;
			}
		});
		Object.defineProperty(exports3, "TSTypePredicate", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypePredicate;
			}
		});
		Object.defineProperty(exports3, "TSTypeQuery", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeQuery;
			}
		});
		Object.defineProperty(exports3, "TSTypeReference", {
			enumerable: true,
			get: function () {
				return _lowercase.tsTypeReference;
			}
		});
		Object.defineProperty(exports3, "TSUndefinedKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsUndefinedKeyword;
			}
		});
		Object.defineProperty(exports3, "TSUnionType", {
			enumerable: true,
			get: function () {
				return _lowercase.tsUnionType;
			}
		});
		Object.defineProperty(exports3, "TSUnknownKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsUnknownKeyword;
			}
		});
		Object.defineProperty(exports3, "TSVoidKeyword", {
			enumerable: true,
			get: function () {
				return _lowercase.tsVoidKeyword;
			}
		});
		Object.defineProperty(exports3, "TaggedTemplateExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.taggedTemplateExpression;
			}
		});
		Object.defineProperty(exports3, "TemplateElement", {
			enumerable: true,
			get: function () {
				return _lowercase.templateElement;
			}
		});
		Object.defineProperty(exports3, "TemplateLiteral", {
			enumerable: true,
			get: function () {
				return _lowercase.templateLiteral;
			}
		});
		Object.defineProperty(exports3, "ThisExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.thisExpression;
			}
		});
		Object.defineProperty(exports3, "ThisTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.thisTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "ThrowStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.throwStatement;
			}
		});
		Object.defineProperty(exports3, "TopicReference", {
			enumerable: true,
			get: function () {
				return _lowercase.topicReference;
			}
		});
		Object.defineProperty(exports3, "TryStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.tryStatement;
			}
		});
		Object.defineProperty(exports3, "TupleExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.tupleExpression;
			}
		});
		Object.defineProperty(exports3, "TupleTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.tupleTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "TypeAlias", {
			enumerable: true,
			get: function () {
				return _lowercase.typeAlias;
			}
		});
		Object.defineProperty(exports3, "TypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.typeAnnotation;
			}
		});
		Object.defineProperty(exports3, "TypeCastExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.typeCastExpression;
			}
		});
		Object.defineProperty(exports3, "TypeParameter", {
			enumerable: true,
			get: function () {
				return _lowercase.typeParameter;
			}
		});
		Object.defineProperty(exports3, "TypeParameterDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.typeParameterDeclaration;
			}
		});
		Object.defineProperty(exports3, "TypeParameterInstantiation", {
			enumerable: true,
			get: function () {
				return _lowercase.typeParameterInstantiation;
			}
		});
		Object.defineProperty(exports3, "TypeofTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.typeofTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "UnaryExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.unaryExpression;
			}
		});
		Object.defineProperty(exports3, "UnionTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.unionTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "UpdateExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.updateExpression;
			}
		});
		Object.defineProperty(exports3, "V8IntrinsicIdentifier", {
			enumerable: true,
			get: function () {
				return _lowercase.v8IntrinsicIdentifier;
			}
		});
		Object.defineProperty(exports3, "VariableDeclaration", {
			enumerable: true,
			get: function () {
				return _lowercase.variableDeclaration;
			}
		});
		Object.defineProperty(exports3, "VariableDeclarator", {
			enumerable: true,
			get: function () {
				return _lowercase.variableDeclarator;
			}
		});
		Object.defineProperty(exports3, "Variance", {
			enumerable: true,
			get: function () {
				return _lowercase.variance;
			}
		});
		Object.defineProperty(exports3, "VoidTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _lowercase.voidTypeAnnotation;
			}
		});
		Object.defineProperty(exports3, "WhileStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.whileStatement;
			}
		});
		Object.defineProperty(exports3, "WithStatement", {
			enumerable: true,
			get: function () {
				return _lowercase.withStatement;
			}
		});
		Object.defineProperty(exports3, "YieldExpression", {
			enumerable: true,
			get: function () {
				return _lowercase.yieldExpression;
			}
		});
		var _lowercase = lowercase;
	})(uppercase);
	(function (exports3) {
		Object.defineProperty(exports3, "__esModule", {
			value: true
		});
		var _lowercase = lowercase;
		Object.keys(_lowercase).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _lowercase[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _lowercase[key];
				}
			});
		});
		var _uppercase = uppercase;
		Object.keys(_uppercase).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _uppercase[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _uppercase[key];
				}
			});
		});
	})(generated$2);
	Object.defineProperty(cleanJSXElementLiteralChild$1, "__esModule", {
		value: true
	});
	cleanJSXElementLiteralChild$1.default = cleanJSXElementLiteralChild;
	var _index$C = generated$2;
	var _index2$9 = lib$2;

	function cleanJSXElementLiteralChild(child, args) {
		const lines = child.value.split(/\r\n|\n|\r/);
		let lastNonEmptyLine = 0;
		for (let i = 0; i < lines.length; i++) {
			if (/[^ \t]/.exec(lines[i])) {
				lastNonEmptyLine = i;
			}
		}
		let str = "";
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const isFirstLine = i === 0;
			const isLastLine = i === lines.length - 1;
			const isLastNonEmptyLine = i === lastNonEmptyLine;
			let trimmedLine = line.replace(/\t/g, " ");
			if (!isFirstLine) {
				trimmedLine = trimmedLine.replace(/^ +/, "");
			}
			if (!isLastLine) {
				trimmedLine = trimmedLine.replace(/ +$/, "");
			}
			if (trimmedLine) {
				if (!isLastNonEmptyLine) {
					trimmedLine += " ";
				}
				str += trimmedLine;
			}
		}
		if (str)
			args.push((0, _index2$9.inherits)((0, _index$C.stringLiteral)(str), child));
	}

	Object.defineProperty(buildChildren$1, "__esModule", {
		value: true
	});
	buildChildren$1.default = buildChildren;
	var _index$B = generated$3;
	var _cleanJSXElementLiteralChild = cleanJSXElementLiteralChild$1;

	function buildChildren(node2) {
		const elements = [];
		for (let i = 0; i < node2.children.length; i++) {
			let child = node2.children[i];
			if ((0, _index$B.isJSXText)(child)) {
				(0, _cleanJSXElementLiteralChild.default)(child, elements);
				continue;
			}
			if ((0, _index$B.isJSXExpressionContainer)(child))
				child = child.expression;
			if ((0, _index$B.isJSXEmptyExpression)(child))
				continue;
			elements.push(child);
		}
		return elements;
	}

	var assertNode$1 = {};
	var isNode$1 = {};
	Object.defineProperty(isNode$1, "__esModule", {
		value: true
	});
	isNode$1.default = isNode;
	var _index$A = definitions;

	function isNode(node2) {
		return !!(node2 && _index$A.VISITOR_KEYS[node2.type]);
	}

	Object.defineProperty(assertNode$1, "__esModule", {
		value: true
	});
	assertNode$1.default = assertNode;
	var _isNode = isNode$1;

	function assertNode(node2) {
		if (!(0, _isNode.default)(node2)) {
			var _node$type;
			const type = (_node$type = node2 == null ? void 0 : node2.type) != null ? _node$type : JSON.stringify(node2);
			throw new TypeError(`Not a valid node of type "${type}"`);
		}
	}

	var generated$1 = {};
	Object.defineProperty(generated$1, "__esModule", {
		value: true
	});
	generated$1.assertAccessor = assertAccessor;
	generated$1.assertAnyTypeAnnotation = assertAnyTypeAnnotation;
	generated$1.assertArgumentPlaceholder = assertArgumentPlaceholder;
	generated$1.assertArrayExpression = assertArrayExpression;
	generated$1.assertArrayPattern = assertArrayPattern;
	generated$1.assertArrayTypeAnnotation = assertArrayTypeAnnotation;
	generated$1.assertArrowFunctionExpression = assertArrowFunctionExpression;
	generated$1.assertAssignmentExpression = assertAssignmentExpression;
	generated$1.assertAssignmentPattern = assertAssignmentPattern;
	generated$1.assertAwaitExpression = assertAwaitExpression;
	generated$1.assertBigIntLiteral = assertBigIntLiteral;
	generated$1.assertBinary = assertBinary;
	generated$1.assertBinaryExpression = assertBinaryExpression;
	generated$1.assertBindExpression = assertBindExpression;
	generated$1.assertBlock = assertBlock;
	generated$1.assertBlockParent = assertBlockParent;
	generated$1.assertBlockStatement = assertBlockStatement;
	generated$1.assertBooleanLiteral = assertBooleanLiteral;
	generated$1.assertBooleanLiteralTypeAnnotation = assertBooleanLiteralTypeAnnotation;
	generated$1.assertBooleanTypeAnnotation = assertBooleanTypeAnnotation;
	generated$1.assertBreakStatement = assertBreakStatement;
	generated$1.assertCallExpression = assertCallExpression;
	generated$1.assertCatchClause = assertCatchClause;
	generated$1.assertClass = assertClass;
	generated$1.assertClassAccessorProperty = assertClassAccessorProperty;
	generated$1.assertClassBody = assertClassBody;
	generated$1.assertClassDeclaration = assertClassDeclaration;
	generated$1.assertClassExpression = assertClassExpression;
	generated$1.assertClassImplements = assertClassImplements;
	generated$1.assertClassMethod = assertClassMethod;
	generated$1.assertClassPrivateMethod = assertClassPrivateMethod;
	generated$1.assertClassPrivateProperty = assertClassPrivateProperty;
	generated$1.assertClassProperty = assertClassProperty;
	generated$1.assertCompletionStatement = assertCompletionStatement;
	generated$1.assertConditional = assertConditional;
	generated$1.assertConditionalExpression = assertConditionalExpression;
	generated$1.assertContinueStatement = assertContinueStatement;
	generated$1.assertDebuggerStatement = assertDebuggerStatement;
	generated$1.assertDecimalLiteral = assertDecimalLiteral;
	generated$1.assertDeclaration = assertDeclaration;
	generated$1.assertDeclareClass = assertDeclareClass;
	generated$1.assertDeclareExportAllDeclaration = assertDeclareExportAllDeclaration;
	generated$1.assertDeclareExportDeclaration = assertDeclareExportDeclaration;
	generated$1.assertDeclareFunction = assertDeclareFunction;
	generated$1.assertDeclareInterface = assertDeclareInterface;
	generated$1.assertDeclareModule = assertDeclareModule;
	generated$1.assertDeclareModuleExports = assertDeclareModuleExports;
	generated$1.assertDeclareOpaqueType = assertDeclareOpaqueType;
	generated$1.assertDeclareTypeAlias = assertDeclareTypeAlias;
	generated$1.assertDeclareVariable = assertDeclareVariable;
	generated$1.assertDeclaredPredicate = assertDeclaredPredicate;
	generated$1.assertDecorator = assertDecorator;
	generated$1.assertDirective = assertDirective;
	generated$1.assertDirectiveLiteral = assertDirectiveLiteral;
	generated$1.assertDoExpression = assertDoExpression;
	generated$1.assertDoWhileStatement = assertDoWhileStatement;
	generated$1.assertEmptyStatement = assertEmptyStatement;
	generated$1.assertEmptyTypeAnnotation = assertEmptyTypeAnnotation;
	generated$1.assertEnumBody = assertEnumBody;
	generated$1.assertEnumBooleanBody = assertEnumBooleanBody;
	generated$1.assertEnumBooleanMember = assertEnumBooleanMember;
	generated$1.assertEnumDeclaration = assertEnumDeclaration;
	generated$1.assertEnumDefaultedMember = assertEnumDefaultedMember;
	generated$1.assertEnumMember = assertEnumMember;
	generated$1.assertEnumNumberBody = assertEnumNumberBody;
	generated$1.assertEnumNumberMember = assertEnumNumberMember;
	generated$1.assertEnumStringBody = assertEnumStringBody;
	generated$1.assertEnumStringMember = assertEnumStringMember;
	generated$1.assertEnumSymbolBody = assertEnumSymbolBody;
	generated$1.assertExistsTypeAnnotation = assertExistsTypeAnnotation;
	generated$1.assertExportAllDeclaration = assertExportAllDeclaration;
	generated$1.assertExportDeclaration = assertExportDeclaration;
	generated$1.assertExportDefaultDeclaration = assertExportDefaultDeclaration;
	generated$1.assertExportDefaultSpecifier = assertExportDefaultSpecifier;
	generated$1.assertExportNamedDeclaration = assertExportNamedDeclaration;
	generated$1.assertExportNamespaceSpecifier = assertExportNamespaceSpecifier;
	generated$1.assertExportSpecifier = assertExportSpecifier;
	generated$1.assertExpression = assertExpression;
	generated$1.assertExpressionStatement = assertExpressionStatement;
	generated$1.assertExpressionWrapper = assertExpressionWrapper;
	generated$1.assertFile = assertFile;
	generated$1.assertFlow = assertFlow;
	generated$1.assertFlowBaseAnnotation = assertFlowBaseAnnotation;
	generated$1.assertFlowDeclaration = assertFlowDeclaration;
	generated$1.assertFlowPredicate = assertFlowPredicate;
	generated$1.assertFlowType = assertFlowType;
	generated$1.assertFor = assertFor;
	generated$1.assertForInStatement = assertForInStatement;
	generated$1.assertForOfStatement = assertForOfStatement;
	generated$1.assertForStatement = assertForStatement;
	generated$1.assertForXStatement = assertForXStatement;
	generated$1.assertFunction = assertFunction;
	generated$1.assertFunctionDeclaration = assertFunctionDeclaration;
	generated$1.assertFunctionExpression = assertFunctionExpression;
	generated$1.assertFunctionParent = assertFunctionParent;
	generated$1.assertFunctionTypeAnnotation = assertFunctionTypeAnnotation;
	generated$1.assertFunctionTypeParam = assertFunctionTypeParam;
	generated$1.assertGenericTypeAnnotation = assertGenericTypeAnnotation;
	generated$1.assertIdentifier = assertIdentifier;
	generated$1.assertIfStatement = assertIfStatement;
	generated$1.assertImmutable = assertImmutable;
	generated$1.assertImport = assertImport;
	generated$1.assertImportAttribute = assertImportAttribute;
	generated$1.assertImportDeclaration = assertImportDeclaration;
	generated$1.assertImportDefaultSpecifier = assertImportDefaultSpecifier;
	generated$1.assertImportExpression = assertImportExpression;
	generated$1.assertImportNamespaceSpecifier = assertImportNamespaceSpecifier;
	generated$1.assertImportOrExportDeclaration = assertImportOrExportDeclaration;
	generated$1.assertImportSpecifier = assertImportSpecifier;
	generated$1.assertIndexedAccessType = assertIndexedAccessType;
	generated$1.assertInferredPredicate = assertInferredPredicate;
	generated$1.assertInterfaceDeclaration = assertInterfaceDeclaration;
	generated$1.assertInterfaceExtends = assertInterfaceExtends;
	generated$1.assertInterfaceTypeAnnotation = assertInterfaceTypeAnnotation;
	generated$1.assertInterpreterDirective = assertInterpreterDirective;
	generated$1.assertIntersectionTypeAnnotation = assertIntersectionTypeAnnotation;
	generated$1.assertJSX = assertJSX;
	generated$1.assertJSXAttribute = assertJSXAttribute;
	generated$1.assertJSXClosingElement = assertJSXClosingElement;
	generated$1.assertJSXClosingFragment = assertJSXClosingFragment;
	generated$1.assertJSXElement = assertJSXElement;
	generated$1.assertJSXEmptyExpression = assertJSXEmptyExpression;
	generated$1.assertJSXExpressionContainer = assertJSXExpressionContainer;
	generated$1.assertJSXFragment = assertJSXFragment;
	generated$1.assertJSXIdentifier = assertJSXIdentifier;
	generated$1.assertJSXMemberExpression = assertJSXMemberExpression;
	generated$1.assertJSXNamespacedName = assertJSXNamespacedName;
	generated$1.assertJSXOpeningElement = assertJSXOpeningElement;
	generated$1.assertJSXOpeningFragment = assertJSXOpeningFragment;
	generated$1.assertJSXSpreadAttribute = assertJSXSpreadAttribute;
	generated$1.assertJSXSpreadChild = assertJSXSpreadChild;
	generated$1.assertJSXText = assertJSXText;
	generated$1.assertLVal = assertLVal;
	generated$1.assertLabeledStatement = assertLabeledStatement;
	generated$1.assertLiteral = assertLiteral;
	generated$1.assertLogicalExpression = assertLogicalExpression;
	generated$1.assertLoop = assertLoop;
	generated$1.assertMemberExpression = assertMemberExpression;
	generated$1.assertMetaProperty = assertMetaProperty;
	generated$1.assertMethod = assertMethod;
	generated$1.assertMiscellaneous = assertMiscellaneous;
	generated$1.assertMixedTypeAnnotation = assertMixedTypeAnnotation;
	generated$1.assertModuleDeclaration = assertModuleDeclaration;
	generated$1.assertModuleExpression = assertModuleExpression;
	generated$1.assertModuleSpecifier = assertModuleSpecifier;
	generated$1.assertNewExpression = assertNewExpression;
	generated$1.assertNoop = assertNoop;
	generated$1.assertNullLiteral = assertNullLiteral;
	generated$1.assertNullLiteralTypeAnnotation = assertNullLiteralTypeAnnotation;
	generated$1.assertNullableTypeAnnotation = assertNullableTypeAnnotation;
	generated$1.assertNumberLiteral = assertNumberLiteral;
	generated$1.assertNumberLiteralTypeAnnotation = assertNumberLiteralTypeAnnotation;
	generated$1.assertNumberTypeAnnotation = assertNumberTypeAnnotation;
	generated$1.assertNumericLiteral = assertNumericLiteral;
	generated$1.assertObjectExpression = assertObjectExpression;
	generated$1.assertObjectMember = assertObjectMember;
	generated$1.assertObjectMethod = assertObjectMethod;
	generated$1.assertObjectPattern = assertObjectPattern;
	generated$1.assertObjectProperty = assertObjectProperty;
	generated$1.assertObjectTypeAnnotation = assertObjectTypeAnnotation;
	generated$1.assertObjectTypeCallProperty = assertObjectTypeCallProperty;
	generated$1.assertObjectTypeIndexer = assertObjectTypeIndexer;
	generated$1.assertObjectTypeInternalSlot = assertObjectTypeInternalSlot;
	generated$1.assertObjectTypeProperty = assertObjectTypeProperty;
	generated$1.assertObjectTypeSpreadProperty = assertObjectTypeSpreadProperty;
	generated$1.assertOpaqueType = assertOpaqueType;
	generated$1.assertOptionalCallExpression = assertOptionalCallExpression;
	generated$1.assertOptionalIndexedAccessType = assertOptionalIndexedAccessType;
	generated$1.assertOptionalMemberExpression = assertOptionalMemberExpression;
	generated$1.assertParenthesizedExpression = assertParenthesizedExpression;
	generated$1.assertPattern = assertPattern;
	generated$1.assertPatternLike = assertPatternLike;
	generated$1.assertPipelineBareFunction = assertPipelineBareFunction;
	generated$1.assertPipelinePrimaryTopicReference = assertPipelinePrimaryTopicReference;
	generated$1.assertPipelineTopicExpression = assertPipelineTopicExpression;
	generated$1.assertPlaceholder = assertPlaceholder;
	generated$1.assertPrivate = assertPrivate;
	generated$1.assertPrivateName = assertPrivateName;
	generated$1.assertProgram = assertProgram;
	generated$1.assertProperty = assertProperty;
	generated$1.assertPureish = assertPureish;
	generated$1.assertQualifiedTypeIdentifier = assertQualifiedTypeIdentifier;
	generated$1.assertRecordExpression = assertRecordExpression;
	generated$1.assertRegExpLiteral = assertRegExpLiteral;
	generated$1.assertRegexLiteral = assertRegexLiteral;
	generated$1.assertRestElement = assertRestElement;
	generated$1.assertRestProperty = assertRestProperty;
	generated$1.assertReturnStatement = assertReturnStatement;
	generated$1.assertScopable = assertScopable;
	generated$1.assertSequenceExpression = assertSequenceExpression;
	generated$1.assertSpreadElement = assertSpreadElement;
	generated$1.assertSpreadProperty = assertSpreadProperty;
	generated$1.assertStandardized = assertStandardized;
	generated$1.assertStatement = assertStatement;
	generated$1.assertStaticBlock = assertStaticBlock;
	generated$1.assertStringLiteral = assertStringLiteral;
	generated$1.assertStringLiteralTypeAnnotation = assertStringLiteralTypeAnnotation;
	generated$1.assertStringTypeAnnotation = assertStringTypeAnnotation;
	generated$1.assertSuper = assertSuper;
	generated$1.assertSwitchCase = assertSwitchCase;
	generated$1.assertSwitchStatement = assertSwitchStatement;
	generated$1.assertSymbolTypeAnnotation = assertSymbolTypeAnnotation;
	generated$1.assertTSAnyKeyword = assertTSAnyKeyword;
	generated$1.assertTSArrayType = assertTSArrayType;
	generated$1.assertTSAsExpression = assertTSAsExpression;
	generated$1.assertTSBaseType = assertTSBaseType;
	generated$1.assertTSBigIntKeyword = assertTSBigIntKeyword;
	generated$1.assertTSBooleanKeyword = assertTSBooleanKeyword;
	generated$1.assertTSCallSignatureDeclaration = assertTSCallSignatureDeclaration;
	generated$1.assertTSConditionalType = assertTSConditionalType;
	generated$1.assertTSConstructSignatureDeclaration = assertTSConstructSignatureDeclaration;
	generated$1.assertTSConstructorType = assertTSConstructorType;
	generated$1.assertTSDeclareFunction = assertTSDeclareFunction;
	generated$1.assertTSDeclareMethod = assertTSDeclareMethod;
	generated$1.assertTSEntityName = assertTSEntityName;
	generated$1.assertTSEnumBody = assertTSEnumBody;
	generated$1.assertTSEnumDeclaration = assertTSEnumDeclaration;
	generated$1.assertTSEnumMember = assertTSEnumMember;
	generated$1.assertTSExportAssignment = assertTSExportAssignment;
	generated$1.assertTSExpressionWithTypeArguments = assertTSExpressionWithTypeArguments;
	generated$1.assertTSExternalModuleReference = assertTSExternalModuleReference;
	generated$1.assertTSFunctionType = assertTSFunctionType;
	generated$1.assertTSImportEqualsDeclaration = assertTSImportEqualsDeclaration;
	generated$1.assertTSImportType = assertTSImportType;
	generated$1.assertTSIndexSignature = assertTSIndexSignature;
	generated$1.assertTSIndexedAccessType = assertTSIndexedAccessType;
	generated$1.assertTSInferType = assertTSInferType;
	generated$1.assertTSInstantiationExpression = assertTSInstantiationExpression;
	generated$1.assertTSInterfaceBody = assertTSInterfaceBody;
	generated$1.assertTSInterfaceDeclaration = assertTSInterfaceDeclaration;
	generated$1.assertTSIntersectionType = assertTSIntersectionType;
	generated$1.assertTSIntrinsicKeyword = assertTSIntrinsicKeyword;
	generated$1.assertTSLiteralType = assertTSLiteralType;
	generated$1.assertTSMappedType = assertTSMappedType;
	generated$1.assertTSMethodSignature = assertTSMethodSignature;
	generated$1.assertTSModuleBlock = assertTSModuleBlock;
	generated$1.assertTSModuleDeclaration = assertTSModuleDeclaration;
	generated$1.assertTSNamedTupleMember = assertTSNamedTupleMember;
	generated$1.assertTSNamespaceExportDeclaration = assertTSNamespaceExportDeclaration;
	generated$1.assertTSNeverKeyword = assertTSNeverKeyword;
	generated$1.assertTSNonNullExpression = assertTSNonNullExpression;
	generated$1.assertTSNullKeyword = assertTSNullKeyword;
	generated$1.assertTSNumberKeyword = assertTSNumberKeyword;
	generated$1.assertTSObjectKeyword = assertTSObjectKeyword;
	generated$1.assertTSOptionalType = assertTSOptionalType;
	generated$1.assertTSParameterProperty = assertTSParameterProperty;
	generated$1.assertTSParenthesizedType = assertTSParenthesizedType;
	generated$1.assertTSPropertySignature = assertTSPropertySignature;
	generated$1.assertTSQualifiedName = assertTSQualifiedName;
	generated$1.assertTSRestType = assertTSRestType;
	generated$1.assertTSSatisfiesExpression = assertTSSatisfiesExpression;
	generated$1.assertTSStringKeyword = assertTSStringKeyword;
	generated$1.assertTSSymbolKeyword = assertTSSymbolKeyword;
	generated$1.assertTSTemplateLiteralType = assertTSTemplateLiteralType;
	generated$1.assertTSThisType = assertTSThisType;
	generated$1.assertTSTupleType = assertTSTupleType;
	generated$1.assertTSType = assertTSType;
	generated$1.assertTSTypeAliasDeclaration = assertTSTypeAliasDeclaration;
	generated$1.assertTSTypeAnnotation = assertTSTypeAnnotation;
	generated$1.assertTSTypeAssertion = assertTSTypeAssertion;
	generated$1.assertTSTypeElement = assertTSTypeElement;
	generated$1.assertTSTypeLiteral = assertTSTypeLiteral;
	generated$1.assertTSTypeOperator = assertTSTypeOperator;
	generated$1.assertTSTypeParameter = assertTSTypeParameter;
	generated$1.assertTSTypeParameterDeclaration = assertTSTypeParameterDeclaration;
	generated$1.assertTSTypeParameterInstantiation = assertTSTypeParameterInstantiation;
	generated$1.assertTSTypePredicate = assertTSTypePredicate;
	generated$1.assertTSTypeQuery = assertTSTypeQuery;
	generated$1.assertTSTypeReference = assertTSTypeReference;
	generated$1.assertTSUndefinedKeyword = assertTSUndefinedKeyword;
	generated$1.assertTSUnionType = assertTSUnionType;
	generated$1.assertTSUnknownKeyword = assertTSUnknownKeyword;
	generated$1.assertTSVoidKeyword = assertTSVoidKeyword;
	generated$1.assertTaggedTemplateExpression = assertTaggedTemplateExpression;
	generated$1.assertTemplateElement = assertTemplateElement;
	generated$1.assertTemplateLiteral = assertTemplateLiteral;
	generated$1.assertTerminatorless = assertTerminatorless;
	generated$1.assertThisExpression = assertThisExpression;
	generated$1.assertThisTypeAnnotation = assertThisTypeAnnotation;
	generated$1.assertThrowStatement = assertThrowStatement;
	generated$1.assertTopicReference = assertTopicReference;
	generated$1.assertTryStatement = assertTryStatement;
	generated$1.assertTupleExpression = assertTupleExpression;
	generated$1.assertTupleTypeAnnotation = assertTupleTypeAnnotation;
	generated$1.assertTypeAlias = assertTypeAlias;
	generated$1.assertTypeAnnotation = assertTypeAnnotation;
	generated$1.assertTypeCastExpression = assertTypeCastExpression;
	generated$1.assertTypeParameter = assertTypeParameter;
	generated$1.assertTypeParameterDeclaration = assertTypeParameterDeclaration;
	generated$1.assertTypeParameterInstantiation = assertTypeParameterInstantiation;
	generated$1.assertTypeScript = assertTypeScript;
	generated$1.assertTypeofTypeAnnotation = assertTypeofTypeAnnotation;
	generated$1.assertUnaryExpression = assertUnaryExpression;
	generated$1.assertUnaryLike = assertUnaryLike;
	generated$1.assertUnionTypeAnnotation = assertUnionTypeAnnotation;
	generated$1.assertUpdateExpression = assertUpdateExpression;
	generated$1.assertUserWhitespacable = assertUserWhitespacable;
	generated$1.assertV8IntrinsicIdentifier = assertV8IntrinsicIdentifier;
	generated$1.assertVariableDeclaration = assertVariableDeclaration;
	generated$1.assertVariableDeclarator = assertVariableDeclarator;
	generated$1.assertVariance = assertVariance;
	generated$1.assertVoidTypeAnnotation = assertVoidTypeAnnotation;
	generated$1.assertWhile = assertWhile;
	generated$1.assertWhileStatement = assertWhileStatement;
	generated$1.assertWithStatement = assertWithStatement;
	generated$1.assertYieldExpression = assertYieldExpression;
	var _is = is$1;
	var _deprecationWarning = deprecationWarning$1;

	function assert(type, node2, opts) {
		if (!(0, _is.default)(type, node2, opts)) {
			throw new Error(`Expected type "${type}" with option ${JSON.stringify(opts)}, but instead got "${node2.type}".`);
		}
	}

	function assertArrayExpression(node2, opts) {
		assert("ArrayExpression", node2, opts);
	}

	function assertAssignmentExpression(node2, opts) {
		assert("AssignmentExpression", node2, opts);
	}

	function assertBinaryExpression(node2, opts) {
		assert("BinaryExpression", node2, opts);
	}

	function assertInterpreterDirective(node2, opts) {
		assert("InterpreterDirective", node2, opts);
	}

	function assertDirective(node2, opts) {
		assert("Directive", node2, opts);
	}

	function assertDirectiveLiteral(node2, opts) {
		assert("DirectiveLiteral", node2, opts);
	}

	function assertBlockStatement(node2, opts) {
		assert("BlockStatement", node2, opts);
	}

	function assertBreakStatement(node2, opts) {
		assert("BreakStatement", node2, opts);
	}

	function assertCallExpression(node2, opts) {
		assert("CallExpression", node2, opts);
	}

	function assertCatchClause(node2, opts) {
		assert("CatchClause", node2, opts);
	}

	function assertConditionalExpression(node2, opts) {
		assert("ConditionalExpression", node2, opts);
	}

	function assertContinueStatement(node2, opts) {
		assert("ContinueStatement", node2, opts);
	}

	function assertDebuggerStatement(node2, opts) {
		assert("DebuggerStatement", node2, opts);
	}

	function assertDoWhileStatement(node2, opts) {
		assert("DoWhileStatement", node2, opts);
	}

	function assertEmptyStatement(node2, opts) {
		assert("EmptyStatement", node2, opts);
	}

	function assertExpressionStatement(node2, opts) {
		assert("ExpressionStatement", node2, opts);
	}

	function assertFile(node2, opts) {
		assert("File", node2, opts);
	}

	function assertForInStatement(node2, opts) {
		assert("ForInStatement", node2, opts);
	}

	function assertForStatement(node2, opts) {
		assert("ForStatement", node2, opts);
	}

	function assertFunctionDeclaration(node2, opts) {
		assert("FunctionDeclaration", node2, opts);
	}

	function assertFunctionExpression(node2, opts) {
		assert("FunctionExpression", node2, opts);
	}

	function assertIdentifier(node2, opts) {
		assert("Identifier", node2, opts);
	}

	function assertIfStatement(node2, opts) {
		assert("IfStatement", node2, opts);
	}

	function assertLabeledStatement(node2, opts) {
		assert("LabeledStatement", node2, opts);
	}

	function assertStringLiteral(node2, opts) {
		assert("StringLiteral", node2, opts);
	}

	function assertNumericLiteral(node2, opts) {
		assert("NumericLiteral", node2, opts);
	}

	function assertNullLiteral(node2, opts) {
		assert("NullLiteral", node2, opts);
	}

	function assertBooleanLiteral(node2, opts) {
		assert("BooleanLiteral", node2, opts);
	}

	function assertRegExpLiteral(node2, opts) {
		assert("RegExpLiteral", node2, opts);
	}

	function assertLogicalExpression(node2, opts) {
		assert("LogicalExpression", node2, opts);
	}

	function assertMemberExpression(node2, opts) {
		assert("MemberExpression", node2, opts);
	}

	function assertNewExpression(node2, opts) {
		assert("NewExpression", node2, opts);
	}

	function assertProgram(node2, opts) {
		assert("Program", node2, opts);
	}

	function assertObjectExpression(node2, opts) {
		assert("ObjectExpression", node2, opts);
	}

	function assertObjectMethod(node2, opts) {
		assert("ObjectMethod", node2, opts);
	}

	function assertObjectProperty(node2, opts) {
		assert("ObjectProperty", node2, opts);
	}

	function assertRestElement(node2, opts) {
		assert("RestElement", node2, opts);
	}

	function assertReturnStatement(node2, opts) {
		assert("ReturnStatement", node2, opts);
	}

	function assertSequenceExpression(node2, opts) {
		assert("SequenceExpression", node2, opts);
	}

	function assertParenthesizedExpression(node2, opts) {
		assert("ParenthesizedExpression", node2, opts);
	}

	function assertSwitchCase(node2, opts) {
		assert("SwitchCase", node2, opts);
	}

	function assertSwitchStatement(node2, opts) {
		assert("SwitchStatement", node2, opts);
	}

	function assertThisExpression(node2, opts) {
		assert("ThisExpression", node2, opts);
	}

	function assertThrowStatement(node2, opts) {
		assert("ThrowStatement", node2, opts);
	}

	function assertTryStatement(node2, opts) {
		assert("TryStatement", node2, opts);
	}

	function assertUnaryExpression(node2, opts) {
		assert("UnaryExpression", node2, opts);
	}

	function assertUpdateExpression(node2, opts) {
		assert("UpdateExpression", node2, opts);
	}

	function assertVariableDeclaration(node2, opts) {
		assert("VariableDeclaration", node2, opts);
	}

	function assertVariableDeclarator(node2, opts) {
		assert("VariableDeclarator", node2, opts);
	}

	function assertWhileStatement(node2, opts) {
		assert("WhileStatement", node2, opts);
	}

	function assertWithStatement(node2, opts) {
		assert("WithStatement", node2, opts);
	}

	function assertAssignmentPattern(node2, opts) {
		assert("AssignmentPattern", node2, opts);
	}

	function assertArrayPattern(node2, opts) {
		assert("ArrayPattern", node2, opts);
	}

	function assertArrowFunctionExpression(node2, opts) {
		assert("ArrowFunctionExpression", node2, opts);
	}

	function assertClassBody(node2, opts) {
		assert("ClassBody", node2, opts);
	}

	function assertClassExpression(node2, opts) {
		assert("ClassExpression", node2, opts);
	}

	function assertClassDeclaration(node2, opts) {
		assert("ClassDeclaration", node2, opts);
	}

	function assertExportAllDeclaration(node2, opts) {
		assert("ExportAllDeclaration", node2, opts);
	}

	function assertExportDefaultDeclaration(node2, opts) {
		assert("ExportDefaultDeclaration", node2, opts);
	}

	function assertExportNamedDeclaration(node2, opts) {
		assert("ExportNamedDeclaration", node2, opts);
	}

	function assertExportSpecifier(node2, opts) {
		assert("ExportSpecifier", node2, opts);
	}

	function assertForOfStatement(node2, opts) {
		assert("ForOfStatement", node2, opts);
	}

	function assertImportDeclaration(node2, opts) {
		assert("ImportDeclaration", node2, opts);
	}

	function assertImportDefaultSpecifier(node2, opts) {
		assert("ImportDefaultSpecifier", node2, opts);
	}

	function assertImportNamespaceSpecifier(node2, opts) {
		assert("ImportNamespaceSpecifier", node2, opts);
	}

	function assertImportSpecifier(node2, opts) {
		assert("ImportSpecifier", node2, opts);
	}

	function assertImportExpression(node2, opts) {
		assert("ImportExpression", node2, opts);
	}

	function assertMetaProperty(node2, opts) {
		assert("MetaProperty", node2, opts);
	}

	function assertClassMethod(node2, opts) {
		assert("ClassMethod", node2, opts);
	}

	function assertObjectPattern(node2, opts) {
		assert("ObjectPattern", node2, opts);
	}

	function assertSpreadElement(node2, opts) {
		assert("SpreadElement", node2, opts);
	}

	function assertSuper(node2, opts) {
		assert("Super", node2, opts);
	}

	function assertTaggedTemplateExpression(node2, opts) {
		assert("TaggedTemplateExpression", node2, opts);
	}

	function assertTemplateElement(node2, opts) {
		assert("TemplateElement", node2, opts);
	}

	function assertTemplateLiteral(node2, opts) {
		assert("TemplateLiteral", node2, opts);
	}

	function assertYieldExpression(node2, opts) {
		assert("YieldExpression", node2, opts);
	}

	function assertAwaitExpression(node2, opts) {
		assert("AwaitExpression", node2, opts);
	}

	function assertImport(node2, opts) {
		assert("Import", node2, opts);
	}

	function assertBigIntLiteral(node2, opts) {
		assert("BigIntLiteral", node2, opts);
	}

	function assertExportNamespaceSpecifier(node2, opts) {
		assert("ExportNamespaceSpecifier", node2, opts);
	}

	function assertOptionalMemberExpression(node2, opts) {
		assert("OptionalMemberExpression", node2, opts);
	}

	function assertOptionalCallExpression(node2, opts) {
		assert("OptionalCallExpression", node2, opts);
	}

	function assertClassProperty(node2, opts) {
		assert("ClassProperty", node2, opts);
	}

	function assertClassAccessorProperty(node2, opts) {
		assert("ClassAccessorProperty", node2, opts);
	}

	function assertClassPrivateProperty(node2, opts) {
		assert("ClassPrivateProperty", node2, opts);
	}

	function assertClassPrivateMethod(node2, opts) {
		assert("ClassPrivateMethod", node2, opts);
	}

	function assertPrivateName(node2, opts) {
		assert("PrivateName", node2, opts);
	}

	function assertStaticBlock(node2, opts) {
		assert("StaticBlock", node2, opts);
	}

	function assertAnyTypeAnnotation(node2, opts) {
		assert("AnyTypeAnnotation", node2, opts);
	}

	function assertArrayTypeAnnotation(node2, opts) {
		assert("ArrayTypeAnnotation", node2, opts);
	}

	function assertBooleanTypeAnnotation(node2, opts) {
		assert("BooleanTypeAnnotation", node2, opts);
	}

	function assertBooleanLiteralTypeAnnotation(node2, opts) {
		assert("BooleanLiteralTypeAnnotation", node2, opts);
	}

	function assertNullLiteralTypeAnnotation(node2, opts) {
		assert("NullLiteralTypeAnnotation", node2, opts);
	}

	function assertClassImplements(node2, opts) {
		assert("ClassImplements", node2, opts);
	}

	function assertDeclareClass(node2, opts) {
		assert("DeclareClass", node2, opts);
	}

	function assertDeclareFunction(node2, opts) {
		assert("DeclareFunction", node2, opts);
	}

	function assertDeclareInterface(node2, opts) {
		assert("DeclareInterface", node2, opts);
	}

	function assertDeclareModule(node2, opts) {
		assert("DeclareModule", node2, opts);
	}

	function assertDeclareModuleExports(node2, opts) {
		assert("DeclareModuleExports", node2, opts);
	}

	function assertDeclareTypeAlias(node2, opts) {
		assert("DeclareTypeAlias", node2, opts);
	}

	function assertDeclareOpaqueType(node2, opts) {
		assert("DeclareOpaqueType", node2, opts);
	}

	function assertDeclareVariable(node2, opts) {
		assert("DeclareVariable", node2, opts);
	}

	function assertDeclareExportDeclaration(node2, opts) {
		assert("DeclareExportDeclaration", node2, opts);
	}

	function assertDeclareExportAllDeclaration(node2, opts) {
		assert("DeclareExportAllDeclaration", node2, opts);
	}

	function assertDeclaredPredicate(node2, opts) {
		assert("DeclaredPredicate", node2, opts);
	}

	function assertExistsTypeAnnotation(node2, opts) {
		assert("ExistsTypeAnnotation", node2, opts);
	}

	function assertFunctionTypeAnnotation(node2, opts) {
		assert("FunctionTypeAnnotation", node2, opts);
	}

	function assertFunctionTypeParam(node2, opts) {
		assert("FunctionTypeParam", node2, opts);
	}

	function assertGenericTypeAnnotation(node2, opts) {
		assert("GenericTypeAnnotation", node2, opts);
	}

	function assertInferredPredicate(node2, opts) {
		assert("InferredPredicate", node2, opts);
	}

	function assertInterfaceExtends(node2, opts) {
		assert("InterfaceExtends", node2, opts);
	}

	function assertInterfaceDeclaration(node2, opts) {
		assert("InterfaceDeclaration", node2, opts);
	}

	function assertInterfaceTypeAnnotation(node2, opts) {
		assert("InterfaceTypeAnnotation", node2, opts);
	}

	function assertIntersectionTypeAnnotation(node2, opts) {
		assert("IntersectionTypeAnnotation", node2, opts);
	}

	function assertMixedTypeAnnotation(node2, opts) {
		assert("MixedTypeAnnotation", node2, opts);
	}

	function assertEmptyTypeAnnotation(node2, opts) {
		assert("EmptyTypeAnnotation", node2, opts);
	}

	function assertNullableTypeAnnotation(node2, opts) {
		assert("NullableTypeAnnotation", node2, opts);
	}

	function assertNumberLiteralTypeAnnotation(node2, opts) {
		assert("NumberLiteralTypeAnnotation", node2, opts);
	}

	function assertNumberTypeAnnotation(node2, opts) {
		assert("NumberTypeAnnotation", node2, opts);
	}

	function assertObjectTypeAnnotation(node2, opts) {
		assert("ObjectTypeAnnotation", node2, opts);
	}

	function assertObjectTypeInternalSlot(node2, opts) {
		assert("ObjectTypeInternalSlot", node2, opts);
	}

	function assertObjectTypeCallProperty(node2, opts) {
		assert("ObjectTypeCallProperty", node2, opts);
	}

	function assertObjectTypeIndexer(node2, opts) {
		assert("ObjectTypeIndexer", node2, opts);
	}

	function assertObjectTypeProperty(node2, opts) {
		assert("ObjectTypeProperty", node2, opts);
	}

	function assertObjectTypeSpreadProperty(node2, opts) {
		assert("ObjectTypeSpreadProperty", node2, opts);
	}

	function assertOpaqueType(node2, opts) {
		assert("OpaqueType", node2, opts);
	}

	function assertQualifiedTypeIdentifier(node2, opts) {
		assert("QualifiedTypeIdentifier", node2, opts);
	}

	function assertStringLiteralTypeAnnotation(node2, opts) {
		assert("StringLiteralTypeAnnotation", node2, opts);
	}

	function assertStringTypeAnnotation(node2, opts) {
		assert("StringTypeAnnotation", node2, opts);
	}

	function assertSymbolTypeAnnotation(node2, opts) {
		assert("SymbolTypeAnnotation", node2, opts);
	}

	function assertThisTypeAnnotation(node2, opts) {
		assert("ThisTypeAnnotation", node2, opts);
	}

	function assertTupleTypeAnnotation(node2, opts) {
		assert("TupleTypeAnnotation", node2, opts);
	}

	function assertTypeofTypeAnnotation(node2, opts) {
		assert("TypeofTypeAnnotation", node2, opts);
	}

	function assertTypeAlias(node2, opts) {
		assert("TypeAlias", node2, opts);
	}

	function assertTypeAnnotation(node2, opts) {
		assert("TypeAnnotation", node2, opts);
	}

	function assertTypeCastExpression(node2, opts) {
		assert("TypeCastExpression", node2, opts);
	}

	function assertTypeParameter(node2, opts) {
		assert("TypeParameter", node2, opts);
	}

	function assertTypeParameterDeclaration(node2, opts) {
		assert("TypeParameterDeclaration", node2, opts);
	}

	function assertTypeParameterInstantiation(node2, opts) {
		assert("TypeParameterInstantiation", node2, opts);
	}

	function assertUnionTypeAnnotation(node2, opts) {
		assert("UnionTypeAnnotation", node2, opts);
	}

	function assertVariance(node2, opts) {
		assert("Variance", node2, opts);
	}

	function assertVoidTypeAnnotation(node2, opts) {
		assert("VoidTypeAnnotation", node2, opts);
	}

	function assertEnumDeclaration(node2, opts) {
		assert("EnumDeclaration", node2, opts);
	}

	function assertEnumBooleanBody(node2, opts) {
		assert("EnumBooleanBody", node2, opts);
	}

	function assertEnumNumberBody(node2, opts) {
		assert("EnumNumberBody", node2, opts);
	}

	function assertEnumStringBody(node2, opts) {
		assert("EnumStringBody", node2, opts);
	}

	function assertEnumSymbolBody(node2, opts) {
		assert("EnumSymbolBody", node2, opts);
	}

	function assertEnumBooleanMember(node2, opts) {
		assert("EnumBooleanMember", node2, opts);
	}

	function assertEnumNumberMember(node2, opts) {
		assert("EnumNumberMember", node2, opts);
	}

	function assertEnumStringMember(node2, opts) {
		assert("EnumStringMember", node2, opts);
	}

	function assertEnumDefaultedMember(node2, opts) {
		assert("EnumDefaultedMember", node2, opts);
	}

	function assertIndexedAccessType(node2, opts) {
		assert("IndexedAccessType", node2, opts);
	}

	function assertOptionalIndexedAccessType(node2, opts) {
		assert("OptionalIndexedAccessType", node2, opts);
	}

	function assertJSXAttribute(node2, opts) {
		assert("JSXAttribute", node2, opts);
	}

	function assertJSXClosingElement(node2, opts) {
		assert("JSXClosingElement", node2, opts);
	}

	function assertJSXElement(node2, opts) {
		assert("JSXElement", node2, opts);
	}

	function assertJSXEmptyExpression(node2, opts) {
		assert("JSXEmptyExpression", node2, opts);
	}

	function assertJSXExpressionContainer(node2, opts) {
		assert("JSXExpressionContainer", node2, opts);
	}

	function assertJSXSpreadChild(node2, opts) {
		assert("JSXSpreadChild", node2, opts);
	}

	function assertJSXIdentifier(node2, opts) {
		assert("JSXIdentifier", node2, opts);
	}

	function assertJSXMemberExpression(node2, opts) {
		assert("JSXMemberExpression", node2, opts);
	}

	function assertJSXNamespacedName(node2, opts) {
		assert("JSXNamespacedName", node2, opts);
	}

	function assertJSXOpeningElement(node2, opts) {
		assert("JSXOpeningElement", node2, opts);
	}

	function assertJSXSpreadAttribute(node2, opts) {
		assert("JSXSpreadAttribute", node2, opts);
	}

	function assertJSXText(node2, opts) {
		assert("JSXText", node2, opts);
	}

	function assertJSXFragment(node2, opts) {
		assert("JSXFragment", node2, opts);
	}

	function assertJSXOpeningFragment(node2, opts) {
		assert("JSXOpeningFragment", node2, opts);
	}

	function assertJSXClosingFragment(node2, opts) {
		assert("JSXClosingFragment", node2, opts);
	}

	function assertNoop(node2, opts) {
		assert("Noop", node2, opts);
	}

	function assertPlaceholder(node2, opts) {
		assert("Placeholder", node2, opts);
	}

	function assertV8IntrinsicIdentifier(node2, opts) {
		assert("V8IntrinsicIdentifier", node2, opts);
	}

	function assertArgumentPlaceholder(node2, opts) {
		assert("ArgumentPlaceholder", node2, opts);
	}

	function assertBindExpression(node2, opts) {
		assert("BindExpression", node2, opts);
	}

	function assertImportAttribute(node2, opts) {
		assert("ImportAttribute", node2, opts);
	}

	function assertDecorator(node2, opts) {
		assert("Decorator", node2, opts);
	}

	function assertDoExpression(node2, opts) {
		assert("DoExpression", node2, opts);
	}

	function assertExportDefaultSpecifier(node2, opts) {
		assert("ExportDefaultSpecifier", node2, opts);
	}

	function assertRecordExpression(node2, opts) {
		assert("RecordExpression", node2, opts);
	}

	function assertTupleExpression(node2, opts) {
		assert("TupleExpression", node2, opts);
	}

	function assertDecimalLiteral(node2, opts) {
		assert("DecimalLiteral", node2, opts);
	}

	function assertModuleExpression(node2, opts) {
		assert("ModuleExpression", node2, opts);
	}

	function assertTopicReference(node2, opts) {
		assert("TopicReference", node2, opts);
	}

	function assertPipelineTopicExpression(node2, opts) {
		assert("PipelineTopicExpression", node2, opts);
	}

	function assertPipelineBareFunction(node2, opts) {
		assert("PipelineBareFunction", node2, opts);
	}

	function assertPipelinePrimaryTopicReference(node2, opts) {
		assert("PipelinePrimaryTopicReference", node2, opts);
	}

	function assertTSParameterProperty(node2, opts) {
		assert("TSParameterProperty", node2, opts);
	}

	function assertTSDeclareFunction(node2, opts) {
		assert("TSDeclareFunction", node2, opts);
	}

	function assertTSDeclareMethod(node2, opts) {
		assert("TSDeclareMethod", node2, opts);
	}

	function assertTSQualifiedName(node2, opts) {
		assert("TSQualifiedName", node2, opts);
	}

	function assertTSCallSignatureDeclaration(node2, opts) {
		assert("TSCallSignatureDeclaration", node2, opts);
	}

	function assertTSConstructSignatureDeclaration(node2, opts) {
		assert("TSConstructSignatureDeclaration", node2, opts);
	}

	function assertTSPropertySignature(node2, opts) {
		assert("TSPropertySignature", node2, opts);
	}

	function assertTSMethodSignature(node2, opts) {
		assert("TSMethodSignature", node2, opts);
	}

	function assertTSIndexSignature(node2, opts) {
		assert("TSIndexSignature", node2, opts);
	}

	function assertTSAnyKeyword(node2, opts) {
		assert("TSAnyKeyword", node2, opts);
	}

	function assertTSBooleanKeyword(node2, opts) {
		assert("TSBooleanKeyword", node2, opts);
	}

	function assertTSBigIntKeyword(node2, opts) {
		assert("TSBigIntKeyword", node2, opts);
	}

	function assertTSIntrinsicKeyword(node2, opts) {
		assert("TSIntrinsicKeyword", node2, opts);
	}

	function assertTSNeverKeyword(node2, opts) {
		assert("TSNeverKeyword", node2, opts);
	}

	function assertTSNullKeyword(node2, opts) {
		assert("TSNullKeyword", node2, opts);
	}

	function assertTSNumberKeyword(node2, opts) {
		assert("TSNumberKeyword", node2, opts);
	}

	function assertTSObjectKeyword(node2, opts) {
		assert("TSObjectKeyword", node2, opts);
	}

	function assertTSStringKeyword(node2, opts) {
		assert("TSStringKeyword", node2, opts);
	}

	function assertTSSymbolKeyword(node2, opts) {
		assert("TSSymbolKeyword", node2, opts);
	}

	function assertTSUndefinedKeyword(node2, opts) {
		assert("TSUndefinedKeyword", node2, opts);
	}

	function assertTSUnknownKeyword(node2, opts) {
		assert("TSUnknownKeyword", node2, opts);
	}

	function assertTSVoidKeyword(node2, opts) {
		assert("TSVoidKeyword", node2, opts);
	}

	function assertTSThisType(node2, opts) {
		assert("TSThisType", node2, opts);
	}

	function assertTSFunctionType(node2, opts) {
		assert("TSFunctionType", node2, opts);
	}

	function assertTSConstructorType(node2, opts) {
		assert("TSConstructorType", node2, opts);
	}

	function assertTSTypeReference(node2, opts) {
		assert("TSTypeReference", node2, opts);
	}

	function assertTSTypePredicate(node2, opts) {
		assert("TSTypePredicate", node2, opts);
	}

	function assertTSTypeQuery(node2, opts) {
		assert("TSTypeQuery", node2, opts);
	}

	function assertTSTypeLiteral(node2, opts) {
		assert("TSTypeLiteral", node2, opts);
	}

	function assertTSArrayType(node2, opts) {
		assert("TSArrayType", node2, opts);
	}

	function assertTSTupleType(node2, opts) {
		assert("TSTupleType", node2, opts);
	}

	function assertTSOptionalType(node2, opts) {
		assert("TSOptionalType", node2, opts);
	}

	function assertTSRestType(node2, opts) {
		assert("TSRestType", node2, opts);
	}

	function assertTSNamedTupleMember(node2, opts) {
		assert("TSNamedTupleMember", node2, opts);
	}

	function assertTSUnionType(node2, opts) {
		assert("TSUnionType", node2, opts);
	}

	function assertTSIntersectionType(node2, opts) {
		assert("TSIntersectionType", node2, opts);
	}

	function assertTSConditionalType(node2, opts) {
		assert("TSConditionalType", node2, opts);
	}

	function assertTSInferType(node2, opts) {
		assert("TSInferType", node2, opts);
	}

	function assertTSParenthesizedType(node2, opts) {
		assert("TSParenthesizedType", node2, opts);
	}

	function assertTSTypeOperator(node2, opts) {
		assert("TSTypeOperator", node2, opts);
	}

	function assertTSIndexedAccessType(node2, opts) {
		assert("TSIndexedAccessType", node2, opts);
	}

	function assertTSMappedType(node2, opts) {
		assert("TSMappedType", node2, opts);
	}

	function assertTSTemplateLiteralType(node2, opts) {
		assert("TSTemplateLiteralType", node2, opts);
	}

	function assertTSLiteralType(node2, opts) {
		assert("TSLiteralType", node2, opts);
	}

	function assertTSExpressionWithTypeArguments(node2, opts) {
		assert("TSExpressionWithTypeArguments", node2, opts);
	}

	function assertTSInterfaceDeclaration(node2, opts) {
		assert("TSInterfaceDeclaration", node2, opts);
	}

	function assertTSInterfaceBody(node2, opts) {
		assert("TSInterfaceBody", node2, opts);
	}

	function assertTSTypeAliasDeclaration(node2, opts) {
		assert("TSTypeAliasDeclaration", node2, opts);
	}

	function assertTSInstantiationExpression(node2, opts) {
		assert("TSInstantiationExpression", node2, opts);
	}

	function assertTSAsExpression(node2, opts) {
		assert("TSAsExpression", node2, opts);
	}

	function assertTSSatisfiesExpression(node2, opts) {
		assert("TSSatisfiesExpression", node2, opts);
	}

	function assertTSTypeAssertion(node2, opts) {
		assert("TSTypeAssertion", node2, opts);
	}

	function assertTSEnumBody(node2, opts) {
		assert("TSEnumBody", node2, opts);
	}

	function assertTSEnumDeclaration(node2, opts) {
		assert("TSEnumDeclaration", node2, opts);
	}

	function assertTSEnumMember(node2, opts) {
		assert("TSEnumMember", node2, opts);
	}

	function assertTSModuleDeclaration(node2, opts) {
		assert("TSModuleDeclaration", node2, opts);
	}

	function assertTSModuleBlock(node2, opts) {
		assert("TSModuleBlock", node2, opts);
	}

	function assertTSImportType(node2, opts) {
		assert("TSImportType", node2, opts);
	}

	function assertTSImportEqualsDeclaration(node2, opts) {
		assert("TSImportEqualsDeclaration", node2, opts);
	}

	function assertTSExternalModuleReference(node2, opts) {
		assert("TSExternalModuleReference", node2, opts);
	}

	function assertTSNonNullExpression(node2, opts) {
		assert("TSNonNullExpression", node2, opts);
	}

	function assertTSExportAssignment(node2, opts) {
		assert("TSExportAssignment", node2, opts);
	}

	function assertTSNamespaceExportDeclaration(node2, opts) {
		assert("TSNamespaceExportDeclaration", node2, opts);
	}

	function assertTSTypeAnnotation(node2, opts) {
		assert("TSTypeAnnotation", node2, opts);
	}

	function assertTSTypeParameterInstantiation(node2, opts) {
		assert("TSTypeParameterInstantiation", node2, opts);
	}

	function assertTSTypeParameterDeclaration(node2, opts) {
		assert("TSTypeParameterDeclaration", node2, opts);
	}

	function assertTSTypeParameter(node2, opts) {
		assert("TSTypeParameter", node2, opts);
	}

	function assertStandardized(node2, opts) {
		assert("Standardized", node2, opts);
	}

	function assertExpression(node2, opts) {
		assert("Expression", node2, opts);
	}

	function assertBinary(node2, opts) {
		assert("Binary", node2, opts);
	}

	function assertScopable(node2, opts) {
		assert("Scopable", node2, opts);
	}

	function assertBlockParent(node2, opts) {
		assert("BlockParent", node2, opts);
	}

	function assertBlock(node2, opts) {
		assert("Block", node2, opts);
	}

	function assertStatement(node2, opts) {
		assert("Statement", node2, opts);
	}

	function assertTerminatorless(node2, opts) {
		assert("Terminatorless", node2, opts);
	}

	function assertCompletionStatement(node2, opts) {
		assert("CompletionStatement", node2, opts);
	}

	function assertConditional(node2, opts) {
		assert("Conditional", node2, opts);
	}

	function assertLoop(node2, opts) {
		assert("Loop", node2, opts);
	}

	function assertWhile(node2, opts) {
		assert("While", node2, opts);
	}

	function assertExpressionWrapper(node2, opts) {
		assert("ExpressionWrapper", node2, opts);
	}

	function assertFor(node2, opts) {
		assert("For", node2, opts);
	}

	function assertForXStatement(node2, opts) {
		assert("ForXStatement", node2, opts);
	}

	function assertFunction(node2, opts) {
		assert("Function", node2, opts);
	}

	function assertFunctionParent(node2, opts) {
		assert("FunctionParent", node2, opts);
	}

	function assertPureish(node2, opts) {
		assert("Pureish", node2, opts);
	}

	function assertDeclaration(node2, opts) {
		assert("Declaration", node2, opts);
	}

	function assertPatternLike(node2, opts) {
		assert("PatternLike", node2, opts);
	}

	function assertLVal(node2, opts) {
		assert("LVal", node2, opts);
	}

	function assertTSEntityName(node2, opts) {
		assert("TSEntityName", node2, opts);
	}

	function assertLiteral(node2, opts) {
		assert("Literal", node2, opts);
	}

	function assertImmutable(node2, opts) {
		assert("Immutable", node2, opts);
	}

	function assertUserWhitespacable(node2, opts) {
		assert("UserWhitespacable", node2, opts);
	}

	function assertMethod(node2, opts) {
		assert("Method", node2, opts);
	}

	function assertObjectMember(node2, opts) {
		assert("ObjectMember", node2, opts);
	}

	function assertProperty(node2, opts) {
		assert("Property", node2, opts);
	}

	function assertUnaryLike(node2, opts) {
		assert("UnaryLike", node2, opts);
	}

	function assertPattern(node2, opts) {
		assert("Pattern", node2, opts);
	}

	function assertClass(node2, opts) {
		assert("Class", node2, opts);
	}

	function assertImportOrExportDeclaration(node2, opts) {
		assert("ImportOrExportDeclaration", node2, opts);
	}

	function assertExportDeclaration(node2, opts) {
		assert("ExportDeclaration", node2, opts);
	}

	function assertModuleSpecifier(node2, opts) {
		assert("ModuleSpecifier", node2, opts);
	}

	function assertAccessor(node2, opts) {
		assert("Accessor", node2, opts);
	}

	function assertPrivate(node2, opts) {
		assert("Private", node2, opts);
	}

	function assertFlow(node2, opts) {
		assert("Flow", node2, opts);
	}

	function assertFlowType(node2, opts) {
		assert("FlowType", node2, opts);
	}

	function assertFlowBaseAnnotation(node2, opts) {
		assert("FlowBaseAnnotation", node2, opts);
	}

	function assertFlowDeclaration(node2, opts) {
		assert("FlowDeclaration", node2, opts);
	}

	function assertFlowPredicate(node2, opts) {
		assert("FlowPredicate", node2, opts);
	}

	function assertEnumBody(node2, opts) {
		assert("EnumBody", node2, opts);
	}

	function assertEnumMember(node2, opts) {
		assert("EnumMember", node2, opts);
	}

	function assertJSX(node2, opts) {
		assert("JSX", node2, opts);
	}

	function assertMiscellaneous(node2, opts) {
		assert("Miscellaneous", node2, opts);
	}

	function assertTypeScript(node2, opts) {
		assert("TypeScript", node2, opts);
	}

	function assertTSTypeElement(node2, opts) {
		assert("TSTypeElement", node2, opts);
	}

	function assertTSType(node2, opts) {
		assert("TSType", node2, opts);
	}

	function assertTSBaseType(node2, opts) {
		assert("TSBaseType", node2, opts);
	}

	function assertNumberLiteral(node2, opts) {
		(0, _deprecationWarning.default)("assertNumberLiteral", "assertNumericLiteral");
		assert("NumberLiteral", node2, opts);
	}

	function assertRegexLiteral(node2, opts) {
		(0, _deprecationWarning.default)("assertRegexLiteral", "assertRegExpLiteral");
		assert("RegexLiteral", node2, opts);
	}

	function assertRestProperty(node2, opts) {
		(0, _deprecationWarning.default)("assertRestProperty", "assertRestElement");
		assert("RestProperty", node2, opts);
	}

	function assertSpreadProperty(node2, opts) {
		(0, _deprecationWarning.default)("assertSpreadProperty", "assertSpreadElement");
		assert("SpreadProperty", node2, opts);
	}

	function assertModuleDeclaration(node2, opts) {
		(0, _deprecationWarning.default)("assertModuleDeclaration", "assertImportOrExportDeclaration");
		assert("ModuleDeclaration", node2, opts);
	}

	var createTypeAnnotationBasedOnTypeof$1 = {};
	Object.defineProperty(createTypeAnnotationBasedOnTypeof$1, "__esModule", {
		value: true
	});
	createTypeAnnotationBasedOnTypeof$1.default = void 0;
	var _index$z = generated$2;
	createTypeAnnotationBasedOnTypeof$1.default = createTypeAnnotationBasedOnTypeof;

	function createTypeAnnotationBasedOnTypeof(type) {
		switch (type) {
			case "string":
				return (0, _index$z.stringTypeAnnotation)();
			case "number":
				return (0, _index$z.numberTypeAnnotation)();
			case "undefined":
				return (0, _index$z.voidTypeAnnotation)();
			case "boolean":
				return (0, _index$z.booleanTypeAnnotation)();
			case "function":
				return (0, _index$z.genericTypeAnnotation)((0, _index$z.identifier)("Function"));
			case "object":
				return (0, _index$z.genericTypeAnnotation)((0, _index$z.identifier)("Object"));
			case "symbol":
				return (0, _index$z.genericTypeAnnotation)((0, _index$z.identifier)("Symbol"));
			case "bigint":
				return (0, _index$z.anyTypeAnnotation)();
		}
		throw new Error("Invalid typeof value: " + type);
	}

	var createFlowUnionType$1 = {};
	var removeTypeDuplicates$3 = {};
	Object.defineProperty(removeTypeDuplicates$3, "__esModule", {
		value: true
	});
	removeTypeDuplicates$3.default = removeTypeDuplicates$2;
	var _index$y = generated$3;

	function getQualifiedName$1(node2) {
		return (0, _index$y.isIdentifier)(node2) ? node2.name : `${node2.id.name}.${getQualifiedName$1(node2.qualification)}`;
	}

	function removeTypeDuplicates$2(nodesIn) {
		const nodes2 = Array.from(nodesIn);
		const generics = /* @__PURE__ */ new Map();
		const bases = /* @__PURE__ */ new Map();
		const typeGroups = /* @__PURE__ */ new Set();
		const types2 = [];
		for (let i = 0; i < nodes2.length; i++) {
			const node2 = nodes2[i];
			if (!node2)
				continue;
			if (types2.includes(node2)) {
				continue;
			}
			if ((0, _index$y.isAnyTypeAnnotation)(node2)) {
				return [node2];
			}
			if ((0, _index$y.isFlowBaseAnnotation)(node2)) {
				bases.set(node2.type, node2);
				continue;
			}
			if ((0, _index$y.isUnionTypeAnnotation)(node2)) {
				if (!typeGroups.has(node2.types)) {
					nodes2.push(...node2.types);
					typeGroups.add(node2.types);
				}
				continue;
			}
			if ((0, _index$y.isGenericTypeAnnotation)(node2)) {
				const name = getQualifiedName$1(node2.id);
				if (generics.has(name)) {
					let existing = generics.get(name);
					if (existing.typeParameters) {
						if (node2.typeParameters) {
							existing.typeParameters.params.push(...node2.typeParameters.params);
							existing.typeParameters.params = removeTypeDuplicates$2(existing.typeParameters.params);
						}
					} else {
						existing = node2.typeParameters;
					}
				} else {
					generics.set(name, node2);
				}
				continue;
			}
			types2.push(node2);
		}
		for (const [, baseType] of bases) {
			types2.push(baseType);
		}
		for (const [, genericName] of generics) {
			types2.push(genericName);
		}
		return types2;
	}

	Object.defineProperty(createFlowUnionType$1, "__esModule", {
		value: true
	});
	createFlowUnionType$1.default = createFlowUnionType;
	var _index$x = generated$2;
	var _removeTypeDuplicates$1 = removeTypeDuplicates$3;

	function createFlowUnionType(types2) {
		const flattened = (0, _removeTypeDuplicates$1.default)(types2);
		if (flattened.length === 1) {
			return flattened[0];
		} else {
			return (0, _index$x.unionTypeAnnotation)(flattened);
		}
	}

	var createTSUnionType$1 = {};
	var removeTypeDuplicates$1 = {};
	Object.defineProperty(removeTypeDuplicates$1, "__esModule", {
		value: true
	});
	removeTypeDuplicates$1.default = removeTypeDuplicates;
	var _index$w = generated$3;

	function getQualifiedName(node2) {
		return (0, _index$w.isIdentifier)(node2) ? node2.name : (0, _index$w.isThisExpression)(node2) ? "this" : `${node2.right.name}.${getQualifiedName(node2.left)}`;
	}

	function removeTypeDuplicates(nodesIn) {
		const nodes2 = Array.from(nodesIn);
		const generics = /* @__PURE__ */ new Map();
		const bases = /* @__PURE__ */ new Map();
		const typeGroups = /* @__PURE__ */ new Set();
		const types2 = [];
		for (let i = 0; i < nodes2.length; i++) {
			const node2 = nodes2[i];
			if (!node2)
				continue;
			if (types2.includes(node2)) {
				continue;
			}
			if ((0, _index$w.isTSAnyKeyword)(node2)) {
				return [node2];
			}
			if ((0, _index$w.isTSBaseType)(node2)) {
				bases.set(node2.type, node2);
				continue;
			}
			if ((0, _index$w.isTSUnionType)(node2)) {
				if (!typeGroups.has(node2.types)) {
					nodes2.push(...node2.types);
					typeGroups.add(node2.types);
				}
				continue;
			}
			const typeArgumentsKey = "typeParameters";
			if ((0, _index$w.isTSTypeReference)(node2) && node2[typeArgumentsKey]) {
				const typeArguments = node2[typeArgumentsKey];
				const name = getQualifiedName(node2.typeName);
				if (generics.has(name)) {
					let existing = generics.get(name);
					const existingTypeArguments = existing[typeArgumentsKey];
					if (existingTypeArguments) {
						existingTypeArguments.params.push(...typeArguments.params);
						existingTypeArguments.params = removeTypeDuplicates(existingTypeArguments.params);
					} else {
						existing = typeArguments;
					}
				} else {
					generics.set(name, node2);
				}
				continue;
			}
			types2.push(node2);
		}
		for (const [, baseType] of bases) {
			types2.push(baseType);
		}
		for (const [, genericName] of generics) {
			types2.push(genericName);
		}
		return types2;
	}

	Object.defineProperty(createTSUnionType$1, "__esModule", {
		value: true
	});
	createTSUnionType$1.default = createTSUnionType;
	var _index$v = generated$2;
	var _removeTypeDuplicates = removeTypeDuplicates$1;
	var _index2$8 = generated$3;

	function createTSUnionType(typeAnnotations) {
		const types2 = typeAnnotations.map((type) => {
			return (0, _index2$8.isTSTypeAnnotation)(type) ? type.typeAnnotation : type;
		});
		const flattened = (0, _removeTypeDuplicates.default)(types2);
		if (flattened.length === 1) {
			return flattened[0];
		} else {
			return (0, _index$v.tsUnionType)(flattened);
		}
	}

	var productions = {};
	Object.defineProperty(productions, "__esModule", {
		value: true
	});
	productions.buildUndefinedNode = buildUndefinedNode;
	var _index$u = generated$2;

	function buildUndefinedNode() {
		return (0, _index$u.unaryExpression)("void", (0, _index$u.numericLiteral)(0), true);
	}

	var cloneNode$1 = {};
	Object.defineProperty(cloneNode$1, "__esModule", {
		value: true
	});
	cloneNode$1.default = cloneNode;
	var _index$t = definitions;
	var _index2$7 = generated$3;
	const {
		hasOwn
	} = {
		hasOwn: Function.call.bind(Object.prototype.hasOwnProperty)
	};

	function cloneIfNode(obj, deep, withoutLoc, commentsCache) {
		if (obj && typeof obj.type === "string") {
			return cloneNodeInternal(obj, deep, withoutLoc, commentsCache);
		}
		return obj;
	}

	function cloneIfNodeOrArray(obj, deep, withoutLoc, commentsCache) {
		if (Array.isArray(obj)) {
			return obj.map((node2) => cloneIfNode(node2, deep, withoutLoc, commentsCache));
		}
		return cloneIfNode(obj, deep, withoutLoc, commentsCache);
	}

	function cloneNode(node2, deep = true, withoutLoc = false) {
		return cloneNodeInternal(node2, deep, withoutLoc, /* @__PURE__ */ new Map());
	}

	function cloneNodeInternal(node2, deep = true, withoutLoc = false, commentsCache) {
		if (!node2)
			return node2;
		const {
			type
		} = node2;
		const newNode = {
			type: node2.type
		};
		if ((0, _index2$7.isIdentifier)(node2)) {
			newNode.name = node2.name;
			if (hasOwn(node2, "optional") && typeof node2.optional === "boolean") {
				newNode.optional = node2.optional;
			}
			if (hasOwn(node2, "typeAnnotation")) {
				newNode.typeAnnotation = deep ? cloneIfNodeOrArray(node2.typeAnnotation, true, withoutLoc, commentsCache) : node2.typeAnnotation;
			}
			if (hasOwn(node2, "decorators")) {
				newNode.decorators = deep ? cloneIfNodeOrArray(node2.decorators, true, withoutLoc, commentsCache) : node2.decorators;
			}
		} else if (!hasOwn(_index$t.NODE_FIELDS, type)) {
			throw new Error(`Unknown node type: "${type}"`);
		} else {
			for (const field of Object.keys(_index$t.NODE_FIELDS[type])) {
				if (hasOwn(node2, field)) {
					if (deep) {
						newNode[field] = (0, _index2$7.isFile)(node2) && field === "comments" ? maybeCloneComments(node2.comments, deep, withoutLoc, commentsCache) : cloneIfNodeOrArray(node2[field], true, withoutLoc, commentsCache);
					} else {
						newNode[field] = node2[field];
					}
				}
			}
		}
		if (hasOwn(node2, "loc")) {
			if (withoutLoc) {
				newNode.loc = null;
			} else {
				newNode.loc = node2.loc;
			}
		}
		if (hasOwn(node2, "leadingComments")) {
			newNode.leadingComments = maybeCloneComments(node2.leadingComments, deep, withoutLoc, commentsCache);
		}
		if (hasOwn(node2, "innerComments")) {
			newNode.innerComments = maybeCloneComments(node2.innerComments, deep, withoutLoc, commentsCache);
		}
		if (hasOwn(node2, "trailingComments")) {
			newNode.trailingComments = maybeCloneComments(node2.trailingComments, deep, withoutLoc, commentsCache);
		}
		if (hasOwn(node2, "extra")) {
			newNode.extra = Object.assign({}, node2.extra);
		}
		return newNode;
	}

	function maybeCloneComments(comments, deep, withoutLoc, commentsCache) {
		if (!comments || !deep) {
			return comments;
		}
		return comments.map((comment) => {
			const cache = commentsCache.get(comment);
			if (cache)
				return cache;
			const {
				type,
				value,
				loc
			} = comment;
			const ret = {
				type,
				value,
				loc
			};
			if (withoutLoc) {
				ret.loc = null;
			}
			commentsCache.set(comment, ret);
			return ret;
		});
	}

	var clone$1 = {};
	Object.defineProperty(clone$1, "__esModule", {
		value: true
	});
	clone$1.default = clone;
	var _cloneNode$5 = cloneNode$1;

	function clone(node2) {
		return (0, _cloneNode$5.default)(node2, false);
	}

	var cloneDeep$1 = {};
	Object.defineProperty(cloneDeep$1, "__esModule", {
		value: true
	});
	cloneDeep$1.default = cloneDeep;
	var _cloneNode$4 = cloneNode$1;

	function cloneDeep(node2) {
		return (0, _cloneNode$4.default)(node2);
	}

	var cloneDeepWithoutLoc$1 = {};
	Object.defineProperty(cloneDeepWithoutLoc$1, "__esModule", {
		value: true
	});
	cloneDeepWithoutLoc$1.default = cloneDeepWithoutLoc;
	var _cloneNode$3 = cloneNode$1;

	function cloneDeepWithoutLoc(node2) {
		return (0, _cloneNode$3.default)(node2, true, true);
	}

	var cloneWithoutLoc$1 = {};
	Object.defineProperty(cloneWithoutLoc$1, "__esModule", {
		value: true
	});
	cloneWithoutLoc$1.default = cloneWithoutLoc;
	var _cloneNode$2 = cloneNode$1;

	function cloneWithoutLoc(node2) {
		return (0, _cloneNode$2.default)(node2, false, true);
	}

	var addComment$1 = {};
	var addComments$1 = {};
	Object.defineProperty(addComments$1, "__esModule", {
		value: true
	});
	addComments$1.default = addComments;

	function addComments(node2, type, comments) {
		if (!comments || !node2)
			return node2;
		const key = `${type}Comments`;
		if (node2[key]) {
			if (type === "leading") {
				node2[key] = comments.concat(node2[key]);
			} else {
				node2[key].push(...comments);
			}
		} else {
			node2[key] = comments;
		}
		return node2;
	}

	Object.defineProperty(addComment$1, "__esModule", {
		value: true
	});
	addComment$1.default = addComment;
	var _addComments = addComments$1;

	function addComment(node2, type, content, line) {
		return (0, _addComments.default)(node2, type, [{
			type: line ? "CommentLine" : "CommentBlock",
			value: content
		}]);
	}

	var inheritInnerComments$1 = {};
	var inherit$1 = {};
	Object.defineProperty(inherit$1, "__esModule", {
		value: true
	});
	inherit$1.default = inherit;

	function inherit(key, child, parent) {
		if (child && parent) {
			child[key] = Array.from(new Set([].concat(child[key], parent[key]).filter(Boolean)));
		}
	}

	Object.defineProperty(inheritInnerComments$1, "__esModule", {
		value: true
	});
	inheritInnerComments$1.default = inheritInnerComments;
	var _inherit$2 = inherit$1;

	function inheritInnerComments(child, parent) {
		(0, _inherit$2.default)("innerComments", child, parent);
	}

	var inheritLeadingComments$1 = {};
	Object.defineProperty(inheritLeadingComments$1, "__esModule", {
		value: true
	});
	inheritLeadingComments$1.default = inheritLeadingComments;
	var _inherit$1 = inherit$1;

	function inheritLeadingComments(child, parent) {
		(0, _inherit$1.default)("leadingComments", child, parent);
	}

	var inheritsComments$1 = {};
	var inheritTrailingComments$1 = {};
	Object.defineProperty(inheritTrailingComments$1, "__esModule", {
		value: true
	});
	inheritTrailingComments$1.default = inheritTrailingComments;
	var _inherit = inherit$1;

	function inheritTrailingComments(child, parent) {
		(0, _inherit.default)("trailingComments", child, parent);
	}

	Object.defineProperty(inheritsComments$1, "__esModule", {
		value: true
	});
	inheritsComments$1.default = inheritsComments;
	var _inheritTrailingComments = inheritTrailingComments$1;
	var _inheritLeadingComments = inheritLeadingComments$1;
	var _inheritInnerComments = inheritInnerComments$1;

	function inheritsComments(child, parent) {
		(0, _inheritTrailingComments.default)(child, parent);
		(0, _inheritLeadingComments.default)(child, parent);
		(0, _inheritInnerComments.default)(child, parent);
		return child;
	}

	var removeComments$1 = {};
	Object.defineProperty(removeComments$1, "__esModule", {
		value: true
	});
	removeComments$1.default = removeComments;
	var _index$s = constants;

	function removeComments(node2) {
		_index$s.COMMENT_KEYS.forEach((key) => {
			node2[key] = null;
		});
		return node2;
	}

	var generated = {};
	Object.defineProperty(generated, "__esModule", {
		value: true
	});
	generated.WHILE_TYPES = generated.USERWHITESPACABLE_TYPES = generated.UNARYLIKE_TYPES = generated.TYPESCRIPT_TYPES = generated.TSTYPE_TYPES = generated.TSTYPEELEMENT_TYPES = generated.TSENTITYNAME_TYPES = generated.TSBASETYPE_TYPES = generated.TERMINATORLESS_TYPES = generated.STATEMENT_TYPES = generated.STANDARDIZED_TYPES = generated.SCOPABLE_TYPES = generated.PUREISH_TYPES = generated.PROPERTY_TYPES = generated.PRIVATE_TYPES = generated.PATTERN_TYPES = generated.PATTERNLIKE_TYPES = generated.OBJECTMEMBER_TYPES = generated.MODULESPECIFIER_TYPES = generated.MODULEDECLARATION_TYPES = generated.MISCELLANEOUS_TYPES = generated.METHOD_TYPES = generated.LVAL_TYPES = generated.LOOP_TYPES = generated.LITERAL_TYPES = generated.JSX_TYPES = generated.IMPORTOREXPORTDECLARATION_TYPES = generated.IMMUTABLE_TYPES = generated.FUNCTION_TYPES = generated.FUNCTIONPARENT_TYPES = generated.FOR_TYPES = generated.FORXSTATEMENT_TYPES = generated.FLOW_TYPES = generated.FLOWTYPE_TYPES = generated.FLOWPREDICATE_TYPES = generated.FLOWDECLARATION_TYPES = generated.FLOWBASEANNOTATION_TYPES = generated.EXPRESSION_TYPES = generated.EXPRESSIONWRAPPER_TYPES = generated.EXPORTDECLARATION_TYPES = generated.ENUMMEMBER_TYPES = generated.ENUMBODY_TYPES = generated.DECLARATION_TYPES = generated.CONDITIONAL_TYPES = generated.COMPLETIONSTATEMENT_TYPES = generated.CLASS_TYPES = generated.BLOCK_TYPES = generated.BLOCKPARENT_TYPES = generated.BINARY_TYPES = generated.ACCESSOR_TYPES = void 0;
	var _index$r = definitions;
	generated.STANDARDIZED_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Standardized"];
	generated.EXPRESSION_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Expression"];
	generated.BINARY_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Binary"];
	generated.SCOPABLE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Scopable"];
	generated.BLOCKPARENT_TYPES = _index$r.FLIPPED_ALIAS_KEYS["BlockParent"];
	generated.BLOCK_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Block"];
	generated.STATEMENT_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Statement"];
	generated.TERMINATORLESS_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Terminatorless"];
	generated.COMPLETIONSTATEMENT_TYPES = _index$r.FLIPPED_ALIAS_KEYS["CompletionStatement"];
	generated.CONDITIONAL_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Conditional"];
	generated.LOOP_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Loop"];
	generated.WHILE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["While"];
	generated.EXPRESSIONWRAPPER_TYPES = _index$r.FLIPPED_ALIAS_KEYS["ExpressionWrapper"];
	generated.FOR_TYPES = _index$r.FLIPPED_ALIAS_KEYS["For"];
	generated.FORXSTATEMENT_TYPES = _index$r.FLIPPED_ALIAS_KEYS["ForXStatement"];
	generated.FUNCTION_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Function"];
	generated.FUNCTIONPARENT_TYPES = _index$r.FLIPPED_ALIAS_KEYS["FunctionParent"];
	generated.PUREISH_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Pureish"];
	generated.DECLARATION_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Declaration"];
	generated.PATTERNLIKE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["PatternLike"];
	generated.LVAL_TYPES = _index$r.FLIPPED_ALIAS_KEYS["LVal"];
	generated.TSENTITYNAME_TYPES = _index$r.FLIPPED_ALIAS_KEYS["TSEntityName"];
	generated.LITERAL_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Literal"];
	generated.IMMUTABLE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Immutable"];
	generated.USERWHITESPACABLE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["UserWhitespacable"];
	generated.METHOD_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Method"];
	generated.OBJECTMEMBER_TYPES = _index$r.FLIPPED_ALIAS_KEYS["ObjectMember"];
	generated.PROPERTY_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Property"];
	generated.UNARYLIKE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["UnaryLike"];
	generated.PATTERN_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Pattern"];
	generated.CLASS_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Class"];
	const IMPORTOREXPORTDECLARATION_TYPES = generated.IMPORTOREXPORTDECLARATION_TYPES = _index$r.FLIPPED_ALIAS_KEYS["ImportOrExportDeclaration"];
	generated.EXPORTDECLARATION_TYPES = _index$r.FLIPPED_ALIAS_KEYS["ExportDeclaration"];
	generated.MODULESPECIFIER_TYPES = _index$r.FLIPPED_ALIAS_KEYS["ModuleSpecifier"];
	generated.ACCESSOR_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Accessor"];
	generated.PRIVATE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Private"];
	generated.FLOW_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Flow"];
	generated.FLOWTYPE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["FlowType"];
	generated.FLOWBASEANNOTATION_TYPES = _index$r.FLIPPED_ALIAS_KEYS["FlowBaseAnnotation"];
	generated.FLOWDECLARATION_TYPES = _index$r.FLIPPED_ALIAS_KEYS["FlowDeclaration"];
	generated.FLOWPREDICATE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["FlowPredicate"];
	generated.ENUMBODY_TYPES = _index$r.FLIPPED_ALIAS_KEYS["EnumBody"];
	generated.ENUMMEMBER_TYPES = _index$r.FLIPPED_ALIAS_KEYS["EnumMember"];
	generated.JSX_TYPES = _index$r.FLIPPED_ALIAS_KEYS["JSX"];
	generated.MISCELLANEOUS_TYPES = _index$r.FLIPPED_ALIAS_KEYS["Miscellaneous"];
	generated.TYPESCRIPT_TYPES = _index$r.FLIPPED_ALIAS_KEYS["TypeScript"];
	generated.TSTYPEELEMENT_TYPES = _index$r.FLIPPED_ALIAS_KEYS["TSTypeElement"];
	generated.TSTYPE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["TSType"];
	generated.TSBASETYPE_TYPES = _index$r.FLIPPED_ALIAS_KEYS["TSBaseType"];
	generated.MODULEDECLARATION_TYPES = IMPORTOREXPORTDECLARATION_TYPES;
	var ensureBlock$1 = {};
	var toBlock$1 = {};
	Object.defineProperty(toBlock$1, "__esModule", {
		value: true
	});
	toBlock$1.default = toBlock;
	var _index$q = generated$3;
	var _index2$6 = generated$2;

	function toBlock(node2, parent) {
		if ((0, _index$q.isBlockStatement)(node2)) {
			return node2;
		}
		let blockNodes = [];
		if ((0, _index$q.isEmptyStatement)(node2)) {
			blockNodes = [];
		} else {
			if (!(0, _index$q.isStatement)(node2)) {
				if ((0, _index$q.isFunction)(parent)) {
					node2 = (0, _index2$6.returnStatement)(node2);
				} else {
					node2 = (0, _index2$6.expressionStatement)(node2);
				}
			}
			blockNodes = [node2];
		}
		return (0, _index2$6.blockStatement)(blockNodes);
	}

	Object.defineProperty(ensureBlock$1, "__esModule", {
		value: true
	});
	ensureBlock$1.default = ensureBlock;
	var _toBlock = toBlock$1;

	function ensureBlock(node2, key = "body") {
		const result = (0, _toBlock.default)(node2[key], node2);
		node2[key] = result;
		return result;
	}

	var toBindingIdentifierName$1 = {};
	var toIdentifier$1 = {};
	Object.defineProperty(toIdentifier$1, "__esModule", {
		value: true
	});
	toIdentifier$1.default = toIdentifier;
	var _isValidIdentifier$2 = isValidIdentifier$1;
	var _helperValidatorIdentifier = lib$1;

	function toIdentifier(input) {
		input = input + "";
		let name = "";
		for (const c of input) {
			name += (0, _helperValidatorIdentifier.isIdentifierChar)(c.codePointAt(0)) ? c : "-";
		}
		name = name.replace(/^[-0-9]+/, "");
		name = name.replace(/[-\s]+(.)?/g, function (match, c) {
			return c ? c.toUpperCase() : "";
		});
		if (!(0, _isValidIdentifier$2.default)(name)) {
			name = `_${name}`;
		}
		return name || "_";
	}

	Object.defineProperty(toBindingIdentifierName$1, "__esModule", {
		value: true
	});
	toBindingIdentifierName$1.default = toBindingIdentifierName;
	var _toIdentifier = toIdentifier$1;

	function toBindingIdentifierName(name) {
		name = (0, _toIdentifier.default)(name);
		if (name === "eval" || name === "arguments")
			name = "_" + name;
		return name;
	}

	var toComputedKey$1 = {};
	Object.defineProperty(toComputedKey$1, "__esModule", {
		value: true
	});
	toComputedKey$1.default = toComputedKey;
	var _index$p = generated$3;
	var _index2$5 = generated$2;

	function toComputedKey(node2, key = node2.key || node2.property) {
		if (!node2.computed && (0, _index$p.isIdentifier)(key))
			key = (0, _index2$5.stringLiteral)(key.name);
		return key;
	}

	var toExpression$1 = {};
	Object.defineProperty(toExpression$1, "__esModule", {
		value: true
	});
	toExpression$1.default = void 0;
	var _index$o = generated$3;
	toExpression$1.default = toExpression;

	function toExpression(node2) {
		if ((0, _index$o.isExpressionStatement)(node2)) {
			node2 = node2.expression;
		}
		if ((0, _index$o.isExpression)(node2)) {
			return node2;
		}
		if ((0, _index$o.isClass)(node2)) {
			node2.type = "ClassExpression";
		} else if ((0, _index$o.isFunction)(node2)) {
			node2.type = "FunctionExpression";
		}
		if (!(0, _index$o.isExpression)(node2)) {
			throw new Error(`cannot turn ${node2.type} to an expression`);
		}
		return node2;
	}

	var toKeyAlias$1 = {};
	var removePropertiesDeep$1 = {};
	var traverseFast$2 = {};
	Object.defineProperty(traverseFast$2, "__esModule", {
		value: true
	});
	traverseFast$2.default = traverseFast$1;
	var _index$n = definitions;

	function traverseFast$1(node2, enter, opts) {
		if (!node2)
			return;
		const keys2 = _index$n.VISITOR_KEYS[node2.type];
		if (!keys2)
			return;
		opts = opts || {};
		enter(node2, opts);
		for (const key of keys2) {
			const subNode = node2[key];
			if (Array.isArray(subNode)) {
				for (const node3 of subNode) {
					traverseFast$1(node3, enter, opts);
				}
			} else {
				traverseFast$1(subNode, enter, opts);
			}
		}
	}

	var removeProperties$1 = {};
	Object.defineProperty(removeProperties$1, "__esModule", {
		value: true
	});
	removeProperties$1.default = removeProperties;
	var _index$m = constants;
	const CLEAR_KEYS = ["tokens", "start", "end", "loc", "raw", "rawValue"];
	const CLEAR_KEYS_PLUS_COMMENTS = [..._index$m.COMMENT_KEYS, "comments", ...CLEAR_KEYS];

	function removeProperties(node2, opts = {}) {
		const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
		for (const key of map) {
			if (node2[key] != null)
				node2[key] = void 0;
		}
		for (const key of Object.keys(node2)) {
			if (key[0] === "_" && node2[key] != null)
				node2[key] = void 0;
		}
		const symbols = Object.getOwnPropertySymbols(node2);
		for (const sym of symbols) {
			node2[sym] = null;
		}
	}

	Object.defineProperty(removePropertiesDeep$1, "__esModule", {
		value: true
	});
	removePropertiesDeep$1.default = removePropertiesDeep;
	var _traverseFast = traverseFast$2;
	var _removeProperties = removeProperties$1;

	function removePropertiesDeep(tree, opts) {
		(0, _traverseFast.default)(tree, _removeProperties.default, opts);
		return tree;
	}

	Object.defineProperty(toKeyAlias$1, "__esModule", {
		value: true
	});
	toKeyAlias$1.default = toKeyAlias;
	var _index$l = generated$3;
	var _cloneNode$1 = cloneNode$1;
	var _removePropertiesDeep = removePropertiesDeep$1;

	function toKeyAlias(node2, key = node2.key) {
		let alias;
		if (node2.kind === "method") {
			return toKeyAlias.increment() + "";
		} else if ((0, _index$l.isIdentifier)(key)) {
			alias = key.name;
		} else if ((0, _index$l.isStringLiteral)(key)) {
			alias = JSON.stringify(key.value);
		} else {
			alias = JSON.stringify((0, _removePropertiesDeep.default)((0, _cloneNode$1.default)(key)));
		}
		if (node2.computed) {
			alias = `[${alias}]`;
		}
		if (node2.static) {
			alias = `static:${alias}`;
		}
		return alias;
	}

	toKeyAlias.uid = 0;
	toKeyAlias.increment = function () {
		if (toKeyAlias.uid >= Number.MAX_SAFE_INTEGER) {
			return toKeyAlias.uid = 0;
		} else {
			return toKeyAlias.uid++;
		}
	};
	var toStatement$1 = {};
	Object.defineProperty(toStatement$1, "__esModule", {
		value: true
	});
	toStatement$1.default = void 0;
	var _index$k = generated$3;
	var _index2$4 = generated$2;
	toStatement$1.default = toStatement;

	function toStatement(node2, ignore) {
		if ((0, _index$k.isStatement)(node2)) {
			return node2;
		}
		let mustHaveId = false;
		let newType;
		if ((0, _index$k.isClass)(node2)) {
			mustHaveId = true;
			newType = "ClassDeclaration";
		} else if ((0, _index$k.isFunction)(node2)) {
			mustHaveId = true;
			newType = "FunctionDeclaration";
		} else if ((0, _index$k.isAssignmentExpression)(node2)) {
			return (0, _index2$4.expressionStatement)(node2);
		}
		if (mustHaveId && !node2.id) {
			newType = false;
		}
		if (!newType) {
			if (ignore) {
				return false;
			} else {
				throw new Error(`cannot turn ${node2.type} to a statement`);
			}
		}
		node2.type = newType;
		return node2;
	}

	var valueToNode$1 = {};
	Object.defineProperty(valueToNode$1, "__esModule", {
		value: true
	});
	valueToNode$1.default = void 0;
	var _isValidIdentifier$1 = isValidIdentifier$1;
	var _index$j = generated$2;
	valueToNode$1.default = valueToNode;
	const objectToString = Function.call.bind(Object.prototype.toString);

	function isRegExp(value) {
		return objectToString(value) === "[object RegExp]";
	}

	function isPlainObject(value) {
		if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Object]") {
			return false;
		}
		const proto = Object.getPrototypeOf(value);
		return proto === null || Object.getPrototypeOf(proto) === null;
	}

	function valueToNode(value) {
		if (value === void 0) {
			return (0, _index$j.identifier)("undefined");
		}
		if (value === true || value === false) {
			return (0, _index$j.booleanLiteral)(value);
		}
		if (value === null) {
			return (0, _index$j.nullLiteral)();
		}
		if (typeof value === "string") {
			return (0, _index$j.stringLiteral)(value);
		}
		if (typeof value === "number") {
			let result;
			if (Number.isFinite(value)) {
				result = (0, _index$j.numericLiteral)(Math.abs(value));
			} else {
				let numerator;
				if (Number.isNaN(value)) {
					numerator = (0, _index$j.numericLiteral)(0);
				} else {
					numerator = (0, _index$j.numericLiteral)(1);
				}
				result = (0, _index$j.binaryExpression)("/", numerator, (0, _index$j.numericLiteral)(0));
			}
			if (value < 0 || Object.is(value, -0)) {
				result = (0, _index$j.unaryExpression)("-", result);
			}
			return result;
		}
		if (isRegExp(value)) {
			const pattern = value.source;
			const flags = /\/([a-z]*)$/.exec(value.toString())[1];
			return (0, _index$j.regExpLiteral)(pattern, flags);
		}
		if (Array.isArray(value)) {
			return (0, _index$j.arrayExpression)(value.map(valueToNode));
		}
		if (isPlainObject(value)) {
			const props = [];
			for (const key of Object.keys(value)) {
				let nodeKey;
				if ((0, _isValidIdentifier$1.default)(key)) {
					nodeKey = (0, _index$j.identifier)(key);
				} else {
					nodeKey = (0, _index$j.stringLiteral)(key);
				}
				props.push((0, _index$j.objectProperty)(nodeKey, valueToNode(value[key])));
			}
			return (0, _index$j.objectExpression)(props);
		}
		throw new Error("don't know how to turn this value into a node");
	}

	var appendToMemberExpression$1 = {};
	Object.defineProperty(appendToMemberExpression$1, "__esModule", {
		value: true
	});
	appendToMemberExpression$1.default = appendToMemberExpression;
	var _index$i = generated$2;

	function appendToMemberExpression(member, append, computed = false) {
		member.object = (0, _index$i.memberExpression)(member.object, member.property, member.computed);
		member.property = append;
		member.computed = !!computed;
		return member;
	}

	var inherits$1 = {};
	Object.defineProperty(inherits$1, "__esModule", {
		value: true
	});
	inherits$1.default = inherits;
	var _index$h = constants;
	var _inheritsComments = inheritsComments$1;

	function inherits(child, parent) {
		if (!child || !parent)
			return child;
		for (const key of _index$h.INHERIT_KEYS.optional) {
			if (child[key] == null) {
				child[key] = parent[key];
			}
		}
		for (const key of Object.keys(parent)) {
			if (key[0] === "_" && key !== "__clone") {
				child[key] = parent[key];
			}
		}
		for (const key of _index$h.INHERIT_KEYS.force) {
			child[key] = parent[key];
		}
		(0, _inheritsComments.default)(child, parent);
		return child;
	}

	var prependToMemberExpression$1 = {};
	Object.defineProperty(prependToMemberExpression$1, "__esModule", {
		value: true
	});
	prependToMemberExpression$1.default = prependToMemberExpression;
	var _index$g = generated$2;
	var _index2$3 = lib$2;

	function prependToMemberExpression(member, prepend) {
		if ((0, _index2$3.isSuper)(member.object)) {
			throw new Error("Cannot prepend node to super property access (`super.foo`).");
		}
		member.object = (0, _index$g.memberExpression)(prepend, member.object);
		return member;
	}

	var getAssignmentIdentifiers$1 = {};
	Object.defineProperty(getAssignmentIdentifiers$1, "__esModule", {
		value: true
	});
	getAssignmentIdentifiers$1.default = getAssignmentIdentifiers;

	function getAssignmentIdentifiers(node2) {
		const search = [].concat(node2);
		const ids = /* @__PURE__ */ Object.create(null);
		while (search.length) {
			const id = search.pop();
			if (!id)
				continue;
			switch (id.type) {
				case "ArrayPattern":
					search.push(...id.elements);
					break;
				case "AssignmentExpression":
				case "AssignmentPattern":
				case "ForInStatement":
				case "ForOfStatement":
					search.push(id.left);
					break;
				case "ObjectPattern":
					search.push(...id.properties);
					break;
				case "ObjectProperty":
					search.push(id.value);
					break;
				case "RestElement":
				case "UpdateExpression":
					search.push(id.argument);
					break;
				case "UnaryExpression":
					if (id.operator === "delete") {
						search.push(id.argument);
					}
					break;
				case "Identifier":
					ids[id.name] = id;
					break;
			}
		}
		return ids;
	}

	var getBindingIdentifiers$1 = {};
	Object.defineProperty(getBindingIdentifiers$1, "__esModule", {
		value: true
	});
	getBindingIdentifiers$1.default = getBindingIdentifiers;
	var _index$f = generated$3;

	function getBindingIdentifiers(node2, duplicates, outerOnly, newBindingsOnly) {
		const search = [].concat(node2);
		const ids = /* @__PURE__ */ Object.create(null);
		while (search.length) {
			const id = search.shift();
			if (!id)
				continue;
			if (newBindingsOnly && ((0, _index$f.isAssignmentExpression)(id) || (0, _index$f.isUnaryExpression)(id) || (0, _index$f.isUpdateExpression)(id))) {
				continue;
			}
			if ((0, _index$f.isIdentifier)(id)) {
				if (duplicates) {
					const _ids = ids[id.name] = ids[id.name] || [];
					_ids.push(id);
				} else {
					ids[id.name] = id;
				}
				continue;
			}
			if ((0, _index$f.isExportDeclaration)(id) && !(0, _index$f.isExportAllDeclaration)(id)) {
				if ((0, _index$f.isDeclaration)(id.declaration)) {
					search.push(id.declaration);
				}
				continue;
			}
			if (outerOnly) {
				if ((0, _index$f.isFunctionDeclaration)(id)) {
					search.push(id.id);
					continue;
				}
				if ((0, _index$f.isFunctionExpression)(id)) {
					continue;
				}
			}
			const keys2 = getBindingIdentifiers.keys[id.type];
			if (keys2) {
				for (let i = 0; i < keys2.length; i++) {
					const key = keys2[i];
					const nodes2 = id[key];
					if (nodes2) {
						if (Array.isArray(nodes2)) {
							search.push(...nodes2);
						} else {
							search.push(nodes2);
						}
					}
				}
			}
		}
		return ids;
	}

	const keys = {
		DeclareClass: ["id"],
		DeclareFunction: ["id"],
		DeclareModule: ["id"],
		DeclareVariable: ["id"],
		DeclareInterface: ["id"],
		DeclareTypeAlias: ["id"],
		DeclareOpaqueType: ["id"],
		InterfaceDeclaration: ["id"],
		TypeAlias: ["id"],
		OpaqueType: ["id"],
		CatchClause: ["param"],
		LabeledStatement: ["label"],
		UnaryExpression: ["argument"],
		AssignmentExpression: ["left"],
		ImportSpecifier: ["local"],
		ImportNamespaceSpecifier: ["local"],
		ImportDefaultSpecifier: ["local"],
		ImportDeclaration: ["specifiers"],
		TSImportEqualsDeclaration: ["id"],
		ExportSpecifier: ["exported"],
		ExportNamespaceSpecifier: ["exported"],
		ExportDefaultSpecifier: ["exported"],
		FunctionDeclaration: ["id", "params"],
		FunctionExpression: ["id", "params"],
		ArrowFunctionExpression: ["params"],
		ObjectMethod: ["params"],
		ClassMethod: ["params"],
		ClassPrivateMethod: ["params"],
		ForInStatement: ["left"],
		ForOfStatement: ["left"],
		ClassDeclaration: ["id"],
		ClassExpression: ["id"],
		RestElement: ["argument"],
		UpdateExpression: ["argument"],
		ObjectProperty: ["value"],
		AssignmentPattern: ["left"],
		ArrayPattern: ["elements"],
		ObjectPattern: ["properties"],
		VariableDeclaration: ["declarations"],
		VariableDeclarator: ["id"]
	};
	getBindingIdentifiers.keys = keys;
	var getOuterBindingIdentifiers$1 = {};
	Object.defineProperty(getOuterBindingIdentifiers$1, "__esModule", {
		value: true
	});
	getOuterBindingIdentifiers$1.default = void 0;
	var _getBindingIdentifiers$2 = getBindingIdentifiers$1;
	getOuterBindingIdentifiers$1.default = getOuterBindingIdentifiers;

	function getOuterBindingIdentifiers(node2, duplicates) {
		return (0, _getBindingIdentifiers$2.default)(node2, duplicates, true);
	}

	var getFunctionName$1 = {};
	Object.defineProperty(getFunctionName$1, "__esModule", {
		value: true
	});
	getFunctionName$1.default = getFunctionName;
	var _index$e = generated$3;

	function getNameFromLiteralId(id) {
		if ((0, _index$e.isNullLiteral)(id)) {
			return "null";
		}
		if ((0, _index$e.isRegExpLiteral)(id)) {
			return `/${id.pattern}/${id.flags}`;
		}
		if ((0, _index$e.isTemplateLiteral)(id)) {
			return id.quasis.map((quasi) => quasi.value.raw).join("");
		}
		if (id.value !== void 0) {
			return String(id.value);
		}
		return null;
	}

	function getObjectMemberKey(node2) {
		if (!node2.computed || (0, _index$e.isLiteral)(node2.key)) {
			return node2.key;
		}
	}

	function getFunctionName(node2, parent) {
		if ("id" in node2 && node2.id) {
			return {
				name: node2.id.name,
				originalNode: node2.id
			};
		}
		let prefix = "";
		let id;
		if ((0, _index$e.isObjectProperty)(parent, {
			value: node2
		})) {
			id = getObjectMemberKey(parent);
		} else if ((0, _index$e.isObjectMethod)(node2) || (0, _index$e.isClassMethod)(node2)) {
			id = getObjectMemberKey(node2);
			if (node2.kind === "get")
				prefix = "get ";
			else if (node2.kind === "set")
				prefix = "set ";
		} else if ((0, _index$e.isVariableDeclarator)(parent, {
			init: node2
		})) {
			id = parent.id;
		} else if ((0, _index$e.isAssignmentExpression)(parent, {
			operator: "=",
			right: node2
		})) {
			id = parent.left;
		}
		if (!id)
			return null;
		const name = (0, _index$e.isLiteral)(id) ? getNameFromLiteralId(id) : (0, _index$e.isIdentifier)(id) ? id.name : (0, _index$e.isPrivateName)(id) ? id.id.name : null;
		if (name == null)
			return null;
		return {
			name: prefix + name,
			originalNode: id
		};
	}

	var traverse$1 = {};
	Object.defineProperty(traverse$1, "__esModule", {
		value: true
	});
	traverse$1.default = traverse;
	var _index$d = definitions;

	function traverse(node2, handlers, state) {
		if (typeof handlers === "function") {
			handlers = {
				enter: handlers
			};
		}
		const {
			enter,
			exit
		} = handlers;
		traverseSimpleImpl(node2, enter, exit, state, []);
	}

	function traverseSimpleImpl(node2, enter, exit, state, ancestors) {
		const keys2 = _index$d.VISITOR_KEYS[node2.type];
		if (!keys2)
			return;
		if (enter)
			enter(node2, ancestors, state);
		for (const key of keys2) {
			const subNode = node2[key];
			if (Array.isArray(subNode)) {
				for (let i = 0; i < subNode.length; i++) {
					const child = subNode[i];
					if (!child)
						continue;
					ancestors.push({
						node: node2,
						key,
						index: i
					});
					traverseSimpleImpl(child, enter, exit, state, ancestors);
					ancestors.pop();
				}
			} else if (subNode) {
				ancestors.push({
					node: node2,
					key
				});
				traverseSimpleImpl(subNode, enter, exit, state, ancestors);
				ancestors.pop();
			}
		}
		if (exit)
			exit(node2, ancestors, state);
	}

	var isBinding$1 = {};
	Object.defineProperty(isBinding$1, "__esModule", {
		value: true
	});
	isBinding$1.default = isBinding;
	var _getBindingIdentifiers$1 = getBindingIdentifiers$1;

	function isBinding(node2, parent, grandparent) {
		if (grandparent && node2.type === "Identifier" && parent.type === "ObjectProperty" && grandparent.type === "ObjectExpression") {
			return false;
		}
		const keys2 = _getBindingIdentifiers$1.default.keys[parent.type];
		if (keys2) {
			for (let i = 0; i < keys2.length; i++) {
				const key = keys2[i];
				const val = parent[key];
				if (Array.isArray(val)) {
					if (val.includes(node2))
						return true;
				} else {
					if (val === node2)
						return true;
				}
			}
		}
		return false;
	}

	var isBlockScoped$1 = {};
	var isLet$1 = {};
	Object.defineProperty(isLet$1, "__esModule", {
		value: true
	});
	isLet$1.default = isLet;
	var _index$c = generated$3;
	var _index2$2 = constants;

	function isLet(node2) {
		return (0, _index$c.isVariableDeclaration)(node2) && (node2.kind !== "var" || node2[_index2$2.BLOCK_SCOPED_SYMBOL]);
	}

	Object.defineProperty(isBlockScoped$1, "__esModule", {
		value: true
	});
	isBlockScoped$1.default = isBlockScoped;
	var _index$b = generated$3;
	var _isLet = isLet$1;

	function isBlockScoped(node2) {
		return (0, _index$b.isFunctionDeclaration)(node2) || (0, _index$b.isClassDeclaration)(node2) || (0, _isLet.default)(node2);
	}

	var isImmutable$1 = {};
	Object.defineProperty(isImmutable$1, "__esModule", {
		value: true
	});
	isImmutable$1.default = isImmutable;
	var _isType = isType$2;
	var _index$a = generated$3;

	function isImmutable(node2) {
		if ((0, _isType.default)(node2.type, "Immutable"))
			return true;
		if ((0, _index$a.isIdentifier)(node2)) {
			if (node2.name === "undefined") {
				return true;
			} else {
				return false;
			}
		}
		return false;
	}

	var isNodesEquivalent$1 = {};
	Object.defineProperty(isNodesEquivalent$1, "__esModule", {
		value: true
	});
	isNodesEquivalent$1.default = isNodesEquivalent;
	var _index$9 = definitions;

	function isNodesEquivalent(a, b) {
		if (typeof a !== "object" || typeof b !== "object" || a == null || b == null) {
			return a === b;
		}
		if (a.type !== b.type) {
			return false;
		}
		const fields = Object.keys(_index$9.NODE_FIELDS[a.type] || a.type);
		const visitorKeys = _index$9.VISITOR_KEYS[a.type];
		for (const field of fields) {
			const val_a = a[field];
			const val_b = b[field];
			if (typeof val_a !== typeof val_b) {
				return false;
			}
			if (val_a == null && val_b == null) {
				continue;
			} else if (val_a == null || val_b == null) {
				return false;
			}
			if (Array.isArray(val_a)) {
				if (!Array.isArray(val_b)) {
					return false;
				}
				if (val_a.length !== val_b.length) {
					return false;
				}
				for (let i = 0; i < val_a.length; i++) {
					if (!isNodesEquivalent(val_a[i], val_b[i])) {
						return false;
					}
				}
				continue;
			}
			if (typeof val_a === "object" && !(visitorKeys != null && visitorKeys.includes(field))) {
				for (const key of Object.keys(val_a)) {
					if (val_a[key] !== val_b[key]) {
						return false;
					}
				}
				continue;
			}
			if (!isNodesEquivalent(val_a, val_b)) {
				return false;
			}
		}
		return true;
	}

	var isReferenced$1 = {};
	Object.defineProperty(isReferenced$1, "__esModule", {
		value: true
	});
	isReferenced$1.default = isReferenced;

	function isReferenced(node2, parent, grandparent) {
		switch (parent.type) {
			case "MemberExpression":
			case "OptionalMemberExpression":
				if (parent.property === node2) {
					return !!parent.computed;
				}
				return parent.object === node2;
			case "JSXMemberExpression":
				return parent.object === node2;
			case "VariableDeclarator":
				return parent.init === node2;
			case "ArrowFunctionExpression":
				return parent.body === node2;
			case "PrivateName":
				return false;
			case "ClassMethod":
			case "ClassPrivateMethod":
			case "ObjectMethod":
				if (parent.key === node2) {
					return !!parent.computed;
				}
				return false;
			case "ObjectProperty":
				if (parent.key === node2) {
					return !!parent.computed;
				}
				return !grandparent || grandparent.type !== "ObjectPattern";
			case "ClassProperty":
			case "ClassAccessorProperty":
				if (parent.key === node2) {
					return !!parent.computed;
				}
				return true;
			case "ClassPrivateProperty":
				return parent.key !== node2;
			case "ClassDeclaration":
			case "ClassExpression":
				return parent.superClass === node2;
			case "AssignmentExpression":
				return parent.right === node2;
			case "AssignmentPattern":
				return parent.right === node2;
			case "LabeledStatement":
				return false;
			case "CatchClause":
				return false;
			case "RestElement":
				return false;
			case "BreakStatement":
			case "ContinueStatement":
				return false;
			case "FunctionDeclaration":
			case "FunctionExpression":
				return false;
			case "ExportNamespaceSpecifier":
			case "ExportDefaultSpecifier":
				return false;
			case "ExportSpecifier":
				if (grandparent != null && grandparent.source) {
					return false;
				}
				return parent.local === node2;
			case "ImportDefaultSpecifier":
			case "ImportNamespaceSpecifier":
			case "ImportSpecifier":
				return false;
			case "ImportAttribute":
				return false;
			case "JSXAttribute":
				return false;
			case "ObjectPattern":
			case "ArrayPattern":
				return false;
			case "MetaProperty":
				return false;
			case "ObjectTypeProperty":
				return parent.key !== node2;
			case "TSEnumMember":
				return parent.id !== node2;
			case "TSPropertySignature":
				if (parent.key === node2) {
					return !!parent.computed;
				}
				return true;
		}
		return true;
	}

	var isScope$1 = {};
	Object.defineProperty(isScope$1, "__esModule", {
		value: true
	});
	isScope$1.default = isScope;
	var _index$8 = generated$3;

	function isScope(node2, parent) {
		if ((0, _index$8.isBlockStatement)(node2) && ((0, _index$8.isFunction)(parent) || (0, _index$8.isCatchClause)(parent))) {
			return false;
		}
		if ((0, _index$8.isPattern)(node2) && ((0, _index$8.isFunction)(parent) || (0, _index$8.isCatchClause)(parent))) {
			return true;
		}
		return (0, _index$8.isScopable)(node2);
	}

	var isSpecifierDefault$1 = {};
	Object.defineProperty(isSpecifierDefault$1, "__esModule", {
		value: true
	});
	isSpecifierDefault$1.default = isSpecifierDefault;
	var _index$7 = generated$3;

	function isSpecifierDefault(specifier) {
		return (0, _index$7.isImportDefaultSpecifier)(specifier) || (0, _index$7.isIdentifier)(specifier.imported || specifier.exported, {
			name: "default"
		});
	}

	var isValidES3Identifier$1 = {};
	Object.defineProperty(isValidES3Identifier$1, "__esModule", {
		value: true
	});
	isValidES3Identifier$1.default = isValidES3Identifier;
	var _isValidIdentifier = isValidIdentifier$1;
	const RESERVED_WORDS_ES3_ONLY = /* @__PURE__ */ new Set(["abstract", "boolean", "byte", "char", "double", "enum", "final", "float", "goto", "implements", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "synchronized", "throws", "transient", "volatile"]);

	function isValidES3Identifier(name) {
		return (0, _isValidIdentifier.default)(name) && !RESERVED_WORDS_ES3_ONLY.has(name);
	}

	var isVar$1 = {};
	Object.defineProperty(isVar$1, "__esModule", {
		value: true
	});
	isVar$1.default = isVar;
	var _index$6 = generated$3;
	var _index2$1 = constants;

	function isVar(node2) {
		return (0, _index$6.isVariableDeclaration)(node2, {
			kind: "var"
		}) && !node2[_index2$1.BLOCK_SCOPED_SYMBOL];
	}

	var toSequenceExpression$1 = {};
	var gatherSequenceExpressions$1 = {};
	Object.defineProperty(gatherSequenceExpressions$1, "__esModule", {
		value: true
	});
	gatherSequenceExpressions$1.default = gatherSequenceExpressions;
	var _getBindingIdentifiers = getBindingIdentifiers$1;
	var _index$5 = generated$3;
	var _index2 = generated$2;
	var _productions = productions;
	var _cloneNode = cloneNode$1;

	function gatherSequenceExpressions(nodes2, declars) {
		const exprs = [];
		let ensureLastUndefined = true;
		for (const node2 of nodes2) {
			if (!(0, _index$5.isEmptyStatement)(node2)) {
				ensureLastUndefined = false;
			}
			if ((0, _index$5.isExpression)(node2)) {
				exprs.push(node2);
			} else if ((0, _index$5.isExpressionStatement)(node2)) {
				exprs.push(node2.expression);
			} else if ((0, _index$5.isVariableDeclaration)(node2)) {
				if (node2.kind !== "var")
					return;
				for (const declar of node2.declarations) {
					const bindings = (0, _getBindingIdentifiers.default)(declar);
					for (const key of Object.keys(bindings)) {
						declars.push({
							kind: node2.kind,
							id: (0, _cloneNode.default)(bindings[key])
						});
					}
					if (declar.init) {
						exprs.push((0, _index2.assignmentExpression)("=", declar.id, declar.init));
					}
				}
				ensureLastUndefined = true;
			} else if ((0, _index$5.isIfStatement)(node2)) {
				const consequent = node2.consequent ? gatherSequenceExpressions([node2.consequent], declars) : (0, _productions.buildUndefinedNode)();
				const alternate = node2.alternate ? gatherSequenceExpressions([node2.alternate], declars) : (0, _productions.buildUndefinedNode)();
				if (!consequent || !alternate)
					return;
				exprs.push((0, _index2.conditionalExpression)(node2.test, consequent, alternate));
			} else if ((0, _index$5.isBlockStatement)(node2)) {
				const body = gatherSequenceExpressions(node2.body, declars);
				if (!body)
					return;
				exprs.push(body);
			} else if ((0, _index$5.isEmptyStatement)(node2)) {
				if (nodes2.indexOf(node2) === 0) {
					ensureLastUndefined = true;
				}
			} else {
				return;
			}
		}
		if (ensureLastUndefined) {
			exprs.push((0, _productions.buildUndefinedNode)());
		}
		if (exprs.length === 1) {
			return exprs[0];
		} else {
			return (0, _index2.sequenceExpression)(exprs);
		}
	}

	Object.defineProperty(toSequenceExpression$1, "__esModule", {
		value: true
	});
	toSequenceExpression$1.default = toSequenceExpression;
	var _gatherSequenceExpressions = gatherSequenceExpressions$1;

	function toSequenceExpression(nodes2, scope) {
		if (!(nodes2 != null && nodes2.length))
			return;
		const declars = [];
		const result = (0, _gatherSequenceExpressions.default)(nodes2, declars);
		if (!result)
			return;
		for (const declar of declars) {
			scope.push(declar);
		}
		return result;
	}

	(function (exports3) {
		Object.defineProperty(exports3, "__esModule", {
			value: true
		});
		var _exportNames = {
			react: true,
			assertNode: true,
			createTypeAnnotationBasedOnTypeof: true,
			createUnionTypeAnnotation: true,
			createFlowUnionType: true,
			createTSUnionType: true,
			cloneNode: true,
			clone: true,
			cloneDeep: true,
			cloneDeepWithoutLoc: true,
			cloneWithoutLoc: true,
			addComment: true,
			addComments: true,
			inheritInnerComments: true,
			inheritLeadingComments: true,
			inheritsComments: true,
			inheritTrailingComments: true,
			removeComments: true,
			ensureBlock: true,
			toBindingIdentifierName: true,
			toBlock: true,
			toComputedKey: true,
			toExpression: true,
			toIdentifier: true,
			toKeyAlias: true,
			toStatement: true,
			valueToNode: true,
			appendToMemberExpression: true,
			inherits: true,
			prependToMemberExpression: true,
			removeProperties: true,
			removePropertiesDeep: true,
			removeTypeDuplicates: true,
			getAssignmentIdentifiers: true,
			getBindingIdentifiers: true,
			getOuterBindingIdentifiers: true,
			getFunctionName: true,
			traverse: true,
			traverseFast: true,
			shallowEqual: true,
			is: true,
			isBinding: true,
			isBlockScoped: true,
			isImmutable: true,
			isLet: true,
			isNode: true,
			isNodesEquivalent: true,
			isPlaceholderType: true,
			isReferenced: true,
			isScope: true,
			isSpecifierDefault: true,
			isType: true,
			isValidES3Identifier: true,
			isValidIdentifier: true,
			isVar: true,
			matchesPattern: true,
			validate: true,
			buildMatchMemberExpression: true,
			__internal__deprecationWarning: true
		};
		Object.defineProperty(exports3, "__internal__deprecationWarning", {
			enumerable: true,
			get: function () {
				return _deprecationWarning2.default;
			}
		});
		Object.defineProperty(exports3, "addComment", {
			enumerable: true,
			get: function () {
				return _addComment.default;
			}
		});
		Object.defineProperty(exports3, "addComments", {
			enumerable: true,
			get: function () {
				return _addComments2.default;
			}
		});
		Object.defineProperty(exports3, "appendToMemberExpression", {
			enumerable: true,
			get: function () {
				return _appendToMemberExpression.default;
			}
		});
		Object.defineProperty(exports3, "assertNode", {
			enumerable: true,
			get: function () {
				return _assertNode.default;
			}
		});
		Object.defineProperty(exports3, "buildMatchMemberExpression", {
			enumerable: true,
			get: function () {
				return _buildMatchMemberExpression2.default;
			}
		});
		Object.defineProperty(exports3, "clone", {
			enumerable: true,
			get: function () {
				return _clone.default;
			}
		});
		Object.defineProperty(exports3, "cloneDeep", {
			enumerable: true,
			get: function () {
				return _cloneDeep.default;
			}
		});
		Object.defineProperty(exports3, "cloneDeepWithoutLoc", {
			enumerable: true,
			get: function () {
				return _cloneDeepWithoutLoc.default;
			}
		});
		Object.defineProperty(exports3, "cloneNode", {
			enumerable: true,
			get: function () {
				return _cloneNode2.default;
			}
		});
		Object.defineProperty(exports3, "cloneWithoutLoc", {
			enumerable: true,
			get: function () {
				return _cloneWithoutLoc.default;
			}
		});
		Object.defineProperty(exports3, "createFlowUnionType", {
			enumerable: true,
			get: function () {
				return _createFlowUnionType.default;
			}
		});
		Object.defineProperty(exports3, "createTSUnionType", {
			enumerable: true,
			get: function () {
				return _createTSUnionType.default;
			}
		});
		Object.defineProperty(exports3, "createTypeAnnotationBasedOnTypeof", {
			enumerable: true,
			get: function () {
				return _createTypeAnnotationBasedOnTypeof.default;
			}
		});
		Object.defineProperty(exports3, "createUnionTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _createFlowUnionType.default;
			}
		});
		Object.defineProperty(exports3, "ensureBlock", {
			enumerable: true,
			get: function () {
				return _ensureBlock.default;
			}
		});
		Object.defineProperty(exports3, "getAssignmentIdentifiers", {
			enumerable: true,
			get: function () {
				return _getAssignmentIdentifiers.default;
			}
		});
		Object.defineProperty(exports3, "getBindingIdentifiers", {
			enumerable: true,
			get: function () {
				return _getBindingIdentifiers2.default;
			}
		});
		Object.defineProperty(exports3, "getFunctionName", {
			enumerable: true,
			get: function () {
				return _getFunctionName.default;
			}
		});
		Object.defineProperty(exports3, "getOuterBindingIdentifiers", {
			enumerable: true,
			get: function () {
				return _getOuterBindingIdentifiers.default;
			}
		});
		Object.defineProperty(exports3, "inheritInnerComments", {
			enumerable: true,
			get: function () {
				return _inheritInnerComments2.default;
			}
		});
		Object.defineProperty(exports3, "inheritLeadingComments", {
			enumerable: true,
			get: function () {
				return _inheritLeadingComments2.default;
			}
		});
		Object.defineProperty(exports3, "inheritTrailingComments", {
			enumerable: true,
			get: function () {
				return _inheritTrailingComments2.default;
			}
		});
		Object.defineProperty(exports3, "inherits", {
			enumerable: true,
			get: function () {
				return _inherits.default;
			}
		});
		Object.defineProperty(exports3, "inheritsComments", {
			enumerable: true,
			get: function () {
				return _inheritsComments2.default;
			}
		});
		Object.defineProperty(exports3, "is", {
			enumerable: true,
			get: function () {
				return _is2.default;
			}
		});
		Object.defineProperty(exports3, "isBinding", {
			enumerable: true,
			get: function () {
				return _isBinding.default;
			}
		});
		Object.defineProperty(exports3, "isBlockScoped", {
			enumerable: true,
			get: function () {
				return _isBlockScoped.default;
			}
		});
		Object.defineProperty(exports3, "isImmutable", {
			enumerable: true,
			get: function () {
				return _isImmutable.default;
			}
		});
		Object.defineProperty(exports3, "isLet", {
			enumerable: true,
			get: function () {
				return _isLet2.default;
			}
		});
		Object.defineProperty(exports3, "isNode", {
			enumerable: true,
			get: function () {
				return _isNode2.default;
			}
		});
		Object.defineProperty(exports3, "isNodesEquivalent", {
			enumerable: true,
			get: function () {
				return _isNodesEquivalent.default;
			}
		});
		Object.defineProperty(exports3, "isPlaceholderType", {
			enumerable: true,
			get: function () {
				return _isPlaceholderType2.default;
			}
		});
		Object.defineProperty(exports3, "isReferenced", {
			enumerable: true,
			get: function () {
				return _isReferenced.default;
			}
		});
		Object.defineProperty(exports3, "isScope", {
			enumerable: true,
			get: function () {
				return _isScope.default;
			}
		});
		Object.defineProperty(exports3, "isSpecifierDefault", {
			enumerable: true,
			get: function () {
				return _isSpecifierDefault.default;
			}
		});
		Object.defineProperty(exports3, "isType", {
			enumerable: true,
			get: function () {
				return _isType2.default;
			}
		});
		Object.defineProperty(exports3, "isValidES3Identifier", {
			enumerable: true,
			get: function () {
				return _isValidES3Identifier.default;
			}
		});
		Object.defineProperty(exports3, "isValidIdentifier", {
			enumerable: true,
			get: function () {
				return _isValidIdentifier2.default;
			}
		});
		Object.defineProperty(exports3, "isVar", {
			enumerable: true,
			get: function () {
				return _isVar.default;
			}
		});
		Object.defineProperty(exports3, "matchesPattern", {
			enumerable: true,
			get: function () {
				return _matchesPattern2.default;
			}
		});
		Object.defineProperty(exports3, "prependToMemberExpression", {
			enumerable: true,
			get: function () {
				return _prependToMemberExpression.default;
			}
		});
		exports3.react = void 0;
		Object.defineProperty(exports3, "removeComments", {
			enumerable: true,
			get: function () {
				return _removeComments.default;
			}
		});
		Object.defineProperty(exports3, "removeProperties", {
			enumerable: true,
			get: function () {
				return _removeProperties2.default;
			}
		});
		Object.defineProperty(exports3, "removePropertiesDeep", {
			enumerable: true,
			get: function () {
				return _removePropertiesDeep2.default;
			}
		});
		Object.defineProperty(exports3, "removeTypeDuplicates", {
			enumerable: true,
			get: function () {
				return _removeTypeDuplicates2.default;
			}
		});
		Object.defineProperty(exports3, "shallowEqual", {
			enumerable: true,
			get: function () {
				return _shallowEqual2.default;
			}
		});
		Object.defineProperty(exports3, "toBindingIdentifierName", {
			enumerable: true,
			get: function () {
				return _toBindingIdentifierName.default;
			}
		});
		Object.defineProperty(exports3, "toBlock", {
			enumerable: true,
			get: function () {
				return _toBlock2.default;
			}
		});
		Object.defineProperty(exports3, "toComputedKey", {
			enumerable: true,
			get: function () {
				return _toComputedKey.default;
			}
		});
		Object.defineProperty(exports3, "toExpression", {
			enumerable: true,
			get: function () {
				return _toExpression.default;
			}
		});
		Object.defineProperty(exports3, "toIdentifier", {
			enumerable: true,
			get: function () {
				return _toIdentifier2.default;
			}
		});
		Object.defineProperty(exports3, "toKeyAlias", {
			enumerable: true,
			get: function () {
				return _toKeyAlias.default;
			}
		});
		Object.defineProperty(exports3, "toStatement", {
			enumerable: true,
			get: function () {
				return _toStatement.default;
			}
		});
		Object.defineProperty(exports3, "traverse", {
			enumerable: true,
			get: function () {
				return _traverse.default;
			}
		});
		Object.defineProperty(exports3, "traverseFast", {
			enumerable: true,
			get: function () {
				return _traverseFast2.default;
			}
		});
		Object.defineProperty(exports3, "validate", {
			enumerable: true,
			get: function () {
				return _validate2.default;
			}
		});
		Object.defineProperty(exports3, "valueToNode", {
			enumerable: true,
			get: function () {
				return _valueToNode.default;
			}
		});
		var _isReactComponent = isReactComponent$1;
		var _isCompatTag = isCompatTag$1;
		var _buildChildren = buildChildren$1;
		var _assertNode = assertNode$1;
		var _index3 = generated$1;
		Object.keys(_index3).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (Object.prototype.hasOwnProperty.call(_exportNames, key))
				return;
			if (key in exports3 && exports3[key] === _index3[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _index3[key];
				}
			});
		});
		var _createTypeAnnotationBasedOnTypeof = createTypeAnnotationBasedOnTypeof$1;
		var _createFlowUnionType = createFlowUnionType$1;
		var _createTSUnionType = createTSUnionType$1;
		var _productions2 = productions;
		Object.keys(_productions2).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (Object.prototype.hasOwnProperty.call(_exportNames, key))
				return;
			if (key in exports3 && exports3[key] === _productions2[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _productions2[key];
				}
			});
		});
		var _index22 = generated$2;
		Object.keys(_index22).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (Object.prototype.hasOwnProperty.call(_exportNames, key))
				return;
			if (key in exports3 && exports3[key] === _index22[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _index22[key];
				}
			});
		});
		var _cloneNode2 = cloneNode$1;
		var _clone = clone$1;
		var _cloneDeep = cloneDeep$1;
		var _cloneDeepWithoutLoc = cloneDeepWithoutLoc$1;
		var _cloneWithoutLoc = cloneWithoutLoc$1;
		var _addComment = addComment$1;
		var _addComments2 = addComments$1;
		var _inheritInnerComments2 = inheritInnerComments$1;
		var _inheritLeadingComments2 = inheritLeadingComments$1;
		var _inheritsComments2 = inheritsComments$1;
		var _inheritTrailingComments2 = inheritTrailingComments$1;
		var _removeComments = removeComments$1;
		var _index32 = generated;
		Object.keys(_index32).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (Object.prototype.hasOwnProperty.call(_exportNames, key))
				return;
			if (key in exports3 && exports3[key] === _index32[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _index32[key];
				}
			});
		});
		var _index4 = constants;
		Object.keys(_index4).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (Object.prototype.hasOwnProperty.call(_exportNames, key))
				return;
			if (key in exports3 && exports3[key] === _index4[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _index4[key];
				}
			});
		});
		var _ensureBlock = ensureBlock$1;
		var _toBindingIdentifierName = toBindingIdentifierName$1;
		var _toBlock2 = toBlock$1;
		var _toComputedKey = toComputedKey$1;
		var _toExpression = toExpression$1;
		var _toIdentifier2 = toIdentifier$1;
		var _toKeyAlias = toKeyAlias$1;
		var _toStatement = toStatement$1;
		var _valueToNode = valueToNode$1;
		var _index5 = definitions;
		Object.keys(_index5).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (Object.prototype.hasOwnProperty.call(_exportNames, key))
				return;
			if (key in exports3 && exports3[key] === _index5[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _index5[key];
				}
			});
		});
		var _appendToMemberExpression = appendToMemberExpression$1;
		var _inherits = inherits$1;
		var _prependToMemberExpression = prependToMemberExpression$1;
		var _removeProperties2 = removeProperties$1;
		var _removePropertiesDeep2 = removePropertiesDeep$1;
		var _removeTypeDuplicates2 = removeTypeDuplicates$3;
		var _getAssignmentIdentifiers = getAssignmentIdentifiers$1;
		var _getBindingIdentifiers2 = getBindingIdentifiers$1;
		var _getOuterBindingIdentifiers = getOuterBindingIdentifiers$1;
		var _getFunctionName = getFunctionName$1;
		var _traverse = traverse$1;
		Object.keys(_traverse).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (Object.prototype.hasOwnProperty.call(_exportNames, key))
				return;
			if (key in exports3 && exports3[key] === _traverse[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _traverse[key];
				}
			});
		});
		var _traverseFast2 = traverseFast$2;
		var _shallowEqual2 = shallowEqual$1;
		var _is2 = is$1;
		var _isBinding = isBinding$1;
		var _isBlockScoped = isBlockScoped$1;
		var _isImmutable = isImmutable$1;
		var _isLet2 = isLet$1;
		var _isNode2 = isNode$1;
		var _isNodesEquivalent = isNodesEquivalent$1;
		var _isPlaceholderType2 = isPlaceholderType$1;
		var _isReferenced = isReferenced$1;
		var _isScope = isScope$1;
		var _isSpecifierDefault = isSpecifierDefault$1;
		var _isType2 = isType$2;
		var _isValidES3Identifier = isValidES3Identifier$1;
		var _isValidIdentifier2 = isValidIdentifier$1;
		var _isVar = isVar$1;
		var _matchesPattern2 = matchesPattern$1;
		var _validate2 = validate$3;
		var _buildMatchMemberExpression2 = buildMatchMemberExpression$1;
		var _index6 = generated$3;
		Object.keys(_index6).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (Object.prototype.hasOwnProperty.call(_exportNames, key))
				return;
			if (key in exports3 && exports3[key] === _index6[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _index6[key];
				}
			});
		});
		var _deprecationWarning2 = deprecationWarning$1;
		var _toSequenceExpression = toSequenceExpression$1;
		exports3.react = {
			isReactComponent: _isReactComponent.default,
			isCompatTag: _isCompatTag.default,
			buildChildren: _buildChildren.default
		};
		{
			exports3.toSequenceExpression = _toSequenceExpression.default;
		}
		if ({}.BABEL_TYPES_8_BREAKING) {
			console.warn("BABEL_TYPES_8_BREAKING is not supported anymore. Use the latest Babel 8.0.0 pre-release instead!");
		}
	})(lib$2);
	Object.defineProperty(whitespace$1, "__esModule", {
		value: true
	});
	whitespace$1.nodes = void 0;
	var _t$a = lib$2;
	const {
		FLIPPED_ALIAS_KEYS: FLIPPED_ALIAS_KEYS$1,
		isArrayExpression,
		isAssignmentExpression,
		isBinary,
		isBlockStatement,
		isCallExpression: isCallExpression$3,
		isFunction: isFunction$2,
		isIdentifier: isIdentifier$2,
		isLiteral: isLiteral$1,
		isMemberExpression: isMemberExpression$3,
		isObjectExpression,
		isOptionalCallExpression,
		isOptionalMemberExpression: isOptionalMemberExpression$1,
		isStringLiteral
	} = _t$a;

	function crawlInternal(node2, state) {
		if (!node2)
			return state;
		if (isMemberExpression$3(node2) || isOptionalMemberExpression$1(node2)) {
			crawlInternal(node2.object, state);
			if (node2.computed)
				crawlInternal(node2.property, state);
		} else if (isBinary(node2) || isAssignmentExpression(node2)) {
			crawlInternal(node2.left, state);
			crawlInternal(node2.right, state);
		} else if (isCallExpression$3(node2) || isOptionalCallExpression(node2)) {
			state.hasCall = true;
			crawlInternal(node2.callee, state);
		} else if (isFunction$2(node2)) {
			state.hasFunction = true;
		} else if (isIdentifier$2(node2)) {
			state.hasHelper = state.hasHelper || node2.callee && isHelper(node2.callee);
		}
		return state;
	}

	function crawl(node2) {
		return crawlInternal(node2, {
			hasCall: false,
			hasFunction: false,
			hasHelper: false
		});
	}

	function isHelper(node2) {
		if (!node2)
			return false;
		if (isMemberExpression$3(node2)) {
			return isHelper(node2.object) || isHelper(node2.property);
		} else if (isIdentifier$2(node2)) {
			return node2.name === "require" || node2.name.charCodeAt(0) === 95;
		} else if (isCallExpression$3(node2)) {
			return isHelper(node2.callee);
		} else if (isBinary(node2) || isAssignmentExpression(node2)) {
			return isIdentifier$2(node2.left) && isHelper(node2.left) || isHelper(node2.right);
		} else {
			return false;
		}
	}

	function isType(node2) {
		return isLiteral$1(node2) || isObjectExpression(node2) || isArrayExpression(node2) || isIdentifier$2(node2) || isMemberExpression$3(node2);
	}

	const nodes = whitespace$1.nodes = {
		AssignmentExpression(node2) {
			const state = crawl(node2.right);
			if (state.hasCall && state.hasHelper || state.hasFunction) {
				return state.hasFunction ? 1 | 2 : 2;
			}
		},
		SwitchCase(node2, parent) {
			return (!!node2.consequent.length || parent.cases[0] === node2 ? 1 : 0) | (!node2.consequent.length && parent.cases[parent.cases.length - 1] === node2 ? 2 : 0);
		},
		LogicalExpression(node2) {
			if (isFunction$2(node2.left) || isFunction$2(node2.right)) {
				return 2;
			}
		},
		Literal(node2) {
			if (isStringLiteral(node2) && node2.value === "use strict") {
				return 2;
			}
		},
		CallExpression(node2) {
			if (isFunction$2(node2.callee) || isHelper(node2)) {
				return 1 | 2;
			}
		},
		OptionalCallExpression(node2) {
			if (isFunction$2(node2.callee)) {
				return 1 | 2;
			}
		},
		VariableDeclaration(node2) {
			for (let i = 0; i < node2.declarations.length; i++) {
				const declar = node2.declarations[i];
				let enabled = isHelper(declar.id) && !isType(declar.init);
				if (!enabled && declar.init) {
					const state = crawl(declar.init);
					enabled = isHelper(declar.init) && state.hasCall || state.hasFunction;
				}
				if (enabled) {
					return 1 | 2;
				}
			}
		},
		IfStatement(node2) {
			if (isBlockStatement(node2.consequent)) {
				return 1 | 2;
			}
		}
	};
	nodes.ObjectProperty = nodes.ObjectTypeProperty = nodes.ObjectMethod = function (node2, parent) {
		if (parent.properties[0] === node2) {
			return 1;
		}
	};
	nodes.ObjectTypeCallProperty = function (node2, parent) {
		var _parent$properties;
		if (parent.callProperties[0] === node2 && !((_parent$properties = parent.properties) != null && _parent$properties.length)) {
			return 1;
		}
	};
	nodes.ObjectTypeIndexer = function (node2, parent) {
		var _parent$properties2, _parent$callPropertie;
		if (parent.indexers[0] === node2 && !((_parent$properties2 = parent.properties) != null && _parent$properties2.length) && !((_parent$callPropertie = parent.callProperties) != null && _parent$callPropertie.length)) {
			return 1;
		}
	};
	nodes.ObjectTypeInternalSlot = function (node2, parent) {
		var _parent$properties3, _parent$callPropertie2, _parent$indexers;
		if (parent.internalSlots[0] === node2 && !((_parent$properties3 = parent.properties) != null && _parent$properties3.length) && !((_parent$callPropertie2 = parent.callProperties) != null && _parent$callPropertie2.length) && !((_parent$indexers = parent.indexers) != null && _parent$indexers.length)) {
			return 1;
		}
	};
	[["Function", true], ["Class", true], ["Loop", true], ["LabeledStatement", true], ["SwitchStatement", true], ["TryStatement", true]].forEach(function ([type, amounts]) {
		[type].concat(FLIPPED_ALIAS_KEYS$1[type] || []).forEach(function (type2) {
			const ret = amounts ? 1 | 2 : 0;
			nodes[type2] = () => ret;
		});
	});
	var parentheses = {};
	Object.defineProperty(parentheses, "__esModule", {
		value: true
	});
	parentheses.AssignmentExpression = AssignmentExpression$1;
	parentheses.Binary = Binary;
	parentheses.BinaryExpression = BinaryExpression;
	parentheses.ClassExpression = ClassExpression;
	parentheses.ArrowFunctionExpression = parentheses.ConditionalExpression = ConditionalExpression$1;
	parentheses.DoExpression = DoExpression$1;
	parentheses.FunctionExpression = FunctionExpression$1;
	parentheses.FunctionTypeAnnotation = FunctionTypeAnnotation;
	parentheses.Identifier = Identifier$1;
	parentheses.LogicalExpression = LogicalExpression;
	parentheses.NullableTypeAnnotation = NullableTypeAnnotation;
	parentheses.ObjectExpression = ObjectExpression$1;
	parentheses.OptionalIndexedAccessType = OptionalIndexedAccessType;
	parentheses.OptionalCallExpression = parentheses.OptionalMemberExpression = OptionalMemberExpression$1;
	parentheses.SequenceExpression = SequenceExpression$1;
	parentheses.TSSatisfiesExpression = parentheses.TSAsExpression = TSAsExpression;
	parentheses.TSConditionalType = TSConditionalType$1;
	parentheses.TSConstructorType = parentheses.TSFunctionType = TSFunctionType$1;
	parentheses.TSInferType = TSInferType$1;
	parentheses.TSInstantiationExpression = TSInstantiationExpression$1;
	parentheses.TSIntersectionType = TSIntersectionType$1;
	parentheses.UnaryLike = parentheses.TSTypeAssertion = UnaryLike;
	parentheses.TSTypeOperator = TSTypeOperator$1;
	parentheses.TSUnionType = TSUnionType$1;
	parentheses.IntersectionTypeAnnotation = parentheses.UnionTypeAnnotation = UnionTypeAnnotation;
	parentheses.UpdateExpression = UpdateExpression$1;
	parentheses.AwaitExpression = parentheses.YieldExpression = YieldExpression$1;
	var _t$9 = lib$2;
	var _index$4 = node;
	const {
		isArrayTypeAnnotation,
		isBinaryExpression,
		isCallExpression: isCallExpression$2,
		isForOfStatement,
		isIndexedAccessType,
		isMemberExpression: isMemberExpression$2,
		isObjectPattern,
		isOptionalMemberExpression,
		isYieldExpression,
		isStatement: isStatement$3
	} = _t$9;
	const PRECEDENCE = /* @__PURE__ */ new Map([["||", 0], ["??", 0], ["|>", 0], ["&&", 1], ["|", 2], ["^", 3], ["&", 4], ["==", 5], ["===", 5], ["!=", 5], ["!==", 5], ["<", 6], [">", 6], ["<=", 6], [">=", 6], ["in", 6], ["instanceof", 6], [">>", 7], ["<<", 7], [">>>", 7], ["+", 8], ["-", 8], ["*", 9], ["/", 9], ["%", 9], ["**", 10]]);

	function getBinaryPrecedence(node2, nodeType) {
		if (nodeType === "BinaryExpression" || nodeType === "LogicalExpression") {
			return PRECEDENCE.get(node2.operator);
		}
		if (nodeType === "TSAsExpression" || nodeType === "TSSatisfiesExpression") {
			return PRECEDENCE.get("in");
		}
	}

	function isTSTypeExpression(nodeType) {
		return nodeType === "TSAsExpression" || nodeType === "TSSatisfiesExpression" || nodeType === "TSTypeAssertion";
	}

	const isClassExtendsClause = (node2, parent) => {
		const parentType = parent.type;
		return (parentType === "ClassDeclaration" || parentType === "ClassExpression") && parent.superClass === node2;
	};
	const hasPostfixPart = (node2, parent) => {
		const parentType = parent.type;
		return (parentType === "MemberExpression" || parentType === "OptionalMemberExpression") && parent.object === node2 || (parentType === "CallExpression" || parentType === "OptionalCallExpression" || parentType === "NewExpression") && parent.callee === node2 || parentType === "TaggedTemplateExpression" && parent.tag === node2 || parentType === "TSNonNullExpression";
	};

	function NullableTypeAnnotation(node2, parent) {
		return isArrayTypeAnnotation(parent);
	}

	function FunctionTypeAnnotation(node2, parent, tokenContext) {
		const parentType = parent.type;
		return parentType === "UnionTypeAnnotation" || parentType === "IntersectionTypeAnnotation" || parentType === "ArrayTypeAnnotation" || Boolean(tokenContext & _index$4.TokenContext.arrowFlowReturnType);
	}

	function UpdateExpression$1(node2, parent) {
		return hasPostfixPart(node2, parent) || isClassExtendsClause(node2, parent);
	}

	function needsParenBeforeExpressionBrace(tokenContext) {
		return Boolean(tokenContext & (_index$4.TokenContext.expressionStatement | _index$4.TokenContext.arrowBody));
	}

	function ObjectExpression$1(node2, parent, tokenContext) {
		return needsParenBeforeExpressionBrace(tokenContext);
	}

	function DoExpression$1(node2, parent, tokenContext) {
		return !node2.async && Boolean(tokenContext & _index$4.TokenContext.expressionStatement);
	}

	function Binary(node2, parent) {
		const parentType = parent.type;
		if (node2.type === "BinaryExpression" && node2.operator === "**" && parentType === "BinaryExpression" && parent.operator === "**") {
			return parent.left === node2;
		}
		if (isClassExtendsClause(node2, parent)) {
			return true;
		}
		if (hasPostfixPart(node2, parent) || parentType === "UnaryExpression" || parentType === "SpreadElement" || parentType === "AwaitExpression") {
			return true;
		}
		const parentPos = getBinaryPrecedence(parent, parentType);
		if (parentPos != null) {
			const nodePos = getBinaryPrecedence(node2, node2.type);
			if (parentPos === nodePos && parentType === "BinaryExpression" && parent.right === node2 || parentPos > nodePos) {
				return true;
			}
		}
		return void 0;
	}

	function UnionTypeAnnotation(node2, parent) {
		const parentType = parent.type;
		return parentType === "ArrayTypeAnnotation" || parentType === "NullableTypeAnnotation" || parentType === "IntersectionTypeAnnotation" || parentType === "UnionTypeAnnotation";
	}

	function OptionalIndexedAccessType(node2, parent) {
		return isIndexedAccessType(parent) && parent.objectType === node2;
	}

	function TSAsExpression(node2, parent) {
		if ((parent.type === "AssignmentExpression" || parent.type === "AssignmentPattern") && parent.left === node2) {
			return true;
		}
		if (parent.type === "BinaryExpression" && (parent.operator === "|" || parent.operator === "&") && node2 === parent.left) {
			return true;
		}
		return Binary(node2, parent);
	}

	function TSConditionalType$1(node2, parent) {
		const parentType = parent.type;
		if (parentType === "TSArrayType" || parentType === "TSIndexedAccessType" && parent.objectType === node2 || parentType === "TSOptionalType" || parentType === "TSTypeOperator" || parentType === "TSTypeParameter") {
			return true;
		}
		if ((parentType === "TSIntersectionType" || parentType === "TSUnionType") && parent.types[0] === node2) {
			return true;
		}
		if (parentType === "TSConditionalType" && (parent.checkType === node2 || parent.extendsType === node2)) {
			return true;
		}
		return false;
	}

	function TSUnionType$1(node2, parent) {
		const parentType = parent.type;
		return parentType === "TSIntersectionType" || parentType === "TSTypeOperator" || parentType === "TSArrayType" || parentType === "TSIndexedAccessType" && parent.objectType === node2 || parentType === "TSOptionalType";
	}

	function TSIntersectionType$1(node2, parent) {
		const parentType = parent.type;
		return parentType === "TSTypeOperator" || parentType === "TSArrayType" || parentType === "TSIndexedAccessType" && parent.objectType === node2 || parentType === "TSOptionalType";
	}

	function TSInferType$1(node2, parent) {
		const parentType = parent.type;
		if (parentType === "TSArrayType" || parentType === "TSIndexedAccessType" && parent.objectType === node2 || parentType === "TSOptionalType") {
			return true;
		}
		if (node2.typeParameter.constraint) {
			if ((parentType === "TSIntersectionType" || parentType === "TSUnionType") && parent.types[0] === node2) {
				return true;
			}
		}
		return false;
	}

	function TSTypeOperator$1(node2, parent) {
		const parentType = parent.type;
		return parentType === "TSArrayType" || parentType === "TSIndexedAccessType" && parent.objectType === node2 || parentType === "TSOptionalType";
	}

	function TSInstantiationExpression$1(node2, parent) {
		const parentType = parent.type;
		return (parentType === "CallExpression" || parentType === "OptionalCallExpression" || parentType === "NewExpression" || parentType === "TSInstantiationExpression") && !!parent.typeParameters;
	}

	function TSFunctionType$1(node2, parent) {
		const parentType = parent.type;
		return parentType === "TSIntersectionType" || parentType === "TSUnionType" || parentType === "TSTypeOperator" || parentType === "TSOptionalType" || parentType === "TSArrayType" || parentType === "TSIndexedAccessType" && parent.objectType === node2 || parentType === "TSConditionalType" && (parent.checkType === node2 || parent.extendsType === node2);
	}

	function BinaryExpression(node2, parent, tokenContext, inForStatementInit) {
		return node2.operator === "in" && inForStatementInit;
	}

	function SequenceExpression$1(node2, parent) {
		const parentType = parent.type;
		if (parentType === "SequenceExpression" || parentType === "ParenthesizedExpression" || parentType === "MemberExpression" && parent.property === node2 || parentType === "OptionalMemberExpression" && parent.property === node2 || parentType === "TemplateLiteral") {
			return false;
		}
		if (parentType === "ClassDeclaration") {
			return true;
		}
		if (parentType === "ForOfStatement") {
			return parent.right === node2;
		}
		if (parentType === "ExportDefaultDeclaration") {
			return true;
		}
		return !isStatement$3(parent);
	}

	function YieldExpression$1(node2, parent) {
		const parentType = parent.type;
		return parentType === "BinaryExpression" || parentType === "LogicalExpression" || parentType === "UnaryExpression" || parentType === "SpreadElement" || hasPostfixPart(node2, parent) || parentType === "AwaitExpression" && isYieldExpression(node2) || parentType === "ConditionalExpression" && node2 === parent.test || isClassExtendsClause(node2, parent) || isTSTypeExpression(parentType);
	}

	function ClassExpression(node2, parent, tokenContext) {
		return Boolean(tokenContext & (_index$4.TokenContext.expressionStatement | _index$4.TokenContext.exportDefault));
	}

	function UnaryLike(node2, parent) {
		return hasPostfixPart(node2, parent) || isBinaryExpression(parent) && parent.operator === "**" && parent.left === node2 || isClassExtendsClause(node2, parent);
	}

	function FunctionExpression$1(node2, parent, tokenContext) {
		return Boolean(tokenContext & (_index$4.TokenContext.expressionStatement | _index$4.TokenContext.exportDefault));
	}

	function ConditionalExpression$1(node2, parent) {
		const parentType = parent.type;
		if (parentType === "UnaryExpression" || parentType === "SpreadElement" || parentType === "BinaryExpression" || parentType === "LogicalExpression" || parentType === "ConditionalExpression" && parent.test === node2 || parentType === "AwaitExpression" || isTSTypeExpression(parentType)) {
			return true;
		}
		return UnaryLike(node2, parent);
	}

	function OptionalMemberExpression$1(node2, parent) {
		return isCallExpression$2(parent) && parent.callee === node2 || isMemberExpression$2(parent) && parent.object === node2;
	}

	function AssignmentExpression$1(node2, parent, tokenContext) {
		if (needsParenBeforeExpressionBrace(tokenContext) && isObjectPattern(node2.left)) {
			return true;
		} else {
			return ConditionalExpression$1(node2, parent);
		}
	}

	function LogicalExpression(node2, parent) {
		const parentType = parent.type;
		if (isTSTypeExpression(parentType))
			return true;
		if (parentType !== "LogicalExpression")
			return false;
		switch (node2.operator) {
			case "||":
				return parent.operator === "??" || parent.operator === "&&";
			case "&&":
				return parent.operator === "??";
			case "??":
				return parent.operator !== "??";
		}
	}

	function Identifier$1(node2, parent, tokenContext, _inForInit, getRawIdentifier) {
		var _node$extra;
		const parentType = parent.type;
		if ((_node$extra = node2.extra) != null && _node$extra.parenthesized && parentType === "AssignmentExpression" && parent.left === node2) {
			const rightType = parent.right.type;
			if ((rightType === "FunctionExpression" || rightType === "ClassExpression") && parent.right.id == null) {
				return true;
			}
		}
		if (getRawIdentifier && getRawIdentifier(node2) !== node2.name) {
			return false;
		}
		if (node2.name === "let") {
			const isFollowedByBracket = isMemberExpression$2(parent, {
				object: node2,
				computed: true
			}) || isOptionalMemberExpression(parent, {
				object: node2,
				computed: true,
				optional: false
			});
			if (isFollowedByBracket && tokenContext & (_index$4.TokenContext.expressionStatement | _index$4.TokenContext.forHead | _index$4.TokenContext.forInHead)) {
				return true;
			}
			return Boolean(tokenContext & _index$4.TokenContext.forOfHead);
		}
		return node2.name === "async" && isForOfStatement(parent, {
			left: node2,
			await: false
		});
	}

	Object.defineProperty(node, "__esModule", {
		value: true
	});
	node.TokenContext = void 0;
	node.isLastChild = isLastChild;
	node.needsParens = needsParens$1;
	node.needsWhitespace = needsWhitespace;
	node.needsWhitespaceAfter = needsWhitespaceAfter;
	node.needsWhitespaceBefore = needsWhitespaceBefore;
	var whitespace = whitespace$1;
	var parens = parentheses;
	var _t$8 = lib$2;
	const {
		FLIPPED_ALIAS_KEYS,
		VISITOR_KEYS: VISITOR_KEYS$1,
		isCallExpression: isCallExpression$1,
		isDecorator,
		isExpressionStatement,
		isMemberExpression: isMemberExpression$1,
		isNewExpression: isNewExpression$1,
		isParenthesizedExpression
	} = _t$8;
	node.TokenContext = {
		expressionStatement: 1,
		arrowBody: 2,
		exportDefault: 4,
		forHead: 8,
		forInHead: 16,
		forOfHead: 32,
		arrowFlowReturnType: 64
	};

	function expandAliases(obj) {
		const map = /* @__PURE__ */ new Map();

		function add(type, func) {
			const fn = map.get(type);
			map.set(type, fn ? function (node2, parent, stack, inForInit, getRawIdentifier) {
				var _fn;
				return (_fn = fn(node2, parent, stack, inForInit, getRawIdentifier)) != null ? _fn : func(node2, parent, stack, inForInit, getRawIdentifier);
			} : func);
		}

		for (const type of Object.keys(obj)) {
			const aliases = FLIPPED_ALIAS_KEYS[type];
			if (aliases) {
				for (const alias of aliases) {
					add(alias, obj[type]);
				}
			} else {
				add(type, obj[type]);
			}
		}
		return map;
	}

	const expandedParens = expandAliases(parens);
	const expandedWhitespaceNodes = expandAliases(whitespace.nodes);

	function isOrHasCallExpression(node2) {
		if (isCallExpression$1(node2)) {
			return true;
		}
		return isMemberExpression$1(node2) && isOrHasCallExpression(node2.object);
	}

	function needsWhitespace(node2, parent, type) {
		var _expandedWhitespaceNo;
		if (!node2)
			return false;
		if (isExpressionStatement(node2)) {
			node2 = node2.expression;
		}
		const flag = (_expandedWhitespaceNo = expandedWhitespaceNodes.get(node2.type)) == null ? void 0 : _expandedWhitespaceNo(node2, parent);
		if (typeof flag === "number") {
			return (flag & type) !== 0;
		}
		return false;
	}

	function needsWhitespaceBefore(node2, parent) {
		return needsWhitespace(node2, parent, 1);
	}

	function needsWhitespaceAfter(node2, parent) {
		return needsWhitespace(node2, parent, 2);
	}

	function needsParens$1(node2, parent, tokenContext, inForInit, getRawIdentifier) {
		var _expandedParens$get;
		if (!parent)
			return false;
		if (isNewExpression$1(parent) && parent.callee === node2) {
			if (isOrHasCallExpression(node2))
				return true;
		}
		if (isDecorator(parent)) {
			return !isDecoratorMemberExpression(node2) && !(isCallExpression$1(node2) && isDecoratorMemberExpression(node2.callee)) && !isParenthesizedExpression(node2);
		}
		return (_expandedParens$get = expandedParens.get(node2.type)) == null ? void 0 : _expandedParens$get(node2, parent, tokenContext, inForInit, getRawIdentifier);
	}

	function isDecoratorMemberExpression(node2) {
		switch (node2.type) {
			case "Identifier":
				return true;
			case "MemberExpression":
				return !node2.computed && node2.property.type === "Identifier" && isDecoratorMemberExpression(node2.object);
			default:
				return false;
		}
	}

	function isLastChild(parent, child) {
		const visitorKeys = VISITOR_KEYS$1[parent.type];
		for (let i = visitorKeys.length - 1; i >= 0; i--) {
			const val = parent[visitorKeys[i]];
			if (val === child) {
				return true;
			} else if (Array.isArray(val)) {
				let j = val.length - 1;
				while (j >= 0 && val[j] === null)
					j--;
				return j >= 0 && val[j] === child;
			} else if (val) {
				return false;
			}
		}
		return false;
	}

	var tokenMap = {};
	Object.defineProperty(tokenMap, "__esModule", {
		value: true
	});
	tokenMap.TokenMap = void 0;
	var _t$7 = lib$2;
	const {
		traverseFast,
		VISITOR_KEYS
	} = _t$7;

	class TokenMap {
		constructor(ast, tokens, source) {
			this._tokens = void 0;
			this._source = void 0;
			this._nodesToTokenIndexes = /* @__PURE__ */ new Map();
			this._nodesOccurrencesCountCache = /* @__PURE__ */ new Map();
			this._tokensCache = /* @__PURE__ */ new Map();
			this._tokens = tokens;
			this._source = source;
			traverseFast(ast, (node2) => {
				const indexes = this._getTokensIndexesOfNode(node2);
				if (indexes.length > 0)
					this._nodesToTokenIndexes.set(node2, indexes);
			});
			this._tokensCache = null;
		}

		has(node2) {
			return this._nodesToTokenIndexes.has(node2);
		}

		getIndexes(node2) {
			return this._nodesToTokenIndexes.get(node2);
		}

		find(node2, condition) {
			const indexes = this._nodesToTokenIndexes.get(node2);
			if (indexes) {
				for (let k = 0; k < indexes.length; k++) {
					const index = indexes[k];
					const tok = this._tokens[index];
					if (condition(tok, index))
						return tok;
				}
			}
			return null;
		}

		findLastIndex(node2, condition) {
			const indexes = this._nodesToTokenIndexes.get(node2);
			if (indexes) {
				for (let k = indexes.length - 1; k >= 0; k--) {
					const index = indexes[k];
					const tok = this._tokens[index];
					if (condition(tok, index))
						return index;
				}
			}
			return -1;
		}

		findMatching(node2, test, occurrenceCount = 0) {
			const indexes = this._nodesToTokenIndexes.get(node2);
			if (indexes) {
				let i = 0;
				const count = occurrenceCount;
				if (count > 1) {
					const cache = this._nodesOccurrencesCountCache.get(node2);
					if (cache && cache.test === test && cache.count < count) {
						i = cache.i + 1;
						occurrenceCount -= cache.count + 1;
					}
				}
				for (; i < indexes.length; i++) {
					const tok = this._tokens[indexes[i]];
					if (this.matchesOriginal(tok, test)) {
						if (occurrenceCount === 0) {
							if (count > 0) {
								this._nodesOccurrencesCountCache.set(node2, {
									test,
									count,
									i
								});
							}
							return tok;
						}
						occurrenceCount--;
					}
				}
			}
			return null;
		}

		matchesOriginal(token, test) {
			if (token.end - token.start !== test.length)
				return false;
			if (token.value != null)
				return token.value === test;
			return this._source.startsWith(test, token.start);
		}

		startMatches(node2, test) {
			const indexes = this._nodesToTokenIndexes.get(node2);
			if (!indexes)
				return false;
			const tok = this._tokens[indexes[0]];
			if (tok.start !== node2.start)
				return false;
			return this.matchesOriginal(tok, test);
		}

		endMatches(node2, test) {
			const indexes = this._nodesToTokenIndexes.get(node2);
			if (!indexes)
				return false;
			const tok = this._tokens[indexes[indexes.length - 1]];
			if (tok.end !== node2.end)
				return false;
			return this.matchesOriginal(tok, test);
		}

		_getTokensIndexesOfNode(node2) {
			if (node2.start == null || node2.end == null)
				return [];
			const {
				first,
				last
			} = this._findTokensOfNode(node2, 0, this._tokens.length - 1);
			let low = first;
			const children = childrenIterator(node2);
			if ((node2.type === "ExportNamedDeclaration" || node2.type === "ExportDefaultDeclaration") && node2.declaration && node2.declaration.type === "ClassDeclaration") {
				children.next();
			}
			const indexes = [];
			for (const child of children) {
				if (child == null)
					continue;
				if (child.start == null || child.end == null)
					continue;
				const childTok = this._findTokensOfNode(child, low, last);
				const high = childTok.first;
				for (let k = low; k < high; k++)
					indexes.push(k);
				low = childTok.last + 1;
			}
			for (let k = low; k <= last; k++)
				indexes.push(k);
			return indexes;
		}

		_findTokensOfNode(node2, low, high) {
			const cached = this._tokensCache.get(node2);
			if (cached)
				return cached;
			const first = this._findFirstTokenOfNode(node2.start, low, high);
			const last = this._findLastTokenOfNode(node2.end, first, high);
			this._tokensCache.set(node2, {
				first,
				last
			});
			return {
				first,
				last
			};
		}

		_findFirstTokenOfNode(start, low, high) {
			while (low <= high) {
				const mid = high + low >> 1;
				if (start < this._tokens[mid].start) {
					high = mid - 1;
				} else if (start > this._tokens[mid].start) {
					low = mid + 1;
				} else {
					return mid;
				}
			}
			return low;
		}

		_findLastTokenOfNode(end, low, high) {
			while (low <= high) {
				const mid = high + low >> 1;
				if (end < this._tokens[mid].end) {
					high = mid - 1;
				} else if (end > this._tokens[mid].end) {
					low = mid + 1;
				} else {
					return mid;
				}
			}
			return high;
		}
	}

	tokenMap.TokenMap = TokenMap;

	function* childrenIterator(node2) {
		if (node2.type === "TemplateLiteral") {
			yield node2.quasis[0];
			for (let i = 1; i < node2.quasis.length; i++) {
				yield node2.expressions[i - 1];
				yield node2.quasis[i];
			}
			return;
		}
		const keys2 = VISITOR_KEYS[node2.type];
		for (const key of keys2) {
			const child = node2[key];
			if (!child)
				continue;
			if (Array.isArray(child)) {
				yield* child;
			} else {
				yield child;
			}
		}
	}

	var generators = {};
	var templateLiterals = {};
	Object.defineProperty(templateLiterals, "__esModule", {
		value: true
	});
	templateLiterals.TaggedTemplateExpression = TaggedTemplateExpression;
	templateLiterals.TemplateElement = TemplateElement;
	templateLiterals.TemplateLiteral = TemplateLiteral;
	templateLiterals._printTemplate = _printTemplate;

	function TaggedTemplateExpression(node2) {
		this.print(node2.tag);
		{
			this.print(node2.typeParameters);
		}
		this.print(node2.quasi);
	}

	function TemplateElement() {
		throw new Error("TemplateElement printing is handled in TemplateLiteral");
	}

	function _printTemplate(node2, substitutions) {
		const quasis = node2.quasis;
		let partRaw = "`";
		for (let i = 0; i < quasis.length - 1; i++) {
			partRaw += quasis[i].value.raw;
			this.token(partRaw + "${", true);
			this.print(substitutions[i]);
			partRaw = "}";
			if (this.tokenMap) {
				const token = this.tokenMap.findMatching(node2, "}", i);
				if (token)
					this._catchUpTo(token.loc.start);
			}
		}
		partRaw += quasis[quasis.length - 1].value.raw;
		this.token(partRaw + "`", true);
	}

	function TemplateLiteral(node2) {
		this._printTemplate(node2, node2.expressions);
	}

	var expressions = {};
	Object.defineProperty(expressions, "__esModule", {
		value: true
	});
	expressions.LogicalExpression = expressions.BinaryExpression = expressions.AssignmentExpression = AssignmentExpression;
	expressions.AssignmentPattern = AssignmentPattern;
	expressions.AwaitExpression = AwaitExpression;
	expressions.BindExpression = BindExpression;
	expressions.CallExpression = CallExpression;
	expressions.ConditionalExpression = ConditionalExpression;
	expressions.Decorator = Decorator;
	expressions.DoExpression = DoExpression;
	expressions.EmptyStatement = EmptyStatement;
	expressions.ExpressionStatement = ExpressionStatement;
	expressions.Import = Import;
	expressions.MemberExpression = MemberExpression;
	expressions.MetaProperty = MetaProperty;
	expressions.ModuleExpression = ModuleExpression;
	expressions.NewExpression = NewExpression;
	expressions.OptionalCallExpression = OptionalCallExpression;
	expressions.OptionalMemberExpression = OptionalMemberExpression;
	expressions.ParenthesizedExpression = ParenthesizedExpression;
	expressions.PrivateName = PrivateName;
	expressions.SequenceExpression = SequenceExpression;
	expressions.Super = Super;
	expressions.ThisExpression = ThisExpression;
	expressions.UnaryExpression = UnaryExpression;
	expressions.UpdateExpression = UpdateExpression;
	expressions.V8IntrinsicIdentifier = V8IntrinsicIdentifier;
	expressions.YieldExpression = YieldExpression;
	expressions._shouldPrintDecoratorsBeforeExport = _shouldPrintDecoratorsBeforeExport;
	var _t$6 = lib$2;
	var _index$3 = node;
	const {
		isCallExpression,
		isLiteral,
		isMemberExpression,
		isNewExpression,
		isPattern
	} = _t$6;

	function UnaryExpression(node2) {
		const {
			operator
		} = node2;
		if (operator === "void" || operator === "delete" || operator === "typeof" || operator === "throw") {
			this.word(operator);
			this.space();
		} else {
			this.token(operator);
		}
		this.print(node2.argument);
	}

	function DoExpression(node2) {
		if (node2.async) {
			this.word("async", true);
			this.space();
		}
		this.word("do");
		this.space();
		this.print(node2.body);
	}

	function ParenthesizedExpression(node2) {
		this.tokenChar(40);
		const exit = this.enterDelimited();
		this.print(node2.expression);
		exit();
		this.rightParens(node2);
	}

	function UpdateExpression(node2) {
		if (node2.prefix) {
			this.token(node2.operator);
			this.print(node2.argument);
		} else {
			this.print(node2.argument, true);
			this.token(node2.operator);
		}
	}

	function ConditionalExpression(node2) {
		this.print(node2.test);
		this.space();
		this.tokenChar(63);
		this.space();
		this.print(node2.consequent);
		this.space();
		this.tokenChar(58);
		this.space();
		this.print(node2.alternate);
	}

	function NewExpression(node2, parent) {
		this.word("new");
		this.space();
		this.print(node2.callee);
		if (this.format.minified && node2.arguments.length === 0 && !node2.optional && !isCallExpression(parent, {
			callee: node2
		}) && !isMemberExpression(parent) && !isNewExpression(parent)) {
			return;
		}
		this.print(node2.typeArguments);
		{
			this.print(node2.typeParameters);
		}
		if (node2.optional) {
			this.token("?.");
		}
		if (node2.arguments.length === 0 && this.tokenMap && !this.tokenMap.endMatches(node2, ")")) {
			return;
		}
		this.tokenChar(40);
		const exit = this.enterDelimited();
		this.printList(node2.arguments, this.shouldPrintTrailingComma(")"));
		exit();
		this.rightParens(node2);
	}

	function SequenceExpression(node2) {
		this.printList(node2.expressions);
	}

	function ThisExpression() {
		this.word("this");
	}

	function Super() {
		this.word("super");
	}

	function _shouldPrintDecoratorsBeforeExport(node2) {
		if (typeof this.format.decoratorsBeforeExport === "boolean") {
			return this.format.decoratorsBeforeExport;
		}
		return typeof node2.start === "number" && node2.start === node2.declaration.start;
	}

	function Decorator(node2) {
		this.tokenChar(64);
		this.print(node2.expression);
		this.newline();
	}

	function OptionalMemberExpression(node2) {
		let {
			computed
		} = node2;
		const {
			optional,
			property
		} = node2;
		this.print(node2.object);
		if (!computed && isMemberExpression(property)) {
			throw new TypeError("Got a MemberExpression for MemberExpression property");
		}
		if (isLiteral(property) && typeof property.value === "number") {
			computed = true;
		}
		if (optional) {
			this.token("?.");
		}
		if (computed) {
			this.tokenChar(91);
			this.print(property);
			this.tokenChar(93);
		} else {
			if (!optional) {
				this.tokenChar(46);
			}
			this.print(property);
		}
	}

	function OptionalCallExpression(node2) {
		this.print(node2.callee);
		{
			this.print(node2.typeParameters);
		}
		if (node2.optional) {
			this.token("?.");
		}
		this.print(node2.typeArguments);
		this.tokenChar(40);
		const exit = this.enterDelimited();
		this.printList(node2.arguments);
		exit();
		this.rightParens(node2);
	}

	function CallExpression(node2) {
		this.print(node2.callee);
		this.print(node2.typeArguments);
		{
			this.print(node2.typeParameters);
		}
		this.tokenChar(40);
		const exit = this.enterDelimited();
		this.printList(node2.arguments, this.shouldPrintTrailingComma(")"));
		exit();
		this.rightParens(node2);
	}

	function Import() {
		this.word("import");
	}

	function AwaitExpression(node2) {
		this.word("await");
		if (node2.argument) {
			this.space();
			this.printTerminatorless(node2.argument);
		}
	}

	function YieldExpression(node2) {
		this.word("yield", true);
		if (node2.delegate) {
			this.tokenChar(42);
			if (node2.argument) {
				this.space();
				this.print(node2.argument);
			}
		} else {
			if (node2.argument) {
				this.space();
				this.printTerminatorless(node2.argument);
			}
		}
	}

	function EmptyStatement() {
		this.semicolon(true);
	}

	function ExpressionStatement(node2) {
		this.tokenContext |= _index$3.TokenContext.expressionStatement;
		this.print(node2.expression);
		this.semicolon();
	}

	function AssignmentPattern(node2) {
		this.print(node2.left);
		if (node2.left.type === "Identifier" || isPattern(node2.left)) {
			if (node2.left.optional)
				this.tokenChar(63);
			this.print(node2.left.typeAnnotation);
		}
		this.space();
		this.tokenChar(61);
		this.space();
		this.print(node2.right);
	}

	function AssignmentExpression(node2) {
		this.print(node2.left);
		this.space();
		if (node2.operator === "in" || node2.operator === "instanceof") {
			this.word(node2.operator);
		} else {
			this.token(node2.operator);
			this._endsWithDiv = node2.operator === "/";
		}
		this.space();
		this.print(node2.right);
	}

	function BindExpression(node2) {
		this.print(node2.object);
		this.token("::");
		this.print(node2.callee);
	}

	function MemberExpression(node2) {
		this.print(node2.object);
		if (!node2.computed && isMemberExpression(node2.property)) {
			throw new TypeError("Got a MemberExpression for MemberExpression property");
		}
		let computed = node2.computed;
		if (isLiteral(node2.property) && typeof node2.property.value === "number") {
			computed = true;
		}
		if (computed) {
			const exit = this.enterDelimited();
			this.tokenChar(91);
			this.print(node2.property);
			this.tokenChar(93);
			exit();
		} else {
			this.tokenChar(46);
			this.print(node2.property);
		}
	}

	function MetaProperty(node2) {
		this.print(node2.meta);
		this.tokenChar(46);
		this.print(node2.property);
	}

	function PrivateName(node2) {
		this.tokenChar(35);
		this.print(node2.id);
	}

	function V8IntrinsicIdentifier(node2) {
		this.tokenChar(37);
		this.word(node2.name);
	}

	function ModuleExpression(node2) {
		this.word("module", true);
		this.space();
		this.tokenChar(123);
		this.indent();
		const {
			body
		} = node2;
		if (body.body.length || body.directives.length) {
			this.newline();
		}
		this.print(body);
		this.dedent();
		this.rightBrace(node2);
	}

	var statements = {};
	Object.defineProperty(statements, "__esModule", {
		value: true
	});
	statements.BreakStatement = BreakStatement;
	statements.CatchClause = CatchClause;
	statements.ContinueStatement = ContinueStatement;
	statements.DebuggerStatement = DebuggerStatement;
	statements.DoWhileStatement = DoWhileStatement;
	statements.ForOfStatement = statements.ForInStatement = void 0;
	statements.ForStatement = ForStatement;
	statements.IfStatement = IfStatement;
	statements.LabeledStatement = LabeledStatement;
	statements.ReturnStatement = ReturnStatement;
	statements.SwitchCase = SwitchCase;
	statements.SwitchStatement = SwitchStatement;
	statements.ThrowStatement = ThrowStatement;
	statements.TryStatement = TryStatement;
	statements.VariableDeclaration = VariableDeclaration;
	statements.VariableDeclarator = VariableDeclarator;
	statements.WhileStatement = WhileStatement;
	statements.WithStatement = WithStatement;
	var _t$5 = lib$2;
	var _index$2 = node;
	const {
		isFor,
		isForStatement,
		isIfStatement,
		isStatement: isStatement$2
	} = _t$5;

	function WithStatement(node2) {
		this.word("with");
		this.space();
		this.tokenChar(40);
		this.print(node2.object);
		this.tokenChar(41);
		this.printBlock(node2);
	}

	function IfStatement(node2) {
		this.word("if");
		this.space();
		this.tokenChar(40);
		this.print(node2.test);
		this.tokenChar(41);
		this.space();
		const needsBlock = node2.alternate && isIfStatement(getLastStatement(node2.consequent));
		if (needsBlock) {
			this.tokenChar(123);
			this.newline();
			this.indent();
		}
		this.printAndIndentOnComments(node2.consequent);
		if (needsBlock) {
			this.dedent();
			this.newline();
			this.tokenChar(125);
		}
		if (node2.alternate) {
			if (this.endsWith(125))
				this.space();
			this.word("else");
			this.space();
			this.printAndIndentOnComments(node2.alternate);
		}
	}

	function getLastStatement(statement) {
		const {
			body
		} = statement;
		if (isStatement$2(body) === false) {
			return statement;
		}
		return getLastStatement(body);
	}

	function ForStatement(node2) {
		this.word("for");
		this.space();
		this.tokenChar(40);
		{
			const exit = this.enterForStatementInit();
			this.tokenContext |= _index$2.TokenContext.forHead;
			this.print(node2.init);
			exit();
		}
		this.tokenChar(59);
		if (node2.test) {
			this.space();
			this.print(node2.test);
		}
		this.token(";", false, 1);
		if (node2.update) {
			this.space();
			this.print(node2.update);
		}
		this.tokenChar(41);
		this.printBlock(node2);
	}

	function WhileStatement(node2) {
		this.word("while");
		this.space();
		this.tokenChar(40);
		this.print(node2.test);
		this.tokenChar(41);
		this.printBlock(node2);
	}

	function ForXStatement(node2) {
		this.word("for");
		this.space();
		const isForOf = node2.type === "ForOfStatement";
		if (isForOf && node2.await) {
			this.word("await");
			this.space();
		}
		this.noIndentInnerCommentsHere();
		this.tokenChar(40);
		{
			const exit = isForOf ? null : this.enterForStatementInit();
			this.tokenContext |= isForOf ? _index$2.TokenContext.forOfHead : _index$2.TokenContext.forInHead;
			this.print(node2.left);
			exit == null || exit();
		}
		this.space();
		this.word(isForOf ? "of" : "in");
		this.space();
		this.print(node2.right);
		this.tokenChar(41);
		this.printBlock(node2);
	}

	statements.ForInStatement = ForXStatement;
	statements.ForOfStatement = ForXStatement;

	function DoWhileStatement(node2) {
		this.word("do");
		this.space();
		this.print(node2.body);
		this.space();
		this.word("while");
		this.space();
		this.tokenChar(40);
		this.print(node2.test);
		this.tokenChar(41);
		this.semicolon();
	}

	function printStatementAfterKeyword(printer2, node2) {
		if (node2) {
			printer2.space();
			printer2.printTerminatorless(node2);
		}
		printer2.semicolon();
	}

	function BreakStatement(node2) {
		this.word("break");
		printStatementAfterKeyword(this, node2.label);
	}

	function ContinueStatement(node2) {
		this.word("continue");
		printStatementAfterKeyword(this, node2.label);
	}

	function ReturnStatement(node2) {
		this.word("return");
		printStatementAfterKeyword(this, node2.argument);
	}

	function ThrowStatement(node2) {
		this.word("throw");
		printStatementAfterKeyword(this, node2.argument);
	}

	function LabeledStatement(node2) {
		this.print(node2.label);
		this.tokenChar(58);
		this.space();
		this.print(node2.body);
	}

	function TryStatement(node2) {
		this.word("try");
		this.space();
		this.print(node2.block);
		this.space();
		if (node2.handlers) {
			this.print(node2.handlers[0]);
		} else {
			this.print(node2.handler);
		}
		if (node2.finalizer) {
			this.space();
			this.word("finally");
			this.space();
			this.print(node2.finalizer);
		}
	}

	function CatchClause(node2) {
		this.word("catch");
		this.space();
		if (node2.param) {
			this.tokenChar(40);
			this.print(node2.param);
			this.print(node2.param.typeAnnotation);
			this.tokenChar(41);
			this.space();
		}
		this.print(node2.body);
	}

	function SwitchStatement(node2) {
		this.word("switch");
		this.space();
		this.tokenChar(40);
		this.print(node2.discriminant);
		this.tokenChar(41);
		this.space();
		this.tokenChar(123);
		this.printSequence(node2.cases, true, void 0, function addNewlines(leading, cas) {
			if (!leading && node2.cases[node2.cases.length - 1] === cas)
				return -1;
		});
		this.rightBrace(node2);
	}

	function SwitchCase(node2) {
		if (node2.test) {
			this.word("case");
			this.space();
			this.print(node2.test);
			this.tokenChar(58);
		} else {
			this.word("default");
			this.tokenChar(58);
		}
		if (node2.consequent.length) {
			this.newline();
			this.printSequence(node2.consequent, true);
		}
	}

	function DebuggerStatement() {
		this.word("debugger");
		this.semicolon();
	}

	function VariableDeclaration(node2, parent) {
		if (node2.declare) {
			this.word("declare");
			this.space();
		}
		const {
			kind
		} = node2;
		if (kind === "await using") {
			this.word("await");
			this.space();
			this.word("using", true);
		} else {
			this.word(kind, kind === "using");
		}
		this.space();
		let hasInits = false;
		if (!isFor(parent)) {
			for (const declar of node2.declarations) {
				if (declar.init) {
					hasInits = true;
				}
			}
		}
		this.printList(node2.declarations, void 0, void 0, node2.declarations.length > 1, hasInits ? function (occurrenceCount) {
			this.token(",", false, occurrenceCount);
			this.newline();
		} : void 0);
		if (isFor(parent)) {
			if (isForStatement(parent)) {
				if (parent.init === node2)
					return;
			} else {
				if (parent.left === node2)
					return;
			}
		}
		this.semicolon();
	}

	function VariableDeclarator(node2) {
		this.print(node2.id);
		if (node2.definite)
			this.tokenChar(33);
		this.print(node2.id.typeAnnotation);
		if (node2.init) {
			this.space();
			this.tokenChar(61);
			this.space();
			this.print(node2.init);
		}
	}

	var classes = {};
	Object.defineProperty(classes, "__esModule", {
		value: true
	});
	classes.ClassAccessorProperty = ClassAccessorProperty;
	classes.ClassBody = ClassBody;
	classes.ClassExpression = classes.ClassDeclaration = ClassDeclaration;
	classes.ClassMethod = ClassMethod;
	classes.ClassPrivateMethod = ClassPrivateMethod;
	classes.ClassPrivateProperty = ClassPrivateProperty;
	classes.ClassProperty = ClassProperty;
	classes.StaticBlock = StaticBlock;
	classes._classMethodHead = _classMethodHead;
	var _t$4 = lib$2;
	const {
		isExportDefaultDeclaration,
		isExportNamedDeclaration
	} = _t$4;

	function ClassDeclaration(node2, parent) {
		const inExport = isExportDefaultDeclaration(parent) || isExportNamedDeclaration(parent);
		if (!inExport || !this._shouldPrintDecoratorsBeforeExport(parent)) {
			this.printJoin(node2.decorators);
		}
		if (node2.declare) {
			this.word("declare");
			this.space();
		}
		if (node2.abstract) {
			this.word("abstract");
			this.space();
		}
		this.word("class");
		if (node2.id) {
			this.space();
			this.print(node2.id);
		}
		this.print(node2.typeParameters);
		if (node2.superClass) {
			this.space();
			this.word("extends");
			this.space();
			this.print(node2.superClass);
			this.print(node2.superTypeParameters);
		}
		if (node2.implements) {
			this.space();
			this.word("implements");
			this.space();
			this.printList(node2.implements);
		}
		this.space();
		this.print(node2.body);
	}

	function ClassBody(node2) {
		this.tokenChar(123);
		if (node2.body.length === 0) {
			this.tokenChar(125);
		} else {
			this.newline();
			const separator = classBodyEmptySemicolonsPrinter(this, node2);
			separator == null || separator(-1);
			const exit = this.enterDelimited();
			this.printJoin(node2.body, true, true, separator, true);
			exit();
			if (!this.endsWith(10))
				this.newline();
			this.rightBrace(node2);
		}
	}

	function classBodyEmptySemicolonsPrinter(printer2, node2) {
		if (!printer2.tokenMap || node2.start == null || node2.end == null) {
			return null;
		}
		const indexes = printer2.tokenMap.getIndexes(node2);
		if (!indexes)
			return null;
		let k = 1;
		let occurrenceCount = 0;
		let nextLocIndex = 0;
		const advanceNextLocIndex = () => {
			while (nextLocIndex < node2.body.length && node2.body[nextLocIndex].start == null) {
				nextLocIndex++;
			}
		};
		advanceNextLocIndex();
		return (i) => {
			if (nextLocIndex <= i) {
				nextLocIndex = i + 1;
				advanceNextLocIndex();
			}
			const end = nextLocIndex === node2.body.length ? node2.end : node2.body[nextLocIndex].start;
			let tok;
			while (k < indexes.length && printer2.tokenMap.matchesOriginal(tok = printer2._tokens[indexes[k]], ";") && tok.start < end) {
				printer2.token(";", void 0, occurrenceCount++);
				k++;
			}
		};
	}

	function ClassProperty(node2) {
		this.printJoin(node2.decorators);
		if (!node2.static && !this.format.preserveFormat) {
			var _node$key$loc;
			const endLine = (_node$key$loc = node2.key.loc) == null || (_node$key$loc = _node$key$loc.end) == null ? void 0 : _node$key$loc.line;
			if (endLine)
				this.catchUp(endLine);
		}
		this.tsPrintClassMemberModifiers(node2);
		if (node2.computed) {
			this.tokenChar(91);
			this.print(node2.key);
			this.tokenChar(93);
		} else {
			this._variance(node2);
			this.print(node2.key);
		}
		if (node2.optional) {
			this.tokenChar(63);
		}
		if (node2.definite) {
			this.tokenChar(33);
		}
		this.print(node2.typeAnnotation);
		if (node2.value) {
			this.space();
			this.tokenChar(61);
			this.space();
			this.print(node2.value);
		}
		this.semicolon();
	}

	function ClassAccessorProperty(node2) {
		var _node$key$loc2;
		this.printJoin(node2.decorators);
		const endLine = (_node$key$loc2 = node2.key.loc) == null || (_node$key$loc2 = _node$key$loc2.end) == null ? void 0 : _node$key$loc2.line;
		if (endLine)
			this.catchUp(endLine);
		this.tsPrintClassMemberModifiers(node2);
		this.word("accessor", true);
		this.space();
		if (node2.computed) {
			this.tokenChar(91);
			this.print(node2.key);
			this.tokenChar(93);
		} else {
			this._variance(node2);
			this.print(node2.key);
		}
		if (node2.optional) {
			this.tokenChar(63);
		}
		if (node2.definite) {
			this.tokenChar(33);
		}
		this.print(node2.typeAnnotation);
		if (node2.value) {
			this.space();
			this.tokenChar(61);
			this.space();
			this.print(node2.value);
		}
		this.semicolon();
	}

	function ClassPrivateProperty(node2) {
		this.printJoin(node2.decorators);
		this.tsPrintClassMemberModifiers(node2);
		this.print(node2.key);
		if (node2.optional) {
			this.tokenChar(63);
		}
		if (node2.definite) {
			this.tokenChar(33);
		}
		this.print(node2.typeAnnotation);
		if (node2.value) {
			this.space();
			this.tokenChar(61);
			this.space();
			this.print(node2.value);
		}
		this.semicolon();
	}

	function ClassMethod(node2) {
		this._classMethodHead(node2);
		this.space();
		this.print(node2.body);
	}

	function ClassPrivateMethod(node2) {
		this._classMethodHead(node2);
		this.space();
		this.print(node2.body);
	}

	function _classMethodHead(node2) {
		this.printJoin(node2.decorators);
		if (!this.format.preserveFormat) {
			var _node$key$loc3;
			const endLine = (_node$key$loc3 = node2.key.loc) == null || (_node$key$loc3 = _node$key$loc3.end) == null ? void 0 : _node$key$loc3.line;
			if (endLine)
				this.catchUp(endLine);
		}
		this.tsPrintClassMemberModifiers(node2);
		this._methodHead(node2);
	}

	function StaticBlock(node2) {
		this.word("static");
		this.space();
		this.tokenChar(123);
		if (node2.body.length === 0) {
			this.tokenChar(125);
		} else {
			this.newline();
			this.printSequence(node2.body, true);
			this.rightBrace(node2);
		}
	}

	var methods = {};
	Object.defineProperty(methods, "__esModule", {
		value: true
	});
	methods.ArrowFunctionExpression = ArrowFunctionExpression;
	methods.FunctionDeclaration = methods.FunctionExpression = FunctionExpression;
	methods._functionHead = _functionHead;
	methods._methodHead = _methodHead;
	methods._param = _param;
	methods._parameters = _parameters;
	methods._params = _params;
	methods._predicate = _predicate;
	methods._shouldPrintArrowParamsParens = _shouldPrintArrowParamsParens;
	var _t$3 = lib$2;
	var _index$1 = node;
	const {
		isIdentifier: isIdentifier$1
	} = _t$3;

	function _params(node2, idNode, parentNode) {
		this.print(node2.typeParameters);
		const nameInfo = _getFuncIdName.call(this, idNode, parentNode);
		if (nameInfo) {
			this.sourceIdentifierName(nameInfo.name, nameInfo.pos);
		}
		this.tokenChar(40);
		this._parameters(node2.params, ")");
		const noLineTerminator = node2.type === "ArrowFunctionExpression";
		this.print(node2.returnType, noLineTerminator);
		this._noLineTerminator = noLineTerminator;
	}

	function _parameters(parameters, endToken) {
		const exit = this.enterDelimited();
		const trailingComma = this.shouldPrintTrailingComma(endToken);
		const paramLength = parameters.length;
		for (let i = 0; i < paramLength; i++) {
			this._param(parameters[i]);
			if (trailingComma || i < paramLength - 1) {
				this.token(",", null, i);
				this.space();
			}
		}
		this.token(endToken);
		exit();
	}

	function _param(parameter) {
		this.printJoin(parameter.decorators);
		this.print(parameter);
		if (parameter.optional) {
			this.tokenChar(63);
		}
		this.print(parameter.typeAnnotation);
	}

	function _methodHead(node2) {
		const kind = node2.kind;
		const key = node2.key;
		if (kind === "get" || kind === "set") {
			this.word(kind);
			this.space();
		}
		if (node2.async) {
			this.word("async", true);
			this.space();
		}
		if (kind === "method" || kind === "init") {
			if (node2.generator) {
				this.tokenChar(42);
			}
		}
		if (node2.computed) {
			this.tokenChar(91);
			this.print(key);
			this.tokenChar(93);
		} else {
			this.print(key);
		}
		if (node2.optional) {
			this.tokenChar(63);
		}
		this._params(node2, node2.computed && node2.key.type !== "StringLiteral" ? void 0 : node2.key, void 0);
	}

	function _predicate(node2, noLineTerminatorAfter) {
		if (node2.predicate) {
			if (!node2.returnType) {
				this.tokenChar(58);
			}
			this.space();
			this.print(node2.predicate, noLineTerminatorAfter);
		}
	}

	function _functionHead(node2, parent) {
		if (node2.async) {
			this.word("async");
			if (!this.format.preserveFormat) {
				this._endsWithInnerRaw = false;
			}
			this.space();
		}
		this.word("function");
		if (node2.generator) {
			if (!this.format.preserveFormat) {
				this._endsWithInnerRaw = false;
			}
			this.tokenChar(42);
		}
		this.space();
		if (node2.id) {
			this.print(node2.id);
		}
		this._params(node2, node2.id, parent);
		if (node2.type !== "TSDeclareFunction") {
			this._predicate(node2);
		}
	}

	function FunctionExpression(node2, parent) {
		this._functionHead(node2, parent);
		this.space();
		this.print(node2.body);
	}

	function ArrowFunctionExpression(node2, parent) {
		if (node2.async) {
			this.word("async", true);
			this.space();
		}
		if (this._shouldPrintArrowParamsParens(node2)) {
			this._params(node2, void 0, parent);
		} else {
			this.print(node2.params[0], true);
		}
		this._predicate(node2, true);
		this.space();
		this.printInnerComments();
		this.token("=>");
		this.space();
		this.tokenContext |= _index$1.TokenContext.arrowBody;
		this.print(node2.body);
	}

	function _shouldPrintArrowParamsParens(node2) {
		var _firstParam$leadingCo, _firstParam$trailingC;
		if (node2.params.length !== 1)
			return true;
		if (node2.typeParameters || node2.returnType || node2.predicate) {
			return true;
		}
		const firstParam = node2.params[0];
		if (!isIdentifier$1(firstParam) || firstParam.typeAnnotation || firstParam.optional || (_firstParam$leadingCo = firstParam.leadingComments) != null && _firstParam$leadingCo.length || (_firstParam$trailingC = firstParam.trailingComments) != null && _firstParam$trailingC.length) {
			return true;
		}
		if (this.tokenMap) {
			if (node2.loc == null)
				return true;
			if (this.tokenMap.findMatching(node2, "(") !== null)
				return true;
			const arrowToken = this.tokenMap.findMatching(node2, "=>");
			if ((arrowToken == null ? void 0 : arrowToken.loc) == null)
				return true;
			return arrowToken.loc.start.line !== node2.loc.start.line;
		}
		if (this.format.retainLines)
			return true;
		return false;
	}

	function _getFuncIdName(idNode, parent) {
		let id = idNode;
		if (!id && parent) {
			const parentType = parent.type;
			if (parentType === "VariableDeclarator") {
				id = parent.id;
			} else if (parentType === "AssignmentExpression" || parentType === "AssignmentPattern") {
				id = parent.left;
			} else if (parentType === "ObjectProperty" || parentType === "ClassProperty") {
				if (!parent.computed || parent.key.type === "StringLiteral") {
					id = parent.key;
				}
			} else if (parentType === "ClassPrivateProperty" || parentType === "ClassAccessorProperty") {
				id = parent.key;
			}
		}
		if (!id)
			return;
		let nameInfo;
		if (id.type === "Identifier") {
			var _id$loc, _id$loc2;
			nameInfo = {
				pos: (_id$loc = id.loc) == null ? void 0 : _id$loc.start,
				name: ((_id$loc2 = id.loc) == null ? void 0 : _id$loc2.identifierName) || id.name
			};
		} else if (id.type === "PrivateName") {
			var _id$loc3;
			nameInfo = {
				pos: (_id$loc3 = id.loc) == null ? void 0 : _id$loc3.start,
				name: "#" + id.id.name
			};
		} else if (id.type === "StringLiteral") {
			var _id$loc4;
			nameInfo = {
				pos: (_id$loc4 = id.loc) == null ? void 0 : _id$loc4.start,
				name: id.value
			};
		}
		return nameInfo;
	}

	var modules = {};
	Object.defineProperty(modules, "__esModule", {
		value: true
	});
	modules.ExportAllDeclaration = ExportAllDeclaration;
	modules.ExportDefaultDeclaration = ExportDefaultDeclaration;
	modules.ExportDefaultSpecifier = ExportDefaultSpecifier;
	modules.ExportNamedDeclaration = ExportNamedDeclaration;
	modules.ExportNamespaceSpecifier = ExportNamespaceSpecifier;
	modules.ExportSpecifier = ExportSpecifier;
	modules.ImportAttribute = ImportAttribute;
	modules.ImportDeclaration = ImportDeclaration;
	modules.ImportDefaultSpecifier = ImportDefaultSpecifier;
	modules.ImportExpression = ImportExpression;
	modules.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
	modules.ImportSpecifier = ImportSpecifier;
	modules._printAttributes = _printAttributes;
	var _t$2 = lib$2;
	var _index = node;
	const {
		isClassDeclaration,
		isExportDefaultSpecifier,
		isExportNamespaceSpecifier,
		isImportDefaultSpecifier,
		isImportNamespaceSpecifier,
		isStatement: isStatement$1
	} = _t$2;

	function ImportSpecifier(node2) {
		if (node2.importKind === "type" || node2.importKind === "typeof") {
			this.word(node2.importKind);
			this.space();
		}
		this.print(node2.imported);
		if (node2.local && node2.local.name !== node2.imported.name) {
			this.space();
			this.word("as");
			this.space();
			this.print(node2.local);
		}
	}

	function ImportDefaultSpecifier(node2) {
		this.print(node2.local);
	}

	function ExportDefaultSpecifier(node2) {
		this.print(node2.exported);
	}

	function ExportSpecifier(node2) {
		if (node2.exportKind === "type") {
			this.word("type");
			this.space();
		}
		this.print(node2.local);
		if (node2.exported && node2.local.name !== node2.exported.name) {
			this.space();
			this.word("as");
			this.space();
			this.print(node2.exported);
		}
	}

	function ExportNamespaceSpecifier(node2) {
		this.tokenChar(42);
		this.space();
		this.word("as");
		this.space();
		this.print(node2.exported);
	}

	let warningShown = false;

	function _printAttributes(node2, hasPreviousBrace) {
		const {
			importAttributesKeyword
		} = this.format;
		const {
			attributes,
			assertions
		} = node2;
		if (attributes && !importAttributesKeyword && !warningShown) {
			warningShown = true;
			console.warn(`You are using import attributes, without specifying the desired output syntax.
Please specify the "importAttributesKeyword" generator option, whose value can be one of:
 - "with"        : \`import { a } from "b" with { type: "json" };\`
 - "assert"      : \`import { a } from "b" assert { type: "json" };\`
 - "with-legacy" : \`import { a } from "b" with type: "json";\`
`);
		}
		const useAssertKeyword = importAttributesKeyword === "assert" || !importAttributesKeyword && assertions;
		this.word(useAssertKeyword ? "assert" : "with");
		this.space();
		if (!useAssertKeyword && importAttributesKeyword !== "with") {
			this.printList(attributes || assertions);
			return;
		}
		const occurrenceCount = hasPreviousBrace ? 1 : 0;
		this.token("{", null, occurrenceCount);
		this.space();
		this.printList(attributes || assertions, this.shouldPrintTrailingComma("}"));
		this.space();
		this.token("}", null, occurrenceCount);
	}

	function ExportAllDeclaration(node2) {
		var _node$attributes, _node$assertions;
		this.word("export");
		this.space();
		if (node2.exportKind === "type") {
			this.word("type");
			this.space();
		}
		this.tokenChar(42);
		this.space();
		this.word("from");
		this.space();
		if ((_node$attributes = node2.attributes) != null && _node$attributes.length || (_node$assertions = node2.assertions) != null && _node$assertions.length) {
			this.print(node2.source, true);
			this.space();
			this._printAttributes(node2, false);
		} else {
			this.print(node2.source);
		}
		this.semicolon();
	}

	function maybePrintDecoratorsBeforeExport(printer2, node2) {
		if (isClassDeclaration(node2.declaration) && printer2._shouldPrintDecoratorsBeforeExport(node2)) {
			printer2.printJoin(node2.declaration.decorators);
		}
	}

	function ExportNamedDeclaration(node2) {
		maybePrintDecoratorsBeforeExport(this, node2);
		this.word("export");
		this.space();
		if (node2.declaration) {
			const declar = node2.declaration;
			this.print(declar);
			if (!isStatement$1(declar))
				this.semicolon();
		} else {
			if (node2.exportKind === "type") {
				this.word("type");
				this.space();
			}
			const specifiers = node2.specifiers.slice(0);
			let hasSpecial = false;
			for (; ;) {
				const first = specifiers[0];
				if (isExportDefaultSpecifier(first) || isExportNamespaceSpecifier(first)) {
					hasSpecial = true;
					this.print(specifiers.shift());
					if (specifiers.length) {
						this.tokenChar(44);
						this.space();
					}
				} else {
					break;
				}
			}
			let hasBrace = false;
			if (specifiers.length || !specifiers.length && !hasSpecial) {
				hasBrace = true;
				this.tokenChar(123);
				if (specifiers.length) {
					this.space();
					this.printList(specifiers, this.shouldPrintTrailingComma("}"));
					this.space();
				}
				this.tokenChar(125);
			}
			if (node2.source) {
				var _node$attributes2, _node$assertions2;
				this.space();
				this.word("from");
				this.space();
				if ((_node$attributes2 = node2.attributes) != null && _node$attributes2.length || (_node$assertions2 = node2.assertions) != null && _node$assertions2.length) {
					this.print(node2.source, true);
					this.space();
					this._printAttributes(node2, hasBrace);
				} else {
					this.print(node2.source);
				}
			}
			this.semicolon();
		}
	}

	function ExportDefaultDeclaration(node2) {
		maybePrintDecoratorsBeforeExport(this, node2);
		this.word("export");
		this.noIndentInnerCommentsHere();
		this.space();
		this.word("default");
		this.space();
		this.tokenContext |= _index.TokenContext.exportDefault;
		const declar = node2.declaration;
		this.print(declar);
		if (!isStatement$1(declar))
			this.semicolon();
	}

	function ImportDeclaration(node2) {
		var _node$attributes3, _node$assertions3;
		this.word("import");
		this.space();
		const isTypeKind = node2.importKind === "type" || node2.importKind === "typeof";
		if (isTypeKind) {
			this.noIndentInnerCommentsHere();
			this.word(node2.importKind);
			this.space();
		} else if (node2.module) {
			this.noIndentInnerCommentsHere();
			this.word("module");
			this.space();
		} else if (node2.phase) {
			this.noIndentInnerCommentsHere();
			this.word(node2.phase);
			this.space();
		}
		const specifiers = node2.specifiers.slice(0);
		const hasSpecifiers = !!specifiers.length;
		while (hasSpecifiers) {
			const first = specifiers[0];
			if (isImportDefaultSpecifier(first) || isImportNamespaceSpecifier(first)) {
				this.print(specifiers.shift());
				if (specifiers.length) {
					this.tokenChar(44);
					this.space();
				}
			} else {
				break;
			}
		}
		let hasBrace = false;
		if (specifiers.length) {
			hasBrace = true;
			this.tokenChar(123);
			this.space();
			this.printList(specifiers, this.shouldPrintTrailingComma("}"));
			this.space();
			this.tokenChar(125);
		} else if (isTypeKind && !hasSpecifiers) {
			hasBrace = true;
			this.tokenChar(123);
			this.tokenChar(125);
		}
		if (hasSpecifiers || isTypeKind) {
			this.space();
			this.word("from");
			this.space();
		}
		if ((_node$attributes3 = node2.attributes) != null && _node$attributes3.length || (_node$assertions3 = node2.assertions) != null && _node$assertions3.length) {
			this.print(node2.source, true);
			this.space();
			this._printAttributes(node2, hasBrace);
		} else {
			this.print(node2.source);
		}
		this.semicolon();
	}

	function ImportAttribute(node2) {
		this.print(node2.key);
		this.tokenChar(58);
		this.space();
		this.print(node2.value);
	}

	function ImportNamespaceSpecifier(node2) {
		this.tokenChar(42);
		this.space();
		this.word("as");
		this.space();
		this.print(node2.local);
	}

	function ImportExpression(node2) {
		this.word("import");
		if (node2.phase) {
			this.tokenChar(46);
			this.word(node2.phase);
		}
		this.tokenChar(40);
		this.print(node2.source);
		if (node2.options != null) {
			this.tokenChar(44);
			this.space();
			this.print(node2.options);
		}
		this.tokenChar(41);
	}

	var types = {};
	const object = {};
	const hasOwnProperty$1 = object.hasOwnProperty;
	const forOwn = (object2, callback) => {
		for (const key in object2) {
			if (hasOwnProperty$1.call(object2, key)) {
				callback(key, object2[key]);
			}
		}
	};
	const extend = (destination, source) => {
		if (!source) {
			return destination;
		}
		forOwn(source, (key, value) => {
			destination[key] = value;
		});
		return destination;
	};
	const forEach = (array, callback) => {
		const length = array.length;
		let index = -1;
		while (++index < length) {
			callback(array[index]);
		}
	};
	const fourHexEscape = (hex) => {
		return "\\u" + ("0000" + hex).slice(-4);
	};
	const hexadecimal = (code, lowercase2) => {
		let hexadecimal2 = code.toString(16);
		if (lowercase2)
			return hexadecimal2;
		return hexadecimal2.toUpperCase();
	};
	const toString = object.toString;
	const isArray = Array.isArray;
	const isBuffer = (value) => {
		return typeof Buffer === "function" && Buffer.isBuffer(value);
	};
	const isObject = (value) => {
		return toString.call(value) == "[object Object]";
	};
	const isString = (value) => {
		return typeof value == "string" || toString.call(value) == "[object String]";
	};
	const isNumber = (value) => {
		return typeof value == "number" || toString.call(value) == "[object Number]";
	};
	const isBigInt = (value) => {
		return typeof value == "bigint";
	};
	const isFunction$1 = (value) => {
		return typeof value == "function";
	};
	const isMap = (value) => {
		return toString.call(value) == "[object Map]";
	};
	const isSet = (value) => {
		return toString.call(value) == "[object Set]";
	};
	const singleEscapes = {
		"\\": "\\\\",
		"\b": "\\b",
		"\f": "\\f",
		"\n": "\\n",
		"\r": "\\r",
		"	": "\\t"
	};
	const regexSingleEscape = /[\\\b\f\n\r\t]/;
	const regexDigit = /[0-9]/;
	const regexWhitespace = /[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;
	const escapeEverythingRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g;
	const escapeNonAsciiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g;
	const jsesc = (argument, options) => {
		const increaseIndentation = () => {
			oldIndent = indent;
			++options.indentLevel;
			indent = options.indent.repeat(options.indentLevel);
		};
		const defaults = {
			"escapeEverything": false,
			"minimal": false,
			"isScriptContext": false,
			"quotes": "single",
			"wrap": false,
			"es6": false,
			"json": false,
			"compact": true,
			"lowercaseHex": false,
			"numbers": "decimal",
			"indent": "	",
			"indentLevel": 0,
			"__inline1__": false,
			"__inline2__": false
		};
		const json = options && options.json;
		if (json) {
			defaults.quotes = "double";
			defaults.wrap = true;
		}
		options = extend(defaults, options);
		if (options.quotes != "single" && options.quotes != "double" && options.quotes != "backtick") {
			options.quotes = "single";
		}
		const quote = options.quotes == "double" ? "\"" : options.quotes == "backtick" ? "`" : "'";
		const compact = options.compact;
		const lowercaseHex = options.lowercaseHex;
		let indent = options.indent.repeat(options.indentLevel);
		let oldIndent = "";
		const inline1 = options.__inline1__;
		const inline2 = options.__inline2__;
		const newLine = compact ? "" : "\n";
		let result;
		let isEmpty = true;
		const useBinNumbers = options.numbers == "binary";
		const useOctNumbers = options.numbers == "octal";
		const useDecNumbers = options.numbers == "decimal";
		const useHexNumbers = options.numbers == "hexadecimal";
		if (json && argument && isFunction$1(argument.toJSON)) {
			argument = argument.toJSON();
		}
		if (!isString(argument)) {
			if (isMap(argument)) {
				if (argument.size == 0) {
					return "new Map()";
				}
				if (!compact) {
					options.__inline1__ = true;
					options.__inline2__ = false;
				}
				return "new Map(" + jsesc(Array.from(argument), options) + ")";
			}
			if (isSet(argument)) {
				if (argument.size == 0) {
					return "new Set()";
				}
				return "new Set(" + jsesc(Array.from(argument), options) + ")";
			}
			if (isBuffer(argument)) {
				if (argument.length == 0) {
					return "Buffer.from([])";
				}
				return "Buffer.from(" + jsesc(Array.from(argument), options) + ")";
			}
			if (isArray(argument)) {
				result = [];
				options.wrap = true;
				if (inline1) {
					options.__inline1__ = false;
					options.__inline2__ = true;
				}
				if (!inline2) {
					increaseIndentation();
				}
				forEach(argument, (value) => {
					isEmpty = false;
					if (inline2) {
						options.__inline2__ = false;
					}
					result.push(
						(compact || inline2 ? "" : indent) + jsesc(value, options)
					);
				});
				if (isEmpty) {
					return "[]";
				}
				if (inline2) {
					return "[" + result.join(", ") + "]";
				}
				return "[" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "]";
			} else if (isNumber(argument) || isBigInt(argument)) {
				if (json) {
					return JSON.stringify(Number(argument));
				}
				let result2;
				if (useDecNumbers) {
					result2 = String(argument);
				} else if (useHexNumbers) {
					let hexadecimal2 = argument.toString(16);
					if (!lowercaseHex) {
						hexadecimal2 = hexadecimal2.toUpperCase();
					}
					result2 = "0x" + hexadecimal2;
				} else if (useBinNumbers) {
					result2 = "0b" + argument.toString(2);
				} else if (useOctNumbers) {
					result2 = "0o" + argument.toString(8);
				}
				if (isBigInt(argument)) {
					return result2 + "n";
				}
				return result2;
			} else if (isBigInt(argument)) {
				if (json) {
					return JSON.stringify(Number(argument));
				}
				return argument + "n";
			} else if (!isObject(argument)) {
				if (json) {
					return JSON.stringify(argument) || "null";
				}
				return String(argument);
			} else {
				result = [];
				options.wrap = true;
				increaseIndentation();
				forOwn(argument, (key, value) => {
					isEmpty = false;
					result.push(
						(compact ? "" : indent) + jsesc(key, options) + ":" + (compact ? "" : " ") + jsesc(value, options)
					);
				});
				if (isEmpty) {
					return "{}";
				}
				return "{" + newLine + result.join("," + newLine) + newLine + (compact ? "" : oldIndent) + "}";
			}
		}
		const regex = options.escapeEverything ? escapeEverythingRegex : escapeNonAsciiRegex;
		result = argument.replace(regex, (char, pair, lone, quoteChar, index, string) => {
			if (pair) {
				if (options.minimal)
					return pair;
				const first = pair.charCodeAt(0);
				const second = pair.charCodeAt(1);
				if (options.es6) {
					const codePoint = (first - 55296) * 1024 + second - 56320 + 65536;
					const hex2 = hexadecimal(codePoint, lowercaseHex);
					return "\\u{" + hex2 + "}";
				}
				return fourHexEscape(hexadecimal(first, lowercaseHex)) + fourHexEscape(hexadecimal(second, lowercaseHex));
			}
			if (lone) {
				return fourHexEscape(hexadecimal(lone.charCodeAt(0), lowercaseHex));
			}
			if (char == "\0" && !json && !regexDigit.test(string.charAt(index + 1))) {
				return "\\0";
			}
			if (quoteChar) {
				if (quoteChar == quote || options.escapeEverything) {
					return "\\" + quoteChar;
				}
				return quoteChar;
			}
			if (regexSingleEscape.test(char)) {
				return singleEscapes[char];
			}
			if (options.minimal && !regexWhitespace.test(char)) {
				return char;
			}
			const hex = hexadecimal(char.charCodeAt(0), lowercaseHex);
			if (json || hex.length > 2) {
				return fourHexEscape(hex);
			}
			return "\\x" + ("00" + hex).slice(-2);
		});
		if (quote == "`") {
			result = result.replace(/\$\{/g, "\\${");
		}
		if (options.isScriptContext) {
			result = result.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, json ? "\\u003C!--" : "\\x3C!--");
		}
		if (options.wrap) {
			result = quote + result + quote;
		}
		return result;
	};
	jsesc.version = "3.0.2";
	var jsesc_1 = jsesc;
	Object.defineProperty(types, "__esModule", {
		value: true
	});
	types.ArgumentPlaceholder = ArgumentPlaceholder;
	types.ArrayPattern = types.ArrayExpression = ArrayExpression;
	types.BigIntLiteral = BigIntLiteral;
	types.BooleanLiteral = BooleanLiteral;
	types.Identifier = Identifier;
	types.NullLiteral = NullLiteral;
	types.NumericLiteral = NumericLiteral;
	types.ObjectPattern = types.ObjectExpression = ObjectExpression;
	types.ObjectMethod = ObjectMethod;
	types.ObjectProperty = ObjectProperty;
	types.PipelineBareFunction = PipelineBareFunction;
	types.PipelinePrimaryTopicReference = PipelinePrimaryTopicReference;
	types.PipelineTopicExpression = PipelineTopicExpression;
	types.RecordExpression = RecordExpression;
	types.RegExpLiteral = RegExpLiteral;
	types.SpreadElement = types.RestElement = RestElement;
	types.StringLiteral = StringLiteral;
	types.TopicReference = TopicReference;
	types.TupleExpression = TupleExpression;
	types._getRawIdentifier = _getRawIdentifier;
	var _t$1 = lib$2;
	var _jsesc = jsesc_1;
	const {
		isAssignmentPattern,
		isIdentifier
	} = _t$1;
	let lastRawIdentNode = null;
	let lastRawIdentResult = "";

	function _getRawIdentifier(node2) {
		if (node2 === lastRawIdentNode)
			return lastRawIdentResult;
		lastRawIdentNode = node2;
		const {
			name
		} = node2;
		const token = this.tokenMap.find(node2, (tok) => tok.value === name);
		if (token) {
			lastRawIdentResult = this._originalCode.slice(token.start, token.end);
			return lastRawIdentResult;
		}
		return lastRawIdentResult = node2.name;
	}

	function Identifier(node2) {
		var _node$loc;
		this.sourceIdentifierName(((_node$loc = node2.loc) == null ? void 0 : _node$loc.identifierName) || node2.name);
		this.word(this.tokenMap ? this._getRawIdentifier(node2) : node2.name);
	}

	function ArgumentPlaceholder() {
		this.tokenChar(63);
	}

	function RestElement(node2) {
		this.token("...");
		this.print(node2.argument);
	}

	function ObjectExpression(node2) {
		const props = node2.properties;
		this.tokenChar(123);
		if (props.length) {
			const exit = this.enterDelimited();
			this.space();
			this.printList(props, this.shouldPrintTrailingComma("}"), true, true);
			this.space();
			exit();
		}
		this.sourceWithOffset("end", node2.loc, -1);
		this.tokenChar(125);
	}

	function ObjectMethod(node2) {
		this.printJoin(node2.decorators);
		this._methodHead(node2);
		this.space();
		this.print(node2.body);
	}

	function ObjectProperty(node2) {
		this.printJoin(node2.decorators);
		if (node2.computed) {
			this.tokenChar(91);
			this.print(node2.key);
			this.tokenChar(93);
		} else {
			if (isAssignmentPattern(node2.value) && isIdentifier(node2.key) && node2.key.name === node2.value.left.name) {
				this.print(node2.value);
				return;
			}
			this.print(node2.key);
			if (node2.shorthand && isIdentifier(node2.key) && isIdentifier(node2.value) && node2.key.name === node2.value.name) {
				return;
			}
		}
		this.tokenChar(58);
		this.space();
		this.print(node2.value);
	}

	function ArrayExpression(node2) {
		const elems = node2.elements;
		const len = elems.length;
		this.tokenChar(91);
		const exit = this.enterDelimited();
		for (let i = 0; i < elems.length; i++) {
			const elem = elems[i];
			if (elem) {
				if (i > 0)
					this.space();
				this.print(elem);
				if (i < len - 1 || this.shouldPrintTrailingComma("]")) {
					this.token(",", false, i);
				}
			} else {
				this.token(",", false, i);
			}
		}
		exit();
		this.tokenChar(93);
	}

	function RecordExpression(node2) {
		const props = node2.properties;
		let startToken;
		let endToken;
		{
			if (this.format.recordAndTupleSyntaxType === "bar") {
				startToken = "{|";
				endToken = "|}";
			} else if (this.format.recordAndTupleSyntaxType !== "hash" && this.format.recordAndTupleSyntaxType != null) {
				throw new Error(`The "recordAndTupleSyntaxType" generator option must be "bar" or "hash" (${JSON.stringify(this.format.recordAndTupleSyntaxType)} received).`);
			} else {
				startToken = "#{";
				endToken = "}";
			}
		}
		this.token(startToken);
		if (props.length) {
			this.space();
			this.printList(props, this.shouldPrintTrailingComma(endToken), true, true);
			this.space();
		}
		this.token(endToken);
	}

	function TupleExpression(node2) {
		const elems = node2.elements;
		const len = elems.length;
		let startToken;
		let endToken;
		{
			if (this.format.recordAndTupleSyntaxType === "bar") {
				startToken = "[|";
				endToken = "|]";
			} else if (this.format.recordAndTupleSyntaxType === "hash") {
				startToken = "#[";
				endToken = "]";
			} else {
				throw new Error(`${this.format.recordAndTupleSyntaxType} is not a valid recordAndTuple syntax type`);
			}
		}
		this.token(startToken);
		for (let i = 0; i < elems.length; i++) {
			const elem = elems[i];
			if (elem) {
				if (i > 0)
					this.space();
				this.print(elem);
				if (i < len - 1 || this.shouldPrintTrailingComma(endToken)) {
					this.token(",", false, i);
				}
			}
		}
		this.token(endToken);
	}

	function RegExpLiteral(node2) {
		this.word(`/${node2.pattern}/${node2.flags}`);
	}

	function BooleanLiteral(node2) {
		this.word(node2.value ? "true" : "false");
	}

	function NullLiteral() {
		this.word("null");
	}

	function NumericLiteral(node2) {
		const raw = this.getPossibleRaw(node2);
		const opts = this.format.jsescOption;
		const value = node2.value;
		const str = value + "";
		if (opts.numbers) {
			this.number(_jsesc(value, opts), value);
		} else if (raw == null) {
			this.number(str, value);
		} else if (this.format.minified) {
			this.number(raw.length < str.length ? raw : str, value);
		} else {
			this.number(raw, value);
		}
	}

	function StringLiteral(node2) {
		const raw = this.getPossibleRaw(node2);
		if (!this.format.minified && raw !== void 0) {
			this.token(raw);
			return;
		}
		const val = _jsesc(node2.value, this.format.jsescOption);
		this.token(val);
	}

	function BigIntLiteral(node2) {
		const raw = this.getPossibleRaw(node2);
		if (!this.format.minified && raw !== void 0) {
			this.word(raw);
			return;
		}
		this.word(node2.value + "n");
	}

	const validTopicTokenSet = /* @__PURE__ */ new Set(["^^", "@@", "^", "%", "#"]);

	function TopicReference() {
		const {
			topicToken
		} = this.format;
		if (validTopicTokenSet.has(topicToken)) {
			this.token(topicToken);
		} else {
			const givenTopicTokenJSON = JSON.stringify(topicToken);
			const validTopics = Array.from(validTopicTokenSet, (v) => JSON.stringify(v));
			throw new Error(`The "topicToken" generator option must be one of ${validTopics.join(", ")} (${givenTopicTokenJSON} received instead).`);
		}
	}

	function PipelineTopicExpression(node2) {
		this.print(node2.expression);
	}

	function PipelineBareFunction(node2) {
		this.print(node2.callee);
	}

	function PipelinePrimaryTopicReference() {
		this.tokenChar(35);
	}

	var flow = {};
	(function (exports3) {
		Object.defineProperty(exports3, "__esModule", {
			value: true
		});
		exports3.AnyTypeAnnotation = AnyTypeAnnotation;
		exports3.ArrayTypeAnnotation = ArrayTypeAnnotation;
		exports3.BooleanLiteralTypeAnnotation = BooleanLiteralTypeAnnotation;
		exports3.BooleanTypeAnnotation = BooleanTypeAnnotation;
		exports3.DeclareClass = DeclareClass;
		exports3.DeclareExportAllDeclaration = DeclareExportAllDeclaration;
		exports3.DeclareExportDeclaration = DeclareExportDeclaration;
		exports3.DeclareFunction = DeclareFunction;
		exports3.DeclareInterface = DeclareInterface;
		exports3.DeclareModule = DeclareModule;
		exports3.DeclareModuleExports = DeclareModuleExports;
		exports3.DeclareOpaqueType = DeclareOpaqueType;
		exports3.DeclareTypeAlias = DeclareTypeAlias;
		exports3.DeclareVariable = DeclareVariable;
		exports3.DeclaredPredicate = DeclaredPredicate;
		exports3.EmptyTypeAnnotation = EmptyTypeAnnotation;
		exports3.EnumBooleanBody = EnumBooleanBody;
		exports3.EnumBooleanMember = EnumBooleanMember;
		exports3.EnumDeclaration = EnumDeclaration;
		exports3.EnumDefaultedMember = EnumDefaultedMember;
		exports3.EnumNumberBody = EnumNumberBody;
		exports3.EnumNumberMember = EnumNumberMember;
		exports3.EnumStringBody = EnumStringBody;
		exports3.EnumStringMember = EnumStringMember;
		exports3.EnumSymbolBody = EnumSymbolBody;
		exports3.ExistsTypeAnnotation = ExistsTypeAnnotation;
		exports3.FunctionTypeAnnotation = FunctionTypeAnnotation2;
		exports3.FunctionTypeParam = FunctionTypeParam;
		exports3.IndexedAccessType = IndexedAccessType;
		exports3.InferredPredicate = InferredPredicate;
		exports3.InterfaceDeclaration = InterfaceDeclaration;
		exports3.GenericTypeAnnotation = exports3.ClassImplements = exports3.InterfaceExtends = InterfaceExtends;
		exports3.InterfaceTypeAnnotation = InterfaceTypeAnnotation;
		exports3.IntersectionTypeAnnotation = IntersectionTypeAnnotation;
		exports3.MixedTypeAnnotation = MixedTypeAnnotation;
		exports3.NullLiteralTypeAnnotation = NullLiteralTypeAnnotation;
		exports3.NullableTypeAnnotation = NullableTypeAnnotation2;
		Object.defineProperty(exports3, "NumberLiteralTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _types2.NumericLiteral;
			}
		});
		exports3.NumberTypeAnnotation = NumberTypeAnnotation;
		exports3.ObjectTypeAnnotation = ObjectTypeAnnotation;
		exports3.ObjectTypeCallProperty = ObjectTypeCallProperty;
		exports3.ObjectTypeIndexer = ObjectTypeIndexer;
		exports3.ObjectTypeInternalSlot = ObjectTypeInternalSlot;
		exports3.ObjectTypeProperty = ObjectTypeProperty;
		exports3.ObjectTypeSpreadProperty = ObjectTypeSpreadProperty;
		exports3.OpaqueType = OpaqueType;
		exports3.OptionalIndexedAccessType = OptionalIndexedAccessType2;
		exports3.QualifiedTypeIdentifier = QualifiedTypeIdentifier;
		Object.defineProperty(exports3, "StringLiteralTypeAnnotation", {
			enumerable: true,
			get: function () {
				return _types2.StringLiteral;
			}
		});
		exports3.StringTypeAnnotation = StringTypeAnnotation;
		exports3.SymbolTypeAnnotation = SymbolTypeAnnotation;
		exports3.ThisTypeAnnotation = ThisTypeAnnotation;
		exports3.TupleTypeAnnotation = TupleTypeAnnotation;
		exports3.TypeAlias = TypeAlias;
		exports3.TypeAnnotation = TypeAnnotation;
		exports3.TypeCastExpression = TypeCastExpression;
		exports3.TypeParameter = TypeParameter;
		exports3.TypeParameterDeclaration = exports3.TypeParameterInstantiation = TypeParameterInstantiation;
		exports3.TypeofTypeAnnotation = TypeofTypeAnnotation;
		exports3.UnionTypeAnnotation = UnionTypeAnnotation2;
		exports3.Variance = Variance;
		exports3.VoidTypeAnnotation = VoidTypeAnnotation;
		exports3._interfaceish = _interfaceish;
		exports3._variance = _variance;
		var _t2 = lib$2;
		var _modules = modules;
		var _index3 = node;
		var _types2 = types;
		const {
			isDeclareExportDeclaration: isDeclareExportDeclaration2,
			isStatement: isStatement2
		} = _t2;

		function AnyTypeAnnotation() {
			this.word("any");
		}

		function ArrayTypeAnnotation(node2) {
			this.print(node2.elementType, true);
			this.tokenChar(91);
			this.tokenChar(93);
		}

		function BooleanTypeAnnotation() {
			this.word("boolean");
		}

		function BooleanLiteralTypeAnnotation(node2) {
			this.word(node2.value ? "true" : "false");
		}

		function NullLiteralTypeAnnotation() {
			this.word("null");
		}

		function DeclareClass(node2, parent) {
			if (!isDeclareExportDeclaration2(parent)) {
				this.word("declare");
				this.space();
			}
			this.word("class");
			this.space();
			this._interfaceish(node2);
		}

		function DeclareFunction(node2, parent) {
			if (!isDeclareExportDeclaration2(parent)) {
				this.word("declare");
				this.space();
			}
			this.word("function");
			this.space();
			this.print(node2.id);
			this.print(node2.id.typeAnnotation.typeAnnotation);
			if (node2.predicate) {
				this.space();
				this.print(node2.predicate);
			}
			this.semicolon();
		}

		function InferredPredicate() {
			this.tokenChar(37);
			this.word("checks");
		}

		function DeclaredPredicate(node2) {
			this.tokenChar(37);
			this.word("checks");
			this.tokenChar(40);
			this.print(node2.value);
			this.tokenChar(41);
		}

		function DeclareInterface(node2) {
			this.word("declare");
			this.space();
			this.InterfaceDeclaration(node2);
		}

		function DeclareModule(node2) {
			this.word("declare");
			this.space();
			this.word("module");
			this.space();
			this.print(node2.id);
			this.space();
			this.print(node2.body);
		}

		function DeclareModuleExports(node2) {
			this.word("declare");
			this.space();
			this.word("module");
			this.tokenChar(46);
			this.word("exports");
			this.print(node2.typeAnnotation);
		}

		function DeclareTypeAlias(node2) {
			this.word("declare");
			this.space();
			this.TypeAlias(node2);
		}

		function DeclareOpaqueType(node2, parent) {
			if (!isDeclareExportDeclaration2(parent)) {
				this.word("declare");
				this.space();
			}
			this.OpaqueType(node2);
		}

		function DeclareVariable(node2, parent) {
			if (!isDeclareExportDeclaration2(parent)) {
				this.word("declare");
				this.space();
			}
			this.word("var");
			this.space();
			this.print(node2.id);
			this.print(node2.id.typeAnnotation);
			this.semicolon();
		}

		function DeclareExportDeclaration(node2) {
			this.word("declare");
			this.space();
			this.word("export");
			this.space();
			if (node2.default) {
				this.word("default");
				this.space();
			}
			FlowExportDeclaration.call(this, node2);
		}

		function DeclareExportAllDeclaration(node2) {
			this.word("declare");
			this.space();
			_modules.ExportAllDeclaration.call(this, node2);
		}

		function EnumDeclaration(node2) {
			const {
				id,
				body
			} = node2;
			this.word("enum");
			this.space();
			this.print(id);
			this.print(body);
		}

		function enumExplicitType(context, name, hasExplicitType) {
			if (hasExplicitType) {
				context.space();
				context.word("of");
				context.space();
				context.word(name);
			}
			context.space();
		}

		function enumBody(context, node2) {
			const {
				members
			} = node2;
			context.token("{");
			context.indent();
			context.newline();
			for (const member of members) {
				context.print(member);
				context.newline();
			}
			if (node2.hasUnknownMembers) {
				context.token("...");
				context.newline();
			}
			context.dedent();
			context.token("}");
		}

		function EnumBooleanBody(node2) {
			const {
				explicitType
			} = node2;
			enumExplicitType(this, "boolean", explicitType);
			enumBody(this, node2);
		}

		function EnumNumberBody(node2) {
			const {
				explicitType
			} = node2;
			enumExplicitType(this, "number", explicitType);
			enumBody(this, node2);
		}

		function EnumStringBody(node2) {
			const {
				explicitType
			} = node2;
			enumExplicitType(this, "string", explicitType);
			enumBody(this, node2);
		}

		function EnumSymbolBody(node2) {
			enumExplicitType(this, "symbol", true);
			enumBody(this, node2);
		}

		function EnumDefaultedMember(node2) {
			const {
				id
			} = node2;
			this.print(id);
			this.tokenChar(44);
		}

		function enumInitializedMember(context, node2) {
			context.print(node2.id);
			context.space();
			context.token("=");
			context.space();
			context.print(node2.init);
			context.token(",");
		}

		function EnumBooleanMember(node2) {
			enumInitializedMember(this, node2);
		}

		function EnumNumberMember(node2) {
			enumInitializedMember(this, node2);
		}

		function EnumStringMember(node2) {
			enumInitializedMember(this, node2);
		}

		function FlowExportDeclaration(node2) {
			if (node2.declaration) {
				const declar = node2.declaration;
				this.print(declar);
				if (!isStatement2(declar))
					this.semicolon();
			} else {
				this.tokenChar(123);
				if (node2.specifiers.length) {
					this.space();
					this.printList(node2.specifiers);
					this.space();
				}
				this.tokenChar(125);
				if (node2.source) {
					this.space();
					this.word("from");
					this.space();
					this.print(node2.source);
				}
				this.semicolon();
			}
		}

		function ExistsTypeAnnotation() {
			this.tokenChar(42);
		}

		function FunctionTypeAnnotation2(node2, parent) {
			this.print(node2.typeParameters);
			this.tokenChar(40);
			if (node2.this) {
				this.word("this");
				this.tokenChar(58);
				this.space();
				this.print(node2.this.typeAnnotation);
				if (node2.params.length || node2.rest) {
					this.tokenChar(44);
					this.space();
				}
			}
			this.printList(node2.params);
			if (node2.rest) {
				if (node2.params.length) {
					this.tokenChar(44);
					this.space();
				}
				this.token("...");
				this.print(node2.rest);
			}
			this.tokenChar(41);
			const type = parent == null ? void 0 : parent.type;
			if (type != null && (type === "ObjectTypeCallProperty" || type === "ObjectTypeInternalSlot" || type === "DeclareFunction" || type === "ObjectTypeProperty" && parent.method)) {
				this.tokenChar(58);
			} else {
				this.space();
				this.token("=>");
			}
			this.space();
			this.print(node2.returnType);
		}

		function FunctionTypeParam(node2) {
			this.print(node2.name);
			if (node2.optional)
				this.tokenChar(63);
			if (node2.name) {
				this.tokenChar(58);
				this.space();
			}
			this.print(node2.typeAnnotation);
		}

		function InterfaceExtends(node2) {
			this.print(node2.id);
			this.print(node2.typeParameters, true);
		}

		function _interfaceish(node2) {
			var _node$extends;
			this.print(node2.id);
			this.print(node2.typeParameters);
			if ((_node$extends = node2.extends) != null && _node$extends.length) {
				this.space();
				this.word("extends");
				this.space();
				this.printList(node2.extends);
			}
			if (node2.type === "DeclareClass") {
				var _node$mixins, _node$implements;
				if ((_node$mixins = node2.mixins) != null && _node$mixins.length) {
					this.space();
					this.word("mixins");
					this.space();
					this.printList(node2.mixins);
				}
				if ((_node$implements = node2.implements) != null && _node$implements.length) {
					this.space();
					this.word("implements");
					this.space();
					this.printList(node2.implements);
				}
			}
			this.space();
			this.print(node2.body);
		}

		function _variance(node2) {
			var _node$variance;
			const kind = (_node$variance = node2.variance) == null ? void 0 : _node$variance.kind;
			if (kind != null) {
				if (kind === "plus") {
					this.tokenChar(43);
				} else if (kind === "minus") {
					this.tokenChar(45);
				}
			}
		}

		function InterfaceDeclaration(node2) {
			this.word("interface");
			this.space();
			this._interfaceish(node2);
		}

		function andSeparator(occurrenceCount) {
			this.space();
			this.token("&", false, occurrenceCount);
			this.space();
		}

		function InterfaceTypeAnnotation(node2) {
			var _node$extends2;
			this.word("interface");
			if ((_node$extends2 = node2.extends) != null && _node$extends2.length) {
				this.space();
				this.word("extends");
				this.space();
				this.printList(node2.extends);
			}
			this.space();
			this.print(node2.body);
		}

		function IntersectionTypeAnnotation(node2) {
			this.printJoin(node2.types, void 0, void 0, andSeparator);
		}

		function MixedTypeAnnotation() {
			this.word("mixed");
		}

		function EmptyTypeAnnotation() {
			this.word("empty");
		}

		function NullableTypeAnnotation2(node2) {
			this.tokenChar(63);
			this.print(node2.typeAnnotation);
		}

		function NumberTypeAnnotation() {
			this.word("number");
		}

		function StringTypeAnnotation() {
			this.word("string");
		}

		function ThisTypeAnnotation() {
			this.word("this");
		}

		function TupleTypeAnnotation(node2) {
			this.tokenChar(91);
			this.printList(node2.types);
			this.tokenChar(93);
		}

		function TypeofTypeAnnotation(node2) {
			this.word("typeof");
			this.space();
			this.print(node2.argument);
		}

		function TypeAlias(node2) {
			this.word("type");
			this.space();
			this.print(node2.id);
			this.print(node2.typeParameters);
			this.space();
			this.tokenChar(61);
			this.space();
			this.print(node2.right);
			this.semicolon();
		}

		function TypeAnnotation(node2, parent) {
			this.tokenChar(58);
			this.space();
			if (parent.type === "ArrowFunctionExpression") {
				this.tokenContext |= _index3.TokenContext.arrowFlowReturnType;
			} else if (node2.optional) {
				this.tokenChar(63);
			}
			this.print(node2.typeAnnotation);
		}

		function TypeParameterInstantiation(node2) {
			this.tokenChar(60);
			this.printList(node2.params);
			this.tokenChar(62);
		}

		function TypeParameter(node2) {
			this._variance(node2);
			this.word(node2.name);
			if (node2.bound) {
				this.print(node2.bound);
			}
			if (node2.default) {
				this.space();
				this.tokenChar(61);
				this.space();
				this.print(node2.default);
			}
		}

		function OpaqueType(node2) {
			this.word("opaque");
			this.space();
			this.word("type");
			this.space();
			this.print(node2.id);
			this.print(node2.typeParameters);
			if (node2.supertype) {
				this.tokenChar(58);
				this.space();
				this.print(node2.supertype);
			}
			if (node2.impltype) {
				this.space();
				this.tokenChar(61);
				this.space();
				this.print(node2.impltype);
			}
			this.semicolon();
		}

		function ObjectTypeAnnotation(node2) {
			if (node2.exact) {
				this.token("{|");
			} else {
				this.tokenChar(123);
			}
			const props = [...node2.properties, ...node2.callProperties || [], ...node2.indexers || [], ...node2.internalSlots || []];
			if (props.length) {
				this.newline();
				this.space();
				this.printJoin(props, true, true, void 0, void 0, function addNewlines(leading) {
					if (leading && !props[0])
						return 1;
				}, () => {
					if (props.length !== 1 || node2.inexact) {
						this.tokenChar(44);
						this.space();
					}
				});
				this.space();
			}
			if (node2.inexact) {
				this.indent();
				this.token("...");
				if (props.length) {
					this.newline();
				}
				this.dedent();
			}
			if (node2.exact) {
				this.token("|}");
			} else {
				this.tokenChar(125);
			}
		}

		function ObjectTypeInternalSlot(node2) {
			if (node2.static) {
				this.word("static");
				this.space();
			}
			this.tokenChar(91);
			this.tokenChar(91);
			this.print(node2.id);
			this.tokenChar(93);
			this.tokenChar(93);
			if (node2.optional)
				this.tokenChar(63);
			if (!node2.method) {
				this.tokenChar(58);
				this.space();
			}
			this.print(node2.value);
		}

		function ObjectTypeCallProperty(node2) {
			if (node2.static) {
				this.word("static");
				this.space();
			}
			this.print(node2.value);
		}

		function ObjectTypeIndexer(node2) {
			if (node2.static) {
				this.word("static");
				this.space();
			}
			this._variance(node2);
			this.tokenChar(91);
			if (node2.id) {
				this.print(node2.id);
				this.tokenChar(58);
				this.space();
			}
			this.print(node2.key);
			this.tokenChar(93);
			this.tokenChar(58);
			this.space();
			this.print(node2.value);
		}

		function ObjectTypeProperty(node2) {
			if (node2.proto) {
				this.word("proto");
				this.space();
			}
			if (node2.static) {
				this.word("static");
				this.space();
			}
			if (node2.kind === "get" || node2.kind === "set") {
				this.word(node2.kind);
				this.space();
			}
			this._variance(node2);
			this.print(node2.key);
			if (node2.optional)
				this.tokenChar(63);
			if (!node2.method) {
				this.tokenChar(58);
				this.space();
			}
			this.print(node2.value);
		}

		function ObjectTypeSpreadProperty(node2) {
			this.token("...");
			this.print(node2.argument);
		}

		function QualifiedTypeIdentifier(node2) {
			this.print(node2.qualification);
			this.tokenChar(46);
			this.print(node2.id);
		}

		function SymbolTypeAnnotation() {
			this.word("symbol");
		}

		function orSeparator(occurrenceCount) {
			this.space();
			this.token("|", false, occurrenceCount);
			this.space();
		}

		function UnionTypeAnnotation2(node2) {
			this.printJoin(node2.types, void 0, void 0, orSeparator);
		}

		function TypeCastExpression(node2) {
			this.tokenChar(40);
			this.print(node2.expression);
			this.print(node2.typeAnnotation);
			this.tokenChar(41);
		}

		function Variance(node2) {
			if (node2.kind === "plus") {
				this.tokenChar(43);
			} else {
				this.tokenChar(45);
			}
		}

		function VoidTypeAnnotation() {
			this.word("void");
		}

		function IndexedAccessType(node2) {
			this.print(node2.objectType, true);
			this.tokenChar(91);
			this.print(node2.indexType);
			this.tokenChar(93);
		}

		function OptionalIndexedAccessType2(node2) {
			this.print(node2.objectType);
			if (node2.optional) {
				this.token("?.");
			}
			this.tokenChar(91);
			this.print(node2.indexType);
			this.tokenChar(93);
		}
	})(flow);
	var base = {};
	Object.defineProperty(base, "__esModule", {
		value: true
	});
	base.BlockStatement = BlockStatement;
	base.Directive = Directive;
	base.DirectiveLiteral = DirectiveLiteral;
	base.File = File;
	base.InterpreterDirective = InterpreterDirective;
	base.Placeholder = Placeholder;
	base.Program = Program;

	function File(node2) {
		if (node2.program) {
			this.print(node2.program.interpreter);
		}
		this.print(node2.program);
	}

	function Program(node2) {
		var _node$directives;
		this.noIndentInnerCommentsHere();
		this.printInnerComments();
		const directivesLen = (_node$directives = node2.directives) == null ? void 0 : _node$directives.length;
		if (directivesLen) {
			var _node$directives$trai;
			const newline = node2.body.length ? 2 : 1;
			this.printSequence(node2.directives, void 0, newline);
			if (!((_node$directives$trai = node2.directives[directivesLen - 1].trailingComments) != null && _node$directives$trai.length)) {
				this.newline(newline);
			}
		}
		this.printSequence(node2.body);
	}

	function BlockStatement(node2) {
		var _node$directives2;
		this.tokenChar(123);
		const exit = this.enterDelimited();
		const directivesLen = (_node$directives2 = node2.directives) == null ? void 0 : _node$directives2.length;
		if (directivesLen) {
			var _node$directives$trai2;
			const newline = node2.body.length ? 2 : 1;
			this.printSequence(node2.directives, true, newline);
			if (!((_node$directives$trai2 = node2.directives[directivesLen - 1].trailingComments) != null && _node$directives$trai2.length)) {
				this.newline(newline);
			}
		}
		this.printSequence(node2.body, true);
		exit();
		this.rightBrace(node2);
	}

	function Directive(node2) {
		this.print(node2.value);
		this.semicolon();
	}

	const unescapedSingleQuoteRE = /(?:^|[^\\])(?:\\\\)*'/;
	const unescapedDoubleQuoteRE = /(?:^|[^\\])(?:\\\\)*"/;

	function DirectiveLiteral(node2) {
		const raw = this.getPossibleRaw(node2);
		if (!this.format.minified && raw !== void 0) {
			this.token(raw);
			return;
		}
		const {
			value
		} = node2;
		if (!unescapedDoubleQuoteRE.test(value)) {
			this.token(`"${value}"`);
		} else if (!unescapedSingleQuoteRE.test(value)) {
			this.token(`'${value}'`);
		} else {
			throw new Error("Malformed AST: it is not possible to print a directive containing both unescaped single and double quotes.");
		}
	}

	function InterpreterDirective(node2) {
		this.token(`#!${node2.value}`);
		this.newline(1, true);
	}

	function Placeholder(node2) {
		this.token("%%");
		this.print(node2.name);
		this.token("%%");
		if (node2.expectedNode === "Statement") {
			this.semicolon();
		}
	}

	var jsx = {};
	Object.defineProperty(jsx, "__esModule", {
		value: true
	});
	jsx.JSXAttribute = JSXAttribute;
	jsx.JSXClosingElement = JSXClosingElement;
	jsx.JSXClosingFragment = JSXClosingFragment;
	jsx.JSXElement = JSXElement;
	jsx.JSXEmptyExpression = JSXEmptyExpression;
	jsx.JSXExpressionContainer = JSXExpressionContainer;
	jsx.JSXFragment = JSXFragment;
	jsx.JSXIdentifier = JSXIdentifier;
	jsx.JSXMemberExpression = JSXMemberExpression;
	jsx.JSXNamespacedName = JSXNamespacedName;
	jsx.JSXOpeningElement = JSXOpeningElement;
	jsx.JSXOpeningFragment = JSXOpeningFragment;
	jsx.JSXSpreadAttribute = JSXSpreadAttribute;
	jsx.JSXSpreadChild = JSXSpreadChild;
	jsx.JSXText = JSXText;

	function JSXAttribute(node2) {
		this.print(node2.name);
		if (node2.value) {
			this.tokenChar(61);
			this.print(node2.value);
		}
	}

	function JSXIdentifier(node2) {
		this.word(node2.name);
	}

	function JSXNamespacedName(node2) {
		this.print(node2.namespace);
		this.tokenChar(58);
		this.print(node2.name);
	}

	function JSXMemberExpression(node2) {
		this.print(node2.object);
		this.tokenChar(46);
		this.print(node2.property);
	}

	function JSXSpreadAttribute(node2) {
		this.tokenChar(123);
		this.token("...");
		this.print(node2.argument);
		this.rightBrace(node2);
	}

	function JSXExpressionContainer(node2) {
		this.tokenChar(123);
		this.print(node2.expression);
		this.rightBrace(node2);
	}

	function JSXSpreadChild(node2) {
		this.tokenChar(123);
		this.token("...");
		this.print(node2.expression);
		this.rightBrace(node2);
	}

	function JSXText(node2) {
		const raw = this.getPossibleRaw(node2);
		if (raw !== void 0) {
			this.token(raw, true);
		} else {
			this.token(node2.value, true);
		}
	}

	function JSXElement(node2) {
		const open = node2.openingElement;
		this.print(open);
		if (open.selfClosing)
			return;
		this.indent();
		for (const child of node2.children) {
			this.print(child);
		}
		this.dedent();
		this.print(node2.closingElement);
	}

	function spaceSeparator() {
		this.space();
	}

	function JSXOpeningElement(node2) {
		this.tokenChar(60);
		this.print(node2.name);
		{
			if (node2.typeArguments) {
				this.print(node2.typeArguments);
			}
			this.print(node2.typeParameters);
		}
		if (node2.attributes.length > 0) {
			this.space();
			this.printJoin(node2.attributes, void 0, void 0, spaceSeparator);
		}
		if (node2.selfClosing) {
			this.space();
			this.tokenChar(47);
		}
		this.tokenChar(62);
	}

	function JSXClosingElement(node2) {
		this.tokenChar(60);
		this.tokenChar(47);
		this.print(node2.name);
		this.tokenChar(62);
	}

	function JSXEmptyExpression() {
		this.printInnerComments();
	}

	function JSXFragment(node2) {
		this.print(node2.openingFragment);
		this.indent();
		for (const child of node2.children) {
			this.print(child);
		}
		this.dedent();
		this.print(node2.closingFragment);
	}

	function JSXOpeningFragment() {
		this.tokenChar(60);
		this.tokenChar(62);
	}

	function JSXClosingFragment() {
		this.token("</");
		this.tokenChar(62);
	}

	var typescript = {};
	Object.defineProperty(typescript, "__esModule", {
		value: true
	});
	typescript.TSAnyKeyword = TSAnyKeyword;
	typescript.TSArrayType = TSArrayType;
	typescript.TSSatisfiesExpression = typescript.TSAsExpression = TSTypeExpression;
	typescript.TSBigIntKeyword = TSBigIntKeyword;
	typescript.TSBooleanKeyword = TSBooleanKeyword;
	typescript.TSCallSignatureDeclaration = TSCallSignatureDeclaration;
	typescript.TSInterfaceHeritage = typescript.TSClassImplements = TSClassImplements;
	typescript.TSConditionalType = TSConditionalType;
	typescript.TSConstructSignatureDeclaration = TSConstructSignatureDeclaration;
	typescript.TSConstructorType = TSConstructorType;
	typescript.TSDeclareFunction = TSDeclareFunction;
	typescript.TSDeclareMethod = TSDeclareMethod;
	typescript.TSEnumBody = TSEnumBody;
	typescript.TSEnumDeclaration = TSEnumDeclaration;
	typescript.TSEnumMember = TSEnumMember;
	typescript.TSExportAssignment = TSExportAssignment;
	typescript.TSExternalModuleReference = TSExternalModuleReference;
	typescript.TSFunctionType = TSFunctionType;
	typescript.TSImportEqualsDeclaration = TSImportEqualsDeclaration;
	typescript.TSImportType = TSImportType;
	typescript.TSIndexSignature = TSIndexSignature;
	typescript.TSIndexedAccessType = TSIndexedAccessType;
	typescript.TSInferType = TSInferType;
	typescript.TSInstantiationExpression = TSInstantiationExpression;
	typescript.TSInterfaceBody = TSInterfaceBody;
	typescript.TSInterfaceDeclaration = TSInterfaceDeclaration;
	typescript.TSIntersectionType = TSIntersectionType;
	typescript.TSIntrinsicKeyword = TSIntrinsicKeyword;
	typescript.TSLiteralType = TSLiteralType;
	typescript.TSMappedType = TSMappedType;
	typescript.TSMethodSignature = TSMethodSignature;
	typescript.TSModuleBlock = TSModuleBlock;
	typescript.TSModuleDeclaration = TSModuleDeclaration;
	typescript.TSNamedTupleMember = TSNamedTupleMember;
	typescript.TSNamespaceExportDeclaration = TSNamespaceExportDeclaration;
	typescript.TSNeverKeyword = TSNeverKeyword;
	typescript.TSNonNullExpression = TSNonNullExpression;
	typescript.TSNullKeyword = TSNullKeyword;
	typescript.TSNumberKeyword = TSNumberKeyword;
	typescript.TSObjectKeyword = TSObjectKeyword;
	typescript.TSOptionalType = TSOptionalType;
	typescript.TSParameterProperty = TSParameterProperty;
	typescript.TSParenthesizedType = TSParenthesizedType;
	typescript.TSPropertySignature = TSPropertySignature;
	typescript.TSQualifiedName = TSQualifiedName;
	typescript.TSRestType = TSRestType;
	typescript.TSStringKeyword = TSStringKeyword;
	typescript.TSSymbolKeyword = TSSymbolKeyword;
	typescript.TSTemplateLiteralType = TSTemplateLiteralType;
	typescript.TSThisType = TSThisType;
	typescript.TSTupleType = TSTupleType;
	typescript.TSTypeAliasDeclaration = TSTypeAliasDeclaration;
	typescript.TSTypeAnnotation = TSTypeAnnotation;
	typescript.TSTypeAssertion = TSTypeAssertion;
	typescript.TSTypeLiteral = TSTypeLiteral;
	typescript.TSTypeOperator = TSTypeOperator;
	typescript.TSTypeParameter = TSTypeParameter;
	typescript.TSTypeParameterDeclaration = typescript.TSTypeParameterInstantiation = TSTypeParameterInstantiation;
	typescript.TSTypePredicate = TSTypePredicate;
	typescript.TSTypeQuery = TSTypeQuery;
	typescript.TSTypeReference = TSTypeReference;
	typescript.TSUndefinedKeyword = TSUndefinedKeyword;
	typescript.TSUnionType = TSUnionType;
	typescript.TSUnknownKeyword = TSUnknownKeyword;
	typescript.TSVoidKeyword = TSVoidKeyword;
	typescript.tsPrintClassMemberModifiers = tsPrintClassMemberModifiers;
	typescript.tsPrintFunctionOrConstructorType = tsPrintFunctionOrConstructorType;
	typescript.tsPrintPropertyOrMethodName = tsPrintPropertyOrMethodName;
	typescript.tsPrintSignatureDeclarationBase = tsPrintSignatureDeclarationBase;

	function TSTypeAnnotation(node2, parent) {
		this.token((parent.type === "TSFunctionType" || parent.type === "TSConstructorType") && parent.typeAnnotation === node2 ? "=>" : ":");
		this.space();
		if (node2.optional)
			this.tokenChar(63);
		this.print(node2.typeAnnotation);
	}

	function TSTypeParameterInstantiation(node2, parent) {
		this.tokenChar(60);
		let printTrailingSeparator = parent.type === "ArrowFunctionExpression" && node2.params.length === 1;
		if (this.tokenMap && node2.start != null && node2.end != null) {
			printTrailingSeparator && (printTrailingSeparator = !!this.tokenMap.find(node2, (t) => this.tokenMap.matchesOriginal(t, ",")));
			printTrailingSeparator || (printTrailingSeparator = this.shouldPrintTrailingComma(">"));
		}
		this.printList(node2.params, printTrailingSeparator);
		this.tokenChar(62);
	}

	function TSTypeParameter(node2) {
		if (node2.in) {
			this.word("in");
			this.space();
		}
		if (node2.out) {
			this.word("out");
			this.space();
		}
		this.word(node2.name);
		if (node2.constraint) {
			this.space();
			this.word("extends");
			this.space();
			this.print(node2.constraint);
		}
		if (node2.default) {
			this.space();
			this.tokenChar(61);
			this.space();
			this.print(node2.default);
		}
	}

	function TSParameterProperty(node2) {
		if (node2.accessibility) {
			this.word(node2.accessibility);
			this.space();
		}
		if (node2.readonly) {
			this.word("readonly");
			this.space();
		}
		this._param(node2.parameter);
	}

	function TSDeclareFunction(node2, parent) {
		if (node2.declare) {
			this.word("declare");
			this.space();
		}
		this._functionHead(node2, parent);
		this.semicolon();
	}

	function TSDeclareMethod(node2) {
		this._classMethodHead(node2);
		this.semicolon();
	}

	function TSQualifiedName(node2) {
		this.print(node2.left);
		this.tokenChar(46);
		this.print(node2.right);
	}

	function TSCallSignatureDeclaration(node2) {
		this.tsPrintSignatureDeclarationBase(node2);
		maybePrintTrailingCommaOrSemicolon(this, node2);
	}

	function maybePrintTrailingCommaOrSemicolon(printer2, node2) {
		if (!printer2.tokenMap || !node2.start || !node2.end) {
			printer2.semicolon();
			return;
		}
		if (printer2.tokenMap.endMatches(node2, ",")) {
			printer2.token(",");
		} else if (printer2.tokenMap.endMatches(node2, ";")) {
			printer2.semicolon();
		}
	}

	function TSConstructSignatureDeclaration(node2) {
		this.word("new");
		this.space();
		this.tsPrintSignatureDeclarationBase(node2);
		maybePrintTrailingCommaOrSemicolon(this, node2);
	}

	function TSPropertySignature(node2) {
		const {
			readonly
		} = node2;
		if (readonly) {
			this.word("readonly");
			this.space();
		}
		this.tsPrintPropertyOrMethodName(node2);
		this.print(node2.typeAnnotation);
		maybePrintTrailingCommaOrSemicolon(this, node2);
	}

	function tsPrintPropertyOrMethodName(node2) {
		if (node2.computed) {
			this.tokenChar(91);
		}
		this.print(node2.key);
		if (node2.computed) {
			this.tokenChar(93);
		}
		if (node2.optional) {
			this.tokenChar(63);
		}
	}

	function TSMethodSignature(node2) {
		const {
			kind
		} = node2;
		if (kind === "set" || kind === "get") {
			this.word(kind);
			this.space();
		}
		this.tsPrintPropertyOrMethodName(node2);
		this.tsPrintSignatureDeclarationBase(node2);
		maybePrintTrailingCommaOrSemicolon(this, node2);
	}

	function TSIndexSignature(node2) {
		const {
			readonly,
			static: isStatic
		} = node2;
		if (isStatic) {
			this.word("static");
			this.space();
		}
		if (readonly) {
			this.word("readonly");
			this.space();
		}
		this.tokenChar(91);
		this._parameters(node2.parameters, "]");
		this.print(node2.typeAnnotation);
		maybePrintTrailingCommaOrSemicolon(this, node2);
	}

	function TSAnyKeyword() {
		this.word("any");
	}

	function TSBigIntKeyword() {
		this.word("bigint");
	}

	function TSUnknownKeyword() {
		this.word("unknown");
	}

	function TSNumberKeyword() {
		this.word("number");
	}

	function TSObjectKeyword() {
		this.word("object");
	}

	function TSBooleanKeyword() {
		this.word("boolean");
	}

	function TSStringKeyword() {
		this.word("string");
	}

	function TSSymbolKeyword() {
		this.word("symbol");
	}

	function TSVoidKeyword() {
		this.word("void");
	}

	function TSUndefinedKeyword() {
		this.word("undefined");
	}

	function TSNullKeyword() {
		this.word("null");
	}

	function TSNeverKeyword() {
		this.word("never");
	}

	function TSIntrinsicKeyword() {
		this.word("intrinsic");
	}

	function TSThisType() {
		this.word("this");
	}

	function TSFunctionType(node2) {
		this.tsPrintFunctionOrConstructorType(node2);
	}

	function TSConstructorType(node2) {
		if (node2.abstract) {
			this.word("abstract");
			this.space();
		}
		this.word("new");
		this.space();
		this.tsPrintFunctionOrConstructorType(node2);
	}

	function tsPrintFunctionOrConstructorType(node2) {
		const {
			typeParameters
		} = node2;
		const parameters = node2.parameters;
		this.print(typeParameters);
		this.tokenChar(40);
		this._parameters(parameters, ")");
		this.space();
		const returnType = node2.typeAnnotation;
		this.print(returnType);
	}

	function TSTypeReference(node2) {
		const typeArguments = node2.typeParameters;
		this.print(node2.typeName, !!typeArguments);
		this.print(typeArguments);
	}

	function TSTypePredicate(node2) {
		if (node2.asserts) {
			this.word("asserts");
			this.space();
		}
		this.print(node2.parameterName);
		if (node2.typeAnnotation) {
			this.space();
			this.word("is");
			this.space();
			this.print(node2.typeAnnotation.typeAnnotation);
		}
	}

	function TSTypeQuery(node2) {
		this.word("typeof");
		this.space();
		this.print(node2.exprName);
		const typeArguments = node2.typeParameters;
		if (typeArguments) {
			this.print(typeArguments);
		}
	}

	function TSTypeLiteral(node2) {
		printBraced(this, node2, () => this.printJoin(node2.members, true, true));
	}

	function TSArrayType(node2) {
		this.print(node2.elementType, true);
		this.tokenChar(91);
		this.tokenChar(93);
	}

	function TSTupleType(node2) {
		this.tokenChar(91);
		this.printList(node2.elementTypes, this.shouldPrintTrailingComma("]"));
		this.tokenChar(93);
	}

	function TSOptionalType(node2) {
		this.print(node2.typeAnnotation);
		this.tokenChar(63);
	}

	function TSRestType(node2) {
		this.token("...");
		this.print(node2.typeAnnotation);
	}

	function TSNamedTupleMember(node2) {
		this.print(node2.label);
		if (node2.optional)
			this.tokenChar(63);
		this.tokenChar(58);
		this.space();
		this.print(node2.elementType);
	}

	function TSUnionType(node2) {
		tsPrintUnionOrIntersectionType(this, node2, "|");
	}

	function TSIntersectionType(node2) {
		tsPrintUnionOrIntersectionType(this, node2, "&");
	}

	function tsPrintUnionOrIntersectionType(printer2, node2, sep) {
		var _printer$tokenMap;
		let hasLeadingToken = 0;
		if ((_printer$tokenMap = printer2.tokenMap) != null && _printer$tokenMap.startMatches(node2, sep)) {
			hasLeadingToken = 1;
			printer2.token(sep);
		}
		printer2.printJoin(node2.types, void 0, void 0, function (i) {
			this.space();
			this.token(sep, null, i + hasLeadingToken);
			this.space();
		});
	}

	function TSConditionalType(node2) {
		this.print(node2.checkType);
		this.space();
		this.word("extends");
		this.space();
		this.print(node2.extendsType);
		this.space();
		this.tokenChar(63);
		this.space();
		this.print(node2.trueType);
		this.space();
		this.tokenChar(58);
		this.space();
		this.print(node2.falseType);
	}

	function TSInferType(node2) {
		this.word("infer");
		this.print(node2.typeParameter);
	}

	function TSParenthesizedType(node2) {
		this.tokenChar(40);
		this.print(node2.typeAnnotation);
		this.tokenChar(41);
	}

	function TSTypeOperator(node2) {
		this.word(node2.operator);
		this.space();
		this.print(node2.typeAnnotation);
	}

	function TSIndexedAccessType(node2) {
		this.print(node2.objectType, true);
		this.tokenChar(91);
		this.print(node2.indexType);
		this.tokenChar(93);
	}

	function TSMappedType(node2) {
		const {
			nameType,
			optional,
			readonly,
			typeAnnotation: typeAnnotation2
		} = node2;
		this.tokenChar(123);
		const exit = this.enterDelimited();
		this.space();
		if (readonly) {
			tokenIfPlusMinus(this, readonly);
			this.word("readonly");
			this.space();
		}
		this.tokenChar(91);
		{
			this.word(node2.typeParameter.name);
		}
		this.space();
		this.word("in");
		this.space();
		{
			this.print(node2.typeParameter.constraint);
		}
		if (nameType) {
			this.space();
			this.word("as");
			this.space();
			this.print(nameType);
		}
		this.tokenChar(93);
		if (optional) {
			tokenIfPlusMinus(this, optional);
			this.tokenChar(63);
		}
		if (typeAnnotation2) {
			this.tokenChar(58);
			this.space();
			this.print(typeAnnotation2);
		}
		this.space();
		exit();
		this.tokenChar(125);
	}

	function tokenIfPlusMinus(self2, tok) {
		if (tok !== true) {
			self2.token(tok);
		}
	}

	function TSTemplateLiteralType(node2) {
		this._printTemplate(node2, node2.types);
	}

	function TSLiteralType(node2) {
		this.print(node2.literal);
	}

	function TSClassImplements(node2) {
		this.print(node2.expression);
		this.print(node2.typeArguments);
	}

	function TSInterfaceDeclaration(node2) {
		const {
			declare,
			id,
			typeParameters,
			extends: extendz,
			body
		} = node2;
		if (declare) {
			this.word("declare");
			this.space();
		}
		this.word("interface");
		this.space();
		this.print(id);
		this.print(typeParameters);
		if (extendz != null && extendz.length) {
			this.space();
			this.word("extends");
			this.space();
			this.printList(extendz);
		}
		this.space();
		this.print(body);
	}

	function TSInterfaceBody(node2) {
		printBraced(this, node2, () => this.printJoin(node2.body, true, true));
	}

	function TSTypeAliasDeclaration(node2) {
		const {
			declare,
			id,
			typeParameters,
			typeAnnotation: typeAnnotation2
		} = node2;
		if (declare) {
			this.word("declare");
			this.space();
		}
		this.word("type");
		this.space();
		this.print(id);
		this.print(typeParameters);
		this.space();
		this.tokenChar(61);
		this.space();
		this.print(typeAnnotation2);
		this.semicolon();
	}

	function TSTypeExpression(node2) {
		const {
			type,
			expression,
			typeAnnotation: typeAnnotation2
		} = node2;
		this.print(expression, true);
		this.space();
		this.word(type === "TSAsExpression" ? "as" : "satisfies");
		this.space();
		this.print(typeAnnotation2);
	}

	function TSTypeAssertion(node2) {
		const {
			typeAnnotation: typeAnnotation2,
			expression
		} = node2;
		this.tokenChar(60);
		this.print(typeAnnotation2);
		this.tokenChar(62);
		this.space();
		this.print(expression);
	}

	function TSInstantiationExpression(node2) {
		this.print(node2.expression);
		{
			this.print(node2.typeParameters);
		}
	}

	function TSEnumDeclaration(node2) {
		const {
			declare,
			const: isConst,
			id
		} = node2;
		if (declare) {
			this.word("declare");
			this.space();
		}
		if (isConst) {
			this.word("const");
			this.space();
		}
		this.word("enum");
		this.space();
		this.print(id);
		this.space();
		{
			TSEnumBody.call(this, node2);
		}
	}

	function TSEnumBody(node2) {
		printBraced(this, node2, () => {
			var _this$shouldPrintTrai;
			return this.printList(node2.members, (_this$shouldPrintTrai = this.shouldPrintTrailingComma("}")) != null ? _this$shouldPrintTrai : true, true, true);
		});
	}

	function TSEnumMember(node2) {
		const {
			id,
			initializer
		} = node2;
		this.print(id);
		if (initializer) {
			this.space();
			this.tokenChar(61);
			this.space();
			this.print(initializer);
		}
	}

	function TSModuleDeclaration(node2) {
		const {
			declare,
			id,
			kind
		} = node2;
		if (declare) {
			this.word("declare");
			this.space();
		}
		{
			if (!node2.global) {
				this.word(kind != null ? kind : id.type === "Identifier" ? "namespace" : "module");
				this.space();
			}
			this.print(id);
			if (!node2.body) {
				this.semicolon();
				return;
			}
			let body = node2.body;
			while (body.type === "TSModuleDeclaration") {
				this.tokenChar(46);
				this.print(body.id);
				body = body.body;
			}
			this.space();
			this.print(body);
		}
	}

	function TSModuleBlock(node2) {
		printBraced(this, node2, () => this.printSequence(node2.body, true));
	}

	function TSImportType(node2) {
		const {
			argument,
			qualifier,
			options
		} = node2;
		this.word("import");
		this.tokenChar(40);
		this.print(argument);
		if (options) {
			this.tokenChar(44);
			this.print(options);
		}
		this.tokenChar(41);
		if (qualifier) {
			this.tokenChar(46);
			this.print(qualifier);
		}
		const typeArguments = node2.typeParameters;
		if (typeArguments) {
			this.print(typeArguments);
		}
	}

	function TSImportEqualsDeclaration(node2) {
		const {
			id,
			moduleReference
		} = node2;
		if (node2.isExport) {
			this.word("export");
			this.space();
		}
		this.word("import");
		this.space();
		this.print(id);
		this.space();
		this.tokenChar(61);
		this.space();
		this.print(moduleReference);
		this.semicolon();
	}

	function TSExternalModuleReference(node2) {
		this.token("require(");
		this.print(node2.expression);
		this.tokenChar(41);
	}

	function TSNonNullExpression(node2) {
		this.print(node2.expression);
		this.tokenChar(33);
	}

	function TSExportAssignment(node2) {
		this.word("export");
		this.space();
		this.tokenChar(61);
		this.space();
		this.print(node2.expression);
		this.semicolon();
	}

	function TSNamespaceExportDeclaration(node2) {
		this.word("export");
		this.space();
		this.word("as");
		this.space();
		this.word("namespace");
		this.space();
		this.print(node2.id);
		this.semicolon();
	}

	function tsPrintSignatureDeclarationBase(node2) {
		const {
			typeParameters
		} = node2;
		const parameters = node2.parameters;
		this.print(typeParameters);
		this.tokenChar(40);
		this._parameters(parameters, ")");
		const returnType = node2.typeAnnotation;
		this.print(returnType);
	}

	function tsPrintClassMemberModifiers(node2) {
		const isPrivateField = node2.type === "ClassPrivateProperty";
		const isPublicField = node2.type === "ClassAccessorProperty" || node2.type === "ClassProperty";
		printModifiersList(this, node2, [isPublicField && node2.declare && "declare", !isPrivateField && node2.accessibility]);
		if (node2.static) {
			this.word("static");
			this.space();
		}
		printModifiersList(this, node2, [!isPrivateField && node2.abstract && "abstract", !isPrivateField && node2.override && "override", (isPublicField || isPrivateField) && node2.readonly && "readonly"]);
	}

	function printBraced(printer2, node2, cb) {
		printer2.token("{");
		const exit = printer2.enterDelimited();
		cb();
		exit();
		printer2.rightBrace(node2);
	}

	function printModifiersList(printer2, node2, modifiers) {
		var _printer$tokenMap2;
		const modifiersSet = /* @__PURE__ */ new Set();
		for (const modifier of modifiers) {
			if (modifier)
				modifiersSet.add(modifier);
		}
		(_printer$tokenMap2 = printer2.tokenMap) == null || _printer$tokenMap2.find(node2, (tok) => {
			if (modifiersSet.has(tok.value)) {
				printer2.token(tok.value);
				printer2.space();
				modifiersSet.delete(tok.value);
				return modifiersSet.size === 0;
			}
		});
		for (const modifier of modifiersSet) {
			printer2.word(modifier);
			printer2.space();
		}
	}

	(function (exports3) {
		Object.defineProperty(exports3, "__esModule", {
			value: true
		});
		var _templateLiterals = templateLiterals;
		Object.keys(_templateLiterals).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _templateLiterals[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _templateLiterals[key];
				}
			});
		});
		var _expressions = expressions;
		Object.keys(_expressions).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _expressions[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _expressions[key];
				}
			});
		});
		var _statements = statements;
		Object.keys(_statements).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _statements[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _statements[key];
				}
			});
		});
		var _classes = classes;
		Object.keys(_classes).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _classes[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _classes[key];
				}
			});
		});
		var _methods = methods;
		Object.keys(_methods).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _methods[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _methods[key];
				}
			});
		});
		var _modules = modules;
		Object.keys(_modules).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _modules[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _modules[key];
				}
			});
		});
		var _types = types;
		Object.keys(_types).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _types[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _types[key];
				}
			});
		});
		var _flow = flow;
		Object.keys(_flow).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _flow[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _flow[key];
				}
			});
		});
		var _base = base;
		Object.keys(_base).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _base[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _base[key];
				}
			});
		});
		var _jsx = jsx;
		Object.keys(_jsx).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _jsx[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _jsx[key];
				}
			});
		});
		var _typescript = typescript;
		Object.keys(_typescript).forEach(function (key) {
			if (key === "default" || key === "__esModule")
				return;
			if (key in exports3 && exports3[key] === _typescript[key])
				return;
			Object.defineProperty(exports3, key, {
				enumerable: true,
				get: function () {
					return _typescript[key];
				}
			});
		});
	})(generators);
	var deprecated = {};
	Object.defineProperty(deprecated, "__esModule", {
		value: true
	});
	deprecated.addDeprecatedGenerators = addDeprecatedGenerators;

	function addDeprecatedGenerators(PrinterClass) {
		{
			const deprecatedBabel7Generators = {
				Noop() {
				},
				TSExpressionWithTypeArguments(node2) {
					this.print(node2.expression);
					this.print(node2.typeParameters);
				},
				DecimalLiteral(node2) {
					const raw = this.getPossibleRaw(node2);
					if (!this.format.minified && raw !== void 0) {
						this.word(raw);
						return;
					}
					this.word(node2.value + "m");
				}
			};
			Object.assign(PrinterClass.prototype, deprecatedBabel7Generators);
		}
	}

	Object.defineProperty(printer, "__esModule", {
		value: true
	});
	printer.default = void 0;
	var _buffer = buffer;
	var n = node;
	var _t = lib$2;
	var _tokenMap = tokenMap;
	var generatorFunctions = generators;
	var _deprecated = deprecated;
	const {
		isExpression,
		isFunction,
		isStatement,
		isClassBody,
		isTSInterfaceBody,
		isTSEnumMember
	} = _t;
	const SCIENTIFIC_NOTATION = /e/i;
	const ZERO_DECIMAL_INTEGER = /\.0+$/;
	const HAS_NEWLINE = /[\n\r\u2028\u2029]/;
	const HAS_NEWLINE_OR_BlOCK_COMMENT_END = /[\n\r\u2028\u2029]|\*\//;

	function commentIsNewline(c) {
		return c.type === "CommentLine" || HAS_NEWLINE.test(c.value);
	}

	const {
		needsParens
	} = n;

	class Printer {
		constructor(format, map, tokens, originalCode) {
			this.inForStatementInit = false;
			this.tokenContext = 0;
			this._tokens = null;
			this._originalCode = null;
			this._currentNode = null;
			this._indent = 0;
			this._indentRepeat = 0;
			this._insideAux = false;
			this._noLineTerminator = false;
			this._noLineTerminatorAfterNode = null;
			this._printAuxAfterOnNextUserNode = false;
			this._printedComments = /* @__PURE__ */ new Set();
			this._endsWithInteger = false;
			this._endsWithWord = false;
			this._endsWithDiv = false;
			this._lastCommentLine = 0;
			this._endsWithInnerRaw = false;
			this._indentInnerComments = true;
			this.tokenMap = null;
			this._boundGetRawIdentifier = this._getRawIdentifier.bind(this);
			this._printSemicolonBeforeNextNode = -1;
			this._printSemicolonBeforeNextToken = -1;
			this.format = format;
			this._tokens = tokens;
			this._originalCode = originalCode;
			this._indentRepeat = format.indent.style.length;
			this._inputMap = map == null ? void 0 : map._inputMap;
			this._buf = new _buffer.default(map, format.indent.style[0]);
		}

		enterForStatementInit() {
			if (this.inForStatementInit)
				return () => {
				};
			this.inForStatementInit = true;
			return () => {
				this.inForStatementInit = false;
			};
		}

		enterDelimited() {
			const oldInForStatementInit = this.inForStatementInit;
			const oldNoLineTerminatorAfterNode = this._noLineTerminatorAfterNode;
			if (oldInForStatementInit === false && oldNoLineTerminatorAfterNode === null) {
				return () => {
				};
			}
			this.inForStatementInit = false;
			this._noLineTerminatorAfterNode = null;
			return () => {
				this.inForStatementInit = oldInForStatementInit;
				this._noLineTerminatorAfterNode = oldNoLineTerminatorAfterNode;
			};
		}

		generate(ast) {
			if (this.format.preserveFormat) {
				this.tokenMap = new _tokenMap.TokenMap(ast, this._tokens, this._originalCode);
			}
			this.print(ast);
			this._maybeAddAuxComment();
			return this._buf.get();
		}

		indent() {
			const {
				format
			} = this;
			if (format.preserveFormat || format.compact || format.concise) {
				return;
			}
			this._indent++;
		}

		dedent() {
			const {
				format
			} = this;
			if (format.preserveFormat || format.compact || format.concise) {
				return;
			}
			this._indent--;
		}

		semicolon(force = false) {
			this._maybeAddAuxComment();
			if (force) {
				this._appendChar(59);
				this._noLineTerminator = false;
				return;
			}
			if (this.tokenMap) {
				const node2 = this._currentNode;
				if (node2.start != null && node2.end != null) {
					if (!this.tokenMap.endMatches(node2, ";")) {
						this._printSemicolonBeforeNextNode = this._buf.getCurrentLine();
						return;
					}
					const indexes = this.tokenMap.getIndexes(this._currentNode);
					this._catchUpTo(this._tokens[indexes[indexes.length - 1]].loc.start);
				}
			}
			this._queue(59);
			this._noLineTerminator = false;
		}

		rightBrace(node2) {
			if (this.format.minified) {
				this._buf.removeLastSemicolon();
			}
			this.sourceWithOffset("end", node2.loc, -1);
			this.tokenChar(125);
		}

		rightParens(node2) {
			this.sourceWithOffset("end", node2.loc, -1);
			this.tokenChar(41);
		}

		space(force = false) {
			const {
				format
			} = this;
			if (format.compact || format.preserveFormat)
				return;
			if (force) {
				this._space();
			} else if (this._buf.hasContent()) {
				const lastCp = this.getLastChar();
				if (lastCp !== 32 && lastCp !== 10) {
					this._space();
				}
			}
		}

		word(str, noLineTerminatorAfter = false) {
			this.tokenContext = 0;
			this._maybePrintInnerComments(str);
			this._maybeAddAuxComment();
			if (this.tokenMap)
				this._catchUpToCurrentToken(str);
			if (this._endsWithWord || this._endsWithDiv && str.charCodeAt(0) === 47) {
				this._space();
			}
			this._append(str, false);
			this._endsWithWord = true;
			this._noLineTerminator = noLineTerminatorAfter;
		}

		number(str, number) {
			function isNonDecimalLiteral(str2) {
				if (str2.length > 2 && str2.charCodeAt(0) === 48) {
					const secondChar = str2.charCodeAt(1);
					return secondChar === 98 || secondChar === 111 || secondChar === 120;
				}
				return false;
			}

			this.word(str);
			this._endsWithInteger = Number.isInteger(number) && !isNonDecimalLiteral(str) && !SCIENTIFIC_NOTATION.test(str) && !ZERO_DECIMAL_INTEGER.test(str) && str.charCodeAt(str.length - 1) !== 46;
		}

		token(str, maybeNewline = false, occurrenceCount = 0) {
			this.tokenContext = 0;
			this._maybePrintInnerComments(str, occurrenceCount);
			this._maybeAddAuxComment();
			if (this.tokenMap)
				this._catchUpToCurrentToken(str, occurrenceCount);
			const lastChar = this.getLastChar();
			const strFirst = str.charCodeAt(0);
			if (lastChar === 33 && (str === "--" || strFirst === 61) || strFirst === 43 && lastChar === 43 || strFirst === 45 && lastChar === 45 || strFirst === 46 && this._endsWithInteger) {
				this._space();
			}
			this._append(str, maybeNewline);
			this._noLineTerminator = false;
		}

		tokenChar(char) {
			this.tokenContext = 0;
			const str = String.fromCharCode(char);
			this._maybePrintInnerComments(str);
			this._maybeAddAuxComment();
			if (this.tokenMap)
				this._catchUpToCurrentToken(str);
			const lastChar = this.getLastChar();
			if (char === 43 && lastChar === 43 || char === 45 && lastChar === 45 || char === 46 && this._endsWithInteger) {
				this._space();
			}
			this._appendChar(char);
			this._noLineTerminator = false;
		}

		newline(i = 1, force) {
			if (i <= 0)
				return;
			if (!force) {
				if (this.format.retainLines || this.format.compact)
					return;
				if (this.format.concise) {
					this.space();
					return;
				}
			}
			if (i > 2)
				i = 2;
			i -= this._buf.getNewlineCount();
			for (let j = 0; j < i; j++) {
				this._newline();
			}
			return;
		}

		endsWith(char) {
			return this.getLastChar() === char;
		}

		getLastChar() {
			return this._buf.getLastChar();
		}

		endsWithCharAndNewline() {
			return this._buf.endsWithCharAndNewline();
		}

		removeTrailingNewline() {
			this._buf.removeTrailingNewline();
		}

		exactSource(loc, cb) {
			if (!loc) {
				cb();
				return;
			}
			this._catchUp("start", loc);
			this._buf.exactSource(loc, cb);
		}

		source(prop, loc) {
			if (!loc)
				return;
			this._catchUp(prop, loc);
			this._buf.source(prop, loc);
		}

		sourceWithOffset(prop, loc, columnOffset) {
			if (!loc || this.format.preserveFormat)
				return;
			this._catchUp(prop, loc);
			this._buf.sourceWithOffset(prop, loc, columnOffset);
		}

		sourceIdentifierName(identifierName, pos) {
			if (!this._buf._canMarkIdName)
				return;
			const sourcePosition = this._buf._sourcePosition;
			sourcePosition.identifierNamePos = pos;
			sourcePosition.identifierName = identifierName;
		}

		_space() {
			this._queue(32);
		}

		_newline() {
			this._queue(10);
		}

		_catchUpToCurrentToken(str, occurrenceCount = 0) {
			const token = this.tokenMap.findMatching(this._currentNode, str, occurrenceCount);
			if (token)
				this._catchUpTo(token.loc.start);
			if (this._printSemicolonBeforeNextToken !== -1 && this._printSemicolonBeforeNextToken === this._buf.getCurrentLine()) {
				this._buf.appendChar(59);
				this._endsWithWord = false;
				this._endsWithInteger = false;
				this._endsWithDiv = false;
			}
			this._printSemicolonBeforeNextToken = -1;
			this._printSemicolonBeforeNextNode = -1;
		}

		_append(str, maybeNewline) {
			this._maybeIndent(str.charCodeAt(0));
			this._buf.append(str, maybeNewline);
			this._endsWithWord = false;
			this._endsWithInteger = false;
			this._endsWithDiv = false;
		}

		_appendChar(char) {
			this._maybeIndent(char);
			this._buf.appendChar(char);
			this._endsWithWord = false;
			this._endsWithInteger = false;
			this._endsWithDiv = false;
		}

		_queue(char) {
			this._maybeIndent(char);
			this._buf.queue(char);
			this._endsWithWord = false;
			this._endsWithInteger = false;
		}

		_maybeIndent(firstChar) {
			if (this._indent && firstChar !== 10 && this.endsWith(10)) {
				this._buf.queueIndentation(this._getIndent());
			}
		}

		_shouldIndent(firstChar) {
			if (this._indent && firstChar !== 10 && this.endsWith(10)) {
				return true;
			}
		}

		catchUp(line) {
			if (!this.format.retainLines)
				return;
			const count = line - this._buf.getCurrentLine();
			for (let i = 0; i < count; i++) {
				this._newline();
			}
		}

		_catchUp(prop, loc) {
			const {
				format
			} = this;
			if (!format.preserveFormat) {
				if (format.retainLines && loc != null && loc[prop]) {
					this.catchUp(loc[prop].line);
				}
				return;
			}
			const pos = loc == null ? void 0 : loc[prop];
			if (pos != null)
				this._catchUpTo(pos);
		}

		_catchUpTo({
			line,
			column,
			index
		}) {
			const count = line - this._buf.getCurrentLine();
			if (count > 0 && this._noLineTerminator) {
				return;
			}
			for (let i = 0; i < count; i++) {
				this._newline();
			}
			const spacesCount = count > 0 ? column : column - this._buf.getCurrentColumn();
			if (spacesCount > 0) {
				const spaces = this._originalCode ? this._originalCode.slice(index - spacesCount, index).replace(/[^\t\x0B\f \xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF]/gu, " ") : " ".repeat(spacesCount);
				this._append(spaces, false);
			}
		}

		_getIndent() {
			return this._indentRepeat * this._indent;
		}

		printTerminatorless(node2) {
			this._noLineTerminator = true;
			this.print(node2);
		}

		print(node2, noLineTerminatorAfter, trailingCommentsLineOffset) {
			var _node$extra, _node$leadingComments, _node$leadingComments2;
			if (!node2)
				return;
			this._endsWithInnerRaw = false;
			const nodeType = node2.type;
			const format = this.format;
			const oldConcise = format.concise;
			if (node2._compact) {
				format.concise = true;
			}
			const printMethod = this[nodeType];
			if (printMethod === void 0) {
				throw new ReferenceError(`unknown node of type ${JSON.stringify(nodeType)} with constructor ${JSON.stringify(node2.constructor.name)}`);
			}
			const parent = this._currentNode;
			this._currentNode = node2;
			if (this.tokenMap) {
				this._printSemicolonBeforeNextToken = this._printSemicolonBeforeNextNode;
			}
			const oldInAux = this._insideAux;
			this._insideAux = node2.loc == null;
			this._maybeAddAuxComment(this._insideAux && !oldInAux);
			const parenthesized = (_node$extra = node2.extra) == null ? void 0 : _node$extra.parenthesized;
			let shouldPrintParens = parenthesized && format.preserveFormat || parenthesized && format.retainFunctionParens && nodeType === "FunctionExpression" || needsParens(node2, parent, this.tokenContext, this.inForStatementInit, format.preserveFormat ? this._boundGetRawIdentifier : void 0);
			if (!shouldPrintParens && parenthesized && (_node$leadingComments = node2.leadingComments) != null && _node$leadingComments.length && node2.leadingComments[0].type === "CommentBlock") {
				const parentType = parent == null ? void 0 : parent.type;
				switch (parentType) {
					case "ExpressionStatement":
					case "VariableDeclarator":
					case "AssignmentExpression":
					case "ReturnStatement":
						break;
					case "CallExpression":
					case "OptionalCallExpression":
					case "NewExpression":
						if (parent.callee !== node2)
							break;
					default:
						shouldPrintParens = true;
				}
			}
			let indentParenthesized = false;
			if (!shouldPrintParens && this._noLineTerminator && ((_node$leadingComments2 = node2.leadingComments) != null && _node$leadingComments2.some(commentIsNewline) || this.format.retainLines && node2.loc && node2.loc.start.line > this._buf.getCurrentLine())) {
				shouldPrintParens = true;
				indentParenthesized = true;
			}
			let oldNoLineTerminatorAfterNode;
			let oldInForStatementInitWasTrue;
			if (!shouldPrintParens) {
				noLineTerminatorAfter || (noLineTerminatorAfter = parent && this._noLineTerminatorAfterNode === parent && n.isLastChild(parent, node2));
				if (noLineTerminatorAfter) {
					var _node$trailingComment;
					if ((_node$trailingComment = node2.trailingComments) != null && _node$trailingComment.some(commentIsNewline)) {
						if (isExpression(node2))
							shouldPrintParens = true;
					} else {
						oldNoLineTerminatorAfterNode = this._noLineTerminatorAfterNode;
						this._noLineTerminatorAfterNode = node2;
					}
				}
			}
			if (shouldPrintParens) {
				this.tokenChar(40);
				if (indentParenthesized)
					this.indent();
				this._endsWithInnerRaw = false;
				if (this.inForStatementInit) {
					oldInForStatementInitWasTrue = true;
					this.inForStatementInit = false;
				}
				oldNoLineTerminatorAfterNode = this._noLineTerminatorAfterNode;
				this._noLineTerminatorAfterNode = null;
			}
			this._lastCommentLine = 0;
			this._printLeadingComments(node2, parent);
			const loc = nodeType === "Program" || nodeType === "File" ? null : node2.loc;
			this.exactSource(loc, printMethod.bind(this, node2, parent));
			if (shouldPrintParens) {
				this._printTrailingComments(node2, parent);
				if (indentParenthesized) {
					this.dedent();
					this.newline();
				}
				this.tokenChar(41);
				this._noLineTerminator = noLineTerminatorAfter;
				if (oldInForStatementInitWasTrue)
					this.inForStatementInit = true;
			} else if (noLineTerminatorAfter && !this._noLineTerminator) {
				this._noLineTerminator = true;
				this._printTrailingComments(node2, parent);
			} else {
				this._printTrailingComments(node2, parent, trailingCommentsLineOffset);
			}
			this._currentNode = parent;
			format.concise = oldConcise;
			this._insideAux = oldInAux;
			if (oldNoLineTerminatorAfterNode !== void 0) {
				this._noLineTerminatorAfterNode = oldNoLineTerminatorAfterNode;
			}
			this._endsWithInnerRaw = false;
		}

		_maybeAddAuxComment(enteredPositionlessNode) {
			if (enteredPositionlessNode)
				this._printAuxBeforeComment();
			if (!this._insideAux)
				this._printAuxAfterComment();
		}

		_printAuxBeforeComment() {
			if (this._printAuxAfterOnNextUserNode)
				return;
			this._printAuxAfterOnNextUserNode = true;
			const comment = this.format.auxiliaryCommentBefore;
			if (comment) {
				this._printComment({
					type: "CommentBlock",
					value: comment
				}, 0);
			}
		}

		_printAuxAfterComment() {
			if (!this._printAuxAfterOnNextUserNode)
				return;
			this._printAuxAfterOnNextUserNode = false;
			const comment = this.format.auxiliaryCommentAfter;
			if (comment) {
				this._printComment({
					type: "CommentBlock",
					value: comment
				}, 0);
			}
		}

		getPossibleRaw(node2) {
			const extra = node2.extra;
			if ((extra == null ? void 0 : extra.raw) != null && extra.rawValue != null && node2.value === extra.rawValue) {
				return extra.raw;
			}
		}

		printJoin(nodes2, statement, indent, separator, printTrailingSeparator, addNewlines, iterator, trailingCommentsLineOffset) {
			if (!(nodes2 != null && nodes2.length))
				return;
			if (indent == null && this.format.retainLines) {
				var _nodes$0$loc;
				const startLine = (_nodes$0$loc = nodes2[0].loc) == null ? void 0 : _nodes$0$loc.start.line;
				if (startLine != null && startLine !== this._buf.getCurrentLine()) {
					indent = true;
				}
			}
			if (indent)
				this.indent();
			const newlineOpts = {
				addNewlines,
				nextNodeStartLine: 0
			};
			const boundSeparator = separator == null ? void 0 : separator.bind(this);
			const len = nodes2.length;
			for (let i = 0; i < len; i++) {
				const node2 = nodes2[i];
				if (!node2)
					continue;
				if (statement)
					this._printNewline(i === 0, newlineOpts);
				this.print(node2, void 0, trailingCommentsLineOffset || 0);
				iterator == null || iterator(node2, i);
				if (boundSeparator != null) {
					if (i < len - 1)
						boundSeparator(i, false);
					else if (printTrailingSeparator)
						boundSeparator(i, true);
				}
				if (statement) {
					var _node$trailingComment2;
					if (!((_node$trailingComment2 = node2.trailingComments) != null && _node$trailingComment2.length)) {
						this._lastCommentLine = 0;
					}
					if (i + 1 === len) {
						this.newline(1);
					} else {
						var _nextNode$loc;
						const nextNode = nodes2[i + 1];
						newlineOpts.nextNodeStartLine = ((_nextNode$loc = nextNode.loc) == null ? void 0 : _nextNode$loc.start.line) || 0;
						this._printNewline(true, newlineOpts);
					}
				}
			}
			if (indent)
				this.dedent();
		}

		printAndIndentOnComments(node2) {
			const indent = node2.leadingComments && node2.leadingComments.length > 0;
			if (indent)
				this.indent();
			this.print(node2);
			if (indent)
				this.dedent();
		}

		printBlock(parent) {
			const node2 = parent.body;
			if (node2.type !== "EmptyStatement") {
				this.space();
			}
			this.print(node2);
		}

		_printTrailingComments(node2, parent, lineOffset) {
			const {
				innerComments,
				trailingComments
			} = node2;
			if (innerComments != null && innerComments.length) {
				this._printComments(2, innerComments, node2, parent, lineOffset);
			}
			if (trailingComments != null && trailingComments.length) {
				this._printComments(2, trailingComments, node2, parent, lineOffset);
			}
		}

		_printLeadingComments(node2, parent) {
			const comments = node2.leadingComments;
			if (!(comments != null && comments.length))
				return;
			this._printComments(0, comments, node2, parent);
		}

		_maybePrintInnerComments(nextTokenStr, nextTokenOccurrenceCount) {
			if (this._endsWithInnerRaw) {
				var _this$tokenMap;
				this.printInnerComments((_this$tokenMap = this.tokenMap) == null ? void 0 : _this$tokenMap.findMatching(this._currentNode, nextTokenStr, nextTokenOccurrenceCount));
			}
			this._endsWithInnerRaw = true;
			this._indentInnerComments = true;
		}

		printInnerComments(nextToken) {
			const node2 = this._currentNode;
			const comments = node2.innerComments;
			if (!(comments != null && comments.length))
				return;
			const hasSpace = this.endsWith(32);
			const indent = this._indentInnerComments;
			const printedCommentsCount = this._printedComments.size;
			if (indent)
				this.indent();
			this._printComments(1, comments, node2, void 0, void 0, nextToken);
			if (hasSpace && printedCommentsCount !== this._printedComments.size) {
				this.space();
			}
			if (indent)
				this.dedent();
		}

		noIndentInnerCommentsHere() {
			this._indentInnerComments = false;
		}

		printSequence(nodes2, indent, trailingCommentsLineOffset, addNewlines) {
			this.printJoin(nodes2, true, indent != null ? indent : false, void 0, void 0, addNewlines, void 0, trailingCommentsLineOffset);
		}

		printList(items, printTrailingSeparator, statement, indent, separator, iterator) {
			this.printJoin(items, statement, indent, separator != null ? separator : commaSeparator, printTrailingSeparator, void 0, iterator);
		}

		shouldPrintTrailingComma(listEnd) {
			if (!this.tokenMap)
				return null;
			const listEndIndex = this.tokenMap.findLastIndex(this._currentNode, (token) => this.tokenMap.matchesOriginal(token, listEnd));
			if (listEndIndex <= 0)
				return null;
			return this.tokenMap.matchesOriginal(this._tokens[listEndIndex - 1], ",");
		}

		_printNewline(newLine, opts) {
			const format = this.format;
			if (format.retainLines || format.compact)
				return;
			if (format.concise) {
				this.space();
				return;
			}
			if (!newLine) {
				return;
			}
			const startLine = opts.nextNodeStartLine;
			const lastCommentLine = this._lastCommentLine;
			if (startLine > 0 && lastCommentLine > 0) {
				const offset = startLine - lastCommentLine;
				if (offset >= 0) {
					this.newline(offset || 1);
					return;
				}
			}
			if (this._buf.hasContent()) {
				this.newline(1);
			}
		}

		_shouldPrintComment(comment, nextToken) {
			if (comment.ignore)
				return 0;
			if (this._printedComments.has(comment))
				return 0;
			if (this._noLineTerminator && HAS_NEWLINE_OR_BlOCK_COMMENT_END.test(comment.value)) {
				return 2;
			}
			if (nextToken && this.tokenMap) {
				const commentTok = this.tokenMap.find(this._currentNode, (token) => token.value === comment.value);
				if (commentTok && commentTok.start > nextToken.start) {
					return 2;
				}
			}
			this._printedComments.add(comment);
			if (!this.format.shouldPrintComment(comment.value)) {
				return 0;
			}
			return 1;
		}

		_printComment(comment, skipNewLines) {
			const noLineTerminator = this._noLineTerminator;
			const isBlockComment = comment.type === "CommentBlock";
			const printNewLines = isBlockComment && skipNewLines !== 1 && !this._noLineTerminator;
			if (printNewLines && this._buf.hasContent() && skipNewLines !== 2) {
				this.newline(1);
			}
			const lastCharCode = this.getLastChar();
			if (lastCharCode !== 91 && lastCharCode !== 123 && lastCharCode !== 40) {
				this.space();
			}
			let val;
			if (isBlockComment) {
				val = `/*${comment.value}*/`;
				if (this.format.indent.adjustMultilineComment) {
					var _comment$loc;
					const offset = (_comment$loc = comment.loc) == null ? void 0 : _comment$loc.start.column;
					if (offset) {
						const newlineRegex = new RegExp("\\n\\s{1," + offset + "}", "g");
						val = val.replace(newlineRegex, "\n");
					}
					if (this.format.concise) {
						val = val.replace(/\n(?!$)/g, `
`);
					} else {
						let indentSize = this.format.retainLines ? 0 : this._buf.getCurrentColumn();
						if (this._shouldIndent(47) || this.format.retainLines) {
							indentSize += this._getIndent();
						}
						val = val.replace(/\n(?!$)/g, `
${" ".repeat(indentSize)}`);
					}
				}
			} else if (!noLineTerminator) {
				val = `//${comment.value}`;
			} else {
				val = `/*${comment.value}*/`;
			}
			if (this._endsWithDiv)
				this._space();
			if (this.tokenMap) {
				const {
					_printSemicolonBeforeNextToken,
					_printSemicolonBeforeNextNode
				} = this;
				this._printSemicolonBeforeNextToken = -1;
				this._printSemicolonBeforeNextNode = -1;
				this.source("start", comment.loc);
				this._append(val, isBlockComment);
				this._printSemicolonBeforeNextNode = _printSemicolonBeforeNextNode;
				this._printSemicolonBeforeNextToken = _printSemicolonBeforeNextToken;
			} else {
				this.source("start", comment.loc);
				this._append(val, isBlockComment);
			}
			if (!isBlockComment && !noLineTerminator) {
				this.newline(1, true);
			}
			if (printNewLines && skipNewLines !== 3) {
				this.newline(1);
			}
		}

		_printComments(type, comments, node2, parent, lineOffset = 0, nextToken) {
			const nodeLoc = node2.loc;
			const len = comments.length;
			let hasLoc = !!nodeLoc;
			const nodeStartLine = hasLoc ? nodeLoc.start.line : 0;
			const nodeEndLine = hasLoc ? nodeLoc.end.line : 0;
			let lastLine = 0;
			let leadingCommentNewline = 0;
			const maybeNewline = this._noLineTerminator ? function () {
			} : this.newline.bind(this);
			for (let i = 0; i < len; i++) {
				const comment = comments[i];
				const shouldPrint = this._shouldPrintComment(comment, nextToken);
				if (shouldPrint === 2) {
					hasLoc = false;
					break;
				}
				if (hasLoc && comment.loc && shouldPrint === 1) {
					const commentStartLine = comment.loc.start.line;
					const commentEndLine = comment.loc.end.line;
					if (type === 0) {
						let offset = 0;
						if (i === 0) {
							if (this._buf.hasContent() && (comment.type === "CommentLine" || commentStartLine !== commentEndLine)) {
								offset = leadingCommentNewline = 1;
							}
						} else {
							offset = commentStartLine - lastLine;
						}
						lastLine = commentEndLine;
						maybeNewline(offset);
						this._printComment(comment, 1);
						if (i + 1 === len) {
							maybeNewline(Math.max(nodeStartLine - lastLine, leadingCommentNewline));
							lastLine = nodeStartLine;
						}
					} else if (type === 1) {
						const offset = commentStartLine - (i === 0 ? nodeStartLine : lastLine);
						lastLine = commentEndLine;
						maybeNewline(offset);
						this._printComment(comment, 1);
						if (i + 1 === len) {
							maybeNewline(Math.min(1, nodeEndLine - lastLine));
							lastLine = nodeEndLine;
						}
					} else {
						const offset = commentStartLine - (i === 0 ? nodeEndLine - lineOffset : lastLine);
						lastLine = commentEndLine;
						maybeNewline(offset);
						this._printComment(comment, 1);
					}
				} else {
					hasLoc = false;
					if (shouldPrint !== 1) {
						continue;
					}
					if (len === 1) {
						const singleLine = comment.loc ? comment.loc.start.line === comment.loc.end.line : !HAS_NEWLINE.test(comment.value);
						const shouldSkipNewline = singleLine && !isStatement(node2) && !isClassBody(parent) && !isTSInterfaceBody(parent) && !isTSEnumMember(node2);
						if (type === 0) {
							this._printComment(comment, shouldSkipNewline && node2.type !== "ObjectExpression" || singleLine && isFunction(parent, {
								body: node2
							}) ? 1 : 0);
						} else if (shouldSkipNewline && type === 2) {
							this._printComment(comment, 1);
						} else {
							this._printComment(comment, 0);
						}
					} else if (type === 1 && !(node2.type === "ObjectExpression" && node2.properties.length > 1) && node2.type !== "ClassBody" && node2.type !== "TSInterfaceBody") {
						this._printComment(comment, i === 0 ? 2 : i === len - 1 ? 3 : 0);
					} else {
						this._printComment(comment, 0);
					}
				}
			}
			if (type === 2 && hasLoc && lastLine) {
				this._lastCommentLine = lastLine;
			}
		}
	}

	Object.assign(Printer.prototype, generatorFunctions);
	{
		(0, _deprecated.addDeprecatedGenerators)(Printer);
	}
	printer.default = Printer;

	function commaSeparator(occurrenceCount, last) {
		this.token(",", false, occurrenceCount);
		if (!last)
			this.space();
	}

	Object.defineProperty(lib$3, "__esModule", {
		value: true
	});
	var _default = lib$3.default = generate;
	var _sourceMap = sourceMap;
	var _printer = printer;

	function normalizeOptions(code, opts, ast) {
		if (opts.experimental_preserveFormat) {
			if (typeof code !== "string") {
				throw new Error("`experimental_preserveFormat` requires the original `code` to be passed to @babel/generator as a string");
			}
			if (!opts.retainLines) {
				throw new Error("`experimental_preserveFormat` requires `retainLines` to be set to `true`");
			}
			if (opts.compact && opts.compact !== "auto") {
				throw new Error("`experimental_preserveFormat` is not compatible with the `compact` option");
			}
			if (opts.minified) {
				throw new Error("`experimental_preserveFormat` is not compatible with the `minified` option");
			}
			if (opts.jsescOption) {
				throw new Error("`experimental_preserveFormat` is not compatible with the `jsescOption` option");
			}
			if (!Array.isArray(ast.tokens)) {
				throw new Error("`experimental_preserveFormat` requires the AST to have attatched the token of the input code. Make sure to enable the `tokens: true` parser option.");
			}
		}
		const format = {
			auxiliaryCommentBefore: opts.auxiliaryCommentBefore,
			auxiliaryCommentAfter: opts.auxiliaryCommentAfter,
			shouldPrintComment: opts.shouldPrintComment,
			preserveFormat: opts.experimental_preserveFormat,
			retainLines: opts.retainLines,
			retainFunctionParens: opts.retainFunctionParens,
			comments: opts.comments == null || opts.comments,
			compact: opts.compact,
			minified: opts.minified,
			concise: opts.concise,
			indent: {
				adjustMultilineComment: true,
				style: "  "
			},
			jsescOption: Object.assign({
				quotes: "double",
				wrap: true,
				minimal: false
			}, opts.jsescOption),
			topicToken: opts.topicToken,
			importAttributesKeyword: opts.importAttributesKeyword
		};
		{
			var _opts$recordAndTupleS;
			format.decoratorsBeforeExport = opts.decoratorsBeforeExport;
			format.jsescOption.json = opts.jsonCompatibleStrings;
			format.recordAndTupleSyntaxType = (_opts$recordAndTupleS = opts.recordAndTupleSyntaxType) != null ? _opts$recordAndTupleS : "hash";
		}
		if (format.minified) {
			format.compact = true;
			format.shouldPrintComment = format.shouldPrintComment || (() => format.comments);
		} else {
			format.shouldPrintComment = format.shouldPrintComment || ((value) => format.comments || value.includes("@license") || value.includes("@preserve"));
		}
		if (format.compact === "auto") {
			format.compact = typeof code === "string" && code.length > 5e5;
			if (format.compact) {
				console.error(`[BABEL] Note: The code generator has deoptimised the styling of ${opts.filename} as it exceeds the max of ${"500KB"}.`);
			}
		}
		if (format.compact || format.preserveFormat) {
			format.indent.adjustMultilineComment = false;
		}
		const {
			auxiliaryCommentBefore,
			auxiliaryCommentAfter,
			shouldPrintComment
		} = format;
		if (auxiliaryCommentBefore && !shouldPrintComment(auxiliaryCommentBefore)) {
			format.auxiliaryCommentBefore = void 0;
		}
		if (auxiliaryCommentAfter && !shouldPrintComment(auxiliaryCommentAfter)) {
			format.auxiliaryCommentAfter = void 0;
		}
		return format;
	}

	{
		lib$3.CodeGenerator = class CodeGenerator {
			constructor(ast, opts = {}, code) {
				this._ast = void 0;
				this._format = void 0;
				this._map = void 0;
				this._ast = ast;
				this._format = normalizeOptions(code, opts, ast);
				this._map = opts.sourceMaps ? new _sourceMap.default(opts, code) : null;
			}

			generate() {
				const printer2 = new _printer.default(this._format, this._map);
				return printer2.generate(this._ast);
			}
		};
	}

	function generate(ast, opts = {}, code) {
		const format = normalizeOptions(code, opts, ast);
		const map = opts.sourceMaps ? new _sourceMap.default(opts, code) : null;
		const printer2 = new _printer.default(format, map, ast.tokens, typeof code === "string" ? code : null);
		return printer2.generate(ast);
	}

	window.Babel.generator = generate;

	const BABEL_CUSTOM_PLUGIN = ({
		types: {
			callExpression,
			memberExpression,
			identifier,
			stringLiteral,
			templateLiteral,
			templateElement,
			isOptionalMemberExpression
		}
	}) => {
		/* window.Babel 不是 babel */

		const getObjAndParamsChian = node => {
			const OPTIONAL_CHAIN_REGEX = /\?\./g;
			let { code: originalCode } = generate(node);
			/* b[prop || 1] 的形式要 分成 b、[prop || 1] 两部分 */
			// 先替换可选链操作符，然后使用正则匹配方括号内的内容
			let originalCodeArray =
				originalCode
					.replace(OPTIONAL_CHAIN_REGEX, ".")
					.match(/[^\.\[\]]+|\[[^\]]+\]/g) || [];

			originalCodeArray = originalCodeArray.map(i => {
				// 提取数组访问中的内容
				const match = i.match(/\[([^\]]+)\]/);
				if (match) {
					// 判断是否为纯数字
					const content = match[1];
					if (/^\d+$/.test(content)) {
						return content;
					} else {
						// 非数字返回模板字符串可用形式
						return ["${", content, "}"].join("");
					}
				}
				return i;
			});

			const FIRST_OBJ = originalCodeArray.shift();
			let CHAIN_PATH = originalCodeArray.join(".");

			try {
				// 检查是否包含模板字符串语法
				if (CHAIN_PATH.includes("${")) {
					const parts = CHAIN_PATH.split(/(\$\{[^}]+\})/);
					const quasis = parts
						.map((part, i) => {
							if (!part.startsWith("${")) {
								return templateElement(
									{
										raw: part,
										cooked: part
									},
									i === parts.length - 1
								);
							}
							return null;
						})
						.filter(Boolean);

					const expressions = parts
						.filter(part => part.startsWith("${"))
						.map(part => {
							const exp = part.slice(2, -1);
							return identifier(exp);
						});

					CHAIN_PATH = templateLiteral(quasis, expressions);
				} else {
					CHAIN_PATH = stringLiteral(CHAIN_PATH);
				}
			} catch (error) {
				CHAIN_PATH = stringLiteral(CHAIN_PATH);
				console.error(error);
			}

			return {
				FIRST_OBJ,
				CHAIN_PATH
			};
		};



		return {
			visitor: {
				OptionalMemberExpression(path) {
					// 提取对象路径数组
					const { FIRST_OBJ, CHAIN_PATH } = getObjAndParamsChian(
						path.node
					);
					console.log("OptionalMemberExpression", CHAIN_PATH);

					const newExpression = callExpression(
						memberExpression(identifier("_"), identifier("$val")),
						[identifier(FIRST_OBJ), CHAIN_PATH]
					);

					path.replaceWith(newExpression);
				},
				OptionalCallExpression(path) {
					console.log("Processing OptionalCallExpression");
					/* function调用 */
					const { callee } = path.node;
					if (isOptionalMemberExpression(callee)) {
						const { FIRST_OBJ, CHAIN_PATH } =
							getObjAndParamsChian(callee);
						const newExpression = callExpression(
							callExpression(
								memberExpression(
									identifier("_"),
									identifier("$callFn")
								),
								[identifier(FIRST_OBJ), CHAIN_PATH]
							),
							path.node.arguments || []
						);

						path.replaceWith(newExpression);
					}
				}
			}
		};
	};
	// 注册自定义插件
	Babel.registerPlugin("custom-plugin", BABEL_CUSTOM_PLUGIN);


	function babelTransformCode(scritpSourceCode) {
		try {
			const { code: es5Code } = Babel.transform(scritpSourceCode, {
				plugins: ["custom-plugin"]
			});
			scritpSourceCode = es5Code;
		} catch (error) {
			console.error(error);
		}

		return scritpSourceCode;
	}

	window.Babel.babelTransformCode = babelTransformCode;
})();
