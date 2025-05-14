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
<style lang="less">
.el-date-table td,
.el-date-table td div {
	height: 30px;
	-webkit-box-sizing: border-box;
}
.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
	background-color: #f2f6fc;
}
.el-date-table {
	font-size: 12px;
	-ms-user-select: none;
	user-select: none;
}

.el-date-table.is-week-mode .el-date-table__row:hover td.available:hover {
	color: #606266;
}

.el-date-table.is-week-mode .el-date-table__row:hover td:first-child div {
	margin-left: 5px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
}

.el-date-table.is-week-mode .el-date-table__row:hover td:last-child div {
	margin-right: 5px;
	border-top-right-radius: 15px;
	border-bottom-right-radius: 15px;
}

.el-date-table td {
	width: 32px;
	padding: 4px 0;
	box-sizing: border-box;
	text-align: center;
	cursor: pointer;
	position: relative;
}

.el-date-table td div {
	padding: 3px 0;
	box-sizing: border-box;
}

.el-date-table td span {
	width: 24px;
	height: 24px;
	display: block;
	margin: 0 auto;
	line-height: 24px;
	position: absolute;
	left: 50%;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
	border-radius: 50%;
}

.el-date-table td.next-month,
.el-date-table td.prev-month {
	color: var(--el-text-color-disabled);
}

.el-date-table td.today {
	position: relative;
}

.el-date-table td.today span {
	color: var(--el-color-primary);
	font-weight: 700;
}

.el-date-table td.today.end-date span,
.el-date-table td.today.start-date span {
	color: #fff;
}

.el-date-table td.available:hover {
	color: var(--el-color-primary);
}

.el-date-table td.current:not(.disabled) span {
	color: #fff;
	background-color: var(--el-color-primary);
}

.el-date-table td.end-date div,
.el-date-table td.start-date div {
	color: #fff;
}

.el-date-table td.end-date span,
.el-date-table td.start-date span {
	background-color: var(--el-color-primary);
}

.el-date-table td.start-date div {
	margin-left: 5px;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
}

.el-date-table td.end-date div {
	margin-right: 5px;
	border-top-right-radius: 15px;
	border-bottom-right-radius: 15px;
}

.el-date-table td.disabled div {
	background-color: var(--el-fill-color-light);
	opacity: 1;
	cursor: not-allowed;
	color: var(--el-text-color-disabled);
}

.el-date-table td.selected div {
	margin-left: 5px;
	margin-right: 5px;
	background-color: #f2f6fc;
	border-radius: 15px;
}

.el-date-table td.selected div:hover {
	background-color: #f2f6fc;
}

.el-date-table td.selected span {
	background-color: var(--el-color-primary);
	color: #fff;
	border-radius: 15px;
}

.el-date-table td.week {
	font-size: 80%;
	color: #606266;
}

.el-month-table,
.el-year-table {
	font-size: 12px;
	border-collapse: collapse;
}

.el-date-table th {
	padding: 5px;
	color: #606266;
	font-weight: 400;
	border-bottom: solid 1px var(--el-border-color-lighter);
}

.el-month-table {
	margin: -1px;
}

.el-month-table td {
	text-align: center;
	padding: 8px 0;
	cursor: pointer;
}

.el-month-table td div {
	height: 48px;
	padding: 6px 0;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-month-table td.today .cell {
	color: var(--el-color-primary);
	font-weight: 700;
}

.el-month-table td.today.end-date .cell,
.el-month-table td.today.start-date .cell {
	color: #fff;
}

.el-month-table td.disabled .cell {
	background-color: var(--el-fill-color-light);
	cursor: not-allowed;
	color: var(--el-text-color-disabled);
}

.el-month-table td.disabled .cell:hover {
	color: var(--el-text-color-disabled);
}

.el-month-table td .cell {
	width: 60px;
	height: 36px;
	display: block;
	line-height: 36px;
	color: #606266;
	margin: 0 auto;
	border-radius: 18px;
}

.el-month-table td .cell:hover {
	color: var(--el-color-primary);
}

.el-month-table td.in-range div,
.el-month-table td.in-range div:hover {
	background-color: #f2f6fc;
}

.el-month-table td.end-date div,
.el-month-table td.start-date div {
	color: #fff;
}

.el-month-table td.end-date .cell,
.el-month-table td.start-date .cell {
	color: #fff;
	background-color: var(--el-color-primary);
}

.el-month-table td.start-date div {
	border-top-left-radius: 24px;
	border-bottom-left-radius: 24px;
}

.el-month-table td.end-date div {
	border-top-right-radius: 24px;
	border-bottom-right-radius: 24px;
}

.el-month-table td.current:not(.disabled) .cell {
	color: var(--el-color-primary);
}

.el-year-table {
	margin: -1px;
}

.el-year-table .el-icon {
	color: var(--el-text-color-primary);
}

.el-year-table td {
	text-align: center;
	padding: 20px 3px;
	cursor: pointer;
}

.el-year-table td.today .cell {
	color: var(--el-color-primary);
	font-weight: 700;
}

.el-year-table td.disabled .cell {
	background-color: var(--el-fill-color-light);
	cursor: not-allowed;
	color: var(--el-text-color-disabled);
}

.el-year-table td.disabled .cell:hover {
	color: var(--el-text-color-disabled);
}

.el-year-table td .cell {
	width: 48px;
	height: var(--ui-height);
	display: block;
	line-height: var(--ui-height);
	color: #606266;
	margin: 0 auto;
}

.el-year-table td .cell:hover,
.el-year-table td.current:not(.disabled) .cell {
	color: var(--el-color-primary);
}

.el-date-range-picker {
	width: 646px;
}

.el-date-range-picker.has-sidebar {
	width: 756px;
}

.el-date-range-picker table {
	table-layout: fixed;
	width: 100%;
}

.el-date-range-picker .el-picker-panel__body {
	min-width: 513px;
}

.el-date-range-picker .el-picker-panel__content {
	margin: 0;
}

.el-date-range-picker__header {
	position: relative;
	text-align: center;
	height: 28px;
}

.el-date-range-picker__header [class*="arrow-left"] {
	float: left;
}

.el-date-range-picker__header [class*="arrow-right"] {
	float: right;
}

.el-date-range-picker__header div {
	font-size: 16px;
	font-weight: 500;
	margin-right: 50px;
}

.el-date-range-picker__content {
	float: left;
	width: 50%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	margin: 0;
	padding: var(--ui-one);
}

.el-date-range-picker__content.is-left {
	border-right: 1px solid #e4e4e4;
}

.el-date-range-picker__content .el-date-range-picker__header div {
	margin-left: 50px;
	margin-right: 50px;
}

.el-date-range-picker__editors-wrap {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	display: table-cell;
}

.el-date-range-picker__editors-wrap.is-right {
	text-align: right;
}

.el-date-range-picker__time-header {
	position: relative;
	border-bottom: 1px solid #e4e4e4;
	font-size: 12px;
	padding: 8px 5px 5px;
	display: table;
	width: 100%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-date-range-picker__time-header > .el-icon-arrow-right {
	font-size: 20px;
	vertical-align: middle;
	display: table-cell;
	color: var(--el-text-color-primary);
}

.el-date-range-picker__time-picker-wrap {
	position: relative;
	display: table-cell;
	padding: 0 5px;
}

.el-date-range-picker__time-picker-wrap .el-picker-panel {
	position: absolute;
	top: 13px;
	right: 0;
	z-index: 1;
	background: #fff;
}

.el-date-picker {
	width: 322px;
}

.el-date-picker.has-sidebar.has-time {
	width: 434px;
}

.el-date-picker.has-sidebar {
	width: 438px;
}

.el-date-picker.has-time .el-picker-panel__body-wrapper {
	position: relative;
}

.el-date-picker .el-picker-panel__content {
	width: 292px;
}

.el-date-picker table {
	table-layout: fixed;
	width: 100%;
}

.el-date-picker__editor-wrap {
	position: relative;
	display: table-cell;
	padding: 0 5px;
}

.el-date-picker__time-header {
	position: relative;
	border-bottom: 1px solid #e4e4e4;
	font-size: 12px;
	padding: 8px 5px 5px;
	display: table;
	width: 100%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

.el-date-picker__header {
	margin: 12px;
	text-align: center;
}

.el-date-picker__header--bordered {
	margin-bottom: 0;
	padding-bottom: 12px;
	border-bottom: solid 1px var(--el-border-color-lighter);
}

.el-date-picker__header--bordered + .el-picker-panel__content {
	margin-top: 0;
}

.el-date-picker__header-label {
	font-size: 16px;
	font-weight: 500;
	padding: 0 5px;
	line-height: 22px;
	text-align: center;
	cursor: pointer;
	color: #606266;
}

.el-date-picker__header-label.active,
.el-date-picker__header-label:hover {
	color: var(--el-color-primary);
}

.el-date-picker__prev-btn {
	float: left;
}

.el-date-picker__next-btn {
	float: right;
}

.el-date-picker__time-wrap {
	padding: 10px;
	text-align: center;
}

.el-date-picker__time-label {
	float: left;
	cursor: pointer;
	line-height: 30px;
	margin-left: 10px;
}

.time-select {
	margin: 5px 0;
	min-width: 0;
}

.time-select .el-picker-panel__content {
	max-height: 200px;
	margin: 0;
}

.time-select-item {
	padding: 8px 10px;
	font-size: 14px;
	line-height: 20px;
}

.time-select-item.selected:not(.disabled) {
	color: var(--el-color-primary);
	font-weight: 700;
}

.time-select-item.disabled {
	color: #e4e7ed;
	cursor: not-allowed;
}

.time-select-item:hover {
	background-color: var(--el-fill-color-light);
	font-weight: 700;
	cursor: pointer;
}

.el-date-editor {
	position: relative;
	display: inline-block;
	text-align: left;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
	width: 220px;
}

.el-date-editor--monthrange.el-input,
.el-date-editor--monthrange.el-input__inner {
	width: 300px;
}

.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
	width: 350px;
}

.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
	width: 400px;
}

.el-date-editor--dates .el-input__inner {
	text-overflow: ellipsis;
	white-space: nowrap;
}

.el-date-editor .el-icon-circle-close {
	cursor: pointer;
}

.el-date-editor .el-range__icon {
	font-size: 14px;
	margin-left: -5px;
	color: var(--el-text-color-disabled);
	float: left;
	line-height: var(--ui-height);
}

.el-date-editor .el-range-input,
.el-date-editor .el-range-separator {
	height: 100%;
	margin: 0;
	text-align: center;
	display: inline-block;
	font-size: 14px;
}

.el-date-editor .el-range-input {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	border: none;
	outline: 0;
	padding: 0;
	width: 39%;
	color: #606266;
}

.el-date-editor .el-range-input::-webkit-input-placeholder {
	color: var(--el-text-color-disabled);
}

.el-date-editor .el-range-input:-ms-input-placeholder {
	color: var(--el-text-color-disabled);
}

.el-date-editor .el-range-input::-ms-input-placeholder {
	color: var(--el-text-color-disabled);
}

.el-date-editor .el-range-input::placeholder {
	color: var(--el-text-color-disabled);
}

.el-date-editor .el-range-separator {
	padding: 0 5px;
	line-height: var(--ui-height);
	width: 5%;
	color: var(--el-text-color-primary);
}

.el-date-editor .el-range__close-icon {
	font-size: 14px;
	color: var(--el-text-color-disabled);
	width: 25px;
	display: inline-block;
	float: right;
	line-height: var(--ui-height);
}

.el-range-editor.el-input__inner {
	display: -webkit-inline-box;
	display: -ms-inline-flexbox;
	display: inline-flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	padding: 3px 10px;
}

.el-range-editor .el-range-input {
	line-height: 1;
}

.el-range-editor.is-active,
.el-range-editor.is-active:hover {
	border-color: var(--el-color-primary);
}

.el-range-editor--medium.el-input__inner {
	height: 36px;
}

.el-range-editor--medium .el-range-separator {
	line-height: 28px;
	font-size: 14px;
}

.el-range-editor--medium .el-range-input {
	font-size: 14px;
}

.el-range-editor--medium .el-range__close-icon,
.el-range-editor--medium .el-range__icon {
	line-height: 28px;
}

.el-range-editor--small.el-input__inner {
	height: var(--ui-height);
}

.el-range-editor--small .el-range-separator {
	line-height: 24px;
	font-size: 13px;
}

.el-range-editor--small .el-range-input {
	font-size: 13px;
}

.el-range-editor--small .el-range__close-icon,
.el-range-editor--small .el-range__icon {
	line-height: 24px;
}

.el-range-editor--mini.el-input__inner {
	height: 28px;
}

.el-range-editor--mini .el-range-separator {
	line-height: 20px;
	font-size: 12px;
}

.el-range-editor--mini .el-range-input {
	font-size: 12px;
}

.el-range-editor--mini .el-range__close-icon,
.el-range-editor--mini .el-range__icon {
	line-height: 20px;
}

.el-range-editor.is-disabled {
	background-color: var(--el-fill-color-light);
	border-color: #e4e7ed;
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
}

.el-range-editor.is-disabled:focus,
.el-range-editor.is-disabled:hover {
	border-color: #e4e7ed;
}

.el-range-editor.is-disabled input {
	background-color: var(--el-fill-color-light);
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
}

.el-range-editor.is-disabled input::-webkit-input-placeholder {
	color: var(--el-text-color-disabled);
}

.el-range-editor.is-disabled input:-ms-input-placeholder {
	color: var(--el-text-color-disabled);
}

.el-range-editor.is-disabled input::-ms-input-placeholder {
	color: var(--el-text-color-disabled);
}

.el-range-editor.is-disabled input::placeholder {
	color: var(--el-text-color-disabled);
}

.el-range-editor.is-disabled .el-range-separator {
	color: var(--el-text-color-disabled);
}

.el-picker-panel {
	color: #606266;
	border: 1px solid #e4e7ed;
	box-shadow: var(--normal-box-shadow);
	background: #fff;
	border-radius: var(--border-radius);
	line-height: 30px;
	margin: 5px 0;
}

.el-picker-panel__body-wrapper::after,
.el-picker-panel__body::after {
	content: "";
	display: table;
	clear: both;
}

.el-picker-panel__content {
	position: relative;
	margin: 15px;
}

.el-picker-panel__footer {
	border-top: 1px solid #e4e4e4;
	padding: 4px;
	text-align: right;
	background-color: #fff;
	position: relative;
	font-size: 0;
}

.el-picker-panel__shortcut {
	display: block;
	width: 100%;
	border: 0;
	background-color: transparent;
	line-height: 28px;
	font-size: 14px;
	color: #606266;
	padding-left: 12px;
	text-align: left;
	outline: 0;
	cursor: pointer;
}

.el-picker-panel__shortcut:hover {
	color: var(--el-color-primary);
}

.el-picker-panel__shortcut.active {
	background-color: #e6f1fe;
	color: var(--el-color-primary);
}

.el-picker-panel__btn {
	border: 1px solid #dcdcdc;
	color: #333;
	line-height: 24px;
	border-radius: var(--border-radius--mini);
	padding: 0 20px;
	cursor: pointer;
	background-color: transparent;
	outline: 0;
	font-size: 12px;
}

.el-picker-panel__btn[disabled] {
	color: #ccc;
	cursor: not-allowed;
}

.el-picker-panel__icon-btn {
	font-size: 12px;
	color: var(--el-text-color-primary);
	border: 0;
	background: 0 0;
	cursor: pointer;
	outline: 0;
	margin-top: 8px;
}

.el-picker-panel__icon-btn:hover {
	color: var(--el-color-primary);
}

.el-picker-panel__icon-btn.is-disabled {
	color: #bbb;
}

.el-picker-panel__icon-btn.is-disabled:hover {
	cursor: not-allowed;
}

.el-picker-panel__link-btn {
	vertical-align: middle;
}

.el-picker-panel [slot="sidebar"],
.el-picker-panel__sidebar {
	position: absolute;
	top: 0;
	bottom: 0;
	width: 110px;
	border-right: 1px solid #e4e4e4;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding-top: 6px;
	background-color: #fff;
	overflow: auto;
}

.el-picker-panel [slot="sidebar"] + .el-picker-panel__body,
.el-picker-panel__sidebar + .el-picker-panel__body {
	margin-left: 110px;
}

.el-time-spinner.has-seconds .el-time-spinner__wrapper {
	width: 33.3%;
}

.el-time-spinner__wrapper {
	max-height: 190px;
	overflow: auto;
	display: inline-block;
	width: 50%;
	vertical-align: top;
	position: relative;
}

.el-time-spinner__input.el-input .el-input__inner,
.el-time-spinner__list {
	padding: 0;
	text-align: center;
}

.el-time-spinner__wrapper.is-arrow {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	text-align: center;
	overflow: hidden;
}

.el-time-spinner__wrapper.is-arrow .el-time-spinner__list {
	-webkit-transform: translateY(-32px);
	transform: translateY(-32px);
}

.el-time-spinner__wrapper.is-arrow .el-time-spinner__item:hover:not(.disabled):not(.active) {
	background: #fff;
	cursor: default;
}

.el-time-spinner__arrow {
	font-size: 12px;
	color: var(--el-text-color-secondary);
	position: absolute;
	left: 0;
	width: 100%;
	z-index: 1;
	text-align: center;
	height: 30px;
	line-height: 30px;
	cursor: pointer;
}

.el-time-spinner__arrow:hover {
	color: var(--el-color-primary);
}

.el-time-spinner__arrow.el-icon-arrow-up {
	top: 10px;
}

.el-time-spinner__arrow.el-icon-arrow-down {
	bottom: 10px;
}

.el-time-spinner__input.el-input {
	width: 70%;
}

.el-time-spinner__list {
	margin: 0;
	list-style: none;
}

.el-time-spinner__list::after,
.el-time-spinner__list::before {
	content: "";
	display: block;
	width: 100%;
	height: 80px;
}

.el-time-spinner__item {
	height: var(--ui-height);
	line-height: var(--ui-height);
	font-size: 12px;
	color: #606266;
}

.el-time-spinner__item:hover:not(.disabled):not(.active) {
	background: var(--el-fill-color-light);
	cursor: pointer;
}

.el-time-spinner__item.active:not(.disabled) {
	color: var(--el-text-color-primary);
	font-weight: 700;
}

.el-time-spinner__item.disabled {
	color: var(--el-text-color-disabled);
	cursor: not-allowed;
}
</style>
