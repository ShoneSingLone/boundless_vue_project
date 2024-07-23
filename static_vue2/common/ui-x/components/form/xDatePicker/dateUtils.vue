<script lang="ts">
export default async function ({ PRIVATE_GLOBAL }) {
	if (!PRIVATE_GLOBAL.dateUtils) {
		const fecha = (function () {
			"use strict";
			/**
			 * Parse or format dates
			 * @class fecha
			 */
			var fecha = {};
			var token = /d{1,4}|M{1,4}|yy(?:yy)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
			var twoDigits = "\\d\\d?";
			var threeDigits = "\\d{3}";
			var fourDigits = "\\d{4}";
			var word = "[^\\s]+";
			var literal = /\[([^]*?)\]/gm;
			var noop = function () {};

			function regexEscape(str) {
				return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
			}

			function shorten(arr, sLen) {
				var newArr = [];
				for (var i = 0, len = arr.length; i < len; i++) {
					newArr.push(arr[i].substr(0, sLen));
				}
				return newArr;
			}

			function monthUpdate(arrName) {
				return function (d, v, i18n) {
					var index = i18n[arrName].indexOf(
						v.charAt(0).toUpperCase() + v.substr(1).toLowerCase()
					);
					if (~index) {
						d.month = index;
					}
				};
			}

			function pad(val, len) {
				val = String(val);
				len = len || 2;
				while (val.length < len) {
					val = "0" + val;
				}
				return val;
			}

			var dayNames = [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			];
			var monthNames = [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			];
			var monthNamesShort = shorten(monthNames, 3);
			var dayNamesShort = shorten(dayNames, 3);
			fecha.i18n = {
				dayNamesShort: dayNamesShort,
				dayNames: dayNames,
				monthNamesShort: monthNamesShort,
				monthNames: monthNames,
				amPm: ["am", "pm"],
				DoFn: function DoFn(D) {
					return (
						D +
						["th", "st", "nd", "rd"][D % 10 > 3 ? 0 : ((D - (D % 10) !== 10) * D) % 10]
					);
				}
			};

			var formatFlags = {
				D: function (dateObj) {
					return dateObj.getDay();
				},
				DD: function (dateObj) {
					return pad(dateObj.getDay());
				},
				Do: function (dateObj, i18n) {
					return i18n.DoFn(dateObj.getDate());
				},
				d: function (dateObj) {
					return dateObj.getDate();
				},
				dd: function (dateObj) {
					return pad(dateObj.getDate());
				},
				ddd: function (dateObj, i18n) {
					return i18n.dayNamesShort[dateObj.getDay()];
				},
				dddd: function (dateObj, i18n) {
					return i18n.dayNames[dateObj.getDay()];
				},
				M: function (dateObj) {
					return dateObj.getMonth() + 1;
				},
				MM: function (dateObj) {
					return pad(dateObj.getMonth() + 1);
				},
				MMM: function (dateObj, i18n) {
					return i18n.monthNamesShort[dateObj.getMonth()];
				},
				MMMM: function (dateObj, i18n) {
					return i18n.monthNames[dateObj.getMonth()];
				},
				yy: function (dateObj) {
					return pad(String(dateObj.getFullYear()), 4).substr(2);
				},
				yyyy: function (dateObj) {
					return pad(dateObj.getFullYear(), 4);
				},
				h: function (dateObj) {
					return dateObj.getHours() % 12 || 12;
				},
				hh: function (dateObj) {
					return pad(dateObj.getHours() % 12 || 12);
				},
				H: function (dateObj) {
					return dateObj.getHours();
				},
				HH: function (dateObj) {
					return pad(dateObj.getHours());
				},
				m: function (dateObj) {
					return dateObj.getMinutes();
				},
				mm: function (dateObj) {
					return pad(dateObj.getMinutes());
				},
				s: function (dateObj) {
					return dateObj.getSeconds();
				},
				ss: function (dateObj) {
					return pad(dateObj.getSeconds());
				},
				S: function (dateObj) {
					return Math.round(dateObj.getMilliseconds() / 100);
				},
				SS: function (dateObj) {
					return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
				},
				SSS: function (dateObj) {
					return pad(dateObj.getMilliseconds(), 3);
				},
				a: function (dateObj, i18n) {
					return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
				},
				A: function (dateObj, i18n) {
					return dateObj.getHours() < 12
						? i18n.amPm[0].toUpperCase()
						: i18n.amPm[1].toUpperCase();
				},
				ZZ: function (dateObj) {
					var o = dateObj.getTimezoneOffset();
					return (
						(o > 0 ? "-" : "+") +
						pad(Math.floor(Math.abs(o) / 60) * 100 + (Math.abs(o) % 60), 4)
					);
				}
			};

			var parseFlags = {
				d: [
					twoDigits,
					function (d, v) {
						d.day = v;
					}
				],
				Do: [
					twoDigits + word,
					function (d, v) {
						d.day = parseInt(v, 10);
					}
				],
				M: [
					twoDigits,
					function (d, v) {
						d.month = v - 1;
					}
				],
				yy: [
					twoDigits,
					function (d, v) {
						var da = new Date(),
							cent = +("" + da.getFullYear()).substr(0, 2);
						d.year = "" + (v > 68 ? cent - 1 : cent) + v;
					}
				],
				h: [
					twoDigits,
					function (d, v) {
						d.hour = v;
					}
				],
				m: [
					twoDigits,
					function (d, v) {
						d.minute = v;
					}
				],
				s: [
					twoDigits,
					function (d, v) {
						d.second = v;
					}
				],
				yyyy: [
					fourDigits,
					function (d, v) {
						d.year = v;
					}
				],
				S: [
					"\\d",
					function (d, v) {
						d.millisecond = v * 100;
					}
				],
				SS: [
					"\\d{2}",
					function (d, v) {
						d.millisecond = v * 10;
					}
				],
				SSS: [
					threeDigits,
					function (d, v) {
						d.millisecond = v;
					}
				],
				D: [twoDigits, noop],
				ddd: [word, noop],
				MMM: [word, monthUpdate("monthNamesShort")],
				MMMM: [word, monthUpdate("monthNames")],
				a: [
					word,
					function (d, v, i18n) {
						var val = v.toLowerCase();
						if (val === i18n.amPm[0]) {
							d.isPm = false;
						} else if (val === i18n.amPm[1]) {
							d.isPm = true;
						}
					}
				],
				ZZ: [
					"[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z",
					function (d, v) {
						var parts = (v + "").match(/([+-]|\d\d)/gi),
							minutes;

						if (parts) {
							minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
							d.timezoneOffset = parts[0] === "+" ? minutes : -minutes;
						}
					}
				]
			};
			parseFlags.dd = parseFlags.d;
			parseFlags.dddd = parseFlags.ddd;
			parseFlags.DD = parseFlags.D;
			parseFlags.mm = parseFlags.m;
			parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
			parseFlags.MM = parseFlags.M;
			parseFlags.ss = parseFlags.s;
			parseFlags.A = parseFlags.a;

			// Some common format strings
			fecha.masks = {
				default: "ddd MMM dd yyyy HH:mm:ss",
				shortDate: "M/D/yy",
				mediumDate: "MMM d, yyyy",
				longDate: "MMMM d, yyyy",
				fullDate: "dddd, MMMM d, yyyy",
				shortTime: "HH:mm",
				mediumTime: "HH:mm:ss",
				longTime: "HH:mm:ss.SSS"
			};

			/***
			 * Format a date
			 * @method format
			 * @param {Date|number} dateObj
			 * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
			 */
			fecha.format = function (dateObj, mask, i18nSettings) {
				var i18n = i18nSettings || fecha.i18n;

				if (typeof dateObj === "number") {
					dateObj = new Date(dateObj);
				}

				if (
					Object.prototype.toString.call(dateObj) !== "[object Date]" ||
					isNaN(dateObj.getTime())
				) {
					throw new Error("Invalid Date in fecha.format");
				}

				mask = fecha.masks[mask] || mask || fecha.masks["default"];

				var literals = [];

				// Make literals inactive by replacing them with ??
				mask = mask.replace(literal, function ($0, $1) {
					literals.push($1);
					return "@@@";
				});
				// Apply formatting rules
				mask = mask.replace(token, function ($0) {
					return $0 in formatFlags
						? formatFlags[$0](dateObj, i18n)
						: $0.slice(1, $0.length - 1);
				});
				// Inline literal values back into the formatted value
				return mask.replace(/@@@/g, function () {
					return literals.shift();
				});
			};

			/**
			 * Parse a date string into an object, changes - into /
			 * @method parse
			 * @param {string} dateStr Date string
			 * @param {string} format Date parse format
			 * @returns {Date|boolean}
			 */
			fecha.parse = function (dateStr, format, i18nSettings) {
				var i18n = i18nSettings || fecha.i18n;

				if (typeof format !== "string") {
					throw new Error("Invalid format in fecha.parse");
				}

				format = fecha.masks[format] || format;

				// Avoid regular expression denial of service, fail early for really long strings
				// https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
				if (dateStr.length > 1000) {
					return null;
				}

				var dateInfo = {};
				var parseInfo = [];
				var literals = [];
				format = format.replace(literal, function ($0, $1) {
					literals.push($1);
					return "@@@";
				});
				var newFormat = regexEscape(format).replace(token, function ($0) {
					if (parseFlags[$0]) {
						var info = parseFlags[$0];
						parseInfo.push(info[1]);
						return "(" + info[0] + ")";
					}

					return $0;
				});
				newFormat = newFormat.replace(/@@@/g, function () {
					return literals.shift();
				});
				var matches = dateStr.match(new RegExp(newFormat, "i"));
				if (!matches) {
					return null;
				}

				for (var i = 1; i < matches.length; i++) {
					parseInfo[i - 1](dateInfo, matches[i], i18n);
				}

				var today = new Date();
				if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
					dateInfo.hour = +dateInfo.hour + 12;
				} else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
					dateInfo.hour = 0;
				}

				var date;
				if (dateInfo.timezoneOffset != null) {
					dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
					date = new Date(
						Date.UTC(
							dateInfo.year || today.getFullYear(),
							dateInfo.month || 0,
							dateInfo.day || 1,
							dateInfo.hour || 0,
							dateInfo.minute || 0,
							dateInfo.second || 0,
							dateInfo.millisecond || 0
						)
					);
				} else {
					date = new Date(
						dateInfo.year || today.getFullYear(),
						dateInfo.month || 0,
						dateInfo.day || 1,
						dateInfo.hour || 0,
						dateInfo.minute || 0,
						dateInfo.second || 0,
						dateInfo.millisecond || 0
					);
				}
				return date;
			};
			return fecha;
		})();

		const weeks = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
		const months = [
			"jan",
			"feb",
			"mar",
			"apr",
			"may",
			"jun",
			"jul",
			"aug",
			"sep",
			"oct",
			"nov",
			"dec"
		];

		const newArray = function (start, end) {
			let result = [];
			for (let i = start; i <= end; i++) {
				result.push(i);
			}
			return result;
		};

		const getI18nSettings = () => {
			return {
				dayNamesShort: weeks.map(week => i18n(`el.datepicker.weeks.${week}`)),
				dayNames: weeks.map(week => i18n(`el.datepicker.weeks.${week}`)),
				monthNamesShort: months.map(month => i18n(`el.datepicker.months.${month}`)),
				monthNames: months.map((month, index) =>
					i18n(`el.datepicker.month${Number(index) + 1}`)
				),
				amPm: ["am", "pm"]
			};
		};

		const toDate = function (date) {
			return isDate(date) ? new Date(date) : null;
		};

		const isDate = function (date) {
			if (date === null || date === undefined) return false;
			if (isNaN(new Date(date).getTime())) return false;
			if (Array.isArray(date)) return false; // deal with `new Date([ new Date() ]) -> new Date()`
			return true;
		};

		const isDateObject = function (val) {
			return val instanceof Date;
		};

		const formatDate = function (date, format) {
			date = toDate(date);
			if (!date) return "";
			return fecha.format(date, format || "yyyy-MM-dd", getI18nSettings());
		};

		const parseDate = function (string, format) {
			return fecha.parse(string, format || "yyyy-MM-dd", getI18nSettings());
		};

		const getDayCountOfMonth = function (year, month) {
			if (isNaN(+month)) return 31;

			return new Date(year, +month + 1, 0).getDate();
		};

		const getDayCountOfYear = function (year) {
			const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
			return isLeapYear ? 366 : 365;
		};

		const getFirstDayOfMonth = function (date) {
			const temp = new Date(date.getTime());
			temp.setDate(1);
			return temp.getDay();
		};

		// see: https://stackoverflow.com/questions/3674539/incrementing-a-date-in-javascript
		// {prev, next} Date should work for Daylight Saving Time
		// Adding 24 * 60 * 60 * 1000 does not work in the above scenario
		const prevDate = function (date, amount = 1) {
			return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount);
		};

		const nextDate = function (date, amount = 1) {
			return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
		};

		const getStartDateOfMonth = function (year, month) {
			const result = new Date(year, month, 1);
			const day = result.getDay();

			if (day === 0) {
				return prevDate(result, 7);
			} else {
				return prevDate(result, day);
			}
		};

		const getWeekNumber = function (src) {
			if (!isDate(src)) return null;
			const date = new Date(src.getTime());
			date.setHours(0, 0, 0, 0);
			// Thursday in current week decides the year.
			date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
			// January 4 is always in week 1.
			const week1 = new Date(date.getFullYear(), 0, 4);
			// Adjust to Thursday in week 1 and count number of weeks from date to week 1.
			// Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
			return (
				1 +
				Math.round(
					((date.getTime() - week1.getTime()) / 86400000 -
						3 +
						((week1.getDay() + 6) % 7)) /
						7
				)
			);
		};

		const getRangeHours = function (ranges) {
			const hours = [];
			let disabledHours = [];

			(ranges || []).forEach(range => {
				const value = range.map(date => date.getHours());

				disabledHours = disabledHours.concat(newArray(value[0], value[1]));
			});

			if (disabledHours.length) {
				for (let i = 0; i < 24; i++) {
					hours[i] = disabledHours.indexOf(i) === -1;
				}
			} else {
				for (let i = 0; i < 24; i++) {
					hours[i] = false;
				}
			}

			return hours;
		};

		const getPrevMonthLastDays = (date, amount) => {
			if (amount <= 0) return [];
			const temp = new Date(date.getTime());
			temp.setDate(0);
			const lastDay = temp.getDate();
			return range(amount).map((_, index) => lastDay - (amount - index - 1));
		};

		const getMonthDays = date => {
			const temp = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			const days = temp.getDate();
			return range(days).map((_, index) => index + 1);
		};

		function setRangeData(arr, start, end, value) {
			for (let i = start; i < end; i++) {
				arr[i] = value;
			}
		}

		const getRangeMinutes = function (ranges, hour) {
			const minutes = new Array(60);

			if (ranges.length > 0) {
				ranges.forEach(range => {
					const start = range[0];
					const end = range[1];
					const startHour = start.getHours();
					const startMinute = start.getMinutes();
					const endHour = end.getHours();
					const endMinute = end.getMinutes();
					if (startHour === hour && endHour !== hour) {
						setRangeData(minutes, startMinute, 60, true);
					} else if (startHour === hour && endHour === hour) {
						setRangeData(minutes, startMinute, endMinute + 1, true);
					} else if (startHour !== hour && endHour === hour) {
						setRangeData(minutes, 0, endMinute + 1, true);
					} else if (startHour < hour && endHour > hour) {
						setRangeData(minutes, 0, 60, true);
					}
				});
			} else {
				setRangeData(minutes, 0, 60, true);
			}
			return minutes;
		};

		const range = function (n) {
			// see https://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
			return Array.apply(null, { length: n }).map((_, n) => n);
		};

		const modifyDate = function (date, y, m, d) {
			return new Date(
				y,
				m,
				d,
				date.getHours(),
				date.getMinutes(),
				date.getSeconds(),
				date.getMilliseconds()
			);
		};

		const modifyTime = function (date, h, m, s) {
			return new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate(),
				h,
				m,
				s,
				date.getMilliseconds()
			);
		};

		const modifyWithTimeString = (date, time) => {
			if (date == null || !time) {
				return date;
			}
			time = parseDate(time, "HH:mm:ss");
			return modifyTime(date, time.getHours(), time.getMinutes(), time.getSeconds());
		};

		const clearTime = function (date) {
			return new Date(date.getFullYear(), date.getMonth(), date.getDate());
		};

		const clearMilliseconds = function (date) {
			return new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate(),
				date.getHours(),
				date.getMinutes(),
				date.getSeconds(),
				0
			);
		};

		const limitTimeRange = function (date, ranges, format = "HH:mm:ss") {
			// TODO: refactory a more elegant solution
			if (ranges.length === 0) return date;
			const normalizeDate = date => fecha.parse(fecha.format(date, format), format);
			const ndate = normalizeDate(date);
			const nranges = ranges.map(range => range.map(normalizeDate));
			if (nranges.some(nrange => ndate >= nrange[0] && ndate <= nrange[1])) return date;

			let minDate = nranges[0][0];
			let maxDate = nranges[0][0];

			nranges.forEach(nrange => {
				minDate = new Date(Math.min(nrange[0], minDate));
				maxDate = new Date(Math.max(nrange[1], minDate));
			});

			const ret = ndate < minDate ? minDate : maxDate;
			// preserve Year/Month/Date
			return modifyDate(ret, date.getFullYear(), date.getMonth(), date.getDate());
		};

		const timeWithinRange = function (date, selectableRange, format) {
			const limitedDate = limitTimeRange(date, selectableRange, format);
			return limitedDate.getTime() === date.getTime();
		};

		const changeYearMonthAndClampDate = function (date, year, month) {
			// clamp date to the number of days in `year`, `month`
			// eg: (2010-1-31, 2010, 2) => 2010-2-28
			const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month));
			return modifyDate(date, year, month, monthDate);
		};

		const prevMonth = function (date) {
			const year = date.getFullYear();
			const month = date.getMonth();
			return month === 0
				? changeYearMonthAndClampDate(date, year - 1, 11)
				: changeYearMonthAndClampDate(date, year, month - 1);
		};

		const nextMonth = function (date) {
			const year = date.getFullYear();
			const month = date.getMonth();
			return month === 11
				? changeYearMonthAndClampDate(date, year + 1, 0)
				: changeYearMonthAndClampDate(date, year, month + 1);
		};

		const prevYear = function (date, amount = 1) {
			const year = date.getFullYear();
			const month = date.getMonth();
			return changeYearMonthAndClampDate(date, year - amount, month);
		};

		const nextYear = function (date, amount = 1) {
			const year = date.getFullYear();
			const month = date.getMonth();
			return changeYearMonthAndClampDate(date, year + amount, month);
		};

		const extractDateFormat = function (format) {
			return format
				.replace(/\W?m{1,2}|\W?ZZ/g, "")
				.replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, "")
				.trim();
		};

		const extractTimeFormat = function (format) {
			return format.replace(/\W?D{1,2}|\W?Do|\W?d{1,4}|\W?M{1,4}|\W?y{2,4}/g, "").trim();
		};

		const validateRangeInOneMonth = function (start, end) {
			return start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
		};
		PRIVATE_GLOBAL.dateUtils = {
			fecha,
			getI18nSettings,
			toDate,
			isDate,
			isDateObject,
			formatDate,
			parseDate,
			getDayCountOfMonth,
			getDayCountOfYear,
			getFirstDayOfMonth,
			prevDate,
			nextDate,
			getStartDateOfMonth,
			getWeekNumber,
			getRangeHours,
			getPrevMonthLastDays,
			getMonthDays,
			getRangeMinutes,
			range,
			modifyDate,
			modifyTime,
			modifyWithTimeString,
			clearTime,
			clearMilliseconds,
			limitTimeRange,
			timeWithinRange,
			changeYearMonthAndClampDate,
			prevMonth,
			nextMonth,
			prevYear,
			nextYear,
			extractDateFormat,
			extractTimeFormat,
			validateRangeInOneMonth
		};
	}
	return PRIVATE_GLOBAL.dateUtils;
}
</script>
